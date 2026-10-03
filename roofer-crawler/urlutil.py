"""URL helpers: normalisation, registrable domain, SSRF guard, free-host detection."""
import ipaddress
import re
from urllib.parse import urljoin, urlparse, urlunparse

import config

try:
    import tldextract
    _EXTRACT = tldextract.TLDExtract(suffix_list_urls=())  # bundled snapshot, no network
except Exception:  # pragma: no cover
    _EXTRACT = None

_MULTI = {"co.uk", "org.uk", "com.au", "net.au", "co.nz", "com.br", "com.mx", "co.jp", "co.in", "com.sg", "co.za"}

SOCIAL_DIRECTORY_HOSTS = (
    "facebook.com", "fb.com", "fb.me", "instagram.com", "linkedin.com", "twitter.com", "x.com",
    "youtube.com", "tiktok.com", "pinterest.com", "linktr.ee", "linktree.com", "yelp.com",
    "bbb.org", "angi.com", "angieslist.com", "homeadvisor.com", "thumbtack.com", "houzz.com",
    "nextdoor.com", "yellowpages.com", "mapquest.com", "manta.com", "porch.com", "buildzoom.com",
    "chamberofcommerce.com", "superpages.com", "alignable.com", "birdeye.com", "g.page",
    "goo.gl", "maps.app.goo.gl", "google.com", "gaf.com", "owenscorning.com", "certainteed.com",
    "iko.com", "tamko.com", "atlasroofing.com", "malarkeyroofing.com",
)
FREE_BUILDER_SUFFIXES = (
    "wixsite.com", "weebly.com", "godaddysites.com", "square.site", "mystrikingly.com",
    "webflow.io", "carrd.co", "blogspot.com", "wordpress.com", "business.site", "site123.me",
    "jimdofree.com", "myshopify.com", "netlify.app", "vercel.app", "github.io", "000webhostapp.com",
    "sites.google.com", "squarespace.com", "webnode.com", "yolasite.com", "ucoz.com", "tripod.com",
    "angelfire.com", "wix.com", "zyrosite.com", "hostingersite.com", "godaddysites.com",
)
MAPS_MARKERS = ("google.com/maps", "maps.google.", "maps.app.goo.gl", "goo.gl/maps", "g.page")


def clean_scalar(v):
    if v is None:
        return ""
    s = str(v).strip()
    return "" if s.lower() in {"nan", "none", "null", "n/a", "na", "-"} else s


def host_allowed(host):
    """Literal-host SSRF guard (resolved IPs are checked again in net.py)."""
    if not host:
        return False
    host = host.lower().strip(".")
    if config.TEST_MODE:
        return True
    if host in {"localhost", "localhost.localdomain"} or host.endswith((".local", ".internal", ".lan", ".localhost")):
        return False
    try:
        ip = ipaddress.ip_address(host)
        return not (ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved or ip.is_multicast or ip.is_unspecified)
    except ValueError:
        return "." in host


def ip_is_public(ip_text):
    try:
        ip = ipaddress.ip_address(ip_text)
    except ValueError:
        return False
    return not (ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved or ip.is_multicast or ip.is_unspecified)


def looks_like_maps_url(v):
    s = str(v or "").lower()
    return any(m in s for m in MAPS_MARKERS)


def normalize_start_url(raw):
    raw = clean_scalar(raw)
    if not raw or " " in raw.strip() and "." not in raw:
        return None
    raw = raw.split()[0]
    if raw.startswith("//"):
        raw = "https:" + raw
    if not re.match(r"^https?://", raw, re.I):
        raw = "https://" + raw
    try:
        p = urlparse(raw)
        host = (p.hostname or "").lower()
        if not host or not host_allowed(host):
            return None
        if not re.match(r"^[a-z0-9.-]+$", host) and not config.TEST_MODE:
            try:
                host.encode("idna")
            except Exception:
                return None
        return urlunparse((p.scheme.lower(), p.netloc.lower(), p.path or "/", "", p.query, ""))
    except Exception:
        return None


def registrable_domain(url_or_host):
    try:
        s = str(url_or_host)
        host = (urlparse(s).hostname if "//" in s else s) or ""
        host = host.lower().strip(".")
        if not host:
            return ""
        if _EXTRACT is not None:
            ext = _EXTRACT(host)
            if ext.domain and ext.suffix:
                return f"{ext.domain}.{ext.suffix}"
        labels = host.split(".")
        if len(labels) <= 2:
            return host
        last2 = ".".join(labels[-2:])
        return ".".join(labels[-3:]) if last2 in _MULTI else last2
    except Exception:
        return ""


def host_matches(host, suffixes):
    host = (host or "").lower().strip(".")
    return any(host == s or host.endswith("." + s) for s in suffixes)


def website_kind(url):
    """Classify a lead's website URL: REAL, SOCIAL_DIRECTORY, FREE_BUILDER."""
    host = (urlparse(url).hostname or "").lower()
    if host_matches(host, SOCIAL_DIRECTORY_HOSTS):
        return "SOCIAL_DIRECTORY"
    if host_matches(host, FREE_BUILDER_SUFFIXES) and registrable_domain(host) != host:
        return "FREE_BUILDER"          # subdomain of a free builder (acme.wixsite.com)
    return "REAL"


def canonical_url(url):
    try:
        p = urlparse(url)
        path = re.sub(r"/{2,}", "/", p.path or "/")
        if path != "/" and path.endswith("/"):
            path = path[:-1]
        return urlunparse((p.scheme.lower(), p.netloc.lower(), path, "", p.query[:120], ""))
    except Exception:
        return url


def same_site(url, root_domain):
    return registrable_domain(url) == root_domain


def join(base, href):
    try:
        return urljoin(base, href)
    except Exception:
        return ""
