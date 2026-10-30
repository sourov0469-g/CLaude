# §12 item 5 contact sheets: every section x version shot (qa/<sec><v>-<w>.jpg, written by secqa.mjs) tiled 7 rows x 3
# columns per width, each tile labelled. Run: python3 -I qa/scripts/sheets.py rembrandt/v5/qa
import sys
from PIL import Image, ImageDraw
Q = sys.argv[1]; SECS = ['hero', 'proof', 'work', 'family', 'how', 'area', 'call']
for w, tw in ((1440, 480), (375, 200)):
    tiles = [[Image.open(f'{Q}/{s}{v}-{w}.jpg').convert('RGB') for v in (1, 2, 3)] for s in SECS]
    th = int(tiles[0][0].size[1] * tw / tiles[0][0].size[0]); g = 10
    S = Image.new('RGB', (3 * tw + 2 * g, 7 * th + 6 * g), 'white'); d = ImageDraw.Draw(S)
    for r, row in enumerate(tiles):
        for c, im in enumerate(row):
            x, y = c * (tw + g), r * (th + g); S.paste(im.resize((tw, th)), (x, y)); d.text((x + 4, y + 2), f'{SECS[r]}{c + 1}', fill=(220, 0, 0))
    S.save(f'{Q}/gate/sheet-{w}.jpg', quality=80)
    print(f'sheet-{w}.jpg', S.size)
