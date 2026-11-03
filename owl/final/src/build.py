#!/usr/bin/env python3
"""Assemble the Owl Roofing site into ONE self-contained HTML file.

Placeholders in template/partials:
  {{A:file}}    -> data: URI of src/assets/file
  {{CSS:file}}  -> contents of src/file (asset placeholders resolved)
  {{JS:file}}   -> contents of src/file
  {{P:file}}    -> contents of src/partials/file
  {{SEC:name}}  -> every src/sections/name-v*.html, each wrapped as a version block
"""
import base64, glob, mimetypes, os, re, sys

SRC = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(os.path.dirname(SRC), 'owl-roofing.html')
MIME = {'.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4',
        '.jpg': 'image/jpeg', '.png': 'image/png'}
_cache = {}

def asset(name):
    if name not in _cache:
        p = os.path.join(SRC, 'assets', name)
        ext = os.path.splitext(name)[1]
        data = open(p, 'rb').read()
        _cache[name] = f"data:{MIME.get(ext, 'application/octet-stream')};base64,{base64.b64encode(data).decode()}"
    return _cache[name]

def read(path):
    return open(os.path.join(SRC, path), encoding='utf-8').read()

def section(name):
    files = sorted(glob.glob(os.path.join(SRC, 'sections', f'{name}-v*.html')))
    if not files:
        sys.exit(f'no versions for section {name}')
    blocks = []
    for f in files:
        v = re.search(r'-v(\d+)\.html$', f).group(1)
        body = open(f, encoding='utf-8').read()
        blocks.append(f'<div class="ver" data-sec="{name}" data-v="{v}">\n{body}\n</div>')
    return '\n'.join(blocks)

def resolve(text, depth=0):
    if depth > 4:
        return text
    text = re.sub(r'\{\{CSS:([^}]+)\}\}', lambda m: resolve(read(m.group(1)), depth + 1), text)
    text = re.sub(r'\{\{JS:([^}]+)\}\}', lambda m: resolve(read(m.group(1)), depth + 1), text)
    text = re.sub(r'\{\{P:([^}]+)\}\}', lambda m: resolve(read('partials/' + m.group(1)), depth + 1), text)
    text = re.sub(r'\{\{SEC:([^}]+)\}\}', lambda m: resolve(section(m.group(1)), depth + 1), text)
    text = re.sub(r'\{\{A:([^}]+)\}\}', lambda m: asset(m.group(1)), text)
    return text

html = resolve(read('template.html'))
left = re.findall(r'\{\{[A-Z]+:[^}]+\}\}', html)
if left:
    sys.exit(f'unresolved placeholders: {left[:5]}')
open(OUT, 'w', encoding='utf-8').write(html)
print(f'wrote {OUT} ({len(html.encode())/1e6:.2f} MB)')
