"""FINAL homepage build (AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05): ONE version, no switcher, no hidden versions, no external links.
Writes out/final.html. The shell (fonts, tokens, header, mobile bar) is reused from the earlier build (../site/build.py); every section here is the final one."""
import html, json, os, re, sys, base64
HERE = os.path.dirname(os.path.abspath(__file__)); SITE = os.path.join(HERE, '..', 'site'); WORK = os.path.join(HERE, '..', '..', 'work')
sys.path.insert(0, SITE)
from build import fonts, I, HEADER, MBAR, HEAD_JS, LEAD, SUB
import parts_services, parts_vis, parts_windows, parts_ported as PP
import parts_reviews, parts_process, parts_area, parts_booking, parts_footer
import parts_page_siding, parts_page_windows, parts_page_roofing, parts_page_our_work, parts_page_contact
TAIL = [parts_reviews, parts_process, parts_area, parts_booking, parts_footer]
PAGES = [parts_page_siding, parts_page_windows, parts_page_roofing, parts_page_our_work, parts_page_contact]   # the inner pages, in navigation order   # the sections after Windows, in page order
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


VIDEO = {'d': 'https://www.austinprosiding.com/videos/hero-test.mp4', 't': 'https://www.austinprosiding.com/videos/hero-tablet.mp4', 'm': 'https://www.austinprosiding.com/videos/hero-mobile.mp4'}   # the firm's own hero film (LINKED, never embedded); the only outside address in the file, used as a media source, not a link


def wall():
    """Section 2: the wall and the video (Hero V9's idea, 'type as the house', moved here by the owner). Wall type = the firm's own published line;
    the paragraph over the film = the firm's own published sentences."""
    e = html.escape
    LINE = ['One free', 'inspection', 'covers every', 'trade on the', 'house.']; assert ' '.join(LINE) == 'One free inspection covers every trade on the house.'
    F = json.load(open(os.path.join(WORK, 'data', 'faq.json'))); faq = ' '.join(a for k in F for _, a in F[k])
    P1 = 'A project manager walks every side of the house: siding, trim, windows, roof and gutters.'; P2 = 'The inspection and estimate are free.'
    assert P2 in faq and 'One free inspection covers every trade on the house.' in open(os.path.join(SITE, 'src', 'sec', 'svc8.js')).read()
    assert P1 in open(os.path.join(SITE, 'src', 'sec', 'proc9.js')).read()
    poster = 'data:image/jpeg;base64,' + b64(os.path.join(HERE, 'assets', 'wall', 'poster.jpg'))
    lines = ' '.join(f'<span class="l">{e(t)}{"<span class=fw-win aria-hidden=true></span>" if i == 3 else ""}</span>' for i, t in enumerate(LINE))
    sash = '<div class="fw-s %s"><i></i></div>'
    return f'''<section class="fw" id="wall" aria-labelledby="fw-h" data-vd="{VIDEO['d']}" data-vt="{VIDEO['t']}" data-vm="{VIDEO['m']}"><div class="fw-pin" data-p0>
<div class="fw-wall" aria-hidden="true"><svg class="fw-lamp" viewBox="0 0 120 170" focusable="false"><defs><radialGradient id="fwG" cx="50%" cy="22%" r="70%"><stop offset="0" stop-color="#FFE9B0" stop-opacity=".75"/><stop offset="1" stop-color="#FFE9B0" stop-opacity="0"/></radialGradient><linearGradient id="fwC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7A8" stop-opacity=".5"/><stop offset="1" stop-color="#FFE7A8" stop-opacity="0"/></linearGradient></defs><path class="fw-cone" d="M34 78 L-10 170 H130 L86 78Z" fill="url(#fwC)"/><ellipse class="fw-glow" cx="60" cy="86" rx="54" ry="46" fill="url(#fwG)"/><path d="M60 8V30C60 44 60 52 60 62" fill="none" stroke="#1C2420" stroke-width="5" stroke-linecap="round"/><rect x="46" y="2" width="28" height="9" rx="3" fill="#1C2420"/><path d="M26 82C26 62 42 54 60 54S94 62 94 82Z" fill="#242D28"/><path d="M30 80C32 66 44 59 60 59" fill="none" stroke="rgba(255,255,255,.22)" stroke-width="2" stroke-linecap="round"/><ellipse cx="60" cy="82" rx="34" ry="5" fill="#FFE9B0" opacity=".9"/></svg><i class="fw-pipe"></i></div><h2 class="fw-h" id="fw-h"><span class="w">{lines}</span></h2>
<div class="fw-vid"><video muted loop playsinline preload="none" poster="{poster}" aria-label="The firm's own film: a finished home in golden light" disablepictureinpicture></video></div>
<div class="fw-frame" aria-hidden="true"><div class="fw-cas"></div><div class="fw-op">{sash % 'a'}{sash % 'b'}</div><div class="fw-sill"></div></div>
<div class="fw-hint" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v14M6 13l6 6 6-6"/></svg>Scroll to open the window</div>
<div class="fw-over"><p>{e(P1)} {e(P2)}</p><div class="fw-act"><a class="btn key" href="{CONTACT}">Book a free inspection<span class="tab">{I['cal']}</span></a><a class="callx" href="tel:+15125500000">{I['phone']}(512) 550-0000</a></div></div>
<button type="button" class="fw-pp" data-play='{I["play"]}' data-pause='{I["pause"]}' aria-label="Pause the film" aria-pressed="false">{I['pause']}</button></div></section>'''


def route_header(h):
    """Header links become routes: Siding's four swatch cards go to the Siding page's anchors; Windows, Roofing and Our work are pages; Contact is added."""
    it = iter(['#/siding/lap', '#/siding/board-batten', '#/siding/shingle-shake', '#/siding/trim-soffit'])
    h = re.sub(r'href="#siding"', lambda m: f'href="{next(it)}"', h)
    h = h.replace('href="#windows"', 'href="#/windows"').replace('href="#roofing"', 'href="#/roofing"').replace('href="#area"', 'href="#/our-work"')
    h = h.replace('<li><a href="#/our-work">Our work</a></li>', '<li><a href="#/our-work">Our work</a></li><li><a href="#/contact">Contact</a></li>')
    assert '#/contact' in h and '#/our-work' in h
    return h


def build():
    repl = set(k for m in TAIL for k in m.REPLACES); keep = [k for k in PP.MODS if k not in repl]
    mods = TAIL + PAGES
    own = lambda ext: ''.join(SRC(getattr(m, ext.upper())) for m in mods if os.path.exists(os.path.join(HERE, 'src', getattr(m, ext.upper()))))
    css = fonts() + open(os.path.join(SITE, 'src', 'frame.css')).read() + SRC('shell.css') + SRC('router.css') + SRC('hero.css') + SRC('wall.css') + SRC('serv.css') + SRC('vis.css') + SRC('win.css') + PP.css(keep) + own('css') + SRC('cursor.css') + SRC('nav.css')
    hdr = route_header(HEADER.replace(BOOKING_URL, CONTACT).replace('href="#work"', 'href="#area"')); mbar = MBAR.replace(BOOKING_URL, CONTACT)
    S = PP.sections()
    body_tail = [m for m in TAIL if m is not parts_footer]
    home = hero() + wall() + parts_services.services() + parts_vis.vis(CONTACT, I['cal']) + parts_windows.windows(CONTACT, I['cal']) + ''.join(m.markup(S, CONTACT, I['cal']) for m in body_tail)
    ctx = {'contact': CONTACT, 'cal': I['cal'], 'icons': I}
    pages = ''.join(f'<main class="pg" data-page="{m.NAME}" id="pg-{m.NAME}" hidden>{m.markup(ctx)}</main>' for m in PAGES)
    foot = parts_footer.markup(S, CONTACT, I['cal'])
    js = PP.globals_js() + SRC('hero.js') + SRC('wall.js') + SRC('serv.js') + SRC('vis.js') + SRC('win.js') + PP.js(keep) + own('js') + SRC('cursor.js') + SRC('nav.js') + SRC('router.js')
    boot = 'FCursor.init();FNav.init();FHero.wire(document);FWall.wire(document);FServ.wire(document);FVis.wire(document);FWin.wire(document);' + PP.wires(keep) + ''.join(f'{m.GLOBAL}.wire(document);' for m in mods if os.path.exists(os.path.join(HERE, 'src', m.JS))) + 'FRoute.init();'
    out = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing | Austin, TX since 2009</title>
<meta name="description" content="Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house. Call (512) 550-0000.">
<style>{css}</style></head><body id="top">{hdr}<main class="pg on" data-page="home" id="pg-home">{home}</main>{pages}{foot}{mbar}
{HEAD_JS}<script>{js}{boot}</script></body></html>'''
    return out


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    h = build(); open(os.environ.get('OUT') or os.path.join(HERE, 'out', 'final.html'), 'w').write(h)
    ext = re.findall(r'(?:href|src|action)="(https?://[^"]+)"', h)
    print('final.html bytes', len(h.encode()), '| outside addresses (media sources only):', ext)
