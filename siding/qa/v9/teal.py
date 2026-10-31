"""Count accent pixels in each screenshot (OKLCH hue within 20 degrees of ACCENT_H, default 248 steel; 185 for the old teal; chroma > 0.03): solid (L < 0.62) and tint, plus
every saturated pixel of any hue (C > 0.08) so photographs and product swatches are visible as such.
Run: python3 -I qa/v9/teal.py SHOTDIR"""
import glob, os, sys, zlib, struct
import numpy as np

def png(path):
    data = open(path, 'rb').read(); pos = 8; chunks = []; w = h = 0
    while pos < len(data):
        ln, typ = struct.unpack('>I4s', data[pos:pos + 8]); body = data[pos + 8:pos + 8 + ln]; pos += 12 + ln
        if typ == b'IHDR': w, h, bd, ct = struct.unpack('>IIBB', body[:10])
        elif typ == b'IDAT': chunks.append(body)
    raw = zlib.decompress(b''.join(chunks)); bpp = 4 if ct == 6 else 3; stride = w * bpp
    out = np.zeros((h, stride), np.uint8); prev = np.zeros(stride, np.int32); i = 0
    for y in range(h):
        f = raw[i]; line = np.frombuffer(raw[i + 1:i + 1 + stride], np.uint8).astype(np.int32); i += 1 + stride
        if f == 1:
            line = line.copy()
            for x in range(bpp, stride): line[x] = (line[x] + line[x - bpp]) & 255
        elif f == 2: line = (line + prev) & 255
        elif f == 3:
            line = line.copy()
            for x in range(stride): line[x] = (line[x] + ((line[x - bpp] if x >= bpp else 0) + prev[x]) // 2) & 255
        elif f == 4:
            line = line.copy()
            for x in range(stride):
                a = line[x - bpp] if x >= bpp else 0; b = prev[x]; c = prev[x - bpp] if x >= bpp else 0
                p = a + b - c; pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                line[x] = (line[x] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        out[y] = line; prev = line
    return out.reshape(h, w, bpp)[:, :, :3]

def oklch(img):
    c = img.reshape(-1, 3) / 255.0
    lin = np.where(c <= 0.04045, c / 12.92, ((c + 0.055) / 1.055) ** 2.4)
    M1 = np.array([[0.4122214708, 0.5363325363, 0.0514459929], [0.2119034982, 0.6806995451, 0.1073969566], [0.0883024619, 0.2817188376, 0.6299787005]])
    lms = np.cbrt(lin @ M1.T)
    M2 = np.array([[0.2104542553, 0.7936177850, -0.0040720468], [1.9779984951, -2.4285922050, 0.4505937099], [0.0259040371, 0.7827717662, -0.8086757660]])
    lab = lms @ M2.T
    L, a, b = lab[:, 0], lab[:, 1], lab[:, 2]
    return L, np.hypot(a, b), (np.degrees(np.arctan2(b, a)) + 360) % 360

ACC = float(os.environ.get('ACCENT_H', 248))
rows = []
for f in sorted(glob.glob(os.path.join(sys.argv[1], '*.png'))):
    img = png(f)
    if img.shape[0] * img.shape[1] > 6_000_000: img = img[::2, ::2]
    L, C, H = oklch(img); n = L.size
    dh = np.abs((H - ACC + 180) % 360 - 180)
    teal = (dh < 20) & (C > 0.03)
    rows.append((os.path.basename(f)[:-4], 100 * (teal & (L < 0.62)).sum() / n, 100 * (teal & (L >= 0.62)).sum() / n, 100 * (C > 0.08).sum() / n))
rows.sort(key=lambda r: -(r[1] + r[2]))
print(f'views {len(rows)}; mean solid accent {np.mean([r[1] for r in rows]):.2f}% tint {np.mean([r[2] for r in rows]):.2f}%; views over 5% accent: {sum(1 for r in rows if r[1] + r[2] > 5)}')
for r in rows[:25]: print(f'{r[0]:40s} solid {r[1]:5.2f}%  tint {r[2]:5.2f}%  any saturated {r[3]:5.2f}%')
