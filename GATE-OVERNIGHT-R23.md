# GATE: Overnight Round 23 — Try the job E and F (Try 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?try=e` and `?try=f`.

Both versions are new mini-games, so they stay in Try. Neither moves sideways, so there is no repeat of the Services rhythm, and neither dives, because the dive stays Try D's alone. Both use drawn line art only; no image was needed.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Try E, "Inspect it at dusk"** | Lando Norris (play with precision) | S0054 (every part of the house is a button, and focus moves the beam onto it), S1436 (the beam eases after the pointer at 0.22 per frame), S0405 (show all / start again), S0220 (the six faults map one-to-one onto the firm's own six-line inspection list from Process A) |
| **Try F, "Measure the opening"** | Scout Motors (honest tools, mechanical feel) | S0054 (each tape hook is a `role=slider`; arrows ⅛ in, Shift 1 in, Home/End), S0083 (the live reading in eighths), S1436 (the tape stops hard at the jamb; "measure it for me" runs the three tapes staggered), S0220 (the firm line: windows "measured, built to order, then set and sealed", 388 documented window jobs) |

## Build log, with how each differs from Try A–D

A–D all share the same four games (nail a board, seal a window, hang a gutter, paint the trim), laid out sideways (A, B), on a bench (C) or through the dive (D). E and F are new games with new mechanics.

- **Try E** (`o23-try-e.jpg`)
  - **Composition:** a drawn house under a dusk overlay. The torch beam is a radial mask that follows the pointer or finger.
  - **Game:** nine checkable parts of the house, six with a fault: a missing shingle, a sagging and blocked gutter, a gap in a window seal, a cracked lap board, peeling trim paint, and rot at the base. Each find ticks its line on the inspection list. A sound part says "looks sound".
  - **Close:** "The real inspection is free…" with the hours and the CTA.
- **Try F** (`o23-try-f.jpg`)
  - **Composition:** a drawn window opening with a slightly out-of-plumb right jamb, and three tape measures (top, middle, bottom).
  - **Game:** drag a hook until the tape stops at the jamb (35 ¼, 35 ⅛ and 35 ⅜ in). The widths table fills in, then "Order to the smallest: 35 ⅛ in. The widths differ by ¼ in…".
  - **Wording:** the 3-point rule is the general fitter's rule, worded as such, not as a firm claim. The measurements belong to the drawn opening, not to a real job.

## Self-tests

| Check | Result |
|---|---|
| E at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Roof → "Found: A missing shingle… Roof and flashing". Door → "The front door looks sound." Keyboard focus on the left window → beam moves to (31%, 68%); Enter counts it. "Show me all six" → 6 found, 6 ticks |
| F at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Dragging the top tape past the jamb → stops at "35 1/4 in". Shift+→ then → on the middle tape → "6 1/8 in". "Measure it for me" → 35 ¼ / 35 ⅛ / 35 ⅜, then "Order to the smallest: 35 1/8 in" |

**Defect fixed:** the right corner trim was drawn at opacity 0 (a leftover); it is now shown, so only the left trim carries the fault.

**Remaining:**
- E hides the system cursor over the house on fine pointers, so the beam is the cursor. Coarse pointers keep a normal cursor.
- F's tapes are drawn at a fixed 12 px to the inch, so on a 390 phone the hook is small (its hit circle is 40 drawing units, about 22 px). The "Measure it for me" button and the sliders cover it.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | E | Lando Norris play, S0220 |
| Section | F | Scout Motors tool feel, S0220 |
| Element | E beam | CSS mask with eased `--x`/`--y`, S1436 |
| Element | E parts | S0054 buttons; the found ring is lime |
| Element | E list | ticks fill in as faults are found |
| Element | F hooks | S0054 slider, pointer capture |
| Element | F readings | S0083, eighths reduced (¼, ½, ¾) |
| Element | F table | a real `<table>` with a caption |
| Element | Action buttons | S0405 |

**Critique pass:**
- **S1473 H6 (recognition):** E's list shows what to look for.
- **S1473 H5 (error prevention):** F's tape physically cannot overshoot the jamb.
- **Honesty:** E's faults are the firm's own inspection lines, and F's rule is labelled general practice.
- **S1496:** brand colours, plus muted drawing tones for materials.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Try E | 8.0 | 8.0 | 8.8 | 8.2 | **8.18** | PASS |
| Try F | 7.8 | 7.8 | 8.4 | 8.2 | **7.96** | PASS |

**Vetoes: none.** **Next: Round 24, Try the job G and H.**
