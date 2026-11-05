"""Assemble the ONE-file site: out/site.html. Everything embedded (fonts, photos, film, field, sections).
Each section slot holds its live winner; the other versions sit beside it as hidden in-file backups (<template>),
never deleted. For audit only, ?hero=2..5, ?services=a|b, ?vis=a|b swap a backup into its slot (no switcher chrome).
Section markup is pre-rendered at build time by running the section modules in node, so the page reads without JS."""
import html, json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from build import (fonts, jpeg, src, b64, I, BOOK, HEADER, MBAR, HEAD_JS, LEAD, SUB, CTAS, PP)

# the live winner of every slot; the rest become backups
LIVE = {'hero': '1', 'services': 'a', 'vis': 'b', 'windows': 'a', 'reviews': 'b', 'process': 'a', 'try': 'a', 'area': 'a', 'book': 'a'}
SEC = lambda f: open(os.path.join(HERE, 'src', 'sec', f)).read()
MODS = ['scenes', 'services', 'svc2', 'svc3', 'svc4', 'svc5', 'svc6', 'svc7', 'vis', 'vis2', 'vis3', 'vis4', 'vis5', 'vis6', 'vis7', 'vis8', 'windows', 'win2', 'win3', 'win4', 'win5', 'win6', 'win7', 'win8', 'reviews', 'rev2', 'rev3', 'rev4', 'rev5', 'rev6', 'rev7', 'rev8', 'process', 'proc2', 'proc3', 'proc4', 'proc5', 'proc6', 'proc7', 'proc8', 'seq', 'seq2', 'seq3', 'seq4', 'seq5', 'seq6', 'seq7', 'area', 'area2', 'area3', 'area4', 'area5', 'area6', 'area7', 'cta', 'cta2', 'cta3', 'cta4', 'cta5', 'cta6', 'cta7', 'p_base', 'nav']
REV = json.load(open(os.path.join(HERE, '..', '..', 'work', 'data', 'reviews.json')))
WORK = os.path.join(HERE, '..', '..', 'work')
# subpages: page views inside the same file (pages.json: page list + each section's module, object and versions)
PG = json.load(open(os.path.join(HERE, 'pages.json')))
PSECS = [(p, x) for p, _ in PG['pages'] for x in PG['sections'][p]]
PMODS = [x['mod'] for _, x in PSECS]


def area():
    # the firm's own published project photos with their recorded place/date/trades; city tallies from the finder dataset
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); N = json.load(open(os.path.join(WORK, 'data', 'near.json')))
    import base64 as _b
    cards = [{'src': 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(WORK, 'dl', f'photo{i}-640.webp'), 'rb').read()).decode(),
              'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro", 'place': P[i]['place'], 'when': P[i]['when'], 'trades': P[i]['trades'], 'href': 'https://www.austinprosiding.com' + P[i]['href']}
             for i in (0, 10, 2, 7, 28, 33, 36, 42)]
    want = ['Austin', 'Round Rock', 'Cedar Park', 'Leander', 'Pflugerville', 'Georgetown', 'Buda']
    tally = {g[0]: g[6] for g in N['g'] if g[1] == 'c'}
    places = sorted({p.strip() for p in N['pl'] if p.strip()} | {g[0] for g in N['g'] if g[1] == 'c'}, key=str.lower)
    return {'cards': cards, 'cities': [[c, tally[c]] for c in want], 'places': places}


AREA = area()


def svcp():
    # the firm's own published job photos for Services D, with their recorded place, date and trades
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json')))
    import base64 as _b
    pick = {'siding': 0, 'windows': 42, 'roofing': 10}
    return {k: {'src': 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(WORK, 'dl', f'photo{i}-1400.webp'), 'rb').read()).decode(),
                'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro", 'place': P[i]['place'], 'when': P[i]['when'],
                'trades': P[i]['trades'], 'href': 'https://www.austinprosiding.com' + P[i]['href']} for k, i in pick.items()}


SVCP = svcp()


def svcp640():
    # Services J: the same three firm jobs as Services D, at 640 px for the pointer preview
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); import base64 as _b
    return {k: {'src': 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(WORK, 'dl', f'photo{i}-640.webp'), 'rb').read()).decode(), 'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro", 'place': P[i]['place'], 'when': P[i]['when']} for k, i in {'siding': 0, 'windows': 42, 'roofing': 10}.items()}


SVCP640 = svcp640()


def winp():
    # Windows D: the firm's own published window projects whose photographs show windows (checked one by one), newest first
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json')))
    from PIL import Image as _I
    import io as _io, base64 as _b
    def pic(i):
        im = _I.open(os.path.join(WORK, 'dl', f'photo{i}-1400.webp')).convert('RGB'); im.thumbnail((960, 960)); buf = _io.BytesIO(); im.save(buf, 'WEBP', quality=68)
        return {'src': 'data:image/webp;base64,' + _b.b64encode(buf.getvalue()).decode(), 'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro"}
    jobs = []
    for grp in [[4], [5, 38], [6], [7], [40], [42], [29], [11], [41]]:
        p = P[grp[0]]; jobs.append({'place': p['place'], 'when': p['when'], 'trades': p['trades'], 'href': 'https://www.austinprosiding.com' + p['href'], 'photos': [pic(i) for i in grp]})
    return jobs


WINP = winp()


def near():
    # On your street C/D: the firm's documented-project records (the site's own project finder), compacted
    N = json.load(open(os.path.join(WORK, 'data', 'near.json'))); import collections as _c
    pts = [q[:7] for q in N['p']]
    pos = {g[0]: (g[2], g[3]) for g in N['g'] if g[1] == 'c'}
    canon = {k.lower(): k for k in pos}
    ct = [canon.get(c.strip().lower(), c.strip()) for c in N['ct']]   # the records spell a few towns loosely ("ROUND ROCK", "san Marcos")
    tally = {g[0]: g[6] for g in N['g'] if g[1] == 'c'}                # the finder's own per-town tallies, as shown in versions A and B
    towns = []
    for t, k in sorted(tally.items(), key=lambda x: -x[1]):
        hoods = _c.Counter(N['pl'][q[5]].split(',')[0].strip() for q in pts if ct[q[4]] == t and q[5] >= 0).most_common(12)
        work = _c.Counter(sv for q in pts if ct[q[4]] == t for i, sv in enumerate(N['sv']) if q[3] & (1 << i)).most_common(4)
        x, y = pos.get(t, (0, 0)); towns.append([t, k, x, y, [list(h) for h in hoods], [list(w) for w in work]])
    return {'W': N['W'], 'H': N['H'], 'hq': N['hq'], 'ppm': N['ppm'], 'sv': N['sv'], 'ct': ct, 'pl': N['pl'], 'p': pts, 'towns': [t for t in towns if t[1] > 0]}


NEAR = near()

WCOL = json.load(open(os.path.join(WORK, 'data', 'window_colours.json')))


def prerender():
    js = '\n'.join(SEC(m + '.js') for m in MODS + PMODS)
    pgk = 'PG_:{' + ','.join(f'"{x["slot"]}{v[0]}":{x["obj"]}.{v[0].upper()}()' for _, x in PSECS for v in x['v']) + '},'
    prog = ('const window=globalThis;globalThis.matchMedia=()=>({matches:false});globalThis.__REV=' + json.dumps(REV) + ';globalThis.__AREA=' + json.dumps(AREA) + ';globalThis.__SVCP=' + json.dumps(SVCP) + ';globalThis.__SVCP640=' + json.dumps(SVCP640) + ';globalThis.__WINP=' + json.dumps(WINP) + ';globalThis.__NEAR=' + json.dumps(NEAR) + ';globalThis.__WCOL=' + json.dumps(WCOL) + ';globalThis.__JOBS=' + json.dumps([{k: v for k, v in c.items() if k != 'src'} for c in AREA['cards']]) + ';' + js +
            # fact lock: every quote must be a verbatim excerpt of its review
            ';for(const p of [...Rev.PICK,...Proc.QUOTES,...Rev2.PICK,...Svc3.Q,...Win5.Q,...Rev4.LINES,...Rev8.PICK]){if(!__REV[p[0]].text.includes(p[1]))throw new Error("not verbatim: "+p[1]);}'
            ';process.stdout.write(JSON.stringify({' + pgk + 'sa:Services.A(),sb:Services.B(),sc:Svc2.C(),sd:Svc2.D(),se:Svc3.E(),sf:Svc3.F(),sg:Svc4.G(),sh:Svc4.H(),si:Svc5.I(),sj:Svc5.J(),sl:Svc6.L(),va:Vis.A(),vb:Vis.B(),vc:Vis2.C(),vd:Vis2.D(),ve:Vis3.E(),vf:Vis3.F(),vg:Vis4.G(),vh:Vis4.H(),vi:Vis5.I(),vj:Vis5.J(),vk:Vis6.K(),vl:Vis7.L(),vm:Vis8.M(),wm:Win8.M(),wa:Win.A(),wb:Win.B(),wc:Win2.C(),wd:Win2.D(),we:Win3.E(),wf:Win3.F(),wg:Win4.G(),wh:Win4.H(),wi:Win5.I(),wj:Win5.J(),wk:Win6.K(),ra:Rev.A(),rb:Rev.B(),rc:Rev2.C(),rd:Rev2.D(),re:Rev3.E(),rf:Rev3.F(),rg:Rev4.G(),rh:Rev4.H(),pa:Proc.A(),pb:Proc.B(),pc:Proc2.C(),pd:Proc2.D(),aa:Area.A(),ab:Area.B(),ac:Area2.C(),ad:Area2.D(),qa:Seq.A(),qb:Seq.B(),qc:Seq2.C(),qd:Seq2.D(),ca:Cta.A(),cb:Cta.B(),cc:Cta2.C(),cd:Cta2.D(),ft:Cta.FOOT(),ri:Rev5.I(),rj:Rev5.J(),rk:Rev6.K(),rl:Rev7.L(),rm:Rev8.M(),pe:Proc3.E(),pf:Proc3.F(),pg:Proc4.G(),ph:Proc4.H(),pi:Proc5.I(),pj:Proc5.J(),pk:Proc6.K(),pm:Proc8.M(),qe:Seq3.E(),qf:Seq3.F(),qg:Seq4.G(),qh:Seq4.H(),qi:Seq5.I(),qj:Seq5.J(),qk:Seq6.K(),ae:Area3.E(),af:Area3.F(),ag:Area4.G(),ah:Area4.H(),ai:Area5.I(),aj:Area5.J(),ak:Area6.K(),al:Area7.L(),ce:Cta3.E(),cf:Cta3.F(),cg:Cta4.G(),ch:Cta4.H(),ci:Cta5.I(),cj:Cta5.J(),ck:Cta6.K(),cl:Cta7.L()}))')
    return json.loads(subprocess.run(['node', '-'], input=prog, capture_output=True, text=True, check=True).stdout)


FILM = '<video class="film" muted loop playsinline preload="none" data-film aria-label="Film of a finished white board-and-batten home at golden hour"></video>'


def heroes():
    v1 = f'''<section class="hero v1" aria-labelledby="h1"><div class="stage" data-fx="0.2" data-fy="0.3">
<canvas role="img" aria-label="A finished Austin Pro job in Maple Run, Austin: charcoal lap siding above brick, with a two-car garage."></canvas>
<span class="hint" data-solid><i></i>Move across the siding</span>
<div class="creds" data-solid><span>GAF Master Elite</span><span>James Hardie Elite Preferred</span></div>
<div class="card" data-solid><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div></div></section>'''
    v2 = f'''<section class="hero v2" aria-labelledby="h1"><div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>
<div class="stage" data-fx="0.5" data-fy="0.42"><canvas role="img" aria-label="A finished Austin Pro siding job in Maple Run, Austin: a two-storey house in HardiePlank lap siding with a covered patio."></canvas>
<div class="tag" data-solid><b>177</b><small>before-and-after pairs published</small></div><span class="hint" data-solid><i></i>Move across the siding</span></div></section>'''
    v3 = f'<section class="hero v3" aria-labelledby="h1">{FILM}<div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>{PP}</section>'
    v4 = f'''<section class="hero v4" aria-labelledby="h1"><div class="copy"><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}</div>
<div class="win" data-solid><div class="glass">{FILM}<div class="mull"></div>{PP}</div><div class="sill"></div></div></section>'''
    v5 = f'''<section class="hero v5" aria-labelledby="h1"><h1 class="lead" id="h1">{LEAD}</h1>
<div class="strip" data-solid>{FILM}{PP}</div><div class="row"><p class="sub">{SUB}</p>{CTAS}</div></section>'''
    return {'1': v1, **new_heroes(), **heroes3(), 'k': heroK(), 'l': heroL(), 'm': heroM(), 'a2': v2, 'a3': v3, 'a4': v4, 'a5': v5}


ALT = {'c2': 'A modern two-storey house with charcoal lap siding and warm wood soffits.',
       'c1': 'A black board-and-batten house at dusk with warm light in the windows.',
       'c3': 'A craftsman-style house at dusk with board-and-batten siding and stone.'}
ARROW = lambda d: f'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="{"M15 5l-7 7 7 7" if d < 0 else "M9 5l7 7-7 7"}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
LAPCHIP = '<svg viewBox="0 0 44 44" aria-hidden="true"><rect x="2" y="2" width="40" height="40" rx="9" fill="#0E3B2C"/><g fill="#B5DB6E"><rect x="8" y="10" width="28" height="5" rx="1"/><rect x="8" y="19" width="28" height="5" rx="1" opacity=".8"/><rect x="8" y="28" width="28" height="5" rx="1" opacity=".6"/></g></svg>'


def matte_url():
    from PIL import Image
    import base64, io
    m = Image.open(os.path.join(HERE, 'media', 'cand3-matte.png')).convert('L'); rgba = Image.new('RGBA', m.size, (0, 0, 0, 0)); rgba.putalpha(m)
    b = io.BytesIO(); rgba.save(b, 'PNG', optimize=True); return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()


def hero2_data():
    from PIL import Image
    import base64, io
    def png(p):
        b = io.BytesIO(); Image.open(os.path.join(HERE, 'media', p)).save(b, 'PNG', optimize=True); return 'data:image/png;base64,' + base64.b64encode(b.getvalue()).decode()
    return {'c2': jpeg(os.path.join(HERE, 'media', 'hero-cand-2.png'), 1200, 86), 'c2d': png('cand2-depth.png'),
            'c1': jpeg(os.path.join(HERE, 'media', 'hero-cand-1.jpg'), 1024, 84), 'c1d': png('cand1-depth.png'),
            'c3': jpeg(os.path.join(HERE, 'media', 'hero-cand-3.jpg'), 1200, 86)}


def new_heroes():
    """Five new heroes on Muse's supplied photographs (never captioned as the firm's jobs). Photos load from one
    embedded copy (window.__HERO2) so no version duplicates an image."""
    creds = '<div class="creds2"><span>GAF Master Elite</span><span>James Hardie Elite Preferred</span><span>Andersen Certified Premier</span></div>'
    copy = lambda: f'<h1 class="lead" id="h1" data-split>{LEAD}</h1><p class="sub">{SUB}</p>{CTAS}'
    hint = '<span class="hint2" data-solid><i></i>Move to look around</span>'
    v2 = f'''<section class="hero h2v" aria-labelledby="h1"><div class="copy">{copy()}{creds}</div>
<div class="hph" role="img" aria-label="{ALT['c2']}">{hint}<div class="chip" data-solid>{LAPCHIP}<div><b>Lap siding</b><small>The full wall, course by course</small></div></div></div></section>'''
    steps = ['One project manager walks every side.', 'Every trade priced on one visit.', 'Built, then walked through with you.']
    v3 = f'''<section class="hero h3v" aria-labelledby="h1"><div class="pin"><div class="copy"><h1 class="lead" id="h1" data-split>{LEAD}</h1>
<div class="steps" aria-live="polite">{''.join(f'<p class="step{" on" if not i else ""}"><b>0{i + 1}</b>{t}</p>' for i, t in enumerate(steps))}</div><p class="sub">{SUB}</p>{CTAS}</div>
<div class="hph" role="img" aria-label="{ALT['c1']}"><span class="rail" aria-hidden="true"></span>{hint}</div></div></section>'''
    v4 = f'''<section class="hero h4v" aria-labelledby="h1" style="--matte:url({matte_url()})"><div class="layers"><img class="back" alt="{ALT['c3']}" decoding="async">
<h1 class="lead" id="h1"><span class="ln">The full wall or</span><span class="ln">the whole house.</span></h1><img class="front" alt="" aria-hidden="true" decoding="async"></div>
<div class="card" data-solid><p class="sub">{SUB}</p>{CTAS}</div></section>'''
    n = 11
    courses = ''.join(f'<div class="c" style="top:{i * 100 / n:.3f}%;height:{100 / n + 0.35:.3f}%;--side:{-1 if i % 2 else 1};--d:{(n - 1 - i) * 0.07:.2f}s"><img alt="" decoding="async"></div>' for i in range(n))
    v5 = f'''<section class="hero h5v" aria-labelledby="h1"><div class="copy">{copy()}{creds}</div>
<div class="courses" role="img" aria-label="{ALT['c2']} The photograph is hung as lap courses, the bottom course first.">{courses}<span class="tag5" data-solid>Every course, from the bottom up</span></div></section>'''
    cards = [('c2', 'Lap siding'), ('c1', 'Board and batten'), ('c3', 'Board and batten with stone')]
    v6 = f'''<section class="hero h6v" aria-labelledby="h1"><div class="copy">{copy()}{creds}</div>
<div class="stage" tabindex="0" role="group" aria-roledescription="carousel" aria-label="Three siding styles. Arrow keys or the buttons change the front card.">
<div class="deck">{''.join(f'<figure class="card" data-label="{lb}" data-img="{k}"><img alt="{ALT[k]}" decoding="async"><figcaption class="lb">{lb}</figcaption></figure>' for k, lb in cards)}</div>
<div class="ctl"><span class="now" aria-live="polite"></span><button type="button" data-go="-1" aria-label="Previous style">{ARROW(-1)}</button><button type="button" data-go="1" aria-label="Next style">{ARROW(1)}</button></div></div></section>'''
    return {'2': v2, '3': v3, '4': v4, '5': v5, '6': v6}


def heroes3():
    """Heroes 7-10 (overnight brief). No split scaffold (closed); photos never captioned as the firm's jobs."""
    ct2 = CTAS.split('<p class="proof"')[0]
    star5 = '<span class="stars" aria-hidden="true">' + I['star'] * 5 + '</span>'
    h7 = f'''<section class="hero h7v" aria-labelledby="h1"><canvas class="rec" aria-hidden="true"></canvas>
<div class="copy"><p class="eye">Siding, windows &amp; roofing · Austin since 2009</p><h1 class="lead" id="h1" data-split>Our work, on the record.</h1>
<p class="sub">886 documented projects since 2018: 312 on the map with photos + 574 more counted.</p>{ct2}
<dl class="nums"><div><dt data-count="431">431</dt><dd>documented siding jobs</dd></div><div><dt data-count="388">388</dt><dd>documented window jobs</dd></div><div><dt>4.9</dt><dd>{star5}from 474 Google reviews</dd></div></dl></div>
<p class="yr" aria-hidden="true">Records <b>2018</b></p><p class="cap" aria-hidden="true"><i class="d"></i>A documented project <i class="h"></i>Our office, N Lamar</p></section>'''
    h8 = f'''<section class="hero h8v" aria-labelledby="h1"><div class="ph8"><img alt="{ALT['c1']}" decoding="async"><i class="warm" aria-hidden="true"></i></div>
<div class="band" data-solid><i class="lap" aria-hidden="true"></i><div class="bin"><h1 class="lead" id="h1" data-split>The full wall or the whole house.</h1>
<div class="rt"><p class="sub">{SUB}</p>{CTAS}</div></div></div></section>'''
    import base64 as _b
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); j = P[0]   # the firm's own job: Maple Run, Austin
    src9 = 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(WORK, 'dl', 'photo0-640.webp'), 'rb').read()).decode()
    h9 = f'''<section class="hero h9v" aria-labelledby="h1"><h1 class="lead" id="h1"><span class="l1">The full</span>
<span class="l2">wall <span class="win9" role="img" aria-label="{j['alt'] or 'Siding at a home in ' + j['place']}. A job of ours: {j['place']}, {j['when']}."><img src="{src9}" alt="" decoding="async"><i class="sash" aria-hidden="true"></i><i class="mull" aria-hidden="true"></i></span> or</span>
<span class="l3">the whole</span><span class="l4">house.</span></h1>
<div class="foot9"><p class="cap9"><b>In the window:</b> {j['place']} · {j['when']} · {j['trades']}</p><p class="sub">{SUB}</p>{ct2}</div></section>'''
    TR = [['siding', '431', 'documented siding jobs'], ['windows', '388', 'documented window jobs'], ['roofing', '241', 'shingle and metal roofs']]
    ico = {'siding': '<path d="M10 20h60M10 32h60M10 44h60M10 56h60" pathLength="1"/>', 'windows': '<path d="M18 12h44v52H18zM40 12v52M18 38h44" pathLength="1"/>', 'roofing': '<path d="M6 50L40 18L74 50M16 58l24-22 24 22" pathLength="1"/>'}
    h10 = f'''<section class="hero h10v" aria-labelledby="h1"><p class="eye">One visit · every trade</p>
<h1 class="lead" id="h1"><span class="pre">New</span> <span class="slot10" aria-hidden="true"><span class="roll">{''.join(f'<b data-t="{t}">{t}.</b>' for t, _, _ in TR)}</span></span><span class="sr" id="h10w">siding, windows or roofing.</span></h1>
<p class="anchor">One free inspection covers every trade on the house.</p>
<div class="ico10" aria-hidden="true">{''.join(f'<svg viewBox="0 0 80 76" data-t="{t}">{ico[t]}</svg>' for t, _, _ in TR)}</div>
<div class="pick10" role="group" aria-label="Show a trade">{''.join(f'<button type="button" data-t="{t}" aria-pressed="{str(not i).lower()}">{t.capitalize()}<small>{n} {d}</small></button>' for i, (t, n, d) in enumerate(TR))}</div>
{CTAS}</section>'''
    return {'7': h7, '8': h8, '9': h9, '10': h10}


# Hero L: the eight colours, sampled by tools/hl_sample.py (sunlit part of the work in each __JOBS photo), in __JOBS order
HL_COLOURS = ['#80868F', '#9A9998', '#CEBDA4', '#A3AEAC', '#9D9484', '#C4CDCE', '#908971', '#DDD9DC']
HL_WHAT = ['siding', 'shingles', 'siding', 'window frames', 'siding', 'painted walls', 'siding', 'window frames']


def svcM():
    """Services M (new-versions addendum, pass 3): Lusion's flow, continuity of form. One photo frame whose outline flows
    (clip-path polygons, ten points each) into the shape of each trade's work, with one published job photo of that
    trade inside (photos.json) and the trade's published record beside it. Counts and bands as Services L (FACTS.md:
    service list + "Compare all 10 trades"); locks verbatim. Wired by Svc7 (src/sec/svc7.js)."""
    from PIL import Image, ImageOps
    import base64 as _b, io
    e = html.escape
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json')))
    def enc(i):
        im = ImageOps.fit(Image.open(os.path.join(WORK, 'dl', f'photo{i}-640.webp')).convert('RGB'), (640, 480), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'WEBP', quality=56, method=6); return 'data:image/webp;base64,' + _b.b64encode(b.getvalue()).decode()
    # (key, trade, count, count line, band line, timeline, photo index); the photo's trades must include the trade
    T = [('sid', 'Siding', 431, 'documented siding jobs', '$10k–$15k median band (415 priced)', '1 to 2 weeks including paint.', 2),
         ('win', 'Windows', 388, 'documented window jobs', '$10k–$15k median band (376 priced)', 'Most window-only jobs: two days on site.', 6),
         ('pnt', 'Exterior painting', 320, 'documented projects', '$2k–$5k median band (317 priced)', '', 0),
         ('shg', 'Shingle roofing', 210, 'documented projects', '$10k–$15k median band (204 priced)', '', 10),
         ('gut', 'Gutters', 121, 'documented projects', '$2k–$5k median band (109 priced)', '', 3),
         ('dor', 'Exterior doors', 109, 'documented projects', '$2k–$5k median band (96 priced)', '', 22),
         ('pat', 'Patio covers', 34, 'documented projects', '$15k–$20k median band (33 priced)', '', 16),
         ('met', 'Metal roofing', 31, 'documented projects', '$20k–$25k median band (29 priced)', '', 12),
         ('gar', 'Garage doors', 9, 'documented projects', '$2k–$5k median band (6 priced)', '', 26)]
    word = {'sid': 'siding', 'win': 'windows', 'pnt': 'painting', 'shg': 'shingle', 'gut': 'gutters', 'dor': 'doors', 'pat': 'patio', 'met': 'metal', 'gar': 'garage'}
    for k, n, c, l, b, x, i in T:
        assert word[k] in P[i]['trades'].lower(), (n, P[i]['trades'])
    alt = lambda q: q['alt'] or f"{q['trades']} at a home in {q['place']}, TX, by Austin Pro"
    radios = ''.join(f'<button type="button" role="radio" class="smr" data-i="{n}" aria-checked="{str(not n).lower()}" tabindex="{0 if not n else -1}">'
                     f'<span>{e(t[1])}</span><small>{t[2]}</small></button>' for n, t in enumerate(T))
    imgs = ''.join(f'<img class="smi{" on" if not n else ""}" data-i="{n}" src="{enc(t[6])}" alt="{e(alt(P[t[6]]))}" decoding="async"{"" if not n else " aria-hidden=\"true\""}>' for n, t in enumerate(T))
    def pan(n, t):
        k, nm, c, l, b, x, i = t; q = P[i]
        return (f'<div class="smpan" data-i="{n}"{"" if not n else " hidden"}><p class="smk">{e(nm)}</p><p class="smn"><b>{c}</b> {e(l)}</p>'
                f'<p class="smb">{e(b)}</p>{f"<p class=smx>{e(x)}</p>" if x else ""}'
                f'<p class="smph">Photo: {e(q["place"])} · {e(q["when"])} · {e(q["trades"])}. <a href="https://www.austinprosiding.com{e(q["href"])}" target="_blank" rel="noopener">See the project</a></p></div>')
    SID = 'polygon(4% 14%,100% 14%,100% 40%,96% 40%,96% 66%,100% 66%,100% 92%,0% 92%,0% 40%,4% 40%)'
    return f'''<section class="sec svM" id="services" aria-labelledby="svM-h">
<div class="smh"><h2 class="sec-h" id="svM-h" data-split>One frame, every trade.</h2><p class="sec-p">Pick a trade. The frame takes the shape of the work, with one of our own jobs inside it, and its record beside it.</p></div>
<div class="smg"><div class="smlist" role="radiogroup" aria-label="Our trades, most documented first">{radios}</div>
<figure class="smf" data-solid><div class="smclip" style="clip-path:{SID}">{imgs}</div></figure>
<div class="smp" aria-live="polite">{''.join(pan(n, t) for n, t in enumerate(T))}</div></div>
<div class="smft"><p>Counts are documented projects from our service list; one project can include several trades. Bands are each trade's median price band, materials and labor, before discounts. Decking has no documented count and no published photo, so it is not shown.</p>{CTAS.split('<p class="proof"')[0]}</div></section>'''


def heroM():
    """Hero M (new-versions addendum, pass 3): Quiet Cubes, modular and calm. The firm's 43 published project photos
    (photos.json) as square-jointed blocks stacked into a house: a stepped gable of the roofing jobs with a chimney,
    three wall courses of the siding and window jobs, and two ground courses of doors, garage doors and patio covers.
    A photo's part of the house is the trade it is captioned for (the first trade listed). Each block links to its
    published project page. Nothing can be chosen or changed: not a configurator."""
    from PIL import Image, ImageOps
    import base64 as _b, io
    e = html.escape
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json')))
    MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    key = lambda i: (int(P[i]['when'].split()[-1]), MON.index(P[i]['when'].split()[0]))
    first = lambda i: P[i]['trades'].replace(' & ', ', ').split(', ')[0]
    KIND = {'siding': 'sid', 'windows': 'win', 'shingle roofing': 'roof', 'metal roofing': 'roof', 'doors': 'door', 'garage doors': 'gar', 'patio covers': 'pat'}
    def cat(i):   # the trade the photo is captioned for: its published alt ("Doors at a home in …"), else the first trade listed
        a = (P[i]['alt'] or '').split(' at a home')[0].lower()
        return KIND[a] if a in KIND else KIND[first(i).lower()]
    G = {}
    for i in range(len(P)): G.setdefault(cat(i), []).append(i)
    for k in G: G[k].sort(key=key, reverse=True)
    assert {k: len(v) for k, v in G.items()} == {'roof': 13, 'sid': 9, 'win': 8, 'door': 5, 'gar': 4, 'pat': 4}, {k: len(v) for k, v in G.items()}
    take = {k: list(v) for k, v in G.items()}
    nxt = lambda k: take[k].pop(0)
    # the house, top to bottom on a 6-column grid: (row, col, kind)
    cells = [(1, 3, 'roof'), (1, 4, 'roof'), (1, 5, 'roof')]                         # ridge, and the chimney beside it
    cells += [(2, c, 'roof') for c in range(2, 6)] + [(3, c, 'roof') for c in range(1, 7)]
    for r, pat in ((4, 'SWSSWS'), (5, 'WSWWSW'), (6, 'SWSWSD')):
        cells += [(r, c + 1, {'S': 'sid', 'W': 'win', 'D': 'door'}[ch]) for c, ch in enumerate(pat)]
    for r, pat in ((7, 'GGDDGG'), (8, 'PPDDPP')):
        cells += [(r, c + 1, {'G': 'gar', 'P': 'pat', 'D': 'door'}[ch]) for c, ch in enumerate(pat)]
    assert len(cells) == 43
    PART = {'roof': 'roof', 'sid': 'wall', 'win': 'wall', 'door': 'ground', 'gar': 'ground', 'pat': 'ground'}
    def enc(i):
        im = ImageOps.fit(Image.open(os.path.join(WORK, 'dl', f'photo{i}-640.webp')).convert('RGB'), (200, 150), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'WEBP', quality=56, method=6); return 'data:image/webp;base64,' + _b.b64encode(b.getvalue()).decode()
    blocks = []   # (the chimney, at row 1 col 5, takes the oldest roofing photo)
    for n, (r, c, k) in enumerate(cells):
        i = take[k].pop() if (r, c) == (1, 5) else nxt(k); q = P[i]; alt = q['alt'] or f"{q['trades']} at a home in {q['place']}, TX, by Austin Pro"
        lab = f"{q['trades']}, {q['place']}, {q['when']}. Opens the project page."
        chim = ' mch0' if (r, c) == (1, 5) else ''
        blocks.append(f'<a class="mhb{chim}" href="https://www.austinprosiding.com{e(q["href"])}" target="_blank" rel="noopener" data-part="{PART[k]}" '
                      f'data-pl="{e(q["place"])}" data-wh="{e(q["when"])}" data-tr="{e(q["trades"])}" aria-label="{e(lab)}" tabindex="{0 if not n else -1}" '
                      f'style="grid-area:{r} / {c};--d:{(8 - r) * 6 + c}"><img src="{enc(i)}" alt="{e(alt)}" decoding="async"></a>')
    ct2 = CTAS.split('<p class="proof"')[0]
    chips = ''.join(f'<button type="button" class="mpc" data-part="{k}" aria-pressed="false">{l}</button>' for k, l in (('roof', 'Roof'), ('wall', 'Walls and windows'), ('ground', 'Doors, garage and patio')))
    return f'''<section class="hero hmv" aria-labelledby="h1">
<div class="mcp"><p class="eye">A house built from our own jobs</p><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{ct2}</div>
<div class="mhs"><div class="mhouse" data-solid role="group" aria-label="43 photos from our published projects, set as a house: roofing jobs as the roof, siding and window jobs as the walls, doors, garage doors and patio covers at ground level. Arrow keys move between them; Enter opens a project.">{''.join(blocks)}<i class="mground" aria-hidden="true"></i></div>
<div class="mpcs" role="group" aria-label="Light one part of the house">{chips}</div>
<p class="mplate" aria-live="polite"><span class="mdef">43 photos from our published projects, each set where its work sits on a house. <span class="mdf">Point at one to read its record.</span><span class="mdt">Tap one to open its project.</span></span></p></div></section>'''


def heroL():
    """Hero L (new-versions addendum, pass 2): Cash App Brand Guidelines, colour as content. Eight full-height colour
    fields, one per documented job in the project finder's photo cards (AREA['cards'] = window.__JOBS), newest first;
    each is the colour of the work in that job's photo. Opening a field widens it into the job's photo (filled at
    runtime from window.__JOBS, so no photo is embedded twice). Nothing can be chosen or changed: not a configurator."""
    C = AREA['cards']; ct2 = CTAS.split('<p class="proof"')[0]
    MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    key = lambda i: (int(C[i]['when'].split()[1]), MON.index(C[i]['when'].split()[0]))
    order = sorted(range(len(C)), key=key, reverse=True)
    e = html.escape
    def field(n, i):
        c = C[i]; hx = HL_COLOURS[i]; what = HL_WHAT[i]
        sr = f'{c["place"]}, {c["when"]}: {c["trades"]}. Colour of the {what}, {hx}.'
        return (f'<div class="lf" style="--c:{hx};--n:{n}" data-j="{i}">'
                f'<img class="lim" alt="{e(c["alt"])}" decoding="async" hidden>'
                f'<button type="button" class="lbt" id="lb{n}" aria-expanded="false" aria-controls="lp{n}"{"" if not n else " tabindex=\"-1\""}>'
                f'<span class="vh">{e(sr)} Show the photo.</span>'
                f'<span class="lcd" aria-hidden="true">{hx}</span><span class="lpl" aria-hidden="true">{e(c["place"])}</span>'
                f'<span class="lmo" aria-hidden="true">{e(c["when"])} · the {what}</span></button>'
                f'<div class="lpn" id="lp{n}" hidden><p class="ltr">{e(c["trades"])}</p>'
                f'<a class="ljb" href="{e(c["href"])}" target="_blank" rel="noopener">See this job on our site</a></div></div>')
    return f'''<section class="hero hlv" aria-labelledby="h1">
<div class="lcp"><p class="eye">Eight of our jobs, in their own colours</p><h1 class="lead" id="h1">{LEAD}</h1><p class="sub">{SUB}</p>{ct2}</div>
<div class="lbd" data-solid role="group" aria-label="Eight of our documented jobs, newest first, each shown by the colour of the work. Arrow keys move between jobs; Enter shows the photo.">{''.join(field(n, i) for n, i in enumerate(order))}</div>
<p class="lnote">Each colour is sampled from the sunlit part of the work in that job’s photo: the siding, the shingles or the window frames. Photo colours, not paint or product names.</p></section>'''


def winL():
    """Windows L (new-versions addendum, pass 2): MERSI's seam turned into a window's meeting rail. The firm's four
    published window before/after pairs (svcpairs.json, the windows page) hang as four windows on one lap wall; lifting a
    sash raises the after photo from the sill with the rail riding the seam. Records exactly as published."""
    from PIL import Image
    import base64 as _b, io
    P = json.load(open(os.path.join(WORK, 'data', 'svcpairs.json')))['windows']
    def enc(i, c):
        im = Image.open(os.path.join(WORK, 'dl', f'windows{i}{c}-720.webp')).convert('RGB').resize((640, 400), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'WEBP', quality=58, method=6); return 'data:image/webp;base64,' + _b.b64encode(b.getvalue()).decode()
    e = html.escape
    def win(i, r):
        return (f'<figure class="wlw" style="--n:{i}"><button type="button" class="wlf" aria-pressed="false" aria-label="{e(r["place"])}: show the new windows">'
                f'<img class="wlb" src="{enc(i, "b")}" alt="" decoding="async"><img class="wla" src="{enc(i, "a")}" alt="" decoding="async">'
                f'<span class="wlrail" aria-hidden="true"><i></i></span><span class="wlchip" aria-hidden="true"><b>Before</b><b>After</b></span></button>'
                f'<figcaption class="wlsill"><b>{e(r["place"])}</b><span>{e(r["when"])} · Installed: {e(r["installed"])}</span><span>Windows portion: {e(r["band"])}</span>'
                f'<span class="vh">{e(r["before"]["alt"])}. {e(r["after"]["alt"])}.</span>'
                f'<a href="https://www.austinprosiding.com{e(r["href"])}" target="_blank" rel="noopener">See the project</a></figcaption></figure>')
    return f'''<section class="sec wnL" id="windows" aria-labelledby="wnL-h">
<div class="wlh"><div><h2 class="sec-h" id="wnL-h" data-split>Lift the sash.</h2><p class="sec-p">Four of our window jobs, before and after. Lift each sash to see the new windows go in.</p></div>
<button type="button" class="btn light wlall" aria-pressed="false">Lift every sash</button></div>
<div class="wlwall" data-solid>{''.join(win(i, r) for i, r in enumerate(P))}</div>
<div class="wlft"><p>Four of our <b>388 documented window jobs</b>, published with before-and-after photos.</p>{CTAS.split('<p class="proof"')[0]}</div></section>'''


def procL():
    """Process L (new-versions addendum, pass 2): Scout's sequenced proof. One real job, APS-4867 (Village At Western Oaks,
    Austin), on a true-scale calendar, March to September 2026, with the five steps exactly as the firm published them on
    the project page ("The Journey"), and the job's own photographs. Day counts are arithmetic on the published dates."""
    from PIL import Image
    import base64 as _b, io, datetime as _d
    e = html.escape
    def enc(path, w):
        im = Image.open(os.path.join(WORK, 'dl', path)).convert('RGB'); im.thumbnail((w, w))
        b = io.BytesIO(); im.save(b, 'WEBP', quality=62, method=6); return 'data:image/webp;base64,' + _b.b64encode(b.getvalue()).decode()
    PR = json.load(open(os.path.join(WORK, 'data', 'pairs.json')))[0]          # the homepage pair for this job
    JD = json.load(open(os.path.join(WORK, 'data', 'job4867.json')))          # the job's published photo alts
    D0, D1 = _d.date(2026, 3, 1), _d.date(2026, 9, 30); span = (D1 - D0).days + 1
    x = lambda d: round(100 * (d - D0).days / span, 3)
    img = lambda src, alt, cls='': f'<img class="pli{cls}" src="{src}" alt="{e(alt)}" decoding="async" loading="lazy">'
    STEPS = [   # (number, title, date shown, date for the axis, row, published text, extra html)
        ('01', 'First contact', 'March 9, 2026', _d.date(2026, 3, 9), 0,
         'A past customer referred the homeowner to us, and the homeowner reached out on March 9, 2026. The conversation led to an inspection for siding and exterior painting at the Village At Western Oaks home.', ''),
        ('02', 'Evaluation', 'March 9, 2026', _d.date(2026, 3, 9), 1,
         'We inspected the home on March 9, 2026, and began the estimate. The proposed work accounted for siding sections as well as fascia, soffit, garage jambs, and brick-pocket details.',
         img(enc('home0b-720.webp', 720), PR['ba'], ' plw')),
        ('03', 'Planning & approval', 'June 18, 2026', _d.date(2026, 6, 18), 0,
         'The plan paired James Hardie smooth fiber cement siding with Sherwin Williams SuperPaint for the exterior finish. The homeowner approved the siding and painting project on June 18, 2026.',
         '<p class="plx">What we did: James Hardie 8.25-Inch Smooth Fiber Cement Siding · Sherwin Williams SuperPaint Exterior Finish<br>Siding portion: $25k–$30k</p>'),
        ('04', 'Installation', 'August 31 – September 3, 2026', _d.date(2026, 8, 31), 1,
         'The crew worked on site from August 31 through September 3, 2026. The siding work included wall sections and exterior details around the fascia, soffit, brick, and garage openings. Painting covered the siding and other specified surfaces, including the garage doors and porch ceiling.',
         '<div class="plg">' + ''.join(img(enc(f'job4867-{i}-480.webp', 480), JD[i]['alt']) for i in (1, 2, 6)) + '</div>'),
        ('05', 'Completion', 'September 3, 2026', _d.date(2026, 9, 3), 0,
         'The crew completed the on-site work on September 3, 2026. The final scope included punch-out items and yard cleanup after the siding and paint work.',
         img(enc('home0a-720.webp', 720), PR['aa'], ' plw'))]
    SHORT = {'01': 'Mar 9', '02': 'Mar 9', '03': 'Jun 18', '04': 'Aug 31 – Sep 3', '05': 'Sep 3'}
    months = ''.join(f'<span class="plm" style="left:{x(_d.date(2026, m, 1))}%">{_d.date(2026, m, 1).strftime("%b")}</span>' for m in range(3, 10))
    band = f'<i class="plband" style="left:{x(_d.date(2026, 8, 31))}%;width:{round(100 * 4 / span, 3)}%" aria-hidden="true"></i>'
    gaps = ''.join(f'<span class="plgap" style="left:{(x(a) + x(b)) / 2}%" aria-hidden="true">{(b - a).days} days</span>'
                   for a, b in ((_d.date(2026, 3, 9), _d.date(2026, 6, 18)), (_d.date(2026, 6, 18), _d.date(2026, 8, 31))))
    tabs = ''.join(f'<button type="button" role="tab" class="plt{" plr" if x(d) > 78 else ""}" id="plt{n}" aria-controls="plp{n}" aria-selected="{"true" if n == "01" else "false"}" tabindex="{0 if n == "01" else -1}" style="left:{x(d)}%;--row:{row}">'
                   f'<b>{n}</b><span class="plt2"><span>{t}</span><small>{SHORT[n]}</small></span></button>' for n, t, dt, d, row, _, _ in STEPS)
    panels = ''.join(f'<div class="plp" role="tabpanel" id="plp{n}" aria-labelledby="plt{n}"{"" if n == "01" else " hidden"}><div class="plpt"><p class="plk">{n} · {dt}</p><h3>{t}</h3><p class="plq">{e(txt)}</p></div>{extra}</div>'
                     for n, t, dt, d, row, txt, extra in STEPS)
    return f'''<section class="sec prL" id="process" aria-labelledby="prL-h">
<div class="plh"><p class="plk">Job APS-4867 · Siding & exterior painting · Village At Western Oaks, Austin</p>
<h2 class="sec-h" id="prL-h" data-split>One job, on its calendar.</h2>
<p class="plbig"><b>178 days</b> from first call to completion. <em>4</em> of them on site.</p></div>
<div class="plcal" data-solid><div class="plax">{months}{gaps}{band}<i class="plline" aria-hidden="true"></i>
<div class="pltabs" role="tablist" aria-label="The five steps of this job">{tabs}</div></div>{panels}</div>
<div class="plft"><p>Every step and date as published on the project page; the day counts are worked out from those dates.
<a href="https://www.austinprosiding.com/recent-projects/{PR['s']}" target="_blank" rel="noopener">See this project on our site</a></p>{CTAS.split('<p class="proof"')[0]}</div></section>'''


def tryL():
    """Try L (new-versions addendum, pass 2): Apple AirPods Pro's numbers as events. "Price the job": six of the firm's
    documented jobs, each with the trade band published on its project page (pairs.json; Rob Roy from svcpairs.json, the
    siding page). The visitor picks one of four bands; the real band then lands as a numeral event beside the trade's
    published median band. A quiz (game-like mechanics live in Try only), not a configurator: nothing about the
    visitor's house is asked."""
    from PIL import Image, ImageOps
    import base64 as _b, io
    e = html.escape
    def enc(name):
        im = ImageOps.fit(Image.open(os.path.join(WORK, 'dl', f'{name}-720.webp')).convert('RGB'), (640, 400), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'WEBP', quality=58, method=6); return 'data:image/webp;base64,' + _b.b64encode(b.getvalue()).decode()
    HP = json.load(open(os.path.join(WORK, 'data', 'pairs.json')))
    SV = json.load(open(os.path.join(WORK, 'data', 'svcpairs.json')))['siding']
    LAD = ['$5k–$10k', '$10k–$15k', '$15k–$20k', '$20k–$25k', '$25k–$30k', '$30k–$40k', '$40k–$50k']
    MED = {'Siding': ('siding', '$10k–$15k', 415), 'Windows': ('windows', '$10k–$15k', 376),     # homepage "Compare all 10 trades"
           'Roofing': ('shingle roofing', '$10k–$15k', 204), 'Patio covers': ('patio covers', '$15k–$20k', 33)}
    def hp(n, k):
        r = HP[n]; return dict(place=r['p'].replace(' At ', ' at '), when=r['w'], trade=r['t'], inst=r['i'], band=r['b'], bl=r['bl'],
                               alt=r['aa'].replace(' — ', ', ').replace(' At ', ' at '), href='/recent-projects/' + r['s'], img=f'home{n}a', k=k)
    r = SV[1]
    RB = dict(place=r['place'], when=r['when'], trade='Siding', inst=r['installed'], band=r['band'], bl=r['bl'], alt=r['after']['alt'], href=r['href'], img='siding1a', k=1)
    # (round order; k = where the right band sits among the four offered, so it moves about)
    R = [hp(5, 1), hp(0, 2), hp(2, 0), hp(4, 2), RB, hp(3, 3)]
    for j in R:
        assert j['band'] in LAD, j
        c = LAD.index(j['band']); j['s'] = s = min(max(c - j['k'], 0), 3); j['c'] = c
    say = lambda b: b.replace('–', ' to ')
    def rnd(n, j):
        med = MED[j['trade']]; opts = LAD[j['s']:j['s'] + 4]; part = j['bl'].lower()
        tiles = ''.join(f'<button type="button" class="tqb" data-i="{LAD.index(o)}" aria-label="{e(say(o))}">{e(o)}</button>' for o in opts)
        lad = ''.join(f'<i class="tql{" tqm" if o == med[1] else ""}{" tqj" if o == j["band"] else ""}" data-i="{i}"><span>{e(o.replace("$", "").replace("k", ""))}{"<em>median</em>" if o == med[1] else ""}</span></i>' for i, o in enumerate(LAD))
        last = n == len(R) - 1
        return (f'<article class="tqr" data-n="{n}" data-c="{j["c"]}"{"" if not n else " hidden"} aria-label="Job {n + 1} of {len(R)}">'
                f'<figure class="tqph"><img src="{enc(j["img"])}" alt="{e(j["alt"])}" decoding="async"{"" if not n else " loading=\"lazy\""}>'
                f'<figcaption class="tqbig" aria-hidden="true"><small>{e(j["bl"])}</small><b data-v="{e(j["band"])}">?</b></figcaption></figure>'
                f'<div class="tqs"><p class="tqrec"><b>{e(j["place"])}</b><span>{e(j["when"])} · {e(j["trade"])} · {e(j["inst"])}</span></p>'
                f'<h3 class="tqq">What did the {e(part)} cost?</h3>'
                f'<div class="tqo" role="group" aria-label="Four price bands for the {e(part)}">{tiles}</div>'
                f'<div class="tqres" hidden><p class="tqhit"></p>'
                f'<p class="tqlh" aria-hidden="true">Price bands, in $ thousands</p><div class="tqlad" aria-hidden="true">{lad}</div>'
                f'<p class="tqkey"><span><i class="tqkj"></i>This job</span><span><i class="tqkm"></i>{e(med[0].capitalize())}: {med[1]} median band ({med[2]} priced)</span></p>'
                f'<div class="tqnx"><a class="tqpj" href="https://www.austinprosiding.com{e(j["href"])}" target="_blank" rel="noopener">See the project</a>'
                f'<button type="button" class="btn light tqnext">{"See your score" if last else "Next job"}</button></div></div></div></article>')
    LEV = ['Home size and number of stories — wall square footage drives material and labor',
           'Finish and profile: James Hardie ColorPlus factory color vs field paint, and lap vs board and batten',
           'How much rot, wood repair, or flashing correction hides under the old siding',
           'Trim, soffit, and fascia scope — full wrap vs siding faces only',
           'Whether exterior painting rides along in the same mobilization (usually cheaper together)',
           'Access: second-story walls, steep grade, and tight lot lines all add labor']
    end = (f'<article class="tqr tqend" data-n="{len(R)}" hidden aria-label="Your score"><div class="tqmos" aria-hidden="true"></div>'
           f'<div class="tqs"><p class="tqk2">Your score</p><p class="tqsc" aria-hidden="true"><b>0</b> of {len(R)}</p><p class="tqsc2"></p>'
           f'<p class="tqlv">What moves a siding price, as we publish it in our cost guide:</p><ol class="tqlvl">{"".join(f"<li>{e(t)}</li>" for t in LEV)}</ol>'
           f'<div class="tqnx"><button type="button" class="btn light tqagain">Play again</button></div></div></article>')
    pips = ''.join(f'<i data-n="{n}"></i>' for n in range(len(R)))
    return f'''<section class="sec tqL" id="try" aria-labelledby="tqL-h">
<div class="tqh"><h2 class="sec-h" id="tqL-h" data-split>Price the job.</h2><p class="sec-p">Six of our documented jobs, each with the price band we published for it. Pick a band for each, then see the real one.</p></div>
<div class="tqcard" data-solid><div class="tqtop"><p class="tqct">Job <b class="tqcn">1</b> of {len(R)}</p><div class="tqpips" aria-hidden="true">{pips}</div><p class="tqct">Spot on: <b class="tqok">0</b></p></div>
{''.join(rnd(n, j) for n, j in enumerate(R))}{end}<p class="vh tqlive" aria-live="polite"></p></div>
<div class="tqft"><p>Each band is the published price of that trade on that job: materials and labor, before discounts, excluding tax. A documented sample of our work; your house will have its own number.</p>{CTAS.split('<p class="proof"')[0]}</div></section>'''


def heroK():
    """Hero K (new-versions addendum): MERSI's split-slider on the firm's own six documented before/after pairs
    (pairs.json, the published project pages). Before fills the left half, after the right; on each change the halves
    wipe in opposite directions and the centre plate rolls the job's record in sync. No autoplay (as MERSI)."""
    from PIL import Image
    import base64 as _b, io
    P = json.load(open(os.path.join(WORK, 'data', 'pairs.json')))
    def enc(n, c):
        im = Image.open(os.path.join(WORK, 'dl', f'home{n}{c}-1280.webp')).convert('RGB').resize((1040, 650), Image.LANCZOS)
        b = io.BytesIO(); im.save(b, 'WEBP', quality=72, method=6); return 'data:image/webp;base64,' + _b.b64encode(b.getvalue()).decode()
    alt = lambda t: t.replace(' \u2014 ', ', ').replace(' — ', ', ').replace(' At ', ' at ')
    N = len(P); ct2 = CTAS.split('<p class="proof"')[0]
    rec = lambda i: f'<b>{html.escape(P[i]["p"].replace(" At ", " at "))}</b><small>{P[i]["w"]} · {html.escape(P[i]["t"])}</small>'
    imgs = lambda c, key: ''.join(f'<img class="kim{" on" if not i else ""}" data-i="{i}" src="{enc(i, c)}" alt="{html.escape(alt(P[i][key]))}" decoding="async"{"" if not i else " aria-hidden=\"true\""}>' for i in range(N))
    arrow = lambda d: f'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="{"M15 5l-7 7 7 7" if d < 0 else "M9 5l7 7-7 7"}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    data = json.dumps([{'p': P[i]['p'].replace(' At ', ' at '), 'w': P[i]['w'], 't': P[i]['t'], 'h': 'https://www.austinprosiding.com/recent-projects/' + P[i]['s']} for i in range(N)])
    return f'''<section class="hero hkv" aria-labelledby="h1" data-k=\'{html.escape(data)}\'>
<div class="kwr"><div class="kfr" data-solid tabindex="0" role="group" aria-roledescription="carousel" aria-label="Before and after: {N} of our documented jobs. Arrow keys change the job.">
<div class="kh kb"><div class="kst">{imgs('b', 'ba')}</div><span class="ktg" aria-hidden="true">Before</span></div>
<div class="kh ka"><div class="kst">{imgs('a', 'aa')}</div><span class="ktg" aria-hidden="true">After</span></div>
<i class="kseam" aria-hidden="true"></i></div>
<div class="kpl" data-solid><p class="eye">Before · After</p><h1 class="lead" id="h1" data-split>{LEAD}</h1>
<div class="krec" aria-live="polite" aria-atomic="true"><span class="kr on">{rec(0)}</span></div>
<div class="knav"><button type="button" class="kgo" data-go="-1" aria-label="Previous job">{arrow(-1)}</button><span class="kct"><b>01</b> / {N:02d}</span><button type="button" class="kgo" data-go="1" aria-label="Next job">{arrow(1)}</button></div></div></div>
<div class="kft"><p class="sub">{SUB}</p>{ct2}<p class="ksrc">{N} of our 177 before-and-after pairs · <a class="kjob" href="{json.loads(data)[0]['h']}" target="_blank" rel="noopener">See this job on our site</a></p></div></section>'''


def svcK():
    """Services K (new-versions addendum), Scout Motors' film-roll evidence. Each trade is a reel of the firm's own published
    job photos (photos.json), each on the reel of a trade its record lists. The eight job photos already present at runtime
    (window.__JOBS, 640 px) are reused by reference; the rest are embedded here once at 680 px."""
    from PIL import Image
    import base64 as _b, io
    P = json.load(open(os.path.join(WORK, 'data', 'photos.json')))
    REELS = [('Siding', 431, [0, 36, 28, 2]), ('Windows', 388, [42, 7, 6, 4]), ('Exterior painting', 320, [33, 38, 3, 30]),
             ('Shingle roofing', 210, [10, 8, 9, 11]), ('Gutters', 121, [1, 3, 30]), ('Exterior doors', 109, [22, 20, 39, 40]),
             ('Patio covers', 34, [16, 18, 19, 41]), ('Metal roofing', 31, [12, 14, 15]), ('Garage doors', 9, [26, 25, 24])]
    J = [0, 10, 2, 7, 28, 33, 36, 42]   # window.__JOBS order (the only job photos present at runtime)
    ref = lambda i: f'J:{J.index(i)}' if i in J else None
    emb = {}
    for _, _, fr in REELS:
        for i in fr:
            if ref(i) is None and i not in emb:
                im = Image.open(os.path.join(WORK, 'dl', f'photo{i}-1400.webp')).convert('RGB'); im.thumbnail((680, 680)); b = io.BytesIO(); im.save(b, 'WEBP', quality=58, method=6)
                emb[i] = 'data:image/webp;base64,' + _b.b64encode(b.getvalue()).decode()
    rec = lambda i: {'r': ref(i) or f'E:{i}', 'alt': P[i]['alt'] or f"{P[i]['trades']} at a home in {P[i]['place']}, TX, by Austin Pro", 'p': P[i]['place'], 'w': P[i]['when'], 't': P[i]['trades'], 'h': 'https://www.austinprosiding.com' + P[i]['href']}
    data = {'reels': [{'t': t, 'n': n, 'f': fr} for t, n, fr in REELS], 'ph': {i: rec(i) for _, _, fr in REELS for i in fr}, 'emb': emb}
    t0, n0, f0 = REELS[0]
    frames = ''.join(f'<li><button type="button" class="fr" data-i="{i}" aria-pressed="{str(not k).lower()}" tabindex="{-1 if k else 0}" aria-label="Frame {k + 1}: {html.escape(P[i]["place"])}, {P[i]["when"]}"><img alt="" decoding="async"><span class="ec" aria-hidden="true"><b>{k + 1:02d}A</b> {html.escape(P[i]["when"].upper())} · {html.escape(P[i]["place"].split(",")[0].upper())}</span></button></li>' for k, i in enumerate(f0))
    reels = ''.join(f'<button type="button" class="rb" data-r="{k}" aria-pressed="{str(not k).lower()}"><span>{t}</span><b>{n}</b></button>' for k, (t, n, _) in enumerate(REELS))
    p0 = P[f0[0]]
    markup = f'''<section class="sec svk" id="services" aria-labelledby="svk-h">
<div class="hd"><p class="kk">Services · on film</p><h2 class="sec-h" id="svk-h" data-split>Every trade, shown on real jobs.</h2><p class="sec-p">Pick a trade and run its reel. Every frame is a documented Austin Pro job, with its place and month.</p></div>
<div class="reels" role="group" aria-label="Choose a trade (documented jobs)">{reels}</div>
<figure class="scr" data-solid><div class="scw"><img class="pj" alt="{html.escape(rec(f0[0])['alt'])}" decoding="async"><i class="flk" aria-hidden="true"></i><span class="tc" aria-hidden="true">REEL <b>01</b> · FRAME <b>01</b></span></div>
<figcaption aria-live="polite"><b class="cp">{html.escape(p0['place'])}</b><span class="cw">{p0['when']} · {html.escape(p0['trades'])}</span><a class="jl" href="https://www.austinprosiding.com{p0['href']}" target="_blank" rel="noopener">See this job on our site</a><div class="nv"><button type="button" class="go" data-go="-1" aria-label="Previous frame">{ARROW(-1)}</button><button type="button" class="go" data-go="1" aria-label="Next frame">{ARROW(1)}</button></div></figcaption></figure>
<div class="film" data-solid><p class="rl" aria-hidden="true">REEL <b>01</b> · <span class="rt">{t0.upper()}</span> · <span class="rn">{n0}</span> DOCUMENTED JOBS · <span class="rfc">{len(f0)}</span> FRAMES</p>
<ol class="strip" aria-label="Film strip: {t0}, {len(f0)} frames. Arrow keys move through the frames.">{frames}</ol><i class="gate" aria-hidden="true"></i></div>
<div class="svft"><p class="ct" aria-live="polite"><b class="cn">{n0}</b> documented <span class="ctt">{t0.lower()}</span> jobs · <span class="cf">{len(f0)}</span> on this reel</p><div class="acts"><a class="btn key" href="{BOOK}">Book a free inspection<span class="tab">{I['cal']}</span></a><a class="callx" href="tel:+15125500000">{I['phone']}(512) 550-0000</a></div></div></section>'''
    return markup, data


SVK = svcK()


# ---------------------------------------------------------------- Background V2 (AUSTIN-BACKGROUND-V2-CODE-COPY-2026-11-05)
BG2_DEFAULT = 'b2'
BG2_LIST = [['b1', 'B1 Relief terrain'], ['b2', 'B2 Street of roofs'], ['b3', 'B3 Material field'], ['ig', 'IG exact (their code and art; comparison only)'], ['v1', 'V1 (previous background)']]


def bg2_html():
    """The copied Immersive Garden background engine (src/bg2/engine.bundle.js, Three.js r150) and one inert JSON block per
    world; only the chosen world (?bg=, else BG2_DEFAULT) is decoded at run time."""
    import base64
    b = lambda p: base64.b64encode(open(p, 'rb').read()).decode()
    M = os.path.join(HERE, 'media'); IGD = os.path.join(HERE, '..', '..', 'bgstudy-v2', 'background-code')
    W = {}
    td = os.path.join(M, 'igx', 'tex')
    W['ig'] = {'kind': 'ig', 'plaster': [b(os.path.join(IGD, 'home', 'plaster.jpg')), 'image/jpeg'],
               'maskNoise': [b(os.path.join(IGD, 'global', 'noises', 'mask-noise.png')), 'image/png'],
               'att': [b(os.path.join(IGD, 'global', 'noises', 'rgb-attenuation-0_9.png')), 'image/png'],
               'geo': b(os.path.join(M, 'igx', 'geo.bin.gz')), 'meta': json.load(open(os.path.join(M, 'igx', 'geo.json'))),
               'tex': [b(os.path.join(td, f)) for f in sorted(os.listdir(td))]}
    C = os.path.join(M, 'bg2', 'common')
    common = {'plaster': [b(os.path.join(C, 'plaster.webp')), 'image/webp'], 'maskNoise': [b(os.path.join(C, 'mask.webp')), 'image/webp'], 'att': [b(os.path.join(C, 'att.webp')), 'image/webp']}
    for w in ('b1', 'b2', 'b3'):
        d = os.path.join(M, 'bg2', w); cfg = json.load(open(os.path.join(d, 'world.json')))
        W[w] = {'kind': 'austin', 'depth': cfg['depth'], 'mx': cfg['mx'], 'my': cfg['my'], **common,
                'panels': [{'h': b(os.path.join(d, f'p{k}_h.webp')), 'l': [b(os.path.join(d, f'p{k}_l{i}.webp')) for i in range(1, 6)]} for k in range(cfg['npan'])]}
    blocks = ''.join(f'<script type="application/json" id="bgw-{k}">{json.dumps(v, separators=(",", ":"))}</script>' for k, v in W.items())
    loader = "<script>(function(){var s=window.__BGSEL;if(s==='v1'||!window.BG2)return;var el=document.getElementById('bgw-'+s);if(!el)return;BG2.start(JSON.parse(el.textContent)).then(function(r){window.__BG2=r;},function(e){console.warn('bg2',e);});})();</script>"
    return blocks + '<script>' + src('bg2/engine.bundle.js') + '</script>' + loader



def bg_panels():
    # the hidden world: three baked relief panels (bg/relief.py), each as two WebPs (levels 1-3; levels 4-5 + plaster grain)
    import base64 as _b
    f = lambda n, ab: 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(HERE, 'media', 'bg', f'p{n}{ab}.webp'), 'rb').read()).decode()
    return [{'a': f(n, 'a'), 'b': f(n, 'b')} for n in (1, 2, 3)]


VERSIONS = {
    'hero': [['1', 'Charcoal photo, boards lift (backup, rejected photo)'], ['2', 'Depth window'], ['3', 'Pinned dusk portrait'], ['4', 'Title between sky and house'],
             ['5', 'Photo hung as lap courses'], ['6', 'Three-house deck'], ['7', 'The record'], ['8', 'Last light'], ['9', 'Type as the house'], ['10', 'One visit'], ['k', 'Before | After, on the seam'], ['l', 'In their own colours'], ['m', 'A house built from our jobs'], ['a2', 'Archive: white-lap photo'], ['a3', 'Archive: film full bleed'], ['a4', 'Archive: film in a window'], ['a5', 'Archive: film strip']],
    'services': [['a', 'Sideways sequence'], ['b', 'Word switcher'], ['c', 'Counted chapters'], ['d', 'Split cover, real jobs'], ['e', 'Pick a part of the house'], ['f', 'The magazine spread'], ['g', 'Side by side'], ['h', 'Pull a board'], ['i', 'Three rings, one visit'], ['j', 'The index'], ['k', 'Run the reel'], ['l', 'Built from our records'], ['m', 'One frame, every trade']], 'vis': [['a', 'Swatch fan'], ['b', 'Snap-together wall'], ['c', 'Colour fields, compare'], ['d', 'The instrument'], ['e', 'Pairings to start from'], ['f', 'The colour map'], ['g', 'Four questions'], ['h', 'Colour in Austin light'], ['i', 'Look closer'], ['j', 'Your house, on the street'], ['k', 'Open a colour'], ['l', 'Roll it on'], ['m', 'Pull a colour through']],
    'windows': [['a', 'Morning to midnight'], ['b', 'Bay, built out'], ['c', 'Taken apart, pinned'], ['d', 'Window jobs on record'], ['e', '376 jobs, by maker'], ['f', 'How each window opens'], ['g', 'Frame colours, by maker'], ['h', 'Count your windows'], ['i', 'A window of words'], ['j', 'From opening to trim'], ['k', '376 jobs, set in type'], ['l', 'Lift the sash'], ['m', 'One window, four answers']], 'reviews': [['a', '4.9 in lap courses'], ['b', 'Hanging tags'], ['c', 'Read at reading pace'], ['d', 'Ask the neighbours'], ['e', 'The names they mention'], ['f', 'All 30, searchable'], ['g', 'A steady stream'], ['h', 'Letters from homeowners'], ['i', 'One line, poster size'], ['j', '474, and the 30 we show'], ['k', 'Marked up by hand'], ['l', 'The whole job, in their words'], ['m', 'Their before, their after']],
    'process': [['a', 'Stacked chapters'], ['b', 'Pinned wall'], ['c', 'The plumb line'], ['d', 'Four columns'], ['e', 'Turn the dial'], ['f', 'Questions at each step'], ['g', 'Stamp the card'], ['h', 'One paragraph'], ['i', 'Your part, and ours'], ['j', 'Four numbers'], ['k', 'Handed along'], ['l', 'One job, on its calendar'], ['m', 'Your job, in order']], 'try': [['a', 'Pinned sideways'], ['b', 'Swipe rail'], ['c', 'The workbench'], ['d', 'The dive (Lusion idea)'], ['e', 'Inspect at dusk'], ['f', 'Measure the opening'], ['g', 'Shingle from the eave up'], ['h', 'Level the window'], ['i', 'Nail it on the studs'], ['j', 'Name the parts'], ['k', 'Flash the window'], ['l', 'Price the job']],
    'area': [['a', 'Thread board'], ['b', 'Street finder'], ['c', 'Drive round our jobs'], ['d', 'Every town, ranked'], ['e', 'Is your street on our books?'], ['f', 'The job board'], ['g', 'The streets we know'], ['h', 'Town by trade'], ['i', 'Miles from our door'], ['j', 'Year by year'], ['k', 'Month by month'], ['l', 'Which way from our door']], 'book': [['a', 'Work order'], ['b', 'Press the board'], ['c', 'The record, then the call'], ['d', 'One number'], ['e', 'The week, at a glance'], ['f', 'Come by the office'], ['g', 'Three ways in'], ['h', 'Write us a postcard'], ['i', 'Day and night'], ['j', 'The receipt'], ['k', 'Next stop: your house'], ['l', 'Everything, then one step']]}
SLOTNAMES = {'hero': 'Hero', 'services': 'Services', 'vis': 'Visualiser', 'windows': 'Windows', 'reviews': 'Reviews', 'process': 'Process', 'try': 'Try the job', 'area': 'On your street', 'book': 'Booking'}

PAGENAMES = dict((k, n) for k, n in PG['pages'])
for _p, _x in PSECS:
    VERSIONS[_x['slot']] = _x['v']; SLOTNAMES[_x['slot']] = PAGENAMES[_p] + ' · ' + _x['name']
SLOTPAGE = {_x['slot']: _p for _p, _x in PSECS}


def slot(name, versions):
    lv = LIVE.get(name, 'a'); live = versions[lv]
    backs = ''.join(f'<template data-slot="{name}" data-v="{k}">{v}</template>' for k, v in versions.items() if k != lv)
    return f'<div class="slot" data-slot="{name}" data-v="{lv}">{live}</div>{backs}'


def photos():
    def one(srcp, data_file, crop):
        return {'src': jpeg(os.path.join(HERE, 'media', srcp), 1900, 88), 'data': json.load(open(os.path.join(HERE, 'media', data_file))), 'crop': crop}
    return {'v1': {**one('charcoal-orig.jpg', 'charcoal-boards.json', [0, 0, 1900, 1180]), 'radius': 170},
            'v2': {**one('whitelap-orig.jpg', 'whitelap-after-boards.json', [0, 330, 1771, 1180]), 'radius': 150}}


BOOT = '''(function(){
const q=new URLSearchParams(location.search);
/* page views: ?page=<name> swaps the homepage for that page (the homepage stays the default) */
{const pg=q.get('page'),m=document.querySelector('main'),t=pg&&document.querySelector('template[data-page="'+pg+'"]');
 if(t&&m){const home=document.createElement('template');home.dataset.page='home';home.innerHTML=m.innerHTML;m.replaceChildren(t.content.cloneNode(true));m.dataset.page=pg;t.replaceWith(home);
  const n=(window.__PAGES||[]).find(x=>x[0]===pg);if(n)document.title=n[1]+' | Austin Pro Siding, Windows & Roofing';}}
/* audit only: put a backup version into its slot */
document.querySelectorAll('.slot').forEach(s=>{const v=q.get(s.dataset.slot);if(!v||v===s.dataset.v)return;
  const t=document.querySelector('template[data-slot="'+s.dataset.slot+'"][data-v="'+v+'"]');if(!t)return;
  const back=document.createElement('template');back.dataset.slot=s.dataset.slot;back.dataset.v=s.dataset.v;back.innerHTML=s.innerHTML;
  s.replaceChildren(t.content.cloneNode(true));s.dataset.v=v;t.replaceWith(back);});
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
/* hero: interactive photo, or the film */
const P=window.__PHOTOS,h=document.querySelector('.slot[data-slot=hero] .hero');
if(h&&h.matches('.v1,.v2')){const k=h.matches('.v1')?'v1':'v2';window.__photo=photoHero(h.querySelector('.stage'),P[k]);}
const H2=window.__HERO2;if(h&&h.matches('.h4v')){h.querySelector('.back').src=H2.c3;h.querySelector('.front').src=H2.c3;}
if(h&&h.matches('.h5v'))h.querySelectorAll('.c img').forEach(i=>i.src=H2.c2);
if(h&&h.matches('.h6v'))h.querySelectorAll('.card').forEach(c=>c.querySelector('img').src=H2[c.dataset.img]);
Hero2.wire();Hero3.wire();Hero4.wire();Hero5.wire();Hero6.wire();SvcK.wire();
document.querySelectorAll('.slot video[data-film]').forEach(v=>{v.append(document.getElementById('film').content.cloneNode(true));
  v.poster=document.getElementById('film').dataset.poster;v.preload='auto';if(!RM){v.autoplay=true;v.load();v.play().catch(()=>{});}else v.load();});
const PLAY=%PLAY%,PAUSE=%PAUSE%;
document.querySelectorAll('.slot .pp').forEach(b=>{const v=b.closest('.hero').querySelector('video');if(!v)return;
  const sync=()=>{const p=v.paused;b.innerHTML=p?PLAY:PAUSE;b.setAttribute('aria-label',p?'Play the film':'Pause the film');b.setAttribute('aria-pressed',p);};
  if(RM)sync();b.addEventListener('click',()=>{v.paused?v.play():v.pause();setTimeout(sync,0);});v.addEventListener('pause',sync);v.addEventListener('play',sync);});
Scenes.wire(document);Services.wire(document);Svc2.wire(document);Svc3.wire(document);Svc4.wire(document);Svc5.wire(document);Svc6.wire(document);Svc7.wire(document);Vis.wire(document);Vis2.wire(document);Vis3.wire(document);Vis4.wire(document);Vis5.wire(document);Vis6.wire(document);Vis7.wire(document);Vis8.wire(document);Win.wire(document);Win2.wire(document);Win3.wire(document);Win4.wire(document);Win5.wire(document);Win6.wire(document);Win7.wire(document);Win8.wire(document);Rev.wire(document);Rev2.wire(document);Rev3.wire(document);Rev4.wire(document);Proc.wire(document);Proc2.wire(document);Seq.wire(document);Seq2.wire(document);Area.wire(document);Area2.wire(document);Cta.wire(document);Cta2.wire(document);Rev5.wire(document);Rev6.wire(document);Rev7.wire(document);Rev8.wire(document);Proc3.wire(document);Proc4.wire(document);Proc5.wire(document);Proc6.wire(document);Proc7.wire(document);Proc8.wire(document);Seq3.wire(document);Seq4.wire(document);Seq5.wire(document);Seq6.wire(document);Seq7.wire(document);Area3.wire(document);Area4.wire(document);Area5.wire(document);Area6.wire(document);Area7.wire(document);Cta3.wire(document);Cta4.wire(document);Cta5.wire(document);Cta6.wire(document);Cta7.wire(document);Nav.wire();Bx.init();
})();'''


def build():
    pre = prerender()
    css = fonts() + src('frame.css') + src('heroes.css') + ''.join(SEC(f + '.css') for f in MODS + PMODS)
    css += src('hero2.css') + src('hero3.css') + src('hero4.css') + src('hero5.css') + src('hero6.css') + src('svck.css') + src('fx.css') + src('hf.css') + src('bx.css') + '.slot{display:contents}'
    css = css.replace('244,242,236', '255,255,255')
    film = (f'<template id="film" data-poster="{jpeg(os.path.join(HERE, "media", "f1.jpg"), 480, 70)}">'
            f'<source type="video/webm" src="data:video/webm;base64,{b64(os.path.join(HERE, "media", "hero-1280.webm"))}">'
            f'<source type="video/mp4" src="data:video/mp4;base64,{b64(os.path.join(HERE, "media", "hero-1280.mp4"))}"></template>')
    main = (slot('hero', heroes()) + slot('services', {'a': pre['sa'], 'b': pre['sb'], 'c': pre['sc'], 'd': pre['sd'], 'e': pre['se'], 'f': pre['sf'], 'g': pre['sg'], 'h': pre['sh'], 'i': pre['si'], 'j': pre['sj'], 'k': SVK[0], 'l': pre['sl'], 'm': svcM()}) + slot('vis', {'a': pre['va'], 'b': pre['vb'], 'c': pre['vc'], 'd': pre['vd'], 'e': pre['ve'], 'f': pre['vf'], 'g': pre['vg'], 'h': pre['vh'], 'i': pre['vi'], 'j': pre['vj'], 'k': pre['vk'], 'l': pre['vl'], 'm': pre['vm']}) +
            slot('windows', {'a': pre['wa'], 'b': pre['wb'], 'c': pre['wc'], 'd': pre['wd'], 'e': pre['we'], 'f': pre['wf'], 'g': pre['wg'], 'h': pre['wh'], 'i': pre['wi'], 'j': pre['wj'], 'k': pre['wk'], 'l': winL(), 'm': pre['wm']}) + slot('reviews', {'a': pre['ra'], 'b': pre['rb'], 'c': pre['rc'], 'd': pre['rd'], 'e': pre['re'], 'f': pre['rf'], 'g': pre['rg'], 'h': pre['rh'], 'i': pre['ri'], 'j': pre['rj'], 'k': pre['rk'], 'l': pre['rl'], 'm': pre['rm']}) +
            slot('process', {'a': pre['pa'], 'b': pre['pb'], 'c': pre['pc'], 'd': pre['pd'], 'e': pre['pe'], 'f': pre['pf'], 'g': pre['pg'], 'h': pre['ph'], 'i': pre['pi'], 'j': pre['pj'], 'k': pre['pk'], 'l': procL(), 'm': pre['pm']}) + slot('try', {'a': pre['qa'], 'b': pre['qb'], 'c': pre['qc'], 'd': pre['qd'], 'e': pre['qe'], 'f': pre['qf'], 'g': pre['qg'], 'h': pre['qh'], 'i': pre['qi'], 'j': pre['qj'], 'k': pre['qk'], 'l': tryL()}) +
            slot('area', {'a': pre['aa'], 'b': pre['ab'], 'c': pre['ac'], 'd': pre['ad'], 'e': pre['ae'], 'f': pre['af'], 'g': pre['ag'], 'h': pre['ah'], 'i': pre['ai'], 'j': pre['aj'], 'k': pre['ak'], 'l': pre['al']}) + slot('book', {'a': pre['ca'], 'b': pre['cb'], 'c': pre['cc'], 'd': pre['cd'], 'e': pre['ce'], 'f': pre['cf'], 'g': pre['cg'], 'h': pre['ch'], 'i': pre['ci'], 'j': pre['cj'], 'k': pre['ck'], 'l': pre['cl']}))
    foot = pre['ft']
    PP_ = pre['PG_']
    pages = ''.join(f'<template data-page="{p}">' + ''.join(slot(x['slot'], {v[0]: PP_[x['slot'] + v[0]] for v in x['v']}) for x in PG['sections'][p]) + '</template>' for p, _ in PG['pages'] if PG['sections'][p])
    boot = BOOT.replace('Nav.wire();', 'PB.wire(document);' + ''.join(x['obj'] + '.wire(document);' for _, x in PSECS) + 'Nav.wire();').replace('%PLAY%', json.dumps(I['play'])).replace('%PAUSE%', json.dumps(I['pause']))
    js = src('photo-hero.js') + src('hero2.js') + src('hero3.js') + src('hero4.js') + src('hero5.js') + src('hero6.js') + src('svck.js') + ''.join(SEC(m + '.js') for m in MODS + PMODS) + src('fx.js') + src('hf.js') + src('bx.js')
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing | Austin, TX since 2009</title>
<meta name="description" content="Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house. Call (512) 550-0000.">
<style>{css}</style></head><body id="top">{HEADER.replace('href="#work"', 'href="#area"')}<main data-page="home">{main}</main>{pages}{foot}{MBAR}{film}
<script>(function(){{var s=new URLSearchParams(location.search).get('bg')||'{BG2_DEFAULT}';window.__BGSEL=s;window.__BGLIST={json.dumps(BG2_LIST)};if(s!=='v1')return;window.__BG={json.dumps(bg_panels())};{src('world.js')}}})()</script>{HEAD_JS}<script>window.__HERO2={json.dumps(hero2_data())};window.__SVCK={json.dumps(SVK[1])};window.__VERSIONS={json.dumps(VERSIONS)};window.__SLOTNAMES={json.dumps(SLOTNAMES)};window.__PAGES={json.dumps([pg for pg in PG['pages'] if PG['sections'][pg[0]]])};window.__SLOTPAGE={json.dumps(SLOTPAGE)};window.__PHOTOS={json.dumps(photos())};window.__REV={json.dumps(REV)};window.__NEAR={json.dumps(NEAR, separators=(',', ':'))};window.__WCOL={json.dumps(WCOL)};window.__JOBS={json.dumps(AREA['cards'])};window.__AREA={{cities:{json.dumps(AREA['cities'])},places:{json.dumps(AREA['places'])}}};{js}{boot}</script>{bg2_html()}</body></html>'''


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    h = build(); open(os.path.join(HERE, 'out', 'site.html'), 'w').write(h); print('site.html', len(h) // 1024, 'KB')
