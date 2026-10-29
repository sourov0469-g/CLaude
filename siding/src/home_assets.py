"""Image set for homepage v2 (DIRECTION-HOME-V2.md). All sources are the firm's own photos already in site/assets/img.

`python3 -I home_assets.py` writes site/assets/img/h/:
  work-{id}-{b|a}-1000.webp   six before/after pairs registered onto the after photo (one homography, ECC on edges),
                              cropped to the largest 16:10 window the warped before fully covers
  t/p{i}-320.webp             43 captioned project photos as 320 px thumbnails
  trade-{slug}-800.webp       one photo per trade, chosen by the firm's own trade caption
  hero-*.webp, book-1000.webp hero and booking photos
Sized for the single-file deliverable: about 3.5 MB of images in total.
"""
import os
import cv2
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(os.path.dirname(HERE), 'site', 'assets', 'img')
OUT = os.path.join(IMG, 'h')
WORK = ['siding0', 'siding2', 'windows3', 'windows1', 'home2']  # ECC 0.43-0.73 on edge maps; Rob Roy is registered already
TRADE_PHOTO = {'siding': 0, 'windows': 42, 'exterior-painting': 33, 'shingle-roofing': 11, 'gutters': 34,
               'doors': 22, 'patio-covers': 18, 'metal-roofing': 12, 'garage-doors': 26}


def grad(g):
    g = cv2.GaussianBlur(g, (0, 0), 2.0).astype(np.float32)
    m = cv2.magnitude(cv2.Sobel(g, cv2.CV_32F, 1, 0), cv2.Sobel(g, cv2.CV_32F, 0, 1))
    return cv2.GaussianBlur(m / (m.max() + 1e-6), (0, 0), 3.0)


def save(img_bgr, path, w, q=72):
    h = int(round(w * img_bgr.shape[0] / img_bgr.shape[1]))
    im = cv2.resize(img_bgr, (w, h), interpolation=cv2.INTER_AREA)
    Image.fromarray(cv2.cvtColor(im, cv2.COLOR_BGR2RGB)).save(path, 'WEBP', quality=q, method=6)


def register(pid):
    a = cv2.imread(os.path.join(IMG, 'pairs', f'{pid}a-1280.webp'))
    b = cv2.imread(os.path.join(IMG, 'pairs', f'{pid}b-1280.webp'))
    s = 0.5
    ea = grad(cv2.resize(cv2.cvtColor(a, cv2.COLOR_BGR2GRAY), None, fx=s, fy=s))
    eb = grad(cv2.resize(cv2.cvtColor(b, cv2.COLOR_BGR2GRAY), None, fx=s, fy=s))
    mask = np.zeros(ea.shape, np.uint8)
    mask[int(ea.shape[0] * .1):int(ea.shape[0] * .9), int(ea.shape[1] * .08):int(ea.shape[1] * .92)] = 255
    warp = np.eye(3, dtype=np.float32)
    crit = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 300, 1e-6)
    cc = 0
    for mode in (cv2.MOTION_AFFINE, cv2.MOTION_HOMOGRAPHY):
        w0 = warp if mode == cv2.MOTION_HOMOGRAPHY else warp[:2]
        cc, w0 = cv2.findTransformECC(ea, eb, w0.copy(), mode, crit, mask, 5)
        warp = w0 if mode == cv2.MOTION_HOMOGRAPHY else np.vstack([w0, [0, 0, 1]]).astype(np.float32)
    S = np.diag([1 / s, 1 / s, 1]).astype(np.float32)
    H = S @ np.linalg.inv(warp) @ np.linalg.inv(S)
    h, w = a.shape[:2]
    warped = cv2.warpPerspective(b, H, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REPLICATE)
    cover = cv2.warpPerspective(np.full(b.shape[:2], 255, np.uint8), H, (w, h), flags=cv2.INTER_NEAREST)
    for cw in range(w, int(w * .6), -4):
        ch = int(round(cw * 10 / 16))
        hit = None
        for y0 in range(0, h - ch + 1, 4):
            for x0 in range(0, w - cw + 1, 4):
                if cover[y0:y0 + ch, x0:x0 + cw].min() == 255:
                    hit = (x0, y0)
                    break
            if hit:
                break
        if hit:
            x0, y0 = hit
            save(warped[y0:y0 + ch, x0:x0 + cw], os.path.join(OUT, f'work-{pid}-b-1000.webp'), 1000)
            save(a[y0:y0 + ch, x0:x0 + cw], os.path.join(OUT, f'work-{pid}-a-1000.webp'), 1000)
            print(pid, 'ECC', round(cc, 3), 'crop', cw, ch)
            return
    raise SystemExit(f'{pid}: no full-coverage crop')


def main():
    os.makedirs(os.path.join(OUT, 't'), exist_ok=True)
    for pid in WORK:
        register(pid)
    for side in 'ba':
        save(cv2.imread(os.path.join(IMG, 'pairs', f'robroy-h{side}-1440.webp')), os.path.join(OUT, f'work-robroy-{side}-1000.webp'), 1000)
    for i in range(43):
        save(cv2.imread(os.path.join(IMG, 'photos', f'p{i}-640.webp')), os.path.join(OUT, 't', f'p{i}-320.webp'), 320, q=62)
    for slug, i in TRADE_PHOTO.items():
        save(cv2.imread(os.path.join(IMG, 'photos', f'p{i}-1400.webp')), os.path.join(OUT, f'trade-{slug}-800.webp'), 800, q=68)
    save(cv2.imread(os.path.join(IMG, 'photos', 'p0-1400.webp')), os.path.join(OUT, 'hero-window-1400.webp'), 1400, q=70)
    for side in 'ba':
        save(cv2.imread(os.path.join(IMG, 'pairs', f'home5{side}-1280.webp')), os.path.join(OUT, f'hero-paint-{side}-1280.webp'), 1280, q=72)
    save(cv2.imread(os.path.join(IMG, 'pairs', 'home0a-1280.webp')), os.path.join(OUT, 'book-1000.webp'), 1000, q=70)
    tot = sum(os.path.getsize(os.path.join(dp, f)) for dp, _, fs in os.walk(OUT) for f in fs)
    print('h/ total', tot // 1024, 'KB')


if __name__ == '__main__':
    main()
