# GATE: Overnight Round 21 — Process G and H (Process 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?process=g` and `?process=h`.

Both versions keep the firm's four real steps (shared `Proc.CH`) and its real hours. Figures come only from `Proc2.FIGS` (FACTS.md).

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Process G, "Stamp the card"** | Cowboy (warmth, a physical object) | S0405 (stamp spots are real buttons with `aria-pressed`), S1436 (a short ink-press: overshoot then settle, 0.5 s), S0054 (arrow keys move between stamps), S0220 (panel words and figures from the firm's copy only) |
| **Process H, "The whole job, in one paragraph"** | Dropbox Brand (subtraction) | S1500 (one paragraph as the whole layout), S1501 (the aside as the single supporting element), S0054 (step names are buttons inside the sentence; click, hover, focus), S1362 (the step line drawing draws in) |

## Build log, with how each differs from Process A–F

- **Process G** (`o21-process-g.jpg`)
  - **The card:** a lined job card, tilted 1°, "Austin Pro · Job card · Siding, Windows & Roofing", four stamp rings (01–04) and the hours along its foot.
  - **Behaviour:** choosing a step presses its seal; every step before it stays stamped, so the card reads as a job in progress. The side panel shows the step's words, figures and the CTA.
  - **How it differs:** A stacks cards, B pins a wall, C drops a plumb line, D opens columns, E turns a dial, F asks questions. G is the only one built as a physical object you mark.
- **Process H** (`o21-process-h.jpg`)
  - **Composition:** no cards, no list, no numbers in the body; the four steps are written as one plain paragraph, each step name a lime-underlined button. A sticky aside holds the chosen step's drawing and figures.
  - **Footer line:** "Book the inspection any day: Mon–Fri 8–8, Sat 8–6, Sun 12–5. Or call (512) 550-0000."
  - **How it differs:** the only text-first version; the controls live inside the sentence.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Click step 3 → stamps `1110`, pressed index 2, panel "Expert install". ArrowRight → "Final check" (all four stamped) |
| H at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Click "expert install" → aside "Step 03 · Expert install" |
| Locks | Phone, hours and figures unchanged; no new claims |

**Remaining:** on phones H's aside sits after the paragraph, so a tap on a step name updates a panel below the fold of the paragraph; acceptable (the paragraph is short) but named.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | Cowboy warmth via the card object, S0220 |
| Section | H | S1500, S1501, S0220 |
| Element | G stamps | S0405, S1436 press, `.done` carry-forward |
| Element | G keys | S0054 roving arrows |
| Element | H inline buttons | S0054, lime underline grows to a highlight |
| Element | H drawings | S1362 |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1473 H1 (visibility of status):** G shows how far along a job is at a glance.
- **Honesty:** no step text beyond the firm's own; H's paragraph rewrites only `Proc.CH` lines.
- **S1496:** brand colours only; reduced motion removes the press and draw-in.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Process G | 8.2 | 8.2 | 8.0 | 8.2 | **8.16** | PASS |
| Process H | 8.0 | 7.8 | 7.6 | 8.6 | **7.92** | PASS |

**Vetoes: none.** **Next: Round 22, Process I and J.**
