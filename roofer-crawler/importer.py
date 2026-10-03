"""Lead import: CSV/XLSX (Google Maps exports from Outscraper, Apify, PhantomBuster, etc.).

Unlike v4, leads WITHOUT a website are kept: a roofer with 150 reviews and no site is the best prospect there is.
"""
import csv
import json
import re
from pathlib import Path

import db
from urlutil import clean_scalar, normalize_start_url, registrable_domain, website_kind, looks_like_maps_url
from extract import US_STATES, US_ABBRS, ZIP_STATE_RE

# canonical field -> candidate header names (normalised: lowercase, non-alnum -> space)
FIELD_CANDIDATES = {
    "id": ["master row id", "row id", "lead id", "id", "place id", "google id", "cid"],
    "name": ["business name", "company name", "roofer name", "contractor name", "name", "title", "company"],
    "phone": ["phone", "phone number", "telephone", "phone 1", "tel", "mobile"],
    "email": ["email", "email 1", "emails", "e mail", "email address", "contact email"],
    "address": ["full address", "address", "street address", "formatted address", "location"],
    "street": ["street", "street 1"],
    "city": ["city", "town", "locality"],
    "state": ["state", "region", "state code", "province", "us state"],
    "zip": ["postal code", "zip", "zip code", "zipcode", "postcode"],
    "categories": ["business categories", "categories", "category", "subtypes", "type", "types", "main category", "primary category"],
    "rating": ["google rating", "rating", "stars", "average rating", "review score", "totalscore"],
    "reviews": ["review count", "reviews", "reviews count", "number of reviews", "user ratings total", "reviewscount", "total reviews"],
    "maps_url": ["google maps url", "maps url", "google maps link", "location link", "url", "place url", "maps link", "reviews link"],
    "lat": ["latitude", "lat"],
    "lng": ["longitude", "lng", "lon", "long"],
    "status": ["business status", "status", "permanently closed", "temporarily closed"],
    "claimed": ["verified", "claimed", "is claimed", "claim this business"],
    "hours": ["working hours", "opening hours", "hours", "business hours"],
    "photos": ["photos count", "photo count", "photos", "number of photos"],
    "price": ["price range", "price level", "price"],
    "owner_name": ["owner name", "owner", "owner title", "contact name", "full name"],
    "facebook": ["facebook", "facebook url", "facebook link"],
    "instagram": ["instagram", "instagram url", "instagram link"],
    "linkedin": ["linkedin", "linkedin url", "linkedin link"],
    "twitter": ["twitter", "twitter url", "x", "x url"],
    "youtube": ["youtube", "youtube url"],
    "social": ["social media", "socials", "social links", "social"],
    "about": ["about", "description", "business description", "lead notes", "notes"],
    "keyword": ["search keyword", "query", "keyword", "search term"],
}


def _norm(v):
    return re.sub(r"[^a-z0-9]+", " ", str(v).strip().lower()).strip()


def _pick(headers, candidates, used=()):
    best = None
    for idx, h in enumerate(headers):
        if h in used:
            continue
        key = _norm(h)
        for rank, c in enumerate(candidates):
            if key == c:
                score = 10000 - rank * 10
            elif key.startswith(c + " ") or key.endswith(" " + c):
                score = 5000 - rank * 10
            else:
                continue
            cand = (score, -idx, h)
            if best is None or cand > best:
                best = cand
    return best[2] if best else None


def read_rows(path):
    """Yield (headers, row_iterator). Rows are dicts of str->str."""
    p = Path(path)
    suffix = p.suffix.lower()
    if suffix in {".xlsx", ".xlsm"}:
        import openpyxl
        wb = openpyxl.load_workbook(p, read_only=True, data_only=True)
        ws = wb.worksheets[0]
        it = ws.iter_rows(values_only=True)
        headers = [str(h).strip() if h is not None else f"col_{i}" for i, h in enumerate(next(it, []))]

        def gen():
            for r in it:
                if r is None or all(c is None or str(c).strip() == "" for c in r):
                    continue
                yield {headers[i]: ("" if c is None else str(c)) for i, c in enumerate(r) if i < len(headers)}
            wb.close()
        return headers, gen()
    if suffix == ".xls":
        raise ValueError("Old .xls files are not supported: open it in Excel and Save As .xlsx or .csv")
    if suffix not in {".csv", ".txt", ".tsv"}:
        raise ValueError("Use a CSV or XLSX file.")
    enc = "utf-8-sig"
    try:
        with open(p, encoding=enc) as f:
            f.read(2_000_000)
    except UnicodeDecodeError:
        enc = "cp1252"
    f = open(p, newline="", encoding=enc, errors="replace")
    sample = f.read(8192)
    f.seek(0)
    try:
        dialect = csv.Sniffer().sniff(sample, delimiters=",;\t|")
    except csv.Error:
        dialect = csv.excel
    rd = csv.DictReader(f, dialect=dialect)
    headers = [h.strip() if h else f"col_{i}" for i, h in enumerate(rd.fieldnames or [])]
    rd.fieldnames = headers

    def gen():
        try:
            for r in rd:
                r.pop(None, None)
                if not any((v or "").strip() for v in r.values() if isinstance(v, str)):
                    continue
                yield {k: (v if isinstance(v, str) else "") for k, v in r.items()}
        finally:
            f.close()
    return headers, gen()


def pick_website_col(headers, sample_rows):
    """Prefer a genuine website column over Google-Maps-URL columns."""
    best = None
    for idx, col in enumerate(headers):
        key = _norm(col)
        if key in {"website", "website url", "website link", "business website", "company website", "web site", "site", "webpage"}:
            ns = 120
        elif "website" in key or key.startswith("domain") or key.endswith(" domain") or key == "domain":
            ns = 105
        elif key in {"url", "business url", "company url", "link"} or key.endswith(" url") or key.endswith(" link"):
            ns = 35
        else:
            continue
        vals = [clean_scalar(r.get(col)) for r in sample_rows]
        vals = [v for v in vals if v]
        if not vals:
            ns -= 40
            score = ns
        else:
            valid = sum(1 for v in vals if normalize_start_url(v)) / len(vals)
            maps = sum(1 for v in vals if looks_like_maps_url(v)) / len(vals)
            score = ns + valid * 30 - maps * 200
        cand = (score, -idx, col)
        if best is None or cand > best:
            best = cand
    return best[2] if best else None


def detect_columns(headers, sample_rows, overrides=None):
    overrides = overrides or {}
    mapping = {}
    web = overrides.get("website") or pick_website_col(headers, sample_rows)
    mapping["website"] = web if web in headers else None
    used = {mapping["website"]} if mapping["website"] else set()
    for field, cands in FIELD_CANDIDATES.items():
        if overrides.get(field) in headers:
            mapping[field] = overrides[field]
        else:
            h = _pick(headers, cands, used)
            # the "url" candidate for maps must really look like maps urls
            if field == "maps_url" and h:
                vals = [clean_scalar(r.get(h)) for r in sample_rows if clean_scalar(r.get(h))]
                if vals and not any(looks_like_maps_url(v) for v in vals):
                    h = None
            mapping[field] = h
        if mapping[field]:
            used.add(mapping[field])
    return mapping


# --------------------------------------------------------------------------- value parsers
def parse_int(v):
    s = clean_scalar(v)
    m = re.search(r"\d[\d,]*", s)
    return int(m.group(0).replace(",", "")) if m else None


def parse_float(v):
    s = clean_scalar(v).replace(",", ".") if re.fullmatch(r"\s*\d+,\d+\s*", clean_scalar(v)) else clean_scalar(v)
    m = re.search(r"\d+(?:\.\d+)?", s)
    return float(m.group(0)) if m else None


def parse_phone(v):
    digits = re.sub(r"\D", "", clean_scalar(v))
    if len(digits) == 11 and digits.startswith("1"):
        digits = digits[1:]
    return f"({digits[:3]}) {digits[3:6]}-{digits[6:]}" if len(digits) == 10 else clean_scalar(v)


def norm_state(v, address=""):
    s = clean_scalar(v)
    if s.upper() in US_ABBRS:
        return s.upper()
    if s.lower() in US_STATES:
        return US_STATES[s.lower()]
    for m in ZIP_STATE_RE.finditer(address or ""):
        if m.group(1) in US_ABBRS:
            return m.group(1)
    return s.upper()[:2] if len(s) == 2 else ""


ROOF_NAME_CAT = re.compile(r"roof|shingle")
NON_ROOFER_TERMS = ("roofing supply", "roofing distributor", "building materials", "hardware store", "lumber", "concrete", "ready mix", "flooring", "foundation",
                    "paving", "asphalt contractor", "landscap", "swimming pool", "pool ", "fence", "fencing", "masonry", "excavat", "plumb", "electrician",
                    "electrical", "hvac", "heating", "air conditioning", "painting", "painter", "tree service", "pest control", "garage door", "septic",
                    "demolition", "cleaning service", "real estate", "insurance agency", "law firm", "restaurant", "church", "school", "turf", "deck builder")
GENERIC_CONTRACTOR = re.compile(r"general contractor|construction|home improvement|exterior|restoration|siding|gutter|storm|solar|remodel|building contractor|handyman")


def classify_roofer(name, categories, keyword="", about=""):
    """Pre-crawl triage. Evidence hierarchy: business name + Google categories are strong; the website (crawl) is strongest and
    can overrule this later; the search keyword and notes only describe HOW the lead was found, so they never reject anyone."""
    strong = f"{name or ''} | {categories or ''}".lower()
    if ROOF_NAME_CAT.search(strong):
        return "LIKELY_ROOFER", "Business name or Google category mentions roofing."
    hits = [t.strip() for t in NON_ROOFER_TERMS if t in strong]
    if hits and not GENERIC_CONTRACTOR.search(strong):
        return "OBVIOUS_NON_ROOFER", "Name/category is clearly another trade: " + ", ".join(hits[:3]) + " (the website can still overrule this)"
    if hits or GENERIC_CONTRACTOR.search(strong):
        return "RELATED_OR_MIXED", "General/exterior contractor or mixed trades - worth checking the website."
    if ROOF_NAME_CAT.search(f"{keyword or ''} {about or ''}".lower()):
        return "UNKNOWN", "Only the search keyword/notes mention roofing (weak evidence)."
    return "UNKNOWN", "No clear category signal."


CLOSED_RE = re.compile(r"(?i)permanently\s+closed|closed_permanently|\bdefunct\b|out of business")


def _row_to_lead(row, mapping, i):
    g = lambda f: clean_scalar(row.get(mapping[f])) if mapping.get(f) else ""
    name = g("name")
    raw_site = clean_scalar(row.get(mapping["website"])) if mapping.get("website") else ""
    maps_url = g("maps_url")
    site, kind = "", "NONE"
    if raw_site and not looks_like_maps_url(raw_site):
        site = normalize_start_url(raw_site) or ""
        kind = website_kind(site) if site else "NONE"
    domain = registrable_domain(site) if site and kind == "REAL" else ""
    address = g("address")
    if not address and mapping.get("street"):
        address = ", ".join(x for x in (g("street"), g("city"), g("state"), g("zip")) if x)
    state = norm_state(g("state"), address)
    categories = g("categories")
    cl, reason = classify_roofer(name, categories, g("keyword"), g("about"))
    extra = {}
    for f in ("status", "claimed", "hours", "photos", "price", "owner_name", "facebook", "instagram", "linkedin", "twitter", "youtube", "social", "about", "keyword"):
        v = g(f)
        if v:
            extra[f] = v[:600]
    if kind == "SOCIAL_DIRECTORY" and site:
        extra.setdefault("website_is_profile", site)
    blob = " ".join([extra.get("status", ""), name])
    if CLOSED_RE.search(blob) or extra.get("status", "").strip().upper() in {"CLOSED_PERMANENTLY", "PERMANENTLY CLOSED", "TRUE"} and "closed" in _norm(mapping.get("status") or ""):
        extra["permanently_closed"] = True
    return {
        "source_row": i, "company_name": name, "website": site, "domain": domain, "website_kind": kind,
        "phone": parse_phone(g("phone")) if g("phone") else "", "email": g("email").split(",")[0].strip().lower() if g("email") else "",
        "city": g("city"), "state": state, "zip": g("zip"), "address": address, "categories": categories,
        "rating": parse_float(g("rating")), "reviews": parse_int(g("reviews")), "maps_url": maps_url,
        "lat": parse_float(g("lat")), "lng": parse_float(g("lng")),
        "maps_extra": extra, "prefilter_class": cl, "prefilter_reason": reason, "id": g("id"),
    }


def inspect_file(path, overrides=None):
    headers, rows = read_rows(path)
    sample = []
    for r in rows:
        sample.append(r)
        if len(sample) >= 300:
            break
    mapping = detect_columns(headers, sample, overrides)
    preview = [_row_to_lead(r, mapping, i + 2) for i, r in enumerate(sample[:5])]
    for p in preview:
        p.pop("maps_extra", None)
    with_site = sum(1 for r in sample if mapping.get("website") and normalize_start_url(clean_scalar(r.get(mapping["website"]))) and not looks_like_maps_url(r.get(mapping["website"])))
    return {"headers": headers, "mapping": mapping, "sample_rows": len(sample), "sample_with_website": with_site, "preview": preview}


def import_dataset(path, replace=False, overrides=None, progress=None):
    db.init_db()
    con = db.connect()
    existing = con.execute("SELECT COUNT(*) FROM leads").fetchone()[0]
    if existing and not replace:
        con.close()
        raise ValueError("A dataset is already loaded. Use 'Reset dataset' first, or import into a fresh database.")
    if replace:
        with con:
            for t in ("pages", "lead_data", "scores", "lead_stage", "selection", "leads", "runs"):
                con.execute(f"DELETE FROM {t}")
    headers, rows = read_rows(path)
    first = []
    rows = iter(rows)
    for r in rows:
        first.append(r)
        if len(first) >= 300:
            break
    mapping = detect_columns(headers, first, overrides)
    if not mapping.get("website") and not mapping.get("name"):
        con.close()
        raise ValueError(f"Could not find a website or business-name column. Columns found: {headers}")

    def all_rows():
        yield from first
        yield from rows

    used_keys, leads = set(), []
    stats = {"rows": 0, "no_website": 0, "social_only": 0, "free_builder": 0, "real_website": 0, "closed": 0, "unnamed": 0}
    for i, row in enumerate(all_rows()):
        lead = _row_to_lead(row, mapping, i + 2)
        stats["rows"] += 1
        if not lead["company_name"] and not lead["website"]:
            stats["unnamed"] += 1
            continue
        base = lead.pop("id") or f"row_{i + 2}"
        key, n = base, 2
        while key in used_keys:
            key = f"{base}__{n}"
            n += 1
        used_keys.add(key)
        lead["lead_key"] = key
        lead["original"] = {k: v for k, v in row.items() if v not in (None, "")}
        stats[{"NONE": "no_website", "SOCIAL_DIRECTORY": "social_only", "FREE_BUILDER": "free_builder", "REAL": "real_website"}[lead["website_kind"]]] += 1
        if lead["maps_extra"].get("permanently_closed"):
            stats["closed"] += 1
        leads.append(lead)
        if progress and len(leads) % 5000 == 0:
            progress(len(leads))

    # ---- de-duplicate: same real domain or same phone => keep the row with most reviews
    def rank(l):
        return (l["reviews"] or 0, 1 if l["website"] else 0, -l["source_row"])
    by_dom, by_phone = {}, {}
    for l in leads:
        for table, k in ((by_dom, l["domain"]), (by_phone, re.sub(r"\D", "", l["phone"] or ""))):
            if k and len(k) >= 7:
                cur = table.get(k)
                if cur is None or rank(l) > rank(cur):
                    table[k] = l
    dups = 0
    for l in leads:
        primary = None
        for table, k in ((by_dom, l["domain"]), (by_phone, re.sub(r"\D", "", l["phone"] or ""))):
            if k and len(k) >= 7 and table.get(k) is not l:
                primary = table[k]
                break
        l["dup_of"] = primary["lead_key"] if primary is not None else None
        dups += primary is not None
        l["crawlable"] = 1 if (l["website_kind"] == "REAL" and l["dup_of"] is None and not l["maps_extra"].get("permanently_closed")) else 0

    ts = db.now()
    with con:
        con.executemany(
            """INSERT INTO leads(source_row,lead_key,company_name,website,domain,website_kind,phone,email,city,state,zip,address,categories,
               rating,reviews,maps_url,lat,lng,maps_extra_json,original_json,prefilter_class,prefilter_reason,crawlable,dup_of,created_at)
               VALUES(:source_row,:lead_key,:company_name,:website,:domain,:website_kind,:phone,:email,:city,:state,:zip,:address,:categories,
               :rating,:reviews,:maps_url,:lat,:lng,:mx,:orig,:prefilter_class,:prefilter_reason,:crawlable,:dup_of,:ts)""",
            [{**l, "mx": json.dumps(l["maps_extra"], ensure_ascii=False), "orig": db.pack(l["original"]), "ts": ts}
             for l in leads])
    con.close()
    stats.update({"inserted": len(leads), "duplicates": dups, "mapping": mapping, "crawlable": sum(l["crawlable"] for l in leads),
                  "likely_roofer": sum(l["prefilter_class"] == "LIKELY_ROOFER" for l in leads),
                  "obvious_non_roofer": sum(l["prefilter_class"] == "OBVIOUS_NON_ROOFER" for l in leads)})
    # first-pass scores from Maps data + website kind so rankings exist before any crawling
    import scoring_run
    stats["scored"] = scoring_run.rescore_all(progress=progress)
    return stats
