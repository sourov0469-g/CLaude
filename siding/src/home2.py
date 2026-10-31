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
from logo import mark as logo_mark, course_mark
import art
import clad
import iso
import sheet

H = 'assets/img/h/'
EMAIL = 'info@austinprosiding.com'
ADDRESS = '7801 N Lamar Blvd, Suite C70, Austin, TX 78752'   # MASTER DIRECTIVE Annex A, verbatim
HOURS = 'Monday&ndash;Friday 8&ndash;8, Saturday 8&ndash;6, Sunday 12&ndash;5'   # MASTER DIRECTIVE Annex A verbatim (en dashes; locked facts outrank C.14's hyphens). Entities, so clean() keeps them


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
    towns = ''.join(f'<text class="m-town" x="{x + 7 - (10 if n == "Round Rock" else 0)}" y="{y + 4}">{e(n)}</text>' for n, x, y, c in TOWNS
                    if n in ('Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda', 'Lakeway', 'Hutto', 'Manor', 'San Marcos') and 10 <= x <= 520 and 20 <= y <= 620)
    hx, hy = NEAR['hq']
    office = f'<rect class="m-hq" x="{hx - 6}" y="{hy - 6}" width="12" height="12"/><text class="m-town m-hq-t" x="{hx + 13}" y="{hy + 19}">Office, N Lamar</text>'
    scale = f'<g class="m-scale" transform="translate(452 606)"><path d="M0 0h{NEAR["ppm"] * 10:.0f}M0 -5v10M{NEAR["ppm"] * 10:.0f} -5v10"/><text x="0" y="-10">10 mi</text></g>'
    return f'''<svg class="{cls}" viewBox="0 0 566 640" role="img" aria-label="{label}">
      {grat}<g class="m-pins">{pins}</g><g class="m-towns">{towns}</g>{office}{scale}<circle class="m-ring" r="0" cx="0" cy="0"/>
    </svg>'''


# ---------- HERO ----------
def pstrip(cls=''):
    """anatomy F1 proof strip: rating + review count + installer tier + since-year, in or above every hero. The stars
    are the shared 98 % component (Audit pack C.9); below 640 px only the rating and Since 2009 stay (F1 fix 4)."""
    c = f' {cls}' if cls else ''
    return (f'<p class="pstrip{c}"><span class="ps-r">{stars("ps-st")}<b>4.9</b> on 474 Google reviews</span>'
            '<span class="ps-c">GAF Master Elite</span><span class="ps-c">James Hardie Elite Preferred</span><span>Since 2009</span></p>')


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
    sills = ''.join(f'<path d="M{x0} {y + fs * .32:.0f}H{vw - x0}"/>' for y, _ in lines)   # below Poppins's descenders   # trimmed to each line's measured length at run time
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
    # Audit pack F1.3: 168 -> 128 px desktop (the photo box scales with the letters, so the framing holds); phones keep
    # four lines (three at 92 px cannot fit a 343 px measure, see TRACEABILITY) on a tighter 70-unit pitch
    d = h1_mask('d', 1440, 318, [(112, ['Siding', 'and', 'windows,']), (264, ['priced', 'in', 'public'])], 120, 24, (-754, -437, 1903, 1189))
    m = h1_mask('m', 375, 326, [(58, ['Siding', 'and']), (138, ['windows,']), (218, ['priced', 'in']), (298, ['public'])], 66, 8, (-369, -181, 931, 582))   # owner design note: Poppins 700 is wider than condensed Mona Sans, so 66 px fits 359 px
    return f'''<div class="v hero-1" data-tone="ground">
  <div class="h1m-top">{pstrip()}</div>
  <h1 class="h1m"><span class="sr-only">{H1_TEXT}</span>{d}{m}</h1>
  <div class="h1m-foot">
    <div class="h1m-copy">{LEAD}{ctas()}</div>
    <p class="h1m-chip">Rob Roy, Austin, {ROB['when']} · {e(ROB['bl'])} {band(ROB['band'])}</p>
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
        ph = PHOTOS[TRADE_PHOTO[s]]
        data[s] = dict(name=t['name'], tn=t['name'].lower(), n=f"{t['n']}", med=med(t), mid=f"${t['lo']}k and ${t['hi']}k", mo=f"${pmt(lo * 1000):.0f}-${pmt(hi * 1000):.0f}",
                       img=tphoto(s), alt=alt(ph['alt']) or e(f"{ph['trades']} at a home in {ph['place']}, {ph['when']}"), cap=tcap(s), book=BOOK_AS[s], zone=H2_ZONE[s])
        cards += (f'<li><a class="h2p" href="#services" data-t="{s}" data-cur="view" data-cur-label="See prices">'
                  f'{img(tphoto(s), 800, 600, "", "h2p-img", eager=k < 2)}<span class="h2p-plate">{locator(H2_ZONE[s])}'
                  f'<span class="h2p-n">{t["name"]}</span><span class="h2p-go">What it costs</span></span></a></li>')
    f = data['siding']
    js = json.dumps(data).replace('</', '<\\/')
    return f'''<div class="v hero-2" data-tone="ground" data-step="1">
  <div class="h2-top">{pstrip()}{H1}<p class="lead">886 documented jobs around Austin, each with its real price.</p>{ctas()}</div>
  <div class="h2-s1">
    <p class="h2-k"><span class="h2-pips" aria-hidden="true"><i class="on"></i><i></i></span>Step 1 of 2: pick your project</p>
    <ul class="h2-grid">{cards}</ul>
  </div>
  <div class="h2-s2" hidden>
    <figure class="h2-fig"><img data-f="img" src="{f['img']}" width="800" height="600" alt="{f['alt']}" loading="lazy" decoding="async"><figcaption class="h2-cap" data-f="cap">{e(f['cap'])}</figcaption></figure>
    <div class="h2-ans">
      <p class="h2-k"><span class="h2-pips" aria-hidden="true"><i class="on"></i><i class="on"></i></span>Step 2 of 2</p>
      <p class="h2-ah" tabindex="-1" data-f="head" role="heading" aria-level="2"><span data-f="name">{f['name']}</span>: what Austin Pro jobs cost</p>
      <div class="h2-row">{locator(f['zone'], 'h2-loc h2-loc-l')}<p class="h2-med"><span>Median job, from <b data-f="n">{f['n']}</b> priced <span data-f="tn">{f['tn']}</span> jobs, of 886 documented projects</span><b class="num" data-f="med">{f['med']}</b></p></div>
      <p class="h2-mid">The middle half of them landed between <span data-f="mid">{f['mid']}</span>. Materials and labour, before discounts and tax.</p>
      <p class="h2-mo">About <b data-f="mo">{f['mo']}</b> a month at 7.99% APR over 120 months, on approved credit.</p>
      <div class="h2-cta"><a class="btn btn-red" href="#book" data-book data-trade="{f['book']}" data-cur="hero" data-f="book">Book a free siding inspection</a><a class="tlink" href="{TEL}">Call {PHONE}</a><button class="tlink h2-back" type="button" data-f="back">Pick another project</button></div>
    </div>
  </div>
  <script type="application/json" class="h2-data">{js}</script>
</div>'''


H3F = [3, 15, 41, 18, 37]


def short_when(w):
    """'Jul 2026' -> 'Jul 26': the tab label carries its date visibly (Audit pack F1 V3.3: two tabs both read Maple Run)"""
    m = re.match(r'([A-Z][a-z]{2})\w* (\d{4})', w)
    return f"{m.group(1)} {m.group(2)[2:]}" if m else w


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
                 f'data-k="{k}" aria-label="{e(p["place"])}, {p["when"]}"><img src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="" loading="lazy" decoding="async"><span>{e(p["place"].split(",")[0])} · {short_when(p["when"])}</span></button>')
        panels += (f'<img class="h3-ph{" on" if on else ""}" src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="{alt(p["alt"]) or e(p["trades"] + " at a home in " + p["place"])}" '
                   + ('fetchpriority="high"' if on else 'loading="lazy"') + ' decoding="async">')
    caps = [dict(place=PHOTOS[i]['place'], when=PHOTOS[i]['when'], trades=PHOTOS[i]['trades']) for i in H3F]
    c0 = caps[0]
    return f'''<div class="v hero-3" data-tone="ground">
  <div class="h3-stage" role="tabpanel" id="h3p" aria-labelledby="h3t0">
    <div class="h3-photos">{panels}</div>
    <div class="h3-txt">{pstrip()}{H1}{LEAD}{ctas(True)}</div>
    <div class="h3-sign" aria-live="polite">{yard_sign()}<p><b data-s="place">{e(c0['place'])}</b><span data-s="trades">{e(c0['trades'])}</span><span data-s="when">{c0['when']}</span></p></div>
  </div>
  <div class="h3-under">
    <div class="h3-pick"><p class="h3-pl" id="h3pl">Pick a job</p><div class="h3-tabs" role="tablist" aria-labelledby="h3pl">{tabs}</div></div>
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


def creds_glossed():
    """Proof 1's badge row with Proof 2's "what it means" lines grafted under each badge (Audit pack F2 V1.5)"""
    gl = {f: m for f, _n, _t, m in CRED_ROWS}
    return '<ul class="creds creds-gl" aria-label="Certified, accredited and awarded">' + ''.join(
        f'<li><span class="cg-b"><img src="assets/img/{f}.webp" width="{w}" height="{h}" alt="{e(n)}" loading="lazy" decoding="async"></span><span class="cg-t">{e(gl[f])}</span></li>' for f, n, w, h in CREDS) + '</ul>'


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
  <h2 class="h2x" data-split>On record since 2009</h2>
  <div class="rec">
    <p class="rc rc-a"><b class="num" data-count>886</b><span>documented projects since the 2018 merger, each with its price</span><span class="rc-sum num"><span class="sr-only">312 on the map with photos + 574 more counted = 886</span>{boards886()}</span></p>
    <p class="rc rc-b"><b class="num" data-count>177</b><span>before-and-after pairs published</span></p>
    <p class="rc rc-c">{ring49()}<b class="num" data-count>4.9</b><span>on 474 Google reviews</span></p>
    <p class="rc rc-d"><b class="num" data-count>5,000+</b><span>Central Texas homes since 2009, by the firm's own count</span></p>
  </div>
  <div class="p1-foot">{creds_glossed()}{alt_btn('#work', 'See the work')}</div>
</div>'''


# what each credential means, in the firm's own words where it published them (FACTS: Proof as published)
CRED_ROWS = [
    ('gaf-master-elite', 'GAF Master Elite', 'Roofing', 'GAF says fewer than 2% of contractors nationwide hold it.'),
    ('hardie-elite-preferred', 'James Hardie Elite Preferred', 'Siding', "The top tier of the James Hardie contractor alliance. It can't be bought: James Hardie audits it, and it has to be re-earned."),
    ('hardie-presidents-club-2025', "James Hardie President's Club 2025", 'Siding', 'Awarded by James Hardie for 2025, on top of Elite Preferred status.'),
    ('andersen-certified-premier', 'Andersen Certified Premier', 'Windows', 'Certified by Andersen at the Premier level.'),
    ('guildmaster-service-excellence', 'GuildQuality Guildmaster', 'Service', 'Award for Service Excellence, four years in a row, 2015 through 2018.'),
    ('bbb-a-plus', 'BBB A+', 'Business', 'Accredited Business, rated A+.'),
]


# Audit pack C.12 / F2.3: one working check per row, from the profiles the firm itself links to on austinprosiding.com
# (work/raw: about-us, gallery, reviews pages). Where the firm publishes no public profile, the check is the phone.
G_REVIEWS = 'https://www.google.com/maps/place/?q=place_id:ChIJg1S9mOQrW4YREI2DIL1kcy0'
CHECK = {
    'gaf-master-elite': None,
    'hardie-elite-preferred': ('https://contractors.jameshardie.com/', "James Hardie's contractor finder"),
    'hardie-presidents-club-2025': ('https://contractors.jameshardie.com/', "James Hardie's contractor finder"),
    'andersen-certified-premier': None,
    'guildmaster-service-excellence': None,
    'bbb-a-plus': ('https://www.bbb.org/us/tx/austin/profile/siding-contractors/austin-pro-siding-windows-roofing-0825-90090599', 'BBB profile'),
}


def ext(href, label, cls='chk'):
    return f'<a class="{cls}" href="{href}" target="_blank" rel="noopener">{label}<span aria-hidden="true"> ↗</span><span class="sr-only"> (opens in a new tab)</span></a>'


def check_link(f, cls='chk'):
    c = CHECK.get(f)
    if not c:
        return f'<a class="{cls} {cls}-tel" href="{TEL}">Ask us: {PHONE}</a>'
    return ext(c[0], e(c[1]), cls)


def proof2():
    """Georgia Contractor Group (CROWN, GC report): the "at a glance" credential table as the proof unit, installer
    tier above review volume (builder brief 2.3)"""
    dims = {f: (w, h) for f, n, w, h in CREDS}
    rows = ''.join(f'''<tr><td class="gl-b"><img src="assets/img/{f}.webp" width="{dims[f][0]}" height="{dims[f][1]}" alt="" loading="lazy" decoding="async"><svg class="gl-ld" viewBox="0 0 40 12" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path class="ld-l" pathLength="1" d="M2 6H36"/><path class="ld-t" d="M2 1V11M38 6L32 2.5V9.5Z"/></svg></td>
      <th scope="row">{e(n)}<span class="gl-t">{t}</span></th><td class="gl-m">{e(m)} {check_link(f)}</td></tr>''' for f, n, t, m in CRED_ROWS)
    base = [('In business', '<span class="gl-long">Since 2009. Austin Pro Siding &amp; Windows (2009) and Sanders Roofing &amp; Exteriors (2010) merged in 2018.</span><span class="gl-short">Since 2009; merged in 2018.</span>'),
            ('Office', ADDRESS),
            ('Reviews', '<b class="num">4.9</b> on 474 Google reviews ' + ext(G_REVIEWS, 'Read them on Google')),
            ('Record', '886 documented projects: 312 on the map with photos + 574 more counted. 177 before-and-after pairs. 5,000+ Central Texas homes since 2009, by the firm\'s own count.')]
    base_rows = ''.join(f'<div class="gl-r"><dt>{k}</dt><dd>{v}</dd></div>' for k, v in base)
    return f'''<div class="v proof-2" data-tone="ground2">
  <div class="gl">
    <div class="gl-head">
      <h2 class="h2x" data-split>Austin Pro at a glance</h2>
      <dl class="gl-base">{base_rows}</dl>
      {alt_btn('#reviews', 'Read what they wrote')}
      <p class="nextstep"><span>{e(NEXT['proof'])}</span> <a class="tlink" href="{TEL}">Call {PHONE}</a> <span class="ns-or">or</span> <a class="tlink" href="#book" data-book>book a free inspection</a></p>
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
  <h2 class="statement" data-illuminate>Since the 2018 merger, <b>886</b> {pill(3)} jobs are documented, each with photos and a real price, and <b>177</b> {pill_pair()} have a before and after.</h2>
  <p class="st-tail">Homeowners rate the work <b>4.9</b> on <b>474</b> Google reviews. In business since 2009, on 5,000+ Central Texas homes by the firm's own count.</p>
  <div class="stamps">{creds('creds creds-stamp')}{alt_btn('#book', 'Book free inspection')}</div>
</div>'''


# ---------- SERVICES ----------
# the six parts of the Rob Roy house the instrument can light, mapped to the firm's trades (FACTS.md counts and bands)
SV1 = [   # (part, label, trade for booking, photo slug, facts as the firm publishes them: FACTS.md product sections)
    ('siding', 'Siding', 'Siding', 'siding', ['James Hardie fiber cement on every priced siding job',
                                             '301 of 415 priced siding jobs used the HardiePlank lap 8.25″ board; 27 went board and batten',
                                             'Select Cedarmill texture on 286 of 415, Smooth on 36',
                                             '30-year non-prorated Hardie warranty, plus lifetime workmanship on labour']),
    ('windows', 'Windows', 'Windows', 'windows', ['Four brands cover 361 of 376 priced window jobs',
                                                  'Priced window jobs by brand: NT Windows 238 · Simonton 54 · Andersen 38 · Pella 31',
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
]
# Audit pack F3 V1.3: the photographed house has no gutter run, patio cover or metal roof to point at, so those
# trades join as chips with their own job photo and counts instead of parts drawn onto a house that lacks them.
DOCS = {'siding': 431, 'windows': 388, 'shingle-roofing': 210, 'metal-roofing': 31, 'patio-covers': 34, 'doors': 109,
        'garage-doors': 9, 'exterior-painting': 320, 'gutters': 121}   # FACTS.md "documented projects" line
SV1_MORE = [('gutters', 'Gutters'), ('patio-covers', 'Patio covers'), ('metal-roofing', 'Metal roofing')]
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
    for slug, label in SV1_MORE:
        t = TBY[slug]
        data[slug] = dict(label=label, trade=t['name'], img=tphoto(slug), cap=tcap(slug), off=1,
                          facts=[f"{DOCS[slug]} documented {t['name'].lower()} jobs; {t['n']} of them priced", f"Median {med(t)}, middle half {mid(t)}",
                                 'Not on this house: the job photo shows one the firm did'])
    chips = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" data-part="{p}">{lab}</button>' for k, (p, lab, *_r) in enumerate(SV1))
    chips += ''.join(f'<button type="button" role="radio" aria-checked="false" data-part="{p}" class="sv1-more">{lab}</button>' for p, lab in SV1_MORE)
    d0 = data['siding']
    li = ''.join(f'<li>{e(x)}</li>' for x in d0['facts'])
    draw = elevation.svg('sv1el', 'elev sv1-el', 'The Rob Roy house, Austin: point at a part of it to open the matching trade', hits=True).replace('<defs>', '<defs>' + SV1_HATCH, 1)
    # F3 V1.4: the parts map sits over the real job photograph; the traced paths are only hit areas and hatch masks
    draw = re.sub(r'(<svg [^>]*>)', r'\1<image class="sv1-photo" href="assets/img/studio/base-1400.webp" width="1400" height="875"/>', draw, count=1)
    draw = re.sub(r'<path data-hit="deck" d="[^"]*"/>', '', draw).replace('data-part="deck"', 'data-part="none"')
    # F3 V1.2: shared edges are a no-hit gutter 16 units wide (8 each side), so neighbours stop stealing the pointer
    hit_d = ''.join(re.findall(r'<path data-hit="[^"]+" d="([^"]*)"/>', draw))
    draw = draw.replace('</g></svg>', f'</g><path class="sv1-gap" d="{hit_d}"/></svg>', 1)
    js = json.dumps(data, ensure_ascii=False).replace('</', '<\\/')
    return f'''<div class="v services-1" data-tone="ground">
  <div class="sv1-head"><h2 class="h2x" data-split>What needs work?</h2><p class="sv1-sub">Point at a part of the house to see what Austin Pro puts there, counted from the firm's own job files.</p></div>
  <div class="sv1-grid">
    <figure class="sv1-fig" data-cur="view">{draw}<figcaption class="sv1-fc">Rob Roy, Austin, {ROB['when']}: the firm's own job photo</figcaption></figure>
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
    for slug in sorted(TRADE_ORDER, key=lambda x: -TBY[x]['n']):   # F3 V2.4: the numbers are ranks by priced jobs
        t = TBY[slug]
        cnt = f"{t['n']} priced jobs"
        im = f' data-img="{tphoto(slug)}"' if slug in TRADE_PHOTO else ''
        th = f'<img class="ix-th" src="{tphoto(slug)}" width="800" height="600" alt="" loading="lazy" decoding="async">' if slug in TRADE_PHOTO else '<span class="ix-th ix-th-none" aria-hidden="true"></span>'
        rows += f'''<li><a class="ix-row" href="#book" data-book data-cur="view" data-trade="{e(t['name'])}"{im} aria-label="{e(t['name'])}: {cnt}, median job {med(t)}. Book an inspection">
      <svg class="ix-gl" aria-hidden="true" focusable="false"><use href="#ixg-{slug}"/></svg><span class="ix-name" data-chars>{e(t['name'])}</span><span class="ix-meta"><span>{cnt}</span><b>Median {med(t)}</b></span>{th}</a></li>'''
    rows += '''<li><a class="ix-row" href="#book" data-book data-cur="view" data-trade="Storm damage" aria-label="Storm damage: free inspection, documented for your insurer. Book an inspection">
      <svg class="ix-gl" aria-hidden="true" focusable="false"><use href="#ixg-storm"/></svg><span class="ix-name" data-chars>Storm damage</span><span class="ix-meta"><span>Hail and wind</span><b>Free inspection</b></span><span class="ix-th ix-th-none" aria-hidden="true"></span></a></li>'''
    return f'''<div class="v services-2" data-tone="ground">
  <div class="ix-head"><h2 class="h2x" data-split>Eleven trades, one inspection</h2><p>Ranked by priced jobs. Median price band from the firm's own priced jobs, 2018-2026.</p>
    <p class="ix-count num" aria-hidden="true"><b data-ix-now>01</b><span>of 11</span></p><p class="ix-call">Pick a trade to book its free inspection, or call <a class="tlink" href="{TEL}">{PHONE}</a>.</p></div>
  <svg class="ix-defs" aria-hidden="true" focusable="false">{IX_SYMS}</svg>
  <ol class="ix">{rows}</ol>
  <div class="ix-peek" aria-hidden="true"><img alt="" width="800" height="600"></div>
</div>'''


TAPE = 30   # F3 V3.3: a $0-$30k tape; the two trades whose middle half runs past it print their full range


def services3():
    rows = ''
    for slug in TRADE_ORDER:
        t = TBY[slug]
        lo, hi = t['lo'], t['hi']
        over = ' tm-over' if hi > TAPE else ''
        rows += (f'''<li class="tm-t{over}" data-lo="{lo}" data-hi="{hi}"><span class="tm-n">{e(t['name'])}</span><a class="tm-go" href="#book" data-book data-trade="{e(t['name'])}" tabindex="-1" hidden>Book a {e(t['name'].lower())} inspection</a>'''
                 f'''<span class="tm-bar" style="--a:{lo / TAPE:.3f};--b:{min(hi, TAPE) / TAPE:.3f};--m:{sum(t['med']) / 2 / TAPE:.3f}" aria-hidden="true"><i></i></span><span class="tm-r num">{mid(t)}<small>median {med(t)}</small></span></li>''')
    ticks = ''.join(f'<i class="tk{" tk-m" if k % 5 == 0 else ""}" style="--k:{k}">{f"<b>${k}k</b>" if k % 5 == 0 else ""}</i>' for k in range(0, TAPE + 1))
    return f'''<div class="v services-3" data-tone="ground2">
  <div class="tm-head"><h2 class="h2x" data-split>Pull the tape to your budget</h2>
    <p class="tm-say" aria-live="polite"><b class="num" data-tm-v>$15,000</b> <span data-tm-n>6 of 10 trades usually land here.</span></p></div>
  <div class="tape" role="slider" tabindex="0" data-cur="drag" aria-label="Budget, from $0 to $30,000 or more" aria-valuemin="0" aria-valuemax="30000" aria-valuenow="15000" aria-valuetext="$15,000" data-max="30000">
    <div class="tape-band"><div class="tape-strip" aria-hidden="true"><svg class="tape-hook" viewBox="0 0 30 96" focusable="false"><path class="th-tab" d="M30 4H8C5 4 4 5 4 8V88C4 91 5 92 8 92H30"/><path class="th-lip" d="M4 10V86"/><circle class="th-rv" cx="20" cy="30" r="2.6"/><circle class="th-rv" cx="20" cy="66" r="2.6"/></svg>{ticks}</div></div>
    <i class="tape-mark" aria-hidden="true"></i>
    <svg class="tape-case" viewBox="0 0 120 52" aria-hidden="true" focusable="false"><path class="tc-body" d="M10 4H104C111 4 116 9 116 16V40C116 45 112 48 107 48H14C8 48 4 44 4 38V10C4 7 7 4 10 4Z"/><rect class="tc-win" x="52" y="30" width="16" height="16" rx="2"/><path class="tc-lock" d="M20 14H44"/><circle class="tc-rv" cx="104" cy="16" r="3"/><circle class="tc-rv" cx="104" cy="36" r="3"/><path class="tc-mark" d="M60 30V48"/></svg>
  </div>
  <ul class="tm-list" aria-label="Middle half of each trade's priced jobs">{rows}</ul>
  <p class="fine">Each bar is the middle half of that trade's priced jobs, with its median band marked: the same published figures as everywhere on this page. Materials and labour before discounts, excluding tax. Your price comes from the free inspection.</p>
</div>'''


# ---------- WORK ----------
def work1():
    p = PAIRS6[0]
    # F4 V1 graft: the filmstrip takes Work 3's permanent caption format (place, portion, price, date)
    strip = ''.join(f'''<li><button class="fs" type="button" data-i="{k}" aria-pressed="{'true' if k == 0 else 'false'}"><img src="{H}work-{q['id']}-a-1000.webp" width="1000" height="625" alt="" loading="lazy" decoding="async"><span>{e(q['place'])}</span><b>{e(q['bl'])} {q['band']}</b><small>{e(q['when'])}</small></button></li>''' for k, q in enumerate(PAIRS6))
    data = json.dumps([dict(id=q['id'], place=q['place'], when=q['when'], what=q['what'], band=q['band'], bl=q['bl'], href=q['href'], ab=q['ab'].replace('—', ','), aa=q['aa'].replace('—', ',')) for q in PAIRS6], ensure_ascii=False).replace('</', '<\\/')
    return f'''<div class="v work-1" data-tone="ground">
  <div class="w1-head"><h2 class="h2x" data-split>Before, after, and the price</h2><p class="w1-sub">Six of the 177 before-and-after pairs the firm publishes, each with its own price.</p></div>
  <figure class="cmp cmp--ab" data-cmp data-cur="drag" style="--split:100%">
    {pimg(p, 'a', 'cmp-a')}{pimg(p, 'b', 'cmp-b')}
    <span class="cmp-line" aria-hidden="true"><svg class="cmp-trim" viewBox="0 0 16 100" preserveAspectRatio="none" focusable="false"><rect class="ct-b" x="1" y="0" width="14" height="100"/><rect class="ct-s" x="11.5" y="0" width="3.5" height="100"/><path class="ct-g" d="M5 0C4 30 7 60 5 100M9 0C10 40 8 70 9.5 100"/></svg></span>
    <button class="cmp-handle" type="button" role="slider" aria-label="Before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="100" aria-valuetext="100% of the after photo showing"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></svg><svg class="cmp-lev" viewBox="0 0 44 12" aria-hidden="true" focusable="false"><rect class="cl-b" x="1" y="1" width="42" height="10" rx="3"/><rect class="cl-v" x="14" y="2.5" width="16" height="7" rx="3.5"/><path class="cl-m" d="M19 2.5V9.5M25 2.5V9.5"/><circle class="cl-bub" cx="22" cy="6" r="2.4"/></svg></button>
    <span class="ptag ptag-a" aria-hidden="true">After</span><span class="ptag ptag-b" aria-hidden="true">Before</span>
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
  <div class="bp-head"><h2 class="h2x" data-split>Survey, trace, rebuild</h2><p class="bp-sub">The old house, an edge tracing of the finished photo in blueprint ink, then the finished wall.</p></div>
  <svg class="bp-defs" aria-hidden="true" focusable="false"><filter id="bp-ink" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values=".753 0 0 0 .231  .545 0 0 0 .435  .255 0 0 0 .714  0 0 0 1 0"/></filter></svg>
  <figure class="bp-fig" data-cur="view">
    <img class="bp-b" src="{H}work-{p['id']}-b-1000.webp" width="1000" height="625" alt="{alt(p['ab'])}" loading="lazy" decoding="async">
    <img class="bp-p" src="{H}bp-{p['id']}-1000.webp" width="1000" height="625" alt="" loading="lazy" decoding="async">
    <img class="bp-a" src="{H}work-{p['id']}-a-1000.webp" width="1000" height="625" alt="{alt(p['aa'])}" loading="lazy" decoding="async">
    <i class="bp-scan" aria-hidden="true"></i>
    <p class="bp-dim" aria-hidden="true"><span data-bp-dim>{e(p['bl'])} {p['band']}</span></p>
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


def built_clad():
    """MASTER DIRECTIVE Phase 4: the business-only interactive (src/clad.py)"""
    return clad.html(TRADES, COLORPLUS)


def built1():
    btns = ''.join(f'<li><button type="button" class="lg-b" data-asm="{k}" aria-pressed="false"><span class="num">0{i + 1}</span>{n}</button></li>' for i, (k, n) in enumerate(LEGEND))
    data = json.dumps(READ).replace('</', '<\\/')
    return f'''<div class="v built-1 has-bgf" data-tone="ground">
  <div class="b1-grid">
    <div class="b1x-side">
      <h2 class="h2x" data-split>The wall, taken apart</h2>
      <p class="b1x-sub">James Hardie lap, installed by an Elite Preferred crew. 301 of 415 priced siding jobs used this 8.25 in board.</p>
      <ol class="legend" aria-label="Layers of the wall">{btns}</ol>
      <div class="b1x-act"><button class="btn btn-ink btn-sm" type="button" data-explode aria-pressed="false">Take it apart</button></div>
    </div>
    <figure class="b1x-fig card-fig" data-cur="view">
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


def ph_alt(ph):
    """the descriptive alt pattern for a job photo, from its caption data when the firm's own alt is empty (F5.5)"""
    return alt(ph['alt']) or e(f"{ph['trades']} at a home in {ph['place']}, {ph['when']}")


def built2():
    """S1322 sticky stack cards (CROWN) = builder-brief R45 (CSS sticky core, never a GSAP pin): the published
    Built-for-Texas five, each with a real job photo, closed by the warranty pair. Audit pack F5: the stack holds two
    cards (warp: a full-bleed photo; rot: the diagram large), burn and termites run as one two-up row, the dark
    warranty card closes; card heads at 44 px."""
    def fig(i, cls='ts-fig'):
        ph = PHOTOS[i]
        return f'<figure class="{cls}"><img src="assets/img/photos/p{i}-1400.webp" width="1400" height="1050" alt="{ph_alt(ph)}" loading="lazy" decoding="async"><figcaption>{e(ph["place"])}, {e(ph["when"])}</figcaption></figure>'
    def txt(k, extra=''):
        t, tag, _i = TEXAS[k]
        dg = f'<svg class="tx-d" viewBox="0 0 160 90" aria-hidden="true" focusable="false">{TX_DIAG[k].replace("<path ", "<path pathLength=\"1\" ")}</svg>' if extra != 'nodiag' else ''
        return f'<div class="ts-txt"><p class="ts-n num">0{k + 1}<span> of 05</span></p><h3 class="ts-h">{e(t)}</h3><p class="ts-tag">{e(tag)}</p>{dg}</div>'
    photo = {0: 3, 1: 28, 2: 2, 3: 0}   # card 3 now carries a siding job (F5.5)
    cards = (f'<li class="ts-card ts-bleed">{fig(photo[0])}{txt(0, "nodiag")}</li>'
             f'<li class="ts-card ts-split">{txt(1)}{fig(photo[1])}</li>')
    pair = ''.join(f'<li class="ts-mini">{fig(photo[k], "ts-fig ts-mfig")}{txt(k)}</li>' for k in (2, 3))
    end = '''<div class="ts-end ts-close">
      <div class="ts-txt"><p class="ts-n">05 of 05 · The warranty pair</p>
        <p class="ts-w"><b class="num">30</b><span>year non-prorated James Hardie siding warranty, when an Elite Preferred contractor installs</span></p>
        <p class="ts-w"><b>Lifetime</b><span>Austin Pro workmanship warranty on the labour</span></p>
        <p class="ts-fine">Whole walls or the whole house, never patches. 1 to 2 weeks on site, paint included.</p></div>
    </div>'''
    return f'''<div class="v built-2" data-tone="ground2">
  <div class="ts-head"><h2 class="h2x" data-split>Built for Texas</h2>
    <p>Every priced siding job is James Hardie fiber cement. What the board stands up to here, as the firm publishes it, on its own jobs.</p></div>
  <ol class="ts">{cards}</ol>
  <ul class="ts-pair">{pair}</ul>
  {end}
</div>'''


SPEC = [('L1', 'Board', '8.25 in', 'lap'), ('X1', 'Exposure', '7 in', 'lap'), ('O1', 'Lap = L1 - X1', '1.25 in', 'lap'), ('T1', 'Thickness', '5/16 in', 'lap'),
        ('N1', 'Board length', '12 ft', 'lap'), ('P1', 'Panel', '4 ft', 'bb'), ('B1', 'Batten', '2.5 in', 'bb'), ('C1', 'Batten spacing', '16 in o.c.', 'bb')]


def built3():
    # F5 V3.3: the batten values print in both modes, greyed when lap is shown (never hidden)
    rows = ''.join(f'<li class="spec-r{" is-off" if st == "bb" else ""}" data-code="{c}" data-set="{st}" tabindex="0"><span class="num">{c}</span><span>{n}</span><b class="num">{v}</b></li>' for c, n, v, st in SPEC)
    ph = PHOTOS[3]
    return f'''<div class="v built-3 has-bgf" data-tone="ground">
  <div class="b3x-head"><h2 class="h2x" data-split>Lap or batten, to the inch</h2>
    <div class="seg b3x-seg" role="radiogroup" aria-label="Siding style"><button type="button" role="radio" aria-checked="true" data-style="lap">Lap · 301 jobs</button><button type="button" role="radio" aria-checked="false" data-style="bb">Batten · 27 jobs</button></div></div>
  <div class="b3x-eye">
    <figure class="b3x-ph"><img src="assets/img/photos/p3-1400.webp" width="1400" height="1050" alt="{ph_alt(ph)}" loading="lazy" decoding="async"><figcaption><b>Lap</b> {e(ph['place'])}, {e(ph['when'])}: HardiePlank lap, the board on 301 of 415 priced siding jobs</figcaption></figure>
    <p class="b3x-none"><b>Batten</b> 27 of 415 priced siding jobs went board and batten. None of the jobs photographed on this page is one, so it is shown here as its drawing only.</p>
  </div>
  <div class="b3x-grid">
    <figure class="b3x-sheet">{sheet.svg()}</figure>
    <div class="b3x-spec"><ul class="spec" aria-label="Published dimensions">{rows}</ul>
      <p class="fine">Every value is the one the firm publishes for James Hardie siding. Thicknesses it does not publish stay [TBD].</p></div>
  </div>
</div>'''

# ---------- COLOUR ----------
def zones():
    out = ''
    for z, sh in (('body', 'body'), ('gable', 'gable'), ('trim', 'trim')):   # F6 V1.2: the gable has its own shade
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
  </div>
  <p class="c1t-money">Paint or ColorPlus is one of six things that move a siding price (median {med(t)} from {t['n']} priced jobs). <a class="tlink" href="#money">See what people paid</a></p>
  <p class="fine">A colour preview using colours the firm publishes. Real paint reads differently in Texas sun; the inspection brings physical samples.</p>
</div>'''


# REBRAND QA round 2 (S1496 token compliance): the label ink on a published paint is a role token, never a literal.
# PAINT_DARK is --neutral-13 (OKLCH .199 .008 248, the steel-tinted neutral near #161616's luminance) for the contrast maths.
PAINT_DARK = '#131619'
INK_TOKEN = {PAINT_DARK: 'var(--color-text-on-paint-dark)', '#FFFFFF': 'var(--color-text-on-paint-light)'}


def ink_on(h):
    """text colour that reads on a swatch (relative luminance)"""
    r, g, b_ = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))
    return INK_TOKEN[PAINT_DARK if 0.2126 * r + 0.7152 * g + 0.0722 * b_ > 0.5 else '#FFFFFF']


def lum(h):
    def ch(v):
        v /= 255
        return v / 12.92 if v <= .03928 else ((v + .055) / 1.055) ** 2.4
    r, g, b_ = (int(h[i:i + 2], 16) for i in (1, 3, 5))
    return .2126 * ch(r) + .7152 * ch(g) + .0722 * ch(b_)


def contrast(a, b_):
    la, lb = sorted((lum(a), lum(b_)), reverse=True)
    return (la + .05) / (lb + .05)


def ink_best(h):
    """F6 V3.1: the tile ink with the higher WCAG contrast (Boothbay Blue reads 4.53:1 in #161616, not 3.99:1 in white)"""
    return INK_TOKEN[PAINT_DARK if contrast(h, PAINT_DARK) >= contrast(h, '#FFFFFF') else '#FFFFFF']


def plate(h):
    """mid-tones where neither ink reaches 4.5:1 carry their name on a dark plate, like Work's photo tags"""
    return max(contrast(h, PAINT_DARK), contrast(h, '#FFFFFF')) < 4.5


def colour2():
    """builder-brief R30 comparison table (Other vs Us, JS 0; Stronghold's live comparison block) adapted to the firm's
    two published finish systems; each column carries its own published swatches"""
    # F6 V2.2: the two colours the headers announce start pressed
    sw = ''.join(f'<button class="cmp-sw" type="button" aria-pressed="{"true" if k == 10 else "false"}" data-hex="{h}" data-ink="{ink_on(h)}" data-name="{e(n)}" data-code="{e(c)}" style="--c:{h}" aria-label="{e(n)}, {e(c)}"><i aria-hidden="true"></i></button>' for k, (n, c, h) in enumerate(SW))
    cp = ''.join(f'<button class="cmp-sw" type="button" aria-pressed="{"true" if k == 11 else "false"}" data-hex="{h}" data-ink="{ink_on(h)}" data-name="{e(n)}" data-code="ColorPlus" style="--c:{h}" aria-label="{e(n)}, James Hardie ColorPlus"><i aria-hidden="true"></i></button>' for k, (n, c, h) in enumerate(COLORPLUS))
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
  <table class="fin">
    <caption class="sr-only">Painted on site compared with James Hardie ColorPlus</caption>
    <thead><tr><td></td>
      <th scope="col" class="cmp-col" style="--c:{h0};--color-text:{ink_on(h0)}"><svg class="c2-d" viewBox="0 0 200 64" aria-hidden="true" focusable="false"><g class="c2-boards"><rect class="c2-b" x="4" y="6" width="150" height="16"/><rect class="c2-b" x="4" y="24" width="150" height="16"/><rect class="c2-b c2-wet" x="4" y="42" width="96" height="16"/><rect class="c2-raw" x="100" y="42" width="54" height="16"/><path class="c2-sh" d="M4 21H154M4 39H154M4 57H154"/></g><g class="c2-tool"><path class="c2-h" d="M100 40V62H128"/><rect class="c2-roll" x="94" y="32" width="12" height="28" rx="5"/></g></svg><span class="cmp-sys">Painted on site</span><span class="cmp-now"><b data-now>{e(n0)}</b><span data-code>{e(c0)}</span></span></th>
      <th scope="col" class="cmp-col" style="--c:{h1};--color-text:{ink_on(h1)}"><svg class="c2-d" viewBox="0 0 200 64" aria-hidden="true" focusable="false"><path class="c2-belt" d="M4 52H196"/><circle class="c2-wh" cx="20" cy="56" r="4"/><circle class="c2-wh" cx="100" cy="56" r="4"/><circle class="c2-wh" cx="180" cy="56" r="4"/><g class="c2-board"><rect class="c2-b" x="10" y="38" width="64" height="12"/><path class="c2-sh" d="M10 49H74"/></g><path class="c2-oven" d="M86 52V12H156V52"/><path class="c2-coil" d="M94 20L102 26L110 20L118 26L126 20L134 26L142 20L150 26"/><path class="c2-door" d="M86 30H90M152 30H156"/></svg><span class="cmp-sys">James Hardie ColorPlus</span><span class="cmp-now"><b data-now>{e(n1)}</b><span data-code>ColorPlus</span></span></th></tr>
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
                  f'style="--c:{h};--color-text:{ink_best(h)}"{" data-plate" if plate(h) else ""} aria-label="{e(n)}, {e(code)}. Open"><svg class="cb-ph" viewBox="0 0 24 12" aria-hidden="true" focusable="false"><circle cx="12" cy="6" r="3.6"/><path d="M0 11.5H24"/></svg><span class="cb-n">{e(n)}</span><span class="cb-c">{e(code)}</span></button></li>')
    return f'''<div class="v colour-3" data-tone="ground">
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
def finder(pref, label='Your neighbourhood or town', big=False, tries=True):
    return f'''<div class="fd{' fd-big' if big else ''}" data-finder>
      <label class="fd-label" for="{pref}-in">{label}</label>
      <div class="fd-box"><input id="{pref}-in" type="text" autocomplete="off" spellcheck="false" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="{pref}-list" placeholder="Try Round Rock or Milwood…"><button class="fd-clear" type="button" aria-label="Clear" hidden>&times;</button></div>
      <ul class="fd-list" id="{pref}-list" role="listbox" aria-label="Places in the project file" hidden></ul>
      {'<div class="fd-try"><span>Try</span><button type="button" data-try="Round Rock">Round Rock</button><button type="button" data-try="Cedar Park">Cedar Park</button><button type="button" data-try="Milwood, Austin">Milwood</button></div>' if tries else ''}
      <div class="fd-out" aria-live="polite"></div>
    </div>'''


def town_data():
    """per town: documented jobs in the finder file, the map's city index, its photographed jobs (photo stories)"""
    out = {}
    for n, _x, _y, c in TOWNS:
        if n not in CITIES:
            continue
        ph = [i for i, p in enumerate(PHOTOS) if town_of(p['place']) == n]
        out[n] = dict(doc=c, ci=CITIES.index(n), p=[dict(src=f'{H}t/p{i}-320.webp', alt=alt(PHOTOS[i]['alt']) or e(f"{PHOTOS[i]['trades']} at a home in {PHOTOS[i]['place']}"), place=PHOTOS[i]['place'], when=PHOTOS[i]['when'], trades=PHOTOS[i]['trades']) for i in ph[:4]], n=len(ph))
    return out


def near1():
    """Audit pack F7: the count is static (no count-up), K1 is printed, a finder pick lights its town and brings that
    town's photo stories under the map (graft from Near 3); phones lead with the finder and a town list"""
    td = town_data()
    js = json.dumps(td).replace('</', '<\\/')
    towns = ''.join(f'<li><b>{e(n)}</b><span class="num">{c}</span></li>' for n, _x, _y, c in sorted(TOWN_TOP, key=lambda t: -t[3]))
    return f'''<div class="v near-1" data-tone="night">
  <div class="n1-grid">
    <div class="n1-side">
      <h2 class="h2x" data-split>Austin, job by job</h2>
      <p class="n1-count" aria-live="polite"><span class="num" data-count>312</span> <span data-when>photographed jobs on the map, Mar 2022 to Sep 2026</span></p>
      <p class="n1-k1">312 on the map with photos + 574 more counted = 886 documented projects.</p>
      <p class="n1-note">Each dot is a photographed job, placed near the home, never on it. The 574 are documented outside this frame or without photos.</p>
      {finder('n1', tries=False)}
      <ul class="n1-towns" aria-label="Documented jobs by town">{towns}</ul>
    </div>
    <figure class="n1-map" data-cur="map">{map_svg()}<canvas class="n1-trail" aria-hidden="true"></canvas><div class="m-tip" hidden></div></figure>
  </div>
  <div class="n1-pay" hidden><p class="n1-pk" aria-live="polite"></p><ol class="dv-rail n1-rail"></ol></div>
  <script type="application/json" class="n1-data">{js}</script>
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
    return f'''<div class="v near-2" data-tone="night">
  <div class="mx-head"><h2 class="h2x" data-split>Town by town</h2>
    <p>Each town's own numbers: documented jobs in the firm's project finder, and the priced siding and window jobs from its cost guides, with the median band where it is published.</p></div>
  <div class="mx" role="presentation">
    <div class="mx-h" aria-hidden="true"><span>Town</span><span>Documented jobs</span><span>Siding</span><span>Windows</span></div>
    <ol class="mx-list" aria-label="Towns">{rows}</ol>
  </div>
</div>'''


DRIVE = ['Austin', 'Cedar Park', 'Pflugerville', 'Round Rock', 'Georgetown']
MORE_TOWNS = [n for n, *_r in sorted(TOWN_TOP + [t for t in TOWNS if t[0] in ('Lakeway', 'Manor', 'Hutto')], key=lambda t: -t[3]) if n not in DRIVE]   # F7 V3.1


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
        chips += f'<button type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" tabindex="{0 if k == 0 else -1}" class="dv-chip" data-town="{e(town)}"><b>{e(town)}</b><span class="num">{len(ph)} photo {"story" if len(ph) == 1 else "stories"}</span></button>'
    a0 = data['Austin']
    cards = ''.join(f'<li class="dv-card"><img src="{q["src"]}" width="320" height="240" alt="{q["alt"]}" loading="lazy" decoding="async"><p><b>{e(q["place"])}</b><span>{e(q["when"])}. {e(q["trades"])}</span></p></li>' for q in a0['p'])
    js = json.dumps(data).replace('</', '<\\/')
    return f'''<div class="v near-3" data-tone="night">
  <div class="dv-head"><h2 class="h2x" data-split>The neighbourhood drive</h2>
    <p>Pick a place. The map flies in, and you see only the jobs photographed there.</p></div>
  <div class="dv-chips" role="radiogroup" aria-label="Choose a place">{chips}</div>
  <p class="dv-more">{len(MORE_TOWNS)} more towns in the project file have documented jobs but no photo story here yet: {e(', '.join(MORE_TOWNS))}. <a class="tlink" href="#near" data-near-survey>See them on the survey</a></p>
  <div class="dv-stage">
    <figure class="dv-map" data-cur="map">{map_svg('map-svg dv-svg')}<figcaption class="dv-cap num" aria-live="polite" data-dv-cap>Austin: {a0['doc']} documented jobs</figcaption></figure>
    <div class="dv-chapter"><p class="dv-k" data-dv-k>{a0['n']} of Austin's photographed jobs have a full photo story here{f"; the latest {len(a0['p'])}" if a0['n'] > len(a0['p']) else ""}</p>
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


def sentence_cut(text, n=90):
    """F8 V1.2: an excerpt is a whole sentence (or two), never a fragment. The first sentence when it is short enough;
    otherwise the first complete sentence of 30 to 120 characters, marked with a leading … where it is not the
    opening; a review with no such sentence keeps its opening sentence whole."""
    sents = [x.strip() for x in re.split(r'(?<=[.!?])\s+', text.strip()) if x.strip() and not x.strip().endswith(('…', '...'))]   # the firm's own cut-offs are not sentences
    out = ''
    for x in sents:
        if len(out) + len(x) + 1 > n and out:
            break
        out = (out + ' ' + x).strip()
        if len(out) >= n * 0.6:
            break
    if len(out) <= 120:
        return out
    for k, x in enumerate(sents):
        if 30 <= len(x) <= 120:
            return ('…' if k else '') + x
    return sents[0]


def crew_name(text):
    """the crew member a review names FIRST in its text (F8 V3.4 files each review under one person)"""
    hits = sorted((m.start(), n) for n, rx in CREW for m in [re.search(rx, text)] if m)
    return hits[0][1] if hits else None


SOURCE = 'Google, 2026'
G_REVIEWS_URL = 'https://www.google.com/maps/place/?q=place_id:ChIJg1S9mOQrW4YREI2DIL1kcy0'   # the firm's own link to its Google listing (work/raw)


def read_all(cls='chk'):
    return (f'<a class="{cls}" href="{G_REVIEWS_URL}" target="_blank" rel="noopener">Read all 474 on Google<span aria-hidden="true"> ↗</span>'
            '<span class="sr-only"> (opens in a new tab)</span></a>')   # where and when each excerpt was posted, as the firm publishes it (no number beside "review")


STAR = '<path d="M10 1.6l2.47 5.3 5.8.62-4.32 3.93 1.2 5.7L10 14.3l-5.15 2.85 1.2-5.7L1.73 7.52l5.8-.62z"/>'


def stars(cls=''):
    """the one star component (Audit pack C.9): five outlines under five fills clipped to 98 % of the row, so the
    graphic says 4.9 of 5 and never 5.0. Proof 1's ring (98.0 %) is the reference it matches."""
    row = ''.join(f'<svg viewBox="0 0 20 20">{STAR}</svg>' for _ in range(5))
    c = f' {cls}' if cls else ''
    return f'<span class="stars{c}" aria-hidden="true"><span class="st-0">{row}</span><span class="st-1">{row}</span></span>'


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
        return (f'<figure class="sk" style="--w:{W[k % len(W)]}px">{shake(k)}<blockquote><p>“{e(sentence_cut(r["text"]))}”</p></blockquote>'
                f'<figcaption>{e(r["name"])}<span>{SOURCE}</span></figcaption></figure>')
    row = lambda rs, cls, k0: f'<div class="sk-row {cls}"><div class="sk-track">' + ''.join(card(r, k0 + k) for k, r in enumerate(rs)) + '</div></div>'
    return f'''<div class="v reviews-1" data-tone="ground">
  <div class="sk-head"><h2 class="h2x" data-split>What homeowners write</h2><p class="rating"><b class="num">4.9</b>{stars()}<span>474 Google reviews</span> {read_all()}</p>
    <button class="btn btn-line btn-sm sk-pause" type="button" aria-pressed="false">Pause</button></div>
  <div class="sk-rows" role="region" aria-label="Excerpts from Google reviews, as published on austinprosiding.com">{row(pick, 'sk-a', 0)}</div>
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
    # F8 V2.4: the words are the reviewer's, so the site adds no emphasis inside the quote; who it names is a caption
    data = json.dumps([dict(q=e(q), n=REVIEWS[i]['name'], c=crew_of(q)) for i, q in ONE], ensure_ascii=False).replace('</', '<\\/')
    i0, q0 = ONE[0]
    named = [n for n, _ in CREW if any(n in crew_of(q) for _i, q in ONE)]
    chips = ''.join(f'<button type="button" class="dh-f" aria-pressed="false" data-crew="{e(n)}">{e(n)}</button>' for n in named)
    cap0 = ' and '.join(crew_of(q0))
    panes = ''.join(f'<rect class="pp{" on" if k == 0 else ""}" x="{2 + (k % 4) * 9}" y="{2 + (k // 4) * 9}" width="8" height="8" rx="1"/>' for k in range(len(ONE)))
    return f'''<div class="v reviews-2" data-tone="ground2">
  <div class="dh-head"><h2 class="h2x" data-split>What homeowners say</h2>
    <p class="rating"><b class="num">4.9</b>{stars()}<span>474 Google reviews</span> {read_all()}</p></div>
  <div class="dh-filter" role="group" aria-label="Named in these reviews"><span>Named in these reviews:</span><button type="button" class="dh-f" aria-pressed="true" data-crew="">All {len(ONE)}</button>{chips}</div>
  <figure class="dh" tabindex="0" aria-roledescription="quote viewer" aria-label="Homeowner quotes; use the arrow keys or the buttons">
    <svg class="dh-frame" aria-hidden="true" focusable="false"><rect class="dh-case" width="100%" height="100%"/><line class="dh-meet" x1="0" y1="50%" x2="100%" y2="50%"/><svg y="100%" overflow="visible"><rect class="dh-sill" x="-14" y="-4" width="calc(100% + 28px)" height="12"/></svg></svg>
    <svg class="dh-sash" aria-hidden="true" focusable="false"><rect class="dh-glass" width="100%" height="100%"/><rect class="dh-rail" width="100%" height="12"/><rect class="dh-lift" x="46%" y="16" width="8%" height="6" rx="3"/></svg>
    <blockquote class="dh-q" aria-live="polite"><p>“{e(q0)}”</p><footer class="dh-n">{e(REVIEWS[i0]['name'])}<span>{SOURCE}</span></footer></blockquote>
    <div class="dh-ctl"><button class="rb" type="button" data-dir="-1" aria-label="Previous quote"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg></button>
      <svg class="dh-pips" viewBox="0 0 38 20" aria-hidden="true" focusable="false">{panes}</svg>
      <button class="rb" type="button" data-dir="1" aria-label="Next quote"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg></button></div>
  </figure>
  <p class="dh-cap" data-dh-cap>{f"{e(cap0)}: named in {CREW_COUNT[crew_of(q0)[0]]} of the 30 excerpts the firm publishes" if cap0 else ""}</p>
  <script type="application/json" class="dh-data">{data}</script>
</div>'''


def reviews3():
    """[BANK] 300 True Focus (React Bits: focus brackets travel to the next word, unfocused words blur) + anatomy F13
    (reviews that name the operative): the crew as homeowners name them; pointing or tabbing to a name moves the
    brackets there in 0.3 s and the verbatim excerpts that name them come up. No counts, no auto-cycle."""
    # F8 V3.4/6: each review is filed once, under the person it names first; the name carries its own count
    own = {n: [r for r in REVIEWS if crew_name(r['text']) == n] for n, _ in CREW}
    crew = [(n, rx) for n, rx in CREW if own[n]]
    names = ''.join(f'<button class="cr-n" type="button" role="radio" aria-checked="{"true" if k == 0 else "false"}" tabindex="{0 if k == 0 else -1}" data-name="{e(n)}">{e(n)}<span class="cr-k num"> · {len(own[n])}</span></button>' for k, (n, _) in enumerate(crew))
    def about(text, rx, n=240):
        # the excerpt opens at the sentence that names THIS person, so their name is always in view
        m = re.search(rx, text)
        starts = [x.end() for x in re.finditer(r'[.!?]\s+', text[:m.start()])]
        a = starts[-1] if starts else 0
        return ('…' if a else '') + cut(text[a:], n)
    def also(r, n):
        o = [x for x in crew_of(r['text']) if x != n]
        return f'<span class="cr-also">+ also names {e(", ".join(o))}</span>' if o else ''
    cards = ''.join(f'<li class="cr-c" tabindex="-1" data-name="{e(n)}"><blockquote><p>“{mark(about(r["text"], rx))}”</p></blockquote><p class="cr-by">{e(r["name"])}<span>{SOURCE}</span>{also(r, n)}</p></li>'
                    for n, rx in crew for r in own[n])
    br = '<svg class="cr-br" aria-hidden="true" focusable="false"><path d="M2 14V2H14"/><svg x="100%" overflow="visible"><path d="M-2 14V2H-14"/></svg><svg y="100%" overflow="visible"><path d="M2 -14V-2H14"/></svg><svg x="100%" y="100%" overflow="visible"><path d="M-2 -14V-2H-14"/></svg></svg>'
    return f'''<div class="v reviews-3" data-tone="ground">
  <div class="cr-head"><h2 class="h2x" data-split>The crew, as homeowners name them</h2><p class="cr-sub">Point at a name to read what people wrote about them, in their own words, shortened where you see …</p>
    <p class="rating"><b class="num">4.9</b>{stars()}<span>474 Google reviews</span> {read_all()}</p></div>
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
    panes = ''.join(f'<rect x="{(k % 12) * 14}" y="{(k // 12) * 12}" width="12" height="10" rx="1"{" class=\"off\"" if k >= 24 else ""}/>' for k in range(120))
    # F9 V1.1/V1.2: every plan prints its total paid, and the page opens on the cheapest credit (0% for 24 months);
    # the 120-month badge says both halves of the truth
    def tot(apr, n, P=15000):
        return P if apr == 0 else round(pmt(P, apr, n), 2) * n
    plans = ''.join(f'''<button class="pay-t" type="button" role="radio" aria-checked="{'true' if n == 24 else 'false'}" tabindex="{0 if n == 24 else -1}" data-apr="{apr}" data-n="{n}"><b>{a}</b><span>{m}</span><em class="num" data-tot>Total paid ${tot(apr, n):,.2f}</em>{'<i>Lowest payment, highest total cost</i>' if n == 120 else ''}</button>''' for apr, n, a, m in TERMS)
    return f'''<div class="v money-1" data-tone="ground">
  <h2 class="h2x" data-split>The monthly maths, done</h2>
  <div class="pay-grid">
    <div class="pay-fig">
      <p class="pay-big num" aria-hidden="true"><span class="odo" data-odo>$625.00</span><small>/mo</small></p>
      <p class="pay-sub" data-pay="sub">$15,000 over 24 months at 0% APR</p>
      <p class="pay-tot num" data-pay="tot">Total paid: $15,000.00, no interest</p>
      <p class="sr-only" aria-live="polite" data-pay="sr"></p>
      <figure class="pay-term"><svg class="pay-panes" viewBox="0 0 166 118" data-pay="panes" aria-hidden="true" focusable="false">{panes}</svg>
        <figcaption data-pay="cap">24 monthly payments, one pane each; a row is a year</figcaption></figure>
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
                   lo=2, hi=4, moves=['Wall area and stories', "What's under the old siding (rot, sheathing)", 'Whole house or a few walls', 'Trim, soffit and fascia', 'Paint or ColorPlus', 'Profile and details'],
                   moves_h='What moves a siding price, as the firm lists it'),
    'windows': dict(name='Windows', n=376, c=[12, 40, 96, 79, 50, 30, 19, 30, 13, 4, 0, 2, 1], med=3, mid='$5k and $25k', cities=40,
                    lo=2, hi=5, moves=['NT Windows: 238 jobs, median $10k-$15k', 'Simonton: 54 jobs, median $10k-$15k', 'Andersen: 38 jobs, median $20k-$25k', 'Pella: 31 jobs, median $5k-$10k', 'All other brands: 15 jobs'],
                    moves_h='Median by brand, from the same job files'),
}
assert sum(DIST['siding']['c']) == 415 and sum(DIST['windows']['c']) == 376
for _d in DIST.values():   # F9 V2.1: the sentence states the chart's own share (siding 269/415 = 64.8 %, windows 255/376 = 67.8 %)
    _k = sum(_d['c'][_d['lo']:_d['hi'] + 1])
    _d['share'] = f"{_k} of {_d['n']} ({_k / _d['n'] * 100:.1f}%)"
assert DIST['siding']['share'].startswith('269 of 415 (64.8%') and DIST['windows']['share'].startswith('255 of 376 (67.8%')


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
    return f'''<div class="v money-2" data-tone="ground2">
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
      <p class="dd-mid">About two-thirds of them, <span data-dd-share>{d['share']}</span>, landed between <b data-dd-mid>{d['mid']}</b>.</p>
      <p class="dd-mh" data-dd-mh>{e(d['moves_h'])}</p>
      <ol class="dd-moves" data-dd-moves>{moves}</ol>
    </div>
  </div>
  <p class="fine">Charts show 2022-2026 jobs from the 2018-2026 project file. A documented sample, not every job since 2009: 1,590 individually priced trades on 886 documented projects. Bands are materials and labour, before discounts, excluding tax.</p>
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
      <div class="rcp-mini" aria-label="The firm's own worked example"><p class="rcp-mk">The firm's own example</p>
        <p><span>Project</span><b class="num">$30,000</b></p><p><span>Holiday Savings</span><b class="num">-10%</b></p><p><span>Hometown Heroes</span><b class="num">-5%</b></p><p><span>Pay in full</span><b class="num">-10%</b></p><p class="rcp-mt"><span>With all three</span><b class="num">$22,500</b></p></div>
      <p class="rcp-ask">Tick only what applies to you:</p>
      <div class="rcp-opts">
        <label class="tick"><input type="checkbox" data-pct="5"><span>Hometown Heroes: veterans and military, teachers, seniors, first responders</span></label>
        <label class="tick"><input type="checkbox" data-pct="10"><span>Pay in full by cash, check or ACH (not with financing)</span></label>
      </div>
      <div class="rcp-cta">{btn_book('btn btn-ink', 'Book a free inspection')}<a class="tlink" href="{TEL}">Call {PHONE}</a></div>
    </div>
    <div class="rcp">
      <svg class="rcp-perf" viewBox="0 0 400 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 5H400"/></svg>
      <p class="rcp-h">Your estimate</p>
      <div class="rcp-l rcp-amt"><span>Project <small class="rcp-cap">up to $500,000</small></span><label class="rcp-in"><span class="sr-only">Project amount in dollars, up to $500,000</span>$<input type="text" inputmode="numeric" value="30,000" autocomplete="off" aria-describedby="rcp-capnote"></label></div>
      <p class="rcp-capnote" id="rcp-capnote" aria-live="polite" hidden>Estimates here stop at $500,000.</p>
      <div class="rcp-l" data-line="h"><span>Holiday Savings, on contracts signed through November 30, 2026</span><b>-10%</b></div>
      <div class="rcp-l" data-line="5"><span>Hometown Heroes</span><b>-5%</b></div>
      <div class="rcp-l" data-line="p"><span>Pay in full</span><b>-10%</b></div>
      <div class="rcp-tot" aria-live="polite"><span>You pay</span><b class="num"><span class="rcp-now" data-now>$27,000</span><svg class="rcp-strike" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M2 13C30 9 64 12 98 6"/></svg></b></div>
      <p class="rcp-save num">You save <b data-save>$3,000</b> on <span data-list>$30,000</span></p>
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


# Audit pack F10.2: the prototype says what it is BEFORE the first field, and its last step never claims a save
PROTO = f'Concept site: this form is a working prototype and sends nothing. To book for real, call {PHONE}.'


def form(pref, theme='', panes=False):
    chips = ''.join(f'<label class="ck"><input type="checkbox" name="trade" value="{t}"><span>{t}</span></label>' for t in BOOK_TRADES)
    radios = ''.join(f'<label class="ck"><input type="radio" name="{pref}-band" value="{b}"><span>{b}</span></label>' for b in BANDS)
    return f'''<form class="bk {theme}" data-form novalidate aria-label="Request a free inspection">
      <p class="bk-proto">{PROTO}</p>
      <p class="bk-k num" aria-live="polite">{PANES3 if panes else ''}<span>1</span> of 3</p>
      <fieldset class="bk-step is-on" data-step="1" aria-describedby="{pref}-e1"><legend>Where is the house, and what should we look at?</legend>
        <div class="fld"><label for="{pref}-zip">ZIP code</label><input id="{pref}-zip" name="zip" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="5" required aria-describedby="{pref}-zip-e"><p class="bk-err" id="{pref}-zip-e" hidden>ZIP codes have 5 digits, like 78752.</p></div>
        <div class="cks">{chips}</div><p class="bk-err" id="{pref}-e1" hidden>Pick at least one, so the right person comes out.</p></fieldset>
      <fieldset class="bk-step" data-step="2" hidden aria-describedby="{pref}-e2"><legend>Roughly what budget?</legend>
        <div class="cks">{radios}</div><p class="bk-err" id="{pref}-e2" hidden>Pick a band, or "Not sure yet".</p></fieldset>
      <fieldset class="bk-step" data-step="3" hidden><legend>Where should we call you?</legend>
        <div class="fld"><label for="{pref}-name">First name</label><input id="{pref}-name" name="name" type="text" autocomplete="given-name" required aria-describedby="{pref}-name-e"><p class="bk-err" id="{pref}-name-e" hidden>Add your first name.</p></div>
        <div class="fld"><label for="{pref}-tel">Phone</label><input id="{pref}-tel" name="tel" type="tel" autocomplete="tel" inputmode="tel" required aria-describedby="{pref}-tel-e"><p class="bk-err" id="{pref}-tel-e" hidden>Phone numbers have 10 digits, like (512) 550-0000.</p></div>
      </fieldset>
      <div class="bk-done" tabindex="-1" hidden><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 25l7 7 15-16"/></svg><p class="bk-done-h">Thanks, <span data-done-name>there</span>. Nothing was sent.</p><p>This form is a design prototype, so your answers stayed on this page. To book for real, call <a class="tlink" href="{TEL}">{PHONE}</a>: {HOURS}.</p></div>
      <div class="bk-nav"><button class="bk-back tlink" type="button" hidden>Back</button><button class="btn btn-ink bk-next" type="button">Continue</button><button class="btn btn-red bk-send" type="submit" hidden>Request my inspection</button></div>
    </form>'''


def book1():
    return f'''<div class="v book-1 has-bgf" data-tone="red">
  <h2 class="h2x b1-h" data-split>See your price in writing</h2>
  <p class="b1-sub">Free inspection, 30 to 60 minutes, no obligation. You get the scope, materials and price.</p>
  <div class="b1-paths b1-one">
    <div class="b1-path"><p class="b1-pk">Call the office</p><a class="b1-tel" href="{TEL}" data-cur="alt" data-cur-label="Call">{PHONE}</a>
      <p class="b1-hours">Office hours: {HOURS}</p>
      <p class="b1-or">Or <button class="b1-open tlink" type="button" aria-expanded="false" aria-controls="b1-panel">book online</button>: two minutes of questions; the office calls back with times.</p></div>
  </div>
  <div class="b1-panel" id="b1-panel" hidden>{form('b1', 'bk-card')}</div>
</div>'''


def book2():
    return f'''<div class="v book-2" data-tone="red">
  <div class="b2-grid">
    <figure class="b2-ph">{img(H + 'book-1000.webp', 1000, 625, alt(HOME_PAIRS[0]['aa']))}<figcaption><b>After</b> {e(HOME_PAIRS[0]['p'])}, {e(HOME_PAIRS[0]['w'])}. {e(HOME_PAIRS[0]['bl'])} {band(HOME_PAIRS[0]['b'])}</figcaption></figure>
    <div class="b2-form"><h2 class="h2x" data-split>See your price in writing</h2><p class="b2-sub">Free inspection, 30 to 60 minutes, no obligation. Or call <a class="tlink b2-tel" href="{TEL}">{PHONE}</a>.</p>{form('b2', 'bk-card', panes=True)}</div>
  </div>
</div>'''


def book3():
    """Q413 Tequila conversational form: the request written as one sentence with inline fields, plus the reply promise
    in the firm's own words (30 to 60 minute inspection; scope, materials and price; office hours)"""
    trades = ''.join(f'<option{" selected" if t == "Siding" else ""}>{e(t)}</option>' for t in BOOK_TRADES)
    bands = ''.join(f'<option{" selected" if b_ == "Not sure yet" else ""}>{e(b_)}</option>' for b_ in BANDS)
    return f'''<div class="v book-3" data-tone="red">
  <form class="snt-form" data-snt novalidate aria-labelledby="snt-h">
    <h2 class="h2x snt-h" id="snt-h" data-split>Book it in one sentence</h2>
    <p class="snt-proto">{PROTO}</p>
    <p class="snt">Hi Austin Pro, I'm <span class="snt-in"><input name="name" type="text" autocomplete="given-name" aria-label="Your first name" placeholder="your name" size="9" required aria-describedby="snt-e-name"><svg class="snt-ch" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 4Q50 9 100 4"/></svg></span>.
      Could you look at my <span class="snt-sel"><select name="trade" aria-label="What to look at">{trades}</select></span>
      in <span class="snt-in"><input name="zip" type="text" inputmode="numeric" autocomplete="postal-code" maxlength="5" aria-label="Your ZIP code" placeholder="ZIP" size="5" required aria-describedby="snt-e-zip"><svg class="snt-ch" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 4Q50 9 100 4"/></svg></span>?
      My budget is roughly <span class="snt-sel"><select name="band" aria-label="Rough budget">{bands}</select></span>.
      Call me on <span class="snt-in"><input name="tel" type="tel" inputmode="tel" autocomplete="tel" aria-label="Your phone number" placeholder="phone" size="12" required aria-describedby="snt-e-tel"><svg class="snt-ch" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M0 4Q50 9 100 4"/></svg></span>.</p>
    <ul class="snt-err" aria-live="polite" hidden></ul>
    <div class="snt-go"><button class="btn btn-red snt-send" type="submit" data-cur="hero">Send my request</button>
      <p class="snt-promise">Free inspection, 30 to 60 minutes, no obligation. You get the scope, materials and price in writing. The office calls you back to pick a time: {HOURS}.</p></div>
    <div class="snt-done" tabindex="-1" hidden><p class="bk-done-h">Thanks, <span data-snt-name>there</span>. Nothing was sent.</p><p>This sentence is a design prototype, so it stayed on this page. To book for real, call <a class="tlink on-dark" href="{TEL}">{PHONE}</a>: {HOURS}.</p></div>
  </form>
  <p class="b3-call">Rather talk? <a class="tlink on-dark" href="{TEL}">{PHONE}</a></p>
</div>'''


# ---------- page ----------
SECTIONS = [
    ('hero', 'Hero', [hero1, hero2, hero3], ['Window letters', 'Pick your project', 'Real work']),
    ('proof', 'Proof', [proof1, proof2, proof3], ['Record', 'At a glance', 'Statement']),
    ('services', 'Services', [services1, services2, services3], ['Point at it', 'Index', 'Tape measure']),
    ('work', 'Work', [work1, work2, work3], ['Drag', 'Blueprint', 'Lens']),
    ('built', 'Built', [built1, built2, built3, built_clad], ['Taken apart', 'Built for Texas', 'To the inch', 'Clad the gable']),
    ('colour', 'Colour', [colour1, colour2, colour3], ['Try it on your house', 'Paint or ColorPlus', 'Colour book']),
    ('near', 'Near you', [near1, near2, near3], ['Survey', 'Town by town', 'Neighbourhood drive']),
    ('reviews', 'Reviews', [reviews1, reviews2, reviews3], ['Stream', 'One', 'The crew']),
    ('money', 'Money', [money1, money2, money3], ['Amount', 'What people paid', 'Receipt']),
    ('book', 'Book', [book1, book2, book3], ['Call', 'Form', 'One sentence']),
]

# MASTER DIRECTIVE Phase 5: five new versions per section (src/versions.py) join the three improved ones; Built's fourth
# is Phase 4's Clad the gable, so it takes four. The switcher runs 1-8.
import versions
for _i, (_k, _l, _f, _n) in enumerate(SECTIONS):
    _new = versions.BUILDERS[_k](sys.modules[__name__])[:8 - len(_f)]
    SECTIONS[_i] = (_k, _l, _f + [(lambda h=h: h) for _nm, h in _new], _n + [nm for nm, _h in _new])


NEXT = {   # K7 / BRIEF-V6 §12.1: every version carries the phone in a contact path; a version without one ends on this line
    'proof': 'Check any of this with the office.', 'services': 'One free inspection covers every trade on the house.',
    'work': 'Want your house priced like these?', 'built': 'Questions about the board or the warranty?',
    'colour': 'Want the samples in your hands?', 'near': 'Near you? Inspections are free.',
    'reviews': 'Talk to the office yourself.', 'money': 'Questions about the plans or the offers?',
}


def with_phone(key, v):
    if TEL in v:
        return v
    book = '' if key == 'money' else ' <span class="ns-or">or</span> <a class="tlink" href="#book" data-book>book a free inspection</a>'   # F9 V1.4: no third booking intent inside financing
    line = f'<p class="nextstep"><span>{e(NEXT[key])}</span> <a class="tlink" href="{TEL}">Call {PHONE}</a>{book}</p>'
    i = v.rindex('</div>')
    return v[:i] + line + '\n' + v[i:]


BK = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backup')
BK_SLOT = 8   # MASTER DIRECTIVE Phase 5: visible versions 1-8; backups live in slots 9-14, Backup n = slot 8 + n.
           # Backups 1-3 are the pre-audit-round versions (era a), Backups 4-6 the versions frozen before the redesign (era b)


OLD_STARS = re.compile(r'<span class="stars" aria-hidden="true">(?:<svg viewBox="0 0 20 20"><path d="[^"]+"/></svg>){5}</span>')


def facts_pass(html):
    """corrections of FACT reach the frozen backups too (the facts lock outranks the freeze): the star graphics say 4.9,
    not 5.0 (C.9). Design stays as it was built."""
    html = html.replace('<span class="ps-st" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>', stars('ps-st'))
    html = OLD_STARS.sub(lambda m: stars(), html)
    for a, b in FACT_FIX:
        html = html.replace(a, b)
    return html


FACT_FIX = [   # (old, new) pairs: corrections of fact or honesty that also reach the frozen backups
    ('Request saved, <span data-done-name>thanks</span>', 'Thanks, <span data-done-name>there</span>. Nothing was sent'),   # F10.2
    ('Request saved, <span data-snt-name>thanks</span>', 'Thanks, <span data-snt-name>there</span>. Nothing was sent'),
    ('The office calls you back to pick a time', 'This is a design prototype; to book for real, call (512) 550-0000'),
    ('Half of them landed between', 'The middle half of them landed between'),   # F9.1: the published middle half, said as such
    ('<p class="cr-sub">Point at a name to read what people wrote about them, word for word.</p>',   # F8 V3.1/2: 474 in every reviews state
     '<p class="cr-sub">Point at a name to read what people wrote about them, in their own words, shortened where you see …</p><p class="rating"><b class="num">4.9</b> on 474 Google reviews</p>'),
]


def backups(key):
    """the pre-round versions of a section, frozen as built (backup/<key>-b<n>.html): never the default, never deleted"""
    names = open(os.path.join(BK, f'{key}-names.txt'), encoding='utf-8').read().split('|')
    rd = lambda n: open(os.path.join(BK, f'{key}-b{n}.html'), encoding='utf-8').read()
    # era a passes through the facts fix it always had; era b was frozen after every fix and is served byte-identical
    return [(BK_SLOT + n, facts_pass(rd(n)) if n <= 3 else rd(n), names[n - 1]) for n in range(1, len(names) + 1)]


EYEBROW = {'proof': 'The record', 'services': 'What we install', 'work': 'Before, after, priced', 'built': 'How it is built',
           'colour': 'Colour', 'near': 'Near you', 'reviews': 'Reviews', 'money': 'Financing', 'book': 'Free inspection'}


def section(key, label, fns, names):
    vs = [with_phone(key, f()) for f in fns]
    if key == 'hero':   # Phase 3: the drawn street is the hero's centrepiece band in every visible version
        vs = [v if 'nv-street' in v else v[:v.rfind('</div>')] + f'<div class="art-band art-band--street">{art.street(f"st{n}")}</div></div>' for n, v in enumerate(vs, 1)]
    else:               # Phase 3: an accent eyebrow over the first heading, and the section's trade-object drawing
        num = [k for k, *_ in SECTIONS].index(key) + 1
        eb = f'<p class="eyebrow" aria-hidden="true"><span>{num:02d}</span>{EYEBROW[key]}</p>'
        vs = [re.sub(r'(<h2\b)', eb + r'\1', v, count=1) for v in vs]
        vs = [v[:v.rfind('</div>')] + f'<div class="art-corner">{art.motif(key)}</div></div>' for v in vs]
    bks = backups(key)
    tabs = ''.join(f'<button class="vsw-b" type="button" role="tab" id="{key}-tab{n}" aria-selected="{"true" if n == 1 else "false"}" aria-controls="{key}-stage" tabindex="{0 if n == 1 else -1}" data-v="{n}" aria-label="{label} version {n}: {e(nm)}">{n}</button>'
                   for n, nm in enumerate(names, 1))
    # visible versions and backups interleaved (v1, Backup 1, v2, Backup 2 ...) so the packer's deflate window pairs them
    order = []
    for n, v in enumerate(vs, 1):
        order.append(f'<template data-v="{n}">{v}</template>')
        for bv, bh, _nm in bks:   # each backup sits next to the visible version it descends from (deflate window)
            if (bv - BK_SLOT - 1) % 3 + 1 == n and n <= 3:
                order.append(f'<template data-v="{bv}" data-bk>{bh}</template>')
    bk_names = '|'.join(nm for _n, _v, nm in bks)
    return f'''<section class="sec sec-{key}" id="{key}" data-sec="{key}" data-names="{e('|'.join(names))}" data-bk-names="{e(bk_names)}" aria-label="{label}">
  <div class="vsw-rail"><div class="vsw" role="tablist" aria-label="{label} versions"><span class="vsw-l" aria-hidden="true"><b>{label}</b> <span>{e(names[0])}</span></span>{tabs}</div></div>
  <div class="stage" id="{key}-stage" role="tabpanel" aria-labelledby="{key}-tab1">{vs[0]}</div>
  {''.join(order)}
</section>'''


def head(title='Austin Pro Siding, Windows &amp; Roofing | Priced in public', desc='Siding, windows and roofing in Austin since 2009, with real prices from 886 documented jobs. A concept redesign with versions of every section.', page='home'):
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
<title>{title}</title>
<meta name="description" content="{desc}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="assets/img/brand/2026-10-31/favicon.svg" type="image/svg+xml">
<link rel="preload" href="assets/fonts/Poppins-700-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/Roboto-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/home.css">
<script>document.documentElement.classList.add('js')</script>
<script type="application/ld+json">{json.dumps(ld)}</script>
</head>
<body data-page="{page}">
<a class="skip" href="#main">Skip to content</a>
'''


def brand(cls, tag='span'):
    """REBRAND 2026-10-31: the course-gable mark (law of closure, S1422) in currentColor, coloured by the
    --color-logo-mark token; the wordmark is live Poppins set in the text token. Masters: assets/img/brand/2026-10-31/."""
    return (f'<{tag} class="brand {cls}"><svg class="brand-mark" viewBox="0 0 64 64" aria-hidden="true" focusable="false">'
            f'{course_mark("currentColor")}</svg><span class="brand-w"><span class="brand-n">Austin Pro</span>'
            f'<span class="brand-d">Siding · Windows · Roofing · Patio covers</span></span></{tag}>')


SITE_NAV = [('siding.html', 'Siding', 'siding'), ('windows.html', 'Windows &amp; doors', 'windows'), ('roofing.html', 'Roofing', 'roofing'),
            ('outdoor.html', 'Patios &amp; decks', 'outdoor'), ('projects.html', 'Our work', 'projects'), ('financing.html', 'Financing', 'financing'),
            ('about.html', 'About', 'about')]


def header(page='home'):
    """the site's own navigation on every page (owner order: the full website); the current page is marked"""
    nav = ''.join(f'<a href="{h}"{" aria-current=\"page\"" if k == page else ""}>{t}</a>' for h, t, k in SITE_NAV)
    return f'''<header class="hd">
  <a class="hd-logo" href="{'#main' if page == 'home' else 'index.html'}" aria-label="Austin Pro Siding, Windows and Roofing, {'top of page' if page == 'home' else 'home'}">{brand("brand--hd")}</a>
  <nav class="hd-nav" aria-label="Site">{nav}</nav>
  <button class="hd-motion" type="button" data-motion-btn aria-pressed="true"><svg viewBox="0 0 22 14" aria-hidden="true" focusable="false"><rect class="mt-k" x="1" y="1" width="20" height="12" rx="6"/><circle class="mt-d" cx="15" cy="7" r="3.6"/></svg><span data-motion-t>Motion on</span></button>
  <a class="hd-tel" href="{TEL}">{PHONE}</a>
  <a class="btn btn-red btn-sm hd-book" href="{'#book' if page == 'home' else 'contact.html'}"{' data-book' if page == 'home' else ''} aria-label="Book free inspection"><span class="long">Book free inspection</span><span class="short" aria-hidden="true">Book</span></a>
  <button class="hd-menu" type="button" aria-expanded="false" aria-controls="sheet">Menu</button>
</header>
<div class="sheet" id="sheet" hidden><nav aria-label="Site, mobile">{nav}<a href="{'#book' if page == 'home' else 'contact.html'}">Book free inspection</a><a href="{TEL}">Call {PHONE}</a><button class="sh-motion" type="button" data-motion-btn aria-pressed="true"><span data-motion-t>Motion on</span></button></nav></div>
'''


CODE = {'hero': 'H', 'proof': 'P', 'services': 'S', 'work': 'W', 'built': 'B', 'colour': 'C', 'near': 'N', 'reviews': 'R', 'money': 'M', 'book': 'Bk'}


def picks():
    """version picker. The code reads H1 P1 S1 ... (Audit pack D.7: never grouped like a phone number). Backups sit
    behind a closed disclosure: reachable, never the default (A.2)."""
    rows = ''.join(f'''<li><span>{label}</span><div class="pk-seg" role="radiogroup" aria-label="{label} version" data-for="{key}">{''.join(f'<button type="button" role="radio" aria-checked="{"true" if n == 1 else "false"}" data-v="{n}" title="{e(nm)}">{n}</button>' for n, nm in enumerate(names, 1))}</div></li>''' for key, label, _f, names in SECTIONS)
    bk_rows = ''.join(f'''<li><span>{label}</span><div class="pk-bk" data-for="{key}">{''.join(f'<button type="button" aria-pressed="false" data-v="{v}" title="{e(nm)}">Backup {v - BK_SLOT}</button>' for v, _h, nm in backups(key))}</div></li>''' for key, label, _f, _n in SECTIONS)
    code0 = ' '.join(f'{CODE[k]}1' for k, *_ in SECTIONS)
    return f'''<div class="picks">
  <button class="pk-btn" type="button" aria-expanded="false" aria-controls="pk-panel"><span>Versions</span><b class="num" data-pk-code>{code0}</b></button>
  <div class="pk-panel" id="pk-panel" role="dialog" aria-label="Versions" hidden>
    <p class="pk-h">Versions</p><p class="pk-code num" data-pk-code2>{code0}</p>
    <p class="pk-tip">Switch any section here or with its numbered buttons. Keys 1 to 8 switch the section in view.</p>
    <ul class="pk-list">{rows}</ul>
    <details class="pk-more"><summary>Backups: the versions from before this round</summary><ul class="pk-list">{bk_rows}</ul></details>
    <label class="pk-motion"><input type="checkbox" data-motion checked><span>Motion</span></label>
    <div class="pk-pal"><span id="pk-pal-l">Cursor companion</span><div class="pal-sw" role="radiogroup" aria-labelledby="pk-pal-l"><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="sash">Sash</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="gable">Gable</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="chip">Chip</button><button type="button" role="radio" aria-checked="false" tabindex="-1" data-pal="off">Off</button></div><p class="pk-pal-note">The companion follows a mouse pointer. It stays off on touch screens and with motion off.</p></div>
    <div class="pk-act"><button class="btn btn-ink btn-sm" type="button" data-copy>Copy the version list</button><button class="tlink" type="button" data-reset>Reset</button></div>
    <p class="pk-msg" aria-live="polite"></p>
  </div>
</div>'''


def footer(page='home'):
    site = ''.join(f'<a href="{h}">{t}</a>' for h, t, _k in SITE_NAV) + '<a href="contact.html">Contact &amp; booking</a>'
    return f'''<footer class="ft" data-tone="night">
  <div class="ft-top"><p class="ft-logo" role="img" aria-label="Austin Pro Siding, Windows and Roofing">{brand("brand--ft")}</p>
    <p class="ft-big"><a href="{TEL}">{PHONE}</a></p></div>
  <div class="ft-grid">
    <p><b>Office</b>{ADDRESS}</p>
    <p><b>Hours</b>{HOURS}</p>
    <p><b>Write</b><a href="mailto:{EMAIL}">{EMAIL}</a></p>
    {'' if page != 'home' else '''<nav aria-label="Footer"><b>On this page</b><a href="#work">Work</a><a href="#colour">Colour</a><a href="#near">Near you</a><a href="#money">Financing</a><a href="#book">Book</a><button class="ft-motion" type="button" data-motion-btn aria-pressed="true"><svg viewBox="0 0 22 14" aria-hidden="true" focusable="false"><rect class="mt-k" x="1" y="1" width="20" height="12" rx="6"/><circle class="mt-d" cx="15" cy="7" r="3.6"/></svg><span data-motion-t>Motion on</span></button></nav>'''}<nav aria-label="Site"><b>The site</b><a href="index.html">Home</a>{site}</nav>
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
    # house style turns en dashes into hyphens, the hours string included (Audit pack C.14 closes K2)
    out = clean(body)
    with open(os.path.join(SITE, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(out)
    words = len(re.sub(r'<[^>]+>', ' ', re.sub(r'<template.*?</template>|<script.*?</script>|<style.*?</style>', ' ', out, flags=re.S)).split())
    print('index.html', len(out) // 1024, 'KB; visible words in the default mix (approx):', words)


if __name__ == '__main__':
    build()
