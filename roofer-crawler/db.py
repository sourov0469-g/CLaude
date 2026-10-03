"""SQLite layer (WAL). One batched writer thread for the crawler, short connections elsewhere."""
import json
import queue
import sqlite3
import threading
import time
import traceback
import zlib
from datetime import datetime, timezone
from pathlib import Path

import config

SCHEMA = """
CREATE TABLE IF NOT EXISTS leads(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  source_row INTEGER NOT NULL,
  lead_key TEXT NOT NULL UNIQUE,
  company_name TEXT, website TEXT, domain TEXT, website_kind TEXT NOT NULL DEFAULT 'NONE',
  phone TEXT, email TEXT, city TEXT, state TEXT, zip TEXT, address TEXT, categories TEXT,
  rating REAL, reviews INTEGER, maps_url TEXT, lat REAL, lng REAL,
  maps_extra_json TEXT,            -- other recognised Maps columns (hours, price level, claimed, photos...)
  original_json TEXT NOT NULL,
  prefilter_class TEXT NOT NULL DEFAULT 'UNKNOWN', prefilter_reason TEXT,
  crawlable INTEGER NOT NULL DEFAULT 0,
  dup_of TEXT,                     -- lead_key of the primary row when this is a duplicate
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_leads_crawlable ON leads(crawlable);
CREATE INDEX IF NOT EXISTS idx_leads_domain ON leads(domain);
CREATE INDEX IF NOT EXISTS idx_leads_state ON leads(state);
CREATE INDEX IF NOT EXISTS idx_leads_row ON leads(source_row);

CREATE TABLE IF NOT EXISTS lead_stage(
  lead_key TEXT NOT NULL, stage TEXT NOT NULL, status TEXT NOT NULL,   -- DONE | FAILED | SKIPPED
  attempts INTEGER NOT NULL DEFAULT 1, error TEXT, updated_at TEXT NOT NULL,
  PRIMARY KEY(lead_key, stage)
);
CREATE INDEX IF NOT EXISTS idx_stage_status ON lead_stage(stage, status);

CREATE TABLE IF NOT EXISTS pages(
  lead_key TEXT NOT NULL, url TEXT NOT NULL, page_type TEXT, status_code INTEGER,
  features_json TEXT NOT NULL, fetched_at TEXT NOT NULL,
  PRIMARY KEY(lead_key, url)
);
CREATE TABLE IF NOT EXISTS lead_data(
  lead_key TEXT NOT NULL, source TEXT NOT NULL, data_json TEXT NOT NULL, updated_at TEXT NOT NULL,
  PRIMARY KEY(lead_key, source)
);
CREATE TABLE IF NOT EXISTS scores(
  lead_key TEXT PRIMARY KEY,
  need REAL, pay REAL, ease REAL, fit REAL, priority REAL,
  eligible INTEGER NOT NULL DEFAULT 1, exclude_reason TEXT,
  rank INTEGER, tier TEXT,
  site_state TEXT, pitch_angle TEXT, confidence TEXT,
  revenue_band TEXT, revenue_basis TEXT,
  hooks_json TEXT, breakdown_json TEXT, scored_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_scores_priority ON scores(eligible, priority DESC);
CREATE INDEX IF NOT EXISTS idx_scores_rank ON scores(rank);
CREATE TABLE IF NOT EXISTS selection(
  lead_key TEXT NOT NULL, list_name TEXT NOT NULL, rank INTEGER, selected_at TEXT NOT NULL,
  PRIMARY KEY(lead_key, list_name)
);
CREATE TABLE IF NOT EXISTS search_cache(
  cache_key TEXT PRIMARY KEY, result_json TEXT NOT NULL, fetched_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS meta(key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS runs(
  id INTEGER PRIMARY KEY AUTOINCREMENT, started_at TEXT, ended_at TEXT, stage TEXT, mode TEXT,
  concurrency INTEGER, limit_count INTEGER, status TEXT, note TEXT, processed INTEGER DEFAULT 0
);
"""


def now():
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def connect(readonly=False):
    path = config.db_path()
    path.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(path, timeout=60, check_same_thread=False)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA journal_mode=WAL")
    con.execute("PRAGMA synchronous=NORMAL")      # WAL+NORMAL: crash-safe, no corruption; far faster than FULL
    con.execute("PRAGMA busy_timeout=60000")
    con.execute("PRAGMA temp_store=MEMORY")
    con.execute("PRAGMA cache_size=-65536")
    return con


def init_db():
    con = connect()
    con.executescript(SCHEMA)
    con.commit()
    con.close()


# --------------------------------------------------------------------------- meta
def set_meta(key, value):
    con = connect()
    with con:
        con.execute("INSERT INTO meta(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (key, str(value)))
    con.close()


def set_meta_many(d):
    con = connect()
    with con:
        for k, v in d.items():
            con.execute("INSERT INTO meta(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value", (k, str(v)))
    con.close()


def get_meta(key, default=None):
    con = connect()
    row = con.execute("SELECT value FROM meta WHERE key=?", (key,)).fetchone()
    con.close()
    return row[0] if row else default


def get_meta_all():
    con = connect()
    d = {r[0]: r[1] for r in con.execute("SELECT key,value FROM meta")}
    con.close()
    return d


def pack(obj):
    """JSON -> zlib blob. Everything bulky in the database is stored this way (about 5-8x smaller)."""
    return zlib.compress(json.dumps(obj, ensure_ascii=False, separators=(",", ":"), default=str).encode("utf-8"), 6)


PRUNE_KEYS = ("internal_links", "excerpt", "h2", "people_schema", "server", "generator", "lang", "css_count")
# inner pages are only mined for people / contact / proof / hiring, so their site-quality fields are dropped
INNER_DROP = {"link_categories", "internal_link_count", "meta_description", "h1", "has_og", "has_favicon", "has_canonical", "script_count",
              "img_count", "img_noalt", "outdated", "builder", "builder_tier", "agency", "wp", "lazy_images", "inline_style_bytes", "media_queries",
              "maps_embed", "video_embed", "lorem", "js_shell", "needs_render", "meta_refresh", "form_count", "quote_form_count", "quote_ctas",
              "has_viewport", "html_bytes", "elapsed_ms", "status", "title", "roof_signal_count", "tel_link_count"}


def prune_features(f, page_type="homepage"):
    """Drop bulky per-page fields nobody scores on (keeps the database small)."""
    out = {k: v for k, v in f.items() if k not in PRUNE_KEYS and v is not None and v != [] and v != {} and v != ""}
    if page_type != "homepage":
        out = {k: v for k, v in out.items() if k not in INNER_DROP}
        sc = out.get("schema")
        if sc:
            out["schema"] = {k: sc[k] for k in ("employee_counts", "founding_dates", "ratings", "types") if sc.get(k)}
    return out


def jloads(v, default):
    try:
        if v is None or v == "":
            return default
        if isinstance(v, (bytes, bytearray, memoryview)):
            return json.loads(zlib.decompress(bytes(v)).decode("utf-8"))
        return json.loads(v)
    except Exception:
        return default


def quick_check():
    try:
        con = connect()
        r = con.execute("PRAGMA quick_check").fetchone()
        con.close()
        return r[0] if r else "unknown"
    except Exception as e:
        return f"error: {e}"


def backup_database(dest):
    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    src = connect()
    out = sqlite3.connect(dest)
    try:
        src.backup(out)
    finally:
        out.close()
        src.close()
    return dest


# --------------------------------------------------------------------------- run log
def create_run(stage, mode, concurrency, limit_count):
    con = connect()
    with con:
        cur = con.execute("INSERT INTO runs(started_at,stage,mode,concurrency,limit_count,status) VALUES(?,?,?,?,?,'RUNNING')",
                          (now(), stage, mode, concurrency, limit_count))
    rid = cur.lastrowid
    con.close()
    return rid


def end_run(rid, status, note="", processed=0):
    con = connect()
    with con:
        con.execute("UPDATE runs SET ended_at=?,status=?,note=?,processed=? WHERE id=?", (now(), status, note[:500], processed, rid))
    con.close()


def last_run():
    con = connect()
    r = con.execute("SELECT * FROM runs ORDER BY id DESC LIMIT 1").fetchone()
    con.close()
    return dict(r) if r else None


# --------------------------------------------------------------------------- work queue
def _stage_where(stage, skip_nonroofers):
    """Which leads a stage applies to. Search/social also cover leads with no real website (that is the point)."""
    w = "l.dup_of IS NULL "
    if stage in ("triage", "deep"):
        w += "AND l.crawlable=1 "
    if stage == "deep":
        w += "AND EXISTS(SELECT 1 FROM lead_stage t WHERE t.lead_key=l.lead_key AND t.stage='triage' AND t.status='DONE') "
    if stage == "domain":
        w += "AND l.domain!='' "
    if stage in ("social", "domain", "search"):
        w += "AND COALESCE(sc.eligible,1)=1 "
    if skip_nonroofers:
        w += "AND l.prefilter_class!='OBVIOUS_NON_ROOFER' "
    return w


def pending_for_stage(stage, limit=None, selected_list=None, skip_nonroofers=True, exclude=()):
    """Leads still needing `stage`. Best prospects first so an early Stop still leaves the best done."""
    con = connect()
    params = [stage]
    sql = """SELECT l.lead_key,l.company_name,l.website,l.domain,l.city,l.state,l.phone,l.website_kind
             FROM leads l
             LEFT JOIN lead_stage st ON st.lead_key=l.lead_key AND st.stage=?
             LEFT JOIN scores sc ON sc.lead_key=l.lead_key """
    if selected_list:
        sql += "JOIN selection sel ON sel.lead_key=l.lead_key AND sel.list_name=? "
        params.append(selected_list)
    sql += "WHERE st.lead_key IS NULL AND " + _stage_where(stage, skip_nonroofers)
    sql += "ORDER BY COALESCE(sc.priority,0) DESC, l.source_row LIMIT ?"
    params.append(int(limit) if limit else -1)
    rows = [dict(r) for r in con.execute(sql, params)]
    con.close()
    if exclude:
        ex = set(exclude)
        rows = [r for r in rows if r["lead_key"] not in ex]
    return rows


def stage_counts(stage, selected_list=None, skip_nonroofers=True):
    con = connect()
    base = "FROM leads l LEFT JOIN scores sc ON sc.lead_key=l.lead_key "
    params = []
    if selected_list:
        base += "JOIN selection sel ON sel.lead_key=l.lead_key AND sel.list_name=? "
        params.append(selected_list)
    where = "WHERE " + _stage_where(stage, skip_nonroofers)
    total = con.execute(f"SELECT COUNT(*) {base}{where}", params).fetchone()[0]
    done = {r[0]: r[1] for r in con.execute(
        f"SELECT st.status, COUNT(*) {base}JOIN lead_stage st ON st.lead_key=l.lead_key AND st.stage=? {where} GROUP BY st.status", params + [stage])}
    con.close()
    d, f, s = done.get("DONE", 0), done.get("FAILED", 0), done.get("SKIPPED", 0)
    return {"total": total, "done": d, "failed": f, "skipped": s, "pending": max(0, total - d - f - s)}


def retry_failed(stage):
    con = connect()
    with con:
        cur = con.execute("DELETE FROM lead_stage WHERE stage=? AND status='FAILED'", (stage,))
    n = cur.rowcount
    con.close()
    return n


def reset_stage(stage):
    con = connect()
    with con:
        cur = con.execute("DELETE FROM lead_stage WHERE stage=?", (stage,))
    n = cur.rowcount
    con.close()
    return n


# --------------------------------------------------------------------------- writer thread
class Writer:
    """Single background connection; ops are batched into one transaction (fast + never blocks the event loop)."""

    def __init__(self, score_fn=None, batch=300, interval=0.6):
        self.q = queue.Queue(maxsize=50000)
        self.score_fn = score_fn          # callable(con, lead_key) -> None  (profile + scoring)
        self.batch, self.interval = batch, interval
        self.errors = 0
        self.last_error = ""
        self.written = 0
        self._stop = threading.Event()
        self.t = threading.Thread(target=self._run, name="db-writer", daemon=True)
        self.t.start()

    # ---- producers (called from the event loop; queue.put blocks only when 50k ops are backed up)
    def page(self, lead_key, url, page_type, status, features):
        self.q.put(("page", lead_key, url, page_type, status, features))

    def data(self, lead_key, source, payload):
        self.q.put(("data", lead_key, source, payload))

    def stage(self, lead_key, stage, status, error=None, finalize=True):
        self.q.put(("stage", lead_key, stage, status, error, finalize))

    def _apply(self, con, op):
        kind = op[0]
        if kind == "page":
            _, k, url, ptype, status, feats = op
            con.execute("""INSERT INTO pages(lead_key,url,page_type,status_code,features_json,fetched_at) VALUES(?,?,?,?,?,?)
                           ON CONFLICT(lead_key,url) DO UPDATE SET page_type=excluded.page_type,status_code=excluded.status_code,
                           features_json=excluded.features_json,fetched_at=excluded.fetched_at""",
                        (k, url, ptype, status, pack(prune_features(feats, ptype)), now()))
        elif kind == "data":
            _, k, source, payload = op
            con.execute("""INSERT INTO lead_data(lead_key,source,data_json,updated_at) VALUES(?,?,?,?)
                           ON CONFLICT(lead_key,source) DO UPDATE SET data_json=excluded.data_json,updated_at=excluded.updated_at""",
                        (k, source, pack(payload), now()))
        elif kind == "stage":
            _, k, stage, status, err, finalize = op
            con.execute("""INSERT INTO lead_stage(lead_key,stage,status,attempts,error,updated_at) VALUES(?,?,?,1,?,?)
                           ON CONFLICT(lead_key,stage) DO UPDATE SET status=excluded.status,attempts=attempts+1,error=excluded.error,updated_at=excluded.updated_at""",
                        (k, stage, status, (err or "")[:400] or None, now()))
            if finalize and self.score_fn:
                self.score_fn(con, k)

    def _run(self):
        con = connect()
        pending = []
        last_flush = time.monotonic()
        while True:
            try:
                op = self.q.get(timeout=self.interval)
                pending.append(op)
            except queue.Empty:
                op = None
            due = pending and (len(pending) >= self.batch or time.monotonic() - last_flush >= self.interval or self._stop.is_set())
            if due:
                try:
                    with con:
                        for o in pending:
                            try:
                                self._apply(con, o)
                            except Exception as e:  # one bad row must not lose the batch
                                self.errors += 1
                                self.last_error = f"{type(e).__name__}: {e}"
                                traceback.print_exc()
                    self.written += len(pending)
                except Exception as e:
                    self.errors += 1
                    self.last_error = f"batch: {e}"
                    traceback.print_exc()
                pending = []
                last_flush = time.monotonic()
            if self._stop.is_set() and self.q.empty() and not pending:
                break
        con.close()

    def close(self, timeout=120):
        self._stop.set()
        self.t.join(timeout)

    def backlog(self):
        return self.q.qsize()


# --------------------------------------------------------------------------- selection
def clear_selection(list_name):
    con = connect()
    with con:
        con.execute("DELETE FROM selection WHERE list_name=?", (list_name,))
    con.close()


def selection_count(list_name):
    con = connect()
    n = con.execute("SELECT COUNT(*) FROM selection WHERE list_name=?", (list_name,)).fetchone()[0]
    con.close()
    return n
