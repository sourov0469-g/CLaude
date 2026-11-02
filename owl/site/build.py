#!/usr/bin/env python3
"""Owl Roofing single-file build. Composes owl/site/src into owl/site/owl-roofing.html:
- the identity (tokens, components, icons, motion library) and Owl's logo/SVG artwork, injected unchanged;
- 6 in-file pages (hash router), each section with EXACTLY two versions (v1, v2), switchable (?v=hero:2 or the
  version panel, Shift+V); superseded versions kept as hidden <template> backups from src/backups/.
Run from owl/site:  python3 -I build.py"""
import os, re, sys, json
sys.path.insert(0, os.path.abspath('../phase2'))
HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(os.path.abspath('../phase2'))           # reuse the board builder's helpers (paths are relative to phase2)
import importlib.util
spec = importlib.util.spec_from_file_location('bb', 'build-board.py')
src_backup = sys.argv; sys.argv = ['x', '/dev/null', '/dev/null']   # make the board builder a no-op writer
bb = importlib.util.module_from_spec(spec)
try:
    spec.loader.exec_module(bb)
except AssertionError:
    pass
sys.argv = src_backup
os.chdir(HERE)
S = 'src/'
PAGES = json.load(open(S + 'pages.json'))
def read(p):
    return open(p).read() if os.path.exists(p) else ''
sections_html, css, js = {}, [], []
for page in PAGES:
    for sec in page['sections']:
        d = S + 'sections/' + sec['id'] + '/'
        vs = []
        for n in (1, 2):
            body = read(d + f'v{n}.html')
            if not body:
                body = f'<div class="todo wrap"><p class="t-small muted">{sec["id"]} v{n}: not built yet</p></div>'
            vs.append(f'<div class="ver" data-v="{n}"{"" if n == sec.get("default", 1) else " hidden"}>{body}</div>')
        backups = ''.join(f'<template class="backup" data-of="{sec["id"]}" data-name="{f}">{read(S + "backups/" + f)}</template>'
                          for f in sorted(os.listdir(S + 'backups')) if f.startswith(sec['id'] + '-'))
        sections_html[sec['id']] = f'<div class="sec" id="s-{sec["id"]}" data-sec="{sec["id"]}" data-default="{sec.get("default", 1)}">{"".join(vs)}{backups}</div>'
        css.append(read(d + sec['id'] + '.css')); js.append(read(d + sec['id'] + '.js'))
pages_html = ''.join(
    f'<section class="page" data-page="{p["id"]}" aria-label="{p["title"]}"{"" if i == 0 else " hidden"}>' +
    ''.join(sections_html[s['id']] for s in p['sections']) + '</section>' for i, p in enumerate(PAGES))
shell = read(S + 'shell.html')
out = shell.replace('{{PAGES}}', pages_html).replace('{{SECTION_CSS}}', '\n'.join(css)).replace('{{SECTION_JS}}', '\n'.join(js)) \
           .replace('{{SITE_CSS}}', read(S + 'site.css')).replace('{{SITE_JS}}', read(S + 'site.js')) \
           .replace('{{TOKENS}}', bb.tokens).replace('{{COMPONENTS}}', bb.comps).replace('{{ICONS}}', bb.icons) \
           .replace('{{JS}}', bb.js).replace('{{RINGS}}', bb.rings).replace('{{TREES}}', bb.trees)
out = re.sub(r'\{\{LOGO_COLOUR(?::([\w-]+))?\}\}', lambda m: bb.COLOUR(m.group(1) or 'logo'), out)
out = re.sub(r'\{\{LOGO_WHITE(?::([\w-]+))?\}\}', lambda m: bb.WHITE(m.group(1) or 'logo'), out)
out = re.sub(r'\{\{IC:([\w-]+)(?::([\w -]+))?\}\}', lambda m: bb.ic(m.group(1), m.group(2) or 'icon'), out)
left = re.findall(r'\{\{[^}]*\}\}', out)
assert not left, left[:5]
open('owl-roofing.html', 'w').write(out)
print('owl-roofing.html', len(out), 'bytes;', sum(len(p['sections']) for p in PAGES), 'sections')
