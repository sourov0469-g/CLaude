# G2 notes: S0006 impeccable

Source: WEB-SKILLS_2.md, lines 2353-7560 (SKILL.md plus 37 reference files). Quoted values are verbatim. Tooling commands (`impeccable context`, `detect`, `live-*`, `build-phase`, `comp-spec`, `serve-question` and so on) are recorded only as workflow structure. They are not to be run.

## S0006 impeccable

### Core (SKILL.md)
- Stance: "Work as an award-winning design director would: production-grade code, a clear POV, a deep grasp of what the client and its users need, and exceptional craft."
- Principles: "Finish the job. No hedging, no shortcuts." Scale ambition to mode: "Persuade and Experience get full commitment: bold, distinct work with a point of view." "Verify by looking at the rendered result at the sizes it ships at, and batch the checks: fix what one look shows before looking again."
- Order of work: load the playbook, inspect the current visual truth, settle analysis and direction, then read craft-floor "immediately before any UI edit, including small refinements".
- How to design:
  - "The brief wins." Honor pinned aesthetics, eras, materials, fonts and palettes. "Redirecting a clear brief toward your taste is failure."
  - "Refinement preserves; redesign replaces." A redesign keeps product truth, content, function, native affordances and constraints, "but treats the old look as evidence and anti-reference… Never split the difference into polish on the discarded look." Ask before replacing factual copy or adding claims.
  - Loaded symbols (militarist, supremacist or hate emblems) never appear as motifs.
  - "Visual authority is evidence, not a filename."
- Modes (choose from the surface, not the product):
  - **Persuade**: "the visitor decides and acts; design is the product. Landing pages, marketing… Earn attention and action. Ship real imagery when the brief needs it; follow the committed world, not category habit."
  - **Operate**: task UI.
  - **Read**: docs.
  - **Experience**: portfolios; "the artifact leads from the first viewport".
- The 24 commands:
  - Build: craft (deprecated), shape, init, document, extract.
  - Evaluate: critique, audit.
  - Refine: polish, bolder, quieter, distill, harden, onboard.
  - Enhance: animate, colorize, typeset, layout, delight, overdrive.
  - Fix: clarify, adapt, optimize.
  - Iterate: live, generate.
  - Most commands end with a hand-off to `/impeccable polish`.

### Craft floor (quality floor and bans; apply to every UI edit)
"A pinned brief or the committed visual world overrides anything here except a line marked as a ban."

**Verify** (run all of these in one batched look at the render):
- **Contrast**: "body and placeholder text ≥4.5:1, large text ≥3:1. On colored surfaces tint secondary text from that hue or the foreground; never gray."
- **Depth**: "shadows carry an offset and a soft blur. A zero-offset colored halo is decoration."
- **Spacing**: "tight groups, generous separation, more space above a heading than below it." Read the computed values.
- **Type**: "body measure 65–75ch, display max 6rem, tracking floor -0.04em, balanced headings, obvious scale and weight steps. Run the real copy at every breakpoint and fix what overflows."
- **Motion**: "one authored moment, not scattered effects and not one identical entrance on every section. Exponential ease-out from an already-visible default. Reach past transform and opacity: blur, backdrop-filter, clip-path, mask, and shadow belong to the palette when they stay smooth."
- **States**: hover, disabled, loading, error, empty, plus real content, working controls, responsive composition and keyboard focus.
- **Browser surfaces**: "Text selection, the caret, custom scrollbars, focus rings, underline offset, and the numerals in tabular data… Theme them from the palette… the one models skip most reliably."
- **Copy**: the product's own language. Controls name their action; errors name the problem and the recovery.
- **Coverage**: "every brief requirement present and findable within seconds."

**Refuse** (category defaults; the brief's own words can earn them, except where marked as a ban):
- Page scaffolds:
  - Same-size cards of icon + heading + text as the page structure. "nested cards are always wrong."
  - "The hero-metric template: big number, small label, supporting stats, accent."
  - **BAN**: "A kicker or eyebrow above a heading… no brief earns it back."
  - Section numbers (01 / 02 / 03), unless the sequence itself carries information.
  - A modal for a task that needs neither interruption nor protected focus.
- Surface habits:
  - Gradient text. Emphasis comes from weight or size.
  - Glass and blur as decoration.
  - A colored `border-left` or `border-right` above 1px on cards, list items, callouts or alerts.
  - Hard offset shadows (`box-shadow: 4px 4px 0`) outside a world that is actually neobrutalist.
  - Sparklines, progress rings or soft rounded rectangles standing in for content.
  - Monospace as a costume.
  - A system display face (Impact, Arial Black, the platform sans) as the display voice. "Source and self-host a face… the closest installed font is a failure, not a fallback."
  - Unicode glyphs or emoji as icons. "Icons are drawn… in one consistent stroke and weight."
  - "Geometric masks standing in for organic contours… Derive an alpha matte from the actual image, or produce a cut-out asset."
  - Light or dark picked by category. "Pick it from the use scene: who, where, under what ambient light."
- "when torn between refined and committed, commit."

### New work and redesign (new-work.md)
1. **Decide what is true.** For a redesign, preserve product truth, content, function, constraints and brand commitments, and replace the old visual world: "The old look is evidence of what the subject is, not authority over what it becomes."
2. **Ask** two or three questions, using the structured tool. Persuade asks: "who must act, what they should believe, which real proof, content, or assets earn that belief." Also ask what success looks like, what must stay untouched, and "what would make a polished result feel wrong." Never ask for CSS values or canned aesthetic lanes.
3. **Create or replace the visual world:**
   - Name the unique mechanism in one sentence, plus the audience's real scene, its cultural home and what the first surface must prove.
   - Note "the page this category always ships and its predictable opposite"; both are the rut.
   - A brief that paints its own picture (a product name, a metaphor) adds its literal reading to the rut: "spend at most one candidate on it."
   - List 7 concrete visual systems, artifacts, places or rituals from the audience's world, ordered by resonance, each with one line on why it resonates and one on how it looks (ground and main colours, type voices, one signature).
   - On Persuade, the audience's own tools and instruments count toward the rut: at most 1 candidate. Ask what the thing looks like as a physical object, and what its world looked like before the web.
   - "When more than three of the seven share one material family… dig until the list spans at least three families."
   - Challengers: fuse each one (the form comes from the challenger, every fact from the product), then judge on two axes, audience identification and product clarity. Verdicts are wins, competitive or declined.
   - A declined challenger still donates one discipline ("a palette's total commitment, a grid's density courage"), never its clothes. Each raise is written as a named line.
   - Present one fully committed direction: world, first viewport, visitor path, signature interaction, cross-surface reach, honest risk.
   - Re-roll registers: plain, safer, bolder. There is a standing exit (the category standard played straight), but never recommend it.
   - "Truth binds claims, not demonstrations": prices, customers, benchmarks and capabilities stay uninventable.
4. **Commit the world.**
   - Colour strategy first:
     - Restrained: tinted neutrals plus one accent.
     - **Committed**: "one saturated color carries 30-60% of the surface".
     - Full palette: 3-4 named roles.
     - **Drenched**: "the surface IS the color".
   - "Persuade and Experience surfaces have permission for the bolder strategies." "Color commits at page scale: fields that own whole regions, not accents scattered over a neutral ground."
   - Dark or light: "write one sentence of physical scene (who uses this, where, under what light) and let it force the answer."
   - Faces: Persuade "want faces with a point of view". **Overused (you stopped looking):** Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans. Using one needs a reason no other face could satisfy; "a subject association is never that reason."
   - **AI-look clusters** (fail when the brief leaves the aesthetic free):
     - "warm cream ground, high-contrast serif display, and a terracotta or signal-red accent";
     - "near-black with one neon accent and glowing edges";
     - "broadsheet-editorial hairlines, italic display serif, and small tracked mono labels";
     - "flat saturated ink with black boxes, hard offset shadows, and heavy condensed display type".
   - Test: "if someone could guess your aesthetic from the category alone, or from category-plus-avoidance, rework." "Energy is not the enemy of trust."
   - **Rendition prior**: "warm, bookish, family, and child-facing subjects come out as cream grounds, serif display with italic accents, and lamplight… Treat that first palette as already spent." If OWN-WORLD says cream, paper, parchment, ivory or lamplight on an unpinned Persuade surface, rework it from saturated materials.
5. **Direction contract**, written before code: six blocks, about 150 words.
   - THESIS: the one idea, and the category default it refuses.
   - OWN-WORLD: palette and component language, recognizable with the content removed.
   - STORY: what the visitor understands, believes and does.
   - FIRST VIEWPORT: the exact composition, scales, where the primary action sits.
   - FORM: the chosen form and its rank (plus seed reference).
   - FINISH, verbatim: "unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance".
   - "If a block reads like a mood, the direction is not decided yet."
   - **Never copy the contract into source or any browser-delivered artifact**: no HTML comments, hidden DOM, `data-*`, metadata or JSON-LD.
6. **Build with full commitment.** "Build the assigned direction, not a safer interpretation of it… Commit every atom: nav, buttons, inputs, and links are rebuilt in the form's vocabulary; a stock component inside a committed form is a lapse." "In unattended work, the safe rendition is the known risk."
   - Comp-led phases: comps → spec → plates → hero → sections → motion → responsive.
     - Hero gate passes at **72%** overall with no hard veto.
     - After 3 failed hero attempts, go to the first-viewport review.
     - Responsive: check the first viewport "at common desktop widths (1280 to 1600)", capture `desktop.png` 1440 wide and `mobile.png` 390 wide, and keep "sizes in proportion to the viewport rather than px floors."
     - Plates must be ≥1.5x the region size. "A single-file deliverable changes nothing here: the plate is produced the same way and inlined as a data URI."
     - Inline SVG past an icon's budget (icon size is "under 64px, a few paths") is refused as an illustration.
     - "Anything not in the spec does not exist on the page."
   - Code-led: the ambition lives in the FIRST VIEWPORT block plus a named signature interaction and motion grammar, audited in behavior.
   - Both paths:
     - "**The first viewport is a thesis, not a header.** Demonstrate the mechanism immediately… The memory test: if someone left after one viewport, what would they describe an hour later? If the honest answer is a mood, the concept has not committed yet."
     - "**Prove, don't claim.** Show the subject doing its job."
     - "**Author the assets; never substitute chrome.** Gradients, glass, generic icon tiles, and many-vertex `clip-path` polygons where an authored asset belongs are the gap wearing chrome."
     - Build the form's web leverage: the real technique, not a static imitation.
     - "**Pace the scroll like a studio.** Vary density, scale, image, motion, and quiet inside one grammar; a dense passage earns a quiet one, and the page ends anchored by a real close. One spacing rhythm throughout."
     - "**Use real, verified imagery**… one decisive photo beats five mediocre ones."
     - "**Author motion as material.** Give the page the form's native motion once, orchestrated, rather than scattered hover effects. Bound expensive effects and keep content visible by default."
7. **Inspect and finish.**
   - One batched round at desktop and mobile, plus the user's actual width when known. Drive every interaction and state (open, closed, hover, focus, error, empty, overlong content) for overlap and clipping.
   - "two rounds is the ceiling".
   - Capture validity: "Settle or disable entrance motion first: an element hidden by animation timing reads as a missing element". Capture full page from the document top and open every file.
   - Persuade check: "a first-time visitor should know what this is, why it matters, and what to do within seconds".
   - Fresh finish reviewer (no inherited transcript). Dispositions: recapture, rebuild, ship, fix. The fix budget is 2 rounds; stop when a round resolves nothing.
   - Every raster carries provenance: an embedded prompt, or its origin if sourced or stock.
   - DESIGN.md is written at the finish, from the built world.

### Persuade mode rules (mode-persuade.md)
- "the opening must make the offer intelligible and desirable, expose a clear action, and demonstrate something only this product can prove. The action is the one the category's visitors came to take, in its working form… A decorative link pointing at it elsewhere does not count."
- "Conversion lives inside the form's own vocabulary: a hook that lands in one line, a visible primary action, a legible reading order."
- The world is "the carrier of the page, never a picture of it". Material coverage is wanted ("a world reduced to an accent on a neutral template is the category default with a sticker on it").
- Both ends fail: "the painted poster, and the generic product page (a headline over subcopy and a button, a row of equal cards below)". "A split hero… or a centred headline over a row of cards is the template whatever world paints it."
- The page's parts still work: navigation reads as links, text reads against what is behind it, "the sections keep a steady vertical rhythm, the primary action is unmistakable, and the section below starts as a section rather than more painting."
- An object world is one object, seen once, at one scale.
- Comps 2 and 3 "go further than the first, never cleaner".

### Visualize (comps)
- "Three is the number: one comp invites rubber-stamping."
- Comp prompts run 150-300 words.
- Judge each comp as the shipped screen: the visitor's job must be readable from the image alone.
- "Commitment is depth, not performance spread across regions. The world enters through one dominant move… A second element competing with the lead at the same scale is the comp shouting… Busy is louder, not bolder."
- With one committed direction, vary what leads, topology, sequence, density, hierarchy, focal composition or interaction framing.
- After approval, the comp is a spec: "keeping the palette and mood while redrawing the topology is a second art direction"; "Do not rasterize core UI text or controls."
- Photos, figures and textures ship as rasters. Text, controls and anything that moves are semantic.

### Animate (motion thesis)
- Visitor mode: Persuade/Experience "motion may carry the voice. Prefer one rehearsed focal sequence to repeated section reveals."
- Find the job. Motion is justified only to:
  - acknowledge an action;
  - make a state change or spatial relationship legible;
  - preserve continuity;
  - direct attention at a meaningful moment;
  - embody the visual world.
  "Do not animate a static area merely because it exists."
- **Motion thesis** (write it before implementation):
  - Focal moment: the one sequence that deserves authorship.
  - Continuity: the state, layout or navigation changes that need explanation.
  - Feedback: the controls and outcomes that need acknowledgment.
  - Budget: which effects are expensive and how often they run.
  - "A generic fade-and-rise, hover lift, parallax layer, or scroll reveal is not a thesis."
- Material by meaning:
  - Continuity: shared element, FLIP, view transitions.
  - Focus and depth: bounded blur, filter, backdrop, light, shadow.
  - Reveal: masks, clip paths, cropping, occlusion.
  - Energy: colour, gradient position, texture, distortion, shaders.
  - State: the smallest change that makes cause and result unmistakable.
  - "Do not stack techniques for spectacle. One strong material idea… is usually enough."
- Stagger only "when a list appears as a list. Cap the total delay, and never reinterpret every scrolled section as a staggered list."
- **Durations**:

  | Duration | Use |
  |---|---|
  | 100–150 ms | immediate feedback |
  | 150–300 ms | routine state change |
  | 300–500 ms | layout, overlay, view transition |
  | 500–800 ms | deliberately authored focal entrance |

  "Exit faster than entrance. Use natural deceleration such as `cubic-bezier(0.16, 1, 0.3, 1)`… do not use bounce or elastic curves by reflex. Long feedback feels like latency."
- Runtime rules:
  - Scroll-driven motion "only when the scroll relationship itself carries meaning, with a robust fallback".
  - No new dependency for something the stack can already express.
  - "Keep content visible in the default state so failed scripts do not hide the page."
  - Do not casually animate `width`, `height`, `top`, `left` or margins.
  - Bound blur, filter, shadow, canvas and shader work to isolated regions.
  - "Apply `will-change` only during known animation."
- Accessibility:
  - "Any nonessential loop must stop when offscreen or hidden."
  - "Every web animation needs a `prefers-reduced-motion` path with an intentional alternative." Remove or reduce spatial movement but keep the opacity, colour and state transitions that carry meaning. "Reduced motion means fewer and gentler animations, not disabling all motion."
  - Audit flags "a global `0.01ms` kill that destroys useful feedback", flashing above threshold, and motion that blocks focus or reading.
- Verify:
  - The focal motion is specific to the world.
  - Each supporting animation explains feedback, state or relationship.
  - Interruption and repeated use work.
  - Desktop, mobile and keyboard paths are usable.
  - The reduced-motion path is correct.
  - It is smooth on the target device.
  - "Removing an animation would lose meaning… not merely decoration."

### Overdrive (ambitious effects)
- Before building, think through 2-3 directions (technique, ambition, cost) and get the user's pick.
- Verify in the browser for "timing, easing, and smoothness".
- Toolkit:
  - View Transitions API (same-document: all browsers).
  - `@starting-style` (all browsers).
  - Spring physics (GSAP, motion).
  - `animation-timeline: scroll()` (no Firefox; static fallback).
  - WebGL (Three.js, OGL), WebGPU with a WebGL2 fallback, Canvas/OffscreenCanvas, SVG filter chains.
  - `@property` for animating gradients and colours.
  - Web Animations API, Web Workers.
  - Web Audio (needs a gesture).
- "Progressive enhancement is non-negotiable", for example `@supports (animation-timeline: scroll())`.
- Performance: "Target 60fps. If dropping below 50, simplify." Lazy-initialize heavy resources near the viewport. "Pause off-screen rendering. Kill what you can't see." Test on mid-range devices.
- "The gap between 'cool' and 'extraordinary' is in the last 20%… ship the version that feels inevitable."
- **NEVER**:
  - jank on mid-range devices;
  - bleeding-edge APIs without a fallback;
  - sound without opt-in;
  - ambition masking weak fundamentals;
  - "Layer multiple competing extraordinary moments."
- Tests: wow, removal, device (phone, tablet, Chromebook), context.

### Delight
- Persuade: "personality may run through voice, composition, motion, and discovery, provided the artifact remains the focus."
- "Define one delight thesis": one sentence on what the user should feel and why it belongs to this product, delivered through the smallest system. Options:
  - a distinctive response to a meaningful action;
  - product-specific language;
  - a material interaction;
  - a world-grounded detail;
  - a discovery reward.
- "Do not manufacture a celebration for an ordinary click." "Generic whimsy is worse than neutral clarity."
- Delight must not:
  - delay or block the primary task;
  - override platform conventions or accessibility;
  - add claims;
  - play sound without consent;
  - become unskippable or exhausting on repeat;
  - add disproportionate asset cost.
- Verify: "a neighboring product could not use it unchanged"; the page stays fast and obvious without the flourish.

### Typeset
- Persuade: "display type may carry the voice. Use decisive contrast and responsive scale."
- Assess:
  - authority and fit (is every family necessary?);
  - hierarchy (are adjacent sizes or weights too close?);
  - scale consistency;
  - reading: "comfortable 45–75 character measure";
  - stress (long headings, zoom, fallback);
  - delivery (only used assets).
- Apply:
  - "Use 1rem / 16px as the ordinary web body floor."
  - Keep prose at 45–75ch; wider lines need more leading.
  - Light text on dark gets "slightly more line height, a touch more tracking, and one step more weight".
  - Use tabular or numeric features where they help.
  - Load only the weights used, with metric-compatible fallbacks, and never block text.
  - Use paragraph spacing or first-line indent, not both.
  - "the fewest roles and families that make the hierarchy unmistakable."
- Line breaks:
  - `text-wrap: balance` on headings and short centred blocks; `text-wrap: pretty` on body.
  - Hand-break headings only between phrases, checked at every width.
  - Deliberate uneven breaks are rare.
- Live parameter: `scale` 0.85–1.3, default 1.

### Colorize
- Persuade: "color may carry the voice and own large regions".
- Build roles, not swatches: canvas and elevated surfaces; primary and secondary text; action, focus and selection; borders; success, warning, error, info.
- "For a new web palette, prefer OKLCH."
- "Let the strongest color own a deliberate region." "Keep the primary action easy to find; do not spend its color on decoration."
- Secondary text on colour comes from that hue. Do not mechanically invert dark mode.
- Contrast (AA): body 4.5:1; large 3:1; "controls, icons, focus indicators 3:1".
- Check "text on images" and overlays.
- OKLCH ramps: "reduce chroma near white and black". "Prefer explicit colors over chains of translucent overlays."
- Live parameter: `color-amount` 0–1, default 0.5.

### Layout
- Persuade: "composition may be asymmetric, fluid, or intentionally disruptive when the selected world earns it."
- Assess:
  - **squint test** ("can you still identify the primary element, the secondary element, and the major groups in order?");
  - grouping by proximity rather than containers;
  - rhythm ("one spacing value repeated until everything has equal weight" is the failure);
  - whether repeated cards are genuinely equivalent;
  - density;
  - adaptation, with DOM and focus order matching visual order;
  - extremes.
- Spatial thesis: name the primary path, what groups, what leads and supports, the density and rhythm, and how it changes per viewport.
- Apply:
  - "A 4-unit base usually provides the useful middle steps that an 8-only scale misses."
  - Use `gap` for sibling rhythm.
  - Make responsive changes structural (reorder, collapse, reflow).
  - "Variation is not a goal by itself."
- Live parameter: `density` 0.6–1.4, default 1.

### Bolder and quieter
- **Bolder**:
  - "Scope is sovereign."
  - "The reflex answer, reaching for more effects, is the opposite of bold."
  - Amplify what the system already owns.
  - "Commit, then clarify… If every element got louder, the section got flatter."
  - Make the target "a peak in the scroll".
  - **Skeleton test**: strip the copy out. If the section only works once the words return, "the boldness is in the text size, not the design."
- **Quieter**:
  - Saturation down to "70-85%"; neutrals with colour as accent ("10% rule"); "Never gray on color".
  - Weights "900 → 600, 700 → 500".
  - Motion: "Shorter distances (10-20px instead of 40px)… Use ease-out-quart… Never bounce or elastic."
  - "Generic quiet looks like gray text on white, one sans at a uniform weight, and a grid of identical cards."

### Distill
- "What's the primary user goal? (There should be ONE)". Find the 20% that delivers 80%.
- Colour: "1-2 colors plus neutrals, not 5-7". Type: "One font family, 3-4 sizes maximum, 2-3 weights" (this guidance is for simplification).
- "never nest cards inside cards". "Cards aren't needed for basic layout."
- "ONE primary action, few secondary actions." "ONE obvious next action, not five competing ones."
- "Remove redundant copy: No headers restating intros… say it once." Use the active voice.
- Avoid: "mystery ≠ minimalism"; removing decision information; erasing hierarchy.

### Clarify (copy)
- Message hierarchy for each state:
  1. the one fact the user needs now;
  2. the next action;
  3. context that changes the decision;
  4. tone.
  "Say each idea once. If the heading already explains the state, the introduction should add new information or disappear."
- Labels use a specific verb and object, and describe the outcome, not the gesture. Avoid Yes, No, OK and Submit.
- Forms: "Use persistent labels; placeholders are examples, not labels." Put requirements before submission. Validation does not blame the user and is announced accessibly.
- Errors: what failed, why (when useful), how to recover. Routine success is brief.
- "Link text must make sense out of context; icon-only controls need accessible names."
- Write alt text that carries the image's information (empty alt for decoration). Accessible names match the visible labels.
- Verify at "200% zoom". "The final copy is as short as it can be without removing meaning or recovery."

### Critique (scoring rubric)
- Two isolated assessments:
  - A, design review: specificity first ("could an unrelated product use it unchanged?"), holistic review, cognitive load, emotional journey (peak-end, reassurance at high-stakes moments), and Nielsen.
  - B, detector and browser evidence.
- **Nielsen 10**, each scored 0-4:
  1. Visibility of system status.
  2. Match with the real world.
  3. User control and freedom.
  4. Consistency.
  5. Error prevention.
  6. Recognition over recall.
  7. Flexibility.
  8. Aesthetic-minimalist ("4 = every element earns its pixel").
  9. Error recovery.
  10. Help.
- Heuristics 7 and 10 may be `n/a` on Persuade, with the total renormalized (for example 24/32).
- Bands /40: 36–40 Excellent; 28–35 Good; 20–27 Acceptable; 12–19 Poor; 0–11 Critical. As percentages: 90%+, 70%+, 50%+, 30%+. "Most real interfaces score 20-32 out of 40."
- **Cognitive load checklist** (8 items): single focus; chunking "(≤4 items per group)"; grouping; visual hierarchy; one thing at a time; "≤4 visible options at any decision point"; working memory; progressive disclosure. 0–1 failures is low; 2–3 moderate; 4+ critical.
- Working memory: "≤4" is OK, "5–7" is the boundary, "8+" is overload. Buttons: "1 primary, 1–2 secondary". "Navigation menus: ≤5 top-level items."
- The 8 violations: Wall of Options, Memory Bridge, Hidden Navigation, Jargon Barrier, Visual Noise Floor ("one primary element, 2–3 secondary, everything else muted"), Inconsistent Pattern, Multi-Task Demand, Context Switch.
- **Personas for a landing page: Jordan, Riley, Casey.**
  - Jordan: "first action obviously clear within 5 seconds", labelled icons.
  - Riley: edge cases, broken states.
  - Casey: "primary actions in the thumb zone (bottom half)", works on 3G, "touch targets at least 44×44pt", no heavy assets everywhere.
  - Sam (accessibility): keyboard-only, 200% zoom, 4.5:1, announced state changes.
  - Alex: "Slow animations that can't be skipped" is a red flag.
- Severity: "**P0** Blocking", "**P1** Major… Fix before release", "**P2** Minor", "**P3** Polish". "Would a user contact support about this?" If yes, it is ≥P1.
- Report:
  - Specificity verdict.
  - Overall impression.
  - What's working (2-3).
  - Priority issues (3-5): What / Why / Fix / Command.
  - Persona red flags.
  - Minor observations.
  - Questions.
  - Then 2-4 targeted questions, each with 2-3 options, asked last. Skip them only if there are fewer than 3 priority issues.

### Audit (technical, scored /20)
- Five dimensions, each 0-4:
  1. **A11y**: contrast "< 4.5:1, or < 3:1 for large text (or 7:1 for AAA)"; reduced motion; ARIA; keyboard; semantics; alt text; forms.
  2. **Performance**: layout thrash; expensive animation; lazy loading; "will-change overuse"; bundle size.
  3. **Theming**: hard-coded colours, tokens, dark mode.
  4. **Responsive**:
     - Touch targets: "< 44x44px. WCAG AA (SC 2.5.8) requires at least 24x24 CSS px unless an exception applies… a 24 CSS px circle centered on the target's bounding box overlaps no other target".
     - Broken touch gestures: "no `touch-action` on a pointer-event drag surface, drag state that nothing clears on cancel".
     - Horizontal scroll, text scaling.
  5. **Implementation integrity**: drift, decorative content, "interchangeable with an unrelated product".
- Bands: "18-20 Excellent, 14-17 Good, 10-13 Acceptable, 6-9 Poor, 0-5 Critical".
- "Keep P3s few."

### Polish
- Classify each drift as a missing token, a one-off implementation, a conceptual mismatch or a local defect.
- Triage order:
  1. broken or blocked tasks, misleading state, inaccessible paths;
  2. missing loading, empty, error, success and disabled states;
  3. flow, hierarchy, responsive and system drift;
  4. visual and motion inconsistency;
  5. code and asset cleanup.
- "Do not perfect one corner while leaving the rest below the same quality bar."
- Every control has default, hover, focus, active, disabled, loading, error and success states. "Keep motion coherent, interruptible, and performant. Do not add animation merely to make polish visible."
- "Prevent image layout shift; use correct aspect ratios… useful alt text."
- Verify at mobile, intermediate and wide sizes: console errors, layout shift, interaction latency, image loading. End with a source diff: no orphaned code or temporary artifacts.

### Harden
- Overflow: use `min-width: 0` on flex and grid items, plus `overflow-wrap: break-word` and line-clamp.
- Text size: "16px body on mobile… 14px only for genuinely secondary text. iOS Safari force-zooms focused inputs under 16px." Test at 200% zoom.
- i18n: "Add 30-40% space budget"; use logical properties.
- Forms:
  - inline errors, "Preserve user input on error";
  - "Prevent double-submission (disable button while loading)";
  - `maxlength`, `pattern`, `required`, `aria-describedby` hints.
- "Core functionality works without JavaScript."
- **Interrupted gestures** (sliders and drag surfaces):
  - A second pointer mid-drag never hijacks the drag.
  - On `pointercancel`, `lostpointercapture`, release outside, or `blur`: "clear the dragging state and release capture"; the next drag must work without a reload.
- Accessibility: skip links, live regions, Windows high-contrast mode.
- Clean up listeners and timers. Debounce input at 300 ms; throttle scroll at 100 ms.
- Verify:
  - long text, emoji;
  - throttled network;
  - "Click submit 10 times rapidly";
  - interrupted gestures, then drag again.
  - Say what engine or device produced the gesture evidence.

### Adapt (responsive)
- Mobile:
  - single column;
  - "Touch targets 44x44px minimum";
  - "Thumbs-first design";
  - "Larger text (16px minimum)";
  - progressive disclosure;
  - sticky headers for context.
- Breakpoints: "Mobile: 320px-767px, Tablet: 768px-1023px, Desktop: 1024px+", or content-driven. "Three breakpoints usually suffice (640, 768, 1024px). Use `clamp()`." Write mobile-first `min-width` queries.
- Input: use `@media (pointer: coarse)` for bigger padding (example: 12px 20px vs 8px 16px) and `(hover: hover)` for hover lift. "Don't rely on hover for functionality."
- Safe areas: `env(safe-area-inset-*)`, `padding-bottom: max(1rem, env(safe-area-inset-bottom))`, `viewport-fit=cover`.
- Images: `srcset` with `w` descriptors plus `sizes`; `<picture>` for art-direction crops (wide vs tall).
- "Use `display: none` sparingly (still downloads)."
- Custom controls: tap, then complete a drag. "A swipe along the page's scroll axis across the control scrolls the page… without activating it." Name the evidence source; "Chromium is not Safari".
- Edge sizes: 320px and 4K. Check landscape. Test a real iPhone and a cheap Android.

### Optimize (performance)
- Images:
  - "WebP, AVIF";
  - "don't load 3000px image for 300px display";
  - lazy-load below the fold;
  - "Compress images (80-85% quality is usually imperceptible)";
  - **never** "Lazy load above-fold content".
- Fonts: "`font-display: swap` or `optional`", subset (`unicode-range: U+0020-007F` example), "Limit font weights loaded".
- Inline critical CSS. Use `contain` and `content-visibility: auto`.
- Batch layout reads before writes. "Target 16ms per frame (60fps)", `requestAnimationFrame`, `IntersectionObserver`. "`will-change` sparingly."
- **Core Web Vitals**: "LCP < 2.5s"; "INP < 200ms" (break up long tasks, defer JS); "CLS < 0.1" (set image dimensions, `aspect-ratio`, "Avoid animations that cause layout shifts").
- Measure before and after on low-end Android with 3G throttling.

### Variants: live and generate (the model for 1 | 2 | 3 versions)
- The default count is "3", capped at 8.
- **Phase A, identity lock** (cannot be skipped): one sentence of what is really on screen. It names the actual surface and accent values, the font pairing, the topology, the surface treatment and the voice. "every variant must read as the same brand side by side."
- **Phase B**: default mode (vary within the identity, about 90% of cases) vs departure (only on an explicit ask). "Unsure means default."
- **Phase C**, default mode: three variants on three DIFFERENT primary axes:
  1. Hierarchy.
  2. Layout topology (stacked / side-by-side / grid / asymmetric / overlay).
  3. Typographic system.
  4. Colour strategy (Restrained / Committed / Full palette / Drenched).
  5. Density (minimal / comfortable / dense).
  6. Structural decomposition (merge, split, progressive disclosure).
- In departure mode, each variant is "one concrete sentence naming a real-world referent ('a museum exhibition label system', not 'clean and minimal')."
- **Phase D, squint test**: compare against the lock. "three 'tighter density' variants is failure". When the axis is colour, "three color worlds, not three shades".
- Vocabulary per action:
  - animate: "cascade stagger / clip wipe / scale-and-focus / morph / parallax";
  - delight: "micro-interaction / typographic surprise / illustrated accent / sonic-or-haptic / easter egg";
  - layout: "different structural arrangement, not spacing tweaks";
  - bolder: scale / saturation / structural change;
  - distill: visual noise / redundant content / nested structure.
- Delivery:
  - "Complete HTML replacement of the original element per variant, not a CSS-only patch."
  - "Each variant div contains exactly one top-level element, same tag as the original."
  - "First variant visible, all others `display: none`."
- Knobs per variant, by visual weight:
  - leaf: 0;
  - small composition (≤5 children): 0-1;
  - section (6-15 children): target 2;
  - hero (16+ children): 2-3, up to 4.
  - "Hard cap: four." "a hero with 0 params is almost always a mistake."
- Operate and Read comps say: "Each must be recognisably different from the first at thumbnail size; a variant only its prompt can tell apart adds no choice."

### Smaller playbooks (relevant points only)
- **shape**: the brief covers job and audience; outcome and proof; selected direction (including the focal moment); scope and anti-goals; states and ranges; interaction and layout intent; constraints and open decisions. Use 3-5 bullets when settled. Never ask for CSS values.
- **document**: DESIGN.md has 8 sections in order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts. It opens with a "Creative North Star" metaphor and uses named rules (example: "The One Voice Rule. The primary accent is used on ≤10% of any given screen"), 1-3 per section. Values follow the description in parentheses. Tonal ramps have 8 steps, ~15% to ~95% lightness.
- **extract**: extract only patterns used 3+ times with the same intent. "Premature abstraction is worse than duplication."
- **init**: PRODUCT.md records evidence on hand, and states the absences "future work must not fabricate". No invented testimonials, customers, benchmarks or pricing.
- **component-review**: after "three failed hero attempts, or three failed responsive attempts", stop and get human review. Acceptance closes approval.
- **operate.md**: product UI uses 150–250 ms transitions and "No orchestrated page-load sequences". This is not for a Persuade homepage, but the version picker is a control: give it fast state feedback.
- **onboard**: show, don't tell; make it skippable; time to value.

## Applying it to Rembrandt v5

1. **Mode and stance.** The homepage is a Persuade surface, so it gets full commitment. This is a redesign: v4's look is evidence and anti-reference, not something to polish. Keep the product truth exactly: since 1995; 4.9 stars from 295 Google reviews; BBB A+; Owens Corning Platinum Preferred; (937) 746-7377; Springboro, OH. Add no new claims, and no invented testimonials or numbers.
2. **A working action in the first viewport.** "The action… in its working form; a decorative link… does not count." The hero carries a real `tel:+19377467377` call control and a short free-estimate form (or one tap that opens it in place). The hook lands in one line. On mobile, a thumb-zone call and estimate bar sits at the bottom with `max(1rem, env(safe-area-inset-bottom))` padding and `viewport-fit=cover`.
3. **Prove, don't claim; the first viewport is a thesis.** Lead with one decisive real photo (the drone aerials 102/103 or the crew on underlayment at low sun, 28/29). Dramatize the mechanism: an old or damaged roof becomes a finished roof (before/after 51/125/52). Memory test: an hour later, a visitor should describe "the roof that rebuilt itself as I scrolled", not "a nice roofing site".
4. **Write a motion thesis before any GSAP code.** Name one focal moment, for example a scroll-scrubbed clip-path or mask reveal from before to after over the aerial, pinned once. Name the continuity (version swaps), the feedback (the 1|2|3 buttons, the call and submit buttons) and the budget. This addresses the owner's complaint: no identical fade-and-rise on every section, stagger only for real lists with a capped total delay, and a parallax layer or scroll reveal does not count as a thesis.
5. **Timings and easing.**
   - Picker button feedback: 100–150 ms.
   - Version swap: 150–300 ms, or 300–500 ms as a clip wipe or View Transition.
   - Hero entrance: 500–800 ms.
   - Exits run faster than entrances.
   - Default ease is `cubic-bezier(0.16,1,0.3,1)`. Mapping it to GSAP `expo.out` or `power4.out`, or a CustomEase with those control points, is my own mapping, not the skill's.
   - No bounce or elastic. Animate transform, opacity, clip-path and mask, never layout properties. Apply `will-change` only during a tween.
6. **Content visible by default.** "Exponential ease-out from an already-visible default", and failed scripts must not hide the page. Set hidden start states only after JS boots (for example a `.js` class plus `gsap.set`). The no-JS page must still show the hero, the photos and a working phone link and form.
7. **Reduced motion is an intentional alternative, not a 0.01 ms kill.** Under `prefers-reduced-motion: reduce`:
   - no Lenis smooth scroll;
   - no pinning or scrub;
   - no parallax or spatial travel;
   - the before/after becomes a static pair or a crossfade;
   - version swaps keep a short opacity crossfade.
   Use `ScrollTrigger.matchMedia` or `gsap.matchMedia` for this. Marquees and other loops pause offscreen and when the tab is hidden.
8. **The 1|2|3 versions follow the live-mode discipline.**
   - Write one identity-lock sentence, then build each section's three versions on three different primary axes (hierarchy, topology, type system, colour strategy, density, structural decomposition). For motion-led sections, vary the vocabulary instead (cascade stagger, clip wipe, scale-and-focus, morph, parallax).
   - Squint test: the versions must look different at thumbnail size. Three "tighter density" versions is failure. Colour-axis versions are "three color worlds, not three shades".
   - Each version is a complete HTML replacement with one top-level element. Version 1 shows first; the others are hidden with `hidden` or `display:none`.
9. **The picker is a real control.** Use a labelled radio or segmented group (`aria-pressed` or `role="radio"`, a visible focus ring, keyboard arrows). Targets are at least 44x44 (the WCAG 2.5.8 floor is 24x24 with spacing). Announce the change politely. After a swap, kill and rebuild that section's ScrollTriggers and call `ScrollTrigger.refresh()`. That last step is my own engineering inference: it keeps hidden versions from holding stale pins and keeps CLS under 0.1.
10. **Cut the text (distill and clarify).**
    - ONE primary action (free estimate) and ONE secondary (call). At most 4 visible options at any decision point; at most 5 nav items.
    - "Say each idea once": no intro paragraph under a heading that already explains.
    - The skeleton test: each section must work with its copy removed.
    - Labels name the action and object: "Call (937) 746-7377", "Get my free estimate", not "Submit".
11. **Banned or refused for this build:**
    - eyebrow or kicker labels (a hard ban);
    - 01/02/03 section numbers;
    - gradient text;
    - decorative glass;
    - same-size icon-card service grids, and nested cards;
    - the hero-metric template (a giant "4.9" with small labels and a stat row). Show the reviews as real proof in the world's own form instead.
    - border-left accents over 1px;
    - hard offset shadows;
    - emoji or Unicode icons (use one drawn SVG icon family);
    - geometric masks faking organic edges (use real cut-outs or alpha mattes);
    - a split hero, or a centred headline over a row of cards.
12. **Rut and calibration.** "Rembrandt" invites the literal Old Masters reading (gilt frames, chiaroscuro, cream canvas, italic serif). That is the brief painting its own picture, so it gets at most one candidate. A family firm also triggers the rendition prior (cream, serif italic, lamplight), so treat that palette as spent. Take the dark-or-light decision from the scene (for example, a homeowner outdoors in daylight checking storm damage on a phone). Take the bolder colour strategy: Committed (one saturated colour on 30–60% of the surface) or Drenched sections. Colour owns whole regions, not scattered accents.
13. **Type.**
    - Do not use the overused faces (Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, Inter-as-display, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans), and no system display face.
    - Self-host one display face with a point of view plus one text face, subset to Basic Latin, embedded as base64 woff2 with `font-display: swap`, and load only the weights used.
    - Body text at least 16px; measure 45–75ch; tracking no tighter than -0.04em; `text-wrap: balance` on headings and `pretty` on body.
    - Craft-floor's "display max 6rem" is not a ban. Going bigger is a deliberate brief call.
    - component-review's "never a font data URI" applies only to its capture tooling. The owner's single-file requirement wins.
14. **Text on photos and browser surfaces.** Body text needs at least 4.5:1 and large text 3:1 against the actual photo region. Use explicit scrim colours, not stacked translucency. Theme `::selection`, the caret, the scrollbar, focus rings and `text-underline-offset` from the palette. Use tabular numerals for the phone number and figures.
15. **Single-file performance.**
    - Base64 adds roughly 33% (my estimate), so use fewer, better photos ("one decisive photo beats five mediocre ones").
    - Resize each to its display size (no 3000px original in a 300px slot), WebP or AVIF at 80–85% quality.
    - Set width, height or `aspect-ratio` on every image for CLS under 0.1. Keep the hero image light for LCP under 2.5 s. Never lazy-load above the fold.
    - Keep INP under 200 ms (defer non-critical JS, break up long tasks).
    - 60fps, and simplify if it drops below 50. Initialize heavy effects near the viewport and pause them offscreen.
16. **The before/after slider is hardened.**
    - Pointer events with `touch-action: pan-y` on the handle.
    - Clear the drag on `pointercancel`, `lostpointercapture` and `blur`, and handle a second pointer without a jump.
    - Keyboard operable with arrow keys (a slider role with a value).
    - A horizontal page swipe across it must not hijack scrolling.
    - Test it in a WebKit engine as well as Chromium, and say which engine produced the evidence.
17. **Pace the scroll like a studio and end on a real close.** Alternate dense, image-rich passages with quiet ones inside one grammar. Keep one spacing rhythm on a 4-unit base, with more space above headings than below. Finish with the call and estimate action, not a fade-out footer.
18. **One delight thesis.** For example, the firm's dog (photos 46/73) as a small discovery reward. It must never delay calling or the estimate, stay off the primary path, never use sound without opt-in, and still feel good on repeat visits.
19. **Plan before code.**
    - Write the direction contract (THESIS / OWN-WORLD / STORY / FIRST VIEWPORT / FORM / FINISH, about 150 words) into v5/PLAN.md. Never put it in the shipped HTML: no comments, no `data-*`.
    - Record each image's origin (rembrandtroofing.com filename) as its provenance in the plan.
    - Avoid the probable AI or stock images (30, 32, 33, 44, 45, 118–123, 126, 134), or label them.
20. **Review gates for the finish.**
    - Critique with personas Jordan, Riley and Casey. Score Nielsen with heuristics 7 and 10 as n/a (out of /32); target "Good", 70% or better.
    - Cognitive-load checklist: 0–1 failures.
    - Audit the 5 dimensions out of /20; target 18–20.
    - Fix all P0/P1 before showing the owner.
    - One batched inspection round at 1440 and 390 wide (plus 1280–1600), with entrance motion settled before capture. Two rounds maximum.
    - The first-time-visitor test: what this is, why it matters and what to do, all "within seconds".

## Reading log

**Read in full (lines 2353-7560):**
- SKILL.md core: 2353-2436.
- adapt: 2438-2758.
- animate: 2760-2850.
- audit: 2853-2993.
- bolder: 2996-3030.
- clarify: 3033-3128.
- colorize: 3131-3218.
- component-review: 3221-3285.
- craft-floor: 3288-3333.
- craft: 3336-3342.
- critique, including cognitive load, heuristics and personas: 3345-4165.
- delight: 4168-4239.
- distill: 4242-4354.
- document, including its DESIGN.md template (read because it belongs to the document playbook): 4415-4832.
- extract: 4835-4904.
- generate: 4907-5009.
- harden: 5012-5375.
- init, including its PRODUCT.md template: 5496-5628.
- layout: 5631-5716.
- live: 5827-6153.
- mode-operate: 6156-6178.
- mode-persuade: 6181-6201.
- mode-read: 6204-6226.
- new-work: 6229-6384.
- onboard: 6387-6622.
- operate: 6625-6687.
- optimize: 6690-6948.
- overdrive: 6951-7079.
- polish: 7082-7188.
- quieter: 7191-7291.
- region-map: 7294-7321.
- routing: 7324-7349.
- shape: 7352-7412.
- typeset: 7415-7506.
- visualize: 7509-7557.

**Read but left out of the notes** (tooling or maintenance, unrelated to the build):
- doctor: 4357-4412.
- hooks: 5378-5493. The only note taken is the detector's mechanical tells: gradient text, glow shadows, contrast, overflow.
- live-setup (CSP and config): 5719-5824.
- The tool-execution parts of critique, live and generate (sub-agent orchestration, poll loops, carbonize cleanup).

Nothing was skipped unread.

**Not in the library** (the skill links to them, but the range does not contain them): ios.md, android.md, audit.native.md, adapt.native.md, degraded/finish-reviewer.md, degraded/documenter.md, and the shipped agent definitions. None of these are needed for a web homepage.
