# GATE: Overnight Round 11 — Visualiser E and F (Visualiser 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?vis=e` and `?vis=f`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Visualiser E, "Pairings to start from"** | Ever, **craft note only**: selection and filtering presentation | S1497 (body and trim contrast; the drawing carries the colour), S0618 / S1442 (filter as plain choices), S0054 (open view: arrow keys, Esc, focus returned), S0220 (published ColorPlus and Sherwin-Williams values only; pairings labelled as suggestions) |
| **Visualiser F, "The colour map"** | Cash App Brand Guidelines (colour treated as a system) | S1499 / data honesty (both axes computed from published values: √luminance and red − blue), S0054 (radiogroup; arrow keys move to the nearest dot in that direction), S0083 (dots arrive staggered 25 ms), S1497 |

## Build log, with how each differs from Visualiser A–D

### Visualiser E (`o11-vis-e.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)

**Composition.** A grid of 12 drawn house fronts. Each is painted in a ColorPlus body with a trim:
- Arctic White on the mid and dark bodies;
- Tricorn Black or Timber Bark on the light ones.

**Interaction:**
- A filter shows light, mid or dark bodies.
- Opening a pairing shows it large with both names and published values; you can step through or go back to all.

**Copy:** the pairings are presented as "our suggestions only; the choice is yours at the free inspection".

**How it differs:**
- A is a fan of swatches.
- B builds a wall.
- C floods one wall with one colour.
- D is a stepped instrument.
- E is the only gallery of ready-made pairings.

### Visualiser F (`o11-vis-f.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)

**Composition.** All 29 published colours (17 ColorPlus as round dots, 12 painted Sherwin-Williams as square dots) placed on a map: lighter at the top, warmer to the right.

**Interaction.** Choosing a dot shows it on a house, with its 3 nearest neighbours as small houses you can jump to. Arrow keys move across the map.

**How it differs:** the only version that shows how the colours relate to each other.

## Self-tests

| Check | Result |
|---|---|
| E at 1440 / 768 / 390 | 0 errors, 0 overflow. "Light" → 3 pairings. Opening pairing 3 shows "Deep Ocean with Arctic White trim"; ArrowRight → "Mountain Sage…"; Esc closes and returns focus |
| F at 1440 / 768 / 390 | 0 errors, 0 overflow. 29 dots. From Iron Gray, ArrowUp → Night Gray |

### Defects found and fixed this round

1. **F:** the large house drawing used class `lg`, the legend's class, so it was pinned to the map's corner. Renamed. The panel was also renamed away from `.hero2`.
2. **F:** the y-axis labels bunched in the middle and overlapped "Cooler"; they now sit at the corners.
3. **E:** the copy no longer implies the firm brings samples. It now reads "the choice is yours at the free inspection".

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | E | S1497, S1501 (the painted house), S0220 |
| Section | F | S1499, S1501 (the chosen dot and its house), S0220 |
| Element | E filter | S1442 |
| Element | E cards | S0405 (hover lift 4 px) |
| Element | E open view | S0054 |
| Element | F dots | S0054 (radio, roving tabindex, directional arrows), S0405 (hover 1.25×) |
| Element | F neighbour houses | S0405 |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1497:** F's dot outlines keep pale colours visible on the pale map.
- **S1498:** E's grid rhythm is 4 / 3 / 2 columns by width.
- **S1496:** the brand stays out of the house colours; they are the published product colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Visualiser E | 8.2 | 8.6 | 7.4 | 8.4 | **8.14** | PASS |
| Visualiser F | 8.4 | 8.0 | 8.8 | 8.6 | **8.38** | PASS |

**Vetoes: none.** **Next: Round 12, Visualiser G and H.**
