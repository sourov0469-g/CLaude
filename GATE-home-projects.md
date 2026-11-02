# GATE: Home 7 · Projects

**Built:** TWO versions, per `PHASE1-PLAN.md` row 7 (Muse ruling 1):
- **A:** the owner's V1 (two rows in opposite directions, the middle arrows removed), carrying V5's frame design with its animation.
- **B:** V8's idea (the job binder), done better.
- **Removed:** V2's drawing sheet and the other inherited slots (git history, `ce59679`).
- **Files:** `remodeling/src/sections/work.html`, `css/sections/work.css`, `js/sections/work.js`.
- **Content:** the firm's own project photographs and the firm's own titles (`data/projects.json`). Two photos whose subject does not match their title stay out (earlier owner item), so no count is printed.

## V1 · Two rows of hung frames
- **The rows:** kitchens run left; bathrooms and whole homes run right (GSAP seamless loop). The chevron treads between the rows are gone.
- **The frames (V5's design):** each photo is a framed print on a picture rail, hung by a V wire, a little crooked (±1.7° at most). Only the frame and its wire hang crooked; the caption (plan-room number, room, firm's title) stays upright and sharp.
- **Hover:** pointing at a frame slows its row to a crawl. The frame sets level, lifts 4px, and a small spirit level appears on its top edge with the bubble centred.
- **Arrival:** the frames drop onto the rail once as the rows arrive (`power4.out`, staggered). There is no idle motion.
- **Speed:** one smoothed value per row. Pointer or focus gives 0.1×; scroll velocity adds up to +1.2×. As the section leaves, the rows decelerate to rest (plan OUT). While off-screen they are paused.
- **Pause control** (WCAG 2.2.2): "Pause the rows" / "Run the rows" with `aria-pressed` and a pause/play glyph. Measured: zero movement over 0.8s when paused.
- **Focus:** a focused frame stops its row and glides to the middle (focus not obscured).
- **Click:** opens the shared viewer with a flight from the frame.
- **Reduced motion:** two still strips you can scroll sideways, and no pause button.

## V2 · The job binder
- **The binder:** it lies open with drawn rings at the spine.
  - **Left page, the job sheet:** plan-room number, room, the firm's title, "Our own photograph of the finished room.", and "See it large".
  - **Right page:** the photograph in black photo corners.
- **Turning a page is a real two-faced leaf:** it lifts at the spine (`rotateY`, `power2.inOut`, 0.8s, with a moving crease shade). It carries this photograph on its front and the next job sheet on its back. Turning back mirrors it.
- **Ways to turn:**
  - the buttons;
  - the ← → keys on the focused binder;
  - dragging the dog-ear (past a third completes, before that the leaf settles back; measured);
  - the fore-edge index tabs Kitchens / Bathrooms / Whole home, which jump there in one leaf (measured: P-03, Whole home).
- **First view:** the cover opens onto page one. The cover carries a clay label plate, the name and the licence string verbatim.
- **The live line** names the page ("P-02 · Bathroom"), with no "x of y" count. The photo carries its alt text (firm's title + ", an Elbaz project").
- **Phones and reduced motion:** tabs above, the photo then the job sheet, with pages swapped by a short fade (or instantly).

## Self-rating (critical; Muse judges)
| category | V1 /10 | V2 /10 | evidence | why not higher |
|---|---|---|---|---|
| Fidelity to the owner | 8 | 8 | V1 rows kept, arrows removed, V5 frames carried; V8 binder rebuilt with a real leaf | |
| Interaction | 8 | 9 | V1 hover-slow, level, pause, focus glide, viewer. V2 buttons, keys, drag, tabs, viewer | V1 has no drag scrub of the rows |
| Motion and flow | 8 | 8 | V1 one smoothed speed and decelerate-to-rest on exit; V2 leaf with crease shade, cover opening | The handoff into Reviews ("the star tally rises") waits for the Reviews build |
| Accessibility | 8 | 9 | Labelled buttons, a pause control, focus not obscured; V2 a labelled group with keys and a live line | V1's moving content needs the pause (provided); captions are `aria-hidden` because each button label carries the title |
| Visual craft | 8 | 8 | One frame language (wire, mat, level); binder board, rings, photo corners, ruled sheet | |
| Facts | 10 | 10 | Firm's photos and titles only; no project count printed | |

## Defects found and fixed across cycles
1. **Cycle 1, V1:** the second row ran the same way as the first. GSAP stores "reversed" as the sign of `timeScale`, so the per-frame positive `timeScale` silently un-reversed it (the inherited belts carried the same latent bug). The direction is now carried in the sign. Re-measured: row 1 −13px and row 2 +14px per 0.3s.
2. **Cycle 1, V1:** the captions rotated with the crooked frames (blurred, slanted text). The frame and wire now hang in their own group, and the caption stays upright.
3. **Cycle 2, V2:** at mid-turn the lifted leaf rose over the lead text above the binder (perspective 2200px). Flattened to 3400px.
4. **Test harness:** the pause button sits under a scroll reveal, and the phone switcher is a stepper. The tests now scroll it into view and use `EZ.activate`. Zero console errors at 1440, 390 and reduced motion; no horizontal overflow (scrollWidth equals viewport).

## Defects remaining (honest)
- **Seams:** no ink-line underline carrier from Financing yet, and no hand-off to the Reviews tally yet (flow seams pass).
- **Reduced motion, V1:** the frames keep their static tilt. It is a still look, not motion, but Muse may prefer them level there.

## Skills applied
- **Motion:** S0450 (marquee with a pause control, 2.2.2), BANK Q161 (seamless loop), S0362 (the leaf reads as one physical object; shade follows the turn).
- **Interaction and accessibility:** S1018 and S0657 (keys, labelled controls, live line), focus not obscured (WCAG 2.4.11).
- **References:** OH index captions (P-numbers), S1421 (one drawing language).

Render evidence: `qa/finalize/home-projects/`.
