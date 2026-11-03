# GATE · Price My Roof (Contact and Price My Roof §2): two versions

**Where it lives:** `#/contact/ct-price`. Switch versions with `?v=ct-price:1|2`. **Default: V1.**

**Governing references:** V1 Quiet Cubes (one object, two controls, instant feedback: the gable redraws with the pitch). V2 the same tool as three named steps (⟦S1457⟧). **Never transferred:** Quiet Cubes' cubes and pricing.

**WEB-SKILLS read in full before building** (logged): ⟦S1442⟧ form-design (**validation on blur, never per keystroke**; the error under the field; **field width sized to its input**, about 7 characters; a sensible default); ⟦S1439⟧ (the error says how to fix it, with an example); ⟦S0070⟧ (labels, `aria-invalid`, `aria-describedby`, radios as a fieldset with a legend, 48px targets); ⟦S1457⟧ (V2: Step n of 3 with a bar, a clear end); ⟦S1438⟧ (results update in under a frame; no spinner); ⟦S0659⟧ (it measures squares, never shows a price).

## What was built
- **V1:** service choice, footprint, pitch slider, the formula and the squares, "This measures your roof; it is not a price.", and **Text my numbers to Owl** (the SMS carries the visitor's own numbers) or Call.
- **V2:** the same in three steps (what you need, footprint, pitch), Back/Next, progress, and Text at the end. Next refuses an invalid footprint and shows the error.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 8.0 | 7.5 |
| Usability | 8.5 | 8.0 |
| Creativity | 8.0 | 7.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **8.25** | **7.80** |

**Why this default:** V1 shows the whole calculation at once; the result updates as you type.

**Vetoes:** none. Facts only from the lock and Owl's own words; every phone link is the one locked number; nothing is sent or stored by the page.

**Page tests:** `pagetest.mjs contact` 12/12; `contacttest.mjs` 26/26 (price validation on blur and field width, the stepper, the message form, the town search, today in the hours); `msg2.mjs` 2/2 (V2 preview); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
1. **Fixed the two unmet rules recorded at the homepage price gate:** validation now runs on blur (and on Text or Next), never while typing; the footprint field is 9ch wide, not full width. Tests check both.
2. **V2 showed Back and Text on step 1:** the button style's `display` overrode `hidden`. Added `[hidden]{display:none}` in the step nav; the test checks step 1 shows Next only.
