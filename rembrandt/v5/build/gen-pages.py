# R4 inner pages: writes src/sections/<page>/v1-v5.html from ONE fact list per page, so the five layouts of a page carry
# the same, traceable copy (AUDIT-R4.md §1 facts; TRACEABILITY.md "R4 pages"). Run: python3 -I build/gen-pages.py [svcp about contact]
# Every sentence below comes from the facts lock or the firm's own published lines (rembrandt-pack.md §3/§5.6, flag C12).
# No prices, no warranties, no guarantees, no promise about insurance claims.
import os, re, html
HERE = os.path.dirname(os.path.abspath(__file__)); SEC = os.path.join(HERE, '..', 'src', 'sections')
E = html.escape
TEL = 'tel:+19377467377'
CALL_BTN = f'<a class="btn btn--sun rx" href="{TEL}" data-c="call">ICON_PHONE<span>Call (937) 746-7377</span></a>'
HOURS = 'Rachel answers, Monday to Friday, 9 to 5.'

# ---------------------------------------------------------------- services
SVC = [
  dict(k='replace', n='Roof replacement', lede='Torn off to the deck, and the deck checked.', icon='ICON_SREPLACE', img='svc-aerial',
       alt='A roof replacement from above: the old roof coming off, tarps laid on the lawn',
       body=['We tear the old roof off down to the deck and check the deck before anything new goes on.',
             'Rembrandt is an Owens Corning Platinum Preferred contractor.',
             'You get a written, line-by-line estimate first, and no work starts without your written approval.']),
  dict(k='repair', n='Roof repair', lede='Most repairs finish in one visit.', icon='ICON_SREPAIR', img='svc-repair',
       alt='Adam from the repair crew sealing a leaky spot beside a chimney',
       body=['Our repair crew carries flashing, pipe boots and matching shingles on the truck.',
             'That is why most repairs finish in one visit.',
             'You still get the repair in writing before we start.']),
  dict(k='storm', n='Storm and hail damage', lede='Photographed for your adjuster.', icon='ICON_SHAIL', img='storm-wind',
       alt='Shingles with their tabs torn away by wind',
       body=['Bunk Walker built this firm restoring storm-damaged homes.',
             'Ohio averages 19 hail days a year, and hail season runs April to July.',
             'We inspect the roof and photograph the damage for your insurance adjuster.']),
  dict(k='claims', n='Insurance claims', lede='We document. Your insurer decides.', icon='ICON_SCLAIM', img=None, alt='',
       body=['We write the repair up as a line-item scope for your claim.',
             'We can meet your adjuster at the roof, if you want us there.',
             'Your insurance company decides the claim and what your policy pays. We never promise how a claim will turn out.']),
  dict(k='siding', n='Siding', lede='James Hardie and vinyl.', icon='ICON_SSIDING', img=None, alt='',
       body=['We install James Hardie and vinyl siding.', 'It goes on over house wrap, with flashed J-channel.']),
  dict(k='gutters', n='Gutters', lede='Seamless, cut on site.', icon='ICON_SGUTTER', img=None, alt='',
       body=['Seamless aluminum gutters, cut to length on site.', 'Gutter guards, and gutter cleaning.']),
]
MORE = [('Commercial roofing', 'EPDM, TPO and roof coating systems.'), ('Skylights', 'Installation and repair.'),
        ('Blown-in insulation', ''), ('Loft ventilation', ''), ('Brick veneer', '')]
EVERY = ['A written, line-by-line estimate before any work.', 'Nothing starts without your written approval.',
         'Owens Corning Platinum Preferred.', '$2M liability insurance.']
H1 = 'Roofing, storm repair, siding and gutters.'
SUB = 'Springboro and Greater Dayton, since 1995. ' + HOURS

def p(s): return ' '.join(E(x) for x in s)
def every(cls):
    return f'<div class="{cls}"><h2 class="sp-k">On every job</h2><ul role="list">' + ''.join(f'<li>{E(x)}</li>' for x in EVERY) + '</ul></div>'
def more_list(cls):
    return f'<div class="{cls}"><h2 class="sp-k">We also do</h2><ul role="list">' + ''.join(f'<li><b>{E(a)}</b>{(" " + E(b)) if b else ""}</li>' for a, b in MORE) + '</ul></div>'
def close(cls):
    return f'<div class="{cls}"><h2 class="sp-close-h">Not sure which one you need?</h2><p>Call Rachel and tell her what you are seeing. Monday to Friday, 9 to 5.</p><div class="sp-act">{CALL_BTN}</div></div>'
def art(s, cls):
    if s['img']: return f'<div class="{cls}"><img data-img="{s["img"]}" alt="{E(s["alt"])}" decoding="async"></div>'
    return f'<div class="{cls} {cls}--draw">{s["icon"]}</div>'

def svc_v1():  # index and chapters
    idx = ''.join(f'<li><a href="#sp1-{s["k"]}" data-i="{i}"><span class="num">{i+1:02d}</span>{E(s["n"])}</a></li>' for i, s in enumerate(SVC))
    ch = ''.join(f'<article class="sp1-ch" id="sp1-{s["k"]}" data-i="{i}">{art(s, "sp1-art")}<div class="sp1-tx"><p class="sp1-n num">{i+1:02d} of 06</p><h2 class="sp1-t">{E(s["n"])}</h2><p class="sp1-lede">{E(s["lede"])}</p><p>{p(s["body"])}</p></div></article>' for i, s in enumerate(SVC))
    return f'''<div class="sp sp1">
  <header class="sp-hero"><h1 class="sp-h1">{E(H1)}</h1><p class="sp-sub">{E(SUB)}</p></header>
  <div class="sp1-body">
    <nav class="sp1-idx" aria-label="Services on this page"><ol role="list">{idx}<li><a href="#sp1-more"><span class="num">+</span>We also do</a></li></ol></nav>
    <div class="sp1-chs">{ch}<section class="sp1-more" id="sp1-more">{more_list("sp1-ml")}{every("sp1-ev")}</section></div>
  </div>
  {close("sp-close")}
</div>
'''

def svc_v2():  # alternating chapters, storm + claims as one blue band
    rows = []
    for i, s in enumerate(SVC):
        if s['k'] == 'claims': continue
        if s['k'] == 'storm':
            c = SVC[3]
            rows.append(f'<section class="sp2-band" aria-labelledby="sp2-storm"><div class="sp2-band-in">{art(s, "sp2-art")}<div class="sp2-tx"><h2 class="sp2-t" id="sp2-storm">{E(s["n"])}, and the claim</h2><p class="sp2-lede">{E(s["lede"])}</p><p>{p(s["body"])}</p><h3 class="sp2-t3">{E(c["n"])}</h3><p>{p(c["body"])}</p></div></div></section>')
            continue
        rows.append(f'<section class="sp2-row{" sp2-row--flip" if len(rows) % 2 else ""}" aria-labelledby="sp2-{s["k"]}">{art(s, "sp2-art")}<div class="sp2-tx"><h2 class="sp2-t" id="sp2-{s["k"]}">{E(s["n"])}</h2><p class="sp2-lede">{E(s["lede"])}</p><p>{p(s["body"])}</p></div></section>')
    return f'''<div class="sp sp2">
  <header class="sp-hero sp2-hero"><h1 class="sp-h1">{E(H1)}</h1><p class="sp-sub">{E(SUB)}</p></header>
  {''.join(rows)}
  <div class="sp2-foot">{more_list("sp2-ml")}{every("sp2-ev")}</div>
  {close("sp-close")}
</div>
'''

def svc_v3():  # tabs
    tabs = ''.join(f'<button type="button" role="tab" class="sp3-tab rx" id="sp3-t{i}" aria-controls="sp3-p{i}" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}">{s["icon"]}<span>{E(s["n"])}</span></button>' for i, s in enumerate(SVC))
    panels = ''.join(f'<div class="sp3-panel" role="tabpanel" id="sp3-p{i}" aria-labelledby="sp3-t{i}" tabindex="0"{"" if i == 0 else " hidden"}>{art(s, "sp3-art")}<div class="sp3-tx"><h2 class="sp3-t">{E(s["n"])}</h2><p class="sp3-lede">{E(s["lede"])}</p><p>{p(s["body"])}</p></div></div>' for i, s in enumerate(SVC))
    return f'''<div class="sp sp3">
  <header class="sp-hero"><h1 class="sp-h1">{E(H1)}</h1><p class="sp-sub">{E(SUB)}</p></header>
  <div class="sp3-wrap"><div class="sp3-tabs" role="tablist" aria-label="Services">{tabs}</div>{panels}</div>
  <div class="sp3-foot">{more_list("sp3-ml")}{every("sp3-ev")}</div>
  {close("sp-close")}
</div>
'''

def svc_v4():  # three groups
    groups = [('Roofs', 'sp4-g--roof', [SVC[0], SVC[1]]), ('After a storm', 'sp4-g--storm', [SVC[2], SVC[3]]), ('The rest of the house', 'sp4-g--house', [SVC[4], SVC[5]])]
    out = []
    for gi, (gn, cls, items) in enumerate(groups):
        cols = ''.join(f'<article class="sp4-s">{s["icon"]}<h3 class="sp4-t">{E(s["n"])}</h3><p class="sp4-lede">{E(s["lede"])}</p><p>{p(s["body"])}</p></article>' for s in items)
        extra = ''
        if gi == 2: extra = '<article class="sp4-s sp4-s--more"><h3 class="sp4-t">We also do</h3><ul role="list">' + ''.join(f'<li><b>{E(a)}</b>{(" " + E(b)) if b else ""}</li>' for a, b in MORE) + '</ul></article>'
        out.append(f'<section class="sp4-g {cls}" aria-labelledby="sp4-g{gi}"><div class="sp4-g-in"><h2 class="sp4-gh" id="sp4-g{gi}"><span class="num">{gi+1}</span>{E(gn)}</h2><div class="sp4-cols">{cols}{extra}</div></div></section>')
    return f'''<div class="sp sp4">
  <header class="sp-hero"><h1 class="sp-h1">{E(H1)}</h1><p class="sp-sub">{E(SUB)}</p>{every("sp4-ev")}</header>
  {''.join(out)}
  {close("sp-close")}
</div>
'''

def svc_v5():  # the menu board
    lines = ''.join(f'<li class="sp5-li"><span class="sp5-n">{E(s["n"])}</span><span class="sp5-dots" aria-hidden="true"></span><span class="sp5-d">{E(s["lede"])}</span><p class="sp5-more">{p(s["body"])}</p></li>' for s in SVC)
    lines2 = ''.join(f'<li class="sp5-li sp5-li--sm"><span class="sp5-n">{E(a)}</span><span class="sp5-dots" aria-hidden="true"></span><span class="sp5-d">{E(b) if b else "Ask Rachel."}</span></li>' for a, b in MORE)
    return f'''<div class="sp sp5">
  <div class="sp5-strip" aria-hidden="true"><img data-img="svc-aerial" alt="" decoding="async"><img data-img="svc-repair" alt="" decoding="async"><img data-img="storm-wind" alt="" decoding="async"></div>
  <header class="sp-hero sp5-hero"><h1 class="sp-h1">{E(H1)}</h1><p class="sp-sub">{E(SUB)}</p></header>
  <div class="sp5-board">
    <h2 class="sp-k">The main six</h2><ol class="sp5-list" role="list">{lines}</ol>
    <h2 class="sp-k">And also</h2><ul class="sp5-list" role="list">{lines2}</ul>
    {every("sp5-ev")}
  </div>
  {close("sp-close")}
</div>
'''

# R4 directive Phase 6 (redesign layer, as on the homepage sections): the brand label over the H1, the contour artwork
# on the root, and a drawn roofline closing the page header (accent at the ridge, a dashed tint along the eaves)
GABLE = 'M4 50 C 18 39 33 24 49 8 C 51 6.6 53.4 6.6 55 8.2 C 70 23 84 36 97 45 C 98.6 46.2 97.6 49 95.6 48.6 C 81 44.6 66 35 52.6 24.4 C 39 36 23 47 7.4 54.6 C 5.2 55.6 2.6 52.2 4 50 Z'
LABEL = {'svcp': 'What we do', 'about': 'The family firm', 'contact': 'Call or come by'}
RIDGE = '<svg class="pg-ridge" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path class="pg-ridge-e" d="M0 76 L600 6 L1200 76"/><path class="pg-ridge-a" d="M360 34 L600 6 L840 34"/></svg>'
def dress(page, h):
    lab = f'<p class="r4-lab"><svg viewBox="0 0 100 56" aria-hidden="true" focusable="false"><path d="{GABLE}"/></svg>{LABEL[page]}</p>'
    h = re.sub(r'^<div class="([^"]+)"', r'<div class="\1 r4-art"', h, count=1)
    return h.replace('<h1', lab + '<h1', 1).replace('</header>', RIDGE + '</header>', 1)
def write(page, gens):
    d = os.path.join(SEC, page); os.makedirs(d, exist_ok=True)
    for i, g in enumerate(gens, 1):
        open(os.path.join(d, f'v{i}.html'), 'w').write(dress(page, g()))
    print(page, len(gens))


# ---------------------------------------------------------------- about (facts lock only: 1995 Bunk; Wade president
# since 2015; Rachel answers; BBB A+ since 2001; Owens Corning Platinum Preferred; $2M liability; 4.9 / 295 Google;
# Bunk built the firm restoring storm-damaged homes, pack §3)
GOOGLE = 'https://www.google.com/maps/search/?api=1&amp;query=Rembrandt+Roofing+%26+Restoration+Springboro+OH'
BBB = 'https://www.bbb.org/search?find_country=USA&amp;find_text=Rembrandt%20Roofing&amp;find_loc=Springboro%2C%20OH'
OC = 'https://www.owenscorning.com/en-us/roofing/contractors'
CRED = [('4.9 stars', 'from 295 Google reviews', GOOGLE, 'Check it on Google'), ('BBB A+', 'accredited since 2001', BBB, 'Check it on bbb.org'),
        ('Owens Corning', 'Platinum Preferred', OC, 'Check it in their contractor finder'), ('$2M', 'liability insurance', TEL, 'Ask Rachel for the certificate')]
PEOPLE = [('Bunk and Wade Walker', 'ab-bunkwade', 'Bunk and Wade Walker at a Rembrandt Roofing stand', 'Franklin "Bunk" Walker founded Rembrandt in 1995. His son, Wade, has been president since 2015.'),
          ('Rachel', 'ab-rachel', 'Rachel, who answers the phone at Rembrandt Roofing', 'Rachel answers the phone, Monday to Friday, 9 to 5.'),
          ('The crew', 'ab-crew', 'The Rembrandt crew lined up beside their truck at a job', 'The crew that does the work, on a Rembrandt job.')]
YEARS = [('1995', 'Franklin "Bunk" Walker founds Rembrandt. He builds its name restoring storm-damaged homes.'),
         ('2001', 'BBB A+ accredited since 2001.'),
         ('2015', 'His son, Wade Walker, becomes president.'),
         ('Today', 'Rachel answers the phone. Owens Corning Platinum Preferred, with 4.9 stars from 295 Google reviews.')]
AH1 = 'The Walker family, roofing since 1995.'
ASUB = 'Rembrandt Roofing & Restoration is a family firm in Springboro, Ohio. ' + HOURS
def ext(href): return '' if href.startswith('tel:') else ' target="_blank" rel="noopener"'
def creds(cls):
    return f'<ul class="{cls}" role="list">' + ''.join(f'<li><b class="num">{E(a)}</b><span>{E(b)}</span><a class="ab-chk rx" href="{h}"{ext(h)}>{E(t)}{"" if h.startswith("tel:") else "<span class=vh> (opens in a new tab)</span>"}</a></li>' for a, b, h, t in CRED) + '</ul>'
def aclose(cls):
    return f'<div class="{cls}"><h2 class="sp-close-h">Talk to the family firm.</h2><p>Call Rachel at the office. Monday to Friday, 9 to 5.</p><div class="sp-act">{CALL_BTN}</div></div>'
def fig(k, alt, cls): return f'<figure class="{cls}"><img data-img="{k}" alt="{E(alt)}" decoding="async"></figure>'

def ab_v1():  # people first
    cards = ''.join(f'<li class="ab1-card">{fig(k, alt, "ab1-ph")}<h2 class="ab1-n">{E(n)}</h2><p>{E(t)}</p></li>' for n, k, alt, t in PEOPLE)
    return f'''<div class="ab ab1">
  <header class="ab-hero"><h1 class="ab-h1">{E(AH1)}</h1><p class="ab-sub">{E(ASUB)}</p></header>
  <ul class="ab1-cards" role="list">{cards}</ul>
  <section class="ab1-proof" aria-labelledby="ab1-ph"><h2 class="ab-h2" id="ab1-ph">The record, and where to check it.</h2>{creds("ab1-creds")}</section>
  {aclose("sp-close")}
</div>
'''

def ab_v2():  # the years
    stops = ''.join(f'<li class="ab2-stop"><span class="ab2-dot" aria-hidden="true"></span><p class="ab2-y num">{E(y)}</p><p class="ab2-t">{E(t)}</p></li>' for y, t in YEARS)
    return f'''<div class="ab ab2">
  <header class="ab-hero"><h1 class="ab-h1">{E(AH1)}</h1><p class="ab-sub">{E(ASUB)}</p></header>
  <div class="ab2-line"><svg class="ab2-ridge" viewBox="0 0 1000 40" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path class="ab2-ridge-bg" d="M0 34 L125 8 L375 34 L625 8 L875 34 L1000 22"/><path class="ab2-ridge-fg" d="M0 34 L125 8 L375 34 L625 8 L875 34 L1000 22"/></svg><ol class="ab2-stops" role="list">{stops}</ol></div>
  <div class="ab2-pair">{fig("ab-bunkwade", PEOPLE[0][2], "ab2-ph ab2-ph--a")}{fig("ab-crew", PEOPLE[2][2], "ab2-ph ab2-ph--b")}</div>
  <section class="ab2-proof" aria-labelledby="ab2-ph"><h2 class="ab-h2" id="ab2-ph">Check the record yourself.</h2>{creds("ab2-creds")}</section>
  {aclose("sp-close")}
</div>
'''

def ab_v3():  # at a glance
    rows = [('Founded', '1995, by Franklin "Bunk" Walker'), ('President', 'Wade Walker, since 2015'), ('On the phone', 'Rachel, Monday to Friday, 9 to 5'),
            ('Phone', None), ('Office', '38 N Pioneer Blvd, Springboro, OH 45066'), ('Google', None), ('Better Business Bureau', None), ('Owens Corning', None), ('Insurance', None)]
    out = []
    for k, v in rows:
        if k == 'Phone': v = f'<a class="rx" href="{TEL}">(937) 746-7377</a>'
        elif k == 'Google': v = f'4.9 stars from 295 reviews. <a class="ab-chk rx" href="{GOOGLE}" target="_blank" rel="noopener">Check it<span class="vh"> on Google (opens in a new tab)</span></a>'
        elif k == 'Better Business Bureau': v = f'A+, accredited since 2001. <a class="ab-chk rx" href="{BBB}" target="_blank" rel="noopener">Check it<span class="vh"> on bbb.org (opens in a new tab)</span></a>'
        elif k == 'Owens Corning': v = f'Platinum Preferred contractor. <a class="ab-chk rx" href="{OC}" target="_blank" rel="noopener">Check it<span class="vh"> in their contractor finder (opens in a new tab)</span></a>'
        elif k == 'Insurance': v = '$2M liability insurance. Ask Rachel for the certificate.'
        else: v = E(v)
        out.append(f'<div class="ab3-row"><dt>{E(k)}</dt><dd>{v}</dd></div>')
    return f'''<div class="ab ab3">
  <header class="ab-hero"><h1 class="ab-h1">Rembrandt at a glance.</h1><p class="ab-sub">{E(ASUB)}</p></header>
  <div class="ab3-wrap"><dl class="ab3-dl">{''.join(out)}</dl>{fig("ab-bunkwade", PEOPLE[0][2], "ab3-ph")}</div>
  {aclose("sp-close")}
</div>
'''

def ab_v4():  # sticky photo story
    chs = [('1995', 'Bunk Walker starts Rembrandt.', 'He builds the firm\'s name restoring storm-damaged homes. Franklin "Bunk" Walker founded Rembrandt Roofing & Restoration in 1995.', 0),
           ('2015', 'Wade takes over as president.', 'His son, Wade Walker, has been president since 2015.', 0),
           ('Today', 'Rachel answers the phone.', 'Call the office, Monday to Friday, 9 to 5, and Rachel picks up.', 1),
           ('On the job', 'The crew does the work.', 'Owens Corning Platinum Preferred, with $2M liability insurance.', 2),
           ('The record', '4.9 stars from 295 Google reviews.', 'BBB A+ accredited since 2001. Every figure has a link to check it.', 2)]
    imgs = ''.join(f'<img class="ab4-img{" is-on" if i == 0 else ""}" data-img="{k}" alt="{E(alt)}" decoding="async" data-i="{i}">' for i, (n, k, alt, t) in enumerate(PEOPLE))
    chap = ''.join(f'<section class="ab4-ch" data-ph="{im}"><p class="ab4-k num">{E(k)}</p><h2 class="ab4-t">{E(t)}</h2><p>{E(b)}</p>{creds("ab4-creds") if k == "The record" else ""}</section>' for k, t, b, im in chs)
    return f'''<div class="ab ab4">
  <header class="ab-hero"><h1 class="ab-h1">{E(AH1)}</h1><p class="ab-sub">{E(ASUB)}</p></header>
  <div class="ab4-wrap"><div class="ab4-stage">{imgs}</div><div class="ab4-chs">{chap}</div></div>
  {aclose("sp-close")}
</div>
'''

def ab_v5():  # magazine
    return f'''<div class="ab ab5">
  <header class="ab5-head"><h1 class="ab5-h1">One family. Springboro. Since 1995.</h1></header>
  {fig("ab-crew", PEOPLE[2][2], "ab5-pan")}
  <div class="ab5-grid">
    <dl class="ab5-meta"><div><dt>Founded</dt><dd>1995</dd></div><div><dt>President</dt><dd>Wade Walker, since 2015</dd></div><div><dt>Office</dt><dd>38 N Pioneer Blvd, Springboro, OH 45066</dd></div><div><dt>Hours</dt><dd>Monday to Friday, 9 to 5</dd></div></dl>
    <div class="ab5-col"><p class="ab5-lede">Franklin "Bunk" Walker founded Rembrandt in 1995, and built its name restoring storm-damaged homes.</p><p>His son, Wade Walker, has been president since 2015. When you call the office, Rachel answers.</p></div>
    <div class="ab5-col"><p class="ab5-big"><span class="num">4.9</span> stars from <span class="num">295</span> Google reviews.</p><p>BBB A+ accredited since 2001. Owens Corning Platinum Preferred. $2M liability insurance.</p>{creds("ab5-creds")}</div>
  </div>
  <div class="ab5-two">{fig("ab-bunkwade", PEOPLE[0][2], "ab5-ph")}{fig("ab-rachel", PEOPLE[1][2], "ab5-ph")}</div>
  {aclose("sp-close")}
</div>
'''

# ---------------------------------------------------------------- contact (facts lock only: (937) 746-7377; Rachel
# answers; Monday to Friday, 9 to 5; 38 N Pioneer Blvd, Springboro, OH 45066; the 24 towns from data/towns.js, filled
# in by contact.js). No form: a form with nowhere to send would be a fake action. No "open now" claim anywhere.
MAP = 'https://www.google.com/maps/search/?api=1&amp;query=38+N+Pioneer+Blvd+Springboro+OH+45066'
NUM = '(937) 746-7377'
def maplink(cls='ct-map'): return f'<a class="{cls} rx" href="{MAP}" target="_blank" rel="noopener">Open the office in Google Maps<span class="vh"> (opens in a new tab)</span></a>'
def office(cls, hid):
    return f'<section class="ct-office {cls}" aria-labelledby="{hid}"><h2 class="ct-h2" id="{hid}">The office</h2><address>38 N Pioneer Blvd<br>Springboro, OH 45066</address><p>Rachel answers the phone, Monday to Friday, 9 to 5.</p>{maplink()}</section>'
HRS = '<p class="ct-hours" data-hours>Office hours: Monday to Friday, 9 to 5.</p>'
TSRC = '<p class="ct-src">Miles from the centre of Springboro, from US Census 2023 Gazetteer positions.</p>'

def ct_v1():  # phone first
    return f'''<div class="ct ct1">
  <header class="ct-hero"><h1 class="ct-h1">Call Rachel.</h1><p class="ct1-num num"><a class="rx" href="{TEL}" data-c="call">{NUM}</a></p>{HRS}<p class="ct-sub">Ask for a written, line-by-line estimate. No form to fill in: a person answers.</p></header>
  <div class="ct1-row">{office('ct1-office', 'ct1-o')}<section class="ct1-towns" aria-labelledby="ct1-t"><h2 class="ct-h2" id="ct1-t">The 24 towns we serve</h2><ul class="ct-towns ct-towns--az" data-towns="az" role="list"></ul></section></div>
</div>'''
def ct_v2():  # office and towns by distance
    return f'''<div class="ct ct2">
  <header class="ct-hero"><h1 class="ct-h1">Where we are, and how far we go.</h1><p class="ct-sub">One office in Springboro. 24 towns around it, the farthest 24.4 miles away. Call Rachel at <a class="rx" href="{TEL}" data-c="call">{NUM}</a>.</p></header>
  <div class="ct2-grid">{office('ct2-office', 'ct2-o')}<figure class="ct2-ring"><svg class="ct-ring" data-ring viewBox="-130 -130 260 260" role="img" aria-label="The 24 towns around Springboro, at their true distance and direction"><circle class="ct-ring-c" r="50"/><circle class="ct-ring-c" r="100"/><text class="ct-ring-t" x="4" y="-52">10 mi</text><text class="ct-ring-t" x="4" y="-102">20 mi</text><g class="ct-ring-dots"></g><path class="ct-ring-home" d="M-9 4 L0 -6 L9 4 V12 H-9 Z"/></svg><figcaption>Each dot is a town we serve, at its real distance and direction from the office.</figcaption></figure>
  <section class="ct2-list" aria-labelledby="ct2-t"><h2 class="ct-h2" id="ct2-t">Nearest first</h2><ol class="ct-towns ct-towns--near" data-towns="near" role="list"></ol>{TSRC}</section></div>
</div>'''
def ct_v3():  # the week board
    days = ''.join(f'<li class="ct3-day{" ct3-day--off" if i > 4 else ""}" data-d="{i}"><b>{d}</b><span class="ct3-bar"><i class="ct3-on"></i></span><span class="ct3-h">{"9 to 5" if i < 5 else "Closed"}</span></li>' for i, d in enumerate(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']))
    return f'''<div class="ct ct3">
  <header class="ct-hero"><h1 class="ct-h1">Monday to Friday, 9 to 5.</h1>{HRS}<p class="ct-sub">That's when Rachel answers <a class="rx" href="{TEL}" data-c="call">{NUM}</a>.</p></header>
  <div class="ct3-board"><div class="ct3-scale" aria-hidden="true"><span>Midnight</span><span>9 am</span><span>5 pm</span><span>Midnight</span></div><ol class="ct3-week" role="list">{days}</ol><span class="ct3-now" aria-hidden="true" hidden><span>Now</span></span></div>
  <div class="ct3-row">{office('ct3-office', 'ct3-o')}<section class="ct3-towns" aria-labelledby="ct3-t"><h2 class="ct-h2" id="ct3-t">Towns we serve</h2><ul class="ct-towns ct-towns--cols" data-towns="az" role="list"></ul></section></div>
</div>'''
def ct_v4():  # the business card
    return f'''<div class="ct ct4">
  <header class="ct-hero"><h1 class="ct-h1">Our card, both sides.</h1><p class="ct-sub">Everything you need to reach us fits on a business card.</p></header>
  <div class="ct4-stage"><div class="ct4-card">
    <div class="ct4-face ct4-front"><svg class="ct4-mark" viewBox="0 0 100 56" aria-hidden="true" focusable="false"><path d="{GABLE}"/></svg><p class="ct4-name">Rembrandt Roofing &amp; Restoration</p><p class="ct4-who">Rachel answers</p><p class="ct4-num num"><a class="rx" href="{TEL}" data-c="call">{NUM}</a></p><p class="ct4-hrs">Monday to Friday, 9 to 5</p></div>
    <div class="ct4-face ct4-back"><p class="ct4-name">The office</p><address>38 N Pioneer Blvd<br>Springboro, OH 45066</address><p class="ct4-hrs">A family firm since 1995</p>{maplink('ct4-map')}</div>
  </div><button class="ct4-turn rx" type="button" aria-pressed="false">Turn the card</button></div>
  <section class="ct4-towns" aria-labelledby="ct4-t"><h2 class="ct-h2" id="ct4-t">The 24 towns we serve</h2><ul class="ct-chips" data-towns="near" role="list"></ul>{TSRC}</section>
</div>'''
def ct_v5():  # do we come to you?
    return f'''<div class="ct ct5">
  <header class="ct-hero"><h1 class="ct-h1">Do we come to you?</h1><p class="ct-sub">Type your town. We serve 24 towns around Springboro.</p></header>
  <div class="ct5-grid"><div class="ct5-find"><label class="ct5-lab" for="ct5-in">Your town</label><input class="ct5-in" id="ct5-in" type="text" list="ct5-list" autocomplete="address-level2" spellcheck="false"><datalist id="ct5-list"></datalist><p class="ct5-out" aria-live="polite"></p></div>
  <aside class="ct5-panel" aria-labelledby="ct5-p"><h2 class="ct-h2" id="ct5-p">Call Rachel</h2><p class="ct5-num num"><a class="rx" href="{TEL}" data-c="call">{NUM}</a></p><p>Monday to Friday, 9 to 5.</p><address>38 N Pioneer Blvd<br>Springboro, OH 45066</address>{maplink()}</aside></div>
</div>'''

import sys
want = sys.argv[1:] or ['svcp', 'about', 'contact']
if 'svcp' in want: write('svcp', [svc_v1, svc_v2, svc_v3, svc_v4, svc_v5])
if 'about' in want: write('about', [ab_v1, ab_v2, ab_v3, ab_v4, ab_v5])
if 'contact' in want: write('contact', [ct_v1, ct_v2, ct_v3, ct_v4, ct_v5])
