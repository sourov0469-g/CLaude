# Skill Pack Notes: open-design/motion-lab (S0634)

Source: Motion.Lab (MIT, commit fbfda036). 160 cases (basic/text/interaction/advanced), each with params, HTML, CSS and JS. Upstream calls the code "an integration starting point, not a compatibility guarantee". Keep the MIT attribution in shipped code. Read in full; translated from Chinese.

## 1. Selection method (the skill's 7 steps)
1. Name the state or action to express. Check the existing stack. Search the index (name, ID, category, tag) and pick the closest case. **"Do not pile on effects just to show off the library."**
2. Read only that case's section: its params plus the raw HTML/CSS/JS.
3. Adapt it to the real DOM and lifecycle. Give CSS params units. **Check that the JS actually uses each param** (many snippets hardcode it). Scope selectors to the component. Instances must not share state.
4. Dependencies: Three.js and GSAP are NOT bundled. Reuse what is already loaded and never add several animation frameworks. Size Canvas/WebGL to the container and the DPR.
5. Clean up rAF, timers, scroll and pointer listeners, and GPU resources. Batch scroll work per frame. Animation must never block click or keyboard feedback.
6. Respect `prefers-reduced-motion` with a static or simplified state. Support keyboard, touch and focus. Remove hardcoded sizes, placeholder text and asset paths.
7. Verify that it triggers, stops, unmounts and re-enters. Report only what you actually observed.

Shortcuts from the skill: ripple → `click-ripple-material`; heading typing → `text-typewriter`; card flip → `hover-flip-card`; scroll entry → `scroll-reveal`; particles → `particle-fountain`, `canvas-starfield`, `flow-field` or `particle-galaxy`.

## 2. Upstream defects to fix when porting (found by reading)
- `c.replaceWith(s)` on a string char is broken in split-char, text-rotate-in, text-wave-3d, text-bounce, text-char-fall and hover-magnetic-text. Build the spans with innerHTML (see `split` in B) and put the full text in `aria-label`.
- `span:nth-child(n){animation-delay:calc(0.1s*n)}` does nothing, because `n` is not a CSS variable. Use `animation-delay: calc(var(--i) * 0.1s)`.
- Hardcoded instead of using `params`: magnetic-cursor 0.4, magnetic-button 80/0.3, mag-text 100/0.35, blob offset 20. drag-scroll's "inertia 0.6s" param has **no inertia code** (see D).
- scroll-parallax and scroll-progress use raw `scroll` listeners and scroll-progress animates `width`. Use rAF plus `transform: scaleX()`.
- The three.js snippets have no renderer, camera or loop. The shader snippets are fragment strings only.
- morph-svg's `setAttribute('d')` every 1.5s **does not tween**. A real morph needs paths with the same point structure (or flubber, per S0652).

## 3. Easing vocabulary used across the library (exact)
- `cubic-bezier(0.2, 0.8, 0.2, 1)`: interaction default (magnetic, hover-scale, hover-rotate, text-reveal, img-zoom, burst)
- `cubic-bezier(0.22, 1, 0.36, 1)`: text entrances (text-fade-up, text-slide-left, word-fly)
- `cubic-bezier(0.65, 0, 0.35, 1)`: mask/split reveals (in-out)
- `cubic-bezier(0.34, 1.56, 0.64, 1)`: back-out overshoot (zoom-bounce, scale-in, char-fall, text-zoom-in, corner-slide)
- `cubic-bezier(0.68, -0.55, 0.265, 1.55)`: elastic (elastic-in). Too playful for this brand.
- `cubic-bezier(0.4, 0, 0.2, 1)`: toggle knob. `linear` only for marquee, spinner and scrub.

## 4. Catalogue: the cases that fit this build

### A. Cursor, follower, magnetic, per-element cursor states
| id | what | exact params |
|---|---|---|
| `hover-follow-cursor` | dot lerps toward the pointer | lerp 0.1 (0.02–0.3); 24px dot; `translate(-50%,-50%)`; `cursor:none` |
| `blob-cursor` | fixed blob that inverts what it covers | 40px (20–80); `mix-blend-mode: difference`; `transition: transform 0.15s`; offset −size/2 |
| `magnetic-cursor` | element pulled toward the pointer while it is inside the element | strength 0.4 (0.1–0.8); `(clientX − centre) × 0.4`; `transition: transform 0.3s cubic-bezier(0.2,0.8,0.2,1)`; reset on leave |
| `magnetic-button` | pull starts in a radius *around* the button | radius 80px (30–200); factor 0.3; same 0.3s curve |
| `hover-magnetic-text` | per-letter magnet | radius 100px; factor 0.35 (0.1–0.8); per-span `transition: transform 0.2s cubic-bezier(0.2,0.8,0.2,1)` |
| `grid-magnetic` | dot field bends toward the pointer | radius 100 (40–200); dots 4px on a 24px grid (6×12); factor 0.3; `transition: transform 0.2s` |
| `spotlight-follow` | radial light follows the pointer, rest stays dark | `radial-gradient(circle 220px at x y, rgba(255,255,255,.25), #111 70%)`; size 100–400 |
| `color-picker-hover` | glow at the pointer via CSS vars | `radial-gradient(circle at var(--x) var(--y), hsl(var(--h) 90% 60%), transparent 50%)`; size 300 (100–600) |

Skeleton (one cursor, many states):
```js
const c=document.querySelector('.cur'); let tx=innerWidth/2,ty=innerHeight/2,x=tx,y=ty;
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY},{passive:true});
(function f(){x+=(tx-x)*0.1;y+=(ty-y)*0.1;c.style.transform=`translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;requestAnimationFrame(f)})();
document.addEventListener('pointerover',e=>{const t=e.target.closest('[data-cursor]');c.dataset.state=t?t.dataset.cursor:'';c.dataset.label=t?.dataset.cursorLabel||''});
// magnetic-button (radius 80, k 0.3)
function magnet(btn,R=80,k=0.3){addEventListener('pointermove',e=>{const r=btn.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);btn.style.transform=Math.hypot(dx,dy)<R+r.width/2?`translate(${dx*k}px,${dy*k}px)`:''})}
```
```css
.cur{position:fixed;left:0;top:0;width:40px;height:40px;border-radius:50%;pointer-events:none;mix-blend-mode:difference;transition:width .3s cubic-bezier(.2,.8,.2,1),height .3s cubic-bezier(.2,.8,.2,1)}
@media (hover:none),(pointer:coarse){.cur{display:none}}
```
**Applies here.** Each element type gets its own case. Hero CTA: `magnetic-button` (R80, k0.3), with the blob snapping over it in `difference`. Next section's button: `magnetic-cursor` (inside only, k0.4), with the cursor shrunk to a 6px dot. Galleries: the follower grows to about 80px with a "DRAG" label (the lerp-0.1 lag reads as weight). Swatches: `color-picker-hover`, with the cursor taking the swatch colour from `data-swatch`, plus a 220px `spotlight-follow` on the slab. Display text: `hover-magnetic-text` (100px, 0.35) on one word only. Floor plans: `grid-magnetic` blueprint dots. Prefer `scale()` to width/height on the cursor.

### B. Text effects (split, scramble, mask, hover letters)
| id | exact params |
|---|---|
| `mask-reveal` | `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)`; 1.2s (0.4–2.5) `cubic-bezier(0.65,0,0.35,1)` forwards |
| `split-char` | odd chars from `translateY(-100%)`, even from `translateY(100%)`; 0.8s ease-out both |
| `scramble` | ticks every 50ms; char i resolves when `i < frame/3`; stops at `frame > len*3`; charset `A–Z!@#$%`; duration param 1.5s; monospace |
| `text-blur-reveal` | `opacity 0, blur(20px), letter-spacing .4em` → `1, 0, -0.02em`; 1.2s ease-out |
| `text-fade-up` | translateY 24px (10–60); 0.9s `cubic-bezier(0.22,1,0.36,1)` |
| `text-word-fly` | per word `translateZ(-200px) rotateY(40deg)` → 0; 0.7s `cubic-bezier(0.22,1,0.36,1)`; stagger 0.12s (0.05–0.4) |
| `text-char-fall` | `translateY(-60px) rotate(-20deg)` → 0; 1.2s `cubic-bezier(0.34,1.56,0.64,1)`; 0.1s per char |
| `text-zoom-in` | `scale(.3)` + `letter-spacing .3em` → `1` + `-0.02em`; 0.8s back-out |
| `hover-text-reveal` | hidden label `translateY(100%)`→0 under `overflow:hidden`; 0.4s `(0.2,0.8,0.2,1)` |
| `underline-draw` | `::after` 3px at bottom −4px, width 0→100%; 0.8s ease-out. Port as `scaleX` from `transform-origin:left` |
| `highlight-sweep` | gradient bar `translateX(-100%)`→`100%`; 2.5s ease-in-out loop; `mix-blend-mode: multiply` |
| `text-stroke-animate` | SVG `<text>` `stroke-dasharray/offset 600`→0; 2.5s ease-out; stroke-width 2, fill transparent |
| `stagger-fade` | 0.5s per item, stagger 0.1s |

Skeletons:
```js
// split helper (fixed) + scramble
const split=(el,by='')=>{el.setAttribute('aria-label',el.textContent);el.innerHTML=el.textContent.split(by).map((t,i)=>`<span aria-hidden="true" style="--i:${i};display:inline-block">${t===' '?'&nbsp;':t}</span>`).join(by?' ':'')};
function scramble(el,target,cs='ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%'){let f=0;const id=setInterval(()=>{el.textContent=[...target].map((c,i)=>i<f/3?c:cs[Math.random()*cs.length|0]).join('');if(f++>target.length*3)clearInterval(id)},50)}
```
```css
.reveal-line{clip-path:inset(0 0 100% 0);transition:clip-path 1.2s cubic-bezier(.65,0,.35,1)} .in .reveal-line{clip-path:inset(0)}
.fly span{opacity:0;transform:translateZ(-200px) rotateY(40deg);transition:transform .7s cubic-bezier(.22,1,.36,1) calc(var(--i)*.12s),opacity .7s calc(var(--i)*.12s)} .in .fly span{opacity:1;transform:none}
```
**Applies here** (each used once; see §5): hero `mask-reveal` per line, `text-blur-reveal` or `split-char`; services `text-word-fly`; stats `text-zoom-in`; testimonials `scramble` (names, dates and IDs only, never prose), `text-char-fall` or `highlight-sweep`; CTA labels `hover-text-reveal`; links `underline-draw` (as scaleX); one fixture word `text-metallic` (lightness 85/35/75/30/80%, bg 100% 200%, 2.5s shine). Skip glitch, neon, fire, ice and rainbow (off-brand).

### C. Image reveals, curtains and hover distortion
| id | exact params |
|---|---|
| `drag-to-reveal` | cover `clip-path: inset(0 p% 0 0)`, p clamped 0–100 from `startPct + dx/width*100`; `transition: clip-path 0.2s` (0.1–0.6); `cursor: ew-resize` |
| `hover-image-zoom` | inner image `scale(1.3)` (1.1–2) under `overflow:hidden`; `0.5s cubic-bezier(0.2,0.8,0.2,1)` |
| `hover-image-distort` | `<feTurbulence baseFrequency=0.02 numOctaves=2>` + `<feDisplacementMap scale=20>`; amount 0.02 (0–0.05); `transition: filter 0.3s` |
| `fluid-distort` | `fractalNoise`, baseFrequency 0.02, octaves 2, seed 3, `<animate values="0.02;0.04;0.02" dur="6s">`; displacement scale 24 (0–60) |
| `blur-in` | `blur(14px) scale(1.05) opacity 0` → clear; 0.8s ease-out (blur 4–30) |
| `grayscale-in` | `grayscale(1) brightness(1.2) opacity .4` → colour; 1.2s ease-out |
| `hover-blur` | background `blur(6px)` (2–16) on hover, 0.3s |
| `hover-flip-card` | `perspective:800px`; inner `rotateY(180deg)`; 0.6s; `backface-visibility:hidden` |
| `three-d-tilt` | `perspective(600px) rotateY(x*30deg) rotateX(-y*30deg)` (x and y in −0.5..0.5, so ±15°); `transition: transform .2s` |
| `tilt-card-strong` | `perspective(800px)`, max 25° (`x*max*2`); `transition .15s`; reset on leave |

Skeletons:
```js
// before/after (drag-to-reveal ported to pointer events + direct clip on the moving layer)
const w=document.querySelector('.ba'),aft=w.querySelector('.after');let on=false;
w.addEventListener('pointerdown',e=>{on=true;w.setPointerCapture(e.pointerId);move(e)});
w.addEventListener('pointermove',e=>on&&move(e)); w.addEventListener('pointerup',()=>on=false);
function move(e){const r=w.getBoundingClientRect(),p=Math.min(100,Math.max(0,(e.clientX-r.left)/r.width*100));aft.style.clipPath=`inset(0 ${100-p}% 0 0)`;w.querySelector('.handle').style.transform=`translateX(${p/100*r.width}px)`;w.setAttribute('aria-valuenow',Math.round(p))}
```
```html
<svg width="0" height="0"><filter id="fd"><feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="3"><animate attributeName="baseFrequency" dur="6s" values="0.02;0.04;0.02" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="24"/></filter></svg>
```
**Applies here.** Before/after: `drag-to-reveal` (v1 x-wipe; v2 y-wipe `inset(p% 0 0 0)`; v3 adds a `grayscale-in` before-state). No clip transition while dragging (S0652); the 0.2s is only for keyboard steps. Gallery hover: `hover-image-zoom` 1.3 (or S0652's 1.02 card). Pool and outdoor projects: `fluid-distort` once ("heat haze"). Service cards: `three-d-tilt` ±15° or `hover-flip-card` with the spec on the back; materials: `tilt-card-strong`. Entry images: `blur-in`.

### D. Gallery, drag and inertia
| id | exact params |
|---|---|
| `drag-scroll` | `scrollLeft = start − (pageX − startX)`; `cursor:grab/grabbing`; `user-select:none`; flex gap 20px. **No inertia**: add velocity × decay (S0652 0.998) |
| `drag-rotate` | starts `rx −20, ry 20`; `ry += dx*0.6, rx −= dy*0.6` (sensitivity 0.2–2); `perspective(600px)` |
| `physics-spring` | `v += (target−p)*k; v *= d; p += v`; stiffness k 0.12 (0.02–0.3); damping d 0.88 (0.7–0.98); grab offset kept |
| `range-drag` | `pct = clamp((x − left)/width, 0, 1)`; 200px track, 20px knob, `tabular-nums` value |
| `sticky-stack` | cards `position: sticky; top: 80px`; padding 40, radius 16, gap 20 |

Inertia skeleton (fills the missing drag-scroll inertia):
```js
let x=0,v=0,last=0,t0=0,drag=false;
track.addEventListener('pointerdown',e=>{drag=true;track.setPointerCapture(e.pointerId);last=e.clientX;t0=performance.now();v=0});
track.addEventListener('pointermove',e=>{if(!drag)return;const now=performance.now(),dx=e.clientX-last;x+=dx;v=dx/Math.max(1,now-t0)*16;last=e.clientX;t0=now;render()});
track.addEventListener('pointerup',()=>{drag=false;(function glide(){if(Math.abs(v)<0.1)return snap();x+=v;v*=0.95;render();requestAnimationFrame(glide)})()});
```
**Applies here.** Project carousel: `drag-scroll` plus inertia and a "DRAG" cursor. CSS-3D object or cutaway: `drag-rotate` (0.6°/px). Pendant sway: `physics-spring` (0.12/0.88). Estimator: `range-drag`. Gallery v2 (or Design → Permit → Build): `sticky-stack`.

### E. Parallax depth layers
| id | exact params |
|---|---|
| `parallax-mouse` | `x,y = pointer/size − 0.5`; layer `translate(x*depth*20px, y*depth*20px)`; `data-depth` 1 (bg) and 3 (fg); intensity 20px (5–40); `transition: transform .2s` |
| `scroll-parallax` | layers `data-d` 0.3 / 0.6 / 1; `translateY(rect.top * d * 0.3)`; speed 0.3 (0.1–0.8); `transition .1s` |
| `gsap-scrollTrigger` | `x: 200` (50–400); `start:'top center', end:'bottom center', scrub:true` |

```js
const L=[...sec.querySelectorAll('[data-d]')];let ticking=false;
addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{const y=sec.getBoundingClientRect().top;L.forEach(l=>l.style.transform=`translate3d(0,${y*l.dataset.d*0.3}px,0)`);ticking=false})},{passive:true});
```
**Applies here** (a different depth recipe per section): hero pointer depths 1/3 ×20px; kitchens scroll layers 0.3/0.6/1 with the factor cut to about 0.15 (S0652 ≤15%); bathrooms a horizontal scrubbed `x`; whole-home tilt depth. Never parallax body text.

### F. Scroll-scrub sequences and choreography
| id | exact params |
|---|---|
| `gsap-timeline` | steps `to(x:60, 1s)` chained with `'<0.2'` overlap; reset `'+=0.3'`; `repeat:-1` |
| `scroll-reveal` | `translateY(40px)` (10–100) + opacity; 0.6s; IO `threshold: 0.2`; add class `.in` once |
| `scroll-progress` | fixed top bar 4px (2–10), gradient, `transition: width .1s`. Port as `scaleX(p)` |

**Applies here.** One pinned renovation scrub (demo → rough-in → finish): a `gsap-timeline` with `'<0.2'` overlaps under `scrub:true`, or `animation-timeline: view()` without GSAP. The progress bar becomes a measuring tape (`scaleX`).

### G. SVG line drawing (floor plans)
| id | exact params |
|---|---|
| `svg-draw-path` | `stroke-dasharray: 400; stroke-dashoffset: 400 → 0`; 3s (1–6) `ease-in-out infinite alternate` |
| `lottie-checkmark` | circle r 44 → dash 276; tick dash 60; both `ease-out` 0.8s; tick **delayed by one duration** (sequential); round caps and joins |
| `svg-dash-animate` | `stroke-dasharray: 8 6`; offset `0 → −28` (two periods of 14); 1.5s linear infinite (marching ants) |
| `trajectory-path` | `getTotalLength()` + `getPointAtLength(t*len)`; t += 16/(4000ms) per frame; period 4s (2–8) |

```js
plan.querySelectorAll('path,line,polyline,rect').forEach((p,i)=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;p.style.transition=`stroke-dashoffset 1.6s cubic-bezier(.65,0,.35,1) ${i*0.08}s`});
new IntersectionObserver((es,o)=>es.forEach(e=>{if(e.isIntersecting){e.target.querySelectorAll('[style*=dash]').forEach(p=>p.style.strokeDashoffset=0);o.unobserve(e.target)}}),{threshold:.3}).observe(plan);
```
**Applies here.** Plans draw in the order a builder works: walls, then door swings, then fixtures (`getTotalLength`, never 400). Sequence the groups like `lottie-checkmark` (each waits one duration). Dimension lines: `svg-dash-animate`. Walk-through dot: `trajectory-path`. Versions: v1 on enter, v2 scrubbed (`offset = len × (1 − progress)`), v3 per room on hover.

### H. Counters
| id | exact params |
|---|---|
| `count-up` | 1500ms; ease-out cubic `1 − (1 − t)^3`; `Math.floor`; `font-variant-numeric: tabular-nums` |
| `number-marquee` | digit track of 0–9, 60px rows; `translateY(-cur*60px)`; `transition: transform .5s ease`; tick 600ms (200–1500) |

```js
function countUp(el,to,d=1500){const s=performance.now();(function f(n){const t=Math.min(1,(n-s)/d);el.textContent=Math.floor(to*(1-Math.pow(1-t,3))).toLocaleString();if(t<1)requestAnimationFrame(f)})(s)}
```
**Applies here.** "Projects completed" uses `count-up`. Years and square footage use `number-marquee` (an odometer, a different trick). Do not use both in one section.

### I. Marquee
`marquee`: two identical spans, `display:flex; gap:32px; white-space:nowrap`; `translateX(0 → -50%)`; 12s (5–30) linear infinite; direction left or right.
**Applies here.** One band of service areas (Coral Gables · Brickell · Coconut Grove …) or partner brands. Pause it off-screen and under reduced motion.

### J. Section and page transitions, click feedback
| id | exact params |
|---|---|
| `flip-in-3d` | `perspective(800px) rotateX(-90deg) rotateY(-30deg) scale(.6)` → identity; 0.9s ease-out |
| `skew-in` | `skewX(-15deg) translateX(-30px)` → 0; 0.7s ease-out |
| `ripple-water` | 3 rings (2–6), 20px → `200 + i*80`px, `all 2s ease-out`, `i*0.2s` delay, opacity → 0 |
| `click-ripple-material` | 20px circle at click; `scale(0 → 10)`; 0.6s ease-out; white 0.5 alpha |
| `click-shockwave` | 3px ring, `scale(0 → 8)`, border to 1px, opacity 0; 0.8s ease-out |
| `button-press` | `:active` `scale(.92) translateY(4px)`, shadow 6px → 2px, 0.1s. S0652 says to use 0.96–0.98 instead |

**Applies here.** Section handoffs: one gets `skew-in` and one gets `flip-in-3d` (sparingly). The contact form's submit gets `click-shockwave` or `ripple-water` once, as the "rare, high-emotion" moment. Skip confetti and emoji.

### K. 3D and ambient (supporting)
- `3d-cube-rotate`: `perspective:600px`, faces translateZ 50px, 5s linear. Could serve as a material-sample cube.
- The three.js cases are stubs (Points size 0.04–0.05). Build the orbit room from the Three.js skill, not from here.
- `canvas-ocean` (Miami water strip): sine layers at 50%, 62% and 74% height; amplitudes 16/12/8; frequencies .02/.03/.04; `t += .05`.

## 5. No-repeat allocation (10 sections × 3 versions, each id used once)
| section | v1 | v2 | v3 |
|---|---|---|---|
| Hero | mask-reveal + parallax-mouse | text-blur-reveal + scroll-parallax | split-char + spotlight-follow |
| Services | text-word-fly + hover-image-zoom | hover-text-reveal + three-d-tilt | stagger-fade + hover-flip-card |
| Before/After | drag-to-reveal (x) | clip wipe (y) + grayscale-in | range-drag driving opacity crossfade |
| Process/Plans | svg-draw-path on enter | scrubbed dashoffset | trajectory-path walk-through + svg-dash-animate |
| 3D room | Three.js orbit (external) | drag-rotate CSS-3D cutaway | physics-spring lamp + 3d-cube sample |
| Materials | color-picker-hover cursor | tilt-card-strong | hover-blur peripheral focus |
| Gallery | drag-scroll + inertia | sticky-stack | fluid-distort hover |
| Stats | count-up | number-marquee | text-zoom-in |
| Testimonials | scramble (names/IDs) | text-char-fall | highlight-sweep |
| CTA/Contact | magnetic-button + shockwave | magnetic-cursor + ripple-water | hover-magnetic-text + click-ripple-material |

Global: one cursor engine (A), one `marquee`, one `scroll-progress` (as scaleX). Every loop pauses off-screen and under `prefers-reduced-motion`.
