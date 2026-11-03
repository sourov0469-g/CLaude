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

## WEB-SKILLS evidence (added at Muse's correction; facts, versions and scores unchanged)

### Mechanism → tag → check against the built section
| Mechanism | Tag | Check |
|---|---|---|
| One-column form: service, footprint, pitch, readout, actions | ⟦S1442⟧ form-design | Pass. Single column, top-aligned persistent labels. |
| Service as 3 radio pills | ⟦S1442⟧ (radios for 5 or fewer options), ⟦S1444⟧ hicks-law | Pass. Three distinct choices with a smart default (replacement), so the visitor need not choose to see a result. |
| Footprint validation (300-10,000) with an error below the field, `aria-invalid` and `aria-describedby` | ⟦S1442⟧, ⟦S1439⟧ error-handling-ux, ⟦S0054⟧ fixing-accessibility | Partial (see below). |
| Pitch range with `aria-valuetext` ("6 in 12") | ⟦S0054⟧ (accessible names and values) | Pass. |
| Live readout with the formula, `aria-live` | ⟦S1440⟧ feedback-patterns, ⟦S1420⟧ data-visualization | Pass. Immediate inline feedback; labelled directly with context (the formula); the drawing is `aria-hidden` and the numbers carry the meaning in text, so it never relies on the graphic alone. |
| The true-geometry gable that re-spaces with the pitch | ⟦S1420⟧ (simplest encoding that communicates), ⟦S0407⟧ svg-animation (read at Phase 2) | Pass. One shape, honest proportions (tested: ridge at y=10 for 12/12), on the travel curve, static under reduced motion. |
| Invalid input: no number shown, a plain SMS link still offered | ⟦S1439⟧ (recovery: alternative path, preserve input) | Pass. The input is kept; Text and Call stay available. |
| "Text my numbers" carries the visitor's own figures; Call beside it | ⟦S1441⟧ fitts-law, ⟦S1440⟧ | Pass. 48px targets beside the readout they act on; the action is real (an sms: body). |
| No price, only measurement | ⟦S0659⟧ anti-ai-slop (no invented metrics; read at Phase 1a) | Pass. Tested: no `$` price in the section. |

**Validation against the form rules:**
- **What passes:** the error message explains the fix, sits below the field, and is linked with `aria-describedby`;
  `aria-invalid` is set.
- **What fails:** validation runs on every keystroke, where ⟦S1442⟧ says to validate on blur.

### Rules not met (recorded as remaining defects; the version is not changed, per the correction)
1. **Validation timing:** the footprint validates on every keystroke, so typing "1" flashes the error before "1800" is
   complete. ⟦S1442⟧ says to validate on blur. Planned fix: show the error on blur; keep the readout live.
2. **Field width:** the footprint input is full width, though it holds at most 5 digits (⟦S1442⟧: width should hint at
   input length).

## Remediation pass (after acceptance; the scorecard above is left as judged)
The unmet rules recorded at this gate are met. Superseded versions are kept as backups
(`price-v1-before-remediation.html`, `price-v2-before-remediation.html`).
- **⟦S1442⟧ validate on blur:** the footprint is checked on blur and when Text is pressed, never while typing; a shown
  error clears as soon as the value is fixed. An invalid footprint blocks Text and returns focus to the field.
- **⟦S1442⟧ field width:** the footprint field is 9ch wide (was full width), with `maxlength="6"`.
- **Tests:** `remedtest.cjs` (5 checks here); `pricetest.mjs` 9/9, updated so the invalid case blurs first, as the rule
  requires.
