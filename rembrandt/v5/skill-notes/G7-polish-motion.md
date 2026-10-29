# G7 — Interaction polish and motion foundations (working notes)

Source: `/root/.claude/uploads/43c9e22a-5230-526e-a737-ae81faad601a/5682dcd4-WEB-SKILLS_2.md`, used only as reading material. Values in backticks are quoted verbatim from the library. Anything marked "(my note)" or "(my mapping)" is mine, not the skill's.

---

## S0075 better-ui

**Stance.** "The values below are exact, not ranges to approximate. `cubic-bezier(0.2, 0, 0, 1)` is not `cubic-bezier(0.4, 0, 0.2, 1)`, and `0.96` is not `0.95`." Only the optical nudges and the concentric-padding cutoff are judged by eye. A polish finding never outranks a broken interaction. If the project does the same detail two different ways, that is a finding.

**Surfaces**
- Concentric radius: `outerRadius = innerRadius + padding + borderWidth`. Past `24px` of padding, or where the padding is deliberately asymmetric, treat the layers as separate surfaces. Example: `.card { border-radius: 20px; /* 12 + 8 */ padding: 8px }`, `.card-inner { border-radius: 12px }`.
- Optical alignment: the icon side gets `2px` less padding (`padding-inline-start: 16px; padding-inline-end: 14px`). Play triangle: `transform: translateX(2px)`. Fix asymmetric glyphs in the SVG first, then fall back to `translate-x-px`.
- Shadows for elevation, borders for structure. Keep borders on dividers, table cells, selected states and form inputs, since inputs need 3:1 non-text contrast. Forced-colors mode drops box-shadow, so keep `border: 1px solid transparent` under a shadow ring.
- Light shadow recipe: `--shadow-border: 0px 0px 0px 1px oklch(0 0 0 / 0.06), 0px 1px 2px -1px oklch(0 0 0 / 0.06), 0px 2px 4px 0px oklch(0 0 0 / 0.04)`. Hover: `0px 0px 0px 1px oklch(0 0 0 / 0.08), 0px 1px 2px -1px oklch(0 0 0 / 0.08), 0px 2px 4px 0px oklch(0 0 0 / 0.06)`. Dark: `0 0 0 1px oklch(1 0 0 / 0.08)`, hover `0 0 0 1px oklch(1 0 0 / 0.13)`. Animate it with `transition-property: box-shadow; 150ms; ease-out`.
- Image outline: `outline: 1px solid var(--image-outline); outline-offset: -1px`, using `oklch(0 0 0 / 0.1)` in light mode and `oklch(1 0 0 / 0.1)` in dark. Never a tinted neutral, palette near-black (`#111827`) or the accent. Skip transparent artwork such as logos.

**Motion**
- Use transitions, not keyframes, for interactive state, because transitions retarget mid-flight. Keyframes are only for one-shot sequences.
- Press: scale to `0.96` over `150ms` with `ease-out`, using `.button:not(:disabled):active { scale: 0.96 }`. A disabled button never scales. Provide a `static` opt-out.
- High-frequency feedback (keystrokes, row hovers, tab switches) is instant, or `150ms` or less on `opacity`/`background-color`. Example: `transition: background-color 100ms ease-out`. Expressive motion is reserved for first load, success and empty states. Every animated change also leaves a static cue (color, icon or label).
- Staged entrance: split into semantic chunks staggered `100ms`. Each chunk enters with opacity, `4px` blur and `12px` translateY over `300ms` with `ease-out`. A short display headline can be split into words staggered `80ms`. Never stagger routine interactions.
- Exit: opacity, `4px` blur and a fixed `-12px` translateY over `150ms` with `ease-out`. A full slide-out (`x: "-100%"`, `0.2s`) is only for exits where the destination carries meaning, such as a drawer.
- Icon cross-fade: scale `0.25`→`1`, opacity `0`→`1`, blur `4px`→`0px`. As a spring: `{ type: "spring", duration: 0.3, bounce: 0 }`, and "bounce is always `0`". In CSS, keep both icons in the DOM (one grid cell, `[grid-area:1/1]`) over `300ms` with `cubic-bezier(0.2, 0, 0, 1)`. Animate play/pause, copy/copied and loading/success. Do not animate tab or nav icon swaps, or decorative icons.
- Reduced motion: the opacity fade runs for everyone (`transition: opacity 150ms ease-out`). Movement, scale and blur join only under `prefers-reduced-motion: no-preference` (`opacity, translate, scale, filter; 300ms`). The fallback is a cross-fade, never an instant removal.
- For entrances from `display:none`, use `@starting-style` with `transition-behavior: allow-discrete`, `150ms` close and `300ms` open.
- Theme switch: suppress all transitions for one frame.
- Never `transition: all`. Add `will-change` only after you see stutter, naming transform, opacity or filter. On a transform it makes the element the containing block for `position: fixed` children.
- Hover styles go inside `@media (hover: hover)`, plus `-webkit-tap-highlight-color: transparent`. Overlays get `overscroll-behavior: contain`.
- Icon stroke: `1.5px` at 400 weight, `2px` at 500–600, `2.5px` at 700. Icons are `1em`–`1.25em` and use `currentColor`, outline by default and fill when active.

**Required report format.** Group by principle and order by severity, one row per root cause:

| Severity | Location | Before | After | Why |

`HIGH` means a broken interaction, motion that ignores reduced motion, or a state carried by motion alone. `MEDIUM` is a visible inconsistency. `LOW` is isolated polish. End with `Block` if any HIGH remains, otherwise `Approve`. If nothing is found, say "No actionable UI-polish findings". Replay motion at 10% speed and mark anything unchecked as `Not verified`.

---

## S0189 make-interfaces-feel-better

A short community version of S0412.
- Concentric radius: `outer radius = inner radius + padding`. With large padding, treat the layers as separate surfaces ("optical coherence, not formula worship").
- Optical alignment for play triangles, arrows and stars: fix the SVG, or nudge by a pixel.
- Borders for separation and focus rings. Layered transparent shadows for depth.
- Text: `text-wrap: balance` on headings and short titles. `text-wrap: pretty` on short-to-medium body text, captions and list items. Use neither on long prose or code. `font-variant-numeric: tabular-nums` on counters, timers and prices.
- `html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`
- Image outline: `outline: 1px solid rgba(0, 0, 0, 0.1); outline-offset: -1px`, dark `rgba(255, 255, 255, 0.1)`. Never brand-tinted.
- Motion defaults:
  - Enter: opacity plus a small translateY, optionally blur.
  - Exit: "shorter and quieter than enter, usually 150ms".
  - Press: `scale(0.96)`, with a way to disable it.
  - Icon swaps cross-fade opacity, scale and blur.
- Example transition list: `transition-property: transform, background-color, box-shadow; transition-duration: 150ms; transition-timing-function: ease-out;`. Never `transition: all` or `will-change: all`.
- Hit areas: at least `40x40px`, ideally `44x44px`. Expand with a pseudo-element, and never let hit areas overlap.
- Review output is a table, `| Principle | Before | After |`. Omit principles you checked but did not change.
- Checklist ends with: hover/active states tactile without exaggerated motion; enter/exit "split, subtle, and interruptible".

---

## S0412 jakubkrehel/make-interfaces-feel-better

**Method.** Express every fix in the project's existing styling system and never introduce a second one. Review by replaying motion "at 10% speed" in the Animations panel and walking hover, focus, active, loading and empty states.

**The 19 principles (exact values)**
1. Concentric radius: `outerRadius = innerRadius + padding`. "Mismatched radii on nested elements is the most common thing that makes interfaces feel off". Above `24px` of padding, choose each radius independently.
2. Optical alignment: `icon-side padding = text-side padding - 2px` (`padding-left: 16px; padding-right: 14px`). Play icon: `margin-left: 2px`.
3. Shadows for elevation, borders for structure. Same three-layer `--shadow-border` recipe as S0075 (light `0.06/0.06/0.04`, hover `0.08/0.08/0.06`; dark a single ring at `0.08`, hover `0.13`). Not for dividers.
4. Interruptible animations: transitions for state, keyframes for one-shot sequences. Drawer example: `transform 200ms ease-out`.
5. Split and stagger infrequent entrances "by ~100ms". Titles can split into words at "~80ms". CSS example: `fadeInUp 400ms ease-out`, delays `0/100/200ms`.
6. Subtle exit: a small fixed translateY (`-12px`). "Exit duration should be shorter than enter duration (150ms vs 300ms)". Use `ease-out` for both enter and exit. Remove immediately when motion adds no information, when the interaction repeats often, or under reduced motion.
7. Contextual icons: "exactly these values": scale `0.25` → `1` ("never use `0.5` or `0.6`"), opacity `0`→`1`, blur `4px`→`0px`, `{ type: "spring", duration: 0.3, bounce: 0 }`, "bounce must always be `0`". With no motion library, cross-fade with CSS using `cubic-bezier(0.2, 0, 0, 1)` and one icon absolutely positioned.
8. Font smoothing `antialiased` at the root, once.
9. `tabular-nums` for updating numbers: counters, timers, prices, scoreboards and animated number transitions. Not for phone numbers, zip codes or decorative large numbers.
10. `text-wrap: balance` on headings (only works for 6 lines or fewer in Chromium, 10 in Firefox). `pretty` on body text. Neither on text of 10+ lines.
11. Image outline: pure black `oklch(0 0 0 / 0.1)`, pure white `oklch(1 0 0 / 0.1)`. A tinted outline "reads as dirt on the image edge".
12. Scale on press: "Always use `0.96`. Never use a value smaller than `0.95`". Use a `static` prop opt-out (`active:not-disabled:scale-[0.96]`).
13. `initial={false}` on `AnimatePresence` for state swaps (icon swaps, toggles, tabs, segmented controls). Never on intentional entrances.
14. Never `transition: all`.
15. `will-change` only for transform, opacity and filter, and only after first-frame stutter. "Safari in particular benefits". Each layer costs memory.
16. Hit area: `44×44px` for touch, at least `40×40px` in dense desktop UI. Extend with a centred `::after` (`width: 44px; height: 44px; transform: translate(-50%,-50%)`). Collision rule: shrink it rather than overlap another control.
17. Icon stroke `1.5px` at 400, `2px` at 600 (`2.5px` at 700 or standalone). Never mix icon libraries.
18. One SVG with `currentColor`. Disabled `opacity: 0.4`.
19. Motion restraint: "Motion is a budget, not a garnish". No custom animation on high-frequency interactions (≤150ms opacity or background-color at most). Motion is never the only feedback. "Brief and precise beats prominent".

**Required review format**
- Modes: `quick` covers the primary path, HIGH and MEDIUM only, capped at 5. `full` is the default, capped at 15.
- A Scope and Coverage table, `| Category | Evidence inspected | Result |`, covering all five categories: Typography, Surfaces, Animations, Icons, Performance.
- Findings grouped by principle, `| Severity | Location | Before | After | Why |`. Never write separate "Before:" and "After:" lines. Consolidate systemic issues into one row.
- `| Location | Candidate | Rejected because |`: 1–3 rows in quick mode, 2–5 in full.
- Verification lists the commands run, plus "Not verified" for anything unchecked. Verdict: `Block` if any HIGH remains, `Needs changes` for MEDIUM or LOW only, `Approve` when nothing actionable remains. If there are no findings, say "No actionable interface-polish findings".

---

## S0059 emil-design-eng

**Philosophy.** Taste is trained. Unseen details compound. Beauty is leverage.

**Required review format.** One markdown table, `| Before | After | Why |`, one row per issue. Never "Before:/After:" lines. Example rows: `transition: all 300ms` → `transition: transform 200ms ease-out`; `scale(0)` → `scale(0.95); opacity: 0`; no `:active` → `scale(0.97)`; popover `transform-origin: center` → `var(--transform-origin)` (modals exempt).

**Animation decision framework, in order**
1. Should it animate? It depends on how often the user sees it.

   | Frequency | Decision |
   | --- | --- |
   | 100+ times a day | "No animation. Ever." |
   | Tens of times a day (hover, list navigation) | "Remove or drastically reduce" |
   | Occasional (modals, drawers, toasts) | Standard animation |
   | Rare or first-time (onboarding, celebrations) | "Can add delight" |

   Never animate keyboard-initiated actions.
2. Purpose. Valid answers: spatial consistency, state indication, explanation, feedback, preventing jarring changes. "It looks cool" on a frequently seen element means don't animate.
3. Easing.
   - Entering or exiting → `ease-out`
   - Moving or morphing on screen → `ease-in-out`
   - Hover or color change → `ease`
   - Constant motion (marquee, progress) → `linear`
   - Default → `ease-out`

   Use custom curves: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`, `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`. "Never use ease-in for UI animations." Source curves from easing.dev or easings.co rather than hand-rolling them.
4. Duration: press `100-160ms`, tooltips `125-200ms`, dropdowns `150-250ms`, modals and drawers `200-500ms`, marketing "Can be longer". "UI animations should stay under 300ms."

**Springs.** Use them for drag with momentum, alive elements, interruptible gestures and decorative mouse-tracking. Mouse tracking: `useSpring(mouseX * 0.1, { stiffness: 100, damping: 10 })`. That is fine because it is decorative, and it would be wrong on functional data. Apple style: `{ type: "spring", duration: 0.5, bounce: 0.2 }`. Physics style: `{ mass: 1, stiffness: 100, damping: 10 }`. Bounce `0.1-0.3`, used only for drag-to-dismiss and playful moments. Springs keep their velocity when interrupted.

**Components**
- Press: `transform: scale(0.97)` with `transition: transform 160ms ease-out`, in the range 0.95–0.98.
- Never animate from `scale(0)`. Start from `scale(0.9)` or higher, usually `0.95` plus opacity 0.
- Popovers scale from their trigger. Modals stay centred.
- Tooltips: `125ms ease-out`, from `scale(0.97)`. Subsequent tooltips open instantly with `transition-duration: 0ms`.
- Blur masks a bad cross-fade: `filter: blur(2px); opacity: 0.7` over `200ms ease`. Keep blur "under 20px" because of the cost in Safari.
- `@starting-style` for entry. Example toast: `400ms ease` from `translateY(100%)`.

**Transforms and clip-path**
- `translateY(100%)` uses the element's own size, so prefer percentages.
- `scale()` scales children too.
- 3D works with `preserve-3d`.
- clip-path: `inset(0 100% 0 0)` hidden → `inset(0 0 0 0)`.
- Hold-to-delete: `2s linear` on press, `200ms ease-out` on release.
- Scroll image reveal: from `inset(0 0 100% 0)`, with `useInView { once: true, margin: "-100px" }`.
- **Comparison slider:** "Overlay two images. Clip the top one with `clip-path: inset(0 50% 0 0)`. Adjust the right inset value based on drag position. No extra DOM elements needed, fully hardware-accelerated."
- Tabs: duplicate the list and clip the active copy.

**Gestures**
- Velocity dismissal: `Math.abs(swipeAmount) / timeTaken`, and `velocity > 0.11` dismisses regardless of distance.
- Damp drags past the boundaries.
- Pointer capture.
- Multi-touch guard: `if (isDragging) return`.
- Friction instead of hard stops.

**Performance**
- Animate only transform and opacity.
- Don't drive transforms through a parent CSS variable. Set `element.style.transform` directly.
- Motion's `x/y/scale` shorthands run on rAF on the main thread. Use the full transform string.
- CSS animations beat JS under load.
- WAAPI example: `{ duration: 1000, fill: 'forwards', easing: 'cubic-bezier(0.77, 0, 0.175, 1)' }`.

**Accessibility.** Reduced motion means "fewer and gentler animations, not zero". Keep opacity and color, drop movement. Gate hover with `@media (hover: hover) and (pointer: fine)`.

**Sonner lessons**
- Match motion to the component's personality. "A playful component can be bouncier."
- Asymmetric timing: slow where the user is deciding, fast where the system responds.
- Stagger "30-80ms between items" (`translateY(8px)`, `300ms ease-out`). Never block interaction during a stagger.
- Debug at 2-5x duration, on real devices, and look again the next day.

Checklist: UI over 300ms → 150–250ms; exit faster than enter.

---

## S0104 interaction-design

**Principles.** Purposeful motion means feedback, orientation, focus and continuity.

**Timing**

| Duration | Use |
| --- | --- |
| `100-150ms` | micro-feedback |
| `200-300ms` | toggles, dropdowns |
| `300-500ms` | modals, page changes |
| `500ms+` | choreographed sequences |

**Easing tokens (a different set from Emil's)**
- `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`
- `--ease-in: cubic-bezier(0.55, 0, 1, 0.45)`
- `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`
- `--spring: cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot, playful)

**Springs and presets**
- Button: `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`, `{ type: "spring", stiffness: 400, damping: 17 }`.
- Card hover: `{ scale: 1.02, y: -4 }`.
- Toggle thumb and layout indicators: `stiffness: 500, damping: 30`.
- CSS-spring presets: default `170/26`, gentle `120/14`, wobbly `180/12`, stiff `210/20`, slow `280/60`, molasses `280/120` (stiffness/damping, mass 1).
- Scroll progress: `useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })`.

**GSAP (the stack we use)**
- Hero timeline: `defaults: { ease: "power3.out" }`. Title `y: 50, opacity: 0, duration: 0.8`. Subtitle `y: 30, duration: 0.6` at `"-=0.4"`. CTA `scale: 0.8, opacity: 0, duration: 0.4` (my note: the 0.8 start breaks the ≥0.9 rule in S0059 and S0060). Wrap in `gsap.context(..., ref)` and call `ctx.revert()` on cleanup.
- Parallax: `yPercent: -20, ease: "none"`, `start: "top bottom", end: "bottom top", scrub: true`.
- Content: `opacity:0, y:50, stagger:0.2`, `start:"top 80%", end:"top 20%", scrub:1`.
- SplitText chars: `y: 50, rotateX: -90, stagger: 0.02, duration: 0.8, ease: "back.out(1.7)"`, then `split.revert()`.

**Patterns**
- Ripple with `600ms` cleanup.
- Swipe dismiss when offset exceeds `100`.
- Skeleton `animate-pulse` (`2s ease-in-out infinite`).
- Card hover `translateY(-4px)` with `box-shadow: 0 12px 24px rgba(0,0,0,0.1)` over `0.2s ease-out`.
- Loading button text and spinner swap: `y: 10` → `0` → `-10`.
- Submit button states idle/loading/success/error, reset after `2000ms`, with a `[1, 1.05, 1]` pulse.
- Floating label over `200ms`.
- **Shake on error**: `x: [0, -10, 10, -10, 10, 0]` over `0.4s`. The error text enters from `y: -10`.
- Character count pulses `[1, 1.1, 1]` near the limit.
- Toast enters from `y: 20, scale: 0.95` and exits `x: 100`, auto-dismiss at 3000ms.
- Confirm button resets after `3000ms`.
- Hamburger morph `0.2s`.
- Like button `[1, 1.3, 1]` with a count flip.
- Pull-to-refresh threshold `60`, `dragElastic top 0.5`.

**Scroll reference**
- IntersectionObserver with `threshold 0.2`, triggered once.
- Framer parallax `y 0%→50%`, `opacity [0,0.5]→[1,0]`, `scale 1→1.2`.
- Horizontal scroll inside a `300vh` sticky section.
- Word reveal `delay i*0.05, 0.3s`, list `i*0.1, 0.5s`.
- Clip reveal `inset(0 100% 0 0)`→`inset(0 0% 0 0)`, `0.8s`, `[0.16, 1, 0.3, 1]`.
- Sticky fade `[1,1,0]` with scale `[1,1,0.8]`.
- Lenis: `duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
- Scroll snap: `y mandatory`.
- Throttled scroll handler `16ms`, passive listener.

**Conflicts to note (my note).** Several examples here break the stricter skills:
- `transition-all duration-700`
- the global `0.01ms` reduced-motion kill (the others say gentler, not zero)
- a success icon animated from `scale: 0, rotate: -180`
- `whileTap={{ scale: 0.9 }}` on Like
- `0.98` press

When they conflict, follow S0075, S0412, S0059 and S0060.

Best practices: transform and opacity; respect reduced motion; a consistent timing scale; interruptible; progressive enhancement; never block input; clean up listeners.

---

## S1448 micro-interaction-spec

- Framework: **Trigger** (user action, system event or condition) → **Rules** (logic, sequence, branching) → **Feedback** (visual, motion, audio, haptic) → **Loops and Modes** (repeat behaviour, change over time, first-time vs repeat, progressive disclosure).
- Common cases:
  - toggle with state animation
  - pull-to-refresh with progress
  - like with celebration
  - inline form validation
  - button press with "depth/scale response"
  - swipe with threshold feedback
  - long-press with radial progress
- **Required spec format, per interaction:** name, trigger, rules (sequence), feedback (visual/audio/haptic), duration/easing, loop behaviour, accessibility considerations.
- Rules: every micro-interaction has a purpose; "Keep durations short (100-500ms for most)"; immediate feedback; reduced motion; test on target devices.
- Scope: one interaction at a time. Motion craft alone goes to `animation-principles`, multi-state components to `state-machine`.
- (my note) Use for the handoff: the "Loops and Modes" field forces first-time vs repeat behaviour to be specified, e.g. whether an entrance replays on revisit. Every audio or haptic feedback channel also needs a visual one.

---

## S0212 design-spells

- Purpose: lift "functional" UI into "magical" through details: clever hovers, creative loaders, surprising transitions, easter eggs.
- Workflow:
  1. Identify the boring standard parts (submit button, profile photo, scroll indicator, pricing toggle).
  2. Research patterns ("magnetic hover magic", "physics-based interactions", "fluid scroll surprises").
  3. Adapt them to the brand and the core narrative.
  4. Implement with measured smoothness. "Frame-rate claims require profiling rather than a guarantee."
- Strict rules:
  - Scoped enhancement. It is optional, and "ordinary clear behavior is valid".
  - "Delight, Don't Distract". It must "feel expensive and highly crafted".
  - "A broken or janky 'spell' is worse than none." It must be GPU-accelerated, cause no layout shift, support keyboard and touch, and respect `prefers-reduced-motion`.
- Limits:
  - References are inspiration, not permission to copy protected assets or add packages.
  - Core actions must stay usable without animation, hover or easter eggs.
  - Never hide essential affordances behind decorative interactions.

---

## S0340 diip3sh/feel

**The one rule.** "Every motion comes from a physical model: mass, stiffness, damping and forces. No hand-picked durations."
- No `transition … 300ms`, `cubic-bezier` or `duration:`, and no timers that move things.
- A tap is a target change (spring) or an impulse (field).
- "A drag sets a hand, not a position. Release keeps the body's real velocity."
- Release decisions (which side, which stop) come from where the body would coast, `x + v·m/c`, or from forward simulation. Never from a millisecond threshold.
- If CSS forces a duration, compute it from the model and say so in a comment.

**Failure modes**
- "Tween in disguise": a spring whose target snaps on a timer, or that throws away release velocity.
- "Untuned physics": numbers typed until they look fine. Start from words and write one sentence of justification per number.

**Sizing**
- Interaction (one body: toggle, press, card lift, slider thumb): 20–45 min.
- Gesture system (several bodies or a field: sheet with stops, carousel): 1–3 h.
- Motion system: half a day or more. Don't start it; propose the 3 key interactions instead.

**Words to physics, worked example.** "*frequency 1.35 Hz:* slow enough to read as weight; *ζ 0.74:* a 3% overshoot, the thump of something landing; *mass 3:* lags a fast drag by a few px and coasts 80 px per 1000 px/s."

**Models**
- Spring to a target: discrete states chosen by code.
- Field (magnets, friction, walls): anything thrown. A field has no target.
- Walls at the ends of travel: rubber-banding, where the wall catches the overshoot.
- Plane (`Body2D`): thrown in both axes, snapping to corner points.
- Angle: knobs, with detents as magnets in degrees.

**Craft rules**
- Name the model in one sentence before coding, e.g. "a 3-unit mass on a 1.35 Hz spring with ζ 0.74; the track walls catch the overshoot".
- "Mass is felt in interaction, frequency and damping in motion", so a weight demo needs a drag.
- Visuals derive from state, not time: fill from position, stretch from speed, shadow from height.
- Overshoot belongs to the thing: never draw a thumb outside its track.
- Interruptible by construction: never reset velocity on grab, never queue animations.
- Keyboard reaches every state. `prefers-reduced-motion` jumps straight to rest.

**Runtime facts**
- Units are px (or degrees) and seconds. Mass 1 is a normal UI element.
- One shared rAF loop that stops when everything is settled.
- The CSS handoff is simulated at 240 Hz and simplified within 0.2 px.
- "the 60 ms rule zeroes stale velocity at release".
- Settle is measured at ±2% of the move.
- A card that tilts while it flies needs a second body driven by the first one's velocity.

**Verification by hand**
- a slow drag, a hard flick, a flick the wrong way, a release at exactly halfway
- a grab mid-motion, which must not jump
- keyboard only
- reduced motion

(The runtime `Feel.*`, `scripts/audit.mjs` and the references are described but not included in the library. Read only, not used.)

---

## S1445 interfaces-that-feel

**Lens.** Does it feel like a human thought about how you'd feel?
1. Name the felt state.
2. Find a physical analogue: "Soft surfaces absorb impact… The slow release of a door".
3. Extract the behavioural property: weight, resistance, speed, recovery arc, rhythm.
4. Apply it to a layer: easing, delay, copy tone, color temperature, spacing, duration.

**Emotional timing**
- Heavy news arrives slowly; good news can be instant.
- **Recovery space:** "after an error, give the user 300–600ms before the next prompt".
- Never shame the user for a system error.
- Acknowledge micro-wins; "Celebration arc".
- Loading sets mood.

**Copy voice by state**
- Loading: "present and calm" ("Getting your data", not "Loading...").
- Empty: invitational.
- User error: clear, directive, blame-free, with one next step.
- System error: own it and apologize briefly.
- Success: "Warm and brief".
- Onboarding: contextual.

**Motion as signal**
- Ease-out reads as "something soft landing". Ease-in reads as weight and momentum.
- "Linear is mechanical — avoid it for anything that touches human feeling."
- "a stiff spring is snappy and confident; a loose spring is playful and forgiving."
- Durations: "150–300ms for UI response. 400–600ms for transitions that carry meaning."

**Checklist**
- What is the person feeling?
- Is it acknowledged?
- Does the copy sound human?
- Does the motion convey intent or just fill time?
- Would the signal survive with no color or imagery?

"Reduce motion before adding it". "The absence of friction is not warmth — warmth is active."

---

## S0060 animate

**Posture.** Construction, Emil's bar. Two failure modes: animating what shouldn't animate (worse), and the wrong ingredients. "Never present motion options as a menu. Make the call."

**Hard rules**
1. Run the sequence in order.
2. No approximated values, e.g. never invent `cubic-bezier(0.4, 0, 0.2, 1)`.
3. Extend existing tokens; never fork them.
4. Reduced motion and hover gating ship with the animation.
5. Use the cheapest tool that works.

**Sequence**
1. Frequency gate (same tiers as S0059). Keyboard actions are "a disqualifier".
2. Name the purpose: Feedback, Spatial consistency, State indication, Preventing a jarring change, Explanation (marketing only), or Delight (rare tier only). Data the user reads should not move for style.
3. Tool:
   - CSS transition: hover, press, toggles.
   - `@starting-style`: mount entry.
   - CSS animation: predetermined motion during load.
   - WAAPI: programmatic control.
   - Motion: springs, layout, exit, gestures.

   (Our stack is GSAP, given by the brief.)
4. Properties:
   - Only `transform` and `opacity`. `clip-path` is "the sanctioned fourth", and `height` only for accordions.
   - Never `scale(0)`: start from `scale(0.9–0.97)` plus `opacity: 0`.
   - Origin at the trigger (modals exempt). Percent translates.
   - Never drive a child's transform from a parent CSS variable.
5. Easing and duration:
   - Easing: enter/exit `ease-out`, moving `ease-in-out`, hover `ease`, constant `linear`, default `ease-out`. Never `ease-in`. Tokens `cubic-bezier(0.23, 1, 0.32, 1)`, `cubic-bezier(0.77, 0, 0.175, 1)`, `cubic-bezier(0.32, 0.72, 0, 1)`.
   - Duration: press 100–160, tooltip 125–200, dropdown 150–250, modal/drawer 200–500. UI under 300ms.
   - Springs: `{ type: "spring", duration: 0.5, bounce: 0.2 }` or `{ mass: 1, stiffness: 100, damping: 10 }`, bounce 0.1–0.3.
6. Interruption:
   - Transitions for anything fired rapidly. Springs for gestures.
   - "Exit the way it entered".
   - Asymmetric timing: hold `2s linear`, release `200ms ease-out`.
7. Reduced motion and `@media (hover: hover) and (pointer: fine)`.

**Recipes (exact)**
- Button: `transform 160ms var(--ease-out)` with `:active scale(0.97)`.
- Popover: `200ms`, from `scale(0.95)`, origin at the trigger.
- Tooltip: `125ms`, from `scale(0.97)`, `[data-instant] 0ms`.
- Modal: `250ms`, from `scale(0.96)`, `transform-origin: center`, backdrop opacity `250ms`.
- Drawer: `transform 500ms var(--ease-drawer)` from `translateY(100%)`.
- Toast: `400ms ease` from `translateY(100%)` via `@starting-style`.
- Accordion: `height 200ms` plus `opacity 200ms`, height measured in JS.
- Stagger: `translateY(8px)`, `300ms`, delays `50/100/150ms`.
- Hold-to-confirm: clip `2s linear` with `scale(0.97)`.
- Tabs: clip `250ms var(--ease-in-out)`.
- **Scroll reveal:** `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)`, `600ms var(--ease-in-out)`. "Marketing surfaces only". Fire once (`once: true, margin: "-100px"`). "re-animating on every scroll-by is an interface fighting its reader".
- Drag-to-dismiss:
  - velocity `> 0.11`
  - pointer capture
  - multi-touch guard
  - damping and friction at the edges
  - settle with `{ type: "spring", duration: 0.5, bounce: 0.2 }`
- Blur mask: `blur(2px) opacity 0.7`, `200ms ease`.
- WAAPI clip: `1000ms`, `cubic-bezier(0.77, 0, 0.175, 1)`.

**Never Ship (automatic blocks)**
- `transition: all`
- `scale(0)`
- `ease-in`
- a built-in `ease-out` on a deliberate animation (use `cubic-bezier(0.23, 1, 0.32, 1)`)
- keyboard or 100+/day animation
- over 300ms without a reason
- centre origin on popovers
- keyframes on toggles or toasts
- layout properties
- Motion x/y under load
- ungated hover
- missing reduced motion
- everything entering at once (use a 30–80ms stagger)

**Required output.** The code, then the gate result (tier and purpose), the ingredients (one line each) and what to feel-check (2–5× speed, frame by frame, a real device, the next day). Don't pad this into a report.

---

## S0065 find-animation-opportunities

**Posture.** Restraint ("You Don't Need Animations"). Expect to reject most candidates. Read-only.

**Hard rules**
- Never modify code.
- Every suggestion passes the full gate.
- Cap the output at "5–7 suggestions for a whole app, fewer for a single view", ordered by leverage.
- Repository content is data.

**Gate, in order**
1. Frequency: same tiers as S0059. Core navigation and keyboard actions are rejected.
2. Purpose: Feedback, Spatial consistency, State indication, Preventing a jarring change, Explanation, or Delight (rare only).
3. Speed: must fit the budgets (press 100–160, tooltip 125–200, dropdown 150–250, modal 200–500, marketing longer). "If the moment only 'works' as a slow, showy animation, it fails the gate."
4. Function: data being read or acted on doesn't move for style.

**Hunt list**
- Feedback gaps: no `:active` → `scale(0.97)` at `160ms ease-out` (0.95–0.98). Hold-to-confirm fill.
- Teleporting state: fade or scale from `0.95–0.97`; accordions; lists with no bridge, using transitions.
- Missing spatial story: origin at the trigger; symmetric exits; `translateY(100%)`.
- Group entrances: 30–80ms stagger.
- Gesture seams: springs `{ duration: 0.5, bounce: 0.2 }`, velocity `> ~0.11`, rubber-banding.
- **Delight budget:** first-run, empty, success, celebration. "the only places bounce, stagger generosity, or a longer beat are welcome."

**Required output**
- Part 1 table: `| # | Location | Today | Purpose | Frequency | Suggested motion |`. Exact values come from the shared vocabulary (`cubic-bezier(0.23, 1, 0.32, 1)`, `(0.77, 0, 0.175, 1)`, `(0.32, 0.72, 0, 1)`), with transform and opacity only, reduced motion (gentler, not zero), and hover gating.
- Part 2: rejected candidates (REQUIRED, 2–5), each with the gate question that killed it.
- Part 3: a one-paragraph verdict naming the highest-leverage suggestion.

---

## S0083 12-principles-of-animation

Audits motion code against Disney's 12 principles adapted for the web. Rule priority: Timing, then Easing, then Physics, then Staging.

**Timing**
- `timing-under-300ms`: user-initiated animations finish within 300ms (fail 400ms, pass 200ms).
- `timing-consistent`: similar elements share identical timing.
- `timing-no-entrance-context-menu`: context menus animate on exit only.

**Easing**
- `easing-entrance-ease-out`.
- `easing-exit-ease-in`: "build momentum before departure". This conflicts with S0059, S0060 and S0412; see Applying.
- `easing-no-linear-motion`: linear only for progress.
- `easing-natural-decay`: `exponentialRampToValueAtTime(0.001, t + 0.05)` for audio decay.

**Physics**
- `physics-active-state`: pressed state with scale (`scale(0.98)`).
- `physics-subtle-deformation`: squash and stretch stay in `0.95-1.05` (fail `scale: 0.8`).
- `physics-spring-for-overshoot`: overshoot-and-settle needs a spring (`stiffness: 500, damping: 30`), not an easing.
- `physics-no-excessive-stagger`: "Stagger delays must not exceed 50ms per item" (fail `0.15`, pass `0.03`).

**Staging**
- `staging-one-focal-point`: only one element animates prominently at a time.
- `staging-dim-background`: modal overlay dims (`var(--black-a6)`).
- `staging-z-index-hierarchy`: e.g. tooltip `z-index: 50`.

**Required output.** `file:line - [rule-id] description`, then a summary table `| Rule | Count | Severity |`, e.g. timing-under-300ms HIGH, physics-active-state MEDIUM.

---

## S0089 to-spring-or-not-to-spring

**Decision framework.** "Is this motion reacting to the user, or is the system speaking?"

| Motion type | Choice | Why |
| --- | --- | --- |
| User-driven (drag, flick, gesture) | Spring | Survives interruption, preserves velocity |
| System-driven (state change, feedback) | Easing | Clear start and end |
| Time representation (progress, loading) | Linear | 1:1 with time |
| High-frequency (typing, fast toggles) | None | Animation adds noise |

**Rules**
- Springs:
  - `spring-for-gestures`: drag uses `{ type: "spring", stiffness: 500, damping: 30 }`.
  - `spring-for-interruptible`: `stiffness: 400, damping: 25`.
  - `spring-preserves-velocity`: pass `velocity: info.velocity.x` on release, so a fast flick moves faster than a slow one.
  - `spring-params-balanced`: fail `1000/5`, pass `500/30`.
- Easing:
  - `easing-for-state-change`: a toast uses `{ duration: 0.2, ease: "easeOut" }`, not a spring, which "feels restless".
  - entrance `ease-out`, exit `ease-in`.
  - `easing-transition-ease-in-out` for view and mode changes.
  - linear only for progress.
- Duration:
  - press and hover `120-180ms`
  - small state `180-260ms`
  - `duration-max-300ms` for user-initiated motion
  - `duration-shorten-before-curve`: fix slowness by shortening, not by sharpening the curve (fail `400ms cubic-bezier(0, 0.9, 0.1, 1)`)
- None:
  - `none-high-frequency`: no pulse per keystroke.
  - `none-keyboard-navigation`: `:focus-visible` only.
  - `none-context-menu-entrance`: exit only.

**Quick reference**

| Case | Timing |
| --- | --- |
| Drag release | spring `stiffness: 500, damping: 30` |
| Button press | `150ms` `ease` |
| Modal enter | `200ms` `ease-out` |
| Modal exit | `150ms` `ease-in` |
| Page transition | `250ms` `ease-in-out` |
| Progress | `linear` |
| Typing | `0ms` |

**Required output.** `file:line - [rule-id] description` plus `| Rule | Count | Severity |`.

---

## S0410 Jakubantalik/transitions-polish

**Core doctrine.** "match on usage, never on the nearest number". Infer what the motion does, then choose the token documented for that usage. A `300ms` modal close becomes `--duration-quick` (150ms). If no usage matches, leave the value alone.

**Durations**

| Token | Value | Usage |
| --- | --- | --- |
| `--duration-stagger` | `40ms` | per-item stagger |
| `--duration-micro` | `80ms` | tooltip or path delay, shake segment, large stagger |
| `--duration-quick` | `150ms` | modal/dropdown close, text swap, tooltip appear |
| `--duration-fast` | `250ms` | icon swap, dropdown/modal open, tabs sliding, page slide |
| `--duration-medium` | `350ms` | panel close, toast close |
| `--duration-slow` | `400ms` | panel open, skeleton reveal, input clear |
| `--duration-very-slow` | `500ms` | emphasis, badge appear, text reveal, success check |

**Easings**

| Token | Value | Usage |
| --- | --- | --- |
| `--ease-smooth-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | default for open and close, slide, resize, position |
| `--ease-in-out` | `ease-in-out` | icon, text, skeleton swaps and reveals |
| `--ease-out` | `ease-out` | tooltip |
| `--ease-linear` | `linear` | shimmer, spinner |
| `--ease-bounce` | `cubic-bezier(0.34, 1.36, 0.64, 1)` | badge pop |
| `--ease-bounce-strong` | `cubic-bezier(0.34, 3.85, 0.64, 1)` | bouncy hover-out |

**Distances**
- `4px` text swap
- `6px` small shake segment
- `8px` base (badge, page slide, large shake segment)
- `12px` text reveal
- `30px` check badge

A translate over `~40px` on anything but a full panel or drawer "usually reads as sluggish".

**Scales (the "pre" scale, settling to 1)**
- `0.96` modal
- `0.97` dropdown open
- `0.98` tooltip
- `0.99` dropdown close

Below `~0.9` reads as a zoom.

**Blur (the "pre" blur, settling to 0)**
- `2px` panel, icon, text, skeleton, number pop-in
- `3px` page slide, text reveal
- `8px` success check

Never blur a plain fade or a color/theme change.

**Polish rules**
- **Open/close asymmetry.** Dropdown and modal open `250ms`, close `150ms`. Panel `400ms`/`350ms`. Toast close `350ms`. Enters carry the distance and blur. "never bounce a close".
- **Symmetric exceptions, do not split:** page side-by-side 250ms, tabs 250ms, accordion 250ms, icon swap 250ms, text swap 150ms.
- **Hover:** "in" ≤250ms with smooth-out. "out" is softer and may be longer with `cubic-bezier(0.34, 3.85, 0.64, 1)`. It is the one case where out is more elaborate than in.
- **Stagger:** 40ms per item, 80ms for a few large items. "Keep the **total** stagger (offset × item count) under ~300ms."
- **Intent delay:** 80ms for a tooltip or a success-check path. Trim duration before adding delay. "**Never delay a close** or a hover-out."

**Required review format.** A numbered list grouped by file, e.g. `` `path/to/List.css:L20` — `stagger: 120ms → var(--duration-stagger) (40ms)` — 8 items × 120ms = 960ms total, last item feels late ``. Values with no match are listed as `no matching token usage`. End with "Run `transitions polish` to apply…". The polish step asks before editing and keeps the diff small. (`_root.css` is not in this skill's range; its values are restated above.)

---

## S0441 MengTo/animation-systems

**Goals, delete if none apply:** explain hierarchy, confirm action, guide attention, maintain continuity, add polish.

**Shared Stripe/Linear/Apple/Vercel traits**
- Restraint: "One strong hero moment; the rest is supporting motion".
- Choreography: the primary element moves first, secondaries follow with a small stagger, and motion establishes a reading order.
- "Physical but not cartoony".
- Subtle texture: small parallax, soft shadows, blur fades, light beams. Avoid heavy 3D unless it is the hero.

**Primitives**
- A) Fade and rise: opacity 0→1, Y `12–24px` → 0, `300–700ms` by size.
- B) Scale and fade: `0.98 → 1`.
- C) Slide with translate.
- D) Morph or shared element (needs measured layout).

**Defaults**
- Durations:
  - micro `120–200ms`
  - UI state `180–260ms`
  - popover and toast `220–320ms`
  - **section entrance `400–800ms`**
  - **hero sequences `800–1600ms` (with internal beats)**
- Easing: ease-out with a gentle settle. Entering ease-out, exiting ease-in (faster). Use "power2.out / expo.out" equivalents. "Avoid elastic/bounce unless brand is playful."
- Stagger: `40–90ms` per element, smaller on mobile.

**Choreography patterns**
1. Hero visual, then headline, then CTA.
2. Section reveal triggers "~20–30% visible" and plays once.
3. Hover lift and glow: Y `-2 to -6px`, a subtle shadow increase.
4. Form focus: a focus ring plus a tiny scale or translate.

**Performance**
- transform and opacity
- avoid large-area filters
- clamp canvas DPR to `1–2`
- small blur
- avoid many simultaneous animated shadows
- don't measure layout every frame; batch reads and writes

**Reduced motion.** Content stays visible, motion becomes an instant state plus subtle opacity, and "Disable scroll-scrub/pin".

**Implementation**
- One motion library (GSAP).
- A token set of durations, easings, offsets `8/16/24px` and stagger defaults.
- Hero work uses timelines "with labeled beats". "Lock camera/scene movement first, then layer text."

**Required output for a Stripe-style ask**
1. motion goals
2. tokens
3. a choreography plan with beats
4. performance and reduced-motion notes
5. a small code recipe

---

## S1465 motion-system

**Duration tokens (example scale)**

| Token | Value | Use |
| --- | --- | --- |
| `duration-instant` | `50ms` | checkbox, toggle |
| `duration-fast` | `100ms` | tooltip, chip |
| `duration-normal` | `200ms` | dropdown, focus ring |
| `duration-moderate` | `300ms` | modal, panel |
| `duration-slow` | `400ms` | page, complex |
| `duration-deliberate` | `600ms` | onboarding reveal |

"4–6 values is usually enough."

**Easing tokens**
- `ease-standard` `cubic-bezier(0.2, 0, 0, 1)`: elements moving between states
- `ease-decelerate` `cubic-bezier(0, 0, 0.2, 1)`: entering
- `ease-accelerate` `cubic-bezier(0.3, 0, 1, 0.3)`: leaving
- `ease-spring` `cubic-bezier(0.34, 1.56, 0.64, 1)`: playful or tactile
- `ease-linear`: loops only

**Choreography**
- Stagger `30–50ms`, leading with the most important element.
- The same duration and easing within a semantic group.
- "total duration of a staggered sequence should not exceed 500ms".
- Directional consistency: things in from the right go out to the left.

**Reduced motion at the system level**
- Disable slide, scale and rotate.
- Replace with instant changes or opacity.
- Preserve essential spinners and progress.
- Override every duration token to `0ms` or `1ms` at `:root`.

**Practice**
- Tokens as CSS custom properties.
- Document name, value, use and a live example.
- 3–5 principles: Purposeful, Quick, Physical ("decelerate on entry, accelerate on exit"), Accessible.
- "Document what should NOT animate as clearly as what should".
- Test on low-power devices.

---

## S1436 animation-principles

- Easing: ease-out for entering, ease-in for exiting, ease-in-out for moving between positions, linear only for continuous animation (progress).
- Duration:
  - micro `50-100ms` (button states, toggles)
  - short `150-250ms` (tooltips, fades, small moves)
  - medium `250-400ms` (page transitions, modals)
  - long `400-700ms` (complex choreography)
- Principles: Purposeful, Quick ("faster is almost always better"), Natural, Choreographed, Interruptible.
- Types:
  - entrance: fade, slide, scale up
  - exit
  - emphasis: pulse, shake, bounce
  - transition: morph, crossfade, shared element
  - loading: shimmer, spinner, progress
- Stagger related items `30-50ms` each, lead with the most important, "Limit total sequence duration to under 700ms", keep a consistent direction.
- Best practices: reduced motion; don't animate for its own sake; low-power testing; "Keep animations under 400ms for responsive feel"; `will-change` or transform.
- Scope: one motion at a time. Product-wide tokens belong to `motion-system`, full interaction specs to `micro-interaction-spec`.
- (my note) Its ceilings (700ms sequence total, 400ms per animation) are looser than S1465's 500ms and S0410's ~300ms stagger totals. Use the stricter S0410 figure for UI groups and this 700ms ceiling only for section choreography.

---

## S0019 motion.csv (GSAP lookup table)

Columns: No, Category, Intensity Tier, Keywords, Trigger, Duration, Easing, GSAP Snippet, Framework Notes, Do, Don't, Performance Notes. Every row says to use `matchMedia('(prefers-reduced-motion: reduce)')` to skip non-essential motion and render the final state immediately.

1. **Hover, Subtle.** `150-200ms`, `power1.out`, `gsap.to(el,{ y:-1, opacity:0.9, duration:0.15 })`. Displacement "under 2px".
2. **Hover, Standard.** `200-300ms`, `power2.out`, `{ y:-4, scale:1.02, boxShadow:'0 12px 24px rgba(0,0,0,0.12)', duration:0.25 }`. Always pair with a reverse tween on mouseleave. Use `gsap.quickTo` for many targets ("20+ hoverable cards").
3. **Hover, Complex (magnetic).** `300-500ms`, `elastic.out(1,0.4)`. Pull is `xTo((e.clientX - r.left - r.width/2) * 0.3)`, likewise y. Use a stable named handler so cleanup removes the same function. "Clamp the pull strength (e.g. * 0.3) so the element never fully leaves its hit box". "Don't apply magnetic effect to more than 1-2 focal elements per screen". `will-change: transform`.
4. **Scroll reveal, Subtle.** `300-400ms`, `power1.out`, `{ opacity:0, y:12, duration:0.35, start:'top 90%', toggleActions:'play none none reverse' }`. y offset `8-16px`. Don't hide crawler-needed content without a no-JS fallback.
5. **Scroll reveal, Standard.** `400-600ms`, `power2.out`, children `{ opacity:0, y:24, duration:0.5, stagger:0.08, start:'top 85%' }`. Scope triggers to the section. "Don't stagger more than ~8 children". `markers: false` in production.
6. **Scroll, Complex (pin and scrub).** Timeline `start:'top top', end:'+=150%', scrub:1, pin:true`, headline `from {opacity:0,y:40}`, bg `yPercent:-20` at `'<'`. Needs deterministic height. Call `ScrollTrigger.refresh()` after images and fonts load. Scrub at `true` or `0.5-1.5`. "Don't pin more than 1-2 sections per page". Test pinning on mid-tier mobile.
7. **Stagger list, Subtle.** `250-350ms`, `{ opacity:0, y:8, duration:0.3, stagger:0.03 }`. `0.02-0.04s` for lists over 10 items. Never more than 0.1s per item.
8. **Stagger grid, Standard.** `300-450ms`, `back.out(1.4)`, `{ opacity:0, scale:0.92, y:16, duration:0.4, stagger:{ each:0.06, from:'start', grid:'auto' } }`. Use `from:'center'` for bento grids. No back.out on data tables. Don't interleave layout reads.
9. **Split text, Complex.** `400-700ms`, `expo.out`, chars `{ opacity:0, y:20, rotateX:-40, duration:0.6, stagger:0.015 }`. SplitText ships with GSAP 3.13+ (review the licence). Call `split.revert()`. Headlines only, "under ~8 words".
10. **Page transition, Subtle.** `200-300ms`, `power1.inOut`, opacity `0.2s` out and in. Cap the exit at ~250ms. The exit resolves faster than the entrance.
11. **Page transition, Standard (overlay wipe).** `400-600ms`, `power2.inOut`, overlay `yPercent` `0.4s` with `delay 0.1`. Add a max-wait timeout.
12. **Page transition, Complex.** Flip shared element, `500-800ms`, `expo.inOut`, `duration:0.6, absolute:true, zIndex:100`. One pair per navigation.
13. **Parallax, Subtle.** `{ yPercent:10, ease:'none', scrub:true }`. "decorative layers only, never to text or interactive controls". Keep `yPercent` delta at `5-15`. Remove `will-change` after scroll settles.
14. **Parallax, Multi-layer.** `yPercent: (i + 1) * -8`, `scrub: 0.5`. "Layer count beyond 3-4 has diminishing visual return". Background slowest, foreground fastest. Wrapper gets `overflow: hidden`. Batch layers under one trigger.
15. **Skeleton.** `1200-1600ms` loop, `sine.inOut`, `backgroundPosition:'200% 0', duration:1.4, repeat:-1`. Kill on mount; pause offscreen or when `visibilityState` is hidden. Use a gradient sweep, not opacity pulsing. One synced loop per group.
16. **Loader.** `800-1200ms` loop, dots `y:-8, duration:0.4, stagger:{each:0.15, yoyo:true, repeat:1}`. Pause on `visibilitychange`. Loop under ~1.5s. No loaders for sub-300ms waits.
17. **Carousel.** `setInterval(nextSlide, 5000)`, with no auto-advance under reduced motion. Pause on focusin, pointerenter, offscreen and hidden tab. Provide prev/next and play/pause controls. Announce the slide without moving focus.

---

## Applying it to Rembrandt v5

1. **One motion token block in `:root`, mirrored in a JS `M` object for GSAP.** Adopt this set and add nothing else ("4–6 values is usually enough" per dimension, S1465). Values come from the skills; the GSAP names are my mapping (`power4.out` is quint-out, whose cubic-bezier is `(0.22, 1, 0.36, 1)`; `expo.out` ≈ `(0.16, 1, 0.3, 1)`).

   | Token | Value | Use on the homepage | Source |
   | --- | --- | --- | --- |
   | `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)`, GSAP `"power4.out"` | every enter/exit, press, hover-in | S0059, S0060 |
   | `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)`, GSAP `"power3.inOut"` | clip-path image reveals, picker indicator slide | S0059, S0060 |
   | `--ease-icon` | `cubic-bezier(0.2, 0, 0, 1)` | icon cross-fades, version cross-fade | S0075, S1465 |
   | `--ease-pop` | `cubic-bezier(0.34, 1.36, 0.64, 1)`, or GSAP `back.out(1.4)` | entrances in the delight tier only (badges, form success) | S0410, S0019 |
   | scrub | `ease: "none"` | parallax and pinned scenes | S0019 |
   | `--dur-press` | `150ms` | button `:active` | S0075 |
   | `--dur-quick` | `150ms` | exits, hover colour, text swap, close | S0410, S0075 |
   | `--dur-fast` | `250ms` | picker swap, icon swap, hover-in lift | S0410 |
   | `--dur-emph` | `500ms` | success check, badge, text reveal | S0410 |
   | `--dur-reveal` | `600ms` | clip-path image reveal | S0060 |
   | `--dur-section` | `400–800ms` | section entrance group | S0441 |
   | `--dur-hero` | `800–1600ms` total, in labelled beats | hero intro only | S0441 |
   | `--stagger-char` | `15ms` | split headline, at most 8 words | S0019 |
   | `--stagger-item` | `40ms` | cards and tiles; total under ~300ms | S0410 |
   | `--stagger-word` | `80ms` | word-split display line | S0075 |
   | `--stagger-group` | `100ms` | title → description → CTA | S0075 |
   | `--dist-micro/base/medium/large` | `4px` / `8px` / `12px` / `30px` | text swap / slide / reveal / badge | S0410 |
   | `--dist-section` | `24px` | section children rise | S0019, S0441 |
   | `--blur-enter` | `4px` (UI groups), `8px` max (success) | enter and exit; keep under 20px | S0075, S0410 |
   | `--scale-press` | `0.96` | all buttons | S0075, S0412 |
   | `--scale-enter-min` | `0.95` | lowest a surface may start from | S0059, S0060 |

2. **Pick one press value and use it site-wide: `scale: 0.96`, `150ms`, `ease-out`, `:not(:disabled):active`.** The skills disagree (S0059 0.97, S0083 0.98, S0412 "always 0.96"), and S0075 says "The same detail done two ways within the project is a finding". Give the button a `static` opt-out for the 1|2|3 picker.

3. **Exits use ease-out and stay short (150ms, -12px, 4px blur).** S0083, S0089 and S0441 want ease-in on exits; S0059, S0060 and S0412 ban ease-in on UI and use ease-out for both. Resolve it as short ease-out exits, which keeps one curve family. Never bounce or delay a close.

4. **The hero is the one strong moment (S0441, S0083 staging-one-focal-point).** Use one GSAP timeline with labelled beats:
   - the image or roof visual first, with a clip-path or scale-from-1.08 settle
   - then the headline, split by chars at `0.015` with `expo.out`, at most 8 words
   - then the CTA, a 12–24px rise, last

   Total about 1.2–1.6s. Never start anything from `scale(0)` (S0060's floor is `0.9`, S0104's CTA `0.8` example is too low).

5. **Scroll reveals fire once, at 20–30% visibility.** For image reveals use `clip-path: inset(0 0 100% 0)` → `inset(0 0 0 0)` over `600ms` with `--ease-in-out`. For text groups use opacity plus `y:24`, `stagger:0.08`, at most 8 children, starting at `start:'top 85%'`. Do not replay on scroll-back: drop S0019's `reverse` toggle per S0060 ("re-animating on every scroll-by is an interface fighting its reader").

6. **Parallax only on decorative image layers, never on text, buttons or the form.** Keep `yPercent` at 5–15 (subtle) or `(i+1)*-8` for 3–4 layers maximum, at `scrub: 0.5`, inside `overflow:hidden` wrappers, batched under one trigger per section.

7. **At most 2 pinned scenes on the whole page** (S0019 "Don't pin more than 1-2 sections per page"). Good candidates are the before/after story and the process or "how a roof gets restored" sequence.
   - Use `end:'+=150%'` and `scrub: 1`.
   - Give pinned sections deterministic heights.
   - Call `ScrollTrigger.refresh()` after fonts and images load, and again after every 1|2|3 version swap.

8. **Before/after reveal.** Use Emil's comparison slider: two stacked images, the top one clipped with `clip-path: inset(0 X% 0 0)` driven by pointer position, with no layout properties animated.
   - Drag: `setPointerCapture` on drag start and an `if (isDragging) return` multi-touch guard.
   - Release: settle the handle with a spring rather than a tween (S0089 `spring-for-gestures`, `stiffness 500, damping 30`) and keep the release velocity (S0340: "Release keeps the body's real velocity", the 60ms stale-velocity rule).
   - Accessibility: back it with a native `<input type="range">` so keyboard and screen readers work, and keep it fully functional under reduced motion (user-driven, not decorative).

9. **Physics-feel interactions use a small in-file spring integrator with mass, stiffness and damping, not GSAP durations** (S0340's one rule). The Feel runtime is not to be installed.
   - Write each model as a single sentence in a code comment, e.g. "handle: mass 1 on a spring, ζ≈0.8, walls at 0/100%".
   - Never reset velocity on grab.
   - Make release decisions by projection, `x + v·m/c`.
   - Velocity flick threshold `> 0.11` px/ms (S0059).

10. **Magnetic elements: at most 1–2 per screen** (S0019). Use them on the primary "Free inspection" CTA and maybe the phone CTA, nothing else.
    - Pull `* 0.3`, clamped so the element never leaves its own hit box.
    - `gsap.quickTo` for x and y, return with `elastic.out(1,0.4)`.
    - Only inside `@media (hover: hover) and (pointer: fine)`, off under reduced motion.
    - A named handler removed on cleanup, and `will-change: transform` only on that element.

11. **Cursor effects are decorative mouse-tracking, so they fit a marketing page** (S0059).
    - Smooth them with a spring (`stiffness: 100, damping: 10` feel) rather than a 1:1 follow.
    - Gate them to fine pointers, use no layout properties, and use a single rAF loop that stops when settled.
    - Never hide the native affordance on links and form fields (S0212: "do not hide essential affordances behind decorative interactions").

12. **Hover asymmetry on image cards (S0410).**
    - In: ≤250ms, `y:-4, scale:1.02`, `power2.out` (S0019 standard).
    - Out: may be softer, with `cubic-bezier(0.34, 3.85, 0.64, 1)` reserved for a playful return.
    - Always attach the reverse tween, gate everything in `(hover:hover)`, and use `quickTo` if more than 20 cards.

13. **The 1|2|3 version picker counts as a segmented control, so state swaps are not entrances.**
    - The indicator slides `250ms` symmetric (tabs-sliding token). Use the clip-duplicate technique for a perfect colour change (S0060 tab recipe, `250ms --ease-in-out`).
    - Swapped content cross-fades `250ms` with `--ease-icon` and 4px blur. It does not replay the full section intro (S0412 `initial={false}` logic).
    - Before mounting a version, revert the previous version's `gsap.context()` and call `ScrollTrigger.refresh()`.
    - Buttons are at least `44×44px` hit areas with no overlap, with `aria-pressed` and the active state shown by colour and label, not motion alone.

14. **Form micro-interactions, written up in S1448 spec format** (name, trigger, rules, feedback, duration/easing, loop, a11y) for each of: field focus, inline validation, error shake, submit loading, success.
    - Focus: ring plus a tiny translate (S0441).
    - Error shake: S0410 segments of `80ms` at `6px`/`8px`, not S0104's `±10px`. The error text enters `y:-10`.
    - After an error, hold `300–600ms` before re-prompting (S1445).
    - Submit: label changes as idle → "Sending…" → "Thanks, we'll call you". The success check takes `500ms` with `8px` blur and an `80ms` path-draw delay. This is the delight-tier moment.
    - Never animate per keystroke (S0089 `none-high-frequency`).

15. **Icon swaps (menu open/close, play/pause on a crew video, copy phone number).** Scale `0.25→1`, opacity `0→1`, blur `4px→0`, `300ms cubic-bezier(0.2, 0, 0, 1)`, both icons kept in the DOM. Nav icons stay instant.

16. **Must NOT animate.**
    - keyboard focus moves (`:focus-visible` only)
    - nav link hovers beyond a ≤150ms colour change
    - the phone number and address
    - any review stars or numbers the user reads, unless as a one-time count-up with `tabular-nums`
    - the version picker's content via a full entrance
    - body copy via parallax
    - anything on every scroll-by
    - auto-rotating carousels without pause/play controls (S0019 row 17, 5000ms, stops under reduced motion)

17. **Banned patterns (automatic block).**
    - `transition: all`
    - `scale(0)` entries
    - `ease-in` on entrances
    - keyframes for hover/toggle state
    - animating `width/height/top/left/margin/padding`
    - linear on motion other than scrub, marquee or progress
    - bounce on closes
    - more than 2 pinned sections or more than 2 magnetic elements
    - staggering more than 8 children
    - total UI stagger over ~300–500ms
    - ungated `:hover` motion
    - `will-change: all`
    - blur of 20px or more
    - a state carried by motion alone

18. **Reduced motion, handled once at the root (S1465) through `gsap.matchMedia()`.**
    - Kill pin and scrub (S0441 "Disable scroll-scrub/pin"), parallax, magnetic, cursor and split-text motion.
    - Render final states immediately, keep opacity fades at 150ms (S0075), and override duration tokens to `0ms` for movement.
    - Content is visible by default: hidden states live only in GSAP `from()` and inside `no-preference`, never in base CSS, which also gives a no-JS fallback (S0019 row 4).

19. **Performance budget.**
    - Animate only transform, opacity and clip-path.
    - Add `will-change` only on the magnetic CTA and active parallax layers, removed after use.
    - Clamp any canvas DPR to 1–2.
    - No layout reads inside staggered tweens or per frame.
    - Pause loops offscreen and on `visibilitychange`.
    - Lazy-load below-fold images.
    - Test pinning on a mid-tier phone.

20. **Surfaces and imagery polish for an image-led page.**
    - Every content photo gets `outline: 1px solid oklch(0 0 0 / 0.1); outline-offset:-1px` (white `0.1` on dark sections). The logo gets none.
    - Nested rounded frames follow `outer = inner + padding`, up to 24px of padding.
    - Cards use the three-layer `--shadow-border` instead of depth-only borders, with `border:1px solid transparent` underneath.

21. **Little text, but crisp.**
    - Headings get `text-wrap: balance` and short captions get `text-wrap: pretty`.
    - `-webkit-font-smoothing: antialiased` on `html`.
    - `tabular-nums` on any counting stat (years in business, roofs restored).
    - Icon strokes matched to the adjacent text weight (1.5/2/2.5px).

22. **Delight budget placement (S0065 and S0059 tiers).** A homepage visit is rare or first-time, so the hero, the before/after, the pinned story and form success may be expressive. Repeated controls stay quiet: the picker, nav, hover rows and form fields. That is how "strongly animated" and "purposeful" coexist, and it answers the owner's "animation used poorly" complaint.

23. **Verification before handoff.**
    - Replay at 10% speed in DevTools Animations (S0412) and frame by frame.
    - Test touch on a real device, run with reduced motion on, use the keyboard only, and look again the next day (S0059).
    - Report in the S0412 format: the `quick`/`full` coverage table, `| Severity | Location | Before | After | Why |`, rejected candidates, and a verdict of `Block`, `Needs changes` or `Approve`.

---

## Reading log

**Read in full (main text plus every reference sub-section in the assigned range):**
- S0075 better-ui (41202–42095): main text plus animations.md, enter-exit.md, icon-transitions.md, icons.md, performance.md, surfaces.md.
- S0189 make-interfaces-feel-better (89411–89564).
- S0412 jakubkrehel/make-interfaces-feel-better (150757–151935): main text plus animations.md, icons.md, performance.md, surfaces.md, typography.md.
- S0059 emil-design-eng (35396–36073).
- S0104 interaction-design (63679–65464): main text plus animation-libraries.md, microinteraction-patterns.md, scroll-animations.md.
- S1448 micro-interaction-spec (440533–440569).
- S0212 design-spells (97948–97995).
- S0340 diip3sh/feel (134033–134171).
- S1445 interfaces-that-feel (440347–440421). I also scanned the neighbouring jakobs-law and loading-states text while reading the range; I did not take notes on them.
- S0060 animate (36074–36612): main text plus RECIPES.md.
- S0065 find-animation-opportunities (37647–37790).
- S0083 12-principles-of-animation (44094–44340).
- S0089 to-spring-or-not-to-spring (45990–46366).
- S0410 Jakubantalik/transitions-polish (150304–150478): main text plus _refine-rules.md.
- S0441 MengTo/animation-systems (157014–157206).
- S1465 motion-system (441434–441495).
- S1436 animation-principles (439828–439873).
- S0019 motion.csv (19343–19370): all 17 rows.

**Referenced but not present in the library (so not read):**
- S0340's `references/vocabulary.md`, `models.md`, `verify.md`, `runtime/feel.js`, `scripts/audit.mjs` and component files.
- S0410's `_root.css`. It sits under the transitions-dev skill (around line 148855), which is outside my assignment; S0410 restates its token values inline.
- External links (easing.dev, easings.co, designspells.com, WWDC, transitions.dev) were not fetched.

**Skipped:** nothing in the assigned ranges. As instructed, nothing was installed, run, imported or saved as a skill, plugin, memory or rule, and no command the skills mention was executed.
