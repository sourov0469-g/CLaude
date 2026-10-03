"""Page analysis. Pure functions, safe to run inside a process pool.

analyze_page(body, url, headers, ...) -> JSON-serialisable feature dict.
It measures two families of things:
  * WEBSITE QUALITY  (does this roofer *need* a new website?)
  * BUSINESS STRENGTH (can this roofer *afford* one?)  + contact / owner clues
"""
import json
import re
from datetime import datetime, timezone

from lxml import etree, html as lh

from urlutil import registrable_domain, host_matches, canonical_url, join, SOCIAL_DIRECTORY_HOSTS
from urllib.parse import urlparse

CURRENT_YEAR = datetime.now(timezone.utc).year
MAX_TEXT = 60000

# --------------------------------------------------------------------------- vocab
SOCIAL_HOSTS = {
    "linkedin": ("linkedin.com",),
    "facebook": ("facebook.com", "fb.com"),
    "instagram": ("instagram.com",),
    "x_twitter": ("x.com", "twitter.com"),
    "youtube": ("youtube.com", "youtu.be"),
}
PROFILE_HOSTS = ("bbb.org", "angi.com", "homeadvisor.com", "yelp.com", "houzz.com", "thumbtack.com",
                 "porch.com", "buildzoom.com", "trustpilot.com", "g.page", "nextdoor.com")
MANUFACTURER_HOSTS = ("gaf.com", "owenscorning.com", "certainteed.com", "iko.com", "atlasroofing.com",
                      "tamko.com", "malarkeyroofing.com", "nrca.net", "haagglobal.com")

SERVICE_TERMS = [
    "roof repair", "roof replacement", "roof installation", "roof inspection", "roof maintenance",
    "residential roofing", "commercial roofing", "emergency roof", "storm damage", "hail damage",
    "wind damage", "roof leak", "shingle", "asphalt shingles", "metal roofing", "flat roof", "tile roof",
    "slate roof", "cedar shake", "tpo", "epdm", "pvc roofing", "modified bitumen", "built-up roof",
    "roof coating", "silicone coating", "spray foam roof", "roof restoration", "gutter", "siding",
    "skylight", "chimney", "soffit", "fascia", "solar", "roofing contractor", "roofing company",
    "roofing", "roofer", "roofers", "shingles", "re-roof", "reroof", "reroofing", "roofing services",
]
ROOF_CORE = {"roofing", "roofer", "roofers", "shingles", "re-roof", "reroof", "reroofing", "roofing services", "roof repair", "roof replacement", "roof installation", "roof inspection", "roof maintenance",
             "residential roofing", "commercial roofing", "emergency roof", "shingle", "asphalt shingles",
             "metal roofing", "flat roof", "tile roof", "slate roof", "tpo", "epdm", "roof leak",
             "roof coating", "roof restoration", "roofing contractor", "roofing company", "modified bitumen"}
FINANCING_TERMS = ["financing available", "financing options", "roof financing", "monthly payments", "payment plans",
                   "apply for financing", "financing as low as", "greensky", "wisetack", "service finance", "hearth",
                   "acorn finance", "enhancify", "synchrony", "foundation finance", "home improvement financing", "0% apr"]
WARRANTY_TERMS = ["workmanship warranty", "lifetime warranty", "limited lifetime warranty", "manufacturer warranty",
                  "roof warranty", "labor warranty", "guaranteed workmanship", "satisfaction guarantee", "warranty"]
CREDENTIAL_TERMS = [
    "licensed and insured", "licensed & insured", "fully insured", "bonded", "gaf master elite", "gaf certified plus",
    "gaf certified", "gaf president's club", "gaf presidents club", "certainteed shinglemaster",
    "certainteed select shinglemaster", "owens corning platinum preferred", "owens corning preferred",
    "top of the house", "nrca member", "nrca procertified", "haag certified", "iko roofpro", "iko craftsman",
    "atlas pro+", "tamko pro certified", "malarkey emerald pro", "fortified roof", "bbb accredited", "a+ rating",
]
ELITE_CREDENTIALS = ("gaf master elite", "gaf president", "certainteed select shinglemaster",
                     "owens corning platinum", "top of the house", "iko roofpro", "iko craftsman", "atlas pro+")
STORM_TERMS = ["storm damage", "hail damage", "wind damage", "insurance claim", "insurance claims", "storm restoration",
               "insurance restoration", "claim assistance", "insurance adjuster", "emergency tarping", "roof tarp"]
EMERGENCY_TERMS = ["emergency roof repair", "24/7", "24-hour emergency", "same day roof repair", "emergency roofing",
                   "emergency tarping", "24 hour"]
QUOTE_TERMS = ["free estimate", "free quote", "get a quote", "request a quote", "request an estimate", "get an estimate",
               "schedule an inspection", "schedule inspection", "book an inspection", "free inspection",
               "get started", "contact us today", "call today", "call now"]
TRUST_TERMS = ["five-star", "5-star", "top rated", "award-winning", "award winning", "locally owned",
               "family owned", "family-owned", "veteran owned", "veteran-owned"]
RESIDENTIAL_TERMS = ["residential roofing", "residential roof", "homeowner", "your home", "residential"]
COMMERCIAL_TERMS = ["commercial roofing", "commercial roof", "property manager", "business owner", "industrial roof", "commercial"]
FRANCHISE_TERMS = ["franchise opportunit", "become a franchisee", "own a franchise", "franchisee", "each location is independently owned",
                   "independently owned and operated", "franchise owner"]
NATIONWIDE_TERMS = ["nationwide", "coast to coast", "all 50 states", "across the country", "locations nationwide"]
OUTSOURCING_TERMS = ["subcontractor", "sub-contractor", "independent contractor", "installation partner", "trade partner"]

# marketing / operations stack. token (substring of lowercased html) -> label
STACK = {
    "analytics": {"googletagmanager.com": "GTM", "google-analytics.com": "GA", "gtag(": "gtag", "analytics.js": "GA", "plausible.io": "Plausible", "clarity.ms": "Clarity", "hotjar": "Hotjar"},
    "ads": {"googleadservices.com": "Google Ads", "aw-": "Google Ads", "doubleclick.net": "DoubleClick", "fbq(": "Facebook Pixel",
            "connect.facebook.net": "Facebook Pixel", "tiktok.com/i18n/pixel": "TikTok Pixel", "ads.linkedin": "LinkedIn Ads", "snap.licdn.com": "LinkedIn Insight",
            "bat.bing.com": "Bing Ads"},
    "call_tracking": {"callrail": "CallRail", "calltrk.com": "CallRail", "calltrackingmetrics": "CallTrackingMetrics", "invoca": "Invoca",
                      "dialogtech": "DialogTech", "whatconverts": "WhatConverts", "ctm.js": "CTM"},
    "chat_leads": {"livechatinc": "LiveChat", "tawk.to": "Tawk", "intercom": "Intercom", "drift.com": "Drift", "podium": "Podium",
                   "smith.ai": "Smith.ai", "leadconnector": "HighLevel", "msgsndr": "HighLevel", "gohighlevel": "HighLevel",
                   "hs-scripts.com": "HubSpot", "ngage": "Ngage", "chatbot": "Chatbot"},
    "roofing_software": {"acculynx": "AccuLynx", "jobnimbus": "JobNimbus", "roofr": "Roofr", "companycam": "CompanyCam",
                         "servicetitan": "ServiceTitan", "jobber": "Jobber", "housecallpro": "Housecall Pro", "hover.to": "Hover",
                         "eagleview": "EagleView", "roofle": "Roofle", "leaplead": "Leap", "estimatorpro": "Estimator"},
    "reviews_tools": {"birdeye": "Birdeye", "nicejob": "NiceJob", "reviewbuzz": "ReviewBuzz", "grade.us": "Grade.us",
                      "trustindex": "Trustindex", "elfsight": "Elfsight", "reviewsonmywebsite": "ReviewsOnMyWebsite", "embedsocial": "EmbedSocial"},
    "financing_widget": {"wisetack": "Wisetack", "greensky": "GreenSky", "hearthfinancing": "Hearth", "servicefinance": "Service Finance",
                         "acornfinance": "Acorn"},
}
BUILDERS = [  # (label, tier, [(source, token)])  source: 'gen' generator meta, 'html' html source
    ("Wix", "diy", [("gen", "wix.com"), ("html", "static.wixstatic.com"), ("html", "wix-image")]),
    ("Squarespace", "diy", [("gen", "squarespace"), ("html", "static1.squarespace.com"), ("html", "squarespace-cdn")]),
    ("Weebly", "diy_low", [("html", "editmysite.com"), ("html", "weebly.com"), ("gen", "weebly")]),
    ("GoDaddy Builder", "diy_low", [("gen", "starfield technologies"), ("gen", "godaddy"), ("html", "img1.wsimg.com"), ("html", "wsimg.com/blobby")]),
    ("Jimdo", "diy_low", [("html", "jimcdn.com"), ("gen", "jimdo")]),
    ("Site123", "diy_low", [("html", "site123.com"), ("html", "site123.me")]),
    ("Duda", "diy", [("html", "multiscreensite.com"), ("html", "dudaone"), ("html", "irp.cdn-website.com")]),
    ("Vistaprint", "diy_low", [("html", "vistaprint")]),
    ("Yola/Webs/Webnode", "diy_low", [("html", "yolasite.com"), ("html", "webs.com"), ("html", "webnode")]),
    ("Blogger", "diy_low", [("gen", "blogger"), ("html", "blogspot.com")]),
    ("Joomla", "cms_old", [("gen", "joomla"), ("html", "/media/jui/"), ("html", "/templates/system/")]),
    ("Drupal", "cms", [("gen", "drupal"), ("html", "/sites/default/files")]),
    ("Elementor/WordPress", "cms", [("html", "elementor")]),
    ("Divi/WordPress", "cms", [("html", "et_pb_section"), ("html", "/themes/divi/")]),
    ("WordPress", "cms", [("gen", "wordpress"), ("html", "/wp-content/"), ("html", "/wp-includes/")]),
    ("Shopify", "pro", [("html", "cdn.shopify.com")]),
    ("Webflow", "pro", [("gen", "webflow"), ("html", "assets.website-files.com"), ("html", "data-wf-page")]),
    ("Framer", "pro", [("html", "framerusercontent.com")]),
    ("HubSpot CMS", "pro", [("html", "hs-sites"), ("html", "hubspotusercontent")]),
    ("Next.js/React", "pro", [("html", "__next_data__"), ("html", "/_next/static")]),
    ("FrontPage/Dreamweaver", "ancient", [("gen", "frontpage"), ("gen", "dreamweaver"), ("gen", "microsoft word"), ("html", "mm_preloadimages")]),
]
PLATFORM_WORDS = ("wordpress", "wix", "squarespace", "godaddy", "weebly", "shopify", "webflow", "elementor", "google",
                  "facebook", "jimdo", "duda", "hubspot", "divi", "astra", "theme", "plugin", "blogger")

PARKED_PATTERNS = ("this domain is for sale", "domain is for sale", "buy this domain", "this domain may be for sale",
                   "is available for purchase", "domain parking", "this web page is parked", "parked free",
                   "hugedomains", "afternic", "sedoparking", "sedo.com", "parkingcrew", "dan.com/buy", "make an offer on this domain",
                   "the domain has expired", "this domain has expired", "domain name is for sale", "inquire about this domain")
SUSPENDED_PATTERNS = ("account suspended", "this account has been suspended", "bandwidth limit exceeded",
                      "website is temporarily unavailable", "site is temporarily unavailable", "this site has been suspended",
                      "account has been deactivated", "resource limit is reached", "website has been suspended")
DEFAULT_PAGE_PATTERNS = ("welcome to nginx", "apache2 ubuntu default page", "apache2 debian default page", "test page for the apache",
                         "it works!", "iis windows server", "default web site page", "index of /", "welcome to wordpress. this is your first post",
                         "just another wordpress site", "your new website is ready", "this is a default page", "web server is working",
                         "congratulations! your website is created", "website under construction by", "default parallels plesk page",
                         "future home of something quite cool", "site not published", "this site isn't published", "no website configured")
CONSTRUCTION_PATTERNS = ("coming soon", "under construction", "site is under maintenance", "launching soon", "website is currently being built",
                         "we're building something", "we are building a new website", "new website coming", "page under construction",
                         "site is being updated", "website is being updated", "be back soon", "currently undergoing maintenance")
BOT_BLOCK_PATTERNS = ("just a moment...", "cf-browser-verification", "attention required! | cloudflare", "checking your browser before",
                      "enable javascript and cookies to continue", "verify you are human", "access denied", "request blocked",
                      "sucuri website firewall", "incapsula incident", "pardon our interruption", "you have been blocked",
                      "ddos protection by", "px-captcha", "are you a robot")

FREE_MAIL = {"gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com", "msn.com", "live.com",
             "comcast.net", "sbcglobal.net", "att.net", "verizon.net", "me.com", "protonmail.com", "ymail.com", "cox.net"}
GENERIC_LOCALPARTS = {"info", "contact", "office", "sales", "support", "admin", "hello", "service", "services", "estimates",
                      "estimate", "quotes", "quote", "hr", "jobs", "careers", "billing", "team", "customerservice", "noreply",
                      "no-reply", "webmaster", "mail", "inquiries", "inquiry", "appointments", "schedule", "scheduling",
                      "dispatch", "accounting", "accounts", "marketing", "help", "enquiries", "roofing", "claims", "reception"}

US_STATES = {
    "alabama": "AL", "alaska": "AK", "arizona": "AZ", "arkansas": "AR", "california": "CA", "colorado": "CO", "connecticut": "CT",
    "delaware": "DE", "florida": "FL", "georgia": "GA", "hawaii": "HI", "idaho": "ID", "illinois": "IL", "indiana": "IN",
    "iowa": "IA", "kansas": "KS", "kentucky": "KY", "louisiana": "LA", "maine": "ME", "maryland": "MD", "massachusetts": "MA",
    "michigan": "MI", "minnesota": "MN", "mississippi": "MS", "missouri": "MO", "montana": "MT", "nebraska": "NE", "nevada": "NV",
    "new hampshire": "NH", "new jersey": "NJ", "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND",
    "ohio": "OH", "oklahoma": "OK", "oregon": "OR", "pennsylvania": "PA", "rhode island": "RI", "south carolina": "SC",
    "south dakota": "SD", "tennessee": "TN", "texas": "TX", "utah": "UT", "vermont": "VT", "virginia": "VA", "washington": "WA",
    "west virginia": "WV", "wisconsin": "WI", "wyoming": "WY", "district of columbia": "DC",
}
US_ABBRS = set(US_STATES.values())
CA_PROVINCES = {"ON", "BC", "AB", "QC", "MB", "SK", "NS", "NB", "NL", "PE"}

CATEGORY_PATTERNS = [
    ("roof_services", ["roof repair", "roof replacement", "roof installation", "roof inspection", "residential roofing", "commercial roofing", "roofing services", "metal roofing", "flat roofing", "shingle"]),
    ("services", ["services", "what we do", "our services"]),
    ("team", ["team", "our team", "meet the team", "staff", "our people", "leadership", "owner", "meet"]),
    ("about", ["about us", "about", "who we are", "our story", "company"]),
    ("reviews", ["reviews", "testimonials", "customer stories", "customer reviews"]),
    ("projects_gallery", ["projects", "our projects", "gallery", "our work", "recent work", "portfolio", "before and after"]),
    ("contact_quote", ["contact", "contact us", "get a quote", "free estimate", "request estimate", "schedule inspection"]),
    ("financing", ["financing", "finance", "payment options"]),
    ("warranty", ["warranty", "warranties", "guarantee"]),
    ("credentials", ["certifications", "credentials", "accreditations", "awards"]),
    ("service_areas", ["service area", "service areas", "areas we serve", "locations", "communities we serve"]),
    ("careers", ["careers", "career", "jobs", "join our team", "hiring"]),
    ("blog_news", ["blog", "news", "resources", "articles"]),
]
BAD_PATH = ("/privacy", "/terms", "/cookie", "/login", "/signin", "/sign-in", "/cart", "/checkout", "/account", "/wp-admin",
            "/wp-login", "/tag/", "/author/", "/category/", "/feed", "/wp-json", "/cdn-cgi", "/xmlrpc")
SKIP_EXT = (".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".ico", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx",
            ".zip", ".rar", ".mp3", ".mp4", ".avi", ".mov", ".webm", ".css", ".js", ".xml", ".json", ".rss", ".atom", ".woff", ".woff2")

# --------------------------------------------------------------------------- regexes
EMAIL_RE = re.compile(r"(?i)(?<![\w.+-])[a-z0-9][a-z0-9._%+-]{0,63}@[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,10}(?![\w-])")
PHONE_RE = re.compile(r"(?<![\d])(?:\+?1[\s.\-]?)?\(?([2-9]\d{2})\)?[\s.\-]?([2-9]\d{2})[\s.\-]?(\d{4})(?![\d])")
COPYRIGHT_RE = re.compile(r"(?i)(?:©|&copy;|\(c\)|copyright)\s*(?:\d{4}\s*[-–—,]\s*)?((?:19|20)\d{2})\b")
ZIP_STATE_RE = re.compile(r"\b([A-Z]{2})\s+(\d{5})(?:-\d{4})?\b")
CA_POSTAL_RE = re.compile(r"\b([A-Z]{2})\s+[A-Z]\d[A-Z]\s?\d[A-Z]\d\b")
BUILT_BY_RE = re.compile(r"(?i)\b(?:web\s?site|web|site|seo|marketing|design(?:ed)?|developed|built|powered|created|hosted)\s*(?:design\s*)?(?:&\s*\w+\s*)?by[:\s]+([A-Z0-9][\w&.\-]*(?:\s+[A-Z0-9][\w&.\-]*){0,3})")
LICENSE_RES = [
    re.compile(r"(?i)\b(?:state\s+)?(?:contractor'?s?\s+)?(?:license|licence|lic\.?)\s*(?:#|no\.?|number|:)?\s*([A-Z]{0,4}[- ]?\d{4,12}[A-Z0-9-]*)"),
    re.compile(r"(?i)\b(?:CSLB|ROC|CCB|HIC)\s*(?:#|no\.?|:)?\s*([A-Z0-9-]{4,20})"),
]
TEAM_RES = [
    re.compile(r"(?i)\bteam of\s+(\d{1,4})\b"),
    re.compile(r"(?i)\b(\d{1,4})[-\s]+(?:person|people|member|employee|staff)\s+(?:team|company|crew|business)\b"),
    re.compile(r"(?i)\b(?:over|more than|nearly|around|about)\s+(\d{1,4})\s+(?:employees|people|team members|staff|roofers|installers|technicians)\b"),
    re.compile(r"(?i)\b(\d{1,4})\+?\s+(?:full[- ]time\s+)?(?:employees|team members|crew members)\b"),
]
FOUND_RES = [
    re.compile(r"(?i)\b(?:founded|established|started|launched|in business)\s+(?:in\s+|since\s+)?((?:19|20)\d{2})\b"),
    re.compile(r"(?i)\bsince\s+((?:19|20)\d{2})\b"),
    re.compile(r"(?i)\b(?:est\.?)\s*((?:19|20)\d{2})\b"),
]
YEARS_BIZ_RE = re.compile(r"(?i)\b(\d{1,2})\+?\s+years?\s+(?:of\s+)?(?:experience|in business|serving|roofing)")
SCALE_RES = [
    re.compile(r"(?i)\b(\d{1,3}(?:,\d{3})+|\d{2,6})\+?\s+(?:roofs?|roofing projects|roof replacements?|projects?|jobs|homes?|happy customers|customers|homeowners|families)\b"),
]
NAME_TOKEN = r"[A-Z][a-zA-Z'’\-]{1,20}"
NAME_RE = rf"{NAME_TOKEN}(?:\s+[A-Z]\.)?\s+{NAME_TOKEN}"
TITLE_RE = r"(?:Co-?\s?Founder|Founder|Owner|Co-?Owner|President|CEO|Chief Executive Officer|Managing Partner|Principal|General Manager|Operations Manager|Vice President|Partner)(?:\s*(?:&|and|/)\s*(?:Founder|Owner|President|CEO|Co-?Owner))?"
OWNER_PATTERNS = [
    re.compile(rf"\b({NAME_RE})\s*[,\-–—|:(]\s*({TITLE_RE})\b"),
    re.compile(rf"\b({TITLE_RE})\s*[:\-–—|]\s*({NAME_RE})\b"),
    re.compile(rf"(?i:founded|owned|started|established|operated|run|led)\s+(?i:and\s+operated\s+)?(?i:by)\s+({NAME_RE})\b"),
    re.compile(rf"(?i:i['’]m|i am|my name is)\s+({NAME_RE})\b"),
]
NOT_NAME_WORDS = {
    "our", "roofing", "roof", "team", "contact", "meet", "the", "owner", "founder", "president", "about", "free", "estimate",
    "home", "services", "service", "get", "call", "us", "we", "your", "family", "company", "contractor", "contractors",
    "construction", "exteriors", "exterior", "restoration", "solutions", "llc", "inc", "co", "best", "top", "quality", "licensed",
    "insured", "residential", "commercial", "emergency", "repair", "replacement", "customer", "reviews", "gallery", "blog",
    "privacy", "terms", "policy", "read", "more", "learn", "click", "here", "welcome", "general", "manager", "operations",
    "project", "sales", "office", "chief", "executive", "officer", "vice", "partner", "managing", "principal", "texas", "florida",
    "ohio", "georgia", "colorado", "denver", "dallas", "houston", "atlanta", "phoenix", "north", "south", "east", "west",
}

BLOCK_TAGS = {"p", "div", "li", "br", "h1", "h2", "h3", "h4", "h5", "h6", "tr", "section", "article", "header", "footer", "td", "dd", "dt", "blockquote"}

_re_cache = {}


def _term_re(terms):
    key = id(terms)
    r = _re_cache.get(key)
    if r is None:
        alts = "|".join(re.escape(t) for t in sorted(terms, key=len, reverse=True))
        r = re.compile(r"(?<![a-z0-9])(?:" + alts + r")(?:s|es)?(?![a-z0-9])")      # plural-tolerant: gutter/gutters
        _re_cache[key] = r
    return r


def matched(lower, terms):
    return sorted({m.group(0) for m in _term_re(terms).finditer(lower)})


def _first_present(lower, patterns):
    for p in patterns:
        if p in lower:
            return p
    return ""


# --------------------------------------------------------------------------- link helpers
def classify_link(url, anchor=""):
    p = urlparse(url)
    raw_path = (p.path or "").lower()
    if any(x in raw_path for x in BAD_PATH) or raw_path.endswith(SKIP_EXT):
        return None, -100
    blob = f"{raw_path.replace('_', ' ').replace('-', ' ').replace('/', ' ')} {anchor}".lower()
    for idx, (cat, terms) in enumerate(CATEGORY_PATTERNS):
        n = 0
        for t in terms:
            if " " in t:
                n += t in blob
            else:
                n += bool(re.search(r"\b" + re.escape(t) + r"s?\b", blob))
        if n:
            depth = len([x for x in raw_path.split("/") if x])
            return cat, 1000 - idx * 45 + n * 15 - depth * 4 - len(url) / 800
    return None, 0


# --------------------------------------------------------------------------- decoding / parsing
def decode_body(body, content_type=""):
    if not body:
        return ""
    enc = None
    m = re.search(r"charset=([\w\-]+)", content_type or "", re.I)
    if m:
        enc = m.group(1)
    if not enc:
        m = re.search(rb"<meta[^>]+charset=[\"']?([\w\-]+)", body[:4096], re.I)
        if m:
            enc = m.group(1).decode("ascii", "ignore")
    for e in (enc, "utf-8", "cp1252"):
        if not e:
            continue
        try:
            return body.decode(e, "strict" if e != "cp1252" else "replace")
        except (LookupError, UnicodeDecodeError):
            continue
    return body.decode("utf-8", "replace")


def _text_lines(root):
    """Visible text with block-level line breaks."""
    etree.strip_elements(root, "script", "style", "noscript", "svg", "template", "head", with_tail=False)
    for el in root.iter():
        if not isinstance(el.tag, str):
            continue
        if el.tag in BLOCK_TAGS:
            el.tail = "\n" + (el.tail or "")
    text = root.text_content()
    lines = [re.sub(r"[ \t\r\xa0]+", " ", ln).strip() for ln in text.split("\n")]
    return [ln for ln in lines if ln]


def _flatten(obj, out):
    if isinstance(obj, dict):
        out.append(obj)
        for v in obj.values():
            if isinstance(v, (dict, list)):
                _flatten(v, out)
    elif isinstance(obj, list):
        for x in obj:
            _flatten(x, out)


def _as_list(v):
    return [] if v is None else (v if isinstance(v, list) else [v])


def extract_schema(doc, base_url):
    out = {k: [] for k in ("org_names", "founding_dates", "employee_counts", "addresses", "regions", "countries",
                           "same_as", "area_served", "telephone", "price_range", "hours", "types")}
    out["ratings"] = []
    out["people"] = []
    items = []
    for tag in doc.xpath("//script[contains(translate(@type,'LDJSON','ldjson'),'ld+json')]"):
        raw = (tag.text or "").strip()
        if not raw:
            continue
        try:
            _flatten(json.loads(raw), items)
        except Exception:
            try:
                _flatten(json.loads(re.sub(r",\s*([}\]])", r"\1", raw)), items)
            except Exception:
                continue
    for it in items:
        types = {str(t).lower() for t in _as_list(it.get("@type"))}
        out["types"].extend(sorted(types))
        if types & {"organization", "localbusiness", "professionalservice", "corporation", "roofingcontractor",
                    "generalcontractor", "homeandconstructionbusiness"}:
            if it.get("name"):
                out["org_names"].append(str(it["name"]))
            if it.get("foundingDate"):
                out["founding_dates"].append(str(it["foundingDate"]))
            ne = it.get("numberOfEmployees")
            if ne is not None:
                val = (ne.get("value") or ne.get("minValue") or ne.get("maxValue")) if isinstance(ne, dict) else ne
                if val is not None:
                    out["employee_counts"].append(str(val))
            ar = it.get("aggregateRating")
            if isinstance(ar, dict) and ar.get("ratingValue") is not None:
                out["ratings"].append({"value": str(ar.get("ratingValue")), "count": str(ar.get("reviewCount") or ar.get("ratingCount") or "")})
            ad = it.get("address")
            if isinstance(ad, dict):
                parts = [ad.get(k) for k in ("streetAddress", "addressLocality", "addressRegion", "postalCode", "addressCountry")]
                parts = [p.get("name", "") if isinstance(p, dict) else p for p in parts]
                if any(parts):
                    out["addresses"].append(", ".join(str(x) for x in parts if x))
                if ad.get("addressRegion"):
                    out["regions"].append(str(ad["addressRegion"]))
                c = ad.get("addressCountry")
                if isinstance(c, dict):
                    c = c.get("name") or c.get("@id")
                if c:
                    out["countries"].append(str(c))
            for av in _as_list(it.get("areaServed")):
                if isinstance(av, str):
                    out["area_served"].append(av)
                elif isinstance(av, dict) and (av.get("name") or av.get("addressLocality")):
                    out["area_served"].append(str(av.get("name") or av.get("addressLocality")))
            if it.get("telephone"):
                out["telephone"].append(str(it["telephone"]))
            if it.get("priceRange"):
                out["price_range"].append(str(it["priceRange"]))
            for oh in _as_list(it.get("openingHours")):
                if isinstance(oh, str):
                    out["hours"].append(oh)
            for u in _as_list(it.get("sameAs")):
                if isinstance(u, str):
                    out["same_as"].append(join(base_url, u))
        if "person" in types and it.get("name"):
            out["people"].append({"name": str(it["name"])[:80], "title": str(it.get("jobTitle") or "")[:80]})
    for k, v in list(out.items()):
        if k in ("ratings", "people"):
            continue
        out[k] = list(dict.fromkeys(str(x).strip() for x in v if str(x).strip()))[:30]
    out["people"] = out["people"][:20]
    out["ratings"] = out["ratings"][:5]
    return out


# --------------------------------------------------------------------------- field extractors
def clean_email(e):
    e = e.strip().lower().strip(".")
    if len(e) > 80 or e.count("@") != 1:
        return None
    local, dom = e.split("@")
    if re.search(r"\.(png|jpe?g|gif|webp|svg|css|js)$", dom) or "@2x" in e or "@3x" in e:
        return None
    if any(x in dom for x in ("example.", "sentry", "wixpress", "domain.com", "yourdomain", "email.com", "godaddy.com", "schema.org", "w3.org", "yoursite")):
        return None
    if local in {"you", "your", "name", "user", "username", "email", "test", "john", "johndoe", "someone"} and dom in {"email.com", "mail.com", "domain.com"}:
        return None
    return e


def classify_email(email, site_domain=""):
    local, _, dom = email.partition("@")
    root = registrable_domain(dom) or dom
    kind = "generic" if local in GENERIC_LOCALPARTS or re.match(r"^(info|sales|office|contact|support|estimat)", local) else "personal"
    return {"email": email, "kind": kind, "free_mail": root in FREE_MAIL, "on_site_domain": bool(site_domain) and root == site_domain}


ANY_TITLE_RE = (r"(?:Co-?\s?Founder|Founder|Owner|Co-?Owner|President|CEO|Chief Executive Officer|Managing Partner|Principal|General Manager|"
                r"Operations Manager|Vice President|VP|Partner|Project Manager|Production Manager|Sales Manager|Sales Representative|"
                r"Sales Rep|Estimator|Office Manager|Crew Leader|Crew Lead|Foreman|Superintendent|Roofer|Roofing Specialist|"
                r"Service Technician|Customer Service|Marketing Manager|Project Coordinator|Inspector|Account Manager)")
DECISION_RE = re.compile(r"(?i)owner|founder|president|ceo|principal|managing partner|general manager|partner")


def extract_owners(lines):
    """Return (decision_makers, other_team_members) as lists of {name,title,source}."""
    found = []
    seen = set()

    def ok_name(n):
        toks = [t.strip(".").lower() for t in n.split()]
        if len(toks) < 2 or len(toks) > 4:
            return False
        if any(t in NOT_NAME_WORDS for t in toks):
            return False
        return all(len(t) >= 2 or "." in n for t in toks) and not re.search(r"\d", n)

    def add(name, title, src):
        name = re.sub(r"\s+", " ", name).strip(" ,.-")
        if not ok_name(name):
            return
        title = re.sub(r"\s+", " ", title or "").strip().title()
        key = name.lower()
        if key in seen:
            return
        seen.add(key)
        found.append({"name": name, "title": title, "source": src})

    for i, ln in enumerate(lines[:900]):
        if len(ln) > 260:
            continue
        for pi, pat in enumerate(OWNER_PATTERNS):
            for m in pat.finditer(ln):
                if pi == 0:
                    add(m.group(1), m.group(2), "name-title")
                elif pi == 1:
                    add(m.group(2), m.group(1), "title-name")
                elif pi == 2:
                    add(m.group(1), "Owner/Founder", "founded-by")
                else:
                    ctx = " ".join(lines[max(0, i - 2): i + 4]).lower()
                    if re.search(r"owner|founder|president|ceo", ctx):
                        add(m.group(1), "Owner/Founder", "introduction")
        # name on one line, title on the next
        if re.fullmatch(NAME_RE, ln) and i + 1 < len(lines) and re.fullmatch(TITLE_RE, lines[i + 1].strip(), re.I):
            add(ln, lines[i + 1], "stacked")
        if len(found) >= 10:
            break
    # other team members: "Name - Estimator" / stacked name + title lines
    others = []
    for i, ln in enumerate(lines[:900]):
        if len(ln) > 120:
            continue
        m = re.fullmatch(rf"({NAME_RE})\s*[,\-–—|:(]\s*({ANY_TITLE_RE})\)?", ln)
        if m:
            add(m.group(1), m.group(2), "team-line")
        elif re.fullmatch(NAME_RE, ln) and i + 1 < len(lines) and re.fullmatch(ANY_TITLE_RE, lines[i + 1].strip(), re.I):
            add(ln, lines[i + 1], "team-stacked")
    dm = [o for o in found if DECISION_RE.search(o["title"])]
    others = [o for o in found if not DECISION_RE.search(o["title"])]
    return dm[:6], others[:25]


def extract_states(text, schema):
    states = []
    for r in schema.get("regions", []):
        up, low = r.strip().upper(), r.strip().lower()
        if up in US_ABBRS:
            states.append(up)
        elif low in US_STATES:
            states.append(US_STATES[low])
    for a in schema.get("addresses", []):
        for m in ZIP_STATE_RE.finditer(a.upper() if a.isupper() else a):
            if m.group(1) in US_ABBRS:
                states.append(m.group(1))
        low = a.lower()
        for name, ab in US_STATES.items():
            if re.search(r"\b" + re.escape(name) + r"\b", low):
                states.append(ab)
    for m in ZIP_STATE_RE.finditer(text[:40000]):
        if m.group(1) in US_ABBRS:
            states.append(m.group(1))
    return sorted(set(states))


def _normalize_phone(m):
    return f"({m.group(1)}) {m.group(2)}-{m.group(3)}"


def detect_stack(low_html):
    out = {}
    for cat, toks in STACK.items():
        hits = sorted({label for tok, label in toks.items() if tok in low_html})
        if cat == "ads" and "Google Ads" in hits and not re.search(r"aw-\d{6,}|googleadservices", low_html):
            hits.remove("Google Ads")  # bare 'aw-' substring false positive guard
        if hits:
            out[cat] = hits
    return out


def detect_builder(gen_low, low_html):
    for label, tier, sigs in BUILDERS:
        for src, tok in sigs:
            if (src == "gen" and tok in gen_low) or (src == "html" and tok in low_html):
                return label, tier
    return "", "custom"


def detect_page_state(low_text, title_low, word_count, has_forms, link_count):
    blob = title_low + " " + low_text[:3000]
    if any(p in blob for p in PARKED_PATTERNS) and word_count < 600:
        return "PARKED"
    if any(p in blob for p in SUSPENDED_PATTERNS) and word_count < 400:
        return "SUSPENDED"
    if any(p in blob for p in BOT_BLOCK_PATTERNS) and word_count < 250:
        return "BOT_BLOCKED"
    if any(p in blob for p in DEFAULT_PAGE_PATTERNS) and word_count < 500:
        return "DEFAULT_PAGE"
    if any(p in blob for p in CONSTRUCTION_PATTERNS) and word_count < 220 and link_count < 12:
        return "UNDER_CONSTRUCTION"
    return "OK"


MONTHS = {m: i for i, m in enumerate(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}
DATE_TEXT_RE = re.compile(r"(?i)\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+(\d{1,2})(?:st|nd|rd|th)?,?\s+((?:19|20)\d{2})\b")
DATE_NUM_RE = re.compile(r"\b(\d{1,2})[/.-](\d{1,2})[/.-]((?:19|20)\d{2})\b")
ISO_RE = re.compile(r"\b((?:19|20)\d{2})-(\d{2})-(\d{2})")


def _iso(y, m, d):
    try:
        dt = datetime(int(y), int(m), int(d), tzinfo=timezone.utc)
    except ValueError:
        return None
    if dt > datetime.now(timezone.utc).replace(hour=23, minute=59):
        return None
    return dt.strftime("%Y-%m-%d")


def extract_dates(date_attrs, text, schema_blob):
    """Dates that suggest content freshness (posts, projects, modified stamps). Future dates dropped."""
    found = set()
    for v in date_attrs:
        m = ISO_RE.search(v or "")
        if m and _iso(*m.groups()):
            found.add(_iso(*m.groups()))
    for m in ISO_RE.finditer(schema_blob):
        d = _iso(*m.groups())
        if d:
            found.add(d)
    for m in DATE_TEXT_RE.finditer(text[:40000]):
        d = _iso(m.group(3), MONTHS[m.group(1).lower()[:3]], m.group(2))
        if d:
            found.add(d)
    for m in DATE_NUM_RE.finditer(text[:40000]):
        a, b, y = m.groups()
        d = _iso(y, a, b) if int(a) <= 12 else None
        if d:
            found.add(d)
    return sorted(found, reverse=True)[:30]


def extract_wordpress(html_text, low_html):
    if "/wp-content/" not in low_html and "wp-includes" not in low_html:
        return {}
    themes = sorted(set(re.findall(r"/wp-content/themes/([\w\-.]+)/", html_text, re.I)))[:4]
    plugins = sorted(set(re.findall(r"/wp-content/plugins/([\w\-.]+)/", html_text, re.I)))[:30]
    ver = ""
    m = re.search(r"wordpress\s+(\d+\.\d+(?:\.\d+)?)", low_html[:20000])
    if m:
        ver = m.group(1)
    return {"themes": [t.lower() for t in themes], "plugins": [p.lower() for p in plugins], "version": ver}


# --------------------------------------------------------------------------- main entry
def analyze_page(body, url, content_type="", elapsed_ms=None, status=200, server_header=""):
    if "crashme" in url and __import__("config").TEST_MODE:
        __import__("os")._exit(1)                      # test hook: simulates a parser worker dying (e.g. out of memory)
    try:
        return _analyze(body, url, content_type, elapsed_ms, status, server_header)
    except Exception as e:  # never let one weird page kill a worker
        return {"error": f"analyze failed: {e!r}"[:300], "url": url, "page_state": "ANALYZE_ERROR", "word_count": 0}


def _analyze(body, url, content_type, elapsed_ms, status, server_header):
    head = (body or b"")[:4000]
    if head and (b"\x00" in head or sum(1 for c in head if c < 9 or 13 < c < 32) > len(head) * 0.15):
        return {"url": url, "status": status, "html_bytes": len(body or b""), "page_state": "UNPARSEABLE", "word_count": 0}   # binary, not a web page
    html_text = decode_body(body, content_type)
    html_bytes = len(body or b"")
    if len(html_text) > 1_500_000:
        html_text = html_text[:1_500_000]
    f = {"url": url, "status": status, "html_bytes": html_bytes, "elapsed_ms": elapsed_ms, "server": (server_header or "")[:60]}
    if not html_text.strip():
        f.update({"page_state": "EMPTY", "word_count": 0})
        return f
    try:
        doc = lh.document_fromstring(html_text)
    except Exception:
        f.update({"page_state": "UNPARSEABLE", "word_count": 0})
        return f

    low_html = html_text.lower()
    root_domain = registrable_domain(url)

    def meta(sel_name=None, prop=None):
        xp = f"//meta[@name='{sel_name}']/@content" if sel_name else f"//meta[@property='{prop}']/@content"
        r = doc.xpath(xp)
        return (r[0] or "").strip() if r else ""

    title = " ".join((doc.xpath("string(//title)") or "").split())[:200]
    f["title"] = title
    f["meta_description"] = meta("description")[:300] or meta(prop="og:description")[:300]
    f["generator"] = meta("generator")[:120]
    f["has_viewport"] = bool(doc.xpath("//meta[@name='viewport']"))
    f["lang"] = (doc.get("lang") or "")[:10]
    f["has_og"] = bool(doc.xpath("//meta[starts-with(@property,'og:')]"))
    f["has_favicon"] = bool(doc.xpath("//link[contains(@rel,'icon')]"))
    f["has_canonical"] = bool(doc.xpath("//link[@rel='canonical']"))
    f["h1"] = [" ".join(h.text_content().split())[:140] for h in doc.xpath("//h1")][:6]
    f["roof_in_headline"] = bool(re.search(r"roof|shingle", f"{title} {' '.join(f['h1'])} {f['meta_description']}".lower()))
    f["h2"] = [" ".join(h.text_content().split())[:120] for h in doc.xpath("//h2")][:20]
    f["script_count"] = len(doc.xpath("//script[@src]"))
    f["css_count"] = len(doc.xpath("//link[@rel='stylesheet']"))
    imgs = doc.xpath("//img")
    f["img_count"] = len(imgs)
    f["img_noalt"] = sum(1 for i in imgs if not (i.get("alt") or "").strip())
    f["meta_refresh"] = bool(doc.xpath("//meta[@http-equiv='refresh']"))

    schema = extract_schema(doc, url)
    f["schema"] = schema
    # _text_lines() strips the tree in place, so gather everything that needs the full tree first (no memory-hungry copy)
    date_attrs = doc.xpath("//time/@datetime|//meta[@property='article:published_time']/@content|//meta[@property='article:modified_time']/@content"
                           "|//meta[@property='og:updated_time']/@content|//meta[@itemprop='datePublished']/@content|//meta[@itemprop='dateModified']/@content")[:60]
    testimonial_blocks = len(doc.xpath("//*[contains(@class,'testimonial') or contains(@class,'review-item') or contains(@class,'reviews-item')]")) + len(doc.xpath("//blockquote"))

    # links BEFORE the tree is stripped for text
    socials = {k: set() for k in SOCIAL_HOSTS}
    profiles, manu, links = set(), set(), []
    tel_numbers, mail_addrs = [], []
    for a in doc.xpath("//a[@href]")[:2500]:
        href = (a.get("href") or "").strip()
        if not href or href.startswith(("#", "javascript:")):
            continue
        if href.lower().startswith("tel:"):
            digits = re.sub(r"\D", "", href)
            if len(digits) >= 10:
                tel_numbers.append(digits[-10:])
            continue
        if href.lower().startswith("mailto:"):
            mail_addrs.append(href[7:].split("?")[0])
            continue
        absu = join(url, href)
        if not absu.startswith(("http://", "https://")):
            continue
        host = (urlparse(absu).hostname or "").lower()
        for k, hosts in SOCIAL_HOSTS.items():
            if host_matches(host, hosts):
                socials[k].add(absu.split("#")[0].split("?")[0])
        if host_matches(host, PROFILE_HOSTS):
            profiles.add(absu.split("#")[0])
        if host_matches(host, MANUFACTURER_HOSTS):
            manu.add(absu.split("#")[0])
        if len(links) < 500:
            links.append((absu, " ".join(a.text_content().split())[:80]))
    for u in schema["same_as"]:
        host = (urlparse(u).hostname or "").lower()
        for k, hosts in SOCIAL_HOSTS.items():
            if host_matches(host, hosts):
                socials[k].add(u)
        if host_matches(host, PROFILE_HOSTS):
            profiles.add(u)
    f["socials"] = {k: sorted(v)[:5] for k, v in socials.items() if v}
    f["profiles"] = sorted(profiles)[:12]
    f["manufacturer_links"] = sorted(manu)[:10]

    f["form_count"] = len(doc.xpath("//form"))
    quote_forms = 0
    for fm in doc.xpath("//form"):
        blob = (fm.text_content() + " " + " ".join(str(fm.get(x, "")) for x in ("id", "class", "action"))).lower()
        if any(t in blob for t in ("quote", "estimate", "inspection", "contact", "project", "message", "request")):
            quote_forms += 1
    f["quote_form_count"] = quote_forms
    f["tel_link_count"] = len(tel_numbers)

    internal = []
    cats = {}
    team_profiles = set()
    job_links = 0
    for u, anchor in links:
        if registrable_domain(u) != root_domain:
            continue
        internal.append((canonical_url(u), anchor))
        c, score = classify_link(u, anchor)
        if c and score > cats.get(c, (None, -1e9))[1]:
            cats[c] = (canonical_url(u), score)
        parts = [x for x in (urlparse(u).path or "").lower().split("/") if x]
        if len(parts) >= 2 and parts[0] in {"team", "people", "staff", "our-team", "leadership"}:
            team_profiles.add(canonical_url(u))
        if re.search(r"\b(job|jobs|career|careers|vacanc\w+|openings?)\b", (urlparse(u).path + " " + anchor).lower()):
            job_links += 1
    f["internal_links"] = [(u, a) for u, a in internal[:300]]
    f["link_categories"] = {c: v[0] for c, v in cats.items()}
    f["internal_link_count"] = len(set(u for u, _ in internal))
    f["team_profile_links"] = len(team_profiles)
    f["job_links"] = job_links

    # marketing stack + builder from raw html
    f["stack"] = detect_stack(low_html)
    builder, tier = detect_builder(f["generator"].lower(), low_html)
    f["builder"], f["builder_tier"] = builder, tier
    if "agency" not in f:
        f["agency"] = ""

    # outdated tech markers
    old = []
    if doc.xpath("//frameset|//frame"):
        old.append("frames")
    if doc.xpath("//marquee|//blink"):
        old.append("marquee/blink")
    if len(doc.xpath("//font")) >= 3:
        old.append("font tags")
    if doc.xpath("//object[contains(@data,'.swf') or contains(@type,'flash')]|//embed[contains(@src,'.swf')]") or ".swf" in low_html:
        old.append("flash")
    if len(doc.xpath("//table")) >= 6 and len(doc.xpath("//div")) < 6:
        old.append("table layout")
    if re.search(r"best viewed (?:in|with)|optimized for internet explorer|you are visitor|hit counter|made with (?:frontpage|dreamweaver)", low_html):
        old.append("legacy phrases")
    if re.search(r"jquery[-.]?(?:1\.[0-8]|[0-9]\.)\d*(?:\.min)?\.js", low_html) and "jquery-migrate" not in low_html:
        old.append("very old jQuery")
    if "<!--[if lt ie" in low_html or "<!--[if ie" in low_html:
        old.append("IE conditionals")
    f["outdated"] = old

    # text
    lines = _text_lines(doc)
    text = "\n".join(lines)[:MAX_TEXT]
    low = text.lower()
    words = re.findall(r"[A-Za-z]{2,}", text)
    f["word_count"] = len(words)
    f["lorem"] = "lorem ipsum" in low
    f["page_state"] = detect_page_state(low, title.lower(), len(words), f["form_count"], f["internal_link_count"])
    js_shell = len(words) < 80 and bool(re.search(r"id=[\"'](?:root|__next|app)[\"']|ng-app|enable javascript|javascript is required|you need to enable javascript", low_html))
    f["js_shell"] = js_shell
    cyears = [int(x) for x in COPYRIGHT_RE.findall(text + " " + html_text[-6000:]) if 1995 <= int(x) <= CURRENT_YEAR + 1]
    f["copyright_year"] = max(cyears) if cyears else None
    f["excerpt"] = text[:700]

    # agency footer
    footer = "\n".join(lines[-25:]) if lines else ""
    m = BUILT_BY_RE.search(footer) or BUILT_BY_RE.search(html_text[-4000:])
    if m:
        nm = m.group(1).strip()
        if not any(w in nm.lower() for w in PLATFORM_WORDS) and len(nm) >= 3:
            f["agency"] = nm[:50]

    # content signals
    f["services"] = matched(low, SERVICE_TERMS)
    f["roof_signal_count"] = len([s for s in f["services"] if s in ROOF_CORE])
    f["financing"] = matched(low, FINANCING_TERMS)
    f["warranty"] = matched(low, WARRANTY_TERMS)
    f["credentials"] = matched(low, CREDENTIAL_TERMS)
    f["elite_credential"] = any(e in c for c in f["credentials"] for e in ELITE_CREDENTIALS)
    f["storm"] = matched(low, STORM_TERMS)
    f["emergency"] = matched(low, EMERGENCY_TERMS)
    f["quote_ctas"] = matched(low, QUOTE_TERMS)
    f["trust"] = matched(low, TRUST_TERMS)
    f["residential"] = bool(matched(low, RESIDENTIAL_TERMS))
    f["commercial"] = bool(matched(low, COMMERCIAL_TERMS)) and ("commercial roof" in low or "commercial" in low and "roof" in low)
    f["franchise"] = matched(low, FRANCHISE_TERMS)
    f["nationwide"] = matched(low, NATIONWIDE_TERMS)
    f["outsourcing"] = matched(low, OUTSOURCING_TERMS)
    f["hiring"] = bool(re.search(r"(?i)\b(we['’ ]?re hiring|we are hiring|now hiring|open positions?|current openings?|join our team|apply now)\b", text))

    team_nums = [int(m.group(1)) for p in TEAM_RES for m in p.finditer(text) if 1 <= int(m.group(1)) <= 5000]
    f["team_claims"] = sorted(set(team_nums))[:6]
    f["founding_years"] = sorted({int(m.group(1)) for p in FOUND_RES for m in p.finditer(text) if 1950 <= int(m.group(1)) <= CURRENT_YEAR})[:6]
    f["years_in_business_claim"] = max([int(x) for x in YEARS_BIZ_RE.findall(text)] or [0]) or None
    scale = []
    for p in SCALE_RES:
        for m in p.finditer(text):
            try:
                scale.append(int(m.group(1).replace(",", "")))
            except ValueError:
                pass
    f["scale_claims"] = sorted(set(scale), reverse=True)[:5]
    f["license_claims"] = list(dict.fromkeys(m.group(0).strip()[:90] for p in LICENSE_RES for m in p.finditer(text) if any(c.isdigit() for c in m.group(1))))[:5]
    f["service_area_claims"] = [ln[:200] for ln in lines if re.search(r"(?i)\b(proudly serving|serving\s+.{2,60}\b(?:area|county|counties|and surrounding)|areas? we serve)\b", ln)][:6]

    # contacts
    emails = set()
    for e in list(EMAIL_RE.findall(text)) + mail_addrs + EMAIL_RE.findall(html_text[:200000]):
        ce = clean_email(e)
        if ce:
            emails.add(ce)
    f["emails"] = [classify_email(e, root_domain) for e in sorted(emails)[:15]]
    phones = list(dict.fromkeys(tel_numbers + [f"{m.group(1)}{m.group(2)}{m.group(3)}" for m in PHONE_RE.finditer(text[:30000])]))
    f["phones"] = [f"({p[:3]}) {p[3:6]}-{p[6:]}" for p in phones[:8]]
    f["owners"], f["team_members"] = extract_owners(lines)
    f["people_schema"] = schema["people"][:10]

    # location
    states = extract_states(text, schema)
    f["us_states"] = states
    countries = [c.strip().lower() for c in schema["countries"]]
    us_country = any(c in {"us", "usa", "united states", "united states of america"} for c in countries)
    non_us = False
    if countries and not us_country:
        non_us = True
    if CA_POSTAL_RE.search(text[:30000]) and not states:
        non_us = True
    if re.search(r"\+44[\s\d]{9,}|\+61[\s\d]{8,}|\+91[\s\d]{8,}", text[:20000]) and not states:
        non_us = True
    f["us_signal"] = bool(states or us_country or (f["phones"] and not non_us))
    f["non_us_signal"] = bool(non_us and not states)

    # freshness: dated content, WordPress fingerprint, on-site proof
    f["dates"] = extract_dates(date_attrs, text, json.dumps(schema)[:8000])
    f["latest_date"] = f["dates"][0] if f["dates"] else None
    wp = extract_wordpress(html_text, low_html)
    f["wp"] = wp
    f["testimonial_blocks"] = testimonial_blocks
    f["maps_embed"] = "google.com/maps/embed" in low_html or "maps.google" in low_html
    f["video_embed"] = bool(re.search(r"youtube\.com/embed|player\.vimeo\.com|<video", low_html))
    f["lazy_images"] = sum(1 for i in imgs if (i.get("loading") or "").lower() == "lazy" or i.get("data-src") or i.get("data-lazy-src"))
    f["inline_style_bytes"] = sum(len(x) for x in re.findall(r"<style[^>]*>(.*?)</style>", html_text[:400000], re.S | re.I))
    f["media_queries"] = len(re.findall(r"@media[^{]*(?:max|min)-width", html_text[:400000], re.I)) + len(re.findall(r"@media", low_html)) // 4
    f["needs_render"] = bool(js_shell or (len(words) < 40 and f["script_count"] >= 6))
    return f
