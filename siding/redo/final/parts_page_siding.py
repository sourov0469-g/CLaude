"""INNER PAGE — Siding (route #/siding). Eight sections; every number is from FACTS.md / the firm's siding + siding-cost pages / svcpairs.json (asserted below at build time).
Interactive pieces are drawn in the browser by src/page_siding.js (window.FPSiding); this file holds the copy, the data attributes and the embedded photos."""
import base64, json, os, re, html
import pagekit as K
NAME = 'siding'
TITLE = 'Siding'
CSS = 'page_siding.css'
JS = 'page_siding.js'
GLOBAL = 'FPSiding'
e = html.escape
DL = os.path.join(K.WORK, 'dl')


def b64(f):
    return 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(DL, f), 'rb').read()).decode()


def plain(f):
    s = open(os.path.join(K.WORK, 'raw', f), encoding='utf-8').read()
    s = re.sub(r'<(script|style)[^>]*>.*?</\1>', '', s, flags=re.S)
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', s)))


BANDS = [('Under $2k', 12), ('$2k–$5k', 33), ('$5k–$10k', 70), ('$10k–$15k', 107), ('$15k–$20k', 92), ('$20k–$25k', 53), ('$25k–$30k', 22), ('$30k–$40k', 19), ('$40k–$50k', 4), ('$50k–$60k', 1), ('$60k–$75k', 2)]
CITIES = [('Austin', 279, '$15k–$20k'), ('Round Rock', 56, '$10k–$15k'), ('Cedar Park', 16, '$10k–$15k'), ('Pflugerville', 14, '$5k–$10k'), ('Leander', 9, '$10k–$15k'), ('Buda', 6, '$15k–$20k')]
EXAMPLES = {'$5k–$10k': 'East Oak Hill, Austin · James Hardie 8.25″ Select Cedar Mill', '$10k–$15k': 'Block House Creek, Leander · James Hardie Select Cedar Mill 8.25″',
            '$15k–$20k': 'Anderson Mill West, Cedar Park · James Hardie 8.25″ Primed Select Cedar Mill', '$20k–$25k': 'Northwest Hills, Austin · James Hardie Select Cedar Mill 8.25″'}
SAME = [('Exterior painting', 72, 297), ('Windows', 33, 136), ('Gutters', 15, 64), ('Shingle roofing', 15, 63)]
SW = [('Pure White', 'SW 7005', '#EDECE6'), ('Alabaster', 'SW 7008', '#EDEAE0'), ('Agreeable Gray', 'SW 7029', '#D1CBC1'), ('Repose Gray', 'SW 7015', '#CCC9C0'), ('Accessible Beige', 'SW 7036', '#D1C7B8'), ('Dovetail', 'SW 7018', '#908A83'),
      ('Gauntlet Gray', 'SW 7019', '#78736E'), ('Urbane Bronze', 'SW 7048', '#54504A'), ('Iron Ore', 'SW 7069', '#434341'), ('Tricorn Black', 'SW 6258', '#2F2F30'), ('In the Navy', 'SW 9178', '#283849'), ('Hunt Club', 'SW 6468', '#2A4F43')]
LEVERS = [('Wall area and stories', 'More square footage and second-story walls mean more material, labor and staging.'), ('What’s under the old siding', 'Rotten sheathing found at tear-off gets replaced before new siding goes on.'),
          ('Whole house or a few walls', 'We re-side by the full wall or the whole house, and price only what you need.'), ('Trim, soffit and fascia', 'Replacing them with the siding adds to the price and gives a cleaner finish.'),
          ('Paint or ColorPlus', 'Sherwin-Williams paint after install, or James Hardie’s factory-baked ColorPlus.'), ('Profile and details', 'Lap or board and batten, plus accent walls, corners and openings.')]
TEXAS = [('Doesn’t warp.', 'UV & heat tough', 'Won’t warp, swell or sag through triple-digit summers.'), ('Doesn’t rot.', 'Moisture resistant', 'Won’t rot, swell or soak up water like wood and hardboard.'),
         ('Doesn’t burn.', 'Fire resistant', 'Noncombustible fiber cement. The board itself won’t burn.'), ('Doesn’t feed termites.', 'Pest resistant', 'Termites and woodpeckers leave fiber cement alone.'),
         ('Lasts for decades.', '30-year warranty', 'Non-prorated from James Hardie when an Elite Preferred contractor installs it.')]


def checks(CP):
    """Build-time proof that the copy below is the published copy."""
    cost = plain('services_siding_cost.html'); sid = plain('services_siding.html'); faq = ' '.join(a for k in K.data('faq.json').values() for _, a in k)
    assert sum(c for _, c in BANDS) == 415 and sum(c for _, c in BANDS[3:4]) == 107
    for b, c in BANDS: assert f'{b} {c} project' in cost, (b, c)
    for c, n, m in CITIES: assert f'{c} {n} projects {m}' in cost, c
    for n, p, x in SAME: assert f'{p}% {n} {x} of 415 siding projects'.lower() in cost.lower(), n
    for ex in EXAMPLES.values(): assert ex.split(' · ')[0].split(',')[0] in cost
    for s in ['301', '286', '36', '27', '8.25', '1,700+', '17 colors for Austin', '1 to 2 weeks including paint', 'We replace by the full wall or the whole house. No patch repairs.', '4 ft', '2.5', '16″ on center', '12 ft', '5/16″', '7″']:
        assert s in sid, s
    assert 'Elite Preferred' in faq and 'lifetime workmanship warranty on labor' in faq and '30-year non-prorated warranty' in faq
    assert len(CP) == 17 and len(SW) == 12
    sp = K.data('svcpairs.json')['siding']; assert [(p['place'], p['when'], p['band']) for p in sp] == [('Milwood, Austin', 'May 2026', '$25k–$30k'), ('Rob Roy, Austin', 'Jul 2026', '$15k–$20k'), ('Maple Run, Austin', 'Jul 2026', '$15k–$20k'), ('North Austin', 'May 2026', '$15k–$20k')]
    return sp


def markup(ctx):
    import parts_vis
    CP = parts_vis.CP
    SP = checks(CP)
    C = K.CONTACT_PAGE; cal = ctx['cal']
    art = lambda f, c, t: K.art(f, c, t)
    bg = lambda a, b, t: f'<div class="ps-bg" aria-hidden="true">{art(a, "ps-far", "psf" + t)}{art(b, "ps-near", "psn" + t)}</div>' if b else f'<div class="ps-bg" aria-hidden="true">{art(a, "ps-far", "psf" + t)}</div>'
    cta = f'<a class="btn key" href="{C}">Book a free inspection<span class="tab">{cal}</span></a><a class="callx ps-call" href="{K.PHONE_HREF}">{ctx["icons"]["phone"]}{K.PHONE}</a>'
    jump = ''.join(f'<li><a href="#{i}"><b>{e(n)}</b><small>{e(d)}</small></a></li>' for i, n, d in [('siding-lap', 'Lap siding', 'HardiePlank 8.25 in boards'), ('siding-board-batten', 'Board and batten', 'Vertical panels and battens'), ('siding-shingle-shake', 'Shingle and shake', 'Gable accents'), ('siding-trim-soffit', 'Trim and soffit', 'Corners, fascia, frieze')])
    texas = ''.join(f'<li class="ps-tx" style="--i:{i}"><svg class="ps-tic" data-ic="{i}" viewBox="0 0 64 64" aria-hidden="true" focusable="false"></svg><b>{e(t)}</b><em>{e(k)}</em><span>{e(d)}</span></li>' for i, (t, k, d) in enumerate(TEXAS))
    bars = ''.join(f'<button type="button" role="radio" class="ps-bar" data-i="{i}" aria-checked="false" tabindex="{0 if i == 3 else -1}" aria-label="{e(b)}: {c} of 415 priced siding jobs{", median band" if i == 3 else ""}"><i class="ps-bv" style="--h:{c / 107 * 100:.1f}%"><u>{c}</u></i><span>{e(b).replace("–", "–<wbr>")}</span></button>' for i, (b, c) in enumerate(BANDS))
    chips = ''.join(f'<button type="button" role="radio" class="ps-chip" data-c="{i}" aria-checked="false" tabindex="-1">{e(n)}</button>' for i, (n, _, _) in enumerate(CITIES))
    same = ''.join(f'<li class="ps-sm" style="--w:{p}%"><span>{e(n)}</span><u><i></i></u><b>{p}%</b><small>{x} of 415 siding projects</small></li>' for n, p, x in SAME)
    lev = ''.join(f'<li class="ps-lv"><svg class="ps-lic" data-l="{i}" viewBox="0 0 48 48" aria-hidden="true" focusable="false"></svg><b>{e(t)}</b><span>{e(d)}</span></li>' for i, (t, d) in enumerate(LEVERS))
    swp = ''.join(f'<li><i style="background:{h}"></i><span>{e(n)}<small>{s}</small></span></li>' for n, s, h in SW)
    cpl = ''.join(f'<li><i style="background:{h}"></i><span>{e(n)}</span></li>' for n, h in CP)
    tabs = ''.join(f'<button type="button" role="tab" class="ps-tab" id="ps-tab{i}" aria-controls="ps-ba" aria-selected="{str(i == 0).lower()}" tabindex="{0 if i == 0 else -1}"><img src="{b64(f"siding{i}a-720.webp")}" alt="" width="72" height="45"><span><b>{e(p["place"].split(",")[0])}</b><small>{e(p["when"])}</small></span></button>' for i, p in enumerate(SP))
    pairs = json.dumps([dict(place=p['place'], when=p['when'], inst=p['installed'].replace('"', '″'), band=p['band'], bl=p['bl'], ba=p['before']['alt'], aa=p['after']['alt'], b=b64(f'siding{i}b-720.webp'), a=b64(f'siding{i}a-720.webp')) for i, p in enumerate(SP)])
    cred = ''.join(f'<img src="{b64(f)}" alt="{e(a)}" width="86" height="86" loading="lazy">' for f, a in [('cred-hardie-elite-preferred.webp', 'James Hardie Elite Preferred'), ('cred-hardie-presidents-club-2025.webp', 'James Hardie President’s Club Award 2025')])
    dimb = ''.join(f'<button type="button" role="radio" class="ps-dm-b" data-d="{d}" aria-checked="{str(d == "board").lower()}" tabindex="{0 if d == "board" else -1}"><b>{v}</b><small>{n}</small></button>' for d, v, n in [('board', '8.25 in', 'Board'), ('exposure', '7 in', 'Exposure'), ('length', '12 ft', 'Length'), ('thick', '5/16 in', 'Thickness')])
    return f'''
<section class="ps-s ps-open" id="siding-top" aria-labelledby="ps-h1">{bg('services-far.svg', 'services-near.svg', 'a')}
<div class="ps-in ps-og"><div class="ps-copy">
<p class="ps-kick">James Hardie Elite Preferred · since 2009</p>
<h1 class="ps-h1" id="ps-h1">Every priced siding job is <em>James Hardie.</em></h1>
<p class="ps-lead">All 415 of our priced siding jobs are James Hardie fiber cement, installed and painted by an Elite Preferred contractor.</p>
<p class="ps-policy">We replace by the full wall or the whole house. No patch repairs.</p>
<div class="ps-cta">{cta}</div>
<ul class="ps-facts"><li><b>431</b> documented siding jobs</li><li><b>415</b> priced · median band <b>$10k–$15k</b></li><li><b>30-year</b> James Hardie non-prorated warranty</li><li><b>Lifetime</b> workmanship warranty on labor</li><li><b>1 to 2 weeks</b> including paint</li></ul>
<nav class="ps-jump" aria-label="On this page"><p>On this page</p><ul>{jump}</ul></nav></div>
<figure class="ps-wallfig"><svg class="ps-hang" id="ps-hang" viewBox="0 0 480 440" role="img" aria-label="A wall being hung with lap siding, course by course, from the bottom up, around a window."></svg>
<button type="button" class="ps-replay" id="ps-replay"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 3-6.2M4 4v4h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>Hang it again</button>
<figcaption>Illustration: HardiePlank lap, 8.25 in board, 7 in showing, hung from the bottom up.</figcaption></figure></div></section>

<section class="ps-s ps-lap" id="siding-lap" aria-labelledby="ps-lap-h">{bg('try-far.svg', 'try-near.svg', 'b')}
<div class="ps-in"><header class="ps-hd"><p class="ps-kick">Lap siding · our house standard</p><h2 class="ps-h2" id="ps-lap-h">Lap siding: HardiePlank 8.25 in boards</h2>
<p class="ps-sub">Overlapping horizontal boards: the classic wood look, in fiber cement made to resist rot, swelling and pests. 301 of our 415 priced jobs used the 8.25 in board.</p></header>
<div class="ps-lapg"><div class="ps-card ps-stage ps-lapst"><svg class="ps-lapsvg" id="ps-lapsvg" viewBox="0 0 300 520" role="img" aria-label="Lap siding drawn to scale: a cut through three boards, with the board width, the exposure and the thickness measured."></svg><svg class="ps-lapsvg" id="ps-lapel" viewBox="268 0 480 520" role="img" aria-label="A 12 ft wall of lap siding courses, 7 inches each, that you can hang with the slider."></svg></div>
<div class="ps-ctl"><h3 class="ps-h3">Measure the board</h3><div class="ps-seg4" role="radiogroup" aria-label="Which measurement">{dimb}</div>
<p class="ps-read" id="ps-dimread" aria-live="polite"></p>
<h3 class="ps-h3">Hang the courses</h3><label class="ps-rng"><span>Courses hung <output id="ps-ncour">20</output></span><input type="range" id="ps-course" min="0" max="20" value="20" aria-describedby="ps-courseh"></label>
<p class="ps-note" id="ps-courseh">Each course shows 7 in of board. Drag, or use the arrow keys.</p>
<h3 class="ps-h3">Choose the face</h3><div class="ps-seg2" role="radiogroup" aria-label="Texture"><button type="button" role="radio" class="ps-tx-b" data-t="cedar" aria-checked="true" tabindex="0"><b>Select Cedarmill</b><small>286 of 415 jobs</small></button><button type="button" role="radio" class="ps-tx-b" data-t="smooth" aria-checked="false" tabindex="-1"><b>Smooth</b><small>36 of 415 jobs</small></button></div>
<p class="ps-note">Cedarmill is a cedar wood grain pressed into the face of every board, our default. Smooth is a flat, even face for a crisp, modern line. Also made 5.25 in, 6.25 in and 7.25 in wide.</p></div></div>
<div class="ps-card ps-dotc"><div class="ps-dothd"><h3 class="ps-h3">What our 415 priced jobs chose</h3><div class="ps-chips" role="radiogroup" aria-label="Which choice to light up">
<button type="button" role="radio" class="ps-dc" data-k="lap" aria-checked="true" tabindex="0">8.25 in lap</button><button type="button" role="radio" class="ps-dc" data-k="bb" aria-checked="false" tabindex="-1">Board and batten</button><button type="button" role="radio" class="ps-dc" data-k="cedar" aria-checked="false" tabindex="-1">Select Cedarmill</button><button type="button" role="radio" class="ps-dc" data-k="smooth" aria-checked="false" tabindex="-1">Smooth</button></div></div>
<div class="ps-dotrow"><p class="ps-dotn" aria-live="polite"><b id="ps-dotb">301</b><span id="ps-dots-t">of 415 priced jobs used the 8.25 in board</span></p><div class="ps-dots" id="ps-dots" aria-hidden="true"></div></div>
<p class="ps-note">Each dot is one priced job, not a particular job. Counts: the product named in each of our 415 priced siding job files, 2022–2026. A line naming both textures counts as neither.</p></div></div></section>

<section class="ps-s ps-bb" id="siding-board-batten" aria-labelledby="ps-bb-h">{bg('visualiser-far.svg', None, 'c')}
<div class="ps-in"><header class="ps-hd"><p class="ps-kick">Board and batten · the modern farmhouse look</p><h2 class="ps-h2" id="ps-bb-h">Board and batten: vertical panels and battens</h2>
<p class="ps-sub">Four-foot HardiePanel sheets hung vertically, with 2.5-inch HardieTrim battens fastened over them: tall, clean lines. 27 of our 415 priced jobs went board and batten.</p></header>
<div class="ps-bbg"><div class="ps-card ps-stage"><svg class="ps-bbsvg" id="ps-bbsvg" viewBox="0 0 560 450" role="img" aria-label="A wall of three 4 ft HardiePanel sheets, hung vertically, with 2.5 inch battens over them 16 inches on center."></svg></div>
<div class="ps-ctl"><h3 class="ps-h3">Build the wall</h3><div class="ps-seg3" role="radiogroup" aria-label="Build step"><button type="button" role="radio" class="ps-st" data-s="0" aria-checked="false" tabindex="-1"><b>0</b>Bare wall</button><button type="button" role="radio" class="ps-st" data-s="1" aria-checked="false" tabindex="-1"><b>1</b>Hang the panels</button><button type="button" role="radio" class="ps-st" data-s="2" aria-checked="true" tabindex="0"><b>2</b>Fasten the battens</button></div>
<h3 class="ps-h3">Panel height</h3><div class="ps-seg2" role="radiogroup" aria-label="Panel height"><button type="button" role="radio" class="ps-ht" data-h="8" aria-checked="true" tabindex="0"><b>8 ft</b><small>panel</small></button><button type="button" role="radio" class="ps-ht" data-h="10" aria-checked="false" tabindex="-1"><b>10 ft</b><small>panel</small></button></div>
<p class="ps-note">Panels 8 or 10 ft tall. Texture: Cedarmill or smooth (it follows the face you chose above). Spacing as our board and batten job files record it.</p>
<ul class="ps-spec"><li><b>Panel</b>4 ft wide</li><li><b>Batten</b>2.5 in wide</li><li><b>Spacing</b>16 in on center</li></ul>
<svg class="ps-plan" id="ps-plan" viewBox="0 0 300 96" role="img" aria-label="Plan view, to scale: a 4 ft panel with battens 2.5 in wide at 16 in on center."></svg></div></div>

<div class="ps-sub2" id="siding-shingle-shake" tabindex="-1"><div class="ps-card ps-gcard"><div class="ps-gtext"><p class="ps-kick">Shingle and shake · gable accents</p><h3 class="ps-h2 ps-h2s">Shingle and shake: gable accents</h3>
<p class="ps-sub">Accent walls, corners and gables are part of the “profile and details” that move a siding price. Our own page says most jobs are lap, “with board and batten as an accent”.</p>
<div class="ps-seg3 ps-gseg" role="radiogroup" aria-label="Gable accent"><button type="button" role="radio" class="ps-gb" data-g="lap" aria-checked="true" tabindex="0">Lap throughout</button><button type="button" role="radio" class="ps-gb" data-g="bb" aria-checked="false" tabindex="-1">Board and batten gable</button><button type="button" role="radio" class="ps-gb" data-g="shake" aria-checked="false" tabindex="-1">Shingle or shake</button></div>
<p class="ps-read" id="ps-gread" aria-live="polite"></p></div>
<svg class="ps-gsvg" id="ps-gsvg" viewBox="0 0 340 270" role="img" aria-label="The gable end of a house in lap siding, with the triangle of the gable changeable."></svg></div></div></div></section>

<section class="ps-s ps-trim" id="siding-trim-soffit" aria-labelledby="ps-trim-h">{bg('services-far.svg', None, 'd')}
<div class="ps-in"><header class="ps-hd"><p class="ps-kick">The edges where siding meets roof</p><h2 class="ps-h2" id="ps-trim-h">Trim and soffit: corners, fascia, frieze</h2>
<p class="ps-sub">We replace soffit and fascia, which protect your roof’s edges and your home’s ventilation, usually in the same job as the siding.</p></header>
<div class="ps-trg"><div class="ps-card ps-stage"><svg class="ps-trsvg" id="ps-trsvg" viewBox="0 0 640 430" role="img" aria-label="A cut through the eave of a house: wall with siding, soffit under the overhang, fascia at the roof edge and trim."></svg><p class="ps-note ps-cap">A schematic cut through the eave: roof above, the outside to the right. The green arrows are air for your home’s ventilation. The corner is a plan view.</p></div>
<div class="ps-ctl"><h3 class="ps-h3">How far does the job go?</h3><div class="ps-seg2" role="radiogroup" aria-label="Scope"><button type="button" role="radio" class="ps-sc" data-m="full" aria-checked="true" tabindex="0"><b>Full wrap</b><small>trim, soffit, fascia</small></button><button type="button" role="radio" class="ps-sc" data-m="faces" aria-checked="false" tabindex="-1"><b>Siding faces only</b><small>edges left alone</small></button></div>
<h3 class="ps-h3">Look at one part</h3><div class="ps-parts" role="radiogroup" aria-label="Part"><button type="button" role="radio" class="ps-pt" data-p="siding" aria-checked="false" tabindex="-1">Siding faces</button><button type="button" role="radio" class="ps-pt" data-p="soffit" aria-checked="true" tabindex="0">Soffit</button><button type="button" role="radio" class="ps-pt" data-p="fascia" aria-checked="false" tabindex="-1">Fascia</button><button type="button" role="radio" class="ps-pt" data-p="trim" aria-checked="false" tabindex="-1">Corners, trim and frieze</button></div>
<p class="ps-read ps-readbig" id="ps-trread" aria-live="polite"></p>
<p class="ps-note">Full wrap versus siding faces only is one of the things that moves a siding price: “replacing them with the siding adds to the price and gives a cleaner finish.” We confirm scope and price at the free inspection.</p></div></div></div></section>

<section class="ps-s ps-lay" id="siding-wall" aria-labelledby="ps-lay-h">{bg('process-far.svg', 'process-near.svg', 'e')}
<div class="ps-in"><header class="ps-hd"><p class="ps-kick">How a wall goes back together</p><h2 class="ps-h2" id="ps-lay-h">The wall, layer by layer</h2>
<p class="ps-sub">Whole-house re-sides: tear-off, sheathing fixes where they’re needed, house wrap, siding, trim and paint. Step through it. Typical replacement: 1 to 2 weeks, including paint.</p></header>
<div class="ps-layg"><div class="ps-card ps-stage ps-laystage"><svg class="ps-laysvg" id="ps-laysvg" viewBox="0 0 560 440" role="img" aria-label="A wall drawn as stacked layers that you step through: sheathing, house wrap, boards, trim and paint."></svg>
<div class="ps-prog" aria-hidden="true"><i id="ps-prog"></i></div></div>
<div class="ps-laytx"><ol class="ps-steps" id="ps-steps" role="radiogroup" aria-label="Layers, back to front"></ol>
<div class="ps-card ps-stepc" aria-live="polite"><p class="ps-stepk" id="ps-stk"></p><h3 class="ps-h3 ps-steph" id="ps-sth"></h3><p id="ps-stp"></p><div id="ps-stx"></div></div>
<div class="ps-nav"><button type="button" class="btn light ps-prev" id="ps-prev">Back</button><button type="button" class="btn key ps-next" id="ps-next">Next layer</button></div></div></div>
<template id="ps-fintpl"><div class="ps-fin"><div class="ps-tabs2" role="tablist" aria-label="Finish"><button type="button" role="tab" class="ps-ft" data-f="paint" aria-selected="true" tabindex="0">Painted on site</button><button type="button" role="tab" class="ps-ft" data-f="cplus" aria-selected="false" tabindex="-1">ColorPlus</button></div>
<div class="ps-fp" data-f="paint"><p>Our usual finish: primed boards, painted after they go up in any of <b>1,700+ Sherwin-Williams colors</b>, with free color matching. A sample of the 1,700+:</p><ul class="ps-sws">{swp}</ul></div>
<div class="ps-fp" data-f="cplus" hidden><p><b>ColorPlus Technology</b>: color baked on at the James Hardie plant, so the boards arrive finished. <b>17 colors for Austin</b>, with Arctic White trim. ColorPlus finish 15+ yrs.</p><ul class="ps-sws">{cpl}</ul></div></div></template></div></section>

<section class="ps-s ps-cost" id="siding-cost" aria-labelledby="ps-cost-h">{bg('visualiser-near.svg', None, 'f')}
<div class="ps-in"><header class="ps-hd"><p class="ps-kick">Real project pricing · 415 priced jobs, 2022–2026</p><h2 class="ps-h2" id="ps-cost-h">Where 415 real siding jobs landed</h2>
<p class="ps-sub">Invoiced prices, not estimates and not an industry average. Each bar is the siding portion of a job: materials and labor, before discounts, excluding tax. A documented sample of our work, not every job since 2009. 31 Central Texas cities.</p></header>
<div class="ps-card ps-chart"><div class="ps-chtop"><div class="ps-rd" aria-live="polite"><p class="ps-rdk" id="ps-rdk">Median band</p><p class="ps-rdn"><b id="ps-rdb">$10k–$15k</b></p><p class="ps-rdc"><b id="ps-rdc">107</b> of 415 priced jobs</p><p class="ps-rdx" id="ps-rdx"></p></div>
<div class="ps-cities"><p class="ps-note">Median band by city (priced jobs)</p><div class="ps-chips" role="radiogroup" aria-label="City">{chips}</div><p class="ps-rdcity" id="ps-rdcity" aria-live="polite"></p></div></div>
<div class="ps-chwrap" data-cur="drag"><div class="ps-mid" aria-hidden="true"><span>Middle half of jobs: $5k–$20k</span></div><div class="ps-bars" id="ps-bars" role="radiogroup" aria-label="Price band, with the number of priced jobs">{bars}</div></div>
<p class="ps-note ps-midm">Shaded rows: the middle half of jobs, $5k–$20k.</p><p class="ps-note">Median band $10k–$15k, also the most common. The middle half of the 415 landed between $5k and $20k. Move across the bars with the pointer, or use the arrow keys.</p></div>
<div class="ps-two"><div class="ps-card ps-card2"><h3 class="ps-h3">Done in the same job</h3><p class="ps-note">Of the 415 priced siding jobs, how often another trade ran on the same job.</p><ul class="ps-same">{same}</ul></div>
<div class="ps-card ps-card2"><h3 class="ps-h3">Six things that move the price</h3><ol class="ps-levers">{lev}</ol></div></div></div></section>

<section class="ps-s ps-ba" id="siding-before-after" aria-labelledby="ps-ba-h">{bg('reviews-far.svg', None, 'g')}
<div class="ps-in"><header class="ps-hd"><p class="ps-kick">Before and after · four of our jobs</p><h2 class="ps-h2" id="ps-ba-h">Same houses, before and after</h2>
<p class="ps-sub">Drag across the photo. Every pair is one of our jobs, shot before we started and after we finished. The price is the siding portion, as published for each job.</p></header>
<div class="ps-bag"><div class="ps-tabs" role="tablist" aria-label="Choose a job">{tabs}</div>
<figure class="ps-bafig"><div class="ps-bastage" id="ps-ba" role="tabpanel" data-cur="drag" data-p='{e(pairs, quote=True)}'><img class="ps-im ps-after" alt="" width="720" height="450"><div class="ps-bef"><img class="ps-im" alt="" width="720" height="450"></div><span class="ps-lb ps-lbb">Before</span><span class="ps-lb ps-lba">After</span>
<div class="ps-hnd" id="ps-hnd" role="slider" tabindex="0" aria-label="Before and after, drag to compare" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><i></i></div></div>
<figcaption class="ps-bacap"><p class="ps-bat"><b id="ps-bap"></b><span id="ps-bai"></span></p><p class="ps-bab"><small id="ps-babl"></small><b id="ps-bab"></b></p></figcaption></figure></div></div></section>

<section class="ps-s ps-close" id="siding-close" aria-labelledby="ps-cl-h">{bg('services-near.svg', None, 'h')}
<div class="ps-in"><header class="ps-hd"><p class="ps-kick">Built for Texas sun, heat and hail</p><h2 class="ps-h2" id="ps-cl-h">Your roof gets the rain. Your siding gets everything else.</h2>
<p class="ps-sub">UV, triple-digit heat off the walls, spring hail and humidity behind failed caulk. Flashed, sealed and gapped right by an Elite Preferred contractor, James Hardie lasts for decades.</p></header>
<ul class="ps-five">{texas}</ul>
<div class="ps-war"><div class="ps-card ps-wc"><b class="ps-wn">30-year</b><span>James Hardie non-prorated siding warranty, when an Elite Preferred contractor installs it.</span></div><div class="ps-card ps-wc"><b class="ps-wn">Lifetime</b><span>Austin Pro workmanship warranty on labor.</span></div><div class="ps-card ps-wc ps-wcr"><div class="ps-cred">{cred}</div><span>Elite Preferred, the top tier of the James Hardie contractor alliance: it can’t be bought, James Hardie audits it, and it has to be re-earned.</span></div></div>
<div class="ps-end"><p class="ps-policy ps-endp">We replace by the full wall or the whole house. No patch repairs.</p><p class="ps-sub">The inspection and estimate are free. A project manager walks every side of the house: siding, trim, windows, roof and gutters.</p><div class="ps-cta">{cta}</div></div></div></section>
'''
