"""Hand-authored depth maps for the three supplied hero photographs (Muse's pack, 2026-11-03). 0 = far, 1 = near.
Planes are traced on a 100 px grid over each photo (sky, trees, house walls receding from their nearest corner,
projecting slabs, foreground beds), then blurred so the depth shader bends the photo without tearing it.
Also writes the house mattes used by hero V4 (title set between the sky and the house)."""
import os
from PIL import Image, ImageDraw, ImageFilter
HERE = os.path.dirname(os.path.abspath(__file__))
M = os.path.join(HERE, 'media')


def ramp(W, H, fn):
    im = Image.new('L', (W, H)); px = im.load()
    for y in range(H):
        for x in range(W):
            px[x, y] = max(0, min(255, int(fn(x, y) * 255)))
    return im


def paste(base, layer, poly):
    m = Image.new('L', base.size, 0); ImageDraw.Draw(m).polygon(poly, fill=255); base.paste(layer, (0, 0), m)


def cand2():  # 1200 x 673: modern lap house, corner at x~800 nearest, walls recede both ways
    W, H = 1200, 673
    d = Image.new('L', (W, H), 0)
    paste(d, Image.new('L', (W, H), 70), [(0, 0), (160, 0), (150, 620), (0, 620)])                # left trees
    paste(d, Image.new('L', (W, H), 60), [(1060, 0), (1200, 0), (1200, 620), (1050, 620)])         # right trees
    house = ramp(W, H, lambda x, y: 0.42 + 0.34 * (1 - abs(x - 800) / 720) + 0.06 * (y / H))
    paste(d, house, [(0, 400), (85, 270), (225, 130), (365, 165), (580, 20), (740, 85), (770, 75), (915, 160), (915, 190),
                     (1130, 275), (1095, 440), (1095, 600), (0, 600)])
    slab = ramp(W, H, lambda x, y: 0.55 + 0.30 * (1 - abs(x - 800) / 720))
    paste(d, slab, [(195, 400), (290, 330), (550, 262), (880, 350), (860, 385), (560, 330), (230, 425)])   # balcony slab
    paste(d, slab, [(85, 270), (225, 130), (365, 165), (300, 200), (120, 290)])                              # left eave
    fg = ramp(W, H, lambda x, y: 0.78 + 0.22 * max(0, (y - 560) / 113))
    paste(d, fg, [(0, 560), (1200, 560), (1200, 673), (0, 673)])
    return d.filter(ImageFilter.GaussianBlur(9)), None


def cand3():  # 1200 x 800: craftsman at dusk; returns depth and the house matte (house + everything in front)
    W, H = 1200, 800
    roof = [(0, 500), (55, 445), (140, 372), (205, 370), (290, 315), (345, 300), (418, 284), (480, 315), (515, 330), (515, 318),
            (550, 318), (560, 345), (600, 345), (700, 322), (755, 322), (760, 335), (850, 310), (905, 332), (950, 335), (1000, 330),
            (1060, 345), (1145, 440), (1145, 500), (1200, 500)]
    d = Image.new('L', (W, H), 0)
    paste(d, Image.new('L', (W, H), 30), [(0, 470), (1200, 470), (1200, 560), (0, 560)])            # far shore and hills
    house = ramp(W, H, lambda x, y: 0.40 + 0.08 * (1 - abs(x - 760) / 760))
    paste(d, house, roof + [(1200, 560), (0, 560)])
    paste(d, ramp(W, H, lambda x, y: 0.52), [(650, 385), (860, 385), (860, 530), (650, 530)])         # porch arch
    lawn = ramp(W, H, lambda x, y: 0.55 + 0.45 * max(0, (y - 540) / 260))
    paste(d, lawn, [(0, 540), (1200, 540), (1200, 800), (0, 800)])
    bed = ramp(W, H, lambda x, y: 0.68 + 0.32 * max(0, (y - 520) / 280))
    paste(d, bed, [(560, 520), (1200, 520), (1200, 800), (620, 800), (560, 640)])
    matte = Image.new('L', (W, H), 0); ImageDraw.Draw(matte).polygon(roof + [(1200, 800), (0, 800)], fill=255)
    for (cx, top) in ((532, 318), (725, 320)):                                                          # chimneys
        ImageDraw.Draw(matte).rectangle([cx - 20, top, cx + 30, 360], fill=255)
    return d.filter(ImageFilter.GaussianBlur(10)), matte.filter(ImageFilter.GaussianBlur(1.2))


def cand1():  # 1024 x 1536: black board-and-batten at dusk; left wall nearest, receding right; tree canopy top right
    W, H = 1024, 1536
    d = Image.new('L', (W, H), 0)
    paste(d, Image.new('L', (W, H), 110), [(420, 0), (1024, 0), (1024, 520), (800, 560), (640, 420), (470, 200)])   # canopy
    paste(d, Image.new('L', (W, H), 70), [(700, 450), (1024, 450), (1024, 960), (700, 960)])                          # back trees
    house = ramp(W, H, lambda x, y: 0.40 + 0.38 * (1 - x / 900))
    paste(d, house, [(0, 235), (135, 90), (800, 610), (735, 560), (800, 545), (845, 600), (845, 780), (960, 830), (930, 840),
                     (930, 940), (1024, 945), (1024, 1050), (0, 1050)])
    ground = ramp(W, H, lambda x, y: 0.62 + 0.38 * max(0, (y - 980) / 556))
    paste(d, ground, [(0, 1000), (1024, 1000), (1024, 1536), (0, 1536)])
    return d.filter(ImageFilter.GaussianBlur(12)), None


if __name__ == '__main__':
    for name, fn, W in (('cand2', cand2, 1200), ('cand3', cand3, 1200), ('cand1', cand1, 1024)):
        dep, matte = fn()
        dep.resize((W // 2, dep.height * (W // 2) // dep.width), Image.LANCZOS).save(os.path.join(M, f'{name}-depth.png'))
        if matte: matte.save(os.path.join(M, f'{name}-matte.png'))
        print(name, 'ok')
