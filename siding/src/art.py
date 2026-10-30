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



# ---------- section motifs: one trade object per section, drawn on a 320 grid, tints of the accent only ----------
def _svg(key, body, label):
    return (f'<svg class="art-motif am-{key}" viewBox="0 0 320 320" aria-hidden="true" focusable="false">{body}</svg>')


def motif(key):
    M = {
        # a spirit level, bubble centred: the record, level and checkable
        'proof': '<rect class="am-f" x="18" y="132" width="284" height="56" rx="10"/><rect class="am-l" x="18" y="132" width="284" height="56" rx="10"/>'
                 '<rect class="am-g" x="120" y="144" width="80" height="32" rx="16"/><path class="am-l" d="M150 144v32M170 144v32"/>'
                 '<circle class="am-b" cx="160" cy="160" r="9"/><circle class="am-l" cx="52" cy="160" r="12"/><circle class="am-l" cx="268" cy="160" r="12"/>'
                 '<path class="am-t" d="' + ''.join(f'M{x} 132v{10 if x % 40 == 38 else 6}' for x in range(38, 300, 20)) + '"/>',
        # a framing square over three lap boards in profile
        'services': '<path class="am-f" d="M40 40h40v200h200v40H40z"/><path class="am-l" d="M40 40h40v200h200v40H40z"/>'
                    '<path class="am-t" d="' + ''.join(f'M{x} 280v-{12 if (x - 80) % 40 == 0 else 7}' for x in range(90, 280, 10)) + ''.join(f'M40 {y}h{12 if y % 40 == 0 else 7}' for y in range(50, 240, 10)) + '"/>'
                    + ''.join(f'<path class="am-g" d="M120 {y}l170 -6v28l-170 6z"/><path class="am-l" d="M120 {y}l170 -6v28l-170 6z"/>' for y in (98, 138, 178)),
        # a chalk-line reel, the line snapped across the frame
        'work': '<circle class="am-f" cx="70" cy="90" r="46"/><circle class="am-l" cx="70" cy="90" r="46"/><circle class="am-g" cx="70" cy="90" r="18"/><circle class="am-l" cx="70" cy="90" r="18"/>'
                '<path class="am-l" d="M70 72v-30M88 90h28"/><path class="am-snap" pathLength="1" d="M112 112L300 270"/><path class="am-dust" d="M112 112L300 270"/><circle class="am-b" cx="300" cy="270" r="7"/>',
        # a stack of fibre-cement lap boards, end grain showing the bevel
        'built': ''.join(f'<path class="am-f" d="M30 {y}h230l30 -16H60z"/><path class="am-l" d="M30 {y}h230l30 -16H60z"/><path class="am-g" d="M30 {y}h230v14H30z"/><path class="am-l" d="M30 {y}h230v14H30zM260 {y + 14}l30 -16v-14"/>' for y in (250, 220, 190, 160, 130, 100)),
        # a fan deck: the colour book, opened, in tints of the one accent
        'colour': ''.join(f'<g transform="rotate({a} 160 280)"><rect class="am-fan am-fan{i}" x="140" y="40" width="40" height="230" rx="8"/><rect class="am-l" x="140" y="40" width="40" height="230" rx="8"/><path class="am-l" d="M140 220h40"/></g>' for i, a in enumerate((-48, -32, -16, 0, 16, 32, 48)))
                  + '<circle class="am-b" cx="160" cy="262" r="8"/>',
        # a compass rose over a street grid: the neighbourhoods
        'near': '<path class="am-t" d="' + ''.join(f'M{x} 20V300' for x in range(40, 300, 44)) + ''.join(f'M20 {y}H300' for y in range(40, 300, 44)) + '"/>'
                '<circle class="am-f" cx="160" cy="160" r="78"/><circle class="am-l" cx="160" cy="160" r="78"/><circle class="am-l" cx="160" cy="160" r="60"/>'
                '<path class="am-g" d="M160 92l14 68-14 68-14-68z"/><path class="am-l" d="M160 92l14 68-14 68-14-68z"/><path class="am-b" d="M160 92l14 68h-28z"/>'
                '<path class="am-l" d="M92 160h136"/><text class="am-tx" x="160" y="76" text-anchor="middle">N</text>',
        # a yard sign on its stake: how a finished job is announced on an Austin street
        'reviews': '<path class="am-l am-stake" d="M120 170v130M200 170v130"/><rect class="am-f" x="70" y="60" width="180" height="120" rx="10"/><rect class="am-l" x="70" y="60" width="180" height="120" rx="10"/>'
                   + ''.join(f'<path class="am-b" d="M{x} 92l6 13 14 2-10 10 2 14-12-7-12 7 2-14-10-10 14-2z"/>' for x in (110, 140, 170, 200))
                   + '<path class="am-g" d="M96 140h128v14H96z"/>',
        # a price tag cut as a house: published bands, not quotes in a drawer
        'money': '<path class="am-f" d="M60 140l100-90 100 90v130H60z"/><path class="am-l" d="M60 140l100-90 100 90v130H60z"/><circle class="am-b" cx="160" cy="112" r="12"/>'
                 '<path class="am-l am-string" d="M160 100C150 60 190 40 230 24"/><path class="am-g" d="M92 180h136v14H92zM92 210h96v14H92z"/>',
        # an inspection clipboard, items ticking off
        'book': '<rect class="am-f" x="70" y="40" width="180" height="250" rx="12"/><rect class="am-l" x="70" y="40" width="180" height="250" rx="12"/><rect class="am-g" x="120" y="28" width="80" height="28" rx="8"/><rect class="am-l" x="120" y="28" width="80" height="28" rx="8"/>'
                + ''.join(f'<rect class="am-l" x="96" y="{y}" width="20" height="20" rx="4"/><path class="am-tick" style="--i:{i}" pathLength="1" d="M100 {y + 10}l5 6 9-12"/><path class="am-t" d="M128 {y + 10}h96"/>' for i, y in enumerate((86, 130, 174, 218))),
    }
    return _svg(key, M[key], key) if key in M else ''


if __name__ == '__main__':
    s = street()
    print(len(s), 'B')
