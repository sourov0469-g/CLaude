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

def balanced(path, body):
    # guard: a section must close every div/section it opens, or it swallows the sections after it
    bare = re.sub(r'<script>.*?</script>|<style>.*?</style>', '', body, flags=re.S)
    for tag in ('div', 'section'):
        o, c = len(re.findall(r'<' + tag + r'\b', bare)), len(re.findall(r'</' + tag + r'>', bare))
        if o != c:
            sys.exit(f'unbalanced <{tag}> in {os.path.basename(path)}: {o} open, {c} close')

def section(name):
    files = sorted(glob.glob(os.path.join(SRC, 'sections', f'{name}-v*.html')), key=lambda f: int(re.search(r'-v(\d+)\.html$', f).group(1)))
    if not files:
        sys.exit(f'no versions for section {name}')
    blocks = []
    for f in files:
        v = re.search(r'-v(\d+)\.html$', f).group(1)
        body = open(f, encoding='utf-8').read()
        balanced(f, body)
        blocks.append(f'<div class="ver" data-sec="{name}" data-v="{v}">\n{body}\n</div>')
    # superseded versions: kept inside the file as inert, hidden backups (never deleted, never run)
    for f in sorted(glob.glob(os.path.join(SRC, 'sections', f'{name}-b*.html')), key=lambda f: int(re.search(r'-b(\d+)\.html$', f).group(1))):
        b = re.search(r'-b(\d+)\.html$', f).group(1)
        body = open(f, encoding='utf-8').read()
        blocks.append(f'<template class="bak" data-sec="{name}" data-b="{b}">\n{body}\n</template>')
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

def build_raw():
    """The past homepage (every version, backups and inner pages), resolved, not yet deduplicated."""
    html = resolve(read('template.html'))
    left = re.findall(r'\{\{[A-Z]+:[^}]+\}\}', html)
    if left:
        sys.exit(f'unresolved placeholders: {left[:5]}')
    return html

def dedupe(html):
    """Store each large image that appears more than once a single time, in window.OWLA, and point the copies at it.
    HTML src/href attributes become data-asrc/data-ahref (hydrated by base.js on load); JS string literals become
    OWLA lookups. CSS url() copies are left alone. Saves the repeated bytes as the version ladder grows."""
    import collections
    uris = collections.Counter(re.findall(r'data:image/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{20000,}', html))
    dup = [u for u, n in uris.items() if n > 1]
    if not dup:
        return html
    keys = {u: f'a{i}' for i, u in enumerate(dup)}
    blank = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
    for u, k in keys.items():
        html = html.replace(f'src="{u}"', f'src="{blank}" data-asrc="{k}"')
        html = html.replace(f'href="{u}"', f'href="{blank}" data-ahref="{k}"')
        html = html.replace(f'poster="{u}"', f'data-aposter="{k}"')
        html = html.replace(f"'{u}'", f'OWLA["{k}"]')
    store = '<script>window.OWLA={' + ','.join(f'{k}:"{u}"' for u, k in keys.items()) + '};</script>'
    html = html.replace('<body>', '<body>' + store, 1) if '<body>' in html else re.sub(r'(<body[^>]*>)', lambda m: m.group(1) + store, html, count=1)
    return html

if __name__ == '__main__':
    # owl-roofing.html is now the finished homepage: the new bests by default, this past homepage kept inside it as records
    sys.path.insert(0, os.path.dirname(SRC))
    import build_home
    build_home.main()
