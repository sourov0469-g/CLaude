# GATE · Final build · Round 3 · Protect Your Nest + Services (two versions each)

**File:** `owl/final/owl-roofing.html` (4.04 MB, everything inside). Judge with `?review`, or `?wrap=1|2&services=1|2`
(`?all=2` for every V2). Screenshots: `gates/r3/` (full page, desktop 1440 and phone 390).

## Section 5 · PROTECT YOUR NEST
### V1 · "Same Storm. Different Ending." (primary: wrap-best1, wrap-05)
- The sheet's two houses side by side, **one storm control for both**. Drag the amber storm slider (or use the keyboard) from
  light drizzle to hail and wind: rain thickens and slants across both houses; the unprotected house darkens and starts to
  shake; on the Protect Your Nest house **the drops strike the amber shield and spark off it**, the shield glows brighter,
  and the owl family under the eaves stays dry. The headline sits in the sheet's card with "Protect My Roof".
- **Sheet defect fixed (§9):** the protected house's porch waterfall is gone. Both images are framed above the porch, so the
  protected side shows the shield, the dry nest and the roof only.
### V2 · "Every Layer, Guarded" (alternate: wrap-best2, wrap-03, with wrap-12's warranty promise)
- The sheet's cut-open roof on a diagonal, with four labels. Choosing a label (or hovering it) **draws its leader line to the
  right layer** and explains it; the labels also cycle on their own until you take over. Ventilation adds animated warm-air
  lines in the attic.
- **Sheet defect fixed (§9):** labels now map to the right layers. Shingle shield goes to the shingles, Ice and water barrier
  to the black membrane, Sealed decking to the wood deck, and Ventilation to the attic airflow (the sheet pointed it at
  decking). The baked-in leader lines were cropped out of the image.
- Warranty chips from wrap-12 use the locked wording: "10-year workmanship warranty" and "Up-to-50-year manufacturer warranties".

## Section 6 · SERVICES
### V1 · Split-flap departures board (primary: services-best1, services-13)
- "Now Boarding: Better Roofs". A board with a scalloped shingle top, Owl's white logo, hinge pins and five rows of amber
  flaps. **The flaps spin and settle letter by letter** when the board comes into view. Press a row and it spins again; the
  card below shows that service's photo, a line about it and "Book a Wise Check". The board's window plays **Owl's own crew
  film**. Services: Roof replacement, Roof repair, Storm damage help, Wise Check, Siding.
### V2 · Clean index (alternate: services-best3, services-01)
- "Everything Your Roof Needs" on a paper panel, with a drawn feather row (feather is one of brand-04's six motifs). Each
  service is a large row with a photo; **press to open** a short line and a link. On desktop a **larger photo follows the
  pointer** while you hover a row.
- Photos: Owl's own crew film for replacement, repair and the Wise Check; Owl's own siding photo; the non-branded storm photo
  allowed as illustrative under the asset rule (never captioned as an Owl job).

## Verification
- **Interaction test** (`tools/interact3.cjs`): storm at 92 reads "Hail and wind", the unprotected house shakes and the shield
  glow reaches 0.94; Home key returns to "Light drizzle"; the board settles to "ROOF REPLACEMENT"; pressing row 3 shows
  "Storm damage help" and re-spins to "STORM DAMAGE HELP"; Ventilation draws its line and turns the airflow on; the index opens
  row 3 only (aria-expanded true); the hover preview appears. **No page errors.**
- **Accessibility** (axe, WCAG 2.1 A/AA): **0 violations** on V1 and V2. Flap rows are buttons with plain-text labels
  (flaps are hidden from screen readers), and the index rows are disclosure buttons.
- **File size:** service photos are stored once and shared by both service versions (4.23 → 4.04 MB).
- **Light only:** page backgrounds are cream. The board is a dark object, like the sheet's.

## Copy budgets
Wrap V1: headline 5, support 30 (subline 16, chips 4, storm labels 3, CTA 3). Wrap V2: headline 3, support 31.
Services V1: headline 4, support 30. Services V2: headline 4, support up to 23 (one open row). All within ≤8 + ≤35.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted | For / against |
|---|---|---|---|---|---|---|
| Wrap V1 Same Storm | 8.2 | 7.8 | 8.4 | 7.8 | **8.08** | For: one control, two endings, a literal "protected" you can test. Against: the two renders are not the same house angle; a few eave drips remain on the protected side (no porch flood). |
| Wrap V2 Every Layer, Guarded | 7.8 | 7.6 | 7.2 | 8.0 | **7.64** | For: correct label mapping, warranty facts from the lock. Against: leader lines are hidden on phones (the list and note carry it there). |
| Services V1 Split-flap board | 8.2 | 7.6 | 8.4 | 8.0 | **8.04** | For: distinctive, tactile and readable; the crew film in the window. Against: flaps get small on phones (17 per row). |
| Services V2 Clean index | 7.6 | 8.2 | 7.0 | 8.0 | **7.70** | For: the fastest to scan; big targets. Against: the most conventional pattern of the pair. |

All four pass; zero vetoes (no invented facts, cream page, logo and palette locked, single file, no sub-agents, no
background tasks).

**WEB-SKILLS applied:** ⟦S1440⟧ feedback-patterns (storm labels, shield sparks, re-spinning flaps) · ⟦S1436⟧
animation-principles (staggered flap settle, eased leader draw) · ⟦S1452⟧ peak-end-rule (the storm at its peak shows the
difference most) · ⟦S1435⟧ von-restorff-effect (one active label line, one lit row) · ⟦S1444⟧ hicks-law (five services,
one open at a time) · ⟦S1441⟧ fitts-law (full-width rows, 34 px slider thumb) · ⟦S0070⟧ better-accessibility (range input
with value text, disclosure buttons, axe 0) · ⟦S0280⟧ core-web-vitals (shared images, animation paused off-screen) · ⟦S0659⟧
anti-ai-slop (service lines are plain descriptions; no invented promises) · ⟦S1496⟧ critique-brand-consistency.

## Recommendation
**Protect Your Nest V1** and **Services V1** (both primaries, and the two most distinctive builds of the round). Muse decides;
both versions stay in the file.

## Next
Round 4: Reviews (dial "5.0 / 90+ reviews") + Service area (Route Ribbon, abstract, never a fake street map).
