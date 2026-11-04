#!/usr/bin/env python3
"""Build the reset page: ONE page, sections in order, no version factory.
  {{A:file}}   -> data: URI of ../src/assets/file
  {{CSS:path}} / {{JS:path}} -> file contents (path relative to owl/final)
  {{SECTIONS}} -> every reset/sections/NN-*.html in order
  {{LOGO}}     -> the Owl logo inlined, its two fills mapped to palette tokens (shape untouched)
"""
import base64, glob, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__)); FINAL = os.path.dirname(HERE); ASSETS = os.path.join(FINAL, 'src', 'assets')
OUT = os.path.join(FINAL, 'owl-reset.html')
MIME = {'.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.png': 'image/png'}
cache = {}
def asset(n):
    if n not in cache:
        cache[n] = 'data:%s;base64,%s' % (MIME.get(os.path.splitext(n)[1], 'application/octet-stream'), base64.b64encode(open(os.path.join(ASSETS, n), 'rb').read()).decode())
    return cache[n]
def read(p): return open(os.path.join(FINAL, p), encoding='utf-8').read()
def balanced(f, body):
    bare = re.sub(r'<script>.*?</script>|<style>.*?</style>', '', body, flags=re.S)
    for t in ('div', 'section'):
        o, c = len(re.findall(r'<' + t + r'\b', bare)), len(re.findall(r'</' + t + '>', bare))
        if o != c: sys.exit('unbalanced <%s> in %s: %d/%d' % (t, os.path.basename(f), o, c))
def sections():
    out = []
    for f in sorted(glob.glob(os.path.join(HERE, 'sections', '[0-9][0-9]-*.html'))):
        b = open(f, encoding='utf-8').read(); balanced(f, b); out.append(b)
    return '\n'.join(out)
def logo():
    s = open(os.path.join(ASSETS, 'logo.svg'), encoding='utf-8').read()
    s = re.sub(r'<\?xml[^>]*>', '', s).replace('fill="#17111D"', 'fill="var(--logo-ink)"').replace('fill="#EAA221"', 'fill="var(--logo-acc)"')
    return s.replace('<svg ', '<svg class="logo" role="img" aria-label="Owl Roofing" ', 1)
def resolve(t, d=0):
    if d > 4: return t
    t = t.replace('{{SECTIONS}}', sections()) if '{{SECTIONS}}' in t else t
    t = t.replace('{{LOGO}}', logo())
    t = re.sub(r'\{\{CSS:([^}]+)\}\}', lambda m: resolve(read(m.group(1)), d + 1), t)
    t = re.sub(r'\{\{JS:([^}]+)\}\}', lambda m: resolve(read(m.group(1)), d + 1), t)
    t = re.sub(r'\{\{A:([^}]+)\}\}', lambda m: asset(m.group(1)), t)
    return t
html = resolve(read('reset/template.html'))
left = re.findall(r'\{\{[A-Z]+[:}][^}]*\}?\}', html)
if left: sys.exit('unresolved: %s' % left[:5])
open(OUT, 'w', encoding='utf-8').write(html)
print('wrote %s (%.2f MB)' % (OUT, os.path.getsize(OUT) / 1e6))
