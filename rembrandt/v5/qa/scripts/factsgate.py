# §12 items 1-2: facts and banned patterns, on the built file. Text = everything outside <script>/<style> (live versions,
# every <template> version, chrome, footer, aria-labels, alt text) plus the string literals in the bundled JS that render
# visible text. Run: python3 -I qa/scripts/factsgate.py rembrandt-homepage.html
import re, sys, html as H
src = open(sys.argv[1], encoding='utf-8').read()
scripts = re.findall(r'<script\b[^>]*>(.*?)</script>', src, re.S)
body = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', ' ', src, flags=re.S)
body = re.sub(r'data:[a-z/+.-]+;base64,[A-Za-z0-9+/=]+', 'DATAURI', body)
attrs = ' '.join(re.findall(r'(?:alt|aria-label|title|placeholder|content)="([^"]*)"', body))
text = H.unescape(re.sub(r'<[^>]+>', ' ', body) + ' ' + attrs)
js = ' '.join(scripts); js = re.sub(r'data:[a-z/+.-]+;base64,[A-Za-z0-9+/=]+', 'DATAURI', js)
both = text + ' ' + js
def n(pat, s=both, f=re.I): return len(re.findall(pat, s, f))
tpl = re.findall(r'<template id="tpl-([a-z]+)-(b?\d)">(.*?)</template>', src, re.S)
live = {}  # live version-1 markup per section: the <section data-section> minus its templates
for m in re.finditer(r'<section[^>]*data-section="([a-z]+)"[^>]*>(.*?)</section>', src, re.S): live[m.group(1)] = re.sub(r'<template.*?</template>', '', m.group(2), flags=re.S)
rows = []
def chk(name, ok, detail): rows.append((('PASS' if ok else 'FAIL'), name, detail))
P353 = r'353[\s.)-]*9711'
chk('353-9711 appears 0 times (any spacing/format)', n(P353) == 0 and n(r'9373539711') == 0, f"{n(P353)} / {n(r'9373539711')}")
chk('only one phone number: every tel: link is +19377467377', set(re.findall(r'tel:([+\d]+)', src)) == {'+19377467377'}, str(sorted(set(re.findall(r'tel:([+\d]+)', src)))))
other = [p for p in re.findall(r'\(?\b\d{3}\)?[\s.\-]\d{3}[\s.\-]\d{4}\b', text) if re.sub(r'\D', '', p) != '9377467377']
chk('no other phone-shaped number in visible text', not other, str(other[:5]))
chk('24/7 appears 0 times', n(r'24\s*/\s*7') == 0, str(n(r'24\s*/\s*7')))
chk('no emergency-hours claim', n(r'emergenc') == 0, str(n(r'emergenc')))
chk('no licence number / "licensed" claim', n(r'licen[cs]') == 0, str(n(r'licen[cs]')))
chk('"295" present', n(r'\b295\b', text) > 0, str(n(r'\b295\b', text)))
chk('"4.9" present', n(r'\b4\.9\b', text) > 0, str(n(r'\b4\.9\b', text)))
chk('no other review count (280 homeowners)', n(r'\b280\b', text) == 0, str(n(r'\b280\b', text)))
quotes = re.findall(r'[“"]([A-Z][^”"<>{}]{24,160})[”"]', text)
quotes = [q for q in quotes if not re.search(r'Bunk|RoofingContractor|schema|http', q)]
chk('invented review quotes: 0 quote-like sentences in visible text', not quotes, str(quotes[:3]))
chk('no reviewer-attribution pattern (— Name / Jane D.)', n(r'[—–-]\s?[A-Z][a-z]+ [A-Z]\.', text, 0) == 0, str(n(r'[—–-]\s?[A-Z][a-z]+ [A-Z]\.', text, 0)))
chk('no stray rating other than 4.9', not [r for r in re.findall(r'\b([1-5]\.\d)\s*(?:stars?|★)', text) if r != '4.9'], str(re.findall(r'\b([1-5]\.\d)\s*(?:stars?|★)', text)))
chk('address verbatim present', '38 N Pioneer Blvd' in text and 'OH 45066' in text, '')
# R3: the Constellation as kept lives on only as backup B1 (tpl-proof-b1, frozen by rule); its two old wordings are the one
# exemption. Every other version, the live working copy of V1 included, must say "accredited".
nob1 = re.sub(r'<template id="tpl-proof-b1">.*?</template>', ' ', body, flags=re.S)
tx = H.unescape(re.sub(r'<[^>]+>', ' ', nob1))
vis = [t for t in re.findall(r'.{0,60}BBB.{0,40}', tx) if 'accredited' not in t]
b1 = [t for t in re.findall(r'.{0,60}BBB.{0,40}', text) if 'accredited' not in t]
chk('BBB wording: every visible BBB mention says "accredited" (only backup B1, the kept Constellation, is exempt)', not vis, f"outside B1: {len(vis)}; inside B1: {len(b1) - len(vis)}")
chk('Founded 1995 / Bunk / Wade 2015 / Rachel present', all(k in text for k in ('1995', 'Bunk', 'Wade', '2015', 'Rachel')), '')
chk('Owens Corning Platinum Preferred present', 'Platinum Preferred' in text, '')
chk('$2M liability present', n(r'\$2M liability') > 0, str(n(r'\$2M liability')))
chk('no prices / % discounts / financing terms invented', n(r'\$\d{2,}[,\d]*|\b\d+%\s*off\b|\bAPR\b') == 0, str(re.findall(r'\$\d{2,}[,\d]*|\b\d+%\s*off\b|\bAPR\b', both)[:5]))
# per version contact path: every version that offers a phone path uses 746-7377; list which versions carry a tel link
per = {f'{s}1': live.get(s, '') for s in live}; per.update({f'{s}{v}': m for s, v, m in tpl})
withtel = sorted(k for k, m in per.items() if 'tel:+19377467377' in m)
bad = sorted(k for k, m in per.items() if re.search(r'tel:(?!\+19377467377)', m))
chk('every version contact path is 746-7377 (no other tel)', not bad, f"versions with their own tel link: {len(withtel)}/21 ({', '.join(withtel)}); nav, phone bar and footer carry it on every page state")
# banned patterns (§5)
chk('no "Job Ticket" string', n(r'job\s*ticket') == 0, str(n(r'job\s*ticket')))
chk('no FAQ section', n(r'\bFAQ\b|frequently asked') == 0, str(n(r'\bFAQ\b|frequently asked')))
chk('no service picker / bento services', n(r'service picker|bento|our services') == 0, str(n(r'service picker|bento|our services')))
chk('no estimate-paper / leak-story / proof-strip', n(r'estimate paper|leak story|proof[- ]strip') == 0, str(n(r'estimate paper|leak story|proof[- ]strip')))
order = re.findall(r'data-section="([a-z]+)"', src)
chk('section sequence is not the v1-v4 skeleton', order == ['hero', 'proof', 'work', 'family', 'how', 'area', 'call'], ' > '.join(order))
chk('no roof-anatomy lesson (Rule 11): no named layer lists', n(r'underlayment|drip edge|ice and water|ridge vent|starter strip', text) == 0, str(re.findall(r'underlayment|drip edge|ice and water|ridge vent|starter strip', text, re.I)[:5]))
w = max(len(r[1]) for r in rows)
for r in rows: print(f'{r[0]}  {r[1]:<{w}}  {r[2]}')
print('FAILS:', sum(r[0] == 'FAIL' for r in rows))
