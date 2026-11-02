"""Phase 1 concept marks inside territory T1 The Profile Cut. Each returns SVG inner markup on a 64-unit box.

Every mark is drawn from one physical fact: lap siding seen at a cut corner. Each board is a tapered wedge in
section (thin at its top, thick at its butt), and each board laps over the one below, so the cut end makes a sawtooth.
`fill` is the mark colour and `bg` is the colour of the surface it sits on; `bg` is used only to draw a lap gap,
never as a tone. `small=True` returns the 16 px variant, simplified so the shape closes at that size."""

# ------------------------------------------------------------------------------------------------------------------
# C1 The Profile House: metaphor fusion (house) + product action (one line, laid like a course)
# ------------------------------------------------------------------------------------------------------------------
def _c1_geom(small):
    if small:
        return dict(n=2, out=0.5, top=9.5, inner=15.5, sw=7.5, base=59, eave=27)
    return dict(n=4, out=3.5, top=7.6, inner=12.6, sw=5, base=58.5, eave=26)


def c1_center(small=False, tail=0):
    """the centre line the mark is drawn along: up the left wall, over the gable, down the right wall, and (in the
    course-line lockup) on along the base. The draw-on mask strokes this line."""
    g = _c1_geom(small)
    lx = g['inner'] - g['sw'] / 2
    rx = 64 - lx
    d = f'M{lx} {g["base"]}V{g["eave"]}L32 {g["eave"] - (32 - lx) * 0.9:.2f}L{rx} {g["eave"]}V{g["base"]}'
    if tail:
        d += f'H{rx + tail}'
    return d


def c1_wall(small=False):
    """the left wall in section: a straight inner face and a stepped outer face. Each course is a wedge, thin at its
    top and thick at its butt, so the outer face steps out at every butt, as a lap-sided wall does at a cut corner"""
    g = _c1_geom(small)
    pitch = (g['base'] - g['eave']) / g['n']
    d = [f'M{g["inner"]} {g["base"]}H{g["out"]}']
    y = g['base']
    for i in range(g['n']):
        y -= pitch
        d.append(f'L{g["top"]} {y:.2f}')
        if i < g['n'] - 1:
            d.append(f'H{g["out"]}')
    d.append(f'H{g["inner"]}Z')
    return ''.join(d)


def c1_path(small=False, tail=0):
    """the stroked part: from the top of the left wall over the gable and down the right wall (plus the tail)"""
    g = _c1_geom(small)
    lx = g['inner'] - g['sw'] / 2
    rx = 64 - lx
    d = f'M{lx} {g["eave"] + 6}V{g["eave"]}L32 {g["eave"] - (32 - lx) * 0.9:.2f}L{rx} {g["eave"]}V{g["base"]}'
    if tail:
        d += f'H{rx + tail}'
    return d


_c1_n = [0]


def c1(fill, bg=None, small=False, tail=0, cls=''):
    """the solid lapped wall plus one stroked line. Wrapped in a group masked by the centre line, so the draw-on
    animates one mask stroke's dashoffset and the whole mark appears along the path it is drawn on"""
    g = _c1_geom(small)
    _c1_n[0] += 1
    mid = f'c1m{_c1_n[0]}'
    reach = 16 if small else 12
    return (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="-4" y="-4" width="{72 + tail}" height="72">'
            f'<path class="c1-draw{cls}" d="{c1_center(small, tail)}" fill="none" stroke="#fff" stroke-width="{reach}" '
            f'stroke-linejoin="round" pathLength="1"/></mask>'
            f'<g mask="url(#{mid})"><path d="{c1_wall(small)}" fill="{fill}"/>'
            f'<path class="c1-line" d="{c1_path(small, tail)}" fill="none" stroke="{fill}" stroke-width="{g["sw"]}" '
            f'stroke-linejoin="miter" stroke-miterlimit="10" stroke-linecap="butt"/></g>')


# ------------------------------------------------------------------------------------------------------------------
# C2 Lap A: monogram (A for Austin) + meaning (two lap boards in section, leaning into a gable)
# ------------------------------------------------------------------------------------------------------------------
def c2(fill, bg, small=False):
    """Two tapered boards. The left board sits behind; the right board laps over it at the ridge and is outlined
    by a gap in the surface colour, so the lap is visible. The crossbar is one course, tucked behind both boards"""
    gap = 4.4 if small else 2.8
    def board(bx, tx, wb, wt, top, base=60):
        """a tapered board: centre line from (bx, base) to (tx, top); width wb at the butt, wt at the top"""
        return (f'M{bx - wb / 2:.2f} {base}L{tx - wt / 2:.2f} {top}H{tx + wt / 2:.2f}L{bx + wb / 2:.2f} {base}Z')
    if small:
        L, R = board(14, 37, 16, 8, 4), board(50, 27, 16, 8, 4)
        bar = f'<path class="c2-bar" d="M21 37H43V46H21Z" fill="{fill}"/>'
    else:
        L, R = board(13.5, 39, 13, 5, 1), board(50.5, 25, 13, 5, 1)
        bar = f'<path class="c2-bar" d="M20 38H44V45H20Z" fill="{fill}"/>'
    # the crossbar is one course tucked behind both boards: each board is outlined by a gap where it crosses it
    return (bar +
            f'<path class="c2-l" d="{L}" fill="{fill}" stroke="{bg}" stroke-width="{gap}" stroke-linejoin="miter" paint-order="stroke"/>'
            f'<path class="c2-r" d="{R}" fill="{fill}" stroke="{bg}" stroke-width="{gap}" stroke-linejoin="miter" paint-order="stroke"/>')


# ------------------------------------------------------------------------------------------------------------------
# C3 Reveal Tile: container + negative space (the board sections cut out of a steel tile)
# ------------------------------------------------------------------------------------------------------------------
_mask_n = [0]


def c3(fill, bg=None, small=False):
    """A tile of four courses. Each joint is cut out as a long wedge: wide where it meets the left edge (the butt
    standing proud) and running to nothing at the right edge. The cuts break the tile's left edge into a sawtooth"""
    _mask_n[0] += 1
    mid = f'c3m{_mask_n[0]}'
    if small:
        joints, depth, nx, rv = (25, 43), 9, 22, 0
    else:
        joints, depth, nx, rv = (18.5, 32, 45.5), 7.5, 18, 2.2
    cuts = ''.join(f'<path class="c3-cut" d="M0 {j - depth}L{nx} {j - rv}H61V{j}H0Z" fill="#000"/>' for j in joints)
    return (f'<mask id="{mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="64" height="64">'
            f'<rect width="64" height="64" fill="#fff"/>{cuts}</mask>'
            f'<rect class="c3-tile" x="4" y="5" width="56" height="54" rx="2" fill="{fill}" mask="url(#{mid})"/>')


CONCEPTS = {'c1': c1, 'c2': c2, 'c3': c3}
