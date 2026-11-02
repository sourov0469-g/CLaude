# GATE: Kitchens page (Phase 4, part 1)

**Section count:** 5 sections plus the footer, per the owner's structural rule (at least 5–6 on inner pages). Two are NEW.
- **Order:** Hero → Scope → **The sequence is the job (NEW, ×2)** → Projects → **What we will not tell you + CTA (NEW, ×2)**.
- **Inherited versions** are in git history (`ce59679`), not in the file.
- **Copy:** every line is the firm's own (FACTS.md "Kitchen", "Services", "Financing", FAQ durations). Photos and before/after pairs are the firm's own. Zero em dashes.

| # | section | versions | what it is now |
|---|---|---|---|
| 1 | Hero | 1 (V1, small improvement) | The Boffi room-chapter strip ("01 Kitchens · 02 Bathrooms · 03 Whole home") opens the page. The dimension lines draw over the firm's kitchen photo once, as the room is measured. Proof (4.8 · 343; licence string) under the CTA. |
| 2 | Scope | 1 (V5, huge UX upgrade) | **One drawn kitchen plan that transforms across the three published tiers.** Refit: same layout. Full remodel: the left run goes, an island comes in, the sink moves onto it and the plumbing re-routes. Open-plan: the partition wall comes out (a dashed ghost marks where it stood) and the island reaches into the living area, with seating. A real tablist (arrows, Home, End); `title` and panel announce the tier. "What we build" lists the firm's 10 sub-services. |
| 3 | The sequence is the job (NEW) | **2** | **A:** a sticky pair (words still, drawing advancing; Immersive) builds one kitchen elevation in five scrubbed layers (Igloo wire-to-solid): layout dashed, appliance schedule, cabinetry on order (clay dashed; "has a lead time"), plumbing and electrical in the wall, then cabinets, counters and tile go solid as the plan marks give way. **B:** the five steps on a builder's string line. Pointing at or focusing a step lights everything that moves with it ("Change the layout, and these move with it: …"). |
| 4 | Projects | 1 (owner's recipe) | The two kitchen pairs on the **MERSI seam** (as Home 4: native range, scroll sweep, cut-the-curve pair change, prints ≤ 1.35× native). The other photos are **pinned prints** (V3) on one grid with one gap (V1's spacing fixed), set as **three chapters**: Shaker, Two-tone, and Islands and open plan (grouped by the firm's own title words). |
| 5 | What we will not tell you + CTA (NEW) | **2** | **A:** the firm's three refusals set large, written in by the scroll, with "We will not" in clay. Beside them a rebuilt CTA card: the firm's question "Want a layout resolved before you are asked to choose a door style?", proof, and the kitchen financing routes ("not a lender"; PACE generally not). **B:** the three lines turned into what you get first, each card carrying the firm's verbatim line, beside the same CTA card. |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the plan | 8 | Every row of `PHASE1-PLAN.md` "KITCHENS" delivered, with the counts and the two NEW sections at ×2 | |
| Interaction | 8 | Tier tablist morphs the plan; the string line answers hover, focus and click; seam slider; viewer from prints | |
| Motion and flow | 8 | Scrubbed elevation (reversible); plan morph `power2.inOut` 0.7s; the closing lines are written by scroll | Dividers on the kitchen page reuse the system set (dimension, roofs, beam, tally) and are not yet tuned to these hand-offs |
| Accessibility | 8 | Tablists, `role="img"` plans with `title`s, live readouts, labelled buttons; phones show the finished drawing and all steps | The sticky elevation's art is `aria-hidden`; the ordered steps carry the content |
| Facts | 10 | The firm's lines verbatim; no prices; only "6–12 weeks"; financing per /financing/ | |

## Defects found and fixed across cycles
1. **String line:** the readout's "and" substitution collided with commas inside a step name. The list join is rewritten. Measured: "…the plumbing and electrical, and the cabinets, counters and finish."
2. **Sequence art:** an outlet box covered the "Dishwasher" label. The outlets moved onto the backsplash.
3. **Sequence art:** in the final state, three captions overlapped. Each caption now hands over to the next.
4. **Sequence art:** dashed elements would have been made solid by DrawSVG (it writes `stroke-dasharray`). Dashed and filled marks fade; only solid strokes draw.
5. **Finished drawing:** the appliance labels and the layout's dashed hood box lingered over the finished room. They give way at the last step.
6. **String line:** step buttons shrank to their text (the first was half-width). They now fill their column.
7. **Hero:** my rewrite dropped the `kintro` class that clears the nav. Restored.

## Defects remaining (honest)
- ~~**Kitchen-page dividers** reuse the system set; their hand-off tuning is left for the assembly pass.~~ **Fixed in Phase 6:** dimension, counter (the run in elevation), rule (the tape on the print), level, footing.
- **Scope plan wording:** the explanatory notes under each tier ("The run changes and an island comes in") illustrate the firm's tier definitions; they are not firm quotes. Muse may prefer the definitions alone.

Render evidence: `qa/finalize/kitchens/` (12 captures). Zero console errors at 1440 and 390; no horizontal overflow.
