"""QA fixes: strict roofing classification, keyword never rejects, Test-100 touches exactly 100, JS-shell flag. Run: python tests/test_qa.py"""
import csv, json, os, subprocess, sys, tempfile
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT)); sys.path.insert(0, str(ROOT / "tests"))
from fakeweb import FakeWeb


def check(c, m):
    if not c:
        raise AssertionError(m)
    print("  ok:", m)


web = FakeWeb(tls=False).start()
home = tempfile.mkdtemp()
P = web.port
env = dict(os.environ, ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/q.db", ROOFER_TEST_MODE="1", ROOFER_TOTAL_TIMEOUT="8",
           ROOFER_TEST_HOSTMAP=json.dumps({"*": "127.0.0.1"}))
os.environ.update({k: env[k] for k in ("ROOFER_HOME", "ROOFER_CRAWLER_DB", "ROOFER_TEST_MODE", "ROOFER_TEST_HOSTMAP")})
from importer import classify_roofer as cl
check(cl("4 Pillars Constructions", "Foundation contractor", "foundation repair Celina TX")[0] != "OBVIOUS_NON_ROOFER", "search keyword 'foundation repair' can't hard-reject 4 Pillars")
check(cl("Birdieworks", "Construction company", "concrete contractor Celina TX")[0] != "OBVIOUS_NON_ROOFER", "Birdieworks (found via 'concrete' search) is not rejected")
check(cl("Robinson Fence Company", "Fence contractor")[0] == "OBVIOUS_NON_ROOFER" and cl("Foley Pools", "Swimming pool contractor")[0] == "OBVIOUS_NON_ROOFER", "name+category still reject clear non-roofers")
check(cl("Mystery LLC", "", "roofing contractor Dallas")[0] == "UNKNOWN", "keyword-only roofing mention is weak (UNKNOWN, not LIKELY)")

rows = [["Business Name", "Website", "Business Categories", "Search Keyword", "State", "Review Count"]]
for i in range(150):
    rows.append([f"Texas Roofing {i}", f"http://good-{i}.test:{P}/", "Roofing contractor", "roofing contractor Celina TX", "TX", 50 + i])
for i in range(60):
    rows.append([f"Random Contractor {i}", f"http://old-{i}.test:{P}/", "Construction company", "concrete contractor Celina TX", "TX", 10])
rows.append(["Robinson Fence Company", f"http://fence-1.test:{P}/", "Construction company", "roofing contractor Celina TX", "TX", 30])   # general category: gets crawled, must NOT become a roofer
rows.append(["Birdieworks", f"http://bird-1.test:{P}/", "Construction company", "concrete contractor Celina TX", "TX", 40])           # roofer hiding behind a concrete search
rows.append(["Shell Roofing", f"http://shell-1.test:{P}/", "Roofing contractor", "x", "TX", 20])
with open(f"{home}/l.csv", "w", newline="") as f:
    csv.writer(f).writerows(rows)
import importer, db, qa, scoring_run
res = importer.import_dataset(f"{home}/l.csv")
total = res["inserted"]
print("   prefilter:", res["likely_roofer"], "likely /", res["obvious_non_roofer"], "obvious non-roofers of", total)


def run(*a):
    r = subprocess.run([sys.executable, str(ROOT / "crawler_runner.py"), *a], env=env, capture_output=True, text=True, timeout=300)
    if r.returncode:
        print(r.stdout[-600:], r.stderr[-2000:])
    return r


# ---- Test 100 likely roofers: EXACTLY 100 touched
n = qa.select_test("roofers", 100, seed=1)
check(n == 100, "test selection is exactly 100 leads")
r = run("--stage", "triage+deep", "--list", "test", "--concurrency", "30")
check(r.returncode == 0, "chained triage+deep test run")
con = db.connect()
touched = con.execute("SELECT COUNT(DISTINCT lead_key) FROM lead_stage").fetchone()[0]
check(touched == 100, f"exactly 100 leads touched (not {touched}) - nothing beyond the test set was crawled")
check(con.execute("SELECT COUNT(DISTINCT lead_key) FROM pages").fetchone()[0] == 100, "pages saved for exactly those 100")
check(con.execute("SELECT COUNT(*) FROM lead_stage WHERE stage='deep'").fetchone()[0] == 100, "deep stage also ran on exactly the test set")
check(con.execute("SELECT COUNT(*) FROM leads l JOIN selection s ON s.lead_key=l.lead_key AND s.list_name='test' WHERE l.prefilter_class!='LIKELY_ROOFER'").fetchone()[0] == 0, "'likely roofers' test contains only likely roofers")
rep = qa.report()
check(rep["n"] == 100 and rep["roofing_confirmed"] == 100 and rep["readable_sites"] == 100, f"report: 100 readable, {rep['roofing_confirmed']} roofing-confirmed, avg {rep['avg_pages']} pages")
con.close()

# ---- raw test = different exact 100 (any lead type)
n = qa.select_test("raw", 100, seed=2)
check(n == 100, "raw test is exactly 100 as well")

# ---- the false-positive cases, run explicitly
con = db.connect()
keys = {r["company_name"]: r["lead_key"] for r in con.execute("SELECT lead_key,company_name FROM leads WHERE company_name IN ('Robinson Fence Company','Birdieworks','Shell Roofing')")}
with con:
    con.execute("DELETE FROM selection WHERE list_name='test'")
    con.executemany("INSERT INTO selection VALUES(?,?,?,?)", [(k, "test", i, db.now()) for i, k in enumerate(keys.values())])
con.close()
check(run("--stage", "triage+deep", "--list", "test", "--concurrency", "5", "--include-nonroofers").returncode == 0, "triage+deep on the three tricky leads")
con = db.connect()
q = lambda name: scoring_run.load_profile(con, keys[name])
fence, bird, shell = q("Robinson Fence Company"), q("Birdieworks"), q("Shell Roofing")
sc = lambda name: dict(con.execute("SELECT eligible,exclude_reason FROM scores WHERE lead_key=?", (keys[name],)).fetchone())
check(not fence["biz"]["roofing_confirmed"] and "gutter" in " ".join(fence["biz"]["services"]) and fence["biz"]["roof_core"] == 0,
      f"fence company: sees gutters/storm damage but roofing NOT confirmed ({fence['biz']['services'][:4]})")
check(sc("Robinson Fence Company")["eligible"] == 0 and "roof" in sc("Robinson Fence Company")["exclude_reason"].lower(), "fence company excluded: " + sc("Robinson Fence Company")["exclude_reason"])
check(bird["biz"]["roofing_confirmed"] and sc("Birdieworks")["eligible"] == 1, "Birdieworks (found via concrete search) confirmed as a roofer by its website and kept")
check(shell["site"]["state"] == "JS_SHELL", "JS-only site flagged as unreadable only when nothing else was readable")
print("QA TESTS PASSED")
