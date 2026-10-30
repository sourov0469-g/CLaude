#!/usr/bin/env python3
"""Phase 5 integrity: every backup slot must equal the version it was taken from, byte for byte, except its slot name
(data-v / hidden in the HTML block, the key of its JS def). usage: backupcheck.py <section> <commit-before-expansion> <map>
map: old=new pairs, e.g. 1=b2,2=b3,3=b4,b1=b1"""
import re, subprocess, sys, os
sec, ref, mp = sys.argv[1:4]
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def show(path): return subprocess.run(['git', 'show', ref + ':remodeling/src/' + path], capture_output=True, text=True, cwd=HERE).stdout
def block(h, v):
    m = re.search(r'<div class="ver [^"]*" data-v="' + re.escape(v) + r'"[^>]*>', h)
    i = m.start(); d = 0
    for t in re.finditer(r'<div\b|</div>', h[i:]):
        d += 1 if t.group(0) == '<div' else -1
        if d == 0: return h[i:i + t.end()]
def jdef(s, key):
    m = re.search(r'\n    ' + re.escape(key) + r': \{ init: function', s)
    nxt = re.search(r'\n    (?:/\*[^\n]*\n\s*)*[0-9a-z]+: \{ init: function|\n  \}\);', s[m.end():])
    return s[m.start():m.end() + nxt.start()].rstrip().rstrip(',')
oh, nh = show('sections/%s.html' % sec), open(os.path.join(HERE, 'sections', sec + '.html')).read()
oj, nj = show('js/sections/%s.js' % sec), open(os.path.join(HERE, 'js', 'sections', sec + '.js')).read()
bad = 0
for pair in mp.split(','):
    o, n = pair.split('=')
    a = re.sub(r'data-v="[^"]*"( hidden)?', 'data-v=X', block(oh, o), count=1); b = re.sub(r'data-v="[^"]*"( hidden)?', 'data-v=X', block(nh, n), count=1)
    ja = re.sub(r'^\n    [0-9a-z]+:', '\n    K:', jdef(oj, o)); jb = re.sub(r'^\n    [0-9a-z]+:', '\n    K:', jdef(nj, n))
    ok = a == b and ja == jb
    bad += not ok
    print('%s %s -> %s: html %s, js %s' % (sec, o, n, 'same' if a == b else 'DIFFERS', 'same' if ja == jb else 'DIFFERS'))
print('backups differing:', bad)
