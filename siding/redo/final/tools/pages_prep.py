"""Re-encodes the firm's own photos (siding/work/dl) as small WebPs for the Windows and Our work pages (assets/pages/). Run: python3 tools/pages_prep.py [q_pair] [w_pair]"""
import os, sys
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__)); DL = os.path.join(H, '..', '..', '..', 'work', 'dl'); OUT = os.path.join(H, '..', 'assets', 'pages'); os.makedirs(OUT, exist_ok=True)
QP = int(sys.argv[1]) if len(sys.argv) > 1 else 52; WP = int(sys.argv[2]) if len(sys.argv) > 2 else 640


def enc(src, name, w, q, h=None):
    im = Image.open(os.path.join(DL, src)).convert('RGB'); r = w / im.width; im = im.resize((w, h or round(im.height * r)), Image.LANCZOS)
    p = os.path.join(OUT, name + '.webp'); im.save(p, 'WEBP', quality=q, method=6); return os.path.getsize(p)


tot = {}
for i in range(4):   # Windows page pairs
    for s in 'ab': tot['pw-%d%s' % (i, s)] = enc('windows%d%s-720.webp' % (i, s), 'w%d%s' % (i, s), 720, 58)
for i in range(6):   # homepage pairs
    for s in 'ab': tot['pg-h%d%s' % (i, s)] = enc('home%d%s-720.webp' % (i, s), 'h%d%s' % (i, s), WP, QP)
for i in range(4):
    for s in 'ab': tot['pg-s%d%s' % (i, s)] = enc('siding%d%s-720.webp' % (i, s), 's%d%s' % (i, s), WP, QP)
for i in range(4):
    for s in 'ab': tot['pg-w%d%s' % (i, s)] = enc('windows%d%s-720.webp' % (i, s), 'x%d%s' % (i, s), WP, QP)
for i in range(8):
    tot['j%d' % i] = enc('job4867-%d-480.webp' % i, 'j%d' % i, 360, 46)
STILLS = [0, 5, 8, 12, 16, 20, 24, 26, 33, 36, 40, 42]
for i in STILLS: tot['p%d' % i] = enc('photo%d-640.webp' % i, 'p%d' % i, 420, 42)
pw = sum(v for k, v in tot.items() if k.startswith('pw-')); rest = sum(v for k, v in tot.items() if not k.startswith('pw-'))
print('windows page', pw, 'bytes; our work', rest, 'bytes (x1.33 for base64:', round(pw * 1.33), round(rest * 1.33), ')')
