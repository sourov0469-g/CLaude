# GATE: Overnight Round 17 — Reviews E and F (Reviews 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?reviews=e` and `?reviews=f`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Reviews E, "The names they mention"** | Cowboy (family-fronted warmth: the people) | S0220 (counts computed from the published texts at run time; quoted sentences are exact substrings, so verbatim by construction), S1499 (one bar per name), S0054 (`aria-pressed` buttons, arrow keys, live panel) |
| **Reviews F, "All 30, in their words"** | Lando Norris (the archive, presented whole) | S0220 (every published excerpt, as published, including "…" cuts), S0054 (labelled search, filter group, live count, empty state), S1499 (masonry columns) |

## Build log, with how each differs from Reviews A–D

- **Reviews E** (`o17-reviews-e.jpg`)
  - **The list:** nine staff names, ranked by how many of the 30 published reviews mention them: Kevin 9, Garrett 8 (including one "Garret"), Paul 5, Tracy 4, Taylor 2, Jerry, Jake, Maria and Shorty 1 each.
  - **Choosing a name:** shows the exact sentences that mention it, with reviewer and source.
  - **A note says:** counts are by first name as written. "Paul" covers Paul Hale (named by three reviewers) and Paul Schantz (named by two).
  - **How it differs:** the only Reviews version organised around the firm's people.
- **Reviews F** (`o17-reviews-f.jpg`)
  - **The wall:** all 30 published reviews as masonry cards.
  - **The sticky tool bar:**
    - a search box (matches highlighted);
    - filters: all, siding, windows, roofing, clean-up (by the words a review uses);
    - a live "n of 30" count, and an empty state when nothing matches.
  - **How it differs:** A–D each show a handful of excerpts. F is the whole published set.

## Self-tests

| Check | Result |
|---|---|
| E at 1440 / 768 / 390 | 0 errors, 0 overflow. Names and counts as listed; Paul → 5 quoted reviews |
| F at 1440 / 768 / 390 | 0 errors, 0 overflow. "quiet" → 1 of 30; Windows filter → 11 of 30; "zzzz" → empty state |
| Locks | 4.9 from 474 only; no per-review stars |

**Defect fixed:** the first build counted "Paul" without saying it covers two people. The note now names both.

**Remaining:** F's trade filters match words in each review, such as "window" or "roof". A review that mentions windows only in passing still counts as a windows review.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | E | S0220, S1501 (the selected name's quotes) |
| Section | F | S0220, S1499 |
| Element | E name bars | S0083 (grow once), S0054 |
| Element | E quote panel | `aria-live`, enter 0.45 s |
| Element | F search | labelled; highlight with `<mark>` |
| Element | F filters | `aria-pressed` |
| Element | F live count and empty state | S0054 |
| Element | Aggregate | the one rating, green stars (C2) |

**Critique pass:**
- **Honesty:** every quoted word is the reviewer's own.
- **S1473 H9** (help with errors): F's empty state suggests another word.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Reviews E | 8.2 | 8.4 | 8.6 | 9.0 | **8.42** | PASS |
| Reviews F | 7.8 | 8.8 | 7.2 | 9.0 | **8.10** | PASS |

**Vetoes: none.** **Next: Round 18, Reviews G and H.**
