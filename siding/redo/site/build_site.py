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
MODS = ['scenes', 'services', 'svc2', 'svc3', 'svc4', 'svc5', 'vis', 'vis2', 'vis3', 'vis4', 'vis5', 'vis6', 'windows', 'win2', 'win3', 'win4', 'win5', 'win6', 'reviews', 'rev2', 'rev3', 'rev4', 'rev5', 'rev6', 'process', 'proc2', 'proc3', 'proc4', 'proc5', 'proc6', 'seq', 'seq2', 'seq3', 'seq4', 'seq5', 'seq6', 'area', 'area2', 'area3', 'area4', 'area5', 'area6', 'cta', 'cta2', 'cta3', 'cta4', 'cta5', 'p_base', 'nav']
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
            ';for(const p of [...Rev.PICK,...Proc.QUOTES,...Rev2.PICK,...Svc3.Q,...Win5.Q,...Rev4.LINES]){if(!__REV[p[0]].text.includes(p[1]))throw new Error("not verbatim: "+p[1]);}'
            ';process.stdout.write(JSON.stringify({' + pgk + 'sa:Services.A(),sb:Services.B(),sc:Svc2.C(),sd:Svc2.D(),se:Svc3.E(),sf:Svc3.F(),sg:Svc4.G(),sh:Svc4.H(),si:Svc5.I(),sj:Svc5.J(),va:Vis.A(),vb:Vis.B(),vc:Vis2.C(),vd:Vis2.D(),ve:Vis3.E(),vf:Vis3.F(),vg:Vis4.G(),vh:Vis4.H(),vi:Vis5.I(),vj:Vis5.J(),vk:Vis6.K(),wa:Win.A(),wb:Win.B(),wc:Win2.C(),wd:Win2.D(),we:Win3.E(),wf:Win3.F(),wg:Win4.G(),wh:Win4.H(),wi:Win5.I(),wj:Win5.J(),wk:Win6.K(),ra:Rev.A(),rb:Rev.B(),rc:Rev2.C(),rd:Rev2.D(),re:Rev3.E(),rf:Rev3.F(),rg:Rev4.G(),rh:Rev4.H(),pa:Proc.A(),pb:Proc.B(),pc:Proc2.C(),pd:Proc2.D(),aa:Area.A(),ab:Area.B(),ac:Area2.C(),ad:Area2.D(),qa:Seq.A(),qb:Seq.B(),qc:Seq2.C(),qd:Seq2.D(),ca:Cta.A(),cb:Cta.B(),cc:Cta2.C(),cd:Cta2.D(),ft:Cta.FOOT(),ri:Rev5.I(),rj:Rev5.J(),rk:Rev6.K(),pe:Proc3.E(),pf:Proc3.F(),pg:Proc4.G(),ph:Proc4.H(),pi:Proc5.I(),pj:Proc5.J(),pk:Proc6.K(),qe:Seq3.E(),qf:Seq3.F(),qg:Seq4.G(),qh:Seq4.H(),qi:Seq5.I(),qj:Seq5.J(),qk:Seq6.K(),ae:Area3.E(),af:Area3.F(),ag:Area4.G(),ah:Area4.H(),ai:Area5.I(),aj:Area5.J(),ak:Area6.K(),ce:Cta3.E(),cf:Cta3.F(),cg:Cta4.G(),ch:Cta4.H(),ci:Cta5.I(),cj:Cta5.J()}))')
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
    return {'1': v1, **new_heroes(), **heroes3(), 'k': heroK(), 'a2': v2, 'a3': v3, 'a4': v4, 'a5': v5}


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


def bg_panels():
    # the hidden world: three baked relief panels (bg/relief.py), each as two WebPs (levels 1-3; levels 4-5 + plaster grain)
    import base64 as _b
    f = lambda n, ab: 'data:image/webp;base64,' + _b.b64encode(open(os.path.join(HERE, 'media', 'bg', f'p{n}{ab}.webp'), 'rb').read()).decode()
    return [{'a': f(n, 'a'), 'b': f(n, 'b')} for n in (1, 2, 3)]


VERSIONS = {
    'hero': [['1', 'Charcoal photo, boards lift (backup, rejected photo)'], ['2', 'Depth window'], ['3', 'Pinned dusk portrait'], ['4', 'Title between sky and house'],
             ['5', 'Photo hung as lap courses'], ['6', 'Three-house deck'], ['7', 'The record'], ['8', 'Last light'], ['9', 'Type as the house'], ['10', 'One visit'], ['k', 'Before | After, on the seam'], ['a2', 'Archive: white-lap photo'], ['a3', 'Archive: film full bleed'], ['a4', 'Archive: film in a window'], ['a5', 'Archive: film strip']],
    'services': [['a', 'Sideways sequence'], ['b', 'Word switcher'], ['c', 'Counted chapters'], ['d', 'Split cover, real jobs'], ['e', 'Pick a part of the house'], ['f', 'The magazine spread'], ['g', 'Side by side'], ['h', 'Pull a board'], ['i', 'Three rings, one visit'], ['j', 'The index'], ['k', 'Run the reel']], 'vis': [['a', 'Swatch fan'], ['b', 'Snap-together wall'], ['c', 'Colour fields, compare'], ['d', 'The instrument'], ['e', 'Pairings to start from'], ['f', 'The colour map'], ['g', 'Four questions'], ['h', 'Colour in Austin light'], ['i', 'Look closer'], ['j', 'Your house, on the street'], ['k', 'Open a colour']],
    'windows': [['a', 'Morning to midnight'], ['b', 'Bay, built out'], ['c', 'Taken apart, pinned'], ['d', 'Window jobs on record'], ['e', '376 jobs, by maker'], ['f', 'How each window opens'], ['g', 'Frame colours, by maker'], ['h', 'Count your windows'], ['i', 'A window of words'], ['j', 'From opening to trim'], ['k', '376 jobs, set in type']], 'reviews': [['a', '4.9 in lap courses'], ['b', 'Hanging tags'], ['c', 'Read at reading pace'], ['d', 'Ask the neighbours'], ['e', 'The names they mention'], ['f', 'All 30, searchable'], ['g', 'A steady stream'], ['h', 'Letters from homeowners'], ['i', 'One line, poster size'], ['j', '474, and the 30 we show'], ['k', 'Marked up by hand']],
    'process': [['a', 'Stacked chapters'], ['b', 'Pinned wall'], ['c', 'The plumb line'], ['d', 'Four columns'], ['e', 'Turn the dial'], ['f', 'Questions at each step'], ['g', 'Stamp the card'], ['h', 'One paragraph'], ['i', 'Your part, and ours'], ['j', 'Four numbers'], ['k', 'Handed along']], 'try': [['a', 'Pinned sideways'], ['b', 'Swipe rail'], ['c', 'The workbench'], ['d', 'The dive (Lusion idea)'], ['e', 'Inspect at dusk'], ['f', 'Measure the opening'], ['g', 'Shingle from the eave up'], ['h', 'Level the window'], ['i', 'Nail it on the studs'], ['j', 'Name the parts'], ['k', 'Flash the window']],
    'area': [['a', 'Thread board'], ['b', 'Street finder'], ['c', 'Drive round our jobs'], ['d', 'Every town, ranked'], ['e', 'Is your street on our books?'], ['f', 'The job board'], ['g', 'The streets we know'], ['h', 'Town by trade'], ['i', 'Miles from our door'], ['j', 'Year by year'], ['k', 'Month by month']], 'book': [['a', 'Work order'], ['b', 'Press the board'], ['c', 'The record, then the call'], ['d', 'One number'], ['e', 'The week, at a glance'], ['f', 'Come by the office'], ['g', 'Three ways in'], ['h', 'Write us a postcard'], ['i', 'Day and night'], ['j', 'The receipt']]}
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
Hero2.wire();Hero3.wire();Hero4.wire();SvcK.wire();
document.querySelectorAll('.slot video[data-film]').forEach(v=>{v.append(document.getElementById('film').content.cloneNode(true));
  v.poster=document.getElementById('film').dataset.poster;v.preload='auto';if(!RM){v.autoplay=true;v.load();v.play().catch(()=>{});}else v.load();});
const PLAY=%PLAY%,PAUSE=%PAUSE%;
document.querySelectorAll('.slot .pp').forEach(b=>{const v=b.closest('.hero').querySelector('video');if(!v)return;
  const sync=()=>{const p=v.paused;b.innerHTML=p?PLAY:PAUSE;b.setAttribute('aria-label',p?'Play the film':'Pause the film');b.setAttribute('aria-pressed',p);};
  if(RM)sync();b.addEventListener('click',()=>{v.paused?v.play():v.pause();setTimeout(sync,0);});v.addEventListener('pause',sync);v.addEventListener('play',sync);});
Scenes.wire(document);Services.wire(document);Svc2.wire(document);Svc3.wire(document);Svc4.wire(document);Svc5.wire(document);Vis.wire(document);Vis2.wire(document);Vis3.wire(document);Vis4.wire(document);Vis5.wire(document);Vis6.wire(document);Win.wire(document);Win2.wire(document);Win3.wire(document);Win4.wire(document);Win5.wire(document);Win6.wire(document);Rev.wire(document);Rev2.wire(document);Rev3.wire(document);Rev4.wire(document);Proc.wire(document);Proc2.wire(document);Seq.wire(document);Seq2.wire(document);Area.wire(document);Area2.wire(document);Cta.wire(document);Cta2.wire(document);Rev5.wire(document);Rev6.wire(document);Proc3.wire(document);Proc4.wire(document);Proc5.wire(document);Proc6.wire(document);Seq3.wire(document);Seq4.wire(document);Seq5.wire(document);Seq6.wire(document);Area3.wire(document);Area4.wire(document);Area5.wire(document);Area6.wire(document);Cta3.wire(document);Cta4.wire(document);Cta5.wire(document);Nav.wire();
})();'''


def build():
    pre = prerender()
    css = fonts() + src('frame.css') + src('heroes.css') + ''.join(SEC(f + '.css') for f in MODS + PMODS)
    css += src('hero2.css') + src('hero3.css') + src('hero4.css') + src('svck.css') + src('fx.css') + src('hf.css') + '.slot{display:contents}'
    css = css.replace('244,242,236', '255,255,255')
    film = (f'<template id="film" data-poster="{jpeg(os.path.join(HERE, "media", "f1.jpg"), 480, 70)}">'
            f'<source type="video/webm" src="data:video/webm;base64,{b64(os.path.join(HERE, "media", "hero-1280.webm"))}">'
            f'<source type="video/mp4" src="data:video/mp4;base64,{b64(os.path.join(HERE, "media", "hero-1280.mp4"))}"></template>')
    main = (slot('hero', heroes()) + slot('services', {'a': pre['sa'], 'b': pre['sb'], 'c': pre['sc'], 'd': pre['sd'], 'e': pre['se'], 'f': pre['sf'], 'g': pre['sg'], 'h': pre['sh'], 'i': pre['si'], 'j': pre['sj'], 'k': SVK[0]}) + slot('vis', {'a': pre['va'], 'b': pre['vb'], 'c': pre['vc'], 'd': pre['vd'], 'e': pre['ve'], 'f': pre['vf'], 'g': pre['vg'], 'h': pre['vh'], 'i': pre['vi'], 'j': pre['vj'], 'k': pre['vk']}) +
            slot('windows', {'a': pre['wa'], 'b': pre['wb'], 'c': pre['wc'], 'd': pre['wd'], 'e': pre['we'], 'f': pre['wf'], 'g': pre['wg'], 'h': pre['wh'], 'i': pre['wi'], 'j': pre['wj'], 'k': pre['wk']}) + slot('reviews', {'a': pre['ra'], 'b': pre['rb'], 'c': pre['rc'], 'd': pre['rd'], 'e': pre['re'], 'f': pre['rf'], 'g': pre['rg'], 'h': pre['rh'], 'i': pre['ri'], 'j': pre['rj'], 'k': pre['rk']}) +
            slot('process', {'a': pre['pa'], 'b': pre['pb'], 'c': pre['pc'], 'd': pre['pd'], 'e': pre['pe'], 'f': pre['pf'], 'g': pre['pg'], 'h': pre['ph'], 'i': pre['pi'], 'j': pre['pj'], 'k': pre['pk']}) + slot('try', {'a': pre['qa'], 'b': pre['qb'], 'c': pre['qc'], 'd': pre['qd'], 'e': pre['qe'], 'f': pre['qf'], 'g': pre['qg'], 'h': pre['qh'], 'i': pre['qi'], 'j': pre['qj'], 'k': pre['qk']}) +
            slot('area', {'a': pre['aa'], 'b': pre['ab'], 'c': pre['ac'], 'd': pre['ad'], 'e': pre['ae'], 'f': pre['af'], 'g': pre['ag'], 'h': pre['ah'], 'i': pre['ai'], 'j': pre['aj'], 'k': pre['ak']}) + slot('book', {'a': pre['ca'], 'b': pre['cb'], 'c': pre['cc'], 'd': pre['cd'], 'e': pre['ce'], 'f': pre['cf'], 'g': pre['cg'], 'h': pre['ch'], 'i': pre['ci'], 'j': pre['cj']}))
    foot = pre['ft']
    PP_ = pre['PG_']
    pages = ''.join(f'<template data-page="{p}">' + ''.join(slot(x['slot'], {v[0]: PP_[x['slot'] + v[0]] for v in x['v']}) for x in PG['sections'][p]) + '</template>' for p, _ in PG['pages'] if PG['sections'][p])
    boot = BOOT.replace('Nav.wire();', 'PB.wire(document);' + ''.join(x['obj'] + '.wire(document);' for _, x in PSECS) + 'Nav.wire();').replace('%PLAY%', json.dumps(I['play'])).replace('%PAUSE%', json.dumps(I['pause']))
    js = src('photo-hero.js') + src('hero2.js') + src('hero3.js') + src('hero4.js') + src('svck.js') + ''.join(SEC(m + '.js') for m in MODS + PMODS) + src('fx.js') + src('hf.js')
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>Austin Pro Siding, Windows &amp; Roofing | Austin, TX since 2009</title>
<meta name="description" content="Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house. Call (512) 550-0000.">
<style>{css}</style></head><body id="top">{HEADER.replace('href="#work"', 'href="#area"')}<main data-page="home">{main}</main>{pages}{foot}{MBAR}{film}
<script>window.__BG={json.dumps(bg_panels())};{src('world.js')}</script>{HEAD_JS}<script>window.__HERO2={json.dumps(hero2_data())};window.__SVCK={json.dumps(SVK[1])};window.__VERSIONS={json.dumps(VERSIONS)};window.__SLOTNAMES={json.dumps(SLOTNAMES)};window.__PAGES={json.dumps([pg for pg in PG['pages'] if PG['sections'][pg[0]]])};window.__SLOTPAGE={json.dumps(SLOTPAGE)};window.__PHOTOS={json.dumps(photos())};window.__REV={json.dumps(REV)};window.__NEAR={json.dumps(NEAR, separators=(',', ':'))};window.__WCOL={json.dumps(WCOL)};window.__JOBS={json.dumps(AREA['cards'])};window.__AREA={{cities:{json.dumps(AREA['cities'])},places:{json.dumps(AREA['places'])}}};{js}{boot}</script></body></html>'''


if __name__ == '__main__':
    os.makedirs(os.path.join(HERE, 'out'), exist_ok=True)
    h = build(); open(os.path.join(HERE, 'out', 'site.html'), 'w').write(h); print('site.html', len(h) // 1024, 'KB')
