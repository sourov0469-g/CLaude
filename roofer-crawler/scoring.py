"""Scoring: who NEEDS a website, who can PAY for one, who is EASY to sell to.

    NEED  (0-100)  how bad is their current web presence (none / dead / old / slow / not mobile ...)
    PAY   (0-100)  how big/healthy is the business (estimated revenue, reviews, marketing spend, certifications)
    EASE  (0-100)  how likely a cold email reaches a decision maker who can say yes
    FIT            hard gates (closed, non-roofer, duplicate, non-US, franchise/enterprise)

    priority = 100 * need^wn * pay^wp * ease^we  (weighted geometric mean: you need ALL of them)

Every point awarded is recorded in `breakdown` so any score can be explained, and all weights live in CONFIG
(overridable through data/scoring_config.json or the dashboard).
"""
import json
import math
import re
from datetime import datetime, timezone

import config
from extract import CA_PROVINCES

CONFIG = {
    "w_need": 0.45, "w_pay": 0.35, "w_ease": 0.20,
    "min_reviews": 0,                  # hard filter on Google review count (0 = off)
    "exclude_franchise": True,
    "exclude_enterprise_team": 150,    # team size at/above this is treated as enterprise
    "tier_a_pct": 5, "tier_b_pct": 20, "tier_c_pct": 50,   # cumulative percentile cut-offs
    "ticket_value": 9000,              # avg roof job value used in the revenue estimate
    "review_rate": 0.12,               # fraction of customers who leave a Google review
    "revenue_per_employee": 180000,
}


def load_config():
    path = config.DATA / "scoring_config.json"
    cfg = dict(CONFIG)
    try:
        if path.exists():
            cfg.update(json.loads(path.read_text(encoding="utf-8")))
    except Exception:
        pass
    return cfg


def save_config(updates):
    cfg = load_config()
    for k, v in updates.items():
        if k in CONFIG:
            cfg[k] = type(CONFIG[k])(v) if not isinstance(CONFIG[k], bool) else bool(v)
    config.ensure_dirs()
    (config.DATA / "scoring_config.json").write_text(json.dumps(cfg, indent=2), encoding="utf-8")
    return cfg


NOW_YEAR = lambda: datetime.now(timezone.utc).year

# states where the website itself is the problem (or there is none)
HARD_NEED = {
    "NO_WEBSITE": 100, "PARKED": 95, "SUSPENDED": 95, "SOCIAL_ONLY": 92, "DEFAULT_PAGE": 90, "DEAD_DNS": 88, "FREE_BUILDER": 85,
    "UNDER_CONSTRUCTION": 85, "REDIRECTS_TO_PROFILE": 85, "HTTP_404": 80, "DEAD_CONNECT": 62, "TIMEOUT": 58, "HTTP_5XX": 55, "EMPTY": 60,
}
UNKNOWN_STATES = {"NOT_CRAWLED": 40, "BOT_BLOCKED": 38, "JS_SHELL": 35, "ROBOTS_BLOCKED": 38, "UNREACHABLE": 50, "HTTP_ERROR": 45}
STATE_LABEL = {
    "NO_WEBSITE": "no website at all", "SOCIAL_ONLY": "only a social/directory page instead of a website",
    "FREE_BUILDER": "a free-builder subdomain instead of their own domain", "PARKED": "domain is parked/for sale",
    "SUSPENDED": "hosting account is suspended", "DEFAULT_PAGE": "site shows a server/placeholder default page",
    "UNDER_CONSTRUCTION": "site still says coming soon / under construction", "DEAD_DNS": "domain doesn't resolve (website is down)",
    "HTTP_404": "homepage returns a 404", "DEAD_CONNECT": "server refuses connections", "TIMEOUT": "site times out",
    "HTTP_5XX": "site returns server errors", "REDIRECTS_TO_PROFILE": "domain just redirects to a social/directory profile",
}


class Ledger:
    """Records every point so scores are explainable."""

    def __init__(self):
        self.items = []

    def add(self, label, pts):
        if pts:
            self.items.append((label, round(pts, 1)))
        return pts

    def total(self):
        return sum(p for _, p in self.items)

    def as_list(self):
        return [[l, p] for l, p in self.items]


# --------------------------------------------------------------------------- revenue estimate
REV_BANDS = [(250_000, "<$250k"), (500_000, "$250-500k"), (1_000_000, "$500k-1M"), (2_000_000, "$1-2M"),
             (5_000_000, "$2-5M"), (10_000_000, "$5-10M"), (float("inf"), "$10M+")]
REV_POINTS = {"<$250k": 4, "$250-500k": 14, "$500k-1M": 28, "$1-2M": 42, "$2-5M": 55, "$5-10M": 62, "$10M+": 65}


def estimate_revenue(p, cfg):
    reviews = (p["maps"].get("reviews") or 0)
    yib = p["biz"].get("years_in_business")
    team = p["biz"].get("team_size")
    basis, ests = [], []
    if reviews:
        years = max(1.5, min(float(yib), 25)) if yib else max(2.0, min(8.0, 2 + reviews / 40))
        per_year = reviews / years
        est = per_year / cfg["review_rate"] * cfg["ticket_value"]
        ests.append(est)
        basis.append(f"{reviews} Google reviews over ~{years:.0f} yrs{'' if yib else ' (age assumed)'}")
    if team:
        est = team * cfg["revenue_per_employee"]
        ests.append(est)
        basis.append(f"team of ~{team} ({p['biz'].get('team_basis')})")
    if not ests:
        return None, "", "no reviews or team-size data"
    est = math.exp(sum(math.log(max(e, 50_000)) for e in ests) / len(ests))   # geometric mean of the available estimates
    band = next(b for lim, b in REV_BANDS if est < lim)
    return est, band, "; ".join(basis) + " (rough estimate, ±50%)"


# --------------------------------------------------------------------------- need
def score_need(p, cfg):
    L = Ledger()
    site, state = p["site"], p["site"]["state"]
    if state in HARD_NEED:
        base = HARD_NEED[state]
        L.add(f"Web presence problem: {STATE_LABEL.get(state, state)}", base)
        if state in ("DEAD_CONNECT", "TIMEOUT", "HTTP_5XX", "EMPTY") and site.get("ssl_error"):
            L.add("SSL certificate invalid", 15)
        return min(100, L.total()), L, "HIGH" if state in ("NO_WEBSITE", "SOCIAL_ONLY", "FREE_BUILDER") else "MED"
    if state in UNKNOWN_STATES:
        L.add(f"Could not judge website ({state.lower().replace('_', ' ')}) - neutral prior", UNKNOWN_STATES[state])
        return UNKNOWN_STATES[state], L, "LOW"

    # live, analysable website: add up what is wrong with it
    if site.get("https") is False:
        L.add("Site served over plain HTTP (browsers show 'Not secure')", 20)
    if site.get("ssl_error"):
        L.add("Invalid/expired SSL certificate (browser security warning)", 26)
    elif site.get("ssl_days_left") is not None and site["ssl_days_left"] < 14:
        L.add(f"SSL certificate expires in {max(0, site['ssl_days_left'])} days", 8)
    if site.get("has_viewport") is False:
        L.add("No mobile viewport - not mobile-friendly", 22)
    st = site.get("staleness_years")
    if st is not None:
        if st >= 5:
            L.add(f"Last visible update ~{st:.0f} years ago", 18)
        elif st >= 3:
            L.add(f"Last visible update ~{st:.0f} years ago", 12)
        elif st >= 2:
            L.add("Last visible update ~2 years ago", 7)
    elif site.get("copyright_year") is None:
        L.add("No dated content or copyright year found", 3)
    n_old = len(site.get("outdated") or [])
    if n_old:
        L.add("Legacy tech: " + ", ".join(site["outdated"][:3]), min(18, 6 * n_old))
    tier = site.get("builder_tier")
    if tier == "ancient":
        L.add(f"Built with {site.get('builder')} (ancient tooling)", 15)
    elif tier == "diy_low":
        L.add(f"Built on {site.get('builder')} (low-end DIY builder)", 10)
    elif tier == "cms_old":
        L.add(f"Built on {site.get('builder')} (aging CMS)", 8)
    elif tier == "diy":
        L.add(f"DIY builder ({site.get('builder')})", 5)
    wc = site.get("word_count") or 0
    if wc < 100:
        L.add(f"Very thin homepage ({wc} words)", 15)
    elif wc < 250:
        L.add(f"Thin homepage ({wc} words)", 8)
    if site.get("lorem"):
        L.add("Placeholder 'lorem ipsum' text left on site", 12)
    ttfb, load = site.get("ttfb_ms"), site.get("load_ms")
    if ttfb and ttfb > 2500:
        L.add(f"Slow server response ({ttfb/1000:.1f}s)", 6)
    if load and load > 6000:
        L.add(f"Slow page load ({load/1000:.1f}s)", 8)
    if site.get("bytes") and site["bytes"] > 1_500_000:
        L.add("Very heavy homepage HTML", 3)
    if site.get("compressed") is False:
        L.add("No gzip/brotli compression", 2)
    # SEO / trust basics
    if not site.get("meta_description"):
        L.add("No meta description", 4)
    t = (site.get("title") or "").strip().lower()
    if not t or t in {"home", "welcome", "index", "untitled", "home page", "homepage"} or len(t) < 12:
        L.add("Missing/generic page title", 6)
    if site.get("h1") is False:
        L.add("No H1 heading", 3)
    if site.get("has_schema") is False:
        L.add("No structured data (LocalBusiness schema)", 3)
    if site.get("img_noalt_ratio") is not None and site["img_noalt_ratio"] > 0.6 and (site.get("img_count") or 0) >= 4:
        L.add("Most images lack alt text", 2)
    # conversion basics
    no_tel = not site.get("tel_links")
    no_form = not site.get("forms")
    if no_tel:
        L.add("No click-to-call phone link", 8)
    if no_form:
        L.add("No contact/quote form on homepage", 7)
    if no_tel and no_form:
        L.add("No way to convert a visitor on the homepage", 4)
    if not site.get("ctas"):
        L.add("No estimate/quote call-to-action", 6)
    biz = p["biz"]
    if site.get("pages_crawled", 0) >= 2:
        if not biz["testimonials"] and not biz["has_reviews_page"]:
            L.add("No reviews/testimonials shown on site", 5)
        if not biz["has_projects_page"]:
            L.add("No project gallery", 4)
    rd, srch = p.get("rdap") or {}, p.get("search") or {}
    if rd.get("dead_flag"):
        L.add("Domain is in a lapsed/hold state at the registry", 25)
    elif rd.get("days_to_expiry") is not None and rd["days_to_expiry"] < 45:
        L.add(f"Domain expires in {max(0, rd['days_to_expiry'])} days", 6)
    if srch.get("local_rank_checked") and srch.get("local_rank") is None:
        L.add(f"Not on Google's first page for '{srch.get('local_query', 'roofing contractor <city>')}'", 8)
    raw = L.total()
    # modern, healthy site: cap the need
    healthy = (site.get("https") and site.get("has_viewport") and not n_old and (st is None or st < 1.5) and wc >= 250 and not site.get("ssl_error"))
    agency_note = False
    if site.get("agency"):
        L.add(f"Maintained by an agency ({site['agency']}) - harder switch", -12)
        agency_note = True
    total = max(0, L.total())
    if healthy and total > 25:
        L.add("Site looks modern and maintained (need capped)", 25 - total)
        total = 25
    conf = "HIGH" if site.get("pages_crawled") else "LOW"
    return min(100, max(0, total)), L, conf


# --------------------------------------------------------------------------- pay
def score_pay(p, cfg):
    L = Ledger()
    est, band, basis = estimate_revenue(p, cfg)
    biz, maps = p["biz"], p["maps"]
    if band:
        L.add(f"Estimated revenue {band} - {basis}", REV_POINTS[band])
    else:
        L.add("No reviews/team data to size the business", 8)
    stack = biz["stack"]
    mk = 0
    if stack.get("ads"):
        mk += L.add("Runs paid ads / pixels (" + ", ".join(stack["ads"][:3]) + ")", 7)
    if stack.get("call_tracking"):
        mk += L.add("Uses call tracking (" + ", ".join(stack["call_tracking"][:2]) + ")", 4)
    if stack.get("roofing_software"):
        mk += L.add("Uses roofing software (" + ", ".join(stack["roofing_software"][:2]) + ")", 4)
    if stack.get("chat_leads"):
        mk += L.add("Lead chat/CRM tools", 2)
    if stack.get("reviews_tools"):
        mk += L.add("Review-management tool", 2)
    if stack.get("financing_widget") or biz["financing"]:
        L.add("Offers customer financing", 3)
    if biz["elite"]:
        L.add("Elite manufacturer certification", 6)
    elif biz["credentials"]:
        L.add("Manufacturer/industry credentials", 3)
    if biz["license"]:
        L.add("Published contractor license", 2)
    yib = biz.get("years_in_business")
    if yib is not None and yib >= 10:
        L.add(f"{yib}+ years in business", 4)
    elif yib is not None and yib >= 5:
        L.add(f"{yib} years in business", 2)
    if biz["hiring"] or biz["job_links"]:
        L.add("Hiring (growing)", 3)
    if biz["commercial"]:
        L.add("Does commercial work (bigger tickets)", 3)
    if biz["storm"]:
        L.add("Storm/insurance restoration work", 2)
    r, n = maps.get("rating"), maps.get("reviews") or 0
    if r and r >= 4.6 and n >= 50:
        L.add(f"{r}★ across {n} reviews", 3)
    elif r and r < 3.6 and n >= 10:
        L.add(f"Weak reputation ({r}★)", -5)
    soc = p.get("social") or {}
    big = max([v.get("followers") or v.get("likes") or 0 for v in soc.values() if isinstance(v, dict)] or [0])
    if big >= 1000:
        L.add(f"Social following ~{big:,}", 2)
    bbb = (p.get("search") or {}).get("bbb") or {}
    if bbb.get("accredited") or str(bbb.get("rating", "")).startswith("A"):
        L.add(f"BBB {bbb.get('rating') or 'accredited'}", 2)
    rd = p.get("rdap") or {}
    if rd.get("age_years") and rd["age_years"] >= 8:
        L.add(f"Domain registered {rd['age_years']:.0f} yrs ago (established)", 2)
    return min(100, max(0, L.total())), L, est, band, basis


# --------------------------------------------------------------------------- ease
def score_ease(p, cfg):
    L = Ledger()
    L.add("Baseline", 40)
    biz, site, contact = p["biz"], p["site"], p["contact"]
    ts = biz.get("team_size")
    if ts is not None:
        if ts <= 15:
            L.add(f"Small team (~{ts}): owner likely decides", 10)
        elif ts >= 50:
            L.add(f"Large team (~{ts}): committee/marketing dept", -15)
    elif p["maps"].get("reviews", 0) and p["maps"]["reviews"] < 300:
        L.add("Probably owner-operated (review volume)", 5)
    if p["people"]["owners"]:
        L.add("Owner/decision-maker name found", 10)
    em = contact["emails"]
    if em:
        best = em[0]
        if best["kind"] == "personal":
            L.add("Direct (personal) email found", 12)
        elif best["free_mail"]:
            L.add("Owner-style free-mail address", 6)
        else:
            L.add("Generic company inbox found", 3)
    else:
        L.add("No email found (needs lookup)", -8)
    if contact["phones"]:
        L.add("Phone available for follow-up", 4)
    if site.get("agency"):
        L.add("Has a website agency relationship", -10)
    elif site["state"] == "OK" and not site.get("agency"):
        L.add("No agency fingerprint (self/freelancer-managed)", 6)
    if site.get("builder_tier") in ("diy", "diy_low"):
        L.add("Built it themselves (open to done-for-you)", 6)
    if p["biz"]["stack"].get("ads") or p["biz"]["stack"].get("call_tracking"):
        L.add("Actively buys marketing (reads cold offers)", 3)
    if p["contact"]["socials"]:
        L.add("Active on social (reachable via DM)", 3)
    if site["state"] in ("DEAD_DNS", "SUSPENDED", "PARKED", "HTTP_404", "DEAD_CONNECT"):
        L.add("Site broken right now: urgent pain", 10)
    rd = p.get("rdap") or {}
    if rd.get("days_to_expiry") is not None and rd["days_to_expiry"] < 60:
        L.add(f"Domain expires in {max(0, rd['days_to_expiry'])} days: timely trigger", 10)
    if biz["franchise"] or biz["nationwide"]:
        L.add("Franchise/national brand: decisions made centrally", -25)
    return min(100, max(0, L.total())), L


# --------------------------------------------------------------------------- gates
def fit_gates(p, cfg):
    """-> (eligible, reason, multiplier)"""
    biz, maps = p["biz"], p["maps"]
    if maps.get("closed"):
        return 0, "Google lists it as permanently closed", 0
    if p.get("dup_of"):
        return 0, f"Duplicate of {p['dup_of']} (same domain/phone)", 0
    if p["prefilter"] == "OBVIOUS_NON_ROOFER" and not biz.get("roofing_confirmed"):
        return 0, "Not a roofer (name/category; website shows no roofing)", 0
    if biz["non_us_signal"] or p["state"] in CA_PROVINCES:
        return 0, "Looks like a non-U.S. business", 0
    if cfg["exclude_franchise"] and biz["franchise"]:
        return 0, "Franchise/chain", 0
    ts = biz.get("team_size")
    if ts and ts >= cfg["exclude_enterprise_team"]:
        return 0, f"Enterprise-size team (~{ts})", 0
    if cfg["min_reviews"] and (maps.get("reviews") or 0) < cfg["min_reviews"]:
        return 0, f"Under {cfg['min_reviews']} Google reviews", 0
    mult = 1.0
    site = p["site"]
    readable = site["state"] == "OK" and site.get("pages_crawled") and (site.get("word_count") or 0) >= 60
    if readable and not biz.get("roofing_confirmed") and p["prefilter"] != "LIKELY_ROOFER":
        return 0, "Website shows no roof-specific services (gutters/storm work alone don't count)", 0
    if readable and not biz.get("roofing_confirmed"):
        mult = 0.5      # Google says roofer but the site never says so: keep, but rank lower
    return 1, "", mult


# --------------------------------------------------------------------------- narrative
def build_hooks(p, need_L, pay_L, est_band):
    """Factual personalisation points for the cold email (problems first, then strengths)."""
    site, maps, biz = p["site"], p["maps"], p["biz"]
    state = site["state"]
    problems, strengths = [], []
    n, r = maps.get("reviews") or 0, maps.get("rating")
    rev_txt = f"{n} Google reviews" + (f" at {r}★" if r else "") if n else ""
    if state == "NO_WEBSITE":
        problems.append("you don't seem to have a website at all")
    elif state == "SOCIAL_ONLY":
        problems.append("your only web presence is a social/directory page, not your own website")
    elif state == "FREE_BUILDER":
        problems.append("your site lives on a free-builder address instead of your own domain")
    elif state in STATE_LABEL:
        problems.append(f"your website appears broken: {STATE_LABEL[state]}")
    elif state in UNKNOWN_STATES:
        pass   # could not judge the site: make no claims about it
    else:
        if site.get("ssl_error"):
            problems.append("your site shows a browser security warning (invalid SSL certificate)")
        elif site.get("https") is False:
            problems.append("your site loads over plain HTTP, so browsers label it 'Not secure'")
        sr = p.get("search") or {}
        if sr.get("local_rank_checked") and sr.get("local_rank") is None:
            problems.append(f"you don't show up on Google's first page for '{sr.get('local_query')}'")
        if site.get("has_viewport") is False:
            problems.append("your site isn't mobile-friendly (no mobile layout) - most roofing searches happen on phones")
        st = site.get("staleness_years")
        if st and st >= 3:
            problems.append(f"the site looks like it hasn't been updated in about {st:.0f} years")
        if site.get("outdated"):
            problems.append("it uses outdated tech (" + ", ".join(site["outdated"][:2]) + ")")
        if site.get("builder_tier") in ("diy_low", "ancient"):
            problems.append(f"it's built on {site.get('builder')}, which looks dated next to competitors")
        if not site.get("tel_links") and not site.get("forms"):
            problems.append("there's no click-to-call button or quote form on the homepage")
        elif not site.get("ctas"):
            problems.append("there's no clear free-estimate call-to-action")
        if (site.get("word_count") or 999) < 150:
            problems.append("the homepage has very little content for Google to rank")
    if rev_txt:
        strengths.append(rev_txt)
    if biz["elite"]:
        strengths.append("elite manufacturer certification")
    if biz.get("years_in_business") and biz["years_in_business"] >= 8:
        strengths.append(f"{biz['years_in_business']}+ years in business")
    if biz["stack"].get("ads"):
        strengths.append("already investing in ads")
    if biz["hiring"]:
        strengths.append("hiring/growing")
    if est_band:
        strengths.append(f"est. revenue {est_band}")
    return problems[:6], strengths[:5]


def pitch_angle(p):
    s = p["site"]["state"]
    labels = {"NO_WEBSITE": "NO WEBSITE", "SOCIAL_ONLY": "SOCIAL-ONLY (no real site)", "FREE_BUILDER": "FREE-BUILDER SUBDOMAIN",
              "PARKED": "SITE DOWN: parked domain", "SUSPENDED": "SITE DOWN: suspended hosting", "DEAD_DNS": "SITE DOWN: domain dead",
              "DEFAULT_PAGE": "SITE DOWN: placeholder page", "UNDER_CONSTRUCTION": "UNFINISHED SITE", "HTTP_404": "SITE DOWN: 404",
              "DEAD_CONNECT": "SITE UNREACHABLE", "TIMEOUT": "SITE UNREACHABLE", "HTTP_5XX": "SITE ERRORS", "REDIRECTS_TO_PROFILE": "NO REAL SITE (redirects to profile)"}
    if s in labels:
        return labels[s]
    if s in UNKNOWN_STATES:
        return "NOT CRAWLED YET" if s == "NOT_CRAWLED" else "UNKNOWN (re-check site)"
    site = p["site"]
    if site.get("ssl_error") or site.get("https") is False:
        return "INSECURE SITE (no valid HTTPS)"
    if site.get("has_viewport") is False:
        return "NOT MOBILE-FRIENDLY"
    if (site.get("staleness_years") or 0) >= 3 or site.get("outdated") or site.get("builder_tier") in ("ancient", "diy_low"):
        return "OUTDATED SITE"
    if not site.get("ctas") and not site.get("tel_links"):
        return "SITE DOESN'T CONVERT"
    return "REFRESH / UPGRADE"


def first_line(p, problems, strengths):
    first = next((o["name"].split()[0] for o in p["people"]["owners"] if o.get("name")), "")
    hi = f"Hi {first}," if first else "Hi there,"
    co = p["company"] or "your company"
    nice = [x for x in strengths if not x.startswith("est. revenue")]
    bits = f"I came across {co}" + (f" ({nice[0]})" if nice else "")
    if problems:
        problem = problems[0]
        return f"{hi} {bits} and noticed that {problem}. I put together a free mock-up of a new website for you - want me to send it over?"
    return f"{hi} {bits} and put together a free mock-up of a refreshed website for you - want me to send it over?"


# --------------------------------------------------------------------------- main
def score_profile(p, cfg=None):
    cfg = cfg or load_config()
    need, need_L, conf = score_need(p, cfg)
    pay, pay_L, est, band, basis = score_pay(p, cfg)
    ease, ease_L = score_ease(p, cfg)
    eligible, reason, mult = fit_gates(p, cfg)
    n, y, e = max(need, 1) / 100, max(pay, 1) / 100, max(ease, 1) / 100
    wsum = cfg["w_need"] + cfg["w_pay"] + cfg["w_ease"]
    priority = 100 * (n ** (cfg["w_need"] / wsum)) * (y ** (cfg["w_pay"] / wsum)) * (e ** (cfg["w_ease"] / wsum)) * mult
    if not eligible:
        priority = priority * 0.2
    problems, strengths = build_hooks(p, need_L, pay_L, band)
    angle = pitch_angle(p)
    return {
        "need": round(need, 1), "pay": round(pay, 1), "ease": round(ease, 1), "fit": mult if eligible else 0,
        "priority": round(priority, 2), "eligible": int(bool(eligible)), "exclude_reason": reason,
        "site_state": p["site"]["state"], "pitch_angle": angle, "confidence": conf,
        "revenue_band": band or "", "revenue_basis": basis,
        "hooks": {"problems": problems, "strengths": strengths, "first_line": first_line(p, problems, strengths),
                  "subject": f"A new website for {p['company']}" if p["company"] else "A new website for your roofing company"},
        "breakdown": {"need": need_L.as_list(), "pay": pay_L.as_list(), "ease": ease_L.as_list()},
    }
