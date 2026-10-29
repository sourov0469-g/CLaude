"""Pack site/index.html into ONE self-contained file: siding/homepage-standalone.html.

Everything is inside the file: CSS (font and mask images as data URIs), every script in load order, and every
image the page can show, stored once each in an asset table and turned into blob URLs at start-up. Image tags carry
`data-asrc` instead of `src` so nothing tries to load from disk; the start-up script fills them, and home.js calls
`window.__apAsset(node)` after it clones a version template or swaps a photo. Opens by double-click (file://).
Run: `python3 -I single.py`.
"""
import base64
import glob
import json
import os
import re

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(os.path.dirname(HERE), 'site')
OUT = os.path.join(os.path.dirname(HERE), 'homepage-standalone.html')
JS = ['gsap', 'ScrollTrigger', 'Flip', 'SplitText', 'DrawSVGPlugin', 'MorphSVGPlugin', 'Draggable', 'InertiaPlugin', 'Observer',
      'ScrambleTextPlugin', 'CustomEase']
MIME = {'.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2'}


def rd(p, mode='r'):
    with open(os.path.join(SITE, p), mode) as f:
        return f.read()


def norm(p):
    return os.path.normpath(p).replace(os.sep, '/')


def data_uri(p):
    ext = os.path.splitext(p)[1]
    return f'data:{MIME[ext]};base64,' + base64.b64encode(rd(p, 'rb')).decode()


def build():
    html = rd('index.html')
    # 1. CSS inline, with its url()s as data URIs (font + three studio masks, each used once)
    css = rd('assets/css/home.css')
    css = re.sub(r'url\((\.\./[^)]+)\)', lambda m: f'url("{data_uri(norm(os.path.join("assets/css", m.group(1))))}")', css)
    html = html.replace('<link rel="stylesheet" href="assets/css/home.css">', f'<style>\n{css}\n</style>')
    html = re.sub(r'<link rel="preload" href="assets/fonts/[^"]+"[^>]*>\n?', '', html)
    html = html.replace('<link rel="icon" href="assets/img/favicon.png">', f'<link rel="icon" href="{data_uri("assets/img/favicon.png")}">')
    # 2. images: one src per tag, no srcset (the single file carries one size of each photo)
    html = re.sub(r'\s(?:srcset|sizes)="[^"]*"', '', html)
    used = set()

    def to_data_src(m):
        p = norm(m.group(1))
        used.add(p)
        return f' data-asrc="{p}"'
    html = re.sub(r'\ssrc="(assets/img/[^"]+)"', to_data_src, html)
    # paths that appear in JSON or that scripts build at run time
    for p in re.findall(r'assets/img/[A-Za-z0-9_./-]+\.(?:webp|png|jpg)', html):
        used.add(norm(p))
    for p in glob.glob(os.path.join(SITE, 'assets/img/h/work-*-1000.webp')) + glob.glob(os.path.join(SITE, 'assets/img/h/bp-*-1000.webp')):
        used.add(norm(os.path.relpath(p, SITE)))
    missing = [p for p in used if not os.path.exists(os.path.join(SITE, p))]
    assert not missing, missing
    table = {p: base64.b64encode(rd(p, 'rb')).decode() for p in sorted(used)}
    # 3. start-up: asset table -> blob URLs, fill every data-asrc now and on demand
    boot = '''<script>(function(){var T=JSON.parse(document.getElementById('ap-assets').textContent),U={};
function url(p){if(!p)return p;var k=p.replace(/^\\.\\//,'');if(U[k])return U[k];var b=T[k];if(!b)return p;var s=atob(b),n=s.length,a=new Uint8Array(n);for(var i=0;i<n;i++)a[i]=s.charCodeAt(i);
var t=/\\.png$/.test(k)?'image/png':/\\.jpe?g$/.test(k)?'image/jpeg':'image/webp';U[k]=URL.createObjectURL(new Blob([a],{type:t}));return U[k];}
function fill(root){if(!root)return;var list=[];if(root.nodeType===1&&(root.hasAttribute('data-asrc')||(root.tagName==='IMG'&&/^assets\\//.test(root.getAttribute('src')||''))))list.push(root);
if(root.querySelectorAll)list=list.concat([].slice.call(root.querySelectorAll('[data-asrc],img[src^="assets/"]')));
list.forEach(function(el){var p=el.getAttribute('data-asrc')||el.getAttribute('src');el.removeAttribute('data-asrc');el.setAttribute('src',url(p));});}
window.__apUrl=url;window.__apAsset=fill;fill(document);})();</script>
'''
    asset_tag = '<script type="application/json" id="ap-assets">' + json.dumps(table, separators=(',', ':')) + '</script>\n'
    # 4. scripts inline in load order, after the asset start-up
    scripts = ''
    for n in JS:
        src = rd(f'assets/js/{n}.min.js').replace('</script', '<\\/script')
        scripts += f'<script>\n{src}\n</script>\n'
    for n in ('lenis.min.js', 'fx.js', 'home.js'):
        scripts += '<script>\n' + rd(f'assets/js/{n}').replace('</script', '<\\/script') + '\n</script>\n'
    html = re.sub(r'(<script src="assets/js/[^"]+" defer></script>\n)+', '', html)
    html = html.replace('</body>', asset_tag + boot + scripts + '</body>')
    # nothing may still point at the disk
    left = re.findall(r'(?<![-\w])(?:src|href)="assets/[^"]+"', html)
    assert not left, left[:5]
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(html)
    imgs = sum(len(v) for v in table.values()) * 3 // 4
    print(f'{os.path.basename(OUT)} {os.path.getsize(OUT) / 1048576:.1f} MB; {len(table)} images ({imgs / 1048576:.1f} MB raw)')


if __name__ == '__main__':
    build()
