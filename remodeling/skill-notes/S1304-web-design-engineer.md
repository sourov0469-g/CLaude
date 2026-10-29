# Skill Pack Notes: web-design-engineer [S1304] (read in full, lines 1-4089)
Covers SKILL, README, 9 refs, recipe INDEX and all 25 recipes. The bar is **"stunning," not "functional."** Every pixel is intentional.

## 0. Workflow
- **Step 0, verify facts first.** Any named company means search, never memory.
- **Asset > Spec.** Recognition comes from logo > product imagery > color > type.
  - The logo is non-negotiable. If it can't be sourced, stop and ask.
  - Never use a CSS silhouette or hand-drawn SVG in place of real imagery.
  - List asset paths in `brand-spec.md`. HTML uses `<img src>` and never redraws assets.
- **Design Read** fields: artifact, audience, visual-language (a specific family, never "modern/clean"), mode (greenfield / extension / preserve / overhaul), and 5 dials scored 1-10: visual-variance, motion-intensity, information-density, asset-dependence, brand-fidelity.
  - Every dial must change a decision. The completion test: point from each dial to a visible consequence.
- **Four questions per section:**
  - narrative role (hero / transition / data / pull-quote / closing)
  - viewing distance
  - visual temperature
  - capacity check (sketch the thumbnail mentally)
- **Declare before code:**
  - Design Read + anchor/recipe
  - palette (primary / secondary / neutral / accent)
  - type (heading / body / code)
  - spacing (base + multiples)
  - radius strategy
  - shadow (elevation 1-5)
  - motion (easing / duration / trigger)
  - If using a recipe, paste its values in.
- Checkpoints: confirm system → v0 with `[image]` `[icon]` placeholders + assumptions → pause on non-trivial forks → full build. In an autonomous build, state the system and proceed.
- **Applies here:** Elbaz is a real firm, so the real logo and real project photos are mandatory. Starting dials (Creative studio preset): variance 8 / motion 7-8 / density 3 / assets 8 / fidelity 5-7. At assets ≥7, **inventory assets before layout**.

## 1. Direction from the subject's world
- Six schools: Info-arch, **Editorial/minimalist** (premium, quiet), Modern tool, **Motion/experimental** (launch, Awwwards, WebGL), Brutalist, **Warm humanist**. For Advisor mode, offer 3 from different rows, each with a named studio, why it fits, 3-4 cues and a touchstone. "You pick" → Editorial.
- **One recipe per page.** A remix only with a stated reason (e.g. "Aesop palette on Pentagram grid"). Never half-commit. Never add colors beyond the recipe. No "pop" touches. **Never fake the photography with CSS** (a real photo at 60% quality beats CSS at 0%). Announce any new recipe explicitly.
- Recipes that fit remodeling:
  - **aesop**: ground #E8E4D9/#F2EFE5, ink #1B1B1B, sage #7A8470, amber #7A4623 (one rule or seal), cream #F0EDE4. One transitional serif plus a UI sans. Body 16-18, LH 1.65. Small-caps labels 10-11px at 0.12em. Space 8/16/24/40/72/120. Radius 0, no shadow, ~450ms ease-out drawers, never spring. Product shot on chamois with one prop and a long shadow; asymmetric image-left layout. No bold weights.
  - **apple-hig**: #FFF/#1D1D1F/#F5F5F7/#86868B, accent #0071E3. Body 17, LH 1.47. Space 4/8/16/24/40/64/96/160 (sections 160+). Radius 12/18/22. Shadow max `0 1px 2px rgba(0,0,0,.04)`. Expo-out 350-650 layout, 150-250 hover. Slow Ken Burns. Hero object ~40% of the hero; text-link CTA; `#D2D2D7` hairlines; stat units in a lighter weight (`12.9″`). No card grids.
  - **dieter-rams-braun**: #E4E1DC/#F5F4F0, ink #191919, grays #A8A8A8/#5C5C5C. One functional accent, orange #E96A26 or #F5C518. Grotesk 400/500, never 700; mono numerals. Space 4/8/16/24/32/64/128. Radius 2-4, 80-120ms. **Exploded diagrams with measurement callouts**, a spec table as first-class layout, and "the page feels like equipment." Reads cold for hospitality.
  - **muji-kenya-hara**: #F4F2EC (never #FFF), ink #2A2A28, #7C7B76, hairline #D9D6CD. Sans 400 at +0.01-0.02em, LH 1.8. Space 8/16/32/48/96/160/**240**. Fades 600-900ms. 60-80% empty; labels like "01 — Cotton".
  - **monocle**: #F2EFE7/#1A1A1A, red #C7322E, olive #5E6347, rules #C8C2B0. Serif display. Red kickers 10-11px at 0.08em. Kicker → headline → dek. Lead photo cropped tight with the headline in the negative space. Numbered features.
  - **stripe-press**: bone #F1ECDE, #E6DCC4, ink #1A1A18, #736D5A, one foil accent (teal #1B4B5A or sienna #A04A2A, never both), hairline #C8BEA4. Body serif 18-19, LH 1.65. Radius 0. Objects carry `0 24px 48px rgba(0,0,0,.18)`. Crossfades 1-2s; **objects rotate ≤15° in 3D on hover**; Ken Burns ~20s. Raking light with an honest shadow, cloth texture at low opacity, every gray warm.
  - **active-theory**: black plus one hue, with neutrals tinted (warm amber cast for cinematic). Radius 0; light comes from WebGL, not CSS. **Scroll = camera path through a 3D scene**; physics/particles answer the cursor. Art-directed scene transitions instead of generic fades. **One payoff set-piece.** Avoid many small WebGL moments and **off-the-shelf Three.js demos** (hand-craft the scene). Skip it if perf or a11y rule WebGL out.
  - **resn-storytelling**: story told through 8-12 scroll triggers over ~90s. Each section is a film scene with its own art direction. Cursor-reactive surface materials. **A reward scene at the end.** Fewer, better beats.
  - **field-io**: generative type resolves on scroll, `cubic-bezier(0.83,0,0.17,1)`, 1-2 cursor-reactive moments max.
- **Applies here:** light-first Editorial (aesop / apple / muji materials) on Rams spec bones, with one Active-Theory set-piece (the orbit room) and Resn's scene-per-section plus end reward. Declare this remix and its reason in the system block.

## 2. Typography
- **Hard rule:** Inter, Roboto, Arial, Fraunces, system-ui (and **Instrument Serif** per failure-patterns) are never the identity-bearing display face.
- Non-default faces: Plus Jakarta Sans (modern heads), Outfit (elegant body), Space Grotesk (technical), Sora (premium), Newsreader (editorial), Caveat (handwritten), JetBrains Mono. Load Google Fonts with `&display=swap`.
- Color × font starters (only with zero context):

  | Direction | Color | Pairing |
  |---|---|---|
  | Modern tech | oklch(0.55 0.25 250) | Space Grotesk + Inter |
  | **Elegant editorial** | oklch(0.35 0.10 30) warm brown | Newsreader + Outfit |
  | **Premium** | oklch(0.20 0.02 250) near-black | Sora + Plus Jakarta Sans |
  | Lively | oklch(0.70 0.20 30) coral | Plus Jakarta Sans + Outfit |
  | Minimal | oklch(0.50 0.15 200) teal | Outfit + Space Grotesk |
  | **Artisan warmth** | oklch(0.55 0.15 80) caramel | Caveat + Newsreader |

  - Avoid Inter + Roboto + blue, and Fraunces + purple-pink.
- Scale: **h1:body = 4-6×** (minimum 2.5×; 16px body → 48-64px title). Body starts at 16-18px. Use `clamp()` and `text-wrap: pretty`. **≤2 families** (critique). Recipes lose 30-40% of their signature if the font is swapped.

## 3. Color, spacing, shape
- Brand colors come first. Derive extras in **oklch** and **never invent hues**. No rogue hues outside the declared system.
- Template: `--primary-h`; primary oklch(0.55 0.25 h); light (0.75 0.15 h); dark (0.35 0.2 h).
- Neutrals tinted to the hue: gray-50 oklch(.98 .002 h), 100 (.96 .004), 200 (.92 .006), 300 (.87 .008), 400 (.71 .01), 500 (.55 .014), 600 (.45 .014), 700 (.37 .014), 800 (.27 .014), 900 (.21 .014).
- ≤4 colors: 1 primary + 1 secondary + 1 accent + grays.
- 8pt spacing {8, 16, 24, 32, 48, 64, 96}. Whitespace ≥40% of the page (60% for minimal). One alignment (left); center only for hero or pull-quote.
- **Radius grammar by role** (no shape drift).
- Containers only when they mean something (no "cardification").

## 4. Imagery
- Placeholders over fakes:
  - icon → `[icon]`
  - image → a card labeled with its ratio ("16:9 image")
  - data → ask
  - logo → stop and ask
- **No SVG-drawn faces, scenes or objects.**
- No pills or captions on photos unless they identify, control or explain.
- Keep one "visual bible" so palette, lighting and material never drift between images.
- No fabricated stats, logos, badges or "used by" claims.
- Demo craft: slow Ken Burns (24s cycle) on the hero photo, film grain at low opacity, and a **`mix-blend-mode: difference` nav** that reads over both light and dark sections.
- **Applies here:** the floor plans are diagrams in Rams' exploded-view lineage, which is allowed. A drawn room "illustration" is not. Use the real B/A pairs; any missing asset gets an honest slot.

## 5. Motion and interaction
- Ladder: CSS covers 80% of the work → rAF → a timeline helper → Popmotion 11.0.5.
- "Avoid Framer Motion / GSAP / Lottie **unless explicitly requested**." The brief asks for scroll choreography, parallax and Three.js, which counts as a request. Load one engine plus Three.js, and keep **one easing library** across the page.
- Easing helpers: `easeOut = 1-(1-t)^3`; `spring = 1-e^(-6t)·cos(8t)`; `interpolate(t,from,to,ease)`, clamped.
- Motion-dial bands: 5-7 = sequenced reveals and restrained scroll; **8-10 = cinematic transitions, pinning, scrubbing, spatial storytelling**. High motion plus high density: animate transitions and focus, not every element. **Accessibility overrides the dials.**
- Failure patterns:
  - **Spectacle only:** if removing the animation loses nothing, remove it.
  - **No state updates per scroll or pointer frame:** use CSS, IntersectionObserver or motion values.
  - **Repeated spectacle:** no multiple marquees, pinned chapters, magnetic controls or competing ambient loops. **Pick one signature moment** and quiet the rest.
  - Reduced motion must keep content order and task completion.
- "Aim to stun" tools: proportion and whitespace rhythm; fills, texture, layering, blend modes; **novel interaction metaphors and thoughtful hover states**; SVG filters, `backdrop-filter`, `mix-blend-mode`, `mask`.
- **Never `scrollIntoView`**; use `window.scrollTo`.
- **Applies here:**
  - Custom cursor and hovers carry meaning: drag on B/A, orbit on the room.
  - One pinned chapter only.
  - Pause the Three.js and ambient loops offscreen; reduced motion gets a static frame.
  - Scroll text reveals use CSS or IntersectionObserver plus the engine, with no per-frame React state.

## 6. Variants and the 1·2·3 switch
- Variants exist to exhaust possibilities so the user can mix and match.
- Use **atomic variants across Layout, Visual, Interaction and Creative**. **v1 is safe within the system; later versions push toward daring.** Vary the dials, never just recolor.
- Prefer **one file + toggles over separate files**. Prototypes ship ≥3 variants.
- Tweaks panel spec:
  - fixed bottom 20 / right 20, width 280
  - `rgba(24,24,27,.95)` with `blur(12px)`, radius 12, padding 16
  - 13px white text, z-index 9999
  - shadow `0 20px 60px rgba(0,0,0,.3)`, border `1px rgba(255,255,255,.1)`
  - title "**Tweaks**"; **completely hidden when closed**
  - add 1-2 creative tweaks by default
- **Applies here:**
  - Each section's 1·2·3 swaps one atomic axis (layout / visual / interaction).
  - Controls look final, sit quietly, and are hidden or minimal at rest.
  - Optionally add a global Tweaks panel (theme, motion on/off, cursor on/off).

## 7. Single-file HTML deliverable
- Descriptive filename.
- Tokens as CSS custom properties. Grid + Flex. `@container` queries. `prefers-color-scheme` and `prefers-reduced-motion`.
- Copy assets locally; never hotlink. No Tailwind CDN or Lucide unless asked. Chart.js and D3 only when needed.
- Content: no filler. **Don't add sections unilaterally.** An empty-looking page is a layout problem, solved by composition.

## 8. Marketing failure patterns (check)
- Tiny uppercase eyebrow over every heading.
- **≥3 consecutive left/right zigzag splits.** Break them with a full-width proof, comparison, gallery or diagram.
- A centered hero + gradient + 2 CTAs without a reason.
- Inconsistent CTA labels; empty bento cells; split-header filler.
- Micro-label noise: fake coordinates, version numbers, status dots, section numbers that mean nothing.
- Copy-shaped decoration.
- An unreadable hero: CTA below the initial view, or clipped display type.

## 9. Self-review / QA
- **Pre-delivery checklist:**
  - facts verified; dials drove decisions
  - real logo and imagery, `brand-spec.md`
  - no broken paths or imports; responsive rules exist
  - hover / focus / active / disabled / loading states
  - no text overflow
  - **no rogue hues**
  - no `scrollIntoView`; no AI clichés (purple-pink gradients, emoji icons, left-border accent cards, Inter display)
  - no fabricated data
  - failure patterns checked
  - semantic naming; Dribbble/Behance-level polish
- **Critique** on 5 dimensions scored 0-10: Philosophy, Hierarchy (squint test), Craft (8pt grid, ≤4 colors, ≤2 fonts), Functionality (deletion test), Originality (≥1 "unexpected but right" decision).
  - Landing pages weight **Functionality + Hierarchy** first.
  - Format: Overall X.X; Keep; ≤7 Fixes by severity (Current / Why / Fix + values); 3 Quick Wins.
- **Browser acceptance only on an explicit request.**
  - Viewports: 390×844, 768×1024, 1280×720, 1440×900.
  - Checks: no console errors, assets load, no overflow, focus order, motion doesn't block, reduced motion works.
  - Never claim acceptance from code reading alone.

## 10. Conflicts with S1303 (resolve deliberately)
- **GSAP:** S1303 makes it the default; S1304 wants it only on request. The brief requests it, so use one engine.
- **Font families:** S1303 allows ≤3; S1304 critique says ≤2. Aim for 2.
- **Italic display:** monocle and stripe-press use it, but S1303 gate 38 bans italic headings. Keep heads roman; italic only in body or pull quotes.
- **Device frames:** S1304 provides templates; S1303 bans fake chrome. Don't use them.
- **Picker position:** S1303 says a bottom-center pill; S1304's Tweaks panel goes bottom-right, hidden when closed.
- **Spectacle:** S1304 says one signature moment, so build every instrument but escalate to a single payoff (the orbit room or the end reward).
