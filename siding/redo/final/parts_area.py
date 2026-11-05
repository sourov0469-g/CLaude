"""SECTION 9 — Area, Version A ("Thread board", "On your street"), rebuilt. Sixteen of the firm's own project photos are pinned to a dim board on a sagging thread; a
street-sign post lists the seven towns with the firm's own documented-project tallies (near.json); pick a town and its threads are pulled from the sign to its photos
and the rest dim; trade chips filter the same board; a card opens an in-page viewer with the record exactly as photos.json has it (place, month, trades).
Fact lock: 886 exactly as "312 on the map with photos + 574 more counted"; no 'since 2018' (unpublished). No map. No outside link: the old build linked each card
to the firm's own website, which is now an in-page viewer. Photos: assets/area/pN.webp (tools/area_prep.py crops/re-encodes the firm's published photos)."""
import base64, collections, html, json, os, re
e = html.escape
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = os.path.join(HERE, '..', '..', 'work'); PRE = os.path.join(HERE, '..', 'prep', 'backgrounds')
REPLACES = ['area']
CSS = 'area.css'; JS = 'area.js'; GLOBAL = 'FArea'
LOCK = '886 projects: 312 on the map with photos + 574 more counted'
TOWNS = ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda']
# the pinned photos, in board order (4 columns, row by row): photos.json index, the photo-frame shape
BOARD = [(35, 's'), (11, 'l'), (2, 'p'), (12, 'w'), (28, 'l'), (18, 'l'), (33, 'l'), (41, 'p'), (16, 's'), (34, 'l'), (22, 'p'), (15, 'l'), (27, 'l'), (36, 'l'), (30, 'w'), (20, 'l')]
AR = {'l': '4/3', 'p': '3/4', 's': '1/1', 'w': '16/10'}
WD = {'l': '100%', 'p': '80%', 's': '90%', 'w': '100%'}   # card width by frame shape, so a row's cards hang at similar heights
ROT = [-3.2, 2.4, -1.6, 3.1, -2.4, 1.8, -3.0, 2.6, -1.9, 3.3, -2.7, 1.5, -3.4, 2.2, -1.4, 2.9]
DY = [10, 0, 26, 6, 0, 22, 4, 0, 18, 6, 0, 24, 2, 14, 0, 10]
TRADE_ORDER = ['Siding', 'Windows', 'Shingle Roofing', 'Metal Roofing', 'Exterior Painting', 'Gutters', 'Doors', 'Garage Doors', 'Patio Covers', 'Decking']
SEARCH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="m20 20-4-4"/></svg>'
PLUS = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>'
CLOSE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 5-7 7 7 7"/></svg>'
NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg>'
PH = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>'


def trades_of(t):
    return [x.strip() for x in t.replace(' & ', ', ').split(',') if x.strip()]


def town_of(place):
    return place.split(',')[-1].strip() if ',' in place else place.strip()


def data():
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); N = json.load(open(os.path.join(WORK, 'data', 'near.json')))
    tally = {g[0]: g[6] for g in N['g'] if g[1] == 'c'}
    ct = N['ct']; cnt = collections.Counter();
    hoods = {t: collections.Counter() for t in TOWNS}
    canon = {k.lower(): k for k in tally}
    for q in N['p']:
        if q[5] < 0: continue
        pl = N['pl'][q[5]]; town = canon.get(ct[q[4]].strip().lower(), ct[q[4]].strip())
        if town in hoods and ',' in pl and town_of(pl).lower() == town.lower():
            hoods[town][pl.split(',')[0].strip()] += 1
    return P, N, tally, {t: [h for h, _ in c.most_common(7)] for t, c in hoods.items()}


def art(f, cls, tag):
    s = open(os.path.join(PRE, f)).read().replace(' xmlns="http://www.w3.org/2000/svg"', '')
    s = re.sub(r'id="(\w+)"', lambda m: f'id="{tag}{m.group(1)}"', s); s = re.sub(r'url\(#(\w+)\)', lambda m: f'url(#{tag}{m.group(1)})', s); s = re.sub(r'href="#(\w+)"', lambda m: f'href="#{tag}{m.group(1)}"', s)
    return s.replace('<svg ', f'<svg class="{cls}" aria-hidden="true" focusable="false" ', 1)


def markup(S, contact, cal):
    P, N, tally, hoods = data()
    assert LOCK == '886 projects: 312 on the map with photos + 574 more counted'
    for t in TOWNS: assert t in tally, t
    # the cards
    cards, seen = [], []
    for k, (i, shape) in enumerate(BOARD):
        q = P[i]; place, when, trades = q['place'], q['when'], q['trades']; town = town_of(place); assert town in TOWNS, (i, town)
        hood = place.split(',')[0].strip() if ',' in place else place
        sub = (town + ' · ' + when) if ',' in place else when
        raw = open(os.path.join(HERE, 'assets', 'area', f'p{i}.webp'), 'rb').read()
        from PIL import Image
        import io
        w, h = Image.open(io.BytesIO(raw)).size
        src = 'data:image/webp;base64,' + base64.b64encode(raw).decode()
        trs = trades_of(trades); seen += trs
        alt = f'{trades} job in {place}, Texas'
        rec = f'{place} · {when} · {trades}'
        cards.append(f'''<li class="ar-c" data-i="{i}" data-town="{e(town)}" data-tr="{e('|'.join(trs))}" style="--r:{ROT[k]}deg;--dy:{DY[k]}px;--d:{(k * 0.37) % 2.4:.2f};--a:{0.55 + (k % 4) * 0.17:.2f}deg;--ar:{AR[shape]};--w:{WD[shape]}"><i class="ar-pin{' g' if k % 4 == 1 else ''}" aria-hidden="true"></i>
<button type="button" class="ar-card" tabindex="{0 if k == 0 else -1}" aria-haspopup="dialog" aria-label="{e(rec)}. Open photo" data-rec="{e(rec)}" data-place="{e(place)}" data-hood="{e(hood)}" data-when="{e(when)}" data-trades="{e(trades)}" data-alt="{e(alt)}"><span class="ar-lift"><span class="ar-sw"><span class="ar-ph"><img src="{src}" alt="" width="{w}" height="{h}" decoding="async"><span class="ar-zoom" aria-hidden="true">{PLUS}</span></span>
<span class="ar-cap"><b>{e(hood)}</b><small>{e(sub)}</small><em>{e(trades)}</em></span></span></span></button></li>''')
    order = [t for t in TRADE_ORDER if t in seen]; assert set(seen) <= set(TRADE_ORDER), set(seen) - set(TRADE_ORDER)
    chips = '<button type="button" role="radio" class="ar-chip" data-t="all" aria-checked="true" tabindex="0">All trades</button>' + ''.join(f'<button type="button" role="radio" class="ar-chip" data-t="{e(t)}" aria-checked="false" tabindex="-1">{e(t)}</button>' for t in order)
    signs = ''.join(f'''<button type="button" class="ar-sign" data-town="{e(t)}" data-n="{tally[t]}" data-hoods='{e(json.dumps(hoods[t]), quote=True)}' aria-pressed="false" style="--t:{[-.9, .7, -.5, 1.0, -.8, .5, -.6][i]}deg;--o:{[0, 6, -3, 8, -2, 5, 0][i]}px"><i class="ar-nail" aria-hidden="true"></i><span class="ar-sn">{e(t)}</span><span class="ar-sc"><span class="ar-num" data-cu="{tally[t]}">{tally[t]}</span><span class="sr"> documented projects</span></span></button>''' for i, t in enumerate(TOWNS))
    finder = sorted([[g[0], g[6]] for g in N['g'] if g[1] == 'c'], key=lambda r: (-r[1], r[0].lower()))
    places = sorted({p.strip() for p in N['pl'] if p.strip() and ',' in p}, key=str.lower)
    blob = json.dumps({'cities': finder, 'places': places}, separators=(',', ':')).replace('<', '\\u003c')
    a, b, c = (int(x) for x in re.findall(r'\d+', LOCK))
    lock = f'<b class="ar-big" data-cu="{a}">{a}</b> projects: <b class="ar-big" data-cu="{b}">{b}</b> on the map with photos + <b class="ar-big" data-cu="{c}">{c}</b> more counted'
    assert re.sub(r'<[^>]+>', '', lock) == LOCK
    return f'''<section class="ar" id="area" aria-labelledby="ar-h"><div class="ar-bg" aria-hidden="true">{art('area-far.svg', 'ar-far', 'arf')}{art('area-near.svg', 'ar-near', 'arn')}</div>
<div class="ar-in">
<header class="ar-hd"><div class="ar-ht"><h2 class="ar-h" id="ar-h">On your street.<svg class="ar-sq" viewBox="0 0 300 36" aria-hidden="true" focusable="false"><path class="ar-sqp" pathLength="1" d="M4 22C40 6 62 32 102 18S164 6 196 20 262 30 290 14"/><circle class="ar-sqc" cx="292" cy="13" r="6"/></svg></h2>
<p class="ar-lead">Real jobs from our own project files, pinned where they happened. Pick a town to pull its threads.</p></div>
<p class="ar-lock">{lock}</p></header>
<div class="ar-chips" role="radiogroup" aria-label="Filter the photos by trade">{chips}</div>
<div class="ar-board"><svg class="ar-threads ar-fanl" aria-hidden="true" focusable="false"><g class="ar-fan"></g></svg><svg class="ar-threads ar-mainl" aria-hidden="true" focusable="false"><path class="ar-ms" pathLength="1000"/><path class="ar-main" pathLength="1000"/></svg>
<aside class="ar-post" aria-label="Towns and the town finder"><p class="ar-pn" id="ar-pn">Projects documented per town</p>
<div class="ar-pole" role="group" aria-labelledby="ar-pn"><i class="ar-rod" aria-hidden="true"></i><i class="ar-finial" aria-hidden="true"></i>{signs}</div>
<div class="ar-read" aria-live="polite" aria-atomic="true"></div>
<form class="ar-find" role="search" autocomplete="off" novalidate><label class="ar-fl" for="ar-q">Find your town or neighbourhood</label><div class="ar-fw"><span class="ar-fi">{SEARCH}</span><input id="ar-q" type="search" role="combobox" aria-expanded="false" aria-controls="ar-lb" aria-autocomplete="list" placeholder="Try Round Rock or Maple Run" enterkeyhint="search" spellcheck="false"><ul id="ar-lb" role="listbox" aria-label="Matches in our records" hidden></ul></div></form></aside>
<ol class="ar-cards" aria-label="Pinned project photos">{''.join(cards)}</ol></div>
<div class="ar-end"><p class="ar-endp">Your street not on a sign? Call and ask.</p><div class="ar-act"><a class="btn key" href="{contact}">Book a free inspection<span class="tab">{cal}</span></a><a class="callx" href="tel:+15125500000">{PH}(512) 550-0000</a></div></div></div>
<dialog class="ar-dlg" aria-labelledby="ar-dt" aria-describedby="ar-dr"><div class="ar-dwrap"><i class="ar-dpin" aria-hidden="true"></i><button type="button" class="ar-dx" aria-label="Close photo">{CLOSE}</button>
<figure class="ar-dfig"><img alt="" decoding="async"></figure>
<div class="ar-dtxt"><p class="ar-dk" aria-live="polite"></p><h3 class="ar-dt" id="ar-dt"></h3><p class="ar-dr" id="ar-dr"></p><p class="ar-dtn"></p>
<div class="ar-dact"><button type="button" class="ar-dshow"></button><a class="btn key ar-dbook" href="{contact}">Book a free inspection<span class="tab">{cal}</span></a></div></div>
<div class="ar-dnav"><button type="button" class="ar-dp" aria-label="Previous photo">{PREV}</button><button type="button" class="ar-dn" aria-label="Next photo">{NEXT}</button></div></div></dialog>
<script type="application/json" id="ar-data">{blob}</script></section>'''
