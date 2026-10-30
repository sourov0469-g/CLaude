# R5 (owner clarification: inner pages are versioned per SECTION). Before the pages are decomposed into sections, the
# five whole-page layouts of each inner page, as they stood at R4 final (git HEAD when this runs, 45ad7a2 + the R5
# note), become hidden backups B1-B5 of that page's new head section. Verbatim except the class prefix (sp -> esp,
# ab -> eab, ct -> ect) and the helper import paths, with a frozen copy of their CSS and JS, so no later change to the
# live sections can reach them. Image registry keys (data-img) are kept out of the rename. Run once, never edit outputs:
#   python3 -I build/mk-bk3.py
import os, re, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); V5 = os.path.normpath(os.path.join(HERE, '..')); REPO = os.path.normpath(os.path.join(V5, '..', '..'))
REV = 'cbe610a'
PAGES = [('svcp', 'sp', 'sphero'), ('about', 'ab', 'abhero'), ('contact', 'ct', 'cthero')]
def git(path): return subprocess.run(['git', '-C', REPO, 'show', f'{REV}:rembrandt/v5/src/{path}'], capture_output=True, text=True, check=True).stdout
base = git('base.css')
SHARED = ''.join(m.group(0) + '\n' for m in re.finditer(r'(?m)^(?:@media[^\n]*\{)?\.sp-(?:close|act)[^\n]*$', base))  # the shared close card, frozen with the record
for sid, p, to in PAGES:
    rx = re.compile(r'(?<![\w-])' + p + r'(?=\d|(?!\w))')
    ren = lambda s: ''.join(x if x.startswith('data-img="') else rx.sub('e' + p, x) for x in re.split(r'(data-img="[^"]*")', s))
    d = os.path.join(V5, 'src', 'sections', to, 'bk'); os.makedirs(d, exist_ok=True)
    for v in range(1, 6):
        open(os.path.join(d, f'b{v}.html'), 'w').write(ren(git(f'sections/{sid}/v{v}.html')))
    css = ren(git(f'sections/{sid}/{sid}.css')) + (ren(SHARED) if p == 'sp' else '')
    open(os.path.join(d, 'bk.css'), 'w').write(f'/* Backups B1-B5 of the {to} section (R5): the whole-page {sid} layouts as they stood at {REV}, before the page was split into sections; verbatim except the prefix {p} -> e{p}. Never edit. */\n' + css)
    js = ren(git(f'sections/{sid}/{sid}.js')).replace("from '../../js/", "from '../../../js/").replace("from '../../data/", "from '../../../data/")
    open(os.path.join(d, 'bk.js'), 'w').write(f'// Backups B1-B5 of the {to} section (R5): the whole-page {sid} layouts as they stood at {REV}; verbatim except the prefix {p} -> e{p} and the import paths. Never edit.\n' + js)
    print(to, 'b1-b5 written from', sid)
