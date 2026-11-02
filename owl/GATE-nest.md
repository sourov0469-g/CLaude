# GATE · Protect Your Nest (proof section 2 of 3): two versions, built one at a time

**Where it lives:** `owl/site/owl-roofing.html`, home §3. Sources are in `owl/site/src/sections/nest/`.
- Switch versions with `?v=nest:1|2` or Shift+V.
- **Default: V1.**

## References studied first
**Apple AirPods Pro** (frames plus code digest: 12 sticky stages, scrubbed films):
- **Transfers:** a pinned stage, one proof per beat, and the numeral as the headline.
- **Rule taken from its failure:** 12 stages are too many for a contractor site, so there are 4 beats.

**Graza** (scoped to the custom-animation bar):
- **Transfers:** each animation is made only from this brand's content and moves with the scroll.

**Longbow** (for V2):
- **Transfers:** doctrine rows, each with its proof.

**Never transferred:** Apple layouts, type and blue; Graza's characters and colour.

## Skills applied
- ⟦S0489⟧:
  - Debris falls with an ease-in (falling things only).
  - The lid travels on the travel curve.
  - Under reduced motion, everything rests on its final drawing.
- ⟦S0407⟧: draw-on through `pathLength`.
- ⟦S0633⟧: the beat map from `GATE-PHASE-3a` is followed. Each beat's lead action is the proof.
- ⟦S1452⟧: the CTA arrives on the final beat.
- ⟦S1454⟧: Call is the last action in the section.
- ⟦S1209⟧ scrolljacking limits: 4 beats, a skip link, and no pin under reduced motion.

## V1 · Pinned beats
A 400vh stage pinned below the header, with four beats.
1. **The wrap:** drapes from the eaves. Debris falls from the roof and lands on the wrap, never on the shrubs (the shrubs
   are drawn).
2. **The magnet pass:** the Phase 2 motif on a shorter lawn, so the sweeper reads at twice the size.
3. **The aftercare box:** three leftover shingles slide into the box, then the lid closes on its hinge.
4. **The seal:** the line closes an amber ring around Owl's own Get It Right Guarantee seal.

**Supporting pieces:**
- **Photos:** Owl's own photos of the wrap and the box sit under the words of beats 1 and 3.
- **Numerals:** giant numerals appear only for locked facts: **3** rounds of cleanup and the **10**-year guarantee.
- **Navigation:** dots and the "n of 4" counter follow the beat.
- **Accessibility:** the inactive beats are aria-hidden.

## V2 · The route (no pin)
The same four drawings in four stations down the page.
- **The rail:** the page's sweep line runs down the left margin. It starts at the first station and never crosses the
  heading.
- **Station pins:** each pin is an Owl icon (wrap, magnet, aftercare, guarantee) that turns amber when reached.
- **Drawings:** each one scrubs as its station passes the viewport.

It scrolls with the page and never takes control of scrolling: the alternative for visitors who dislike pinning.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 pinned beats | V2 route | Evidence |
|---|---|---|---|
| Design | **8.0** | 7.5 | V1: one proof per screen; a numeral is used only for real facts; the drawings fill the stage. V2: clear rows, but four stacked rows are less of an event. |
| Usability | 7.0 | **8.0** | V1: 400vh of pinned scroll (mitigated by the skip link, the dots and counter, and a static stack under reduced motion). V2: native scroll, a shorter section, everything visible at once. |
| Creativity | **8.0** | 7.5 | (see below) |
| Content | 8.5 | 8.5 | Every claim is Owl's own words, quoted. Numerals only for locked facts. Owl's photos are captioned truthfully. |
| **Weighted** | **7.85** | **7.75** | |

**Creativity:** both use drawings that exist only for Owl's system.
- **V1:** turns the system into four timed events.
- **V2:** makes the line visible as the route between them.

**Vetoes:** none. No JS errors, no overflow at 390, 768 or 1440 (both versions), no dead CTA, no facts outside the lock.

**Default: V1.** It is the identity's signature moment (the storyboarded peak run-up) and scores higher on Design and
Creativity. V2 stays switchable. Recommendation for the final build: serve V2 automatically to `prefers-reduced-motion`
visitors (V2 under reduced motion shows every final drawing; V1 shows text only).

## Tests: 16/16 pass (`nesttest.mjs`); hero regression 27/27 still pass
- **V1:**
  - It scrubs forward and back through 4 beats (beats 0,1,2,3,2,0). The dots and counter match.
  - Hidden beats are aria-hidden.
  - The skip link targets the next section.
- **V2:**
  - Stations are reached in order (monotonic, all 4).
  - The rail starts below the heading.
- **Both versions at 390, 768 and 1440:** no overflow, no errors.
- **Reduced motion:**
  - V1 becomes a static stack.
  - V2 shows its drawings at their final frame.
- **Token lint:** clean.

**A note on the test history:** one assertion was wrong in my own first run. It expected the station count to start at 0,
but the first station is already in view at the first sample. The data was strictly ordered (1→4). I corrected the
assertion, not the page, and re-ran.

## Defects found and fixed
1. **V1 photos:** Owl's photos overlapped and hid half of the house and box drawings. They moved into the text column.
2. **V1 beat 2:** the magnet pass was a thin strip in a 3:2 stage. It is now on a 600-unit lawn, so the sweeper reads at
   twice the size.
3. **V1 beat 4:** the heading "-year Get It Right Guarantee." broke awkwardly under the numeral. Now: "10 / years: our
   Get It Right Guarantee on the work."
4. **V2 rail:** it ran through the section heading and dek. It now starts at the first station's pin.
5. **V2 background:** in a 2,449px-tall section, B1 Lawn light scaled up to giant lines. It is now confined to the
   bottom viewport-height, the scale it was drawn for.

## Remaining (honest)
- **V1 under reduced motion** shows the text and photos but not the drawings. The recommendation above (V2 for those
  visitors) fixes it at site level in the build.
- **The wrap drawing** is clear but simple. A second pass could make the drape billow, within ⟦S0489⟧ amplitudes.
- **iOS Safari** pin behaviour is untested (Chromium emulation only).
