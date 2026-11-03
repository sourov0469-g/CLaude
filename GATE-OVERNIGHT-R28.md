# GATE: Overnight Round 28 — On your street I and J (Area 10 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?area=i` and `?area=j`.

Both versions read only the firm's documented-project records (`__NEAR`). The locked wording "886 documented projects since 2018 · 312 on the map with photos + 574 more counted" appears verbatim.

Neither version draws a map, plots dots or shows a count total:
- I lists towns and never sums them.
- J shows shares only, never counts.

With this round, On your street reaches A–J.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Area I, "Miles from our door"** | Cowboy (the ride from here) | S0054 (a native range input with `aria-valuetext` "N miles"), S1436 (the fill follows the range), layout (labels placed in measured lanes so none overlap; on phones the ruler becomes a two-column list), S0220 (straight-line distance from the office to each town's centre in the finder's own positions, stated as "not driving miles"; the real address is shown) |
| **Area J, "Year by year"** | Quiet Cubes (calm, one figure at a time) | S0054 (the trade choice is a `radiogroup`), data visualisation (five bars on one 0–100% scale; the partial year is hatched), S1330 (bars rise staggered when the section arrives), S0220 (shares only; on-page notes that multi-trade jobs count in each trade, that 2022 is thin and that 2026 runs to September) |

## Build log, with how each differs from Area A–H

- **Area I** (`o28-area-i.jpg`)
  - **Composition:** one 0–60 mi ruler starting at "Our door", with 20 towns (three or more documented projects each) at their distances.
  - **Range:** "How far are you from us?" lights every town inside the range and reads them out.
  - **Beyond 60 mi:** towns further out are named in a line below (San Antonio 82 mi, Jewett 117 mi).
  - **How it differs:** the only version measured from the office.
- **Area J** (`o28-area-j.jpg`)
  - **Composition:** six trade chips over five tall year bars (2022–2026), each with a big percentage.
  - **Example:** Siding was on 90% of 2022's documented jobs and 46% of 2026's so far; Windows rose from 40% to 54%.
  - **How it differs:** the only version over time by trade share.

## Self-tests

| Check | 1440 | 768 | 390 |
|---|---|---|---|
| Errors, overflow, h1, duplicate ids | 0 / 0 / 1 / 0 | 0 / 0 / 1 / 0 | 0 / 0 / 1 / 0 |
| I: label overlaps (measured) | 0 of 20 | 0 of 20 | list layout |
| I: range to 20 mi | Austin, Pflugerville, Manor, Round Rock, Cedar Park, Lakeway, Hutto, Leander, Lago Vista, Del Valle, Buda | same | same |
| I: ← key | "19 miles" | "19 miles" | — |
| J: Siding | 90 / 83 / 44 / 44 / 46% | same | same |
| J: Windows | 40 / 40 / 38 / 44 / 54% | same | same |
| J: bars | animate to height | animate to height | animate to height |
| Locks | 886 wording verbatim | 886 wording verbatim | 886 wording verbatim |

**Defects fixed:**
- The "Our door" label collided with the 0 mi tick; the 0 tick is gone.
- "60 mi" wrapped onto two lines; it is now kept on one line.

**Remaining:**
- At 768, the cluster of towns between 14 and 20 mi stacks five lanes high. It is legible, but tall.
- Distances come from the finder's projected positions, so they are approximate. The page says so.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | I | ride-from-here framing, S0220 |
| Section | J | calm single-figure framing, data visualisation, S0220 |
| Element | I range | S0054 |
| Element | I labels | measured lane layout |
| Element | I lit towns | fill and readout, `aria-live` |
| Element | J chips | S0054 radiogroup |
| Element | J bars | S1330 stagger; hatched partial year |

**Critique pass:**
- **S1473 H2 (match the real world):** "How far are you from us?" is the visitor's own question.
- **Honesty:** straight-line distances are labelled as such; shares are not counts; the caveats sit on the page.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Area I | 8.0 | 8.2 | 8.0 | 8.4 | **8.10** | PASS |
| Area J | 8.0 | 8.0 | 7.4 | 8.2 | **7.90** | PASS |

**Vetoes: none.** **Next: Round 29, Booking E and F.**
