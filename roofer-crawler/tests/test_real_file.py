"""Regression for the first real export: a list that is mostly NON-roofers must not put them in the outreach file. Run: python tests/test_real_file.py"""
import csv, os, random, sys, tempfile
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
home = tempfile.mkdtemp()
os.environ.update(ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/r.db")


def check(c, m):
    if not c:
        raise AssertionError(m)
    print("  ok:", m)


random.seed(4)
OTHER = [("CellFone USA", "Cell phone store"), ("Green Gate Garden Center", "Garden center"), ("Boland's Ace", "Hardware store"), ("Pro-One Small Engine Repair", "Small engine repair shop"),
         ("Pumpkin Patch", "Pumpkin patch"), ("Precision Pointe Auto Glass", "Auto glass shop"), ("Katy Tile & Marble", "Tile contractor"), ("John R Plumbing LLC", "Plumber"),
         ("Window Hero", "Window cleaning service"), ("Pizza Palace", "Pizza restaurant"), ("Unknown Biz", "")]
rows = [["Business Name", "Website", "Phone", "Google Rating", "Review Count", "Business Categories", "City", "State", "Search Keyword"]]
for i in range(900):        # many non-roofers with HUGE review counts and no website: the old ranking put these on top
    n, c = random.choice(OTHER)
    rows.append([f"{n} {i}", "" if i % 4 else f"https://www.google.com/search?q={n}+{i}", f"(555) 100-{i:04d}", 4.9, random.randint(300, 3000), c, "Dallas", "TX", "roofing contractor Dallas TX"])
for i in range(80):         # real roofers: modest reviews, half have no website
    rows.append([f"Texas Roofing {i}", "" if i % 2 else f"https://texasroofing{i}.com/", f"(555) 200-{i:04d}", 4.6, random.randint(20, 200), "Roofing contractor", "Dallas", "TX", "roofing contractor Dallas TX"])
for i in range(20):
    rows.append([f"Exterior Pros {i}", f"https://exteriorpros{i}.com/", f"(555) 300-{i:04d}", 4.5, 90, "Siding contractor", "Dallas", "TX", ""])
p = Path(home) / "l.csv"
with open(p, "w", newline="") as f:
    csv.writer(f).writerows(rows)
import db, importer, exporter, scoring_run
res = importer.import_dataset(p)
print("   import:", {k: res[k] for k in ("inserted", "no_website", "likely_roofer", "obvious_non_roofer")})
check(res["obvious_non_roofer"] >= 800, f"{res['obvious_non_roofer']} of 1000 correctly flagged as non-roofers (the rest have no category at all)")
check(res["no_website"] >= 900, "Google *search* links in the Website column count as NO website (not as a site)")
con = db.connect()
elig = {r["company_name"]: r for r in con.execute("SELECT l.company_name, s.eligible, s.exclude_reason, s.priority FROM leads l JOIN scores s USING(lead_key)")}
roofers_ok = sum(1 for n, r in elig.items() if n.startswith("Texas Roofing") and r["eligible"])
check(roofers_ok == 80, "all 80 real roofers are eligible")
check(not any(r["eligible"] for n, r in elig.items() if not n.startswith(("Texas Roofing", "Exterior Pros"))), "NO non-roofer is eligible (cell phone stores, garden centers, plumbers...)")
check(not any(r["eligible"] for n, r in elig.items() if n.startswith("Exterior Pros")), "adjacent trades (siding) are held back until their website confirms roofing")
check(all("Not confirmed" in r["exclude_reason"] or "Not a roofer" in r["exclude_reason"] or "Duplicate" in r["exclude_reason"] for n, r in elig.items() if not r["eligible"]), "every exclusion carries an honest reason")
out = Path(home) / "o.xlsx"
n = exporter.export_outreach(out, top_n=20000)
import openpyxl
rws = list(openpyxl.load_workbook(out).active.iter_rows(values_only=True))
names = [r[3] for r in rws[1:]]
check(n == 80 and all(x.startswith("Texas Roofing") for x in names), f"outreach export asked for 20,000 holds exactly the {n} real roofers - nothing else")
import app as A
c = A.app.test_client()
tok = __import__("re").search(r'name="csrf" content="([^"]+)"', c.get("/").get_data(as_text=True)).group(1)
info = c.get("/api/export_info?top_n=20000").get_json()
check(info["eligible"] == 80 and info["rows"] == 80 and any("Only 80" in w for w in info["warnings"]), "dashboard warns: only 80 qualify (asked 20,000)")
check(any("haven't had their website checked" in w for w in info["warnings"]), "dashboard warns that 40 roofers' websites haven't been checked yet")
fun = c.get("/api/status").get_json()["funnel"]
check(fun["likely_roofers"] == 80 and fun["not_roofers"] >= 800 and fun["to_verify"] >= 20, f"funnel tells the truth: {fun['likely_roofers']} roofers, {fun['to_verify']} to verify, {fun['not_roofers']} not roofers")
# an OLD database (stale labels, e.g. built by v5.0) is fixed automatically without re-importing or re-crawling
con = db.connect()
with con:
    con.execute("UPDATE leads SET prefilter_class='UNKNOWN', prefilter_reason='stale'")
    con.execute("DELETE FROM meta WHERE key='classifier_version'")
con.close()
scoring_run.rescore_all()
before = db.connect().execute("SELECT COUNT(*) FROM scores WHERE eligible=1").fetchone()[0]
import importlib; importlib.reload(A)
con = db.connect()
after = con.execute("SELECT COUNT(*) FROM scores WHERE eligible=1").fetchone()[0]
labels = {r[0]: r[1] for r in con.execute("SELECT prefilter_class, COUNT(*) FROM leads GROUP BY 1")}
check(before == 0 and after == 80 and labels.get("LIKELY_ROOFER") == 80, f"old database auto-reclassified on startup: eligible {before} -> {after}")
print("REAL-FILE REGRESSION PASSED")
