"""Homepage sections, two versions each. Each function returns (title, v1_html, v2_html, css, js)."""
from shell import IM, PLACE, TEL, PHONE, REVIEWS, CREDS, RECORD, esc, icon, cline, section  # noqa: F401

STEPS = ['Measure', 'Strip', 'Wrap', 'Lay the courses', 'Trim & paint', 'Walk-through']   # draft copy for the firm to confirm
HERO_JOBS = ['robroy', 'siding0', 'siding2']
# MERSI's plate changes colour per project and carries an embossed monogram; here the colour steps steel-9/10/11 (white
# text >= 5.96:1 on all three) and the monogram is the C1 mark set tone-on-tone
from shell import marks as _m
PL_MARK = f'<svg class="pl-m" viewBox="0 0 64 64" aria-hidden="true" focusable="false">{_m.c1("rgba(255,255,255,.16)", "transparent")}</svg>'


# ----------------------------------------------------------------------------------------------------------- 1 hero
def s1():
    L = ''.join(f'<div class="hs-i">{IM.img(j + "-b", f"Before: {PLACE[j]}, the wall before the work", eager=(i == 0))}</div>' for i, j in enumerate(HERO_JOBS))
    R = ''.join(f'<div class="hs-i">{IM.img(j + "-a", f"After: {PLACE[j]}, the same wall after the work", eager=(i == 0))}</div>' for i, j in enumerate(HERO_JOBS))
    plates = ''.join(f'<div class="pl" style="background:var(--steel-{9 + i % 3})">{PL_MARK}<p class="pl-k">{esc(PLACE[j])}</p><p class="pl-s">Before, then after</p>{cline("#fff", "")}<p class="pl-n">Job {i + 1} of {len(HERO_JOBS)}</p></div>' for i, j in enumerate(HERO_JOBS))
    copy = lambda h: (f'<div class="h1-copy"><p class="label">Siding · windows · roofing · painting in Austin</p><h1 class="h1">{h}</h1>'
                      f'<div class="row"><a class="btn btn-primary" href="#/about/booking">Book an estimate {icon("action-arrow-right", 20)}</a>'
                      f'<a class="btn btn-secondary" href="{TEL}">{icon("communication-phone", 20)} {PHONE}</a></div></div>')
    v1 = (f'<div class="hero1" data-hero1><div class="h1-stick"><div class="hs"><div class="hs-col hs-l">{L}</div><div class="hs-col hs-r">{R}</div>'
          f'<div class="pls" aria-live="polite">{plates}</div></div>{copy("Laid by hand,<br>course by course.")}'
          f'<div class="h1-ctl"><button class="ctl" type="button" data-d="-1" aria-label="Previous job">{icon("action-arrow-right", 20)}</button>'
          f'<span class="ctl-n" aria-hidden="true"><b>1</b> / {len(HERO_JOBS)}</span><button class="ctl" type="button" data-d="1" aria-label="Next job">{icon("action-arrow-right", 20)}</button></div></div></div>')
    # V2: the finished wall beside the same wall drawn in section; the plate steps through the process, the drawing lights its layer
    steps_pl = ''.join(f'<div class="pl"><p class="pl-k">Step {i + 1:02d} · {esc(s)}</p><p class="pl-s">Rob Roy, Austin</p>{cline("#fff", "")}<p class="pl-n">{i + 1} of 6</p></div>' for i, s in enumerate(STEPS))
    boards = ''.join(f'<path class="hd-b" d="M300 {120 + i * 86}L268 {214 + i * 86}H300Z"/>' for i in range(6))
    draw = (f'<svg class="hd" viewBox="0 40 520 680" role="img" aria-label="The same wall drawn in section: stud, sheathing, wrap, six lapped boards, trim">'
            f'<g class="hd-s" data-s="0"><path d="M240 80V700M228 80H252M228 700H252" class="hd-dim"/><path d="M190 140H236" class="hd-ld"/><text x="180" y="146" class="hd-t" text-anchor="end">MEASURE</text></g>'
            f'<g class="hd-s" data-s="1"><path d="M262 110V690" class="hd-old"/><path d="M190 230H262" class="hd-ld"/><text x="180" y="236" class="hd-t" text-anchor="end">STRIP</text></g>'
            f'<g class="hd-s" data-s="2"><path d="M306 90V700" class="hd-wrap"/><path d="M190 320H306" class="hd-ld"/><text x="180" y="326" class="hd-t" text-anchor="end">WRAP</text></g>'
            f'<g class="hd-base"><rect x="320" y="80" width="140" height="620" class="hd-stud"/><path d="M312 80V700" class="hd-sh"/></g>'
            f'<g class="hd-s" data-s="3">{boards}<path d="M190 410H280" class="hd-ld"/><text x="180" y="416" class="hd-t" text-anchor="end">COURSES</text></g>'
            f'<g class="hd-s" data-s="4"><path d="M262 92H306V114H262Z" class="hd-trim"/><path d="M190 500H230V103H262" class="hd-ld"/><text x="180" y="506" class="hd-t" text-anchor="end">TRIM</text></g>'
            f'<g class="hd-s" data-s="5"><path d="M130 600L152 622L190 578" class="hd-ok"/><text x="180" y="660" class="hd-t" text-anchor="end">WALK-THROUGH</text></g></svg>')
    v2 = (f'<div class="hero2" data-hero2><div class="h1-stick"><div class="h2-l">{IM.img("robroy-a", "Rob Roy, Austin: the finished wall after the work")}</div>'
          f'<div class="h2-r">{draw}</div><div class="pls pls2" aria-live="polite">{steps_pl}</div>{copy("One wall,<br>six steps.")}</div></div>')
    css = r'''
.hero1{height:260vh;position:relative} .hero2{height:320vh;position:relative}
.h1-stick{position:sticky;top:72px;height:calc(100vh - 72px);min-height:560px;overflow:hidden}
.hs{position:absolute;inset:0} .hs-col{position:absolute;top:0;bottom:0;width:50%;overflow:hidden} .hs-l{left:0} .hs-r{right:0}
.hs-i{position:absolute;inset:0} .hs-i img{height:100%;width:200%;max-width:none;object-fit:cover;display:block} .hs-r .hs-i img{margin-left:-100%}
.pls{position:absolute;left:50%;top:36%;transform:translate(-50%,-50%);width:min(420px,84vw);height:152px;z-index:3}
.pl{position:absolute;inset:0;background:var(--color-bg-accent-field);color:var(--color-text-on-accent);padding:var(--space-05) var(--space-06)} .pl p{margin:0}
.pl-k{font:800 24px/1.15 var(--font-display)} .pl-m{position:absolute;right:16px;top:14px;width:64px;height:64px} .pl-s{font:600 15px var(--font-text);margin:6px 0 10px!important} .pl .cline{margin:0;max-width:none} .pl-n{font:600 12px var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--steel-4);margin-top:8px!important}
.h1-copy{position:absolute;left:0;bottom:0;z-index:4;background:var(--color-bg-page);width:min(700px,100%);padding:var(--space-07) var(--space-07) var(--space-07) max(var(--layout-gutter),calc((100vw - var(--layout-max-width))/2 + var(--layout-gutter)))}
.h1-copy .h1{margin-bottom:var(--space-06)}
.h1-ctl{position:absolute;right:var(--layout-gutter);bottom:var(--space-06);z-index:4;display:flex;align-items:center;gap:var(--space-03);background:var(--color-bg-page);padding:6px}
.ctl{width:48px;height:48px;display:grid;place-items:center;border:1px solid var(--color-border-control);background:var(--color-bg-page);border-radius:var(--radius-sm);cursor:pointer;color:var(--color-text-primary)} .ctl[data-d="-1"] svg{transform:scaleX(-1)}
.ctl-n{font:600 15px var(--font-text);min-width:48px;text-align:center}
.h2-l{position:absolute;left:0;top:0;bottom:0;width:50%} .h2-l img{width:100%;height:100%;object-fit:cover;display:block}
.h2-r{position:absolute;right:0;top:0;bottom:0;width:50%;background:var(--color-bg-deep);display:grid;place-items:center} .hd{height:88%;width:auto;max-width:92%}
.pls2{left:25%;top:28%} .hd-ld{fill:none;stroke:var(--steel-7);stroke-width:1.5}
.hd-t{font:600 16px var(--font-text);letter-spacing:.08em;fill:var(--steel-6)} .hd-dim{stroke:var(--steel-6);stroke-width:2;fill:none} .hd-old{stroke:var(--steel-8);stroke-width:14;stroke-dasharray:4 10}
.hd-wrap{stroke:var(--steel-7);stroke-width:4;stroke-dasharray:12 9} .hd-stud{fill:none;stroke:var(--steel-8);stroke-width:4} .hd-sh{stroke:var(--steel-9);stroke-width:14}
.hd-b{fill:var(--steel-12);stroke:var(--steel-6);stroke-width:4;stroke-linejoin:miter} .hd-trim{fill:var(--steel-6)} .hd-ok{fill:none;stroke:#fff;stroke-width:6}
.hd-s{opacity:.18;transition:opacity var(--duration-normal) var(--ease-standard)} .hd-s.done{opacity:.55} .hd-s.cur{opacity:1}
@media (max-width:900px){.pls{top:24%} .h1-ctl{top:var(--space-04);bottom:auto} .h1-copy{padding:var(--space-05) var(--layout-gutter)} .h2-l{width:100%;height:45%} .h2-r{top:45%;width:100%} .pls2{left:50%;top:20%}}
'''
    js = r'''
(function(){const A=window.APS,cl=(v,a,b)=>Math.max(a,Math.min(b,v));
function wiper(root,items){ // MERSI: the next item wipes in at the same percentage in every column
  return pos=>{const n=items[0].length,i=Math.floor(cl(pos,0,n-1)),f=cl(pos,0,n-1)-i;
    items.forEach((col,ci)=>col.forEach((e,k)=>{let c;const t=(100-f*100).toFixed(2);
      if(k<=i)c='inset(0% 0% 0% 0%)';else if(k===i+1)c=ci===1?`inset(0% 0% ${t}% 0%)`:`inset(${t}% 0% 0% 0%)`;else c=ci===1?'inset(0% 0% 100% 0%)':'inset(100% 0% 0% 0%)';
      e.style.clipPath=c;e.style.zIndex=k;if(ci===items.length-1)e.setAttribute('aria-hidden',k===Math.round(pos)?'false':'true');}));};}
function driver(root,n,paint,onIdx){let target=0,shown=0,raf=0,drag=false,y0=0,s0=0;
  const tick=()=>{shown+=(target-shown)*(A.reduce?1:.12);if(Math.abs(target-shown)<.0005)shown=target;paint(shown);onIdx&&onIdx(shown);raf=shown!==target?requestAnimationFrame(tick):0;};
  const go=t=>{target=cl(t,0,n-1);if(!raf)raf=requestAnimationFrame(tick);};
  A.pin(root,p=>{if(!drag)go(p*(n-1));});paint(0);onIdx&&onIdx(0);
  root.querySelectorAll('.ctl').forEach(b=>b.addEventListener('click',()=>{const t=cl(Math.round(target)+ +b.dataset.d,0,n-1);const len=root.offsetHeight-innerHeight;
    scrollTo({top:root.getBoundingClientRect().top+scrollY+len*t/(n-1),behavior:'instant'});go(t);}));
  const st=root.querySelector('.hs');if(st){st.addEventListener('pointerdown',e=>{drag=true;y0=e.clientY;s0=target;st.setPointerCapture(e.pointerId);});
    st.addEventListener('pointermove',e=>{if(drag)go(s0+(y0-e.clientY)/(st.clientHeight*.6));});st.addEventListener('pointerup',()=>drag=false);}
  return {set:v=>{target=shown=cl(v,0,n-1);paint(shown);onIdx&&onIdx(shown);}};}
const h1=document.querySelector('[data-hero1]');if(h1){const L=[...h1.querySelectorAll('.hs-l .hs-i')],R=[...h1.querySelectorAll('.hs-r .hs-i')],P=[...h1.querySelectorAll('.pl')];
  const num=h1.querySelector('.ctl-n b');window.__h1=driver(h1,L.length,wiper(h1,[L,R,P]),s=>{num.textContent=Math.round(s)+1;});}
const h2=document.querySelector('[data-hero2]');if(h2){const P=[...h2.querySelectorAll('.pl')],S=[...h2.querySelectorAll('.hd-s')];
  window.__h2=driver(h2,P.length,wiper(h2,[P]),s=>{const k=Math.round(s);S.forEach(g=>{const i=+g.dataset.s;g.classList.toggle('cur',i===k);g.classList.toggle('done',i<k);});});}
})();
'''
    return 'Hero', v1, v2, css, js


HOME = [s1]


# ----------------------------------------------------------------------------------------------------------- 2 proof band
def s2():
    from shell import home2  # noqa: F401
    line = (f'<div class="pb1"><div class="wrap pb1-in"><p class="pb1-r">{icon("status-star", 20)}<b>{esc(REVIEWS)}</b></p>'
            f'<p class="pb1-c">{"".join(f"<span>{esc(c)}</span>" for c in CREDS)}</p>'
            f'<a class="pb1-a" href="#/about/booking">Book an estimate {icon("action-arrow-right", 18)}</a></div></div>')
    cells = [('status-star', 'Reviews', REVIEWS)] + [('status-credential', k, c) for k, c in zip(['Roofing', 'Siding', 'Windows', 'Business'], CREDS)]
    grid = ''.join(f'<div class="pb2-c">{icon(i, 28)}<p class="pb2-k">{esc(k)}</p><p class="pb2-v">{esc(v)}</p></div>' for i, k, v in cells)
    v2 = f'<div class="pb2 sec-pad"><div class="wrap"><p class="label">What the record says</p>{cline()}<div class="pb2-g">{grid}</div></div></div>'
    css = r'''
.pb1{background:var(--color-bg-subtle);border-bottom:1px solid var(--color-border-subtle)} .pb1-in{display:flex;flex-wrap:wrap;align-items:center;gap:var(--space-04) var(--space-07);min-height:88px;padding-top:var(--space-04);padding-bottom:var(--space-04)}
.pb1 p{margin:0} .pb1-r{display:inline-flex;align-items:center;gap:8px} .pb1-r svg{color:var(--color-accent-solid)}
.pb1-c{display:flex;flex-wrap:wrap;gap:var(--space-02) var(--space-05);color:var(--color-text-secondary);font-size:15px} .pb1-c span+span::before{content:"·";margin-right:var(--space-05);color:var(--color-border-control)}
.pb1-a{margin-left:auto;display:inline-flex;align-items:center;gap:6px;font-weight:700;min-height:44px}
.pb2-g{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:0;border-top:1px solid var(--color-border-default)}
.pb2-c{padding:var(--space-06) var(--space-05) var(--space-05) 0;border-right:1px solid var(--color-border-subtle)} .pb2-c+.pb2-c{padding-left:var(--space-05)} .pb2-c:last-child{border-right:0}
.pb2-c svg{color:var(--color-accent-solid)} .pb2-k{font:600 var(--type-label-size) var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-secondary);margin:var(--space-04) 0 var(--space-02)} .pb2-v{font:700 18px/1.35 var(--font-text);margin:0}
@media (max-width:900px){.pb2-g{grid-template-columns:repeat(2,minmax(0,1fr))} .pb2-c{border-right:0;border-bottom:1px solid var(--color-border-subtle);padding-left:0!important} .pb1-a{margin-left:0}}
'''
    return 'Proof band', line, v2, css, ''


# ----------------------------------------------------------------------------------------------------------- 3 the record
def _dots(cls='nd-d'):
    from shell import home2
    xs = [p[0] for p in home2.PINS]
    ys = [p[1] for p in home2.PINS]
    x0, x1, y0, y1 = min(xs) - 10, max(xs) + 10, min(ys) - 10, max(ys) + 10
    order = sorted(range(len(home2.PINS)), key=lambda i: (home2.PINS[i][0] - home2.NEAR['hq'][0]) ** 2 + (home2.PINS[i][1] - home2.NEAR['hq'][1]) ** 2)
    rank = {i: r for r, i in enumerate(order)}   # dots arrive from the office outwards
    c = ''.join(f'<circle class="{cls}" data-r="{rank[i]}" cx="{x:.0f}" cy="{y:.0f}" r="4.2"/>' for i, (x, y, *_) in enumerate(home2.PINS))
    hx, hy = home2.NEAR['hq']
    return (f'<svg class="nd" viewBox="{x0} {y0} {x1 - x0} {y1 - y0}" role="img" aria-label="Map of the 312 jobs with photos around Austin; the ring marks the office">'
            f'{c}<circle cx="{hx}" cy="{hy}" r="13" class="nd-hq"/></svg>')


def s3():
    v1 = (f'<div class="rec1" data-rec1><div class="rec-stick"><div class="wrap rec-g"><div class="rec-c"><p class="label">The record</p>'
          f'<p class="rec-n" aria-hidden="true"><span class="rec-clip">312</span></p><p class="rec-s">{esc(RECORD)}</p>'
          f'<p class="small">Each dot is a job with photos. <a href="#/work">Open the map</a></p></div><div class="rec-m">{_dots()}</div></div></div></div>')
    v2 = (f'<div class="rec2 sec-pad"><div class="wrap rec-g"><div class="rec-c"><p class="label">The record</p>{cline()}'
          f'<p class="rec-n" aria-hidden="true">312</p><p class="rec-s rec-lines"><span>312 on the map with photos</span> <span>+ 574 more counted</span></p>'
          f'<p class="small">Each dot is a job with photos. <a href="#/work">Open the map</a></p></div><div class="rec-m rec-m2">{_dots("nd-d on")}</div></div></div>')
    css = r'''
.rec1{height:220vh;position:relative} .rec-stick{position:sticky;top:72px;height:calc(100vh - 72px);min-height:560px;display:flex;align-items:center}
.rec-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:var(--space-08);align-items:center;width:100%}
.rec-n{font:800 clamp(6rem,4rem + 10vw,13rem)/.9 var(--font-display);letter-spacing:-.03em;margin:0} .rec-clip{display:inline-block}
.js [data-rec1] .rec-clip{clip-path:inset(100% 0 0 0)}
.rec-s{font:700 var(--type-h3-size)/1.3 var(--font-text);margin:var(--space-04) 0 var(--space-04);max-width:22ch}
.nd{width:100%;height:auto;max-height:calc(100vh - 160px)} .nd-d{fill:var(--steel-7);opacity:.12;transition:opacity var(--duration-fast) linear} .nd-d.on{opacity:1}
.nd-hq{fill:none;stroke:var(--color-accent-solid);stroke-width:3}
.rec-m2{background:var(--color-bg-subtle);padding:var(--space-05)} .rec-lines span{display:inline-block}
.js .rec2 .rec-lines span{opacity:0;transform:translateY(8px);transition:opacity var(--duration-moderate) var(--ease-enter),transform var(--duration-moderate) var(--ease-enter)}
.js .rec2.in .rec-lines span{opacity:1;transform:none} .js .rec2.in .rec-lines span+span{transition-delay:150ms}
@media (max-width:900px){.rec-g{grid-template-columns:minmax(0,1fr)} .rec1{height:200vh} .nd{max-height:40vh}}
@media (prefers-reduced-motion:reduce){.js .rec2 .rec-lines span{opacity:1;transform:none}}
'''
    js = r'''
(function(){const A=window.APS;const r=document.querySelector('[data-rec1]');if(r){const D=[...r.querySelectorAll('.nd-d')],n=D.length,c=r.querySelector('.rec-clip');
  const set=p=>{const k=Math.round(n*Math.min(1,p*1.15));D.forEach(d=>d.classList.toggle('on',+d.dataset.r<k));c.style.clipPath=`inset(${(100-100*Math.min(1,p*1.15)).toFixed(1)}% 0 0 0)`;};
  if(A.reduce)set(1);else A.pin(r,set);window.__rec1=set;}
const r2=document.querySelector('.rec2');if(r2){if(A.reduce||!('IntersectionObserver' in window))r2.classList.add('in');else new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){r2.classList.add('in');o.disconnect();}}),{threshold:.4}).observe(r2);}
})();
'''
    return 'The record', v1, v2, css, js


# ----------------------------------------------------------------------------------------------------------- 4 services router
def s4():
    svc = [('siding', 'trade-siding', 'Siding & painting', 'Siding replacement and repair, and exterior painting.', 'siding2-a', 'Maple Run, Austin: siding after the work'),
           ('windows', 'trade-window', 'Windows & doors', 'Window, door and garage-door replacement.', 'windows1-a', 'Ridgewood, Cedar Park: new windows after the work'),
           ('roofing', 'trade-roof', 'Roofing, gutters & patio covers', 'Roofs, gutters and covered patios.', None, None)]
    cards = ''.join(f'<a class="svc" href="#/{k}"><span class="svc-i">{icon(i, 32)}</span><h3 class="h3">{esc(t)}</h3><p>{esc(d)}</p><span class="svc-go">{icon("action-arrow-right", 24)}</span></a>' for k, i, t, d, *_ in svc)
    v1 = (f'<div class="sv1 sec-pad"><div class="wrap"><p class="label">Services</p><h2 class="h2">Start with the part of the house.</h2>{cline()}'
          f'<div class="svcs">{cards}</div></div></div>')
    roof = ('<svg class="sv2-art" viewBox="0 0 400 267" aria-hidden="true"><rect width="400" height="267" fill="var(--color-bg-deep)"/>'
            '<path d="M40 220L200 70L360 220Z" fill="none" stroke="var(--steel-6)" stroke-width="4"/>'
            + ''.join(f'<path d="M{200 - (i + 1) * 26} {70 + (i + 1) * 24}H{200 + (i + 1) * 26}" stroke="var(--steel-8)" stroke-width="3"/>' for i in range(5)) + '</svg>')
    rows = ''.join(f'<a class="sv2-r" href="#/{k}"><span class="sv2-n">{n + 1:02d}</span><span class="sv2-t">{esc(t)}</span><span class="sv2-d">{esc(d)}</span>'
                   f'<span class="sv2-p">{IM.img(img, alt) if img else roof}</span>{icon("action-arrow-right", 28)}</a>' for n, (k, i, t, d, img, alt) in enumerate(svc))
    v2 = f'<div class="sv2 sec-pad"><div class="wrap"><p class="label">Services</p><h2 class="h2">Three trades. Pick one.</h2>{cline()}<div class="sv2-l">{rows}</div></div></div>'
    css = r'''
.svcs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-05)}
.svc{position:relative;display:grid;gap:var(--space-03);align-content:start;padding:var(--space-06);border:1px solid var(--color-border-default);text-decoration:none;color:var(--color-text-primary);min-height:240px;transition:border-color var(--duration-fast) var(--ease-standard),background-color var(--duration-fast) var(--ease-standard)}
.svc:hover{border-color:var(--color-border-control);background:var(--color-bg-subtle)} .svc p{margin:0;color:var(--color-text-secondary)} .svc-i{color:var(--color-accent-solid)}
.svc-go{position:absolute;right:var(--space-05);bottom:var(--space-05);transition:transform var(--duration-fast) var(--ease-standard)} .svc:hover .svc-go{transform:translateX(4px)}
.sv2-l{border-top:1px solid var(--color-border-default)}
.sv2-r{position:relative;display:grid;grid-template-columns:56px minmax(0,1.3fr) minmax(0,1fr) 28px;gap:var(--space-05);align-items:center;padding:var(--space-07) 0;border-bottom:1px solid var(--color-border-default);text-decoration:none;color:var(--color-text-primary)}
.sv2-n{font:600 15px var(--font-text);color:var(--color-text-secondary)} .sv2-t{font:800 var(--type-h2-size)/1.05 var(--font-display)} .sv2-d{color:var(--color-text-secondary)}
.sv2-p{position:absolute;right:56px;top:50%;width:300px;aspect-ratio:3/2;transform:translateY(-50%);clip-path:inset(0 0 100% 0);transition:clip-path var(--duration-moderate) var(--ease-draw);pointer-events:none;z-index:2}
.sv2-p img,.sv2-art{width:100%;height:100%;object-fit:cover;display:block}
.sv2-r:hover .sv2-p,.sv2-r:focus-visible .sv2-p{clip-path:inset(0 0 0 0)} .sv2-d{transition:opacity var(--duration-fast) var(--ease-standard)} .sv2-r:hover .sv2-d,.sv2-r:focus-visible .sv2-d{opacity:0} .sv2-r:hover .sv2-t{color:var(--color-text-accent)}
@media (max-width:900px){.svcs{grid-template-columns:minmax(0,1fr)} .sv2-r{grid-template-columns:40px minmax(0,1fr) 24px} .sv2-d{grid-column:2} .sv2-p{display:none}}
'''
    return 'Services', v1, v2, css, ''


HOME = [s1, s2, s3, s4]
