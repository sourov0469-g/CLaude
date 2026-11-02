# GATE: Renovation page (Phase 5, part 1)

**Section count:** 5 sections plus the footer. Two are NEW.
- **Order:** Hero (×2) → Services → **One disruption. Not five. (NEW, ×2)** → Permits and approvals → **Whole-home stories + CTA (NEW, ×2)**.
- **Inherited versions** are in git history (`ce59679`).
- **Copy:** only the firm's own lines (FACTS.md "Whole-home", "Services", Credentials, the eight stages, FAQ code context and durations). Photos are the firm's own whole-home and outdoor projects; 4 images ship. Zero em dashes.

| # | section | versions | what it is now |
|---|---|---|---|
| 1 | Hero | **2** (V3 and V4, both named good) | Both lead with the firm's "One contractor. The whole house." and open the third room chapter. **V1 (was V3):** giant type across two whole-home photographs that slide at different speeds (scrubbed parallax), and the roofline frame draws once. **V2 (was V4):** three panels for the three parts of the firm's whole-home line; the chosen one widens on pointer, focus, press **or arrow keys**, and its caption names the firm's project. |
| 2 | Services | 1 (card stacking like Home Services V2) | The Home 3 sheet stack, reused: three drawing sheets (Inside the house; Outside the house; Bigger than one room) stack as you scroll, the earlier one receding and shading, the scope opening over the photo. **Only the firm's service names**; no descriptions are published for the secondary services, so none are invented. |
| 3 | One disruption. Not five. (NEW) | **2** | **A:** five room-by-room bars, each with its own contractor tag, spread across five year bands. The scroll pulls them into one marked "One plan" stretch, sequenced and slightly overlapping, and the tags become one. Measured: "One plan, one contractor, one disruption". **B:** a drawn house plan with a radio switch. Room by room hatches five separate disruptions one after another; One plan draws a single route through every room and one boundary around the house ("1 disruption, one plan, one contractor"). |
| 4 | Permits and approvals | 1 (V2 deepened) | Two ruled sheets. **Site evaluation (week 1–2)** and **Permitting (weeks 6–12)** tick off in order as they scroll in (scrubbed, reversible). The firm's code context sits county by county (HVHZ in Miami-Dade and Broward, needing a Miami-Dade NOA; Palm Beach under Wind-Borne Debris Region rules). The Notice of Acceptance stamp lands once. |
| 5 | Whole-home stories + CTA (NEW) | **2** | **A (Shed):** one chapter per project, the photograph revealed from the middle outwards by the scroll, alternating sides, opening large on click; then a CTA band with proof and the firm's "a whole-home renovation runs several months". **B (OH index):** the four titles as an index with a large preview on pointer or focus, and a CTA card. **Captions are the firm's titles only.** |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the plan | 8 | Every row of `PHASE1-PLAN.md` "RENOVATION" delivered; the counts hold | |
| Interaction | 8 | Panels with arrow keys; the scrubbed collapse; the plan switch as a radio group; the index preview; the viewer | |
| Motion and flow | 8 | Parallax, collapse, ticks in order, a stamp with stillness, masked reveals | |
| Accessibility | 8 | Radio switch, labelled buttons, live readouts, focus-visible everywhere | On phones the collapsed bars truncate room names (the readout carries the meaning) |
| Facts | 10 | Firm's lines and titles only; no invented service descriptions or project stories | |

## Defects found and fixed across cycles
1. **Collapse, timing:** it never completed in view, because its scrub ended only after the chart had mostly scrolled off. It now runs `top 75%` → `center 50%`. Measured: completes with the chart centred.
2. **Collapse, legibility:** the final bars were 3.6% wide, which truncated names. They are now sequenced across a marked "One plan" stretch at 12% each; readable at 1440.
3. **Hero V1:** the kicker line sat under the overlapping photo. It moves into the foot.
4. **Copy:** two lines I wrote (a service-sheet sentence, and a dashed-border draw that would have turned solid) were replaced: the firm's "One contractor. The whole house.", and the dashed house boundary now fades in.
5. **Reduced motion, collapse:** it now shows the resolved one-plan state rather than only the problem.
6. **Test harness:** a script bug (a Node variable used inside the browser context), and a click on content whose scroll reveal had reversed. Both fixed in the harness; no product change.

## Defects remaining (honest)
- ~~**Phones, collapse:** the five collapsed bars truncate room names at 390.~~ **Fixed in Phase 6:** on narrow screens the resolved plan uses wider bars (38%, stepped across 80% of the chart). Measured: all five names fit at 390 and 1440 (`qa/finalize/phase6/renovation-collapse-phone-390.png`).
- ~~**Dividers** on this page reuse the system set.~~ **Fixed in Phase 6:** roofs, join (five dashes close into one line), dimension, truss, footing.

Render evidence: `qa/finalize/renovation/`. Zero console errors at 1440 and 390; no horizontal overflow.
