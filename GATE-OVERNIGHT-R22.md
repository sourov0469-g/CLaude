# GATE: Overnight Round 22 — Process I and J (Process 10 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?process=i` and `?process=j`.

Both versions keep the firm's four real steps (`Proc.CH`) and real hours. Figures come only from `Proc2.FIGS` (FACTS.md). With this round, Process reaches A–J.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Process I, "Your part, and ours"** | Cash App Brand Guidelines (a clear binary, bold blocks) | S0054 (three-way `radiogroup`, roving arrows), S1442 (the homeowner's lines in plain words), S1501 (the step spine as the one strong element), S0220 (the firm's lines only from its own copy and FACTS.md) |
| **Process J, "The job in four numbers"** | Apple AirPods Pro (one huge figure per moment) | S1500 (type scale as the layout), S1330 (figure rises and the rule draws as each row arrives), S0405 (each figure is a button that turns over to the step's other figure), S0220 |

## Build log, with how each differs from Process A–H

- **Process I** (`o22-process-i.jpg`)
  - **Composition:** three lanes. "You" (lime) on the left, a green step spine in the middle, "Austin Pro" (green) on the right. One row per step.
  - **Switch:** Both / Your part / Our part. On wide screens the other lane fades to 16% grey so the two can still be compared; on phones the lanes stack and the other lane is removed.
  - **Homeowner lines:** pick a time (real hours), choose the work, watch the house change, walk the finished job with us. Each is a restatement of the firm's own step copy, not a new promise.
  - **How it differs:** the only version that separates the customer's part from the firm's.
- **Process J** (`o22-process-j.jpg`)
  - **Composition:** four full-width rows. Each has the step label, one figure set as big as the column allows (One visit / $10k–$15k / 1–2 weeks / 30 years), and its caption.
  - **Turn over:** tapping a figure rolls it to the step's other figure (Mon–Fri 8–8 / Itemised / 2 days / Lifetime), and the caption follows.
  - **How it differs:** the only number-led version; no drawings, no cards.

## Self-tests

| Check | Result |
|---|---|
| I at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. "Your part" → `data-view=you`; Austin Pro lane opacity 0.17 at 1440, `display:none` at 390. ArrowRight → "Our part", focus follows |
| J at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. All four rows reveal on scroll. Tap row 1 → "Mon–Fri 8–8", caption "Sat 8–6 · Sun 12–5" |
| J clipping | Widest face width = mask width on every row at 1440 and 390 (no clipped figure) |

**Defect fixed:** at 1440 the flip face "Mon–Fri 8–8" was 882 px inside a 733 px mask, so it clipped. Fixed by sizing the figures to their own column (`container-type:inline-size`, `font-size:min(168px,16cqi)`), with the old clamp kept as the fallback.

**Remaining:** J's figures are all the same size, set by the longest face; "One visit" therefore sits smaller than it could alone. Kept on purpose so the four rows read as one scale.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | I | S1501, S1442, S0220 |
| Section | J | S1500, S0220 |
| Element | I switch | S0054 radiogroup |
| Element | I rows | arrive staggered (spine, you, us) |
| Element | J figures | S0405 buttons, S1330 roll 0.7 s |
| Element | J rules | draw left to right on arrival |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1473 H2 (match with the real world):** I speaks to the homeowner in their own terms.
- **Honesty:** both versions use only `Proc.CH`, `Proc2.FIGS` and the locked hours and phone.
- **S1496:** brand colours only; reduced motion shows final states.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Process I | 7.8 | 8.4 | 7.6 | 8.6 | **8.06** | PASS |
| Process J | 8.4 | 7.8 | 7.8 | 8.2 | **8.08** | PASS |

**Vetoes: none.** **Next: Round 23, Try the job E and F.**
