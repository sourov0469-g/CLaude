# PROGRESS — Elbaz Construction homepage, FULL BUILD

Governing brief: the FULL BUILD PROMPT (remodeling), §1–§14. This file holds state, decisions, the conflicts log, open issues and the §12 gate evidence. It is updated at every phase and every section commit. Failures stay visible here; nothing is marked kept, rebuilt or done without evidence.

Branch: `claude/fervent-planck-6tl8eq`. Deliverable: `remodeling/site/elbaz-homepage.html` (one self-contained file). Source: `remodeling/src/` (build: `python3 remodeling/src/build.py`).

---

## Phase 0 — setup (evidence)

| Item | Evidence |
|---|---|
| Base branch merged | `git fetch origin claude/hrm-presentation-slides-xag1ax && git merge origin/claude/hrm-presentation-slides-xag1ax` → "Already up to date." (merged earlier at c133890; nothing new upstream) |
| Raw skills reassembled + verified | `cat bank-index/web-skills-raw/part-0* \| sha256sum` → `fe81307bc11935af8dc54870325aaccf917a0284d9ffeab6b7d833dec36d22b6` = the manifest SHA-256. Match. |
| Shortlist source | `bank-index/BANK-MAP.md` front matter + Section Playbooks 1–10 + Mechanism Families Index; Atlas entries opened only for shortlisted IDs (listed per version in TRACEABILITY.md) |
| estes.html | Not looked for (does not exist, per brief). |
| FACTS.md read | `remodeling/FACTS.md` read in full (159 lines). |

### Licence string (copied verbatim from remodeling/FACTS.md line 41)

- Credential: `Florida Certified Building Contractor, licence CBC1265280`
- Printed form: `Licensed, bonded & insured · CBC1265280`
- Token every on-page licence mention must carry, character for character: `CBC1265280`

### Reviews (locked, §3)

`4.8 stars, 343 Google reviews`. Aggregate-led ONLY. No individual review quotes exist for this build; none may be invented or shown. Link: `https://www.google.com/maps?cid=17916885921843924422`.

### Baseline (weight cap and per-section state)

| File | Bytes | Role |
|---|---|---|
| `remodeling/site/elbaz-homepage.html` at **b07f0b8** (current) | **3,874,583** | **The weight cap.** The brief's "current (baseline) size". |
| `remodeling/site/elbaz-homepage.html` at 68f8ff5 | 3,973,574 | The file the owner reviewed (his verdict in §3B was given on this one). |

Current split (b07f0b8): image store 3.07 MB (36 WebP photos), fonts 0.06 MB, code ≈0.74 MB.

Screenshots of every section × version at both widths (contact sheets, rows = sections, columns = v1 v2 v3):
- Owner-reviewed file: `remodeling/qa/baseline-old-68f8ff5-1440.jpg`, `remodeling/qa/baseline-old-68f8ff5-375.jpg`
- Current file: `remodeling/qa/baseline-current-b07f0b8-1440.jpg`, `remodeling/qa/baseline-current-b07f0b8-375.jpg`
- Tooling: `remodeling/src/tools/shootall.js` (one shot per section × version, 1440×900 and 375×812, console log) + `remodeling/src/tools/sheet.py` (contact sheets). Console on both baseline runs: clean.

Per-section state at baseline (b07f0b8): every version except Hero V2 is a PLAN-V3 rebuild of the owner-reviewed 68f8ff5 design (compare the two baseline sheets: no V3 version reuses its 68f8ff5 layout). Hero V2 was augmented in PLAN-V3 beyond the owner's "exactly one thing" (crop marks, outline-to-fill headline, star fill, licence moved out of the lead): this is a §3B breach and is reverted in Phase 2.

---

## Conflicts log (§2: §3/§3B > §1 > §4 > reference mechanism > judgement)

| # | Conflict | Ruling | Why |
|---|---|---|---|
| C1 | FACTS.md holds 20 verbatim Google reviews; §3 says "No individual review quotes exist; invent none", aggregate-led ONLY. | **§3 wins.** All quotes and reviewer names removed from the page. Reviews V1/V2/V3 rebuilt as aggregate-only centrepieces (4.8 and 343 are the only review figures used). | §3 outranks a data file. |
| C2 | Hero V2 "gains exactly one thing" (§3B) vs flag 3 "dead Bebas weight effects must be replaced with effects that render" (§3B). V2's only dead effect is the h1 `fontWeight 200→700 / fontStretch` scrub (Bebas ships one weight and `font-synthesis: none` is set, so it never rendered). | **V2 keeps exactly what the owner saw.** The dead tween and its dead CSS are deleted (zero pixels change because it never rendered). No new headline effect is added to V2. Flag 3 is met in V1 (stroke-drawn letters) and V3 (34-layer extrusion), which are rebuilds. | The banned list (§5) names "Restyling, moving or improving Hero V2's design" explicitly; the narrower instruction governs V2. Deleting dead code changes nothing a visitor sees. |
| C3 | Hero V2 "exactly one thing" vs rule 5 / §3B "every button gets its own designed SVG reaction". | **V2's CTA gets its own SVG hover/click reaction.** At rest the design is pixel-identical apart from the proof line (Phase 2 before/after proves it). | Both are §3B; a hover reaction is not part of the composition at rest, and the owner named the hovers as broken. |
| C4 | "Every section gets 3 rebuilds unless they pass §4 with evidence" vs. the current file already being a full rebuild of the owner-reviewed versions. | Every version is re-audited against §4 (Phase 1). Versions whose design passes and whose defects are system-level (reactions, dosing, cursor) are fixed in place and must then pass the §12 gate; versions that fail on design, facts or trick repetition are rebuilt to a new reference. | The owner's rejection applied to the 68f8ff5 designs, all of which are already gone (baseline sheets). |
| C5 | "NO plain or fixed cursor" vs. text fields needing a precise caret. | System arrow hidden on fine pointers while the companion is on; the companion carries an exact pointer tip that changes form per target. Text inputs keep the native I-beam (`cursor:text`) because caret placement must be exact; the companion still reacts there. Touch, reduced motion and "Off" restore the system cursor. | §1.13 nothing broken ships; a lagging tip over a text field breaks caret placement. |
| C6 | Section switcher (1·2·3) and Settings buttons are review tools, not site UI, yet rule 5 says every button. | They get reactions too (one per section switcher, each digit drawn differently), tested like everything else. | Rule 5 has no exemption. |

---

## Open issues (live list)

- [ ] Phase 1 re-audit rows (TRACEABILITY.md) for all 30.
- [ ] Hero V2 restore + proof line + before/after comparison.
- [ ] Reaction uniqueness: 218 interactive elements measured on baseline; many share reactions or have none (see Phase 3).
- [ ] Repeated tricks (see PLAN-FULL §2).
- [ ] Reveal dosing 0.15–0.3s across all sections.
- [ ] Cursor: system arrow still shows (C5).

---

## Phase log

(appended below as phases complete)

### Phase 2 — heroes (Hero V2 restore)

- Hero V2 markup, CSS and JS restored to the 68f8ff5 code path (the owner-reviewed one). Removed: crop marks, outline-to-fill headline, star-fill tween, the rewritten lead, the 46svh phone band. Deleted (never rendered): the `fontWeight/fontStretch` scrub and the dead `font-weight:200; font-stretch` CSS.
- Added, exactly one thing: the proof line `★ 4.8 · 343 Google reviews` (link to the Google listing) in V2's own type: Bebas numeral, Geist muted words, safety-yellow star. At ≥768px it shares the headline's grid cell, right-aligned on the second line's baseline, so no other element moves (measured no overlap at 768/1024/1280/1440/1920: headline right edge 396/510/601/658/763px vs proof left 532/764/1020/1180/1570px). Under 768px it sits under the headline.
- Before/after proof: `remodeling/qa/hero2-before-after.jpg` (rows: 1440 at intro, 1440 at pin end, 375 at intro; columns: before / after / changed pixels in red). Pixel diff (threshold 24): 1440 intro 1,339 px changed, all inside the proof line's box (1100–1400, 700–750) except 65 px at (0–100, 0–50) = the retired plain cursor ring of the old page chrome (not Hero V2). 1440 pin-mid 1,329 px and pin-end 1,328 px: same two places only. 375: the proof line, plus the lead moved down by the line's height (49px). Nothing else differs.
- Reactions on V2's three controls (proof link, CTA, phone) are added in Phase 3 (C3); at rest they draw nothing.

### Phase 3 — interaction system (built; full test table recorded in Phase 6)
- Reaction rig (`remodeling/src/js/systems/rig.js`): sprite × carrier × beat × anchor; 73 sprites, 19 carriers, 14 beats. 13 hand-built reactions kept (blueprint, pencil, bolt, screw, saw, hook, swatch, chalk, viewfinder, lamp, masking, stake, keys); 18 retired because they replayed a centrepiece, divider or cursor trick (hammer, stamp, tape, theodolite, roller, perforation, valve, level, pin, clip, door, handset, hardhat, trowel, shutter, caution, pushpin, brick).
- Coverage/uniqueness check `remodeling/src/tools/rxcheck.js`: 226 interactive elements over 30 versions + chrome; after assignment 225 covered, 0 duplicate specs, the remainder being the Reviews controls under rebuild.
- Interaction test `remodeling/src/tools/rxtest.js` (hover draws, leave clears, click/tap fires, control does its job; state-held controls opened first).
- Defects found and fixed while building it: the hidden skip link was pulled over the logo by `.has-rx{position:relative}` → rule moved to `:where()`; the same rule displaced Consult V1's floating labels and hidden radio inputs → `:where()` too.
- Switcher: the sticky top-right pill covered leads/headings at rest in every section → now one floating pill at bottom-left naming the section under the viewport's middle (IntersectionObserver), above the phone contact bar on 375.

### Phase 4 — Proof (commit below)
- V2 REBUILT: steel meter plate with four odometer windows (Count Up 279 roll mode; first run sweeps from 0 over 2s, ease (0.33,1,0.68,1), reels stagger .07, velocity blur; hover/focus/tap re-runs a meter in .9s). Tape blades and stroke numerals removed (tricks owned by Process V3 and Hero V1).
- V1/V3: entrances re-dosed to ≤ .3s (card, string draw, stamps .3s each, targets .25s, station .3s); reactions replaced (no stamp/theodolite replay).

### Phase 4 — Reviews (C1 applied)
- All ten verbatim quotes and every reviewer name removed. The three versions are rebuilt aggregate-only on the two locked figures, 4.8 and 343, with the Google listing link:
  - V1 tally ledger: 343 hand-made strokes in 68 gates of five plus 3, scratched in with the scroll (scrub .3); the caption counts the strokes drawn; hovering a gate names its range ("Reviews 56–60").
  - V2 constellation: exactly 343 canvas stars sampled into the figure "4.8" in Bebas; nearest-neighbour constellation lines; pointer repulsion (r 90) with spring return; 40fps cap, DPR ≤ 1.25, hidden-tab skip, paused off-screen; tap or "Scatter the stars" scatters; reduced motion draws the assembled figure once.
  - V3 calibration dial: 0–5 dial, ticks every .1, a calibration mark at 4.8; needle sweeps to 4.8 (elastic 1.6s); drag anywhere and it springs back; "Flick the needle" for keyboard; `role="meter"` named "Google rating, 4.8 out of 5, from 343 reviews"; the digital readout only ever shows 4.8.
- Built-file scan: "Ashley", "Asher", "Damian", "Nunez", "Rio Norman", "blockquote", "a year ago", "months ago", "word for word" → 0 occurrences each.

### Phase 4 — trick register clean-up
- Dividers: BA → Process scaffold (repeated Hero V3's scaffold) → electrical conduit run; Work → Reviews trowel MotionPath follower (repeated Process V1's path follower) → tile course tipping onto its bed + grout struck; Reviews → Towns plumb bob (repeated the Financing field's plumb bob) → shingle course lapping in.
- Reactions retired for repeating a field or divider in the same page: saw (saw divider), chalk (Process chalk-line field), stake (Towns survey-stake field), lamp (unused after the Reviews rebuild). Hand-built reactions left: blueprint, pencil, bolt, screw, hook, swatch, viewfinder, masking, keys (one element each).
- `rxcheck.js` after all rebuilds: 259 interactive elements across 30 versions + chrome; 259 covered, 0 missing, 0 duplicate specs, 0 invalid.

### Phase 5 — cursor companion and pointer tip
- C5 applied: on fine pointers with motion on and a buddy chosen, the system arrow is hidden and an exact animated pointer tip sits on the hotspot (pencil nib that leans with velocity; underline on links; pulsing ring on buttons; crosshair on images; rule on headings; frame on cards; arrows on the slider; hidden over text fields, which keep the native caret). Tip colour follows the section under it. The buddy trails it with blink, eye roll after 4s idle, an idle action every 11–16s, a per-section tool, and different reactions to buttons, links, images, headings, cards, typing and dragging.
- Variants: hard hat, spirit level, traffic cone (new; the tape-measure variant retired because the tape belongs to Process V3), or No buddy. A stored "tape" choice falls back to the hard hat.
- Fixed while testing: a control that fades in under a resting pointer was not re-classified → the companion now re-hit-tests every 350ms while the pointer rests. The buddy switcher showed in Settings under reduced motion and on touch tablets → hidden there.
- `remodeling/src/tools/buddyqa.js`: 162 checks (3 variants × 30 versions × button/heading/image targets + leave), **0 fails, 0 console errors**; tip lands on the pointer to ±1px; text field keeps `cursor: text`; Off restores the system cursor; touch (375) → buddy off, tip off, cursor auto; reduced motion → buddy off, tip off, cursor auto.

## v2 Phase 2 — Hero V1 flag 2 (traced lines now governed by ⟦S1362⟧)
- Inside the X-ray slit the room's traced linework is now the ⟦S1362⟧ object: three annotation pills on dashed connector lines, each drawn in stages (dot .15s → connector .22s → pill .2s) when the slit reaches its part, and withdrawn when it leaves. A pill only shows while it fits wholly inside the band.
- Labels use only the words FACTS.md gives this photograph ("Open kitchen with black fluted cabinetry, marble island and pendant lighting"): Fluted cabinetry · Pendant lighting · Marble island.
- Evidence: centring the slit on each anchor shows each note (`visible` ×3, 0 page errors); screenshots in the scratchpad h1n2 set; the full hero set is re-shot in the gate.
- Hero V2 untouched. Hero V3 untouched (DONE on audit).

## v2 Phase 4 — Proof V1 rebuilt (⟦S0452⟧ Matter.js)
- Five checkable credentials as building materials on a plywood deck: concrete block "State licence CBC1265280", 2×4 "★ 4.8 · 343 Google reviews", brick "104 municipalities", tile "52 photographed projects", steel I-beam "30+ years combined". The verbatim credential line sits under the deck.
- Matter.js 0.20.0 (MIT, 83,476 B) vendored at `remodeling/src/vendor/matter.min.js`: Engine (sleeping on) + walls; blocks join the world when released, staggered 140ms, once the deck is 75% into view; restitution .08, friction .8, frictionAir .015. A pointer grab is a spring constraint (stiffness .18, damping .12) from pointer to grabbed point, so the block is carried and thrown with its velocity. Touch: tap bumps a block (no drag, page scroll never captured); Enter/Space bumps the focused block; "Restack the blocks" drops them again. Fixed-step loop paused off-screen and stopped once every block sleeps. Reduced motion: the pile settles synchronously (900 steps) and is shown still.
- Failures kept visible: (1) the first build never moved: the loop was created stopped (`k.raf` needs `.start()`); (2) blocks created static never regained mass when released → bodies are now added to the world on release; (3) settled blocks could rest on end with their text turned → rotation locked (infinite inertia), matching the no-rotated-text rule; blocks still fall, slide, stack and fly.
- Evidence: 1440 / 375 / reduced motion: 0 console errors, 0 overflow; screenshots show the pile, a thrown tile landing on it, the phone pile, the static pile.
- Weight: the 8 largest photos re-encoded at WebP q74 (method 6; 1:1 crop comparison shows no visible change), saving 90,893 base64 bytes; SplitText and the unused `riseLines` helper removed. File 3,859,7xx B with Matter.js included (cap 3,865,525).
- Defect noticed, to fix in the systems pass: the fixed Settings pill (bottom right) covers content, e.g. Proof V1's "Read the reviews" link.

## v2 Phase 4 — Process V1–V3 rebuilt
- **V1 · On the road** ([BANK] Q54): the version is a site plan (lots, footprints, palms, a home at the end). The road is generated through eight anchors with Q54's control multipliers (.2/.8 forward, .6/.3 back); the pickup truck rides it with scroll (scrub .6, ease none), and the travelled road turns yellow behind it. Eight signposts carry only number, stage and week mark; hover, focus or tap opens the firm's one-line description; signs light as the truck passes; the home's windows light at the end. The eight text cards are gone. Phones: a vertical snake road with signs alternating sides.
- **V2 · It builds itself** (⟦S1340⟧): a 2D section of a house. Below the rising line, finished work (footings, slab, walls, windows, door, ceiling, trusses, roof, site stakes, flood gauge, permit board); above it, timber shoring waits (deliberately not Hero V3's steel scaffold, and not a drawn/built split, which is Hero V1's). The build runs once in view (.45s per stage + .1s beat ≈ 4.4s); caption = number, stage, week mark; a quiet percentage in the corner. The yellow grip drags the line; arrow keys step it; eight stage pips jump to a stage. Not pinned. Reduced motion: the finished house.
- **V3 · The deck** (⟦S1443⟧ + the firm's week-ranged stages): eight cards with a drawn stage mark and a week stamp; swipe (12px activation, axis lock, 30% width or .55 px/ms flick to deal, elastic return short of it; the next card rises to meet the drag), tap, Previous/Next, or arrow keys. A "Swipe the card" cue shows until the first deal. The last card re-deals the deck.
- Defects found and fixed while building: phone signs on the wrong side, off-screen (inverted rule); V2 stage taller than the viewport at 1440 (capped to the viewport); V3's side column broken by the shared lead's grid placement; the stage icon clipped in its art panel; a tap on the deck did nothing (S1443 tap = select, so it now deals the next card).
- Evidence: `shoot.js` process 1–3 at 1440/375: console clean; `rxtest.js` process + proof, 1440: 40 tested / 0 failed; 375: 40 tested, 1 failure (deck tap), fixed and re-tested: 0 failed at both widths.

## v2 Phase 4 — Towns V1 rebuilt ([BANK] Q576 For Living hover→tap map)
- The version is the map. Three counties from the survey geometry; all 104 municipalities are survey marks at their gazetteer positions; the office is a yellow diamond. Hovering near a mark (28px) raises a survey flag (pole .16s, then a red swallowtail pennant .22s) with the town's name; it flies left when it would leave the map. Tap (40px), or focus the map and use the arrow keys / Home / End to step through the county's towns. A county tab, or a tap on another county's shape, zooms the viewBox to that county (.5s), dims the other marks and counts up the county total. No list on screen; the full list stays in an sr-only block and in V3's search. Marks and flags are sized in screen pixels at every zoom. Reduced motion: no zoom tween, flags appear without the raise.
- Removed: the legend column of names, the pins dropping on the map, the off-set shadow counties.
- Defects found and fixed: (1) the SVG overflowed its box at 375 and the off-view Palm Beach shape sat over the tabs (Playwright click intercepted) → map and SVG clip; (2) the office diamond's stroke scaled with it into a black blob → non-scaling stroke.
- Evidence: scripted hover (1440) and tap (375) read "Cutler Bay · Miami-Dade County"; Palm Beach tab → "39 municipalities in Palm Beach"; arrow keys → "Belle Glade · Palm Beach County"; 104 marks; overflow 0; 0 console errors. `rxtest.js` towns 1–3: 1440 8 tested / 0 failed; 375 8 tested / 0 failed.

## v2 systems — Settings docked in the header
- The fixed Settings pill (bottom right) covered content (Proof V1 link, Towns V1 map corner). It is now a 44px gear button at the end of the header (desktop ≥1024; phones keep the settings in the menu sheet); the panel drops down from it.
- Found while testing: at 1024 the header row already overflowed by ~100px (Book button past the margin). 1024–1279 now hides the phone number (Book a consultation stays) and tightens gaps. Measured header overflow: 0 at 1024, 1280 and 1440; panel opens and switches theme at all three.
- `rxcheck.js`: 273 interactive elements, 273 covered, 0 missing, 0 duplicate specs.
- Weight after Towns: 3,866,542 B (1,017 over the cap) → two more photos re-encoded at q74 (k-turquoise, b-white-marble): **3,853,966 B** (cap 3,865,525).

## v2 — audit measures after the rebuilds (`audit.js`, 1440; full table `remodeling/qa/v2-audit-after-rebuild.txt`)
| Version | prose before → after | centre share before → after | controls in centre before → after |
|---|---|---|---|
| Proof V1 | 28 → 21 | .43 → .71 | 4 → 5 |
| Process V1 | 25 → 20 | .73 → .68 | 0 → 8 |
| Process V2 | 195 → 19 | .09 → .51 | 0 → 1 |
| Process V3 | 50 → 24 | .12 → .47 | 0 → 1 |
| Towns V1 | 82 → 26 | .37 → .71 | 0 → 1 |
All five now meet the Phase 1 rule (prose ≤ 60 and centre share ≥ .35). The `ptr` column (DOM changes during a straight hover sweep) reads 0 for Proof V1, Process V2/V3 and Towns V1: these centrepieces answer to grab, drag, swipe or a pointer near a mark, not to a passing sweep. Their interactions are proven by the scripted grab/drag/swipe/hover tests above and in the interaction table, not by this column.

## v2 Phase 5 — companion re-test (`buddyqa.js`, `remodeling/qa/v2-buddyqa.txt`)
- 162 desktop checks (3 variants × 30 versions × button/heading/image + leave), **0 fails**; text field keeps the caret; touch (375) and reduced motion: buddy, tip and cursor hiding all off.
- Kept visible: the run logged 3 console messages, so it did not pass the zero-console rule: (1) Matter.js warned that a frame delta exceeded 16.667 ms (Proof V1 stepped a slow frame in one 33 ms step); (2–3) `<svg> attribute viewBox: Unexpected end of attribute` ×2: Towns V1's first county zoom tweened from an SVG that had no viewBox yet. Fixed: Proof V1 now steps a slow frame in fixed sub-steps of at most 1/60 s; Towns V1 sets the first view without a tween. Re-check (proof 1, towns 1, towns 3, full scroll at 1440): 0 console messages. The full buddyqa run is repeated in the §12 gate.
