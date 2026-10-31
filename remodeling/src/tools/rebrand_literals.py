#!/usr/bin/env python3
"""REBRAND: turn colour literals in PRESENTED code into semantic-token references (records untouched).
JS: '#HEX' -> EZ.c('--role'); a #HEX inside a single-quoted markup string -> ' + EZ.c('--role') + '.
CSS: rgba(R, G, B, a) of a retired value -> color-mix(in srgb, var(--role) a%, transparent)."""
import re, os, sys, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rebrand as rb
HEX = {'FF5F00': 'art-accent', 'E95600': 'art-accent', 'B84200': 'accent-text', '7A2C00': 'accent-text',
       'FF9C5E': 'art-accent-soft', 'FFC9A3': 'art-accent-soft', 'FFE7D6': 'art-fill', 'FFF5EE': 'art-fill',
       '121212': 'art-line', '3A3633': 'art-line-soft', '5E5852': 'art-line-soft', 'C9C1B6': 'border', 'E3DBCF': 'border-subtle',
       'FFFFFF': 'surface', 'FAF7F2': 'bg', 'F1ECE4': 'bg-subtle', 'C42B1C': 'danger-text', 'C9B48F': 'border'}
RGB = {(18, 18, 18): 'shadow', (255, 255, 255): 'surface', (255, 95, 0): 'accent-solid', (184, 66, 0): 'accent-solid-hover',
       (201, 193, 182): 'border', (227, 219, 207): 'border-subtle', (201, 180, 143): 'border', (94, 88, 82): 'text-secondary',
       (196, 43, 28): 'danger-text', (0, 0, 0): 'shadow'}
def js_fix(seg):
    out, n = [], 0
    for line in seg.split('\n'):
        def rep_whole(m):
            nonlocal n; t = HEX.get(m.group(2).upper())
            if not t: return m.group(0)
            n += 1; return "EZ.c('--color-%s')" % t
        line = re.sub(r"(['\"])#([0-9A-Fa-f]{6})\1", rep_whole, line)
        # inside a markup string: count single quotes before the match
        res, last = [], 0
        for m in re.finditer(r'#([0-9A-Fa-f]{6})(?![\w-])', line):
            t = HEX.get(m.group(1).upper())
            before = line[:m.start()]
            if t and before.count("'") % 2 == 1:
                res.append(line[last:m.start()]); res.append("' + EZ.c('--color-%s') + '" % t); last = m.end(); n += 1
        res.append(line[last:]); out.append(''.join(res))
    return '\n'.join(out), n
def css_fix(body):
    n = 0
    def rep(m):
        nonlocal n
        r, g, b = int(m.group(1)), int(m.group(2)), int(m.group(3)); a = m.group(4)
        t = RGB.get((r, g, b))
        if not t: return m.group(0)
        n += 1
        pct = round(float(a) * 100, 1) if a is not None else 100
        return 'color-mix(in srgb, var(--color-%s) %s%%, transparent)' % (t, ('%g' % pct))
    return re.sub(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)', rep, body), n
total = 0
# systems JS (all presented)
for f in sorted(glob.glob(os.path.join(rb.HERE, 'js/systems/*.js'))):
    s = open(f).read(); ns, n = js_fix(s); total += n
    if n: open(f, 'w').write(ns); print(os.path.relpath(f, rb.HERE), n)
# section JS: helpers + visible defs only
for sec in rb.HOME + rb.INNER:
    p = 'js/sections/%s.js' % sec; s = rb.R(p); defs = rb.js_defs(s)
    spans = ([(0, defs[0][1])] if defs else [(0, len(s))]) + [(a, b) for k, a, b in defs if not k.startswith('b')]
    cnt = 0
    for a, b in sorted(spans, reverse=True):
        seg, n = js_fix(s[a:b]); s = s[:a] + seg + s[b:]; cnt += n
    if cnt: rb.W(p, s); print(p, cnt); total += cnt
# CSS: presented rules only
def css_file(path, bk):
    global total
    t = rb.R(path); edits = []; cnt = 0
    for sel, a, b, kind, media in rb.css_rules(t):
        if kind == 'at': continue
        own = rb.rule_owner(sel, bk) if kind == 'rule' else ('record' if set(re.findall(r'[\w-]+', sel)) & bk else 'presented')
        if own != 'presented': continue
        nb, n = css_fix(t[a:b])
        if n: edits.append((a, b, nb)); cnt += n
    for a, b, nb in sorted(edits, reverse=True): t = t[:a] + nb + t[b:]
    if cnt: rb.W(path, t); print(path, cnt); total += cnt
for f in ('css/chrome.css', 'css/systems.css'): css_file(f, set())
for sec in rb.HOME + rb.INNER:
    vis, bk = rb.prefixes(sec)
    if sec in rb.INNER: bk = {p + 'r' for p in vis}
    css_file('css/sections/%s.css' % sec, bk)
print('literals converted', total)
