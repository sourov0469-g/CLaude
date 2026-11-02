# GATE · Gutters, windows and doors (Services §5): two versions

**Where it lives:** `owl/site/owl-roofing.html`, the Services page (`#/services`). Switch versions with `?v=gutters:1|2`.
**Default: V1.**

**Governing reference:** Longbow (a spec row of hard numbers).

**What transfers:** Owl's own gutter numbers, 5″ or 6″ k-style troughs and 3″×4″ downspouts, as a spec row with hairlines; guards and custom work as labelled cells. **What never transfers:** car specs, gold on black.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG): ⟦S1428⟧ (4 → 2 → 1 columns); ⟦S1426⟧ (number and description tight, cells apart); ⟦S1420⟧ (V2 cross-section labelled directly with an SVG `<title>`); ⟦S0076⟧ ("Call about gutters").

## What was built
Facts are Owl's own gutter page: the trough sizes, downspouts, Gutter RX or Leafree Gutter Helmets, half-round or custom, copper and specialty work through Owl's partners at Brothers Gutters. Windows and doors are listed in Owl's own services nav, so they are named and nothing more.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.0 | 7.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.80** |

**Why this default:** Even. V1 is faster to scan; V2's cross-section explains the sizes.

**Vetoes:** none. Facts are only from the lock and Owl's own pages; no overflow; no errors; all CTAs are real tel/sms
links.

**Tests that apply to the whole Services page** (`routetest.mjs`, 10/10; `pageshot.mjs` on defaults and all-V2):
- **Routing:** nav → the page; `aria-current`; focus to main; chapter links and deep links (`#/services/repair`) scroll
  to the chapter; the logo returns Home.
- **Structure:** every section has exactly 2 versions; no duplicate ids in the file.
- **Defaults and all-V2:** no overflow at 1440 or 390, one h1, no errors.
- **Token lint:** clean on every file of the page.

## Defects found and fixed
None found beyond the page-level checks.
