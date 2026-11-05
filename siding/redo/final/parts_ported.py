"""Ported sections: the owner's chosen versions (Windows A, Reviews B + C, Process D, Area A, Booking C + J, the footer), rendered by the earlier
build's own section modules, then upgraded in the final build (internal routes only, no outside link, dim ground, per-section SVG life).
Importing the earlier build is only a source of markup and modules; nothing else of it is in the final file."""
import os, re, sys, json
HERE = os.path.dirname(os.path.abspath(__file__)); SITE = os.path.join(HERE, '..', 'site')
sys.path.insert(0, SITE)
import build_site as BS

BOOK = BS.BOOK
SEC = lambda f: open(os.path.join(SITE, 'src', 'sec', f)).read()
MODS = {'windows': 'Win', 'reviews': 'Rev', 'rev2': 'Rev2', 'proc2': 'Proc2', 'area': 'Area', 'cta': 'Cta', 'cta2': 'Cta2', 'cta5': 'Cta5'}


def sections():
    pre = BS.prerender()
    return {'windows': pre['wa'], 'reviewsB': pre['rb'], 'reviewsC': pre['rc'], 'process': pre['pd'], 'area': pre['aa'], 'bookC': pre['cc'], 'bookJ': pre['cj'], 'footer': pre['ft']}


def css(mods=None):
    out = ''
    for m in (mods or MODS):
        out += SEC(m + '.css')
    # the dim ground: no pure white panels in the final page (a very light green-tinted near-white instead)
    out = re.sub(r'(background(?:-color)?:\s*)(?:#fff(?:fff)?|#FFFFFF|#FFF|white)\b', r'\1#F5F9F5', out)
    out = re.sub(r'(background(?:-color)?:\s*)rgba\(255,\s*255,\s*255,\s*(\.\d+|1|0?\.\d+)\)', r'\1rgba(245,249,245,\2)', out)
    return out.replace('244,242,236', '245,249,245')


def js(mods=None):
    return ''.join(SEC(m + '.js') for m in (mods or MODS))


def globals_js():
    return (f'window.__REV={json.dumps(BS.REV)};window.__NEAR={json.dumps(BS.NEAR, separators=(",", ":"))};window.__WCOL={json.dumps(BS.WCOL)};'
            f'window.__JOBS={json.dumps(BS.AREA["cards"])};window.__AREA={{cities:{json.dumps(BS.AREA["cities"])},places:{json.dumps(BS.AREA["places"])}}};')


def wires():
    return ''.join(f'{o}.wire(document);' for m, o in MODS.items() if m not in ('cta',)) + 'Cta.wire(document);'


def route(html, contact):
    """Internal routes only: the old booking address becomes the in-page route; every other outside address (the firm's project pages) becomes plain text."""
    html = html.replace(BOOK, contact)
    def strip(m):
        tag, inner = m.group(1), m.group(2)
        cls = re.search(r'class="([^"]*)"', tag); c = f' class="{cls.group(1)} xl"' if cls else ' class="xl"'
        return f'<span{c}>{inner}</span>'
    return re.sub(r'(<a\b[^>]*\bhref="https?://[^"]*"[^>]*>)(.*?)</a>', strip, html, flags=re.S)
