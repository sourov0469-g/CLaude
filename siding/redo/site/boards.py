"""Cut the siding walls of the two supplied photos into their real lap boards (course lines along each wall's own
perspective, staggered joints, holes for windows/trim). Output JSON in the photo's own pixel coordinates."""
import json, random, os

def clip(poly, a, b):
    def inside(p): return (b[0]-a[0])*(p[1]-a[1]) - (b[1]-a[1])*(p[0]-a[0]) >= 0
    def inter(p, q):
        x1, y1, x2, y2 = *p, *q; x3, y3, x4, y4 = *a, *b
        d = (x1-x2)*(y3-y4) - (y1-y2)*(x3-x4); t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4)) / d
        return (x1 + t*(x2-x1), y1 + t*(y2-y1))
    out = []
    for i in range(len(poly)):
        p, q = poly[i], poly[(i+1) % len(poly)]
        if inside(q):
            if not inside(p): out.append(inter(p, q))
            out.append(q)
        elif inside(p): out.append(inter(p, q))
    return out

def ccw(P):
    s = sum(P[i][0]*P[(i+1)%len(P)][1] - P[(i+1)%len(P)][0]*P[i][1] for i in range(len(P)))
    return P if s > 0 else P[::-1]

def area(P): return abs(sum(P[i][0]*P[(i+1)%len(P)][1] - P[(i+1)%len(P)][0]*P[i][1] for i in range(len(P)))) / 2

def wall(poly, line, y_start, exp, n, x0, x1, holes=(), Lr=(140, 300), seed=1):
    """line(yb, x) -> y of the course line through x whose y at the wall's reference edge is yb."""
    random.seed(seed); poly = ccw(poly); out = []
    for i in range(n):
        yb, yt = y_start - i*exp, y_start - (i+1)*exp
        x = x0 - random.random()*Lr[1]*0.6
        while x < x1:
            L = Lr[0] + random.random()*(Lr[1]-Lr[0]); a, b = max(x0, x), min(x1, x+L)
            segs = [(a, b)]
            for (hx0, hy0, hx1, hy1) in holes:
                mt, mb = line(yt, (hx0+hx1)/2), line(yb, (hx0+hx1)/2)
                if mb > hy0 and mt < hy1: segs = [s for (p, q) in segs for s in ((p, min(q, hx0)), (max(p, hx1), q)) if s[1]-s[0] > 10]
            for (p, q) in segs:
                P = [(p, line(yt, p)), (q, line(yt, q)), (q, line(yb, q)), (p, line(yb, p))]
                for k in range(len(poly)):
                    if P: P = clip(P, poly[k], poly[(k+1) % len(poly)])
                if P and area(P) > 90: out.append({'c': i, 'p': [[round(u, 1), round(v, 1)] for u, v in P]})
            x += L
    return out

S = 1900/1400   # charcoal: walls measured on the 1400 view, original is 1900 wide
VP = (-1128, 830)
def lineL(yb, x):   # left gable wall: courses run to a vanishing point far to the left; yb is the course's y at x=175
    return yb + (VP[1]-yb) * (x-175) / (VP[0]-175)
left = wall([(205, 225), (300, 52), (546, 296), (546, 398), (175, 500)], lineL, 500, 22.5, 22, 175, 550, seed=3)
def lineR(yb, x): return yb - (x-884) * 0.035
right = wall([(884, 290), (1180, 224), (1180, 486), (884, 300)], lineR, 490, 22.5, 12, 884, 1180, seed=5)
char = [{'c': b['c'], 'p': [[u*S, v*S] for u, v in b['p']]} for b in left + right]
json.dump({'w': 1900, 'h': 1425, 'boards': char}, open('media/charcoal-boards.json', 'w'))

# white lap: front-facing, courses level; crop rows 30..760 of the 1365x1085 original
WL = []
def flat(yb, x): return yb
upper = wall([(72, 282), (1050, 282), (1050, 566), (72, 566)], flat, 566, 18.5, 16, 72, 1050,
             holes=[(98, 280, 246, 418), (548, 286, 688, 418), (818, 286, 926, 446)], Lr=(160, 320), seed=7)
lowl = wall([(62, 578), (470, 578), (470, 760), (62, 760)], flat, 760, 18.5, 10, 62, 470, holes=[(152, 572, 364, 780)], seed=9)
lowr = wall([(950, 578), (1296, 578), (1296, 760), (950, 760)], flat, 760, 18.5, 10, 950, 1296, holes=[(996, 580, 1204, 786)], seed=11)
json.dump({'w': 1365, 'h': 1085, 'crop': [0, 30, 1365, 760], 'boards': upper + lowl + lowr}, open('media/whitelap-boards.json', 'w'))
print('charcoal', len(char), 'white', len(upper + lowl + lowr))

from PIL import Image, ImageDraw
for img, js, out in (('charcoal-orig.jpg', 'charcoal-boards.json', 'cb.png'), ('whitelap-before-orig.jpg', 'whitelap-boards.json', 'wb.png')):
    im = Image.open('media/' + img).convert('RGB'); d = ImageDraw.Draw(im)
    for b in json.load(open('media/' + js))['boards']: d.polygon([tuple(p) for p in b['p']], outline=(255, 0, 0))
    im.resize((im.width//2, im.height//2)).save('/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/' + out)
