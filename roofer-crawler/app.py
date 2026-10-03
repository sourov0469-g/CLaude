"""Local dashboard (Flask). Binds to 127.0.0.1 only."""
import json
import os
import secrets
import shutil
import subprocess
import sys
import time
from pathlib import Path

import psutil
import qa
from flask import Flask, abort, jsonify, redirect, render_template, request, send_file, session, url_for
from werkzeug.utils import secure_filename

import config
import db
import engine as eng_mod
import exporter
import importer
import scoring
import scoring_run

config.ensure_dirs()
db.init_db()
app = Flask(__name__)
app.secret_key = os.urandom(32)
app.config["MAX_CONTENT_LENGTH"] = 400 * 1024 * 1024
PID = config.DATA / "runner.pid"
try:
    VERSION = (config.BASE / "VERSION.txt").read_text().strip()
except Exception:
    VERSION = "5.0"


def csrf():
    if "t" not in session:
        session["t"] = secrets.token_urlsafe(24)
    return session["t"]


app.jinja_env.globals["csrf"] = csrf


@app.before_request
def guard():
    if request.method == "POST":
        sent = request.headers.get("X-CSRF") or request.form.get("_csrf") or ""
        if not session.get("t") or not secrets.compare_digest(session["t"], sent):
            abort(400)


@app.after_request
def headers(r):
    if request.method == "POST":
        _FUNNEL["v"] = None                      # any change (import, reset, select, start...) must show immediately
    r.headers.update({"X-Frame-Options": "DENY", "X-Content-Type-Options": "nosniff", "Referrer-Policy": "no-referrer",
                      "Content-Security-Policy": "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:"})
    return r


# ----------------------------------------------------------------------------- runner process
def runner_alive():
    try:
        info = json.loads(PID.read_text())
        p = psutil.Process(int(info["pid"]))
        return p.is_running() and abs(p.create_time() - info["created"]) < 3 and "crawler_runner" in " ".join(p.cmdline())
    except Exception:
        return False


def launch(stage, mode, concurrency, auto, limit=0, list_name=None):
    if runner_alive():
        return False, "A crawl is already running. Change its power live, or stop it first."
    con = db.connect()
    n = con.execute("SELECT COUNT(*) FROM leads").fetchone()[0]
    con.close()
    if not n:
        return False, "Import your leads first."
    meta = db.get_meta_all()
    cmd = [sys.executable, str(config.BASE / "crawler_runner.py"), "--stage", stage, "--concurrency", str(config.clamp_concurrency(concurrency)),
           "--deep-pages", meta.get("deep_pages", "6"), "--limit", str(int(limit or 0))]
    if auto:
        cmd.append("--auto")
    if list_name:
        cmd += ["--list", list_name]
    if meta.get("obey_robots", "1") == "0":
        cmd.append("--no-robots")
    if meta.get("include_nonroofers") == "1":
        cmd.append("--include-nonroofers")
    log = open(config.LOGS / "runner.log", "ab", buffering=0)
    kw = {"cwd": str(config.BASE), "stdout": log, "stderr": subprocess.STDOUT}
    if os.name == "nt":
        kw["creationflags"] = subprocess.CREATE_NO_WINDOW
    else:
        kw["start_new_session"] = True
    p = subprocess.Popen(cmd, **kw)
    time.sleep(0.4)
    if p.poll() is not None:
        return False, "The crawler failed to start. See logs/runner.log."
    PID.write_text(json.dumps({"pid": p.pid, "created": psutil.Process(p.pid).create_time()}))
    return True, f"Started {stage} at power {config.clamp_concurrency(concurrency)}{' (auto)' if auto else ''}."


# ----------------------------------------------------------------------------- data for the page
_FUNNEL = {"at": 0.0, "v": None}


def funnel():
    """Counting 100k leads across 5 stages is not free: reuse the result for 3 seconds."""
    if _FUNNEL["v"] is not None and time.time() - _FUNNEL["at"] < 3:
        return _FUNNEL["v"]
    _FUNNEL["v"], _FUNNEL["at"] = _funnel(), time.time()
    return _FUNNEL["v"]


def _funnel():
    con = db.connect()
    q = lambda sql, *a: con.execute(sql, a).fetchone()[0]
    out = {
        "total": q("SELECT COUNT(*) FROM leads"),
        "no_website": q("SELECT COUNT(*) FROM leads WHERE website_kind='NONE'"),
        "social_only": q("SELECT COUNT(*) FROM leads WHERE website_kind='SOCIAL_DIRECTORY'"),
        "free_builder": q("SELECT COUNT(*) FROM leads WHERE website_kind='FREE_BUILDER'"),
        "real_site": q("SELECT COUNT(*) FROM leads WHERE website_kind='REAL'"),
        "duplicates": q("SELECT COUNT(*) FROM leads WHERE dup_of IS NOT NULL"),
        "eligible": q("SELECT COUNT(*) FROM scores WHERE eligible=1"),
        "excluded": q("SELECT COUNT(*) FROM scores WHERE eligible=0"),
        "tiers": {r[0]: r[1] for r in con.execute("SELECT tier,COUNT(*) FROM scores WHERE eligible=1 GROUP BY tier")},
        "states": {r[0]: r[1] for r in con.execute("SELECT site_state,COUNT(*) FROM scores WHERE eligible=1 GROUP BY site_state ORDER BY 2 DESC")},
        "angles": [r[0] for r in con.execute("SELECT pitch_angle FROM scores WHERE eligible=1 GROUP BY pitch_angle ORDER BY COUNT(*) DESC LIMIT 12")],
        "excluded_reasons": {r[0]: r[1] for r in con.execute("SELECT exclude_reason,COUNT(*) FROM scores WHERE eligible=0 GROUP BY exclude_reason ORDER BY 2 DESC LIMIT 6")},
    }
    con.close()
    skip = db.get_meta("include_nonroofers") != "1"
    out["triage"] = db.stage_counts("triage", None, skip)
    out["deep"] = db.stage_counts("deep", "deep", skip) if db.selection_count("deep") else {"total": 0, "done": 0, "failed": 0, "pending": 0, "skipped": 0}
    out["selected"] = db.selection_count("deep")
    for st in ("social", "domain", "search"):
        out[st] = db.stage_counts(st, "deep", skip) if out["selected"] else {"total": 0, "done": 0, "failed": 0, "pending": 0, "skipped": 0}
    return out


def sysinfo():
    vm = psutil.virtual_memory()
    return {"ram_free_gb": round(vm.available / 1024 ** 3, 1), "cpu": psutil.cpu_percent(interval=None),
            "disk_free_gb": round(shutil.disk_usage(config.BASE).free / 1024 ** 3, 1), "db_mb": round(config.db_path().stat().st_size / 1024 ** 2) if config.db_path().exists() else 0}


def leads_page(args):
    where, params = ["sc.eligible=1" if args.get("show") != "excluded" else "sc.eligible=0"], []
    for col, key in (("sc.tier", "tier"), ("l.state", "state"), ("sc.pitch_angle", "angle"), ("sc.site_state", "site_state")):
        if args.get(key):
            where.append(f"{col}=?")
            params.append(args[key].upper() if key == "state" else args[key])
    if args.get("q"):
        where.append("l.company_name LIKE ?")
        params.append(f"%{args['q']}%")
    def to_int(v, default):
        try:
            return int(v)
        except (TypeError, ValueError):
            return default
    limit = max(1, min(200, to_int(args.get("limit"), 50)))
    offset = max(0, to_int(args.get("offset"), 0))
    con = db.connect()
    total = con.execute(f"SELECT COUNT(*) FROM leads l JOIN scores sc ON sc.lead_key=l.lead_key WHERE {' AND '.join(where)}", params).fetchone()[0]
    rows = con.execute(f"""SELECT l.lead_key,l.company_name,l.city,l.state,l.reviews,l.rating,l.website,sc.priority,sc.need,sc.pay,sc.ease,sc.tier,sc.rank,
                           sc.pitch_angle,sc.site_state,sc.revenue_band,sc.exclude_reason FROM leads l JOIN scores sc ON sc.lead_key=l.lead_key
                           WHERE {' AND '.join(where)} ORDER BY sc.priority DESC LIMIT ? OFFSET ?""", params + [limit, offset]).fetchall()
    con.close()
    return {"total": total, "rows": [dict(r) for r in rows]}


def status_payload():
    st = eng_mod.read_status()
    alive = runner_alive()
    if not alive and st.get("status") in ("RUNNING", "FINISHING"):
        st["status"] = "STOPPED"
    from stage_search import configured
    prov, ok = configured()
    return {"running": alive, "runner": st, "funnel": funnel(), "search": {"provider": prov, "configured": ok}, "sys": sysinfo(), "config": scoring.load_config(),
            "dataset": db.get_meta("dataset_name", ""), "version": VERSION, "limits": {
                "normal_max": config.CUSTOM_NORMAL_MAX, "unlocked_max": config.CUSTOM_UNLOCKED_MAX, "unlock_steps": config.CUSTOM_UNLOCK_STEPS,
                "presets": config.POWER_PRESETS, "default_custom": config.DEFAULT_CUSTOM},
            "settings": {"deep_pages": int(db.get_meta("deep_pages", "6")), "obey_robots": db.get_meta("obey_robots", "1") == "1",
                         "include_nonroofers": db.get_meta("include_nonroofers") == "1", "top_n": int(db.get_meta("top_n", str(config.DEFAULT_TOP_N)))}}


# ----------------------------------------------------------------------------- routes
@app.get("/")
def home():
    return render_template("dashboard.html")


@app.get("/favicon.ico")
def favicon():
    return "", 204


@app.get("/healthz")
def healthz():
    return jsonify({"ok": True, "app": config.APP_NAME, "base": str(config.BASE.resolve()), "version": VERSION})


@app.get("/api/status")
def api_status():
    return jsonify(status_payload())


@app.get("/api/leads")
def api_leads():
    return jsonify(leads_page(request.args))


@app.get("/api/lead/<key>")
def api_lead(key):
    d = exporter.lead_dossier(key)
    return jsonify(d) if d else (jsonify({"error": "not found"}), 404)


@app.post("/api/import")
def api_import():
    if runner_alive():
        return jsonify({"ok": False, "msg": "Stop the crawl before importing."})
    f = request.files.get("file")
    if not f or not f.filename:
        return jsonify({"ok": False, "msg": "Choose a CSV or XLSX file."})
    name = secure_filename(Path(f.filename).name)
    dest = config.UPLOADS / name
    f.save(dest)
    try:
        info = importer.inspect_file(dest)
        res = importer.import_dataset(dest, replace=bool(request.form.get("replace")))
        db.set_meta("dataset_name", name)
        return jsonify({"ok": True, "msg": f"Imported {res['inserted']:,} leads: {res['real_website']:,} with a website, {res['no_website']:,} with none, "
                        f"{res['social_only']:,} social-only, {res['free_builder']:,} free-builder; {res['duplicates']:,} duplicates, "
                        f"{res['closed']:,} permanently closed, {res['obvious_non_roofer']:,} non-roofers flagged.", "mapping": info["mapping"]})
    except Exception as e:
        return jsonify({"ok": False, "msg": str(e)})


@app.post("/api/start")
def api_start():
    d = request.get_json(force=True, silent=True) or {}
    stage = d.get("stage", "triage")
    if stage not in ("triage", "deep", "social", "domain", "search"):
        return jsonify({"ok": False, "msg": "unknown stage"})
    if stage != "triage" and not db.selection_count("deep"):
        return jsonify({"ok": False, "msg": "Pick your shortlist first (Step 3)."})
    if stage == "search":
        from stage_search import configured
        if not configured()[1]:
            return jsonify({"ok": False, "msg": "Add a search API key in Settings first (Serper, Brave or SerpAPI)."})
    if stage == "social":      # one click = social profiles THEN domain/SSL intel (chained inside one background job)
        stage = "social+domain"
    ok, msg = launch(stage, d.get("mode", "custom"), d.get("concurrency", config.DEFAULT_CUSTOM), bool(d.get("auto")), d.get("limit", 0),
                     None if stage == "triage" else "deep")
    return jsonify({"ok": ok, "msg": msg})


@app.post("/api/control")
def api_control():
    d = request.get_json(force=True, silent=True) or {}
    upd = {}
    if "concurrency" in d:
        upd["concurrency"] = config.clamp_concurrency(d["concurrency"])
    for k in ("paused", "stop", "auto"):
        if k in d:
            upd[k] = bool(d[k])
    if not runner_alive():
        return jsonify({"ok": False, "msg": "Nothing is running."})
    eng_mod.write_control(**upd)
    return jsonify({"ok": True, "msg": "Applied live: " + ", ".join(f"{k}={v}" for k, v in upd.items())})


@app.post("/api/qa_test")
def api_qa_test():
    d = request.get_json(force=True, silent=True) or {}
    if runner_alive():
        return jsonify({"ok": False, "msg": "Stop the running crawl first."})
    kind = "raw" if d.get("kind") == "raw" else "roofers"
    n = qa.select_test(kind, 100)
    if not n:
        return jsonify({"ok": False, "msg": "No matching leads to test (import first)."})
    ok, msg = launch("triage+deep", "custom", min(config.clamp_concurrency(d.get("concurrency", 100)), 200), False, 0, qa.TEST_LIST)
    label = "100 likely roofers" if kind == "roofers" else "100 random leads"
    return jsonify({"ok": ok, "msg": f"QA test on exactly {n} leads ({label}). " + msg})


@app.get("/api/qa_report")
def api_qa_report():
    return jsonify(qa.report())


@app.post("/api/search_key")
def api_search_key():
    d = request.get_json(force=True, silent=True) or {}
    from stage_search import save_key
    try:
        if not str(d.get("key", "")).strip():
            return jsonify({"ok": False, "msg": "Paste the API key."})
        save_key(d.get("provider", "serper"), d["key"])
    except ValueError as e:
        return jsonify({"ok": False, "msg": str(e)})
    return jsonify({"ok": True, "msg": "Search key saved on this PC (data/api_keys.json). It is never exported."})


@app.post("/api/select")
def api_select():
    d = request.get_json(force=True, silent=True) or {}
    n = max(1, min(500000, int(d.get("top_n", config.DEFAULT_TOP_N))))
    db.set_meta("top_n", n)
    scoring_run.recompute_ranks()
    got = scoring_run.select_top("deep", n, states=d.get("states") or None, min_reviews=int(d.get("min_reviews") or 0))
    return jsonify({"ok": True, "msg": f"Selected the top {got:,} leads for the deep crawl."})


@app.post("/api/settings")
def api_settings():
    d = request.get_json(force=True, silent=True) or {}
    db.set_meta("deep_pages", max(1, min(12, int(d.get("deep_pages", 6)))))
    db.set_meta("obey_robots", "1" if d.get("obey_robots", True) else "0")
    db.set_meta("include_nonroofers", "1" if d.get("include_nonroofers") else "0")
    upd = {k: d[k] for k in ("w_need", "w_pay", "w_ease", "min_reviews") if k in d}
    if upd:
        scoring.save_config(upd)
        scoring_run._CFG["cfg"] = None
    return jsonify({"ok": True, "msg": "Settings saved. Click 'Re-score' to apply score-weight changes to existing leads."})


@app.post("/api/rescore")
def api_rescore():
    if runner_alive():
        return jsonify({"ok": False, "msg": "Wait for the crawl to stop."})
    n = scoring_run.rescore_all()
    return jsonify({"ok": True, "msg": f"Re-scored {n:,} leads."})


@app.post("/api/retry")
def api_retry():
    if runner_alive():
        return jsonify({"ok": False, "msg": "Stop the crawl first."})
    n = db.retry_failed(request.get_json(force=True, silent=True).get("stage", "triage"))
    return jsonify({"ok": True, "msg": f"{n:,} failed sites will be retried on the next run."})


@app.post("/api/reset")
def api_reset():
    if runner_alive():
        return jsonify({"ok": False, "msg": "Stop the crawl first."})
    if (request.get_json(force=True, silent=True) or {}).get("confirm") != "RESET":
        return jsonify({"ok": False, "msg": "Type RESET to confirm."})
    db.backup_database(config.BACKUPS / f"before_reset_{time.strftime('%Y%m%d_%H%M%S')}.db")
    con = db.connect()
    with con:
        for t in ("pages", "lead_data", "scores", "lead_stage", "selection", "leads", "runs", "meta"):
            con.execute(f"DELETE FROM {t}")
    con.close()
    return jsonify({"ok": True, "msg": "Cleared (a backup copy was saved first)."})


@app.get("/export/<kind>")
def export(kind):
    out = config.OUTPUT
    top_n = int(request.args.get("top_n") or db.get_meta("top_n", str(config.DEFAULT_TOP_N)))
    if kind == "outreach":
        p = out / f"outreach_top_{top_n}.xlsx"
        exporter.export_outreach(p, top_n=top_n)
    elif kind == "lookup":
        p = out / f"owner_lookup_top_{top_n}.xlsx"
        exporter.export_owner_lookup(p, top_n=top_n)
    elif kind == "all":
        p = out / "all_leads_scored.xlsx"
        exporter.export_everything(p)
    else:
        abort(404)
    return send_file(p, as_attachment=True, download_name=p.name, max_age=0)


if __name__ == "__main__":
    port = int(os.environ.get("ROOFER_DASHBOARD_PORT", "8765"))
    app.run(host="127.0.0.1", port=port, debug=False, threaded=True, use_reloader=False)
