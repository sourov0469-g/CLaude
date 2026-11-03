# GATE · Overnight version ladder (owner's order, 2026-11-03 night)

Each round adds two versions to one homepage slot, in the order the overnight brief sets, until every slot has exactly
10 live versions.
- Defaults are unchanged: V1 of every section is still what a visitor sees with no query string (tested every round).
- Plan lines (reference and skills) are written before each round in `owl/skills/LADDER-PLAN.md`.
- Each round runs the generic gate `tools/ladder-test.cjs`, plus that slot's own checks in `tools/ladder-extra/<slot>.cjs`:
  - only that version is visible;
  - it keeps the page anchor;
  - one heading;
  - controls at least 44 px on desktop and on a phone;
  - the facts-lock text check;
  - axe WCAG 2.1 A/AA;
  - no errors;
  - no sideways scroll at 1440, 768 and 390;
  - reduced motion with no looping animation.
- Evidence for each round: `gates/ladder/<round>/`, 2× device scale.
- Scorecard: D40 / U30 / C20 / Ct10; pass = weighted ≥ 7.0, no category < 6.0, zero vetoes.

| Slot | Live before ladder | Target |
|---|---|---|
| Hero | 6 | 10 |
| Video, Explore, Wise Check, Protect, Services, Reviews, Area, Family, Booking | 3 each | 10 each |

---

## L1 · Hero 7 + 8 · checks 34/34 · evidence `gates/ladder/L01-hero-7-8/`
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Hero 7 · Eave to Ridge** | Lusion (one line carries the visitor) | One amber stroke draws a whole hip-roofed house across the hero: eave, hips, ridge with a chimney, walls, ground. Shingle courses lie inside the roof face, and a light pulse runs the line at rest. A small line-drawn owl perches on the ridge, blinks, and turns its head and eyes toward the cursor (the subtle animated owl from the hero notes). Centred headline "From Eave to Ridge, We Give a Hoot". | 8.2 | 8.0 | 8.4 | 8.4 | **8.22** |
| **Hero 8 · At the Right Pitch** | MERSI (split cover) | The cover is split along a true 6/12 roof pitch, computed live so the slope always clears the type. Above it plays Owl's own crew film; the split edge is drawn as a roof in section (deck, shingle courses lapping down the slope, drip edge), with a "6 / 12" pitch mark. The film and type planes shift against each other with the cursor. "Watch the Full Film" opens YouTube ehKLv5DF2TQ. | 8.4 | 8.0 | 8.6 | 8.4 | **8.36** |

**Roofer audit:**
- Hero 7: courses run parallel to the eave between the hips, the chimney sits on the ridge, and the windows and door sit in the wall.
- Hero 8: the pitch is tested at rise/run = 0.5. The courses lap downslope, the deck lies under the shingles, and the drip edge sits at the eave end.

**Checks run:** the generic gate, plus:
- Hero 7: the line draws itself on; the courses sit inside the roof face; the owl turns toward the pointer (at most 14°).
- Hero 8: the split measures rise/run 0.5; the pitch mark reads 6/12; the courses are drawn; the film is Owl's crew clip; the full film opens and Escape closes it.

**Ledger:**
- **Hero 7:**
  - one-stroke line and pulse: ⟦S0407⟧;
  - headline mask and stagger: ⟦S0451⟧ ⟦S1329⟧;
  - owl head-turn: ⟦S1330⟧ (damped, capped);
  - blink: ⟦S0407⟧ (lid scale);
  - roofer-true line art: ⟦S0414⟧;
  - Get My Roof Checked / Call buttons: ⟦S1388⟧ ⟦S0405⟧ (3D-feel plates with magnet);
  - trust dots: ⟦S1352⟧.
- **Hero 8:**
  - split cover: ⟦S1375⟧;
  - planes: ⟦S1330⟧;
  - roof-section edge: ⟦S0407⟧ ⟦S0414⟧;
  - title: ⟦S0451⟧ ⟦S1329⟧;
  - play pill: ⟦S1388⟧;
  - film modal focus: ⟦S1046⟧;
  - trust row: ⟦S1352⟧.

**Defects fixed:**
- Hero 7's house first sat below the fold (the drawing was cropped and the type scaled).
- Hero 8's film corner was too small: the slope now takes as much film as the type allows.
- The video poster letterboxed, so the poster now also covers the film plane.
- The pitch mark collided with the headline on phones, so it is hidden there.
- The first evidence run wrote into `gates/up-r1` by mistake; the files were moved out and that folder is unchanged.
