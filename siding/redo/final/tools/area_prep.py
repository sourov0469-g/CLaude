"""Area (section 9): crop and re-encode the firm's own project photos for the Thread board. Source: siding/work/dl/photoN-1400.webp (the firm's published photos);
crops from prep/area/area-wall.json (a few unassessed ones are set here). Output: assets/area/pN.webp (long side <= 640 px, WebP q72)."""
import json, os
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__)); FIN = os.path.join(HERE, '..'); DL = os.path.join(FIN, '..', '..', 'work', 'dl')
J = {c['idx']: c for c in json.load(open(os.path.join(FIN, '..', 'prep', 'area', 'area-wall.json')))}
J[28] = dict(idx=28, aspect='4:3', x=0, y=0, w=1400, h=1050); J[33] = dict(idx=33, aspect='4:3', x=0, y=0, w=1400, h=1050)
J[36] = dict(idx=36, aspect='4:3', x=284, y=328, w=919, h=689)   # a tight crop of the house, so it does not repeat the hero's full frame
OUT = os.path.join(FIN, 'assets', 'area'); os.makedirs(OUT, exist_ok=True)
tot = 0
for i, c in sorted(J.items()):
    if i not in (2, 11, 12, 15, 16, 18, 20, 22, 27, 28, 30, 33, 34, 35, 36, 41): continue
    im = Image.open(os.path.join(DL, f'photo{i}-1400.webp')).convert('RGB').crop((c['x'], c['y'], c['x'] + c['w'], c['y'] + c['h']))
    s = 640 / max(im.size) if c['aspect'] in ('4:3', '16:9') else 560 / max(im.size)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    p = os.path.join(OUT, f'p{i}.webp'); im.save(p, 'WEBP', quality=72, method=6); tot += os.path.getsize(p); print(i, im.size, os.path.getsize(p))
print('total', tot)
