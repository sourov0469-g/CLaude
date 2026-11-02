# GATE · Sweep the lawn, the game (proof section 3 of 3): two versions, built one at a time

**Where it lives:** `owl/site/owl-roofing.html`, home §4. Sources are in `owl/site/src/sections/game/`.
- Switch versions with `?v=game:1|2` or Shift+V.
- **Default: V1.**

## Reference studied first
**Bruno Simon** (frames plus code digest: Three.js / WebGPU, Rapier physics, Howler audio).

**The mechanism that transfers:** "explore to find". The space rewards curiosity, and the start teaches the controls.

**Rules taken from its failures:**
- Exactly one small space, in one section.
- No heavy assets (one SVG per stage).
- Keyboard and touch paths, and a reduced-motion path.
- The phone action stays visible (call bar plus the win CTA).

**Never transferred:** the car, the neon world, the props, the audio, WebGL.

## Skills applied
- ⟦S1452⟧ peak-end: this is the page's peak. The win is a warm, plain completion in Owl's own words ("That was round
  two. Round three: a project manager checks it all again."), followed by Call and Text, never a score screen.
- ⟦S0489⟧: wheels roll by distance (angle = dx / r); nails lift with an out ease; no idle wobble.
- ⟦S0546⟧: the cursor companion steps aside over the stage (`data-owl-busy`).
- ⟦S0070⟧ / ⟦S0400⟧: keyboard play, an aria-live count, focus returned on reset, playable with instant moves under
  reduced motion.
- ⟦S0659⟧: the 12 nails are the game's own count, labelled as such; no invented statistics.

## V1 · Sweep the lawn (side view, as storyboarded)
**Play:**
- **Controls:** drag Owl's rolling roofing magnet left and right across a lawn, or focus the yard and use ← →.
- **Collecting:** nails half-hidden in the grass (drawn behind the front blades) lift and stick to the amber magnet face.
- **Start:** the magnet starts parked on stage with a "Drag the magnet" hint, which fades on first play.
- **Scroll:** `touch-action: pan-y` keeps vertical page scroll working on phones.

## V2 · Find the nails (top-down yard: Bruno's free exploration)
**Play:**
- **The yard:** drawn from above: a hip roof, a driveway, flower beds, a fence.
- **Hidden nails:** the nails cannot be seen until the magnet's dashed reach circle comes near; then they appear and fly
  to the bar.
- **Find-aid:** with two left, the remaining nails glint faintly (the storyboard's aid).
- **Controls:** mouse hover steers. On touch, tap to move: no drag-capture, so the page still scrolls. Arrow keys move in
  2D.

## The shared engine (one small engine, two stages)
**Input:** pointer drag with capture, plus V2 mouse hover, tap-to-move on touch, and arrow keys. Movement uses a
frame-rate-independent chase, so it never teleports.

**Collision:** **continuous**. Each nail is tested against the segment the magnet swept that frame, so a fast move can
never skip a nail.

**Budget:**
- 12 nails and at most about 220 grass blades.
- Transforms only.
- requestAnimationFrame runs only while something moves.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 sweep (side) | V2 find (top-down) | Evidence |
|---|---|---|---|
| Design | 7.5 | 7.5 | V1 reuses the identity's own magnet drawing at a playable scale. V2 is a clean drawn yard. Both are one SVG in the brand grammar. |
| Usability | **8.5** | 7.5 | V1: one axis, impossible to get lost, and it works with both a thumb and keyboard arrows. V2: hidden nails make the last few harder (mitigated by the glint), and on touch it is tap-to-move. |
| Creativity | 8.0 | **8.5** | V1 turns Owl's round-two cleanup into the controller. V2 is truer exploration: hidden nails, a reach circle, a yard seen from above. |
| Content | 8.5 | 8.5 | Owl's own process and words; the count is labelled as the game's. |
| **Weighted** | **7.95** | **7.80** | |

**Vetoes:** none. No JS errors, no overflow at 390 or 768, a real tel/sms CTA at the win, the call bar visible
throughout.

**Default: V1.** It is the clearer, faster peak and plays the same with a mouse, a thumb or a keyboard. V2 stays
switchable for the explorer.

## Tests: 16/16 pass, on three consecutive runs after the fixes (`gametest.mjs`)
- **V1:**
  - A mouse drag collects 12.
  - The win shows with tel/sms CTAs.
  - The aria-live count reads 12.
  - Start over resets and focuses the yard.
  - Keyboard-only play collects 12.
  - `touch-action: pan-y` is in place.
  - The companion is busy-aside.
- **V2:**
  - A mouse hover sweep finds 12.
  - Nails are hidden at the start.
  - Keyboard-only play finds 12.
  - Touch taps collect all 12.
  - No overflow at 390.
- **V1 at 390 and 768:** no overflow, no errors.
- **Reduced motion:** playable, with instant moves (12/12).
- **Regressions:** hero 27/27, nest 16/16.
- **Token lint:** clean.

## Defects found and fixed
1. **Skipped nails on fast moves.** Under reduced motion only 5/12 were collected; V2 keyboard play collected 10/12.
   Collision was checked only at the magnet's position per frame, so moves faster than frames jumped over nails. Fixed
   with **continuous (swept-segment) collision**.
2. **V2 edge nails could go unfound** when the chasing magnet cut corners at the yard edge. Hidden nails gave no clue.
   Added the storyboard's find-aid: with two left, they glint at 40% opacity.
3. **V1 idle:** the magnet started mostly off stage, when the storyboard says parked. It now starts fully on stage; the
   nails moved out of its reach.
4. **V1 at the far right:** the magnet's handle ran past the stage edge. Its travel is capped so the whole sweeper stays
   on stage.
5. **The test's own pacing:** keypresses every 8ms are faster than any key repeat. Moved to a realistic 30ms repeat with
   pauses at row ends. The engine fix (1) makes it correct at any speed regardless.

## Remaining (honest)
- **V2 on touch** is tap-to-move. A drag mode would trap page scroll, so it is deliberately not used.
- **No sound:** a deliberate choice (Bruno's audio is not imported).
- **Real-device check:** the game has not been checked on a real phone (Chromium touch emulation only).
