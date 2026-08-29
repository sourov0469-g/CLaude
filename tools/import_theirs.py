#!/usr/bin/env python3
"""Bring the group's own photographs and clips out of their deck into ours."""
import os, shutil
from PIL import Image, ImageOps

SRC = '/tmp/claude-0/-home-user-CLaude/199bdc8b-ecfc-53a6-b005-f066b4962a21/scratchpad/theirs'
IMG = '/home/user/CLaude/assets/img/pb'
MED = '/home/user/CLaude/assets/media'
os.makedirs(IMG, exist_ok=True); os.makedirs(MED, exist_ok=True)

NAMES = {
    'a-candidate-preparing-dough-by-hand-87649f40.jpg': 'hiring-poster',
    'asset-0cf27093.jpg': 'pizzas-table-a',
    'asset-5525747f.jpg': 'justice',
    'asset-58b947a0.jpg': 'pizzas-table-b',
    'asset-7398890b.jpg': 'neon-sign',
    'asset-82d8751d.jpg': 'pizza-closeup',
    'asset-85bc3047.jpg': 'interview-a',
    'asset-9d4d2a2b.jpg': 'team-selfie',
    'asset-a8e6a9b0.jpg': 'desk-calendar',
    'asset-acd08bfb.jpg': 'team-office',
    'asset-ade09dae.jpg': 'pizzas-table-c',
    'asset-b634fddb.jpg': 'interview-b',
    'asset-bf205bb5.jpg': 'interview-c',
    'asset-d4106bf5.jpg': 'interview-d',
    'asset-ec0345f2.jpg': 'dough-hands',
    'group-nexix-at-pizzaburg-647b059c.jpg': 'brand-salman',
    'group-nexix-at-pizzaburg-head-office-7424b449.jpg': 'team-street',
    'pizzaburg-outlet-during-service-ef616897.jpg': 'interview-e',
    'pizzaburg-outlet-floor-during-service-8ed77986.jpg': 'dhaka-street',
    'pizzaburg-outlet-interior-e48bf889.jpg': 'pizza-pan',
    'pizzaburg-outlet-signage-f968a12e.jpg': 'two-pizzas',
    'putting-our-questions-to-the-manager-54b870c8.jpg': 'file-stack',
}
VIDEOS = {
    'asset-205ec93a.mp4': 'team-pan-12s.mp4',
    'asset-b9c38c3d.mp4': 'interview-18s.mp4',
}

for src, name in NAMES.items():
    p = os.path.join(SRC, src)
    if not os.path.exists(p):
        print('missing', src); continue
    im = ImageOps.exif_transpose(Image.open(p)).convert('RGB')
    if im.width > 1400:
        im = im.resize((1400, round(im.height * 1400 / im.width)), Image.LANCZOS)
    out = os.path.join(IMG, name + '.webp')
    im.save(out, 'WEBP', quality=72, method=6)
    print('%-18s %sx%s %4d KB' % (name, im.width, im.height, os.path.getsize(out) // 1024))

for src, name in VIDEOS.items():
    p = os.path.join(SRC, src)
    if os.path.exists(p):
        shutil.copy(p, os.path.join(MED, name))
        print('video', name, os.path.getsize(p) // 1024, 'KB')
