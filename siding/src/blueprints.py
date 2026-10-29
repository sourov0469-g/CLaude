"""Blueprint plates for work v2 (S0468): each house's own after photo turned into ink linework on paper.

Lines come only from the photo (edge detection), so the drawing is that job, not an invented house.
Writes site/assets/img/h/bp-{id}-1000.webp (graphite ink on the page's sheet colour).
"""
import os
import cv2
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
H = os.path.join(os.path.dirname(HERE), 'site', 'assets', 'img', 'h')
IDS = ['robroy', 'siding0', 'windows3', 'siding2', 'home2', 'windows1']
PAPER = np.array([0xFB, 0xFA, 0xF7], np.float32)   # --sheet
INK = np.array([0x2A, 0x2E, 0x35], np.float32)


def plate(pid):
    im = cv2.imread(os.path.join(H, f'work-{pid}-a-1000.webp'))
    g = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    g = cv2.bilateralFilter(g, 9, 40, 7)
    e1 = cv2.Canny(g, 40, 110, L2gradient=True)
    # keep connected strokes, drop specks (grass and leaves read as noise, not drawing)
    n, lab, st, _ = cv2.connectedComponentsWithStats(e1, connectivity=8)
    keep = np.zeros_like(e1)
    for i in range(1, n):
        x, y, w, h, a = st[i]
        if a >= 28 and max(w, h) >= 14:
            keep[lab == i] = 255
    line = cv2.GaussianBlur(keep.astype(np.float32) / 255.0, (0, 0), 0.6)
    line = np.clip(line * 1.6, 0, 1)[..., None]
    out = PAPER * (1 - line * 0.92) + INK * (line * 0.92)
    # a faint drafting grid under the ink (12 px), as the paper of the sheet
    grid = np.zeros(g.shape, np.float32)
    grid[::24, :] = 1
    grid[:, ::24] = 1
    out = out * (1 - grid[..., None] * 0.05) + np.array([0x8F, 0x8A, 0x80], np.float32) * grid[..., None] * 0.05
    rgb = cv2.cvtColor(np.clip(out, 0, 255).astype(np.uint8), cv2.COLOR_BGR2RGB)
    Image.fromarray(rgb).save(os.path.join(H, f'bp-{pid}-1000.webp'), 'WEBP', quality=70, method=6)


if __name__ == '__main__':
    for pid in IDS:
        plate(pid)
        print(pid, os.path.getsize(os.path.join(H, f'bp-{pid}-1000.webp')) // 1024, 'KB')
