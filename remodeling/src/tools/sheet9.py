"""Phase 9 evidence pack: one contact sheet per page from repeat.js third-pass frames (the final build, motion on,
after every first-view intro has played). One row per section anchor; columns: V1 at 1440, V2 at 1440, V1 at 390,
V2 at 390 (the V2 columns only where the section has a second version). Labels are drawn in plain pixels.
Usage: python3 sheet9.py <frames root> <out dir>"""
import sys, os, json
from PIL import Image, ImageDraw, ImageFont

root, outd = sys.argv[1], sys.argv[2]
os.makedirs(outd, exist_ok=True)
try:
    F = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
except OSError:
    F = ImageFont.load_default()
DW, DH, MW = 480, 300, 139   # desktop thumb 1440x900 -> 480x300; phone 390x844 -> 139x300
G = 12
for page in ['home', 'kitchens', 'bathrooms', 'renovation', 'contact']:
    runs = {}
    for w in (1440, 390):
        for v in (1, 2):
            d = os.path.join(root, f'{page}-{w}-v{v}')
            runs[(w, v)] = (d, json.load(open(os.path.join(d, 'run.json'))))
    two = set(runs[(1440, 2)][1]['swapped'])
    order = []
    for a in runs[(1440, 1)][1]['anchors']:
        if (a['id'], a['k']) not in order: order.append((a['id'], a['k']))
    for a in runs[(390, 1)][1]['anchors']:
        if (a['id'], a['k']) not in order: order.append((a['id'], a['k']))
    seq = [a['id'] for a in runs[(390, 1)][1]['anchors']]   # page order of sections (every section appears at 390)
    order.sort(key=lambda t: (seq.index(t[0]) if t[0] in seq else 99, 0 if t[1] == 'top' else 1))
    cols = [(1440, 1, DW), (1440, 2, DW), (390, 1, MW), (390, 2, MW)]
    width = G + sum(c[2] + G for c in cols) + 220
    rows = []
    for sid, k in order:
        tiles = []
        for w, v, tw in cols:
            if v == 2 and sid not in two: tiles.append(None); continue
            f = os.path.join(runs[(w, v)][0], f'{sid}__{k}__d3.jpg')
            tiles.append(Image.open(f).resize((tw, DH)) if os.path.exists(f) else None)
        rows.append((sid, k, tiles))
    head = 44
    sheet = Image.new('RGB', (width, head + len(rows) * (DH + G) + G), (247, 243, 238))
    dr = ImageDraw.Draw(sheet)
    x = 220 + G
    for (w, v, tw) in cols:
        dr.text((x, 14), f'V{v} at {w}', fill=(27, 25, 22), font=F); x += tw + G
    y = head
    for sid, k, tiles in rows:
        dr.text((G, y + 8), sid, fill=(27, 25, 22), font=F)
        dr.text((G, y + 32), 'section top' if k == 'top' else 'mid-story', fill=(110, 104, 96), font=F)
        if sid in two: dr.text((G, y + 56), 'two versions', fill=(164, 85, 64), font=F)
        x = 220 + G
        for (w, v, tw), t in zip(cols, tiles):
            if t is not None:
                sheet.paste(t, (x, y)); dr.rectangle([x - 1, y - 1, x + tw, y + DH], outline=(200, 192, 182))
            x += tw + G
        y += DH + G
    p = os.path.join(outd, f'sheet-{page}.jpg'); sheet.save(p, quality=84)
    print(p, sheet.size, len(rows), 'rows')
