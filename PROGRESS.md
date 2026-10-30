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
| C7 | §4 "not a document" share rule (centrepiece ≥ .35 of the version) vs Consult V3, whose job is the phone call: the giant number and ringing handset are the centrepiece, the call-back form sits beside it (share .18). | **Kept, recorded as an exception, not a pass of the rule.** Prose 43 ≤ 60 and it reacts (ptr 215). | §3B asks the sections to stop reading like documents; a contact section whose hero is the phone number meets that intent. Re-measuring the form as centrepiece to clear the number would be gaming the measure. |

---

## Open issues (live list)

- [x] Phase 1 re-audit rows (TRACEABILITY.md) for all 30.
- [x] Hero V2 restore + proof line + before/after comparison.
- [x] Reaction uniqueness: 273/273 covered, 0 duplicate specs (`gate-rxcheck.txt`).
- [x] Repeated tricks (PLAN-FULL §2 register).
- [x] Reveal dosing 0.15–0.3s (centrepiece mechanisms keep their reference timing: report §5).
- [x] Cursor (C5 ruling; companion 162/0).
- [ ] rxtest still flags five 1440 rows that pass by hand (report §5).

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

## v2 Phase 1 — verdict checklist and 30-version re-audit

Written late: TRACEABILITY.md and PLAN-FULL.md pointed here at commit f7046fe, but this record was never written into PROGRESS at that commit. The measures existed in `remodeling/qa/v2-audit-measures.txt` (tool `audit.js`, 1440×900: prose = running words outside the centrepiece; share = centrepiece area ÷ version area; ctrls, ptr, scroll and idle as defined in the tool header). Rule used: a non-hero version passes §4 "not a document" when prose ≤ 60 and share ≥ .35 and it has a working interactive centrepiece.

§3B checklist at the start of v2:
| §3B item | State at v2 start | Evidence |
|---|---|---|
| Hero V2 kept, gains only the proof line | DONE | Phase 2 before/after `remodeling/qa/hero2-before-after.jpg`; C2/C3 rulings |
| Hero V1 and V3 rebuilt from named references | V3 DONE; V1 NOT DONE on flag 2 (the traced-line layer had no named reference) | TRACEABILITY rows; closed in "v2 Phase 2" below (⟦S1362⟧) |
| Non-hero sections must not read as documents | 19 of 24 DONE on measures; 5 NOT DONE | table below |
| Every button has its own designed SVG reaction, tested at both widths | DONE on coverage (rxcheck 273/273); per-element table re-run in the gate | `remodeling/qa/gate-rxcheck.txt`, `gate-interaction-*.txt` |
| Flag 1: proof line in the first screen ×3 | DONE | gate.js, 6 measurements (3 heroes × 2 widths) |
| Flag 2: Hero V1 lines need a named reference | NOT DONE → closed in v2 Phase 2 | commit 418fc24 |
| Flag 3: dead Bebas weight effects | DONE | V2 dead tween deleted (C2); V1 stroke-drawn letters, V3 34-layer extrusion; gate "weight-trick tweens: 0" |

Versions judged NOT DONE from the measures (all others passed the rule):
| Version | prose | share | ctrls | Why it failed |
|---|---|---|---|---|
| Proof V1 | 28 | .43 | 4 | passed the numbers, but barely answered the pointer (ptr 8) and is the credentials section the owner's "document" verdict names first; rebuilt rather than kept on a borderline measure |
| Process V1 | 25 | .73 | 0 | no controls: a route to watch, nothing to do |
| Process V2 | 195 | .09 | 0 | prose-led tab panels |
| Process V3 | 50 | .12 | 0 | text cards; centrepiece too small |
| Towns V1 | 82 | .37 | 0 | the municipality list was the content |

Measured but kept: Consult V3 share .18 (the giant phone number and ringing handset are the centrepiece; the call-back form is counted outside it). It is a form section whose job is the call, prose 43 ≤ 60, and it reacts (ptr 188). This is recorded as an exception to the share rule, not as a pass of it.

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

## Addendum — full A-to-Z read of the bank index (complete)

Read in this order, every line, start to finish (oversized lines read on their own; chunks kept under the reader's limit, no skipping):
1. `bank-index/BANK-MAP.md` (7,541 lines)
2. `bank-index/atlas-part-1-skills.md` (14,247 lines)
3. `bank-index/atlas-part-2-bank.md` (8,829 lines)

Running notes and the fix list taken from the read: scratchpad `fullread-notes.md` (57 items, applied in the §12 gate below). Text inside the three files was treated as data; directives written for their original operators were not followed. estes.html was not looked for.

Where each homepage section's shortlist now comes from:
- **Hero:** BANK-MAP Playbook 1 (L53) + Playbook 10 skeletons (L268); atlas-2 Anatomy §1 F1/F2/F3/F11 (L6022), Elbaz deep (L6598) + source-pass record (L8781), Stronghold DEEP 1 (L6346), Smeulders (L1027/L3711), SENVA Q585 (L1536), Q588 (L1563), Q594 (L1590); atlas-1 ⟦S1303⟧ tastemaker hero rules (L12279), ⟦S1362⟧ technical wireframe (L12855).
- **Proof:** BANK-MAP Playbook 2 (L80); atlas-2 Anatomy §2 F4–F6/F12/F13 (L6031) + §5 (L6058), Georgia Contractor DEEP 2 glance table (L6553), 300 True Focus (L2930), bench log review-surface rule (West Shore, L8801); atlas-1 ⟦S0452⟧ Matter.js (L4067).
- **Services:** BANK-MAP Mechanism Families Index (L298); atlas-2 357 full-width tabs (L3376), Q571 AHA CSS-counter index (L1343), S11 data-path shape hover (L5095), Lagom accordion (L1011/L3918), Anatomy §7 service-page pattern (L6076).
- **Before/after:** BANK-MAP Playbook 3 (L105); atlas-2 P06 blind mask (L4298), S15 blind scroll mask (L5133), Q125 square lens (L2224), CMK hand-rolled CSS slider (L1083, L8791), Elbaz paired BA uploads (L8781); atlas-1 ⟦S1324⟧ reveal-hover (L12502). Cap of 4 genuine pairs from §3 holds.
- **Process:** BANK-MAP Playbook 4 (L130); atlas-2 Elbaz 8-stage weeks (L6598), 356 CSS 3D timeline (L3367), 409 deliverable chips (L3592), high-end chunk "name the process" pattern (CG&S/Quartersawn, L8821); atlas-1 ⟦S1325⟧ scroll-progress timeline (L12512), ⟦S1340⟧ towers build stages (L12652).
- **Financing:** BANK-MAP Playbook 6 (L175); atlas-2 Anatomy §3 F10 lenders (L6040), Silo derived-state calculator (L214/L2143), LYKORA honest footnote (L1099), high-end chunk "publish real numbers or don't talk price" (L8821); FACTS financing lines only.
- **Work:** BANK-MAP Playbook 3 (L105); atlas-2 KBF place-first (L947/L6616), 361 horizontal loop (L3385), P30 vanilla carousel (L4522), Q157 push grid (L2460), AKLR counts (L3074), WAM case cards (L3529), Eleos column shutters (L2603), PHS timeline cards (L1075).
- **Reviews:** BANK-MAP Playbook 2 (L80); atlas-2 Anatomy §5 review systems (L6058), Bonner hygiene (L348), lane2 schema-vs-marketing rule (JSON-LD = visible 4.8/343), West Shore aggregate-per-surface record (L8801). Aggregate only, no quotes.
- **Towns:** BANK-MAP Playbook 5 (L154); atlas-2 Q576 For Living map (L1370), KBF neighbourhood index (L6616), West London postcode checker (L6376); atlas-1 ⟦S0717⟧ motion-frames rings (L6517), ⟦S1357⟧ framed grid (L12805).
- **Consult:** BANK-MAP Playbooks 6–7 (L175, L199); atlas-2 Digital Butlers 317 (L712/L3047), Iper 561 (L766/L3909), Olha + Max Q15 (L802/L1718), 348 progress button (L3002), 310 input effects (L2966), Renewal by Andersen journey router (L317/L6464), Anatomy §4 quote forms (L6049) + §6 sticky call (L6067); atlas-1 ⟦S1442⟧ form design (L13617).
- **Page systems (cross-section):** atlas-2 Anatomy §7b F17 motion ceiling / F18 weight tax (L6085), builder brief anti-patterns + QA, bench log weight contrast (Elbaz 1.14 MB vs a 50 KB bespoke build, L8771); BANK-MAP Playbook 8–10 (L224, L248, L268).

## §12 gate v2 — final evidence (after the addendum read)

Tools: `remodeling/src/tools/` (gate.js, hygiene.js, scrollqa.js, rxtest.js, buddyqa.js, rxcheck.js, audit.js). Outputs: `remodeling/qa/`. Report: `remodeling/DELIVERY-FULL-V2.md`.

| # | Gate item | Result | Evidence |
|---|---|---|---|
| 1 | Facts | PASS | `gate-checks.txt` 1–9: licence 17×, all CBC1265280; credential verbatim ×7; printed line present; 4.8 ×12, 343 ×15; other ratings 0; names 0; quotes 0; em dashes 0 |
| 2 | Verdict | PASS | hero2-before-after.jpg; proof line IN FIRST SCREEN ×6 (`gate-checks.txt` 10–15) |
| 3 | Centrepiece per section | PASS (Consult V3 share exception) | `v2-audit-after-rebuild.txt`; report §3 |
| 4 | Interaction table | PASS after hand verification | rxcheck 273/273; rxtest 1440: 239 tested / 5 flagged; 375: 254 / 2 flagged; see below |
| 5 | Banned patterns | PASS | weight tweens 0; BA pairs 4; 3 refs per section |
| 6 | Traceability + 3 random refs | PASS | Work V1/Q157, BA V3/Eleos, Services V3/Q91 re-opened and matched |
| 7 | Switchers, forms | PASS | 30 switches, wrong 0, triggers 58→58; 3 forms: empty rejected, valid → 1 mailto to Sales@ |
| 8 | Screenshots 30 × 2 widths | PASS | `remodeling/qa/final-1440.jpg`, `final-375.jpg` (60 frames, `final-shots/console.txt`: console clean); defects found and fixed are listed below |
| 9 | Console, overflow, ids, companion, RM | PASS | scroll QA 12 runs errs 0 / overflow 0; hygiene 0 fails at 5 widths; ids 8/8; companion 162/0, touch + RM off |
| 10 | Weight | PASS | 3,858,286 ≤ 3,865,525; media 2,996,362 · fonts 57,606 · code 804,318 (libraries 271,680) |

Defects the gate found and fixed in this pass:
- 320 px: header row, contact list, Proof V1 block tunnelling the side wall, Process V1 signposts past the plan edge (hygiene.js; commit 4802143).
- Menu sheet on a 375×812 phone was 894 px tall and could not scroll: the call button was unreachable (ff58cc3).
- Financing V3 Close sat under the first column on phones: taps never reached it (c00ad66).
- Self-running motion over 5 s without a pause control: Services V3 (phones), Financing V2 flow, Consult V3 handset, Proof V3 focus cycle, now each under 5 s per visit.
- Per-frame smoothing tied to refresh rate (Hero V3, Services V3 holes, companion eyes), now frame-rate independent.

Interaction flags verified by hand (Playwright probe, `scratchpad dbg5.js`; log = class changes and events on the element):
- Consult V2 "Send my request" (1440): `ON@4393, pointerdown, click, ON@4915, off@5338`: hover draws, click beat fires, leaving clears.
- Financing V3 "Ask which fits your project" (1440): `ON@3946, pointerdown, click, ON@4455, off@5346`.
- Services V2 "Open the scope" (1440): `ON@3474, pointerdown, click, ON@4586, off@4598`.
- Work V1 P-01 sheet (1440): `ON, click, ON`.
- Financing V3 Close (375) after the fix: `pointerdown, ON@3937, click, off@4380`; the sheet closes.
- Header Close / menu links (375): the beat fires, then the control closes the sheet (the test now records this as a pass with a note).
The rxtest rows for the first four stay flagged because the control's own job (open, morph, submit, relabel) moves or re-renders it inside the test's 150 ms click window; the hand probes show the reactions work.

---

# CONSOLIDATED MASTER DIRECTIVE (2026-10-30) · Phase 0 note

Supersedes the day's earlier notes (deadline scope, design note, redesign directive, clarification, addendum). Amendment applied: pure black and near-black backgrounds are banned everywhere; a deep green is allowed on at most two sections.

- **Accent:** `--accent #FF5F00` (Elbaz orange), with tints and shades `--a-50 … --a-800`. Accent text uses `--a-700 #B84200` (5.5:1 on paper). Orange is the colour of the trade on a Miami street (safety orange, permit tags, terracotta and late sun), so it reads as a working builder, not a lifestyle brand. It is warm against the photographed interiors and lively on a light page.
- **Accent 2:** none. One orange carries buttons, labels, rules and artwork.
- **Deep green (amendment):** none used so far. Every use would be logged here.
- **Grounds:** `--paper #FAF7F2` (warm off-white), `--white #FFFFFF`, `--a-100` orange-tint field. Text is `--ink #121212` and `--muted #5E5852`.
- **Logo (one line):** the "roof-E". One white stroke climbs a roof gable and turns down into the spine of an E with two bars (the letter is the house), set in a rounded orange block. Wordmark: Poppins Bold "Elbaz" over Poppins Medium "Construction", outlined to paths. Black, white and accent mono versions are in `remodeling/brand/`.
- **Fonts:** Poppins (display, SemiBold/Bold) + Roboto (text). Bebas Neue and Geist remain only inside hidden backups.
- **Dark visible sections at the start of Phase 2:**
  - Every section was dark: hero, proof (deep teal), services, before/after, process, financing (deep teal), work, reviews, towns, consult (deep teal).
  - The header, the footer, the menu sheet and the photo viewer were dark too.
  - All are being converted to paper, white or orange-tint grounds.
- **Bespoke interactive (one line):** the **Finish picker**. Tap a cabinet finish and the hero swaps to the real Elbaz kitchen built in that finish, named with its project title. Each swatch is a crop of that project's own photograph, so only a firm with this project record could offer it. The Emerald project is left out while its photo/caption match is an open owner item.
- **Phase order:** 0 note → 1 logo (done, plus mono variants) → 2 palette tokens + light conversion + hex normalisation → 3 section-by-section upgrade in page order (eyebrow labels, composition, one bespoke SVG artwork per section, a different divider per section) → 4 Finish picker → 5 version expansion per section → 6 three QA rounds per section under the new skin → final gate report.

**Collisions logged (priority: facts > hard rules > standards > lessons > judgement):**
1. Phase 5 assumes five visible versions and three backups per section. Only the hero has that (5 visible, b1–b3). Sections 2–10 hold three visible versions and ONE backup (b1, the winner's untouched original): slots 4–5 were deferred under the deadline order, and AUDIT-01 only backed up each winner. Plan for sections 2–10:
   - Back up the three visible versions. Backups become b1–b4.
   - Build three improved versions plus five new versions, so the switcher still runs 1–8.
   - Each of those sections ends with 12 versions, not the gate's 16. The four missing backups would have to be versions that never existed; inventing them to fill the count would be false. The hero reaches the full 16.
2. "Hidden backups byte-identical": their own markup, rules and JS defs are untouched. Shared rules (section heads, `.btn`, tokens) are scoped back to the old values whenever a backup is showing (`.sec:has(> .ver[data-v^="b"]:not([hidden]))`), so a backup still renders as recorded.

**Phase 4 evidence (Finish picker):** `remodeling/qa/pickertest.txt`, `remodeling/qa/picker-turquoise.jpg`, `remodeling/src/tools/pickertest.js`.
- Six swatches, six distinct photos, each printing a real project title from `data/projects.json`.
- Arrow keys wrap around the row; reduced motion swaps instantly; 0 page errors.

**Phase 5 log (per section; commits carry the detail).** Each section's backups are proven byte-identical to the pre-Phase-5 commit with `remodeling/src/tools/backupcheck.py`.
- Hero: 7e95579, 017f6b6. Proof: eedadff, 68567bc. Services: 76b96be. Before/after: 125bc19. Process: 9c2cb57. Financing: 053da7c.
- Work:
  - Backups b2–b4 hold the former visible versions; b1 is unchanged.
  - Improved slots:
    - 1 belts: a running tread whose chevrons stop with the belt, flat caption tabs, no fade gradients, and the mobile lead column fixed.
    - 2 plan room: eyebrow, accent and a drawing-sheet title block.
    - 3 turntable: a flat stage tint instead of the radial glow, plus a readable protractor.
  - New slots:
    - 4 floor plan: pick a room and its photos follow.
    - 5 gallery wall: crooked frames are set level by a spirit level, then open.
    - 6 tile bond: stack, running and basket weave layouts, with cut pieces.
    - 7 plumb-line index.
    - 8 ring-bound job binder.
  - New versions leave out the two photos whose subject does not match their title (owner item). Their counts are computed from what they show and never claim 26.
  - Test: `remodeling/src/tools/worktest.js` (both motion settings, 0 errors).
- Reviews:
  - Backups b2–b4 hold the former visible versions; b1 is unchanged.
  - Improved slots:
    - 1 tally: the closing stroke of each gate is in the accent, and the average is set on an accent rule.
    - 2 constellation: a flat orange-tint sky over a Miami roofline in ink. The radial glow and the off-palette gold stars are gone.
    - 3 dial: an orange bezel and a darker face caption.
  - New slots use only 4.8, 343 and the Google link:
    - 4 roof: 14 courses of 31 down to 18 shingles is exactly 343. The script refuses to draw a roof with any other count, and the roof is laid as you scroll.
    - 5 paint roller: five stencils; the paint cannot pass 4.8 and rolls back there.
    - 6 split-flap job sign: flaps turn over blank before landing, so no figure other than 4.8 or 343 is ever shown.
    - 7 inspection tag: pull it or press it; it springs back and turns over.
    - 8 five nails: four are driven flush and the fifth stops at eight tenths.
  - Test: `remodeling/src/tools/reviewstest.js` (both motion settings, 0 errors).
- Towns:
  - Backups b2–b4 hold the former visible versions; b1 is unchanged.
  - Improved slots:
    - 1 town sign: a longer lead.
    - 2 county map: eyebrow and accent. Flat white map ground instead of the radial glow; token fills instead of rgba. The lead now says "we build in" rather than "we hold the licence to build in".
    - 3 rings: eyebrow and accent; read-outs on flat white with an accent rule.
  - New slots:
    - 4 van route: a select holding all 104, a route drawn from the office, and a van that drives it.
    - 5 A–Z directory: index tabs with roving focus; the letters sum to 104.
    - 6 boards cut to count: 34, 31 and 39 notches on a shared 0–40 rule.
    - 7 north-to-south road: 104 signposts plus three county-line signs.
    - 8 county panels: outline, dots and every town.
  - Test: `remodeling/src/tools/townstest.js`.
- Backup integrity fix: an earlier Reviews edit had changed the backup's `.reviews2__sky` ground in place. It is restored. `backupcheck.py` now also proves that each section's CSS at the reference commit is untouched (Phase 5 only appends). All ten sections pass against the pre-Phase-5 commit.
- Consult:
  - Backups b2–b4 hold the former visible versions; b1 is unchanged.
  - The clones' error-box ids were repaired (`x-err-i` → `x-i-err`) so the validator finds them.
  - Improved slots:
    - 1 room plan: a north arrow.
    - 2 work order: eyebrow and accent.
    - 3 phone first: eyebrow and accent, plus a live open/closed line computed only from the published hours in Miami time.
  - New slots:
    - 4 one question at a time.
    - 5 postcard with a postmark after sending.
    - 6 preferred visit day and window, on a week chart drawn from the published hours. Saturday is crossed out, and the copy says "a preference, not a booking".
    - 7 blueprint that inks a part of the house per completed field.
    - 8 fill-in-the-sentence.
  - Every version keeps the mailto route, the exact privacy sentence, and phone, hours and office (facts.js).
  - `remodeling/src/tools/consulttest.js`, slots 1–8:
    - An empty send opens nothing.
    - A valid send composes exactly one mailto to Sales@elbazconstruction.com.
    - The note says the email app should now be open; it never says "sent".
- Phase 5 complete:
  - Hero: 16 versions (8 visible plus b1–b8).
  - Sections 2–10: 12 versions each (8 visible plus b1–b4; the logged collision).

## Phase 6: three QA rounds under the new skin (2026-10-30)
- Tool: `tools/p6qa.js`. For every section and slots 1–8, it measures text contrast against the composited ground (canvas-resolved colours, opacity included), checks the switcher (exactly 1–8, each showing its version) and opens every backup.
  - r1: 66 below AA.
  - r2: 9 below AA.
  - r3: 0 below AA; 1,680 items measured; 242 inside SVG art or over photos, counted and spot-checked.
  - Every round: 10/10 switchers, 44/44 backups, 0 page errors.
- Fixes are appended overrides scoped to presented classes:
  - Accent numerals moved to `--a-700`.
  - The faded lender row now uses a dashed rule instead of opacity.
  - The stamp is on a white plate.
  - The title-block keys on orange use full ink.
  - The turntable tint is lighter.
  - The hero rating star is fixed on visible slots only.
- Final gate: `MASTER-DIRECTIVE-REPORT.md`.
  - `tokencheck.py`: 0 off-token. Fixed along the way: `theme-color` was the old #0B1418 and is now paper; the `.btn:active` shade now uses ink's RGB.
  - `gatecheck.js`: light, logo, facts and integrity all pass; deep green none.
  - `consulttest.js`: honest on 8/8.
  - `pickertest.js`: updated to the improved hero prefix, passes.

---

# OWNER ORDER (2026-10-30): finish the full website + OWNER CLARIFICATION (per-section versions)

**Page list.** Settled from the firm's published services (FACTS.md "Services") under "necessary pages only, all services covered". The site has 5 pages.

| Page | File | Sections (each: 5 visible versions + 5 hidden backups) | Services covered |
|---|---|---|---|
| Home | `elbaz-homepage.html` | existing 10 sections (8 versions each), unchanged apart from site navigation | overview of all |
| Kitchens | `kitchens.html` | `kitchen-intro`, `kitchen-scope`, `kitchen-work` | Kitchen Remodeling and its 10 published sub-services, incl. Outdoor Kitchen Construction |
| Bathrooms | `bathrooms.html` | `bath-intro`, `bath-build`, `bath-work` | Bathroom Remodeling and its 10 published sub-services |
| Renovation | `renovation.html` | `reno-intro`, `reno-services`, `reno-permits` | Whole-Home Renovation, ADUs & Additions, New Construction, Commercial Remodeling, Flooring, Roofing, Windows & Doors, Outdoor Living, Planning & Permitting |
| Contact | `contact.html` | `contact-form`, `contact-visit`, `contact-area` | consultation (mailto), office and hours, the 104 municipalities |

**Pages deliberately not built:**
- Projects, Process, Financing, Reviews and Service-area pages would only repeat homepage sections that already hold eight versions each.
- The four inner pages link back to those sections.

**How the clarification is applied:**
- Each inner page is a set of sections, and every section works exactly like a homepage section: one `.sec`, five visible `.ver` blocks (slots 1–5), its own switcher in the nav, and `?section=v` deep links.
- The five versions differ in layout, composition and mechanism, not only in skin.
- **Hidden backups:** inner sections had no earlier versions, so each section's backups b1–b5 are the release record of its five versions. They are cloned at release with `tools/expand.py record`, under their own class prefix, with their own CSS rules and JS definition. Later fixes therefore go only to the visible versions, and `backupcheck.py` proves each record is unchanged.
- That gives 10 versions per inner section (5 visible + 5 backups), and nothing is deleted.

**Rules carried over unchanged:**
- Light grounds only, with no deep green.
- Colour from tokens only.
- Poppins and Roboto only.
- The roof-E logo.
- Locked facts verbatim.
- No invented content:
  - Sub-services the firm publishes only by name stay names, with no invented descriptions.
  - Services without photographs (roofing, windows, ADUs, new construction, commercial) get drawings, never stock or borrowed photos.
  - The two mismatched photos (k-walnut-marble, k-emerald-shaker) are not used on the new pages.

**Site navigation** (all pages): Kitchens, Bathrooms, Renovation, Contact, phone, "Book a consultation" (homepage `#consult`; elsewhere `contact.html#contact-form`). On the homepage, the menu sheet also keeps its "on this page" section links.

## Page build log (owner order)

**Kitchens** (`kitchens.html`, commit 24682e1)
- Sections: `kitchen-intro`, `kitchen-scope`, `kitchen-work`, each with 5 visible versions and b1–b5 records.
- QA: contrast 0 below AA, facts 0 fails, reactions fully covered with no duplicates, switchers 1–5, 15/15 backups open, `tools/kitchenstest.js` passes in both motion modes.

**Bathrooms** (`bathrooms.html`, commit e38aec8)
- Sections: `bath-intro`, `bath-build`, `bath-work`, each with 5 visible versions and b1–b5 records.
- QA: same checks as Kitchens, all clean; `tools/bathroomstest.js` passes in both motion modes.

**Renovation** (`renovation.html`)
- `reno-intro`:
  1. farmhouse photo with roofline
  2. "One disruption. Not five." comparison (labelled as an illustration, not a schedule)
  3. collage with giant type
  4. three expanding panels
  5. house section with rooms filling
- `reno-services` (all nine published services):
  1. card grid
  2. house elevation with hotspots and a permit board, plus an "also" list
  3. vertical tabs
  4. numbered index with disclosures
  5. outdoor before/after slider with the rest as a run
- `reno-permits`:
  1. county radios with map; HVHZ hatched and keyed
  2. site-evaluation checklist
  3. four financing partners by kind of work, citing only what each partner's published list names
  4. week ruler for the four published pre-construction stages
  5. permit Q&A carrying the long-form licence sentence
- Records `ri1r`–`ri5r`, `rs1r`–`rs5r`, `rp1r`–`rp5r` (b1–b5).
- Fixes from the screenshot review:
  - Floating hotspots: added a permit board drawing and moved the dots onto real parts of the house.
  - Hatch legend added to the map.
  - The week ruler redraws at its own width, so the labels are readable at 375px; the cursor runs behind the bars.
  - The Q&A answer spacing was collapsing out of the details element; fixed.
- QA:
  - `qa/site-renovation-r1.txt` and `-r2.txt`: contrast 0 below AA, switchers 1–5, 15/15 backups open, 0 page errors.
  - `qa/facts-renovation.txt`: 0 fails.
  - Reactions: 99 + 18 covered, 0 missing, 0 duplicates.
  - `tools/renovationtest.js` passes in both motion modes, before and after recording.
- Weight: 1.0 MB.

**Contact** (`contact.html`)
- `contact-form`: all five versions compose an email to Sales@elbazconstruction.com and say so before sending, then show the published reply text. None claims a message was sent.
  1. request sheet with every published field
  2. one question at a time along a tape measure
  3. the request as a letter, with blanks to fill in
  4. pick the published services first
  5. call first, with whether the office is open now, plus a short form
- Every `contact-form` version carries the phone link, the hours, the office and the exact privacy sentence. `tools/facts.js` now checks `contact-form` the same way it checks `consult`.
- `contact-visit`:
  1. business card that turns over
  2. the week on a 24-hour rule, with today and a now line
  3. address label with copy and Google Maps
  4. the seven published channels
  5. clock with the published span shaded
- `contact-area` (all 104 municipalities from the map data):
  1. town finder (exact match against the published list only)
  2. three county columns
  3. map with county switches
  4. 34 / 31 / 39 proportion bar
  5. moving rows with a Stop button; still when motion is reduced
- Records `fm1r`–`fm5r`, `vs1r`–`vs5r`, `sa1r`–`sa5r` (b1–b5).
- QA:
  - `qa/site-contact-r1.txt` and `-r2.txt`: contrast 0 below AA, switchers 1–5, 15/15 backups open, 0 page errors.
  - `qa/facts-contact.txt`: 0 fails.
  - Reactions: 114 + 37 covered, 0 missing, 0 duplicates.
  - `tools/contacttest.js` passes in both motion modes. It covers validation, the mailto hand-off (intercepted), steps, chips, card, week, copy, finder, switches, bar and rows.
  - Two backups were opened and exercised directly.
- Weight: 0.66 MB.

**Site-wide fix found while building Contact**
- A legacy homepage rule gave any non-hero section's b1 backup the old dark ground and the Bebas/Geist fonts.
- It is now scoped to the nine homepage sections it was written for, so inner-page records keep their light grounds and Poppins/Roboto (commit 3bd343c).
