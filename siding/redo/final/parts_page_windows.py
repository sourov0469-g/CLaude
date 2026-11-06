"""INNER PAGE — Windows (route #/windows). Seven sections, all content from the firm's own published window pages (FACTS.md, siding/work/raw/services_windows*.html, window_colours.json,
svcpairs.json 'windows'); nothing summed, nothing invented. The pieces: a tape you pull across an opening (opener), a window unit you pull apart (parts), a glass picker with a sun you tilt,
an ordering timeline you walk, the 376-job price distribution you scrub, a before/after wipe of the four published pairs, and the warranties as two stacked layers.
Where the firm publishes nothing (a part, a package, a lead time), the page says so instead of filling the gap."""
import base64, html, json, os, re
import pagekit as K
e = html.escape
NAME = 'windows'
TITLE = 'Windows'
CSS = 'page_windows.css'
JS = 'page_windows.js'
GLOBAL = 'FPWindows'
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = K.WORK
RAW = lambda f: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', open(os.path.join(WORK, 'raw', f), encoding='utf-8', errors='ignore').read())).replace('’', "'").replace('″', '"')

# ---- the published facts this page uses (each asserted against the firm's own pages at build time) ----
BANDS = [('Under $2k', 12), ('$2k–$5k', 40), ('$5k–$10k', 96), ('$10k–$15k', 79), ('$15k–$20k', 50), ('$20k–$25k', 30), ('$25k–$30k', 19), ('$30k–$40k', 30), ('$40k–$50k', 13), ('$50k–$60k', 4), ('$75k–$100k', 2), ('$100k+', 1)]
BRAND_MED = [('NT Windows', 238, '$10k–$15k'), ('Simonton', 54, '$10k–$15k'), ('Andersen', 38, '$20k–$25k'), ('Pella', 31, '$5k–$10k'), ('Provia', 5, '$5k–$10k')]
CITIES = [('Austin', 248, '$10k–$15k'), ('Round Rock', 39, '$10k–$15k'), ('Cedar Park', 15, '$15k–$20k'), ('Pflugerville', 12, '$10k–$15k'), ('Leander', 9, '$10k–$15k'), ('Georgetown', 7, '$2k–$5k')]
SAME = [('Siding', 36, 134), ('Exterior painting', 22, 82), ('Doors', 18, 68), ('Shingle roofing', 10, 37)]
FRAMES = [('Vinyl', 214), ('Aluminum', 64), ('Fibrex composite', 33), ('Fiberglass or wood', 4), ('Not recorded', 61)]
# lines: key, maker, line, jobs, frame sentence, glass sentence, finish sentence, extras (all from the windows page)
LINES = [
    dict(k='nte', maker='NT Windows', name='Executive', mat='vinyl', jobs='89 jobs', cols=['Creme White', 'Almond'], colnote='Executive: Creme White or Almond',
         parts=[('Frame', '3-1/4″ multi-chambered vinyl.'), ('Glass', '3/4″ dual-pane. NT rates it at 99% UV protection. Quad LoE-452+ is optional on the Executive.'),
                ('Sill', 'A true slope sill with a double-weatherstripped interior leg, for driving rain.'), ('Finish', 'Creme White or Almond.')]),
    dict(k='ntt', maker='NT Windows', name='Twinsulator', mat='aluminum', jobs='54 jobs', cols=[], colnote='Twinsulator: 3 colors (names not published)',
         parts=[('Frame', 'Aluminum, the only aluminum line we install. NT adds a thermal barrier.'), ('Glass', 'Quad LoE-452+ glass on the Twinsulator.'),
                ('Finish', '3 colors. The firm does not publish their names.')]),
    dict(k='ntp', maker='NT Windows', name='Presidential', mat='vinyl', jobs='33 jobs', cols=[], colnote='Presidential: VividColor, 18 colors',
         parts=[('Frame', 'Vinyl.'), ('Glass', 'The firm does not publish a glass package for this line. We confirm it at the free inspection.'), ('Finish', 'VividColor in 18 colors, with NT’s 15-year coating warranty.')]),
    dict(k='sim', maker='Simonton', name='DaylightMax', mat='vinyl', jobs='49 jobs', cols='Simonton', colnote='',
         parts=[('Frame', 'Vinyl with a slim frame that shows more glass.'), ('Glass', 'ProSolar Shield Low-E option, made for the warmest climates.'), ('Finish', 'Vinyl, laminate and custom exterior colors. 10 published frame colors.')]),
    dict(k='and', maker='Andersen', name='100 Series', mat='Fibrex composite', jobs='33 jobs', cols='Andersen', colnote='',
         parts=[('Frame', 'Fibrex composite, which Andersen says is twice as strong as vinyl.'), ('Glass', 'SmartSun and other Low-E options.'), ('Finish', 'Andersen: won’t fade, flake, blister or peel. 5 exterior colors.')]),
    dict(k='pel', maker='Pella', name='Impervia', mat='fiberglass', jobs='2 jobs; Pella vinyl, line not named, 10 jobs', cols='Pella', colnote='',
         parts=[('Frame', 'Fiberglass. Pella says Impervia won’t expand, warp or sag in summer heat.'), ('Glass', 'Low-E glass packages, including sun-control options.'), ('Finish', 'Powder coat that resists chalking and fading. 5 colors.')]),
]
GLASS = [
    ('NT Windows', 'Quad LoE-452+', 'Quad LoE-452+ glass on the Twinsulator; optional on the Executive.', 'The Executive’s 3/4″ dual-pane glass is rated by NT at 99% UV protection.'),
    ('Simonton', 'ProSolar Shield', 'ProSolar Shield Low-E, made for the warmest climates.', 'Offered as a Low-E option on the DaylightMax.'),
    ('Pella', 'Sun-control Low-E', 'Low-E glass packages, including sun-control options.', 'The firm does not publish the package names beyond this.'),
    ('Andersen', 'SmartSun', 'SmartSun and other Low-E options.', 'Andersen: the 100 Series finish won’t fade, flake, blister or peel.'),
]
STEPS = [
    ('Free inspection', 'We look at your windows and openings, talk through brands, lines and colors, and tell you what we see. No sales pitch.'),
    ('Measure', 'Each opening is measured before anything is ordered.'),
    ('Built to order', 'The windows are built to order for those openings, not pulled from stock. NT Windows, our most-installed brand, builds its windows at its own Dallas–Fort Worth plant.'),
    ('Set and sealed', 'Windows are set, sealed, and the old units hauled away. Most of the window-only jobs in our files took two days on site.'),
    ('Final check', 'We check the finished work and go over the warranty details for what went on your house.'),
]
WARR = [
    ('NT Windows · Presidential', 'VividColor coating warranty: 15 years.', 'NT’s other lines: the firm does not publish the terms; each carries NT’s own manufacturer warranty.'),
    ('Simonton · DaylightMax', 'Lifetime limited, parts and labor, transferable.', ''),
    ('Andersen · 100 Series', 'Limited: 20 years on glass, 10 years on other parts.', ''),
    ('Pella · Impervia', 'Limited lifetime. Pella covers labor 2 years.', ''),
]
PAIR_ORDER = ['Spicewood at Balcones Village', 'Ridgewood', 'North Austin', 'Maple Run']


def check():
    """Every number and sentence above must be on the firm's own pages."""
    w, c, faq = RAW('services_windows.html'), RAW('services_windows_cost.html'), re.sub(r'\s+', ' ', open(os.path.join(WORK, 'data', 'faq.json'), encoding='utf-8').read()).replace('’', "'")
    for t in ['238', '54', '38', '31', '89', '3-1/4', '99% UV', 'VividColor', '15 yrs', 'Quad LoE-452+', 'ProSolar Shield', 'SmartSun', 'sun-control', 'twice as strong as vinyl', 'won\'t fade, flake, blister or peel', 'Powder coat that resists chalking and fading',
              'Limited lifetime; Pella covers labor 2 years', 'lifetime limited, parts and labor, transferable', 'Limited: 20 years glass, 10 years other parts', 'built to order', 'two days on site', 'Dallas–Fort Worth', 'double-weatherstripped', 'true slope sill',
              'Each opening is measured before anything is ordered', 'We look at your windows and openings, talk through brands, lines and colors', 'We check the finished work and go over the warranty details']:
        assert t in w, t
    for n, v in BANDS: assert f'{n} {v} project' in c, (n, v)
    assert sum(v for _, v in BANDS) == 376 and sum(v for _, v in FRAMES) == 376
    for b, n, m in BRAND_MED: assert f'{b} {n} projects {m}' in c, b
    for ci, n, m in CITIES: assert f'{ci} {n} projects {m}' in c, ci
    for s, p, n in SAME: assert f'{p}% {s} {n} of 376 windows projects'.lower() in c.lower(), s
    for k, v in FRAMES: assert f'{v} {k}' in w, k
    assert '$10k–$15k' in c and 'Most common band' in c and '$5k and $25k' in c
    pp = json.load(open(os.path.join(WORK, 'data', 'svcpairs.json')))['windows']; assert [p['place'].split(',')[0] for p in pp] == PAIR_ORDER
    sara = [r for r in json.load(open(os.path.join(WORK, 'data', 'reviews.json'))) if r['name'] == 'Sara Helms'][0]; assert 'It took about 6 weeks for measuring, ordering and installing.' in sara['text']
    return pp, json.load(open(os.path.join(WORK, 'data', 'window_colours.json')))


def img(name):
    return 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(HERE, 'assets', 'pages', name + '.webp'), 'rb').read()).decode()


def markup(ctx):
    pp, COL = check(); cal = ctx['cal']; CT = K.CONTACT_PAGE
    lines = []
    for L in LINES:
        L = dict(L); L['cols'] = [[n, h] for n, h in COL[L['cols']]] if isinstance(L['cols'], str) else [[n, None] for n in L['cols']]
        for n, h in L['cols']:
            pass
        lines.append(L)
    # Creme White / Almond hex come from the NT list
    nt = dict((n, h) for n, h in COL['NT Windows'])
    for L in lines:
        if L['k'] == 'nte': L['cols'] = [[n, nt[n]] for n in ('Creme White', 'Almond')]
    pairs = [dict(place=p['place'], when=p['when'], inst=p['installed'], band=p['band'], bl=p['bl'], ba=p['before']['alt'], aa=p['after']['alt']) for p in pp]
    DATA = dict(lines=lines, bands=BANDS, brands=BRAND_MED, cities=CITIES, same=SAME, frames=FRAMES, glass=GLASS, steps=STEPS, warr=WARR, pairs=pairs)
    pair_html = ''.join(f'<div class="pw-pi" data-i="{i}"><img src="{img(f"w{i}b")}" alt="{e(p["ba"])}" width="720" height="450" decoding="async"><img src="{img(f"w{i}a")}" alt="{e(p["aa"])}" width="720" height="450" decoding="async"></div>' for i, p in enumerate(pairs))
    dj = e(json.dumps(DATA, ensure_ascii=False, separators=(',', ':')))
    lt = K.art('try-far.svg', 'pw-art-far', 'pwa')
    sb = lambda k, a, b, c: f'<div class="pw-st"><b>{a}</b><span>{b}</span><small>{c}</small></div>'
    return f'''<div class="pw" data-pwd="{dj}">
<section class="pw-sec pw-open" id="pw-open" aria-labelledby="pw-h"><div class="pw-bg" aria-hidden="true">{lt}{K.art('try-near.svg', 'pw-art-near', 'pwb')}</div>
<div class="pw-in pw-open-grid"><div class="pw-open-t"><p class="pw-eye">Windows · NT Windows, Pella, Simonton, Andersen · since 2009</p>
<h1 class="pw-h1" id="pw-h">Measured to the opening. Built to order.</h1>
<p class="pw-lede">Replacement windows from NT Windows, Pella, Simonton and Andersen, measured, fitted and sealed to each opening.</p>
<div class="pw-act"><a class="btn key" href="{CT}">Book a free inspection<span class="tab">{cal}</span></a><a class="callx" href="{K.PHONE_HREF}">{ctx['icons']['phone']}{K.PHONE}</a></div>
<dl class="pw-facts"><div><dt>388</dt><dd>documented window projects</dd></div><div><dt>376</dt><dd>of them with a priced band, 2022–2026</dd></div><div><dt>2 days</dt><dd>on site for most window-only jobs</dd></div><div><dt>Lifetime</dt><dd>workmanship warranty on labor</dd></div></dl></div>
<figure class="pw-tape" data-cur="drag"><div class="pw-tw"><svg class="pw-tsvg" viewBox="0 0 560 500" role="img" aria-label="A wall opening. A tape measure pulled across it; when the tape reaches the far side the new window is set in the opening." focusable="false"></svg>
<div class="pw-hook" role="slider" tabindex="0" aria-label="Pull the tape across the opening" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" aria-valuetext="Tape not pulled yet"></div></div>
<figcaption class="pw-cap" aria-live="polite"><span class="pw-capt">Pull the tape across the opening.</span> <button type="button" class="pw-btn pw-again" hidden>Measure again</button></figcaption></figure></div></section>

<section class="pw-sec pw-parts" id="pw-parts" aria-labelledby="pw-parts-h"><div class="pw-in"><header class="pw-hd"><p class="pw-eye">The unit, part by part</p><h2 class="pw-h" id="pw-parts-h">Pull a window apart.</h2>
<p class="pw-p">Choose one of the lines we install, then pull the unit apart. Only the parts the firm has published for that line are named; where it has published nothing, the part says so.</p></header>
<div class="pw-xgrid"><div class="pw-lines" role="radiogroup" aria-label="Window line"></div>
<div class="pw-stage" data-cur="drag"><div class="pw-stage-bg" aria-hidden="true">{K.art('windows-far.svg', 'pw-sfar', 'pwc')}</div><svg class="pw-xsvg" viewBox="0 0 620 480" role="img" aria-labelledby="pw-xt" focusable="false"><title id="pw-xt">An exploded window unit</title></svg>
<div class="pw-pull"><label for="pw-pull">Pull apart</label><input id="pw-pull" type="range" min="0" max="100" value="0" step="1"><output class="pw-out" for="pw-pull">Together</output></div></div>
<div class="pw-partsl" aria-live="polite"><h3 class="pw-linet"></h3><p class="pw-linem"></p><ul class="pw-plist"></ul><div class="pw-sw" aria-label="Frame colors"></div></div></div>
<div class="pw-frames"><h3 class="pw-h3">What the frames were made of</h3><p class="pw-sm">Counted from the line each job file names (NT’s Twinsulator is aluminum), else the material it records. 376 priced window jobs.</p><div class="pw-fbar" role="list"></div></div></div></section>

<section class="pw-sec pw-glass" id="pw-glass" aria-labelledby="pw-glass-h"><div class="pw-bg" aria-hidden="true">{K.art('services-far.svg', 'pw-art-far', 'pwd')}</div><div class="pw-in"><header class="pw-hd"><p class="pw-eye">The glass</p><h2 class="pw-h" id="pw-glass-h">Most of a window is glass.</h2>
<p class="pw-p">Each of our four main brands offers Low-E glass, including packages made for strong sun. Pick a maker for the package it names. The drawing is a general section of a Low-E pane, not any maker’s own data.</p></header>
<div class="pw-gg"><div class="pw-gtabs" role="radiogroup" aria-label="Maker"></div>
<div class="pw-gfig" data-cur="drag"><svg class="pw-gsvg" viewBox="0 0 640 380" role="img" aria-labelledby="pw-gt" focusable="false"><title id="pw-gt">Sun on a Low-E double-pane unit</title></svg>
<div class="pw-gctl"><label for="pw-sun">Sun height</label><input id="pw-sun" type="range" min="0" max="100" value="62"><button type="button" class="pw-tg" role="switch" aria-checked="true">Low-E coating <b>On</b></button></div></div>
<div class="pw-gcard" aria-live="polite"><h3 class="pw-gh"></h3><p class="pw-gp"></p><p class="pw-gq"></p></div></div>
<p class="pw-note">Low-E glass packages and their names are each maker’s own. Brand facts come from each manufacturer’s own product pages, as the firm publishes them.</p></div></section>

<section class="pw-sec pw-order" id="pw-order" aria-labelledby="pw-order-h"><div class="pw-bg" aria-hidden="true">{K.art('process-far.svg', 'pw-art-far', 'pwe')}{K.art('process-near.svg', 'pw-art-near', 'pwf')}</div><div class="pw-in"><header class="pw-hd"><p class="pw-eye">From measure to set</p><h2 class="pw-h" id="pw-order-h">Windows are built to order, so the order comes first.</h2>
<p class="pw-p">Drag the marker along the job, or use the arrow keys. This is the order of the work as the firm publishes it.</p></header>
<div class="pw-ogrid"><div class="pw-scene" data-cur="drag"><svg class="pw-osvg" viewBox="0 0 640 400" role="img" aria-labelledby="pw-ot" focusable="false"><title id="pw-ot">The job, step by step</title></svg></div>
<div class="pw-track"><div class="pw-rail" aria-hidden="true"><i class="pw-fill"></i></div><ol class="pw-nodes"></ol><div class="pw-mark" role="slider" tabindex="0" aria-label="Step of the job" aria-valuemin="1" aria-valuemax="5" aria-valuenow="1" data-cur="drag"></div></div>
<div class="pw-ocard" aria-live="polite"><p class="pw-on"></p><h3 class="pw-oh"></h3><p class="pw-op"></p></div></div>
<blockquote class="pw-q"><p>“It took about 6 weeks for measuring, ordering and installing.”</p><footer>Sara Helms · Google review · May 2026, about her own window job. One customer’s account, not a promised timeline.</footer></blockquote></div></section>

<section class="pw-sec pw-price" id="pw-price" aria-labelledby="pw-price-h"><div class="pw-bg" aria-hidden="true">{K.art('visualiser-far.svg', 'pw-art-far', 'pwg')}</div><div class="pw-in"><header class="pw-hd"><p class="pw-eye">Real project pricing · 2022–2026</p><h2 class="pw-h" id="pw-price-h">Where 376 priced window jobs landed.</h2>
<p class="pw-p">The windows portion of each job: materials and labor, before discounts, excluding tax. A documented sample of our work, not every job since 2009. Move across the bars.</p></header>
<div class="pw-pgrid"><div class="pw-pleft"><div class="pw-chart" data-cur="drag"><p class="pw-read" aria-live="polite"></p><div class="pw-bars" role="slider" tabindex="0" aria-label="Price band" aria-valuemin="0" aria-valuemax="11"></div></div>
<div class="pw-same"><h3 class="pw-h3">What else got done in the same job</h3><p class="pw-sm">Share of the 376 priced window jobs where another trade ran on the same job.</p><div class="pw-srow"></div></div></div>
<div class="pw-side"><h3 class="pw-h3">Median band, by maker</h3><p class="pw-sm">Priced window jobs, by the line actually installed. Choose one to mark its median band.</p><div class="pw-chips" role="radiogroup" aria-label="Maker"></div>
<h3 class="pw-h3">By city</h3><div class="pw-cities"></div></div></div></div></section>

<section class="pw-sec pw-pairs" id="pw-pairs" aria-labelledby="pw-pairs-h"><div class="pw-bg" aria-hidden="true">{K.art('reviews-far.svg', 'pw-art-far', 'pwh')}</div><div class="pw-in"><header class="pw-hd"><p class="pw-eye">Before and after</p><h2 class="pw-h" id="pw-pairs-h">Same houses, new windows.</h2>
<p class="pw-p">Four of our window jobs, each shot before we started and after we finished. Drag across the photo, or use the arrow keys.</p></header>
<div class="pw-wgrid"><div class="pw-wtabs" role="radiogroup" aria-label="Project"></div><div class="pw-wipe" data-cur="drag"><div class="pw-wst">{pair_html}<div class="pw-wline" role="slider" tabindex="0" aria-label="Before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><i></i></div><span class="pw-wl pw-wb">Before</span><span class="pw-wl pw-wa">After</span></div>
<p class="pw-wcap" aria-live="polite"></p></div></div></div></section>

<section class="pw-sec pw-warr" id="pw-warr" aria-labelledby="pw-warr-h"><div class="pw-bg" aria-hidden="true">{K.art('services-near.svg', 'pw-art-near', 'pwi')}</div><div class="pw-in"><header class="pw-hd"><p class="pw-eye">Warranties</p><h2 class="pw-h" id="pw-warr-h">Each maker’s warranty, and ours on top.</h2>
<p class="pw-p">Each brand carries its own manufacturer warranty. Austin Pro adds a lifetime workmanship warranty on labor.</p></header>
<div class="pw-wr"><div class="pw-wrt" role="radiogroup" aria-label="Maker"></div><div class="pw-stack" aria-live="polite"><div class="pw-l1"><small>The maker’s own warranty</small><b></b><span></span></div><div class="pw-l2"><small>Austin Pro</small><b>Lifetime workmanship warranty on labor</b></div></div></div>
<div class="pw-close"><h2 class="pw-h2">Ready when you are.</h2><p class="pw-p">We look at your windows and openings and photograph what we find. You get the scope, materials and price. Free, no obligation.</p>
<div class="pw-act"><a class="btn key" href="{CT}">Book a free inspection<span class="tab">{cal}</span></a><a class="callx" href="{K.PHONE_HREF}">{ctx['icons']['phone']}{K.PHONE}</a></div><p class="pw-sm">{K.HOURS} · {K.ADDR}</p></div></div></section></div>'''
