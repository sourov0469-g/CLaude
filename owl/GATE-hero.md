# GATE · hero (proof section 1 of 3): two versions, built one at a time

**Where it lives:** `owl/site/owl-roofing.html`, the single file. Sources are in `owl/site/src/sections/hero/`.
- Switch versions with `?v=hero:1|2` or the version panel (Shift+V). The choice is remembered.
- **Default: V1.**

**Reference studied first:** Scout Motors.
- **Frames:** `refs/scout/f00-f08`.
- **Code digest:** components `Sequence`, `SequenceKey` and `Viewfinder`; 4 sticky, 14 fixed and 3 video elements;
  18 clip-paths.
- **Mechanism that transfers:** one continuous piece of film carries 2-3 one-line headlines. One image and one line per
  beat. The headline is set at photo scale.
- **What never transfers:** the vehicle, orange, the RESERVE bar, Scout's type, the archive collage.

**Skills applied:**
- ⟦S0489⟧: the roof draws itself once, then rests; the logo blinks once.
- ⟦S0407⟧: draw-on through `pathLength="1"`; a static final state under reduced motion.
- ⟦S0195⟧: transform and opacity only; tokens for every duration.
- ⟦S1326⟧: the scroll-scrubbed sequence (a pinned stage with normalised progress; frames rendered as images).
- ⟦S0660⟧: one accent at most twice per screen (the Call button, the line).
- ⟦S1452⟧ and ⟦S1454⟧: Call is the first thing on the page.
- ⟦S0659⟧: no eyebrow label, no 3-card row, no gradient text.

## V1 · The house window (light)
**What it is:** Owl's footage plays inside a drawn house.
- **The house:** a gable roof whose courses lay themselves eave to ridge, a chimney behind the roof, walls framing the
  video, and a ground line.
- **The line:** the page's sweep line leaves from the ground line, runs through the hero's clear band, and exits in the
  left margin toward the beats.
- **Copy:**
  - H1: Owl's own promise, "We actually answer the phone."
  - Call and Text.
  - Three chips of only what Owl states.
- **Background:** B1 Lawn light, with no decorative sweep; the page's real line takes its place.

**Media:** Owl's video re-encoded from 9.4 MB to **1.6 MB** (960px; webm plus mp4, faststart).
- **Loading:** poster first (a real frame), `preload="metadata"`.
- **Playback:** only while visible and while V1 is the active version.
- **Control:** a real pause/play button with a live label (WCAG 2.2.2).

## V2 · The sequence (Scout's mechanism, Owl's film)
**What it is:** a pinned 300vh stage with Owl's footage as a **scroll-scrubbed frame sequence**. Frames 1-50 run from
bare rafters to the finished roof at golden hour, cut from the footage's real scene boundaries at 2.8, 6.1 and 8.6s.
- **Framing:** an inset frame keeps the page paper-light around the film.
- **Three beats:**
  1. "We actually answer the phone." (H1)
  2. "We keep your home covered at every stage of the job." (Owl: "keep your home covered at every stage")
  3. "Family-owned, from Shoreview."
- **The scrubber is the sweep line:** dotted ahead, amber behind. A ring at each beat fills amber as it is passed.

**Media:** 50 frames × about 34 KB = **2.1 MB** in total.
- **Loading:** every 4th frame first, so the scrub is complete early, then the rest, in idle time.
- **Missing frames:** a frame that hasn't loaded falls back to the nearest loaded one; the scrub never shows a blank.

## Ratings (scorecard: Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 house window | V2 sequence | Evidence |
|---|---|---|---|
| Design | 7.5 | **8.0** | V1: a closed, drawn house with real footage. Light-dominant; the line leaves it. V2: annex-class presence, with film at headline scale and one line per beat. |
| Usability | 8.0 | 7.5 | (see below) |
| Creativity | 7.5 | 7.5 | V1: the page's line starts at Owl's house. V2: the sweep line as the film's scrubber. |
| Content | 8.5 | 8.5 | Only locked facts and Owl's own phrases; captions state only "Owl's own crew, from Owl's own footage". |
| **Weighted** | **7.75** | **7.85** | |

**Usability:**
- **V1:**
  - Call is in the first viewport at 390, 768 and 1440.
  - A real pause control.
  - Lighter: 1.6 MB.
- **V2:**
  - Call is in the first viewport at every width.
  - A 300vh pin costs scroll distance. It is mitigated: the CTA stays on screen in every beat, and there is no pin
    under reduced motion.

**Vetoes:** none.
- **Text over footage**, measured against the real pixels behind each headline:
  - At 1440px: at least 6.46:1 against the 95th-percentile pixel and 4.28:1 against the brightest.
  - At 390px: at least 8.83:1 and 4.19:1.
  - Large text needs 3:1.
- **JS:** no errors.
- **Overflow:** none at 390, 768 or 1440.
- **CTAs:** all are real tel/sms links.

**Default: V1.** V2 scores slightly higher on its own, but V1 starts the page's one continuous line, the brand mechanism
the whole homepage depends on. V2's line ends inside its frame. V2 becomes eligible as the default once its line hands
off to the beats at the end of the scrub. It stays in the file as the switchable alternate.

## Tests: 27/27 pass (`herotest.mjs`)
- **Version panel and switching:**
  - Shift+V opens the panel.
  - The panel switches V1↔V2.
  - The choice persists across reload.
  - V1's video pauses when its version is hidden.
- **Video:** V1 autoplays only when visible; pause, relabel and resume all work.
- **V1 roof:** draws itself.
- **V2 scrub:** forward and back through 3 beats (frames f001 → f023 → f045 → back), with the text changing per beat.
- **Layout:** for both versions at 390, 768 and 1440: no overflow, Call visible in the first viewport, no JS errors.
- **Reduced motion:**
  - V2: no pin, the finished-roof frame, H1 shown.
  - V1: no autoplay; the roof fully drawn.
- **Exactly one visible h1.**
- **Token lint:** clean on `site.css`, `site.js`, `hero.css` and `hero.js`.

## Defects found and fixed
1. **V1 roof:** it floated (no eave line), and the chimney strokes showed through the roof face. Fixed with an eave line
   and a paper-filled roof face, so the chimney sits behind the roof.
2. **V1 line:** it dropped through the video caption. It now starts left of the caption.
3. **V2 at scroll 0:** the pin sat under the header and pushed the chips off screen (pin bottom at 990px in a 900px
   viewport). The header is now measured into `--header-h`, and every pinned stage sits below it (the beat-stage
   component too).
4. **V2 beat ticks:** they read as the letter "T". Replaced by rings that fill amber when passed.
5. **V2 mobile contrast:** 2.65:1 against the 95th-percentile pixel. The narrow-screen scrim was strengthened;
   re-measured at 8.83:1 or better.

## Remaining (honest)
- **V2's line:** does not yet hand off to the beats (see "Default").
- **The 300vh pin:** not tested on real iOS Safari (Chromium emulation only).
- **Fonts:** load from Google Fonts at runtime. A local subset belongs to the final build pass.
