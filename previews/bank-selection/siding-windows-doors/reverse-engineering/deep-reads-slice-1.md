# DEEP READS — SLICE 1 (queue entries 3–49, 34 entries)
Lane 1 · 26 Oct 2026 · Source-level standard: curl HTML + same-host bundles mined via code-source/fetch_and_mine.sh (extracts in code-source/<slug>/), Codrops article parameters where the entry is a case study, L2-Measured values where marked. Cross-host CDN bundles were SKIPPED per card discipline and are counted per entry; where a site's motion lives in a skipped bundle, the article/L2 values govern and the gap is stated. Library-ready parameter sets are noted per entry (marked LIB); shared libraries are NOT edited in this phase.

---

## 3 · Ronin161 portfolio — ronin161.com — code-source/ronin161/
Stack (L2-Measured via Codrops case study): Nuxt + Prismic + Three.js (three 0.161) + GSAP 3.12.5. Source pass: same-host bundles mined; ScrollTrigger references 0 in same-host JS — the motion code ships in the Nuxt payload/CDN chunks, so parameters below are article-stated.
Mechanism (toon-shaded WebGL character portfolio): a cel-shaded 3D character rendered with a custom toon material (gradient-map quantised lighting) sits in a fixed WebGL canvas; scroll drives a post-processing stack in sequence — vignette, RGB shift, bulge/pinch, a fluid-sim pass and datamoshing-style smear — each effect's uniform is bound to scroll progress ranges, so the character distorts more the deeper you scroll. Page content itself is conventional DOM over the canvas.
Rebuild notes: the transferable core is the *scroll→uniform binding pattern*: one ScrollTrigger per effect band, progress written into a shader uniform, effects sequenced not stacked. The character itself (model + toon rig) is a multi-day asset build.
Transfers to my stack as: the scroll-bound uniform pattern for a single hero canvas (e.g. a roof/house illustration that subtly distorts) — desktop accent only.
Would not survive copying: the full post stack on phones (5 chained passes = GPU cost per frame) and the character asset pipeline.
LIB: scroll→uniform banding pattern.

## 4 · Ragged Edge — raggededge.com — code-source/ragged-edge/
Stack (Mined): GSAP + ScrollTrigger (12 refs, 38 ST configs in same-host JS), IntersectionObserver ×6, rAF ×60 (custom loop code). Eases mined: linear ×12, power2.out ×6, power2.in ×2, power4 ×2.
Mechanism: a conventional-scroll agency site whose motion is almost entirely *content reveals in service of proof*: metric-led case cards (large valuation/store-count numbers as the headline of each card), staggered card entrances (power2.out), linear-scrubbed elements where progress itself is the message. No pinning theatre, no WebGL.
Rebuild notes: this is a structure recipe, not an effects recipe: hero claim → case cards led by the metric, not the client name → services → team → contact. Reveals at 0.4–0.6s power2.out, cards stagger ~0.08–0.1.
Transfers to my stack as: the default agency skeleton for Asiful's own site (dentivax.com) — metric-first case cards port directly.
Would not survive copying: nothing technical — the risk is content: metrics must be real.
LIB: case-card structure + reveal set (power2.out, 0.4–0.6s).

## 6 · Joffrey Spitzer — joffreyspitzer.com — code-source/joffrey-spitzer/
Stack (Mined + L2): Astro + vanilla JS + GSAP (ScrollTrigger ×6, SplitText ×2) + Lenis ×1 + Three.js + Swup + Tailwind + Prismic. 1 cross-host asset skipped.
Mechanism: two Flip systems carry the site. (1) Link→title page transitions: clicking a project link captures the title element with Flip.getState, the Swup page swap happens, then Flip.from animates the title from its list position/size into the detail-page hero — the title never visually "jumps". (2) A slider↔grid toggle re-layouts the same cards via Flip.getState → class change → Flip.from, so view switching is a morph, not a reload. SplitText powers a global "clipTitle" diagonal reveal. L2 caveat stands: the preloader (steps(14)) stuck at 100 in the browser pass — do not copy the preloader.
Rebuild notes: Flip transitions need stable element identity across views; in Elementor terms this maps to a shared hero title block reused across page templates.
Transfers to my stack as: Flip list→detail title continuity for project galleries.
Would not survive copying: the preloader; Swup (WordPress routing differs).
LIB: Flip.getState/Flip.from transition recipe.

## 8 · Roman Jean-Elie — romanjeanelie.com — code-source/roman-jean-elie/
Stack (Mined + L2): Next.js + React Three Fiber + GSAP (ScrollTrigger ×2, SplitText ×4) + MorphSVG.
Mechanism: DOM-synced WebGL portal mask — each DOM content block has a matching WebGL plane whose shader clips through a uMask uniform; as you scroll, the mask opens and the WebGL layer shows through the DOM "portal". A velocity-stretch text vertex shader skews glyphs proportional to scroll velocity. MorphSVG morphs a rect path into text outlines via a render callback at 60fps for a signature transition.
Rebuild notes: the portal requires pixel-exact DOM↔WebGL sync (measure bounds on resize/refresh — the same discipline as entry 249's scroll-rig). Velocity stretch is a vertex-shader uniform fed from ScrollTrigger's getVelocity.
Transfers to my stack as: mechanism study only — the DOM/WebGL sync discipline.
Would not survive copying: the whole portal system in Elementor (no persistent canvas layer across Elementor sections without custom build).
LIB: velocity→uniform feed (getVelocity → skew uniform).

## 11 · Federico Pian — federicopian.com — code-source/federico-pian/
Stack (Mined + L2): Nuxt SSG + GSAP (ScrollTrigger ×8, SplitText ×4, Draggable ×2) + TresJs + Tailwind + Pinia.
Mechanism: Flip transitions whose border-radius animates along with size/position (cards open into pages while their corners morph), with transition state held in Pinia so mid-animation navigation stays consistent. A global SplitText diagonal "clipTitle" effect standardises every heading entrance. Background is a theme-driven simplex-noise shader that recolours per section theme.
Rebuild notes: animating borderRadius inside Flip.from requires the radius in the Flip vars (borderRadius is in the default plugin props) — the polish is in easing the radius on the same curve as the scale.
Transfers to my stack as: card→page Flip with radius morph for a project index (desktop); heading system.
Would not survive copying: Pinia state pattern (framework-specific); noise-shader background on phones.
LIB: Flip + borderRadius morph values.

## 12 · Eloy Benoffi — eloyb.design — code-source/eloy-benoffi/
Stack (L2): Webflow + GSAP full plugin set (ScrollTrigger, SplitText, Draggable + Inertia, Observer, ScrambleText, ScrollTo). Source pass: 18 cross-host assets skipped (Webflow CDN) — same-host mining thin by construction; parameters are L2/article-grade.
Mechanism: an interaction library disguised as a portfolio: Draggable+Inertia work sliders (flickable rows with momentum), 4-step staged reveals (elements enter in choreographed groups rather than single tweens), a ScrambleText easter egg on the location line, and an ASCII flower that "plucks" petals on scroll.
Rebuild notes: the 4-step reveal grouping is the keeper: group elements by role (eyebrow → title → body → media) and offset each role by a fixed beat (~0.08–0.12s apart) inside one timeline — reads as choreography, costs nothing.
Transfers to my stack as: role-grouped reveal choreography; Draggable inertia rows for a desktop work strip.
Would not survive copying: Webflow export structure; ASCII/scrolljack ornaments on phones.
LIB: 4-step role reveal offsets.

## 13 · Jesper Landberg — jesperlandberg.com — code-source/jesper-landberg/
Stack (Mined): light same-host JS (ScrollTrigger ×2) — most motion is CSS/transition-based by design.
Mechanism: trust-led minimalism: a FEATURED/FULL project-view switch (same content, two densities), an intro that counts its own proof (77 awards named in the intro copy), and restrained reveals. The design *is* the finding: near-zero animation, total confidence in typography and curation.
Rebuild notes: for service sites this maps to a Featured-work vs All-work toggle on a projects page; the awards-in-intro move maps to a proof line inside the hero subcopy.
Transfers to my stack as: portfolio density toggle + proof-in-intro structure.
Would not survive copying: the minimalism itself for a trade audience (owners need CTAs and forms, not restraint).
LIB: structure note only.

## 14 · dirt — dirtverse.co — code-source/dirt/
Stack (Mined): conventional build, no animation libraries in same-host JS (1 cross-host skipped) — motion is CSS transitions.
Mechanism: the closest plain service-business analogue in the slice: services list + enquiry form on ONE homepage (no separate contact page needed to convert), and a duplicated-image looping hero (the same image strip translates in a seamless loop — pure CSS keyframes with a duplicated track).
Rebuild notes: the seamless loop = track width 200% with two identical halves, translateX −50% loop, linear, duration set by content width (~30–40s for a slow drift).
Transfers to my stack as: single-page service+enquiry structure for micro-trade sites; CSS logo/photo loop strip.
Would not survive copying: nothing — deliberately plain. The lesson is that plain converts.
LIB: seamless duplicated-track loop.

## 15 · Olha Lazarieva + Max Milkin — olhalazarieva.com / maxmilkin.com — code-source/olha-lazarieva/ + max-milkin/
Stack (Mined): both GSAP (ST ×6 / ×5) + Lenis ×1 each; Olha adds Three.js/PixiJS, Max adds MotionPath.
Mechanism A (Olha — the service pattern of the slice): a **budget-radio contact form** — project-budget radios (5K–10K / 10K–20K / more) as the form's first-class field, so the first interaction qualifies the lead. Her scroller is a custom .scroll-container (inner div scrolls, body doesn't), which keeps mobile browser chrome fixed — a real, deliberate mobile datum.
Mechanism B (Max): a paragraph whose scattered letters fly in along MotionPath curves and assemble into readable text (letters start at random offsets, path to their glyph slots, stagger by character), plus PixiJS text rings rotating around section anchors.
Rebuild notes: budget radios = native inputs styled as pills; put budget BEFORE name/email (qualification first, friction later). The inner-scroller trick conflicts with native mobile scroll behaviours (pull-refresh, address-bar resize) — use only with testing.
Transfers to my stack as: budget-radio quote form (directly, for Asiful's own site and trade templates); letter-assembly as a one-off hero trick.
Would not survive copying: inner-scroller as a default; PixiJS rings (weight).
LIB: budget-radio form pattern + ranges; MotionPath letter-assembly recipe.

## 16 · Basement Grotesque — grotesque.basement.studio — code-source/basement-grotesque/
Stack (Mined + L2): Next.js + TS + GSAP (ST ×6, SplitText ×3, Draggable ×1) + Stitches + Locomotive + p2.js. OPEN-SOURCE repo (the typeface microsite).
Mechanism: an interactive type tester as the whole site: editable text with size/tracking/leading sliders driving a variable-font specimen live; a clickable glyph grid (every glyph is a button that loads it into the tester); footer letters are p2.js physics bodies that fall and pile.
Rebuild notes: the tester pattern = one variable font + three range inputs bound to font-variation-settings and font-size/letter-spacing — an afternoon's build, no library needed beyond the font.
Transfers to my stack as: nothing for trade sites; the slider→live-type binding is a neat demo pattern for Asiful's own portfolio experiments.
Would not survive copying: physics footer (p2.js) — novelty weight.
LIB: variable-font tester binding pattern.

## 18 · Chakib Mazouni WebGL Gallery — pixelimageeffect.pages.dev — code-source/chakib-gallery/
Stack (Mined + L2): Astro + Barba + GSAP (ST ×7, SplitText ×2, ScrollSmoother) + Three.js. 1 cross-host skipped.
Mechanism: DOM-synced WebGL pixel-dissolve image reveal: every gallery <img> gets a matching WebGL plane positioned from its DOM bounds; a ScrollTrigger per image drives uProgress 0→1; the fragment shader dissolves the image in as randomised pixel blocks (block grid UV quantised, per-block threshold from a noise texture, smoothstep edge) — and the fallback is simply the plain <img> (WebGL plane sits above it; if WebGL fails, images are just images). Page transitions carry the clicked image through via Flip into the detail view.
Rebuild notes: needs bounds re-measure on resize + ScrollTrigger.refresh after image load; block size ~ (24–48) cells across is the readable range.
Transfers to my stack as: a desktop gallery reveal accent with a genuinely safe fallback.
Would not survive copying: ScrollSmoother dependency on client sites; the dissolve on phone hero images (first impression must be instant).
LIB: pixel-dissolve shader recipe + fallback rule.

## 19 · Eemeli Haakana — Accessible WebGL Text — tympanus.net/Tutorials/AccessibleWebGLText — code-source/accessible-webgl-text/
Stack (L2 + article): Three.js + troika-three-text + Lenis + TS/Vite + Motion + EffectComposer. Demo mined (same-host tympanus assets).
Mechanism: the most phone/SEO-safe WebGL text pattern in the bank: real HTML text stays in the DOM (selectable, screen-reader and SEO visible) while a synced WebGL text layer renders the *same* glyphs via troika MSDF text, positioned with a 1 unit = 1px FOV so DOM and WebGL coordinates coincide. The HTML text is visually hidden (transparent) only when the WebGL layer is active — the entry-249 discipline applied to text. Scroll velocity feeds RGB-shift/wave post effects.
Rebuild notes: requires the same font in both layers and exact line-height/letter-spacing matching; troika generates its SDF atlas at runtime (first-paint cost).
Transfers to my stack as: the governing pattern IF a headline ever gets a WebGL treatment — HTML first, WebGL as a removable layer.
Would not survive copying: dual-layer text on low-end phones (atlas generation + post chain).
LIB: 1unit=1px FOV sync; transparent-not-removed DOM text rule.

## 20 · Shopify Design — shopify.design — code-source/shopify-design/
Stack (Mined): same-host mining returns no animation-library fingerprints (custom/React build; motion is video-led by design).
Mechanism: a named motion-clip gallery as the hero — the site's hero IS a grid of short named motion clips (37 videos on the page at L2), i.e. "showing work without WebGL": real recorded motion design presented as video, plus dated "Design in public" cards as the content engine.
Rebuild notes: video-led proof requires disciplined compression (short loops, muted, playsinline, poster frames) — the pattern is editorial, not technical.
Transfers to my stack as: for Asiful's portfolio — short screen-recorded clips of builds/animations instead of live WebGL demos (cheaper, faster, phone-safe).
Would not survive copying: 37 videos on a trade homepage (weight) — 3–5 clips max, below the hero.
LIB: structure note (motion-clip proof).

## 21 · MotionPath follow mouse (CodePen) — L2-Measured from pen JS (pen re-fetch route: CodePen editor is account-gated; values below are the L2 code-read, labelled as such)
Mechanism: a follower element rides an SVG path, steered by the mouse angle: the path is converted with MotionPathPlugin.convertToPath; each mousemove computes atan2(dy, dx) from the follower to the pointer, maps the angle with gsap.utils.mapRange(−180, 180, 0, 1) into path progress, and a paused timeline's progress is tweened to that value; alignOrigin [0.5, 0.5] keeps the follower centred on the path; the effective segment runs start −0.25 → end 0.75 so the follower never hits the path ends.
Rebuild notes: needs a quickTo on the timeline progress for smoothness; throttle mousemove via gsap.ticker.
Transfers to my stack as: a desktop-only decorative follower (e.g. a bee/plane on a dotted route across a section divider).
Would not survive copying: anything touch — there is no pointer on phones; skip entirely on mobile.
LIB: atan2 → mapRange angle-to-progress recipe (exact values above).

## 22 · Monolith Studio — monolithstudio.com — code-source/monolith-studio/
Stack: CMS-driven (L2); 12 cross-host assets skipped (CDN-hosted theme bundles) — motion parameters are L2/article-grade; the rendered-3D hero is capped at 30 FPS by design.
Mechanism (structure, the fullest service blueprint in the slice): Brooklyn tattoo studio — hero with rendered-3D visual → team cards with per-artist style tags → Google 5-star testimonial strip → services → knowledge-hub cards (aftercare/content that ranks) → BOOK EXPERIENCE CTA → a full style-directory footer (every service/style as a link column) + email capture.
Rebuild notes: the directory footer doubles as internal SEO linking; the 30 FPS cap is a deliberate cost decision worth copying for any rendered hero.
Transfers to my stack as: the trade-template section order (already banked in ui-ux-patterns as a default skeleton alongside Roofix).
Would not survive copying: nothing structural.
LIB: section order + 30 FPS hero cap.

## 24 · David Lubofsky — davidlubofsky.com — code-source/david-lubofsky/
Stack (Mined): GSAP (ST ×10, SplitText ×2) in same-host JS.
Mechanism: a numbered case list (01–08) as the entire portfolio — each row is a case; a "Next availability: 1/1/27" line + message CTA replaces a contact page. Reveals are SplitText line rises on the case titles; the scarcity line does the selling.
Rebuild notes: availability-as-copy only works if the date is real and updated — a stale date reverses the effect.
Transfers to my stack as: numbered work index + availability line for Asiful's own site.
Would not survive copying: the scarcity claim if untrue.
LIB: structure note + SplitText line-rise default.

## 26 · Luca Nardi — aboutluca.com — code-source/luca-nardi/
Stack (L2): Gatsby + FBO ping-pong simulation. Source pass mined same-host assets (no GSAP fingerprints — motion is the WebGL sim + CSS).
Mechanism: a word-by-word story reveal (text assembles word by word over an FBO ping-pong fluid/distortion background — two render targets alternate read/write each frame, the classic GPU sim loop), with an awards list used as the trust block. L2 caveat banked: the homepage loader gate stuck in the browser pass — the gate is the lesson, not a pattern.
Rebuild notes: ping-pong FBO = two WebGLRenderTargets swapped per frame with a sim shader (decay + injection) and a display shader; keep resolution at 0.5× on phones.
Transfers to my stack as: mechanism study; awards-as-trust-block structure.
Would not survive copying: the loader gate (explicitly), full-res fluid sim on phones.
LIB: FBO ping-pong loop pattern; loader-gate anti-pattern note.

## 29 · Ravi Klaassens — raviklaassens.com — code-source/ravi-klaassens/
Stack: 17 cross-host assets skipped (CDN) — parameters L2-grade; structure is the yield.
Mechanism (structure): audience-split homepage — **For Brands / For Agencies** as the primary fork; a referral ticket offering **20% per referral**; an awards block (27 awards) with per-project lists; a contact block that states "Available from Q1 2027" (scarcity by calendar); a works slider with 1/3 counter.
Rebuild notes: the audience fork maps to trade sites as "Homeowners / Property managers" style splits where a business serves two buyers; the referral ticket is a printable/shareable incentive block.
Transfers to my stack as: audience-split hero fork + referral incentive block (agency site).
Would not survive copying: works-slider heaviness on phones if video-led.
LIB: structure (audience fork, referral ticket values).

## 30 · Tom Miller / Creative Ocean — creativeocean.com — code-source/tom-miller/
Stack (Mined, the richest same-host mine in the slice): 8 assets, 180K total (JS 152K, CSS 12K); GSAP refs ×122, ScrollTrigger ×48 (9 configs surfaced), SplitText ×8, Flip ×2, DrawSVG ×2. Durations mined: 0.4 ×17, 0.3 ×14, 0.5 ×7, 0.6 ×4, 0.7 ×3, 1.0 ×2; eases: none ×2, power3 ×1 (long tail of defaults); stagger 0.1 ×1.
Mechanism: the plainest single-page service model that still feels crafted: services list with the turnaround promise *inside the service copy* ("initial animation typically ready for review within one day"), deliverables-and-timeline quote request by email/phone. Motion is many small SplitText/ScrollTrigger reveals at short durations (0.3–0.5s dominates) — craft by accumulation, not by set pieces.
Rebuild notes: the duration histogram IS the recipe: a service page where nothing animates longer than 0.7s and most things take 0.3–0.4s reads as "fast and confident".
Transfers to my stack as: duration discipline for trade templates + promise-inside-service-copy structure.
Would not survive copying: nothing.
LIB: duration distribution (0.3/0.4/0.5 core, ≤1.0 ceiling) — house-style candidate.

## 31 · Thibault Guignand — thibaultguignand.com — code-source/thibault-guignand/
Stack (Mined + L2): Vite + React + TS + GSAP (ST ×4, SplitText) + OGL + Lenis ×5.
Mechanism: a single GSAP-tweened uniform drives ALL WebGL on the page (one master progress/energy value fanned out to shaders), the flowmap is mounted once and textures are swapped per section (no renderer re-creation), and — the article's own emphasis — reduced motion is designed as a parallel variant, not an afterthought.
Rebuild notes: single-uniform architecture = one ticker, one source of truth; texture-swap-over-rebuild is the performance lesson.
Transfers to my stack as: architecture rule for any multi-canvas page; reduced-motion-as-variant design rule.
Would not survive copying: OGL custom stack wholesale.
LIB: single-master-uniform pattern; mount-once/swap-textures rule.

## 33 · Animating WebGL Shaders with GSAP (Codrops tutorial) — demo re-fetch routes tried 26 Oct: Codrops search (fuzzy, no exact article), slug guesses (404), DDG (no result) — values below are the L2-Measured set from the article/demo, labelled as such.
Mechanism: the GSAP→uniform bridge in its canonical form: a GSAP tween animates a plain object's property (e.g. uGrayscaleProgress 0→1, **1.5s power2.inOut**) and an onUpdate writes it into the ShaderMaterial uniform — GSAP handles easing/interruption, the shader just consumes a number. A ripple vertex displacement runs on a 50×50-segment plane; dynamic blur is a Kawase blur pass with the blur amount **clamped 0–5** (the clamp is the quality guard — beyond 5 the image falls apart).
Rebuild notes: any uniform can be GSAP-driven this way; always clamp effect uniforms to their tested range.
Transfers to my stack as: the standard bridge for any future shader accent + clamp discipline.
Would not survive copying: unclamped blur; ripples on phone hero media.
LIB: uGrayscaleProgress 1.5s power2.inOut; Kawase clamp 0–5; 50×50 ripple plane.

## 34 · Shopify Editions Spring '26 — shopify.com/editions/spring2026 — code-source/shopify-editions-s26/
Stack (Mined): custom build; no library fingerprints in same-host assets — IA is the yield (L2).
Mechanism: an anchor-nav chaptered long-scroll launch page: a persistent chapter nav, each chapter a self-contained feature story (headline → visual → detail), roman-numeral chapter markers in the Winter edition variant, and a "Back to navigation" return per chapter.
Rebuild notes: chapters need deep-link anchors + a sticky mini-nav; each chapter must stand alone because launch traffic lands mid-page from shared links.
Transfers to my stack as: launch/update page structure for Asiful's own offers (e.g. a "what's new" page), not trade homepages.
Would not survive copying: the scale (dozens of chapters) for a small-business audience.
LIB: chaptered IA pattern.

## 36 · GSAP3 MotionPath example (CodePen) — L2-Measured from pen JS (editor account-gated on re-fetch; values are the L2 code-read).
Mechanism: an element travels a MotionPath segment — **start 0.25 → end 0.80** of the path (not the whole path: the segment keeps the element in the visually strong middle), autoRotate on, inside a master timeline with **repeatDelay 5** (long rest between loops — the loop reads as an occasional event, not a screensaver).
Rebuild notes: segment travel + long repeatDelay is the tasteful version of path animation; full-path loops read cheap.
Transfers to my stack as: a dotted-route divider animation (van/plane along a route) at segment 0.25–0.80, repeatDelay ≥4.
Would not survive copying: continuous full-path looping.
LIB: segment 0.25→0.80, autoRotate, repeatDelay 5.

## 38 · SVG Mask Transitions on Scroll (Codrops) — demo re-fetch routes tried (Codrops search, slug guesses, DDG) without recovering the demo URL; values are the L2-Measured set from the demo itself — the fullest parameter record in the slice.
Mechanism: SVG mask reveals driven by ScrollTrigger scrub, in four variants: **Horizontal Blinds — 30 slits, stagger 0.02, scrub 2.0–2.5**; **Random Grid — 14 columns desktop → 6 columns mobile** (the grid rebuilds at the breakpoint; cell reveal order randomised); **Vertical Blinds — 12 strips**; all masks use **crispEdges** shape-rendering so slit edges stay hard at any scale, and masks rebuild on resize.
Parameters: scrub 2.0–2.5 (slow, luxurious), stagger 0.02 per slit, start "top bottom"-family (viewport-entry driven).
Rebuild notes: the 14→6 column rebuild is the mobile lesson — mask density must adapt, not just scale. crispEdges is non-negotiable for the blinds look.
Transfers to my stack as: a section-transition reveal for before/after galleries (blinds over a photo swap is a natural fit).
Would not survive copying: scrub 2.5 on short phone sections (too much scroll distance per reveal) — shorten scrub to ~1 on mobile.
LIB: blinds 30/0.02/scrub 2–2.5; grid 14→6 rebuild; crispEdges rule.

## 39 · GSAP PATH POC (CodePen, imchris) — L2-Measured from pen JS (editor account-gated on re-fetch).
Mechanism: a device mockup rides a tall S-curve SVG path down the page, scrub 0.4, start/end 'center' — the phone-in-the-page travels as you scroll, passing content stations. The pen ships with ScrollTrigger markers ON (strip in production — banked as a standing caution).
Rebuild notes: path must be drawn for the actual page height (regenerate on resize); 'center' start/end keeps the device mid-viewport while travelling.
Transfers to my stack as: a "how it works" journey visual (device or van travelling a route past 3–4 steps) — desktop/tablet accent.
Would not survive copying: phone portrait (path geometry collapses) — needs a stacked fallback.
LIB: scrub 0.4, center start/end; markers-off caution.

## 40 · Direction-aware reveals (GreenSock pen pojzxwZ) — code-source/pen-40-direction-reveals/ (fullpage source curled and verified 26 Oct)
Mechanism (source-verified): reveals that enter FROM the direction of scroll: a ScrollTrigger onToggle/onEnter/onEnterBack set checks self.direction; the fromTo tween sets y to +100px when scrolling down, −100px when scrolling up (content always arrives from where the user is heading), **duration 1.25, ease expo, autoAlpha 0→1, overwrite "auto"** so direction changes mid-flight retarget cleanly instead of queueing.
Rebuild notes: overwrite:"auto" is the load-bearing detail — without it, fast scroll reversals stack competing tweens and elements flicker.
Transfers to my stack as: **the house reveal candidate** — direction-aware entrances for every section of trade templates.
Would not survive copying: ±100px travel on small phone sections (halve to ~50px on mobile).
LIB: fromTo ±100px, 1.25s expo, overwrite auto, direction from ScrollTrigger self.direction. Rel 5 / Fit 5 (L2).

## 41 · Ghost Trails / A Drift — tympanus.net/Demos/ADrift — code-source/ghost-trails-adrift/
Stack (Mined): GSAP (ST ×2) + Lenis ×1 + Canvas2D renderer.
Mechanism: scroll-driven ghost-trail typography: headline glyphs are cached as offscreen canvas slices; on scroll, slices are drawn with trailing offsets (each slice lags by a factor of its index), producing a smearing trail that settles when scrolling stops. The renderer is deliberately capped: **40fps ceiling, DPR cap 1.25, hidden-tab skip** — cost discipline written into the demo, not added later.
Rebuild notes: glyph caching (render each unique glyph once to an offscreen canvas) is what makes slice-warping affordable; uncapped DPR is what kills it on retina phones.
Transfers to my stack as: mechanism study; the *caps* (40fps / DPR 1.25 / visibility skip) transfer to every canvas pattern in the bank.
Would not survive copying: the trail headline itself for service copy (legibility during motion).
LIB: renderer caps 40fps, DPR ≤1.25, document.hidden skip.

## 42 · Isabel Moranta — isabelmoranta.com — code-source/isabel-moranta/
Stack (L2-Measured): **WordPress + vanilla JS + curtains.js + GSAP** — the slice's WP-native proof. Source pass: 2 cross-host skipped; same-host mining thin (WP theme bundles), parameters L2/article-grade.
Mechanism: a velocity-reveal background — a Perlin-noise field (curtains.js WebGL) whose reveal amount is driven by scroll velocity, so the background "wakes up" as you scroll faster; a blur motif on hover for project items. The Codrops case study carries a **dedicated Reduced Motion section** (the design ships a reduced-motion variant as a first-class citizen).
Rebuild notes: curtains.js is a lightweight WebGL layer (planes synced to DOM images) — the same DOM-sync discipline as entries 18/19/249, here proven inside WordPress.
Transfers to my stack as: proof that a WebGL accent layer survives WP+Elementor delivery; reduced-motion section as a design deliverable.
Would not survive copying: velocity-reactive backgrounds behind body copy on phones.
LIB: WP + curtains.js feasibility proof; reduced-motion-as-section rule.

## 43 · Motoyoshi Takamitsu — photoyoshi.com — code-source/motoyoshi-takamitsu/
Stack (Mined + L2): WordPress exported to static + Three.js + GSAP (ST ×2) + Barba.
Mechanism: a Grid/Full mode toggle for the photo index (the same collection as a calm grid or an immersive full-bleed sequence), with Barba page transitions and a WebGL layer for the full mode. The WP→static export is itself the stack lesson: author in WordPress, ship static for speed.
Rebuild notes: the toggle is a class switch + Flip-style re-layout; static export needs form handling moved to a service (FormSubmit-class) — which matches Asiful's existing preview stack.
Transfers to my stack as: gallery density toggle pattern; WP→static delivery note.
Would not survive copying: full-bleed WebGL mode as the default on phones (grid first).
LIB: Grid/Full toggle pattern.

## 44 · Studiogusto — studiogusto.com — code-source/studiogusto/
Stack (Mined): GSAP (ST ×9, SplitText ×5) + Lenis ×2; eases mined: **expo.out ×10, power3.out ×4, expo.inOut ×3**, power4 ×1, expo.in ×1 — the most expo-led ease profile in the slice.
Mechanism: a WebGL circular page transition (the page wipes through a circular mask in the WebGL layer during navigation) plus gooey number/team rollovers (SVG goo filter on hover targets). The ease profile is the transferable fingerprint: expo.out for entrances, expo.inOut for the big transition moves, almost nothing else.
Rebuild notes: circular wipe = a fullscreen plane whose shader discards outside a growing circle (radius uniform tweened with expo.inOut ~0.8–1.0s).
Transfers to my stack as: house ease profile candidate (expo.out entrances / expo.inOut transitions) — matches the FWA findings (power2/expo dominance).
Would not survive copying: gooey rollovers on touch (hover-only).
LIB: ease profile expo.out ×10 / power3.out ×4 / expo.inOut ×3 (mined counts).

## 46 · Harry Atkins — harryjatkins.com — code-source/harry-atkins/
Stack (Mined): no library fingerprints in same-host JS — the site is deliberately lo-fi (structure is the yield, L2).
Mechanism: a giant wordmark + a **numbered project index running 26→01** (reverse-chronological numbering as a design device), with user toggles for text size / dark / monochrome — accessibility controls presented as design features.
Rebuild notes: reverse numbering costs nothing and reads as confidence; the toggles are simple class switches on the root (font-size scale, filter: grayscale, colour-scheme).
Transfers to my stack as: numbered work index (agency site); settings toggles as a trust/accessibility signal.
Would not survive copying: the giant wordmark over photography for a trade audience (name recognition doesn't exist yet for prospects).
LIB: structure (reverse-numbered index, root-class toggles).

## 47 · Snog — snogproductions.com — code-source/snog/
Stack (Mined): Webflow (7 cross-host assets skipped) — structure L2-grade.
Mechanism: a giant wordmark + overlapping editorial collage on white — art-directed "mess" held together by a strict grid underneath; the collage elements overlap the wordmark, not each other, which is what keeps it readable.
Rebuild notes: overlap discipline: one anchor layer (the wordmark), everything else overlaps only the anchor.
Transfers to my stack as: hero composition reference for the agency site.
Would not survive copying: collage density on a phone hero.
LIB: overlap-anchor rule.

## 48 · Grid-to-Fullscreen (Codrops) — tympanus.net/Tutorials/GridToFullscreenAnimations — code-source/grid-to-fullscreen/
Stack (L2 + demo mined): Three.js (three 0.104 era) + GSAP 2.1 in the original demo.
Mechanism: ONE reusable 1×1 WebGL plane (128 segments — enough vertices for the warp) takes over whichever grid item is clicked: the plane positions/scales from the thumbnail's DOM bounds to fullscreen while its vertex shader warps (bend) mid-flight, then settles flat; the HTML grid remains the fallback and the return trip reverses the same tween. A single plane for all items = one texture swap per open, no per-item renderers.
Rebuild notes: 128 segments is the warp-quality/cost balance; bounds must be re-measured at click time (not cached at load).
Transfers to my stack as: the gallery→fullscreen pattern for before/after photos (desktop), HTML fallback intact.
Would not survive copying: GSAP 2.1-era code (port to 3.x) and the warp on phone galleries (use a simple fade/scale there).
LIB: single reusable plane, 128 segments, measure-at-click rule.

## 49 · 3D Product Grid R3F — shoe-finder-wine.vercel.app — code-source/product-grid-r3f/
Stack (L2-Measured): Next + React Three Fiber + Motion (GSAP was abandoned mid-build for interruptibility — an instructive stack note).
Mechanism: a spatial product grid where products tilt/lift in 3D on interaction, built on a **mutable-ref rig** (interaction state lives in refs, not React state — no re-render per frame), with **asymmetric damping: reveal 0.6s / dismiss 0.15s** (slow in, fast out — the dismiss is 4× faster so the UI never feels sticky), and a **click-vs-drag threshold of 5px desktop / 15px touch** separating taps from drags.
Rebuild notes: the asymmetric damp and the touch threshold are the two numbers that make 3D grids feel right; equal in/out timing is the usual bug.
Transfers to my stack as: parameter rules for any interactive grid/carousel (incl. the entry-140 colour customiser family).
Would not survive copying: R3F stack itself in Elementor; 3D product grids for services (products ≠ services).
LIB: damp reveal 0.6s / dismiss 0.15s; tap-vs-drag 5px / 15px.

---

# SLICE 1 SUMMARY
34/34 entries deep-read. Routes: 29 entries source-verified via curl (28 fetch_and_mine passes, entry 15 covering two sites, + pen 40 verified via its fullpage source), 5 entries on L2-Measured values with re-fetch routes logged (21, 33, 36, 38, 39 — CodePen editor is account-gated; two Codrops demo URLs unrecoverable after 3 routes). Zero permission cards across the whole slice (cross-host skips: 57 assets total, counted per entry).
Strongest transferable yield: entry 40 direction-aware reveals (house-reveal candidate, source-verified), entry 38 SVG mask values, entry 15 budget-radio form, entry 30 duration discipline, entry 44 expo ease profile, entry 41 renderer caps, entry 49 asymmetric damping.
