# Photos for v5: the owner's attached set, resized and re-encoded once, plus the linework twin of job-charcoal for hero v3.
# Usage: python3 images.py   (reads ../assets/owner, writes ../assets/img)
import pathlib
from PIL import Image, ImageFilter, ImageOps, ImageChops

root = pathlib.Path(__file__).resolve().parent.parent
src, out = root / 'assets' / 'owner', root / 'assets' / 'img'
out.mkdir(exist_ok=True)
JOBS = {  # name: (source, max width, quality). F18 / S1166 (page max 1500 KB): V7 caps the long edge at 1600 (hero photos);
# gate trim: qualities lowered 4-8 points (PSNR -0.5 to -0.9 dB, checked at 1:1 on the roofs) to bring the page under 1500 KB
    # and 1100 (the rest), q62-66; every photo still reads sharp at its largest rendered size (checked at 1440 and 2x 390)
    'ba1-after': ('ba1-after.png', 1280, 50),
    'tudor': ('tudor.jpg', 1600, 52),
    'job-charcoal': ('job-charcoal.png', 1100, 56),
    'job-truck': ('job-truck.png', 1100, 56),
    'ba2-before': ('ba2-before.png', 1024, 64),
    'ba2-after': ('ba2-after.webp', 1024, 54),
    'team': ('team.webp', 1088, 66),
}

def save(im, name, q):
    p = out / f'{name}.webp'; im.save(p, 'WEBP', quality=q, method=6)
    print(f'{name:14s} {im.size[0]}x{im.size[1]}  {p.stat().st_size // 1024} KB')

CROP_TOP = {'ba2-before': 84, 'ba2-after': 84}  # the firm's baked "Before"/"After" boxes sit in the top 74 px; labels live outside the photos (S0650 9.F)
for name, (f, w, q) in JOBS.items():
    im = Image.open(src / f).convert('RGB')
    if name in CROP_TOP: im = im.crop((0, CROP_TOP[name], im.width, im.height))
    if im.width > w: im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    save(im, name, q)

# Favicon: the house mark from the logo (left part of the exact logo file), 64 px.
logo = Image.open(src / 'logo.png').convert('RGBA')
fav = logo.crop((0, 0, 132, 120)); side = max(fav.size); sq = Image.new('RGBA', (side, side), (255, 255, 255, 0)); sq.paste(fav, ((side - fav.width) // 2, (side - fav.height) // 2))
sq.resize((64, 64), Image.LANCZOS).save(out / 'favicon.png', optimize=True); print('favicon        64x64')
