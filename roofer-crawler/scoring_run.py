"""Glue between the database and the scoring engine."""
import json

import db
import leadprofile
import scoring

LEAD_COLS = ("lead_key,source_row,company_name,website,domain,website_kind,phone,email,city,state,zip,address,categories,rating,reviews,"
             "maps_url,maps_extra_json,prefilter_class,dup_of")


def load_profile(con, lead_key):
    row = con.execute(f"SELECT {LEAD_COLS} FROM leads WHERE lead_key=?", (lead_key,)).fetchone()
    if not row:
        return None
    lead = dict(row)
    blob = db.get_blob(con, lead_key)
    pages = []
    for url, pg in (blob.get("pages") or {}).items():
        f = dict(pg.get("f") or {})
        f["_type"], f["_url"] = pg.get("t"), url
        pages.append(f)
    return leadprofile.build_profile(lead, pages, blob.get("data") or {})


_CFG = {"cfg": None}


def _store(con, key, s):
    con.execute("""INSERT INTO scores(lead_key,need,pay,ease,fit,priority,eligible,exclude_reason,site_state,pitch_angle,confidence,
                   revenue_band,revenue_basis,hooks_json,breakdown_json,scored_at)
                   VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
                   ON CONFLICT(lead_key) DO UPDATE SET need=excluded.need,pay=excluded.pay,ease=excluded.ease,fit=excluded.fit,
                   priority=excluded.priority,eligible=excluded.eligible,exclude_reason=excluded.exclude_reason,site_state=excluded.site_state,
                   pitch_angle=excluded.pitch_angle,confidence=excluded.confidence,revenue_band=excluded.revenue_band,
                   revenue_basis=excluded.revenue_basis,hooks_json=excluded.hooks_json,breakdown_json=excluded.breakdown_json,scored_at=excluded.scored_at""",
                (key, s["need"], s["pay"], s["ease"], s["fit"], s["priority"], s["eligible"], s["exclude_reason"], s["site_state"],
                 s["pitch_angle"], s["confidence"], s["revenue_band"], s["revenue_basis"], None, None, db.now()))   # explanations are recomputed on demand (keeps the DB small)


def score_lead(con, lead_key, cfg=None):
    """Used by the writer thread when a lead's stage finishes."""
    p = load_profile(con, lead_key)
    if p is None:
        return None
    if cfg is None:
        if _CFG["cfg"] is None:
            _CFG["cfg"] = scoring.load_config()
        cfg = _CFG["cfg"]
    s = scoring.score_profile(p, cfg)
    _store(con, lead_key, s)
    return s


def recompute_ranks(con=None):
    own = con is None
    con = con or db.connect()
    rows = [r[0] for r in con.execute("SELECT lead_key FROM scores WHERE eligible=1 ORDER BY priority DESC, need DESC, pay DESC, lead_key")]
    n = len(rows)
    cfg = scoring.load_config()
    a, b, c = cfg["tier_a_pct"], cfg["tier_b_pct"], cfg["tier_c_pct"]
    updates = []
    for i, k in enumerate(rows, 1):
        pct = i / n * 100
        updates.append((i, "A" if pct <= a else "B" if pct <= b else "C" if pct <= c else "D", k))
    with con:
        con.execute("UPDATE scores SET rank=NULL, tier='X' WHERE eligible=0")
        con.executemany("UPDATE scores SET rank=?, tier=? WHERE lead_key=?", updates)
    if own:
        con.close()
    return n


def rescore_all(progress=None):
    """Re-run scoring for every lead from stored data (no crawling). Use after changing weights."""
    _CFG["cfg"] = scoring.load_config()
    con = db.connect()
    keys = [r[0] for r in con.execute("SELECT lead_key FROM leads ORDER BY id")]
    done = 0
    for i in range(0, len(keys), 2000):
        with con:
            for k in keys[i:i + 2000]:
                score_lead(con, k, _CFG["cfg"])
                done += 1
        if progress:
            progress(done)
    recompute_ranks(con)
    con.close()
    return done


def select_top(list_name, n, states=None, tiers=None, angles=None, min_reviews=0, need_email=False, site_states=None):
    """Persist the Top-N eligible leads into a named selection (e.g. 'deep' for the deep crawl)."""
    con = db.connect()
    where, params = ["sc.eligible=1", "l.dup_of IS NULL"], []
    if states:
        where.append("l.state IN (%s)" % ",".join("?" * len(states)))
        params += [s.upper() for s in states]
    if tiers:
        where.append("sc.tier IN (%s)" % ",".join("?" * len(tiers)))
        params += list(tiers)
    if angles:
        where.append("sc.pitch_angle IN (%s)" % ",".join("?" * len(angles)))
        params += list(angles)
    if site_states:
        where.append("sc.site_state IN (%s)" % ",".join("?" * len(site_states)))
        params += list(site_states)
    if min_reviews:
        where.append("COALESCE(l.reviews,0)>=?")
        params.append(int(min_reviews))
    rows = con.execute(f"""SELECT l.lead_key FROM leads l JOIN scores sc ON sc.lead_key=l.lead_key
                           WHERE {' AND '.join(where)} ORDER BY sc.priority DESC LIMIT ?""", params + [int(n)]).fetchall()
    ts = db.now()
    with con:
        con.execute("DELETE FROM selection WHERE list_name=?", (list_name,))
        con.executemany("INSERT INTO selection(lead_key,list_name,rank,selected_at) VALUES(?,?,?,?)",
                        [(r[0], list_name, i + 1, ts) for i, r in enumerate(rows)])
    con.close()
    return len(rows)
