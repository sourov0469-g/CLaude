"""Isometric solids for the "Built to spec" renders (S0526 anatomy, S0504 anatomy-asset).

Orthographic camera: azimuth A, elevation E (never under 25 degrees). View direction toward the viewer
V = (cosA cosE, sinA cosE, sinE); screen right R = (-sinA, cosA, 0); screen down D = (cosA sinE, sinA sinE, -cosE).
World units are inches. Solids are prisms (a convex floor outline extruded up z), painted fill, four side
tones by facing, a lighter top, crease and outline, in that order. Every colour is a CSS custom property so
the page theme decides it (light ships first).
"""
import math

TONE = ['s0', 's1', 's2', 's3']   # side tones, 0 = facing away from the light


class Cam:
    def __init__(self, az=58, el=30, k=6.0, ox=0.0, oy=0.0):
        a, e = math.radians(az), math.radians(el)
        self.V = (math.cos(a) * math.cos(e), math.sin(a) * math.cos(e), math.sin(e))
        self.R = (-math.sin(a), math.cos(a), 0.0)
        self.D = (math.cos(a) * math.sin(e), math.sin(a) * math.sin(e), -math.cos(e))
        # camera-locked light from the upper left, a little toward the viewer
        L = (self.V[0] * 0.55 - self.R[0] * 0.75, self.V[1] * 0.55 - self.R[1] * 0.75, 0.62)
        n = math.sqrt(sum(c * c for c in L))
        self.L = tuple(c / n for c in L)
        self.k, self.ox, self.oy = k, ox, oy

    def p(self, x, y, z):
        return (self.ox + self.k * (x * self.R[0] + y * self.R[1] + z * self.R[2]),
                self.oy + self.k * (x * self.D[0] + y * self.D[1] + z * self.D[2]))

    def depth(self, x, y, z):
        return x * self.V[0] + y * self.V[1] + z * self.V[2]

    def vec(self, x, y, z):
        """screen offset of a world move vector (for exploded views)"""
        return (self.k * (x * self.R[0] + y * self.R[1] + z * self.R[2]),
                self.k * (x * self.D[0] + y * self.D[1] + z * self.D[2]))


def fmt(v):
    s = f'{v:.1f}'
    return s[:-2] if s.endswith('.0') else s


def d_of(pts, close=True):
    return 'M' + 'L'.join(f'{fmt(x)} {fmt(y)}' for x, y in pts) + ('Z' if close else '')


def hull(points):
    pts = sorted(set((round(x, 2), round(y, 2)) for x, y in points))
    if len(pts) < 3:
        return pts

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
    lo, up = [], []
    for p in pts:
        while len(lo) >= 2 and cross(lo[-2], lo[-1], p) <= 0:
            lo.pop()
        lo.append(p)
    for p in reversed(pts):
        while len(up) >= 2 and cross(up[-2], up[-1], p) <= 0:
            up.pop()
        up.append(p)
    return lo[:-1] + up[:-1]


def prism(cam, plan, z0, h, cls='', top=True, bevel=0.0, inner=''):
    """plan: convex floor outline (CCW seen from above) as [(x, y)]. Returns SVG for one solid."""
    z1 = z0 + h
    bot = [cam.p(x, y, z0) for x, y in plan]
    tp = [cam.p(x, y, z1) for x, y in plan]
    out = [f'<path class="f" d="{d_of(hull(bot + tp))}"/>']
    n = len(plan)
    cre = []
    for i in range(n):
        (x0, y0), (x1, y1) = plan[i], plan[(i + 1) % n]
        dx, dy = x1 - x0, y1 - y0
        ln = math.hypot(dx, dy) or 1
        nx, ny = dy / ln, -dx / ln          # outward normal for a CCW ring
        if nx * cam.V[0] + ny * cam.V[1] <= 1e-6:
            continue
        lit = nx * cam.L[0] + ny * cam.L[1]
        t = 0 if lit < -0.25 else 1 if lit < 0.1 else 2 if lit < 0.45 else 3
        quad = [bot[i], bot[(i + 1) % n], tp[(i + 1) % n], tp[i]]
        out.append(f'<path class="{TONE[t]}" d="{d_of(quad)}"/>')
        cre.append((tp[i], tp[(i + 1) % n]))
    if top and h > 0:
        out.append(f'<path class="tp" d="{d_of(tp)}"/>')
        if bevel:
            # bevel highlight: the top ring pulled in toward its centre along the visible edges
            cx = sum(x for x, _ in plan) / n
            cy = sum(y for _, y in plan) / n
            ring = []
            for x, y in plan:
                vx, vy = cx - x, cy - y
                ln = math.hypot(vx, vy) or 1
                ring.append(cam.p(x + vx / ln * bevel, y + vy / ln * bevel, z1))
            out.append(f'<path class="bv" d="{d_of(ring)}"/>')
    if cre:
        out.append('<path class="cr" d="' + ''.join(f'M{fmt(a[0])} {fmt(a[1])}L{fmt(b[0])} {fmt(b[1])}' for a, b in cre) + '"/>')
    if inner:
        out.append(inner)
    out.append(f'<path class="ol" d="{d_of(hull(bot + tp))}"/>')
    c = f' class="{cls}"' if cls else ''
    return f'<g{c}>' + ''.join(out) + '</g>'


def box(cam, x, y, z, w, d, h, **kw):
    return prism(cam, [(x, y), (x + w, y), (x + w, y + d), (x, y + d)], z, h, **kw)


def cyl(cam, cx, cy, r, z, h, steps=24, **kw):
    pl = [(cx + r * math.cos(2 * math.pi * i / steps), cy + r * math.sin(2 * math.pi * i / steps)) for i in range(steps)]
    return prism(cam, pl, z, h, **kw)


def dot(cam, x, y, z, r=0.5, cls='dt'):
    px, py = cam.p(x, y, z)
    return f'<circle class="{cls}" cx="{fmt(px)}" cy="{fmt(py)}" r="{r}"/>'


def seg(cam, a, b, cls='ln'):
    (x0, y0), (x1, y1) = cam.p(*a), cam.p(*b)
    return f'<path class="{cls}" d="M{fmt(x0)} {fmt(y0)}L{fmt(x1)} {fmt(y1)}"/>'


def halo(cam, plan, z, blur_id):
    pts = [cam.p(x, y, z) for x, y in plan]
    return f'<path class="halo" filter="url(#{blur_id})" d="{d_of(hull(pts))}"/>'


# ---------------------------------------------------------------------------------------------
# The wall assembly: a contractor's cutaway corner of wall on a bench plinth (S0526 Apply here).
# True inches. Published: HardiePlank lap 8.25 in board, 7 in exposure (so 1.25 in lap), 5/16 in thick.
# The layers are the system the firm's siding page names: sheathing (replaced where rotten), house wrap,
# HardiePlank lap, trim, paint. Framing is drawn as a schematic: no unpublished number is shown anywhere.
# ---------------------------------------------------------------------------------------------
BOARD, EXPO, THICK = 8.25, 7.0, 5 / 16
COURSES = 7
WALL_W = 64.0
STEP = {'studs': 0.0, 'sheath': 5.0, 'wrap': 13.0, 'siding': 22.0}   # stepped cutaway: each layer stops short


def wall_assembly(id_='wall', az=58, el=30, W=760, H=560, pad=28):
    probe = Cam(az, el, 1.0)
    top_z = 1.5 + COURSES * EXPO + (BOARD - EXPO) + 6
    corners = [(x, y, z) for x in (-5, WALL_W + 6) for y in (-8, 30) for z in (-6, top_z)] + [(WALL_W + 8, 40, 30)]
    xs = [probe.p(*c)[0] for c in corners]
    ys = [probe.p(*c)[1] for c in corners]
    k = min((W - 2 * pad) / (max(xs) - min(xs)), (H - 2 * pad) / (max(ys) - min(ys)))
    cam = Cam(az, el, k)
    xs2 = [cam.p(*c)[0] for c in corners]
    ys2 = [cam.p(*c)[1] for c in corners]
    cam.ox = (W - (max(xs2) + min(xs2))) / 2
    cam.oy = (H - (max(ys2) + min(ys2))) / 2

    g = {}
    # base: plinth with feet, groove, corner screws, ruler strip and a label plate
    PL = [(-5, -8), (WALL_W + 6, -8), (WALL_W + 6, 30), (-5, 30)]
    base = [halo(cam, PL, -6, f'{id_}-blur')]
    for fx, fy in ((-1.5, -4.5), (WALL_W + 2.5, -4.5), (WALL_W + 2.5, 26.5), (-1.5, 26.5)):
        base.append(cyl(cam, fx, fy, 1.6, -6, 0.5, steps=16, cls='lo'))
        base.append(cyl(cam, fx, fy, 1.2, -5.5, 1.0, steps=16, cls='mid'))
    groove = [cam.p(x, y, -1.5) for x, y in ((-3.8, -6.8), (WALL_W + 4.8, -6.8), (WALL_W + 4.8, 28.8), (-3.8, 28.8))]
    screws = ''.join(f'<circle class="sr" cx="{fmt(cam.p(x, y, -1.5)[0])}" cy="{fmt(cam.p(x, y, -1.5)[1])}" r="{fmt(0.55 * k)}"/>'
                     + dot(cam, x, y, -1.5, 0.55) for x, y in ((-2.6, -5.6), (WALL_W + 3.6, -5.6), (WALL_W + 3.6, 27.6), (-2.6, 27.6)))
    base.append(prism(cam, PL, -4.5, 3.0, cls='lo', bevel=0.6, inner=f'<path class="gv" d="{d_of(groove)}"/>' + screws))
    # ruler strip along the front edge, graduated in inches (ticks rooted on its back edge)
    rz = -1.5
    rul = [box(cam, 0, 22, rz, WALL_W - 14, 3.2, 0.2, cls='lo')]
    ticks = ''
    for i in range(0, int(WALL_W) - 13):
        L = 1.6 if i % 4 == 0 else 0.8
        ticks += seg(cam, (i, 22, rz + 0.2), (i, 22 + L, rz + 0.2), 'tk' + (' tk-m' if i % 12 == 0 else ''))
    rul.append(f'<g>{ticks}</g>')
    base += rul
    # label plate on the plinth's top, right of the ruler
    plate = ''.join(seg(cam, (WALL_W - 10 + 1.2, 22.8 + i * 0.9, rz + 0.4), (WALL_W - 10 + 1.2 + L, 22.8 + i * 0.9, rz + 0.4), 'rl') for i, L in enumerate((7, 5, 6)))
    base.append(box(cam, WALL_W - 10, 22, rz, 9.5, 3.4, 0.4, cls='lo', inner=plate))
    g['base'] = ''.join(base)

    # framing (schematic): bottom plate, studs, top plate (structure tone)
    top_frame = 1.5 + COURSES * EXPO + (BOARD - EXPO) + 1.5
    fr = [box(cam, 0, 0, 0, WALL_W, 3.5, 1.5, cls='mid', bevel=0.3)]
    for x in (0, 16, 32, WALL_W - 1.5):
        if x > WALL_W - 1.5:
            continue
        fr.append(box(cam, x, 0, 1.5, 1.5, 3.5, top_frame - 3.0, cls='mid', bevel=0.3))
    fr.append(box(cam, 0, 0, top_frame - 1.5, WALL_W, 3.5, 1.5, cls='mid', bevel=0.3))
    g['studs'] = ''.join(fr)

    # sheathing (7/16 in panel) with nail rows that run edge to edge on the stud lines
    sh_h = top_frame
    nails = ''
    for x in (16.75, 32.75, 48.75):
        for z in range(3, int(sh_h) - 1, 6):
            nails += dot(cam, x, 3.5 + 0.44, z, 0.45)
    g['sheath'] = box(cam, STEP['sheath'], 3.5, 0, WALL_W + 0.4 - STEP['sheath'], 0.44, sh_h, cls='mid', inner=nails)

    # house wrap with one taped horizontal seam that wraps the corner and ends on both edges
    wy = 3.94
    seam = seg(cam, (STEP['wrap'], wy + 0.12, 28), (WALL_W + 0.4, wy + 0.12, 28), 'sm') + seg(cam, (WALL_W + 0.4, wy + 0.12, 28), (WALL_W + 0.4, wy, 28), 'sm')
    g['wrap'] = box(cam, STEP['wrap'], wy, 0.4, WALL_W + 0.4 - STEP['wrap'], 0.12, sh_h - 0.8, cls='hi wrap', inner=seam)

    # HardiePlank lap: starter strip, then courses bottom-up; each board laps 1.25 in over the one below
    x0 = STEP['siding']
    sid = [box(cam, x0, wy + 0.12, 1.0, WALL_W + 0.2 - x0, THICK, 1.5, cls='hi')]
    for c in range(COURSES):
        z0 = 1.0 + c * EXPO
        off = 0.06 * (c + 1)                       # each course rides out by the board below
        y1 = wy + 0.12 + off + THICK
        butt = seg(cam, (x0, y1 + 0.02, z0), (WALL_W + 0.2, y1 + 0.02, z0), 'bt')
        sid.append(f'<g class="crs" data-c="{c}">' + box(cam, x0, wy + 0.12 + off, z0, WALL_W + 0.2 - x0, THICK, BOARD, cls='hi', bevel=0.15) + butt + '</g>')
    g['siding'] = ''.join(sid)

    # corner trim board (1x4) wrapping the right end
    tz = sh_h + 0.5
    g['trim'] = (box(cam, WALL_W - 3.5, wy + 0.12 + 0.06 * COURSES + THICK, 0.6, 3.5, 0.75, tz, cls='mid', bevel=0.3)
                 + box(cam, WALL_W + 0.2, wy - 0.3, 0.6, 0.75, 4.0 + 0.06 * COURSES, tz, cls='mid', bevel=0.3))

    # exploded-view move vectors (world, inches) per assembly, outermost leaves first (S0526)
    mv = {'trim': (10, 40, 0), 'siding': (0, 30, 0), 'wrap': (0, 19, 0), 'sheath': (0, 9, 0), 'studs': (0, 0, 0)}
    order = ['base', 'studs', 'sheath', 'wrap', 'siding', 'trim']
    body = ''
    for name in order:
        if name in mv:
            sx, sy = cam.vec(*mv[name])
            body += f'<g class="asm" data-asm="{name}" data-mx="{fmt(sx)}" data-my="{fmt(sy)}">{g[name]}</g>'
        else:
            body += f'<g class="asm-base">{g[name]}</g>'
    defs = f'<defs><filter id="{id_}-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="{fmt(1.2 * k)}"/></filter></defs>'
    return (f'<svg class="iso" id="{id_}" viewBox="0 0 {W} {H}" role="img" '
            f'aria-label="A corner of wall built the way Austin Pro installs James Hardie lap: framing, sheathing, house wrap, lap courses and trim">'
            f'{defs}{body}</svg>')


if __name__ == '__main__':
    import sys
    open(sys.argv[1] if len(sys.argv) > 1 else 'wall.svg', 'w').write(wall_assembly())
