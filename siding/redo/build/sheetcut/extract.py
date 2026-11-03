"""Interim layers for the hero rebuild, cut from the owner-approved heroes sheet (1920 x 1280) until Muse's high-res
layers arrive (ASSET-REQUEST-HERO.md). For each picked hero (1, 2, 3):
  - art: the photographic / composed region, cropped as-is (no text: text is rebuilt as live HTML);
  - sprites: every loose piece on the white page or white card (boards, shakes, nails, trims), segmented from the white
    background, each saved as a transparent PNG with its position in the hero card's own coordinates.
Writes ../assets/h<k>/... and ../assets/h<k>.json."""
import json, os
import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'assets')
sheet = cv2.cvtColor(cv2.imread(os.path.join(HERE, 'sheet.png')), cv2.COLOR_BGR2RGB)
H, W = sheet.shape[:2]

# card rectangles in sheet pixels (x0, y0, x1, y1), read off the sheet
CARDS = {1: (73, 57, 938, 628), 2: (980, 57, 1830, 628), 3: (73, 665, 938, 1238)}
# the quadrant each hero owns for loose pieces (outside its card too)
QUAD = {1: (0, 0, 958, 646), 2: (962, 0, 1920, 646), 3: (0, 648, 958, 1280)}
# regions kept as the art layer (sheet pixels)
ART = {1: (140, 122, 765, 498), 2: (980, 120, 1528, 628), 3: None}
# sheet text and labels inside the art crops, blanked to white (the live HTML text replaces them)
BLANK = {1: [], 2: [(1466, 270, 1528, 420), (1360, 585, 1460, 620)], 3: []}
# regions never cut into sprites: text, nav, the art layer
EXCL = {
    1: [(73, 57, 938, 122), (73, 485, 640, 628), (140, 122, 762, 498)],
    2: [(980, 57, 1830, 122), (1480, 270, 1790, 405), (1380, 580, 1470, 620), (980, 120, 1525, 628)],
    3: [(73, 665, 938, 728), (73, 1040, 938, 1238)],
}


def mask_of(rgb):
    r, g, b = [rgb[..., i].astype(int) for i in range(3)]
    mn = np.minimum(np.minimum(r, g), b); mx = np.maximum(np.maximum(r, g), b)
    m = ((mn < 236) & ((mx - mn) > 13)) | (mn < 200)        # colour or dark; skips grey drop shadows
    m = m.astype(np.uint8) * 255
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((3, 3), np.uint8))
    # fill holes (e.g. the cream faces inside an outlined board)
    ff = m.copy(); h, w = m.shape; cv2.floodFill(ff, np.zeros((h + 2, w + 2), np.uint8), (0, 0), 255)
    return m | cv2.bitwise_not(ff)


def run(k):
    qx0, qy0, qx1, qy1 = QUAD[k]; cx0, cy0, cx1, cy1 = CARDS[k]
    os.makedirs(os.path.join(OUT, f'h{k}'), exist_ok=True)
    region = sheet[qy0:qy1, qx0:qx1]
    m = mask_of(region)
    for (x0, y0, x1, y1) in EXCL[k]:
        m[max(0, y0 - qy0):max(0, y1 - qy0), max(0, x0 - qx0):max(0, x1 - qx0)] = 0
    n, lab, stats, cent = cv2.connectedComponentsWithStats(m, 8)
    sprites = []
    for i in range(1, n):
        x, y, w, h, area = stats[i]
        if area < 140 or w < 9 or h < 9: continue
        if ART[k]:   # pieces touching the art crop are already in the art: skip them (no sliced halves)
            ax0, ay0, ax1, ay1 = ART[k]; sx0, sy0 = x + qx0, y + qy0
            if sx0 < ax1 + 3 and sx0 + w > ax0 - 3 and sy0 < ay1 + 3 and sy0 + h > ay0 - 3: continue
        sub = (lab[y:y + h, x:x + w] == i).astype(np.uint8) * 255
        sub = cv2.dilate(sub, np.ones((3, 3), np.uint8))
        alpha = cv2.GaussianBlur(sub, (3, 3), 0)
        rgb = region[y:y + h, x:x + w]
        rgba = np.dstack([rgb, alpha])
        name = f'h{k}/p{len(sprites):02d}.png'
        cv2.imwrite(os.path.join(OUT, name), cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
        sx, sy = x + qx0, y + qy0                                   # sheet coords
        sprites.append({'src': name, 'x': int(sx - cx0), 'y': int(sy - cy0), 'w': int(w), 'h': int(h), 'area': int(area)})
    sprites.sort(key=lambda s: -s['area'])
    art = None
    if ART[k]:
        x0, y0, x1, y1 = ART[k]
        art = sheet[y0:y1, x0:x1].copy()
        for (bx0, by0, bx1, by1) in BLANK[k]: art[max(0, by0 - y0):by1 - y0, max(0, bx0 - x0):bx1 - x0] = 255
        # level the sheet's off-white ground to the card's pure white, with a soft ramp (no visible crop rectangle)
        mn = art.min(axis=2).astype(float); t = np.clip((mn - 226) / 12, 0, 1)[..., None]
        art = (art * (1 - t) + 255 * t).astype(np.uint8)
        cv2.imwrite(os.path.join(OUT, f'h{k}/art.png'), cv2.cvtColor(art, cv2.COLOR_RGB2BGR))
        art = {'src': f'h{k}/art.png', 'x': x0 - cx0, 'y': y0 - cy0, 'w': x1 - x0, 'h': y1 - y0}
    meta = {'card': {'w': cx1 - cx0, 'h': cy1 - cy0}, 'art': art, 'sprites': sprites}
    json.dump(meta, open(os.path.join(OUT, f'h{k}.json'), 'w'), indent=1)
    print(k, 'sprites', len(sprites), 'largest', [s['area'] for s in sprites[:5]])


if __name__ == '__main__':
    for k in (1, 2, 3): run(k)
