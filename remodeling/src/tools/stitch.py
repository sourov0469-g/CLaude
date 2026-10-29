# usage: python3 stitch.py <prefix> <out.png> [cols=2]  -> frames side by side, row by row
import glob, sys
from PIL import Image
pre, out = sys.argv[1], sys.argv[2]
cols = int(sys.argv[3]) if len(sys.argv) > 3 else 2
fs = sorted(glob.glob(pre + '-*.png'), key=lambda f: int(f.rsplit('-', 1)[1][:-4]))
ims = [Image.open(f) for f in fs]
cw = max(i.size[0] for i in ims)
rows = [ims[i:i + cols] for i in range(0, len(ims), cols)]
H = sum(max(x.size[1] for x in r) + 8 for r in rows)
sh = Image.new('RGB', (cw * cols + 8 * (cols - 1), H), (255, 0, 255))
y = 0
for r in rows:
    for j, im in enumerate(r):
        sh.paste(im, (j * (cw + 8), y))
    y += max(x.size[1] for x in r) + 8
sh.save(out)
