# GATE: Home 2 · Proof

**Built:** ONE deepened version, V2. Owner: "GOOD, the better idea… needs major work". Per Muse ruling 1 there is no second version.
- **Owner's required work, all done:**
  1. Much better UI/UX.
  2. Boxes draggable again: grab, move, throw, and stack them on each other or set them where you want.
  3. A subtle hover bend: "a small bend, a little movement, not too much".
- **Files:** `remodeling/src/sections/proof.html`, `css/sections/proof.css`, `js/sections/proof.js`. Superseded versions are in git history (Muse ruling 5).

## What it is now
- **The blocks:** four fact blocks on a drawn plywood deck.
  - **Licence:** a CMU block carrying a stamped plate with the licence string verbatim.
  - **Reviews:** a timber beam reading 4.8 with five stars and "343 Google reviews".
  - **Area:** a clay brick, "104 municipalities across three counties".
  - **Work:** a glazed tile, "26 projects, 44 photographs, all our own work". This is the fact lock "44 real photos of 26 projects", phrased with the firm's own line "Every image is our own work".
- **Text:** everything is DOM text (selectable, AA). The materials are drawn SVG in the brand palette.
- **Solver (my own):**
  - gravity, floor and walls;
  - stacking resolved along the smaller overlap;
  - a release keeps the hand's velocity (throw), with the 60ms stale rule;
  - tilt comes from horizontal speed;
  - a squash on landing;
  - a support rule: under 35% support, a block slides off and lands level;
  - sleeps when still.
- **Hover bend:** a spring toward the pointer's side, at most about 2°.
- **Entry:** the four facts arrive as a keyed sequence, one beat each (Scout), when the section is reached. Each lands with a squash (causal motion).
- **Keyboard:** Space or Enter picks up and sets down, the arrows carry, Escape puts back. An `aria-live` region announces each state; instructions come through `aria-describedby`.
- **Foot:** the licence string sits beside "Verify the licence" (the licence line where trust is asked), plus "Read the 343 reviews" and "Restack the blocks".
- **Companion:** every block is `data-buddy="drag"`. Hands go forward, and close when the block is grabbed.

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity | 9 | All three owner requirements are met and measured: stack (brick rests on the beam, bottom 713 to top 714), throw (the tile flew and landed on the CMU), bend (`p2-hover`). | |
| Interaction | 8 | Pointer capture; the held block wins collisions; walls; no stuck states (pointerup, cancel and lostpointercapture all release). Keyboard parity with announcements ("…set down."). Zero overlaps after settling (measured 0). | On touch, blocks capture the gesture (`touch-action: none` on the blocks only); no direction lock yet. |
| Craft and materials | 7 | Drawn materials (CMU cores and pores, timber grain and knot, brick frog, tile glaze); the shadow grows when lifted (S0490 elevation by z). | The materials are clean but simple; they could carry more construction detail. |
| Motion and flow | 7 | Keyed arrival sequence; squash on landing; visuals derive from state (S0340). | The dock from the hero frame into this deck is not yet a true carrier hand-off; the deck line simply exists. |
| Accessibility | 8 | Text-on-material contrast: ink on sand, timber and paper above 10:1; white on clay-600 at 5.31:1. Focus rings. 44px links. Reduced motion: no drop-in or tilt, moves resolve instantly, blocks visible at rest (measured). | |
| Facts | 10 | Only lock facts and the licence string verbatim (twice). | |
| Performance | 8 | Transform-only rendering; the solver sleeps after 20 still frames; `k.raf` clamps dt. | |

## Defects found and fixed across cycles
1. **Cycle 1:** a block could rest straddling another on a sliver of support, a cantilever no real block holds. Fixed with the support rule; re-measured, the CMU slid off and landed level, and the tile now rests on it with 71% support.
2. **Cycle 1:** the duplicate `class` attribute on the live region. Fixed.
3. **Cycle 2, mobile:** a 520px stage left a large empty band. It is now 400px; measured no overflow, and every block stays inside the stage at 390px.

## Defects remaining (honest)
- **During entry:** the blocks fall through the header area for a fraction of a second. It is momentary and reads as "dropped in", but they pass over the lead text.
- **Touch:** a direction lock between page scroll and block drag is not implemented. Touching a block drags it rather than scrolling the page.
- **Carrier:** the hero-frame-to-deck dock (a true carrier) is still to come when the flow seams are tuned across Home.

## Skills applied
- **Interaction and physics:** S0340 (physical model, release velocity, projection feel), S0452 (custom renderer, teardown), S1018 (keyboard drag pattern, live announcements), S1443 (drag affordance), S1441 (targets).
- **Visual:** S0490 (elevation grows when lifted), S1435 (the numerals stand out).
- **Flow and motion:** S0544 (causal landing; no idle wobble, nothing moves at rest).
- **Performance and accessibility:** S1315 (loop sleeps), S0400 (reduced motion).
- **Reference:** Scout (keyed sequence of evidence).

Render evidence: `qa/finalize/home-proof/` (before V2; interaction sequence: arriving, landed, hover bend, held with tilt, stacked, thrown, settled, keyboard; mobile 390; reduced motion).
