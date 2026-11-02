# GATE · Services cover (Services §1): two versions

**Where it lives:** `owl/site/owl-roofing.html`, the Services page (`#/services`). Switch versions with `?v=sp-cover:1|2`.
**Default: V1.**

**Governing reference:** MERSI, the chapter system (frames f01-f04).

**What transfers:** a cover plus a **chapter index**, so the navigation is the chapter list itself. **What never transfers:** MERSI's interiors, logo, type.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG): ⟦S0449⟧ landing-page (above the fold: headline for outcome and audience, one primary CTA, one proof signal); ⟦S1411⟧ information-architecture (chapters as local navigation, with storm damage pointed to its own page instead of duplicated); ⟦S1454⟧ serial-position (Call first; storm damage last, set apart); ⟦S0076⟧ better-writing (links name their destination: "Roof repair and the Wise Check", never "Learn more").

## What was built
V1: H1 "Roofing, repair and siding, by one family-owned crew."; the Protect Your Nest promise; Call/Text; the GAF Systems Plus chip; a numbered chapter index with arrow reactions. V2: a split cover, Owl's own footage frame (a GAF bundle going up) beside a card with the chapter links and Call.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 7.5 |
| Creativity | 7.0 | 7.0 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.55** |

**Why this default:** V1: the chapter index is the strongest wayfinding. V2: the stronger image, but the links read as plain text.

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
