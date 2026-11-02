#!/usr/bin/env python3
"""Builds owl/phase2/identity-board.html from the identity files in owl/identity/ and Owl's own source files.
Owl's logo files are injected UNCHANGED (only class/role attributes added, clipPath ids made unique).
Run from owl/phase2:  python3 -I build-board.py"""
import re, csv, json, itertools, html, sys
ID = '../identity/'
SRC = '../assets/source/'
cnt = itertools.count(1)

def logo(file, eyes, pupils, cls='logo'):
    s = open(SRC + file).read(); n = next(cnt)
    s = re.sub(r'<\?xml[^>]*>', '', s)
    s = s.replace('<svg ', f'<svg class="{cls}" role="img" aria-label="Owl Roofing" ', 1)
    s = re.sub(r'clip0_[0-9_]+', f'clipOwl{n}', s)
    s = re.sub(r'width="\d+" height="\d+" viewBox', 'viewBox', s, count=1)
    i = [-1]
    def tag(m):
        i[0] += 1
        k = i[0] + 1
        c = ' class="eye"' if k in eyes else ' class="pupil"' if k in pupils else ''
        return '<path' + c + m.group(1)
    return re.sub(r'<path(\s)', tag, s)
COLOUR = lambda cls='logo': logo('owl-roofing-logo.svg', {9, 10}, {11, 12}, cls)
WHITE = lambda cls='logo': logo('owl-logo-white.svg', set(), {9, 10}, cls)

def symbol_from(file, sid):
    s = open(SRC + file).read()
    vb = re.search(r'viewBox="([^"]+)"', s).group(1)
    inner = re.sub(r'^.*?<svg[^>]*>|</svg>\s*$', '', s, flags=re.S)
    inner = re.sub(r'\sfill="#[0-9A-Fa-f]{6}"', '', inner)          # colour comes from the token at use time
    inner = re.sub(r'<g opacity="[0-9.]+">', '<g>', inner)
    # overflow visible: Owl's artwork runs past its own viewBox; clipping it left hard rectangular edges (gen-test round 1)
    return f'<symbol id="{sid}" viewBox="{vb}" preserveAspectRatio="xMidYMax slice" overflow="visible">{inner}</symbol>'

tokens = open(ID + 'tokens.css').read()
comps = open(ID + 'owl-components.css').read()
icons = open(ID + 'icons.svg').read()
icon_list = json.load(open(ID + 'icons.json'))
js = open(ID + 'owl-identity.js').read()
rings = symbol_from('faq-bg.svg', 'owl-rings')
trees = symbol_from('footer-bg.svg', 'owl-trees')

def ic(name, cls='icon', label=None):
    a = f'role="img" aria-label="{label}"' if label else 'aria-hidden="true"'
    return f'<svg class="{cls}" {a}><use href="#icon-{name}"/></svg>'

# contrast table from the measured pairs file
rows = list(csv.DictReader(open(ID + 'contrast-pairs.csv')))
ct = ''.join(
    f'<tr class="{"ban" if r["use"].startswith("BANNED") else ""}"><td><span class="sw" style="background:{r["bg"]};color:{r["fg"]}">Aa</span></td>'
    f'<td>{html.escape(r["pair"])}</td><td class="t-num">{r["measured_ratio"]}</td><td class="t-num">{r["minimum"]}</td>'
    f'<td>{html.escape(r["result"])}</td><td>{html.escape(r["use"])}</td></tr>' for r in rows)
types = list(csv.DictReader(open(ID + 'type-scale.csv')))
samples = {'display': 'We actually answer the phone.', 'title': '3 sweeps of your lawn.', 'heading': 'The Protect Your Nest system',
           'subheading': 'First pass with the magnet', 'body': 'Roofing job sites are messy, but we get everything in the dumpster in round one. Then a roofing magnet collects nails and other metal scraps in round two.',
           'small': 'Mon–Sat 8:00–18:00 · 1000 County Rd E #230, Shoreview, MN 55126', 'label': 'Owl Roofing · Shoreview'}
tt = ''.join(
    f'<div class="type-row"><div class="type-meta t-small"><b>{t["role"]}</b><br>step {t["step"]} · {t["min_px@360"]}→{t["max_px@1240"]}px<br>{t["family"]} {t["weight"]} / {t["line_height"]} / {t["tracking"]}<br><code>{t["clamp"]}</code></div>'
    f'<div class="t-{ {"subheading": "sub"}.get(t["role"], t["role"]) }">{samples[t["role"]]}</div></div>' for t in types)
ig = ''.join(
    f'<figure class="ic-cell"><div class="ic-sizes">{ic(i["id"][5:], "icon icon--48")}{ic(i["id"][5:], "icon icon--32")}{ic(i["id"][5:], "icon")}{ic(i["id"][5:], "icon icon--16")}</div>'
    f'<figcaption class="t-small"><code>{i["id"]}</code><br>{i["label"] or "(UI: paired with text)"}</figcaption></figure>' for i in icon_list)
ladder = [2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160]
sp = ''.join(f'<div class="sp-row"><code class="t-num">--space-{v}</code><span class="sp-bar" style="width:var(--space-{v})"></span><span class="t-small t-num">{v}px</span></div>' for v in ladder)

SRC_HTML, OUT_HTML = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else ('board.src.html', 'identity-board.html')
src = open(SRC_HTML).read()
out = src
for k, v in {'{{TOKENS}}': tokens, '{{COMPONENTS}}': comps, '{{ICONS}}': icons, '{{JS}}': js, '{{RINGS}}': rings, '{{TREES}}': trees,
             '{{CONTRAST_ROWS}}': ct, '{{TYPE_ROWS}}': tt, '{{ICON_GRID}}': ig, '{{SPACE_ROWS}}': sp}.items():
    out = out.replace(k, v)
out = re.sub(r'\{\{LOGO_COLOUR(?::([\w-]+))?\}\}', lambda m: COLOUR(m.group(1) or 'logo'), out)
out = re.sub(r'\{\{LOGO_WHITE(?::([\w-]+))?\}\}', lambda m: WHITE(m.group(1) or 'logo'), out)
out = re.sub(r'\{\{IC:([\w-]+)(?::([\w -]+))?\}\}', lambda m: ic(m.group(1), m.group(2) or 'icon'), out)
assert '{{' not in out, re.findall(r'\{\{[^}]*\}\}', out)[:5]
open(OUT_HTML, 'w').write(out)
print(OUT_HTML, len(out), 'bytes')
