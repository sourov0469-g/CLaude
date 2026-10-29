"""Shared page parts for the Austin Pro concept site. Facts come from FACTS.md / harvested JSON only."""
import json, html, os

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.join(os.path.dirname(HERE), 'site')
W = os.path.join(os.path.dirname(HERE), 'work', 'data') + '/'
NEAR = json.load(open(W + 'near.json'))
HOME_PAIRS = json.load(open(W + 'pairs.json'))
SVC_PAIRS = json.load(open(W + 'svcpairs.json'))
PHOTOS = json.load(open(W + 'photos.json'))
REVIEWS = json.load(open(W + 'reviews.json'))
LIVE = 'https://www.austinprosiding.com'
PHONE = '(512) 550-0000'
TEL = 'tel:+15125500000'
e = html.escape

TRADES = [  # documented (homepage list), priced n, middle half lo-hi ($k), median band
    dict(slug='siding', name='Siding', doc=431, n=415, lo=5, hi=20, med=(10, 15), href='siding.html', note='James Hardie Elite Preferred'),
    dict(slug='windows', name='Windows', doc=388, n=376, lo=5, hi=25, med=(10, 15), href='windows.html', note='NT Windows, Simonton, Andersen, Pella'),
    dict(slug='shingle-roofing', name='Shingle roofing', doc=210, n=204, lo=5, hi=20, med=(10, 15), note='GAF Master Elite'),
    dict(slug='exterior-painting', name='Exterior painting', doc=320, n=317, lo=2, hi=10, med=(2, 5), note='Sherwin-Williams'),
    dict(slug='gutters', name='Gutters', doc=121, n=109, lo=0, hi=5, med=(2, 5), note='', lolabel='Under $5k'),
    dict(slug='doors', name='Exterior doors', doc=109, n=96, lo=2, hi=10, med=(2, 5), note='Pella, Provia, NT Windows'),
    dict(slug='garage-doors', name='Garage doors', doc=9, n=6, lo=2, hi=10, med=(2, 5), note='DoorLink'),
    dict(slug='patio-covers', name='Patio covers', doc=34, n=33, lo=10, hi=30, med=(15, 20), note='Renaissance Patio'),
    dict(slug='metal-roofing', name='Metal roofing', doc=31, n=29, lo=15, hi=40, med=(20, 25), note='McElroy Metal'),
    dict(slug='decking', name='Decking', doc=None, n=5, lo=15, hi=50, med=(20, 25), note='Composite and wood'),
]


def pmt(P, apr, n):
    if apr == 0:
        return P / n
    r = apr / 12
    return P * r / (1 - (1 + r) ** -n)


def mo_range(med):
    return '$%d–$%d' % (round(pmt(med[0] * 1000, .0799, 120)), round(pmt(med[1] * 1000, .0799, 120)))


SPRITE = '''<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
<symbol id="i-star" viewBox="0 0 20 20"><path fill="currentColor" d="M10 1.6l2.47 5.3 5.8.62-4.32 3.93 1.2 5.7L10 14.3l-5.15 2.85 1.2-5.7L1.73 7.52l5.8-.62z"/></symbol>
<symbol id="i-ext" viewBox="0 0 12 12"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M4 2h6v6M10 2L2.5 9.5"/></symbol>
<symbol id="i-chev" viewBox="0 0 10 10"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M1.5 3.5L5 7l3.5-3.5"/></symbol>
<symbol id="i-v" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M6 7.5L10 3.5l4 4M6 12.5l4 4 4-4"/></symbol>
<symbol id="i-h" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M9 6l-6 6 6 6M15 6l6 6-6 6"/></symbol>
<symbol id="i-x" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M4 4l12 12M16 4L4 16"/></symbol>
<symbol id="i-plus" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M10 3v14M3 10h14"/></symbol>
<symbol id="i-phone" viewBox="0 0 20 20"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M6.5 2.5l2 4-1.6 1.3a9.5 9.5 0 0 0 5.3 5.3l1.3-1.6 4 2-.8 3.4c-.2.6-.7 1-1.4 1A14.6 14.6 0 0 1 2.1 4.9c0-.7.4-1.2 1-1.4z"/></symbol>
<symbol id="i-play" viewBox="0 0 20 20"><path fill="currentColor" d="M6 4l10 6-10 6z"/></symbol>
</svg>'''


def stars():
    return '<span class="stars" aria-hidden="true">' + ''.join('<svg><use href="#i-star"/></svg>' for _ in range(5)) + '</span>'


def ext_link(href, text, cls='tlink'):
    return f'<a class="{cls} ext" href="{href}" target="_blank" rel="noopener">{text}<svg aria-hidden="true"><use href="#i-ext"/></svg><span class="sr-only"> (opens austinprosiding.com in a new tab)</span></a>'


def head(title, desc, extra_ld=''):
    ld = {
        "@context": "https://schema.org",
        "@type": ["HomeAndConstructionBusiness", "RoofingContractor"],
        "name": "Austin Pro Siding, Windows & Roofing",
        "alternateName": "Austin Pro",
        "url": LIVE + "/",
        "telephone": "+1-512-550-0000",
        "email": "info@austinprosiding.com",
        "foundingDate": "2009",
        "address": {"@type": "PostalAddress", "streetAddress": "7801 N Lamar Blvd Suite C70", "addressLocality": "Austin", "addressRegion": "TX", "postalCode": "78752", "addressCountry": "US"},
        "geo": {"@type": "GeoCoordinates", "latitude": 30.3452401, "longitude": -97.7124366},
        "openingHoursSpecification": [
            {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "20:00"},
            {"@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "08:00", "closes": "18:00"},
            {"@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "12:00", "closes": "17:00"}],
        "aggregateRating": {"@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "474", "bestRating": "5"},
        "areaServed": ["Austin", "Round Rock", "Cedar Park", "Leander", "Pflugerville", "Georgetown", "Lakeway", "Kyle", "Buda"],
    }
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="robots" content="noindex">
<meta name="theme-color" content="#EDECE6">
<link rel="icon" href="assets/img/favicon.png">
<link rel="preload" href="assets/fonts/MonaSans-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>{extra_ld}
</head>
'''


def mega():
    rows = []
    for t in TRADES:
        href = t.get('href') or f'plan.html#trade-{t["slug"]}'
        count = f'{t["doc"]} documented projects' if t['doc'] else f'{t["n"]} priced projects'
        note = f'<span>{e(t["note"])}</span>' if t['note'] else ''
        rows.append(f'<a href="{href}"><span class="mega-name">{t["name"]}</span><span class="mega-med">${t["med"][0]}k–${t["med"][1]}k</span><span class="mega-meta"><span>{count}</span>{note}</span></a>')
    rows.append('<a href="about.html#storm"><span class="mega-name">Storm damage</span><span class="mega-med">Free</span><span class="mega-meta">Hail and wind damage, inspected and documented</span></a>')
    return f'''<div class="mega" id="mega-services">
  <div class="mega-panel">
    <div><p class="mega-head">Eleven exterior trades. The right column is each trade's median priced job.</p><div class="mega-ledger">{''.join(rows)}</div></div>
    <a class="mega-feature" href="plan.html#studio">
      <img src="assets/img/studio/base-760.webp" alt="" width="760" height="475" loading="lazy">
      <span class="h4">Repaint a real Austin Pro house</span>
      <span class="cap">Their published Sherwin-Williams and ColorPlus colours, on the Rob Roy job, in your browser.</span>
    </a>
  </div>
</div>'''


def header(active=''):
    def a(href, label, key):
        cur = ' aria-current="page"' if key == active else ''
        return f'<a href="{href}"{cur}>{label}</a>'
    sheet_trades = ''.join(
        f'<a href="{t.get("href") or "plan.html#trade-" + t["slug"]}">{t["name"]}<span>${t["med"][0]}k–${t["med"][1]}k</span></a>' for t in TRADES)
    return f'''<body>
{SPRITE}
<a class="skip" href="#main">Skip to content</a>
<div class="scroll-prog" aria-hidden="true"></div>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="index.html" aria-label="Austin Pro Siding, Windows &amp; Roofing, home"><img src="assets/img/logo-color.png" alt="Austin Pro Siding, Windows, Roofing, Patio Covers" width="1080" height="262"></a>
    <nav class="nav" aria-label="Main">
      <div class="mega-wrap"><button type="button" aria-expanded="false" aria-controls="mega-services">Services<svg class="chev" aria-hidden="true"><use href="#i-chev"/></svg></button>{mega()}</div>
      {a('siding.html', 'Siding', 'siding')}
      {a('windows.html', 'Windows', 'windows')}
      {a('projects.html', 'Projects', 'projects')}
      {a('plan.html', 'Plan &amp; price', 'plan')}
      {a('about.html', 'About', 'about')}
    </nav>
    <div class="head-actions">
      <a class="head-phone" href="{TEL}">{PHONE}</a>
      <a class="btn btn-primary btn-sm" href="#book" data-book>Book a free inspection</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="sheet">Menu</button>
    </div>
  </div>
</header>
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-label="Menu">
  <div class="sheet-top"><img src="assets/img/logo-color.png" alt="" width="1080" height="262" style="height:28px;width:auto"><button class="btn btn-line btn-sm sheet-close" type="button">Close</button></div>
  <div class="sheet-body">
    <nav class="sheet-nav" aria-label="Menu">
      <a href="index.html">Home</a><a href="siding.html">Siding</a><a href="windows.html">Windows</a><a href="projects.html">Projects</a><a href="plan.html">Plan &amp; price</a><a href="about.html">About &amp; contact</a>
    </nav>
    <div class="sheet-sub"><h2>Every trade, median priced job</h2>{sheet_trades}</div>
    <div class="sheet-sub"><h2>Talk to the office</h2><a href="{TEL}">Call {PHONE}<span>Mon–Fri 8–8</span></a></div>
  </div>
</div>
'''


def booking_section(title='Book your free inspection', sub=None):
    trades = ['Siding', 'Windows', 'Shingle roofing', 'Metal roofing', 'Exterior doors', 'Garage doors', 'Gutters', 'Patio covers', 'Exterior painting', 'Decking', 'Storm damage']
    chips = ''.join(f'<label class="opt"><input type="checkbox" name="trade" value="{t}"><span>{t}</span></label>' for t in trades)
    bands = ['Under $5k', '$5k–$10k', '$10k–$15k', '$15k–$20k', '$20k or more', 'Not sure yet']
    radios = ''.join(f'<label class="opt"><input type="radio" name="budget" value="{b}"><span>{b}</span></label>' for b in bands)
    sub = sub or 'Pick a time online in about a minute, or call the office. Either way it is free, and there is no obligation.'
    return f'''<section class="section" id="book" aria-labelledby="book-h">
  <div class="wrap book">
    <div class="book-aside">
      <h2 class="h2" id="book-h" data-split>{title}</h2>
      <p class="body-m">{sub}</p>
      <ol class="next-steps">
        <li>You tell us what you are thinking about, here or on the phone.</li>
        <li>We inspect, measure and photograph what we find. Estimate visits usually take 30 to 60 minutes.</li>
        <li>You get the scope, materials and price in writing. Free, no obligation.</li>
      </ol>
      <div>
        <a class="big-phone" href="{TEL}">{PHONE}</a>
        <p class="hours">Monday–Friday 8 AM–8 PM, Saturday 8 AM–6 PM, Sunday noon–5 PM. Office: 7801 N Lamar Blvd, Suite C70, Austin, TX 78752.</p>
      </div>
    </div>
    <div class="form-card">
      <form class="booking" action="#" method="post" aria-label="Request a free inspection">
        <div class="form-body">
          <div class="steps-ind" aria-live="polite"><span>Step <b>01/03</b></span><span class="steps-bar" aria-hidden="true"><i></i></span></div>
          <div class="form-summary" tabindex="-1"><h3>Things to fix</h3><ul></ul></div>
          <fieldset class="fstep is-current">
            <legend>What is the project?</legend>
            <p class="help">Pick every part of the house you want looked at. One inspection covers them all.</p>
            <div class="opts">{chips}</div>
            <p class="err step-err" tabindex="-1" hidden style="color:var(--signal-ink);font-size:.875rem;margin:12px 0 0;font-weight:520">Pick at least one so the right person comes out.</p>
          </fieldset>
          <fieldset class="fstep">
            <legend>Roughly what budget?</legend>
            <p class="help">The bands are the ones Austin Pro publishes from its own priced jobs. "Not sure" is a fine answer.</p>
            <div class="opts">{radios}</div>
            <p class="err step-err" tabindex="-1" hidden style="color:var(--signal-ink);font-size:.875rem;margin:12px 0 0;font-weight:520">Pick a band, or "Not sure yet".</p>
          </fieldset>
          <fieldset class="fstep">
            <legend>Where should we call you?</legend>
            <div class="row2">
              <div class="field"><input id="f-name" name="name" autocomplete="given-name" placeholder=" " required aria-describedby="f-name-e" data-msg-missing="Add your first name so we know who to ask for."><label for="f-name">First name</label><p class="err" id="f-name-e">Add your first name so we know who to ask for.</p></div>
              <div class="field"><input id="f-zip" name="zip" inputmode="numeric" pattern="[0-9]{{5}}" autocomplete="postal-code" placeholder=" " required aria-describedby="f-zip-e" data-msg-missing="Add your ZIP code." data-msg-pattern="ZIP codes have 5 digits, like 78752."><label for="f-zip">ZIP code</label><p class="err" id="f-zip-e">Add your ZIP code.</p></div>
            </div>
            <div class="field"><input id="f-tel" name="phone" type="tel" autocomplete="tel" placeholder=" " pattern="\\(\\d{{3}}\\) \\d{{3}}-\\d{{4}}" required aria-describedby="f-tel-e" data-msg-missing="Add a phone number for the call back." data-msg-pattern="Phone numbers have 10 digits, like (512) 550-0000."><label for="f-tel">Phone</label><p class="err" id="f-tel-e">Add a phone number for the call back.</p></div>
            <div class="field"><textarea id="f-note" name="note" placeholder=" "></textarea><label for="f-note">Anything we should know? (optional)</label></div>
          </fieldset>
          <div class="form-nav">
            <button class="back" type="button" hidden>Back</button>
            <button class="btn btn-dark btn-next" type="button">Continue</button>
            <button class="btn btn-primary prog-btn" type="submit" hidden><span class="lbl">Request my inspection</span><svg viewBox="0 0 70 70" aria-hidden="true"><path class="ring" d="M35,2.5A32.5,32.5 0 1,1 34.99,2.5"/><path class="tick" d="M23,36l8,8 16-17"/></svg></button>
          </div>
        </div>
        <div class="form-done" tabindex="-1" role="status">
          <h3>Thanks, <span class="done-name">there</span>.</h3>
          <p>The office will call you back to put the inspection on the calendar: Monday–Friday 8 AM–8 PM, Saturday 8 AM–6 PM, Sunday noon–5 PM. Prefer to talk now? <a class="tlink" href="{TEL}">Call {PHONE}</a>.</p>
          <p class="concept-note">Concept site: this form is a working prototype and sends nothing.</p>
        </div>
      </form>
    </div>
  </div>
</section>'''


def dialog():
    return '''<dialog class="book-dialog" id="book-dialog" aria-label="Book a free inspection">
  <div class="dialog-inner"><button class="dialog-close" type="button" aria-label="Close"><svg aria-hidden="true"><use href="#i-x"/></svg></button><div class="form-card"></div></div>
</dialog>'''


def footer(scripts=('data.js',)):
    svc = ''.join(f'<li><a href="{t.get("href") or "plan.html#trade-" + t["slug"]}">{t["name"]}</a></li>' for t in TRADES) + '<li><a href="about.html#storm">Storm damage</a></li>'
    brands = [('James Hardie', 431), ('Sherwin-Williams', 320), ('NT Windows', 251), ('GAF', 200), ('Pella', 72), ('Simonton', 55), ('Andersen', 42), ('Provia', 39), ('Renaissance Patio', 34), ('McElroy Metal', 31), ('Owens Corning', 10), ('DoorLink', 9)]
    br = ''.join(f'<li><a href="about.html#brands">{b}<small>{n}</small></a></li>' for b, n in brands)
    areas = ['Austin', 'Round Rock', 'Cedar Park', 'Pflugerville', 'Leander', 'Georgetown', 'Lakeway', 'Buda', 'Kyle']
    ar = ''.join(f'<li><a href="about.html#areas">{a}</a></li>' for a in areas) + '<li><a href="about.html#areas">All 36 communities</a></li>'
    js = ''.join(f'<script src="assets/js/{s}"></script>' for s in scripts)
    return f'''<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        <img src="assets/img/logo-white.webp" alt="Austin Pro Siding, Windows, Roofing, Patio Covers" width="500" height="122">
        <p>Exterior contractor in Austin since 2009. 886 documented projects, priced in public.</p>
        <p><a href="{TEL}">{PHONE}</a><br><a href="mailto:info@austinprosiding.com">info@austinprosiding.com</a><br>7801 N Lamar Blvd, Suite C70<br>Austin, TX 78752</p>
        <p>Mon–Fri 8 AM–8 PM<br>Sat 8 AM–6 PM<br>Sun noon–5 PM</p>
      </div>
      <div><h2>Services</h2><ul>{svc}</ul></div>
      <div><h2>Brands, by documented projects</h2><ul>{br}</ul></div>
      <div><h2>Where we work</h2><ul>{ar}</ul><h2 style="margin-top:24px">Site</h2><ul><li><a href="projects.html">Projects</a></li><li><a href="plan.html">Plan &amp; price</a></li><li><a href="about.html">About &amp; contact</a></li></ul></div>
    </div>
    <div class="foot-bottom">
      <span>Concept redesign for a design portfolio. Not affiliated with or endorsed by Austin Pro Siding, Windows &amp; Roofing. Every figure, photo and colour comes from austinprosiding.com, read 29 Oct 2026.</span>
      <span>Financing on approved credit through GreenSky. Prices are materials and labour before discounts, excluding tax.</span>
    </div>
  </div>
</footer>
<div class="mbar" aria-label="Quick actions"><a class="btn btn-primary" href="#book" data-book>Book free inspection</a><a class="btn btn-line" href="{TEL}"><svg class="ico" aria-hidden="true"><use href="#i-phone"/></svg>Call</a></div>
{dialog()}
<script src="assets/js/gsap.min.js" defer></script>
<script src="assets/js/ScrollTrigger.min.js" defer></script>
{js.replace('<script ', '<script defer ')}
<script src="assets/js/site.js" defer></script>
</body>
</html>'''


# ---------------- components ----------------

def axis(ticks=(0, 10, 20, 30, 40, 50)):
    return '<div class="axis-row" aria-hidden="true">' + ''.join(f'<span style="left:{t / 50 * 100:.0f}%">{"$" + str(t) + "k" if t else "$0"}</span>' for t in ticks) + '</div>'


def ledger(intro=True):
    rows = []
    for t in TRADES:
        lo, hi = t['lo'], t['hi']
        l, w = lo / 50 * 100, (hi - lo) / 50 * 100
        ml, mw = t['med'][0] / 50 * 100, (t['med'][1] - t['med'][0]) / 50 * 100
        mid = t.get('lolabel') or f'${lo}k–${hi}k'
        href = t.get('href') or f'plan.html#trade-{t["slug"]}'
        label = f'{t["name"]}: middle half of {t["n"]} priced jobs {mid}, median band ${t["med"][0]}k–${t["med"][1]}k'
        grid = ''.join(f'<i style="left:{g}%"></i>' for g in (0, 20, 40, 60, 80, 100))
        rows.append(f'''<a class="ledger-row" href="{href}" id="trade-{t['slug']}" aria-label="{e(label)}">
  <span class="ledger-name">{t['name']}<small>{e(t['note']) if t['note'] else 'Middle half ' + mid}</small></span>
  <span class="ledger-n">{t['n']} priced</span>
  <span class="track" aria-hidden="true"><span class="track-grid">{grid}</span><span class="track-mid" style="left:{l:.1f}%;width:{w:.1f}%"></span><span class="track-med" style="left:{ml:.1f}%;width:{mw:.1f}%"></span></span>
  <span class="ledger-med">${t['med'][0]}k–${t['med'][1]}k</span>
  <span class="ledger-mo">≈ {mo_range(t['med'])}/mo*</span>
</a>''')
    return f'''<p class="ledger-scale-m">Bars run from $0 to $50k, gridlines every $10k. The dark block is the band holding the median job.</p>
<div class="ledger" role="list">
  <div class="ledger-head" aria-hidden="true"><span>Trade</span><span>Jobs</span><span>Where the middle half landed, $0–$50k</span><span>Median job</span><span>Per month*</span></div>
  <div class="ledger-axis" aria-hidden="true"><span></span><span></span>{axis()}<span></span><span></span></div>
  {''.join(rows)}
</div>
<div class="ledger-key"><span><i></i>Middle half of priced jobs</span><span><i class="k-med"></i>Band holding the median job</span></div>'''


MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']


def pair_list(keys):
    out = []
    for key in keys:
        if key == 'home':
            for i, p in enumerate(HOME_PAIRS):
                out.append(dict(id=f'home{i}', place=p['p'], when=p['w'], product=p['i'], band=p['b'], bandl=p['bl'], trade=p['t'], href=LIVE + '/recent-projects/' + p['s'], balt=p['ba'], aalt=p['aa']))
        else:
            for i, p in enumerate(SVC_PAIRS[key]):
                out.append(dict(id=f'{key}{i}', place=p['place'], when=p['when'], product=p['installed'], band=p['band'], bandl=p['bl'], trade='Siding' if key == 'siding' else 'Windows', href=LIVE + p['href'], balt=p['before']['alt'], aalt=p['after']['alt']))
    return out


def img_set(pid, side):
    base = f'assets/img/pairs/{pid}{side}'
    return f'{base}-1280.webp', f'{base}-720.webp 720w, {base}-1280.webp 1280w'


def pairs(keys, first=0, title_id='pairs-h', head=''):
    plist = pair_list(keys)
    trades = {}
    for p in plist:
        trades[p['trade']] = trades.get(p['trade'], 0) + 1
    chips = f'<button class="chip" type="button" data-f="all" aria-pressed="true">All<span>{len(plist)}</span></button>' + ''.join(
        f'<button class="chip" type="button" data-f="{e(t)}" aria-pressed="false">{e(t)}<span>{n}</span></button>' for t, n in trades.items()) if len(trades) > 1 else ''
    p0 = plist[first]
    b_src, b_set = img_set(p0['id'], 'b')
    a_src, a_set = img_set(p0['id'], 'a')
    picks = []
    for k, p in enumerate(plist):
        bs, bset = img_set(p['id'], 'b')
        as_, aset = img_set(p['id'], 'a')
        thumb = f'assets/img/pairs/{p["id"]}a-720.webp'
        picks.append(f'''<button class="pick" type="button" aria-pressed="{'true' if k == first else 'false'}" data-trade="{e(p['trade'])}"
 data-b="{bs}" data-bset="{bset}" data-a="{as_}" data-aset="{aset}" data-balt="{e(p['balt'])}" data-aalt="{e(p['aalt'])}"
 data-place="{e(p['place'])}" data-when="{e(p['when'])}" data-product="{e(p['product'])}" data-band="{e(p['band'])}" data-bandl="{e(p['bandl'])}" data-href="{e(p['href'])}">
  <img src="{thumb}" alt="" width="720" height="450" loading="lazy"><span>{e(p['place'].split(',')[0])}<small>{e(p['trade'])}, {e(p['when'])}</small><b>{e(p['band'])}</b></span></button>''')
    return f'''<div class="pairs{' has-head' if head else ''}" data-pairs>
  <div class="pairs-stage">
    {('<div class="filters" role="group" aria-label="Filter by trade">' + chips + '</div>') if chips else ''}
    <figure class="compare" style="margin:0">
      <img class="c-before" src="{b_src}" srcset="{b_set}" sizes="(max-width: 960px) 100vw, 62vw" alt="{e(p0['balt'])}" width="1280" height="800" loading="lazy">
      <img class="c-after" src="{a_src}" srcset="{a_set}" sizes="(max-width: 960px) 100vw, 62vw" alt="{e(p0['aalt'])}" width="1280" height="800" loading="lazy">
      <img class="c-lens" src="{b_src}" alt="" aria-hidden="true">
      <span class="c-lensbox" aria-hidden="true"><span>Before</span></span>
      <span class="frame-tag tag-before">Before</span><span class="frame-tag tag-after">After</span>
      <span class="c-divider" aria-hidden="true"></span>
      <button class="c-handle" type="button" role="slider" aria-label="Compare before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><svg aria-hidden="true"><use href="#i-h"/></svg></button>
      <span class="pair-price"><small>{e(p0['bandl'])}</small><b>{e(p0['band'])}</b></span>
    </figure>
    <p class="compare-hint"><span class="touch-hint">Drag the handle or tap the photo to compare.</span><span class="lens-hint">Drag the handle to compare, or rest the pointer on the photo: the square shows the other half of the job through it.</span></p>
  </div>
  <div class="pairs-side">
    {head}
    <dl class="pair-facts">
      <div><dt>Where</dt><dd data-k="place">{e(p0['place'])}</dd></div>
      <div><dt>Finished</dt><dd data-k="when">{e(p0['when'])}</dd></div>
      <div><dt>Installed</dt><dd data-k="product">{e(p0['product'])}</dd></div>
      <div><dt data-k="bandl">{e(p0['bandl'])}</dt><dd data-k="band" class="num">{e(p0['band'])}</dd></div>
    </dl>
    <p class="cap">Bands are the job's own worksheet amount for that trade, before discounts. Photos come from the job file, cropped to the same frame.</p>
    <div class="pair-picks">{''.join(picks)}</div>
  </div>
</div>'''


def hist(key, label):
    from build_data_facts import HIST
    H = HIST[key]
    mx = max(c for _, c in H['bands'])
    top = 120 if mx > 100 else 100
    bars, xs = [], []
    for i, (b, c) in enumerate(H['bands']):
        cls = 'hbar' + (' is-median' if i == H['median'] else '') + (' is-mid' if H['mid'][0] <= i <= H['mid'][1] and i != H['median'] else '')
        bars.append(f'<button type="button" class="{cls}" style="--h:{c / top * 100:.1f}%" aria-label="{e(b)}: {c} of {H["n"]} jobs"><b>{c}</b><i></i></button>')
        xs.append(f'<span>{e(b.replace("Under ", "<"))}</span>')
    grid = ''.join(f'<span class="hist-gridline" style="bottom:{g / top * 100:.1f}%"><span>{g}</span></span>' for g in range(0, top + 1, 40 if top > 100 else 25) if g)
    rows = ''.join(f'<tr><td>{e(b)}</td><td>{c}</td></tr>' for b, c in H['bands'])
    return f'''<div class="hist" data-hist="{key}">
  <div class="hist-plot" role="group" aria-label="{e(label)}">{grid}{''.join(bars)}</div>
  <div class="hist-x" aria-hidden="true">{''.join(xs)}</div>
  <div class="hist-key"><span><i style="background:var(--ink)"></i>Median band</span><span><i style="background:var(--mid)"></i>Rest of the middle half</span><span><i style="background:var(--stone)"></i>Other bands</span></div>
  <div class="hist-readout" aria-live="polite">Point at or tap a bar to see how many jobs landed there.</div>
  <details class="tableview"><summary>Show as a table</summary><table class="data-table"><thead><tr><th>Price band</th><th>Jobs</th></tr></thead><tbody>{rows}</tbody></table></details>
</div>'''


def map_section(full=False, heading='312 dots. Each one is a documented job.'):
    pts = []
    city = {}
    for p in NEAR['p']:
        x, y, ym, bits, ci, pi, ph, pidx = p
        if ph == 1 and 0 <= x <= 566 and 0 <= y <= 640:
            place = NEAR['pl'][pi] if pi >= 0 else NEAR['ct'][ci]
            pts.append((x, y, ym, bits, place))
            c = NEAR['ct'][ci].strip().title()
            city[c] = city.get(c, 0) + 1
    assert len(pts) == 312
    pins = ''.join(f'<circle class="map-pin" cx="{x}" cy="{y}" r="3.4" data-m="{ym}" data-t="{b}" data-place="{e(pl)}"/>' for x, y, ym, b, pl in sorted(pts, key=lambda q: q[2]))
    grat = '<path class="map-grat" d="M0 603.2H566M0 488.6H566M0 374.0H566M0 259.4H566M0 144.7H566M0 30.1H566M49.4 0V640M148.3 0V640M247.3 0V640M346.2 0V640M445.1 0V640M544.1 0V640"/>'
    lat = ''.join(f'<text class="map-label" x="8" y="{y - 6}">{t}</text>' for y, t in [(488.6, '30.0°N'), (374.0, '30.2°N'), (259.4, '30.4°N'), (144.7, '30.6°N')])
    lon = ''.join(f'<text class="map-label" x="{x + 6}" y="630">{t}</text>' for x, t in [(148.3, '98.2°W'), (247.3, '98.0°W'), (346.2, '97.8°W'), (445.1, '97.6°W')])
    hx, hy = NEAR['hq']
    top = sorted(city.items(), key=lambda kv: -kv[1])[:3]
    # label positions from the firm's map plates (percent of frame)
    plate_pos = {'Austin': (62.81, 47.63), 'Round Rock': (69.91, 30.34), 'Pflugerville': (77.01, 35.16)}
    plates = ''
    for c, n in top:
        if c in plate_pos:
            px, py = plate_pos[c]
            X, Y = px / 100 * 566, py / 100 * 640
            anchor = 'end' if c == 'Austin' else 'start'
            dx = -12 if c == 'Austin' else 12
            plates += f'<text class="map-label map-label-strong" x="{X + dx:.0f}" y="{Y + 4:.0f}" text-anchor="{anchor}">{c} {n}</text>'
    scale = f'<g transform="translate(456 600)"><path d="M0 0h{NEAR["ppm"] * 10:.0f}" stroke="#EDECE6" stroke-width="2"/><path d="M0 -5v10M{NEAR["ppm"] * 10:.0f} -5v10" stroke="#EDECE6" stroke-width="1.5"/><text class="map-label" x="0" y="-10">10 mi</text></g>'
    office = f'<rect class="map-hq" x="{hx - 5.5}" y="{hy - 5.5}" width="11" height="11"/><text class="map-label" x="{hx + 12}" y="{hy + 18}">Office, N Lamar</text>'
    chips_def = [('All', -1), ('Siding', 1), ('Windows', 2), ('Roofing', 12), ('Painting', 16), ('Doors', 192), ('Gutters', 32), ('Patio covers', 256)]
    chips = ''
    for name, mask in chips_def:
        n = len(pts) if mask < 0 else sum(1 for p in pts if p[3] & mask)
        chips += f'<button class="chip" type="button" data-trade="{mask}" aria-pressed="{"true" if mask < 0 else "false"}">{name}<span>{n}</span></button>'
    first_m, last_m = min(p[2] for p in pts), max(p[2] for p in pts)
    finder = '''<div class="finder">
        <label for="near-in">Your neighbourhood or town</label>
        <input id="near-in" type="text" autocomplete="off" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="near-list" placeholder="Try Milwood, Circle C Ranch, Round Rock">
        <ul class="finder-list" id="near-list" role="listbox" hidden></ul>
      </div>
      <div class="cap" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">Try <button class="chip" type="button" data-try="Round Rock">Round Rock</button><button class="chip" type="button" data-try="Cedar Park">Cedar Park</button><button class="chip" type="button" data-try="Milwood">Milwood</button></div>
      <div class="near-out" aria-live="polite"></div>'''
    return f'''<section class="map-sec dark" id="map" data-map aria-labelledby="map-h">
  <div class="wrap mapgrid">
    <div class="map-controls">
      <h2 class="h2" id="map-h" data-split>{heading}</h2>
      <p class="body-m">Each dot is a documented project with photos, placed near the home, never on it. Scrub the dates to watch the file fill up.</p>
      <div><span class="map-count num" data-map-count>312</span> <span class="label">projects shown, <span class="map-when" data-map-when>all dates</span></span></div>
      <div class="filters" role="group" aria-label="Filter the map by trade">{chips}</div>
      <div class="scrub">
        <label class="label" for="map-range">Documented through</label>
        <div class="scrub-row"><button class="btn btn-line btn-sm" type="button" data-map-play aria-pressed="false"><svg class="ico" aria-hidden="true"><use href="#i-play"/></svg><span>Play 2022 to now</span></button>
        <input class="range" id="map-range" type="range" min="0" max="1" step="1" value="1"></div>
      </div>
      {finder if full else ''}
    </div>
    <figure class="map-figure" style="margin:0">
      <svg class="map-svg" viewBox="0 0 566 640" role="img" aria-labelledby="map-t" aria-describedby="map-cap">
        <title id="map-t">Map of the 312 photographed, documented Austin Pro projects in this frame of Central Texas. Most are in Austin ({city.get('Austin', 0)}), Round Rock ({city.get('Round Rock', 0)}) and Pflugerville ({city.get('Pflugerville', 0)}).</title>
        {grat}{lat}{lon}<g>{pins}</g>{office}{plates}{scale}<circle class="map-ring" cx="0" cy="0" r="0" style="display:none"/>
      </svg>
      <div class="map-tip" hidden></div>
    </figure>
    <p class="map-caption" id="map-cap">312 photographed projects are drawn here. 574 more documented projects are counted but sit outside this frame, have no recorded location or have no photos published yet. 312 + 574 = 886. Data: the project finder file published on austinprosiding.com.</p>
  </div>
</section>'''


CREW = [
    ('Kevin', 9, 'Kevin was wonderful in helping me make some decisions about the project.', 'Lala Matthews'),
    ('Garrett', 8, 'Also special shout out to Garrett who finished up and also swept the pollen off my deck! I did not expect that extra touch.', 'Katie Littleton'),
    ('Tracy', 4, 'Tracy provided us with a great, no pressure estimate along with a comprehensive package of info that detailed the entire process.', 'David McPherson'),
    ('Paul Hale', 3, 'Paul Hale came out and explained the process, the windows and the costs.', 'LOIS RICHWINE'),
]

BADGES = [
    ('hardie-elite-preferred.webp', 'James Hardie Elite Preferred', "The top tier of James Hardie's contractor alliance. James Hardie audits it, and it has to be re-earned. 431 documented Hardie projects."),
    ('gaf-master-elite.webp', 'GAF Master Elite', "GAF's top designation for roofing contractors; GAF says fewer than 2% of contractors nationwide hold it. 200 documented GAF roofs."),
    ('hardie-presidents-club-2025.webp', "James Hardie President's Club, 2025", "James Hardie honoured Austin Pro with its President's Club Award for 2025."),
    ('andersen-certified-premier.webp', 'Andersen Certified Contractor, Premier', 'Certified at the Premier level for Andersen windows and doors.'),
    ('guildmaster-service-excellence.webp', 'GuildQuality Guildmaster', "GuildQuality surveys customers after their projects; the award recognises service excellence in those surveys."),
    ('bbb-a-plus.webp', 'BBB Accredited, A+', 'An accredited business with the Better Business Bureau, rated A+.'),
    ('nextdoor-fave-2025.webp', 'Nextdoor Neighborhood Fave, 2025', "Neighbours' recommendations on Nextdoor made Austin Pro a 2025 Neighborhood Fave."),
]


def people(limit_badges=7):
    crew = ''.join(f'''<li data-dir><div class="crew-name">{n}<small>named in {c} of the 30 reviews on the firm's reviews page</small></div>
  <blockquote><p>“{e(q)}”</p><cite>{e(who)}, Google review, 2026</cite></blockquote></li>''' for n, c, q, who in CREW)
    badges = ''.join(f'<li><img src="assets/img/{f}" alt="" width="72" height="48" loading="lazy"><div><b>{e(t)}</b><span>{e(d)}</span></div></li>' for f, t, d in BADGES[:limit_badges])
    return f'''<div class="people">
  <div>
    <div class="rating-big"><b>4.9</b><span>{stars()}<br><span class="label">474 Google reviews</span></span></div>
    <h3 class="h3" style="margin-bottom:var(--s5)">The names homeowners write down</h3>
    <ul class="crew">{crew}</ul>
    <p class="cap" style="margin-top:var(--s4)">Counts are from the 30 review excerpts published on austinprosiding.com/reviews. Paul Hale and Paul Schantz are counted separately. {ext_link('https://www.google.com/maps/place/?q=place_id:ChIJg1S9mOQrW4YREI2DIL1kcy0', 'Read all 474 on Google')}</p>
  </div>
  <div>
    <h3 class="h3" style="margin-bottom:var(--s5)">What each badge takes</h3>
    <ul class="badges">{badges}</ul>
  </div>
</div>'''


OFFERS = '''<div class="offers">
      <p class="offers-head"><b>Holiday Savings: 10% off every exterior project</b>, through November 30.</p>
      <ul>
        <li><span>Hometown Heroes</span><b>+5%</b><small>Veterans and active military, teachers, seniors, first responders. All year.</small></li>
        <li><span>Pay in full</span><b>+10%</b><small>Cash, check or ACH. All year; not with financing.</small></li>
      </ul>
      <p class="cap">All three stack to 25%. The firm's own example: a $30,000 project saves $7,500 and costs $22,500.</p>
    </div>'''


def money(full=False, head='', offers=False):
    plans = [(0, 24, '0% APR', 'for 24 months', ''), (.0499, 60, '4.99% APR', 'for 60 months', ''), (.0799, 120, '7.99% APR', 'for 120 months', 'Lowest monthly payment')]
    pl = ''.join(f'''<div class="plan{' is-low' if flag else ''}" data-plan data-apr="{apr}" data-n="{n}"><span class="apr">{a}</span><span class="term">{t}</span>{f'<span class="flag">{flag}</span>' if flag else ''}<span class="pay"><span>{"$%.2f" % pmt(15000, apr, n)}</span> <small>/mo</small></span></div>''' for apr, n, a, t, flag in plans)
    stack = ''
    if full:
        stack = '''<div data-stack style="margin-top:var(--s7)">
      <h3 class="h4" style="margin-bottom:8px">Discounts, stacked the way the firm publishes them</h3>
      <p class="body-m" style="margin-bottom:var(--s4)">Holiday Savings, 10% off every exterior project, runs through November 30. Two discounts run all year and stack on top.</p>
      <div class="opts" style="margin-bottom:var(--s4)">
        <label class="opt"><input type="checkbox" id="stack-heroes"><span>Hometown Heroes, +5% (veterans, military, teachers, seniors, first responders)</span></label>
        <label class="opt"><input type="checkbox" id="stack-full"><span>Pay in full by cash, check or ACH, +10%</span></label>
      </div>
      <div class="stack"><div><b data-stack-pct>10%</b><span>Total discount</span></div><div><b data-stack-save>$1,500</b><span>You save</span></div><div><b data-stack-price>$13,500</b><span>Your price</span></div></div>
      <p class="fineprint">Pay in Full applies to cash, check and ACH only; financed projects keep Holiday Savings and Hometown Heroes. An example on the amount above; your real price comes from your free inspection.</p>
    </div>'''
    return f'''<div class="money" data-money>
  <div class="money-side">
    {head}
    <div class="amount">
      <label class="label" for="amt">Project amount</label>
      <output for="amt" class="num">$15,000</output>
      <input class="range light-range" id="amt" type="range" min="2000" max="50000" step="500" value="15000">
      <p class="cap">At $15,000 the 120-month plan is $181.91 a month: the example Austin Pro prints on its own site, recomputed here.</p>
    </div>
  </div>
  <div>
    <div class="plans">{pl}</div>
    <p class="fineprint">Estimated monthly payments assume the amount is financed in full with no down payment. For example, $15,000 at 7.99% APR for 120 months is 120 monthly payments of $181.91. Other plans: 0% APR for 24 months or 4.99% APR for 60 months. All plans on approved credit; not everyone qualifies. Your rate, term and payment depend on your credit, the plan you choose and your final price. No prepayment penalty.</p>
    {stack}
    {OFFERS if offers else ''}
  </div>
</div>'''
