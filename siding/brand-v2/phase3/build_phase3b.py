"""AUSTIN-PROMPT-V2, Phase 3b: three proof sections, built for real, to prove the riskiest mechanisms before the build.

Writes brand-v2/phase3b-proof.html, standalone, vanilla JS (no library), styled from phase2/tokens.css:
- P1 Hero split-slider (MERSI mechanism, measured live). Each half wipes the next job in from opposite ends, by clip-path
  inset, and the centre plate wipes at the same percentage. Driven by scroll (a sticky stage), drag, the
  Previous/Next buttons and the arrow keys. The position is lerped (0.12 per frame). There is no autoplay, and the
  slider settles wherever the input stops.
- P2 Before/after seam (MERSI seam). A clip-path inset on the before photo; role="slider" handle; pointer and keyboard;
  a pair switcher across the firm's six genuine pairs.
- P3 Wall assembly (Lusion flow, Graza bar). A sticky stage whose scroll progress builds the wall in crew order. Boards
  land with the settle curve; the course line's dashoffset is tied to scroll.
Seek harness: window.__p3b.hero(pos) / .seam(x) / .wall(p) set a state directly, for frame checks.
Run: python3 -I brand-v2/phase3/build_phase3b.py"""
import base64, html, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
BV2 = os.path.dirname(HERE)
ROOT = os.path.dirname(BV2)
sys.path.insert(0, os.path.join(BV2, 'phase2'))
sys.path.insert(0, BV2)
sys.path.insert(0, os.path.join(ROOT, 'src'))
import marks, tokens, home2  # noqa: E402
from icons import icon  # noqa: E402

esc = html.escape
P = tokens.PRIM
NAME = 'Austin Pro Siding'
TOK = open(os.path.join(BV2, 'phase2', 'tokens.css')).read()


def b64(path, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(path, 'rb').read()).decode()


FACES = ''.join(f"@font-face{{font-family:'{f}';font-weight:{w};font-display:block;src:url({b64(os.path.join(BV2, 'fonts', p), 'font/woff2')}) format('woff2')}}"
                for f, w, p in [('Montserrat', 800, 'Montserrat-800-latin.woff2'), ('Inter', 400, 'Inter-400-latin.woff2'),
                                ('Inter', 600, 'Inter-600-latin.woff2'), ('Inter', 700, 'Inter-700-latin.woff2')])
PAIRS = home2.PAIRS6
IMG = {f'{p["id"]}-{ab}': b64(os.path.join(ROOT, f'site/assets/img/h/work-{p["id"]}-{ab}-1000.webp'), 'image/webp') for p in PAIRS for ab in 'ab'}
HERO_JOBS = ['robroy', 'siding0', 'siding2']                 # the three siding pairs: same angle, the halves meet as one house
STEPS = ['Measure', 'Strip', 'Wrap', 'Lay the courses', 'Trim & paint', 'Walk-through']   # draft copy, for the firm to confirm
PLACE = {p['id']: p['place'] for p in PAIRS}


def lockup(fg, word, h=30, tail=False):
    return (f'<svg class="lk" viewBox="0 0 296 64" width="{h * 296 / 64:.0f}" height="{h}" role="img" aria-label="{NAME}">'
            f'{marks.c1(fg, "#fff", tail=230 if tail else 0)}<text class="wm" x="78" y="41" fill="{word}">{NAME}</text></svg>')


def cline(color='var(--color-accent-line)', cls=''):
    return (f'<svg class="cline {cls}" viewBox="0 0 600 24" width="100%" height="24" preserveAspectRatio="none" aria-hidden="true">'
            f'<path d="M2 22.5L8 2H16V13H600" fill="none" stroke="{color}" stroke-width="3" vector-effect="non-scaling-stroke" pathLength="1"/></svg>')


def p1():
    L = ''.join(f'<div class="hs-i" data-i="{i}"><img src="{IMG[j + "-b"]}" alt="Before: {esc(PLACE[j])}, the wall before the firm\'s work" {"" if i == 0 else "loading=lazy"} width="1000" height="667"></div>' for i, j in enumerate(HERO_JOBS))
    R = ''.join(f'<div class="hs-i" data-i="{i}"><img src="{IMG[j + "-a"]}" alt="After: {esc(PLACE[j])}, the same wall after the firm\'s work" {"" if i == 0 else "loading=lazy"} width="1000" height="667"></div>' for i, j in enumerate(HERO_JOBS))
    plates = ''.join(f'<div class="pl" data-i="{i}"><p class="pl-k">{esc(PLACE[j])}</p><p class="pl-s">Step {i * 2 + 2:02d} of 06 · {esc(STEPS[i * 2 + 1])}</p>{cline("#fff")}<p class="pl-n">Before · After</p></div>' for i, j in enumerate(HERO_JOBS))
    return f'''<section class="p1" id="p1" aria-labelledby="p1-h" aria-roledescription="carousel">
<div class="p1-sticky"><div class="hs" id="hs"><div class="hs-col hs-l">{L}</div><div class="hs-col hs-r">{R}</div>
<div class="plates" aria-live="polite" aria-atomic="true">{plates}</div></div>
<div class="p1-copy"><p class="ty-label">Siding · windows · roofing · painting</p><h1 id="p1-h" class="ty-h1x">Laid by hand,<br>course by course.</h1>
<div class="row"><a class="btn btn-primary" href="#p3">Book an estimate {icon("action-arrow-right", 20)}</a><a class="btn btn-secondary" href="tel:+15125500000">{icon("communication-phone", 20)} (512) 550-0000</a></div></div>
<div class="p1-ctl"><button class="ctl" type="button" data-d="-1" aria-label="Previous job">{icon("action-arrow-right", 20)}</button><span class="ctl-n" aria-hidden="true"><b>1</b> / {len(HERO_JOBS)}</span><button class="ctl" type="button" data-d="1" aria-label="Next job">{icon("action-arrow-right", 20)}</button></div>
</div></section>'''


def p2():
    chips = ''.join(f'<label class="chip-in"><input type="radio" name="pair" value="{i}" {"checked" if p["id"] == "siding2" else ""}> {esc(p["place"])} · {"siding" if "siding" in p["id"] or p["id"] == "robroy" else "windows"}</label>' for i, p in enumerate(PAIRS))
    start = [p['id'] for p in PAIRS].index('siding2')
    return f'''<section class="p2" id="p2" aria-labelledby="p2-h"><div class="wrap p2-g">
<div class="seam-box" id="seam"><img class="sa" src="{IMG[PAIRS[start]["id"] + "-a"]}" alt="After: {esc(PAIRS[start]["place"])}" width="1000" height="667">
<div class="sb-clip"><img class="sbf" src="{IMG[PAIRS[start]["id"] + "-b"]}" alt="Before: {esc(PAIRS[start]["place"])}" width="1000" height="667"></div>
<div class="seam-line"><div class="seam-h" role="slider" tabindex="0" aria-label="Before and after divider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="50% before">{icon("trade-seam", 28, "#fff")}</div></div>
<span class="tag tb">Before</span><span class="tag ta">After</span></div>
<div class="p2-c"><p class="ty-label">177 genuine before/after pairs</p><h2 id="p2-h" class="ty-h2x" aria-live="polite">{esc(PAIRS[start]["place"])}</h2>
<p class="lead">Drag the seam, or focus it and use the arrow keys. Six pairs are shown here; the archive holds all 177.</p>
<fieldset class="chips"><legend class="ty-label">Pick a job</legend>{chips}</fieldset></div></div>
<script type="application/json" id="pairs">{{"a":[{",".join(f'"{IMG[p["id"] + "-a"]}"' for p in PAIRS)}],"b":[{",".join(f'"{IMG[p["id"] + "-b"]}"' for p in PAIRS)}],"place":[{",".join(f'"{esc(p["place"])}"' for p in PAIRS)}]}}</script></section>'''


def p3():
    boards = ''.join(f'<path class="w-board" data-k="{3 + (4 - i)}" d="M{596} {150 + i * 104}L{560} {262 + i * 104}H{596}Z"/>' for i in range(5))
    steps = ['Stud', 'Sheathing', 'Weather wrap', 'First course', 'Second course', 'Third course', 'Fourth course', 'Fifth course']
    ol = ''.join(f'<li data-k="{i}">{s}</li>' for i, s in enumerate(steps))
    return f'''<section class="p3" id="p3" aria-labelledby="p3-h"><div class="p3-sticky"><div class="wrap p3-g">
<div class="p3-c"><p class="ty-label on-dark">How a wall goes together</p><h2 id="p3-h" class="ty-h2x on-dark-h">Each board laps the one below it.</h2>
<p class="lead on-dark-p">Scroll, and the wall builds in the order the crew does it.</p><ol class="w-steps">{ol}</ol></div>
<svg class="wall" viewBox="400 20 540 740" role="img" aria-label="Section drawing of a sided wall: stud, sheathing, weather wrap and five lapped boards">
<path class="w-line" d="M400 40H940" pathLength="1"/>
<rect class="w-l w-stud" data-k="0" x="620" y="110" width="150" height="600"/>
<path class="w-l w-sheath" data-k="1" d="M609 110V710"/>
<path class="w-l w-wrap" data-k="2" d="M598 110V710"/>
<g class="w-boards">{boards}</g>
<path class="w-base" d="M560 726V740H940" pathLength="1"/>
<g class="w-lab"><text class="w-l" data-k="0" x="786" y="170">STUD</text><text class="w-l" data-k="1" x="786" y="250">SHEATHING</text><text class="w-l" data-k="2" x="786" y="330">WRAP</text><text class="w-l" data-k="3" x="786" y="410">BOARDS</text></g></svg>
</div></div></section>'''


CSS = r'''
*{box-sizing:border-box} html{-webkit-text-size-adjust:100%} body{margin:0;background:#fff;color:var(--color-text-primary);font:400 var(--type-body-size)/1.6 var(--font-text)}
.wrap{max-width:var(--layout-max-width);margin:0 auto;padding:0 var(--layout-gutter)} :focus-visible{outline:3px solid var(--color-focus-ring);outline-offset:3px}
.wm{font:800 23px var(--font-display)} .lk{max-width:100%;height:auto}
.ty-label{font:600 var(--type-label-size)/1.3 var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--color-text-accent);margin:0 0 var(--space-03)}
.ty-h1x{font:800 var(--type-h1-size)/1.02 var(--font-display);letter-spacing:-.015em;margin:0 0 var(--space-06)} .ty-h2x{font:800 var(--type-h2-size)/1.08 var(--font-display);margin:0 0 var(--space-05)}
.lead{font-size:var(--type-lead-size);color:var(--color-text-secondary);max-width:46ch}
.row{display:flex;gap:var(--space-04);flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:10px;min-height:48px;padding:0 24px;border-radius:2px;font:600 16px var(--font-text);text-decoration:none;border:2px solid transparent;transition:background-color var(--duration-fast) var(--ease-standard)}
.btn-primary{background:var(--color-accent-solid);color:#fff} .btn-primary:hover{background:var(--color-accent-solid-hover)} .btn-secondary{background:#fff;color:var(--color-text-primary);border-color:var(--color-border-control)}
.hdr{position:sticky;top:0;z-index:20;background:#fff;border-bottom:1px solid var(--color-border-subtle)} .hdr .wrap{display:flex;align-items:center;justify-content:space-between;height:68px}
.hdr a.call{display:inline-flex;gap:8px;align-items:center;font:700 16px var(--font-text);color:var(--color-text-primary);text-decoration:none;min-height:44px}
/* P1 hero */
.p1{height:260vh;position:relative} .p1-sticky{position:sticky;top:68px;height:calc(100vh - 68px);min-height:560px;overflow:hidden}
.hs{position:absolute;inset:0} .hs-col{position:absolute;top:0;bottom:0;width:50%;overflow:hidden} .hs-l{left:0} .hs-r{right:0}
.hs-i{position:absolute;inset:0;will-change:clip-path} .hs-i img{width:100%;height:100%;object-fit:cover;display:block}
.hs-l .hs-i img,.hs-r .hs-i img{width:200%;max-width:none} .hs-r .hs-i img{margin-left:-100%}
.plates{position:absolute;left:50%;top:38%;transform:translate(-50%,-50%);width:min(420px,80vw);height:150px;z-index:3}
.pl{position:absolute;inset:0;background:var(--color-bg-accent-field);color:#fff;padding:20px 24px} .pl p{margin:0} .pl-k{font:800 24px var(--font-display)} .pl-s{font:600 15px var(--font-text);margin:6px 0 12px!important}
.pl-n{font:600 12px var(--font-text);letter-spacing:.06em;text-transform:uppercase;color:var(--steel-4);margin-top:8px!important}
.p1-copy{position:absolute;left:0;bottom:0;z-index:4;background:#fff;padding:var(--space-07) var(--layout-gutter) var(--space-07) max(var(--layout-gutter),calc((100vw - var(--layout-max-width))/2 + var(--layout-gutter)));width:min(720px,100%)}
.p1-ctl{position:absolute;right:var(--layout-gutter);bottom:var(--space-06);z-index:4;display:flex;align-items:center;gap:var(--space-03);background:#fff;padding:6px}
.ctl{width:48px;height:48px;display:grid;place-items:center;border:1px solid var(--color-border-control);background:#fff;border-radius:2px;cursor:pointer;color:var(--color-text-primary)} .ctl[data-d="-1"] svg{transform:scaleX(-1)}
.ctl-n{font:600 15px var(--font-text);min-width:48px;text-align:center}
/* P2 seam */
.p2{padding:var(--layout-section-pad) 0} .p2-g{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:var(--space-09);align-items:center}
.seam-box{position:relative;aspect-ratio:3/2;overflow:hidden;touch-action:pan-y;user-select:none;cursor:ew-resize}
.seam-box img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;pointer-events:none}
.sb-clip{position:absolute;inset:0;clip-path:inset(0 50% 0 0)} .seam-line{position:absolute;top:0;bottom:0;left:50%;width:3px;margin-left:-1.5px;background:#fff}
.seam-h{position:absolute;top:50%;left:50%;width:56px;height:56px;transform:translate(-50%,-50%);background:var(--color-accent-solid);display:grid;place-items:center;border-radius:2px;cursor:ew-resize}
.seam-h:focus-visible{outline:3px solid #fff;outline-offset:3px;box-shadow:0 0 0 6px var(--steel-9)}
.tag{position:absolute;bottom:16px;background:var(--color-bg-inverse);color:#fff;font:600 14px var(--font-text);padding:6px 12px} .tb{left:16px} .ta{right:16px}
.chips{border:0;padding:0;margin:var(--space-06) 0 0;display:flex;flex-wrap:wrap;gap:var(--space-03)} .chips legend{margin-bottom:var(--space-03);padding:0}
.chip-in{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 var(--space-04);border:1px solid var(--color-border-control);border-radius:2px;cursor:pointer;font-size:15px}
.chip-in:has(input:checked){background:var(--color-bg-accent-subtle);box-shadow:inset 0 0 0 2px var(--steel-11)} .chip-in input{accent-color:var(--steel-9);margin:0}
/* P3 wall */
.p3{height:300vh;position:relative;background:var(--color-bg-deep)} .p3-sticky{position:sticky;top:68px;height:calc(100vh - 68px);min-height:560px;display:flex;align-items:center;overflow:hidden}
.p3-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.2fr);gap:var(--space-08);align-items:center;width:100%}
.on-dark{color:var(--steel-5)} .on-dark-h{color:#fff} .on-dark-p{color:var(--steel-3)}
.w-steps{list-style:none;padding:0;margin:var(--space-06) 0 0;display:grid;gap:6px;color:var(--steel-5);font:600 15px var(--font-text)}
.w-steps li{padding-left:22px;position:relative} .w-steps li::before{content:"";position:absolute;left:0;top:.55em;width:12px;height:3px;background:var(--steel-10)}
.w-steps li.done{color:#fff} .w-steps li.done::before{background:var(--steel-6)}
.wall{width:100%;height:auto;max-height:calc(100vh - 140px)} .w-line,.w-base{fill:none;stroke:var(--steel-6);stroke-width:4;stroke-dasharray:1;stroke-dashoffset:1}
.w-stud{fill:none;stroke:var(--steel-8);stroke-width:4} .w-sheath{stroke:var(--steel-9);stroke-width:16} .w-wrap{stroke:var(--steel-7);stroke-width:4;stroke-dasharray:12 9}
.w-board{fill:var(--steel-12);stroke:var(--steel-6);stroke-width:4;stroke-linejoin:miter} .w-l,.w-board{opacity:0}
.w-lab text{font:600 19px var(--font-text);letter-spacing:.08em;fill:var(--steel-6)}
.note{font-size:var(--type-small-size);color:var(--color-text-secondary);max-width:76ch} .foot{padding:var(--space-09) 0;border-top:1px solid var(--color-border-subtle)}
@media (max-width:900px){.p2-g,.p3-g{grid-template-columns:minmax(0,1fr)} .p1-copy{width:100%;padding:var(--space-05) var(--layout-gutter)} .plates{top:30%} .p1-ctl{bottom:auto;top:var(--space-04)} .w-lab{display:none}}
'''

JS = r'''
(function(){
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const css=n=>getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
// settle curve for boards: cubic-bezier(.34,1.3,.5,1) sampled numerically
function bez(x1,y1,x2,y2){return t=>{let lo=0,hi=1,u=t;for(let i=0;i<24;i++){u=(lo+hi)/2;const x=3*(1-u)*(1-u)*u*x1+3*(1-u)*u*u*x2+u*u*u;if(x<t)lo=u;else hi=u;}return 3*(1-u)*(1-u)*u*y1+3*(1-u)*u*u*y2+u*u*u;}}
const settle=bez(.34,1.3,.5,1);

// ---------------- P1 hero split-slider (MERSI mechanism)
const p1=document.getElementById('p1'),L=[...document.querySelectorAll('.hs-l .hs-i')],R=[...document.querySelectorAll('.hs-r .hs-i')],PL=[...document.querySelectorAll('.pl')];
const N=L.length; let target=0,shown=0,dragging=false,dragY=0,dragStart=0,fromScroll=true,raf=0;
function paint(pos){pos=clamp(pos,0,N-1);const i=Math.floor(pos),f=pos-i;
  for(let k=0;k<N;k++){let l,r,p;
    if(k<=i){l=r=p='inset(0% 0% 0% 0%)';}
    else if(k===i+1){const t=(100-f*100).toFixed(3);l=`inset(${t}% 0% 0% 0%)`;r=`inset(0% 0% ${t}% 0%)`;p=`inset(${t}% 0% 0% 0%)`;}
    else{l='inset(100% 0% 0% 0%)';r='inset(0% 0% 100% 0%)';p='inset(100% 0% 0% 0%)';}
    L[k].style.clipPath=l;R[k].style.clipPath=r;PL[k].style.clipPath=p;L[k].style.zIndex=R[k].style.zIndex=PL[k].style.zIndex=k;}
  const cur=Math.round(pos);document.querySelector('.ctl-n b').textContent=cur+1;
  PL.forEach((e,k)=>e.setAttribute('aria-hidden',k===cur?'false':'true'));}
function tick(){const k=reduce?1:.12;shown+=(target-shown)*k;if(Math.abs(target-shown)<.0005)shown=target;paint(shown);
  if(shown!==target)raf=requestAnimationFrame(tick);else raf=0;}
function go(t){target=clamp(t,0,N-1);if(!raf)raf=requestAnimationFrame(tick);}
function scrollPos(){const r=p1.getBoundingClientRect(),run=p1.offsetHeight-innerHeight;return clamp(-r.top/run,0,1)*(N-1);}
addEventListener('scroll',()=>{if(fromScroll&&!dragging)go(scrollPos());},{passive:true});
document.querySelectorAll('.ctl').forEach(b=>b.addEventListener('click',()=>{const t=clamp(Math.round(target)+ +b.dataset.d,0,N-1);fromScroll=false;
  const run=p1.offsetHeight-innerHeight;scrollTo({top:p1.offsetTop+run*t/(N-1)-0,behavior:'instant'});go(t);setTimeout(()=>fromScroll=true,50);}));
const hs=document.getElementById('hs');
hs.addEventListener('pointerdown',e=>{dragging=true;dragY=e.clientY;dragStart=target;hs.setPointerCapture(e.pointerId);});
hs.addEventListener('pointermove',e=>{if(!dragging)return;go(dragStart+(dragY-e.clientY)/(hs.clientHeight*.6));});
hs.addEventListener('pointerup',()=>{dragging=false;});
p1.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){const d=e.key==='ArrowRight'?1:-1;document.querySelector(`.ctl[data-d="${d}"]`).click();e.preventDefault();}});
paint(0);

// ---------------- P2 seam
const box=document.getElementById('seam'),clip=box.querySelector('.sb-clip'),line=box.querySelector('.seam-line'),h=box.querySelector('.seam-h');
let x=50,sd=false;
function setX(v){x=clamp(v,5,95);clip.style.clipPath=`inset(0 ${(100-x).toFixed(2)}% 0 0)`;line.style.left=x+'%';
  h.setAttribute('aria-valuenow',Math.round(x));h.setAttribute('aria-valuetext',`${Math.round(x)}% before`);}
function fromEv(e){const r=box.getBoundingClientRect();setX((e.clientX-r.left)/r.width*100);}
box.addEventListener('pointerdown',e=>{sd=true;box.setPointerCapture(e.pointerId);fromEv(e);});
box.addEventListener('pointermove',e=>{if(sd)fromEv(e);});box.addEventListener('pointerup',()=>sd=false);
h.addEventListener('keydown',e=>{const m={ArrowLeft:-5,ArrowRight:5,ArrowDown:-5,ArrowUp:5,PageDown:-10,PageUp:10};
  if(e.key in m){setX(x+m[e.key]);e.preventDefault();}else if(e.key==='Home'){setX(5);e.preventDefault();}else if(e.key==='End'){setX(95);e.preventDefault();}});
const PD=JSON.parse(document.getElementById('pairs').textContent);
document.querySelectorAll('input[name=pair]').forEach(r=>r.addEventListener('change',()=>{const i=+r.value;
  const a=box.querySelector('.sa'),b=box.querySelector('.sbf');
  const swap=()=>{a.src=PD.a[i];b.src=PD.b[i];a.alt='After: '+PD.place[i];b.alt='Before: '+PD.place[i];document.getElementById('p2-h').textContent=PD.place[i];};
  if(reduce){swap();return;}
  // the MERSI wipe, carried to the pair switch: the new pair wipes down over the old one (600 ms, ease-draw)
  const cover=document.createElement('div');cover.style.cssText='position:absolute;inset:0;z-index:5;background:var(--color-bg-accent-field)';box.appendChild(cover);
  cover.animate([{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}],{duration:300,easing:css('--ease-draw'),fill:'forwards'}).finished.then(()=>{swap();
    return cover.animate([{clipPath:'inset(0 0 0 0)'},{clipPath:'inset(100% 0 0 0)'}],{duration:300,easing:css('--ease-draw'),fill:'forwards'}).finished;}).then(()=>cover.remove());}));
setX(50);

// ---------------- P3 wall assembly
const p3=document.getElementById('p3'),layers=[...p3.querySelectorAll('[data-k]')].filter(e=>e.tagName!=='LI'),lis=[...p3.querySelectorAll('.w-steps li')];
const wl=p3.querySelector('.w-line'),wb=p3.querySelector('.w-base');const K=8;
function wall(p){p=clamp(p,0,1);wl.style.strokeDashoffset=1-clamp(p*K/1.2,0,1);wb.style.strokeDashoffset=1-clamp((p-.92)/.08,0,1);
  layers.forEach(e=>{const k=+e.dataset.k,lp=clamp((p*K*1.05-k-.2),0,1);
    if(e.classList.contains('w-board')){const s=reduce?(lp>0?1:0):settle(lp);e.style.opacity=lp>0?1:0;e.style.transform=`translateY(${(1-s)*-40}px)`;}
    else{e.style.opacity=reduce?(lp>0?1:0):lp;}});
  lis.forEach(li=>li.classList.toggle('done',p*K*1.05-(+li.dataset.k)-.2>0));}
function wallScroll(){const r=p3.getBoundingClientRect(),run=p3.offsetHeight-innerHeight;wall(-r.top/run);}
addEventListener('scroll',()=>requestAnimationFrame(wallScroll),{passive:true});wall(0);

window.__p3b={hero:(v)=>{target=shown=clamp(v,0,N-1);paint(v);},seam:setX,wall};
})();
'''

PAGE = f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Proof Sections, Phase 3b</title>
<style>{FACES}{TOK}{CSS}</style></head><body>
<header class="hdr"><div class="wrap">{lockup(P["steel-9"], P["neutral-13"], 30, True)}<a class="call" href="tel:+15125500000">{icon("communication-phone", 18)} (512) 550-0000</a></div></header>
<main>{p1()}{p2()}{p3()}</main>
<footer class="foot"><div class="wrap"><p class="note">Phase 3b proof sections, built in this thread. Photos are the firm's own genuine before/after pairs (IMAGE-REGISTRY). The process step names are draft copy for the firm. Nothing here is published; the forms and buttons send nothing.</p></div></footer>
<script>{JS}</script></body></html>'''

open(os.path.join(BV2, 'phase3b-proof.html'), 'w', encoding='utf-8').write(PAGE)
print('wrote phase3b-proof.html', len(PAGE) // 1024, 'KB')
