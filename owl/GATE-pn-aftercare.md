# GATE · Owl Roof Aftercare (Protect Your Nest §4): two versions

**Where it lives:** `#/nest/pn-aftercare`. Switch versions with `?v=pn-aftercare:1|2`. **Default: V1.**

**Governing references:** V1 Scout (the company's own object as evidence). V2 the Graza custom-animation bar (one
drawn, purposeful motion). **Never transferred:** Scout's archive collage; Graza's bottle.

**WEB-SKILLS read in full before building** (logged): ⟦S1434⟧ (V2: the phrase "shingle tomb" is the one large
element); ⟦S0659⟧ (Owl's own words; the image is Owl's own aftercare box, captioned as from Owl's site); ⟦S0400⟧ (the
shingles and lid play once; shut at once under reduced motion).

## What was built
- **V1:** Owl's aftercare box image beside "Your leftover shingles get a home of their own." and Owl's two sentences.
- **V2:** "The shingle tomb." as display type; three spare shingles drop into a drawn box marked OWL and the lid comes
  down once.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 7.0 |
| Usability | 8.0 | 8.0 |
| Creativity | 6.5 | 7.5 |
| Content | 9.0 | 8.0 |
| **Weighted** | **7.60** | **7.50** |

**Why this default:** V1 shows the real box. V2's drawing is plainer than the object it stands for.

**Page tests** (`pagetest.mjs nest` 12/12; `nesttest-page.mjs` 10/10; `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean).

## Defects found and fixed
1. **The lid started swung open** and, on phones, crossed the heading. It now drops straight down onto the box and
   stays inside the drawing; the reduced-motion test checks it is shut.
2. **The drawing was small with empty space above.** The viewBox was cropped to the box and the falling shingles.
