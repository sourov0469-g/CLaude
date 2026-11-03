# GATE: Overnight Round 27 — On your street G and H (Area 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?area=g` and `?area=h`.

**Data:** both versions read only the firm's documented-project records (`__NEAR`). Town figures are the finder's own tallies, as in Area D.

**Lock:** "886 documented projects since 2018 · 312 on the map with photos + 574 more counted" appears verbatim.

**Not shown:** no map, no dots and no grand total. The drivable map stays Area C's alone.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Area G, "The streets we know"** | Scout Motors (roadside Americana) | <ul><li>S0054: the town picker is a `radiogroup`; each sign is a toggle button that turns over.</li><li>S1436: signs hang in with a swing, 40 ms apart, and turn over in 0.6 s.</li><li>S0220: neighbourhood counts, trades and latest month come straight from the records.</li></ul> |
| **Area H, "Town by trade"** | Dropbox Brand (one bold grid) | <ul><li>S0054: the grid has one tab stop; arrow keys, Home and End move within it.</li><li>Data visualisation: each square's area scales with the √ of its count; the scale is stated.</li><li>S0405: column headers sort the rows.</li><li>S0220: "a job with two trades counts in both columns" is stated on the page.</li></ul> |

## Build log, with how each differs from Area A–F

- **Area G** (`o27-area-g.jpg`)
  - **Composition:** town chips; underneath, the chosen town's neighbourhoods hang as green street-name signs with a white inner border, each with its documented-job count.
  - **Sign backs:** turning a sign over (lime back) shows the latest month and the top three trades there.
  - **How it differs:**
    - A–B pin photos.
    - C drives a map.
    - D ranks bars.
    - E searches.
    - F lists by time.
    - G is the only version that presents neighbourhoods as objects you can turn over.
- **Area H** (`o27-area-h.jpg`)
  - **Composition:** an 11-town × 6-trade matrix (towns with 6 or more documented projects).
  - **Squares:** each square's size reflects documented projects.
  - **Sorting:** headers sort by town tally or by any trade.
  - **Readout:** a live line, e.g. "Round Rock · Roofing: 47 documented projects, latest Oct 2025."
  - **How it differs:** the only version that crosses place with trade.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | <ul><li>0 errors, 0 overflow, 1 h1, 0 duplicate ids.</li><li>Austin: 11 signs (Milwood, North Austin, South Austin, Maple Run…).</li><li>Cedar Park: 9 signs.</li><li>Turning the first sign over shows: "Latest Aug 2026, Siding · Exterior Painting · Garage Doors".</li></ul> |
| H at 1440 / 768 / 390 | <ul><li>0 errors, 0 overflow, 1 h1, 0 duplicate ids.</li><li>Sort by Windows: Austin, Round Rock, Cedar Park, Pflugerville; readout "Austin · Windows: 251…, latest Sep 2026".</li><li>↓ → moves to Round Rock · Roofing; exactly one tab stop.</li></ul> |
| Locks | 886 wording verbatim |

**Defects fixed:**
- **Global `.mx` rule:** it shrank H's wrapper to 44 × 44, so the matrix vanished. The class was renamed to `.mtx`.
- **Bars instead of squares:** the cells drew as wide bars because their size was taken from cell width. They are now sized from the row height.

**Remaining:**
- At 390 px, H's table (min 560 px) scrolls sideways inside its own frame, not the page, and the Painting, Gutters and Doors columns sit off screen until scrolled.
- G shows each town's top 12 neighbourhoods only, the same cut-off Area D uses.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | roadside-sign grammar, S0220 |
| Section | H | bold-grid grammar, data visualisation, S0220 |
| Element | G town picker | S0054 radiogroup |
| Element | G signs | 3D turn with backface hidden; hang animation, S1436 |
| Element | H sort headers | `aria-pressed` |
| Element | H cells | roving tabindex, S0054 |
| Element | H readout | `aria-live` |

**Critique pass:**
- **S1473 H6 (recognition):** G uses the real-world street sign.
- **Honesty:**
  - Double counting across trades is stated on the page.
  - The town tallies are the finder's own.
  - No sum is shown.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Area G | 8.4 | 8.0 | 8.4 | 8.2 | **8.26** | PASS |
| Area H | 8.0 | 7.6 | 7.6 | 8.6 | **7.88** | PASS |

**Vetoes: none.**

**Next:** Round 28, On your street I and J.
