# GATE: Upgrade Round 4 — Process + Try the job

**Date:** 2026-11-03.
**Under:** AUSTIN-UPGRADE-BRIEF. Muse's standing instruction applies: "proceed to the next unfinished step… do not wait for approval."

Round 4 covers:
- **Process:** two new versions, C and D.
- **Try the job:** two new versions, C and D. **D is the owner's Lusion-type dive** (brief §5), built in this one version of this one section only.
- **Two corrections from brief §6:**
  - process chapters stack properly on phones;
  - no repeat of the sideways rhythm. Neither new Try-the-job version moves sideways.

**File:** `siding/redo/site/out/site.html` (one file, 13.3 MB).

**How to view:**
- **Review mode:** `?review`.
- **Direct links:** `?process=c`, `?process=d`, `?try=c`, `?try=d`.
- **Default view:** unchanged until the owner picks.

Each section now has four versions. **Round 5 (On your street + Booking + header/footer) follows straight on.**

---

## 1. Process: the new versions as they landed

### C: The plumb line
Screens: `u4-process-c.jpg` · `-1440-0/1/2.jpg` · `-768-0/1/2.jpg` · `-390-0/1/2.jpg`

- **References:**
  - Lusion: one carrying thread through the section.
  - Graza: the custom-animation quality bar.
- **The line:** it drops down the page as the visitor reads, with a lime plumb bob riding its tip.
- **When the line reaches a step:**
  - its node fills;
  - its outlined numeral turns green;
  - its text settles;
  - its line drawing draws itself, stroke by stroke.
- **The four drawings:**
  - **Inspection:** a house with a magnifier walking its sides.
  - **Proposal:** an itemised sheet with the total line in lime.
  - **Install:** lap courses going up the wall, bottom first, then the corner boards.
  - **Final check:** a walk all the way round the house that ends in a tick.
- **Figures:**
  - one visit covers every trade, Mon–Fri 8–8 / Sat 8–6 / Sun 12–5;
  - $10k–$15k median band (415 priced siding jobs);
  - 1–2 weeks for siding, 2 days for most window-only jobs;
  - a lifetime workmanship warranty on labor and 30 years non-prorated on James Hardie.
- **Layout:**
  - **Wide screens:** the steps alternate sides.
  - **Phones:** the line runs down the left edge and the steps stack beside it.

### D: Four columns
Screens: `u4-process-d.jpg` · `-1440-0/1.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **Reference:** Dropbox Brand (subtraction, bold colour blocks, big type).
- **The columns:** four solid colours (deep green, lime, pale green, white) with one step each. Closed columns show only a big numeral and the step name set vertically.
- **Opening one:** the column widens. Its words, its drawing (the same four as C, recoloured per column) and its figures arrive.
- **Ways to open a column:**
  - click;
  - a short hover dwell on desktop;
  - arrow keys (`aria-expanded` and `aria-controls` are set on each).
- **Phones:** the columns become rows that open downward.

## 2. Try the job: the new versions as they landed

Both new versions reuse the four games from A and B and their code (nail a course, seal a window, hang a gutter, paint the trim). Every game keeps its drag, its keyboard path and its "do it for me" button.

### C: The workbench
Screens: `u4-try-c.jpg` · `-1440-0/1.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **Reference:** Graza (the custom-animation quality bar).
- **The bench:** all four jobs on one bench, as a 2 × 2 grid (one column on phones). No sideways movement at all.
- **The tally:** chips at the top tick off as each job is done. A finished job's card gains a lime edge.
- **When all four are done,** the score reads "All four done. You would fit right in." next to the booking button.

### D: The dive (the owner's Lusion-type idea, in this version only)
Screens: `u4-try-d.jpg`. The dive frames at p = 0 / 0.45 / 0.8 / 1 are `-{1440,768,390}-0/1/2/3.jpg`, and the toolbox frames are `-4.jpg`.

- **Reference:** Lusion (the dive), as specified in brief §5.
- **The empty section:** a white section, empty except for one small green-framed window with a lime sill in the bottom-right corner, and a "Step inside →" note beside it.
- **The dive:** as the section pins, the view travels to that corner and goes in.
  1. The window grows and moves to the centre.
  2. The glass reflection clears.
  3. The view passes through one pane, clear of the glazing bars.
  4. The room's pale-green colour fills the screen.
- **Inside:** the toolbox opens from within, on that same colour. The section's heading and the games sit there.
  - A tool rail on the left (on phones, 2 × 2 above) with the job name and a done tick.
  - One job at a time.
  - Arrow keys move between tools (tabs, `aria-selected`).
- **The window** is a drawing (frame, glazing bars, glass, sill), not a photograph.
- **Reduced motion:** the dive is skipped and the toolbox stands on its own.

## 3. Corrections folded in

| Correction | Done |
|---|---|
| **Process chapters stack properly on phones** (GATE-HOMEPAGE remaining item 6: "no sticky stacking at 390") | **Process A:** the cards now stick and stack on phones as on desktop. A card taller than the screen sticks once its bottom reaches the screen's bottom (its sticky top is worked out per card), so the next card still slides over it, and the one beneath sinks back. Measured at 390: cards stuck at −45 / −4 / −12 px with the next arriving at 380 px (`u4-fix-process-a-390.jpg`).<br>**Process B:** the wall now pins under the header on phones while the steps scroll past. Each step moves the job on: As found → Planned → Going up → Done. The current step is full strength and the others are faded (`u4-fix-process-b-390.jpg`) |
| **No repeat of one sideways rhythm** | Neither new Try-the-job version moves sideways: C is a grid, D is a dive into a toolbox. The new Services versions (Round 2) were vertical too, so sideways motion now lives only in the earlier A/B options |

---

## 4. Interaction tests (Playwright, SwiftShader GL; final run)

| Version | 1440 | 768 | 390 |
|---|---|---|---|
| Process C | 0 errors, 0 overflow. Steps reached at 2 / 42 / 80 % of the section: 1 → 2 → 3; line k 0.13 → 0.44 → 0.73 | Same | Same; all 4 reached by 80 % |
| Process D | 0 errors, 0 overflow. Clicking column 3 opens it and closes column 1; ArrowRight moves to and opens column 4 | Same | Same (rows) |
| Try C | 0 errors, 0 overflow. All four "do it for me" buttons → "All four done…", 4 tally chips ticked, 4 cards won | Same | Same |
| Try D | 0 errors, 0 overflow. The dive ends with the glass clear and the view scaled ×27.7 into one pane. Tool 3 is selected and visible; doing it gives "1 of 4 done" and its tick; ArrowDown moves to tool 4 | Same (×20.5) | Same (×16.9) |
| Process A / B at 390 | Stacking measured as in §3. B steps 0 → 1 → 2 → 3 with the wall held at 76 px | | |
| Reduced motion | Process C: every step shown. Try D: dive hidden. No errors across the four new versions or the corrected A and B | | |

### Defects found and fixed this round

| # | Defect | Fix |
|---|---|---|
| 1 | **Class collisions (three):**<br>• Process C's timeline used `.tl`, already the global Try-the-job tally style, so the steps laid out in a row (159 px of sideways overflow).<br>• Process C's steps used `.st`, a global booking style.<br>• My `.ft` blocks (Windows D from Round 3, Try C and Try D) shared the **footer's** class, and `world.js` finds the footer with `querySelector('.ft')`. With Windows D live, the world's last region would have been measured from the wrong element | Renamed to `.pline`, `.pst` and `.sft`; Try D's `.scene` renamed to `.dscene` |
| 2 | Try C: in a column layout, the shared game rule's `align-items:center` collapsed every stage to 0 px wide, so the paint job could never finish | Stretched the cards |
| 3 | Try D: the dive aimed at the window's centre, so the glazing-bar cross stayed on screen and filled it at the end | It now dives through one pane |
| 4 | Process B on phones: the step mapping ran one step early | Mapped to the reading line at 45 % of the screen |

### Remaining (honestly named)

1. **The dive is untested on real hardware.** It is a pure CSS transform on one layer up to about ×28. Software GL showed no issue, but it needs a check on a real phone.
2. **Process D's hover dwell (140 ms)** opens columns as the pointer rests on them. If the owner finds that too eager, click-only is a one-line change.
3. **Carried from earlier rounds:**
   - the touch world reveal behind copy on phones (my proposal from Round 3 stands, not applied);
   - the world illustration request;
   - the hero hint that loops (planned for Round 5).

---

## 5. Skill ledger (§7)

**Read in full this round:** none new; the skills below were read in full in earlier rounds.

**Applied:**
- S1326 (pinned and sticky stages, phones);
- S1327 (word-level and line-level reveals);
- S1362 (drawn line art);
- S0618 (accordion semantics);
- S0054;
- S0405;
- S1329;
- S0489;
- S1330;
- S1425;
- the critique set S1473 / S1479 / S1482 / S1496–S1501.

| Level | Item | Skills (tag → how used) |
|---|---|---|
| **Site** | Headings | S1329 / S0451 word reveal |
| Site | Buttons | S0405 |
| **Section: Process** | C and D | S0650 (headings of 4–8 words), S0220 (the firm's four steps, FACTS.md figures), S1501 (one emphasis: the line in C, the open column in D) |
| Section: Try the job | C and D | S0220 (the figures on every game are FACTS.md counts), S1442 (the "do it for me" button is the accessible path for every drag) |
| **Element** | Process C line and bob | S1326 (native scroll is the source of truth; reduced motion = complete), S0489 (one carrying motion, never looping) |
| Element | Process C / D drawings | S1362 (line art built from separable strokes, drawn in order), S0442 |
| Element | Process D columns | S0618 / S0054 (`aria-expanded`, arrow keys, one open at a time), S1436 (flex-grow 0.75 s ease-in-out, staggered content) |
| Element | Process A phone stacking | S1326 (sticky with a per-card top so tall cards still stack) |
| Element | Process B phone wall | S1326 (sticky preview, captions drive the state) |
| Element | Try C tally | S0405 (state change on done), S1501 |
| Element | Try D dive | S1330 (the eased camera: scale grows log-linearly, travel eased), S1425 (white ground → window figure → room ground), S1326 (pinned, reversible; reduced motion skips it) |
| Element | Try D tool rail | S0054 (tablist, `aria-selected`, roving tabindex, arrow keys) |

**Critique pass before gating:**

| Skill | Finding | Status |
|---|---|---|
| S1473 H1 visibility | Process C: node, numeral and drawing all mark the current step | OK |
| S1473 H3 control | Try D: the dive is scroll-driven and reversible; scroll back up and you come back out | OK |
| S1479 critique | Try D's dive ended on the glazing-bar cross | Fixed (#3) |
| S1498 composition | Process C leaves the step not reached yet quieter, so the eye follows the line | OK |
| S1496 brand | Green, lime, pale tints and white only; no steel | OK |
| S1482 QA | Overflow, keyboard, reduced motion, phones | Checked (§4) |

---

## 6. Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10; PASS ≥ 7.0, none < 6.0, zero vetoes)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Process C, The plumb line | 8.2 | 8.2 | 8.2 | 8.4 | **8.22** | PASS |
| Process D, Four columns | 8.4 | 8.0 | 8.0 | 8.2 | **8.18** | PASS |
| Try C, The workbench | 7.8 | 8.6 | 7.4 | 8.0 | **7.98** | PASS |
| Try D, The dive (Lusion idea) | 8.4 | 7.8 | 9.0 | 8.0 | **8.30** | PASS. The owner's idea, in one version as asked |
| Process A / B phone stacking (correction) | n/a | 8.2 | n/a | n/a | n/a | Correction landed |

These are my own scores. Muse judges on the committed screenshots.

**Vetoes: none.**
- All figures come from FACTS.md.
- The drawings and the window are drawings, not photographs.
- There are no invented claims.
- No errors, no sideways scroll.

## 7. Screens (committed in `siding/redo/site/gate/`; no switcher in any frame)

- **Per-version sheets:** `u4-process-c.jpg`, `u4-process-d.jpg`, `u4-try-c.jpg`, `u4-try-d.jpg`.
- **Each frame:** `u4-{process,try}-{c,d}-{1440,768,390}-{0..4}.jpg`.
- **Corrections:** `u4-fix-process-a-390.jpg`, `u4-fix-process-b-390.jpg`.

## 8. Next

**Round 5:** On your street + Booking + header/footer. It folds in:
- the arrow hint for phone sideways rows;
- the hero hint that loops;
- my Round 3 proposal on the touch world reveal, pending Muse.

After Round 5, the homepage is complete and **stops at the joint verification gate** (Muse, then the owner), per the process note.
