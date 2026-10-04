"""The product promise: collect EVERYTHING for EVERY lead, filter/rank NOTHING, export one compact research file. Run: python tests/test_research.py"""
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
env = dict(os.environ, ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/r.db", ROOFER_TEST_MODE="1", ROOFER_TOTAL_TIMEOUT="6", ROOFER_TEST_HOSTMAP=json.dumps({"*": "127.0.0.1", "dead": None}),
           ROOFER_RDAP_BASE=f"http://rdap.test:{P}/rdap")
os.environ.update({k: env[k] for k in ("ROOFER_HOME", "ROOFER_CRAWLER_DB", "ROOFER_TEST_MODE", "ROOFER_TEST_HOSTMAP", "ROOFER_RDAP_BASE")})
rows = [["Business Name", "Website", "Business Categories", "City", "State", "Phone", "Google Rating", "Review Count", "Facebook"],
        ["Good Roofing", f"http://good-1.test:{P}/", "Roofing contractor", "Austin", "TX", "(512) 555-0100", 4.9, 150, f"http://social.test:{P}/fb"],
        ["CellFone USA", f"http://old-1.test:{P}/", "Cell phone store", "Denton", "TX", "(940) 555-0101", 4.9, 2300, ""],           # a NON-roofer: must still be collected
        ["Pumpkin Patch", "", "Pumpkin patch", "Bixby", "OK", "(918) 555-0102", 4.6, 534, ""],                                    # no website
        ["Good Roofing (2nd listing)", f"http://good-1.test:{P}/", "Roofing contractor", "Austin", "TX", "(512) 555-0199", 4.0, 3, ""],  # duplicate website
        ["Blocked Co", f"http://cf-1.test:{P}/", "Roofing contractor", "Dallas", "TX", "(214) 555-0103", 4.5, 40, ""],
        ["Dead Domain Co", f"http://dead-1.test:{P}/", "Roofing contractor", "Dallas", "TX", "(214) 555-0104", 4.5, 40, ""]]
p = Path(home) / "l.csv"
with open(p, "w", newline="") as f:
    csv.writer(f).writerows(rows)
import db, importer, exporter
res = importer.import_dataset(p)
r = subprocess.run([sys.executable, str(ROOT / "crawler_runner.py"), "--stage", "triage+deep+social+domain", "--concurrency", "10"], env=env, capture_output=True, text=True, timeout=300)
if r.returncode:
    print(r.stdout[-800:], r.stderr[-2000:])
check(r.returncode == 0, "one 'collect everything' job (no list, no filter) runs all four stages")
con = db.connect()
triaged = {x["company_name"] for x in con.execute("SELECT l.company_name FROM lead_stage s JOIN leads l USING(lead_key) WHERE s.stage='triage'")}
check({"Good Roofing", "CellFone USA", "Blocked Co", "Dead Domain Co"} <= triaged, "non-roofers are collected too (CellFone USA crawled): nothing is filtered out")
out = Path(home) / "research.xlsx"
n = exporter.export_research(out)
import openpyxl
ws = openpyxl.load_workbook(out).active
data = list(ws.iter_rows(values_only=True))
h, body = data[0], [dict(zip(data[0], r)) for r in data[1:]]
check(n == 6 and len(body) == 6, "ALL 6 leads are in the file (none dropped)")
check([b["Company"] for b in body] == [r[0] for r in rows[1:]] and [b["Row"] for b in body] == [2, 3, 4, 5, 6, 7], "original file order preserved")
check(not {"Rank", "Tier", "Priority", "Scores N/P/E", "Email opener", "Pitch angle"} & set(h), "no ranking, scores, tiers or pitch columns in the research file")
good = body[0]
check(good["Emails found"] and "sarah@" in good["Emails found"] and "Sarah Connor" in good["Owner / decision makers"], f"good site: emails + owner collected ({good['Emails found']} / {good['Owner / decision makers']})")
check("Miguel Reyes" in good["Team members"] and "FB:" in good["Social profiles"] and "(2,345)" in good["Social profiles"], "team members + Facebook followers collected")
check("domain since 2012" in good["Website details"] and "GoDaddy" in good["Website details"], "domain age/registrar collected")
check(len(good["Homepage text"]) > 100 and good["Homepage title"], f"homepage text + title kept for analysis ({good['Homepage text'][:70]}...)")
svc = (good["Services & certifications"] or "").lower()
check("roof replacement" in svc and "gaf master elite" in svc and "licensed and insured" in svc, f"services + certifications collected ({svc[:90]}...)")
check(body[1]["Website status"] == "Loads fine" and body[1]["Company"] == "CellFone USA", "the non-roofer row has its collected data too")
check(body[2]["Website status"] == "No website listed" and body[2]["Phone"] == "(918) 555-0102", "no-website lead kept with its Google data")
check("Duplicate of row 2" in body[3]["Data notes"], f"duplicate listing kept and labelled, not dropped ({body[3]['Data notes']})")
check(body[4]["Website status"].startswith("Blocked by bot protection") and "bot protection" in body[4]["Data notes"], "blocked site is explained, not silently empty")
check("does not resolve" in body[5]["Website status"], "dead domain explained")
size = out.stat().st_size
check(size < 30_000, f"file is tiny: {size/1024:.1f} KB for 6 leads")
# the dashboard route + preview endpoint
import app as A
c = A.app.test_client()
resp = c.get("/export/research")
check(resp.status_code == 200 and resp.data[:2] == b"PK", "/export/research downloads a real .xlsx")
pv = c.get("/api/preview").get_json()
check(pv["total"] == 6 and [r["row"] for r in pv["rows"]] == [2, 3, 4, 5, 6, 7], "preview lists leads in original order")
dossier = c.get(f"/api/lead/{pv['rows'][0]['lead_key']}").get_json()
check(dossier["excerpts"]["homepage"] and dossier["pages_read"] >= 5, "lead detail shows the collected text and page count")
fun = c.get("/api/status").get_json()["funnel"]
check(fun["collected"] >= 2 and fun["blocked"] == 1 and fun["not_collected"] == 0, f"dashboard counts: {fun['collected']} read, {fun['blocked']} blocked, {fun['not_collected']} not collected")
print("RESEARCH EXPORT TESTS PASSED")
