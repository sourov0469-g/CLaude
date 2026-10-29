"""Rob Roy elevation, traced from the firm's own job photo (studio base, 1400 x 875).

Every horizontal on the gable-end wall runs to the wall's right vanishing point VP, found from the two
windows' head and sill lines; verticals stay vertical (two-point perspective). The 15 lap-course shadow
lines were measured on the photo along VP lines (period 0.06655 of the wall height, first at 0.0195), and
three more continue up under the frieze. Nothing here is invented: it is the photographed house, as lines.

`svg(...)` returns an <svg> string whose groups carry data-part names (siding, windows, roof, trim, doors,
deck) so the page can draw them in construction order and light one part at a time.
"""
VP = (3684.0, 464.0)
W, H = 1400, 875


def on_vp(x0, y0, x):
    """y at x on the line through (x0, y0) and the vanishing point."""
    return y0 + (VP[1] - y0) * (x - x0) / (VP[0] - x0)


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def pts(*p):
    return ' '.join(f'{f(x)},{f(y)}' for x, y in p)


def line(x1, y1, x2, y2, cls=''):
    c = f' class="{cls}"' if cls else ''
    return f'<path{c} d="M{f(x1)} {f(y1)}L{f(x2)} {f(y2)}" pathLength="1"/>'


def poly(points, cls='', closed=True):
    c = f' class="{cls}"' if cls else ''
    d = 'M' + 'L'.join(f'{f(x)} {f(y)}' for x, y in points) + ('Z' if closed else '')
    return f'<path{c} d="{d}" pathLength="1"/>'


# gable-end wall (the navy James Hardie lap): corners measured on the photo
XL, XR = 523.0, 1372.0
TL, BL = (XL, 325.0), (XL, 803.0)
TR, BR = (XR, on_vp(XL, 325.0, XR)), (XR, on_vp(XL, 803.0, XR))
APEX_OUT, APEX_IN = (1068.0, 93.0), (1065.0, 137.0)


def rake_in_left(x):
    return 262.0 - 0.3425 * (x - 700.0)


def rake_in_right(x):
    return 137.0 + 0.708 * (x - 1065.0)


FRIEZE_B0 = (747.0, 246.0)        # frieze bottom meets the left rake
FRIEZE_T0 = (820.0, 225.0)        # gable base (frieze top) left end
GABLE_APEX = (1034.0, 157.0)


def frieze_b(x):
    return on_vp(*FRIEZE_B0, x)


def frieze_t(x):
    return on_vp(*FRIEZE_T0, x)


# right end of the frieze bottom, where it meets the right rake (both lines are straight: closed form)
_s = (VP[1] - FRIEZE_B0[1]) / (VP[0] - FRIEZE_B0[0])
_xr = (137.0 - 0.708 * 1065.0 - FRIEZE_B0[1] + _s * FRIEZE_B0[0]) / (_s - 0.708)
FRIEZE_B1 = (_xr, frieze_b(_xr))
WALL = [BL, (XL, rake_in_left(XL)), FRIEZE_B0, FRIEZE_B1, (XR, rake_in_right(XR)), BR]


def course_ts():
    ts = [0.0195 + k * 0.06655 for k in range(15)]
    ts = [0.0195 - m * 0.06655 for m in (3, 2, 1)] + ts
    return ts


def course(t):
    yl = TL[1] + (BL[1] - TL[1]) * t
    yr = TR[1] + (BR[1] - TR[1]) * t
    return (XL, yl), (XR, yr)


WINDOWS = [  # outer trim (left x, right x, head y at left, sill y at left), glass (same), meeting rail y at left
    dict(o=(850.0, 971.0, 365.0, 537.0), g=(864.5, 955.0, 380.0, 521.0), rail=450.5),
    dict(o=(1079.0, 1177.0, 374.0, 528.0), g=(1090.0, 1163.0, 390.0, 514.5), rail=452.0),
]


DOORS = ((245, 279, 417), (292, 322, 410), (372, 447, 372))


def quad(x0, x1, y0, y1):
    return [(x0, y0), (x1, on_vp(x0, y0, x1)), (x1, on_vp(x0, y1, x1)), (x0, y1)]


def svg(id_='elev', cls='elev', title='Elevation of the Rob Roy job, Austin, traced from the job photo', hits=False):
    g = {k: [] for k in ('grade', 'wall', 'siding', 'trim', 'windows', 'roof', 'gable', 'wing', 'wingc', 'doors', 'deck')}
    # grade
    g['grade'].append(line(0, 812, XL, BL[1] + 6))
    g['grade'].append(line(XL, BL[1] + 6, 1400, on_vp(XL, BL[1] + 6, 1400)))
    # wall outline
    g['wall'].append(poly(WALL, 'w-out'))
    # courses, bottom-up (install order), clipped to the wall
    for t in sorted(course_ts(), reverse=True):
        (x1, y1), (x2, y2) = course(t)
        g['siding'].append(line(x1, y1, x2, y2, 'c'))
    # corner boards and frieze
    g['trim'].append(poly([(500, 330), (XL, rake_in_left(XL)), (XL, BL[1]), (500, BL[1] + 2)], closed=True))
    g['trim'].append(poly([(XR, rake_in_right(XR)), (1386, rake_in_right(1386)), (1386, on_vp(XL, 803, 1386)), BR], closed=True))
    g['trim'].append(poly([FRIEZE_B0, FRIEZE_B1, (FRIEZE_B1[0] - 26, frieze_t(FRIEZE_B1[0] - 26)), FRIEZE_T0], closed=True))
    # windows: trim, glass, meeting rail
    for w in WINDOWS:
        ox0, ox1, oy0, oy1 = w['o']; gx0, gx1, gy0, gy1 = w['g']
        g['windows'].append(poly(quad(ox0, ox1, oy0, oy1)))
        g['windows'].append(poly(quad(gx0, gx1, gy0, gy1), 'glass'))
        r = w['rail']
        g['windows'].append(line(gx0, r - 3, gx1, on_vp(gx0, r - 3, gx1)))
        g['windows'].append(line(gx0, r + 3, gx1, on_vp(gx0, r + 3, gx1)))
    # gable triangle and its louvres (to the VP, between the gable's sloped sides)
    ga, gl = GABLE_APEX, FRIEZE_T0
    gr = (1210.0, frieze_t(1210.0))
    g['gable'].append(poly([gl, ga, gr]))
    for k in range(1, 8):
        y = gl[1] - (gl[1] - ga[1]) * k / 8.0
        # left side x at this height, then run to the VP until the right side
        xl = gl[0] + (ga[0] - gl[0]) * k / 8.0
        xr = xl
        for _ in range(40):  # walk to the right edge (line from ga to gr)
            yy = on_vp(xl, y, xr)
            t = (yy - ga[1]) / (gr[1] - ga[1])
            xr = ga[0] + (gr[0] - ga[0]) * t
        g['gable'].append(line(xl, y, xr, on_vp(xl, y, xr)))
    # roof: rake boards (outer edge, fascia line, inner edge) and the porch roof that continues left
    g['roof'].append(poly([(392, 305), APEX_OUT, (1400, 283)], closed=False))
    g['roof'].append(poly([(392, 330), (700, 236), (1066, 115), (1400, 305)], closed=False))
    g['roof'].append(poly([(XL, rake_in_left(XL)), APEX_IN, (XR + 14, rake_in_right(XR + 14))], closed=False))
    g['roof'].append(poly([(169, 405), (392, 302)], closed=False))
    g['roof'].append(poly([(182, 430), (400, 332)], closed=False))
    g['roof'].append(line(392, 302, 400, 332))
    # upper wing (second storey wall, its eave and window)
    g['wing'].append(poly([(95, 140), (660, 186)], closed=False))
    g['wing'].append(poly([(110, 166), (650, 212)], closed=False))
    g['wing'].append(poly([(124, 172), (124, 552)], closed=False))
    g['wing'].append(poly([(110, 222), (110, 552)], closed=False))
    g['wing'].append(poly([(199, 191), (284, 197), (284, 307), (199, 305)]))
    g['wing'].append(poly([(210, 200), (274, 205), (274, 295), (210, 294)], 'glass'))
    # porch doors and the wide door under the porch roof
    for x0, x1, y0 in DOORS:
        g['doors'].append(poly([(x0, 592), (x0, y0), (x1, y0 - 2), (x1, 594)], closed=False))
        g['doors'].append(poly([(x0 + 6, 588), (x0 + 6, y0 + 8), (x1 - 6, y0 + 6), (x1 - 6, 590)], 'glass'))
    # deck, rail and steps
    g['deck'].append(poly([(0, 598), (232, 600), (232, 690)], closed=False))
    g['deck'].append(poly([(0, 640), (175, 642)], closed=False))
    g['deck'].append(poly([(0, 676), (175, 678)], closed=False))
    for x in (40, 105, 172):
        g['deck'].append(line(x, 596, x, 712))
    g['deck'].append(poly([(175, 700), (262, 700), (270, 728), (178, 730)]))
    g['deck'].append(poly([(0, 712), (178, 714)], closed=False))
    # lap courses on the set-back two-storey wall (same plane family, measured 15.1 px apart at x 300)
    for k in range(-4, 26):
        y = 225.5 + k * 15.1
        g['wingc'].append(line(110, on_vp(300, y, 110), 520, on_vp(300, y, 520), 'c'))
    order = ['grade', 'wall', 'siding', 'trim', 'windows', 'gable', 'roof', 'wing', 'wingc', 'doors', 'deck']
    part = {'wall': 'siding', 'siding': 'siding', 'trim': 'trim', 'windows': 'windows', 'gable': 'trim',
            'roof': 'roof', 'wing': 'siding', 'wingc': 'siding', 'doors': 'doors', 'deck': 'deck', 'grade': ''}
    ring = lambda P: 'M' + 'L'.join(f'{f(x)} {f(y)}' for x, y in P) + 'Z'
    holes = ''.join(ring(quad(*w['o'])) for w in WINDOWS)
    wing_up = [(124, 172), (650, 212), (650, 224), (392, 305), (169, 405), (124, 405)]
    wing_lo = [(124, 456), (400, 332), (500, 330), (500, 598), (124, 598)]
    doors = ''.join(ring([(x0, 594), (x0, y0), (x1, y0 - 2), (x1, 594)]) for x0, x1, y0 in DOORS)
    win_up = ring([(199, 191), (284, 197), (284, 307), (199, 305)])
    clip = (f'<clipPath id="{id_}-clip"><path clip-rule="evenodd" d="{ring(WALL)}{holes}"/></clipPath>'
            f'<clipPath id="{id_}-wclip"><path clip-rule="evenodd" d="{ring(wing_up)}{win_up}{ring(wing_lo)}{doors}"/></clipPath>')
    body = ''
    for k in order:
        attrs = f' data-g="{k}"' + (f' data-part="{part[k]}"' if part[k] else '')
        if k == 'siding':
            attrs += f' clip-path="url(#{id_}-clip)"'
        if k == 'wingc':
            attrs += f' clip-path="url(#{id_}-wclip)"'
        body += f'<g{attrs}>' + ''.join(g[k]) + '</g>'
    if hits:
        # invisible areas the pointer can hit, one per trade part (the drawing itself is only lines)
        H_ = {
            'siding': [ring(WALL), ring(wing_up), ring(wing_lo)],
            'windows': [ring(quad(*w['o'])) for w in WINDOWS] + [win_up],
            'roof': [ring([(392, 305), APEX_OUT, (1400, 283), (1400, 312), (XR + 14, rake_in_right(XR + 14)), APEX_IN, (XL, rake_in_left(XL)), (400, 332), (182, 430), (169, 405)]),
                     ring([(95, 140), (660, 186), (650, 212), (110, 166)])],
            'trim': [ring([FRIEZE_B0, FRIEZE_B1, (1210, frieze_t(1210)), GABLE_APEX, FRIEZE_T0]),
                     ring([(500, 330), (XL, rake_in_left(XL)), (XL, BL[1]), (500, BL[1] + 2)]),
                     ring([(XR, rake_in_right(XR)), (1386, rake_in_right(1386)), (1386, on_vp(XL, 803, 1386)), BR])],
            'doors': [ring([(x0, 594), (x0, y0), (x1, y0 - 2), (x1, 594)]) for x0, x1, y0 in DOORS],
            'deck': [ring([(0, 596), (232, 598), (270, 728), (0, 714)])],
        }
        body += '<g class="hits">' + ''.join(f'<path data-hit="{k}" d="{"".join(v)}"/>' for k, v in H_.items()) + '</g>'
    return (f'<svg class="{cls}" id="{id_}" viewBox="0 0 {W} {H}" fill="none" role="img" aria-label="{title}" '
            f'preserveAspectRatio="xMidYMid slice"><defs>{clip}</defs>{body}</svg>')


if __name__ == '__main__':
    import sys
    open(sys.argv[1] if len(sys.argv) > 1 else 'elev.svg', 'w').write(svg())
