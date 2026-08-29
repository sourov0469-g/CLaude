#!/usr/bin/env python3
"""Assemble the presentation into self-contained files.

Two outputs, both from the same sources in src/:

  index.html          a complete HTML document. Works from a USB stick, from
                      file://, or from GitHub Pages, with no network at all —
                      fonts, libraries, photographs and the video clip are all
                      inlined.
  dist/artifact.html  the same page as a fragment (no <html>/<head>/<body>),
                      which is what the Artifact host expects.

Run: python3 tools/build.py
"""
import base64
import json
import mimetypes
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'src')
ASSETS = os.path.join(ROOT, 'assets')

TITLE = 'PizzaBurg HRM'
DESCRIPTION = (
    'An immersive 3D presentation on the human resource practices of PizzaBurg, '
    'by Group NEXIX, Bangladesh University.'
)


def read(*parts):
    with open(os.path.join(*parts), encoding='utf-8') as fh:
        return fh.read()


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


def build():
    images = collect_images()
    videos = collect_videos()

    css = read(SRC, 'styles.css') + '\n' + read(SRC, 'visuals.css')
    for token, path in (
        ('FONT_FRAUNCES', 'fonts/fraunces-latin.woff2'),
        ('FONT_INTER', 'fonts/inter-latin.woff2'),
        ('FONT_POPPINS', 'fonts/poppins-700-latin.woff2'),
    ):
        # the stylesheet writes url(FONT_X); swap the token for the payload
        css = css.replace(token, data_uri(os.path.join(ASSETS, path)))

    media_js = read(SRC, 'media.js')
    media_js = media_js.replace('/*__IMAGES__*/ {}', json.dumps(images))
    media_js = media_js.replace('/*__VIDEOS__*/ {}', json.dumps(videos))

    js = '\n'.join([
        read(SRC, 'data.js'),
        media_js,
        read(SRC, 'visuals.js'),
        read(SRC, 'world.js'),
        read(SRC, 'deck.js'),
    ])

    vendor = read(ASSETS, 'vendor', 'three.min.js') + '\n;\n' + read(ASSETS, 'vendor', 'gsap.min.js')

    head = (
        '<title>%s</title>\n'
        '<meta name="description" content="%s">\n'
        '<style>\n%s\n</style>\n'
    ) % (TITLE, DESCRIPTION, css)

    body = read(SRC, 'body.html')

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

    with open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8') as fh:
        fh.write(document)
    os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
    with open(os.path.join(ROOT, 'dist', 'artifact.html'), 'w', encoding='utf-8') as fh:
        fh.write(fragment)

    mb = len(document.encode('utf-8')) / 1024 / 1024
    print('index.html          %6.2f MB' % mb)
    print('dist/artifact.html  %6.2f MB' % (len(fragment.encode('utf-8')) / 1024 / 1024))
    print('images inlined      %d' % len(images))
    print('videos inlined      %d' % len(videos))
    if mb > 15.0:
        print('WARNING: over the 15 MB comfort line for an Artifact', file=sys.stderr)
    return images, videos


if __name__ == '__main__':
    build()
