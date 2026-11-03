# GATE: Subpages, Round S2 — Siding 3 (What siding costs here) and Siding 4 (Warranty and time on site)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. The plan for all eight pages is in GATE-SUB-01.
**Defaults:** the homepage is unchanged. Version A is the default on each new section.
**How to view:** `?page=siding&sd3=a|b|c` and `?page=siding&sd4=a|b|c`.

**Sources:** every figure here was found in the built homepage before use:
- the band: 415 priced siding jobs, 2022–2026, materials and labour before tax; middle half $5k–$20k; median band $10k–$15k (Process A);
- the two warranties;
- 1–2 weeks including paint;
- "full wall or whole house, no patch repairs";
- the install order (Process copy).

The full siding price distribution, the per-city bands and the "what moves the price" levers are in FACTS.md but **not** on the homepage, so they are not used.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| sd3 A "The price tag" | Cowboy (warmth, a physical object) | S1436 (the tag swings and turns over), S0054 (`aria-pressed` toggle whose label reads the side shown), S0220 |
| sd3 B "The column" | Apple AirPods Pro (one measured scale) | data visualisation (vertical $0–$30k scale; bands rise into place, height exact to scale), S1330, S0220 |
| sd3 C "One sentence" | Dropbox Brand (subtraction) | S1442 (the band as one plain sentence), S0054 (three terms are disclosure buttons; notes only define the terms), S0220 |
| sd4 A "Two certificates" | Scout Motors (heritage paper) | S1501 (two cards), seals drawn as line art, S0220 |
| sd4 B "Year by year" | Graza (the custom-animation bar) | S0054 (native range with `aria-valuetext`), S0220 ("non-prorated" given its plain meaning; past 30 years it says the Hardie warranty runs 30 years, never more) |
| sd4 C "On site, in order" | Quiet Cubes (calm) | S1330 (steps light in order, 160 ms apart), S0220 ("Order, not to scale"; no day-by-day schedule invented) |

## Build log

**sd3 What siding costs here**
- A: headline and plain lines on the left, a hanging tag on the right. Front: "Median band $10k–$15k, siding, per job". Back: how it was measured, plus "$5k–$20k, middle half of jobs".
- B: a tall column with a $0–$30k scale, a light middle-half bar ($5k–$20k) and a dark median bar ($10k–$15k). Big labels beside it.
- C: one large sentence ("Across 415 priced siding jobs, the middle half came in between $5k and $20k, and the median band was $10k–$15k, all in."). Dotted terms open the defining notes.
- How they differ: an object, a chart, a sentence.

**sd4 Warranty and time on site**
- A: a cream James Hardie 30-year certificate and a green Austin Pro lifetime certificate, with the time on site as pills.
- B: a year slider from "Job done" to year 40, with two readouts. Hardie: "Covered, Year N of 30, non-prorated", or "Past 30 years". Labor: "Covered, Lifetime".
- C: five steps in order (Old siding off, New boards up, Trim, Paint, Walk-through) under "1–2 weeks on site", then a green band giving the two warranties "from the last day".
- How they differ: paper, time as a control, process.

## Self-tests

Every version at 1440 / 768 / 390: 0 errors, 0 overflow, 1 h1 (the page opener), 0 duplicate ids.

| Check | Result |
|---|---|
| sd3 A | The tag turns over, and its label reads the back side |
| sd3 B | Middle-half bar 220 px and median bar 73 px of a 440 px column: exactly 15/30 and 5/30 of the scale |
| sd3 C | "median band" opens "The price band the middle job falls in: $10k to $15k."; opening "middle half" closes the first note |
| sd4 B | Year 34 → "Past 30 years · The James Hardie warranty runs 30 years". Year 18 → "Covered · Year 18 of 30, non-prorated", `aria-valuetext` "Year 18" |
| sd4 C | Steps light; the last (Walk-through) turns green |

**Defect fixed:** sd3 A said the price depends on "the walls, the trim and the work you choose", which is not homepage wording. It now uses the homepage's own phrase: "an itemised price for the work you want".

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | sd3 | object, chart and sentence grammars, S0220 |
| Section | sd4 | certificate, control and process grammars, S0220 |
| Element | sd3 A tag | turn-over, S1436 |
| Element | sd3 B bars | scale-exact |
| Element | sd3 C terms | disclosure |
| Element | sd4 B range | S0054 |
| Element | sd4 C steps | S1330 |

**Critique pass:**
- **Honesty:** no derived figure; term notes define words only; the 30-year limit is stated plainly.
- **S1496:** brand colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| sd3 A The price tag | 8.2 | 7.8 | 8.2 | 8.4 | **8.10** | PASS |
| sd3 B The column | 8.0 | 8.4 | 7.4 | 8.6 | **8.06** | PASS |
| sd3 C One sentence | 8.2 | 8.2 | 7.8 | 8.8 | **8.18** | PASS |
| sd4 A Two certificates | 8.2 | 8.4 | 7.4 | 8.6 | **8.10** | PASS |
| sd4 B Year by year | 7.8 | 8.2 | 8.0 | 8.4 | **8.02** | PASS |
| sd4 C On site, in order | 8.0 | 8.4 | 7.4 | 8.6 | **8.06** | PASS |

**Vetoes: none.** **Next: Round S3, Siding 5 (Siding jobs on record) and Siding 6 (Book the siding inspection).**
