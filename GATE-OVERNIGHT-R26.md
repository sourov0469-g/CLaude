# GATE: Overnight Round 26 — On your street E and F (Area 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?area=e` and `?area=f`.

Both versions read only the firm's documented-project records (`__NEAR`, from the site's own project finder). The locked wording appears verbatim: "886 documented projects since 2018 · 312 on the map with photos + 574 more counted." Neither version draws a map or dots, and **neither shows or sums a total**, so the finder's 883 never surfaces (data note honoured). The drivable map stays Area C's alone.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Area E, "Is your street on our books?"** | Erie Home, **note only**: the service-area lookup grammar | S0054 (ARIA 1.2 combobox: listbox, `aria-activedescendant`, arrows, Enter, Escape), S1442 (a plain "Yes." or "Not yet." answer), S0220 (town tallies are the finder's own, as in Area D; neighbourhood counts, work and latest month come from the records; a miss says "not in our records yet" and gives the phone and address) |
| **Area F, "The job board"** | Lando Norris (the timing board) | S0054 (trade filter as a `radiogroup`; Later / Earlier paging), S1436 (rows flip down in sequence, 45 ms apart), S0220 (each row is one record: month, neighbourhood or town, trades) |

## Build log, with how each differs from Area A–D

The existing versions are: A, pinned photo cards; B, the photo-card variant; C, the drivable map; D, towns ranked as bars.

- **Area E** (`o26-area-e.jpg`)
  - **Composition:** one centred search bar with suggestions (towns first, then neighbourhoods with their town) and six quick towns.
  - **Answer card:** a lime "Yes." disc; the place; its documented count and latest month; the top four trades; and, for a town, its neighbourhood chips (tapping one answers for it). It closes with the phone and hours.
  - **How it differs:** the only version that starts from the visitor's own place.
- **Area F** (`o26-area-f.jpg`)
  - **Composition:** a deep-green departures board with columns When / Where / Work, ten rows a page, newest first (Sep 2026 at the top).
  - **Filters:** All, Siding, Windows, Roofing, Painting, Gutters, Doors.
  - **How it differs:** the only version ordered by time, not by place.

## Self-tests

| Check | Result |
|---|---|
| E at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. "circ" → Circle C Ranch, Circle C North; ↓ Enter → "Yes. Circle C Ranch, Austin, 1 documented project · latest May 2026". Cedar Park chip → 35 · latest Aug 2026 with 8 neighbourhoods. "Zzyzx" → "Not yet…", with the phone and address |
| F at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. First rows: Sep 2026 Austin / Pflugerville / Georgetown. Windows filter, then Earlier → all 10 rows include Windows, page "Aug 2026" |
| Locks | 886 wording present verbatim; "5,000" absent; "steel" absent |

**Remaining:** E's neighbourhood names are the records' own spellings and groupings (for example, "Anderson Mill West" is filed under Cedar Park in the records). Shown as recorded, not corrected.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | E | lookup grammar, S1442, S0220 |
| Section | F | timing-board grammar, S0220 |
| Element | E input | S0054 combobox |
| Element | E answer | arrives with a 0.5 s rise; "Yes." disc |
| Element | E chips | re-query |
| Element | F filters | S0054 radiogroup |
| Element | F rows | split-flap-style flip, S1436 |
| Element | F paging | the month range is read out |

**Critique pass:**
- **S1473 H2 (match the real world):** E answers the question people actually ask.
- **Honesty:** no total anywhere; the no-match case never implies the firm will not come.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Area E | 8.0 | 8.8 | 7.6 | 8.6 | **8.22** | PASS |
| Area F | 8.2 | 8.2 | 7.8 | 8.4 | **8.14** | PASS |

**Vetoes: none.** **Next: Round 27, On your street G and H.**
