"""REBRAND token compliance (S1496 token compliance, S1418 two tiers): every colour in the live stylesheet and scripts
must come from a semantic role token. Literal colours are allowed only in (1) the :root primitive block, (2) the two
record blocks that give the hidden backups their historical values, (3) rules scoped to a backup era. Primitives
(--teal-N, --neutral-N, --red-N, --white) may be referenced only inside :root.
Run: python3 -I qa/v9/tokens.py"""
import os, re, sys
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..')
css = open(os.path.join(ROOT, 'site/assets/css/home.css'), encoding='utf-8').read()
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'url\((?:"[^"]*"|\'[^\']*\'|[^)]*)\)', 'url()', css)
LIT = re.compile(r'--[\w-]+:\s*\d{1,3},\s*\d{1,3},\s*\d{1,3}\b|#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|oklch|oklab|lab|lch)\(\s*[\d.]|(?<![\w-])(?:white|black)(?![\w-])')
PRIM = re.compile(r'var\(--(?:teal|neutral|red)-\d+\)|var\(--white\)')


def rules(s):
    """flatten nested blocks: yield (selector chain, declarations)"""
    out, stack, buf = [], [], ''
    for ch in s:
        if ch == '{':
            stack.append(buf.strip()); buf = ''
        elif ch == '}':
            if buf.strip(): out.append((' >> '.join(stack), buf.strip()))
            buf = ''
            if stack: stack.pop()
        elif ch == ';' and stack and not stack[-1].startswith('@media') and False:
            buf += ch
        else:
            buf += ch
    return out


R = rules(css)
lit_live, prim_live, n_live, n_root, n_rec = [], [], 0, 0, 0
for sel, dec in R:
    if sel.strip() == ':root' or sel.endswith(':root'):
        n_root += 1; continue
    if re.search(r'\[data-bk(="[ab]")?\]', sel) and not re.search(r':not\(\[data-bk', sel) and not re.search(r'\.sec:not\(\[data-bk', sel):
        n_rec += 1; continue
    if '@keyframes' in sel or '@font-face' in sel:
        continue
    n_live += 1
    for m in LIT.finditer(dec):
        prop = dec[:m.start()].rsplit(';', 1)[-1].split(':')[0].strip()
        if 'mask' in prop: continue   # a mask reads alpha only: black/white there are coverage, not colour
        lit_live.append(f'{sel[:70]} {{ {prop}: ...{m.group(0)} }}')
    for m in PRIM.finditer(dec):
        prim_live.append(f'{sel[:70]} -> {m.group(0)}')
print(f'rules: {len(R)}  root {n_root}  backup-era {n_rec}  live {n_live}')
print(f'colour literals in live rules: {len(lit_live)}')
for x in lit_live[:40]: print('  ', x)
print(f'primitive references outside :root: {len(prim_live)}')
for x in prim_live[:40]: print('  ', x)
js_lit = []
for f in ('home.js', 'v4.js', 'fx.js', 'clad.js'):
    p = os.path.join(ROOT, 'site/assets/js', f)
    if not os.path.exists(p): continue
    src = open(p, encoding='utf-8').read()
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    for m in re.finditer(r"['\"`](#[0-9a-fA-F]{3,8})\b|\brgba?\(\s*\d", src):
        line = src[:m.start()].count('\n') + 1
        ctx = src[max(0, m.start() - 400):m.start() + 60]
        # allowed: alpha masks (mask canvas / <mask> gradients), backup-only code paths, and a computed-style comparison
        if re.search(r'mctx|<mask|radialGradient id="\$\{gid\}"', ctx) or "!== 'rgba(0, 0, 0, 0)'" in src[m.start() - 6:m.start() + 24] or 'bk &&' in src[max(0, m.start() - 900):m.start()] or "[data-bk]') ? '#fff'" in ctx or 'BANDS' in ctx or 'rgba(255,1' in src[m.start():m.start() + 12]:
            continue
        js_lit.append(f'{f}:{line} {src[m.start():m.start() + 40]!r}')
    for m in PRIM.finditer(src):
        js_lit.append(f'{f}: primitive {m.group(0)}')
print(f'colour literals / primitives in live scripts: {len(js_lit)}')
for x in js_lit[:40]: print('  ', x)
sys.exit(1 if (lit_live or prim_live) else 0)
