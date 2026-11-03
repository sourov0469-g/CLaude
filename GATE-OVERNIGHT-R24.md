# GATE: Overnight Round 24 — Try the job G and H (Try 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?try=g` and `?try=h`.

Both are new mini-games, so they stay in Try. Neither moves sideways and neither dives. Both use drawn line art only; no image was needed.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Try G, "Shingle it from the eave up"** | Cowboy (warm, tactile) | S0054 (each course is a button), S1436 (courses drop in with a small overshoot; a wrong pick shakes and explains), S0405 (lay it for me / rain test / start again), S0220 (closing line: GAF Master Elite, 204 priced shingle roofs, both from FACTS.md) |
| **Try H, "Level the window"** | Quiet Cubes (calm, tactile) | S0054 (two steppers with labelled − / + buttons and a live `output`), S1436 (the window settles on a damped spring, 0.12 / 0.78), S0083 (live degrees-off-level readout), S0220 (closing line: measured, built to order, set and sealed; Andersen Certified Premier; 388 documented window jobs) |

## Build log, with how each differs from Try A–F

- **Try G** (`o24-try-g.jpg`)
  - **Composition:** a bare roof deck with a drip edge and a gutter. Six bands to fill: the starter strip, then courses 1–5.
  - **Game:** the order is the puzzle. A band above a gap is refused with the reason (each course must lap the one below to shed water). When the roof is complete, "Rain test" runs drops down and off into the gutter.
  - **How it differs:** the only ordering game. A–D are one-action jobs, E is a search, F is a measurement.
- **Try H** (`o24-try-h.jpg`)
  - **Composition:** a window in its opening, 2.25° low on the left, with a lime level on its head.
  - **Game:** add or pull shims at each corner (0.75° each). Three on the left levels it, and the bubble centres.
  - **How it differs:** the only balance game; the result comes from combining two inputs, not from one action.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Course 3 first → refused, "Not yet. Starter strip goes first…". Starter, then course 1 → "Course 1 down. Next: course 2." "Lay it for me" → order 012345. Rain test runs |
| H at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. + right → "3.00°, the left side is low". Then, by keyboard, − right and + left ×3 → "0.00°, Level", with 3 shims drawn |

**Remaining:**
- G's roof is drawn face-on, not in perspective, so the shingle tab cuts read small at 390. The band labels stay legible.
- H has one solution path family (left minus right = 3), so it is a short game by design.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | Cowboy tactility, S0220 |
| Section | H | Quiet Cubes calm, S0220 |
| Element | G bands | S0054 buttons, refusal shake, S1436 |
| Element | G order list | counters fill lime |
| Element | G rain | CSS drops, two runs |
| Element | H steppers | S0054, `aria-live` output |
| Element | H level and bubble | spring, S1436 |
| Element | H readout | S0083 |
| Element | Action buttons | S0405 |

**Critique pass:**
- **S1473 H9 (help users recover from errors):** G explains every refusal.
- **S1473 H1 (visibility of status):** H's degrees readout updates live.
- **Honesty:** the closing lines use FACTS.md items only; the game numbers belong to the drawing.
- **S1496:** brand colours, plus muted material tones.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Try G | 7.8 | 8.2 | 8.2 | 8.0 | **8.02** | PASS |
| Try H | 7.8 | 8.2 | 7.8 | 8.0 | **7.94** | PASS |

**Vetoes: none.** **Next: Round 25, Try the job I and J.**
