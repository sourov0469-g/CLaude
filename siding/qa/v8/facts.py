"""MASTER DIRECTIVE Annex A facts check on the single file. Visible states (the live page and every non-backup
template) are checked against Annex A verbatim; backups are records and are counted separately, never edited.
Run: python3 -I qa/v8/facts.py homepage-standalone.html"""
import base64, json, re, sys, zlib, html as H
s = open(sys.argv[1], encoding='utf-8').read()
m = re.search(r'<script type="application/octet-stream" id="ap-tpl">(.*?)</script>', s, re.S)
tpls = json.loads(zlib.decompress(base64.b64decode(m.group(1)), -15).decode())
def text(h): return H.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', h)))
page = re.sub(r'<script[^>]*>.*?</script>|<style>.*?</style>|<template.*?</template>', ' ', s, flags=re.S)
tpl_sec = []
for sec in re.finditer(r'<section class="sec sec-(\w+)".*?</section>', s, re.S):
    for v, bk, z in re.findall(r'<template data-v="(\d+)"( data-bk)? data-z="(\d+)">', sec.group(0)):
        tpl_sec.append((sec.group(1), int(v), bool(bk), int(z)))
live = text(page) + ' ' + ' '.join(text(tpls[z]) for _, _, bk, z in tpl_sec if not bk)
recs = ' '.join(text(tpls[z]) for _, _, bk, z in tpl_sec if bk)
A = {'phone': '(512) 550-0000', 'address': '7801 N Lamar Blvd, Suite C70, Austin, TX 78752',
     'hours': 'Monday–Friday 8–8, Saturday 8–6, Sunday 12–5', 'K1 (886 wording)': '312 on the map with photos + 574 more counted',
     '474 Google reviews': '474', 'Since 2009': 'Since 2009', "President's Club 2025": "President's Club 2025",
     'GAF Master Elite': 'GAF Master Elite', 'James Hardie Elite Preferred': 'James Hardie Elite Preferred',
     'Andersen Certified Premier': 'Andersen Certified Premier', 'GuildQuality Guildmaster': 'Guildmaster', 'BBB A+': 'A+'}
print('== visible states (live page + visible templates) ==')
for k, v in A.items():
    print(f'{k}: {live.count(v)}')
phones = set(re.findall(r'\(?\b\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b', live))
print('phone-shaped numbers other than the firm:', sorted(p for p in phones if re.sub(r'\D', '', p) != '5125500000'))
print('"312 siding" / "574 roofing":', len(re.findall(r'312 siding|574 roofing', live, re.I)))
print('hours printed any other way:', len(re.findall(r'Monday-Friday|Mon-Fri', live)))
print('address without the Annex comma:', live.count('Lamar Blvd Suite'))
print('em dashes:', live.count('—'), '| en dashes outside the Annex hours:', live.count('–') - 4 * live.count(A['hours']))
print('reviews rating other than 4.9 next to "Google reviews":', re.findall(r'\b(?!4\.9)\d\.\d\b(?= on \d+ Google)', live))
print('review counts other than 474 next to "reviews":', sorted(set(re.findall(r'\b(?!474\b)\d{3,4}(?= (?:Google )?reviews)', live))))
bands = {}
for b in re.findall(r'\$\d+k-\$\d+k', live): bands[b] = bands.get(b, 0) + 1
print('price bands printed:', dict(sorted(bands.items())))
print('templates:', len(tpls), '| visible:', sum(1 for t in tpl_sec if not t[2]), '| backups:', sum(1 for t in tpl_sec if t[2]))
print('== backups (records, unchanged) ==')
print('phone:', recs.count('(512) 550-0000'), '| K1:', recs.count(A['K1 (886 wording)']), '| 474:', recs.count('474'))
