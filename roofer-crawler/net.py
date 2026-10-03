"""Network primitives: safe resolver, fetch with timing/TLS facts, robots.txt, sitemaps."""
import asyncio
import json
import os
import socket
import ssl
import time
from dataclasses import dataclass, field
from datetime import datetime, timezone
from urllib.parse import urlparse
from urllib.robotparser import RobotFileParser

import aiohttp
from aiohttp.abc import AbstractResolver
from lxml import etree

import config
from urlutil import ip_is_public, registrable_domain


# --------------------------------------------------------------------------- resolver (SSRF guard at connect time)
class SafeResolver(AbstractResolver):
    """Resolves through the OS but refuses private/loopback/link-local answers (DNS-rebinding / SSRF protection).

    Test hook: ROOFER_TEST_HOSTMAP='{"*": "127.0.0.1"}' maps names to loopback (only honoured in ROOFER_TEST_MODE=1).
    """

    def __init__(self):
        self._inner = aiohttp.ThreadedResolver()
        self._map = {}
        if config.TEST_MODE and os.environ.get("ROOFER_TEST_HOSTMAP"):
            try:
                self._map = json.loads(os.environ["ROOFER_TEST_HOSTMAP"])
            except Exception:
                self._map = {}

    async def resolve(self, host, port=0, family=socket.AF_INET):
        if self._map:
            for prefix, target in self._map.items():
                if target is None and prefix != "*" and host.replace("www.", "", 1).startswith(prefix):
                    raise socket.gaierror(-2, "Name or service not known (test)")
            ip = self._map.get(host) or self._map.get("*")
            if ip:
                return [{"hostname": host, "host": ip, "port": port, "family": socket.AF_INET, "proto": 0, "flags": 0}]
        infos = await self._inner.resolve(host, port, family)
        if config.TEST_MODE:
            return infos
        safe = [i for i in infos if ip_is_public(i["host"])]
        if not safe:
            raise OSError(f"{host} resolves only to non-public addresses")
        return safe

    async def close(self):
        await self._inner.close()


# --------------------------------------------------------------------------- results
@dataclass
class Fetched:
    ok: bool = False
    url: str = ""
    final_url: str = ""
    status: int = 0
    body: bytes = b""
    content_type: str = ""
    headers: dict = field(default_factory=dict)
    error_class: str = ""      # DNS | CONNECT | TIMEOUT | SSL | HTTP | BLOCKED | OTHER
    error: str = ""
    ttfb_ms: int = 0
    load_ms: int = 0
    ssl: dict = field(default_factory=dict)
    redirected: bool = False
    truncated: bool = False


HEADER_KEEP = ("server", "x-powered-by", "content-encoding", "last-modified", "date", "via", "x-hosted-by", "x-served-by",
               "x-generator", "x-pingback", "content-type", "x-cache", "x-wix-request-id", "x-shopify-stage", "cf-ray", "x-sucuri-id")


def classify_exception(e):
    if isinstance(e, (asyncio.TimeoutError, TimeoutError)):
        return "TIMEOUT"
    if isinstance(e, (aiohttp.ClientConnectorCertificateError, aiohttp.ClientConnectorSSLError, ssl.SSLError, ssl.CertificateError,
                      aiohttp.ClientSSLError)):
        return "SSL"
    if isinstance(e, aiohttp.ClientConnectorDNSError):
        return "DNS"
    if isinstance(e, aiohttp.ClientConnectorError):
        oe = getattr(e, "os_error", None)
        if isinstance(oe, socket.gaierror):
            return "DNS"
        if oe is not None and "non-public" in str(oe):
            return "DNS"
        if isinstance(oe, (ssl.SSLError, ssl.CertificateError)):
            return "SSL"
        return "CONNECT"
    if isinstance(e, socket.gaierror):
        return "DNS"
    if isinstance(e, aiohttp.TooManyRedirects):
        return "HTTP"
    if isinstance(e, (aiohttp.ServerDisconnectedError, aiohttp.ClientOSError, aiohttp.ClientPayloadError, ConnectionError)):
        return "CONNECT"
    if isinstance(e, aiohttp.InvalidURL):
        return "DNS"
    msg = str(e).lower()
    if "name or service not known" in msg or "getaddrinfo" in msg or "no address associated" in msg:
        return "DNS"
    return "OTHER"


def _ssl_facts(resp):
    try:
        conn = resp.connection
        if conn is None or conn.transport is None:
            return {}
        so = conn.transport.get_extra_info("ssl_object")
        if so is None:
            return {}
        cert = so.getpeercert()
        out = {"version": so.version() or ""}
        if cert:
            na = cert.get("notAfter")
            if na:
                exp = datetime.fromtimestamp(ssl.cert_time_to_seconds(na), tz=timezone.utc)
                out["expires"] = exp.strftime("%Y-%m-%d")
                out["days_left"] = (exp - datetime.now(timezone.utc)).days
            iss = dict(x[0] for x in cert.get("issuer", ()) if x)
            out["issuer"] = iss.get("organizationName") or iss.get("commonName") or ""
        return out
    except Exception:
        return {}


async def fetch(session, url, max_bytes=config.MAX_BODY_BYTES, verify=True, accept_html=True, headers=None):
    """One GET, following redirects, with timing + TLS facts. Never raises."""
    r = Fetched(url=url, final_url=url)
    t0 = time.perf_counter()
    try:
        async with session.get(url, allow_redirects=True, max_redirects=config.MAX_REDIRECTS, ssl=None if verify else False,
                               headers=headers) as resp:
            r.ttfb_ms = int((time.perf_counter() - t0) * 1000)
            r.status = resp.status
            r.final_url = str(resp.url)
            r.headers = {k.lower(): v[:200] for k, v in resp.headers.items() if k.lower() in HEADER_KEEP}
            r.content_type = resp.headers.get("Content-Type", "")
            r.ssl = _ssl_facts(resp) if r.final_url.startswith("https") else {}
            r.redirected = bool(resp.history)
            if accept_html and r.content_type and not any(x in r.content_type.lower() for x in ("html", "xml", "text", "json")):
                r.body = b""
            else:
                buf = bytearray()
                try:
                    async for chunk in resp.content.iter_chunked(65536):
                        buf += chunk
                        if len(buf) >= max_bytes:
                            r.truncated = True
                            break
                except asyncio.CancelledError:
                    raise
                except Exception as e:
                    if len(buf) >= 2000:            # a long-enough partial page is still a page (server cut us off late)
                        r.truncated = True
                    else:
                        raise                      # tiny/empty partial = a failed fetch, handled as a network error below
                r.body = bytes(buf)
            r.load_ms = int((time.perf_counter() - t0) * 1000)
            r.ok = 200 <= r.status < 400
            if not r.ok:
                r.error_class = "BLOCKED" if r.status in (401, 403, 429) else "HTTP"
                r.error = f"HTTP {r.status}"
    except asyncio.CancelledError:
        raise
    except Exception as e:
        r.error_class = classify_exception(e)
        r.error = f"{type(e).__name__}: {e}"[:200]
        r.load_ms = int((time.perf_counter() - t0) * 1000)
        r.status, r.ok, r.body = 0, False, b""        # headers arrived but the body failed: report as a network failure
    return r


async def fetch_with_fallbacks(session, url, max_bytes=config.MAX_BODY_BYTES):
    """Resilient homepage fetch.

    Group 1 (same host): https -> http.   Group 2 (only after a DNS failure): www. <-> bare host, https -> http.
    A TLS failure is retried once without verification so we can still read the page (and flag the bad certificate).
    Any HTTP answer (even 404/403) ends the search. Returns (Fetched, attempts[list[str]], ssl_error[bool]).
    """
    attempts, ssl_error, last = [], False, None
    p = urlparse(url)
    host, port, path = p.hostname or "", (f":{p.port}" if p.port else ""), (p.path or "/") + (f"?{p.query}" if p.query else "")
    alt_host = host[4:] if host.startswith("www.") else "www." + host
    same = [url] + (["http://" + url[len("https://"):]] if p.scheme == "https" else [])
    other = [f"https://{alt_host}{port}{path}", f"http://{alt_host}{port}{path}"] if p.scheme == "https" else [f"http://{alt_host}{port}{path}"]
    for gi, group in enumerate((same, other)):
        if gi == 1 and not (last is not None and last.error_class == "DNS"):
            break
        for u in group:
            r = await fetch(session, u, max_bytes)
            attempts.append(f"{u} -> {r.status or r.error_class}")
            if r.error_class == "SSL":
                ssl_error = True
                r2 = await fetch(session, u, max_bytes, verify=False)
                attempts.append(f"{u} (no-verify) -> {r2.status or r2.error_class}")
                if r2.error_class != "SSL":
                    r = r2
            last = r
            if r.status:
                return r, attempts, ssl_error
            if r.error_class in ("DNS", "TIMEOUT"):
                break
    return last, attempts, ssl_error


# --------------------------------------------------------------------------- robots / sitemaps
async def fetch_robots(session, origin):
    """-> {'found', 'rp': RobotFileParser|None, 'sitemaps': [...], 'disallow_all': bool}"""
    r = await fetch(session, origin.rstrip("/") + "/robots.txt", max_bytes=200_000)
    out = {"found": False, "rp": None, "sitemaps": [], "disallow_all": False, "error_class": r.error_class if not r.status else ""}
    if r.status == 200 and r.body:
        text = r.body.decode("utf-8", "ignore")
        if "<html" in text[:500].lower():
            return out
        rp = RobotFileParser()
        rp.parse(text.splitlines())
        out.update(found=True, rp=rp)
        out["sitemaps"] = [ln.split(":", 1)[1].strip() for ln in text.splitlines() if ln.lower().startswith("sitemap:") and ":" in ln][:5]
        out["disallow_all"] = not rp.can_fetch("*", origin.rstrip("/") + "/")
    return out


_SM_PARSER = etree.XMLParser(resolve_entities=False, no_network=True, huge_tree=False, recover=True)


def parse_sitemap(body):
    """-> {'kind': 'index'|'urlset'|'unknown', 'entries': [{'loc','lastmod'}]}"""
    import gzip
    data = body or b""
    if data[:2] == b"\x1f\x8b":
        try:
            data = gzip.decompress(data)[:6_000_000]
        except Exception:
            return {"kind": "unknown", "entries": []}
    try:
        root = etree.fromstring(data, _SM_PARSER)
    except Exception:
        return {"kind": "unknown", "entries": []}
    if root is None:
        return {"kind": "unknown", "entries": []}
    tag = etree.QName(root).localname.lower()
    kind = "index" if tag == "sitemapindex" else "urlset" if tag == "urlset" else "unknown"
    entries = []
    if kind != "unknown":
        for child in root:
            if not isinstance(child.tag, str):
                continue
            loc = lastmod = ""
            for node in child:
                if not isinstance(node.tag, str):
                    continue
                n = etree.QName(node).localname.lower()
                if n == "loc":
                    loc = (node.text or "").strip()
                elif n == "lastmod":
                    lastmod = (node.text or "").strip()
            if loc:
                entries.append({"loc": loc, "lastmod": lastmod})
            if len(entries) >= 20000:
                break
    return {"kind": kind, "entries": entries}


def summarize_sitemap(entries):
    latest, proj, post = "", 0, 0
    for e in entries:
        lm = e.get("lastmod", "")[:10]
        if lm and lm > latest and lm <= datetime.now(timezone.utc).strftime("%Y-%m-%d"):
            latest = lm
        low = e["loc"].lower()
        if any(x in low for x in ("/project", "/gallery", "/portfolio", "/our-work", "/work/", "before-after")):
            proj += 1
        elif any(x in low for x in ("/blog", "/news", "/post", "/20")):
            post += 1
    return {"urls": len(entries), "latest_lastmod": latest, "project_urls": proj, "post_urls": post}


async def read_sitemaps(session, origin, hinted, try_defaults=False):
    """Fetch up to 3 sitemap documents (index -> first useful children). Returns summary dict."""
    queue = list(hinted)
    if try_defaults and not queue:
        queue = [origin.rstrip("/") + p for p in ("/sitemap.xml", "/wp-sitemap.xml", "/sitemap_index.xml")]
    entries, reads, seen = [], 0, set()
    while queue and reads < 3:
        u = queue.pop(0)
        if u in seen:
            continue
        seen.add(u)
        r = await fetch(session, u, max_bytes=3_000_000)
        if r.status != 200 or not r.body:
            continue
        doc = parse_sitemap(r.body)
        reads += 1
        if doc["kind"] == "index":
            kids = [e for e in doc["entries"]]
            kids.sort(key=lambda e: (0 if any(x in e["loc"].lower() for x in ("post", "page", "project", "blog")) else 1))
            entries += [{"loc": e["loc"], "lastmod": e["lastmod"]} for e in kids]   # index lastmod is meaningful too
            queue += [e["loc"] for e in kids[:2]]
        elif doc["kind"] == "urlset":
            entries += doc["entries"]
        if try_defaults and entries:
            break
    summary = summarize_sitemap(entries)
    summary["sitemaps_read"] = reads
    return summary
