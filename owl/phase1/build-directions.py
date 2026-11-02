# builds directions.html from directions.src.html: inlines Owl's kept logo byte-for-byte (only class hooks added to the
# existing eye/pupil paths so they can move; no path data, colour or geometry changes), sprockets, perforations, phone icon
import re, itertools
src = open('directions.src.html').read()
cnt = itertools.count()
def logo(file, eyes, pupils):
    s = open('../assets/source/' + file).read()
    n = next(cnt)
    s = s.replace('<svg ', '<svg class="logo" role="img" aria-label="Owl Roofing" ', 1)
    s = re.sub(r'clip0_[0-9_]+', f'clipOwl{n}', s)
    s = re.sub(r'width="\d+" height="\d+" viewBox', 'viewBox', s, count=1)
    i = -1
    def tag(m):
        nonlocal i; i += 1
        cls = 'eye' if i in eyes else 'pupil' if i in pupils else None
        return m.group(0).replace('<path ', f'<path class="{cls}" ', 1) if cls else m.group(0)
    return re.sub(r'<path [^>]*>', tag, s)
COLOUR = lambda: logo('owl-roofing-logo.svg', {9, 10}, {11, 12})
WHITE = lambda: logo('owl-logo-white.svg', set(), {9, 10})
while 'LOGO_COLOUR' in src: src = src.replace('LOGO_COLOUR', COLOUR(), 1)
while 'LOGO_WHITE' in src: src = src.replace('LOGO_WHITE', WHITE(), 1)
spro = ''.join(f'<rect x="{x}" y="12" width="20" height="20" rx="4"/>' for x in range(14, 1200, 40))
perf = ''.join(f'<rect x="{x}" y="3" width="12" height="10" rx="3"/>' for x in range(10, 1200, 30))
phone = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3.5h3l1.5 4-2 1.3a11 11 0 0 0 7.7 7.7l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A17.5 17.5 0 0 1 3 5.7 2 2 0 0 1 5 3.5z"/></svg>'
src = src.replace('SPROCKETS', spro).replace('PERFS', perf).replace('PHONE_ICON', phone)
assert 'LOGO_' not in src and 'SPROCKETS' not in src
open('directions.html', 'w').write(src); print('built directions.html', len(src))
