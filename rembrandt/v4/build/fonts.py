# Rebuilds site/assets/fonts/*.woff2 (they were not carried into this repo), per BUILD-NOTE "Fonts":
#   Mona Sans variable, wdth 100-125, wght 300-650            -> mona-sans.woff2
#   Newsreader roman, wght 400-600, opsz pinned at 16          -> newsreader.woff2
#   Newsreader italic, static wght 380, opsz 24                -> newsreader-italic.woff2
# each subset to ASCII plus every non-ASCII character the site's copy and scripts use.
# Sources: the OFL variable TTFs from github.com/google/fonts (ofl/monasans, ofl/newsreader).
# Usage: python fonts.py <dir with the downloaded TTFs>   (needs fonttools + brotli)
import html, io, os, re, sys
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.subset import Subsetter, Options

here = os.path.dirname(os.path.abspath(__file__))
site = os.environ.get('SITE') or os.path.join(here, '..', '..', 'site')
src = sys.argv[1]
out = os.path.join(site, 'assets', 'fonts'); os.makedirs(out, exist_ok=True)

# every character the pages and scripts can put on screen (JS escapes decoded, entities resolved)
text = set(chr(c) for c in range(0x20, 0x7f))
files = ['index.html', 'versions.html', 'src/app.js'] + ['src/versions/' + f for f in os.listdir(os.path.join(site, 'src/versions'))]
for f in files:
    s = open(os.path.join(site, f), encoding='utf-8').read()
    s = re.sub(r'\\u\{?([0-9a-fA-F]{4,5})\}?', lambda m: chr(int(m.group(1), 16)), s)
    text |= set(html.unescape(s))
text = ''.join(sorted(c for c in text if c.isprintable() or c == '\u00a0'))

def build(ttf, limits, name):
    font = TTFont(os.path.join(src, ttf))
    font = instantiateVariableFont(font, limits)
    buf = io.BytesIO(); font.save(buf); buf.seek(0); font = TTFont(buf)  # reload: subsetting the in-memory instance trips over lazy gvar data
    opts = Options(); opts.flavor = 'woff2'; opts.layout_features = ['kern', 'liga', 'calt', 'tnum', 'lnum', 'case']
    opts.name_IDs = ['*']; opts.notdef_outline = True; opts.hinting = False
    sub = Subsetter(opts); sub.populate(text=text); sub.subset(font)
    path = os.path.join(out, name); font.flavor = 'woff2'; font.save(path)
    print(f'{name:26} {os.path.getsize(path) / 1024:6.1f} KB')

build('monasans-MonaSans[wdth,wght].ttf', {'wdth': (100, 125), 'wght': (300, 650)}, 'mona-sans.woff2')
build('newsreader-Newsreader[opsz,wght].ttf', {'opsz': 16, 'wght': (400, 600)}, 'newsreader.woff2')
build('newsreader-Newsreader-Italic[opsz,wght].ttf', {'opsz': 24, 'wght': 380}, 'newsreader-italic.woff2')
for lic in ('monasans-OFL.txt', 'newsreader-OFL.txt'):
    if os.path.exists(os.path.join(src, lic)):
        open(os.path.join(out, lic.split('-')[0] + '-OFL.txt'), 'w').write(open(os.path.join(src, lic)).read())
