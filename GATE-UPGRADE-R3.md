# GATE: Upgrade Round 3 — Windows + Reviews

**Date:** 2026-11-03.
**Under:** AUSTIN-UPGRADE-BRIEF. Muse's standing instruction applies: "proceed to the next unfinished step… do not wait for approval."

Round 3 covers:
- **Windows:** two new versions, C and D.
- **Reviews:** two new versions, C and D.
- **Two corrections from brief §6:**
  - the lifted sash showed a flat dark room;
  - the reviews dialog header sat above its backdrop.

**File:** `siding/redo/site/out/site.html`. One file, 13.3 MB; the extra 1.4 MB is ten of the firm's own window photographs for Windows D.

**How to view:**
- **Review mode:** `?review`.
- **Direct links:** `?windows=c`, `?windows=d`, `?reviews=c`, `?reviews=d`.
- **Default view:** unchanged until the owner picks (Windows A, Reviews B).

Each section now has four versions. **Round 4 (Process + Try the job) follows straight on.**

---

## 1. Windows: the new versions, each reported as it landed

### C: Taken apart, pinned
Screens: `u3-windows-c.jpg` · `-1440-0/1/2.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **References:**
  - Apple AirPods Pro: pinned scroll; numbers arrive as events.
  - Ever, craft note only: an exploded visualisation that reads like a drawing, not a render.
- **The stage:** 440 vh long and pinned. Native scroll drives everything.
- **Scroll sequence:**
  - **Start:** a single-hung replacement window sits in a lap-sided wall.
  - **Taking it apart:** the window turns to three-quarters and separates into its five real parts:
    1. trim and sill;
    2. frame;
    3. lower sash;
    4. upper sash;
    5. insect screen.
  - **One part at a time:** each part steps forward in turn with its number tag. Its line in the list opens to a one-sentence description.
  - **Upper sash:** a drawn section through the glass appears (outer pane, Low-E coat, sealed spacer, inner pane), with its lines drawing in.
  - **End:** the window reassembles.
- **Numbers, one per part (counted up):**
  - 388 documented window jobs;
  - 330 of 376 priced jobs used NT Windows, Simonton or Andersen;
  - 2 days on site for most window-only jobs;
  - $10k–$15k median band;
  - Andersen Certified Premier.
- **The list is a way in:** clicking a part scrolls to it.
- **Depth:** CSS 3D on this one element only. No big 3D.
- **Phones and reduced motion:**
  - Unpinned: heading, then the window opened out, then the parts list.
  - Tapping a part brings it forward and shows its figure.

### D: Window jobs on record
Screens: `u3-windows-d.jpg` · `-1440-0/1.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **Reference:** Lando Norris (a bespoke archive gallery).
- **The archive:** nine of the firm's own published window projects. Each was checked photo by photo, so every picture actually shows windows.
- **Excluded:** five candidate photos showed doors, a patio cover or a garage door.
- **The index:** an archive list, newest first, with year markers, a large number per row, the place, the month and the trades.
- **The viewer:** pointing at a row (or tapping or focusing it) changes the photo with a vertical wipe, its direction set by the order.
  - The photo drifts slowly against its caption under the pointer.
  - The caption gives the recorded place, month and trades, plus "See the project" linking to the firm's project page.
  - Anderson Mill West has two photographs and a "Photo 1 of 2" stepper.
- **Filters:**
  - All 9;
  - Windows only, 4;
  - With other trades, 5.
- **Phones:** the viewer pins under the header and the list scrolls beneath it. The filter row wraps; no sideways scroll.

## 2. Reviews: the new versions, each reported as it landed

### C: Read at reading pace
Screens: `u3-reviews-c.jpg` · `-1440-0/1/2.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **References:**
  - Apple AirPods Pro (pinned scroll);
  - S1327 (scroll-scrubbed word reveal).
- **The four excerpts**, one at a time on a pinned stage:
  1. Ray Cole: no pressure, a detailed estimate in about an hour.
  2. Charles Statler: "cleaner when they left".
  3. Bryan Williams: "completed on schedule".
  4. Rick Bodamer: "a breath of fresh air".
- **The reveal:** each excerpt becomes readable word by word as the visitor scrolls. Words move from faint, blurred and lowered to normal type.
- **Reverse scroll** un-reads them.
- **Once a quote is fully read,** the reviewer's name and source appear and the quotation mark finishes drawing.
- **Always visible:** a counter and a four-segment progress, plus the aggregate "4.9 ★★★★★ from 474 Google reviews". Stars appear on the aggregate only.
- **Phones:** no pin. Each quote reads in as it rises through the screen.
- **Reduced motion:** everything is shown at once.

### D: Ask the neighbours
Screens: `u3-reviews-d.jpg` · `-1440-0/1.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **References:**
  - Cowboy: warm, restrained, family-fronted trust.
  - Erie Home, note only: FAQ grammar.
- **Five common questions, answered only by verbatim excerpts:**
  1. Will I get a sales pitch at the estimate? (3 excerpts)
  2. How long will the work take? (3 excerpts; one honestly says six weeks from measuring to install)
  3. Will they clean up after themselves? (3 excerpts)
  4. Will I hear from them while it's happening? (3 excerpts)
  5. What difference do new windows make? (2 excerpts)
- **Desktop:**
  - The questions sit at left. Arrow keys move between them.
  - The open answer sits in a pale-lime panel. The quotation mark draws, and the cards rise in sequence.
- **Phones:** an accordion. `aria-expanded` and `aria-controls` are set on each question.
- **Wording:** no stars per review, and nothing added to any quote.

**Verbatim lock:** every excerpt in C and D (18 in all) is checked against `reviews.json` at build time. The build fails if one is not an exact substring.

## 3. Corrections folded in

| Correction (brief §6) | Done |
|---|---|
| **Windows A: the lifted sash showed a flat dark room.** Solve truthfully; never invent an interior photograph | The opening now holds a **drawn** room in the same flat style as the window drawing: interior jambs with depth, a back wall, a doorway, a framed picture, a curtain edge, a floor with a patch of daylight, and a table lamp. **By day** it reads dimmer than outside, as rooms do; **from dusk** the lamp lights it warm. It shows fully only when the lower sash is lifted, seen through the insect screen. No photograph, and no claim about any home (`u3-fix-windows-a-room.jpg`: day, dusk, night) |
| **Reviews B: the dialog header sat above the backdrop** | The dialog now lives at the page root (`z-index` 110). Its backdrop covers the fixed header and the phone bar. The element at the top centre of the screen is now the backdrop (measured). Esc closes it and returns focus to the tag (`u3-fix-rvB-dialog-1440.jpg`, `-390.jpg`) |

---

## 4. Interaction tests (Playwright, SwiftShader GL; final run)

| Version | 1440 | 768 | 390 |
|---|---|---|---|
| Windows C | 0 errors, 0 overflow.<br>Scroll steps: Trim and sill / 388 → Frame / 330 (apart) → Upper sash / $10k–$15k with the glass section.<br>Clicking part 5 scrolls to Insect screen | Flow mode; window opens out on arrival; tapping part 4 shows the glass section and $10k–$15k | Same |
| Windows D | 0 errors, 0 overflow.<br>Hovering row 6 shows "River Place, Austin / May 2026 · Windows".<br>Windows-only filter leaves 4 rows.<br>Anderson Mill West stepper reads "Photo 2 of 2" | Same (by tap) | Same |
| Reviews C | 0 errors, 0 overflow. Counter 01 → 02 → 04; words scrubbed 14/38 → 6/16 → 15/15; caption shown once read | Flow; quote 2 read on arrival; quote 4 still unread below | Same |
| Reviews D | 0 errors, 0 overflow. Q2 opens with 3 cards and Q1 closes; ArrowDown moves to and opens Q3 | Accordion: Q2 opens alongside Q1; ArrowDown moves focus | Same |
| Windows A room | Day / dusk / night lifted-sash frames captured at 1440 and 390 | | |
| Reviews B dialog | Parent is BODY, z 110, backdrop on top, Esc closes | | Same at 390 |
| Reduced motion | Windows C and Reviews C in flow; all Reviews C quotes fully shown; no errors across the four new versions and the two corrected ones | | |
| Locks | One phone number (23 instances), no "5,000", no "steel" | | |

### Defects found and fixed this round

| # | Defect | Fix |
|---|---|---|
| 1 | Windows C: the closed part descriptions still held their height, so the list spread out | The descriptions now collapse by max-height; only the current part's line opens |
| 2 | Windows C: the exploded view was crowded; the large wall plate competed with the window parts | The wall fades further when apart, the other parts are dimmed more, the turn is softened (−30°), and the window is scaled to leave room |
| 3 | Windows D: the filter row could have scrolled sideways on phones | It wraps instead |
| 4 | Windows D on phones: the month and the trades shared one grid cell | Separate cells |
| 5 | Test only: with a mouse over the list, filtering moved rows under the pointer and changed the photo | This is expected hover behaviour. The test now moves the pointer away first |

### Remaining (honestly named)

1. **The world can sit behind text on phones (from Round 1).** In the phone screenshots, the touch reveal of the background world shows behind some lines of copy, most visibly in Windows C and Reviews C at 390. The text stays on top, but its contrast drops where a dark figure sits behind it.
   - **Cause:** the screenshots jump-scroll, which drives the reveal hard. Steady finger scrolling also builds it up.
   - **Proposal:** cap the touch reveal's strength and let it fade faster while the page moves, so it stays a hint behind copy. I have **not** changed the accepted Round 1 behaviour on my own; please say if you want it.
2. **Windows C's figures are firm-wide.** They count all window jobs, not this window type. The copy says "documented window jobs" and "most window-only jobs" to keep that plain.
3. **Real hardware is untested** for the Windows C 3D separation and the Reviews C blur reveal (about 30 spans with a filter).
4. **Carried from earlier rounds:**
   - the world illustration request to Muse;
   - the hero hint that loops (planned for Round 5).

---

## 5. Skill ledger (§7)

**Read in full this round:**
- S1327 scroll-scrubbed word reveal;
- S1362 technical wireframe and exploded structure;
- S1358 image-first grid layout;
- S0618 FAQ page;
- S1425 law of figure-ground.

**Re-applied from earlier full reads:** S1326, S1442, S1329, S0405, S1330, S0489, and the critique set S1473 / S1479 / S1482 / S1496–S1501.

| Level | Item | Skills (tag → how used) |
|---|---|---|
| **Site** | Section headings (all four) | S1329 / S0451 word reveal with the unsplit label kept |
| Site | Buttons | S0405 (magnetic lean, sweep, press) |
| **Section: Windows** | C and D | S0650 (headings of 4–5 words), S0220 (FACTS.md figures; the firm's photos with their records), S1501 (one emphasis: the window in C, the photo in D) |
| Section: Reviews | C and D | S0220 (verbatim, build-checked; the aggregate is the only rating), S1496 (no per-review stars, no avatars, no initials) |
| **Element** | Windows C pinned stage | S1326 (sticky, scroll is truth, reversible, unpinned on phones and under reduced motion) |
| Element | Windows C exploded window | S1362 (layers separated along depth, numbered tags instead of a crowd of labels, calm motion), S1330 (eased pose) |
| Element | Windows C glass section | S1362 (connector lines drawn in), S0442 |
| Element | Windows C figures | S0083 (count-up ease-out on arrival), S0489 (once per change) |
| Element | Windows D archive index | S1358 (photo leads, quiet structure lines, anchored caption block), S0054 (`aria-pressed`, `aria-controls`, focus shows the photo) |
| Element | Windows D wipe and drift | S1436 (direction follows order), S1330 (damped pointer drift) |
| Element | Windows A room | S0442 (depth by tone, not texture), S1425 (the room recedes behind the screen and glass) |
| Element | Reviews C word scrub | S1327 (normalised progress, words reveal on overlap (n + 2), blur ≤ 5 px, 0.14 em rise, reduced motion = all shown, no pin on phones, reverse un-reads) |
| Element | Reviews D questions | S0618 (accordion semantics, Enter / Space, one open on wide screens), S0054 (arrow keys, `aria-expanded`) |
| Element | Reviews B dialog | S1425 (the scrim covers everything; the dialog is the only figure), S0054 (focus to close, Esc, focus returned) |

**Critique pass before gating:**

| Skill | Finding | Status |
|---|---|---|
| S1473 H1 visibility | Windows C shows which part is current in three places: the tag, the list and the figure | OK |
| S1473 H6 recognition | Reviews D repeats the open question above its answers | OK |
| S1479 critique | Windows C's exploded view was crowded | Fixed (#2) |
| S1498 composition | Reviews C desktop leaves the right of the stage open | Kept deliberately: a reading column at about 1,100 px measure |
| S1499 density | Windows D shows nine rows plus year markers, the right density for an archive | OK |
| S1496 brand | Lime and green only; the room's warm tones sit inside the window drawing; no steel | OK |
| S1425 figure-ground | Reviews B dialog | Fixed |
| S1482 QA | Breakpoints, keyboard, reduced motion, overflow | Checked (§4) |

---

## 6. Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10; PASS ≥ 7.0, none < 6.0, zero vetoes)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Windows C, Taken apart | 8.0 | 7.8 | 8.6 | 8.4 | **8.12** | PASS |
| Windows D, Jobs on record | 8.4 | 8.4 | 7.6 | 9.0 | **8.30** | PASS. My pick: the firm's own windows as proof |
| Reviews C, Reading pace | 8.2 | 7.8 | 8.2 | 8.4 | **8.10** | PASS |
| Reviews D, Ask the neighbours | 8.2 | 8.6 | 7.8 | 9.0 | **8.38** | PASS. My pick: answers real worries in customers' words |
| Windows A room (correction) | 8.0 | n/a | n/a | 8.0 | n/a | Correction landed |
| Reviews B dialog (correction) | n/a | 8.6 | n/a | n/a | n/a | Correction landed |

These are my own scores. Muse judges on the committed screenshots.

**Vetoes: none.**
- Only the firm's own photographs, captioned with their records.
- The room is a drawing, not a photograph.
- Quotes are verbatim and build-checked; there are no per-review stars.
- The locks are intact.
- No errors, no sideways scroll.

## 7. Screens (committed in `siding/redo/site/gate/`; no switcher in any frame)

- **Per-version sheets:** `u3-windows-c.jpg`, `u3-windows-d.jpg`, `u3-reviews-c.jpg`, `u3-reviews-d.jpg`.
- **Each frame:** `u3-{windows,reviews}-{c,d}-{1440,768,390}-{0,1,2}.jpg`.
- **Corrections:**
  - `u3-fix-windows-a-room.jpg`;
  - `u3-fix-wnA-lift-{day,dusk,night}-1440.jpg`;
  - `u3-fix-wnA-lift-{day,night}-390.jpg`;
  - `u3-fix-rvB-dialog-{1440,390}.jpg`.

## 8. Next

**Round 4 (Process + Try the job)** starts now. It folds in two corrections:
- process chapters stacking properly on phones;
- no repeat of the Services sideways rhythm.
