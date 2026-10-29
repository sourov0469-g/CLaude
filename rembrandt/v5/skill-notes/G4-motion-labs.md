# G4 · Motion labs: working notes for Rembrandt v5

Sources: S0652 ui-animation, S0634 motion-lab, S0617 emilkowalski-motion, S0658 animation-discipline. Values in `code` are quoted verbatim from the skills. Anything marked "(my call)" is my interpretation, not a quote.

---

## S0652 open-design/ui-animation

**Core rules**
- Animate only for "feedback, orientation, continuity, or deliberate delight". Looks-cool plus frequently seen means no.
- Keyboard focus and repeated navigation stay immediate.
- Order of preference: "CSS transitions > WAAPI > CSS keyframes > JS (`requestAnimationFrame`)". Transitions retarget when interrupted; keyframes restart from zero.
- Asymmetric timing: occasional UI enters a little slower and exits fast. High-frequency UI (hover highlights, popovers) enters at 0ms and exits with a "brief fade (100-150ms)".
- Press on `:active` at 0ms, with `touch-action: manipulation`.
- Use `@starting-style` for DOM entry (Baseline since August 2024); a `data-mounted` attribute is the fallback.
- "A small `filter: blur(2px)` hides rough crossfades".

**Principles**
- Continuity over teleportation.
- Direction matches layout: forward goes left-to-right.
- Surfaces emerge from their trigger.
- Confirm in place: the button itself becomes "Copied".
- Paired states animate together: open/close, hover/focus/pressed.
- "Delight scales inversely with frequency."

**What to animate**
- `transform` and `opacity` for movement. `color`, `background-color` and `opacity` for state.
- Never animate `width/height/top/left`. Never use `transition: all`.
- Keep animated blur at or under 20px.
- SVG: put transforms on a `<g>` with `transform-box: fill-box; transform-origin: center`.
- `scale()` also scales the element's children.
- Turn transitions off during theme switches.

**Easing and duration table**

| Element | Duration | Easing |
|---|---|---|
| Button press | 100-160ms | `cubic-bezier(0.22, 1, 0.36, 1)` |
| Tooltips, small popovers | 125-200ms | ease-out |
| Dropdowns | 150-250ms | enter curve |
| Modals, drawers | 200-350ms | enter curve |
| Move/slide | 200-300ms | `cubic-bezier(0.25, 1, 0.5, 1)` |
| Page transitions | 250-400ms | enter or move curve |
| Hover, colour/opacity | 200ms | `ease` |
| Hover, transform/scale | 100-150ms | enter curve |
| Illustrative/marketing | up to 1000ms | spring or custom |

- Keep routine UI under 300ms and scale duration with distance.
- Named curves:
  - Enter: `cubic-bezier(0.22, 1, 0.36, 1)`
  - Move: `cubic-bezier(0.25, 1, 0.5, 1)`
  - Drawer (iOS): `cubic-bezier(0.32, 0.72, 0, 1)`
  - Expo out, "for dramatic reveals, card hovers, text reveals": `cubic-bezier(0.19, 1, 0.22, 1)`
  - Press: `cubic-bezier(0.25, 0.46, 0.45, 0.94)`
  - On-screen move: `cubic-bezier(0.645, 0.045, 0.355, 1)`
- Avoid `ease-in` for UI. Built-in `ease`/`ease-out` read as soft.
- Match curve strength to size and frequency: quad or cubic for small or frequent elements, quint or expo for large or rare ones.

**Spatial and sequencing**
- Popover origin sits at the trigger; modals stay centred.
- Entrances start from `scale(0.9-0.96)`, never `scale(0)`.
- Staggers are 30-50ms, total under 300ms, most important element first.
- Paired elements (modal + overlay) share easing and duration.

**Accessibility and performance**
- Gate hover behind `@media (hover: hover) and (pointer: fine)`.
- During direct manipulation, lock the element to the pointer with no easing; ease only after release.
- Pause off-screen loops with IntersectionObserver.
- Toggle `will-change` only while something animates.
- Don't drive a drag through CSS variables on a container.
- Don't start an animation and expensive work in the same tick.

**Anti-patterns**
- Motion on mount with no trigger.
- Hard stops at drag boundaries.
- Container entrance plus a child stagger: pick one.
- Animating every tooltip in a group.
- Scroll-revealing above-the-fold content or every section.
- "Easing or duration on scrubbed motion": scrubbed motion is `linear` with no duration.
- Reduced motion handled only in CSS, which JS-driven motion ignores. The opposite mistake: a global `* { transition: none !important }`.

**Validation**
- Grep for layout transitions and `transition: all`.
- Retoggle quickly and confirm motion retargets.
- Slow playback to 10%.
- Test touch on real devices.
- Reduced motion: replace travel with immediate changes or restrained fades, and pause loops with `animation-play-state: paused` (not `display:none`).

**Scroll animations (reference file)**
- Gate:
  - Product UI gets none.
  - Marketing pages: never scroll-reveal above the fold ("one-time intro animation or nothing").
  - "Cut it to 2-4 moments" rather than revealing every section.
  - It must explain, pace or emphasise something.
- Triggered vs scrubbed: "the wrong choice is unfixable by tuning".
- Triggered reveal:
  - "Reveal once. Never re-animate on scroll-up."
  - `opacity: 0` plus `translateY(10-16px)`, strong ease-out, "400-600ms is right for marketing".
  - Trigger when the element is 10-20% into the viewport (`rootMargin: "0px 0px -10% 0px"`).
  - Sibling stagger "80-120ms", varied by importance ("wave, not a metronome").
  - "Content survives without JS": JS adds the hidden state just before animating.
  - One entrance per container. IntersectionObserver, never a scroll listener.
- Scrubbed:
  - Prefer CSS `animation-timeline: view()` inside `@supports`, e.g. `animation-range: entry 0% cover 40%`.
  - Then `useScroll`. Never a raw scroll listener writing state.
- Parallax:
  - "Keep the differential at or under roughly 15%" between layers.
  - Transform only, scrubbed, decorative only: "never body text".
  - "Skip it on mobile."
- Sticky/scrollytelling:
  - Progress maps monotonically to the sequence and rewinds when scrolling back.
  - Pinned length "at or under roughly 2-3 viewport heights".
  - Skippable by scrolling on.
- "Never hijack scroll": no wheel rewriting, no "one wheel tick = one full-screen slide". Smooth-scroll libraries "trade native responsiveness for a float many users read as lag".
- `will-change: transform` only on scrubbed elements.

**clip-path**
- `inset()` reveal: `clip-path 300ms cubic-bezier(0.22, 1, 0.36, 1)`.
- Image reveal on scroll: `inset(0 0 100% 0)` → `inset(0 0 0 0)`, `800ms cubic-bezier(0.77, 0, 0.175, 1)`, IntersectionObserver `threshold: 0.1, rootMargin: "-100px"`.
- Comparison slider: `clip-path: inset(0 var(--split) 0 0)` updated from pointer events.
- Hold-to-delete: `2s linear` fill, `200ms ease-out` snap back, `scale(0.97)`.
- Tab overlay: `200ms cubic-bezier(0.22, 1, 0.36, 1)`.
- Swap `border-radius` animation for `clip-path: inset(0 round 50px)`.

**Component patterns**
- Button: `scale(0.97)` on `:active` with `transition-duration: 0s`, release over `160ms` enter curve. Stay in "`0.96-0.98`"; `0.9` collapses.
- Toast: `translate3d(0, 6px, 0)`, `220ms`.
- Crossfade: `translateY(8px)` + `blur(4px)`, `150ms ease-out`.
- List stagger: 50ms steps, `220ms`. Never block interaction.
- Hover:
  - Animate a child inside the hovered parent to avoid flicker.
  - Scale `1.01`-`1.02` ("`1.05` is visibly inflated"), 100-150ms, e.g. `scale(1.015)` over `120ms`.
- 3D flip: `400ms` enter curve, `perspective: 1000px`, `backface-visibility: hidden`.
- Content-height crossfade: `delta/500` clamped `0.15`-`0.27`s.

**Contextual animations**
- Word-level entrance: `opacity + translateY + blur` together, `translateY(8px)`, `blur(5px)`, `800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both`.
- Delays: "Section-level 100ms per section", "Word-level 80ms per word", hero headline only.
- Peripheral de-emphasis: siblings go to `opacity: 0.5; filter: blur(2px)` (2-3px, never past ~4px); hovered item `scale: 1.04`; transitions `200ms`/`150ms`.
- Subtle exit: fixed `y: "-12px"`, `{ type: "spring", duration: 0.45, bounce: 0 }`.
- Icon swap: `scale 0.8`, `blur(4px)`, spring `0.2`, bounce 0.

**Springs**
- Ranges: stiffness 100-500, damping 15-40, mass 0.5-2.
- Apple-style default: `{ type: "spring", duration: 0.5, bounce: 0.2 }`.
- Presets:
  - Snappy `500/40`
  - Bouncy `300/20`
  - Gentle `200/30`
  - Stiff `700/50`
- Default to damping `1.0`; use ~`0.8` only after momentum.
- Apple values (damping/response): move `1.0/0.4`, rotation `0.8/0.4`, drawer `0.8/0.3`.
- Asymmetric morph:
  - Open: `stiffness: 155, damping: 11` (ζ 0.44), rest at 584ms.
  - Close: `620/36`, 300ms.
  - "Bounce the open only."
- Mouse-driven values: `useSpring(..., { stiffness: 100, damping: 10 })`, decorative only.
- Snap instead of spring: `{ duration: 0.12, ease: "linear" }`.
- On interruption, start from the presentation value, carry velocity, and run X and Y as separate springs.

**Gesture and drag**
- Velocity flick `> 0.11` px/ms with a minimum of about 20px; check sign before magnitude.
- Momentum projection decay `0.998` (`0.99` snappier).
- Rubber-band past bounds (`constant = 0.55`) or friction `delta * 0.3`; never a hard stop.
- Always `setPointerCapture`, keep the grab offset, commit to an axis after `10px`.
- Detents snap the projected `value + velocity * 0.15` with spring `500/40`.
- CSS carousel: `touch-action: pan-x; overscroll-behavior-x: contain`.

**Transition recipe tokens (`:root`)**
- Morph:
  - open `580ms` with `linear(0, 0.45, 0.78, 1, 1.17, 1.21, 1.18, 1.12, 1.05, 1.02, 1)`
  - close `300ms` with `cubic-bezier(0.32, 0.72, 0, 1)`
  - content `140ms`, `3px` blur
- Dropdown: `250/150ms`, pre-scale `0.96`.
- Modal: `250/150ms`, scale `0.96`.
- Panel: `400/350ms`, `12px`, blur `4px`.
- Page slide: `200ms`, `8px`, blur `3px`, stagger `60ms`.
- Text swap: `150ms`, `4px`, blur `2px`, `ease-in-out`.
- Number pop-in: `500ms`, `12px`, stagger `70ms`, blur `6px`.
- Odometer: `260ms` enter curve; roll only the changed digits; `tabular-nums`.
- Success:
  - `550ms`, rotate `80deg→0`, bob `40px`, blur `10px`, path delay `80ms`
  - bob ease `cubic-bezier(0.34, 3.85, 0.64, 1)`
- Shake (form error): `4px`/`2px`, `80+80+60ms`, `cubic-bezier(0.36, 0.07, 0.19, 0.97)`, hold `1200ms`.
- Drawer: `240ms cubic-bezier(0.25, 1, 0.5, 1)`.

**SVG**
- Line draw: `stroke-dasharray: 1px 1.1px` with `pathLength`, `0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards`. The gap stays slightly larger than the dash because of round caps.
- Never hardcode the dash length; use `getTotalLength()`.
- Ambient float: `translateY 0 to 1.5px over 3s; rotate 0 to 2deg over 4s`, non-syncing durations, initial delay ~2s.

**Performance**
- Cost tiers:
  - Composite: transform, opacity, plus filter/clip-path in current engines.
  - Paint: box-shadow, border-radius, color.
  - Layout: width, height, margin.
- Swaps: `box-shadow` → `filter: drop-shadow`, size → `scale()`.
- Main-thread budget is about 10ms per 16.6ms frame; a long task is "over 50ms".
- Chunk work in 5ms slices with `scheduler.yield()` or `setTimeout` as fallback.
- Pause loops off-screen. Promote layers only while animating.

**Debugging:** change the easing first, then the duration. A cheap feel usually comes from a `scale(0)` start, a wrong origin, a crossfade without blur, mixed clocks, or an exit that is not "roughly 20% faster".

**Review: ten standards**
1. Justified
2. Frequency-appropriate
3. Responsive easing
4. Sub-300ms UI
5. Origin, start at 0.9-0.96
6. Interruptible
7. GPU-only
8. Accessible
9. Asymmetric enter/exit
10. Cohesive

- Remedies in order: delete > reduce > fix easing > origin > interruptible > GPU > asymmetric > polish > accessibility.
- Checklist flags:
  - touch target "under 44px"
  - "Hover scale > 1.03, or a transform hover slower than 150ms"
  - container plus child stagger
  - same bouncy spring on open and close
- Verdict is Block or Approve.

**Decision framework**
- Frequency:
  - "100+ times/day" never animates.
  - Tens of times: reduce it.
  - Occasional: standard motion.
  - Rare: delight allowed.
- Novelty budget: "about 90% expected motion (or none) and 10% novel"; "Do not stack high-novelty beats in consecutive sections."
- "One-shot only": gate first-run flourishes so a reload is instant.
- Discovery pass: 5-7 suggestions plus 2-5 rejections.

**Interface SFX:** gesture-unlocked only, gain "~0.1-0.2", one-shot, skipped under reduced motion. Not planned for v5.

**Choreography:** blur and opacity lead, movement lags ~100ms, over-stretch `scaleY(1.06)` at 70%. The recording-measurement workflow is not relevant to v5.

---

## S0617 open-design/emilkowalski-motion

**Workflow**
1. Inspect the existing artifact first.
2. Pick "the smallest set of motion moments": an entry reveal for the primary content, hover/active feedback on important controls, state transitions, and "scroll reveal only when it helps the story".
3. Use `transform`/`opacity`; never `top/left/width/height`.
4. "One motion language": no mixing of unrelated easings, durations or physics.
5. Add `prefers-reduced-motion` fallbacks for automatic and scroll-linked motion.
6. Keep copy, data and layout intent.

**Rules**
- Controls: "140-220ms".
- Larger reveals can be slower "but must not block reading".
- No endless decorative loops unless they show status.
- "Do not add custom cursors, noisy particle effects, or motion that competes with content."
- "Stagger only small groups."
- With GSAP, pair with timeline/ScrollTrigger for sequencing.
- "Always clean up observers, timers, and animation instances."

---

## S0658 animation-discipline

- **Evidence:** Tversky 2002 found that animation does not beat static for teaching. Its endorsed use is "real-time spatial or temporal reorientation" (transitions, container morphs, viewpoint changes, progress). Don't animate "to teach, decorate, signal 'premium', or fill silence."
- **Durations**
  - 50-100ms: instant feedback.
  - **150ms**: default state confirmation.
  - 200-300ms: entering UI.
  - 300-500ms: cross-screen and container morphs.
  - Over 500ms: staged or cross-screen only.
  - Microinteractions stay under 500ms. Frequent ones (hovers) "≤200 ms". Mobile runs "20–30% shorter".
- **Curves**
  - Use a curve for opacity and colour, a spring for position, scale, rotation and gestures.
  - M3 standard is `cubic-bezier(0.2, 0, 0, 1)`; M2 `cubic-bezier(0.4, 0, 0.2, 1)` is "legacy".
  - M3 emphasized is a two-segment path, so use `linear()`.
  - SwiftUI default: `(response: 0.5, dampingFraction: 0.825, blendDuration: 0)`; presets differ only in bounce (0 / 0.15 / 0.3).
  - motion.dev default ζ≈0.5; React Spring default ζ=0.997.
- **Reduced motion**
  - Strip translate, scale, rotate and parallax. Keep opacity and colour crossfades.
  - View Transitions do not respect it automatically.
  - WCAG 2.2.2 (Level A) requires a pause control for motion "longer than 5 seconds".
  - Vestibular criteria are 2.3.3 (AAA).
  - Flashing: no more than "three flashes within any one-second period" (2.3.1, A).
- **Looping**
  - Carousels pause after "3-5 cycles".
  - Shimmer runs only until content lands.
  - Cancel ambient motion on route change.
  - Reward bursts are one-shot.
  - Spinners stop at 60s.
- **Web:** the View Transitions default is 0.25s with CSS `ease`.
- **Lint list**
  - Myths: skeleton "11% faster", Doherty "400ms" (300ms is measured), Heer & Robertson is "~1 second per stage".
  - M2 curve labelled as M3.
  - Motion that performs a state change instead of confirming it.
  - Over 500ms on non-cross-screen motion.
  - Animation as the only signal of a change.
  - Transform motion that ignores reduced motion.
  - Curve-based physical scale (use a spring).
  - Hero choreography in productivity tools (not our case).

---

## S0634 open-design/motion-lab

**Usage rules**
- Pick the case that matches the goal and don't pile on effects.
- Adapt it to the real DOM: scope selectors, no shared state between instances, units on every parameter.
- Confirm dependencies; don't add several animation frameworks.
- Size Canvas to the container and DPR.
- Clean up rAF, timers and listeners. Throttle scroll work per frame.
- Honour reduced motion and support keyboard, touch and focus.
- The samples are starting points, "不能未经修改作为最终成品" (not to be shipped unmodified).
- Keep the MIT attribution.
- 160 cases: basic, text, interaction, advanced.

**Quality warning (my call):** many samples break S0652. They use scroll listeners, animate `width`, `left/top`, `max-height`, `inset`, `letter-spacing` or `box-shadow`, call `getBoundingClientRect` on every mousemove, start from `scale(0)`, and loop forever. The fixes are noted per case below.

### Catalog: relevant cases

**Scroll and ScrollTrigger**

| Case | Technique and params | Rembrandt use |
|---|---|---|
| gsap-scrollTrigger | `gsap.to(x: 200)` (distance 200px, 50-400), `start: 'top center', end: 'bottom center', scrub: true` | Base scrubbed scene: oversized headline or a row of shingle photos drifting sideways. Add `ease: "none"` |
| scroll-reveal | `opacity:0; translateY(40px)` (10-100), `transition 0.6s`, IO `threshold: 0.2`, adds `.in` | Section heading or photo reveal. Cut to 12-16px with the enter curve; unobserve after firing |
| scroll-parallax | layers `data-d` 0.3/0.6/1, `translateY(rect.top*d*0.3)`, `transition 0.1s`, scroll listener | Layered hero photo (sky, house, roof). Rebuild with ScrollTrigger scrub, no transition, ≤15% differential, off on mobile |
| scroll-progress | fixed bar `height: 4px` (2-10), width % on scroll, `transition: width 0.1s` | Thin "roof progress" line at the top. Use `scaleX` via scrub or CSS `scroll()` |
| sticky-stack | `.card{position:sticky; top:80px; padding:40px; border-radius:16px; margin-bottom:20px}`, count 4 (3-8) | Service or project cards that stack (Roofing / Siding / Gutters / Insurance). Add a scrubbed scale-down (~0.95) and dim on the card underneath |
| drag-scroll | mousedown/move sets `scrollLeft = start - dx`; `cursor: grab/grabbing` | Draggable project strip. Needs pointer events, capture, keyboard and native touch scroll |

**Text effects**

| Case | Params | Use |
|---|---|---|
| mask-reveal | `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)`, `1.2s` (0.4-2.5) `cubic-bezier(0.65, 0, 0.35, 1) forwards` | Hero headline, per line in an overflow wrapper. Strong first-load moment |
| text-split-reveal | `::before` clipped `inset(0 0 50% 0)`, `translateY(-100%)→0`, `1.2s cubic-bezier(0.65, 0, 0.35, 1)` | Two-tone display word that splits open, e.g. "RESTORED" |
| split-char | odd chars from `translateY(-100%)`, even from `100%`, `0.8s ease-out` | One short playful word only, with the parent clipped |
| text-fade-up | `translateY(24px)` (10-60), `0.9s cubic-bezier(0.22, 1, 0.36, 1) both` | Default line or word reveal; matches the S0652 enter curve |
| text-slide-left | `translateX(40px)` (20-100), `0.8s cubic-bezier(0.22, 1, 0.36, 1)` | Side captions entering beside a photo |
| text-word-fly | `translateZ(-200px) rotateY(40deg)` → 0, `0.7s`, stagger `0.12s`, `cubic-bezier(0.22, 1, 0.36, 1)` | Short taglines. The sample needs `perspective` on the parent |
| stagger-fade | `0.5s`, stagger `0.1s` per item | Small chip groups. The `from` keyframe lacks the translate |
| text-char-fall | `translateY(-60px) rotate(-20deg)` → 0, `1.2s cubic-bezier(0.34, 1.56, 0.64, 1)`, `0.1s`/char | "Fun" beat: letters drop like shingles onto a roofline. Once, on one word |
| text-zoom-in | `scale(0.3)` + `letter-spacing 0.3em` → 1 / `-0.02em`, `0.8s cubic-bezier(0.34,1.56,0.64,1)` | Avoid: letter-spacing triggers layout |
| text-blur-reveal | `blur(20px)` + `letter-spacing 0.4em`, `1.2s ease-out` | Use the blur only (≤20px) plus a small scale |
| underline-draw | `::after` `height:3px; bottom:-4px`, `width 0→100%`, `0.8s ease-out` | Link or CTA underline. Swap to `scaleX` with `transform-origin:left` |
| highlight-sweep | gradient bar `translateX(-100%→100%)`, `2.5s` loop, `mix-blend-mode: multiply` | One-shot swipe of brand colour behind a key word |
| text-stroke-animate | SVG `<text>` `stroke-dasharray: 600` → 0, `2.5s ease-out` (sample alternates forever) | Outline display word that "draws" (e.g. "SINCE 19xx"), once |
| text-outline | `-webkit-text-stroke: 2px` | Static outline type, filled by a scrubbed clip |
| count-up | `duration = 1500`, `1 - Math.pow(1 - t, 3)` (easeOutCubic), `tabular-nums`, 900 weight, 48px | Years, roofs completed, review score. Once; real number in the HTML |
| number-marquee | digit track `translateY(-cur*60px)`, `transition 0.5s ease`, slot `height: 60px` | Odometer counter. Pair with the S0652 odometer (`260ms`, changed digits only) |
| scramble | 50ms ticks, resolves 1 char per 3 frames | Skip: techy, off-brand |

**Image and mask reveals**

| Case | Params | Use |
|---|---|---|
| drag-to-reveal | cover `clip-path: inset(0 p% 0 0)`, clamped 0-100, `transition: clip-path 0.2s` | **Before/after** base. Remove the transition while dragging; add pointer capture, keyboard and a handle |
| hover-image-zoom | frame `overflow:hidden`, inner `scale(1.3)` (1.1-2), `0.5s cubic-bezier(0.2, 0.8, 0.2, 1)` | Project tiles. Cut to about 1.04-1.08 (my call) |
| grayscale-in | `grayscale(1) brightness(1.2)`, opacity .4 → normal, `1.2s ease-out` | Restoration story: scrub a weathered photo from grey to colour. Filter is paint-heavy, so keep it to one image |
| blur-in | `blur(14px)` + `scale(1.05)` → 0/1, `0.8s ease-out` | Hero photo settling on load |
| scale-out | from `scale(1.2)` + opacity 0, `0.6s cubic-bezier(0.34, 1.56, 0.64, 1)` | Use the zoom-settle idea on the hero photo, but without the overshoot curve |
| hover-image-distort / fluid-distort | `feTurbulence baseFrequency 0.02 numOctaves 2` + `feDisplacementMap scale 20/24`; fluid animates baseFrequency `0.02;0.04;0.02` over `6s` | Possible "rain on glass" storm beat. Costly on large photos; static under reduced motion |
| border-draw | gradient border via `mask-composite: exclude`, `1.4s` alternate | Thin animated frame on a featured card, at most once |

**Hover and interaction**

| Case | Params | Use |
|---|---|---|
| magnetic-cursor | offset `* 0.4` from centre, `transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)`, reset on leave | Primary CTA "Get a free inspection" |
| magnetic-button | document mousemove, radius `80px` (30-200), factor `0.3` | Magnetic field around the CTA. Cache the rect, rebuild with `gsap.quickTo` |
| hover-magnetic-text | per char, radius `100px`, `0.35`, `0.2s` same curve | Footer wordmark easter egg |
| three-d-tilt | `perspective(600px)`, ±`x*30deg`, `transition 0.2s`, max 15° | Review or testimonial cards, subtle |
| tilt-card-strong | `perspective(800px)`, max `25°`, `0.15s`, reset on leave | Too strong; 6-10° (my call) |
| parallax-mouse | `translate(x*d*20px)`, depth 1/3, `0.2s` | Hero cut-out layers following the mouse, desktop only |
| spotlight-follow | `radial-gradient(circle 220px at x y, rgba(255,255,255,0.25), #111 70%)` | "Flashlight in the attic": a dark photo reveals hidden damage |
| button-press | `scale(0.92) translateY(4px)`, `0.1s`, shadow `0 6px 0` → `0 2px 0` | Use the 3D shadow idea, but scale 0.97 per S0652 |
| hover-lift | `translateY(-8px)`, `0.25s ease`, shadow `0 4px 8px`→`0 16px 32px rgba(0,0,0,0.18)` | Cards; S0652 wants ≤150ms transform hovers |
| hover-text-reveal | hidden label `translateY(100%)→0`, `0.4s cubic-bezier(0.2, 0.8, 0.2, 1)`, overflow hidden | Nav and button text roll |
| hover-flip-card | `perspective: 800px`, `rotateY(180deg)`, `0.6s`, backface hidden | Problem/fix cards. Needs a tap or focus equivalent |
| hover-scale/rotate/skew/glow | scale `1.15`; rotate `30deg` `0.4s`; skew `15deg`; glow `0 0 28px` | Too big; tone reference only |
| ripples / shockwave | `scale(0)→10` `0.6s ease-out`; ring → `scale(8)` `0.8s` | Skip on brand CTAs |
| click-burst / click-emoji-burst | 20 dots travel 40-70px, `0.6s cubic-bezier(0.2,0.8,0.2,1)`; 12 emoji travel 50-80px, `0.7s` | One-shot after a successful quote submit |
| accordion-smooth | `max-height: 0` → `scrollHeight`, `0.4s ease` | FAQ (if any). Prefer measured height or a `grid-template-rows` approach |
| toggle-flip | 64×32 track, knob 24px `translateX(32px)`, `0.35s cubic-bezier(0.4, 0, 0.2, 1)` | Possible styling for the 1\|2\|3 picker |
| range-drag | track 200×6, knob 20px, value = pct × max | A drag-to-compare alternative to the before/after handle |

**Cursor**

| Case | Params | Use |
|---|---|---|
| hover-follow-cursor | lerp `0.1`/frame (0.02-0.3), dot 24px, `cursor: none` within the zone | "Drag" or "View" bubble over before/after and gallery zones only |
| blob-cursor | 40px fixed, `mix-blend-mode: difference`, `transition: transform 0.15s` | Too loud for every page; scope it |
| mouse-trail | 12 dots × 8px, opacity `1 - i/count` | Skip |
| grid-magnetic | 6×12 dots at 24px, radius `100px`, `*0.3`, `0.2s` | A "nail pattern" texture that responds behind a CTA band (fun, optional) |

**Marquee**
- `marquee`: `display:flex; gap:32px`, `translateX(0 → -50%)` over two copies, `12s` (5-30) linear infinite, left or right. Use for a service-area or "Licensed · Insured · Family-owned" strip. It needs a pause control (WCAG 2.2.2), pausing off-screen, and a static version under reduced motion.
- `vertical-marquee`: `15s`, `height: 60px`. A rotating word slot.

**Transitions and entrances (basic)**
- fade-in-up `0.8s ease-out 20px`; fade-in-left/right `24px`; slide-up `0.6s 40px`.
- scale-in from `0.5` with `cubic-bezier(0.34, 1.56, 0.64, 1)`. S0652 says start at 0.9-0.96 and save the overshoot for momentum.
- skew-in `skewX(-15deg) translateX(-30px)`, `0.7s`.
- flip-x/flip-y `perspective(600px) rotate ±90deg`, `0.8s`.
- zoom-bounce, bounce-in and elastic-in (`cubic-bezier(0.68, -0.55, 0.265, 1.55)`) all start from scale 0 or 0.3. Avoid.
- gsap-timeline: overlap position param `'<0.2'`, gap `'+=0.3'`. Pattern for the hero intro sequence.
- gsap-stagger: `from {y:40, opacity:0}`, `duration 0.6, stagger 0.15`. Drop the `repeat:-1` and trim `y`.

**Attention loops** (pulse `1.5s +0.15`, swing `±15deg 1.6s`, jello, wobble, tada, shadow-grow `2s -6px`): at most one, on a "scroll" hint, capped at 3-5 cycles. Never use **flash** (`opacity 1→0.2`, `0.8s` infinite).

**Canvas, SVG, particles (tasteful)**
- svg-draw-path: `stroke-dasharray: 400`, `3s ease-in-out` (alternate loop). Use: a roofline or house silhouette that draws as you scroll (scrubbed, measured with `getTotalLength`). Strong roofing motif.
- svg-dash-animate: dash `8 6`, offset `-28`, `1.5s linear`. Use: a service-area route or gutter-flow line.
- trajectory-path: `getPointAtLength`, `4s` period. Use: a dot travelling the roof edge, scrubbed.
- lottie-checkmark: circle `stroke-dasharray: 276`, mark `60`, `0.8s ease-out`, mark delayed `0.8s`. Use: quote-form success.
- canvas-confetti: `120` particles, `g: 0.3`, `vx ±4`, `vy` up to `-12`, 6px squares. Same success moment, one-shot.
- canvas-snow: `100` flakes, `r 1-4`, speed `0.5-2`, wind `±1`. Could become a subtle rain/hail overlay for a "storm damage" scene. Pause off-screen, honour DPR, off under reduced motion.
- canvas-ocean: 3 sine layers, amp `16/12/8`, freq `0.02/0.03/0.04`, `t += 0.05`. Wave-band divider idea.
- physics-spring: per-frame `v += d*0.12; v *= 0.88`. Integrator for the cursor follower or magnetic return.
- flow-field: 600 particles, step `1.5`, trail fade `rgba(...,0.05)`. Only as faint texture, probably skip.
- metaball: blur `28px` over 6 balls. Skip.

### Skipped (one line each)
- Three.js and shaders (off-brand 3D): three-particles, particle-galaxy, 3d-sphere, 3d-torus, webgl-shader, shader-plasma, shader-fireball, 3d-cube-rotate.
- Generative art or game-like: matrix-rain, fractal-tree, fractal-mandelbrot, voronoi-art, noise-flow, physics-gravity, physics-cloth, particle-fountain, canvas-fireworks, canvas-starfield, sine-wave, ripple-water, drag-rotate.
- App UI: audio-wave, lottie-loader, morph-svg (`setInterval` swap, no tween), color-picker-hover.
- Terminal type: the typewriter family and text-blink-cursor.
- Novelty type and loops: glitch, rgb-glitch, neon (flicker), fire, ice, metallic, rainbow/gradient text, text-3d, the shadow and letter-spacing effects, flip-3d, the wave and bounce text.
- Generic entrances superseded by the enter recipe: the remaining fade, slide, rotate, flip and blur variants, color-cycle.

---

## Applying it to Rembrandt v5

1. **One motion language, as tokens.** Define these once and use them everywhere, never ad hoc:
   - `--ease-enter: cubic-bezier(0.22,1,0.36,1)`
   - `--ease-expo: cubic-bezier(0.19,1,0.22,1)` for reveals
   - `--ease-move: cubic-bezier(0.25,1,0.5,1)`
   - `--ease-mask: cubic-bezier(0.65,0,0.35,1)` / `cubic-bezier(0.77,0,0.175,1)` for clip reveals
   - Durations: 150ms (state), 400-600ms (marketing reveals), 800-1200ms (hero mask only)

   In GSAP, pass the same curves (CustomEase) or close named eases ("expo.out"); the named-ease equivalence is my approximation.
2. **Hero = one-time intro, not a scroll reveal.**
   - Photo settles from `scale(1.15-1.2)` → 1 over ~1.2s expo.
   - Headline lines rise through `clip-path inset(0 0 100% 0)` masks, 80ms per word or line, using the gsap-timeline `'<0.2'` overlap.
   - CTA last.
   - Store a sessionStorage flag so a repeat visit plays a short version ("one-shot only").
3. **Pick 2-4 signature scroll moments, not reveals everywhere.** Each section's 1|2|3 versions differ in which single signature they carry: pinned before/after, sticky card stack, scrubbed roofline draw, horizontal photo drift. Sections in between stay quiet (90/10 novelty, never two pinned scenes back to back).
4. **Triggered reveals:**
   - ScrollTrigger `once: true`, `start: "top 85%"` (≈10-20% into the viewport).
   - `y: 12-16`, `opacity` (blur optional, ≤5px), 500-600ms enter curve.
   - Stagger 80-120ms varied by importance.
   - One entrance per container.
5. **Scrubbed scenes use `ease: "none"` and `scrub: true`.** S0652 bans easing or duration on scrubbed motion. A numeric `scrub: 1` adds lag smoothing; if used for feel, keep it small and deliberate (my call). Pins stay within `end: "+=200%"` to `"+=300%"` (≤2-3 viewport heights), rewind when scrolling back, and never block the scrollbar.
6. **Parallax:**
   - Image inside an `overflow:hidden` frame, scaled about 1.15, moved `yPercent` within roughly ±7% (≤15% differential).
   - Photos only, never text.
   - Disabled under 768px and under reduced motion.
7. **Lenis is optional and on probation.** S0652 says smooth-scroll libraries read as lag and forbids scroll-jacking. If used: near-defaults, synced to ScrollTrigger, off for touch and reduced motion, no wheel-to-slide snapping. A native-scroll build is the safe default.
8. **Before/after:**
   - Two stacked photos; the top one gets `clip-path: inset(0 X% 0 0)` set directly on the element.
   - Pointer events with `setPointerCapture` and the grab offset; locked 1:1 to the pointer with no transition during the drag; snap or ease only on release.
   - Handle is a real `<input type="range">` or `role="slider"` with arrow keys, 44px hit area, `touch-action: pan-y` so the page still scrolls.
   - Variants: a pinned version scrubbed by scroll, and a hover-wipe version.
   - Reduced motion shows the 50/50 split, still draggable.
9. **Cursor effects are scoped.** S0617 bans custom cursors and the brief wants them, so:
   - Keep the native cursor everywhere.
   - Add a lerp-0.1 follower bubble ("Drag", "View") only over before/after and gallery zones.
   - Only under `(hover: hover) and (pointer: fine)`; hidden for touch, keyboard and reduced motion.
10. **Magnetic CTA:**
    - Factor 0.3-0.4, radius about 80px; rect cached on enter and resize.
    - `gsap.quickTo` (~0.3s, approximating `cubic-bezier(0.2,0.8,0.2,1)`); release with a damped spring (`bounce 0`/damping 1.0).
    - Press `scale(0.97)` at 0ms. Inner label moves ~0.5× more than the button for depth (my call).
11. **Counters only where meaningful** (years in business, roofs, rating):
    - easeOutCubic over 1500ms, `tabular-nums`, once.
    - Final value written in the HTML so it shows without JS and under reduced motion.
    - Odometer variant: 260ms per changed digit.
12. **Hover discipline:**
    - Card transform hovers at 100-150ms, `scale(1.015)`.
    - Inner photo zoom inside the clip may run longer (marketing/illustrative, ≤1000ms) at ≤1.08.
    - Colour hovers 200ms; siblings de-emphasise to 0.5 opacity / 2px blur.
    - Everything behind the hover media query.
13. **The 1|2|3 picker is UI, so it runs at UI speed:**
    - Segmented control with a clip-path or translate indicator, 200ms enter curve.
    - Version swap as a crossfade, 150-200ms, 8px offset, blur(3-4px), direction-aware (2→3 slides left).
    - On swap: `ctx.revert()` the old version's gsap.context, then `ScrollTrigger.refresh()`.
    - No intro replay inside a swapped section.
14. **No hidden content without JS.** No `opacity:0` in CSS. JS adds an `.js-motion` class and uses `gsap.set` just before animating, so a broken CDN still shows a complete page.
15. **Reduced motion through `gsap.matchMedia()`:**
    - All translate, scale, parallax, pin and scrub sits under `(prefers-reduced-motion: no-preference)`.
    - The reduce branch keeps opacity fades of 150-200ms or none, static before/after, frozen marquee, counters at their final value.
    - A CSS-only gate is not enough (S0652).
16. **Loops:**
    - Marquee at 20-30s linear with a visible pause button and pause on hover/focus (WCAG 2.2.2, over 5s).
    - IntersectionObserver pause off-screen.
    - No `flash`, glitch or neon flicker (3-flashes rule).
    - Confetti or checkmark only once, on quote success.
17. **Performance:**
    - Animate only transform, opacity and clip-path.
    - `will-change` only on pinned or scrubbed layers.
    - No scroll listeners (ScrollTrigger or IntersectionObserver only).
    - No per-mousemove `getBoundingClientRect`.
    - At most one optional canvas (rain), paused off-screen and DPR-aware.
    - Heavy SVG filters only at small size.
    - Mobile durations about 20-30% shorter.
18. **Roofing-specific fun:**
    - Scrubbed SVG roofline draw (`getTotalLength`) framing the hero or process section.
    - Letters dropping like shingles on one word (char-fall, 0.1s per char, once).
    - Weathered-to-restored grayscale scrub on one photo.
    - "Flashlight" spotlight reveal of attic damage as one optional variant.
19. **Exits quieter than entrances.** Fixed -12px or a fade, about 20% faster. Mobile menu: drawer `cubic-bezier(0.32,0.72,0,1)`, 240-500ms, opening from its trigger.
20. **Review gate before shipping.** Run S0652's ten standards and validation list:
    - grep for `transition: all`, width/left animation, `ease-in`, `scale(0)`
    - 10% slow-motion pass
    - real-phone test
    - reduced-motion walkthrough
    - Before/After/Why table and a Block/Approve verdict

---

## Reading log

- **Read in full:**
  - S0652 ui-animation, lines 245633-249109: SKILL body, SOURCES, and all 18 reference files (choreography, clip-path, code-output, component-patterns, contextual, curve-fitting, debugging, decision-framework, gesture-drag, interface-sfx, measurement, performance, review-format, scroll-animations, spring-animations, svg-animation, transition-recipes, vocabulary).
  - S0617 emilkowalski-motion, lines 226092-226130.
  - S0658 animation-discipline, lines 249456-249615.
- **S0634 motion-lab, lines 234064-241343:**
  - Read the SKILL body, SOURCES, the full 160-row index, and every case in advanced (38), basic (42), interaction (40) and text (40), all with params, HTML, CSS and JS.
  - The advanced cases were read raw. Basic, interaction and text were read through a local compaction script that collapsed each JSON param block to one line (key=default [min-max] unit) and dropped blank lines; no code lines were dropped.
- **Skipped:** nothing unread. Game, dashboard, generative-art and novelty-type cases appear only as one-line skips above. The upstream `references/license.md` named in S0634 is not in the library file (the section ends at line 241343), so there was nothing to read.
