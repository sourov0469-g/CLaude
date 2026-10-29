"""Turn the pages read from austinprosiding.com (work/raw/*.html, finder.json) into the data files the build reads.

Run with `python3 -I harvest.py`. Nothing here is invented: every field is parsed from the firm's own markup or JSON.
"""
import html, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
RAW = os.path.join(os.path.dirname(HERE), 'work', 'raw')
OUT = os.path.join(os.path.dirname(HERE), 'work', 'data')
os.makedirs(OUT, exist_ok=True)


def raw(name):
    with open(os.path.join(RAW, name), encoding='utf-8') as f:
        return f.read()


def strip(s):
    return html.unescape(re.sub(r'<[^>]+>', '', s)).strip()


def save(name, data):
    with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=1)
    print(name, len(data))


# 1. Project finder dataset, used as published.
with open(os.path.join(RAW, 'finder.json'), encoding='utf-8') as f:
    near = json.load(f)
inframe = [p for p in near['p'] if p[6] == 1 and 0 <= p[0] <= 566 and 0 <= p[1] <= 640]
assert len(inframe) == 312, len(inframe)
save('near.json', near)

# 2. Homepage before/after pairs (#aph-pairs).
home = raw('home.html')
m = re.search(r'<script type="application/json" id="aph-pairs">(.*?)</script>', home, re.S)
pairs = json.loads(m.group(1))
assert len(pairs) == 6
save('pairs.json', pairs)

# 3. Siding and windows page pairs (#apsv-work-pairs).
svc = {}
for key, page in (('siding', 'services_siding.html'), ('windows', 'services_windows.html')):
    m = re.search(r'<script type="application/json" id="apsv-work-pairs">(.*?)</script>', raw(page), re.S)
    svc[key] = json.loads(m.group(1))
    assert len(svc[key]) == 4
save('svcpairs.json', svc)

# 4. Project photos: the homepage trade panels (caption with place and date) and the project wall.
SAN = r'https://cdn\.sanity\.io/images/tjkllgsw/production/([0-9a-f]{40}-\d+x\d+\.jpg)'
photos, seen = [], set()
for li in re.findall(r'<li class="aph-six-shot">(.*?)</li>', home, re.S):
    href = re.search(r'href="([^"]+)"', li).group(1)
    img = re.search(SAN, li).group(1)
    alt = html.unescape(re.search(r'alt="([^"]*)"', li).group(1))
    cap = re.search(r'<span class="aph-six-cap"><b>(.*?)</b><span>(.*?)</span>', li, re.S)
    where_when, trades = strip(cap.group(1)), strip(cap.group(2))
    place, _, when = where_when.rpartition(' · ')
    if img in seen:
        continue
    seen.add(img)
    photos.append(dict(img=img, href=href, alt=alt, place=place, when=when, trades=trades))
for a in re.findall(r'<a class="aph-wall-card"[^>]*>.*?</a>', home, re.S):
    href = re.search(r'href="([^"]+)"', a).group(1)
    label = html.unescape(re.search(r'aria-label="([^"]*)"', a).group(1))
    img = re.search(SAN, a).group(1)
    lm = re.match(r'(.*?) in (.*), TX \((\w{3} \d{4})\)$', label)
    if not lm or img in seen:
        continue
    seen.add(img)
    photos.append(dict(img=img, href=href, alt='', place=lm.group(2), when=lm.group(3), trades=lm.group(1)))
save('photos.json', photos)

# 5. The 30 review excerpts published on /reviews (verbatim, names as printed).
rev = raw('reviews.html')
reviews = []
for fig in re.findall(r'<figure[^>]*>(.*?)</figure>', rev, re.S):
    q = re.search(r'<blockquote[^>]*>(.*?)</blockquote>', fig, re.S)
    c = re.search(r'<figcaption[^>]*>(.*?)</figcaption>', fig, re.S)
    if not (q and c):
        continue
    who, _, src = strip(c.group(1)).partition(' · ')
    reviews.append(dict(text=strip(q.group(1)), name=who.strip(), source=src.strip()))
assert len(reviews) == 30, len(reviews)
save('reviews.json', reviews)
