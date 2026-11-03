# GATE · The Wise Check after a storm (Storm damage §4): two versions

**Where it lives:** `#/storm/hail-wise`. Switch versions with `?v=hail-wise:1|2`. **Default: V1.**

**Governing reference:** Quiet Cubes: one object, few controls, instant feedback.

**What transfers:** one drawn house is the object; three controls (Attic, Leaks, Photos) each light the part of the
house that check covers, instantly. **What never transfers:** the cubes, the product, the configurator's pricing.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG):
- ⟦S0054⟧ fixing-accessibility / ⟦S0070⟧ (read at audit, after building; see SKILL-READ-LOG): real ARIA tabs (tablist, tab, tabpanel), arrow keys, Home/End, roving
  tabindex; the numbered spots on the drawing are a mouse shortcut, out of the tab order and hidden from assistive
  technology, so **a dot is never the only control** (⟦S1325⟧'s navigation rule).
- ⟦S1441⟧ fitts-law: tabs at least 48px tall.
- ⟦S1449⟧ (read at audit, after building; see SKILL-READ-LOG) millers-law: three parts, matching Owl's own three.
- ⟦S0659⟧: Owl's own badge image and Owl's own words; no added claims.

## What was built
- **V1:** Owl's Wise Check badge, "Chapter 03 · Our top-to-bottom inspection" (Owl's heading), Owl's definition; a
  cutaway house (rafters, insulation, a ceiling stain with a drip, a camera). Attic fills the attic; Leaks rings the
  drip in dashed heat rings; Photos frames the whole roof and lights the camera. The panel shows Owl's full sentence
  for each, then "Call for your Wise Check".
- **V2:** "After a storm, start with the Wise Check.", Owl's "We go beyond the surface…" line, and the three checks as
  a plain list with icons, Photo reporting ending on "for peace of mind or insurance support".

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 7.5 | 8.5 |
| Creativity | 8.5 | 6.5 |
| Content | 9.0 | 8.5 |
| **Weighted** | **8.05** | **7.70** |

**Why this default:** V1 shows *where* each check looks, which is the point of a top-to-bottom inspection. V2 shows
everything at once and stays the better scan.

**Tests:** `wisetest.mjs` 9/9: one panel visible at start; ArrowRight selects and focuses; End; wrap-around; a drawing
spot selects its tab; one tab in the tab order; spots out of tab order and hidden from AT; tabs ≥44px; no errors.

## Defects found and fixed
1. **All three panels showed at once:** `.hw1-pane{display:grid}` overrode the `hidden` attribute. Added
   `.hw1-pane[hidden]{display:none}`; the test now guards it.
2. **Spots covered what they point at** (the drip and the camera). Moved beside them.
3. **Tab could not reach the panel text** (found at the ⟦S0070⟧ audit: in the APG tabs pattern, Tab exits to the
   panel). Each panel holds no focusable content, so each now takes `tabindex="0"`.

## Measurement pass (after acceptance; scorecard left as judged)
- **Accent audit (⟦S0660⟧):** the selected tab's amber underline repeated the drawing's amber spot. The tab underline is
  now ink; the spot alone carries the selection colour (CSS only).
