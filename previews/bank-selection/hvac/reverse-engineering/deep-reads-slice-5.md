# Deep Reads — Slice 5 (queue 281–351 selection, 33 entries)

Helper pass, 26 Oct 2026. Sources: live-browser deep read of every entry (props tables, article code blocks, live pages), own curl source passes for the live sites (`code-source/<slug>/values.txt`), own direct article reads cross-checking 306/348/349. Evidence labels: **Measured** = read from a table/code/source file; **Seen** = observed on the page; **Inferred** = reconstruction judgement. Props-table defaults govern where a Customize preset differs (both noted). Shared libraries not edited — parameter sets are listed here for Lane 1 to merge.

**Result: 33 of 33 entries deep-read.** React Bits 11/11 · Codrops 12/12 · Live service sites 10/10. Entry 317 Digital Butlers was unresolved via the GSAP Showcase route (gallery search returns no such entry; control search proved the gallery works) and was then resolved via web search to its own domain (digitalbutlers.team) and deep-read from the live site + L2 record.

---

## REACT BITS (11) — all at reactbits.dev/text-animations/<slug>

### 281. Curved Loop
- **Source:** https://reactbits.dev/text-animations/curved-loop · Stack: React, no dependency section (Seen).
- **Mechanism:** a repeated string is laid along an SVG-style curved path and looped as a marquee; repeats joined by a separator; optional pointer drag/fling that can flip direction, then glides back.
- **Parameters (Measured, Props table, 17 props):** marqueeText '' · shape 'arc'|'wave'|'circle'|'line' default 'arc' · color 'currentColor' · separator '' · separatorColor unset (matches text) · direction 'left' · speed **2** · scrollBoost 0 · curveAmount **400** (arc: dip at middle, negative arches up; wave: wave height) · fontSize **96** (px at a 1440px-wide loop; loop scales with container) · fontWeight 700 · letterSpacing 0 · edgeFade 0 (0–1; at 1 only the middle is fully visible) · outline false · interactive true · pauseOnHover false. Customize matched the table.
- **Rebuild:** single-file = SVG textPath + duplicated string, CSS animation with duration derived from speed, pointer-velocity drag for interactive mode. Elementor: text-path/marquee widget with the same speed/curve/font controls.
- **Mobile/RM:** preview sizes Desktop / Tablet 768px / Mobile 375px (Seen). Reduced-motion: not verified, no prop.

### 285. Fold Text
- **Source:** https://reactbits.dev/text-animations/fold-text · Stack: React + **gsap**.
- **Mechanism:** text splits (char/word/line), each piece rotates around a hinge edge (transform-origin at the hinge) with a crease-shading overlay, staggered in sequence; optional proximity refold on hover.
- **Parameters (Measured, 21 props):** text "Design unfolds" · foldStyle 'paper'|'blinds'|'flip' = 'paper' · splitBy 'char' · hinge 'top' · foldAngle **92** · duration **0.65** · stagger **0.045** · staggerFrom 'start' · ease **"power3.out"** · perspective **700** · creaseShading **0.55** (0–1) · trigger 'mount' · loopDelay 1.4 · hoverRefold: Props false / Customize switch ON — Props govern · refoldRadius 140 · refoldAngle 45 · fontSize 80 · fontWeight 800 · color 'currentColor' (Customize #ffffff).
- **Rebuild:** GSAP timeline, rotateX/Y to 92deg inside perspective 700px, stagger 0.045, shading overlay opacity 0.55. CSS-3D fallback loses the refold-radius behaviour.
- **Mobile/RM:** preview sizes as standard. Reduced-motion: not verified.

### 288. Gradient Text
- **Source:** https://reactbits.dev/text-animations/gradient-text · Stack: React, no dependency section (Seen).
- **Mechanism:** background-clip:text fill with an animated gradient — sliding sweep (linear), drifting mesh (flow) or swinging conic fan; optional pointer-follow, glow and border.
- **Parameters (Measured, 14 props):** colors **["#5227FF", "#FF9FFC", "#B497CF"]** with the first colour repeated at the end for a seamless loop · animationSpeed **8** (seconds/cycle) · variant 'linear' · angle 90 · scale **3** (gradient sized 300%) · yoyo true · glow 0 (0–1) · showBorder false · borderWidth 1.5 · pauseOnHover false · followPointer false.
- **Rebuild:** background-clip:text, 300% background-size, 8s keyframe sweep with alternate (yoyo); conic variant = rotating conic-gradient. Glow via drop-shadow filter at the glow value.
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified.

### 289. Rotating Text
- **Source:** https://reactbits.dev/text-animations/rotating-text · Stack: React + **motion** (Framer Motion).
- **Mechanism:** phrases cycle in place (AnimatePresence, wait mode by default); each phrase splits to characters/words and transitions with slide/flip/blur/scale/drop effects; an optional highlight block auto-sizes behind the active phrase.
- **Parameters (Measured, 23 props):** effect 'slide' · direction 'up' (drop always falls from above) · highlight false · highlightColor "#a855f7" (text colour auto-contrasted) · rotationInterval **2000ms** · blur 0 (blur effect uses 10 when 0) · staggerDuration: Props 0 / Customize 0.025s — note both · staggerFrom: Props 'first' / Customize 'Last' — note both · splitBy 'characters' · loop true · auto true · pauseOnHover false · animatePresenceMode 'wait' · animatePresenceInitial false.
- **Rebuild:** Motion AnimatePresence at a 2000ms interval with char stagger; plain fallback = JS interval + per-effect CSS keyframes.
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified.

### 291. Scroll Float
- **Source:** https://reactbits.dev/text-animations/scroll-float · Stack: React + **gsap** (ScrollTrigger).
- **Mechanism:** split pieces (chars/words) animate in on scroll — float/flip/scatter/blur/wave — driven by ScrollTrigger start/end strings, scrubbable.
- **Parameters (Measured, 17 props):** effect 'float' · splitBy 'chars' · direction 'up' · order 'start' (random is fixed per visit) · animationDuration **1** · ease **'back.inOut(2)'** · stagger **0.03** · distance **120** (% of piece height; flip = drum size, scatter = spread) · stretch **2.3** · smoothing 0s · scrollStart **'center bottom+=50%'** · scrollEnd **'bottom bottom-=40%'** · scroll container = window by default.
- **Rebuild:** GSAP + ScrollTrigger with those exact start/end strings; CSS scroll-timeline is not a like-for-like fallback for scatter/flip.
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified.

### 292. Scroll Reveal
- **Source:** https://reactbits.dev/text-animations/scroll-reveal · Stack: React + **gsap**.
- **Mechanism:** words/chars/lines reveal on scroll, scrubbed to scroll position (default) or played on enter; optional blur-sharpen, base tilt and accent highlight colour while revealing.
- **Parameters (Measured, 18 props):** mode 'scrub' · splitBy 'words' · effect 'fade' · stagger **0.05** · duration 0.8 (enter mode) · smoothing 0 · enableBlur true · blurStrength **4px** · baseOpacity **0.1** · baseRotation **3°** · baseOffset 0px · rotationEnd 'bottom bottom' · wordAnimationEnd **'bottom bottom'** · highlightColor '' (none).
- **Rebuild:** GSAP + ScrollTrigger scrub from opacity 0.1 / rotation 3deg / blur 4px, stagger 0.05. (Same word-scrub family as entries 324/329's intro statements.)
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified.

### 294. Shiny Text
- **Source:** https://reactbits.dev/text-animations/shiny-text · Stack: React, no dependency section (Seen).
- **Mechanism:** a light band (angled linear-gradient mask) sweeps across the text — looped, on hover, on view, or following the pointer; softness via gradient-stop spread.
- **Parameters (Measured, 19 props):** color "#b5b5b5" · shineColor "#ffffff" · speed **2s** per sweep · delay 0 · angle **120°** · shineWidth **40%** · softness **0.8** (0 crisp – 1 soft) · bands 1 · glow 0 · direction 'left' · easing 'smooth' · trigger 'loop' · yoyo false · followPointer false · pauseOnHover false · disabled false.
- **Rebuild:** single-file CSS gradient mask at 120°, 40% band, 2s sweep. Elementor: heading + shine overlay animation.
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified (the `disabled` prop is the manual off switch).

### 295. Shuffle
- **Source:** https://reactbits.dev/text-animations/shuffle · Stack: React + **gsap** + **@gsap/react**.
- **Mechanism:** characters shuffle through copies of themselves (slide/flip/blur), then settle, on view or hover; IntersectionObserver-gated.
- **Parameters (Measured, 28 props):** effect 'slide' · shuffleDirection 'right' · duration **0.35** · ease **"power3.out"** · stagger **0.03** · threshold **0.1** · rootMargin **"-100px"** · shuffleTimes 1 · animationMode 'evenodd' · loop false · loopDelay 0 · scrambleCharset '' (empty = shuffle original copies) · motionBlur false (slide only) · triggerOnce true · triggerOnHover true · hoverRadius 0 (whole text replays) · tag 'p' · textAlign 'center' · **respectReducedMotion true**.
- **Reduced-motion: PRESENT (Seen)** — with respectReducedMotion=true the text shows immediately, unshuffled. The only explicit RM default in this React Bits set; the bank's rule: always gate behind matchMedia('(prefers-reduced-motion: reduce)').
- **Rebuild:** GSAP + IntersectionObserver at the threshold/rootMargin above.

### 296. Split Flap Text
- **Source:** https://reactbits.dev/text-animations/split-flap-text · Stack: React, no dependency section (Seen).
- **Mechanism:** split-flap board: a fixed tile count; each tile flips through a charset a set number of times, then settles on the target char; words cycle on a delay.
- **Parameters (Measured, 22 props):** words ['LAUNCH READY', 'SYNC ONLINE', 'SIGNAL LIVE'] (a `text` prop overrides) · flipDuration **0.12s** · stagger **0.06s** · cycleDelay **2400ms** · charset 'alphanumeric' (or 'alpha'/'numeric'/custom) · flipsPerChar **8** · tileColor "#111827" · textColor "#f8fafc" · tileRadius 8 · gap 6 · fontSize 52 · loop true · padTo **12** (fixed tiles = stable board width) · intro true (starts blank) · order 'left' · tileStyle 'board' · glare 0 · depth 0.5.
- **Rebuild:** single-file board with the values above; no native Elementor widget reproduces the flap — code widget.
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified.

### 297. Split Text
- **Source:** https://reactbits.dev/text-animations/split-text · Stack: React + **gsap** + **@gsap/react**.
- **Mechanism:** text splits to chars; letters rise/fade/blur/flip/pop/skew/wave in on view/load/hover/click, optional loop and hover lift; optional mask (clipped rise).
- **Parameters (Measured, 22 props):** effect 'rise' · trigger 'view' · loop false · loopDelay 1.5 · hoverEffect: Props 'none' / Customize 'Lift' — Props govern · delay **50ms** between letters · duration **1.25s** · default from {opacity:0, y:40} to {opacity:1, y:0} (per-effect eases built in) · splitType 'chars' · staggerFrom 'start' · mask false · threshold **0.1** · rootMargin **"-100px"** · tag 'p' · textAlign 'center'.
- **Rebuild:** GSAP at 50ms delay / 1.25s duration / IO 0.1, -100px. Elementor: GSAP code widget.
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified.

### 300. True Focus
- **Source:** https://reactbits.dev/text-animations/true-focus · Stack: React + **motion**.
- **Mechanism:** words cycle through focus: the focused word gets brackets/box/underline/highlight while the rest blur; sequential or random order; manual mode = hover-driven.
- **Parameters (Measured, 16 props):** sentence 'True Focus' · separator ' ' · focusStyle 'brackets' · borderColor 'green' · highlightColor unset (falls back to border colour) · glowColor 'transparent' · focusScale 1 (1.06 given as the example) · blurAmount **5px** · unfocusedOpacity 1 · easing 'smooth' (or 'spring') · order 'sequential' · manualMode false · animationDuration **0.5s** · pauseBetweenAnimations **1s** · cornerSize **16px** · borderWidth **3px**.
- **Rebuild:** Motion at 0.5s/1s cadence, 5px blur on unfocused words, corner spans 16px/3px; plain fallback = absolutely positioned corner spans + CSS transitions.
- **Mobile/RM:** preview sizes standard. Reduced-motion: not verified.

---

## CODROPS (12) — tympanus.net/codrops, article code = article-text only unless a demo file is noted

### 306. Accordion with CSS3 (2012, Manoela Ilic)
- **Source:** https://tympanus.net/codrops/2012/02/21/accordion-with-css3/ · Stack: **CSS only, no JS**.
- **Mechanism (step by step):** (1) hidden checkbox/radio input per item, (2) a label whose `for` = the input id, (3) `:checked + label` styles the open label, (4) `:checked ~ article` expands the panel to a fixed pixel height. Checkboxes = multi-open; radios = single-open; a pre-`checked` input = default-open variant. Markup: `.ac-container > div > input#ac-N + label + article.ac-small|medium|large`.
- **Parameters (Measured from article code):** container width 400px, margin 10px auto 30px · input display:none · label font 'BebasNeueRegular','Arial Narrow',Arial · checked label background #c6e1ec · article background rgba(255,255,255,0.5), margin-top -1px, overflow hidden, height 0 · **transition height 0.5s ease-in-out opening / 0.3s ease-in-out closing** · open heights: **ac-small 140px, ac-medium 180px, ac-large 230px** (fixed heights because `auto` won't animate) · article p: italic, #777, line-height 23px, font-size 14px · arrow via label :after (arrow_up.png on the selected state). Three demos: checkboxes / radios / checkboxes default-open.
- **Rebuild:** copy the input/label/article structure with fixed heights — this is the bank's CSS-only FAQ pattern. Elementor's Accordion widget looks similar but does not use the :checked mechanism; use an HTML widget for fidelity.
- **Mobile/RM:** article itself notes some mobile browsers miss label clicks (Seen). No reduced-motion handling (2012 article).

### 307. Fullscreen Overlay Effects (2014)
- **Source:** https://tympanus.net/codrops/2014/02/06/fullscreen-overlay-effects/ · Stack: CSS transitions; SVG-morph variants use Snap.svg; one variant SVG+JS.
- **Mechanism:** a trigger toggles a class on a fixed fullscreen overlay; 11 styles in the set (fade, scale, slide, corner, door, content-push, SVG path-morph "Genie", little-boxes…). The load-bearing trick (Measured): `.overlay-hugeinc { opacity:0; visibility:hidden; transition: opacity 0.5s, visibility 0s 0.5s; }` — the delayed visibility transition removes the overlay from interaction only after the fade completes; opening reverses with 0s delay.
- **Rebuild:** fixed overlay + the opacity/visibility pair above; Snap.svg only for morph variants, plain fade fallback. Bank use: fullscreen mobile menu overlay (Chunk 13 entry 366's expanding menu is the lighter sibling).
- **Mobile/RM:** not verified in the article.

### 308. Grid Layout with Scrollable Content View (2018)
- **Source:** https://tympanus.net/codrops/2018/09/19/grid-layout-scrollable-content-view/ · Stack (Seen): **Masonry + imagesLoaded** (DeSandro), **Charming** (char-splitting), **TweenMax** (GSAP), Unsplash images.
- **Mechanism:** Masonry grid with an animated hover effect on items; clicking an item opens a scrollable content (detail) view over the grid — the grid→detail pattern for project galleries. The article body carried no code blocks in the readable view and the demo files were not read: **no numeric parameters extractable — article-text only, recorded honestly** (L2 recorded: 12-item grid).
- **Rebuild:** Masonry + imagesLoaded + TweenMax for hover/open motion; fallback = CSS grid + scrollable overlay panel.
- **Mobile/RM:** not verified.

### 310. Inspiration for Text Input Effects (2015)
- **Source:** https://tympanus.net/codrops/2015/01/08/inspiration-text-input-effects/ · Stack: CSS; some effects SVG stroke.
- **Mechanism:** label sits AFTER the input in markup (`span.input.input--<name> > input.input__field + label.input__label`); the label's ::before/::after are the animated elements; on :focus (and on filled state) the label content span transforms up and the border/graphic draws itself. 14 named styles in the set (Haruki, Hoshi, Kuro, etc. — L2 count). Kyo uses the label as a full overlay. Madoka animates an SVG outline via stroke-dashoffset (noted: no IE).
- **Parameters (Measured, article code):** Haruki: `.input--haruki { margin: 4em 1em 1em }`, field padding 0.4em 0.25em (block truncated in the readable view; per-effect durations live in the demo CSS, not extracted — article-text only).
- **Rebuild:** the input-then-label order + :focus sibling selectors. Elementor form widgets cannot reproduce these label mechanics — HTML widget inside the form section.
- **Mobile/RM:** not verified; Firefox/Mac text-rendering note in the article (Seen).

### 313. Nifty Modal Window Effects (2013)
- **Source:** https://tympanus.net/codrops/2013/06/25/nifty-modal-window-effects/ · Stack: CSS + small JS class toggle; the blur variant leans on Polyfilter for old browsers.
- **Mechanism:** `button.md-trigger[data-modal]` → JS adds `.md-show` to `.md-modal.md-effect-N > .md-content`; the effect class runs the entrance; `.md-overlay` is a sibling; 3D effects add `.md-setperspective` on the trigger's context. 19 effects in the set (L2 count: Fade & Scale, Newspaper, Blur, 3D Slit…).
- **Parameters (Measured, article code):** .md-modal: position fixed, top/left 50%, width 50%, **max-width 630px, min-width 320px** (rest truncated) · .md-perspective, .md-perspective body { height:100%; overflow:hidden } · effect-5 (Newspaper) overlay: `.md-show.md-effect-5 ~ .md-overlay { background: rgba(0,127,108,0.8) }`.
- **Rebuild:** md-modal/md-content/md-overlay structure + md-show toggle + per-effect transform/opacity keyframes. Known issue (Seen): visibility/opacity on iOS < 6 Mobile Safari.
- **Mobile/RM:** only the iOS note above; RM not verified.

### 314. Some Inspiration for Pricing Tables (2015)
- **Source:** https://tympanus.net/codrops/2015/11/19/some-inspiration-for-pricing-tables/ · Stack: CSS, flexbox-based, responsive.
- **Mechanism/structure:** BEM pattern `.pricing.pricing--<theme> > .pricing__item` with `pricing__title / __feature / __price / __action` children; 12 named three-tier themes in the set (L2 count, incl. Sonam). Common CSS (Measured): `.pricing { display:flex; flex-wrap:wrap; justify-content:center; width:100%; margin:0 auto }`; Sonam item: margin 1.5em, padding 2em (block truncated).
- **Parameters:** layout values only from article text; the sets carry real example prices per theme (in the demo, not extracted here). No durations — hover states are theme CSS.
- **Rebuild:** flex-wrap pricing grid + BEM theme modifiers; Elementor Price Table widgets reproduce the layout, not the themes. Pairs with 324 Haptic's published tiers as the bank's pricing-section pair.
- **Mobile/RM:** described responsive; no breakpoint values in article text. RM not verified.

### 316. Tooltip Styles Inspiration (2014)
- **Source:** https://tympanus.net/codrops/2014/10/07/tooltip-styles-inspiration/ (a guessed June date URL 404'd; resolved by exact site search — route logged) · Stack: CSS-only hover tooltips + SVG shapes; Font Awesome icons.
- **Mechanism:** hover on `.tooltip-item` reveals `.tooltip-content` from a 3D offset transform to identity; shaped tips are ::after SVG-ish shapes. 9 styles in the set (L2 count).
- **Parameters (Measured, article code, "Sharp" style):** font Kalam 700/400 · .tooltip-content: position absolute, bottom 100%, left 50%, z-index 9999, margin-bottom ~105px (value truncated in view — recorded as truncated, not asserted) · turnright rest transform: `translate3d(0,50px,0) rotate3d(1,1,1,6deg)` · hover: opacity 1, `translate3d(0,0,0)`, pointer-events auto · tip ::after: width 60px, height 120px · turnright ::after: left 25%, mirrored via scale3d(-1,1,1).
- **Mobile:** the article itself says hover tooltips are NOT a mobile solution and lists JS alternatives (Tipped, jQuery UI Tooltip, Tether, Tooltipsy, PowerTip, Opentip) — bank rule: tap/click fallback required on phones. Issues noted: % transform-origin on SVG paths in Firefox; stroke-dasharray animation fails IE<11.
- **Rebuild:** tooltip/tooltip-item/tooltip-content structure with the 50px/6deg rest offset and hover reset.

### 348. How to Create a Circular Progress Button (2014)
- **Source:** https://tympanus.net/codrops/2014/04/09/how-to-create-a-circular-progress-button/ (concept: Colin Garven) · Stack: CSS + vanilla JS, SVG ring; dash technique after Jake Archibald.
- **Mechanism (step by step):** idle pill button → hover fill → click: label fades → button morphs to a circle → SVG ring draws as progress → success (checkmark path draws, button fills green) or error (cross). JS class `UIProgressButton`: an SVGEl helper caches each path + its strokeDasharray/strokeDashoffset length; click adds `loading`, on transitionend fires the callback; `stop(status)` resolves to success/error and resets the ring. An elastic variant exists (own CSS transitions).
- **Parameters (Measured, article code + own direct read):** button **250×70px**, Montserrat · SVG sized 2r + border: 2r + 5 = 70 → **r = 32.5**, circle cx/cy 35 converted to a path · ring stroke **#1ECD97, stroke-width 5** · checkmark/cross stroke #fff, **stroke-width 4, linecap round, opacity transition 0.1s** · loading state: width **70px**, border-width 5px, border-color #ddd, transparent background · label fade-out **transition opacity 0.15s**; return-to-default label fade **0.3s with 0.1s delay** · success: border/background #1ECD97 · final-state transition override: background-color 0.3s, width 0.3s, border-width 0.3s · svg positioned absolute, left 50%, translateX(-50%), pointer-events none; paths opacity 0 / fill none until drawn.
- **Rebuild:** the bank's form-feedback standard for quote forms: pill→circle morph + dash-drawn ring + drawn check/cross, wired to the real submit state. Elementor: button + HTML/SVG widget + the state machine in custom JS.
- **Mobile/RM:** not addressed in the article.

### 349. SVG Filter Effects: Creating Texture with feTurbulence (2019, Sara Soueidan, series part 6)
- **Source:** https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/ · Stack: inline SVG filters; GSAP for one animated demo.
- **Mechanism:** feTurbulence generates Perlin noise filling the filter region; the noise is then (a) used raw as texture, (b) lit via feDiffuseLighting/feSpecularLighting (alpha channel as bump map, surfaceScale = z-multiplier; sources feDistantLight/fePointLight/feSpotLight), or (c) fed as in2 to feDisplacementMap to distort the SourceGraphic.
- **Parameters (Measured, article code + own direct read):** the 5 attributes: type / baseFrequency / numOctaves / seed / stitchTiles · baseFrequency **0.001 = large patterns, 0.5+ = small**; the useful working range quoted in the article is **0.02–0.2** · type default 'turbulence' (ripples/liquid); 'fractalNoise' = cloudy/smooth (gas/cloud) · numOctaves default 1; past ~5 the extra detail is practically unnoticeable · seed = PRNG start (same seed = continuous noise across adjacent rects) · stitchTiles default 'noStitch'.
  - **Rough-paper recipe (verbatim structure):** feTurbulence type fractalNoise, baseFrequency **0.04**, numOctaves **5**, result 'noise' → feDiffuseLighting in 'noise', lighting-color white, **surfaceScale 2**, feDistantLight **azimuth 45, elevation 60**.
  - **Displacement demo:** filter region x/y 0%, w/h 100%; horizontal noise baseFrequency animated **0.01 0.4 → 0 0.2**; distortion intensity = feDisplacementMap scale (a large value in the demo).
  - **Animated button recreation:** feTurbulence fractalNoise baseFrequency **"0 0.000001"**, numOctaves **2**, result NOISE → feDisplacementMap in SourceGraphic in2 NOISE, scale ~30 (truncated in view); applied via CSS `filter:url(#noise)`; GSAP tweens the baseFrequency value to **0 0.2** and back on click.
  - **Squiggly text** (Lucas Bebber): several filter copies #squiggly-0… cycled by @keyframes swapping filter:url() — resource-intensive; L2 ruling: avoid on mobile.
- **Rebuild:** inline SVG defs + CSS filter:url(#id); Elementor has no filter-primitive controls — HTML widget. Demo noted working in Chrome/Firefox, buggy in Safari but degrading to a normal element.
- **Mobile/RM:** not addressed; performance caution above stands.

### 350. SVG Filter Effects: Moving Forward (2019, Soueidan — series index)
- **Source:** https://tympanus.net/codrops/2019/02/26/svg-filter-effects-moving-forward/ · **No code values in this article** — it is the series map + resource list, recorded as an index entry.
- **Series map (Seen):** 1 SVG Filters 101 (15 Jan 2019) · 2 Outline Text with feMorphology (22 Jan) · 3 Poster Image Effect with feComponentTransfer (29 Jan → entry 351) · 4 Duotone Images with feComponentTransfer (5 Feb) · 5 Conforming Text to Surface Texture with feDisplacementMap (12 Feb) · 6 Creating Texture with feTurbulence (19 Feb → entry 349).
- **Harvest:** primitives the series does NOT cover, named for follow-up: **feTile, feConvolveMatrix** (via Dirk Weber's Smashing Magazine text-effects work). Tooling pointer: Yoksel's visual SVG filter editor + CodePen collection; spec = SVG Filters Specification.
- **Rebuild:** a hub/index only — no single pattern.

### 351. SVG Filter Effects: Poster Image Effect with feComponentTransfer (2019, Soueidan, series part 3)
- **Source:** https://tympanus.net/codrops/2019/01/29/svg-filter-effects-poster-image-effect-with-fecomponenttransfer/ · Stack: inline SVG filter on an <image>.
- **Mechanism:** feComponentTransfer remaps each channel independently via feFuncR/G/B/A; function types: identity | table | discrete | linear (slope/intercept) | gamma. `discrete` divides [0,1] into n equal ranges mapped to the n tableValues — that quantisation IS the posterize.
- **Parameters (Measured, verbatim from article code):** demo SVG 500×335 · alpha demo: feFuncA type "table" tableValues **"0 0.5"** → flat 0.5 opacity · posterize: feFuncR/G/B each type **"discrete"** with tableValues **".25 .4 .5 .75 1"** (5 levels per channel, floor 0.25 so blacks stay lifted). Worked example in the article: 3 values [0, 0.5, 1] map ranges [0,0.33]→0, [0.33,0.66]→0.5, [0.66,1]→1.
- **Rebuild:** inline SVG, filter id "posterize", the discrete values above on R/G/B; Elementor: HTML widget. CodePen demos were embedded but not readable in the browser view — values here are from the article code itself.
- **Mobile/RM:** not addressed (static effect; no motion).

---

## LIVE SERVICE / AGENCY SITES (10)

### 302. Nik R. — Nikola Radeski (Awwwards portfolio)
- **Source:** https://nikolaradeski.com/ · Extract: `code-source/nik-r/values.txt`.
- **Stack (Measured, own curl pass):** WordPress + Elementor; GSAP in the JS bundle with **ScrollTrigger registered**, scrollTrigger timeline configs, **gsap.matchMedia()** (breakpoint-aware animation) and a scroll-reveal **counter** hook. No Lenis/Three/SplitText. CSS inline in a 1.8MB HTML; @keyframes riseUpFade; **prefers-reduced-motion absent**.
- **Motion parameters (Measured):** eases power1.inOut dominant, power3.out secondary, singles of power2/power4/expo/back.out(1.2); durations 6s ambient loops (repeat:-1, yoyo; scale to 1.3 power3.inOut; xPercent −10→10 power1.inOut), transformPerspective 1500 tilt at ease "none".
- **Structure (Seen):** hero with live local clock → 9 numbered services (web design, product, UI/UX systems, graphic, visual/AI, video, digital marketing, social, AI workflow) each with a tool list → stats band (**13+ years, 600+ projects, 130+ reviews**) → 10-item awards list → career timeline → **32 five-star reviews + one 4-star (counted)** → 8-question FAQ → contact form: name*, role*, email*, status radio (**project / recruiter**), more-info*; the form copy asks for goal, a link, budget range and timing but publishes no ranges or prices. Footer: repeated "Let's work together" marquee, email + phone published.
- **Rebuild:** the Elementor-native pattern: registerPlugin once, matchMedia variants, power1.inOut/power3.out reveals, scroll counters. Directly transferable to Asiful's own portfolio build.
- **Mobile:** not device-tested in this pass.

### 317. Digital Butlers (GSAP Showcase) — RESOLVED via alternate route
- **Routes logged:** GSAP Showcase gallery search ("Digital Butlers" / "Butlers" / "Butler" / "Digital" — 0 matching results; control search "Hextronics" returned exactly 1 entry, proving the gallery works; the listing is absent from the current gallery, not blocked) → web search resolved the studio's own domain from a published interview URL → text-fetch first contact → own curl pass. Extract: `code-source/digital-butlers/values.txt`.
- **Stack (Measured):** Webflow (w-form markup, website-files.com CDN; all bundles cross-host and skipped per card discipline — no JS parameters claimed). Title positions it as a B2B website design & development studio.
- **Conversion blueprint (Measured from live HTML text + form markup):** stats band headed "Proof, not promises": **4.9 Clutch rating (52 verified reviews, also in JSON-LD), 672 projects delivered for 321 clients, 124k hours, same team since 2022, repeat-client average 2+ projects**.
- **Quote form (Measured):** budget **radio** labels in markup: **10k-20k / 20k-50k / 50k-100k / 100k+**; consent line; submit promise **"Get a quote in 48 hours"**.
- **Pricing FAQ (Measured):** projects **start at $10,000**; typical full-cycle B2B engagements **$25,000–$50,000**; payment structure published: **30% upfront / 40% after design approval / 30% on completion**.
- **Rebuild note:** this is the bank's quote-form exemplar: proof band → budget-qualifying radios → 48-hour promise → price floor + payment split published in the FAQ. Pairs with entry 348's progress button for submit feedback.
- **Mobile/RM:** not verified (Webflow responsive by platform; Inferred).

### 319. Bakstad Construction (Httpster) — KEEP TOP, trade-site exemplar
- **Source:** https://bakstadconstruction.com/ (resolved from the Httpster listing's own outbound link) · Extract: `code-source/bakstad-construction/values.txt`.
- **Stack (Measured, own curl pass):** no GSAP; a JS tween system with CSS-style eases + IntersectionObserver + rAF (React/framer-motion-class build). Font: Suisse BP Intl. **prefers-reduced-motion PRESENT in CSS** — one of only two live sites in this slice with it in source.
- **Motion parameters (Measured):** durations **.3s dominant** (.5/.25/.2; two slow 3.4s ambient), eases easeOut dominant; no stagger, no scrub — restrained IO-triggered fades only.
- **Structure (Seen):** fixed left rail (logo mark + Menu) → hero (firm name, one-line positioning: experience-driven build partner, Pacific Northwest) → project cards carrying **project name + location + year** (Arroyo Beach, West Seattle, 2024; Beach Drive; Casa Bonita; Harvard, Capitol Hill) → **Selected Press band** (project featured in Luxe Magazine) → approach section ("Conscientious Construction") → footer with **named principal (Dalen Bakstad), full street address, phone, email**, Instagram.
- **Conversion (Seen):** no homepage quote form — "Get in Touch" opens a slide-in panel, 4 fields: name, email, phone, project-information textarea (placeholder prompts for location, occupants, architectural partners, timeline, environmental considerations). No budget field, no pricing.
- **Rebuild:** left-rail layout + image-led project cards + press band + footer contact strip + slide-in form panel. The bank's model for a real GC homepage: credentials carried by projects and press, not claims.

### 320. Afternow (Land-book)
- **Source:** https://afternow.co/ (Land-book platform tag: WordPress) · Extract: `code-source/afternow/values.txt`.
- **Stack (Measured, own curl pass):** **GSAP 3.14.2 + ScrollTrigger (20 configs) + SplitText + Flip + ScrollSmoother + Lenis**, quickTo, CustomEase with custom curves named "smilMorphEase"/"smilScaleEase". Eases: "none" (scrubbed) and power2.out dominant; durations .8/.6/.5/1/1.2; staggers .08/.1/.15 (+ one {amount:.6}); scrub 1 and .2; starts "top 85%". prefers-reduced-motion absent in mined files.
- **Structure (Seen):** fullscreen nav → H1 positioning (partners in your digital journey) → client logo wall (enterprise names) → partnerships → **5 service cards** (Strategy / Brand / Website / Product / Development, each with an Explore link) → Journal teaser → footer CTA + newsletter (with honeypot field).
- **Contact page (Seen, form not submitted):** name*, company, email*, help-area **checkboxes** (the 5 services), **budget select: Under $30,000 / $30–60k / $60–100k / $100–250k / $250,000 and up**, project brief textarea, **optional brief upload up to 5MB**, human-verification widget; separate business and marketing enquiry emails; HQ address published (Krk, Croatia, remote-native team).
- **Rebuild:** WordPress + the GSAP/Lenis system above; the contact form's budget ladder + 5MB brief upload is the transferable pattern.
- **Mobile:** Land-book carries a mobile screenshot (not treated as verification).

### 321. AKLR Studio (Land-book)
- **Source:** https://www.aklr.xyz/ · Extract: `code-source/aklr-studio/values.txt`.
- **Stack (Measured, own curl pass):** no GSAP — SPA framework + CSS transitions (Material curves cubic-bezier(0,0,.2,1) and (.4,0,.2,1); JS durations .3/.8; @keyframes dash-move; backdrop-filter). Self-hosted fonts Diatype + Herbik (confirmed in source; credited on the Studio page, Seen).
- **Structure (Seen):** SPA-style nav (Projects / Index / Build / Studio swap without URL change; /studio is a real path) → **filterable project grid whose filter buttons carry counts**: ALL (12), Art Direction (03), Brand Identity (06), Brand Positioning (03), Coming Soon (01), Creative Direction (04), Packaging Design (06), Publication Design (01), Web Design (05), Web Development (03); each card's discipline tags double as filters; 12 projects listed by name.
- **Footer/Studio (Seen):** studio name + partnership line, Melbourne (Naarm) address, **email and phone published**, socials; Studio page lists 12 capabilities, 12 clients, 10 industries, press/awards (AGDA, Best Awards) and font credits. No contact form, no pricing.
- **Rebuild:** the counts-on-filters pattern is the harvest — it proves depth per discipline before a click. Single-file: .3s Material-curve transitions suffice; no animation library needed.
- **Mobile/RM:** not verified; reduced-motion absent in source CSS (Measured).

### 322. Domaine (Land-book)
- **Source:** https://domaineworldwide.com/ · Extract: `code-source/domaine/values.txt`.
- **Stack (Measured, own curl pass):** **Astro** (view-transition keyframes astroFadeIn/Out, astroSlideFrom/To Left/Right), **Swiper** carousels, CSS marquee keyframes (ticker-scroll, client-scroll), clip-path ×17, backdrop-filter ×14, one cubic-bezier(.22,1,.36,1). **No GSAP.** Fonts: Suisse Intl + Suisse Intl Mono. **prefers-reduced-motion PRESENT.**
- **Structure (Seen):** region selector + mega-menu (with office clocks for 3 cities) → video hero → H2 positioning (leading Shopify partner) → **stats band: 750+ Shopify sites launched, $5B+ portfolio GMV, 300+ team** → featured case-study video cards with feature lists (Timex, Arhaus, Ulla Johnson) → full **services mega-taxonomy** (AI Acceleration / Strategy / Creative / Technology / Marketing, each with named sub-services incl. a migrations list) → **migration-outcome stats: 150+ migrations, 100% certified team, 30–52-week average timeline, +19–29% average conversion increase** → partner wall (7 named platforms) → channel cards (DTC/B2B/Retail/POS) → **79-project grid** → 9-city office list → dated Insights list → big footer with newsletter.
- **Contact (Seen, not submitted):** HubSpot-style form — first/last name*, work email*, company*, current platform (optional), country/region*, phone (optional), project description*, consent checkbox. No budget field, no phone published.
- **Rebuild:** the enterprise-agency skeleton — stats band, outcome stats for the migration offer, partner wall, office list. Motion needs nothing beyond CSS keyframes + view transitions + a carousel.
- **Mobile/RM:** RM present (above); mobile not device-tested.

### 323. Grain & Mortar (Land-book)
- **Source:** https://grainandmortar.com/ · Extract: `code-source/grain-and-mortar/values.txt`.
- **Stack (Measured, own curl pass):** the heaviest GSAP system in this slice — **GSAP 3.14.2 (28 ScrollTrigger configs) + SplitText + Lenis + MotionPath + Flip + ScrollSmoother**, with a tokenised entrance system (a literal TOKENS.entrance.stagger token in source). Eases: **power2.out dominant (×32)**; durations **.25s workhorse**, .8/.6/.7, plus marquee loops at **40 / 28 / 15 / 4s**; staggers .03–.08 (+ 0.045); starts "top 80%" dominant; scrub in use. prefers-reduced-motion absent in mined files.
- **Structure (Seen):** anniversary banner (15 years, minutes-in-business counter line, rotating taglines) → split-line hero (Brand line / Web line) → **work track duplicated for loop** (7 projects, each ×2, tagged Brand/Web) → process/character statement → **industry marquee (8 industries, list repeated ×3)** → two giant letter-spaced service links (Brand / Web) → footer with email, newsletter, socials.
- **Contact (Seen, not submitted):** slide-in panel — first/last name*, email*, location, company, service checkboxes (Branding/Website/Other), team-size select (solo / 2–5 / 6+), start-timing select (incl. a "Yesterday." option), project textarea*, referral-source select. No budget field, no phone.
- **Rebuild:** the small-agency blueprint — personality banner, two-service split, duplicated-track marquees, characterful form selects. GSAP tokens + .25s power2.out micro-interactions are the house style to copy.
- **Mobile/RM:** not verified.

### 324. Haptic (Land-book)
- **Source:** https://www.haptic.studio/ (Land-book platform tag: Framer) · Extract: `code-source/haptic/values.txt` (Framer runtime is cross-host; no bundle parameters claimed).
- **Structure (Seen):** single page — header with **live London / New York clocks (ticking seconds)** → Book-a-call CTA card → case-study banner → H1 (design studio for startups and scaleups) → worked-with logo strip → **word-by-word scroll-highlight intro statement** (each word a separate node; same pattern family as 292/329) → testimonial → work list (8 projects, 3 flagged COMING SOON) → testimonial → **6 service links** (Product Design, Websites, Branding, Design Systems, No-code Development, Engineering) → logo-marks section → 6 named client testimonials → pricing → footer with newsletter.
- **Pricing (Measured from page):** two subscription tiers + bespoke, each with a Book-a-call CTA: **"Tactile" $15,000/month** (part-time support; two weekly updates, weekly sprint call, async comms, dedicated senior designer, design-director oversight) · **"Immersive" $30,000/month** (embedded team; full-time senior designer, dedicated director, optional daily standups, real-time collaboration) · **Enterprise: price on contact** (bespoke senior team, founder involvement, tailored scope). No email or phone published — conversion is Book-a-call only.
- **Rebuild:** Framer native; the scroll-highlight intro rebuilds with the 292 scrub pattern; the pricing transparency (exact monthly figures + feature lists) is the transferable asset for a productised-service offer.
- **Mobile/RM:** not verified.

### 325. Hyper Effekt (Land-book)
- **Source:** https://hypereffekt.com/ (Land-book platform tag: Framer) · Extract: `code-source/hyper-effekt/values.txt` (runtime cross-host; no bundle parameters claimed).
- **Structure (Seen):** event banner (expo meet-up + "Let's meet") → nav with Solutions dropdown + language selector + Book-a-call → hero (commerce positioning; Shopify Plus agency, Poland) → overview + consultation card → 2 featured rebuild case cards → **numbered Solutions blocks: 01 Design (e-commerce architecture, UX & creative design) / 02 Build (Shopify development, POS setup, migration) / 03 Grow (CRO, paid advertising, email & SMS marketing)** → industries line → **logo grid counted at 24** → "Edge" section → portfolio count (15) → **testimonial carousel counted at 21 reviews, every one rated 5.0** (Shopify Partners Directory) → contact section: Book a call, **email and phone published**, full company registration details in the footer (address, VAT, company number). No homepage form, no pricing.
- **Rebuild:** the numbered-solutions taxonomy + a wall of same-score reviews is the trust engine; Framer native, or Elementor carousel + logo grid.
- **Mobile/RM:** not verified.

### 326. ONOERA (Land-book) — service business, not an agency
- **Source:** https://onoera.com/ (Land-book platform tag: Framer; health & fitness) · Extract: `code-source/onoera/values.txt`.
- **Structure (Seen; the auto view started mid-page, hero not fully captured — recorded honestly):** intro positioning (alignment/authenticity coaching) → **"1:1 work" session cards with durations: Coaching 50–60 min, private breathwork session 90 min, Mentoring 60–90 min** → **group circles with a dated event card (venue city, date, 6:30–8:30pm) + "View all dates"** → couples work → **retreat cards with exact date ranges** (a past Aug 2026 retreat, Jan 2027 weekend retreat, Feb 2027 couples retreat) → six-month entrepreneur journey → about → footer with legal links. No prices, email or phone on the homepage; conversion = Join CTA + session/retreat cards.
- **Rebuild:** the booking-card pattern is the harvest for any appointment-based trade/service: service card = name + who runs it + duration; event card = venue + date + time; retreat card = date range + one-line promise.
- **Mobile/RM:** not verified.

### 329. reboot (Recent.design)
- **Source:** https://reboot.studio/ (resolved from the Recent.design post's own outbound link; the listing took feed-scrolling to reach — route logged) · Extract: `code-source/reboot/values.txt`.
- **Stack (Measured, own curl pass — confirms the listing):** **Next.js + React** (Inter via next/font), Tailwind per the listing; **no GSAP** — motion is IO/rAF-driven with CSS/framer-class tweens: easeOut dominant, durations .2/.5/.3 (max .8), cubic-beziers (.4,0,.2,1) standard + (.19,1,.22,1) expo-out + (.68,-.55,.27,1.55) back-in-out; @keyframes enter/exit; will-change ×4. prefers-reduced-motion absent.
- **Structure (Seen):** single page — header (logo + hiring note) → hero positioning (world-class marketing sites for software startups) → 3-person team with roles → disciplines line (design, engineering, branding, copywriting, video, 3D, interaction) → **scroll-fill text** (grey→black word reveal, L2) → delivery promise lines → **"Projects start at 8 weeks"** → Book-a-call CTA → footer: Barcelona line, **email published (hey@reboot.studio)**, socials. No form, no phone, no price figure on the live page (the listing's "weekly rate" wording does not appear on the site; listing also says 7+ years vs the site's 8+ — discrepancy recorded, site governs).
- **Rebuild:** one-page studio skeleton + scroll-highlight script (the 292 pattern without GSAP); the "projects start at 8 weeks" line is the transferable scarcity/scope device.
- **Mobile/RM:** not verified.

---

## Slice 5 harvest — parameter sets for Lane 1 to merge

- **Animation parameters:** 281 speed 2 / curveAmount 400 / fontSize 96 · 285 fold 92deg, 0.65s, stagger 0.045, power3.out, perspective 700, crease 0.55 · 288 gradient 8s cycle, scale 3, colours #5227FF/#FF9FFC/#B497CF (first repeated) · 289 rotate 2000ms interval, wait-mode · 291 float ease back.inOut(2), stagger 0.03, distance 120%, stretch 2.3, start "center bottom+=50%", end "bottom bottom-=40%" · 292 reveal baseOpacity 0.1, blur 4px, rotation 3deg, stagger 0.05, end "bottom bottom" · 294 shine 2s, angle 120°, width 40%, softness 0.8 · 295 shuffle 0.35s power3.out stagger 0.03, IO 0.1/−100px, respectReducedMotion=true · 296 flap 0.12s flip, stagger 0.06, cycleDelay 2400ms, flipsPerChar 8, padTo 12 · 297 split delay 50ms, duration 1.25, from y:40 · 300 focus 0.5s/1s pause, blur 5px, corners 16px/3px · 307 overlay opacity 0.5s + visibility 0s 0.5s · 348 progress ring r32.5 stroke 5 #1ECD97, checks stroke 4, fades 0.15s / 0.3s+0.1s delay · Afternow (320): GSAP 3.14.2, starts "top 85%", staggers .08–.15, custom eases smilMorphEase/smilScaleEase, Lenis + ScrollSmoother · Grain & Mortar (323): power2.out house ease, .25s micro-duration, TOKENS.entrance.stagger, marquee loops 40/28/15s, starts "top 80%" · Domaine (322): CSS-only motion — Astro view transitions + ticker/client-scroll keyframes, cubic-bezier(.22,1,.36,1) · reboot (329): easeOut, .2–.5s, cubic-bezier(.19,1,.22,1) expo-out · Bakstad (319): .3s easeOut IO fades, reduced-motion in CSS.
- **3D/SVG:** 349 feTurbulence working range baseFrequency 0.02–0.2; rough-paper recipe (fractalNoise 0.04, octaves 5 → feDiffuseLighting surfaceScale 2, distant light 45/60); displacement button (baseFrequency "0 0.000001", octaves 2, GSAP to "0 0.2"); squiggly-text warning (resource-intensive, avoid mobile) · 351 posterize discrete tableValues ".25 .4 .5 .75 1" on R/G/B; alpha table "0 0.5" · 350 follow-up primitives: feTile, feConvolveMatrix.
- **UI/UX patterns:** 306 CSS-only :checked accordion (fixed heights 140/180/230px, 0.5s open / 0.3s close) · 310 input-then-label floating-label structure (14 styles) · 313 md-modal system (max 630 / min 320px, 19 effects) · 314 BEM pricing pattern (12 themes) · 316 tooltip rest transform translate3d(0,50px,0) rotate3d(1,1,1,6deg) + tap-fallback rule · 317 quote form: budget radios 10k-20k/20k-50k/50k-100k/100k+, 48-hour promise, $10k floor + 30/40/30 split in FAQ, "Proof, not promises" stats band (4.9/52 reviews, 672 projects, 321 clients) · 319 project+location+year cards, Selected Press band, slide-in 4-field panel, named-principal footer · 320 budget select ladder $30k→$250k+ + 5MB brief upload · 321 filter pills WITH COUNTS · 322 stats band (750+/$5B+/300+) + migration outcome stats (+19–29% conversion) + 79-project grid · 323 anniversary ticker + duplicated-track work marquee + industry marquee ×3 + characterful form selects · 324 published subscription pricing ($15k/$30k/mo) + live office clocks + word-highlight intro · 325 numbered Solutions 01/02/03 + 21×5.0 review carousel + 24-logo wall · 326 session cards with durations + dated event/retreat cards · 329 "Projects start at 8 weeks" + scroll-fill text.

**Counts: 33 entries deep-read · 0 blocked · 0 unresolved** (317 resolved via the alternate route above). Screenshots: none embedded (supporting-evidence rule); extracts in `code-source/` for 302 + the 10 live sites of this slice.
