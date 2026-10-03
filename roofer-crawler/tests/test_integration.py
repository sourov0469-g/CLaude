"""End-to-end: import leads -> real triage crawl against local fake sites -> deep crawl -> scores. Run: python tests/test_integration.py"""
import csv
import json
import os
import subprocess
import sys
import tempfile
import time
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "tests"))
from fakeweb import FakeWeb


def check(cond, msg):
    if not cond:
        raise AssertionError(msg)
    print("  ok:", msg)


def main():
    web = FakeWeb().start()
    home = tempfile.mkdtemp()
    env = dict(os.environ, ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/t.db", ROOFER_TEST_MODE="1",
               ROOFER_HOSTMAP_DUMMY="1", ROOFER_TOTAL_TIMEOUT="6", ROOFER_CONNECT_TIMEOUT="3", ROOFER_READ_TIMEOUT="5",
               ROOFER_TEST_HOSTMAP=json.dumps({"*": "127.0.0.1", "dead": None}))
    os.environ.update({k: env[k] for k in ("ROOFER_HOME", "ROOFER_CRAWLER_DB", "ROOFER_TEST_MODE", "ROOFER_TEST_HOSTMAP")})
    P = web.port
    sites = {
        "good-1": f"http://good-1.test:{P}/", "old-1": f"http://old-1.test:{P}/", "parked-1": f"http://parked-1.test:{P}/",
        "default-1": f"http://default-1.test:{P}/", "construction-1": f"http://construction-1.test:{P}/",
        "suspended-1": f"http://suspended-1.test:{P}/", "notfound-1": f"http://notfound-1.test:{P}/", "cf-1": f"http://cf-1.test:{P}/",
        "redirect-1": f"http://redirect-1.test:{P}/", "robots-1": f"http://robots-1.test:{P}/", "shell-1": f"http://shell-1.test:{P}/",
        "dead-1": f"http://dead-1.test:{P}/", "refused-1": "http://refused-1.test:9/", "timeout-1": f"http://timeout-1.test:{P}/",
        "slow-1": f"http://slow-1.test:{P}/",
    }
    if web.tls_port:
        sites["selfsigned-1"] = f"https://selfsigned-1.test:{web.tls_port}/"
    csv_path = Path(home) / "leads.csv"
    with open(csv_path, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["Business Name", "Website", "Phone", "Google Rating", "Review Count", "Business Categories", "City", "State"])
        for i, (name, url) in enumerate(sites.items()):
            w.writerow([f"{name} Roofing", url, f"(512) 555-01{i:02d}", "4.7", 80, "Roofing contractor", "Austin", "TX"])
        w.writerow(["No Web Roofing", "", "(512) 555-0199", "4.9", "200", "Roofing contractor", "Dallas", "TX"])

    import config, db, importer
    importer_stats = importer.import_dataset(csv_path)
    check(importer_stats["inserted"] == len(sites) + 1, f"imported {importer_stats['inserted']} leads")
    check(importer_stats["no_website"] == 1, "no-website lead kept")

    def run(*args):
        t = time.time()
        r = subprocess.run([sys.executable, str(ROOT / "crawler_runner.py"), *args], env=env, capture_output=True, text=True, timeout=240)
        print(f"  runner {' '.join(args)} -> {time.time()-t:.1f}s rc={r.returncode}")
        if r.returncode:
            print(r.stdout[-1500:], r.stderr[-3000:])
        return r

    r = run("--stage", "triage", "--concurrency", "40")
    check(r.returncode == 0, "triage run exits cleanly")

    con = db.connect()
    rows = {r["company_name"].replace(" Roofing", ""): dict(r) for r in con.execute(
        "SELECT l.company_name,s.* FROM leads l JOIN scores s USING(lead_key)")}
    for k in ("good-1", "old-1", "parked-1", "dead-1"):
        print("   ", k, rows[k]["site_state"], rows[k]["need"], rows[k]["pay"], rows[k]["priority"], rows[k]["pitch_angle"])
    exp = {"good-1": "OK", "old-1": "OK", "parked-1": "PARKED", "default-1": "DEFAULT_PAGE", "construction-1": "UNDER_CONSTRUCTION",
           "suspended-1": "SUSPENDED", "notfound-1": "HTTP_404", "cf-1": "BOT_BLOCKED", "robots-1": "ROBOTS_BLOCKED", "shell-1": "JS_SHELL",
           "dead-1": "DEAD_DNS", "refused-1": "DEAD_CONNECT", "timeout-1": "TIMEOUT", "No Web": "NO_WEBSITE"}
    for name, st in exp.items():
        key = name if name in rows else name + ""
        check(rows[key]["site_state"] == st, f"{name}: site_state {rows[key]['site_state']} == {st}")
    check(rows["redirect-1"]["site_state"] == "OK", "redirect-1 follows redirect to a live site")
    if "selfsigned-1" in rows:
        import scoring, scoring_run
        con2 = db.connect()
        sk = con2.execute("SELECT lead_key FROM leads WHERE company_name='selfsigned-1 Roofing'").fetchone()[0]
        why = scoring.score_profile(scoring_run.load_profile(con2, sk))["breakdown"]["need"]
        con2.close()
        check(rows["selfsigned-1"]["site_state"] == "OK" and any("SSL" in x[0] for x in why), "self-signed cert: page still read, SSL problem scored")
    check(rows["old-1"]["need"] > rows["good-1"]["need"] + 40, f"old site need {rows['old-1']['need']} >> modern {rows['good-1']['need']}")
    check(rows["No Web"]["need"] == 100, "no website = need 100")
    import scoring_run as _sr
    _c = db.connect()
    _k = _c.execute("SELECT lead_key FROM leads WHERE company_name='old-1 Roofing'").fetchone()[0]
    _p = _sr.load_profile(_c, _k)
    _c.close()
    check(_p["site"]["has_viewport"] is False and _p["site"]["tel_links"] == 0, "False/0 signals survive DB compression (no viewport, no tel link)")
    check(any("mobile" in x[0].lower() for x in __import__("scoring").score_profile(_p)["breakdown"]["need"]), "'not mobile-friendly' is scored for the old site")
    check(rows["good-1"]["pay"] > rows["old-1"]["pay"], "modern business with ads/elite scores higher pay")
    check(rows["slow-1"]["site_state"] == "OK", "slow site (2s) still fetched")

    gnet = db.jloads(con.execute("SELECT data_json FROM lead_data d JOIN leads l USING(lead_key) WHERE l.company_name='good-1 Roofing' AND source='net'").fetchone()[0], {})
    check(gnet.get("sitemap", {}).get("latest_lastmod") == "2026-09-01", "sitemap lastmod read from robots.txt hint")
    check(gnet.get("last_modified", "").startswith("Mon, 01 Sep 2026"), "Last-Modified header captured")
    st = {r[0]: r[1] for r in con.execute("SELECT status, COUNT(*) FROM lead_stage WHERE stage='triage' GROUP BY status")}
    print("   triage stage statuses:", st)

    # ---- deep stage on the good site only
    con.close()
    db.init_db()
    import scoring_run
    scoring_run.select_top("deep", 5, site_states=["OK"])
    r = run("--stage", "deep", "--list", "deep", "--concurrency", "20", "--deep-pages", "6")
    check(r.returncode == 0, "deep run exits cleanly")
    con = db.connect()
    key = con.execute("SELECT lead_key FROM leads WHERE company_name='good-1 Roofing'").fetchone()[0]
    pages = {r["page_type"] for r in con.execute("SELECT page_type FROM pages WHERE lead_key=?", (key,))}
    print("   good-1 pages:", sorted(pages))
    check({"homepage", "team", "about", "contact_quote", "reviews", "projects_gallery", "careers"} <= pages, "deep crawl fetched team/about/contact/reviews/projects/careers")
    prof = scoring_run.load_profile(con, key)
    names = [o["name"] for o in prof["people"]["owners"]]
    check("Sarah Connor" in names, f"owner found: {names}")
    check(any(m["name"] == "Miguel Reyes" for m in prof["people"]["team_members"]), "team members found")
    check(prof["biz"]["hiring"] and prof["biz"]["elite"], "hiring + elite credential")
    check(prof["contact"]["best_email"].startswith("sarah@"), f"best email is the owner's: {prof['contact']['best_email']}")
    check(prof["site"]["last_updated"] and prof["site"]["last_updated"] >= "2026-09-01", f"last updated {prof['site']['last_updated']} via {prof['site']['last_updated_source']}")
    check(prof["biz"]["testimonials"] >= 2, "on-site testimonials counted")
    print("ALL INTEGRATION CHECKS PASSED")


if __name__ == "__main__":
    main()
