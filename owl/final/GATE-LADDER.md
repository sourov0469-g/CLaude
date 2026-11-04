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

---

## L4 · Explore 4 + 5 · checks 35/35 · evidence `gates/ladder/L04-explore-4-5/` · Explore now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Explore 4 · Peel It Back** | Apple AirPods Pro (pinned scroll, each step an event) | A plan view straight down on a roof corner at the eave, pinned while you scroll. Each step peels the top layer up from the eave and names it with an outlined number: shingles over a starter → underlayment lapped upslope with cap nails → ice & water along the eave → drip edge → OSB deck with staggered joints and gaps → rafters. A 00–06 rail jumps to any layer. | 8.2 | 8.0 | 8.2 | 9.0 | **8.24** |
| **Explore 5 · The Layer Deck** | Longbow Motors (doctrine plus hard numbers) | The same six layers as thick 3D cards, each with its own drawn material face (granules, printed synthetic with cap nails, rubberised membrane, drip-edge section at the eave over deck and fascia, OSB strands, rafter grain). Hovering fans the deck; choosing a card brings it forward with what it is, where it goes and one certain number, captioned "Typical values for a correct roof, not a quote for yours". | 8.2 | 8.0 | 8.0 | 9.0 | **8.20** |

**Roofer audit:**
- Order (tested): shingles, then underlayment (which laps over the ice & water shield), then ice & water, drip edge, deck, rafters. At the eave the drip edge sits under the ice & water; at the rakes it goes over the underlayment.
- Numbers used:
  - 5⅝ in exposure, named on GAF Timberline HDZ;
  - ice barrier to at least 24 in inside the exterior wall line, IRC R905.1.2 as adopted in Minnesota;
  - about ⅛ in panel gap;
  - rafters commonly 16 or 24 in on centre.
- No game mechanic: Explore V3 stays the site's only game.

**Checks run:** the generic gate, plus:
- Explore 4: the pin top shows the finished roof; at half way, shingles and underlayment are off and the ice & water is the peeling layer; at the end only the rafters remain; the true order is in the rail; a rail button jumps.
- Explore 5: six cards in true order; ice & water states 24 in with R905.1.2; arrow keys rove; the numbers are framed as typical.

**Ledger:**
- **Explore 4:**
  - sticky artifact with measured steps: ⟦S0448⟧;
  - rail: ⟦S1325⟧ ⟦S0462⟧;
  - plan drawing: ⟦S0414⟧;
  - step numbers: ⟦S1352⟧;
  - title: ⟦S0451⟧.
- **Explore 5:**
  - 3D cards: ⟦S0205⟧;
  - fan and pull: ⟦S1330⟧;
  - tabs: ⟦S1246⟧;
  - numbers: ⟦S1352⟧;
  - material faces: ⟦S0414⟧;
  - plain doctrine copy: ⟦S0076⟧.

**Defects fixed:**
- Explore 4 first named the layer that had already been lifted away (off by one). The named layer is now the one on top, partly peeled.
- Explore 5's drip-edge face was drawn wrong. It is now a true eave section: flange on the deck, face down past the fascia, kick-out at the bottom.
- The OSB tile was scaled down.

**Open:** the OSB texture tile still reads a little blotchy at plan scale (the same tile as Round 2).

---

## L5 · Wise Check 4 + 5 · checks 34/34 · evidence `gates/ladder/L05-wise-4-5/` · Wise Check now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Wise 4 · Ask the Owl** | Cowboy (warm, people-fronted, one named system) | A conversation with the owl. Five question chips (what it covers, the attic, hidden leaks, seeing what we saw, when to book) type the question into the thread; the owl "thinks" for a beat, then answers only in Owl's published Wise Check words (`OWL.WISE`), and asked chips are marked. The thread is a focusable live region, and it ends with the booking action. | 8.0 | 8.2 | 7.8 | 9.0 | **8.18** |
| **Wise 5 · The Kit** | Lando Norris (bespoke craft objects) | A knolled flat-lay on a cutting mat with an amber ruler edge: ladder (roof evaluation), flashlight (attic inspection, beam on when chosen), heat-sensor camera (leak detection, false-colour screen), phone camera (photo and video documentation). Pointing at a tool, or choosing it in the tab list, lifts it off the mat with a real shadow and says which part of the Wise Check it serves; tool outlines draw on when first seen. | 8.2 | 8.0 | 8.0 | 8.8 | **8.14** |

**Truth:**
- Every answer and every part description comes verbatim from Owl's published Wise Check list and cases (tested against `OWL.WISE`).
- No new service claims.

**Checks run:** the generic gate, plus:
- Wise 4: five chips; the attic answer uses Owl's words; asked chips are marked; the log is live; "When should I book" lists the four published cases.
- Wise 5: four tools map one-to-one to the four parts; picking the heat-sensor lifts it and explains it; arrow keys rove; pointing at a tool on the mat selects it.

**Ledger:**
- **Wise 4:**
  - plain, sourced answers: ⟦S0251⟧ ⟦S0076⟧;
  - chips: ⟦S0462⟧ ⟦S1388⟧;
  - live thread: ⟦S1442⟧ (feedback);
  - typing dots: ⟦S0407⟧;
  - title: ⟦S0451⟧.
- **Wise 5:**
  - lift: ⟦S0205⟧;
  - shadow and tilt: ⟦S1330⟧;
  - tab list: ⟦S1246⟧;
  - outline draw-on: ⟦S0407⟧;
  - numbered parts: ⟦S1352⟧.

**Defects fixed:**
- Wise 4's scrolling thread was not keyboard-focusable (axe); it now takes focus.
- Wise 5's ladder could only be selected on its rails; every tool now has a full hit area.

---

## L6 · Protect Your Nest 4 + 5 · checks 32/32 · evidence `gates/ladder/L06-protect-4-5/` · Protect now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Protect 4 · Hang the Wrap** | Immersive Garden (surface reacting where the cursor moves) | A canvas cloth simulation: the black mesh wrap is pinned along the eave of a drawn hip-roofed house and hangs over the walls and shrubs to the ground, with a tarp in front. The pointer (or an idle gust) blows it like wind and it settles back, with the windows and door faintly visible through it. Beside it, the three parts in Owl's words. | 8.2 | 7.8 | 8.6 | 8.8 | **8.26** |
| **Protect 5 · Weave the Nest** | Graza (custom-animation bar) | The name taken literally: a nest woven strand by strand in SVG. The outer weave is the wrap, the middle weave the three cleanup passes, the amber lining the aftercare box. A line-drawn owl settles into it when the weave is done (front strands are drawn over it) and blinks. Choosing a band lifts it and tells that part in Owl's words. | 8.0 | 8.0 | 8.6 | 8.6 | **8.18** |

**Truth:**
- Both say only what the system is: the wrap, three cleanup passes (crew, magnet sweep, project manager) and the aftercare box.
- No storm story (tested).
- Protect 4 matches Owl's wrap photo: mesh from the eaves down, and a tarp on the ground.

**Checks run:** the generic gate, plus:
- Protect 4: the truthful copy; the mesh changes where the pointer blows across it.
- Protect 5: the truthful copy; the nest weaves and the owl settles; choosing the middle weave lifts both of its layers and tells the passes; arrow keys rove to the lining.

**Ledger:**
- **Protect 4:**
  - cloth surface: ⟦S1363⟧ (one rAF, pointer on the section, paused unseen, static under reduced motion);
  - wrap as photographed: ⟦S0414⟧;
  - numbered parts: ⟦S1352⟧;
  - CTA: ⟦S1388⟧;
  - title: ⟦S0451⟧.
- **Protect 5:**
  - strand draw-on: ⟦S0407⟧;
  - staggered weave: ⟦S0187⟧;
  - band tabs: ⟦S1246⟧;
  - band lift: ⟦S1330⟧;
  - owl blink: ⟦S0407⟧;
  - title: ⟦S0451⟧.

**Defects fixed (Protect 5):**
- The owl stood on top of the nest, and then was hidden behind it.
- It now sits in the bowl, with a front weave drawn over it.

---

## L7 · Services 4 + 5 · checks 33/33 · evidence `gates/ladder/L07-services-4-5/` · Services now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Services 4 · Point at Your Roof** | Quiet Cubes (configurator first) | A drawn house in elevation where each service lives where it applies: the whole hip-roof face (replacement), a lifted tab and the chimney flashing (repair), hail marks under a drifting storm cloud (storm damage help), a magnifier over the roof (Wise Check), the walls (siding). Numbered pins mark them. Pointing, tapping or the key list highlights that part in amber and opens the service card from `OWL.SVC`. | 8.2 | 8.4 | 8.2 | 8.6 | **8.30** |
| **Services 5 · Up Close** | Apple AirPods Pro (pinned scroll events) | Pinned while you scroll, each service's own photo grows from a small card to fill the frame while its name lands in large type. The type is ink on cream until the photo fills the frame, then cream on the photo. The text panel and a 01–05 rail follow the step. | 8.2 | 7.8 | 8.0 | 8.4 | **8.08** |

**Truth and roofer audit:**
- Copy comes only from `OWL.SVC`.
- Photo alt text describes each photo; no photo claims a specific job.
- Services 4's house: courses on the hip roof face, flashing at the chimney base, siding laps on the walls, and the storm marks sit on the roof under the cloud.

**Checks run:** the generic gate, plus:
- Services 4: five services, each with a zone; pointing at the walls opens Siding; the key list roves from the focused key and moves the highlight.
- Services 5: at the pin start the name is ink; the photo fills the frame and the name turns cream; service 4 comes later; real photos with alt text.

**Ledger:**
- **Services 4:**
  - configurator tabs: ⟦S1246⟧;
  - house: ⟦S0414⟧;
  - highlight: ⟦S0407⟧;
  - zones and pins: ⟦S0462⟧ ⟦S1352⟧;
  - Call / Book: ⟦S1388⟧;
  - title: ⟦S0451⟧.
- **Services 5:**
  - pinned steps: ⟦S0448⟧;
  - rail: ⟦S1325⟧;
  - cover grow: ⟦S1375⟧;
  - big name: ⟦S0451⟧ ⟦S1352⟧;
  - CTA: ⟦S1388⟧.

**Defects fixed:**
- Services 4's arrow keys moved from the last hovered service instead of the focused key.
- Services 5's big title was white over cream while the photo was small, which failed contrast.
- A pin overlapped the magnifier.

---

## L8 · Reviews 4 + 5 · checks 33/33 · evidence `gates/ladder/L08-reviews-4-5/` · Reviews now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Reviews 4 · Five Stars, Drawn** | Graza (custom-animation bar) | Five large stars draw themselves with a pen stroke one after another, then fill amber with a spring. Each holds one locked proof (5.0 · 90+ · BBB A− · GAF Systems Plus · 10-yr workmanship), and hovering, focusing or arrow keys lift a star and read its line. The rating is stated once: "5.0 from 90+ reviews". | 8.0 | 8.2 | 7.8 | 8.6 | **8.08** |
| **Reviews 5 · Built to 5.0** | Lando Norris (bespoke, made for one business) | The rating as an object: a large extruded "5.0" whose glyphs are laid with shingle courses (staggered joints, laminate band) inside an amber outline, tilting and catching light with the cursor. "90+ reviews" sits on a ridge-cap line under it, beside the locked proof chips. | 8.4 | 7.8 | 8.4 | 8.4 | **8.26** |

**Truth:**
- No quotes, no names and no per-review stars.
- The five stars in Reviews 4 are five proofs, not five reviews.
- The rating wording is exactly "5.0 from 90+ reviews" (tested).
- BBB A− never appears as "Accredited" (tested).

**Checks run:** the generic gate, plus:
- Reviews 4: the rating wording; the stars draw and fill; the five proofs are in order; arrow keys read each line.
- Reviews 5: the rating wording and chips; the 5.0 is filled with shingle courses; the object tilts toward the pointer.

**Ledger:**
- **Reviews 4:**
  - stroke draw: ⟦S0407⟧;
  - spring fill: ⟦S0340⟧;
  - stagger: ⟦S0187⟧;
  - stars as tabs: ⟦S1246⟧;
  - proof numerals: ⟦S1352⟧;
  - title: ⟦S0451⟧;
  - CTA: ⟦S1388⟧.
- **Reviews 5:**
  - small 3D object: ⟦S0205⟧;
  - tilt and light: ⟦S1330⟧;
  - shingle courses: ⟦S0414⟧;
  - chips: ⟦S1352⟧;
  - title: ⟦S0451⟧.

---

## L9 · Service Area 4 + 5 · checks 35/35 · evidence `gates/ladder/L09-area-4-5/` · Area now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Area 4 · Roof Row** | Lusion (one line) | One continuous amber roofline of 29 houses (gable and hip, one per real town), beginning at home in Shoreview, where the owl perches. A native horizontal scroll you can drag, arrow through or step with 3D keys. The house at the centre lights its windows and names its town; typing a town glides the row to it. | 8.2 | 8.2 | 8.2 | 8.6 | **8.26** |
| **Area 5 · Turn to Your Town** | Quiet Cubes (instrument first), small 3D | The 29 towns on a 3D drum in a dark window with an amber slot. Turn it with a drag (with inertia and snap), arrow, Page and Home/End keys, or the 3D buttons. A readout says "Yes, we roof in Eagan."; typing turns the drum to a town. Underneath it is a real listbox with an active descendant. | 8.4 | 8.2 | 8.0 | 8.6 | **8.28** |

**Truth:**
- The real 29 towns, in the same order used across the site.
- Both are abstract, with no geography and no positions pretending to be a map.
- Unlisted towns are told so and given the phone (tested in Area 4).

**Checks run:** the generic gate, plus:
- Area 4: 29 houses in true order; it starts at Shoreview; "stillw" glides to Stillwater and lights it; arrow keys reach Woodbury; Duluth gets the honest answer.
- Area 5: a listbox of the 29; arrow keys turn it (active descendant); "eagan" turns it to 27/29; the 3D button steps to Burnsville.

**Ledger:**
- **Area 4:**
  - roofline: ⟦S0407⟧;
  - track: ⟦S0450⟧ (continuous, ends at both towns);
  - keyboard: ⟦S1107⟧;
  - 3D keys: ⟦S1388⟧;
  - title: ⟦S0451⟧.
- **Area 5:**
  - 3D drum: ⟦S0205⟧;
  - inertia and snap: ⟦S0340⟧;
  - listbox keyboard: ⟦S1107⟧;
  - 3D buttons: ⟦S1388⟧;
  - title: ⟦S0451⟧.

**Defects fixed:**
- Area 4's row was squeezed by a global `max-width:100%` on SVGs, and the row started on the wrong town.
- Area 5's list sat between the listbox and its options (axe); the `ul` is now `role="none"`.

---

## L10 · We Give a Hoot 4 + 5 · checks 33/33 · evidence `gates/ladder/L10-family-4-5/` · Family now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Family 4 · Say It Big** | Cowboy (people-fronted warmth, one named system) | The tagline set very large, "We Give a Hoot", with each word a button. Hovering, focusing or pressing a word opens a feathered radial reveal of its photo, eased toward the cursor over a faded base (We → the Browns, press again for the Berglands; Give → community; a Hoot → the crew on a roof). The captions say only what is shown. | 8.4 | 8.0 | 8.4 | 8.6 | **8.32** |
| **Family 5 · Two Families, One Owl** | Graza (custom-animation bar) | A large drawn owl face (draws on when first seen) whose two eyes are the two founding-family portraits inside amber rims. The portraits drift inside the rims with the cursor like pupils, the lids blink now and then, and choosing an eye or a family button lights it and says who they are. | 8.4 | 8.0 | 8.6 | 8.4 | **8.36** |

**Truth:**
- Owl's own photos only.
- Alt text and captions say only what is shown ("Community involvement" kept as Owl's own caption).
- The locked founding facts appear verbatim: 2025, Shoreview, Tim Brown and Noah Bergland.

**Checks run:** the generic gate, plus:
- Family 4: the word buttons spell the tagline; hovering "a Hoot" reveals the crew with a truthful caption; "We" also holds the Berglands; the founders are named.
- Family 5: two eyes, two family photos; choosing the Berglands lights that eye; the founding facts are present.

**Ledger:**
- **Family 4:**
  - spotlight reveal: ⟦S1324⟧ (CSS radial mask, pointer easing .1, radius easing .14, collapse to centre on exit);
  - captions: ⟦S1039⟧;
  - word buttons: ⟦S1107⟧ ⟦S0462⟧;
  - visually hidden h2 kept for structure.
- **Family 5:**
  - owl draw-on: ⟦S0407⟧;
  - portrait parallax: ⟦S1330⟧;
  - blink: ⟦S0407⟧;
  - family toggles: ⟦S1388⟧;
  - title: ⟦S0451⟧.

**Defect fixed:** Family 4's inactive words were too faint for 3:1 large-text contrast; they are now #8A8178.

---

## L11 · Booking 4 + 5 · checks 36/36 · evidence `gates/ladder/L11-booking-4-5/` · Booking now at 5
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Booking 4 · Pick a Day** | Quiet Cubes (instrument first) | A calendar of the next twelve working days, built from today's date, as 3D day keys (Sundays shown closed, never bookable), with a morning or afternoon window. Choosing a day slides up a three-field form that states it as a preference ("We'll call to confirm"). "Open My Email" hands off a request marked "please confirm". | 8.2 | 8.6 | 7.8 | 8.6 | **8.26** |
| **Booking 5 · Open Now?** | Lando Norris (bespoke instrument) | A large drawn clock with Owl's hours (08:00–18:00) as an amber arc, its hands at the current time in Shoreview (America/Chicago). A live status reads "Open now, until 18:00" or "Closed now. Opens … at 08:00", computed from the locked hours and refreshed every 30 s. A 3D call key for (651) 977-6027, plus the email and office. | 8.4 | 8.4 | 8.2 | 8.8 | **8.40** |

**Truth:**
- Neither form claims a request was saved, sent or received (tested).
- No availability is implied: a day is a preference to confirm.
- The hours, phone, email and address are the locked ones (tested).

**Checks run:** the generic gate, plus:
- Booking 4: twelve days with no bookable Sunday; the locked hours; choosing a day opens the form as a preference; arrow keys rove; an empty submit errors under Name; submit hands off honestly.
- Booking 5: the arc and hands are set; the status matches the locked-hours rule (either state); the locked contacts; the call key dials the locked number.

**Ledger:**
- **Booking 4:**
  - form rules: ⟦S1442⟧;
  - day grid keyboard: ⟦S1107⟧;
  - 3D day keys: ⟦S1388⟧;
  - sheet rise: ⟦S0409⟧-style transition;
  - title: ⟦S0451⟧.
- **Booking 5:**
  - clock draw: ⟦S0407⟧;
  - hour numerals: ⟦S1352⟧;
  - call key: ⟦S1388⟧;
  - plain status: ⟦S0076⟧ ⟦S0251⟧;
  - live status: ⟦S1442⟧ (feedback).

**First pass of the ladder complete:** every non-hero slot now stands at 5, and the hero at 10. Next pass: V6 + V7 for Video → Booking.

## L12 · Video 6 + 7 · checks 40/40 · evidence `gates/ladder/L12-video-6-7/` · Video now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Video 6 · Through the Window** | Cowboy (warmth, people first) | A drawn house front whose picture-window curtains draw open when the section is seen; Owl's crew film plays inside the window. The moment's name is written on the sill and follows the film; the lamp in the side window changes with the moments. 3D play/pause key, "Watch the Full Film" (YouTube ehKLv5DF2TQ), "Book a Wise Check". | 8.2 | 8.4 | 8.0 | 8.6 | **8.28** |
| **Video 7 · Scrub the Day** | Apple AirPods Pro (pinned scroll; the film is the event) | The stage pins while you scroll and the scroll drives the clip's time, eased frame by frame: down plays forward, up rewinds. The five frame-checked moments rise as large captions with a timecode, and a progress rail lights a dot for each moment passed. Reduced motion gives a normal player with controls. | 8.6 | 8.0 | 8.4 | 8.4 | **8.36** |

**Truth:**
- Both use only Owl's own crew clip; every caption comes from the frame-checked moments list (rafters and decking, GAF shingles carried up, crew with a shingle, walking a finished roof, OSB decking carried in). No invented claims.
- Roofer check: the window film is a real job; the sill line "Walking a finished roof" matches the frame at 9.2 s onwards (tested by seeking to 9.6 s).

**Checks run:** the generic gate, plus:
- Video 6: curtains open on view; the clip is the crew film; the sill names a listed moment and follows a seek to 9.6 s; the play key pauses and relabels; the full film opens YouTube ehKLv5DF2TQ.
- Video 7: five rail dots; scrolling to 62% sets the rail to 0.62 and the film to about 9.6 s; the caption reads "Finished roof" with four dots lit; the stage stays pinned; scrolling back rewinds to "Rafters"; the full film opens.

**Ledger:**
- **Video 6:** curtain and frame draw ⟦S0407⟧; open sequence ⟦S0187⟧; 3D keys ⟦S1388⟧; modal ⟦S1046⟧; title ⟦S0451⟧.
- **Video 7:** sticky artifact ⟦S0448⟧; progress rail ⟦S1325⟧; captions ⟦S0451⟧; timecodes ⟦S1352⟧.

**Build change:** repeated video posters are now stored once like the images (`poster` → `data-aposter`, restored by `OWL.hydrate`); the file went from 6.90 to 5.82 MB. The homepage regression (`home-verify`) passes 50/50, and all 10 rendered posters hydrate.

## L13 · Explore 6 + 7 · checks 45/45 · evidence `gates/ladder/L13-explore-6-7/` · Explore now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Explore 6 · Follow the Drop** | Lusion (one line carries the visitor) | A side section through a Minnesota eave at 5/12, drawn in roofer order: rafter tail and fascia, OSB deck, drip edge on the deck at the eave, ice & water shield over it running past the inside of the heated wall, synthetic underlayment lapped over that, starter strip, shingles into the gutter. A drop follows one flow line; a tag names each layer it reaches and the layer chips light. Four scenario keys: a correct eave · without drip edge (curls back, rots the fascia) · ice dam with ice & water shield (stopped) · ice dam without it (through the deck, stains the ceiling). | 8.4 | 8.4 | 8.4 | 9.2 | **8.54** |
| **Explore 7 · Under the Lens** | Immersive Garden (the surface reacts where the cursor moves) | A finished roof face, seen straight on. The cursor opens an x-ray lens in three rings: shingles, what lies under them, the deck, the rafters. What it shows depends on where it is: ice & water shield over the drip edge at the eave, lapped underlayment with cap nails up the field, the deck slot for the ridge vent at the ridge, drip edge over the underlayment at the rakes. The lens swells with speed and leaves amber ripples; Ridge · Field · Eave keys and arrow keys move it. | 8.6 | 8.0 | 8.4 | 9.0 | **8.46** |

**Truth and roofer audit:**
- Explore 6: drip edge goes under the ice & water shield at the eave; the underlayment laps over the membrane (upslope over downslope); shingles overhang into the gutter; the ice dam sits over the cold overhang, outside the heated wall. The footnote says only what a correct Minnesota roof carries, without quoting code numbers. Layer thicknesses are drawn larger than life, as a section drawing does; the code says so.
- Explore 7: rafters at 24″ on centre; 4×8 OSB with staggered joints; ice & water in two lapped rolls; the ridge slot stops short of the ends; drip edge goes over the underlayment on the rakes and under it at the eave.
- Neither is a game: no score, no win state (tested). Explore V3 stays the only game.

**Checks run:** the generic gate, plus:
- Explore 6: the correct eave plays first and ends in the gutter; the drawing order is roofer order; ice & water extends past the heated wall; the lit chips follow the drop; each scenario shows its own outcome (rot, stop, leak); the outcome text and figure description match the pressed key.
- Explore 7: the lens opens at the eave on view; three shrinking rings; pointer → field shows underlayment and the lens follows; rake shows drip edge over underlayment; the Ridge key glides to the ridge vent slot; arrow keys bring it back to the eave; five layers listed per zone; the deck layer carries the ridge slot.

**Ledger:**
- **Explore 6:** flow line and moving drop ⟦S0407⟧; blueprint annotation ⟦S0468⟧; anatomy section ⟦S0526⟧; scenario keys ⟦S1246⟧ ⟦S1388⟧; title ⟦S0451⟧.
- **Explore 7:** CSS mask reveal with eased pointer ⟦S1324⟧; ripple emitted per distance ⟦S1323⟧; anatomy ⟦S0526⟧; keyboard lens ⟦S1107⟧; zone keys ⟦S1388⟧.

**Defect found and fixed in the round:** Explore 7 first drew its four layers as live SVG under moving masks, which repainted ~2,000 shapes a frame and slowed the lens under load (three checks failed in the full run). Each layer is now drawn once as an image, and the lens easing is time-based, so it arrives on time at any frame rate.

## L14 · Wise Check 6 + 7 · checks 42/42 · evidence `gates/ladder/L14-wise-6-7/` · Wise Check now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Wise 6 · Contact Sheet** | Scout Motors (film-roll photo evidence) | A light table (it flickers on like a tube) holding a strip of film with eight drawn frames: the four published parts of the Wise Check, then Owl's four published "when to call" cases. Drag the strip with inertia, use Prev/Next, or arrow/Home/End through the frames. The chosen frame is circled in amber grease pencil and shown enlarged in a loupe beside Owl's own line; a case frame also names the parts it looks at. Labelled "The frames are drawings, not job photos." | 8.4 | 8.0 | 8.2 | 8.6 | **8.30** |
| **Wise 7 · The Route** | Lusion (one line carries the visitor) | A cutaway house. Scrolling draws one dotted route with an amber marker: up the ladder to the chimney flashing (roof evaluation, magnifier), in through the hatch to the attic (attic inspection, flashlight cone), under the ceiling stain (heat-sensor leak detection, false-colour patch), to the table where photos are shown (documentation). Each station gets an equal share of the scroll and lights its card; the cards are keys that move the route. | 8.4 | 8.2 | 8.2 | 8.6 | **8.34** |

**Truth:**
- Every name and line comes from `OWL.WISE` (Owl's published Wise Check words), tested string for string. No durations, prices or promises are added.
- Wise 6's frames are labelled as drawings. Wise 7 states that the stations are numbered as Owl lists the parts, not as a fixed order of work.
- Roofer check: the heat-sensor frame shows the damp patch reading cooler (blue) than the dry ceiling around it, which is how moisture shows on a thermal camera.

**Checks run:** the generic gate, plus:
- Wise 6: eight frames in data order; frame 1 chosen with Owl's words; Next ×2 lands on heat-sensor; End brings frame 8 into view; case frames list their parts from data; dragging moves the strip without picking a frame; the drawings label.
- Wise 7: card text from data; nothing lit at the start; 60% scroll lights stations 1–2 with the flashlight on and the heat patch off; the end lights all four; a card moves the route back to station 3; the route is masked up to the marker; the no-fixed-order note.

**Ledger:**
- **Wise 6:** grease-pencil draw-on ⟦S0407⟧; draggable strip with keyboard and button alternatives ⟦S1018⟧ ⟦S1107⟧; 3D keys ⟦S1388⟧; title ⟦S0451⟧.
- **Wise 7:** route draw through a mask ⟦S0407⟧; scroll progress ⟦S1325⟧; anatomy cutaway ⟦S0526⟧; station keys ⟦S1388⟧; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- Wise 7's long floor walk took most of the scroll, so station 2 only lit at 78%; each station now gets an equal share.
- Its easing was frame-rate bound and missed the end under load; it is now time-based.
- Idle grease-pencil dots showed on unchosen frames; they are now hidden.
- The phone loupe touched the gutter; it is now inset.

## L15 · Protect Your Nest 6 + 7 · checks 43/43 · evidence `gates/ladder/L15-protect-6-7/` · Protect now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Protect 6 · Sweep the Yard** | Lando Norris (bespoke craft, motion that comes to rest) | One flower bed and lawn below the wall after the new roof is on. The tarp holds the tear-off; a few shingle bits and nails lie past it. Four keys run the system: pass 1 the crew (the tarp folds up with its load, the strays arc into the bag), pass 2 the magnet sweep (a rolling magnet crosses the lawn twice and nails leap to it), pass 3 the project manager (footsteps cross the yard, a lens finds the last nail under a shrub, a check), then the aftercare box drops onto the step. Play All Four runs them in turn. Nothing jumps: every piece eases from where it is. | 8.4 | 8.4 | 8.6 | 8.8 | **8.50** |
| **Protect 7 · Three Chapters** | MERSI (split-cover chapters) | Three tall covers (01 The Wrap on ink, 02 Three Passes on amber, 03 The Box on cream). Opening one splits its cover down the middle; the halves slide apart, the chapter widens to show a drawn plate (drawn on) and Owl's words, and the others narrow. One open at a time; arrow keys move between covers; closed chapters are inert. | 8.4 | 8.2 | 8.0 | 8.6 | **8.30** |

**Truth:**
- Both say only what the Protect Your Nest System is in Owl's words: the wrap (mesh from the eaves down, a tarp over the lawn), three cleanup passes (the crew, a magnet sweep, the project manager) and the aftercare box ("Left with you when the crew goes"). No storm, hail or shield (tested, the standing rule for every Protect version).
- Protect 6 is labelled "A drawing of the system, not a count from a real job"; it shows no counts.
- The box's contents are not described, because Owl does not publish them.

**Checks run:** the generic gate, plus:
- Protect 6: the start state is the wrap; pass 1 clears the tarp and bits but leaves the nails; mid pass 2 the magnet is on the lawn with nails lifting; after the sweep no lawn nail is left but the hidden one is; pass 3 lays the footsteps, finds it and shows the check; the box lands on the step with Owl's line; pressed and done states; the drawing label.
- Protect 7: the truth wording; chapter 01 splits open on view; the open chapter is more than twice the width of a closed one; opening 02 closes 01; closed content is inert; 02 lists the passes in order; arrow + Enter opens 03.

**Ledger:**
- **Protect 6:** debris arcs and settle, no teleporting ⟦S0489⟧; footstep path ⟦S0407⟧; pass keys ⟦S1388⟧ ⟦S1246⟧; title ⟦S0451⟧.
- **Protect 7:** split and flex transition ⟦S0409⟧; accordion a11y (aria-expanded, inert) ⟦S0910⟧; plate draw-on ⟦S0407⟧; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- Protect 6's mulch flecks rotated about the wrong origin and landed on the siding; they now rotate in place.
- The last two strays finished after pass 1's end state and wrote "-0.00"; values are now clamped and the pass ends after the last piece.
- Protect 7's cover icons sat on the numerals at narrow widths; they moved to the bottom.

**Evidence note:** the full-page capture replays Protect 7's width transition, so its evidence is viewport shots (`f25`). Protect 6 also has 2× shots mid-sweep, mid-walk and with the box set down.

## L16 · Services 6 + 7 · checks 39/39 · evidence `gates/ladder/L16-services-6-7/` · Services now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Services 6 · What Do You See?** | Quiet Cubes (configurator first) | Five plain things a homeowner notices, as 3D keys with drawn icons: a leak or a stain · shingles down after a storm · an older roof · planning a new roof · tired siding. Choosing one re-deals Owl's five service cards with FLIP motion: the fit rises to the top as "Start here", opening its photo and what's included; the next sensible one is "Also worth a look"; the rest sit back with greyed photos. A live line names both. | 8.2 | 8.8 | 8.0 | 8.6 | **8.42** |
| **Services 7 · A Roof's Life** | Scout Motors (heritage timeline spine) | One vertical spine through a roof's life with no years claimed: Day one (Roof Replacement) · After a storm (Storm Damage Help) · When something leaks (Roof Repair) · Every so often (Wise Check Inspections) · When the walls are next (Siding). The amber spine fills as you scroll; each stop lights, wipes Owl's photo open and settles its card; a round roof badge rides the spine and changes per stop (new, hail, drip, magnifier, new siding). | 8.4 | 8.2 | 8.2 | 8.6 | **8.34** |

**Truth:**
- Every card is `OWL.SVC`: Owl's names, lines, included items and photos (with the same truthful alts as Services 5).
- Services 6 says "A guide, not a diagnosis. A Wise Check is how we confirm what your roof needs." The pairings are roofer-sensible: leak → repair, then a Wise Check (leak detection tools); storm → Storm Damage Help; older roof → Wise Check, then replacement; new roof → replacement, then siding; siding → siding, then replacement.
- Services 7 names no ages or intervals (tested: no "N years").

**Checks run:** the generic gate, plus:
- Services 6: five cards from data; leak → repair then check, with the first card opened; storm → Storm Damage Help and the live line; arrow + Enter → older roof puts the Wise Check first; the guide note.
- Services 7: five stops with no years; data words; nothing lit at the top; halfway the spine is at 0.5 with 2–3 stops lit; the badge rides the spine and matches the stop; at the end all five are lit and the badge shows siding; photos are Owl's.

**Ledger:**
- **Services 6:** keys ⟦S1388⟧; FLIP re-deal ⟦S0409⟧; arrow keys ⟦S1107⟧; title ⟦S0451⟧.
- **Services 7:** progress spine ⟦S1325⟧; badge states ⟦S0407⟧; photo clip reveal ⟦S1324⟧-style; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- Services 6's key group was a `ul` with `role="group"`, which orphaned its items (axe listitem); it is now a plain group of buttons.
- Faded "rest" cards and unreached Services 7 cards first used opacity, which would drop the text contrast; now only the photos grey or stay closed, and the text stays at full contrast.

## L17 · Reviews 6 + 7 · checks 39/39 · evidence `gates/ladder/L17-reviews-6-7/` · Reviews now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Reviews 6 · Dead Level** | Quiet Cubes (the instrument is the structure) | A big amber torpedo level etched "Owl Roofing · 5.0 · 90+ reviews". The pointer tilts it and the bubble runs to the high end on a damped spring; let go and it settles back dead level. The reading never changes: "5.0 from 90+ reviews. It sits level." (while tipped: "Still 5.0. Let go and watch it settle."). The locked proofs sit beneath as chips; "Give It a Nudge" does the tilt for keyboard and touch. | 8.4 | 8.2 | 8.6 | 8.6 | **8.44** |
| **Reviews 7 · Ninety Shingles** | Graza (custom-animation bar) | One shingle per review, laid roofer-correct from the eave up: starter strip, then six courses that each lap the one below, four nails per shingle hidden by the next course, cut half-pieces at the rake (not counted), while a counter climbs to 90. One more shingle slides in with a "+", the ridge cap goes on, and the ridge reads "5.0 · 90+ reviews". "Lay It Again" replays. | 8.6 | 8.0 | 8.6 | 8.6 | **8.46** |

**Truth:**
- The only rating anywhere is "5.0 from 90+ reviews". There are no quotes, names, sources or other ratings (tested).
- Reviews 7 says "Every shingle stands for a review; none stands for a quote." The count stops at 90 and then shows "90+", never a higher figure.
- The proofs are exactly the locked set: BBB A− since Feb 25, 2026 · GAF Systems Plus · MN licence #BC809662 · 10-year workmanship warranty.

**Roofer check (Reviews 7):** shingles go on from the eave up; the starter runs full width under the first course; the joints are offset half a shingle course to course; nails sit just above the exposure line where the next course covers them; the ridge cap covers the top course's nails (tested); the rake ends get cut pieces.

**Checks run:** the generic gate, plus:
- Reviews 6: rating and proof wording; level at rest; the pointer tilts it with the bubble to the high end; the reading stays 5.0; it settles back level with "It sits level."; the nudge key tips it.
- Reviews 7: 90 counted shingles and 3 cut pieces; fully laid with 90+ and the ridge badge; courses ordered eave-up; the ridge covers the top nails; Lay It Again replays with the counter mid-climb; the no-quote note.

**Ledger:**
- **Reviews 6:** damped spring settle, no teleport ⟦S0489⟧; nudge key ⟦S1388⟧; micro-interaction ⟦S0405⟧; title ⟦S0451⟧.
- **Reviews 7:** drop-and-settle per shingle ⟦S0489⟧; tabular counter ⟦S1352⟧; replay key ⟦S1388⟧; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- Reviews 6's vial hid the "5.0" in the right engraving; it is resized to fit.
- Reviews 7's first lay showed the top-course nails, left a gap at the right of the offset courses, and let the deck show through the first course. The ridge cap now covers the nails, the rakes get cut pieces, and the starter runs full height.

## L18 · Service Area 6 + 7 · checks 41/41 · evidence `gates/ladder/L18-area-6-7/` · Area now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Area 6 · As the Owl Flies** | Lusion (one line carries the visitor) | A real map: the 29 town centres plotted to scale from latitude and longitude (equirectangular at 45° N), with a true 5-mile scale bar, a north arrow and faint flight spokes from the nest. Picking a town (dot, button or search; "st paul" works) flies a small owl along an amber line from Shoreview and reads "About N miles from our nest, as the owl flies. Yes, we roof here." The miles are computed (haversine), stated as approximate; Edina reads 16. | 8.4 | 8.6 | 8.2 | 8.8 | **8.50** |
| **Area 7 · Welcome To** | Lando Norris (bespoke, made for one business) | Fully abstract: a green city-limit sign on two posts by a road, small 3D, that spins on its posts to each town ("Welcome to Edina", amber plate "Owl Roofing roofs here", "9 of 29"). Search, A–Z letters (only letters with a town; repeat to cycle), Prev/Next keys; idle, it turns slowly and quietly (no announcements), and stops once a visitor acts. Clouds drift. | 8.2 | 8.4 | 8.2 | 8.6 | **8.34** |

**Truth and the map rule:**
- Area 6 is a real map, not a fake one. Every dot sits at its town's real coordinates (tested by known relations: Minneapolis west of Saint Paul, Forest Lake furthest north, Apple Valley furthest south, Stillwater furthest east). There are no invented roads, rivers or lakes. The note reads "Town centres plotted from their coordinates, to scale. Not a street map. Miles are straight-line and approximate."
- Area 7 is fully abstract: one sign, no geography.
- Both versions use the real 29 towns, with Shoreview as home at the locked address. An unknown town is told it is not on the list and given (651) 977-6027.

**Checks run:** the generic gate, plus:
- Area 6: 29 towns with Shoreview first; the geography relations; the honest note; Edina at 15–17 miles with the owl landing on its dot and the line drawn; "st paul" search; the unknown-town reply; the 5-mile bar.
- Area 7: the letters are exactly A B C E F L M N O P R S V W; search spins to Edina and confirms; idle turning stops after a visitor acts; M cycles Maple Grove → Maplewood; Next goes alphabetically; the unknown-town reply.

**Ledger:**
- **Area 6:** flight line draw and owl path ⟦S0407⟧; town buttons and search ⟦S1107⟧ ⟦S1442⟧; keys ⟦S1388⟧; title ⟦S0451⟧.
- **Area 7:** sign spin ⟦S0409⟧; letter rail keyboard ⟦S1107⟧; 3D keys ⟦S1388⟧; search feedback ⟦S1442⟧.

**Defects found and fixed in the round:**
- Area 6's single phone column was `1fr` and overflowed by 2 px; it is now `minmax(0,1fr)`.
- Area 7's letter keys were 33 px wide on phones; they now use 7 columns at 44 px or more.
- Area 7's counter overlapped the plate on phones; it moved to the top corner.
- Area 7's idle turns announced every town to screen readers; they are now quiet.

## L19 · We Give a Hoot 6 + 7 · checks 36/36 · evidence `gates/ladder/L19-family-6-7/` · Family now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Family 6 · Porch Light** | Cowboy (people-fronted warmth) | A drawn front porch in soft early-evening light (kept light): siding, door, lamp, a window, and a doormat reading "WE GIVE A HOOT". The two founding families' real photos hang framed on the wall, labelled "The Browns" and "The Berglands". The porch light comes on when the porch is seen; a switch (aria-pressed) turns it off and on: the dusk lifts, a warm glow falls on the photos, fireflies drift (still under reduced motion). | 8.4 | 8.0 | 8.6 | 8.8 | **8.42** |
| **Family 7 · The Pinboard** | Lando Norris (bespoke, motion that comes to rest) | A cork board with Owl's five real photos as pinned prints (the Browns, the Berglands, Noah at the roof edge, the crew, the community) around an embroidered patch ("OWL ROOFING · FAMILY-OWNED · EST. 2025 · SHOREVIEW, MN · WE GIVE A HOOT") whose stitches sew on when seen. Prints drag, tilt and settle on damped springs; arrow keys move a focused print; Tidy Up eases them home. | 8.4 | 8.2 | 8.4 | 8.6 | **8.40** |

**Truth:**
- Only the locked facts appear: family-owned, founded 2025 in Shoreview by Tim Brown and Noah Bergland, "We Give a Hoot".
- Only Owl's own photos are used, each described as in earlier versions (from the owner's material). Nothing new was generated or invented.
- Family 7's short captions ("Tim Brown & family") keep the full description in each print's accessible name.

**Checks run:** the generic gate, plus:
- Family 6: founding facts and doormat; two real photos with true alts; the light comes on when seen; the switch turns it off and on with the dusk lifting and the glow on.
- Family 7: five real prints with true descriptions; the patch facts; drag and settle where dropped; arrow keys move a focused print; Tidy Up returns every print home.

**Ledger:**
- **Family 6:** fireflies ⟦S1363⟧; switch ⟦S0405⟧; keys ⟦S1388⟧; title ⟦S0451⟧.
- **Family 7:** draggable with a keyboard alternative ⟦S1018⟧; spring settle ⟦S0489⟧; stitch draw-on ⟦S0407⟧; Tidy key ⟦S1388⟧.

**Defects found and fixed in the round:**
- Family 7's long captions ran onto the photos; they were shortened, and the phone prints got room for two lines.
- The community print covered the patch on phones; phones now get a taller board with the patch at the top.

## L20 · Booking 6 + 7 · checks 38/38 · evidence `gates/ladder/L20-booking-6-7/` · Booking now at 7
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Booking 6 · Work Order** | Lando Norris (bespoke craft object) | The form as a crew clipboard: a ruled work-order sheet under a steel clip ("Owl Roofing · Work order · Wise Check") with name, phone and address written on its lines, "What's going on?" chips, and a note. A checklist beside it ticks as the sheet fills. A valid submit hands the sheet to the visitor's own email app (`OWL.bookForm`), lifts the top sheet and stamps it "Over to your email". The phone sits on the board's strip. | 8.4 | 8.6 | 8.2 | 8.6 | **8.46** |
| **Booking 7 · Knock Knock** | Cowboy (warmth, people first) | Three front doors on a porch strip: 1 Call us (amber), 2 Write to us (ink), 3 Find us (blue), each with a numbered plaque and knob. Pointing opens a door a crack; pressing swings it in on warm light and the way in: the tel link and hours, the email link, or the office address and hours. One open at a time; closed doors are inert; Tab from an open door lands on its link. | 8.4 | 8.4 | 8.2 | 8.6 | **8.40** |

**Truth:**
- Only the locked contacts appear: (651) 977-6027, info@owlroofing.com, Owl Roofing LLC · 1000 County Rd E #230, Shoreview, MN 55126, Mon–Sat 08:00–18:00.
- Booking 6 never claims a request was saved, sent, booked or confirmed (tested on the page text and the stamp). It says "Nothing is sent until you send it."
- Roofer and life check: front doors swing in, so Booking 7's doors open inward.

**Checks run:** the generic gate, plus:
- Booking 6: locked phone and honest wording; an empty submit asks for the name, focuses it and doesn't stamp; filling the sheet ticks all four lines and chips pick one; a valid submit shows the honest hand-off message and the stamp; the stamp has no sent or booked wording.
- Booking 7: three doors; closed panels inert; door 1 shows the tel link and hours; the open door stays inside its frame; opening door 2 closes door 1 and shows the locked email; the keyboard opens door 3 on the address; Tab from an open door lands on its link.

**Ledger:**
- **Booking 6:** form rules and hand-off ⟦S1442⟧; checklist ticks and stamp ⟦S0405⟧; keys ⟦S1388⟧; title ⟦S0451⟧.
- **Booking 7:** door swing ⟦S0409⟧; disclosure a11y (aria-expanded, inert, tab order) ⟦S0910⟧; keys ⟦S1388⟧; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- Booking 7's door first swung outward, past 90°, toward the viewer, and its 3D projection flooded the page; doors now swing in, up to 84°, inside a clipped frame.
- A panel class named `.in` collided with a global class and covered the section; it is renamed `.way`.
- Booking 6's back sheet covered the phone strip; it was shortened.

**Second pass of the ladder complete:** every non-hero slot now stands at 7 (Video, Explore, Wise Check, Protect, Services, Reviews, Area, Family, Booking), and the hero at 10. The homepage regression (`home-verify`) passes 50/50 after the pass. Next pass: V8 + V9 for Video → Booking.

## L21 · Video 8 + 9 · checks 36/36 · evidence `gates/ladder/L21-video-8-9/` · Video now at 9 (third pass begins)
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Video 8 · Inside the Letters** | Apple AirPods Pro (type as the full-screen event) | The crew film plays inside giant knocked-out letters, "OWL CREW", on cream (an SVG mask). The stage pins while you scroll; the letters grow about the O, the cream fades, and the film fills the frame; then "Owl's own crew, on the job." lands with "Watch the Full Film". On a portrait stage the word stacks as OWL over CREW. Reduced motion shows the film whole with the line. | 8.6 | 8.0 | 8.6 | 8.4 | **8.42** |
| **Video 9 · Movie Night** | Cowboy (warmth, family first) | A drawn driveway at early evening (kept light): a projector on a tripod throws the crew film onto the garage door with a slight keystone, dust drifting in the beam. It switches on when seen (the beam flickers up); a 3D switch stops and starts it; a "Now showing" card names the frame-checked moment with its timecode. | 8.4 | 8.2 | 8.4 | 8.6 | **8.40** |

**Truth:** both use only Owl's own crew clip and the frame-checked moments list (tested: 9.5 s → "Walking a finished roof", 0:09). The full film is YouTube ehKLv5DF2TQ.

**Checks run:** the generic gate, plus:
- Video 8: the crew clip under OWL CREW; at rest at the start; mid-scroll the letters scale above 3× with the cream still on; pinned while growing; at the end the cream is gone and the line has landed; the full film opens.
- Video 9: on when seen, with the crew clip on the door; Now showing follows a seek; the switch stops it (beam off, paused, relabelled); the full film opens.

**Ledger:**
- **Video 8:** sticky stage ⟦S0448⟧; type as the event, via mask ⟦S0451⟧; scroll progress ⟦S1325⟧; modal ⟦S1046⟧.
- **Video 9:** dust in the beam ⟦S1363⟧; switch ⟦S0405⟧; keys ⟦S1388⟧; modal ⟦S1046⟧.

**Defects found and fixed in the round:**
- Video 8's wide word was cropped to its middle letters on phones; portrait stages now stack it.
- A dark hairline showed at the stage's rounded corners; the stage background is now cream.

## L22 · Explore 8 + 9 · checks 38/38 · evidence `gates/ladder/L22-explore-8-9/` · Explore now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Explore 8 · The Nail Line** | Longbow Motors (craft as doctrine) | One laminated shingle from the front (nailing strip marked, the line the next course covers to) and a side section through one nail (deck, underlayment, course below, both layers of this shingle, course above). Five keys: Right · Too high · Too low · Over-driven · Under-driven. The four nails ease to each position; the section shows the consequence: misses the bottom layer, head out in the weather, cut into the mat, lifted so it can't seal. A ✓ or ✕ reading gives the doctrine in plain words. On phones the section stacks under the front view. | 8.2 | 8.4 | 8.0 | 9.2 | **8.42** |
| **Explore 9 · Let It Breathe** | Lusion (flow carries the eye) | A gable cutaway with soffit intake, insulation and baffles, rafters and a ridge vent. Air particles come in low, run up the underside of the deck and leave at the ridge. Three keys: Balanced · Blocked soffits (insulation over the vents; the air stalls warm, droplets form) · No ridge vent (the exhaust is shut; warm air pools). Reduced motion draws the airflow as still dashed paths. | 8.4 | 8.2 | 8.4 | 9.0 | **8.46** |

**Roofer check:**
- Explore 8: at least four nails per shingle; nails go in the nailing strip, through both layers where they're bonded, driven flush, and covered by the next course. Each of the four faults and its consequence is standard installation guidance.
- Explore 9: balanced intake at the soffits and exhaust at the ridge; baffles keep insulation off the soffit vents; a blocked intake or a missing exhaust leaves warm, damp air in the attic, with frost on the nails in winter.
- Neither has a score or a win state; Explore V3 stays the only game.

**Checks run:** the generic gate, plus:
- Explore 8: five keys; right puts four nails in the strip with the doctrine; too high puts the nails above the strip and shows the miss; too low puts them below the cover line with the head exposed; under-driven lifts the course above with no seal; faults read ✕; no game.
- Explore 9: particles drawn on the canvas; balanced shows baffles and no damp; blocked shows the plug, the damp and the frost wording; no ridge shows the shut vent and "No way out"; the figure description follows the state.

**Ledger:**
- **Explore 8:** anatomy section ⟦S0526⟧; annotation ⟦S0468⟧; keys ⟦S1246⟧; title ⟦S0451⟧.
- **Explore 9:** particles ⟦S1363⟧; flow paths ⟦S0407⟧; keys ⟦S1246⟧; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- Explore 8's first section was too small and its labels collided. It was redrawn thicker, with layer names drawn over the nail.
- On phones Explore 8 was unreadable; the section now stacks under the front view.
- Explore 9's columns were the wrong way round, and its damp tint spilled outside the attic; it is now clipped to the attic.

## L23 · Wise Check 8 + 9 · checks 37/37 · evidence `gates/ladder/L23-wise-8-9/` · Wise Check now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Wise 8 · The File** | MERSI (chapter system, as folder tabs) | A manila file folder with five tabs, the questions people ask: What is it? · What's in it? · When to book? · Will I see it? · How to book? Choosing a tab pulls its ruled sheet to the front while the others shuffle back and peek out behind, each a little off square. Every answer is Owl's published words (`OWL.SVC`, `OWL.WISE`) or the locked contacts. A real tablist with arrow, Home and End keys; back sheets are inert. | 8.2 | 8.6 | 8.0 | 9.0 | **8.38** |
| **Wise 9 · Field Notebook** | Graza (custom-animation bar) | A spiral-bound notebook on a desk. Each spread pairs a pencil-line sketch that draws itself (shingles under a magnifier, rafters and a flashlight, a heat camera on a damp patch, a phone of photos, a handset and envelope) with Owl's words on lined paper. Next and Previous (and the arrow keys) turn the page with a real 3D leaf; phones get a single page that swaps. Labelled "Sketches, not photos." | 8.6 | 8.0 | 8.6 | 8.6 | **8.42** |

**Truth:** both use only `OWL.WISE` and `OWL.SVC` text and the locked contacts. Wise 8 claims no price or duration (tested). Wise 9's drawings are labelled as sketches.

**Checks run:** the generic gate, plus:
- Wise 8: five tabs with the first sheet in front; back sheets inert and aria-hidden; the four parts word for word; arrow keys reach the four published cases; End reaches the locked contacts and tel link; no price or duration.
- Wise 9: page 1 of 5 with the first part and a sketch, Previous disabled; Next turns to the attic and the leaf cleans up; arrow keys reach the last page's tel link with Next disabled; Previous turns back; the sketches label.

**Ledger:**
- **Wise 8:** tabs a11y ⟦S1246⟧; sheet shuffle ⟦S0409⟧; title ⟦S0451⟧; CTA ⟦S1388⟧.
- **Wise 9:** sketch draw-on ⟦S0407⟧; page turn ⟦S0409⟧; keys ⟦S1388⟧; keyboard ⟦S1107⟧.

**Defects found and fixed in the round:**
- Wise 8's shuffled sheets overflowed by 5 px on phones (now clipped), and the paper clip covered a tab (moved to the side).
- Wise 9 rendered empty: its `.book` and `.page` classes collided with global classes (`.page` belongs to the page router). They are renamed `.nb` and `.npg`. Note for every later version: avoid the global class names `.page`, `.book`, `.in` and `.chips`.

## L24 · Protect Your Nest 8 + 9 · checks 36/36 · evidence `gates/ladder/L24-protect-8-9/` · Protect now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Protect 8 · Job Board** | Graza (custom-animation bar) | The crew's whiteboard in an aluminium frame with a marker tray, titled "Your re-roof · Protect Your Nest System". Seven lines in job order (wrap goes up · old roof off · new roof on · pass 1 the crew · pass 2 a magnet sweep · pass 3 the project manager · aftercare box), each ticked in green marker one after another with a marker doodle when the board is seen. Choosing a line underlines it in amber and pins a sticky note with Owl's words. "Wipe and Run Again" sweeps an eraser across and replays. | 8.2 | 8.6 | 8.2 | 8.8 | **8.40** |
| **Protect 9 · The Leaflet** | Lando Norris (a bespoke made object) | A printed tri-fold leaflet on a table. It lies folded to its cover (ink, amber "Protect Your Nest System", a drawn nest and owl), then unfolds in small 3D, right flap then left, to three inside panels whose plates draw on: the wrap · three cleanup passes (listed 1–3) · the aftercare box. "Fold It" / "Open It" key; the folded inside is hidden from readers; phones show the three panels stacked. | 8.6 | 8.0 | 8.6 | 8.6 | **8.42** |

**Truth:** both say only what the system is in Owl's words (the wrap, the three passes, the aftercare box) plus "GAF materials, installed by a GAF Systems Plus Certified crew" from `OWL.SVC`. There is no storm, hail or shield (the standing rule, tested). The leaflet's back panel carries only the locked phone and email.

**Checks run:** the generic gate, plus:
- Protect 8: truth wording; seven lines in order, all ticked; choosing a line underlines it and pins "Step 5 of 7"; wipe erases, then re-ticks all seven.
- Protect 9: truth wording; unfolds when seen with the key reading "Fold It"; cover and back show only locked facts; Fold It returns to the cover with the inside aria-hidden; Open It reopens.

**Ledger:**
- **Protect 8:** marker doodles ⟦S0407⟧; ticks and underline ⟦S0405⟧; keys ⟦S1388⟧; title ⟦S0451⟧.
- **Protect 9:** fold transition ⟦S0409⟧; plate draw-on ⟦S0407⟧; key ⟦S1388⟧; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- Protect 8's amber underline sat behind the board and could not be seen; the label is now isolated so it shows.
- Protect 9's early evidence caught the flaps mid-fold; the evidence is now taken after the unfold settles (viewport shots, because the full-page capture replays transitions).

## L25 · Services 8 + 9 · checks 35/35 · evidence `gates/ladder/L25-services-8-9/` · Services now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Services 8 · Name Your Job** | Immersive Garden (the surface reacts where the cursor moves) | An editorial list: the five service names set very large between ink rules, numbered 01–05. Pointing at a row floats that service's own photo beside the cursor, eased and leaning with its speed; the photo steps aside over open details. Each row is a disclosure (aria-expanded, inert when closed) that slides open Owl's line and what's included; the plus key turns to a close. On touch and phones the photo shows inside the open row instead. | 8.4 | 8.4 | 8.4 | 8.6 | **8.42** |
| **Services 9 · The Stack** | Lando Norris (bespoke, rest-motion) | Five full-width cards that pin one after another as you scroll, each sliding up over the last while the ones beneath settle back (smaller, a touch dimmer) into a neat stack 18 px apart. Each card has Owl's photo (which settles in as it arrives), an outlined numeral, the name, the line and what's included, on five palettes drawn from ink, amber and cream. Reduced motion shows a plain list. | 8.6 | 8.2 | 8.2 | 8.6 | **8.42** |

**Truth:** every name, line, included item and photo comes from `OWL.SVC`, with the same truthful alts as earlier versions.

**Checks run:** the generic gate, plus:
- Services 8: five rows in Owl's words with the first open; closed details inert; pointing floats the right photo; opening a row closes the others and lists what's included; it closes again.
- Services 9: five cards with Owl's photos and words; at 70% scroll the cards are pinned and stacked 18 px apart; covered cards are smaller and dimmer; scrolling back restores the top card.

**Ledger:**
- **Services 8:** eased pointer photo reveal ⟦S1324⟧; disclosure a11y ⟦S0910⟧; type as the layout ⟦S0451⟧; keys ⟦S1388⟧.
- **Services 9:** sticky stack ⟦S0448⟧; scroll progress ⟦S1325⟧; title ⟦S0451⟧; CTA ⟦S1388⟧.

**Defects found and fixed in the round:**
- Services 9 at first didn't stack: each card was sticky inside its own list item, so it had nowhere to stick. The items themselves are now the sticky cards in one container.
- Services 8's floating photo could cover the open details; it now steps aside over them.

## L26 · Reviews 8 + 9 · checks 37/37 · evidence `gates/ladder/L26-reviews-8-9/` · Reviews now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Reviews 8 · Marquee** | Graza (custom-animation bar) | A theatre marquee: "5.0" in big dot-matrix bulbs and "90+ REVIEWS" in a smaller row (a 5×7 dot font drawn in SVG), inside an amber frame of chasing border bulbs. The bulbs light in a left-to-right sweep when the sign is seen, glowing; bulbs near the pointer swell and burn brighter. Below it are the locked proofs as chips. Reduced motion: lit, still, no chase. | 8.6 | 7.8 | 8.6 | 8.6 | **8.38** |
| **Reviews 9 · Stamped** | Lando Norris (a bespoke made object) | A sheet of paper on a desk and a rubber stamp that follows the pointer. A click presses it and leaves an inked seal, rotated a little, with a real ink texture (turbulence and displacement). Presses cycle only through Owl's locked proofs: 5.0 · 90+ reviews · BBB A− since Feb 25, 2026 · GAF Systems Plus (certified crew) · MN licence #BC809662 · 10-year workmanship. "Stamp It" for keyboard and touch; "Clear the Page"; a live line names each stamp. Not a game. | 8.6 | 8.2 | 8.6 | 8.6 | **8.50** |

**Truth:** the only rating is "5.0 · 90+ reviews"; there are no quotes, names or other ratings. The stamps carry only the locked proofs. The GAF stamp's small line says "Certified crew", from Owl's own "GAF Systems Plus Certified crew"; "certified contractor" was changed to keep the locked wording. There is no A+, Accredited or Master Elite anywhere (tested on every stamp).

**Checks run:** the generic gate, plus:
- Reviews 8: rating and proofs; the sign's label; every lettering bulb lit with the chase on; the dot font spells 5.0 (40 bulbs) and 90+ REVIEWS; bulbs near the pointer swell.
- Reviews 9: three opening stamps in order; a click stamps the licence next; Stamp It stamps the warranty next; every stamp is a locked proof; Clear wipes the page; no game wording.

**Ledger:**
- **Reviews 8:** bulbs as restrained particles ⟦S1363⟧; pointer glow ⟦S0405⟧; title ⟦S0451⟧; CTA ⟦S1388⟧.
- **Reviews 9:** press and settle ⟦S0489⟧; stamp micro-interaction ⟦S0405⟧; keys ⟦S1388⟧; title ⟦S0451⟧.

**Defects found and fixed in the round:**
- The small bulb row was crowded; it is now tighter with dimmer unlit bulbs.
- The stamp ink was too faint, "GAF SYSTEMS PLUS" overflowed its box, and the seal's ring text overlapped itself. The ink is now denser, the type is sized to fit, and the ring text uses a fixed length.
- My expected bulb count in the check was wrong (47); the correct count for "5.0" in a 5×7 dot font is 40. The check was corrected, not the component.

## L27 · Service Area 8 + 9 · checks 38/38 · evidence `gates/ladder/L27-area-8-9/` · Area now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Area 8 · Postmarks** | Graza (custom-animation bar) | Fully abstract: a wall of 29 postmarks on cream, one per real town, each a round cancellation mark with the town on the arc, a star (HOME for Shoreview), "MN" and wavy cancel lines, in three inks, each a little off square. Typing filters the wall; Find, or a click, presses a green "WE ROOF HERE" stamp across the mark and confirms it; arrow keys move across the wall. No ZIP codes. | 8.4 | 8.4 | 8.4 | 8.6 | **8.44** |
| **Area 9 · Tune In** | Quiet Cubes (instrument first) | Fully abstract: a cream radio with a slide-rule dial whose stations are the 29 towns, a speaker grille, a signal meter and a big knob. The knob is a real slider (drag it round, or use the arrow, Home and End keys); the dial band can be dragged sideways; Prev/Next keys and search tune straight to a town. Between stations the meter drops and static shimmers; on a station the meter fills green and the readout confirms the town; on release it settles to the nearest one. | 8.6 | 8.2 | 8.6 | 8.6 | **8.50** |

**Truth:** both use the real 29 towns with Shoreview as home at the locked address. An unknown town is told it isn't on the list and given (651) 977-6027. Both are fully abstract, with no geography implied, and no ZIP codes are invented (tested).

**Checks run:** the generic gate, plus:
- Area 8: 29 marks with Shoreview home and no ZIPs; "ma" filters to Maple Grove and Maplewood; "st paul" stamps Saint Paul; a click stamps Edina, one at a time; arrow keys move across the wall; the unknown-town reply.
- Area 9: slider semantics over 29 stations starting home; arrows tune to Arden Hills with a full signal; dragging between stations drops the signal and brings static; release settles on the nearest town; search tunes to Eagan; the unknown-town reply.

**Ledger:**
- **Area 8:** stamp press ⟦S0405⟧; search feedback ⟦S1442⟧; keyboard grid ⟦S1107⟧; title ⟦S0451⟧.
- **Area 9:** slider keyboard ⟦S1107⟧; settle to station ⟦S0489⟧; keys ⟦S1388⟧; search ⟦S1442⟧.

**Defects found and fixed in the round:**
- Area 8's stamp text overran its frame; it is now fitted to length.
- Area 9's knob first overlapped the dial window and was lowered; the needle hid the tuned town's letters and now sits behind haloed station names.

## L28 · We Give a Hoot 8 + 9 · checks 34/34 · evidence `gates/ladder/L28-family-8-9/` · Family now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Family 8 · The Tree** | Lusion (lines carry the eye) | A family tree the other way up: a tapered trunk with the plaque "Owl Roofing · Est. 2025 · Shoreview, MN", whose five branches draw themselves on to round frames holding Owl's real photos (the Browns, the Berglands, the community, Noah on the job, the crew); leaves bud along them. Choosing a frame opens it larger in a card with its honest caption. Phones hide the frame labels (the card names the choice). | 8.4 | 8.4 | 8.4 | 8.8 | **8.46** |
| **Family 9 · Give a Hoot** | Graza (custom-animation bar) | The tagline as a button: a drawn owl at the centre. Press "Give a Hoot" and it blinks, its beak opens twice, a soft synthesized two-note hoot plays (only on press; a Sound switch turns it off), a waveform draws the hoot, and three ripple rings go out. On first view it hoots silently and the rings bring four real photos into orbit with captions. Idle blinks only while in view. | 8.6 | 8.0 | 8.8 | 8.6 | **8.50** |

**Truth:** both use only the locked facts (family-owned, founded 2025 in Shoreview by Tim Brown and Noah Bergland, "We Give a Hoot") and Owl's own photos with the same true descriptions as before. Family 9's sound is generated in the browser (no audio file) and plays only when the visitor presses the button.

**Checks run:** the generic gate, plus:
- Family 8: the plaque facts; the tree grows with five real photos; every frame has a true description; choosing the Berglands opens the card with its caption.
- Family 9: founding facts; the silent first hoot brings four photos into orbit; pressing Give a Hoot creates exactly two tones and sends out ripples; with Sound off the hoot is silent.

**Ledger:**
- **Family 8:** branch draw-on ⟦S0407⟧; frame hover ⟦S0405⟧; frame keys ⟦S1388⟧; title ⟦S0451⟧.
- **Family 9:** blink and rest motion ⟦S0489⟧; waveform ⟦S0407⟧; hoot key ⟦S1388⟧; sound switch ⟦S0405⟧.

**Defects found and fixed in the round:**
- Family 8's trunk looked spindly; it is now one tapered trunk.
- Its frames started at 60% scale, which made them briefly under 44 px on phones; they now start at 85% with a 56 px minimum.
- Phone labels collided with neighbouring frames; they are hidden there.
- Family 9's resting waveform read as a stray line between the photos; it now appears only during the hoot.

## L29 · Booking 8 + 9 · checks 36/36 · evidence `gates/ladder/L29-booking-8-9/` · Booking now at 9
| Version | Reference | What it is | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|---|---|
| **Booking 8 · One at a Time** | Apple AirPods Pro (one full-screen event at a time) | A conversational stepper in very large type: What's your name? · Best number to reach you? · Where's the roof? · What's going on? (chips), each sliding up as the last is answered, with an amber progress line, Back and Next (Enter moves on; each step checks itself; inactive steps inert). The last screen reads the answers back and "Open My Email" hands them to the visitor's own email app. "Rather call? (651) 977-6027" stays in view. | 8.4 | 8.8 | 8.0 | 8.6 | **8.46** |
| **Booking 9 · Mailbox** | Lando Norris (a bespoke made object) | A postcard to fill in ("Wise Check, please": a note on the left; name, phone and address on lines beside an Owl stamp) next to a drawn mailbox. "Pop It In" slides a complete card into the box and raises the red flag while the visitor's email app opens with the details; an incomplete card shakes and says what is missing. The card comes back still filled in. | 8.6 | 8.2 | 8.6 | 8.6 | **8.50** |

**Truth:** only the locked phone; both say the email is "ready for you to send" from the visitor's own app, and neither claims a request or card was sent, received, saved, confirmed or delivered (tested).

**Checks run:** the generic gate, plus:
- Booking 8: honest wording; question 1 of 4 with only Next shown; an empty answer stays and asks; Enter moves on and grows the progress line; the read-back lists the answers; the honest hand-off message.
- Booking 9: honest wording; an incomplete card shakes, says what's missing and keeps the flag down; a complete card posts with the flag up and the honest message; the card returns still filled.

**Ledger:**
- **Booking 8:** form rules ⟦S1442⟧; step transition ⟦S0409⟧; progress ⟦S1325⟧; keys ⟦S1388⟧.
- **Booking 9:** form rules ⟦S1442⟧; slide and settle ⟦S0489⟧; flag ⟦S0405⟧; keys ⟦S1388⟧.

**Defects found and fixed in the round:**
- Booking 8's hidden buttons still showed, because the global `.btn` display rule beat the `hidden` attribute; they are now hidden explicitly.
- Its review step first used the class `.rv`, which is the global reveal class; it is renamed `.rvw`.

**Known limit:** on phones the mailbox sits below the card, so the posting slide goes to the side rather than into the box; the outcome and wording are the same.

**Third pass of the ladder complete:** every non-hero slot now stands at 9, and the hero at 10. The homepage regression (`home-verify`) passes 50/50 after the pass. Next, the fourth pass: V10 for Video → Booking.
