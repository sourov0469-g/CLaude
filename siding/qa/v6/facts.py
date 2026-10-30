"""§12.1 facts grep, strict reading, on one packed file: python3 -I facts.py <file>"""
import re, sys, json, html
F = sys.argv[1]
h = open(F, encoding='utf-8').read()
h = re.sub(r'<script type="application/json" id="ap-assets">.*?</script>', '', h, flags=re.S)   # base64 images out
h = re.sub(r'url\("data:[^"]+"\)', 'url()', h)                                                   # data-URI font/masks out
scripts = re.findall(r'<script>(.*?)</script>', h, re.S)
own_js = '\n'.join(s for s in scripts if 'APV4' in s or 'APFX' in s or 'ap-picks' in s)
markup = re.sub(r'<script>.*?</script>', ' ', h, flags=re.S)
text = html.unescape(re.sub(r'<[^>]+>', ' ', markup))
allt = text + '\n' + own_js
out = {}
# 1a review counts: any number within 4 words either side of review/reviews/rated/testimonial, in text AND own scripts
win = re.findall(r'((?:\S+\s+){0,4}\b(?:reviews?|testimonials?|ratings?)\b(?:\s+\S+){0,4})', allt, re.I)
nums = set()
for w in win:
    for n in re.findall(r'(?<![\w.#-])(\d[\d,]*)(?![\w.%])', w):
        nums.add(n)
out['numbers_near_review'] = sorted(nums)
out['windows_with_numbers'] = sorted(set(re.sub(r'\s+', ' ', w).strip() for w in win if re.search(r'\d', w)))[:40]
out['jsonld_reviewCount'] = re.findall(r'"reviewCount":\s*"?(\d+)', markup)
# 1b phone per version
tpl = re.findall(r'<template data-v="(\d)">(.*?)</template>', markup, re.S)
secs = re.findall(r'<section class="sec sec-(\w+)"', markup)
per = {}
i = 0
for s in secs:
    for k in range(3):
        v, t = tpl[i]; i += 1
        per[f'{s}{v}'] = dict(tel_links=t.count('href="tel:+15125500000"'), phone_text=t.count('(512) 550-0000'), booking=len(re.findall(r'data-book|b1-open|bk-send|snt-send', t)))
out['phone_per_version'] = per
out['versions_without_phone'] = [k for k, v in per.items() if not v['tel_links']]
out['booking_without_phone'] = [k for k, v in per.items() if v['booking'] and not v['tel_links']]
out['chrome_phone'] = dict(header='href="tel:+15125500000"' in markup.split('<main')[0], footer='(512) 550-0000' in markup.split('</main>')[1])
# 1c 886 + split, address, hours (verbatim, and no variants)
out['886_contexts'] = sorted(set(re.sub(r'\s+', ' ', m) for m in re.findall(r'[^.\n]{0,70}\b886\b[^.\n]{0,50}', text)))[:8]
out['split_printed'] = bool(re.search(r'312\s+on the map with photos\s*\+\s*574 more counted\s*=\s*886', re.sub(r'\s+', ' ', text)))
ADDR, HRS = '7801 N Lamar Blvd Suite C70, Austin, TX 78752', 'Monday–Friday 8–8, Saturday 8–6, Sunday 12–5'
out['address_verbatim_count'] = allt.count(ADDR)
out['address_variants'] = sorted(set(re.sub(r'\s+', ' ', m) for m in re.findall(r'7801[^"<]{0,48}', allt)))
out['hours_verbatim_count'] = allt.count(HRS)
out['hours_variants'] = sorted(set(re.sub(r'\s+', ' ', m) for m in re.findall(r'(?:Mon(?:day)?|Sat(?:urday)?|Sun(?:day)?)[^"<\n]{0,40}(?:AM|PM|8–8|8-8|noon)', allt)))
# 1d established + rating
out['since_2009'] = len(re.findall(r'[Ss]ince 2009', text)); out['merged_2018'] = len(re.findall(r'merged in 2018|merged 2018|\(merged 2018\)', text))
out['rating_49'] = len(re.findall(r'4\.9', text))
# 1e credentials, §3 strings verbatim
CRED = ['GAF Master Elite', 'James Hardie Elite Preferred', "President's Club 2025", 'Andersen Certified Premier', 'GuildQuality Guildmaster', 'BBB A+']
out['credentials_verbatim'] = {c: text.replace('’', "'").count(c) for c in CRED}
out['credential_variants'] = sorted(set(re.sub(r'\s+', ' ', m) for m in re.findall(r"(?:Andersen[^.<\n]{0,40}Premier|President's Club[^.<\n]{0,15}|BBB[^.<\n]{0,20}|Guild\w*[^.<\n]{0,20})", text.replace('’', "'"))))
print(json.dumps(out, indent=1, ensure_ascii=False))
