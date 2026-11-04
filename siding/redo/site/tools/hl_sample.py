"""Hero L colour sampling (GATE-NEW-Hero-L.md). Reproduces the eight colours in build_site.HL_COLOURS.

Reads the eight job photos already embedded in the built page (window.__JOBS, 640 x 480) and, for each, takes the
median colour of the sunlit part (luminance >= 60th percentile) of a hand-placed region on the work itself:
the siding on a siding job, the shingles on the roofing job, the frames on a window job (frames: neutral pixels only,
saturation < 0.12). The result is a photo colour, not a paint or product name.

Run: python3 tools/hl_sample.py   (after a build; prints a JSON list in __JOBS order)
"""
import base64, io, json, os, re
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# regions (x0, y0, x1, y1) in the 640 x 480 photo, per __JOBS index
REGIONS = {
    0: [(110, 120, 220, 190)],                                           # siding, gable wall
    1: [(130, 200, 470, 245)],                                           # shingle roofing, lower roof plane
    2: [(565, 140, 605, 320)],                                           # siding, wall right of the porch
    3: [(185, 120, 192, 340), (314, 120, 320, 340), (192, 112, 320, 119)],   # window frame: jambs and head
    4: [(310, 180, 365, 370)],                                           # siding, wall left of the stone
    5: [(190, 235, 300, 325)],                                           # painted siding, front wall
    6: [(80, 300, 200, 400)],                                            # siding, left wall
    7: [(316, 102, 321, 250), (410, 183, 515, 187)],                     # window frames: jamb and meeting rail
}
FRAMES = {3, 7}


def main():
    s = open(os.path.join(HERE, 'out', 'site.html'), encoding='utf-8').read()
    jobs = json.loads(re.search(r'window\.__JOBS=(\[.*?\]);', s, re.S).group(1))
    out = []
    for i, j in enumerate(jobs):
        im = Image.open(io.BytesIO(base64.b64decode(j['src'].split(',', 1)[1]))).convert('RGB')
        a = np.asarray(im).astype(float)
        px = np.concatenate([a[y0:y1, x0:x1].reshape(-1, 3) for x0, y0, x1, y1 in REGIONS[i]])
        if i in FRAMES:
            mx, mn = px.max(1), px.min(1); px = px[(mx - mn) / np.maximum(mx, 1) < 0.12]
        lum = px @ [0.2126, 0.7152, 0.0722]; px = px[lum >= np.percentile(lum, 60)]
        out.append('#%02X%02X%02X' % tuple(int(v) for v in np.median(px, 0)))
    print(json.dumps(out))


if __name__ == '__main__':
    main()
