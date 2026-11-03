# GATE: Subpages, Round S10 — Our Work 2 (The photographs) and 3 (By trade)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. The plan for all eight pages is in GATE-SUB-01.

**Defaults:** the homepage is unchanged. Version A is the default on each new section.

**How to view:** `?page=work&ow2=a|b|c` and `?page=work&ow3=a|b|c`.

**Sources:**
- **Photographs:** the firm's own eight documented-job photos and their record captions. Nothing is said about them beyond those records.
- **By trade:** documented projects per trade, exactly as published on the homepage.

  | Trade | Documented projects |
  |---|---|
  | Siding | 431 |
  | Windows | 388 |
  | Exterior painting | 320 |
  | Shingle roofing | 210 |
  | Gutters | 121 |
  | Exterior doors | 109 |
  | Patio covers | 34 |
  | Metal roofing | 31 |
  | Garage doors | 9 |

  Every version says that a project with several trades counts once in each, and nothing is added up.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| ow2 A "The gallery" | Apple AirPods Pro (look closer) | S0054 (native `<dialog>` with showModal; ← → keys, Close and Escape; focus returns to the photo you opened), S1501 |
| ow2 B "By the work done" | Cash App Brand Guidelines (one filter, one grid) | S0054 (trade `radiogroup` filters by the recorded trades; a live line reads, for example, "2 of our 8 job photos include windows"), S0220 |
| ow2 C "Editorial rows" | Ever, **craft note only**: magazine narrative | S1500 (each photo wide, its record set as a magazine caption, alternating sides) |
| ow3 A "The ladder" | Dropbox Brand (one bold chart) | Data visualisation (nine ranked bars scaled to 431, growing in 70 ms apart), S0220 |
| ow3 B "Blocks by size" | Cash App Brand Guidelines (tiles) | Data visualisation (tile size follows count, stated on the page), S0054 radiogroup with readout |
| ow3 C "Nine lines" | Cowboy (warm, drawn) | Drawn trade icons, a dotted leader to each count, S0405 |

## Build log

- **ow2 The photographs**
  - A: a 4-column grid; each photo opens large in a green dialog with "n of 8".
  - B: chips for All / Siding / Windows / Roofing / Painting over a photo grid.
  - C: eight wide rows, each with its number, neighbourhood, town, trades and month.
  - How they differ: viewer, filter, editorial.
- **ow3 By trade**
  - A: ranked bars; the measured widths 1041 / 937 / 773 / 507 / 292 / 263 / 82 / 75 / 22 px follow the counts.
  - B: flexible tiles sized by count; choosing one reads, for example, "121 documented gutters projects."
  - C: a two-column list of icons and counts.
  - How they differ: chart, tiles, list.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 has 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| ow2 A | Photo 3 opens "3 of 8 · Anderson Mill West, Cedar Park · Aug 2026 · Siding & Exterior Painting"; → gives 4 of 8; Escape closes and focus returns to photo 3 |
| ow2 B | Windows → 2 photos, "2 of our 8 job photos include windows." |
| ow3 A | Bars scale exactly to the published counts |
| "5,000" | Absent from the page |

**Defect fixed:** the lightbox opened pinned to the left edge, because a global style overrode the dialog's centring. It is now positioned explicitly (`inset:0; margin:auto`).

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | ow2 | viewer, filter and editorial grammars |
| Section | ow3 | chart, tile and list grammars; S0220 |
| Element | ow2 A | dialog, focus return |
| Element | ow2 B | live count line |
| Element | ow3 A | grow-in bars |
| Element | ow3 B | radiogroup |

**Critique pass:**
- **Honesty:** the per-trade counts are never totalled, and each version carries a note on double counting.
- **S1496:** brand colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| ow2 A The gallery | 8.2 | 8.6 | 7.4 | 8.4 | **8.18** | PASS |
| ow2 B By the work done | 8.0 | 8.6 | 7.6 | 8.4 | **8.14** | PASS |
| ow2 C Editorial rows | 8.4 | 8.0 | 7.8 | 8.4 | **8.16** | PASS |
| ow3 A The ladder | 8.2 | 8.6 | 7.2 | 8.8 | **8.20** | PASS |
| ow3 B Blocks by size | 8.0 | 8.2 | 7.8 | 8.6 | **8.08** | PASS |
| ow3 C Nine lines | 8.2 | 8.4 | 7.4 | 8.6 | **8.18** | PASS |

**Vetoes: none.**

**Next:** Round S11, Our Work 4 (The latest jobs) and 5 (Book).
