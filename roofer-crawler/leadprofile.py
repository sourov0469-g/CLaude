"""Merge everything known about a lead into one flat, explainable profile dict."""
import json
import re
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime

from extract import ROOF_CORE, US_ABBRS, classify_email

NOW = lambda: datetime.now(timezone.utc)

HOST_HINTS = [  # (substring in server/nameserver/header blob, label)
    ("domaincontrol.com", "GoDaddy"), ("godaddy", "GoDaddy"), ("secureserver", "GoDaddy"), ("cloudflare", "Cloudflare"),
    ("wixdns", "Wix"), ("wix.com", "Wix"), ("squarespace", "Squarespace"), ("weebly", "Weebly"), ("bluehost", "Bluehost"),
    ("hostgator", "HostGator"), ("siteground", "SiteGround"), ("wpengine", "WP Engine"), ("kinsta", "Kinsta"),
    ("netlify", "Netlify"), ("vercel", "Vercel"), ("namecheap", "Namecheap"), ("registrar-servers", "Namecheap"),
    ("hostinger", "Hostinger"), ("dreamhost", "DreamHost"), ("ionos", "IONOS"), ("1and1", "IONOS"), ("google", "Google"),
    ("awsdns", "AWS"), ("amazonaws", "AWS"), ("azure", "Azure"), ("liquidweb", "Liquid Web"), ("networksolutions", "Network Solutions"),
    ("worldnic", "Network Solutions"), ("enom", "eNom"), ("hubspot", "HubSpot"), ("shopify", "Shopify"), ("duda", "Duda"),
    ("microsoft-iis", "Windows IIS (older stack)"),
]


def _loads(v, default=None):
    try:
        return json.loads(v) if v else default
    except Exception:
        return default


def _parse_date(s):
    """ISO date/datetime, bare year, or RFC-1123 HTTP date -> aware UTC datetime (or None)."""
    if not s:
        return None
    s = str(s).strip()
    m = re.match(r"(\d{4})-(\d{2})-(\d{2})", s)
    if m:
        try:
            return datetime(int(m.group(1)), int(m.group(2)), int(m.group(3)), tzinfo=timezone.utc)
        except ValueError:
            return None
    if re.fullmatch(r"(?:19|20)\d{2}", s):
        return datetime(int(s), 1, 1, tzinfo=timezone.utc)
    try:
        dt = parsedate_to_datetime(s)
        return dt.astimezone(timezone.utc) if dt.tzinfo else dt.replace(tzinfo=timezone.utc)
    except Exception:
        return None


def years_since(dt):
    return round((NOW() - dt).days / 365.25, 1) if dt else None


def _uniq(seq, limit=50):
    out, seen = [], set()
    for x in seq:
        k = json.dumps(x, sort_keys=True) if isinstance(x, (dict, list)) else str(x).strip().lower()
        if k and k not in seen:
            seen.add(k)
            out.append(x)
        if len(out) >= limit:
            break
    return out


def host_guess(blob):
    low = (blob or "").lower()
    for sub, label in HOST_HINTS:
        if sub in low:
            return label
    return ""


def derive_site_state(kind, net, home, pages=()):
    if kind == "NONE":
        return "NO_WEBSITE"
    if kind == "SOCIAL_DIRECTORY":
        return "SOCIAL_ONLY"
    if kind == "FREE_BUILDER":
        return "FREE_BUILDER"
    if not net:
        return "NOT_CRAWLED"
    ec = net.get("error_class")
    if ec:
        return {"DNS": "DEAD_DNS", "CONNECT": "DEAD_CONNECT", "TIMEOUT": "TIMEOUT", "SSL": "DEAD_CONNECT", "ROBOTS": "ROBOTS_BLOCKED"}.get(ec, "HTTP_ERROR" if ec == "HTTP" else "UNREACHABLE")
    status = net.get("http_status") or 0
    if home and home.get("page_state") in ("PARKED", "SUSPENDED", "DEFAULT_PAGE", "UNDER_CONSTRUCTION"):
        return home["page_state"]          # the page itself explains the problem, whatever the status code was
    if status in (404, 410):
        return "HTTP_404"
    if status >= 500:
        return "HTTP_5XX"
    if status in (401, 403, 429) and (not home or home.get("page_state") in (None, "BOT_BLOCKED", "EMPTY")):
        return "BOT_BLOCKED"
    if not home:
        return "NOT_CRAWLED"
    ps = home.get("page_state", "OK")
    if ps in ("PARKED", "SUSPENDED", "DEFAULT_PAGE", "UNDER_CONSTRUCTION", "BOT_BLOCKED"):
        return ps
    if net.get("redirected_offsite") and net.get("final_kind") in ("SOCIAL_DIRECTORY", "FREE_BUILDER"):
        return "REDIRECTS_TO_PROFILE"
    if ps in ("EMPTY", "UNPARSEABLE", "ANALYZE_ERROR", "REDIRECT_STUB"):
        return "EMPTY"
    if home.get("needs_render") and not any((pg.get("word_count") or 0) >= 150 for pg in pages if pg is not home):
        return "JS_SHELL"          # only when no other page proved the site readable
    return "OK"


def build_profile(lead, pages, data):
    """lead: dict (leads row); pages: [features dict + page_type]; data: {source: payload}."""
    mx = _loads(lead.get("maps_extra_json"), {}) if not isinstance(lead.get("maps_extra"), dict) else lead["maps_extra"]
    net = data.get("net") or {}
    home = next((p for p in pages if p.get("_type") == "homepage"), None)
    p = {"lead_key": lead["lead_key"], "source_row": lead.get("source_row"), "company": lead.get("company_name") or "", "website": lead.get("website") or "",
         "domain": lead.get("domain") or "", "city": lead.get("city") or "", "state": lead.get("state") or "",
         "phone": lead.get("phone") or "", "categories": lead.get("categories") or "", "maps_url": lead.get("maps_url") or ""}
    kind = lead.get("website_kind") or "NONE"
    p["maps"] = {"rating": lead.get("rating"), "reviews": lead.get("reviews") or 0, "categories": lead.get("categories") or "",
                 "closed": bool(mx.get("permanently_closed")), "claimed": mx.get("claimed", ""), "photos": mx.get("photos", ""),
                 "hours": mx.get("hours", ""), "price": mx.get("price", ""), "about": mx.get("about", "")}
    p["prefilter"] = lead.get("prefilter_class") or "UNKNOWN"
    p["dup_of"] = lead.get("dup_of")

    # ---------------- site quality
    state = derive_site_state(kind, net, home, pages)
    site = {"kind": kind, "state": state, "pages_crawled": len(pages), "page_types": sorted({x.get("_type") for x in pages if x.get("_type")})}
    ssl = net.get("ssl") or {}
    site.update({
        "https": bool(net.get("https")) if net else None, "ssl_error": bool(ssl.get("error")), "ssl_days_left": ssl.get("days_left"),
        "ssl_issuer": ssl.get("issuer", ""), "final_url": net.get("final_url", ""), "redirected_offsite": bool(net.get("redirected_offsite")),
        "ttfb_ms": net.get("ttfb_ms"), "load_ms": net.get("load_ms"), "bytes": net.get("bytes"), "compressed": net.get("compressed"),
        "server": net.get("server", ""), "http_status": net.get("http_status"), "error": net.get("error", ""),
        "robots_found": (net.get("robots") or {}).get("found"), "sitemap": net.get("sitemap") or {},
    })
    h = home or {}
    site.update({
        "has_viewport": h.get("has_viewport"), "copyright_year": h.get("copyright_year"), "outdated": h.get("outdated", []),
        "builder": h.get("builder", ""), "builder_tier": h.get("builder_tier", ""), "agency": h.get("agency", ""),
        "generator": h.get("generator", ""), "word_count": h.get("word_count"), "title": h.get("title", ""),
        "meta_description": bool(h.get("meta_description")), "h1": bool(h.get("h1")), "has_schema": bool((h.get("schema") or {}).get("types")),
        "has_og": h.get("has_og"), "has_canonical": h.get("has_canonical"), "has_favicon": h.get("has_favicon"),
        "img_count": h.get("img_count"), "img_noalt_ratio": (round(h["img_noalt"] / h["img_count"], 2) if h.get("img_count") else None),
        "script_count": h.get("script_count"), "css_count": h.get("css_count"), "lorem": h.get("lorem"), "tel_links": h.get("tel_link_count"),
        "forms": h.get("form_count"), "quote_forms": h.get("quote_form_count"), "ctas": h.get("quote_ctas", []), "maps_embed": h.get("maps_embed"),
        "media_queries": h.get("media_queries"), "lazy_images": h.get("lazy_images"), "needs_render": h.get("needs_render"),
        "wp": h.get("wp") or {}, "js_shell": h.get("js_shell"),
    })
    # last-updated estimate (strongest reliable evidence wins; all reported)
    cands = []
    for pg in pages:
        for d in pg.get("dates", [])[:3]:
            cands.append((d, "dated content on site"))
    lm = _parse_date(net.get("last_modified"))
    if lm:
        cands.append((lm.strftime("%Y-%m-%d"), "HTTP Last-Modified header"))
    sm = (net.get("sitemap") or {}).get("latest_lastmod")
    if sm and _parse_date(sm):
        cands.append((_parse_date(sm).strftime("%Y-%m-%d"), "sitemap lastmod"))
    if h.get("copyright_year") and not cands:      # a footer year is weak evidence: only used when nothing better exists
        cands.append((f"{h['copyright_year']}-12-31" if h["copyright_year"] < NOW().year else NOW().strftime("%Y-%m-%d"), "footer copyright year"))
    cands = [c for c in cands if _parse_date(c[0]) and _parse_date(c[0]) <= NOW()]
    if cands:
        best = max(cands)
        site["last_updated"] = best[0]
        site["last_updated_source"] = best[1]
        site["staleness_years"] = years_since(_parse_date(best[0]))
    else:
        site["last_updated"], site["last_updated_source"], site["staleness_years"] = None, "", None
    site["freshness_evidence"] = _uniq(cands, 6)
    hosting = host_guess(" ".join([net.get("server", ""), net.get("powered_by", ""), " ".join((data.get("rdap") or {}).get("nameservers", []))]))
    site["hosting"] = hosting
    p["site"] = site

    # ---------------- business signals (union over pages)
    def union(key, limit=40):
        return _uniq([x for pg in pages for x in (pg.get(key) or [])], limit)

    def mx_(key, default=0):
        vals = [pg.get(key) for pg in pages if pg.get(key) is not None]
        return max(vals) if vals else default

    services = union("services", 60)
    stack = {}
    for pg in pages:
        for cat, labels in (pg.get("stack") or {}).items():
            stack[cat] = sorted(set(stack.get(cat, [])) | set(labels))
    team_nums = [n for pg in pages for n in (pg.get("team_claims") or [])]
    schema_emp = []
    for pg in pages:
        for e in (pg.get("schema") or {}).get("employee_counts", []):
            m = re.search(r"\d+", str(e))
            if m:
                schema_emp.append(int(m.group(0)))
    owners = _uniq([o for pg in pages for o in (pg.get("owners") or [])], 12)
    team_members = _uniq([o for pg in pages for o in (pg.get("team_members") or [])], 40)
    if mx.get("owner_name"):
        owners.insert(0, {"name": mx["owner_name"], "title": "Owner (from lead file)", "source": "maps"})
    srch = data.get("search") or {}
    for o in srch.get("owner_candidates", [])[:3]:
        owners.append({"name": o.get("name", ""), "title": o.get("title", "Owner (from search)"), "source": "search"})
    by_name = {}
    for o in owners:
        if o.get("name"):
            by_name.setdefault(o["name"].lower(), o)
    owners = list(by_name.values())[:10]
    names_known = {o["name"].lower() for o in owners} | {o["name"].lower() for o in team_members}
    if schema_emp:
        team_size, team_basis = max(schema_emp), "structured data"
    elif team_nums:
        team_size, team_basis = max(team_nums), "site claim"
    elif len(names_known) >= 2:
        team_size, team_basis = len(names_known), "people listed (minimum)"
    elif mx_("team_profile_links"):
        team_size, team_basis = mx_("team_profile_links"), "team profile pages (minimum)"
    else:
        team_size, team_basis = None, ""
    found_years = [y for pg in pages for y in (pg.get("founding_years") or [])]
    for pg in pages:
        for d in (pg.get("schema") or {}).get("founding_dates", []):
            m = re.search(r"(19|20)\d{2}", str(d))
            if m:
                found_years.append(int(m.group(0)))
    founding_year = min(found_years) if found_years else None
    yib_claims = [pg.get("years_in_business_claim") for pg in pages if pg.get("years_in_business_claim")]
    years_in_business = (NOW().year - founding_year) if founding_year else (max(yib_claims) if yib_claims else None)
    rdap = data.get("rdap") or {}
    if rdap.get("created"):
        d = _parse_date(rdap["created"])
        rdap["age_years"] = years_since(d)
        e = _parse_date(rdap.get("expires"))
        rdap["days_to_expiry"] = (e - NOW()).days if e else None
    role_blob = " ".join(o.get("title", "") for o in owners).lower()
    states = _uniq([s for pg in pages for s in (pg.get("us_states") or [])], 10)
    biz = {
        "services": services, "roof_core": len([s for s in services if s in ROOF_CORE]), "financing": union("financing", 10),
        "warranty": union("warranty", 10), "credentials": union("credentials", 20), "elite": any(pg.get("elite_credential") for pg in pages),
        "license": union("license_claims", 5), "storm": union("storm", 10), "emergency": union("emergency", 6), "trust": union("trust", 8),
        "residential": any(pg.get("residential") for pg in pages), "commercial": any(pg.get("commercial") for pg in pages),
        "franchise": union("franchise", 5), "nationwide": union("nationwide", 5), "outsourcing": union("outsourcing", 5),
        "hiring": any(pg.get("hiring") for pg in pages), "job_links": mx_("job_links"),
        "scale_claim": max([n for pg in pages for n in (pg.get("scale_claims") or [])] or [0]) or None,
        "testimonials": mx_("testimonial_blocks"), "stack": stack, "manufacturer_links": union("manufacturer_links", 8),
        "profiles": union("profiles", 10), "service_areas": union("service_area_claims", 6),
        "team_size": team_size, "team_basis": team_basis, "founding_year": founding_year, "years_in_business": years_in_business,
        "schema_ratings": _uniq([r for pg in pages for r in ((pg.get("schema") or {}).get("ratings") or [])], 4),
        "has_projects_page": any(x.get("_type") == "projects_gallery" for x in pages) or bool(h.get("link_categories", {}).get("projects_gallery")),
        "has_reviews_page": any(x.get("_type") == "reviews" for x in pages) or bool(h.get("link_categories", {}).get("reviews")),
        "has_careers_page": bool(h.get("link_categories", {}).get("careers")) or any(x.get("_type") == "careers" for x in pages),
        "has_financing_page": bool(h.get("link_categories", {}).get("financing")),
        "has_service_area_page": bool(h.get("link_categories", {}).get("service_areas")),
        "project_dates": sorted({d for pg in pages if pg.get("_type") in ("projects_gallery", "blog_news") for d in (pg.get("dates") or [])}, reverse=True)[:5],
        "us_states": states, "us_signal": any(pg.get("us_signal") for pg in pages), "non_us_signal": any(pg.get("non_us_signal") for pg in pages) and not states,
        "decision_maker_known": bool(owners),
        # a roofer is confirmed only by roof-specific evidence (headline/title says roof, or 2+ distinct roofing terms).
        # gutters / siding / storm damage / hail / insurance never count: fence and pool companies mention those too.
        "roof_terms": sorted({s for s in services if s in ROOF_CORE}),
    }
    biz["roofing_confirmed"] = bool(any(pg.get("roof_in_headline") for pg in pages) or len(biz["roof_terms"]) >= 2)
    p["biz"] = biz
    p["people"] = {"owners": owners, "team_members": team_members}

    def excerpt_of(*types):
        return " ".join(pg.get("excerpt", "") for pg in pages if pg.get("_type") in types and pg.get("excerpt")).strip()
    recent = []
    for pg in pages:
        if pg.get("_type") in ("projects_gallery", "blog_news"):
            recent.append({"title": (pg.get("title") or "")[:90], "date": (pg.get("dates") or [""])[0], "text": (pg.get("excerpt") or "")[:160]})
    p["excerpts"] = {"homepage": excerpt_of("homepage"), "about": excerpt_of("about"), "team": excerpt_of("team"), "reviews": excerpt_of("reviews")}
    p["titles"] = {"title": h.get("title", ""), "meta_description": h.get("meta_description", "")}
    p["recent_work"] = recent[:4]
    p["page_types"] = sorted({x.get("_type") for x in pages if x.get("_type")})

    # ---------------- contacts
    owner_first = {o["name"].split()[0].lower() for o in owners if o.get("name")}
    owner_last = {o["name"].split()[-1].lower() for o in owners if o.get("name")}
    emails = {}
    for pg in pages:
        for e in pg.get("emails") or []:
            emails.setdefault(e["email"], e)
    if lead.get("email"):
        emails.setdefault(lead["email"], classify_email(lead["email"], lead.get("domain") or ""))
    for e in emails.values():
        local = e["email"].split("@")[0]
        e["owner_match"] = any(len(f) > 2 and f in local for f in owner_first | owner_last)

    def email_rank(e):
        return (0 if e["owner_match"] else 1, 0 if e["kind"] == "personal" else 1, 0 if e["on_site_domain"] else 1, 1 if e["free_mail"] else 0)
    ranked = sorted(emails.values(), key=email_rank)
    phones = _uniq(([lead["phone"]] if lead.get("phone") else []) + [x for pg in pages for x in (pg.get("phones") or [])], 8)
    p["contact"] = {"emails": ranked[:8], "best_email": ranked[0]["email"] if ranked else "", "best_email_kind": ranked[0]["kind"] if ranked else "",
                    "phones": phones, "best_phone": phones[0] if phones else "",
                    "socials": {}, "tel_links": mx_("tel_link_count")}
    socials = {}
    for pg in pages:
        for k, urls in (pg.get("socials") or {}).items():
            socials[k] = _uniq(socials.get(k, []) + urls, 3)
    for k in ("facebook", "instagram", "linkedin", "twitter", "youtube"):
        if mx.get(k):
            socials.setdefault("x_twitter" if k == "twitter" else k, [mx[k]])
    if kind == "SOCIAL_DIRECTORY" and lead.get("website"):
        host = lead["website"].lower()
        for k, needle in (("facebook", "facebook.com"), ("instagram", "instagram.com"), ("linkedin", "linkedin.com"), ("youtube", "youtube.com")):
            if needle in host:
                socials.setdefault(k, [lead["website"]])
    p["contact"]["socials"] = socials
    soc = data.get("social") or {}
    p["social"] = soc
    p["rdap"] = rdap
    p["search"] = srch
    p["has_net"] = bool(net)
    return p
