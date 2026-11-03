# GATE: Subpages, Round S12 — Reviews 1 (Opener) and 2 (The reviews)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. The plan for all eight pages is in GATE-SUB-01.
**Defaults:** the homepage is unchanged. Version A is the default on each new section.
**How to view:** `?page=reviews&rv1=a|b|c` and `?page=reviews&rv2=a|b|c`. The page title becomes "Reviews | Austin Pro…".

**Sources:**
- **Rating:** the locked "4.9 from 474 Google reviews", plus the homepage's "474 reviews. 30 of them here."
- **Reviews:** the thirty published reviews, with text verbatim and names exactly as published (including "LOIS RICHWINE" and "Karen HIbpshman"; no case changes).
- **Cut excerpts:** where a published excerpt stops mid-sentence, it ends with "…".
- **Left out:** no per-review stars, and no dates (none are published with these excerpts).

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| rv1 A "The score" | Dropbox Brand (one number) | S1500 (4.9 at up to 380 px with "from 474 Google reviews." as the h1), S0405 |
| rv1 B "Thirty names" | Cowboy (the people first) | S1500 (the 30 published names set as a type field behind the headline, `aria-hidden`), S0220 |
| rv1 C "One voice first" | Apple AirPods Pro (one line, full attention) | `PB.quote` (Joe Liu: "Replacing siding is a huge investment, but Austin Pro made it seamless."), S1442 |
| rv2 A "The full wall" | Cowboy (everything on the wall) | Masonry columns of all 30; every fifth card in green for rhythm |
| rv2 B "Sorted your way" | Cash App Brand Guidelines (one control, one list) | S0054 (sort `radiogroup`: shortest, longest, by name) |
| rv2 C "Index and reader" | Apple AirPods Pro (one at a time) | S0054 (ARIA listbox with `aria-activedescendant`; ↑ ↓ Home End), sticky reading pane |

## Build log

**rv1 Opener**
- A: a giant 4.9 with "from 474 Google reviews." beside it, then "474 reviews. 30 of them here, word for word, as published." and the CTAs.
- B: deep green ground with the thirty names in faint large type, and a card reading "Thirty reviews, in their own words."
- C: the h1 "What homeowners say." over one large verbatim line.
- How they differ: a number, the people, one voice.

**rv2 The reviews**
- A: all 30 in three columns.
- B: sort chips over a two-column list.
- C: a scrollable list of names beside one review in a green reading pane.
- How they differ: everything at once, ordered, one at a time.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 has 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| rv2 A | 30 cards. **Every card's text equals a published review text** (checked in the browser against `__REV`). No star characters |
| rv2 B | By name → Annamaria Scaccia first. Shortest → Kyle Rioux first |
| rv2 C | ↓↓ → Bryce Martin; `aria-activedescendant` rv2C-o2 |
| rv1 B | 30 names |

**Wording fixed before build:**
- rv1 B no longer normalises name case; names show exactly as published.
- Its headline said "Thirty neighbours". It now says "Thirty reviews", because one reviewer is a realtor, not a neighbour.

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | rv1 | number, names and voice openers |
| Section | rv2 | wall, sort and reader grammars |
| Element | rv2 C | listbox |
| Element | rv2 B | radiogroup |
| Element | Verbatim | runtime check plus build check |

**Critique pass:**
- **Honesty:** reviews are verbatim with names as published; no stars, no dates, no invented ratings.
- **S1496:** brand colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| rv1 A The score | 8.4 | 8.4 | 7.4 | 8.6 | **8.26** | PASS |
| rv1 B Thirty names | 8.4 | 8.0 | 8.2 | 8.4 | **8.24** | PASS |
| rv1 C One voice first | 8.2 | 8.4 | 7.4 | 8.6 | **8.18** | PASS |
| rv2 A The full wall | 8.0 | 8.2 | 7.0 | 9.0 | **8.06** | PASS |
| rv2 B Sorted your way | 8.0 | 8.6 | 7.4 | 9.0 | **8.24** | PASS |
| rv2 C Index and reader | 8.2 | 8.4 | 7.8 | 9.0 | **8.30** | PASS |

**Vetoes: none.** **Next: Round S13, Reviews 3 (People they name) and 4 (By the work done).**
