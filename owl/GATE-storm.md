# GATE · Storm damage and insurance (home §7): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=storm:1|2`. **Default: V1.**

**Reference:** Longbow.
- **What transfers:** a numbered doctrine.
- **What never transfers:** the dark car page, the serif italics.
- **The only numbers used:** the steps Owl itself numbers.

**Content:** every line is Owl's homepage copy.
- **Specialty:** "Storm Damage Specialists"; "Home is where the heart is, not where the hail damage is!"
- **Process:** Owl's own 4-step process, quoted.
- **Insurance:** Owl's sentence: "…whether you're paying full price, financing, or using insurance – we make it easy."
- **Not claimed:** the subject pack's blog-only details (adjuster meetings, supplements) are not stated as promises.

**Skills applied:**
- ⟦S0489⟧: hail falls on an ease-in (falling things only), once, then rests. Dents appear by opacity only.
- ⟦S1454⟧: the CTA is the last item.
- The closed-inventory accordion (V2).

## V1 · After the hail
- **The drawing:** a storm cloud over a roof. When first seen, eleven hailstones fall onto the roof once and leave three
  amber dents.
- **The steps:** Owl's four steps as stations on a dotted route line (vertical below 768px).
- **Insurance:** an insurance band ending in Call.

## V2 · Storm checklist
- **Left (sticky):** Owl's line set as a title, with Call and "Text a photo of the damage" (Owl invites texting).
- **Right:** the steps and "Using insurance?" in the accordion component.

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.5 | 7.0 |
| Usability (30) | 8.0 | 8.0 |
| Creativity (20) | 7.5 | 6.5 |
| Content (10) | 9.0 | 9.0 |
| **Weighted** | **7.80** | **7.40** |

**Vetoes:** none. No overflow at 1440 or 390; no JS errors; quotes only.

## Tests: 5/5 pass (`stormtest.mjs`)
- **The hail lands:** no stones are left visible, and all 3 dents show, both normally and under reduced motion (shown
  directly as the final frame).
- **V2:** the accordion opens the insurance answer.
- **Token lint:** clean.

## Defects found and fixed
1. **CTA wrap:** "Call about storm damage" wrapped onto two lines inside its pill at 390px. It is now the standard
   "Call (651) 977-6027".
2. **My first review frame:** it was captured mid-animation (stones still visible). Not a page defect; the end state was
   then verified by test.
