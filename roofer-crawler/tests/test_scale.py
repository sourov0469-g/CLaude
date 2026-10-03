"""Scale: 100,000-row import -> score -> XLSX export; reports file/database sizes and timings. Run: python tests/test_scale.py [rows]"""
import csv, os, random, sys, tempfile, time
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))
N = int(sys.argv[1]) if len(sys.argv) > 1 else 100_000
home = tempfile.mkdtemp()
os.environ.update(ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/s.db")
import db, importer, exporter, scoring_run
random.seed(3)
states = ["TX", "FL", "OH", "GA", "CO", "AZ", "NC", "PA", "MI", "TN"]
cities = ["Dallas", "Tampa", "Columbus", "Atlanta", "Denver", "Phoenix", "Raleigh", "Pittsburgh", "Detroit", "Nashville"]
p = Path(home) / "big.csv"
with open(p, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Business Name", "Website", "Domain", "Phone", "Email", "Social Media", "Full Address", "City", "State", "Business Categories",
                "Google Rating", "Review Count", "Google Maps URL", "Search Keyword", "Lead Notes"])
    for i in range(N):
        k = i % 10
        site = "" if i % 9 == 0 else (f"https://facebook.com/roofer{i}" if i % 13 == 0 else f"https://roofer{i}-{cities[k].lower()}.com/")
        w.writerow([f"Roofer {i} Roofing & Construction LLC", site, "", f"(555) {100 + i % 800:03d}-{i % 10000:04d}", "", "", f"{i} Main St, {cities[k]}, {states[k]} 7{i%9000:04d}",
                    cities[k], states[k], "Roofing contractor", round(3.5 + random.random() * 1.5, 1), int(random.paretovariate(1.2) * 5),
                    f"https://www.google.com/maps/search/?api=1&query={i}", f"roofing contractor {cities[k]} {states[k]}", f"Maps rank: {i%20}"])
print(f"csv: {p.stat().st_size/1e6:.1f} MB")
t = time.time(); res = importer.import_dataset(p); print(f"import+score {N:,}: {time.time()-t:.1f}s  inserted={res['inserted']:,} crawlable={res['crawlable']:,} dups={res['duplicates']:,}")
print(f"database: {config.db_path().stat().st_size/1e6:.1f} MB" if (config := __import__('config')) else "")
t = time.time(); scoring_run.select_top("deep", 20000); print(f"select top 20k: {time.time()-t:.1f}s")
t = time.time(); n = exporter.export_outreach(Path(home) / "o.xlsx", top_n=20000); sz = (Path(home) / "o.xlsx").stat().st_size / 1e6
print(f"xlsx outreach top 20,000: {n:,} rows {sz:.1f} MB in {time.time()-t:.1f}s")
t = time.time(); n = exporter.export_everything(Path(home) / "a.xlsx"); sz = (Path(home) / "a.xlsx").stat().st_size / 1e6
print(f"xlsx ALL {n:,} rows x 25 columns: {sz:.1f} MB in {time.time()-t:.1f}s")
