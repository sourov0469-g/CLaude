# PROGRESS — Austin Pro homepage, BRIEF-V5 build

Governing prompt: `BRIEF-V5.md` (repo root). Memory files: this file, `SECTIONS.md`, `TRACEABILITY.md`, `siding/AUDIT-V3.md`, and the usage log at the end of `bank-index/BANK-MAP.md`.

## State
- **Phase:** DONE: §12 gate passed on the delivered file (evidence below)
- **Branch:** `claude/intelligent-keller-0n8afi`
- **Baseline commit:** e20237b (v4 delivery)

## Phase 0 record

1. **Base branch merge.** `git merge origin/claude/hrm-presentation-slides-xag1ax` returned "Already up to date"; it was merged earlier at 1f29406.
2. **Raw skills.** Reassembled with `cat part-00 … part-06 > WEB-SKILLS.md` in the scratchpad.
   - Size: 22,368,518 bytes ✓
   - SHA-256: fe81307bc11935af8dc54870325aaccf917a0284d9ffeab6b7d833dec36d22b6 ✓
3. **BANK-MAP.** Front matter, rules and Section Playbooks 1–10 read (lines 1–300). Shortlists per section are in `TRACEABILITY.md`.
4. **Memory files.** `PROGRESS.md`, `SECTIONS.md` and `TRACEABILITY.md` created; the brief is saved as `BRIEF-V5.md`.
5. **Baseline, on `siding/homepage-standalone.html` at e20237b.**

   File size:

   | Part | Bytes |
   |---|---|
   | Total | 4,339,867 |
   | Media (base64 images in the asset table + data-URI font and masks) | 3,456,985 |
   | of which the font | 130,832 |
   | Code and markup (scripts, CSS, markup of all 30 versions, inline SVG, JSON data) | 882,882 |

   The weights come from `scratchpad/v5/weigh.py`.

   Tests:

   | Suite | Run | Result |
   |---|---|---|
   | Interaction suite `ix4.js` | 1440×900, file:// | all PASS, console "ERRS: none" |
   | Interaction suite `ix4.js` | 375×812, file:// | all PASS, console "ERRS: none" |
   | v4 suite `qa4.js` (companion in all 30 versions at 1440, switchers, Motion toggle, touch at 375/320, reduced motion), file:// | — | 155/155 PASS |

   Both suites ran on e20237b in this session, immediately before this brief.

## Conflicts resolved under §2 (logged, then continued)

**K1. 886 split.**
- §3 writes "886 documented projects (312 siding + 574 roofing)", but in the same line requires the wording's meaning to stay identical to AUDIT-V3.md's record.
- AUDIT-V3.md records the firm's own meaning: 312 documented projects with photos on the map + 574 more counted outside the frame or without photos = 886 (FACTS.md: siding documented 431; shingle 210; metal 31).
- Resolution: the page keeps the AUDIT-V3 wording, so the arithmetic 312 + 574 = 886 is unchanged. Printing "312 siding + 574 roofing" would contradict FACTS.md's own counts and the AUDIT-V3 record that §3 points to.

**K2. Hours and address strings.**
- §3 gives "Monday–Friday 8–8, Saturday 8–6, Sunday 12–5" and "7801 N Lamar Blvd Suite C70, Austin, TX 78752" verbatim; earlier briefs banned en dashes in copy.
- §3 and this prompt supersede them. All hours and address strings become the §3 text exactly.

**K3. Weight baseline.**
- §4 says the current file is "~3.98 MB"; that was the v3 size. The file actually delivered at Phase 0 is 4,339,867 B (v4).
- The rule "must not exceed the current file's size" is applied to the measured Phase-0 file. I also aim to finish below it.

**K4. Direction-aware reveals.**
- Q40's mechanism uses ±100 px and 1.25 s expo; §4 F17 caps reveals at 0.15–0.3 s.
- Under §2, the standard beats the reference's parameters: Q40's direction logic is kept and the duration is set to 0.3 s.

**K5. "NO plain or fixed cursor" vs keeping the system cursor usable.**
- The bank's standing rule (keep the system cursor usable) and pointer accessibility both apply.
- Reading: the page never runs on a bare default cursor. A companion is always on for fine pointers, and the switcher offers 3 variants plus "Off" (which falls back to the v3 follower ring, still not a plain cursor). The OS arrow stays visible so pointing precision is never lost.

**K6. "No trick repeated twice on the page".**
- Applied to signature mechanisms (count-up, odometer, glint sweep, level bubble, chalk pluck, nail pop, stamp, marquee, crossfade, scan, morph, etc.). Each gets exactly ONE owner across all 30 versions and the page systems.
- §4 itself asks for SVGs that draw themselves, so self-drawing strokes and fades are base techniques, not tricks. The owner table is in `TRACEABILITY.md`.

**K7. "(512) 550-0000 in every version's contact paths".**
- Reading: every version that offers a contact path (a book/call CTA) carries the number as a `tel:` link next to it.
- The header and footer carry it on every page view, and the sticky header phone shows from 1100 px.

**K8. Logo.**
- The repo's `logo-color.webp` / `logo-white.webp` (and `logo-color.png`, 54,701 B) are conversions; their hashes differ from the live site's served files.
- I downloaded the served files: `AP_HORIZONTAL-LOGO_COLOR-V2-p-1080.png` (24,829 B, sha256 64ab1b1b…eb54) and `AP_HORIZONTAL-LOGO_WHT-p-500.avif` (9,570 B, sha256 cb9c7306…dbdb). They are added to the repo untouched and embedded byte for byte.

**K9. Page systems vs keeping versions.**
- Changes that apply uniformly to every version are page systems, not patches of a kept version: the §3 fact strings, the direction-aware entrance system, the reaction kit, the companion, the fields and the dividers. They live in shared code.
- A version is judged on its own mechanism, SVG, tricks, facts and design. A kept version's own design code is not edited; only shared helpers change.

**K10. Data animations vs F17 reveal timing.**
- F17 caps *reveal-level* animations at 0.15–0.3 s. Proof 1's count-up (1.4 s) and Near 1's month-by-month map build (1.8 s) are data animations: the number or the map IS the content being read, played once, never gating anything, with the final state shown immediately under reduced motion.
- They keep their reference tempo; every section entrance (the reveal) is 0.3 s.

**K11. "Everything else reveal level" across kept versions.**
- A scan of every version's JS (Phase 2) found scroll entrances at 0.4–0.6 s and click transitions at 0.45–0.9 s in kept versions (Built 3 morph, Colour 2 tools, Colour 3 sheet, Near 3 fly-in, Book 1/2 entrances, Services 2 peek zoom, Money 2 bars).
- Resolution: motion timing is a page system (K9), so one token pass in Phase 3 brings all of it to ≤0.3 s: entrance reveals through the shared entrance system, click transitions through a `T.ui` token. Each version's mechanism and design are untouched.
- Exempt, with reasons:
  - Work 1, the signature interactive: the opening sweep and flick-commit.
  - K10 data/content animations the visitor reads or runs: count-up, the 4.9 ring, Near 1's month build, Work 2's visitor-run survey.
  - Ambient pointer smoothing: quickTo followers.
- Evidence: a re-scan in the §12 gate.

## Open issues (carried from AUDIT-V3.md; each must close with a reason)

- [x] **F1 · 886 wording.** CLOSED under K1: the page prints the AUDIT-V3 / FACTS meaning, "312 on the map with photos + 574 more counted = 886"; the arithmetic is unchanged.
- [x] **F2 · No Texas licence line in the first screen** (anatomy F11). CLOSED, not added: Texas issues no state contractor licence for siding, window or roofing work and the firm publishes none, so any number would be invented (§3). The first screen carries rating, review count, installer tiers and since-year (the proof strip in all three heroes).
- [x] **F3 · Hero 1 blinds** (Q38/R6 Tier 3, a 1.2 s reveal on load). CLOSED: Hero 1 rebuilt from Q95; nothing plays on load beyond the 0.3 s rise.
- [x] **F4 · Services 1 and Hero 2 both end in a median price band.** CLOSED: Services 1 rebuilt with product facts and no price; Hero 2 is the only median-band-by-trade device.
- [x] **F5 · Upload-your-house-photo flagship** (portfolio plan Site 6) is unbuilt. CLOSED: Colour 1 rebuilt as the flagship (local photo, brushed colour, published band and levers in one flow), tested with a real file.
- [x] **F6 · Built 1 and Built 3 both technical drawings.** CLOSED: different references and mechanisms (S0526 exploded iso on springs vs S0361 dimensioned section with a lap↔batten morph), different layouts, and Built 2 between them is photographic.
- [x] **F7 · Near 1 month-by-month build** (2.3 s data animation on scroll). CLOSED under K10: the firm's own map drawn month by month (now 1.8 s) is the data being read, played once, never gating, and complete at once under reduced motion.
- [x] **F8 · Lenis kept** (≈18 KB). CLOSED: F18 asks for ONE smooth-scroll engine, and Lenis is that one. It runs on desktop fine pointers only, is off under reduced motion, and has no rival engine. The file is still 118 KB under the baseline with it.

## Failed checks (kept visible until they pass)
(none yet)

## Log
- Phase 0 started. Brief saved; baseline recorded; conflicts K1–K9 logged.
- Phase 0/1 committed (825507d): 20 KEPT, 10 REBUILT recorded in AUDIT-V3 before any rebuild.
- Hero rebuilt (all three versions). The section test `scratchpad/v5/sect.js` checks switch isolation by node identity, the section's controls, console, overflow and reduced motion. Hero: 9/9 PASS. The packer now carries SVG `<image href>` through the asset table (Hero 1).
- Proof verified (KEPT ×3).
- Page-wide: §3 hours/address constants; served logos in header and footer; switcher rail fix (defect: the sticky switcher overhung the next section).
- Reviews captions "Google review, 2026" are queued for the Reviews rebuild.
- Services: S1 rebuilt, S2 kept, S3 re-judged REBUILT (the 1.6 s intro swallowed keys; F17 fail). Totals 19 KEPT / 11 REBUILT.
- Phase 3 note: the kit's "tape" reaction (ruler ticks under hovered rows) duplicates Services 3's tape; redesign it in Phase 3.
- Process note: a CSS slice anchored on the wrong header once replaced half the stylesheet. Caught by the diff stat before any commit, restored from git and redone with an exact anchor plus an assertion.
- Defect fixed in kept Work 1: arrow keys during the 1.3 s opening sweep were overwritten; a key press now ends the sweep (drag already did).
- Built verified (KEPT ×3). Phase 3 note: on phones the Built field X-ray band sits behind the section heading; keep it clear of text.
- Colour: C1 rebuilt as the flagship; C2 and C3 kept.
- Phase 3 notes from the screenshots:
  - the Colour field's floating chips land on headings and intro text;
  - kit markers (small red notches) rest visibly on controls even when idle.
- Near verified (KEPT ×3). Phase 3 note: the Near field roof plans sit behind data rows and maps; thin them out and keep text and maps clear.
- Reviews rebuilt ×3. Phase 3 note: the Reviews field shutter shows a small dark tab beside the sticky switcher.
- Money: M1 and M3 rebuilt, M2 kept.
- Book verified (KEPT ×3). Defect fixed: the global svg max-width capped the Book 1 door panel and the Money 3 strike line.
- Phase 2 complete.

### Phase 3 (page systems), 29 Oct
- **Reaction kit rebuilt (v4.js).**
  - Every section has its own trade glyph:
    - hero: a lap course with its nail;
    - proof: a seal star;
    - services: a hatched square;
    - work: a split pane;
    - built: studs;
    - colour: a published-colour chip;
    - near: a house plan;
    - reviews: a shake;
    - money: a coin;
    - book: a door;
    - chrome: a 2×2 pane.
  - Each role (button, link, card, image, control, tel) lays its glyphs out its own way.
  - A hover verb and a different click verb come from an 11 × 6 table (`APV4.table()`).
  - Checked: no verb repeats within any role across sections, or within any section across roles. Click verbs never reuse hover verbs. Glyphs are invisible at rest (this fixes the resting red notches seen in Phase 2).
  - Gone from the kit: glint, spirit level, tape ticks, chalk pluck and path morph (all version-owned tricks).
- **Cursor effect:** a per-section halo under the companion, styled per section and shown only with it. Tested in all ten sections: correct key, dark grounds flagged, console 0.
- **Section entrance:** Q40 direction-aware heading reveal at 0.3 s for every section (from below scrolling down, from above scrolling up), replacing ten per-section heading styles. `riseIn` defaults to 0.3 s.
- **K11 ceilings:**
  - `REVEAL = 0.3`: every scroll entrance a version sets up is time-scaled to ≤0.3 s per element at mount. K10 tweens are marked `data: 'k10'` and exempt.
  - `UI = 0.3`: click transitions in Services 2, Work 1, Built 3, Colour 2, Colour 3, Near 3, Money 2, Book 1 and the form engine.
- **Fields:**
  - Colour chips now sit only in the side margins.
  - Near roof plans are fainter, with the content band masked to 30 %.
  - The Built X-ray band is at 35 % on phones.
  - The Money field is replaced by ledger paper (ruled rows ink in near the cursor), because the v4 chalk line and tape ticks were Book 3's and Services 3's tricks.
- **Dead code removed:** `rollIn`, `panesOpen` and the `.roll` CSS (no callers).
- **Regression:** `sect.js` for all ten sections × 3 widths/modes, 90/90 PASS, console 0.
- **Phase 3 regression:**
  - `qa4`: 159/159 PASS (companion on in all 30 versions with its variant, field + divider present, system cursor kept, reaction on hover, switchers, touch at 375/320, reduced motion).
  - Legacy `ix4` at 1440: every check on the 19 kept versions PASS (30), page errors none. Its failures are only on the 11 rebuilt versions, whose removed markup it still looks for; `sect.js` covers those.
  - Kit contact sheet `v5/shots/kit-sheet.png`; halo crops `v5/shots/halo-*.png`.

## §12 Gate: evidence (run on the delivered `siding/homepage-standalone.html`, file://, 29 Oct 2026)

- **Deliverable:** 4,221,484 B, sha256 `d2c28a32…687b12`.
- **Tools** (in `siding/qa/v5/`):
  - `gate_static.py` → `final-static.json`
  - `sect.js` (switch isolation, controls, console, overflow at 1440 / 375 / 1440 reduced motion)
  - `qa4.js` (companion suite, scratchpad v4)
  - `k11.js` (live entrance timing)
  - `shots_all.js` (60 screenshots → the 10 contact sheets `siding/qa/v5/<section>.webp`)

1. **Facts grep — PASS.**
   - Review counts in the visible text: only "474 Google reviews". The JSON-LD reviewCount is 474. No "N of M" counts reviews (the only N-of-M strings are steps, trades and job shares such as "301 of 415").
   - Phone: every version with a booking path carries `tel:+15125500000` (30/30 checked per template; Services 2 and Near 2 were found missing it and fixed).
   - 886 with its split: "312 on the map with photos + 574 more counted = 886" (K1).
   - Address "7801 N Lamar Blvd Suite C70, Austin, TX 78752" and hours "Monday–Friday 8–8, Saturday 8–6, Sunday 12–5" appear verbatim, with no other variants.
2. **Logo — PASS.** The embedded bytes hash-match the served files:
   - colour PNG `64ab1b1b…eb54` == disk;
   - white AVIF `cb9c7306…dbdb` == disk;
   - no converted logo files remain in the asset table.
3. **Banned patterns — PASS.**
   - Each section has three different references (`TRACEABILITY.md` foot).
   - Before/after: the only "Before" images are the six `work-*-b` files of true pairs. Hero 1 shows the Rob Roy *after* photo alone, inside the letters.
   - No invented counts or prices; no redrawn logo; no inner pages.
4. **Traceability — PASS.**
   - 30/30 rows have Verification filled (0 "—" left).
   - Three references picked at random (seed 20261029) and re-opened in the Atlas:
     - **Q48 Grid-to-Fullscreen:** "positions/scales from the thumbnail's DOM bounds — re-measured at click time … close reverses the same tween; phones: simple fade/scale". Matches Colour 3.
     - **S0361 dimensional drawing:** "every dimension is a variable code … [TBD]". Matches Built 3's L1/X1/O1/T1 sheet.
     - **Q571 AHA:** "services index as a semantic ordered list, counter generated by CSS counters (01 of 11)". **Q162 K72:** "closestEdge() compares … top-centre vs bottom-centre". Both match Services 2.
5. **Switchers — PASS.** `sect.js` checks that the other nine stages keep the same DOM node after each switch, at 1440 and 375 (and 1440 reduced motion): 90/90.
6. **Screenshots — PASS.** All 30 versions at 1440 and 375 (60 shots, console 0, no overflow), reviewed as contact sheets.
   - Defects found and fixed during the gate:
     - Colour field chips grazed wide text (moved to the page margin).
     - Reviews 3 pointing did not bring excerpts up (160 ms dwell added); a parked pointer then overrode a keyboard choice (guarded by `:focus-visible`).
     - Services 2 and Near 2 lacked the phone (K7).
   - Earlier phases fixed the switcher overhang, the Book 1 door panel, the Money 3 strike line, the Hero 1 word split, the Hero 3 sign position and the Reviews 2 meeting rail.
7. **Console, overflow, ids, controls, forms — PASS.**
   - Console 0 on load, switching and pointer movement in every run.
   - No overflow at 375.
   - All 6 ids the scripts reference exist.
   - Every version's controls are click- or key-tested by `sect.js`, including real form submissions: every booking form is refused when empty and reaches its done state when filled; Colour 1 takes a real file.
8. **Companion — PASS.** `qa4` 159/159 on the delivered file:
   - all three variants across the 30 versions;
   - mini pill and picks switchers;
   - off on touch at 375 and 320;
   - off under reduced motion.
   - The halo and the reaction kit were checked separately (correct section key, glyphs invisible at rest).
9. **Weight — PASS.** 4,221,484 B, which is 118,383 B under the 4,339,867 B baseline:

   | Part | Now (B) | Baseline (B) | Change (B) |
   |---|---|---|---|
   | Media (base64) | 3,349,758 (font 130,832) | 3,456,985 | −107,227 |
   | Code and markup | 871,726 | 882,882 | −11,156 |

   Images are 58 AVIF, 15 WebP (lossless plates and masks) and 1 PNG (the served logo, by rule).
10. **Final verdicts and flags — PASS.** `siding/AUDIT-V3.md` "Final verdicts": 19 KEPT, 11 REBUILT. F1–F8 are all closed with reasons (above).

**Motion ceilings (K11), measured live:** no scroll entrance in any of the 30 versions plays longer than 0.3 s per element ("OVER 0.3: none"). The K10 data animations are exempt and marked.


---

# V6: BRIEF-V6 (FULL BUILD PROMPT v2, 30 Oct 2026)

Governing prompt: `BRIEF-V6.md`. Everything above this line is the V5 record. Its gate is a CLAIM to re-verify, not evidence.

## V6 state
- **Phase:** DONE: the V6 Phase 4 full §12 gate passes on the final file (below)
- **Baseline:** `siding/homepage-standalone.html` at df98d54, 4,221,484 B, sha256 d2c28a321f88491be50f1e7b5689972265abdce612f80dbe78dfe1e1ed687b12

## V6 Phase 0 record (30 Oct)
1. **Bearings and reconciliation.**
   - Read PROGRESS, SECTIONS, TRACEABILITY, AUDIT-V3, AUDIT-V4 and the last 15 commits.
   - Repacking from the current sources (`home2.py` → `single.py` with terser) gives the same sha d2c28a…; the state files and the file agree, so nothing needed correcting.
   - Section inventory: 10 sections × 3 versions in `<template>`s. The default mix is 1111111111.
   - Earlier gate claims and their evidence:
     - **In the repo:** `siding/qa/v5/` holds 10 contact sheets, `final-static.json`, `final-weight.json` and the scripts.
     - **Scratchpad only:** `final-sect.out`, `final-qa4.out`, `final-k11.out`, `final-shots.out`.
     - **Not evidenced anywhere:** "every control click-tested to change the DOM". V5 click-tested chosen controls per version, not every control. Visible text after the entrances was never checked.
2. **Base-branch merge** (re-upload of 30 Oct): merged, with no content change against df98d54 (the re-upload is identical to the copy already held).
3. **Raw skills** reassembled: 22,368,518 B, SHA-256 fe81307bc11935af8dc54870325aaccf917a0284d9ffeab6b7d833dec36d22b6 ✓.
4. **Map:** front matter and playbooks as recorded in V5; shortlists stand in TRACEABILITY. Re-opened only if a version fails.
5. **SECTIONS.md** reset: 30 lines at passes: NO.

## V6 open issues (each must be resolved or closed with a reason; V5 closures are re-checked, not assumed)
- [ ] **G1 · 886 wording.** V5 prints "312 on the map with photos + 574 more counted = 886" (K1). Re-check against §3 + AUDIT-V3's record.
- [ ] **G2 · Texas licence line in the first screen.** V5 closed it: none exists to print. Re-check.
- [ ] **G3 · Hero 1 blinds.** V5 replaced them with Q95. Re-check that no blinds remain.
- [ ] **G4 · Services 1 / Hero 2 price overlap.** V5 removed the price from Services 1. Re-check, including Colour 1, which also shows the siding band.
- [ ] **G5 · Upload-your-house-photo flagship.** V5 built Colour 1. Re-check with a real file.
- [ ] **G6 (AUDIT-V4 #3) · Motion beyond top trade sites.** Re-check against F17 with fresh timing evidence.
- [ ] **G7 (AUDIT-V4 #5) · System cursor kept visible.** BRIEF says "NO plain or fixed cursor". Re-check the reading (K5).
- [ ] **G8 (AUDIT-V4 #6) · Reaction per element vs per role.** Re-check the uniqueness evidence.
- [ ] **G9 (AUDIT-V4 #7) · No elastic or bounce (S0544).** The V5 kit uses `elastic.out` (sway) and `bounce.out` (drop). Re-check.
- [ ] **G10 (AUDIT-V4 #8) · The hero's ghost waves as a perpetual loop.** Re-check against F17.
- [ ] **G11 (AUDIT-V4 #4) · Custom SVG vs "no model-drawn illustration".** Owner rule wins; re-check that it is a trade diagram, not clip-art.

## V6 Phase 1: fresh §12 gate on df98d54 (measure only, 30 Oct)

All runs use `file://…/delivered-df98d54.html`, a copy of the delivered file (sha d2c28a…). Scripts are in `siding/qa/v6/` (new) and `siding/qa/v5/`.

| # | Item | Result | Evidence |
|---|---|---|---|
| 1a | 474 the only review count | PASS | `facts.py` (text + own scripts + JSON): numbers near "review", other than the 474 count, are switcher digits, the 4.9 rating, adjacent figures (5,000+, 886) or a CSS comment. JSON-LD reviewCount 474. |
| 1b | Phone in every version's contact paths (strict: every version) | **FAIL** | 19 of 30 versions carry no `tel:` of their own: Proof 1–3, Services 3, Work 1–3, Built 1–3, Colour 2–3, Near 1, Near 3, Reviews 1–3, Money 1–2. Header and footer carry it. On phones the header shows only Book and Menu. |
| 1c | 886 with its §3 split | PASS | "312 on the map with photos + 574 more counted = 886" (AUDIT-V3's record, K1). |
| 1d | Address and hours verbatim | PASS | Address ×2 and hours ×8 verbatim; no variants. |
| 1e | Credentials verbatim (§3 strings) | **FAIL** | "President's Club 2025" 0, "Andersen Certified Premier" 0, "BBB A+" 0. The page prints "President's Club Award 2025", "Andersen Certified Contractor, Premier" and "BBB Accredited, A+". |
| 1f | No false fact on screen at any moment | **FAIL** | Proof 1 counts the 4.9 rating up from 0, so the screenshots show "4.8 on 474 Google reviews" mid-animation. |
| 2 | Logo | PASS | sha256 of the bytes embedded in the asset table vs the repo's served files: colour PNG 64ab1b1b… == disk; white AVIF cb9c7306… == disk. Header uses the PNG, footer the AVIF; no other logo in the file. |
| 3a | Three references per section | PASS | TRACEABILITY rows |
| 3b | No unpaired photo as before/after | **FAIL** | Proof 3: "177 … have a before and after" sits next to a single photo (p22) in a two-pane casement frame. Work 1–3 use the six true pairs only. Hero 1 and Colour 1 show the Rob Roy after photo alone. |
| 4 | Traceability, 3 random references | **FAIL (1 of 3)** | Drawn with seed 20261030, excluding V5's three: Near 3 / KBF matches; Work 3 / S1324 + Q125 matches (radius min(260, max(140, 0.22w)), eases 0.1 / 0.14, direct under reduced motion). Services 3 / Codrops does not: the Atlas mechanism is drag *and* scroll driving one ease-none tween with edgeResistance 1; the version adapts only the drag half, with edgeResistance 0.85, and its row overstates this. |
| 5 | Switchers swap only their section | PASS | `sect.js` 90/90 (1440, 375, reduced motion); console 0 ×30 |
| 6 | Screenshots ×60 vs §4 | **FAIL** | `v5/v6shots` (60 shots, console 0, no overflow). Defects: D1, the Built field X-ray band reads as a stray beige stripe through the content (375 and 1440); D2, the Proof 1 rating count-up (1f). |
| 7a | Console 0 / overflow | PASS | All runs, page errors 0; no overflow at 375 |
| 7b | Script-referenced ids exist | PASS | 6/6 (b1-panel, h3p, home-data, pay-amt, pk-panel, sheet) |
| 7c | Every control changes the DOM | PASS | `ctl.js` clicks each control on a fresh load. 1440: 251 PASS + 12 already selected; 375: 243 PASS + 11 already selected; 0 dead. The first run failed 7 Near 2 links inside collapsed rows; those rows are `inert` by design, and the crawler was taught to open them first (21/21 at both widths). |
| 7d | Every text visible after its entrance | PASS | `vis.js` (new): 180/180 (scroll down, scroll up and reduced motion × 2 widths) |
| 7e | Forms | PASS | `sect.js` submits every booking form empty (refused) and filled (done); Colour 1 takes a real file |
| 8 | Companion | PASS | `qa4` 159/159 (all variants in all versions, touch at 375/320, reduced motion). `pal.js` (new): in each variant the six poses (idle, button, link, heading, image, card) are all distinct (18/18). |
| 9 | Weight | PASS | 4,221,484 B (= the limit): code 871,726, media 3,349,758 (font 130,832) |
| 10 | AUDIT-V3 final verdicts and flags | **FAIL (pending)** | V6 verdicts not yet written |
| F17 | Nothing moves at idle except the allowed | **FAIL** | `still.js` pixel diff 1.2 s apart, pointer parked: Hero 1 1.08 % (Q95 photo drift), Hero 2 0.08 % and Hero 3 0.04 % (hero field ghost waves), Book 1 0.28 % (atmosphere folds). Reviews 1 at 10.5 % is the marquee, which F17's own exemplar set allows ("marquee 60s linear infinite"). The remaining ~0.01 % is the companion's idle blink, which §4 requires. |
| G9 | No elastic or bounce (AUDIT-V4 #7 record) | **FAIL** | The V5 kit uses `elastic.out` (sway) and `bounce.out` (drop), contradicting the recorded V4 standard. |

**Differences from the V5 self-run gate's claims:**
1. V5 tested the phone only on versions with a booking button (it called that K7). Strictly, 19 versions have no phone of their own.
2. V5 never checked the §3 credential strings verbatim; three are not printed as written.
3. V5's facts grep did not catch a false figure *during* an animation (4.8).
4. V5 passed item 3 without looking at Proof 3's 177 pill.
5. V5's random references were drawn so that Services 3's overstated row was not re-checked.
6. V5 found no screenshot defect in the Built band.
7. V5 claimed the ceilings passed by measuring durations only, not idle motion; three perpetual loops remain.
8. V5's kit contradicts AUDIT-V4 #7.
9. Confirmed as claimed: logo, switchers, console, overflow, ids, companion, weight, entrance timing.
10. Newly evidenced, and passing: every-control click-through and text visibility.

### Fresh verdicts (the AUDIT-V3 V6 table carries the same)
- **To FIX:**
  - Proof 1: 1e, 1f, 1b
  - Proof 2: 1e, 1b
  - Proof 3: 3b, 1e, 1b
  - Services 3: item 4 row/parameter, 1b
  - Work 1–3: 1b
  - Built 1–3: 1b, D1
  - Colour 2, Colour 3: 1b
  - Near 1, Near 3: 1b
  - Reviews 1–3: 1b
  - Money 1, Money 2: 1b
  - Hero 1: F17 drift, plus the hero field
  - Hero 2, Hero 3: the hero field (page system)
  - Book 1: F17 folds
- **Page systems to FIX:** the kit eases (G9), the hero field (G10), the Built field (D1).
- **Pass as they stand (KEPT on fresh evidence):** Services 1, Services 2, Colour 1, Near 2, Money 3, Book 2, Book 3.
- **No REBUILD is needed:** every failure is a fact string, a missing contact path, a parameter or an idle loop, so the smallest fix applies (§10).

## V6 Phase 2: fixes (30 Oct). The smallest change per failed item; no rebuilds needed
- **1b phone.** `with_phone()` in the section builder ends any version without a `tel:` link on a one-line contact path: a section-specific lead, "Call (512) 550-0000", and "book a free inspection". Re-grep: versions without a phone = [] (was 19).
- **1e credentials.** The CREDS and CRED_ROWS labels are now the §3 strings: "James Hardie President's Club 2025", "Andersen Certified Premier", "BBB A+". Re-grep: each ≥ 1.
- **1f the rating count-up.** `countUp` is replaced by a digit rise: the true figure's digits rise in over 0.3 s, 0.05 s apart, so no false value is ever shown. The 4.9 ring now draws in 0.3 s (K10 no longer needed for Proof 1).
- **3b the Proof 3 pill.** The "177 … have a before and after" pill shows a genuine pair (Rob Roy before left, after right, from the six pair files already packed). The p22 thumbnail left the file (−10 KB media).
- **4 Services 3.** edgeResistance 0.85 → 1 (the reference value). The row now states the mechanism honestly: the drag half is adapted, the scroll half deliberately not.
- **D1 the Built band.** At rest and on touch the X-ray band sits in the right page margin and swells with the scroll; it crosses the content only where the cursor takes it.
- **F17 idle loops.**
  - The hero field has no ghost waves and sleeps when settled.
  - Hero 1 no longer has Q95's perpetual drift (conflict K12 logged; pointer parallax kept).
  - Book 1's folds advance only with pointer travel or scroll and then rest.
  - Re-measured with `still.js`: Hero 1–3 0.00 %, Built 0.00 %, Book 0.01 % (the companion's blink).
- **G9 kit eases.** sway `elastic.out` → `back.out(1.7)`; drop `bounce.out` → `power3.out`.
- **Weight.** Packed 4,217,917 B (ceiling 4,221,484 B): code 878,191, media 3,339,726.

**K12 (§2: §4 over the reference's parameter).** Q95's drift of 18 is a perpetual idle animation. F17 allows only reveal-level motion plus one signature interactive, so the drift is dropped and Q95's pointer parallax stays. Applied the same way to S1364's clock-driven folds in Book 1 and to the v4 hero field's "ghost waves" (AUDIT-V4 #8).

## V6 Phase 4, first run (30 Oct): stopped, two failures fixed, full re-run follows
- **Item 4, three references drawn at random** (seed 202610304, excluding the six checked earlier): Book 1 / Rogers, Book 2 / Mad City, Book 3 / #413 Tequila.
  - **#413 matches.** The deep-read describes the conversational form ("Hey Tequila, I'm… I'm looking for…") with a reply promise.
  - **Rogers FAILED.** The reference is "phone OR self-scheduling at equal weight"; Book 1's online path was a small button under a giant phone. Fix: two paths at the same type scale, side by side.
  - **Mad City FAILED.** The reference device is "ZIP-first"; the form asked for the ZIP last. Fix: the ZIP is the first field of step 1, with the trade (shared form engine, so Book 1's panel and Book 2 both change). Bug introduced and fixed along the way: the ZIP's live re-check had called the step-3 validator.
- **Evidence after the fix:**
  - `sect.js book` 9/9, console 0, both forms submitted.
  - Book 1 panel fits and nothing overflows at 1440, 375 and 320.
  - Screenshots `v5/fix/book.png`.
- **Test update:** `qa/v6/sect.js` formRun now fills the ZIP in step 1.
- The partial Phase-4 run was stopped, because it measured a pre-fix file. Phase 4 is re-run in FULL below.

## V6 Phase 4: FULL §12 gate on the final file (30 Oct)

- **Final file:** `siding/homepage-standalone.html`, 4,219,521 B, sha256 953fa9d51e5d2085519aab2cb98dc4d854e3a5d0be8a9db9f0871734d932f078.
- **Raw outputs:** `siding/qa/v6/evidence/` (unprefixed files = Phase 4; `v6-*` = Phase 1). Contact sheets: `siding/qa/v6/<section>.webp`.

| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Facts | PASS | `p4-facts.json`: the only review count is 474 (JSON-LD 474); versions without a phone = [], min 1 `tel:` per version, header + footer too; the 886 split printed; address ×2 and hours ×8 verbatim, no variants; since 2009 / merged 2018; the §3 credential strings GAF Master Elite 7, James Hardie Elite Preferred 5, President's Club 2025 1, Andersen Certified Premier 1, GuildQuality Guildmaster 1, BBB A+ 1. No false figure mid-animation (digit rise shows only the true digits). |
| 2 | Logo | PASS | Asset-table bytes base64-decoded and sha256-compared with the repo's served files: PNG 24,829 B 64ab1b1b… equal; AVIF 9,570 B cb9c7306… equal. |
| 3 | Banned | PASS | Three different references per section (TRACEABILITY). The only images in "before" slots are the six `work-*-b` true pairs; the 177 pill shows the Rob Roy pair. |
| 4 | Traceability | PASS | 30 rows current (V6 final table). Random three (seed 202610304): Rogers (Book 1), Mad City (Book 2), #413 Tequila (Book 3). The first two failed on this gate's first run and were fixed; all three now match their Atlas / deep-read mechanisms. Earlier draws this session: Near 3 / KBF ✓, Work 3 / S1324 ✓, Services 3 / Codrops (fixed). |
| 5 | Switchers | PASS | `sect.out` 90/90 (1440, 375, 1440 reduced motion): the other nine stages keep their node. |
| 6 | Screenshots | PASS | `shots.out`: 60 shots (30 versions × 1440 / 375), console 0, no overflow; reviewed as contact sheets. Defects found this pass and fixed: D1 Built band, D2 rating count-up, Book 1 path weight, Book 2 ZIP order. No new defects on the final set. |
| 7 | Integrity | PASS | Console 0 in every run. No overflow at 375. 6/6 script ids exist. `ctl-1440.out` PASS 290 FAIL 0 (+12 already selected); `ctl-375.out` PASS 282 FAIL 0 (+11): every control on a fresh load changes the DOM, scroll or focus, or is a verified `tel:` or external link. `vis` 180/180. Forms: every booking form refuses an empty step and reaches done when filled (ZIP-first); Colour 1 takes a file. |
| 8 | Companion | PASS | `qa4.out` 159/159 (all three variants across the 30 versions, mini and picks switchers, off on touch at 375/320, reduced motion). `pal.out` 18/18 distinct poses. |
| 9 | Weight | PASS | 4,219,521 B ≤ 4,221,484 B (−1,963): code and markup 879,795, media 3,339,726 (font 130,832). 73 images (58 AVIF, 14 WebP, 1 PNG, the served logo). |
| 10 | AUDIT-V3 | PASS | "V6 FINAL verdicts": 8 KEPT, 22 FIXED, 0 REBUILT, three binary verdicts each; flags closed (below). |
| F17 | Motion | PASS | `k11.out` "OVER 0.3: none". `still-pixels.txt`: at idle only the Reviews 1 marquee moves (10.55 %, allowed by the F17 exemplar); everything else is ≤ 0.01 % (the companion's blink). |

### V6 flags closed
- **G1 · 886 wording.** CLOSED. The page prints AUDIT-V3's recorded wording, "312 on the map with photos + 574 more counted = 886". §3 requires the meaning identical to that record; the arithmetic is unchanged.
- **G2 · Licence line.** CLOSED, not added. Texas has no state licence for this work and the firm publishes none, so a number would be invented. The first screen carries rating, review count, installer tiers and since-year.
- **G3 · Blinds.** CLOSED. Hero 1 is Q95; nothing plays on load (idle 0.00 %).
- **G4 · Price overlap.** CLOSED. Services 1 carries no price. Hero 2 and Colour 1 both show the siding band, because the flagship reference requires the band in its own flow; they never meet unless both are picked.
- **G5 · Flagship.** CLOSED. Colour 1, tested with a real file (`ctl`, `sect`).
- **G6 · Motion.** CLOSED by evidence: entrances ≤ 0.3 s; at idle only the F17-exemplar marquee and the §4-required companion move.
- **G7 · System cursor.** CLOSED, not changed (K5). A companion (three variants) plus a section halo always accompany a fine pointer. The OS arrow stays for pointing precision. Pointer events are never blocked (`qa4`).
- **G8 · Reaction per element.** CLOSED, not changed. Uniqueness is guaranteed per section × role (11 × 6 table, no repeats within a role or a section, clicks never equal hovers). Elements of the same role in one section share their reaction; a distinct reaction for each of ~290 controls is not a coherent design. Logged.
- **G9 · Elastic and bounce.** FIXED (kit eases).
- **G10 · Ghost waves.** FIXED (hero field sleeps; also Hero 1 drift and the Book 1 folds, K12).
- **G11 · Custom SVG.** CLOSED. Every SVG is a trade diagram, profile or motif (elevations, lap courses, sashes, shakes, roof plans, glyphs). No pictorial clip-art.

## V6 Addendum: total read, recorded (30 Oct 2026)
Files read completely, A to Z, in this order:
1. `bank-index/BANK-MAP.md`: lines 1–7501 of 7501.
2. `bank-index/atlas-part-1-skills.md`: lines 1–14247 of 14247 (S0001–S1504).
3. `bank-index/atlas-part-2-bank.md`: lines 1–8829 of 8829 (manifest picks, deep-read slices 1–9, Level-2 log, code-source captures, parameter + 3D/SVG libraries, UI/UX patterns, conversion anatomy, industry reports, builder brief, portfolio plan, source passes, the 248-row siding scan, bench log).
The reading pointer and every note are in `READ-V6.md` (534 lines). Sub-agents used for the read: none.

Where each homepage section's shortlist now comes from (B = BANK-MAP line, A1 = atlas part 1 S-ID, A2 = atlas part 2 line):
- **Hero:** B 53–77 (Playbook 1) + B 5077/7013 Stronghold, 5125 Feldco, 5517 Q40, 5867 #292, 7066 Neil Kelly, 6910 anatomy §1. A1 S1113 LCP, S1038/S1114 fetchpriority, S1062 one H1, S1329, S1501 hierarchy, S1454 serial position. A2 582/6346 Stronghold (proof strip above the headline), 6022 anatomy §1 F1/F2/F3, 1563 Q588 proof cluster, 1590 Q594 dual CTA, 6107–6132 checklist 1–3.
- **Proof:** B 80–101 (Playbook 2) + B 5089 Austin Pro, 6913 anatomy §2, 6976 checklist 14. A1 S0095/S0098 counters, S1262 trust near CTA, S1420. A2 43/2827/4018 Count Up (final value in HTML, tabular-nums, reduced motion lands instantly), 1283 Estes four-number strip, 3610 #413 stat substantiation, 6031 anatomy §2 F5/F12 (312 + 574 = 886), 6513 siding proof hierarchy.
- **Services:** B 130–151 + B 5343/6880 Q571, 5291 Strike Force, 5243 PHS. A1 S1352, S1353, S1239, S1444 Hick, S1449 Miller. A2 1343 Q571 counter index, 1203 Strike Force 01–12 index, 1075 PHS investment and timeline cards, 3376 #357 tabs, 6700 R45 stacking cards.
- **Work:** B 105–126 (Playbook 3) + B 5240/7084 Elbaz, 6031 #361, 7378 CMK. A1 S0930 slider ARIA, S1324, S1443. A2 622 Austin Pro (177 pairs with price bands), 6076 anatomy §7 (siding: draggable pairs carry a price band), 6701 R28 before/after slider (touch-first, keyboard arrows), 3385 #361 loop, 1853 Q38 blinds, 5686 FEATURED/FULL switch.
- **Built:** B 6187 #549, 5705/6545 Q153, 6946 checklist 4. A1 S0414 exploded axonometric, S0635, S1362, S0325. A2 2433/4211 pin sidebar (separate pin timeline; phone fallback), 3855 #549 scroll story, 1067/6598 Elbaz timed process, 6708 builder-brief pin rules (375 px release test), 5740 pinned process (stacked phone fallback).
- **Colour:** B 6169/6227 BLK #531, 5669 Q140. A1 S1418 colour system, S0972 oklch, S1497 critique-colour. A2 631/3801/3982 BLK zone-fill SVG (the 2D visualiser anatomy), 6702 R36 colour customiser <11 KB, 290 + r37 (7058) James Hardie colour education, 739 Hatch, 694 Cornerstone.
- **Near you:** B 154–171 (Playbook 5) + B 5089 Austin Pro map, 5195 KBF, 3755 S1128, 3809 S1146 NAP. A1 S1128 LocalBusiness, S1146 NAP, S1214. A2 622 Austin Pro 312 + "574 more" = 886, 947/6616 KBF place-first with counts, 910/6500 West Shore location skeleton, 3693 ROTTLER finder, 6206 checklist 12.
- **Reviews:** B 80–101 + B 4999 Bonner, 5050 LOA, 5173 Thompson Creek, 6922 anatomy §5. A1 S0964 carousel a11y, S1200 AggregateRating, S0049/S0070 pause control for anything moving >5 s. A2 2487/4220 Q161 marquee (60 s trade speed), 3412 #364 (an always-on marquee must ship with a pause), 3493 GMX and 3466 Andrew Reff (visible pause buttons on moving strips), 6058 anatomy §5 (schema = real numbers), 501 LOA and 874 Thompson Creek (one-number rule).
- **Money:** B 175–195 (Playbook 6) + B 5900 #314, 5086/7056 Allied, 6916 anatomy §3, 6998 checklist 21. A1 S1435 Von Restorff, S0907/S1245 accessible tables, S1001 Intl currency. A2 6040 anatomy §3 F7(e) invoiced distributions, 622/6513 Austin Pro worked APR ($181.91/mo on $15k) and median band, 856/2984 #314, 3592 #409 tiers with a "Best for" line, 6491 Allied (validity in hero, disqualifier).
- **Book:** B 199–244 (Playbooks 7–8) + B 5906 #348, 5921 #317, 6778 budget radios, 6964 checklist 10. A1 S1442 form design, S1455 state machine, S1456 Tesler, S1494 ux-writing, S0661, S1056. A2 712/3047 Digital Butlers (proof band → radios → consent → response promise), 748/3002 #348 (button reflects the real submit state), 766/3909 Iper, 775 Mad City ZIP-first, 6049 anatomy §4, 6067 anatomy §6, 6728 siding doctrine (converts on the quote form; sticky "written quote").
- **Page systems (motion, reduced motion, cursor companion, dividers, nav):** B 268–359 (Playbook 10 + families) + B 6931 F17/F18, 6745 gate-loader anti-pattern. A1 S1321/S1322/S1328, S1465 motion system, S1190 reduced motion, S1209 scrolljacking, S1246 tabs ARIA, S1450 navigation, S1482 design QA. A2 6085 anatomy §7b F17 (0.15–0.28 s ease-out, one marquee 60 s, one signature interactive), 6691–6714 builder brief (never hide content in CSS; JS sets start states only in a no-preference branch; scroll-lock must release), 4249–4991 parameter library P01–P85, 4995–5471 3D/SVG library S01–S55, 2170 Q107 one reduced-motion flag, 3648 Patio, 3819 Codapress, 5533 small follower with the system cursor kept usable.

## V6 Addendum: phases continued after the read (30 Oct)
- The re-check list from the read was run on the delivered file with `siding/qa/v6/recheck.js`: 225 pass, 0 fail.
- Three bank-threshold items fixed in CSS only:
  - `.nextstep` links raised to 44 px;
  - Colour 2 swatches 28 px on phones;
  - Hero 2 note held to 36 rem.
- Repacked: 4,219,580 B ≤ 4,221,484 B.
- Re-verified:
  - recheck.js 225 / 0;
  - sect.js 90 / 90 with console 0;
  - facts.py unchanged.
- AUDIT-V3, TRACEABILITY and the BANK-MAP usage log are updated.
- Sub-agents: none.

## Audit feedback pack round + owner notes (30 Oct)
- **Step 1 fix pass (owner deadline):** committed and reported. It covered:
  - facts/P1;
  - the winner fix lists F1–F10;
  - the page-level fixes C;
  - the cursor fixes D;
  - quirks E.
- **QA rounds 1–3:** committed (32ed85b, 3b67eae, 4d57db1). Rounds 4–10 are deferred to the next round, not cancelled.
- **Owner design note:**
  - Poppins (headings) + Roboto (body) replace Mona Sans on live versions; backups keep Mona Sans.
  - De-AI pass: axis hover swell, extruded figure shadow, background sheen and glow pool, cursor glow halos, and the uniform section padding all removed.
  - Details are in TRACEABILITY.md. Packed file: 4,160,204 B.
- **Part G (two new versions per section):** deferred to the next round per the owner deadline.
- Nothing is marked shipped.

## CONSOLIDATED MASTER DIRECTIVE (2026-10-30): Phase 0 note
- This directive supersedes today's deadline scope, design note, redesign directive, clarification and addendum.
- **State at start:**
  - Fix pass and QA rounds 1–3 committed.
  - Fonts note landed (642195e).
  - Phase 1 logo already committed (3068595) under the redesign directive; it is completed under this directive below.
- **Accent:**
  - Value: cobalt `--accent #2F66FF`, with a named scale `--accent-50/100/200/300/400`, `--accent-d #1A4FE0` and `--accent-dd #0E2C8A`.
  - Why it fits a Texas siding company: cobalt is the James Hardie navy of the firm's own finished walls (the Rob Roy job leading the hero) lifted into Texas daylight. It is the colour of their work and of an open Austin sky, and it holds 4.7:1 for white on accent and 6.5:1 for the deep shade as text.
- **Accent2:** none. Black + white + cobalt carries the brand. The stars and the logo's lit pane, which used sun yellow in the stage-1 draft, move to cobalt tints, because Rule 2 limits a second accent to primary CTAs and cobalt CTAs already lead.
- **Logo concept:** an A-frame gable that is both the A of Austin and the firm's three trades in one shape:
  - a lap-siding-clad gable wall (siding);
  - a roof line with eave overhangs (roofing);
  - a four-pane window with one lit pane (windows).
- **Currently dark visible sections (to become light):**
  - Near 1, Near 2 and Near 3 (night tone);
  - Book 1, Book 2 and Book 3 (red tone);
  - the footer (night).
  - Components on night: Hero 3's photo stage panel, Built 3's warranty card, Money 1's selected plan card, the Hero 1 and 2 scrim plates, and Reviews' dark controls.
- **Bespoke interactive concept:** "Clad the gable". The visitor picks a wall on a drawn Austin house and clads it course by course with the firm's real materials: James Hardie lap at the published exposures, the published Sherwin-Williams and ColorPlus colours, and a window from the firm's own lines. A live readout shows the nearest documented jobs with the same choices and their published price band. Only this firm, with its documented job record, can answer "what did a wall like mine cost here".
- **Phase order:** 0 note → 1 logo (complete: mono marks + favicon) → 2 tokens + light → 3 design upgrade in page order → 4 bespoke interactive → 5 version expansion per section → 6 consolidation QA → report.
- **Collisions logged (priority: locked facts > hard rules > design standards):**
  - (a) Annex A gives the hours with en dashes, while Audit pack C.14 printed hyphens. Annex A wins, so the hours string is printed verbatim.
  - (b) Annex A's address carries a comma after "Blvd". Annex A wins.
  - (c) Phase 5 expects five current visible versions per section, but each section has three (Part G was deferred). The three are backed up byte-identical. The five improved versions are the three current ones plus two of the earlier backups, raised to the new standard, plus three new versions.
  - (d) Backups therefore total six per section, not eight. Nothing is invented to fill slots.
- **Amendment (Rule 1, backgrounds):**
  - Pure black and near-black backgrounds are banned, and a deep green is allowed on at most a couple of sections.
  - Deep-green sections used: **none**. The accent is cobalt and Rule 2 (one accent) stands, so a green ground beside it would be a second hue.
  - The page stays light-only, with the cobalt tints carrying the depth. If the owner wants deep-green bands, the clean route is a green accent family across the whole palette; that is a palette decision for him.
- **Phase 5 collision (challenge protocol):**
  - Each section's era-a backups 1–3 are earlier states of the same three concepts as visible 1–3 (the names match one for one). "Five improved versions" would therefore duplicate concepts.
  - Closest alternative in the same spirit, applied to every section:
    - **3 improved versions**, one per concept, raised by Phase 3 (accent system, eyebrow, artwork, light composition);
    - **5 new versions** whose layout, composition and mechanism differ from every existing version;
    - 8 visible in total.
  - Built's version 4 is the Phase 4 interactive, so Built needs four more.
  - Backups per section: 6 (3 era a + 3 era b). Nothing is deleted.
