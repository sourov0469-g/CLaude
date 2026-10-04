"""Lean exports: only what helps decide who to email and what to say."""
import re
from pathlib import Path

import db
import scoring
import scoring_run

FORMULA = ("=", "+", "-", "@", "\t", "\r")


_ILLEGAL = re.compile(r"[\x00-\x08\x0b\x0c\x0e-\x1f\ud800-\udfff]")


def safe(v):
    if v is None:
        return ""
    s = _ILLEGAL.sub("", str(v))[:32000]            # control chars make openpyxl raise; Excel cells max out at 32,767
    return "'" + s if s.lstrip().startswith(FORMULA) else s


COLS = ["Rank", "Tier", "Priority", "Company", "City", "State", "Decision maker", "Email", "Phone", "Website", "Pitch angle",
        "Website check", "Business profile", "Social", "Scores N/P/E", "Email opener"]
LOOKUP_COLS = ["Rank", "Company", "Website", "City", "State", "Phone", "Owner found", "Email", "Google reviews", "Pitch angle"]
STATE_TEXT = {"OK": "Loads fine", "NOT_CRAWLED": "Not checked yet", "BOT_BLOCKED": "Blocks bots (check by hand)", "ROBOTS_BLOCKED": "robots.txt forbids crawling",
              "JS_SHELL": "JS-only site (could not read)", "EMPTY": "Empty page", "UNREACHABLE": "Unreachable", "HTTP_ERROR": "HTTP error",
              "NO_WEBSITE": "NO WEBSITE", "SOCIAL_ONLY": "Social/directory page only", "FREE_BUILDER": "Free-builder subdomain"}
SOCIAL_SHORT = {"facebook": "FB", "instagram": "IG", "linkedin": "LI", "x_twitter": "X", "youtube": "YT"}


STATUS_PLAIN = {"OK": "Loads fine", "NOT_CRAWLED": "Not collected yet", "BOT_BLOCKED": "Blocked by bot protection (not read)",
                "ROBOTS_BLOCKED": "robots.txt forbids crawling", "JS_SHELL": "Needs JavaScript (little text readable)", "EMPTY": "Empty / unreadable page",
                "NO_WEBSITE": "No website listed", "SOCIAL_ONLY": "Only a social/directory page", "FREE_BUILDER": "Free-builder subdomain",
                "PARKED": "Domain parked / for sale", "SUSPENDED": "Hosting suspended", "DEFAULT_PAGE": "Server default page", "UNDER_CONSTRUCTION": "Under construction / coming soon",
                "DEAD_DNS": "Domain does not resolve (site down)", "HTTP_404": "Homepage returns 404", "DEAD_CONNECT": "Server refuses connections", "TIMEOUT": "Site times out",
                "HTTP_5XX": "Server errors", "HTTP_ERROR": "HTTP error", "UNREACHABLE": "Unreachable", "REDIRECTS_TO_PROFILE": "Redirects to a social/directory profile"}


def website_check(p, split=False):
    s = p["site"]
    st = s["state"]
    status = STATUS_PLAIN.get(st, scoring.STATE_LABEL.get(st, st))
    bits = [status]
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
    return (status, " | ".join(bits[1:])) if split else " | ".join(bits)


def business_profile(p, s=None):
    b, m = p["biz"], p["maps"]
    bits = []
    if m.get("reviews"):
        bits.append(f"Google {m['rating'] or '?'}★ / {m['reviews']} reviews")
    if s and s["revenue_band"]:
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
        "excerpts": {k: v for k, v in p["excerpts"].items() if v}, "data_notes": data_notes(p, {}), "pages_read": p["site"]["pages_crawled"],
    }


# ------------------------------------------------------------------------------------------------ research export (no ranking)
RESEARCH_COLS = ["Row", "Company", "Google category", "City", "State", "Phone", "Website (as listed)", "Google Maps URL", "Google rating", "Google reviews",
                 "Website status", "Website details", "Homepage title", "Homepage text", "Emails found", "Phones on site", "Social profiles",
                 "Owner / decision makers", "Team members", "Services & certifications", "Business facts", "Recent work", "About / team text", "Data notes"]
RESEARCH_WIDTHS = {"Row": 7, "Company": 30, "Google category": 22, "City": 14, "State": 6, "Phone": 15, "Website (as listed)": 30, "Google Maps URL": 24, "Google rating": 8,
                   "Google reviews": 9, "Website status": 26, "Website details": 60, "Homepage title": 34, "Homepage text": 70, "Emails found": 34, "Phones on site": 20,
                   "Social profiles": 44, "Owner / decision makers": 34, "Team members": 40, "Services & certifications": 50, "Business facts": 50, "Recent work": 44,
                   "About / team text": 70, "Data notes": 40}


def _people(lst, n):
    return " | ".join(f"{o['name']}" + (f" ({o['title']})" if o.get("title") else "") for o in lst[:n])


def data_notes(p, row_of):
    st, notes = p["site"]["state"], []
    if p.get("dup_of"):
        notes.append(f"Duplicate of row {row_of.get(p['dup_of'], '?')} (same website/phone): not crawled separately")
    if p["maps"].get("closed"):
        notes.append("Google lists this business as permanently closed")
    if st == "BOT_BLOCKED":
        notes.append("Website blocked the crawler (bot protection); retry from another network or check by hand")
    elif st == "JS_SHELL":
        notes.append("Site is built with JavaScript; little text could be read")
    elif st == "NOT_CRAWLED" and p["website"] and not p.get("dup_of"):
        notes.append("Not collected yet")
    elif st == "ROBOTS_BLOCKED":
        notes.append("robots.txt forbids crawling")
    elif st in ("TIMEOUT", "DEAD_CONNECT", "UNREACHABLE", "HTTP_5XX", "HTTP_ERROR"):
        notes.append("Site did not respond properly when crawled; worth a retry")
    if st == "OK" and p["site"]["pages_crawled"] == 1:
        notes.append("Only the homepage was read")
    return " | ".join(notes)


def research_row(p, row_of):
    c, b, ex = p["contact"], p["biz"], p["excerpts"]
    status, details = website_check(p, split=True)
    social = []
    sd = p.get("social") or {}
    for k, v in c["socials"].items():
        if v:
            n = (sd.get(k) or {}).get("followers") or (sd.get(k) or {}).get("likes")
            social.append(f"{SOCIAL_SHORT.get(k, k)}: {v[0]}" + (f" ({n:,})" if n else ""))
    for k, u in ((p.get("search") or {}).get("profiles") or {}).items():
        if k not in c["socials"]:
            social.append(f"{k.title()}: {u}")
    svc = list(b["services"])[:12] + list(b["credentials"])[:6] + list(b["license"])[:2]
    rw = " | ".join(f"{w['title']}" + (f" ({w['date']})" if w["date"] else "") for w in p["recent_work"] if w["title"])
    if b.get("project_dates"):
        rw = (rw + " | " if rw else "") + "latest dated content " + b["project_dates"][0]
    about = (ex["about"] + " " + ex["team"]).strip()
    return {
        "Row": p["source_row"], "Company": p["company"], "Google category": p["categories"], "City": p["city"], "State": p["state"], "Phone": p["phone"],
        "Website (as listed)": p["website"], "Google Maps URL": p["maps_url"], "Google rating": p["maps"]["rating"] or "", "Google reviews": p["maps"]["reviews"] or "",
        "Website status": status, "Website details": details, "Homepage title": p["titles"]["title"], "Homepage text": ex["homepage"],
        "Emails found": " | ".join(e["email"] for e in c["emails"][:6]), "Phones on site": " | ".join([x for x in c["phones"] if x != p["phone"]][:4]),
        "Social profiles": " | ".join(social), "Owner / decision makers": _people(p["people"]["owners"], 4), "Team members": _people(p["people"]["team_members"], 8),
        "Services & certifications": " | ".join(dict.fromkeys(svc)), "Business facts": business_profile(p), "Recent work": rw, "About / team text": about[:900],
        "Data notes": data_notes(p, row_of),
    }


def export_research(path, progress=None):
    """EVERY lead, original file order, everything collected, no ranking / scores / eligibility / estimates."""
    con = db.connect()
    row_of = {r[0]: r[1] for r in con.execute("SELECT lead_key, source_row FROM leads")}
    keys = [r[0] for r in con.execute("SELECT lead_key FROM leads ORDER BY source_row")]
    con.close()

    def rows():
        c2 = db.connect()
        try:
            for i, k in enumerate(keys):
                p = scoring_run.load_profile(c2, k)
                if p is None:
                    continue
                p["source_row"] = row_of.get(k)
                yield research_row(p, row_of)
                if progress and i % 5000 == 0:
                    progress(i)
        finally:
            c2.close()
    HEADER_NOTES.update(RESEARCH_WIDTHS)
    NUMERIC.update({"Row", "Google rating", "Google reviews"})
    return _write_xlsx(path, RESEARCH_COLS, rows(), "Research data")
