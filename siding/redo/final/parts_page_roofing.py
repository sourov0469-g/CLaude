"""INNER PAGE — Roofing (route #/roofing). Seven sections; every number is from FACTS.md, the firm's FAQ (faq.json), the storm page and pairs.json / photos.json (asserted at build time).
The interactive pieces are drawn in the browser by src/page_roofing.js (window.FPRoofing). Photos are the firm's own, re-encoded small at build time."""
import base64, io, json, os, re, html
import pagekit as K
NAME = 'roofing'
TITLE = 'Roofing'
CSS = 'page_roofing.css'
JS = 'page_roofing.js'
GLOBAL = 'FPRoofing'
e = html.escape
DL = os.path.join(K.WORK, 'dl')
_cache = {}


def b64(f, w=None, q=68):
    if (f, w) in _cache: return _cache[(f, w)]
    raw = open(os.path.join(DL, f), 'rb').read()
    if w:
        from PIL import Image
        im = Image.open(io.BytesIO(raw)).convert('RGB'); im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS); o = io.BytesIO(); im.save(o, 'WEBP', quality=q, method=6); raw = o.getvalue()
    _cache[(f, w)] = 'data:image/webp;base64,' + base64.b64encode(raw).decode(); return _cache[(f, w)]


SHINGLE = [8, 9, 10, 31]; METAL = [12, 13, 14, 15]
STEPS = [  # the homepage four-step wording, plus the firm's own sentences from its storm page
    ('You file and decide', 'You', 'Whether to file is your call, and you report the claim to your insurance company. Your claim stays between you and your insurance company. Roof opened up? We tarp it and secure your home to keep the rain out until the permanent repair: photograph the damage first, and keep the receipt.'),
    ('We inspect and document', 'Austin Pro', 'A free storm inspection of the whole exterior, roof to gutters. We document the damage with dated photos and measurements, including damage that’s easy to miss from the ground, and give you a detailed estimate you can share with your adjuster.'),
    ('We meet your adjuster', 'Austin Pro + you', 'If you’d like us there, we meet your adjuster on site, walk the roof together, point out the damage we documented and answer their questions about our estimate.'),
    ('We work with your insurer', 'Austin Pro', 'When your insurer needs something on the repair, like our estimate, photos, measurements or an answer about the scope, we talk with them directly and keep you posted, or join your call with them. We can’t negotiate your claim or discuss your coverage: that stays between you and your insurance company.'),
    ('Then we do the work', 'Austin Pro', 'Once your claim settles, we restore the roof, siding, windows, gutters and paint the storm hit, in one project.'),
]


def checks():
    F = open(os.path.join(K.WORK, '..', 'FACTS.md'), encoding='utf-8').read()
    for s in ['Shingle Roofing 210', 'Metal Roofing 31', 'GAF 200', 'McElroy Metal 31', 'Owens Corning 10', '| Shingle Roofing | 204 |', '| Metal Roofing | 29 |', 'Shingle roofing $5k–$20k', 'Metal roofing $15k–$40k', 'fewer than 2%', 'Chart axis $0–$50k', 'Roofing portion $30k–$40k', '5-year labour (laminate/designer), 2-year labour (≤3/12 pitch), GAF Golden Pledge available. Metal: lifetime workmanship + manufacturer 30–50 yrs']:
        assert s in F, s
    assert '| Metal Roofing | 29 | — | $20k–$25k |' in F and '| Shingle Roofing | 204 | $5k–$20k | $10k–$15k |' in F
    faq = ' '.join(a for k in K.data('faq.json').values() for _, a in k)
    P = K.data('photos.json')
    for i in SHINGLE: assert 'Shingle Roofing' in P[i]['trades'], i
    for i in METAL: assert 'Metal Roofing' in P[i]['trades'], i
    pr = K.data('pairs.json')[4]; assert (pr['p'], pr['w'], pr['i'], pr['b'], pr['bl']) == ('North Shoal Creek, Austin', 'Jan 2025', 'Owens Corning TruDefinition Duration', '$30k–$40k', 'Roofing portion')
    raw = open(os.path.join(K.WORK, 'raw', 'services_storm-damage-restoration.html'), encoding='utf-8').read()
    for s in ['28 included a roof and 17 covered more than one part of the house', '31', 'We tarp the roof']: assert s in html.unescape(raw), s
    return P, pr


def markup(ctx):
    P, pr = checks()
    C = K.CONTACT_PAGE; cal = ctx['cal']; ic = ctx['icons']
    bg = lambda a, b, t: f'<div class="rf-bg" aria-hidden="true">{K.art(a, "rf-far", "rff" + t)}' + (K.art(b, "rf-near", "rfn" + t) if b else '') + '</div>'
    cta = f'<a class="btn key" href="{C}">Book a free inspection<span class="tab">{cal}</span></a><a class="rf-call" href="{K.PHONE_HREF}">{ic["phone"]}{K.PHONE}</a>'
    kinds = [('shingle', 'Shingle', 'laminate and designer'), ('seam', 'Standing seam', 'metal'), ('screw', 'Screw-down panels', 'metal'), ('mshingle', 'Metal shingles', 'metal')]
    kbtn = ''.join(f'<button type="button" role="radio" class="rf-kb" data-k="{k}" aria-checked="{str(k == "shingle").lower()}" tabindex="{0 if k == "shingle" else -1}"><b>{n}</b><small>{d}</small></button>' for k, n, d in kinds)
    pic = lambda i: (lambda p: f'<figure class="rf-ph"><img src="{b64(f"photo{i}-640.webp", 560)}" alt="{e(p["alt"])}" width="560" height="{round(560 * (int(p["img"].split("-")[-1].split(".")[0].split("x")[1]) / int(p["img"].split("-")[-1].split(".")[0].split("x")[0])))}" loading="lazy"><figcaption><b>{e(p["place"])}</b><span>{e(p["when"])} · {e(p["trades"])}</span></figcaption></figure>')(P[i])
    sh = ''.join(pic(i) for i in SHINGLE); me = ''.join(pic(i) for i in METAL)
    pitches = [2, 3, 4, 6, 8, 12]
    pbtn = ''.join(f'<button type="button" role="radio" class="rf-pb" data-p="{n}" aria-checked="{str(n == 6).lower()}" tabindex="{0 if n == 6 else -1}"><b>{n}/12</b></button>' for n in pitches)
    steps = ''.join(f'<button type="button" role="radio" class="rf-sb" data-i="{i}" aria-checked="{str(i == 0).lower()}" tabindex="{0 if i == 0 else -1}"><i>{i + 1}</i><span>{e(t)}</span></button>' for i, (t, w, d) in enumerate(STEPS))
    stepdata = e(json.dumps([[t, w, d] for t, w, d in STEPS]), quote=True)
    pair = dict(place=pr['p'], when=pr['w'], inst=pr['i'], band=pr['b'], bl=pr['bl'], ba=pr['ba'], aa=pr['aa'])
    return f'''
<section class="rf-s rf-open" id="roofing-top" aria-labelledby="rf-h1">{bg('services-far.svg', 'services-near.svg', 'a')}
<div class="rf-in rf-og"><div class="rf-copy"><p class="rf-kick">GAF Master Elite · Sanders Roofing &amp; Exteriors, merged 2018</p>
<h1 class="rf-h1" id="rf-h1">Shingle and metal roofs, <em>counted job by job.</em></h1>
<p class="rf-lead">Shingle roofing: 210 documented jobs, 204 priced, median band $10k–$15k. Metal roofing: 31 documented jobs, 29 priced, median band $20k–$25k.</p>
<p class="rf-policy">GAF Master Elite: a designation GAF says fewer than 2% of contractors nationwide hold.</p>
<div class="rf-cta">{cta}</div>
<ul class="rf-facts"><li><b>210</b> documented shingle jobs · <b>204</b> priced</li><li><b>31</b> documented metal jobs · <b>29</b> priced</li><li>Free <b>storm damage</b> inspection</li><li><b>1 to 3 days</b> for a new shingle roof, usually</li></ul></div>
<div class="rf-card rf-lay"><svg class="rf-roof" id="rf-roof" viewBox="0 0 560 400" role="img" aria-label="A roof plane being covered, course by course or panel by panel, on a house."></svg>
<div class="rf-layc"><h2 class="rf-h3">Lay a roof</h2><div class="rf-seg4" role="radiogroup" aria-label="Kind of roof">{kbtn}</div>
<label class="rf-rng"><span>Laid so far <output id="rf-lout">0</output></span><input type="range" id="rf-lay" min="0" max="12" value="12" aria-describedby="rf-lnote"></label>
<p class="rf-read" id="rf-lread" aria-live="polite"></p><p class="rf-note" id="rf-lnote">A drawn illustration of how each roof goes on, not a product specification. Drag the slider, or use the arrow keys.</p></div></div></div></section>

<section class="rf-s rf-two" id="roofing-two" aria-labelledby="rf-two-h">{bg('visualiser-far.svg', None, 'b')}
<div class="rf-in"><header class="rf-hd"><p class="rf-kick">Two kinds of roof · priced jobs, 2018–2026</p><h2 class="rf-h2" id="rf-two-h">Where our shingle and metal jobs landed</h2>
<p class="rf-sub">Bands are materials and labor, before discounts, excluding tax, read per trade from each job worksheet: a documented sample, not every job since 2009. “Documented” and “priced” are different counts, so each is named.</p></header>
<div class="rf-card rf-rail"><div class="rf-railhd"><div class="rf-seg2" role="radiogroup" aria-label="Which roof"><button type="button" role="radio" class="rf-rk" data-r="shingle" aria-checked="true" tabindex="0"><b>Shingle roofing</b><small>210 documented · 204 priced</small></button><button type="button" role="radio" class="rf-rk" data-r="metal" aria-checked="false" tabindex="-1"><b>Metal roofing</b><small>31 documented · 29 priced</small></button></div>
<p class="rf-rail-n" aria-live="polite"><span>Median band</span><b id="rf-med">$10k–$15k</b><em id="rf-midh">Middle half of priced jobs: $5k–$20k</em></p></div>
<div class="rf-axis" data-cur="drag" id="rf-axis"><div class="rf-trk"><i class="rf-mh" id="rf-mh"></i><i class="rf-md" id="rf-md"></i><span class="rf-pin" id="rf-pin"><u></u></span></div><ol class="rf-tick" aria-hidden="true"><li>$0</li><li>$10k</li><li>$20k</li><li>$30k</li><li>$40k</li><li>$50k</li></ol></div>
<p class="rf-axr" id="rf-axr" aria-live="polite"></p><ul class="rf-facts2" id="rf-rf" aria-live="polite"></ul>
<p class="rf-note">Chart axis $0–$50k. The long bar is where the middle half of priced jobs landed; the green block is the median band. Metal’s figures rest on 29 priced jobs, shingle’s on 204.</p></div>
<div class="rf-brands"><h3 class="rf-h3">Brands on our documented projects, 2018–2026</h3><ul class="rf-bars" id="rf-bars"><li data-n="200" data-k="shingle"><span>GAF</span><u><i style="--w:100%"></i></u><b>200</b></li><li data-n="10" data-k="shingle"><span>Owens Corning</span><u><i style="--w:5%"></i></u><b>10</b></li><li data-n="31" data-k="metal"><span>McElroy Metal</span><u><i style="--w:15.5%"></i></u><b>31</b></li></ul></div>
<div class="rf-photos" id="rf-photos" aria-live="polite"><div class="rf-phs" data-r="shingle">{sh}</div><div class="rf-phs" data-r="metal" hidden>{me}</div></div></div></section>

<section class="rf-s rf-pitch" id="roofing-pitch" aria-labelledby="rf-pitch-h">{bg('try-far.svg', 'try-near.svg', 'c')}
<div class="rf-in"><header class="rf-hd"><p class="rf-kick">Shingle and metal warranties, as published</p><h2 class="rf-h2" id="rf-pitch-h">How steep is your roof?</h2>
<p class="rf-sub">Pick a pitch (rise in inches for every 12 inches of run). The labor warranty on a shingle roof depends on it: that is the published rule.</p></header>
<div class="rf-pg"><div class="rf-card rf-stage"><svg class="rf-psvg" id="rf-psvg" viewBox="0 0 520 330" role="img" aria-label="A roof drawn in profile at the pitch you choose."></svg></div>
<div class="rf-ctl"><h3 class="rf-h3">Roof pitch</h3><div class="rf-seg6" role="radiogroup" aria-label="Roof pitch">{pbtn}</div><p class="rf-read" id="rf-pread" aria-live="polite"></p>
<div class="rf-wars"><div class="rf-wc" id="rf-w5"><b>5-year</b><span>labor warranty on a shingle roof: laminate or designer shingles.</span></div><div class="rf-wc" id="rf-w2"><b>2-year</b><span>labor warranty on a shingle roof with a 3/12 pitch or less.</span></div><div class="rf-wc rf-wg" id="rf-wg"><b>GAF Golden Pledge</b><span>Available. Our FAQ calls it a premier warranty, available exclusively through GAF Master Elite contractors.</span></div><div class="rf-wc rf-wm" id="rf-wm"><b>Metal: lifetime</b><span>Austin Pro workmanship warranty on labor, plus the manufacturer’s warranty, which varies by brand and typically runs 30 to 50 years.</span></div></div></div></div></div></section>

<section class="rf-s rf-gaf" id="roofing-gaf" aria-labelledby="rf-gaf-h">{bg('reviews-far.svg', None, 'd')}
<div class="rf-in rf-gg"><div class="rf-gt"><p class="rf-kick">GAF Master Elite</p><h2 class="rf-h2" id="rf-gaf-h">A badge GAF says fewer than 2% of contractors hold</h2>
<p class="rf-sub">That is GAF’s own statement about its Master Elite designation; we are repeating it, not measuring it. Austin Pro is a GAF Master Elite contractor, and GAF’s Golden Pledge warranty is available through Master Elite contractors.</p>
<div class="rf-badge"><img src="{b64('cred-gaf-master-elite.webp')}" alt="GAF Master Elite" width="120" height="120" loading="lazy"><span>GAF Master Elite · documented GAF projects of ours: <b>200</b> (2018–2026)</span></div></div>
<div class="rf-card rf-hund"><div class="rf-dg" id="rf-dg" aria-hidden="true"></div><p class="rf-hn" aria-live="polite"><b>Fewer than 2</b> in every 100 contractors nationwide, GAF says.</p><p class="rf-note">One hundred contractors, drawn as dots. Fewer than two would hold the badge: one dot lit, and the next only half lit.</p></div></div></section>

<section class="rf-s rf-storm" id="roofing-storm" aria-labelledby="rf-st-h">{bg('process-far.svg', 'process-near.svg', 'e')}
<div class="rf-in"><header class="rf-hd"><p class="rf-kick">Storm damage restoration · free inspection · insurance or not</p><h2 class="rf-h2" id="rf-st-h">After the storm: who does what</h2>
<p class="rf-sub">Your claim stays yours. Walk it step by step: drag the claim along the line, or choose a step. Of the 31 storm and insurance jobs in our records, 28 included a roof and 17 covered more than one part of the house.</p></header>
<div class="rf-card rf-stl" data-steps="{stepdata}"><svg class="rf-tl" id="rf-tl" viewBox="0 0 800 300" role="img" aria-label="Three lanes, You, Austin Pro and Your insurer, with the claim moving along five steps."></svg>
<div class="rf-sbs" role="radiogroup" aria-label="Storm claim steps">{steps}</div>
<div class="rf-stc" aria-live="polite"><p class="rf-stk" id="rf-stk"></p><h3 class="rf-h3 rf-sth" id="rf-sth"></h3><p id="rf-stp"></p></div></div></div></section>

<section class="rf-s rf-pair" id="roofing-pair" aria-labelledby="rf-pair-h">{bg('visualiser-near.svg', None, 'f')}
<div class="rf-in"><header class="rf-hd"><p class="rf-kick">Before and after · North Shoal Creek, Austin</p><h2 class="rf-h2" id="rf-pair-h">Laid course by course</h2>
<p class="rf-sub">One of our roofs, shot before we started and after we finished. Move the slider and the new roof goes on from the eaves up. Price as published: the roofing portion of the job.</p></header>
<figure class="rf-pf"><div class="rf-pst" id="rf-pst" data-cur="drag" data-p='{e(json.dumps(pair), quote=True)}'><img class="rf-im rf-pa" src="{b64('home4a-720.webp')}" alt="{e(pr['aa'])}" width="720" height="450"><div class="rf-pbf" id="rf-pbf"><img class="rf-im" src="{b64('home4b-720.webp')}" alt="{e(pr['ba'])}" width="720" height="450"></div><i class="rf-edge" id="rf-edge" aria-hidden="true"></i><span class="rf-lb rf-lbb">Before</span><span class="rf-lb rf-lba">After</span></div>
<figcaption class="rf-pside"><p class="rf-pplace"><b>{e(pr['p'])}</b><span>{e(pr['w'])} · {e(pr['i'])}</span></p><p class="rf-pb2"><small>{e(pr['bl'])}</small><b>{e(pr['b'])}</b></p>
<label class="rf-rng rf-prng"><span>New roof laid <output id="rf-pout">0 of 12</output></span><input type="range" id="rf-prange" min="0" max="12" value="0" aria-label="How much of the new roof is laid, from the eaves up"></label>
<p class="rf-note">Drag across the photo or use the slider. The twelve steps are for the wipe only: they are not courses counted on this roof.</p></figcaption></figure></div></section>

<section class="rf-s rf-close" id="roofing-close" aria-labelledby="rf-cl-h">{bg('services-near.svg', None, 'g')}
<div class="rf-in"><header class="rf-hd"><p class="rf-kick">One free inspection covers every trade on the house</p><h2 class="rf-h2" id="rf-cl-h">Look at your roof with us, free.</h2>
<p class="rf-sub">A project manager walks every side of the house: siding, trim, windows, roof and gutters. The inspection and estimate are free. After a storm, a free storm inspection is the reliable way to know: hail damage is often invisible from the ground.</p></header>
<div class="rf-end"><p class="rf-endp">GAF Master Elite · lifetime workmanship warranty on metal roofs · 5-year labor warranty on laminate and designer shingles</p><div class="rf-cta">{cta}</div><p class="rf-hrs">{e(K.HOURS)} · {e(K.ADDR)}</p></div></div></section>
'''
