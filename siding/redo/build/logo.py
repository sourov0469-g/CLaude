"""The settled logo: the Stacked Lap "A" (owner's pick via Muse, from the logo deepdive sheet).
Siding courses stacked into the letterform: nine courses from apex to base; above the counter one board per course,
beside the counter and below the crossbar two boards (the legs), the crossbar course runs full width. Each board's ends
follow the A's outer and inner leg lines, and a thin gap under each course is the lap shadow line. At 16 px the gaps
close and the mark reads as a solid A."""


def stacked_lap_a(fill='currentColor', gap=1.7, kick=1.2, butt=None):
    top, base = 6.0, 94.0
    n = 9
    h = (base - top) / n
    slope = 0.47                      # half-width grows 0.47 per unit of height
    cx = 50.0
    counter_top, cross_top, cross_bot = top + 3 * h, top + 6 * h, top + 7 * h
    leg = 14.0                        # horizontal leg width

    def xo(y):  # outer half width
        return (y - top) * slope + 4.0

    def xi(y):  # inner (counter) half width
        return max(0.0, xo(y) - leg)

    parts = []
    for i in range(n):
        y0 = top + i * h
        y1 = y0 + h - gap
        k = kick * (i / (n - 1))       # each lower course kicks out a hair further: the stack reads as lapped
        L0, L1 = cx - xo(y0) - k, cx - xo(y1) - k
        R0, R1 = cx + xo(y0) + k, cx + xo(y1) + k
        if y0 < counter_top - 0.01 or (cross_top - 0.01 <= y0 < cross_bot - 0.01):
            parts.append([(L0, y0), (R0, y0), (R1, y1), (L1, y1)])
        else:
            parts.append([(L0, y0), (cx - xi(y0), y0), (cx - xi(y1), y1), (L1, y1)])
            parts.append([(cx + xi(y0), y0), (R0, y0), (R1, y1), (cx + xi(y1), y1)])
    d = ''.join('M' + ' L'.join(f'{x:.2f} {y:.2f}' for x, y in p) + 'Z' for p in parts)
    out = f'<path d="{d}" fill="{fill}"/>'
    if butt:   # the butt edge: the bottom quarter of each board, a shade darker, as a lapped board shows from the street
        bands = []
        for p in parts:
            (a, b, c, e) = p
            t = 0.70
            def lerp(P, Q): return (P[0] + (Q[0] - P[0]) * t, P[1] + (Q[1] - P[1]) * t)
            bands.append([lerp(a, e), lerp(b, c), c, e])
        d2 = ''.join('M' + ' L'.join(f'{x:.2f} {y:.2f}' for x, y in p) + 'Z' for p in bands)
        out += f'<path d="{d2}" fill="{butt}"/>'
    return out


def logo_svg(size=40, fill='#396791', cls='', title='Austin Pro', butt='#2A4E6E'):
    return (f'<svg class="{cls}" viewBox="0 0 100 100" width="{size}" height="{size}" role="img" aria-label="{title}">'
            f'{stacked_lap_a(fill, butt=butt if size > 24 else None)}</svg>')
