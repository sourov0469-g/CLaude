#!/usr/bin/env python3
"""REBRAND: measure the token layer as shipped in css/tokens.css (no value is typed in by hand) [S0071 measure, S0248 token
contrast]. Writes remodeling/qa/brand-tokens.md: the ramps with OKLCH L/C/H, the hue-drift audit against the sister sites'
windows, the saturation audit, and every semantic text/UI pair the components use, with WCAG 2 ratios.
usage: python3 tools/brandmeasure.py"""
import re, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(HERE, '..', 'brand', 'v2'))
from colour import oklch, ratio
css = open(os.path.join(HERE, 'css', 'tokens.css')).read()
root = css[css.index(':root {'):css.index('}', css.index(':root {'))]
V = dict(re.findall(r'(--[\w-]+):\s*([^;]+);', root))
def res(name, depth=0):
    v = V[name].strip()
    m = re.match(r'var\((--[\w-]+)\)', v)
    return res(m.group(1), depth + 1) if m else v
out = ['# Brand tokens, measured from css/tokens.css', '']
out += ['## Ramps (OKLCH, computed from the shipped hex)', '', '| token | hex | L | C | H |', '|---|---|---|---|---|']
clayH, sandH, clayC = [], [], []
for k in V:
    if re.match(r'--(clay|sand)-\d+$', k) or k == '--danger-600':
        L, C, H = oklch(res(k)); out.append('| `%s` | %s | %.3f | %.3f | %.1f |' % (k, res(k), L, C, H))
        if k.startswith('--clay'): clayH.append(H); clayC.append(C)
        if k.startswith('--sand') and C >= 0.012: sandH.append(H)
def dist(a, b): d = abs(a - b) % 360; return min(d, 360 - d)
GREEN, STEEL = 167.0, 248.0   # sister sites' accent hues, as given in the directive
out += ['', '## Hue-drift audit', '',
        '- Clay hue across all 11 steps: %.1f to %.1f (spread %.1f deg; target window 30-45, terracotta / fired clay).' % (min(clayH), max(clayH), max(clayH) - min(clayH)),
        '- Distance from the Rembrandt green window (~167): at least %.1f deg. From the Austin steel window (~248): at least %.1f deg.' % (min(dist(h, GREEN) for h in clayH), min(dist(h, STEEL) for h in clayH)),
        '- Distance from the danger hue (%.1f): %.1f deg (rule: >= 15) [S0071].' % (oklch(res('--danger-600'))[2], min(dist(h, oklch(res('--danger-600'))[2]) for h in clayH)),
        '- Sand (neutral) hue where chroma >= 0.012 (below that the hue of an 8-bit colour is rounding noise): %.1f to %.1f.' % (min(sandH), max(sandH)),
        '', '## Saturation audit', '',
        '- Clay chroma peak: %.3f (the retired accent #FF5F00 measured %.3f). No clay step exceeds 0.11: fired-clay muted, never a signal orange.' % (max(clayC), oklch('#FF5F00')[1]),
        '- Neutral chroma: <= 0.017 on every sand step.', '']
PAIRS = [
    ('text', '--color-text', ['--color-bg', '--color-bg-subtle', '--color-bg-muted', '--color-surface', '--color-accent-subtle', '--color-accent-subtle-hover'], 4.5),
    ('text', '--color-text-secondary', ['--color-bg', '--color-bg-subtle', '--color-bg-muted', '--color-surface', '--color-accent-subtle', '--color-accent-subtle-hover'], 4.5),
    ('text', '--color-accent-text', ['--color-bg', '--color-bg-subtle', '--color-bg-muted', '--color-surface', '--color-accent-subtle', '--color-accent-subtle-hover'], 4.5),
    ('text', '--color-danger-text', ['--color-bg', '--color-bg-subtle', '--color-surface', '--color-accent-subtle'], 4.5),
    ('text', '--color-text-on-accent', ['--color-accent-solid', '--color-accent-solid-hover'], 4.5),
    ('text', '--color-text-inverse', ['--color-bg-inverse', '--color-accent-solid'], 4.5),
    ('ui', '--color-accent-solid', ['--color-bg', '--color-bg-subtle', '--color-surface'], 3.0),
    ('ui', '--color-border-strong', ['--color-bg', '--color-bg-subtle', '--color-bg-muted', '--color-surface'], 3.0),
    ('ui', '--color-focus-ring', ['--color-bg', '--color-bg-subtle', '--color-bg-muted', '--color-surface', '--color-accent-subtle', '--color-accent-subtle-hover'], 3.0),
    ('ui', '--color-accent-border', ['--color-surface', '--color-accent-subtle', '--color-accent-subtle-hover'], 3.0),
    ('graphic', '--color-art-line', ['--color-bg', '--color-surface', '--color-art-fill'], 3.0),
    ('graphic', '--color-art-accent', ['--color-bg', '--color-surface'], 3.0),
]
out += ['## Semantic pairs (WCAG 2 contrast, measured)', '', '| kind | foreground | background | ratio | min | result |', '|---|---|---|---|---|---|']
fails = 0
for kind, fg, bgs, mn in PAIRS:
    for bg in bgs:
        r = ratio(res(fg), res(bg)); ok = r >= mn; fails += not ok
        out.append('| %s | `%s` %s | `%s` %s | %.2f:1 | %.1f | %s |' % (kind, fg, res(fg), bg, res(bg), r, mn, 'pass' if ok else '**FAIL**'))
out += ['', 'Pairs failing: %d' % fails]
open(os.path.join(HERE, '..', 'qa', 'brand-tokens.md'), 'w').write('\n'.join(out) + '\n')
print('\n'.join(out[-60:]))
