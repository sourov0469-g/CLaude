# GATE: Home 5 · Process

**Built:** ONE version, the owner's V1 direction with the NEW eight-frame horizontal animation that replaces the car (owner's shortlist; Muse ruling 1: where the owner already picked, deepen the winner, no second version).
- **Pattern required by the owner:** nothing starts early; the animation comes fully into view, PINS, plays through while scrolling, then releases.
- **Files:** `remodeling/src/sections/process.html`, `css/sections/process.css`, `js/sections/process.js`. The superseded car version is in git history (`ce59679`).

## What it is
- **One continuous drawn site:** eight frames sit side by side in one SVG world (`viewBox 0 80 8000 760`). A camera travels across it while the section is pinned (Immersive Garden). The neighbours peek in at both edges at 22% opacity, so it reads as one place, not eight slides.
- **The words stay still while the world changes:** the stage number, week mark, title and the firm's own line swap per stage on the left.
- **The rail:** eight marks, with the week numerals landing as events (AirPods). Below it sits the firm's note, "Timelines vary by scope and jurisdiction."
- **Every frame draws itself as it arrives:** strokes first, then fills (fill-opacity, so the outline is visible while it draws), then words. Frame 1 draws itself as the section comes into view (`top 85%`), so the window is never empty on arrival.
- **The frames** (titles, week marks and lines are verbatim from FACTS "The eight-stage process"):
  1. **Consultation:** a kitchen-table consultation; homeowner and Elbaz rep over a drawing, a steaming cup, the clay hard hat resting on the table.
  2. **Site evaluation:** the house, the flood-zone line, the HVHZ wind, and a wall opened to show the studs and a pipe behind it. The inspector points at the opening.
  3. **Design and planning:** a plan with a correct door swing, an island, a dimension line ("Layout option B"), and a fan of finish swatches.
  4. **Proposal and scope:** a written scope. Lines write themselves, five ticks, one "Not included" cross, and a contingency note.
  5. **Permitting:** the permit file, then stillness, then the "Notice of Acceptance" stamp lands (`power4.in`); a Florida Product Approval tag.
  6. **Construction:** studs rise in a wall frame, a ladder, a worker, and the broom at the end of the day ("a site that gets cleaned at the end of the day").
  7. **Quality review:** the walkthrough sheet ticks along; the Elbaz lead holds the scope on a clipboard, and the homeowner points.
  8. **Completion and handover:** the finished house; the key passes from the Elbaz hand to the homeowner's hand, and the warranty cards are registered.
- **Phones (≤900px), short screens (<640px tall) and reduced motion:** there is no pin. The ordered list is the story, and each stage gets its own drawn frame inline, a viewBox onto the same site (S1325/S1326). On wide screens with reduced motion it lays out as a 4-column storyboard (2 columns from 700px).
- **The companion:** `data-buddy-watch` on the window sends it to the corner during the pin.

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the owner | 8 | Pin, play and release exactly as asked; frame 1 is a consultation scene; the car is gone | The drawing is a clean line-art language, not illustrator-grade art |
| Motion and flow | 8 | One master timeline, scrubbed (`.8`), reversible. Per frame: camera 0.3, draw about 0.45, hold about 0.35. The stamp has its own stillness beat. Measured pin top 0 for all 8 stages; clean release into Financing | No ink-line carrier into Financing yet (dividers pass) |
| Visual craft | 7 | One drawing language (ink 3.2/1.6, sand and paper fills, one clay accent); compositions fixed across 4 cycles (see below) | Figures are simple stick-and-block people; faces are a single eye mark |
| Accessibility | 9 | The real content is an `<ol>` with the firm's text; the window is `aria-hidden`. No pin on phones or under reduced motion; no horizontal overflow at 390 (scrollWidth 390) | |
| Facts | 10 | Stage titles, week marks and lines verbatim; no new numbers | |
| Performance | 8 | One SVG, transforms only on the world (`will-change: transform`); the drawSVG and fill tweens run on the active frame only | 8000-unit SVG is always in the DOM while pinned |

## Defects found and fixed across cycles
1. **Cycle 1:** the camera barely moved, because the SVG's auto width did not match the 8-frame world. Fixed by sizing the world explicitly from the window height.
2. **Cycle 2:** the world rendered at 873px instead of 5102px, so the art was tiny. A global `svg { max-width: 100% }` capped it and `meet` scaled the content down. Fixed with `max-width: none; max-height: none` on `.pr__world`. Re-measured: 5102px.
3. **Cycle 3, pacing:** the camera took half of every frame's scroll time, so a finished drawing held for only about 0.18 of a frame. Rebalanced to camera 0.3, draw, then a hold of about 0.35.
4. **Cycle 3, scale:** the scenes sat low, with dead air above. The world now shows the y 80–840 band, the same band the list frames use.
5. **Cycle 3, drawings:**
   - **Frame 2:** the wall cut overlapped a window, so the cut now replaces the right window. The tangled inspector arms and tape line became a point. The flood label overlapped the wall, so the house moved right.
   - **Frame 3:** the door-swing arc ended at the wrong point. Redrawn as the leaf up from the hinge, with the arc to the jamb. A stray swoosh was replaced by a "Finishes" label.
   - **Frame 5:** the product-tag text overflowed the tag, so the tag was widened.
   - **Frame 6:** the broom did not read. Redrawn with a handle, a trapezoid head and bristles.
   - **Frame 7:** the inspector's arms crossed the body. Now the clipboard is held out, with lines on it.
   - **Frame 8:** the key was handed to the house wall. It now passes hand to hand. The back warranty card was hidden, so the cards were re-offset.
   - **Frame 1:** a floating "gesture" line was removed.
6. **Cycle 4, short viewport:** at 1280×720 the rail and note ended at 795px, off-screen. The pin is now exactly `100svh`, and the window fills the remaining row (max 620px). Re-measured: the note bottom is at 696px.
7. **Cycle 4, readability:** the finished neighbouring frame read as part of the current scene. Off-stage frames now sit at 0.22 opacity, with a 400ms ease-out.
8. **Cycle 4, the motion law:** filled shapes had both `d` and `f-*` classes, so their outline drew while opacity was 0 and then popped in. Now `fill-opacity` animates, and the outline is visible while drawing (evidence: mid-draw capture).
9. **Cycle 4, reduced motion on desktop:** the eight frames rendered at 1360px each (the section was 10,911px tall). Now a storyboard grid (the section is 1,298px), top-aligned.

## Defects remaining (honest)
- **Drawing finesse:** the people are deliberately simple, and an illustrator would give them more character (hands, posture).
- **No carrier line** from Before/After into this section, or out of it into Financing, yet; scheduled for the flow seams pass.
- ~~**The inherited divider** below this section (zig-zag teeth) is the old one, pending the dividers system.~~ **Fixed by the dividers pass:** the Process rail runs on and forks into the Financing routes.

## Skills applied
- **Flow and motion:** S1326 (one value drives everything, reversible), S0186 (scrub with ease none on the master), S1209 (finite pin, about one viewport per frame), S0362 (strokes before fills).
- **Accessibility:** S1325 (the list is the content).
- **Interaction and taste:** notes-C (one easing language, the 250/400ms durations), notes-F (one drawing language).
- **References:** Immersive Garden (camera across one world), AirPods (events landing on a rail).

Render evidence: `qa/finalize/home-process/`.
- `process-8-frames-1440.jpg`: all 8 frames settled.
- `process-pinned-1280x720.jpg`
- `process-release-1280x720.jpg`
- `process-middraw-strokes-before-fills.jpg`
- `process-reduced-motion-storyboard.jpg`
- `process-phone-390-list.jpg`
- Zero console errors in all runs.
