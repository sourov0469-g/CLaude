#!/usr/bin/env python3
"""Master directive Rule 3: every UI colour in the presented site comes from the declared tokens. CSS hex values become
var(--token); JS/HTML colour literals snap to the nearest token VALUE; rgba() keeps its alpha on the nearest token RGB.
Masks are exempt (alpha only). Backup rules, blocks and defs are skipped (they are records)."""
import re, sys, glob, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import recolor as R
TOK = {'ink': '#121212', 'ink-2': '#3A3633', 'muted': '#5E5852', 'grey': '#C9C1B6', 'line-soft': '#E3DBCF', 'surface-2': '#F1ECE4',
       'paper': '#FAF7F2', 'white': '#FFFFFF', 'a-50': '#FFF5EE', 'a-100': '#FFE7D6', 'a-200': '#FFC9A3', 'a-300': '#FF9C5E',
       'a-500': '#FF5F00', 'a-600': '#E95600', 'a-700': '#B84200', 'a-800': '#7A2C00', 'err': '#C42B1C', 'old': '#C9B48F'}
def rgb(h):
    h = R.norm(h).lstrip('#'); return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
TR = {k: rgb(v) for k, v in TOK.items()}
def nearest(c):
    r, g, b = c
    def d(t):
        rm = (r + t[0]) / 2
        return (2 + rm / 256) * (r - t[0]) ** 2 + 4 * (g - t[1]) ** 2 + (2 + (255 - rm) / 256) * (b - t[2]) ** 2
    return min(TR, key=lambda k: d(TR[k]))
stats = {'css': 0, 'lit': 0, 'rgba': 0}
MASK = ('mask', '-webkit-mask', 'mask-image', '-webkit-mask-image')
def hex_css(m):
    stats['css'] += 1; return 'var(--%s)' % nearest(rgb(m.group(0)))
def rgba_any(m):
    k = nearest((int(m.group(1)), int(m.group(2)), int(m.group(3))))
    t = TR[k]; stats['rgba'] += 1
    return 'rgba(%d, %d, %d, %s)' % (t[0], t[1], t[2], m.group(4))
def fix_decl(d):
    if ':' not in d: return d
    k, v = d.split(':', 1); prop = k.strip().lower()
    if prop in MASK or prop.startswith('--a-') or prop in ('--' + n for n in TOK): return d
    v = R.HEX.sub(hex_css, v)
    v = R.RGBA.sub(rgba_any, v)
    return k + ':' + v
R.fix_decl = fix_decl
def lit(m):
    stats['lit'] += 1; return TOK[nearest(rgb(m.group(0)))]
def js(f):
    s = open(f).read(); spans = []
    for m in re.finditer(r'\n    (b[1-8]): \{ init: function', s):
        nxt = re.search(r'\n    (?:/\*|[0-9a-z]+: \{ init: function)', s[m.end():])
        spans.append((m.start(), m.end() + (nxt.start() if nxt else len(s) - m.end())))
    keep = lambda p: any(a <= p < b for a, b in spans)
    s = re.sub(r'(?:#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})(?![\w-])', lambda m: m.group(0) if keep(m.start()) or not re.match(r'[\'"=:, ]', s[m.start() - 1]) else lit(m), s)   # never url(#id) or an id
    s = R.RGBA.sub(lambda m: m.group(0) if keep(m.start()) else rgba_any(m), s)
    open(f, 'w').write(s)
def html(f):
    h = open(f).read()
    blocks = [(m.start(), m.group(1)) for m in re.finditer(r'<div class="ver [^"]*" data-v="(b?\d)"', h)]
    bounds = [b[0] for b in blocks] + [len(h)]
    def bk(p):
        for i, (st, v) in enumerate(blocks):
            if st <= p < bounds[i + 1]: return v.startswith('b')
        return False
    # attribute and inline-style values only: never text content (an address like '#310' is not a colour)
    h = re.sub(r'((?:fill|stroke|stop-color|color|background)(?:=["\']|:\s*))(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})(?![\w-])', lambda m: m.group(0) if bk(m.start()) else m.group(1) + lit(re.match(r'.*', m.group(2))), h)
    open(f, 'w').write(h)
if __name__ == '__main__':
    for f in glob.glob(os.path.join(R.HERE, 'css', 'sections', '*.css')) + [os.path.join(R.HERE, 'css', n) for n in ('chrome.css', 'systems.css')]: R.css(f)
    for f in glob.glob(os.path.join(R.HERE, 'js', 'sections', '*.js')) + glob.glob(os.path.join(R.HERE, 'js', 'systems', '*.js')) + [os.path.join(R.HERE, 'js', 'core.js')]: js(f)
    for f in glob.glob(os.path.join(R.HERE, 'sections', '*.html')): html(f)
    print(stats)
