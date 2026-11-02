# Skill digest E: interaction, cursor, micro (read in full, my own thread)

Skills: S1448, S1455, S1443, S0452, S0212, S1441, S0462, S0574, S1018, S1324, S0340, S1323.

## Companion law (synthesis; this governs Phase 2)
1. **At most two cursor things at once:** the pointer tip (the exact hotspot) and the companion. Remove the per-element reaction sprites (react.js and rig.js). Variety lives inside the companion as its own pose or prop reaction per element type, in line with the owner's order.
2. **Tip-targeting** (S0574):
   - The hotspot is the tip.
   - A press pivots on the tip, with an asymmetric 1:2 tap: compress `scale .84` over 0.1s with `power2.in`, then return to 1 over 0.22s with `power2.out`.
   - The target's own reaction is a separate tween that starts on the same frame. Inert targets get no reaction.
3. **The click ignites the next beat** on the same frame. The companion's reaction starts on the click frame, never after it (S0544 causal motion).
4. **Physical entry and exit.**
   - The companion enters on one continuous vector, from the pointer's edge of the screen or from its dock. It never opacity-fades in at rest and is never mask-revealed.
   - It leaves physically: off the edge on a `power2.in` ramp, or by docking.
   - During beats it doesn't own, such as reading a paragraph or watching a pinned scene, it drifts aside over 0.5 to 0.9s with `power2.out`. It never wobbles idly.
5. **Physics, not durations, for the follow** (S0340/S1323).
   - The companion is a body with mass on a spring that trails the pointer. Mass is felt in the lag; frequency and damping show in the motion.
   - Name the model in one sentence. Tuning target: about 2.2 Hz natural frequency, ζ about 0.72 (around 4% overshoot), mass 1.2. That reads as a light helper that lags a fast flick by a few px.
   - It is interruptible by construction: velocity is never reset on a re-target.
   - Tilt comes from velocity through a second body or a derived value, with lean ±10° maximum.
   - Everything visual derives from state, not time: squash from speed and lean from velocity.
6. **Touch and reduced motion.**
   - On `(hover:none)` or `(pointer:coarse)`: no custom cursor at all. Native behaviour, no stationary emitter, no plume.
   - Under reduced motion, the companion is either a static docked badge or absent, with no trailing easing.
   - Nothing may depend on the pointer alone. Every companion reaction is decorative, and the target keeps its own focus-visible state for keyboard users.
7. **Hit areas** (S0462/S1441).
   - Spacing between interactive siblings lives inside each target, never in a gap between them.
   - Minimum target sizes: 24×24 for pointers, 44×44 for touch.
   - Sweep test: hover never drops out inside a continuous band.
8. **Loop hygiene.** One rAF loop for the cursor system. It stops when settled, pauses on `document.hidden`, clamps dt to 1/30, and caps DPR at 2.

## Per-skill rules
### S0574 oversized-cursor
- **Applies to:** companion entry, tip pivot, click tap, handoff across pinned seams.
- **Rules:**
  - The tip pivot is `transformOrigin` at the arrow tip.
  - The press uses a 1:2 time ratio.
  - The target reacts in parallel.
  - The companion never fades in or out in place.
  - During a seam, the companion can be the carrier: it ramps out with `power2.in` toward the next target, which picks it up with `power2.out`.
- **Audit:**
  - Does any cursor element ever fade in at a resting position?
  - Does every click cause something on the same frame?

### S0340 diip3sh/feel
- **Applies to:**
  - companion follow;
  - Proof boxes, which are draggable, throwable and stackable;
  - the BA seam handle;
  - the toggles.
- **Rules:**
  - Motion comes from mass, stiffness and damping.
  - A release keeps its real velocity.
  - The landing position is decided by projection, `x + v·m/c`, never by a ms threshold.
  - Walls catch overshoot at the end of travel.
  - A grab mid-flight takes over the current x and v without a jump.
  - The keyboard reaches every state.
  - Under reduced motion, the body jumps to rest.
  - Each number gets one sentence of rationale. Physics with arbitrary numbers is just a fancier easing curve.
- **Audit:**
  - Does a throw land where the projection says?
  - Does a grab mid-motion jump?
  - Is keyboard parity present?

### S0452 matterjs
- **Applies to:** Proof boxes.
- **Rules:**
  - Use a custom renderer: DOM transforms from body positions, no debug canvas.
  - Pause the runner offscreen.
  - Clean up runner, listeners and world on teardown.
  - Use a mouse constraint only for the drag.
- **Decision:** I keep my own small rigid-box solver (axis-aligned stacking with gravity, a throw, wall bounds and a hover bend), consistent with this skill's custom-renderer and teardown rules. The library is not loaded.

### S1018 draggable-accessibility
- **Applies to:** Proof boxes and the BA slider.
- **Keyboard:**
  - each box is focusable;
  - Space or Enter picks up and drops;
  - arrow keys move;
  - Escape cancels.
- **Announcements:** state changes go to an `aria-live` region. Instructions are visible or provided through `aria-describedby`.
- The BA slider uses `role="slider"` with `aria-valuenow` and arrow-key steps.

### S1324 reveal-hover-effect
- **Applies to:** a BA alternative mode and hover-to-reveal on the project images.
- **Rules:**
  - The two layers are pixel-aligned.
  - Feathered radial mask stops: 0/40% at 1, 60% at .75, 75% at .4, 88% at .12, 100% at 0.
  - Pointer ease 0.1, radius ease 0.14, radius 140 to 260px.
  - The reveal begins under the pointer.
  - The mask collapses on leave, cancel and blur.
  - The loop stops when settled.
  - Coarse pointers get a static view plus an explicit toggle.

### S1323 pointer-trail-emitter
- **Applies to:** the companion's dust or sawdust trail, if one is used.
- **Rules:**
  - Emit by distance, never by time.
  - Cap at 14 spawns per frame.
  - Take the ring-buffer slot before advancing.
  - Damp the emitter toward the pointer.
  - Motes coast.
  - Idle emission at most every 0.42s.
  - On touch, emit only during a drag.
  - Under reduced motion, show a designed still.
- **Decision:** a trail would be a third cursor thing, which breaks the owner's max-two rule. **Not used.** The only trace allowed is a transient click puff that belongs to the companion.

### S1448 micro-interaction-spec / S1455 state-machine
- Every micro-interaction is specced as trigger, rules, feedback, loop, duration and easing, and accessibility.
- Most durations fall between 100 and 500ms.
- The companion is modelled as an explicit state machine:
  - states: hidden, entering, follow, hover(kind), press, drag, dock(reading), exit;
  - every state has a way out;
  - impossible states are prevented, such as press and hidden at once.

### S1443 gesture-patterns
- Activation threshold 10 to 15px; direction lock between scroll and drag.
- Tap versus long-press boundary at 500ms.
- Every gesture has a button alternative.
- Threshold feedback through snap and rubber-band.

### S0212 design-spells
- A spell must be additive, never a barrier. A janky spell is worse than none.
- Spells are GPU-only, keyboard and touch safe, and reduced-motion safe.

### S1441 fitts-law
- Primary CTA is large and within thumb reach.
- Mobile sticky call bar at the bottom.
- Hit area grows through padding.
