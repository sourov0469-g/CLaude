# G8: GSAP, scroll storytelling, SVG, WebGL and variant-picker skills (working notes for Rembrandt v5)

Source: WEB-SKILLS_2.md, read with the Read tool by line range. Library treated as reading material only: nothing installed, registered, saved or run. Values below are copied from the skills; anything I add from outside a skill is marked "(outside the skill)".

---

## S0181 gsap-core

- Methods: `gsap.to(targets, vars)`, `gsap.from()` (entrances, end = current state), `gsap.fromTo(targets, fromVars, toVars)` (no reading of current values), `gsap.set()` (duration 0). camelCase props (`backgroundColor`, `rotationX`).
- Common vars: `duration` default `0.5`; `delay`; `ease` default `"power1.out"`; `stagger: 0.1` or `{ amount: 0.3, from: "center" }`, `{ each: 0.1, from: "random" }`; `from` accepts `"random" | "start" | "center" | "end" | "edges" | index`.
- `overwrite`: `false` (default), `true` (kill all active tweens of same targets now), `"auto"` (on first render kill only overlapping properties of other active tweens).
- `repeat` (`-1` infinite), `yoyo`, `onStart/onUpdate/onComplete` (scoped to the animation).
- `immediateRender`: default `true` for from()/fromTo(). When several from()/fromTo() tweens hit the same property of the same element, set `immediateRender: false` on the later ones.
- Transform aliases (prefer over raw `transform`); applied order: translation, scale, rotationX/Y, skew, rotation. `x, y, z` (px), `xPercent, yPercent` (work on SVG), `scale, scaleX, scaleY`, `rotation` (deg or `"1.25rad"`), `rotationX/Y`, `skewX/Y`, `transformOrigin: "left top"`.
- Relative values `"+=20"`, `"-=30"`, `"*=2"`, `"/=2"`.
- `autoAlpha` over `opacity`: at 0 it also sets `visibility: hidden` (no pointer events); non-zero sets `inherit`.
- CSS variables tween: `"--hue": 180`.
- `svgOrigin: "250 100"` (SVG global space, no %); never together with `transformOrigin`.
- Directional rotation suffixes `_short`, `_cw`, `_ccw`: `rotation: "-170_short"`, `rotationX: "+=30_cw"`.
- `clearProps: "visibility"` or `"all"`/`true`; clearing any transform part clears the whole transform.
- Eases: `none`, `power1..4` (`.in/.out/.inOut`; base = out), `back`, `bounce`, `circ`, `elastic`, `expo`, `sine`. Examples `"power3.inOut"`, `"back.out(1.7)"`, `"elastic.out(1, 0.3)"`.
- CustomEase: `CustomEase.create("my-ease", ".17,.67,.83,.67")` (cubic-bezier string) or SVG path data `"M0,0 C0,0 0.056,0.442 ..."`.
- Control: `tween.pause() / play() / reverse() / kill() / progress(0.5) / time(0.2) / totalTime(1.5)`; store the return value.
- Function values: `x: (i, target, targetsArray) => i * 50` run once per target on first render.
- `gsap.defaults({ duration: 0.6, ease: "power2.out" })`.
- matchMedia (3.11+): runs setup only while the query matches; on unmatch, every animation and ScrollTrigger made in that run is reverted automatically.
  ```js
  let mm = gsap.matchMedia();
  mm.add({
    isDesktop: "(min-width: 800px)",
    isMobile: "(max-width: 799px)",
    reduceMotion: "(prefers-reduced-motion: reduce)"
  }, (context) => {
    const { isDesktop, reduceMotion } = context.conditions;
    gsap.to(".box", { rotation: isDesktop ? 360 : 180, duration: reduceMotion ? 0 : 2 });
    return () => { /* optional custom cleanup */ };
  }, scopeEl);   // 3rd arg scopes selector text to that root
  mm.revert();   // revert all
  ```
  - "Do not nest gsap.context() inside matchMedia": matchMedia makes a context internally; use `mm.revert()` only.
  - `gsap.matchMediaRefresh()` re-runs all matching handlers immediately (for example after toggling an in-page reduced-motion control).
- Do not: animate `width/height/top/left` when transforms can do it; use invalid ease names; forget that from() applies its start values immediately.

## S0187 gsap-timeline

- `gsap.timeline()`; children append by default.
- Position parameter (3rd arg): absolute `1`; `"+=0.5"` (gap after end), `"-=0.2"` (overlap); label `"intro"`, `"intro+=0.3"`; `"<"` start of previous, `">"` end of previous (default), `"<0.2"` 0.2s after previous start.
- `gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } })`; options `paused: true`, `repeat`, `yoyo`, `onComplete/onStart/onUpdate`.
- Labels: `tl.addLabel("intro", 0)`, `tl.play("outro")`, `tl.tweenFromTo("intro", "outro")` (pauses timeline, returns a linear playhead tween).
- Nesting: `master.add(child, 0)`.
- Playback: `play/pause/reverse/restart/time(2)/progress(0.5)/kill()` (kill also kills children by default).
- Rules: prefer timelines over chained `delay`; timeline "duration" comes from its children; ScrollTrigger only on the timeline or a top-level tween, never on a child tween and never nest ScrollTriggered animations in a parent timeline.
- Verbatim examples: `tl.to(".a", { x: 100 }, 0); tl.to(".b", { y: 50 }, "+=0.5"); tl.to(".c", { opacity: 0 }, "<"); tl.to(".d", { scale: 2 }, "<0.2");`.
- Wrong vs right: `gsap.timeline().to(".a", { scrollTrigger: {...} })` is wrong; `gsap.timeline({ scrollTrigger: {...} }).to(".a", { x: 100 })` is right (S0186).
- Use for Rembrandt: one timeline per scene with `addLabel()` per beat ("scene labels" are also what `snap: "labels"` snaps to), defaults set on the constructor, and the scene's ScrollTrigger on that timeline only. The hero intro is one master timeline so the seek harness (S0403) can freeze it.

## S0186 gsap-scrolltrigger

- `gsap.registerPlugin(ScrollTrigger)` once.
- start/end format `"triggerPos viewportPos"`: `"top top"`, `"center center"`, `"bottom 80%"`, number `500` (absolute px), `"+=300"`, `"+=100%"` (scroller height), `"max"`; v3.12+ `start: "clamp(top bottom)"`, `end: "clamp(bottom top)"`; a function is allowed (re-evaluated on refresh).
- Defaults: start `"top bottom"` (or `"top top"` with `pin: true`), end `"bottom top"`, toggleActions `"play none none none"`.
- Config: `trigger`, `endTrigger`, `scrub` (`true` direct, number = catch-up seconds), `toggleActions` (onEnter, onLeave, onEnterBack, onLeaveBack; values play/pause/resume/reset/restart/complete/reverse/none), `pin` (true/selector/element; "Don't animate the pinned element itself; animate children"), `pinSpacing` (`true` default, `false`, `"margin"`), `horizontal`, `scroller`, `markers` (dev only), `once`, `id` (`ScrollTrigger.getById(id)`), `refreshPriority`, `toggleClass` (`{ targets: ".x", className: "active" }`), `snap` (`0.25`, array, `"labels"`, `{ snapTo: 0.25, duration: 0.3, delay: 0.1, ease: "power1.inOut" }`), `containerAnimation`.
- Callbacks: `onEnter/onLeave/onEnterBack/onLeaveBack` (receive instance: `progress`, `direction`, `isActive`, `getVelocity()`), `onUpdate`, `onToggle`, `onRefresh`, `onScrubComplete`.
- Standalone: `ScrollTrigger.create({ trigger: "#id", start: "top top", end: "bottom 50%+=100px", onUpdate: self => self.progress })`.
- `ScrollTrigger.batch(".card", { interval: 0.1, batchMax: 4, onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, overwrite: true }), onLeaveBack: batch => gsap.set(batch, { opacity: 0, y: 50, overwrite: true }) })`. Callbacks get `(targets, scrollTriggers)`. Do not pass `trigger`, `animation`, `invalidateOnRefresh`, `onSnapComplete`, `onScrubComplete`, `scrub`, `snap`, `toggleActions`. `batchMax` may be a function (runs on refresh).
- `scrollerProxy` is for third-party scrollers that move content; options `scrollTop(value)`, `getBoundingClientRect`, `scrollWidth/Height`, `fixedMarkers`, `pinType: "fixed" | "transform"`; must call `scrollbar.addListener(ScrollTrigger.update)`. (S0403: NOT used with Lenis.)
- Pin recipe: `{ trigger: ".section", start: "top top", end: "+=1000", pin: true, scrub: 1 }`.
- Timeline + ST: `gsap.timeline({ scrollTrigger: { trigger: ".container", start: "top top", end: "+=2000", scrub: 1, pin: true } })`.
- Fake horizontal (containerAnimation): horizontal tween MUST use `ease: "none"`; pin a wrapper (`pin: scrollingEl.parentNode`), not the moving element; nested triggers use `containerAnimation: scrollTween, start: "left center"`; pinning and snapping are not available on containerAnimation triggers. Note: the skill's sample `xPercent: () => Max.max(0, window.innerWidth - scrollingEl.offsetWidth)` is a typo (`Max`) and feeds pixels to `xPercent`; use `x: () => -(el.scrollWidth - innerWidth)` with `invalidateOnRefresh: true` (my correction).
- Refresh: `ScrollTrigger.refresh()` after DOM/layout/font/image changes; auto on resize, debounced 200ms. Refresh runs in creation order or by `refreshPriority`; create top-to-bottom. The skill says "Lower = refreshed first ... first on page = lower number"; the official GSAP docs (outside the skill, from memory) say a higher refreshPriority refreshes earlier. Verify with markers before relying on either.
- Cleanup: `ScrollTrigger.getAll().forEach(t => t.kill())`, `ScrollTrigger.getById("my-id")?.kill()`; or gsap.context/useGSAP revert.
- Never use `scrub` and `toggleActions` on the same trigger (scrub wins). No markers in production.

## S0184 gsap-plugins

- All plugins free (incl. SplitText, MorphSVG) since the Webflow acquisition; no Club token, no private registry. Register every plugin once with `gsap.registerPlugin(...)` before first use.
- ScrollToPlugin: `gsap.to(window, { duration: 1, scrollTo: { y: "#section", offsetY: 50 } })`; `x/y` number or `"max"`. ScrollSmoother needs `#smooth-wrapper > #smooth-content` (not needed: we use Lenis).
- Flip: `const state = Flip.getState(".item"); /* change DOM */ Flip.from(state, { duration: 0.5, ease: "power2.inOut" })`. Options `absolute` (default false), `nested`, `scale` (default true), `simple`.
- Draggable (`type: "x" | "y" | "x,y" | "rotation" | "scroll"`, `bounds`, `inertia`, `edgeResistance` 0 to 1) and InertiaPlugin (`InertiaPlugin.track(".box","x")`, `inertia: { x: "auto" }`). Not in our listed bundle.
- Observer: `Observer.create({ target, onUp, onDown, onLeft, onRight, tolerance: 10, type: "touch,pointer" | "wheel" })`.
- SplitText: `SplitText.create(target, vars)`; instance has `chars`, `words`, `lines`, `masks`; `revert()` or let context revert it.
  - `type` default `"chars,words,lines"`; split only what you animate.
  - `charsClass/wordsClass/linesClass` (`"line++"` gives line1, line2).
  - `aria`: `"auto"` (default; aria-label on parent, aria-hidden on pieces), `"hidden"`, `"none"`.
  - `autoSplit: true` re-splits on font load or width change; animations MUST be created in `onSplit(self)` and returned for auto cleanup and progress sync (3.13.0+):
    ```js
    SplitText.create(".split", { type: "lines", autoSplit: true,
      onSplit(self) { return gsap.from(self.lines, { y: 100, opacity: 0, stagger: 0.05, duration: 0.5 }); } });
    ```
  - `mask: "lines" | "words" | "chars"` wraps units in `overflow: clip` wrappers; `tag` default `"div"` (`"span"` inline, transforms may not render); `deepSlice` (default true), `ignore: "sup"`, `smartWrap` (chars only), `wordDelimiter`, `prepareText`, `propIndex` (`--word: 1`), `reduceWhiteSpace` (default true), `onRevert`.
  - Tips: split after fonts (`document.fonts.ready.then(...)`) or use autoSplit; `font-kerning: none; text-rendering: optimizeSpeed;` for chars; avoid `text-wrap: balance`; no SVG `<text>`.
- ScrambleText: `scrambleText: { text: "New message", chars: "01", revealDelay: 0.5 }`.
- DrawSVG: value is the visible segment: `drawSVG: 0`, `"0% 100%"`, `"20% 80%"`; stroke must exist; `DrawSVGPlugin.getLength(el)`.
- MorphSVG: `morphSVG: "#lightning"` or `{ shape, type: "rotational", map: "size"|"position"|"complexity", shapeIndex (or "log"), origin, precision: 2, precompile }`; `MorphSVGPlugin.convertToPath("circle, rect, ellipse, line")`. `smooth` and `curveMode` are v3.14+, so NOT available on our 3.13.
- MotionPath: `motionPath: { path: "#path", align: "#path", alignOrigin: [0.5, 0.5], autoRotate, curviness: 0 to 2 }`.
- CustomEase, EasePack, CustomWiggle, CustomBounce, Physics2D (`velocity: 250, angle: 80, gravity: 500`), PhysicsProps.
- GSDevTools is dev only, never shipped. Revert plugin instances (SplitText) on unmount or element removal.

## S0188 gsap-utils

- No registration. Omit the final value to get a reusable function (except `random`, which takes `true` as last arg).
- `clamp(0, 100, 150)` gives 100; `mapRange(0, 1, 0, 360, 0.5)` gives 180; `normalize(100, 300, 200)` gives 0.5; `interpolate("#ff0000", "#0000ff", 0.5)`, objects `{x,y}` too.
- `random(-200, 500, 10, true)` reusable; array form `random([0,100,200])`; string form in vars `x: "random(-100, 100, 5)"`, `backgroundColor: "random([red, blue, green])"`.
- `snap(10, 23)` gives 20; array `snap([0,100,200], 150)`; in tweens `snap: { x: 20 }`.
- `shuffle(array)`; `distribute({ base, amount | each, from: "center" | "edges" | "random" | [0.25,0.75], grid: [rows, cols] | "auto", axis, ease })` returns a per-target function, e.g. `scale: gsap.utils.distribute({ base: 0.5, amount: 2.5, from: "center" })`.
- `getUnit("50%")`, `unitize(100, "px")`, `splitColor("#6fb936", true)` (HSL).
- `selector(scope)` gives scoped `q(".box")`; `toArray(".item", container)`; `pipe(f1, f2)`; `wrap(0, 360, 370)` gives 10; `wrapYoyo(0, 100, 150)` gives 50.
- mapRange/normalize ignore units (use getUnit/unitize when units matter).
- Use for Rembrandt: `const toTilt = gsap.utils.mapRange(0, innerWidth, -8, 8)` built once and reused in pointer handlers; `gsap.utils.toArray("[data-speed]", root)` scoped to the active version root; `distribute({ from: "center", amount: 0.4 })` for stagger delays on photo grids; `wrap` for an endless marquee index; `clamp(0, 1)` on every normalized progress value.

## S0183 gsap-performance

- Animate `x, y, scale, rotation, opacity` (compositor). Avoid `width, height, top, left, margin, padding`.
- `will-change: transform` in CSS only on elements that animate; never force3D or will-change "just in case".
- Batch DOM reads first, then writes; avoid interleaving.
- Use `stagger` rather than many delayed tweens; virtualize or animate only visible items; reuse timelines; never create timelines per frame.
- Pointer followers: `gsap.quickTo`:
  ```js
  let xTo = gsap.quickTo("#id", "x", { duration: 0.4, ease: "power3" }),
      yTo = gsap.quickTo("#id", "y", { duration: 0.4, ease: "power3" });
  container.addEventListener("mousemove", e => { xTo(e.pageX); yTo(e.pageY); });
  ```
- ScrollTrigger: pin only what is needed (pin promotes a layer); small scrub like `scrub: 1` reduces work; `ScrollTrigger.refresh()` only when layout actually changes, debounced.
- Pause or kill off-screen or inactive animations; test hundreds of tweens/triggers on low-end devices; always clean up.
- Do-not list (verbatim intent): no width/height/top/left for movement; no will-change or force3D on every element; no hundreds of overlapping tweens or ScrollTriggers untested; never ignore cleanup ("stray tweens and ScrollTriggers keep running and can hurt performance and correctness").
- Use for Rembrandt: the cursor and any magnetic or tilt effect use quickTo, never a new tween per pointer event; `will-change` goes only on parallax layers, pinned stages and the cursor.

## S0403 iart-ai/gsap-web

- Register `ScrollTrigger, SplitText, Flip` before use or they "silently no-op".
- Timelines first: `gsap.timeline({ defaults: { ease: "power3.out", duration: 0.6 } })` then `.from(".title", { yPercent: 100, opacity: 0 }).from(".sub", { y: 20, opacity: 0 }, "-=0.3").from(".cta", { scale: 0.9, opacity: 0 }, "<")`. `.fromTo()` is "most robust against re-runs".
- `gsap.set(el, { autoAlpha: 0 })`; `gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })` with `pointermove` and `e.clientX`.
- ST basics: `{ trigger: ".wrap", start: "top top", end: "+=2000", pin: true, scrub: 1, markers: true /* dev */ }`; scrubbed tweens use `ease: "none"`.
- Lenis + ScrollTrigger (canonical wiring):
  ```js
  const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);          // 1
  gsap.ticker.add((t) => lenis.raf(t * 1000));       // 2: ticker seconds to ms
  gsap.ticker.lagSmoothing(0);                       // 3
  ```
  - Do NOT also run a standalone `requestAnimationFrame(raf)` loop (double drive).
  - Symptoms: jitter = rogue rAF loop or missing `lagSmoothing(0)`; markers drift = `ScrollTrigger.update` not subscribed; pins break = a `scrollerProxy` was set under Lenis (do not; Lenis scrolls the document); stuck or flipped = missing `* 1000` or two loops.
  - Cleanup: `gsap.ticker.remove(update)` + `lenis.destroy()`. Gate behind reduced motion: skip Lenis, native scroll. `data-lenis-prevent` mentioned for nested scrollers.
- SplitText: `SplitText.create(".headline", { type: "lines, words", linesClass: "line" })` then `gsap.from(split.lines, { yPercent: 100, opacity: 0, stagger: 0.08, duration: 0.7, ease: "power4.out" })`; `overflow: hidden` on the line wrapper; `autoSplit: true` (3.13+); `split.revert()` before re-splitting; split after `document.fonts.ready`.
- Flip: `Flip.from(state, { duration: 0.6, ease: "power2.inOut", stagger: 0.05, absolute: true })`.
- Ease guide: `power2/3.out` entrances; `power2.inOut` moves between on-screen states; `back.out(1.7)` pop; `elastic.out(1, 0.3)` sparingly; `none` scrub; `steps(n)` stepped motion; `CustomEase.create("x", "M0,0 C0.2,0 0,1 1,1")`.
- Perf: transforms and opacity only; `will-change: transform` on heavy/pinned elements, removed after; `ScrollTrigger.batch()` for many reveals; `ScrollTrigger.refresh()` after content change.
- Cleanup: `const ctx = gsap.context(() => { ... }, rootRef); return () => ctx.revert();` "kills tweens, triggers, and reverts inline styles".
- Standalone HTML contract: one file, one master timeline, seek harness:
  ```js
  const t = new URLSearchParams(location.search).get("t");
  if (t !== null) { tl.pause(); tl.seek(parseFloat(t)); }
  window.__ready = true; console.log("duration", tl.duration());
  ```
  Verify start/mid/end frames; check clipped text, off-canvas, FOUC, seam jank; reduced motion honored; no accidental linear on spatial motion.

## S0447 MengTo/gsap

- APIs recap: `gsap.timeline({ defaults, repeat, yoyo, paused })`, `tl.to().from().addLabel('x').add(() => ...)`; eases `"power2.out"`, `"expo.inOut"`, `"elastic.out(1, 0.3)"`; stagger `0.05` or `{ each, from: "start|center|end|random", grid }`.
- Pitfalls: layout props (use transforms + `will-change: transform`); ST "not firing" because the trigger has no height or a nested scroll container; no SPA cleanup (`gsap.context()` + revert, or kill all STs); FOUC and measuring before fonts/images load (init after layout is stable, `ScrollTrigger.refresh()` after images load).
- Recipes:
  - Hero: `gsap.from(".hero [data-anim]", { y: 24, autoAlpha: 0, duration: 0.8, ease: "power2.out", stagger: 0.06 })`.
  - Sequence: `defaults: { ease: "power2.out", duration: 0.6 }`, `.from(".nav", { y: -20, autoAlpha: 0 }).from(".hero-title", { y: 30, autoAlpha: 0 }, "-=0.2").from(".hero-cta", { scale: 0.95, autoAlpha: 0 }, "-=0.2")`.
  - Pinned scrub: `{ trigger: ".story", start: "top top", end: "+=800", scrub: 1, pin: true }` then `.to(".story .panel", { xPercent: -200 })`.
- Questions to settle: static vs SPA, pin/scrub/snap needs, mobile and reduced motion constraints.

## S0448 MengTo/gsap-scrolltrigger-storytelling

- Motion amplifies comprehension; never hides basic content.
- Each scroll segment reveals one new state; copy, panels, images and background move as one authored sequence.
- Implementation: scrubbed timelines for the main narrative, regular tweens only for supporting entrance or hover motion; `pin: true` long sections with explicit timeline labels per scene; transforms and opacity; sparse `will-change`; context cleanup; refresh after images/fonts/async content; `matchMedia()` to simplify desktop sticky choreography on small screens.
- Motion patterns:
  - Sticky frame: main artifact pinned, narrative updates in measured steps.
  - Layer reveal: one at a time, short offsets, shared easing language.
  - Section handoff: current scene scales, masks, blurs or translates into the next instead of ending abruptly.
  - Smooth interpolation: scrub smoothing, quickSetter/quickTo, lerp.
  - Cinematic depth: foreground/background parallax, dimming layers, masks, focus shifts.
- Tuning: pin length by number of state changes; direct scrub for precise walkthroughs, eased scrub (numeric) for film feel; reserve high-impact transitions for section handoffs.
- Avoid: animations per tick with no story beat; pins that trap the reader; layout props in scrubs; effects that reduce text contrast or cover CTAs; triggers alive after teardown.

## S0204 scroll-experience

- Read with its references/detailed-guide.md.

- Stack table: ScrollTrigger (complex), Lenis (smooth scroll only), CSS scroll-timeline (simple, native).
- CSS native with feature detection: `animation: reveal linear; animation-timeline: view(); animation-range: entry 0% cover 40%;` and `@supports (animation-timeline: scroll())`; needs a visible static fallback outside `@supports`.
- Parallax layer speeds: Background `0.2x`, Midground `0.5x`, Foreground `1.0x`, Content `1.0x`, Floating elements `1.2x`. Sample: `.background` `y: '-20%'`, `.foreground` `y: '-50%'`, both `scrub: true`.
- Story beats: Hook (full viewport, striking visual), Context, Journey (parallax), Climax (dramatic reveal), Resolution (CTA).
- Text reveals: fade, typewriter, word-by-word highlight, sticky text with changing visuals.
- Sticky: CSS `height: 300vh` container + `position: sticky; top: 0; height: 100vh`, or GSAP `pin: true, start: 'top top', end: '+=1000', scrub: true`.
- Horizontal: `gsap.to(sections, { xPercent: -100 * (sections.length - 1), ease: 'none', scrollTrigger: { trigger: '.horizontal-container', pin: true, scrub: 1, end: () => '+=' + container.offsetWidth } })`.
- Performance: profile against refresh rate; only transform and opacity; `filter` and `clip-path` allowed but "profile paint cost"; will-change sparingly; lazy heavy work with `ScrollTrigger.create({ onEnter: init, onLeave: destroy, onEnterBack: init, onLeaveBack: destroy })` (make init/destroy idempotent).
- Mobile: reduce parallax (sample `y: -50` mobile vs `y: -200` desktop), fewer layers, consider disabling on low end; `transform: translate3d(0,0,0); backface-visibility: hidden` on layers.
- Accessibility: reduced-motion CSS reset plus JS gate `if (!prefersReducedMotion) initScrollAnimations();`; content readable without JS; skip links (`tabindex="-1"` on skip targets only); never trap users; key message and CTA visible without scroll; text in DOM, not canvas.
- Validation checks: no reduced motion (HIGH), unthrottled scroll events, layout props, missing will-change (LOW), scroll hijacking.
- Implementation limits: reduced-motion path must also disable JS pinning; re-evaluate preferences on change; avoid blanket GPU promotion (memory); test keyboard focus through pinned/horizontal sections, 200% zoom, no-JS.

## S1322 cinematic-scroll-storytelling

- Read with REFERENCES.md and demo/PROMPT.md.

- Feel: luxury editorial, Apple-level polish, Awwwards language. Avoid bounce/elastic/springy motion, aggressive scale jumps, gaming flash, too many simultaneous effects, scroll hijacking.
- Lenis wiring (with reduced-motion gate):
  ```js
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!reduceMotion) {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }
  window.addEventListener("load", () => ScrollTrigger.refresh());
  ```
  Imports `lenis/dist/lenis.css` (inline its rules in a one-file build).
- Motion tokens: enter `power3.out` or `power4.out`; scrubbed scenes `ease: "none"` with `scrub: 0.8` to `1.4`; text reveal `0.8s` to `1.1s`; card reveal `0.9s` to `1.2s`; word stagger `0.035s` to `0.07s`; line stagger `0.08s` to `0.14s`; card stagger `0.06s` to `0.1s`; offset `y: 24` to `48`; blur `4px` to `10px` then `0px`; sticky card scale `1` down to `0.92`.
- Page anatomy: preloader, hero (image parallax, masked headline, scroll cue), intro (kinetic words), story sections, sticky card stack, gallery/proof, footer handoff.
- Preloader: `tl.fromTo(bar, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1.1 }).to(loader, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "+=0.15")`, removes loader on complete, returns a Promise; reduced motion removes loader at once. Must exit reliably even if images are slow.
- Split reveal: words in `.split-word-mask { display:inline-block; overflow:hidden; vertical-align:top }`; `fromTo(words, { yPercent: 110, autoAlpha: 0, filter: "blur(8px)" }, { yPercent: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.95, ease: "power4.out", stagger: 0.05, scrollTrigger: { trigger: el, start: "top 82%", once: true } })`; reduced motion `gsap.set(..., { autoAlpha: 1 })`.
- Section reveals: `{ y: 36, autoAlpha: 0, filter: "blur(8px)" }` to `{ y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 1, ease: "power4.out", stagger: 0.08, scrollTrigger: { start: "top 82%", once: true } }`; reduced `clearProps: "all"`.
- Progression scene: `scrollTrigger: { trigger: scene, start: "top top", end: "+=140%", scrub: 1.1, pin: true, anticipatePin: 1 }`, `.fromTo(media, { scale: 1.08 }, { scale: 1, ease: "none" }).fromTo(copy, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, stagger: 0.15, ease: "none" }, 0.15)`.
- Sticky stack: CSS `position: sticky; top: 12vh; transform-origin: center top`; JS per card `gsap.to(card, { scale: 0.92 + index * 0.015, autoAlpha: 0.72, y: -24, ease: "none", scrollTrigger: { trigger: nextCard, start: "top 78%", end: "top 24%", scrub: true, invalidateOnRefresh: true } })`.
- Parallax: `y: () => window.innerHeight * speed` (`data-speed` default `-0.16`, hero `-0.18`), `{ trigger: section, start: "top bottom", end: "bottom top", scrub: 1, invalidateOnRefresh: true }`.
- Footer reveal: `fromTo(footer, { yPercent: -12, autoAlpha: 0.85 }, { yPercent: 0, autoAlpha: 1, ease: "none", scrollTrigger: { start: "top bottom", end: "top 45%", scrub: 1 } })`.
- Build order: static page, preloader + hero, split reveals, section reveals, stack, parallax, scrubbed pins only where the story needs them, reduced motion + touch, QA.
- QA: readable without JS; reduced motion = static and no Lenis; reveals play once; stacks do not trap or overlap footer; refresh after images/fonts; mobile simplified or no pinning. Demo contract: 390px to 1440px, replay control, stop continuous work when settled.

## S1326 scroll-scrubbed-visual-sequence

- Read with REFERENCES.md and demo/PROMPT.md.

- Config first: `{ scrollVh: 280, frameCount: 96, fit: "contain", posterFrame: 0, reducedMotionFrame: 95, copyStops: [0, 0.42, 0.78] }`.
- One normalized value: `progress = clamp((viewportTop - sectionTop) / (sectionHeight - viewportHeight))`. Never wheel delta, elapsed time or autoplay as source of truth; same scroll position always reproduces the same state.
- Renderer choice: video (small GOP, coalesce `currentTime` writes in rAF), image sequence (current frame first, then neighbours; never block first paint), canvas (cap DPR at 2, redraw only on progress change), SVG/DOM (transforms, opacity, clip-path, CSS vars), WebGL only if depth materially helps (poster + dispose).
- Stage: section in flow with height from `scrollVh`; visual in `position: sticky` viewport stage; copy in a separate layer (no text baked in frames); no implicit easing in the mapping (smoothing only after correctness); refresh after fonts and media sizes settle; release cleanly before next section.
- GSAP form:
  ```js
  ScrollTrigger.create({ trigger: section, start: "top top", end: () => `+=${innerHeight * 2.8}`,
    pin: stage, scrub: true, invalidateOnRefresh: true, onUpdate: ({ progress }) => render(progress) });
  ```
- Media: poster until first frame paints; clamp frame index to `0...frameCount - 1`; cancel stale requests; `object-fit` + explicit focal point for mobile crops; pause decoding and rendering offscreen or when hidden; clean up STs, observers, rAF, Blob URLs.
- Reduced motion: no pin, no scrub, static selected frame, ordinary flow; expose ordered info as text too. Verify fast flicks, resize while active, 390/768/1024/1440.

## S1327 scroll-scrubbed-word-reveal

- Read with REFERENCES.md and demo/PROMPT.md.

- Keep one untouched accessible text source; walk text nodes with `TreeWalker` (never flatten with textContent/innerHTML); skip `script`, `style`, form controls, `[data-no-split]`; wrap only non-whitespace tokens; `aria-hidden="true"` on spans only when an unsplit accessible copy remains.
- No line-based splitting (wraps must stay free).
- Mapping: `local = clamp(reveal * wordCount - index)`; `word.style.setProperty("--word-progress", local)`; interpolate opacity, blur, offset from it; final state identical to normal type.
- Defaults: hidden opacity `0.12` to `0.3`; blur `4` to `10px`; vertical offset `0.08` to `0.22em`; span `120` to `220%` of viewport for a paragraph; word overlap `10` to `30%`; no easing on the scroll mapping. Expose as CSS custom properties; scale span from text length.
- Preserve links/strong/em semantics; never reveal an essential link only after the reader passed it; re-split only when the source text changes; store state to restore the DOM.
- Pin only for a short deliberate beat; no typewriter cursor, random delays, autoplay. Reduced motion: all words visible, no blur, no transforms, no pin. Final state must meet contrast.
- Cleanup: kill STs, listeners, rAF; restore original subtree; refresh after fonts.

## S1329 staggered-word-reveal

- Read with demo/PROMPT.md.

- Defaults: start `opacity: 0`, `translateY(20px)`; end `opacity: 1`, `translateY(0)`; `0.8s`; `cubic-bezier(0.16, 1, 0.3, 1)`; stagger `0.06s` to `0.08s` (default `0.07s`); trigger about 20% visible with lower viewport bias; once only.
- CSS: no-JS text visible; `html.js .word-reveal[data-word-reveal]:not(.is-ready) { opacity: 0 }`; words `display: inline-block; transition-delay: calc(var(--word-index) * 0.07s)`; `.is-visible` sets final state; reduced motion forces final state, `transition: none`.
- JS: `document.documentElement.classList.add("js")`; split on `/(\s+)/` keeping whitespace text nodes, `aria-label` with original text, words `aria-hidden="true"`, `--word-index`; IntersectionObserver `{ threshold: 0.2, rootMargin: "0px 0px -10% 0px" }`, `io.unobserve` after reveal; fallback when reduced motion or no IO.
- GSAP equivalent: `fromTo(words, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", stagger: 0.07 })`. Framer tokens `[0.16, 1, 0.3, 1]`.
- Taste: short text only; words not letters; no bounce, rotation, large blur; transform/opacity only; never split text with links/buttons/meaningful markup; init after fonts if wrapping matters.

## S0451 MengTo/masked-reveal

- Defaults: start `"top 82%"`; duration `0.7s` to `0.9s`; stagger `0.025s` to `0.045s` per word; `yPercent: 110` to `0`; `power3.out` or `expo.out`; reveal once.
- CSS: `html.js .masked-reveal[data-masked-reveal] { visibility: hidden }`, `.is-split { visibility: visible }`; `.word-mask { display: inline-block; overflow: hidden; vertical-align: top }`; `.word { display: inline-block; transform: translateY(110%); will-change: transform }`; reduced motion makes text visible with `transform: none`.
- JS: split on `/(\s+)/`, escape HTML, `aria-label` on element, `aria-hidden` masks, `data-masked-reveal-ready` guard; `if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;`; `gsap.set(element, { autoAlpha: 1 })`; `gsap.fromTo(words, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.035, scrollTrigger: { trigger: element, start: "top 82%", once: true } })`.
- The skill says it "avoids the paid SplitText plugin"; outdated per S0184 (SplitText is free and in our bundle). Equivalent with SplitText: `type: "words", mask: "words"`.
- Taste: short headlines; no blur unless the style calls for it; stagger by word; init after fonts; refresh after late images; do not split text with links/buttons. Checks: hidden before init then `autoAlpha: 1`; aria-label; spaces preserved; reduced motion static; STs cleaned.

## S1325 scroll-progress-timeline

- Read with REFERENCES.md and demo/PROMPT.md.

- Data-driven steps (`{ id, number, title, body }`), rendered as an ordered list with real headings; line, dots and media only enhance.
- Line: quiet base line; progress line on top with `transform-origin: top` (vertical) or `left`; measure first and last point centers, not section edges; normalize; `scaleY(progress)`/`scaleX(progress)`; a step is active when the head crosses its center.
- Schedule writes in one rAF; recalc after fonts, images, resize, orientation, mutation.
- Layout: centered alternating only with width and balanced content; left rail for long copy; horizontal for short sequences; pinned full-screen chapters only when each step has a distinct visual state, finite pin; collapse to left rail on small screens.
- State: small opacity/translate/scale/blur/color; inactive steps stay readable; `aria-current="step"` only when meaningful; no live region per scroll update. IntersectionObserver for simple entry; ScrollTrigger when the line fills continuously.
- Navigation: real anchors, `scroll-margin` for sticky headers, never move focus on passive scroll.
- Reduced motion: complete line or discrete reached states, no scrubbed interpolation, blur, pinning or large transforms. Verify 390/768/1024/1440, 200% zoom, fast reverse, anchors.

## S0407 iart-ai/svg-animation

- Draw-on: `stroke-dasharray: var(--len); stroke-dashoffset: var(--len); animation: draw 1.4s ease forwards;` with `--len` from `path.getTotalLength()`, or no-JS `pathLength="1"` then dasharray/dashoffset `1` to `0`. Erase by reversing; direction follows point order; stagger with delays.
- Morph: naive `d` interpolation needs identical number and type of commands; MorphSVG handles mismatches (`gsap.to("#start", { morphSVG: "#end", duration: 0.8, ease: "power2.inOut" })`, `convertToPath("circle, rect, ellipse, line, polygon")`); Flubber `interpolate(pathA, pathB, { maxSegmentLength: 2 })`; hand-authored toggles keep identical command structure.
- Motion path: `motionPath: { path: "#track", align: "#track", autoRotate: true, alignOrigin: [0.5, 0.5] }`, `duration: 4, repeat: -1, ease: "none"`; SMIL `<animateMotion rotate="auto">`; CSS `offset-path` + `offset-distance: 100%`, `offset-rotate: auto`.
- Gradients: animate `gradientTransform` or stop offsets (sheen sweep `from="-1 0" to="1 0" dur="2s"`). Filters (`feDisplacementMap scale`, `feGaussianBlur stdDeviation`, `feColorMatrix`) are paint heavy: sparingly.
- Choice: CSS for single draw; SMIL self-contained; GSAP for coordinated, scrubbable, scroll-tied; MorphSVG/Flubber for mismatched morphs.
- Authoring: SVGO keep `viewBox`, disable `cleanupIds`, `removeViewBox`, `mergePaths`, `convertShapeToPath` when animating sub-paths; inline SVG in DOM (not `<img>`); explicit viewBox, no fixed width/height; draw-on needs real strokes (`fill:none; stroke:...`); reduced motion gates loops and keeps a static final state.
- Verify: seek harness (`svg.pauseAnimations(); svg.setCurrentTime(N)` or `tl.pause(); tl.seek(N)`), start/mid/end; check viewBox clipping, stale dashoffset, morph seams; no accidental linear draw-on.

## S1328 scroll-world-storytelling

- Read with REFERENCES.md and the demo, html-data, threejs and video PROMPT.md files.

- Three production modes, choose ONE primary: video scrub, Three.js world, HTML/data/type. Do not mix by default.
- Contract: 5 to 7 beats + one final action; house rules: preserve facts, never invent proof, one connected world, one dominant motion grammar, one art direction, motion carries transitions while copy explains, one primary CTA, native reversible scroll, never hijack the wheel.
- Bar: arc explainable after one pass; works forward, backward, slow, fast flick; no jump, flash or reversal at seams; legible on mobile and reduced motion.
- Beats: Hook, Old way, New rule, Mechanism, Proof, Payoff, Action. Beat ledger fields: id, scene, eyebrow 2 to 4 words, headline 3 to 8 words, body one sentence under 24 words, evidence (exact source fact), motion (one verb phrase), scroll weight `0.7` to `1.8` viewport heights, CTA final beat only.
- Style bible: 3 mood adjectives, one world metaphor, 4 to 6 named colors (one dominant, one accent), one display + one reading voice, one material language (paper, glass, clay, photographic, mechanical), motion grammar (forward glide, orbit, crane, lateral track, dive, staged reveal), pacing, 3 exclusions.
- Video mode: one continuous 6 to 15s move, no cuts; encode small GOP (`-g 8 -keyint_min 8 -sc_threshold 0 -movflags +faststart`); poster first frame; map progress to `currentTime` coalesced in rAF; reduced motion uses poster or stills.
- Three.js mode: one scene, camera, renderer, world group; scroll maps to camera position/target, rotation, lights; ambient motion subtle; cap DPR at 2; pause when hidden/off-screen; dispose geometries/materials/textures/listeners; static CSS/SVG poster fallback; local pinned three.js (no CDN); avoid the glowing blue planet cliché.
- HTML/data mode: semantic DOM, one chart grammar, inline SVG only when needed, labels as selectable text, CSS custom properties from one normalized scroll value; animate transforms, opacity, clip paths, counters, stroke offsets; truthful scales; complete without JS; must not secretly become canvas/WebGL.
- Runtime needs: pinned/sticky stage, one scroll conductor, config-driven chapters, work stops when settled, lazy heavy assets, semantic headings, one real CTA, reduced-motion flow.
- Verify: story, timing, reverse restores exact state, no backlog, 390/768/1024/1440, orientation, a11y, integrity, console clean.

## S0385 flornkm/webgl-components

- One module-level WebGL context; per-instance cheap 2D canvases blitted with `drawImage` in the same task (never across an await); blit from `canvas.height - size` (GL origin bottom-left); grow the shared canvas, never shrink; group identical draws. Browsers cap about 8 to 16 live contexts and evict the oldest.
- Frame loop: one rAF for all instances; IntersectionObserver gating; pause when `document.visibilityState !== "visible"`; stop scheduling when nothing visible; cap ambient drift at 30fps; ration one-time texture generation about one per frame.
- Cost = fragment shader x area: aim for one texture tap plus a couple of noise evaluations per pixel; precompute layered patterns into a source texture and animate where you sample; negative mip bias against noise-warped UV blur; mipmaps mandatory; power-of-two sources in WebGL1.
- Optics (if glass/chrome): `N = normalize(vec3(p, sqrt(1 - r*r)))`, Fresnel `0.04 + 0.96 * pow(1 - dot(N, V), 5.0)`, environment as a function; dispersion 8 to 16 taps.
- Transparency: premultiplied `vec4(emitted, coverage)`; drive ambient level from `prefers-color-scheme`; WebGL cannot read the page behind it.
- DPR: decided by shader cost; expensive shader cap about `1.5`; cheap shader renders at real density.
- Bounded texture cache keyed by source; `gl.deleteTexture` on eviction; `createImageBitmap` decode, `close()` in `finally`; placeholder tint until loaded.
- Robustness: `webglcontextlost` with `preventDefault()`, tear down loop, flip to DOM fallback; `failIfMajorPerformanceCaveat: true`; clamp output luminance so nothing goes all black or blown out.
- Fallback is a production surface: same identity in plain DOM/CSS; the clipping frame needs `position: relative` with `overflow: hidden`; ship a `forceFallback` switch to test it on a healthy GPU.
- A11y/layout: reduced motion renders one still frame and never starts the loop (full fidelity), listen for media-query change; decorative `aria-hidden`, meaningful `role="img"` + label; `isolation: isolate`; no pointer events, drag or selection on visual layers.
- Determinism: stable hash of id into curated tables; Knuth multiplicative hash; never `Math.random()` in the render path.
- Checklist: hidden-tab CPU near zero, forced context loss flips to fallback, `--disable-gpu` shows fallbacks clipped (commands not run).

## S0457 MengTo/webgl-landing-steering

- Read with REFERENCES.md.

- Define intent (premium, technical, playful, cinematic), device mix, motion tolerance, production limits.
- Pick ONE lane; avoid 3 to 4 heavy hero effects:
  - A subtle depth field (soft gradient meshes, slow parallax planes, light bloom; copy first).
  - B data/particle intelligence (purposeful flow toward CTA, "system behavior, not random sparkles").
  - C object-centric 3D product moment (one hero object, short loop, fast fallback).
  - D immersive cinematic (heavy post; static/mobile fallback and strict gates).
- Steering: product/feature pages Lane A or C; consumer growth Lane B with CPU/GPU cap; campaign C or D.
- Quality gates:
  1. Message: headline + CTA readable in under 3 seconds; WebGL never blocks understanding.
  2. Performance: `Math.min(devicePixelRatio, 1.5-2)`; stable frame time on common mobile; lazy heavy assets with immediate non-WebGL poster.
  3. Accessibility: reduced motion = still frame or low-motion; contrast over animated backgrounds.
  4. Reliability: context loss and resize; dispose on teardown.
- Risk tiers: low (CSS + canvas illusion, minimal shaders) is the default for conversion pages; medium (1 to 2 meshes, light post); high (multi-pass, dense particles).
- Failures: conversion drop (lower amplitude, raise CTA contrast); mobile stutter (fewer particles, lower DPR cap, no post); generic look (one signature motif: grid, wave, orbit, shards).
- "Implement fallback first, then enhance with WebGL."

## S0067 prototype

- Read with PICKER.md.

- Divergence skill: several genuinely different versions behind a picker; each variant a direction you could defend shipping. Craft bar per variant: ease-out on entrances (never ease-in), sub-300ms UI motion, correct transform-origin, transform/opacity only, reduced motion handled.
- Hard rules: variants diverge on a named axis (layout, density, personality, motion, interaction model); every variant fully works with real content; the picker is chrome, not a contestant (copy PICKER.md verbatim); clean up after the choice.
- Default 3 variants (max 5); names describe direction ("Quiet", "Editorial", "Playful"), never "Option A". Two that differ only in accent or copy are one direction.
- Harness: render one variant at a time, full size, in realistic context. "Switching is instant": the variant swap gets no animation.
- Picker spec (verbatim values): `nav.proto-picker` fixed `bottom: 24px; left: 50%; transform: translateX(-50%); z-index: 2147483647`; flex, `gap: 2px; padding: 4px; border-radius: 999px; background: rgba(10, 10, 10, 0.82); backdrop-filter: blur(12px) saturate(1.4)`; shadows `0 0 0 1px rgba(255,255,255,0.08) inset, 0 8px 24px rgba(0,0,0,0.24), 0 2px 6px rgba(0,0,0,0.12)`; system font 13px. Highlight span `top: 4px; height: 28px; background: rgba(255,255,255,0.12)`; after first paint (`data-ready`) `transition: transform 250ms cubic-bezier(0.23, 1, 0.32, 1), width 250ms cubic-bezier(0.23, 1, 0.32, 1)`, none under reduced motion. Items `height: 28px; padding: 0 12px; color: rgba(255,255,255,0.55)`, hover `0.85`, active `#fff`, `:active { transform: scale(0.97) }`, focus `outline: 2px solid rgba(255,255,255,0.4); outline-offset: 2px`. Divider `1px x 16px`. Replay button `↻` only when variants have motion. `data-position="top"` is the one allowed change.
- Behavior contract: keys `1` to `N` and arrow left/right switch, `R` replays; ignore inputs/textarea/select/contenteditable and modifier keys; exactly one item has `data-active` + `aria-current="true"`; selection persists via `?v=2` (fallback 1); highlight initial position without animation; switching re-mounts the variant so entrance animations re-run.
- Reference mount: `stage.innerHTML = ''; requestAnimationFrame(() => { stage.innerHTML = variants[i](); });`; `history.replaceState` with `url.searchParams.set('v', i + 1)`; `requestAnimationFrame(() => requestAnimationFrame(() => picker.setAttribute('data-ready', '')))`.
- Hand-off table: variant, axis, when it is right, its cost; never pre-pick a favourite.

## S0082 variant

- Read with picker.md.

- Each variant is a different answer on ONE primary axis: Structure, Density (better-layout), Emphasis (better-colors), Type (better-typography), Voice (better-writing). Secondary choices follow from it.
- Floor every variant clears: accessible names + visible focus; keyboard parity; reduced motion respected; nothing clips at 320px or 200% zoom; contrast; no meaning on color alone or state change on motion alone; recovery on errors. If a direction can only work by breaking the floor, drop it.
- Host in the real page with real neighbours and realistic data; select via URL param `?__variant=quiet` (every variant is a link); one variant at a time, full size.
- Picker: deliberately outside the design system (dark neutral, system font, no project variables, not theme-aware). Grouped vertical list with headings (`role="group"`, `aria-labelledby`), active button `aria-pressed="true"`; arrow keys step through all; `H` hides/shows the picker; ignore modifier, `defaultPrevented`, form fields, contenteditable; "The piece switches instantly and keeps the scroll position. Only the active label eases its font weight." List and select both rendered; container query shows one (breakpoint `232px` + production width; sample `@container variant-page (min-width: 876px)` with `grid-template-columns: 208px 644px`).
- Styles of note: list `background: rgb(20 20 20 / 0.92); border-radius: 14px; padding: 6px; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.1)`; buttons `padding: 8px 10px; border-radius: 8px; color: rgb(255 255 255 / 0.6)`, pressed `background: rgb(255 255 255 / 0.14)`, `transition: color 200ms ease-out, font-weight 200ms ease-out`; focus `outline: 2px solid rgb(255 255 255 / 0.7)`; `all: unset` to keep global styles out.
- Promote one, delete the rest, search for names and the `__variant` param afterwards. Never mark a favourite.

## S1474 parallel-concepts

- Build several genuinely different solutions held at equal effort; do not rank (that is concept-selection).
- Distinctness test is behavioural: "does the user do something different?" Dimensions: Sequence, Unit of interaction (one item, batch, stream), Division of labour, Entry point, Commitment point.
- Same steps in the same order with a new skin = one concept rendered twice; cut it.
- Sizing: three cheap sketches beat two polished mockups; comparable fidelity across the set; drop padding concepts.
- Write the question the set must answer first; no strawmen; hold the visual language constant so the variable under test is isolated; never carry a concept you would refuse to build.
- Evidence cited: Stanford parallel prototyping (Dow, Glienke and Klemmer, 2010): parallel beats serial at equal effort on real audience response. Side effects: critique reads as information about options, not a verdict; the first idea loses its "unearned advantage" as the reference point.
- Cost: n concepts cost about n times as much, so spread early while a concept is still a sketch.
- Use for Rembrandt: per section, write the question first (for the hero: "how does a worried homeowner first meet the house and the phone number?"), then make v1, v2, v3 differ in what the visitor does (scroll through it, move the pointer, tap/drag), not in colour.

## S0330 danny/explore-design

- One standalone HTML with several distinct directions; explore phase then implement phase (its `references/implement.md` and `brand-init.md` are not in the library). Brand-scan gate script not run.
- 4 directions (range 3 to 6), each a one-sentence thesis announced before writing.
- Per variant: letter + name, a one-line tradeoff (what it optimizes AND gives up), live preview, analysis of at most 3 sentences; then a decision row ("If you want X, pick A").
- Rules: distinct in layout, hierarchy, density, tone, priority (never just button colors); real copy; "Variants explore structure, not identity, by default" (all wear the brand); same fixtures for all; scope CSS with per-variant prefixes (`.va-`, `.vb-`) to avoid cross-bleed; one file, vanilla CSS, system-font fallbacks; avoid the dark gray + neon + monospace "AI artifact" chrome.
- Real data first; aspirational elements allowed only when disclosed in a manifest (Real / Sometimes / Aspirational, counted).

---

## Applying it to Rembrandt v5

1. Plugin set and registration. Inline GSAP 3.13 core, ScrollTrigger, SplitText, Flip, CustomEase and Lenis 1.3.4 once, then `gsap.registerPlugin(ScrollTrigger, SplitText, Flip, CustomEase)` before any section init (S0184, S0403). Do not rely on MorphSVG `smooth`/`curveMode` (3.14+). Never ship markers or GSDevTools.

2. Shared motion language. Define once:
   ```js
   CustomEase.create("rr-out", "0.16,1,0.3,1");        // S1329 cubic-bezier
   CustomEase.create("rr-ui",  "0.23,1,0.32,1");       // S0067 picker highlight
   gsap.defaults({ duration: 0.8, ease: "power3.out" }); // S1322 enter, S0451 duration
   ```
   Entrances use `power3.out`/`power4.out`/`rr-out`; scrubbed tweens use `ease: "none"`; never `bounce`/`elastic` (S1322). `back.out(1.7)` only on small "fun" pops (S0403).

3. Lenis wiring (one loop, gated):
   ```js
   const RM = matchMedia("(prefers-reduced-motion: reduce)");
   let lenis = null;
   function startLenis() {
     lenis = new Lenis({ lerp: 0.08, smoothWheel: true, wheelMultiplier: 0.9 }); // S1322
     lenis.on("scroll", ScrollTrigger.update);
     gsap.ticker.add(lenisRaf); gsap.ticker.lagSmoothing(0);
   }
   function lenisRaf(t) { lenis.raf(t * 1000); }
   function stopLenis() { gsap.ticker.remove(lenisRaf); lenis?.destroy(); lenis = null; }
   if (!RM.matches) startLenis();
   RM.addEventListener("change", e => { e.matches ? stopLenis() : startLenis(); }); // section mm handlers re-run on their own
   window.addEventListener("load", () => ScrollTrigger.refresh());
   ```
   No `scrollerProxy`, no extra rAF loop. Inline the lenis.css rules. Use `data-lenis-prevent` on any inner scroller (S0403). `lerp` and `duration` are alternatives; pick `lerp: 0.08`.

4. Per-section version architecture (the core recommendation). Markup: each section holds its three versions as live siblings, inactive ones carry `hidden` in the HTML so no-JS shows version 1 (S0204 progressive enhancement, S1322 QA):
   ```html
   <section data-section="hero" id="hero">
     <div class="vpick" role="group" aria-label="Hero version">
       <button aria-pressed="true">1</button><button aria-pressed="false">2</button><button aria-pressed="false">3</button>
     </div>
     <div data-v="0" class="hero-v1">...</div>
     <div data-v="1" class="hero-v2" hidden>...</div>
     <div data-v="2" class="hero-v3" hidden>...</div>
   </section>
   ```
   Runtime: one `gsap.matchMedia()` per section (it is a context; do not nest gsap.context inside it, S0181), scoped to the active version root, created in DOM order on first load:
   ```js
   const SECTIONS = [...document.querySelectorAll("[data-section]")];
   const live = new Map();   // id -> { mm, v }
   function mountSection(sec, v) {
     const id = sec.dataset.section, idx = SECTIONS.indexOf(sec);
     live.get(id)?.mm.revert();                        // kills tweens + STs + pin spacers, reverts SplitText + inline styles, runs cleanup fns
     sec.querySelectorAll(":scope > [data-v]").forEach(el => el.hidden = +el.dataset.v !== v);
     const root = sec.querySelector(`:scope > [data-v="${v}"]`);
     const mm = gsap.matchMedia();
     mm.add({ motion: "(prefers-reduced-motion: no-preference)", reduce: "(prefers-reduced-motion: reduce)",
              desktop: "(min-width: 900px)", fine: "(hover: hover) and (pointer: fine)" },
       (ctx) => INIT[id][v](root, { ...ctx.conditions, prio: SECTIONS.length - idx, id }),  // returns its own cleanup fn
       root);
     live.set(id, { mm, v });
   }
   SECTIONS.forEach(s => mountSection(s, readUrlVersion(s)));   // top-to-bottom creation order
   ```
   Each `INIT[id][v]` builds only `fromTo` tweens and timelines (robust to re-runs, S0403), gives its main trigger `id: \`${id}:main\``, and returns a function that cancels rAF loops, disconnects observers, removes non-delegated listeners and disposes WebGL/canvas. Use `revert`, not `kill`: kill leaves inline styles at their mid-scrub values and the next mount of that version would start dirty.

5. Switching without a jump. Sequence for a click on a version button:
   ```js
   function switchVersion(sec, v) {
     const main = ScrollTrigger.getById(`${sec.dataset.section}:main`);
     const insidePin = main && main.pin && main.isActive;
     const before = sec.getBoundingClientRect().top;
     lenis?.stop();                                  // (outside the skills: Lenis API, verify)
     mountSection(sec, v);
     ScrollTrigger.refresh();                        // S0186: one refresh after the DOM change
     const nowMain = ScrollTrigger.getById(`${sec.dataset.section}:main`);
     const y = insidePin && nowMain ? nowMain.start
             : window.scrollY + sec.getBoundingClientRect().top - before;   // keep section top fixed in the viewport
     lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : window.scrollTo(0, y);
     lenis?.start();
     updatePickerAndUrl(sec, v);
   }
   ```
   Rationale: S0082 says the piece "switches instantly and keeps the scroll position"; S0067 says no swap animation and re-mount so entrances re-run. If the user was inside a pinned range, the new version's pin length differs, so land on its start rather than a meaningless offset. Verify the `lenis.scrollTo` option names against 1.3.4 (outside the skills).

6. Refresh order after a mid-page re-init. Re-created triggers are appended after those of lower sections, which breaks pin-spacing math (S0186). Pass `refreshPriority: prio` into every scrollTrigger config of a section (computed from DOM index), then verify with temporary markers that the section below a re-pinned section still lines up. The skill text and the official docs disagree on the sign (see S0186 note): test once with markers and fix the formula. Fallback that needs no priority at all: on switch, revert and re-mount the switched section and every section after it in DOM order.

7. Reserve every image box. Give all embedded photos `width`/`height` attributes or `aspect-ratio` so swapping versions and late decoding cause no layout shift and no extra refresh; where a version must measure an image, `await img.decode()` before creating its triggers (S0447 FOUC, S1326 "refresh after media sizes settle"). Store each base64 photo once (for example a JS map assigned to `src` at mount, with version 1 inline for no-JS) so three versions do not triple file weight; use `decoding="async"`.

8. Picker as chrome, adapted to one control per section. The owner wants "one small control on the section: 1 · 2 · 3", so the global bottom pill of S0067 does not fit as-is. Keep its look rules (dark neutral `rgba(10,10,10,0.82)` pill, system font 13px, 28px items, highlight sliding `250ms rr-ui`, no brand tokens) and its behavior contract, placed inside each section outside the version roots (so `mm.revert()` never touches it, and it stays visible inside pinned sections). Buttons are real `<button>`s with `aria-pressed` (S0082), visible focus ring `2px solid rgba(255,255,255,0.4)`; the version swap itself gets no animation.

9. Keyboard and URL. Keys `1`, `2`, `3` (and `R` replay) act on the section currently in view: track it with one standalone trigger per section `ScrollTrigger.create({ trigger: sec, start: "top center", end: "bottom center", onToggle: s => s.isActive && (activeSection = sec) })`, created outside the per-version scope. Ignore events from inputs/contenteditable or with modifiers (S0067, S0082). Persist with `history.replaceState` per section, for example `?hero=2&proof=3`, so any combination is a shareable link.

10. Divergence rule per section. The three versions differ in what the visitor does (S1474: sequence, unit of interaction, entry point), on one named axis per section (S0082), at equal fidelity, with the same real facts and photos (S0330 same fixtures). Example axis for the hero: "how the house is revealed": v1 scrubbed pinned photo push-in with masked headline; v2 pointer-driven depth layers (no pin); v3 tap/drag crossfade of real job photos. Name each direction; never "Option A".

11. Never the same trick twice. Assign each section one dominant motion grammar from S1328 (forward glide, crane, lateral track, dive, staged reveal, orbit) and one text technique from: masked word rise (S0451), staggered word fade (S1329), scrubbed word reveal (S1327), SplitText line rise (S0403), ScrambleText only if bundled. Track the assignment in the plan so no two sections share both.

12. Text reveals with SplitText, cleanly revertible. Prefer SplitText over hand splitters (free, reverts with the matchMedia context):
    ```js
    SplitText.create(h, { type: "words", mask: "words", aria: "auto", autoSplit: true,
      onSplit: self => gsap.fromTo(self.words, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "power3.out",
        stagger: 0.035, scrollTrigger: { trigger: h, start: "top 82%", once: true, refreshPriority: prio } }) });
    ```
    Split only headlines and short lines (little text anyway); never split the phone link or buttons; split after `document.fonts.ready` (embedded fonts) or rely on `autoSplit`. Blur on words (S1322 `blur(8px)`) only on one or two headlines: filter costs paint (S0204).

13. Scrubbed word reveal for the one statement line (e.g. a short line about the family firm since 1995). Map `--word-progress` from a `scrub: true` trigger with hidden opacity `0.2`, blur `6px`, offset `0.15em`, span about `150%` of the viewport; TreeWalker split so any `<em>` stays semantic (S1327). Reduced motion shows the full line.

14. Pinned scenes: few, finite, purposeful. At most two or three pinned scenes on the page, each `start: "top top"`, `end: "+=140%"` to `"+=280%"`, `scrub: 1.1` (S1322 range 0.8 to 1.4), `anticipatePin: 1`, `invalidateOnRefresh: true`; animate children, never the pinned element (S0186). Each pin carries one beat (S1328 scroll weight 0.7 to 1.8 vh per beat). No pinned "leak story" (owner ban). Every pin is removed in the reduced-motion branch (S0204, S1326).

15. Parallax depth layers everywhere, tuned per section. Use the S0204 speeds (background 0.2x, midground 0.5x, foreground 1.0x, floating 1.2x) through the S1322 pattern `y: () => innerHeight * speed`, `start: "top bottom"`, `end: "bottom top"`, `scrub: 1`, `invalidateOnRefresh: true`, with `data-speed` per layer (hero image `-0.18`). On `(max-width: 799px)` halve the distances (S0204 mobile sample `-50` vs `-200`). Only transforms; `will-change: transform` only on the moving layers.

16. Real proof as numbers, never invented. Counters and labels only from the fact list (4.9 stars, 295 Google reviews, BBB A+ since 2001, founded 1995, 24 towns, $2M liability, Owens Corning Platinum Preferred). Animate numbers with a scrubbed or `once` tween on a proxy object and write text in `onUpdate`; keep the final number in the HTML for no-JS and screen readers (S1328 integrity, S0330 manifest discipline).

17. Before/after (ba2 only). Side-by-side or crossfade as the owner set. A scrubbed crossfade is a two-frame S1326 sequence: sticky stage, one normalized progress, `autoAlpha` or `clipPath: "inset(0 0 0 X%)"` driven with `ease: "none"`; a drag version can use pointer events plus `gsap.quickTo` (Draggable is not in our bundle). Keep the "Before/After" meaning in real text, not only in the baked labels.

18. Ordered process as a progress line. If a section shows the real sequence (call, inspection, written line-item estimate, install), use S1325: semantic `<ol>`, base line plus `scaleY(progress)` fill measured between the first and last dot centers, `aria-current="step"` on the reached step only, left rail on mobile, full line under reduced motion.

19. Interactive SVG. Draw roof lines and icons with `pathLength="1"` and a GSAP tween on `strokeDashoffset` from `1` to `0` (no DrawSVG needed), scrubbed or `once`; morph only hand-authored paths with identical command structure via `attr: { d }`; inline SVG, explicit `viewBox`, `fill: none` strokes, SVGO without `cleanupIds`/`mergePaths` (S0407). Pointer reactions on SVG parts via `quickTo` on `x`/`rotation` with `svgOrigin` for shared pivots (S0181).

20. Custom cursor (global, not per version). One element moved by `gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" })` and `"y"` from `pointermove` `e.clientX/Y` (S0403, S0183), created inside its own `gsap.matchMedia()` gated on `(hover: hover) and (pointer: fine)` and no reduced motion. React to elements through delegated `pointerover` on `document` reading `data-cursor="..."` attributes, so version swaps need no rebinding and nothing leaks. Use `overwrite: "auto"` on cursor state tweens.

21. WebGL or canvas touches: one, light, gated. Pick Lane A (subtle depth field) from S0457, for example a soft shader or canvas grain/light sweep behind one photo; one shared context for the page (S0385), DPR `Math.min(devicePixelRatio, 1.5)` for any non-trivial shader, ambient loop capped at 30fps, IntersectionObserver + `visibilitychange` pause, `failIfMajorPerformanceCaveat: true`, `webglcontextlost` with `preventDefault()` flipping to a CSS fallback built first, `aria-hidden`, `pointer-events: none`, `isolation: isolate`, reduced motion draws one still frame. Its version's cleanup must stop the loop and release GL resources; never `Math.random()` per frame. Headline and phone must read in under 3 seconds (gate 1).

22. Reduced motion is a full branch, not `duration: 0` everywhere. In every INIT, `if (reduce)` render the static final state (`gsap.set(..., { autoAlpha: 1, clearProps: "transform" })`), create no pins, no scrubs, no Lenis, no WebGL loop; versions still switch instantly. A visible in-page "motion" toggle can call `gsap.matchMediaRefresh()` (S0181) if added.

23. Performance budget. Prefer `ScrollTrigger.batch()` for photo grids (`interval: 0.1`, `batchMax: 4`); stagger instead of per-item tweens; refresh only on real layout change (load, fonts, version switch); pause off-screen loops; keep total live ScrollTriggers small (each version should create only what it shows). Never animate width/height/top/left (S0183).

24. Verification. Add the S0403 seek harness (`?t=N` pauses the intro timeline) for deterministic screenshots of the hero intro; check every section at 390/768/1024/1440, forward and reverse, fast flick, and flip 1 to 2 to 3 to 1 in each section while scrolled mid-section and inside a pin: no jump, no orphan pin spacer (`document.querySelectorAll(".pin-spacer").length` matches the live pins), `ScrollTrigger.getAll().length` returns to the same count after a full cycle, console clean.

---

## Reading log

Read in full with the Read tool (heading line to the line before the next skill), including every reference sub-section that is inside the library:
- S0181 gsap-core 87530-87786; S0187 gsap-timeline 89011-89120; S0186 gsap-scrolltrigger 88713-89010; S0184 gsap-plugins 88138-88573; S0188 gsap-utils 89121-89410; S0183 gsap-performance 88056-88137.
- S0403 iart-ai/gsap-web 147226-147455; S0447 MengTo/gsap 157798-157892 (incl. REFERENCES.md); S0448 MengTo/gsap-scrolltrigger-storytelling 157893-157948.
- S0204 scroll-experience 95033-95669 (incl. references/detailed-guide.md); S1322 cinematic-scroll-storytelling 424755-425229 (incl. REFERENCES.md, demo/PROMPT.md); S1326 425962-426100, S1327 426101-426223, S1325 425843-425961 (each incl. REFERENCES.md and demo/PROMPT.md); S1329 staggered-word-reveal 426659-426875 (incl. demo/PROMPT.md); S0451 MengTo/masked-reveal 158197-158355; S1328 scroll-world-storytelling 426224-426658 (incl. REFERENCES.md, demo/PROMPT.md, html-data, threejs and video PROMPT.md).
- S0407 iart-ai/svg-animation 148042-148213; S0385 flornkm/webgl-components 142760-142895; S0457 MengTo/webgl-landing-steering 159093-159222 (incl. REFERENCES.md).
- S0067 prototype 38109-38410 (incl. PICKER.md); S0082 variant 43762-44093 (incl. picker.md); S1474 parallel-concepts 441804-441840; S0330 danny/explore-design 133049-133153.
- Also skimmed v5/RUN-PLAN.md for the owner's facts, photo list and bans, so the implications match them.

Not available in the library (referenced by the skills but not included; searched for by name): S0403 `references/scrolltrigger-lenis.md`, `references/scrolltrigger-cookbook.md`, `examples/standalone-template.html`, `examples/hero-timeline.js`; S0407 `references/svg-techniques.md`; the `demo/index.html` files of S1322, S1325, S1326, S1327, S1328, S1329; S0385 `scripts/gpu-probe.html`; S0330 `references/implement.md`, `references/brand-init.md`, `scripts/scan-brand.sh`, `_template.html`.

Skipped on purpose: S1321, S1323, S1324 (already read by the lead). No command a skill mentions was run (npm, ffmpeg, playwright, python http.server, chrome --disable-gpu, scan-brand.sh), and nothing was installed or registered.

Discrepancies flagged: S0186 horizontal sample typo (`Max.max`, pixels into `xPercent`); S0186 refreshPriority direction vs the official docs; S0451 calls SplitText paid (it is free, S0184); MorphSVG `smooth`/`curveMode` need 3.14 (we have 3.13); S1322 word blur vs S0451/S0204 paint-cost caution.
