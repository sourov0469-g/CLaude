# Skill Pack Notes: impeccable [S0006] (read in full, lines 1-5208)
Reference only; CLI, live-mode and comp-pipeline tooling ignored. This build = **Persuade** mode: bold, committed, real imagery. Core rules: the brief wins; finish the job; verify at shipping sizes in batched looks, max 2 inspection rounds.

## 0. Mode + world (new-work, mode-persuade)
- The opening makes the offer clear and desirable, shows the primary action **in working form** (a link to it elsewhere doesn't count), and proves something only this firm can.
- The world is the page's ground, surfaces and headline type, not a picture or an accent. "World as accent on a neutral template = category default with a sticker." These are templates whatever paints them: **split hero** (copy | product + badge row) and **centred headline over a row of cards**.
- Colour strategy first: Restrained (tinted neutrals + 1 accent) / Committed (1 saturated colour on 30-60% of the surface) / Full palette (3-4 roles) / Drenched (the surface IS the colour). Colour owns whole regions. Pick dark/light from one sentence of physical scene, never by default.
- **Overused fonts**: Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans. Each needs a reason no other face meets.
- **AI-look clusters** (fail unless briefed): (1) cream + serif display + terracotta/red; (2) near-black + one neon + glowing edges; (3) editorial hairlines + italic serif + tiny tracked mono; (4) flat ink + black boxes + hard offset shadow + condensed display. If the look is guessable from the category, or from category + avoidance, rework it. Cream/parchment/lamplight is the model's own default.
- Build rules:
  - First viewport = thesis, not header. Memory test: what would they describe an hour later?
  - Prove, don't claim: demo data labelled synthetic; never invent prices, customers or counts.
  - Author assets; never chrome (gradients, glass, icon tiles, many-vertex clip-paths).
  - Build the named web technique for real (WebGL, canvas, view transitions).
  - Studio pacing: a dense passage earns a quiet one; end on a real close.
  - One verified photo of the real subject beats five mediocre ones.
  - Motion orchestrated once.
- Never put the direction contract (THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM / FINISH, about 150 words) in shipped HTML: no comments, data-* or JSON-LD.
- **Applies here:** the consult booking works in viewport 1. Kitchens/Baths/Whole-home are not 3 equal icon cards. Both themes are composed, not inverted. The Three.js room is real web leverage. Stats, reviews and awards are real or absent.

## 1. Craft floor (verify on the build)
- **Contrast:** body/placeholder 4.5:1, large 3:1. Secondary text on a colour is tinted from it, never grey.
- **Depth:** shadow = offset + soft blur; a zero-offset coloured halo is decoration.
- **Spacing:** tight groups, generous separation, more space above a heading than below.
- **Type:** measure 65-75ch, **display max 6rem**, **tracking floor -0.04em**, balanced headings, obvious steps.
- **Motion:** one authored moment, not one identical entrance per section; exponential ease-out from a visible default.
- **States:** hover, disabled, loading, error, empty, keyboard focus.
- **Browser surfaces:** theme ::selection, caret, scrollbars, focus rings, underline offset and tabular numerals.
- **Copy and coverage:** controls name their action; every brief requirement findable in seconds.
- "When torn between refined and committed, commit."

## 2. Anti-patterns (REFUSE)
- **BAN (no brief earns it back): eyebrow/kicker label above a heading.**
- Category defaults to refuse:
  - equal icon + heading + text cards; nested cards;
  - hero-metric template (big number + small label + stats);
  - section numbers 01/02/03 unless the sequence is information;
  - a modal that isn't needed;
  - gradient text; glass/blur as decoration;
  - coloured border-left/right >1px on cards or callouts;
  - `4px 4px 0` hard shadow outside neobrutalism;
  - sparklines, progress rings or soft rounded rects as content stand-ins;
  - mono as a "technical" costume;
  - system display face (self-host a real one);
  - emoji/unicode icons (one library or authored SVG, one stroke);
  - geometric masks faking organic photo edges;
  - light/dark picked by category.
- The detector also flags: glow shadows, bounce easing, organic clip-path, overflow, broken images.
- **Applies here:** no "OUR SERVICES" eyebrow and no "500+ projects" stat strip. The 1-2-3 switch is a control, not section numbering.

## 3. animate
- Persuade: **one rehearsed focal sequence beats repeated section reveals.** Thesis = focal moment / continuity / feedback / budget. "A generic fade-and-rise, hover lift, **parallax layer**, or scroll reveal is not a thesis."
- Material by meaning: continuity -> FLIP/view transitions; depth -> bounded blur/light/shadow; reveal -> mask/clip-path; energy -> colour/shader. Don't stack. Stagger only real lists, with the total capped.
- **Durations:** 100-150ms feedback | 150-300 state | 300-500 layout/overlay | 500-800 authored focal entrance. **Exit faster than entrance.** Ease `cubic-bezier(0.16, 1, 0.3, 1)`; no reflex bounce/elastic.
- Content visible by default (a failed script hides nothing). Never animate width/height/top/left/margin. Bound blur/filter/canvas/shader regions; `will-change` only while animating. Loops stop offscreen.
- **prefers-reduced-motion:** an intentional alternative that removes spatial movement but keeps opacity, colour and state feedback. A global `0.01ms` kill is flagged.
- **Verify:** world-specific focal moment; each animation explains something; interruptible; keyboard and mobile OK; smooth on device; removing it loses meaning.
- **Applies here:**
  - Pick ONE focal sequence (e.g. the plan draws itself, then becomes the 3D room).
  - Parallax must mean depth, not decoration.
  - Scroll-driven text only where the scroll carries meaning: `@supports (animation-timeline: scroll())` with a static fallback.
  - Reduced motion: plans pre-drawn, parallax flat, cursor follower off.

## 4. typeset
- Body floor 16px; prose 45-75ch; a wider measure needs more leading.
- **Light-on-dark:** slightly more line height, a touch more tracking, one weight step heavier if needed.
- `text-wrap: balance` on headings, `pretty` on body; hand-break only between phrases and check every width.
- Fewest families; a second family needs a job only it can do. Load only the weights used; `font-display: swap`/`optional`, subset, preload.
- Paragraph spacing OR indent, not both. Distill limits: 1 family, 3-4 sizes, 2-3 weights.
- **Applies here:** tune type per theme. Scroll headlines stay within 6rem and wrap cleanly at 390px. Versions vary scale, case or weight, not the face.

## 5. colorize
- Use roles (canvas, elevated surface, text 1/2, action/focus, border, status), not swatches. OKLCH; cut chroma near white and black.
- Hue from product meaning, never a category association. The CTA colour isn't spent on decoration. Dark mode is designed, not inverted; themes remap semantic tokens.
- **Contrast:** body 4.5:1, large 3:1, **controls/icons/focus 3:1**. Check text on images and overlays, both themes, and colour-vision deficiency. Never colour-only meaning; prefer explicit colours to stacked alpha.
- **Applies here:** before/after handle and labels, cursor and focus ring all hit 3:1 over both photos, in both themes, at every parallax offset.

## 6. layout
- Persuade may go asymmetric when the world earns it.
- Squint test: primary, secondary and groups readable in order. Proximity before containers; rhythm from tight vs generous gaps; **4-unit spacing scale**; `gap` for siblings.
- DOM and focus order match the visual order. Touch targets stay usable even when the visible mark is small.
- **Applies here:** pinned scroll scenes must not trap focus or overlap at 390px.

## 7. delight / bolder / overdrive / quieter
- **delight:** one delight thesis. Never fake work, never unskippable, never tiring on repeat. Works muted, keyboard and touch. Could a neighbouring product reuse it unchanged? Then it isn't delight.
- **bolder:** amplify what the system owns (no new colour, font or primitive). "If every element got louder, the section got flatter." Skeleton test: without the copy, the structure still says what the section is.
- **overdrive:**
  - Marketing wow = scroll reveal, shader, cinematic transition, cursor-reactive generative art.
  - Toolkit: View Transitions (cross-document not in Firefox), `@starting-style`, springs, `@property`, WAAPI, WebGL (Three.js), WebGPU with WebGL2 fallback.
  - **Progressive enhancement is mandatory; the CSS-only fallback must look good.** **60fps; below 50, simplify.** Lazy-init WebGL near the viewport; pause offscreen rendering; test mid-range devices.
  - **NEVER:** jank; no fallback; sound without opt-in; **several competing extraordinary moments**.
  - Tests: wow / removal / device / context.
- **quieter:** motion distance 10-20px, not 40; ease-out-quart.
- **Applies here:** rank cursor, parallax, before/after, plans, 3D room and scroll text into one hero moment plus supporting effects. Three.js needs a webgl2 check, a static image fallback and an IntersectionObserver-gated loop.

## 8. harden + custom controls (adapt)
- Extremes: 100+ character names, emoji, RTL, empty states; i18n +30-40% space. 16px inputs (iOS zooms anything smaller); 200% zoom; `min-width:0` on flex/grid children.
- Forms: inline errors, input preserved, retry, no double submit.
- Core content works without JS.
- **Interrupted gestures:** a 2nd pointer keeps or cleanly ends the first. On `pointercancel` / `lostpointercapture` / release outside / window `blur`: clear drag state and release capture. The next drag works without a reload.
- **Sliders and drag surfaces:**
  - A touch drag must *complete*.
  - A swipe along the page's scroll axis scrolls the page; a drag along the control's axis moves the control.
  - Set `touch-action`; no mouse-only handlers.
  - Name the evidence (emulated / synthesized touch / engine / device) and what stayed untested.
- **Applies here:**
  - Before/after: pointer capture, `touch-action: pan-y`, arrow keys plus slider role/value, 44x44 handle.
  - 3D orbit: must not hijack page scroll; give a keyboard alternative or static views.
  - Cursor: only under `(pointer: fine) and (hover: hover)`, never carries function, never hides focus.

## 9. Performance
- LCP <2.5s, INP <200ms, CLS <0.1.
- Images: WebP/AVIF at 80-85%, srcset, lazy-load below the fold (**never above**), set `aspect-ratio`.
- Batch DOM reads before writes; rAF (16ms/frame); IntersectionObserver; `contain`. Test on low-end Android and 3G.

## 10. audit rubric (5 dims x 0-4 = /20)
- **A11y:** contrast 4.5/3 (7 AAA), reduced-motion alternative, ARIA, focus and tab traps, semantics, alt text, labels.
- **Performance:** thrash, expensive animation, lazy loading, `will-change` overuse.
- **Theming:** hard-coded colours, broken dark theme, values that don't switch.
- **Responsive:** 44x44 targets (WCAG 2.5.8 floor 24x24, with the spacing-circle exception); **broken touch** (mouse-only handlers, no touch-action, drag not cleared on cancel/blur); horizontal scroll; text scaling.
- **Integrity:** product-specific vs interchangeable.
- Bands: **18-20 Excellent | 14-17 Good | 10-13 Acceptable | 6-9 Poor | 0-5 Critical.**
- **P0** blocks the task | **P1** major or WCAG AA, fix before release | **P2** minor, workaround exists | **P3** polish. "Would a user contact support? Then at least P1." Keep P3s few.

## 11. critique
- **Specificity verdict first:** could an unrelated product use this unchanged?
- Nielsen 10 x 0-4 = /40 (H7 and H10 may be n/a on Persuade, giving /32, read as %). Bands 36-40 / 28-35 / 20-27 / 12-19 / 0-11 (90/70/50/30%). Most UIs score 20-32.
- Report: 3-5 priority issues (What/Why/Fix).
- Landing-page personas:
  - **Jordan:** first action clear in 5s.
  - **Riley:** edge cases, refresh mid-flow.
  - **Casey:** thumb zone, 44x44, 3G.
  - **Sam:** keyboard-only, visible focus, announced state, no colour-only meaning, 200% zoom.
  - **Alex:** unskippable slow animation is a red flag.
- **Cognitive-load checklist (8):** single focus; chunks of 4 or fewer; grouping; hierarchy; one decision at a time; **4 or fewer options per decision**; no memory bridge; progressive disclosure. 0-1 failures good, 2-3 moderate, 4+ critical. Nav 5 or fewer items; 1 primary + 1-2 secondary CTAs.

## 12. The 1-2-3 version switch (live-variant rules)
- Write an identity-lock sentence (real colour values, fonts, topology, surface, voice); all 3 versions read as the same brand.
- Each version takes a **different primary axis**: Hierarchy | Layout topology | Type system (same faces) | Colour strategy (existing tokens) | Density | Structural decomposition. "Three 'tighter density' variants = failure." A colour trio must not share theme + dominant hue.
- Motion options: cascade stagger / clip wipe / scale-and-focus / morph / parallax.
- **Applies here:** each version fully replaces the section, one visible at a time. The switch is a keyboard radiogroup with visible focus and 44px targets. Content is equivalent across versions; no CLS on switch; respects reduced motion.

## 13. polish + final-audit checklist
- **Triage order:** broken or inaccessible -> missing states -> flow/responsive drift -> visual/motion -> code cleanup.
- Every control has default, hover, focus, active, disabled, loading, error and success states. One icon family. No image shift. Remove debug code.
- **Final pass:**
  - Capture 1440, 390 and an intermediate width; the first viewport holds at 1280-1600.
  - Drive every state (open, hover, focus, error, empty, overlong) and look for overlap and clipping.
  - Settle entrance motion before capturing; capture full-page from the top.
  - Check zoom, contrast, focus, screen-reader names, console errors and CLS.
  - A first-time visitor knows what this is, why it matters and what to do within seconds.
