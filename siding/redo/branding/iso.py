"""Tiny isometric renderer for the Austin shape-motif set: convex prisms projected to SVG polygons, back faces culled,
faces shaded by their normal. Used to draw cut siding pieces, lap profiles, batten strips, corner posts and shakes with
real depth in three different styles (line drawing, primed relief, flat steel)."""
import math

C, S = math.cos(math.radians(30)), math.sin(math.radians(30))
VIEW = (1, 1, 1)  # viewer direction for this projection: larger x and y come toward the viewer


def proj(p, scale=1.0, ox=0.0, oy=0.0):
    x, y, z = p
    return (ox + (x - y) * C * scale, oy + (x + y) * S * scale - z * scale)


def sub(a, b): return (a[0] - b[0], a[1] - b[1], a[2] - b[2])
def cross(a, b): return (a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0])
def dot(a, b): return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]


def prism(cap, offset):
    """cap: list of 3D points (a convex polygon); offset: extrusion vector. Returns faces as lists of 3D points."""
    cap2 = [(p[0] + offset[0], p[1] + offset[1], p[2] + offset[2]) for p in cap]
    faces = [cap, cap2[::-1]]
    n = len(cap)
    for i in range(n):
        j = (i + 1) % n
        faces.append([cap[i], cap[j], cap2[j], cap2[i]])
    return faces


def centroid(pts):
    k = len(pts)
    return (sum(p[0] for p in pts) / k, sum(p[1] for p in pts) / k, sum(p[2] for p in pts) / k)


def render(solids, shade, scale=1.0, ox=0.0, oy=0.0, stroke=None, sw=1.0, extra=''):
    """solids: list of face lists (one per prism). shade(normal) -> fill colour. Draws visible faces back to front."""
    polys = []
    for faces in solids:
        cen = centroid([p for f in faces for p in f])
        for f in faces:
            nrm = cross(sub(f[1], f[0]), sub(f[2], f[0]))
            fc = centroid(f)
            if dot(nrm, sub(fc, cen)) < 0:          # make the normal point outward
                nrm = (-nrm[0], -nrm[1], -nrm[2])
            if dot(nrm, VIEW) <= 1e-9:
                continue
            L = math.sqrt(dot(nrm, nrm)) or 1
            nrm = (nrm[0] / L, nrm[1] / L, nrm[2] / L)
            depth = fc[0] + fc[1] + fc[2]
            polys.append((depth, f, nrm))
    polys.sort(key=lambda t: t[0])
    out = []
    for _, f, nrm in polys:
        pts = ' '.join(f'{x:.1f},{y:.1f}' for x, y in (proj(p, scale, ox, oy) for p in f))
        st = f' stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"' if stroke else ''
        out.append(f'<polygon points="{pts}" fill="{shade(nrm)}"{st} {extra}/>')
    return ''.join(out)


# ---- the five Austin shapes, as prisms (units: inches, roughly true proportions, exaggerated thickness) ----

def lap_board(length=48, height=8, t_top=0.4, t_butt=1.6):
    """A cut lap-siding board: wedge section (thin top edge, thick butt), extruded along x."""
    cap = [(0, 0, 0), (0, t_butt, 0), (0, t_top, height), (0, 0, height)]
    return [prism(cap, (length, 0, 0))]


def lap_profile(n=3, height=8, lap=1.25, t_top=0.4, t_butt=1.6, length=10):
    """Three courses in section, each lapped over the one below: the profile you see at a cut end."""
    solids = []
    for i in range(n):
        z0 = i * (height - lap)
        cap = [(0, 0, z0), (0, t_butt, z0), (0, t_top, z0 + height), (0, 0, z0 + height)]
        solids.append(prism(cap, (length, 0, 0)))
    return solids[::-1]


def batten(width=2.5, thick=1.0, height=40):
    cap = [(0, 0, 0), (width, 0, 0), (width, thick, 0), (0, thick, 0)]
    return [prism(cap, (0, 0, height))]


def corner_post(w=5.5, t=1.0, height=36):
    """Two boards meeting at an outside corner (an L in plan), split into two convex prisms."""
    a = [(0, 0, 0), (w, 0, 0), (w, t, 0), (0, t, 0)]
    b = [(0, t, 0), (t, t, 0), (t, w, 0), (0, w, 0)]
    return [prism(b, (0, 0, height)), prism(a, (0, 0, height))]


def shake(width=7, length=18, t_top=0.3, t_butt=1.1):
    """A shingle shake: tapered in thickness from tip to butt, standing on its butt."""
    cap = [(0, 0, 0), (0, t_butt, 0), (0, t_top, length), (0, 0, length)]
    return [prism(cap, (width, 0, 0))]


def bbox(solids, scale=1.0):
    pts = [proj(p, scale) for faces in solids for f in faces for p in f]
    xs, ys = [p[0] for p in pts], [p[1] for p in pts]
    return min(xs), min(ys), max(xs), max(ys)
