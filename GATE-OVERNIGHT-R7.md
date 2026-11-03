# GATE: Overnight Round 7 — Heroes 9 and 10 (the hero reaches 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF.
**Defaults:** unchanged.
**How to view:** `?hero=9` and `?hero=10`, or the switcher.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Hero 9, "Type as the house"** | Dropbox Brand (type as the image) and Graza (custom-animation bar) | S1500 (display type at poster scale, tight leading), S1501 (one emphasis zone: the type), S1329 (lines rise in through a mask), S1330 (scroll offset per line), S0220 (the window photo is the firm's own job, captioned with its record) |
| **Hero 10, "One visit"** | Apple AirPods Pro (one word changing as the event) | S1326 / S0489 (motion that informs; reduced motion = the first trade, still; meaning never depends on the roll), S0054 (the rolling word is `aria-hidden`; the h1 reads "New siding, windows or roofing."), S1442 (trade buttons as plain choices), S0083 |

## Build log, per version as it landed

### Hero 9, "Type as the house" (`o7-hero9.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)

**Composition.** The headline fills the frame at poster scale, in four lines:
1. "The full";
2. "wall [window] or";
3. "the whole" (in outline);
4. "house.".

**The one window.** The only photograph sits inside line 2, the size of a word: a window-shaped crop (green frame, glazing bar, lower sash) of the firm's own job.
- **Its caption:** "Maple Run, Austin · Feb 2026 · Siding & Exterior Painting".
- **On scroll:**
  - the lines slide apart a little, opposite ways;
  - the lower sash lifts.
- **On hover:** the sash lifts.

**How it differs:** no full-bleed photo, no card, no split. It is the only hero where the type is the image.

### Hero 10, "One visit" (`o7-hero10.jpg` · `-1440-0/1`, `-768-0`, `-390-0`)

**Composition.** Everything is centred on the white ground, which makes this the fourth distinct composition: no photo, no card, no band.
- **The headline:** "New [siding. / windows. / roofing.]". The trade word rolls every 2.8 s like an odometer, with a lime underline.
- **The fixed anchor beneath:** "One free inspection covers every trade on the house."
- **A line drawing** for the current trade draws itself.
- **Three trade buttons** carry their documented counts: 431 siding jobs, 388 window jobs, 241 shingle and metal roofs.
- Then the CTA, phone and rating.

**Behaviour:**
- Hovering or focusing the headline or the buttons pauses the roll.
- Choosing a trade stops it there.
- With reduced motion it shows "siding", still.

## Self-tests

| Check | Result |
|---|---|
| Hero 9 at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Lines rise in; sash lifts on scroll. Reduced motion: all 4 lines visible, no motion |
| Hero 10 at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Roll measured siding → windows → roofing → siding. Clicking Roofing holds it through a full cycle. Screen-reader name "New siding, windows or roofing." Reduced motion holds "siding" |

### Defects found and fixed this round

1. **Hero 9 on phones and tablets:** a global `!important` rule capped every hero headline at 46 px, so the poster shrank. Hero 9 overrides it: 18.5 vw, up to 150 px.
2. **Hero 10:** hovering anywhere on the hero paused the roll; only the headline and the buttons pause it now.
3. **Hero 10:** the lime underline spanned the widest word's slot instead of the word; it is now a text underline.
4. **Hero 10:** the full stop floated away from the word; it now rolls with each word.
5. **Hero 10:** the previous word's descender peeked into the roll window; each slot is taller (1.24 em).

### Remaining

- The roll's 2.8 s pace still needs judging on a real screen.
- Hero 9 embeds one 640 px job photo (+47 KB).

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | Hero 9 | S1500, S1501, S0650, S0220 |
| Section | Hero 10 | S1501 (the rolling word is the one emphasis), S0650, S0220 |
| Element | H9 lines | S1329 (mask rise, 60 ms stagger), S1330 (scroll offset ±2–6 vw) |
| Element | H9 window and sash | S0442 (glass and frame), S0405 (hover lift) |
| Element | H10 roll | S1326 / S0489 (2.8 s step, 0.85 s ease-in-out, pause on interest, reduced motion still) |
| Element | H10 trade buttons | S1442, S0054 (`aria-pressed`) |
| Element | H10 trade line drawing | S1362 (strokes draw) |
| Element | Buttons | S0405 |

**Critique pass:**
- **S1501:** one zone each (Hero 9 the type, Hero 10 the word).
- **S1473 H4:** the anchor line keeps the meaning fixed.
- **S1498:** Hero 10 is the only centred hero; Hero 9 the only type-led one.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Hero 9, Type as the house | 8.6 | 7.8 | 8.6 | 8.0 | **8.30** | PASS |
| Hero 10, One visit | 8.2 | 8.6 | 7.8 | 8.6 | **8.30** | PASS |

**Vetoes: none.**

**The hero now has 10 versions:** 1–10, plus archive A2–A5. **Next: Round 8, Services E and F.**
