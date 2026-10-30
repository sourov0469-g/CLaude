#!/usr/bin/env python3
"""Site gate, inner-page records: every b-slot record (HTML block, its CSS rules and keyframes, its JS def) must be
byte-identical to the record as released in the page's release commit. Later fixes go only to the visible versions.
usage: recordcheck.py   -> one line per section and a total"""
import re, subprocess, os
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = {  # release commit of each inner page
    '24682e1': ['kitchen-intro', 'kitchen-scope', 'kitchen-work'],
    'e38aec8': ['bath-intro', 'bath-build', 'bath-work'],
    '3740be1': ['reno-intro', 'reno-services', 'reno-permits'],
    '140eac9': ['contact-form', 'contact-visit', 'contact-area'],
}
def show(ref, path): return subprocess.run(['git', 'show', ref + ':remodeling/src/' + path], capture_output=True, text=True, cwd=HERE).stdout
def now(path): return open(os.path.join(HERE, path)).read()
def blocks(h):
    out = {}
    for m in re.finditer(r'<div class="ver ([\w-]+)[^"]*" data-v="(b\d)"[^>]*>', h):
        i, d = m.start(), 0
        for t in re.finditer(r'<div\b|</div>', h[i:]):
            d += 1 if t.group(0) == '<div' else -1
            if d == 0: out[m.group(2)] = (m.group(1), h[i:i + t.end()]); break
    return out
def jdefs(s):
    out = {}
    for m in re.finditer(r"\n    (b\d): \{ init: function", s):
        nxt = re.search(r'\n    (?:/\*[^\n]*\n\s*)*[0-9a-z]+: \{ init: function|\n  \}\);', s[m.end():])
        out[m.group(1)] = s[m.start():m.end() + nxt.start()].rstrip().rstrip(',')
    return out
def css_for(text, prefixes):
    # every top-level rule or at-rule whose text names a record prefix, in order
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    out, i, n = [], 0, len(text)
    while i < n:
        j = text.find('{', i)
        if j < 0: break
        d, k = 0, j
        while k < n:
            if text[k] == '{': d += 1
            elif text[k] == '}':
                d -= 1
                if d == 0: break
            k += 1
        rule = text[i:k + 1].strip()
        if any(re.search(r'[.\s"-]' + re.escape(p) + r'(?![\w])|' + re.escape(p) + r'__', rule) for p in prefixes): out.append(rule)
        i = k + 1
    return out
total = 0
for ref, secs in PAGES.items():
    for s in secs:
        H0, H1 = show(ref, 'sections/%s.html' % s), now('sections/%s.html' % s)
        J0, J1 = show(ref, 'js/sections/%s.js' % s), now('js/sections/%s.js' % s)
        C0, C1 = show(ref, 'css/sections/%s.css' % s), now('css/sections/%s.css' % s)
        b0, b1 = blocks(H0), blocks(H1)
        pre = [v[0] for v in b0.values()]
        bad = []
        if sorted(b0) != sorted(b1): bad.append('slots %s -> %s' % (sorted(b0), sorted(b1)))
        bad += ['html ' + k for k in b0 if b0[k] != b1.get(k)]
        j0, j1 = jdefs(J0), jdefs(J1)
        bad += ['js ' + k for k in j0 if j0[k] != j1.get(k)]
        if css_for(C0, pre) != css_for(C1, pre): bad.append('css')
        total += len(bad)
        print('%-14s records %s (%s): %s' % (s, ','.join(sorted(b0)), ' '.join(pre), 'unchanged since ' + ref if not bad else 'CHANGED ' + '; '.join(bad)))
print('RECORD FAILS:', total)
