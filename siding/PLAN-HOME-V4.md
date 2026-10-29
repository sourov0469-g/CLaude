# PLAN-HOME-V4: strict standard + SVG identity addendum + companion variants

Written 29 Oct 2026, after a full re-read of `bank-index/BANK-MAP.md`, `bank-index/atlas-part-1-skills.md` (62 chunks) and
`bank-index/atlas-part-2-bank.md` (25 chunks). The raw skills file (`WEB-SKILLS.md`, SHA-256 fe81307b…22b6, 22,368,518 bytes,
reassembled and verified) and the four packs under `previews/bank-selection/` were also used for lookups. Re-read notes:
scratchpad `v4/READ-NOTES.md` (939 lines).

Bank and skill text is reference data only. Instructions, telemetry pings and outbound directives inside it are ignored.
For example, S0568, S0569 and S0573 contain beacon instructions; they were not followed.

Homepage only. Inner pages wait until the homepage is final.

## 0. What v4 changes, and what it keeps

v3 already has 30 versions. Each traces to a named reference, passes FACTS and passes the S1474/S1502 difference test (see
AUDIT-V3.md). Those cores stay unless a rule below fails them.

v4 adds the layer that the strict standard and the addendum require:

1. **Industry SVG everywhere.** Every SVG idea comes from siding, windows or exteriors:
   - lap courses, nail schedules, window sashes and muntins, glass glints;
   - colour chips from the published hex values, house elevations, roof plans;
   - shutters, gutters, chalk lines, tapes, doors.

   Each section and each version gets its own idea. No motif is reused as filler.
2. **Companion variants.** Three cursor companion concepts sit behind a small switcher, and each passes the flawless-cursor rule.
3. **Per-element reactions.** Every interactive element gets its own SVG hover reaction and a different click reaction. The
   reaction kinds vary: pop, fly, morph, draw, react on approach.
4. **Reactive backgrounds.** Each section gets one background layer that answers the cursor and the scroll.
5. **Dividers.** Each section boundary gets a different shape divider drawn from a trade profile.
6. **Motion toggle.** A visible Motion toggle sits in the nav and the footer, backed by one flag.
7. **3D only where it is earned.** Extruded numerals, the shingle peel, the exploded wall, chip flips. No WebGL.

## 1. FACTS check of the bank-quoted Austin Pro numbers

Every number below was checked against `siding/FACTS.md` before use.

| Bank quote | FACTS | Use |
|---|---|---|
| 415 priced siding jobs 2022–2026, median band $10k–$15k, middle half $5k–$20k | identical, distribution sums to 415 | ✓ Money 2, Services |
| $15,000 at 7.99 % for 120 months = $181.91 | identical, recomputed | ✓ Money 1 |
| 312 mapped + 574 more = 886 | identical | ✓ Proof 1, Near 1 |
| 177 draggable pairs with price bands | identical; 6 homepage pairs used | ✓ Work |
| Showcase siding portion $25k–$30k | Village At Western Oaks, Aug 2026 | ✓ Work 1 |
| Hardie Elite Preferred + President's Club 2025 | identical | ✓ |
| tel: ×7 | not a fact about the firm; a source-pass count | not printed |
| Licence number in the first screen (F11) | none published | not printed, flagged |

**886 split flag.** The brief describes 886 as "312 siding + 574 roofing". FACTS says something different:
- 312 are the documented projects shown on the map with photos.
- 574 are "counted but outside this frame, no recorded location or no photos yet".
- Siding is 431 documented, shingle roofing 210 and metal roofing 31.

The build prints the firm's own meaning.

## 2. Global systems

### 2.1 Cursor companion: three variants behind a switcher

**References**
- [BANK] "Cursor: small follower, system cursor kept usable" (STRONG standing rule). The companion is additive and never hides
  the system cursor.
- P10 attribute-state follower (STRONG): the reactions are routed by element type and data attributes.
- S0489 rossark-motion (idle life):
  - blink every 3–4 s: close 110 ms, hold 40 ms, reopen 190 ms;
  - glance travels 500 ms and holds at least 1 s;
  - breathing of 1–2 units over 3–5 s;
  - follow-through by delay of 60–150 ms at 0.3–0.6 strength;
  - travel curve (.77,0,.175,1), arrive curve (.23,1,.32,1).
- S0546 oversized-cursor tap: scale 0.84 in 0.1 s power2.in, release 0.22 s power2.out, pivot near the tip.
- S0340 feel: a hand-spring body that lags and settles, in one loop that sleeps.
- S1303: lerp `current += (target − current) · a`, made frame-rate independent with `a = 1 − (1 − 0.12)^(dt·60)`.
- S0385 / S1315 / S1319 cost discipline:
  - one shared rAF that sleeps when settled;
  - paused when the tab is hidden or the window blurs;
  - dt clamp 1/30.
- S0357: same anchors and scale in every pose; key poses first; the silhouette reads at small size.
- Q164-style named pose presets: one preset per state, and every parameter retargets together (Andrew Reff #381 state machine).
- Seeded timing: idle tics run on coprime periods (7.3 s / 11.9 s / 17.1 s), so the loop never visibly repeats (Shruti #395).

**Variants.** All three are SVG at 46 × 46, drawn with the page's own ink, one accent and the cream. They sit at a +24 / +22
offset from the pointer.

| | A · Sash | B · Gable | C · Chip |
|---|---|---|---|
| Concept | A double-hung window: the upper sash panes are the eyes, the lower sash is the mouth | A small house elevation: gable roof, two windows as eyes, door as mouth, lap courses as body | A paint fan-deck chip of three published colours (SW 7005 Pure White, SW 7048 Urbane Bronze, SW 6258 Tricorn Black); eyes on the top chip |
| Blink | The shade drops over the panes (110 / 40 / 190 ms) | The window shades drop | The top chip folds shut |
| Eye roll (idle tic) | The glints circle once around the panes | The pupils circle | The pupils circle and the chips riffle |
| Own idle tic | The lower sash lifts 3 units and settles ("breath") | The roof tips 4° like a hat | The fan spreads 12° and closes |
| Button | The lower sash rises: mouth opens, glass glint | The door swings open | The chip dips into brand red |
| Link | Half-shade squint; pupils point at the link | Roof tips toward the link | A stripe slides under the chip |
| Image | The mullions become viewfinder brackets | The windows widen | The fan opens to three chips |
| Heading | Reads: pupils track along the line | Leans in, eyes narrow, reads | Reads; a chip tilts |
| Card | The frame pops +8 % (back.out 1.5) | The courses ripple | The chip flips (rotateY) |
| Drag / slider | Squash, eyes on the drag direction | Squash, roof flattens | Squash, fan closes |
| Press | S0546 tap 0.84 / 0.22 | same | same |
| Asleep after 9 s still | Shade fully down, slow breath | Shades down, slow breath | Chip folded, slow breath |

**Shared engine**
- One state machine with named pose presets per variant.
- Gaze has two inputs, (a) pointer velocity and (b) the reaction target's centre. Pupils are clamped to the eye.
- The body leans up to 8° from velocity, and the head counter-leans by −0.45 × the lean 110 ms earlier.
- Section tone is read from `[data-tone]`. On dark sections the companion swaps to the light stroke set.

**Flawless-cursor rule**
- `pointer-events: none`, `aria-hidden="true"`, never `inert`-sensitive, never covers the focus ring. Size 46 px, offset
  down-right.
- Hidden on coarse pointers, on `(hover: none)`, under reduced motion, when the Motion toggle is off, when the pointer leaves
  the window, and when the switcher is set to Off.
- Re-shown on the next fine-pointer move.
- No teleport: the first appearance glides from the pointer itself.
- When a section changes, the target re-seeds so it never streaks across the page (S1333).
- Clamped to the viewport.
- Tested at 1440 and 375 (at 375 the touch emulation must show nothing and log no errors), and under reduced motion.

**Switcher.** A pill reading "Companion: Sash · Gable · Chip · Off", built as a radiogroup.
- It sits in the picks panel and as a mini pill in the header utility row.
- It persists in localStorage `ap-pal` and in `?pal=`.
- Keys: none, to avoid clashing with the 1/2/3 section keys.

### 2.2 Per-section cursor field + reactive background (one per section, all different)

All layers follow the same rules:
- `aria-hidden`, `pointer-events: none`.
- One shared loop (§2.1), IntersectionObserver-gated, ambient work capped at 30 fps, DPR not relevant (SVG).
- Motion off or reduced motion gives a designed still frame.
- Touch: the scroll reaction stays and the cursor reaction is off.

| Section | Background motif (industry) | Cursor reaction | Scroll reaction | Reference |
|---|---|---|---|---|
| Hero | 22 lap-course shadow lines (7 in exposure scaled) | Courses lift near the cursor as wavefronts expand from the cursor path; ghost waves every 1.5 s after 3 s idle | Courses slide horizontally, alternating rates | Q138 wave field (speed 6, width 3, fade e^(−age/2)) re-cut to lap lines |
| Proof | A large double-hung window grid (muntins) with a glass sheen band | The sheen angle and position follow the cursor | Sheen sweeps with progress | 372 Glare Hover (−45°, 30 %, softness .6, screen) |
| Services | Three dashed blueprint house elevations | A radial reveal turns the dashed wireframe solid around the cursor (scan-then-solid) | Elevations drift at 0.6× | S1335 wireframe scan reveal |
| Work | Nail schedule: nail heads on 16 in on-centre stud lines | Nail heads lean toward the cursor (roam 15–60 px, lerp .07) | Stud lines draw with scroll (scrub, linear) | P79 grid field + Q156 roam + S18 hairlines |
| Built | Hidden framing layer (studs, sheathing seams, housewrap print) under the cream | X-ray band 7 rem follows the cursor (lerp .12, settles after 680 ms) and shows the framing | Band parks at the centre; framing parallax | specia1ne reveal slit |
| Colour | Chip field of the 29 published colours | Chips within 140 px flip up (rotateX) to show colour (falloff 1−d/r, eased) | The field slides one row per 30 % of progress | P70 variable proximity (falloff + damping) |
| Near | Roof-plan lots: small hip and gable roof plans on lot lines | Lots within 120 px light, and their ridge lines draw | The grid pans diagonally | S0425 hairline emblem (answers the pointer, rest pose is the thumbnail) |
| Reviews | Louvred shutter panels at both edges | Slats rotate open near the cursor (light through) | Slats open progressively with scroll | Q122 peel hinge (perspective 550) on slats |
| Money | Chalk snap line across the section + tape ticks on both margins | The chalk line plucks when the cursor crosses it (spring chain sp=−off·.12, vel=(vel+sp)·.65) | Tape ticks scroll by (tape pulled out) | Q163 Trionn pluck |
| Book | Six-panel door moulding, large and faint, and a porch-light pool | The light pool trails the cursor by 0.3–0.5 s | The door opens up to 8° (perspective 900) with progress | S0267 light pool |

### 2.3 Shape dividers (one per boundary, all different, all trade profiles)

Rules for every divider:
- Inline SVG, `aria-hidden`.
- It draws or morphs once with scroll (scrub, linear ease: parameter-library law). Final state without JS.
- Paired paths keep identical command structure (R8 fix rule).
- The last divider ends at "bottom bottom".

| Boundary | Profile | Motion | Reference |
|---|---|---|---|
| Hero → Proof | Lap siding edge: stepped courses with drip shadow | The steps slide out one course at a time | R8 morphing separator |
| Proof → Services | Gable roofline (same 5 points) | Pitch morphs from 4/12 to 10/12 with scroll | Q146 analogue, roof geometry not blobs (S0659) |
| Services → Work | Three-tab shingle row | Tabs drop in, staggered | S15 strips family |
| Work → Built | Board-and-batten profile | Battens rise, staggered by 0.02 | R6 slit stagger |
| Built → Colour | Paint drips off a drip-edge line | Drip lengths grow with scroll | Q53 edge reshapes with scroll |
| Colour → Near | Half-round transom with muntin rays | The rays draw (DrawSVG) | S18 hairlines |
| Near → Reviews | K-style gutter profile and downspout | A water bead runs along the gutter to the downspout (MotionPath) | R39 route divider, one per page |
| Reviews → Money | Fish-scale (scalloped) shake edge | The scallops pop in from the centre out | Q156 centre-out bloom |
| Money → Book | Dentil moulding under a fascia | The dentils fill left to right | S42 progress ladder |
| Book → Footer | Ridge-line skyline of house elevations | The skyline draws and the windows light | S1340 rising line |

### 2.4 Reaction kit: an own hover + a different click for every interactive element

**Base:** a shared affordance base per role (S1427: same shape and colour family per role). Only the reaction motif varies, and
each motif carries a trade meaning (S1306: every layer has a job).

**Mechanics**
- The SVG overlay is injected once per element, `aria-hidden`.
- Hover-in ≤ 250 ms, hover-out may be longer, overshoot only on entrances (S0410).
- Click reacts on the same frame as the press (S1440). Back.out 1.4–1.7 is allowed; no bounce or elastic (S0544).
- Under reduced motion or Motion off, the kit is not injected. Plain CSS states remain.

| Kind | Hover (own) | Click (different) | Motion kind | Reference |
|---|---|---|---|---|
| sash | A sash line rises inside the button (draw) | Glass glint sweeps + press 0.97 | draw / sweep | 372 Glare, S0546 press |
| course | A lap board underline draws left to right with its shadow line | The board drops one course and a nail pops in | draw / fly | Q78 Kukuri (.7,0,.3,1) |
| nail | Nail heads pop at four corners (back.out 1.5) | Nails drive (squash) and six wood chips burst, capped | pop / fly | S30 burst, capped to 6 |
| drip | A paint drip grows from the top edge (morph) | The drop falls and a splash ring draws | morph / fly | Q151 bulge, S16 morph |
| shingle | A tab peels at the corner 15° → 40° (perspective 550) | The shingle flips 180° (rotateX 0.4 s) | 3D peel / flip | Q122, [201] flip |
| gable | The card top morphs into the gable chevron (300 ms) | A ridge line draws and the roof pops up | morph / draw | Q147 demo 3 paths (S51) |
| tape | Tape ticks draw along the bottom edge (stagger .02) | The tape retracts, snapping back | draw / fly | R38 tape family |
| level | A bubble level fades in and the bubble centres | The bubble hops (back.out 1.6) | approach / pop | S0340 detent |
| chalk | A chalk line stretches across | It plucks (spring) and leaves chalk dust | react on approach / spring | Q163 pluck |
| frame | A window frame draws around the image, plus mullions | The panes flash in sequence (sash reveal) | draw / sequence | S18 + S15 |
| seal | A wax-seal ring draws around a badge | The seal stamps (scale 1.2 → 1) | draw / pop | P14 stamp |
| morph | The call button's outline bulges | The button morphs into a phone card (overshoot (.8,−.6,.2,1) 400 ms) | morph | Shazam |
| ring | The submit pill's outline glows | The pill becomes a circle, the ring draws to real progress, then a check | morph / draw | #348 Circular Progress (r 32.5, stroke 5) |

**Assignment by section and role.** The kinds are chosen so neighbouring sections never repeat a pair.

| Section | Buttons | Links | Cards / options | Images | Controls |
|---|---|---|---|---|---|
| Hero | sash | course | gable | frame | — |
| Proof | nail | chalk | seal | frame | — |
| Services | shingle | course | tape | frame | level |
| Work | sash | chalk | gable | frame | level |
| Built | nail | course | shingle | — | tape |
| Colour | drip | course | drip | frame | level |
| Near | shingle | chalk | gable | frame | tape |
| Reviews | nail | course | shingle | — | level |
| Money | sash | chalk | tape | — | level |
| Book | morph (call), ring (submit) | course | gable | frame | — |

Headings everywhere react on approach: the existing weight-axis swell (S0184/P70), plus a lap underline that lifts within 140 px.

### 2.5 Motion toggle

- References: Built Kindly / GMX reduce-motion in nav + footer, Andrew Reff, [203] persisted toggle, S0658 (WCAG 2.2.2: anything
  running over 5 s needs a pause).
- A button labelled "Motion on" or "Motion off" sits in the header utility row and in the footer. It is the same control as
  the picks-panel checkbox.
- One flag, `<html data-motion="reduced">`, is read by CSS and by JS (Anton & Irene #107 single-flag pattern).
- It is persisted, and defaults to `prefers-reduced-motion`.
- Off stops: the companion (hidden), ambient fields (still frame), reactions (plain CSS), Lenis, the marquee and the crossfade.

### 2.6 3D, only where it is earned

| Where | What | Why it earns it | Reference |
|---|---|---|---|
| Proof 1 | Extruded "4.9 · 474 · 886" numerals, 12 stacked layers (not 34, for weight); tilt to pointer lerp .14; still pose under reduced motion | The three checkable numbers are the proof; depth makes them a sign | Q165 Depth Text |
| Built 1 | Exploded iso wall assembly (kept) | The trade object, explained | S0526, S0504 |
| Shingle reactions + Reviews shutters | Peel and slat hinges | Trade-native hinge, not decoration | Q122 |
| Colour field chips | rotateX flip | A chip turning over to show its colour | P70 + flip |

No WebGL anywhere (F17 and the builder brief Tier rules; the R32/R34/R35 caps).

## 3. Per-version plan

Each row gives: the reference (kept from v3, see AUDIT-V3), the v4 foreground SVG idea, and its parameters. The SVG ideas are
unique across the page.

### Hero

**H1 Courses**
- Reference: [BANK] Q38 / R6 blinds, 30 slits, stagger .02.
- v4 SVG: each slit is a lap board with its own shadow line, and nail heads pop as each course lands (S30 burst, capped at 2 per
  course).
- Parameters: reveal ≈ 1.2 s, once.

**H2 Pick your project**
- Reference: Stronghold funnel step 1 + Neil Kelly picker.
- v4 SVG: each trade card carries its own trade drawing, drawn on hover:
  - siding: three courses with a corner trim;
  - windows: a double-hung sash;
  - shingle roofing: a three-tab row;
  - painting: a brush stroke over lap boards.

  Step two shows the median band on a mini tape.
- Parameters: DrawSVG 0.25 s, stagger .02.

**H3 Real work**
- Reference: Feldco crown 2 + R33.
- v4 SVG: the photo panel is framed as a window (frame, muntins, sill); a glass glint sweeps on every crossfade; the stat band
  sits on lap boards.
- Parameters: crossfade 0.8 s every 5 s, glint .65 s.

### Proof

**P1 Record**
- Reference: #317 band + F12 arithmetic.
- v4 SVG / 3D: depth numerals (Q165) and the 312 + 574 = 886 equation set on three boards hung on nails.
- Parameters: count-up 1.4 s power2.out (one tempo).

**P2 At a glance**
- Reference: Georgia Contractor Group table.
- v4 SVG: blueprint callout leaders, dimension-style with arrowheads, run from each badge to its row text; hovering a row draws
  its leader.
- Parameters: draw .25 s.

**P3 Statement**
- Reference: S1327 scrub word reveal + #292.
- v4 SVG: each inline photo pill is framed as a small casement window; its sash opens as its word lights.
- Parameters: scrub linear.

### Services

**S1 Point at it**
- Reference: Neil Kelly + BLK zones (kept).
- v4 SVG: a glass glint on the pointed window parts, and a level bubble on the lap parts.

**S2 Index**
- Reference: Q571 AHA (CSS counters).
- v4 SVG: eleven trade glyphs (technical line drawings, one per trade, kept in `<symbol>`) draw on row hover; the row hover band
  is K72 edge-aware.
- Parameters: .6 expo.

**S3 Tape measure**
- Reference: Codrops timeline + R38 (kept).
- v4 SVG: the tape body gets a case with a hook, and the hook bends at the ends of the drag.

### Work

**W1 Drag**
- Reference: R28 / Austin Pro price-banded pairs.
- v4 SVG: the divider is a corner-trim board with a sash-pull handle; a level bubble rides the handle and tilts with drag
  velocity.

**W2 Blueprint**
- Reference: S0468 (kept).
- v4 SVG: none new; the drawing is the SVG.

**W3 Lens**
- Reference: S1324 + 125 square lens.
- v4 change: the lens becomes a square window pane with a muntin cross (pointerEase .1 lag).

### Built

**B1 Taken apart**
- Reference: S0526 / S0504 (kept).
- v4: the X-ray background ties to this view.

**B2 Built for Texas**
- Reference: S1322 / R45 sticky stack.
- v4 SVG: each card carries its test diagram:
  - doesn't warp: sun rays over a straight board;
  - doesn't rot: water beads running off;
  - doesn't burn: a flame line stopping at the board;
  - doesn't feed termites: a termite path blocked;
  - lasts decades: a 30-year ruler.

**B3 To the inch**
- Reference: S0361 / S1361 (kept); MorphSVG lap ↔ batten.

### Colour

**C1 Dock**
- Reference: R36 / BLK (kept).
- v4 SVG: the colour picker is a fan deck, and the chips spread on hover.

**C2 Paint or ColorPlus**
- Reference: R30 table.
- v4 SVG: column-head diagrams:
  - a brush and a roller on lap boards ("painted on site");
  - a board on a conveyor through a baking oven ("factory-baked").

**C3 Colour book**
- Reference: R10 grid-to-fullscreen.
- v4 SVG: the tiles are fan-deck chips with a punch hole; the open sheet shows three lap courses painted in the colour, with
  their shadow lines.

### Near

**N1 Survey**
- Reference: Austin Pro map (kept).
- v4 SVG: a surveyor crosshair readout.

**N2 Town by town**
- Reference: West Shore matrix.
- v4 SVG: each town row gets a skyline of small house elevations, one house per 10 documented jobs (data-true), drawn on
  open.

**N3 Neighbourhood drive**
- Reference: KBF (kept).

### Reviews

**R1 Stream**
- Reference: Q161 / R16 marquee.
- v4 SVG: each card hangs as a cedar shake, with a scalloped top edge and two nails.

**R2 One**
- Reference: R29.
- v4 SVG: the quote sits in a sash frame; between quotes the lower sash rises and falls (0.4 s).

**R3 Names**
- Reference: #321 / R27.
- v4 SVG: the crew pills are paint chips, and the filtered cards land with nail corners.

### Money

**M1 Amount**
- Reference: Austin Pro worked financing example.
- v4 SVG: the amount slider is a spirit level whose bubble rides the value; the odometer is kept.

**M2 What people paid**
- Reference: F7e distribution.
- v4 SVG: the bars are lap boards (shadow line, nail heads at the ends) and the median board is marked with a chalk tick.

**M3 Receipt**
- Reference: R24.
- v4 SVG: a perforated tear edge and a "Paid in full" stamp ring that stamps when that option is picked.

### Book

**K1 Call**
- Reference: Rogers + S1364.
- v4 SVG: the giant phone sits on a door panel; the call button morph-reacts into a phone card (Shazam).

**K2 Form**
- Reference: Mad City.
- v4 SVG: the three steps are three window panes; each pane's glass fills as its step completes; the submit uses the #348
  ring.

**K3 One sentence**
- Reference: Q413 Tequila.
- v4 SVG: the blanks are chalk lines that snap taut when filled (Q163).

## 4. Behavioural-difference test (S1474 / S1502; criteria fixed before comparing, S1472)

The criteria are:
- unit of interaction;
- entry point;
- sequence;
- commitment point;
- signature move;
- layout grammar.

A pass needs a difference on at least 4 of 6 between every pair in a section. The v3 table already passes all 10 sections; v4
only adds layers, so the test is re-run in QA on the final build. The pairs most at risk are Built 1 and Built 3 (both
drawings) and Hero 2 and Services 1 (both end in a median band). Both pairs keep different units of interaction (explode vs
morph; photo card vs pointing at a drawing), different entry points and different signature moves.

## 5. Laws and gates for the build

- **F17:** reveal motion 0.15–0.3 s for CSS states; ONE signature interactive (Work); no loaders.
  - The owner's ambient fields and companion exceed the trade motion ceiling by design (a portfolio piece, Tier 3 per the
    builder brief). They stay user-pausable, Motion-toggle-off-able and RM-still. This is flagged.
- **F18:** no new libraries. All SVG is inline and lean, with `<symbol>`/`<use>` reuse and unique IDs per version
  instance (S1020).
- No em or en dashes in page copy. Every number comes from FACTS. Logos as served, never redrawn.
- No horizontal scroll at 320. `tel:+15125500000`. Schema 4.9 / 474 matches the visible text.
- Commit after each section. Append picks to the BANK-MAP usage log.

## 6. Tensions to flag in the report

1. **S1320 / S0650 / S1301 vs custom SVG:** the owner wins. All SVG is a trade diagram or motif, not pictorial illustration.
2. **S0213 / S0617 "no custom cursors":** the companion is additive. The system cursor stays, and the companion is off on touch,
   under RM and with Motion off.
3. **S1427 similarity vs per-element reactions:** the base shape and colour family stay per role; only the reaction motif
   varies.
4. **F17 trade ceiling vs the strict standard's motion density:** portfolio tier, with a pause control.
5. **S0544 no sustained wobble vs companion idle:** idle is in-drawing life (blink, glance, breath), never layout wobble.
6. **The 886 split** (section 1).
7. **No licence number** (F11).
