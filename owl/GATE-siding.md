# GATE · Siding (Services §4): two versions

**Where it lives:** `owl/site/owl-roofing.html`, the Services page (`#/services`). Switch versions with `?v=siding:1|2`.
**Default: V1.**

**Governing reference:** Cowboy (warmth through communication and people in use) for V1.

**What transfers:** V1 makes the warmth system Owl's promise of constant communication and a spotless cleanup, quoted. **What never transfers:** bikes, the rider map, the press strip. V2 is a drawn wall whose lap courses lay themselves (the identity's courses grammar turned sideways).

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG): ⟦S0449⟧ (benefit-first, in Owl's words); ⟦S0076⟧ ("Call about siding"); ⟦S1421⟧ illustration-style (V2 drawing in the brand grammar); ⟦S0407⟧ (V2 courses draw-on with a static final state); ⟦S1364⟧ (B2 Rings on cream).

## What was built
V1: a 4:3 frame with the siding photo **labelled "Illustrative photo"** (Owl has no siding photo of its own) beside Owl's quotes. V2: Owl's quotes beside the drawn wall with a window.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.0 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 6.5 | 7.5 |
| Content | 8.5 | 9.0 |
| **Weighted** | **7.35** | **7.80** |

**Why this default:** V2 avoids the only non-Owl photo on the page and scores higher; V1 is kept as the default because a real house photo shows siding more plainly. **V2 is recommended as default if Muse prefers zero illustrative photos.**

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
