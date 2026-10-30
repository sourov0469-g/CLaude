"""MASTER DIRECTIVE Phase 5: the new versions, five per section (four for Built, whose fourth slot is Phase 4's Clad the
gable). Each one differs from every existing version of its section in layout, composition and mechanism. Facts come
only from the page's own published data (TRADES, PHOTOS, PAIRS6, REVIEWS, the map pins, CRED_ROWS, TEXAS, TERMS);
images are ones the page already carries. Behaviour is either generic (data-nv-* hooks in home.js) or a small
V.<key><n> script. Every builder takes the home2 module as H to avoid a circular import."""
import json
import math
from parts import e

PH = 'assets/img/photos/'
TH = 'assets/img/h/'
IMG_P = (0, 3, 15, 18, 28, 37, 41)          # full-size photos already embedded
THUMBS = (0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17, 20, 23, 24, 28, 33, 34, 36)


def ph(i, alt='', cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<img{c} src="{PH}p{i}-1400.webp" width="1400" height="1050" alt="{e(alt)}" loading="lazy" decoding="async">'


def thumb(i, alt=''):
    return f'<img src="{TH}t/p{i}-320.webp" width="320" height="240" alt="{e(alt)}" loading="lazy" decoding="async">'


def pair_img(p, side, cls=''):
    c = f' class="{cls}"' if cls else ''
    alt = p['ab'] if side == 'b' else p['aa']
    return f'<img{c} src="{TH}work-{p["id"]}-{side}-1000.webp" width="1000" height="625" alt="{e(alt)}" loading="lazy" decoding="async">'


def money(n):
    return f'${n:,.2f}'


def tr(H, name):
    return next(t for t in H.TRADES if t['name'] == name)


def band(t):
    return f'${t["lo"]}k-${t["hi"]}k' if t['lo'] else f'Under ${t["hi"]}k'   # the page's own published wording


def med(t):
    return f'${t["med"][0]}k-${t["med"][1]}k'


def mon(ym):
    return f'{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][ym % 100 - 1]} 20{ym // 100}'


def trades_of(H, bits):
    return ', '.join(n for i, n in enumerate(H.MAPDATA['sv']) if bits & (1 << i))


# ======================================================================================== HERO
def hero(H):
    out = []
    # 4 the street itself is the hero: point at a house, the lead answers with that trade's published record
    T = {'Lap siding': ('Siding', '301 of 415 priced siding jobs used this lap board'), 'Windows': ('Windows', ''),
         'Shingle roofing': ('Shingle roofing', ''), 'Patio covers': ('Patio covers', ''), 'Metal roofing': ('Metal roofing', ''),
         'Board and batten': ('Siding', '27 of 415 priced siding jobs went board and batten')}
    say = {k: (f'{k}: {tr(H, v[0])["doc"] or tr(H, v[0])["n"]} documented jobs, published band {band(tr(H, v[0]))}, median {med(tr(H, v[0]))}.'
               + (f' {v[1]}.' if v[1] else '')) for k, v in T.items()}
    out.append(('Street', f'''<div class="v hero-4 nv-street" data-tone="ground2" data-say='{e(json.dumps(say))}'>
  <div class="nv-hs-top">{H.pstrip()}{H.H1}<p class="lead nv-hs-say" aria-live="polite" data-nv-say>Point at a house on the street: each one is a trade the firm installs, with its own published record.</p>{H.ctas()}</div>
  <div class="nv-hs-art">{H.art.street('hs4')}</div>
</div>'''))
    # 5 hold to see before: one true pair full-bleed, the words on a paper card
    p = H.PAIRS6[0]
    out.append(('Hold for before', f'''<div class="v hero-5 nv-hold" data-tone="ground" data-nv-scope>
  <figure class="nv-hold-fig">{pair_img(p, 'a', 'nv-ha')}{pair_img(p, 'b', 'nv-hb')}
    <figcaption><b>{e(p['place'])}, {p['when']}</b> {e(p['what'])}. {e(p['bl'])} {p['band']}.</figcaption></figure>
  <div class="nv-hold-card">{H.pstrip()}{H.H1}{H.LEAD}
    <button class="btn btn-line nv-hold-btn" type="button" data-nv-hold aria-pressed="false">Hold to see it before</button>{H.ctas()}</div>
</div>'''))
    # 6 the ledger: the headline beside the latest documented jobs, written as a ledger
    rows = ''.join(f'<tr><th scope="row">{e(q["place"])}</th><td>{e(q["what"])}</td><td>{q["when"]}</td><td class="num">{q["band"]}</td></tr>' for q in H.PAIRS6)
    out.append(('Ledger', f'''<div class="v hero-6 nv-ledger" data-tone="ground">
  <div class="nv-lg-l">{H.pstrip()}{H.H1}{H.LEAD}{H.ctas()}</div>
  <div class="nv-lg-r"><p class="nv-lg-k">From the record: six finished jobs, each with its published band</p>
    <table class="nv-lg"><thead><tr><th scope="col">Where</th><th scope="col">What went on</th><th scope="col">When</th><th scope="col">Band</th></tr></thead><tbody>{rows}</tbody></table>
    <p class="nv-lg-note">Bands are the siding or windows portion, as the firm publishes them.</p></div>
</div>'''))
    # 7 numbers first: the three facts set huge, the headline on a cobalt band beneath them
    out.append(('Numbers first', f'''<div class="v hero-7 nv-nums" data-tone="ground">
  <ul class="nv-nm">
    <li><b class="num">886</b><span>documented jobs: 312 on the map with photos + 574 more counted</span></li>
    <li><b class="num">4.9</b><span>{H.stars('nv-st')} on 474 Google reviews</span></li>
    <li><b class="num">2009</b><span>in business since, merged 2018</span></li>
  </ul>
  <div class="nv-nm-band">{H.H1}<div>{H.LEAD}{H.ctas()}</div></div>
</div>'''))
    # 8 is the office open? the phone is the hero, with live status from the published hours (Austin time)
    out.append(('Open now', f'''<div class="v hero-8 nv-open" data-tone="ground">
  <div class="nv-op-l">{H.pstrip()}{H.H1}
    <p class="nv-op-st" data-nv-open aria-live="polite">Office hours: {H.HOURS}</p>
    <a class="nv-op-tel num" href="{H.TEL}">{H.PHONE}</a>
    <p class="nv-op-h">{H.HOURS}<br>{H.ADDRESS}</p>{H.ctas()}</div>
  <figure class="nv-op-ph">{ph(37, 'Windows, siding, gutters and exterior painting at a home in East Oak Hill, Austin')}<figcaption>East Oak Hill, Austin, Sep 2026</figcaption></figure>
</div>'''))
    return out


# ======================================================================================== PROOF
def proof(H):
    out = []
    tiles = ''.join(f'''<li><button class="nv-pl" type="button" aria-pressed="false" data-nv-flip><span class="nv-pl-f"><img src="assets/img/{f}.webp" alt="" loading="lazy" decoding="async"><b>{e(n)}</b><i>{e(k)}</i></span>
      <span class="nv-pl-b"><b>{e(n)}</b>{e(t)}</span></button></li>''' for f, n, k, t in H.CRED_ROWS)
    out.append(('Plaques', f'''<div class="v proof-4 nv-plaques" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Six plaques, turned over</h2><p class="lead">Each credential, and what it takes to hold it. Turn a plaque to read the back.</p></div>
  <ul class="nv-pls">{tiles}</ul>
</div>'''))
    steps = [('2009', 'Austin Pro Siding &amp; Windows opens in Austin.'), ('2010', 'Sanders Roofing &amp; Exteriors opens.'),
             ('2015-2018', 'GuildQuality Guildmaster, Award for Service Excellence four years in a row.'), ('2018', 'The two firms merge: siding, windows and roofing under one roof.'),
             ('2025', "James Hardie President's Club, on top of Elite Preferred status."),
             ('2026', '886 documented jobs (312 on the map with photos + 574 more counted), 4.9 on 474 Google reviews.')]
    out.append(('Timeline', f'''<div class="v proof-5 nv-time" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Since 2009, year by year</h2><p class="lead">Scroll along the record.</p></div>
  <ol class="nv-tl" tabindex="0" aria-label="Timeline, scrolls sideways">{''.join(f'<li><b class="num">{y}</b><p>{t}</p></li>' for y, t in steps)}</ol>
</div>'''))
    cells = ''.join(f'<rect x="{(k % 40) * 11}" y="{(k // 40) * 11}" width="9" height="9" rx="2" class="{"g-m" if k < 312 else "g-c"}"/>' for k in range(886))
    out.append(('886 squares', f'''<div class="v proof-6 nv-grid886" data-tone="ground" data-nv-scope data-show="all">
  <div class="nv-head"><h2 class="h2x" data-split>886, one square each</h2><p class="lead">312 on the map with photos + 574 more counted.</p>
    <div class="nv-seg" role="group" aria-label="Highlight"><button type="button" data-nv-set="show:all" aria-pressed="true">All 886</button><button type="button" data-nv-set="show:map" aria-pressed="false">312 on the map</button><button type="button" data-nv-set="show:counted" aria-pressed="false">574 more counted</button></div></div>
  <svg class="nv-886" viewBox="0 0 440 254" role="img" aria-label="886 squares: 312 filled for the jobs on the map with photos, 574 outlined for the jobs counted beyond it">{cells}</svg>
</div>'''))
    items = [('4.9 on 474 Google reviews', H.G_REVIEWS_URL, 'Google reviews')] + [(n, H.CHECK[f][0], H.CHECK[f][1]) for f, n, _k, _t in H.CRED_ROWS if H.CHECK.get(f)]
    lis = ''.join(f'<li data-nv-chk><b>{e(n)}</b><a href="{e(u)}" target="_blank" rel="noopener" data-nv-chk-a>Check it on {e(w)}<span class="sr-only"> (opens in a new tab)</span></a><i aria-hidden="true">checked</i></li>' for n, u, w in items)
    out.append(('Check it yourself', f'''<div class="v proof-7 nv-check" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Don't take our word for it</h2><p class="lead">Every claim here has somewhere outside this site to check it. <span data-nv-chk-n>0</span> of {len(items)} checked.</p></div>
  <ul class="nv-ck">{lis}</ul>
</div>'''))
    tick = ' · '.join(['4.9 on 474 Google reviews', 'GAF Master Elite', 'James Hardie Elite Preferred', "James Hardie President's Club 2025", 'Andersen Certified Premier', 'GuildQuality Guildmaster', 'BBB A+', 'Since 2009'])
    out.append(('Ticker', f'''<div class="v proof-8 nv-tick" data-tone="ground" data-nv-scope>
  <div class="nv-head"><h2 class="h2x" data-split>The short version</h2><button class="tlink" type="button" data-nv-toggle="is-paused" aria-pressed="false">Pause the band</button></div>
  <div class="nv-tk" aria-label="{e(tick)}"><div class="nv-tk-in" aria-hidden="true"><span>{e(tick)} ·&nbsp;</span><span>{e(tick)} ·&nbsp;</span></div></div>
  <dl class="nv-tk-dl">{''.join(f'<div><dt>{e(n)}</dt><dd>{e(t)}</dd></div>' for _f, n, _k, t in H.CRED_ROWS)}</dl>
</div>'''))
    return out


# ======================================================================================== SERVICES
def services(H):
    out = []
    TP = {'Siding': 'siding', 'Windows': 'windows', 'Shingle roofing': 'shingle-roofing', 'Exterior painting': 'exterior-painting', 'Gutters': 'gutters',
          'Exterior doors': 'doors', 'Garage doors': 'garage-doors', 'Patio covers': 'patio-covers', 'Metal roofing': 'metal-roofing'}
    cards = ''.join(f'''<li class="nv-tc"><img src="{TH}trade-{TP[t['name']]}-800.webp" alt="" loading="lazy" decoding="async"><h3>{e(t['name'])}</h3>
      <p class="num"><b>{t['doc'] or t['n']}</b> documented</p><p>Band {band(t)}, median {med(t)}</p>{f'<p class="nv-tc-n">{e(t["note"])}</p>' if t.get('note') else ''}
      <a class="tlink" href="#book" data-book data-trade="{e(t['name'])}">Book a {e(t['name'].lower())} inspection</a></li>''' for t in H.TRADES if t['name'] in TP)
    out.append(('Rail', f'''<div class="v services-4 nv-rail" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Nine trades, one rail</h2><p class="lead">Swipe or scroll along; every card is the firm's own count and published band.</p></div>
  <ul class="nv-rl" tabindex="0" aria-label="Trades, scrolls sideways">{cards}</ul>
</div>'''))
    ts = [t for t in H.TRADES if t['doc']]
    mx = max(t['doc'] for t in ts)
    bars = ''.join(f'''<button class="nv-bar" type="button" role="radio" aria-checked="{'true' if i == 0 else 'false'}" tabindex="{0 if i == 0 else -1}" style="--w:{t['doc'] / mx:.3f}"
      data-o-name="{e(t['name'])}" data-o-doc="{t['doc']} documented, {t['n']} priced" data-o-band="Band {band(t)}, median {med(t)}" data-o-note="{e(t.get('note') or 'Installed by the firm')}"><span>{e(t['name'])}</span><b class="num">{t['doc']}</b></button>''' for i, t in enumerate(ts))
    t0 = ts[0]
    out.append(('Chart', f'''<div class="v services-5 nv-chart" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>What gets done most</h2><p class="lead">Documented jobs per trade. Pick a bar.</p></div>
  <div class="nv-ch"><div class="nv-bars" role="radiogroup" aria-label="Trades by documented jobs" data-nv-pick>{bars}</div>
    <div class="nv-ch-out" aria-live="polite"><h3 data-o="name">{e(t0['name'])}</h3><p data-o="doc">{t0['doc']} documented, {t0['n']} priced</p><p data-o="band">Band {band(t0)}, median {med(t0)}</p><p data-o="note">{e(t0['note'])}</p></div></div>
</div>'''))
    brands = {}
    for t in H.TRADES:
        for b in (t.get('note') or '').split(', '):
            if b:
                brands.setdefault(b, []).append(t['name'])
    out.append(('Brands', f'''<div class="v services-6 nv-brands" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Who makes what goes on</h2><p class="lead">The makers and credentials behind each trade, as the firm names them.</p></div>
  <ul class="nv-br">{''.join(f'<li><b>{e(b)}</b><span>{e(", ".join(v))}</span></li>' for b, v in brands.items())}</ul>
</div>'''))
    parts = [('Roof', ['Shingle roofing', 'Metal roofing', 'Gutters']), ('Walls', ['Siding', 'Exterior painting']),
             ('Openings', ['Windows', 'Exterior doors', 'Garage doors']), ('Outside living', ['Patio covers', 'Decking'])]
    acc = ''.join(f'''<details class="nv-acc"{' open' if i == 0 else ''}><summary><span class="num">{i + 1:02d}</span>{p}<i aria-hidden="true"></i></summary><ul>{''.join(f'<li><b>{e(n)}</b><span>{(str(tr(H, n)["doc"]) + " documented, ") if tr(H, n)["doc"] else ""}band {band(tr(H, n))}, median {med(tr(H, n))}</span></li>' for n in names)}</ul></details>''' for i, (p, names) in enumerate(parts))
    out.append(('By part of the house', f'''<div class="v services-7 nv-parts" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Start from the part of the house</h2><p class="lead">Roof, walls, openings, outside: open the part that needs work.</p></div>
  <div class="nv-accs">{acc}</div>
</div>'''))
    opts = [t['name'] for t in H.TRADES if t['name'] in ('Siding', 'Windows', 'Shingle roofing', 'Metal roofing', 'Exterior painting', 'Gutters', 'Exterior doors', 'Garage doors', 'Patio covers')]
    def chips(g, sel):
        return ''.join(f'<button type="button" role="radio" aria-checked="{"true" if n == sel else "false"}" tabindex="{0 if n == sel else -1}" data-{g}="{e(n)}">{e(n)}</button>' for n in opts)
    out.append(('Pick two', f'''<div class="v services-8 nv-two" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Two trades at once</h2><p class="lead">Pick two. The firm's map answers how many of its 312 photographed jobs did both.</p></div>
  <div class="nv-two-g"><fieldset><legend>First</legend><div class="nv-chips" role="radiogroup" aria-label="First trade">{chips('a', 'Siding')}</div></fieldset>
    <fieldset><legend>Second</legend><div class="nv-chips" role="radiogroup" aria-label="Second trade">{chips('b', 'Windows')}</div></fieldset></div>
  <div class="nv-two-out" aria-live="polite"><p><b class="num" data-two-n>0</b> photographed jobs did both <span data-two-t></span>.</p><p data-two-last></p></div>
</div>'''))
    return out


# ======================================================================================== WORK
def work(H):
    out, P = [], H.PAIRS6
    chips = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" data-i="{i}">{e(q["place"].split(",")[0])}</button>' for i, q in enumerate(P))
    stage = ''.join(f'<figure class="nv-fl-f{" on" if i == 0 else ""}" data-i="{i}">{pair_img(q, "b", "nv-fb")}{pair_img(q, "a", "nv-fa")}<figcaption>{e(q["place"])}, {q["when"]}: {e(q["what"])}. {e(q["bl"])} {q["band"]}.</figcaption></figure>' for i, q in enumerate(P))
    out.append(('Flip', f'''<div class="v work-4 nv-flip" data-tone="ground" data-nv-scope data-side="b">
  <div class="nv-head"><h2 class="h2x" data-split>Before. After.</h2><p class="lead">One button, the same wall twice.</p></div>
  <div class="nv-fl">{stage}</div>
  <div class="nv-fl-bar"><button class="btn btn-red" type="button" data-nv-flipside>Show after</button><div class="nv-chips" role="radiogroup" aria-label="Job" data-nv-job>{chips}</div></div>
</div>'''))
    tiles = ''.join(f'<li><button class="nv-hg" type="button" aria-pressed="false" data-nv-flip aria-label="{e(q["place"])}: show after">{pair_img(q, "b", "nv-hg-b")}{pair_img(q, "a", "nv-hg-a")}</button><p><b>{e(q["place"])}</b> {q["when"]} · {q["band"]}</p></li>' for q in P)
    out.append(('Six walls', f'''<div class="v work-5 nv-hgrid" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Six walls, before you touch them</h2><p class="lead">Point at one, or tap it, to see it after.</p></div>
  <ul class="nv-hgs">{tiles}</ul>
</div>'''))
    ch = [(P[0], 'Before', f'The Rob Roy wall as the crew found it, {P[0]["place"]}.'), (P[0], 'The job', f'{P[0]["what"]}, {P[0]["when"]}.'), (P[0], 'After', f'{P[0]["bl"]}: {P[0]["band"]}, published with the photos.')]
    out.append(('One job, three beats', f'''<div class="v work-6 nv-story" data-tone="ground">
  <div class="nv-st-ph">{pair_img(P[0], 'b', 'nv-st-b on')}{pair_img(P[0], 'a', 'nv-st-a')}</div>
  <ol class="nv-st-tx">{''.join(f'<li data-beat="{k}"><span class="num">{k + 1:02d}</span><h3>{t}</h3><p>{e(x)}</p></li>' for k, (_q, t, x) in enumerate(ch))}</ol>
</div>'''))
    groups = {}
    for q in P:
        groups.setdefault(q['band'], []).append(q)
    def card(q):
        return f'<li>{pair_img(q, "a")}<p><b>{e(q["place"])}</b> {e(q["bl"])}, {q["when"]}</p></li>'
    cols = ''.join(f'<section class="nv-bc"><h3 class="num">{b}</h3><ul>{"".join(card(q) for q in qs)}</ul></section>' for b, qs in sorted(groups.items()))
    out.append(('By band', f'''<div class="v work-7 nv-byband" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Sorted by what it cost</h2><p class="lead">The same six jobs, filed under their published bands.</p></div>
  <div class="nv-bcs">{cols}</div>
</div>'''))
    sides = ''.join(f'<li class="nv-sb-i{" on" if i == 0 else ""}" data-i="{i}"><figure>{pair_img(q, "b")}<figcaption>Before</figcaption></figure><figure>{pair_img(q, "a")}<figcaption>After</figcaption></figure><p><b>{e(q["place"])}</b>, {q["when"]}: {e(q["what"])}. {e(q["bl"])} {q["band"]}.</p></li>' for i, q in enumerate(P))
    out.append(('Side by side', f'''<div class="v work-8 nv-side" data-tone="ground2" data-n="{len(P)}">
  <div class="nv-head"><h2 class="h2x" data-split>Side by side</h2><p class="lead"><span class="num" data-sb-n>1</span> of {len(P)}</p>
    <div class="nv-sb-nav"><button class="btn btn-line btn-sm" type="button" data-sb="-1" aria-label="Previous job">Previous</button><button class="btn btn-red btn-sm" type="button" data-sb="1" aria-label="Next job">Next</button></div></div>
  <ul class="nv-sbs" aria-live="polite">{sides}</ul>
</div>'''))
    return out


# ======================================================================================== BUILT
def built(H):
    out = []
    order = ['studs', 'sheath', 'wrap', 'siding', 'trim']
    names = dict(H.LEGEND)
    xs = [40, 110, 160, 190, 260]
    ws = [56, 36, 16, 60, 40]
    layers = ''.join(f'<g class="nv-ly" data-l="{k}"><rect x="{xs[i]}" y="20" width="{ws[i]}" height="280" class="ly-{k}"/><text x="{xs[i] + ws[i] / 2}" y="320" text-anchor="middle">{i + 1}</text></g>' for i, k in enumerate(order))
    btns = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if k == "siding" else "false"}" tabindex="{0 if k == "siding" else -1}" data-l="{k}" data-o-read="{e(H.READ[k])}"><span class="num">{i + 1}</span>{e(names[k])}</button>' for i, k in enumerate(order))
    out.append(('Wall section', f'''<div class="v built-5 nv-section" data-tone="ground2" data-l="siding">
  <div class="nv-head"><h2 class="h2x" data-split>The wall, cut through</h2><p class="lead">Five layers from the studs out. Pick one.</p></div>
  <div class="nv-sec"><svg class="nv-sec-svg" viewBox="0 0 340 330" role="img" aria-label="A section through the wall: framing, sheathing, house wrap, lap siding, corner trim">{layers}</svg>
    <div><div class="nv-chips nv-col" role="radiogroup" aria-label="Layer" data-nv-pick>{btns}</div><p class="nv-sec-read" data-o="read" aria-live="polite">{e(H.READ['siding'])}</p></div></div>
</div>'''))
    segs = ''
    n = len(H.TEXAS)
    for i, (h, k, _p) in enumerate(H.TEXAS):
        a0, a1 = -90 + i * 360 / n, -90 + (i + 1) * 360 / n
        p = lambda a, r: f'{160 + r * math.cos(math.radians(a)):.1f} {160 + r * math.sin(math.radians(a)):.1f}'
        segs += f'<path class="nv-dl-s" data-i="{i}" d="M{p(a0, 70)}L{p(a0, 140)}A140 140 0 0 1 {p(a1, 140)}L{p(a1, 70)}A70 70 0 0 0 {p(a0, 70)}Z"/><text x="{p((a0 + a1) / 2, 105).split()[0]}" y="{p((a0 + a1) / 2, 105).split()[1]}" text-anchor="middle" dominant-baseline="middle">{e(k.split()[0])}</text>'
    dbtn = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" data-i="{i}" data-o-h="{e(h)}" data-o-k="{e(k)}">{e(h)}</button>' for i, (h, k, _p) in enumerate(H.TEXAS))
    out.append(('Texas dial', f'''<div class="v built-6 nv-dial" data-tone="ground" data-i="0">
  <div class="nv-head"><h2 class="h2x" data-split>Turn the dial on Texas</h2><p class="lead">What Austin weather does to a wall, and what fiber cement does back.</p></div>
  <div class="nv-dl"><svg class="nv-dl-svg" viewBox="0 0 320 320" aria-hidden="true">{segs}<circle cx="160" cy="160" r="58" class="nv-dl-c"/><path class="nv-dl-n" d="M160 160L160 30"/></svg>
    <div><div class="nv-chips nv-col" role="radiogroup" aria-label="Texas threat" data-nv-pick data-nv-dial>{dbtn}</div><p class="nv-dl-out" aria-live="polite"><b data-o="h">{e(H.TEXAS[0][0])}</b> <span data-o="k">{e(H.TEXAS[0][1])}</span></p></div></div>
</div>'''))
    out.append(('Warranty line', f'''<div class="v built-7 nv-war" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>How long it's covered</h2><p class="lead">Two warranties on one line, measured in years.</p></div>
  <div class="nv-wl"><div class="nv-wl-axis">{''.join(f'<span style="--x:{y / 30:.3f}" class="num">{y}</span>' for y in (0, 5, 10, 15, 20, 25, 30))}</div>
    <div class="nv-wl-bar nv-wl-h" style="--to:1"><b class="num">30</b><span>year non-prorated James Hardie siding warranty, when an Elite Preferred contractor installs</span></div>
    <div class="nv-wl-bar nv-wl-l"><b>Lifetime</b><span>Austin Pro workmanship warranty on the labour</span></div></div>
</div>'''))
    steps = [('studs', 'Framing', 'What the whole wall hangs on.'), ('sheath', 'Sheathing', 'What rot reaches first under old siding.'), ('wrap', 'House wrap', 'The water line behind the boards.'),
             ('siding', 'HardiePlank lap', '8.25 in board, 7 in exposure, 1.25 in lap, 5/16 in thick.'), ('trim', 'Corner trim', 'Where the courses stop.')]
    svg = ('<svg class="nv-is-svg" viewBox="0 0 300 220" aria-hidden="true"><g class="is-studs">' + ''.join(f'<rect x="{20 + i * 52}" y="10" width="10" height="200"/>' for i in range(6))
           + '</g><rect class="is-sheath" x="16" y="10" width="272" height="200"/><rect class="is-wrap" x="16" y="10" width="272" height="200"/><g class="is-siding">'
           + ''.join(f'<rect x="16" y="{10 + k * 20}" width="272" height="21"/>' for k in range(10)) + '</g><g class="is-trim"><rect x="8" y="6" width="16" height="208"/><rect x="280" y="6" width="16" height="208"/></g></svg>')
    out.append(('Step by step', f'''<div class="v built-8 nv-steps" data-tone="ground" data-step="0" data-n="5">
  <div class="nv-head"><h2 class="h2x" data-split>Built in five steps</h2><p class="lead">Step through a wall the way the crew builds it.</p></div>
  <div class="nv-is">{svg}<div class="nv-is-tx" aria-live="polite">{''.join(f'<div class="nv-is-s" data-s="{i}"{"" if i == 0 else " hidden"}><p class="num">Step {i + 1} of 5</p><h3>{n}</h3><p>{e(t)}</p></div>' for i, (_k, n, t) in enumerate(steps))}
    <div class="nv-is-nav"><button class="btn btn-line btn-sm" type="button" data-is="-1">Back</button><button class="btn btn-red btn-sm" type="button" data-is="1">Next step</button></div></div></div>
</div>'''))
    return out


# ======================================================================================== COLOUR
def lum(h):
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (1, 3, 5))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def colour(H):
    out = []
    allc = [(n, c, h) for n, c, h in H.SW] + [(n, 'ColorPlus', h) for n, _b, h in H.COLORPLUS]
    srt = sorted(allc, key=lambda x: -lum(x[2]))
    strips = ''.join(f'<button class="nv-cs" type="button" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" style="--c:{h}" data-c="{h}" data-o-n="{e(n)}" data-o-c="{e(c)}" aria-label="{e(n)}, {e(c)}"></button>' for i, (n, c, h) in enumerate(srt))
    n0, c0, h0 = srt[0]
    out.append(('Light to dark', f'''<div class="v colour-4 nv-strips" data-tone="ground" style="--pick:{h0}">
  <div class="nv-head"><h2 class="h2x" data-split>Every colour, light to dark</h2><p class="lead">All {len(allc)} published colours in one run. Pick a strip.</p></div>
  <div class="nv-csg"><div class="nv-css" role="radiogroup" aria-label="Colour" data-nv-pick data-nv-pickc>{strips}</div>
    <div class="nv-cs-out"><div class="nv-cs-sw"></div><p aria-live="polite"><b data-o="n">{e(n0)}</b> <span data-o="c">{e(c0)}</span></p></div></div>
</div>'''))
    body = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" style="--c:{h}" data-body="{h}" aria-label="{e(n)}, ColorPlus" class="nv-dot"></button>' for i, (n, _b, h) in enumerate(H.COLORPLUS))
    whites = [x for x in H.SW if lum(x[2]) > 0.75] + [x for x in H.SW if lum(x[2]) < 0.15]
    trim = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" style="--c:{h}" data-trim="{h}" aria-label="{e(n)}, {e(c)}" class="nv-dot"></button>' for i, (n, c, h) in enumerate(whites))
    house = ('<svg class="nv-bt-svg" viewBox="0 0 320 240" aria-hidden="true"><path class="bt-roof" d="M20 100L160 20L300 100Z"/><rect class="bt-body" x="40" y="96" width="240" height="134"/>'
             + ''.join(f'<path class="bt-c" d="M40 {104 + k * 12}H280"/>' for k in range(10)) + '<rect class="bt-trim" x="34" y="94" width="10" height="138"/><rect class="bt-trim" x="276" y="94" width="10" height="138"/>'
             '<rect class="bt-trimw" x="80" y="130" width="50" height="60"/><rect class="bt-trimw" x="190" y="130" width="50" height="60"/><rect class="bt-door" x="140" y="160" width="40" height="70"/></svg>')
    out.append(('Body and trim', f'''<div class="v colour-5 nv-bodytrim" data-tone="ground2" style="--body:{H.COLORPLUS[0][2]};--trim:{whites[0][2]}">
  <div class="nv-head"><h2 class="h2x" data-split>A body and a trim</h2><p class="lead">Pick the wall from ColorPlus and the trim from Sherwin-Williams.</p></div>
  <div class="nv-bt">{house}<div><fieldset><legend>Body, ColorPlus</legend><div class="nv-dots" role="radiogroup" aria-label="Body colour">{body}</div></fieldset>
    <fieldset><legend>Trim, Sherwin-Williams</legend><div class="nv-dots" role="radiogroup" aria-label="Trim colour">{trim}</div></fieldset></div></div>
</div>'''))
    out.append(('Shade slider', f'''<div class="v colour-6 nv-shade" data-tone="ground" data-cols='{e(json.dumps([[n, c, h] for n, c, h in srt]))}' style="--pick:{h0}">
  <div class="nv-head"><h2 class="h2x" data-split>Slide from white to black</h2><p class="lead">One slider across all {len(srt)} published colours.</p></div>
  <div class="nv-sh-sw"><p aria-live="polite"><b data-sh-n>{e(n0)}</b> <span data-sh-c>{e(c0)}</span></p></div>
  <label class="nv-sh-l"><span class="sr-only">Colour, light to dark</span><input type="range" min="0" max="{len(srt) - 1}" value="0" step="1" data-sh></label>
  <div class="nv-sh-ramp" aria-hidden="true">{''.join(f'<i style="--c:{h}"></i>' for _n, _c, h in srt)}</div>
</div>'''))
    pal = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" style="--c:{h}" data-paint="{h}" aria-label="{e(n)}, ColorPlus" class="nv-dot"></button>' for i, (n, _b, h) in enumerate(H.COLORPLUS))
    out.append(('Paint the street', f'''<div class="v colour-7 nv-paint" data-tone="ground2" style="--paint:{H.COLORPLUS[0][2]}">
  <div class="nv-head"><h2 class="h2x" data-split>Paint the street</h2><p class="lead">Pick a ColorPlus colour, then click a house to clad it. <span data-paint-n>0</span> of 6 painted.</p></div>
  <div class="nv-dots" role="radiogroup" aria-label="Paint colour">{pal}</div>
  <div class="nv-paint-art">{H.art.street('ps7')}</div>
</div>'''))
    out.append(('Shuffle', f'''<div class="v colour-8 nv-shuffle" data-tone="ground" data-cp='{e(json.dumps([[n, h] for n, _b, h in H.COLORPLUS]))}' data-sw='{e(json.dumps([[n, c, h] for n, c, h in whites]))}'>
  <div class="nv-head"><h2 class="h2x" data-split>Can't choose? Shuffle</h2><p class="lead">A body from ColorPlus and a trim from Sherwin-Williams, drawn at random from the published lists.</p></div>
  <div class="nv-sf"><div class="nv-sf-b" style="--c:{H.COLORPLUS[0][2]}"><p><b data-sf-bn>{e(H.COLORPLUS[0][0])}</b> ColorPlus, the wall</p></div><div class="nv-sf-t" style="--c:{whites[0][2]}"><p><b data-sf-tn>{e(whites[0][0])}</b> <span data-sf-tc>{e(whites[0][1])}</span>, the trim</p></div></div>
  <button class="btn btn-red" type="button" data-sf>Shuffle a pairing</button>
</div>'''))
    return out


# ======================================================================================== NEAR
def near(H):
    out = []
    towns = sorted(H.TOWNS, key=lambda t: -t[3])[:10]
    mx = towns[0][3]
    out.append(('Ranking', f'''<div class="v near-4 nv-rank" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Where the work is</h2><p class="lead">Documented jobs by town, from the firm's own project file.</p></div>
  <ol class="nv-rk">{''.join(f'<li style="--w:{t[3] / mx:.3f}"><span class="num">{i + 1:02d}</span><b>{e(t[0])}</b><i></i><span class="num">{t[3]}</span></li>' for i, t in enumerate(towns))}</ol>
</div>'''))
    months = {}
    for p in H.PINS:
        months[p[2]] = months.get(p[2], 0) + 1
    ys = sorted({ym // 100 for ym in months})
    mxm = max(months.values())
    cells = ''
    for r, y in enumerate(ys):
        cells += f'<text x="0" y="{r * 30 + 22}" class="hm-y">20{y}</text>'
        for m in range(1, 13):
            n = months.get(y * 100 + m, 0)
            cells += f'<rect x="{50 + (m - 1) * 34}" y="{r * 30 + 6}" width="30" height="24" rx="4" style="--a:{n / mxm:.2f}" class="hm-c{" hm-0" if not n else ""}"><title>{mon(y * 100 + m)}: {n} photographed jobs</title></rect>'
    cells += ''.join(f'<text x="{65 + k * 34}" y="{len(ys) * 30 + 22}" text-anchor="middle" class="hm-m">{m}</text>' for k, m in enumerate('JFMAMJJASOND'))
    out.append(('Month by month', f'''<div class="v near-5 nv-heat" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Month by month</h2><p class="lead">The 312 photographed jobs on the map, by the month they were photographed. Darker is busier; the busiest month had {mxm}.</p></div>
  <svg class="nv-hm" viewBox="0 0 460 {len(ys) * 30 + 32}" role="img" aria-label="Photographed jobs per month, {mon(min(months))} to {mon(max(months))}">{cells}</svg>
</div>'''))
    hx, hy = H.MAPDATA['hq']
    ppm = H.MAPDATA['ppm']
    rings = (5, 10, 20, 40)
    dist = [math.hypot(p[0] - hx, p[1] - hy) / ppm for p in H.PINS]
    within = [sum(1 for d in dist if d <= r) for r in rings]
    sc = 150 / 40
    dots = ''.join(f'<circle cx="{160 + (p[0] - hx) / ppm * sc:.1f}" cy="{160 + (p[1] - hy) / ppm * sc:.1f}" r="2.2"/>' for p, d in zip(H.PINS, dist) if d <= 42)
    out.append(('Rings from the office', f'''<div class="v near-6 nv-rings" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>How far from the office</h2><p class="lead">Rings at 5, 10, 20 and 40 miles from 7801 N Lamar Blvd, measured on the firm's own map.</p></div>
  <div class="nv-rg"><svg class="nv-rg-svg" viewBox="0 0 320 320" role="img" aria-label="Photographed jobs plotted around the office with distance rings">{''.join(f'<circle class="rg-r" cx="160" cy="160" r="{r * sc:.1f}"/>' for r in rings)}<g class="rg-d">{dots}</g><circle class="rg-hq" cx="160" cy="160" r="6"/></svg>
    <ul class="nv-rg-l">{''.join(f'<li><b class="num">{w}</b><span>within {r} miles</span></li>' for r, w in zip(rings, within))}<li><b class="num">312</b><span>photographed jobs on the map</span></li></ul></div>
</div>'''))
    names = H.MAPDATA['names']
    cards = ''
    for t in towns[:8]:
        ci = H.CITIES.index(t[0]) if t[0] in H.CITIES else -1
        ps = [p for p in H.PINS if p[5] == ci]
        last = ps[-1] if ps else None
        cards += f'<li class="nv-tcd"><h3>{e(t[0])}</h3><p><b class="num">{t[3]}</b> documented jobs</p>' + (f'<p class="nv-tcd-l">Latest photographed: {e(names[last[4]])}, {mon(last[2])}</p>' if last else '') + '</li>'
    out.append(('Town cards', f'''<div class="v near-7 nv-towns" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Town by town, card by card</h2><p class="lead">The eight busiest towns, each with its latest photographed job.</p></div>
  <ul class="nv-tcs" tabindex="0" aria-label="Towns, scrolls sideways">{cards}</ul>
</div>'''))
    last12 = list(reversed(H.PINS[-12:]))
    out.append(('Latest twelve', f'''<div class="v near-8 nv-feed" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>The latest twelve</h2><p class="lead">The most recent photographed jobs on the firm's map, newest first.</p></div>
  <ol class="nv-fd">{''.join(f'<li><span class="num">{mon(p[2])}</span><b>{e(names[p[4]])}</b><i>{e(trades_of(H, p[3]))}</i></li>' for p in last12)}</ol>
</div>'''))
    return out


# ======================================================================================== REVIEWS
def reviews(H):
    out, R = [], H.REVIEWS
    def cut(t, n=150):
        return t if len(t) <= n else t[:t.rfind(' ', 0, n)] + '...'
    out.append(('Aggregate', f'''<div class="v reviews-4 nv-agg" data-tone="ground2">
  <div class="nv-agg-n"><b class="num">4.9</b>{H.stars('nv-st nv-st-xl')}<p>on <b>474</b> Google reviews</p><a class="btn btn-red" href="{H.G_REVIEWS_URL}" target="_blank" rel="noopener">Read all 474 on Google<span class="sr-only"> (opens in a new tab)</span></a></div>
  <div class="nv-agg-q"><h2 class="h2x" data-split>The number first</h2><ul>{''.join(f'<li><p>"{e(cut(r["text"], 120))}"</p><span>{e(r["name"])}, {e(r["source"])}</span></li>' for r in R[:3])}</ul></div>
</div>'''))
    words = ['professional', 'quality', 'recommend', 'windows', 'siding', 'roof', 'team', 'clean', 'communication', 'price']
    chips, first = '', None
    for w in words:
        hits = [r for r in R if w in r['text'].lower()]
        if not hits:
            continue
        r = hits[0]
        i = r['text'].lower().find(w)
        a = max(0, r['text'].rfind(' ', 0, max(0, i - 60)))
        snip = ('...' if a else '') + r['text'][a:i + len(w) + 80].strip() + '...'
        first = first or (w, snip, r)
        chips += f'<button type="button" role="radio" aria-checked="{"true" if first[0] == w else "false"}" tabindex="{0 if first[0] == w else -1}" data-o-q="{e(snip)}" data-o-by="{e(r["name"])}, {e(r["source"])}">{w} <span class="num">{len(hits)}</span></button>'
    out.append(('Words that recur', f'''<div class="v reviews-5 nv-words" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>The words that come back</h2><p class="lead">How many of the {len(R)} reviews quoted on this page use each word. Pick one to read it in place.</p></div>
  <div class="nv-chips nv-wd" role="radiogroup" aria-label="Word" data-nv-pick>{chips}</div>
  <blockquote class="nv-wd-q" aria-live="polite"><p data-o="q">{e(first[1])}</p><footer data-o="by">{e(first[2]["name"])}, {e(first[2]["source"])}</footer></blockquote>
</div>'''))
    groups = [('Siding', 'siding'), ('Windows', 'window'), ('Roofing', 'roof')]
    tabs = ''.join(f'<button type="button" role="tab" id="rv6-t{i}" aria-controls="rv6-p{i}" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}">{n}</button>' for i, (n, _w) in enumerate(groups))
    panels = ''
    for i, (n, w) in enumerate(groups):
        rs = [r for r in R if w in r['text'].lower()][:3]
        n_all = len([r for r in R if w in r['text'].lower()])
        items = ''.join(f'<li><p>&ldquo;{e(cut(r["text"], 200))}&rdquo;</p><span>{e(r["name"])}</span></li>' for r in rs)
        panels += f'<div role="tabpanel" id="rv6-p{i}" aria-labelledby="rv6-t{i}"{"" if i == 0 else " hidden"}><p class="nv-rt-n">{n_all} of the {len(R)} quoted reviews mention {w}.</p><ul>{items}</ul></div>'
    out.append(('By trade', f'''<div class="v reviews-6 nv-rtab" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Reviews by trade</h2><p class="lead">4.9 on 474 Google reviews. Here, the ones that name the work.</p></div>
  <div class="nv-tabs" role="tablist" aria-label="Trade" data-nv-tabs>{tabs}</div>{panels}
</div>'''))
    out.append(('Wall of words', f'''<div class="v reviews-7 nv-wall" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>A wall of them</h2><p class="lead">Nine of the 474, in full, as written on Google.</p></div>
  <ul class="nv-wl-c">{''.join(f'<li><p>&ldquo;{e(r["text"])}&rdquo;</p><span>{e(r["name"])}, {e(r["source"])}</span></li>' for r in R[:9])}</ul>
</div>'''))
    stars = ''
    for k in range(474):
        a = k * 2.39996
        rad = 14 * math.sqrt(k + 6)
        stars += f'<circle cx="{220 + rad * math.cos(a):.1f}" cy="{220 + rad * math.sin(a):.1f}" r="3.2" data-k="{k}"/>'
    out.append(('474 stars', f'''<div class="v reviews-8 nv-field" data-tone="ground2" data-rv='{e(json.dumps([[r["text"], r["name"], r["source"]] for r in R]))}'>
  <div class="nv-head"><h2 class="h2x" data-split>474 reviews, one dot each</h2><p class="lead">Click any dot. {len(R)} of the 474 are quoted on this page, so a dot opens one of those.</p></div>
  <div class="nv-fl-g"><svg class="nv-fl-svg" viewBox="0 0 440 440" role="img" aria-label="474 dots, one for each Google review"><g class="fl-d">{stars}</g><text x="220" y="232" text-anchor="middle" class="fl-n">4.9</text></svg>
    <blockquote class="nv-fl-q" aria-live="polite"><p data-fl-q>Pick a dot.</p><footer data-fl-by></footer></blockquote></div>
</div>'''))
    return out


# ======================================================================================== MONEY
def money_v(H):
    out = []
    amts = (10000, 15000, 20000, 30000)
    def rows(P):
        return ''.join(f'<tr><th scope="row">{lab} for {mo}</th><td class="num">{money(H.pmt(P, apr, n) if apr else P / n)}</td><td class="num">{money((H.pmt(P, apr, n) if apr else P / n) * n)}</td></tr>' for apr, n, lab, mo in H.TERMS)
    sel = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if a == 15000 else "false"}" tabindex="{0 if a == 15000 else -1}" data-amt="{a}" data-o-rows="{e(rows(a))}">${a:,}</button>' for a in amts)
    out.append(('Side by side plans', f'''<div class="v money-4 nv-plans" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Three plans, one table</h2><p class="lead">Pick an amount; the three published plans line up.</p></div>
  <div class="nv-chips" role="radiogroup" aria-label="Amount" data-nv-pick data-nv-html>{sel}</div>
  <table class="nv-pt"><thead><tr><th scope="col">Plan</th><th scope="col">Monthly</th><th scope="col">Total paid</th></tr></thead><tbody data-o="rows" aria-live="polite">{rows(15000)}</tbody></table>
  <p class="nv-fine">{e(H.FINE)}</p>
</div>'''))
    ts = [t for t in H.TRADES if t['name'] in ('Siding', 'Windows', 'Shingle roofing', 'Metal roofing', 'Patio covers')]
    def lines(t):
        lo, hi = t['med'][0] * 1000, t['med'][1] * 1000
        return ''.join(f'<li><b>{lab}, {mo}</b><span class="num">{money(H.pmt(lo, apr, n) if apr else lo / n)} to {money(H.pmt(hi, apr, n) if apr else hi / n)} a month</span></li>' for apr, n, lab, mo in H.TERMS)
    tb = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" data-o-t="{e(t["name"])}: median band {med(t)}" data-o-l="{e(lines(t))}">{e(t["name"])}</button>' for i, t in enumerate(ts))
    out.append(('By trade, monthly', f'''<div class="v money-5 nv-bytrade" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>The median job, by the month</h2><p class="lead">Each trade's published median band, run through the three published plans.</p></div>
  <div class="nv-chips" role="radiogroup" aria-label="Trade" data-nv-pick data-nv-html>{tb}</div>
  <div class="nv-bt-o" aria-live="polite"><h3 data-o="t">{e(ts[0]["name"])}: median band {med(ts[0])}</h3><ul data-o="l">{lines(ts[0])}</ul></div>
  <p class="nv-fine">{e(H.FINE)}</p>
</div>'''))
    def cash(P):
        f0 = P
        return (f'<div><h3>Finance at 0% for 24 months</h3><p class="num">{money(f0 / 24)} a month</p><p class="num">Total paid {money(f0)}</p></div>'
                f'<div><h3>Pay in full by cash, check or ACH</h3><p class="num">-10%</p><p class="num">Total paid {money(P * 0.9)}</p></div>')
    cs = ''.join(f'<button type="button" role="radio" aria-checked="{"true" if a == 15000 else "false"}" tabindex="{0 if a == 15000 else -1}" data-o-cmp="{e(cash(a))}">${a:,}</button>' for a in amts)
    out.append(('Cash or finance', f'''<div class="v money-6 nv-cash" data-tone="ground">
  <div class="nv-head"><h2 class="h2x" data-split>Cash or finance?</h2><p class="lead">The pay-in-full discount against the 0% plan, for the same job. The discount is not available with financing.</p></div>
  <div class="nv-chips" role="radiogroup" aria-label="Amount" data-nv-pick data-nv-html>{cs}</div>
  <div class="nv-cmp" data-o="cmp" aria-live="polite">{cash(15000)}</div>
</div>'''))
    qa = [('Who provides the financing?', 'GreenSky, on approved credit; not everyone qualifies.'),
          ('What are the published plans?', '0% APR for 24 months, 4.99% APR for 60 months and 7.99% APR for 120 months.'),
          ("What is the firm's own worked example?", '$15,000 at 7.99% APR for 120 months is 120 payments of $181.91.'),
          ('Can discounts stack?', "Holiday Savings (on contracts signed through November 30, 2026), Hometown Heroes and pay in full: the firm's own example takes $30,000 with all three to $22,500. Pay in full is not available with financing."),
          ('What does a job cost?', 'Every trade has a published band from its priced jobs; the price for your house comes in writing after the free inspection.')]
    out.append(('Questions', f'''<div class="v money-7 nv-faq" data-tone="ground2">
  <div class="nv-head"><h2 class="h2x" data-split>Financing, asked and answered</h2><p class="lead">The questions the office hears most, answered from what the firm publishes.</p></div>
  <div class="nv-accs">{''.join(f'<details class="nv-acc"{" open" if i == 0 else ""}><summary>{e(q)}<i aria-hidden="true"></i></summary><p>{e(a)}</p></details>' for i, (q, a) in enumerate(qa))}</div>
</div>'''))
    out.append(('Holiday clock', f'''<div class="v money-8 nv-clock" data-tone="ground">
  <div class="nv-ck-n"><b class="num" data-nv-until="2026-11-30">0</b><span data-nv-until-l>days left</span></div>
  <div><h2 class="h2x" data-split>Holiday Savings, on the clock</h2><p class="lead">10% off on contracts signed through November 30, 2026. It stacks with Hometown Heroes (5%) and pay in full (10%).</p>
    <a class="btn btn-red" href="#book" data-book>Book the free inspection</a><p class="nv-fine">{e(H.FINE)}</p></div>
</div>'''))
    return out


# ======================================================================================== BOOK
def book(H):
    out = []
    days = [('Mon', 8, 20), ('Tue', 8, 20), ('Wed', 8, 20), ('Thu', 8, 20), ('Fri', 8, 20), ('Sat', 8, 18), ('Sun', 12, 17)]
    bars = ''.join(f'<li data-d="{i}"><b>{d}</b><span class="nv-wk-t"><i style="--a:{(a - 6) / 16:.3f};--b:{(b - 6) / 16:.3f}"></i></span><span class="num">{a if a <= 12 else a - 12}{"am" if a < 12 else "pm"}-{b - 12}pm</span></li>' for i, (d, a, b) in enumerate(days))
    out.append(('The week', f'''<div class="v book-4 nv-week" data-tone="red">
  <div class="nv-head"><h2 class="h2x" data-split>When to call</h2><p class="nv-op-st" data-nv-open aria-live="polite">Office hours: {H.HOURS}</p></div>
  <ol class="nv-wk">{bars}</ol>
  <a class="nv-op-tel num" href="{H.TEL}">{H.PHONE}</a><p>{H.HOURS}</p>
</div>'''))
    steps = [('You call or book', 'The office picks a time with you.'), ('The inspection', 'Free, 30 to 60 minutes, no obligation.'),
             ('In writing', 'You get the scope, materials and price in writing.'), ('Your call', 'No obligation: the decision is yours.')]
    out.append(('What happens', f'''<div class="v book-5 nv-what" data-tone="red">
  <div class="nv-head"><h2 class="h2x" data-split>What happens after you call</h2></div>
  <ol class="nv-wh">{''.join(f'<li><span class="num">{i + 1}</span><h3>{e(t)}</h3><p>{e(x)}</p></li>' for i, (t, x) in enumerate(steps))}</ol>
  <div class="nv-wh-cta"><a class="btn btn-ink" href="{H.TEL}">Call {H.PHONE}</a><p>{H.HOURS}</p></div>
</div>'''))
    q = '7801+N+Lamar+Blvd+Suite+C70+Austin+TX+78752'
    grid = ''.join(f'<path d="M{x} 0V240"/>' for x in range(20, 400, 40)) + ''.join(f'<path d="M0 {y}H400"/>' for y in range(20, 240, 40))
    out.append(('Visit', f'''<div class="v book-6 nv-visit" data-tone="red">
  <div><h2 class="h2x" data-split>Come by the office</h2><p class="nv-vs-a">{H.ADDRESS}</p><p>{H.HOURS}</p>
    <div class="nv-vs-b"><a class="btn btn-ink" href="https://www.google.com/maps/search/?api=1&amp;query={q}" target="_blank" rel="noopener">Directions<span class="sr-only"> (opens Google Maps in a new tab)</span></a><a class="btn btn-line" href="{H.TEL}">Call {H.PHONE}</a></div></div>
  <svg class="nv-vs-map" viewBox="0 0 400 240" aria-hidden="true"><g class="vm-g">{grid}</g><path class="vm-lamar" d="M90 240L250 0"/><text x="214" y="70" class="vm-t">N Lamar Blvd</text><circle class="vm-pin" cx="170" cy="120" r="12"/><circle cx="170" cy="120" r="4" class="vm-dot"/></svg>
</div>'''))
    out.append(('Two doors', f'''<div class="v book-7 nv-doors" data-tone="red">
  <h2 class="h2x" data-split>Two ways in</h2>
  <div class="nv-dr"><a class="nv-dr-a" href="{H.TEL}"><span>Call</span><b class="num">{H.PHONE}</b><i>{H.HOURS}</i></a>
    <button class="nv-dr-a" type="button" data-nv-go="2"><span>Book online</span><b>Open the form</b><i>Two minutes; the office calls back with times.</i></button></div>
</div>'''))
    out.append(('Chat', f'''<div class="v book-8 nv-chat" data-tone="red">
  <div class="nv-head"><h2 class="h2x" data-split>Ask for a call back</h2><p class="nv-proto">{e(H.PROTO) if isinstance(H.PROTO, str) else 'Concept site: this form is a working prototype and sends nothing. To book for real, call (512) 550-0000.'}</p></div>
  <div class="nv-ct" aria-live="polite" data-nv-chat><p class="nv-ct-b nv-ct-them">Hi. What's your name?</p></div>
  <form class="nv-ct-f" data-nv-chatf novalidate><label class="sr-only" for="nv-ct-in">Your answer</label><input id="nv-ct-in" type="text" autocomplete="given-name" required><button class="btn btn-ink" type="submit">Send</button></form>
  <p class="nv-ct-c">Rather talk? <a class="tlink" href="{H.TEL}">{H.PHONE}</a></p>
</div>'''))
    return out


BUILDERS = {'hero': hero, 'proof': proof, 'services': services, 'work': work, 'built': built, 'colour': colour, 'near': near,
            'reviews': reviews, 'money': money_v, 'book': book}
