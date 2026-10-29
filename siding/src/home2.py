"""index.html, homepage v2: nine sections, three switchable versions each (DIRECTION-HOME-V2.md, SKILL-PACK.md).

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

H = 'assets/img/h/'
EMAIL = 'info@austinprosiding.com'


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


def ctas(dark=False):
    return f'<div class="ctas">{btn_book()}<a class="tlink{" on-dark" if dark else ""}" href="#work">See the work</a></div>'


H1 = '<h1 class="display" data-split>Siding and windows, priced in public</h1>'
LEAD = '<p class="lead">886 documented Austin jobs, each with its real price. Inspections are free.</p>'

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
def hero1():
    rb, ra = f'{H}../pairs/robroy-hb', f'{H}../pairs/robroy-ha'
    return f'''<div class="v hero-1" data-tone="photo">
  <figure class="h1-frame" data-wipe style="--wipe:50%">
    <img class="h1-a" src="{ra}-1440.webp" srcset="{ra}-760.webp 760w, {ra}-1440.webp 1440w" sizes="100vw" width="1440" height="900" alt="{alt(ROB['after']['alt'])}" fetchpriority="high">
    <img class="h1-b" src="{rb}-1440.webp" srcset="{rb}-760.webp 760w, {rb}-1440.webp 1440w" sizes="100vw" width="1440" height="900" alt="{alt(ROB['before']['alt'])}">
    <span class="h1-line" aria-hidden="true"></span>
    <span class="ptag ptag-b" aria-hidden="true">Before</span><span class="ptag ptag-a" aria-hidden="true">After</span>
    <input class="sr-only h1-range" type="range" min="0" max="100" value="50" aria-label="Compare the Rob Roy house before and after">
    <button class="h1-pause" type="button" aria-pressed="false" aria-label="Pause the before and after animation"><svg aria-hidden="true" viewBox="0 0 20 20"><path class="i-pause" d="M6 4h3v12H6zM11 4h3v12h-3z"/><path class="i-play" d="M6 4l10 6-10 6z"/></svg></button>
    <figcaption class="pchip h1-chip"><span>Rob Roy, Austin, {ROB['when']}</span><b>{e(ROB['bl'])} {band(ROB['band'])}</b></figcaption>
  </figure>
  <div class="h1-copy">{H1}{LEAD}{ctas(True)}</div>
</div>'''


def hero2():
    panes = ''.join(f'<i class="pane pane-{k}" aria-hidden="true"></i>' for k in ('tl', 'tr', 'bl', 'br'))
    p = PHOTOS[0]
    return f'''<div class="v hero-2" data-tone="ground">
  <div class="h2-scene">
    <div class="h2-stage">
      <div class="h2-layer">{img(H + 'hero-window-1400.webp', 1400, 1050, alt(p['trades'] + ' in ' + p['place'] + ', ' + p['when']), 'h2-img', eager=True)}</div>
      <div class="h2-copy">{H1}{LEAD}{ctas()}</div>
      <div class="h2-box" aria-hidden="true">{panes}<i class="mull mull-x"></i><i class="mull mull-y"></i></div>
      <p class="h2-cap">{e(p['place'])}. {e(p['trades'])}, {e(p['when'])}</p>
    </div>
  </div>
</div>'''


def hero3():
    hp = HOME_PAIRS[5]
    assert hp['p'].startswith('Circle C')
    return f'''<div class="v hero-3" data-tone="night">
  <div class="h3-copy">{H1}{LEAD}{ctas(True)}</div>
  <figure class="h3-stage" data-paint>
    {img(H + 'hero-paint-b-1280.webp', 1280, 800, alt(hp['ba']), 'h3-b', eager=True)}
    {img(H + 'hero-paint-a-1280.webp', 1280, 800, alt(hp['aa']), 'h3-a', eager=True)}
    <canvas class="h3-gl" aria-hidden="true"></canvas>
    <figcaption class="h3-bar">
      <span class="h3-hint" data-fine>Move across the house to paint the new siding</span>
      <button class="btn btn-glass h3-toggle" type="button" aria-pressed="false">Show the new siding</button>
    </figcaption>
    <p class="pchip h3-chip"><span>{e(hp['p'])}, {e(hp['w'])}</span><b>{e(hp['bl'])} {band(hp['b'])}</b></p>
  </figure>
</div>'''


# ---------- PROOF ----------
def digits(value, cls=''):
    """Rolling figure: real value as text for AT and no-JS; digit strips added by JS."""
    return f'<span class="roll{(" " + cls) if cls else ""}" data-roll="{e(value)}">{e(value)}</span>'


def proof1():
    return f'''<div class="v proof-1" data-tone="ground">
  <h2 class="h2x" data-split>On record since 2009</h2>
  <div class="cidx">
    <p class="ci ci-a"><b>{digits('886')}</b><span>jobs documented since 2018, 316 of them with photos</span></p>
    <p class="ci ci-b"><b>{digits('4.9')}</b><span>stars across 474 Google reviews</span></p>
    <p class="ci ci-c"><b>{digits('5,000+')}</b><span>Central Texas homeowners</span></p>
    <p class="ci ci-d"><b>{digits('2009')}</b><span>the year Austin Pro Siding &amp; Windows opened</span></p>
  </div>
</div>'''


WALL = [0, 3, 42, 18, 11, 22, 26, 12, 33, 5, 38, 16, 41, 7, 29, 36, 2, 13, 19, 24, 31, 40, 6, 28, 10, 21, 35, 15, 30, 9, 27, 37]


def proof2():
    tiles = ''
    for k, i in enumerate(WALL):
        p = PHOTOS[i]
        tiles += f'<li class="wt" data-k="{k}"><img src="{H}t/p{i}-320.webp" width="320" height="240" alt="{e(p["trades"])} in {e(p["place"])}, {e(p["when"])}" loading="lazy" decoding="async"></li>'
    return f'''<div class="v proof-2" data-tone="night">
  <ul class="wall" aria-label="32 documented jobs, with neighbourhood, trades and month">{tiles}</ul>
  <div class="wall-plate">
    <h2 class="h2x" data-split>886 jobs, documented and dated</h2>
    <p>Each with its photos, neighbourhood, products and price band. These are 32 of them.</p>
  </div>
</div>'''


def pill(i):
    return f'<span class="ipill" aria-hidden="true"><img src="{H}t/p{i}-320.webp" width="320" height="240" alt="" loading="lazy" decoding="async"></span>'


def proof3():
    return f'''<div class="v proof-3" data-tone="ground2">
  <h2 class="h2s">The short version</h2>
  <p class="statement" data-illuminate>Since 2009, Austin Pro has worked on <b>5,000+</b> Central Texas homes. <b>886</b> {pill(3)} of those jobs are documented, each with photos and a real price. Homeowners rate the work <b>4.9</b> {pill(22)} stars across <b>474</b> Google reviews.</p>
</div>'''


# ---------- SERVICES ----------
def services1():
    rows = ''
    for slug in TRADE_ORDER:
        t = TBY[slug]
        cnt = f"{t['doc']} jobs" if t['doc'] else f"{t['n']} priced"
        im = f' data-img="{tphoto(slug)}"' if slug in TRADE_PHOTO else ''
        th = f'<img class="ix-th" src="{tphoto(slug)}" width="800" height="600" alt="" loading="lazy" decoding="async">' if slug in TRADE_PHOTO else '<span class="ix-th ix-th-none" aria-hidden="true"></span>'
        rows += f'''<li><a class="ix-row" href="#book" data-book data-trade="{e(t['name'])}"{im} aria-label="{e(t['name'])}: {cnt}, median job {med(t)}. Book an inspection">
      <span class="ix-name">{e(t['name'])}</span><span class="ix-meta"><span>{cnt}</span><b>Median {med(t)}</b></span>{th}</a></li>'''
    rows += '''<li><a class="ix-row" href="#book" data-book data-trade="Storm damage" aria-label="Storm damage: free inspection, documented for your insurer. Book an inspection">
      <span class="ix-name">Storm damage</span><span class="ix-meta"><span>Hail and wind</span><b>Free inspection</b></span><span class="ix-th ix-th-none" aria-hidden="true"></span></a></li>'''
    return f'''<div class="v services-1" data-tone="ground">
  <div class="ix-head"><h2 class="h2x" data-split>Eleven trades, one inspection</h2><p>Job counts and median prices come from the firm's own documented jobs, 2018-2026.</p></div>
  <ul class="ix">{rows}</ul>
  <div class="ix-peek" aria-hidden="true"><img alt="" width="800" height="600"></div>
</div>'''


def services2():
    five = ['siding', 'windows', 'shingle-roofing', 'exterior-painting', 'patio-covers']
    sl = ''
    for k, slug in enumerate(five):
        t = TBY[slug]
        sl += f'''<li class="sl{' is-on' if k == 0 else ''}" data-k="{k}">
      <button class="sl-btn" type="button" aria-expanded="{'true' if k == 0 else 'false'}" aria-controls="sl-{k}"><span>{e(t['name'])}</span></button>
      <img class="sl-img" src="{tphoto(slug)}" width="800" height="600" alt="{e(tcap(slug))}" loading="lazy" decoding="async">
      <div class="sl-body" id="sl-{k}"><p class="sl-n"><b>{t['doc']}</b> documented jobs</p><p class="sl-m">Median job {med(t)}</p>{btn_book('btn btn-white btn-sm', 'Book free inspection', t['name'])}</div>
    </li>'''
    return f'''<div class="v services-2" data-tone="night">
  <h2 class="h2x" data-split>Five trades, up close</h2>
  <ul class="slices">{sl}</ul>
  <p class="sl-more">Also gutters, exterior doors, garage doors, metal roofing, decking and storm damage. One free inspection covers every trade on the house.</p>
</div>'''


def services3():
    cards = ''
    for slug in TRADE_ORDER:
        t = TBY[slug]
        ph = f'<img src="{tphoto(slug)}" width="800" height="600" alt="" loading="lazy" decoding="async">' if slug in TRADE_PHOTO else f'<span class="bc-none" aria-hidden="true"><b class="num">{t["n"]}</b>priced jobs</span>'
        cards += f'''<li class="bc" data-lo="{t['lo']}" data-hi="{t['hi']}"><div class="bc-ph">{ph}</div>
      <p class="bc-name">{e(t['name'])}</p><p class="bc-range">Most jobs {mid(t)}</p></li>'''
    return f'''<div class="v services-3" data-tone="ground">
  <div class="bud-head">
    <h2 class="h2x" data-split>What does your budget cover?</h2>
    <div class="bud-ctl">
      <label for="bud-in" class="bud-label">Budget</label>
      <output class="bud-out num" for="bud-in">$15,000</output>
      <input class="range" id="bud-in" type="range" min="2000" max="50000" step="500" value="15000" aria-valuetext="$15,000">
      <p class="bud-say" aria-live="polite"><b>7</b> of 10 trades usually land around this budget.</p>
    </div>
  </div>
  <ul class="bud-grid">{cards}</ul>
  <p class="fine">"Most jobs" is the middle half of each trade's individually priced jobs, materials and labour before discounts, excluding tax. Your price comes from the free inspection.</p>
</div>'''


# ---------- WORK ----------
def work1():
    p = PAIRS6[0]
    strip = ''.join(f'''<li><button class="fs" type="button" data-i="{k}" aria-pressed="{'true' if k == 0 else 'false'}"><img src="{H}work-{q['id']}-a-1000.webp" width="1000" height="625" alt="" loading="lazy" decoding="async"><span>{e(q['place'].split(',')[0])}</span><b>{q['band']}</b></button></li>''' for k, q in enumerate(PAIRS6))
    data = json.dumps([dict(id=q['id'], place=q['place'], when=q['when'], what=q['what'], band=q['band'], bl=q['bl'], href=q['href'], ab=q['ab'].replace('—', ','), aa=q['aa'].replace('—', ',')) for q in PAIRS6], ensure_ascii=False).replace('</', '<\\/')
    return f'''<div class="v work-1" data-tone="ground">
  <h2 class="h2x" data-split>Before, after, and the price</h2>
  <figure class="cmp" data-cmp style="--split:50%">
    {pimg(p, 'a', 'cmp-a')}{pimg(p, 'b', 'cmp-b')}
    <span class="cmp-line" aria-hidden="true"></span>
    <button class="cmp-handle" type="button" role="slider" aria-label="Before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="Half before, half after"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg></button>
    <span class="ptag ptag-b" aria-hidden="true">Before</span><span class="ptag ptag-a" aria-hidden="true">After</span>
    <i class="pane pane-tl"></i><i class="pane pane-tr"></i><i class="pane pane-bl"></i><i class="pane pane-br"></i>
  </figure>
  <div class="cmp-info" aria-live="polite"><p class="cmp-price num">{p['band']}</p><p class="cmp-what"><b>{e(p['bl'])}, {e(p['place'])}</b><span>{e(p['what'])}, {e(p['when'])}. <a class="tlink" href="{p['href']}" target="_blank" rel="noopener">Job file</a></span></p></div>
  <ul class="fstrip" aria-label="Choose a job">{strip}</ul>
  <script type="application/json" class="pairs-data">{data}</script>
</div>'''


def work2():
    four = PAIRS6[:4]
    frames = ''.join(f'''<li class="sc" data-k="{k}">
      <figure class="sc-fig">{pimg(q, 'a', 'sc-a')}{pimg(q, 'b', 'sc-b')}<span class="ptag ptag-b" aria-hidden="true">Before</span><span class="ptag ptag-a" aria-hidden="true">After</span>
        <button class="sc-toggle btn btn-glass btn-sm" type="button" aria-pressed="false">Show after</button></figure>
      <div class="sc-txt"><p class="sc-price num">{q['band']}</p><p><b>{e(q['bl'])}, {e(q['place'])}</b><br>{e(q['what'])}, {e(q['when'])}</p></div>
    </li>''' for k, q in enumerate(four))
    return f'''<div class="v work-2" data-tone="night">
  <div class="sc-wrap">
    <div class="sc-head"><h2 class="h2x" data-split>Scroll to install</h2><p class="sc-count" aria-hidden="true"><span>1</span> of 4</p></div>
    <ol class="sc-list">{frames}</ol>
  </div>
</div>'''


def work3():
    tiles = ''.join(f'''<li class="sp sp-{k}">
      <figure class="sp-fig" data-spot>{pimg(q, 'a', 'sp-a')}{pimg(q, 'b', 'sp-b')}
        <button class="sp-toggle btn btn-glass btn-sm" type="button" aria-pressed="false">Show before</button></figure>
      <p class="sp-cap"><b>{e(q['place'])}</b><span>{e(q['bl'])} {q['band']}, {e(q['when'])}</span></p>
    </li>''' for k, q in enumerate(PAIRS6))
    return f'''<div class="v work-3" data-tone="ground">
  <div class="sp-head"><h2 class="h2x" data-split>Look through to the before</h2><p class="sp-hint" data-fine-only>Move over a photo. The lens shows the same wall before the job.</p></div>
  <ul class="spots">{tiles}</ul>
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


def swatches(cls='sw', with_names=False):
    out = ''
    for n, c, h in SW:
        nm = f'<span>{e(n)}</span>' if with_names else ''
        out += f'<button class="{cls}" type="button" role="radio" aria-checked="false" data-hex="{h}" data-name="{e(n)}" data-code="{e(c)}" style="--c:{h}" aria-label="{e(n)}, {e(c)}"><i aria-hidden="true"></i>{nm}</button>'
    return out


def cplus(cls='sw', with_names=False):
    out = ''
    for n, c, h in COLORPLUS:
        nm = f'<span>{e(n)}</span>' if with_names else ''
        out += f'<button class="{cls}" type="button" role="radio" aria-checked="false" data-hex="{h}" data-name="{e(n)}" data-code="James Hardie ColorPlus" style="--c:{h}" aria-label="{e(n)}, James Hardie ColorPlus"><i aria-hidden="true"></i>{nm}</button>'
    return out


def parts_seg(pref):
    return f'''<div class="seg" role="radiogroup" aria-label="Part of the house">
      <button type="button" role="radio" aria-checked="true" data-part="body">Siding</button><button type="button" role="radio" aria-checked="false" data-part="gable">Gable</button><button type="button" role="radio" aria-checked="false" data-part="trim">Trim</button></div>'''


def colour1():
    return f'''<div class="v colour-1" data-tone="ground">
  <div class="c1-head"><h2 class="h2x" data-split>Repaint a real Austin house</h2>
    <p class="c1-now" aria-live="polite"><b data-now-name>The real job.</b> <span data-now-code>Pick a part, then a colour.</span></p></div>
  <div class="c1-wrap">{studio_frame()}
    <div class="dock-wrap">
      {parts_seg('c1')}
      <div class="seg seg-set" role="radiogroup" aria-label="Paint range"><button type="button" role="radio" aria-checked="true" data-set="sw">Sherwin-Williams</button><button type="button" role="radio" aria-checked="false" data-set="cp">ColorPlus</button></div>
      <div class="dock" role="radiogroup" aria-label="Sherwin-Williams colours" data-set-list="sw">{swatches('sw')}</div>
      <div class="dock" role="radiogroup" aria-label="James Hardie ColorPlus colours" data-set-list="cp" hidden>{cplus('sw')}</div>
    </div>
  </div>
  <p class="fine">A colour preview on the job's own photo, using colours the firm publishes. Real paint reads differently in Texas sun.</p>
</div>'''


def colour2():
    chips = ''
    for n, c, h in SW[:9] + [COLORPLUS[i] for i in (0, 2, 4, 10, 12, 16)]:
        code = c if c != 'ColorPlus' else 'James Hardie ColorPlus'
        chips += f'<li><button class="chip-paint" type="button" aria-pressed="false" data-hex="{h}" data-name="{e(n)}" data-code="{e(code)}" style="--c:{h}"><i aria-hidden="true"></i><span>{e(n)}</span></button></li>'
    return f'''<div class="v colour-2" data-tone="ground2">
  <div class="c2-grid">
    <div class="c2-house">{studio_frame('<span class="c2-drop" aria-hidden="true"></span>')}
      <div class="c2-zbtns" role="group" aria-label="Paint the selected colour on"><button type="button" data-zone-btn="body">Siding</button><button type="button" data-zone-btn="gable">Gable</button><button type="button" data-zone-btn="trim">Trim</button></div>
    </div>
    <div class="c2-side">
      <h2 class="h2x" data-split>Drag a colour onto the house</h2>
      <p class="c2-how" aria-live="polite">Drag a chip onto the siding, gable or trim. Or tap a chip, then tap the house.</p>
      <ul class="chips-paint" aria-label="Paint colours">{chips}</ul>
      <button class="tlink c2-reset" type="button">Back to the real colours</button>
    </div>
  </div>
</div>'''


def colour3():
    return f'''<div class="v colour-3" data-tone="night">
  <div class="c3-head"><h2 class="h2x" data-split>Your colour beside the real one</h2></div>
  <div class="c3-stage">{studio_frame('<span class="c3-line" aria-hidden="true"></span><button class="c3-handle" type="button" role="slider" aria-label="Move the line between the real house and your colour" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg></button><span class="ptag ptag-b" aria-hidden="true">Real</span><span class="ptag ptag-a" aria-hidden="true">Yours</span><span class="ghost" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.6L10 19z"/></svg></span>')}</div>
  <div class="c3-row" role="radiogroup" aria-label="Siding colour">{swatches('sw sw-lg', True)}</div>
  <p class="c3-now num" aria-live="polite"></p>
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
    <figure class="n1-map">{map_svg()}<div class="m-tip" hidden></div></figure>
  </div>
</div>'''


def near2():
    mx = max(t[3] for t in TOWN_TOP)
    rows = ''.join(f'''<li><button class="tw" type="button" aria-pressed="false" data-town="{e(n)}" data-x="{x}" data-y="{y}"><span class="tw-n">{e(n)}</span><span class="tw-c num">{c}</span><i style="--w:{max(c / mx, .02):.3f}" aria-hidden="true"></i></button></li>'''
                   for n, x, y, c in sorted(TOWN_TOP, key=lambda t: -t[3]))
    return f'''<div class="v near-2" data-tone="ground">
  <div class="n2-grid">
    <div class="n2-list">
      <h2 class="h2x" data-split>Probably near your street</h2>
      <p class="n2-sub">Documented jobs by city, 2018-2026. Pick one to light it up on the map.</p>
      <ul class="towns">{rows}</ul>
    </div>
    <figure class="n2-map">{map_svg('map-svg map-light')}<figcaption class="n2-cap" aria-live="polite">312 photographed jobs shown</figcaption></figure>
  </div>
</div>'''


def near3():
    return f'''<div class="v near-3" data-tone="ground2">
  <div class="n3-top">
    <h2 class="h2x" data-split>Where is your house?</h2>
    {finder('n3', 'Type your neighbourhood or town', big=True)}
  </div>
  <figure class="n3-map">{map_svg('map-svg map-light')}</figure>
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


def review_card(r, n=170, from_name=False):
    t = at_name(r['text'], n) if from_name else cut(r['text'], n)
    return f'<figure class="rv"><blockquote><p>“{mark(t)}”</p></blockquote><figcaption>{e(r["name"])}<span>Google review, 2026</span></figcaption></figure>'


def stars():
    s = '<path d="M10 1.6l2.47 5.3 5.8.62-4.32 3.93 1.2 5.7L10 14.3l-5.15 2.85 1.2-5.7L1.73 7.52l5.8-.62z"/>'
    return '<span class="stars" aria-hidden="true">' + ''.join(f'<svg viewBox="0 0 20 20">{s}</svg>' for _ in range(5)) + '</span>'


def reviews1():
    pick = [REVIEWS[i] for i in (17, 26, 10, 0, 15, 28, 14, 3, 29, 9, 21, 25)]
    a, b = pick[:6], pick[6:]
    row = lambda rs, cls: f'<div class="mq {cls}"><div class="mq-track">' + ''.join(review_card(r, 96) for r in rs) + '</div></div>'
    return f'''<div class="v reviews-1" data-tone="ground">
  <div class="r1-head"><h2 class="h2x" data-split>What homeowners write</h2><p class="rating"><b class="num">4.9</b>{stars()}<span>474 Google reviews</span></p>
    <button class="btn btn-line btn-sm mq-pause" type="button" aria-pressed="false">Pause</button></div>
  <div class="mqs" aria-label="30 review excerpts published on austinprosiding.com">{row(a, 'mq-a')}{row(b, 'mq-b')}</div>
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
    for i, q in ONE:
        assert q.rstrip('.!') in REVIEWS[i]['text'], (i, q)
    data = json.dumps([dict(q=q, n=REVIEWS[i]['name']) for i, q in ONE], ensure_ascii=False).replace('</', '<\\/')
    i0, q0 = ONE[0]
    return f'''<div class="v reviews-2" data-tone="ground2">
  <h2 class="h2s">From 474 Google reviews, rated 4.9</h2>
  <figure class="one">
    <blockquote class="one-q"><p>“{mark(q0)}”</p></blockquote>
    <figcaption class="one-n">{e(REVIEWS[i0]['name'])}<span>Google review, 2026</span></figcaption>
  </figure>
  <div class="one-ctl"><button class="rb" type="button" data-dir="-1" aria-label="Previous review"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button><p class="one-k num"><span>1</span> of {len(ONE)}</p><button class="rb" type="button" data-dir="1" aria-label="Next review"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>
  <p class="sr-only" aria-live="polite" data-one-say></p>
  <script type="application/json" class="one-data">{data}</script>
</div>'''


def reviews3():
    names = ''.join(f'<button class="nm" type="button" role="radio" aria-checked="false" data-name="{e(n)}">{e(n)}<span class="num">{CREW_COUNT[n]}</span></button>' for n, _ in CREW)
    cards = ''.join(f'<li class="nw" data-names="{e("|".join(crew_of(r["text"])))}">{review_card(r, 230, from_name=True)}</li>' for r in REVIEWS)
    return f'''<div class="v reviews-3" data-tone="ground">
  <div class="r3-grid">
    <div class="r3-side">
      <h2 class="h2x" data-split>The names homeowners write down</h2>
      <p class="r3-sub">Pick a name to read the reviews that mention them. Counts are from the 30 excerpts the firm publishes.</p>
      <div class="names" role="radiogroup" aria-label="Filter reviews by crew name"><button class="nm" type="button" role="radio" aria-checked="true" data-name="">All<span class="num">30</span></button>{names}</div>
    </div>
    <div class="nw-col">
      <ul class="nwall">{cards}</ul>
      <p class="nw-say" aria-live="polite"></p>
      <button class="btn btn-line nw-more" type="button" hidden>Show more</button>
    </div>
  </div>
</div>'''


# ---------- MONEY ----------
TERMS = [(0, 24, '0% APR', '24 months'), (.0499, 60, '4.99% APR', '60 months'), (.0799, 120, '7.99% APR', '120 months')]


def terms(name):
    return ''.join(f'''<button class="term" type="button" role="radio" aria-checked="{'true' if n == 120 else 'false'}" data-apr="{apr}" data-n="{n}"><b>{a}</b><span>{m}</span>{'<i>Lowest monthly</i>' if n == 120 else ''}</button>''' for apr, n, a, m in TERMS)


FINE = 'On approved credit through GreenSky; not everyone qualifies. The firm\'s own example: $15,000 at 7.99% APR for 120 months is 120 payments of $181.91.'


def money1():
    return f'''<div class="v money-1" data-tone="ground">
  <h2 class="h2x" data-split>The monthly maths, done</h2>
  <div class="m1-grid">
    <div class="m1-fig"><p class="m1-big num" aria-hidden="true"><span class="odo" data-odo>$181.91</span><small>/mo</small></p><p class="m1-sub" data-m1-sub>$15,000 over 120 months at 7.99% APR</p><p class="sr-only" aria-live="polite" data-sr>$181.91 a month</p></div>
    <div class="m1-ctl">
      <label class="lab" for="m1-amt">Project amount <output class="num" for="m1-amt">$15,000</output></label>
      <input class="range" id="m1-amt" type="range" min="2000" max="50000" step="500" value="15000" aria-valuetext="$15,000">
      <div class="terms" role="radiogroup" aria-label="Payment plan">{terms('m1')}</div>
      <p class="fine">{FINE}</p>
    </div>
  </div>
</div>'''


def money2():
    cols = ''.join(f'<li data-apr="{apr}" data-n="{n}"><p class="m2-amt num">-</p><p class="m2-plan"><b>{a}</b> for {m}</p></li>' for apr, n, a, m in TERMS)
    return f'''<div class="v money-2" data-tone="night">
  <div class="m2-top">
    <h2 class="h2x" data-split>Start from a monthly budget</h2>
    <div class="m2-ctl"><label class="lab" for="m2-mo">I can put aside <output class="num" for="m2-mo">$250</output> a month</label>
      <input class="range" id="m2-mo" type="range" min="100" max="800" step="10" value="250" aria-valuetext="$250 a month"></div>
  </div>
  <ul class="m2-cols" aria-live="polite">{cols}</ul>
  <p class="m2-ref">For scale: most siding jobs land between $5k and $20k, most window jobs between $5k and $25k.</p>
  <p class="fine">{FINE}</p>
</div>'''


def money3():
    return f'''<div class="v money-3" data-tone="ground2">
  <div class="m3-grid">
    <div class="m3-side">
      <h2 class="h2x" data-split>Three discounts, stacked</h2>
      <p>The firm's own example: a $30,000 project with all three comes to $22,500.</p>
      <div class="m3-opts">
        <label class="tick"><input type="checkbox" data-pct="5" checked><span>Hometown Heroes: veterans and military, teachers, seniors, first responders</span></label>
        <label class="tick"><input type="checkbox" data-pct="10" checked><span>Pay in full by cash, check or ACH (not with financing)</span></label>
      </div>
    </div>
    <div class="receipt" aria-live="polite">
      <p class="rc-h">Your estimate</p>
      <div class="rc-line rc-amt"><span>Project</span><label class="rc-in"><span class="sr-only">Project amount in dollars</span>$<input type="text" inputmode="numeric" value="30,000" autocomplete="off"></label></div>
      <div class="rc-line" data-line="10"><span>Holiday Savings, through November 30</span><b>-10%</b></div>
      <div class="rc-line" data-line="5"><span>Hometown Heroes</span><b>-5%</b></div>
      <div class="rc-line" data-line="p"><span>Pay in full</span><b>-10%</b></div>
      <div class="rc-tot"><span>You pay</span><b class="num"><s data-was>$30,000</s> <span class="odo" data-odo>$22,500</span></b></div>
      <p class="rc-save num">You save <b data-save>$7,500</b></p>
    </div>
  </div>
</div>'''


# ---------- BOOK ----------
BOOK_TRADES = ['Siding', 'Windows', 'Shingle roofing', 'Metal roofing', 'Exterior doors', 'Garage doors', 'Gutters', 'Patio covers', 'Exterior painting', 'Decking', 'Storm damage']
BANDS = ['Under $5k', '$5k-$10k', '$10k-$15k', '$15k-$20k', '$20k or more', 'Not sure yet']


def form(pref, theme=''):
    chips = ''.join(f'<label class="ck"><input type="checkbox" name="trade" value="{t}"><span>{t}</span></label>' for t in BOOK_TRADES)
    radios = ''.join(f'<label class="ck"><input type="radio" name="{pref}-band" value="{b}"><span>{b}</span></label>' for b in BANDS)
    return f'''<form class="bk {theme}" data-form novalidate aria-label="Request a free inspection">
      <p class="bk-k num" aria-live="polite"><span>1</span> of 3</p>
      <fieldset class="bk-step is-on" data-step="1"><legend>What should we look at?</legend>
        <div class="cks">{chips}</div><p class="bk-err" id="{pref}-e1" hidden>Pick at least one, so the right person comes out.</p></fieldset>
      <fieldset class="bk-step" data-step="2" hidden><legend>Roughly what budget?</legend>
        <div class="cks">{radios}</div><p class="bk-err" id="{pref}-e2" hidden>Pick a band, or "Not sure yet".</p></fieldset>
      <fieldset class="bk-step" data-step="3" hidden><legend>Where should we call you?</legend>
        <div class="fld"><label for="{pref}-name">First name</label><input id="{pref}-name" name="name" autocomplete="given-name" required aria-describedby="{pref}-name-e"><p class="bk-err" id="{pref}-name-e" hidden>Add your first name.</p></div>
        <div class="fld"><label for="{pref}-tel">Phone</label><input id="{pref}-tel" name="tel" type="tel" autocomplete="tel" inputmode="tel" required aria-describedby="{pref}-tel-e"><p class="bk-err" id="{pref}-tel-e" hidden>Phone numbers have 10 digits, like (512) 550-0000.</p></div>
        <div class="fld"><label for="{pref}-zip">ZIP code</label><input id="{pref}-zip" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="5" required aria-describedby="{pref}-zip-e"><p class="bk-err" id="{pref}-zip-e" hidden>ZIP codes have 5 digits, like 78752.</p></div>
      </fieldset>
      <div class="bk-done" tabindex="-1" hidden><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 25l7 7 15-16"/></svg><p class="bk-done-h">Request saved, <span data-done-name>thanks</span></p><p>The office calls you back to pick a time: Monday to Friday 8 AM to 8 PM, Saturday 8 AM to 6 PM, Sunday noon to 5 PM.</p><p class="fine">Concept site: this form is a working prototype and sends nothing.</p></div>
      <div class="bk-nav"><button class="bk-back tlink" type="button" hidden>Back</button><button class="btn btn-ink bk-next" type="button">Continue</button><button class="btn btn-red bk-send" type="submit" hidden>Request my inspection</button></div>
    </form>'''


def book1():
    return f'''<div class="v book-1" data-tone="red">
  <h2 class="h2x b1-h" data-split>See your price in writing</h2>
  <p class="b1-sub">Free inspection, 30 to 60 minutes, no obligation. You get the scope, materials and price.</p>
  <a class="b1-tel" href="{TEL}">{PHONE}</a>
  <p class="b1-hours">Monday to Friday 8 AM to 8 PM, Saturday 8 AM to 6 PM, Sunday noon to 5 PM</p>
  <div class="b1-act"><button class="btn btn-white b1-open" type="button" aria-expanded="false" aria-controls="b1-panel">Book free inspection online</button></div>
  <div class="b1-panel" id="b1-panel" hidden>{form('b1', 'bk-card')}</div>
</div>'''


def book2():
    return f'''<div class="v book-2" data-tone="ground">
  <div class="b2-grid">
    <figure class="b2-ph">{img(H + 'book-1000.webp', 1000, 625, alt(HOME_PAIRS[0]['aa']))}<figcaption>{e(HOME_PAIRS[0]['p'])}, {e(HOME_PAIRS[0]['w'])}. {e(HOME_PAIRS[0]['bl'])} {band(HOME_PAIRS[0]['b'])}</figcaption></figure>
    <div class="b2-form"><h2 class="h2x" data-split>See your price in writing</h2><p class="b2-sub">Free inspection, 30 to 60 minutes, no obligation. Or call <a class="tlink" href="{TEL}">{PHONE}</a>.</p>{form('b2', 'bk-card')}</div>
  </div>
</div>'''


def book3():
    return f'''<div class="v book-3" data-tone="night">
  <h2 class="sr-only">Book a free inspection</h2>
  {form('b3', 'bk-chat')}
  <p class="b3-call">Rather talk? <a class="tlink on-dark" href="{TEL}">{PHONE}</a></p>
</div>'''


# ---------- page ----------
SECTIONS = [
    ('hero', 'Hero', [hero1, hero2, hero3], ['Full-bleed', 'Window', 'Paint it']),
    ('proof', 'Proof', [proof1, proof2, proof3], ['Counter index', 'Photo wall', 'Statement']),
    ('services', 'Services', [services1, services2, services3], ['Index', 'Slices', 'Budget']),
    ('work', 'Work', [work1, work2, work3], ['Slider', 'Scroll', 'Spotlight']),
    ('colour', 'Colour', [colour1, colour2, colour3], ['Dock', 'Drag paint', 'Split']),
    ('near', 'Near you', [near1, near2, near3], ['Map', 'Towns', 'Search']),
    ('reviews', 'Reviews', [reviews1, reviews2, reviews3], ['Stream', 'One', 'Names']),
    ('money', 'Money', [money1, money2, money3], ['Amount', 'Budget', 'Receipt']),
    ('book', 'Book', [book1, book2, book3], ['Call', 'Form', 'Chat']),
]


def section(key, label, fns, names):
    vs = [f() for f in fns]
    tabs = ''.join(f'<button class="vsw-b" type="button" role="tab" id="{key}-tab{n}" aria-selected="{"true" if n == 1 else "false"}" aria-controls="{key}-stage" tabindex="{0 if n == 1 else -1}" data-v="{n}" aria-label="{label} version {n}: {e(nm)}">{n}</button>'
                   for n, nm in enumerate(names, 1))
    tpl = ''.join(f'<template data-v="{n}">{v}</template>' for n, v in enumerate(vs, 1))
    return f'''<section class="sec sec-{key}" id="{key}" data-sec="{key}" data-names="{e('|'.join(names))}" aria-label="{label}">
  <div class="vsw" role="tablist" aria-label="{label} versions"><span class="vsw-l" aria-hidden="true"><b>{label}</b> <span>{e(names[0])}</span></span>{tabs}</div>
  <div class="stage" id="{key}-stage" role="tabpanel" aria-labelledby="{key}-tab1">{vs[0]}</div>
  {tpl}
</section>'''


def head():
    ld = {"@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", "name": "Austin Pro Siding, Windows & Roofing",
          "telephone": "+1-512-550-0000", "email": EMAIL, "url": LIVE,
          "address": {"@type": "PostalAddress", "streetAddress": "7801 N Lamar Blvd, Suite C70", "addressLocality": "Austin", "addressRegion": "TX", "postalCode": "78752", "addressCountry": "US"},
          "openingHours": ["Mo-Fr 08:00-20:00", "Sa 08:00-18:00", "Su 12:00-17:00"], "foundingDate": "2009"}
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
  <a class="hd-logo" href="#main" aria-label="Austin Pro Siding, Windows and Roofing, top of page"><img src="assets/img/logo-color.webp" width="1080" height="200" alt=""></a>
  <nav class="hd-nav" aria-label="Sections">{nav}</nav>
  <a class="hd-tel" href="{TEL}">{PHONE}</a>
  <a class="btn btn-red btn-sm hd-book" href="#book" data-book aria-label="Book free inspection"><span class="long">Book free inspection</span><span class="short" aria-hidden="true">Book</span></a>
  <button class="hd-menu" type="button" aria-expanded="false" aria-controls="sheet">Menu</button>
</header>
<div class="sheet" id="sheet" hidden><nav aria-label="Sections, mobile">{nav}<a href="#book">Book free inspection</a><a href="{TEL}">Call {PHONE}</a></nav></div>
'''


def picks():
    rows = ''.join(f'''<li><span>{label}</span><div class="pk-seg" role="radiogroup" aria-label="{label} version" data-for="{key}">{''.join(f'<button type="button" role="radio" aria-checked="{"true" if n == 1 else "false"}" data-v="{n}" title="{e(nm)}">{n}</button>' for n, nm in enumerate(names, 1))}</div></li>''' for key, label, _f, names in SECTIONS)
    return f'''<div class="picks">
  <button class="pk-btn" type="button" aria-expanded="false" aria-controls="pk-panel"><span>Your picks</span><b class="num" data-pk-code>111 111 111</b></button>
  <div class="pk-panel" id="pk-panel" role="dialog" aria-label="Your picks" hidden>
    <p class="pk-h">Your picks</p>
    <p class="pk-tip">Switch any section here or with its 1 2 3 buttons. Keys 1, 2 and 3 switch the section in view.</p>
    <ul class="pk-list">{rows}</ul>
    <label class="pk-motion"><input type="checkbox" data-motion checked><span>Motion</span></label>
    <div class="pk-act"><button class="btn btn-ink btn-sm" type="button" data-copy>Copy my picks</button><button class="tlink" type="button" data-reset>Reset</button></div>
    <p class="pk-msg" aria-live="polite"></p>
  </div>
</div>'''


def footer():
    return f'''<footer class="ft" data-tone="night">
  <div class="ft-top"><img class="ft-logo" src="assets/img/logo-white.webp" width="500" height="93" alt="Austin Pro Siding, Windows and Roofing" loading="lazy">
    <p class="ft-big"><a href="{TEL}">{PHONE}</a></p></div>
  <div class="ft-grid">
    <p><b>Office</b>7801 N Lamar Blvd, Suite C70<br>Austin, TX 78752</p>
    <p><b>Hours</b>Monday to Friday 8 AM to 8 PM<br>Saturday 8 AM to 6 PM<br>Sunday noon to 5 PM</p>
    <p><b>Write</b><a href="mailto:{EMAIL}">{EMAIL}</a></p>
    <nav aria-label="Footer"><b>On this page</b><a href="#work">Work</a><a href="#colour">Colour</a><a href="#near">Near you</a><a href="#money">Financing</a><a href="#book">Book</a></nav>
  </div>
  <p class="ft-note">Concept redesign for a design portfolio, not affiliated with or endorsed by Austin Pro Siding, Windows &amp; Roofing. Every figure, photo and colour comes from austinprosiding.com, read 29 Oct 2026. Financing on approved credit through GreenSky. Prices are materials and labour before discounts, excluding tax.</p>
</footer>'''


def build():
    body = head() + header() + '<main id="main">\n' + ''.join(section(k, l, f, n) for k, l, f, n in SECTIONS) + '</main>\n' + footer() + picks()
    data = json.dumps(dict(map=MAPDATA, sw=SW, cp=COLORPLUS), ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    body += f'\n<script type="application/json" id="home-data">{data}</script>\n'
    body += '<script src="assets/js/gsap.min.js" defer></script>\n<script src="assets/js/ScrollTrigger.min.js" defer></script>\n<script src="assets/js/Flip.min.js" defer></script>\n<script src="assets/js/lenis.min.js" defer></script>\n<script src="assets/js/home.js" defer></script>\n</body>\n</html>\n'
    out = clean(body)
    with open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(out)
    words = len(re.sub(r'<[^>]+>', ' ', re.sub(r'<template.*?</template>|<script.*?</script>|<style.*?</style>', ' ', out, flags=re.S)).split())
    print('index.html', len(out) // 1024, 'KB; visible words in the default mix (approx):', words)


if __name__ == '__main__':
    build()
