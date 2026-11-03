# GATE: Overnight Round 6 — corrections C2–C5 + Heroes 7 and 8

**Date:** 2026-11-03/04, overnight. **Under:** AUSTIN-OVERNIGHT-BRIEF.
**Defaults:** unchanged; the owner picks winners later.
**File:** `siding/redo/site/out/site.html`. New heroes open with `?hero=7` and `?hero=8`, and both are listed in the `?review` switcher.

## Plan lines (written before building)

| Version | Reference | Skills it is built from |
|---|---|---|
| **Hero 7, "The record"** | Apple AirPods Pro (numbers as events) and Lando Norris (the record as the subject) | S1501 (one emphasis zone), S0650 (headline length), S0220 (locked facts only), S0083 (count-up ease), S1324 (lens around the pointer), S0489 (intro plays once) |
| **Hero 8, "Last light"** | Scout Motors (cinematic full-bleed photo, information beneath) | S1358 (image-first: full bleed with an anchored content block), S1425 (the band is figure, the photo is ground), S1329 (headline word rise), S1330 (damped pointer drift) |

## Build log, per version as it landed

- **Hero 7, "The record"** (`o6-hero7.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)
  - **Composition:** the firm's documented projects sit on the pure white ground as a dot field across the hero. These are positions from the firm's own finder records, as in Area C, so nothing is drawn or generated. Dots with photos on the firm's site carry a lime ring, and the office is a lime square.
  - **Intro:** the dots fill in by date, 2018 → 2026, while a year counter runs.
  - **Text:** the headline "Our work, on the record.", the 886 wording verbatim, one CTA plus the phone, then the numbers row. 431 and 388 count up; 4.9 from 474 carries green stars.
  - **Pointer:** a soft lens lifts the dots near it. It is not drivable; driving belongs to Area C.
  - **The world:** the hidden world still reveals behind the field.
  - **How it differs:** no photograph, no card, no split scaffold. It is the only hero whose visual is data.
- **Hero 8, "Last light"** (`o6-hero8.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)
  - **Composition:** the dusk board-and-batten photo (Muse's, never captioned as a job) is full bleed.
  - **The band:** the headline, support line, CTAs and rating sit in a **deep-green bottom band** with a lime lap edge. The band rises in while the light settles from cold to warm.
  - **Scroll and pointer:** the photo drifts slightly against the band.
  - **How it differs:** the band is the composition. Nothing sits in the sky (unlike Hero 4), there is no side card (unlike Hero 1), and it is not split.

## Corrections

| | Correction | Done | Proof |
|---|---|---|---|
| **C2** | One star system | Every star on the site is now deep green #0E3B2C, with pale green for empty stars. This covers the Reviews A/C/D aggregate, the Reviews B big tag, Booking C's frame, the heroes and the archive film hero. Where stars sat on a dark ground (the Reviews B green tag, the archive film hero), they now sit on a small white pill so green stays visible. One more fix: a "last span" rule had turned the Reviews B stars light-lime; they are pinned to green. Measured colour rgb(14,59,44) everywhere checked | `o6-c2-stars.jpg` |
| **C3** | Footer email | The address now carries a break point only after "@" and can no longer split mid-word. At 1440 it breaks cleanly as "info@ / austinprosiding.com"; at 768 it sits on one line; at 390 it breaks after "@" | `o6-c3-email.jpg` (1440 / 768 / 390) |
| **C4** | Phone touch reveal (my Round 3 proposal, approved) | On touch screens the reveal now stamps at most 0.035 per frame (was 0.22) and fades faster (0.93 per frame, was 0.972). Its steady strength while scrolling tops out at about half, so it stays a hint behind copy. Desktop is unchanged | `world.js` lines 173, 181 |
| **C5** | World art asset request | §C5 below | — |

### C5 — asset request: layered art to replace the pictogram world

**Common to all five scenes:**
- **Format:** transparent **PNG-24**, or flat **SVG**, with no text in the art.
- **Canvas:** **2400 × 1600 px** per layer, landscape 3:2. Content is centred in a 2000 × 1300 safe area, because each layer is shifted up to about 60 px by parallax.
- **Palette only:** deep green #0E3B2C, lime #B5DB6E, ink #16191D, and pale tints of green on white. No steel greys.
- **Style:** flat editorial illustration with real figures (people with weight and posture, not pictograms), seen from about eye level, no faces in detail.
- **Weight budget:** **≤ 180 KB per layer** after WebP conversion, so **≤ 540 KB per scene** and **≤ 2.7 MB for all five**.
- **Three layers per scene:**
  - **Far:** pale, low contrast, about 30 % ink coverage.
  - **Mid:** the house or structure.
  - **Near:** the people and tools, darkest.

**The scenes** (each listed by region of the page, then far / mid / near layer):
1. **Siding crew** (hero, services):
   - far: a pale street and neighbouring roofs;
   - mid: a house wall half re-sided, with house wrap showing above the new lap courses;
   - near: two people lifting a long lap board to the wall, one on a scaffold deck nailing, one at sawhorses cutting.
2. **Colour and trim** (visualiser):
   - far: sky and pale trees;
   - mid: a gable end with fresh trim boards;
   - near: a painter on a ladder cutting in the eave, and a second person holding up a fan of colour swatches.
3. **Window fit** (windows, reviews):
   - far: a pale garden;
   - mid: a wall with an empty rough opening and its flashing;
   - near: two people carrying a window unit to the opening, and a third checking it with a level.
4. **Roofing crew** (process, try the job):
   - far: pale treetops;
   - mid: a pitched roof with felt and half-laid shingle courses;
   - near: two people kneeling and laying courses, and one climbing a ladder with a bundle on the shoulder.
5. **The street** (on your street, booking, footer):
   - far: a pale row of houses;
   - mid: one house with a new gutter run;
   - near: a person on a ladder hanging the gutter, one holding a downspout, and the project manager walking the job with the homeowner (clipboard, not a tablet).

The mechanism already loads three planes per scene, so the art drops straight in. The ladder does not wait for it.

## Self-tests (Playwright, SwiftShader GL)

| Check | 1440 | 768 | 390 |
|---|---|---|---|
| Hero 7 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids; field fills in; year counter reaches 2026; lens lifts dots | Same | Same (year counter hidden: it collided with the eyebrow) |
| Hero 8 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids; band rises; warm light settles | Same | Same |
| C2 / C3 | Measured as in the table above | | |

### Defects found and fixed this round

1. **Hero 8:** the band's inner wrapper used class `.in`, which the headline-split script also adds to the h1. The h1 inherited the band's two-column grid and broke one word per line. Renamed.
2. **Hero 7:** the dots were too faint and too small; their size and contrast were raised.
3. **Hero 7 on phones:** the year counter collided with the eyebrow; it is hidden there (it is decorative and `aria-hidden`).
4. **C2:** the Reviews B stars were light lime (described under C2).

### Remaining

Real-hardware checks are still owed: Hero 7's canvas intro and Hero 8's eight-second settle.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Site | Stars (C2) | S1496 (one colour system for one element type), S1497 (green on white; white pill where the ground is dark) |
| Site | Footer email (C3) | S1500 (no mid-word breaks; a break point only at "@") |
| Site | World touch reveal (C4) | S0489 (a hint, not a takeover), S1324 (strength capped) |
| Section | Hero 7 | S1501 (the headline and the field are one zone; numbers secondary), S0650, S0220 |
| Section | Hero 8 | S1358, S1425, S0650 |
| Element | H7 dot field and intro | S0083 (order by date; ease), S0489 (once), S1324 (pointer lens, radius 110) |
| Element | H7 numbers | S0083 (count-up 1.4 s, staggered 160 ms) |
| Element | H8 band rise | S1436 (1 s ease-out, follow-through), S1329 (headline words) |
| Element | H8 light settle | S0489 (one settle, 2.6 s) |
| Element | Buttons in both | S0405 (magnetic lean, sweep, press) |

**Critique pass:**
- **S1473 H1 visibility:** passed.
- **S1501:**
  - Hero 7 has one primary zone.
  - Hero 8 puts all the type in the band.
- **S1498 composition:** Hero 8's band is a full-width block, not a card.
- **S1496 brand:** green, lime and white only.
- **S1482 QA:** done.

## Scorecard (D40 / U30 / C20 / Ct10; PASS ≥ 7.0, none < 6.0, zero vetoes)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Hero 7, The record | 8.2 | 8.2 | 8.8 | 9.0 | **8.42** | PASS |
| Hero 8, Last light | 8.4 | 8.4 | 7.6 | 8.0 | **8.20** | PASS |

**Vetoes: none.** Muse's photo is never captioned as a job, and the locks are verbatim.

**Next: Round 7, Heroes 9 and 10.**
