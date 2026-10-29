# DEEP READS — SLICE 6 (queue 352–421, 33 entries)

Compiled 26 Oct 2026. Method per entry: curl of page HTML + same-host JS/CSS bundles (`code-source/fetch_and_mine.sh`, one host per site, cross-host assets skipped and counted — except 411, where the site's own main bundle lives on its platform CDN and ALLOW_CDN was set for that one claim), Codrops demo zips/directories fetched from tympanus.net itself, React Bits component source taken from the site's own shadcn registry JSON (reactbits.dev/r/<Name>-TS-TW.json), Behance entries are design-post evidence (no live code exists — labelled Stated throughout). Evidence labels: Measured (in fetched source) / Seen (Level 2 live inspection) / Stated (author's own post) / Inferred. Extracts live in `code-source/<slug>/`. Screenshots: none embedded (supporting only, per standing rule).

Route log summary: every entry reached. Two tooling faults found and routed around, both logged in-entry: (a) the miner resolves relative asset URLs against the origin root, which 404s on subpath sites (421 — fixed by a direct subpath fetch); (b) the miner's download loop silently produced zero files for 413 — fixed by direct same-host curl of the theme's own CSS/JS.

---

## 352 · SVG Filters 101 — Codrops (Sara Soueidan, 15 Jan 2019)
Source: https://tympanus.net/codrops/2019/01/15/svg-filters-101/ — article HTML curled and its 109 code blocks extracted and read in full. There is no separate demo file; the article IS the source.

**What it teaches (the SVG-library foundation entry).** An SVG filter is a chain of *primitives* (all prefixed `fe`), each taking an `in`, writing a named `result`, and passing it on; unnamed results auto-feed the next primitive. Built-in inputs: `SourceGraphic`, `SourceAlpha` (alpha channel only — for a JPEG, a black rectangle the size of the image).

**The bank's drop-shadow recipe (Measured, verbatim from the article's worked example):**
1. `<filter id="filter">` — region defaults: `x="-10%" y="-10%" width="120%" height="120%" filterUnits="objectBoundingBox"`. Anything outside the region is clipped; widen the region for big blurs/offsets.
2. `<feGaussianBlur in="SourceAlpha" stdDeviation="10" result="DROP"/>` — blur the alpha silhouette. (Spelling watch: `stdDeviation`, not "stDeviation".)
3. `<feFlood flood-color="#000" result="COLOR"/>`
4. `<feComposite in="DROP" in2="COLOR" operator="in" result="SHADOW1"/>` — colour clipped inside the blurred alpha = a coloured shadow.
5. `<feComponentTransfer in="SHADOW1" result="SHADOW"><feFuncA type="table" tableValues="0 0.5"/></feComponentTransfer>` — halves the shadow's alpha.
6. `<feMerge><feMergeNode in="SHADOW"/><feMergeNode in="SourceGraphic"/></feMerge>` — shadow under the original. Order in feMerge = paint order.
Variant in the same article: `<feOffset in="SourceAlpha" dx="20" dy="20"/>` to displace the shadow before compositing. Opacity can equally be cut with `feColorMatrix type="matrix"` by scaling the alpha row (row 4).

**Rebuild notes.** Name results in CAPS for readability (article's own convention). Any two results can feed any later primitive regardless of DOM order. Library-ready: drop shadow = blur(SourceAlpha, 10) → flood → composite "in" → feFuncA table "0 0.5" → offset (optional) → merge under SourceGraphic.
**Reduced-motion / mobile:** n/a (static filter); filters are GPU-cheap at these sizes, avoid animating stdDeviation on large areas.

## 353 · Modern Cleaning Service Website UI/UX Design — Behance (design-post evidence)
Source: https://www.behance.net/gallery/247805543/Modern-Cleaning-Service-Website-UIUX-Design (published 18 Apr 2026; post text text-fetched in full). **No live client site exists** — this is a design blueprint, all values Stated.

**Blueprint (Stated in post + Level 2 record).** Minimal, bright identity — white / light gray with green-blue accents "fresh and reliable". Homepage: bold hero with dual CTA (book a service / request a quote) → service cards with short descriptions and direct booking actions → About → Booking/Quote → Testimonials → Contact. Usability devices named in the post: sticky navigation bar, smooth scrolling, subtle hover effects, mobile-first layout, strong visual hierarchy.
**Level 2 record adds the conversion furniture (Stated):** WordPress + Elementor + WooCommerce build; scarcity top bar ("4 available slots this week"); rating-badge hero (Google/Yelp 4.9); differentiator row; **frequency-toggle pricing — 1BR $89 / 2BR $105 / 3BR $119**; "How It Works — book in under 60 seconds".
**Bank use.** This is the cleaning-trade homepage skeleton: scarcity bar → rating hero → service cards with per-card booking → frequency-toggle price table (one-time vs recurring is the cleaning industry's pricing axis) → testimonials → booking page. The toggle is the transferable mechanism: one control re-prices every card, so the visitor compares frequencies, not competitors.
**Honesty:** no code, no timings, no live URL — nothing here is Measured. Treat as layout/copy evidence only.

## 354 · App Showcase with Grid Overlay — Codrops Blueprint (1 Apr 2013)
Source: article https://tympanus.net/codrops/2013/04/01/app-showcase-with-grid-overlay/ + the article's own demo zip (tympanus.net/Tutorials/AppShowcase/AppShowcase.zip, 45 files) unpacked and mined. jQuery-era; vanilla rewrite trivial (one class toggle + attribute swaps).

**Mechanism (Measured from the zip).** A phone mockup centred in a 3D scene; clicking it flips the whole wrapper to a fanned grid of app screens; clicking a screen loads it into the phone and flips back.
- Stage: wrapper `perspective: 1000px` (9 declarations across the variant CSS files). Device frame 288×611px (iPhone image), centred.
- Grid state = one class: `.ac-wrapper.ac-gridview`. In grid state the device gets `transform: translateZ(-350px); opacity: .6` — it recedes and dims while the grid comes forward.
- Grid screens rest at `translateZ(0)` and fan with `rotateY(-20deg)` / `rotateY(20deg)` on alternating sides.
- All motion is CSS: `transition: all 0.3s ease` (×18) and `all 0.2s ease` (×9). No keyframes, no beziers, no JS animation.
- JS (appshowcase.js, ~40 lines): `showGrid()` adds `.ac-gridview` and binds a body click to close; `showScreen($screen)` removes the class and swaps the device `img src` + title text from the clicked screen's `img`/`span`. A second variant (appshowcase_3.js / index3.html) ships in the same zip.
**Rebuild recipe (vanilla).** Container perspective 1000px → device absolutely centred → grid of thumbnails in the same 3D space → toggle class: device translateZ(-350px) opacity .6, thumbnails rotateY(±20deg) → click thumbnail: swap main image/title, remove class. Transition everything 0.3s ease.
**Mobile / reduced-motion:** demo shrinks the device to width:100% under its small-screen media query; grid fan is desktop-shaped — on phones, drop the rotateY fan and keep the recede+swap. `prefers-reduced-motion`: 0 occurrences (2013).

## 356 · Responsive CSS Timeline with 3D Effect — Codrops Blueprint (19 Nov 2012)
Source: article https://tympanus.net/codrops/2012/11/19/responsive-css-timeline-with-3d-effect/ + demo zip (tympanus.net/Tutorials/3DTimeline/3DTimeline.zip) unpacked and mined. **Pure CSS — the zip contains zero JS** (only a Modernizr build for feature detection). The whole interaction is the `:checked` sibling selector.

**Mechanism (Measured from style.css).** A vertical timeline where each event is a hidden radio input + label; checking it opens that event's card in 3D.
- `.content-perspective { perspective: 600px }` per event.
- Closed card: `transform: rotateY(10deg)` with the thumb at `scale(0.8)`. Checked: card goes to `rotateY(-5deg)`, thumb to `scale(1)` — a 15° swing through the flat plane reads as the card turning toward you.
- The swing's timing is the signature: `transform 0.8s cubic-bezier(.59,1.45,.69,.98) 0.2s` — an overshoot bezier (y1 = 1.45) plus a 0.2s delay, so cards settle with a soft bounce.
- Body text expands via `max-height` 0 → 260px, `transition: max-height 0.5s linear, color 0.3s linear`, with `transition-delay: 0s, 0.6s` on the checked state so the colour fades in after the height opens. Card shadow: `box-shadow 0.8s linear 0.2s`.
- Accent swap on check: default `#41838e` → checked `#F26328` (line, headings, border, and the ✓ marker `content: '\2714'` in the label's :after, ringed by `box-shadow: 0 0 0 5px rgba(255,255,255,.8)`).
- Base transitions: `all 0.6s ease-in-out 0.2s` (×5).
- Radios = one event open at a time; swapping the inputs to checkboxes makes it multi-open (article variant).
**Breakpoints (Measured).** ≤850px: heading 20px / body 14px. ≤540px: the timeline spine moves to `left: 50px`, events lose right padding — the phone layout keeps the 3D card, just re-spines it.
**Bank use.** "How it works" / company-history / project-phase timeline for trade sites — zero JS, works inside an Elementor HTML widget as-is. **Reduced-motion:** 0 occurrences (2012) — when reusing, add a media query that kills the rotateY and the bounce bezier.

## 357 · Responsive Full Width Tabs — Codrops Blueprint (21 Mar 2014)
Source: article https://tympanus.net/codrops/2014/03/21/responsive-full-width-tabs/ + live demo directory (tympanus.net/Blueprints/FullWidthTabs/) fetched file-by-file. Component: `cbpFWTabs.js` **v1.0.0, MIT licence** (header in source) — free to reuse commercially.

**Mechanism (Measured).** Deliberately minimal: the JS does class bookkeeping only, all presentation is CSS.
- `new CBPFWTabs(el, { start: 0 })` — the single option is the initially open tab index.
- `_init()` collects `nav > ul > li` tabs and `.content > section` panels; `_show(idx)` clears `tab-current` / `content-current` from the previous pair and sets them on the new pair. Panels are `display:none` except `.content-current { display:block }` — a hard swap, no fade in the shipped CSS (add your own opacity transition if wanted).
- Tab bar: full-width flex row, icon + label per tab (icon font classes `.icon-food/.icon-lab/.icon-cup/.icon-truck/.icon-shop` in the demo).
- Responsive (Measured): at **≤52.375em** the text labels are hidden (`.tabs nav a span { display:none }`) and tabs become icon-only; at **≤32em** the demo's 3-column `.mediabox` content stacks. Known quirk from Level 2: a 6th tab wraps the row — plan for 4–5 tabs.
**Bank use.** The services-tabs standard for trade homepages (e.g. Roofing / Repairs / Maintenance / About): full-width, icon-labelled, phone-collapses to icons. Pair with 356's accent-swap idea (current tab takes the brand accent) — not in the original; that's our addition, labelled as such.
**Reduced-motion:** none in source (nothing moves except the swap).

## 361 · Horizontal loop project tiles — CodePen (GreenSock pen xxQaRoX)
Source: https://codepen.io/GreenSock/pen/xxQaRoX — full JS returned by text-fetch (553 lines) and read end-to-end; this is GreenSock's official `horizontalLoop` helper, the canonical seamless-loop implementation. CSS pane was not in the fetched view — tile styling below is from the Level 2 record (Seen), JS values are Measured.

**Call site (Measured):**
```js
horizontalLoop(gsap.utils.toArray(".project-tile"), {
  paused: false, speed: 2, draggable: true, center: true,
  repeat: -1, paddingRight: 150,
  onChange: (el, i) => { /* swap .active class to el */ }
});
```
**Mechanism (Measured, from the helper source).**
- `pixelsPerSecond = (config.speed || 1) * 100` → speed 2 = **200 px/s**.
- Each item gets two tweens on one timeline with `defaults: { ease: "none" }`: a `.to()` carrying it left by its own loop distance (`duration = distanceToLoop / pixelsPerSecond`), then a `.fromTo()` teleporting it to the far right and travelling back — the pair sums to exactly one full loop width, so the seam is invisible. Positions are converted to `xPercent` (snapped via `gsap.utils.snap(config.snap || 1)`) so the loop survives resizes; `refresh(true)` re-measures on window resize.
- `center: true` offsets times so the "current" item is the one at container centre; `tl.closestIndex()` + `onUpdate` fire `onChange` — that's the hook that moves the `.active` class (Level 2 Seen: active tile is full-brightness, others `brightness(0.7)`; tiles are 30em images with 150px right margin = the paddingRight).
- API on the returned timeline: `next(vars)`, `previous(vars)`, `toIndex(i, vars)` (takes the shortest wrap direction), `current()`.
- Dragging needs **Draggable + InertiaPlugin (GSAP Club plugins)** — proxy element, `ratio = 1/totalWidth`, snap-to-nearest-item on throw, `overshootTolerance: 0`. Without a Club licence, drop `draggable` and the loop still autoplays; add plain pointer drag yourself if needed.
- Pre-render trick at the end: `tl.progress(1, true).progress(0, true)` to force first-frame layout.
**Bank use.** The before/after and project-gallery carousel for trade sites: centred active tile, caption swaps via onChange. **Reduced-motion:** none in the pen — gate the autoplay behind a media check when reusing.

## 362 · Creative CSS Loading Animations — Codrops (Kitty Giraudel, 14 Nov 2012)
Source: article https://tympanus.net/codrops/2012/11/14/creative-css-loading-animations/ + demo zip (tympanus.net/Tutorials/LoadingAnimations/LoadingAnimations.zip) unpacked and mined. **Pure CSS — zero JS in the zip.** Five demos (index.html … index5.html), 14 keyframe sets mined.

**The recipes (Measured from style.css).**
1. **Sphere-in-bar:** a dot travels a 10em × 1em bar — `animation: slide 1.75s ease-in-out infinite alternate` (keyframes translate it across; alternate = there-and-back, no jump).
2. **Rotating spinner:** pseudo-element ring, keyframes `rota` stepping 25%→270deg, 50%→90deg (the uneven steps fake acceleration).
3. **Four-dot spinner:** two paired animations with deliberately mismatched periods — `rota 1.13s linear infinite` + `opa 3.67s ease-in-out infinite alternate` on one element, `1.86s / 4.29s`, `1.45s / 5.12s`, `1.72s / 5.25s` on its siblings. Because rotation and opacity cycles never share a period, the combined pattern doesn't visibly repeat for a long time — the cheapest "organic" loader trick in the set.
4. **Gears / letters:** `steam 3.5s linear infinite` and its `reverse` twin (counter-rotating pair); a 7-letter word staggers by 14.28% keyframe steps.
5. **Bokeh / clock:** `blink 1s steps(1, start) infinite` paired with `counter-clock 8s linear infinite` (rotate −360deg); `mask 3s infinite alternate`; `loading-1 1.5s ease-out infinite` bar.
**Bank use.** Single-file loading states for quote forms, image areas and page transitions — copy keyframes + one class. All em-sized, so they scale with the local font-size. **Reduced-motion:** 0 occurrences (2012) — wrap in a no-preference media query when reusing; a loader the user asked to still is worse than no loader.

## 363 · Creative Loading Effects — Codrops (18 Sep 2013)
Source: article https://tympanus.net/codrops/2013/09/18/creative-loading-effects/ + demo zip (tympanus.net/Development/CreativeLoadingEffects/CreativeLoadingEffects.zip) unpacked and mined. Six full-screen/page loading effects, each a single element with a `.la-anim-*` class; a tiny classie.js helper toggles `.la-animate` to start. The article itself states these are inspiration dummies, not production code (author's own caveat, Stated).

**Timed recipes (Measured from component.css) — the value is the choreography numbers:**
- **Top-bar / fill effects:** `transition: transform 5s ease-in, opacity 1s 5s` — a 5-second ease-in fill, then a 1s fade that only starts at the 5s mark (delay = duration; the fade can never overlap the fill).
- **Border-draw box (la-anim-10 style):** four sides drawn in sequence with 1.35s linear segments at delays **0.3s → 1.65s → 3s → 4.35s** (width, height, width, height), then `border .3s, opacity .3s 5.7s` — total cycle ≈ 6s, each side starts exactly when the previous ends (1.35 + 0.3 offset cadence).
- **Percentage counter:** `animation: counter 6s steps(10)` — counts in 10 discrete steps over 6s.
- **Spinners:** `rotation 3s linear infinite` and a `1s` fast variant.
- Trigger pattern: add class → transitions run → remove class on transitionend to reset.
**Bank use.** Page-load and form-submit feedback for trade sites: the 5s-fill-then-fade bar and the border-draw are the two worth taking; both are one element + one class. **Reduced-motion:** 0 occurrences (2013).

## 364 · CSS-Only Marquee Effect — Codrops (31 Mar 2020)
Source: article https://tympanus.net/codrops/2020/03/31/css-only-marquee-effect/ + live demo directory (tympanus.net/Development/CSSMarqueeMenu/) fetched. The demo is a menu whose hovered item starts a giant background marquee — but the marquee mechanism is fully general and CSS-only.

**Mechanism (Measured from base.css).**
- CSS variables drive everything: `--marquee-width: 100vw; --offset: 20vw; --move-initial: calc(-25% + var(--offset)); --move-final: calc(-50% + var(--offset)); --item-font-size: 10vw`.
- The track holds the content repeated (4 copies in the demo); the loop distance is exactly 25% of the track (one copy), so translating from −25% to −50% wraps seamlessly:
```css
@keyframes marquee {
  0%   { transform: translate3d(var(--move-initial), 0, 0); }
  100% { transform: translate3d(var(--move-final), 0, 0); }
}
.marquee__inner { width: fit-content; display: flex;
  transform: translate3d(var(--move-initial),0,0);
  animation: marquee 5s linear infinite; animation-play-state: paused; }
```
- The 20vw offset is the subtle part: starting at −25%+20vw keeps a word partially visible at rest instead of an empty gap.
- In the demo the marquee is hover-gated: `.menu__item-link:hover ~ .marquee .marquee__inner { animation-play-state: running; opacity: 1; transition-duration: 0.4s; }` — paused and transparent until wanted. A film-grain overlay (`@keyframes grain 8s steps(10) infinite`) textures the page.
**Rebuild recipe (general marquee).** Track = N identical copies; set `--move-initial: calc(-100%/N + offset)`, `--move-final: calc(-200%/N + offset)`… in the demo's terms: start at minus one copy, end at minus two copies, `linear infinite`, duration by eye (5s at 10vw font = fast; a logo strip wants 20–40s — cf. 374). Remove the hover gate for an always-on strip.
**Reduced-motion:** 0 occurrences in the demo CSS — an always-on marquee must ship with a pause (hover at minimum, plus a media query) when reused.

## 366 · Expanding Rounded Menu Animation — Codrops (15 Mar 2022)
Source: article https://tympanus.net/codrops/2022/03/15/expanding-rounded-menu-animation/ + live demo (tympanus.net/Development/ExpandingRoundedMenu/) bundles fetched and the minified GSAP timeline read directly. GSAP timeline + a CSS-shaped menu panel (demo palette Measured: `--color-bg:#0c0c0c`, `--color-bg-menu:#ee8233`, `--border-radius:2rem`).

**The open timeline (Measured, de-minified):**
```js
gsap.timeline({ defaults: { duration: 1.2, ease: "power4.inOut" },
  onComplete / onReverseComplete: clear isAnimating })
  .addLabel("start", 0)
  .add(() => menu.classList.toggle("menu--open"), "start")
  .to(cover.wrap,  { duration: 1.6, ease: "power3.inOut", startAt: { scale: 1.1 }, scale: 1 }, "start")
  .to(cover.outer, { startAt: { y: "-100%" }, y: "0%" }, "start")   // double-layer cover slide:
  .to(cover.inner, { startAt: { y: "100%" },  y: "0%" }, "start")   // outer and inner counter-slide
  .to(content.imgs,   { y: i => (i % 2 == 0 ? -20 : 20) + "%" }, "start")  // alternating parallax
  .to(content.titles, { y: i => (i % 2 == 0 ? 20 : -20) + "%" }, "start")  // opposite direction
  .addLabel("menu", 0.5)
  .to(menuContent, { duration: 1, startAt: { y: "-100%" }, y: "0%" }, "menu")
  .addLabel("extra", "menu+=0.6")
  .set(extra, { y: "400%", opacity: 0 }, "start")
  .to(extra, { duration: 0.5, ease: "power4", startAt: { opacity: 1 }, opacity: 1, y: "0%" }, "extra");
```
Close = the same timeline `reverse(0)`; an `isAnimating` flag locks both buttons mid-flight, and clicking a menu link is ignored unless closed (`isOpen` guard in the handler). CSS side: panel morphs via `transform .3s` transitions and the 2rem radius; a `loaderAnim .7s linear infinite alternate` runs the preloader.
**Why it works (rebuild notes).** Three layers move at three durations (cover 1.6s, panel content 1.2s default, menu body 1s starting at 0.5s) so the eye reads one gesture, not one block. The counter-sliding cover pair (outer −100%→0, inner +100%→0) is what makes the reveal feel "thick". Alternating ±20% on images vs titles gives depth without a 3D transform.
**Bank use.** Full-screen mobile menu for a trade one-pager. **Reduced-motion:** 0 occurrences in the bundles — add a fallback (instant class swap) when reusing.

## 369 · Smooth Vertical or Horizontal Page Scrolling with jQuery — Codrops (2 Jun 2010)
Source: article https://tympanus.net/codrops/2010/06/02/smooth-vertical-or-horizontal-page-scrolling-with-jquery/ + demo zip (tympanus.net/Tutorials/WebsiteScrolling/WebsiteScrolling.zip) unpacked. The oldest entry in the slice; banked for the pattern, not the code.

**Mechanism (Measured from index.html / index_vertical.html).**
```js
$('ul.nav a').bind('click', function (event) {
  var $anchor = $(this);
  $('html, body').stop().animate({
    scrollLeft: $($anchor.attr('href')).offset().left   // horizontal variant
  }, 1000);
  event.preventDefault();
});
```
- Duration **1000ms**, jQuery's default swing easing. The commented alternative in the same file: `1500, 'easeInOutExpo'` using the bundled jquery.easing.1.3.js (easeInQuad … easeInOutExpo family).
- `.stop()` first = a second click mid-scroll retargets instead of queueing.
- Vertical variant is identical with `scrollTop` / `.offset().top`. No-JS fallback: plain anchor jumps + native scrollbar (article Stated).
**Modern rebuild (our translation, labelled).** `scroll-behavior: smooth` on html + `scroll-margin-top` on sections (so a sticky header doesn't cover the target) reproduces this in zero JS; use the JS route only when you need the expo easing or offset control. **Reduced-motion:** `scroll-behavior` honours the media query if you gate it: `@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth } }`.

## 372 · Glare Hover — React Bits
Source: component page https://reactbits.dev/animations/glare-hover (text-fetch: tagline + install only — the page is JS-gated) + **full component source from the site's own shadcn registry**, https://reactbits.dev/r/GlareHover-TS-TW.json (same host; 11,287 chars of TSX, read in full). This supersedes the Level 2 props-table record and corrects it in one place: the current component has more modes than the L2 table showed.

**Defaults (Measured from source):** `glareColor '#ffffff'`, `glareOpacity 0.5`, `glareAngle -45`, `glareSize 30`, `softness 0.6`, `variant 'streak'` (streak | twin | sheen), `mode 'hover'` (hover | follow | loop | click), `blendMode 'screen'`, `rimGlint true`, `transitionDuration 650` (ms), `interval 3` (s, loop mode), `playOnce false`, `intro false`, `borderRadius '10px'`, background/border transparent.
**Mechanism (Measured).** No canvas, no gradient-tracking divs: the glare is a **33-stop linear-gradient generated from an analytic brightness profile**.
- Easing kernel: `smootherstep(t) = t³(t(6t−15)+10)`; a bump is `bump(t, center, half) = smootherstep(1 − |t−center|/half)` inside the half-width, else 0.
- Profiles: **streak** = `bump(t,.5,.06+.16·softness) + 0.32·bump(t,.5,.5)` (a hot core on a wide faint skirt); **twin** = bumps at .36 and .70 (weights 1 / .85) + .26 skirt; **sheen** = `.55·bump(t,.5,.25+.25·softness) + .3` skirt.
- The gradient is sampled at 33 points (`index/32`), each stop emitted as `color-mix(in srgb, <color> <alpha>%, transparent)` — so the sweep is one static gradient layer whose *position/rotation* animates (650ms transition), not a per-frame repaint. A rim-glint mask (RIM_MASK) adds the edge flash. Sweeps are rAF-driven state objects {from, to, start, duration}.
- **Reduced-motion: implemented in source** — the component checks `matchMedia('(prefers-reduced-motion: reduce)')` (Measured). One of only two entries in this slice with it in the actual code.
**Vanilla translation (for our single-file builds).** Precompute the same 33-stop gradient in CSS at build time (softness .6 → core half-width .156), rotate −45°, blend screen, sweep background-position on hover over .65s. The math above is all you need; the React wrapper is incidental.

## 374 · Logo Loop — React Bits
Source: component page https://reactbits.dev/animations/logo-loop + full source from https://reactbits.dev/r/LogoLoop-TS-TW.json (44,218 chars TSX, read in full). Far more engineered than a CSS marquee: a rAF engine with velocity smoothing, drag/fling, step mode, curved layouts and a magnify lens.

**Defaults (Measured from source):** `speed 120` (px/s), `direction 'left'` (left|right|up|down), `logoHeight 28`, `gap 32`, `fadeOutWidth 0.12` (fraction of width, each edge), `pauseOnHover` → hover speed 0 (via `hoverSpeed` override), `scaleOnHover false`, `layout 'line'` (line|wave|arc|orbit), `bend 0.5`-family geometry for curved layouts, `draggable` on, `scrollBoost 0`, `intro` on. (Level 2's Customize-panel values — speed 100, height 48, gap 56 — are the site's demo settings, not defaults.)
**Engine constants (Measured):** velocity smoothing `SMOOTH_TAU 0.25`, glide `GLIDE_TAU 0.8` (exponential approach `v += (target−v)(1−e^(−dt/τ))`), `DRAG_THRESHOLD 6`px, `MAX_FLING 4000` px/s, intro `INTRO_TIME 0.7`s with `INTRO_STAGGER 0.45`. Offset wraps modulo the loop period; copies are computed from measured content width so the seam never shows. Magnify lens eases with τ 0.12 in / 0.25 out and pointer tracking τ 0.06. Step mode: hold → move one item with easeInOut → hold (timings from `stepTiming()`).
**Reduced-motion: implemented** — `matchMedia('(prefers-reduced-motion: reduce)')` is read into engine state and disables step/magnify behaviour (Measured).
**Bank use + honest scope.** As a React component it's a dependency; the *pattern* is what transfers to our single-file builds: duplicate the strip, translate at constant px/s, wrap modulo one copy width, fade the outer 12% at both edges, pause on hover. The engine's τ-smoothing numbers are the upgrade worth stealing for drag-enabled strips: 0.25s approach for velocity, 0.8s glide after a fling.

## 380 · Alejandro HA — Web Developer — alejandroha.com
Source pass: `code-source/alejandro-ha/` (HTML 96K + 4 same-host assets, JS 32K / CSS 80K mined). Stack correction to Level 2: L2 inferred "Webflow + Barba.js"; the fetched bundles **Measure GSAP (120 refs) + ScrollTrigger (13) + SplitText (5)** with custom ease names — Barba was not found in the same-host JS, so the page-transition claim stays unconfirmed. Custom eases named `osmo` (×5) and `button-007-ease` (×3) point at an Osmo-style Webflow + custom-code build.

**Parameters (Measured).** Eases: `none` ×15 (scrubbed work), `power1.inOut` ×5, `power4.out` ×4, `power3.in` ×2, `expo.out` ×2, one `elastic.out(2, 0.6)` and one `back.in(1.5)` for accents. Durations cluster at **1 / .8 / .75** (long tail .35–1.5; one 24s ambient loop). Staggers: .15, .1, {each:.03}, .055, .03, .025 — fine-grained text staggers. ScrollTrigger: **scrub true ×8, scrub 1 ×2**; starts `top top` ×5, `top bottom` ×4, `top 85%` ×2, `top 60%`; ends `top 40%` ×2, `bottom top` ×2. CSS: 1 keyframes set, 1 cubic-bezier, clip-path ×1, **prefers-reduced-motion 0**.
**Structure (Seen, Level 2).** Hero with 2 CTAs (book a call / get a quote) → About → Services numbered 01–04 → Projects carousel 01–05 with prev/next → Certifications & Partnerships strip (Webflow + Shopify Partner) → Contact.
**Bank use.** The skeleton transfers whole to a trade homepage; the motion recipe to copy is the restraint: scrubbed `none`-ease scroll work for structure, power4.out/expo.out for entrances, elastic/back kept to one accent each.

## 381 · Andrew Reff — Product Designer — andrewreff.com
Source pass: `code-source/andrew-reff/` (HTML 56K + 7 assets; React/Vite build — react bundle 228K, main bundle 120K). Palette black/white only (Seen).

**The hero is a state-driven WebGL orb (Measured from main-*.js).** A custom shader carries uniforms `uRippleSpeed, uRippleIntensity, uWaveFreq, uGlow, uRotation, uPulse`, and the bundle ships **named state presets** that retarget them:
- default-ish state: rippleSpeed (first value cut in minified source) — full sets read: **listening** {rippleSpeed 3.5, rippleIntensity 1.3, waveFreq 7, glow 1.1, rotation .2, pulse .3}; **processing** {1.2 / (intensity in the same band) / waveFreq 10, glow 1.4, rotation .8, pulse 1}; **speaking** {3 / 1.8 / 6 / 1.7 / .45 / 1.2}; a fourth set {waveFreq 3, glow .8, rotation .25, pulse .5}.
Read: the orb is the visual state machine for the site's AI-conversation feature — voice states (listening/processing/speaking) are literally shader parameter sets. That's the mechanism to bank: **one shader, N named uniform presets, tween between presets on state change.**
**CSS layer (Measured).** Beziers `cubic-bezier(.76,0,.24,1)` ×2 (the expo-like workhorse), `(.2,.7,.2,1)`, `(.16,1,.3,1)`; keyframes `ask-in, ask-bar, ask-pulse, nether-rise, link-sweep, consent-in`; font Söhne; **prefers-reduced-motion ×2 in CSS** plus a footer **Reduce motion button** and Sound toggle (Seen, Level 2) — user-controlled motion, rare and worth copying.
**Structure (Seen).** Brands row (17 logos) with a **Pause the brands** button → 4 featured case films → Approach (4 steps) → All work with **GRID / INDEX toggle** (9 items) → career chapters → footer with the AI opener.
**Bank use.** Grid/Index toggle for project galleries; pauseable logo row (accessibility as a visible control); shader-preset state machine if a hero ever needs modes.

## 382 · Avec Anni — avecanni.studio
Source pass: `code-source/avec-anni/` — HTML 368K, **zero external JS/CSS assets**: this is a **Framer** site (Measured — `framer` ×4,403 in the HTML, `__framer__appearAnimationsContent` and `__framer__breakpoints` JSON blocks embedded). Level 2's "Framer" inference is confirmed and now parameterised.

**Parameters (Measured from the embedded Framer JSON).**
- Breakpoints: `≥1200px`, `810–1199.98px`, `≤809.98px`.
- Every appear animation on the page uses one recipe: initial `opacity 0.001` (all transforms 0), animate to `opacity 1`, transition **`{ type: "spring", bounce: 0.2, duration: 0.4, delay: 0 }`** — six identical instances across the breakpoint variants. So the whole site's entrance language is a 0.4s low-bounce spring fade; the richness is in layout, not motion variety.
- The appear-animation runtime script is emitted with `data-framer-appear-animation="no-preference"` — Framer's own reduced-motion-aware loader (the animations are preference-gated by the platform).
- No canvas on the page (canvas ×0) — the "interactive image trail" (Awwwards element, Seen) runs through Framer's DOM layer in the platform runtime, which is not in the fetched HTML; its parameters are therefore **not** quoted here.
**Structure (Seen, Level 2).** Nav of 4 (Cases/Services/About/Inquire) → hero over stacked image trail → work list (5 projects) → Services: exactly **two** (01 Brand identity, 02 Website design) → founder note → repeated low-pressure talk CTA → footer.
**Bank use.** Two transferable disciplines: (1) one entrance recipe site-wide (spring, bounce .2, .4s, fade-only) — consistency as brand; (2) the two-services-no-filler structure, the cleanest trade-homepage skeleton in this slice.

## 388 · Gallery Play® — gallery-play.be
Source pass: `code-source/gallery-play/` (HTML 540K + 23 same-host assets, JS 760K webpack bundle mined). Stack: WordPress + Contentful per Level 2 (Inferred); the bundles **Measure GSAP + ScrollTrigger (14 refs) + Lenis (50 refs) + Swiper (460 refs)** — a WP site with a serious JS motion layer.

**Parameters (Measured).** Custom ease names dominate: **`slow.out` ×8, `slow.inout` ×3** (registered CustomEase-style names — the house ease), then `power3.out` ×2, `power2.out/in`, `expo.inOut`, `none` ×4. Durations: **1 ×9, 3 ×5, 1.2 ×4**, .9/.4/.3 supporting. ScrollTrigger starts cluster at **`top 95%` ×6** (reveals fire almost as elements enter), with `top 90/80/50/0%` variants; **scrub: true ×9**. Staggers: 1 (whole-second stagger on a headline system), {amount: 1}, 0.1.
**Structure (Seen, Level 2).** Nav (Projects/Services/Athletes/Team/Contact/Faq) → hero + 13-logo carousel → word-by-word positioning statement → audience cards (For Brands / For Athletes / For Clubs & Federations, 3 bullets each) → tabbed players slider (All / Exclusive; 14 athletes, list repeated ×3 for the loop) → letter-by-letter paragraph → Team (2) → CTA → contact form → FAQ (5) → footer. Interactive heatmap + mouse-follower image trail (Awwwards elements, Seen). Level 2 also logged a first-load blank/black render that cleared on reload — a preloader/canvas weight warning worth keeping with the entry.
**Bank use.** The `top 95%` + slow.out reveal system is a complete, gentle agency-motion recipe; the audience-card trio (one card per customer type, 3 bullets each) maps directly to homeowner / landlord / commercial cards on a trade site.
**Reduced-motion:** 0 occurrences in the fetched bundles.

## 389 · GMX Digital — gmxdigital.com/en
Source pass: `code-source/gmx-digital/` (HTML 60K + 12 same-host assets; JS ~170K / CSS ~159K across hand-named files — cinema-shader.js, hero-compositor.js, edition.js, matter.js — vanilla JS + WebGL2 + CSS, no framework fingerprints). The most shader-forward entry in the slice.

**The cinema shader (Measured, from cinema-shader.js).** A GLSL ES 3.0 fragment shader (`#version 300 es`) generating animated smoke on the GPU — the file's own header: "generated smoke artwork, advected and eroded on the GPU. Not a video asset." Uniforms: `uSmoke, uGlass, uLogo` (samplers), `uResolution, uPointer`, `uTime, uDensity, uVelocity, uTransition, uRefraction, uOpacity, uIntro, uIntroPhase`, palette `uInk, uViolet, uMist`. Internals read: value-noise via hash `fract(p·(123.34,456.21))`, smooth interpolation `f·f·(3−2f)`, luminance `dot(c, (.299,.587,.114))` sampling the smoke texture. The **hero compositor** (hero-compositor.js) runs a second pass with uniforms `uBase/uNext` (+ their Rect/Transform pairs), `uReveal, uSmoke` — i.e. the base/atmosphere/film chapter switch (Seen as section 03) is a shader composite, not three stacked videos.
**CSS motion system (Measured).** A whole intro keyframe family: `intro-phase, intro-progress, intro-world, intro-mark, intro-line, intro-line-two, intro-smoke, intro-system, intro-light, intro-skip` + `grain, cue, client-flow`. Beziers: **`cubic-bezier(.16,1,.3,1)` ×6** (the house ease), `(.2,.72,.24,1)` ×2, `(.76,0,.24,1)`. Fonts: Space Grotesk, Syncopate, IBM Plex Mono, Inter. **prefers-reduced-motion ×8 in CSS** — plus **Reduce motion buttons in nav and footer** and a **PAUSE MOTION button on the client marquee** (Seen, Level 2): motion control as a visible design feature, three separate places.
**Structure (Seen).** Numbered chapters 01–10: films → why → engine comparison → projects → formats → digital → vertical 9:16 film carousel → working together (4 steps) + pausable client marquee → FAQ (4) → brief form with WhatsApp field + "Reduce motion" in footer.
**Bank use.** For a trade site: not the smoke itself but (1) the chapter-numbered long-page structure with a replayable intro, (2) pause/reduce controls on every moving element, (3) .16,1,.3,1 as a proven house bezier.

## 393 · loehx.com — Alexander Löhn
Source pass: `code-source/loehx/` (HTML 1.3M — heavy inline content — + 59 assets). Stack (Measured): **Astro + Tailwind + Three.js** references; the 2MB JS is dominated by embedded animation data (the `duration:1500` ×2,311 hits are Lottie-style keyframe data inside the bundles, **not** UI timings — do not quote them as such). Real UI timings in the code: .45 / .35 / .5 / .3 / .2s with `easeOut` ×5 / `easeInOut` named CSS-style easings.
**Structure & patterns (Seen, Level 2 — the harvest is structural).** Hero → **Skills/Experience accordion where every row carries a counted year total** (Web Dev 21yrs, Vue 8, React 5, AI 5, CMS 8…) → **Services/Availability cards stamped "NOW"**, one capped "up to 20h/w" → Selected work (FC Bayern shop, s.Oliver, Harrods, Beiersdorf) → dated project list 2011–2025 → partner block → Let's Talk → AI assistant chat widget. Per-letter-spaced typography throughout (letters as individual spans).
**Reduced-motion:** 12 occurrences in the homepage HTML incl. inline styles (Level 2 count).
**Bank use.** (1) Proof-per-row accordion: a roofer's version is services with "14 yrs / 300+ roofs" on each row — the count is the persuasion. (2) NOW-stamped availability with an hours cap = a printed response promise; scarcity that is specific beats "call us today". (3) Letter-spaced micro-type as a cheap brand texture.

## 394 · MAX MILKIN Portfolio — maxmilkin.com
Source pass: `code-source/max-milkin/` (HTML only 4K — a shell — + 2 assets totalling 2.1MB; JS 2.0M mined). This pass supersedes Level 2's cross-reference-only status: the stack is now Measured from the site's own bundle: **GSAP (63 refs) + ScrollTrigger (5)** in a single-page-app bundle; no Three.js/PixiJS strings in the fetched bundle, so L2's "Three.js/PixiJS + MotionPath" line (carried from Lane 1's earlier inspection of the same site) is **not confirmed by this fetch** — the letter-assembly may live in a lazily-loaded chunk this pass didn't pull. Quoted parameters below are from the fetched bundle only.

**Parameters (Measured).** House ease **`power3.out` ×16**, then `none` ×7, `power4.inOut` ×4, `power2.out` ×4, `power3.inOut` ×3. Durations: **.9 ×12** (the default move), 1.3/1.2 ×4 each, 1 ×3, plus 4s and 3s ambient pieces. Staggers: {each:.02} ×2, .15 ×2, .01/.015/.02 — letter-level stagger territory ({each:.02} at .9s power3.out is a headline-assembly recipe). ScrollTrigger: scrub true ×5, scrub 1 ×4; starts `top top`, `top 85%`, `top 75%`, plus percentage-pair starts (`90% 100%`, `65% 100%`, `60% 60%`) — image-based triggers, and pointerdown/pointerup appear as ScrollTrigger start/end values (a press-driven interaction).
**Bank use.** The .9s power3.out + .02 letter stagger is the takeaway for headline builds. Treat the MotionPath/Pixi claims as **pending a chunk-level re-fetch** if Lane 1 wants them re-verified.

## 395 · Portfolio by Shruti — portfoliobyshruti.com
Source pass: `code-source/portfolio-by-shruti/` (HTML 32K + 28 assets, JS 216K / CSS 88K). Stack (Measured): hand-rolled vanilla JS in own-named files (canvas-engine.js, element-placer.js, utils.js, config.js per Level 2) + **GSAP 3.12.5 + ScrollTrigger + Lenis** strings in the HTML. The site states on-page that it was built without Figma (mood board → Claude Code) — a process-transparency section as a trust device (Seen).

**Parameters (Measured).** The motion lives mostly in CSS: beziers **`cubic-bezier(0.65,0,0.35,1)`, `(0.25,1,0.5,1)`, `(0.16,1,0.3,1)`**; keyframes **`stickerFloat`, `stickerFloatAlt`, `dragHintBounce`**; will-change ×5; clip-path and backdrop-filter present; JS stagger 0.12 ×1. **prefers-reduced-motion ×3 in CSS** (Measured) — one of the few entries in the slice that ships it.
**The award element (Seen, Awwwards):** a **sticker preloader** — die-cut sticker graphics that peel/slide away. The float keyframes + drag-hint bounce are its supporting system: idle stickers drift (stickerFloat / Alt = two phases so neighbours don't sync), interactive ones bounce a drag hint.
**Bank use.** A brandable preloader pattern for a trade site (mascot/badge stickers instead of a generic spinner), and the float-pair trick: duplicate any idle-loop keyframe with an Alt phase offset to stop a row of elements moving in lockstep.

## 401 · WAM — wam.global
Source pass: `code-source/wam/` (HTML 172K + 5 assets; main.js is a 740K rollup bundle). Stack (Measured): **WordPress** (wp-content paths, jQuery + jQuery Migrate shipped) with a bundled app containing **GSAP + ScrollTrigger + Swiper (173 refs) + SplitText** strings. Honest limit: most of main.js is library code (it even contains a bundled `npm run cleanup && rollup -c --watch` string); site-level configs actually attributable to WAM are sparse: `stagger: { amount: .5 }` ×1, `start: "top 90%"`, `scrub: true` ×2, durations .5 / .3. Do not quote library internals as WAM's choices.

**Structure & pattern (Seen, Level 2 — the real harvest).** Hero "We are decoding meanings" → Who are we → Our solutions → "We speak in terms of success" → **case-study cards** (OMODA & JAECOO / Mahou / Würth / Riu Party / Druni / The Power), each card = **an outcome story headline + a one-line service tag** ("Media & Optimization to Grow", "CRM & Marketing Automation to Connect", "Commerce & Experience to Scale") + "Take me there" → SVG client logo wall (Isdin, Heineken, Mapfre, Iberia, Seur as .svg uploads) → YouTube hero media.
**Bank use.** The case-card formula transfers verbatim to trade proof: "The making of the [Town] re-roof" + "Roofing & Lead Generation to Grow" + photo pair. A full client wall in SVG (crisp, light) as the trust strip. Motion: deliberately modest — proof that the formula works on plain WordPress without an animation layer.
**Reduced-motion:** 0 occurrences.

## 403 · Fashion Photography Portfolio — Qasim Saidi (Behance design-post evidence)
Source: https://www.behance.net/gallery/240808181/Fashion-Photography-Portfolio-Custom-Web-Design — post text text-fetched in full. **No live site is linked in the project** — design-post evidence only, everything Stated, Fit penalised at Level 2 for exactly that reason.

**Blueprint (Stated).** Stack: Next.js / React on Vercel, lazy-loaded images, mobile-first, SEO structure, claimed <2s loads. Sections: hero with positioning statement **"Beautiful images that actually sell"** → featured campaign full-bleed showcases (Lifestyle / Jewelry / Fashion) → "Selected Work" grid → About → **"Ready to Elevate Your Brand?"** conversion section → contact form + social. Design system: minimal black-and-white aesthetic so the photography carries all colour; CTAs to email/phone repeated at every section boundary; portfolio organised by campaign type.
**Bank use (pattern-level only).** (1) Monochrome chrome + colour work: a job-photo grid where the site furniture is B&W and only the work is in colour. (2) The named conversion section — "Ready to Elevate Your Brand?" translates 1:1 to "Ready to fix your roof?" as the final block's headline instead of a bare "Contact us". (3) Above-the-fold positioning written as an outcome ("images that actually sell"), not a job title.
**Honesty:** no code, timings or live URL were available to measure; nothing here is Measured.

## 404 · Lory Photography — Website Design & Development (Behance design-post evidence)
Source: https://www.behance.net/gallery/250461477/Lory-Photography-Website-Design-Development (published 3 Jun 2026; post text text-fetched in full). No live URL extracted from the post — design-post evidence, Stated throughout. Level 2 scored this the single most on-brief entry in its chunk (Fit 5): it is Asiful's own stack doctrine, documented by another builder.

**The build (Stated in the post, quoted closely).** Belgian portrait/family/wedding photographer (Wielsbeke) with a strong Instagram audience and no website. Brief: feel like her work — "calm, honest, never busy" — and **let her run it herself after launch without ever opening a code editor**. Stack chosen for that: **WordPress + Hello Elementor + free addons only + custom CSS. "No Elementor Pro. No drag-and-drop carousels that break in two years. Every interaction was hand-rolled in clean CSS"**: sticky header, **pulsing availability badge**, FAQ accordion, comparison table, hover states, filterable portfolio.
**Brand system (Stated).** Warm palette — Lory Pink, Cream, Sand, Taupe, Pink Deep — with **DM Serif Display** and italic accents on closing words.
**Sections (Stated).** Sticky header → hero → filterable portfolio → comparison table → FAQ accordion → booking path.
**Bank use.** Four portable parts: (1) pulsing availability badge in pure CSS (a "now booking" live signal); (2) comparison table as the package picker on a service homepage; (3) filterable portfolio grid in vanilla CSS/JS; (4) the doctrine itself — lean stack, no licence burden, client-maintainable for years — which is a *sales argument* for Asiful's own offer, not just a build choice.
**Honesty:** no code was published with the post; CSS parameters (pulse period etc.) are not quoted because they were not available to measure.

## 405 · Animated Fragment Slideshow — Codrops / PiecesSlider (21 Feb 2018)
Source: article tympanus.net/codrops/2018/02/21/animated-fragment-slideshow/ + live demo (tympanus.net/Tutorials/PiecesSlider/) — demo.js, pieces.min.js and anime.min.js fetched and read. Stack (Measured): **Pieces.js** (canvas fragmentation) + **anime.js** as its animation engine.

**Configuration (Measured from demo.js — this is the recipe).** Each slide is three fragmented layers drawn on one canvas:
- **Image:** `angle: 45`, `extraSpacing {extraX:100, extraY:200}`, `piecesWidth: () => random(50,200)`, `ty: () => random(-400,400)`.
- **Text:** `color white, backgroundColor '#5104ab'`, `fontSize: width>720 ? 50 : 30`, `padding '15 20 10 20'`, `angle: -45`, `piecesSpacing: 2`, `extraSpacing {0, 300}`, translate by breakpoint: >1120px {200,200}, >720 {0,200}, else {0,100}.
- **Number:** `fontSize: >720 ? 60 : 20`, `angle: 0`, `piecesWidth: 35`, translate >1120 {−340,−180}, >720 {−240,−180}, else {−140,−100}.
- **Global:** `new Pieces({ canvas, items, x:'centerAll', y:'centerAll', piecesSpacing: 1, animation: { duration: () => random(1000, 2000), easing: 'easeOutQuint' } })` — every piece gets a *different* duration in 1–2s, which is what makes the reassembly feel organic rather than mechanical.
- Idle life: numbers rotate forever — `animateItems({ items: numberIndexes, duration: 20000, angle: 360, loop: true })`.
- Init waits for all slide images to load; prev/next buttons + arrow keys (keyCode 37/39); canvas is 100vw×100vh, image max-width shrinks at ≤720px (Level 2, from demo CSS).
**Bank use.** A hero/gallery transition for before→after sliders: split into random 50–200px strips at ±45°, scatter ty ±400, reassemble with easeOutQuint over a randomised 1–2s. Heavy for a whole page; perfect for one hero.
**Reduced-motion:** 0 occurrences (2018).

## 406 · Dot Navigation Styles — Codrops (21 Jan 2014)
Source: article tympanus.net/codrops/2014/01/21/dot-navigation-styles/ + live demo (tympanus.net/Development/DotNavigationStyles/) — component.css (12.7K) and dots.js fetched and mined. **Pure CSS transitions + inline SVG; zero framework.** ~10 styles on one demo page (FillUp, ScaleUp, Stroke, DrawCircle, Tooltip, Hop, DotMove, Flip, CircleGrow…).

**Parameters (Measured).** One timing rules the whole set: **`0.3s ease`** — box-shadow, opacity, transform, background, height transitions all ×0.3s. Base dot 16px (18px for DrawCircle). Signature recipes:
- **FillUp:** an inner `::after` circle grows height 0→100% inside an inset ring (box-shadow inset does the ring).
- **DrawCircle:** inline SVG circle, `stroke-dasharray 39 39` (≈ 2πr for r≈6.2), `stroke-dashoffset 39→0` over 0.3s, stroke-width 3, round line-caps — the ring *draws itself* into the current dot.
- **Accessibility pattern (Measured in markup):** link text is `text-indent: -999em` visually hidden but retained for screen readers — dots are never empty anchors.
- dots.js only moves the `.current` class on click; everything else is CSS.
**Bank use.** Section/slide dot nav that drops straight into an Elementor HTML widget or a single-file build with no dependencies. Trade-use note (ours): 16px is small for thumbs — scale to ≥24px tap targets on phone layouts.
**Reduced-motion:** 0 occurrences (2014).

## 407 · Infinite Tubes with Three.js — Codrops (9 May 2017)
Source: article tympanus.net/codrops/2017/05/09/infinite-tubes-with-three-js/ + live demo 1 (tympanus.net/Development/InfiniteTubes/) — demo1.js (7.6K) + three.min.js fetched and read line-by-line. Six demo variants exist (brick tunnel, low-poly particles, hyperspace, blood vessel, triangular tube, device-orientation); parameters below are demo 1's, Measured.

**Mechanism (Measured from demo1.js) — the cheapest infinite-travel illusion in the bank:**
- Curve: `CatmullRomCurve3` through 5 points on the Z axis, `points[i] = (0, 0, 2.5·(i/4))`, with `points[4].y = -0.06`.
- Tube: `new THREE.TubeGeometry(curve, 70 tubular segments, 0.02 radius, 50 radial segments, open)` with `MeshStandardMaterial { side: BackSide, map + bumpMap (stone), bumpScale: 0.0003 }`; lights: HemisphereLight(0xffffbb, 0x887979, 0.9) + DirectionalLight(0xffffff, 0.8). (Radius quoted exactly as written in the source.)
- **Travel = texture, not geometry:** both maps get `wrapS/wrapT = RepeatWrapping`, `repeat.set(30, 6)`, and per frame `material.map.offset.x += 0.02` (`this.speed = 0.02`). Nothing in the scene translates; the world appears to rush past for the cost of one uniform update.
- **Steering:** mouse is normalised to (−1…1); position lerps by **/30 per frame** toward target. The curve bends: `curve.points[2].x = −mouse.x·0.1; points[4].x = −mouse.x·0.1; points[2].y = mouse.y·0.1`, the spline is rebuilt (`curve.getPoints(70)`), and **every tube vertex lerps /10 per frame** toward (original vertex + spline vertex at its ring index, `index = floor(i/50)`) — the tube visibly flexes instead of snapping. Camera rides along: `rotation.z = mouse.x·0.2`, `rotation.y = π − mouse.x·0.06`, `position.x = mouse.x·0.015`, `position.y = −mouse.y·0.015`.
- The original geometry is cloned before morphing (`tubeGeometry_o`) — morph targets are always computed from the pristine copy, never accumulated.
**Bank use (3D library).** Texture-offset travel for any "journey" background (a van-route / through-the-pipe visual for a trade hero) at near-zero GPU cost; the /30 mouse lerp and /10 vertex lerp are reusable smoothing constants. **Mobile:** variant 6 uses device orientation (article Stated). **Reduced-motion:** 0 occurrences.

## 408 · Creative Subscription Agency — Pulsenova — pulsenova.ch
Source pass: `code-source/pulsenova/` (HTML 248K + 23 assets; JS 584K / CSS 220K mined). Stack (Measured): **Astro + GSAP 3.13 + Lenis**; the page itself states "Hand-coded… GSAP motion, Lenis scroll, Core Web Vitals as a discipline" (Stated on-page). Pulsenova.io redirects here.

**Parameters (Measured — the richest GSAP set in the slice).** GSAP 341 refs, ScrollTrigger 92, SplitText 12. Eases: `none` ×13, **`osmo-ease` ×8** + `osmo` ×4 (Osmo's CustomEase), `power2.out` ×7, `power2.inOut` ×6, `power3.out` ×5, `back.out(2)` ×3, `back.out(1.4)` ×2. Durations: 1 ×20, .5 ×14, .4 ×13, .6 ×7, 1.2 ×6, and the distinctive **.725 / .65** pair ×4 each (menu choreography timings). Staggers: .03 ×6, a named `staggerDefault` ×5, .05 ×5, {each:.01/.03/.05/.09}, {amount:.06}. ScrollTrigger: scrub true ×9, **scrub .8** ×2; starts `top bottom` ×4, `top top` ×3, `top 90%` ×3, `top 85%` ×2, plus offset forms `top-=50% bottom`, `top+=15% top`, `top top+=42%`; ends `bottom bottom` ×3. **Reduced-motion: 11 occurrences** (Level 2 HTML count).
**Offer architecture (Seen, Level 2 — half the harvest).** Hero + "Ask Pulsenova" AI widget → featured work (3) → services → a "Built to last" block that **prints its own Lumos fluid-scaling CSS as content** (the system is the proof) → tools strip → testimonial wall (9 named clients with photos/roles) → process: **Discovery Call (free) → Foundation → Partnership**, with scarcity counters ("1/3 spots left", "Founding MEMBER 0/100") → fixed-investment explainer ("One fixed investment per phase. Never a meter running.") → pause-anytime partnership terms → contact footer.
**Bank use.** Two layers to take: (1) the motion recipe (osmo ease, .725/.65 menu timings, scrub .8) and (2) the offer shape — free call → fixed-price build → pausable retainer with spots-left counters — which is a complete trade-service offer already written.

## 409 · Grow My Business — growmybusiness.co.nz
Source pass: `code-source/grow-my-business/` (HTML 208K + 11 assets; JS 428K / CSS 72K mined). Stack (Measured): **WordPress** (wp-content, AVIF uploads) with hand-added **gsap + ScrollTrigger + Lenis + Swiper** as the site's own scripts, plus a Trustindex Google-review widget. The closest object in the slice to a finished trade homepage (Level 2, Fit 5).

**Parameters (Measured).** GSAP 102 refs, ScrollTrigger 52, Lenis 20. Eases: `none` ×5, `power3.out` ×3, `expo`, `power4`. Durations: **.6 ×4, .5 ×3, .2 ×3**, .3. A recognisable config pattern repeats: **`scrub: 0.2` ×3** with `start: "top bottom-=10%"` ×3 — light-scrub parallax/reveals that trail the scroll by a hair instead of locking to it; also `start: "top+=5svh bottom"` (svh units — mobile-safe viewport sizing) and `"left 80%"` (a horizontal trigger). Staggers: {amount: 0.2} and a fine 0.02. Count-up stats run as JS counters (Seen).
**Structure (Seen, Level 2).** Hero "Websites built to grow your business" + Book a Call + 5-star badge → **animated counters** (Websites Built / 5-Star Reviews / % NZ Made) → logo wall → positioning → **5-step process (01 Strategy, 02 Design, 03 Build, 04 Maintain, 05 Growth) with deliverable chips on every step** → pull-quote testimonial → **three priced tiers (New Website from $3.5k / Growth Plan from $395/mo flagged "most picked" / Care Plans from $49/mo), each with a "Best for" line** → team → 4 differentiators → long Google review wall (5.0, 99 reviews) → address/hours footer.
**Bank use.** Copy the commercial structure wholesale for trade demos: priced tiers with a Best-for line and a flagged middle, process steps with deliverable chips, counters + review wall as the proof stack. Motion stays in the .2-scrub, .6s family — deliberately unflashy on a sales page.
**Reduced-motion:** 0 occurrences.

## 411 · NVRMND Studio — nvrmndstudio.com
Source pass: `code-source/nvrmnd-studio/` — first pass fetched 0 assets (everything lives on Webflow's CDN); rerun with ALLOW_CDN=1 for the site's own bundle: 19 files, JS 824K / CSS 164K mined. Stack (Measured): **Webflow + GSAP 3.15.0** (version string in bundle), hand-drawn SVG icon set (Seen).

**Parameters (Measured, with a labelling caution).** GSAP 103 refs, ScrollTrigger 66. GSAP eases actually attributable: `power2.out` ×5, `none` ×3, `power4`, `expo`; GSAP durations .3 ×23, .25 ×5, .2 ×5, 1 ×10. The big duration counts (**500 ×110, 200 ×32, 250 ×21, 750 ×10, 400/350/150**) are **Webflow IX2 millisecond timings inside Webflow's own JS**, not NVRMND-authored GSAP values — quoted here so Lane 1 doesn't merge them as GSAP seconds. **Reduced-motion: 1 occurrence** (Level 2).
**Structure & patterns (Seen, Level 2).** Hero "TURN YOUR [traffic into] dream clients" → About as problem framing ("your website might be the thing holding you back") → **Process "How it works": 01 Map (Strategy//Structure), 02 Make (Design//Experience), 03 Move (Develop//Automate)** → **Services "THREE OPTIONS. ONE GOAL." — One-Pager 2–3 wks / Full Website 3–6 wks / Website Growth 4–6 wks, each with a "for" tag list** → testimonial case cards → newsletter named as a brand artefact ("The 404 Archives") → footer.
**Bank use.** The three-verb process (Map → Make → Move) with a discipline tag per step, and service tiers **stamped with delivery timelines + best-for tags** — both transfer directly onto trade packages ("One-page site 1–2 wks / Full site 3–4 wks…").

## 413 · Tequila Branding & Web Agency — tequila.ae
Source pass: the miner's download loop produced an empty assets folder for this site (logged fault; assets.txt itself was correct). Route 2: direct same-host curl of the theme's own files — `style.css` (181K) and `custom.js` (57K) from wp-content/themes/tequila — mined in full. Stack (Measured): **WordPress + Bootstrap + Swiper + a bundled gsap-bundle.min.js + fluidbg.js**; fonts Clash Grotesk (Light/Medium/Regular) + Instrument Serif.

**Parameters (Measured from custom.js).** GSAP 57 refs, ScrollTrigger 11, Swiper 11. House ease **`power3.out` ×28** (one ease for nearly everything), `linear` ×11, `none` ×5, `power4.inOut` ×5. Durations: **.8 ×20**, .3 ×7, 1 ×2, .5 ×2, .25. Stagger **.1 ×6**, .25 ×1. ScrollTrigger starts: `top bottom` ×19, `top center` ×11, `top 95%` ×8, `top top` ×7, `top 100%` ×6, `top 90%` ×4 — a reveal-on-entry system with almost no scrub: motion as punctuation, not as scroll theatre. **Logo marquee = Swiper in continuous mode (Measured config):** `new Swiper(".client--list.swiper", { loop: true, slidesPerView: 5, spaceBetween: 32, speed: 3000, autoplay: { delay: 0, disableOnInteraction: false }, breakpoints: … })` — speed 3000 + delay 0 = a constant-velocity ticker, an alternative to the CSS marquee (364) and LogoLoop (374) for logo strips. CSS: keyframes fadeIn / rotate-360 / stroke-animation; beziers (0.4,0,0.2,1) and (0.5,0,0.5,1); **prefers-reduced-motion 0 in the theme's own CSS** (the 64 occurrences Level 2 counted include Bootstrap/Swiper vendor CSS — vendor-carried, not authored).
**Structure (Seen, Level 2).** Video-banner hero → "26+ years. 350 brands." → **stat blocks where every stat carries a one-line substantiation** (350+ brands transformed, 20+ industries, 92% retention, 22+ awards) → services trio with eyebrow words (TEQNOLOGY / Strategy & Design / STORYTELLING) → work grid → Why Tequila (4) → awards → testimonials (Google 5.0, 103 reviews) → **10-question SEO FAQ accordion** → blog → **conversational contact form** ("Hey Tequila, I'm… I'm looking for… My Email ID is…") + "We'll get back to you within 24 hours" promise.
**Bank use.** Stat + substantiation line; the fill-in-the-blank enquiry form (a form that reads like a sentence gets completed); Swiper-ticker logo strip recipe above.

## 419 · FORN Studio — forn.dk
Source pass: `code-source/forn-studio/` (HTML 112K + 4 assets; CSS 32K mined, JS is the SvelteKit runtime). Stack (Measured): **SvelteKit** (/_app/immutable/ assets; svelte-scoped keyframe names throughout) — no GSAP, no animation library; the motion is CSS. Fonts served as "Hel" / "Mod" families (the studio's own cuts). The stylesheet for the ornament system is a first-class named module (Pili, per Level 2).

**Parameters (Measured from CSS).** Keyframes: `scale-in`, `scale-out`, plus scoped loop set `svelte-…-spin`, `-ping`, `-logo-ping`, `-indicate`, `-owch` — i.e. entrances are scale-based, and the ambient system is small ping/spin indicators attached to ornaments and the logo. No cubic-beziers of note in the fetched CSS, no GSAP-style configs (by design — it's a CSS/Svelte build). **Reduced-motion: 0 occurrences.**
**Structure & the Pili system (Seen, Level 2).** One-man Copenhagen studio (Adrian Elias Bratlann). Hero with the wordmark **threaded through dozens of inline "Pili" SVG ornaments** → manifesto ("en enmandshær" — a one-man army) in split-word display type ("store ambitioner"; later "fuld stæn digt" = fuldstændigt split apart) → **Stories carousel explicitly labelled "Swipe Drag"** (six essays with category tags) → four service cards, each with its own "Tag kontakt" CTA → closing vision → contact with a **"24 timer" (24-hour) response line**.
**Bank use.** (1) The Pili doctrine: **one small SVG motif repeated inline dozens of times becomes the brand texture** — nearly free, works in an Elementor HTML widget, and (compare 443 in slice 7) pairs with an icon grid. (2) Split-word display type as a memorable headline device. (3) A printed response-time promise in the contact block.

## 421 · MA Studio Speculative Software — interface.fh-potsdam.de/ma-speculative-software
Source pass: miner fault logged — the script resolves relative assets against the origin root, so for this subpath site it saved a 404 page as application.js. Route 2: direct fetch of https://interface.fh-potsdam.de/ma-speculative-software/assets/js/application.js (200, 4,999 bytes) read in full; HTML data-attributes counted from the miner's index.html (28K). Stack (Measured): **hand-written vanilla JS, no libraries** — one 5K script runs the whole page's interaction system. FH Potsdam MA programme microsite (German comments in source).

**The interaction system (Measured from application.js) — three mechanisms, all parameterised in markup:**
1. **Pointer parallax field.** Elements carry `data-tx / data-ty` (×53 / ×31 in the HTML) and `data-sx / data-sy`. Mouse is normalised to (−.5…+.5); per frame: `x = mouseX·tx·100`, `y = mouseY·ty·100`, `scale = 1 + mouseX·sx + mouseY·sy`, applied as `translate3d(x, y, 0) scale(s)`, plus coupled blur `blur = max(0, 10·(1 − scale))` — elements that shrink toward you sharpen, elements that grow blur. Desktop only (`matchMedia("(pointer: coarse)")` gate).
2. **Variable-font axis drive.** `.vf` elements carry `data-min / data-max` (×40 each; defaults 400/600). A smoothed mouse value (`smoothX += (mouseX − smoothX)·0.08` per frame) maps to `wdth = min + (smoothX + 0.5)·(max − min)`, written as `fontVariationSettings: "wght" 100, "wdth" <wdth>` inside the key-visual lines and `"wght" 70` elsewhere — **the type literally stretches as the cursor crosses the page**, with the 0.08 lerp making it feel liquid rather than tracked.
3. **Touch-only scroll parallax** (the inverse gate — runs only when pointer IS coarse): scroll is lerped (`current += (target − current)·0.1`) and the three key-visual lines translate at **−0.2 / −0.3 / −0.4 × scrollY** with blur at **0.02 / 0.01 / 0.005 × scrollY** (background blurs at 0.01) — depth by differential speed + differential blur.
Plus: hover focus system — hovering one `.project` (or student) adds `--unfocused` to all siblings and `--focused` to the hovered one (dim-the-rest list pattern), and a scroll progress bar that appears only after 600px (`progress--visible`) with width = scroll fraction ×100%.
**Bank use.** The data-attribute parallax recipe is the most portable cursor system in the slice: no library, per-element factors in the HTML, blur coupled to scale. The variable-font drive (lerp 0.08, wdth mapped across data-min/max) is a complete headline-effect recipe for any variable font. **Reduced-motion:** none in the script — gate the rAF loop when reusing.

---

# SLICE 6 TALLY
**Deep-read 33/33 · Blocked 0 · Unresolved 0.** Routes per entry ≥1 source-level (curl of HTML + same-host bundles, demo zip/directory, registry source, or full post text); two tooling faults (413 empty download loop, 421 subpath resolution) were routed around and are logged in-entry. Honest limits carried in-entry: 353/403/404 are design-post evidence with no live code (nothing quoted as Measured); 361's CSS pane was not in the fetched view (JS full, CSS from Level 2 Seen); 382's image-trail runs in Framer's platform runtime, not in the fetched HTML (not parameterised); 394's Three.js/PixiJS claim from an earlier inspection was not confirmed in this pass's bundle (flagged in-entry); 401's bundle is mostly library code (only sparse site-level configs attributed). Reduced-motion found **in actual code** at 372, 374 (component-level matchMedia), 381, 389 (CSS + visible controls), 395, 408 — and absent from all 2010–2018 Codrops sources, as expected for their era.
Library-ready parameter sets are inline in each entry (Lane 1 to merge): SVG drop-shadow chain (352), App Showcase recede (354), timeline bounce bezier + accent swap (356), cbpFWTabs (357), horizontalLoop config + helper mechanics (361), loader keyframe periods (362/363), CSS marquee variables (364), expanding-menu timeline (366), GlareHover profile math (372), LogoLoop engine constants (374), GMX shader uniform set + intro keyframe family (389), Pieces fragment config (405), dot-nav recipes (406), Infinite Tubes travel/steering constants (407), Pulsenova GSAP set (408), GMB scrub pattern (409), Swiper continuous-ticker config (413), data-attribute parallax + variable-font drive (421).
