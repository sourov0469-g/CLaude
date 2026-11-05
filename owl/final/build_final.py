#!/usr/bin/env python3
"""Build the FINAL Owl homepage, owl-roofing.html (one file, one final version per section, no switcher).

  NEW  (default): src/final/ , sections src/final/sections/NN-name.html in order, on the original Owl palette.
  PAST (records): the whole homepage as it stood before the 2026-11-05 reset (every version), kept as an inert <template>,
                  opened only with ?past. The 22-version fix build is frozen separately in past/.
"""
import os, re, sys, glob, collections, importlib.util
FINAL = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(FINAL, 'owl-roofing.html')

def load(name, path):
    spec = importlib.util.spec_from_file_location(name, path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m

def part(html, tag):
    m = re.search(r'<%s[^>]*>(.*)</%s>' % (tag, tag), html, flags=re.S)
    if not m: sys.exit('no <%s> found' % tag)
    return m.group(1)

def sections(footer=False):
    files = sorted(glob.glob(os.path.join(FINAL, 'src', 'final', 'sections', '[0-9][0-9]-*.html')))
    files = [f for f in files if (os.path.basename(f) == '11-footer.html') == footer]
    out = []
    for f in files:
        name = re.match(r'\d+-(.+)\.html$', os.path.basename(f)).group(1)
        body = open(f, encoding='utf-8').read()
        bare = re.sub(r'<script>.*?</script>|<style>.*?</style>', '', body, flags=re.S)
        for tag in ('div', 'section'):
            o, c = len(re.findall(r'<' + tag + r'\b', bare)), len(re.findall(r'</' + tag + r'>', bare))
            if o != c: sys.exit('unbalanced <%s> in %s: %d open, %d close' % (tag, os.path.basename(f), o, c))
        out.append('<div class="ver" data-sec="%s" data-v="1">\n%s\n</div>' % (name, body))
    return '\n'.join(out)

def main():
    pb = load('past_build', os.path.join(FINAL, 'src', 'build.py'))
    past = pb.build_raw()
    tpl = pb.read('final/template.html').replace('{{FINAL_SECTIONS}}', sections()).replace('{{FINAL_FOOTER}}', sections(True))
    new = pb.resolve(tpl)
    left = re.findall(r'\{\{[A-Z]+:[^}]+\}\}', new)
    if left: sys.exit('unresolved placeholders: %s' % left[:5])

    head = part(new, 'head')
    mode = '<script>(function(){document.documentElement.dataset.mode=new URLSearchParams(location.search).has("past")?"past":"new";})();</script>'
    head = head.replace('<script>', mode + '\n<script>', 1)
    past_body, new_body = part(past, 'body'), part(new, 'body')
    chip = ('<style>.pastchip{position:fixed;left:12px;bottom:12px;z-index:9999;display:inline-flex;align-items:center;min-height:44px;padding:0 16px;'
            'border-radius:999px;background:#17111D;color:#fff;font:700 14px/1 Inter,system-ui,sans-serif;text-decoration:none}</style>'
            '<a class="pastchip" href="?" aria-label="You are viewing past versions, kept as records. Back to the homepage.">Past versions · records · back to the homepage</a>')
    body = ('<body>\n<!-- PAST: every homepage version before the 2026-11-05 reset, kept as records. Open with ?past -->\n'
            '<template id="owl-past" data-record="past homepage, all versions, kept as records">\n' + past_body + '\n' + chip + '\n</template>\n'
            '<!-- FINAL homepage -->\n<template id="owl-new" data-record="final homepage">\n' + new_body + '\n</template>\n'
            '<script>(function(){var t=document.getElementById(document.documentElement.dataset.mode==="past"?"owl-past":"owl-new");'
            'document.body.appendChild(t.content.cloneNode(true));})();</script>\n</body>')
    html = '<!doctype html>\n' + re.search(r'<html[^>]*>', new).group(0) + '\n<head>' + head + '</head>\n' + body + '\n</html>\n'
    html = pb.dedupe(html)
    vids = [u for u, n in collections.Counter(re.findall(r'data:video/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{20000,}', html)).items() if n > 1]
    vstore = ''
    if vids:
        vkeys = {u: 'v%d' % i for i, u in enumerate(vids)}
        for u, k in vkeys.items():
            html = html.replace("'%s'" % u, 'OWLA["%s"]' % k).replace('"%s"' % u, 'OWLA["%s"]' % k)
        vstore = '<script>window.OWLA=window.OWLA||{};' + ''.join('OWLA.%s="%s";' % (k, u) for u, k in vkeys.items()) + '</script>'
    m = re.search(r'<script>window\.OWLA=\{.*?\};</script>', html, flags=re.S)
    if m:
        html = html[:m.start()] + html[m.end():]
        html = html.replace('<head>', '<head>' + m.group(0) + vstore, 1)
    else:
        html = html.replace('<head>', '<head>' + vstore, 1)
    open(OUT, 'w', encoding='utf-8').write(html)
    print('wrote %s (%.2f MB)' % (OUT, len(html.encode()) / 1e6))

if __name__ == '__main__':
    main()
