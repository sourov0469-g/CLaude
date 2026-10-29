"""Dimensioned section sheet for "Built to spec" v3 (S0361 dimensional drawing, S1361 split layout).

Two views in one viewBox, swapped with a morph of one outline (S0184 MorphSVG):
  LAP   section A-A through HardiePlank lap: board L1 8.25 in, exposure X1 7 in, lap O1 = L1 - X1 = 1.25 in, thickness T1 5/16 in.
  B&B   plan section through board and batten: panel P1 4 ft (48 in), batten B1 2.5 in, battens C1 16 in on centre.
Only published values carry numbers; the batten and panel thicknesses are not published, so they are drawn as a
proportional schematic and coded [TBD] (S0361 rule 5). Line conventions are S0361's: outline 1.6, dimension 0.7,
extension 0.55 starting 3 off with 5 overshoot, 7 px arrows, 11 px dimension text.
"""

VW, VH = 620, 540


def f(v):
    s = f'{v:.2f}'.rstrip('0').rstrip('.')
    return s


def arrow_line(x1, y1, x2, y2, label, code, side='r', cls='dm'):
    """dimension line with filled arrows (marker), label = 'CODE value'"""
    lx, ly = (x1 + x2) / 2, (y1 + y2) / 2
    short = abs(x2 - x1) + abs(y2 - y1) < 28
    m = '' if short else ' marker-start="url(#sh-ar)" marker-end="url(#sh-ar)"'
    out = f'<path class="dl" d="M{f(x1)} {f(y1)}L{f(x2)} {f(y2)}"{m}/>'
    if short:   # arrows outside on a short span (S0361 kit: span < 28 px)
        if x1 == x2:
            out += f'<path class="dl" d="M{f(x1)} {f(y1 - 16)}L{f(x1)} {f(y1)}" marker-end="url(#sh-ar)"/><path class="dl" d="M{f(x2)} {f(y2 + 16)}L{f(x2)} {f(y2)}" marker-end="url(#sh-ar)"/>'
        else:
            out += f'<path class="dl" d="M{f(x1 - 16)} {f(y1)}L{f(x1)} {f(y1)}" marker-end="url(#sh-ar)"/><path class="dl" d="M{f(x2 + 16)} {f(y2)}L{f(x2)} {f(y2)}" marker-end="url(#sh-ar)"/>'
    if x1 == x2:
        tx, anchor = (lx + 10, 'start') if side == 'r' else (lx - 10, 'end')
        out += f'<text class="dt" x="{f(tx)}" y="{f(ly + 4)}" text-anchor="{anchor}">{label}</text>'
    elif short:
        out += f'<text class="dt" x="{f(x2 + 20)}" y="{f(ly + 4)}">{label}</text>'
    else:
        out += f'<text class="dt" x="{f(lx)}" y="{f(ly - 8)}" text-anchor="middle">{label}</text>'
    return f'<g class="dim" data-code="{code}">{out}</g>'


def ext_h(x0, x1, y):
    """horizontal extension line, 3 px off the feature, 5 px overshoot"""
    return f'<path class="xl" d="M{f(x0 + 3)} {f(y)}L{f(x1 + 5)} {f(y)}"/>'


def ext_v(x, y0, y1):
    return f'<path class="xl" d="M{f(x)} {f(y0 + 3)}L{f(x)} {f(y1 + 5)}"/>'


def lap_view():
    s = 20.0                      # px per inch
    T = 0.3125 * s
    Xw, base = 250.0, 512.0       # wall face (outside of sheathing), bottom of the starter
    y = lambda z: base - z * s
    out = []
    # sheathing and wall (schematic, hatched cut solid), with the wall face line
    out.append(f'<rect class="cut" x="{f(Xw - 22)}" y="{f(y(23))}" width="22" height="{f(23 * s + 12)}" fill="url(#sh-hatch)"/>')
    out.append(f'<path class="ol" d="M{f(Xw)} {f(y(23))}V{f(base + 12)}"/>')
    # starter strip, then three boards bottom-up (each upper board laps 1.25 in over the one below)
    out.append(f'<rect class="cut cut-b" x="{f(Xw)}" y="{f(y(1.5))}" width="{f(T)}" height="{f(1.5 * s)}"/>')
    boards = []
    for k in range(3):
        zb, zt = k * 7.0, k * 7.0 + 8.25
        P = [(Xw, y(zt)), (Xw + T, y(zt)), (Xw + 2 * T, y(zb)), (Xw + T, y(zb))]
        boards.append('M' + 'L'.join(f'{f(a)} {f(b)}' for a, b in P) + 'Z')
    # face elevation strip to the right: the same three courses seen from outside (7 in exposure each)
    ex = Xw + 150
    face = ''.join(f'<rect class="face" x="{f(ex)}" y="{f(y(k * 7 + 8.25))}" width="150" height="{f(8.25 * s)}"/>' for k in (0, 1, 2))
    butts = ''.join(f'<path class="ol" d="M{f(ex)} {f(y(k * 7))}H{f(ex + 150)}"/>' for k in (0, 1, 2))
    out.append(f'<g class="sh-face">{face}{butts}<path class="ol" d="M{f(ex)} {f(y(22.25))}V{f(base)}M{f(ex + 150)} {f(y(22.25))}V{f(base)}"/></g>')
    # dimensions: chain on the left of the face strip (L1 board, X1 exposure, O1 lap), T1 under the section
    dx = Xw + 70
    out.append(ext_h(Xw + 2 * T, dx, y(7)) + ext_h(Xw + T, dx, y(15.25)) + ext_h(Xw + 2 * T, dx + 34, y(14)))
    out.append(arrow_line(dx, y(7), dx, y(15.25), 'L1', 'L1'))
    out.append(arrow_line(dx + 34, y(7), dx + 34, y(14), 'X1', 'X1'))
    out.append(arrow_line(dx + 34, y(14), dx + 34, y(15.25), 'O1', 'O1'))
    out.append(ext_v(Xw + T, y(7), y(7) + 26) + ext_v(Xw + 2 * T, y(7), y(7) + 26))
    out.append(arrow_line(Xw + T, y(7) + 30, Xw + 2 * T, y(7) + 30, 'T1', 'T1'))
    out.append(f'<text class="vt" x="{f(Xw - 22)}" y="{f(y(23) - 14)}">SECTION A-A</text><text class="vs" x="{f(Xw - 22)}" y="{f(y(23) - 2)}">SCALE 20 PX = 1 IN</text>')
    out.append(f'<text class="vt" x="{f(ex)}" y="{f(y(23) - 14)}">FACE</text><text class="vs" x="{f(ex)}" y="{f(y(23) - 2)}">3 COURSES · X1 EACH</text>')
    return ''.join(out), boards


def bb_view():
    s2 = 520 / 48.0
    x0, yy = 50.0, 300.0
    pt, bt = 6.0, 10.0          # schematic thicknesses ([TBD]: not published)
    out = []
    shape = [f'M{f(x0)} {f(yy)}H{f(x0 + 48 * s2)}V{f(yy + pt)}H{f(x0)}Z']
    for c in (0, 16, 32, 48):
        cx = x0 + c * s2
        bx0 = cx - 1.25 * s2
        bx1 = cx + 1.25 * s2
        shape.append(f'M{f(bx0)} {f(yy - bt)}H{f(bx1)}V{f(yy)}H{f(bx0)}Z')
    out.append(f'<rect class="cut" x="{f(x0)}" y="{f(yy + pt)}" width="{f(48 * s2)}" height="22" fill="url(#sh-hatch)"/>')
    # centrelines (dash-dot) through each batten, C1 chain above, B1 on the second batten, P1 overall below
    for c in (0, 16, 32, 48):
        cx = x0 + c * s2
        out.append(f'<path class="cl" d="M{f(cx)} {f(yy - bt - 46)}V{f(yy + pt + 30)}"/>')
    for a, b in ((0, 16), (16, 32), (32, 48)):
        out.append(arrow_line(x0 + a * s2, yy - bt - 36, x0 + b * s2, yy - bt - 36, 'C1', 'C1'))
    b0, b1 = x0 + 16 * s2 - 1.25 * s2, x0 + 16 * s2 + 1.25 * s2
    out.append(ext_v(b0, yy - bt, yy - bt - 4 - 0) + ext_v(b1, yy - bt, yy - bt - 4))
    out.append(arrow_line(b0, yy - bt - 12, b1, yy - bt - 12, 'B1', 'B1'))
    out.append(ext_v(x0, yy + pt + 22, yy + pt + 52) + ext_v(x0 + 48 * s2, yy + pt + 22, yy + pt + 52))
    out.append(arrow_line(x0, yy + pt + 60, x0 + 48 * s2, yy + pt + 60, 'P1', 'P1'))
    out.append(f'<text class="vt" x="{f(x0)}" y="{f(yy - 120)}">PLAN SECTION B-B</text><text class="vs" x="{f(x0)}" y="{f(yy - 108)}">BOARD AND BATTEN · THICKNESSES [TBD]</text>')
    return ''.join(out), shape


def svg():
    lap, lap_shape = lap_view()
    bb, bb_shape = bb_view()
    defs = ('<defs><marker id="sh-ar" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
            '<path d="M0 0L10 5L0 10Z" class="ah"/></marker>'
            '<pattern id="sh-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0V6" class="ht"/></pattern></defs>')
    morph = f'<path class="sh-morph" d="{"".join(lap_shape)}" data-lap="{"".join(lap_shape)}" data-bb="{"".join(bb_shape)}"/>'
    return (f'<svg class="sheet" viewBox="0 0 {VW} {VH}" role="img" aria-label="Dimensioned section of James Hardie lap siding and of board and batten">'
            f'{defs}<g class="sh-lap">{lap}</g><g class="sh-bb" hidden>{bb}</g>{morph}</svg>')


if __name__ == '__main__':
    import sys
    open(sys.argv[1] if len(sys.argv) > 1 else 'sheet.svg', 'w').write(svg())
