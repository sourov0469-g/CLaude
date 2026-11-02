# GATE · Services (home §5): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=services:1|2`. **Default: V1.**

**Reference:** MERSI, the chapter system only (frames f01-f04).
- **What transfers:** a cover split around a seam, a small name card on the seam, named chapters, and the seam as
  navigation.
- **What never transfers:** MERSI's interiors, its logo mark, its type.

**Skills applied:**
- WAI-ARIA tabs pattern: roving tabindex; arrows, Home and End; focus follows selection. There is no auto-rotation, so
  nothing moves on its own.
- ⟦S1421⟧: each chapter's drawing is in the brand grammar.
- BRAND.md imagery rules:
  - Owl's own footage for the replacement, storm and repair chapters, captioned truthfully.
  - The one non-Owl photo (siding) is labelled "Illustrative photo".

## V1 · Chapter seam
Four chapters: roof replacement, storm damage, roof repair, siding.
- **Each cover:** Owl's photo on the left; the service drawn on the right; a white card on the seam with the chapter
  number, name, one fact-only line and a chapter link.
- **The four drawings:**
  - Replacement: courses.
  - Storm: a hail cloud and dents.
  - Repair: a leak drop under the roof, with a heat-sensor ring.
  - Siding: lap siding around a window.
- **Below 1024px:** the cover stacks (photo, drawing, then the card).

## V2 · Rows with a reveal
The closed-inventory service rows (icon rises, arrow moves). A sticky 4:5 photo view follows hover and keyboard focus.

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 8.0 | 7.0 |
| Usability (30) | 7.5 | 8.0 |
| Creativity (20) | 7.5 | 6.5 |
| Content (10) | 8.5 | 8.5 |
| **Weighted** | **7.85** | **7.35** |

**How the two compare:** V1 is the distinctive chapter cover. V2 is the faster scan, but closer to a common pattern.

**Vetoes:** none. No overflow at 1440 or 390; no JS errors.

## Tests: 11/11 pass (`svctest.mjs`)
- **Tabs:** click; ArrowRight; wrap-around; End; Home; one tab stop.
- **V1 drawings:** all rendered.
- **V2 photo view:** follows hover and keyboard focus.
- **Token lint:** clean.

## Remaining (honest)
- **Chapter links** (`#/services/...`, `#/storm`) point to inner pages that are not built yet. Until then the router
  falls back to Home. They are resolved when the Services and Storm pages are built (planned, 6 sections each).
- **Siding:** Owl has no siding photo of its own, so the illustrative label stays.
