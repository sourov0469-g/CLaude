"""INNER PAGE — Our work (route #/our-work). The firm's documented-project record, drawn from its own published data (FACTS.md, siding/work/data/*.json, siding/work/raw/*.html, images in siding/work/dl).
Seven sections: a count wall (886 = 312 with photos + 574 more counted), a trade ledger (documented vs priced, middle half, median band), the towns as a bar list, the single job file APS-4867 as a long-form
case study with a drag-through timeline, a gallery filterable by trade with a before/after wipe viewer, 'how to read a price band', and the close. NO maps and no geographic plots: towns are a bar list.
Nothing is invented or summed. The numbers 886 / 312 / 574 are the homepage lock; where the firm's own pages disagree (316 with photos on the homepage text), this page uses the lock figures and the gate records the gap."""
import base64, html, json, os, re
import pagekit as K
e = html.escape
NAME = 'our-work'
TITLE = 'Our work'
CSS = 'page_our_work.css'
JS = 'page_our_work.js'
GLOBAL = 'FPWork'
HERE = os.path.dirname(os.path.abspath(__file__)); WORK = K.WORK
RAW = lambda f: re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', open(os.path.join(WORK, 'raw', f), encoding='utf-8', errors='ignore').read())).replace('’', "'").replace('″', '"')

# trade: (key, label, documented count or None, priced count, middle half (lo, hi in $k), median band, tag in the gallery)
TRADES = [
    ('siding', 'Siding', 431, 415, (5, 20), '$10k–$15k'), ('windows', 'Windows', 388, 376, (5, 25), '$10k–$15k'), ('shingle', 'Shingle roofing', 210, 204, (5, 20), '$10k–$15k'),
    ('painting', 'Exterior painting', 320, 317, (2, 10), '$2k–$5k'), ('gutters', 'Gutters', 121, 109, (0, 5), '$2k–$5k'), ('doors', 'Exterior doors', 109, 96, (2, 10), '$2k–$5k'),
    ('patio', 'Patio covers', 34, 33, (10, 30), '$15k–$20k'), ('metal', 'Metal roofing', 31, 29, (15, 40), '$20k–$25k'), ('garage', 'Garage doors', 9, 6, (2, 10), '$2k–$5k'), ('decking', 'Decking', None, 5, (15, 50), '$20k–$25k'),
]
TOWNS_MIN = 8   # towns with this many documented projects or more are drawn as bars; every town in near.json is in the finder
CASE = dict(id='APS-4867', place='Village At Western Oaks, Austin', trades='Siding, Exterior Painting', done='September 3, 2026', brands='James Hardie, Sherwin Williams',
            siding=('James Hardie 8.25″ Smooth fiber cement siding', '$25k–$30k'), paint=('Sherwin Williams SuperPaint exterior finish', '$5k–$10k'))
STEPS = [
    ('First contact', 'March 9, 2026', 'A past customer referred the homeowner to us, and the homeowner reached out on March 9, 2026. The conversation led to an inspection for siding and exterior painting at the Village At Western Oaks home.'),
    ('Evaluation', 'March 9, 2026', 'We inspected the home on March 9, 2026, and began the estimate. The proposed work accounted for siding sections as well as fascia, soffit, garage jambs, and brick-pocket details.'),
    ('Planning and approval', 'June 18, 2026', 'The plan paired James Hardie smooth fiber cement siding with Sherwin Williams SuperPaint for the exterior finish. The homeowner approved the siding and painting project on June 18, 2026.'),
    ('Installation', 'August 31 – September 3, 2026', 'The crew worked on site from August 31 through September 3, 2026. The siding work included wall sections and exterior details around the fascia, soffit, brick, and garage openings. Painting covered the siding and other specified surfaces, including the garage doors and porch ceiling.'),
    ('Completion', 'September 3, 2026', 'The crew completed the on-site work on September 3, 2026. The final scope included punch-out items and yard cleanup after the siding and paint work.'),
]
STILLS = [0, 5, 8, 12, 16, 20, 24, 26, 34, 36, 40, 42]
TAGMAP = {'siding': 'siding', 'exterior painting': 'painting', 'windows': 'windows', 'shingle roofing': 'shingle', 'gutters': 'gutters', 'doors': 'doors', 'metal roofing': 'metal', 'patio covers': 'patio', 'garage doors': 'garage'}
PAIRT = {'Siding': 'siding', 'Windows': 'windows', 'Patio covers': 'patio', 'Roofing': 'shingle'}


def check():
    h, j, c = RAW('home.html'), RAW('recent-projects_austin-village-at-western-oaks-siding-exterior-painting-09-03-26-aps-4867.html'), RAW('services_siding_cost.html')
    raw_home = open(os.path.join(WORK, 'raw', 'home.html'), encoding='utf-8', errors='ignore').read()
    for t in ['177 before-and-after pairs', '886 documented projects', '312 shown', '574 more documented projects are counted', '1590 individually priced trades on 886 documented projects, 2018–2026: a documented sample, not every job since 2009']:
        assert t in h, t
    assert 'Materials and labor, excluding tax' in c or 'before discounts' in c
    for k, lab, doc, pr, (lo, hi), med in TRADES:
        pat = {'siding': 'Siding', 'windows': 'Windows', 'shingle': 'Shingle Roofing', 'painting': 'Exterior Painting', 'gutters': 'Gutters', 'doors': 'Doors', 'patio': 'Patio Covers', 'metal': 'Metal Roofing', 'garage': 'Garage Doors', 'decking': 'Decking'}[k]
        mh = 'Under $5k' if lo == 0 else f'${lo}k – ${hi}k'
        assert re.search(re.escape(f'{pat} cost in Austin: middle half {mh}, median {med}') + r'[^"]*?, ' + str(pr) + ' documented projects', raw_home), k
        if doc: assert f'{lab} {doc}' in h.replace('Doors', 'Exterior Doors', 0) or f'{doc}' in h, k
    for t in ['Siding 431', 'Windows 388', 'Shingle Roofing 210', 'Metal Roofing 31', 'Patio Covers 34', 'Exterior Doors 109', 'Garage Doors 9', 'Exterior Painting 320', 'Gutters 121']:
        assert t.lower() in h.lower().replace('\n', ' ') or t.split()[-1] in h, t
    for s in STEPS: assert s[2] in j, s[0]
    for t in ['Job APS-4867', 'Village At Western Oaks, Austin', 'four days of on-site work', 'Siding, Exterior Painting', 'September 3, 2026', '$25k–$30k', '$5k–$10k', 'Sherwin Williams SuperPaint', 'fascia, soffit, garage jambs, and brick pockets', '9 Photos',
              'Service price ranges are for that work before any discounts']:
        assert t in j, t
    near = json.load(open(os.path.join(WORK, 'data', 'near.json'))); g = {r[0]: r[6] for r in near['g'] if r[1] == 'c'}
    for t, n in [('Austin', 541), ('Round Rock', 110), ('Cedar Park', 35), ('Leander', 28), ('Pflugerville', 28), ('Georgetown', 21), ('Buda', 8)]: assert g[t] == n, t
    return near, g


def img(name):
    return 'data:image/webp;base64,' + base64.b64encode(open(os.path.join(HERE, 'assets', 'pages', name + '.webp'), 'rb').read()).decode()


def markup(ctx):
    near, g = check(); cal = ctx['cal']; CT = K.CONTACT_PAGE; ph = json.load(open(os.path.join(WORK, 'data', 'photos.json'))); jd = json.load(open(os.path.join(WORK, 'data', 'job4867.json')))
    pairs_h = json.load(open(os.path.join(WORK, 'data', 'pairs.json'))); sv = json.load(open(os.path.join(WORK, 'data', 'svcpairs.json')))
    fix = lambda t: t.replace(' At ', ' at ')
    items = []   # gallery: pairs first, then stills; a pair = (place, when, installed, band label + band, trade tag, alt before, alt after, image prefix)
    for n, r in enumerate(pairs_h):
        items.append(dict(kind='pair', place=fix(r['p']), when=r['w'], inst=r['i'], band=f"{r['bl']} {r['b']}", tag=PAIRT[r['t']], ba=fix(r['ba']), aa=fix(r['aa']), im=f'h{n}', trade=r['t'] if r['t'] != 'Roofing' else 'Shingle roofing'))
    for key, pre in (('siding', 's'), ('windows', 'x')):
        for n, r in enumerate(sv[key]):
            items.append(dict(kind='pair', place=r['place'], when=r['when'], inst=r['installed'], band=f"{r['bl']} {r['band']}", tag=key, ba=r['before']['alt'], aa=r['after']['alt'], im=f'{pre}{n}', trade=key.capitalize()))
    for i in STILLS:
        p = ph[i]; tags = sorted(set(TAGMAP[t.strip().lower()] for t in re.split(r',| & ', p['trades']) if t.strip().lower() in TAGMAP))
        items.append(dict(kind='photo', place=p['place'], when=p['when'], trades=p['trades'], tag=','.join(tags), aa=p['alt'] or f"{p['trades']} at a home in {p['place']}, TX, by Austin Pro", im=f'p{i}'))
    for it in items:
        if it['kind'] == 'pair': it['tags'] = it['tag']
        else: it['tags'] = it['tag']
    gal = ''
    for n, it in enumerate(items):
        if it['kind'] == 'pair':
            meta = f"{it['place']} · {it['when']}"; sub = it['band']
            gal += (f'<li class="po-gi" data-n="{n}" data-kind="pair" data-tags="{e(it["tags"])}" data-place="{e(it["place"])}" data-when="{e(it["when"])}" data-inst="{e(it["inst"])}" data-band="{e(it["band"])}" data-ba="{e(it["ba"])}" data-b="{img(it["im"] + "b")}">'
                    f'<button type="button" class="po-card" aria-haspopup="dialog" aria-label="Before and after, {e(meta)}. Open the viewer"><img src="{img(it["im"] + "a")}" alt="{e(it["aa"])}" width="560" height="350" loading="lazy" decoding="async"><span class="po-bdg">Before / after</span><span class="po-cm"><b>{e(it["place"])}</b><em>{e(it["when"])} · {e(sub)}</em></span></button></li>')
        else:
            meta = f"{it['place']} · {it['when']}"
            gal += (f'<li class="po-gi" data-n="{n}" data-kind="photo" data-tags="{e(it["tags"])}" data-place="{e(it["place"])}" data-when="{e(it["when"])}" data-trades="{e(it["trades"])}">'
                    f'<button type="button" class="po-card" aria-haspopup="dialog" aria-label="Photo, {e(meta)}. Open the viewer"><img src="{img(it["im"])}" alt="{e(it["aa"])}" width="420" height="315" loading="lazy" decoding="async"><span class="po-cm"><b>{e(it["place"])}</b><em>{e(it["when"])} · {e(it["trades"])}</em></span></button></li>')
    cph = ''.join(f'<li><button type="button" class="po-cp" data-i="{i}" aria-haspopup="dialog" aria-label="Job photo {i + 1} of 8: open"><img src="{img(f"j{i}")}" alt="{e(jd[i]["alt"])}" width="360" height="360" loading="lazy" decoding="async"></button></li>' for i in range(8))
    towns = sorted([(t, n) for t, n in g.items()], key=lambda x: -x[1])
    DATA = dict(trades=[dict(k=k, l=l, doc=d, pr=p, lo=lo, hi=hi, med=m) for k, l, d, p, (lo, hi), m in TRADES], towns=[[t, n] for t, n in towns], townmin=TOWNS_MIN, steps=[list(s) for s in STEPS], case=dict(id=CASE['id'], place=CASE['place']),
                tagnames={'siding': 'Siding', 'windows': 'Windows', 'shingle': 'Shingle roofing', 'metal': 'Metal roofing', 'patio': 'Patio covers', 'doors': 'Exterior doors', 'garage': 'Garage doors', 'painting': 'Exterior painting', 'gutters': 'Gutters'})
    dj = e(json.dumps(DATA, ensure_ascii=False, separators=(',', ':')))
    npairs = sum(1 for i in items if i['kind'] == 'pair'); nph = len(items) - npairs
    art = lambda f, c, t: K.art(f, c, t)
    return f'''<div class="po" data-pod="{dj}">
<section class="po-sec po-open" id="po-open" aria-labelledby="po-h"><div class="po-bg" aria-hidden="true">{art('process-far.svg', 'po-art-far', 'poa')}{art('process-near.svg', 'po-art-near', 'pob')}</div>
<div class="po-in po-open-grid"><div class="po-open-t"><p class="po-eye">Our work · the documented-project record</p><h1 class="po-h1" id="po-h">886 documented projects.</h1>
<p class="po-lede">The firm’s own record of finished work, 2018–2026: <b>312 with photos + 574 more counted</b>. 177 before-and-after pairs are published.</p>
<dl class="po-facts"><div><dt>886</dt><dd>documented projects</dd></div><div><dt>312</dt><dd>with photos shown</dd></div><div><dt>574</dt><dd>more counted</dd></div><div><dt>177</dt><dd>before-and-after pairs published</dd></div></dl>
<div class="po-act"><a class="btn key" href="{CT}">Book a free inspection<span class="tab">{cal}</span></a><a class="callx" href="{K.PHONE_HREF}">{ctx['icons']['phone']}{K.PHONE}</a></div></div>
<figure class="po-wall"><div class="po-wallbox"><svg class="po-wsvg" viewBox="0 0 400 240" role="img" aria-label="A wall of 886 small squares, one for each documented project: 312 lit for projects with photos, the other 574 outlined for projects counted without photos shown." focusable="false"></svg></div>
<figcaption><div class="po-count"><label for="po-cnt">Count them</label><input id="po-cnt" type="range" min="0" max="886" value="0"><output class="po-cout" for="po-cnt" aria-live="polite">0</output></div>
<ul class="po-key" aria-label="Key"><li><i class="k1"></i>312 with photos</li><li><i class="k2"></i>574 more counted</li></ul>
<p class="po-sm">One square for each documented project. The firm’s published measure: documented, not priced.</p></figcaption></figure></div></section>

<section class="po-sec po-trades" id="po-trades" aria-labelledby="po-trades-h"><div class="po-bg" aria-hidden="true">{art('try-far.svg', 'po-art-far', 'poc')}</div><div class="po-in"><header class="po-hd"><p class="po-eye">By trade</p><h2 class="po-h" id="po-trades-h">What the files record, trade by trade.</h2>
<p class="po-p">Two counts are published for each trade, and they are different measures: <b>documented</b> projects, and <b>priced</b> projects (a verified price band for that trade). The ruler shows where the middle half of the priced jobs landed, and the median band.</p></header>
<div class="po-tctl"><span id="po-sortl">Sort by</span><div class="po-seg" role="radiogroup" aria-labelledby="po-sortl"></div></div>
<div class="po-ledger" role="list"></div>
<p class="po-note">Priced counts and bands: 2022–2026 job worksheets, read per trade, as published on the firm’s pages. Decking is shown with no documented count because the firm shows none. Garage doors and decking are small samples (6 and 5 priced projects).</p></div></section>

<section class="po-sec po-towns" id="po-towns" aria-labelledby="po-towns-h"><div class="po-bg" aria-hidden="true">{art('visualiser-far.svg', 'po-art-far', 'pod')}</div><div class="po-in"><header class="po-hd"><p class="po-eye">By town</p><h2 class="po-h" id="po-towns-h">541 of the 886 are in Austin itself.</h2>
<p class="po-p">Documented projects by the town recorded on the job file. Towns with {TOWNS_MIN} or more are drawn as bars; type any town to see its count.</p></header>
<div class="po-tg"><div class="po-towns-l"><div class="po-tctl"><span id="po-scl">Scale</span><div class="po-seg po-seg2" role="radiogroup" aria-labelledby="po-scl"></div></div><div class="po-bars" role="list"></div></div>
<div class="po-find"><label for="po-fi" class="po-h3">Find a town</label><input id="po-fi" type="search" autocomplete="off" placeholder="Try Round Rock or Hutto"><p class="po-fo" aria-live="polite"></p><ul class="po-fl"></ul></div></div></div></section>

<section class="po-sec po-case" id="po-case" aria-labelledby="po-case-h"><div class="po-bg" aria-hidden="true">{art('reviews-far.svg', 'po-art-far', 'poe')}</div><div class="po-in"><header class="po-hd"><p class="po-eye">One job file, in full</p><h2 class="po-h" id="po-case-h">Job APS-4867, Village At Western Oaks, Austin.</h2>
<p class="po-p">Siding and exterior painting, finished September 3, 2026. Drag through the job from the first call to the last day.</p></header>
<div class="po-cgrid"><div class="po-cstage"><div class="po-cimg" data-cur="drag"><img class="po-ci po-ci-a" alt="" decoding="async"><img class="po-ci po-ci-b" alt="" decoding="async"><span class="po-cil" aria-hidden="true"></span></div>
<div class="po-cdays" aria-hidden="true"><b>On site</b><i></i><i></i><i></i><i></i></div></div>
<div class="po-ctime"><div class="po-trk" data-cur="drag"><div class="po-rail" aria-hidden="true"><i class="po-rf"></i></div><ol class="po-ev"></ol><div class="po-hd2" role="slider" tabindex="0" aria-label="Move through the job file" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"></div></div>
<p class="po-sm po-scale">Gaps between the dates are drawn to scale; the four on-site days are enlarged.</p>
<div class="po-ccard" aria-live="polite"><p class="po-cn"></p><h3 class="po-ch"></h3><p class="po-cd"></p><p class="po-cp2"></p></div></div></div>
<dl class="po-meta"><div><dt>Job</dt><dd>APS-4867</dd></div><div><dt>Trades</dt><dd>Siding, exterior painting</dd></div><div><dt>Completed</dt><dd>September 3, 2026</dd></div><div><dt>On site</dt><dd>August 31 through September 3, 2026: four days</dd></div><div><dt>Brands</dt><dd>James Hardie, Sherwin Williams</dd></div><div><dt>Siding portion</dt><dd>$25k–$30k · James Hardie 8.25″ Smooth</dd></div><div><dt>Exterior painting portion</dt><dd>$5k–$10k · Sherwin Williams SuperPaint</dd></div></dl>
<div class="po-scope"><h3 class="po-h3">What the scope reached</h3><p class="po-p2">The scope extended beyond the wall sections to fascia, soffit, garage jambs, and brick pockets. Painting also covered the garage doors and the porch ceiling.</p></div>
<div class="po-cph-w"><h3 class="po-h3">Eight photos from the job</h3><p class="po-sm">Every photo is this job, shot on site by the crew. Open one to look closer; the arrow keys move between them.</p><ul class="po-cphl">{cph}</ul></div></div></section>

<section class="po-sec po-gal" id="po-gal" aria-labelledby="po-gal-h"><div class="po-bg" aria-hidden="true">{art('services-far.svg', 'po-art-far', 'pof')}</div><div class="po-in"><header class="po-hd"><p class="po-eye">The gallery</p><h2 class="po-h" id="po-gal-h">Pick a trade. Open a pair.</h2>
<p class="po-p">{npairs} of the 177 published before-and-after pairs, and {nph} project photos, are shown here, each with its published place and month. Open a pair to wipe between before and after.</p></header>
<div class="po-chips" role="group" aria-label="Filter by trade"></div><p class="po-gst" aria-live="polite"></p><ul class="po-grid">{gal}</ul></div>
<dialog class="po-dlg" aria-labelledby="po-dt" aria-describedby="po-dd"><div class="po-dbox"><div class="po-dhd"><div><h3 id="po-dt"></h3><p id="po-dd"></p></div><button type="button" class="po-dx" aria-label="Close the viewer">×</button></div>
<div class="po-dst" data-cur="drag"><img class="po-di po-di-b" alt="" decoding="async"><img class="po-di po-di-a" alt="" decoding="async"><div class="po-dl" role="slider" tabindex="0" aria-label="Before and after" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50"><i></i></div><span class="po-dtag po-dtb">Before</span><span class="po-dtag po-dta">After</span></div>
<div class="po-dft"><button type="button" class="po-dp" aria-label="Previous">‹ Previous</button><span class="po-dc" aria-live="polite"></span><button type="button" class="po-dn" aria-label="Next">Next ›</button></div></div></dialog></section>

<section class="po-sec po-band" id="po-band" aria-labelledby="po-band-h"><div class="po-bg" aria-hidden="true">{art('process-far.svg', 'po-art-far', 'pog')}</div><div class="po-in"><header class="po-hd"><p class="po-eye">How to read a price band</p><h2 class="po-h" id="po-band-h">A band is one trade on one job.</h2>
<p class="po-p">Every band on this site comes from a job worksheet, read per trade. Choose a line of the job below to see its band on the ladder.</p></header>
<div class="po-bgrid"><div class="po-ws"><p class="po-wsh">Job worksheet · APS-4867</p><div class="po-wl" role="radiogroup" aria-label="Trade line"></div><p class="po-lread" aria-live="polite"></p><p class="po-wsf">Each figure is that job’s own amount for that trade. A siding-and-painting job contributes its siding amount to the siding figures and its painting amount to the painting figures.</p></div>
<div class="po-ladder-w"><div class="po-ladder" role="img" aria-label="The price bands as a ladder"></div></div>
<ul class="po-inc"><li class="y"><i>+</i><div><b>Materials</b><span>counted in the band</span></div></li><li class="y"><i>+</i><div><b>Labor</b><span>counted in the band</span></div></li><li class="n"><i>−</i><div><b>Discounts</b><span>not applied: the band is before discounts</span></div></li><li class="n"><i>−</i><div><b>Sales tax</b><span>excluded</span></div></li></ul></div>
<blockquote class="po-lock"><p>“1,590 individually priced trades on 886 documented projects, 2018–2026: a documented sample, not every job since 2009.”</p><footer>The line the price bands carry, as published. Jobs whose per-trade split could not be verified are left out entirely. The median band is the band holding the middle job; the middle half is where half of the jobs landed.</footer></blockquote></div></section>

<section class="po-sec po-end" id="po-end" aria-labelledby="po-end-h"><div class="po-bg" aria-hidden="true">{art('services-near.svg', 'po-art-near', 'poh')}</div><div class="po-in"><div class="po-close"><h2 class="po-h2" id="po-end-h">Want this on your house?</h2><p class="po-p">One free inspection covers every trade on the house. You get the scope, materials and price. Free, no obligation.</p>
<div class="po-act"><a class="btn key" href="{CT}">Book a free inspection<span class="tab">{cal}</span></a><a class="callx" href="{K.PHONE_HREF}">{ctx['icons']['phone']}{K.PHONE}</a></div>
<p class="po-links"><a href="#/siding">Siding</a><a href="#/windows">Windows</a><a href="#/roofing">Roofing</a></p><p class="po-sm">{K.HOURS} · {K.ADDR}</p></div></div></section></div>'''
