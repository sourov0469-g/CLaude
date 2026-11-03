# GATE: Overnight Round 10 — Services I and J (Services reaches 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?services=i` and `?services=j`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Services I, "Three rings, one visit"** | Cowboy (one named system: the one visit at the centre) | S1499 / data-viz honesty (radial bars, not a pie, because the counts overlap), S0083 (rings draw in, staggered 150 ms), S0054 (tabs mirror the rings, arrow keys), S0220 |
| **Services J, "The index"** | Lando Norris (the archive presented as an index) | S1500 (index type at 7.6 vw), S1330 (photo follows the pointer, damped at 0.18, tilting with velocity), S0054 (each row is a button that opens; on touch, inline), S0220 (the firm's own photos, captioned with place and month) |

## Build log, with how each differs from Services A–H

- **Services I** (`o10-services-i.jpg`)
  - **Composition:** three concentric arcs, one per trade, each as long as its documented jobs (431 = the longest). The centre reads "One visit · Every trade · on the house".
  - **Choosing a ring or its tab:** that ring turns deep green, the centre names the trade, and its facts and CTA appear beside it.
  - **A note says plainly:** one job can include several trades, so the rings are not parts of one whole.
  - **How it differs:** the only chart-led version.
- **Services J** (`o10-services-j.jpg`)
  - **Composition:** an index of three rows in display type (01 Siding 431, 02 Windows 388, 03 Roofing 241) under a heavy rule.
  - **Desktop:** pointing at a row slides it right and greys the others. One of the firm's job photos follows the pointer: Maple Run, Feb 2026 for siding; River Place, May 2026 for windows; Fairview, Round Rock, Jun 2025 for roofing.
  - **Click or tap:** opens the row with the photo, the lead, the facts and the CTA.
  - **How it differs:** the only typographic index, and the only pointer-following image.

## Self-tests

| Check | Result |
|---|---|
| I at 1440 / 768 / 390 | 0 errors, 0 overflow. Choosing ring 3 → Roofing; ArrowLeft → Windows |
| J at 1440 / 768 / 390 | 0 errors, 0 overflow. Opening row 3 shows only that row, captioned "Fairview, Round Rock · Jun 2025". The preview is hidden on phones, where rows open inline |

### Defects found and fixed this round

1. **Services I:** the centre label sat over the inner ring and blocked clicks on it. It is now click-through.
2. **Services I:** the ring labels touched the ring ends; they were moved left.

### Remaining

The file grew by 0.57 MB: three 640 px job photos for J, a second copy of Services D's jobs at a smaller size. This can be consolidated once the owner picks.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | I | S1499, S1501 (the selected ring), S0220 |
| Section | J | S1500, S1501 (the type), S0220 |
| Element | I rings | S0083 (draw 1.6 s), S0405 (hover darkens) |
| Element | I tabs | S0054 |
| Element | J rows | S0405 (slide 14 px), S0618 (one open at a time) |
| Element | J photo preview | S1330 |
| Element | Buttons | S0405 |

**Critique pass:**
- **Honesty:** the overlapping counts are not shown as parts of a whole, and the note says so.
- **S1498:** J's index balances its three rows.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Services I | 8.2 | 8.2 | 8.2 | 8.6 | **8.24** | PASS |
| Services J | 8.6 | 8.0 | 8.0 | 8.4 | **8.28** | PASS |

**Vetoes: none.**

**Services now has 10 versions (A–J). Next: Round 11, Visualiser E and F.**
