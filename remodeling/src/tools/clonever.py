#!/usr/bin/env python3
"""AUDIT-01 backup mechanism helper: copy a section's winner version into a new visible slot under a new class prefix,
and renumber the existing versions (the winner's untouched original goes to a backup slot).

usage: clonever.py <section> <winner_v> <old_prefix> <new_prefix> <map>
  map: comma list old=new for existing data-v values, e.g. "2=b1,1=2,3=3"; the clone becomes data-v="1".
Edits sections/<sec>.html, css/sections/<sec>.css, js/sections/<sec>.js in place.
"""
import re, sys, os
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sec, wv, old, new, mp = sys.argv[1:6]
remap = dict(x.split('=') for x in mp.split(','))

def rn(text):  # class-prefix rename, word-bounded on the prefix
    return re.sub(r'(?<![\w-])' + re.escape(old) + r'(?=__|[\s."\'\-:{,)\]]|$)', new, text)

# ---------- HTML ----------
hp = os.path.join(HERE, 'sections', sec + '.html')
h = open(hp).read()
def block(h, v):
    m = re.search(r'<div class="ver [^"]*" data-v="' + re.escape(v) + r'"[^>]*>', h)
    i = m.start(); depth = 0
    for t in re.finditer(r'<div\b|</div>', h[i:]):
        depth += 1 if t.group(0) == '<div' else -1
        if depth == 0:
            return i, i + t.end()
    raise SystemExit('unbalanced')
i, j = block(h, wv)
clone = rn(h[i:j])
clone = re.sub(r'data-v="' + re.escape(wv) + r'"( hidden)?', 'data-v="1"', clone, count=1)
# ids inside the clone get a suffix; references follow
ids = re.findall(r'\sid="([^"]+)"', clone)
for d in ids:
    clone = re.sub(r'(\s(?:id|for|aria-controls|aria-describedby|aria-labelledby)=")' + re.escape(d) + r'"', r'\g<1>' + d + '-w"', clone)
    clone = clone.replace('href="#' + d + '"', 'href="#' + d + '-w"')
# renumber existing versions (two passes through temp names)
for o, n in remap.items():
    h = re.sub(r'(<div class="ver [^"]*" data-v=")' + re.escape(o) + r'"', r'\g<1>__T' + n + '"', h)
h = h.replace('data-v="__T', 'data-v="')
h = re.sub(r'(<div class="ver [^"]*" data-v="[^"]*")(?! hidden)>', r'\1 hidden>', h)   # every old version starts hidden
first = re.search(r'<div class="ver ', h).start()
clone = clone.replace(' hidden>', '>', 1) if ' hidden>' in clone.split('\n', 1)[0] else clone
h = h[:first] + '<!-- slot 1 · AUDIT-01 winner (copied from v' + wv + ', fixes applied here; the original is in a backup slot) -->\n  ' + clone + '\n\n  ' + h[first:]
open(hp, 'w').write(h)

# ---------- CSS: copy every rule that names the old prefix ----------
cp = os.path.join(HERE, 'css', 'sections', sec + '.css')
c = open(cp).read()
pat = re.compile(r'(?<![\w-])' + re.escape(old) + r'(?=__|[\s.:{,\[]|$)')
out = []
def rules(text):
    i = 0; n = len(text)
    while i < n:
        j = text.find('{', i)
        if j < 0: break
        sel = text[i:j]
        depth = 0; k = j
        while k < n:
            if text[k] == '{': depth += 1
            elif text[k] == '}':
                depth -= 1
                if depth == 0: break
            k += 1
        yield sel.strip(), text[j + 1:k]
        i = k + 1
for sel, body in rules(re.sub(r'/\*.*?\*/', '', c, flags=re.S)):
    if sel.startswith('@media') or sel.startswith('@supports'):
        inner = [rn(s2) + ' {' + rn(b2) + '}' for s2, b2 in rules(body) if pat.search(s2)]
        if inner: out.append(sel + ' {\n  ' + '\n  '.join(inner) + '\n}')
    elif sel.startswith('@keyframes'):
        continue
    elif pat.search(sel):
        out.append(rn(sel) + ' {' + rn(body) + '}')
c += '\n\n/* ---------- slot 1 · AUDIT-01 winner, copied from v' + wv + ' (.' + old + ' -> .' + new + '); fixes follow ---------- */\n' + '\n'.join(out) + '\n'
open(cp, 'w').write(c)

# ---------- JS: copy the winner's def, rename keys ----------
jp = os.path.join(HERE, 'js', 'sections', sec + '.js')
s = open(jp).read()
def defspan(s, key):
    m = re.search(r'\n(\s*)' + re.escape(key) + r': \{ init: function', s)
    if not m: raise SystemExit('def ' + key + ' not found')
    i = m.start() + 1
    j = s.index('{', m.end() - len(' init: function') - 2)
    depth = 0; k = j; q = None
    while k < len(s):
        ch = s[k]
        if q:
            if ch == '\\': k += 2; continue
            if ch == q: q = None
        elif ch in '\'"':
            q = ch
        elif ch == '/' and s[k + 1] == '/':
            k = s.index('\n', k); continue
        elif ch == '{': depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0: break
        k += 1
    end = k + 1
    if s[end] == ',': end += 1
    return i, end
i, j = defspan(s, wv)
dclone = rn(s[i:j])
dclone = re.sub(r'^(\s*)' + re.escape(wv) + r': \{', r'\g<1>1: {', dclone, count=1)
if not dclone.rstrip().endswith(','): dclone = dclone.rstrip() + ','
for o, n in remap.items():
    s = re.sub(r'\n(\s*)' + re.escape(o) + r': \{ init: function', '\n\\g<1>__T' + n + ': { init: function', s)
s = re.sub(r'__T(\w+): \{ init', lambda m: (m.group(1) if re.match(r'^\d+$', m.group(1)) else m.group(1)) + ': { init', s)
m = re.search(r"EZ\.section\('" + re.escape(sec) + r"', \{\n", s)
s = s[:m.end()] + '    /* slot 1 · AUDIT-01 winner (copied from v' + wv + '; fixes applied here) */\n' + dclone + '\n\n' + s[m.end():]
open(jp, 'w').write(s)
print('cloned', sec, 'v' + wv, '->', new, 'remap', remap)
# a regex literal holding a quote can unbalance the def scan; the JS must still parse
import subprocess
r = subprocess.run(['node', '--check', jp], capture_output=True, text=True)
if r.returncode: print('WARNING: ' + jp + ' does not parse after cloning; check the end of the copied def\n' + r.stderr[:400])
