"""Background V2 (AUSTIN-BACKGROUND-V2-CODE-COPY-2026-11-05): three relief worlds for the copied Immersive Garden
mechanism. Each world is ONE tall height field, periodic top-to-bottom, cut into panels of IG's proportions
(13.2 x 9.995 units, IG's row pitch). For every panel this writes, as greyscale WebPs (no chroma, so no channel bleed):
  h   - the height (the browser builds the mesh from it: positions + UVs only, as IG's GLB)
  l1..l5 - the same relief baked under five increasing light states (IG's levels 1-5; level 0 is the constant 0.54504)
On every level the flat ground is exactly 139/255 = 0.54504, IG's base grey, so the shader maps it to pure white.

Usage: python3 relief2.py [b1 b2 b3]   -> media/bg2/<world>/p<k>_<name>.webp + preview PNGs
"""
import math, os, sys, time
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'media', 'bg2')
PW, PH = 1024, 776                      # one panel's texture: 13.2 x 9.995 world units (IG's panel width, row pitch)
UNIT = 13.2 / PW                         # world units per texel
B0 = 139 / 255                           # IG's base grey (0.54504): flat ground on every level
MX, MY = 288, 218                        # mesh vertices per panel: 62,784 (IG low tier: 48k-67k)

# ------------------------------------------------------------------ helpers (all periodic, so panels tile without seams)
def fft_noise(h, w, scale, rng):
    """Smooth periodic noise, std 1; features about `scale` texels across."""
    f = np.fft.rfft2(rng.standard_normal((h, w)))
    ky = np.fft.fftfreq(h)[:, None]; kx = np.fft.rfftfreq(w)[None, :]
    k = np.sqrt(kx * kx + ky * ky) * scale
    f *= np.exp(-(k * k) * 4.0)
    n = np.fft.irfft2(f, s=(h, w)); return (n - n.mean()) / (n.std() + 1e-9)

def blur(a, s):
    """Periodic gaussian blur (FFT)."""
    if s <= 0: return a
    h, w = a.shape
    ky = np.fft.fftfreq(h)[:, None]; kx = np.fft.rfftfreq(w)[None, :]
    g = np.exp(-2 * (math.pi ** 2) * (s ** 2) * (kx * kx + ky * ky))
    return np.fft.irfft2(np.fft.rfft2(a) * g, s=(h, w))

def voronoi(h, w, n, rng):
    """Periodic Voronoi: cell id, distance to the nearest seed, distance to the cell border (approx, in texels)."""
    sy = rng.uniform(0, h, n); sx = rng.uniform(0, w, n)
    Y, X = np.mgrid[0:h, 0:w].astype(np.float32)
    d1 = np.full((h, w), 1e9, np.float32); d2 = np.full((h, w), 1e9, np.float32); idx = np.zeros((h, w), np.int32)
    for i in range(n):
        dy = np.abs(Y - sy[i]); dy = np.minimum(dy, h - dy)
        dx = np.abs(X - sx[i]); dx = np.minimum(dx, w - dx)
        d = np.sqrt(dx * dx + dy * dy)
        closer = d < d1
        d2 = np.where(closer, d1, np.minimum(d2, d)); idx = np.where(closer, i, idx); d1 = np.where(closer, d, d1)
    return idx, d1, (d2 - d1) * 0.5

def saw(t):
    return t - np.floor(t)

# ------------------------------------------------------------------ the bake: IG's levels are light states of one relief
def bake(h, depth):
    """h: 0..1 height field (periodic vertically). depth: relief depth in world units. Returns levels 1..5 as 0..1."""
    z = h * depth
    gy, gx = np.gradient(z)                              # per texel
    gx /= UNIT; gy /= UNIT; gy = -gy                     # image rows run down; world y runs up
    n = np.stack([-gx, -gy, np.ones_like(z)], -1); n /= np.linalg.norm(n, axis=-1, keepdims=True)
    cav = np.clip((blur(z, 6) - z) / (depth * 0.12 + 1e-6), 0, 1)       # cavities (ambient occlusion)
    levels = []
    for k in range(1, 6):
        t = (k - 1) / 4
        el = math.radians(70 - 38 * t)                   # light lowers as the reveal grows: more raking, longer shadows
        az = math.radians(150 - 30 * t)                  # and swings round from the upper left
        L = np.array([math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el)])
        diff = np.clip(n @ L, 0, 1) / math.sin(el)       # 1 on the flat ground
        # cast shadows: march toward the light; anything above the ray shadows the texel (soft by excess height)
        dx, dy = math.cos(az), -math.sin(az)             # in image space (rows down)
        tanel = math.tan(el)
        occl = np.zeros_like(z)
        for s in range(1, 26):
            d = s * 1.5
            sh = np.roll(np.roll(z, int(round(-dy * d)), 0), int(round(-dx * d)), 1)
            ex = sh - (z + d * UNIT * tanel)
            occl = np.maximum(occl, ex)
        shadow = 1 - np.clip(occl / (depth * 0.22 + 1e-6), 0, 1) * (0.18 + 0.26 * t)
        ao = 1 - cav * (0.15 + 0.3 * t)
        shade = (0.35 + 0.65 * diff) * shadow * ao + 0.0
        shade = shade / 1.0                              # the flat, open ground: 0.35 + 0.65 = 1 -> exactly B0 below
        lv = np.clip(B0 * (1 + (shade - 1) * (0.4 + 0.45 * t)), 0, 1)   # contrast rises level by level
        levels.append(lv.astype(np.float32))
    return levels

def write_world(name, h, depth, npan):
    d = os.path.join(OUT, name); os.makedirs(d, exist_ok=True)
    t0 = time.time(); lv = bake(h, depth); print(name, 'baked', round(time.time() - t0, 1), 's')
    q8 = lambda a: Image.fromarray(np.clip(np.round(a * 255), 0, 255).astype(np.uint8), 'L')
    sizes = 0
    for k in range(npan):
        rows = slice(k * PH, (k + 1) * PH)
        ims = [('h', q8(h[rows]))] + [(f'l{i + 1}', q8(lv[i][rows])) for i in range(5)]
        for nm, im in ims:
            if nm == 'h': im = im.resize((MX, MY), Image.LANCZOS)          # the mesh's own grid: positions only
            p = os.path.join(d, f'p{k}_{nm}.webp'); im.save(p, 'WEBP', quality=62 if nm != 'h' else 90, method=6); sizes += os.path.getsize(p)
    # previews: the full world under level 5 and level 3, and one panel's six states side by side
    q8(lv[4]).resize((PW // 2, h.shape[0] // 2)).save(os.path.join(d, 'preview_l5.png'))
    strip = [q8(h[:PH])] + [q8(np.full((PH, PW), B0, np.float32))] + [q8(lv[i][:PH]) for i in range(5)]
    sh = Image.new('L', (PW // 2 * 4 + 30, PH // 2 * 2 + 10), 255)
    for i, im in enumerate(strip[1:]):
        sh.paste(im.resize((PW // 2, PH // 2)), ((i % 4) * (PW // 2 + 10), (i // 4) * (PH // 2 + 10)))
    sh.paste(strip[0].resize((PW // 2, PH // 2)), (3 * (PW // 2 + 10), PH // 2 + 10))
    sh.save(os.path.join(d, 'preview_levels.png'))
    print(name, npan, 'panels', round(sizes / 1024), 'KB')
    import json; json.dump({'depth': depth, 'npan': npan, 'mx': MX, 'my': MY}, open(os.path.join(d, 'world.json'), 'w'))

# ------------------------------------------------------------------ small sculpted things (owner, 2026-11-05: "small things, with gap
# between, and connected ... lots of different things and different places", as Immersive Garden's panels)
def sd_box(x, y, hw, hh, r=0.0):
    qx = np.abs(x) - hw + r; qy = np.abs(y) - hh + r
    return np.hypot(np.maximum(qx, 0), np.maximum(qy, 0)) + np.minimum(np.maximum(qx, qy), 0) - r
def sd_seg(x, y, ax, ay, bx, by):
    px, py, dx, dy = x - ax, y - ay, bx - ax, by - ay
    t = np.clip((px * dx + py * dy) / (dx * dx + dy * dy + 1e-9), 0, 1)
    return np.hypot(px - dx * t, py - dy * t)
def raised(sd, h, bevel=2.5):                     # a flat-topped form with a rounded edge
    return np.where(sd < 0, h * np.clip(-sd / bevel, 0, 1) ** 0.55, 0)
def tube(d, r, h):                                 # a round rod: hoses, rails, handles
    return h * np.sqrt(np.clip(1 - (d / r) ** 2, 0, 1))
M = np.maximum

def make_house(w=30, wall=22, roofh=24, kind='gable', storeys=1, chim=True, porch=False):
    """A small house in elevation, the right way up (local y up): siding courses, windows, a door, a roof in shingle courses."""
    top = wall                                                          # the wall spans y 0..wall, the roof sits above it
    def f(x, y):
        y = y + wall * 0.55                                             # centre the whole house on the stamp point
        body = raised(sd_box(x, y - wall / 2, w, wall / 2, 1.2), 0.52)
        body = body + 0.035 * saw(y / 3.2) * (sd_box(x, y - wall / 2, w - 1.5, wall / 2 - 1) < 0)
        ry = y - top
        if kind == 'gable': prof = np.clip(1 - np.abs(x) / (w + 4), 0, 1)
        elif kind == 'hip': prof = np.clip((1 - np.abs(x) / (w + 4)) * 1.6, 0, 1)
        else: prof = np.clip((x + w + 4) / (2 * w + 8), 0, 1) * (np.abs(x) < w + 4)
        inroof = (ry >= 0) & (ry < roofh * prof) & (np.abs(x) < w + 4)
        roof = np.where(inroof, 0.6 + 0.22 * prof + 0.03 * saw(ry / 2.8), 0)
        h = M(body, roof)
        h = M(h, raised(sd_box(x, y - top, w + 4, 1.4, 0.7), 0.74))         # eave and gutter
        rows = [wall * 0.5] if storeys == 1 else [wall * 0.3, wall * 0.72]
        for wy in rows:
            for wx in ([-w * 0.55, w * 0.55] if storeys == 1 else [-w * 0.6, 0, w * 0.6]):
                if storeys == 2 and wy == rows[0] and wx == 0: continue
                fm = sd_box(x - wx, y - wy, 4.5, 5.5, 0.6) < 0; gm = sd_box(x - wx, y - wy, 3, 4) < 0
                h = np.where(fm, np.where(gm, 0.36 + 0.18 * (np.abs(x - wx) < 0.6), 0.64), h)
        dm = sd_box(x, y - 7, 4, 7, 0.6) < 0; h = np.where(dm, np.where(sd_box(x, y - 7, 2.8, 6) < 0, 0.4, 0.62), h)
        h = M(h, tube(np.hypot(x - 1.8, y - 7), 0.9, 0.7) * dm)
        if porch: h = M(h, raised(sd_box(x, y - 15, 9, 1.2), 0.7) + tube(np.abs(np.abs(x) - 8), 1, 0.6) * ((y > 0) & (y < 15) & (np.abs(np.abs(x) - 8) < 1)))
        if chim: h = M(h, raised(sd_box(x - w * 0.45, y - top - roofh * 0.55, 3, roofh * 0.45), 0.92, 1.2))
        return h
    return f
o_house = make_house()

def o_window(x, y):
    h = raised(sd_box(x, y, 20, 26, 1), 0.62)
    glass = sd_box(x, y + 1, 15, 21) < 0
    h = np.where(glass, 0.28 + 0.04 * np.clip((x + y) / 60, -1, 1), h)
    h = M(h, np.where(glass & ((np.abs(x) < 1.3) | (np.abs(y + 1) < 1.3)), 0.55, 0))
    return M(h, raised(sd_box(x, y - 29, 25, 3.5, 1.5), 0.78))                               # the sill
def o_door(x, y):
    h = raised(sd_box(x, y, 18, 32, 1), 0.6)
    for py in (-17, 0, 17):
        for px in (-8, 8):
            h = np.where(sd_box(x - px, y - py, 5.5, 6.5, 1) < 0, 0.46, h)
    return M(h, tube(np.hypot(x - 12, y + 2), 2.4, 0.85))
def o_ladder(x, y):
    h = M(tube(np.abs(x + 10), 2.4, 0.7), tube(np.abs(x - 10), 2.4, 0.7)) * (np.abs(y) < 48)
    rung = (np.abs(x) < 10) & (np.abs(((y + 48) % 12) - 6) < 1.6) & (np.abs(y) < 46)
    return M(h, np.where(rung, 0.55, 0))
def o_hammer(x, y):
    h = tube(sd_seg(x, y, 0, -34, 0, 18), 3.6, 0.6)
    head = raised(sd_box(x - 4, y - 24, 16, 5.5, 2), 0.85, 2)
    claw = raised(sd_box(x + 16, y - 21, 6, 2.5, 1.5), 0.7) + raised(sd_box(x + 16, y - 27, 6, 2.5, 1.5), 0.7)
    return M(M(h, head), claw)
def o_paintcan(x, y):
    body = raised(sd_box(x, y, 17, 19, 3), 0.6)
    body = body + 0.06 * ((np.abs(y - 15) < 1.4) | (np.abs(y + 15) < 1.4)) * (np.abs(x) < 17)
    handle = tube(np.abs(np.hypot(x, y - 18) - 15), 1.5, 0.55) * (y > 18)
    drip = raised(sd_box(x - 9, y + 4, 2.5, 9, 2.5), 0.66) * (sd_box(x, y, 17, 19, 3) < 0)
    return M(M(body, handle), drip)
def o_roller(x, y):
    roll = raised(sd_box(x, y - 14, 22, 8, 7), 0.75, 4) + 0.04 * (saw(x / 2.5) - 0.5) * (sd_box(x, y - 14, 21, 7, 6) < 0)
    frame = tube(sd_seg(x, y, 23, -14 + 14, 23, -2), 1.6, 0.5)
    frame = M(frame, tube(sd_seg(x, y, 23, -2, 0, -6), 1.6, 0.5))
    return M(M(roll, frame), tube(sd_seg(x, y, 0, -6, 0, -40), 3.4, 0.62))
def o_shingles(x, y):
    h = np.zeros_like(x)
    for i, (dx, dy) in enumerate([(-4, -12), (2, 0), (-2, 12)]):
        strip = sd_box(x - dx, y - dy, 30, 6, 1) < 0
        tab = saw((x - dx + i * 7) / 15) > 0.08
        h = np.where(strip, 0.45 + 0.12 * i + 0.1 * tab * (y - dy < 2), h)
    return h
def o_boards(x, y):
    h = np.zeros_like(x)
    for i in range(5):
        dy = (i - 2) * 7.5; dx = ((i * 37) % 9) - 4
        m = sd_box(x - dx, y - dy, 40, 3.2, 0.8) < 0
        h = np.where(m, 0.38 + 0.08 * i + 0.03 * np.sin((x - dx) * 0.6 + i), h)
    return h
def o_gutter(x, y):
    trough = tube(np.abs(y), 6, 0.6) * (np.abs(x) < 40) - tube(np.abs(y - 1.5), 3.5, 0.25) * (np.abs(x) < 38)
    end = raised(sd_box(x - 40, y, 2, 7, 1), 0.7)
    spout = tube(sd_seg(x, y, 30, -6, 30, -40), 4, 0.6)
    elbow = tube(sd_seg(x, y, 30, -40, 40, -48), 4, 0.6)
    return M(M(np.clip(trough, 0, 1), end), M(spout, elbow))
def o_level(x, y):
    h = raised(sd_box(x, y, 42, 5.5, 1.5), 0.6)
    vial = sd_box(x, y, 7, 3.2, 3) < 0
    h = np.where(vial, 0.42 + tube(np.hypot(x - 1.5, y), 2.2, 0.15), h)
    return M(h, raised(sd_box(x + 30, y, 4, 3.2, 3), 0.5) * 0)
def o_tape(x, y):
    case = raised(sd_box(x, y, 15, 15, 6), 0.7, 3)
    ring = tube(np.abs(np.hypot(x, y) - 8), 1.6, 0.25)
    tape = raised(sd_box(x + 30, y + 12, 18, 2.6), 0.5, 1) * (x + 30 > -14)
    return M(M(case, case * 0 + ring * (case > 0) + 0.7 * (case > 0.69)), tape)
def o_saw(x, y):
    blade = (x > -30) & (x < 22) & (np.abs(y) < 6 + (x + 30) * 0.08)
    teeth = (y < 0) & (saw(x / 4) < 0.5) & (np.abs(y) > 4 + (x + 30) * 0.08 - 2.5)
    h = np.where(blade & ~teeth, 0.5, 0)
    grip = raised(sd_box(x - 32, y, 11, 9, 5), 0.8, 3) - raised(sd_box(x - 32, y, 5, 3.5, 3), 0.8, 1.5)
    return M(h, np.clip(grip, 0, 1))
def o_toolbox(x, y):
    h = raised(sd_box(x, y, 26, 15, 2), 0.62) + 0.06 * (sd_box(x, y - 8, 26, 1.2) < 0)
    return M(h, tube(np.abs(np.hypot(x, y - 15) - 10), 2, 0.7) * (y > 15))
def o_nails(x, y, rng=np.random.default_rng(3)):
    h = np.zeros_like(x)
    for i in range(6):
        a = i * 1.05; ox, oy = math.cos(a * 2.3) * 14, math.sin(a * 1.7) * 12; ang = a * 2.1
        ex, ey = ox + math.cos(ang) * 14, oy + math.sin(ang) * 14
        h = M(h, tube(sd_seg(x, y, ox, oy, ex, ey), 1.3, 0.4)); h = M(h, tube(np.hypot(x - ox, y - oy), 3, 0.55))
    return h
def o_bricks(x, y):
    row = np.floor((y + 24) / 8); off = (row % 2) * 8
    inb = (np.abs(x) < 24) & (np.abs(y) < 24)
    joint = (saw((y + 24) / 8) < 0.16) | (saw((x + 24 + off) / 16) < 0.08)
    return np.where(inb, np.where(joint, 0.38, 0.6), 0)
def o_garage(x, y):
    h = raised(sd_box(x, y, 30, 22, 1), 0.58)
    return np.where((sd_box(x, y, 26, 18) < 0) & (saw((y + 18) / 9) < 0.14), 0.45, h)

TOOLS = [o_window, o_door, o_ladder, o_hammer, o_paintcan, o_roller, o_shingles, o_boards, o_gutter, o_level, o_tape, o_saw, o_toolbox, o_nails, o_bricks, o_garage, o_house]

def poisson(Hh, Ww, r, rng, k=24):
    """Bridson disc sampling, periodic in y: points at least r apart."""
    cell = r / math.sqrt(2); gh, gw = int(math.ceil(Hh / cell)), int(math.ceil(Ww / cell)); grid = -np.ones((gh, gw), int)
    pts = []; act = []
    def ok(p):
        gy, gx = int(p[0] / cell), int(p[1] / cell)
        for yy in range(gy - 2, gy + 3):
            for xx in range(max(0, gx - 2), min(gw, gx + 3)):
                j = grid[yy % gh, xx]
                if j >= 0:
                    dy = abs(pts[j][0] - p[0]); dy = min(dy, Hh - dy)
                    if dy * dy + (pts[j][1] - p[1]) ** 2 < r * r: return False
        return True
    p0 = (rng.uniform(0, Hh), rng.uniform(0, Ww)); pts.append(p0); act.append(0); grid[int(p0[0] / cell) % gh, int(p0[1] / cell)] = 0
    while act:
        i = act[rng.integers(len(act))]; found = False
        for _ in range(k):
            a = rng.uniform(0, 2 * math.pi); d = rng.uniform(r, 2 * r)
            p = ((pts[i][0] + math.sin(a) * d) % Hh, pts[i][1] + math.cos(a) * d)
            if 0 <= p[1] < Ww and ok(p):
                pts.append(p); act.append(len(pts) - 1); grid[int(p[0] / cell) % gh, int(p[1] / cell)] = len(pts) - 1; found = True; break
        if not found: act.remove(i)
    return pts

def stamp(h, fn, cy, cx, ang, sc, R=62):
    """Draw one thing (local units ~ texels at scale 1), rotated and scaled, into the periodic field by max."""
    Hh, Ww = h.shape; r = int(R * sc) + 2
    ys = np.arange(int(cy) - r, int(cy) + r + 1); xs = np.arange(max(0, int(cx) - r), min(Ww, int(cx) + r + 1))
    if not len(xs): return
    YY, XX = np.meshgrid(ys, xs, indexing='ij'); dy = YY - cy; dx = XX - cx
    c, s_ = math.cos(ang), math.sin(ang)
    lx = (c * dx + s_ * dy) / sc; ly = -(-s_ * dx + c * dy) / sc          # local y up
    v = fn(lx.astype(np.float32), ly.astype(np.float32))
    yi = ys % Hh; h[np.ix_(yi, xs)] = np.maximum(h[np.ix_(yi, xs)], v)

def cord(h, pts, r, hgt, sag, rng):
    """A hose, cord or line through points: a smooth sagging curve, stamped as a round rod."""
    Hh, Ww = h.shape
    P = np.array(pts, float)
    for (y0, x0), (y1, x1) in zip(P[:-1], P[1:]):
        dy = y1 - y0
        if abs(dy) > Hh / 2: y1 = y1 - np.sign(dy) * Hh           # the short way round the periodic stack
        L = math.hypot(y1 - y0, x1 - x0); n = max(2, int(L / 1.2)); bend = rng.uniform(-sag, sag) * L
        for t in np.linspace(0, 1, n):
            nx, ny = -(y1 - y0) / (L + 1e-9), (x1 - x0) / (L + 1e-9)
            k = 4 * t * (1 - t) * bend; y = y0 + (y1 - y0) * t + ny * 0 + nx * 0; x = x0 + (x1 - x0) * t
            y += k * ((x1 - x0) / (L + 1e-9)); x -= k * ((y1 - y0) / (L + 1e-9))
            ri = int(r) + 1; ys = np.arange(int(y) - ri, int(y) + ri + 1); xs = np.arange(max(0, int(x) - ri), min(Ww, int(x) + ri + 1))
            if not len(xs): continue
            YY, XX = np.meshgrid(ys, xs, indexing='ij'); v = tube(np.hypot(YY - y, XX - x), r, hgt)
            yi = ys % Hh; h[np.ix_(yi, xs)] = np.maximum(h[np.ix_(yi, xs)], v)

# ------------------------------------------------------------------ B1 THE YARD (relief terrain, rebuilt): tools and materials,
# small and separate, scattered in clusters with open ground between, joined by hoses, cords and chalk lines
def world_b1():
    rng = np.random.default_rng(11); npan = 6; Hh, Ww = PH * npan, PW
    h = np.zeros((Hh, Ww), np.float32)
    dens = fft_noise(Hh, Ww, 260, rng)                                   # where things gather and where the ground is open
    pts = [p for p in poisson(Hh, Ww, 84, rng) if dens[int(p[0]) % Hh, int(min(p[1], Ww - 1))] > -0.25]
    for (y, x) in pts:
        fn = TOOLS[rng.integers(len(TOOLS) - 1)]                          # (no houses in the yard)
        stamp(h, fn, y, x, rng.uniform(-math.pi, math.pi), rng.uniform(0.85, 1.15), R=70)
    # connections: each thing links to one or two neighbours by a hose or cord (sagging) or a chalk line (straight)
    P = np.array(pts)
    for i, (y, x) in enumerate(pts):
        dy = np.abs(P[:, 0] - y); dy = np.minimum(dy, Hh - dy); d = np.hypot(dy, P[:, 1] - x); d[i] = 1e9
        for j in np.argsort(d)[:2]:
            if d[j] > 170 or rng.random() < 0.45 or j < i: continue
            if rng.random() < 0.7: cord(h, [(y, x), tuple(P[j])], 2.0, 0.38, 0.35, rng)
            else: cord(h, [(y, x), tuple(P[j])], 0.9, 0.18, 0.0, rng)
    h = blur(h, 0.9); h = np.clip(h / max(1e-6, h.max()), 0, 1)
    return h, 0.42, npan

# ------------------------------------------------------------------ B2 STREET OF ROOFS (rebuilt): small separate houses in loose
# streets, each with its own yard, joined by fences, paths and sagging power lines; about 16 houses per screen width
def world_b2():
    rng = np.random.default_rng(23); npan = 6; Hh, Ww = PH * npan, PW
    h = np.zeros((Hh, Ww), np.float32)
    dens = fft_noise(Hh, Ww, 220, rng)
    pts = [p for p in poisson(Hh, Ww, 70, rng) if dens[int(p[0]) % Hh, int(min(p[1], Ww - 1))] > -0.45]
    kinds = ['gable', 'gable', 'hip', 'shed']
    for (y, x) in pts:
        r = rng.random()
        if r < 0.8:
            fn = make_house(w=float(rng.uniform(22, 34)), wall=float(rng.uniform(16, 26)), roofh=float(rng.uniform(14, 26)), kind=kinds[rng.integers(4)],
                            storeys=1 if rng.random() < 0.65 else 2, chim=rng.random() < 0.45, porch=rng.random() < 0.3)
        else: fn = [o_garage, o_toolbox, o_ladder][rng.integers(3)]
        stamp(h, fn, y, x, rng.uniform(-0.03, 0.03), rng.uniform(0.8, 1.05), R=64)
    P = np.array(pts); poles = []
    for i_, (y, x) in enumerate(pts):
        dy = np.abs(P[:, 0] - y); dy = np.minimum(dy, Hh - dy); d = np.hypot(dy, P[:, 1] - x); d[i_] = 1e9
        for j_ in np.argsort(d)[:2]:
            if j_ < i_ or d[j_] > 140: continue
            rr = rng.random()
            if rr < 0.4: cord(h, [(y + 26, x), (P[j_][0] + 26, P[j_][1])], 2.2, 0.16, 0.05, rng)          # a path between the yards
            elif rr < 0.7:                                                                             # a picket fence
                y0, x0 = y + 20, x; y1, x1 = P[j_][0] + 20, P[j_][1]; cord(h, [(y0, x0), (y1, x1)], 0.9, 0.3, 0, rng)
                L = math.hypot(y1 - y0, x1 - x0)
                for t in np.arange(0.05, 1, 6 / max(L, 1)): cord(h, [(y0 + (y1 - y0) * t - 4, x0 + (x1 - x0) * t), (y0 + (y1 - y0) * t + 4, x0 + (x1 - x0) * t)], 0.9, 0.36, 0, rng)
            else: poles.append(((y - 40, x + 30), (P[j_][0] - 40, P[j_][1] + 30)))                    # a power line
    for a, b in poles:
        cord(h, [a, (a[0] + 34, a[1])], 1.2, 0.5, 0, rng); cord(h, [b, (b[0] + 34, b[1])], 1.2, 0.5, 0, rng); cord(h, [a, b], 0.7, 0.26, 0.15, rng)
    h = blur(h, 0.7); h = np.clip(h / max(1e-6, h.max()), 0, 1)
    return h, 0.36, npan

# ------------------------------------------------------------------ B3 MATERIAL FIELD (rebuilt): small samples of the materials,
# shallow, set apart on the ground and joined by thin trim strips and chalk lines: the quietest world
def m_lap(x, y):
    m = sd_box(x, y, 34, 22, 1.5) < 0; s = saw((y + 22) / 9)
    return np.where(m, 0.4 + 0.25 * s + 0.04 * np.sin(x * 0.7 + y * 0.2), 0)
def m_shingle(x, y): return o_shingles(x, y)
def m_glass(x, y):
    h = raised(sd_box(x, y, 24, 18, 1), 0.5); return np.where(sd_box(x, y, 20, 14) < 0, 0.3, h)
def m_shake(x, y):
    m = sd_box(x, y, 30, 20, 2) < 0; w = saw((x + 30 + np.floor((y + 20) / 13) * 5) / 11)
    return np.where(m, (0.35 + 0.3 * saw((y + 20) / 13)) * (w > 0.08), 0)
def m_batten(x, y):
    m = sd_box(x, y, 28, 24, 1) < 0; return np.where(m, 0.38 + 0.3 * (saw((x + 28) / 14) < 0.2), 0)
MATS = [m_lap, m_shingle, m_glass, m_shake, m_batten, o_bricks, o_nails]
def world_b3():
    rng = np.random.default_rng(37); npan = 4; Hh, Ww = PH * npan, PW
    h = np.zeros((Hh, Ww), np.float32)
    pts = poisson(Hh, Ww, 112, rng)
    for (y, x) in pts: stamp(h, MATS[rng.integers(len(MATS))], y, x, rng.uniform(-0.5, 0.5), rng.uniform(0.95, 1.3), R=70)
    P = np.array(pts)
    for i, (y, x) in enumerate(pts):
        dy = np.abs(P[:, 0] - y); dy = np.minimum(dy, Hh - dy); d = np.hypot(dy, P[:, 1] - x); d[i] = 1e9
        j = int(np.argmin(d))
        if j > i and rng.random() < 0.6: cord(h, [(y, x), tuple(P[j])], 0.9, 0.22, 0.0, rng)
    h = blur(h, 0.8); h = np.clip(h / max(1e-6, h.max()), 0, 1)
    return h, 0.24, npan

def common():
    rng = np.random.default_rng(5); d = os.path.join(OUT, 'common'); os.makedirs(d, exist_ok=True)
    pl = 0.921 + 0.016 * (0.7 * fft_noise(512, 512, 1.2, rng) + 0.3 * fft_noise(512, 512, 6, rng))
    mk = 0.536 + 0.188 * fft_noise(512, 512, 40, rng)
    at = np.stack([0.5 + 0.06 * fft_noise(256, 256, 18, rng) for _ in range(3)], -1)
    Image.fromarray((np.clip(pl, 0, 1) * 255).round().astype(np.uint8), 'L').save(os.path.join(d, 'plaster.webp'), 'WEBP', quality=80)
    Image.fromarray((np.clip(mk, 0, 1) * 255).round().astype(np.uint8), 'L').save(os.path.join(d, 'mask.webp'), 'WEBP', quality=80)
    Image.fromarray((np.clip(at, 0, 1) * 255).round().astype(np.uint8), 'RGB').save(os.path.join(d, 'att.webp'), 'WEBP', quality=85)

WORLDS = {'b1': world_b1, 'b2': world_b2, 'b3': world_b3}
if __name__ == '__main__':
    if 'common' in sys.argv[1:] or not sys.argv[1:]: common()
    for nm in [x for x in (sys.argv[1:] or list(WORLDS)) if x != 'common']:
        t0 = time.time(); h, depth, npan = WORLDS[nm](); print(nm, 'field', h.shape, round(time.time() - t0, 1), 's')
        write_world(nm, h.astype(np.float32), depth, npan)
