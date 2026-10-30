#!/usr/bin/env python3
"""MASTER DIRECTIVE final gate, token check: every colour literal in PRESENTED code must be a declared token value.
Presented = chrome (base.html, tokens.css, chrome.css, systems.css, core.js, systems/*.js) plus, per section, the visible
blocks (slots 1-8): their HTML, the CSS rules whose selectors name a visible prefix or the shared section classes, and
their JS defs. Backups (b-slots), their rules and defs, and the dark-era scoping rules are records and are skipped.
Literals: #rgb/#rrggbb (also %23-escaped in data URIs) and rgb()/rgba() whose RGB is a token's RGB (alpha tints allowed).
usage: python3 tools/tokencheck.py   -> prints offenders and a total"""
import re, os, glob
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = lambda p: open(os.path.join(HERE, p)).read()
SECS = 'hero proof services ba process financing work reviews towns consult'.split()
# inner pages: their b1-b5 records are light copies of their own versions, so every line is scanned, records included
INNER = 'kitchen-intro kitchen-scope kitchen-work bath-intro bath-build bath-work reno-intro reno-services reno-permits contact-form contact-visit contact-area'.split()

def rules(text):
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.S)
    i, n = 0, len(text)
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
        yield text[i:j].strip(), text[j + 1:k]
        i = k + 1

def norm(h):
    h = h.lstrip('#').upper()
    if len(h) in (3, 4): h = ''.join(c * 2 for c in h[:3])
    return h[:6]

# the token set: hex values declared in tokens.css outside the backup-scoped (dark-era) blocks
TOK = set()
for sel, body in rules(R('css/tokens.css')):
    if 'data-v="b' in sel: continue
    for m in re.finditer(r'--[\w-]+\s*:\s*(#[0-9A-Fa-f]{3,8})\b', body): TOK.add(norm(m.group(1)))
TRGB = {tuple(int(t[i:i + 2], 16) for i in (0, 2, 4)) for t in TOK}

HEX = re.compile(r'(?<![\w&/-])(?:#|%23)([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})(?![\w-])')
RGB = re.compile(r'rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)')
def scan(where, text, bad):
    for m in HEX.finditer(text):
        pre = text[max(0, m.start() - 6):m.start()]
        if 'url(' in pre or 'href=' in text[max(0, m.start() - 7):m.start()]: continue
        if text[max(0, m.start() - 12):m.start()].endswith('Flagler St '): continue   # the office suite number, #310
        line = text[text.rfind('\n', 0, m.start()) + 1:m.start()]
        if re.search(r'(?:-webkit-)?mask(?:-image)?\s*:[^;]*$', line): continue   # alpha masks: #000 is opacity, never a shown colour
        if norm(m.group(1)) not in TOK: bad.append((where, '#' + m.group(1)))
    for m in RGB.finditer(text):
        if tuple(int(x) for x in m.groups()) not in TRGB: bad.append((where, m.group(0) + ')'))

bad = []
# chrome
scan('base.html', R('base.html'), bad)
for f in ['css/chrome.css', 'css/systems.css']: scan(f, R(f), bad)
for sel, body in rules(R('css/tokens.css')):
    if 'data-v="b' not in sel: scan('css/tokens.css ' + sel[:40], body, bad)
for f in ['js/core.js'] + sorted(glob.glob(os.path.join(HERE, 'js/systems/*.js'))): scan(os.path.relpath(f, HERE), open(os.path.join(HERE, f)).read(), bad)
# sections
for s in SECS:
    H, C, J = R('sections/%s.html' % s), R('css/sections/%s.css' % s), R('js/sections/%s.js' % s)
    vis, bk = set(), set()
    for m in re.finditer(r'<div class="ver ([\w-]+)[^"]*" data-v="(b?\d)"', H): (bk if m.group(2).startswith('b') else vis).add(m.group(1))
    bk -= vis
    # visible HTML blocks
    for m in re.finditer(r'<div class="ver ([\w-]+)[^"]*" data-v="(\d)"', H):
        i, d = m.start(), 0
        for t in re.finditer(r'<div\b|</div>', H[i:]):
            d += 1 if t.group(0) == '<div' else -1
            if d == 0: scan('%s.html slot %s' % (s, m.group(2)), H[i:i + t.end()], bad); break
    # CSS: skip rules that only address backup prefixes or the backup scoping
    def presented(sel):
        # a selector is presented when at least one of its comma parts names no backup block (and no backup slot)
        for part in sel.split(','):
            if 'data-v="b' in part or "data-v='b" in part: continue
            names = set(re.findall(r'\.([a-zA-Z][\w-]*?)(?:__[\w-]+)?(?=[\s.:,\[>+~)]|$)', part))
            if not (names & bk): return True
        return False
    for sel, body in rules(C):
        if sel.startswith('@media') or sel.startswith('@supports'):
            for s2, b2 in rules(body):
                if presented(s2): scan('%s.css %s' % (s, s2[:50]), b2, bad)
        elif sel.startswith('@keyframes'): scan('%s.css %s' % (s, sel[:40]), body, bad)
        elif presented(sel): scan('%s.css %s' % (s, sel[:50]), body, bad)
    # JS defs of visible slots (and the shared helpers above the section map)
    head = J[:J.find("EZ.section(")]
    scan('%s.js helpers' % s, head, bad)
    for m in re.finditer(r'\n    (\d): \{ init: function', J):
        nxt = re.search(r'\n    (?:/\*.*?\*/\s*)*[0-9a-z]+: \{ init: function|\n  \}\);', J[m.end():], re.S)
        scan('%s.js slot %s' % (s, m.group(1)), J[m.start():m.end() + nxt.start()], bad)
for s in INNER:
    for f in ('sections/%s.html', 'css/sections/%s.css', 'js/sections/%s.js'):
        scan(f % s, R(f % s), bad)
print('sections scanned: homepage', len(SECS), '(presented code), inner', len(INNER), '(all code, records included)')
print('token set:', len(TOK), 'values')
seen = {}
for w, c in bad: seen.setdefault(c.upper(), []).append(w)
for c, ws in sorted(seen.items()): print('OFF-TOKEN', c, 'x%d' % len(ws), '|', '; '.join(sorted(set(ws))[:4]))
print('off-token literals in presented code:', len(bad))
