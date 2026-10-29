import re, json, base64, hashlib, html
F = '/home/user/CLaude/siding/homepage-standalone.html'
h = open(F, encoding='utf-8').read()
assets = json.loads(re.search(r'<script type="application/json" id="ap-assets">(.*?)</script>', h, re.S).group(1))
body = re.sub(r'<script type="application/json" id="ap-assets">.*?</script>', '', h, flags=re.S)
body = re.sub(r'<style>.*?</style>', '', body, flags=re.S)
scripts = re.findall(r'<script>(.*?)</script>', body, re.S)
markup = re.sub(r'<script>.*?</script>', '', body, flags=re.S)
text = html.unescape(re.sub(r'<[^>]+>', ' ', re.sub(r'<script type="application/json"[^>]*>.*?</script>', ' ', markup, flags=re.S)))
out = {}
# 1. facts
out['review_counts'] = sorted(set(re.sub(r'\s+', ' ', m) for m in re.findall(r'\b[\d,]+\+?\s+(?:\w+\s+){0,2}(?:reviews?|excerpts?|testimonials?)\b', text, re.I)))
out['n_of_m'] = sorted(set(re.findall(r'\b\d+\s+of\s+\d+\b', text)))
out['jsonld_reviewCount'] = re.findall(r'"reviewCount":\s*(\d+)', markup)
out['address_variants'] = sorted(set(re.findall(r'7801[^<"]{0,60}', markup)))
out['hours_variants'] = sorted(set(re.findall(r'Monday[^<"]{0,48}', markup + ' '.join(scripts))))
out['886_split'] = sorted(set(re.findall(r'312[^<]{0,60}574[^<]{0,40}886|312 \+ 574 = 886', text)))[:3]
# per version: a contact path (booking button) must carry the phone link in the same version
tpl = re.findall(r'<template data-v="(\d)">(.*?)</template>', markup, re.S)
secs = re.findall(r'<section class="sec sec-(\w+)"', markup)
k7 = []
i = 0
for sec in secs:
    for n in range(3):
        v, t = tpl[i]; i += 1
        has_cta = bool(re.search(r'data-book|class="btn btn-red|b1-open|bk-send|snt-send', t))
        has_tel = 'href="tel:+15125500000"' in t
        k7.append(f'{sec}{v}:{"cta" if has_cta else "-"}/{"tel" if has_tel else "NO-TEL"}')
out['k7_contact_paths'] = k7
out['k7_cta_without_tel'] = [x for x in k7 if 'cta/NO-TEL' in x]
# 2. logos: the embedded bytes vs the served files
for p in ['assets/img/served/65246f239b165c29151e6f9f_AP_HORIZONTAL-LOGO_COLOR-V2-p-1080.png', 'assets/img/served/AP_HORIZONTAL-LOGO_WHT-p-500.avif']:
    emb = hashlib.sha256(base64.b64decode(assets['d'][p])).hexdigest()
    disk = hashlib.sha256(open('/home/user/CLaude/siding/site/' + p, 'rb').read()).hexdigest()
    out['logo ' + p.split('/')[-1]] = f'{emb[:16]}… == {disk[:16]}… : {emb == disk}'
out['old_logo_files_left'] = [p for p in assets['d'] if 'logo-' in p]
# 3. before/after: every image shown with a "Before" alt or in a before slot must be a pair file
ba = sorted(set(re.findall(r'assets/img/(?:h/work-[\w-]+-[ab]-1000|pairs/[\w-]+)\.webp', h)))
out['pair_images'] = len(ba)
out['before_alts_from'] = sorted(set(re.findall(r'data-asrc="([^"]+)"[^>]*alt="Before', markup)))
# 4. script-referenced ids exist (in the page or in a template)
ids = set(re.findall(r'\bid="([^"]+)"', markup))
refs = set()
for sc in scripts[-3:]:
    refs |= set(re.findall(r"getElementById\('([\w-]+)'\)", sc)) | set(re.findall(r"\$\('#([\w-]+)'", sc)) | set(re.findall(r"querySelector\('#([\w-]+)'\)", sc))
out['js_id_refs'] = sorted(refs)
out['js_id_refs_missing'] = sorted(r for r in refs if r not in ids)
print(json.dumps(out, indent=1, ensure_ascii=False))
