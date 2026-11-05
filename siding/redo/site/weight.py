"""WEIGHT PASS (GATE-WEIGHT, step 0 of AUSTIN-UPGRADE-PLAN-2026-11-05). Runs on the finished HTML text of the build.

Three rules, all safe by construction:
 1. RIGHT-SIZE. An embedded image is shrunk (never enlarged) to 1.75x the widest CSS width it is actually shown at, measured
    by measure_images.js over every homepage version view and every subpage view at 1440 and 768 (media/img-need.json).
    An image never seen in an <img> keeps its own size up to a 1280 px long edge. Re-encoded as WebP; a result that is not
    clearly smaller (under 92% of the original) is dropped and the original kept.
    Only images used as <img src> or inside the JSON of window.__JOBS / __SVCK / __WINN are touched. Canvas photos
    (window.__PHOTOS, __HERO2: their board coordinates are in source pixels), CSS backgrounds and the video poster are not.
 2. ONE COPY. An image that appears more than once is stored once in a JSON registry (#imgreg); every use becomes a 1 px
    placeholder with data-dd="n" (or the string "@dd/n" inside the JSON globals). A resolver runs at the very start of the
    boot, before any module reads the images, and fills <img> elements (inside nested templates too) and the globals.
 3. (in build_site.py) ONE FILM. The hero film is embedded as MP4 only.
"""
import re, io, os, json, base64, math, itertools
import numpy as np
from PIL import Image

URI = re.compile(r'data:(image/(?:webp|jpeg|png));base64,([A-Za-z0-9+/=]+)')
IMG_SRC = re.compile(r'src="(data:image/(?:webp|jpeg|png);base64,[A-Za-z0-9+/=]+)"')
JS_STR = re.compile(r'"(data:image/(?:webp|jpeg|png);base64,[A-Za-z0-9+/=]+)"')
TINY = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
OK_GLOBALS = ('__JOBS', '__SVCK', '__WINN')
CANVAS_GLOBALS = ('__PHOTOS', '__HERO2')   # source pixels matter here (board polygons, depth maps): recompress, never resize
HEAVY = 90000                              # images this large may be re-encoded at q58 at their own size
CANVAS_MIN = 40000                         # smaller ones (depth maps, mattes) are left exactly as they are
FACTOR, FLOOR, CAP_SEEN, CAP_UNSEEN = 1.75, 560, 1600, 1280
RESOLVER = (
    "{const R=JSON.parse(document.getElementById('imgreg').textContent),dd=s=>typeof s==='string'&&s.startsWith('@dd/')?R[s.slice(4)]:s;"
    "const fix=r=>{r.querySelectorAll('img[data-dd]').forEach(e=>{e.src=R[e.dataset.dd];e.removeAttribute('data-dd');});r.querySelectorAll('template').forEach(t=>fix(t.content));};"
    "fix(document);const walk=o=>{for(const k in o){const v=o[k];if(typeof v==='string')o[k]=dd(v);else if(v&&typeof v==='object')walk(v);}};"
    "[window.__JOBS,window.__SVCK,window.__WINN].forEach(o=>o&&walk(o));}")


def key(uri):
    return f'{len(uri)}:{uri[-64:]}'


def _kind(h, pos):
    """'img' (an <img src> attribute), 'js:<global>' (inside an allowed window.__X JSON), or None (not eligible)."""
    t = h.rfind('<', 0, pos)
    if h.startswith('<img', t) and h[t:pos].rstrip().endswith('src="'):
        return 'img'
    s = h.rfind('<script', 0, pos)
    if s > h.rfind('</script>', 0, pos):
        k = h.rfind('window.__', s, pos)
        m = re.match(r'window\.(__\w+)=', h[k:k + 30]) if k > 0 else None
        if m and m.group(1) in OK_GLOBALS:
            return 'js'
        if m and m.group(1) in CANVAS_GLOBALS:
            return 'canvas'
    return None


SAME_ASPECT, SAME_HASH, SAME_MAD, MIN_LEN = 0.02, 8, 2.0, 20000


def _fingerprint(uri):
    im = Image.open(io.BytesIO(base64.b64decode(uri.split(',', 1)[1]))); im.load(); W, H = im.size; g = im.convert('L')
    d = np.asarray(g.resize((9, 8), Image.LANCZOS), dtype=np.int16)
    return W, H, (d[:, :-1] > d[:, 1:]).flatten(), np.asarray(g.resize((48, 36), Image.LANCZOS), dtype=np.float32)


def same_photo_map(uris):
    """{smaller copy: largest copy} for the same photograph embedded at several sizes. A pair counts as the same photo only if
    it has the same aspect ratio (within 2%), a near-identical difference hash AND a near-identical 48x36 pixel thumbnail
    (mean difference <= 2 of 255; measured: true copies <= 1.4; a repainted house or any other photo is far above)."""
    us = [u for u in uris if len(u) >= MIN_LEN]
    fp = [_fingerprint(u) for u in us]
    parent = list(range(len(us)))
    def find(i):
        while parent[i] != i:
            parent[i] = parent[parent[i]]; i = parent[i]
        return i
    for a, b in itertools.combinations(range(len(us)), 2):
        A, B = fp[a], fp[b]
        if abs(A[0] / A[1] - B[0] / B[1]) > SAME_ASPECT or int((A[2] != B[2]).sum()) > SAME_HASH:
            continue
        if float(np.abs(A[3] - B[3]).mean()) <= SAME_MAD:
            parent[find(a)] = find(b)
    groups = {}
    for i in range(len(us)):
        groups.setdefault(find(i), []).append(i)
    out = {}
    for g in groups.values():
        if len(g) > 1:
            m = max(g, key=lambda i: (fp[i][0] * fp[i][1], -len(us[i])))
            for i in g:
                if i != m:
                    out[us[i]] = us[m]
    return out


def _encode(im, tw, q=None):
    W, H = im.size
    if tw < W:
        im = im.resize((tw, max(1, round(H * tw / W))), Image.LANCZOS)
    q = q or (70 if tw > 1200 else 66 if tw > 800 else 62)
    alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
    im = im.convert('RGBA' if alpha else 'RGB')
    o = io.BytesIO(); im.save(o, 'WEBP', quality=q, method=6)
    return 'data:image/webp;base64,' + base64.b64encode(o.getvalue()).decode()


def weight_pass(h, need_path, log=print):
    need = json.load(open(need_path)) if os.path.exists(need_path) else {}
    raw_len = len(h.encode())
    # ---- classify every embedded image: eligible only if every one of its uses is eligible
    kinds = {}
    for m in URI.finditer(h):
        k = _kind(h, m.start())
        kinds.setdefault(m.group(0), set()).add(k)
    elig = [u for u, ks in kinds.items() if ks <= {'img', 'js'} and None not in ks]
    canvas = [u for u, ks in kinds.items() if ks == {'canvas'} and len(u) >= CANVAS_MIN]
    keys = {}
    for u in kinds:
        keys.setdefault(key(u), []).append(u)
    assert all(len(v) == 1 for v in keys.values()), 'image key collision: widen key()'
    # ---- 1. right-size
    newmap, rows, upscaled = {}, [], []
    for u in elig:
        if not u.startswith('data:image/'):
            continue
        raw = base64.b64decode(u.split(',', 1)[1]); im = Image.open(io.BytesIO(raw)); im.load(); W, H = im.size
        n = need.get(key(u))
        if n:
            tw = min(W, max(FLOOR, math.ceil(n * FACTOR)), CAP_SEEN)
            if n > W + 2:
                upscaled.append((W, n))
        else:
            tw = min(W, CAP_UNSEEN) if max(W, H) <= CAP_UNSEEN else min(W, round(CAP_UNSEEN * W / max(W, H)))
        new = _encode(im, tw)
        if tw == W and len(u) >= HEAVY:   # same pixel size and a heavy file: a stronger encode is allowed, if it clearly pays
            alt = _encode(im, tw, q=58)
            if len(alt) < len(new):
                new = alt
        if len(new) < (0.85 if len(u) >= HEAVY else 0.92) * len(u):
            newmap[u] = new; rows.append((len(u), len(new), W, tw, bool(n)))
    # the canvas photos keep their exact pixel size (coordinates are in source pixels); only the encoding changes
    csaved = 0
    for u in canvas:
        raw = base64.b64decode(u.split(',', 1)[1]); im = Image.open(io.BytesIO(raw)); im.load(); W, H = im.size
        o = io.BytesIO(); im.convert('RGB').save(o, 'WEBP', quality=76, method=6)
        new = 'data:image/webp;base64,' + base64.b64encode(o.getvalue()).decode()
        assert Image.open(io.BytesIO(o.getvalue())).size == (W, H)
        if len(new) < 0.8 * len(u):
            newmap[u] = new; csaved += len(u) - len(new)
    h = URI.sub(lambda m: newmap.get(m.group(0), m.group(0)), h)
    after_resize = len(h.encode())
    # the same photograph embedded at several sizes: every use is pointed at the largest copy (never a smaller one)
    now = {newmap.get(u, u) for u in elig}
    same = same_photo_map(now)
    h = URI.sub(lambda m: same.get(m.group(0), m.group(0)), h)
    after_merge = len(h.encode())
    # ---- 2. one copy of each repeated image
    count = {}
    for m in URI.finditer(h):
        count[m.group(0)] = count.get(m.group(0), 0) + 1
    elig2 = {same.get(newmap.get(u, u), newmap.get(u, u)) for u in elig}
    dup = [u for u, c in count.items() if c > 1 and u in elig2]
    ids = {u: str(i) for i, u in enumerate(dup)}
    h = IMG_SRC.sub(lambda m: f'src="{TINY}" data-dd="{ids[m.group(1)]}"' if m.group(1) in ids else m.group(0), h)
    h = JS_STR.sub(lambda m: f'"@dd/{ids[m.group(1)]}"' if m.group(1) in ids else m.group(0), h)
    left = [u for u in dup if u in h]
    assert not left, f'{len(left)} repeated images still present after the one-copy pass'
    if dup:
        reg = '<script type="application/json" id="imgreg">' + json.dumps({i: u for u, i in ids.items()}, separators=(',', ':')) + '</script>'
        marker = '<script>window.__HERO2='
        assert h.count(marker) == 1
        h = h.replace(marker, reg + marker)
        assert h.count('/*DDRES*/') == 1
        h = h.replace('/*DDRES*/', RESOLVER)
    else:
        h = h.replace('/*DDRES*/', '')
    final = len(h.encode())
    st = {'raw': raw_len, 'after_resize': after_resize, 'final': final, 'resized': len(rows), 'eligible': len(elig),
          'dup_groups': len(dup), 'seen_resized': sum(1 for r in rows if r[4]), 'upscaled_in_view': sorted(upscaled),
          'canvas_recompressed': len([u for u in canvas if u in newmap]), 'saved_canvas': csaved, 'merged_copies': len(same), 'saved_merge_and_dedupe': after_resize - final, 'saved_resize': raw_len - after_resize - csaved}
    log(json.dumps(st))
    return h, st
