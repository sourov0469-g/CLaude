# Delivery report: FULL BUILD PROMPT v2 (§14)

Elbaz Construction homepage, 10 sections × 3 versions. Every claim below points at the file, tool or commit that proves it. Where something is not proven or not met, it says so under "Flags, conflicts, gaps".

## 1. Deliverable

| Item | Value |
|---|---|
| File | `remodeling/site/elbaz-homepage.html`: one self-contained HTML file (fonts, CSS, JS, libraries and every photo inlined; no network request) |
| Size | **3,858,286 B** |
| Media | 2,996,362 B: the 36-photo WebP store (2,968,344 B) + logo and other inline image data (28,018 B) |
| Fonts | 57,606 B (three WOFF2 subsets: Bebas Neue, Geist, Archivo) |
| Code | **804,318 B**: 271,680 B of libraries (gsap core, ScrollTrigger, DrawSVG, Flip, MotionPath; Matter.js; Lenis) + ~532 KB of the site's own JS, CSS, markup, inline SVG and data for all 30 versions |
| Weight cap (Phase-0 baseline, b07f0b8) | 3,865,525 B: **met** (7,239 B under) |
| File the owner reviewed (68f8ff5) | 3,973,574 B: the delivery is 115,288 B lighter |
| Branch / commit | `claude/fervent-planck-6tl8eq`; see the final commit at the end of PROGRESS.md |
| Source | `remodeling/src/` (build: `python3 remodeling/src/build.py`) |

## 2. Phase-1 checklist (owner verdict §3B), item by item

Full record: PROGRESS.md "v2 Phase 1" (measures in `remodeling/qa/v2-audit-measures.txt`).

| §3B item | Result | Evidence |
|---|---|---|
| Hero V2 kept as the owner saw it; gains only the proof line | DONE | `remodeling/qa/hero2-before-after.jpg`; conflicts C2/C3 in PROGRESS |
| Hero V1 and V3 full rebuilds from named references | DONE | TRACEABILITY rows (V1: Q569 + 506 + Q167 + ⟦S1362⟧; V3: Q585 + Q165) |
| Non-hero sections read like documents → rebuild unless proven | DONE | 5 versions failed the re-audit and were rebuilt (Proof V1, Process V1–V3, Towns V1); 19 passed on measures; Reviews V1–V3, Proof V2 and Work V3 had already been rebuilt after the verdict |
| Every button's hover/click is its own designed SVG reaction, tested at both widths | DONE | `gate-rxcheck.txt`: 273 of 273 controls covered, 0 duplicate specs; per-element tables `gate-interaction-1440.txt` / `-375.txt` (see §4.4) |
| Flag 1: "★4.8 · 343 Google reviews" in the first screen of every hero | DONE | `gate-checks.txt` lines 10–15: all six measurements IN FIRST SCREEN |
| Flag 2: Hero V1 traced lines had no named reference | DONE | ⟦S1362⟧ technical-wireframe-info-layout, commit 418fc24 |
| Flag 3: dead Bebas weight effects | DONE | V2's dead tween deleted; V1 stroke-drawn letters and V3 extrusion render; `gate-checks.txt`: weight-trick tweens 0 |

## 3. Per section × version

Status: **PRESERVED** = owner keeper · **REBUILT** = new design to the named reference after the verdict · **KEPT** = a post-verdict design that passed the §4 re-audit on measures and was fixed in place.
Deciding §4 criterion, from `remodeling/qa/v2-audit-after-rebuild.txt`: prose = running words outside the centrepiece; share = centrepiece area ÷ version area; rule: prose ≤ 60 and share ≥ .35 and a centrepiece that answers the visitor.
Three verdicts per row: **Facts** = facts grounded (YES/NO) · **Ref** = reference-intent match (YES/NO) · **Generic** = generic/default feel (NO is the pass).
Basis: Facts from the gate's text checks over all 30 versions (licence verbatim, only 4.8 and 343 as review figures, no names or quotes, ≤ 4 before/after pairs). Ref from the TRACEABILITY mechanism vs the build, plus the three-reference spot check in §4.6. Generic is my own judgement, made against the reference.

| Section | V | Status | Governing reference | Centrepiece and deciding criterion | Facts | Ref | Generic |
|---|---|---|---|---|---|---|---|
| Hero | 1 | REBUILT | Q569 slit + 506 ladder + Q167 stroke text + ⟦S1362⟧ | X-ray slit over the photographed room; share 1.0, prose 20 | YES | YES | NO |
| Hero | 2 | PRESERVED | Q154 + S54 (owner keeper) | pinned zoom-out, unchanged except the proof line | YES | YES | NO |
| Hero | 3 | REBUILT | Q585 SENVA + Q165 depth text | 34-layer extruded wordmark on a drawn scaffold; prose 11 | YES | YES | NO |
| Proof | 1 | REBUILT | ⟦S0452⟧ Matter.js | five credential blocks to grab and throw; share .71, prose 21, 5 controls | YES | YES | NO |
| Proof | 2 | REBUILT | 279 Count Up (roll) | meter plate, four odometers; share .49, prose 18 | YES | YES | NO |
| Proof | 3 | KEPT | 300 True Focus + crosshair grid | survey laser between credentials; share .72, prose 15 | YES | YES | NO |
| Services | 1 | KEPT | 98 Silo explode | iso assemblies explode into layers; share .62, prose 41 | YES | YES | NO |
| Services | 2 | KEPT | R45 sticky stack + ⟦S0211⟧ | drawing-set sheets stack; share .87, prose 16 | YES | YES | NO |
| Services | 3 | KEPT | Q91 tool icons + ⟦S0634⟧ | pegboard tool wall, magnetic holes; share .40, prose 0 | YES | YES | NO |
| Before/after | 1 | KEPT | CMK slider + R28 | stud-wall divider, native range; share .50, prose 15 | YES | YES | NO |
| Before/after | 2 | KEPT | Q148 wavy reveal | paint roller reveals the after; share .78, prose 18 | YES | YES | NO |
| Before/after | 3 | KEPT | Eleos column shutters | storm shutters drop and lift; share .55, prose 33 | YES | YES | NO |
| Process | 1 | REBUILT | Q54 curved path | site plan, truck on the road, 8 signposts; share .68, 8 controls | YES | YES | NO |
| Process | 2 | REBUILT | ⟦S1340⟧ builds itself | house section under a draggable rising line; share .51, prose 19 | YES | YES | NO |
| Process | 3 | REBUILT | ⟦S1443⟧ + Elbaz 8 stages | swipe deck of stage cards; share .47, prose 24 | YES | YES | NO |
| Financing | 1 | KEPT | ⟦S0882⟧ ticket + 372 glare | perforated partner tickets; share .54, prose 55 | YES | YES | NO |
| Financing | 2 | KEPT | TruGreen picker + Q54 | pipes route a project to its lenders; share .48, prose 41 | YES | YES | NO |
| Financing | 3 | KEPT | Shazam morph + ⟦S1383⟧ | orb morphs into the two-kinds-of-money sheet; share .69, prose 16 | YES | YES | NO |
| Work | 1 | KEPT | R10 + Q157 push grid | plan-room grid, Flip push on open; share .76, 26 controls | YES | YES | NO |
| Work | 2 | KEPT | Q88 3D carousel | turntable of projects; share 1.0, prose 0 | YES | YES | NO |
| Work | 3 | REBUILT | Q161 seamless marquee + 364 | two photo belts; share .69, 26 controls | YES | YES | NO |
| Reviews | 1 | REBUILT | KBF Ledger + Anatomy F5/F12 | 343-stroke tally that can be counted; share .55 | YES | YES | NO |
| Reviews | 2 | REBUILT | ⟦S0687⟧ starfield + Q41 caps | 343 stars assemble "4.8"; share .65 | YES | YES | NO |
| Reviews | 3 | REBUILT | ⟦S1380⟧ dial + ⟦S0928⟧ | calibration dial sprung to 4.8; share .39 | YES | YES | NO |
| Towns | 1 | REBUILT | Q576 For Living map | 104 survey marks, flags on hover/tap/keys; share .71, prose 26 | YES | YES | NO |
| Towns | 2 | KEPT | ⟦S0717⟧ rings | three rings orbit the office; share .42, prose 17 | YES | YES | NO |
| Towns | 3 | KEPT | Anatomy F3 + 310 Madoka | type a town, the road sign answers; share .38, prose 16 | YES | YES | NO |
| Consult | 1 | KEPT | R21 + 348 + 310 | clipboard work order, progress-ring submit; share .47, 14 controls | YES | YES | NO |
| Consult | 2 | KEPT | Neil Kelly picker | tap rooms on a floor plan, then contact; share .55, 14 controls | YES | YES | NO |
| Consult | 3 | KEPT (exception) | Q114 giant CTA + Anatomy §6 | the phone number as the section's hero; **share .18 is below the .35 rule** (see gaps) | YES | YES | NO |

## 4. §12 gate with evidence

All gate output lives in `remodeling/qa/` and is regenerated by the tools in `remodeling/src/tools/`.

1. **Facts.** `gate-checks.txt`: 17 licence tokens, all `CBC1265280`; 7 full credential statements, all verbatim "Florida Certified Building Contractor, licence CBC1265280"; printed line "Licensed, bonded & insured · CBC1265280" present; "4.8" ×12 and "343" ×15; other ratings 0; reviewer names 0; quotation marks 0; em dashes 0. JSON-LD carries the same 4.8 / 343.
2. **Verdict.** Hero V2 before/after `hero2-before-after.jpg`; V1/V3 rows above; proof line in the first screen of all three heroes at 1440 and 375 (`gate-checks.txt` lines 10–15).
3. **Not a document.** Centrepiece named per version in §3; measures in `v2-audit-after-rebuild.txt`.
4. **Interaction table.**
   - Coverage: `gate-rxcheck.txt`, 273 of 273 controls have their own reaction.
   - 1440: 239 tested, 5 flagged; 375: 254 tested, 2 flagged (`gate-interaction-*.txt`). Flags were reproduced by hand before acting.
   - One flag was real and is fixed: Financing V3's Close sat under a column on phones (commit c00ad66).
   - The rest are test-timing artifacts; the hand probe logs hover on → click beat → clear for each (PROGRESS "§12 gate v2").
5. **Banned patterns.**
   - Weight-trick tweens: 0.
   - Before/after pair tabs: 4 distinct (maximum 4).
   - Three different references per section: §3 table.
6. **Traceability audit.** Every version has a TRACEABILITY row. Three references were picked at random (seed 20261030), reopened and compared with the code:
   - Work V1 / Q157: Flip state → grid placement change → Flip.from.
   - Before/after V3 / Eleos: yPercent 0 → −100, stagger .06, ease (0.625, 0.05, 0, 1), .8s, exactly as recorded.
   - Services V3 / Q91: each tool's action bound to click/tap and focus, not hover only, as the entry requires.

   All three mechanisms are confirmed.
7. **Switchers and forms.**
   - Switch cycle: 30 switches, wrong version shown 0, ScrollTriggers 58 → 58, errors 0.
   - All three consult forms reject an empty submit (6 / 5 / 4 errors, 0 mails) and send one valid mail to `Sales@elbazconstruction.com`.
   - The Towns V3 checker answers both on-list and off-list towns.
8. **Screenshots.** Every section × version at 1440 and 375: `remodeling/qa/final-1440.jpg` and `final-375.jpg` (contact sheets), single frames in `remodeling/qa/final-shots/`.
9. **Runtime.**
   - Scroll QA (`gate-scroll.txt`), 1440 and 375, motion on and reduced: console errors 0, horizontal overflow 0, stuck hidden elements 0.
   - Hygiene (`hygiene.txt`): overflow 0 at 320 / 375 / 768 / 1024 / 1440 for all 30 versions; duplicate ids 0; one exposed h1; content readable with JavaScript off; phone inputs ≥ 16 px; targets ≥ 24 px; forced colours without errors; console 0.
   - Script ids: 8 checked, 0 missing.
   - Companion (`v2-buddyqa.txt`): 162 desktop checks, 0 fails; touch and reduced motion turn it off.
10. **Weight.** 3,858,286 B ≤ 3,865,525 B; code vs media in §1.

## 5. Flags, conflicts, gaps

- **Code weight is over the bank's F18 range.** F18 cites 50–330 KB of code for a winning trade page. This file carries 804 KB of code. That covers 30 designs in one file (3 per section), 272 KB of libraries, and a reaction drawing for 273 controls. Only the libraries the sections call are inlined; Three.js is not shipped. A single-design page built from this source would land near a third of that. Not fixed: the brief requires all 30 versions in one file.
- **Consult V3 centre share .18.** This is below the .35 rule. The phone number is the centrepiece and the call-back form sits outside it by design. Prose is 43 words and it reacts to the pointer. Recorded as an exception, not a pass.
- **Hero V2 keeps its pinned zoom.** §4 bans pinned scenes, but §3B (owner keeper, "preserve exactly") outranks §4. Scroll QA counts that one pin spacer at 1440 with motion on; it releases cleanly and is absent under reduced motion.
- **Motion durations.** Reveals, hovers and UI transitions are dosed .15–.3 s. Several centrepiece mechanisms keep their reference's own timing (Eleos shutters .8 s, Flip push .45 s, Q54 route scrubbed to scroll). Shortening them would break the reference's intent.
- **Self-running motion is capped under 5 s.** Services V3 on phones, Financing V2 flow, Consult V3 handset and Proof V3 focus each now stop after under 5 s per visit. Towns V2 rings and Work V3 belts run on but carry a pause control.
- **Page length.** About 13 screens at 1440×900 (bank note: service sites run 8–12), because every section is an immersive centrepiece. Reported, not changed.
- **Address in two forms.** FACTS.md prints "#310" (site) and "Suite 310" (JSON-LD). Both are kept as published.
- **Late Phase-1 record.** The v2 Phase-1 verdict checklist was referenced at f7046fe but only written into PROGRESS.md during the gate. Its measures are unchanged from that commit.
- **Interaction test.** The automated table still flags five desktop rows whose own job moves or relabels them mid-test. Each was verified by a hand probe; the tool is not yet able to pass them alone.
- **Not done (out of scope):** inner pages (§1 rule 14).
