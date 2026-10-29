# AUDIT-V4: the homepage after the strict standard and the SVG identity addendum

This report covers the 30-version homepage (10 sections, 3 versions each) after the v4 pass.

- **Plan:** `PLAN-HOME-V4.md`.
- **Single file:** `homepage-standalone.html`. It is 4.34 MB; v3 was 4.17 MB.
- **Re-read first:** `bank-index/BANK-MAP.md`, `atlas-part-1-skills.md` (62 chunks) and `atlas-part-2-bank.md` (25 chunks) were re-read in full before any code. Notes are in the scratchpad (`v4/READ-NOTES.md`, 939 lines).
- **Raw skills:** `WEB-SKILLS.md` was reassembled from the seven parts and verified: SHA-256 fe81307b…22b6, 22,368,518 bytes.
- **Bank and skill text** was used as reference data only. Instructions embedded in it were not followed, for example the beacon and telemetry instructions in S0568, S0569 and S0573.
- **Known gap:** `hvac/.../estes.html` is missing from the repo. It is not needed for siding.

## Contents

- What changed, page-wide
- Cursor companion: three variants behind a switcher
- Per-version report (30 rows)
- Behavioural-difference test (S1474 / S1502)
- Tests run on the final build
- Bugs found and fixed during v4
- Weight (F18)
- Flagged, not changed

## What changed, page-wide

| System | What it is | Reference |
|---|---|---|
| **Cursor companion**, three variants | Sash (a double-hung window), Gable (a small house elevation) and Chip (a paint fan-deck chip). Each one idles, blinks, rolls its eyes, does its own small action, and reacts differently to buttons, links, images, headings, cards and drags. It falls asleep after 9 s and steps aside from small targets. | [BANK] small follower with the system cursor kept usable; P10 attribute-state routing; S0489 idle timing; S0546 tap; S0340 hand-spring; S1303 lerp; S0385 one loop that sleeps |
| **Companion switcher** | "Companion: Sash · Gable · Chip · Off". It sits as a mini pill next to "Your picks" and in the picks panel. It is a radiogroup with arrow keys, persisted in localStorage `ap-pal` and in `?pal=`. Off brings back the v3 follower. | owner addendum (2) |
| **Section fields** | One trade motif per section that answers both the cursor and the scroll; one row per section in the next table. | §2.2 of the plan |
| **Dividers** | A different trade profile at every boundary, drawn by the scroll in the colour of the section above; one row per boundary in the next table. When both sides share a colour, the profile takes a shade of it. | R8, S15, S18, R39, Q146 analogue (roof geometry, not blobs: S0659) |
| **Reaction kit** | Thirteen kinds, each with its own hover and a different click: sash, course, nail, drip, shingle, gable, tape, level, chalk, frame, seal, morph (call card) and ring (#348 submit). They are assigned by section and role, so neighbouring sections never repeat. Headings react on approach with a lap underline. | Q78, Q122, Q147, Q163, 372, #348, Shazam, P14 |
| **Motion toggle** | One flag, `html[data-motion]`. The button sits in the header, the phone menu and the footer, and drives the same control as the picks-panel checkbox. It is persisted and defaults to `prefers-reduced-motion`. | [203], Built Kindly / GMX, Anton & Irene #107, S0658 (WCAG 2.2.2) |
| **3D where earned** | Extruded count signs in Proof 1 (12 layers that turn from the pointer); the exploded wall in Built 1 (kept); shingle-tab peel reactions; chip flips in the Colour field. No WebGL. | Q165, S0526, Q122 |

**Section fields**

| Section | Field |
|---|---|
| Hero | Lap-course wavefronts that follow the cursor, with ghost waves when idle |
| Proof | A window grid whose glass sheen follows the cursor |
| Services | Blueprint elevations that turn solid around the cursor |
| Work | A nail schedule whose nails lean to the cursor; the stud lines draw with the scroll |
| Built | An X-ray band that shows the framing under the cream |
| Colour | The 29 published colours as chips that flip up near the cursor |
| Near | Roof plans on lot lines that light near the cursor |
| Reviews | Louvred shutters that open near the cursor and with the scroll |
| Money | A chalk snap line that plucks when crossed, plus tape ticks pulled by the scroll |
| Book | A six-panel door with a lagging porch-light pool |

Without motion, every field holds a designed still frame.

**Dividers, top to bottom**

1. Lap edge
2. Gable roofline
3. Three-tab shingles
4. Board and batten
5. Paint drips
6. Half-round transom
7. K-style gutter with a running bead
8. Fish-scale shakes
9. Dentil moulding
10. Skyline into the footer

## Cursor companion: three variants behind a switcher

All three share one engine and one set of rules:

- **Follow:** lerp `a = 1 − (1 − 0.14)^(dt·60)`. The body leans up to 8°, and the head counter-leans at 0.45 of the lean, 110 ms later.
- **Idle:** blink 110 / 40 / 190 ms every 3 to 4 s; glance 1.3 s every 7.3 s; own tic every 11.9 s; eye roll every 17.1 s. The periods are coprime and seeded.
- **Press:** 0.84 in 0.1 s, then 0.22 s back, pivoting at 21 % 14 %.
- **Off** under any of: touch or coarse pointers; reduced motion; Motion off; the pointer leaving the page; a window blur. The system cursor is never hidden.

| | Sash | Gable | Chip |
|---|---|---|---|
| Blink | the shade drops | the window shades drop | the top chip folds |
| Own tic | the lower sash lifts | the roof tips | the fan spreads |
| Button | the sash rises, opening, glass glint | the door swings open | the middle chip turns brand red and leans |
| Link | half-shade squint | the roof tips toward the link | a red stripe slides under |
| Image | viewfinder brackets | the windows widen | the fan opens |
| Heading | reads along the line | leans in and narrows its eyes | tilts and reads |
| Card | the frame pops | the courses ripple | the chip flips |
| Drag | squash | the roof flattens | the fan closes |

## Per-version report

The cores below are the v3 versions; each was already traced to its reference in `AUDIT-V3.md`. v4 rebuilt none of them. Every version gains its section's field and divider, the reaction kit and the companion.

The verdict column means:
- **ENRICHED:** a new version-specific foreground SVG was added.
- **KEPT:** the version's own SVG drawing already carries the trade idea, so only the page-wide layers were added.

### Hero (field: lap-course wavefronts; buttons sash, links course, cards gable, images frame)

**H1 · Courses — ENRICHED**
- Reference: [BANK] Q38 / R6 blinds, 30 slits, stagger 0.02.
- v4 SVG: each course lands with its own lap shadow line and two nail heads (pop at back.out 1.7); the lines then fade back into the photo.

**H2 · Pick your project — ENRICHED**
- Reference: Stronghold funnel step 1 + Neil Kelly picker.
- v4 SVG:
  - each card carries a technical drawing of its trade, redrawn on hover: lap courses, a double-hung sash, three-tab rows, a brush over boards;
  - step two puts the median band on a tape blade, $0 to $50k, and the band slides when the trade changes.

**H3 · Real work — ENRICHED**
- Reference: Feldco crown 2 + R33.
- v4 SVG: the photo panel is framed as a window casing with head-block rosettes; a glass glint sweeps on each crossfade; the stats are set on lap boards with grain and nails.

### Proof (field: window grid and sheen; buttons nail, links chalk, cards seal)

**P1 · Record — ENRICHED (3D)**
- Reference: #317 band + F12 arithmetic.
- v4 SVG / 3D:
  - extruded count signs (Q165): 12 text-shadow layers turn away from the pointer at lerp 0.14, with a still pose otherwise;
  - 312 + 574 = 886 is set on three nailed boards; the sum is kept as screen-reader text.

**P2 · At a glance — ENRICHED**
- Reference: Georgia Contractor Group table.
- v4 SVG: a blueprint leader with an arrowhead draws from each badge to its credential on row hover or focus.

**P3 · Statement — ENRICHED**
- Reference: S1327 + #292.
- v4 SVG: each photo pill is a casement window whose sash swings open as its word lights (scrub, linear).

### Services (field: blueprint elevations; buttons shingle, links course, cards tape, controls level)

**S1 · Point at it — ENRICHED**
- Reference: Neil Kelly + BLK.
- v4 SVG: picking Windows makes the glass glint (372 Glare); picking Siding sets a spirit level on the courses, and its bubble settles.

**S2 · Index — ENRICHED**
- Reference: Q571 AHA.
- v4 SVG: eleven trade glyphs, defined once as `<symbol>`, redraw on row hover; the row band grows from the edge the pointer came in through (K72).

**S3 · Tape measure — ENRICHED**
- Reference: Codrops timeline + R38.
- v4 SVG: a tape case sits over the reading line, and the blade's end hook kicks when the value hits $0 or $50k.

### Work (field: nail schedule; buttons sash, links chalk, cards gable, controls level)

**W1 · Drag — ENRICHED**
- Reference: R28, Austin Pro price-banded pairs.
- v4 SVG: the divider is a corner-trim board with nails, and a spirit level on the handle reads the drag speed.

**W2 · Blueprint — KEPT**
- Reference: S0468.
- No new foreground: the traced drawing is the SVG.

**W3 · Lens — ENRICHED**
- Reference: S1324 + 125 square lens.
- v4 change: the lens is a square window pane with a muntin cross and a glint.

### Built (field: X-ray framing band; buttons nail, links course, cards shingle, controls tape)

**B1 · Taken apart — KEPT**
- Reference: S0526 / S0504.
- The exploded iso wall is the 3D moment; the X-ray field shows the framing behind it.

**B2 · Built for Texas — ENRICHED**
- Reference: S1322 / R45 sticky stack.
- v4 SVG: each card carries a test diagram that draws as the card arrives:
  - a sun over a true board;
  - water beading off;
  - a flame stopped at the board;
  - a termite trail blocked;
  - a 30-year rule.

**B3 · To the inch — KEPT**
- Reference: S0361 / S1361.
- The dimensioned section and the lap ↔ batten morph already carry it.

### Colour (field: chip field; buttons drip, links course, cards drip, controls level)

**C1 · Dock — ENRICHED**
- Reference: R36 / BLK.
- v4 SVG: a fan deck shows the picked colour with its neighbours in the same range, and spreads on hover or focus.

**C2 · Paint or ColorPlus — ENRICHED**
- Reference: R30 table.
- v4 SVG: column-head diagrams, a roller on lap boards versus a board through the bake oven; a pick replays its column's diagram.

**C3 · Colour book — ENRICHED**
- Reference: R10 grid-to-fullscreen.
- v4 SVG: the tiles are punched fan-deck chips, and the open sheet shows three lap courses painted in the colour.

### Near (field: roof plans on lots; buttons shingle, links chalk, cards gable, controls tape)

**N1 · Survey — ENRICHED**
- Reference: the Austin Pro project map.
- v4 SVG: a surveyor's crosshair reads the straight-line miles to the office on the firm's own map scale (8.3 px per mile).

**N2 · Town by town — ENRICHED**
- Reference: West Shore matrix.
- v4 SVG: an opened row raises a skyline of small houses, one per ten documented jobs (Austin 541, so 54 houses).

**N3 · Neighbourhood drive — KEPT**
- Reference: KBF Neighborhood Drive.
- The fly-in map carries it.

### Reviews (field: louvred shutters; buttons nail, links course, cards shingle)

**R1 · Stream — ENRICHED**
- Reference: Q161 / R16 marquee.
- v4 SVG: each card hangs as a cedar shake with a ragged butt and two nails.

**R2 · One — ENRICHED**
- Reference: R29.
- v4 SVG: the quote sits in a sash casing; between quotes a glass lower sash lifts over the old one and drops from the new one.

**R3 · Names — ENRICHED**
- Reference: #321 / R27.
- v4 SVG: the crew names are paint chips, and filtered cards land nailed at the corners.

### Money (field: chalk line and tape ticks; buttons sash, links chalk, cards tape, controls level)

**M1 · Amount — ENRICHED**
- Reference: the Austin Pro worked financing example.
- v4 SVG: a spirit level under the slider; its bubble rides the amount along the vial.

**M2 · What people paid — ENRICHED**
- Reference: F7e distribution.
- v4 SVG: the price-band bars are boards (grain, side shadow, nails), and the median band carries a chalk tick.

**M3 · Receipt — ENRICHED**
- Reference: R24.
- v4 SVG: the receipt is perforated, and a "Paid in full · cash · check · ACH, −10%" stamp lands when that box is ticked. The stamp is never rotated (builder brief §6).

### Book (field: door and porch light; buttons ring, links course, call link morph)

**K1 · Call — ENRICHED**
- Reference: Rogers + S1364.
- v4 SVG: the giant number sits on a raised door panel; clicking the call link morphs out a phone card with the hours (Shazam overshoot), and the link still dials.

**K2 · Form — ENRICHED**
- Reference: Mad City.
- v4 SVG: the three steps are three window panes; done panes glaze and the current pane is outlined; the submit draws the #348 ring, then a check or a cross from the form's real state.

**K3 · One sentence — ENRICHED**
- Reference: Q413 Tequila.
- v4 SVG: each blank hangs as a slack chalk line that snaps taut with a pluck when filled.

**Totals:** 25 enriched, 5 kept, 0 rebuilt.

**Facts:** every figure added in v4 comes from `FACTS.md`. The new ones are:
- 312 + 574 = 886;
- the median-band position on the tape;
- one house per ten documented jobs;
- miles computed from the firm's published map scale;
- the 29 published colours;
- the published discounts;
- the 30-year Hardie warranty.

Before use, the bank-quoted Austin Pro numbers were checked against `FACTS.md`: 415 priced jobs, median $10k–$15k, $181.91 a month, 312 + 574, 177 pairs and the showcase band. All match.

## Behavioural-difference test (S1474 / S1502)

The criteria were fixed before comparing: unit of interaction, entry point, sequence, commitment point, signature move and layout grammar. A pass needs at least 4 of 6 differences.

v4 adds layers but changes no version's core, so every pair still differs as recorded in AUDIT-V3. The pairs that share a v4 layer do so only through the page-wide field, divider, kit and companion; their version-specific SVGs differ (see the table above).

## Tests run on the final build

| Test | Result |
|---|---|
| v4 QA suite (`qa4.js`): all 30 versions at 1440 | 155 of 155 pass, over http and from the single file on disk |
| v3 interaction suite (`ix4.js`), 1440 and 375 | all pass, no console errors, from disk |
| Companion life | a blink was seen within 5 s; asleep (shades down) after 9 s still; awake on the next move; the loop runs 0 frames in 2 s once settled; the hero's ghost waves are the one ambient loop, with its work capped at 30 fps and pausable from the Motion toggle |
| Em / en dashes in visible copy | 0 |

**What `qa4.js` checks at 1440, in every version:**
- the companion (cycling through all three) is on and inside the viewport;
- the system cursor stays visible;
- the section field and divider are present;
- the first interactive element gets its reaction on hover;
- the companion covers less than 25 % of the hovered target.

**And once per page:**
- the switchers work by click and by arrow key;
- the choice persists;
- "Off" brings back the v3 follower;
- the Motion toggle sets the flag, removes the companion and the reactions, and keeps the still fields;
- the companion hides when the pointer leaves the page.

**At 375 and 320 with touch:** no companion, no horizontal scroll.

**With reduced motion:** no companion, no reactions, 10 still fields, 9 dividers, flag set, button pressed false.

## Bugs found and fixed during v4

- **Class clashes.** v3 already used `.bgf` (depth figures) and `.dv-*` (Near 3). The v4 layers became `.sfx` and `.sdv`, and the v3 `has-bgf` stacking rule now exempts them.
- **Invisible dividers.** A divider vanished when the sections on both sides share a colour; it now takes a shade.
- **Loop that never slept, with no visible symptom.**
  - The 30 fps throttle answered "busy" on every skipped frame.
  - Several fields stayed busy whenever they were on screen.
  - The Built X-ray treated a still pointer as movement.

  All three fixed; the loop now stops.
- **Companion never fell asleep.** The check lived inside the loop, so it never ran once the loop stopped; it is now on a timer.
- **Undefined path on blur.** The gable reaction could exit before its entrance and write an undefined path.
- **Empty GSAP targets.** Pre-setting a reaction's start state on an empty selection logged a GSAP warning; it is now guarded.
- **Layout problems.**
  - The Reviews 2 sash design drew a rail through the quote; it was redesigned as a lifting glass sash.
  - The Money 3 stamp covered the total; it moved to its own space.
  - The Money chalk line crossed the heading; it moved to the foot of the section.
  - The Near roof plans were too busy behind the table; they were halved.

## Weight (F18)

| | v3 | v4 |
|---|---|---|
| `site/index.html` (built page, all 30 versions in templates) | 351 KB | 430 KB |
| `homepage-standalone.html` | 4,170,193 B | 4,339,867 B |
| Libraries | GSAP core, ScrollTrigger, DrawSVG, MorphSVG, Draggable, Inertia, CustomEase, Lenis | unchanged: v4 added no library, only `v4.js`, which is minified when packed |

## Flagged, not changed

1. **886 is not "312 siding + 574 roofing".** The brief says so; the firm's page says 312 documented projects with photos on the map plus 574 more counted outside the frame or without photos. Siding is 431 documented; shingle roofing 210 and metal roofing 31. The page prints the firm's meaning.
2. **No licence number in the first screen (F11).** None is published, and Texas has none for this work.
3. **F17 trade motion ceiling vs the strict standard.** The companion, fields and reactions go beyond what top trade sites run. This is portfolio tier (builder brief Tier 3). Everything is pausable from the visible Motion toggle (WCAG 2.2.2), off under reduced motion and on touch, and the loop sleeps when idle.
4. **S1320 / S0650 / S1301 ("no model-drawn illustration or hand-drawn icons") vs the owner's custom-SVG rule.** The owner wins. Every SVG is a trade diagram, profile or motif (lap courses, sashes, shakes, chalk lines, levels, tapes), not pictorial illustration.
5. **S0213 / S0617 ("no custom cursors").** The companion is additive: the system cursor stays, and the companion is off on touch, under reduced motion and with Motion off.
6. **S1427 similarity vs a different reaction per element.** The base shape and colour family stay per role; only the reaction motif varies by section.
7. **S0544 (no sustained wobble) vs companion idle life.** Idle is in-drawing life (blink, glance, breath, one small tic), never layout wobble; reactions use back.out at most 1.7, and no element bounces or springs back elastically.
8. **The hero's ghost waves** are the page's one perpetual ambient loop while the hero is in view. They stop with the Motion toggle.

## Skills applied

S0489, S0546, S0340, S0385, S1303, S1315, S1319, S0425, S0504, S0526, S0267, S0544, S0658, S1335, Q38/R6, Q78, Q122, Q138, Q146, Q147, Q156, Q163, Q165, P10, P70, P79, 372, #348, Shazam, specia1ne, R8, R10, R16, R24, R28, R29, R30, R36, R38, R45.
