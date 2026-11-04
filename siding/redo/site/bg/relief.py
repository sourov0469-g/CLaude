"""Austin hidden world: bas-relief panels sculpted as height fields and baked offline, following
IMMERSIVE-BACKGROUND-SPEC.md §3 (Immersive Garden's mechanism: six baked lighting levels of the same sculpt at increasing
relief depth; flat wall identical in every level; here the flat wall is pure white 1.0 and relief only darkens).

Usage: python3 relief.py [panel ...]   -> media/bg/p{n}a.webp (levels 1-3 in RGB), p{n}b.webp (levels 4-5 + grain)
"""
import math, os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'media', 'bg')
W, H = 1280, 1600
rng = np.random.default_rng(7)

# ---------------------------------------------------------------- helpers
def box(a, r, axis):
    if r < 1: return a
    c = np.cumsum(np.pad(a, [(r + 1, r) if i == axis else (0, 0) for i in range(a.ndim)], mode='edge'), axis=axis)
    n = a.shape[axis]
    hi = np.take(c, np.arange(2 * r + 1, 2 * r + 1 + n), axis=axis)
    lo = np.take(c, np.arange(0, n), axis=axis)
    return (hi - lo) / (2 * r + 1)

def blur(a, s):
    """~Gaussian blur (three box passes) with sigma s."""
    if s <= 0: return a
    r = max(1, int(round(math.sqrt(12 * s * s / 3 + 1) / 2)))
    for _ in range(3):
        a = box(box(a, r, 0), r, 1)
    return a

Y, X = np.mgrid[0:H, 0:W].astype(np.float32)

class Field:
    def __init__(s): s.h = np.zeros((H, W), np.float32)
    def put(s, v): np.maximum(s.h, v, out=s.h)          # forms join by max (a raised form never cuts what is beside it)
    def cut(s, mask, depth): s.h = np.where(mask, np.minimum(s.h, depth), s.h)

def rect(x0, y0, x1, y1): return (X >= x0) & (X < x1) & (Y >= y0) & (Y < y1)

def cyl_h(x0, y0, x1, y1, r, base):
    """a cylinder of radius r lying along the segment (x0,y0)-(x1,y1), top at base + r"""
    dx, dy = x1 - x0, y1 - y0; L = math.hypot(dx, dy) or 1
    t = np.clip(((X - x0) * dx + (Y - y0) * dy) / (L * L), 0, 1)
    d = np.hypot(X - (x0 + t * dx), Y - (y0 + t * dy))
    return np.where(d < r, base + np.sqrt(np.maximum(0, r * r - d * d)), 0).astype(np.float32)

def lap(mask, y0, course, base, lip):
    """lap siding: each course rises from its top edge to a proud lower lip, then steps back"""
    f = ((Y - y0) % course) / course
    return np.where(mask, base + lip * f ** 0.8, 0).astype(np.float32)

def battens(mask, x0, pitch, w, base, hgt):
    u = (X - x0) % pitch
    prof = np.where(u < w, np.sqrt(np.maximum(0, 1 - ((u - w / 2) / (w / 2)) ** 2)) * hgt, 0)
    return np.where(mask, base + prof, 0).astype(np.float32)

def shingles(mask, y0, row, tab, base, lip, slope_h=0.0, ytop=0.0):
    """roof shingle courses with offset tab slots; slope_h lets the roof plane lean back toward the ridge"""
    ry = np.floor((Y - y0) / row); f = ((Y - y0) % row) / row
    off = (ry % 2) * tab / 2
    slot = (((X + off) % tab) < 2.2) & (f > 0.25)
    lean = slope_h * np.clip((Y - ytop) / max(1, (y0 - ytop) or 1), 0, 1) if slope_h else 0
    v = base + lip * f ** 0.7 + lean - slot * lip * 0.9
    return np.where(mask, v, 0).astype(np.float32)

def tri(xa, xb, yb, apex_y, xc=None):
    """triangle mask: base (xa..xb) at yb, apex at (xc, apex_y)"""
    xc = (xa + xb) / 2 if xc is None else xc
    t = (yb - Y) / max(1, yb - apex_y)
    half = (xb - xa) / 2 * (1 - t)
    return (Y <= yb) & (Y >= apex_y) & (np.abs(X - xc) <= half)

def window(F, cx, top, w, h, wall, recess=7, sash=True):
    """a recessed window: casing proud of the wall, sill ledge, glass set back, sashes and muntins"""
    x0, x1, y1 = cx - w / 2, cx + w / 2, top + h
    cas = 7
    F.put(np.where(rect(x0 - cas, top - cas, x1 + cas, y1 + cas), wall + 5, 0))
    F.put(np.where(rect(x0 - cas - 6, y1 + cas - 2, x1 + cas + 6, y1 + cas + 7), wall + 7.5, 0))     # sill
    F.put(np.where(rect(x0 - cas - 4, top - cas - 6, x1 + cas + 4, top - cas + 1), wall + 6.5, 0))  # head trim
    F.cut(rect(x0, top, x1, y1), wall - recess)
    glass = wall - recess
    if sash:
        mid = top + h / 2
        F.put(np.where(rect(x0, mid - 3, x1, mid + 3), glass + 5, 0))                          # meeting rail
        for frame in (rect(x0, top, x1, top + 4), rect(x0, y1 - 4, x1, y1), rect(x0, top, x0 + 4, y1), rect(x1 - 4, top, x1, y1)):
            F.put(np.where(frame, glass + 3.5, 0))
        for k in (1, 2):                                                                        # muntins
            F.put(np.where(rect(x0 + w * k / 3 - 1.2, top, x0 + w * k / 3 + 1.2, y1), glass + 2, 0))
        F.put(np.where(rect(x0, top + h / 4 - 1.2, x1, top + h / 4 + 1.2), glass + 2, 0))

def door(F, cx, bottom, w, h, wall):
    x0, x1, top = cx - w / 2, cx + w / 2, bottom - h
    F.put(np.where(rect(x0 - 8, top - 8, x1 + 8, bottom), wall + 5, 0))
    F.cut(rect(x0, top, x1, bottom), wall - 6)
    for (a, b) in ((0.12, 0.42), (0.55, 0.9)):
        F.put(np.where(rect(x0 + 8, top + h * a, x1 - 8, top + h * b), wall - 2.5, 0))
    F.put(cyl_h(x1 - 12, top + h * 0.5, x1 - 12, top + h * 0.5 + 0.01, 3.5, wall - 3))

def ladder(F, x0, y0, x1, y1, base, w=34):
    dx, dy = x1 - x0, y1 - y0; L = math.hypot(dx, dy); nx, ny = -dy / L * w / 2, dx / L * w / 2
    F.put(cyl_h(x0 + nx, y0 + ny, x1 + nx, y1 + ny, 4.2, base))
    F.put(cyl_h(x0 - nx, y0 - ny, x1 - nx, y1 - ny, 4.2, base))
    n = int(L // 30)
    for i in range(1, n):
        t = i / n; px, py = x0 + dx * t, y0 + dy * t
        F.put(cyl_h(px + nx, py + ny, px - nx, py - ny, 2.6, base - 0.5))

def gutter(F, x0, x1, y, base):
    F.put(cyl_h(x0, y, x1, y, 7, base))
    for x in np.arange(x0 + 30, x1 - 10, 80): F.put(np.where(rect(x - 2, y - 8, x + 2, y + 2), base + 8, 0))

def house(F, x0, x1, ground, wall_h, roof_h, kind='lap', wall=18, roof='gable', win=(), drs=(), chimney=None):
    top = ground - wall_h
    body = rect(x0, top, x1, ground)
    bulge = np.where(body, 7 * (1 - ((X - (x0 + x1) / 2) / ((x1 - x0) / 2)) ** 2), 0).astype(np.float32)
    if kind == 'lap': F.put(lap(body, top, 13, wall, 4.8) + bulge)
    else: F.put(np.where(body, wall, 0) + bulge); F.put(battens(body, x0 + 12, 44, 8, wall, 3.4) + bulge)
    F.put(np.where(rect(x0 - 2, top, x0 + 12, ground), wall + 4, 0)); F.put(np.where(rect(x1 - 12, top, x1 + 2, ground), wall + 4, 0))   # corner boards
    F.put(np.where(rect(x0 - 6, ground - 10, x1 + 6, ground), wall + 2, 0))                                                       # skirt
    eave = top
    if roof == 'gable':
        m = tri(x0 - 26, x1 + 26, eave + 6, eave - roof_h)
        F.put(shingles(m, eave + 6, 11, 26, wall + 10, 3.6, slope_h=-16, ytop=eave - roof_h))
        g = tri(x0 + 30, x1 - 30, eave + 2, eave - roof_h + 34)                                         # gable end in the field
        F.put(lap(g, eave, 13, wall + 1, 3.0))
    else:  # hip: trapezoid
        inset = roof_h * 0.9
        t = (eave + 6 - Y) / roof_h
        m = (Y <= eave + 6) & (Y >= eave - roof_h) & (X >= x0 - 26 + inset * t) & (X <= x1 + 26 - inset * t)
        F.put(shingles(m, eave + 6, 11, 26, wall + 10, 3.6, slope_h=-16, ytop=eave - roof_h))
    F.put(np.where(rect(x0 - 26, eave - 2, x1 + 26, eave + 8), wall + 12.5, 0))                       # fascia
    gutter(F, x0 - 22, x1 + 22, eave + 12, wall + 9)
    F.put(cyl_h(x1 + 12, eave + 16, x1 + 12, ground - 4, 5.5, wall + 5))                              # downspout
    if chimney:
        cx, cw = chimney
        F.put(np.where(rect(cx - cw / 2, eave - roof_h - 30, cx + cw / 2, eave - roof_h * 0.45), wall + 22, 0))
        F.put(np.where(rect(cx - cw / 2 - 6, eave - roof_h - 38, cx + cw / 2 + 6, eave - roof_h - 28), wall + 24, 0))
    for (cx, wy, ww, wh) in win: window(F, cx, top + wy, ww, wh, wall)
    for (cx, dw, dh) in drs: door(F, cx, ground - 10, dw, dh, wall)

# ---------------------------------------------------------------- panels
def panel1():
    """The street: three Austin houses shoulder to shoulder, ladder and plank, fence and pavement; a second row behind"""
    F = Field()
    # far row: a skyline of roofs, chimneys and gables, low relief, so the top of the hero is never empty
    far = Field()
    for i, x0 in enumerate(range(-40, 1300, 150)):
        w = 150 + (i % 3) * 30; gx0 = x0; gx1 = x0 + w; eave = 250 + (i % 2) * 18
        mm = tri(gx0, gx1, eave, eave - 70 - (i % 3) * 18)
        far.put(shingles(mm, eave, 9, 22, 6, 2.2, slope_h=-6, ytop=eave - 90))
        far.put(lap(rect(gx0 + 12, eave, gx1 - 12, eave + 40), eave, 10, 5, 2.0))
        if i % 3 == 1: far.put(np.where(rect(gx0 + w * 0.65, eave - 92, gx0 + w * 0.65 + 22, eave - 40), 12, 0))
    F.put(far.h * 0.6)
    # back row (smaller, lower relief), joined into one roofline
    for (x0, x1, g, wh, rh, k, r) in ((40, 380, 640, 190, 150, 'bb', 'hip'), (410, 860, 650, 230, 190, 'lap', 'gable'), (890, 1240, 640, 200, 160, 'lap', 'hip')):
        house(F, x0, x1, g, wh, rh, kind=k, wall=10, roof=r, win=[((x0 + x1) / 2 + d, 50, 70, 96) for d in (-(x1 - x0) / 4, (x1 - x0) / 4)],
              chimney=((x0 + x1) / 2 + 60, 46) if r == 'gable' else None)
    F.h *= 0.72
    # front row (full relief)
    house(F, 60, 470, 1380, 360, 230, kind='lap', wall=20, roof='gable', win=[(160, 70, 84, 118), (370, 70, 84, 118), (160, 220, 84, 110)], drs=[(370, 70, 150)], chimney=(330, 54))
    house(F, 500, 830, 1400, 250, 160, kind='bb', wall=20, roof='hip', win=[(590, 66, 96, 100), (740, 66, 96, 100)], drs=[(665, 66, 140)])
    house(F, 860, 1230, 1390, 330, 210, kind='lap', wall=20, roof='gable', win=[(950, 70, 82, 112), (1140, 70, 82, 112), (1045, 210, 140, 96)])
    # porch on the right house: posts, rail, steps
    F.put(np.where(rect(880, 1218, 1215, 1232), 34, 0))
    for x in (892, 1000, 1100, 1200): F.put(cyl_h(x, 1232, x, 1380, 6, 30))
    for i, y in enumerate((1380, 1394, 1408)): F.put(np.where(rect(1000 - i * 14, y - 14, 1120 + i * 14, y), 26 - i * 4, 0))
    # ladder and scaffold plank against the middle house
    ladder(F, 520, 1395, 640, 1150, 34)
    F.put(np.where(rect(600, 1235, 820, 1247), 32, 0)); F.put(cyl_h(612, 1247, 612, 1400, 4, 28)); F.put(cyl_h(808, 1247, 808, 1400, 4, 28))
    # fence and pavement joining everything
    for x in range(20, 1260, 22):
        if not (60 <= x <= 470 or 500 <= x <= 830 or 860 <= x <= 1230): F.put(np.where(rect(x, 1300, x + 14, 1410), 14, 0))
    F.put(np.where(rect(10, 1330, 1270, 1340), 15, 0))
    F.put(np.where(rect(0, 1410, W, 1432), 9, 0)); F.put(np.where(rect(0, 1432, W, 1460), 5, 0))
    return F.h


def level_tool(F, x0, y, L, base):
    F.put(np.where(rect(x0, y, x0 + L, y + 18), base + 6, 0))
    for vx in (x0 + L / 2 - 16, x0 + 26):
        F.cut(rect(vx, y + 4, vx + 32, y + 14), base + 2); F.put(cyl_h(vx + 4, y + 9, vx + 28, y + 9, 4, base + 1.5))

def caulk_gun(F, x, y, base):
    F.put(cyl_h(x, y, x + 150, y, 13, base))                     # tube
    F.put(cyl_h(x + 150, y, x + 190, y, 4, base + 2))            # nozzle
    F.put(cyl_h(x - 40, y, x, y, 3, base + 6))                    # rod
    F.put(cyl_h(x + 40, y + 10, x + 30, y + 70, 7, base + 2))     # handle
    F.put(cyl_h(x + 62, y + 10, x + 70, y + 64, 5, base + 1))     # trigger

def panel2():
    """The wall: a lap-sided wall in raking light around a new double-hung window being fitted"""
    F = Field()
    wall = 16
    body = rect(90, 60, 1190, 1560)
    F.put(lap(body, 60, 26, wall, 6.5))                                                   # 7 in exposure, big and close
    F.put(np.where(rect(70, 60, 120, 1560), wall + 9, 0)); F.put(np.where(rect(1160, 60, 1210, 1560), wall + 9, 0))   # corner boards
    F.put(np.where(rect(70, 40, 1210, 70), wall + 12, 0))                                  # frieze
    # the window opening: housewrap shows round it, sill flashing, casing going on, sashes set
    cx, top, w, h = 640, 330, 420, 620
    F.cut(rect(cx - w / 2 - 40, top - 40, cx + w / 2 + 40, top + h + 60), wall - 3)        # siding held back
    F.put(np.where(rect(cx - w / 2 - 34, top + h + 12, cx + w / 2 + 34, top + h + 30), wall + 1, 0))   # sill flashing
    F.put(np.where(rect(cx - w / 2 - 34, top - 30, cx - w / 2 - 14, top + h + 14), wall + 0.5, 0))     # side flashing
    window(F, cx, top, w, h, wall + 2, recess=12)
    F.put(np.where(rect(cx - w / 2 - 54, top - 54, cx + w / 2 + 54, top - 38), wall + 9, 0))            # head flashing / drip cap
    level_tool(F, cx - 230, top + h + 40, 460, wall + 8)
    caulk_gun(F, cx + 330, top + h - 120, wall + 6)
    # nail heads along a course, a few boards still loose below the window
    for x in range(160, 1150, 64):
        for y in (1180, 1310): F.put(cyl_h(x, y, x + 0.01, y, 3.2, wall + 6))
    F.put(lap(rect(260, 1400, 760, 1452), 1400, 26, wall + 8, 6.5))
    ladder(F, 190, 1540, 330, 170, wall + 18, w=46)
    return F.h

def hip_roof(F, x0, y0, x1, y1, base, pitch=0.42, row=15, tab=34):
    """a hip roof seen from above: four facets rising to a ridge, shingle courses running parallel to each eave"""
    m = rect(x0, y0, x1, y1)
    dl, dr, dt, db = X - x0, x1 - X, Y - y0, y1 - Y
    d = np.minimum(np.minimum(dl, dr), np.minimum(dt, db))
    ridge = min(x1 - x0, y1 - y0) / 2 - 1
    d = np.minimum(d, ridge)
    hgt = base + d * pitch
    # which facet each pixel is on decides the direction of the course lines and of the tab slots
    along = np.where(np.minimum(dt, db) <= np.minimum(dl, dr), X, Y)
    f = (d % row) / row
    course = np.floor(d / row)
    slot = ((along + (course % 2) * tab / 2) % tab < 2.4) & (f > 0.3)
    v = hgt + 4.4 * (1 - f) ** 0.7 - slot * 3.4
    F.put(np.where(m, v, 0).astype(np.float32))
    # hips and ridge cap
    cx0, cx1 = x0 + ridge, x1 - ridge; cy0, cy1 = y0 + ridge, y1 - ridge
    top = base + ridge * pitch + 4
    if x1 - x0 >= y1 - y0: F.put(cyl_h(cx0, (y0 + y1) / 2, cx1, (y0 + y1) / 2, 6, top - 2))
    else: F.put(cyl_h((x0 + x1) / 2, cy0, (x0 + x1) / 2, cy1, 6, top - 2))
    for (ax, ay, bx, by) in ((x0, y0, cx0, cy0), (x1, y0, cx1, cy0), (x0, y1, cx0, cy1), (x1, y1, cx1, cy1)):
        n = 24
        for i in range(n):
            t0, t1 = i / n, (i + 1) / n
            F.put(cyl_h(ax + (bx - ax) * t0, ay + (by - ay) * t0, ax + (bx - ax) * t1, ay + (by - ay) * t1, 5, base + min(ridge, ridge * t1) * pitch + 2))
    # gutter round the eaves
    for (ax, ay, bx, by) in ((x0, y1 + 6, x1, y1 + 6), (x0, y0 - 6, x1, y0 - 6)):
        F.put(cyl_h(ax, ay, bx, by, 6, base - 2))
    return top

def panel3():
    """The roofscape from above: hip roofs of neighbouring houses shoulder to shoulder, mid re-roof"""
    F = Field()
    hip_roof(F, 60, 70, 600, 560, 10)
    hip_roof(F, 640, 40, 1230, 470, 10)
    hip_roof(F, 690, 520, 1220, 1060, 10)
    hip_roof(F, 40, 610, 640, 1130, 10)
    hip_roof(F, 110, 1180, 1180, 1560, 10)
    # chimney with step flashing on the first roof
    F.put(np.where(rect(380, 150, 470, 250), 120, 0)); F.put(np.where(rect(372, 142, 478, 160), 124, 0))
    for (x, y) in ((900, 220), (1000, 300), (300, 860), (820, 1400)):            # vent pipes and their boots
        F.put(cyl_h(x - 26, y, x + 26, y, 18, 70)); F.put(cyl_h(x, y - 1, x, y + 1, 13, 92))
    # mid re-roof: one facet stripped to its decking, a shingle bundle and a roofer's ladder
    F.cut(rect(880, 700, 1080, 860), 60); F.put(np.where(rect(880, 700, 1080, 860), 58, 0))
    for x in range(880, 1080, 40): F.put(np.where(rect(x, 700, x + 2, 860), 60, 0))
    for i in range(4): F.put(np.where(rect(160 + i * 3, 1290 - i * 8, 420 + i * 3, 1326 - i * 8), 80 + i * 3, 0))
    ladder(F, 620, 1600, 760, 1180, 96, w=40)
    return F.h

PANELS = {1: panel1, 2: panel2, 3: panel3}

# ---------------------------------------------------------------- bake
LIGHT = (math.radians(45), math.radians(-15))   # elevation, azimuth from straight down-screen (negative = from the left)

def shift(a, ox, oy):
    """move a by (ox, oy) without wrapping: edges are padded with the edge value"""
    p = max(abs(ox), abs(oy)) + 1
    b = np.pad(a, p, mode='edge')
    return b[p + oy:p + oy + a.shape[0], p + ox:p + ox + a.shape[1]]

def bake(h, s):
    """one lighting level: height scaled by s; flat ground = exactly 1.0; relief only darkens, softly (IG: deepest about 0.53
    of the ground, highlights only a touch above it, depth carried by shadow and AO)"""
    z = (0.55 * blur(h, 1.4) + 0.45 * blur(h, 4.5)) * s     # crisp detail on soft, rounded large forms (cast plaster)
    gy, gx = np.gradient(z)
    n = np.dstack([-gx, -gy, np.ones_like(z)]); n /= np.linalg.norm(n, axis=2, keepdims=True)
    el, az = LIGHT
    lx, ly, lz = math.sin(az) * math.cos(el), -math.cos(az) * math.cos(el), math.sin(el)
    lam = np.clip((n[..., 0] * lx + n[..., 1] * ly + n[..., 2] * lz) / lz, 0, 1.0)
    shadow = np.zeros_like(z); step = 1.5; tanel = math.tan(el)
    hl = math.hypot(lx, ly); dx, dy = lx / hl * step, ly / hl * step
    for i in range(1, 72):
        sh = shift(z, int(round(dx * i)), int(round(dy * i)))
        occ = sh - (z + i * step * tanel)
        shadow = np.maximum(shadow, np.clip(occ / 5.0, 0, 1) * (1 - i / 90))
    shadow = blur(shadow, 2.4)
    ao = np.zeros_like(z)
    for r, w in ((5, 0.45), (14, 0.35), (36, 0.2)):
        ao += w * np.clip((blur(z, r) - z) / (5 + r * 0.2), 0, 1)
    dark = 0.62 * (1 - lam) + 0.40 * shadow + 0.34 * ao
    v = 1 - np.clip(dark, 0, 0.55)
    flat = (blur(np.abs(h), 3) < 1e-3)
    v[flat] = 1.0
    return np.clip(v, 0, 1)

def grain():
    g = blur(rng.normal(0, 1, (H, W)).astype(np.float32), 1.0) * 0.6 + blur(rng.normal(0, 1, (H, W)).astype(np.float32), 6) * 2.2
    g = (g - g.min()) / (g.max() - g.min())
    return 0.94 + 0.06 * g

def run(n):
    h = PANELS[n]()
    L = [bake(h, 0.2 * k) for k in range(1, 6)]
    for i, l in enumerate(L): print(f'panel {n} level {i + 1}: min {l.min():.3f} flat(0,0) {l[5, 5]:.3f} p1 {np.percentile(l, 1):.3f}')
    to8 = lambda a: (np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8)
    A = np.dstack([to8(L[0]), to8(L[1]), to8(L[2])]); B = np.dstack([to8(L[3]), to8(L[4]), to8(grain())])
    os.makedirs(OUT, exist_ok=True)
    Image.fromarray(A).save(os.path.join(OUT, f'p{n}a.webp'), quality=82, method=6)
    Image.fromarray(B).save(os.path.join(OUT, f'p{n}b.webp'), quality=82, method=6)
    Image.fromarray(to8(L[4])).save(os.path.join(OUT, f'p{n}_preview.png'))

if __name__ == '__main__':
    for a in (sys.argv[1:] or ['1']): run(int(a))
