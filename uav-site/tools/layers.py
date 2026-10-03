"""Survey-layer renders of a photograph: a low-poly 'model' view (Delaunay mesh coloured from the photo,
with vertex points) and an 'ortho' view (flattened, stitched-tile look). Needs numpy + opencv-python-headless.
Run through tools/images.py; the generated WebP files are committed, so a normal build does not need these."""
import cv2, numpy as np

def lowpoly(im, n_feat=520, grid=72, seed=4, edge_alpha=0.34, dark=0.86):
    h, w = im.shape[:2]
    g = cv2.createCLAHE(2.0, (8, 8)).apply(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY))
    feats = cv2.goodFeaturesToTrack(cv2.GaussianBlur(g, (0, 0), 1.2), n_feat, 0.012, 9)
    pts = [tuple(p[0]) for p in feats] if feats is not None else []
    rng = np.random.default_rng(seed)
    for y in range(0, h + 1, grid):
        for x in range(0, w + 1, grid):
            pts.append((min(w - 1, max(0, x + rng.uniform(-grid * .3, grid * .3))), min(h - 1, max(0, y + rng.uniform(-grid * .3, grid * .3)))))
    for x in range(0, w + 1, grid): pts += [(min(x, w - 1), 0), (min(x, w - 1), h - 1)]
    for y in range(0, h + 1, grid): pts += [(0, min(y, h - 1)), (w - 1, min(y, h - 1))]
    sub = cv2.Subdiv2D((0, 0, w, h)); seen = set(); kept = []
    for p in pts:
        k = (int(p[0]), int(p[1]))
        if k in seen: continue
        seen.add(k); kept.append(k)
        try: sub.insert((float(p[0]), float(p[1])))
        except Exception: pass
    tris = [t for t in sub.getTriangleList().reshape(-1, 3, 2) if not ((t < -1).any() or (t[:, 0] > w + 1).any() or (t[:, 1] > h + 1).any())]
    blur = cv2.GaussianBlur(im, (0, 0), 2.0)
    out = np.zeros_like(im); tint = np.array([34, 30, 24], np.float32)
    for t in tris:
        c = t.mean(axis=0); cx = int(min(w - 1, max(0, c[0]))); cy = int(min(h - 1, max(0, c[1])))
        col = blur[cy, cx].astype(np.float32); gray = col.mean()
        cv2.fillConvexPoly(out, t.astype(np.int32), ((col * .8 + gray * .2) * dark + tint * .16).tolist(), cv2.LINE_AA)
    ov = out.copy()
    for t in tris: cv2.polylines(ov, [t.astype(np.int32)], True, (165, 196, 225), 1, cv2.LINE_AA)
    res = cv2.addWeighted(ov, edge_alpha, out, 1 - edge_alpha, 0)
    for x, y in kept:
        if 0 <= x < w and 0 <= y < h: cv2.circle(res, (x, y), 2, (200, 226, 246), -1, cv2.LINE_AA)
    return res

def ortho(im, tile=80):
    h, w = im.shape[:2]
    gray = cv2.cvtColor(cv2.cvtColor(im, cv2.COLOR_BGR2GRAY), cv2.COLOR_GRAY2BGR).astype(np.float32)
    out = gray * .5 + im.astype(np.float32) * .5
    rng = np.random.default_rng(5)
    for y in range(0, h, tile):
        for x in range(0, w, tile): out[y:y + tile, x:x + tile] *= 1 + rng.uniform(-.07, .07)
    out = np.clip(out, 0, 255)
    for y in range(0, h, tile): cv2.line(out, (0, y), (w, y), (170, 190, 205), 1)
    for x in range(0, w, tile): cv2.line(out, (x, 0), (x, h), (170, 190, 205), 1)
    return out.astype(np.uint8)

def render(pil_im, kind, width=1000):
    """pil_im: RGB PIL image. Returns RGB PIL image."""
    from PIL import Image
    im = cv2.cvtColor(np.array(pil_im.convert('RGB')), cv2.COLOR_RGB2BGR)
    if im.shape[1] > width: im = cv2.resize(im, (width, round(im.shape[0] * width / im.shape[1])), interpolation=cv2.INTER_AREA)
    out = lowpoly(im) if kind == 'model' else ortho(im)
    return Image.fromarray(cv2.cvtColor(out, cv2.COLOR_BGR2RGB))
