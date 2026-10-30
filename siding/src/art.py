"""Brand artwork for the master directive's Phase 3: drawn, not stock, and only about this firm's trades.

street()  the hero centrepiece: one Austin street of six houses, each built from a trade the firm sells (lap siding,
          replacement windows, shingle roofing, a patio cover, a standing-seam metal roof, board and batten).
          Courses draw in, windows light, and each house names its trade when pointed at or focused.
Every colour is a token (fill/stroke come from CSS classes), so the drawing follows the palette.
"""


def f(v):
    return f'{v:.1f}'.rstrip('0').rstrip('.')


def P(*pts, z=True):
    return 'M' + 'L'.join(f'{f(x)} {f(y)}' for x, y in pts) + ('Z' if z else '')


GROUND = 236


def courses(x0, x1, y0, y1, step=9, cls='ar-c'):
    """lap courses: one shadow line per course, drawn in order (pathLength 1 so CSS can draw them)"""
    out, y, i = [], y1 - step, 0
    while y > y0 + 2:
        out.append(f'<path class="{cls}" style="--i:{i}" pathLength="1" d="M{f(x0)} {f(y)}H{f(x1)}"/>')
        y -= step; i += 1
    return ''.join(out)


def battens(x0, x1, y0, y1, step=12):
    out, x, i = [], x0 + step, 0
    while x < x1 - 2:
        out.append(f'<path class="ar-c" style="--i:{i}" pathLength="1" d="M{f(x)} {f(y1)}V{f(y0)}"/>')
        x += step; i += 1
    return ''.join(out)


def window(x, y, w, h, i, panes=2):
    m = ''.join(f'<path class="ar-mu" d="M{f(x + w * k / panes)} {f(y)}V{f(y + h)}"/>' for k in range(1, panes))
    return (f'<rect class="ar-w" style="--i:{i}" x="{f(x)}" y="{f(y)}" width="{f(w)}" height="{f(h)}"/>{m}'
            f'<path class="ar-mu" d="M{f(x)} {f(y + h / 2)}H{f(x + w)}"/><path class="ar-sill" d="M{f(x - 3)} {f(y + h + 2)}H{f(x + w + 3)}"/>')


def door(x, w=22, h=46):
    return f'<rect class="ar-door" x="{f(x)}" y="{f(GROUND - h)}" width="{w}" height="{h}"/><circle class="ar-knob" cx="{f(x + w - 6)}" cy="{f(GROUND - h / 2)}" r="1.6"/>'


def house(n, trade, x, body, label_x):
    return (f'<g class="ar-h" data-trade="{trade}" tabindex="-1" style="--n:{n}">{body}'
            f'<g class="ar-tag" transform="translate({f(label_x)} 22)"><rect x="-58" y="-14" width="116" height="26" rx="13"/>'
            f'<text y="4" text-anchor="middle">{trade}</text></g></g>')


def street(uid='st'):
    H = []
    # 1 ranch, lap siding (low hip roof, long run of courses)
    x0, x1, top = 30, 300, 150
    H.append(house(0, 'Lap siding', x0,
        f'<path class="ar-roof" d="{P((x0 - 14, top), (x0 + 40, top - 34), (x1 - 40, top - 34), (x1 + 14, top))}"/>'
        f'<rect class="ar-wall" x="{x0}" y="{top}" width="{x1 - x0}" height="{GROUND - top}"/>' + courses(x0, x1, top, GROUND)
        + window(x0 + 26, top + 22, 54, 40, 0, 3) + window(x0 + 170, top + 22, 54, 40, 1, 3) + door(x0 + 118), 165))
    # 2 two-storey gable: replacement windows (a grid of them)
    x0, x1, top = 330, 520, 74
    H.append(house(1, 'Windows', x0,
        f'<path class="ar-roof" d="{P((x0 - 12, top + 4), ((x0 + x1) / 2, top - 58), (x1 + 12, top + 4))}"/>'
        f'<path class="ar-wall" d="{P((x0, top + 4), ((x0 + x1) / 2, top - 46), (x1, top + 4), (x1, GROUND), (x0, GROUND))}"/>'
        + courses(x0, x1, top + 4, GROUND, step=10)
        + ''.join(window(x0 + 22 + c * 58, top + 26 + r * 66, 34, 44, 2 + r * 3 + c, 2) for r in (0, 1) for c in (0, 1, 2))
        + f'<circle class="ar-w" style="--i:8" cx="{(x0 + x1) / 2}" cy="{top - 14}" r="11"/>', 425))
    # live oak between the houses
    H.append('<g class="ar-tree"><path class="ar-trunk" d="M598 236C600 205 596 186 590 170M598 206C610 190 622 184 634 180"/>'
             '<path class="ar-leaf" d="M548 176c-14-2-22-16-14-28 2-16 22-22 34-14 8-14 30-16 40-4 14-6 32 2 34 18 14 6 14 26 0 32-6 12-24 14-34 6-12 10-32 8-40-2-12 4-26-2-20-8z"/></g>')
    # 3 shingle roof + patio cover
    x0, x1, top = 660, 860, 132
    shingles = ''.join(f'<path class="ar-sh" style="--i:{k}" pathLength="1" d="M{f(x0 + 14 + k * 4)} {f(top - 8 - k * 9)}H{f(x1 - 14 - k * 4)}"/>' for k in range(5))
    H.append(house(2, 'Shingle roofing', x0,
        f'<path class="ar-roof ar-roof-sh" d="{P((x0 - 16, top), (x0 + 40, top - 56), (x1 - 40, top - 56), (x1 + 16, top))}"/>{shingles}'
        f'<rect class="ar-wall" x="{x0}" y="{top}" width="{x1 - x0}" height="{GROUND - top}"/>' + courses(x0, x1, top, GROUND)
        + window(x0 + 24, top + 26, 46, 40, 9, 2) + door(x0 + 92) + window(x0 + 134, top + 26, 46, 40, 10, 2), 760))
    px0, px1, py = 860, 960, 160
    H.append(house(3, 'Patio covers', px0,
        f'<path class="ar-pc" d="{P((px0, py), (px1, py + 10), (px1, py + 16), (px0, py + 6))}"/>'
        + ''.join(f'<path class="ar-post" d="M{f(x)} {f(py + 6 + (x - px0) / 10)}V{GROUND}"/>' for x in (px0 + 40, px1 - 4))
        + ''.join(f'<path class="ar-c" style="--i:{k}" pathLength="1" d="M{f(px0 + 8 + k * 18)} {f(py - 2 + k * 1.8)}V{f(py + 8 + k * 1.8)}"/>' for k in range(6)), 912))
    # 4 standing-seam metal roof cottage
    x0, x1, top = 990, 1150, 128
    seams = ''.join(f'<path class="ar-seam" style="--i:{k}" pathLength="1" d="M{f(x0 + 10 + k * 14)} {f(top)}L{f((x0 + x1) / 2 + (k - 5) * 4)} {f(top - 62)}"/>' for k in range(11))
    H.append(house(4, 'Metal roofing', x0,
        f'<path class="ar-roof ar-roof-m" d="{P((x0 - 10, top), ((x0 + x1) / 2, top - 70), (x1 + 10, top))}"/>{seams}'
        f'<rect class="ar-wall" x="{x0}" y="{top}" width="{x1 - x0}" height="{GROUND - top}"/>' + courses(x0, x1, top, GROUND)
        + window(x0 + 20, top + 24, 40, 46, 11, 2) + door(x0 + 104), 1070))
    # 5 modern board and batten
    x0, x1, top = 1180, 1410, 96
    H.append(house(5, 'Board and batten', x0,
        f'<path class="ar-roof" d="{P((x0 - 12, top + 26), (x1 - 40, top - 22), (x1 + 8, top - 10), (x1 + 8, top - 2), (x0 - 12, top + 34))}"/>'
        f'<path class="ar-wall" d="{P((x0, top + 30), (x1, top - 4), (x1, GROUND), (x0, GROUND))}"/>' + battens(x0, x1, top + 30, GROUND)
        + window(x0 + 30, top + 60, 30, 110, 12, 1) + window(x0 + 84, top + 60, 30, 110, 13, 1) + window(x0 + 150, top + 52, 56, 48, 14, 2) + door(x0 + 160), 1300))
    ground = (f'<path class="ar-ground" d="M0 {GROUND}H1440"/>'
              + ''.join(f'<path class="ar-grass" d="M{x} {GROUND}l3 -7l3 7"/>' for x in range(12, 1440, 37)))
    return (f'<svg class="art-street" id="{uid}" viewBox="0 0 1440 248" preserveAspectRatio="xMidYMax meet" role="img" '
            f'aria-label="Drawing: an Austin street of six houses, each one a trade Austin Pro installs">'
            f'{ground}{"".join(H)}</svg>')


if __name__ == '__main__':
    s = street()
    print(len(s), 'B')
