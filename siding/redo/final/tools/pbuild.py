"""Build one inner page in isolation: python3 tools/pbuild.py <route> <out.html>. Other pages become stubs; their wire() calls are wrapped in try/catch so a half-built neighbour cannot stop FRoute.init()."""
import os, re, sys
H = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'); sys.path.insert(0, H); os.chdir(H)
os.environ['PAGES_ONLY'] = sys.argv[1]
import build_final as B
h = B.build()
for g in ('FPSiding', 'FPRoofing', 'FPWork', 'FPContact', 'FPWindows'):
    if g != {'windows': 'FPWindows', 'our-work': 'FPWork', 'siding': 'FPSiding', 'roofing': 'FPRoofing', 'contact': 'FPContact'}[sys.argv[1]]:
        h = h.replace(f'{g}.wire(document);', f'try{{{g}.wire(document)}}catch(e){{}};')
open(sys.argv[2], 'w').write(h); print(sys.argv[2], len(h.encode()))
