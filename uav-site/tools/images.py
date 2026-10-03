#!/usr/bin/env python3
"""Convert every source photo in tools/images.json to an optimised WebP in src/img/out
and write src/img/out/manifest.json {key:{file,w,h,bytes}}.
Also makes the logo, favicons and the social share image."""
import json, os, sys
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src', 'img')
OUT = os.path.join(SRC, 'out')
os.makedirs(OUT, exist_ok=True)
spec = json.load(open(os.path.join(ROOT, 'tools', 'images.json')))
manifest = {}

def save_webp(im, path, q=74):
    im.save(path, 'WEBP', quality=q, method=6)

for key, s in spec.items():
    im = Image.open(os.path.join(SRC, s['src']))
    im = ImageOps.exif_transpose(im).convert('RGB')
    if 'crop' in s:
        x0, y0, x1, y1 = s['crop']
        im = im.crop((round(x0 * im.width), round(y0 * im.height), round(x1 * im.width), round(y1 * im.height)))
    if 'sat' in s:
        from PIL import ImageEnhance
        im = ImageEnhance.Color(im).enhance(s['sat'])
    w = s['w']
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    path = os.path.join(OUT, key + '.webp')
    save_webp(im, path, s.get('q', 74))
    manifest[key] = {'file': key + '.webp', 'w': im.width, 'h': im.height, 'bytes': os.path.getsize(path), 'alt': s['alt']}

# logo (keep transparency)
logo = Image.open(os.path.join(SRC, 'logo-orig.png')).convert('RGBA')
lw = 300
logo2 = logo.resize((lw, round(logo.height * lw / logo.width)), Image.LANCZOS)
logo2.save(os.path.join(OUT, 'logo.webp'), 'WEBP', quality=92, method=6)
logo2.save(os.path.join(OUT, 'logo.png'), 'PNG', optimize=True)
manifest['_logo'] = {'file': 'logo.webp', 'w': logo2.width, 'h': logo2.height, 'bytes': os.path.getsize(os.path.join(OUT, 'logo.webp'))}

# favicon: the drone mark only (top ~58% of the logo)
mark = logo.crop((0, 0, logo.width, int(logo.height * 0.60)))
bbox = mark.getbbox()
mark = mark.crop(bbox)
side = max(mark.size)
for size, name in ((32, 'favicon-32.png'), (180, 'apple-touch-icon.png'), (192, 'icon-192.png'), (512, 'icon-512.png')):
    pad = 1 if size == 32 else round(size * 0.10)
    canvas = Image.new('RGBA', (size, size), (250, 249, 246, 255))
    inner = size - 2 * pad
    m = mark.copy()
    m.thumbnail((inner, inner), Image.LANCZOS)
    canvas.paste(m, ((size - m.width) // 2, (size - m.height) // 2), m)
    canvas.save(os.path.join(OUT, name), 'PNG', optimize=True)

# social share image is rendered by tools/og.js (Chromium, brand fonts)

json.dump(manifest, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1)
tot = sum(v['bytes'] for v in manifest.values())
print(len(manifest), 'assets', round(tot / 1024), 'KB total')
for k, v in manifest.items():
    print(f"{k:20s} {v['w']}x{v['h']} {round(v['bytes']/1024):4d}KB")
