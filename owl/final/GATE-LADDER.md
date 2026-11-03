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

---

## L2 · Hero 9 + 10 · checks 33/33 · hero regression 85/85 · evidence `gates/ladder/L02-hero-9-10/` · **Hero now at 10**
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Hero 9 · Sealed Tight** | Immersive Garden (hover splash surface) | A framed roof of laminated shingle courses on canvas, laid from the eave up with joints staggered course to course, a darker laminate band, keyway shadows, granule speckle and a metal drip edge at the eave. Where the cursor (or a tap, or an idle gust) passes, tabs lift in a ring like wind catching them, throw a shadow, then settle, and an amber glint runs along the seal line of tabs that lifted hard. | 8.2 | 7.8 | 8.6 | 8.2 | **8.18** |
| **Hero 10 · Frame by Frame** | Scout Motors (film-roll evidence) | A tilted, sprocketed film strip of ten of Owl's own photos (the crew, decking, the Browns, the wrap, Noah at the eave, the Berglands, shingles up, the aftercare box, walking the roof, community) runs under a large headline, with frame numbers and captions saying only what each frame shows. It pauses on hover or focus, can be dragged, and arrow keys step it a frame; under reduced motion it is a still, scrollable strip. | 8.4 | 8.2 | 8.2 | 8.6 | **8.32** |

**Roofer audit:**
- Hero 9 draws courses with exposure about 2.13 × tab width (the 12 in : 5⅝ in proportion), joints staggered course to course, and the drip edge at the eave.
- It labels itself only "laminated shingles · joints staggered" and claims no product line.

**Truth:**
- Hero 10 uses only Owl's own photos.
- Its lede says "Every frame below is Owl's own".
- No frame is captioned as a specific job.

**Checks run:** the generic gate, plus:
- Hero 9: the roof is painted; the surface reacts where the pointer moves; the hint clears once the roof is touched.
- Hero 10: ten captioned real frames plus an aria-hidden loop set; the film runs by itself, pauses on focus (WCAG 2.2.2), and arrow keys step it.

**Ledger:**
- **Hero 9:**
  - canvas surface: ⟦S1363⟧ (one rAF, pointer on the section, paused when unseen, DPR ≤ 2);
  - ripple: ⟦S1338⟧ contract, off under reduced motion;
  - courses: ⟦S0414⟧;
  - title: ⟦S0451⟧ ⟦S1329⟧;
  - buttons: ⟦S1388⟧ ⟦S0405⟧;
  - trust row: ⟦S1352⟧.
- **Hero 10:**
  - loop: ⟦S0450⟧ (duplicated set, −50 %, pause on hover and focus);
  - captions: ⟦S1039⟧;
  - keyboard: ⟦S1107⟧;
  - frame numbers: ⟦S1352⟧;
  - title: ⟦S0451⟧;
  - buttons: ⟦S1388⟧.

**Defects fixed:**
- Hero 9's reseal glint fired on almost every tab; it now needs a strong lift and decays faster.
- Hero 10's frame numbers sat beside the next frame's caption; they now lead their own caption.
- `build.py` sorted versions as text (v10 before v2); it now sorts by number.

---

## L3 · Video 4 + 5 · checks 37/37 · evidence `gates/ladder/L03-video-4-5/` · Video now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Video 4 · Look Closer** | Immersive Garden (surface reacting where the cursor moves) | Owl's crew clip plays full width, painted grey and slightly soft on a canvas. A lens with an amber ring follows the cursor (eased) and shows the true colour beneath. It wanders by itself when untouched, a tap places it, and arrow keys move it. A tag under the lens and a caption under the film name the moment on screen. A 3D play key, and "Watch the Full Film" opens YouTube. | 8.4 | 8.0 | 8.4 | 8.2 | **8.26** |
| **Video 5 · Assemble the Shot** | Graza (custom-animation bar) | The clip is cut into a 4×3 grid of tiles, each drawing its own crop of the live frame. When first seen, the tiles fly in from a scattered 3D spread and settle on staggered springs, eave-corner first. Hovering a tile lifts it; "Scatter It Again" replays it. The five frame-checked moments are a list that seeks the film and marks the current one. | 8.2 | 8.0 | 8.6 | 8.0 | **8.20** |

**Truth:**
- Both play Owl's own clip.
- The moments are the five checked frame by frame in Round 2 (rafters and decking, GAF bundle carried up, crew member with a shingle, finished roof walked, OSB carried in).
- The full film is YouTube ehKLv5DF2TQ.

**Checks run:** the generic gate, plus:
- Video 4: the grey film is painted; it is the crew clip; arrow keys move the lens; the caption is a frame-checked moment; the play key pauses and relabels; the full film opens.
- Video 5: twelve tiles assembled; tiles 1, 6 and 12 draw film; a moment chip seeks to 9–13 s and marks itself; Scatter breaks the grid and it reassembles.

**Ledger:**
- **Video 4:**
  - canvas surface: ⟦S1363⟧;
  - reveal contract: ⟦S1338⟧ (real media beneath, static under reduced motion);
  - keyboard lens: ⟦S1107⟧;
  - play key: ⟦S1388⟧;
  - modal: ⟦S1046⟧;
  - title: ⟦S0451⟧.
- **Video 5:**
  - 3D tiles: ⟦S0205⟧;
  - spring settle: ⟦S0340⟧;
  - staggered choreography: ⟦S0187⟧;
  - moments list: ⟦S1107⟧ ⟦S0462⟧;
  - keys: ⟦S1388⟧;
  - title: ⟦S0451⟧.

**Defects fixed (Video 5):**
- The moment list inherited the site's chip-button style.
- The grid rows were uneven: the canvases are now absolutely placed.
- On phones the tiles came before the heading; the heading now comes first.
