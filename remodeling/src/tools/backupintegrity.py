#!/usr/bin/env python3
"""REBRAND gate: every hidden backup's own material is byte-identical to <ref> (default 3781ab8, the last commit before the
rebrand): its HTML block, its JS definition, and every CSS rule and keyframes block that names its prefix (homepage) or its
record prefix (inner pages). Shared section rules and the token layer are presented code; backups inherit them.
usage: python3 tools/backupintegrity.py [ref]"""
import re, os, sys, subprocess
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import rebrand as rb
REF = sys.argv[1] if len(sys.argv) > 1 else '3781ab8'
def old(p): return subprocess.run(['git', 'show', REF + ':remodeling/src/' + p], capture_output=True, text=True, cwd=rb.HERE).stdout
def records(sec, H, J, C):
    vis, bk = set(), set()
    for p, v, a, b in rb.html_blocks(H): (bk if v.startswith('b') else vis).add(p)
    bk -= vis
    if sec in rb.INNER: bk = {p + 'r' for p in vis}
    html = {v: H[a:b] for p, v, a, b in rb.html_blocks(H) if v.startswith('b')}
    js = {k: J[a:b] for k, a, b in rb.js_defs(J) if k.startswith('b')}
    css = []
    for sel, a, b, kind, media in rb.css_rules(C):
        if kind == 'at': continue
        own = rb.rule_owner(sel, bk) if kind == 'rule' else ('record' if set(re.findall(r'[\w-]+', sel)) & bk else 'presented')
        if own == 'record': css.append((media or '', sel, C[a:b]))
    return html, js, css
total = changed = 0
for sec in rb.HOME + rb.INNER:
    P = ('sections/%s.html' % sec, 'js/sections/%s.js' % sec, 'css/sections/%s.css' % sec)
    h0, j0, c0 = records(sec, *(old(p) for p in P))
    h1, j1, c1 = records(sec, *(rb.R(p) for p in P))
    bad = ['html ' + k for k in h0 if h0[k] != h1.get(k)] + ['js ' + k for k in j0 if j0[k] != j1.get(k)]
    if sorted(c0) != sorted(c1): bad.append('css (%d rules at ref, %d now)' % (len(c0), len(c1)))
    total += len(h0); changed += len(bad)
    print('%-14s backups %-2d js %-2d record css rules %-4d : %s' % (sec, len(h0), len(j0), len(c0), 'byte-identical to ' + REF if not bad else 'CHANGED ' + ', '.join(bad)))
# the token layer's record scoping (dark-era b-slot rules) is part of the record too
t0 = [(s, old('css/tokens.css')[a:b]) for s, a, b, k, m in rb.css_rules(old('css/tokens.css')) if 'data-v="b' in s]
t1 = [(s, rb.R('css/tokens.css')[a:b]) for s, a, b, k, m in rb.css_rules(rb.R('css/tokens.css')) if 'data-v="b' in s]
print('tokens.css record-scoping rules: %d, %s' % (len(t0), 'byte-identical' if t0 == t1 else 'CHANGED'))
changed += t0 != t1
print('backups checked: %d | sections with a changed record: %d' % (total, changed))
sys.exit(1 if changed else 0)
