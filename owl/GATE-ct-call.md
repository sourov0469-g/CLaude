# GATE · Contact call band and footer (Contact and Price My Roof §7): two versions

**Where it lives:** `#/contact/ct-call`. Switch versions with `?v=ct-call:1|2`. **Default: V1.**

**Governing reference:** Lusion, source-only (the journey ends at one resolved point); B3 Night yard; the shared footer.

**WEB-SKILLS read in full before building** (logged): ⟦S1452⟧ peak-end (end on the call); ⟦S0449⟧ (the final CTA matches the cover's); ⟦S1441⟧ (48px CTAs).

## What was built
- **V1:** "Still deciding? Ask us anything." with Owl's "Get your questions answered, not a pushy sales pitch."; Call + Text.
- **V2:** "We actually answer the phone", the number as display type, the hours, and the email.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.5 |
| Usability | 8.0 | 8.0 |
| Creativity | 7.0 | 6.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.60** |

**Why this default:** V1 closes on Owl's no-pressure promise.

**Vetoes:** none. Facts only from the lock and Owl's own words; every phone link is the one locked number; nothing is sent or stored by the page.

**Page tests:** `pagetest.mjs contact` 12/12; `contacttest.mjs` 26/26 (price validation on blur and field width, the stepper, the message form, the town search, today in the hours); `msg2.mjs` 2/2 (V2 preview); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
None in this section.
