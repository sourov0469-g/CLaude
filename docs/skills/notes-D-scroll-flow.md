# Skill digest D: scroll, flow, storytelling (read in full, my own thread)

Skills: S0450, S1502, S0451, S0448, S1066, S1325, S1169, S1326, S1209, S1276, S0544, S0403, S1322, S0204, S0578, S0186, S1328, S0576.

## The flow law for this build (synthesis; this is what a judge checks)
1. **One current** (S0544/S0578). The page has a single dominant direction of travel. Ordinary section-to-section handoffs use it, and every other vector carries meaning:
   - **Upward** = a conclusion or reveal, such as the Reviews tally.
   - **Z-pull with an oversized arrival** = a payoff that lands, such as the consult arrival.
   - **Horizontal** = the 8-frame build journey, which is a chapter boundary.
   - Never ping-pong between consecutive seams. Direction changes only on a cause (a click or impact) or at a chapter boundary.
2. **Vector law at seams.**
   - The exit axis and direction equal the entry axis and direction.
   - Speeds match through mirrored eases: exit `power4.in` with entry `power4.out`, same distance.
   - The cut lands mid-motion on both sides. The entry starts at least 50% along its path (opacity ignites around 0.35), never from rest.
   - Partial travel is about 12% of the frame (150 to 300px), never a full off-screen move.
3. **Carriers.** Every seam hands a concrete object across: a pipe, a line, the companion mid-path, a card that docks into the next layout, a mark that flies into its slot. **Never a crossfade**, because a crossfade has no carrier.
4. **Z sign rule.** A shrinking exit pairs with a shrinking entry (exit 1 to 0.8, entry 1.25 to 1). A growing exit pairs with a growing entry (1 to 1.2, then 0.75 to 1). Grow-from-small after a receding exit is a banned mirror.
5. **No idle wobble.** Breathe, float, drift and glow-pulse loops are banned as sustained motion. Each phase is owned by one of these routes:
   - staged reveals;
   - a camera with intent;
   - sequenced UI life (counters ticking);
   - animated sequences;
   - cursor-led action.
   The test: pause at any scroll position, and something meaningful is mid-flight or composed and finished.
6. **Stillness before climax:** a 0.3 to 0.75s hold between an action and its result. Examples: the star tally landing on 4.8, or the BA seam reaching its end.
7. **Timing intents:**
   - a single entry takes at most about 800ms;
   - an exit takes about 75% of its entry;
   - a whole stagger totals at most 500ms;
   - similar elements share one ease and duration;
   - `bounce.out` and `elastic.out` are banned; `back.out(1.4-1.7)` is allowed on an entry.
8. **Transition vocabulary:** 2 to 3 inter-section transition types for the whole site, repeated. Shared-element morphs don't count against that budget.
9. **Native scroll is the truth** (S1326/S1209/S1328).
   - One normalized progress drives each pinned stage.
   - It is reversible and deterministic: the same scroll position gives the same state.
   - No wheel hijack, no preventDefault on wheel, no scroll-speed changes, no snap-per-section paging.
   - The footer is always reachable.
   - Lenis is allowed only as smoothing, driven from the gsap ticker (`lenis.raf(t*1000)`, `lagSmoothing(0)`, `lenis.on('scroll', ScrollTrigger.update)`). It is skipped under reduced motion.
10. **Pins are finite.**
    - A pin releases before the next section.
    - Scroll length is about 0.7 to 1.8 viewport heights per beat (S1328). A pinned scene takes about 1.4 to 2.8 viewport heights in total.
    - Under reduced motion: no pin, no scrub, a static frame, ordinary document flow, and every state exposed as text or a list.

## Per-skill rules

### S0186 gsap-scrolltrigger (Applies to: all pins and scrubs)
- Never put a ScrollTrigger on a child tween of a timeline. Never nest scroll-triggered animations.
- Never combine scrub with toggleActions.
- A horizontal pinned track (containerAnimation) uses `ease:"none"`. Triggers that rely on it cannot pin or snap.
- Don't animate the pinned element itself; animate its children.
- Create triggers top to bottom, or set `refreshPriority`. Call `refresh()` after fonts and images load.
- No markers in production.
- Audit:
  - Is any trigger placed on a child tween?
  - Does every pinned stage release?
  - Does refresh run after `document.fonts.ready`?

### S0403 iart-ai/gsap-web
- Prefer one timeline per scene with labels.
- Use `autoAlpha` rather than raw opacity.
- Use `quickTo` for pointer following.
- Scrubbed tweens use `ease:"none"`.
- Use `ScrollTrigger.batch` for repeated reveals.
- Split text only after `document.fonts.ready`, and revert the split on teardown.
- Audit: is there no rogue `requestAnimationFrame` loop running beside Lenis on the ticker?

### S1326 scroll-scrubbed-visual-sequence (Applies to: Process 8-frame, Bathroom horizontal build)
- Write the sequence config before coding: `scrollVh`, frame count, poster frame, reduced-motion frame, copy stops.
- One normalized progress drives the renderer. There is no implicit easing in the mapping.
- The visual sits on a sticky or pinned stage. Copy stays in semantic HTML, never baked into the art.
- Coalesce render work in rAF. Pause offscreen.
- Under reduced motion, render a static chosen frame.
- Expose the ordered states as a list.
- Audit:
  - Does a fast flick in both directions reproduce the same state?
  - Does the layout work at 390, 768, 1024 and 1440?

### S1325 scroll-progress-timeline (Applies to: process rails, bath build steps)
- The markup is an ordered list with real headings.
- The progress line uses `scaleX` or `scaleY` (compositor only), measured from the first point's centre to the last.
- A step becomes active when the line head crosses its centre.
- `aria-current="step"` marks the active step, with no live-region spam.
- Inactive steps stay readable.
- On mobile, collapse to a left rail.
- The pin is finite, and every step carries a distinct visual state.

### S1322 cinematic-scroll-storytelling (motion tokens, binding defaults)
- Enter ease: `power3.out` or `power4.out`.
- Scrub: 0.8 to 1.4.
- Text reveal: 0.8 to 1.1s; card reveal: 0.9 to 1.2s.
- Stagger: word 0.035 to 0.07s; line 0.08 to 0.14s; card 0.06 to 0.1s.
- Reveal offset y: 24 to 48px. Blur: 4 to 10px, resolving to 0.
- Sticky card stack: scale 1 down to 0.92, previous card `autoAlpha` 0.72 and y -24, scrubbed between the next card's `top 78%` and `top 24%`.
- Parallax distance stays small.
- Reveals play once.
- Avoid bounce, elastic and aggressive scale jumps.
- **Home Services and Renovation Services stacking follow this spec.**

### S0451 masked-reveal (headlines)
- Trigger at `top 82%`.
- Duration 0.7 to 0.9s, stagger 0.025 to 0.045 per word, `yPercent` 110 to 0, `power3.out`, once.
- Put `aria-label` on the parent and `aria-hidden` on the spans.
- Split by word, never by letter.
- No links inside split text.

### S0448 gsap-scrolltrigger-storytelling
- Every pinned scene maps to labelled timeline states.
- Section handoff: the current scene scales, masks or translates into the next. It never ends abruptly.
- High-impact transitions are reserved for handoffs.
- Don't trap the reader too long.
- Effects never reduce text contrast or cover CTAs.

### S1328 scroll-world-storytelling
- Reduce the story to 5 to 7 beats in a beat ledger: id, scene, eyebrow of 2 to 4 words, headline of 3 to 8 words, a body sentence of 24 words or fewer, evidence, a motion verb, and a scroll weight of 0.7 to 1.8vh.
- Never invent proof.
- One world metaphor, one motion grammar, one material language.
- Mode choice: **HTML/SVG/type mode** for this build. It is accessible and light, it must not secretly become canvas, and labels stay selectable text.
- The page stays complete without JS.
- Verify reverse scroll, the four widths and the console.

### S0544 / S0578 motion-doctrine (gateway; see the synthesis above)
- Write a vector ledger before authoring. Here it is per page, as a table in FLOW-MAPS.md.
- Causal motion: click, squash, release, flight, impact, recoil, reveal. The effect starts on the causing frame.
- Reactions scale with implied mass.

### S0576 cut-the-curve (parameters)
- **Cut the curve:**
  - travel ±230px, around 12% of the frame;
  - exit 0.33s `power4.in`, entry 0.33 to 0.42s `power4.out`;
  - optional blur of 8px;
  - the exit fade finishes at 25 to 30% of its travel, and the entry ignites at opacity 0.35;
  - the stage ground must be opaque.
- **Zoom-through:** 1 to 1.2 with blur up to 10px, then a hard cut at 0.75, then `expo.out` to 1 over 0.5s.
- **Inverse zoom:** 1 to 0.8, cut in at 1.25, then retract to 1. Text blur at most 10px; full-frame surfaces 18 to 20px.
- **Waterfall entry** (arrivals):
  - binary opacity;
  - y offset 60 to 80px for anchors, 40 to 50px for words, 30 to 48px for light elements;
  - durations 0.10 to 0.20s;
  - entries overlap rather than queue, with gaps shrinking ×0.84.
- **Nudge curve:** ramp-in `power3.in` (10% distance, 20% time), then a linear burst (65% distance, 18% time), then a `power4.out` tail (25% distance, 62% time). The tail takes at least 3× the ramp-in time.
- Banned:
  - two texts visible during a zoom;
  - `.inOut` eases on either side of a cut;
  - equal stagger gaps;
  - full off-screen moves.

### S1209 scrolljacking / S1169 parallax-effects / S1066 horizontal-scroll (a11y gates)
- No wheel `preventDefault`. Page Up and Page Down move predictable amounts.
- Parallax only applies under `prefers-reduced-motion: no-preference`, and content never depends on it.
- No horizontal page overflow at 320px:
  - use `width: 100%`, not `100vw`;
  - images use `max-width: 100%`;
  - horizontal tracks sit inside `overflow: hidden` pinned wrappers.
- Audit: does `document.scrollingElement.scrollWidth` exceed `innerWidth` at 320 or 390?

### S1276 view-transitions (Applies to: in-file page switching across the 5 pages)
- Wrap the page swap in `document.startViewTransition`, with an instant-swap fallback.
- `view-transition-name` values are unique.
- Under reduced motion: `animation: none`.
- Old state about 200ms out, new state about 300ms in.
- Shared element between pages: the logo or nav mark.

### S0450 marquee-loop (Projects V1 two rows)
- Duplicate the sequence and run a linear 0 to -50% transform.
- Item widths are stable.
- Edges are masked.
- Pause on hover only if useful.
- Static wrap under reduced motion.
- No heavy filters on moving items.
- Never marquee text that must be read carefully.

### S1502 scroll-craft (description only in pack)
- Pick one page grammar. Here it is the **continuous world** for Home and **chaptered editorial** for the service pages.
- A feeling curve with ONE engineered peak per page.
- ONE signature move unique to this site: the build journey where a drawn house is constructed across the scroll.
- Taste floor: 4px scale, two families, 6 colour roles plus 1 accent, tinted secondary text, no identical cards.
- Verify every scroll position: dead scroll, cues that never peak, composited contrast, reduced motion, 360x640.
