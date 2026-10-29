"""Register the Rob Roy 'before' photo onto the 'after' photo's main wall so the hero's course reveal installs
boards onto the same wall. One homography (the wall plane), SIFT + RANSAC. Writes robroy-bal-{800,1600}.webp."""
import os
import cv2
import numpy as np

PAIRS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'site', 'assets', 'img', 'pairs')


def main():
    a = cv2.imread(os.path.join(PAIRS, 'robroy-a-1600.webp'))
    b = cv2.imread(os.path.join(PAIRS, 'robroy-b-1600.webp'))
    ga = cv2.cvtColor(a, cv2.COLOR_BGR2GRAY)
    gb = cv2.cvtColor(b, cv2.COLOR_BGR2GRAY)
    # The siding colour changed, so match structure, not colour: blurred gradient magnitude, then ECC
    def grad(g):
        g = cv2.GaussianBlur(g, (0, 0), 2.0).astype(np.float32)
        gx, gy = cv2.Sobel(g, cv2.CV_32F, 1, 0), cv2.Sobel(g, cv2.CV_32F, 0, 1)
        m = cv2.magnitude(gx, gy)
        return cv2.GaussianBlur(m / (m.max() + 1e-6), (0, 0), 3.0)
    s = 0.5
    ea = grad(cv2.resize(ga, None, fx=s, fy=s))
    eb = grad(cv2.resize(gb, None, fx=s, fy=s))
    # the main gable wall and its openings (right two thirds, below the eave), not sky, trees or deck
    mask = np.zeros(ea.shape, np.uint8)
    mask[int(ea.shape[0] * .22):int(ea.shape[0] * .92), int(ea.shape[1] * .30):int(ea.shape[1] * .97)] = 255
    warp = np.eye(3, dtype=np.float32)
    crit = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 400, 1e-6)
    for mode in (cv2.MOTION_AFFINE, cv2.MOTION_HOMOGRAPHY):
        w0 = warp if mode == cv2.MOTION_HOMOGRAPHY else warp[:2]
        cc, w0 = cv2.findTransformECC(ea, eb, w0.copy(), mode, crit, mask, 5)
        warp = w0 if mode == cv2.MOTION_HOMOGRAPHY else np.vstack([w0, [0, 0, 1]]).astype(np.float32)
        print('ECC', mode, round(cc, 4))
    S = np.diag([1 / s, 1 / s, 1]).astype(np.float32)
    H = S @ np.linalg.inv(warp) @ np.linalg.inv(S)  # maps before -> after, full size
    print(np.round(H, 4))
    h, w = a.shape[:2]
    warped = cv2.warpPerspective(b, H, (w, h), flags=cv2.INTER_LANCZOS4, borderMode=cv2.BORDER_REPLICATE)
    cover = cv2.warpPerspective(np.full(b.shape[:2], 255, np.uint8), H, (w, h), flags=cv2.INTER_NEAREST)
    # largest 16:10 crop (left edge at 0, any height offset) that the warped before covers completely
    rows_ok = lambda y0, ch, cw: cover[y0:y0 + ch, :cw].min() == 255
    found = None
    for cw in range(w, int(w * .8), -4):
        ch = int(round(cw * 10 / 16))
        for y0 in range(0, h - ch + 1, 2):
            if rows_ok(y0, ch, cw):
                found = (cw, ch, y0)
                break
        if found:
            break
    if not found:
        raise SystemExit('no full-coverage crop')
    cw, ch, y0 = found
    print('crop', cw, ch, 'y0', y0)
    for name, img in (('robroy-hb', warped), ('robroy-ha', a)):
        crop = img[y0:y0 + ch, :cw]
        for W in (760, 1440):
            out = cv2.resize(crop, (W, W * 10 // 16), interpolation=cv2.INTER_AREA)
            cv2.imwrite(os.path.join(PAIRS, f'{name}-{W}.webp'), out, [cv2.IMWRITE_WEBP_QUALITY, 80])


if __name__ == '__main__':
    main()
