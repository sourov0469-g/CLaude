"""SEARCH stage (optional, needs a search-API key): owner names, local Google ranking, BBB/Yelp/Facebook listings,
and websites for leads whose Maps listing had none. Google itself cannot be scraped reliably, so a provider is used."""
import asyncio
import json
import os
import re
from urllib.parse import quote, urlparse

import config
import db
from extract import extract_owners
from net import fetch
from urlutil import FREE_BUILDER_SUFFIXES, SOCIAL_DIRECTORY_HOSTS, host_matches, normalize_start_url, registrable_domain, website_kind

KEYS_FILE = lambda: config.DATA / "api_keys.json"
PROVIDERS = ("serper", "brave", "serpapi")


def load_keys():
    try:
        d = json.loads(KEYS_FILE().read_text(encoding="utf-8"))
    except Exception:
        d = {}
    for p, env in (("serper", "SERPER_API_KEY"), ("brave", "BRAVE_API_KEY"), ("serpapi", "SERPAPI_KEY")):
        if os.environ.get(env):
            d.setdefault("keys", {})[p] = os.environ[env]
            d.setdefault("provider", p)
    return d


def save_key(provider, key):
    if provider not in PROVIDERS:
        raise ValueError("provider must be one of " + ", ".join(PROVIDERS))
    config.ensure_dirs()
    d = {}
    try:
        d = json.loads(KEYS_FILE().read_text(encoding="utf-8"))
    except Exception:
        pass
    d.setdefault("keys", {})[provider] = key.strip()
    d["provider"] = provider
    KEYS_FILE().write_text(json.dumps(d), encoding="utf-8")
    try:
        os.chmod(KEYS_FILE(), 0o600)
    except Exception:
        pass


def configured():
    d = load_keys()
    p = d.get("provider")
    return (p, bool(d.get("keys", {}).get(p))) if p else (None, False) if not os.environ.get("ROOFER_SEARCH_URL") else ("test", True)


async def web_search(eng, q, num=10):
    """-> [{'title','link','snippet'}] using the configured provider."""
    d = load_keys()
    prov = d.get("provider")
    key = (d.get("keys") or {}).get(prov, "")
    override = os.environ.get("ROOFER_SEARCH_URL")
    if override:                                    # test hook: serper-compatible endpoint
        r = await _post(eng, override, {"q": q, "num": num}, {})
        return _norm(json.loads(r.body.decode()).get("organic", []), "link", "snippet") if r.status == 200 else []
    if prov == "serper":
        r = await _post(eng, "https://google.serper.dev/search", {"q": q, "num": num, "gl": "us", "hl": "en"}, {"X-API-KEY": key, "Content-Type": "application/json"})
        return _norm(json.loads(r.body.decode()).get("organic", []), "link", "snippet") if r.status == 200 else []
    if prov == "brave":
        r = await fetch(eng.session, f"https://api.search.brave.com/res/v1/web/search?q={quote(q)}&count={num}&country=us",
                        headers={"X-Subscription-Token": key, "Accept": "application/json"}, accept_html=False)
        return _norm(json.loads(r.body.decode()).get("web", {}).get("results", []), "url", "description") if r.status == 200 else []
    if prov == "serpapi":
        r = await fetch(eng.session, f"https://serpapi.com/search.json?engine=google&q={quote(q)}&num={num}&gl=us&api_key={key}", accept_html=False)
        return _norm(json.loads(r.body.decode()).get("organic_results", []), "link", "snippet") if r.status == 200 else []
    return []


async def _post(eng, url, payload, headers):
    import aiohttp
    from net import Fetched
    r = Fetched(url=url)
    try:
        async with eng.session.post(url, json=payload, headers=headers) as resp:
            r.status = resp.status
            r.body = await resp.read()
    except Exception as e:
        r.error = str(e)
    return r


def _norm(items, link_key, snip_key):
    return [{"title": i.get("title", ""), "link": i.get(link_key, ""), "snippet": i.get(snip_key, "")} for i in items if i.get(link_key)]


STOP = {"roofing", "roof", "roofers", "contractors", "contractor", "construction", "company", "services", "service", "llc", "inc", "the", "and", "of", "co"}


def _name_tokens(name):
    return [t for t in re.findall(r"[a-z0-9]+", name.lower()) if t not in STOP and len(t) > 2]


def analyze_results(company, city, results, lead_domain=""):
    """Pull the facts we care about out of search results."""
    tokens = _name_tokens(company)
    out = {"profiles": {}, "owner_candidates": [], "website_candidate": "", "bbb": {}}
    lines = []
    for r in results:
        host = (urlparse(r["link"]).hostname or "").lower()
        blob = f"{r['title']} {r['snippet']}"
        lines += [r["title"], r["snippet"]]
        for plat, hosts in (("facebook", ("facebook.com",)), ("yelp", ("yelp.com",)), ("bbb", ("bbb.org",)), ("angi", ("angi.com", "angieslist.com")),
                            ("linkedin", ("linkedin.com",)), ("instagram", ("instagram.com",)), ("houzz", ("houzz.com",))):
            if host_matches(host, hosts) and plat not in out["profiles"]:
                out["profiles"][plat] = r["link"]
        if host_matches(host, ("bbb.org",)) and not out["bbb"]:
            m = re.search(r"BBB Rating:?\s*([A-F][+-]?)", blob) or re.search(r"\b([A-F][+-]?)\s+rating", blob)
            out["bbb"] = {"url": r["link"], "rating": m.group(1) if m else "", "accredited": "accredited" in blob.lower()}
        is_directory = host_matches(host, SOCIAL_DIRECTORY_HOSTS) or any(host == s or host.endswith("." + s) for s in FREE_BUILDER_SUFFIXES)
        if not is_directory and not out["website_candidate"] and tokens:
            dom = registrable_domain(host).split(".")[0].replace("-", "")
            hits = sum(1 for t in tokens if t in dom or t in blob.lower())
            if any(t in dom for t in tokens) and hits >= min(2, len(tokens)):
                out["website_candidate"] = normalize_start_url("https://" + host) or ""
    owners, _ = extract_owners([ln for ln in lines if ln])
    out["owner_candidates"] = owners[:3]
    return out


def local_rank(results, domain):
    for i, r in enumerate(results, 1):
        if domain and registrable_domain(r["link"]) == domain:
            return i
    return None


def _cache_get(key):
    con = db.connect()
    row = con.execute("SELECT result_json FROM search_cache WHERE cache_key=?", (key,)).fetchone()
    con.close()
    return json.loads(row[0]) if row else None


def _cache_put(key, value):
    con = db.connect()
    with con:
        con.execute("INSERT OR REPLACE INTO search_cache(cache_key,result_json,fetched_at) VALUES(?,?,?)", (key, json.dumps(value), db.now()))
    con.close()


def _adopt_website(lead_key, url):
    """A website was found for a lead that had none: queue it for the next triage run."""
    dom = registrable_domain(url)
    con = db.connect()
    with con:
        dup = con.execute("SELECT 1 FROM leads WHERE domain=? AND lead_key!=? AND dup_of IS NULL", (dom, lead_key)).fetchone()
        con.execute("UPDATE leads SET website=?, domain=?, website_kind='REAL', crawlable=? WHERE lead_key=?", (url, dom, 0 if dup else 1, lead_key))
        con.execute("DELETE FROM lead_stage WHERE lead_key=? AND stage='triage'", (lead_key,))
    con.close()


async def search(eng, lead):
    key = lead["lead_key"]
    city, state, company = lead.get("city") or "", lead.get("state") or "", lead.get("company_name") or ""
    loop = asyncio.get_running_loop()
    rank_q = f"roofing contractor {city} {state}".strip()
    cached = await loop.run_in_executor(None, _cache_get, "local:" + rank_q.lower())
    if cached is None:
        res = await web_search(eng, rank_q)
        cached = [{"link": r["link"]} for r in res]
        if res:
            await loop.run_in_executor(None, _cache_put, "local:" + rank_q.lower(), cached)
    results = await web_search(eng, f'"{company}" {city} {state} roofing owner'.strip())
    if not results and not cached:
        return {"status": "FAILED", "error": "no search results (key invalid or quota exhausted?)", "label": "search returned nothing"}
    out = analyze_results(company, city, results, lead.get("domain") or "")
    out["local_query"] = rank_q
    out["local_rank_checked"] = bool(cached)
    out["local_rank"] = local_rank(cached, lead.get("domain") or "") if cached else None
    eng.writer.data(key, "search", out)
    if out["website_candidate"] and lead.get("website_kind") != "REAL":
        await loop.run_in_executor(None, _adopt_website, key, out["website_candidate"])
        eng.count("websites_found")
        return {"status": "DONE", "label": "found a website - run Step 2 again"}
    return {"status": "DONE"}
