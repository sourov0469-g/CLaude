# Delivery report: Rembrandt Roofing & Restoration homepage (BRIEF-FULL.md §14)

## The file
- **File:** `rembrandt/v5/rembrandt-homepage.html`. One self-contained HTML holding all 7 sections × 3 versions. Each section's 1·2·3 switcher swaps only that section.
- **Size:** 1506 KB (951 KB gzip).
  - Code: 435 KB = markup 72 + CSS 91 + JS 271, of which libraries are 160 KB; 134 KB gzipped.
  - Media: 1072 KB in 10 data URIs, each stored once.
- **Branch:** `claude/sweet-hypatia-it8evf`. The commit is the one that carries this report (see `git log`).
- **Build:** `cd rembrandt/v5 && TOOLS=<dir with esbuild, gsap, lenis> node build/build.mjs`.
- **Memory files:** BRIEF-FULL.md, PLAN-FULL.md, TRACEABILITY.md (every row has its Verification), SECTIONS.md (all 21 versions and all 7 systems at YES), PROGRESS.md (phase notes, failures kept visible, §12 record).
- **QA:** scripts in `rembrandt/v5/qa/scripts/` (README there); logs and contact sheets in `rembrandt/v5/qa/` and `rembrandt/v5/qa/gate/`.

## Per section × version
| Section | Version | Status | Governing reference |
|---|---|---|---|
| Hero | V1 Shingle wall | rebuilt | ⟦S0534⟧ heygen-com/code-slice-hero; atlas1 "## ⟦S0534⟧"; raw WEB-SKILLS.md ⟦S0534⟧; live registry source `code-slice-hero.html` |
| Hero | V2 Weighted headline | rebuilt | [BANK] Variable Proximity (React Bits); atlas2 "## [BANK] Variable Proximity"; deep read `deep-reads-slice-4.md` entry 171; live reactbits.dev/text-animations/variable-proximity |
| Hero | V3 Town rotator | rebuilt | [BANK] 289 Rotating Text (React Bits, STRONG) + [BANK] P73 Harvest [204]; atlas2 "## [BANK] 289", "## [BANK] P73"; deep reads `deep-reads-slice-5.md` 289, `deep-reads-slice-4.md` 204; live reactbits.dev/text-animations/rotating-text |
| Reviews | V1 Constellation | kept | owner-kept build artifact (⟦S0687⟧ family); usage log in `bank-index/BANK-MAP.md` |
| Reviews | V2 Ledger | upgraded | [BANK] Cenco Roofing DEEP 5 + Anatomy F12 (KBF Ledger) + [BANK] #317 Digital Butlers; atlas2 entries of those names; manifest/deep reads in the roofing pack |
| Reviews | V3 Roller board | rebuilt | [BANK] Count Up (React Bits) roll mode + [BANK] Q409 Grow My Business proof-stack counters; atlas2 "## [BANK] Count Up"; deep read `deep-reads-slice-4.md` 279; code `animation/code-source/count-up-reactbits/` |
| Work | V1 Tape loop | upgraded | [BANK] Q361 horizontal-loop project tiles (CROWN); atlas2 "## [BANK] 361"/Q361; deep read `hvac/reverse-engineering/deep-reads-slice-6.md` 361 |
| Work | V2 Gable push grid | upgraded | [BANK] Q157 Push Animation on Grid Items + [BANK] Q147 Shape Hover (chevron); atlas2 entries Q157, Q147 |
| Work | V3 Course blinds | upgraded | [BANK] Q38 SVG Mask Transitions on Scroll (blinds); atlas2 "## [BANK] Q38" |
| Family | V1 WALKER | upgraded | [BANK] Q95 Masked Heading; atlas2 "## [BANK] Q95" |
| Family | V2 Statement | upgraded | ⟦S1327⟧ scroll-scrubbed word reveal; atlas1 "## ⟦S1327⟧" |
| Family | V3 Truss | upgraded | ⟦S1362⟧ technical-wireframe-info-layout; atlas1 "## ⟦S1362⟧" |
| How | V1 Downspout spine | upgraded | ⟦S1325⟧ scroll-progress-timeline; atlas1 "## ⟦S1325⟧" |
| How | V2 Step pager | rebuilt | [BANK] UZIK (deep-read 221) + [BANK] P74 Harvest [221]; atlas2 "## [BANK] UZIK", "## [BANK] P74"; deep read `deep-reads-slice-4.md` 221 |
| How | V3 Three verbs | upgraded | [BANK] Q409 + [BANK] Q411 NVRMND + [BANK] Q91 animated SVG icons; atlas2 entries of those names |
| Towns | V1 Census map | upgraded | [BANK] Austin Pro project map (CROWN); atlas2 Austin Pro entries |
| Towns | V2 Town cards | upgraded | [BANK] Q4 Ragged Edge metric-led cards + Hippo doctrine + ⟦S1420⟧; atlas2 entries |
| Towns | V3 Town finder | upgraded | [BANK] ROTTLER town finder + [BANK] West London coverage checker (CROWN) + ⟦S1453⟧; atlas2 entries |
| Call | V1 Gutter close | upgraded | Anatomy F9/F14 + [BANK] OFFF giant two-tone wordmark + ⟦S1350⟧ gooey-blob-system; atlas2/atlas1 entries |
| Call | V2 House morph | upgraded | [BANK] Shazam-like Morphing Button 255; atlas2 entry |
| Call | V3 Number marquee | upgraded | [BANK] Q114 JC Suzanne giant marquee footer CTA + [BANK] Q161 + Stronghold 60 s token; atlas2 entries |

## Page systems
- **Entrance:** direction-aware reveals on every section (Q40 at the F17 dose: ±40/±20 px, 0.3 s).
- **Signature:** one per page, the hero headline system.
- **Dividers:** a different roofing profile at each of the seven boundaries.
- **Reactions:** registry R01–R42, every control with its own hover and its own press; no press keyframe is shared between controls.
- **Cursor companion:** House, Hammer, Drop or Off. On a fine pointer it is the cursor: a nail-head hotspot sits exactly on the pointer, and the system cursor is hidden only once the companion is live. Text fields keep the I-beam. Not mounted on touch; Off by default under reduced motion.
- **Per-section cursor effects:** sun halo, star dust, viewfinder, wood shavings, ripples, travel compass, signal arcs, coloured by the background under the pointer.
- **Backgrounds:** every version's background answers the pointer and/or scroll (audit in PROGRESS.md Phase 5).

## §12 gate (evidence in PROGRESS.md "Phase 6")
| # | Item | Result | Evidence |
|---|---|---|---|
| 1 | Facts grep | PASS (25 checks, 0 fails) | `qa/gate/facts.log` |
| 2 | Banned patterns | PASS | `qa/gate/facts.log` |
| 3 | Traceability audit (3 random rows) | PASS; Work V3's two deviations now written into its row | PROGRESS.md Phase 6 |
| 4 | Switchers at 1440 and 375 | PASS 63/63 + 21/21 labels | `qa/gate/switchers.log`, `qa/gate/dom.log` |
| 5 | Screenshots of every version at both widths vs §4 | Done; hero wording defect fixed in this pass | `qa/*.jpg`, `qa/gate/sheet-*.jpg` |
| 6 | Console 0, overflow 0 at 375, ids resolve, every control works, forms handled | PASS | `qa/gate/dom.log`, `qa/gate/switchers.log` |
| 7 | Companion variants, touch-disable, reduced motion | PASS 42/42 + touch + reduced; reduced pass 42/42 | `qa/compint.log`, `qa/gate/reduced.log` |
| 8 | Constellation untouched | PASS: source hashes + pixel diff (bbox None, max 0) vs e685bee | PROGRESS.md Phase 2 and Phase 6 |
| 9 | Weight | Reported: total 1506 KB / code 435 KB / media 1072 KB | `qa/gate/weight.log` |

## Flags for the owner
1. **Constellation wording (Rule 4 vs §3):** Reviews V1 reads "BBB A+ since 2001" and "$2M liability cover". The locked wording is "accredited since 2001" and "liability insurance". The facts are the same. It is left exactly as kept, because Rule 4 forbids touching it. Change it only if you say so.
2. **Code weight is over F18's ~330 KB band (435 KB, 134 KB gzipped).** The cause is the deliverable: three full versions of every section live in one file. The 160 KB of libraries is shared. Once a version per section is chosen and the other two are deleted, section code drops by roughly two thirds and lands inside the band.
3. **The owner's helper picker and version pickers sit over the page.** They are owner tooling, outside the reaction registry. On narrow windows with a mouse, the helper now sits above the phone bar. The H key toggles the companion.
4. **Work V2 (push grid) was verified, not changed.** Its 4×4 collage holds six photos, so it reads airy at 1440. That is how the V7 version was delivered.

## Conflicts resolved (§2: log and continue)
C1–C10 are in PROGRESS.md: map vs pack, fresh heroes, reviews rebuild, cursor, F17 durations, Q40 travel, estimate paper, pause, Rule 11, reaction groups. Later in the build:
- Shared scale-pop presses removed where a control already had its registered press.
- The Family V2 gable crop dropped, so Hero V2's roof-pitch crop is the only one.
- How V2's scene 1 answers rather than rings, and its scene 3 lowers the finished roof rather than laying courses, both to avoid repeating a trick.
- The R02 dormer moved to the pill's shoulder.
- R41 and R42 added for controls the registry lacked.

## Gaps
- None against §12.
- The traceability audit covered three random rows, as §12 asks; every other row carries its own Verification from its phase.
