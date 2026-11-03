"""Cut the gable wall of the firm's own photo (photo3, 1400 x 1050) into its real lap boards, following the wall's
perspective: every course line runs to the measured vanishing point, boards have staggered joints, the rakes clip them,
windows and the arched window are left whole. Output: assets/photo3-boards.json (photo pixel polygons)."""
import json, os, random
HERE = os.path.dirname(os.path.abspath(__file__))
WALL = [(652, 145), (1028, 20), (1346, 612), (1341, 648), (652, 606)]          # convex, clockwise in screen space
HOLES = [(1056, 338, 1138, 502), (1166, 510, 1244, 604), (1098, 572, 1128, 608)]  # windows, arch, vent
VP = (2460, 712)
EXP = 26.0


def line_y(y_left, x):
    return y_left + (VP[1] - y_left) * (x - 652) / (VP[0] - 652)


def clip(poly, a, b):   # keep the side of edge a->b where the wall is (Sutherland-Hodgman against one edge)
    def inside(p): return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]) >= 0
    def inter(p, q):
        x1, y1, x2, y2 = *p, *q; x3, y3, x4, y4 = *a, *b
        d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
        t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / d
        return (x1 + t * (x2 - x1), y1 + t * (y2 - y1))
    out = []
    for i in range(len(poly)):
        p, q = poly[i], poly[(i + 1) % len(poly)]
        if inside(q):
            if not inside(p): out.append(inter(p, q))
            out.append(q)
        elif inside(p): out.append(inter(p, q))
    return out


def area(poly):
    return abs(sum(poly[i][0] * poly[(i + 1) % len(poly)][1] - poly[(i + 1) % len(poly)][0] * poly[i][1] for i in range(len(poly)))) / 2


random.seed(2009)
# orientation check: make WALL counter-clockwise for the inside test
if sum(WALL[i][0] * WALL[(i + 1) % len(WALL)][1] - WALL[(i + 1) % len(WALL)][0] * WALL[i][1] for i in range(len(WALL))) < 0:
    WALL = WALL[::-1]
boards = []
for i in range(0, 60):
    yb, yt = 606 - i * EXP, 606 - (i + 1) * EXP
    x = 652 - random.random() * 120
    while x < 1346:
        L = 150 + random.random() * 170
        x0, x1 = max(652, x), min(1346, x + L)
        segs = [(x0, x1)]
        for (hx0, hy0, hx1, hy1) in HOLES:
            mid_top, mid_bot = line_y(yt, (hx0 + hx1) / 2), line_y(yb, (hx0 + hx1) / 2)
            if mid_bot > hy0 and mid_top < hy1:
                segs = [s for (a, b) in segs for s in ((a, min(b, hx0 - 1)), (max(a, hx1 + 1), b)) if s[1] - s[0] > 12]
        for (a, b) in segs:
            poly = [(a, line_y(yt, a)), (b, line_y(yt, b)), (b, line_y(yb, b)), (a, line_y(yb, a))]
            for k in range(len(WALL)): poly = clip(poly, WALL[k], WALL[(k + 1) % len(WALL)]) if poly else poly
            if poly and area(poly) > 120: boards.append({'c': i, 'p': [[round(x, 1), round(y, 1)] for x, y in poly]})
        x += L
os.makedirs(os.path.join(HERE, 'assets'), exist_ok=True)
json.dump({'w': 1400, 'h': 1050, 'wall': WALL, 'holes': HOLES, 'boards': boards}, open(os.path.join(HERE, 'assets', 'photo3-boards.json'), 'w'))
print('boards', len(boards), 'courses', max(b['c'] for b in boards) + 1)

from PIL import Image, ImageDraw
im = Image.open(os.path.join(HERE, '..', '..', 'work', 'dl', 'photo3-1400.webp')).convert('RGB'); d = ImageDraw.Draw(im)
for b in boards: d.polygon([tuple(p) for p in b['p']], outline=(255, 0, 0))
im.save('/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/boards.png')
