# GATE: Subpages, Round S13 — Reviews 3 (People they name) and 4 (By the work done)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. The plan for all eight pages is in GATE-SUB-01.

**Defaults:** the homepage is unchanged. Version A is the default on each new section.

**How to view:** `?page=reviews&rv3=a|b|c` and `?page=reviews&rv4=a|b|c`.

**Sources:** the thirty published reviews only. Every sentence shown is split from the published text and never edited. Counts read "named / mentioned in N of the 30 published reviews". There are no stars and no roles; the reviews do not state anyone's job.

## Names (rv3)

| Name | Named in (of the 30) |
|---|---|
| Kevin | 9 |
| Garrett | 8 |
| Tracy | 4 |
| Paul Hale | 3 |
| Paul Schantz | 2 |
| Taylor | 2 |
| Jake | 1 |
| Jerry | 1 |
| Maria | 1 |
| Shorty | 1 |

- **Paul:** a plain "Paul" is ambiguous (reviewers name both Paul Hale and Paul Schantz), so it is counted under neither. The page says so.
- **Owner check, Garrett:** one review spells the name "Garret" (Lucas Wang: "Garret did a good job on the punch out."), and I count it under Garrett. If the owner says these are different people, Garrett's count becomes 7.

## Work (rv4)

Matched on each review's own words.

| Work | Matched on | Mentioned in (of the 30) |
|---|---|---|
| Siding | siding, Hardie | 13 |
| Windows | window | 11 |
| Roofs | roof, shingle | 8 |
| Doors | door(s) | 4 |
| Gutters | gutter | 2 |
| Paint | paint | 3 |

A review that mentions two kinds of work sits under both.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| rv3 A "Name cards" | Cash App Brand Guidelines (one card per person) | S0220 (count plus one verbatim line per name) |
| rv3 B "Hello, my name is" | Cowboy (warm, the crew's own badges) | S0054 radiogroup of name badges; choosing one lists every line naming that person |
| rv3 C "Names in the sentence" | Dropbox Brand (type first) | S1500 (25 named sentences with the names highlighted), filter radiogroup |
| rv4 A "Tabs by trade" | Cash App Brand Guidelines (one control) | S0054 (ARIA tabs with arrows, Home and End; counts on the tabs), full reviews |
| rv4 B "Six columns" | Dropbox Brand (one grid) | One column per kind of work; each holds the sentence that mentions it and the reviewer |
| rv4 C "What's your project?" | Cowboy (a plain question) | S1442, radiogroup; the count plus sentences from the three longest matching reviews |

## Build log

- **rv3**
  - A: ten cards, Kevin's on green.
  - B: "Hello, my name is" badges. The chosen badge tilts, and every line naming that person appears.
  - C: a list of 25 sentences, names highlighted lime, filter chips.
  - How they differ: cards, badges, sentences.
- **rv4**
  - A: six tabs with counts and full reviews.
  - B: six narrow columns.
  - C: one question, then a big count and three green quote cards.
  - How they differ: tabs, columns, question.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 has 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| rv3 A | Counts as in the Names table; **every line is verbatim** (browser check against `__REV`) |
| rv3 B | Paul Hale → 3 lines, all verbatim |
| rv3 C | Garrett → 8 of 25 sentences shown |
| rv4 A | → moves to Windows ("mentioned in 11 of the 30"); tab counts 13 / 11 / 8 / 4 / 2 / 3 |
| rv4 B | All sentences verbatim |
| rv4 C | Roofs → "8 of our 30 published reviews mention roofs.", all verbatim |

**Remaining:** the "Garret" judgement call above.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | rv3 | card, badge and sentence grammars |
| Section | rv4 | tab, column and question grammars |
| Element | rv4 A | ARIA tabs |
| Element | rv3 B, rv3 C, rv4 C | radiogroups |
| Element | Every sentence | runtime verbatim check |

**Critique pass:**
- **Honesty:** names only as written; no roles; ambiguity stated; counts stay within the 30.
- **S1496:** brand colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| rv3 A Name cards | 8.0 | 8.4 | 7.4 | 8.8 | **8.12** | PASS |
| rv3 B Hello, my name is | 8.4 | 8.2 | 8.4 | 8.6 | **8.38** | PASS |
| rv3 C Names in the sentence | 8.2 | 8.4 | 7.8 | 8.8 | **8.28** | PASS |
| rv4 A Tabs by trade | 8.0 | 8.6 | 7.2 | 8.8 | **8.14** | PASS |
| rv4 B Six columns | 7.8 | 7.8 | 7.6 | 8.8 | **7.86** | PASS |
| rv4 C What's your project? | 8.2 | 8.6 | 7.8 | 8.6 | **8.30** | PASS |

**Vetoes: none.**

**Next:** Round S14, Reviews 5 (Book) and About 1 (Opener).
