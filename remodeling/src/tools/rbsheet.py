# usage: python3 rbsheet.py <shotdir> <out.png> sec1,sec2 1,2,3 [gray]
import sys; from PIL import Image, ImageDraw
d, out, secs, vers = sys.argv[1], sys.argv[2], sys.argv[3].split(','), sys.argv[4].split(',')
gray = len(sys.argv) > 5
w, h, pad, left = 384, 240, 6, 110
S = Image.new('RGB', (left + len(vers) * (w + pad), len(secs) * (h + pad) + 24), (255, 255, 255)); D = ImageDraw.Draw(S)
for c, v in enumerate(vers): D.text((left + c * (w + pad) + 4, 6), 'v' + v, fill=(0, 0, 0))
for r, s in enumerate(secs):
    D.text((4, 24 + r * (h + pad) + 4), s, fill=(0, 0, 0))
    for c, v in enumerate(vers):
        try: im = Image.open(f'{d}/{s}-{v}.jpg').resize((w, h))
        except Exception: continue
        if gray: im = im.convert('L').convert('RGB')
        S.paste(im, (left + c * (w + pad), 24 + r * (h + pad)))
S.save(out); print(out, S.size)
