#!/usr/bin/env python3
"""Build the reset page: ONE page, sections in order, no version factory.
  {{A:file}}   -> data: URI of ../src/assets/file
  {{CSS:path}} / {{JS:path}} -> file contents (path relative to owl/final)
  {{SECTIONS}} -> every section folder reset/sections/NN-name/ in order: each vK.html is one switchable version
                  (an inert <template class="rv">), each bK.html an untouched record (<template class="rb">), and
                  versions.json names them and sets the default (the best). A small script stamps the chosen
                  version of each section (?<section id>=K, else the default) before anything else runs.
  {{LOGO}}     -> the Owl logo inlined, its two fills mapped to palette tokens (shape untouched)
"""
import base64, glob, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__)); FINAL = os.path.dirname(HERE); ASSETS = os.path.join(FINAL, 'src', 'assets')
OUT = os.path.join(FINAL, 'owl-reset.html')
MIME = {'.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.png': 'image/png'}
cache = {}
def asset(n):
    if n not in cache:
        cache[n] = 'data:%s;base64,%s' % (MIME.get(os.path.splitext(n)[1], 'application/octet-stream'), base64.b64encode(open(os.path.join(ASSETS, n), 'rb').read()).decode())
    return cache[n]
def read(p): return open(os.path.join(FINAL, p), encoding='utf-8').read()
def balanced(f, body):
    bare = re.sub(r'<script>.*?</script>|<style>.*?</style>', '', body, flags=re.S)
    for t in ('div', 'section'):
        o, c = len(re.findall(r'<' + t + r'\b', bare)), len(re.findall(r'</' + t + '>', bare))
        if o != c: sys.exit('unbalanced <%s> in %s: %d/%d' % (t, os.path.basename(f), o, c))
def esc(t): return t.replace('&', '&amp;').replace('"', '&quot;').replace('<', '&lt;')
def sections():
    import json
    man = json.load(open(os.path.join(HERE, 'versions.json'), encoding='utf-8'))
    out = []
    for d in sorted(glob.glob(os.path.join(HERE, 'sections', '[0-9][0-9]-*'))):
        if not os.path.isdir(d): continue
        key = os.path.basename(d); m = man.get(key)
        if not m: sys.exit('versions.json has no entry for %s' % key)
        vs = sorted(glob.glob(os.path.join(d, 'v*.html')), key=lambda f: int(re.search(r'v(\d+)\.html$', f).group(1)))
        if not vs: sys.exit('no versions in %s' % key)
        sid = None
        for f in vs:
            b = open(f, encoding='utf-8').read(); balanced(f, b)
            m_id = re.search(r'<section[^>]*\bid="([^"]+)"', b)
            if not m_id: sys.exit('%s: the section needs an id' % f)
            if sid and m_id.group(1) != sid: sys.exit('%s: every version of a section keeps the same id (%s)' % (f, sid))
            sid = m_id.group(1); v = re.search(r'v(\d+)\.html$', f).group(1)
            name = m['names'].get(v)
            if not name: sys.exit('versions.json: %s has no name for v%s' % (key, v))
            out.append('<template class="rv" data-sec="%s" data-v="%s" data-def="%s" data-label="%s" data-name="%s">\n%s\n</template>' % (sid, v, m['default'], esc(m['label']), esc(name), b))
        for f in sorted(glob.glob(os.path.join(d, 'b*.html'))):
            out.append('<template class="rb" data-sec="%s" data-b="%s" data-record="untouched original, kept">\n%s\n</template>' % (sid, re.search(r'b(\d+)\.html$', f).group(1), open(f, encoding='utf-8').read()))
    return '\n'.join(out)
def logo():
    s = open(os.path.join(ASSETS, 'logo.svg'), encoding='utf-8').read()
    s = re.sub(r'<\?xml[^>]*>', '', s).replace('fill="#17111D"', 'fill="var(--logo-ink)"').replace('fill="#EAA221"', 'fill="var(--logo-acc)"')
    return s.replace('<svg ', '<svg class="logo" role="img" aria-label="Owl Roofing" ', 1)
def resolve(t, d=0):
    if d > 4: return t
    t = t.replace('{{SECTIONS}}', sections()) if '{{SECTIONS}}' in t else t
    t = t.replace('{{LOGO}}', logo())
    t = re.sub(r'\{\{CSS:([^}]+)\}\}', lambda m: resolve(read(m.group(1)), d + 1), t)
    t = re.sub(r'\{\{JS:([^}]+)\}\}', lambda m: resolve(read(m.group(1)), d + 1), t)
    t = re.sub(r'\{\{A:([^}]+)\}\}', lambda m: asset(m.group(1)), t)
    return t
def build_raw():
    html = resolve(read('reset/template.html'))
    left = re.findall(r'\{\{[A-Z]+[:}][^}]*\}?\}', html)
    if left: sys.exit('unresolved: %s' % left[:5])
    return html
if __name__ == '__main__':
    # the reset workbench page (the new sections alone); the finished homepage is built by ../build_home.py
    html = build_raw()
    open(OUT, 'w', encoding='utf-8').write(html)
    print('wrote %s (%.2f MB)' % (OUT, os.path.getsize(OUT) / 1e6))
    sys.path.insert(0, FINAL)
    import build_home
    build_home.main()
