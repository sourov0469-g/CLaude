# GATE: Overnight Round 25 — Try the job I and J (Try 10 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?try=i` and `?try=j`.

Both are new mini-games, so they stay in Try. Neither moves sideways and neither dives. Both use drawn line art only. With this round, Try reaches A–J.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Try I, "Nail it on the studs"** | Lando Norris (speed and timing) | S0054 (the Nail button takes Space or Enter; arrows, Shift+arrows, Home and End aim and pause the sweep), S1436 (a gun kick and a nail ring), Doherty threshold (the sweep speeds up after each hit), S0220 (general practice worded as such; closing line: 431 documented siding jobs) |
| **Try J, "Name the parts"** | Cash App Brand Guidelines (the labelled spec sheet) | S0054 (choose a label, then a spot; each spot's `aria-label` names what it would receive), gesture patterns (drag a label with a ghost and nearest-spot drop), S0405 (show me / start again), S0220 (closing line: the free inspection and the real hours) |

## Build log, with how each differs from Try A–H

- **Try I** (`o25-try-i.jpg`)
  - **Composition:** house wrap with six chalked stud lines and a new lap board. The nail gun sweeps along the board.
  - **Game:** fire on a stud (±9 drawing units) to set a nail; a miss draws an × and is counted. The sweep pauses while the section is off screen and never runs under reduced motion.
  - **How it differs:** the only timing game.
- **Try J** (`o25-try-j.jpg`)
  - **Composition:** an eave and window close-up: shingles, drip edge, fascia, gutter and downspout, soffit with vents, frieze, lap siding, and a window with its trim.
  - **Game:** six labels in a shuffled tray and six spots. A wrong drop shakes the spot and gives a one-line hint; a right one pins the label.
  - **How it differs:** the only vocabulary or labelling game.

## Self-tests

| Check | Result |
|---|---|
| I at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. The sweep moves (122 → 281 in 0.5 s). Home, then Shift+→, →, → aims at 102 → "On the stud. 5 to go." Aiming off-stud → "Missed the stud…", misses = 1 |
| J at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Soffit by click → "Right: soffit." Fascia on the gutter spot → "Not the fascia. It is the flat board the gutter hangs on." Gutter by drag → "Right: gutter", count 2, no ghost left behind. After "Show me", 0 placed labels fall outside the stage |

**Defect fixed:** Home and End on the Nail button scrolled the page; they now aim the gun to either end.

**Remaining:**
- I relies on timing by design; the arrow-key path is the alternative and is named on the page.
- J's spots are 28 px, below the 44 px touch guideline. The click-then-spot path and the 48 px drop radius soften this; named here.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | I | Lando Norris timing, S0220 |
| Section | J | spec-sheet labelling, S0220 |
| Element | I gun | rAF sweep, paused off screen, S1436 kick |
| Element | I Nail button | S0054 keys |
| Element | I nails | ring burst; miss mark |
| Element | J chips | `aria-pressed`, drag ghost |
| Element | J spots | pulse while holding, shake when wrong |
| Element | Action buttons | S0405 |

**Critique pass:**
- **S1473 H7 (flexibility):** I has two ways to play; J has two ways to place.
- **Honesty:** I's line "lap siding is nailed into the studs" is general practice; J's words are the inspection vocabulary; the closers use locked facts only.
- **S1496:** brand colours, plus muted material tones.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Try I | 7.8 | 7.8 | 8.4 | 7.8 | **7.96** | PASS |
| Try J | 8.0 | 7.8 | 7.8 | 8.4 | **7.94** | PASS |

**Vetoes: none.** **Next: Round 26, On your street E and F.**
