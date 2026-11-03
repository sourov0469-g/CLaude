# GATE · Towns we serve (Contact and Price My Roof §5): two versions

**Where it lives:** `#/contact/ct-area`. Switch versions with `?v=ct-area:1|2`. **Default: V1.**

**Governing reference:** Quiet Cubes (one control, instant feedback). V2 uses Scout's evidence: Owl's own service-area map. **Never transferred:** the cubes.

**WEB-SKILLS read in full before building** (logged): ⟦S1453⟧ search-ux (a placeholder that says what to type; **a clear button once there is a query**; **typo tolerance**; highlight the match; a result count; **zero results echo the query** and point forward); ⟦S1438⟧ (results on each keystroke, under a frame); ⟦S0070⟧ (the clear button has a name; Escape clears; focus returns to the field).

## What was built
- **V1:** the search beside the 29-town list (Owl's towns, Shoreview pinned). "Rosevile" → "No town called \"Rosevile\". Did you mean Roseville? Owl works there."; "Duluth" → "No town matches \"Duluth\". Owl also works in surrounding Minnesota communities: call or text and ask."; "st paul" finds Saint Paul.
- **V2:** Owl's own service-area map (captioned) beside the list.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 8.0 |
| Usability | 9.0 | 7.5 |
| Creativity | 7.5 | 6.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **8.10** | **7.65** |

**Why this default:** V1 answers "do you work in my town?" directly, with typos forgiven.

**Vetoes:** none. Facts only from the lock and Owl's own words; every phone link is the one locked number; nothing is sent or stored by the page.

**Page tests:** `pagetest.mjs contact` 12/12; `contacttest.mjs` 26/26 (price validation on blur and field width, the stepper, the message form, the town search, today in the hours); `msg2.mjs` 2/2 (V2 preview); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
1. **Fixed the three unmet rules recorded at the homepage area gate:** a clear button, typo tolerance (edit distance 1 for short queries, 2 for longer), and the query echoed on no match. Tests check each.
2. **The clear button showed with no query:** its `display` overrode `hidden`. Fixed; the test checks it.
