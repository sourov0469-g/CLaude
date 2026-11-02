# GATE · Call band and footer (home §11): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=call:1|2`. **Default: V1.**

**Basis:**
- **The block:** the homepage's single deep block, at the end, as the surface plan requires.
- **Background:** B3 Night yard. Owl's treeline sits in three olive depths with one porch light, below the copy and never
  behind it.
- **Reference:** Lusion (source-only).
- **What transfers:** the one continuous journey line resolves into a final form at the end.
- **Peak-end (⟦S1452⟧):** the page ends on the call, not on a form.

## Asset change (closes a Gate 2 defect)
`Owl.nest` gained an **`onDeep`** tone mapping:
- olive-300, tan and cream strands;
- the amber strand last.

On deep olive, the ink strands had disappeared ("thin, reads as a basket").

## V1 · The nest closes around the number
- **The heading** is Owl's promise: "We actually answer the phone."
- **The nest:** the line weaves it as the band enters, and the phone number rests on its rim, with the amber front rim
  beneath.
- **Then:** "Call or text. Mon–Sat, 8:00 to 18:00.", Call now and Text us.
- **The footer:**
  - Owl's white logo and the footer nav.
  - The full locked contact block: LLC, address, phone, email, hours, MN licence #BC809662, GAF Systems Plus Certified,
    BBB Accredited A−.

## V2 · The number is the headline
- **The number:** (651) 977-6027 as display type. The line draws itself beneath it as an amber underline.
- **The promise:** in Owl's words, including "You can even text us throughout the process."
- **The footer:** the same as V1.

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.5 | 7.5 |
| Usability (30) | 8.0 | 8.5 |
| Creativity (20) | 8.0 | 6.5 |
| Content (10) | 9.0 | 9.0 |
| **Weighted** | **7.90** | **7.75** |

**Default: V1.** It resolves the brand's one line into the nest, the end the whole homepage was built toward. V2 is the
more direct call.

**Vetoes:** none.
- **Contrast:** cream on deep olive is 9.45:1; amber on deep is 5.03:1.
- **Layout:** no overflow at 1440 or 390.
- **JS:** no errors.
- **CTAs:** all real tel/sms links.

## Tests: 8/8 pass (`calltest.mjs`)
- **The nest** is fully woven at the end of the page, with the amber strand last, both normally and under reduced motion.
- **V2's underline** is fully drawn at the end.
- **The footer** carries the address, phone, email, hours and licence.
- **No errors.**
- **Token lint:** clean.

## Defects found and fixed
1. **The nest on deep** was illegible (ink strands). The `onDeep` tones were added to the asset.
2. **The phone number** sat over the nest's back rim. It now rests on the rim, with the amber front rim beneath it.
