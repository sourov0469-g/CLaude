# Pixel diff of old-<id><n>-<w>.png vs bk-<id><n>-<w>.png in a folder: size, bbox of differing pixels, max channel delta,
# share of pixels differing by more than 8. usage: python3 -I pixdiff.py <dir>
import sys, glob, os
from PIL import Image, ImageChops
d = sys.argv[1]
for o in sorted(glob.glob(os.path.join(d, 'old-*.png'))):
    n = o.replace('old-', 'bk-')
    if not os.path.exists(n): print(os.path.basename(o), 'missing pair'); continue
    a, b = Image.open(o).convert('RGB'), Image.open(n).convert('RGB')
    if a.size != b.size: print(os.path.basename(o)[4:-4], 'SIZE', a.size, b.size); continue
    df = ImageChops.difference(a, b); bbox = df.getbbox()
    mx = max(x[1] for x in df.getextrema())
    g = df.convert('L').point(lambda v: 255 if v > 8 else 0); share = sum(1 for v in g.getdata() if v) / (a.size[0] * a.size[1])
    print(f"{os.path.basename(o)[4:-4]:16s} size {a.size} bbox {bbox} max {mx} >8: {share*100:.3f}%")
