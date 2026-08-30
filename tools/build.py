#!/usr/bin/env python3
"""Assemble the presentations into self-contained files.

Two decks are built from the same sources in src/ — the HRM report and the
CSR report. They share the engine (media, visuals, deck) and differ in their
data, their 3D world and their shell. Each deck produces two outputs:

  index.html          a complete HTML document. Works from a USB stick, from
  csr.html            file://, or from GitHub Pages, with no network at all —
                      fonts, libraries, photographs and the video clips are
                      all inlined.
  dist/artifact.html  the same page as a fragment (no <html>/<head>/<body>),
  dist/csr-artifact.html  which is what the Artifact host expects.

Run: python3 tools/build.py          both decks
     python3 tools/build.py csr      one deck
"""
import base64
import json
import mimetypes
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
ASSETS = os.path.join(ROOT, 'assets')

# Paths below are repo-relative and slash-separated; rooted() turns them into
# real paths. The js list is the concatenation order, and it matters: every
# file lands in one <script>, so a const declared in data.js is visible to
# world.js and deck.js further down.
DECKS = {
    'hrm': {
        'title': 'PizzaBurg HRM Practices',
        'description': (
            'An immersive 3D presentation on the human resource practices of PizzaBurg, '
            'by Group NEXIX, Bangladesh University.'
        ),
        'css': ['src/styles.css', 'src/visuals.css'],
        'body': 'src/body.html',
        'js': [
            'src/data.js',
            'src/media.js',
            'src/visuals.js',
            'src/world.js',
            'src/deck.js',
        ],
        'document': 'index.html',
        'fragment': 'dist/artifact.html',
    },
    'csr': {
        'title': 'PizzaBurg and Corporate Social Responsibility',
        'description': (
            'An immersive 3D presentation on the corporate social responsibility of '
            'PizzaBurg, by Group NEXIX, Bangladesh University.'
        ),
        'css': ['src/styles.css', 'src/visuals.css', 'src/csr/visuals.css'],
        'body': 'src/csr/body.html',
        'js': [
            'src/csr/data.js',
            'src/media.js',
            'src/visuals.js',
            'src/csr/visuals.js',
            'src/csr/enrich.js',
            'src/csr/world.js',
            'src/deck.js',
        ],
        'document': 'csr.html',
        'fragment': 'dist/csr-artifact.html',
    },
}

DECK_ORDER = ['hrm', 'csr']


def read(*parts):
    with open(os.path.join(*parts), encoding='utf-8') as fh:
        return fh.read()


def rooted(relpath):
    return os.path.join(ROOT, *relpath.split('/'))


def data_uri(path):
    mime, _ = mimetypes.guess_type(path)
    if mime is None:
        mime = 'application/octet-stream'
    if path.endswith('.webp'):
        mime = 'image/webp'
    if path.endswith('.woff2'):
        mime = 'font/woff2'
    with open(path, 'rb') as fh:
        return 'data:%s;base64,%s' % (mime, base64.b64encode(fh.read()).decode('ascii'))


def collect_images():
    """Every .webp/.jpg/.png under assets/img, keyed by filename stem.

    Files in sub-folders keep a prefix so a stock photo and a field photo can
    never collide: assets/img/stock/oven.webp -> "stock-oven".
    """
    out = {}
    base = os.path.join(ASSETS, 'img')
    for dirpath, _dirnames, filenames in os.walk(base):
        rel = os.path.relpath(dirpath, base)
        prefix = '' if rel == '.' else rel.replace(os.sep, '-') + '-'
        for fn in sorted(filenames):
            stem, ext = os.path.splitext(fn)
            if ext.lower() not in ('.webp', '.jpg', '.jpeg', '.png'):
                continue
            # files under pizzaburg/ are already named pizzaburg-*, so do not
            # double the prefix
            key = stem if prefix and stem.startswith(prefix) else prefix + stem
            out[key] = data_uri(os.path.join(dirpath, fn))
    return out


def collect_videos():
    out = {}
    base = os.path.join(ASSETS, 'media')
    if not os.path.isdir(base):
        return out
    for fn in sorted(os.listdir(base)):
        stem, ext = os.path.splitext(fn)
        if ext.lower() in ('.mp4', '.webm'):
            out[stem] = data_uri(os.path.join(base, fn))
    return out


def build_media_js():
    """src/media.js with the whole asset library baked into it.

    Both decks share this, so it is built once and handed to each of them.
    """
    images = collect_images()
    videos = collect_videos()
    js = read(SRC, 'media.js')
    js = js.replace('/*__IMAGES__*/ {}', json.dumps(images))
    js = js.replace('/*__VIDEOS__*/ {}', json.dumps(videos))
    return js, len(images), len(videos)


def missing_sources(name):
    deck = DECKS[name]
    paths = deck['css'] + [deck['body']] + deck['js']
    return [p for p in paths if not os.path.isfile(rooted(p))]


def build_deck(name, media_js, vendor):
    deck = DECKS[name]

    css = '\n'.join(read(rooted(p)) for p in deck['css'])
    for token, path in (
        ('FONT_FRAUNCES', 'fonts/fraunces-latin.woff2'),
        ('FONT_INTER', 'fonts/inter-latin.woff2'),
        ('FONT_POPPINS', 'fonts/poppins-700-latin.woff2'),
    ):
        # the stylesheet writes url(FONT_X); swap the token for the payload
        css = css.replace(token, data_uri(os.path.join(ASSETS, path)))

    js = '\n'.join(
        media_js if p == 'src/media.js' else read(rooted(p))
        for p in deck['js']
    )

    head = (
        '<title>%s</title>\n'
        '<meta name="description" content="%s">\n'
        '<style>\n%s\n</style>\n'
    ) % (deck['title'], deck['description'], css)

    body = read(rooted(deck['body']))

    fragment = (
        head
        + body
        + '\n<script>\n' + vendor + '\n</script>\n'
        + '<script>\n' + js + '\n</script>\n'
    )

    document = (
        '<!doctype html>\n<html lang="en">\n<head>\n'
        '<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        '<meta name="color-scheme" content="light">\n'
        + head +
        '</head>\n<body>\n'
        + body
        + '\n<script>\n' + vendor + '\n</script>\n'
        + '<script>\n' + js + '\n</script>\n'
        + '</body>\n</html>\n'
    )

    doc_path = rooted(deck['document'])
    frag_path = rooted(deck['fragment'])
    os.makedirs(os.path.dirname(frag_path), exist_ok=True)
    with open(doc_path, 'w', encoding='utf-8') as fh:
        fh.write(document)
    with open(frag_path, 'w', encoding='utf-8') as fh:
        fh.write(fragment)

    mb = len(document.encode('utf-8')) / 1024 / 1024
    print('%-22s %6.2f MB' % (deck['document'], mb))
    print('%-22s %6.2f MB' % (deck['fragment'], len(fragment.encode('utf-8')) / 1024 / 1024))
    if mb > 15.0:
        print('WARNING: %s is over the 15 MB comfort line for an Artifact' % deck['document'],
              file=sys.stderr)


def build(names=None):
    """Build each named deck. Returns the decks that could not be built.

    A deck whose sources are not all written yet is reported and skipped
    rather than taking the other deck down with it.
    """
    names = names or DECK_ORDER
    media_js, n_images, n_videos = build_media_js()
    vendor = read(ASSETS, 'vendor', 'three.min.js') + '\n;\n' + read(ASSETS, 'vendor', 'gsap.min.js')

    print('images inlined      %d' % n_images)
    print('videos inlined      %d' % n_videos)
    failed = []
    for name in names:
        print('--- %s' % name)
        gone = missing_sources(name)
        if gone:
            failed.append(name)
            print('%s: skipped, missing sources — %s' % (name, ', '.join(gone)), file=sys.stderr)
            continue
        build_deck(name, media_js, vendor)
    return failed


if __name__ == '__main__':
    wanted = sys.argv[1:]
    unknown = [n for n in wanted if n not in DECKS]
    if unknown:
        print('unknown deck: %s — known decks are %s'
              % (', '.join(unknown), ', '.join(DECK_ORDER)), file=sys.stderr)
        sys.exit(2)
    sys.exit(1 if build(wanted or None) else 0)
