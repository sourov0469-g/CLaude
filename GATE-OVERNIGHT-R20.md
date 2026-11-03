# GATE: Overnight Round 20 — Process E and F (Process 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?process=e` and `?process=f`.

Both versions keep the firm's four real steps and its real hours.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Process E, "Turn the dial"** | Graza (custom-animation quality bar) | S0054 (`role=slider` with `aria-valuetext` = step name; arrows, Home, End; drag with pointer capture), S1330 (handle eases to its stop, 0.6 s), S1362 (each step's line drawing draws in), S0220 |
| **Process F, "Questions at each step"** | Erie Home, **note only**: FAQ grammar | S0618 (native details and summary, one opened to start), S1442 (plain questions in customers' words), S0220 (answers only from the firm's own copy and FACTS.md: hours, $10k–$15k across 415, 1–2 weeks, 2 days, lifetime labor, 30-year Hardie) |

## Build log, with how each differs from Process A–D

- **Process E** (`o20-process-e.jpg`)
  - **The dial:** a ring with four stops (01–04) and a green handle that fills the ring as it turns.
  - **The centre:** the step's line drawing and name.
  - **The side:** a step list, the step's words and figures, and the CTA.
  - **How it differs:**
    - A stacks cards.
    - B pins a wall.
    - C drops a plumb line.
    - D opens columns.
    - E is the only rotary control.
- **Process F** (`o20-process-f.jpg`)
  - **Composition:** four step cards side by side (2 × 2 on tablet, stacked on phones). Each holds two questions as accordions, for example "When can you come?" with the real hours, or "How long will it take?" with 1–2 weeks and 2 days.
  - **Footer:** the phone number and hours.
  - **How it differs:** the only question-led version.

## Self-tests

| Check | Result |
|---|---|
| E at 1440 / 768 / 390 | 0 errors, 0 overflow. ArrowRight × 2 → "Expert install", with only that step showing in the centre. Dragging the handle round → "Final check" |
| F at 1440 / 768 / 390 | 0 errors, 0 overflow. Opening step 3's first question → "A siding job is 1–2 weeks on site, paint included. Most window-only jobs take 2 days." |

**Defect fixed:** Process E's centre panels used `display:grid`, which overrode `hidden`, so all four step names stacked under the dial. Fixed with `.cs[hidden]{display:none}`.

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | E | S1501 (the dial centre), S0220 |
| Section | F | S0618, S0220 |
| Element | E handle | S0054 slider, S1330 |
| Element | E ring fill | S0083 |
| Element | E list | `aria-pressed` |
| Element | E drawings | S1362 |
| Element | F accordions | S0618, S0405 (plus/minus) |
| Element | F cards | arrive staggered by 80 ms |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1473 H7:** E offers three ways in (drag, keys, list).
- **Honesty:** F's answers are the firm's own words and figures only.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Process E | 8.2 | 8.0 | 8.2 | 8.2 | **8.14** | PASS |
| Process F | 7.8 | 8.8 | 7.0 | 9.0 | **8.06** | PASS |

**Vetoes: none.** **Next: Round 21, Process G and H.**
