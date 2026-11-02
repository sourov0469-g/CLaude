# GATE: Home 8 · Reviews

**Built:** ONE version, the owner's merge: V1 (the tally ledger) plus V2 (the stars). V2's star entrance is replaced by a scroll animation of the stars coming together, as the owner asked. Inherited slots and backups are in git history (`ce59679`).
- **Files:** `remodeling/src/sections/reviews.html`, `css/sections/reviews.css`, `js/sections/reviews.js`.

## What it is
- **The stars:** 343 small stars, one per published Google review, start scattered over the sky.
  - One scrubbed, reversible timeline brings them together left to right into five large stars.
  - The fifth star is filled only up to 0.8 of its width, with a dashed mark at the line, so the drawing itself says 4.8 of 5.
  - The five outlines draw first, so the shapes are waiting.
  - Then "4.8 out of 5, the average across all 343 Google reviews" lands last (`power4.out`).
- **The ledger (V1):** as each small star lands, it scratches its stroke into the ledger beside it, five to a gate, ten gates to a line.
  - Every gate is focusable, with a hover/focus tip ("Reviews 16 to 20") in a live line.
  - Measured in sync: 0 → 138 → 276 → 343 strokes as the stars gather.
- **The figure is the count:** the script refuses to draw if it doesn't produce exactly 343 stars (measured 343 stars, 343 strokes, 69 gates).
- **The CTA:** "Read all 343 on Google" goes to the firm's own Google listing.
- **Reduced motion:** the gathered stars and the full ledger, still. Phones: the sky above the ledger.

## Facts check
- **Aggregate-led only:** the two published figures, 4.8 and 343, and the firm's listing link.
- No quote, no reviewer name, no other number. Zero em dashes.

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the owner's merge | 9 | V1 ledger and V2 stars in one piece; the stars come together on scroll | |
| Motion and flow | 8 | One scrubbed timeline, waves left to right, strokes synced to landings, no idle motion | The hand-off into Towns (5 stars to 5 map pins) waits for the flow seams pass |
| Visual craft | 8 | Ink outlines, clay stars, ruled ledger with a clay fifth stroke per gate | The tiny stars read as texture at phone width |
| Accessibility | 9 | The star field is one `role="img"` with a full sentence; the ledger is a labelled group of focusable gates with a live tip; the CTA names the count | |
| Facts | 10 | 4.8 and 343 only; the drawing refuses a wrong count | |

## Defects found and fixed across cycles
1. **Cycle 1:** the sky viewBox (600×330) left a band of empty space under the five stars, and the ledger at 7 gates a line ran far taller than the left column. The sky is tightened to the stars' band (0 92 600 140), the ledger set to 10 gates a line, and the columns centred. Re-rendered: the columns balance at 1440.
2. **Cycle 1:** the scattered stars could drift over the headline and lead. The scatter is now bounded to the sky's band.
3. **Cycle 2 (my own process):** a scripted edit stopped partway (a comment did not match), so only the viewBox landed. It was caught by re-reading the result and re-applied in full before the retest.

## Defects remaining (honest)
- **No seam yet:** neither the upward rise in from Projects nor the 5-stars-to-pins hand-off out to Towns; scheduled for the flow seams pass.
- **The dashed 0.8 line** is quiet. Muse may want it louder, or labelled.

## Skills applied
- **Motion:** S1326 (one scrubbed value, reversible), S0362 (outlines draw before the fill arrives).
- **Hierarchy and proof:** S1435 (Von Restorff on 4.8), the AirPods numeral event, BANK KBF "The Ledger" (checkable proof).
- **Accessibility:** S0657 (labelled group, focusable gates, live tip).

Render evidence: `qa/finalize/home-reviews/`. Zero console errors at 1440, 390 and reduced motion.
