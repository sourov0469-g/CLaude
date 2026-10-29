"""Pack site/index.html into ONE self-contained file: siding/homepage-standalone.html.

Everything is inside the file: CSS (font and mask images as data URIs), every script in load order, and every
image the page can show, stored once each in an asset table and turned into blob URLs at start-up. Image tags carry
`data-asrc` instead of `src` so nothing tries to load from disk; the start-up script fills them, and home.js calls
`window.__apAsset(node)` after it clones a version template or swaps a photo. Opens by double-click (file://).
Run: `python3 -I single.py`.
"""
import base64
import glob
import io
import json
import os
import re
import shutil
import subprocess

from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(os.path.dirname(HERE), 'site')
OUT = os.path.join(os.path.dirname(HERE), 'homepage-standalone.html')
JS = ['gsap', 'ScrollTrigger', 'DrawSVGPlugin', 'MorphSVGPlugin', 'Draggable', 'InertiaPlugin', 'CustomEase']
MIME = {'.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2'}
# F18 weight pass, applied only to the packed copy (the site's own files stay as they are): (path pattern, max width,
# format, quality), first match wins. Job photos go to AVIF at 50 (about 40 % under WebP at the same look) and at most
# 1120 px wide (the widest place one shows is the Hero 3 panel); the traced blueprint plates are two-tone line art,
# stored lossless as ink on sheet; badges, logos and the font are untouched.
SQUEEZE = [(r'assets/img/photos/p\d+-1400\.webp$', 1120, 'AVIF', 50), (r'assets/img/h/bp-', 1000, 'PLATE', 0),
           (r'assets/img/h/t/', 320, 'AVIF', 55), (r'assets/img/h/trade-', 640, 'AVIF', 50),
           (r'assets/img/(h/(work|book)|pairs/|studio/base)', 1440, 'AVIF', 50)]
TERSER = os.environ.get('TERSER') or shutil.which('terser')   # optional: minify the two site scripts when terser is on PATH


def rd(p, mode='r'):
    with open(os.path.join(SITE, p), mode) as f:
        return f.read()


def norm(p):
    return os.path.normpath(p).replace(os.sep, '/')


def data_uri(p):
    ext = os.path.splitext(p)[1]
    raw = rd(p, 'rb')
    if ext == '.png' and '/studio/mask-' in p:          # alpha masks: lossless WebP keeps every edge and halves the bytes
        buf = io.BytesIO()
        Image.open(io.BytesIO(raw)).save(buf, 'WEBP', lossless=True, method=6)
        if buf.tell() < len(raw):
            raw, ext = buf.getvalue(), '.webp'
    return f'data:{MIME[ext]};base64,' + base64.b64encode(raw).decode()


def squeeze(p):
    """(bytes, mime) for the packed copy of an image; the original when re-encoding would not make it smaller"""
    raw = rd(p, 'rb')
    for rx, w, fmt, q in SQUEEZE:
        if re.search(rx, p):
            im = Image.open(io.BytesIO(raw)).convert('RGB')
            if im.width > w:
                im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
            buf = io.BytesIO()
            if fmt == 'PLATE':                               # two-tone: ink and sheet as blueprints.py draws them
                ink = im.convert('L').point(lambda v: 255 if v < 185 else 0, '1')
                im = Image.new('RGB', im.size, (248, 249, 250))
                im.paste((67, 67, 66), mask=ink)
                im.save(buf, 'WEBP', lossless=True, method=6)
                mime = 'image/webp'
            else:
                im.save(buf, 'AVIF', quality=q, speed=4)
                mime = 'image/avif'
            if buf.tell() < len(raw):
                return buf.getvalue(), mime
            break
    return raw, MIME[os.path.splitext(p)[1]]


def script(n):
    src = rd(f'assets/js/{n}')
    if TERSER and n in ('fx.js', 'v4.js', 'home.js'):
        src = subprocess.run([TERSER, '--compress', '--mangle'], input=src, capture_output=True, text=True, check=True).stdout
    return src.replace('</script', '<\\/script')


def build():
    html = rd('index.html')
    # 1. CSS inline. The font goes in as a data URI (var() is not allowed in @font-face); every other url() is written
    #    once as a custom property on :root and referenced by var(), so a mask used by two properties is stored once.
    css = rd('assets/css/home.css')
    css = re.sub(r'(@font-face\s*\{[^}]*?)url\((\.\./[^)]+)\)', lambda m: f'{m.group(1)}url("{data_uri(norm(os.path.join("assets/css", m.group(2))))}")', css)
    urls = {}

    def to_var(m):
        k = norm(os.path.join('assets/css', m.group(1)))
        if k not in urls:
            urls[k] = f'--u{len(urls)}'
        return f'var({urls[k]})'
    css = re.sub(r'url\((\.\./[^)]+)\)', to_var, css)
    css = ':root{' + ';'.join(f'{v}:url("{data_uri(k)}")' for k, v in urls.items()) + '}\n' + css
    html = html.replace('<link rel="stylesheet" href="assets/css/home.css">', f'<style>\n{css}\n</style>')
    html = re.sub(r'<link rel="preload" href="assets/fonts/[^"]+"[^>]*>\n?', '', html)
    html = html.replace('<link rel="icon" href="assets/img/favicon.png">', f'<link rel="icon" href="{data_uri("assets/img/favicon.png")}">')
    # 2. images: one src per tag, no srcset (the single file carries one size of each photo)
    html = re.sub(r'\s(?:srcset|sizes)="[^"]*"', '', html)
    used = set()

    def asrc(p):
        p = norm(p)
        used.add(p)
        return f' data-asrc="{p}"'
    html = re.sub(r'\ssrc="(assets/img/[^"]+)"', lambda m: asrc(m.group(1)), html)
    # SVG <image href> (Hero 1's masked heading): the start-up script writes it back as href
    html = re.sub(r'(<image\b[^>]*?)\shref="(assets/img/[^"]+)"', lambda m: m.group(1) + asrc(m.group(2)), html)
    # paths that appear in JSON or that scripts build at run time
    for p in re.findall(r'assets/img/[A-Za-z0-9_./-]+\.(?:webp|png|jpg)', html):
        used.add(norm(p))
    for p in glob.glob(os.path.join(SITE, 'assets/img/h/work-*-1000.webp')) + glob.glob(os.path.join(SITE, 'assets/img/h/bp-*-1000.webp')):
        used.add(norm(os.path.relpath(p, SITE)))
    missing = [p for p in used if not os.path.exists(os.path.join(SITE, p))]
    assert not missing, missing
    table, types = {}, {}
    for p in sorted(used):
        data, mime = squeeze(p)
        table[p] = base64.b64encode(data).decode()
        types[p] = mime
    # 3. start-up: asset table -> blob URLs, fill every data-asrc now and on demand
    boot = '''<script>(function(){var A=JSON.parse(document.getElementById('ap-assets').textContent),T=A.d,M=A.t,U={};
function url(p){if(!p)return p;var k=p.replace(/^\\.\\//,'');if(U[k])return U[k];var b=T[k];if(!b)return p;var s=atob(b),n=s.length,a=new Uint8Array(n);for(var i=0;i<n;i++)a[i]=s.charCodeAt(i);
U[k]=URL.createObjectURL(new Blob([a],{type:M[k]||'image/webp'}));return U[k];}
function fill(root){if(!root)return;var list=[];if(root.nodeType===1&&(root.hasAttribute('data-asrc')||(root.tagName==='IMG'&&/^assets\\//.test(root.getAttribute('src')||''))))list.push(root);
if(root.querySelectorAll)list=list.concat([].slice.call(root.querySelectorAll('[data-asrc],img[src^="assets/"]')));
list.forEach(function(el){var p=el.getAttribute('data-asrc')||el.getAttribute('src');el.removeAttribute('data-asrc');el.setAttribute(el.tagName==='image'?'href':'src',url(p));});}
window.__apUrl=url;window.__apAsset=fill;fill(document);})();</script>
'''
    asset_tag = '<script type="application/json" id="ap-assets">' + json.dumps({'t': types, 'd': table}, separators=(',', ':')) + '</script>\n'
    # 4. scripts inline in load order, after the asset start-up
    scripts = ''
    for n in [f'{j}.min.js' for j in JS] + ['lenis.min.js', 'fx.js', 'v4.js', 'home.js']:
        scripts += f'<script>\n{script(n)}\n</script>\n'
    html = re.sub(r'(<script src="assets/js/[^"]+" defer></script>\n)+', '', html)
    html = html.replace('</body>', asset_tag + boot + scripts + '</body>')
    # nothing may still point at the disk
    left = re.findall(r'(?<![-\w])(?:src|href)="assets/[^"]+"', html)
    assert not left, left[:5]
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(html)
    imgs = sum(len(v) for v in table.values()) * 3 // 4
    kinds = {m: sum(1 for t in types.values() if t == m) for m in sorted(set(types.values()))}
    print('formats:', kinds)
    print(f'{os.path.basename(OUT)} {os.path.getsize(OUT) / 1048576:.1f} MB; {len(table)} images ({imgs / 1048576:.1f} MB raw)')


if __name__ == '__main__':
    build()
