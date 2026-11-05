#!/usr/bin/env python3
"""Turn checked stock files (downloaded by ID from the Pexels CDN into the session scratchpad, never committed raw)
into sharp, tight page assets in src/assets/stock/, and keep MEDIA-CREDITS.md in step.
Usage: stock-prep.py <raw dir> <item key> [<item key> ...]   (items are listed below; each belongs to ONE section)"""
import os, subprocess, sys
from PIL import Image
FINAL = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); OUT = os.path.join(FINAL, 'src', 'assets', 'stock')
# key: (section, kind, pexels id, raw file, out name, long side or video width, extra, credit, what it shows)
ITEMS = {
 'hero-rise':   ('hero', 'scrub', 17624839, 'pexels-17624839.mp4', 'hero-rise.mp4', 1600, {'speed': 3.0, 'crf': 31, 'g': 10}, 'Pexels video 17624839 (photographer not shown: the Pexels page refuses automated fetches)', 'top-down drone rise from a shingle roof to the whole street'),
 'nothing-drone': ('nothing', 'scrub', 4198812, 'pexels-4198812.mp4', 'nothing-drone.mp4', 1600, {'speed': 1.0, 'crf': 33, 'g': 12}, 'Pexels video 4198812 (photographer not shown: the Pexels page refuses automated fetches)', 'a drone moving in on a house mid-reroof, a roofer on the ridge'),
 'finder-leak':    ('finder', 'photo', 13307118, 'px-13307118.jpg', 'finder-leak.webp', 2000, {}, 'Pexels 13307118 (photographer not shown: page walled)', 'rain pouring over a gutter edge'),
 'finder-stain':   ('finder', 'photo', 30473221, '../cand2/px-30473221.jpg', 'finder-stain.webp', 2000, {}, 'Pexels 30473221 (photographer not shown: page walled)', 'an attic under the roof, light through a roof window'),
 'finder-shingles':('finder', 'photo', 5668698, 'px-5668698.jpg', 'finder-shingles.webp', 2000, {}, 'Pexels 5668698 (photographer not shown: page walled)', 'a weathered roof with damaged, lifting shingles'),
 'finder-storm':   ('finder', 'photo', 292737, 'px-292737.jpg', 'finder-storm.webp', 2000, {}, 'Arkkrapol Anantachote, Pexels 292737', 'houses under a heavy storm sky'),
 'finder-old':     ('finder', 'photo', 4798643, 'px-4798643.jpg', 'finder-old.webp', 2000, {}, 'Pexels 4798643 (photographer not shown: page walled)', 'an older house and roof under a grey sky'),
 'finder-unsure':  ('finder', 'photo', 9431615, 'px-9431615.jpg', 'finder-unsure.webp', 2000, {}, 'Keith, Pexels 9431615', 'a roofer kneeling to look over a shingle roof'),
 'finder-house':   ('finder', 'photo', 4061594, '../cand2/px-4061594.jpg', 'finder-house.webp', 2400, {}, 'Erik Mclean, Pexels 4061594', 'a white two-storey house in winter, snow on the drive'),
 'hero-nailer': ('hero', 'photo', 33404248, 'px-33404248.jpg', 'hero-nailer.webp', 2400, {}, 'Ryan Stephens, Pexels 33404248', 'a roofer nailing architectural shingles'),
 'hero-rain':   ('hero', 'photo', 2663254, 'px-2663254.jpg', 'hero-rain.webp', 2400, {}, 'Adrien Olichon, Pexels 2663254', 'rain running off a shingled roof edge'),
}
def photo(src, dst, side):
    im = Image.open(src).convert('RGB'); w, h = im.size; k = side / max(w, h)
    if k < 1: im = im.resize((round(w * k), round(h * k)), Image.LANCZOS)
    im.save(dst, 'WEBP', quality=72, method=6); return im.size
def video(src, dst, width, x):
    vf = ['setpts=%s*PTS' % (1 / x.get('speed', 1)), 'scale=%d:-2:flags=lanczos' % width, 'fps=24']
    if x.get('trim'): vf.insert(0, 'trim=%s:%s' % x['trim'])
    cmd = ['ffmpeg', '-v', 'error', '-y', '-i', src, '-an', '-vf', ','.join(vf), '-c:v', 'libx264', '-profile:v', 'high', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', str(x.get('crf', 28)),
           '-g', str(x.get('g', 48)), '-keyint_min', str(x.get('g', 48)), '-movflags', '+faststart', dst]
    subprocess.run(cmd, check=True)
    p = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'csv=p=0', dst], capture_output=True, text=True).stdout.split()
    return ' '.join(p)
def main():
    raw = sys.argv[1]; os.makedirs(OUT, exist_ok=True); done = []
    for k in sys.argv[2:]:
        sec, kind, pid, rawf, out, size, x, credit, what = ITEMS[k]; dst = os.path.join(OUT, out)
        info = photo(os.path.join(raw, rawf), dst, size) if kind == 'photo' else video(os.path.join(raw, rawf), dst, size, x)
        done.append((k, out, info, os.path.getsize(dst) // 1024)); print(k, out, info, os.path.getsize(dst) // 1024, 'KB')
    # credits: one line per item, grouped by the section that owns it (one section owns each file)
    lines = ['# MEDIA-CREDITS · stock media in the Owl homepage', '',
             'Free stock under the Pexels licence (free to use, no attribution required; credited anyway). Fetched by ID from the Pexels CDN',
             '(images.pexels.com, videos.pexels.com); the Pexels pages themselves refuse automated fetches and were not got around.',
             'Every file was looked at before use. Stock is always tagged "Illustrative photo" on the page and never captioned as Owl\'s work.',
             'Owl\'s own media (the crew film, the family and crew photos, the logo, the owl illustrations) are not listed here.', '',
             '| Section (owner) | File | Source and credit | Shows |', '|---|---|---|---|']
    for k, (sec, kind, pid, rawf, out, size, x, credit, what) in sorted(ITEMS.items(), key=lambda i: (i[1][0], i[0])):
        if os.path.exists(os.path.join(OUT, out)): lines.append('| %s | `stock/%s` | %s | %s |' % (sec, out, credit, what))
    open(os.path.join(FINAL, 'MEDIA-CREDITS.md'), 'w').write('\n'.join(lines) + '\n')
main()
