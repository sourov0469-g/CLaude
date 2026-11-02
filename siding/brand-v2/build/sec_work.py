"""Our work page: six sections, two versions each. The map is the site's one explorable section (annex v3: Bruno Simon,
scoped). Pins show their city only: no months (captions are place-only until Muse rules) and no per-trade counts (barred)."""
from shell import IM, PAIRS, TRADE, RECORD, REVIEWS, CREDS, esc, icon, cline, home2
from sec_home3 import _seam
from sec_windows import close
from sec_home import PL_MARK


def _map_svg(cls):
    xs = [p[0] for p in home2.PINS]
    ys = [p[1] for p in home2.PINS]
    x0, x1, y0, y1 = min(xs) - 20, max(xs) + 20, min(ys) - 20, max(ys) + 20
    dots = ''.join(f'<circle class="mp-d" cx="{x}" cy="{y}" r="4.4" data-c="{esc(home2.CITIES[ci])}"/>' for x, y, _ym, _b, _pi, ci in home2.PINS)
    hx, hy = home2.NEAR['hq']
    return (f'<svg class="mp {cls}" viewBox="{x0} {y0} {x1 - x0} {y1 - y0}" aria-hidden="true"><g class="mp-g">{dots}'
            f'<circle cx="{hx}" cy="{hy}" r="12" class="mp-hq"/><text x="{hx + 18}" y="{hy + 5}" class="mp-hqt">Office</text></g></svg>')


def _map(cls, dark=False):
    return (f'<div class="mpw {cls}{" mp-dark" if dark else ""}" data-map tabindex="0" role="region" aria-label="Map of the 312 jobs with photos. Drag or use the arrow keys to move; plus and minus to zoom.">'
            f'{_map_svg("")}<div class="mp-ctl"><button type="button" data-z="1.4" aria-label="Zoom in">{icon("action-plus", 20)}</button>'
            f'<button type="button" data-z="0.714" aria-label="Zoom out">{icon("action-minus", 20)}</button><button type="button" data-z="0" aria-label="Reset the map">Reset</button></div>'
            f'<p class="mp-tip" aria-live="polite"></p></div>')


def k1():
    v1 = (f'<div class="wk1 sec-pad"><div class="wrap"><p class="label">Our work</p><h1 class="h1 wk-n"><span aria-hidden="true">312</span><span class="sr">{esc(RECORD)}</span></h1>'
          f'<p class="wk-s" aria-hidden="true">{esc(RECORD)}</p>{cline()}<p class="lead">Each dot below is a job with photos. Explore the map, browse the archive, then drag a seam.</p></div></div>')
    v2 = (f'<div class="wk2 sec-pad"><div class="wrap"><p class="label">Our work</p><h1 class="wk2-h">312 on the map with photos<br><span>+ 574 more counted</span></h1>{cline()}'
          f'<p class="lead">Each dot below is a job with photos.</p></div></div>')
    css = """
.wk-n{font-size:clamp(6rem,4rem + 10vw,13rem);line-height:.9;letter-spacing:-.03em;margin:0} .wk-s{font:700 var(--type-h3-size)/1.3 var(--font-text);margin:var(--space-04) 0 var(--space-05)}
.wk2-h{font:800 var(--type-display-size)/1.02 var(--font-display);letter-spacing:-.02em;margin:0 0 var(--space-06);max-width:16ch} .wk2-h span{color:var(--color-text-accent)}
"""
    return 'The record', v1, v2, css, ''


def k2():
    v1 = (f'<div class="mpx sec-pad" id="work-map"><div class="wrap"><p class="label">The map</p><h2 class="h2">Every job with photos, where it is.</h2>'
          f'<p class="lead">Drag to move, use the buttons to zoom. Hover a dot to see its town.</p>{_map("mp-l")}</div></div>')
    v2 = (f'<div class="mpx2 on-dark"><div class="wrap mpx2-h"><p class="label on-dark-l">The map</p><h2 class="h2 on-dark-h">Every job with photos, where it is.</h2></div>{_map("mp-full", True)}</div>')
    css = """
.mpw{position:relative;background:var(--color-bg-subtle);height:min(78vh,760px);overflow:hidden;cursor:grab;touch-action:none} .mpw:active{cursor:grabbing}
.mp{width:100%;height:100%;display:block} .mp-g{transform-origin:0 0} .mp-d{fill:var(--steel-8);transition:r var(--duration-fast) var(--ease-standard)} .mp-d:hover{fill:var(--steel-11)}
.mp-hq{fill:none;stroke:var(--color-accent-solid);stroke-width:3} .mp-hqt{font:700 15px var(--font-text);fill:var(--color-text-primary)}
.mp-ctl{position:absolute;right:var(--space-04);top:var(--space-04);display:grid;gap:6px} .mp-ctl button{min-width:48px;height:48px;border:1px solid var(--color-border-control);background:var(--color-bg-page);border-radius:var(--radius-sm);cursor:pointer;font:600 14px var(--font-text);display:grid;place-items:center;color:var(--color-text-primary)}
.mp-tip{position:absolute;left:var(--space-04);bottom:var(--space-04);margin:0;background:var(--color-bg-inverse);color:#fff;font:600 14px var(--font-text);padding:6px 10px} .mp-tip:empty{display:none}
.mp-dark{background:var(--steel-12)} .mp-dark .mp-d{fill:var(--steel-6)} .mp-dark .mp-d:hover{fill:#fff} .mp-dark .mp-hq{stroke:#fff} .mp-dark .mp-hqt{fill:#fff}
.mpx2{padding-top:var(--layout-section-pad)} .mpx2-h{margin-bottom:var(--space-06)} .mp-full{height:min(86vh,860px)}
"""
    js = """
(function(){document.querySelectorAll('[data-map]').forEach(w=>{const svg=w.querySelector('svg'),g=w.querySelector('.mp-g'),tip=w.querySelector('.mp-tip');let s=1,tx=0,ty=0,d=null;
  const vb=svg.viewBox.baseVal,apply=()=>{g.setAttribute('transform',`translate(${tx} ${ty}) scale(${s})`);g.querySelectorAll('.mp-d').forEach(c=>c.setAttribute('r',4.4/Math.sqrt(s)));};
  const toSvg=(dx,dy)=>{const r=svg.getBoundingClientRect(),k=Math.max(vb.width/r.width,vb.height/r.height);return [dx*k,dy*k];};
  const zoom=f=>{if(f===0){s=1;tx=0;ty=0;}else{const ns=Math.max(1,Math.min(8,s*f)),cx=vb.x+vb.width/2,cy=vb.y+vb.height/2;tx=cx-(cx-tx)*ns/s;ty=cy-(cy-ty)*ns/s;s=ns;}apply();};
  w.querySelectorAll('[data-z]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();zoom(+b.dataset.z);}));
  w.addEventListener('pointerdown',e=>{if(e.target.closest('button'))return;d={x:e.clientX,y:e.clientY,tx,ty};w.setPointerCapture(e.pointerId);});
  w.addEventListener('pointermove',e=>{if(d){const [dx,dy]=toSvg(e.clientX-d.x,e.clientY-d.y);tx=d.tx+dx;ty=d.ty+dy;apply();}else{const c=e.target.closest('.mp-d');tip.textContent=c?c.dataset.c:'';}});
  w.addEventListener('pointerup',()=>d=null);
  w.addEventListener('keydown',e=>{const m={ArrowLeft:[40,0],ArrowRight:[-40,0],ArrowUp:[0,40],ArrowDown:[0,-40]}[e.key];if(m){tx+=m[0];ty+=m[1];apply();e.preventDefault();}
    else if(e.key==='+'||e.key==='='){zoom(1.4);e.preventDefault();}else if(e.key==='-'){zoom(.714);e.preventDefault();}else if(e.key==='0'){zoom(0);e.preventDefault();}});
  apply();window.__map=window.__map||[];window.__map.push({zoom,get:()=>({s,tx,ty})});});})();
"""
    return 'The map', v1, v2, css, js


def k3():
    imgs = [(p['id'], ab) for p in PAIRS for ab in ('a', 'b')]
    lbl = lambda pid, ab: f'{"After" if ab == "a" else "Before"}: {PAIRS[[q["id"] for q in PAIRS].index(pid)]["place"]}'
    filt = lambda n: (f'<fieldset class="chips af"><legend class="sr">Filter the archive</legend>'
                      + ''.join(f'<label class="chip-in"><input type="radio" name="{n}" value="{v}" {"checked" if v == "all" else ""}> {t}</label>' for v, t in [("all", "All"), ("siding", "Siding"), ("windows", "Windows")]) + '</fieldset>')
    pos = [(c * 25 + (2 if r % 2 == 0 else 5) + (c % 2) * 1.5, r * 25 + (2 + (c % 2) * 4), 20 if (r + c) % 3 else 22) for r in range(4) for c in range(4)][:12]   # staggered: scattered, never overlapping
    sc = ''.join(f'<figure class="lc" data-t="{TRADE[pid]}" style="left:{x}%;top:{y}%;width:{w}%">{IM.img(f"{pid}-{ab}", lbl(pid, ab))}<figcaption>{esc(lbl(pid, ab))}</figcaption></figure>'
                 for (pid, ab), (x, y, w) in zip(imgs, pos))
    v1 = (f'<div class="ar1 sec-pad" data-arch="ar1"><div class="wrap"><p class="label">Archive</p><h2 class="h2">The jobs, laid out.</h2>{filt("ar1")}</div>'
          f'<div class="lc-field">{sc}</div></div>')
    grid = ''.join(f'<figure class="gc" data-t="{TRADE[p["id"]]}"><div class="gc-i">{IM.img(p["id"] + "-a", "After: " + p["place"])}{IM.img(p["id"] + "-b", "Before: " + p["place"], cls="gc-b")}</div>'
                   f'<figcaption><b>{esc(p["place"])}</b><span>{TRADE[p["id"]]}</span><button type="button" class="gc-t" aria-pressed="false">Show before</button></figcaption></figure>' for p in PAIRS)
    v2 = f'<div class="ar2 sec-pad" data-arch="ar2"><div class="wrap"><p class="label">Archive</p><h2 class="h2">The jobs, laid out.</h2>{filt("ar2")}<div class="gcs">{grid}</div></div></div>'
    css = """
.af{margin:0 0 var(--space-06)} .lc-field{position:relative;height:min(110vw,1180px);margin:0 var(--layout-gutter);background:var(--color-bg-subtle);
 background-image:repeating-radial-gradient(circle at 30% 40%,transparent 0 38px,var(--neutral-4) 38px 39px)}
.lc{position:absolute;margin:0;transition:opacity var(--duration-normal) var(--ease-standard)} .lc img{width:100%;height:auto;display:block;aspect-ratio:3/2;object-fit:cover;box-shadow:0 8px 24px rgba(19,22,25,.16)}
.lc figcaption{font-size:13px;color:var(--color-text-secondary);margin-top:4px} .lc.dim{opacity:.12}
.gcs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:var(--space-05)} .gc{margin:0} .gc.dim{display:none} .gc-i{position:relative}
.gc-i img{width:100%;height:auto;display:block;aspect-ratio:3/2;object-fit:cover} .gc-b{position:absolute;inset:0;opacity:0;transition:opacity var(--duration-normal) var(--ease-standard)} .gc.bf .gc-b{opacity:1}
.gc figcaption{display:flex;gap:var(--space-03);align-items:center;flex-wrap:wrap;margin-top:var(--space-03)} .gc figcaption span{color:var(--color-text-secondary)}
.gc-t{margin-left:auto;min-height:44px;padding:0 var(--space-04);border:1px solid var(--color-border-control);background:var(--color-bg-page);border-radius:var(--radius-sm);font:600 14px var(--font-text);cursor:pointer}
@media (max-width:900px){.gcs{grid-template-columns:minmax(0,1fr)} .lc figcaption{display:none}}
"""
    js = """
(function(){document.querySelectorAll('[data-arch]').forEach(r=>{const n=r.dataset.arch;r.querySelectorAll(`input[name=${n}]`).forEach(i=>i.addEventListener('change',()=>{
  r.querySelectorAll('[data-t]').forEach(f=>f.classList.toggle('dim',i.value!=='all'&&f.dataset.t!==i.value));}));});
document.querySelectorAll('.gc-t').forEach(b=>b.addEventListener('click',()=>{const f=b.closest('.gc'),on=f.classList.toggle('bf');b.setAttribute('aria-pressed',on);b.textContent=on?'Show after':'Show before';}));})();
"""
    return 'Archive', v1, v2, css, js


def k4():
    chips = ''.join(f'<label class="chip-in"><input type="radio" name="wkp" value="{i}" {"checked" if i == 0 else ""}> {esc(p["place"])} · {TRADE[p["id"]]}</label>' for i, p in enumerate(PAIRS))
    v1 = (f'<div class="wkp1 sec-pad" data-pp="wkp"><div class="wrap"><p class="label">Before and after</p><h2 class="h2 pp-h" aria-live="polite">{esc(PAIRS[0]["place"])}</h2>'
          f'<div class="wkp-s">{_seam("", 0)}</div><fieldset class="chips"><legend class="label">Pick a job · six of 177 genuine pairs</legend>{chips}</fieldset></div></div>')
    L = ''.join(f'<div class="hs-i">{IM.img(p["id"] + "-b", "Before: " + p["place"])}</div>' for p in PAIRS)
    R = ''.join(f'<div class="hs-i">{IM.img(p["id"] + "-a", "After: " + p["place"])}</div>' for p in PAIRS)
    pl = ''.join(f'<div class="pl" style="background:var(--steel-{9 + i % 3})">{PL_MARK()}<p class="pl-k">{esc(p["place"])}</p><p class="pl-s">Before, then after · {TRADE[p["id"]]}</p><p class="pl-n">Pair {i + 1} of 6</p></div>' for i, p in enumerate(PAIRS))
    v2 = (f'<div class="wkp2" data-wkp2><div class="h1-stick"><div class="hs"><div class="hs-col hs-l">{L}</div><div class="hs-col hs-r">{R}</div><div class="pls" aria-live="polite">{pl}</div></div>'
          f'<div class="h1-ctl"><button class="ctl" type="button" data-d="-1" aria-label="Previous pair">{icon("action-arrow-right", 20)}</button><span class="ctl-n" aria-hidden="true"><b>1</b> / 6</span>'
          f'<button class="ctl" type="button" data-d="1" aria-label="Next pair">{icon("action-arrow-right", 20)}</button></div></div></div>')
    css = """
.wkp-s{max-width:1000px;margin-bottom:var(--space-05)} .wkp2{height:420vh;position:relative}
"""
    js = """
(function(){const PL=%s;document.querySelectorAll('input[name=wkp]').forEach(r=>r.addEventListener('change',()=>{const s=r.closest('[data-pp]');s.querySelector('[data-seam]')._show(+r.value);s.querySelector('.pp-h').textContent=PL[+r.value];}));
const w=document.querySelector('[data-wkp2]');if(!w)return;const A=window.APS,cl=(v,a,b)=>Math.max(a,Math.min(b,v));const L=[...w.querySelectorAll('.hs-l .hs-i')],R=[...w.querySelectorAll('.hs-r .hs-i')],P=[...w.querySelectorAll('.pl')],n=L.length,num=w.querySelector('.ctl-n b');
let target=0,shown=0,raf=0;const paint=pos=>{pos=cl(pos,0,n-1);const i=Math.floor(pos),f=pos-i,t=(100-f*100).toFixed(2);[L,R,P].forEach((col,ci)=>col.forEach((e,k)=>{let c;
  if(k<=i)c='inset(0%% 0%% 0%% 0%%)';else if(k===i+1)c=ci===1?`inset(0%% 0%% ${t}%% 0%%)`:`inset(${t}%% 0%% 0%% 0%%)`;else c=ci===1?'inset(0%% 0%% 100%% 0%%)':'inset(100%% 0%% 0%% 0%%)';e.style.clipPath=c;e.style.zIndex=k;}));num.textContent=Math.round(pos)+1;};
const tick=()=>{shown+=(target-shown)*(A.reduce?1:.12);if(Math.abs(target-shown)<.0005)shown=target;paint(shown);raf=shown!==target?requestAnimationFrame(tick):0;};const go=t=>{target=cl(t,0,n-1);if(!raf)raf=requestAnimationFrame(tick);};
A.pin(w,p=>go(p*(n-1)));paint(0);w.querySelectorAll('.ctl').forEach(b=>b.addEventListener('click',()=>{const t=cl(Math.round(target)+ +b.dataset.d,0,n-1),len=w.offsetHeight-innerHeight;scrollTo({top:w.getBoundingClientRect().top+scrollY+len*t/(n-1),behavior:'instant'});go(t);}));})();
""" % ('[' + ','.join(f'"{esc(p["place"])}"' for p in PAIRS) + ']')
    return 'Before and after', v1, v2, css, js


def _stars():
    s = ''.join(icon('status-star', 36) for _ in range(5))
    return f'<span class="stars" aria-hidden="true"><span class="st-bg">{s}</span><span class="st-fg" style="width:{4.9 / 5 * 100:.0f}%">{s}</span></span>'


def k5():
    v1 = (f'<div class="rv1 sec-pad"><div class="wrap"><p class="label">Reviews</p>{_stars()}<p class="rv-n">{esc(REVIEWS)}</p>'
          f'<p class="lead">Counted, not chosen: this site quotes no single review.</p></div></div>')
    v2 = (f'<div class="rv2 sec-pad"><div class="wrap rv2-g"><p class="rv2-b">4.9</p><div><p class="rv-n">{esc(REVIEWS)}</p>{_stars()}<p class="small">{esc(" · ".join(CREDS))}</p></div></div></div>')
    css = """
.stars{position:relative;display:inline-block;color:var(--color-accent-solid)} .st-bg{display:flex;color:var(--color-border-default)} .st-fg{position:absolute;inset:0;overflow:hidden;display:flex;white-space:nowrap}
.rv-n{font:800 var(--type-h2-size)/1.1 var(--font-display);margin:var(--space-04) 0} .rv2-g{display:grid;grid-template-columns:auto minmax(0,1fr);gap:var(--space-08);align-items:center}
.rv2-b{font:800 clamp(6rem,4rem + 8vw,11rem)/.9 var(--font-display);margin:0;color:var(--color-text-accent)} @media (max-width:700px){.rv2-g{grid-template-columns:minmax(0,1fr)}}
"""
    return 'Reviews', v1, v2, css, ''


def k6():
    return close(CREDS[1], 'work')


WORK = [k1, k2, k3, k4, k5, k6]
