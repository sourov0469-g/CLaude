# PROGRESS — Austin Pro homepage, BRIEF-V5 build

Governing prompt: `BRIEF-V5.md` (repo root). Memory files: this file, `SECTIONS.md`, `TRACEABILITY.md`, `siding/AUDIT-V3.md`, and the usage log at the end of `bank-index/BANK-MAP.md`.

## State
- **Phase:** 2, rebuilds (Hero → Reviews done; Money, Book left)
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

- [ ] **F1 · 886 wording.** See K1.
- [x] **F2 · No Texas licence line in the first screen** (anatomy F11). CLOSED, not added: Texas issues no state contractor licence for siding, window or roofing work and the firm publishes none, so any number would be invented (§3). The first screen carries rating, review count, installer tiers and since-year (the proof strip in all three heroes).
- [x] **F3 · Hero 1 blinds** (Q38/R6 Tier 3, a 1.2 s reveal on load). CLOSED: Hero 1 rebuilt from Q95; nothing plays on load beyond the 0.3 s rise.
- [x] **F4 · Services 1 and Hero 2 both end in a median price band.** CLOSED: Services 1 rebuilt with product facts and no price; Hero 2 is the only median-band-by-trade device.
- [x] **F5 · Upload-your-house-photo flagship** (portfolio plan Site 6) is unbuilt. CLOSED: Colour 1 rebuilt as the flagship (local photo, brushed colour, published band and levers in one flow), tested with a real file.
- [x] **F6 · Built 1 and Built 3 both technical drawings.** CLOSED: different references and mechanisms (S0526 exploded iso on springs vs S0361 dimensioned section with a lap↔batten morph), different layouts, and Built 2 between them is photographic.
- [x] **F7 · Near 1 month-by-month build** (2.3 s data animation on scroll). CLOSED under K10: the firm's own map drawn month by month (now 1.8 s) is the data being read, played once, never gating, and complete at once under reduced motion.
- [ ] **F8 · Lenis kept** (≈18 KB).

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
