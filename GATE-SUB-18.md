# GATE: Subpages, Round S18 — Service Area 3 (Neighbourhoods) and 4 (From the office)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.

**Defaults:** the homepage is unchanged. Version A is the default on each new section.

**How to view:** `?page=area&sa3=a|b|c` and `?page=area&sa4=a|b|c`.

**Sources.** Both sections use only the firm's own records. Neither draws a map.

- **Neighbourhoods:** each town's most-named neighbourhoods, with the number of records that name each. The data keeps up to twelve per town, the same set On your street D uses on the homepage, and the page says "up to twelve per town". Names appear exactly as recorded. A town's own name is left out of its list.
- **From the office:**
  - Distances use the real address, measured to each town's centre in our records.
  - Every distance is labelled "straight line, not driving miles", as in On your street I.
  - Only towns with three or more documented projects are listed.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| sa3 A "Open a town" | Erie Home, **note only**: disclosure grammar | Native `details` for 10 towns, with a +/− icon; chips show their counts |
| sa3 B "Pick a town" | Cash App Brand Guidelines (list and detail) | S0054 `radiogroup` (12 towns); the detail pane changes with `aria-live` |
| sa3 C "Side by side" | Dropbox Brand (columns of type) | The five towns with the most documented work, in five ruled columns |
| sa4 A "Nearest first" | Cash App Brand Guidelines (one sorted list) | Numbered list with dotted leaders to the miles |
| sa4 B "The directions card" | Scout Motors (a plain printed card) | Address card with a Directions link (Google Maps search), call, hours, email, and the towns within 10 miles |
| sa4 C "Three distance bands" | Dropbox Brand (three groups, big type) | Within 10, 10–20 and 20+ miles; town names only |

## Build log

**sa3 Neighbourhoods**
- A: a ten-town accordion (Austin open).
- B: a town list on the left and a large detail pane on the right (for example, Cedar Park: Anderson Mill West 3, Ridgewood 2, …).
- C: five columns: Austin, Round Rock, Cedar Park, Leander, Pflugerville.
- How they differ: accordion, list and detail, columns.

**sa4 From the office**
- A: 22 towns nearest first: Austin 3 mi, Pflugerville 8, Manor 9, Round Rock 11, Cedar Park 14 …
- B: a cream card, "7801 N Lamar Blvd, Suite C70." Within 10 miles: Austin, Pflugerville, Manor.
- C: three bands. The first, in green, holds 3 towns; the second 8; the third 11.
- How they differ: list, card, bands.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 shows 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| sa3 A | 10 towns; first open; no town appears in its own list |
| sa3 B | Choosing Cedar Park loads its neighbourhoods |
| sa4 | Distance figures match On your street I on the homepage (same positions, same method) |

**Fixed before gating:** sa3 A first labelled each town "N neighbourhoods named". The data caps each list at twelve, so that number would undercount large towns. It now reads "Most-named neighbourhoods", and the note says "up to twelve per town".

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | sa3 | disclosure, list-detail and column grammars |
| Section | sa4 | sorted list, card and band grammars |
| Element | sa3 B | radiogroup |
| Element | sa4 B | real directions link |
| Data | distances | labelled straight line |

**Critique pass:**
- **Honesty:** the data caps and the distance method are both stated on the page.
- **S1496:** brand colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| sa3 A Open a town | 8.0 | 8.6 | 7.0 | 8.6 | **8.04** | PASS |
| sa3 B Pick a town | 8.2 | 8.6 | 7.4 | 8.6 | **8.20** | PASS |
| sa3 C Side by side | 8.0 | 8.2 | 7.4 | 8.6 | **8.00** | PASS |
| sa4 A Nearest first | 8.0 | 8.6 | 7.2 | 8.6 | **8.06** | PASS |
| sa4 B The directions card | 8.2 | 8.8 | 7.4 | 8.6 | **8.24** | PASS |
| sa4 C Three distance bands | 8.2 | 8.4 | 7.6 | 8.4 | **8.16** | PASS |

**Vetoes: none.**

**Next:** Round S19, Service Area 5 (Book) and Contact 1 (Ways to reach us).
