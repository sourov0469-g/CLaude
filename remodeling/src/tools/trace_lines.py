"""Trace the straight edges of a real project photo into SVG line data.

The drawings on the homepage are not invented: every stroke is an edge of the
photograph it sits on (Canny edges -> probabilistic Hough -> collinear merge).
Output: JSON {w, h, lines: [[x1, y1, x2, y2], ...]} in the photo's own pixel
space at width 1600, ordered longest first (structure, then detail).

usage: python3 trace_lines.py photo.jpg out.json [max_lines]
"""
import json
import math
import sys

import cv2
import numpy as np


def segments(img):
    g = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    g = cv2.bilateralFilter(g, 7, 40, 40)
    e = cv2.Canny(g, 50, 150)
    lines = cv2.HoughLinesP(e, 1, np.pi / 720, threshold=70, minLineLength=70, maxLineGap=10)
    return [] if lines is None else [tuple(map(float, l)) for l in lines[:, 0]]


def merge(segs, ang_tol=1.6, off_tol=7.0, gap=26.0):
    """Greedy collinear merge: same angle, same offset, overlapping or near."""
    items = []
    for x1, y1, x2, y2 in segs:
        a = math.atan2(y2 - y1, x2 - x1)
        if a < 0:
            a += math.pi
        if a >= math.pi:
            a -= math.pi
        items.append([a, x1, y1, x2, y2])
    items.sort(key=lambda s: -math.hypot(s[3] - s[1], s[4] - s[2]))
    out = []
    for a, x1, y1, x2, y2 in items:
        nx, ny = -math.sin(a), math.cos(a)
        dx, dy = math.cos(a), math.sin(a)
        rho = x1 * nx + y1 * ny
        t1, t2 = sorted((x1 * dx + y1 * dy, x2 * dx + y2 * dy))
        for o in out:
            da = abs(o["a"] - a)
            da = min(da, math.pi - da)
            if da > math.radians(ang_tol) or abs(o["rho"] - rho) > off_tol:
                continue
            if t1 > o["t2"] + gap or t2 < o["t1"] - gap:
                continue
            o["t1"], o["t2"] = min(o["t1"], t1), max(o["t2"], t2)
            break
        else:
            out.append({"a": a, "rho": rho, "t1": t1, "t2": t2})
    res = []
    for o in out:
        nx, ny = -math.sin(o["a"]), math.cos(o["a"])
        dx, dy = math.cos(o["a"]), math.sin(o["a"])
        p1 = (o["rho"] * nx + o["t1"] * dx, o["rho"] * ny + o["t1"] * dy)
        p2 = (o["rho"] * nx + o["t2"] * dx, o["rho"] * ny + o["t2"] * dy)
        res.append([round(p1[0], 1), round(p1[1], 1), round(p2[0], 1), round(p2[1], 1)])
    res.sort(key=lambda l: -math.hypot(l[2] - l[0], l[3] - l[1]))
    return res


def main():
    src, dst = sys.argv[1], sys.argv[2]
    cap = int(sys.argv[3]) if len(sys.argv) > 3 else 90
    img = cv2.imread(src)
    h, w = img.shape[:2]
    s = 1600 / w
    img = cv2.resize(img, (1600, round(h * s)), interpolation=cv2.INTER_AREA)
    lines = [l for l in merge(segments(img)) if math.hypot(l[2] - l[0], l[3] - l[1]) >= 60][:cap]
    json.dump({"w": 1600, "h": img.shape[0], "lines": lines}, open(dst, "w"))
    print(dst, len(lines))


if __name__ == "__main__":
    main()
