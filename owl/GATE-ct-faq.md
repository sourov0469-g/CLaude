# GATE · Questions (Contact and Price My Roof §6): two versions

**Where it lives:** `#/contact/ct-faq`. Switch versions with `?v=ct-faq:1|2`. **Default: V1.**

**Governing reference:** Longbow (straight answers, no adjectives). **Never transferred:** Longbow's product.

**WEB-SKILLS read in full before building** (logged): ⟦S0618⟧ faq-page (with fewer than 8 entries: a simple list, no categories, no search; answers 2-4 sentences; real questions); ⟦S1449⟧ (six entries); ⟦S0076⟧ (links name their destination).

## What was built
- **Sources:** three questions are Owl's own FAQ block (cost, warranty, timeline); the others are answered from Owl's storm page, the town list and the lock. **The warranty answer uses the lock** ("up to 50 years"), not Owl's FAQ wording ("50 year … on all roofing materials"), which overstates it against the lock.
- **V1:** a native details/summary accordion.
- **V2:** all six open as a two-column definition list.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.5 | 8.0 |
| Creativity | 6.0 | 6.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.65** | **7.60** |

**Why this default:** V1 keeps the page short; every answer is one tap away and works without JavaScript.

**Vetoes:** none. Facts only from the lock and Owl's own words; every phone link is the one locked number; nothing is sent or stored by the page.

**Page tests:** `pagetest.mjs contact` 12/12; `contacttest.mjs` 26/26 (price validation on blur and field width, the stepper, the message form, the town search, today in the hours); `msg2.mjs` 2/2 (V2 preview); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
None beyond the page checks.
