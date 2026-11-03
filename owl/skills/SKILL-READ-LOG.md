# Skill read log: Owl Roofing (each skill read IN FULL by its tag, in this session, by me)

Format: tag, name, when read, and the rules taken. Rules are stated in words so they can be checked against the work.

## Phase 1: brand recovery
- ⟦S0607⟧ brand-extract
  - **Method:** measure the live site, never guess. Frequency-rank the colour literals and resolve seven roles: background,
    surface, foreground, muted, border, accent, accent-secondary.
  - **What to save:** the real @font-face families and the weights actually used; every logo candidate (prefer the SVG
    wordmark); 6-8 large hero/cover images filtered by rendered size; voice from real headings.
  - **Anti-bot walls:** never bypass one. (owlroofing.com shows "Confirm you are human" to headless Chromium. I did not
    attempt it. I rendered the page source and assets fetched by plain HTTP instead, and say so in the gate report.)
  - **Proprietary fonts:** keep the real family name, name the closest Google font as the stand-in, and say "stand-in for".
  - Do not invent company facts.
- ⟦S0659⟧ anti-ai-slop (craft)
  - **Seven cardinal sins:** indigo accents; the two-stop trust gradient; emoji icons; the wrong display face; the rounded
    card with a coloured left border; invented metrics; filler copy.
  - **Soft tells:** the Hero→Features→Pricing→FAQ→CTA skeleton; placeholder image CDNs; more than 12 raw hex values outside
    :root; the accent used more than 2 times per screen.
  - **Soul:** 80% proven patterns + 20% distinctive choice: one bold move, voice, one memorable micro-interaction, one
    product-only detail.
  - **Identifiability test:** someone outside the project can tell whose site a screenshot is.
- ⟦S0660⟧ color (craft)
  - **Four layers by pixel share:** neutrals 70-90%, ONE accent 5-10%, semantic 0-5%, effect under 1%.
  - At most 2 visible accent uses per screen; links and focus rings count as accent.
  - **Contrast gates:** 4.5 body, 3 large text, 3 UI.
  - Darken the accent for text use and keep the bright variant for fills.
  - **Naming:** tokens named by purpose. No decorative gradients.
- ⟦S0444⟧ company-logos
  - Logos monochrome by default; brand colour only where recognition matters.
  - Never mix filled, outline and wordmark styles in one row.
  - Never hotlink random logo assets. (Owl's logo is taken from Owl's own source and saved locally.)
- ⟦S1418⟧ color-system
  - Full tonal scales, not swatches. Semantic colours each get background, foreground, border and icon variants.
  - Test EVERY foreground/background pair. Never use colour alone for meaning. Simulate colour blindness.
- ⟦S0001⟧ frontend-design
  - The hero opens with the most characteristic thing in the subject's world.
  - **Two-pass method:** plan the tokens (4-6 named hex, type roles, layout concept, principles), review the plan against
    the brief for genericness, then build.
  - **AI clusters to avoid:**
    - a cream ground + serif display + terracotta accent;
    - near-black + one acid accent;
    - a broadsheet with hairline rules;
    - the SaaS card kit;
    - template chrome: tracked ALL-CAPS eyebrows, middle-dot meta strings, mono data labels, → on links.
  - **Type and structure:** one accent word in a headline and all-caps labels are tells. Numbered markers only for real
    sequences. Lines under 80 characters.
  - **Motion:** one orchestrated moment beats scattered fades.
  - **Restraint:** spend boldness in one place, then remove one accessory before shipping.
  - **Note for Owl:** the live site already sits close to cluster 1 (cream ground) and uses tracked ALL-CAPS eyebrows
    ("THE TWIN CITIES TRUSTED ROOFING COMPANY", "OUR SERVICES", "COMPANY PROMISE"). The kept colours stay; the template
    chrome goes.
- ⟦S0011⟧ brand: main text, logo-usage-rules.md and color-palette-management.md
  - **Logo variants:** full colour on light; reversed on dark.
  - **Clear space:** x = the mark's height.
  - **Minimum sizes:** full logo 120px, icon 24/32px. Header 120-200px wide, footer 100-150px.
  - **Approved grounds:** white, light, brand primary (reversed), dark #333+ (reversed); on photography, ensure contrast.
  - **Absolute don'ts:** stretch, rotate, shadow, gradient, unapproved colour, outline, busy ground, crop, rearrange, add
    elements.
  - **Colour ratios:** primary 60-70%, secondary 20-30%, accent 5-10%, off-brand at most 20%. No pure #000 text. Test
    every combination. Never colour-only meaning.

## Phase 1b: design directions
- ⟦S0330⟧ explore-design
  - **One HTML file** with several directions side by side.
  - **Variants explore STRUCTURE, not identity:** every variant wears the captured brand.
  - **Distinctness:** each variant gets a distinct one-sentence thesis and names its tradeoff out loud.
  - **Fixtures:** real copy; the same fixtures in every variant.
  - **Output:** a decision row ("if you want X, pick A").
  - **Style:** no dark "AI artifact" chrome; scoped CSS per variant.
- ⟦S1474⟧ parallel-concepts
  - Concepts differ in what the user DOES: sequence, unit of interaction, division of labour, entry point, commitment
    point.
  - Write the question the set answers first.
  - Comparable fidelity; no strawmen; the visual language held constant.
- ⟦S1472⟧ concept-selection
  - Criteria are written BEFORE comparing, each marked threshold or trade-off.
  - Evidence over volume.
  - Name what the winner costs.
  - Never graft losers onto the winner.
  - For each rejected concept, record what it tested, what it lost on, and what would bring it back.
- ⟦S0642⟧ reference-design-contract
  - Every reference is split into Keep / Change / Do not copy.
  - Claims are traceable; inferences labelled.
  - One coherent stance, not a menu.
  - Anti-patterns are exact.

## Phase 2: identity asset board (read in full before building)
Skills picked for this phase, and why:
- **Picked:** the pack entries that define Phase 2's deliverables (icons, type scale, spacing, tokens, motion,
  backgrounds, illustration, brand consistency, cursor, SVG animation, drawn-character motion, design dials).
- **Not re-read:** colour skills (⟦S0660⟧, ⟦S1418⟧); they were read in full in Phase 1a and still govern.
- **Not picked:** ⟦S0071⟧, ⟦S0248⟧, ⟦S0609⟧, ⟦S0112⟧ and ⟦S1372⟧. They are not needed for Phase 2:
  - Colour and contrast are already governed by the 1a reads.
  - A dither background is not in this identity.

**Rules taken:**
- ⟦S1463⟧ icon-system
  - **Grid and sizes:** a 24px base grid with keylines; sizes XS 12-16, S 20, M 24, L 32, XL 48+.
  - **Style:** one style (stroke).
  - **Naming:** `icon-[category]-[name]-[variant]`.
  - **Accessibility:** every icon labelled or aria-hidden; paired with text for critical actions; 44px touch targets.
  - **Maintenance:** remove unused icons.
- ⟦S1433⟧ typography-scale
  - **Scale:** a ratio-based scale; 4-5 sizes in regular use; body at least 16px.
  - **Line heights:** 1.2 headings, 1.5 body.
  - **Tracking:** -0.02em on large headings, +0.05em on uppercase labels.
  - **Measure:** 45-75 characters.
- ⟦S1432⟧ spacing-system
  - **Scale:** one base-unit scale and never arbitrary values.
  - **Spacing types:** inset, stack, inline and gap, named by type.
  - **Grouping:** related items take smaller steps; distinct sections take larger ones.
  - **Intent:** documented, not just values.
- ⟦S1436⟧ animation-principles
  - **Easing:** ease-out to enter, ease-in to exit, ease-in-out to move; linear only for continuous motion.
  - **Durations:** micro 50-100, short 150-250, medium 250-400, long 400-700ms.
  - **Stagger:** 30-50ms, with total sequences under 700ms.
  - **Interruptible:** every animation can be cancelled; reduced motion is supported.
- ⟦S1461⟧ design-token
  - **Three tiers:** global → alias (semantic) → component.
  - **Naming:** `{category}-{property}-{variant}-{state}`.
  - Components never reference raw values. Each token is documented with its usage.
- ⟦S1421⟧ illustration-style
  - **Definition axes:** geometric vs organic, flat vs dimensional, level of detail, line style.
  - **Colour:** a subset of the product palette.
  - **Use rules:** when to use illustration and when not.
  - **Accessibility:** never convey information through illustration alone.
- ⟦S1496⟧ critique-brand-consistency
  - **Brand files:** mood, voice and tokens files must exist; with no file, a dimension is not checkable.
  - **Token compliance:** list hardcoded values.
  - **Ratings:** pass / minor / major per dimension.
- ⟦S1364⟧ atmosphere-background
  - **Structure:** a layered background of overlapping bands, never a flat gradient.
  - **Focal point:** one focal glow placed toward an edge or corner.
  - **Motion:** a slow, meditative drift with no flicker.
  - **Colour and performance:** tint from the brand's colour; pause when hidden; cap the device pixel ratio.
  - **Fallback:** content stays readable without the effect.
- ⟦S0546⟧ oversized-cursor (adapted to a live site)
  - **Hotspot and press:** the hotspot is the tip, and press scaling pivots on it. The asymmetric tap is 0.84 over 0.1s
    in, then back to 1 over 0.22s out.
  - **Reactions:** every click causes something in the same frame; the target's reaction is a separate, parallel tween.
  - **Behaviour around action:** the cursor drifts aside during beats it does not own; it never wobbles idly or freezes
    on top of the action.
  - **Brand motif:** use a brand-motif cursor only when the motif is legible.
- ⟦S0407⟧ svg-animation
  - **Draw-on:** dashoffset with `pathLength="1"`.
  - **Morphs:** need identical command structure.
  - **Motion along a path:** use offset-path or GSAP MotionPath.
  - **Markup:** inline the SVG (not `<img>`) so it can be animated; keep the viewBox; use no fixed width or height.
  - **Reduced motion:** keep a static final state.
  - **Verification:** freeze frames (`?t=`) and check the start, middle and end.
- ⟦S0489⟧ rossark-motion (the owl's eyes, the companion, the logo moment)
  - **No snapping:** never teleport; interpolate everything. Calm, with small amplitudes.
  - **Pivots and phase:** arcs and pivots; overlap by delay, not by springs; seeded variety, never everything in sync.
  - **Blinks:** close in about 110ms, hold 30-50ms, reopen in about 190ms with ease-out.
  - **Glances:** glide in about 500ms and hold for at least 1s.
  - **Curves:** travel `cubic-bezier(.77,0,.175,1)`; arrive/open `(.23,1,.32,1)`; ease-in only for things falling away.
  - **The logo:** plays once on appear, then rests; no endless loops on UI chrome.
  - **Presses:** a 0.97 scale on the button, not inside the drawing.
  - **Reduced motion means still:** frame 0 must be a good drawing. Nothing runs unseen.
  - **Frequency decides amount:** frequent paths stay quiet.
- ⟦S0195⟧ motion-foundations
  - **Purpose:** motion must guide attention, communicate state or preserve continuity, or it is removed.
  - **Tokens:** every duration and easing comes from tokens (instant/fast/normal/slow/crawl).
  - **Properties:** animate transform and opacity only.
  - **Reduced motion:** disables transforms; opacity fades of 0.2s or less are the only fallback.
  - **Low-end devices:** drop non-essential motion.
- ⟦S0651⟧ taste-skill-v1 (the dials)
  - **Dials as numbers:** DESIGN_VARIANCE, MOTION_INTENSITY and VISUAL_DENSITY.
  - **Layout:** asymmetric layouts above 768px fall back to a strict single column below it; `min-h:100dvh`, never
    `h-screen`.
  - **Colour:** one accent; no pure black; no 3-equal-card row; no filler words; no fake numbers.
  - **Overridden by the owner's rules:** its font picks and its "no custom cursors" line. The owner requires everyday
    fonts and an SVG cursor companion.

## Phase 3a: page plan, storyboards, flow map (read in full)
- ⟦S1411⟧ information-architecture
  - **Build from tasks inward**, not from the homepage outward.
  - **Navigation:** global, local, utility and contextual navigation are kept distinct.
  - **Findability:** any item in under 3 clicks; at most 3 levels; labels in the user's own words.
  - **No dead ends.**
- ⟦S1398⟧ journey-map
  - **Stages:** 5-7, from awareness to advocacy.
  - **Per stage:** goals, actions, touchpoints, thoughts, emotion, pain, opportunity.
  - **Overall:** an emotional curve; moments of truth.
- ⟦S1450⟧ navigation-patterns
  - **Top nav:** suits 4-7 destinations on a marketing site.
  - **Hamburger:** reserved for constrained screens, never primary on desktop.
  - **Active state:** shown by more than colour.
  - **Thumb reach on mobile:** the call bar.
  - **Maximum destinations:** 7.
- ⟦S1452⟧ peak-end-rule
  - **Design two moments deliberately:** the peak and the end.
  - **Never end on process;** end on accomplishment.
  - **Negative peaks:** design the recovery.
- ⟦S1454⟧ serial-position-effect
  - **Position:** critical items go first or last, never in the middle (positions 3-5 of 7).
  - **In a set of three:** the primary CTA is first or last.
  - **Summaries:** repeat key items at the end.
- ⟦S0633⟧ motion-design
  - **Beat map:** time → takeaway → focal object → transformation → copy → exit.
  - **Motif:** one recurring motif carries the beats.
  - **Art direction first:** resolve one representative frame before adding motion.
  - **Hierarchy of motion:** a lead action, then secondary and ambient motion only when needed.
  - **Continuity:** preserve velocity and direction at hand-offs.
  - **Rhythm:** alternate action and rest; the strongest transformation goes on the central idea.
  - **Deterministic:** motion is a function of t or p, so seeking works.
  - **Honesty:** do not invent claims.

## Muse correction (GATE-area, GATE-price, GATE-reviews): skills read in full, by tag, for the WEB-SKILLS evidence
These skills were read after the three sections were built, so the gates cite them retrospectively. Each gate also
checks the built section against the rules and records any rule it does not meet.

- ⟦S1428⟧ layout-grid
  - Columns, gutters and margins; card grids auto-fill.
  - Asymmetric (sidebar + main) is a valid pattern.
  - Align to the grid; test at every breakpoint.
- ⟦S1426⟧ law-of-proximity
  - Within-group spacing must be smaller than between-group spacing.
  - Label tight to its input; never use a border where spacing works.
- ⟦S1423⟧ law-of-common-region
  - A shared background or border groups items.
  - Use the weakest container that works; limit nesting to 2 levels.
- ⟦S1453⟧ search-ux
  - **Placeholder:** says what can be searched.
  - **Clear/reset:** a button once there is a query.
  - **Matching:** highlight the query in results; show a result count; tolerate typos, synonyms and partial matches;
    keep the query in the field.
  - **Zero results:** confirm what was searched, suggest alternatives, never leave a blank.
- ⟦S1440⟧ feedback-patterns
  - Acknowledge every action.
  - Inline feedback closest to the action is preferred; not colour-only.
- ⟦S1439⟧ error-handling-ux
  - Prevent errors: inline validation, smart defaults.
  - Write in human language: what happened and what to do; place the message near the source.
  - Preserve input; offer an alternative path; never blame.
- ⟦S1442⟧ form-design
  - **Layout and labels:** single column; top-aligned labels; radios for 5 or fewer options.
  - **Validation:** validate on blur, not on every keystroke; put the error below the field.
  - **Accessibility:** `aria-describedby`; default to the most common answer; field width hints at input length.
- ⟦S1420⟧ data-visualization
  - Simplest encoding; label directly; provide context.
  - Never rely on the graphic alone; provide a text alternative.
- ⟦S1444⟧ hicks-law
  - Fewer simultaneous choices; group before cutting.
  - Smart defaults skip a choice.
- ⟦S1441⟧ fitts-law
  - Touch targets of 44-48 at least.
  - Primary CTA large and in thumb reach; place actions near their content.
- ⟦S0280⟧ core-web-vitals
  - LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75.
  - Measure before claiming; without field data, claim no field improvement.
  - CLS: give dimensions or aspect-ratio to images.
- ⟦S0054⟧ fixing-accessibility
  - **Names:** every control has an accessible name; icon-only controls get `aria-label`; decorative images get empty
    alt.
  - **Errors:** `aria-describedby`, `aria-invalid` and `aria-live` for errors.
  - **Focus:** restore focus sensibly.
  - **Media:** captions for videos with speech; no autoplay with sound.

## Inner pages (read in full before building the Services page)
- ⟦S0449⟧ landing-page
  - **One intent per page.**
  - **Above the fold:** headline (outcome + audience), subheadline, primary CTA (verb + what you get), one proof
    signal, hero visual.
  - **The argument:** problem → solution, benefits, how it works (3 steps), proof.
  - **Objections:** FAQ and risk reversal.
  - **Close:** a final CTA the same as the top.
  - **Copy:** proof next to the claim it supports; specificity over vague value; no "Learn more" CTAs; avoid competing
    CTAs above the fold.
- ⟦S0076⟧ better-writing
  - **Voice and vocabulary:** one voice, one vocabulary (the inventory first); address the reader as "you"; plain words.
  - **Buttons and links:** verb-first buttons; links that name their destination (never two identical "Learn more"
    links).
  - **Errors and empty states:** errors say how to fix, beside the field; empty states point forward.
  - **Placeholders:** show a realistic example.
  - **Mechanics:** one capitalisation policy; no "successfully" and no "please"; no "Oops".

## Storm damage page (read in full by tag before building, except where marked)
- ⟦S0618⟧ open-design/faq-page
  - **Structure:** header, search, 3-4 category pills, accordion (`<details>`/`<summary>` or ARIA), "Still have
    questions?" CTA.
  - **Content:** 12-18 real entries; **with fewer than 8, ask for more content**; with 1-5, no categories or search.
    Answers 2-4 sentences; questions specific, never placeholders.
  - **Applied:** Owl's FAQ text is not in hand, so no FAQ was built on the Storm page rather than inventing answers
    (recorded in GATE-hail-call).
- ⟦S1325⟧ scroll-progress-timeline
  - **Structure first:** an ordered list with real headings; the line and dots only enhance it.
  - **The line:** a quiet base plus one fill (`transform-origin: top`), measured from the first point centre to the
    last; one normalised value as `scaleY` in a single rAF; a step is active when the head crosses its centre;
    re-measure after fonts, images, resize and content changes.
  - **Layout:** a left rail for long copy; collapse to a left rail on phones; pinned chapters only when each step has a
    distinct visual state, and the pin is finite.
  - **State and navigation:** inactive steps stay readable; `aria-current="step"` without a live region; never move
    focus on passive scroll; a decorative dot is never the only control; `scroll-margin` under a sticky header.
  - **Reduced motion:** the full line or reached states, no scrub, no pin.
- ⟦S1424⟧ law-of-continuity
  - The eye follows unbroken paths: a connecting line turns items into a sequence; arrows extend the path.
  - Interrupted continuity (a larger gap, a divider) signals a new group; alignment breaks read as boundaries or errors.
  - Decide the reading path (enter, travel, land) before placing elements; audit alignment at every breakpoint.

## Read at the Storm page audit, AFTER building (honest record)
These three were cited as evidence without having been logged: ⟦S0070⟧ and ⟦S0400⟧ in GATE-game (accepted earlier)
and all three in the first draft of the Storm gates. I read each in full now, by tag, and checked the built work
against it. The rule stands: read before building.
- ⟦S0070⟧ better-accessibility
  - **Findings cite WCAG 2.2 A/AA by number**; the 44/40px targets and the one-h1 outline are recommendations.
  - **Native first:** `<button>` for actions, `<a href>` for navigation; a role is a promise of the full key map.
  - **Focus:** `:focus-visible` rings at 3:1; never hidden under sticky chrome (2.4.11); roving tabindex in composite
    widgets; positive tabindex never; route changes move focus to `<main>` or the h1.
  - **Targets:** 24×24 minimum (2.5.8), aim 44/40; decorative layers get `pointer-events:none`; every drag has a
    single-pointer alternative (2.5.7).
  - **Names:** icon-only controls get a name; visible label text is in the name (2.5.3); `aria-hidden` never on a
    focusable element (hiding something interactive means removing it from the tab order too).
  - **Tabs (APG):** arrows move and wrap, Home/End, Tab exits to the panel.
  - **Motion:** opt-in; replace slides with fades under reduced motion; anything moving over 5s on its own has a pause
    (2.2.2). **Reflow** at 320px and 200% text.
  - **Applied to the Storm page:** the Wise Check tab panels hold no focusable content, so each now takes
    `tabindex="0"` (Tab exits to the panel). The drawing's spots are `aria-hidden` *and* out of the tab order. All
    other checks held (names, roles, targets ≥44px, no positive tabindex, decorative SVG hidden, no pointer-swallowing
    layers).
- ⟦S0400⟧ iart-ai/accessible-animation
  - **Tier, do not nuke:** Tier 1 remove (parallax, large slides, pinned scroll scenes, spin); Tier 2 soften to short
    fades (≤200ms); Tier 3 keep (opacity and colour transitions, focus rings, progress).
  - **JS motion** is gated with `matchMedia`; listen for live changes; use `0.01ms`, not `0s`, in global nets.
  - **Verify both paths** with the preference emulated; auto-motion over 5s keeps a pause control.
  - **Applied:** Storm page pins are Tier 1 and are removed under reduced motion (V2 respond is static); drawings start
    at their final state; the Wise Check and weather swaps are Tier 3 opacity changes. Verified with
    `stormrm.mjs` (reduced-motion emulation, 6/6).
- ⟦S1449⟧ millers-law
  - Working memory holds about 4±1 meaningful chunks; chunking is the strategy, not "7 items".
  - Group menus, forms and steps into 3-5 named chunks; make the chunks explicit with headings, space and dividers.
  - **Applied:** three principles, four claim steps, three Wise Check parts, three guarantee facts, four chapters.

## Protect Your Nest page (read in full by tag BEFORE building)
- ⟦S1434⟧ visual-hierarchy
  - Size (at least 1.5× steps), weight, contrast, spacing and position set the order the eye lands in.
  - Four levels: primary (title, one CTA), secondary (section heads), tertiary (support), quaternary (fine print).
  - One primary action per view; squint test; do not let elements compete.
- ⟦S1435⟧ von-restorff-effect
  - The one element that differs is remembered; it works only if neighbours are consistent and few items deviate.
  - Decide the single most important element per section; never decorative pops; pair colour with shape, size or
    weight so it survives greyscale.
- ⟦S1457⟧ zeigarnik-effect
  - Unfinished tasks stay active; a finite, named set of steps with visible progress pulls toward completion.
  - Checklists make open loops explicit; surface one or two at a time; always give a clear path to completion; use
    incompleteness honestly, never as guilt.
