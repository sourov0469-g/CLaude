"""Lean exports: only what helps decide who to email and what to say."""
from pathlib import Path

import db
import scoring
import scoring_run

FORMULA = ("=", "+", "-", "@", "\t", "\r")


def safe(v):
    if v is None:
        return ""
    s = str(v).replace("\x00", "")
    return "'" + s if s.lstrip().startswith(FORMULA) else s


COLS = ["Rank", "Tier", "Priority", "Company", "City", "State", "Decision maker", "Email", "Phone", "Website", "Pitch angle",
        "Website check", "Business profile", "Social", "Scores N/P/E", "Email opener"]
LOOKUP_COLS = ["Rank", "Company", "Website", "City", "State", "Phone", "Owner found", "Email", "Google reviews", "Pitch angle"]
STATE_TEXT = {"OK": "Loads fine", "NOT_CRAWLED": "Not checked yet", "BOT_BLOCKED": "Blocks bots (check by hand)", "ROBOTS_BLOCKED": "robots.txt forbids crawling",
              "JS_SHELL": "JS-only site (could not read)", "EMPTY": "Empty page", "UNREACHABLE": "Unreachable", "HTTP_ERROR": "HTTP error",
              "NO_WEBSITE": "NO WEBSITE", "SOCIAL_ONLY": "Social/directory page only", "FREE_BUILDER": "Free-builder subdomain"}
SOCIAL_SHORT = {"facebook": "FB", "instagram": "IG", "linkedin": "LI", "x_twitter": "X", "youtube": "YT"}


def website_check(p):
    s = p["site"]
    st = s["state"]
    bits = [scoring.STATE_LABEL.get(st, STATE_TEXT.get(st, st)).capitalize() if st != "OK" else "Loads fine"]
    if st in ("OK", "JS_SHELL"):
        if s.get("ssl_error"):
            bits.append("INVALID SSL")
        elif s.get("https") is False:
            bits.append("HTTP only (Not secure)")
        if s.get("has_viewport") is False:
            bits.append("not mobile-friendly")
        if s.get("last_updated"):
            bits.append(f"last update {s['last_updated']} ({s['last_updated_source']})")
        if s.get("builder"):
            bits.append("built on " + s["builder"] + (f"/{s['wp']['themes'][0]}" if s.get("wp", {}).get("themes") else ""))
        if s.get("agency"):
            bits.append("agency: " + s["agency"])
        if s.get("outdated"):
            bits.append("legacy: " + ", ".join(s["outdated"][:3]))
        if not s.get("tel_links") and not s.get("forms"):
            bits.append("no call button or form")
        if s.get("hosting"):
            bits.append("host: " + s["hosting"])
    rd = p.get("rdap") or {}
    if rd.get("not_registered"):
        bits.append("DOMAIN NOT REGISTERED")
    elif rd.get("created"):
        t = f"domain since {rd['created'][:4]}" + (f" ({rd['registrar']})" if rd.get("registrar") else "")
        if rd.get("days_to_expiry") is not None and rd["days_to_expiry"] < 90:
            t += f", EXPIRES IN {max(0, rd['days_to_expiry'])} DAYS"
        if rd.get("dead_flag"):
            t += ", LAPSED/ON HOLD"
        bits.append(t)
    return " | ".join(bits)


def business_profile(p, s):
    b, m = p["biz"], p["maps"]
    bits = []
    if m.get("reviews"):
        bits.append(f"Google {m['rating'] or '?'}★ / {m['reviews']} reviews")
    if s["revenue_band"]:
        bits.append("est. revenue " + s["revenue_band"])
    if b.get("team_size"):
        bits.append(f"team ~{b['team_size']}")
    if b.get("years_in_business"):
        bits.append(f"{b['years_in_business']} yrs in business")
    if b["elite"]:
        bits.append("elite manufacturer cert")
    elif b["credentials"]:
        bits.append(b["credentials"][0])
    for flag, text in ((b["financing"], "financing"), (b["storm"], "storm/insurance work"), (b["commercial"], "commercial"), (b["hiring"], "hiring")):
        if flag:
            bits.append(text)
    if b["stack"].get("ads"):
        bits.append("runs ads (" + ", ".join(b["stack"]["ads"][:2]) + ")")
    if b["stack"].get("roofing_software"):
        bits.append("uses " + ", ".join(b["stack"]["roofing_software"][:2]))
    if b.get("scale_claim"):
        bits.append(f"{b['scale_claim']:,}+ jobs claimed")
    pd, sm = b.get("project_dates") or [], (p["site"].get("sitemap") or {})
    if pd or sm.get("project_urls"):
        bits.append("recent work: " + ", ".join(x for x in (f"latest {pd[0]}" if pd else "", f"{sm['project_urls']} project pages" if sm.get("project_urls") else "") if x))
    sr = p.get("search") or {}
    if sr.get("bbb"):
        bits.append("BBB " + (sr["bbb"].get("rating") or "listed") + (" accredited" if sr["bbb"].get("accredited") else ""))
    if sr.get("local_rank_checked"):
        bits.append(f"Google local rank #{sr['local_rank']}" if sr.get("local_rank") else "not on Google page 1 locally")
    return " | ".join(bits)


def _row(p, s, rank, hooks):
    own = p["people"]["owners"][0] if p["people"]["owners"] else {}
    c = p["contact"]
    sdata = p.get("social") or {}

    def fmt(k, v):
        d = sdata.get(k) or {}
        n = d.get("followers") or d.get("likes")
        return f"{SOCIAL_SHORT.get(k, k)}: {v[0]}" + (f" ({n:,})" if n else "")
    social = " | ".join(fmt(k, v) for k, v in c["socials"].items() if v)
    for k, u in ((p.get("search") or {}).get("profiles") or {}).items():
        if k in ("yelp", "angi", "houzz") or k not in c["socials"]:
            social += (" | " if social else "") + f"{k.title()}: {u}"
    return {
        "Rank": rank, "Tier": s["tier"] or "", "Priority": s["priority"], "Company": p["company"], "City": p["city"], "State": p["state"],
        "Decision maker": (f"{own['name']} ({own['title']})" if own.get("title") else own.get("name", "")), "Email": c["best_email"],
        "Phone": c["best_phone"], "Website": p["website"], "Pitch angle": s["pitch_angle"], "Website check": website_check(p),
        "Business profile": business_profile(p, s), "Social": social, "Scores N/P/E": f"{s['need']:.0f}/{s['pay']:.0f}/{s['ease']:.0f}",
        "Email opener": hooks.get("first_line", ""),
    }


def _iter(list_name=None, top_n=None, eligible_only=True, tiers=None):
    cfg = scoring.load_config()
    con = db.connect()
    q = "SELECT sc.*, l.lead_key lk FROM scores sc JOIN leads l ON l.lead_key=sc.lead_key "
    params = []
    if list_name:
        q += "JOIN selection sel ON sel.lead_key=sc.lead_key AND sel.list_name=? "
        params.append(list_name)
    q += "WHERE 1=1 " + ("AND sc.eligible=1 " if eligible_only else "")
    if tiers:
        q += "AND sc.tier IN (%s) " % ",".join("?" * len(tiers))
        params += list(tiers)
    q += "ORDER BY sc.eligible DESC, sc.priority DESC"
    if top_n:
        q += " LIMIT ?"
        params.append(int(top_n))
    cur = con.execute(q, params)
    rank = 0
    for s in cur:
        s = dict(s)
        p = scoring_run.load_profile(con, s["lk"])
        if p is None:
            continue
        rank += 1
        yield p, s, rank, scoring.score_profile(p, cfg)["hooks"]
    con.close()


HEADER_NOTES = {"Rank": 7, "Tier": 5, "Priority": 9, "Company": 32, "City": 15, "State": 6, "Decision maker": 26, "Email": 30, "Phone": 15, "Website": 30,
                "Pitch angle": 24, "Website check": 70, "Business profile": 70, "Social": 40, "Scores N/P/E": 11, "Email opener": 80,
                "Owner found": 22, "Google reviews": 9, "Excluded because": 38}
NUMERIC = {"Rank", "Priority", "Google reviews"}


def _recompress(path):
    """Rewrite the xlsx zip at maximum deflate level (typically 10-25% smaller than openpyxl's default)."""
    import os
    import zipfile
    tmp = str(path) + ".tmp"
    with zipfile.ZipFile(path) as zin, zipfile.ZipFile(tmp, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as zout:
        for item in zin.infolist():
            zout.writestr(item.filename, zin.read(item.filename))
    os.replace(tmp, path)


def _write_xlsx(path, columns, rows, sheet="Leads"):
    from openpyxl import Workbook
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    wb = Workbook(write_only=True)
    ws = wb.create_sheet(sheet)
    for i, c in enumerate(columns, 1):
        ws.column_dimensions[chr(64 + i) if i <= 26 else "A" + chr(64 + i - 26)].width = HEADER_NOTES.get(c, 14)
    ws.freeze_panes = "A2"
    ws.append(columns)
    n = 0
    for row in rows:
        ws.append([_cell(c, row.get(c)) for c in columns])
        n += 1
    ws.auto_filter.ref = f"A1:{chr(64 + len(columns)) if len(columns) <= 26 else 'A' + chr(64 + len(columns) - 26)}{max(2, n + 1)}"
    wb.save(path)
    _recompress(path)
    return n


def _cell(col, v):
    if v is None or v == "":
        return None
    if col in NUMERIC:
        try:
            return float(v) if "." in str(v) else int(v)
        except (TypeError, ValueError):
            return safe(v)
    return safe(v)


def export_outreach(path, top_n=None, tiers=None, only_with_contact=False):
    def rows():
        for p, s, rank, hooks in _iter(top_n=top_n, tiers=tiers):
            row = _row(p, s, rank, hooks)
            if only_with_contact and not (row["Email"] or row["Phone"]):
                continue
            yield row
    return _write_xlsx(path, COLS, rows(), "Outreach")


def export_owner_lookup(path, top_n=None):
    """The shortlist to feed an owner/email lookup service."""
    def rows():
        for p, s, rank, hooks in _iter(top_n=top_n):
            r = _row(p, s, rank, hooks)
            yield {"Rank": rank, "Company": r["Company"], "Website": r["Website"], "City": r["City"], "State": r["State"], "Phone": r["Phone"],
                   "Owner found": r["Decision maker"], "Email": r["Email"], "Google reviews": p["maps"]["reviews"] or "", "Pitch angle": r["Pitch angle"]}
    return _write_xlsx(path, LOOKUP_COLS, rows(), "Owner lookup")


def export_everything(path):
    """All leads incl. excluded ones with the reason (so nothing silently disappears)."""
    def rows():
        for p, s, rank, hooks in _iter(eligible_only=False):
            row = _row(p, s, rank if s["eligible"] else "", hooks)
            row["Excluded because"] = s["exclude_reason"]
            yield row
    return _write_xlsx(path, COLS + ["Excluded because"], rows(), "All leads")


def lead_dossier(lead_key):
    """Only decision-relevant facts for one lead (the dashboard detail panel)."""
    con = db.connect()
    p = scoring_run.load_profile(con, lead_key)
    s = con.execute("SELECT * FROM scores WHERE lead_key=?", (lead_key,)).fetchone()
    con.close()
    if not p or not s:
        return None
    s = dict(s)
    fresh = scoring.score_profile(p)
    hooks, br = fresh["hooks"], fresh["breakdown"]
    site = p["site"]
    return {
        "company": p["company"], "website": p["website"], "city": p["city"], "state": p["state"], "phone": p["contact"]["best_phone"],
        "scores": {k: s[k] for k in ("priority", "need", "pay", "ease", "tier", "rank")}, "pitch_angle": s["pitch_angle"],
        "site_state": site["state"], "eligible": bool(s["eligible"]), "excluded_because": s["exclude_reason"],
        "problems": hooks.get("problems", []), "strengths": hooks.get("strengths", []), "first_line": hooks.get("first_line", ""),
        "owners": p["people"]["owners"][:4], "team_members": p["people"]["team_members"][:8], "emails": [e["email"] for e in p["contact"]["emails"][:4]],
        "socials": {k: v[0] for k, v in p["contact"]["socials"].items() if v}, "google": {"rating": p["maps"]["rating"], "reviews": p["maps"]["reviews"]},
        "est_revenue": s["revenue_band"], "revenue_basis": s["revenue_basis"], "team_size": p["biz"]["team_size"],
        "years_in_business": p["biz"]["years_in_business"], "built_with": site.get("builder") or "", "agency": site.get("agency") or "",
        "last_updated": site.get("last_updated"), "last_updated_source": site.get("last_updated_source"),
        "why": {k: [x for x in v if abs(x[1]) >= 4] for k, v in br.items()},
    }
