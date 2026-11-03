# GATE · Upgrade Round 2 · Video and Explore (owner's upgrade order) · STOP for Muse

**Result:** Video and Explore each have three versions in `owl/final/owl-roofing.html`. V1 of each is still the
default view (no query string). Judge any version with `?video=N`, `?explore=N` or `?review`.

Superseded versions are kept inside the file as inert hidden backups, never deleted:
- old Video V2 "ring scrubber" → `video-b1`
- old Explore V2 "lens" → `explore-b2`
- the original Explore V1 with its roofer-wrong image → `explore-b1`

Inner pages stay frozen.

| Section · version | Name | One line |
|---|---|---|
| Video V1 (kept) | Watch the Crew at Work | Unchanged apart from preview buttons enlarged to 44 px. |
| **Video V2** | **Contact Sheet** | Scout-style film evidence. Ten real frames are pulled from the clip itself into a sprocketed strip. Drag or use the arrow keys to step through the film, and a loupe magnifies the frame under the cursor. Beside the film, five moments are written out from a frame-by-frame check of the clip. |
| **Video V3** | **Roofline Theatre** | The film's own light spills onto the cream page around the screen, which leans toward the cursor. The timeline is a gable roofline that fills from the left eave to the ridge, and each moment is a vent on the roof. |
| Explore V1 (kept, **corrected**) | Layer by Layer | Same layout and interaction. The exploded stack is redrawn roofer-correct (see §1A below). |
| **Explore V2** | **Build It** | A section from the gutter to the peak. A slider (plus Back/Next keycaps) puts the roof on in the real order across 8 steps. Each step draws its outline first, then fills, and rain falls only to the roof surface. |
| **Explore V3** | **Stack It Right** | The site's one game section (Bruno Simon, scoped). Drag, or press, the seven layers onto the roof in the right order. A wrong layer springs back, and the hint explains what comes first and why. |

## §1A roofer-correctness: what was wrong and what is right now
The original Explore V1 image (`explore-stack.webp`) would fail a roofer:
- the deck was drawn as spaced slats instead of solid sheathing;
- insulation batts sat on a membrane directly under the deck;
- ventilation was a flat metal sheet with box vents shown as a "layer";
- the exploded layers floated over a house that already had a finished roof;
- ice & water shield, drip edge and the ridge vent were missing.

The redraw shows one 6/12 slope taken apart over a house whose gable end has the same pitch. Bottom to top:
1. Insulation on the attic floor, between the ceiling joists.
2. Rafters at 24 in. on centre, with air flowing from the soffit vents up the rafter bays.
3. Solid OSB deck with staggered joints, nail lines over the rafters, and the ridge-vent slot.
4. Ice & water shield on the eave over the metal drip edge.
5. Underlayment, lapped upslope over downslope with cap fasteners.
6. Shingles with offset joints and the ridge cap.

The layer descriptions say the same thing in words; for example, insulation "lies on the attic floor, not under the
roof deck".

Explore V2 shows the same construction in section:
- the rafter bears on the top plate (birdsmouth), with the ceiling joist on the same plate;
- fascia, K-style gutter and soffit;
- the eave drip edge goes on before the ice & water shield, and its lip sits over the gutter;
- ice & water shield runs to 24 in. inside the exterior wall line, dimensioned on the drawing;
- the underlayment laps over the membrane;
- starter strip, then shingle courses at 5⅝ in. exposure;
- ridge vent over the deck slot, with cap;
- the baffle keeps the soffit air channel clear above insulation that stays on the attic floor.

A visible note says the drawing is not to scale (thin layers are thickened).

The game teaches the same order, including the rake exception: "At the rakes the drip edge goes on later, over the
underlayment."

Video moments were checked frame by frame against the clip itself (contact sheet in the scratch evidence):
- rafters with new decking going down;
- a GAF shingle bundle carried up;
- one of the crew with a shingle;
- a finished roof being walked;
- OSB carried in.

## Scorecard (D40 / U30 / C20 / Ct10; pass = weighted ≥ 7.0, no category < 6.0, zero vetoes)
| Version | Design | Usability | Creativity | Content | Weighted | Result |
|---|---|---|---|---|---|---|
| Video V2 Contact Sheet | 8.2 | 8.0 | 8.0 | 8.4 | **8.12** | Pass |
| Video V3 Roofline Theatre | 8.2 | 7.8 | 8.4 | 7.8 | **8.08** | Pass |
| Explore V1 (corrected) | 7.6 | 8.0 | 7.2 | 8.8 | **7.80** | Pass |
| Explore V2 Build It | 7.8 | 8.0 | 8.2 | 9.0 | **8.06** | Pass |
| Explore V3 Stack It Right | 7.8 | 8.2 | 8.8 | 8.6 | **8.20** | Pass |

Why these aren't higher:
- The section drawings are deliberately simple technical illustrations, not renderings.
- Explore V1's OSB texture is a small photographic tile and reads a little blotchy at this size.
- Video V3's light spill is subtle on this mostly earth-toned film.

## Evidence (`owl/final/gates/up-r2/`, 2× device scale, section only, header hidden, no switcher)
- `video-v2-*`, `video-v3-*`, `explore-v1-*`, `explore-v2-*` (after the auto-build), `explore-v3-*`, each at `1440`,
  `768` and `390`.
- `explore-v3-won.jpg`: the finished game.
- `checks.json`: 81 Round 2 checks.
- `home-verify-checks.json`: the homepage, 49 of 49.
- `hero-regression-checks.json`: all six heroes, 85 of 85.

## Interaction tests (`tools/up-r2-test.cjs`): **81/81 pass**
Run on every version:
- only that version is visible;
- the section keeps its page anchor (`#crew-video` / `#explore`);
- one h2 whose name survives the word split;
- every control is at least 44 px;
- axe WCAG 2.1 A/AA: **0 violations**;
- no console or page errors;
- no sideways scroll at 1440, 768 and 390;
- reduced motion loads clean, the film doesn't autoplay, and drawings show complete.

Plus:
- Every homepage section sits inside the home page.
- Superseded versions are present as inert backups.
- Default view is V1 for both sections.

Per version:
- **Video V1:** a chapter chip seeks.
- **Video V2:**
  - the strip holds at least 8 real frames;
  - the keyboard steps the film;
  - a moment jumps and marks itself;
  - the full film opens YouTube `ehKLv5DF2TQ`.
- **Video V3:**
  - a roofline vent jumps the film;
  - the play key pauses;
  - the glow canvas is painted from the film.
- **Explore V1:**
  - Roof deck lifts one layer and names it;
  - arrow keys move through the layers;
  - insulation is described as on the attic floor.
- **Explore V2:**
  - auto-builds once to step 8;
  - the slider to step 4 shows the ice & water shield;
  - Next goes to underlayment.
- **Explore V3:**
  - a wrong layer gets the "Not yet: Roof deck comes first" hint;
  - the keyboard builds all 7 and wins;
  - Play again resets;
  - a separate mouse run dragged the deck tile onto the roof and placed it.

## SKILL LEDGER (§1G)
**Site level:** the Round 1 pack (50 skills, each read in full; `owl/skills/UP-R1-HERO-PACK.md`) plus 14 Round 2 skills
read in full by tag (`owl/skills/UP-R2-PACK.md`): ⟦S1018⟧ ⟦S1107⟧ ⟦S1190⟧ ⟦S1271⟧ ⟦S1272⟧ ⟦S1273⟧ ⟦S1275⟧ ⟦S1046⟧
⟦S0145⟧ ⟦S1443⟧ ⟦S0187⟧ ⟦S0544⟧ ⟦S0385⟧ ⟦S0197⟧. The critique audit before gating used ⟦S1473⟧ ⟦S1479⟧ ⟦S1482⟧
⟦S1496⟧–⟦S1501⟧.

**Per section**
| Section | Design | Motion | Interaction / access |
|---|---|---|---|
| Video V2 | ⟦S1320⟧ people-first evidence; ⟦S1275⟧ poster from the film | ⟦S1326⟧ input is the clock; ⟦S0451⟧ title | ⟦S1018⟧ strip as a keyboard slider; ⟦S1273⟧ moments as the text alternative; ⟦S1046⟧ modal focus |
| Video V3 | ⟦S0385⟧ one small canvas at 15 fps with a poster fallback | ⟦S1330⟧ damped tilt; ⟦S0407⟧ roofline progress | ⟦S1107⟧ vents are buttons; ⟦S1273⟧ |
| Explore V1 | ⟦S0414⟧⟦S0361⟧ truthful exploded drawing | ⟦S0489⟧ lift and dim; airflow loop | ⟦S1107⟧ radio group with arrow keys |
| Explore V2 | ⟦S0414⟧ truthful section; ⟦S0361⟧ | ⟦S0362⟧ outline then fill; ⟦S0544⟧ one direction, eave → ridge; ⟦S1341⟧ rain | ⟦S1326⟧ native range; ⟦S1107⟧ |
| Explore V3 | ⟦S0145⟧ exhibit play; ⟦S0414⟧ | ⟦S0340⟧⟦S0197⟧ drag physics, spring home; ⟦S0544⟧ drop → squash → settle | ⟦S1018⟧ keyboard path + live hints; ⟦S1443⟧ 8 px threshold; ⟦S1190⟧ one-shot finish |

**Per element**
| Element | Skills |
|---|---|
| Contact strip and loupe | ⟦S1326⟧ ⟦S1018⟧ ⟦S1324⟧ |
| Light spill | ⟦S0385⟧ ⟦S1338⟧ |
| Roofline timeline | ⟦S0407⟧ ⟦S1107⟧ |
| Amber play key | ⟦S1388⟧ ⟦S0405⟧ |
| Film pills (V2) | ⟦S0214⟧ ⟦S0442⟧ |
| Plate buttons (V3) | ⟦S1388⟧ ⟦S1349⟧ |
| Exploded stack drawing | ⟦S0414⟧ ⟦S0361⟧ ⟦S0159⟧ |
| Airflow dashes | ⟦S0407⟧ ⟦S1190⟧ |
| Section drawing, draw-on | ⟦S0362⟧ ⟦S0407⟧ |
| Build slider and keycaps | ⟦S1382⟧ ⟦S1107⟧ |
| Shingle-tab CTA | ⟦S1388⟧ ⟦S0405⟧ |
| Game tiles | ⟦S1382⟧ ⟦S0340⟧ ⟦S1018⟧ |
| Drop zone | ⟦S0407⟧ |
| Landing squash | ⟦S0489⟧ ⟦S0544⟧ |
| Finish burst | ⟦S0658⟧ ⟦S1190⟧ |
| Drawn-plate buttons | ⟦S0407⟧ ⟦S1324⟧ |
| Titles | ⟦S0451⟧ ⟦S1329⟧ |

## Defects
**Fixed in this round:**
1. **A stray closing tag in the redrawn Explore V1 pushed every section after Explore outside the home page.** This was
   in the pushed commit `a189964`, caught by the homepage re-check (42 instead of 49 checks), and fixed in `44ac555`.
   `build.py` now refuses to build any section whose `div`/`section` tags don't balance, and the Round 2 gate checks
   that every homepage section sits inside the home page.
2. **Explore V2 (first draft):**
   - the rafter sat below the wall's top plate;
   - insulation rose above the rafter near the eave;
   - labels overlapped.

   All three are corrected: birdsmouth bearing, insulation edge under the baffle, labels re-laid.
3. **Explore V1 redraw:**
   - the pitch read as flat, so a gable end was added;
   - the ice & water band appeared mid-deck, so it now sits on the eave.
4. **The game's drop target could scroll out of view while dragging from the tray.** The roof is now sticky beside the
   tray.
5. **Video V1 pre-existing:**
   - its preview buttons were 34 px, now 44 px;
   - Explore V1's phone link was 28 px tall, now 44 px.
6. **Contrast:**
   - Video V2 timecodes now use the darker amber (`#8E5A12`).
   - Explore V2's step numeral was also below contrast and now uses the darker amber.
7. **On phones:**
   - Video V2's frames now load before the strip is reached;
   - Explore V2's tiny drawing labels are hidden (the step text names each part).
8. **Hero regression run:** the V4 film modal's Escape check flaked under load. It passes reliably in isolation (3/3);
   the check now waits 600 ms, and the run is 85/85.

**Open, honestly named:**
1. **Video captions.** The on-page clip has no audio track, so captions don't apply and the written moments are its
   text alternative. The full YouTube film's captions are YouTube's own and weren't checked offline.
2. **VideoObject schema** (⟦S1271⟧) isn't added: it needs a true upload date, which the brief doesn't lock. This is an
   owner input.
3. **The section drawings are illustrations, not survey drawings.** Rafter spacing (24 in.) and the 6/12 pitch are
   typical values, not a specific Owl job, and the drawings say so through the not-to-scale note.
4. **Video V2's playhead on phones.** The 10 frames wrap into two rows, so the line maps across the full width.
   The highlighted frame is still exact.
5. **Owl's own photo and film resolution** (560–960 px) still limits sharpness. The higher-resolution originals
   request from Round 1 stands.

## STOP
Round 2 ends here. Round 3 (Wise Check and Protect Your Nest) doesn't start until Muse passes Round 2.
