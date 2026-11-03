# GATE: Round 4 — Process + Service area

**Date:** 2026-11-03.
**Built under:** the process note (finish the homepage, then stop for joint verification by Muse and the owner).

**Live order now:** header → hero → services → visualiser → windows → reviews → **process** → **On your street**.

Backups stay in the file; to view them use `?process=b` and `?area=b`.

## 1. What was built

### Process (direction v2: full-view stacked chapters, NOT five cards; the five-block layout is banned)

The firm's own four steps from its siding and windows pages: Free Inspection → Detailed Proposal → Expert Install → Final Check.

| | **A — four stacked chapters (WINNER)** | B — one pinned wall (backup) |
|---|---|---|
| Presentation | Each chapter is a full-view card. The next slides over it while the one beneath sinks back (card stacking). Chapter dots show progress. | The section pins. Scrolling runs one wall through the job: the old siding falls away, house wrap shows, new lap courses slide on, trim goes up. Captions and a step rule follow; the rule's steps jump to each stage. |
| 01 Inspection | A clipboard checklist ticks itself when the chapter arrives; each item can be ticked by hand (`role=checkbox`). Hours locked: Mon–Fri 8–8 · Sat 8–6 · Sun 12–5. Ray Cole's words on the 15-minute measure. | — |
| 02 Proposal | Real price bands by trade: Siding, Windows or Roofing. Shows the middle half of jobs and the median band on a $0–30k axis, with the source line (415 / 376 / 204 priced jobs, 2022–2026). Joe Liu's words: "fair and transparent estimate". | — |
| 03 Install | Lap courses go up course by course as you scroll through the chapter. 1–2 weeks for siding; 2 days for most window jobs. Ken Weigand's words on a roof in one day. | — |
| 04 Final check | The punch list ticks in. A "Lifetime workmanship · on labor" seal stamps on. Hardie's 30-year non-prorated warranty. Key CTA. Katie Littleton's words on the pollen. | — |

All quotes are checked verbatim against `reviews.json` at build time; the build fails on any change.

### Service area, "On your street" (sheet: pinned photo cards, rippling thread, board-end signs; MORE interactivity; NO drawn map)

| | **A — the thread board (WINNER)** | B — "Is your street on our list?" (backup) |
|---|---|---|
| Content | **Eight of the firm's own published job photos.** Each shows its recorded neighbourhood, town, date and trades (Maple Run, Fairview, Anderson Mill West, Windermere, Block House Creek, Georgetown, Ashford Park, River Place). Each card links to that project's page on austinprosiding.com. | The same photos as a deck |
| Interaction | A thread runs through every pin and behaves like a damped string: the cursor ripples it, and hovering a card tugs its pin. **Board-end signs** on a post (Austin 541, Round Rock 110, Cedar Park 35, Leander 28, Pflugerville 28, Georgetown 21, Buda 8 documented projects) **filter the board** to one town and pulse the thread there. | Typeahead (combobox, arrow keys) over **all 196 recorded neighbourhoods plus the towns**, which answers "Yes. 110 documented projects in Round Rock…" and brings that town's photos to the top. Drag (or arrow keys) moves the top photo to the back. |
| Locks | "886 documented projects since 2018: 312 on the map with photos + 574 more counted" (verbatim) | same |

## 2. Audit (Playwright, 1440 × 900 and 390 × 844 touch)

| Check | Result |
|---|---|
| JS errors / sideways scroll | **0 / none**, all four versions, both widths |
| Inspection | 6 of 6 ticked on arrival; a hand tick toggles back |
| Price band | Windows → "$5k–$25k", source "376 priced window jobs" |
| Install scrub | `--p` reaches 1.000 (desktop and phone) |
| Thread | Path built through all 8 pins. Round Rock sign → 7 of 8 cards dimmed; pressing again clears it. |
| Typeahead | "maple" → "Maple Run, Austin"; Enter → "Yes. 541 documented projects in Austin; 2 pinned here with photos." The Leander sign brings Block House Creek to the top. An unknown entry offers the phone number. |
| Deck | Drag moves Block House Creek to the back (Maple Run on top) |
| Reduced motion | All chapters in final state; the checklist is pre-ticked; no stacking motion |

### Defects found and fixed

| # | Defect | Fix |
|---|---|---|
| 1 | **Class collision:** the chart legend was called `key`, so the chapter-4 button (`btn key`) took its 13px font | Legend renamed `lgd`; all key buttons are 56px / 16.5px again |
| 2 | **Class collision:** the legend values used `v1` / `v2`, the hero version classes, and inherited the hero's 104px padding | Renamed `lv1` / `lv2`; checked every global class name against section markup (only the intended `.hint` remains shared) |
| 3 | Price chart cramped on a $0–50k axis; floating labels overlapped | $0–30k axis, taller bars, values moved into the legend |
| 4 | Phones: the install wall never built (the scroll handler returned before the scrub) | The scrub now runs at every width |
| 5 | Phones: the warranty seal overlapped the punch list | The seal sits in the flow above the list |
| 6 | The build passed every section's JS to node as an argument and hit the OS limit once the photos were added | Program passed on stdin |
| 7 | Copy named steps the records don't state ("house wrap checked", "old masonite, soft at the base") | Cut to what FACTS.md supports |

### Remaining defects (open)

1. **The photos are embedded twice** (live board and backup deck): about +0.5 MB. The file is now 9.2 MB.
2. **Process A, phones:** the chapters stack in normal flow rather than sticky-stacking (chosen for readable height at 390).
3. **On your street, phones:** the cards scroll sideways with no arrow hint.

## 3. Screens

In `siding/redo/site/gate/`:
- `r4-process-1440.jpg`
- `r4-process-390.jpg`
- `r4-area-1440.jpg`
- `r4-area-390.jpg`

## 4. WEB-SKILLS tags

| Tag | Applied |
|---|---|
| ⟦S0001⟧ | One object per chapter: clipboard, price band, wall, seal. Real photos on a real thread. |
| ⟦S0056⟧ | Transform and opacity only. The thread runs only while moving and in view. One rAF per scroll. |
| ⟦S0089⟧ | Damped string thread; over-shoot stamp and sign shifts |
| ⟦S0650⟧ | "Four steps, start to finish." / "On your street." / "Is your street on our list?"; support ≤ 35 words |
| ⟦S0220⟧ | Only documented figures; genuine photos with their recorded place and date; no map |
| ⟦S0049⟧ | Checkboxes, pressed signs, a combobox with listbox and active descendant, and keyboard on the deck |
| ⟦S1320⟧ | Complete with reduced motion; markup pre-rendered |

## 5. Scorecard

PASS = weighted ≥ 7.0, no category < 6.0, zero vetoes.

| Version | Design 40 | Usability 30 | Creativity 20 | Content 10 | Weighted | Verdict |
|---|---|---|---|---|---|---|
| **Process A** | 8.0 | 8.2 | 7.8 | 9.0 | **8.12** | **PASS — live** |
| Process B | 7.6 | 7.4 | 8.0 | 7.6 | 7.62 | Backup: strong motion, thinner content |
| **On your street A** | 8.4 | 8.0 | 8.4 | 8.8 | **8.32** | **PASS — live** |
| On your street B | 7.6 | 8.4 | 7.6 | 8.6 | 7.90 | Backup: the most useful finder, but closer to a form than the sheet |

**Vetoes:** none.

## 6. Next

**Round 5:** the horizontal-scroll interactivity sequence (the game idea, one piece per full view, sideways) and the booking panel with the stacked-course footer.

Then the nav polish, including the cursor companion with 2–3 variants.

Then **STOP at the homepage gate** for joint verification by Muse and the owner.
