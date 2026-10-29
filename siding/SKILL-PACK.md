# Skill Pack: homepage rebuild (three versions per section)

Source: WEB-SKILLS_2.md (1,504 skills), the user's priority-1 reference. The whole index (lines 92-1668) was read in four parallel passes; this pack is built from the library's recommended packs plus every skill that plausibly helps this brief. Brief in one line: an image-led, low-text, motion-rich homepage for Austin Pro Siding, Windows & Roofing, nine sections, each in three switchable versions, mobile first, shipped as one self-contained HTML file.

Left out on purpose: image generation and stock libraries (S1300, S1317, S1308, S0496), because every photo must be the client's own; isometric and illustrated assets (S0504, S0526, S0414), because the brief rules out model-drawn illustration; Three.js scene skills (S1335, S1340, S1341), because the build uses one small custom WebGL shader rather than Three.js; React, Next, Tailwind and native-app skills; video pipelines; and S0631 / S0708, which describe the document-style look the user rejected.

Total: 193 core skills + 42 Front-End Checklist rules for the final QA sweep = 235.

## A. Direction and anti-generic taste (22)
- S1320 build-awwwards-quality-sites: the acceptance bar for this brief (art direction, hero, GSAP choreography, one scroll engine, purposeful WebGL)
- S1303 tastemaker: anti-slop taste engine for every section version
- S1314 no-ai-design-slop: one coherent idea; every animation must explain something
- S1306 audit-ai-design-slop: removal-first audit of the rejected homepage
- S0001 frontend-design: ground the look in the exterior-trade subject
- S0223 frontend-design (DFII): score each idea's impact against feasibility
- S0006 impeccable: bolder, distill, animate, delight and audit playbooks
- S0095 design-taste-frontend v2: kills the "average page" headline-plus-cards pattern
- S0213 design-taste-frontend (ECC): corrects generic bias in layout and motion
- S0214 high-end-visual-design: award-tier spatial rhythm and micro-interactions
- S0217 redesign-existing-projects: upgrade path from the rejected build
- S0641 open-design/redesign-skill: audit the old build before redesigning
- S0650 open-design/taste-skill: infer the brief before choosing a look
- S0651 open-design/taste-skill-v1: variance and motion-intensity dials, so versions 1/2/3 differ on purpose
- S0624 open-design/gpt-tasteskill: hero and composition rules for award-level pages
- S0647 open-design/soft-skill: motion choreography plus banned patterns
- S0659 anti-ai-slop: the "seven sins" check for each version
- S0220 anti-slop-design: seven-axis quality gate
- S0381 regards-art-direction: art direction from real award-site sections; idea test
- S0471 hallmark: a "designed, not generated" floor for the redesign
- S0098 bencium-impact-designer: "pick an extreme" tone against the document feel
- S1502 scroll-craft: page grammar and a feeling curve with one engineered peak

## B. Image-led layout and page grammar (14)
- S0626 image-to-code-skill: image-first rule, the direct fix for "too much text"
- S0627 imagegen-frontend-web: per-section image art direction and hero composition (direction only, no generation)
- S1358 image-first-grid-layout: full-bleed photography, copy anchored to it
- S1375 editorial-portfolio-chapters: work-led chapters, oversized service type
- S1374 documentary-brutalist-agency: billboard type over documentary photos
- S1356 editorial-tech: cinematic media bands, asymmetric grids
- S1354 agency-grid-layout-minimal: oversized type on a disciplined grid
- S0668 template/aster-atelier: imagery-led site with a cinematic-scroll contract
- S0713 template/magazine-poster: poster composition for a type-led hero version
- S0740 web-prototype-taste-brutalist: viewport-bleeding numerals for the proof section
- S0356 elayadesign/landing-page-design: strict hero, type, radius and motion rules
- S0449 MengTo/landing-page: above-the-fold structure and CTA path to booking
- S0329 compact-landing: a compact world with personality and zero layout shift
- S0739 template/web-prototype: self-contained single-HTML prototype workflow

## C. Three-version system (8)
- S0082 variant: real alternatives, not tint swaps
- S1474 parallel-concepts: versions that behave differently, not only look different
- S0330 explore-design: distinct directions side by side in one HTML file
- S0613 creative-director: methods to reach three genuinely different concepts
- S0067 prototype: a picker for switching versions
- S0736 template/tweaks: live control panel with saved state, the model for the 1/2/3 switch and picks panel
- S0093 design-lab: variations plus a feedback loop
- S1472 concept-selection: fixed criteria for picking winners

## D. Style references with transferable craft (9)
- S0119 bold: heavyweight type, commanding layouts
- S0133 dramatic: theatrical full-bleed imagery
- S0136 expressive: personality-driven layouts
- S0176 storytelling: scroll as a narrative journey
- S0878 tesla: radical subtraction; imagery carries the page
- S0838 nike: kinetic energy, huge type over photos
- S0752 airbnb: photo-magazine warmth
- S0870 spacex: every section a full-screen scene
- S0898 wise: massive type, confident colour

## E. Typography (8)
- S0074 better-typography: scale, wrapping and font loading for Mona Sans
- S0100 ui-typography: prices, numerals and punctuation details
- S0667 typography: tracking, leading and weight discipline
- S0665 typography-hierarchy-editorial: big scale jumps, display tracking
- S0666 typography-hierarchy: hierarchy failures, spacing as hierarchy
- S1433 typography-scale: bold scale on Mona Sans width and weight axes
- S1430 readable-measure: line length for the little body text left
- S1352 number-details: 01/02/03 markers and numeric detail for the version switch

## F. Colour (5)
- S0071 better-colors: ramps and tokens; visualiser swatch system
- S0660 color: accent discipline and contrast minimums
- S0413 oklch-skill: perceptual paint palettes and contrast checks
- S1418 color-system: palette roles with compliance
- S0248 design-token-contrast: fix AA failures without losing the hue

## G. Layout, spacing, responsive (8)
- S0073 better-layout: grouping; one primary action per section
- S0247 design-spatial: composition plus the no-overflow-at-375 check
- S1428 layout-grid: responsive columns from 375
- S1432 spacing-system: consistent rhythm
- S0470 rad-spacing: nested spacing by proximity
- S1431 responsive-design: mobile first, input-type aware
- S0106 responsive-design: fluid type, container queries
- S0454 progressive-blur: legible type over full-bleed photos

## H. Tokens and system (3)
- S0009 design-system: three-layer tokens as CSS variables
- S1461 design-token: tokens shared across all 27 versions
- S0234 design-system invariants: no font-swap flash; motion choreography reference

## I. Motion foundations (16)
- S0059 emil-design-eng: when and how to animate
- S0060 animate: purpose, curve, interruption
- S0061 animation-vocabulary: exact effect names
- S0063 review-animations: strict motion quality bar
- S0064 improve-animations: audit of the old build's motion
- S0065 find-animation-opportunities: what should and should not move
- S0083 12-principles-of-animation: timing, easing, staging
- S0089 to-spring-or-not-to-spring: easing vs springs
- S0658 animation-discipline: motion must earn its place; duration limits
- S0652 open-design/ui-animation: easing defaults, choreography, reduced motion
- S0633 open-design/motion-design: beat map, attention, continuity between sections
- S0441 MengTo/animation-systems: restraint, default easing and durations
- S1436 animation-principles: easing, staging, follow-through
- S1465 motion-system: duration and easing tokens, reduced-motion policy
- S0410 transitions-polish: motion token scale; open/close asymmetry
- S0409 transitions-dev: number pop-ins, swaps, success and error motion

## J. GSAP and scroll engineering (14)
- S0181 gsap-core: matchMedia and reduced motion
- S0187 gsap-timeline: hero intro choreography
- S0186 gsap-scrolltrigger: pinning, scrub, batch
- S0184 gsap-plugins: Flip, Draggable, Observer, CustomEase
- S0183 gsap-performance: batching, cursor followers
- S0188 gsap-utils: mapRange, snap for sliders and calculator
- S0403 gsap-web: ScrollTrigger + Lenis sync in one stack
- S0447 MengTo/gsap: timeline and stagger recipes, pitfalls
- S0448 MengTo/gsap-scrolltrigger-storytelling: pinned, scroll-synced storytelling
- S1321 cinematic-gsap-lenis-motion-system: clip reveals, pins, magnetic hover, cursor
- S1322 cinematic-scroll-storytelling: sticky stacks, preloader, footer reveal
- S0204 scroll-experience: parallax, sticky storytelling, performance
- S1328 scroll-world-storytelling: story map and style bible (HTML/SVG mode)
- S0634 open-design/motion-lab: ready GSAP ScrollTrigger and text-effect recipes

## K. Signature effects (12)
- S0451 MengTo/masked-reveal: bold masked word reveals
- S0450 MengTo/marquee-loop: seamless marquee for proof and reviews
- S1324 reveal-hover-effect: before/after spotlight that follows the cursor, touch fallback
- S1326 scroll-scrubbed-visual-sequence: pinned, reversible house transformation
- S1327 scroll-scrubbed-word-reveal: short statements revealed on scroll
- S1329 staggered-word-reveal: headline entrances
- S1325 scroll-progress-timeline: steps told as a scroll story
- S1323 pointer-trail-emitter: paint trail idea for the colour section
- S0440 MengTo/animation-on-scroll: light IntersectionObserver reveals
- S0576 cut-the-curve: zoom-through and waterfall entries
- S0578 motion-doctrine: causal motion; sections hand off like one camera move
- S0411 transitions-ui-generation: scan-line reveal for a before/after version

## L. Interaction, micro-interactions and fun (13)
- S1445 interfaces-that-feel: the emotional layer for "not fun"
- S0412 jakubkrehel/make-interfaces-feel-better: interruptible motion, compounding details
- S0189 make-interfaces-feel-better: tap targets, image outlines
- S0104 interaction-design: micro-interactions and scroll animation
- S0075 better-ui: enter/exit motion, icon transitions
- S0340 diip3sh/feel: physical sliders and snaps
- S0212 design-spells: small delightful details
- S0405 iart-ai/micro-interaction: press and hover principles
- S1448 micro-interaction-spec: specs for toggles, pins, sliders, submit
- S0462 interactive-hit-areas: no dead zones on pins and toggles
- S1443 gesture-patterns: drag before/after, swipe reviews
- S0211 ui-motion: toggle and curtain moves for the version switch
- S0341 diip3sh/playthru: hint cursor that shows people they can drag

## M. WebGL (5)
- S0385 flornkm/webgl-components: one context, frame loop discipline, fallbacks
- S0646 open-design/shader-dev: GLSL for the before/after transition
- S0322 cloudai-x/threejs-shaders: dissolve and displacement GLSL (ported to raw WebGL)
- S1338 shaders-cursor-ripples: ripple-over-image pattern
- S0457 MengTo/webgl-landing-steering: how much WebGL vs conversion and performance

## N. Motion performance and reduced motion (5)
- S0062 animation-performance: frame budget on phones
- S0056 fixing-motion-performance: compositor-only properties, scroll jank
- S0399 iart-ai/60fps-animation: transform and opacity only, FLIP
- S0400 iart-ai/accessible-animation: tiered reduced-motion gating for GSAP and Lenis
- S1315 optimize-web-animations: profile GSAP, WebGL and rAF loops

## O. UX laws, flows, forms and states (16)
- S1442 form-design: booking form end to end
- S0661 form-validation: input state machine and validation timing
- S1440 feedback-patterns: submit and calculator confirmations
- S1439 error-handling-ux: form and finder recovery
- S1447 loading-states: preloader and progressive image reveal
- S0244 ui-states: empty, error and success states
- S0664 state-coverage: five required states for calculator, finder, map, form
- S1455 state-machine: version switch, finder and form states
- S1453 search-ux: neighbourhood finder, zero results
- S0662 laws-of-ux: Hick and Fitts limits for finder, calculator, CTAs
- S1435 von-restorff-effect: one dominant booking CTA
- S1452 peak-end-rule: peak at the visualiser, end at booking
- S1441 fitts-law: thumb-sized targets at 375
- S1444 hicks-law: few choices per section
- S1438 doherty-threshold: responses under 400 ms
- S1450 navigation-patterns: minimal nav, section jumps

## P. Copy and content (7)
- S1494 ux-writing: micro-copy and CTAs
- S0612 open-design/copywriting: cut copy to punchy lines
- S0099 design-audit: reduction filter that cuts text
- S1407 content-strategy: which words survive
- S0390 stop-slop: remove AI tells from the copy that remains
- S1503 humanizer: strip filler
- S0630 open-design/marketing-psychology: framing monthly payments and the booking CTA

## Q. Accessibility (7)
- S0054 fixing-accessibility: names, keyboard, focus, forms
- S0070 better-accessibility: WCAG 2.2, motion, zoom
- S0657 accessibility-baseline: contrast, targets, focus for toggles, sliders, map
- S0479 build-primitive: ARIA and keyboard contracts for switch, slider, combobox
- S0277 addyosmani/accessibility: WCAG 2.2 POUR audit
- S0273 AccessLint/contrast-checker: focus, motion and target checks
- S1458 accessibility-audit: WCAG 2.2 AA findings

## R. Performance and SEO (5)
- S0281 addyosmani/performance: budgets and formats for embedded images
- S0280 addyosmani/core-web-vitals: hero LCP, CLS, INP on toggles
- S0231 web-performance-optimization: image optimisation
- S0055 fixing-metadata: title, share tags
- S0282 addyosmani/seo: local-contractor meta and schema

## S. Review, critique and QA (16)
- S0638 open-design/plan-design-review: 0-10 per dimension with slop flags
- S0673 template/critique: five-dimension review incl. innovation
- S0502 Superfuture/design-review: ranked critique of hierarchy, motion, states
- S1499 critique-information-density: targets "too much text"
- S1501 critique-visual-hierarchy: eye flow per section
- S1500 critique-typography: type check
- S1498 critique-composition: balance and rhythm
- S1497 critique-color: contrast and palette coherence
- S1495 critique-affordance: toggles and pins look clickable
- S1473 heuristic-evaluation: expert usability pass
- S1482 design-qa-checklist: build against design
- S0242 ui-score: 0-100 gate
- S0072 better-interface: one ranked report
- S0241 ui-review: mobile best-practice review
- S0005 webapp-testing: Playwright screenshots at 375 and 1440
- S1504 playwright-cli: reduced-motion and mobile emulation

## T. Front-End Checklist rules, final QA sweep (42)
S0914 alt-text, S1011 dimensions, S1038 fetchpriority-attribute, S1114 lazy-above-fold, S1115 lazy-loading, S1082 image-file-size, S1166 page-weight, S1050 font-loading, S1000 cumulative-layout-shift, S1113 largest-contentful-paint, S1095 interaction-to-next-paint, S1087 import-on-visibility, S1132 memory-leaks, S0991 css-containment, S1190 reduced-motion, S1209 scrolljacking, S1169 parallax-effects, S0915 anchor-smooth-scroll, S0947 autoplay-media, S1276 view-transitions, S0971 color-contrast, S1049 focus-styles, S1046 focus-management, S1107 keyboard-navigation, S1246 tabs-accessibility, S1018 draggable-accessibility, S0964 carousel-accessibility, S1259 touch-targets, S1268 unique-id, S1020 duplicate-id-active, S0924 aria-hidden-focus, S0982 content-without-css, S1066 horizontal-scroll, S1062 h1, S1128 local-business, S1248 tel-mailto, S0927 aria-live-regions, S1213 sensory-instructions, S1055 form-labels, S1056 form-validation, S1093 input-types, S1001 currency-formatting

## Supplement for the immersive brief (29 Oct, round 2: 31 skills, read in full, notes-13..17)
The owner's new brief (custom cursor per element, layered depth, rich SVG renders, 3D where it earns it, text as motion) needed skills the first pack had left out. Total pack now 224 core + 42 checklist.

Cursor, pointer and depth
- S1323 pointer-trail-emitter: distance-emitted survey trail for the map cursor
- S1333 build-interactive-particle-trail: stale-point reset rule for every follower; burst pattern
- S0086 morphing-icons: the cursor's three-line glyph that morphs per element
- S0222 antigravity-design-expert: isometric tilt plane for the credentials version
- S1330 add-mouse-driven-orbit: one damped pointer target split across unequal opposing layers
- S1425 law-of-figure-ground: parallax layers stay ground, instruments are figure; scrims on photos
- S0159 perspective: vanishing-point construction; every hover effect lists its keyboard and touch path
- S1332 background-grid-webgl: perspective blueprint grid behind the spec section
- S1363 ambient-section-particles: considered for a storm atmosphere (density by area, settle mode)
- S1364 atmosphere-background: light folds leaning to the pointer behind the call CTA
- S0145 immersive: exhibit framing (proof you play) and the arcade hover for one button language
- S1348 css-alpha-masking: 15/85 edge fades on marquees, course strips, grid far field
- S0184 gsap-plugins (re-read): SplitText, DrawSVG, MorphSVG, Draggable, Inertia, Observer, ScrambleText exact options

SVG renders and technical drawing
- S0407 svg-animation: draw-on in construction order, morph, seek harness
- S0361 dimensional-drawing: line weights, chain dims with closing formula, title block, never invent values
- S1362 technical-wireframe-info-layout: exploded structure with sparse pills
- S0468 blueprint-animation: scan-line wipe from photo to blueprint to photo, phase timings
- S0424 hairline-adopt, S0425 hairline-create: one-stroke isometric window that answers the pointer
- S1361 split-layout-technical: drawing panel + mono spec panel, accent only on the active detail
- S0197 motion-advanced: drag thresholds, count-up crawl, progress ring, follower springs (ported to GSAP)
- S0526 wheresryan22/anatomy: real objects as explanation, four-tone solids, exploded views 64/14.2, review checklist
- S0504 Teddarific/anatomy-asset: iso camera 55-60°/30°, stroke weights, palette tokens, composition table, craft checks

3D decision
- S0205 3d-web-experience, S0206 premium-3d-website, S1344 webgl-3d-object, S1335 build-wireframe-scan-reveal, S1334 build-threejs-scroll-worlds, S0313 cloudai-x/threejs-fundamentals: when 3D earns its place, budgets, fallbacks; outcome: solids in SVG, WebGL only for light and paint, no Three.js in the single file.
