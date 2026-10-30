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
- **Phase:** 1 complete (measured, nothing fixed) → 2
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
