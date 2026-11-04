# GATE-NEW · Reviews · V2 "The rating, filled"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 1, section 5 of 7. The Hero, How a job runs, Financing and Our Work gates were accepted by Muse.

The default is unchanged: V1 (the constellation spelling 4.8) stays version 1 and its code is untouched. No backups ship.

**How to see V2:**
- **Header switch.** Use the Reviews "1 · 2" switch while the section is in view. On phones it is the "‹ 1/2 ›" stepper.
- **Built page.** `elbaz-homepage.html?reviews=2` opens V2 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Apple AirPods Pro** is the primary ("numerals as events"). Its idea is taken: the numbers are events, arriving as the thing they count arrives. The figures 4.8 and 343 count up as the stars land, and down again if you scroll back.
- **Signature move:** the rating, filled.
  - On a night-sky band, the 343 small stars (one per published Google review) gather together and fill five large star outlines up to exactly 4.8 of 5. Four are full; the fifth is filled to 80% from its left edge.
  - The counters run with them: 343 reviews landing, and the average arriving at 4.8.
  - The aggregate is shown as the rating itself, not as typed digits.
- **The owner's law, kept exactly:**
  - aggregate-led (only the two published figures; no quote, no name, nothing invented);
  - the gather-and-form behaviour: the stars gather and form the aggregate together, driven by the scroll as the owner asked (scattered below, fully formed when the figure reaches mid-screen, loosening if you scroll back);
  - the pointer scatters them and they reassemble on their own; a tap scatters them on touch; "Scatter them" does it from the keyboard.
- **Style family:** a night sky (a full-bleed ink band, pale stars, a large paper numeral). V1 is a paper section with a constellation spelling "4.8" in type.
- **WEB-SKILLS tags per element:**
  - **Star field:**
    - S0340 (the stars as bodies on springs, the reassembly);
    - S0089 (pointer-driven motion springs; the scroll gather eases);
    - S0062: canvas, with a capped device-pixel ratio and frame budget;
    - S0083: one focal point.
  - **Numerals:** S0666 (the big numeral leads); the counters are `aria-hidden`, with the true values in screen-reader text.
  - **Scroll gather:** S1326 (one reversible value); S1209 (no pin, native scroll).
  - **Controls:** S1441: 44px; S1018 (a keyboard path to scatter).
  - **Reduced motion:** S0400 (formed and still, the final figures shown).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 forms the digits "4.8" out of stars on paper, with copy above and a caption under it. V2 forms the rating as five stars on a dark band, the familiar picture of a review score, with live numerals beside it.
  - **Why it is better.** A five-star row is read instantly as a rating by every visitor. Seeing exactly 4.8 of 5 filled is the most honest, legible way to show the figure. The night band gives the section a distinct presence between Our Work and the reviews row.

(Tag correction made before building: V1's code comment cites S0687 for "constellation FX", but S0687 in the library is `template/html-ppt`. V2 cites S0340 and S0089 instead. V1's comment is left as it is, since the delivered version is not altered.)

## What was built
**Files:**
- `remodeling/src/sections/reviews.html`: V2 added in the existing version system (`.ver[data-v="2"]`, prefix `rs__`).
- `css/sections/reviews.css`: a V2 block appended.
- `js/sections/reviews.js`: a `2:` definition beside `1:`, using the same `COUNT = 343`.
- V1 is untouched.

**The band:** full bleed in ink (the brand's own black), with a soft clay glow.
- **Layout:**
  - left: the eyebrow, the H2, the numeral "4.8 out of 5", "343 Google reviews, one average", Book a consultation, and "Scatter them";
  - right: the five-star canvas and its hint.
  - On phones it stacks: heading, stars, hint, numeral, count, actions.

**The rating:**
- Five large star outlines (pale, 34%) are drawn on the canvas.
- 343 points are blue-noise-sampled inside the filled shape: four whole stars plus the fifth clipped at 80% of its width. That is exactly 4.8 of 5.
- A faint tint of the same filled shape strengthens as the stars arrive, so the fifth star clearly reads as 80% full.

**Gather (as the owner asked):**
- Before, the 343 stars are a quiet starfield across and just below the band.
- They gather with the scroll and are fully formed when the band's centre reaches mid-screen. Scrolling back loosens them again.
- One reversible value drives this; there is no pin.

**The numerals as events:** "4.8" and "343" count with the share of stars that have landed.
- Measured: 0.2/16 → 4.1/290 → 4.8/343 while scrolling in, back to 2.7/190 when scrolling out, and 4.8/343 again.
- Screen readers get the fixed sentence "4.8 out of 5, the average across 343 Google reviews."

**Scatter:**
- the pointer pushes the stars aside and they spring home (S0340);
- a tap scatters them on touch;
- "Scatter them" scatters them from the keyboard.

**Also:** a slow twinkle while in view. The loop runs only while the band is on screen, at 40fps at most, with the device-pixel ratio capped at 1.5.

**Reduced motion:** formed, still, final figures.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Reviews V2** | **8** | **8** | **8** | **10** | **8.2** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.6 + 1.0 = 8.2.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One strong image:** the five-star rating, read instantly, with exactly 4.8 shown (the fifth star visibly 80% full).<br>**A distinct band** in the brand's ink with pale stars and a paper numeral at 9.5rem.<br>**Heights:** 641px at 1440, 669px at 1024, 684 to 697px on phones, all under one screen.<br>**Contrast:** pale text on ink (sand 50 to 300 and clay 300) is high-contrast. | The phone stars are small (cells about 72px), so the individual stars read as texture rather than stars there. A dark band is a bold change of ground for the site; the owner may prefer the paper ground. |
| **Usability 8** | **The owner's behaviour, verified:** scroll gather, reversible; formed at mid-screen; pointer scatter with self-reassembly; tap scatter on touch; the keyboard path (Tab to "Scatter them", focus visible, Enter scatters).<br>**Targets:** at least 44px; 0 text under 13px at 360 to 1440; 0 overflow; 0 errors.<br>**Screen readers:** the true figures, never a mid-count number.<br>**Reduced motion (S0400):** formed, with the final figures. | The canvas has no keyboard interaction of its own beyond "Scatter them" (the same as V1). |
| **Creativity 8** | **A move the section did not have:** the figure as a filled rating plus live numerals. "Every star, one review" made literal: 343 stars make up the 4.8. | It shares V1's particle engine. The difference is the form, the band and the numerals, not a new kind of physics. |
| **Content 10** | **Only the two published figures** (4.8, 343) and "Google reviews". No quote, no name, no invented claim; the rating is exactly 4.8 of 5, drawn to scale.<br>Locks **0 fails**; outside links **0**. | |

**Vetoes checked, none tripped:**
- no console errors or warnings (V2 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- no images;
- the aggregate is locked at 4.8 and 343; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The fifth star did not read as 80% full.** 343 stars spread over 4.8 large stars are sparse, so the empty fifth of the fifth star did not show. Fixed: a faint tint of the exact filled shape (clipped at 4.8 of 5) strengthens with the gather, and the star's unfilled tip is now plain to see.
2. **Wrong skill tag carried from V1** (S0687 is a slide template). V2 cites S0340 and S0089 (see the note under the plan line).

## Defects remaining (honest)
- On phones the stars are small and read as texture inside the five shapes.
- The dark band is a deliberate change of ground (ink is the brand's own black, but it is the site's only full dark band); Muse should judge it.
- A fast scroller sees the stars gather in under a second; that follows the owner's scroll-driven rule.
- No assets needed or requested.

## Reference: transfers and non-transfers (Apple AirPods Pro, primary)
- **Transferred:** numerals as events (the figures count with what they count, reversibly, tied to the scroll); one big numeral as the visual lead; a dark product-stage band.
- **Not transferred:** pinned scroll (the owner wants this section tight and the gather to finish mid-screen); product renders and video; Apple's typography and identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous best (V1, the default)
| | V1 · the constellation (default) | V2 · the rating, filled |
|---|---|---|
| **Ground** | Paper | A night-sky ink band |
| **What the stars form** | The digits "4.8" in the display face | Five stars filled to exactly 4.8 of 5 |
| **The numbers** | A caption under the figure | A large numeral and a count that run with the stars |
| **Behaviour** | Scroll gather, pointer scatter, tap scatter, "Scatter them" | The same, as the owner asked |
| **Where V1 still wins** | The digits are the bigger, bolder shape; the section stays in the paper rhythm | V2's stars are smaller, especially on phones |

**My call:** V2 is a genuine challenger. It reads as a rating at a glance and keeps every part of the owner's star behaviour. V1 is the bolder typographic moment. The defaults are not changed; the owner picks.

## Evidence (`qa/new/reviews/`)
- `v2-1440-gather-with-scroll.jpg`: the starfield gathering as the band rises (counters 0.2/16, then 4.1/290, then 4.8/343).
- `v2-1440-formed-scatter-reassembled.jpg`: formed, then a pointer pass scattering the stars, then reassembled on their own.
- `v2-390-gather-tap-reassembled.jpg`: the phone, gathering, a tap scatter, and reassembled.
- `v2-768.jpg`: the tablet.
- `v2-single-file.jpg`: V2 picked through the header switch inside the delivered single HTML file at 1440 and 390 (4.8 and 343 formed).

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
