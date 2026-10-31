"""Austin Pro logo (owner redesign directive, 2026-10-30). Run once with fontTools available; it writes static SVGs,
so the site build itself needs nothing new.

Mark: a gable roof drawn as one bold chevron over a four-pane window, on an accent tile. The roof chevron doubles as
the A of Austin; one pane is lit in a pale cobalt tint. Wordmark: AUSTIN PRO in
Poppins 700 with PRO in the accent, descriptor in Roboto 500. All text is outlined, so the files need no fonts."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'site/assets/fonts')
OUT = os.path.join(ROOT, 'site/assets/img/brand')
ACC, ACC_D, ACC_200, INK, INK2, WHITE = '#2F66FF', '#1A4FE0', '#C8D8FF', '#0E0F12', '#3D4350', '#FFFFFF'


def run(font, text, size, x, y, track=0.0, wght=None):
    """outline one line of text: returns (svg path d, advance width)"""
    from fontTools.ttLib import TTFont
    from fontTools.pens.svgPathPen import SVGPathPen
    from fontTools.pens.transformPen import TransformPen
    f = TTFont(font)
    if wght and 'fvar' in f:
        from fontTools.varLib.instancer import instantiateVariableFont
        f = instantiateVariableFont(f, {'wght': wght, **({'wdth': 100} if any(a.axisTag == 'wdth' for a in f['fvar'].axes) else {})})
    gs, cmap, hmtx, upm = f.getGlyphSet(), f.getBestCmap(), f['hmtx'], f['head'].unitsPerEm
    s = size / upm
    pen = SVGPathPen(gs, lambda v: f'{v:.1f}'.rstrip('0').rstrip('.'))
    cx = x
    kern = {}
    for ch in text:
        g = cmap.get(ord(ch))
        if g is None:
            cx += size * 0.3; continue
        gs[g].draw(TransformPen(pen, (s, 0, 0, -s, cx, y)))
        cx += hmtx[g][0] * s + track * size
    return pen.getCommands(), cx - x - track * size


def mark(x=0, y=0, k=1.0, wall=ACC, course=ACC_D, roof=INK, pane=WHITE, lit=ACC_200, courses=True, uid=''):
    """64 x 64 grid. An A-frame gable: the letter A of Austin and the three trades in one shape. The gable wall is
    clad in lap-siding courses (siding), a roof line caps it with an eave overhang (roofing), and a four-pane window
    sits where the A's crossbar would be, one pane lit (windows). courses=False drops the course lines for 16 px use."""
    t = lambda a, b: f'{x + a * k:.2f} {y + b * k:.2f}'
    n = lambda v: f'{v * k:.2f}'
    tri = f'M{t(32, 10)}L{t(57, 59)}L{t(7, 59)}Z'
    p = [f'<path d="{tri}" fill="{wall}"/>']
    if courses:   # lap lines: each course shows its shadow edge, clipped to the gable
        cid = f'apg{uid}{int(x)}{int(y)}{int(k * 100)}'
        lines = ''.join(f'<rect x="{x}" y="{y + c * k:.2f}" width="{n(64)}" height="{n(1.6)}" fill="{course}"/>' for c in (27, 34, 41, 48, 55))
        p.append(f'<clipPath id="{cid}"><path d="{tri}"/></clipPath><g clip-path="url(#{cid})">{lines}</g>')
    p.append(f'<path d="M{t(3.5, 40)}L{t(32, 4.5)}L{t(60.5, 40)}" fill="none" stroke="{roof}" stroke-width="{n(6.5)}" stroke-linecap="square" stroke-linejoin="miter"/>')
    p.append(f'<rect x="{x + 22.5 * k:.2f}" y="{y + 36.5 * k:.2f}" width="{n(19)}" height="{n(19)}" fill="{pane}"/>')
    for i, (a, b) in enumerate([(24.5, 38.5), (32.5, 38.5), (24.5, 46.5), (32.5, 46.5)]):
        p.append(f'<rect x="{x + a * k:.2f}" y="{y + b * k:.2f}" width="{n(7)}" height="{n(7)}" fill="{lit if i == 1 else course}"/>')
    return ''.join(p)


def mono(color, x=0, y=0, k=1.0, uid='m'):
    """single-colour mark (black, white or accent): one fill, the course lines, the window frame and the lit pane are
    knocked out of it, so the shape reads on any light or dark ground"""
    t = lambda a, b: f'{x + a * k:.2f} {y + b * k:.2f}'
    n = lambda v: f'{v * k:.2f}'
    tri = f'M{t(32, 10)}L{t(57, 59)}L{t(7, 59)}Z'
    ko = ''.join(f'<rect x="{x}" y="{y + c * k:.2f}" width="{n(64)}" height="{n(1.6)}" fill="#000"/>' for c in (27, 34, 41, 48))
    ko += f'<rect x="{x + 22.5 * k:.2f}" y="{y + 36.5 * k:.2f}" width="{n(19)}" height="{n(19)}" fill="#000"/>'
    panes = ''.join(f'<rect x="{x + a * k:.2f}" y="{y + b * k:.2f}" width="{n(7)}" height="{n(7)}" fill="{color}"/>' for a, b in [(24.5, 38.5), (24.5, 46.5), (32.5, 46.5)])
    return (f'<mask id="apm{uid}"><rect x="{x}" y="{y}" width="{n(64)}" height="{n(64)}" fill="#fff"/>{ko}</mask>'
            f'<path d="{tri}" fill="{color}" mask="url(#apm{uid})"/>{panes}'
            f'<path d="M{t(3.5, 40)}L{t(32, 4.5)}L{t(60.5, 40)}" fill="none" stroke="{color}" stroke-width="{n(6.5)}" stroke-linecap="square" stroke-linejoin="miter"/>')


def lockup(dark=INK, sub=INK2, acc=ACC_D):
    pop, rob = os.path.join(FONTS, 'Poppins-700-latin.woff2'), os.path.join(FONTS, 'Roboto-latin.woff2')
    x0 = 80
    a, wa = run(pop, 'AUSTIN ', 38, x0, 37, track=0.02)
    b, wb = run(pop, 'PRO', 38, x0 + wa + 0.02 * 38, 37, track=0.02)
    name_w = wa + 0.02 * 38 + wb
    d_txt = 'SIDING · WINDOWS · ROOFING · PATIO COVERS'
    _, w1 = run(rob, d_txt, 10, 0, 0, track=0.1, wght=500)
    size = 10 * name_w / w1          # descriptor set to the name's width
    c, _ = run(rob, d_txt, size, x0 + 1, 58, track=0.1, wght=500)
    W = round(x0 + name_w + 2)
    body = mark() + f'<path d="{a}" fill="{dark}"/><path d="{b}" fill="{acc}"/><path d="{c}" fill="{sub}"/>'
    return W, body


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>\n')


# ===================================================================== REBRAND (2026-10-31): the course-gable mark
# Law of closure (S1422): nothing outlines the house. Five lap courses, centred and lengthening downward, imply a gable
# by their ends alone; a gap through the lowest two implies the doorway and the counter of an A. The eye completes the
# house and the A of Austin from bars only, so the mark is one colour by construction: black, white or the accent.
# Each course is cut at the roof pitch, so the course ends fall on two straight diagonals: the eye joins them into the
# roof line and the gable closes without a single drawn edge (S1422). A doorway gap through the lowest two courses
# reads as the door and as the counter of the A.
APEX_Y, BASE_Y, HALF = 0.0, 64.0, 31.0          # implied gable: apex (32, 0), eaves 31 either side at the base


def _x(yy):
    return HALF * (yy - APEX_Y) / (BASE_Y - APEX_Y)


def course_mark(fill='currentColor', n=5, gap=4.6, door=11.0, split_from=3, x=0, y=0, k=1.0):
    pitch = (BASE_Y - APEX_Y + gap) / n
    h = pitch - gap
    out = []
    for i in range(n):
        t, b = APEX_Y + i * pitch, APEX_Y + i * pitch + h
        tl, bl = 32 - _x(t), 32 - _x(b)
        tr, br = 32 + _x(t), 32 + _x(b)
        P = lambda pts: 'M' + 'L'.join(f'{x + px * k:.2f} {y + py * k:.2f}' for px, py in pts) + 'Z'
        if i >= split_from:
            d = door / 2
            out.append(f'<path d="{P([(tl, t), (32 - d, t), (32 - d, b), (bl, b)])}" fill="{fill}"/>')
            out.append(f'<path d="{P([(32 + d, t), (tr, t), (br, b), (32 + d, b)])}" fill="{fill}"/>')
        else:
            out.append(f'<path d="{P([(tl, t), (tr, t), (br, b), (bl, b)])}" fill="{fill}"/>')
    return ''.join(out)


def favicon_mark(fill):
    """16 px: four heavier courses, wider door, still closing into the gable and the A"""
    return course_mark(fill, n=4, gap=5.2, door=13.0, split_from=2)


def lockup2(name_fill, desc_fill, mark_fill):
    """horizontal lockup: mark + Austin Pro (Poppins 600) + descriptor (Roboto 500), every glyph outlined"""
    pop, rob = os.path.join(FONTS, 'Poppins-600-latin.woff2'), os.path.join(FONTS, 'Roboto-latin.woff2')
    x0 = 82
    a, wa = run(pop, 'Austin Pro', 36, x0, 34, track=-0.005)
    d_txt = 'SIDING · WINDOWS · ROOFING · PATIO COVERS'
    _, w1 = run(rob, d_txt, 10, 0, 0, track=0.1, wght=500)
    c, _ = run(rob, d_txt, 10 * wa / w1, x0 + 1, 56, track=0.1, wght=500)
    return round(x0 + wa + 2), course_mark(mark_fill) + f'<path d="{a}" fill="{name_fill}"/><path d="{c}" fill="{desc_fill}"/>'


def write_rebrand():
    accent, ink, ink2, white = '#00736A', '#222928', '#474F4E', '#FFFFFF'   # accent-9, neutral-12, neutral-11 (rebrand tokens)
    out = os.path.join(OUT, '2026-10-31')
    os.makedirs(out, exist_ok=True)
    W, body = lockup2(ink, ink2, accent)
    open(os.path.join(out, 'logo.svg'), 'w').write(svg(W, 64, body, 'Austin Pro Siding, Windows and Roofing'))
    W, body = lockup2(white, white, white)
    open(os.path.join(out, 'logo-white.svg'), 'w').write(svg(W, 64, body, 'Austin Pro Siding, Windows and Roofing'))
    W, body = lockup2('#000000', '#000000', '#000000')
    open(os.path.join(out, 'logo-black.svg'), 'w').write(svg(W, 64, body, 'Austin Pro Siding, Windows and Roofing'))
    for nm, c in (('accent', accent), ('black', '#000000'), ('white', white)):
        open(os.path.join(out, f'mark-{nm}.svg'), 'w').write(svg(64, 64, course_mark(c), 'Austin Pro'))
    open(os.path.join(out, 'favicon.svg'), 'w').write(svg(64, 64, favicon_mark(accent), 'Austin Pro'))
    print('rebrand marks written to', out)


if __name__ == '__main__' and os.environ.get('REBRAND'):
    write_rebrand()
elif __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    W, body = lockup()
    open(os.path.join(OUT, 'logo.svg'), 'w').write(svg(W, 64, body, 'Austin Pro Siding, Windows and Roofing'))
    open(os.path.join(OUT, 'logo-mark.svg'), 'w').write(svg(64, 64, mark(), 'Austin Pro'))
    open(os.path.join(OUT, 'favicon.svg'), 'w').write(svg(64, 64, mark(courses=False), 'Austin Pro'))
    for nm, c in (('black', INK), ('white', WHITE), ('accent', ACC)):
        open(os.path.join(OUT, f'logo-mark-{nm}.svg'), 'w').write(svg(64, 64, mono(c, uid=nm), 'Austin Pro'))
    print('logo.svg', W, 'x 64;', os.path.getsize(os.path.join(OUT, 'logo.svg')), 'B')
