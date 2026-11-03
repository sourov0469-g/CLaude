# GATE: Overnight Round 16 — Windows I and J (Windows reaches 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?windows=i` and `?windows=j`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Windows I, "A window of words"** | Cowboy (warmth; homeowners' own voices) | S0220 (4 verbatim excerpts, build-checked; names as published; aggregate stars only), S0054 (panes are buttons with `aria-pressed`; Esc returns), S1436 (the chosen pane fills the window; a glint passes once on arrival) |
| **Windows J, "From opening to trim"** | Scout Motors (sequenced proof) | S1326 (stepped sequence with explicit controls: buttons and a range with `aria-valuetext`), S1362 (drawn parts animate in), S0220 (steps only as the firm itself describes them: measured, built to order, set, sealed, casing and sill) |

## Build log, with how each differs from Windows A–H

### Windows I (`o16-windows-i.jpg`)

**Composition.** A drawn four-pane window. Each pane holds one verbatim line about windows:
- Lois Richwine: "so QUIET!";
- Charles Statler: "in one day!";
- Sara Helms: "most affordable quote… very high quality windows";
- Bryan Williams: "2 different window installation jobs".

**Interaction.** Choosing a pane makes it fill the window in display type, and Esc closes it. Beside the window: 4.9 from 474, 388 jobs and 2 days.

**How it differs:** the only Windows version built from customers' words.

### Windows J (`o16-windows-j.jpg`)

**Composition.** A lap wall with a drawn opening, stepped through in five stages:
1. The old window.
2. Out it comes (it slides away).
3. Set the new one (it drops in).
4. Sealed (a lime bead draws around the frame).
5. Trimmed (casing and sill appear, with labels).

**Controls.** A caption names each step, and step buttons or a slider move between them.

**How it differs:**
- C takes one window apart in the air.
- J puts one into a wall in order.
- None of A–H shows the installation sequence.

## Self-tests

| Check | Result |
|---|---|
| I at 1440 / 768 / 390 | 0 errors, 0 overflow. Pane 1 opens to fill the window; Esc closes it |
| J at 1440 / 768 / 390 | 0 errors, 0 overflow. Step 5 → "5. Trimmed — Our casing closes the opening…"; slider to 2 → "3. Set the new one" |

**Defect fixed:** in Windows I, the "hide other panes" rule out-ranked the "show the chosen pane" rule, so opening a pane left the window empty. Fixed with the right precedence.

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | I | S0220, S1501 (the open quote) |
| Section | J | S1326, S1501 (the opening) |
| Element | I panes | S0054, S1436, S0405 (hover tint) |
| Element | J step buttons | S0054, S0405 (slide 4 px) |
| Element | J slider | `aria-valuetext` = step name |
| Element | J parts | S1362 (seal bead draws 1.1 s) |
| Element | Buttons | S0405 |

**Critique pass:**
- **Honesty:** I's quotes are verbatim; J's steps use the firm's own words.
- **S1498:** J's caption overlay sits clear of the opening at 1440 and is in flow on phones.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Windows I | 8.4 | 8.2 | 8.2 | 8.6 | **8.32** | PASS |
| Windows J | 8.0 | 8.4 | 7.8 | 8.2 | **8.12** | PASS |

**Vetoes: none.**

**Windows now has 10 versions (A–J). Next: Round 17, Reviews E and F.**
