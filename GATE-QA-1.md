# GATE-QA-1 · Deep visual QA, round 1 of at least 5

**Governing documents:**
- `ELBAZ-QA-FINALIZE-BRIEF.md` (owner, 2026-11-03): three different passes over the whole site (interaction, motion, composition), an issue list with evidence, fixes, then all three passes run again on the fixed build.
- `ELBAZ-QA-COMPLETION.md` (binding). Where it names a point, it wins. This gate follows it:
  - the real scorecard with WEB-SKILLS tags;
  - the Bathrooms and assembly verdicts folded in (the two sections of the same names below);
  - the full interactive standard, including pins on real phone widths;
  - copy budgets as a check;
  - branding not reopened;
  - one single HTML.

**Process:** no sub-agents and no background tasks. Every pass ran in this thread, in the foreground.

**Muse ruling recorded (2026-11-03):** the drawn stud seam stays as the site's sole before/after presentation. It is part of the liked build. The lock "no before/after slider anywhere" means no additional slider anywhere else. Nothing was changed for it.

**Correction to the first draft of this gate (commit `e378f63`):**
- That draft fixed the phone hero by removing its pin (the rail alone played the reveal). Under completion point 3 ("a trapping pin is a defect to fix, never a reason to remove the pin"), that fix was wrong, and it is replaced here (issue 1).
- That draft also left Process and the Bathroom build as lists on phones. They now pin (issues 6 to 10).
- The scorecard below replaces the draft's self-rating.

## Verdict
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Site, round 1** | 7 | 8 | 6 | 9 | **7.3** | met | **0** | **PASS** (self-assessed; Muse judges) |
| Bathrooms (folded) | 8 | 8 | 7 | 9 | **7.9** | met | 0 | PASS |
| Assembly (folded) | 7 | 8 | 6 | 9 | **7.3** | met | 0 | PASS |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct. Site: 2.8 + 2.4 + 1.2 + 0.9 = 7.3.

## Structure minimums (checked in round 1, as ordered)
| page | sections | brief | result |
|---|---|---|---|
| Home | 10 (hero, proof, services, before/after, process, financing, projects, reviews, towns, consult) | 9 to 10 | meets |
| Kitchens | 5 | at least 5 to 7 | meets |
| Bathrooms | 5 | at least 5 to 7 | meets |
| Renovation | 5 | at least 5 to 7 | meets |
| Contact | 5 | 3 to 4 is fine | meets (the brief sets a floor, not a cap; nothing removed) |

## The three passes, plus the pin and keyboard checks (tools in `remodeling/src/tools/`)
| check | tool | what it does | coverage |
|---|---|---|---|
| **1 · Interaction** | `qa_interact.js` | Moves the real pointer onto every clickable element and records frames at rest, then 0, 80, 160 and 320 ms. Asks five questions per element:<br>• is the element what the pointer hits?<br>• does the companion react with the right pose?<br>• does the tip sit on the pointer?<br>• is there a hover change of its own?<br>• does anything else jump? | 5 pages × both version sets at 1440: **462** elements |
| Keyboard | Tab walk (`tabvis`) | A real Tab through every page; each focused element checked on screen and visible | 1440 and 390: **767** stops |
| **2 · Motion** | `qa_motion.js` | A steady wheel scroll with every animation frame timed; text-over-text sampled every 12 steps; a 6-frame strip of each section across its whole travel; the single file's page switch frame by frame | 5 pages × 1440 and 390: 60 strips plus the transition |
| **3 · Composition** | `qa_compose.js` | Full-height frames of every section and version, settled. Checks edge cuts, distorted or upscaled photos, one-word heading lines, and lines over 85 characters. Plus page sheets viewed by eye. | 5 pages × 1440 and 390 × both sets: **86** frames |
| Pins (completion 3) | `qa_pins.js` (new) | Every pinned ScrollTrigger at **360, 375, 390, 414, 768 and 1440** × both version sets. Phones are emulated as touch devices. It checks four things:<br>• **engage:** the frame holds within 3px;<br>• **play:** progress runs to 1;<br>• **release:** the frame moves on after the end;<br>• **no trap:** the page reaches its end. | 36 pins, 60 page runs |
| Wheel then keys | `qa_endkey.js` (new) | One wheel notch, then PageDown and End: the page must reach its end | 5 pages × 768 and 1440 |
| Copy budgets (completion 4) | `conform.js` copy mode | Hero ≤ 40 words; headlines ≤ 8 words; support ≤ 35 words | every section, default and second versions |

## Issues found in round 1, with evidence, and the fix
All evidence paths are under `qa/finalize/`.

| # | check | issue (what a visitor meets) | evidence | fix | verified after |
|---|---|---|---|---|---|
| 1 | composition, pins | **On phones and tablets the hero's finish picker was never seen.** The house art fades as the reveal plays (`1 − 4 × progress`). Stacked (≤ 900px), scroll drove that from the first pixel: the art was at opacity 0 by 200px of scroll, before the picker reached the screen. The caption and all six swatches were invisible, yet still reachable by Tab. | `qa1/hero-390-swatches.jpg`; opacity log at 390: `0:0.66 → 200:0.00`; swatches in view only from 400 | `hero.js`: stacked layouts (chosen by width, so a 768 tablet with a mouse is covered) **pin with the art centred** (`start: 'center center'`, `end: '+=60%'`). The reveal now plays while the visitor is looking at it, then releases. A Tab onto a swatch during the reveal returns the page to the pin's start, after the browser's own focus scroll, so the picker is whole when focused.<br>Two attempts were rejected:<br>• keep the picker opaque (`qa1/hero-390-rejected-attempt.jpg`);<br>• rail-only, which removed the pin (completion 3). | `qa1/hero-390-after.jpg`; `qa1/hero-{360,390,768}-tab-swatch.jpg`. Pin audit: engage, play to 1 and release at all 6 widths × both sets. |
| 2 | keyboard | **Contact FAQ: a hidden Tab stop.** A closed answer collapses to 0px, but the phone link inside it stayed in the Tab order. | Tab walk: `contact-faq a.link "(754) 236-0675" → not on screen`; `qa1/interact/contact-v1-52.jpg` | `contact-faq.js`: a closed panel is `inert`; opening it removes `inert` | Tab walk: **0** invisible stops in 767 |
| 3 | composition | **Bathrooms projects at 390: the deck was 630px wide on a 390px screen.** A grid `1fr` column cannot shrink below its content. The filters and the before/after print ran off the right edge. `body` clips overflow, so the page never scrolled sideways and the matrix's overflow check stayed silent. | `qa1/bath-filters-390-before.jpg`, `qa1/bath-work-390-before.jpg` | `bath-work.css`: `minmax(0, 1fr)` columns, plus an explicit column for the seam's own grid | `qa1/bath-work-390-after.jpg`, `qa1/bath-print-390-after.jpg`; edge check **0** on every page |
| 4 | composition, motion | **Bathrooms photo fan off-centre.** The CSS `translate: -50%` was lost when GSAP took the transform. At 390 the top card ran past the edge. | `qa1/bath-stack-{390,1440}-before.jpg` | `bath-work.js`: `xPercent: -50` (GSAP's own terms) | `qa1/bath-stack-*-after.jpg`: centred at rest and after Next and Previous |
| 5 | composition | **Consult privacy note** ran 106 to 118 characters a line at 1440 | compose log | `.c-note { max-width: 62ch }` | measure check **0** |
| 6 | pins | **Process (Home) did not pin on phones or at 768.** It fell back to a list, so the drawn story never played where most visitors scroll. | completion 3; list mode in `process.js` (`big` required a fine pointer) | `process.js`: the pin runs whenever motion is allowed and the screen is at least 560px tall. `process.css` (≤ 900px): one column with the drawn window first; smaller numerals, title and copy. The list stays only for reduced motion (S1326 static frame) and very short screens. | `qa1/process-phone-pin.jpg`, `qa1/process-768-pin.jpg`; pin audit ok at all 12 width × version runs |
| 7 | pins | **The Bathroom build did not pin on phones or at 768** (same cause) | `bath-build.js` `big` | same treatment in `bath-build.js` and `bath-build.css` | `qa1/bath-build-phone-pin.jpg`; pin audit ok × 12 |
| 8 | composition (pinned) | **The pinned frame's last line sat under the phone call bar** (64px plus the safe area) | phone pin frames, first attempt | new token `--mbar-h` (`chrome.css`, phones only); both pins pad their bottom by it | the same frames: the rail and copy clear the bar |
| 9 | composition (pinned) | **At 414 the drawn window was cropped:** the world was sized from height alone | 414 pin frame | `size()` in both sections is width-aware: `fw = min(h × ratio, w)`, and the world is centred | 360, 375, 390 and 414 frames whole |
| 10 | motion | **The stage label led the camera:** the label switched about a fifth of a stage before the drawing arrived | label vs camera sampled through the pin | the label switches at `floor(p + .15)` (was `.2`) | **0** mismatches in 49 samples at 390 and 1440 |
| 11 | copy budget | **Kitchens close, second version: an 11-word headline** ("Three things you get first. Three things we will not say.") | copy-budget run, `qa1/conform-copy.json` | "Three things first. *Three we won’t say.*" (7 words; my copy, not a firm line) | `qa1/kitchen-close-v2-{1440,390}.jpg`; budget re-run clean |
| 12 | pins (no trap) | **After a wheel scroll that stopped on a half pixel, the page could not be moved by the keyboard, the scrollbar or a jump.** Lenis 1.3.27 completes when `round(value) === round(target)`. With a target of n + .5 approached from below, the two never match, so Lenis stays "smooth" for good and rewrites the scroll position every frame. Found as a page that would not reach its end: Bathrooms, second versions, 768 and 1440, 2 of 5 loads. It applies to every page with smooth scrolling (fine pointer, motion on). | `qa1/lenis-stall.txt`: target `7308.5`, value `7308.4999…`, position held at 7309 of 14236 for 8 s | `core.js` `lenisTick`: within 0.01px of its target, the value lands on it, so Lenis completes. The vendored library is untouched. | Full pin audit **36/36**, every page end reached at 6 widths × both sets. Bathrooms + Home at 768/1440 repeated 3×: 0 failures. `qa_endkey.js` (wheel to 40.5, then PageDown and End): all 5 pages reach the end at 768 and 1440. |
| 13 | console | **GSAP "target not found" warnings:** 17 on Home, 4 on Kitchens, 4 on Bathrooms, 2 on Contact | stacks traced to the drawn-frame layer selectors (Process, Kitchen and Bath builds, Contact figures) | Each case was traced: a frame without a layer (a frame with no stamp), never a missing animation. `gsap.config({ nullTargetWarn: false })` in `core.js`. | 5 pages × both sets × 390/1440: **0** warnings, **0** errors |

### The QA tools themselves (false positives fixed, so the passes are trusted)
- **`qa_compose`** skipped vector images (the SVG logos were flagged as "upscaled").
- **`qa_interact`:**
  - excludes `inert` content and non-control reading regions;
  - measures position after the pointer has rested 650 ms (the lens zoom had read as a jump).
- **`qa_pins`:** the page-end check waits for three equal readings and records Lenis's state on a failure. That record exposed issue 12.

## Checked and judged not to be issues (recorded so they are not mistaken for misses)
- **Motion overlaps:**
  - **Home and Renovation Services:** the receding sheet's text sits under the next, opaque sheet (`qa1/motion/home-1440-services.jpg`).
  - **Contact FAQ:** the closed answers, clipped to 0px, are a detector limit. The detector is to be made clipping-aware in round 2.
  - **Bathroom build:** the stage words crossfade.
- **Interaction "moved on hover":**
  - the Bathrooms hero marks zoom the drawing (the designed lens, Makhno);
  - the Renovation V2 panels widen (the designed accordion);
  - the Projects V1 rows drift continuously (ambient, with a Pause control; the 11 Home flags).
- **"Dead":** the Contact V2 answer panel and the Projects V2 binder body are reading regions, not controls.
- **Composition:**
  - "Permitted / correctly." is a deliberate stacked headline;
  - the dimension lines over the Kitchens hero photo are an annotation;
  - the page switch is clean (`qa1/motion/transition-1440.jpg`).
- **Copy budget, bath-intro firm line (9 words):** verbatim by Muse ruling 2 (Phase 7). It stays.

## Copy budgets (completion 4)
| check | budget | result |
|---|---|---|
| Hero, authored words (Muse ruling 1) | ≤ 40 | Home 36, Kitchens 31, Bathrooms 23, Renovation 10, Contact 16 |
| Section headlines, default versions | ≤ 8 words | 30 sections: all pass except the bath-intro firm line, 9 words (verbatim by ruling) |
| Support copy, default versions | ≤ 35 words | 30 sections: all pass |
| Second versions | the same | 13 sections; **one violation found and fixed** (issue 11) |

## Pin audit (completion 3), final run on the fixed build (`qa1/pins/pins.json`)
| page · section | 360 | 375 | 390 | 414 | 768 | 1440 | range | drift in pin |
|---|---|---|---|---|---|---|---|---|
| Home · hero | ok / ok | ok / ok | ok / ok | ok / ok | ok / ok | ok / ok | 400 to 630px | 0px |
| Home · Process | ok / ok | ok / ok | ok / ok | ok / ok | ok / ok | ok / ok | 4802 to 7373px | 0px |
| Bathrooms · build | ok / ok | ok / ok | ok / ok | ok / ok | ok / ok | ok / ok | 3602 to 5530px | 0px |
| Every page reaches its end | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | 5 pages × both sets | |

Cells read V1 / V2. "ok" means the pin engages, plays to 1 and releases. Phone pin ranges run about 0.7 to 1.2 viewports per beat, within S1328's 0.7 to 1.8 vh.

## Re-check after the fixes: the surroundings and the whole page (completion 3)
After each fix, the fixed section's neighbours were re-checked. After the last fix (issues 12 and 13 are global, in `core.js`), the whole site was re-checked:

| check | result |
|---|---|
| Pins | 36/36 ok; 60/60 page ends reached |
| Wheel then keys | 10/10 page ends reached |
| Interaction (`qa1r2/`) | All flags are designed behaviours:<br>• Kitchens V1/V2, Renovation V1 and Contact V1: 0;<br>• Bathrooms V1/V2: the 5 lens flags;<br>• Home V1: the 11 ambient drifts;<br>• Renovation V2: the 3 accordion panels;<br>• Contact V2: the answer panel (a reading region).<br>Companion poses seen: link, phone, cta, button, image, drag, type. 0 page errors. |
| Tab walk | 767 stops, **0** invisible |
| Motion, 1440, all 5 pages (after the `core.js` change) | p50 16.7 ms, p95 16.7 to 16.8 ms; at most 1 frame over 50 ms; 0 long tasks; only the designed overlaps |
| Motion, 390 and 768 (Home and Bathrooms), Kitchens 390 | p50 16.7 ms, p95 ≤ 16.8 ms, 0 errors |
| Composition | **0** edge cuts and **0** long lines on every page at both widths |
| Locks (`locks.js` on the delivered file) | **0** fails. The checked locks:<br>• 4.8 / 343 and the licence string;<br>• address, phone and hours;<br>• mail to `Sales@` only, never claimed sent;<br>• exactly 4 before/after pairs (ba-kitchen1, ba-bath2, ba-kitchen4, ba-outdoor);<br>• 104 towns;<br>• 0 network requests beyond the file. |
| Regression | All five pages: 0 console errors. The single file (3.65 MB, 38 images, 0 broken): navigation, back, deep link `#/contact/contact-form`, logo home and the mail hand-off all pass. 0 em dashes. |

## Scorecard: site, round 1 (critical self-assessment; Muse judges)
**Governing reference:** Lusion, for flow.
- **What transfers:** one continuous carrier (the ink line and the hand-off dividers) that leads the eye from section to section, so motion is a path, not a set of effects.
- **This round's flow fixes all serve that path:** the hero now plays where the visitor is (issue 1), the drawn stories play on phones (issues 6 and 7), and a stalled scroll can no longer break the path (issue 12).

**Scoped references, unchanged and still where the annex puts them:**
- **Immersive Garden:** one drawn world with a camera (Process, Bathroom build).
- **Scout Motors:** sequenced evidence (Proof, Reviews).
- **OH Architecture:** live hours and index grammar (footer, Contact).
- **Bruno Simon:** Towns only.
- **The MERSI seam:** before/after.
- **Makhno:** Bathrooms hero marks.
- **Shed:** the Bathrooms room list.

| category | weight | /10 | evidence | WEB-SKILLS tags | why not higher |
|---|---|---|---|---|---|
| **Design** | 40 | **7** | Phones now show the hero as built and the drawn stories as pinned frames that fit the screen: whole at 360 to 414 and clear of the call bar. The Bathrooms projects fit a phone. The fan is centred. Measures hold. | **S0666** (hierarchy, spacing), **S1209 / S1066** (nothing cut at phone widths), **S1421** (one illustration language, now on phones too), **S0628** (audit, polish) | The before/after photos are 1.35× upscaled (source-limited). The faint hero letters stay with Muse. Phone pinned frames are smaller drawings than desktop by necessity. |
| **Usability** | 30 | **8** | 36/36 pins engage, play and release; no trap; the keyboard reaches every page end after a wheel. 0 invisible focus stops in 767. Swatch focus returns the page to the picker. Frames at 16.7 ms. | **S0186** (gsap-scrolltrigger pins), **S1328** (beat length, reverse scroll, four widths, console), **S0657** (a11y, focus), **S1018** (keyboard), **S0924** (nothing focusable hidden), **S0400** (reduced-motion tiers: lists stay for reduced motion) | Pointer and touch are emulated; no real-device pass is possible here. Screen-reader output is not verified. |
| **Creativity** | 20 | **6** | The two drawn worlds now reach phone visitors as the scroll story they are, not a list. The hero's reveal plays in view. | **S1326** (scroll-scrubbed sequence: ordered states, static frame for reduced motion), **S0362 / S0407** (draw, don't fade), **S0063** (review animations) | A QA round adds no new moment, by design. |
| **Content** | 10 | **9** | The one copy change (issue 11) brings a headline within budget. Every lock is intact. Forms only open the visitor's email app and never claim sent. | **S1494** (CTA copy), **S0502** (no misleading sent states), **S0226** (proof beside CTA) | The new 7-word headline is my wording, not the firm's. |

**Vetoes, all checked, 0 found:**
- invented facts: 0 (locks audit);
- placeholder content: 0;
- AA contrast failures: 0. The 3 flags are the known SVG-ground readings, measured at 5.31:1 and 17.54:1;
- broken interaction: 0 (462 hovered, 422 presses in Phase 11, 0 errors);
- a broken or plain cursor: 0 (the companion reacts on every control);
- a pin that traps scrolling: **0, after issue 12**;
- a document-type section with no story: 0.

## Bathrooms: verdict folded into round 1 (completion 2)
The `GATE-bathrooms.md` correction was never sent as a separate message. It is answered here, in full format.

**Defects listed:**
- **Found in earlier phases, all fixed (recorded in `GATE-bathrooms.md`):**
  - marks stacked at the corner;
  - a lingering inline opacity;
  - three paraphrased lines;
  - an empty first bay;
  - wrong print size attributes;
  - week-strip label detachment;
  - the fixtures bay;
  - the dividers;
  - the blank stretch between waterproofing and tile.
- **Found in round 1, all fixed:** issues 3, 4, 7, 8, 9, 10 and 12 above.
- **Remaining:** the one bath before/after pair is shown at up to 1.35× its 388px original (source-limited).

**References:**
- **Immersive Garden** (the build: one shower wall, a camera bay to bay);
- **the MERSI seam** (the bath pair);
- **Makhno** (hero target marks, as the annex words it);
- **Shed** (the giant room list);
- **Lusion** (the boundaries' hand-off dividers carry the flow).

| category | /10 | evidence | WEB-SKILLS tags |
|---|---|---|---|
| Design | **8** | One line language across hero, build, rooms and week strip. The projects fit a phone. The fan is centred. The build frames are whole at 360 to 414. | S1421, S0666, S1422 (closure, proximity), S1066 |
| Usability | **8** | The build pins at all 6 widths × both sets. Marks lock by pointer, focus and Escape. Deck keys ← →. The filter works. 0 hidden focus. | S0186, S1328, S0657, S1018, S0924 |
| Creativity | **7** | A shower wall built bay by bay under the camera. A lens that zooms to the part the firm is careful about. | S1326, S0362 / S0407, S0340 |
| Content | **9** | The firm's lines only; photos only where a title names the room. "4–8 weeks" and "can add weeks" only. | S0226, S1494 |

**Weighted 7.9 · no category under 6 · 0 vetoes · PASS.**

## Assembly: verdict folded into round 1 (completion 2)
`GATE-assembly.md` lacked the scorecard, references and tags, and carried two stale statements. Both are corrected there with a pointer here.

**The two corrections:**
- **File size:** the file is 3.65 MB, not 3.68 MB (fonts for the retired backups were dropped in Phase 10).
- **CSS selectors:** the seven inert selectors were removed in Phase 6.

**Reference:**
- **Lusion** governs the flow across pages too: the logo's bracket closes and opens as the shared element of the page switch.
- **S1276** (view transitions, shared element), applied in-file.

**Defects listed:**
- **Found and fixed:**
  - the backups no longer ship (the assembler refuses them);
  - the dead fonts were dropped;
  - the menu printed reaction codes.
- **Round 1 on the single file:** issues 12 and 13 apply to the frames of the single file too; both are fixed there by the rebuild.
- **Remaining:**
  - the `pre-finalize` tag cannot be pushed (the remote refuses tags);
  - the address shows `#/page` (by design for one file).

| category | /10 | evidence | WEB-SKILLS tags |
|---|---|---|---|
| Design | **7** | The page switch is a clean paper frame with the logo hand-off (`qa1/motion/transition-1440.jpg`) | S1276, S0666 |
| Usability | **8** | Navigation, back and forward, deep links and mail all pass. One visible `main` per page view. 0 console errors. | S1110 (one `main`), S0924, S1018 |
| Creativity | **6** | The logo story's press beat reused as the page hand-off | S1276 |
| Content | **9** | 38 images, 0 broken; locks pass on the delivered file | S0502 |

**Weighted 7.3 · no category under 6 · 0 vetoes · PASS.**

**Format (completion 6):** still one HTML file with all five pages and in-file navigation. No fix this round risked the format.

## Remaining (honest)
- **Before/after photos upscaled 1.35×** at 1440 (388px originals at 524px). They are the firm's four genuine pairs at the size it publishes them; soft but clean (`qa1/ba-1440-upscale.jpg`). Source-limited.
- **Open with Muse, unchanged:** the faint giant hero letters cut at the frame's bottom edge.
- **For round 2:**
  - make the motion overlap detector clipping-aware (closed FAQ answers, opaque covering sheets).

## Evidence
- **`qa/finalize/qa1/`** (round 1):
  - the before and after pairs named above;
  - `pins/pins.json`;
  - `lenis-stall.txt`;
  - `conform-copy.json`, `locks.json`;
  - `interact/`, `motion/` and `compose/` (frames, strips and JSON);
  - the `sheet-*.jpg` page sheets.
- **`qa/finalize/qa1r/` and `qa1r2/`:** the re-runs on the fixed build.

Screenshots are JPEG (quality 82).
