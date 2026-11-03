"""Contact sheet of a frames folder: python3 -I sheet.py <dir> <out.jpg> [every] [cols] [width]"""
import sys, glob, os
from PIL import Image, ImageDraw
d, out = sys.argv[1], sys.argv[2]; every = int(sys.argv[3]) if len(sys.argv) > 3 else 1; cols = int(sys.argv[4]) if len(sys.argv) > 4 else 5; W = int(sys.argv[5]) if len(sys.argv) > 5 else 384
fs = sorted(glob.glob(os.path.join(d, '*.jpg')) + glob.glob(os.path.join(d, '*.png')))[::every]
ims = []
for f in fs:
    im = Image.open(f).convert('RGB'); h = int(im.height * W / im.width); im = im.resize((W, h)); ImageDraw.Draw(im).rectangle([0, 0, W, 16], fill=(0, 0, 0)); ImageDraw.Draw(im).text((4, 2), os.path.basename(f)[:40], fill=(255, 255, 255)); ims.append(im)
H = max(i.height for i in ims); rows = (len(ims) + cols - 1) // cols
s = Image.new('RGB', (cols * (W + 4), rows * (H + 4)), (120, 120, 120))
for i, im in enumerate(ims): s.paste(im, ((i % cols) * (W + 4), (i // cols) * (H + 4)))
s.save(out, quality=82); print(out, len(ims), 'frames')
