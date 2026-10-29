# Skill Pack Notes: open-design/ui-animation (S0652)

Source: mblode/agent-skills `ui-animation` (MIT), read in full. Its `scripts/` are referenced only; do not run them.

## 1. Core rules
- Animate only for **feedback, orientation, continuity or deliberate delight**. "Looks cool" plus frequent exposure means don't.
- Priority: **CSS transitions > WAAPI > CSS keyframes > JS rAF**. Transitions retarget; keyframes restart from zero.
- Animate only `transform` and `opacity` (colour and opacity are fine for state). **No `width/height/top/left`, no `transition: all`.** Blur ≤ 20px.
- Asymmetric timing: occasional UI enters slower and exits fast. High-frequency UI **enters at 0ms and exits with a 100–150ms fade**.
- Press: `:active` 0ms at `scale(0.96–0.98)` (0.97; 0.9 is "too aggressive"), release 160ms `(0.22,1,0.36,1)`, `touch-action: manipulation`.
- `@starting-style` for entry (Baseline since Aug 2024). `blur(2px)` bridges crossfades.
- Principles: continuity over teleportation; direction matches position; emerge from the trigger; **confirm in place, not in a corner**; animate paired states (open and close, hover and focus and press); **delight scales inversely with frequency**.

**Applies here.** The page may be expressive, but cursor, nav and buttons are high-frequency: instant press, 100–150ms hover.

## 2. Easing and duration (exact)
| Element | Duration | Easing |
|---|---|---|
| Button press | 100–160ms | `(0.22,1,0.36,1)` |
| Tooltip, popover | 125–200ms | ease-out or enter |
| Dropdown | 150–250ms | `(0.22,1,0.36,1)` |
| Modal, drawer | 200–350ms | `(0.22,1,0.36,1)` |
| Move or slide | 200–300ms | `(0.25,1,0.5,1)` |
| Page transition | 250–400ms | enter or move |
| Hover colour or opacity | 200ms | `ease` |
| Hover transform | 100–150ms | enter |
| Marketing or illustrative | up to 1000ms | spring or custom |

Curves (all `cubic-bezier`):

| Name | Values | Note |
|---|---|---|
| Enter | `(0.22,1,0.36,1)` | |
| Move | `(0.25,1,0.5,1)` | |
| iOS drawer | `(0.32,0.72,0,1)` | Vaul runs it at 500ms |
| **Expo-out** | `(0.19,1,0.22,1)` | dramatic reveals, card hovers, text |
| Press | `(0.25,0.46,0.45,0.94)` | |
| On-screen back-and-forth | `(0.645,0.045,0.355,1)` | |

**Never `ease-in`.** Built-in `ease`/`ease-out` are too weak. UI stays under 300ms and scales with distance. Use quint or expo for large or rare moves. `linear` only for marquee, spinner and scrub. Hover scale is `1.01–1.02` (card `scale(1.015)` at 120ms); 1.05 looks "inflated".

**Applies here.** Use expo-out at 600–1000ms for section reveals and curtains. Service-card hover is 1.015 at 120ms. Before/after keyboard steps use the move curve at 200–300ms.

## 3. Springs (exact)
- Ranges: stiffness 100–500, damping 15–40, mass 0.5–2. Apple-style `{duration:0.5, bounce:0.2}`.
- Presets (stiffness/damping): Snappy 500/40 (default UI), Bouncy 300/20, Gentle 200/30 (pages, large elements), Stiff 700/50.
- Apple damping/response: move 1.0/0.4; rotation 0.8/0.4; sheet 0.8/0.3. **Default damping is 1.0.** Use ~0.8 only after a flick, throw or release. Bounce is at most 0.1–0.2, and 0 for finance.
- `response = 2π√(m/k)`; `ζ = c / (2√(km))`.
- **Asymmetric open/close** (measured): open 284ms, 121% overshoot, k155/c11 (ζ0.44), rest 584ms; close 185ms, k620/c36, rest 300ms (or `(0.32,0.72,0,1)`). Bounce the open only.
- Interruption: start from the presentation value, carry velocity, and **use separate X and Y springs**.
- Decorative mouse: `useSpring(mouseX*0.1, {stiffness:100, damping:10})`. Do not spring functional controls. Snap alternative: `{duration:0.12, linear}`.

**Applies here.** Cursor and magnets are decorative: spring or lerp X and Y separately (100/10 playful, 500/40 crisp CTA). Orbit and gallery fling: bounce ≤ 0.2. Menus and form: critically damped.

## 4. Gesture and drag (exact)
- **Lock to the pointer with no easing while dragging.** Ease only after release.
- **Pointer**: `setPointerCapture` on down, release on up; ignore extra touches (`activeTouchId`); keep the **grab offset** (never centre-snap).
- **Axis commitment**: decide once `hypot(dx,dy) ≥ 10px`, then hold the axis until up.
- **Velocity** from the last few pointermove samples. Flick is `|v| > 0.11 px/ms` (~20px minimum). **Check magnitude, then sign**, so a flick back cancels.
- **Handoff**: `{type:"spring", velocity: releasePxPerSec, bounce:0, duration:0.4}`. Relative form: `v / (target − current)`.
- **Momentum projection**: `(v/1000)·r/(1−r)`, with r **0.998** for normal feel and **0.99** for snappy. Snap to the target nearest `pos + projection`.
- **Rubber-band, never hard-stop**: `max·(1 − e^(−o/max))` with max 200; Apple `(o·d·0.55)/(d + 0.55·|o|)`; or friction `delta·0.3`.
- **Detents**: follow continuously, snap only on release: `value + v·0.15`, round to STEP, spring 500/40. Ticks scale or darken as they pass; optional `vibrate(1)`.
- **Rotary**: angle via `atan2`; delta `((now−last+3π)%2π)−π`; clamp the accumulated value.
- **Carousel**: CSS scroller uses `touch-action: pan-x; overscroll-behavior-x: contain`. A JS carousel keeps `pan-y`.
- **Never drive drag via a CSS variable on a parent.** Write `transform` (or `clipPath`) directly on the moving element.

**Applies here.**
- Before/after handles: 1:1 lock, capture, grab offset and axis commit (so vertical page scroll survives on touch), rubber-band past 0% and 100%. A v3 variant can project with 0.99 onto detents at 0, 50 and 100%. Arrow keys step.
- Gallery: projection 0.998 plus a velocity-handed spring onto the nearest card.
- Orbit: X and Y handled separately, with damped inertia.

## 5. clip-path (exact)
- `inset(0 100% 0 0)` → `inset(0)`, 300ms enter curve.
- **Scroll image reveal**: `inset(0 0 100% 0)` → `inset(0)`, **800ms `cubic-bezier(0.77,0,0.175,1)`**, IO threshold 0.1, `rootMargin "-100px"`.
- **Comparison slider**: top layer `clip-path: inset(0 X 0 0)` from pointer events.
- **Hold-to-confirm**: `inset(0 100% 0 0)` → `inset(0)` over **2s linear** on `:active`; snap back in 200ms ease-out; button `scale(0.97)`.
- Tabs: a duplicated list clipped `inset(0 R 0 L)`, 200ms.
- Instead of animating radius, use `clip-path: inset(0 round 50px)`.

**Applies here.** Photo curtains at 800ms (0.77/0/0.175/1); "hold to see the finished room" via hold-to-confirm; before/after as the comparison slider.

## 6. Scroll (exact)
- **Gate**: never scroll-reveal above the fold (use a one-time intro); **2–4 reveal moments per page, never every section.**
- **Triggered reveals**:
  - Recipe: opacity 0 plus `translateY(10–16px)`, strong ease-out, **400–600ms**, `rootMargin "0px 0px -10% 0px"`.
  - **Once only.**
  - Stagger 80–120ms, varied by importance.
  - **Content visible without JS.**
  - One entrance per container (container or children, never both).
  - Use IO, never a scroll listener.
- **Scrubbed motion**: **no duration, `linear`**. In order of preference:
  1. `animation-timeline: view()` with `animation-range: entry 0% cover 40%`, inside `@supports (animation-timeline: view())`, with a readable fallback.
  2. Motion `useScroll`.
  3. Never a raw listener writing state.
- **Parallax**: **≤ ~15% differential**, transform only, decorative only, never on text, **off on mobile**.
- **Sticky scrollytelling**: monotonic, rewinds on scroll-back, **pinned ≤ 2–3 viewport heights**, skippable.
- **Never hijack scroll**: no wheel rewriting, no smooth-scroll libraries; `scroll-behavior: smooth` only for anchors; `will-change` only on scrubbed elements.

**Applies here.** **Conflict to resolve:** "never the same trick in ~10 sections" must not become 10 scroll reveals. Vary the *trigger type* (pointer, drag, scrub, hover, click, ambient) and keep scroll reveals to 2–4. Plans: dashoffset on `view()`. Renovation pin ≤ 2–3vh. Depth ≤ 15%, off under 768px and on `(pointer: coarse)`.

## 7. SVG (exact)
- **Line draw**:
  - Use `pathLength="100"` or `getTotalLength()`; **never hardcode the dasharray**.
  - Dash and gap `1px 1.1px` with round caps.
  - `0.6s (0.22,1,0.36,1) forwards` (forwards is required).
  - Stagger groups with `animation-delay`.
- **Transforms**: `overflow: visible` on the svg; `transform-box: fill-box; transform-origin: center` on a `<g>`; morph only same-structure paths (otherwise flubber).
- **Shake**: `rotate [0,20,-15,12.5,-10,10,-7.5,7.5,-5,5,0]`. Press: `scale 1→0.97→1.01→1`.
- **Ambient**:
  - Float 1.5px over 3s and rotate 2deg over 4s, ease-in-out, reversing.
  - **Non-syncing durations**, a ~2s initial delay and a repeatDelay.
  - Pause off-screen.
  - Busy scenes: `[data-animate]{will-change: transform, opacity, stroke-dashoffset; contain: layout style paint}`.

**Applies here.** Walls, then doors, then fixtures through staggered delays. Blueprint idle loops use non-syncing durations.

## 8. Text and component values
- **Entrances**:
  - Word stagger **80ms**, section **100ms**: `from{translateY(8px) blur(5px) opacity 0}` at **800ms `(0.25,0.46,0.45,0.94)`**. Use all three properties, because one alone looks cheap.
  - List stagger 30–50ms, under 300ms total.
- **Peripheral de-emphasis**:
  - `.grid:has(.chip:hover) .chip:not(:hover){opacity:.5; filter:blur(2px)}` (2–3px, never > 4).
  - Hovered `scale: 1.04`.
  - Opacity and filter 200ms ease; scale 150ms enter.
- Subtle exit: fixed `y:-12px` plus `blur(4px)`, spring `{duration:0.45, bounce:0}`. Crossfade: 150ms ease-out, 8px, blur 4px. Flip: 400ms enter, `perspective:1000px`.
- **Recipe values**:

| Recipe | Values |
|---|---|
| Container morph | open 580ms `linear(0,.45,.78,1,1.17,1.21,1.18,1.12,1.05,1.02,1)`; close 300ms `(0.32,0.72,0,1)`; content 140ms with 3px blur |
| Number pop-in | 500ms, 12px, 70ms stagger, 6px blur |
| Odometer | 260ms, enter curve, 1em slot, `tabular-nums`; roll only changed digits |
| Avatar falloff | −4px, scale 1.05, falloff 0.45^dist, 320ms; return `(0.34,3.85,0.64,1)` |
| Success | 550ms, rotate 80→0deg, bob 40px, blur 10px, path delay 80ms |
| Shake | 4px with 2px overshoot; 80+80+60ms; `(0.36,0.07,0.19,0.97)`; hold 1200ms |
| Dropdown / modal / tooltip | 250/150ms from 0.96 / 250/150ms at 0.96, centre / 125ms from 0.97, first delay 300–500ms |

**Applies here.** Hero: 80ms word stagger. Swatch grid: peripheral de-emphasis. Stats: pop-in (arriving) vs odometer (user-driven). Service tags: avatar falloff. Quote CTA: container morph (button → email field). Form: success and shake.

## 9. Performance
- **Cost tiers**:
  - Composite: transform, opacity, plus filter and clip-path in current browsers.
  - Paint: shadow, radius, color.
  - Layout: size and position properties.
  - Swaps: shadow → `drop-shadow`; radius → `clip-path round`.
- **Pausing and layers**:
  - Pause loops off-screen with an IO toggling `animationPlayState`.
  - Toggle `will-change` only during motion; it also fixes 1px shifts.
- Long tasks over 50ms cause jank: don't co-schedule them with animation starts, and chunk at a **5ms** budget with `scheduler.yield()` or `setTimeout(0)`.

**Applies here.** Init Three.js after the hero intro or on IO near its section. Pause every canvas and marquee off-screen.

## 10. Reduced motion
Replace spatial travel with **immediate state or restrained fades**. Pause loops with `animation-play-state: paused` (not `display:none`). **Keep user-triggered feedback** (opacity, colour). **JS motion must branch on `matchMedia`**, because a CSS block alone misses it. **No global `transition: none`.** Skip optional SFX. Gate hover with `@media (hover: hover) and (pointer: fine)`.

**Applies here.** Under reduce: native cursor; parallax, marquee and loops paused; plans fully drawn; counters final; reveals become 200ms fades. Before/after and orbit stay usable without inertia. Touch: no custom cursor, no hover.

## 11. Measurement method
Extract frames and a contact sheet, with **open and close as separate clips**. Do a vision pass for translate, anisotropic scale, opacity, blur, radius, shadow and colour, noting what leads and what lags. Judge fades by eye; track and fit spring vs bezier for springs. Build a choreography table (start and settle frame per property; ms = frame/fps·1000), emit code plus a handoff spec per direction, then re-record and compare at 0.1×. Pass the extraction fps to the fit (the default 30 doubles durations). Fit error: < 0.03 tight, 0.03–0.08 eyeball, > 0.08 split the phases. Overshoot beyond bezier y 1.5 needs a spring or `linear()`. Patterns: blur leads by ~100ms; scaleY over-stretch 1.06 at 70%.

## 12. Review checklist
**Ten standards**:
1. Justified.
2. Frequency-appropriate.
3. Responsive easing (no ease-in or weak built-ins).
4. Sub-300ms UI.
5. Origin correct (no `scale(0)`; start at 0.9–0.96).
6. Interruptible (no keyframes on rapid triggers).
7. GPU-only (no layout props, `transition: all` or parent-var drag).
8. Accessibility (hover gating, reduced motion exercised).
9. Asymmetric (press 0ms).
10. Cohesion (personality, blur crossfades, 30–50ms staggers).

**Remedy order**: delete → reduce → easing → origin → interruptible → GPU → asymmetric → polish → accessibility.

**Output**:
- A Before/After/Why table first.
- Then tiered findings: feel-breaking, simplifications, performance, interruptibility, origin and cohesion, accessibility.
- Then **Block** (feel-breaking, scale(0) or ease-in, or an easy non-GPU fix) or **Approve**.

**Extra checks**: pointer capture; one transform owner; touch targets ≥ 44px; hover ≤ 1.03 at 100–150ms; bounce only the open; no live detent snapping; no hardcoded dasharray.

**Validate**: grep for layout transitions and `transition: all`; toggle rapidly (it must retarget); run at 10% speed; test on real touch devices; repeat the task under reduced motion.

**Debug**: easing before duration, one variable at a time. Sluggish: ease-in, built-ins, > 300ms or a delay. Robotic: linear or a uniform stagger. Cheap: scale(0), wrong origin or an unblurred crossfade.

**Novelty budget**: about 90% familiar to 10% novel, and **no high-novelty beats in consecutive sections**. Intros run once.

**Applies here.** Grade every section × version with this. Put a calm section between showpieces (3D room, before/after, plans) so "never the same trick" doesn't become wall-to-wall novelty.
