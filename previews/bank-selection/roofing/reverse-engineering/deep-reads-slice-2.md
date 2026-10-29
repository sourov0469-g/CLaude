# DEEP READS — SLICE 2 (queue 50–128, 34 entries) — by Lane 2 helper
Completed 33/34 · Blocked 1 (Q74 — CodePen pen ID unrecoverable, 7 routes logged; stands on L2-recorded values, requeue recommended). All values labelled Measured / article-stated / L2-recorded / Inferred. Extracts in code-source/<slug>/.

# DEEP READS — SLICE 2, PART 1 (Q50, Q51, Q53, Q54, Q55, Q56, Q57, Q58, Q72)

Method: first contact via text-fetch of the live page/article/pen; then `fetch_and_mine.sh` same-host source pass into `code-source/<slug>/`; then hand-mining. Every value is labelled Measured (from source I fetched) / article-stated (verbatim code printed in the Codrops article) / Inferred. Two integrity notes apply to this batch: (1) the first-pass `values-raw.txt` for Q57 and Q58 contained stale `/tmp` carry-over from an unrelated site (the miner cats shared /tmp files when a site downloads 0 same-host assets) — those values were **discarded** and both entries re-mined from verified local files, as documented per entry; (2) CodePen full-view pages are 16K shells whose assets are all cross-host, so for pens the measured source of record is the pen's own code, captured verbatim from the pen page and confirmed via CodePen's `.js`/`.css`/`.html` exports saved in each slug directory.

---

## Q50 · LottieScrollTrigger — SVG renderer (GreenSock pen mdGdbwO) — https://codepen.io/GreenSock/pen/mdGdbwO

**Live URL:** https://codepen.io/GreenSock/pen/mdGdbwO (full view: /full/mdGdbwO). Source of record: pen JS/HTML/CSS captured verbatim (pen-source.js 2,366 B, pen-source.html, pen-source.css in `code-source/50-lottiescrolltrigger-svg/`). Routes: pen page text-fetch ✓ · .js/.css/.html exports ✓ · fetch_and_mine on full view (shell only, 10 cross-host assets skipped per discipline) ✓.

**Stack (Measured):** GSAP + ScrollTrigger, lottie-web (`lottie.loadAnimation`), one Lottie JSON (`https://assets.codepen.io/35984/tapered_hello.json` — cross-host pen asset, not fetched; frame count is read at runtime so the mechanism is frame-count-agnostic). HTML uses Foundation grid classes (`grid-container`, `grid-x`, `cell medium-6`) — Foundation CSS is loaded via pen settings, not present in the exports. Three sections `.section--01/02/03`, each containing `#section-lottie--NN > .lottie-container` (pen CSS: `.lottie-container { background-color:#ccc }`).

**Mechanism (step-by-step, rebuildable):**
1. `gsap.registerPlugin(ScrollTrigger)`. Compute one breakpoint flag: `mobile = window.innerWidth < 749`.
2. Define the reusable helper `LottieScrollTrigger(vars)`:
   - `playhead = {frame: 0}` — a plain object tweened as a proxy for the Lottie playhead.
   - Speed map: `speeds = {slow: "+=2000", medium: "+=1000", fast: "+=500"}` — the speed name selects the ScrollTrigger **end distance**.
   - Default ScrollTrigger object: `st = {trigger: target, pin: true, start: "top top", end: speeds[vars.speed] || "+=1000", scrub: 1}`.
   - Then **every key in vars overwrites the defaults** (`for (let p in vars) st[p] = vars[p]`) — callers can override trigger/pin/start/end/scrub per instance.
   - `lottie.loadAnimation({container: target, renderer: vars.renderer || "svg", loop: false, autoplay: false, path: vars.path, rendererSettings: vars.rendererSettings || {preserveAspectRatio: 'xMidYMid slice'}})`.
   - On the animation's `DOMLoaded` event (i.e. only after the JSON + SVG are in the DOM): create `gsap.to(playhead, {frame: animation.totalFrames - 1, ease: "none", onUpdate: () => animation.goToAndStop(playhead.frame, true), scrollTrigger: st})`. Wrapped in `gsap.context()` when available, with cleanup returning `animation.destroy()`.
   - After creating the tween: `ScrollTrigger.sort(); ScrollTrigger.refresh();` — because the injected Lottie SVG can change layout heights after other triggers were measured.
3. Instantiate three times — render target is the inner `.lottie-container`, but **trigger and pin are the outer section** (decoupled):
   - §1: target `#section-lottie--01 .lottie-container`, trigger `.section--01`, pin `.section--01`, speed "medium", scrub 1, start `mobile ? "center 45%" : "center center"`.
   - §2: trigger/pin `.section--02`, start `"center 75%"`.
   - §3: trigger/pin `.section--03`, start `mobile ? "center 45%" : "center 55%"`.
4. Scrolling each pinned section scrubs the playhead 0 → totalFrames−1 linearly (`ease:"none"`); `goToAndStop(frame, true)` renders the exact frame.

**Exact parameters (Measured):** renderer `"svg"` · loop false · autoplay false · preserveAspectRatio `'xMidYMid slice'` · frame tween ease `"none"` · scrub 1 (all three instances) · ends: slow `+=2000` / medium `+=1000` / fast `+=500` · breakpoint 749px · starts: `"center center"` / `"center 45%"` (<749px) / `"center 75%"` / `"center 55%"` · pin true.

**Rebuild notes:** Single-HTML: GSAP + ScrollTrigger + lottie-web from CDN, one helper function (~45 lines) — copy-paste grade. WordPress/Elementor: works in an HTML widget; make the Elementor section itself the trigger/pin and an inner div the render container, exactly as the pen decouples them. Phone cost: pen mechanism JS 2.4 KB, but lottie-web is ~250 KB minified and the SVG renderer builds a DOM node per path — keep Lottie files low-path-count on mobile; three pinned sections × `+=1000` adds 3,000px of scroll travel. Reduced-motion: none in the pen — gate the helper behind `gsap.matchMedia()` in production.

**Library-ready parameter sets:** (a) LottieScrollTrigger helper v2 (context-aware, sort/refresh after DOMLoaded, `'xMidYMid slice'`); (b) speed→end-distance map {slow 2000, medium 1000, fast 500}; (c) breakpoint start pairs {<749px: "center 45%", else "center center"/"center 55%"} + "center 75%" unpinned-feel variant.

---

## Q51 · LottieScrollTrigger Approach 1 (fixed) (GreenSock pen KKWdLRE) — https://codepen.io/GreenSock/pen/KKWdLRE

**Live URL:** https://codepen.io/GreenSock/pen/KKWdLRE. Source of record: pen code verbatim (pen-source.js 1,141 B, pen-source.css, pen-source.html in `code-source/51-lottiescrolltrigger-approach1/`). This is the earlier, simpler version of the Q50 helper — the pair is a perfect before/after.

**Stack (Measured):** GSAP + ScrollTrigger + lottie-web, SVG renderer. Single target `<div id="animationWindow">` at 100% × 100%. Lottie file: `https://assets10.lottiefiles.com/packages/lf20_4bcn1zdo.json`. CSS: `body { background:#0A1045; overflow-x:hidden }`, and a global `path { stroke:#17D4D6 }` that recolors every stroke the Lottie SVG injects.

**Mechanism:**
1. Same helper shape as Q50: playhead {frame:0}; defaults `st = {trigger: target, pin: true, start: "top top", end: speeds[speed] || "+=1000", scrub: 1}`; vars override defaults key-by-key; `loadAnimation({container, renderer: vars.renderer || "svg", loop:false, autoplay:false, path})` — **no rendererSettings** (Lottie default preserveAspectRatio applies).
2. On `DOMLoaded`: `gsap.to(playhead, {frame: totalFrames - 1, ease: "Power2.easeOut", onUpdate: goToAndStop, scrollTrigger: st})`. No `gsap.context`, no `ScrollTrigger.sort()/refresh()` — the "(fixed)" in the title refers to creating the tween inside DOMLoaded (the original bug was tweening before the animation data existed).
3. The single call: `LottieScrollTrigger({target: "#animationWindow", path: …, speed: "slow", scrub: 2})`.

**Exact parameters (Measured) — and the deltas vs Q50:** speed map {slow: **"+=30000"**, medium: "+=1000", fast: "+=500"} (Q50's slow is "+=2000" — a 15× reduction between versions); call scrub **2** (comment in code: "seconds it takes for the playhead to 'catch up'") overriding default scrub 1; frame-tween ease **"Power2.easeOut"** (Q50: "none"); end for the demo instance = "+=30000" of pinned scroll.

**Rebuild notes:** Prefer Q50's version in production. Two cautions this pen teaches: (1) `ease:"Power2.easeOut"` on a scrubbed tween double-eases (scrub already smooths; the ease also warps frame-vs-scroll linearity — frames bunch at the end of the scroll range); use `ease:"none"` for true scroll↔frame mapping. (2) `+=30000` is a 30,000px pinned scroll-jack — fine for a full-screen single-animation demo, unusable in a page. Phone cost: mechanism JS 1.1 KB + lottie-web; the global `path{stroke}` recolor trick is free and worth stealing for monochrome Lottie art.

**Library-ready parameter sets:** (a) version-delta record for LottieScrollTrigger (v1 → v2 changes: slow 30000→2000, Power2.easeOut→none, +context, +sort/refresh, +rendererSettings slice); (b) scrub-as-catch-up-seconds comment convention (scrub 2); (c) global stroke recolor `path{stroke:<brand>}` for Lottie SVGs.

---

## Q53 · How to Animate SVG Shapes on Scroll (Codrops — OnScrollPathAnimations) — https://tympanus.net/codrops/2022/06/08/how-to-animate-svg-shapes-on-scroll/

**Live URL:** article above (full code published verbatim in the article — that code is the measured source). **Demo routes logged:** (1) `https://tympanus.net/Development/OnScrollPathAnimations/` → 404 page (fetched, 4.0K — Codrops has migrated its demo hosting); (2) search for the demo URL → not surfaced; (3) Wayback availability API → HTTP 429 (rate-limited); (4) article HTML link audit → no standalone demo link; the article embeds its demo via the `codrops-web-demo` plugin. Demo bundle therefore unmeasured; nothing else about the entry depends on it — the article prints the complete demo source.

**Stack (article-stated):** GSAP + ScrollTrigger (attr tween on `d`), Lenis via `@studio-freight/lenis` (2022 package name), a `preloader()` module that runs before setup, ES-module imports. No WebGL, no pinning.

**Mechanism (step-by-step, rebuildable):**
1. **Author path pairs with identical command structure.** Every animated path carries its start shape in `d` and its end shape in `data-path-to`. GSAP's attr interpolation tweens the numbers inside the `d` string, so both paths must contain the same commands/points in the same order. Workflow from the article: design the *complex final* shape first (Sketch → SVGOMG to strip transforms → SvgPathEditor for rounding), then derive the flat initial shape from it by moving its points — never the reverse.
2. **Separator form:** `<svg class="separator separator--up" width="100%" height="100%" viewBox="0 0 100 10" preserveAspectRatio="none">` with path `d="M 0 0 C 40 0 60 0 100 0 L 0 0 Z"`, `data-path-to="M 0 0 C 40 10 60 10 100 0 L 0 0 Z"`, `vector-effect="non-scaling-stroke"`. CSS: `.separator { display:block; position:absolute; z-index:1000; pointer-events:none; width:100%; height:150px; fill: var(--color-bg) }` — the fill matches the page background, so the morphing wave reads as the edge of the full-bleed image it sits on; height (150px) sets the wave's drama.
3. **Smooth scroll:** `const lenis = new Lenis({ lerp: 0.1, smooth: true })` driven by a hand-rolled rAF loop (`lenis.raf(); requestAnimationFrame(scrollFn)`) — the 2022 pattern, predating the `lenis.on('scroll', ScrollTrigger.update)` + gsap.ticker integration.
4. **The tween (one per path):** collect `path.path-anim`; for each, `svgEl = el.closest('svg')`, `pathTo = el.dataset.pathTo`; `gsap.timeline({scrollTrigger:{trigger: svgEl, start:"top bottom", end:"bottom top", scrub:true}}).to(el, {ease:'none', attr:{d: pathTo}})`. The morph therefore runs exactly while the SVG crosses the viewport — no pin, no extra scroll length.
5. **Clip-path variant:** the identical `.path-anim` technique placed inside `<clipPath>`: `<svg class="image-clip" width="500" height="750" viewBox="0 0 500 750">`, path `d="M 0 0 L 500 0 C 500 599.6 500 677.1 500 750 L 0 750 C 0 205 0 105 0 0 Z"`, `data-path-to="M 0 0 L 500 0 C 331 608 485 551 500 750 L 0 750 C 120 281 7 296 0 0 Z"`, and `<image clip-path="url(#shape1)" … width="500" height="750">` — the photograph itself gets the organic morph edge on scroll.

**Exact parameters (article-stated):** Lenis lerp 0.1 · ST start "top bottom" / end "bottom top" · scrub true · ease 'none' · separator viewBox 0 0 100 10, height 150px, z-index 1000 · clip example 500×750 with the two `d` strings above.

**Rebuild notes:** The cheapest entry in this batch: GSAP core (AttrPlugin is in core) + optional Lenis; ~zero phone cost, no pin, no WebGL — ideal for section separators and image reveals on content sites. Elementor: an SVG in an HTML widget with `data-path-to` + a 15-line script. Failure mode to warn about: mismatched point counts between `d` and `data-path-to` produce garbage morphs — always derive, never redraw. Reduced-motion: none in the article — add a matchMedia gate that simply sets the final path.

**Library-ready parameter sets:** (a) scroll-morph separator recipe (viewBox 0 0 100 10, 150px, bg-fill, top-bottom→bottom-top scrub); (b) clipPath image-morph variant with the worked 500×750 path pair; (c) Lenis 2022 wiring (lerp 0.1, manual rAF) as the historical baseline vs modern ticker wiring.

---

## Q54 · Building Responsive, Scroll-Triggered Curved Path Animations with GSAP (Codrops / betawaxx) — https://tympanus.net/codrops/2025/12/17/building-responsive-scroll-triggered-curved-path-animations-with-gsap/

**Live URLs:** article above; working configurator pen https://codepen.io/betawaxx/pen/JoGZQLZ (linked from the article; full JS captured verbatim — the pen is the production code plus the dev overlay, and it matches the article's printed code with the additions noted). Origin: a hero built for Lando Norris's site.

**Stack (Measured/article-stated):** Vanilla JS + GSAP + ScrollTrigger + MotionPathPlugin; one generated SVG path (string-built, not a DOM path element); optional debug SVG overlay. No smooth-scroll library, no pinning.

**Mechanism (step-by-step, rebuildable):**
1. **Markup is the spec:** `<div class="hero-section" data-section="hero">` containing three anchor divs `.position[data-pos="1|2|3"]` (real layout boxes where the travelling element must land, each with its own size) and one traveller `<div class="animated-image" data-image="animated">`. In the pen init, the traveller is re-parented into the section, set `position:absolute; z-index:10`, and `gsap.set(img, {transformOrigin:'50% 50%', xPercent:-50, yPercent:-50})` so its center rides the path.
2. **Measure anchors:** `getPositions()` returns, per anchor, its center relative to the section (`r.left - rectSection.left + r.width/2`, same for y) plus width/height.
3. **Auto-generate control points** (the heart of the piece — four multipliers + two caps):
   - CP1 = `(p1.x,  p1.y + (p2.y − p1.y) * 0.8)`
   - CP2 = `(p2.x,  p2.y − Math.min(800, (p2.y − p1.y) * 0.3))`
   - CP3 = `(p2.x,  p2.y + Math.min(80, (p3.y − p2.y) * 0.3))`
   - CP4 = `(p1.x + (p3.x − p1.x) * 0.6,  p3.y − (p3.y − p2.y) * 0.2)`
   CP1 leaves P1 heading 80% of the way down toward P2 (vertical S entry); CP2 approaches P2 from above, capped at 800px of pull; CP3 leaves P2 with a small capped dip (80px); CP4 approaches P3 from above-left.
4. **Build the path string:** `` `M${p1} C${cp1} ${cp2} ${p2} C${cp3} ${cp4} ${p3}` `` — two cubic segments forming an S.
5. **Animate:** `gsap.set(img, {x:p1.x, y:p1.y, width:p1.width, height:p1.height})`; timeline with `scrollTrigger: {trigger: section, start:'top top', end:'bottom bottom', scrub:true, invalidateOnRefresh:true}`; single tween `tl.to(img, {duration:1.5, motionPath:{path: pathString, autoRotate:false}, ease:'none', onUpdate: …})` (duration is timeline-relative under scrub).
6. **Size interpolation in onUpdate:** split progress at 0.5 (the P2 waypoint): first half lerps width/height P1→P2 with `normalizedProgress = progress*2`; second half P2→P3 with `(progress−0.5)*2`; writes `img.style.width/height` directly.
7. **Resize:** debounced 200ms → re-measure positions, rebuild path + animation (control points persist; they're in section coordinate space so the curve rescales proportionally).
8. **Configurator (dev-only layer, fully specified in the pen):** an SVG overlay (z-index 15, pointer-events none) holding: the path (stroke `#ff0040`, width 3, opacity 0.8); anchor markers (circle r8, fill `#ff0040`, white stroke 2, labels "P1..P3" 12px bold offset +12/−12); control points (r8, fill `#00ff88`, class `svg-control-point`, pointerEvents 'all', labels "CP1..CP4"); handle lines (stroke `#00ff88`, dasharray '4,4', opacity 0.5). Drag (mouse + touch): pointer position minus section rect → replace CP → `updateVisualization()` + rebuild; the pen's drag **preserves scroll progress** (kill timeline, rebuild, then `tl.scrollTrigger.scroll(start + (end−start)*progress)`). A values panel prints rounded CP coordinates; `copyValues()` writes `const controlPointN = { x: …, y: … };` blocks to the clipboard. Article's production example of exported values: `[{150,450},{800,800},{850,1200},{650,1400}]` (article-stated sample) — production hard-codes CPs and deletes the overlay. GSAP's own MotionPathHelper is named as the off-the-shelf alternative.
9. **Reduced motion (article-stated best practice, admittedly NOT shipped on the live Norris site):** `gsap.matchMedia()` — `"(prefers-reduced-motion: reduce)"` → `gsap.set(img, {x:p3.x, y:p3.y, width:p3.width, height:p3.height})` (jump to final state, no animation); `"(prefers-reduced-motion: no-preference)"` → `buildAnimation()`.

**Exact parameters (Measured from pen + article):** multipliers 0.8 / 0.3 / 0.6 / 0.2 · caps min(800, …) on CP2, min(80, …) on CP3 · ST start 'top top', end 'bottom bottom', scrub true, invalidateOnRefresh true · tween duration 1.5, ease 'none', autoRotate false · size split at progress 0.5 · resize debounce 200ms · overlay colors/geometry as above.

**Rebuild notes:** Pure GSAP + vanilla JS, no build step — the most portable deep read in this batch. Elementor: anchors = three absolutely-positioned widgets/empty sections whose boxes you measure at runtime; traveller = one image widget. Phone: excellent — no pin (travel happens over the section's natural scroll), one tween, path adapts because it's computed from measured boxes at any viewport. Production discipline: ship hard-coded CPs + the reduced-motion block the original site skipped.

**Library-ready parameter sets:** (a) the default-CP formula (0.8/0.3/0.6/0.2 + 800/80 caps) — a named recipe: "S-curve between three measured anchors"; (b) progress-split size lerp (0.5 waypoint, ×2 normalization); (c) configurator spec (colors, r8 markers, dash 4,4, progress-preserving rebuild, copyValues export format); (d) reduced-motion jump-to-final via gsap.matchMedia.

---

## Q55 · Creating 3D Scroll-Driven Text Animations with CSS and GSAP (Codrops — Cylinder) — https://tympanus.net/codrops/2025/11/04/creating-3d-scroll-driven-text-animations-with-css-and-gsap/

**Live URLs:** article above · live demo https://tympanus.net/Tutorials/3DTextScroll/ (resolved via the author's GitHub repo README; demo renders the cylinder with name-list items — same code, different copy) · source repo https://github.com/davidfaure/3d-text-animation-codrops/ (Vite + TypeScript, MIT, three pages: index.html = Cylinder, index2.html = Double Circle, index3.html = Tube; built output in dist/). The queue entry is the **Cylinder** effect; the article's other two effects are captured below as bonus variants because they share the parameter family. fetch_and_mine on the demo (`code-source/55-3d-text-scroll/`) returned the Codrops Tutorials shell (index 4.0K, 4 assets/16K — GSAP loads from CDN there), so all parameters below are article-stated verbatim and cross-checked against the repo structure.

**Stack (article-stated):** TypeScript classes (`App`, `Cylinder`, `Circle`, `Tube`), GSAP + ScrollTrigger + **ScrollSmoother** (App-wide: `ScrollSmoother.create({ smooth: 1, effects: true })`), **pure CSS 3D — no Three.js/WebGL**. Resize handler recalculates positions (`calculatePositions()` on resize; no debounce shown).

**Mechanism — Cylinder (step-by-step, rebuildable):**
1. Markup: `<section class="cylinder__wrapper">` (100svh) containing `<p class="cylinder__title">` (the ScrollTrigger trigger) and `<ul class="cylinder__text__wrapper">` with 12 `<li class="cylinder__text__item">` words.
2. CSS 3D stage: wrapper `perspective: 70vw; overflow: hidden`; at ≤768px perspective becomes **400px**. Text wrapper: `transform-style: preserve-3d; transform-origin: center center; font-size: 5vw; line-height: 5vw; font-weight: 600` (≥2560px: 132px fixed; ≤768px: 1.6rem). Items: `position:absolute; top:50%; width:100%; backface-visibility: hidden` — the backface rule is load-bearing: without it, items rotating past 90° show mirrored text.
3. Distribute items on the cylinder's front half: `offset = 0.4; radius = Math.min(window.innerWidth, window.innerHeight) * offset; spacing = 180 / items.length` (180°, not 360 — items live on the visible half). Per item i: `angle = i * spacing` (rad), `x = 0`, `y = Math.sin(angle) * radius`, `z = Math.cos(angle) * radius`, `rotationAngle = −i * spacing`; applied as `transform: translate3d(-50%,-50%,0) translate3d(x,y,z) rotateX(rotationAngle)`.
4. Scroll drive: `ScrollTrigger.create({ trigger: title, start: "center center", end: "+=2000svh", pin: wrapper, scrub: 2, animation: gsap.fromTo(textWrapper, {rotateX: -80}, {rotateX: 270, ease: "none"}) })` — a 350° sweep over 20 viewport-heights of pinned scroll, with scrub 2 (two-second catch-up lag) smoothing it.

**Bonus variant — Double Circle (article-stated):** two 24-item lists; wrappers at `left:30%` (translate −100%,−50%) and `left:70%` (text-align right); `radius = wrapper.offsetWidth / 2`; `spacing = Math.PI / items`; `angle = i*spacing − scrollY * direction * 2π` with direction **+1 left / −1 right** (mirrored); `rotation = angle° + (direction === −1 ? 180 : 0)` — the +180° flip keeps the counter-rotating side's text upright. Driven **without pin**: `ScrollTrigger.create({trigger: ".circle__wrapper", start:"top bottom", end:"bottom top", scrub: 1, onUpdate: self => scrollY = self.progress * 0.5})` — a half-rotation across the section's viewport transit.
**Bonus variant — Tube (article-stated):** single list on a horizontal cylinder: `spacing = 360 / items`, `x = Math.sin(angle)*radius`, `y = 0`, `z = Math.cos(angle)*radius`, `rotateY(i * spacing)`; ScrollTrigger identical to Cylinder (start "center center", end "+=2000svh", pin, scrub 2) but `fromTo rotateY 0 → 360, ease "none"`; wrapper keeps `perspective: 70vw` (no mobile 400px override printed for Tube).

**Exact parameters (article-stated):** ScrollSmoother smooth 1, effects true · perspective 70vw (≤768px: 400px) · radius factor 0.4 × min(vw,vh) · Cylinder spacing 180/N, rotateX −80→270 · pin + end "+="2000svh"" · scrub 2 · ease "none" · font 5vw (132px ≥2560, 1.6rem ≤768) · Circle: scrub 1, progress×0.5, ±180° flip · Tube: spacing 360/N, rotateY 0→360.

**Rebuild notes:** The most Elementor-portable 3D effect in the bank: one HTML widget (list + wrapper), ~60 lines of JS, zero WebGL, zero assets. The phone warning is the scroll budget: pin + `+=2000svh` is a 20-screen scroll-jack — on mobile cut end to ~600–800svh and keep scrub 2. Reduced-motion: none in article or repo — add a gate that leaves items statically stacked at rotateX 0. ScrollSmoother requires the `#smooth-wrapper/#smooth-content` scaffold and (in the article's era) a Club plugin; with GSAP 3.13+ it's free — or drop the smoother entirely, the cylinder works on native scroll.

**Library-ready parameter sets:** (a) CSS-cylinder recipe {perspective 70vw/400px, radius 0.4×min(vw,vh), spacing 180/N, rotateX −80→270, scrub 2, end +=2000svh}; (b) dual-circle mirrored-orbit recipe {spacing π/N, direction ±1, +180° readability flip, progress×0.5, scrub 1, unpinned}; (c) tube recipe {spacing 360/N, rotateY 0→360}; (d) backface-visibility:hidden as a mandatory cylinder ingredient.

---

## Q56 · Podium — https://podium.global

**Live URL:** https://podium.global (sports creative/video studio). Source pass: `code-source/56-podium/` — 17 same-host assets, 2.2 MB total (JS 2.1 MB, CSS 44 KB, HTML 276 KB), 0 cross-host skipped; all values below Measured from those bundles unless labelled.

**Stack (Measured):** React/Next app with **GSAP 3.14.2** (version string ×5), ScrollTrigger (42 `scrollTrigger` configs across chunks), **Lenis via react-lenis** — Measured config: `ReactLenis { options: { autoRaf: true, lerp: 0.08, wheelMultiplier: 0.8, touchMultiplier: 1.15, overscroll: false } }` — plus a **Three.js WebGL layer**: 50 vertexShader + 50 fragmentShader pairs, 157 uniform declarations. SplitText ×1, quickTo ×1. Fonts: Futura, Univers Condensed. CSS easing family: `cubic-bezier(.83,0,.17,1)` ×2, `(.33,1,.68,1)` ×2, `(.16,1,.3,1)`, `(.4,0,.2,1)` — expo-out curves; keyframes: `noise`, `reveal`, `project-hero-fixed`, `project-footer-reveal`, `wwFlipBrightness/Reverse/Rotate/Skew`. **prefers-reduced-motion rules in CSS: 0** (flag).

**Mechanism / motion system:**
1. **Scroll:** Lenis (lerp 0.08 — noticeably heavier smoothing than the 0.1 default; wheel damped to 0.8×, touch boosted 1.15×, no overscroll) on autoRaf.
2. **Reveal grammar (Measured distributions across the bundles):** the house entrance is start `"top 60%"` → end `"top 40%"` (×4 each — a short 20%-of-viewport scrub/play window low in the viewport), with `"top bottom"` (×3) and `"top bottom-=20%"` (×2) variants; eases dominated by `power2.out` (×14) and `power2.inOut` (×11), then `linear` (×8, the scrubbed ones), `power3.out` (×3); durations cluster at **0.3s (×11)** with a micro-band of 0.32–0.62s (per-line/per-word stagger offsets) and occasional 0.9s; staggers: `{amount: .08}` and `.15`. Almost everything is play-on-enter, not scrub — only 1 numeric `scrub: 1` and a few boolean scrubs. In practice: headings/lines rise with power2.out over ~0.3–0.6s as they cross 60%→40% of the viewport.
3. **WebGL media layer (uniform inventory Measured
...[truncated 8639 chars]
# DEEP READS — SLICE 2, BATCH 2 (Q74–Q92 subset: 74, 75, 78, 79, 88, 89, 90, 91, 92)
Source-level reverse analyses, mined 2026-10-26. Labels: **Measured** = read from fetched source · **article-stated** = stated in the Codrops article text · **L2-recorded** = Lane 1's Level 2 inspection log · **Inferred** = my inference, flagged as such.
Cross-batch integrity note: `fetch_and_mine.sh` cats bundles into shared `/tmp` files and resolves `./`/relative asset refs against the origin root. Both failure modes hit this batch and were caught and corrected by hand (see the Source-integrity line inside Q75, Q78, Q88, Q89, Q90, Q91, Q92). Where a Codrops demo URL is dead, the mechanism was mined from the article-linked official GitHub repo (same author/org) and this is stated per entry.

## Q57 · OPX Studio — https://opx.studio

**Live URL:** https://opx.studio (extract: `code-source/57-opx-studio/` — index.html 154 KB, 6 JS assets; theme CSS re-fetched same-host in the recovery pass)

**Stack (Measured):**
- WordPress 7.1.3 (generator meta) + **Semplice 4 theme, v4.4.11** (`wp-content/themes/semplice4/`). Semplice is a portfolio-builder theme; the whole site is one Semplice "dynamic frontend".
- `frontend.min.js` (342 KB) is a single bundle containing: GSAP in its TweenMax/TweenLite/TimelineMax form (44× TweenLite, 4× TweenMax, 4× TimelineMax identifiers; capital-name eases — GSAP 2-style API surface), **ScrollMagic** (31× ScrollMagic, 18× Controller, 52× Scene), **Flickity** (the "Draggable" hits in the raw mine are Flickity's cell/drag code, not GSAP Draggable), and **NProgress** (8×) for the SPA page-load bar.
- Supporting WP stack: jQuery 3.7.1 + jquery-migrate 3.4.1, MediaElement 4.2.17, Google Site Kit events (8 KB). No WebGL, no canvas, no ScrollTrigger, no Lenis (all 0 in the JS mine — and this JS mine is trustworthy: it was computed from this slug's own downloaded bundles).
- ⚠️ The first-pass `values-raw.txt` CSS section is **void** (shared-/tmp contamination: its fonts/keyframes — Abel, Cormorant Garamond, ETmodules, tdGallery — belong to a foreign Divi/tagDiv site; combined CSS was 0 in that pass). All CSS values below come from the recovery re-fetch of the theme's own `frontend.min.css` (181 KB) + the homepage's inline `<style>` blocks (10 blocks, 58.7 KB). An integrity note has been appended to the slug's values-raw.txt.
- Site config object (`semplice = {...}`, Measured from index.html): `frontend_mode: "dynamic"`, `static_transitions: "disabled"`, `sr_status: "disabled"` (scroll-reveal OFF site-wide), `blog_sr_status: "enabled"`, frontpage_id 1933, a 51-project `portfolio_order` array.
- Type (Measured, inline CSS): custom "OPX-Medium" + "Unica-Light" faces, IBM Plex Sans / IBM Plex Mono (Google Fonts stylesheet also linked).

**Mechanism, step-by-step (rebuildable):**
1. **SPA-style page transitions (the site's main motion system).** Semplice runs in "dynamic" mode: internal links are intercepted, the next page is fetched from the Semplice REST endpoint (`/wp-json/semplice/v1/frontend`), and only the content region is swapped — no full reload. NProgress drives the top progress bar during the swap (spinner keyframe `nprogress-spinner .4s linear infinite`; a second loader, `donut-rotate`, runs `1s cubic-bezier(.4,0,.22,1) infinite`). `static_transitions: "disabled"` confirms the animated/dynamic transition path is the active one.
2. **Full-screen cover with a slow Ken Burns zoom.** The homepage opens on a `semplice-cover` (page contains 3 `<video>` and 10 `<img>` total, L2-recorded as "two-link nav + one-line promise + stacked full-screen cases"). Cover media run the theme keyframe `coverZoom`: `0%,100% { transform: scale(1) } 50% { transform: scale(1.24) }`, declared as `animation: coverZoom linear 50s` — a 50-second, linear, ±24% breathing zoom. The slider preloader uses the same shape at smaller amplitude: `sliderPreloader` scale 1 → 1.11 → 1.
3. **Scroll animation engine present but switched off for pages.** ScrollMagic + GSAP are bundled and Semplice's scroll-reveal system exists, but the site config sets `sr_status: "disabled"` (only the blog enables it). So the homepage deliberately does NOT do scroll-triggered reveals; motion budget is spent on the cover, transitions, sliders (Flickity, `speed: 350` measured in the bundle) and hovers instead. Parallax hooks exist in the bundle (28× "parallax") as theme capability, unused-or-light on this page (Inferred).
4. **Hover/micro transitions (site custom CSS, inline).** Portfolio/nav hover states are hand-tuned in the generated inline CSS: `opacity .3s ease` and `.6s ease`, `transform .6s ease` / `.3s ease`, and one signature expo curve — `left/right .6s cubic-bezier(0.19, 1, 0.22, 1)` (the CSS equivalent of easeOutExpo) on a sliding element. A trivial `reveal` keyframe (opacity 0→1) is the only inline keyframe.
5. **Theme-level transition system (Measured, frontend.min.css).** Dominant values: `transition: all .2s linear` (×57), `all .3s ease` (×28), opacity `.3s ease` (×8); minor variants `.1s/.15s/.35s/.55s`. Only one cubic-bezier in the whole theme CSS: `cubic-bezier(.4,0,.22,1)` (the donut loader). `will-change` ×5. **prefers-reduced-motion: 0 occurrences** in theme CSS and 0 in inline CSS — no reduced-motion support anywhere (Measured absence).

**Exact parameters (all Measured unless noted):**
- coverZoom: scale 1 → 1.24 → 1, `50s linear` · sliderPreloader: scale 1 → 1.11 → 1
- NProgress spinner: `.4s linear infinite` · donut-rotate: `1s cubic-bezier(.4,0,.22,1) infinite`
- GSAP eases in bundle: `Expo.easeOut` (×5 across string/property forms), `Expo.easeInOut` (×6), `Expo.easeIn` (×1), `Expo.easeOutIn` (×1), `Linear` (×4)
- Hover curve: `cubic-bezier(0.19, 1, 0.22, 1)`, durations .3s/.6s paired opacity+transform
- Flickity slider speed: `350`
- Config: dynamic frontend, static transitions disabled, scroll-reveal disabled (pages) / enabled (blog)

**Rebuild notes:**
- Single-HTML + GSAP equivalent: the transferable pattern is *restraint + one hero move*: (1) full-viewport cover image/video with a 50 s linear scale 1→1.24→1 CSS keyframe loop (pure CSS, zero JS cost — directly reusable on a trade homepage hero); (2) instant-feeling navigation — in single-HTML terms, prefetch + a .4 s progress bar (NProgress is MIT and drops into any page); (3) hover states on the expo bezier `cubic-bezier(0.19,1,0.22,1)` at .3/.6 s.
- WP+Elementor survival: HIGH for the pattern — Semplice itself is a WP theme, so the architecture is WordPress-native; in Elementor you would replicate with a cover section + CSS keyframes + a page-transition plugin. The exact Semplice SPA swap does not survive an Elementor rebuild, but nothing visual depends on it except the progress bar.
- Phone cost: ~600 KB JS total (incl. jQuery/MediaElement/Site Kit) + 154 KB HTML + 181 KB theme CSS — heavy plumbing for a quiet page, but zero WebGL/canvas and no scroll-jacking, so it stays smooth on a phone (L2-recorded mobile verdict was positive). The lesson cuts both ways: the *motion* is nearly free; the *stack* is not.

**Library-ready parameter set (Q57):** `coverZoom 50s linear, scale 1→1.24→1` (hero Ken Burns) · `cubic-bezier(0.19,1,0.22,1)` + opacity/transform .3s/.6s (hover system) · NProgress `.4s` spinner + dynamic SPA swap (transition pattern) · config pattern "scroll-reveal OFF, spend motion on cover + transitions" (restraint case study).

---

## Q58 · Shopify Editions Winter '26 — https://www.shopify.com/editions/winter2026

**Live URL:** https://www.shopify.com/editions/winter2026 (extract: `code-source/58-shopify-editions-winter26/` — index.html 1.45 MB SSR, 14 first-party bundles via the ALLOW_CDN=1 re-mine, 984 KB total)

**Stack (Measured):**
- React (Remix-style route bundles: `entry.client`, route module `(_locale).editions.winter2026-*.js` 243 KB, `components-*.js` 252 KB) on Shopify's Oxygen/Hydrogen-family platform; Tailwind CSS (single 130 KB stylesheet carries the entire motion system).
- **GSAP: 0 references — confirmed absent** (JS mine of the re-mined bundles, consistent with batch 1's verified finding). Motion is: **Lenis** smooth scroll + **IntersectionObserver** reveals + a **CSS keyframe/variable system** + **Rive** vector animations (rive runtime bundle 176 KB, `new Rive` instantiations and `.riv` asset references in the route bundle; 3 `<canvas>` in the HTML) + the **View Transitions API** (`::view-transition-group/old/new` rules present).
- Values provenance: the on-disk values-raw.txt (10:29) IS the ALLOW_CDN re-mine and is internally consistent with the downloaded bundles (gsap 0 · lenis 26 · IntersectionObserver 18 · @keyframes 14) — used and hand-verified below; integrity confirmation appended to the file.
- Fonts (Measured, fonts-latin css): NeueMontreal (700), HWCigars (display serif w/ small-caps features), ImperialScript, Inter-Variable — all `font-display: swap`.

**Mechanism, step-by-step (rebuildable):**
1. **Smooth scroll:** one Lenis instance wraps the page, configured verbatim (Measured from the route bundle): `new Lenis({ duration: 1, easing: m => Math.min(1, 1.001 - Math.pow(2, -10 * m)), orientation: "vertical", smoothWheel: true, wheelMultiplier: 1 })` — i.e. Lenis's classic easeOutExpo curve at a 1-second duration. (Other Lenis option mentions in the bundle — lerp ×13, touchMultiplier ×6 — belong to the library's own defaults code, not a second config.)
2. **Scroll reveals via IntersectionObserver, no animation library.** Observers are created with a small vocabulary of configs (Measured): `threshold: 0` (×6), `threshold: .1`, `threshold: .5` (components bundle), `rootMargin: "5%"`, `"50px"`, `"200px"`, `"30% 30% 30% 30%"`, `"100% 100% 100% 100%"` (pre-load a full viewport early). When an element intersects, a state/class flips and the CSS variable-driven animations below run — e.g. `stagger-fade-in` consumes `--scroll-state-duration` / `--scroll-state-easing`, so stagger timing is a *theme variable*, not per-component JS.
3. **The CSS motion system (all Measured from tailwind stylesheet + its variable definitions):**
   - `--scroll-state-duration: .6s`, `--scroll-state-easing: cubic-bezier(.41,.19,.13,.95)` → drives `stagger-fade-in` (opacity 0→1).
   - `--fade-out-duration: .52s`, `--fade-out-easing: cubic-bezier(.25,.46,.45,.94)` → `fade-in`; chained into `--slide-delay: calc(var(--fade-initial-delay) + var(--fade-out-duration))` with `--slide-duration: .6s`, `--slide-easing: cubic-bezier(.72,.16,.19,.96)` (the `slide` keyframe starts at translateX(-898px) — a fixed-width marquee/panel slide).
   - `--lines-duration: 3s`, `--lines-easing: cubic-bezier(.34,.22,.47,.84)` (the "davinci-lines" SVG stroke-draw system: loader dashoffset held at 1px until `data-initiated`/`data-sidebar-ready` states flip, then transitions stroke-dashoffset + stroke over 3 s); loading variant `--lines-loading-duration: 6s`, `--lines-loading-easing: cubic-bezier(.45,.28,.34,.84)` with `load-lines` keyframe (dashoffset → .2px).
   - **Spring/overshoot signature:** `cubic-bezier(.34,1.56,.64,1)` (×5 in the CSS) used at `transition-duration: .3s` and on `.cloud-card { transition: transform .4s cubic-bezier(.34,1.56,.64,1), opacity .3s ease-out }`.
   - `timeline-start` keyframe (chapter timeline entrance): from `opacity 0; translate 0 75cqw; rotate: x -90deg; scale 1.5` → identity, run at `.75s ease-in-out forwards` (uses container-query units, 75cqw).
   - `nav-item-in`: from `opacity 0, translateY(-100%)`, `1s cubic-bezier(.13,.46,.15,.92) forwards`, gated behind `motion-safe` + large breakpoint.
   - `media-entrance`: opacity 0→1 at `.3s forwards`. `line-fade`: SVG stroke #ffffffbf → #ffffff26 over `4s ease-out forwards`. `opacityPulse`: `2s ease-in-out infinite` (1 → .5 → 1).
   - `orbit-path` (orbital dots on an offset-path ring): offset-distance 0→100% with z-index stepping — front until 58%, behind 58–92%, front after 92% (keyframe percentages 57.99/58 and 91.99/92 are the swap points).
   - `emoji-rise`: floating emoji — `translate(-50%) translateY(0→-200px) scale(var(--random-scale,1))`, opacity held 1 until 70% then → 0, duration/delay randomised per element via `--random-duration` (default 5s) / `--random-delay` (default 0s), `ease-out`.
   - Search loader pair: `search-loading-rotate 3s linear infinite` (360°) + `search-loading-stroke 1.5s infinite` (dashoffset 135 → 84 @50% → 45 @97%).
   - `show-close-button`: `.3s ease-in-out .15s forwards` (opacity → 1); modal entrances use `@starting-style` (from `opacity 0; translate 0 40px`).
   - `pushOutPopIn` is referenced at `2s cubic-bezier(.6,-.28,.74,.05) .25s infinite forwards` (timing Measured); its keyframe body is not in the extracted stylesheet — likely a route-level stylesheet outside the asset pass (labelled gap, not guessed).
4. **Reduced motion is engineered, not bolted on (Measured):** 9 `prefers-reduced-motion` blocks — `no-preference` gates the davinci-lines transitions, nav-item-in (via `motion-safe:` variants) and tooltips; `reduce` kills the orbital animation and forces dot tooltips visible, removes view-transition animations entirely (`::view-transition-* { animation: none !important }`), and flattens modal transitions. This is the most complete reduced-motion implementation in the slice.
5. **Rive** supplies the interactive/animated illustration moments on canvas (runtime + .riv files), keeping them resolution-independent and small next to video.

**Exact parameters (richest set, all Measured):** Lenis `duration:1` + `easing: t => min(1, 1.001 − 2^(−10t))` · spring bezier `cubic-bezier(.34,1.56,.64,1)` @ .3s/.4s · scroll-state .6s / `cubic-bezier(.41,.19,.13,.95)` · fade .52s / `cubic-bezier(.25,.46,.45,.94)` · slide .6s / `cubic-bezier(.72,.16,.19,.96)` · lines 3s / `cubic-bezier(.34,.22,.47,.84)`, loading 6s / `cubic-bezier(.45,.28,.34,.84)` · timeline-start .75s ease-in-out from 75cqw + rotateX −90° + scale 1.5 · IO vocabulary {threshold 0/.1/.5; rootMargin 5%/50px/200px/30%/100%} · orbit z-swap at 58%/92%.

**Rebuild notes:**
- Single-HTML + GSAP: this page is the proof that the bank's standard stack can be *replaced* — but also the best spec for doing the same job inside it: copy the variable-driven timing system (one `:root` block of durations/easings consumed by every reveal), the IO threshold vocabulary, and the Lenis config verbatim (Lenis is a single small file; if GSAP is already loaded, ScrollSmoother is the alternative, but this page shows plain Lenis + CSS beating a GSAP build on a marketing page).
- WP+Elementor survival: the *system* survives (CSS variables + keyframes + IO reveals are exactly how an Elementor Customizer/CSS build should be organised); the Rive moments survive via the Rive WordPress embed/canvas; View Transitions and container-unit (cqw) tricks are progressive enhancements that degrade safely.
- Phone cost: heavy — 1.45 MB HTML + ~950 KB JS/CSS — but motion itself is compositor-friendly (opacity/transform/stroke only), no scroll-jacking beyond Lenis smoothing, and reduced-motion users get a genuinely calmer page. On a phone the Lenis 1 s expo glide + .6 s reveals feel premium, not slow (Inferred from parameter values).

**Library-ready parameter set (Q58):** Lenis expo config (verbatim above) · the six-variable timing token block (scroll-state/fade/slide/lines values above) · `cubic-bezier(.34,1.56,.64,1)` spring for card hovers · IO threshold/rootMargin vocabulary · orbit-path z-index stepping at 58%/92% · reduced-motion gating pattern (`no-preference` wraps the fancy transitions; `reduce` flattens modals + kills view transitions).

---

## Q72 · MotionPath Demo (GreenSock pen XWoBypQ) — https://codepen.io/GreenSock/pen/XWoBypQ

**Live URL:** https://codepen.io/GreenSock/pen/XWoBypQ (full-page view used for the source pass; pen source extracted to `code-source/72-motionpath-demo/pen-source.html/.js/.css`). Cross-check: Lane 1's L2-recorded values for this pen match the extracted source exactly (L2-recorded ↔ Measured agreement).

**Stack (Measured):** a single CodePen pen — HTML fragment + one CSS file + one JS file. JS registers `MotionPathPlugin` and uses only core `gsap.to`; the GSAP core + plugin scripts are CodePen externals (10 cross-host assets in the full-page shell were skipped per card discipline — the pen's own three source files are the complete mechanism). No build step, no framework.

**Mechanism, step-by-step (rebuildable — the entire pen is the pattern):**
1. Markup: an SVG (`width 80%`, `viewBox="-20 0 557 190"`) holding one invisible-guide path `#path` (`fill: none`, `vector-effect: non-scaling-stroke`, stroke-width 2 in CSS), and one absolutely-positioned follower `<div class="follower flair flair--22">` (GSAP's standard "flair" mascot div) inside a `.container`.
2. The path data (Measured, verbatim): `M9,100 C…` a five-crest wave running from (9,100) up over peaks at y≈10 and down to (511,64)-ish — a long horizontal sine-like route across the 557-unit viewBox.
3. Core function `updateFollower()` — **the resize-resilience pattern is the point of the demo**:
   a. Read the current tween's `progress()` (0 on first run) and `revert()` the tween, because MotionPath's align maths are computed from the path's rendered position, which changes when the layout changes.
   b. Rebuild: `gsap.to(".follower", { duration: 5, repeat: 12, repeatDelay: 1, yoyo: true, ease: "power1.inOut", motionPath: { path: "#path", align: "#path", autoRotate: true, alignOrigin: [0.5, 0.5] } })`.
   c. Immediately call `.progress(savedProgress)` on the new tween so the follower resumes exactly where it was — no visible jump.
4. `window.addEventListener("resize", updateFollower)` — every resize rebuilds the aligned path tween seamlessly.
5. Layout keeps the geometry honest at any size: `.container` is `90vw × 90vh` but capped by `max-width: 90vh; max-height: 90vw` (stays near-square), flex-centered; the follower is sized in % (`width: 20%; height: 20%` of container) so it scales with the stage; `svg { overflow: visible }` lets the follower travel outside the SVG box without clipping; the caption `h4` hides below 350px width or height (`@media (max-width: 350px) or (max-height: 350px)`).

**Exact parameters (all Measured from pen-source.js/.css/.html):**
- Tween: `duration: 5`, `repeat: 12`, `repeatDelay: 1`, `yoyo: true`, `ease: "power1.inOut"` → 13 traversals × 5 s + 12 × 1 s pauses = 77 s of looped motion, direction reversing each pass.
- MotionPath: `align: "#path"` (target coordinates mapped onto the path's), `autoRotate: true` (follower rotates to path tangent), `alignOrigin: [0.5, 0.5]` (follower's centre rides the path).
- Path: viewBox `-20 0 557 190`, `vector-effect="non-scaling-stroke"`, CSS `stroke-width: 2`.
- Stage: container 90vw/90vh, caps 90vh/90vw; follower 20% × 20%; small-screen caption cutoff 350px.

**Rebuild notes:**
- Single-HTML + GSAP: this is the canonical minimal recipe for "object travels along an SVG route" — directly transferable to trade sites (a van/truck following a route line on a service-area map, a progress mascot along a "how it works" timeline, a drone along a roof outline). Needs only GSAP core + MotionPathPlugin (both in the free public GSAP). Copy `updateFollower()` wholesale — the save-progress → revert → rebuild → restore-progress sequence is the part everyone gets wrong, and it is what makes path-followers survive responsive resizes and orientation changes.
- WP+Elementor survival: TOTAL — one Custom HTML widget with the SVG + follower div + an inline script enqueueing GSAP/MotionPath from CDN; no theme hooks involved.
- Phone cost: negligible JS (one tween), no layout thrash beyond the resize rebuild; the %-sized follower and capped container are the mobile pattern to copy. No reduced-motion handling in the pen (Measured absence) — add a `prefers-reduced-motion` pause if shipping it.

**Library-ready parameter set (Q72):** resize-safe MotionPath recipe (`progress()` save → `revert()` → rebuild → `.progress(p)`) · `duration 5 / repeat 12 / repeatDelay 1 / yoyo / power1.inOut` loop spec · `alignOrigin [0.5,0.5]` + `autoRotate: true` follower config · square-capped stage (`90vw/90vh` + `max-width:90vh; max-height:90vw`) + %-sized follower · `vector-effect: non-scaling-stroke` for resolution-independent guide paths.

---

**Tally: 3/3 entries completed, 0 blocked** (Q57 CSS re-mined from a same-host re-fetch after voiding the contaminated first-pass CSS mine; Q58 verified against the ALLOW_CDN re-mine; Q72 mined from the pen's own extracted source, L2 values cross-checked exact).

## Q74 · SVG Animations with GreenSock (CodePen, akin-elmas) — BLOCKED (pen source unreachable)
- Live URL: UNRESOLVED — pen ID never obtained. Author profile confirmed live: https://codepen.io/akin-elmas (Akın Elmas, İstanbul; "Front-End Dev.").
- Routes tried (7, logged): (1) browser.search exact title + author → no pen result; (2) browser.open `codepen.io/akin-elmas/pens/public/` → profile renders, pen list is JS-driven, nothing extractable; (3) browser.search username variants ("akin-elmas codepen pen SVG sun animation") → unrelated pens only; (4) curl of profile HTML → 12,305 B JS shell, zero pen data; (5) Wayback CDX `codepen.io/akin-elmas/pen/*` and `/details/*` → zero captures returned; (6) Wayback availability API ×4 → HTTP 429 rate-limited; (7) DuckDuckGo HTML search → no pen links (14 KB stub response).
- What remains unmeasured: pen URL/ID, the pen's HTML/CSS/JS, full timeline construction, wave geometry.
- What is known (L2-recorded by Lane 1's inspection, NOT source-measured here): staged SVG scene; sun timeline built on `SlowMo.ease.config(0.3, 0.1, false)` with duration 5; wave-visibility gating (waves shown/hidden by timeline phase). Title caveat from L2: "start" is not part of the pen title ("SVG Animations with GreenSock"); the pen sits in a Design+Code course collection context.
- Rebuild notes: nothing rebuildable from this batch alone. If the pen resurfaces, the L2 pair (SlowMo sun arc, 5 s + phase-gated waves) is the parameter seed. Do not substitute another author's sun/waves pen — several were surfaced by search and were deliberately not used.

## Q75 · Making Stagger Reveal Animations for Text — https://tympanus.net/codrops/2020/06/17/making-stagger-reveal-animations-for-text/
- Source integrity: demo URL from the article (`tympanus.net/Development/StaggeringTextRevealAnimations/`) is **404 today** (301→404 verified). fetch_and_mine pass downloaded 0 assets; its values-raw.txt is discarded. Mechanism mined by hand from the article-linked repo **github.com/codrops/TypographyMotion** (src/ read in full; dist/ used for bundle size).
- Stack (Measured from repo): GSAP **^3.3.3**, Splitting.js **^1.0.6**, Parcel 1.12.4 build; Adobe Fonts via Typekit kit `lwc3axy` (Freight Big Pro + Tenon, article-stated); dist JS bundle **222,155 B**. First contact: article via browser.search/open; repo as second route.
- Mechanism step-by-step (rebuildable):
  1. Markup: two stacked `.content__item` sections (home/about); every text line is `<p class="content__paragraph" data-splitting>`; the paragraph has `overflow: hidden` (this is the reveal mask — chars translate inside it).
  2. `Splitting()` rewrites each paragraph into `.word > .char` spans (whitespace kept as `.whitespace` spans and included in the char NodeList).
  3. Fonts preload (`preloadFonts('lwc3axy')`) before removing the `loading` class — prevents FOUT re-split.
  4. One paused master timeline does the whole page transition; About/Close click → `timeline.play()`, logo/Close → `timeline.reverse()` (same timeline, symmetric).
  5. Timeline choreography (labels are load-bearing): `staggerTo(homeChars, 0.5, {ease:'Power3.easeIn', y:'-100%', opacity:0}, 0.014, 'start')` → at label `switchtime`: zero-duration callback toggles `.content__item--current` on both sections → body `backgroundColor` tweens to `#c3b996` over **0.8 s, Power1.easeInOut**, positioned at `switchtime -= charsDuration/4` (starts 0.125 s before the switch) → `set(aboutChars, {y:'100%'})` and `set(picture, {y:'40%', rotation:-4, opacity:0})` at `switchtime` → `staggerTo(aboutChars, 0.5, {ease:'Power3.easeOut', y:'0%'}, 0.014, 'switchtime')` → picture `to(0.8, {ease:'Power3.easeOut', y:'0%', opacity:1, rotation:0})` at `switchtime += 0.6`.
  6. Custom cursor: dot follows mouse with per-axis lerp `amt: 0.18` in an rAF loop; first mousemove fades it in via `gsap.to(..., {duration:0.9, ease:'Power3.easeOut', opacity:1})`.
- Exact parameters (Measured): `staggerValue: 0.014`, `charsDuration: 0.5`; eases Power3.easeIn (out-going) / Power3.easeOut (in-coming) / Power1.easeInOut (bg); type sizes `.content__paragraph { font-size: 7vw; line-height: 1 }`, `--large: 10vw`; cursor lerp 0.18.
- Reduced motion: **absent** (Measured — no `prefers-reduced-motion` anywhere in src/dist CSS).
- Rebuild notes: single-HTML + GSAP port is direct; replace Splitting with GSAP SplitText (same `.char` model) or a 10-line hand splitter; note the source uses GSAP-2-style `staggerTo`/position-string syntax on a GSAP 3.3 core — modernise to `gsap.to(targets, {…, stagger:0.014})`. In Elementor: one full-screen section pair + a click trigger; keep paragraphs `overflow:hidden` or the mask breaks. Phone cost: the 222 KB Parcel bundle is build overhead, not mechanism cost — the mechanism itself is transform/opacity on spans (GPU-cheap); **disable the custom cursor on touch** (L2 warning stands: it never hides on touch devices). Library-ready set: `STAGGER-REVEAL-SWAP = { charDur:0.5, stagger:0.014, outEase:Power3.in, inEase:Power3.out, bgDur:0.8, bgEase:Power1.inOut, bgLead:-0.125, picDur:0.8, picDelay:0.6, picFrom:{y:40%,rot:-4,o:0}, cursorLerp:0.18 }`.

## Q78 · Inspiration for Text Styles and Hover Effects — https://tympanus.net/codrops/2015/05/13/inspiration-for-text-styles-and-hover-effects/
- Source integrity: demo URL from the article (`tympanus.net/Development/TextHoverEffects/`) is **404 today**. fetch_and_mine values discarded (0 assets). Mechanism mined by hand from the article-linked repo **github.com/codrops/TextStylesHoverEffects** (`css/linkstyles.css` read in full).
- Stack (Measured): **pure CSS, zero JavaScript** for all effects (repo ships no effect JS); demo page = 15 links, 3 inline SVGs, 1 `<canvas>` in markup, 7 `data-letters` hooks.
- Mechanism step-by-step: 11 named link effects — **Asiri, Ilin, Kukuri, Kumya, Mallki, Manko, Nukun, Surinami, Takiri, Urpi, Yaku** — each a self-contained class (`.link--<name>`) built from ::before/::after layers + transforms; no shared JS state. The family recipe: (1) base link carries the resting style; (2) a pseudo-element carries the "active" layer (a bar, a duplicated text copy via `content: attr(data-letters)`, an SVG outline, or a translated duplicate); (3) `:hover` flips transform/width/color with one of two house timing curves; (4) several effects sequence two stages with a 0.3 s delay on the second stage.
- Exact parameters (Measured from linkstyles.css): two master curves — **`cubic-bezier(0.7,0,0.3,1)` ×8** and **`cubic-bezier(0.2,1,0.3,1)` ×8**; dominant durations `transform 0.5s` (×7) and `0.4s` (×3), `color 0.5s` (×4); staged delay `0.3s` (transition-delay ×2, plus Kukuri's `width 0.4s 0.3s`); one SVG `fill 0.2s`. Kukuri in full (the data-letters flagship): link `font-weight:900; line-height:0.75; text-transform:uppercase; color:#b2b0a9; overflow:hidden`; `::after` = bar, `height:16px; top:50%; margin-top:-8px; transform:translate3d(-100%,0,0); transition:transform 0.4s cubic-bezier(0.7,0,0.3,1)` → hover `translate3d(100%,0,0)`; `::before` = `content:attr(data-letters); color:#424242; white-space:nowrap; width:0%; transition:width 0.4s 0.3s` → hover `width:100%` (dark copy wipes in behind the bar).
- Breakpoints (Measured): `@media (max-width:50em)` and `(max-width:42em)` shrink the display sizes. Reduced motion: **absent**.
- Rebuild notes: the most portable entry in the batch — each effect is a copy-paste CSS class + (for Kukuri class) a `data-letters` duplicate attribute; survives Elementor as a CSS class on any link/button (add the class via the widget's CSS-class field, transitions are self-contained). Phone: hover does not exist — treat as progressive enhancement only (tap navigates; L2 note stands). Library-ready set: `TEXT-HOVER-CURVES = { sweep: cubic-bezier(0.7,0,0.3,1), spring: cubic-bezier(0.2,1,0.3,1), durMain:0.5, durFast:0.4, stageDelay:0.3 }`, `KUKURI = { barH:16, barEase:0.7/0/0.3/1, wipeDur:0.4, wipeDelay:0.3, weight:900, lh:0.75 }`.

## Q79 · Atlason — https://atlason.com/
- Naming note (Measured): the site's own `<title>` reads **"Altason"** (domain atlason.com; Lane 1 logged "Atlason"). Hero line (Seen): "Everything we imagine can be made."; contact block in page: 594 Broadway, Floor 2, New York City 10012 · (+1) 212 966 4040.
- Stack (Measured): hand-rolled **Vite + Web Components** build (`customElements.define` per component), no framework runtime in the app chunk. App module `dist/app-BHjcGcnu.js` = **32,385 B**; CSS `dist/style-CwDMFsGS.css` ≈ 56 KB; animation/video/routing code is **lazy-loaded via dynamic import**: `gsap-C2aaNUJ7.js` = **124,748 B** (GSAP + ScrollTrigger + ScrollToPlugin + CustomEase), `barba-qmTP3nsC.js` = **31,440 B** (Barba.js page transitions), plus ten ~1.0–1.6 KB component chunks (Gallery, Masonry, ArchiveList, Header, Cursor, CursorArea, Accordion, Pagination, Player, Height). Masonry + imagesLoaded are bundled for the gallery; **Plyr** ships in CSS (keyframes `plyr-fade-in / plyr-popup / plyr-progress`) for video work. GA gtag present (cross-host, not fetched, per discipline). fetch_and_mine got the 2 static assets correctly; the dynamic-import chunks were hand-fetched same-host afterwards (logged in values-raw.txt).
- Mechanism step-by-step: (1) server-rendered HTML carries the content (Featured/Archive gallery items in markup); (2) the app chunk registers web components and defers all motion code — GSAP chunk loads async, then `gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, CustomEase)`, creates `gsap.matchMedia()`, registers the site's two custom eases, and only then runs queued animation callbacks (breakpoint-gated via matchMedia); (3) Barba swaps page containers without full reloads; (4) gallery = Masonry layout after imagesLoaded; Featured/Archive are two list views over the same project set (ArchiveList component); (5) video items run through the Plyr-based Player component.
- Exact parameters (Measured): the site's signature motion tokens — **CustomEase "bazz-in" = cubic-bezier(0.54, 0.15, 0.15, 1)** and **"bazz-out" = cubic-bezier(0.85, 0, 0.45, 0.85)** (created via `CustomEase.create(name, "x1,y1,x2,y2")`; both curves also appear verbatim in the CSS). ArchiveList tween: **duration 0.5, ease "power3"** (the one component-level tween isolated before the chunk graph wrapper-thins out — remaining component tweens sit behind minified shared chunks; partial depth, stated honestly). CSS transitions are utility-short: `box-shadow .3s` ×7, `all .3s/.2s`, one `transform .4s ease-in-out`, overlay fade `opacity 1s, visibility 1ms 1s`. Breakpoint tokens present in the app: min-width 1600px / 2000px tiers.
- Reduced motion: **none** in CSS (Measured: 0 `prefers-reduced-motion`); JS gating is by viewport breakpoint, not motion preference.
- Rebuild notes: the architecture (Barba + web components) does not port to WordPress, but three patterns do, directly: (a) a **named dual-ease design token pair** (one in-curve, one out-curve) used across a whole site; (b) **lazy-loading the animation library as a separate chunk only when motion components exist** — first paint here is 32 KB JS + 57 KB CSS, GSAP's 125 KB arrives async; (c) `gsap.matchMedia()` breakpoint gating instead of resize handlers. Phone cost as shipped: light initial payload; Masonry + big imagery dominates, not JS. Library-ready set: `BAZZ-EASES = { in: cubic-bezier(0.54,0.15,0.15,1), out: cubic-bezier(0.85,0,0.45,0.85), listTween: 0.5s power3 }`.

## Q88 · Building a 3D Infinite Carousel with Reactive Background Gradients — https://tympanus.net/codrops/2025/11/11/building-a-3d-infinite-carousel-with-reactive-background-gradients/
- Live demo: https://tympanus.net/Tutorials/3DGradientCarousel/ (200, mined). Repo: github.com/clementgrellier/gradientslider (author Clément Grellier).
- Source integrity: fetch_and_mine resolved the demo's `./base.css`-style refs against the origin root and downloaded 1441 B 404 stubs; stubs were overwritten by hand-fetching the same files from the demo directory (same host), and all values below come from the real `script.js` (27,152 B, fully readable source) + real CSS. Route fix logged in values-raw.txt.
- Stack (Measured): **vanilla JS, no WebGL, no framework**; GSAP **3.13.0** loaded from jsDelivr CDN (cross-host, deliberately not fetched) and used for exactly two things — the gradient colour tween and the entry timeline; everything else is hand-rolled rAF. Own payload: script.js 27,152 B + styles.css 2,262 B + base.css 2,625 B.
- Mechanism step-by-step:
  1. Cards: 10 `<article class="card">` built from an IMAGES array, absolutely positioned, `will-change: transform`; layout STEP = cardW + GAP; TRACK = n × STEP; positions kept in a Float32Array and wrapped by safe modulo into [−TRACK/2, +TRACK/2] so the loop is endless in both directions.
  2. Per-frame transform from signed distance to viewport centre: `norm = clamp(screenX / (innerWidth/2), −1, 1)`; `rotateY = −norm × 28°`; `translateZ = (1−|norm|) × 140px`; `scale = 0.92 + (1−|norm|) × 0.1`; composed as `translate3d(x, −50%, tz) rotateY(ry) scale(s)`; `zIndex = 1000 + round(tz)`; non-core cards (not active ±1) get `blur(2 × |norm|^1.1 px)`.
  3. Physics: wheel adds `delta × WHEEL_SENS × 20` to velocity; drag (Pointer Events + setPointerCapture) moves scroll 1:1 and on release sets `vX = −lastDelta × DRAG_SENS` (lastDelta = dx/dt, momentum fling); per frame `SCROLL_X = mod(SCROLL_X + vX·dt, TRACK)` and velocity decays frame-rate-independently: `vX *= Math.pow(0.9, dt×60)`, zeroed below |0.02|.
  4. Palette extraction per image: draw to canvas downscaled to **MAX 48 px** long edge (min 16); build a hue×saturation histogram (**36 hue bins × 5 saturation bins**); skip pixels with alpha < 0.05, lightness < 0.1 or > 0.92, saturation < 0.08; weight = `a × s² × (1 − |l−0.5| × 0.6)`; primary = heaviest bin, saturation boosted ×1.15 clamped to [0.45, 1], lightness forced 0.5; secondary = heaviest bin ≥ 25° hue away **only if its weight ≥ 0.6 × primary weight** (sat ×1.05, L 0.72), else primary hue at L 0.72; failure fallback: hue `(idx × 37) % 360`, s 0.65, L 0.52/0.72.
  5. Background: full-stage canvas (DPR clamped 1–2), base `#f6f7f9`, two radial gradients (alphas **0.85 / 0.70**, radii **0.75 / 0.65** × max(w,h)) whose centres orbit slowly (`time = now × 0.0002`; amplitudes 0.35 / 0.28 × min(w,h), y-squash 0.4 / 0.5, phase offsets +1.2/+0.7, counter-rotating). On active-card change: `gsap.to(gradCurrent, {duration: 0.45, ease: 'power2.out'})` to the new palette, and the bg loop runs at 60 fps for 800 ms (`bgFastUntil`), otherwise throttled to ~30 fps (33 ms min interval).
  6. Entry: after preload (`<link rel=preload fetchPriority=high>`), `img.decode()` on all images, a forced reflow, and a **compositing warm-up** (scrolls the whole track in STEP/2 increments, painting every 3rd step), visible cards (|screenX| < 0.6 × viewport, sorted left→right) animate in with a GSAP timeline: from scale 0.92 / translateY +40 px / opacity 0 → **0.6 s power3.out, stagger idx × 0.05**; input is locked (`isEntering`) until it completes. `visibilitychange` pauses/resumes both rAF loops.
- Exact parameters (Measured): `FRICTION 0.9 · WHEEL_SENS 0.6 · DRAG_SENS 1.0 · MAX_ROTATION 28° · MAX_DEPTH 140px · MIN_SCALE 0.92 · SCALE_RANGE 0.1 · GAP 28px`; card CSS `width: min(26vw, 360px)`, min-width 220px; stage `perspective: 1800px`. **Correction to L2:** Lane 1 recorded MIN_SCALE 0.8 — the deployed script measures **0.92** (0.8 may reflect an earlier repo state); use 0.92.
- Reduced motion: **partial** (Measured) — `@media (prefers-reduced-motion: reduce)` in styles.css kills `.card` transition/animation only; the JS rAF loops are not gated.
- Rebuild notes: single-HTML rebuild is a direct port (all logic is in the one readable script.js in code-source/88-3d-infinite-carousel/). In Elementor: a full-width section with the stage markup + the script in an HTML widget; GSAP is optional decoration (gradient tween falls back to a snap via Object.assign if GSAP is absent — but the entry timeline calls `window.gsap` unguarded, so ship GSAP or re-code the entry in WAAPI). Phone cost: own JS 27 KB + CSS ~5 KB — the cheapest rich effect in this batch; touch drag works via Pointer Events; the wheel handler calls preventDefault, so scope it to the stage only (as shipped) or the page can't scroll on desktop. Library-ready set: `CAROUSEL-3D = { friction:0.9^dt60, wheelSens:0.6 (×20 impulse), dragSens:1.0, maxRot:28, maxDepth:140, minScale:0.92, scaleRange:0.1, gap:28, perspective:1800, blurEdge:2·|norm|^1.1 }`, `PALETTE-EXTRACT = { downscale:48, bins:36×5, skipL:[<0.1,>0.92], skipS:<0.08, weight:a·s²·(1−|l−.5|·.6), satBoost:1.15→[.45,1], L1:0.5, L2:0.72, secondaryGate:≥25° & ≥0.6w, fallbackHue:(i·37)%360 }`, `GRAD-TWEEN = { dur:0.45, ease:power2.out, fastWindow:800ms, idleFps:30 }`.

## Q89 · Animating SVG Text on a Path — https://tympanus.net/codrops/2020/02/26/animating-svg-text-on-a-path/
- Source integrity: **the batch-1 /tmp contamination, confirmed in this batch.** Demo URL from the article (`tympanus.net/Development/AnimatedTextOnPath/`) is 404 today; fetch_and_mine downloaded 0 assets, yet its values-raw.txt reported "combined JS 8.0K / CSS 4.0K" and a font stack — those are Q88's leftovers from the shared `/tmp/mine_js.txt`/`mine_css.txt` and are **discarded in full** (integrity note appended to the slug's values-raw.txt). Mechanism re-mined by hand from the article-linked repo **github.com/codrops/AnimateSVGTextPath** (`js/textOnPath.js`, `js/index.js`, `js/mathUtils.js`, demo `index.html`, dist bundle).
- Stack (Measured from repo): vanilla JS, **no GSAP**; imagesLoaded + WebFont loader (Typekit kit `rhw1vur`); Parcel dist JS **28,019 B**, CSS **4,631 B**. Demo page runs **8** `svg.svgtext` instances: 6 with `data-filter-type="blur"`, 2 with `"distortion"`.
- Mechanism step-by-step:
  1. Each instance wraps one SVG containing a `<path>` (in defs) and `<text><textPath>` plus an SVG filter (feGaussianBlur or feDisplacementMap) applied to the text.
  2. On init: `pathLength = path.getTotalLength()`; the SVG's document position is cached (`rect.top + pageYOffset`, refreshed on resize).
  3. Scroll coupling: target startOffset = `map(positionY − scrollY, viewportHeight → 0, pathLength → −pathLength/2)` — i.e. as the SVG travels from viewport bottom to top, the text slides along the path by 1.5 path-lengths, entering from the right.
  4. Smoothing: the applied startOffset lerps toward the target with **amt 0.22** per rAF frame; `textPath.setAttribute('startOffset', value)` each frame. On first entry after being off-screen the value snaps (no lerp) to avoid a long catch-up sweep.
  5. Visibility gating: an **IntersectionObserver** per SVG (`isVisible = intersectionRatio > 0`); the rAF loop runs always but `update()` only executes while visible; leaving the viewport resets the entered flag.
  6. Scroll-speed filter: a second lerped scroll tracker (**amt 0.17**); `distance = |smoothedScroll − actualScroll|` proxies scroll velocity; for blur instances `feGaussianBlur stdDeviation = clamp(map(distance, 0→400, minDeviation→maxDeviation))` (defaults 0→10; demo instances measure max-deviation **10** and **30**); for distortion instances `feDisplacementMap scale = clamp(map(distance, 0→200, 0→100))` (demo max-scale **50** and **100** measured).
  7. Firefox guard: UA sniff — if Firefox, the `filter` attribute is stripped from the text entirely (the article documents why: animated SVG filters are pathologically slow in Firefox; bugs 1456932 / 422371 / 1583828 cited).
- Exact parameters (Measured): lerp offsets **0.22** (position) / **0.17** (scroll); blur map range **0–400 px distance → 0–10 stdDeviation** default; displacement map **0–200 → 0–100 scale** default; demo display type at `font-size: 19vw` in base.css.
- Reduced motion: **absent** (Measured — none in repo CSS/JS).
- Rebuild notes: extremely portable — one inline SVG + ~120 lines of JS; in Elementor an HTML widget per headline band. The startOffset map + dual-lerp is the whole trick; drop the filters (or gate them to Chromium/WebKit as the original does for Firefox) for production, because animating feGaussianBlur/feDisplacementMap per frame is the only expensive part. Phone cost: mechanism ≈ 3 KB hand-ported (the 28 KB dist is mostly imagesLoaded/WebFont plumbing); demo images (~700 KB) are content, not mechanism. Library-ready set: `TEXTPATH-SCROLL = { offsetMap: [vh→0] ↦ [len→−len/2], lerpPos:0.22, lerpScroll:0.17, blurMap: dist 0–400 → dev 0–10, distortMap: dist 0–200 → scale 0–100, gate: IntersectionObserver ratio>0, firefox: strip filter }`.

## Q90 · Organic Shape Animations with SVG clipPath — https://tympanus.net/codrops/2017/06/28/organic-shape-animations-with-svg-clippath/
- Source integrity: demo URL from the article (`tympanus.net/Development/OrganicShapes/`) is 404 today; fetch_and_mine downloaded 0 assets → its values-raw.txt discarded (same /tmp contamination risk; integrity note appended). Mechanism mined by hand from the article-linked repo **github.com/codrops/OrganicShapeAnimations** (`js/main.js` read in full; the article body itself prints the style-1 item's full data-attribute set, and article + repo agree).
- Stack (Measured): **anime.js** (bundled `anime.min.js` **10,956 B**) + `main.js` **5,134 B**; no other JS. Demo ships **9 items**; each item's SVG is `500×500, viewBox 0 0 500 500`.
- Mechanism step-by-step:
  1. Markup per item: `<clipPath>` holds the start blob path; a `<g clip-path="url(#…)">` wraps the `<image>`; a decorative path lives once in a shared defs block and is instanced per item with `<use xlink:href="#decoN">`; the morph target and ALL animation settings ride on the item element as `data-*` attributes (`data-morph-path`, `data-animation-path-duration`, …), so the system is fully data-driven per item.
  2. On hover intent — mouseenter starts a **75 ms debounce timer** (prevents flicker on pass-through); mouseleave reverses; **touchstart/touchend are mapped to the same two handlers** (tap = activate, L2's phone note confirmed in source).
  3. Three anime.js tweens run in parallel, each reading its own config group: the **clip path** (`d` morph start↔end + scale/translate/rotate), the **image** (counter-transform inside the clip), the **deco** (lagging transform). `anime.remove(target)` precedes every re-tween so reversals interrupt cleanly. Path morphing requires both `d` strings to share command structure (anime interpolates the numbers).
  4. Meta text choreography: title does a two-step roll — `translateY −50% (200 ms) → [50%→0%] (200 ms)` with opacity 0→1, easeOutQuad; subtitle follows at **delay 250 ms** on entry, and collapses in **1 ms** on exit (asymmetric: text swaps feel instant-out, staged-in).
- Exact parameters — engine defaults (Measured from main.js CONFIG): path `{duration:1500, delay:0, easing:'easeOutElastic', elasticity:400, scale:1/1, translate:0/0, rotate:0}`; image `{duration:2000, easeOutElastic, elasticity:400, scale:1.1/1.1}`; deco `{duration:2500, easeOutQuad, elasticity:400, scale:0.9/0.9}`. Demo item style-1 overrides (article-stated + repo HTML): path `duration 800, easeInOutCubic, elasticity 300, scaleX 0.8, scaleY 1.1, translateY 30, rotate 5`; image `duration 800, easeInOutQuart, elasticity 300, scale 1.2/1.2, translate −20/−45, rotate −5`; deco `duration 1300, easeOutQuad, elasticity 300, scale 0.8/0.9, translate −5/−5, rotate 2`; hover debounce **75 ms**.
- Reduced motion: **absent** (Measured).
- Rebuild notes: ports 1:1 to a single HTML file with anime.js (11 KB) or to GSAP (tween `attr:{d:…}` + transforms; elasticity maps to GSAP's `elastic.out(1, 0.x)` family — keep the three-layer duration ladder 800/800/1300 or default 1500/2000/2500, the deco lag is what reads as "organic"). In Elementor: one HTML widget per card; generate blob path pairs with any blob tool, keeping command counts identical between start/end. Phone: tap activation works as shipped; keep image counter-scale ≥1.1 so clip edges never show. Library-ready set: `ORGANIC-CLIP = { layers:[clipPath, image, deco], defaults:{path:1500/easeOutElastic/400, image:2000/easeOutElastic/400/scale1.1, deco:2500/easeOutQuad/400/scale0.9}, tuned:{path:800/easeInOutCubic/300, image:800/easeInOutQuart/300, deco:1300/easeOutQuad/300}, hoverDebounce:75ms, titleRoll:200+200 easeOutQuad, subtitleDelay:250 }`.

## Q91 · Animated SVG Icons with Snap.svg — https://tympanus.net/codrops/2013/11/05/animated-svg-icons-with-snap-svg/
- Live demo: https://tympanus.net/Development/AnimatedSVGIcons/ (200, mined — the only surviving Development/ demo in this batch). Repo: github.com/codrops/AnimatedSVGIcons.
- Source integrity: first fetch_and_mine pass resolved the demo's relative `css/…`/`js/…` refs against the origin root → 1441 B 404 stubs; real assets hand-refetched from the demo directory (same host) and all values below come from the real files (logged in values-raw.txt).
- Stack (Measured): **Snap.svg** (`snap.svg-min.js` **71,572 B**) + engine `svgicons.js` **6,124 B** + data `svgicons-config.js` **11,458 B** + custom Modernizr **7,804 B**; CSS `component.css` 2,102 B. Icons are **external SVG files loaded at runtime** via `Snap.load('svg/<name>.svg')`, drawn on a `viewBox 0 0 64 64` canvas.
- Mechanism step-by-step:
  1. Page markup is just `<span class="si-icon …" data-icon-name="clock">` placeholders; the engine creates a Snap paper per span, loads the named SVG file, appends its `<g>`, then binds events.
  2. Each icon's behaviour is pure data in the config: a list of steps `{el: 'path:nth-child(2)', animProperties: {from:{val:'{"transform":"r0 32 32"}'}, to:{val:'{"transform":"r630 32 32"}'}}}` — attribute JSON strings in Snap transform syntax (`r` rotate w/ centre, `t` translate, `s` scale) or full `path` d-strings for morphs, with optional `before` / `after` / `animAfter` hooks and a `delayFactor`.
  3. `toggle()` walks the steps: applies `before` attrs instantly, then `el.animate(JSON.parse(val), speed, easing, callback)` inside a `setTimeout` of `delayFactor × speed` — so per-step stagger is expressed as a fraction of the global speed; on completion `after` attrs apply and `animAfter` chains a second animate (used by hourglass to swap its sand path after the flip).
  4. Trigger model: `evtoggle: 'click'` default; on touch devices a UA-sniff `mobilecheck()` switches the binding to `touchstart`; `si-icon-reverse` class pre-toggles an icon. No-SVG fallback: Modernizr adds `.no-svg` and CSS swaps each span to a static PNG background.
- Exact parameters (Measured): engine defaults **`speed: 200` ms, `easing: mina.linear`, size 64×64**. Demo instantiates **42 icons in 3 regimes**: (1) defaults (click, 200 ms, linear); (2) "speeds & easings" — `mina.backin` @200 ms (nav arrows, hamburger, plus, volume, hourglass, equalizer) and **`mina.elastic` @600 ms** (hamburgerCross, trash, clock, maximize, contract, glass); (3) hover section — `evtoggle:'mouseover'`, **size 128×128**, `mina.backin`. **24 named configs** in the file. Exemplars: clock hands → `r630 32 32` (minute) + `r80 32 32` (hour); volume arcs enter from `t−10 0 s0 32 32` with delayFactors **0.5 / 0.25 / 0** (wave stagger); hamburgerCross morphs the outer lines to X d-strings while the middle line scales to 0 + opacity 0; play morphs triangle d → rect d; zoom scales lens 1.1× and the plus 2× with stroke-width 1→2; hourglass rotates `r180 32 32` then `animAfter` swaps the sand path.
- Reduced motion: **absent** (2013 source, Measured).
- Rebuild notes: do NOT ship Snap.svg (71.6 KB, unmaintained) — the portable asset is the **config format**: {step, from-attrs, to-attrs, delayFactor} + one global {speed, easing}. Re-implement with GSAP (attr plugin handles transform strings and d-morphs when command counts match) in ~40 lines; the whole 24-icon library then costs GSAP-core only. Elementor: ideal for service-icon rows (wrench/fan/thermostat icons that animate on tap) — bind click/tap, never hover-only. Phone cost as shipped: ~90 KB JS + one SVG fetch per icon; rebuilt on GSAP: ~0 marginal. Library-ready set: `ICON-TOGGLE = { speed:200, elasticSpeed:600, easings:{default:linear, pop:backin, elastic:elastic}, delayFactor: stepDelay/speed, canvas:64, hoverSize:128 }` + the clock/volume/hamburgerCross exemplar configs above.

## Q92 · Building an Infinite Parallax Grid with GSAP and Seamless Tiling — https://tympanus.net/codrops/2025/06/11/building-an-infinite-parallax-grid-with-gsap-and-seamless-tiling/
- Live demo: https://tympanus.net/Tutorials/InfiniteLayersGrid (200, mined). Repo: github.com/JorgeCapillo/infinite-layers-grid (author Jorge Toloza, DDS Studio).
- Source integrity: first pass fetched 1441 B stubs for the `./assets/…` bundle (same relative-ref bug); the real Vite bundle (`index-29d3b2ae.js`, **85,406 B**) + CSS (2,762 B) were hand-refetched from the demo directory, and the author's repo source (article-linked) was read in full for exact values; bundle corroborates (`expo.inOut`, SplitText present). Integrity note appended to values-raw.txt.
- Stack (Measured): **GSAP ^3.13.0 incl. SplitText** (club plugin), Vite bundle 85,406 B. **No ScrollTrigger and no scroll library** — despite the title's framing, the infinite scroll is a hand-rolled lerp engine; GSAP is used only for the intro tween and SplitText caption splitting.
- Mechanism step-by-step:
  1. Layout is data: a design space of **1522×1238** holding **9 items** at fixed {x, y, w, h} — (71,58,400×270), (211,255,540×360), (631,158,400×270), (1191,245,260×195), (351,687,260×290), (751,824,205×154), (911,540,260×350), (1051,803,400×300), (71,922,350×260). The tile scales to viewport width (`tileH = winW × 1238/1522`); every item is duplicated at offsets [0, tileW]×[0, tileH] (**2×2 = 4 copies, 36 DOM items**), then tileSize is doubled for the wrap maths.
  2. Scroll state: `target` is moved by wheel (`target −= delta × 0.4`, with preventDefault — the page's own scroll is fully hijacked) and by drag (pointer delta added 1:1 while mousedown); `current` lerps toward target at **ease 0.06** per rAF frame.
  3. Smoothing stack (all Measured): scroll delta, mouse position and mouse-press are each lerped at **0.04**; every item carries a random **`ease = Math.random() × 0.5 + 0.5`** (0.5–1.0, re-rolled on every resize/rebuild).
  4. Per-item render: parallax offset = `5 × smoothedDelta × itemEase + (mouseNorm − 0.5) × itemRect × 0.6`; wrap is direction-aware (an item fully past the leading edge gets `extraX/extraY ∓ doubledTileSize`); the inner `<img>` counter-moves: `scale(1.2 + 0.2 × press × itemEase) translate(−mouse.x × itemEase × 10%, −mouse.y × itemEase × 10%)` — pressing the mouse subtly zooms the photos.
  5. Intro: items currently on screen are first `gsap.set` to the viewport centre, then `gsap.to` back to x/y 0 with **duration 2, ease 'expo.inOut', stagger 0.05**, in reversed DOM order — the grid explodes outward from centre on load.
  6. Captions: SplitText `type:'lines', mask:'lines'`; reveal is CSS — `.line-mask/.line { transition: transform 2s cubic-bezier(0.6, 0.14, 0, 1) }` with per-line `transitionDelay = i × 0.15s` set inline; an **IntersectionObserver** toggles the `visible` class on each caption `<small>` (observers sit on captions, not items).
  7. Resize = full rebuild (container innerHTML cleared, items recreated, scroll re-anchored at −10% of viewport).
- Exact parameters collected above; headline set: `scrollEase 0.06 · delta/mouse/press lerp 0.04 · wheelFactor 0.4 · itemEase rand[0.5,1.0] · parallax 5×delta + 0.6×rect mouse · imgBaseScale 1.2, pressZoom +0.2 · intro {2s, expo.inOut, stagger 0.05, fromCentre} · caption {2s, cubic-bezier(0.6,0.14,0,1), lineDelay 0.15s/line}`.
- Reduced motion: **absent** (Measured — none in repo source or deployed bundle). Touch: **no touch handlers in source** (mousedown/mousemove only) — on phones the grid is effectively static and wheel input doesn't exist; a production port must add pointer events + a non-hijacked scroll mode.
- Rebuild notes: single-HTML port is faithful and cheap (the engine is ~260 lines); in WordPress/Elementor use it only inside a dedicated full-screen section — the wheel preventDefault makes it a page-level scroll trap anywhere else. The transferable gems for normal pages are the *intro* (centre-out expo.inOut 2 s / 0.05 stagger for a photo wall) and the *caption system* (SplitText lines + 2 s custom-bezier CSS reveal + 0.15 s per-line delay + IO class toggle — zero JS in the animation loop). Library-ready set: `INFINITE-GRID = { tile:[1522×1238], reps:2×2, scrollEase:0.06, lerpAux:0.04, wheel:0.4, itemEase:rand .5–1, parallax:{delta:5, mouse:0.6}, img:{base:1.2, press:+0.2, counter:10%} }`, `INTRO-EXPLODE = { dur:2, ease:expo.inOut, stagger:0.05, from:viewportCentre, order:reversed }`, `CAPTION-LINES = { transition:2s, bezier:(0.6,0.14,0,1), delayPerLine:0.15s, gate:IntersectionObserver .visible }`.

## BATCH TALLY — Slice 2, Batch 2
- **Completed: 8 / 9** — Q75 (repo source), Q78 (repo source), Q79 (live site + hand-fetched chunks), Q88 (live demo, stub-corrected), Q89 (repo source), Q90 (repo source + article), Q91 (live demo, stub-corrected), Q92 (live demo + author repo).
- **Blocked: 1** — Q74 (CodePen pen by akin-elmas): pen URL/ID unrecoverable through 7 logged routes (CodePen profile is JS-rendered, Wayback CDX empty + availability API 429, two search engines). Unmeasured: the pen's source in full; only Lane 1's L2-recorded values exist (SlowMo.ease.config(0.3, 0.1, false), sun duration 5, wave-visibility gating).
- Route/integrity incidents, all logged in the affected slugs' values-raw.txt: 4 dead Codrops demo URLs (75/78/89/90 → article-linked GitHub repos used); fetch_and_mine relative-ref bug produced 1441 B stubs for 88/91/92 (hand-refetched same-host); shared-/tmp contamination confirmed in Q89's values-raw (Q88 leftovers) and discarded for all 0-asset slugs (75/78/89/90); Atlason's dynamic-import chunks hand-fetched same-host. No permission cards encountered; no third-party asset hosts fetched (GSAP CDN for Q88 noted, not fetched).

# Deep Reads — Slice 2, Part 3 (batch 3 of 4)

Worker: Lane 2 chat (helper). Date: 2026-10-26. Entries: Q93, Q94, Q95, Q98, Q101, Q106, Q107, Q108 (queue order).
Method per entry: browser.open first contact → `fetch_and_mine.sh` source pass (same-host only) → hand-mining of bundles/inline source. Values labelled **Measured** (read in deployed source), **article-stated** (Codrops article text), **L2-recorded** (Lane 1 Level-2 log), **Inferred** (reasoned, not directly read).
Integrity notes: script bug (b) hit on Q93 and Q94 (relative refs produced ~1.4 KB 404 stubs; real bundles hand-refetched from the demo directory, same host, files saved with `.real` suffix in the slug dirs). Q108's miner pass reported combined JS 0 because SvelteKit loads its entry via inline `import()` — entry + node chunks were hand-fetched same-host (logged in the Q108 entry). Q98's near-zero same-host JS is genuine platform design (Webflow: logic lives in inline scripts + cross-host CDN bundles, versions measured from the page's own script tags; cross-host bundles NOT fetched, per discipline). Zero permission cards across the batch.

---

## Q93 · Elastic Grid Scroll with GSAP ScrollSmoother (Codrops) — https://tympanus.net/codrops/2025/06/03/elastic-grid-scroll-creating-lag-based-layout-animations-with-gsap-scrollsmoother/

- **Live URLs:** article above; demo https://tympanus.net/Tutorials/ElasticGridScroll/ (+ index2.html / index3.html / index4.html variants); repo github.com/codrops/ElasticGridScroll.
- **Stack (Measured):** static HTML/CSS/JS demo; GSAP + ScrollSmoother (Club plugin, shipped in the demo bundle); images preloaded before init. All four demo JS files read in full from `code-source/93-elastic-grid-scroll/` (index.js.real 5,400 B; base.css.real 6,937 B; index-demo2/3/4.js).

### Mechanism step-by-step
1. Page is one CSS grid of image items. On load, JS reads the **computed** `grid-template-columns` to learn the live column count, groups items by `index % numColumns`, and wraps each column's items in a `.grid__column` wrapper.
2. `ScrollSmoother.create({ smooth: 1, effects: true, normalizeScroll: true })` takes over scrolling.
3. For every item, `smoother.effects(el, { speed: 1, lag })` is applied with a **per-item lag computed from its column index** — the lag differential between columns is what makes the grid look elastic (columns chase the scroll at different rates).
4. On resize, effects are rebuilt **only if the column count changed** (old lag effects are killed first) — resizing within the same column count costs nothing.
5. Four demos = four lag distributions over the same scaffold (below).

### Exact parameters (Measured)
- ScrollSmoother: `smooth: 1` (forced `0` under prefers-reduced-motion), `effects: true`, `normalizeScroll: true`.
- **Demo 1 (distance-from-centre):** baseLag 0.5, lagScale 0.1 → `lag = 0.5 + |i − mid| × 0.1` (centre column fastest, edges trail).
- **Demo 2 (lag + velocity squash):** baseLag 0.5, lagScale 0.13, same centre formula; plus a `gsap.ticker` velocity pass writing CSS vars `--si / --sy / --to`: minScaleX 0.7, maxScaleY 1.7, scrollSensitivity 4000 px/s, dead-zone threshold 700 px/s (below it, no squash); transform-origin flips `50% 0%` / `50% 100%` by scroll direction; style writes skipped when values unchanged.
- **Demo 3 (linear wave):** baseLag 0.2, lagScale 0.3 → `lag = 0.2 + (i + 1) × 0.3` (lag grows left→right).
- **Demo 4 (inverted):** baseLag 0.3, lagFactor 0.15 → `lag = 0.3 + (maxDistance − distance + 1) × 0.15` (centre column lags MOST).
- CSS: `--column-count: 3` base; demo2 → 7 columns @min-width 65em with `--c-gap: 5px`; demo3 → 5 @65em, c-gap 0; demo4 → 9 @65em. `--c-gap / --r-gap: 5vw` base, `--column-size: 80px`, item `aspect-ratio: 128/160`, caption 11px.

### Reduced motion (Measured)
`smooth` forced to 0 and lag effects are skipped entirely when `prefers-reduced-motion` matches — the grid becomes a plain static grid.

### Rebuild notes
Single-HTML + GSAP terms: fully portable — one grid, one ScrollSmoother instance, one effects loop; the four variants are a one-line lag formula swap. ScrollSmoother is a Club plugin (licence needed outside CodePen/demo contexts); a free fallback is per-column `quickTo` y-offsets driven by a scroll proxy, which approximates demos 1/3/4 but not the velocity squash. WP+Elementor: survives as a Custom HTML widget section; keep the grid outside Elementor's own containers so ScrollSmoother's pin-spacer math stays clean. Phone cost: demo JS is a few KB; the cost is image weight — keep grid images ≤ ~60 KB each (AVIF/WebP) or the lag reads as jank on mid Android.

### Library-ready parameter set
`ScrollSmoother{smooth:1, effects:true, normalizeScroll:true}` · lag formulas: centre `0.5+|i−mid|×0.1` / wave `0.2+(i+1)×0.3` / inverted `0.3+(maxD−d+1)×0.15` · squash: scaleX≥0.7, scaleY≤1.7, sens 4000 px/s, dead-zone 700 px/s · grid: cols 3→5/7/9 @65em, gaps 5vw→5px/0, item ratio 128/160.

---

## Q94 · Sticky Grid Scroll (Codrops, Theo Plawinski) — https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/

- **Live URLs:** article above; demo https://tympanus.net/Tutorials/StickyGridScroll/; repo github.com/theoplawinski/codrops-sticky-grid-scroll.
- **Stack (Measured):** GSAP + ScrollTrigger + Lenis; single class `StickyGridScroll`; init gated on `preloadImages()`. Production bundle verified against the article value-by-value (`code-source/94-sticky-grid-scroll/`: real bundle index-CbAMiMj5.js.real 141,359 B, CSS 4,020 B — scale 2.05 ×3, "top 57%", "top 25%", each:.06, yPercent:-100, durations .7/.4 all present).

### Mechanism step-by-step
1. A `.block--main { height: 425vh }` section holds a sticky wrapper (top 0). Inside: a centred gallery 736rem wide (fluid rem: `html { font-size: calc(100vw / 1440) }`), a 3-column grid (column-gap 32rem, row-gap 40rem), 12 items at `aspect-ratio: 1`, object-fit cover, plus title/description/button content that starts hidden.
2. Lenis smooth-scrolls (`lerp: 0.08, wheelMultiplier: 1.4`), wired the standard way: `lenis.on("scroll", ScrollTrigger.update)`, GSAP ticker drives `lenis.raf(time * 1000)`, `gsap.ticker.lagSmoothing(0)`.
3. Scroll map over the block: 0–45% columns reveal, 45–90% grid zooms open, 90–95% content settles.
4. **Reveal:** columns alternate entering from top/bottom; each column's travel `dy = wh − (wh − grid.offsetHeight)/2`; stagger `{ each: 0.06, from: fromTop ? "end" : "start" }`, ease power1.inOut, shared timeline label "grid-reveal".
5. **Zoom:** sub-timeline (defaults duration 1, ease power3.inOut) added at "-=0.6": grid `scale: 2.05`; side columns xPercent −40 / +40; centre-column items split at the midpoint, yPercent ±40, duration 0.5, power1.inOut, at "-=0.5".
6. **Content toggle:** a `call()` at "-=0.32" reads `timeline.scrollTrigger.direction` so content animates in on the way down and out on the way up: title to yPercent 0 from measured `titleOffsetY = ((contentH − titleH)/2) / contentH × 100`, duration 0.7, power2.inOut; description + button opacity duration 0.4 (power1.inOut showing / power1.out hiding), pointerEvents toggled with it.
7. Side pieces: an intro parallax `gsap.from(wrapper, { yPercent: -100, ease: "none" })` (ST start "top bottom", end "top top", scrub) and a title fade from opacity 0, 0.7s power1.out, ST start "top 57%", toggleActions "play none none reset". Main timeline ST: trigger = block, start "top 25%", end "bottom bottom", scrub true.

### Exact parameters (Measured)
Lenis lerp 0.08, wheelMultiplier 1.4 · block height 425vh · grid: 3 cols, gaps 32rem/40rem, gallery 736rem @ 1440-base fluid rem · reveal stagger each 0.06, power1.inOut · zoom scale 2.05, side xPercent ±40, centre yPercent ±40 (0.5s) · title 0.7s power2.inOut · desc/button 0.4s · parallax yPercent −100 scrubbed.

### Reduced motion (Measured)
Production CSS uses `@media (scripting: enabled)` + min-width 768px breakpoints; **no prefers-reduced-motion rules found** in the shipped CSS — flag as a gap to close in any rebuild (gate the zoom timeline behind a matchMedia check).

### Rebuild notes
Single-HTML + GSAP: fully portable with free plugins only (GSAP + ScrollTrigger + Lenis). The fluid-rem trick (`100vw/1440`) is the portability key — the whole composition scales proportionally at any width; below 768px the demo simply doesn't run the effect. WP+Elementor: workable as one HTML widget; the 425vh block must be a plain section (Elementor sticky conflicts with the inner sticky wrapper — use the demo's own position:sticky, not Elementor's). Phone cost: 12 square images dominate; bundle JS ~141 KB is mostly GSAP+Lenis+demo — budget ~55 KB after tree-shaking to core GSAP + ScrollTrigger + Lenis.

### Library-ready parameter set
425vh block · sticky stage · reveal 0–45% (stagger each .06, power1.inOut, alternating origin) · zoom 45–90% (scale 2.05, cols xPercent ±40, centre items yPercent ±40) · content at 90–95% (title .7 power2.inOut, fade .4) · Lenis {lerp:.08, wheelMultiplier:1.4} · fluid rem = 100vw/1440.

---

## Q95 · Masked Heading (React Bits) — https://reactbits.dev/text-animations/masked-heading

- **Live URL:** component page above; source from the site's own registry endpoint `reactbits.dev/r/MaskedHeading-JS-CSS` (saved `code-source/95-masked-heading/registry-JS-CSS.json` 21,747 B; MaskedHeading.jsx 18,833 B / 616 lines + MaskedHeading.css 1,589 B extracted and read in full).
- **Stack (Measured):** React component, **single dependency gsap ^3.13.0**. No canvas, no WebGL: the mask is an SVG `<clipPath>` of per-glyph `<text>` elements.

### Mechanism step-by-step
1. A hidden measure span renders the real words (transparent colour, `text-wrap: balance`). Each character's box is measured with Range rects: glyph centre-y = baseline − fontPx × 0.36; per-line centre `lc` computed from the line's glyphs.
2. An SVG `<clipPath>` (userSpaceOnUse) is built from one `<text>` per glyph. The media layer (image or video) is clipped by it, so the media shows **only through the letterforms**. Glyph transform per character: `translate(cx(1−s) + x·(cx−lc), cy(1−s) + y) scale(s)` — this is what makes reveal/scale animations move glyphs around their own centres while staying registered to the measured layout.
3. Font size is fluid: `clamp(clientWidth × textScale, 20, 200)px`, textScale default 0.115. ResizeObserver + `document.fonts.ready` re-run the measurement/sync.
4. A rAF loop (IntersectionObserver-gated — it stops off-screen) animates the media inside the glyphs: idle drift dx = sin(clock×0.21)×drift, dy = cos(clock×0.17)×drift×0.6; exponential smoothing `1 − exp(−dt/0.18)` for drift, `1 − exp(−dt/0.35)` for zoom; pointer target = −normalised offset × parallax; media transform clamped to `((scale−1)/2) × size` so the overscan (fillScale) never exposes an edge. CSS filter applies brightness/saturate/grayscale.
5. Optional spotlight: a radial-gradient mask (SPOT_MASK, 9 stops) whose falloff uses the smootherstep polynomial `u³(u(6u−15)+10)`, u = clamp((t−0.1)/0.9). Idle wander: gx = w×(0.5 + 0.36·sin(clock×0.37)), gy = h×(0.5 + 0.22·sin(clock×0.61 + 0.9)); follow time-constant tau 0.12 s while hovering, 0.6 s idle. Layers: tone = #808080 at `mix-blend-mode: saturation`, shade = black at opacity 0.55, optional tint layer at `mix-blend-mode: color`.
6. Optional outline pass renders a second SVG of stroked per-glyph `<text>` (no fill) above everything.

### Exact parameters (Measured — the 29 props ARE the parameter set)
Defaults: text "Designed in the details", tag h2, mediaType "image", src "", poster "", **fillScale 1.25, parallax 26, drift 18**, hoverZoom 0, brightness 1, saturation 1, grayscale false, tint "", spotlight false, **spotlightRadius 160**, outline false, outlineColor "", outlineWidth 1, **reveal "rise", duration 1.1, stagger 0.09**, trigger "view", align "center", weight 700, tracking −0.03, lineHeight 1.06, **textScale 0.115**.
Reveals: **rise** = glyphs from y = 1.15em, power4.out, delay = wordIndex × stagger · **scale** = from y 0.1em + scale 0, expo.out, delay = i × stagger × 0.35 · **blur** = x-offset 0.22 + layer blur 0.3em→0 + opacity, duration ×1.2, expo.out/power2.out · **wipe** = clipPath inset(0% 100% 0% 0%)→0, power3.inOut · **fade** = layer opacity 0 + scale 1.08, power3.out.
Triggers: "view" = IntersectionObserver threshold 0.25, plays once; "hover" = pointerenter.

### Reduced motion (Measured — L2's "VERIFIED" confirmed in source)
Under reduced motion the reveal is forced straight to the settled state, a media video is paused, and the rAF loop stops with offsets zeroed.

### Rebuild notes
Framework-free rebuild is straightforward: the mechanism is measurement + SVG clipPath + GSAP; a vanilla-JS version is ~250 lines. In single-HTML + GSAP terms this is one of the cheapest "wow" headings in the bank: no video needed (a CSS gradient or a static image as media still reads premium), total added weight ≈ GSAP core only. WP+Elementor: survives as an HTML widget; the heading must be real text in the DOM (it is — SEO/a11y safe, the visible layer is aria-hidden decoration). Phone cost: per-glyph SVG text nodes are trivial; the rAF loop is IO-gated; avoid video media on mobile (poster image instead).

### Library-ready parameter set
fillScale 1.25 · parallax 26 · drift 18 (sin .21 / cos .17×.6) · smooth dt/0.18, zoom dt/0.35 · textScale 0.115, clamp 20–200px · rise: y 1.15em, power4.out, 1.1s, stagger .09/word · spotlight: radius 160, smootherstep u³(u(6u−15)+10), tau .12 hover / .6 idle · glyph cy = baseline − .36×fontPx.

---

## Q98 · Silo — https://www.silosilosilo.com/ (silosilosilo.com)

- **Stack (Measured from the page's own script tags):** Webflow (site 67b34e4928a0b575614410f4) + **GSAP 3.12.2 + ScrollTrigger** (cdnjs) + **Lenis 1.2.3** (jsDelivr) + **Swiper 8** + jQuery 3.5.1. The entire commerce/scroll logic is hand-written **inline scripts** in the 184 KB HTML (extracted to `code-source/98-silo/inline-*.js`): a 12,355 B attribution block, a 30,864 B scroll engine, a 40,737 B cart/UI block. Cross-host bundles not fetched (discipline); every value below is from the site's own inline source.
- **What it is:** a one-page shop for a modular stacking storage product. Three material columns (Aluminum 6061-T6, Brass C360, Titanium = waitlist) sit side by side; each column's product stack **explodes apart as you scroll**, each piece becomes buyable, and a sticky bar carries a running total into a Shopify checkout. This is the bank's closest analogue to a quote-builder: variant configuration → live total → checkout, with no page change.

### Mechanism step-by-step — the explode engine
1. **Two Lenis instances.** Page Lenis (default options) plus a second Lenis on the `.mat-cols` grid (`wrapper/content = matCols, overscroll: true`). A `prevent` handoff decides who owns the wheel: the page owns it until the shop fills the screen; on desktop (≥992px, `MAT_DESKTOP = '(min-width: 992px)'`) with the grid aligned and not at its edge, the grid owns it; at either end the event passes back to the page. A momentum clamp parks the page exactly at the shop on approach (`lenis.scrollTo(gridDocY)`) so the grid never starts mid-explode.
2. **Input speed limiting** via Lenis `virtualScroll`: wheel deltas capped at **MAX_WHEEL_DELTA = 100**, and target lead capped (~⅓ screen) so the explode cannot be flicked open.
3. **Paused timelines, proxy-driven.** Each `[data-explode]` section gets a paused GSAP timeline + a ScrollTrigger that only *reports* progress (scroller = the grid element on desktop). `driveExplodes()` tweens a proxy `{p}` toward the reported progress and applies `tl.progress(p)` — replacing scrub with asymmetric easing: **opening** duration = max(OPEN_LAG 0.35, |Δp| / OPEN_RATE 1), ease power2.out; **closing** duration 0.6, ease expo.out. All three columns share the max progress so they open together.
4. **Magnetic close + directional snap.** Closing within `CLOSE_MAGNET 0.3` of shut snaps the target to 0. ScrollTrigger snap (desktop, one owner): if direction < 0 and p < expandEnd × 0.3 → 0; if direction > 0 and p past `OFFER_GONE 0.35` of the expand run → finish opening; snap duration {min 0.2, max 0.45}, delay 0.2, ease power1.inOut — the surface never parks half-open.
5. **Run geometry:** EXPAND_RUN 1 + OPEN_HOLD 1.15 → T = 2.15 timeline units; mobile travel = 1.54 × screen × T (frame grows to fit the open stack; ST start offset by the sticky header height `--head-h` ≈ 95px, end = exactly when the frame unsticks). Piece controls stay pointer-dead until the pieces part (five stacked hit-targets problem).

### Mechanism step-by-step — the cart (CartManager)
1. **One number, one source.** Every stepper on the page (piece, stack, insert) reads/writes the product's `.section_cart` row (`sf-product="<id>"`, `[data-show-quantity]`, `[data-change-quantity-inc/dec]`); CartManager totals those rows and builds checkout from the same rows. Displayed prices are *derived* from `CartManager.config.prices` (a FALLBACK_PRICES map exists only until CartManager loads) — the code comments state the rule explicitly after a past overcharge bug: change Shopify first, then match here, never the reverse.
2. **Bundle collapse.** `sets` defines each stack as 5 pieces; `collapseCart()` folds a complete piece set into the single stack variant (aluminum stack $100 vs $145 parts sum ≈ 31% bundle discount; brass stack $299 vs $445 ≈ 33%), and the bar, thumbnails and permalink all read that one collapsed result.
3. **Checkout = Shopify cart permalink:** `https://checkout.silosilosilo.com/cart/<variantId>:<qty>,...` built from the collapsed list, merged with attribution params (UTM + Meta click id captured from the landing URL in the separate 12 KB inline block, so attribution survives the cross-host hop).
4. Non-purchasable material (Titanium) falls back to `data-offer-price="$1,000"` + `data-offer-tag="Waitlist"` + a mailto offer link.

### Exact parameters (Measured)
- **Prices:** aluminum — Cap $9, 15 $19, 30 $29, 60 $39, 90 $49, inserts $19, Stack $100 · brass — Cap $29, 15 $59, 30 $89, 60 $119, 90 $149, Stack $299 · titanium — $1,000 waitlist.
- **Explode constants:** MAX_WHEEL_DELTA 100 · OPEN_LAG 0.35 · OPEN_RATE 1 · CLOSE_MAGNET 0.3 · OFFER_GONE 0.35 · EXPAND_RUN 1 · OPEN_HOLD 1.15 · snap {0.2–0.45s, delay 0.2, power1.inOut} · closing 0.6s expo.out · desktop breakpoint 992px.
- Sticky UI: cart bar height published as `--bar-h` so columns size to `calc(100vh − var(--bar-h))`; Swiper 8 used only as a responsive component factory (`createResponsiveSwiper`, mobile ≤991px vs desktop modes).

### Reduced motion (Measured absence)
No `prefers-reduced-motion` handling anywhere in the inline source — a real gap in an otherwise meticulous codebase; any rebuild should freeze the explode at the open state under reduced motion.

### Rebuild notes
The transferable pattern for service sites is the **CartManager discipline**, not the product: one state object keyed by option id with price + fulfilment id, every control writing to it, the displayed total *derived* from it, and the final CTA URL built from the same collapsed state (for a roofer: a quote-builder whose "checkout" is a prefilled enquiry/booking link). The explode engine ports to single-HTML + GSAP directly (paused timeline + proxy tween ≈ 60 lines); the dual-Lenis handoff is only needed when the configurator is its own scroll surface. WP+Elementor: the pattern survives (Webflow here is just the shell — the logic is framework-free JS + data attributes), but budget real dev time; this is the heaviest entry in the batch. Phone cost: native touch scroll is uncappable at input, so the OPEN_RATE ceiling does the work — copy that, not the wheel cap.

### Library-ready parameter set
Explode: run 1 + hold 1.15 · open max(0.35, Δp/1) power2.out · close 0.6 expo.out · magnet 0.3 · offer-gone 0.35 · snap 0.2–0.45 power1.inOut delay 0.2 · wheel cap 100. Cart: single config map {id: price, variant} · 5-piece set → bundle variant at ~31–33% off parts sum · permalink CTA built from collapsed state + attribution params.

---

## Q101 · Daniel Triendl — https://danieltriendl.com

- **Stack (Measured):** Next.js (React) on Vercel, images from Sanity CDN; GSAP + ScrollTrigger bundled in the shared `_app` chunk (506 KB of the 1.3 MB / 15-asset pass in `code-source/101-daniel-triendl/`); external CSS is only ~4 KB — styling is CSS-in-JS. Type: **Rza** (display serif) + **UniversalSans** 425/625.
- **What it is (Seen at L2/first contact):** illustrator/designer portfolio — a tagged project grid where each project shows its slide count, Explore/Index-style browsing modes, a "Selected clients" strip (Adobe • Airbnb • Meta • Google • Monocle Magazine • Washington Post), and a plain "Let's work together / Say Hi!" close with phone number on the page.

### Mechanism step-by-step
1. Server-rendered Next.js pages; the project grid is React state (tag filtering / view mode) with layout in CSS-in-JS — there is no scroll-jacking and no WebGL; motion is concentrated in the **navigation overlay choreography** in the shared chunk.
2. Menu/route transition (Measured from `_app`): list items animate `autoAlpha: 0 → 1, y: → 0` with **stagger 0.05, duration 0.6, ease "circ.out"**, played at timeline position 0.75 on the way in; the reverse pass sends items to `autoAlpha: 0, y: −30` with the same stagger/duration/ease at position 0.45. ScrollTrigger is registered (8 config hits across chunks) but the homepage page-chunk (19,774 B) contains almost no animation code of its own — the system is chrome-level, not per-section.
3. Project entries carry their media count in the grid itself (slide counts as visible metadata), so the grid doubles as an index — browsing is filtering, not page loads.

### Exact parameters (Measured)
Nav items: stagger .05 · duration .6 · circ.out · in at tl position .75 / out at .45, out y −30 · fonts Rza + UniversalSans-425/625 · total JS 1.2 MB combined (Next.js framework 130 KB + app 506 KB dominate — the *pattern* costs almost nothing; the framework does).

### Reduced motion (Measured absence)
No `prefers-reduced-motion` in the mined JS/CSS. The design's restraint (short fades, no parallax) keeps the risk low, but nothing is gated.

### Rebuild notes
Steal the **IA, not the stack**: tagged grid + visible per-project counts + clients strip + direct contact close is a complete small-portfolio system that rebuilds in a single HTML file with zero framework (filter = ~30 lines of JS + the nav stagger values above). WP+Elementor: fully survivable — the grid is a loop grid with taxonomy filters; the nav choreography needs one custom overlay menu. Phone cost of the *pattern*: negligible; do not import the 1.2 MB framework weight to get it.

### Library-ready parameter set
Nav/list reveal: {autoAlpha 0→1, y 24→0 (inferred offset), stagger .05, .6s, circ.out} · exit {autoAlpha→0, y→−30, stagger .05, .6s, circ.out} · portfolio grid: tag filter + per-item media count shown · proof strip: client names as text, not logos.

---

## Q106 · Design Embraced (Anthony Goodwin) — https://designembraced.com

- **Stack (Measured):** custom component framework (decorator-registered components, e.g. `@A("image-webgl")`) + **anime.js** timelines + a **hand-rolled WebGL engine** (no three.js — own shader pipeline, clip-space helpers, image planes with segment geometry). Two same-host assets only: index.js 150,577 B + index.css 36,357 B (`code-source/106-design-embraced/`). A Codrops case study documents the build (tympanus.net/codrops/2024/03/21/case-study-design-embraced-portfolio-2024/ — article-stated: WebGL plane-bending home slider, deliberate keyboard-navigation accessibility work, Awwwards SOTD 18 Mar 2024).
- **What it is (Seen):** freelance designer portfolio — minimal text surface ("Available For Freelance", services: Web Design / UI UX / Branding / Typeface Design / Motion Design); the homepage slider's images are WebGL planes that bend in 3D as they travel.

### Mechanism step-by-step — the bent plane
1. Each slider image becomes a segmented WebGL plane sized in clip space from its DOM element (`getPlaneSize()` = clipSpaceW/H of the element's box; uniforms imageSize/planeSize kept in sync per frame in `beforeRender`).
2. The vertex shader bends the plane cylindrically — `bentPlane(coords, planeSize, radius, mixAmount, rotation)`: `angle = −planeSize.y × 1.5 + y × (−π)`; `bentCoords.y = sin(angle) × radius − planeSize.y × 0.5`; `bentCoords.z = cos(angle) × radius`; result mixed against the flat coords by mixAmount and rotated (180° × rotation) around the plane centre. A full simplex-noise (snoise, Ashima) implementation is compiled into the same shader for displacement/ripple.
3. Vertex uniforms (Measured, full list): time, scaleProgress, ripple, fadeOut, fadeOutDir, progress, curviness, transition, planeSize, planeCenter, imageSize, mousePos, screenSize, backFace, scrolling, bendMult. Fragment side receives fragDisplacement + occlusion varyings.
4. **Page/case transitions are anime.js timelines over the uniforms** (Measured sequence): user-initiated change fires ripple 0→1, **800ms easeOutQuart**; uniforms transition→1 and curviness→0, **800ms easeOutSine at offset −0.6**; fadeOut value→0 at offset −1; scaleProgress→1, **900ms easeInOutExpo at offset −0.7**; offsetScale + offsetPosition tweens **1000ms easeInOutExpo at offset −1** (interaction unlocked on complete); UI toggles at offset −0.85; incoming components' onEnter replays added at offset −0.9. On complete, offsetScale is zeroed and components re-lock.
5. Duration census across the bundle (Measured): 1500ms ×12 (the default UI beat), 1800 ×4, 800 ×3, plus 2100/1600/1300/1200/900/500/300/150 singles; anime stagger offsets {offset: .05} and {offset: .02}. IntersectionObserver (×4 hits) drives component enter/leave lifecycles (`isInEntry()`, onEnter/onLeave with lock semantics).

### Exact parameters (Measured)
Bend: angle = −1.5·planeSize.y − π·y; y' = sin(angle)·radius − 0.5·planeSize.y; z' = cos(angle)·radius. Transition chain: ripple 800 easeOutQuart · transition/curviness 800 easeOutSine @−0.6 · scaleProgress 900 easeInOutExpo @−0.7 · offsets 1000 easeInOutExpo @−1 · UI @−0.85 · enter @−0.9. Base UI duration 1500ms.

### Reduced motion (Measured absence)
No `prefers-reduced-motion` in JS or CSS. The Codrops case study (article-stated) documents keyboard-navigation accessibility work, but motion reduction is not gated in the shipped bundle — note as a rebuild requirement, not a criticism of the pattern.

### Rebuild notes
The bend itself is ~15 lines of GLSL — portable to a single HTML file with raw WebGL or a micro-library; do NOT import the whole custom engine. In GSAP terms: drive the same uniforms (progress/curviness/transition) with a GSAP timeline using identical durations/eases/offsets (anime offsets map to GSAP position parameters). WP+Elementor: survivable only as a self-contained canvas section (hero slider) — keep it out of Elementor's DOM transforms. Phone cost: the full bundle is 150 KB JS for one effect system; a scoped rebuild (one plane shader + GSAP core) lands ≈ 45 KB. On low-power phones cap plane segments (Inferred: 32×32 is ample for this bend radius) and pause rendering off-screen.

### Library-ready parameter set
Bent-plane vertex core: angle = −1.5h − πy · y' = sin·r − h/2 · z' = cos·r, mix by curviness · transition: ripple 800 easeOutQuart → curviness→0 800 easeOutSine → scale 900 easeInOutExpo → offset 1000 easeInOutExpo (overlaps −0.6/−0.7/−1) · UI beat 1500ms · stagger offsets .05/.02.

---

## Q107 · Anton & Irene — https://antonandirene.com

- **Stack (Measured):** Nuxt (Vue + Vuex store; CSS shipped inside JS chunks via css-loader — 5 same-host chunks, 532 KB total in `code-source/107-anton-irene/`), **anime.js** bundled (1510b3e.js chunk), Google Tag Manager the only third-party script. Current build differs from the older site L2 described — the Press-carousel detail from L2 appears to belong to a previous version; the current IA is what is documented here.
- **What it is (Seen):** studio site — "Studio for research & design", animated stat counters, a 9-item services list, Partnerships (Bose, Apple, Cactus, Netflix, Kickstarter, Metalabel), an awards wall, and a shop/book feature (Accessible Design Reference & Specification Book, "Coming Fall 2026").

### Mechanism step-by-step
1. Motion is deliberately small: CSS transitions on components, dominated by **transform .3s ease** (also background .3s ease, width .4s ease, one transform .4s ease-in-out, one 1s transition, and an easeOutCirc cubic-bezier(.075,.82,.165,1) used twice — Measured census from the main chunk).
2. **Reduced motion is a first-class app state, not a media-query sprinkle:** a Vuex flag `state.reduceMotion` is referenced **27 times** in the main chunk (Measured). It gates: the hero background video (rendered only when `!reduceMotion`, else nothing), the menu-circle hide-on-scroll transform (forced `translateY(0)` instead of `translateY(-100px)`), and status/indicator animations (forced static: opacity 1, left 0, watchers early-return). One `prefers-reduced-motion` match exists in the shipped code to seed the flag (Measured).
3. anime.js is present for component animation duties (its timeline/autoplay internals are the "autoplay" hits in the chunk census — library internals, not a content carousel config; L2-recorded press autoplay behaviour could not be re-verified in this build and is treated as superseded).

### Exact parameters (Measured)
Transitions: transform .3s ease (dominant) · .4s ease-in-out · opacity 300ms ease-in + transform .3s ease (paired) · cubic-bezier(.075,.82,.165,1) ×2 · menu hide translateY(−100px) · chunks 524 KB JS total.

### Reduced motion (Measured — the entry's headline)
Store-level flag with 27 call sites: video suppressed, scroll-hide suppressed, animated indicators pinned to final state. This is the most systematic reduced-motion architecture in the batch — steal the pattern: one flag, checked at render time in every animated component, seeded from the media query.

### Rebuild notes
Nothing here needs a framework to copy: the transferable assets are (a) the restrained transition scale (.3s ease default, .4s for larger moves, easeOutCirc for emphasis) and (b) the reduceMotion flag pattern, which in vanilla terms is one `matchMedia` listener + a `data-motion="reduced"` attribute on `<html>` that CSS and JS both read. WP+Elementor: the pattern survives trivially; the IA (stats counters, services list, partnerships, awards wall, product feature) is standard sections. Phone cost: zero added weight — this is the anti-Q106: proof carried by content architecture, not by an engine.

### Library-ready parameter set
Transition scale: .3s ease default · .4s ease-in-out large · opacity 300ms ease-in · emphasis cubic-bezier(.075,.82,.165,1) · reduced-motion: single global flag; video off, hide-on-scroll off, indicators pinned · IA: counters → services (numbered) → partnerships → awards → product.

---

## Q108 · Bureau Cool — https://bureau.cool

- **Stack (Measured):** **SvelteKit**, server-rendered (the 156 KB HTML carries the full SSR data payload inline, including the updates feed). Miner caveat: the standard pass found 0 same-host JS because SvelteKit boots via an inline `import()` of `./_app/immutable/entry/...`; entry + node chunks were hand-fetched same-host and saved into `code-source/108-bureau-cool/assets/` (app-entry.js 9,113 B; node12.js; node3.js 841,889 B — the homepage node bundles its shared chunks). Only third-party script: the studio's own analytics subdomain (tracking.bureau.cool — not fetched).
- **What it is (Seen, matches L2):** Berlin studio (founder Ben Wegscheider). One long page, three registers: **Selected work** (8 projects, video previews — a dedicated video-hls CSS asset ships with the build), **Archive** (the full tagged project list), **Information** (Services / Clients / Jobs / Features) — the Features list is a dated feed of external mentions, and the SSR payload opens with a recent-updates stream ("/0000 new items" style entries): the studio's own activity rendered as content.

### Mechanism step-by-step
1. SSR first: content, lists and the feed arrive in HTML; hydration adds interaction. Navigation is node-based (SvelteKit routes [0, 3, 12] for the homepage) with component transitions in the compiled node chunk: durations **200 / 300 / 400 / 800 / 1500ms** and delay 400 recur (Measured census; easings are aliased imports in the compiled output and are not honestly nameable — reported as unmeasured rather than guessed).
2. CSS system (Measured from app.DzrQ5PKN.css 37,325 B + 2 small sheets): easing vocabulary = cubic-bezier(.4, 0, .2, 1) ×2 (Material standard), cubic-bezier(0, 0, .2, 1), cubic-bezier(.19, 1, .22, 1) (expo-out); keyframes **blink** and **moveleftright** (a lateral marquee/shuttle); backdrop-filter ×4, mix-blend-mode ×1, will-change ×2 — a restrained, mostly-CSS motion layer under the Svelte transitions.
3. Work previews are video-led (HLS asset set) rather than GIF/image swaps (Inferred from the dedicated video-hls stylesheet + 79 "video" references in the boot payload).

### Exact parameters (Measured)
CSS easings: (.4,0,.2,1) · (0,0,.2,1) · (.19,1,.22,1) · keyframes: blink, moveleftright · Svelte transition durations: 200/300/400/800/1500, delay 400 · CSS weight 40 KB total · SSR HTML 156 KB (data-inclusive).

### Reduced motion (Measured absence)
No `prefers-reduced-motion` in the shipped CSS. (JS chunks were not exhaustively grepped for it; reported as absent in CSS only.)

### Rebuild notes
Steal the **information architecture**: Selected (8, video-led) → Archive (everything, tagged) → Information (services/clients/jobs) → live dated Features feed. The feed is the differentiator — a studio that publishes its own mentions/activity as a dated stream manufactures freshness proof without a blog. In single-HTML terms the whole page is static lists + hover video; the SvelteKit weight (842 KB node) is framework, not pattern. WP+Elementor: fully survivable — three list sections + a manually dated feed list; hover-play HLS/MP4 previews via a few lines of JS. Phone cost of the pattern: near zero if previews lazy-load on intersection and stay muted/looped short clips.

### Library-ready parameter set
IA: 8 selected (video) / full archive (tagged) / info (services·clients·jobs) / dated features feed · easings (.4,0,.2,1) standard + (.19,1,.22,1) expo · transition beats 200/300/400/800/1500, delay 400 · keyframes blink + lateral marquee.

---

## Batch tally

- **Completed: 8/8** (Q93, Q94, Q95, Q98, Q101, Q106, Q107, Q108) — every entry mined from deployed source (bundles, registry source, or inline scripts), not from rendered impressions.
- **Blocked: 0.** No entry needed the blocker rule; no permission cards appeared on any route.
- **Integrity events (logged, resolved):** script bug (b) 404-stub refetches on Q93/Q94 (`.real` files in slug dirs); Q108 SvelteKit chunks hand-fetched after the miner's 0-JS pass; Q98's mechanism recovered from inline scripts after its values-raw came back near-empty by platform design (cross-host bundles deliberately not fetched — versions measured from script tags instead).
- **Honesty flags carried in-entry:** Q94 ships no reduced-motion rules; Q98 and Q106 likewise (measured absences). Q101's grid internals are React state — described at architecture level, labelled. Q107's L2-era Press carousel could not be re-verified in the current Nuxt build and is recorded as superseded. Q108's compiled easing names are reported unmeasured rather than guessed.
- **Richest parameter sets:** Q98 Silo (dual-Lenis explode engine constants + full price/variant map + permalink checkout construction), Q95 Masked Heading (complete 29-prop set + glyph-mask maths + five reveal recipes), Q93 Elastic Grid (four lag formulas + velocity-squash thresholds over one ScrollSmoother scaffold). Q106's bent-plane shader + anime transition chain is a close fourth.

# DEEP READS — SLICE 2, PART 4 (queue 114–128; 8 entries)

Batch 4 of the Slice-2 deep reads. Method per entry: first contact via browser text-fetch of the live page (Codrops article + demo, CodePen pen page, live site), then `code-source/fetch_and_mine.sh` source pass (same host only), then hand-mining of the mechanism. Two known script bugs fired repeatedly and are logged per slug in `values-raw.txt` integrity notes: (a) shared-/tmp leak on 0-asset slugs, (b) relative asset refs resolving against origin → 1,441-byte 404 stubs (hand-refetched from the demo directory, same host, wherever noted). Values are labelled **Measured** (read from deployed source), **Article-stated** (printed in the Codrops tutorial), or **Inferred**.

---

## Q114 · Jean-Christophe Suzanne — https://jcsuzanne.com/

**Live URL resolution (4 routes logged):** (1) two web searches — no result; (2) Wayback CDX over siteinspire.com/websites/* → detail page found (`/websites/4424-jean-christophe-suzanne`, listed 12 Mar 2014); (3) current Siteinspire detail page (browser fetch renders, outbound link not exposed in text; curl gets a JS app shell); (4) Wayback snapshot of the detail page (2014-03-14) → Visit link = `http://www.jcsuzanne.com/`. Live site confirmed at apex with www→apex redirect.

**Stack (Measured):** WordPress, custom theme `blueprint` (Tailwind utility classes `tw-*` in markup, Laravel-Mix-style hashed builds). Homepage = one 104 KB HTML document + `front.js` 301,181 B + `styles.css` 47,528 B (hand-fetched; the miner missed it — the `<link>` uses single quotes). JS bundle contains GSAP (60 refs) + ScrollTrigger (16) + SplitText (10) + Lenis (4 `Lenis` / 6 `lenis`). No CSS @keyframes (0) and no `prefers-reduced-motion` (0) in styles.css — all motion is JS-driven.

**Mechanism step-by-step (the portable structure):**
1. **Dated, categorised work index as the entire homepage body.** ~39 project rows (2014–2025 in the current build), each row = year + client domain, linking straight out to the client site. No case-study subpages needed for the pattern: the list itself is the portfolio, sorted newest-first, with a few rows carrying thumbnail images/GIFs.
2. **Identity block after the list:** one-line positioning ("JCS® is the showcase of Jean-Christophe Suzanne, full-stack developer of tailored experiences"), bio paragraph, then three plain lists — Stack / Capabilities / Accolades (Siteinspire ×34, Awwwards SOTD ×25, SOTM ×2, FWA ×7 — counts as proof, no logos needed).
3. **Giant contact marquee as the footer CTA:** a single `.js-marquee` element rendering the obfuscated email `jc[DOT]suzanne[AT]gmail[DOT]com` at 60 px, scaling to **272 px** on large screens (`lg:tw-text-[272px]`), white → brand colour on hover (300 ms ease-out-cubic colour transition in CSS classes), click target via `data-href`. The marquee is a JS component (`init({selector:"js-marquee"})` in the bundle); exact loop internals are not legible in the minified build (**Inferred:** GSAP xPercent loop, the standard pattern for this stack).
4. **Motion system:** Lenis smooth scroll + GSAP/ScrollTrigger reveals; SplitText applied to intro paragraphs (`type:"words"`, words wrapped in overflow-hidden spans — masked line/word reveals).

**Exact parameters (Measured from front.js):** ease histogram — `quint.out` ×9 (dominant), `quint.inOut` ×3, `cubic.inOut` ×2, `quart.inOut` ×1, `power4`, `expo`, `none` ×1 each; durations — 1 s ×5, 1.5 s ×4, 0.7/0.6 ×2, 0.8/0.5/0.4 ×1; stagger 0.1 ×6, 0.03 ×2. Marquee type size 60 px → 272 px (≥lg). Lenis present but its init options are not legible in the minified bundle (labelled honestly, not guessed).

**Rebuild notes:** Single-HTML terms: a `<ul>` of year+name rows (pure HTML, zero JS needed for the core), one marquee strip = duplicated span + GSAP `xPercent:-50, repeat:-1, ease:"none"` loop, or CSS `@keyframes translateX(-50%)` — cheaper than the original. WP+Elementor survival: **excellent** — the work list is a Repeater/Posts widget, the marquee is one HTML widget; nothing here needs the 301 KB bundle (that weight is the whole theme, not this page pattern). Phone cost: the pattern itself is near-zero JS; the list is tap-friendly rows. Steal the *structure*, not the bundle.

**Library-ready parameter sets:** reveal defaults {ease quint.out, duration 1–1.5, stagger 0.1 / 0.03}; giant-type CTA sizing {60 px mobile → 272 px desktop, hover colour swap 300 ms ease-out-cubic}; proof-by-count accolade list format.

---

## Q120 · Raffael Stüken — https://raffaelstueken.de/

**Live URL resolution (4 routes logged):** (1) two web searches — no result; (2) Wayback CDX → detail page `/websites/2399-raffael-stuken` (listed 2013); (3) current Siteinspire page (shell only via curl); (4) Wayback snapshot (2013-01-07) → Visit link = `raffaelstueken.de`.

**Stack (Measured):** Eleventy static build (his own colophon; hashed assets `main.<hash>.css/js`). Homepage HTML 93,726 B + `main.css` 73,692 B + **`main.js` 1,441 B** (content verified as the site's own logic — the colophon's "less than two kilobytes of JavaScript" claim checks out). Type: Rhymes Text Regular. Analytics = Plausible (third-party, not fetched). Miner note: first pass hit a Cloudflare 526 on the www host and mined the error page — invalid pass, replaced by this hand pass on the apex host (integrity note in values-raw).

**Mechanism step-by-step:**
1. **Semantic one-pager, numbered sections:** Splash ("This is for You. / This ( not ) …") → `Profile / Selected Works` (bio + client list: Bugatti, David Chipperfield Architects, Dinamo, Nomos Glashütte, Mykita…) → `Recognition / Awards` (Red Dot ×3, Awwwards SOTD ×9/SOTM, FWA SOTD, 100 Beste Plakate… + press list) → `Colophon` (Objective / Approach / version history v1 2005–06 → v4 2023–, type credit). Scroll-driven feel comes from CSS: grid + `position: sticky` (1 use) + `mask-image` reveals — **no scroll library at all**.
2. **Flash masks:** images/sections are revealed through `mask-image: linear-gradient(to bottom, transparent, #000 var(--flash-fade), #000 calc(100% - var(--flash-fade)), transparent)` with `--flash-fade: 4rem` (10 rem variant) — soft top/bottom fade as content passes.
3. **Entrance animations (CSS only):** `@keyframes to-transform / to-fade / from-to-transform / pulse`; standard timing `0.6s cubic-bezier(.55,.08,.21,.92) both`, fade variant delayed `0.2s`; pulse uses `var(--animation-timing)`.
4. **The entire JS (1,441 B, three behaviours):** (a) image zoom — click on `.js-zoom-img` toggles `.is-zoomed` on the parent, sets `<source>` sizes to `100vw`, toggles `body.has-zoom-img`; (b) **time-on-page counter** — `setInterval(1000)`, renders `` `${seconds} s` `` into `.js-time-spent`; (c) progressive-reading boxes — `.js-continue-box` click un-hides the next `aria-hidden="true"` paragraph, after **300 ms** marks the previous one `.is-read`, button label flips Continue→Repeat and resets on restart (an accessible, honest implementation — state lives in ARIA attributes, not just classes).
5. **Reduced motion:** `prefers-reduced-motion` present ×1 in CSS (with `scroll-behavior: auto !important` in the same block) — the only entry in this batch whose own code handles it explicitly.

**Exact parameters (Measured):** JS total 1,441 B; interval 1,000 ms; reveal delay 300 ms; animation 0.6 s / cubic-bezier(0.55, 0.08, 0.21, 0.92) / fade delay 0.2 s; --flash-fade 4 rem / 10 rem; splash + grid view toggles are CSS/anchor state (no JS cost).

**Rebuild notes:** This is the batch's phone-cost champion: the whole interaction layer is <2 KB JS + CSS. Single-HTML: copy directly (semantic sections + the three JS behaviours are ~60 lines). WP+Elementor survival: structure maps 1:1 to sections; the mask-fade and entrance keyframes drop into a child-theme stylesheet; the continue-box pattern needs the small JS snippet in an HTML widget. Zero WebGL, zero libraries — the anti-bloat reference for portfolio/service one-pagers.

**Library-ready parameter sets:** entrance set {0.6 s, cubic-bezier(.55,.08,.21,.92), fade +0.2 s delay}; flash-mask {linear-gradient mask, --flash-fade 4 rem/10 rem}; time-on-page counter {1 s interval, "`N s`" format}; continue-box {300 ms read-mark delay, ARIA-driven state}.

---

## Q122 · Animated Opening Type (Codrops, 2013) — article http://tympanus.net/codrops/2013/11/14/animated-opening-type/ · demo http://tympanus.net/Tutorials/AnimatedOpeningType/

**Stack (Measured):** Pure CSS3 — no JavaScript in the effect (demo ships only normalize.css 1,825 B, demo.css 2,024 B, component.css 6,507 B, modernizr.custom.js 8,496 B as a feature-test shim). Grid of 36 letters.

**Mechanism step-by-step:**
1. Markup: `<ul class="grid"><li class="ot-letter-{left|top|right|bottom}"><span data-letter="C">C</span></li>…` — the direction class lives on the `<li>`, the glyph is duplicated via `content: attr(data-letter)`.
2. Three stacked layers per letter: the base `<span>` (dark "cut-out" glyph, `color: hsla(0,0%,0%,.6)`, `transform-style: preserve-3d`, **`perspective: 550px`** on the span itself), `:before` = shadow layer (flat dark, `hsla(0,0%,0%,.12)`, text-shadow:none), `:after` = the "peel" layer (coloured like the tile background so it reads as the tile's own flap).
3. Both pseudos are absolutely positioned over the glyph with `transition: all .3s`.
4. Per direction, set `transform-origin` on the **opposite** side of the opening (the hinge), tilt the peel slightly at rest (15°), pre-distort the shadow (scale/skew), then on `:hover` swing the peel to 40° and stretch/skew the shadow to match the implied light.
5. The cut-out illusion: the base span carries an inset-style text-shadow stack `1px 4px 6px <tile colour>, 0 0 0 hsla(0,0%,0%,.3), 1px 4px 6px <tile colour>`; on hover the peel's colour lightens (light source opposite the hinge).

**Exact parameters (Measured from component.css — all four directions; article printed left + bottom only):**

| Direction | transform-origin | Peel rest → hover | Shadow rest → hover |
|---|---|---|---|
| left | `0 50%` | rotateY(-15deg) → rotateY(-40deg) | scale(1.08,1) skew(0,1deg) → scale(0.85,1) skew(0,20deg) |
| right | `100% 50%` | rotateY(15deg) → rotateY(40deg) | scale(0.85,1) skew(0,1deg) → scale(0.85,1) skew(0,-20deg) |
| bottom | `50% 0` | rotateX(15deg) → translateY(0.045em) rotateX(40deg) | scale(1,1.05) skew(4deg,0) → translateY(-0.035em) scale(1,1.2) skew(10deg,0) |
| top | `50% 100%` | rotateX(-15deg) → rotateX(-40deg) | → translateY(-0.050em) scale(1,0.55) skew(-10deg,0) |

Shared: transition `all .3s` (no easing function — default ease); peel edge highlight text-shadow `±1px 0 0 hsla(360,100%,100%,.1), 3px 0 1px hsla(0,0%,0%,.4)` (axis-swapped per direction); demo tiles = red shade family (left #e74d3c → hover peel #ea6253; top #ee7f72 → #f09389; bottom #e95949; right #ea6657 → #ed7a6e); grid cells `calc(100%/6)` wide, letters `font-size: 12em`, cell max-height 290 px. Reduced motion: none (2013 demo — add `@media (prefers-reduced-motion)` gating the transition when rebuilding).

**Rebuild notes:** Trivially portable: one span + two pseudos per letter, ~15 lines of CSS per direction. Single-HTML: direct copy. WP+Elementor: works in a heading widget with custom CSS per letter span (tedious for whole words — generate spans with a 5-line JS or server-side loop). Phone: hover doesn't exist — trigger the open state on `:active`/tap or via IntersectionObserver class for touch; keep letters ≥44 px tap targets. Cost: 0 JS, ~1 KB CSS per direction set. Still the cheapest "3D type" effect in the bank.

**Library-ready parameter sets:** peel set {perspective 550px, rest 15°, open 40°, .3s}; shadow formulas per direction (table above); cut-out text-shadow stack formula.

---

## Q123 · [WebGL] Refraction cursor over video (CodePen, jhnsnc) — https://codepen.io/jhnsnc/pen/ByoEmoq

**Stack (Measured from the pen's own panes, extracted from the pen page HTML into `code-source/123-refraction-cursor/pen-source.*`):** regl (single fullscreen triangle), one fragment shader, hidden `<video>` element as texture source (oceans.mp4 from a CDN — the pen's demo asset; not fetched, shader-side only). No build step; `PIXEL_DENSITY = 2` scales the canvas buffer (author's comment: power of 2, ≤2).

**Mechanism step-by-step:**
1. **Geometry:** one oversized triangle, positions `[-2,0],[0,-2],[2,2]`, count 3; vertex shader maps `uv = position` and flips Y (`gl_Position = vec4(2uv.x-1, 1-2uv.y, 0, 1)`).
2. **Video texture:** `regl.texture(elVideo)`, re-uploaded every frame via `videoTexture.subimage(elVideo)` inside `regl.frame`. Startup is gated: poll `readyState >= HAVE_FUTURE_DATA` every **300 ms**, up to **50 attempts**, then fall back to a click-to-start button.
3. **Contain-fit video lookup with glow falloff:** `videoLookup()` remaps screen UV to video UV with `max(1, ratio)` terms (CSS-`contain` math), then builds a "glow alpha" from two `smoothstep(1 - VIDEO_GLOW_AMOUNT, 1, …)` falloffs minus `VIDEO_GLOW_DIM` outside the frame, and mixes black→texture by it — the video appears to bleed light past its own edges.
4. **Faux refraction (the core trick):** the cursor is an elongated capsule SDF — `sdgSegment(p, mouse ± vec2(0.5·MOUSE_WIDTH·MOUSE_SIZE, 0), MOUSE_SIZE)` returning distance + gradient + along-segment h. Displacement = `normalize(mouse - p) * expImpulse(-d/MOUSE_EDGE, k=4, cut=0.175)` (the commented-out alternative `k=8, cut=0.085` is the "sharper glass" variant). Sample UV = `uv + displacement * MOUSE_DISPLACEMENT_DIST`. No derivatives, no normal maps — an impulse-shaped falloff fakes the lens.
5. **Specular edge:** base glass colour `vec3(.4)` at alpha 0.15; highlight mixed in only on the SDF's outer edge band (`smoothstep(-0.002,0,d) - smoothstep(0,0.002,d)`) × `|dot(gradient, normalize(vec2(0.5)-p))|` × intensity 5.0 — a fake light at screen centre. Author's comments list what's NOT done: no fresnel, no blur, no tinting.
6. **In-shader progress bar:** segment SDF between x 0.1–0.9 at y 0.85, thickness 0.004; fill length = `videoProgress` uniform (`currentTime/duration`); fill colour = IQ cos-palette `0.5 + 0.5·cos(TAU·(t + (0, .33, .67)))` animated by time; the whole bar is drawn in distorted space so the lens bends it too. Click handling mirrors the shader constants in JS: click within |y−0.85| < 0.05 seeks (`lstep(0.1, 0.9, x)`), click within |y−0.5| < 0.25 toggles play/pause.
7. **Mouse:** raw `mousemove` → `mouseLoc` in 0–1 units, **no lerping/smoothing** (the glass tracks 1:1; all softness comes from the impulse falloff). Starts at [-1,-1] (off-screen).

**Exact parameters (Measured, `#define`s):** VIDEO_GLOW_AMOUNT 1.5 · VIDEO_GLOW_DIM 0.8 · MOUSE_SIZE 0.042 · MOUSE_WIDTH 0.8 · MOUSE_EDGE 0.02 · MOUSE_DISPLACEMENT_DIST 0.03 · MOUSE_BASE_ALBEDO vec3(.4) · MOUSE_BASE_ALPHA 0.15 · MOUSE_SPECULAR_INTENSITY 5.0 · progress bar L 0.1 / R 0.9 / Y 0.85 / thickness 0.004 · expImpulse k=4, cut=0.175 (alt k=8, cut=0.085) · videoResolution hardcoded [960, 400] · PIXEL_DENSITY 2 · startup poll 300 ms × 50.

**Rebuild notes:** The pattern ports to any fullscreen-quad setup (Three.js ShaderMaterial or raw WebGL); regl is incidental. Single-HTML: ~150 lines total (shader included verbatim). WP+Elementor: feasible as a hero background widget, but be honest about phone cost: a fullscreen fragment shader sampling a video texture at devicePixelRatio 2 is a battery/GPU load no trade homepage should carry as decoration — use at DPR 1, pause when off-screen/`prefers-reduced-motion`, and never autoplay-with-sound. The transferable kernel for production is the *impulse-displacement lens over an image* (swap video texture for a static image = cheap product-photo magnifier).

**Library-ready parameter sets:** faux-refraction lens {capsule SDF r 0.042, width factor 0.8, edge 0.02, expImpulse k4/cut .175, displacement 0.03}; specular edge band {±0.002 smoothstep, intensity 5}; glow-contain video fit {glow 1.5, dim 0.8}.

---

## Q125 · Building a Mouse-Following Square Lens Effect with Three.js and GLSL (Codrops, Tomoyuki Nakata / baqemono) — article https://tympanus.net/codrops/2026/08/25/building-a-mouse-following-square-lens-effect-with-three-js-and-glsl/ · demo https://tympanus.net/Tutorials/PointerSquareLensDistortion

**Stack (Measured):** Three.js + TypeScript classes (Stage / Mesh / Webgl), Vite/Astro-built demo (deployed bundle 538,912 B incl. Three.js). One fullscreen 1×1 plane, camera z set by `calcViewportDistance = height / (2·tan(fov·π/360))` so the plane exactly fills the view. **No render targets, no post-processing** — everything happens in one fragment shader. Textures arrive via `data-texture1-path` / `data-texture2-path` attributes.

**Mechanism step-by-step:**
1. **Cover-fit both images:** `getCoverUv()` — CSS `background-size: cover` math in GLSL (per-axis `min(meshRatio/textureRatio, 1)` recentring) applied independently to the colour (inside) and grayscale (outside) textures so different aspect ratios still align.
2. **Square coordinate system:** `uvSquare = v_uv*2 - 1`, then divide by `squareAspectScale = (min(h/w,1), min(w/h,1))` so the mask stays square at any viewport, then subtract `u_mouse` so the whole system is centred on the (eased) pointer.
3. **Hard square mask:** four `step()` tests multiplied — `step(left,x)·(1-step(right,x))·step(bottom,y)·(1-step(top,y))` with bounds = ±`u_squareSize` (the uniform is the **half**-side). Final colour = `mix(outsideColor, insideColor, squareMask)` — deliberately aliased, graphic edge.
4. **CC Lens distortion (inside only):** local square UV `squareUv = uvSquare/(2·halfSize) + 0.5`; `getCCLensUv` computes `radius2 = dot(centered, centered)` (aspect-corrected), scale = `1 + distortion·radius2` for distortion ≥ 0 else `1/(1 - distortion·radius2)`, and returns `uv - offset` (inverse mapping — sample pulled inward = bulge). The square-local offset is converted back to viewport UV by `× squareHalfSize × squareAspectScale` and added to `v_uv` **before** the cover-fit — so lens and base image stay registered.
5. **Radial RGB shift:** direction `(squareUv - 0.5)*2` (0 at centre → ±1 at edges); three separate texture fetches offset by `direction × u_rgbShift{R,G,B}`; defaults R +0.01 / G 0 / B −0.01 (Measured in article + bundle).
6. **Outside-image life:** grayscale UV gets `sin(uv.y·waveFrequency + time·waveSpeed)·waveStrength` on Y, plus `random3(vec3(uv·randomFrequency, time·randomSpeed)).x · randomStrength` (Nikita Miropolskiy's sin-hash random, Shadertoy XsX3zB). `u_time = performance.now() * 0.001`.
7. **Pointer follow:** DOM → NDC conversion `(x/w)*2-1, -(y/h)*2+1`; per frame `mouseEase.lerp(mouse, pointerEase)` with **pointerEase 0.1** (Measured; matches L2's "pointer ease 0.1") — frame-rate-dependent lerp, ~10% per frame.
8. **lil-gui panel** (folders Square / RGB Shift / Wave / Random / Pointer) writes straight into uniforms via `setShaderParams` — the article's parameter table below is the GUI definition.

**Exact parameters — defaults, article-stated AND verified in the deployed bundle (`squareSize:.4, lensDistortion:1.5, rgbShiftR:.01, rgbShiftG:0, rgbShiftB:-.01, waveFrequency:10, waveStrength:.01, waveSpeed:1, randomFrequency:1, randomStrength:.02, randomSpeed:.2, pointerEase:.1`):** note the one divergence — **deployed squareSize = 0.4**, tutorial-text default = 0.3. GUI ranges: squareSize 0–5 step .01 · lensDistortion −5–5 step .01 · RGB shifts −0.05–0.05 step .001 · waveFrequency 0–200 step 1 · waveStrength 0–0.1 step .001 · waveSpeed 0–5 step .01 · randomFrequency 0.1–20 step .1 · randomStrength 0–0.1 · randomSpeed 0–2 · pointerEase 0.01–1.

**Rebuild notes:** Single-HTML + Three.js: the fragment shader is ~120 lines and self-contained (cover-UV + mask + CC-lens + shift + wave/random chunks compose in that order). WP+Elementor: canvas widget in a hero; two same-size images (colour + pre-desaturated copy) required. Phone honesty: pointer doesn't exist on touch — the demo has no touch fallback for the lens position (square would sit at last mouse / centre); add deviceorientation or a slow auto-path on touch, cap DPR at 1.5–2, and the fullscreen pass over two texture fetches ×3 (RGB split) is fine on modern phones but pointless while scrolling — pause off-screen. Reduced motion: none in the demo; gate the wave/random terms and ease the square to centre under `prefers-reduced-motion`.

**Library-ready parameter sets:** lens kit {squareSize .4 (half-side, −1..1 space), lensDistortion 1.5, RGB radial .01/0/−.01, pointerEase .1}; ambient distortion {wave 10 / .01 / 1, random 1 / .02 / .2}; CC-lens scale formula (both sign branches).

---

## Q126 · Building an Endless Procedural Snake with Three.js and WebGL (Codrops, Sujen Phea) — article https://tympanus.net/codrops/2026/02/10/building-an-endless-procedural-snake-with-three-js-and-webgl/ · demo https://tympanus.net/Tutorials/WebGLSnakeAnimation/

**Stack (Measured):** Three.js (deployed bundle: three-CMX0TrVy.js 511,201 B + app index-YiNGd7Fr.js 36,543 B + CSS 2,997 B). Architecture = three decoupled systems: `CurveGenerator` (steering → cubic Bézier segments), `EndlessCurve` (sliding-window path manager + parallel-transport frame cache), GPU body renderer (instanced octahedra + 2 DataTextures, spine sampled per frame on CPU).

**Mechanism step-by-step:**
1. **Steering blend (per new segment):** compute desired direction from forces — **Seek** (if `dist > orbitRadius × 1.5`, head straight at target); **Orbit** (tangent = perpendicular on XZ `(-targetDir.z, 0, targetDir.x)`; `radialStrength = (dist − orbitRadius) × 0.1`; desired = tangent + targetDir × radialStrength, normalised); **Coil** (add vertical derivative term `coilY = coilAmplitude × coilFrequency × cos(coilFrequency × orbitAngle) × coilActivation` to the tangent while orbiting); **Wander** (2D-noise force; only the *delta* from the last direction is blended in, at low `wanderWeight`, parameterised by wanderStrength/tiltStrength).
2. **Turn-rate limiter:** if angle(current, desired) > maxTurnRate, rotate current toward desired by exactly maxTurnRate around the cross-product axis (degenerate angle < 0.001 rad skipped). This single constraint is what makes the motion read as animal rather than mechanical.
3. **Segment construction:** endpoint = lastPoint + newDir × length; control-point distance adapts to turn sharpness — `turnFactor = min(1, turnAngle / (π/2))`, `controlDist = length × (0.33 + 0.34 × turnFactor)`; cp1 along old dir, cp2 back along new dir → G1-continuous `CubicBezierCurve3`. Segments are **4–8 units** long (article-stated).
4. **Sliding window:** every frame `distance += delta × speed`; `configureStartEnd` generates ahead (`fillLength`) and trims behind (`removeCurvesBefore`), remapping the body to local u ∈ [0,1] (`uStart`, `uLength`); a global `distanceOffset` hides the trimming from the rest of the system.
5. **Parallel-transport frames:** normals are propagated, not projected — rotate the previous normal by the quaternion/axis-angle aligning prev→new tangent (early-out at dot > 0.9999), re-orthogonalise, normalise. Frames are cached at fixed samples per segment; lookups lerp between cached normals (samples are dense enough that slerp is unnecessary).
6. **GPU upload per frame:** `texturePoints` samples of the spine → two RGBA float DataTextures: position (xyz, 1.0) and normal (encoded `n×0.5+0.5`, decoded `×2−1` in shader).
7. **Body from instances:** each scale = one flattened `OctahedronGeometry` instance; the vertex shader rebuilds the TBN frame from the textures, places the ring at spineU, applies the **radius profile**, elliptical cross-section, twist and belly offset (below), so the CPU never touches geometry.
8. **Shading:** FBM spot pattern (uniform set below), normal perturbation, anisotropic specular, fresnel rim, belly lightening via `cos(vTheta)`, shadow compression `diffuse × 0.6 + 0.4`.

**Exact parameters (Measured from the deployed bundle unless noted):** orbitRadius 8 · maxTurnRate π/6 per segment (a GUI-facing variant shows 1.15) · coilAmplitude 3 · coilFrequency 0.25 · wanderStrength π/24 (GUI max π/12) · tiltStrength π/48 (GUI max π/24) · radial correction gain 0.1 · seek threshold 1.5 × orbitRadius · controlDist = length × (0.33 + 0.34 × turnFactor) · speed default 2 (presets 4 / 16 seen in config variants) · texturePoints 100 (presets 50 / 75) · radialSegments 8 (preset 6) · **radius profile (spineU): 0 → 0.74 ramp up (tail), 0.74–0.85 full thickness (body), 0.85–0.95 pinch (neck), 0.95–1.0 bulge + close (head)** · headRadius uniform 0.75 · cross-section ellipse vertical:horizontal = **0.5 : 0.8** (article-stated; shader `radiusNormal = scale × u_radiusN`, `radiusBinormal = scale × u_radiusB`) · belly offset u_zOffset = 0.2 · twist u_twistAmount = 3 (radians over the full spine) · instance scale X/Y/Z = 0.5 / 0.43 / 0.1 · spots: scale 5, threshold 0.6, smoothness 0.1, intensity 0.8, octaves 2, persistence 0.5, lacunarity 2 · specular power 27, intensity 0.5 · fresnel power 3.5, intensity 0.3 · normal perturb scale 20, strength 0.05, octaves 4 · anisotropic strength 0.35, roughness 0.5 · belly width 0.5, belly lightness 1 · light direction (0.5, 1, 0.3) normalised.

**Rebuild notes:** This is a study piece, not a homepage pattern — but its three subsystems separate cleanly. The steering→Bézier→sliding-window curve engine (~200 lines, no rendering) is the reusable asset for any "creature/trail follows the pointer" job; cap segment length 4–8 and texturePoints ≤100. Phone honesty: 511 KB of Three.js + per-frame CPU spine sampling + texture re-upload is desktop-demo weight; on mobile use texturePoints 50, radialSegments 6, and DPR 1. WP+Elementor: embed as a standalone canvas section only; do not attempt to Elementor-native any of it. Reduced motion: none in the demo — the correct fallback is a static curved pose (freeze `distance`).

**Library-ready parameter sets:** steering kit {orbit 8, seek ×1.5, radial gain 0.1, turn cap π/6, coil 3 × 0.25, wander π/24 / tilt π/48}; Bézier handle rule {0.33 + 0.34 × turnFactor}; radius-profile landmarks {0 / .74 / .85 / .95 / 1}; scale-material uniform set (above).

---

## Q127 · Creating an Infinite Circular Gallery using WebGL with OGL and GLSL Shaders (Codrops, based on Lions Good News 2020 by SHIFTBRAIN) — article https://tympanus.net/codrops/2021/02/23/creating-an-infinite-circular-gallery-using-webgl-with-ogl-and-glsl-shaders/ · demo http://tympanus.net/Tutorials/InfiniteCircularGallery/

**Stack (Measured):** OGL (minimal WebGL) + Webpack bundle — deployed demo `main.js` 223,963 B + `main.js`-companion CSS 2,284 B (hand-refetched; script copies were stubs). Key constants verified **in the deployed bundle** (`ease:.05`, `widthTotal`, `uSpeed`, `/1500` all present — article and demo agree). 12 images, duplicated to 24 medias for wide-screen headroom. Titles rendered *inside* WebGL via MSDF fonts (freight.otf → msdf-bmfont, 1024×1024 atlas, `-d 4`).

**Mechanism step-by-step:**
1. **Pixel↔world calibration:** camera fov 45, z = 20; viewport world size derived as `height = 2·tan(fov/2)·z`, `width = height × aspect` — after this, 1 world unit maps predictably to screen space and planes can be sized in "pixels".
2. **Plane sizing:** shared `Plane` geometry (widthSegments 100, heightSegments 50 — dense enough to bend). Per media: `scaleFactor = screen.height / 1500`; `plane.scale.x = viewport.width × (700 × scaleFactor) / screen.width`, `scale.y` likewise with **900** — i.e. every card is a 700×900 "design pixel" rectangle rescaled to the actual screen.
3. **Cover-fit in the fragment shader:** ratio = min per axis of (plane aspect / image aspect), UV recentred — the same cover math as Q125, here per-plane.
4. **Layout:** `padding = 2`; `width = scale.x + padding`; `widthTotal = width × length`; base `x = width × index`.
5. **Scroll model:** one state object `{ease: 0.05, current, target, last}`. Wheel: `NormalizeWheel` pixelY × **0.005** added to target. Drag: `(startX − x) × 0.01` added to (target at dragstart). Per frame `current = lerp(current, target, 0.05)`; direction = sign(current − last); each plane `position.x = x − current × 0.1 − extra`.
6. **Infinite wrap:** per plane, `isBefore = pos.x + scale.x/2 < −viewport.width`, `isAfter = pos.x − scale.x/2 > viewport.width` (note: full viewport width, not half — planes travel a full screen past the edge before wrapping); moving right + isBefore → `extra −= widthTotal`; left + isAfter → `extra += widthTotal`.
7. **The circle:** `rotation.z = map(pos.x, −widthTotal, widthTotal, π, −π)` and `position.y = cos((pos.x / widthTotal) × π) × 75 − 75` — cards dip 75 world units at the extremes and sit at 0 in the centre, each rotated tangent-ish to the implied arc.
8. **Snap:** on release/debounced wheel (**lodash debounce 200 ms**), `itemIndex = round(|target| / width)`, target snapped to `width × itemIndex` (sign preserved).
9. **Paper bend (vertex shader):** uniforms uTime (increment **0.04/frame** per media) + uSpeed; `p.z = sin(p.x × 4 + uTime) × 1.5 + cos(p.y × 2 + uTime) × 1.5`.
10. **MSDF titles:** OGL `Text` with letterSpacing −0.05, size 0.08, wordSpacing 0; title mesh parented under its plane at `y = −plane.scale.y × 0.5 − 0.085`; fragment does the standard MSDF median-of-3 decode (`max(min(r,g), min(max(r,g), b)) − 0.5`, `fwidth` AA, discard < 0.02), colour #545050; WebGL2 gets `#version 300 es` shimmed shaders. A `Number` class repeats the trick for the current index.
11. **Background blocks:** 50 flat planes (colour #c4c3b6), scale (1.6, 0.9) × random(0.75, 1), each with own `speed = random(0.75, 1)` parallax factor, same wrap logic, plus constant upward drift `position.y += 0.05 × speed` with wrap — cheap depth.

**Exact parameters (Measured/article-stated, cross-verified):** fov 45 · camera z 20 · clear colour (0.796, 0.792, 0.741) · plane design size 700×900 at reference height 1500 · padding 2 · scroll ease 0.05 · scroll→world factor 0.1 · wheel gain 0.005 · drag gain 0.01 · arc depth 75 · rotation map [−widthTotal, widthTotal] → [π, −π] · snap debounce 200 ms · bend z = sin(4x + t)·1.5 + cos(2y + t)·1.5 · uTime step 0.04 · MSDF size 0.08, letterSpacing −0.05, title offset −0.085 below plane · background: 50 blocks, drift 0.05 × speed.

**Rebuild notes:** The gallery core (steps 1–8) is ~150 lines with OGL or ~200 with Three.js; the MSDF title system is the heavy optional extra (font atlas generation is a build step — for production, DOM titles positioned over the canvas are cheaper and accessible; the article itself argues WebGL text avoids DOM reflow, true but rarely worth it on a service site). Phone honesty: L2 logged user comments reporting mobile breakage — the drag path uses the same 0.01 gain for touch, wheel-centric tuning, and 24 planes × 100×50-segment geometry is overspecced for phones; halve segments (the bend needs ~50×25), texturePoints-style economies apply. Reduced motion: none; a static row fallback is the honest reduced-motion state. WP+Elementor: canvas section embed only.

**Library-ready parameter sets:** circular-gallery set {ease .05, gains wheel .005 / drag .01 / world .1, arc 75, rotation π→−π across widthTotal, snap 200 ms debounce}; plane sizing rule {700×900 @1500 reference height}; paper-bend vertex line {sin(4x+t)·1.5 + cos(2y+t)·1.5, t += .04}.

---

## Q128 · Creative WebGL Image Transitions (Codrops, Yuriy Artyukh / akella) — article https://tympanus.net/codrops/2019/11/05/creative-webgl-image-transitions/ · demos https://tympanus.net/Development/webGLImageTransitions/ (index.html … index8.html)

**Stack (Measured):** Three.js fullscreen plane + a reusable `Sketch` class (sketch.js 5,933 B) shared by all 8 demos; per-demo files (644 B – 7,168 B) supply only uniforms + a fragment shader. Libs as deployed: three.js 592,593 B, GSAP 116,228 B (TimelineMax era), dat-gui 50,278 B. All 8 demo variants were hand-refetched and mined (script pass had stubbed them — integrity note in values-raw).

**Mechanism step-by-step (the shared engine):**
1. Textures preload via Promise.all; container size read from `#slider` element; camera fov is **computed to fit a 1-unit plane**: `fov = 2·atan(height/(2·dist))` in radians→degrees with dist = camera.z = 2, plane scaled (aspect, 1).
2. Cover-fit: `resolution` vec4 = (w, h, a1, a2) where the a-pair is the standard cover correction from image aspect; every shader starts `newUV = (vUv − .5) × resolution.zw + .5`.
3. Base uniforms for every demo: time, progress, border, intensity, scaleX 40, scaleY 40, transition 40, swipe, width, radius, texture1, texture2, displacement (disp1.jpg), resolution. Per-demo `uniforms` override the ones its shader actually uses; with `debug: true`, dat.GUI sliders are auto-built from each uniform's min/max.
4. Transition driver: click → `next()` (guarded by isRunning) → GSAP `TimelineMax.to(progress, duration = 1, {value: 1, ease: Power2.easeInOut})` (easing configurable, default 'easeInOut'); on complete, texture1 := texture2, progress := 0. Render loop advances `time += 0.05` per frame.
5. **The article's core lesson (Measured in article code):** every effect is just a remapping of the sample UV by a function of `progress ∈ [0,1]` — fade = `mix(t1, t2, progress)`; stretch = `texture(texture, uv − uv·vec2(1,0)·progress·0.5)`; signature = `texture(uTextureOne, uv − fract(uv × vec2(5., 0.)) × progress × 0.1)` (repeat the stretch 5× across X).

**Exact parameters — per-demo fragment math (Measured from deployed demo files):**
- **Demo 1 — noise-mask wipe:** displacement sampled at (uv.x·scaleX 40, uv.y·scaleY 40) + classic Perlin `cnoise` realnoise; `dt = parabola(progress, 1)`; mask = smoothstep over `vUv.x + mix(−w/2, 1−w/2, progress)` with w = width(0.5)·dt, mask += mask·realnoise, final = smoothstep(border, border+0.01, mask); mix by final.
- **Demo 2 — diagonal zoom crossfade:** `x = smoothstep(0,1, progress·2 + p.y − 1)`; t1 sampled at `(p−.5)(1−x)+.5`, t2 at `(p−.5)x+.5`, mix by x (one image zooms in as the other zooms out, diagonal front).
- **Demo 3 — circle grow:** radius 0.9, width 0.35; `prog = progress·0.66 + noise.g·0.04` (displacement texture scrolled by time·0.04 via fract); `circ = 1 − smoothstep(−width, 0, radius·distance(centre·aspect, uv·aspect) − prog·(1+width))`; both textures counter-scaled by intpl = |circ|.
- **Demo 4 — pow-wipe:** `prog = progress·0.8 − 0.05 + noise.g·0.06` (mirrored-repeat displacement, time·0.04); `intpl = pow(|smoothstep(0,1, prog·2 − vUv.x + 0.5)|, 10)`; same counter-scale sampling.
- **Demo 5 — luminance shift:** displacement = mean RGB of each image itself (×0.33); t1 shifted +Y by `progress × displace2 × intensity(0.3)`, t2 by `(1−progress) × displace1 × intensity`; plain mix by progress.
- **Demo 6 — rotated displacement:** dispVec = displacement.rg; t1 offset `rot(angle1) · dispVec × intensity(1) × progress`, t2 by `(1−progress)`, angles = the shared ±45° pair (angle1 = π·0.25, angle2 = −π·0.75 as defined in demo7's family block).
- **Demo 7 — "planetary" (the article's demo-7 link):** `uvDivided = fract(newUV × vec2(intensity, 1))` with **intensity default 50 (GUI 1–100)**; both images displaced along rotate(π/4) by `uvDivided × progress × 0.1` in opposite phase (`(1−progress)` for t2); mix by progress. This is the deployed generalisation of the article's `fract(uv × vec2(5,0)) × 0.1` signature — same 0.1 displacement factor, strip count promoted to a uniform.
- **Demo 8 — noisy vertical split:** hash noise `hnoise(newUV × resolution / 100)`; direction d = (0, normalize(centre − uv).y); uv1 += d × progress/5 × (1 + hn/2), uv2 −= d × (1−progress)/5 × (1 + hn/2); mix by progress. Intensity uniform present (50) but the shader's divisor is the literal 5.0.

Shared engine values: duration 1 s · ease Power2.easeInOut · time step 0.05/frame · clear colour 0xeeeeee · pixelRatio = devicePixelRatio (uncapped).

**Rebuild notes:** The most production-adjacent entry in this batch (L2's call, confirmed): the Sketch engine + any one fragment = a complete before/after or gallery transition in ~250 lines of single-HTML (Three.js from CDN, or port the shader to a 20-line raw-WebGL quad — the shaders use only texture2D/uniforms). For trade sites, demo 7's strip-displacement and demo 3's circle-grow are the two worth shipping (hero image crossfades, before/after reveals); keep duration 1 s / Power2.easeInOut. WP+Elementor: one canvas widget + image list in a data attribute — survives fine. Phone cost: one fullscreen pass, 2–3 texture fetches — cheap; but cap DPR (the demo doesn't) and pause when off-screen. Reduced motion: none — fall back to the plain `mix` fade (progress tween only) under `prefers-reduced-motion`.

**Library-ready parameter sets:** transition engine {duration 1, Power2.easeInOut, time += .05}; signature strip transition {fract(uv × vec2(N,1)), displacement 0.1, rotate 45°}; circle-grow {radius .9, width .35, prog scale .66 + noise .04}; luminance shift {intensity .3}.

---

## BATCH 4 TALLY

**Completed: 8/8 · Blocked: 0.**

Routes/blocks worth noting: Q114 + Q120 live URLs were unrecoverable from search and the current (JS-shell) Siteinspire pages — resolved via Wayback snapshots of the Siteinspire detail pages (4 routes each, logged in-entry). Q123's direct pen-source endpoints were Cloudflare-blocked via curl; the pen's full source was extracted instead from the code embedded in the pen page itself (same host). fetch_and_mine bug (b) fired on 5 of 8 entries (all Codrops demos) and bug (a)'s preconditions on Q120/Q123 — every case caught, hand-refetched or hand-mined, and documented in the per-slug `values-raw.txt` integrity notes. Richest parameter sets: **Q126** (full steering + radius-profile + scale-material uniform system), **Q128** (all 8 transition shaders with exact constants on one shared engine), **Q127** (complete circular-gallery constant set, verified against the deployed bundle).

