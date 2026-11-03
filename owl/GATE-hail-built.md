# GATE · Built to withstand Minnesota weather (Storm damage §5): two versions

**Where it lives:** `#/storm/hail-built`. Switch versions with `?v=hail-built:1|2`. **Default: V1.**

**Governing references:** V1 Longbow Motors (craft as hard numbers; numerals as events). V2 Quiet Cubes (one object,
three controls, instant feedback).

**What transfers:** V1: the guarantee facts set as large numerals that count up once to their real values. V2: one drawn
roof; three buttons change only the weather on it. **What never transfers:** Longbow's product and palette; Quiet
Cubes' cubes.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG):
- ⟦S0659⟧: no invented metrics; the numbers are only the locked facts (10-year Get It Right Guarantee; up to 50-year
  manufacturer warranties; GAF Systems Plus Certified, never Master Elite).
- ⟦S1420⟧ data-visualization: the numerals are labelled directly; nothing relies on the graphic alone.
- ⟦S0054⟧ / ⟦S1441⟧: V2's buttons use `aria-pressed` in a labelled group, 48px tall, keyboard operable.
- ⟦S0400⟧ (read at audit, after building; see SKILL-READ-LOG): count-up and weather swaps are instant under reduced motion.

## What was built
- **V1:** "Built to withstand Minnesota weather." with Owl's "We don't just repair—we upgrade." paragraph; three facts:
  **10** year Get It Right Guarantee (amber-700, the one accent), **up to 50** year manufacturer warranties, **GAF**
  Systems Plus Certified; Call.
- **V2:** "Whatever Minnesota throws at it." with Owl's climate line; Heavy snow / High winds / Intense hail swap a
  drawn snow load with weight arrows, gust lines, or falling hail on the same roof.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 8.0 | 7.5 |
| Creativity | 7.0 | 8.5 |
| Content | 9.0 | 8.0 |
| **Weighted** | **7.90** | **7.75** |

**Why this default:** V1 states the guarantees, which is what "built to withstand" has to rest on. V2 is a toy that
shows the claim but does not prove it.

**Tests:** `builttest.mjs` 6/6: snow first; High winds swaps; `aria-pressed` follows; keyboard Enter picks hail; V1
numerals settle at 10 and 50; no errors.

## Defects found and fixed
1. **The snow load read as a second roof line** (a thin stroke hugging the roof). Redrawn as a closed layer with a soft
   top edge above the roof.
2. **"up to" floated above the 50**, leaving a gap. Set on the baseline beside the numeral.
