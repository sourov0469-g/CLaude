# GATE · The Wise Check and Price My Roof (home §9): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=price:1|2`. **Default: V1.**

**Reference:** Quiet Cubes, in a supporting role.
- **What transfers:** the visitor operates an instrument about their own case, with choices as pills and a tailored
  result.
- **What never transfers:** a blocking gate, the dark ground, the pods.

**Rule held:** no invented prices. The instrument only measures (footprint × pitch factor ÷ 100 = squares, with the
formula shown), then hands off to Owl's real channels.

**Content:**
- The Wise Check in Owl's own words, with its two named parts (attic inspection, heat-sensor leak detection).
- "Our estimates are free" (Owl).

## The instrument (shared by both versions)
**Inputs:**
- A service as pills: radio inputs, so they are keyboard and focus visible.
- The footprint, validated (300-10,000 sq ft). The field component shows the error, with `aria-invalid`.
- The pitch, on a range input with `aria-valuetext` ("6 in 12").

**Readout:** tabular, with the formula, and announced through `aria-live`.

**The drawing:** a gable in **true geometry** (rise = half-span × pitch / 12). Its courses re-space as the pitch
changes, on the travel curve.

**The hand-off:** "Text my numbers" opens an SMS to (651) 977-6027, pre-filled with the visitor's own service, footprint,
pitch and squares. It is a real action, not a form posting nowhere.

## V1 · Wise Check beside the instrument
Owl's Wise Check badge and text, with the attic and heat-sensor parts, beside a raised instrument card. B1 Lawn light
sits behind.

## V2 · Instrument first
- **The lead:** "Price my roof." as a large title.
- **The instrument:** a big drawing beside the controls.
- **Below:** a Wise Check band with "Book a Wise Check" (tel).

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.5 | 7.5 |
| Usability (30) | 8.5 | 8.5 |
| Creativity (20) | 7.5 | 7.5 |
| Content (10) | 9.0 | 9.0 |
| **Weighted** | **7.90** | **7.90** |

**Default: V1.** The rated values are equal. V1 puts the inspection first, which matches Owl's real order: an inspection,
then an estimate. V2 suits a page about pricing (the Contact page reuses it).

**Vetoes:** none.
- **Prices:** none shown (tested).
- **CTAs:** both real.
- **Layout:** no overflow at 1440 or 390.
- **JS:** no errors.

## Tests: 9/9 pass (`pricetest.mjs`)
- **Arithmetic:**
  - 1,800 at 6/12 gives 20 squares (1.118).
  - 2,400 at 9/12 gives 30 squares (1.250).
- **The SMS** carries the visitor's own numbers and the chosen service.
- **Invalid footprint:** shows the error, no number and a plain SMS link, with `aria-invalid` set.
- **The drawing** reaches its ridge at y = 10 for 12/12 (rise equals half-span).
- **No `$` price anywhere** in the section.
- **No errors.**
- **Token lint:** clean.

## Defects found and fixed
1. **The drawing was dishonest:** the rise was scaled by 0.6, so 6/12 looked like 3/12. Fixed to true geometry.
2. **"Free written estimates":** Owl says its estimates are free, never "written". The word was removed from the note,
   the lead and the SMS body.
3. **CTA wrap:** "Text these numbers to Owl" wrapped onto two lines inside its pill at 390px. Now "Text my numbers".
4. **My own test** read the gable mid-transition. It now waits for the transition (a test fix, not a page fix).
