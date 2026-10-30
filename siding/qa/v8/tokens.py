"""MASTER DIRECTIVE final gate, token check: every hex colour in the packed file, classified. UI colour must come
from the declared token set (--paper, --ink, --accent and its named shades); the record palette serves the hidden
backups only; product colours (the published Sherwin-Williams and ColorPlus paints) are content, like photographs.
Run: python3 -I qa/v8/tokens.py homepage-standalone.html"""
import base64, json, re, sys, zlib
s = open(sys.argv[1], encoding='utf-8').read()
inflate = lambda tag: json.loads(zlib.decompress(base64.b64decode(re.search(rf'<script type="application/octet-stream" id="{tag}">(.*?)</script>', s, re.S).group(1)), -15).decode())
css = re.search(r'<style>(.*?)</style>', s, re.S).group(1)
css = re.sub(r'data:[^")]+', '', css)
js = '\n'.join(inflate('ap-js'))
tpls = inflate('ap-tpl')
html = re.sub(r'<script[^>]*>.*?</script>|<style>.*?</style>', ' ', s, flags=re.S)
H = lambda t: [h.upper() for h in re.findall(r'#[0-9A-Fa-f]{6}\b', t)]
root = re.search(r':root\{(--paper:.*?)\}', css).group(1)
tokens = {h.upper(): n for n, h in re.findall(r'(--[\w-]+):\s*(#[0-9A-Fa-f]{6})', root)}
rec = re.search(r'\.sec\[data-bk="a"\]\{(--ground:\s*#F3F2EE.*?)\}', css).group(1)
record = {h.upper(): n for n, h in re.findall(r'(--[\w-]+):\s*(#[0-9A-Fa-f]{6})', rec)}
data = json.loads(re.search(r'<script type="application/json" id="home-data">(.*?)</script>', s, re.S).group(1))
product = {h.upper() for *_x, h in data.get('sw', [])} | {h.upper() for *_x, h in data.get('cp', [])}
print('Declared UI tokens:'); [print(f'  {n} {h}') for h, n in tokens.items()]
css_rest = css.replace(root, '').replace(rec, '')
stray = [h for h in H(css_rest) if h not in tokens]
print('CSS hex outside the two token blocks:', sorted(set(H(css_rest))), '-> not a token:', sorted(set(stray)))
print('Record palette (backups only):', sorted(record.items(), key=lambda x: x[1]))
js_hex = H(js)
print('JS hex:', {h: ('token ' + tokens[h]) if h in tokens else ('product' if h in product else 'OTHER') for h in sorted(set(js_hex))})
live_tpl = [t for t in tpls]
markup = H(html) + [h for t in live_tpl for h in H(t)]
cls = {}
for h in set(markup):
    cls[h] = ('token ' + tokens[h]) if h in tokens else 'product colour (published paint)' if h in product else ('record ' + record[h]) if h in record else 'OTHER'
other = {h: c for h, c in cls.items() if c == 'OTHER'}
print('Markup hex: tokens', sum(1 for c in cls.values() if c.startswith('token')), '| product colours', sum(1 for c in cls.values() if c.startswith('product')), '| record', sum(1 for c in cls.values() if c.startswith('record')), '| OTHER', other)
