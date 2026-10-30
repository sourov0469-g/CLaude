"""Assemble the Elbaz homepage into ONE self-contained HTML file.

Everything is inlined: fonts (base64 WOFF2), vendor JS, section CSS/JS,
the photo store (base64 WebP, turned into object URLs at boot), traced line
drawings and map geometry. No three.js (PLAN-V2 §0: F17/F18).

usage: python3 build.py                 -> ../site/elbaz-homepage.html
       python3 build.py --only ba       -> ../site/dev/ba.html (chrome + that one section, for isolated work)
"""
import base64
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
IMG = os.path.join(ROOT, "assets", "img")
OUT = os.path.join(ROOT, "site", "elbaz-homepage.html")

SECTIONS = ["hero", "proof", "services", "ba", "process", "financing", "work", "reviews", "towns", "consult"]

# OWNER ORDER (full site): five pages; every inner page is a set of sections, each section with its own five versions
PAGES = {
    "home": {"out": "elbaz-homepage.html", "sections": SECTIONS, "book": "#consult",
             "title": "Elbaz Construction | Kitchen, Bathroom and Whole-Home Remodeling in South Florida",
             "desc": "Licensed design-build remodeler for kitchens, bathrooms and whole homes across Miami-Dade, Broward and Palm Beach. Licensed, bonded &amp; insured · CBC1265280. Call (754) 236-0675.",
             "url": "https://elbazconstructioncorp.com/"},
    "kitchens": {"out": "kitchens.html", "sections": ["kitchen-intro", "kitchen-scope", "kitchen-work"], "book": "contact.html#contact-form",
                 "title": "Kitchen Remodeling in South Florida | Elbaz Construction",
                 "desc": "Kitchen remodeling across Miami-Dade, Broward and Palm Beach: layout, cabinetry, counters and the plumbing and electrical behind them, handled as one scope. Licensed, bonded &amp; insured · CBC1265280.",
                 "url": "https://elbazconstructioncorp.com/kitchen-remodeling-miami/"},
    "bathrooms": {"out": "bathrooms.html", "sections": ["bath-intro", "bath-build", "bath-work"], "book": "contact.html#contact-form",
                  "title": "Bathroom Remodeling in South Florida | Elbaz Construction",
                  "desc": "Bathroom remodeling across Miami-Dade, Broward and Palm Beach: waterproofing done properly, tile set square, glass and fixtures that still look right in year five. Licensed, bonded &amp; insured · CBC1265280.",
                  "url": "https://elbazconstructioncorp.com/bathroom-remodeling-miami/"},
    "renovation": {"out": "renovation.html", "sections": ["reno-intro", "reno-services", "reno-permits"], "book": "contact.html#contact-form",
                   "title": "Whole-Home Renovation, Additions and Exterior Work | Elbaz Construction",
                   "desc": "Whole-home renovation, ADUs and additions, new construction, commercial remodeling, flooring, roofing, windows and doors, outdoor living, planning and permitting. Licensed, bonded &amp; insured · CBC1265280.",
                   "url": "https://elbazconstructioncorp.com/residential-remodling-miami/"},
    "contact": {"out": "contact.html", "sections": ["contact-form", "contact-visit", "contact-area"], "book": "#contact-form",
                "title": "Book a Consultation | Elbaz Construction, Miami",
                "desc": "Book a consultation with Elbaz Construction: (754) 236-0675, Sales@elbazconstruction.com, 19 W Flagler St #310, Miami, FL 33130. Sun to Fri 7am to 7pm, Saturday closed.",
                "url": "https://elbazconstructioncorp.com/contact/"},
}
LINKS = [("kitchens", "Kitchens", "hood"), ("bathrooms", "Bathrooms", "shower"), ("renovation", "Renovation", "house"), ("contact", "Contact", "speech")]
HOME_ANCHORS = [("#services", "Services", "~wrench/tilt/wobble/r"), ("#ba", "Before and after", "~swap/hinge/spinout/r"), ("#process", "Process", "~gear/roll/spinout/r"),
                ("#financing", "Financing", "~coin/bounce/hop/r"), ("#work", "Work", "~camera/slide/flash/r"), ("#reviews", "Reviews", "~star/neon/sparkle/r"),
                ("#towns", "Service area", "~compass/orbit/spinout/r")]


def chrome(page):
    """site navigation for one page: nav links, the menu sheet, the footer page column (aria-current on the page itself)"""
    href = lambda k: "#top" if k == page else PAGES[k]["out"]
    cur = lambda k: ' aria-current="page"' if k == page else ""
    nav = "".join('<li><a href="%s"%s data-rx="~%s/%s/b">%s</a></li>' % (href(k), cur(k), sp, rx, name)
                  for (k, name, sp), rx in zip(LINKS, ["swing/wobble", "drop/flash", "spin/spinout", "jack/hop"]))
    sheet = '<ul class="sheet__pages"><li><a href="%s"%s data-rx="~crane/tilt/wobble/r">Home</a></li>' % (href("home"), cur("home"))
    sheet += "".join('<li><a href="%s"%s data-rx="~%s/%s/r">%s</a></li>' % (href(k), cur(k), sp, rx, name)
                     for (k, name, sp), rx in zip(LINKS, ["tilt/tick", "hinge/spinout", "roll/spinout", "bounce/hop"]))
    sheet += "</ul>"
    if page == "home":
        sheet += '<p class="sheet__h">On this page</p><ul>' + "".join('<li><a href="%s" data-rx="%s">%s</a></li>' % a for a in HOME_ANCHORS) + "</ul>"
    foot = "".join('<a href="%s"%s data-rx="~%s/peek/tick/r">%s</a>' % (href(k), cur(k), sp, name) for (k, name, sp) in LINKS)
    return nav, sheet, foot
SYSTEMS = ["buddy", "rig", "react", "fields"]   # companion, reaction rig + reactions, section fields + dividers
VENDOR = ["gsap", "ScrollTrigger", "DrawSVGPlugin", "Flip", "MotionPathPlugin"]   # matter.js out [AUDIT-01 C.10]   # only the plugins the sections call (F18)


def read(*p):
    with open(os.path.join(HERE, *p), encoding="utf-8") as f:
        return f.read()


def maybe(*p):
    path = os.path.join(HERE, *p)
    return read(*p) if os.path.exists(path) else ""


def b64(path):
    with open(path, "rb") as f:
        return base64.b64encode(f.read()).decode("ascii")


def store_entry(path):
    """[AUDIT-01 C.10] AVIF q45, long edge capped at 1400px (1920 for the -xl hero plate), cached beside the sources;
    used when smaller than the WebP. The first character of the entry names the type."""
    key = os.path.splitext(os.path.basename(path))[0]
    cache = os.path.join(os.path.dirname(path) + "-avif", key + ".q45.avif")
    if not os.path.exists(cache) or os.path.getmtime(cache) < os.path.getmtime(path):
        from PIL import Image
        os.makedirs(os.path.dirname(cache), exist_ok=True)
        im = Image.open(path).convert("RGB")
        cap = 1920 if key.endswith("-xl") else 1400
        if max(im.size) > cap:
            r = cap / max(im.size)
            im = im.resize((round(im.size[0] * r), round(im.size[1] * r)), Image.LANCZOS)
        im.save(cache, "AVIF", quality=45, speed=4)
    if os.path.getsize(cache) < os.path.getsize(path):
        return "a" + b64(cache)
    return "w" + b64(path)


def script_safe(s):
    # keep inline scripts from closing early
    return s.replace("</script", "<\\/script")


def main():
    pages = [sys.argv[sys.argv.index("--page") + 1]] if "--page" in sys.argv else list(PAGES)
    if "--only" in sys.argv:
        return build("home", only=sys.argv[sys.argv.index("--only") + 1])
    for pg in pages:
        build(pg)


def build(page, only=None):
    html = read("base.html")
    P = PAGES[page]
    sections, out = P["sections"], os.path.join(ROOT, "site", P["out"])
    nav, sheet, foot = chrome(page)
    html = (html.replace("{{TITLE}}", P["title"]).replace("{{DESC}}", P["desc"]).replace("{{URL}}", P["url"])
            .replace("{{HOME}}", "#top" if page == "home" else PAGES["home"]["out"])
            .replace("{{HOME_LABEL}}", "Elbaz Construction, back to top" if page == "home" else "Elbaz Construction, home page")
            .replace("{{NAV}}", nav).replace("{{SHEET}}", sheet).replace("{{FOOTNAV}}", foot).replace("{{BOOK}}", P["book"]))
    if only:
        sections = [only]
        out = os.path.join(ROOT, "site", "dev", only + ".html")

    # [OWNER DESIGN NOTE] everyday Google staples for the presented site: Poppins SemiBold for display, Roboto for text.
    # 'Elbaz Display' is Poppins 600 with size-adjust 74% so the size tokens written for a condensed face land at normal
    # Poppins sizes. Bebas Neue and Geist stay embedded only for the hidden backup slots (records, not the presented site).
    fonts = (
        "@font-face{font-family:'Elbaz Display';src:url(data:font/woff2;base64,%s) format('woff2');"
        "font-weight:100 900;font-style:normal;font-display:swap;size-adjust:74%%}"
        "@font-face{font-family:'Poppins';src:url(data:font/woff2;base64,%s) format('woff2');font-weight:500;font-display:swap}"
        "@font-face{font-family:'Poppins';src:url(data:font/woff2;base64,%s) format('woff2');font-weight:600 900;font-display:swap}"
        "@font-face{font-family:'Roboto';src:url(data:font/woff2;base64,%s) format('woff2');font-weight:100 900;font-display:swap}"
        "@font-face{font-family:'Bebas Neue';src:url(data:font/woff2;base64,%s) format('woff2');"
        "font-weight:400;font-style:normal;font-display:swap}"
        "@font-face{font-family:'Geist';src:url(data:font/woff2;base64,%s) format('woff2');"
        "font-weight:100 900;font-display:swap}"
        % (b64(os.path.join(HERE, "fonts", "poppins-latin-600-normal.woff2")),
           b64(os.path.join(HERE, "fonts", "poppins-latin-500-normal.woff2")),
           b64(os.path.join(HERE, "fonts", "poppins-latin-600-normal.woff2")),
           b64(os.path.join(HERE, "fonts", "roboto-latin-wght-normal.woff2")),
           b64(os.path.join(HERE, "fonts", "bebas-neue-latin.woff2")),
           b64(os.path.join(HERE, "fonts", "geist-wght.woff2")))
    )
    if page != "home":
        # inner pages hold no dark-era backups: the two retired faces are not shipped there
        fonts = fonts[:fonts.index("@font-face{font-family:'Bebas Neue'")]

    css = [read("css", "tokens.css"), read("css", "chrome.css"), read("css", "systems.css")]
    sections_html, js = [], []
    for sid in sections:
        sections_html.append(maybe("sections", sid + ".html"))
        css.append(maybe("css", "sections", sid + ".css"))
        js.append(maybe("js", "sections", sid + ".js"))

    # weight (FULL §4): the delivered file drops CSS and HTML comments; the sources keep them, references live in TRACEABILITY.md
    css = [re.sub(r"/\*.*?\*/", "", c, flags=re.S) for c in css]
    sections_html = [re.sub(r"<!--(?!\{\{).*?-->", "", h, flags=re.S) for h in sections_html]
    html = re.sub(r"<!--(?!\{\{).*?-->", "", html, flags=re.S)
    used = set()
    page_text = "\n".join(sections_html) + "\n".join(js)
    for m in re.finditer(r"data-(?:bg-)?img=\"([a-z0-9-]+)\"|EZ\.img\('([a-z0-9-]+)'\)", page_text):
        used.add(m.group(1) or m.group(2))
    # the homepage's data tables name every photo; inner pages ship only the photos their own markup and scripts name
    data_text = "".join(open(os.path.join(HERE, "data", n)).read() for n in os.listdir(os.path.join(HERE, "data")) if n.endswith(".json")) if page == "home" else ""
    # keys named in JS data (e.g. before/after pair tables) count as used too
    for name in os.listdir(IMG):
        key, ext = os.path.splitext(name)
        if ext == ".webp" and ("'" + key + "'" in page_text or '"' + key + '"' in page_text or '"' + key + '"' in data_text):
            used.add(key)
    store = {}
    for name in sorted(os.listdir(IMG)):
        key, ext = os.path.splitext(name)
        if ext == ".webp" and (key in used or "--all-images" in sys.argv):
            store[key] = store_entry(os.path.join(IMG, name))
    missing = sorted(k for k in used if k not in store)
    if missing:
        print("WARNING missing images:", missing)

    lines = {}
    ldir = os.path.join(HERE, "data", "lines")
    if os.path.isdir(ldir) and page == "home":
        for name in sorted(os.listdir(ldir)):
            if name.endswith(".json"):
                lines[name[:-5]] = json.load(open(os.path.join(ldir, name)))

    extra = {}
    ddir = os.path.join(HERE, "data")
    for name in sorted(os.listdir(ddir)):
        if name.endswith(".json"):
            extra[name[:-5]] = json.load(open(os.path.join(ddir, name)))

    vendor = "\n".join(read("vendor", v + ".min.js") for v in VENDOR) + "\n" + read("vendor", "lenis.min.js")
    # [OWNER REDESIGN] the new roof-E lockup (brand/make_logo.py), outlined Poppins, one SVG data URI shipped once
    logo_src = "data:image/svg+xml;base64," + b64(os.path.join(ROOT, "brand", "elbaz-logo.svg"))

    html = (html
            .replace("/*{{FONTS}}*/", fonts)
            .replace("/*{{CSS}}*/", "\n".join(css))
            .replace("<!--{{SECTIONS}}-->", "\n".join(sections_html))
            .replace("{{LOGO_SRC}}", logo_src, 1).replace('src="{{LOGO_SRC}}"', 'src="" data-logo')   # [AUDIT-01 C.10] the logo ships once
            .replace("/*{{VENDOR}}*/", script_safe(vendor))
            .replace("/*{{DATA}}*/", "window.__LINES=" + json.dumps(lines, separators=(",", ":")) + ";window.__DATA=" + json.dumps(extra, separators=(",", ":")) + ";")
            .replace("/*{{CORE}}*/", script_safe(read("js", "core.js") + "\n" + "\n".join(read("js", "systems", n + ".js") for n in SYSTEMS)))
            .replace("/*{{SECTIONS_JS}}*/", script_safe("\n".join(js)))
            .replace("/*{{IMGSTORE}}*/", json.dumps(store, separators=(",", ":"))))

    os.makedirs(os.path.dirname(out), exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", out, round(os.path.getsize(out) / 1e6, 2), "MB;", len(store), "images")


if __name__ == "__main__":
    main()
