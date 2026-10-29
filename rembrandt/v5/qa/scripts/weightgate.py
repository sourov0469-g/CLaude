# §12 item 9 + §4 F18: total, code and media weight of the single file, media per section group, one scroll engine,
# no pinned systems, no redundant libraries. Run: python3 -I qa/scripts/weightgate.py rembrandt-homepage.html
import re, sys, gzip
src = open(sys.argv[1], encoding='utf-8').read(); raw = src.encode()
URI = re.compile(r'data:([a-z]+/[a-z0-9.+-]+);base64,[A-Za-z0-9+/=]+')
uris = [m.group(0) for m in URI.finditer(src)]
media = sum(map(len, uris)); bare = URI.sub('', src)
css = sum(len(x) for x in re.findall(r'<style[^>]*>(.*?)</style>', bare, re.S))
js = sum(len(x) for x in re.findall(r'<script\b(?![^>]*ld\+json)[^>]*>(.*?)</script>', bare, re.S))
kb = lambda n: f'{n / 1024:.0f} KB'
print(f'total file          {kb(len(raw))}  (gzip {kb(len(gzip.compress(raw)))})')
print(f'code (no data URIs) {kb(len(bare.encode()))} = markup {kb(len(bare.encode()) - css - js)} + css {kb(css)} + js {kb(js)}  (gzip {kb(len(gzip.compress(bare.encode())))})')
print(f'media (data URIs)   {kb(media)} in {len(uris)} URIs; types: ' + ', '.join(sorted({re.match(r"data:([^;]+)", u).group(1) for u in uris})))
reg = {k: len(v) for k, v in re.findall(r'"?([a-z0-9-]+)"?\s*:\s*"(data:image/[a-z]+;base64,[A-Za-z0-9+/=]+)"', src)}
for k, v in sorted(reg.items(), key=lambda kv: -kv[1]): print(f'   image {k:<14} {kb(v)}')
use = {}
for s in ['hero', 'proof', 'work', 'family', 'how', 'area', 'call']:
    m = re.search(rf'<section[^>]*data-section="{s}".*?</section>', bare, re.S); body = m.group(0) if m else ''
    use[s] = {k for k in reg if re.search(rf'data-(?:img|fill)="{re.escape(k)}"', body)}
    print(f'section {s:<7} media {kb(sum(reg[k] for k in use[s])):>7}  images {sorted(use[s])}')
other = [k for k in reg if not any(k in u for u in use.values())]
print('images used outside the sections (chrome):', other, kb(sum(reg[k] for k in other)))
font = [u for u in uris if u.startswith('data:font')]
print(f'fonts embedded: {len(font)} ({kb(sum(map(len, font)))})')
print('images shared by several sections (stored once):', sorted(k for k in reg if sum(k in u for u in use.values()) > 1))
print('section groups over 1 MB of media:', [s for s in use if sum(reg[k] for k in use[s]) > 1 << 20] or 'none')
cssall = ' '.join(re.findall(r'<style[^>]*>(.*?)</style>', bare, re.S))
print('scroll engines: lenis', 'new Lenis' in bare or 'lenis' in bare.lower(), '| locomotive', 'locomotive' in bare.lower(), '| smooth-scrollbar', 'Scrollbar.init' in bare)
print('pinned systems: ScrollTrigger pin:', len(re.findall(r'\bpin\s*:\s*(?:!0|true|[\'"#.])', bare)), '| CSS sticky selectors:', [r.strip()[-60:] for r in re.findall(r'([^{}]{1,120})\{[^{}]*position:sticky', cssall)])
print('MorphSVG in bundle:', 'MorphSVG' in bare, '| three.js:', 'THREE.' in bare, '| jQuery:', 'jQuery' in bare)
