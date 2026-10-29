"""Cut the Colour Studio zones from the Rob Roy after-photo (the firm's own job photo).

body  = the navy James Hardie lap siding (colour-keyed), minus the gable triangle
gable = the navy siding inside the main gable triangle, above the frieze board
trim  = the white trim boards (corner boards, window casings, frieze, fascia) next to the siding
shade = per-zone luminance normalised to 50% grey, composited with hard-light so lap shadows survive every colour
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAIRS = os.path.join(ROOT, 'site', 'assets', 'img', 'pairs')
OUT = os.path.join(ROOT, 'site', 'assets', 'img', 'studio')
os.makedirs(OUT, exist_ok=True)

W, H = 1440, 900
GABLE = [(1100, 118), (832, 244), (1296, 270)]  # main gable triangle, 1440-wide frame, read off the photo
HOUSE = [(60, 200), (127, 150), (307, 150), (680, 203), (747, 200), (1093, 104), (1433, 313), (1433, 900), (0, 900), (0, 400), (60, 400)]
NOT_SIDING = [(790, 690, 965, 867),  # the AC condenser
              (203, 193, 291, 313), (873, 377, 1000, 553), (1107, 384, 1213, 547),  # window openings
              (384, 387, 464, 603), (253, 429, 287, 560), (301, 421, 333, 567)]  # porch window and door glass
NOT_TRIM = [(0, 560, 440, 900), (1316, 622, 1344, 664), (790, 680, 965, 867)]  # deck, meter box, AC


def main(debug=None):
    img = Image.open(os.path.join(PAIRS, 'robroy-ha-1440.webp')).convert('RGB')
    a = np.asarray(img).astype(np.float32) / 255
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    mx, mn = a.max(-1), a.min(-1)
    sat = (mx - mn) / (mx + 1e-6)

    house = Image.new('L', (W, H), 0)
    dr = ImageDraw.Draw(house)
    dr.polygon(HOUSE, fill=255)
    for box in NOT_SIDING:
        dr.rectangle(box, fill=0)
    house = np.asarray(house) > 127
    outline = Image.new('L', (W, H), 0)
    ImageDraw.Draw(outline).polygon(HOUSE, fill=255)
    house_outline = np.asarray(outline) > 127
    # white trim in sun (190,198,191) and in warm shade (158,154,111): light, low saturation, not blue
    white = (mn > .42) & (sat < .32) & (b < r * 1.08)
    # ratio test, so shadowed navy (29,35,45) passes and grey glass (51,55,56) does not
    navy = (b > r * 1.22) & (b >= g * 1.02) & (mx < .55) & (mx > .05) & house
    navy_img = Image.fromarray((navy * 255).astype(np.uint8))
    # close the lap shadow gaps, drop specks
    navy_img = navy_img.filter(ImageFilter.MaxFilter(5)).filter(ImageFilter.MinFilter(5))
    navy_img = navy_img.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    navy_img = navy_img.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.MinFilter(9))
    navy = (np.asarray(navy_img) > 127) & house & ~white

    tri = Image.new('L', (W, H), 0)
    ImageDraw.Draw(tri).polygon(GABLE, fill=255)
    tri = np.asarray(tri) > 127
    gable = navy & tri
    body = navy & ~tri

    near = Image.fromarray((navy * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(61))
    near = np.asarray(near) > 127
    not_trim = Image.new('L', (W, H), 0)
    dt = ImageDraw.Draw(not_trim)
    for x0, y0, x1, y1 in NOT_SIDING[1:]:
        k = min(18, (x1 - x0) // 2 - 2)
        dt.rectangle((x0 + k, y0 + k, x1 - k, y1 - k), fill=255)  # glass and blinds, inside the casing
    for box in NOT_TRIM:
        dt.rectangle(box, fill=255)
    trim = white & near & ~navy & house_outline & ~(np.asarray(not_trim) > 127)
    trim_img = Image.fromarray((trim * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
    trim = np.asarray(trim_img) > 127

    lum = .2126 * r + .7152 * g + .0722 * b

    def write(name, m, feather=1.2):
        m_img = Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(feather))
        rgba = Image.new('RGBA', (W, H), (255, 255, 255, 0))
        rgba.putalpha(m_img)
        for w in (760, 1400):
            rgba.resize((w, w * 10 // 16), Image.LANCZOS).save(os.path.join(OUT, f'mask-{name}-{w}.png'), optimize=True)
        return m

    def shade(name, m, gamma=.9):
        med = np.median(lum[m])
        s = np.clip(.5 * (lum / med) ** gamma, 0, 1)
        s = np.where(m, s, .5)
        im = Image.fromarray((s * 255).astype(np.uint8))
        for w in (760, 1400):
            im.resize((w, w * 10 // 16), Image.LANCZOS).save(os.path.join(OUT, f'shade-{name}-{w}.webp'), quality=82)
        print(name, 'px', int(m.sum()), 'median lum %.3f' % med)

    write('body', body)
    write('gable', gable)
    write('trim', trim, .8)
    shade('body', body | gable)
    shade('trim', trim, 1.0)
    for w in (760, 1400):
        img.resize((w, w * 10 // 16), Image.LANCZOS).save(os.path.join(OUT, f'base-{w}.webp'), quality=80)

    if debug:
        dbg = np.asarray(img).copy()
        dbg[body] = (dbg[body] * .3 + np.array([255, 60, 60]) * .7).astype(np.uint8)
        dbg[gable] = (dbg[gable] * .3 + np.array([60, 220, 60]) * .7).astype(np.uint8)
        dbg[trim] = (dbg[trim] * .3 + np.array([255, 200, 0]) * .7).astype(np.uint8)
        Image.fromarray(dbg).resize((1080, 675)).save(debug)


if __name__ == '__main__':
    import sys
    main(sys.argv[1] if len(sys.argv) > 1 else None)
