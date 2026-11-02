"""Shell for the single-file site: assets, image registry, section wrapper (two versions + backups), router, header,
footer and the one scroll engine. Section modules import from here."""
import base64, html, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
BV2 = os.path.dirname(HERE)
ROOT = os.path.dirname(BV2)
for p in (os.path.join(BV2, 'phase2'), BV2, os.path.join(ROOT, 'src')):
    sys.path.insert(0, p)
import marks, tokens, home2  # noqa: E402,F401
from icons import icon  # noqa: E402,F401

esc = html.escape
P = tokens.PRIM
NAME = 'Austin Pro Siding'
PHONE, TEL = '(512) 550-0000', 'tel:+15125500000'
EMAIL = 'info@austinprosiding.com'
ADDRESS = '7801 N Lamar Blvd Suite C70, Austin TX 78752'
HOURS = 'Mon–Fri 8–8, Sat 8–6, Sun 12–5'
RECORD = '312 on the map with photos + 574 more counted'
REVIEWS = '4.9 stars from 474 reviews'
CREDS = ['GAF Master Elite', "James Hardie Elite Preferred + President's Club 2025", 'Andersen Certified Premier', 'BBB A+']
PAIRS = home2.PAIRS6
PLACE = {p['id']: p['place'] for p in PAIRS}
TRADE = {p['id']: ('siding' if (p['id'].startswith('siding') or p['id'] == 'robroy') else 'windows') for p in PAIRS}


def b64(path, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()


FACES = ''.join(f"@font-face{{font-family:'{f}';font-weight:{w};font-display:swap;src:url({b64(os.path.join(BV2, 'fonts', p), 'font/woff2')}) format('woff2')}}"
                for f, w, p in [('Montserrat', 700, 'Montserrat-700-latin.woff2'), ('Montserrat', 800, 'Montserrat-800-latin.woff2'),
                                ('Inter', 400, 'Inter-400-latin.woff2'), ('Inter', 600, 'Inter-600-latin.woff2'), ('Inter', 700, 'Inter-700-latin.woff2')])
TOKENS_CSS = open(os.path.join(BV2, 'phase2', 'tokens.css')).read()


class Images:
    """each image is embedded once: the first use carries the data URI, every later use is filled from it by JS"""
    SRC = {**{f'{p["id"]}-{ab}': f'site/assets/img/h/work-{p["id"]}-{ab}-1000.webp' for p in PAIRS for ab in 'ab'}}

    def __init__(self):
        self.used = set()

    def img(self, key, alt, cls='', eager=False, w=1000, h=667):
        a = f'alt="{esc(alt)}" width="{w}" height="{h}" class="{cls}"' + ('' if eager else ' loading="lazy" decoding="async"')
        if key not in self.used:
            self.used.add(key)
            return f'<img data-key="{key}" src="{b64(os.path.join(ROOT, self.SRC[key]), "image/webp")}" {a}>'
        return f'<img data-img="{key}" {a}>'


IM = Images()


def lockup(fg=None, word=None, h=32, tail=False, label=True, bg='#fff'):
    fg = fg or P['steel-9']
    word = word or P['neutral-13']
    a = f'role="img" aria-label="{NAME}"' if label else 'aria-hidden="true"'
    return (f'<svg class="lk" viewBox="0 0 296 64" width="{h * 296 / 64:.0f}" height="{h}" {a} focusable="false">'
            f'{marks.c1(fg, bg, tail=230 if tail else 0, cls=" c1-tail" if tail else "")}<text class="wm" x="78" y="41" fill="{word}">{NAME}</text></svg>')


def cline(color='var(--color-accent-line)', cls='draw'):
    return (f'<svg class="cline {cls}" viewBox="0 0 600 24" width="100%" height="24" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
            f'<path d="M2 22.5L8 2H16V13H600" fill="none" stroke="{color}" stroke-width="3" vector-effect="non-scaling-stroke" pathLength="1"/></svg>')


def ill(svg, cls=''):
    """S0414 teardown: hidden or unspecified construction is identified as illustrative. Every construction drawing says so."""
    return (f'<figure class="ill-f {cls}">{svg}<figcaption class="ill">Illustrative drawing of typical construction, '
            f'not a specification for your home.</figcaption></figure>')


def section(page, idx, title, v1, v2, cls='', backups=()):
    """one section with exactly two versions. V1 shows by default; the review switch flips it. Backups are templates."""
    sid = f'{page}-{idx}'
    bk = ''.join(f'<template class="bk" data-sec="{sid}" data-v="{v}" data-rev="{r}">{h}</template>' for v, r, h in backups)
    sw = (f'<div class="rv" role="group" aria-label="Review: versions of {esc(title)}">'
          f'<button type="button" aria-pressed="true" data-v="1">V1</button><button type="button" aria-pressed="false" data-v="2">V2</button></div>')
    return (f'<section class="sec {cls}" id="{sid}" data-sec="{sid}" aria-label="{esc(title)}">{sw}'
            f'<div class="ver" data-v="1">{v1}</div><div class="ver" data-v="2" hidden>{v2}</div>{bk}</section>')


NAV = [('siding', 'Siding & painting'), ('windows', 'Windows & doors'), ('roofing', 'Roofing'), ('work', 'Our work'), ('about', 'About')]


def header():
    links = ''.join(f'<a href="#/{k}" data-route="{k}">{esc(t)}</a>' for k, t in NAV)
    return f'''<header class="hdr"><div class="wrap hdr-in"><a class="hdr-logo" href="#/" data-route="home" aria-label="{NAME}, home">{lockup(h=34, tail=True, label=False)}</a>
<nav class="hdr-nav" id="hdr-nav" aria-label="Main">{links}</nav>
<a class="hdr-call" href="{TEL}">{icon("communication-phone", 18)}<span>{PHONE}</span></a>
<a class="btn btn-primary btn-sm hdr-book" href="#/about/booking">Book</a>
<button class="hdr-menu" type="button" aria-expanded="false" aria-controls="hdr-nav">{icon("action-menu", 24)}<span class="sr">Menu</span></button></div></header>'''


def footer():
    return f'''<footer class="ftr"><canvas class="atmos" aria-hidden="true"></canvas><div class="wrap ftr-in">
<div>{lockup(fg="#fff", word="#fff", h=36, bg=P["steel-12"])}<p class="ftr-p">{esc(ADDRESS)}<br>{esc(HOURS)}</p></div>
<div><p class="ftr-k">Call</p><p><a href="{TEL}">{PHONE}</a></p><p class="ftr-k">Email</p><p><a href="mailto:{EMAIL}">{EMAIL}</a></p></div>
<div><p class="ftr-k">Pages</p><p class="ftr-nav"><a href="#/">Home</a>{"".join(f'<a href="#/{k}">{esc(t)}</a>' for k, t in NAV)}<a href="#/about/booking">Book an estimate</a></p></div></div>
<div class="wrap ftr-base"><p>{esc(REVIEWS)} · {" · ".join(esc(c) for c in CREDS)}<button type="button" class="ftr-mo" data-motion aria-pressed="false">Pause animations</button></p></div></footer>'''
