# GATE: Subpages, Round S5 — Windows & Doors 3 (What windows cost) and 4 (How a window goes in)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. The plan for all eight pages is in GATE-SUB-01.
**Defaults:** the homepage is unchanged. Version A is the default on each new section.
**How to view:** `?page=windows&wd3=a|b|c` and `?page=windows&wd4=a|b|c`.

**Sources:** every figure is already on the homepage:
- From 376 priced window jobs, 2022–2026, materials and labour, before tax: middle half $5k–$25k and median band $10k–$15k.
- Andersen jobs: median band $20k–$25k, from 38 priced jobs. Andersen Certified Contractor, Premier.
- "Measured, built to order, then set and sealed".
- 2 days on site for most window-only jobs.

**New this round: `PB.quote(review, excerpt)`.** It renders a verbatim review line, name and "Google review", with no stars. **The build fails if the excerpt is not word for word in the published review.** Two lines are used, both passing the check:
- Sara Helms: "It took about 6 weeks for measuring, ordering and installing."
- Charles Statler: "Austin pro just finished my windows in one day!"

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| wd3 A "The window sticker" | Scout Motors (honest labels) | S1500 (a black-ruled label card, one big figure), S0220 |
| wd3 B "The pane as the scale" | Apple AirPods Pro (one measured object) | data visualisation (a drawn window whose width is $0–$30k; bands placed exactly to scale), S0054 (native checkbox overlays the Andersen band), S1330 |
| wd3 C "Three plain questions" | Erie Home, **note only**: FAQ grammar | S1442 (questions in a homeowner's words, one figure each), S1330 stagger |
| wd4 A "Three steps, two voices" | Graza (the custom-animation bar) | S1362 (each step's line drawing draws in), verbatim quotes via `PB.quote` |
| wd4 B "Weeks, then days" | Apple AirPods Pro (one comparison) | data visualisation (a six-week grid beside a two-day strip; the six weeks are explicitly one homeowner's words), verbatim quotes |
| wd4 C "Step through it" | Scout Motors (honest mechanics) | S0054 (four stage buttons, `aria-pressed` cumulative, `aria-live` line); the drawing builds: dimension lines, the unit made to order, set, sealed. A stepper, not a game: nothing to win |

## Build log

**wd3 What windows cost**
- A: a label card headed "Austin Pro, Window jobs, as priced": the median band big, then the middle half and the Andersen band in ruled boxes, with the source line.
- B: a glazed pane with a $0–$30k scale. The middle half is tinted, the median band is a framed sash, and the optional Andersen band is hatched.
- C: three Q&A cards, the Andersen one in green.
- How they differ: label, scale, questions.

**wd4 How a window goes in**
- A: three step cards (Measured, Built to order, Set and sealed) with drawn icons, and the two review lines beside them.
- B: a 42-day grid ("Measuring, ordering and installing", with Sara Helms' line) set against a green "2 days on site" card with Charles Statler's line.
- C: a drawn wall opening plus four stage buttons. Each button adds its stage to the drawing; the earlier dimension lines fade.

## Self-tests

**All six versions:** at 1440, 768 and 390, 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| wd3 B scale | Measured placement: middle half 5.0–25.0k, median 10.0–15.0k |
| wd3 B checkbox | Andersen band shows |
| wd3 C | $10k–$15k, $5k–$25k, $20k–$25k |
| wd4 A | Both quotes render with the reviewers' names |
| wd4 C | 1→4 gives `data-at=4`, all pressed, "Then it is sealed all round. Done." |
| Build | Fails on a non-verbatim excerpt (by design) |

**Defect fixed:** wd4 B said "most of the wait is the making", which is an inference, not a published fact. It now states only the facts: "The windows are built to order first. Then, for most window-only jobs, 2 days on site."

**Remaining:** wd4 B's 42-day grid illustrates one homeowner's "about 6 weeks". It is labelled with her words, not presented as a firm timeline.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Site | `PB.quote` | verbatim check at build, no stars |
| Section | wd3 | label, scale and FAQ grammars, S0220 |
| Section | wd4 | steps, comparison and stepper grammars, S0220 |
| Element | wd3 B | exact scale |
| Element | wd4 A | S1362 |
| Element | wd4 C | S0054 stepper |

**Critique pass:**
- **Honesty:** the only time figures are the published 2 days and two attributed review lines.
- **S1496:** brand colours; the sticker is in black as a real label would be.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| wd3 A The window sticker | 8.2 | 8.4 | 8.0 | 8.6 | **8.28** | PASS |
| wd3 B The pane as the scale | 8.0 | 8.0 | 8.0 | 8.6 | **8.06** | PASS |
| wd3 C Three plain questions | 8.0 | 8.6 | 7.2 | 8.8 | **8.10** | PASS |
| wd4 A Three steps, two voices | 8.0 | 8.4 | 7.4 | 8.8 | **8.08** | PASS |
| wd4 B Weeks, then days | 8.0 | 8.2 | 7.8 | 8.4 | **8.06** | PASS |
| wd4 C Step through it | 8.2 | 8.2 | 8.0 | 8.4 | **8.18** | PASS |

**Vetoes: none.** **Next: Round S6, Windows & Doors 5 (Doors) and 6 (Book the window inspection).**
