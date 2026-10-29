"""mark.py <row-tag> <section-row-name> <version 1-3> <verification text>
Fills the TRACEABILITY row's Verification and flips that version to passes: YES in SECTIONS.md."""
import re, sys
tag, secname, v, text = sys.argv[1], sys.argv[2], int(sys.argv[3]), sys.argv[4]
R = '/home/user/CLaude/'
p = R + 'TRACEABILITY.md'; s = open(p).read()
i = s.index(tag); j = s.index('- **Verification:**', i)
k = s.index('\n', j)
s = s[:j] + '- **Verification:** ' + text + s[k:]
open(p, 'w').write(s)
p = R + 'SECTIONS.md'; s = open(p).read()
lines = s.split('\n')
for n, ln in enumerate(lines):
    if ln.startswith('| ') and f'| {secname} |' in ln:
        cells = ln.split('|')
        cells[2 + v] = cells[2 + v].replace('passes: NO', 'passes: YES')
        lines[n] = '|'.join(cells)
open(p, 'w').write('\n'.join(lines))
print('ok', tag, v)
