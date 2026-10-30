"""Audit pack H.5 facts-lock self-check on the single file: reads the live stage AND every template (the deflated
ap-tpl stream, backups included), and counts the locked items. Run: python3 -I qa/v7/facts.py homepage-standalone.html"""
import base64, json, re, sys, zlib, html as H
s = open(sys.argv[1], encoding='utf-8').read()
m = re.search(r'<script type="application/octet-stream" id="ap-tpl">(.*?)</script>', s, re.S)
tpls = json.loads(zlib.decompress(base64.b64decode(m.group(1)), -15).decode())
page = re.sub(r'<script[^>]*>.*?</script>|<style>.*?</style>', ' ', s, flags=re.S)
def text(h): return H.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', h)))
order = re.findall(r'<template data-v="(\d)"( data-bk)? data-z="(\d+)">', s)
secs = re.findall(r'<section class="sec sec-(\w+)"', s)
alltext = text(page) + ' ' + ' '.join(text(t) for t in tpls)
raw = s
out = {}
out['phone (512) 550-0000 in all states'] = alltext.count('(512) 550-0000')
phones = set(re.findall(r'\(?\b\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b', alltext))
out['phone-shaped numbers other than the firm'] = sorted(p for p in phones if re.sub(r'\D', '', p) != '5125500000')
out['3-3-4 version code'] = len(re.findall(r'\b[1-8]{3} [1-8]{3} [1-8]{4}\b', raw))
out['em dashes (rendered text, all states)'] = alltext.count('—')
out['en dashes (rendered text, all states)'] = alltext.count('–')
out['"312 siding"'] = len(re.findall(r'312 siding', alltext, re.I))
k1 = '312 on the map with photos + 574 more counted'
out['K1 printed'] = alltext.count(k1)
out['hours string'] = alltext.count('Monday-Friday 8-8, Saturday 8-6, Sunday 12-5')
out["President's Club text"] = alltext.count("President's Club")
out['"Half of them" sentences'] = alltext.count('Half of them')
out['"Request saved"'] = alltext.count('Request saved')
out['5,000+ occurrences'] = alltext.count('5,000+')
# reviews: 474 in every reviews state
rev = []
idx = 0
for v, bk, z in order:
    pass
# per-template checks: map template index -> section by document order of templates inside sections
tpl_sec = []
for sec in re.finditer(r'<section class="sec sec-(\w+)".*?</section>', s, re.S):
    for v, bk, z in re.findall(r'<template data-v="(\d)"( data-bk)? data-z="(\d+)">', sec.group(0)):
        tpl_sec.append((sec.group(1), v, bool(bk), int(z)))
out['reviews states without 474'] = [f'{v}{"bk" if bk else ""}' for sec, v, bk, z in tpl_sec if sec == 'reviews' and '474' not in text(tpls[z])]
out['star graphics not clipped to 98%'] = sum(1 for t in tpls + [page] for st in re.findall(r'<span class="stars[^"]*"[^>]*>(.*?)</span></span>', t) if 'st-1' not in st)
out['old 5-glyph star strips'] = sum(t.count('&#9733;&#9733;&#9733;&#9733;&#9733;') + t.count('★★★★★') for t in tpls + [page])
out['templates'] = len(tpls)
bands = {}
for t in tpls + [page]:
    for b in re.findall(r'Median \$(\d+)k-\$(\d+)k', text(t)):
        bands[b] = bands.get(b, 0) + 1
out['median bands seen'] = bands
for k, v in out.items():
    print(f'{k}: {v}')
