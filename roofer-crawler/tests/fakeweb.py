"""Fake roofing websites for integration tests. Archetype is chosen by hostname prefix; host resolution is faked
via ROOFER_TEST_HOSTMAP so every name lands on this one local server."""
import asyncio
import ssl
import subprocess
import sys
import tempfile
import threading
from pathlib import Path

from aiohttp import web

MODERN = """<!doctype html><html lang="en"><head><title>{name} | Roofing Contractor in Austin, TX</title>
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Top rated Austin roofers">
<meta name="generator" content="WordPress 6.5"><link rel="stylesheet" href="/wp-content/themes/astra/style.css"><link rel="icon" href="/f.ico">
<script src="https://www.googletagmanager.com/gtm.js?id=GTM-1"></script><script>fbq('init','1');gtag('config','AW-123456789')</script>
<script src="https://cdn.callrail.com/companies/1/swap.js"></script>
<script type="application/ld+json">{{"@type":"RoofingContractor","name":"{name}","foundingDate":"2009","numberOfEmployees":{{"value":38}},
"address":{{"streetAddress":"1 Main","addressLocality":"Austin","addressRegion":"TX","postalCode":"78701","addressCountry":"US"}}}}</script></head>
<body><h1>Roof Replacement & Repair in Austin</h1>
<a href="/about-us">About Us</a> <a href="/our-team">Meet the Team</a> <a href="/contact-us">Contact</a> <a href="/reviews">Reviews</a>
<a href="/projects">Our Projects</a> <a href="/careers">Careers</a> <a href="tel:+15125550100">Call</a>
<form id="estimate"><button>Get a Free Estimate</button></form>
<p>Founded in 2009 we are a team of 38. GAF Master Elite. Licensed and insured. Financing available. Lifetime workmanship warranty.
Residential and commercial roofing, storm damage and insurance claims. Asphalt shingles, metal roofing, TPO. We've completed 3,500+ roofs.
Proudly serving Austin and surrounding areas. We're hiring roofers!</p>
<footer>(c) 2026 {name} - 1 Main St, Austin, TX 78701 - (512) 555-0100 - info@{host}</footer></body></html>"""

OLD = """<html><head><title>Home</title><meta name="generator" content="Microsoft FrontPage 4.0"></head><body bgcolor=white><center>
<font size=3>Welcome to Bob's Roofing</font><font>x</font><font>y</font><marquee>Call us!</marquee>
<table><tr><td>a</td></tr></table><table></table><table></table><table></table><table></table><table></table>
<p>Copyright 2008 Bob's Roofing. (816) 555-0199 bob@aol.com</p></center></body></html>"""

PAGES = {
    "/about-us": "<html><head><title>About</title></head><body><h1>About us</h1><p>Founded by Sarah Connor.</p><p>Sarah Connor - Owner</p><p>We are a family owned roofing company since 2009.</p></body></html>",
    "/our-team": "<html><head><title>Team</title></head><body><h2>Our Team</h2><div>Sarah Connor</div><div>Owner</div><div>Miguel Reyes - Estimator</div><div>Tom Brown - Project Manager</div></body></html>",
    "/contact-us": "<html><head><title>Contact</title></head><body><h1>Contact</h1><form><input name=a></form><p>sarah@{host}</p><a href='tel:5125550100'>call</a></body></html>",
    "/reviews": "<html><head><title>Reviews</title></head><body><h1>Reviews</h1><div class='testimonial'>Great job!</div><div class='testimonial'>Fast and clean</div></body></html>",
    "/projects": "<html><head><title>Projects</title></head><body><h1>Projects</h1><p>Posted on March 5, 2026 - Roof replacement in Round Rock</p><time datetime='2026-08-10'>x</time></body></html>",
    "/careers": "<html><head><title>Careers</title></head><body><h1>Careers</h1><p>We're hiring roofers. Apply now.</p></body></html>",
}


def archetype(host):
    return host.split(".")[0].split("-")[0].rstrip("0123456789")


async def enrichment(request, kind, path):
    import datetime, json
    if kind == "rdap" and path.startswith("/rdap/domain/"):
        dom = path.rsplit("/", 1)[-1]
        exp = datetime.date.today() + datetime.timedelta(days=30 if dom.startswith("expiring") else 400)
        return web.json_response({"events": [{"eventAction": "registration", "eventDate": "2012-05-01T00:00:00Z"},
                                             {"eventAction": "expiration", "eventDate": exp.isoformat() + "T00:00:00Z"}],
                                  "status": ["client transfer prohibited"], "nameservers": [{"ldhName": "NS1.DOMAINCONTROL.COM"}],
                                  "entities": [{"roles": ["registrar"], "vcardArray": ["vcard", [["fn", {}, "text", "GoDaddy.com, LLC"]]]}]})
    if kind == "search" and request.method == "POST":
        q = (await request.json()).get("q", "")
        P = request.url.port
        if q.startswith("roofing contractor"):
            res = [{"title": "Other Roofing", "link": "https://other1-roofing.com/", "snippet": "x"}, {"title": "More Roofing", "link": "https://other2.com/", "snippet": "y"}]
            if "Austin" in q:
                res.append({"title": "Good 9 Roofing", "link": f"http://good-9.test:{P}/", "snippet": "z"})
            return web.json_response({"organic": res})
        if "NoWeb" in q:
            return web.json_response({"organic": [
                {"title": "NoWeb Roofing - Facebook", "link": "https://www.facebook.com/nowebroofing", "snippet": "NoWeb Roofing, Dallas"},
                {"title": "NoWeb Roofing | BBB", "link": "https://www.bbb.org/us/tx/dallas/profile/roofing/noweb-roofing-1", "snippet": "BBB Rating: A+ Accredited Business since 2015"},
                {"title": "NoWeb Roofing | Dallas roofers", "link": "https://www.noweb-roofing.com/", "snippet": "John Smith, Owner of NoWeb Roofing. Family owned."}]})
        return web.json_response({"organic": [{"title": "Good 9 Roofing - Facebook", "link": "https://facebook.com/good9", "snippet": "Sarah Connor, Owner"}]})
    if kind == "social":
        pages = {"/fb": "Austin Roofing Pros, Austin. 2,345 likes \u00b7 12 talking about this \u00b7 87 were here. Roofing contractor",
                 "/ig": "1,234 Followers, 56 Following, 78 Posts - See Instagram photos and videos from Austin Roofing (@austinroofing)",
                 "/wall": "Log in or sign up to view"}
        if path in pages:
            return web.Response(content_type="text/html", text=f'<html><head><title>Page</title><meta property="og:description" content="{pages[path]}"></head><body></body></html>')
    return None


async def handler(request):
    host = request.host.split(":")[0]
    kind = archetype(host)
    path = request.path
    if kind in ("rdap", "search", "social"):
        r = await enrichment(request, kind, path)
        if r is not None:
            return r
    if path == "/robots.txt":
        if kind == "robots":
            return web.Response(text="User-agent: *\nDisallow: /\n")
        if kind == "good":
            return web.Response(text=f"User-agent: *\nDisallow: /wp-admin/\nSitemap: http://{request.host}/sitemap.xml\n")
        return web.Response(status=404, text="no")
    if path == "/sitemap.xml" and kind == "good":
        return web.Response(content_type="application/xml", text=f'<?xml version="1.0"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
                            f'<url><loc>http://{request.host}/projects/job-1</loc><lastmod>2026-09-01</lastmod></url>'
                            f'<url><loc>http://{request.host}/blog/post-1</loc><lastmod>2026-06-01</lastmod></url></urlset>')
    if kind == "slow":
        await asyncio.sleep(2.0)
    if kind == "timeout":
        await asyncio.sleep(60)
    if path != "/":
        if kind == "good" and path in PAGES:
            return web.Response(text=PAGES[path].replace("{host}", host), content_type="text/html")
        return web.Response(status=404, text="not found")
    if kind in ("good", "slow", "selfsigned"):
        return web.Response(text=MODERN.format(name=host.title(), host=host), content_type="text/html", headers={"Last-Modified": "Mon, 01 Sep 2026 10:00:00 GMT", "Server": "nginx"})
    if kind == "fence":
        return web.Response(text="<html><head><title>Robinson Fence Company | Celina TX</title><meta name='viewport' content='width=device-width'></head><body><h1>Fence installation and repair</h1><p>We build wood and iron fences. We also do gutters and storm damage repair for fences, decks and pools. Insurance claims welcome. Call us today for a free estimate on your fence project. Serving Celina, TX and surrounding areas for over ten years with quality work and honest pricing for every customer in the area.</p><p>Gutters, siding, fascia, soffit, hail damage.</p><a href='tel:9725550100'>Call</a></body></html>", content_type="text/html")
    if kind == "bird":
        return web.Response(text="<html><head><title>Birdieworks | Celina TX</title><meta name='viewport' content='width=device-width'></head><body><h1>Commercial Roofing and Roof Replacement</h1><p>Birdieworks installs shingles and metal roofing and does roof repair for commercial and residential customers. Roof replacement, roof inspection, storm damage and gutters. Free estimate. Serving Celina TX for fifteen years with honest pricing and a workmanship warranty on every roofing project we complete in the area.</p><a href='tel:9725550101'>Call</a><form><button>Get a Free Estimate</button></form></body></html>", content_type="text/html")
    if kind == "old":
        return web.Response(text=OLD, content_type="text/html", headers={"Server": "Microsoft-IIS/6.0"})
    if kind == "parked":
        return web.Response(text="<html><head><title>x</title></head><body><h1>This domain is for sale</h1><p>Buy this domain at HugeDomains</p></body></html>", content_type="text/html")
    if kind == "default":
        return web.Response(text="<html><head><title>Welcome to nginx!</title></head><body><h1>Welcome to nginx!</h1></body></html>", content_type="text/html")
    if kind == "construction":
        return web.Response(text="<html><head><title>Coming Soon</title></head><body><h1>Coming soon</h1><p>Our new website is under construction</p></body></html>", content_type="text/html")
    if kind == "suspended":
        return web.Response(status=503, text="<html><body><h1>Account Suspended</h1><p>This account has been suspended.</p></body></html>", content_type="text/html")
    if kind == "notfound":
        return web.Response(status=404, text="<html><body>not found</body></html>", content_type="text/html")
    if kind == "cf":
        return web.Response(status=403, text="<html><head><title>Just a moment...</title></head><body>Checking your browser before accessing</body></html>", content_type="text/html")
    if kind == "redirect":
        raise web.HTTPMovedPermanently(location="http://good-landing.test:%d/" % request.url.port)
    if kind == "shell":
        return web.Response(text='<html><head><title>App</title><script src="/a.js"></script></head><body><div id="root"></div></body></html>', content_type="text/html")
    return web.Response(text=MODERN.format(name=host.title(), host=host), content_type="text/html")


def make_selfsigned(tmpdir=None):
    """Self-signed test certificate shipped with the tests (no openssl needed - Windows has none)."""
    here = Path(__file__).resolve().parent
    ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    ctx.load_cert_chain(here / "selfsigned_cert.pem", here / "selfsigned_key.pem")
    return ctx


class FakeWeb:
    """Runs the fake server in a background thread. .port (http) and .tls_port (https, self-signed) are set after start()."""

    def __init__(self, tls=True):
        self.tls = tls
        self.port = self.tls_port = 0
        self._loop = None
        self._ready = threading.Event()

    def _run(self):
        self._loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self._loop)
        app = web.Application()
        app.router.add_route("*", "/{tail:.*}", handler)
        runner = web.AppRunner(app, access_log=None)
        self._loop.run_until_complete(runner.setup())
        site = web.TCPSite(runner, "127.0.0.1", 0)
        self._loop.run_until_complete(site.start())
        self.port = site._server.sockets[0].getsockname()[1]
        if self.tls:
            try:
                ctx = make_selfsigned()
                s2 = web.TCPSite(runner, "127.0.0.1", 0, ssl_context=ctx)
                self._loop.run_until_complete(s2.start())
                self.tls_port = s2._server.sockets[0].getsockname()[1]
            except Exception as e:
                print("TLS test server unavailable:", e, file=sys.stderr)
        self._runner = runner
        self._ready.set()
        self._loop.run_forever()

    def start(self):
        self.t = threading.Thread(target=self._run, daemon=True)
        self.t.start()
        self._ready.wait(15)
        return self

    def stop(self):
        if self._loop:
            self._loop.call_soon_threadsafe(self._loop.stop)
