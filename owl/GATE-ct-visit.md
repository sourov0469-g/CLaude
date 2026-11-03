# GATE · Hours and address (Contact and Price My Roof §4): two versions

**Where it lives:** `#/contact/ct-visit`. Switch versions with `?v=ct-visit:1|2`. **Default: V2.**

**Governing reference:** Longbow (plain facts, set precisely). **Never transferred:** Longbow's product.

**WEB-SKILLS read in full before building** (logged): ⟦S1438⟧ doherty-threshold (the open-now line is computed instantly, no spinner); ⟦S0070⟧ (an `address` element; today marked with `aria-current="date"`, not colour alone; the external Maps link says it opens a new tab); ⟦S0659⟧ (only lock facts: address, phone, email, Mon–Sat 8:00–18:00, licence, GAF Systems Plus, BBB A−).

## What was built
- **V1:** an address card with phone, email, hours, licence and credentials, and **Directions in Google Maps** (a plain link out).
- **V2:** "Open Monday to Saturday." with a live line ("Open now, until 18:00 Shoreview time" or "Closed now. Opens … at 8:00"), computed in America/Chicago; the week as seven cells with today marked; Sunday "Closed" because the lock gives no Sunday hours.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 8.0 |
| Usability | 8.5 | 8.5 |
| Creativity | 6.0 | 7.5 |
| Content | 9.5 | 9.0 |
| **Weighted** | **7.70** | **8.15** |

**Why this default:** V2 answers the real question, "can I call now?", in Shoreview's time, whatever the visitor's time zone.

**Vetoes:** none. Facts only from the lock and Owl's own words; every phone link is the one locked number; nothing is sent or stored by the page.

**Page tests:** `pagetest.mjs contact` 12/12; `contacttest.mjs` 26/26 (price validation on blur and field width, the stepper, the message form, the town search, today in the hours); `msg2.mjs` 2/2 (V2 preview); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
None beyond the tests.
