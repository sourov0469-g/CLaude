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
    hero = '<a class="btn btn-red" href="#book" data-book data-cur="hero">Book free inspection</a>'
    return f'<div class="ctas">{mag(hero)}<a class="tlink{" on-dark" if dark else ""}" href="#work">See the work</a></div>'


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


def hero1():
    """Q38 SVG mask transitions / R6 blinds (30 slits, stagger 0.02) over a true before/after pair"""
    rb, ra = f'{H}../pairs/robroy-hb', f'{H}../pairs/robroy-ha'
    strips = ''.join(f'<i class="crs" style="--k:{k}"><img src="{ra}-1440.webp" srcset="{ra}-760.webp 760w, {ra}-1440.webp 1440w" sizes="100vw" width="1440" height="900" alt="" decoding="async"></i>' for k in range(30))
    return f'''<div class="v hero-1" data-tone="photo">
  <figure class="h1-frame" role="img" aria-label="Rob Roy, Austin: {alt(ROB['before']['alt'])}, then {alt(ROB['after']['alt'])}">
    <div class="h1-photo" data-depth="-1">
      <img class="h1-b" src="{rb}-1440.webp" srcset="{rb}-760.webp 760w, {rb}-1440.webp 1440w" sizes="100vw" width="1440" height="900" alt="" fetchpriority="high">
      <div class="h1-courses" aria-hidden="true">{strips}</div>
    </div>
    <figcaption class="pchip h1-chip" data-depth="0.42"><span>Rob Roy, Austin, {ROB['when']}</span><b>{e(ROB['bl'])} {band(ROB['band'])}</b></figcaption>
    <button class="h1-replay btn btn-glass btn-sm" type="button" data-cur="link">Re-side it again</button>
  </figure>
  <div class="h1-copy" data-depth="0.18">{pstrip()}{H1}{LEAD}{ctas(True)}</div>
</div>'''


H2_TRADES = ['siding', 'windows', 'shingle-roofing', 'exterior-painting']
BOOK_AS = {'siding': 'Siding', 'windows': 'Windows', 'shingle-roofing': 'Shingle roofing', 'exterior-painting': 'Exterior painting'}


def hero2():
    """Stronghold crown 1: proof strip above the headline, the hero is step one of the quote (photo cards); Neil Kelly
    project picker. Step two shows the trade's published median band, middle half and monthly estimate."""
    data, cards = {}, ''
    for k, s in enumerate(H2_TRADES):
        t = TBY[s]
        lo, hi = t['med']
        data[s] = dict(name=t['name'], n=f"{t['n']}", med=med(t), mid=f"${t['lo']}k and ${t['hi']}k", mo=f"${pmt(lo * 1000):.0f}-${pmt(hi * 1000):.0f}",
                       img=tphoto(s), alt=alt(PHOTOS[TRADE_PHOTO[s]]['alt']), cap=tcap(s), book=BOOK_AS[s])
        cards += (f'<li><a class="h2c" href="#services" data-t="{s}" data-cur="view" data-cur-label="See prices">'
                  f'{img(tphoto(s), 800, 600, "", "h2c-img", eager=k < 2)}<span class="h2c-n">{t["name"]}</span>'
                  f'<span class="h2c-go">See the price range</span></a></li>')
    f = data['siding']
    js = json.dumps(data).replace('</', '<\\/')
    return f'''<div class="v hero-2" data-tone="ground" data-step="1">
  <div class="h2-top">{pstrip()}{H1}<p class="lead">886 documented jobs around Austin, each with its real price. Pick your project to see what it usually costs.</p></div>
  <div class="h2-step1">
    <p class="h2-k"><span class="h2-steps" aria-hidden="true"><i class="on"></i><i></i></span>Step 1 of 2: pick your project</p>
    <ul class="h2-cards">{cards}</ul>
    <p class="h2-more">Gutters, doors, patio covers, metal roofing, decking or storm damage? <a href="#services">See all eleven trades</a>. One free inspection covers every trade on the house, or call <a href="tel:{TEL}">{PHONE}</a>.</p>
  </div>
  <div class="h2-res" hidden>
    <figure class="h2r-fig"><img data-f="img" src="{f['img']}" width="800" height="600" alt="{f['alt']}" loading="lazy" decoding="async"><figcaption class="h2r-cap" data-f="cap">{e(f['cap'])}</figcaption></figure>
    <div class="h2r-copy">
      <p class="h2-k"><span class="h2-steps" aria-hidden="true"><i class="on"></i><i class="on"></i></span>Step 2 of 2</p>
      <h2 class="h2r-h" tabindex="-1" data-f="head"><span data-f="name">{f['name']}</span>: what Austin Pro jobs cost</h2>
      <p class="h2r-med"><span>Median job, from <b data-f="n">{f['n']}</b> priced jobs</span><b class="num" data-f="med">{f['med']}</b></p>
      <p class="h2r-mid">Half of them landed between <span data-f="mid">{f['mid']}</span>. Materials and labour, before discounts and tax.</p>
      <p class="h2r-mo">About <b data-f="mo">{f['mo']}</b> a month at 7.99% APR over 120 months, on approved credit.</p>
      <div class="h2r-cta"><a class="btn btn-red" href="#book" data-book data-trade="{f['book']}" data-cur="hero" data-f="book">Book a free siding inspection</a><button class="tlink h2r-back" type="button" data-f="back">Pick another project</button></div>
    </div>
  </div>
  <script type="application/json" class="h2-data">{js}</script>
</div>'''


H3F = [3, 15, 41, 18, 37]


def hero3():
    """Feldco crown 2: hero media of real work under a dated line + a stat row in trade units counting up (R33 poster
    frames; R20). Photos, not the live site's film (FACTS: the film cannot be verified as an Austin Pro job)."""
    frames = ''.join(f'<img class="h3f{" on" if k == 0 else ""}" src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="{alt(PHOTOS[i]["alt"])}" '
                     + ('fetchpriority="high"' if k == 0 else 'loading="lazy"') + ' decoding="async">' for k, i in enumerate(H3F))
    caps = [f"{PHOTOS[i]['place']}, {PHOTOS[i]['when']}. {PHOTOS[i]['trades']}" for i in H3F]
    stats = [('5,000+', 'Central Texas homeowners served'), ('431', 'siding jobs documented'), ('388', 'window jobs documented'),
             ('210', 'shingle roofs documented'), ('4.9', 'on 474 Google reviews')]
    li = ''.join(f'<li><b class="num">{n}</b><span>{e(t)}</span></li>' for n, t in stats)
    return f'''<div class="v hero-3" data-tone="ground">
  <div class="h3-panel">
    <div class="h3-frames" role="group" aria-label="Five recent Austin Pro jobs">{frames}</div>
    <div class="h3-copy">{pstrip()}<p class="h3-date">Austin's siding, window and roofing crew since 2009</p>{H1}{LEAD}{ctas(True)}</div>
    <div class="h3-cap"><p class="h3-chip"><span class="num"><b data-h3-no>01</b> of {len(H3F):02d}</span><span data-h3-cap>{e(caps[0])}</span></p><button class="h3-pause btn btn-glass btn-sm" type="button" aria-pressed="false">Pause</button></div>
  </div>
  <ul class="h3-stats" aria-label="Austin Pro in numbers">{li}</ul>
  <script type="application/json" class="h3-data">{json.dumps(caps)}</script>
</div>'''


# ---------- PROOF ----------
CREDS = [('gaf-master-elite', 'GAF Master Elite', 357, 112), ('hardie-elite-preferred', 'James Hardie Elite Preferred', 300, 98),
         ('hardie-presidents-club-2025', "James Hardie President's Club Award 2025", 140, 176),
         ('andersen-certified-premier', 'Andersen Certified Contractor, Premier', 176, 168),
         ('guildmaster-service-excellence', 'GuildQuality Guildmaster', 205, 164), ('bbb-a-plus', 'BBB Accredited, A+', 185, 120)]


def creds(cls='creds'):
    return f'<ul class="{cls}" aria-label="Certified, accredited and awarded">' + ''.join(
        f'<li><img src="assets/img/{f}.webp" width="{w}" height="{h}" alt="{e(n)}" loading="lazy" decoding="async"></li>' for f, n, w, h in CREDS) + '</ul>'


def ring49():
    r = 40
    c = 2 * 3.14159265 * r
    return (f'<svg class="r49" viewBox="0 0 100 100" aria-hidden="true"><circle class="r49-t" cx="50" cy="50" r="{r}"/>'
            f'<circle class="r49-v" cx="50" cy="50" r="{r}" style="--c:{c:.2f}; --off:{c * (1 - 4.9 / 5):.2f}"/></svg>')


def proof1():
    """#317 Digital Butlers "Proof, not promises" band (counts stated beside the offer) + anatomy F12 checkable arithmetic"""
    return f'''<div class="v proof-1 has-bgf" data-tone="ground">
  <div class="bgf" aria-hidden="true"><div class="p1-gw" data-depth="-0.7"><span class="p1-ghost">886</span></div></div>
  <h2 class="h2x" data-split>On record since 2009</h2>
  <div class="rec">
    <p class="rc rc-a"><b class="num" data-count>886</b><span>documented projects, 2018-2026, each with its price</span><span class="rc-sum num">312 on the map with photos + 574 more counted = 886</span></p>
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
    ('hardie-presidents-club-2025', "James Hardie President's Club Award 2025", 'Siding', 'Awarded by James Hardie for 2025.'),
    ('andersen-certified-premier', 'Andersen Certified Contractor, Premier', 'Windows', 'Certified by Andersen at the Premier level.'),
    ('guildmaster-service-excellence', 'GuildQuality Guildmaster', 'Service', 'Award for Service Excellence, four years in a row, 2015 through 2018.'),
    ('bbb-a-plus', 'BBB Accredited, A+', 'Business', 'Accredited Business, rated A+.'),
]


def proof2():
    """Georgia Contractor Group (CROWN, GC report): the "at a glance" credential table as the proof unit, installer
    tier above review volume (builder brief 2.3)"""
    dims = {f: (w, h) for f, n, w, h in CREDS}
    rows = ''.join(f'''<tr><td class="gl-b"><img src="assets/img/{f}.webp" width="{dims[f][0]}" height="{dims[f][1]}" alt="" loading="lazy" decoding="async"></td>
      <th scope="row">{e(n)}<span class="gl-t">{t}</span></th><td class="gl-m">{e(m)}</td></tr>''' for f, n, t, m in CRED_ROWS)
    base = [('In business', 'Since 2009. Austin Pro Siding &amp; Windows (2009) and Sanders Roofing &amp; Exteriors (2010) merged in 2018.'),
            ('Office', '7801 N Lamar Blvd, Suite C70, Austin, TX 78752'),
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
    return f'<span class="ipill" aria-hidden="true"><img src="{H}t/p{i}-320.webp" width="320" height="240" alt="" loading="lazy" decoding="async"></span>'


def proof3():
    return f'''<div class="v proof-3" data-tone="ground2">
  <h2 class="h2s">The short version</h2>
  <p class="statement" data-illuminate>Since 2009, Austin Pro has worked on <b>5,000+</b> Central Texas homes. <b>886</b> {pill(3)} of those jobs are documented, each with photos and a real price, and <b>177</b> {pill(22)} have a before and after. Homeowners rate the work <b>4.9</b> on <b>474</b> Google reviews.</p>
  <div class="stamps">{creds('creds creds-stamp')}{alt_btn('#book', 'Book free inspection')}</div>
</div>'''


# ---------- SERVICES ----------
# the six parts of the Rob Roy house the instrument can light, mapped to the firm's trades (FACTS.md counts and bands)
PARTS = [('siding', 'Siding', 'siding', 'Siding'), ('windows', 'Windows', 'windows', 'Windows'),
         ('roof', 'Roof', 'shingle-roofing', 'Shingle roofing'), ('trim', 'Trim and paint', 'exterior-painting', 'Exterior painting'),
         ('doors', 'Doors', 'doors', 'Exterior doors'), ('deck', 'Deck', 'decking', 'Decking')]


def services1():
    data = {}
    for key, label, slug, trade in PARTS:
        t = TBY[slug]
        cnt = f"{t['doc']} documented jobs" if t['doc'] else f"{t['n']} priced jobs"
        extra = ''
        if key == 'roof':
            m = TBY['metal-roofing']
            extra = f"Metal roofing: {m['doc'] or m['n']} jobs, median {med(m)}"
        data[key] = dict(label=label, trade=trade, cnt=cnt, med=med(t), mid=mid(t), img=tphoto(slug) if slug in TRADE_PHOTO else '', cap=tcap(slug) if slug in TRADE_PHOTO else '', extra=extra)
    btns = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" data-part="{key}">{label}</button>' for k, (key, label, *_r) in enumerate(PARTS))
    d0 = data['siding']
    js = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
    return f'''<div class="v services-1 has-bgf" data-tone="ground">
  <div class="pt-head"><h2 class="h2x" data-split>What needs work?</h2><p class="pt-sub">Point at the part of the house. Every number is from the firm's own job files.</p></div>
  <div class="pt-grid">
    <figure class="pt-fig" data-cur="view">{elevation.svg('ptel', 'elev pt-el', 'The Rob Roy house as a line drawing; each part of it opens the matching trade', hits=True)}</figure>
    <div class="pt-card" aria-live="polite">
      <div class="pt-parts" role="radiogroup" aria-label="Part of the house">{btns}</div>
      <p class="pt-trade" data-pt="trade">{d0['trade']}</p>
      <p class="pt-med num"><span>Median job</span><b data-pt="med">{d0['med']}</b></p>
      <p class="pt-cnt" data-pt="cnt">{d0['cnt']}</p>
      <p class="pt-extra" data-pt="extra" hidden></p>
      <figure class="pt-ph"><img data-pt="img" src="{d0['img']}" width="800" height="600" alt="{e(d0['cap'])}" loading="lazy" decoding="async"></figure>
      {btn_book('btn btn-ink pt-book', 'Book a free inspection', d0['trade'])}
    </div>
  </div>
  <script type="application/json" class="pt-data">{js}</script>
</div>'''


def services2():
    """Q571 AHA: the numbered services index (11 rows, 01 OF 11 counter by CSS counters, intro column left)"""
    rows = ''
    for slug in TRADE_ORDER:
        t = TBY[slug]
        cnt = f"{t['doc']} jobs" if t['doc'] else f"{t['n']} priced"
        im = f' data-img="{tphoto(slug)}"' if slug in TRADE_PHOTO else ''
        th = f'<img class="ix-th" src="{tphoto(slug)}" width="800" height="600" alt="" loading="lazy" decoding="async">' if slug in TRADE_PHOTO else '<span class="ix-th ix-th-none" aria-hidden="true"></span>'
        rows += f'''<li><a class="ix-row" href="#book" data-book data-cur="view" data-trade="{e(t['name'])}"{im} aria-label="{e(t['name'])}: {cnt}, median job {med(t)}. Book an inspection">
      <span class="ix-name" data-chars>{e(t['name'])}</span><span class="ix-meta"><span>{cnt}</span><b>Median {med(t)}</b></span>{th}</a></li>'''
    rows += '''<li><a class="ix-row" href="#book" data-book data-cur="view" data-trade="Storm damage" aria-label="Storm damage: free inspection, documented for your insurer. Book an inspection">
      <span class="ix-name" data-chars>Storm damage</span><span class="ix-meta"><span>Hail and wind</span><b>Free inspection</b></span><span class="ix-th ix-th-none" aria-hidden="true"></span></a></li>'''
    return f'''<div class="v services-2" data-tone="ground">
  <div class="ix-head"><h2 class="h2x" data-split>Eleven trades, one inspection</h2><p>Job counts and median prices from the firm's own documented jobs, 2018-2026.</p>
    <p class="ix-count num" aria-hidden="true"><b data-ix-now>01</b><span>of 11</span></p></div>
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
    <div class="tape-band"><div class="tape-strip" aria-hidden="true">{ticks}</div></div>
    <i class="tape-mark" aria-hidden="true"></i>
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
      <figure class="sp-fig" data-spot data-cur="view" data-cur-label="Before">{pimg(q, 'a', 'sp-a')}{pimg(q, 'b', 'sp-b')}
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


def built2():
    """S1322 sticky stack cards (CROWN) = builder-brief R45 (CSS sticky core, never a GSAP pin): the published
    Built-for-Texas five, one card each with a real job photo, closed by the warranty pair"""
    cards = ''
    for k, (t, tag, i) in enumerate(TEXAS):
        ph = PHOTOS[i]
        cards += f'''<li class="ts-card">
      <figure class="ts-fig"><img src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="{alt(ph['alt'])}" loading="lazy" decoding="async"><figcaption>{e(ph['place'])}, {e(ph['when'])}</figcaption></figure>
      <div class="ts-txt"><p class="ts-n num">0{k + 1}<span> of 05</span></p><h3 class="ts-h">{e(t)}</h3><p class="ts-tag">{e(tag)}</p></div>
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
    n = len(SW)
    segs = ''
    for k, (nm, c, h) in enumerate(SW):
        segs += f'<path class="dial-seg" data-k="{k}" style="--c:{h}" d=""/>'
    data = json.dumps([dict(n=nm, c=c, h=h) for nm, c, h in SW]).replace('</', '<\\/')
    return f'''<div class="v colour-3" data-tone="night">
  <div class="c3-grid">
    <div class="c3-stage">{studio_frame()}</div>
    <div class="c3-side">
      <h2 class="h2x" data-split>Turn the house a new colour</h2>
      <div class="dial" role="slider" tabindex="0" data-cur="drag" aria-label="Siding colour dial" aria-valuemin="1" aria-valuemax="{n}" aria-valuenow="11" aria-valuetext="In the Navy, SW 9178">
        <svg class="dial-svg" viewBox="-110 -110 220 220" aria-hidden="true"><g class="dial-rot">{segs}<circle class="dial-hub" r="46"/></g><path class="dial-mark" d="M0 -108L-7 -96H7Z"/></svg>
        <p class="dial-now"><b data-dial-name>In the Navy</b><span data-dial-code>SW 9178</span></p>
      </div>
      <p class="fine">The twelve Sherwin-Williams colours the firm publishes, on the job's own photo.</p>
    </div>
  </div>
  <script type="application/json" class="dial-data">{data}</script>
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
    <h2 class="h2x" data-split>How many jobs near you?</h2>
    {finder('n3', 'Type your neighbourhood or town', big=True)}
  </div>
  <figure class="n3-map" data-cur="map">{map_svg('map-svg map-light')}<button class="n3-knob" type="button" role="slider" aria-label="Radius in miles" aria-valuemin="1" aria-valuemax="15" aria-valuenow="5" aria-valuetext="5 miles" data-cur="drag" hidden></button></figure>
  <p class="n3-say" aria-live="polite" data-n3-say></p>
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
    chips = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if v == 250 else "false"}" data-mo="{v}" class="mo-chip num">${v}</button>' for v in (150, 250, 350, 500, 750))
    return f'''<div class="v money-2" data-tone="night">
  <div class="m2-top">
    <h2 class="h2x" data-split>Start from a monthly budget</h2>
    <div class="m2-ctl"><p class="lab" id="m2-l">I can put aside, a month</p><div class="mo-chips" role="radiogroup" aria-labelledby="m2-l">{chips}</div></div>
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
    return f'''<div class="v book-1 has-bgf" data-tone="red">
  <div class="bgf" aria-hidden="true"><canvas class="b1-folds"></canvas></div>
  <h2 class="h2x b1-h" data-split>See your price in writing</h2>
  <p class="b1-sub">Free inspection, 30 to 60 minutes, no obligation. You get the scope, materials and price.</p>
  <span class="mag" data-magnet><a class="b1-tel" href="{TEL}" data-cur="alt" data-cur-label="Call">{PHONE}</a></span>
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
    ('hero', 'Hero', [hero1, hero2, hero3], ['Courses', 'Pick your project', 'Real work']),
    ('proof', 'Proof', [proof1, proof2, proof3], ['Record', 'At a glance', 'Statement']),
    ('services', 'Services', [services1, services2, services3], ['Point at it', 'Index', 'Tape measure']),
    ('work', 'Work', [work1, work2, work3], ['Drag', 'Blueprint', 'Lens']),
    ('built', 'Built', [built1, built2, built3], ['Taken apart', 'Built for Texas', 'To the inch']),
    ('colour', 'Colour', [colour1, colour2, colour3], ['Dock', 'Drag paint', 'Dial']),
    ('near', 'Near you', [near1, near2, near3], ['Survey', 'Towns', 'Radius']),
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
  <button class="pk-btn" type="button" aria-expanded="false" aria-controls="pk-panel"><span>Your picks</span><b class="num" data-pk-code>111 111 1111</b></button>
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
    js = ['gsap', 'ScrollTrigger', 'Flip', 'SplitText', 'DrawSVGPlugin', 'MorphSVGPlugin', 'Draggable', 'InertiaPlugin', 'Observer', 'ScrambleTextPlugin', 'CustomEase']
    body += ''.join(f'<script src="assets/js/{n}.min.js" defer></script>\n' for n in js)
    body += '<script src="assets/js/lenis.min.js" defer></script>\n<script src="assets/js/fx.js" defer></script>\n<script src="assets/js/home.js" defer></script>\n</body>\n</html>\n'
    out = clean(body)
    with open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(out)
    words = len(re.sub(r'<[^>]+>', ' ', re.sub(r'<template.*?</template>|<script.*?</script>|<style.*?</style>', ' ', out, flags=re.S)).split())
    print('index.html', len(out) // 1024, 'KB; visible words in the default mix (approx):', words)


if __name__ == '__main__':
    build()
