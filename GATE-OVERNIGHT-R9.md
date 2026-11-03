# GATE: Overnight Round 9 — Services G and H (Services 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?services=g` and `?services=h`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Services G, "Side by side"** | Dropbox Brand (subtraction) | S1499 (information density: one table, plain bars), S0054 (real `<table>`, `scope`, `aria-sort`, sort buttons, `aria-expanded` rows), S1501 (the counts lead), S0220 (FACTS.md only; a missing figure says "Not recorded") |
| **Services H, "Pull a board"** | Graza (custom-animation quality bar) | S1436 (the board tilts on a top hinge with overshoot), S0405 (hover lift and press), S0618 (one open at a time, `aria-expanded`/`controls`), S0083 (boards nailed up in turn, from alternating sides) |

## Build log, with how each differs from Services A–F

- **Services G** (`o9-services-g.jpg` · `-1440-0/1`, `-768-0`, `-390-0/1`)
  - **Composition:** a comparison table.
    - **Rows:** Siding, Windows, Roofing.
    - **Columns:** documented jobs (with a bar), priced jobs (with a bar), median band, time on site, and maker or warranty.
  - **Sorting:** the two count columns sort, and the rows glide to their new order (FLIP).
  - **Rows:** each opens to its lead and a booking button.
  - **Phones:** each row becomes a labelled card.
  - **Honesty:** roofing's time on site is not in the records, so it reads "Not recorded". The 233 priced roofs are explained in a note (204 shingle + 29 metal).
  - **How it differs:** the only version that compares the trades in one grid. A–F all show one trade at a time, or three separate features.
- **Services H** (`o9-services-h.jpg` · `-1440-0/1`, `-768-0`, `-390-0/1`)
  - **Composition:** three full-width lap boards on a wall, overlapping like courses: white, pale green, then deep green. Each carries the trade name, its count and a "Pull" tag.
  - **Pulling a board:** it tilts out on its top edge and the trade's lead, figures and booking button open beneath it.
  - **Arrival:** the boards are nailed up one after another, from alternating sides.
  - **How it differs:** the only version where the trades are physical objects you open. C's boards are in-scene samples, not the section's structure.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | 0 errors, 0 overflow, 0 duplicate ids. Sorting priced jobs twice → Roofing > Windows > Siding. A row opens. Detail rows stay closed until opened |
| H at 1440 / 768 / 390 | 0 errors, 0 overflow. Pulling Windows opens only Windows (false, true, false) |

### Defects found and fixed this round

1. **G on tablet and phone:** the card layout set `display:block` on rows and overrode `hidden`, so the detail rows showed while closed. Fixed with `tr[hidden]{display:none}`.
2. **G on tablet and phone:** the trade names were centred (the default for `th`); they are now left-aligned.

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | S1499, S1501, S0220 |
| Section | H | S1501 (the trade name is the board), S0220 |
| Element | G sort buttons | S0054 (`aria-sort` states), S0405 |
| Element | G bars | S0083 (grow once) |
| Element | G row open | S0618 |
| Element | H board face | S1436, S0405 (hover −9°, open −14°, 0.8 s overshoot) |
| Element | H panel | grid-rows 0fr → 1fr, 0.6 s |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1499:** G is dense but scannable; H is sparse by design.
- **S1497:** white text on the green board passes contrast.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Services G | 7.8 | 8.8 | 7.0 | 9.0 | **8.06** | PASS |
| Services H | 8.4 | 8.2 | 8.2 | 8.0 | **8.26** | PASS |

**Vetoes: none.** **Next: Round 10, Services I and J.**
