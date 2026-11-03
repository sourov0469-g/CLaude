# GATE: Subpages, Round S8 — Roofing 3 (Roofing jobs on record) and 4 (What homeowners said about roofs)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. The plan for all eight pages is in GATE-SUB-01.

**Defaults:** the homepage is unchanged. Version A is the default on each new section.

**How to view:** `?page=roofing&rf3=a|b|c` and `?page=roofing&rf4=a|b|c`.

**Sources:**
- **Records:** the firm's documented-project records that include Shingle Roofing or Metal Roofing.
- **Photo:** the firm's own Ashford Park, Buda job.
- **Counts:** only the homepage counts are stated (210 shingle, 31 metal).
- **Review lines:** verbatim and build-checked, no per-review stars. The rating shown is the locked "4.9 from 474 Google reviews".
  - Ken Weigand: "They ripped off the old roof and put on a new one in one day."
  - Jude Rosenstock: "We lost some shingles in one of the bigger storms that passed through and thankfully Austin Pro was able to fix everything WITHIN DAYS…"
  - Kimmy Voigt: "I wish I would've replaced my roof years ago instead of doing more damage waiting."
  - Michael Spake: "Paul Hale arrived and was able to get an in-person inspection of the roof as I was closing on a new home."
  - Lynnette Agueros: "Paul Hale with Austin Pro was responsive and helped with a roof inspection for a buyer client of mine within 24 hours."

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| rf3 A "The latest roofs" | Scout Motors (the record, plainly) | S1501 (one real roof photo), S0220 (the six newest records: month, place, kind) |
| rf3 B "Shingle or metal" | Cash App Brand Guidelines (tidy tiles) | S0054 (kind `radiogroup`, Newer / Older paging), drawn roof badges (shingle / standing seam) |
| rf3 C "A street of roofs" | Cowboy (warm, drawn) | S1501 (the 24 newest roof jobs as a drawn street; dark roofs are shingle, seamed roofs metal), S0054 (each house is a button with a full `aria-label`) |
| rf4 A "The pinned wall" | Cowboy (warm, pinned) | `PB.quote` ×5 on pinned cards |
| rf4 B "One at a time" | Apple AirPods Pro (one line, full attention) | S0054 (a carousel with roledescription, slide labels "n of 5" and prev / next buttons; nothing auto-advances) |
| rf4 C "Laid like shingles" | Dropbox Brand (one strong device) | The quotes on shingle-cut tiles, each lapping the one below, offset course by course |

## Build log

- **rf3:**
  - A: the Ashford Park photo, plus a stack of six record rows with a Shingle / Metal pill.
  - B: tiles with roof badges, filtered by Both / Shingle / Metal, 9 a page.
  - C: a pale sky with 24 small houses of varied size. Choosing one reads "Sep 2026 · Hutto · Shingle roof".
  - How they differ: photo and list, filterable tiles, a drawn street.
- **rf4:**
  - A: five cards with lime tops on a pinned wall.
  - B: one large quote on green with arrow buttons.
  - C: five dark shingle tiles lapped down the page.
  - How they differ: a wall, a single line, a lapped stack.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 has 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| rf3 A | 6 rows; first "Sep 2026, Pflugerville, Shingle roof" |
| rf3 B | Metal → 9 tiles, all metal, "Sep 2026 – Nov 2025" |
| rf3 C | 24 houses, 5 metal; house 4 → "Sep 2026 · Hutto · Shingle roof" |
| rf4 B | Next ×2 → "3 of 5", Kimmy Voigt; prev ×3 wraps to "5 of 5" |
| rf4 A | 5 quotes; no star characters anywhere |

**Defect avoided:** `.rf` is a global homepage scene class. Roofing C's roof element uses `.rfx` instead.

**Remaining:** rf3 C's street scrolls sideways inside its own frame at 390 px; the page itself does not scroll sideways.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | rf3 | photo-list, tile and drawn-street grammars; S0220 |
| Section | rf4 | wall, carousel and lapped grammars; verbatim only |
| Element | rf3 B | radiogroup and paging |
| Element | rf3 C | house buttons |
| Element | rf4 B | accessible carousel |

**Critique pass:**
- **Honesty:** records and verbatim lines only; no stars; no derived counts.
- **S1496:** brand colours plus roof charcoal.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| rf3 A The latest roofs | 8.2 | 8.4 | 7.2 | 8.6 | **8.12** | PASS |
| rf3 B Shingle or metal | 8.0 | 8.4 | 7.6 | 8.4 | **8.08** | PASS |
| rf3 C A street of roofs | 8.0 | 7.8 | 8.6 | 8.2 | **8.08** | PASS |
| rf4 A The pinned wall | 8.0 | 8.4 | 7.2 | 8.8 | **8.08** | PASS |
| rf4 B One at a time | 8.4 | 8.2 | 7.4 | 8.6 | **8.24** | PASS |
| rf4 C Laid like shingles | 8.2 | 7.8 | 8.4 | 8.6 | **8.16** | PASS |

**Vetoes: none.**

**Next:** Round S9, Roofing 5 (Book the roof inspection) and Our Work 1 (Opener).
