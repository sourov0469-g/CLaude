"""FINAL homepage build (AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05): ONE version, no switcher, no hidden versions, no external links.
Writes out/final.html. The shell (fonts, tokens, header, mobile bar) is reused from the earlier build (../site/build.py); every section here is the final one."""
import html, json, os, re, sys, base64
HERE = os.path.dirname(os.path.abspath(__file__)); SITE = os.path.join(HERE, '..', 'site'); WORK = os.path.join(HERE, '..', '..', 'work')
sys.path.insert(0, SITE)
from build import fonts, I, HEADER, MBAR, HEAD_JS, LEAD, SUB
SRC = lambda f: open(os.path.join(HERE, 'src', f)).read()
CONTACT = '#booking'   # internal route; becomes the Contact page when the inner pages are built (after Muse approves the homepage)
BOOKING_URL = 'https://www.austinprosiding.com/schedule-appointment'


def b64(path): return base64.b64encode(open(path, 'rb').read()).decode()


def hero():
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); q = P[36]
    assert (q['place'], q['when']) == ('Ashford Park, Buda', 'Jul 2026') and 'Siding' in q['trades']
    assert LEAD == 'The full wall or the whole house.'
    back = 'data:image/webp;base64,' + b64(os.path.join(HERE, 'assets', 'hero', 'back.webp')); front = 'data:image/webp;base64,' + b64(os.path.join(HERE, 'assets', 'hero', 'front.webp'))
    sub = SUB.split('. ')[0] + '.'; assert sub == 'Siding, windows and roofing for Austin homes since 2009.'
    e = html.escape
    return f'''<section class="fh" id="top-hero" aria-labelledby="fh-h"><div class="fh-stage">
<img class="fh-back" src="{back}" alt="A finished Austin Pro job in {e(q['place'])}, Texas: a single-storey house in tan lap siding with a blue door and a tall chimney, under an overcast sky." width="1900" height="1425" decoding="async" fetchpriority="high">
<h1 class="fh-t" id="fh-h"><span class="ln">The full wall or</span> <span class="ln">the whole house.</span></h1>
<img class="fh-front" src="{front}" alt="" aria-hidden="true" width="1900" height="883" decoding="async"></div>
<div class="fh-ui"><div class="fh-cta"><p class="fh-sub">{e(sub)}</p><div class="fh-act"><a class="btn key" href="{CONTACT}">Book a free inspection<span class="tab">{I['cal']}</span></a><a class="callx" href="tel:+15125500000">{I['phone']}(512) 550-0000</a></div></div>
<p class="fh-cap">{e(q['place'])} · {e(q['when'])} · {e(q['trades'])}</p></div><span class="fh-scroll" aria-hidden="true"><i></i></span></section>'''


def build():
    css = fonts() + open(os.path.join(SITE, 'src', 'frame.css')).read() + SRC('shell.css') + SRC('hero.css')
    hdr = HEADER.replace(BOOKING_URL, CONTACT).replace('href="#work"', 'href="#area"'); mbar = MBAR.replace(BOOKING_URL, CONTACT)
    main = hero()
    js = SRC('hero.js')
    boot = 'FHero.wire(document);'
    out = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing | Austin, TX since 2009</title>
<meta name="description" content="Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house. Call (512) 550-0000.">
<style>{css}</style></head><body id="top">{hdr}<main data-page="home">{main}</main>{mbar}
{HEAD_JS}<script>{js}{boot}</script></body></html>'''
    return out


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    h = build(); open(os.path.join(HERE, 'out', 'final.html'), 'w').write(h)
    ext = re.findall(r'(?:href|src|action)="(https?://[^"]+)"', h)
    print('final.html bytes', len(h.encode()), '| external URLs:', ext)
