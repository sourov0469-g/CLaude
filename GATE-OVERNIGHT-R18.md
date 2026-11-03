# GATE: Overnight Round 18 — Reviews G and H (Reviews 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?reviews=g` and `?reviews=h`.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Reviews G, "A steady stream"** | Lusion (flow) | S0220 (24 whole sentences, verbatim, build-checked), S0489 (slow continuous motion, 48–70 s loops, paused off-screen), WCAG 2.2.2 (a Pause button; pauses on hover and focus; reduced motion = still), S0054 (loop copies are `inert` and `aria-hidden`) |
| **Reviews H, "Letters from homeowners"** | Cowboy (warmth) | S0220 (six longest reviews whole, as published, including the site's own cuts), S1436 (the top letter slides away with follow-through), S0054 (arrows, Arrow keys, `aria-live`; hidden letters are `aria-hidden`) |

## Build log, with how each differs from Reviews A–F

- **Reviews G** (`o18-reviews-g.jpg`)
  - **Composition:** three columns of verbatim one-sentence excerpts with reviewer names. They drift upward at three speeds under a soft top and bottom fade, beside the aggregate and a Pause button.
  - **Phones:** two columns, then one.
  - **How it differs:** the only moving feed. A–F are static, scrubbed or chosen.
- **Reviews H** (`o18-reviews-h.jpg`)
  - **Composition:** a stack of six ruled letter sheets. Each holds a whole published review with its source and signature (the reviewer's name).
  - **Navigation:** next slides the top letter off; previous brings the last one back; a counter shows where you are.
  - **How it differs:** the only version that reads whole reviews one at a time, as letters. F shows them all at once as cards.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | 0 errors, 0 overflow. The stream moves (32 px in 1.5 s); Pause stops it (0 px drift). All 24 lines passed the build's verbatim check |
| H at 1440 / 768 / 390 | 0 errors, 0 overflow (after fix). Next: Jason Eternick → Jude Rosenstock, "2 of 6" |

**Defect fixed:** H at 768 overflowed by 39 px; the offset letters behind the top one are now clipped sideways.

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | S0220, S0489 |
| Section | H | S0220, S1501 (the top letter) |
| Element | G columns | CSS keyframe loop, play-state paused when off-screen |
| Element | G Pause button | `aria-pressed`, label swaps to Play |
| Element | H letter stack | S1436 (0.55 s), depth by offset and rotation |
| Element | H arrows | S0054, S0405 |
| Element | Aggregate | green stars (C2) |

**Critique pass:**
- **WCAG 2.2.2:** G can be paused.
- **Honesty:** every word is verbatim.
- **S1498:** H centres one letter at a reading measure.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Reviews G | 8.0 | 8.0 | 7.4 | 8.6 | **7.94** | PASS |
| Reviews H | 8.2 | 8.4 | 7.8 | 9.0 | **8.30** | PASS |

**Vetoes: none.** **Next: Round 19, Reviews I and J.**
