# R5 token gate: every colour literal in the live sources (backups and frozen helpers are byte-kept records, excluded;
# so is the base.css block that restores the old palette for them) is either a declared :root token value or an
# alpha shade of --black (20 20 20) / --paper (255 255 255). Scans hex, rgb()/rgba(), hsl(), oklch(). Prints every
# exception with its line. Usage: python3 -I qa/scripts/tokengate.py   (from rembrandt/v5)
import re, glob, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src'))
live = [f for f in glob.glob('**/*.css', recursive=True) + glob.glob('**/*.js', recursive=True) + glob.glob('**/*.html', recursive=True) if '/bk/' not in f and '/frozen/' not in f]
base = open('base.css').read(); root = re.search(r':root\{(.*?)\n\}', base, re.S) or re.search(r':root\s*\{(.*?)\}', base, re.S)
declared = {h.lower() for h in re.findall(r'#[0-9a-fA-F]{3,8}\b', root.group(1))}
def hexrgb(h):
    h = h[1:]; h = ''.join(c * 2 for c in h) if len(h) == 3 else h[:6]; return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))
tokrgb = {hexrgb(h) for h in declared}
NEUTRAL = {(20, 20, 20), (255, 255, 255), (0, 0, 0)}
n = {'hex': 0, 'rgb': 0, 'hsl': 0, 'oklch': 0}; bad = []
for f in sorted(live):
    for i, line in enumerate(open(f).read().split('\n'), 1):
        if 'on-bk' in line: continue
        if f == 'base.css' and root.group(1) and line.strip() and line in root.group(1): continue
        line_ = re.sub(r'data:[^"\')\s]+', '', line)
        for m in re.finditer(r'(?<![\w&])#[0-9a-fA-F]{6}\b|(?<![\w&])#[0-9a-fA-F]{3}\b(?![\w-])', line_):
            n['hex'] += 1
            if m.group(0).lower() not in declared and not re.search(r'(//|/\*|\[BANK\]|deep read|Bakstad)', line_[:m.start()]): bad.append(f'{f}:{i} hex {m.group(0)}')
        for m in re.finditer(r'rgba?\(\s*(\d+)[ ,]+(\d+)[ ,]+(\d+)', line_):
            n['rgb'] += 1; c = tuple(int(x) for x in m.groups())
            if c not in NEUTRAL and c not in tokrgb: bad.append(f'{f}:{i} rgb{c}')
        for m in re.finditer(r'hsla?\(', line_): n['hsl'] += 1; bad.append(f'{f}:{i} hsl()')
        for m in re.finditer(r'oklch\(', line_): n['oklch'] += 1; bad.append(f'{f}:{i} oklch()')
print('declared colour tokens in base.css :root:', len(declared))
print('colour literals scanned outside :root:', n)
print('exceptions (not a token value, not a black/paper alpha shade):', len(bad))
for b in bad: print('  ', b)
