# GATE-FINAL-SERVICES · section 6, "Name Your Job" (ONE final version)

**Source:** OLD Services V8 "Name Your Job", ported to `src/final/sections/06-services.html` (id `services`: the header's Services link and the hero's second action land here). **Evidence:** `gates/final/services/` (`hover.png`, `open.png`, `s-1440.png`, `s-390.png`, `checks-services.json`).

## 1. What it is
Five jobs set as huge rows, named plainly: Roof Replacement, Roof Repair, Storm Damage Help, Wise Check Inspections, Siding. Point at one and its own photo floats after the pointer and leans with its speed; open one for what's included (one open at a time; the closed details are inert). Book a Wise Check sits beside the heading. The shortlisted "hover pop-up" idea from the plan was **not** added: shortlist is not use.

## 2. Changes in the port (all for "no blurry images")
The five service photos are 560 px wide originals, so they are never stretched:
- **Desktop:** the floating photo takes each photo's own shape (not a fixed 4:3 crop) at 300 px wide: 0.54× at DPR 1.
- **Phones (no hover):** the open job shows its photo inside the details at natural proportions, at most 280 px wide: 1.00× at DPR 2 (was 1.25×, soft).
- The kicker above the heading was dropped (the heading is enough).

## 3. Five questions (homeowner)
1. **What is it for?** What does Owl actually do?
2. **Under 3 s?** Yes: five job names, huge.
3. **Fun?** The photo floats after your pointer; the rows slide.
4. **Every element earns its place?** Names, photo, details, book. Yes.
5. **Stressed?** I find my job by name and read three plain lines.

**Skill ledger:** ⟦S1107⟧ buttons with `aria-expanded` · ⟦S0544⟧ causal motion · ⟦S0451⟧ title reveal · ⟦S1330⟧ damped follow.

## 4. Checks (`node tools/final-test.cjs services`): **19/19**
axe 0 · facts lock · no maps · distinct media (the five service photos appear only here) · five named jobs, first open · pointing floats the right photo in its own shape · click opens one job and closes the others, closed details inert · keyboard Enter opens · Book action · phone: photo inside the details, at most 280 px, no floating photo · sharp at 1440 and 390 DPR 2 (1.00×) · layout and 44 px controls · reduced motion · no errors.

## 5. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.3 | 8.5 | 8.3 | 8.6 | **8.40** (3.32 + 2.55 + 1.66 + 0.86) |

## 6. Remaining
- **D1:** originals are 560 px, so the floating photo is soft on a 2× desktop display if enlarged; it is capped at 300 px. Larger originals from Owl would allow bigger photos.
- **D2:** "Roof Replacement" lists the Protect Your Nest System as part of the job (it is a fact about the work in Owl's own services data); the plan removed the *section*, not the fact. Say if the line should go.

## 7. Vetoes: **zero**
Facts exact (GAF Systems Plus, 10-year workmanship, up-to-50-year manufacturer warranties); no maps; logo untouched; no stock.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
