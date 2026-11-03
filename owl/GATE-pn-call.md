# GATE · Protect Your Nest call band and footer (Protect Your Nest §6): two versions

**Where it lives:** `#/nest/pn-call`. Switch versions with `?v=pn-call:1|2`. **Default: V1.**

**Governing reference:** Lusion, source-only (the journey ends at one resolved point); B3 Night yard. The shared footer
(`src/footer.part`) closes the page on its one deep block.

**WEB-SKILLS read in full before building** (logged): ⟦S1452⟧ peak-end (end on the call); ⟦S0449⟧ (the final CTA
matches the cover's); ⟦S1441⟧ (48px CTAs); ⟦S0076⟧ (the Contact link names its destination).

## What was built
- **V1:** "Every Owl roof comes with the whole system." The four parts named; "Our estimates are free." (Owl's words);
  Call + Text.
- **V2:** the number as display type, the hours, and "Price your roof on the Contact page".

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.0 | 6.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.60** |

**Why this default:** V1 sums up the page in one line before the call.

## Tests that apply to the whole Protect Your Nest page
- `pagetest.mjs nest` 12/12: nav opens the page, others hidden; `aria-current`; focus to main; one visible h1; a
  chapter link and a deep link land on their chapter; surfaces alternate paper/cream with one deep block last; 29
  sections × 2 versions; no duplicate ids; one locked number; no errors.
- `nesttest-page.mjs` 10/10 (cleanup line at 1440 and 390, reverse scroll, the game link, reduced motion).
- `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors. Token lint clean.

## Defects found and fixed
None in this section.
