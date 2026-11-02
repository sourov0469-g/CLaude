# GATE: Home 4 · Before/After

**Built:** ONE deepened version, V1. Owner: "DECISION: stick with V1… UI/UX needs to be much better". There is no second version (Muse ruling 1).
- **Centrepiece:** the transformation is engineered from the **MERSI seam mechanism**, never from Ever (Muse ruling 3). The MERSI source file is absent; see `REFERENCE-STUDY.md` and PROGRESS.
- **Files:** `remodeling/src/sections/ba.html`, `css/sections/ba.css`, `js/sections/ba.js`. Superseded versions are in git history (ruling 5).

## The images (owner's request versus the locks)
- **Owner:** replace the low-res images with high-quality stock or AI pairs that read as genuine.
- **Brief fact lock:** only the 4 genuine pairs may be presented as Elbaz work, and display imagery is never captioned as Elbaz.
- **This container has no image-generation or stock source** (blocker in PROGRESS). So the build keeps the **4 genuine pairs** and upgrades their presentation:
  - each pair is a mounted print at **no more than 1.35× its published width** (measured: outdoor pair 558px native, shown at 753px max, and capped further by viewport height);
  - the softness reads as a photograph, not a stretched defect.
- **When a high-quality source is available,** the pair table in `ba.js` (`PAIRS`) is the single place to swap images. The captions would then need the "display imagery, not Elbaz work" rule applied.

## What changed (UI/UX)
| before (V1 as reviewed) | now |
|---|---|
| Photos stretched to about 1.65× native (blurry) | Prints at ≤ 1.35× native on a drawn board with registration marks; the print is capped by viewport height too |
| A heavy list of four big titles dominating the left | Compact pair rows, each with a mini before/after thumbnail, title and published duration; the selected row carries a clay rule |
| Seam static until dragged | MERSI: on first view the seam travels with the scroll (from mostly before to half and half, measured 0.54 at centre), then any input takes over for good |
| Pair change was an instant swap | Cut the curve leftward: the print accelerates out (`power4.in`, 72px) and the next arrives mid-flight (`power4.out`); the seam then sweeps again |
| Stud handle only | The stud keeps the owner's V1 identity (timber, nails, grip) plus a live tape reading in inches (`0–48 in`) |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity | 7 | V1 kept and deepened | The owner's image request is blocked (no HQ source); presentation upgraded instead |
| Interaction | 9 | The native range is the whole stage (pointer, touch, keys, screen readers); `aria-valuetext` in words ("All before", "N percent before…"); tablist with arrows and Home/End (measured selection moved); drag maps 1:1 (measured 0.19) | |
| Motion and flow | 8 | Scroll-scrubbed first sweep (reversible); cut-the-curve between pairs | No carrier yet from the Services last sheet into this board |
| Accessibility | 9 | Firm's own alt texts on every image; a caption states before and after; focus ring on the grip; 72px rows; no overflow at 390 | |
| Facts | 10 | Only the 4 genuine pairs; published durations; firm's alt texts verbatim | |

## Defects found and fixed across cycles
1. **Cycle 1:** the larger pairs (kitchen 4, outdoor) overflowed the board, because the grid track auto-sized to the print. Fixed with `minmax(0, 1fr)` plus a viewport-height cap through the pair's aspect ratio. Re-measured: the print fits (665px wide in a 1440 layout).

## Defects remaining (honest)
- **Image quality:** this is bound by the published source size (owner's ask blocked).
- **Divider:** the inherited shape divider above this section (old teeth) is still the old one, pending the dividers system pass.

## Skills applied
- **Flow and motion:** S1326 (one normalized value, reversible), S0576 (cut the curve, partial travel, mirrored power4).
- **Interaction:** S1018 (slider keyboard and announcements), S1324 (aligned layers; static on coarse pointers via the native control).
- **Visual:** S1425 (tags on paper, never text on a photo), S1421 (one drawing language: board, registration marks, tape, stud).
- **Accessibility:** S0657.

Render evidence: `qa/finalize/home-ba/`.
