# GATE: Overnight Round 13 — Visualiser I and J (Visualiser reaches 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?vis=i` and `?vis=j`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Visualiser I, "Look closer"** | Apple AirPods Pro (the product in close-up) | S1324 (lens around the pointer: a 220 px loupe at ×2.6), S1442 (radio choices with persistent labels and record lines), S0220 (shares from the firm's records: 301 / 27 / 286 / 36 of 415) |
| **Visualiser J, "Your house, on the street"** | Cowboy (warmth; the neighbourhood) | S1497 (your colour beside four others), S0489 (the new colour wipes up once, 0.75 s), S0054 (radiogroup with arrow keys) |

## Build log, with how each differs from Visualiser A–H

- **Visualiser I** (`o13-vis-i.jpg`)
  - **Composition:** a large drawn wall section.
  - **Choices:**
    - **Profile:** lap 8.25 in ("301 of 415 priced siding jobs, 7 in exposure") or board and batten ("27 of 415, 4 ft HardiePanel with 2.5 in battens").
    - **Texture:** Select Cedarmill ("286 of 415", drawn as a wood-grain noise) or smooth ("36 of 415").
    - Six colours.
  - **The loupe:** it magnifies the wall under the pointer. On touch it rests on the wall and follows a drag.
  - **How it differs:** the only version about profile and texture at close range; A–H are all about colour.
- **Visualiser J** (`o13-vis-j.jpg`)
  - **Composition:** five drawn houses of different shapes on one street, with yours in the middle and tagged.
  - **Choosing a colour:** any of the 17 ColorPlus colours paints your house with a wipe up the wall. The neighbours stay in four other published colours.
  - **How it differs:** the only version that shows your colour in context with other houses.

## Self-tests

| Check | Result |
|---|---|
| I at 1440 / 768 / 390 | 0 errors, 0 overflow. Board and batten + smooth + Iron Gray → state "bnb smo", loupe on, colour #575B59 |
| J at 1440 / 768 / 390 | 0 errors, 0 overflow. Countrylane Red → "Countrylane Red · ColorPlus #714D47"; the wipe plays |

**Defects:** none found in this round's checks.

### Remaining

- **I:** the wood-grain texture is a drawn noise. It suggests the grain; it does not reproduce the product's embossing.
- **I:** the loupe's touch behaviour still needs a check on a real phone.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | I | S1501 (the wall), S0220 |
| Section | J | S1497, S1501 (your house), S0220 |
| Element | I loupe | S1324 |
| Element | I radios | S1442 |
| Element | I colour chips | S0054 |
| Element | J palette | S0054, S0405 (lift) |
| Element | J paint wipe | S0489 |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1473 H2:** I's real terms (HardiePlank, Select Cedarmill) are explained in each record line.
- **S1498:** J's street balances around the middle house.
- **S1496:** the chrome stays in brand colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Visualiser I | 8.0 | 8.2 | 8.2 | 8.6 | **8.16** | PASS |
| Visualiser J | 8.2 | 8.6 | 8.2 | 7.8 | **8.28** | PASS |

**Vetoes: none.**

**The Visualiser now has 10 versions (A–J). Next: Round 14, Windows E and F.**
