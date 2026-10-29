# LEVEL 2 INSPECTION LOG — all 600, full protocol (02-LEVEL2-PROTOCOL.md)
Labels: Measured / Derived / Inferred / Seen. Stack claims from the browser pass are Inferred unless a Codrops article states them (Measured) — KEEP entries get curl source confirmation at deep-read stage.

## CHUNK 1 (entries 1–30) — DONE 26 Oct (browser pass 11:53–12:17 Dhaka, 24 min)
**Inspected 28 · Dead 0 · Blocked 0 · Unresolved 2** (23 Daniel Basan, 27 Lucas Aufrere — 3 routes tried each, no URL guessed; parked for Wayback/showcase-snapshot route.)
Limits honestly recorded: browser view exposes no script/CSS lists (stack/reduced-motion Inferred for direct sites); no viewport resize (phone behaviour inferred from structure, not device-tested); several WebGL sites rendered blank/pale in screenshots while DOMs loaded — noted per entry, NOT counted dead. No consent buttons clicked anywhere.

1. **Meech213** — meech213.com · Stack unverified · Scores 2/2/3/3/3/3/2 · REJECT (photo portfolio, no service structure) · Patterns: none
2. **Belen Jones** — belenjones.com · WebGL object, "HOLD SPACE TO DRAG" navigation · 4/2/2/4/3/2/1 · REJECT (drag-only, phone trap) · Pattern: hold-space-drag as WARNING example
3. **Ronin161** — ronin161.com · Measured (Codrops): Nuxt, Prismic, Three.js, GSAP 3.12.5, three 0.161 · 5/3/3/5/4/2/1 · KEEP (technique) · Toon/cel-shaded WebGL character, scroll-linked post stack (vignette, RGB shift, bulge, fluid sim, datamoshing), MSDF WebGL text
4. **Ragged Edge** — raggededge.com · conventional scroll · 0/2/5/2/5/5/5 · KEEP · Metric-led case cards ("$1.25 billion valuation", "2,500 Target stores") — most transferable agency structure in chunk
5. **Weisdevice** — weisdevice.xyz · Measured: vanilla JS, Three.js, GSAP, GLSL, Howler · 5/3/3/4/3/1/1 · REJECT (gate wouldn't enter; too heavy) · Pattern: SVG url(#wobble) filter glitch on toggles; render paused via cancelAnimationFrame on page open, raycast 30 FPS
6. **Joffrey Spitzer** — joffreyspitzer.com · Measured: Astro, vanilla JS, GSAP, Lenis, Three.js, Swup, Tailwind, Prismic · 3/2/4/5/4/3/3 · KEEP · Flip link→title page transitions; slider↔grid Flip.getState switch; SplitText autoSplit; preloader steps(14) — CAUTION: preloader stuck at 100 in browser view
7. **Cathy Dolle** — cathydolle.com · WebGL slider inferred · 3/2/3/3/3/2/2 · REJECT · Pattern: LIST/SLIDER view toggle for work index
8. **Roman Jean-Elie** — romanjeanelie.com · Measured: Next.js, R3F, GSAP + MorphSVG · 5/3/4/5/4/2/1 · KEEP (technique) · DOM-synced WebGL portal mask (uMask clipping, bounds→WebGL sync); velocity-stretch text vertex shader; MorphSVG rect→text via render callback at 60fps
9. **David Heckhoff** — david-hckh.com · 1/1/2/1/2/2/2 · REJECT (too sparse)
10. **Simon Rogers** — simonrogers.info · 0/1/2/3/4/1/3 · REJECT · Pattern: diagonal rotating typographic stream (display idea only)
11. **Federico Pian** — federicopian.com · Measured: Nuxt SSG, GSAP, TresJs, Tailwind, Pinia · 3/2/4/5/4/3/3 · KEEP · Flip transitions with animated border-radius (state via Pinia); SplitText diagonal "clipTitle" global effect; theme-driven simplex-noise background shader; keyboard nav (phone gap)
12. **Eloy Benoffi** — eloyb.design · Measured: Webflow + GSAP (ScrollTrigger, SplitText, Draggable+Inertia, Observer, ScrambleText, ScrollTo) · 2/4/3/5/4/2/4 · KEEP (interaction library) · Draggable/Inertia work sliders, 4-step reveals; ScrambleText location easter egg; ASCII flower scroll-plucking
13. **Jesper Landberg** — jesperlandberg.com · 1/1/5/2/4/4/3 · KEEP · FEATURED/FULL project-view switch; trust-led structure (77 awards counted in intro, Elsewhere links)
14. **dirt** — dirtverse.co · conventional · 0/2/5/2/4/5/5 · KEEP · Services list + enquiry form on one homepage; duplicated-image looping hero — closest service-business analogue
15. **Olha Lazarieva + Max Milkin** — olhalazarieva.com / maxmilkin.com · Measured: GSAP, Three.js/PixiJS, MotionPath · Olha 4/2/5/4/4/5/4, Max 3/2/4/5/4/4/3 · KEEP BOTH · **Budget-radio contact form (5K–10K / 10K–20K / more)** — most reusable service pattern in chunk; Olha's custom .scroll-container so mobile browser bars stay fixed (real mobile datum); Max's MotionPath scattered-letters paragraph assembly; PixiJS text rings
16. **Basement Grotesque** — grotesque.basement.studio · Measured: Next.js + TS, GSAP, Stitches, Locomotive, p2.js; OPEN-SOURCE repo · 0/3/4/3/5/2/3 · KEEP (tester only) · Interactive type tester (editable text + size/tracking/leading sliders); clickable glyph grid; p2.js falling footer letters
17. **Guillaume Colombel** — guillaumecolombel.fr · 2/1/2/2/3/2/2 · REJECT (minimal DOM, hover-driven, nothing verifiable)
18. **Chakib Mazouni WebGL Gallery (tutorial/demo)** — pixelimageeffect.pages.dev · Measured: Astro, Barba, GSAP (ScrollSmoother/ST/SplitText/Flip), Three.js · 4/1/4/5/3/2/3 · KEEP · **DOM-synced WebGL pixel-dissolve image reveal** (planes match DOM imgs, uProgress by ScrollTrigger, fallback = plain images); Flip-carried image page transition
19. **Eemeli Haakana Accessible WebGL Text (tutorial/demo)** — tympanus.net/Tutorials/AccessibleWebGLText · Measured: Three.js + troika-three-text, Lenis, TS/Vite, Motion, EffectComposer · 3/1/4/4/4/2/4 · KEEP · **Transparent-but-accessible HTML text under synced WebGL text** (1 unit = 1px FOV, HTML stays selectable/SEO) — most phone/SEO-safe WebGL pattern in chunk; scroll-velocity RGB-shift/wave post
20. **Shopify Design** — shopify.design · video-led (37 videos) · 0/1/5/4/4/4/3 · KEEP · Named motion-clip gallery as hero; dated "Design in public" cards — showing work without WebGL
21. **MotionPath follow mouse (CodePen)** — Measured from pen JS · 0/4/3/4/2/1/5 · KEEP · Mouse-angle follower: convertToPath, atan2 → mapRange(-180,180,0,1), paused timeline, alignOrigin [.5,.5], start −0.25 end 0.75 — clearest "copy this" snippet in chunk
22. **Monolith Studio** — monolithstudio.com · Measured (article): CMS, rendered-3D hero at 30 FPS · 4/2/5/3/5/5/4 · KEEP · **Best full service-business blueprint in chunk**: team cards with style tags, Google 5-star testimonial strip, knowledge-hub cards, BOOK EXPERIENCE CTA, full style-directory footer, email capture
23. **Daniel Basan** — UNRESOLVED (3 routes)
24. **David Lubofsky** — davidlubofsky.com · 2/1/4/3/4/4/3 · KEEP · Numbered case list 01–08 + "Next availability: 1/1/27" + message CTA — lightweight portfolio model
25. **Liubomyr Ulytskyi** — unbelievablycrap.com · 1/1/2/3/4/1/2 · REJECT ("DON'T CONTACT ME" manifesto) · Pattern: glitch-digit text corruption (display only)
26. **Luca Nardi** — aboutluca.com · Measured (his case page): Gatsby, FBO ping-pong · 4/2/3/3/3/3/3 · KEEP (with loader caveat — homepage gate stuck in browser; do not copy the gate) · Word-by-word story reveal; awards list as trust block
27. **Lucas Aufrere** — UNRESOLVED (3 routes)
28. **Mike Fernandez** — mike-fernandez.dev · 2/1/1/2/2/2/2 · REJECT (loader to 100, interior unreadable in this browser; revisit only if it renders elsewhere)
29. **Ravi Klaassens** — raviklaassens.com · 1/2/5/3/5/5/4 · KEEP · **For Brands / For Agencies audience split; referral ticket (20% per referral); awards block (27) with per-project lists; "Available from Q1 2027" contact block**; works slider 1/3 with counter
30. **Tom Miller / Creative Ocean** — creativeocean.com · Page-stated GSAP · 0/1/4/3/3/4/5 · KEEP · Plainest single-page service model: services + turnaround promise inside the service copy ("initial animation typically ready for review within one day") + deliverables-and-timeline quote request by email/phone

**Chunk 1 tally (verified count): KEEP 19 entries** (3, 4, 6, 8, 11, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 24, 26, 29, 30 — entry 15 covers two sites) · **REJECT 9** (1, 2, 5, 7, 9, 10, 17, 25, 28) · **Unresolved 2** · Total 30 ✓
**Top patterns for the libraries:** budget-radio form (15) · services+enquiry (14) · team cards+tags, testimonials, booking CTA (22) · audience split + referral ticket + availability date (29) · metric-led case cards (4) · Flip transitions (6, 11) · DOM-synced WebGL reveals with plain fallbacks (18, 19) · MotionPath snippet (21)

## CHUNK 3 (entries 61–90) — FIRST RUN FAILED 26 Oct 12:37 Dhaka
Browser window ended without a final result (route authority loss); only routine tab/observe actions recorded, NO inspection steps confirmable, no external actions taken. Chunk 3 counts as NOT RUN — entries 61–90 remain uninspected and the chunk will be re-dispatched. (Chunk 2 is unaffected.)

## CHUNK 2 (entries 31–60) — DONE 26 Oct (browser pass 12:18–12:43 Dhaka, 25 min)
**Inspected 28 · Dead 0 · Blocked 0 · Unresolved 2** (37 MotionPathPlugin & MorphSVGPlugin pen, 59 Saurabh ThreeJS pen — CodePen search is account-gated; 3–4 routes tried each, no URL guessed). No device-testing; mobile notes structure-inferred. Two DuckDuckGo CAPTCHAs were solved by the browser en route (no user action needed).

31. **Thibault Guignand** (Codrops) — thibaultguignand.com · Measured: Vite+React+TS, GSAP SplitText/ST, OGL, Lenis · 4/2/4/5/4/2/2 · KEEP (shader chapter) · Single GSAP-tweened uniform drives all WebGL; flowmap mounted once, textures swapped; reduced motion treated as parallel design (article)
32. **ScrollTrigger Pinning with three.js** (CodePen dv46) · 3/0/2/3/1/2/3 · REJECT (fragment; pin config below fold, NOT invented)
33. **Animate WebGL Shaders with GSAP** (Codrops) — tympanus demo · Measured GSAP+Three ShaderMaterial · 4/1/3/5/3/2/3 · KEEP · GSAP-to-uniform bridge: uGrayscaleProgress 1.5s power2.inOut; ripple vertex (50×50 segments); Kawase blur clamped 0–5
34. **Shopify Editions Spring '26** — shopify.com/editions/spring2026 · 4/1/5/4/5/3/1 · KEEP (IA reference) · Anchor-nav chaptered long-scroll launch page
35. **Emitter trail test** (GreenSock pen) · REJECT (self-declared broken, GSAP2-era)
36. **GSAP3 MotionPath example** (SitePoint pen) · 0/4/3/3/2/3/4 · KEEP · MotionPath segment start 0.25 → end 0.80, autoRotate, master loop repeatDelay 5
37. **MotionPathPlugin & MorphSVGPlugin pen** — UNRESOLVED (4 routes)
38. **SVG Mask Transitions on Scroll** (Codrops) — tympanus demo · Measured GSAP+ST+Lenis · 0/5/4/5/3/4/5 · KEEP TOP PICK · Blinds 30 slits stagger 0.02 scrub 2.0–2.5; Random Grid 14 cols desktop → 6 mobile; Vertical Blinds 12 strips; crispEdges
39. **GSAP PATH POC** (imchris pen) · 0/4/2/3/2/2/4 · KEEP (pattern) · Device mock on tall S-curve path, scrub 0.4, start/end 'center' (markers left on in pen — strip in production)
40. **Direction-aware reveals** (GreenSock pen pojzxwZ) · 0/0/4/4/3/5/5 · KEEP TOP PICK · Entry vector flips with scroll direction (±100px), fromTo autoAlpha, 1.25s expo, overwrite auto
41. **Ghost Trails typography / A Drift** (Codrops) · Measured React+GSAP+Canvas2D · 2/1/3/5/5/2/2 · KEEP · Cached-glyph slice-warp; renderer capped 40fps, DPR cap 1.25, hidden-tab skip
42. **Isabel Moranta** (Codrops) — isabelmoranta.com · Measured: WORDPRESS + vanilla JS + curtains.js + GSAP · 3/0/4/4/4/3/5 · KEEP TOP PICK (WordPress proof) · Velocity-reveal Perlin noise background; blur hover motif; article has dedicated Reduced Motion section
43. **Motoyoshi Takamitsu** — photoyoshi.com · Measured: WP→static export, Three.js, GSAP, Barba · 3/0/3/4/3/2/4 · KEEP (WP→static pattern; horizontal-scroll caveat) · Grid/Full mode toggle
44. **Studiogusto** — studiogusto.com · Measured: WP→Strapi/Next static, GSAP+Lenis · 4/0/4/5/4/2/2 · KEEP · WebGL circular page transition; gooey numbers/team rollovers
45. **Claudio Guglieri** — guglieri.com · 4/0/3/4/5/1/2 · REJECT (spectacle, low service transfer)
46. **Harry Atkins** — harryjatkins.com · 0/0/5/2/5/4/4 · KEEP TOP PICK · Numbered project index 26→01 + huge wordmark + user toggles (text/dark/monochrome)
47. **Snog** — snogproductions.com · Webflow · 0/0/4/3/5/3/3 · KEEP · Giant wordmark + overlapping editorial collage on white
48. **Grid-to-Fullscreen** (Codrops) · three 0.104 + GSAP 2.1 · 4/0/4/5/3/3/3 · KEEP · One reusable 1×1 plane (128 segments) takes over clicked grid item; HTML is the fallback
49. **3D Product Grid R3F** — shoe-finder-wine.vercel.app · Measured Next+R3F+Motion (GSAP abandoned for interruptibility) · 5/0/4/5/3/2/1 · KEEP (pattern only) · Mutable-ref rig; asymmetric damp (reveal 0.6s / dismiss 0.15s); click-vs-drag 5px desktop / 15px touch
50. **LottieScrollTrigger SVG** (GreenSock mdGdbwO) · 0/3/3/4/2/4/4 · KEEP TOP PICK · Pinned Lottie scrub 1; breakpoint starts: <749px → "center 45%", else "center center"; second pin "center 75%"
51. **LottieScrollTrigger Approach 1 (fixed)** (GreenSock KKWdLRE) · 0/3/3/4/1/4/4 · KEEP · Speed→distance map: slow "+=30000", medium "+=1000", fast "+=500"; scrub default 1 (this config 2); SVG renderer, loop/autoplay false
52. **SVG snowflakes** (gvissing pen) · REJECT (seasonal gimmick) · Noted: ease-shaped randomness (one eased random drives scale + inverted duration + opacity)
53. **SVG Shapes on Scroll** (Codrops) — OnScrollPathAnimations · Measured GSAP+ST+Lenis (lerp 0.1) · 0/5/4/4/3/4/5 · KEEP TOP PICK · data-path-to morph target; separator viewBox 0 0 100 10, height 150px; same technique as image clipPath (500×750)
54. **Curved Path Animations** (Codrops/betawaxx) · Measured GSAP+ST+MotionPath · 0/5/4/5/2/4/5 · KEEP TOP PICK · Runtime-measured anchors → generated Bézier (multipliers 0.8/0.3/0.6/0.2, min() caps); dev configurator with Copy Values; CAUTION: live Lando Norris site skipped reduced-motion (article admits it)
55. **3D Text Scroll (Cylinder)** (Codrops) · Measured GSAP+ST+ScrollSmoother, CSS 3D only · 4/0/3/5/4/3/4 · KEEP · perspective 70vw; radius = min(vw,vh)×0.4; pin end "+=2000svh" scrub 2 rotateX −80→270 (long scroll-jack — shorten for phones); mirrored dual circles with +180° readability flip
56. **Podium** — podium.global · Measured React/Next+GSAP+Lenis+Three · 3/0/4/4/5/3/1 · KEEP (IA) · Bold-claim hero + dated work list + Services/Clients proof blocks + one CTA footer
57. **OPX Studio** — opx.studio · 0/0/4/3/5/3/3 · KEEP · Two-link nav + one-line promise + stacked full-screen cases
58. **Shopify Editions Winter '26** — shopify.com/editions/winter2026 · 4/1/5/4/5/3/1 · KEEP (IA) · Roman-numeral chapter nav + "Back to navigation" per chapter
59. **Saurabh ThreeJS - 5** (CodePen) — UNRESOLVED (3 routes)
60. **Infinite Liquid Glass Grid** (Codrops) — infinite-jelly-glass.shader.se · Measured Next+R3F v10 WebGPU+TSL · 5/0/2/5/2/1/0 · REJECT for this bank (record SDF-glass pattern, skip the stack)

**Chunk 2 tally: KEEP 23 · REJECT 5 · Unresolved 2 · Total 30 ✓**
**Running L2 totals (chunks 1+2): inspected 56/600 · KEEP 42 · REJECT 14 · Unresolved 4**

## CHUNK 3 (entries 61–90) — DONE 26 Oct (re-dispatch browser pass 12:37–12:49 Dhaka, 11 min)
**Inspected/resolved 24 · Dead 0 · Blocked 1 · Unresolved 5.** Blocked: 65 (Codrops article 403 bot wall, same RID across reload + fresh browser environment — site-side; retry later from a fresh workflow, do NOT substitute the author's GitHub repo as the demo). Unresolved: 64 (Codrops source for "Astro Dither" not confirmable; probable Borghesi match NOT adopted), 69/70/71/73 (CodePen titles generic or ambiguous across multiple pens; CodePen global search account-gated; no URL guessed). This chunk was the WebGL-showpiece belt: most REJECTs are correct rejections for a phone-first service bank (weight, cursor-dependence, stack age) — patterns still noted per entry.

61. Audio Visualizer (Codrops) · REJECT · audio-reactive shader orb; Draggable panels
62. Audio-Reactive Particles (Codrops) · REJECT · frequency-band particles; beat-detector (60000/bpm)
63. Sticky Image Effect (Codrops) · REJECT (desktop drag) · sticky cursor-following plane, spring-smoothed progress
64. Astro Dither — UNRESOLVED (see above)
65. WebGL Carousel R3F (Codrops) — BLOCKED (403 bot wall, 3+ routes)
66. 3D Bulge Text R3F (Roman Jean-Elie) · REJECT (cursor toy) · DOM-to-texture bulge via html2canvas hook
67. Video Projection Mapping · REJECT (installation) · mask threshold <128 → cubes; 100–1,000 cubes fine, InstancedMesh beyond
68. Pulling Apart SVGs R3F · REJECT (2019 stack) · SVGLoader → z-stacked meshes, react-spring
69. GSAP Morph SVG #02 — UNRESOLVED
70. MorphSVG — UNRESOLVED
71. under construction — UNRESOLVED (8+ exact-title pens; title alone cannot disambiguate)
72. **MotionPath Demo** (GreenSock XWoBypQ) · KEEP · duration 5, repeat 12, repeatDelay 1, yoyo, power1.inOut, alignOrigin [0.5,0.5], autoRotate; resize-resilient (progress saved, tween rebuilt on resize)
73. Move on motion path — UNRESOLVED
74. **SVG Animations with GreenSock** (akin-elmas, Design+Code collection) · KEEP (title caveat: "start" is not part of the pen title) · staged SVG scene; sun timeline SlowMo.ease.config(0.3, 0.1, false), duration 5; wave-visibility gating
75. **Stagger Reveal Text** (Codrops TypographyMotion) · KEEP TOP PICK · GSAP + Splitting.js; staggerValue 0.014, charsDuration 0.5; overflow-hidden reveal/unreveal; play/reverse content toggle; cursor must be disabled on touch
76. Jonnie Hallman — destroytoday.com · REJECT (writing-first; structure ref only) · closing block pattern "That's all. What now?"
77. JP / Caique de Lira — caiquedelira.com · REJECT (minimal hero) · availability badge as conversion copy (browser check cleared by specialist)
78. **Text Styles & Hover Effects** (Codrops Playground) · KEEP · pure CSS/SVG, zero deps; data-letters duplicated-text hover (Kukuri: weight 900, line-height 0.75); hover = progressive enhancement only on phones
79. **Atlason** — atlason.com · KEEP · Featured/Archive filtered gallery + contact overlay (phone/email/socials) — direct portfolio/services page model
80. three.js globe mesh (CodePen) · REJECT · minimal wireframe sphere reference (r68, SphereGeometry(5, 32, 32))
81. Scroll-Reactive 3D Gallery (Codrops) · REJECT for production · harvest: scroll-velocity as reusable signal; mood-palette blending by depth; planeGap 2.5
82. Displaced Sphere (Codrops) · REJECT · custom-shader-material over built-in; tangent normal fix
83. Wavy Infinite Carousels R3F · REJECT for production · modulo-wrap infinite; scroll-speed vertex stretch; cosine curve peak at centre
84. Motion Hover Distortions · REJECT (desktop-only) · velocity-fed uOffset distortion; EffectShell base class
85. Mouse Flowmap OGL · REJECT · Flowmap falloff 0.2, dissipation 0.9 (defaults 0.3 / 0.98); R/G velocity, B length
86. Scroll/Refraction R3F (the-substance) · REJECT (2019 versions) · harvest: declarative Block offset/factor scroll rig; real scroll area in front of canvas
87. Animated Mesh Lines · REJECT · DashRatio/DashArray/DashOffset shader dashes; iOS Safari error reported (phone flag)
88. **3D Infinite Carousel + Reactive Gradients** (Codrops) · KEEP TOP PICK · VANILLA JS, no WebGL: DOM cards translateZ/rotateY/scale by centre distance (MAX_ROTATION 28°, MAX_DEPTH 140px, MIN_SCALE 0.8, perspective 1800px); velocity+friction+wrap; palette from getImageData downscale MAX 48; img.decode + compositing warmup; settles to 30fps
89. **SVG Text on a Path** (Codrops Playground) · KEEP · native SVG textPath startOffset coupled to scroll + IntersectionObserver gating; WARNING: animated SVG filters perform dreadfully in Firefox — keep filters minimal
90. **Organic Shape clipPath** (Codrops Playground) · KEEP · anime.js + data-morph-path (example duration 800ms); <use>-reused deco paths; needs tap activation on phones

**Chunk 3 tally: KEEP 8 · REJECT 16 · Blocked 1 · Unresolved 5 · Total 30 ✓**
**Running L2 totals (chunks 1–3): inspected 80/600 · KEEP 50 · REJECT 30 · Blocked 1 · Unresolved 9**

## CHUNK 4 (entries 91–120) — DONE 26 Oct (browser pass 12:50–13:02 Dhaka, 12 min)
**Inspected 22 · Dead 7 · Blocked 0 · Unresolved 1** (111 Gian Aguilar — profile lists no personal site; client work NOT substituted). The 7 dead are all older Siteinspire listings: 104 Addo (parked/for-sale), 105 Anaïs Zamboni (error page + gallery 500), 109 Diane Martel (DNS gone), 110 Gaston Bouchayer (DNS gone), 115 Manuel Rueda + 119 Mo Coppoletta (certificate privacy errors, not proceeded past), 117 Mathilde Jacon (domain repurposed — now an unrelated gambling site; nothing clicked; a cautionary case for link rot on old gallery entries).

91. **Animated SVG Icons w/ Snap.svg** (Codrops) · KEEP · ~36 hover-morph icons, varied speed/easing; ports to tap
92. **Infinite Parallax Grid** (Codrops) · KEEP · 2×2 tile duplication for seamless tiling; intro gsap.to duration 2, expo.inOut, stagger 0.05; IntersectionObserver visibility class; SplitText captions
93. **Elastic Grid Scroll** (Codrops) · KEEP · ScrollSmoother smooth:1 effects:true; CSS grid regrouped into column wrappers; lag grows with distance from centre column; rebuild on resize if column count changes
94. **Sticky Grid Scroll** (Codrops) · KEEP · sticky-layout scroll-driven grid progression, 12 images
95. **Masked Heading** (React Bits) · KEEP TOP PICK · 29 props recorded; defaults: reveal "rise", duration 1.1, stagger 0.09, fillScale 1.25, parallax 26, drift 18, spotlightRadius 160; **reduced motion VERIFIED in props text** (videos stay paused for reduced-motion users); use trigger "view" on phones
96. Splash Cursor (React Bits) · REJECT · fluid cursor sim, phone-hostile by design
97. Warp Text (React Bits) · REJECT · OGL pointer warp; desktop only
98. **Silo** — silosilosilo.com · KEEP · variant configurator + running total (Webflow+GSAP+Lenis) — the quote-builder analogue
99. UNLIRICE · REJECT · tumbling oval collage, no hierarchy
100. Louis (Lapa Ninja) · REJECT (Webflow paid template, stack fit 0) · harvest: global swatches / light-dark kit pattern
101. **Daniel Triendl** · KEEP · tagged project grid + Explore/Index toggle + selected-clients strip + "Let's work together" close
102. Shivam Sinha · REJECT · cursor-reactive WebGL hero, no content
103. Aaron Meyers · REJECT · loader-gated background picker
104. Addo — DEAD (parked domain)
105. Anaïs Zamboni — DEAD
106. **Design Embraced** (Anthony Goodwin) · KEEP · availability banner + service list + phone/email strip, contact-first
107. **Anton & Irene** · KEEP · full studio IA: Services / Partnerships / Press (carousel WITH autoplay stop control) / Shop / Get in touch
108. **Bureau Cool** · KEEP · selected work + archive + information structure; live-traffic feed as social proof (cookie notice NOT clicked)
109. Diane Martel — DEAD (DNS)
110. Gaston Bouchayer — DEAD (DNS)
111. Gian Aguilar — UNRESOLVED
112. Giulian Drimba (doublepi.me) · REJECT · canvas-only, no recoverable structure
113. Isabel + Helen · REJECT · bare link list
114. **Jean-Christophe Suzanne** · KEEP · dated, categorised work list (2008–2026) + repeating contact marquee CTA
115. Manuel Rueda — DEAD (cert)
116. Mark Dearman · REJECT · 3D showreel hero; harvest: live clock + tools strip header
117. Mathilde Jacon — DEAD (domain repurposed to gambling site)
118. Mime Artist · REJECT · bare link list
119. Mo Coppoletta — DEAD (cert)
120. **Raffael Stüken** · KEEP TOP PICK · Eleventy, "lo-fi scroll-driven, solely semantic HTML" (own colophon); numbered sections Profile/Recognition/Colophon, splash + grid toggles, time-on-page counter — most portable structure in the chunk

**Chunk 4 tally: KEEP 12 · REJECT 10 · Dead 7 · Unresolved 1 · Total 30 ✓**
**Running L2 totals (chunks 1–4): inspected 102/600 · KEEP 62 · REJECT 40 · Dead 7 · Blocked 1 · Unresolved 10**

## CHUNK 5 (entries 121–150) — DONE 26 Oct (browser pass 13:02–13:21 Dhaka, 18 min)
**Inspected 30 · Dead 0 · Blocked 0 · Unresolved 0** — the cleanest chunk yet (all Codrops/CodePen, no walls). Split of KEEPs: 8 production-adaptable + 15 mechanism-study (read the code, do not ship the WebGL as-is). Reduced motion: not verified anywhere in this chunk.

121. Shantell Martin · REJECT · full-bleed line-art hero only
122. **Animated Opening Type** (Codrops) · KEEP production · PURE CSS: attr(data-letter) pseudo-element letter peel, hinge transform-origin per direction
123. Refraction cursor over video (CodePen) · KEEP study · regl; uniforms incl. MOUSE_SIZE 0.042, VIDEO_GLOW 1.5; PIXEL_DENSITY 2
124. WebGL Gooey (CodePen) · REJECT · duplicates 133's mechanism, less documentation
125. **Square Lens** (Codrops) · KEEP study · step()-mask square, radial RGB shift (R 0.01/G 0/B −0.01), lens distortion 1.5, pointer ease 0.1
126. Endless Procedural Snake · KEEP study · steering→cubic Bézier segments, sliding-window curve, parallel-transport frames, instanced scales via DataTextures; radius profile tail 0 → body 0.74–0.85 → head 1.0
127. Infinite Circular Gallery OGL · KEEP study · cos-arc placement (rotation.z map π→−π, y = cos(x/widthTotal·π)·75−75), scroll ease 0.05, snap-to-item; comments report mobile breakage — evidence, not rumour
128. **Creative WebGL Image Transitions** · KEEP production-adjacent · all transitions = progress 0→1 UV math; signature fract-UV x-stretch ×5, factor 0.1
129. Shader Reveal R3F · KEEP study · Perlin noise + radial gradient → alpha; uProgress controls reveal radius
130. Liquid Raymarching TSL · REJECT · SDF smooth-minimum recorded (shared with 136); WebGPU niche
131. Rotating Gallery OGL · KEEP study · quinticInOut vertex rotation on scroll; padding 0.8 wrap
132. Interactive Hover Effects · KEEP study · post-process circle(uv, mouse, 0, 0.2) field; mouseVelocity enlarges radius
133. Gooey Image Hover · KEEP study (canonical) · noise + circle mask: finalMask = smoothstep(0.4, 0.5, n + c); two textures data-src/data-hover
134. Particles Image (Biabiany replica) · REJECT · source-linked replica, no article, canvas not painting here
135. Tropical Particles Rain · REJECT · CPU physics bottleneck, hover-triggered; trails = uncleared previous frame
136. **Shader Techniques / SDF reveal** · KEEP production-adjacent · warped circle SDF, exponential soft-max merge, radial circles radius 0.021; final use = scroll reveal
137. Heat Distortion · KEEP study · sine haze = sin(y·freq + time·0.03)·amp, masked by grayscale map brightness; SVG→canvas→WebGL texture for text
138. Wave Cube Grid · KEEP study · InstancedMesh 20×20=400 one draw call; trail DataTexture 128×1 RGBA; Gaussian wavefront envelope; author's mobile workaround: auto-add random trail points after 3s idle
139. Buildings Wave · REJECT · distance-sorted TweenMax reveal recorded; heavy OBJ load
140. **3D Model Color Customizer** · KEEP production-adjacent · nameID part-matching (name.includes) + material swap; swatch tray; OrbitControls touch-supported; auto-rotate intro 120 frames
141. Underwater Nav PixiJS · KEEP study · semantic DOM nav → canvas sprites, dual filters, focus parity with hover (accessibility-first); comment evidence: freezes phones — disable-on-device lesson
142. Phenomenon Scroll Transitions · REJECT · aPositionStart/End instancing recorded; dated wrapper, scroll complaints
143. Liquid Distortion PixiJS · KEEP study · DisplacementFilter, scale tweened by GSAP (Point 20,20); fragility notes (needs server, Safari gaps)
144. Reactive Depth Tube R3F · KEEP study · shared-signal motion (all refs, no React state in loop); spin damping Math.pow(0.92, dt·60), clamp ±2.0; hover slows time to 0.35×
145. Distortion Hover (hoverEffect lib) · KEEP study · displace → fade → reverse-displace; comment evidence of severe per-machine performance variance
146. **On-Scroll Morphing Background Shapes** · KEEP production · SVG path morph + colour on scroll (anime.js + scrollMonitor); Safari lag noted in comments
147. **Shape Hover Effect SVG** · KEEP production · data-path-hover card shape morph, Snap.svg speed 250, mina.easeinout; responsive grid (33.333% at ≤58em); easiest tap adaptation in the chunk
148. Superhero SVG Filters · KEEP study · feTurbulence baseFrequency 0.08 + feDisplacementMap on mask groups; Chrome-better warning
149. **Infinite Marquee on SVG Path** · KEEP production · CSS offset-path + Motion; baseVelocity 20, hover factor 0.3 spring-smoothed, scroll-velocity direction reversal; responsiveness fix = D3 getPointAtLength resampling
150. **Dynamic Shape Overlays** · KEEP production TOP · vanilla JS multi-layer SVG overlay (viewBox 0 0 100 100, preserveAspectRatio none), per-point delay, toggle range 4·random+6; mobile-menu ready; older-Safari arrow-function caveat

**Chunk 5 tally: KEEP 23 (8 production + 15 study) · REJECT 7 · Total 30 ✓**
**Running L2 totals (chunks 1–5): inspected 132/600 · KEEP 85 · REJECT 47 · Dead 7 · Blocked 1 · Unresolved 10**

## CHUNK 6 (entries 151–180) — DONE 26 Oct (browser pass 13:21–13:38 Dhaka, 16 min)
**Inspected 29 · Dead 0 · Blocked 0 · Unresolved 1** (159 "Roofing website design" — SIX Behance projects share that exact title and the bank entry names no author; none substituted). Two search CAPTCHAs solved by the browser itself; no cards, no user action.

151. **Elastic SVG Elements** (Codrops) · KEEP · data-attribute SVG path morphs, bouncy easing; menu variants incl. 240px sidebar morph-shape
152. **getScrollLookup helper** (GreenSock pen) · KEEP (title-suffix caveat logged) · pin-aware anchor scroll: getScrollLookup(targets, "top 125px"), pinSpacing false
153. **Pin Sidebar** (CodePen) · KEEP · pinned step-through: start "top bottom", end "+=100% × points", .indicator sidebar — cleanest process pattern in chunk
154. **Scale container on scroll** (CodePen) · KEEP · pinned scrub hero: scrub 1, start clamp(top 12%), force3D, SVG wave divider 480×40
155. Cinematic 3D Scroll (Codrops) · REJECT (build) · cylinder-shader scroll + R3F scene direction; particle inertia decay 0.92
156. Motion Hover Image Grid · KEEP (desktop accent) · 50-cell grid 110%×110% at −5%, showItems scale 0.7→1 centre stagger
157. Push Grid Items · KEEP · grid items push apart, 3 variations — before/after grids
158. **Never Ending Story** (Codrops) · KEEP TOP · plain HTML/CSS/JS, Lenis infinite:true, parallax −50%→50%, first section duplicated aria-hidden; **measured iOS fixes: 100svh sections + nested-Lenis seam fix**
159. Roofing website design (Behance) — UNRESOLVED (6 exact-title projects)
160. **Roofix — Roofing/Construction** (Behance, Jafar Khan) · KEEP TOP · live: roofix-phi.vercel.app · FULL section order banked (nav → hero + 6-field quote form + 5.0/2K+ reviews → About counters → Services ×4 → Process ×4 → Projects ×5 → Why Choose Us (GAF Master Elite claim) → Team → Testimonials → Articles → Locations ×12 → CTA → footer); stack: headless WP + Astro + GSAP + Lenis + Splide; claimed Lighthouse 100/94. **QA LESSON: the live site ships fencing copy inside the roofing quote form, locations text and closing CTA — template residue; our template-first system must scrub trade terms per personalisation**
161. **GSAP Marquee Text** (GreenSock pen) · KEEP · horizontalLoop helper: speed 5, paddingRight 100, starts after document.fonts.ready
162. **K72 Marquee Hover** (Codrops) · KEEP · direction-aware (closestEdge) marquee menu hover, type 6vw, restart at half width
163. **Trionn architecture** (Codrops) · KEEP (deep-read only) · shared scroll driver; **371-frame WebP sequence scrubbed via a single <img>, preloaded in requestIdleCallback batches of 20 with img.decode()**; Lenis on gsap.ticker; **reduced motion VERIFIED: hero rotation slows (not stops), gsap.matchMedia separate desktop/mobile logic**
164. Circular Text (React Bits) · KEEP · spinDuration 20 default; port ring math only
165. Depth Text (React Bits) · KEEP · layers 34, depth 2.4px, perspective 900px, smoothing 0.14, autoOrbit for no-pointer
166. Particle Text (React Bits) · KEEP (sparingly) · gather 1600ms, stagger 420ms, repelRadius 120px, particleSize 2px, density 4
167. **Stroke Text** (React Bits) · KEEP TOP · draw 1.6s, fillDelay 0.2s, stagger 0.05, power2.out, wipe fill (bottom = liquid rise); most phone-legible showpiece
168. Tech Text (React Bits) · REJECT · cursor-only vector reveal, off-brand
169. **Text Loop** (React Bits) · KEEP · SVG-path marquee: speed 90 u/s, curviness 90, ribbonWidth 86px, scrollBoost option, pauseOnHover
170. **Text Type** (React Bits) · KEEP · typewriter: typing 50ms, delete 30ms, pause 2000ms, mistakes 0–1 option — rotating service phrases
171. Variable Proximity (React Bits) · KEEP · variable font wght 400→1000, opsz 9→40, radius 50, falloff linear/exponential/gaussian, idleWave for touch
172. **Eco-Luxury Lawn Care** (Behance, Web Tixa) · KEEP TOP · **WordPress + Elementor Pro native**; split hero (serif headline, dual CTA, stats), trusted-by strip, 4 value props, process (01/02/05 numbering slip noted), pricing tiers $120/$299, testimonials; palette cream + deep green + gold. No live site linked — design only
173. Maison TALI portfolio (Behance→live) · KEEP · three-worlds grid + "where my art belongs" venue list — gallery rhythm reference
174. **Shotline template** (Behance→Framer live) · KEEP · fullest page architecture: counters hero → services → 5-step process → work → trusted-by → **Other-vs-Me comparison table** → achievements → testimonials → journal → FAQ → close
175. Advorus (Land-book) · REJECT (Webflow, legal) · harvest: award-laurel trust bar + stat strip 99%/99%/$17M+/4.9
176. Clonix (Land-book) · REJECT (Framer) · colour ref: dark + lime
177. Effica (Land-book) · REJECT (Framer) · harvest: dual-CTA assessment hero
178. **Eleos** (Land-book→eleos.la) · KEEP · giant wordmark over photography + mission statements; closest Land-book entry to construction (Webflow — structure only)
179. Le Flair (Land-book) · REJECT (fashion) · harvest: hotspot dots on photography
180. Focused (Land-book) · REJECT (Webflow template) · harvest: stat strip layout

**Chunk 6 tally: KEEP 22 · REJECT 7 · Unresolved 1 · Total 30 ✓**
**Running L2 totals (chunks 1–6): inspected 161/600 · KEEP 107 · REJECT 54 · Dead 7 · Blocked 1 · Unresolved 11**

## CHUNK 7 (entries 181–210) — DONE 26 Oct (browser pass 13:39–13:59 Dhaka, 20 min)
**Inspected 25 · Dead 0 · Blocked 0 · Unresolved 5** (188 Volt + 189 What Matters Agency — no Land-book post or unambiguous live URL exists on the routes tried; 208/209/210 — Siteinspire itself returned 500 server errors on open + reload, a source-site failure; 210's domain was identified (francksauvaire.com) but sits behind a certificate error that was not bypassed, so unresolved, not dead). This was the Land-book belt: mostly Webflow/Framer — REJECTs are platform verdicts; patterns and palettes harvested regardless. Three search CAPTCHAs solved by the browser itself.

181. Frame&Co. (Land-book) · REJECT (Webflow template) · HARVEST: construction/architecture page system (Home/Services/Contact V1–V3, Project/Blog CMS, FAQ) + warm stone palette (#EDECE7, #1C1A16, #867756, #A49571…)
182. Grafit Agency · REJECT (Webflow) · harvest: conversion-proof layout (client results "176% more conversions" + stats + process accordion)
183. Jords+Co · REJECT (Webflow) · harvest: trust-first hero + rotating phrases + 3-phase process
184. Komma Komma · REJECT · harvest: word-by-word intro reveal; Barba route transitions = phone risk
185. MONOLOG · REJECT (Webflow) · harvest: client-wins proof cards (+21% conversions, $100K+ in 30 days) + principles + pricing-transparent FAQ ($20k floor stated openly)
186. SIRNIK · REJECT (Webflow) · harvest: word-by-word scroll reveal + 2-step contact form
187. Spurwing · REJECT (Webflow) · harvest: "what your website needs to get right" 4-point checklist + 13-question FAQ accordion
188. Volt — UNRESOLVED
189. What Matters Agency — UNRESOLVED
190. Xirex · REJECT (Framer template) · palette banked (dark browns)
191. Zelvix · REJECT (Framer template) · HARVEST palette: acid lime #DEEF2F on near-black #0B0C0B
192. Kim · REJECT (Framer template)
193. Leòn · REJECT (Webflow template) · pale-peach editorial palette noted
194. Able Parris · REJECT · canvas-rendered, no extractable structure (cautionary)
195. Bielke&Yang · REJECT · harvest: bracketed section labels 〔 ABOUT 〕 + named-person contact CTAs with direct phone/email
196. **Collapsing Logo Effect** (Codrops) · KEEP · anime.js + CSS grid/vars; intro box scales X then Y as page transition; stack fit 5
197. **Decorative Letter Animations** (Codrops) · KEEP · anime.js + Charming; per-word SVG; duration 400, stagger i*60, easeInExpo; stack fit 5
198. **Grid Layout Motion Hover + Preview** (Codrops) · KEEP · CSS Grid + TweenMax; hover → content preview for service galleries
199. Dash Creative (Codrops case study) · REJECT · cursor WebGL hero; shader params recorded for reference (radius 0.41, amplitude 0.082, frequency 13, speed 0.98); article itself flags cursor reliance as a weakness
200. **On-Scroll Text Motion** (Codrops demo) · KEEP · GSAP scroll word-streams; single-file portable; stack fit 5
201. **Product Grid Layout** (Codrops Blueprint, MIT cbpShop.js) · KEEP · 3D-rotating card + size tooltip + action bar — direct service-card pattern
202. Apptension (CSSDA) · REJECT · the 2015 D3/SVG award site no longer lives at the domain (redesigned SaaS site now) — redesign-drift recorded honestly
203. **Built Kindly** (GSAP Showcase) · KEEP · **"Toggle motion effects" button VERIFIED on the live page**; time-aware greeting; "Anatomy of Kind Design" explainer structure; ScrollTrigger + Flip
204. **dhero.studio** (Land-book) · KEEP TOP · **WordPress** studio; "Three ways to start" priced/timed tiers (Launch 2–4wk from €8k / Sell 4–6wk €12k / Build 6–8wk €15k); project results with % outcomes; quote form with budget bands €5k–€40k+ and service checkboxes; 8 testimonials
205. Resonance Studio · REJECT (unverified stack) · harvest: sprint-tier booking model + chat-style testimonials
206. Becane Paris · REJECT (Next.js + Three.js) · harvest: editorial large-type collection layout
207. UNVEIL® · REJECT · percentage loader → blank canvas; no extractable content
208. Christian Weigel-Schwarzenberg — UNRESOLVED (Siteinspire 500)
209. Cocoon Studio — UNRESOLVED (Siteinspire 500; same-name entities ambiguous)
210. Franck Sauvaire — UNRESOLVED (domain identified; certificate error not bypassed)

**Chunk 7 tally: KEEP 7 · REJECT 18 · Unresolved 5 · Total 30 ✓**
**Running L2 totals (chunks 1–7): inspected 186/600 · KEEP 114 · REJECT 72 · Dead 7 · Blocked 1 · Unresolved 16**

## CHUNK 8 (entries 211–240) — DONE 26 Oct (browser pass 13:59–14:17 Dhaka, 17 min)
**Inspected 27 · Dead 2 · Blocked 0 · Unresolved 1** (217 Matt Flynn — three distinct people share the name; none guessed). Dead: 214 Julia Parris (original domain Not Found; successor site NOT substituted), 219 Seamus McGarvey (personal domain HTTP 500). Siteinspire detail pages 500 throughout — entries resolved via Siteinspire search + per-name search, both routes logged. The Codrops belt (229–240) is mechanism-study only: every mechanism recorded in the worker report; production verdicts REJECT across the board (WebGPU/TSL/ray-marching/cursor/physics — none survives a phone-first Elementor build).

211. Graeme Pereira · REJECT · original grid gone; single statement page remains
212. Hans Fredrik · REJECT · per-collection photo carousels with counters (pattern noted)
213. John-Paul Pietrus · REJECT · editorial masonry feed (WordPress inferred)
214. Julia Parris — DEAD (original)
215. LaChapelle Studio · REJECT · video-dependent hero, almost nothing inspectable
216. **Mara Züst** · KEEP · A–Z archive + category filter rows, text-first — service-index structure
217. Matt Flynn — UNRESOLVED
218. Robert Mapplethorpe · REJECT · museum site; serif wordmark + deep-colour header noted
219. Seamus McGarvey — DEAD (HTTP 500)
220. **Thomas Duval** · KEEP TOP · full-bleed photo hero + six gallery cards + **tap-to-call footer** — exactly phone-first service behaviour
221. **UZIK** · KEEP · service carousel with /6 counter + tag-chip work filtering (components only)
222. **VERDE** · KEEP · dark green/black + bright-green accent; ~50-project archive list with service tags (Code/Design/Shop/Logo/Print/Photo) — single-file friendly
223. Basic Three.js Example (CodePen) · REJECT · generic starter
224. Fragment-shader distort (CodePen) · REJECT · mechanism: displacement map + progress uniform (three 0.117)
225. three.js calebeby (CodePen) · REJECT · obsolete (r79, CoffeeScript, CanvasRenderer)
226. Cube Starter WebGPU (CodePen) · REJECT · cleanest modern starter (import map three@0.176 WebGPU) — study only
227. Heightmap pen (CodePen) · REJECT · procedural 256×256 canvas texture as heightmap
228. webgl experiment (CodePen) · REJECT · obsolete ShaderPass era
229. 3D Cluster TSL · REJECT study · BatchedMesh face extrusion 0.45, noise remap 0.15–0.75, hover-raycast uniform, Sobel + Bayer dither post
230. Light Trails · REJECT study · instanced tube trails, mod-looping, frame-rate-independent lerp via Math.exp(−c·delta)
231. Metaballs · REJECT study · ray marching ITR 16, EPS 1e-4, smoothMin −log(exp(−k·d1)+exp(−k·d2))/k, 15-point pointer trail
232. Particles Music Visualizer · REJECT · DUPLICATE of chunk-3 #62 (same Codrops article) — beat dispatch 60000/bpm, curl-noise particles
233. Interactive Particles · REJECT study · image pixels → 57,600 instanced points from a 320×180 image, dark-pixel cull (red ≤ 34), touch-texture displacement
234. Texture Projection · REJECT study · savedModelMatrix + project() snapshot; poisson sampling (7.73, 9.66)
235. WebGPU Gommage · REJECT study · MSDF text dissolve: shared uProgress orchestrator syncing dissolve + dust + petals; msdf-bmfont (Cinzel 64, range 16)
236. Custom Cursor Trail TSL · REJECT study · 200×200 Float32 trail field (flow R/G, speed B), decay^(delta·60), 3×3 Gaussian read
237. Physics 3D Menu · REJECT · DOM nav → per-letter Cannon bodies, gravity −50, punch force 25, pivot chaining
238. Character Controller · REJECT · game controller (Rapier capsule + raycast grounded); AI-generated via Bolt.new — no service transfer
239. OGL Mouse Trails · REJECT study · NDC-space polyline widening, spring 0.06 / friction 0.85, dpr 2
240. 3D Characters · REJECT · beginner tutorial; pivot-group trick noted

**Chunk 8 tally: KEEP 4 · REJECT 23 · Dead 2 · Unresolved 1 · Total 30 ✓**
**Running L2 totals (chunks 1–8): inspected 213/600 · KEEP 118 · REJECT 95 · Dead 9 · Blocked 1 · Unresolved 17**

## CHUNK 9 (entries 241–270) — FIRST RUN FAILED 26 Oct (browser session ended 14:52 Dhaka: browser slot rehydration failure, no final report filed)
Last checkpoint inside the run: 20 of 21 Codrops entries and 2 CodePens resolved, several pens still pending uniqueness checks, NO scores or report delivered. Nothing from this run is counted — chunk 9 is NOT RUN for tally purposes. Re-dispatched fresh (same pattern as chunk 3's recovery). No external actions occurred in the failed run.

## CHUNK 9 (entries 241–270) — DONE 26 Oct (fresh run, browser pass 14:53–15:04 Dhaka, 10 min; first run failed, see note above)
**Inspected 26 · Dead 0 sites (1 dead demo link inside an inspected entry) · Blocked 0 · Unresolved 4** (262, 263, 266 — generic CodePen titles, no unique pen; 265 — its only route runs through the GSAP forums, which are OFFLINE: GSAP took them down over a PHP security vulnerability; retry after forums return).

241. Distorted Mask Babylon.js · REJECT · cursor shader mask; GSAP fade 0.5
242. Generative Artwork · REJECT · noise instanced grid, 50 cols, palette banked
243. **Horizontal Parallax Gallery DOM→WebGL** · KEEP · lerp ease 0.07; image 125% width at −12.5%; MAX_SHIFT 4/8/10 (subtle/medium/max-safe); WebGL intensity 0.4; touch support is only an unimplemented exercise — add before use
244. Cyberpunk Scene · REJECT · bloom + SMAA Ultra + chromatic aberration stack recorded
245. **3D Circular Carousel in WordPress (Droip)** · KEEP TOP · PURE CSS 3D, no WebGL: 12 cards × 30°, rotateY + translateZ 850px, perspective 9000px, orbit 30s infinite (X −10°, Y 360°), card 435px, radius 20px; click zoom scale 2 / out 0.8; **demo site labs.droip.io is DNS-dead — article values complete, pattern portable to Elementor/single-file**
246. Fake 3D Image · REJECT · depth-map UV shift (uv + mouse·depth.r), mouse-only
247. Interactive 3D Character · REJECT · look-at rig, neck clamp 50°, tap plays clips (partial touch)
248. **Interlude Astro transitions** · KEEP (contract only) · 21 transitions; payloads router ~5kB, engine ~4kB, GSAP ~28kB; lazy-load on hover/focus; contract: cover → lock → swap → move focus → replay on back/forward
249. **Progressively Enhanced WebGL Lens** · KEEP (discipline) · HTML first; DOM img hidden ONLY when smooth scroll active; DOM text made transparent, never removed (SEO/a11y); studio's usual touch rule = disable WebGL/scroll effects on touch/below breakpoint; useImageAsTexture reuses currentSrc (srcset-aware)
250. The Aviator · REJECT · article itself: optimized for desktop
251. Curtains.js Video Transitions · REJECT · pixelRatio cap min(1.5, dpr) noted
252. WebGPU Fluids · REJECT · MLS-MPM + screen-space rendering; 100k particles; support still limited
253. **SVG Menu Icon with Segment** · KEEP TOP · Segment.js <2kB, zero deps: constant segment length 24, draw 0.3s / reverse 0.1s elastic-in(1, 0.3); draw at 1000×1000, CSS scale(0.1) cross-browser trick — THE mobile menu icon pattern
254. **Page Loading Effects** · KEEP (pattern only) · data-opening/data-closing SVG overlay morph, viewBox 0 0 80 60 slice; reimplement CSS-only, no Snap.svg dependency
255. **Shazam Morphing Button** · KEEP · SVG decoration morph BEHIND a real button (button→circle→player via data-path attrs); content transition 0.4s; article includes mobile Safari workarounds — morphing CTA pattern ("Call now" → contact card)
256. **feMorphology Outline Text** (Sara Soueidan) · KEEP · zero JS: dilate SourceAlpha radius 4 + feFlood + feMerge; fallback stated — no filter support = plain text (true progressive enhancement)
257. Creative Gooey Effects · REJECT · goo filter recipe banked (blur + alpha-contrast + atop); article warns resource-intensive
258. **Fancy SVG Letter Animation** · KEEP · anime.js stroke-dashoffset draw, 3 layered copies per letter; needs single-stroke glyph artwork
259. **Page Preloading Effect** · KEEP · CSS + SVG-circle progress (stroke-width 6, dashoffset transition 0.2s), loaded header 1s cubic-bezier(0.7,0,0.3,1), **.no-js fallback = post-animation state**; time-box any loader
260. Trampoline Effect · REJECT · draggable stack, navigation dead-end
261. CSS-Only Layout 2012 · REJECT · :checked ~ sibling panels; refresh resets state
262. Flip Pin & Scale — UNRESOLVED
263. GSAP Code (image sequence) — UNRESOLVED (two candidates, neither unique)
264. Pen VwEJyaV · REJECT as demo · TITLE MISMATCH: content is a services accordion in a ScrollSmoother wrapper, and its ScrollSmoother.js loads from a third-party theme URL — do NOT copy that dependency path; harvest: ScrollTrigger.refresh() after accordion height animation (0.3s)
265. Incremental + Horizontal Scrolljack — UNRESOLVED (GSAP forums offline)
266. Lottie + SmoothScrollbar pen — UNRESOLVED (no pen combines all three)
267. Mixed Observer Scrolljack (GreenSock) · REJECT · observer tolerance 10, preventDefault true — scrolljacking traps phone scroll; pattern recorded as a warning
268. **Pin 2 word cycle** (kokoruz) · KEEP · pinned scrub word cycle: end "+=" + words×50% (5 words → +250%), pinSpacing false, marginBottom (words−1)×50vh; markers left ON in the pen — strip before reuse; maps directly to USP cycles
269. **scroll horizontal Gsap** (charlyta) · KEEP · Locomotive + scrollerProxy wiring; data-bgcolor/data-textcolor section theming (body transition 0.3s); pin tween below editor fold — NOT verified, do not quote
270. **Horizontal scroll + pagination** (Cottonltd) · KEEP · x: −(scrollWidth − clientWidth), scrub+pin+pinSpacing, end "+=" + offsetWidth, invalidateOnRefresh; numbered pagination dots — most phone-legible horizontal pattern

**Chunk 9 tally: KEEP 13 · REJECT 13 · Unresolved 4 · Total 30 ✓**
**Running L2 totals (chunks 1–9): inspected 239/600 · KEEP 131 · REJECT 108 · Dead 9 · Blocked 1 · Unresolved 21**

## CHUNK 10 (entries 271–300) — DONE 26 Oct (browser pass 15:04–15:15 Dhaka, 10 min)
**Inspected 30 · Dead 0 · Blocked 0 · Unresolved 0 — cleanest chunk yet.** React Bits Props-table defaults govern (Customize presets differ on several entries — all logged in the worker report; table values banked).

271. **CSS scroll()-driven animations** (Codrops/Argyle) · KEEP TOP · pure CSS, zero JS: animation-timeline: scroll() / view(); animation-range cover→contain; named view-timelines + timeline-scope; @property --hue in oklch for scroll-linked theme; pagination dots synced to a snap carousel. Article (Jan 2024): Chromium-only at writing — verify current support at build time. **Reduced motion VERIFIED: every animation wrapped in @media (prefers-reduced-motion: no-preference)** — the bank's model article.
272. One Element Scroll · REJECT · single-element choreography, fragile on short viewports
273. Fullscreen Scrolling Slideshow · REJECT · Observer scroll/drag hijack + text cursor
274. Smooth Scroll + Inner Images · REJECT · fixed-main lerp scroll; article comments report it broken on phones; harvest only the inner-image overflow trick (--overflow 40px, img height calc(100% + 2×overflow))
275. **Scrollable + Draggable Timeline** · KEEP · scrub-0 track tween + Draggable (inertia = Club plugin, noted); drag↔scroll sync via mapRange; **reduced motion VERIFIED (early-return in initSectionAnimation + media-query gating) + keyboard handling** — process-strip candidate
276. Sketch 028 loop scroll · REJECT · decorative
277. ASCII Text · REJECT · WebGL2 pointer art; reduced-motion freeze pattern noted (matchMedia freezes time, kills intro/idle)
278. **Blur Text** · KEEP · blur-to-sharp by words/letters, blur 10, distance 50, stepDuration 0.35, delay 200, trigger view — cleanest headline reveal in chunk
279. **Count Up** · KEEP TOP · count/odometer-roll modes, compact format (1.2K), duration 2, view-triggered — trust-stats standard
280. Cubes · REJECT · cursor-facing cube grid
281. **Curved Loop** · KEEP · curved marquee, curveAmount 400, speed 2, edgeFade — calm services ticker (interactive off)
282. Decrypted Text · REJECT · hacker aesthetic off-brand (sequential decrypt mechanic noted)
283. Echo Text · REJECT · ghost-trail readability cost
284. Falling Text · REJECT · matter-js physics toy
285. **Fold Text** · KEEP · CSS-3D paper fold: angle 92, duration 0.65, stagger 0.045 power3.out, perspective 700, crease shading 0.55 — single hero headline use
286. Fuzzy Text · REJECT · canvas strip fuzz
287. Glitch Text · REJECT · legibility-hostile (recipe noted)
288. **Gradient Text** · KEEP · zero-dep: seamless loop = first colour repeated at end; 8s cycle; gradient-outline pill variant
289. **Rotating Text** · KEEP · phrase cycle 2000ms, highlight block auto-resizes per phrase — services-list hero pattern
290. Scrambled Text · REJECT · pointer-radius core; intro decode alone doesn't justify
291. **Scroll Float** · KEEP · scrubbed letter arrivals: ease back.inOut(2), stagger 0.03, distance 120%, smoothing catch-up; starts "center bottom+=50%"
292. **Scroll Reveal** · KEEP · THE standard reveal: scrub or enter mode, blur 4px sharpen, baseOpacity 0.1, tilt 3° levelling, word end "bottom bottom"
293. Scroll Velocity · REJECT · velocity skew/stretch distorts trust copy; use 281 instead
294. **Shiny Text** · KEEP · zero-dep sheen: speed 2s, angle 120°, shineWidth 40%, softness 0.8 — CTA/badge treatment
295. **Shuffle** · KEEP · letter shuffle 0.35s power3.out, stagger 0.03; **respectReducedMotion=true by default — only React Bits entry with a documented RM default**
296. **Split Flap Text** · KEEP · board: flip 0.12s, stagger 0.06, cycleDelay 2400ms, padTo 12 width stabilisation — "Now booking" status accent only
297. **Split Text** · KEEP · entrance system: delay 50ms, duration 1.25, masked char-slide variant — standardise entrances on this or 278
298. Text Cursor · REJECT · cursor toy
299. Text Pressure · REJECT · variable-font warp is pointer-first + font download weight
300. **True Focus** · KEEP · focus frame cycles words (blur 5px on unfocused, frame 0.5s, pause 1s) — trust-phrase pattern ("Licensed · Insured · Local")

**Chunk 10 tally: KEEP 15 · REJECT 15 · Total 30 ✓**
**Running L2 totals (chunks 1–10): inspected 269/600 · KEEP 146 · REJECT 123 · Dead 9 · Blocked 1 · Unresolved 21 — HALFWAY through the 600.**

## CHUNK 11 (entries 301–330) — DONE 26 Oct (browser pass 15:15–15:37 Dhaka, 22 min)
**Inspected 27 · Dead 1 · Blocked 0 (1 source page 500'd — entry still inspected via live site) · Unresolved 2** (303 Kayla Fisher Behance, 305 generic "Website Portfolio" — no author, unidentifiable). Dead: 327 Genius (domain now a parked/for-sale page).

301. Desktop.fm · REJECT · 3D CD waiting-list novelty
302. **Nik R.** (nikolaradeski.com) · KEEP · **WordPress + Elementor + GSAP portfolio**: proof strip (13+ yrs, 600+ projects, 130+ reviews), 32 testimonial cards, 8-Q FAQ, contact form with project/recruiter radios, footer ticker — directly transferable
303. Kayla Fisher Photography — UNRESOLVED
304. Tusu template · REJECT (stack) · Framer/Webflow only; brutalist grid + oversized-type hero noted as type reference
305. Website Portfolio — UNRESOLVED
306. **Accordion with CSS3** · KEEP · :checked + siblings, checkbox/radio variants, default-open variant; article warns some mobile browsers miss label clicks — FAQ standard with that caveat
307. **Fullscreen Overlay Effects** · KEEP · 11 menu overlay styles incl. SVG-morph GENIE
308. **Grid + Scrollable Content View** · KEEP · 12-item grid → scrollable detail view — project showcase pattern
309. Organic Text Distortion · REJECT · sine/cosine velocity distortion, wheel hijack
310. **Text Input Effects** · KEEP · 14 named floating-label field styles (Haruki, Hoshi, Kuro…) — quote-form fields
311/312. Letter Effects 1+2 · REJECT · hover/click letter play
313. **Nifty Modal Effects** · KEEP · 19 CSS modal transitions (Fade&Scale, Newspaper, Blur, 3D Slit…) — quote form/lightbox
314. **Pricing Tables** · KEEP TOP · 12 named 3-tier sets with real prices — the pricing-pattern reference
315. Text Opening Sequence · REJECT · timed intro blocks content
316. **Tooltip Styles** · KEEP · 9 SVG-shaped styles (Classic→Flip); needs tap fallback on phones
317. **Digital Butlers** · KEEP · **quote-form blueprint**: budget radios (10k–20k/20k–50k/50k–100k/100k+), "Get a quote in 48 hours", transparent pricing FAQ (starts $10k; 30/40/30 payment split published), "Proof, not promises" stats band (4.9 Clutch, 672 projects/321 clients), filterable work grid, outcome-led case copy
318. Noomo · REJECT (build) · enterprise WebGL showpiece; harvest: budget-radio contact form (50K–100K/100K–300K/300K+), services accordion
319. **Bakstad Construction** · KEEP TOP · real Seattle GC (BBB-corroborated, est. 2008): project-led homepage (project + location + year cards), Selected Press band (Luxe Magazine), "Conscientious Construction" approach section, footer with named principal + full address + phone/email + Get in Touch; no quote form on homepage — contact path is footer + button
320. **Afternow** · KEEP · WordPress B2B agency, progressive-reveal homepage
321. **AKLR Studio** · KEEP · filter pills WITH COUNTS (All 12, Brand Identity 06…) + published email/phone footer
322. **Domaine** · KEEP · stats-led band (750+ sites, $5B+ GMV), services mega-structure, migration-outcome stats (+19–29% conversion), partner wall, 9-city footer
323. **Grain & Mortar** · KEEP · small-agency blueprint: anniversary ticker, Brand/Web service split, process statement, industries-served link list, footer email + newsletter
324. **Haptic** · KEEP · published subscription pricing ($15k/mo part-time, $30k/mo embedded, Enterprise bespoke) each with Book a call; live office clocks; word-by-word intro
325. **Hyper Effekt** · KEEP · numbered Solutions (01 Design / 02 Build / 03 Grow), 21-review carousel all 5.0 from a directory, 23-logo wall, full sitemap footer
326. **ONOERA** · KEEP · session cards with durations + dated event cards (venue, time) — booking-card pattern
327. Genius — DEAD (parked domain)
328. PORTO ROCHA · REJECT (build) · harvest: one-line outcome descriptor per project in the index
329. **reboot** · KEEP · scroll-fill text (grey→black word reveal) + tight pitch: "Projects start at 8 weeks", Book a call, email footer; React/Next/Tailwind (structure only)
330. Alex Trochut · REJECT (build) · ~120-card grid too heavy; harvest tag-filter system. (Siteinspire source page 500'd twice — live site inspected via verified domain; an unrelated GitHub copy NOT used.)

**Chunk 11 tally: KEEP 18 · REJECT 9 · Dead 1 · Unresolved 2 · Total 30 ✓**
**Running L2 totals (chunks 1–11): inspected 296/600 · KEEP 164 · REJECT 132 · Dead 10 · Blocked 1 · Unresolved 23**

## CHUNK 12 (entries 331–360) — DONE 26 Oct (browser pass 15:38–15:52 Dhaka, 14 min) — LANE 1'S LAST INSPECTION CHUNK
**Inspected 27 (incl. 358 to public limit) · Dead 0 · Blocked 0 · Unresolved 3** (331 Antonia Keuhn, 334 Ketchup n Mustard — Siteinspire detail 500s + no live domain found; 359 Increase — no Recent.design post locatable). 353 carries an identification caveat: the exact-title Behance project was NOT locatable; the closest Behance match (same title minus "UI/UX", by Samuel Olasunkanmi) was inspected and is labelled as such — not a silent substitution.

331. Antonia Keuhn — UNRESOLVED
332. Brent Couchman · REJECT · portfolio gone; single contact splash remains
333. Jez Burrows · REJECT · plain text bio page now
334. Ketchup n Mustard — UNRESOLVED
335–347. PixiJS/WebGL pens + Codrops WebGL belt · ALL REJECT (mechanisms banked in worker report: GPGPU particle fields, 64px-canvas ripple texture driving UV distortion, instanced rain 1,000 with ~87.5% portal cut, SDF mouse-trail instancing, TSL never-rebuilt tube grids with the hairy-ball frame lesson, per-vertex cloth, Rapier voxel drops)
348. **Circular Progress Button** · KEEP · morphing submit: 250×70 → 70px circle, SVG progress r=32.5 stroke 5 #1ECD97, drawn checkmark success / cross error, elastic variant — form-feedback standard
349. **feTurbulence Textures** (Soueidan) · KEEP · baseFrequency useful range 0.02–0.2; turbulence vs fractalNoise; numOctaves ≤5; displacement via feDisplacementMap scale; rough-paper recipe (turbulence 0.04 → feDiffuseLighting surfaceScale 2 → fractalNoise, octaves 5); squiggly text = resource-intensive, avoid on mobile
350. **SVG Filters: Moving Forward** · KEEP (index) · series map (101 → feMorphology → poster → duotone → conform → turbulence) + uncovered primitives feTile, feConvolveMatrix
351. **Poster Effect feComponentTransfer** · KEEP · discrete tableValues posterize (full: .25 .4 .5 .75 1 per channel); alpha table "0 0.5" opacity recipe
352. **SVG Filters 101** · KEEP · foundation: filter region default −10%/120%; drop-shadow chain (blur SourceAlpha stdDeviation 10 → feFlood → composite "in" → feOffset 20/20 → feMerge); typo watch: stdDeviation, not "stDeviation"
353. **Modern Cleaning Service Website** (Behance, closest match — see caveat) · KEEP · trade-native blueprint, **WordPress + Elementor + WooCommerce**: scarcity top bar ("4 available slots this week"), rating-badge hero (Google/Yelp 4.9), service cards, differentiators, testimonials, **frequency-toggle pricing (1BR $89 / 2BR $105 / 3BR $119)**, How It Works "book in under 60 seconds"; NO live client site exists
354. **App Showcase Grid Overlay** · KEEP (secondary) · perspective 1000px device→grid (translateZ −350px); jQuery-era — vanilla rewrite needed
355. Image Toolbar Overlay · REJECT · hover-only reveal, phone-hostile
356. **Responsive CSS Timeline 3D** · KEEP · CSS-only radio timeline: perspective 600px, rotateY 10deg→−5deg on check, accent swap #41838e→#F26328, transitions 0.6s/0.8s with bounce cubic-bezier(.59,1.45,.69,.98); ≤540px line moves left; checkbox variant = multiple open
357. **Responsive Full Width Tabs** · KEEP · MIT cbpFWTabs, start-index option; labels collapse to icons on narrow widths; 6th tab wraps — services-tabs standard
358. Osmo Animated Grid Overlay · REJECT for deep read · vault-gated, public name only (Osmo: 225 vault resources; Solo €20–25/mo as displayed)
359. Increase — UNRESOLVED
360. Augen · REJECT (stack) · Vue/Nuxt/Lenis product site; pill nav + numbered mission/vision pattern noted

**Chunk 12 tally: KEEP 9 · REJECT 18 · Unresolved 3 · Total 30 ✓**
**Running L2 totals (chunks 1–12, Lane 1 only): inspected 323/600 · KEEP 173 · REJECT 150 · Dead 10 · Blocked 1 · Unresolved 26**
**Lane 1 inspection complete. Remaining chunks 13–20 (240 entries) run with helper chats; Lane 1 owns the merge.**

## MERGE — HELPER CHUNKS 13–20 FOLDED IN 26 Oct (full per-entry records in the helper files named per chunk; Lane 1 merged tallies + KEEP lists only)

## CHUNK 13 (361–390) — helper file level2-help-chunk-13.md
**Resolved 30 · KEEP 13 (361, 362, 363, 364, 366, 369, 372, 374, 380, 381, 382, 388, 389) · REJECT 16 · Dead 1 (386) · Unresolved 0**

## CHUNK 14 (391–420) — helper file level2-help-lane2.md (Lane 2)
**Inspected 28 · KEEP 14 (393, 394, 395, 401, 403, 404, 405, 406, 407, 408, 409, 411, 413, 419) · REJECT 15 (incl. dead 417 carrying a REJECT verdict) · Dead 1 (417) · Unresolved 1 (420)**

## CHUNK 15 (421–450) — helper file level2-help-chunk-15.md
**Inspected 28 · KEEP 22 (421, 422, 424, 425, 426, 427, 428, 429, 430, 431, 432, 433, 435, 440, 441, 442, 443, 444, 446, 448, 449, 450) · REJECT 6 · Dead 2 (423, 434) · Unresolved 0**

## CHUNK 16 (451–480) — helper file level2-help-lane3.md (Lane 3)
**Inspected 16 · KEEP 11 (451, 455, 457*, 458, 464, 465, 470, 471, 474, 475, 476) · REJECT 7 (incl. 456*) · Dead 1 (478) · Blocked 2 (456, 457 — bot-check; *verdicts provisional from search evidence) · Unresolved 11** — Awwwards listing live-URLs are not exposed by search for most entries; unresolveds carry 3+ logged routes each.

## CHUNK 17 (481–510) — helper file level2-help-chunk-17.md
**Inspected 29 · KEEP 12 (483, 489, 492, 495, 496, 498, 499, 500, 504, 506, 507, 509) · REJECT 17 · Dead 1 (481) · Unresolved 0**

## CHUNK 18 (511–540) — helper file level2-help-lane4.md (Lane 4)
**Inspected 27 (23 full + 2 showcase-only + 2 moved, examined to the extent possible) · KEEP 11 (511, 514, 515, 516, 517, 523, 528, 531, 535, 538, 539) · REJECT 18 (incl. dead 525/527 carrying REJECT verdicts) · Dead 2 (525 domain hijacked to gambling, 527 parked) · Blocked 1 (524) · Unresolved 0**

## CHUNK 19 (541–570) — helper file level2-help-chunk-19.md
**Inspected 25 · KEEP 14 (542, 547, 549, 552, 554, 555, 557, 558, 561, 562, 565, 567, 568, 569) · REJECT 11 · Dead 4 (543, 545, 550, 551) · Unresolved 1 (553)**

## CHUNK 20 (571–600) — helper file level2-help-chunk-20.md
**Inspected 27 · KEEP 17 (571, 572, 574, 576, 584, 585, 586, 587, 588, 592, 593, 594, 595, 596, 597, 598, 599) · REJECT 10 · Dead 1 (579) · Unresolved 2 (582, 583)**

# LEVEL 2 FINAL TOTALS (all 20 chunks merged, 26 Oct)
**Inspected 532/600 · KEEP 287 · REJECT 250 · Dead 23 · Blocked 4 · Unresolved 41 · Sum check: 532+23+4+41 = 600 ✓**
Bookkeeping notes: KEEP+REJECT = 537 vs 532 inspected — the +5 is verdicts attached to non-inspected statuses (chunk 14: dead 417; chunk 16: provisionals on blocked 456/457; chunk 18: dead 525/527). Statuses, not verdicts, are the 600 accounting.
**DEEP-READ QUEUE: 287 KEEPs + 13 promoted mechanism-study rejects = 300 (the floor) — see deep-read-queue.md, pre-split into 9 slices.**
