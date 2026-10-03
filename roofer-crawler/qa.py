"""QA tests before a big crawl: pick EXACTLY N leads (random, or only likely roofers), crawl only those, report quality."""
import random

import db
import scoring_run

TEST_LIST = "test"
STAGES = ("triage", "deep", "social", "domain", "search")


def select_test(kind="roofers", n=100, seed=None):
    """kind: 'roofers' = random likely roofers (the useful one); 'raw' = random leads of any kind (technical reliability)."""
    con = db.connect()
    where = "crawlable=1 AND dup_of IS NULL" + (" AND prefilter_class='LIKELY_ROOFER'" if kind == "roofers" else "")
    keys = [r[0] for r in con.execute(f"SELECT lead_key FROM leads WHERE {where}")]
    rnd = random.Random(seed)
    pick = rnd.sample(keys, min(int(n), len(keys)))
    ts = db.now()
    with con:
        con.execute("DELETE FROM selection WHERE list_name=?", (TEST_LIST,))
        con.executemany("INSERT INTO selection(lead_key,list_name,rank,selected_at) VALUES(?,?,?,?)", [(k, TEST_LIST, i + 1, ts) for i, k in enumerate(pick)])
        # start these leads from a clean slate so the test measures the real pipeline, and nothing else is touched
        for k in pick:
            con.execute("DELETE FROM lead_stage WHERE lead_key=?", (k,))
            con.execute("DELETE FROM pages WHERE lead_key=?", (k,))
            con.execute("DELETE FROM lead_data WHERE lead_key=?", (k,))
    con.close()
    return len(pick)


def report():
    con = db.connect()
    keys = [r[0] for r in con.execute("SELECT lead_key FROM selection WHERE list_name=? ORDER BY rank", (TEST_LIST,))]
    out = {"n": len(keys), "rows": []}
    if not keys:
        con.close()
        return out
    stage = {}
    for r in con.execute("SELECT lead_key,stage,status,error FROM lead_stage WHERE lead_key IN (SELECT lead_key FROM selection WHERE list_name=?)", (TEST_LIST,)):
        stage.setdefault(r["lead_key"], {})[r["stage"]] = (r["status"], r["error"])
    states, reasons = {}, {}
    pages_total = confirmed = owners = emails = readable = 0
    for k in keys:
        p = scoring_run.load_profile(con, k)
        sc = con.execute("SELECT eligible,exclude_reason,pitch_angle,priority,tier FROM scores WHERE lead_key=?", (k,)).fetchone()
        st = p["site"]["state"]
        states[st] = states.get(st, 0) + 1
        if not sc["eligible"]:
            reasons[sc["exclude_reason"]] = reasons.get(sc["exclude_reason"], 0) + 1
        npages = p["site"]["pages_crawled"]
        pages_total += npages
        readable += st == "OK"
        confirmed += bool(p["biz"]["roofing_confirmed"])
        owners += bool(p["people"]["owners"])
        emails += bool(p["contact"]["emails"])
        out["rows"].append({"company": p["company"], "website": p["website"], "category": p["categories"][:40], "prefilter": p["prefilter"], "site_state": st,
                            "pages": npages, "roofing_confirmed": bool(p["biz"]["roofing_confirmed"]), "roof_terms": p["biz"]["roof_terms"][:4],
                            "owner": (p["people"]["owners"][0]["name"] if p["people"]["owners"] else ""), "email": p["contact"]["best_email"],
                            "eligible": bool(sc["eligible"]), "excluded_because": sc["exclude_reason"], "pitch": sc["pitch_angle"], "priority": sc["priority"],
                            "triage": stage.get(k, {}).get("triage", ("pending", ""))[0], "deep": stage.get(k, {}).get("deep", ("-", ""))[0]})
    st_counts = {}
    for k, s in stage.items():
        for name, (status, _) in s.items():
            st_counts.setdefault(name, {}).setdefault(status, 0)
            st_counts[name][status] += 1
    out.update({"stage_counts": st_counts, "site_states": states, "excluded_reasons": reasons, "readable_sites": readable,
                "roofing_confirmed": confirmed, "owner_found": owners, "email_found": emails,
                "avg_pages": round(pages_total / max(1, readable), 1)})
    con.close()
    return out
