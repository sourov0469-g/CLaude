#!/usr/bin/env python3
"""Build the FINAL Owl homepage, owl-roofing.html (one file, one final version per section, no switcher).

  NEW  (default): src/final/ , sections src/final/sections/NN-name.html in order, on the original Owl palette.
  Every earlier version is kept as a file in past/ ; this file holds ONE version per section only.
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

PAGES = [('services', 'Roofing Services · Owl Roofing', [('svc-hero', 'services-hero'), ('svc-steps', 'services-steps')]),
         ('wise-check', 'The Wise Check · Owl Roofing', [('wise-hero', 'wise-hero'), ('wise-parts', 'wise-parts')]),
         ('about', 'About Owl Roofing · Family-owned in Shoreview', [('about-hero', 'about-hero'), ('about-values', 'about-values')])]

def pages():
    out = []
    for name, title, secs in PAGES:
        inner = []
        for sec, fn in secs:
            body = open(os.path.join(FINAL, 'src', 'final', 'pages', fn + '.html'), encoding='utf-8').read()
            bare = re.sub(r'<script>.*?</script>|<style>.*?</style>', '', body, flags=re.S)
            for tag in ('div', 'section'):
                o, c = len(re.findall(r'<' + tag + r'\b', bare)), len(re.findall(r'</' + tag + r'>', bare))
                if o != c: sys.exit('unbalanced <%s> in %s' % (tag, fn))
            inner.append('<div class="ver" data-sec="%s" data-v="1">\n%s\n</div>' % (sec, body))
        out.append('<div class="page" data-page="%s" data-title="%s" hidden>\n%s\n{{P:ctaband.html}}\n</div>' % (name, title, '\n'.join(inner)))
    return '\n'.join(out)

def main():
    pb = load('past_build', os.path.join(FINAL, 'src', 'build.py'))
    tpl = pb.read('final/template.html').replace('{{FINAL_SECTIONS}}', sections()).replace('{{FINAL_FOOTER}}', sections(True)).replace('{{FINAL_PAGES}}', pages())
    new = pb.resolve(tpl)
    # the old shared form helper handed forms to the visitor's email app: removed from this file (owner rule: forms never leave the page)
    new, n = re.subn(r"OWL\.bookForm = function\(form, msg\)\{.*?\n\};\n", 'OWL.bookForm = function(){};\n', new, count=1, flags=re.S)
    if n != 1: sys.exit('old bookForm helper not found')
    left = re.findall(r'\{\{[A-Z]+:[^}]+\}\}', new)
    if left: sys.exit('unresolved placeholders: %s' % left[:5])
    html = pb.dedupe(new)
    vids = [u for u, n in collections.Counter(re.findall(r'data:video/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]{20000,}', html)).items() if n > 1]
    if vids: sys.exit('a video appears twice in the file')
    m = re.search(r'<script>window\.OWLA=\{.*?\};</script>', html, flags=re.S)
    if m:
        html = html[:m.start()] + html[m.end():]
        html = html.replace('<head>', '<head>' + m.group(0), 1)
    open(OUT, 'w', encoding='utf-8').write(html)
    print('wrote %s (%.2f MB)' % (OUT, len(html.encode()) / 1e6))

if __name__ == '__main__':
    main()
