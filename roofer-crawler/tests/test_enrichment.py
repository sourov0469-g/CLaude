"""Social + domain (RDAP) + Google-search stages against mock endpoints. Run: python tests/test_enrichment.py"""
import csv, datetime, json, os, subprocess, sys, tempfile
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT)); sys.path.insert(0, str(ROOT / "tests"))
from fakeweb import FakeWeb


def check(c, m):
    if not c:
        raise AssertionError(m)
    print("  ok:", m)


# parsers first (pure functions)
from stage_social import parse_profile, parse_count
check(parse_count("1.2K") == 1200 and parse_count("3,456") == 3456 and parse_count("2.5M") == 2500000, "count parser (1.2K / 3,456 / 2.5M)")
check(parse_profile("instagram", b'<meta property="og:description" content="1,234 Followers, 56 Following, 78 Posts - x">')["followers"] == 1234, "instagram followers")
check(parse_profile("facebook", b'<meta property="og:description" content="Acme. 2,345 likes \xc2\xb7 12 talking about this">')["likes"] == 2345, "facebook likes")
check(parse_profile("facebook", b'<html><head><title>Log in or sign up to view</title></head></html>')["status"] == "blocked", "login wall recorded as blocked, not guessed")
from stage_search import analyze_results, local_rank
r = analyze_results("NoWeb Roofing", "Dallas", [{"title": "NoWeb Roofing | BBB", "link": "https://www.bbb.org/x", "snippet": "BBB Rating: A+ Accredited Business"},
                                                {"title": "NoWeb Roofing", "link": "https://www.noweb-roofing.com/", "snippet": "John Smith, Owner of NoWeb Roofing"}])
check(r["bbb"]["rating"] == "A+" and r["bbb"]["accredited"] and r["website_candidate"] == "https://www.noweb-roofing.com/", "search parser: BBB + website candidate")
check(local_rank([{"link": "https://a.com/"}, {"link": "https://www.b.com/x"}], "b.com") == 2 and local_rank([{"link": "https://a.com"}], "b.com") is None, "local rank")

web = FakeWeb(tls=False).start()
home = tempfile.mkdtemp()
P = web.port
env = dict(os.environ, ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/n.db", ROOFER_TEST_MODE="1", ROOFER_TOTAL_TIMEOUT="8",
           ROOFER_TEST_HOSTMAP=json.dumps({"*": "127.0.0.1"}), ROOFER_RDAP_BASE=f"http://rdap.test:{P}/rdap", ROOFER_SEARCH_URL=f"http://search.test:{P}/search")
os.environ.update({k: env[k] for k in ("ROOFER_HOME", "ROOFER_CRAWLER_DB", "ROOFER_TEST_MODE", "ROOFER_TEST_HOSTMAP", "ROOFER_RDAP_BASE", "ROOFER_SEARCH_URL")})
with open(f"{home}/l.csv", "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Business Name", "Website", "City", "State", "Business Categories", "Review Count", "Google Rating", "Facebook", "Instagram", "Phone"])
    w.writerow(["Good 9 Roofing", f"http://good-9.test:{P}/", "Austin", "TX", "Roofing contractor", 150, 4.8, f"http://social.test:{P}/fb", f"http://social.test:{P}/ig", "(512) 555-0109"])
    w.writerow(["Expiring Roofing", f"http://expiring-1.test:{P}/", "Austin", "TX", "Roofing contractor", 60, 4.5, f"http://social.test:{P}/wall", "", "(512) 555-0110"])
    w.writerow(["NoWeb Roofing", "", "Dallas", "TX", "Roofing contractor", 90, 4.7, "", "", "(214) 555-0111"])
import importer, db, scoring_run, scoring, exporter


def run(*a):
    r = subprocess.run([sys.executable, str(ROOT / "crawler_runner.py"), *a], env=env, capture_output=True, text=True, timeout=200)
    if r.returncode:
        print(r.stdout[-800:], r.stderr[-2500:])
    return r


importer.import_dataset(f"{home}/l.csv")
check(run("--stage", "triage", "--concurrency", "10").returncode == 0, "triage")
scoring_run.select_top("deep", 10)
r = run("--stage", "social+domain", "--list", "deep", "--concurrency", "10")
check(r.returncode == 0, "social+domain chained job runs (one click in the dashboard)")
r = run("--stage", "search", "--list", "deep", "--concurrency", "10")
check(r.returncode == 0, "search stage runs")
con = db.connect()
key = lambda n: con.execute("SELECT lead_key FROM leads WHERE company_name=?", (n,)).fetchone()[0]
prof = lambda n: scoring_run.load_profile(con, key(n))
g, e, nw = prof("Good 9 Roofing"), prof("Expiring Roofing"), prof("NoWeb Roofing")
check(g["social"]["facebook"]["likes"] == 2345 and g["social"]["instagram"]["followers"] == 1234, "social: FB likes 2,345 + IG followers 1,234 stored")
check(e["social"]["facebook"]["status"] == "blocked", "social: login-walled page recorded as blocked")
check(g["rdap"]["created"] == "2012-05-01" and g["rdap"]["registrar"].startswith("GoDaddy") and 300 < g["rdap"]["days_to_expiry"] < 450, f"rdap: created/registrar/expiry parsed ({g['rdap'].get('registrar')}, {g['rdap'].get('days_to_expiry')}d)")
check(e["rdap"]["days_to_expiry"] is not None and e["rdap"]["days_to_expiry"] < 45, "rdap: expiring domain detected")
sc = scoring.score_profile(e)
check(any("expires" in x[0].lower() for x in sc["breakdown"]["need"]) and any("expires" in x[0].lower() for x in sc["breakdown"]["ease"]), "expiring domain raises need AND ease (timely trigger)")
check(g["search"]["local_rank"] == 3, "search: good-9 is #3 for 'roofing contractor Austin TX'")
check(e["search"]["local_rank"] is None and e["search"]["local_rank_checked"], "search: expiring-1 not on page 1")
check(any("first page" in x for x in scoring.score_profile(e)["hooks"]["problems"]), "'not on Google page 1' becomes an email hook")
check(nw["search"]["bbb"]["rating"] == "A+" and nw["search"]["profiles"].get("facebook"), "search: BBB A+ and Facebook profile found for the no-website lead")
check(any(o["name"] == "John Smith" for o in nw["people"]["owners"]), "search: owner name 'John Smith' surfaced")
row = con.execute("SELECT website,website_kind,crawlable FROM leads WHERE company_name='NoWeb Roofing'").fetchone()
check(row["website"] == "https://www.noweb-roofing.com/" and row["website_kind"] == "REAL" and row["crawlable"] == 1, "no-website lead adopted the website found by search (queued for re-check)")
check(con.execute("SELECT COUNT(*) FROM lead_stage WHERE lead_key=? AND stage='triage'", (key("NoWeb Roofing"),)).fetchone()[0] == 0, "its triage was reset so Step 2 will crawl the new site")
p = Path(home) / "o.xlsx"
exporter.export_outreach(p)
import openpyxl
rows = list(openpyxl.load_workbook(p).active.iter_rows(values_only=True))
h = rows[0]
good = next(r for r in rows[1:] if r[h.index("Company")] == "Good 9 Roofing")
check("(2,345)" in good[h.index("Social")] and "(1,234)" in good[h.index("Social")], "export: social column shows follower counts")
check("domain since 2012" in good[h.index("Website check")] and "GoDaddy" in good[h.index("Website check")], "export: domain age + registrar in Website check")
exp = next(r for r in rows[1:] if r[h.index("Company")] == "Expiring Roofing")
check("EXPIRES IN" in exp[h.index("Website check")], "export: expiring domain flagged")
check("Google local rank #3" in good[h.index("Business profile")] and "recent work" in good[h.index("Business profile")], "export: local rank + recent work in Business profile")
print("ENRICHMENT TESTS PASSED")
