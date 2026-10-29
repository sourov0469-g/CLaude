"""Pack the built pages into one self-contained HTML file that opens straight from disk.

`python3 -I standalone.py` writes ../site-preview.html with every page built so far.
`python3 -I standalone.py ../homepage-standalone.html index` writes the homepage alone.

Each page runs in a full-window frame. CSS, JS, the font, the data file and every image are embedded once (base64) and
handed to the frames as blob URLs, so a photo used on three pages is stored once. Links between pages are caught inside
the frame and swap the page; the address bar keeps the page (`#/plan/studio`) so reload and Back work. To keep the file
small, images use their smaller published variants (photos 640w, pairs 720w, job photos 480w); the hero keeps 1440w.
"""
import base64, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SITE = os.path.join(ROOT, 'site')
ALL = ['index', 'siding', 'windows', 'plan', 'projects', 'about']
RULES = [(r'(photos/p\d+)-1400\.webp', r'\1-640.webp'), (r'(pairs/[\w-]+?)-1280\.webp', r'\1-720.webp'), (r'(job/4867-\d)-960\.webp', r'\1-480.webp')]
ASSET = re.compile(r'assets/[\w\-./]+\.(?:webp|png|jpg|svg|woff2|json|js|css)\b')
MIME = {'.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2',
        '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json'}

# Injected into every framed page: page links go to the shell, the shell can ask for a scroll, the title goes up.
NAV = '''<script>(function(){var R=/^(index|siding|windows|plan|projects|about)\\.html(#[\\w-]*)?$/;
document.addEventListener('click',function(e){var a=e.target.closest?e.target.closest('a[href]'):null;if(!a)return;var m=(a.getAttribute('href')||'').match(R);if(!m)return;e.preventDefault();e.stopPropagation();parent.postMessage({sap:'go',page:m[1],hash:m[2]||''},'*');},true);
addEventListener('message',function(e){var d=e.data||{};if(d.sap==='scroll'){var el=document.getElementById(d.id);if(el)setTimeout(function(){el.scrollIntoView();},120);}});
parent.postMessage({sap:'title',title:document.title},'*');})();</script>'''

SHELL = '''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Austin Pro Siding, Windows &amp; Roofing: concept redesign</title>
<style>
html, body { margin: 0; height: 100%; background: #EDECE6; overflow: hidden; font: 16px/1.4 system-ui, sans-serif; color: #2F2F30; }
#view { position: fixed; inset: 0; width: 100%; height: 100%; border: 0; display: block; background: #EDECE6; }
#boot { position: fixed; inset: 0; display: grid; place-items: center; margin: 0; }
#note { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); max-width: min(520px, calc(100% - 32px)); box-sizing: border-box;
  padding: 14px 18px; border-radius: 10px; background: #2F2F30; color: #F6F5F1; font-size: 15px; opacity: 0; pointer-events: none; transition: opacity .3s; z-index: 2; }
#note.on { opacity: 1; }
</style>
</head>
<body>
<p id="boot">Loading the site…</p>
<iframe id="view" title="Austin Pro Siding, Windows &amp; Roofing"></iframe>
<div id="note" role="status" aria-live="polite"></div>
<script type="application/json" id="sap-assets">__ASSETS__</script>
<script type="application/json" id="sap-pages">__PAGES__</script>
<script>
(function () {
  var A = JSON.parse(document.getElementById('sap-assets').textContent);
  var P = JSON.parse(document.getElementById('sap-pages').textContent);
  var NAV = __NAV__;
  var U = {};
  function bytes(b) { var s = atob(b), n = s.length, u = new Uint8Array(n); for (var i = 0; i < n; i++) u[i] = s.charCodeAt(i); return u; }
  function text(b) { return new TextDecoder().decode(bytes(b)); }
  function fix(t) { return t.replace(/assets\\/[\\w\\-.\\/]+\\.(?:webp|png|jpg|svg|woff2|json|js|css)\\b/g, function (p) { return U[p] || p; }); }
  // images and fonts first, then the data file, then CSS and JS, which point at both
  function rank(p) { return /\\.json$/.test(p) ? 1 : /\\.(css|js)$/.test(p) ? 2 : 0; }
  Object.keys(A).sort(function (a, b) { return rank(a) - rank(b); }).forEach(function (p) {
    var blob = rank(p) ? new Blob([fix(text(A[p][1]))], { type: A[p][0] }) : new Blob([bytes(A[p][1])], { type: A[p][0] });
    U[p] = URL.createObjectURL(blob);
  });
  var cache = {}, view = document.getElementById('view'), note = document.getElementById('note'), cur = null, want = '', timer;
  function html(name) {
    if (!cache[name]) cache[name] = fix(text(P[name])).replace('<head>', '<head><base href="about:srcdoc">').replace('</body>', function () { return NAV + '</body>'; });
    return cache[name];
  }
  function toast(msg) { note.textContent = msg; note.classList.add('on'); clearTimeout(timer); timer = setTimeout(function () { note.classList.remove('on'); }, 4200); }
  function go(name, hash, push) {
    if (!P[name]) { toast('The About & contact page is still being built. This file holds every page finished so far.'); return; }
    if (push) { try { history.pushState({ p: name, h: hash }, '', '#/' + name + (hash ? '/' + hash.slice(1) : '')); } catch (e) {} }
    if (name === cur) { if (hash) view.contentWindow.postMessage({ sap: 'scroll', id: hash.slice(1) }, '*'); return; }
    cur = name; want = hash;
    view.srcdoc = html(name);
  }
  view.addEventListener('load', function () {
    document.getElementById('boot').hidden = true;
    if (want) view.contentWindow.postMessage({ sap: 'scroll', id: want.slice(1) }, '*');
    want = '';
    view.focus();
  });
  addEventListener('message', function (e) {
    var d = e.data || {};
    if (d.sap === 'go') go(d.page, d.hash, true);
    else if (d.sap === 'title' && d.title) document.title = d.title;
  });
  function fromHash() { var m = location.hash.match(/^#\\/(\\w+)(?:\\/([\\w-]+))?/); return m && P[m[1]] ? [m[1], m[2] ? '#' + m[2] : ''] : ['index', '']; }
  addEventListener('popstate', function () { var r = fromHash(); go(r[0], r[1], false); });
  var r = fromHash(); go(r[0], r[1], false);
})();
</script>
</body>
</html>
'''


def small(path):
    for a, b in RULES:
        path = re.sub(a, b, path)
    return path


def main():
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'site-preview.html')
    names = sys.argv[2:] or [n for n in ALL if os.path.exists(os.path.join(SITE, n + '.html'))]
    pages, need = {}, set()
    for n in names:
        s = ASSET.sub(lambda m: small(m.group(0)), open(os.path.join(SITE, n + '.html'), encoding='utf-8').read())
        pages[n] = s
        need |= set(ASSET.findall(s))
    # CSS and JS point at further files: url(../fonts/..), url(../img/..), 'assets/data/near.json'
    texts = {}
    todo = list(need)
    while todo:
        p = todo.pop()
        if p.endswith(('.css', '.js', '.json')):
            t = open(os.path.join(SITE, p), encoding='utf-8').read()
            if p.endswith('.css'):
                t = re.sub(r'url\(\.\./', 'url(assets/', t)
            t = ASSET.sub(lambda m: small(m.group(0)), t)
            texts[p] = t
            for q in ASSET.findall(t):
                if q not in need:
                    need.add(q)
                    todo.append(q)
    assets = {}
    for p in sorted(need):
        f = os.path.join(SITE, p)
        if not os.path.exists(f):
            print('missing', p)
            continue
        raw = texts[p].encode('utf-8') if p in texts else open(f, 'rb').read()
        assets[p] = [MIME[os.path.splitext(p)[1]], base64.b64encode(raw).decode('ascii')]
    page_b64 = {n: base64.b64encode(s.encode('utf-8')).decode('ascii') for n, s in pages.items()}
    html = SHELL.replace('__ASSETS__', json.dumps(assets)).replace('__PAGES__', json.dumps(page_b64)).replace('__NAV__', json.dumps(NAV).replace('</', '<\\/'))
    open(out, 'w', encoding='utf-8').write(html)
    print(os.path.relpath(out, ROOT), f'{len(html) / 1048576:.1f} MB', 'pages:', ', '.join(names), f'assets: {len(assets)}')


if __name__ == '__main__':
    main()
