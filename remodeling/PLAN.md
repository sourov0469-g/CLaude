# PLAN — Elbaz Construction homepage (immersive redesign, single file)

Firm and every fact: `remodeling/FACTS.md`. Skill library: `WEB-SKILLS.md` (1,504 skills, tags ⟦Sxxxx⟧). Every decision below cites the skill that makes it. Where two skills disagree, or a skill disagrees with the owner's brief, the conflict and its resolution are written down in §3. Nothing here is my own taste; where no skill covers a point it says "no skill covers this" and keeps the choice minimal.

---

## 1. Read, dials, scene, idea

**Design Read** [S0650 §0.B, S1304 §0, S1303 §0]
Reading this as: a redesign-overhaul homepage for a licensed Miami design-build remodeler, for a South Florida homeowner standing in a kitchen or bathroom they hate, with a cinematic "drawings become delivered rooms" language, leaning toward native CSS tokens + GSAP 3.15 / ScrollTrigger + Lenis + one hand-built Three.js r159 room, on the brand's own ink-and-teal world.

**Mode** [S0650 §11.A]: Redesign, overhaul. Treated as greenfield for visuals. Preserved untouched [S0650 §11.F, S1303 §6]: the logo PNG byte-for-byte, the brand teal and ink, phone, address, hours, licence line, form field names and order, the firm's own voice ("Built properly. Permitted correctly.").

**Dials** [S0650 §1, S1303 §0, S1304 §0]: DESIGN_VARIANCE 8 · MOTION_INTENSITY 8 · VISUAL_DENSITY 3 · asset-dependence 8 · brand-fidelity 7. Each dial changes something visible: variance 8 → asymmetric split compositions and one full-bleed break per three screens [S0095 §6]; motion 8 → pinned/scrubbed scenes, one WebGL set-piece, cursor states [S1304 §5]; density 3 → 120–240px section gaps [S0095 §3]; assets 8 → real Elbaz photography carries a third of the page [S0095 §6]; fidelity 7 → brand logo + teal + ink kept, display face modernised (lever 1 of S0650 §11.D).

**Physical scene** (chooses dark vs light) [S0006 §0]: *A homeowner in Pembroke Pines at nine at night, standing under the buzzing tube light of a 1990s oak kitchen, phone in hand, looking at what their kitchen could be.* → The page ground is the dim evening (brand ink #0B1418); **the photographs are the light sources**. A designed light theme ("Daylight") exists behind a toggle [S0650 §6.C/§8.C, S1303 §4 theme toggle].

**Idea sentence** [S0095 §1.4]: *On this page, Elbaz's drawings become the delivered rooms.* The firm's own published line carries it: "The difference is what happens after the drawings." Each section turns a drawing (plan, elevation, wall section, wireframe) into a real photographed Elbaz room. Competitor test [S0095 §1.4]: the drawings are traced from Elbaz's own project photographs (OpenCV edge trace of the real image, so every line is the photo's own geometry), and the proof is Elbaz-specific (CBC1265280, 104 municipalities, 4.8/343) — a competitor cannot run this page with their name in it.

**Signature move** [S1502]: *The drawn line resolves into the photograph.* Lines extracted from each real project photo draw themselves, then the photograph develops underneath them. It appears three times with three different triggers (load in the hero, a moving light in the gallery, a pointer in kitchens) so it is a motif, not a repeated trick.

**Page grammar** [S1502]: chaptered editorial (each section a scene with its own art direction [S1304 recipe resn-storytelling], one payoff set-piece [S1304 active-theory], reward at the end).

**Recipe** [S1304 §1, one recipe per page, remix declared]: *Dieter-Rams-Braun spec bones* (exploded diagrams, functional accent, "the page feels like equipment") *on the brand's ink ground*, with *one Active-Theory set-piece* (the orbitable room) and *Resn scene-per-section pacing*. Reason for the remix: a contractor's credibility is in drawings and inspection (Rams), the homeowner's desire is in the finished room (Active-Theory set-piece).

---

## 2. The Skill Pack (142 skills)

Read in full by tag (`grep -n "⟦Sxxxx⟧" WEB-SKILLS.md`, heading to next heading). The five largest were read in full by helper agents, which wrote exact-value notes (kept in the session scratchpad and re-opened by tag at audit): S0006, S0095, S0526, S0634, S0652, S1303, S1304, S1334 + Three.js set.

**Direction, taste, anti-slop (20)**
- S0001 frontend-design — subject-grounded direction, the 5 AI-default clusters, two-pass plan.
- S0006 impeccable — Persuade mode, craft floor, audit /20 and critique bands, 1·2·3 variant axes.
- S0650 open-design/taste-skill — design read, dials, hard layout bans, Pre-Flight Check (primary gate).
- S0095 design-taste-frontend (taste v2) — argument → direction → idea, house bans, display scale, 14-pass critique.
- S1303 tastemaker — arc, archetypes, contrast contract, variant picker rules (keys, URL, instant swap).
- S1304 web-design-engineer — recipes, dials-to-decisions, single-file deliverable, failure patterns.
- S0214 high-end-visual-design — magnetic button physics, pre-output checklist (fonts ban list).
- S0213 design-taste-frontend (MCP) — high-agency baseline, bias corrections.
- S1320 build-awwwards-quality-sites — acceptance bar: honest assets, one smooth-scroll engine, Three.js only with purpose, validation list.
- S0220 anti-slop-design — 12-pattern banned matrix, 7-axis gate.
- S1314 no-ai-design-slop — cluster-level slop inventory, Removal Test.
- S1306 audit-ai-design-slop — P0–P3 slop audit, fake proof = P0.
- S0659 anti-ai-slop (craft rules) — checkable human-vs-default rules.
- S0217 redesign-existing-projects — upgrading an existing site without generic patterns.
- S0223 frontend-design (ECC) — DFII feasibility/impact index.
- S1502 scroll-craft — grammar, feeling curve with one peak, signature move, 360×640 verification.
- S1375 editorial-portfolio-chapters — work-first chapters; cursor dot + slow ring; magnetic CTA; split-door, inspection light, counter index, word illumination prompts.
- S1417 aesthetic-usability — polish raises perceived usability.
- S1445 interfaces-that-feel — emotional resonance at copy/motion/interaction layer.
- S1435 von-restorff-effect — one dominant action per view.

**Typography (6)**
- S0074 better-typography — role scale, line-height by role, measure, tabular nums, wrapping, weight floors.
- S1433 typography-scale — modular scale with paired line-height/weight.
- S1430 readable-measure — 60–75ch.
- S0667 typography (craft rules) — universal type rules.
- S0666 typography-hierarchy — hierarchy contracts.
- S1500 critique-typography — audit of type on the rendered page.

**Colour (6)**
- S0071 better-colors — ramps, semantic roles, contrast measurement.
- S1418 color-system — tonal scales, semantic roles.
- S1419 dark-mode-design — elevation, desaturation, contrast rebalancing for the dark default.
- S0660 color (craft rules).
- S0248 design-token-contrast — measured token contrast in both themes.
- S1497 critique-color — measured ratios per pair.

**Layout, spacing, composition (11)**
- S0073 better-layout — grouping by space, shared edges, one primary action per view.
- S1428 layout-grid — 12 columns, margins, breakpoints.
- S1432 spacing-system — base-4 scale and application rules.
- S1434 visual-hierarchy — size/weight/colour/position ordering.
- S1498 critique-composition — balance, whitespace, rhythm, gestalt.
- S1501 critique-visual-hierarchy — one primary emphasis zone per view.
- S1499 critique-information-density — cognitive load, ≤4 options per decision.
- S0106 responsive-design (wshobson) — container queries, fluid type, mobile-first.
- S1431 responsive-design — adapt per viewport and input method.
- S1424 law-of-continuity — the eye follows lines (the drawn line motif).
- S1425 law-of-figure-ground — foreground/background in parallax layers and overlays.

**Motion core (19)**
- S0059 emil-design-eng — animation decision framework.
- S0060 animate — build order: should it animate, purpose, tool, properties, curve, interruption, exit.
- S0061 animation-vocabulary — precise names for each move.
- S0062 animation-performance — composite-only properties, main-thread budget.
- S0063 review-animations (+ STANDARDS) — ten standards, exact curves and duration budgets, Block/Approve.
- S0065 find-animation-opportunities — where motion is missing and where it must not go.
- S0083 12-principles-of-animation — timing/easing/physics/staging rule IDs.
- S0089 to-spring-or-not-to-spring — user-driven → spring, system → easing, time → linear.
- S0104 interaction-design — microinteraction timing and feedback.
- S1436 animation-principles — easing, staging, follow-through per motion.
- S1465 motion-system — product-wide motion tokens and reduced-motion handling.
- S0441 MengTo/animation-systems — choreography patterns and defaults.
- S0652 open-design/ui-animation — drag/gesture physics, scroll gates, reduced motion, review checklist.
- S0634 open-design/motion-lab — 160 cases; the per-section technique allocation (cursor, text, image, gallery, counters, SVG).
- S0617 open-design/emilkowalski-motion — make the built artifact feel alive without becoming a demo.
- S1315 optimize-web-animations — rAF/canvas/WebGL loop and memory audit.
- S0399 iart-ai/60fps-animation — jank fixes.
- S0400 iart-ai/accessible-animation — vestibular-safe motion.
- S0405 iart-ai/micro-interaction — hover/press/toggle specs.

**GSAP, scroll, text (19)**
- S0181 gsap-core — tweens, eases, matchMedia for reduced motion.
- S0183 gsap-performance — transforms, batching, will-change.
- S0184 gsap-plugins — SplitText, DrawSVG, MorphSVG, Draggable+Inertia, Flip, Observer (all free).
- S0186 gsap-scrolltrigger — pin/scrub/refresh rules, kill and re-create on version swap.
- S0187 gsap-timeline — position parameters for choreographed sequences.
- S0188 gsap-utils — clamp, mapRange, interpolate.
- S1321 cinematic-gsap-lenis-motion-system — Lenis + ticker wiring, tokens, magnetic quickTo, cursor, mouse layers.
- S1322 cinematic-scroll-storytelling — split reveals, scrubbed progression, sticky stack, footer reveal.
- S1326 scroll-scrubbed-visual-sequence — sticky stage, normalized reversible progress.
- S1327 scroll-scrubbed-word-reveal — TreeWalker word scrub, hidden opacity 0.12–0.3, blur 4–10px.
- S1329 staggered-word-reveal — 0.8s, (0.16,1,0.3,1), 0.07s stagger, once.
- S1325 scroll-progress-timeline — one progress line between first and last point.
- S0451 MengTo/masked-reveal — yPercent 110 → 0, 0.8s power3.out, stagger 0.035.
- S0448 MengTo/gsap-scrolltrigger-storytelling — sticky product storytelling.
- S0204 scroll-experience — parallax storytelling and sticky sections.
- S1328 scroll-world-storytelling — renderer choice for a scroll world (here: real-time Three.js).
- S0450 MengTo/marquee-loop — the single marquee allowed per page.
- S1169 parallax-effects — reduced-motion alternative + user toggle to disable motion.
- S1209 scrolljacking — no wheel rewriting; a way to disable custom scroll.

**Pointer, cursor, physics (7)**
- S1324 reveal-hover-effect — radial-mask lens: radius 260, pointer ease 0.1, radius ease 0.14, stops 0/40/60/75/88/100.
- S1323 pointer-trail-emitter — distance-based emission, step, cap 14, idle breath 0.42s.
- S0340 diip3sh/feel — physical bodies (mass, stiffness, damping, magnets) instead of durations.
- S0197 motion-advanced — drag, gestures, SVG path drawing, text animation.
- S1363 ambient-section-particles — bounded particle layer, pointer disturbance, IO pause.
- S1330 add-mouse-driven-orbit — damped pointer split across camera translation, look-at carry, small rotations.
- S1441 fitts-law — target size and distance for the 1·2·3 switch, drag handles, CTA.

**SVG drawing and technical illustration (5)**
- S0407 iart-ai/svg-animation — draw-on, morph, motion path, pathLength normalisation.
- S0526 wheresryan22/anatomy — crafted interactive isometric/exploded SVG figures (bathroom wall layers).
- S0414 jakubkrehel/teardown — coherent technical illustration of how things are built.
- S0468 moguzbulbul/blueprint-animation — before/after blueprint rebuilds, annotated modules.
- S0362 enesozturk/dimensional-drawing-motion — lines draw in, camera pulls back, layers lift.

**3D / WebGL (19)**
- S1334 build-threejs-scroll-worlds — chapter ledger, rigs, quality tiers, governor, failure signatures.
- S0255 threejs-fundamentals · S0313 cloudai-x/threejs-fundamentals — renderer, colour space, tone mapping.
- S0258 threejs-interaction · S0315 cloudai-x/threejs-interaction — orbit, raycast, touch.
- S0259 threejs-materials · S0318 cloudai-x/threejs-materials — PBR values.
- S0260 threejs-lighting · S0316 cloudai-x/threejs-lighting — physical units, shadows, PMREM.
- S0261 threejs-geometry · S0264 threejs-textures · S0323 cloudai-x/threejs-textures — procedural canvas textures, colour spaces.
- S0256 threejs-animation · S0257 threejs-shaders · S0322 cloudai-x/threejs-shaders — onBeforeCompile scan.
- S0319 cloudai-x/threejs-performance — draw calls, render on demand, disposal.
- S0265 threejs-skills — setup pattern.
- S1335 build-wireframe-scan-reveal — the blueprint → finished sweep.
- S0205 3d-web-experience · S0206 premium-3d-website — fallbacks, DPR cap, no wheel hijack.
- S0091 improve-threejs — frame loop, leaks, z-fighting, colour space audit.

**UX, conversion, copy, forms, states (19)**
- S0356 elayadesign/landing-page-design — page structure and conversion copy.
- S0226 page-cro — one primary conversion goal.
- S1442 form-design — field order, labels above, inline errors.
- S0661 form-validation (craft rules) — validation lifecycle.
- S1440 feedback-patterns — confirmations in place.
- S1447 loading-states — skeletons, progress.
- S1439 error-handling-ux — specific, recoverable errors.
- S0244 ui-states · S0664 state-coverage — every state rendered.
- S1444 hicks-law — ≤4 choices per decision.
- S0662 laws-of-ux (craft rules) — cognitive heuristics.
- S1452 peak-end-rule — the room is the peak; the consult is the end.
- S1457 zeigarnik-effect — the B/A instrument left half-open invites finishing.
- S1494 ux-writing · S0076 better-writing — verb-first labels, one name per action.
- S1503 humanizer — strip AI phrasing from every string.
- S1214 service-area (rule) — the 104-town finder.
- S1128 local-business · S1146 nap-consistency — name/address/phone identical everywhere, LocalBusiness JSON-LD.
- S1248 tel-mailto — real tel: and mailto: links.

**Accessibility, performance, QA, critique (21)**
- S0070 better-accessibility — WCAG 2.2 focus, keyboard, names, hit areas.
- S0049 Web Interface Guidelines (full rule set) — mechanical compliance pass.
- S0050 baseline-ui — fast deslop pass.
- S0054 fixing-accessibility · S0193 accessibility · S1458 accessibility-audit.
- S1190 reduced-motion (rule) — no flashing >3/s, motion alternatives.
- S1066 horizontal-scroll (rule) — no accidental overflow.
- S0280 addyosmani/core-web-vitals — LCP < 2.5s, INP < 200ms, CLS < 0.1.
- S0231 web-performance-optimization.
- S1482 design-qa-checklist — implementation-vs-plan QA.
- S1473 heuristic-evaluation — Nielsen ×10, severity 0–4.
- S1479 design-critique — I notice / I wonder / What if.
- S0502 Superfuture/design-review — Blocking / Important / Polish findings.
- S0241 ui-review · S0242 ui-score — coherence laws; score ≥ 80 gate.
- S1495 critique-affordance — what looks clickable.
- S1496 critique-brand-consistency — against the brand tokens extracted below.
- S0914 alt-text · S1011 dimensions · S1049 focus-styles · S1224 skip-link · S0985 critical-images · S1000 cumulative-layout-shift (rules).

---

## 3. Conflicts and how they are resolved

Protocol order: owner's brief > project brand system > the more specific skill > the stricter accessibility/performance rule.

| Conflict | Resolution |
|---|---|
| Custom cursor: banned by S0650 §9.A and the S0095 house rule; required by the brief | **Brief wins.** Scoped per S0095 §5(a), S0006 §8, S1303 §8: only under `(hover:hover) and (pointer:fine)`; the system cursor is never hidden over text inputs; off under reduced motion and when the motion toggle is off; it never carries function (every state has an on-page label or control). Recorded as a deliberate deviation in the delivery note. |
| "1 · 2 · 3" control vs S0095/S0650 bans on index numbering and middle-dot strings | **Brief wins.** Built as a real segmented control (`role="radiogroup"`, names "Version 1/2/3"), never styled as a section marker [S0095 §2, S0006 §12]. |
| Smooth scroll: S1320/S1321/S1322 prescribe Lenis; S0652 §6 and S1209 say never hijack scroll | Lenis is used (the more specific skills for cinematic scroll sites), at lerp 0.1 [S0095 §5 Lenis 0.1–0.14], **off on touch, off under reduced motion, off when the site-wide motion toggle is off** (S1209 "provide a way to disable it", S1169 "user toggle"). No wheel preventDefault anywhere. |
| Pins: S1303 1–2 per page, S1304 one pinned chapter, S0652 ≤2–3 screens; the brief wants choreography in every section | The **default configuration (all versions 1) holds 2 pins**. Alternative versions may pin (each ≤ 250vh desktop, none on phones), so any owner-chosen mix stays reviewable. Pin budget per version listed in §6. |
| Display size: S0006 max 6rem; S0095 display up to 9rem | 6rem cap for headlines (S0006 is the stricter craft floor). Non-heading display numerals in Proof may reach 8rem (they are figures, not headings). |
| Hairlines: S0095 bans thin rules; S1375/S1304 Rams recipe uses rules | Lines appear **only as part of drawn objects** (plans, sections, traced elevations) [S0095 §2 "linework belongs to the drawn object"]. No decorative rules, grids, crosshairs or crop marks. |
| Glow: S1375 #12 "signal bloom"; S0095/S0650 ban glows | No glow. The finale's light is a **real photograph lit by a moving daylight shaft** (a flat light field, not a halo). |
| Preloader: S1322 anatomy includes one; S0095 bans preloaders | No preloader. Hero settles by 1.2s with ≤4 animated elements [S0095 §5]. |
| Fonts: S1303 pairings (Gloock/Inter, Archivo/IBM Plex); S0006 overused list (IBM Plex, Outfit, Plus Jakarta…); S0214 bans Inter | **Archivo (variable, wdth 62–125, wght 100–900) for display + Geist (variable, 100–900) for text.** Archivo comes from S1303's "Technical" mood (construction is technical) and its width axis echoes the brand's condensed Bebas lettering [S0650 §11 brand fidelity]; Geist is S0650's first sans pick and S0214-allowed. IBM Plex rejected (S0006 overused). Two families total [S0650, S1304, S0220]. No mono [S0095, S0006]. |
| Many showpieces vs "one focal moment" [S0006 §3/§7, S1304 §5] | Ranked: **the 3D room is the one payoff**; the before/after instrument is the secondary peak; everything else is supporting and quieter. Calm sections sit between showpieces [S0652 §12 novelty budget]. |
| Parallax: S0652 ≤15% differential and off on mobile; S0095 <8% travel | <8% travel (stricter), off under 768px and on coarse pointers. |

---

## 4. System — the identity lock

Identity-lock sentence (holds across every 1·2·3 version) [S0006 §12]: *Ink #0B1418 ground with deep-teal fields, logo teal #77B3B8 as the only accent (actions and the lit line of each drawing), Archivo display + Geist text, sharp 2px radius, Elbaz's own photographs, the firm's own plain words.*

### 4.1 Colour tokens (brand-extracted, then derived) [S0650 §11.C, S1304 §3, S0071, S1418, S0095 §4]
Extracted from the live site's CSS: `--ink #0B1418`, `--ink-2 #12212a`, `--ink-3 #1c313b`, `--teal-light #77b3b8` (logo mark, measured from the PNG), `--teal #2e6b70`, `--teal-deep #1d4a4e`, `--text-on-dark #e8e4dc`, `--text-on-dark-muted #a9b6b9`, `--stone #6d8085`. The site's `--bone`/`--clay` pair is **not** used (it is the banned cream + clay family, S0650 §4.2 / S0001 cluster 1).

| Role | Evening (default) | Daylight | Measured contrast |
|---|---|---|---|
| `--bg` ground | #0B1418 | #EEF2F1 | — |
| `--surface` (2–6 L points off ground [S0095]) | #12212a | #E3E9E8 | — |
| `--field` committed teal field [S0006 colorize "Committed"] | #1d4a4e | #1d4a4e (same field, inverted ink) | — |
| `--ink` text 1 | #e8e4dc | #0B1418 | 14.69:1 on #0B1418 · 16.5:1 on #EEF2F1 |
| `--muted` text 2 (tinted, never grey) | #a9b6b9 | #4a5d62 | 8.94:1 · 6.13:1; on field #1d4a4e: 4.71:1 |
| `--accent` | #77b3b8 | #1d4a4e | 7.92:1 on ink · 8.69:1 on daylight |
| `--accent-ink` (text on accent) | #0B1418 | #F2F5F4 | 7.92:1 · 8.94:1 |
| `--line` (drawing strokes only) | #77b3b8 at 100% / 55% | #2e6b70 | ≥3:1 for meaningful strokes |
| `--old` (the "before" light tint, B/A only) | #3a2f20 | #c9b48f | semantic, one section |

Rules: accent ≤5% of any viewport, only on the primary action, focus rings, selection and the lit line [S1303 §4, S0095 §4]. No gradients except a neutral scrim on photos [S0095 §2]. No pure #000/#fff [S0650 §8.B]. `color-scheme`, `theme-color`, `::selection`, caret, scrollbar from tokens [S0006 §1]. Theme: `data-theme` on `<html>`, inline pre-paint script, localStorage override; default Evening (brand expression) with a manual toggle [S1303 §4, S0650 §8.C].

### 4.2 Type [S0074, S1433, S0095 §4, S0006 §1, S1303 §3]
- Families: **Archivo** (display, variable `wdth` 62–125, `wght` 100–900) · **Geist** (text/UI, `wght` 100–900). Both inlined as base64 WOFF2, `font-display: swap`.
- Scale (5 sizes + one figure size):
  - `--t-display: clamp(2.75rem, 1rem + 5.4vw, 6rem)` · line-height 0.98 · tracking −0.035em · `max-width: 14ch` · `text-wrap: balance` · Archivo wdth 78 wght 640 (versions vary width/weight, never the face [S0006 §4])
  - `--t-head: clamp(2rem, 1.3rem + 3.2vw, 4rem)` · lh 1.04 · −0.025em · Archivo
  - `--t-lead: clamp(1.25rem, 1.1rem + .7vw, 1.625rem)` · lh 1.35 · max 40ch · Geist 400
  - `--t-body: clamp(1.0625rem, 1rem + .25vw, 1.1875rem)` · lh 1.55 · max 62ch · `text-wrap: pretty` · Geist 400 (dark ground drops no further than 400 [S0074 weight floor])
  - `--t-small: clamp(.8125rem, .79rem + .1vw, .875rem)` · lh 1.45 · Geist 500, sentence case (no uppercase eyebrows [S0006, S0095, S0650])
  - `--t-figure: clamp(3.5rem, 2rem + 6vw, 8rem)` · tabular-nums · Archivo (Proof numerals only)
- Statements (`<p>`/`<blockquote>`) ≤36px desktop / 24px phone, ≤3 lines [S0095 §2, S0650 §4.10]. No italic headings [S1303 §3]. Curly quotes, `…`, `&nbsp;` in "4.8 ★", "(754) 236-0675" [S0049].

### 4.3 Space, grid, shape [S1432, S1428, S1303 §5, S0095 §3]
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160, 192px. Internal ≤ external.
- Grid: 12 columns `repeat(12, minmax(0,1fr))`, margin `clamp(1rem, 2.2vw, 2rem)` (desktop edge ≥40px via `max(2.5rem, …)` at ≥1024px [S1375]), gutter `clamp(.75rem, 1.4vw, 1.5rem)`; page capped at 1760px [S0095].
- Section gaps 160–224px desktop, 88–112px phone [S0095 §3, S1303 §5]. One separation mechanism: **ground change** (ink ↔ field ↔ surface, neighbours differ in lightness) [S0095 §4].
- Shape lock [S0650 §4.4]: **all-sharp, 2px** on buttons, inputs, frames. Photos square-cornered [S0095 §6]. The cursor ring is round (it is a pointer, not a surface).
- No cards unless elevation means something; no nested cards [S0006 §2, S0650 §4.4].

### 4.4 Motion tokens [S0063 STANDARDS, S0095 §5, S1321, S0652, S1303 §7]
- CSS: `--ease-out: cubic-bezier(.23,1,.32,1)` (UI) · `--ease-io: cubic-bezier(.77,0,.175,1)` (wipes, travel) · `--ease-expo: cubic-bezier(.16,1,.3,1)` (≥800ms reveals) · `--ease-drawer: cubic-bezier(.32,.72,0,1)`.
- Durations: press 0ms down / 160ms release at `scale(.97)` [S0652 §1] · hover colour 180ms · UI state 240ms · reveal 800ms · open 1200ms · word stagger 0.055s · line stagger 0.09s · item stagger 0.07s.
- GSAP defaults: `ease: "power3.out", duration: .85` [S1321]; reveals `power4.out` 0.9–1.0s; scrub 0.8–1.4 (pinned scenes 1.1); trigger `start: "top 82%"`, once [S1321, S0451].
- Never `ease-in` on UI, never `scale(0)`, never `transition: all`; only transform/opacity/clip-path animate [S0063].
- Lenis: `lerp 0.1, wheelMultiplier 0.9, smoothWheel true` driven by `gsap.ticker`, `lagSmoothing(0)` [S1321, S0095 §5].

### 4.5 Chrome (not sections; one version each)
- **Nav** [S0095 §3, S1303 N2, S0650 §4.7]: logo PNG (unchanged) left; 4 single-noun links (Work, Kitchens, Bathrooms, Reviews); one action "Book a consultation"; phone shown at ≥1024px. No bar or glass at rest; after 120px of scroll it takes a solid `--bg` ground (no blur) and hides on scroll-down / shows on scroll-up. Height 64–72px [S0650]. Phone: logo + "Call" + "Menu" opening a full-screen sheet (focus-trapped, Esc closes, focus returns) [S0095, S0070].
- **Utilities** (bottom-right, hidden into one "Settings" button at rest [S1304 §6 Tweaks]): Theme (Evening/Daylight), Motion (On/Off, kills Lenis, cursor, parallax, scrubs [S1169, S1209]).
- **Scroll progress** as a measuring tape: 2px `--accent` bar `scaleX(progress)` at the top [S0634 F scroll-progress, ported to transform].
- **Skip link**, landmarks, one `h1` [S0049, S1224].
- **1·2·3 switch** on every section [S1303 §9, S0006 §12, S1441]: a 3-segment radiogroup, 44×44 hit areas, sticky at the section's top-right (`position: sticky; top: 88px`, zero layout height so it never shifts content). Swap is **instant**; old version's GSAP context reverted, ScrollTriggers killed, listeners/RAF/WebGL disposed; new version initialised; `ScrollTrigger.refresh()`. State in URL (`?hero=2&ba=3`) and localStorage. Keys **1/2/3** switch the section most in view, **←/→** cycle, **R** replays its entrance (ignored while typing in a field). Exactly one option `aria-checked="true"`.

### 4.6 The cursor system [S1321 cursor + magnetic, S1375 #12, S0634 §A, S0652 §3, S1303 §8]
One fixed layer: a 6px **dot** (follows with lerp 0.35 ≈ quick) and a 36px **ring** (gsap.quickTo duration 0.35, `power3.out` [S1321 cursor lag 0.25–0.45]); `pointer-events:none`; X and Y separate. A label slot inside the ring. Element states via `data-cursor` (every section's states are different — brief requirement):
| Where | State | Behaviour (skill) |
|---|---|---|
| Hero primary CTA | `magnet-wide` | pull starts in an 80px radius around the button, factor 0.3 (button) / 0.15 (label), quickTo 0.45 `power3.out`; ring expands to wrap the button and inverts with `mix-blend-mode: difference` [S0634 magnetic-button, S1321, S0214]; scale ≤1.03 |
| Proof "Check the licence" link | `magnet-in` | pulls only while inside, factor 0.4; ring collapses into the 6px dot [S0634 magnetic-cursor] |
| Display headings marked `data-weight-lens` | `lens` | letters within 120px of the pointer gain Archivo weight (+260) and width (+14) on a falloff 0.45^d; return 320ms [S0652 §8 avatar falloff, S0634 hover-magnetic-text] — "text responds as it passes" |
| B/A handles | `drag-x` | ring becomes a 64×28 pill with "↔" and "Drag", locked to the handle's y [S1303 §8] |
| B/A v3 cards | `flick` | ring shows "Flick"; sawdust motes emitted by distance [S1323] |
| Kitchen plan zones | `pencil` | ring shrinks to a 10px nib; the zone under it draws its outline [S0407] |
| 3D canvas | `orbit` | ring becomes an 80px circle with "Drag to turn" and two arc arrows [S1303 §8] |
| Material swatches | `swatch` | ring fills with the swatch's real colour, 56px, label = finish name [S0634 color-picker-hover] |
| Bathroom photo (v2) | `lens` x-ray | the cursor **is** the 220px lens [S1324] |
| Gallery images | `view` | 96px disc, label = the project's real title (truncated) [S0634 §A galleries] |
| Gallery v2 table | `drag-xy` | "Drag" |
| Reviews quotes | `quote` | ring becomes a filled “ mark |
| Town finder | `pin` | ring becomes a map-pin drop |
| Finale CTA | `magnet-strong` | strong offset button 0.35 / label 0.18, wrapper 1.6× the visible button [S1375 #12] |
| Links | `link` | ring shrinks to 12px, underline draws `scaleX` [S0634 underline-draw] |
| Text inputs | native | custom cursor hidden, system I-beam shown |

Off for touch, reduced motion, motion toggle off. Hidden on `window` blur, restored on enter.

### 4.7 Images [S0095 §6, S1303 §6, S0049, S0985, S1011]
- Only Elbaz's own project photographs (FACTS.md list). No stock, no generated people.
- All images are base64 WebP inside one JSON store; at boot each becomes a Blob object-URL assigned to every `img[data-img]` (one decode per image even when three versions reuse it). The hero image is also inlined directly in its `src` so the first frame exists before any script runs [S1320 static first frame].
- `width`/`height` on every `<img>`, `aspect-ratio` boxes, `object-position` per image, `loading="lazy"` below the fold, `fetchpriority="high"` on the hero.
- One treatment: untouched colour; on dark text overlays a solid 45% ink scrim or a 55% fade over the lower third [S0095 §6].
- Before/after originals are 388–596px wide: displayed at ≤1.4× native and framed (never full-bleed) so softness reads as photograph, not defect.

### 4.8 Honest-content rules [S0006 "prove, don't claim", S1306 P0, S0650 §4.9, FACTS.md]
Rating "4.8 · 343 Google reviews"; licence "Florida Certified Building Contractor CBC1265280" linked to myfloridalicense.com; "104 municipalities across 3 counties"; "52 photographed projects"; "30+ years combined experience". Reviews quoted verbatim with name + "Google review". No prices, no founding year, no warranty length, no awards. The 3D room and all drawings carry the line "Illustrative drawing" / "Illustrative model. Every photograph on this page is a real Elbaz project." [S0095 §6 honesty line]. Em dash count in visible strings = 0 [S0650 §9.G].

---

## 5. Page architecture

**Arc** [S1303 §0, S0095 §1 argument]: hook (a finished Elbaz room) → proof (licence, rating, reach) → problem→solution (their own before/after) → how a room is decided (kitchen layout) → **peak: turn the room yourself** → craft behind the tile (bathrooms) → range of real work → what homeowners said → "do you build in my town?" → close: book the walk-through.

| # | id | Claim → proof [S0095 §1.2] | Ground | Novelty [S0652 §12] |
|---|---|---|---|---|
| 1 | `hero` | We build kitchens, baths and whole homes, permitted correctly → a real finished kitchen resolving out of its own drawing | ink + photo | high (intro, once) |
| 2 | `proof` | You can check us → CBC1265280, 4.8/343, 104 towns, 52 projects | field (deep teal) | calm |
| 3 | `ba` | Your room can change → four real Elbaz before/after pairs, played by the visitor | ink | high |
| 4 | `kitchens` | Layout first, door style later → the three published scopes as a plan that changes | surface | mid |
| 5 | `room` | See it turn before we build it → an orbitable illustrative kitchen switching before → after | ink | **peak** |
| 6 | `baths` | Down to the studs, waterproofed properly → the wall behind the tile | field | mid |
| 7 | `work` | Real projects, photographed as delivered → 12 projects | ink | mid-high |
| 8 | `reviews` | Homeowners say so → verbatim Google reviews | surface | calm |
| 9 | `towns` | We build where you live → 104 named municipalities | ink | calm, interactive |
| 10 | `consult` | Let's talk about what you want to change → form, phone, hours, address, financing honesty | field → ink footer | close |

Feeling curve [S1502]: curiosity → reassurance → recognition ("that's my kitchen") → clarity → **wonder (peak, §5)** → trust in craft → desire → warmth → belonging → decision [S1452 peak-end].

Layout families (no two neighbours share one; ≥4 families across the page) [S0650 §4.7, S1303 archetypes, S0095 §3]: full-bleed photographic fold · asymmetric figure index · framed instrument stage · split diptych with drawing · full-viewport WebGL stage · exploded diagram · horizontal filmstrip · statement field · typographic index · split close + footer.

Pin budget (default = all v1): `work v1` + `reviews v1` = **2 pins**. Mobile (<768px): **no pins** in any version except `room v2` (150vh short pin) [S0652 §6, S1322 mobile].

Scroll-reveal budget [S0652 §6]: only 4 triggered text reveals across the default page (hero intro, kitchens heading, work heading, consult heading); every other section moves through a *different trigger type* (pointer, drag, scrub, hover, click, ambient).

---

## 6. Sections — three versions each

Every version: same facts and copy, different primary axis [S0006 §12, S1303 §9, S1304 §6]. v1 is the safest within the system, v3 the boldest [S1304 §6]. Each lists: axis · interaction language · skills with parameters · background reaction · cursor · mobile (375px) · reduced motion.

### 6.1 `hero` — "Built properly. Permitted correctly."
Copy (verbatim brand slogan [S0650 §11.C]): **h1** "Built properly. Permitted correctly." · **lead** (18 words) "Kitchens, bathrooms and whole homes across Miami-Dade, Broward and Palm Beach. Licensed CBC1265280." · **CTA** "Book a consultation" (→ #consult) · secondary text link "(754) 236-0675" (tel:). ≤4 text elements [S0650 §4.7]; h1 ≤2 lines at all widths [S0095 §2]; fold at 1280×800 shows h1+lead+CTA [S1303 §2].
Photo: `k-navy-shaker` (the firm's own hero choice; FACTS photo list).

**v1 · "Drawn, then delivered"** — axis: *hierarchy* (image leads, type docked).
- Full-bleed photographic fold [S1303 H3]. The photo's own lines (OpenCV Canny→Hough trace of `k-navy-shaker`, merged and cleaned, ~70 strokes) are an SVG layer exactly registered to the image.
- Sequence (settles by 1.2s, ≤4 elements [S0095 §5]): h1 lines mask-rise (`yPercent 105→0`, 0.8s `expo.out`, line stagger 0.09) and CTA visible from 0.35s so the action is usable immediately [S1320]; strokes draw with DrawSVG `0% 0% → 0% 100%`, 0.9s, stagger 0.008 (walls/edges first, then cabinetry, then fixtures [S0634 §G order]); the photograph develops under the strokes (`clip-path inset(0 0 100% 0)→inset(0)` 1.0s `--ease-io` + `filter: saturate(0)→1`) while strokes fade to 35% and stay as a faint drawing over the room.
- Depth: 3 layers with pointer parallax — photo (depth 1, ×12px), line layer (depth 2, ×20px), copy block (depth −0.5) [S0634 parallax-mouse, S1321 mouse layers 0.04, S0095 <8% travel]; photo sits at 108% in its frame [S0095 §5].
- Background reaction: the lines brighten under the pointer within 160px (stroke-opacity falloff) [S1424 continuity].
- Cursor: CTA `magnet-wide`.
- Mobile: portrait crop (object-position 62% 50%), copy below the photo on ink, drawing intro kept (no parallax).
- Reduced motion: drawing shown at its final 35%, photo developed, no parallax.

**v2 · "From the brass to the room"** — axis: *structural decomposition* (one detail opens into the whole).
- Scroll-pinned zoom-out [pack pick #11 "Scale container on scroll", S1322 scroll-linked progression, S0650 Zoom Parallax]: the frame opens on the brass range-hood banding at `scale(3.1)` (the navy kitchen at 2400px source), and 140vh of scroll scrubs `scale 3.1 → 1` (scrub 1.1, `ease: "none"`), revealing the whole room. Pin ≤140vh [S0652 §6].
- Text is motion: h1 Archivo weight scrubs 200 → 700 and width 62 → 88 across the same progress (variable axes tied to scroll) [S0095 §5 ink fill alternative, S1327 normalized progress].
- Background reaction: the ink ground lightens 2 L points as the room opens (daylight entering).
- Cursor: CTA `magnet-wide` with label "Book".
- Mobile: no pin; the zoom plays once on load over 1.2s from 1.8 → 1.
- Reduced motion: full room at scale 1, h1 at final weight.

**v3 · "The window"** — axis: *typographic system* (type is the frame).
- Typographic poster fold [S1303 Poster Fold, S0650 Text Mask Reveal]: "Built properly." set at `--t-display` wdth 125 / wght 800 as a `background-clip:text` window onto the photograph (the photo is only seen through the letters); "Permitted correctly." and the lead/CTA sit below on ink.
- Pointer pans the photograph inside the letters (±40px, lerp 0.08 [S1303 §8]); scroll slides the photo upward 6% [S0095 parallax <8%].
- Split-char entrance on the first line only (chars 0.03s stagger, 3-word heading [S0095 §5 characters only in 1–3 word headings]).
- Background reaction: the photo's lit window (top-left of the image) follows the pointer as a light patch inside the letters.
- Cursor: `lens` weight on "Permitted correctly."; CTA `magnet-wide`.
- Mobile: letters stack on two lines at wdth 100, no pointer pan; photo static.
- Reduced motion: static window, no split.

### 6.2 `proof` — "The difference is what happens after the drawings."
Facts: 4.8 · 343 Google reviews · Florida Certified Building Contractor CBC1265280 (verify link) · 104 municipalities, 3 counties · 52 photographed projects · 30+ years combined experience. Support line (verbatim, punctuated without the dash): "Anyone can show you a finished photo. What decides whether a South Florida project goes well is the unglamorous part." Ground: deep-teal field (committed colour region [S0006 §5]).

**v1 · "Index"** — axis: *layout topology* (asymmetric figure index).
- Asymmetric counter index [S1375 #6]: each figure at its own scale and column (4.8 largest at `--t-figure`, 104 mid, CBC1265280 as a licence line, 52 and 30+ small). On entering (not pinned): a short stroke under each figure draws (DrawSVG 0.6s), the numeral counts up (`count-up` 1500ms ease-out cubic, tabular-nums, final value in HTML [S0634 §H]), the label resolves (0.07s item stagger).
- Background reaction: the field's light shifts toward the pointer (a 2-L-point lighter radial ground tint following the pointer — a flat lightness change, not a glow) [S0095 §4 lightness].
- Cursor: figures `lens`; "Check the licence" `magnet-in`.
- Mobile: single column, figures left-aligned, sizes step down one tier.
- Reduced motion: final numbers, no counting.

**v2 · "Read the line"** — axis: *hierarchy* (the sentence leads, numbers annotate).
- The support line becomes a scroll-scrubbed reading instrument [S1327]: words move from 0.18 opacity / 6px blur / 0.12em offset to full as the section passes (reveal span 160% of viewport, no pin [S1327 "pin only when justified"]). The figures sit in the margin as an odometer that rolls only changed digits when its line is reached [S0652 §8 odometer 260ms enter curve].
- Background reaction: none moving; the field darkens 3 L points behind the words already read (progress shown by ground).
- Cursor: native-feel dot only (reading section; S1303 "never move things under the reader").
- Mobile: same scrub, shorter span (120%).
- Reduced motion: full sentence, final numbers.

**v3 · "The licence, in your hand"** — axis: *interaction* (an object you turn over).
- The licence as a physical card: front = "Florida Certified Building Contractor · CBC1265280 · Elbaz Construction and Remodeling", back = the four other figures. Pointer tilts it ±8° (`three-d-tilt` with perspective 800px, transition .2s [S0634 §C] capped to ±8° [S1321 magnetic cards <4deg × 2 for an object]); click / Enter / Space flips it (rotateY 180°, 600ms `--ease-io`, `backface-visibility:hidden` [S0634 hover-flip-card]). The verify link is a real link on both faces.
- Background reaction: the card casts a real offset shadow that moves opposite the tilt (shadow only on the floating object [S0095 §2]).
- Cursor: card `magnet-in`.
- Mobile: no tilt; tap flips.
- Reduced motion: both faces shown side by side, no flip.

### 6.3 `ba` — "Same room. Different house."
Four real pairs: Kitchen (`ba-kitchen4`), Bathroom (`ba-bath2`), Kitchen (`ba-kitchen1`), Outdoor (`ba-outdoor`), with the firm's alt texts. Labels "Before" / "After" keep 3:1 over both photos [S0006 §5]. No caption narrating the photo [S1303 §6].

**v1 · "The handle"** — axis: *interaction* (direct manipulation, one pair at a time).
- Framed instrument (frame ≤1.4× native width). Comparison slider: top layer `clip-path: inset(0 X 0 0)` written directly on the element [S0652 §5, S0634 drag-to-reveal]. Drag rules [S0652 §4, S0006 §8 harden]: pointer capture, grab offset, axis commit after 10px (vertical swipes keep scrolling), 1:1 while dragging, rubber-band past 0/100% (`max·(1−e^(−o/max))`, max 40px), release projects with r 0.99 onto magnets at 0 / 50 / 100% and settles on a spring (stiffness 500, damping 40 [S0089, S0652 Snappy]); flick threshold 0.11px/ms. Keyboard: `role="slider"`, ←/→ 5%, Shift 25%, Home/End; steps animate 240ms on `(0.25,1,0.5,1)`.
- Pair switcher: four text buttons (Kitchen · Bathroom · Kitchen · Outdoor); change is a 0.8s clip-curtain [S0652 §5 curtain].
- Background reaction: the section ground lerps from `--old` (warm sodium of an old tube light) at 0% to ink-cool at 100% with the handle — the room's light changes as the visitor renovates [brief: "light moving across surfaces"].
- Cursor: handle `drag-x`.
- Mobile: frame full width (16px margins), handle hit area 44×44, `touch-action: pan-y` on the frame.
- Reduced motion: drag works, no spring overshoot, background tint steps instead of lerping.
- Opening state: handle parked at 50% (the room half-done invites finishing [S1457]).

**v2 · "Four rooms, one scroll"** — axis: *motion / trigger* (scroll drives the reveal).
- Sticky stage, 4 chapters, 240vh total (one screen-ish per pair [S0095 §5 "≈1 screen per step"]); each chapter scrubs a **vertical** wipe `inset(X% 0 0 0)` from before → after (scrub true, linear [S0652 §6]); a plain count "1 of 4" [S0095 §5 plain count]; captions at 0.4 when inactive.
- Background reaction: the stage's surrounding ground warms → cools per chapter as above, driven by scroll.
- Cursor: dot only (nothing to grab).
- Mobile: no pin; four stacked frames, each wipes once on entering (IO 0.5, 1.2s `--ease-io`).
- Reduced motion: four side-by-side pairs, no wipe.

**v3 · "Throw out the old room"** — axis: *structural decomposition* (a stack of prints).
- The four "before" photos as a slightly fanned stack of prints (rotations −3°…+4° [S0214 Z-axis cascade]); the visitor drags/flicks the top print away (2D body, release velocity kept, projection r 0.998, friction, walls at the stage edge [S0340 thrown card, S0652 §4]); the matching "after" is revealed beneath and slides into a row of finished rooms. Buttons "Next room" and "Start over" do the same by keyboard [S0049 gestures need alternatives].
- Pointer trail: sawdust motes emitted by distance while dragging (step 6px, cap 14 per frame, life 0.6–1.1s, falling, not rising; idle breath off) [S1323 forge-spark remix pattern].
- Background reaction: each thrown print leaves the ground one step lighter.
- Cursor: `flick`.
- Mobile: swipe to throw (horizontal axis commit), trail off.
- Reduced motion: "Next room" crossfade 150ms, no throw physics.

### 6.4 `kitchens` — "A beautiful kitchen in the wrong layout is one you work around every day."
Copy: the firm's three published scopes [FACTS]: **Refit** "Same layout, new kitchen" · **Full remodel** "Layout and services move" · **Open-plan** "The room itself changes". Line: "Want a layout resolved before you are asked to choose a door style?" + CTA "Book a consultation". Real photos per scope: Refit `k-gray-shaker`, Full `k-navy-white`, Open-plan `k-walnut-marble`. The plan is an illustrative drawing (labelled) with **no dimension numbers** [S0650 fake precision].

**v1 · "Pick your scope"** — axis: *interaction* (tabs morph the plan).
- Split diptych: plan (left 7 cols) + real photo (right 5 cols, the photo is the proof of that scope) [S1303 Split Diptych].
- Three scope buttons (≤4 options [S1444]); the SVG plan changes by tweening shared-structure paths (walls, sink, range, island) with MorphSVG 0.8s `power2.inOut` [S0184, S0407]; the removed wall dissolves into dust (12 particles, 0.6s) for Open-plan; the plumbing line re-routes with DrawSVG; the photo swaps with a 0.8s clip curtain [S0652 §5].
- First draw on enter: walls → openings → fixtures, each group waiting one duration (1.2s expo) [S0634 §G, S0095 §5 (e) 1100–1300ms expo].
- Background reaction: none; the plan carries the motion.
- Cursor: plan zones `pencil`; buttons `link`.
- Mobile: plan above photo, buttons as a horizontal scroll-snap row.
- Reduced motion: instant swap, plan fully drawn.

**v2 · "Watch the wall come out"** — axis: *motion / trigger* (scroll-scrubbed sequence).
- Sticky stage 200vh [S1326]: progress 0–0.3 draws the existing plan (dashoffset scrub), 0.3–0.55 the wall between kitchen and family room is cut (the wall path splits and its halves slide out; dust particles disturbed by the pointer [S1363 'exit' mode, 40 motes]), 0.55–0.8 the island and new sink run draw in, 0.8–1 the plan cross-dissolves into the open-plan photograph (`k-walnut-marble`) under the lines (the signature line→photo motif). Copy beside it changes per stop (one line of text on every held screen [S0095 §5]).
- Background reaction: the drawing ground (surface) brightens from blueprint-dark to daylight as the room opens.
- Cursor: dot; particles respond to the pointer.
- Mobile: no pin; three plan states as stacked figures, each drawn on entering.
- Reduced motion: final open-plan drawing next to the photo.

**v3 · "Walk the kitchen"** — axis: *density* (one plan, many rewards [S0095 §6 three levels of detail]).
- One large plan; hovering or focusing each zone (Cook, Prep, Clean, Gather) draws that zone's outline (0.6s `(0.22,1,0.36,1)` [S0652 §7]) and shows the real photo detail of that zone from Elbaz's kitchens in a frame that **follows the pointer** (image-follow preview, lerp 0.12 [S1303 §8]) — e.g. Cook → brass-banded hood (`k-brass-hood`), Clean → farmhouse sink (`k-gray-shaker`), Gather → waterfall island (`k-white-shaker`), Prep → walnut run (`k-walnut-marble`). A dot walks the work path between zones (MotionPath 4s loop, pauses offscreen [S0634 trajectory-path]).
- Background reaction: unlit zones dim to 40% (peripheral de-emphasis [S0652 §8]).
- Cursor: `pencil` (the preview frame is the cursor's companion).
- Mobile: zones are buttons; the photo appears in a fixed frame below the plan.
- Reduced motion: no walking dot, previews swap instantly.

### 6.5 `room` — "Turn the room around." (the payoff)
Copy: h2 "Turn the room around." · line "Drag to look. Flip the switch. This is an illustrative model; every photograph on this page is a real Elbaz project." · CTA "Book a consultation". Three.js r159 UMD inlined, assert `THREE.REVISION === "159"` [threejs-pack §0]. Lazy-built one viewport ahead (IO rootMargin 100%), render-on-demand, paused offscreen and on hidden tab, quality tiers + governor, disposal on version swap, poster fallback (inline SVG of the start pose) + WebGL try/catch + context-loss handling [S1334, S0319, S0205, S1320]. Renderer: `outputColorSpace sRGB`, ACES, exposure state-driven 0.92→1.05; DPR cap 1.75 desktop / 1.35 phone; 1 shadowed key light (2048/1024, frozen), hemisphere fill 0.25, 3 pendant point lights 1.2cd (no shadows), core-only PMREM environment (sigma 0.04); PBR values per threejs-pack §5 (quartz rough 0.12, white oak 0.58 + anisotropy, satin brass `#D9B573` 0.32/metal 1, lacquer 0.55–0.62, before oak `#9A6A3E`); seeded CanvasTextures (marble veins, oak planks, subway tile, the "Miami" exterior through the window) [S0264, S0323]. Room in metres: 6.8 × 5.2 floor, back + left walls with a window, perimeter run, upper run, hood, island with waterfall ends and three stools, three brass pendants. Camera 35° (40/45 on taller aspects), fit distance per aspect [S1334]. Orbit: drag only, θ clamp [−0.35, 0.85], φ [0.95, 1.36], damping 0.05 frame-rate-independent, `touch-action: pan-y` (horizontal swipe orbits, vertical scrolls), no wheel [S0258, S0205]; keyboard ←/→/↑/↓ + "Rotate left/right/Reset" buttons. Mouse parallax per S1330: camera −26/+16 px-equivalents (K 0.012), look-at carry 0.42, room yaw 0.055 / pitch 0.026, damping 0.055; paused while dragging. Before → after state table per threejs-pack §11 (exposure, key colour/intensity, pendants 0 → 1.2, wall colour, env) damped at λ 4.0.

**v1 · "Flip it"** — axis: *interaction* (direct: orbit + a physical switch).
- Full-viewport WebGL stage (not pinned). A large two-position switch "Before | After" built as a heavy physical toggle (mass 3, 1.35 Hz, ζ 0.74, walls catch the overshoot [S0340 heavy toggle]); flipping runs the reno sweep (S1335 world-space scan, lag 2.34m, wobble 0.162/0.0765) so the new finishes travel across the room while the light changes — *light moving across surfaces* (key light swings from cool 0xdfe8f5/1.4 to warm 0xfff1dc/2.2).
- Background reaction: the scene's sun follows the pointer horizontally (key light azimuth ±10°) [S1330 far/near split].
- Cursor: canvas `orbit`; switch `drag-x` (it can be dragged as well as clicked).
- Mobile: 4:5 canvas `min(80svh,125vw)`, tier medium, switch below.
- Reduced motion: still pose (x .28, y −.12), instant state change, orbit without inertia.

**v2 · "Built in order"** — axis: *motion / trigger* (scroll is the camera).
- Chaptered scroll world [S1334 §12]: 4 chapters over 250vh desktop / 150vh phone (the only phone pin, kept short): *Drawing* (blueprint cage, S1335 entrance scan 3.4s, background `#0e1c2b`) → *Before* → *After* (scroll scrubs the reno sweep) → *Detail* (camera close on the island and pendants). Camera on a centripetal Catmull-Rom path, `rig.smooth` damp 5.2; labels read `rig.target` (no lag) [S1334 failure signatures]. One word per chapter on the page: Drawing · Before · After · Detail, "2 of 4" count.
- Background reaction: page ground under the canvas follows the chapter (blueprint ink → evening → daylight).
- Cursor: dot; canvas drag nudges the chapter pose ±0.5 rad.
- Mobile: short pin, FOV +6–8° per chapter override.
- Reduced motion: four stills as a 2×2 set, captions kept.

**v3 · "Choose the finish"** — axis: *colour strategy* (the visitor decides the palette; the page stays on brand around it).
- Configurator [pack pick Silo/BLK: one state object, live preview]: Cabinets **Navy · Emerald · White · Walnut**, Counter **Quartz · Marble**, Hardware **Brass · Black**. Every swatch names the real Elbaz project where that finish was built ("Seen in: Navy Blue Shaker Kitchen…") and links to its photo in the Work section. Selections repaint via colour/uniform tweens only (no recompiles [threejs-pack §11]); each change runs a light sweep across the changed surfaces.
- Swatch grid uses peripheral de-emphasis (others to .5 opacity + 2px blur, hovered scale 1.04, 200ms) [S0652 §8].
- Background reaction: the section ground takes a 4% tint of the chosen cabinet colour.
- Cursor: swatches `swatch` (cursor fills with the finish colour); canvas `orbit`.
- Mobile: swatches in a horizontal scroll-snap row under the canvas.
- Reduced motion: instant repaint.

### 6.6 `baths` — "Down to the studs. Waterproofed properly. Closed up once."
Copy: h2 = the firm's verbatim line. Layer notes (verbatim or near-verbatim from the firm's bathroom page, short): Studs "Every system inside the wall, reached once." · Cement board "Backer board is water-resistant, not waterproof." · Membrane "A membrane over it, corners and penetrations detailed." · Tile "Tile set square." · Glass "Glass is templated after tiling, cut to what was actually built." CTA "Book a consultation". Real photos: `b-black-marble`, `b-emerald`, `b-spa-guest`, `b-polished-concrete`. Diagrams labelled "Illustrative wall section".

**v1 · "The wall, exploded"** — axis: *structural decomposition*.
- A crafted wall section built as a real assembly standing on its sill, not floating slabs [S0526 §0 "floating plates for layers" is the named failure]: bottom plate + studs with nail-dot rows → cement board with screw rows → membrane with lapped seams and corner band → thinset ridges → tile with edge-to-edge grout joints → a valve stub and niche as the subject (the one `lit` part). S0526 projection: orthographic, azimuth ≈40°, elevation 30°, `V=(cosA·cosE, sinA·cosE, sinE)`, painter's order by `dot(p,V)`, wrapping parts split back/front; 0.6px lines, four shades ~3% apart + lighter top, one `lit` part in `--accent`, every line lands within 1 viewBox px; viewBox ≈600×360, object fills 55–65% of the card; 40–60 parts [S0526 §1–3]. No leader lines or dimension arrows; a title, a hint and a live readout in words ("Apart · tile first") sit in the card corners [S0526 §4]. No numbers (thicknesses are not published by Elbaz [FACTS]).
- Explode [S0526 §5]: each layer moves along the true wall normal with its own spring (stiffness 64, drag 14.2, 4 substeps), 35ms stagger, the outside layer (tile) leaves first and closing reverses. Driven by scroll position as the section crosses the viewport (target = progress, not pinned) [S1326 normalized progress], plus an "Take it apart / Put it back" button and ←/→ keys; depth re-sorted only when order changes. Hover/focus a layer (each a focusable button, legend doubles as selector) → it goes `lit`, others step down one tone, its one-line note shows [S0526 §5 select/annotate]. Idle tour after 1.4s in view, resumes 3.6s after input [S0526 §6].
- Background reaction: a bounded steam particle layer (count 40 desktop / 0 phone, gravity −6, sway 14, pointer radius 110, recycle) drifts behind the wall and parts around the pointer [S1363].
- Cursor: layers `pencil` with label of the layer name.
- Mobile: exploded state fixed (no scrub), notes listed below.
- Reduced motion: exploded still, no steam.

**v2 · "X-ray the tile"** — axis: *interaction* (a lens over a real bathroom).
- A large real photograph (`b-emerald`) with an x-ray layer (the same wall section drawn flat, aligned to the shower wall region) revealed through a cursor lens [S1324: radius 260 desktop / 160 compact, pointer ease 0.1, radius ease 0.14, mask stops 0 · 40% · 60% .75 · 75% .4 · 88% .12 · 100% 0, loop stops when settled, collapses on leave/blur]. A visible "Show the wall" toggle reveals the full x-ray for touch and keyboard [S1324 accessibility].
- Background reaction: the photo darkens 10% outside the lens (lens draws focus) [S1425 figure-ground].
- Cursor: the lens itself (`lens` x-ray; ring hidden).
- Mobile: toggle only.
- Reduced motion: lens jumps without trailing; toggle remains.

**v3 · "Peel it back"** — axis: *layout topology* (stacked full-viewport plates).
- Sticky stack of five plates [S0650 §5.A canonical skeleton, `start:"top top"`, previous plate scale 0.92 / opacity 0.55 driven by the next plate's trigger]: Studs → Board → Membrane → Tile → the finished bathroom photograph (`b-black-marble`). Each plate is a material close-up drawn in the diagram language (not fake photography [S1304 "never fake the photography with CSS"]), except the last, which is the real photo. Native sticky, no JS pin [S1375 #7].
- Background reaction: each plate's arrival darkens the one beneath (depth without 3D).
- Cursor: dot.
- Mobile: plates as normal stacked figures.
- Reduced motion: no scale/opacity changes.

### 6.7 `work` — "Real projects, photographed as delivered."
Twelve projects (FACTS titles): Navy Blue Shaker Kitchen · Open-Concept Kitchen with Fluted Walnut and Bookmatched Marble · Emerald Shaker Kitchen · White Shaker Kitchen with Waterfall Quartz Island · Two-Tone Kitchen with Turquoise Herringbone Backsplash · Black Marble Primary Bathroom · Polished-Concrete Primary Bath · Spa-Style Guest Bathroom with Backlit Mirrors · Contemporary Primary Bath with Fluted Vanity · Champagne Bronze & Marble-Look Tile Bathroom · Modern Farmhouse Whole-Home Renovation · Waterfront Backyard & Outdoor Living. Count line: "52 completed projects. Every image is our own work." Link "See all 52 projects" (to the live projects page).

**v1 · "The filmstrip"** — axis: *layout topology* (horizontal).
- Pinned horizontal pan [S0650 §5.B canonical: `start:"top top"`, `end: +=distance`, `pin:true`, `scrub:1`, `invalidateOnRefresh`]; 3 frames + a cut fourth visible (25–35% each, gap 16–20px) [S0095 §6]; images 125% wide offset −12.5% with in-frame parallax driven by the pan (Codrops horizontal parallax, lerp 0.07) [pack pick #10]; titles always visible under each frame [S1375 "title without hover"]. Click opens a full-viewport viewer with Flip (0.6s `power2.inOut`, Esc closes, focus returns) [S0184 Flip, pack pick #8].
- Background reaction: the section ground shifts toward the dominant tone of the frame at centre (pre-computed per image, 8% mix) [S1375 "background changes tied to boundaries"].
- Cursor: `view` with the project title.
- Mobile: native horizontal scroll-snap row (`touch-action: pan-x`, `overscroll-behavior-x: contain`) [S0652 §4 carousel], no pin.
- Reduced motion: no pin; a wrapped grid.

**v2 · "The table"** — axis: *interaction* (free drag).
- Boundless drag-to-pan table of the twelve photos at mixed sizes (4:5 and 3:2 only [S0095 §6]); Draggable `type:"x,y"` + Inertia (projection 0.998 feel), edgeResistance 0.85, bounds = table [S0184]; arrow keys pan; each photo is a button opening the same viewer.
- Hover: the hovered photo regains full colour while the rest sit at 70% brightness (one treatment per page: this version uses brightness only) [S0095 §6].
- Background reaction: the table's ground moves at 0.9× the photos (one depth layer behind).
- Cursor: `drag-xy`, `view` over a photo.
- Mobile: two-finger free pan is hostile; becomes a 2-column grid.
- Reduced motion: grid, no inertia.

**v3 · "Under the inspection light"** — axis: *colour strategy* (drawings until lit).
- Pinned 200vh catalogue [S1375 #8]: twelve mounts shown as **line drawings traced from their own photographs** (the signature motif), quiet on the ground; a soft rectangular light visits each in turn with scroll, and under the light the drawing develops into the real photograph (clip + opacity), with the project title updating in an index. Light positions measured at refresh [S1375].
- Background reaction: the light itself (a lightness field, no glow) is the reacting background.
- Cursor: a second, smaller light follows the pointer (220px, lerp 0.1) and develops whatever drawing it passes over [S0634 spotlight-follow].
- Mobile: no pin; each mount develops as it enters.
- Reduced motion: all photographs shown developed.

### 6.8 `reviews` — "4.8 from 343 Google reviews."
Verbatim quotes (≤3 lines each, selected from FACTS kitchen/bath set): Valerie Cisneros (Raz, design ideas), RIo Norman (Ashley, kitchen), Sierra Bernabeo (Asher, ideas and price), Jonathan Vargas (bathroom, "very reliable honest and clean work"), Andrew Tyupa (Ashley, new bathrooms), Sandy Zurita (Asher, "experienced and swift"), Kameron Allison (call Sean). Attribution: name + "Google review" [S0650 §4.10]. Link "Read every review on Google". Long quotes are trimmed only at sentence ends, never edited inside quotes.

**v1 · "One voice at a time"** — axis: *hierarchy* (one huge quote).
- Pinned 180vh word illumination [S1375 #3, S1327]: three quotes in turn; words go from 0.2 opacity / 4px blur to full with scroll; a short hold after each final word; name resolves last; "1 of 3".
- Background reaction: two oversized curly-quote glyphs at different parallax rates (0.92 / 1.06) [S0634 scroll-parallax].
- Cursor: `quote`.
- Mobile: no pin; quotes illuminate as they cross the viewport centre.
- Reduced motion: quotes fully lit.

**v2 · "The wall of notes"** — axis: *density* (all of them at once).
- Asymmetric masonry of seven quotes at three sizes; hovering one focuses it (scale 1.04, the rest .5 opacity + 2px blur, 200ms) [S0652 §8 peripheral de-emphasis]; stars drawn once per card on entering (DrawSVG 0.4s).
- Background reaction: none (calm section by design [S0652 novelty]).
- Cursor: `quote`.
- Mobile: single column, no hover focus.
- Reduced motion: no blur changes.

**v3 · "Turn the page"** — axis: *interaction* (one quote, flipped by hand).
- A single large quote with "Next" / "Previous" buttons and swipe; the outgoing quote leaves upward with 4px blur (300ms), the incoming rises 12px (400ms expo) — container morph timing asymmetric [S0652 §3 open 284ms / close 185ms]; reviewer names roll in an odometer-style slot [S0652 §8].
- Background reaction: the surface ground's lightness steps one point per quote.
- Cursor: `quote`; buttons `link`.
- Mobile: swipe + buttons.
- Reduced motion: instant swap.

### 6.9 `towns` — "Do you build in my town?"
Data: the 104 municipalities by county (FACTS). Answer copy (from the firm's FAQ promise): found → "Yes. {Town} is in {County} County. We build there." · not found → "It's not on our list. Call (754) 236-0675 and we'll tell you straight away." Line: "104 municipalities across three counties, and we hold the licence to build in all of them."

**v1 · "Ask"** — axis: *interaction* (a search field).
- Labelled input (label above, `autocomplete="address-level2"`, 16px on mobile [S0074, S1442]); live match as you type (no animation per keystroke [S0089 none-high-frequency]); answer region `aria-live="polite"`; the matching county list below highlights the town. Suggestions appear for partial input (max 4 [S1444]).
- Background reaction: the three county names behind the field change weight with the match (the matched county at wght 800, others 300).
- Cursor: input = native I-beam; suggestions `pin`.
- Mobile: same.
- Reduced motion: same (no motion to reduce beyond the weight change, which becomes instant).

**v2 · "All 104"** — axis: *density* (every name visible).
- A typographic index of all 104 names in three county columns; the pointer is a weight lens (names within 140px swell in Archivo weight/width, falloff 0.45^d) [S0652 §8, S0634 hover-magnetic-text]; clicking a county heading filters; a small find field is still there for keyboard users.
- Background reaction: the lens itself (type responds).
- Cursor: `lens`.
- Mobile: columns become an accordion per county (semantic disclosure).
- Reduced motion: no lens.

**v3 · "The tape"** — axis: *motion* (the page's one marquee).
- The 104 names run as a single velocity-reactive tape [S1375 #4, S0450 marquee-loop: two copies, translateX 0 → −50%, 40s linear; scroll velocity briefly accelerates it and direction reverses it]; the name crossing a fixed centre mark gains weight; a find field sits below; pauses offscreen and on hover [S0049 autoplay >5s needs pause].
- Background reaction: tape speed = background reaction to scroll.
- Cursor: `pin`; hovering pauses.
- Mobile: tape slower (60s), no velocity coupling.
- Reduced motion: static three-column list.

### 6.10 `consult` — "Let's talk about what you want to change."
Copy (verbatim): h2 "Let's talk about what you want to change." · "Book a consultation and we will walk the property, talk through scope honestly, and tell you what it really takes." · "A real consultation, not a sales visit." Phone (754) 236-0675 · Sun–Fri 7am–7pm, Saturday closed · 19 W Flagler St #310, Miami, FL 33130 · Sales@elbazconstruction.com. Money line: "Prefer to pay monthly? Synchrony and Service Finance offer financing for kitchens and baths. Elbaz Construction is not a lender." Form (published fields, same names and order [S0650 §11.F]): Full name*, Phone*, Email*, Address*, Project description*, Preferred contact (Phone / Email / Text), consent checkbox (verbatim). Submit "Send my request". This file has no server, so submit composes an email to Sales@elbazconstruction.com with the fields (mailto) and says so plainly before sending; success confirms in place [S1440]; errors inline next to fields, focus first error [S0049, S1442, S0661]. Footer: logo, licence line, counties, social links (Instagram, Facebook, LinkedIn, YouTube), "Español" (to /es/), © line without year conflict. LocalBusiness JSON-LD with the exact NAP [S1128, S1146].

**v1 · "The walk-through"** — axis: *layout topology* (split close).
- Split close: left = statement + phone as the largest type on the field (contact fact as headline [S0095 §3 endings]); right = the form on ink. The finished room photo (`r-openplan`) sits behind the statement at 30% under a solid scrim, its light shaft (a flat lighter band) slowly following the pointer.
- CTA `magnet-strong` [S1375 #12]; submit morphs into a progress ring then a tick (circular progress button, pack pick #29; ring 0.8s, tick delayed one duration [S0634 lottie-checkmark]).
- Background reaction: the light band follows the pointer (lerp 0.06).
- Mobile: statement, phone (tap to call), form stacked.
- Reduced motion: no light movement, instant success state.

**v2 · "Two questions first"** — axis: *hierarchy / flow* (qualify, then contact).
- A two-step form [pack pick Iper/Digital Butlers: step indicator + time promise]: step 1 "Which room?" (Kitchen · Bathroom · Whole home · Something else; ≤4 [S1444]) mapped into Project description; step 2 the published fields. Promise line: "We usually come back the same or next working day." (the firm's own wording). Step change slides 24px with 300ms `(0.25,1,0.5,1)` [S0652 §2].
- The phone number is an odometer that rolls in once when the section enters (1100ms expo [S0095 §5 rolling digits]).
- Background reaction: the field ground steps lighter at step 2.
- Cursor: choices `magnet-in`; submit `magnet-strong`.
- Mobile: same, full width.
- Reduced motion: no slide, no roll.

**v3 · "Sign the drawing"** — axis: *colour strategy / structure* (the form is a drawing sheet).
- The form laid out as a title block on a drawing sheet (the signature motif closing the page [S1304 Resn "reward scene"]): field outlines draw when focused (DrawSVG 0.4s along the field's rectangle), the "Project description" is the drawing's note area; on send, the sheet's lines complete and the finished-room photo develops behind the sheet (the line → photo motif one last time).
- Background reaction: the sheet's drawing lines extend toward the focused field.
- Cursor: fields native; submit `magnet-strong`.
- Mobile: sheet becomes a single column; outlines still draw.
- Reduced motion: outlines static, photo shown developed after send.

---

## 7. Build plan (checkpointed commits)

Source tree (committed): `remodeling/src/` — `build.py` (inlines CSS, JS, fonts, libraries, image store into one file), `base.html`, `sections/<id>.html`, `css/*.css`, `js/core.js` (Lenis, cursor engine, version manager, theme/motion toggles, image store), `js/sections/<id>.js` (each exports `{v1,v2,v3}` with `init(root) → cleanup`), `js/room3d.js`, `tools/trace_lines.py` (OpenCV trace → SVG for the signature drawings). Vendor: GSAP 3.15.0 (+ScrollTrigger, SplitText, DrawSVG, MorphSVG, Draggable, Inertia, Flip, MotionPath), Lenis 1.3.27, three r159 UMD. Output: `remodeling/site/elbaz-homepage.html`.

Checkpoints: (1) core system + chrome + hero; (2) proof + ba; (3) kitchens + room; (4) baths + work; (5) reviews + towns + consult; (6) audit + fixes. Each checkpoint: build, Playwright screenshots at 1440×900 and 375×812 for every version, console clean, commit.

## 8. Audit gates (run per section and per version before delivery)
1. Identity/distinctiveness: S0001 clusters, S0095 competitor test + 14 passes, S1304 critique (≥7 per dimension).
2. Hierarchy and composition: S1501, S1498, S1499 (≤4 options), S0650 §4.7 hard rules.
3. Type: S1500 + S0074 "Before you finish" table.
4. Colour: S1497 measured pairs in both themes; accent ≤5%.
5. Motion: S0063 ten standards → Block/Approve; S0652 review checklist; S0083/S0089 rule IDs.
6. Anti-slop: S1314 clusters, S0220 matrix, S0650 §9, Removal Test [S1306].
7. Mechanical: S0049 full rule set; S1190, S1169, S1209, S1066; S1482 QA list.
8. Score: S0242 ui-score ≥ 80; S0220 7-axis ≥ 4; S0006 audit /20 ≥ 14; S0650 §14 Pre-Flight all ticked (custom cursor and 1·2·3 recorded as brief-mandated deviations).
9. 3D: threejs-pack §18 checklist (18 items).
10. Viewports: 1440×900, 1280×800, 768×1024, 375×812, 360×640; reduced motion; motion toggle off; Daylight theme; keyboard-only pass.
