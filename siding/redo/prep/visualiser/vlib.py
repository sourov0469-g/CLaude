"""Siding-mask + recolour helpers (numpy + PIL only)."""
import json, numpy as np
from PIL import Image, ImageDraw

def raster(size, groups):
    """groups: list of dict(outer=[pts], holes=[[pts],..], rule=callable(rgb int array)->bool array). Returns bool mask."""
    W, H = size; out = np.zeros((H, W), bool)
    rgb = None
    return out

def poly_mask(size, outer, holes):
    im = Image.new('L', size, 0); d = ImageDraw.Draw(im)
    d.polygon([tuple(p) for p in outer], fill=255)
    for h in holes: d.polygon([tuple(p) for p in h], fill=0)
    return np.asarray(im) > 0

def shift(m, dx, dy):
    o = np.zeros_like(m); H, W = m.shape
    ys, yd = (slice(max(dy,0), H+min(dy,0)), slice(max(-dy,0), H+min(-dy,0)))
    xs, xd = (slice(max(dx,0), W+min(dx,0)), slice(max(-dx,0), W+min(-dx,0)))
    o[ys, xs] = m[yd, xd]; return o

def erode(m, r=1):
    o = m.copy()
    for dx in range(-r, r+1):
        for dy in range(-r, r+1): o &= shift(m, dx, dy)
    return o

def dilate(m, r=1):
    o = m.copy()
    for dx in range(-r, r+1):
        for dy in range(-r, r+1): o |= shift(m, dx, dy)
    return o

def components(m, minarea):
    """drop connected foreground components smaller than minarea (4-conn, iterative flood via PIL-free stack)"""
    H, W = m.shape; seen = np.zeros_like(m); keep = np.zeros_like(m)
    ys, xs = np.nonzero(m)
    for y0, x0 in zip(ys, xs):
        if seen[y0, x0]: continue
        st = [(y0, x0)]; seen[y0, x0] = True; comp = []
        while st:
            y, x = st.pop(); comp.append((y, x))
            for yy, xx in ((y+1,x),(y-1,x),(y,x+1),(y,x-1)):
                if 0 <= yy < H and 0 <= xx < W and m[yy,xx] and not seen[yy,xx]: seen[yy,xx] = True; st.append((yy,xx))
        if len(comp) >= minarea:
            for y, x in comp: keep[y, x] = True
    return keep

def trace(m):
    """boundary loops of a bool mask as lists of (x,y) corner points (even-odd friendly)."""
    H, W = m.shape; p = np.pad(m, 1)
    nxt = {}
    # directed edges with filled pixel on the left side (screen coords, y down)
    def add(a, b): nxt.setdefault(a, []).append(b)
    up = p[1:-1,1:-1] & ~p[:-2,1:-1]     # top edge: go left->right? orientation consistent below
    for y, x in zip(*np.nonzero(up)): add((x+1, y), (x, y))        # top edge, traverse right->left
    dn = p[1:-1,1:-1] & ~p[2:,1:-1]
    for y, x in zip(*np.nonzero(dn)): add((x, y+1), (x+1, y+1))    # bottom edge left->right
    lf = p[1:-1,1:-1] & ~p[1:-1,:-2]
    for y, x in zip(*np.nonzero(lf)): add((x, y), (x, y+1))        # left edge top->bottom
    rt = p[1:-1,1:-1] & ~p[1:-1,2:]
    for y, x in zip(*np.nonzero(rt)): add((x+1, y+1), (x+1, y))    # right edge bottom->top
    loops = []
    while nxt:
        s = next(iter(nxt)); loop = [s]; cur = s
        while True:
            outs = nxt[cur]; n = outs.pop()
            if not outs: del nxt[cur]
            if n == s: break
            loop.append(n); cur = n
            if cur not in nxt: break
        loops.append(loop)
    return loops

def dp(pts, eps):
    if len(pts) < 4: return pts
    a = np.array(pts, float)
    def rec(i, j):
        if j <= i+1: return [i]
        p, q = a[i], a[j]; d = q-p; n = np.hypot(*d)
        seg = a[i+1:j]
        dist = np.abs(d[0]*(seg[:,1]-p[1]) - d[1]*(seg[:,0]-p[0]))/n if n else np.hypot(*(seg-p).T)
        k = int(dist.argmax())
        if dist[k] > eps: return rec(i, i+1+k) + rec(i+1+k, j)
        return [i]
    # split closed loop at two far points
    n = len(a); j = int(np.hypot(*(a-a[0]).T).argmax())
    idx = rec(0, j) + rec(j, n-1) + [n-1]
    out = [pts[i] for i in sorted(set(idx))]
    return out

def area(P): return abs(sum(P[i][0]*P[(i+1)%len(P)][1]-P[(i+1)%len(P)][0]*P[i][1] for i in range(len(P))))/2

def mask_to_polys(m, eps=1.4, minarea=60):
    out = []
    for lp in trace(m):
        s = dp(lp, eps)
        if len(s) >= 3 and area(s) >= minarea: out.append([[int(x), int(y)] for x, y in s])
    return out

def polys_to_mask(size, polys):
    """even-odd fill: XOR of each polygon."""
    W, H = size; m = np.zeros((H, W), bool)
    for p in polys:
        im = Image.new('L', size, 0); ImageDraw.Draw(im).polygon([tuple(q) for q in p], fill=255); m ^= np.asarray(im) > 0
    return m

def hex2rgb(h): h = h.lstrip('#'); return np.array([int(h[i:i+2], 16) for i in (0, 2, 4)], float)

def blur(a, r=1):
    o = np.zeros_like(a, float); n = 0
    for dx in range(-r, r+1):
        for dy in range(-r, r+1):
            o += np.roll(np.roll(a.astype(float), dy, 0), dx, 1); n += 1
    return o/n

def recolour(img, mask, hexcol, lref, hi=0.5, feather=1):
    """luminance-preserving: out = target * (Y/Yref), highlights above Yref compressed by 'hi'. img uint8 HxWx3."""
    a = img.astype(float)
    Y = 0.2126*a[...,0] + 0.7152*a[...,1] + 0.0722*a[...,2]
    r = Y/lref; r = np.where(r > 1, 1 + (r-1)*hi, r)
    t = hex2rgb(hexcol)
    out = np.clip(t[None,None,:] * r[...,None], 0, 255)
    al = blur(mask, feather) if feather else mask.astype(float)
    al = np.clip(al, 0, 1)[..., None]
    return (a*(1-al) + out*al).round().astype(np.uint8)
