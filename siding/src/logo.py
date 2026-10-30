"""Austin Pro logo (owner redesign directive, 2026-10-30). Run once with fontTools available; it writes static SVGs,
so the site build itself needs nothing new.

Mark: a gable roof drawn as one bold chevron over a four-pane window, on an accent tile. The roof chevron doubles as
the A of Austin; one pane is lit, the only place the logo uses the second (sun) colour. Wordmark: AUSTIN PRO in
Poppins 700 with PRO in the accent, descriptor in Roboto 500. All text is outlined, so the files need no fonts."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'site/assets/fonts')
OUT = os.path.join(ROOT, 'site/assets/img/brand')
ACC, ACC_D, SUN, INK, INK2, WHITE = '#2F66FF', '#1A4FE0', '#FFC933', '#0E0F12', '#3D4350', '#FFFFFF'


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


def mark(x=0, y=0, k=1.0, wall=ACC, course=ACC_D, roof=INK, pane=WHITE, lit=SUN, courses=True, uid=''):
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


if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    W, body = lockup()
    open(os.path.join(OUT, 'logo.svg'), 'w').write(svg(W, 64, body, 'Austin Pro Siding, Windows and Roofing'))
    open(os.path.join(OUT, 'logo-mark.svg'), 'w').write(svg(64, 64, mark(), 'Austin Pro'))
    open(os.path.join(OUT, 'favicon.svg'), 'w').write(svg(64, 64, mark(courses=False), 'Austin Pro'))
    print('logo.svg', W, 'x 64;', os.path.getsize(os.path.join(OUT, 'logo.svg')), 'B')
