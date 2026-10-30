# R4 master directive Phase 5: the second backup generation. For each homepage section, the five versions as they stood
# BEFORE the redesign (commit 2ee2693, the last state before the logo/palette change) become hidden backups B4-B8. They
# are verbatim except the class prefix (hx -> chx, pv -> cpv, ...) so no live rule can reach them, and their helper
# imports point at the frozen copies. Run once: python3 -I build/mk-bk2.py   (idempotent; never edit the outputs)
import os, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); V5 = os.path.normpath(os.path.join(HERE, '..')); REPO = os.path.normpath(os.path.join(V5, '..', '..'))
REV = '2ee2693'
PFX = {'hero': 'hx', 'proof': 'pv', 'svc': 'sv', 'work': 'wv', 'family': 'fm', 'how': 'hw', 'storm': 'st', 'area': 'tw', 'call': 'cl',
       'svcp': 'sp', 'about': 'ab'}  # Phase 6: the Services and About pages' layouts as they stood before the redesign
FROZEN = {f[:-3] for f in os.listdir(os.path.join(V5, 'src', 'js', 'frozen'))}
def git(path): return subprocess.run(['git', '-C', REPO, 'show', f'{REV}:rembrandt/v5/src/{path}'], capture_output=True, text=True, check=True).stdout
for sid, p in PFX.items():
    rx = re.compile(r'(?<![\w-])' + p + r'(?=\d|(?!\w))')
    # image keys (data-img="ab-crew") are registry names, not classes: they are kept out of the rename
    ren = lambda s: ''.join(x if x.startswith('data-img="') else rx.sub('c' + p, x) for x in re.split(r'(data-img="[^"]*")', s))
    d = os.path.join(V5, 'src', 'sections', sid, 'bk'); os.makedirs(d, exist_ok=True)
    for v in range(1, 6):
        open(os.path.join(d, f'b{v + 3}.html'), 'w').write(ren(git(f'sections/{sid}/v{v}.html')))
    css = ren(git(f'sections/{sid}/{sid}.css'))
    open(os.path.join(d, 'bk2.css'), 'w').write(f'/* Backups B4-B8 of the {sid} section (R4 directive Phase 5): the pre-redesign versions from {REV}, verbatim except the prefix {p} -> c{p}. Never edit. */\n' + css)
    js = ren(git(f'sections/{sid}/{sid}.js'))
    js = re.sub(r"from '\.\./\.\./js/([a-z]+)\.js'", lambda m: f"from '../../../js/{'frozen/' if m.group(1) in FROZEN else ''}{m.group(1)}.js'", js)
    js = js.replace("from '../../../js/frozen/fx.js'", "from '../../../js/frozen/fx2.js'").replace("from '../../data/", "from '../../../data/")
    js = re.sub(r'export default \{([^}]*)\}', lambda m: 'export default {' + re.sub(r'(\d+):', lambda k: f'{int(k.group(1)) + 3}:', m.group(1)) + '}', js)
    open(os.path.join(d, 'bk2.js'), 'w').write(f'// Backups B4-B8 of the {sid} section (R4 directive Phase 5): the pre-redesign versions from {REV}, verbatim except the prefix {p} -> c{p} and the helper import paths. Never edit.\n' + js)
    print(sid, 'b4-b8 written')
