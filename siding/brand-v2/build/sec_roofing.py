"""Roofing, gutters & patio covers page: six sections, two versions each. Drawings only: the firm's photo set has no
roofing or patio-cover jobs, so no photo stands in for one."""
from shell import TEL, PHONE, CREDS, esc, icon, cline, ill
from sec_windows import close

GAF = CREDS[0]


def _roof(cls, pinned=False):
    """a roof in section along a 22-degree slope, thickness exaggerated: deck, underlayment, starter strip, shingle
    courses as tapered wedges each lapping the one below (the mark's lap, on a roof), and the ridge cap"""
    sh = ''.join(f'<path class="rf-p" data-k="{3 + i}" d="M{90 + i * 78} 318L{250 + i * 78} 334V340H{90 + i * 78}Z" fill="var(--steel-9)" stroke="var(--steel-4)" stroke-width="2.5" stroke-linejoin="miter"/>' for i in range(7))
    lab = [(0, 'DECK', 120, 396, 372), (1, 'UNDERLAYMENT', 330, 396, 346), (2, 'STARTER', 60, 290, 328), (5, 'SHINGLE COURSES', 420, 270, 322), (11, 'RIDGE CAP', 600, 262, 304)]
    labels = ''.join(f'<g class="rf-p" data-k="{k}"><path d="M{x} {ly}V{y}" stroke="var(--steel-6)" stroke-width="1.5"/><text class="rf-t" x="{x}" y="{ly + (16 if ly > y else -8)}">{t}</text></g>' for k, t, x, ly, y in lab)
    return (f'<svg class="rf {cls}" viewBox="0 -10 940 470" role="img" aria-label="A roof drawn in section: deck, underlayment, starter strip, shingle courses each lapping the one below, and the ridge cap">'
            f'<g transform="rotate(-22 60 360)"><rect class="rf-p" data-k="0" x="40" y="346" width="760" height="40" fill="var(--steel-11)" stroke="var(--steel-7)" stroke-width="2"/>'
            f'<path class="rf-p" data-k="1" d="M40 342H800" stroke="var(--steel-6)" stroke-width="6" stroke-dasharray="14 8"/>'
            f'<path class="rf-p" data-k="2" d="M40 326H110V340H40Z" fill="var(--steel-7)"/>{sh}'
            f'<path class="rf-p" data-k="11" d="M690 300L800 300V340H690Z" fill="var(--steel-6)" stroke="var(--steel-4)" stroke-width="2.5"/>{labels}</g></svg>')



_roof_raw = _roof


def _roof(*a, **k):
    return ill(_roof_raw(*a, **k))

def r1():
    v1 = (f'<div class="rh1 on-dark sec-pad"><div class="wrap"><p class="label on-dark-l">Roofing, gutters &amp; patio covers</p><h1 class="h1 on-dark-h">From the deck up.</h1>{cline("var(--color-accent-line-on-dark)")}'
          f'<p class="lead on-dark-p">Shingle and metal roofing, gutters, and covered patios. {esc(GAF)}.</p>'
          f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary rh-call" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div></div>'
          f'<div class="rh1-art">{_roof("rf-hero")}</div></div>')
    v2 = (f'<div class="rh2 sec-pad"><div class="wrap sp2-g"><div><p class="label">Roofing, gutters &amp; patio covers</p><h1 class="h1">From the deck up.</h1>{cline()}'
          f'<p class="lead">Shingle and metal roofing, gutters, and covered patios. {esc(GAF)}.</p><div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a></div></div>'
          f'<div class="rh2-art">{_roof("rf-light")}</div></div></div>')
    css = """
.rf{width:100%;height:auto;display:block} .rf-t{font:600 17px var(--font-text);letter-spacing:.08em;fill:var(--color-drawing-label-strong)} .rf-light .rf-t{fill:var(--color-text-secondary)}
.rh1 .btn-primary{background:var(--color-surface-on-dark);color:var(--color-text-primary)} .rh-call{background:transparent;color:var(--color-text-inverse);border-color:var(--color-border-on-dark-strong)} .rh1-art{max-width:1100px;margin:var(--space-07) auto 0;padding:0 var(--layout-gutter)}
.rh2-art{background:var(--color-bg-subtle);padding:var(--space-05)}
"""
    return 'Roofing hero', v1, v2, css, ''


def r2():
    v1 = (f'<div class="rfp" data-rfp><div class="wa-stick"><div class="wrap rfp-g"><div><p class="label">A roof, layer by layer</p><h2 class="h2">Built from the eave to the ridge.</h2>'
          f'<p class="lead">Scroll, and the roof goes on in order: deck, underlayment, starter strip, the courses bottom-up, then the ridge cap.</p></div>{_roof("rf-pin")}</div></div></div>')
    items = [('Deck', 'The solid sheathing the roof is fastened to.'), ('Underlayment', 'A water-resistant layer over the whole deck.'),
             ('Starter strip', 'The first, sealed edge at the eave.'), ('Courses', 'Shingles laid bottom-up, each course lapping the one below.'), ('Ridge cap', 'Closes the peak.')]
    dl = ''.join(f'<div><dt><span>{i + 1}</span>{esc(t)}</dt><dd>{esc(d)}</dd></div>' for i, (t, d) in enumerate(items))
    v2 = f'<div class="rfx sec-pad"><div class="wrap wa-g"><div class="rh2-art">{_roof("rf-light")}</div><div><p class="label">A roof, layer by layer</p><h2 class="h2">Built from the eave to the ridge.</h2><dl class="wnx-l">{dl}</dl></div></div></div>'
    css = """
.rfp{height:260vh;position:relative} .rfp-g{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr);gap:var(--space-08);align-items:center;width:100%}
.js [data-rfp] .rf-p{opacity:0;transition:opacity var(--duration-normal) var(--ease-standard)} .js [data-rfp] .rf-p.on{opacity:1} .rf-pin .rf-t{fill:var(--color-text-secondary)}
@media (max-width:900px){.rfp-g{grid-template-columns:minmax(0,1fr)}}
"""
    js = """
(function(){const w=document.querySelector('[data-rfp]');if(!w)return;const P=[...w.querySelectorAll('.rf-p')];const set=p=>P.forEach(e=>e.classList.toggle('on',p*12.6+1>(+e.dataset.k)));
if(window.APS.reduce)set(1);else{set(0);window.APS.pin(w,set);}})();
"""
    return 'Roof in layers', v1, v2, css, js


def r3():
    v1 = (f'<div class="pb1"><div class="wrap pb1-in"><p class="pb1-r">{icon("status-credential", 22)}<b>{esc(GAF)}</b></p>'
          f'<p class="pb1-c"><span>{esc(CREDS[3])}</span></p><a class="pb1-a" href="#/about/booking">Book an estimate {icon("action-arrow-right", 18)}</a></div></div>')
    v2 = f'<div class="cr2 sec-pad"><div class="wrap"><p class="label">Credential</p><p class="cr2-t">{esc(GAF)}.</p>{cline()}</div></div>'
    return 'Credential band', v1, v2, '', ''


def _gutter(cls):
    return (f'<svg class="gt {cls}" viewBox="0 0 900 460" role="img" aria-label="Water running off the roof edge into the gutter, along it and down the downspout, away from the wall">'
            f'<path d="M0 120L520 40" stroke="var(--steel-9)" stroke-width="18"/><path d="M520 70V430" stroke="var(--color-border-control)" stroke-width="6"/>'
            f'<path d="M490 96H600V140Q600 150 590 150H500Q490 150 490 140Z" fill="var(--steel-3)" stroke="var(--steel-9)" stroke-width="5"/>'
            f'<path d="M570 150V400Q570 420 590 420H700" fill="none" stroke="var(--steel-9)" stroke-width="18"/>'
            f'<path class="gt-w" d="M60 104L500 38L520 100H560L570 140V398Q570 416 590 416H860" fill="none" stroke="var(--steel-6)" stroke-width="5" stroke-dasharray="1" pathLength="1"/>'
            f'<text x="630" y="100" class="gt-t">GUTTER</text><text x="600" y="300" class="gt-t">DOWNSPOUT</text><text x="720" y="400" class="gt-t">AWAY FROM THE WALL</text></svg>')



_gutter_raw = _gutter


def _gutter(*a, **k):
    return ill(_gutter_raw(*a, **k))

def r4():
    v1 = (f'<div class="gw1 sec-pad" data-gw><div class="wrap wa-g"><div><p class="label">Gutters</p><h2 class="h2">Where the water goes.</h2>'
          f'<p class="lead">Off the roof edge, into the gutter, down the downspout and away from the wall. The line follows it in once as the drawing comes into view.</p></div>{_gutter("gt-draw")}</div></div>')
    v2 = (f'<div class="gw2 on-dark sec-pad"><div class="wrap wa-g">{_gutter("gt-static")}<div><p class="label on-dark-l">Gutters</p><h2 class="h2 on-dark-h">Where the water goes.</h2>'
          f'<p class="lead on-dark-p">Off the roof edge, into the gutter, down the downspout and away from the wall.</p></div></div></div>')
    css = """
.gt{width:100%;height:auto} .gt-t{font:600 15px var(--font-text);letter-spacing:.08em;fill:var(--color-text-secondary)} .gt-static .gt-t{fill:var(--color-drawing-label)}
.gt-w{stroke-dashoffset:0} .js .gt-draw .gt-w{stroke-dashoffset:1} .js .gt-draw.on .gt-w{stroke-dashoffset:0;transition:stroke-dashoffset 1200ms var(--ease-draw)}
@media (prefers-reduced-motion:reduce){.js .gt-draw .gt-w{stroke-dashoffset:0}}
"""
    js = """
(function(){const g=document.querySelector('.gt-draw');if(!g)return;if(window.APS.reduce||!('IntersectionObserver' in window)){g.classList.add('on');return;}
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){g.classList.add('on');o.disconnect();}}),{threshold:.5}).observe(g);})();
"""
    return 'Gutters', v1, v2, css, js


def _patio(kind):
    """a patio cover in a simple oblique drawing: posts, beam, rafters and roof plane; attached covers meet the wall"""
    wall = '<path d="M40 60V330" stroke="var(--color-border-control)" stroke-width="8"/>' if kind == 'attached' else '<path d="M70 150V330" stroke="var(--steel-9)" stroke-width="12"/>'
    raft = ''.join(f'<path d="M{70 + i * 60} {150 - i * 4}L{150 + i * 60} {110 - i * 4}" stroke="var(--steel-8)" stroke-width="6"/>' for i in range(6))
    return (f'<svg class="pc" viewBox="0 0 520 360" aria-hidden="true">{wall}<path d="M50 120L460 100L520 70L120 90Z" fill="var(--steel-3)" stroke="var(--steel-9)" stroke-width="4"/>'
            f'{raft}<path d="M70 150H470" stroke="var(--steel-9)" stroke-width="12"/><path d="M460 150V330M300 150V330" stroke="var(--steel-9)" stroke-width="12"/>'
            f'<path d="M20 330H500" stroke="var(--color-border-default)" stroke-width="3"/></svg>')



_patio_raw = _patio


def _patio(*a, **k):
    return ill(_patio_raw(*a, **k))

def r5():
    parts = [('Posts', 'Carry the load to the ground.'), ('Beam', 'Runs across the posts.'), ('Rafters', 'Span from the beam to the house or a second beam.'), ('Roof', 'Sheds rain off the patio.')]
    dl = ''.join(f'<div><dt><span>{i + 1}</span>{esc(t)}</dt><dd>{esc(d)}</dd></div>' for i, (t, d) in enumerate(parts))
    v1 = (f'<div class="pc1 sec-pad"><div class="wrap wa-g"><div class="pc-art">{_patio("attached")}</div><div><p class="label">Patio covers</p><h2 class="h2">Shade, built like a small roof.</h2>'
          f'<dl class="wnx-l">{dl}</dl></div></div></div>')
    v2 = (f'<div class="pc2 sec-pad"><div class="wrap"><p class="label">Patio covers</p><h2 class="h2">Attached, or standing on its own.</h2>{cline()}<div class="pc-g">'
          f'<figure class="pc-f"><div class="pc-art">{_patio("attached")}</div><figcaption><b>Attached</b><span>Fixed to the house on one side.</span></figcaption></figure>'
          f'<figure class="pc-f"><div class="pc-art">{_patio("free")}</div><figcaption><b>Freestanding</b><span>Posts on every side.</span></figcaption></figure></div></div></div>')
    css = """
.pc{width:100%;height:auto;display:block} .pc-art{background:var(--color-bg-subtle);padding:var(--space-05)} .pc-g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-06)}
.pc-f{margin:0} .pc-f figcaption{display:grid;gap:4px;margin-top:var(--space-03)} .pc-f b{font:700 var(--type-lead-size) var(--font-display)} .pc-f span{color:var(--color-text-secondary)}
@media (max-width:900px){.pc-g{grid-template-columns:minmax(0,1fr)}}
"""
    return 'Patio covers', v1, v2, css, ''


def r6():
    return close(GAF, 'roofing')


ROOFING = [r1, r2, r3, r4, r5, r6]
