# GATE · Final build · Round 2 · Explore + Wise Check (two versions each)

**File:** `owl/final/owl-roofing.html` (3.37 MB, everything inside). Judge versions with `?review`, or `?explore=1|2&wise=1|2`
(`?all=2` for every V2). Screenshots: `gates/r2/` (full page, desktop 1440 and phone 390, both version sets).

## Section 3 · EXPLORE
### V1 · "Explore Your Roof, Layer by Layer" (primary: explore-best1, explore-01, treated as near build-spec)
- The sheet's exploded roof stack is used as the object, cut cleanly onto the cream page. **Five real layers, each mapped to
  its own outline in the image**: Shingles, Underlayment, Decking, Insulation, Ventilation. Pick a layer from the list (arrow
  keys work), or hover or tap it on the stack: the chosen slab **lifts out of the stack with a shadow**, the rest fade back,
  a label pins to it, and a one-line explanation updates.
- This is the allowed kind of 3D: one small, bounded object. On phones the stack sits above a two-column layer list so the
  result stays in view while you tap.
### V2 · "Look Closer" (alternate: explore-best3, explore-11 brass lens)
- A brass lens follows the pointer over a **real Owl roof** (a frame from Owl's crew film). Inside the lens you see the layer
  below at the same spot: Shingles, Underlayment, Decking (Owl's own decking footage) and Rafters (Owl's own rafter footage).
  Change depth with the chips, or scroll inside the photo (the page scrolls normally once the deepest or shallowest layer is
  reached). **The lens label always names the layer actually shown**, which fixes explore-11's mislabelled layers (§9).

## Section 4 · WISE CHECK (the site's signature)
### V1 · Dial, glass cross-section and checklist (primary: wisecheck-best1, wisecheck-01)
- A brass inspection dial drawn in SVG (bezel, bolts, ticks, curved labels) with a **glass card** holding a roof-edge
  cross-section: shingles (Owl footage texture), decking (Owl decking texture), a chimney with step flashing, a ridge vent and
  a gutter. **Tick a checklist item and the needle swings to that part's mark while the same part lights up in the
  cross-section** with a plain line on what is checked. Untick to step back; tick all four and the needle reaches
  **PROTECTED** and "Book Your Wise Check" starts to glow. "Start again" resets it.
- Labels sit outside the needle's reach, so the needle never crosses a word (the hero-14 defect, §9, avoided by design).
- On phones the order is headline, dial, then a 2×2 checklist, so the needle stays in view while ticking.
### V2 · "An Owl's Eye on Your Roof" (alternate: wisecheck-best3, wisecheck-14)
- An owl's eye in brass rings. **The iris follows the pointer** across the page and blinks now and then. Choose Shingles,
  Flashing, Ventilation or Gutters: the outer ring turns to it, the pupil shows a small drawing of that part, and the line
  below explains it. Sheet line "misses nothing above your ceilings" is replaced (it promised too much).

## Shared this round
Phone ordering fixes; alpha cut of the sheet stack so no box shows on cream; every new control is a real button or radio with
keyboard support.

## Verification
- **Interaction test** (`tools/interact2.cjs`): picking Decking lifts one slab; ArrowDown moves to Insulation; ticking all four
  Wise Check items gives "All four checked", needle at 118° (PROTECTED) and a glowing CTA; reset works; lens chips go to
  Rafters and the wheel steps back to Decking; the eye picks Flashing. **No page errors.** Round 1's test still passes.
- **Accessibility** (axe, WCAG 2.1 A/AA): **0 violations** on V1 and V2.
- **Light only:** all backgrounds cream; the only dark areas are objects (the eye's pupil, video screens).
- **No big 3D:** the stack and the dial are single bounded objects.

## Copy budgets
Explore V1: headline 6, support 30 (subline 10, list 5, explanation up to 15). Explore V2: headline 2, support 25.
Wise V1: headline 3, support up to 23. Wise V2: headline 6, support up to 16. All within ≤8 + ≤35.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted | For / against |
|---|---|---|---|---|---|---|
| Explore V1 Layer by Layer | 8.0 | 8.0 | 7.6 | 8.0 | **7.92** | For: faithful to the near-spec sheet, every layer selectable from list or object. Against: the lift is a 2D slice of a rendered image, so the slab edges are as precise as the outlines (close, not pixel-exact). |
| Explore V2 Look Closer | 7.4 | 7.4 | 7.8 | 7.8 | **7.52** | For: real Owl footage at every depth, correct labels. Against: the underlayment view is a drawn felt texture; the lens hides the cursor inside the photo. |
| Wise V1 Dial + checklist | 8.0 | 7.8 | 8.0 | 7.8 | **7.92** | For: the dial, needle, cross-section and checklist work as one instrument with a clear end state. Against: the cross-section is a careful drawing, not a photograph. |
| Wise V2 Owl's Eye | 7.6 | 7.2 | 7.8 | 7.6 | **7.52** | For: memorable, playful, on-brand. Against: less information per part than V1; chips sit close to the eye edge on small phones. |

All four pass; zero vetoes (no invented facts, cream only, logo and palette locked, single file, no sub-agents, no background
tasks).

**WEB-SKILLS applied:** ⟦S1435⟧ von-restorff-effect (the lifted slab and the lit part stand out alone) · ⟦S1440⟧
feedback-patterns (needle, glow, live explanation, end state) · ⟦S1457⟧ zeigarnik-effect (the four-part checklist invites
completion) · ⟦S1452⟧ peak-end-rule (PROTECTED plus a glowing CTA as the peak) · ⟦S1449⟧ millers-law (four to five items) ·
⟦S0407⟧ svg-animation (dial, eye, cross-section) · ⟦S0070⟧ better-accessibility (radio group with arrows, aria-pressed
checklist, axe 0) · ⟦S1424⟧ law-of-continuity (labels follow the dial's arc) · ⟦S0659⟧ anti-ai-slop (over-promising sheet
line replaced; descriptions generic, no invented claims) · ⟦S1496⟧ critique-brand-consistency.

## Recommendation
**Explore V1** and **Wise Check V1** (both primaries, and V1's dial makes the Wise Check the site's signature as directed).
Muse decides; both versions stay in the file.

## Next
Round 3: Wrap / Protect Your Nest ("Same Storm. Different Ending.") + Services (split-flap departures board).
