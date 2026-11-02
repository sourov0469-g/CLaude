# GATE · Roof repair and the Wise Check (Services §3): two versions

**Where it lives:** `owl/site/owl-roofing.html`, the Services page (`#/services`). Switch versions with `?v=repair:1|2`.
**Default: V1.**

**Governing reference:** Longbow (doctrine backed by Owl's own facts).

**What transfers:** each claim sits beside its proof: what a repair fixes, the 10-year workmanship warranty Owl states for repairs, and the Wise Check's named parts. **What never transfers:** dark car pages, serif italics.

**WEB-SKILLS read in full before building** (logged in SKILL-READ-LOG): ⟦S0449⟧ (objection handling as a section: "No scare tactics. No talking over your head."); ⟦S1423⟧ common-region (the Wise Check as one card); ⟦S1426⟧ proximity; ⟦S1420⟧ data-visualization (V2 drawings label directly and never carry meaning alone); ⟦S0076⟧ (the CTA "Call about a repair" is verb + object).

## What was built
V1: Owl's repair text and the Wise Check card (attic inspection, heat-sensor leak detection, photo and video documentation, each in Owl's words). V2: four drawn repair types named by Owl (flashing failures, small leaks, pipe boots, isolated storm damage) plus the warranty line.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.0 | 7.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.80** |

**Why this default:** Even. V2's drawings make the types concrete; V1 carries the Wise Check.

**Vetoes:** none. Facts are only from the lock and Owl's own pages; no overflow; no errors; all CTAs are real tel/sms
links.

**Tests that apply to the whole Services page** (`routetest.mjs`, 10/10; `pageshot.mjs` on defaults and all-V2):
- **Routing:** nav → the page; `aria-current`; focus to main; chapter links and deep links (`#/services/repair`) scroll
  to the chapter; the logo returns Home.
- **Structure:** every section has exactly 2 versions; no duplicate ids in the file.
- **Defaults and all-V2:** no overflow at 1440 or 390, one h1, no errors.
- **Token lint:** clean on every file of the page.

## Defects found and fixed
1. **One line I wrote** ("So you see what we see") was not Owl's. It was replaced with Owl's own "so you know exactly what's happening with your roof".
