# Photos for v5: the owner's attached set, resized and re-encoded once, plus the linework twin of job-charcoal for hero v3.
# Usage: python3 images.py   (reads ../assets/owner, writes ../assets/img)
import pathlib
from PIL import Image, ImageFilter, ImageOps, ImageChops

root = pathlib.Path(__file__).resolve().parent.parent
src, out = root / 'assets' / 'owner', root / 'assets' / 'img'
out.mkdir(exist_ok=True)
JOBS = {  # name: (source, max width, quality)
    'ba1-after': ('ba1-after.png', 1480, 80),
    'tudor': ('tudor.jpg', 2000, 78),
    'job-charcoal': ('job-charcoal.png', 1156, 80),
    'job-truck': ('job-truck.png', 1102, 80),
    'ba2-before': ('ba2-before.png', 1024, 80),
    'ba2-after': ('ba2-after.webp', 1024, 80),
    'team': ('team.webp', 1088, 80),
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

# Linework twin: Sobel edges of the same pixels, drawn white on the brand blue, so the photo and the drawing align exactly.
# Two passes: a median-filtered one for clean outlines, and a faint detailed one that keeps the shingle and brick texture.
def edges(med, blur, th, gain):
    im = Image.open(src / 'job-charcoal.png').convert('L')
    if med: im = im.filter(ImageFilter.MedianFilter(med))
    im = im.filter(ImageFilter.GaussianBlur(blur))
    kx = ImageFilter.Kernel((3, 3), [-1, 0, 1, -2, 0, 2, -1, 0, 1], scale=1)
    ky = ImageFilter.Kernel((3, 3), [-1, -2, -1, 0, 0, 0, 1, 2, 1], scale=1)
    ex = ImageChops.add(im.filter(kx), ImageOps.invert(im).filter(kx))  # both edge polarities
    ey = ImageChops.add(im.filter(ky), ImageOps.invert(im).filter(ky))
    return ImageChops.lighter(ex, ey).point(lambda v: 0 if v < th else min(255, int((v - th) * gain)))
clean, detail = edges(5, 0.7, 48, 3.0), edges(0, 1.1, 34, 2.4).point(lambda v: int(v * 0.32))
edge = ImageChops.lighter(clean, detail)
size = edge.size
line = Image.composite(Image.new('RGB', size, (236, 242, 255)), Image.new('RGB', size, (26, 65, 153)), edge)
save(line, 'job-charcoal-lines', 82)

# Favicon: the house mark from the logo (left part of the exact logo file), 64 px.
logo = Image.open(src / 'logo.png').convert('RGBA')
fav = logo.crop((0, 0, 132, 120)); side = max(fav.size); sq = Image.new('RGBA', (side, side), (255, 255, 255, 0)); sq.paste(fav, ((side - fav.width) // 2, (side - fav.height) // 2))
sq.resize((64, 64), Image.LANCZOS).save(out / 'favicon.png', optimize=True); print('favicon        64x64')
