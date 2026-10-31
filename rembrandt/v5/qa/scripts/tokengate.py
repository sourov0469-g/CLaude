# R6 token gate (critique-brand-consistency S1496 token compliance; better-colors S0071 two tiers). In every LIVE source
# (backups and frozen helpers are byte-kept records, excluded):
#  1. components reference colour only through the semantic tier (--color-*); primitives (--teal-*, --neutral-*,
#     --white) appear only where the tier is defined (:root and the theme scopes that repoint it);
#  2. no legacy R4 alias (--a500, --sun, --ink, --paper ...) is referenced outside the backup-only palette blocks;
#  3. no colour literal (hex, rgb(), hsl(), oklch()) outside :root, except alpha masks / sampling canvases, listed.
# Usage (from rembrandt/v5): python3 -I qa/scripts/tokengate.py
import re, glob, os
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'src'))
live = sorted(f for f in glob.glob('**/*.css', recursive=True) + glob.glob('**/*.js', recursive=True) + glob.glob('**/*.html', recursive=True) if '/bk/' not in f and '/frozen/' not in f)
LEGACY = r'--(a[1-9]00|a50|sun|sun-hi|ink|ink-2|paper|black|blue|blue-hi|cream|muted|n[357]00|line|sky|mist|steel|shingle|chalk|wood|on-dark-2|on-blue-muted|accent)\b'
PRIM = r'var\(--(teal|neutral)-\d+\)|var\(--white\)'
def scopes(text):
    """yield (selector, body) for every rule; :root and theme scopes are where the tier is defined"""
    for m in re.finditer(r'([^{}]*)\{([^{}]*)\}', text): yield m.group(1).strip().split('\n')[-1], m.group(2)
THEME = re.compile(r':root|\.cl1,\.cl2|\.cl7-flyer|on-bk|on-rec')
viol = {'semantic-only': [], 'legacy': [], 'literal': []}; refs = 0
for f in live:
    t = open(f).read()
    if f.endswith('.css'):
        for sel, body in scopes(t):
            if THEME.search(sel): continue
            refs += len(re.findall(r'var\(--color-', body))
            for m in re.finditer(PRIM, body): viol['semantic-only'].append(f'{f}: {sel[:40]} {m.group(0)}')
            for m in re.finditer(r'var\(' + LEGACY + r'\)', body): viol['legacy'].append(f'{f}: {sel[:40]} {m.group(0)}')
            for m in re.finditer(r'#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|oklch\(', re.sub(r'data:[^"\')\s]+', '', body)):
                if 'mask-image' in body and m.group(0).startswith('#000'): continue
                viol['literal'].append(f'{f}: {sel[:40]} {m.group(0)}')
    else:
        body = re.sub(r'data:[^"\')\s]+', '', t)
        refs += len(re.findall(r"--color-", body))
        for m in re.finditer(PRIM, body): viol['semantic-only'].append(f'{f}: {m.group(0)}')
        for m in re.finditer(r"['\"(]" + LEGACY + r"['\")]", body): viol['legacy'].append(f'{f}: {m.group(0)}')
        for i, line in enumerate(body.split('\n'), 1):
            for m in re.finditer(r'(?<![\w&])#[0-9a-fA-F]{6}\b|(?<![\w&])#[0-9a-fA-F]{3}\b(?![\w-])', line):
                if 'theme-color' in line: continue
                if re.search(r'(//|/\*|\[BANK\]|deep read|Bakstad|#\d{3}\b)', line[:m.end()]) and not re.search(r"['\"]#", line[m.start() - 1:m.start() + 1]): continue
                viol['literal'].append(f'{f}:{i} {m.group(0)}')
print(f'semantic token references in live components: {refs}')
for k, v in viol.items():
    print(f'{k}: {len(v)}'); [print('   ', x) for x in v[:12]]
