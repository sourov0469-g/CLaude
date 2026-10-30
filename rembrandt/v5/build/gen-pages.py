# R4 inner pages: writes src/sections/<page>/v1-v5.html from ONE fact list per page, so the five layouts of a page carry
# the same, traceable copy (AUDIT-R4.md §1 facts; TRACEABILITY.md "R4 pages"). Run: python3 -I build/gen-pages.py
# Every sentence below comes from the facts lock or the firm's own published lines (rembrandt-pack.md §3/§5.6, flag C12).
# No prices, no warranties, no guarantees, no promise about insurance claims.
import os, html
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

def write(page, gens):
    d = os.path.join(SEC, page); os.makedirs(d, exist_ok=True)
    for i, g in enumerate(gens, 1):
        open(os.path.join(d, f'v{i}.html'), 'w').write(g())
    print(page, len(gens))

write('svcp', [svc_v1, svc_v2, svc_v3, svc_v4, svc_v5])
