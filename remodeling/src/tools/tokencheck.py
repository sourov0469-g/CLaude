#!/usr/bin/env python3
"""REBRAND token compliance [S0071 "before you finish"; S1496 token compliance]. PRESENTED code (chrome + every visible
version, classified by tools/rebrand.py) may name colours only through the semantic tier (--color-*, --shadow-card).
Fails on, in presented code:
  - a primitive (--clay-*, --sand-*, --white, --danger-*) or a pre-rebrand record name (--a-500, --ink, ...)
  - any colour literal: #hex, %23hex in data URIs, rgb()/rgba()/hsl()/oklch() (alpha masks and #310 the suite excepted)
The token declarations in tokens.css :root are the only place values live. Backups (their HTML block, JS def and their own
CSS rules) are records and are not scanned.
usage: python3 tools/tokencheck.py [-v]"""
import re, os, sys, glob
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rebrand as rb
VERB = '-v' in sys.argv
PRIM = re.compile(r'var\(--(clay-\d+|sand-\d+|white|danger-\d+)\)')
LEGACY = rb.VAR
LIT = re.compile(r'(?<![\w&/-])(?:#|%23)([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})(?![\w-])|\b(?:rgba?|hsla?|oklch|oklab)\(')
bad = []
def scan(where, text):
    for m in PRIM.finditer(text): bad.append((where, 'primitive ' + m.group(0)))
    for m in LEGACY.finditer(text): bad.append((where, 'record name ' + m.group(0)))
    for m in LIT.finditer(text):
        pre = text[max(0, m.start() - 12):m.start()]
        if pre.endswith('Flagler St ') or pre.endswith('St '): continue                       # the office suite, #310
        line = text[text.rfind('\n', 0, m.start()) + 1:m.start()]
        if re.search(r'(?:-webkit-)?mask(?:-image)?\s*:[^;]*$', line): continue               # alpha masks: opacity, not a colour
        if re.search(r'href=["\'][^"\']*$', line): continue                                    # a URL fragment
        bad.append((where, 'literal ' + text[m.start():m.start() + 18].split(';')[0]))

# chrome: tokens.css outside its :root declaration blocks and the record (b-slot) rules
tok = rb.R('css/tokens.css')
for sel, a, b, kind, media in rb.css_rules(tok):
    if sel.strip() == ':root' or 'data-v="b' in sel or kind == 'at' or 'eyebrow__roof' in sel: continue   # the roof glyph lives only in backups
    scan('tokens.css ' + sel[:40], tok[a:b])
for f in ('css/chrome.css', 'css/systems.css'):
    t = rb.R(f)
    for sel, a, b, kind, media in rb.css_rules(t):
        if 'data-v="b' in sel or kind == 'at': continue
        scan(f + ' ' + sel[:40], t[a:b])
base = rb.R('base.html')
base = re.sub(r'<link rel="icon" href="[^"]*">', '', base)                                    # the favicon file carries the logo's own colours
base = re.sub(r'<meta name="theme-color" content="[^"]*">', '', base)                          # browser chrome colour: must be a literal
scan('base.html', base)
for f in ['js/core.js'] + sorted(glob.glob(os.path.join(rb.HERE, 'js/systems/*.js'))):
    scan(os.path.relpath(f, rb.HERE), open(os.path.join(rb.HERE, f)).read())
# sections: presented CSS rules, visible HTML blocks, visible JS defs and the shared helpers
for sec in rb.HOME + rb.INNER:
    vis, bk = rb.prefixes(sec)
    if sec in rb.INNER: bk = {p + 'r' for p in vis}
    t = rb.R('css/sections/%s.css' % sec)
    for sel, a, b, kind, media in rb.css_rules(t):
        if kind == 'at': continue
        own = rb.rule_owner(sel, bk) if kind == 'rule' else ('record' if set(re.findall(r'[\w-]+', sel)) & bk else 'presented')
        if own == 'presented': scan('%s.css %s' % (sec, sel[:40]), t[a:b])
    h = rb.R('sections/%s.html' % sec)
    for p, v, a, b in rb.html_blocks(h):
        if not v.startswith('b'): scan('%s.html slot %s' % (sec, v), h[a:b])
    j = rb.R('js/sections/%s.js' % sec); defs = rb.js_defs(j)
    scan('%s.js helpers' % sec, j[:defs[0][1]] if defs else j)
    for k, a, b in defs:
        if not k.startswith('b'): scan('%s.js slot %s' % (sec, k), j[a:b])
seen = {}
for w, c in bad: seen.setdefault(c, []).append(w)
for c, ws in sorted(seen.items(), key=lambda x: -len(x[1])):
    print('OFF-TOKEN %-34s x%-3d | %s' % (c, len(ws), '; '.join(sorted(set(ws))[:4 if not VERB else 99])))
print('presented sections scanned:', len(rb.HOME + rb.INNER), '| off-token uses in presented code:', len(bad))
sys.exit(1 if bad else 0)
