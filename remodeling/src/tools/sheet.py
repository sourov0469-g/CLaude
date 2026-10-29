# usage: python3 sheet.py <shotdir> <out-prefix> [label]
# builds desktop and mobile contact sheets (rows = sections, cols = versions 1,2,3)
import sys, os
from PIL import Image, ImageDraw
d, out = sys.argv[1], sys.argv[2]
label = sys.argv[3] if len(sys.argv) > 3 else ''
secs = 'hero proof services ba process financing work reviews towns consult'.split()
for n, (w, h) in (('d', (480, 300)), ('m', (188, 406))):
    pad, top = 6, 28
    W = 3 * w + 4 * pad + 70; H = len(secs) * (h + pad) + pad + top
    sh = Image.new('RGB', (W, H), (20, 26, 28)); dr = ImageDraw.Draw(sh)
    dr.text((8, 8), f'{label}  {"1440x900" if n == "d" else "375x812"}  cols = v1 v2 v3', fill=(220, 220, 220))
    for r, s in enumerate(secs):
        y = top + pad + r * (h + pad)
        dr.text((6, y + 4), s, fill=(119, 179, 184))
        for c in range(3):
            p = os.path.join(d, f'{s}{c+1}-{n}.jpg')
            if os.path.exists(p):
                im = Image.open(p).convert('RGB').resize((w, h))
                sh.paste(im, (70 + pad + c * (w + pad), y))
    sh.save(f'{out}-{"1440" if n == "d" else "375"}.jpg', quality=62)
