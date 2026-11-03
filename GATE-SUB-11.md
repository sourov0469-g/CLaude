# GATE: Subpages, Round S11 — Our Work 4 (The latest jobs) and 5 (Book). Our Work page complete.

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.
**Defaults:** the homepage is unchanged. Version A is the default on each new section.
**How to view:** `?page=work&ow4=a|b|c` and `?page=work&ow5=a|b|c`.

**Sources:**
- **The latest jobs:** the firm's documented-project records, newest first: month, place, trades. No total and no per-month count is stated. Front page B carries the 886 lock verbatim.
- **Book:** the locks verbatim. The blank line in A is a drawing, not a form; nothing is sent or saved.
- **Photo:** the firm's Anderson Mill West, Cedar Park job, with its record caption.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| ow4 A "By the month" | Quiet Cubes (calm columns) | S0054 (Newer / Older months paging), S0220 |
| ow4 B "The front page" | Scout Motors (the record as print) | S1500 (masthead, lead job, three-column briefs in normal fonts), S0220 |
| ow4 C "Trades at a glance" | Cash App Brand Guidelines (one tidy matrix) | real `<table>` with a caption; marks carry `role=img` with "Siding: yes"; data visualisation |
| ow5 A "Your line on the list" | Scout Motors (the honest record) | S1442 (the record format with one blank line for the visitor), S1436 (dashed underline breathes; still under reduced motion), S0405 |
| ow5 B "One job, one invitation" | Cowboy (a real house, warmly) | S1501 (the firm's photo full-bleed with a white booking card), S0405 |
| ow5 C "Two halves" | Dropbox Brand (one split) | S0405 (two whole-half links: `tel:` and booking), visually hidden h2 |

## Build log

**ow4 The latest jobs**
- A: three month columns (Sep / Aug / Jul 2026; the newest in green). Each lists its records; Older months steps back three.
- B: a black-ruled masthead and the lead job (Austin, Siding, Windows, Doors, September 2026), then 12 briefs in columns and the lock line.
- C: a 15 × 7 matrix with marks where each record includes the trade.
- How they differ: columns, print, matrix.

**ow5 Book**
- A: a ledger card. A header row, then "— · Your street · The work you want" with a dashed line, then Book and Call.
- B: a full-bleed photo with "Start your own job." on a white card.
- C: two big halves, the phone (light) and booking (green).
- All three carry phone, hours, address and email.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 shows 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| ow4 A | Columns Sep / Aug / Jul 2026; Older → Jun / May / Apr 2026; Newer enabled |
| ow4 B | Lead job + 12 entries |
| ow4 C | 15 rows, 27 marks; first row "Austin, Sep 2026 → Siding: yes, Windows: yes, Doors: yes" |
| ow5 C | Links `tel:` and booking |

**Defect fixed before gating:** ow4 C's marks first carried an `aria-label` on a plain element, which screen readers ignore. They now have `role=img`.

**Remaining:** ow4 C's matrix scrolls sideways inside its frame at 390 px (min 640 px). The page itself does not.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | ow4 | column, print and matrix grammars |
| Section | ow5 | blank-line, photo and split closes |
| Element | ow4 A | month paging |
| Element | ow4 C | accessible marks |
| Element | ow5 A | drawn blank line (not a form) |

**Critique pass:**
- **Honesty:** records only; no totals; the blank line is not an input.
- **S1496:** brand colours, plus newsprint black for B.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| ow4 A By the month | 8.0 | 8.4 | 7.4 | 8.6 | **8.08** | PASS |
| ow4 B The front page | 8.4 | 8.0 | 8.2 | 8.4 | **8.24** | PASS |
| ow4 C Trades at a glance | 7.8 | 8.0 | 7.6 | 8.6 | **7.90** | PASS |
| ow5 A Your line on the list | 8.2 | 8.4 | 8.2 | 8.4 | **8.28** | PASS |
| ow5 B One job, one invitation | 8.4 | 8.4 | 7.4 | 8.4 | **8.24** | PASS |
| ow5 C Two halves | 8.2 | 8.8 | 7.2 | 8.4 | **8.16** | PASS |

**Vetoes: none.**

**Our Work page:** 5 sections × 3 = 15 versions, complete.

**Next:** Round S12, Reviews 1 (Opener) and 2 (The reviews).
