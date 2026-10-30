# Delivery report: Rembrandt Roofing & Restoration homepage (BRIEF-FULL-v2.md §14)

## The file
- **File:** `rembrandt/v5/rembrandt-homepage.html`. One self-contained HTML holding all 7 sections × 3 versions. Each section's 1·2·3 switcher swaps only that section.
- **Size:** 1509 KB (951 KB gzip).
  - Code: 437 KB = markup 75 + CSS 92 + JS 271, of which libraries are 160 KB; 134 KB gzipped.
  - Media: 1072 KB in 10 data URIs, each stored once.
- **Branch:** `claude/sweet-hypatia-it8evf`. The commit is the one that carries this report (see `git log`).
- **Build:** `cd rembrandt/v5 && TOOLS=<dir with esbuild, gsap, lenis> node build/build.mjs`.
- **Memory files:** BRIEF-FULL-v2.md (governing), READ-DIGEST.md (the A-to-Z read of BANK-MAP.md → atlas part 1 → atlas part 2), BRIEF-FULL.md, PLAN-FULL.md, TRACEABILITY.md (every row has its Verification), SECTIONS.md (all 21 versions and all 7 systems at YES), PROGRESS.md (phase notes, failures kept visible, §12 record).
- **QA:** scripts in `rembrandt/v5/qa/scripts/` (README there); logs and contact sheets in `rembrandt/v5/qa/` and `rembrandt/v5/qa/gate/`.

## Per section × version, with §14's three verdicts
Verdicts graded after the full read (method in PROGRESS.md "v2 verdict audit"). The audit failed two versions, Work V2 and How V3. Both were fixed and re-verified, so every version below now stands at Facts YES · Intent YES · Generic NO.

| Section | Version | Status | Governing reference (TRACEABILITY.md) | Facts grounded | Reference-intent match | Generic/default feel |
|---|---|---|---|---|---|---|
| Hero | V1 Shingle wall | rebuilt | ⟦S0534⟧ code-slice-hero | YES | YES | NO |
| Hero | V2 Weighted headline | rebuilt | [BANK] Variable Proximity (deep read slice 4 #171) | YES (flag C11) | YES | NO |
| Hero | V3 Town rotator | rebuilt | [BANK] 289 Rotating Text + P73 | YES | YES | NO |
| Reviews | V1 Constellation | kept, untouched | owner-kept build (⟦S0687⟧ family) | YES (flag 1) | YES | NO |
| Reviews | V2 Ledger | upgraded | Cenco DEEP 5 + Anatomy F12 + #317 | YES | YES | NO |
| Reviews | V3 Roller board | rebuilt | Count Up roll mode + Q409 | YES | YES | NO |
| Work | V1 Tape loop | upgraded | Q361 horizontalLoop (CROWN) | YES | YES | NO |
| Work | V2 Gable push grid | upgraded again in the audit | Q157 push grid (P80) + Q147 shape hover (S51) | YES | YES | NO (was YES: sparse collage, fixed in 34a6e0a) |
| Work | V3 Course blinds | upgraded | Q38 SVG mask blinds (ba2 only) | YES | YES | NO |
| Family | V1 WALKER | upgraded | Q95 Masked Heading | YES | YES | NO |
| Family | V2 Statement | upgraded | ⟦S1327⟧ scroll-scrubbed word reveal | YES | YES | NO |
| Family | V3 Truss | upgraded | ⟦S1362⟧ technical wireframe | YES | YES | NO |
| How | V1 Downspout spine | upgraded | ⟦S1325⟧ scroll-progress timeline | YES (flag C11) | YES | NO |
| How | V2 Step pager | rebuilt | UZIK + P74 | YES (flag C11) | YES | NO |
| How | V3 Three verbs | layout rebuilt in the audit | Q409 + Q411 + Signal-A index rows + S18 hairlines | YES (flag C11) | YES | NO (was YES: icon-card row, fixed in de5899f) |
| Towns | V1 Census map | upgraded | Austin Pro project map (CROWN) | YES (flag 5) | YES | NO |
| Towns | V2 Town cards | upgraded | Q4 metric-led cards + Hippo + ⟦S1420⟧ | YES (flag 5) | YES | NO |
| Towns | V3 Town finder | upgraded | ROTTLER finder + West London checker (CROWN) + ⟦S1453⟧ | YES | YES | NO |
| Call | V1 Gutter close | upgraded | Anatomy F9/F14 + OFFF wordmark + ⟦S1350⟧ | YES (flag C11) | YES | NO |
| Call | V2 House morph | upgraded | Shazam morph 255 | YES (flag C11) | YES | NO |
| Call | V3 Number marquee | upgraded | Q114 + Q161 + Stronghold 60 s | YES (flag C11) | YES | NO |

## Page systems
- **Entrance:** direction-aware reveals on every section (Q40 at the F17 dose: ±40/±20 px, 0.3 s).
- **Signature:** one per page, the hero headline system.
- **Dividers:** a different roofing profile at each of the seven boundaries.
- **Reactions:** registry R01–R42, every control with its own hover and its own press; no press keyframe is shared between controls.
- **Cursor companion:** House, Hammer, Drop or Off. On a fine pointer it is the cursor: a nail-head hotspot sits exactly on the pointer, and the system cursor is hidden only once the companion is live. Text fields keep the I-beam. Not mounted on touch; Off by default under reduced motion.
- **Per-section cursor effects:** sun halo, star dust, viewfinder, wood shavings, ripples, travel compass, signal arcs, coloured by the background under the pointer.
- **Backgrounds:** every version's background answers the pointer and/or scroll (audit in PROGRESS.md Phase 5).

## §12 gate, rerun on the final file (evidence in PROGRESS.md "v2 §12 gate rerun")
| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Facts grep | PASS: 25 checks, 0 fails (353-9711 ×0, 24/7 ×0, licence ×0, "295" ×4, "4.9" ×5, quotes 0) | `qa/gate/facts.log` |
| 2 | Banned patterns | PASS | `qa/gate/facts.log` |
| 3 | Traceability audit, 3 rows at random: Towns V3, Work V2, Call V3 | PASS: each re-opened reference matches its row | PROGRESS.md |
| 4 | Switchers at 1440 and 375 (+ reduced) | PASS: 63/63 swap only their section; 21/21 labels | `qa/gate/switchers.log`, `qa/gate/dom.log` |
| 5 | Screenshots, every version at both widths, vs §4 | Done; the audit's two defects plus two found in checks are fixed | `qa/*.jpg`, `qa/gate/sheet-{1440,375}.jpg` |
| 6 | Console 0, overflow 0, ids, every control, forms | PASS, 0 fails (the gate's Close test now opens a photo first; see PROGRESS.md) | `qa/gate/dom.log` |
| 7 | Companion variants, touch, reduced motion | PASS: compint FAILS 0; reduced pass FAILS 0 | `qa/compint.log`, `qa/gate/reduced.log` |
| 8 | Constellation untouched | PASS: pixel diff bbox None / max 0 at 1440 and 375; function body hash identical at e685bee and HEAD; v1.html, gl.js, spring.js 0 diff lines | PROGRESS.md |
| 9 | Weight | 1509 KB total / code 437 KB (134 KB gzip) / media 1072 KB | `qa/gate/weight.log` |

## Flags for the owner
1. **Constellation wording (Rule 4 vs §3):** Reviews V1 reads "BBB A+ since 2001" and "$2M liability cover". The locked wording is "accredited since 2001" and "liability insurance". The facts are the same. It is left exactly as kept, because Rule 4 forbids touching it. Change it only if you say so.
2. **Code weight is over F18's ~330 KB band (435 KB, 134 KB gzipped).** The cause is the deliverable: three full versions of every section live in one file. The 160 KB of libraries is shared. Once a version per section is chosen and the other two are deleted, section code drops by roughly two thirds and lands inside the band.
3. **The owner's helper picker and version pickers sit over the page.** They are owner tooling, outside the reaction registry. On narrow windows with a mouse, the helper now sits above the phone bar. The H key toggles the companion.
4. **C11, the written line-by-line estimate:** used in Hero V2's link label, How step 2 and the Call versions.
   - It is not in v2 §3's closed list.
   - It comes from the firm's own published claims, as recorded in `rembrandt/rembrandt-pack.md`: "written line-item estimate BEFORE any work starts".
   - Kept, and worded no stronger than the pack. Remove it if you want the page limited strictly to §3.
5. **Towns data:** the Towns versions show US Census / ACS figures (bearings, distances, median year built), with their source printed on the page. This is public data about the towns, not claims about the firm.

## Conflicts resolved (§2: log and continue)
C1–C11 are in PROGRESS.md (C11: the estimate claim, see flag 4): map vs pack, fresh heroes, reviews rebuild, cursor, F17 durations, Q40 travel, estimate paper, pause, Rule 11, reaction groups. Later in the build:
- Shared scale-pop presses removed where a control already had its registered press.
- The Family V2 gable crop dropped, so Hero V2's roof-pitch crop is the only one.
- How V2's scene 1 answers rather than rings, and its scene 3 lowers the finished roof rather than laying courses, both to avoid repeating a trick.
- The R02 dormer moved to the pill's shoulder.
- R41 and R42 added for controls the registry lacked.

## Gaps
- None against §12.
- The full read of all three index files is recorded in PROGRESS.md "v2 full read", with each section's shortlist location.
- The traceability audit covered three random rows, as §12 asks; every other row carries its own Verification from its phase.
