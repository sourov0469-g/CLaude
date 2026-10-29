# Animation Parameter Library
Seeded 26 Oct 2026 from the 4 deep code reads (Nick Ho, Neutomni, Heron AI, Codrops SVG Mask). Every new batch appends rows here. Label key: all values **Measured** unless marked.

| Effect | Seen at | Duration | Ease | Stagger | Scrub | Start / trigger | Properties | Notes |
|---|---|---|---|---|---|---|---|---|
| Masked word reveal | Nick Ho Motorsports | 0.6s | expo.out | 0.04–0.06 | — | onEnter | y (words start 64–70px under clipped mask) | SplitText mask wrappers |
| Slide-up text reveal | Heron AI | 0.8s (median 0.82) | power2.out (40/41 triggers) | 0.02 | mostly none | starts up to 100vh early | autoAlpha + yPercent, then clearProps | One recipe drives 40 of 41 triggers |
| Blur-in reveal | Neutomni | 0.4s | power1.out | 0.12 | — | element at 85% viewport | opacity 0→1, blur 10px→0, y 15px→0 | Also used on nav logo/links |
| Parallax layers | Nick Ho | — | linear | — | 1.9–4.3 mixed per layer | top bottom → bottom top | yPercent / y | Mixed scrub stops lockstep motion |
| Growing hairlines | Nick Ho | — | linear | — | true | top bottom → bottom bottom | height (×19) | Layout cost — prefer scaleY in our builds |
| SVG blind mask transition | Codrops (MIT) | 1.5s | expo/power3.out (text) | 0.02 | 2.5 | top top → bottom bottom | 30 SVG rect strips as mask | Touch devices get a simpler path |
| Image slide transition | Neutomni (Swiper) | 0.9s | power2.inOut | — | — | slide change | scale 1.2/1.4→1, opacity | Supporting tweens 0.12s / 0.3s |
| Logo loader | Neutomni | 2s | power1.out | 0.05 offsets | — | load | SVG paths move + scale | Loader pattern — record cost, avoid long loaders on lead pages |
| Shape morph | Neutomni | 1s | power2.inOut | — | — | — | MorphSVG on one shape | |
| Cursor follower | Nick Ho | — | — | — | — | pointer | gsap.quickTo, 4 attribute states: grab / click / sound / text | Attribute-driven, not selector-driven |
| Case card cascade | Neutomni | — | linear | — | scrubbed | sticky wrapper | scale | Diagonal cascade of case images (Inferred mechanism) |
| Text out/in on scroll story | Codrops (MIT) | 1.2–1.5s | expo.out / power3.out | — | in master timeline | ~30px moves | y + opacity | Progress bar scrubbed separately at 0.3 |

## Added 26 Oct — FWA source passes (curl-mined, Measured)
| Effect / system | Seen at | Values |
|---|---|---|
| Reveal-led agency motion (whole site profile) | 1minus1 | GSAP 3.13.0 + Lenis; 68 ScrollTrigger configs; durations .3 (×28, dominant), .5, 1, .7; eases power2.out ×10, power1.inOut ×10, power2.inOut ×9, none ×8; staggers .02–.05 (one {from:"random"}); starts "top bottom" ×13 dominant; scrub rare (true ×8, .5 ×1); CustomEase house curves named "smooth", "slowDown", "accelerate"; SplitText ×17, Draggable ×22 (case rail), quickTo ×5 |
| CSS-only UI motion (no GSAP) | YOLO.EXE | 14 named @keyframes (pop, stamp, sweep, snap, wobble…); signature overshoot cubic-bezier(.2,1.6,.4,1) + (.2,2,.4,1) + (.2,1.4,.4,1); transitions .2–.45s, reveals to .8s; stamp 1.35s forwards, lookpulse 2.4s infinite, pressStart 1s steps(2) (retro blink) |

## Added 26 Oct — Level 2 Chunk 1 (article/DOM-measured, source confirmation at deep stage)
| Effect / system | Seen at | Values / mechanism |
|---|---|---|
| Mouse-angle MotionPath follower | CodePen (ThijsLimitless) | convertToPath(".path"); angle = atan2 vs viewport centre → gsap.utils.mapRange(-180,180,0,1); paused timeline, motionPath alignOrigin [0.5,0.5], start −0.25, end 0.75; tl.progress(1) on load |
| DOM-synced WebGL pixel-dissolve image reveal | Chakib Mazouni demo | Three.js planes matched 1:1 to DOM imgs; ShaderMaterial uProgress driven by ScrollTrigger; reset on leave (toggleActions); fallback = the plain images themselves |
| Accessible WebGL text | Eemeli Haakana demo | Real HTML text duplicated as WebGL meshes (troika-three-text), camera FOV set so 1 unit = 1px; HTML made transparent but kept selectable/SEO; mask reveal via uProgress/uHeight on inView; post RGB-shift/wave strength = lerped Lenis velocity |
| Flip link→title page transition; slider↔grid switch | Joffrey Spitzer / Federico Pian | Flip.getState → navigate → Flip.from; slider-to-grid via same state capture; Pian animates border-radius during the flip, state shared via Pinia |
| Draggable/Inertia work sliders | Eloy Benoffi | Horizontal cards, 4-step reveal, varied transform-origins; ScrambleText easter egg; ASCII scroll-plucking via ScrollTrigger |
| Fixed-mobile-bars custom scroller | Olha Lazarieva | Custom .scroll-container passed as ScrollTrigger scroller so mobile browser chrome stays fixed — a real phone-behaviour solution worth test-building |
| DOM-synced WebGL portal mask; velocity text | Roman Jean-Elie | MeshPortal with uMask clipping, DOM-bounds→WebGL sync hook; velocity-stretch vertex shader on text; MorphSVG rect→text via render callback |

## Added 26 Oct — Level 2 Chunk 2 exact values (pen/article-measured; source confirmation at deep stage)
| Effect / system | Seen at | Values |
|---|---|---|
| Direction-aware reveal | GreenSock pen pojzxwZ | Entry vector = scroll direction × 100px (fromLeft x=−100, fromRight +100); fromTo → 0/autoAlpha 1; duration 1.25, ease expo, overwrite "auto" |
| SVG mask blinds/grid transition | Codrops SVGMaskScrollTransition | Scrub 2.0–2.5; Horizontal Blinds 30 slits, paired rects expand opposite, stagger 0.02, bottom-up; Random Grid 14 cols desktop → **6 mobile**, shuffled, stagger 0.02; Vertical Blinds 12 strips; shape-rendering crispEdges; rebuild on resize |
| Lottie pinned scrub | GreenSock mdGdbwO / KKWdLRE | scrub 1–2, pin sections; breakpoint starts: <749px "center 45%" else "center center"; speed→scroll-distance: slow "+=30000", medium "+=1000", fast "+=500"; SVG renderer, loop/autoplay false |
| SVG path-morph separator | Codrops OnScrollPathAnimations | Target path in data-path-to; separator viewBox 0 0 100 10, h 150px, absolute, pointer-events none; ST start = el top hits viewport bottom, end = el bottom hits viewport top; same trick as image clipPath 500×750; Lenis lerp 0.1 |
| Runtime Bézier path (responsive by construction) | Codrops/betawaxx | 3 runtime-measured anchors; control-point multipliers 0.8/0.3/0.6/0.2 with Math.min caps; MotionPath scrub true, invalidateOnRefresh, ease none; size split at 50% progress; dev configurator exports production values |
| CSS-3D text cylinder | Codrops 3DTextScroll | No WebGL: perspective 70vw, preserve-3d; radius = min(vw,vh)×0.4; spacing 180/items; pin "+=2000svh" scrub 2, rotateX −80→270 ease none (shorten pin distance on phones) |
| GSAP→uniform bridge | Codrops ShaderAnimationGSAP | uGrayscaleProgress to 1.5s power2.inOut; ripple on 50×50-segment plane, uRippleProgress 0→1→0; Kawase blur uBlurAmount clamp 0–5 (nearest even) by centre distance |
| MotionPath segment loop | SitePoint pen wvGKKRo | start 0.25 → end 0.80, autoRotate, master timeline repeat −1, repeatDelay 5 |

## Added 26 Oct — Level 2 Chunk 3 exact values
| Effect / system | Seen at | Values |
|---|---|---|
| Vanilla infinite carousel + reactive gradient bg | Codrops 3DGradientCarousel | NO WebGL: DOM cards, translateZ/rotateY/scale by centre distance — MAX_ROTATION 28°, MAX_DEPTH 140px, MIN_SCALE 0.8, SCALE_RANGE 0.20, perspective 1800px; velocity + friction decay + infinite wrap, tiny velocities clamp to 0; palette via getImageData downscaled to MAX 48; img.decode() + Promise.allSettled + compositing warmup; settles to 30fps |
| Overflow-hidden letter stagger | Codrops TypographyMotion | GSAP + Splitting.js; staggerValue 0.014, charsDuration 0.5; content toggle = timeline play/reverse; disable custom cursor on touch |
| MotionPath follower (resize-resilient) | GreenSock pen XWoBypQ | duration 5, repeat 12, repeatDelay 1, yoyo true, ease power1.inOut, alignOrigin [0.5,0.5], autoRotate; on resize: save progress, revert, rebuild tween |
| SVG text-on-path scroll | Codrops AnimateSVGTextPath | textPath startOffset coupled to scroll; IntersectionObserver gates off-screen texts; animated SVG filters = dreadful in Firefox (cited bugs) — minimal or none |
| Organic clipPath morph | Codrops OrganicShapeAnimations | anime.js; data-morph-path + per-item duration/easing attributes (example 800ms); deco paths reused via <use>; add tap activation for phones |
| Staged SVG hero scene | CodePen akin-elmas | Wave layers pre-set visibility visible; sun timeline transformOrigin "50% bottom", SlowMo.ease.config(0.3, 0.1, false), duration 5 |

## Added 26 Oct — Level 2 Chunk 4 exact values
| Effect / system | Seen at | Values |
|---|---|---|
| Masked word-by-word headline | React Bits Masked Heading | 29 props; defaults: reveal rise, duration 1.1, stagger 0.09, fillScale 1.25, parallax 26, drift 18, spotlightRadius 160, tracking −0.03, lineHeight 1.06; trigger "view" for phones; reduced-motion behaviour stated in component docs (media stays paused) |
| Elastic lag grid | Codrops ElasticGridScroll | ScrollSmoother smooth 1, effects true; grid regrouped into column wrappers; lag scales with distance from centre column; rebuild on resize if column count changes |
| Infinite parallax grid | Codrops InfiniteLayersGrid | Tiles duplicated 2×2 for seamless tiling; intro tween duration 2, expo.inOut, stagger 0.05; IntersectionObserver visibility class |

## Cross-site rules (verified on the deep reads — re-test on every new entry)
- Scrubbed motion = **linear ease**. Triggered motion = **expo / power2 / power3 out**.
- Reveals run **0.4–0.8s**. Staggers live in **0.02–0.12s** — never larger.
- Lenis feeds its raf into the GSAP ticker: scroll and tweens share one clock.
- `clearProps` after a reveal keeps later CSS working (Heron, 13 tweens).
- Touch/coarse pointers get a separate, simpler path.
- Attribute-driven animation (data-*) keeps a 97-trigger page maintainable (Nick Ho).


---

## DEEP-READ HARVEST — parameter sets merged from slices 1–9 (26 Oct 2026)
Merged by Lane 1 from each slice's library-ready sets. Entry numbers are queue numbers in deep-read-queue.md; full reverse analyses live in deep-reads-slice-<n>.md. Sets are reproduced as the slice authors wrote them (values verbatim).

- **[None]** (slice 1) curl HTML + same-host bundles mined via code-source/fetch_and_mine.sh (extracts in code-source/<slug>/), Codrops article parameters where the entry is a case study, L2-Measured values where marked. Cross-host CDN bundles were SKIPPED per card discipline and are counted per entry; where a site's motion lives in a skipped bundle, the article/L2 values govern and the gap is stated. Library-ready parameter sets are noted per entry (marked LIB); shared libraries are NOT edited in this phase.
- **[4]** (slice 1) case-card structure + reveal set (power2.out, 0.4–0.6s).
- **[6]** (slice 1) Flip.getState/Flip.from transition recipe.
- **[11]** (slice 1) Flip + borderRadius morph values.
- **[12]** (slice 1) 4-step role reveal offsets.
- **[13]** (slice 1) structure note only.
- **[14]** (slice 1) seamless duplicated-track loop.
- **[16]** (slice 1) variable-font tester binding pattern.
- **[19]** (slice 1) 1unit=1px FOV sync; transparent-not-removed DOM text rule.
- **[21]** (slice 1) atan2 → mapRange angle-to-progress recipe (exact values above).
- **[24]** (slice 1) structure note + SplitText line-rise default.
- **[26]** (slice 1) FBO ping-pong loop pattern; loader-gate anti-pattern note.
- **[29]** (slice 1) structure (audience fork, referral ticket values).
- **[30]** (slice 1) duration distribution (0.3/0.4/0.5 core, ≤1.0 ceiling) — house-style candidate.
- **[33]** (slice 1) uGrayscaleProgress 1.5s power2.inOut; Kawase clamp 0–5; 50×50 ripple plane.
- **[34]** (slice 1) chaptered IA pattern.
- **[36]** (slice 1) segment 0.25→0.80, autoRotate, repeatDelay 5.
- **[38]** (slice 1) blinds 30/0.02/scrub 2–2.5; grid 14→6 rebuild; crispEdges rule.
- **[39]** (slice 1) scrub 0.4, center start/end; markers-off caution.
- **[40]** (slice 1) fromTo ±100px, 1.25s expo, overwrite auto, direction from ScrollTrigger self.direction. Rel 5 / Fit 5 (L2).
- **[41]** (slice 1) renderer caps 40fps, DPR ≤1.25, document.hidden skip.
- **[43]** (slice 1) Grid/Full toggle pattern.
- **[44]** (slice 1) ease profile expo.out ×10 / power3.out ×4 / expo.inOut ×3 (mined counts).
- **[47]** (slice 1) overlap-anchor rule.
- **[48]** (slice 1) single reusable plane, 128 segments, measure-at-click rule.
- **[49]** (slice 1) damp reveal 0.6s / dismiss 0.15s; tap-vs-drag 5px / 15px.
- **[50]** (slice 2) ** (a) LottieScrollTrigger helper v2 (context-aware, sort/refresh after DOMLoaded, `'xMidYMid slice'`); (b) speed→end-distance map {slow 2000, medium 1000, fast 500}; (c) breakpoint start pairs {<749px: "center 45%", else "center center"/"center 55%"} + "center 75%" unpinned-feel variant.
- **[53]** (slice 2) ** (a) scroll-morph separator recipe (viewBox 0 0 100 10, 150px, bg-fill, top-bottom→bottom-top scrub); (b) clipPath image-morph variant with the worked 500×750 path pair; (c) Lenis 2022 wiring (lerp 0.1, manual rAF) as the historical baseline vs modern ticker wiring.
- **[55]** (slice 2) ** (a) CSS-cylinder recipe {perspective 70vw/400px, radius 0.4×min(vw,vh), spacing 180/N, rotateX −80→270, scrub 2, end +=2000svh}; (b) dual-circle mirrored-orbit recipe {spacing π/N, direction ±1, +180° readability flip, progress×0.5, scrub 1, unpinned}; (c) tube recipe {spacing 360/N, rotateY 0→360}; (d) backface-visibility:hidden as a mandatory cylinder ingredient.
- **[127]** (slice 2) ** circular-gallery set {ease .05, gains wheel .005 / drag .01 / world .1, arc 75, rotation π→−π across widthTotal, snap 200 ms debounce}; plane sizing rule {700×900 @1500 reference height}; paper-bend vertex line {sin(4x+t)·1.5 + cos(2y+t)·1.5, t += .04}.
- **[None]** (slice 4) 171–203 · B: 204–254 · C: 255–279). Each part keeps its own method header; entry blocks are in queue order. Library-ready parameter sets are noted inside entries — Lane 1 merges them into the shared libraries.
- **[171]** (slice 4) ** - [animation-parameter-library] Proximity falloff trio: linear `1−d/r`, exponential `(1−d/r)²`, gaussian `(e^(−2(d/r)²) − e⁻²)/(1−e⁻²)`, cutoff d ≥ r. - [animation-parameter-library] Frame-independent damping: `level += (target − level) × (1 − exp(−Δt/(smoothing×400)))`, smoothing 0.2, snap ε 0.002, Δt clamp 64 ms. - [animation-parameter-library] Idle wave: period 3.2 s, peak 0.7, phase `(x + 0.6y)/span − t/T`, shape `((1+cos)/2)^2.2`, span `max(220, 0.85 × width)`, engage after 500 ms idle, mix time-constant 600 ms. - [ui-ux-patterns] Reduced-motion + off-screen + zero-idle-cost guards as standard practice for pointer-reactive type. - **Evidence:** Measured (full component source). L2 log values (wght 400→1000, opsz 9→40, radius 50, falloff trio, idleWave) all confirmed exactly.
- **[196]** (slice 4) ** - [animation-parameter-library] Two-axis logo collapse: X 300 ms easeOutQuad, then Y 700 ms easeOutExpo (delay 300); reverse on expand (X 700 easeOutExpo delay 300, Y 300 easeOutQuad). - [animation-parameter-library] Icon hop + elastic spin: translateY −400% (300 easeOutQuad) → [200%→0%] (700 easeOutExpo); rotate 90→0 over 1300 ms easeOutElastic. - [animation-parameter-library] Content choreography values: return 1200 ms / delay 350+i·30; exit 150 ms; backdrop settle scale 1.5→1, 1000 ms easeOutCubic, i·60. - [ui-ux-patterns] Fullscreen-intro = pre-scaled logo box (scale from measured rect, recompute on debounced resize) — intro/loader pattern with zero extra markup. - **Evidence:** Measured (demo.js read in full; article prose agrees).
- **[198]** (slice 4) ** - [animation-parameter-library] Layered pointer-tilt recipe: ranges img(−10,−10) / title(20,10) / text(20,50, rotZ−20) / deco(−20,0, rotZ 3) / shadow(30,20, rotZ−2) / content(5,3); chase 1.5 s power1.out; reverse 1.5 s power2.out (shadow 2 s back.out). - [animation-parameter-library] Distance-mapped durations via linear equation (lineEq): preview fly-in 0.8–1.2 s across viewport width; explode delay 0–0.3 s; restore delay 0.55 + 0–0.2 s. - [ui-ux-patterns] Revealer-sweep preview overlay: panel 0.5 s power1.inOut in → content swap under cover → 0.5 s power3.out out; grid explode 0.4 s power3.out with position-based directions. - **Evidence:** Measured (demo.js read in full).
- **[204]** (slice 4) - [animation-parameter-library] Lenis config: duration 1.1, smoothWheel true, manual rAF loop. - [animation-parameter-library] Word-rotator pair: out 0.45s sine.in yPercent −100 blur 12px stagger 0.04 / in 0.8s sine.out yPercent 100→0 blur 20px→0 stagger 0.05, interval 3200ms. - [ui-ux-patterns] Tiered offer ladder with time+price in the tier name itself (Launch 2–4wk €8k / Sell 4–6wk €12k / Build 6–8wk €15k) + outcome-% project cards (Seen).
- **[221]** (slice 4) - [animation-parameter-library] House-token system: duration 300ms · cubic-bezier(0.86,0.1,0.14,0.9) chrome · cubic-bezier(0.25,0.1,0.25,1) content. - [animation-parameter-library] CSS crossfade slideshow: stacked opacity, 0.4s, progress bar 5s linear infinite = dwell. - [ui-ux-patterns] Award-tier agency site (48 awards claimed) running zero JS animation libraries — CSS-token motion only.
- **[255]** (slice 4) ** - [animation-parameter-library] Morph-state beziers: anticipation-overshoot `cubic-bezier(0.8,-0.6,0.2,1)` @400ms; settle `cubic-bezier(0.7,0,0.3,1)` @450ms after 250ms delay; close `cubic-bezier(0.4,1,0.3,1)` @400ms. - [animation-parameter-library] Constant-velocity particles: `duration_ms = 4.5 × distance_px`; spawn cascade 60ms; fade 0.8s; rotation jitter ±30°. - [animation-parameter-library] Ripple pulse: 1.2s ease-out infinite, scale 3→1, opacity keyframes 0/1@50%/0, second ring +0.6s delay. - **Evidence:** Article + demo JS/CSS = Measured. GitHub mirror exists (`codrops/ShazamButtonEffect`) — not opened, not needed.
- **[271]** (slice 4) ** - [animation-parameter-library] SDA conversion recipe: keyframes + `animation: <name> linear both; animation-timeline: scroll()` gated by @supports + reduced-motion guard; view() default range cover, use `contain` or `25vh 75vh` windows for gentle reveals (scale .5→1 pattern). - [animation-parameter-library] Scroll-linked hue cycle: @property --hue '<angle>' 0turn→1turn on scroll(x); oklch palette slots (40/50, 50/40, 98/10, 95/20, 99/10, 80/90 lightness/chroma pairs); fallback hue 275. - [ui-ux-patterns] Named view-timeline carousel chrome: view-timeline --section-N x + timeline-scope on ancestor; toggle-control 50% opacity-0 keyframes; dot-selected scale .75→1 with bg swap. - **Evidence:** Article code blocks = Measured. Demo pens = Seen (embedded IDs recorded, not opened). Post-2024 browser-support note = Inferred.

## DEEP-READ HARVEST II — exact-parameter blocks (entries not covered above; 26 Oct 2026)

- **[58]** (slice 2, exact parameters) Lenis `duration:1` + `easing: t => min(1, 1.001 − 2^(−10t))` · spring bezier `cubic-bezier(.34,1.56,.64,1)` @ .3s/.4s · scroll-state .6s / `cubic-bezier(.41,.19,.13,.95)` · fade .52s / `cubic-bezier(.25,.46,.45,.94)` · slide .6s / `cubic-bezier(.72,.16,.19,.96)` · lines 3s / `cubic-bezier(.34,.22,.47,.84)`, loading 6s / `cubic-bezier(.45,.28,.34,.84)` · timeline-start .75s ease-in-out from 75cqw + rotateX −90° + scale 1.5 · IO vocabulary {threshold 0/.1/.5; rootMargin 5%/50px/200px/30%/100%} · orbit z-swap at 58%/92%.
- **[153]** (slice 3, exact parameters) **Exact parameters** · Points timeline: duration = points.length; ScrollTrigger trigger ".philosophie", start "top bottom", end "+=" + (100 × points.length) + "%", scrub true, id "points". Pinner: trigger ".philosophie.wrapper", start "top top", end "+=100%", scrub true, pin ".philosophie.wrapper", pinSpacing true, id "pinning", markers true (left on in the pen). Per point i (at position i): indicator backgroundColor → "orange" 0.25; img from autoAlpha 0; article from autoAlpha 0 + y 100; exits at i + 0.75 for all but the last point (indicator → "#adadad" 0.25). CSS: .indicators absolute left 2rem, margin 10vh 0, height 80vh, width 3px, flex column space-between, display none until JS sets flex; .point height 100vh, padding 4rem, flex; article flex-basis 60%; img flex-basis 25%, max-width 25vw.
- **[156]** (slice 3, exact parameters) **Exact parameters** · .grid: position absolute, width 110%, height 110%, top −5%, left −5%, grid-template-columns/rows: repeat(50, 2%), pointer-events none. GridItem.move(): xstart/ystart = getRandomNumber(15, 60); tx = lerp(tx, map(mousepos.x, 0, winsize.width, −xstart, xstart), 0.07), same pattern for ty. Intro: duration 2, ease Expo.easeOut, stagger {amount: 0.6, grid: 'auto', from: 'center'}, from scale 0.7, opacity 0.
- **[157]** (slice 3, exact parameters) **Exact parameters** · Grid vars: --rows 7, --columns 7 (one breakpoint raises columns to 8); templates repeat(var(--rows/--columns), 1fr). Item placement example: .pos-9 { grid-area: 3 / 5 / 4 / 6; }. Push classes override one axis only: .pos-north { grid-row: 1; } .pos-south { grid-row: var(--rows); } .pos-west { grid-column: 1; } .pos-east { grid-column: var(--columns); }. Demo 1: defaults duration 0.9, ease 'expo'; Flip.from {scale: true, prune: true}. Demo 2: duration 1, ease 'expo.inOut'; Flip.getState with props 'borderRadius'; pushed items rotation = gsap.utils.random(-50, 50) entering fullscreen, 0 leaving. Demo 3: duration 0.6, ease 'expo'; direction read from the clicked item's data-direction-items — ALL items move in that one direction.
- **[161]** (slice 3, exact parameters) **Exact parameters.** Config: `repeat: -1, paused: false, speed: 5, paddingRight: 100`. Speed unit: `pixelsPerSecond = (speed || 1) * 100` → **500 px/s**. Gap: 100 px (CSS) mirrors paddingRight 100. Snap: `gsap.utils.snap(config.snap || 1)` — xPercent snapped to integers unless `snap: false`. Items: 6. Font size 186 px.
- **[165]** (slice 3, exact parameters) **Exact parameters.** Defaults: text **'Elevate'**, layers **34** (clamp 2–**64**), depth **2.4** (0–12), faceColor 'currentColor', depthColor **'#7c3aed'**, gradientDepth false, tilt **7.5** (0–12), pointerTracking true, smoothing **0.14** (0.02–0.35), perspective **900** (300–2000), autoOrbit true, orbitSpeed **0.35** (0–2), hoverPush **0** (0–1), float false, fontSize **'clamp(3rem, 12vw, 7rem)'**, fontWeight **900**, shadow true, outline false, intro true. INTRO_MS **1200**, grow = 1−(1−p)³. Push spring **260/17**, PRESS_EXTRA **0.25**. Float: rotX cos(t·1.19)·2·drift, rotY sin(t·0.86+2.1)·4·drift, lift sin(t·1.43)·fontSizePx·0.045·drift, roll sin(t·1.03+0.8)·1.6·drift, FLOAT_EASE τ **0.7 s**. Shadows: face `0 0.035em 0.07em rgba(0,0,0,0.28)`; depth `0 0.18em 0.32em color-mix(in srgb, depthColor 24%, rgba(0,0,0,0.42))` (off in gradientDepth mode). CSS: line-height 0.86, letter-spacing −0.065em, face translateZ(0.6px), outline stroke max(1px, 0.012em). Delta clamp 50 ms.
- **[166]** (slice 3, exact parameters) **Exact parameters.** Defaults: text **'React Bits'**, particleSize **2**, density **4**, color 'currentColor', highlightColor **'#ff5a36'**, highlightMode 'motion', shape 'circle', intro **'gather'**, scatter **180**, gatherDuration **1600**, stagger **420**, clickBurst true, burstStrength **1**, pointerRepel **40**, repelRadius **120**, idleDrift **0.7**, trigger 'mount', fontSize **'clamp(3rem, 12vw, 8rem)'**, fontWeight **800**, glow true. Constants: HEAT_DEADZONE **3**, HEAT_RANGE **36**; follow 0.78 / pointer 0.82 / line-angle turn 0.72 (as 1−x^frames); line shape restLength = max(2, particleSize·0.8 + max(2, floor(density))·0.7), rest angle −π/4, length growth +min(rest·4, speed·1.6), strokeWidth max(1, particleSize·0.65); circle/square size = particleSize·(0.75 + weight·0.45) with a rect fast-path ≤ 2.1. Container min-height 240 px, touch-action pan-y; reduced motion snaps particles to targets; sr-only span carries the text.
- **[169]** (slice 3, exact parameters) **Exact parameters.** Defaults: text **'React ✦ Bits'**, shape **'wave'**, speed **90** (path units/sec), direction 'forward', separator **'✦'**, curviness **90**, tilt **0**, fontSize **46**, fontWeight **800**, letterSpacing **2**, uppercase true, ribbon true, ribbonColor **'#5227FF'**, ribbonWidth **86**, edgeFade **0**, pauseOnHover true, cross false, crossAngle **16**, draggable false, scrollBoost **0**, outline false, outlineWidth **1.5**. Constants: MAX_FLING **2600**, MAX_BOOST **1600**, FADE_STEPS **8**, smootherstep t³(t(6t−15)+10).
- **[170]** (slice 3, exact parameters) **Exact parameters.** Defaults: typingSpeed **50**, initialDelay **0**, pauseDuration **2000**, deletingSpeed **30**, deleteMode **'backspace'**, loop **true**, showCursor true, hideCursorWhileTyping false, cursorStyle **'character'**, cursorCharacter **'|'**, cursorColor 'currentColor', cursorBlinkDuration **0.5**, cursorGlide true, typeEffect **'none'**, mistakes **0**, prefix '', startOnVisible false, reverseMode false, as 'div'. Cursor CSS shapes: bar width max(2px, 0.07em) × height 1.1em; block 0.56em × 1.1em; underscore 0.56em × max(2px, 0.075em); character cursor margin-left 0.25rem; selected-char background color-mix(in srgb, currentColor 25%, transparent). An sr-only span holds the prefix + all sentences for screen readers.
