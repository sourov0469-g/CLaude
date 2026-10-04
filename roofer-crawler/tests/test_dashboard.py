"""Dashboard smoke test: every route, CSRF, power limits, imports and XLSX exports. Run: python tests/test_dashboard.py"""
import io, os, re, sys, tempfile, zipfile
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
home = tempfile.mkdtemp()
os.environ.update(ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/d.db")


def check(c, m):
    if not c:
        raise AssertionError(m)
    print("  ok:", m)


import config
check(config.clamp_concurrency(10000) == 5000 and config.clamp_concurrency(0) == 1 and config.clamp_concurrency("abc") == config.DEFAULT_CUSTOM
      and config.clamp_concurrency(2500) == 2500, "power clamp: 1..5000, bad input falls back to default")
check(config.CUSTOM_NORMAL_MAX == 1000 and config.CUSTOM_UNLOCK_STEPS == (2000, 3000, 5000), "slider 1-1000, unlock steps 2000/3000/5000")
import app as A
c = A.app.test_client()
html = c.get("/").get_data(as_text=True)
check("Roofer Lead Collector" in html and "unlock" in html.lower() and "Collect everything" in html, "dashboard page renders (collect-first flow)")
token = re.search(r'name="csrf" content="([^"]+)"', html).group(1)
check(c.post("/api/start", json={"stage": "triage"}).status_code == 400, "POST without CSRF token is rejected")
H = {"X-CSRF": token}
check(c.get("/healthz").get_json()["ok"], "healthz")
csv_text = "Business Name,Website,Phone,Google Rating,Review Count,Business Categories,City,State,Email\n" \
           "Alpha Roofing,,(214) 555-0101,4.9,212,Roofing contractor,Dallas,TX,\n" \
           "Beta Roofing,https://facebook.com/beta,(214) 555-0102,4.5,40,Roofing contractor,Plano,TX,beta@gmail.com\n" \
           "Gamma Roofing,https://gammaroof-example.com,(214) 555-0103,4.2,12,Roofing contractor,Austin,TX,\n" \
           "=cmd|' /C calc'!A0 Roofing,,(214) 555-0104,4.0,9,Roofing contractor,Dallas,TX,\n"
r = c.post("/api/import", headers=H, data={"file": (io.BytesIO(csv_text.encode()), "leads.csv")}, content_type="multipart/form-data").get_json()
check(r["ok"] and "Imported 4 leads" in r["msg"], "import: " + r["msg"][:70])
st = c.get("/api/status").get_json()
check(st["funnel"]["total"] == 4 and st["funnel"]["no_website"] == 2 and st["funnel"]["social_only"] == 1, "status funnel counts")
check(st["limits"]["unlocked_max"] == 5000 and st["limits"]["normal_max"] == 1000, "status exposes power limits")
lr = c.get("/api/leads?limit=10").get_json()
check(lr["total"] == 4 and lr["rows"][0]["pitch_angle"], "ranked leads API")
d = c.get(f"/api/lead/{lr['rows'][0]['lead_key']}").get_json()
check(d["problems"] and d["first_line"] and d["why"]["need"], "lead dossier has problems, opener and score reasons")
import qa
check(qa.select_test("roofers", 100, seed=1) == 1, "QA test picks only crawlable likely roofers (leads with no website are not crawlable), capped at 100")
rep = c.get("/api/qa_report").get_json()
check(rep["n"] == 1 and len(rep["rows"]) == 1 and "roofing_confirmed" in rep["rows"][0], "QA report endpoint lists the test leads")
check(c.post("/api/control", headers=H, json={"concurrency": 99999}).get_json()["ok"] is False, "control refuses when nothing runs")
check(c.post("/api/select", headers=H, json={"top_n": 3}).get_json()["ok"], "select top N")
for kind, name in (("outreach", "Outreach"), ("lookup", "Owner lookup"), ("all", "All leads")):
    resp = c.get(f"/export/{kind}?top_n=3")
    check(resp.status_code == 200 and resp.data[:2] == b"PK", f"export {kind} is a real .xlsx")
import openpyxl
wb = openpyxl.load_workbook(io.BytesIO(c.get("/export/all").data))
ws = wb.active
rows = list(ws.iter_rows(values_only=True))
check(rows[0][:4] == ("Rank", "Tier", "Priority", "Company") and "Website check" in rows[0] and "Social" in rows[0], "xlsx columns are the combined layout")
check(any(str(r[3]).startswith("'=cmd") for r in rows[1:]), "formula injection neutralised in xlsx")
with zipfile.ZipFile(io.BytesIO(c.get("/export/all").data)) as z:
    check(all(i.compress_type == zipfile.ZIP_DEFLATED for i in z.infolist()), "xlsx is deflate-compressed")
check(c.post("/api/reset", headers=H, json={"confirm": "nope"}).get_json()["ok"] is False, "reset needs typed confirmation")
check(c.post("/api/reset", headers=H, json={"confirm": "RESET"}).get_json()["ok"] and c.get("/api/status").get_json()["funnel"]["total"] == 0, "reset clears data (backup first)")
check(any(Path(home, "backups").glob("before_reset_*.db")), "reset left a backup")
print("DASHBOARD TESTS PASSED")
