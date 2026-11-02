"""Phase 7: spacing values in section CSS against the brief's Carbon ladder.
Scans padding/margin/gap/inset declarations for px and rem literals (rem x16) that are not on the ladder.
Tokens (var(--s*)) are checked once at their definition. Usage: python3 ladder.py"""
import re, glob, os, json
LADDER = {0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 160}
PROPS = re.compile(r'(?<![-\w])(padding(?:-[a-z-]+)?|margin(?:-[a-z-]+)?|gap|row-gap|column-gap|inset(?:-[a-z-]+)?)\s*:\s*([^;}]+)')
NUM = re.compile(r'(?<![\w.#-])(-?\d*\.?\d+)(px|rem)\b')
root = os.path.join(os.path.dirname(__file__), '..', 'css')
out = {}
for f in sorted(glob.glob(root + '/**/*.css', recursive=True)):
    src = open(f).read()
    src = re.sub(r'/\*.*?\*/', '', src, flags=re.S)
    bad = []
    for m in PROPS.finditer(src):
        val = m.group(2)
        if 'clamp(' in val:
            # fluid spacing: the two poles must be ladder values (the vw term in the middle is the slope)
            nums = [x for c in re.findall(r'clamp\(([^,]+),[^,]+,([^)]+)\)', val) for p in c for x in NUM.findall(p)]
        elif 'calc(' in val or 'max(' in val or 'min(' in val:
            nums = []  # computed expressions (offsets, safe areas): judged by hand
        else:
            nums = NUM.findall(val)
        for n, u in nums:
            px = abs(float(n)) * (16 if u == 'rem' else 1)
            if round(px, 2) not in LADDER:
                line = src[:m.start()].count('\n') + 1
                bad.append({'prop': m.group(1), 'value': val.strip()[:60], 'px': px})
    out[os.path.relpath(f, root)] = bad
tot = sum(len(v) for v in out.values())
for k, v in out.items():
    if v: print(f'{k}: {len(v)} off-ladder  e.g. ' + '; '.join(sorted({b["prop"] + " " + b["value"] for b in v})[:4]))
print('TOTAL off-ladder declarations:', tot)
json.dump(out, open('/home/user/CLaude/qa/finalize/phase7/ladder.json', 'w'), indent=1)
