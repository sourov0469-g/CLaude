# GATE · Page-end call band and footer (Services §6): two versions

**Where it lives:** `owl/site/owl-roofing.html`, the Services page (`#/services`). Switch versions with `?v=sp-call:1|2`.
**Default: V1.**

**Governing reference:** Lusion, source-only (the journey ends at one resolved point); B3 Night yard.

**What transfers:** the page ends at the call, on the one deep block, with the shared footer.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG): ⟦S1452⟧ peak-end (end on the call, never a form); ⟦S0449⟧ (the final CTA matches the top); ⟦S1441⟧ fitts-law (48px CTAs); ⟦S0076⟧ (the link "Price your roof on the Contact page" names its destination).

## What was built
V1: "Not sure which chapter you need?" → start with the Wise Check, then a free estimate (Owl's words), with Call/Text. V2: the number as display type with the hours. **The footer is now one shared part (`src/footer.part`)**, so every page ends with the same locked contact block.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.0 | 6.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.60** |

**Why this default:** V1 helps an undecided visitor take a next step.

**Vetoes:** none. Facts are only from the lock and Owl's own pages; no overflow; no errors; all CTAs are real tel/sms
links.

**Tests that apply to the whole Services page** (`routetest.mjs`, 10/10; `pageshot.mjs` on defaults and all-V2):
- **Routing:** nav → the page; `aria-current`; focus to main; chapter links and deep links (`#/services/repair`) scroll
  to the chapter; the logo returns Home.
- **Structure:** every section has exactly 2 versions; no duplicate ids in the file.
- **Defaults and all-V2:** no overflow at 1440 or 390, one h1, no errors.
- **Token lint:** clean on every file of the page.

## Defects found and fixed
1. **Double initialisation:** the Night yard background was initialised twice (once by `call.js`, once by `sp-call.js`). The duplicate was removed.
