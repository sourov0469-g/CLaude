# GATE: Subpages, Round S3 — Siding 5 (Siding jobs on record) and Siding 6 (Book the siding inspection). Siding page complete.

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.
**Defaults:** the homepage is unchanged. Version A is the default on each new section.
**How to view:** `?page=siding&sd5=a|b|c` and `?page=siding&sd6=a|b|c`.

**Sources:**
- **Records:** the firm's documented-project records (`__NEAR`, only records that include Siding).
- **Photos:** the firm's own five siding-job photos (`__JOBS` 0, 2, 4, 5, 6), each with its record caption.
- **Counts:** the only counts shown are "431 documented siding jobs" and the 886 lock. No record total and no per-town figure is derived.
- **Close:** the locks verbatim, plus the homepage's inspection copy.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| sd5 A "Five on the wall" | Cowboy (warm, pinned) | S1501 (five photo prints, slight tilt, straighten on hover), S0220 (record captions) |
| sd5 B "The ledger" | Scout Motors (the honest record) | S0054 (town `radiogroup`; Newer / Older paging), S1442 (each row says what else was done on the same visit), S0220 |
| sd5 C "Names on the list" | Dropbox Brand (type only) | S1500 (an alphabetical wall of 134 neighbourhood names), navigation patterns (A–Z jump that focuses the first name), S0220 (the latest month per name, no count) |
| sd6 A "Phone first" | Dropbox Brand (one number, big) | S1500, S0405 |
| sd6 B "What the inspection covers" | Cowboy (a warm checklist card) | form design (`role=checkbox` ticks; the card says nothing is saved or sent), S0220 (the five items are the homepage's own inspection copy) |
| sd6 C "The status band" | Cash App Brand Guidelines (one bold band) | Doherty threshold (live open / closed in Austin time, refreshed each minute), S0405 |

## Build log

**sd5 Siding jobs on record**
- A: five white-bordered photo prints in a 3 + 2 arrangement, each captioned with place · month · trades.
- B: a cream ledger ruled like paper, 8 rows a page, newest first: month, neighbourhood and town, "Siding + other trades". Town chips cover Austin, Round Rock, Cedar Park, Pflugerville, Leander and Georgetown.
- C: 21 letter groups in three columns with an A–Z bar. Choosing a name reads "Maple Run, Austin: latest documented siding job Jul 2026" in a sticky bar.
- How they differ: photos, a list by time, names alphabetically.

**sd6 Book the siding inspection**
- A: "Book the siding inspection." with the phone at up to 148 px and a booking row.
- B: a ruled index card listing Siding, Trim, Windows, Roof, Gutters, ticked as you read.
- C: a deep-green band carrying the live status, phone, booking, and hours / office / email.
- All three carry phone, hours, address and email.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 shows 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| sd5 A | All 5 photos load; every caption's trades include Siding |
| sd5 B | First row "Sep 2026 · Austin · Siding + Windows, Doors". Leander → 8 rows, all Siding, "Sep 2026 – Aug 2022" |
| sd5 C | 134 names, 21 letters. M → Enter on "Maple Run" → latest Jul 2026 |
| sd6 B | Ticks toggle (`tftff`) |
| sd6 C | "Open now, until 8 pm Austin time" |
| Page locks | Phone, email, address and hours all present; "5,000" absent |

**Remaining:** sd5 C's names are the records' own spellings (e.g. "MLK-183" appears as recorded).

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | sd5 | photo-wall, ledger and index grammars, S0220 |
| Section | sd6 | number, checklist and band closes |
| Element | sd5 B chips | radiogroup, paging |
| Element | sd5 C A–Z | jump with focus |
| Element | sd5 C readout | sticky readout |
| Element | sd6 B ticks | `role=checkbox` |
| Element | sd6 C status | live |

**Critique pass:**
- **Honesty:** no derived counts; the checklist states it saves nothing.
- **S1496:** brand colours, plus a red margin rule on the ledger as paper detail.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| sd5 A Five on the wall | 8.2 | 8.2 | 7.4 | 8.6 | **8.08** | PASS |
| sd5 B The ledger | 8.0 | 8.4 | 7.6 | 8.6 | **8.10** | PASS |
| sd5 C Names on the list | 8.0 | 8.0 | 8.0 | 8.2 | **8.02** | PASS |
| sd6 A Phone first | 8.2 | 8.8 | 7.2 | 8.4 | **8.20** | PASS |
| sd6 B What the inspection covers | 8.2 | 8.2 | 7.8 | 8.6 | **8.18** | PASS |
| sd6 C The status band | 8.2 | 8.6 | 7.4 | 8.6 | **8.20** | PASS |

**Vetoes: none.**

**Siding page:** 6 sections × 3 versions = 18 versions, complete.

**Next:** Round S4, Windows & Doors 1 (Opener) and 2 (The makers).
