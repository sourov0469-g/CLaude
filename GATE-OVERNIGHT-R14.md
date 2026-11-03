# GATE: Overnight Round 14 — Windows E and F (Windows 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?windows=e` and `?windows=f`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Windows E, "376 priced window jobs, by maker"** | Apple AirPods Pro (numbers as events) | S1499 / data honesty (a unit chart: 1 mark = 1 priced job; the 15 with another maker or none recorded are shown, not hidden), S0083 (marks fill in at 3 ms each), S0054 (maker buttons with `aria-pressed`; the chart has a full text alternative), S0220 (FACTS.md counts, as already shown in Windows A) |
| **Windows F, "How each window opens"** | Graza (custom-animation quality bar) | S1362 (line drawings), S1436 (sash slides and casement swing with overshoot), S0489 (each opens once on arrival, then on hover, focus or tap; never loops), S0220 (general types; no maker or job claim) |

## Build log, with how each differs from Windows A–D

- **Windows E** (`o14-windows-e.jpg`)
  - **Composition:** 376 tiny two-pane window marks in a grid, coloured by maker.
  - **Beside the grid:** maker buttons with counts, then the median band ($10k–$15k), "2 days" and "388 documented window jobs in all".
  - **Choosing a maker:** its windows come forward and the rest fade.
  - **How it differs:** A–D are a single window, a bay, an exploded window and a photo archive. E is the only chart.
- **Windows F** (`o14-windows-f.jpg`)
  - **Composition:** five cards, each with a type name, one line on how it opens, and a drawing that moves:
    - single-hung: the lower sash rises;
    - double-hung: both sashes move;
    - casement: swings out;
    - slider: glides sideways;
    - picture: fixed, with a light glint.
  - **Footer:** "We measure every opening at the free inspection", plus 2 days.
  - **How it differs:** the only version about window types and their movement.

## Self-tests

| Check | Result |
|---|---|
| E at 1440 / 768 / 390 | 0 errors, 0 overflow. 376 marks (238 NT, 15 other); clicking Andersen holds Andersen |
| F at 1440 / 768 / 390 | 0 errors, 0 overflow. The arrival sequence plays once; Casement press → `aria-pressed` true, the sash swings |

**Defects:** none found.

**Remaining:** the casement swing uses a 3D-feel transform on an SVG group, which software GL shows correctly; a real-device check is still owed.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | E | S1499, S1501 (the chart), S0220 |
| Section | F | S1501 (the moving drawing), S0220 |
| Element | E marks | S0083, mask-drawn panes |
| Element | E maker buttons | S0054, S0405 (slide 4 px) |
| Element | F cards | S0405 (lift), S0054 (`aria-pressed`) |
| Element | F sash movements | S1436, S0489 |
| Element | Buttons | S0405 |

**Critique pass:**
- **Honesty:** E shows every priced job, including the 15 others.
- **S1498:** F's five-up row becomes 3 then 2 columns.
- **S1496:** green and lime only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Windows E | 8.2 | 8.2 | 8.4 | 8.8 | **8.30** | PASS |
| Windows F | 8.2 | 8.4 | 7.8 | 8.0 | **8.16** | PASS |

**Vetoes: none.** **Next: Round 15, Windows G and H.**
