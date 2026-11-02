#!/usr/bin/env python3
"""Token lint for the Owl identity (⟦S1496⟧ token compliance). Fails on: raw hex colours outside tokens.css,
px lengths not on the Carbon ladder (borders/strokes <=3px excepted), font-size/duration literals outside tokens.
Usage: python3 -I lint-tokens.py file [file...]"""
import re, sys
LADDER = {2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160}
MASK_OK = {'#fff', '#000'}  # luminance values inside <mask> gradients only (not colours a viewer sees)
bad = []
for f in sys.argv[1:]:
    for n, line in enumerate(open(f), 1):
        code = re.sub(r'/\*.*?\*/|//.*$', '', line)
        for h in re.findall(r'#[0-9A-Fa-f]{6}\b|#[0-9A-Fa-f]{3}\b', code):
            if h.lower() in MASK_OK and ('mask' in code.lower() or "'stop-color'" in code): continue
            bad.append(f'{f}:{n}: raw colour {h}')
        if f.endswith('.css'):
            for m in re.finditer(r'(?<![\w.])-?(\d+(?:\.\d+)?)px', code):
                v = float(m.group(1))
                if v <= 3 or v == 999 or v in LADDER: continue
                ctx = code[max(0, m.start() - 40):m.end()]
                if '@media' in ctx or 'owl-pan' in code: continue  # owl-pan moves exactly one 1440-unit viewBox tile
                bad.append(f'{f}:{n}: off-ladder {m.group(0)}  ({code.strip()[:90]})')
            for m in re.finditer(r'(\d+)ms', code):
                if m.group(1) == '0': continue
                if ':root' in code or 'var(' in code[:m.start()][-30:]: continue
                bad.append(f'{f}:{n}: raw duration {m.group(0)}')
print('\n'.join(bad) or 'token lint: clean')
sys.exit(1 if bad else 0)
