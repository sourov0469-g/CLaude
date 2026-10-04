"""Storage: one compressed record per lead, homepage can't be overwritten, old per-page databases migrate. Run: python tests/test_storage.py"""
import os, sys, tempfile, json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))
home = tempfile.mkdtemp()
os.environ.update(ROOFER_HOME=home, ROOFER_CRAWLER_DB=f"{home}/s.db")


def check(c, m):
    if not c:
        raise AssertionError(m)
    print("  ok:", m)


import db, config, sqlite3, zlib
# 1. compression round trip + backward compatibility with plain-zlib records from earlier versions
obj = {"pages": {"https://a.com/": {"t": "homepage", "s": 200, "f": {"title": "A Roofing", "word_count": 120, "emails": [{"email": "a@a.com"}]}}}, "data": {"net": {"ok": True}}}
check(db.jloads(db.pack(obj), None) == obj, "pack/unpack round trip")
check(db.jloads(zlib.compress(json.dumps(obj).encode()), None) == obj, "records written by older versions (plain zlib) still readable")
small = {"title": "x", "word_count": 5}
check(len(db.pack(obj)) < len(zlib.compress(json.dumps(obj, separators=(",", ":")).encode(), 9)), "preset dictionary beats plain zlib on a small record")
# 2. writer: pages/data merge into ONE row per lead; an inner page redirecting to the homepage cannot overwrite it
db.init_db()
con = db.connect()
with con:
    con.execute("INSERT INTO leads(source_row,lead_key,company_name,website,original_json,created_at) VALUES(1,'k1','A','https://a.com/',?,?)", (db.pack({}), db.now()))
con.close()
w = db.Writer()
w.page("k1", "https://a.com/", "homepage", 200, {"title": "Home", "word_count": 300})
w.page("k1", "https://a.com/about", "about", 200, {"title": "About", "word_count": 200})
w.page("k1", "https://a.com/", "about", 200, {"title": "WRONG: homepage re-saved as about", "word_count": 300})   # the redirect-to-home bug
w.data("k1", "net", {"ok": True, "http_status": 200})
w.stage("k1", "triage", "DONE")
w.close()
con = db.connect()
check(con.execute("SELECT COUNT(*) FROM lead_blob").fetchone()[0] == 1, "one record per lead")
b = db.get_blob(con, "k1")
check(b["pages"]["https://a.com/"]["t"] == "homepage" and b["pages"]["https://a.com/"]["f"]["title"] == "Home", "homepage was NOT overwritten by a redirected inner page")
check(set(b["pages"]) == {"https://a.com/", "https://a.com/about"} and b["data"]["net"]["ok"], "pages + network facts live in the same record")
con.close()
# 3. migration of a v5.0/5.1 database (one row per page / per data source)
home2 = tempfile.mkdtemp()
os.environ["ROOFER_CRAWLER_DB"] = f"{home2}/old.db"
c = sqlite3.connect(f"{home2}/old.db")
c.executescript("""CREATE TABLE leads(id INTEGER PRIMARY KEY AUTOINCREMENT, source_row INTEGER NOT NULL, lead_key TEXT NOT NULL UNIQUE, company_name TEXT, website TEXT, domain TEXT, website_kind TEXT NOT NULL DEFAULT 'NONE', phone TEXT, email TEXT, city TEXT, state TEXT, zip TEXT, address TEXT, categories TEXT, rating REAL, reviews INTEGER, maps_url TEXT, lat REAL, lng REAL, maps_extra_json TEXT, original_json TEXT NOT NULL, prefilter_class TEXT NOT NULL DEFAULT 'UNKNOWN', prefilter_reason TEXT, crawlable INTEGER NOT NULL DEFAULT 0, dup_of TEXT, created_at TEXT NOT NULL);
CREATE TABLE pages(lead_key TEXT NOT NULL, url TEXT NOT NULL, page_type TEXT, status_code INTEGER, features_json TEXT NOT NULL, fetched_at TEXT NOT NULL, PRIMARY KEY(lead_key,url));
CREATE TABLE lead_data(lead_key TEXT NOT NULL, source TEXT NOT NULL, data_json TEXT NOT NULL, updated_at TEXT NOT NULL, PRIMARY KEY(lead_key,source));""")
c.execute("INSERT INTO leads(source_row,lead_key,company_name,original_json,created_at) VALUES(1,'k9','Z','x','now')")
c.execute("INSERT INTO pages VALUES('k9','https://z.com/','homepage',200,?, 'now')", (json.dumps({"title": "Z", "word_count": 99}),))
c.execute("INSERT INTO lead_data VALUES('k9','net',?, 'now')", (json.dumps({"ok": True}),))
c.commit(); c.close()
db.init_db()
con = db.connect()
names = {r[0] for r in con.execute("SELECT name FROM sqlite_master WHERE type='table'")}
b = db.get_blob(con, "k9")
check("pages" not in names and "lead_data" not in names and b["pages"]["https://z.com/"]["f"]["title"] == "Z" and b["data"]["net"]["ok"], "old per-page database migrated into the new single-record format")
print("STORAGE TESTS PASSED")
