"""MASTER DIRECTIVE Phase 4: "Clad the gable", the homepage's business-only interactive.

The visitor clads a 16 ft gable end, drawn to scale, course by course: each click nails the next HardiePlank course
at the published 7 in exposure (or the next 12 in board of board and batten), in a published ColorPlus colour, under
a shingle or metal roof, with or without new windows. The readout answers from the firm's own record only: how
many of the 312 photographed jobs on its map carried exactly those trades, the latest of them by place and month,
and each trade's published price band. Nothing is summed or estimated: bands are shown as published, never added.
"""
from parts import e

PX_FT = 25.0                      # drawing scale: 25 px a foot
EXPO = 7 / 12 * PX_FT             # 7 in exposure (published HardiePlank spec on this page)
X0, X1 = 120, 520                 # 16 ft wall
GROUND, EAVE, APEX = 470, 250, 106
N_LAP = 0
_y = GROUND
while _y - EXPO > APEX - 2:
    _y -= EXPO
    N_LAP += 1
N_BB = int((X1 - X0) / PX_FT)     # 12 in boards across 16 ft


def wall_path():
    return f'M{X0} {GROUND}V{EAVE}L{(X0 + X1) / 2} {APEX}L{X1} {EAVE}V{GROUND}Z'


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def svg():
    mid = (X0 + X1) / 2
    lap = ''.join(f'<g class="cl-co" data-k="{k}"><rect x="{X0 - 6}" y="{f(GROUND - (k + 1) * EXPO)}" width="{X1 - X0 + 12}" height="{f(EXPO + 1.2)}"/>'
                  f'<path class="cl-sh" d="M{X0 - 6} {f(GROUND - k * EXPO)}H{X1 + 6}"/></g>' for k in range(N_LAP))
    bb = ''.join(f'<g class="cl-bb" data-k="{k}"><rect x="{f(X0 + k * PX_FT)}" y="{APEX}" width="{f(PX_FT)}" height="{GROUND - APEX}"/>'
                 f'<rect class="cl-bt" x="{f(X0 + (k + 1) * PX_FT - 2)}" y="{APEX}" width="4" height="{GROUND - APEX}"/></g>' for k in range(N_BB))
    grain = ''.join(f'<path d="M{x} {y}h{w}"/>' for x, y, w in [(4, 3, 9), (16, 6, 12), (2, 9, 7), (11, 12, 10), (22, 2, 6)])
    studs = ''.join(f'<path class="cl-stud" d="M{f(x)} {EAVE if x in (X0, X1) else min(EAVE, APEX + abs(x - mid) * (EAVE - APEX) / (mid - X0))}V{GROUND}"/>'
                    for x in [X0 + i * PX_FT * 16 / 12 for i in range(int((X1 - X0) / (PX_FT * 16 / 12)) + 1)])
    roof_l = f'M{X0 - 34} {EAVE + 22}L{mid} {APEX - 26}L{X1 + 34} {EAVE + 22}'


    def win(x, y, w, h):
        return (f'<g class="cl-win"><rect class="cl-wf" x="{x}" y="{y}" width="{w}" height="{h}"/>'
                f'<rect class="cl-wg" x="{x + 6}" y="{y + 6}" width="{w - 12}" height="{h - 12}"/>'
                f'<path class="cl-wm cl-old" d="M{x + 6} {y + h / 2}H{x + w - 6}M{x + w / 3} {y + 6}V{y + h - 6}M{x + 2 * w / 3} {y + 6}V{y + h - 6}"/>'
                f'<path class="cl-wm cl-new" d="M{x + 6} {y + h / 2}H{x + w - 6}"/></g>')
    return (f'<svg class="cl-svg" viewBox="0 0 640 520" role="img" aria-labelledby="cl-t"><title id="cl-t">A 16 foot gable end, drawn to scale, '
            f'clad course by course</title><defs><clipPath id="cl-clip"><path d="{wall_path()}"/></clipPath>'
            f'<pattern id="cl-grain" width="28" height="14" patternUnits="userSpaceOnUse"><g class="cl-grain">{grain}</g></pattern></defs>'
            f'<path class="cl-ground" d="M20 {GROUND}H620"/>'
            f'<path class="cl-wrap" d="{wall_path()}"/><g class="cl-studs" clip-path="url(#cl-clip)">{studs}</g>'
            f'<text class="cl-wrapt" x="{mid}" y="{GROUND - 60}" text-anchor="middle">HOUSE WRAP</text>'
            f'<g class="cl-lap" clip-path="url(#cl-clip)">{lap}<rect class="cl-tex" x="{X0}" y="{APEX}" width="{X1 - X0}" height="{GROUND - APEX}" fill="url(#cl-grain)"/></g>'
            f'<g class="cl-bbs" clip-path="url(#cl-clip)">{bb}</g>'
            f'<g class="cl-nails"></g>'
            f'<path class="cl-trim" d="M{X0} {GROUND}V{EAVE}M{X1} {GROUND}V{EAVE}"/>'
            f'<g class="cl-roof"><path class="cl-roof-b" d="{roof_l}"/><path class="cl-tabs" d="{roof_l}"/><path class="cl-seams" d="{roof_l}"/></g>'
            + win(160, 300, 76, 104) + win(404, 300, 76, 104) + win(int(mid) - 30, 176, 60, 56)
            + f'<rect class="cl-door" x="{int(mid) - 26}" y="{GROUND - 116}" width="52" height="116"/>'
            f'<g class="cl-dim"><path d="M{X0} {GROUND + 22}H{X1}M{X0} {GROUND + 14}v16M{X1} {GROUND + 14}v16"/><text x="{mid}" y="{GROUND + 40}" text-anchor="middle">16 ft</text></g></svg>')


def html(trades, colorplus):
    T = {t['name']: t for t in trades}

    def band(name, label=None):
        t = T[name]
        return (f'<li data-cl-band="{e(name)}"><b>{e(label or name)}</b><span>published band ${t["lo"]}k-${t["hi"]}k, '
                f'median ${t["med"][0]}k-${t["med"][1]}k, from {t["n"]} priced jobs</span></li>')
    sw = ''.join(f'<button type="button" class="cl-sw" role="radio" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" '
                 f'data-c="{h}" style="--c:{h}" aria-label="{e(n)}, ColorPlus"><span class="sr-only">{e(n)}</span></button>'
                 for i, (n, _b, h) in enumerate(colorplus))

    def seg(name, legend, opts):
        return (f'<fieldset class="cl-f"><legend>{legend}</legend><div class="cl-seg" role="radiogroup" aria-label="{legend}">'
                + ''.join(f'<button type="button" role="radio" data-{name}="{v}" aria-checked="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}">'
                          f'<b>{lab}</b><span>{sub}</span></button>' for i, (v, lab, sub) in enumerate(opts)) + '</div></fieldset>')
    first = colorplus[0][0]
    return f'''<div class="v built-4 cl" data-tone="ground">
  <div class="cl-head">
    <h2 class="h2x" data-split>Clad the gable</h2>
    <p class="lead">Nail the courses on yourself: the firm's board, at its published 7 in exposure, in a ColorPlus colour it publishes. The record answers with its own jobs like yours.</p>
  </div>
  <div class="cl-grid">
    <figure class="cl-stage">
      {svg()}
      <figcaption class="cl-bar">
        <button class="btn btn-red cl-nail" type="button" data-cl-nail>Nail the next course</button>
        <p class="cl-count num" aria-live="polite"><b data-cl-n>0</b> of <span data-cl-of>{N_LAP}</span> <span data-cl-unit>courses</span></p>
        <button class="tlink cl-all" type="button" data-cl-all>Clad it all</button>
        <button class="tlink cl-strip" type="button" data-cl-strip>Strip it</button>
      </figcaption>
    </figure>
    <div class="cl-panel" data-lap="{N_LAP}" data-bb="{N_BB}">
      {seg('board', 'Board', [('lap', 'HardiePlank lap', '301 of 415 priced siding jobs'), ('bb', 'Board and batten', '27 of 415')])}
      {seg('tex', 'Texture', [('cedar', 'Select Cedarmill', '286 of 415'), ('smooth', 'Smooth', '36 of 415')])}
      <fieldset class="cl-f"><legend>ColorPlus colour: <span data-cl-cname>{e(first)}</span></legend><div class="cl-sws" role="radiogroup" aria-label="ColorPlus colour">{sw}</div></fieldset>
      {seg('roof', 'Roof', [('keep', 'Keep the roof', ''), ('shingle', 'Shingle', f"{T['Shingle roofing']['doc']} documented"), ('metal', 'Standing-seam metal', f"{T['Metal roofing']['doc']} documented")])}
      {seg('win', 'Windows', [('keep', 'Keep the windows', ''), ('new', 'New windows', f"{T['Windows']['doc']} documented")])}
      <div class="cl-out" aria-live="polite">
        <p class="cl-rec"><b data-cl-match>0</b> of the 312 photographed jobs on the firm's map carried <span data-cl-trades>siding</span>. <span data-cl-latest></span></p>
        <ul class="cl-bands">{band('Siding')}{band('Shingle roofing')}{band('Metal roofing')}{band('Windows')}</ul>
        <p class="cl-note">Each band is that trade's own, as the firm publishes it. They are not added together here: a combined job is priced at the inspection.</p>
        <a class="btn btn-ink cl-book" href="#book" data-book data-trade="Siding">Book a free inspection for this wall</a>
      </div>
    </div>
  </div>
</div>'''
