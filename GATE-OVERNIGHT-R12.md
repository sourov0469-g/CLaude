# GATE: Overnight Round 12 — Visualiser G and H (Visualiser 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?vis=g` and `?vis=h`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Visualiser G, "Four questions, three colours"** | Quiet Cubes (the visualiser as a design service: the questions a designer asks) | S1442 (four radio groups with persistent labels, no submit, results update live), S0054 (fieldset/legend; `aria-live` results), S1497 (suggestions from computed lightness and warmth), S0220 (visual reasons only: no heat, energy or value claims; labelled "a starting point, not a rule") |
| **Visualiser H, "Colour in Austin light"** | Scout Motors (filmic light) | S1497 (the same colour under four washes), S0054 (two radiogroups with roving tabindex and arrow keys), S0489 (the light change eases in 0.9 s; reduced motion is instant), S0220 (labelled as a drawing; real samples at the inspection) |

## Build log, with how each differs from Visualiser A–F

- **Visualiser G** (`o12-vis-g.jpg`)
  - **The questions:**
    1. roof colour;
    2. brick or stone;
    3. shade;
    4. the look you lean to.
  - **The results:** three ColorPlus colours on drawn houses, each with up to two visual reasons, for example "stands apart from a dark roof" or "warm enough to sit beside brick". They update with every answer.
  - **How it differs:** the only version that asks you anything; A–F all start from the colours.
- **Visualiser H** (`o12-vis-h.jpg`)
  - **Composition:** one wide lap wall with an eave, a fascia and a window, drawn in your chosen ColorPlus colour.
  - **The four lights:**
    - **morning sun:** warm wash, short shadow;
    - **noon:** bright, very short shadow;
    - **shade:** cool, long and soft;
    - **dusk:** amber to violet, with the window lit.
  - **Moving the light:** the light wash and the eave's shadow change together.
  - **How it differs:** the only version about light rather than choosing or combining colours.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | 0 errors, 0 overflow. No answers: Arctic White / Cobble Stone / Navajo Beige. After dark roof + brick + full sun + earthy: Khaki Brown ("a mid tone with warmth, reads well in bright sun"), Navajo Beige, Cobble Stone |
| H at 1440 / 768 / 390 | 0 errors, 0 overflow. Dusk + Evening Blue → "Evening Blue · Dusk" |

**Defects:** one reason was reworded from "holds its colour in full sun", which could read as a fade-resistance claim, to "reads well in bright sun".

**Remaining:** G's scoring is a simple visual heuristic, stated as a starting point. It is not a designer's judgement.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | S1442, S1501 (the three results), S0220 |
| Section | H | S1497, S1501 (the wall), S0220 |
| Element | G radio pills | S1442, S0405 (lift), S0054 (visible focus) |
| Element | G result cards | S0083 (stagger 70 ms) |
| Element | H light switch and colour chips | S0054 |
| Element | H shadow and wash | S0489 |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1473 H2** (match with the real world): the questions use homeowners' words.
- **Honesty:** the reasons are visual only.
- **S1496:** the brand stays in the chrome.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Visualiser G | 7.8 | 8.8 | 8.2 | 8.0 | **8.20** | PASS |
| Visualiser H | 8.2 | 8.2 | 8.0 | 7.8 | **8.10** | PASS |

**Vetoes: none.** **Next: Round 13, Visualiser I and J.**
