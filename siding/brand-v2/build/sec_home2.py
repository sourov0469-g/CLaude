"""Homepage sections 5-8, two versions each. Each function returns (title, v1_html, v2_html, css, js)."""
from shell import IM, RECORD, esc, icon, cline, ill
from sec_home import _dots

# ----------------------------------------------------------------------------------------------------------- 5 wall assembly
def _wall_svg(cls=''):
    boards = ''.join(f'<path class="w-board w-p" data-k="{3 + (4 - i)}" d="M596 {150 + i * 104}L560 {262 + i * 104}H596Z"/>' for i in range(5))
    # the face of the same wall, left of the cut edge: one course per board, with the shadow line under its butt (the mark's idea, drawn out)
    boards += ''.join(f'<g class="w-p" data-k="{3 + (4 - i)}"><rect class="w-face" x="404" y="{158 + i * 104}" width="152" height="104"/>'
                      f'<path class="w-shadow" d="M404 {256 + i * 104}H556"/></g>' for i in range(5))
    return (f'<svg class="wall {cls}" viewBox="400 20 540 740" role="img" aria-label="A sided wall cut at the corner: its face of five courses beside the section of stud, sheathing, weather wrap and five lapped boards">'
            f'<path class="w-line" d="M400 40H940" pathLength="1"/><rect class="w-p w-stud" data-k="0" x="620" y="110" width="150" height="600"/>'
            f'<path class="w-p w-sheath" data-k="1" d="M609 110V710"/><path class="w-p w-wrap" data-k="2" d="M598 110V710"/>{boards}'
            f'<path class="w-base" d="M560 726V740H940" pathLength="1"/>'
            f'<g class="w-lab"><text class="w-p" data-k="0" x="786" y="170">STUD</text><text class="w-p" data-k="1" x="786" y="250">SHEATHING</text>'
            f'<text class="w-p" data-k="2" x="786" y="330">WRAP</text><text class="w-p" data-k="3" x="786" y="410">BOARDS</text></g></svg>')


S5_CSS = """
.on-dark{background:var(--color-bg-deep);color:var(--color-text-inverse)} .on-dark-l{color:var(--steel-5)} .on-dark-h{color:#fff} .on-dark-p{color:var(--steel-3)}
.wa1{position:relative;padding:var(--layout-section-pad) 0} .wa1 .wa-stick{position:static;height:auto;min-height:0} .wa-stick{position:sticky;top:72px;height:calc(100vh - 72px);min-height:560px;display:flex;align-items:center;overflow:hidden}
.wa-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:var(--space-08);align-items:center;width:100%}
.wall{width:100%;height:auto;max-height:calc(100vh - 150px)} .w-line,.w-base{fill:none;stroke:var(--steel-6);stroke-width:4;stroke-dasharray:1;stroke-dashoffset:1}
.w-stud{fill:none;stroke:var(--steel-8);stroke-width:4} .w-sheath{stroke:var(--steel-9);stroke-width:16} .w-wrap{stroke:var(--steel-7);stroke-width:4;stroke-dasharray:12 9}
.w-board{fill:var(--steel-12);stroke:var(--steel-6);stroke-width:4;stroke-linejoin:miter} .w-face{fill:var(--steel-9)} .w-shadow{stroke:var(--steel-11);stroke-width:6} .w-lab text{font:600 19px var(--font-text);letter-spacing:.08em;fill:var(--steel-6)}
.js [data-wa1] .w-p{opacity:0}
.w-steps{list-style:none;padding:0;margin:var(--space-06) 0 0;display:grid;gap:6px;color:var(--steel-5);font:600 15px var(--font-text)}
.w-steps li{padding-left:22px;position:relative} .w-steps li::before{content:"";position:absolute;left:0;top:.6em;width:12px;height:3px;background:var(--steel-10)} .w-steps li.done{color:#fff} .w-steps li.done::before{background:var(--steel-6)}
.wall2 .w-line,.wall2 .w-base{stroke-dashoffset:0} .wall2 .w-p{transition:opacity var(--duration-moderate) var(--ease-standard)} .wall2 .w-p.off{opacity:.12} .wall2 text.w-p.off{opacity:1}
.wa2-tl{display:grid;gap:6px;margin:var(--space-06) 0 var(--space-05)} .wa2-tl button{min-height:48px;text-align:left;padding:0 var(--space-05);background:transparent;border:1px solid var(--steel-10);color:var(--steel-3);font:600 16px var(--font-text);border-radius:var(--radius-sm);cursor:pointer}
.wa2-tl button[aria-selected=true]{background:#fff;color:var(--color-text-primary);border-color:#fff}
@media (max-width:900px){.wa-g{grid-template-columns:minmax(0,1fr);gap:var(--space-04)} .w-lab{display:none} .wall{max-height:46vh}
 .wa1 .wa-stick{padding-top:0} .wa1 .h2{font-size:1.75rem;margin-bottom:var(--space-03)} .wa1 .lead{font-size:16px;margin-bottom:0}
 .wa1 .w-steps{grid-template-columns:repeat(2,minmax(0,1fr));margin-top:var(--space-04);font-size:14px} .wa1 .wall{max-height:34vh} .wa1 .ill{font-size:12px}}
"""

S5_JS = """
(function(){const A=window.APS,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
function bez(x1,y1,x2,y2){return t=>{let lo=0,hi=1,u=t;for(let i=0;i<24;i++){u=(lo+hi)/2;const x=3*(1-u)*(1-u)*u*x1+3*(1-u)*u*u*x2+u*u*u;if(x<t)lo=u;else hi=u;}return 3*(1-u)*(1-u)*u*y1+3*(1-u)*u*u*y2+u*u*u;}}
const settle=bez(.34,1.3,.5,1);
const w=document.querySelector('[data-wa1]');if(w){const L=[...w.querySelectorAll('.w-p')],li=[...w.querySelectorAll('.w-steps li')],wl=w.querySelector('.w-line'),wb=w.querySelector('.w-base'),K=8;
  const set=p=>{p=cl(p,0,1);wl.style.strokeDashoffset=1-cl(p*K/1.2,0,1);wb.style.strokeDashoffset=1-cl((p-.92)/.08,0,1);
    L.forEach(e=>{const lp=cl(p*K*1.05-(+e.dataset.k)-.2,0,1);if(e.classList.contains('w-board')){const s=A.reduce?(lp>0?1:0):settle(lp);e.style.opacity=lp>0?1:0;e.style.transform=`translateY(${(1-s)*-40}px)`;}else e.style.opacity=A.reduce?(lp>0?1:0):lp;});
    li.forEach(x=>x.classList.toggle('done',p*K*1.05-(+x.dataset.k)-.2>0));};
  set(0);A.track(w,set);window.__wa1=set;}   // scroll-linked, not pinned (S0019: pin 1-2 sections per page)
const t=document.querySelector('[data-wa2]');if(t){const tabs=[...t.querySelectorAll('[role=tab]')],panel=t.querySelector('[role=tabpanel]'),L=[...t.querySelectorAll('.w-p')];
  const pick=b=>{tabs.forEach(x=>{const on=x===b;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;});panel.textContent=b.dataset.d;panel.setAttribute('aria-labelledby',b.id);
    const show=b.dataset.show.split(',').map(Number);L.forEach(e=>e.classList.toggle('off',!show.includes(+e.dataset.k)));};
  tabs.forEach((b,i)=>{b.addEventListener('click',()=>pick(b));b.addEventListener('keydown',e=>{const d={ArrowDown:1,ArrowRight:1,ArrowUp:-1,ArrowLeft:-1}[e.key];if(d){const n=tabs[(i+d+tabs.length)%tabs.length];n.focus();pick(n);e.preventDefault();}});});pick(tabs[0]);}
})();
"""



_wall_svg_raw = _wall_svg


def _wall_svg(*a, **k):
    return ill(_wall_svg_raw(*a, **k))

def s5():
    steps = ['Stud', 'Sheathing', 'Weather wrap', 'First course', 'Second course', 'Third course', 'Fourth course', 'Fifth course']
    ol = ''.join(f'<li data-k="{i}">{s}</li>' for i, s in enumerate(steps))
    head = '<p class="label on-dark-l">How a wall goes together</p><h2 class="h2 on-dark-h">Each board laps the one below it.</h2>'
    v1 = (f'<div class="wa1 on-dark" data-wa1><div class="wa-stick"><div class="wrap wa-g"><div>{head}'
          f'<p class="lead on-dark-p">As you scroll past, the wall builds in the order the crew does it.</p><ol class="w-steps">{ol}</ol></div>{_wall_svg()}</div></div></div>')
    tabs = [('Stud & sheathing', [0, 1], 'The frame, and the solid layer the siding fastens through.'),
            ('Weather wrap', [0, 1, 2], 'A water-resistant layer that sheds what gets behind the boards.'),
            ('Lapped courses', list(range(8)), 'Boards go on from the bottom up, each one lapping the board below it.'),
            ('Trim & finish', list(range(8)), 'Trim closes the edges, and paint or the factory finish seals the face.')]
    tl = ''.join(f'<button type="button" role="tab" id="wa2-t{i}" aria-controls="wa2-p" aria-selected="{"true" if i == 0 else "false"}" tabindex="{0 if i == 0 else -1}" '
                 f'data-show="{",".join(map(str, k))}" data-d="{esc(d)}">{i + 1}. {esc(t)}</button>' for i, (t, k, d) in enumerate(tabs))
    v2 = (f'<div class="wa2 on-dark sec-pad" data-wa2><div class="wrap wa-g"><div>{head}<div class="wa2-tl" role="tablist" aria-label="Wall layers">{tl}</div>'
          f'<p class="lead on-dark-p" id="wa2-p" role="tabpanel" aria-labelledby="wa2-t0">{esc(tabs[0][2])}</p></div>{_wall_svg("wall2")}</div></div>')
    return 'Wall assembly', v1, v2, S5_CSS, S5_JS


# ----------------------------------------------------------------------------------------------------------- 6 colour as content
def s6():
    steps = [('Light', 3), ('Light-mid', 5), ('Mid', 7), ('Mid-deep', 9), ('Deep', 11), ('Deepest', 12)]
    txt = ('<p class="lead">Light colours keep a wall cooler and show less fading; deep colours make the shadow lines stand out. '
           'Pick the lightness first; choose the actual colour with the firm.</p>')
    ink = lambda k: 'var(--color-text-primary)' if k < 8 else '#fff'
    f1 = ''.join(f'<div class="cf" style="background:var(--steel-{k});color:{ink(k)}"><span>{esc(n)}</span></div>' for n, k in steps)
    v1 = (f'<div class="co1"><div class="co1-f" aria-hidden="true">{f1}</div><div class="wrap co-c"><div class="co-plate"><p class="label">Choosing a colour</p>'
          f'<h2 class="h2">Lightness first.<br>Colour second.</h2>{txt}</div></div></div>')
    f2 = ''.join(f'<div class="cb" style="background:var(--steel-{k});color:{ink(k)}"><span>{esc(n)}</span></div>' for n, k in steps)
    v2 = (f'<div class="co2"><div class="wrap co2-g"><div><p class="label">Choosing a colour</p><h2 class="h2">Every course,<br>one value.</h2>{txt}</div>'
          f'<div class="co2-w" aria-hidden="true">{f2}</div></div></div>')
    css = """
.co1{position:relative;min-height:min(100vh,860px);display:flex;align-items:center} .co1-f{position:absolute;inset:0;display:grid;grid-template-columns:repeat(6,1fr)}
.cf{display:flex;align-items:flex-end;padding:var(--space-05);font:700 16px var(--font-text)} .co-c{position:relative;width:100%}
.co-plate{background:var(--color-bg-page);padding:var(--space-08);max-width:620px}
.co2{padding:var(--layout-section-pad) 0} .co2-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:var(--space-09);align-items:center}
.co2-w{display:grid} .cb{height:84px;display:flex;align-items:center;padding:0 var(--space-05);font:700 16px var(--font-text);box-shadow:inset 0 -6px 0 rgba(19,22,25,.16)} .cb:nth-child(odd){margin-left:8px}
@media (max-width:900px){.co1-f{grid-template-columns:repeat(3,1fr)} .co-plate{padding:var(--space-06)} .co2-g{grid-template-columns:minmax(0,1fr)}}
"""
    return 'Colour as content', v1, v2, css, ''


# ----------------------------------------------------------------------------------------------------------- 7 visualiser entry
PROFILES = [('lap', 'Lap'), ('panel', 'Panel'), ('shingle', 'Shingle'), ('batten', 'Board & batten')]


def _house(cls):
    return (f'<svg class="{cls}" viewBox="0 0 400 360" role="img" aria-label="Preview of a house front with the chosen siding">'
            f'<defs><pattern id="{cls}-lap" width="40" height="22" patternUnits="userSpaceOnUse"><path d="M0 21H40" stroke="rgba(19,22,25,.28)" stroke-width="2"/></pattern>'
            f'<pattern id="{cls}-panel" width="40" height="80" patternUnits="userSpaceOnUse"><path d="M39 0V80" stroke="rgba(19,22,25,.2)" stroke-width="1.5"/></pattern>'
            f'<pattern id="{cls}-shingle" width="20" height="18" patternUnits="userSpaceOnUse"><path d="M0 17H20M10 0V17" stroke="rgba(19,22,25,.24)" stroke-width="1.5"/></pattern>'
            f'<pattern id="{cls}-batten" width="30" height="80" patternUnits="userSpaceOnUse"><path d="M28 0V80" stroke="rgba(19,22,25,.32)" stroke-width="5"/></pattern></defs>'
            f'<path class="vz-wall" d="M40 150L200 40L360 150V340H40Z"/><path class="vz-tex" d="M40 150L200 40L360 150V340H40Z" fill="url(#{cls}-lap)"/>'
            f'<path class="vz-trim" d="M34 150L200 34L366 150" stroke-width="10"/><rect class="vz-trimr" x="160" y="230" width="80" height="110" stroke-width="8"/>'
            f'<rect x="166" y="236" width="68" height="104" fill="var(--steel-12)"/><rect class="vz-trimr" x="72" y="190" width="64" height="64" stroke-width="7"/>'
            f'<rect class="vz-trimr" x="264" y="190" width="64" height="64" stroke-width="7"/></svg>')


def s7():
    tiles = ''.join(f'<label class="vt"><input type="radio" name="vz1p" value="{k}" {"checked" if k == "lap" else ""}><span class="vt-b">{icon("trade-siding", 28)}<b>{t}</b></span></label>' for k, t in PROFILES)
    v1 = (f'<div class="vz1 sec-pad" data-vz="vz1"><div class="wrap vz-g"><div><p class="label">Visualiser</p><h2 class="h2">Start with the profile.</h2>'
          f'<p class="lead">Choose how the boards look on the wall. The full visualiser on the siding page then takes you through colour, trim and a preview.</p>'
          f'<fieldset class="vts"><legend class="sr">Siding profile</legend>{tiles}</fieldset><a class="btn btn-primary" href="#/siding">Continue to colour {icon("action-arrow-right", 20)}</a></div>'
          f'<div class="vz-pv">{_house("vz1")}</div></div></div>')
    vals = [('3', 'Light'), ('6', 'Mid'), ('9', 'Steel'), ('11', 'Deep')]
    trims = [('white', 'White'), ('steel-12', 'Black-steel')]
    sp = lambda name, opts, chk: ''.join(f'<label class="vc"><input type="radio" name="{name}" value="{v}" {"checked" if v == chk else ""}> {t}</label>' for v, t in opts)
    steps = [('Profile', sp('vz2p', PROFILES, 'lap')), ('Colour', sp('vz2c', vals, '9')), ('Trim', sp('vz2t', trims, 'white')),
             ('Preview', '<p class="small" style="margin:0 0 12px">This is your choice so far. It goes with your estimate request, so the person who calls you sees it.</p>'
                         '<a class="btn btn-primary" href="#/about/booking">Book an estimate</a>')]
    st = ''.join(f'<fieldset class="vs"><legend><b>{i + 1}</b> {t}</legend><div class="vs-o">{b}</div></fieldset>' for i, (t, b) in enumerate(steps))
    v2 = (f'<div class="vz2 sec-pad" data-vz="vz2"><div class="wrap vz-g"><div><p class="label">Visualiser</p><h2 class="h2">Build your wall in four steps.</h2>{st}</div>'
          f'<div class="vz-pv">{_house("vz2")}</div></div></div>')
    css = """
.vz-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:var(--space-09);align-items:center}
.vz-pv{background:var(--color-bg-subtle);display:grid;place-items:center;padding:var(--space-07)} .vz-pv svg{width:100%;max-width:440px;height:auto}
.vz-wall{fill:var(--steel-9);transition:fill var(--duration-normal) var(--ease-standard)} .vz-trim,.vz-trimr{stroke:#fff;fill:none;transition:stroke var(--duration-normal) var(--ease-standard)}
.vts{border:0;padding:0;margin:0 0 var(--space-06);display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-03)}
.vt{position:relative;cursor:pointer} .vt input{position:absolute;opacity:0;inset:0} .vt-b{display:flex;align-items:center;gap:var(--space-03);min-height:64px;padding:0 var(--space-05);border:1px solid var(--color-border-control);border-radius:var(--radius-sm)}
.vt input:checked+.vt-b{background:var(--color-bg-accent-subtle);box-shadow:inset 0 0 0 2px var(--steel-11)} .vt input:focus-visible+.vt-b{outline:3px solid var(--color-focus-ring);outline-offset:3px} .vt-b svg{color:var(--color-accent-solid)}
.vs{border:0;border-top:1px solid var(--color-border-default);padding:var(--space-04) 0;margin:0} .vs legend{font:700 16px var(--font-text);padding:var(--space-03) 0}
.vs legend b{display:inline-grid;place-items:center;width:28px;height:28px;background:var(--color-accent-solid);color:#fff;border-radius:var(--radius-sm);margin-right:8px;font-size:14px}
.vs-o{display:flex;flex-wrap:wrap;gap:var(--space-03)} .vc{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 var(--space-04);border:1px solid var(--color-border-control);border-radius:var(--radius-sm);cursor:pointer}
.vc:has(input:checked){background:var(--color-bg-accent-subtle);box-shadow:inset 0 0 0 2px var(--steel-11)} .vc input{accent-color:var(--steel-9);margin:0}
@media (max-width:900px){.vz-g{grid-template-columns:minmax(0,1fr)}}
"""
    js = """
(function(){const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
document.querySelectorAll('[data-vz]').forEach(root=>{const id=root.dataset.vz,wall=root.querySelector('.vz-wall'),tex=root.querySelector('.vz-tex'),trims=root.querySelectorAll('.vz-trim,.vz-trimr');
  const upd=()=>{const pr=root.querySelector(`input[name="${id}p"]:checked`);if(pr)tex.setAttribute('fill',`url(#${id}-${pr.value})`);
    const c=root.querySelector(`input[name="${id}c"]:checked`);if(c)wall.style.fill=css('--steel-'+c.value);const t=root.querySelector(`input[name="${id}t"]:checked`);
    if(t)trims.forEach(e=>e.style.stroke=t.value==='white'?'#fff':css('--steel-12'));};
  root.addEventListener('change',upd);upd();});})();
"""
    return 'Visualiser', v1, v2, css, js


# ----------------------------------------------------------------------------------------------------------- 8 map preview (static)
def s8():
    v1 = (f'<div class="mp1 sec-pad"><div class="wrap"><p class="label">Where the work is</p><h2 class="h2">Around the office, job by job.</h2>{cline()}'
          f'<div class="mp1-m">{_dots("nd-d on")}</div><div class="row mp1-r"><p class="rec-s" style="margin:0">{esc(RECORD)}</p>'
          f'<a class="btn btn-secondary" href="#/work">Open the map {icon("action-arrow-right", 20)}</a></div></div></div>')
    jobs = [('home2-a', 'Anderson Mill, Austin'), ('windows3-a', 'Maple Run, Austin'), ('siding0-a', 'Milwood, Austin')]
    ph = ''.join(f'<figure class="mp2-f">{IM.img(k, f"{pl}: after the work")}<figcaption>{esc(pl)}</figcaption></figure>' for k, pl in jobs)
    v2 = (f'<div class="mp2 sec-pad"><div class="wrap mp2-g"><div><p class="label">Where the work is</p><h2 class="h2">Three finished jobs.</h2>'
          f'<p class="lead">{esc(RECORD)}. Each dot on the map is a job with photos.</p><div class="mp2-m">{_dots("nd-d on")}</div>'
          f'<a class="btn btn-secondary" href="#/work">Open the map {icon("action-arrow-right", 20)}</a></div><div class="mp2-p">{ph}</div></div></div>')
    css = """
.mp1-m{background:var(--color-bg-subtle);padding:var(--space-06);display:grid;place-items:center} .mp1-m .nd{max-height:520px;width:auto;max-width:100%}
.mp1-r{justify-content:space-between;margin-top:var(--space-05)}
.mp2-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:var(--space-09);align-items:start} .mp2-m{background:var(--color-bg-subtle);padding:var(--space-04);margin-bottom:var(--space-05)} .mp2-m .nd{max-height:280px}
.mp2-p{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--space-04)} .mp2-f{margin:0;position:relative} .mp2-f:first-child{grid-column:1/-1}
.mp2-f img{width:100%;height:100%;aspect-ratio:3/2;object-fit:cover;display:block} .mp2-f figcaption{position:absolute;left:0;bottom:0;background:var(--color-bg-inverse);color:#fff;font-size:13px;padding:6px 10px}
@media (max-width:900px){.mp2-g{grid-template-columns:minmax(0,1fr)}}
"""
    return 'Map preview', v1, v2, css, ''
