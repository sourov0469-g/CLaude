"""Homepage sections 9-11, two versions each. Each function returns (title, v1_html, v2_html, css, js)."""
from shell import IM, PAIRS, PLACE, TRADE, TEL, PHONE, HOURS, REVIEWS, RECORD, CREDS, esc, icon, cline


def pair_store():
    """every pair's photos, held once; the seams read their sources from here"""
    out = []
    for p in PAIRS:
        for ab, w in (('a', 'After'), ('b', 'Before')):
            out.append(IM.img(f'{p["id"]}-{ab}', f'{w}: {p["place"]}'))
    return f'<div class="pstore" hidden aria-hidden="true">{"".join(out)}</div>'


def _seam(cls, start):
    p = PAIRS[start]
    return (f'<div class="seam {cls}" data-seam data-i="{start}"><img class="sa" data-img="{p["id"]}-a" alt="After: {esc(p["place"])}" width="1000" height="667">'
            f'<div class="sb-c"><img class="sb" data-img="{p["id"]}-b" alt="Before: {esc(p["place"])}" width="1000" height="667"></div>'
            f'<div class="seam-l"><div class="seam-h" role="slider" tabindex="0" aria-label="Before and after divider" aria-valuemin="5" aria-valuemax="95" aria-valuenow="50" aria-valuetext="50% before">{icon("trade-seam", 28, "#fff")}</div></div>'
            f'<span class="tag tb">Before</span><span class="tag ta">After</span></div>')


def s9():
    start = [p['id'] for p in PAIRS].index('siding2')
    chips = ''.join(f'<label class="chip-in"><input type="radio" name="sm1" value="{i}" {"checked" if i == start else ""}> {esc(p["place"])} · {TRADE[p["id"]]}</label>' for i, p in enumerate(PAIRS))
    v1 = (f'<div class="sm1 sec-pad">{pair_store()}<div class="wrap sm-g">{_seam("", start)}<div><p class="label">Before and after</p>'
          f'<h2 class="h2 sm-h" aria-live="polite">{esc(PLACE["siding2"])}</h2><p class="lead">Drag the seam, or focus it and use the arrow keys. Six of the 177 genuine pairs are here; the rest are on the Our work page.</p>'
          f'<fieldset class="chips"><legend class="label">Pick a job</legend>{chips}</fieldset></div></div></div>')
    idx = ''.join(f'<li><button type="button" data-i="{i}" aria-pressed="{"true" if i == start else "false"}"><b>{esc(p["place"])}</b><span>{TRADE[p["id"]]}</span></button></li>' for i, p in enumerate(PAIRS))
    v2 = (f'<div class="sm2">{_seam("seam-full", start)}<div class="sm2-ix"><p class="label">Before and after</p><p class="sm2-n">Six of 177 genuine pairs</p>'
          f'<ol class="sm2-l">{idx}</ol><a class="lnk" href="#/work">All pairs on Our work {icon("action-arrow-right", 16)}</a></div></div>')
    css = """
.sm-g{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:var(--space-09);align-items:center}
.seam{position:relative;aspect-ratio:3/2;overflow:hidden;touch-action:pan-y;user-select:none;cursor:ew-resize;background:var(--color-bg-sunken)}
.seam img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none} .sb-c{position:absolute;inset:0;clip-path:inset(0 50% 0 0)}
.seam-l{position:absolute;top:0;bottom:0;left:50%;width:3px;margin-left:-1.5px;background:#fff} .seam-h{position:absolute;top:50%;left:50%;width:56px;height:56px;transform:translate(-50%,-50%);background:var(--color-accent-solid);display:grid;place-items:center;border-radius:var(--radius-sm)}
.seam-h:focus-visible{outline:3px solid #fff;outline-offset:3px;box-shadow:0 0 0 6px var(--steel-9)}
.tag{position:absolute;bottom:16px;background:var(--color-bg-inverse);color:#fff;font:600 14px var(--font-text);padding:6px 12px} .tb{left:16px} .ta{right:16px}
.chips{border:0;padding:0;margin:var(--space-05) 0 0;display:flex;flex-wrap:wrap;gap:var(--space-03)} .chips legend{padding:0}
.chip-in{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 var(--space-04);border:1px solid var(--color-border-control);border-radius:var(--radius-sm);cursor:pointer;font-size:15px}
.chip-in:has(input:checked){background:var(--color-bg-accent-subtle);box-shadow:inset 0 0 0 2px var(--steel-11)} .chip-in input{accent-color:var(--steel-9);margin:0}
.sm2{position:relative} .seam-full{aspect-ratio:auto;height:min(88vh,860px)}
.sm2-ix{position:absolute;left:max(var(--layout-gutter),calc((100vw - var(--layout-max-width))/2 + var(--layout-gutter)));top:var(--space-07);width:300px;background:var(--color-bg-page);padding:var(--space-06);z-index:3}
.sm2-n{font:800 22px/1.2 var(--font-display);margin:0 0 var(--space-04)} .sm2-l{list-style:none;padding:0;margin:0 0 var(--space-04)}
.sm2-l button{width:100%;min-height:52px;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:0 var(--space-03);background:transparent;border:0;border-top:1px solid var(--color-border-subtle);cursor:pointer;font:inherit;color:var(--color-text-primary);text-align:left}
.sm2-l button span{color:var(--color-text-secondary);font-size:14px} .sm2-l button[aria-pressed=true]{background:var(--color-bg-accent-subtle);box-shadow:inset 3px 0 0 var(--steel-9)}
.lnk{display:inline-flex;align-items:center;gap:6px;min-height:44px;font-weight:600}
@media (max-width:900px){.sm-g{grid-template-columns:minmax(0,1fr)} .seam-full{height:60vh} .sm2-ix{position:static;width:auto}}
"""
    js = """
(function(){const A=window.APS,cl=(v,a,b)=>Math.max(a,Math.min(b,v)),src=k=>{const e=document.querySelector(`img[data-key="${k}"]`);return e?e.src:'';};
const PL=%s;
document.querySelectorAll('[data-seam]').forEach(box=>{const c=box.querySelector('.sb-c'),l=box.querySelector('.seam-l'),h=box.querySelector('.seam-h');let x=50,d=false;
  const set=v=>{x=cl(v,5,95);c.style.clipPath=`inset(0 ${(100-x).toFixed(2)}%% 0 0)`;l.style.left=x+'%%';h.setAttribute('aria-valuenow',Math.round(x));h.setAttribute('aria-valuetext',Math.round(x)+'%% before');};
  const ev=e=>{const r=box.getBoundingClientRect();set((e.clientX-r.left)/r.width*100);};
  box.addEventListener('pointerdown',e=>{d=true;box.setPointerCapture(e.pointerId);ev(e);});box.addEventListener('pointermove',e=>{if(d)ev(e);});box.addEventListener('pointerup',()=>d=false);
  h.addEventListener('keydown',e=>{const m={ArrowLeft:-5,ArrowRight:5,ArrowDown:-5,ArrowUp:5,PageDown:-10,PageUp:10};if(e.key in m){set(x+m[e.key]);e.preventDefault();}else if(e.key==='Home'){set(5);e.preventDefault();}else if(e.key==='End'){set(95);e.preventDefault();}});
  box._show=i=>{const p=PL[i],a=box.querySelector('.sa'),b=box.querySelector('.sb');const swap=()=>{a.src=src(p.id+'-a');b.src=src(p.id+'-b');a.alt='After: '+p.place;b.alt='Before: '+p.place;};
    if(A.reduce){swap();return;}const cv=document.createElement('div');cv.style.cssText='position:absolute;inset:0;z-index:5;background:var(--color-bg-accent-field)';box.appendChild(cv);
    cv.animate([{clipPath:'inset(0 0 100%% 0)'},{clipPath:'inset(0 0 0%% 0)'}],{duration:300,easing:A.css('--ease-draw'),fill:'forwards'}).finished.then(()=>{swap();return cv.animate([{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(100%% 0 0 0)'}],{duration:300,easing:A.css('--ease-draw'),fill:'forwards'}).finished;}).then(()=>cv.remove());};
  set(50);});
document.querySelectorAll('input[name=sm1]').forEach(r=>r.addEventListener('change',()=>{const box=r.closest('.sm1').querySelector('[data-seam]');box._show(+r.value);r.closest('.sm1').querySelector('.sm-h').textContent=PL[+r.value].place;}));
document.querySelectorAll('.sm2-l button').forEach(b=>b.addEventListener('click',()=>{const box=b.closest('.sm2').querySelector('[data-seam]');box._show(+b.dataset.i);b.closest('ol').querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));}));
})();
""" % ('[' + ','.join(f'{{"id":"{p["id"]}","place":"{esc(p["place"])}"}}' for p in PAIRS) + ']')
    return 'Before and after', v1, v2, css, js


def s10():
    frames = [('2009', 'Since 2009', 'The firm starts work in Austin.', None),
              ('2018', 'Merged 2018', 'Two firms become one.', None),
              ('Today', REVIEWS, 'From the firm’s reviews.', 'siding2-a'),
              ('Today', RECORD, 'Every dot on the Our work map.', 'home2-a'),
              ('Today', 'Credentials', ' · '.join(CREDS), 'windows1-a')]
    art = lambda y, k: (IM.img(k, f"Job photo: {PLACE[k[:-2]]}") if k else f'<div class="fr-yr" aria-hidden="true">{esc(y)}</div>')   # no job photo stands in for a past year
    roll = ''.join(f'<li class="fr-i"><figure>{art(y, k)}<figcaption><span class="fr-y">{esc(y)}</span><b>{esc(t)}</b><span>{esc(d)}</span></figcaption></figure></li>' for y, t, d, k in frames)
    v1 = (f'<div class="fr1 sec-pad"><div class="wrap"><p class="label">Since 2009</p><h2 class="h2">The record, in order.</h2>{cline()}</div>'
          f'<ol class="fr-roll" tabindex="0" aria-label="Since 2009, frame by frame. Scroll sideways.">{roll}</ol></div>')
    tl = ''.join(f'<li><span class="tl-y">{esc(y)}</span><div><b>{esc(t)}</b><p>{esc(d)}</p></div></li>' for y, t, d, k in frames)
    v2 = f'<div class="fr2 sec-pad"><div class="wrap fr2-g"><div><p class="label">Since 2009</p><h2 class="h2">The record, in order.</h2></div><ol class="tl">{tl}</ol></div></div>'
    css = """
.fr-roll{list-style:none;display:grid;grid-auto-flow:column;grid-auto-columns:min(420px,82vw);gap:var(--space-04);overflow-x:auto;scroll-snap-type:x mandatory;padding:var(--space-02) var(--layout-gutter) var(--space-05);margin:0;
 scroll-padding-left:var(--layout-gutter);border-top:12px dashed var(--color-bg-page);background:var(--color-bg-inverse);padding-top:var(--space-04)}
.fr-i{scroll-snap-align:start} .fr-yr{aspect-ratio:3/2;display:grid;place-items:center;background:var(--steel-12);font:800 clamp(4rem,3rem + 4vw,7rem) var(--font-display);color:var(--steel-6);border-bottom:3px solid var(--steel-9)} .fr-i figure{margin:0;background:var(--color-bg-inverse);color:#fff} .fr-i img{width:100%;height:auto;aspect-ratio:3/2;object-fit:cover;display:block}
.fr-i figcaption{display:grid;gap:4px;padding:var(--space-04) var(--space-02) var(--space-03)} .fr-y{font:600 13px var(--font-text);letter-spacing:.08em;text-transform:uppercase;color:var(--steel-5)} .fr-i b{font:800 20px/1.25 var(--font-display)} .fr-i figcaption span:last-child{color:var(--steel-4);font-size:15px}
.fr2-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:var(--space-09)}
.tl{list-style:none;padding:0;margin:0;border-left:3px solid var(--color-accent-line)} .tl li{display:grid;grid-template-columns:90px minmax(0,1fr);gap:var(--space-05);padding:0 0 var(--space-07) var(--space-06);position:relative}
.tl li::before{content:"";position:absolute;left:-3px;top:.55em;width:18px;height:3px;background:var(--color-accent-line)} .tl-y{font:800 20px var(--font-display);color:var(--color-text-accent)} .tl b{font:700 20px/1.3 var(--font-text)} .tl p{margin:4px 0 0;color:var(--color-text-secondary)}
@media (max-width:900px){.fr2-g{grid-template-columns:minmax(0,1fr)} .tl li{grid-template-columns:minmax(0,1fr)}}
"""
    return 'Since 2009', v1, v2, css, ''


def s11():
    acts = (f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a>'
            f'<a class="btn btn-secondary" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div>')
    v1 = f'<div class="cl1 sec-pad"><div class="wrap cl-c">{cline()}<h2 class="h1">Call when you’re ready.</h2><p class="lead">{esc(HOURS)}</p>{acts}</div></div>'
    v2 = (f'<div class="cl2"><div class="wrap cl2-c"><p class="label">Call</p><a class="cl2-p" href="{TEL}">{PHONE}</a><p class="lead">{esc(HOURS)}</p>'
          f'<a class="btn btn-primary" href="#/about/booking">Or book an estimate online {icon("action-arrow-right", 20)}</a></div></div>')
    css = """
.cl-c{max-width:860px} .cl1 .h1{margin-bottom:var(--space-04)}
.cl2{position:relative;padding:var(--layout-section-pad) 0;background:repeating-linear-gradient(180deg,var(--neutral-1) 0 31px,var(--neutral-3) 31px 34px,var(--white) 34px 65px,var(--neutral-3) 65px 68px)}
.cl2::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,var(--color-bg-page) 0 45%,transparent 75%)} .cl2-c{position:relative}
.cl2-p{display:block;font:800 clamp(3rem,1.5rem + 6vw,7rem)/1 var(--font-display);letter-spacing:-.02em;color:var(--color-text-primary);text-decoration:none;margin:0 0 var(--space-05)} .cl2-p:hover{color:var(--color-text-accent)}
"""
    return 'Closing call', v1, v2, css, ''
