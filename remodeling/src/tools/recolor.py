#!/usr/bin/env python3
"""OWNER REDESIGN: one-time recolour of the PRESENTED site to black + white + one orange accent on light grounds.
Property-aware in CSS (a dark background becomes white, dark text stays near-black, cream text becomes near-black,
teal/gold become the accent, reds become one error red). JS colour literals are recoloured outside backup defs.
Backup-prefixed CSS rules and backup JS defs (b1..b3) are left exactly as recorded."""
import re, sys, glob, os
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BK = ['ba1', 'consult2', 'financing2', 'hero1', 'hero2', 'hero3', 'process1', 'proof2', 'reviews1', 'services1', 'towns3', 'work3']
bkre = re.compile(r'\.(' + '|'.join(BK) + r')(?![\w-])|\.(' + '|'.join(BK) + r')__')
INK, WHITE, MUTED, GREY, A, A7, A1, A2, A3, A8, ERR = '#121212', '#FFFFFF', '#5E5852', '#C9C1B6', '#FF5F00', '#B84200', '#FFE3CF', '#FFC29A', '#FF9A5C', '#7A2C00', '#C42B1C'
DARK = {'#0b1418', '#1b2629', '#12212a', '#2a3a3f', '#3b4a50', '#15272f', '#1c313b', '#0a1216', '#162228', '#101c21'}
CREAM = {'#e8e4dc', '#f3eee2', '#f4efe2', '#f6f1e4', '#eef4f9', '#dff1f3', '#e8e2d4', '#e4f1e7', '#f2f5f4', '#fff8e8', '#ffe08a'}
MID = {'#a9b6b9', '#c9d1d3', '#9fc3df', '#4a5a5e', '#5f7176', '#9aa3a5', '#4a5d62', '#7f8b8e', '#33444a', '#3a4a4f', '#9fb0b5', '#6b7a7e'}
TEAL = {'#77b3b8', '#9fd0d4', '#5aa8d6', '#12324f', '#2e6b70', '#1e6b3a', '#3f8a5a', '#2b6a96', '#5ab6e6'}
DEEP = {'#1d4a4e'}
GOLD = {'#f2c230', '#f08a2b', '#ffd23f', '#e8b923'}
RED = {'#e2412b', '#c8402e', '#ff5a3c', '#d64b37', '#b5341f', '#ff8a75', '#ff8a70', '#c8402e', '#b03324'}
WOOD_L = {'#c9a46a', '#e2c48f', '#a98652', '#c9b48f'}
WOOD_M = {'#b07a45', '#8a5a33'}
WOOD_D = {'#4a3218', '#6e4c26', '#3a2f20'}
TEXTP = ('color', 'caret-color', '-webkit-text-fill-color')
BGP = ('background', 'background-color', 'background-image', '--tint')

def norm(h):
    h = h.lower()
    if len(h) == 4: h = '#' + ''.join(c * 2 for c in h[1:])
    return h

def map_hex(h, prop):
    n = norm(h)
    text = prop in TEXTP or prop.startswith('--') and 'ink' in prop
    bg = prop in BGP or prop.startswith('--bg') or prop.startswith('--surface') or prop.startswith('--field')
    if n in DARK: return WHITE if bg else INK
    if n in CREAM: return WHITE if (bg or prop in ('fill',)) else INK
    if n in MID: return MUTED if text else GREY
    if n in TEAL or n in GOLD: return A7 if text else A
    if n in DEEP: return INK if text else A
    if n in RED: return ERR
    if n in WOOD_L: return A2
    if n in WOOD_M: return A3
    if n in WOOD_D: return A8
    return h

def map_rgba(m, prop):
    r, g, b, a = m.group(1), m.group(2), m.group(3), m.group(4)
    rgb = (int(r), int(g), int(b))
    bg = prop in BGP
    if rgb in ((11, 20, 24), (27, 38, 41), (8, 14, 17), (0, 0, 0)) and prop not in ('box-shadow', 'filter', 'mask', '-webkit-mask', '--shadow', 'text-shadow'):
        return 'rgba(255, 255, 255, %s)' % a if bg else 'rgba(18, 18, 18, %s)' % a
    if rgb in ((232, 228, 220), (238, 244, 249), (243, 238, 226), (255, 255, 255)) and not bg:
        return 'rgba(18, 18, 18, %s)' % a
    if rgb in ((232, 228, 220), (238, 244, 249), (243, 238, 226)) and bg:
        return 'rgba(18, 18, 18, %s)' % (round(float(a) * .5, 3) if a.strip() else a)
    if rgb in ((119, 179, 184), (242, 194, 48), (90, 182, 230), (29, 74, 78), (46, 107, 112)):
        return 'rgba(255, 95, 0, %s)' % a
    if rgb in ((200, 64, 46), (226, 65, 43), (214, 75, 55)):
        return 'rgba(196, 43, 28, %s)' % a
    return m.group(0)

RGBA = re.compile(r'rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([.\d]+)\s*\)')
HEX = re.compile(r'#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b')

def fix_decl(d):
    if ':' not in d: return d
    k, v = d.split(':', 1)
    prop = k.strip().lower()
    v = HEX.sub(lambda m: map_hex(m.group(0), prop), v)
    v = RGBA.sub(lambda m: map_rgba(m, prop), v)
    return k + ':' + v

def walk(text):
    out = []; i = 0; n = len(text)
    while i < n:
        j = text.find('{', i)
        if j < 0: out.append(text[i:]); break
        depth = 0; k = j
        while k < n:
            if text[k] == '{': depth += 1
            elif text[k] == '}':
                depth -= 1
                if depth == 0: break
            k += 1
        sel = text[i:j]; body = text[j + 1:k]; s = sel.strip()
        if s.startswith('@media') or s.startswith('@supports'): body = walk(body)
        elif s.startswith('@keyframes') or s.startswith('@font-face'): pass
        elif not bkre.search(sel): body = ';'.join(fix_decl(d) for d in body.split(';'))
        out.append(sel + '{' + body + '}'); i = k + 1
    return ''.join(out)

def css(f):
    c = open(f).read(); keep = []
    def stash(m): keep.append(m.group(0)); return '/*@@%d@@*/' % (len(keep) - 1)
    c2 = walk(re.sub(r'/\*.*?\*/', stash, c, flags=re.S))
    c2 = re.sub(r'/\*@@(\d+)@@\*/', lambda m: keep[int(m.group(1))], c2)
    open(f, 'w').write(c2)

# JS: attribute-aware (fill/stroke/stop-color), skipping backup defs
ATTR = re.compile(r'(fill|stroke|stop-color|color|background)(=\\?["\']|:\s*["\']?)(#[0-9a-fA-F]{3,6})\b')
def js(f):
    s = open(f).read()
    spans = []
    for m in re.finditer(r'\n    (b[123]): \{ init: function', s):
        nxt = re.search(r'\n    (?:/\*|[0-9a-z]+: \{ init: function)', s[m.end():])
        spans.append((m.start(), m.end() + (nxt.start() if nxt else len(s) - m.end())))
    def keep(pos): return any(a <= pos < b for a, b in spans)
    def attr(m):
        if keep(m.start()): return m.group(0)
        prop = {'background': 'background'}.get(m.group(1), m.group(1))
        return m.group(1) + m.group(2) + map_hex(m.group(3), prop)
    s = ATTR.sub(attr, s)
    def lone(m):
        if keep(m.start()): return m.group(0)
        return map_hex(m.group(0), 'stroke')
    s = re.sub(r"(?<=['\"])#[0-9a-fA-F]{6}(?=['\"])", lone, s)
    s = RGBA.sub(lambda m: m.group(0) if keep(m.start()) else map_rgba(m, 'stroke'), s)
    open(f, 'w').write(s)

if __name__ == '__main__':
    for f in glob.glob(os.path.join(HERE, 'css', 'sections', '*.css')) + [os.path.join(HERE, 'css', n) for n in ('chrome.css', 'systems.css')]: css(f)
    for f in glob.glob(os.path.join(HERE, 'js', 'sections', '*.js')) + glob.glob(os.path.join(HERE, 'js', 'systems', '*.js')): js(f)
    print('recoloured')
