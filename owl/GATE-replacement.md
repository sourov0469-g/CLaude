# GATE · Roof replacement (Services §2): two versions

**Where it lives:** `owl/site/owl-roofing.html`, the Services page (`#/services`). Switch versions with `?v=replacement:1|2`.
**Default: V1.**

**Governing reference:** Scout Motors (a film strip of real moments as sequenced evidence) for V1; Longbow (doctrine backed by facts) for V2.

**What transfers:** V1 tells the job in Owl's own five footage frames, one image and one line each, on a film strip between dotted rules (Scout's Viewfinder strip, made of Owl's material). V2: doctrine plus facts, with the courses motif laying a roof as the section passes.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG): ⟦S0449⟧ (how it works in steps; proof next to the claim); ⟦S1428⟧ layout-grid (the strip as a horizontal scroll-snap track that column-drops on phones); ⟦S0489⟧ / ⟦S0407⟧ (V2 courses draw eave to ridge, final frame under reduced motion); ⟦S0076⟧ (Owl's quotes kept verbatim).

## What was built
Owl's copy is quoted ("A great roof starts with great products…", the quality checklist "from the underlayment to the final ridge cap"). Owl's own "Nail-Free Guarantee" line was deliberately **not** used: it contradicts Owl's homepage ("There's no way to ensure every nail is gone") and it is not in the facts lock.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.0 |
| Usability | 7.5 | 7.5 |
| Creativity | 8.0 | 7.0 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.95** | **7.35** |

**Why this default:** V1: real evidence in sequence. V2: clean, but a drawn roof says less than Owl's footage.

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

## Measurement pass (after acceptance; scorecard left as judged)
- **axe, `scrollable-region-focusable`, serious (390px):** V1's sideways photo strip could not be reached by keyboard. It is
  now in the tab order with a label ("Replacement steps; scroll sideways for more"), so the arrow keys scroll it
  (⟦S0070⟧). Superseded markup kept as `replacement-v1-before-axe.html`.
