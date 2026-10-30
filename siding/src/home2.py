"""index.html, homepage v3: ten sections, three switchable versions each (PLAN-HOME-V3.md, SKILL-PACK.md).

Only one version per section is live in the DOM; the other two wait in <template>s, so ids stay unique, there is one
h1, and nothing hidden is focusable. Facts come from FACTS.md via the harvested JSON; no figure here is invented.
Run: `python3 -I home2.py` (writes site/index.html and site/assets/data/home.json is not needed: data is inlined).
"""
import json
import os
import re
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parts import NEAR, HOME_PAIRS, SVC_PAIRS, PHOTOS, REVIEWS, LIVE, PHONE, TEL, TRADES, e, SITE, clean
from pages_inner import SW, COLORPLUS
import elevation
import iso
import sheet

H = 'assets/img/h/'
EMAIL = 'info@austinprosiding.com'
ADDRESS = '7801 N Lamar Blvd Suite C70, Austin, TX 78752'   # BRIEF-V5 §3, verbatim
HOURS = 'Monday–Friday 8–8, Saturday 8–6, Sunday 12–5'       # BRIEF-V5 §3, verbatim


def band(s):
    return s.replace('–', '-').replace('—', '-')


def alt(s):
    return e(s.replace(' — ', ', ').replace('—', ', ').replace('–', '-'))


def img(src, w, h, a, cls='', eager=False, extra=''):
    load = 'fetchpriority="high" decoding="async"' if eager else 'loading="lazy" decoding="async"'
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="{src}" width="{w}" height="{h}" alt="{a}" {load}{extra}>'


def btn_book(cls='btn btn-red', label='Book free inspection', trade=''):
    t = f' data-trade="{e(trade)}"' if trade else ''
    return f'<a class="{cls}" href="#book" data-book{t}>{label}</a>'


def mag(html):
    """magnetic wrapper (S1321): the wrapper moves, the button keeps its own press scale"""
    return f'<span class="mag" data-magnet>{html}</span>'


def ctas(dark=False):
    """the hero contact paths: book online, or call (K7: the phone sits in every version's contact path)"""
    hero = '<a class="btn btn-red" href="#book" data-book data-cur="hero">Book free inspection</a>'
    return f'<div class="ctas">{mag(hero)}<a class="tlink{" on-dark" if dark else ""}" href="{TEL}">Call {PHONE}</a></div>'


def alt_btn(href, label, extra=''):
    """the second button language on the page (S0145 arcade shadow), with its own cursor state"""
    return f'<a class="btn btn-alt" href="{href}" data-cur="alt"{extra}>{label}</a>'


H1 = '<h1 class="display" data-split>Siding and windows, priced in public</h1>'
LEAD = '<p class="lead">886 documented jobs around Austin, each with its real price. Inspections are free.</p>'

# ---------- data ----------
ROB = SVC_PAIRS['siding'][1]
assert ROB['place'].startswith('Rob Roy')


def pair_from_svc(pid, p):
    return dict(id=pid, place=p['place'], when=p['when'], what=p['installed'], band=band(p['band']), bl=p['bl'],
                href=LIVE + p['href'], ab=p['before']['alt'], aa=p['after']['alt'])


PAIRS6 = [pair_from_svc('robroy', ROB),
          pair_from_svc('siding0', SVC_PAIRS['siding'][0]),
          pair_from_svc('windows3', SVC_PAIRS['windows'][3]),
          pair_from_svc('siding2', SVC_PAIRS['siding'][2]),
          dict(id='home2', place=HOME_PAIRS[2]['p'], when=HOME_PAIRS[2]['w'], what=HOME_PAIRS[2]['i'], band=band(HOME_PAIRS[2]['b']),
               bl=HOME_PAIRS[2]['bl'], href=f"{LIVE}/recent-projects/{HOME_PAIRS[2]['s']}", ab=HOME_PAIRS[2]['ba'], aa=HOME_PAIRS[2]['aa']),
          pair_from_svc('windows1', SVC_PAIRS['windows'][1])]
assert PAIRS6[1]['place'].startswith('Milwood') and PAIRS6[2]['place'].startswith('Maple Run') and PAIRS6[5]['place'].startswith('Ridgewood')


def pimg(p, side, cls='', eager=False):
    return img(f'{H}work-{p["id"]}-{side}-1000.webp', 1000, 625, alt(p['ab'] if side == 'b' else p['aa']), cls, eager)


TRADE_ORDER = ['siding', 'windows', 'exterior-painting', 'shingle-roofing', 'gutters', 'doors', 'patio-covers', 'metal-roofing', 'garage-doors', 'decking']
TBY = {t['slug']: t for t in TRADES}
TRADE_PHOTO = {'siding': 0, 'windows': 42, 'exterior-painting': 33, 'shingle-roofing': 11, 'gutters': 34,
               'doors': 22, 'patio-covers': 18, 'metal-roofing': 12, 'garage-doors': 26}


def tphoto(slug):
    return f'{H}trade-{slug}-800.webp'


def tcap(slug):
    p = PHOTOS[TRADE_PHOTO[slug]]
    return f"{p['trades']} in {p['place']}, {p['when']}"


def med(t):
    return f"${t['med'][0]}k-${t['med'][1]}k"


def mid(t):
    return 'Under $5k' if t['lo'] == 0 else f"${t['lo']}k-${t['hi']}k"


CREW = [('Kevin', r'\bKevin(?: Harris)?\b'), ('Garrett', r'\bGarret{1,2}\b'), ('Tracy', r'\bTracy\b'), ('Paul Hale', r'\bPaul Hale\b'),
        ('Paul Schantz', r"\bPaul Schantz(?:'s)?\b"), ('Taylor', r'\bTaylor(?: Anderson)?\b'), ('Jake', r'\bJake\b'), ('Jerry', r'\bJerry\b'),
        ('Maria', r'\bMaria\b'), ('Shorty', r'\bShorty\b')]


def crew_of(text):
    return [n for n, rx in CREW if re.search(rx, text)]


def mark(text):
    t = e(text)
    for n, rx in CREW:
        t = re.sub(rx, lambda m: f'<mark>{m.group(0)}</mark>', t)
    return t


def cut(text, n):
    if len(text) <= n:
        return text
    s = text[:n].rsplit(' ', 1)[0].rstrip(',.;:!')
    return s + '…'


CREW_COUNT = {n: sum(1 for r in REVIEWS if n in crew_of(r['text'])) for n, _ in CREW}
assert CREW_COUNT['Kevin'] == 9 and CREW_COUNT['Garrett'] == 8 and CREW_COUNT['Tracy'] == 4 and CREW_COUNT['Paul Hale'] == 3, CREW_COUNT

# map: the 312 photographed pins in the published frame, as the firm draws them
CITIES = sorted({c.strip().title() for c in NEAR['ct']})
PINS = []
for x, y, ym, bits, ci, pi, ph, pidx in NEAR['p']:
    if ph == 1 and 0 <= x <= 566 and 0 <= y <= 640:
        PINS.append([x, y, ym, bits, pi if pi >= 0 else len(NEAR['pl']) + ci, CITIES.index(NEAR['ct'][ci].strip().title())])
assert len(PINS) == 312
PINS.sort(key=lambda p: p[2])
NAMES = NEAR['pl'] + [c.strip().title() for c in NEAR['ct']]
TOWNS = [[g[0], g[2], g[3], g[6]] for g in NEAR['g'] if g[1] == 'c']  # name, x, y, documented jobs in the file
TOWN_TOP = [t for t in TOWNS if t[0] in ('Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'San Marcos', 'Buda')]
PLACES = []
seen = set()
for g in NEAR['g']:
    nm = g[0] if g[1] == 'c' or ',' in g[0] else f"{g[0]}, {NEAR['ct'][g[4]].strip().title()}"
    if nm not in seen:
        seen.add(nm)
        PLACES.append([nm, g[2], g[3]])
MAPDATA = dict(ppm=NEAR['ppm'], hq=NEAR['hq'], names=NAMES, pins=PINS, places=PLACES, sv=NEAR['sv'], cities=CITIES)


def map_svg(cls='map-svg', label='Map of 312 photographed, documented Austin Pro jobs around Austin'):
    pins = ''.join(f'<circle cx="{x}" cy="{y}" r="3.6" data-i="{i}"/>' for i, (x, y, *_r) in enumerate(PINS))
    grat = '<path class="m-grat" d="M0 603.2H566M0 488.6H566M0 374.0H566M0 259.4H566M0 144.7H566M0 30.1H566M49.4 0V640M148.3 0V640M247.3 0V640M346.2 0V640M445.1 0V640M544.1 0V640"/>'
    towns = ''.join(f'<text class="m-town" x="{x + 7}" y="{y + 4}">{e(n)}</text>' for n, x, y, c in TOWNS
                    if n in ('Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda', 'Lakeway', 'Hutto', 'Manor', 'San Marcos') and 10 <= x <= 520 and 20 <= y <= 620)
    hx, hy = NEAR['hq']
    office = f'<rect class="m-hq" x="{hx - 6}" y="{hy - 6}" width="12" height="12"/><text class="m-town m-hq-t" x="{hx + 13}" y="{hy + 19}">Office, N Lamar</text>'
    scale = f'<g class="m-scale" transform="translate(452 606)"><path d="M0 0h{NEAR["ppm"] * 10:.0f}M0 -5v10M{NEAR["ppm"] * 10:.0f} -5v10"/><text x="0" y="-10">10 mi</text></g>'
    return f'''<svg class="{cls}" viewBox="0 0 566 640" role="img" aria-label="{label}">
      {grat}{towns}<g class="m-pins">{pins}</g>{office}{scale}<circle class="m-ring" r="0" cx="0" cy="0"/>
    </svg>'''


# ---------- HERO ----------
def pstrip(cls=''):
    """anatomy F1 proof strip: rating + review count + installer tier + since-year, in or above every hero"""
    c = f' {cls}' if cls else ''
    return (f'<p class="pstrip{c}"><span><span class="ps-st" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span><b>4.9</b> on 474 Google reviews</span>'
            '<span>GAF Master Elite</span><span>James Hardie Elite Preferred</span><span>Since 2009</span></p>')


def pmt(P, apr=0.0799, n=120):
    r = apr / 12
    return P * r / (1 - (1 + r) ** -n)


H1_TEXT = 'Siding and windows, priced in public'


def h1_mask(sid, vw, vh, lines, fs, x0, img_box):
    """Q95 Masked Heading: the headline is a clipPath of text and the after photo of a true pair shows through it, so
    every letter is a window onto the finished wall. A grille (muntins) and a sill per line are drawn over the glass;
    a solid copy underneath is the no-JS / pre-load face. lines = [(y, [words])]; img_box = x, y, w, h of the photo."""
    def txt(cls):
        return ''.join(f'<text class="{cls}" x="{x0}" y="{y}">' + ' '.join(f'<tspan>{e(w)}</tspan>' for w in ws) + '</text>' for y, ws in lines)
    ix, iy, iw, ih = img_box
    sills = ''.join(f'<path d="M{x0} {y + fs * .16:.0f}H{vw - x0}"/>' for y, _ in lines)   # trimmed to each line's measured length at run time
    return (f'<svg class="h1m-svg h1m-{sid}" viewBox="0 0 {vw} {vh}" style="--fs:{fs}px" aria-hidden="true" focusable="false"><defs>'
            f'<clipPath id="h1m-c-{sid}">{txt("h1m-t h1m-cl")}</clipPath>'
            f'<pattern id="h1m-g-{sid}" width="{fs * .5:.0f}" height="{fs * .62:.0f}" patternUnits="userSpaceOnUse"><path d="M0 .5H{fs * .5:.0f}M.5 0V{fs * .62:.0f}"/></pattern></defs>'
            f'<g class="h1m-solid">{txt("h1m-t")}</g>'
            f'<g class="h1m-glass" clip-path="url(#h1m-c-{sid})"><g class="h1m-par"><image class="h1m-img" href="{H}../pairs/robroy-ha-1440.webp" x="{ix}" y="{iy}" width="{iw}" height="{ih}" preserveAspectRatio="xMidYMid slice"/></g>'
            f'<rect class="h1m-grille" width="{vw}" height="{vh}" fill="url(#h1m-g-{sid})"/></g>'
            f'<g class="h1m-case">{txt("h1m-t")}</g><g class="h1m-sill">{sills}</g></svg>')


def hero1():
    """[BANK] Q95 Masked Heading: letters as windows onto the Rob Roy finished wall (rise 0.3 s, stagger 0.05,
    pointer parallax 26, drift 18), proof strip above, lead + both contact paths below"""
    d = h1_mask('d', 1440, 372, [(150, ['Siding', 'and', 'windows,']), (318, ['priced', 'in', 'public'])], 168, 24, (-989, -573, 2498, 1561))
    m = h1_mask('m', 375, 330, [(70, ['Siding', 'and']), (146, ['windows,']), (222, ['priced', 'in']), (298, ['public'])], 84, 8, (-369, -181, 931, 582))
    return f'''<div class="v hero-1" data-tone="ground">
  <div class="h1m-top">{pstrip()}</div>
  <h1 class="h1m"><span class="sr-only">{H1_TEXT}</span>{d}{m}</h1>
  <div class="h1m-foot">
    <div class="h1m-copy">{LEAD}{ctas()}</div>
    <p class="h1m-chip"><span>The letters are glazed with one finished wall: Rob Roy, Austin, {ROB['when']}</span><b>{e(ROB['installed'])}</b><span>{e(ROB['bl'])} {band(ROB['band'])}</span></p>
  </div>
</div>'''


H2_TRADES = ['siding', 'windows', 'shingle-roofing', 'exterior-painting']
H2_ZONE = {'siding': 'wall', 'windows': 'win', 'shingle-roofing': 'roof', 'exterior-painting': 'trim'}
BOOK_AS = {'siding': 'Siding', 'windows': 'Windows', 'shingle-roofing': 'Shingle roofing', 'exterior-painting': 'Exterior painting'}


def locator(zone, cls='h2-loc'):
    """Neil Kelly picker, drawn: one house elevation, the trade's own part lit (wall courses, glass, shingle rows, trim)"""
    laps = ''.join(f'<path d="M14 {y}H106"/>' for y in range(52, 92, 6))
    rows = ''.join(f'<path d="M{18 + k * 4} {40 - k * 6}H{102 - k * 4}"/>' for k in range(4))
    return (f'<svg class="{cls}" viewBox="0 0 120 100" data-zone="{zone}" aria-hidden="true" focusable="false">'
            f'<g class="z z-wall"><rect x="14" y="46" width="92" height="46"/>{laps}</g>'
            f'<g class="z z-roof"><path d="M6 47L60 10L114 47Z"/>{rows}</g>'
            '<g class="z z-win"><rect x="24" y="56" width="18" height="22"/><path d="M33 56V78M24 67H42"/><rect x="78" y="56" width="18" height="22"/><path d="M87 56V78M78 67H96"/></g>'
            '<g class="z z-trim"><path d="M6 47L60 10L114 47M14 46V92M106 46V92"/><path d="M22 54H44M76 54H98"/></g>'
            '<rect class="z-door" x="52" y="62" width="16" height="30"/><path class="z-grade" d="M0 92H120"/></svg>')


def hero2():
    """Stronghold crown 1 (proof strip above the headline; the hero IS step one of the quote) + Neil Kelly's project
    picker: each card locates its trade on a drawn house; step two opens in place with the trade's published median
    band, middle half and monthly estimate, and a booking button already set to the trade"""
    data, cards = {}, ''
    for k, s in enumerate(H2_TRADES):
        t = TBY[s]
        lo, hi = t['med']
        data[s] = dict(name=t['name'], n=f"{t['n']}", med=med(t), mid=f"${t['lo']}k and ${t['hi']}k", mo=f"${pmt(lo * 1000):.0f}-${pmt(hi * 1000):.0f}",
                       img=tphoto(s), alt=alt(PHOTOS[TRADE_PHOTO[s]]['alt']), cap=tcap(s), book=BOOK_AS[s], zone=H2_ZONE[s])
        cards += (f'<li><a class="h2p" href="#services" data-t="{s}" data-cur="view" data-cur-label="See prices">'
                  f'{img(tphoto(s), 800, 600, "", "h2p-img", eager=k < 2)}<span class="h2p-plate">{locator(H2_ZONE[s])}'
                  f'<span class="h2p-n">{t["name"]}</span><span class="h2p-go">What it costs</span></span></a></li>')
    f = data['siding']
    js = json.dumps(data).replace('</', '<\\/')
    return f'''<div class="v hero-2" data-tone="ground" data-step="1">
  <div class="h2-top">{pstrip()}{H1}<p class="lead">886 documented jobs around Austin, each with its real price. Pick your project to see what it usually costs.</p></div>
  <div class="h2-s1">
    <p class="h2-k"><span class="h2-pips" aria-hidden="true"><i class="on"></i><i></i></span>Step 1 of 2: pick your project</p>
    <ul class="h2-grid">{cards}</ul>
    <p class="h2-more">Gutters, doors, patio covers, metal roofing, decking or storm damage? <a href="#services">See all eleven trades</a>. One free inspection covers every trade on the house, or call <a href="{TEL}">{PHONE}</a>.</p>
  </div>
  <div class="h2-s2" hidden>
    <figure class="h2-fig"><img data-f="img" src="{f['img']}" width="800" height="600" alt="{f['alt']}" loading="lazy" decoding="async"><figcaption class="h2-cap" data-f="cap">{e(f['cap'])}</figcaption></figure>
    <div class="h2-ans">
      <p class="h2-k"><span class="h2-pips" aria-hidden="true"><i class="on"></i><i class="on"></i></span>Step 2 of 2</p>
      <h2 class="h2-ah" tabindex="-1" data-f="head"><span data-f="name">{f['name']}</span>: what Austin Pro jobs cost</h2>
      <div class="h2-row">{locator(f['zone'], 'h2-loc h2-loc-l')}<p class="h2-med"><span>Median job, from <b data-f="n">{f['n']}</b> priced jobs</span><b class="num" data-f="med">{f['med']}</b></p></div>
      <p class="h2-mid">Half of them landed between <span data-f="mid">{f['mid']}</span>. Materials and labour, before discounts and tax.</p>
      <p class="h2-mo">About <b data-f="mo">{f['mo']}</b> a month at 7.99% APR over 120 months, on approved credit.</p>
      <div class="h2-cta"><a class="btn btn-red" href="#book" data-book data-trade="{f['book']}" data-cur="hero" data-f="book">Book a free siding inspection</a><a class="tlink" href="{TEL}">Call {PHONE}</a><button class="tlink h2-back" type="button" data-f="back">Pick another project</button></div>
    </div>
  </div>
  <script type="application/json" class="h2-data">{js}</script>
</div>'''


H3F = [3, 15, 41, 18, 37]


def yard_sign():
    """the job caption hangs on a drawn yard sign: board, wire frame, two stakes in the grass"""
    return ('<svg class="h3-sign-svg" viewBox="0 0 300 170" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
            '<path class="ys-stake" d="M70 120V170M230 120V170"/><path class="ys-wire" d="M62 120V8H238V120"/>'
            '<rect class="ys-board" x="4" y="4" width="292" height="120" rx="6"/><rect class="ys-band" x="4" y="4" width="292" height="22" rx="6"/>'
            '<path class="ys-grass" d="M40 170C48 160 52 158 56 150M58 170C60 162 66 156 72 154M84 170C82 162 84 156 90 150M214 170C216 160 222 156 226 152M234 170C236 162 242 158 248 154M252 170C252 164 256 158 262 156"/></svg>')


def hero3():
    """[BANK] Feldco crown 2 (real-work hero under a dated line, a stat row in trade units) as R33 poster frames that
    the VISITOR picks: five job tabs set the photo (no autoplay); the caption is a yard sign; stats are static"""
    tabs, panels = '', ''
    for k, i in enumerate(H3F):
        p = PHOTOS[i]
        on = k == 0
        tabs += (f'<button class="h3-tab" type="button" role="tab" id="h3t{k}" aria-controls="h3p" aria-selected="{"true" if on else "false"}" tabindex="{0 if on else -1}" '
                 f'data-k="{k}" aria-label="{e(p["place"])}, {p["when"]}"><img src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="" loading="lazy" decoding="async"><span>{e(p["place"].split(",")[0])}</span></button>')
        panels += (f'<img class="h3-ph{" on" if on else ""}" src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="{alt(p["alt"]) or e(p["trades"] + " at a home in " + p["place"])}" '
                   + ('fetchpriority="high"' if on else 'loading="lazy"') + ' decoding="async">')
    caps = [dict(place=PHOTOS[i]['place'], when=PHOTOS[i]['when'], trades=PHOTOS[i]['trades']) for i in H3F]
    c0 = caps[0]
    stats = [('431', 'siding jobs documented'), ('388', 'window jobs documented'), ('210', 'shingle roofs documented'), ('5,000+', 'Central Texas homeowners served')]
    li = ''.join(f'<li><b class="num">{n}</b><span>{e(t)}</span></li>' for n, t in stats)
    return f'''<div class="v hero-3" data-tone="ground">
  <div class="h3-stage" role="tabpanel" id="h3p" aria-labelledby="h3t0">
    <div class="h3-photos">{panels}</div>
    <div class="h3-txt">{pstrip()}<p class="h3-dated">Austin's siding, window and roofing crew since 2009</p>{H1}{LEAD}{ctas(True)}</div>
    <div class="h3-sign" aria-live="polite">{yard_sign()}<p><b data-s="place">{e(c0['place'])}</b><span data-s="trades">{e(c0['trades'])}</span><span data-s="when">{c0['when']}</span></p></div>
  </div>
  <div class="h3-under">
    <div class="h3-pick"><p class="h3-pl" id="h3pl">Pick a job</p><div class="h3-tabs" role="tablist" aria-labelledby="h3pl">{tabs}</div></div>
    <ul class="h3-stats" aria-label="Austin Pro work in trade units">{li}</ul>
  </div>
  <script type="application/json" class="h3-data">{json.dumps(caps)}</script>
</div>'''


# ---------- PROOF ----------
CREDS = [('gaf-master-elite', 'GAF Master Elite', 357, 112), ('hardie-elite-preferred', 'James Hardie Elite Preferred', 300, 98),
         ('hardie-presidents-club-2025', "James Hardie President's Club 2025", 140, 176),
         ('andersen-certified-premier', 'Andersen Certified Premier', 176, 168),
         ('guildmaster-service-excellence', 'GuildQuality Guildmaster', 205, 164), ('bbb-a-plus', 'BBB A+', 185, 120)]


def creds(cls='creds'):
    return f'<ul class="{cls}" aria-label="Certified, accredited and awarded">' + ''.join(
        f'<li><img src="assets/img/{f}.webp" width="{w}" height="{h}" alt="{e(n)}" loading="lazy" decoding="async"></li>' for f, n, w, h in CREDS) + '</ul>'


def ring49():
    r = 40
    c = 2 * 3.14159265 * r
    return (f'<svg class="r49" viewBox="0 0 100 100" aria-hidden="true"><circle class="r49-t" cx="50" cy="50" r="{r}"/>'
            f'<circle class="r49-v" cx="50" cy="50" r="{r}" style="--c:{c:.2f}; --off:{c * (1 - 4.9 / 5):.2f}"/></svg>')


def boards886():
    """F12 arithmetic as three lap boards hung on nails: 312 + 574 = 886 (PLAN P1)"""
    def board(x, w, n, cap, cls=''):
        return (f'<g class="bq {cls}" transform="translate({x} 6)"><rect class="bq-f" width="{w}" height="40" rx="2"/><path class="bq-g" d="M6 13C{w * .3:.0f} 10 {w * .6:.0f} 16 {w - 6} 12M6 27C{w * .4:.0f} 24 {w * .7:.0f} 30 {w - 6} 26"/>'
                f'<rect class="bq-sh" y="36" width="{w}" height="4"/><circle class="bq-n" cx="9" cy="9" r="2.6"/><circle class="bq-n" cx="{w - 9}" cy="9" r="2.6"/>'
                f'<text class="bq-t" x="{w / 2}" y="30">{n}</text><text class="bq-c" x="{w / 2}" y="62">{cap}</text></g>')
    return ('<svg class="b886" viewBox="0 0 470 70" aria-hidden="true" focusable="false">'
            + board(0, 120, '312', 'on the map, with photos') + '<text class="bq-op" x="146" y="36">+</text>'
            + board(172, 120, '574', 'more counted') + '<text class="bq-op" x="318" y="36">=</text>'
            + board(344, 120, '886', 'documented', 'bq-r') + '</svg>')


def proof1():
    """#317 Digital Butlers "Proof, not promises" band (counts stated beside the offer) + anatomy F12 checkable arithmetic"""
    return f'''<div class="v proof-1 has-bgf" data-tone="ground">
  <div class="bgf" aria-hidden="true"><div class="p1-gw" data-depth="-0.7"><span class="p1-ghost">886</span></div></div>
  <h2 class="h2x" data-split>On record since 2009</h2>
  <div class="rec">
    <p class="rc rc-a"><b class="num" data-count>886</b><span>documented projects, 2018-2026, each with its price</span><span class="rc-sum num"><span class="sr-only">312 on the map with photos + 574 more counted = 886</span>{boards886()}</span></p>
    <p class="rc rc-b"><b class="num" data-count>177</b><span>before-and-after pairs published</span></p>
    <p class="rc rc-c">{ring49()}<b class="num" data-count>4.9</b><span>on 474 Google reviews</span></p>
    <p class="rc rc-d"><b class="num" data-count>5,000+</b><span>Central Texas homeowners</span></p>
  </div>
  <div class="p1-foot">{creds()}{alt_btn('#work', 'See the work')}</div>
</div>'''


# what each credential means, in the firm's own words where it published them (FACTS: Proof as published)
CRED_ROWS = [
    ('gaf-master-elite', 'GAF Master Elite', 'Roofing', 'GAF says fewer than 2% of contractors nationwide hold it.'),
    ('hardie-elite-preferred', 'James Hardie Elite Preferred', 'Siding', "The top tier of the James Hardie contractor alliance. It can't be bought: James Hardie audits it, and it has to be re-earned."),
    ('hardie-presidents-club-2025', "James Hardie President's Club 2025", 'Siding', 'Awarded by James Hardie for 2025.'),
    ('andersen-certified-premier', 'Andersen Certified Premier', 'Windows', 'Certified by Andersen at the Premier level.'),
    ('guildmaster-service-excellence', 'GuildQuality Guildmaster', 'Service', 'Award for Service Excellence, four years in a row, 2015 through 2018.'),
    ('bbb-a-plus', 'BBB A+', 'Business', 'Accredited Business, rated A+.'),
]


def proof2():
    """Georgia Contractor Group (CROWN, GC report): the "at a glance" credential table as the proof unit, installer
    tier above review volume (builder brief 2.3)"""
    dims = {f: (w, h) for f, n, w, h in CREDS}
    rows = ''.join(f'''<tr><td class="gl-b"><img src="assets/img/{f}.webp" width="{dims[f][0]}" height="{dims[f][1]}" alt="" loading="lazy" decoding="async"><svg class="gl-ld" viewBox="0 0 40 12" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path class="ld-l" pathLength="1" d="M2 6H36"/><path class="ld-t" d="M2 1V11M38 6L32 2.5V9.5Z"/></svg></td>
      <th scope="row">{e(n)}<span class="gl-t">{t}</span></th><td class="gl-m">{e(m)}</td></tr>''' for f, n, t, m in CRED_ROWS)
    base = [('In business', 'Since 2009. Austin Pro Siding &amp; Windows (2009) and Sanders Roofing &amp; Exteriors (2010) merged in 2018.'),
            ('Office', ADDRESS),
            ('Reviews', '<b class="num">4.9</b> on 474 Google reviews'),
            ('Record', '886 documented projects, 177 before-and-after pairs, 5,000+ Central Texas homeowners')]
    base_rows = ''.join(f'<div class="gl-r"><dt>{k}</dt><dd>{v}</dd></div>' for k, v in base)
    return f'''<div class="v proof-2" data-tone="night">
  <div class="gl">
    <div class="gl-head">
      <h2 class="h2x" data-split>Austin Pro at a glance</h2>
      <p class="gl-lead">The credentials first, then the record. Badges as the firm publishes them.</p>
      <dl class="gl-base">{base_rows}</dl>
      {alt_btn('#reviews', 'Read what they wrote')}
    </div>
    <table class="gl-table"><caption class="sr-only">Certified, accredited and awarded</caption>
      <thead><tr><th scope="col"><span class="sr-only">Badge</span></th><th scope="col">Credential</th><th scope="col">What it means</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  </div>
</div>'''


def pill(i):
    case = ('<svg class="ip-case" viewBox="0 0 46 19" preserveAspectRatio="none" focusable="false"><rect class="ip-sash" x="2" y="2" width="42" height="15"/>'
            '<path class="ip-fr" d="M1 1H45V18H1ZM23 1V18"/></svg>')
    return f'<span class="ipill" aria-hidden="true"><img src="{H}t/p{i}-320.webp" width="320" height="240" alt="" loading="lazy" decoding="async">{case}</span>'


def pill_pair():
    """the 177 pill shows a GENUINE pair (Rob Roy, Austin): before in the left pane, after in the right (§3 photos rule)"""
    case = ('<svg class="ip-case" viewBox="0 0 46 19" preserveAspectRatio="none" focusable="false"><rect class="ip-sash" x="2" y="2" width="42" height="15"/>'
            '<path class="ip-fr" d="M1 1H45V18H1ZM23 1V18"/></svg>')
    return (f'<span class="ipill ipill-pair" aria-hidden="true"><img class="ipp-b" src="{H}work-robroy-b-1000.webp" width="1000" height="625" alt="" loading="lazy" decoding="async">'
            f'<img class="ipp-a" src="{H}work-robroy-a-1000.webp" width="1000" height="625" alt="" loading="lazy" decoding="async">{case}</span>')


def proof3():
    return f'''<div class="v proof-3" data-tone="ground2">
  <h2 class="h2s">The short version</h2>
  <p class="statement" data-illuminate>Since 2009, Austin Pro has worked on <b>5,000+</b> Central Texas homes. <b>886</b> {pill(3)} of those jobs are documented, each with photos and a real price, and <b>177</b> {pill_pair()} have a before and after. Homeowners rate the work <b>4.9</b> on <b>474</b> Google reviews.</p>
  <div class="stamps">{creds('creds creds-stamp')}{alt_btn('#book', 'Book free inspection')}</div>
</div>'''


# ---------- SERVICES ----------
# the six parts of the Rob Roy house the instrument can light, mapped to the firm's trades (FACTS.md counts and bands)
SV1 = [   # (part, label, trade for booking, photo slug, facts as the firm publishes them: FACTS.md product sections)
    ('siding', 'Siding', 'Siding', 'siding', ['James Hardie fiber cement on every priced siding job',
                                             '301 of 415 used the HardiePlank lap 8.25″ board; 27 went board and batten',
                                             'Select Cedarmill texture on 286 of 415, Smooth on 36',
                                             '30-year non-prorated Hardie warranty, plus lifetime workmanship on labour']),
    ('windows', 'Windows', 'Windows', 'windows', ['Four brands cover 361 of 376 priced window jobs',
                                                  'NT Windows 238 · Simonton 54 · Andersen 38 · Pella 31',
                                                  'Frames: 214 vinyl, 64 aluminum, 33 Fibrex composite',
                                                  'Most window-only jobs take two days on site']),
    ('roof', 'Roof', 'Shingle roofing', 'shingle-roofing', ['GAF Master Elite; GAF on 200 documented projects',
                                                             '210 shingle roofs and 31 metal roofs documented',
                                                             '5-year labour warranty on laminate and designer shingles; GAF Golden Pledge available',
                                                             'Metal: lifetime workmanship, manufacturer 30 to 50 years']),
    ('trim', 'Trim and paint', 'Exterior painting', 'exterior-painting', ['Sherwin-Williams on 320 documented projects',
                                                                         'Any of 1,700+ colours with free colour matching, or ColorPlus baked on in 17 Austin colours',
                                                                         'Painted in the same job on 297 of 415 priced siding jobs']),
    ('doors', 'Doors', 'Exterior doors', 'doors', ['109 exterior door jobs documented',
                                                   '18% of priced window jobs replaced doors too']),
    ('deck', 'Deck', 'Decking', '', ['Decking is one of the firm\'s eleven trades',
                                     '5 priced decking jobs in the firm\'s cost data, 2018–2026']),
]
SV1_HATCH = (   # material hatches, as a section drawing marks them: lap courses, glazing, shingle tabs, trim cross-hatch, door stiles, deck boards
    '<pattern id="sv1-h-siding" width="28" height="18" patternUnits="userSpaceOnUse"><path d="M0 17H28M0 14.5H28"/></pattern>'
    '<pattern id="sv1-h-windows" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)"><path d="M0 4H22M0 9H10"/></pattern>'
    '<pattern id="sv1-h-roof" width="36" height="20" patternUnits="userSpaceOnUse"><path d="M0 19H36M0 9H36M12 0V9M30 10V19"/></pattern>'
    '<pattern id="sv1-h-trim" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M0 12L12 0M0 0L12 12"/></pattern>'
    '<pattern id="sv1-h-doors" width="14" height="40" patternUnits="userSpaceOnUse"><path d="M3 0V40M7 0V40"/></pattern>'
    '<pattern id="sv1-h-deck" width="40" height="16" patternUnits="userSpaceOnUse"><path d="M0 15H40M0 13H40M20 0V13"/></pattern>')


def services1():
    """[BANK] Neil Kelly (configure the project before reading) + [BANK] 531 BLK (one inline SVG, the picked zone
    re-fills in the same frame, ease (0.645, 0.045, 0.355, 1)). The traced Rob Roy elevation; each part answers with
    what Austin Pro installs there, in the firm's own counts. No prices here: the trade bands live in Hero 2."""
    data = {}
    for part, label, trade, slug, facts in SV1:
        data[part] = dict(label=label, trade=trade, facts=facts, img=tphoto(slug) if slug else '', cap=tcap(slug) if slug else '')
    chips = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" data-part="{p}">{lab}</button>' for k, (p, lab, *_r) in enumerate(SV1))
    d0 = data['siding']
    li = ''.join(f'<li>{e(x)}</li>' for x in d0['facts'])
    draw = elevation.svg('sv1el', 'elev sv1-el', 'The Rob Roy house as a line drawing; each part of it opens the matching trade', hits=True).replace('<defs>', '<defs>' + SV1_HATCH, 1)
    js = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
    return f'''<div class="v services-1" data-tone="ground">
  <div class="sv1-head"><h2 class="h2x" data-split>What needs work?</h2><p class="sv1-sub">Point at a part of the house to see what Austin Pro puts there, counted from the firm's own job files.</p></div>
  <div class="sv1-grid">
    <figure class="sv1-fig" data-cur="view">{draw}<figcaption class="sv1-fc">Rob Roy, Austin, traced from the job photo</figcaption></figure>
    <div class="sv1-card" aria-live="polite">
      <div class="sv1-parts" role="radiogroup" aria-label="Part of the house">{chips}</div>
      <h3 class="sv1-t" data-s1="label">{d0['label']}</h3>
      <ul class="sv1-facts" data-s1="facts">{li}</ul>
      <figure class="sv1-ph"><img data-s1="img" src="{d0['img']}" width="800" height="600" alt="{e(d0['cap'])}" loading="lazy" decoding="async"><figcaption data-s1="cap">{e(d0['cap'])}</figcaption></figure>
      <div class="sv1-cta">{btn_book('btn btn-ink sv1-book', 'Book a siding inspection', d0['trade'])}<a class="tlink" href="{TEL}">Call {PHONE}</a></div>
    </div>
  </div>
  <script type="application/json" class="sv1-data">{js}</script>
</div>'''


IX_SYMS = '<symbol id="ixg-siding" viewBox="0 0 48 32"><path pathLength="1" d="M5 3V29M43 3V29"/><path pathLength="1" d="M5 8H43M5 14H43M5 20H43M5 26H43"/></symbol><symbol id="ixg-windows" viewBox="0 0 48 32"><path pathLength="1" d="M14 2H34V29H14ZM14 15.5H34M24 2V15.5M17 18H31V27H17Z"/><path pathLength="1" d="M10 30H38"/></symbol><symbol id="ixg-exterior-painting" viewBox="0 0 48 32"><path pathLength="1" d="M3 9H45M3 17H45M3 25H45"/><path pathLength="1" d="M28 3H44V9H28ZM36 9V14H26V26"/></symbol><symbol id="ixg-shingle-roofing" viewBox="0 0 48 32"><path pathLength="1" d="M2 6H46M2 14H46M2 22H46M2 30H46M10 6V14M26 6V14M42 6V14M18 14V22M34 14V22M10 22V30M26 22V30M42 22V30"/></symbol><symbol id="ixg-gutters" viewBox="0 0 48 32"><path pathLength="1" d="M3 8H38V15C38 18 36 19 33 19H3"/><path pathLength="1" d="M3 12H36M30 19V30H37V19"/></symbol><symbol id="ixg-doors" viewBox="0 0 48 32"><path pathLength="1" d="M14 2H34V30H14Z"/><path pathLength="1" d="M17 5H23V13H17ZM25 5H31V13H25ZM17 16H23V27H17ZM25 16H31V27H25Z"/></symbol><symbol id="ixg-patio-covers" viewBox="0 0 48 32"><path pathLength="1" d="M2 7L46 3M2 11L46 7M8 10V30M40 6V30M4 30H44"/><path pathLength="1" d="M14 9V12M20 8.5V11.5M26 8V11M32 7.5V10.5"/></symbol><symbol id="ixg-metal-roofing" viewBox="0 0 48 32"><path pathLength="1" d="M4 28L24 4L44 28Z"/><path pathLength="1" d="M12 28L28 9M18 28L31 12.5M24 28L34 16M30 28L37 19.5M36 28L40.5 23"/></symbol><symbol id="ixg-garage-doors" viewBox="0 0 48 32"><path pathLength="1" d="M6 30V6H42V30"/><path pathLength="1" d="M9 9H39V30M9 15H39M9 21H39M9 27H39"/></symbol><symbol id="ixg-decking" viewBox="0 0 48 32"><path pathLength="1" d="M2 26L14 14H46L34 26Z"/><path pathLength="1" d="M5 23H37M8 20H40M11 17H43M8 26V30M34 26V30"/></symbol><symbol id="ixg-storm" viewBox="0 0 48 32"><path pathLength="1" d="M3 30L24 14L45 30"/><circle pathLength="1" cx="12" cy="6" r="2"/><circle pathLength="1" cx="23" cy="4" r="2.4"/><circle pathLength="1" cx="35" cy="7" r="2"/><path pathLength="1" d="M14 11L12 14M26 10L24 13M37 12L35 15"/></symbol>'


def services2():
    """Q571 AHA: the numbered services index (11 rows, 01 OF 11 counter by CSS counters, intro column left)"""
    rows = ''
    for slug in TRADE_ORDER:
        t = TBY[slug]
        cnt = f"{t['doc']} jobs" if t['doc'] else f"{t['n']} priced"
        im = f' data-img="{tphoto(slug)}"' if slug in TRADE_PHOTO else ''
        th = f'<img class="ix-th" src="{tphoto(slug)}" width="800" height="600" alt="" loading="lazy" decoding="async">' if slug in TRADE_PHOTO else '<span class="ix-th ix-th-none" aria-hidden="true"></span>'
        rows += f'''<li><a class="ix-row" href="#book" data-book data-cur="view" data-trade="{e(t['name'])}"{im} aria-label="{e(t['name'])}: {cnt}, median job {med(t)}. Book an inspection">
      <svg class="ix-gl" aria-hidden="true" focusable="false"><use href="#ixg-{slug}"/></svg><span class="ix-name" data-chars>{e(t['name'])}</span><span class="ix-meta"><span>{cnt}</span><b>Median {med(t)}</b></span>{th}</a></li>'''
    rows += '''<li><a class="ix-row" href="#book" data-book data-cur="view" data-trade="Storm damage" aria-label="Storm damage: free inspection, documented for your insurer. Book an inspection">
      <svg class="ix-gl" aria-hidden="true" focusable="false"><use href="#ixg-storm"/></svg><span class="ix-name" data-chars>Storm damage</span><span class="ix-meta"><span>Hail and wind</span><b>Free inspection</b></span><span class="ix-th ix-th-none" aria-hidden="true"></span></a></li>'''
    return f'''<div class="v services-2" data-tone="ground">
  <div class="ix-head"><h2 class="h2x" data-split>Eleven trades, one inspection</h2><p>Job counts and median prices from the firm's own documented jobs, 2018-2026.</p>
    <p class="ix-count num" aria-hidden="true"><b data-ix-now>01</b><span>of 11</span></p><p class="ix-call">Pick a trade to book its free inspection, or call <a class="tlink" href="{TEL}">{PHONE}</a>.</p></div>
  <svg class="ix-defs" aria-hidden="true" focusable="false">{IX_SYMS}</svg>
  <ol class="ix">{rows}</ol>
  <div class="ix-peek" aria-hidden="true"><img alt="" width="800" height="600"></div>
</div>'''


def services3():
    rows = ''
    for slug in TRADE_ORDER:
        t = TBY[slug]
        lo, hi = t['lo'], t['hi']
        rows += f'''<li class="tm-t" data-lo="{lo}" data-hi="{hi}"><span class="tm-n">{e(t['name'])}</span><span class="tm-bar" style="--a:{lo / 50:.3f};--b:{hi / 50:.3f}" aria-hidden="true"><i></i></span><span class="tm-r num">{mid(t)}</span></li>'''
    ticks = ''.join(f'<i class="tk{" tk-m" if k % 5 == 0 else ""}" style="--k:{k}">{f"<b>${k}k</b>" if k % 5 == 0 else ""}</i>' for k in range(0, 51))
    return f'''<div class="v services-3" data-tone="ground2">
  <div class="tm-head"><h2 class="h2x" data-split>Pull the tape to your budget</h2>
    <p class="tm-say" aria-live="polite"><b class="num" data-tm-v>$15,000</b> <span data-tm-n>6 of 10 trades usually land here.</span></p></div>
  <div class="tape" role="slider" tabindex="0" data-cur="drag" aria-label="Budget, from $0 to $50,000" aria-valuemin="0" aria-valuemax="50000" aria-valuenow="15000" aria-valuetext="$15,000">
    <div class="tape-band"><div class="tape-strip" aria-hidden="true"><svg class="tape-hook" viewBox="0 0 30 96" focusable="false"><path class="th-tab" d="M30 4H8C5 4 4 5 4 8V88C4 91 5 92 8 92H30"/><path class="th-lip" d="M4 10V86"/><circle class="th-rv" cx="20" cy="30" r="2.6"/><circle class="th-rv" cx="20" cy="66" r="2.6"/></svg>{ticks}</div></div>
    <i class="tape-mark" aria-hidden="true"></i>
    <svg class="tape-case" viewBox="0 0 120 52" aria-hidden="true" focusable="false"><path class="tc-body" d="M10 4H104C111 4 116 9 116 16V40C116 45 112 48 107 48H14C8 48 4 44 4 38V10C4 7 7 4 10 4Z"/><rect class="tc-win" x="52" y="30" width="16" height="16" rx="2"/><path class="tc-lock" d="M20 14H44"/><circle class="tc-rv" cx="104" cy="16" r="3"/><circle class="tc-rv" cx="104" cy="36" r="3"/><path class="tc-mark" d="M60 30V48"/></svg>
  </div>
  <ul class="tm-list" aria-label="Middle half of each trade's priced jobs">{rows}</ul>
  <p class="fine">The bar is the middle half of each trade's individually priced jobs, materials and labour before discounts, excluding tax. Your price comes from the free inspection.</p>
</div>'''


# ---------- WORK ----------
def work1():
    p = PAIRS6[0]
    strip = ''.join(f'''<li><button class="fs" type="button" data-i="{k}" aria-pressed="{'true' if k == 0 else 'false'}"><img src="{H}work-{q['id']}-a-1000.webp" width="1000" height="625" alt="" loading="lazy" decoding="async"><span>{e(q['place'].split(',')[0])}</span><b>{q['band']}</b></button></li>''' for k, q in enumerate(PAIRS6))
    data = json.dumps([dict(id=q['id'], place=q['place'], when=q['when'], what=q['what'], band=q['band'], bl=q['bl'], href=q['href'], ab=q['ab'].replace('—', ','), aa=q['aa'].replace('—', ',')) for q in PAIRS6], ensure_ascii=False).replace('</', '<\\/')
    return f'''<div class="v work-1" data-tone="ground">
  <div class="w1-head"><h2 class="h2x" data-split>Before, after, and the price</h2><p class="w1-sub">Six of the 177 before-and-after pairs the firm publishes, each with its own price.</p></div>
  <figure class="cmp" data-cmp data-cur="drag" style="--split:50%">
    {pimg(p, 'a', 'cmp-a')}{pimg(p, 'b', 'cmp-b')}
    <span class="cmp-line" aria-hidden="true"><svg class="cmp-trim" viewBox="0 0 16 100" preserveAspectRatio="none" focusable="false"><rect class="ct-b" x="1" y="0" width="14" height="100"/><rect class="ct-s" x="11.5" y="0" width="3.5" height="100"/><path class="ct-g" d="M5 0C4 30 7 60 5 100M9 0C10 40 8 70 9.5 100"/></svg><svg class="cmp-nails" focusable="false">{''.join(f'<circle cx="8" cy="{y}%" r="2.2"/>' for y in (8, 24, 40, 60, 76, 92))}</svg></span>
    <button class="cmp-handle" type="button" role="slider" aria-label="Before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="Half before, half after"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg><svg class="cmp-lev" viewBox="0 0 44 12" aria-hidden="true" focusable="false"><rect class="cl-b" x="1" y="1" width="42" height="10" rx="3"/><rect class="cl-v" x="14" y="2.5" width="16" height="7" rx="3.5"/><path class="cl-m" d="M19 2.5V9.5M25 2.5V9.5"/><circle class="cl-bub" cx="22" cy="6" r="2.4"/></svg></button>
    <span class="ptag ptag-b" aria-hidden="true">Before</span><span class="ptag ptag-a" aria-hidden="true">After</span>
    <i class="pane pane-tl"></i><i class="pane pane-tr"></i><i class="pane pane-bl"></i><i class="pane pane-br"></i>
  </figure>
  <div class="cmp-info" aria-live="polite"><p class="cmp-price num">{p['band']}</p><p class="cmp-what"><b>{e(p['bl'])}, {e(p['place'])}</b><span>{e(p['what'])}, {e(p['when'])}. <a class="tlink" href="{p['href']}" target="_blank" rel="noopener">Job file</a></span></p></div>
  <ul class="fstrip" aria-label="Choose a job">{strip}</ul>
  <script type="application/json" class="pairs-data">{data}</script>
</div>'''


def work2():
    """S0468 blueprint animation: scan line, swap only under the blueprint, fades of 0.3 s or more; visitor-run (F17)"""
    steps = ''
    for k, q in enumerate(PAIRS6):
        steps += f'''<li><button class="bp-step" type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" data-k="{k}" tabindex="{0 if k == 0 else -1}"><span class="num">0{k + 1}</span>{e(q['place'].split(',')[0])}</button></li>'''
    data = json.dumps([dict(id=q['id'], place=q['place'], when=q['when'], what=q['what'], band=q['band'], bl=q['bl'], ab=q['ab'].replace('—', ','), aa=q['aa'].replace('—', ',')) for q in PAIRS6], ensure_ascii=False).replace('</', '<\\/')
    p = PAIRS6[0]
    return f'''<div class="v work-2" data-tone="ground">
  <div class="bp-head"><h2 class="h2x" data-split>Survey, draw, rebuild</h2><p class="bp-sub">The old house, a drawing traced from the finished photo, then the finished wall.</p></div>
  <figure class="bp-fig" data-cur="view">
    <img class="bp-b" src="{H}work-{p['id']}-b-1000.webp" width="1000" height="625" alt="{alt(p['ab'])}" loading="lazy" decoding="async">
    <img class="bp-p" src="{H}bp-{p['id']}-1000.webp" width="1000" height="625" alt="" loading="lazy" decoding="async">
    <img class="bp-a" src="{H}work-{p['id']}-a-1000.webp" width="1000" height="625" alt="{alt(p['aa'])}" loading="lazy" decoding="async">
    <i class="bp-scan" aria-hidden="true"></i>
    <p class="bp-dim" aria-hidden="true"><span data-bp-dim>{e(p['bl']).upper()} · {p['band'].upper()}</span></p>
    <button class="bp-run btn btn-glass btn-sm" type="button">Run the survey</button>
  </figure>
  <div class="bp-band" aria-live="polite"><p class="bp-k num" data-bp-k>01</p><p class="bp-name" data-bp-name>{e(p['place'])}</p><p class="bp-fix" data-bp-fix>{e(p['what'])}, {e(p['when'])}. {e(p['bl'])} {p['band']}.</p></div>
  <ol class="bp-steps" role="radiogroup" aria-label="Choose a job">{steps}</ol>
  <script type="application/json" class="pairs-data">{data}</script>
</div>'''


def work3():
    tiles = ''.join(f'''<li class="sp sp-{k}">
      <figure class="sp-fig" data-spot data-cur="view" data-cur-label="Before">{pimg(q, 'a', 'sp-a')}{pimg(q, 'b', 'sp-b')}<svg class="sp-win" viewBox="0 0 100 100" aria-hidden="true" focusable="false"><rect class="sw-f" x="2" y="2" width="96" height="96"/><path class="sw-m" d="M50 2V98M2 50H98"/><path class="sw-gl" d="M12 40L40 12M18 46L46 18"/></svg>
        <button class="sp-toggle btn btn-glass btn-sm" type="button" aria-pressed="false">Show before</button></figure>
      <p class="sp-cap"><b>{e(q['place'])}</b><span>{e(q['bl'])} {q['band']}, {e(q['when'])}</span></p>
    </li>''' for k, q in enumerate(PAIRS6))
    return f'''<div class="v work-3" data-tone="ground">
  <div class="sp-head"><h2 class="h2x" data-split>Look through to the before</h2><p class="sp-hint" data-fine-only>Move over a photo. The lens shows the same wall before the job.</p></div>
  <ul class="spots">{tiles}</ul>
</div>'''



# ---------- BUILT TO SPEC ----------
LEGEND = [('trim', 'Corner trim'), ('siding', 'HardiePlank lap'), ('wrap', 'House wrap'), ('sheath', 'Sheathing'), ('studs', 'Framing')]
READ = {'trim': 'Corner trim: where the courses stop',
        'siding': 'HardiePlank lap: 8.25 in board, 7 in exposure, 1.25 in lap, 5/16 in thick',
        'wrap': 'House wrap: the water line behind the boards',
        'sheath': 'Sheathing: what rot reaches first under old siding',
        'studs': 'Framing: what the whole wall hangs on'}


def built1():
    btns = ''.join(f'<li><button type="button" class="lg-b" data-asm="{k}" aria-pressed="false"><span class="num">0{i + 1}</span>{n}</button></li>' for i, (k, n) in enumerate(LEGEND))
    data = json.dumps(READ).replace('</', '<\\/')
    return f'''<div class="v built-1 has-bgf" data-tone="ground">
  <div class="bgf" aria-hidden="true"><div class="grid3" data-depth="-0.5"></div></div>
  <div class="b1-grid">
    <div class="b1x-side">
      <h2 class="h2x" data-split>The wall, taken apart</h2>
      <p class="b1x-sub">James Hardie lap, installed by an Elite Preferred crew. 301 of 415 priced siding jobs used this 8.25 in board.</p>
      <ol class="legend" aria-label="Layers of the wall">{btns}</ol>
      <div class="b1x-act"><button class="btn btn-ink btn-sm" type="button" data-explode aria-pressed="false">Take it apart</button></div>
    </div>
    <figure class="b1x-fig card-fig" data-cur="view">
      <p class="fig-n" aria-hidden="true">Fig 1</p><p class="fig-t" aria-hidden="true">Corner of wall</p>
      {iso.wall_assembly('isowall')}
      <p class="fig-r num" aria-live="polite" data-readout>Assembled · 5 layers</p>
    </figure>
  </div>
  <script type="application/json" class="b1x-data">{data}</script>
</div>'''


TEXAS = [('Doesn\'t warp', 'Sun and heat', 3), ('Doesn\'t rot', 'Moisture', 28), ('Doesn\'t burn', 'Noncombustible', 5),
         ('Doesn\'t feed termites', 'Termites', 0), ('Lasts decades', '30-year warranty', 33)]


TX_DIAG = [   # one test diagram per published property (PLAN B2), 160 x 90; the board is the lap board in section
    '<circle class="tx-sun" cx="30" cy="22" r="10"/><path class="tx-ray" d="M30 4V8M30 36V40M12 22H16M44 22H48M17 9L20 12M40 32L43 35M17 35L20 32M40 12L43 9"/><path class="tx-ghost" d="M60 64C90 54 120 74 152 62"/><rect class="tx-board" x="60" y="58" width="92" height="12"/><path class="tx-lvl" d="M60 52H152"/>',
    '<rect class="tx-board" x="14" y="40" width="132" height="12"/><path class="tx-drop" d="M40 18C40 18 34 26 34 30A6 6 0 0 0 46 30C46 26 40 18 40 18ZM80 10C80 10 74 18 74 22A6 6 0 0 0 86 22C86 18 80 10 80 10ZM118 20C118 20 112 28 112 32A6 6 0 0 0 124 32C124 28 118 20 118 20Z"/><path class="tx-run" d="M146 52V70M150 58V78"/>',
    '<rect class="tx-board" x="70" y="30" width="16" height="52"/><path class="tx-flame" d="M40 82C24 82 18 68 26 56C28 64 32 64 32 64C30 50 40 40 44 30C46 42 56 46 56 60C58 56 60 54 60 54C66 66 60 82 40 82Z"/><path class="tx-stop" d="M64 28V84"/>',
    '<rect class="tx-board" x="110" y="20" width="14" height="62"/><path class="tx-trail" d="M8 70C20 60 30 76 42 64S62 52 74 62S92 70 102 56"/><path class="tx-stop" d="M104 46L104 66M98 50L110 62M110 50L98 62"/><circle class="tx-bug" cx="102" cy="56" r="3.2"/>',
    '<path class="tx-rule" d="M10 40H150V60H10Z"/><path class="tx-tick" d="' + ''.join(f'M{10 + i * 140 / 30:.1f} 40V{48 if i % 5 else 54}' for i in range(31)) + '"/><text class="tx-lab" x="10" y="76">0</text><text class="tx-lab" x="80" y="76">15</text><text class="tx-lab" x="150" y="76">30 yr</text>'
]


def built2():
    """S1322 sticky stack cards (CROWN) = builder-brief R45 (CSS sticky core, never a GSAP pin): the published
    Built-for-Texas five, one card each with a real job photo, closed by the warranty pair"""
    cards = ''
    for k, (t, tag, i) in enumerate(TEXAS):
        ph = PHOTOS[i]
        cards += f'''<li class="ts-card">
      <figure class="ts-fig"><img src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="{alt(ph['alt'])}" loading="lazy" decoding="async"><figcaption>{e(ph['place'])}, {e(ph['when'])}</figcaption></figure>
      <div class="ts-txt"><p class="ts-n num">0{k + 1}<span> of 05</span></p><h3 class="ts-h">{e(t)}</h3><p class="ts-tag">{e(tag)}</p>
        <svg class="tx-d" viewBox="0 0 160 90" aria-hidden="true" focusable="false">{TX_DIAG[k].replace('<path ', '<path pathLength="1" ')}</svg></div>
    </li>'''
    cards += '''<li class="ts-card ts-end">
      <div class="ts-txt"><p class="ts-n">The warranty pair</p>
        <p class="ts-w"><b class="num">30</b><span>year non-prorated James Hardie siding warranty, when an Elite Preferred contractor installs</span></p>
        <p class="ts-w"><b>Lifetime</b><span>Austin Pro workmanship warranty on the labour</span></p>
        <p class="ts-fine">Whole walls or the whole house, never patches. 1 to 2 weeks on site, paint included.</p></div>
    </li>'''
    return f'''<div class="v built-2" data-tone="ground2">
  <div class="ts-head"><h2 class="h2x" data-split>Built for Texas</h2>
    <p>Every priced siding job is James Hardie fiber cement. What the board stands up to here, as the firm publishes it, on its own jobs.</p></div>
  <ol class="ts">{cards}</ol>
</div>'''


SPEC = [('L1', 'Board', '8.25 in', 'lap'), ('X1', 'Exposure', '7 in', 'lap'), ('O1', 'Lap = L1 - X1', '1.25 in', 'lap'), ('T1', 'Thickness', '5/16 in', 'lap'),
        ('N1', 'Board length', '12 ft', 'lap'), ('P1', 'Panel', '4 ft', 'bb'), ('B1', 'Batten', '2.5 in', 'bb'), ('C1', 'Batten spacing', '16 in o.c.', 'bb')]


def built3():
    rows = ''.join(f'<li class="spec-r" data-code="{c}" data-set="{st}" tabindex="0"{" hidden" if st == "bb" else ""}><span class="num">{c}</span><span>{n}</span><b class="num">{v}</b></li>' for c, n, v, st in SPEC)
    return f'''<div class="v built-3 has-bgf" data-tone="ground">
  <div class="bgf" aria-hidden="true"><div class="grid3 grid3-p" data-depth="-0.4"></div></div>
  <div class="b3x-head"><h2 class="h2x" data-split>Lap or batten, to the inch</h2>
    <div class="seg b3x-seg" role="radiogroup" aria-label="Siding style"><button type="button" role="radio" aria-checked="true" data-style="lap">Lap · 301 of 415 jobs</button><button type="button" role="radio" aria-checked="false" data-style="bb">Board and batten · 27</button></div></div>
  <div class="b3x-grid">
    <figure class="b3x-sheet"><p class="tb num" aria-hidden="true"><span>DWG APS-S1</span><span>REV 03</span><span>UNITS IN</span><span>SOURCE austinprosiding.com</span></p>{sheet.svg()}</figure>
    <div class="b3x-spec"><p class="tb num" aria-hidden="true"><span>VARIABLES</span></p><ul class="spec" aria-label="Published dimensions">{rows}</ul>
      <p class="fine">Every value is the one the firm publishes for James Hardie siding. Thicknesses it does not publish stay [TBD].</p></div>
  </div>
</div>'''

# ---------- COLOUR ----------
def zones():
    out = ''
    for z, sh in (('body', 'body'), ('gable', 'body'), ('trim', 'trim')):
        out += (f'<div class="zone zone-{z}" data-zone="{z}"><span class="paint p0"></span><span class="paint p1"></span>'
                f'<img class="shade" src="assets/img/studio/shade-{sh}-1400.webp" width="1400" height="875" alt="" loading="lazy" decoding="async"></div>')
    return out


def studio_frame(extra=''):
    return f'''<div class="st-frame" data-studio>
      <img class="st-base" src="assets/img/studio/base-1400.webp" width="1400" height="875" alt="The Rob Roy house after its James Hardie siding job, repainted in the colours you choose" loading="lazy" decoding="async">
      {zones()}{extra}
    </div>'''


LEVERS = ['Wall area and how many stories', "What's under the old siding (rot, sheathing)", 'The whole house or a few walls',
          'Trim, soffit and fascia', 'Paint or ColorPlus', 'Profile and details']   # the six levers the firm's cost guide names


def c1_chips():
    """all 29 published colours in one radio group, Sherwin-Williams then ColorPlus"""
    def chip(n, c, h):
        return (f'<button class="sw" type="button" role="radio" aria-checked="false" data-hex="{h}" data-name="{e(n)}" data-code="{e(c)}" '
                f'style="--c:{h}" aria-label="{e(n)}, {e(c)}"><i aria-hidden="true"></i></button>')
    sw = ''.join(chip(n, c, h) for n, c, h in SW)
    cp = ''.join(chip(n, 'James Hardie ColorPlus', h) for n, _c, h in COLORPLUS)
    return (f'<div class="c1t-chips" role="radiogroup" aria-label="Published colours">'
            f'<div class="c1t-set" role="group" aria-label="Sherwin-Williams, painted on site"><p class="c1t-sl" aria-hidden="true">Sherwin-Williams, painted on site</p><div class="c1t-row">{sw}</div></div>'
            f'<div class="c1t-set" role="group" aria-label="ColorPlus, baked on"><p class="c1t-sl" aria-hidden="true">James Hardie ColorPlus, baked on</p><div class="c1t-row">{cp}</div></div></div>')


def colour1():
    """portfolio-site-plan Site 6 FLAGSHIP (instant pricing + visualisation in ONE flow, R36 + R24 fused) + [BANK] 531
    BLK (zones re-fill in the same frame) + builder brief R36 colour customiser. See your house in a published colour,
    then the published band, before any contact capture. Default: the firm's own job photo with its traced zones.
    "Use my photo": a local file that never leaves the device, brushed where the wall is."""
    t = TBY['siding']
    lev = ''.join(f'<li>{e(x)}</li>' for x in LEVERS)
    return f'''<div class="v colour-1" data-tone="ground">
  <div class="c1t-head"><h2 class="h2x" data-split>Try it on your house</h2>
    <p class="c1t-now" aria-live="polite"><b data-c1="name">The finished Rob Roy job.</b> <span data-c1="code">Pick a part, then a colour.</span></p></div>
  <div class="c1t-grid">
    <div class="c1t-stage">
      <div class="c1t-src seg" role="radiogroup" aria-label="Photo"><button type="button" role="radio" aria-checked="true" data-src="job">Our job photo</button><button type="button" role="radio" aria-checked="false" data-src="mine">My house</button></div>
      <div class="c1t-view" data-view="job">{studio_frame()}
        <div class="c1t-mine" hidden>
          <canvas class="c1t-cv" hidden aria-label="Your photo with the colour brushed on" role="img"></canvas>
          <div class="c1t-empty"><svg class="c1t-house" viewBox="0 0 120 80" aria-hidden="true" focusable="false"><path d="M8 40L60 8L112 40M18 34V74H102V34"/><path class="c1t-lap" d="M18 44H102M18 52H102M18 60H102M18 68H102"/><path d="M30 46H46V64H30ZM74 46H90V64H74ZM54 52H66V74H54Z"/></svg>
            <label class="btn btn-ink c1t-pick">Choose a photo of your house<input class="c1t-file sr-only" type="file" accept="image/*"></label>
            <p>Front-on and in daylight works best. Your photo stays on this device; nothing is uploaded.</p></div>
        </div>
      </div>
      <div class="c1t-tools">
        <div class="seg c1t-parts" role="radiogroup" aria-label="Part of the house"><button type="button" role="radio" aria-checked="true" data-part="body">Siding</button><button type="button" role="radio" aria-checked="false" data-part="gable">Gable</button><button type="button" role="radio" aria-checked="false" data-part="trim">Trim</button></div>
        <div class="c1t-brush" hidden><p class="c1t-tip">Brush over the walls with a finger or the mouse.</p><button class="tlink" type="button" data-c1="all">Tint the whole photo</button><button class="tlink" type="button" data-c1="clear">Clear the brush</button><button class="tlink" type="button" data-c1="other">Another photo</button></div>
        {c1_chips()}
      </div>
    </div>
    <aside class="c1t-ans" aria-label="What siding costs">
      <p class="c1t-k">Then, what it costs</p>
      <p class="c1t-med"><span>Median Austin Pro siding job, from {t['n']} priced jobs</span><b class="num">{med(t)}</b></p>
      <p class="c1t-mid">Half of them landed between ${t['lo']}k and ${t['hi']}k, materials and labour, before discounts and tax.</p>
      <p class="c1t-lk">Six things move the price</p>
      <ol class="c1t-lev">{lev}</ol>
      <div class="c1t-cta">{btn_book('btn btn-red c1t-book', 'Book a free siding inspection', 'Siding')}<a class="tlink" href="{TEL}">Call {PHONE}</a></div>
    </aside>
  </div>
  <p class="fine">A colour preview using colours the firm publishes. Real paint reads differently in Texas sun; the inspection brings physical samples.</p>
</div>'''


def ink_on(h):
    """text colour that reads on a swatch (relative luminance)"""
    r, g, b_ = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))
    return '#161616' if 0.2126 * r + 0.7152 * g + 0.0722 * b_ > 0.5 else '#FFFFFF'


def colour2():
    """builder-brief R30 comparison table (Other vs Us, JS 0; Stronghold's live comparison block) adapted to the firm's
    two published finish systems; each column carries its own published swatches"""
    sw = ''.join(f'<button class="cmp-sw" type="button" aria-pressed="false" data-hex="{h}" data-ink="{ink_on(h)}" data-name="{e(n)}" data-code="{e(c)}" style="--c:{h}" aria-label="{e(n)}, {e(c)}"></button>' for n, c, h in SW)
    cp = ''.join(f'<button class="cmp-sw" type="button" aria-pressed="false" data-hex="{h}" data-ink="{ink_on(h)}" data-name="{e(n)}" data-code="ColorPlus" style="--c:{h}" aria-label="{e(n)}, James Hardie ColorPlus"></button>' for n, c, h in COLORPLUS)
    rows = [('How it is finished', 'Painted on site, after the boards go up', 'Baked on at the factory'),
            ('Colours', '1,700+ Sherwin-Williams colours', '17 colours for Austin'),
            ('Matching', 'Free colour matching', '-'),
            ('Trim', '-', 'Arctic White trim'),
            ('Finish life', '-', '15+ years, as the firm publishes it'),
            ('On Austin Pro jobs', 'The usual finish. Painting was part of 297 of 415 priced siding jobs', '-')]
    body = ''.join(f'<tr><th scope="row">{k}</th><td>{x}</td><td>{y}</td></tr>' for k, x, y in rows)
    n0, c0, h0 = SW[10]
    n1, c1, h1 = COLORPLUS[11]
    return f'''<div class="v colour-2" data-tone="ground2">
  <div class="cmp-head"><h2 class="h2x" data-split>Paint on site, or ColorPlus</h2>
    <p>Every Hardie board gets one of two finishes. Here they are side by side, from what the firm publishes. Paint or ColorPlus is one of the six things that move the price.</p></div>
  <table class="cmp">
    <caption class="sr-only">Painted on site compared with James Hardie ColorPlus</caption>
    <thead><tr><td></td>
      <th scope="col" class="cmp-col" style="--c:{h0};--ink:{ink_on(h0)}"><svg class="c2-d" viewBox="0 0 200 64" aria-hidden="true" focusable="false"><g class="c2-boards"><rect class="c2-b" x="4" y="6" width="150" height="16"/><rect class="c2-b" x="4" y="24" width="150" height="16"/><rect class="c2-b c2-wet" x="4" y="42" width="96" height="16"/><rect class="c2-raw" x="100" y="42" width="54" height="16"/><path class="c2-sh" d="M4 21H154M4 39H154M4 57H154"/></g><g class="c2-tool"><path class="c2-h" d="M100 40V62H128"/><rect class="c2-roll" x="94" y="32" width="12" height="28" rx="5"/></g></svg><span class="cmp-sys">Painted on site</span><span class="cmp-now"><b data-now>{e(n0)}</b><span data-code>{e(c0)}</span></span></th>
      <th scope="col" class="cmp-col" style="--c:{h1};--ink:{ink_on(h1)}"><svg class="c2-d" viewBox="0 0 200 64" aria-hidden="true" focusable="false"><path class="c2-belt" d="M4 52H196"/><circle class="c2-wh" cx="20" cy="56" r="4"/><circle class="c2-wh" cx="100" cy="56" r="4"/><circle class="c2-wh" cx="180" cy="56" r="4"/><g class="c2-board"><rect class="c2-b" x="10" y="38" width="64" height="12"/><path class="c2-sh" d="M10 49H74"/></g><path class="c2-oven" d="M86 52V12H156V52"/><path class="c2-coil" d="M94 20L102 26L110 20L118 26L126 20L134 26L142 20L150 26"/><path class="c2-door" d="M86 30H90M152 30H156"/></svg><span class="cmp-sys">James Hardie ColorPlus</span><span class="cmp-now"><b data-now>{e(n1)}</b><span data-code>ColorPlus</span></span></th></tr>
      <tr class="cmp-sws"><td></td><td><div class="cmp-set" role="group" aria-label="Twelve published Sherwin-Williams colours">{sw}</div></td><td><div class="cmp-set" role="group" aria-label="Seventeen ColorPlus colours for Austin">{cp}</div></td></tr></thead>
    <tbody>{body}</tbody>
  </table>
  <p class="fine">Swatches use the colour values the firm publishes. A dash means the firm publishes nothing on that point.</p>
</div>'''


def colour3():
    """[BANK] Grid-to-Fullscreen (Codrops) = builder-brief R10 DOM port: bounds measured at click, the tile grows to
    fill the stage, close reverses; phones get fade and scale"""
    tiles = ''
    for n, c, h in SW + COLORPLUS:
        sysn = 'Sherwin-Williams' if c != 'ColorPlus' else 'James Hardie ColorPlus'
        code = c if c != 'ColorPlus' else 'ColorPlus'
        tiles += (f'<li><button class="cb-t" type="button" data-hex="{h}" data-ink="{ink_on(h)}" data-name="{e(n)}" data-code="{e(code)}" data-sys="{e(sysn)}" '
                  f'style="--c:{h};--ink:{ink_on(h)}" aria-label="{e(n)}, {e(code)}. Open"><svg class="cb-ph" viewBox="0 0 24 12" aria-hidden="true" focusable="false"><circle cx="12" cy="6" r="3.6"/><path d="M0 11.5H24"/></svg><span class="cb-n">{e(n)}</span><span class="cb-c">{e(code)}</span></button></li>')
    return f'''<div class="v colour-3" data-tone="night">
  <div class="cb-head"><h2 class="h2x" data-split>The colour book</h2>
    <p>All 29 colours the firm publishes for Hardie siding: twelve Sherwin-Williams paints and the seventeen ColorPlus colours for Austin. Open one to see it big.</p></div>
  <div class="cb-stage">
    <ul class="cb-grid">{tiles}</ul>
    <div class="cb-sheet" role="dialog" aria-modal="false" aria-labelledby="cb-name" tabindex="-1" hidden>
      <p class="cb-sys" data-cb-sys></p>
      <h3 class="cb-big" id="cb-name" data-cb-name></h3>
      <p class="cb-meta num"><span data-cb-code></span><span data-cb-hex></span></p>
      <p class="cb-note" data-cb-note></p>
      <svg class="cb-lap" viewBox="0 0 400 156" preserveAspectRatio="none" aria-hidden="true" focusable="false"><g class="cbl" transform="translate(0 0)"><rect class="cbl-f" width="400" height="52"/><rect class="cbl-hi" width="400" height="2"/><rect class="cbl-sh" y="44" width="400" height="8"/><path class="cbl-g" d="M0 18C90 14 180 22 270 17S370 20 400 18M0 32C120 28 220 36 320 30S390 33 400 31"/></g><g class="cbl" transform="translate(0 52)"><rect class="cbl-f" width="400" height="52"/><rect class="cbl-hi" width="400" height="2"/><rect class="cbl-sh" y="44" width="400" height="8"/><path class="cbl-g" d="M0 18C90 14 180 22 270 17S370 20 400 18M0 32C120 28 220 36 320 30S390 33 400 31"/></g><g class="cbl" transform="translate(0 104)"><rect class="cbl-f" width="400" height="52"/><rect class="cbl-hi" width="400" height="2"/><rect class="cbl-sh" y="44" width="400" height="8"/><path class="cbl-g" d="M0 18C90 14 180 22 270 17S370 20 400 18M0 32C120 28 220 36 320 30S390 33 400 31"/></g></svg>
      <button class="btn btn-glass cb-close" type="button">Back to all 29</button>
    </div>
  </div>
</div>'''


# ---------- NEAR YOU ----------
def finder(pref, label='Your neighbourhood or town', big=False):
    return f'''<div class="fd{' fd-big' if big else ''}" data-finder>
      <label class="fd-label" for="{pref}-in">{label}</label>
      <div class="fd-box"><input id="{pref}-in" type="text" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="{pref}-list" placeholder="Try Round Rock or Milwood…"><button class="fd-clear" type="button" aria-label="Clear" hidden>&times;</button></div>
      <ul class="fd-list" id="{pref}-list" role="listbox" aria-label="Places in the project file" hidden></ul>
      <div class="fd-try"><span>Try</span><button type="button" data-try="Round Rock">Round Rock</button><button type="button" data-try="Cedar Park">Cedar Park</button><button type="button" data-try="Milwood, Austin">Milwood</button></div>
      <div class="fd-out" aria-live="polite"></div>
    </div>'''


def near1():
    return f'''<div class="v near-1" data-tone="night">
  <div class="n1-grid">
    <div class="n1-side">
      <h2 class="h2x" data-split>Austin, job by job</h2>
      <p class="n1-count"><span class="num" data-count>312</span> <span data-when>jobs, Mar 2022 to Sep 2026</span></p>
      <p class="n1-note">Each dot is a photographed job, placed near the home, never on it. 574 more are documented outside this frame or without photos.</p>
      {finder('n1')}
    </div>
    <figure class="n1-map" data-cur="map">{map_svg()}<canvas class="n1-trail" aria-hidden="true"></canvas><div class="m-tip" hidden></div></figure>
  </div>
</div>'''


# per-town figures as the firm publishes them (FACTS: siding and windows cost guides, by city; Round Rock page)
TOWN_FACTS = {
    'Austin': dict(sid=(279, '$15k-$20k'), win=(248, '$10k-$15k')),
    'Round Rock': dict(sid=(56, '$10k-$15k'), win=(39, None), note='Round Rock page: 1990s to 2000s builder-grade windows and vinyl now at the end of their service life; the Williamson County hail corridor; 300+ sun days a year. Neighbourhoods named there: Teravista, Forest Creek, Mayfield Ranch, Stone Canyon, Paloma Lake, Brushy Creek, Round Rock West and Old Town.'),
    'Cedar Park': dict(sid=(16, '$10k-$15k'), win=(15, '$15k-$20k')),
    'Pflugerville': dict(sid=(14, '$5k-$10k'), win=(12, None)),
    'Leander': dict(sid=(9, '$10k-$15k'), win=(9, None)),
    'Georgetown': dict(sid=None, win=(7, None)),
    'Buda': dict(sid=(6, '$15k-$20k'), win=None),
}


def town_of(place):
    return place.split(',')[-1].strip()


def near2():
    """West Shore Home location x service matrix (STRONG): towns as rows carrying their own published figures, never
    city-swap; each row opens (accordion .2-.28 s) to that town's photographed jobs and any local notes"""
    docs = {n: c for n, x, y, c in TOWNS}
    rows = ''
    for k, (town, f) in enumerate(TOWN_FACTS.items()):
        def cell(v, lab):
            if not v:
                return f'<span class="mx-c"><span class="sr-only">{lab}: </span><span class="mx-none">-</span></span>'
            n, m = v
            return f'<span class="mx-c"><span class="sr-only">{lab}: </span><b class="num">{n}</b> priced{f"<span class=\"mx-m\">median {m}</span>" if m else ""}</span>'
        ph = [i for i, p in enumerate(PHOTOS) if town_of(p['place']) == town][:3]
        pics = ''.join(f'<li><img src="{H}t/p{i}-320.webp" width="320" height="240" alt="{alt(PHOTOS[i]["alt"])}" loading="lazy" decoding="async"><span>{e(PHOTOS[i]["place"])}, {e(PHOTOS[i]["when"])}</span></li>' for i in ph)
        note = f'<p class="mx-note">{e(f["note"])}</p>' if f.get('note') else ''
        nh = max(1, round(docs.get(town, 0) / 10)) if isinstance(docs.get(town), int) else 0
        sky = ''.join(f'<path d="M{i * 12} 30V{18 - (i * 7) % 5}L{i * 12 + 5} {13 - (i * 7) % 5}L{i * 12 + 10} {18 - (i * 7) % 5}V30Z"/>' for i in range(nh))
        sky_svg = f'<div class="mx-sky"><svg viewBox="0 0 {max(nh * 12, 12)} 30" width="{max(nh * 12, 12)}" height="30" aria-hidden="true" focusable="false">{sky}</svg><span>{nh} {"house" if nh == 1 else "houses"}, one per ten documented jobs</span></div>' if nh else ''
        rows += f'''<li class="mx-r">
      <button class="mx-row" type="button" aria-expanded="false" aria-controls="mx-{k}">
        <span class="mx-t">{e(town)}</span><span class="mx-c mx-d"><span class="sr-only">Documented jobs in the project finder: </span><b class="num">{docs.get(town, '-')}</b></span>
        {cell(f.get('sid'), 'Siding')}{cell(f.get('win'), 'Windows')}<i class="mx-x" aria-hidden="true"></i></button>
      <div class="mx-more" id="mx-{k}" inert><div class="mx-in">{sky_svg}{note}{f'<ul class="mx-pics">{pics}</ul>' if pics else '<p class="mx-note">No photographed jobs from here published yet.</p>'}
        <a class="tlink" href="#book" data-book>Book a free inspection in {e(town)}</a> <span class="mx-or">or call <a class="tlink" href="{TEL}">{PHONE}</a></span></div></div>
    </li>'''
    return f'''<div class="v near-2" data-tone="ground">
  <div class="mx-head"><h2 class="h2x" data-split>Town by town</h2>
    <p>Each town's own numbers: documented jobs in the firm's project finder, and the priced siding and window jobs from its cost guides, with the median band where it is published.</p></div>
  <div class="mx" role="presentation">
    <div class="mx-h" aria-hidden="true"><span>Town</span><span>Documented jobs</span><span>Siding</span><span>Windows</span></div>
    <ol class="mx-list" aria-label="Towns">{rows}</ol>
  </div>
</div>'''


DRIVE = ['Austin', 'Cedar Park', 'Pflugerville', 'Round Rock', 'Georgetown']


def near3():
    """KBF Design Gallery (CROWN): The Neighborhood Drive. Pick a place, the job map flies in to it, and you browse only
    the jobs photographed there"""
    docs = {n: (x, y, c) for n, x, y, c in TOWNS}
    data, chips = {}, ''
    for k, town in enumerate(DRIVE):
        ph = [i for i, p in enumerate(PHOTOS) if town_of(p['place']) == town]
        x, y, c = docs[town] if town != 'Austin' else (NEAR['hq'][0], NEAR['hq'][1], docs['Austin'][2])
        ci = CITIES.index(town)
        data[town] = dict(x=x, y=y, doc=c, ci=ci, n=len(ph), p=[dict(src=f'{H}t/p{i}-320.webp', alt=alt(PHOTOS[i]['alt']), place=PHOTOS[i]['place'], when=PHOTOS[i]['when'], trades=PHOTOS[i]['trades']) for i in ph[:8]])
        chips += f'<button type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" tabindex="{0 if k == 0 else -1}" class="dv-chip" data-town="{e(town)}"><b>{e(town)}</b><span class="num">{len(ph)} photographed</span></button>'
    a0 = data['Austin']
    cards = ''.join(f'<li class="dv-card"><img src="{q["src"]}" width="320" height="240" alt="{q["alt"]}" loading="lazy" decoding="async"><p><b>{e(q["place"])}</b><span>{e(q["when"])}. {e(q["trades"])}</span></p></li>' for q in a0['p'])
    js = json.dumps(data).replace('</', '<\\/')
    return f'''<div class="v near-3" data-tone="ground2">
  <div class="dv-head"><h2 class="h2x" data-split>The neighbourhood drive</h2>
    <p>Pick a place. The map flies in, and you see only the jobs photographed there.</p></div>
  <div class="dv-chips" role="radiogroup" aria-label="Choose a place">{chips}</div>
  <div class="dv-stage">
    <figure class="dv-map" data-cur="map">{map_svg('map-svg map-light dv-svg')}<figcaption class="dv-cap num" aria-live="polite" data-dv-cap>Austin: {a0['doc']} documented jobs</figcaption></figure>
    <div class="dv-chapter"><p class="dv-k" data-dv-k>{a0['n']} photographed jobs in Austin{f", the latest {len(a0['p'])}" if a0['n'] > len(a0['p']) else ""}</p>
      <ol class="dv-rail" data-dv-rail>{cards}</ol></div>
  </div>
  <script type="application/json" class="dv-data">{js}</script>
</div>'''


# ---------- REVIEWS ----------
def at_name(text, n):
    """Excerpt that starts at the sentence naming a crew member, so the name is always in view."""
    hits = [m.start() for _, rx in CREW for m in [re.search(rx, text)] if m]
    if not hits or min(hits) + 20 < n:
        return cut(text, n)
    k = min(hits)
    starts = [m.end() for m in re.finditer(r'[.!?]\s+', text[:k])]
    a = starts[-1] if starts else 0
    return ('…' if a else '') + cut(text[a:], n)


SOURCE = 'Google, 2026'   # where and when each excerpt was posted, as the firm publishes it (no number beside "review")


def stars():
    s = '<path d="M10 1.6l2.47 5.3 5.8.62-4.32 3.93 1.2 5.7L10 14.3l-5.15 2.85 1.2-5.7L1.73 7.52l5.8-.62z"/>'
    return '<span class="stars" aria-hidden="true">' + ''.join(f'<svg viewBox="0 0 20 20">{s}</svg>' for _ in range(5)) + '</span>'


def shake(k):
    """one cedar shake, drawn: the butt edge is ragged and different on every shake, grain runs down, two nails up top"""
    import random
    rnd = random.Random(k * 7 + 3)
    xs = list(range(0, 301, 25))
    butt = ''.join(f'L{x} {204 + rnd.randint(-7, 9)}' for x in reversed(xs))
    grain = ''.join(f'<path d="M{x} 0C{x + rnd.randint(-6, 6)} 70 {x + rnd.randint(-8, 8)} 140 {x + rnd.randint(-5, 5)} 200"/>' for x in (34 + rnd.randint(0, 20), 120 + rnd.randint(-10, 10), 210 + rnd.randint(-10, 20), 270))
    return (f'<svg class="sk-bg" viewBox="0 0 300 216" preserveAspectRatio="none" aria-hidden="true" focusable="false">'
            f'<path class="sk-body" d="M0 0H300{butt}Z"/><g class="sk-grain">{grain}</g>'
            f'<ellipse class="sk-nail" cx="44" cy="20" rx="4.2" ry="4.6"/><ellipse class="sk-nail" cx="256" cy="20" rx="4.2" ry="4.6"/></svg>')


def reviews1():
    """[BANK] Q161 GSAP seamless marquee (xPercent seam, ease none) + Stronghold's 60 s linear marquee: two rows of
    verbatim excerpts hung as cedar shakes, running opposite ways at one slow speed; a pause button; still and
    scrollable under reduced motion. The page's one carousel. No count other than 474 anywhere."""
    pick = [REVIEWS[i] for i in (17, 26, 10, 0, 15, 28, 14, 3, 29, 9, 21, 25)]
    W = (300, 330, 286, 344, 312, 296)

    def card(r, k):
        return (f'<figure class="sk" style="--w:{W[k % len(W)]}px">{shake(k)}<blockquote><p>“{mark(cut(r["text"], 100))}”</p></blockquote>'
                f'<figcaption>{e(r["name"])}<span>{SOURCE}</span></figcaption></figure>')
    row = lambda rs, cls, k0: f'<div class="sk-row {cls}"><div class="sk-track">' + ''.join(card(r, k0 + k) for k, r in enumerate(rs)) + '</div></div>'
    return f'''<div class="v reviews-1" data-tone="ground">
  <div class="sk-head"><h2 class="h2x" data-split>What homeowners write</h2><p class="rating"><b class="num">4.9</b>{stars()}<span>474 Google reviews</span></p>
    <button class="btn btn-line btn-sm sk-pause" type="button" aria-pressed="false">Pause</button></div>
  <div class="sk-rows" role="region" aria-label="Excerpts from Google reviews, as published on austinprosiding.com">{row(pick[:6], 'sk-a', 0)}{row(pick[6:], 'sk-b', 6)}</div>
</div>'''


ONE = [(26, 'Jake handled our initial bid and was incredibly thorough, providing a fair and transparent estimate without any high-pressure sales tactics.'),
       (17, 'Wow what a difference our new windows have made, our home is so QUIET!'),
       (10, 'Also special shout out to Garrett who finished up and also swept the pollen off my deck! I did not expect that extra touch.'),
       (14, 'They only took 15 minutes to measure and understand the job rather than taking hours of my time, gave me a detailed estimate about an hour later at half the price of the others.'),
       (3, 'Austin Pro was able to fix everything WITHIN DAYS and it mattered because another big storm came through two days later!'),
       (15, 'They ripped off the old roof and put on a new one in one day.'),
       (29, 'Tracy provided us with a great, no pressure estimate along with a comprehensive package of info that detailed the entire process.'),
       (28, 'The house and yard was cleaner when they left than it was when they got here.')]


def reviews2():
    """builder brief R29 (testimonial carousel: cards in HTML, manual, pause-free) + ⟦S1329⟧ staggered words: one large
    quote at a time inside a double-hung window; the lower sash rises over the old quote and drops from the new one.
    Position is shown as panes of the window lit in turn (no numbers)."""
    for i, q in ONE:
        assert q.rstrip('.!') in REVIEWS[i]['text'], (i, q)
    data = json.dumps([dict(q=mark(q), n=REVIEWS[i]['name']) for i, q in ONE], ensure_ascii=False).replace('</', '<\\/')
    i0, q0 = ONE[0]
    panes = ''.join(f'<rect class="pp{" on" if k == 0 else ""}" x="{2 + (k % 4) * 9}" y="{2 + (k // 4) * 9}" width="8" height="8" rx="1"/>' for k in range(len(ONE)))
    return f'''<div class="v reviews-2" data-tone="ground2">
  <h2 class="h2s">From 474 Google reviews, rated 4.9</h2>
  <figure class="dh" tabindex="0" aria-roledescription="quote viewer" aria-label="Homeowner quotes; use the arrow keys or the buttons">
    <svg class="dh-frame" aria-hidden="true" focusable="false"><rect class="dh-case" width="100%" height="100%"/><line class="dh-meet" x1="0" y1="50%" x2="100%" y2="50%"/><svg y="100%" overflow="visible"><rect class="dh-sill" x="-14" y="-4" width="calc(100% + 28px)" height="12"/></svg></svg>
    <svg class="dh-sash" aria-hidden="true" focusable="false"><rect class="dh-glass" width="100%" height="100%"/><rect class="dh-rail" width="100%" height="12"/><rect class="dh-lift" x="46%" y="16" width="8%" height="6" rx="3"/></svg>
    <blockquote class="dh-q" aria-live="polite"><p>“{mark(q0)}”</p><footer class="dh-n">{e(REVIEWS[i0]['name'])}<span>{SOURCE}</span></footer></blockquote>
  </figure>
  <div class="dh-ctl"><button class="rb" type="button" data-dir="-1" aria-label="Previous quote"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
    <svg class="dh-pips" viewBox="0 0 38 20" aria-hidden="true" focusable="false">{panes}</svg>
    <button class="rb" type="button" data-dir="1" aria-label="Next quote"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>
  <script type="application/json" class="dh-data">{data}</script>
</div>'''


def reviews3():
    """[BANK] 300 True Focus (React Bits: focus brackets travel to the next word, unfocused words blur) + anatomy F13
    (reviews that name the operative): the crew as homeowners name them; pointing or tabbing to a name moves the
    brackets there in 0.3 s and the verbatim excerpts that name them come up. No counts, no auto-cycle."""
    names = ''.join(f'<button class="cr-n" type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" tabindex="{0 if k == 0 else -1}" data-name="{e(n)}">{e(n)}</button>' for k, (n, _) in enumerate(CREW))
    def about(text, rx, n=240):
        # the excerpt opens at the sentence that names THIS person, so their name is always in view
        m = re.search(rx, text)
        starts = [x.end() for x in re.finditer(r'[.!?]\s+', text[:m.start()])]
        a = starts[-1] if starts else 0
        return ('…' if a else '') + cut(text[a:], n)
    cards = ''.join(f'<li class="cr-c" tabindex="-1" data-name="{e(n)}"><blockquote><p>“{mark(about(r["text"], rx))}”</p></blockquote><p class="cr-by">{e(r["name"])}<span>{SOURCE}</span></p></li>'
                    for n, rx in CREW for r in REVIEWS if re.search(rx, r['text']))
    br = '<svg class="cr-br" aria-hidden="true" focusable="false"><path d="M2 14V2H14"/><svg x="100%" overflow="visible"><path d="M-2 14V2H-14"/></svg><svg y="100%" overflow="visible"><path d="M2 -14V-2H14"/></svg><svg x="100%" y="100%" overflow="visible"><path d="M-2 -14V-2H-14"/></svg></svg>'
    return f'''<div class="v reviews-3" data-tone="ground">
  <div class="cr-head"><h2 class="h2x" data-split>The crew, as homeowners name them</h2><p class="cr-sub">Point at a name to read what people wrote about them, word for word.</p></div>
  <div class="cr-line" role="radiogroup" aria-label="Crew members named in reviews">{names}{br}</div>
  <ul class="cr-cards" aria-live="polite">{cards}</ul>
  <button class="btn btn-line cr-more" type="button" hidden>Show the rest</button>
</div>'''


# ---------- MONEY ----------
TERMS = [(0, 24, '0% APR', '24 months'), (.0499, 60, '4.99% APR', '60 months'), (.0799, 120, '7.99% APR', '120 months')]


FINE = 'On approved credit through GreenSky; not everyone qualifies. The firm\'s own example: $15,000 at 7.99% APR for 120 months is 120 payments of $181.91.'


def money1():
    """Austin Pro's worked financing example (portfolio plan Site 6; FACTS: $15,000 at 7.99% APR for 120 months =
    $181.91) + anatomy F10 (financing as its own section): the payment for any amount on the three published plans,
    the figure on the odometer, and the term drawn as one window pane per monthly payment, a row of twelve per year"""
    panes = ''.join(f'<rect x="{(k % 12) * 14}" y="{(k // 12) * 12}" width="12" height="10" rx="1"/>' for k in range(120))
    plans = ''.join(f'''<button class="pay-t" type="button" role="radio" aria-checked="{'true' if n == 120 else 'false'}" tabindex="{0 if n == 120 else -1}" data-apr="{apr}" data-n="{n}"><b>{a}</b><span>{m}</span>{'<i>Lowest monthly</i>' if n == 120 else ''}</button>''' for apr, n, a, m in TERMS)
    return f'''<div class="v money-1" data-tone="ground">
  <h2 class="h2x" data-split>The monthly maths, done</h2>
  <div class="pay-grid">
    <div class="pay-fig">
      <p class="pay-big num" aria-hidden="true"><span class="odo" data-odo>$181.91</span><small>/mo</small></p>
      <p class="pay-sub" data-pay="sub">$15,000 over 120 months at 7.99% APR</p>
      <p class="sr-only" aria-live="polite" data-pay="sr"></p>
      <figure class="pay-term"><svg class="pay-panes" viewBox="0 0 166 118" data-pay="panes" aria-hidden="true" focusable="false">{panes}</svg>
        <figcaption data-pay="cap">120 monthly payments, one pane each; a row is a year</figcaption></figure>
    </div>
    <div class="pay-ctl">
      <label class="lab" for="pay-amt">Project amount <output class="num" for="pay-amt" data-pay="amt">$15,000</output></label>
      <input class="range" id="pay-amt" type="range" min="2000" max="50000" step="500" value="15000" aria-valuetext="$15,000">
      <div class="pay-plans" role="radiogroup" aria-label="Payment plan">{plans}</div>
      <p class="fine">{FINE}</p>
    </div>
  </div>
</div>'''


BANDS13 = ['Under $2k', '$2k-$5k', '$5k-$10k', '$10k-$15k', '$15k-$20k', '$20k-$25k', '$25k-$30k', '$30k-$40k', '$40k-$50k', '$50k-$60k', '$60k-$75k', '$75k-$100k', '$100k+']
SHORT13 = ['<2k', '2-5k', '5-10k', '10-15k', '15-20k', '20-25k', '25-30k', '30-40k', '40-50k', '50-60k', '60-75k', '75-100k', '100k+']
DIST = {
    'siding': dict(name='Siding', n=415, c=[12, 33, 70, 107, 92, 53, 22, 19, 4, 1, 2, 0, 0], med=3, mid='$5k and $20k', cities=31,
                   moves=['Wall area and stories', "What's under the old siding (rot, sheathing)", 'Whole house or a few walls', 'Trim, soffit and fascia', 'Paint or ColorPlus', 'Profile and details'],
                   moves_h='What moves a siding price, as the firm lists it'),
    'windows': dict(name='Windows', n=376, c=[12, 40, 96, 79, 50, 30, 19, 30, 13, 4, 0, 2, 1], med=3, mid='$5k and $25k', cities=40,
                    moves=['NT Windows: 238 jobs, median $10k-$15k', 'Simonton: 54 jobs, median $10k-$15k', 'Andersen: 38 jobs, median $20k-$25k', 'Pella: 31 jobs, median $5k-$10k'],
                    moves_h='Median by brand, from the same job files'),
}
assert sum(DIST['siding']['c']) == 415 and sum(DIST['windows']['c']) == 376


BOARD_I = ('<svg class="db-bd" viewBox="0 0 10 100" preserveAspectRatio="none" focusable="false"><rect class="db-sh" x="7.6" width="2.4" height="100"/><path class="db-g" d="M3 0C2 30 4 60 3 100M6 0C7 40 5 70 6.4 100"/></svg>'
           '<svg class="db-nl" focusable="false"><circle cx="50%" cy="7" r="2.2"/></svg><svg class="db-chalk" viewBox="0 0 24 16" focusable="false"><path d="M2 8L9 14L22 2"/></svg>')


def dist_bars(d):
    mx = max(d['c'])
    return ''.join(f'<li class="db{" is-med" if k == d["med"] else ""}" style="--h:{c / mx:.4f}"><span class="db-n num">{c}</span><i aria-hidden="true">{BOARD_I}</i><span class="db-l">{SHORT13[k]}</span>'
                   f'<span class="sr-only">{BANDS13[k]}: {c} jobs</span></li>' for k, c in enumerate(d['c']))


def money2():
    """Austin Pro crown 1, invoiced distribution (anatomy F7e, the bank's strongest price form: "ranges are estimates;
    distributions are evidence"): every priced job by band, median band marked, the sample caveat printed"""
    d = DIST['siding']
    js = json.dumps(DIST).replace('</', '<\\/')
    tabs = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if k == "siding" else "false"}" tabindex="{0 if k == "siding" else -1}" class="dt" data-k="{k}">{v["name"]}<span class="num">{v["n"]} jobs</span></button>' for k, v in DIST.items())
    moves = ''.join(f'<li>{e(m)}</li>' for m in d['moves'])
    return f'''<div class="v money-2" data-tone="night">
  <div class="dd-top">
    <h2 class="h2x" data-split>What people actually paid</h2>
    <div class="dd-tabs" role="radiogroup" aria-label="Trade">{tabs}</div>
  </div>
  <div class="dd-grid">
    <figure class="dd-fig">
      <ol class="dd-bars" data-dd-bars aria-label="Priced siding jobs by price band, 2022-2026">{dist_bars(d)}</ol>
      <figcaption class="dd-cap" aria-live="polite" data-dd-cap><b class="num">{d['n']}</b> priced {d['name'].lower()} jobs, 2022-2026, in {d['cities']} Central Texas cities</figcaption>
    </figure>
    <div class="dd-side">
      <p class="dd-med"><span>Median band</span><b class="num" data-dd-med>{BANDS13[d['med']]}</b></p>
      <p class="dd-mid">Half of them landed between <b data-dd-mid>{d['mid']}</b>.</p>
      <p class="dd-mh" data-dd-mh>{e(d['moves_h'])}</p>
      <ol class="dd-moves" data-dd-moves>{moves}</ol>
    </div>
  </div>
  <p class="fine">A documented sample, not every job since 2009: 1,590 individually priced trades on 886 documented projects, 2018-2026. Bands are materials and labour, before discounts, excluding tax.</p>
  <script type="application/json" class="dd-data">{js}</script>
</div>'''


def money3():
    """builder brief R24 (options update a summary live; complete without JS) + FACTS Offers: the three published
    offers on a receipt, from the firm's own example ($30,000 with all three = $22,500). When a box changes, the total
    is struck through and written again; no odometer, no stamp (those belong to Money 1 and Proof 3)."""
    torn = 'M0 0H400V8' + ''.join(f'L{x + 10} 16L{x + 20} 8' for x in range(0, 400, 20)) + 'V0Z'
    return f'''<div class="v money-3" data-tone="ground2">
  <div class="rcp-grid">
    <div class="rcp-side">
      <h2 class="h2x" data-split>Three discounts, stacked</h2>
      <p>The firm's own example: a $30,000 project with all three comes to $22,500.</p>
      <div class="rcp-opts">
        <label class="tick"><input type="checkbox" data-pct="5" checked><span>Hometown Heroes: veterans and military, teachers, seniors, first responders</span></label>
        <label class="tick"><input type="checkbox" data-pct="10" checked><span>Pay in full by cash, check or ACH (not with financing)</span></label>
      </div>
      <div class="rcp-cta">{btn_book('btn btn-ink', 'Book a free inspection')}<a class="tlink" href="{TEL}">Call {PHONE}</a></div>
    </div>
    <div class="rcp">
      <svg class="rcp-perf" viewBox="0 0 400 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 5H400"/></svg>
      <p class="rcp-h">Your estimate</p>
      <div class="rcp-l rcp-amt"><span>Project</span><label class="rcp-in"><span class="sr-only">Project amount in dollars</span>$<input type="text" inputmode="numeric" value="30,000" autocomplete="off"></label></div>
      <div class="rcp-l"><span>Holiday Savings, through November 30</span><b>-10%</b></div>
      <div class="rcp-l" data-line="5"><span>Hometown Heroes</span><b>-5%</b></div>
      <div class="rcp-l" data-line="p"><span>Pay in full</span><b>-10%</b></div>
      <div class="rcp-tot" aria-live="polite"><span>You pay</span><b class="num"><span class="rcp-now" data-now>$22,500</span><svg class="rcp-strike" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M2 13C30 9 64 12 98 6"/></svg></b></div>
      <p class="rcp-save num">You save <b data-save>$7,500</b> on <span data-list>$30,000</span></p>
      <svg class="rcp-torn" viewBox="0 0 400 16" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="{torn}"/></svg>
    </div>
  </div>
</div>'''


# ---------- BOOK ----------
BOOK_TRADES = ['Siding', 'Windows', 'Shingle roofing', 'Metal roofing', 'Exterior doors', 'Garage doors', 'Gutters', 'Patio covers', 'Exterior painting', 'Decking', 'Storm damage']
BANDS = ['Under $5k', '$5k-$10k', '$10k-$15k', '$15k-$20k', '$20k or more', 'Not sure yet']


PANES3 = ('<svg class="bk-panes" viewBox="0 0 66 30" aria-hidden="true" focusable="false"><rect class="bp-fr" x="1" y="1" width="64" height="28" rx="1.5"/>'
          + ''.join(f'<rect class="bp-pane" data-pane="{k}" x="{4 + k * 20.67:.2f}" y="4" width="17.6" height="22"/>' for k in range(3))
          + '<path class="bp-sill" d="M-2 31H68"/></svg>')


def form(pref, theme='', panes=False):
    chips = ''.join(f'<label class="ck"><input type="checkbox" name="trade" value="{t}"><span>{t}</span></label>' for t in BOOK_TRADES)
    radios = ''.join(f'<label class="ck"><input type="radio" name="{pref}-band" value="{b}"><span>{b}</span></label>' for b in BANDS)
    return f'''<form class="bk {theme}" data-form novalidate aria-label="Request a free inspection">
      <p class="bk-k num" aria-live="polite">{PANES3 if panes else ''}<span>1</span> of 3</p>
      <fieldset class="bk-step is-on" data-step="1"><legend>What should we look at?</legend>
        <div class="cks">{chips}</div><p class="bk-err" id="{pref}-e1" hidden>Pick at least one, so the right person comes out.</p></fieldset>
      <fieldset class="bk-step" data-step="2" hidden><legend>Roughly what budget?</legend>
        <div class="cks">{radios}</div><p class="bk-err" id="{pref}-e2" hidden>Pick a band, or "Not sure yet".</p></fieldset>
      <fieldset class="bk-step" data-step="3" hidden><legend>Where should we call you?</legend>
        <div class="fld"><label for="{pref}-name">First name</label><input id="{pref}-name" name="name" autocomplete="given-name" required aria-describedby="{pref}-name-e"><p class="bk-err" id="{pref}-name-e" hidden>Add your first name.</p></div>
        <div class="fld"><label for="{pref}-tel">Phone</label><input id="{pref}-tel" name="tel" type="tel" autocomplete="tel" inputmode="tel" required aria-describedby="{pref}-tel-e"><p class="bk-err" id="{pref}-tel-e" hidden>Phone numbers have 10 digits, like (512) 550-0000.</p></div>
        <div class="fld"><label for="{pref}-zip">ZIP code</label><input id="{pref}-zip" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="5" required aria-describedby="{pref}-zip-e"><p class="bk-err" id="{pref}-zip-e" hidden>ZIP codes have 5 digits, like 78752.</p></div>
      </fieldset>
      <div class="bk-done" tabindex="-1" hidden><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 25l7 7 15-16"/></svg><p class="bk-done-h">Request saved, <span data-done-name>thanks</span></p><p>The office calls you back to pick a time: {HOURS}.</p><p class="fine">Concept site: this form is a working prototype and sends nothing.</p></div>
      <div class="bk-nav"><button class="bk-back tlink" type="button" hidden>Back</button><button class="btn btn-ink bk-next" type="button">Continue</button><button class="btn btn-red bk-send" type="submit" hidden>Request my inspection</button></div>
    </form>'''


def book1():
    return f'''<div class="v book-1 has-bgf" data-tone="red">
  <div class="bgf" aria-hidden="true"><canvas class="b1-folds"></canvas></div>
  <h2 class="h2x b1-h" data-split>See your price in writing</h2>
  <p class="b1-sub">Free inspection, 30 to 60 minutes, no obligation. You get the scope, materials and price.</p>
  <span class="mag" data-magnet><svg class="b1-door" aria-hidden="true" focusable="false"><rect class="bd-o" x="0" y="0" width="100%" height="100%" rx="4"/><rect class="bd-i" x="12" y="12" width="100%" height="100%" rx="2"/></svg><a class="b1-tel" href="{TEL}" data-cur="alt" data-cur-label="Call">{PHONE}</a></span>
  <p class="b1-hours">Office hours: {HOURS}</p>
  <div class="b1-act"><button class="btn btn-white b1-open" type="button" aria-expanded="false" aria-controls="b1-panel">Book free inspection online</button></div>
  <div class="b1-panel" id="b1-panel" hidden>{form('b1', 'bk-card')}</div>
</div>'''


def book2():
    return f'''<div class="v book-2" data-tone="ground">
  <div class="b2-grid">
    <figure class="b2-ph">{img(H + 'book-1000.webp', 1000, 625, alt(HOME_PAIRS[0]['aa']))}<figcaption>{e(HOME_PAIRS[0]['p'])}, {e(HOME_PAIRS[0]['w'])}. {e(HOME_PAIRS[0]['bl'])} {band(HOME_PAIRS[0]['b'])}</figcaption></figure>
    <div class="b2-form"><h2 class="h2x" data-split>See your price in writing</h2><p class="b2-sub">Free inspection, 30 to 60 minutes, no obligation. Or call <a class="tlink" href="{TEL}">{PHONE}</a>.</p>{form('b2', 'bk-card', panes=True)}</div>
  </div>
</div>'''


def book3():
    """Q413 Tequila conversational form: the request written as one sentence with inline fields, plus the reply promise
    in the firm's own words (30 to 60 minute inspection; scope, materials and price; office hours)"""
    trades = ''.join(f'<option{" selected" if t == "Siding" else ""}>{e(t)}</option>' for t in BOOK_TRADES)
    bands = ''.join(f'<option{" selected" if b_ == "Not sure yet" else ""}>{e(b_)}</option>' for b_ in BANDS)
    return f'''<div class="v book-3" data-tone="night">
  <form class="snt-form" data-snt novalidate aria-labelledby="snt-h">
    <h2 class="snt-k" id="snt-h">Book a free inspection, in one sentence</h2>
    <p class="snt">Hi Austin Pro, I'm <span class="snt-in"><input name="name" autocomplete="given-name" aria-label="Your first name" placeholder="your name" size="9" required><svg class="snt-ch" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 4Q50 9 100 4"/></svg></span>.
      Could you look at my <span class="snt-sel"><select name="trade" aria-label="What to look at">{trades}</select></span>
      in <span class="snt-in"><input name="zip" inputmode="numeric" autocomplete="postal-code" maxlength="5" aria-label="Your ZIP code" placeholder="ZIP" size="5" required><svg class="snt-ch" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 4Q50 9 100 4"/></svg></span>?
      My budget is roughly <span class="snt-sel"><select name="band" aria-label="Rough budget">{bands}</select></span>.
      Call me on <span class="snt-in"><input name="tel" type="tel" inputmode="tel" autocomplete="tel" aria-label="Your phone number" placeholder="phone" size="12" required><svg class="snt-ch" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 4Q50 9 100 4"/></svg></span>.</p>
    <ul class="snt-err" aria-live="polite" hidden></ul>
    <div class="snt-go"><button class="btn btn-red snt-send" type="submit" data-cur="hero">Send my request</button>
      <p class="snt-promise">Free inspection, 30 to 60 minutes, no obligation. You get the scope, materials and price in writing. The office calls you back to pick a time: {HOURS}.</p></div>
    <div class="snt-done" tabindex="-1" hidden><p class="bk-done-h">Request saved, <span data-snt-name>thanks</span></p><p>The office calls you back to pick a time.</p><p class="fine">Concept site: this form is a working prototype and sends nothing.</p></div>
  </form>
  <p class="b3-call">Rather talk? <a class="tlink on-dark" href="{TEL}">{PHONE}</a></p>
</div>'''


# ---------- page ----------
SECTIONS = [
    ('hero', 'Hero', [hero1, hero2, hero3], ['Window letters', 'Pick your project', 'Real work']),
    ('proof', 'Proof', [proof1, proof2, proof3], ['Record', 'At a glance', 'Statement']),
    ('services', 'Services', [services1, services2, services3], ['Point at it', 'Index', 'Tape measure']),
    ('work', 'Work', [work1, work2, work3], ['Drag', 'Blueprint', 'Lens']),
    ('built', 'Built', [built1, built2, built3], ['Taken apart', 'Built for Texas', 'To the inch']),
    ('colour', 'Colour', [colour1, colour2, colour3], ['Try it on your house', 'Paint or ColorPlus', 'Colour book']),
    ('near', 'Near you', [near1, near2, near3], ['Survey', 'Town by town', 'Neighbourhood drive']),
    ('reviews', 'Reviews', [reviews1, reviews2, reviews3], ['Stream', 'One', 'The crew']),
    ('money', 'Money', [money1, money2, money3], ['Amount', 'What people paid', 'Receipt']),
    ('book', 'Book', [book1, book2, book3], ['Call', 'Form', 'One sentence']),
]


NEXT = {   # K7 / BRIEF-V6 §12.1: every version carries the phone in a contact path; a version without one ends on this line
    'proof': 'Check any of this with the office.', 'services': 'One free inspection covers every trade on the house.',
    'work': 'Want your house priced like these?', 'built': 'Questions about the board or the warranty?',
    'colour': 'Want the samples in your hands?', 'near': 'Near you? Inspections are free.',
    'reviews': 'Talk to the office yourself.', 'money': 'Questions about the plans or the offers?',
}


def with_phone(key, v):
    if TEL in v:
        return v
    line = (f'<p class="nextstep"><span>{e(NEXT[key])}</span> <a class="tlink" href="{TEL}">Call {PHONE}</a>'
            f' <span class="ns-or">or</span> <a class="tlink" href="#book" data-book>book a free inspection</a></p>')
    i = v.rindex('</div>')
    return v[:i] + line + '\n' + v[i:]


def section(key, label, fns, names):
    vs = [with_phone(key, f()) for f in fns]
    tabs = ''.join(f'<button class="vsw-b" type="button" role="tab" id="{key}-tab{n}" aria-selected="{"true" if n == 1 else "false"}" aria-controls="{key}-stage" tabindex="{0 if n == 1 else -1}" data-v="{n}" aria-label="{label} version {n}: {e(nm)}">{n}</button>'
                   for n, nm in enumerate(names, 1))
    tpl = ''.join(f'<template data-v="{n}">{v}</template>' for n, v in enumerate(vs, 1))
    return f'''<section class="sec sec-{key}" id="{key}" data-sec="{key}" data-names="{e('|'.join(names))}" aria-label="{label}">
  <div class="vsw-rail"><div class="vsw" role="tablist" aria-label="{label} versions"><span class="vsw-l" aria-hidden="true"><b>{label}</b> <span>{e(names[0])}</span></span>{tabs}</div></div>
  <div class="stage" id="{key}-stage" role="tabpanel" aria-labelledby="{key}-tab1">{vs[0]}</div>
  {tpl}
</section>'''


def head():
    ld = {"@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "name": "Austin Pro Siding, Windows & Roofing",
          "telephone": "+1-512-550-0000", "email": EMAIL, "url": LIVE,
          "address": {"@type": "PostalAddress", "streetAddress": "7801 N Lamar Blvd Suite C70", "addressLocality": "Austin", "addressRegion": "TX", "postalCode": "78752", "addressCountry": "US"},
          "openingHours": ["Mo-Fr 08:00-20:00", "Sa 08:00-18:00", "Su 12:00-17:00"], "foundingDate": "2009",
          "aggregateRating": {"@type": "AggregateRating", "ratingValue": 4.9, "reviewCount": 474, "bestRating": 5}}
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing | Priced in public</title>
<meta name="description" content="Siding, windows and roofing in Austin since 2009, with real prices from 886 documented jobs. A concept redesign with three versions of every section.">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#F3F2EE">
<link rel="icon" href="assets/img/favicon.png">
<link rel="preload" href="assets/fonts/MonaSans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/home.css">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">{json.dumps(ld)}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
'''


def header():
    links = [('#work', 'Work'), ('#colour', 'Colour'), ('#near', 'Near you'), ('#money', 'Financing')]
    nav = ''.join(f'<a href="{h}">{t}</a>' for h, t in links)
    return f'''<header class="hd">
  <a class="hd-logo" href="#main" aria-label="Austin Pro Siding, Windows and Roofing, top of page"><img src="assets/img/served/65246f239b165c29151e6f9f_AP_HORIZONTAL-LOGO_COLOR-V2-p-1080.png" width="1080" height="262" alt=""></a>
  <nav class="hd-nav" aria-label="Sections">{nav}</nav>
  <button class="hd-motion" type="button" data-motion-btn aria-pressed="true"><svg viewBox="0 0 22 14" aria-hidden="true" focusable="false"><rect class="mt-k" x="1" y="1" width="20" height="12" rx="6"/><circle class="mt-d" cx="15" cy="7" r="3.6"/></svg><span data-motion-t>Motion on</span></button>
  <a class="hd-tel" href="{TEL}">{PHONE}</a>
  <a class="btn btn-red btn-sm hd-book" href="#book" data-book aria-label="Book free inspection"><span class="long">Book free inspection</span><span class="short" aria-hidden="true">Book</span></a>
  <button class="hd-menu" type="button" aria-expanded="false" aria-controls="sheet">Menu</button>
</header>
<div class="sheet" id="sheet" hidden><nav aria-label="Sections, mobile">{nav}<a href="#book">Book free inspection</a><a href="{TEL}">Call {PHONE}</a><button class="sh-motion" type="button" data-motion-btn aria-pressed="true"><span data-motion-t>Motion on</span></button></nav></div>
'''


def picks():
    rows = ''.join(f'''<li><span>{label}</span><div class="pk-seg" role="radiogroup" aria-label="{label} version" data-for="{key}">{''.join(f'<button type="button" role="radio" aria-checked="{"true" if n == 1 else "false"}" data-v="{n}" title="{e(nm)}">{n}</button>' for n, nm in enumerate(names, 1))}</div></li>''' for key, label, _f, names in SECTIONS)
    return f'''<div class="picks">
  <button class="pk-btn" type="button" aria-expanded="false" aria-controls="pk-panel"><span>Your picks</span><b class="num" data-pk-code>111 111 1111</b></button><div class="pal-mini"><span aria-hidden="true">Companion</span><div class="pal-sw" role="radiogroup" aria-label="Cursor companion, quick switch"><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="sash">Sash</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="gable">Gable</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="chip">Chip</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="off">Off</button></div></div>
  <div class="pk-panel" id="pk-panel" role="dialog" aria-label="Your picks" hidden>
    <p class="pk-h">Your picks</p>
    <p class="pk-tip">Switch any section here or with its 1 2 3 buttons. Keys 1, 2 and 3 switch the section in view.</p>
    <ul class="pk-list">{rows}</ul>
    <label class="pk-motion"><input type="checkbox" data-motion checked><span>Motion</span></label>
    <div class="pk-pal"><span id="pk-pal-l">Cursor companion</span><div class="pal-sw" role="radiogroup" aria-labelledby="pk-pal-l"><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="sash">Sash</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="gable">Gable</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="chip">Chip</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="off">Off</button></div><p class="pk-pal-note">The companion follows a mouse pointer. It stays off on touch screens and with motion off.</p></div>
    <div class="pk-act"><button class="btn btn-ink btn-sm" type="button" data-copy>Copy my picks</button><button class="tlink" type="button" data-reset>Reset</button></div>
    <p class="pk-msg" aria-live="polite"></p>
  </div>
</div>'''


def footer():
    return f'''<footer class="ft" data-tone="night">
  <div class="ft-top"><img class="ft-logo" src="assets/img/served/AP_HORIZONTAL-LOGO_WHT-p-500.avif" width="500" height="122" alt="Austin Pro Siding, Windows and Roofing" loading="lazy">
    <p class="ft-big"><a href="{TEL}">{PHONE}</a></p></div>
  <div class="ft-grid">
    <p><b>Office</b>{ADDRESS}</p>
    <p><b>Hours</b>{HOURS}</p>
    <p><b>Write</b><a href="mailto:{EMAIL}">{EMAIL}</a></p>
    <nav aria-label="Footer"><b>On this page</b><a href="#work">Work</a><a href="#colour">Colour</a><a href="#near">Near you</a><a href="#money">Financing</a><a href="#book">Book</a><button class="ft-motion" type="button" data-motion-btn aria-pressed="true"><svg viewBox="0 0 22 14" aria-hidden="true" focusable="false"><rect class="mt-k" x="1" y="1" width="20" height="12" rx="6"/><circle class="mt-d" cx="15" cy="7" r="3.6"/></svg><span data-motion-t>Motion on</span></button></nav>
  </div>
  <p class="ft-note">Concept redesign for a design portfolio, not affiliated with or endorsed by Austin Pro Siding, Windows &amp; Roofing. Every figure, photo and colour comes from austinprosiding.com, read 29 Oct 2026. Financing on approved credit through GreenSky. Prices are materials and labour before discounts, excluding tax.</p>
</footer>'''


def build():
    body = head() + header() + '<main id="main">\n' + ''.join(section(k, l, f, n) for k, l, f, n in SECTIONS) + '</main>\n' + footer() + picks()
    data = json.dumps(dict(map=MAPDATA, sw=SW, cp=COLORPLUS), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    body += f'\n<script type="application/json" id="home-data">{data}</script>\n'
    js = ['gsap', 'ScrollTrigger', 'DrawSVGPlugin', 'MorphSVGPlugin', 'Draggable', 'InertiaPlugin', 'CustomEase']
    body += ''.join(f'<script src="assets/js/{n}.min.js" defer></script>\n' for n in js)
    body += '<script src="assets/js/lenis.min.js" defer></script>\n<script src="assets/js/fx.js" defer></script>\n<script src="assets/js/v4.js" defer></script>\n<script src="assets/js/home.js" defer></script>\n</body>\n</html>\n'
    # house style turns en dashes into hyphens; the §3 hours string is restored verbatim afterwards (K2)
    out = clean(body).replace(clean(HOURS), HOURS)
    with open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(out)
    words = len(re.sub(r'<[^>]+>', ' ', re.sub(r'<template.*?</template>|<script.*?</script>|<style.*?</style>', ' ', out, flags=re.S)).split())
    print('index.html', len(out) // 1024, 'KB; visible words in the default mix (approx):', words)


if __name__ == '__main__':
    build()
