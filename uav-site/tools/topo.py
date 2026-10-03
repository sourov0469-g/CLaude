#!/usr/bin/env python3
"""Topographic-style isolines traced from the luminance of a real photograph.
Writes src/lib/topo.json: {name: {"w":1200,"h":..,"paths":[[d,level],...]}}. Needs numpy + opencv-python-headless."""
import cv2, numpy as np, json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src', 'img')
JOBS = {  # name: (source, blur sigma, levels, min arc length)
    'farm': ('stock/px-32047288.jpg', 7, 9, 90),
    'town': ('client/c12-drone-over-town.jpg', 8, 9, 100),
    'site': ('stock/px-8811576.jpg', 8, 9, 100),
}
def trace(path, sigma, levels, minlen, W=1200):
    im = cv2.imread(os.path.join(SRC, path), cv2.IMREAD_GRAYSCALE)
    h = round(im.shape[0] * W / im.shape[1]); im = cv2.resize(im, (W, h), interpolation=cv2.INTER_AREA)
    g = cv2.GaussianBlur(im, (0, 0), sigma)
    out = []
    qs = np.linspace(8, 92, levels)
    for li, q in enumerate(qs):
        t = np.percentile(g, q)
        m = (g > t).astype(np.uint8) * 255
        cs, _ = cv2.findContours(m, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)
        parts = []
        for c in cs:
            if cv2.arcLength(c, False) < minlen: continue
            a = cv2.approxPolyDP(c, 2.2, False)
            if len(a) < 4: continue
            pts = a[:, 0, :]
            if (pts[:, 0] <= 1).all() or (pts[:, 0] >= W - 2).all() or (pts[:, 1] <= 1).all() or (pts[:, 1] >= h - 2).all(): continue
            parts.append('M' + 'L'.join(f'{x} {y}' for x, y in pts))
        if parts: out.append(['' .join(parts), li])
    return {'w': W, 'h': h, 'paths': out}
if __name__ == '__main__':
    res = {k: trace(*v) for k, v in JOBS.items()}
    json.dump(res, open(os.path.join(ROOT, 'src', 'lib', 'topo.json'), 'w'), separators=(',', ':'))
    for k, v in res.items(): print(k, v['w'], v['h'], sum(len(p[0]) for p in v['paths']) // 1024, 'KB', len(v['paths']), 'levels')
