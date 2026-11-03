"""Siding & painting page: six sections, two versions each. Each function returns (title, v1, v2, css, js)."""
from shell import IM, PAIRS, PLACE, TEL, PHONE, CREDS, esc, icon, cline
from sec_home2 import _house, PROFILES
from sec_home3 import _seam
from sec_windows import steel_close

HARDIE = CREDS[1]


def p1():
    v1 = (f'<div class="sp1">{IM.img("siding0-a", "Milwood, Austin: siding after the work", eager=True)}<div class="wrap sp1-c"><div class="sp1-plate">'
          f'<p class="label">Siding &amp; painting</p><h1 class="h1">The wall, course by course.</h1>{cline()}'
          f'<p class="lead">Siding replacement and repair, and exterior painting. {esc(HARDIE)}.</p>'
          f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary" href="#/siding/visualiser">Try the visualiser</a></div></div></div></div>')
    v2 = (f'<div class="sp2 sec-pad"><div class="wrap sp2-g"><div><p class="label">Siding &amp; painting</p><h1 class="h1">The wall, course by course.</h1>{cline()}'
          f'<p class="lead">Siding replacement and repair, and exterior painting. {esc(HARDIE)}.</p>'
          f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div></div>'
          f'<div class="sp2-art">{IM.img("siding2-a", "Maple Run, Austin: siding after the work")}<span class="cap">Maple Run, Austin</span></div></div></div>')
    css = """
.sp1{position:relative;min-height:calc(100vh - 72px);display:flex;align-items:flex-end} .sp1>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sp1-c{position:relative;width:100%;padding-bottom:var(--space-08)} .sp1-plate{background:var(--color-bg-page);padding:var(--space-08);max-width:680px}
.sp2-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:var(--space-09);align-items:center}
.sp2-art{position:relative;padding:0 0 var(--space-05) var(--space-05);background:repeating-linear-gradient(180deg,var(--neutral-1) 0 31px,var(--neutral-3) 31px 34px,var(--white) 34px 65px,var(--neutral-3) 65px 68px)}
.sp2-art img{display:block;width:100%;height:auto;aspect-ratio:4/3;object-fit:cover} .cap{position:absolute;left:var(--space-05);bottom:var(--space-05);background:var(--color-bg-inverse);color:#fff;font-size:13px;padding:6px 10px}
@media (max-width:900px){.sp2-g{grid-template-columns:minmax(0,1fr)} .sp1-plate{padding:var(--space-06)}}
"""
    return 'Siding hero', v1, v2, css, ''


SN = [0]


def _sample(kind, value=9):
    """a material sample: the profile drawn with light from the top-left, like a physical swatch"""
    SN[0] += 1
    u = f"s{SN[0]}"
    shade = 'rgba(19,22,25,.28)'
    hi = 'rgba(255,255,255,.22)'
    if kind == 'lap':
        art = ''.join(f'<rect x="0" y="{i * 40}" width="240" height="40" fill="url(#{u}lap)"/><path d="M0 {i * 40 + 39}H240" stroke="{shade}" stroke-width="3"/>' for i in range(6))
    elif kind == 'panel':
        art = f'<rect width="240" height="240" fill="url(#{u}flat)"/>' + ''.join(f'<path d="M{x} 0V240" stroke="{shade}" stroke-width="2"/><path d="M{x + 2} 0V240" stroke="{hi}" stroke-width="1"/>' for x in (80, 160))
    elif kind == 'shingle':
        art = f'<rect width="240" height="240" fill="url(#{u}flat)"/>' + ''.join(
            f'<path d="M0 {y}H240" stroke="{shade}" stroke-width="2"/>' + ''.join(f'<path d="M{x + (20 if r % 2 else 0)} {y - 30}V{y}" stroke="{shade}" stroke-width="1.5"/>' for x in range(0, 240, 40))
            for r, y in enumerate(range(30, 241, 30)))
    else:
        art = f'<rect width="240" height="240" fill="url(#{u}flat)"/>' + ''.join(f'<rect x="{x}" y="0" width="12" height="240" fill="url(#{u}bat)"/><path d="M{x + 12} 0V240" stroke="{shade}" stroke-width="3"/>' for x in range(30, 240, 60))
    return (f'<svg class="smp" viewBox="0 0 240 240" aria-hidden="true"><defs>'
            f'<linearGradient id="{u}lap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--steel-{value - 1})"/><stop offset="1" stop-color="var(--steel-{value})"/></linearGradient>'
            f'<linearGradient id="{u}flat" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--steel-{value - 1})"/><stop offset="1" stop-color="var(--steel-{value})"/></linearGradient>'
            f'<linearGradient id="{u}bat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="var(--steel-{value - 2})"/><stop offset="1" stop-color="var(--steel-{value})"/></linearGradient></defs>{art}</svg>')


def p2():
    desc = {'lap': 'Long horizontal boards, each lapping the one below: the classic sided wall.', 'panel': 'Large flat panels with a fine texture and clean joints.',
            'shingle': 'Short staggered pieces that read like cedar shakes.', 'batten': 'Wide vertical boards with narrow battens over the joints.'}
    cards = ''.join(f'<figure class="smp-c">{_sample(k)}<figcaption><b>{t}</b><span>{esc(desc[k])}</span></figcaption></figure>' for k, t in PROFILES)
    v1 = f'<div class="spp1 sec-pad"><div class="wrap"><p class="label">Profiles</p><h2 class="h2">Four ways a wall can look.</h2>{cline()}<div class="smps">{cards}</div></div></div>'
    tabs = ''.join(f'<button type="button" role="tab" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" data-k="{k}" data-d="{esc(desc[k])}">{t}</button>' for i, (k, t) in enumerate(PROFILES))
    samples = ''.join(f'<div class="smp-big" data-k="{k}" {"" if i == 0 else "hidden"}>{_sample(k)}</div>' for i, (k, _) in enumerate(PROFILES))
    # text first in the source and on screen, the figure it changes after it (S0073: visual order matches DOM order)
    v2 = (f'<div class="spp2 sec-pad"><div class="wrap spp2-g"><div><p class="label">Profiles</p><h2 class="h2">Four ways a wall can look.</h2>'
          f'<div class="spp2-t" role="tablist" aria-label="Profiles">{tabs}</div><p class="lead spp2-d" role="tabpanel">{esc(desc["lap"])}</p></div><div class="spp2-s">{samples}</div></div></div>')
    css = """
.smps{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:var(--space-05)} .smp-c{margin:0} .smp{display:block;width:100%;height:auto;box-shadow:0 1px 2px rgba(19,22,25,.12),0 12px 28px rgba(19,22,25,.12)}
.smp-c figcaption{display:grid;gap:4px;margin-top:var(--space-04)} .smp-c b{font:700 20px var(--font-display)} .smp-c span{color:var(--color-text-secondary)}
.spp2-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--space-09);align-items:center} .spp2-s{max-width:520px}
.spp2-t{display:flex;flex-wrap:wrap;gap:var(--space-03);margin-bottom:var(--space-05)} .spp2-t button{min-height:48px;padding:0 var(--space-05);border:1px solid var(--color-border-control);background:var(--color-bg-page);border-radius:var(--radius-sm);font:600 16px var(--font-text);cursor:pointer;color:var(--color-text-primary)}
.spp2-t button[aria-selected=true]{background:var(--color-accent-solid);border-color:var(--color-accent-solid);color:#fff}
@media (max-width:900px){.smps{grid-template-columns:repeat(2,minmax(0,1fr))} .spp2-g{gap:var(--space-06)}}
@media (max-width:600px){.spp2-g{grid-template-columns:minmax(0,1fr)}}   /* stacked in source order: heading and tabs, then the figure they change */
"""
    js = """
(function(){const r=document.querySelector('.spp2');if(!r)return;const tabs=[...r.querySelectorAll('[role=tab]')],d=r.querySelector('.spp2-d');
const pick=b=>{tabs.forEach(x=>{const on=x===b;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;});d.textContent=b.dataset.d;r.querySelectorAll('.smp-big').forEach(s=>s.hidden=s.dataset.k!==b.dataset.k);};
tabs.forEach((b,i)=>{b.addEventListener('click',()=>pick(b));b.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){const n=tabs[(i+k+tabs.length)%tabs.length];n.focus();pick(n);e.preventDefault();}});});})();
"""
    return 'Profiles', v1, v2, css, js


def p3():
    vals = [(3, 'Light'), (5, 'Light-mid'), (7, 'Mid'), (9, 'Mid-deep'), (11, 'Deep'), (12, 'Deepest')]
    ink = lambda k: 'var(--color-text-primary)' if k < 8 else '#fff'
    bands = ''.join(f'<div class="cw-b" style="background:var(--steel-{k});color:{ink(k)}"><span class="cw-n">{esc(n)}</span><span class="cw-t">{t}</span></div>'
                    for (k, n), t in zip(vals, ['Keeps the wall coolest', 'Soft, shows little fading', 'Easy on mixed light', 'Shows the shadow lines', 'Strong against white trim', 'Deepest; trim reads sharp']))
    v1 = (f'<div class="cw1"><div class="wrap cw-h"><p class="label">Colour</p><h2 class="h2">Lightness first. Colour second.</h2>'
          f'<p class="lead">Six value steps, shown in the brand’s own steel. Pick a value here; choose the actual colour with the firm.</p></div><div class="cw-bs">{bands}</div></div>')
    tiles = ''.join(f'<div class="cw-t2" style="background:var(--steel-{k});color:{"var(--color-text-primary)" if k < 8 else "#fff"}"><span>{k:02d}</span></div>' for k in range(1, 13))
    v2 = (f'<div class="cw2 sec-pad"><div class="wrap cw2-g"><div><p class="label">Colour</p><h2 class="h2">A deck, not a guess.</h2>'
          f'<p class="lead">Twelve steps from light to deep. Pick a value here; choose the actual colour with the firm.</p></div>'
          f'<div class="cw2-d" aria-hidden="true">{tiles}</div></div></div>')
    css = """
.cw1{padding-top:var(--layout-section-pad)} .cw-h{margin-bottom:var(--space-07)} .cw-b{display:flex;justify-content:space-between;align-items:center;gap:var(--space-05);min-height:96px;padding:0 max(var(--layout-gutter),calc((100vw - var(--layout-max-width))/2 + var(--layout-gutter)))}
.cw-n{font:800 var(--type-h3-size) var(--font-display)} .cw-t{font:600 16px var(--font-text)}
.cw2-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:var(--space-09);align-items:center} .cw2-d{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
.cw-t2{aspect-ratio:1;display:flex;align-items:flex-end;padding:10px;font:600 13px var(--font-text);border-radius:var(--radius-sm)}
@media (max-width:900px){.cw2-g{grid-template-columns:minmax(0,1fr)} .cw-b{flex-direction:column;align-items:flex-start;justify-content:center;gap:2px}}
"""
    return 'Colour wall', v1, v2, css, ''


def p4():
    vals = [('3', 'Light'), ('6', 'Mid'), ('9', 'Steel'), ('11', 'Deep')]
    trims = [('white', 'White'), ('steel-12', 'Black-steel')]
    sp = lambda name, opts, chk: ''.join(f'<label class="vc"><input type="radio" name="{name}" value="{v}" {"checked" if v == chk else ""}> {t}</label>' for v, t in opts)
    steps = [('Profile', sp('vs1p', PROFILES, 'lap')), ('Colour', sp('vs1c', vals, '9')), ('Trim', sp('vs1t', trims, 'white')), ('Preview', '<dl class="vsum"></dl>')]
    panes = ''.join(f'<fieldset class="vstep" data-i="{i}" {"" if i == 0 else "hidden"}><legend class="h3">Step {i + 1} of 4 · {t}</legend><div class="vs-o">{b}</div></fieldset>' for i, (t, b) in enumerate(steps))
    prog = ''.join(f'<li data-i="{i}"{" aria-current=step" if i == 0 else ""}>{t}</li>' for i, (t, _) in enumerate(steps))
    v1 = (f'<div class="vs1 sec-pad" id="siding-visualiser" data-vz="vs1"><div class="wrap vz-g"><div><p class="label">Visualiser</p><h2 class="h2">Build your wall.</h2>'
          f'<ol class="vprog">{prog}</ol><div class="vpanes">{panes}</div><div class="row vnav"><button type="button" class="btn btn-secondary" data-go="-1">Back</button>'
          f'<button type="button" class="btn btn-primary" data-go="1">Next {icon("action-arrow-right", 20)}</button><a class="btn btn-primary vbook" href="#/about/booking" hidden>Book an estimate with this</a></div>'
          f'<p class="small">Nothing is sent from here. Your choices go with your estimate request when you book.</p></div><div class="vz-pv">{_house("vs1")}</div></div></div>')
    st = ''.join(f'<fieldset class="vs"><legend><b>{i + 1}</b> {t}</legend><div class="vs-o">{b.replace("vs1", "vs2")}</div></fieldset>' for i, (t, b) in enumerate(steps[:3]))
    v2 = (f'<div class="vs2 sec-pad" data-vz="vs2"><div class="wrap vz-g"><div class="vz-pv vz-pv2">{_house("vs2")}</div><div><p class="label">Visualiser</p><h2 class="h2">Build your wall.</h2>{st}'
          f'<fieldset class="vs"><legend><b>4</b> Preview</legend><dl class="vsum"></dl><a class="btn btn-primary" href="#/about/booking">Book an estimate with this</a></fieldset></div></div></div>')
    css = """
.vprog{display:flex;gap:4px;list-style:none;padding:0;margin:0 0 var(--space-05)} .vprog li{flex:1;padding:10px 0 0;border-top:3px solid var(--color-border-default);font:600 14px var(--font-text);color:var(--color-text-secondary)}
.vprog li[aria-current]{border-color:var(--color-accent-solid);color:var(--color-text-primary)} .vprog li.done{border-color:var(--steel-7)}
.vstep{border:0;padding:0;margin:0 0 var(--space-05)} .vnav{margin-bottom:var(--space-04)}
.vsum{display:grid;grid-template-columns:auto 1fr;gap:6px var(--space-05);margin:0 0 var(--space-04)} .vsum dt{font-weight:600;color:var(--color-text-secondary)} .vsum dd{margin:0;font-weight:700}
@media (min-width:901px){.vz-pv2{order:0}}
"""
    js = """
(function(){document.querySelectorAll('[data-vz^="vs"]').forEach(root=>{const id=root.dataset.vz,sum=root.querySelector('.vsum');
  const summ=()=>{const g=n=>{const i=root.querySelector(`input[name="${id}${n}"]:checked`);return i?i.parentElement.textContent.trim():'';};
    sum.innerHTML=`<dt>Profile</dt><dd>${g('p')}</dd><dt>Colour</dt><dd>${g('c')}</dd><dt>Trim</dt><dd>${g('t')}</dd>`;};root.addEventListener('change',summ);summ();
  const panes=[...root.querySelectorAll('.vstep')];if(!panes.length)return;let i=0;const prog=[...root.querySelectorAll('.vprog li')],back=root.querySelector('[data-go="-1"]'),next=root.querySelector('[data-go="1"]'),book=root.querySelector('.vbook');
  const show=n=>{i=Math.max(0,Math.min(3,n));panes.forEach((p,k)=>p.hidden=k!==i);prog.forEach((l,k)=>{l.toggleAttribute('aria-current',k===i);if(k===i)l.setAttribute('aria-current','step');l.classList.toggle('done',k<i);});
    back.disabled=i===0;next.hidden=i===3;book.hidden=i!==3;const lg=panes[i].querySelector('legend');lg.setAttribute('tabindex','-1');if(document.activeElement&&root.contains(document.activeElement))lg.focus();};
  back.addEventListener('click',()=>show(i-1));next.addEventListener('click',()=>show(i+1));show(0);});})();
"""
    return 'Visualiser', v1, v2, css, js


def p5():
    sid = [i for i, p in enumerate(PAIRS) if p['id'] in ('robroy', 'siding0', 'siding2')]
    chips = ''.join(f'<label class="chip-in"><input type="radio" name="ss1" value="{i}" {"checked" if i == sid[0] else ""}> {esc(PAIRS[i]["place"])}</label>' for i in sid)
    v1 = (f'<div class="ss1 sec-pad"><div class="wrap sm-g">{_seam("", sid[0])}<div><p class="label">Siding, before and after</p><h2 class="h2 ss-h" aria-live="polite">{esc(PAIRS[sid[0]]["place"])}</h2>'
          f'<p class="lead">Drag the seam, or focus it and use the arrow keys.</p><fieldset class="chips"><legend class="label">Pick a job</legend>{chips}</fieldset></div></div></div>')
    trio = ''.join(f'<figure class="ss2-f">{_seam("", i)}<figcaption>{esc(PAIRS[i]["place"])}</figcaption></figure>' for i in sid)
    v2 = f'<div class="ss2 sec-pad"><div class="wrap"><p class="label">Siding, before and after</p><h2 class="h2">Three walls, three seams.</h2>{cline()}<div class="ss2-g">{trio}</div></div></div>'
    css = """
.ss2-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-05)} .ss2-f{margin:0} .ss2-f figcaption{margin-top:var(--space-03);font-weight:700}
.ss2-f .seam-h{width:44px;height:44px} @media (max-width:900px){.ss2-g{grid-template-columns:minmax(0,1fr)}}
"""
    js = """
(function(){const PLs=%s;document.querySelectorAll('input[name=ss1]').forEach(r=>r.addEventListener('change',()=>{const s=r.closest('.ss1');s.querySelector('[data-seam]')._show(+r.value);s.querySelector('.ss-h').textContent=PLs[+r.value];}));})();
""" % ('[' + ','.join(f'"{esc(p["place"])}"' for p in PAIRS) + ']')
    return 'Siding pairs', v1, v2, css, js


def p6():
    v1 = (f'<div class="sc1 sec-pad"><div class="wrap sc-g"><div><p class="label">Credential</p><p class="sc-c">{esc(HARDIE)}</p></div>'
          f'<div>{cline()}<h2 class="h2">Book the estimate.</h2><div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a>'
          f'<a class="btn btn-secondary" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div></div></div></div>')
    v2 = steel_close(HARDIE)
    css = """
.sc-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.3fr);gap:var(--space-09);align-items:end} .sc-c{font:800 var(--type-h3-size)/1.25 var(--font-display);margin:0;max-width:20ch}
.sc2 .btn-primary{background:#fff;color:var(--color-text-primary)} .sc2 .btn-primary:hover{background:var(--steel-2)} .sc2-p{color:#fff;font:700 22px var(--font-text);min-height:48px;display:inline-flex;align-items:center}
.sc2 :focus-visible{outline-color:#fff} @media (max-width:900px){.sc-g{grid-template-columns:minmax(0,1fr)}}
.scf{position:relative;overflow:hidden;background:var(--color-bg-accent-field);color:var(--color-text-on-accent)} .scf canvas{position:absolute;inset:0;width:100%;height:100%}
.scf-c{position:relative} .scf-l{color:var(--steel-3)} .scf-h{color:#fff}
"""
    return 'Credential and close', v1, v2, css, ''


SIDING = [p1, p2, p3, p4, p5, p6]
