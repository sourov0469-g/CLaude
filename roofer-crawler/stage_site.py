"""Stage handlers that fetch the roofer's own website: TRIAGE (homepage) and DEEP (team/contact/reviews/projects...)."""
import asyncio
import json
from urllib.parse import urlparse

import config
import db
from extract import analyze_page
from net import fetch, fetch_robots, fetch_with_fallbacks, read_sitemaps
from urlutil import canonical_url, registrable_domain, website_kind

DEEP_ORDER = ["team", "about", "contact_quote", "reviews", "projects_gallery", "blog_news", "careers", "financing",
              "service_areas", "roof_services", "services", "warranty", "credentials"]
TRANSIENT = ("TIMEOUT", "CONNECT", "DNS", "OTHER")


def _origin(url):
    p = urlparse(url)
    return f"{p.scheme}://{p.netloc}"


def _net_dict(r, attempts, ssl_error, start_url, robots, sitemap):
    final = r.final_url or start_url
    d = {
        "ok": bool(r.ok), "error_class": "" if r.status else r.error_class, "error": r.error, "http_status": r.status,
        "final_url": final, "https": final.startswith("https://") and not ssl_error, "ssl": dict(r.ssl, error=ssl_error) if (r.ssl or ssl_error) else {},
        "redirected_offsite": registrable_domain(final) != registrable_domain(start_url) if r.status else False,
        "final_kind": website_kind(final) if r.status else "", "ttfb_ms": r.ttfb_ms, "load_ms": r.load_ms, "bytes": len(r.body or b""),
        "compressed": (r.headers.get("content-encoding", "") in ("gzip", "br", "deflate", "zstd")) if r.status else None,
        "last_modified": r.headers.get("last-modified", ""), "server": r.headers.get("server", ""),
        "powered_by": " ".join(filter(None, (r.headers.get(h, "") for h in ("x-powered-by", "x-hosted-by", "via", "x-generator", "x-served-by"))))[:200],
        "attempts": attempts[:6], "truncated": r.truncated,
    }
    if r.headers.get("cf-ray"):
        d["powered_by"] += " cloudflare"
    if robots is not None:
        d["robots"] = {"found": robots["found"], "disallow_all": robots["disallow_all"], "sitemaps": robots["sitemaps"][:3]}
    if sitemap:
        d["sitemap"] = sitemap
    return d


async def triage(eng, lead):
    """Homepage + robots (+ sitemap when advertised): enough to judge the website and pick up basic business facts."""
    key, url = lead["lead_key"], lead["website"]
    session = eng.session
    robots = None
    if eng.settings.get("obey_robots", True):
        robots = await fetch_robots(session, _origin(url))
        if robots["disallow_all"]:
            eng.writer.data(key, "net", {"ok": False, "error_class": "ROBOTS", "error": "robots.txt disallows crawling",
                                         "robots": {"found": True, "disallow_all": True, "sitemaps": []}})
            return {"status": "DONE", "label": "blocked by robots.txt"}
    r, attempts, ssl_error = await fetch_with_fallbacks(session, url)
    if r is None:
        return {"status": "FAILED", "error": "no response", "net_class": "OTHER", "defer": True}
    transient = ((not r.status) and r.error_class in TRANSIENT) or r.status in (429, 503)
    if (transient or r.status in (401, 403)) and not lead.get("_recheck"):
        # rate-limited / blocked / temporarily down: come back after the main pass (second opinion) instead of recording a failure
        return {"status": "FAILED", "error": r.error, "net_class": r.error_class if not r.status else "", "defer": True}

    sitemap = None
    if r.status and r.ok and robots and robots["sitemaps"] and eng.settings.get("sitemap_in_triage", True):
        try:
            sitemap = await read_sitemaps(session, _origin(r.final_url), robots["sitemaps"][:1])
        except Exception:
            sitemap = None
    net = _net_dict(r, attempts, ssl_error, url, robots, sitemap)
    eng.writer.data(key, "net", net)

    label = ""
    status = "DONE"
    if r.status and r.body:
        feats = await eng.parse(analyze_page, r.body, r.final_url, r.content_type, r.load_ms, r.status, r.headers.get("server", ""), nbytes=len(r.body))
        if feats.get("page_state") == "REDIRECT_STUB" and feats.get("meta_refresh_url"):       # old-school <meta refresh> hop: follow it once
            from urllib.parse import urljoin
            hop = await fetch(session, urljoin(r.final_url, feats["meta_refresh_url"]))
            if hop.status and hop.body and hop.status < 400:
                r = hop
                feats = await eng.parse(analyze_page, r.body, r.final_url, r.content_type, r.load_ms, r.status, r.headers.get("server", ""), nbytes=len(r.body))
        eng.writer.page(key, canonical_url(r.final_url), "homepage", r.status, feats)
        state = feats.get("page_state", "OK")
        if state not in ("OK",):
            label = f"site: {state.lower().replace('_', ' ')}"
        if r.status >= 500 or r.error_class == "BLOCKED" or state == "BOT_BLOCKED":
            status = "FAILED"
    elif r.status:
        label = f"HTTP {r.status}"
        status = "DONE" if r.status in (404, 410) else "FAILED"
    else:
        # definitive after recheck: dead site
        label = {"DNS": "domain does not resolve", "TIMEOUT": "site times out", "CONNECT": "connection refused", "SSL": "TLS failure"}.get(r.error_class, "unreachable")
        status = "DONE" if r.error_class == "DNS" else "FAILED"
    if ssl_error:
        label = label or "invalid SSL certificate"
    return {"status": status, "net_class": "" if r.status else r.error_class, "label": label, "error": r.error if status == "FAILED" else None}


def _home_features(key):
    con = db.connect()
    try:
        blob = db.get_blob(con, key)
    finally:
        con.close()
    home = next(((u, p.get("f") or {}) for u, p in blob.get("pages", {}).items() if p.get("t") == "homepage"), (None, {}))
    return home, (blob.get("data") or {}).get("net", {})


async def deep(eng, lead):
    """Follow the homepage navigation to the pages that reveal the business: team/about, contact, reviews, projects, blog, careers."""
    key = lead["lead_key"]
    (home_url, home), net = await asyncio.get_running_loop().run_in_executor(None, _home_features, key)
    if not home_url:
        return {"status": "FAILED", "error": "no homepage data (run triage first)"}
    cats = home.get("link_categories", {}) or {}
    n_extra = int(eng.settings.get("deep_pages", 6))
    base_url = (net.get("final_url") or home_url)
    chosen, seen = [], {canonical_url(base_url), canonical_url(home_url)}
    for c in DEEP_ORDER:
        u = cats.get(c)
        if u and canonical_url(u) not in seen:
            chosen.append((c, u))
            seen.add(canonical_url(u))
        if len(chosen) >= n_extra:
            break
    # sites whose navigation we couldn't read (JS menus etc.): try the standard addresses for the pages that matter most
    GUESS = {"about": ["/about", "/about-us"], "team": ["/team", "/our-team", "/meet-the-team"], "contact_quote": ["/contact", "/contact-us"]}
    guessed = []
    for cat, paths in GUESS.items():
        if cat not in cats and not any(c == cat for c, _ in chosen):
            guessed += [(cat, _origin(base_url) + p) for p in paths]
    robots = None
    if eng.settings.get("obey_robots", True):
        robots = await fetch_robots(eng.session, _origin(base_url))
        rp = robots.get("rp")
        if rp:
            chosen = [(c, u) for c, u in chosen if rp.can_fetch("*", u)]
            guessed = [(c, u) for c, u in guessed if rp.can_fetch("*", u)]
    # sitemap freshness / project counts (probe the usual locations when robots.txt did not advertise one)
    if not net.get("sitemap"):
        try:
            sm = await read_sitemaps(eng.session, _origin(base_url), (robots or {}).get("sitemaps", [])[:1], try_defaults=True)
            if sm and sm.get("urls"):
                net["sitemap"] = sm
                eng.writer.data(key, "net", net)
        except Exception:
            pass

    home_urls, got_urls = {canonical_url(base_url), canonical_url(home_url)}, set()

    async def one(cat, u):
        r = await fetch(eng.session, u)
        if not (r.status and r.body and r.status < 400):
            return cat, u, None, r
        cu = canonical_url(r.final_url)
        if cu in home_urls or cu in got_urls:                          # redirected back to the homepage / a page we already have
            return cat, u, None, r
        got_urls.add(cu)
        feats = await eng.parse(analyze_page, r.body, r.final_url, r.content_type, r.load_ms, r.status, r.headers.get("server", ""), nbytes=len(r.body))
        return cat, u, feats, r

    results = await asyncio.gather(*[one(c, u) for c, u in chosen], return_exceptions=True)
    have = {res[0] for res in results if not isinstance(res, Exception) and res[2]}
    got_guess = set()
    for cat, u in guessed[:5]:                          # sequential + capped: 404s are cheap, hammering is not
        if cat in have or cat in got_guess:
            continue
        res = await one(cat, u)
        if res[2] and res[2].get("word_count", 0) >= 40:
            results.append(res)
            got_guess.add(cat)
    got = failed = 0
    for res in results:
        if isinstance(res, Exception):
            failed += 1
            continue
        cat, u, feats, r = res
        if feats and (feats.get("page_state") in ("OK", "JS_SHELL", None) or (feats.get("page_state") == "EMPTY" and feats.get("word_count", 0) >= 3)):
            eng.writer.page(key, canonical_url(r.final_url), cat, r.status, feats)
            got += 1
        else:
            failed += 1
    if chosen and got == 0 and failed:
        return {"status": "FAILED", "error": "none of the inner pages could be read", "net_class": "", "label": "deep: inner pages failed"}
    return {"status": "DONE", "label": "" if got else "deep: no inner pages found"}
