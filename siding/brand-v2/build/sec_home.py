"""Homepage sections, two versions each. Each function returns (title, v1_html, v2_html, css, js)."""
from shell import IM, PLACE, TEL, PHONE, REVIEWS, CREDS, RECORD, esc, icon, cline, section  # noqa: F401

STEPS = ['Measure', 'Strip', 'Wrap', 'Lay the courses', 'Trim & paint', 'Walk-through']   # draft copy for the firm to confirm
HERO_JOBS = ['robroy', 'siding0', 'siding2']


# ----------------------------------------------------------------------------------------------------------- 1 hero
def s1():
    L = ''.join(f'<div class="hs-i">{IM.img(j + "-b", f"Before: {PLACE[j]}, the wall before the work", eager=(i == 0))}</div>' for i, j in enumerate(HERO_JOBS))
    R = ''.join(f'<div class="hs-i">{IM.img(j + "-a", f"After: {PLACE[j]}, the same wall after the work", eager=(i == 0))}</div>' for i, j in enumerate(HERO_JOBS))
    plates = ''.join(f'<div class="pl"><p class="pl-k">{esc(PLACE[j])}</p><p class="pl-s">Before, then after</p>{cline("#fff", "")}<p class="pl-n">Job {i + 1} of {len(HERO_JOBS)}</p></div>' for i, j in enumerate(HERO_JOBS))
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
.pl-k{font:800 24px/1.15 var(--font-display)} .pl-s{font:600 15px var(--font-text);margin:6px 0 10px!important} .pl .cline{margin:0;max-width:none} .pl-n{font:600 12px var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--steel-4);margin-top:8px!important}
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
