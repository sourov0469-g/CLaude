# GATE-QA-1 · Deep visual QA, round 1 of at least 5

**Brief:** `ELBAZ-QA-FINALIZE-BRIEF.md` (owner, 2026-11-03). Three different passes over the whole site (interaction, motion, composition), an issue list with evidence, fixes, then all three passes run again on the fixed build. No sub-agents, no background tasks: every pass ran in this thread, in the foreground.

**Muse ruling recorded (2026-11-03):** the drawn stud seam stays as the site's sole before/after presentation. It is part of the liked build. The lock "no before/after slider anywhere" means no additional slider anywhere else. Nothing was changed for it.

## Structure minimums (checked in round 1, as ordered)
| page | sections | brief | result |
|---|---|---|---|
| Home | 10 (hero, proof, services, before/after, process, financing, projects, reviews, towns, consult) | 9 to 10 | meets |
| Kitchens | 5 | 5 to 7 | meets |
| Bathrooms | 5 | 5 to 7 | meets |
| Renovation | 5 | 5 to 7 | meets |
| Contact | 5 | 3 to 4 is fine | meets (one over the "fine" range; nothing removed, since the brief sets a floor, not a cap) |

No section added: no page falls short.

## The three passes (tools kept in the repo, `remodeling/src/tools/`)
| pass | tool | what it does | coverage |
|---|---|---|---|
| **1 · Interaction** | `qa_interact.js` | Moves the real pointer onto every clickable element, frame by frame (rest, then 0, 80, 160 and 320 ms) | 5 pages × both version sets at 1440: **462** elements hovered; groups over 10 sampled at 8 + 2. Plus a real **Tab walk** of every page at 1440 and 390: 767 focus stops |
| **2 · Motion** | `qa_motion.js` | A steady wheel scroll through every page with each animation frame's duration recorded; overlap checks every 12 steps; a 6-frame strip of every section across its whole travel; the single file's page switch frame by frame | 5 pages × 1440 and 390; **60 section strips**, 1 transition strip |
| **3 · Composition** | `qa_compose.js` | Full-height frames of every section and version, reduced motion (settled), viewed by eye on page sheets | 5 pages × 1440 and 390 × both version sets: **86 section frames**; sheets `qa/finalize/qa1/sheet-*.jpg` |

What each pass measures per element or frame:
- **Interaction:**
  - is the element what the pointer actually hits at its centre?
  - does the companion react, and with the right pose?
  - does the pointer tip sit on the pointer?
  - is there a hover change of its own?
  - does anything else in the section jump?
- **Motion:** stutter (frames over 50 ms, long tasks) and text overlapping text, sampled through the scroll.
- **Composition:**
  - anything cut by the page edge;
  - images distorted or upscaled;
  - one-word last lines in headings;
  - body lines over 85 characters.

## Issues found in round 1, with evidence, and the fix
| # | pass | issue (what a visitor meets) | evidence | fix | verified after |
|---|---|---|---|---|---|
| 1 | composition, interaction | **On phones and tablets the hero's finish picker was never seen.** The house art fades as the reveal plays (`1 − 4 × progress`). On a stacked layout (≤ 900px) scroll drove that from the first pixel, so the art was at opacity 0 by 200px of scroll, before the picker reached the screen (it arrives at about 400px on a 390 phone; never on a 768 tablet). The caption, "Pick a finish" and all six swatches were invisible; a keyboard user could still Tab onto an invisible swatch. | `qa1/hero-390-swatches.jpg` (the empty space under the photo); the opacity table in the run log: 390 `0:0.66 → 200:0.00`, swatches in view only from 400 | `hero.js`: the pinned scroll reveal runs only on the side-by-side layout. Stacked, scroll leaves the house as it is and the **rail under the art** (touch drag or keys) plays the reveal. The choice follows the layout, not the pointer type, so a 768 tablet with a mouse is covered too. A first attempt (keep the picker opaque during a scroll reveal) laid the caption over the room photo and was **rejected** (`qa1/hero-390-rejected-attempt.jpg`). | `qa1/hero-390-after.jpg`: house, photo, caption and six swatches shown; a touch drag on the rail plays the reveal to `--p 1.0`; 0 errors; desktop pin unchanged |
| 2 | interaction (keyboard) | **Contact FAQ: a hidden Tab stop.** A closed answer collapses to 0px, but the phone link inside it stayed in the Tab order, so focus disappeared into a closed panel. | Tab walk: `contact 1440 v1 / 390 v1: contact-faq a.link "(754) 236-0675" → not on screen`; `interact/contact-v1-52.jpg` | `contact-faq.js`: a closed panel is `inert`; opening removes it | Tab walk re-run: **0** invisible focus stops in 767 |
| 3 | composition | **Bathrooms projects at 390: the whole deck was 630px wide on a 390px screen.** The grid's `1fr` column could not shrink below its content's minimum, so the deck, the filters ("Vanities" at x 391 to 479) and the before/after print ran off the right edge. The page never scrolled sideways, because `body` clips overflow, so the device matrix's overflow check was silent. | `qa1/bath-filters-390-before.jpg`, `qa1/bath-work-390-before.jpg` (the print cut at the right edge; the "after" half off-screen) | `bath-work.css`: the grid columns are `minmax(0, 1fr)`; the seam's own grid gets an explicit `minmax(0, 1fr)` column (its implicit `auto` column sized to the 604px print) | `qa1/bath-work-390-after.jpg` (four filters wrap on screen), `qa1/bath-print-390-after.jpg` (before and after both shown, caption whole); composition edge check **0** on every page |
| 4 | composition, motion | **Bathrooms photo fan off-centre.** The cards were centred by a CSS `translate: -50%`, lost when GSAP took over the transform. At 390 the top card ran from x 195 to 400 (past the edge); at 1440 it landed centred only by chance. | `qa1/bath-stack-390-before.jpg`, `bath-stack-1440-before.jpg` | `bath-work.js`: centred in GSAP's own terms (`xPercent: -50`) | `bath-stack-*-after.jpg`: top card centre = stack centre at 1440 and 390, at rest and after Next and Previous |
| 5 | composition | **Consult privacy note too long a line:** 106 to 118 characters a line at 1440 | compose log `consult p.c-note about 118 characters a line` | `.c-note { max-width: 62ch }` | measure check **0** |

## Checked and judged not to be issues (recorded so they are not mistaken for misses)
- **Motion overlaps on Home and Renovation Services:** the receding sheet's text sits under the next sheet, and the covering sheet is opaque (strip `qa1/motion/home-1440-services.jpg`).
- **Motion overlaps on the Bathrooms build:** the stage words crossfade (strip `bathrooms-1440-bath-build.jpg`: stages 01 to 06 read cleanly).
- **Motion overlaps on the Contact FAQ:** the closed answers' text boxes, clipped to 0px, are a detector limit and will be fixed in the detector for round 2.
- **Interaction "moved on hover":**
  - the Bathrooms hero marks zoom the drawing to the mark (the designed lens);
  - the Renovation V2 panels widen on hover (the designed accordion);
  - the Projects V1 rows drift continuously (ambient, with a Pause control).
- **"Dead":** the Contact V2 answer panel and the Projects V2 binder body are focusable reading regions, not controls; their photos and buttons all react.
- **Hero headline "Permitted / correctly.":** a deliberate stacked headline, not a stray widow.
- **The dimension lines over the Kitchens hero photo:** a designed annotation (`kitchen-hero-line-1440.jpg`).
- **The page switch:** Home fades with the logo mark, a clean paper frame, then Kitchens plays in (`motion/transition-1440.jpg`). No flash, no jump.

## Remaining (honest)
- **The before/after photos are upscaled 1.35×** at 1440: the 388px originals shown at 524px. They are the firm's four genuine pairs at the size it publishes them. By eye they are slightly soft but clean (`qa1/ba-1440-upscale.jpg`). Source-limited; no larger source exists (the blocker recorded since Phase 3).
- **Open with Muse, unchanged:** the faint giant hero letters cut at the frame's bottom edge (the "hero letters' presence vs AA safety" call).

## Passes re-run on the fixed build (`qa/finalize/qa1r/`)
| pass | result |
|---|---|
| Interaction | Kitchens, Renovation V1 and Contact V1: 0 issues. Every remaining flag is a designed behaviour listed above. Companion states seen: link, phone, cta, button, image, drag, type. 0 page errors. |
| Tab walk | 767 stops, **0** invisible |
| Motion | every page at both widths: p50 16.7 ms, p95 16.7 to 16.8 ms; at most 1 frame over 50 ms on any page; the same designed overlaps only |
| Composition | **0** edge cuts and **0** long lines on every page at both widths; remaining: the stacked headline (by design) and the source-limited before/after photos |
| Regression | all five pages and the single file (3.65 MB): 0 console errors, 0 broken images; navigation, deep link and mail hand-off pass |

## Scorecard (critical self-rating; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | Phones now show the hero as built: house, picker, rail. The Bathrooms projects section fits a phone, with the before/after print whole and the fan centred. | Round 1 judged composition from settled frames; the pinned sections are better judged in the motion strips, and the faint hero letters stay with Muse. |
| **Usability** | **8** | The hero picker is usable on every phone and tablet; 0 invisible focus stops; nothing cut by the page edge; the companion reacts on every control. | Pointer and touch are driven by script; a real-device pass is not possible here. |
| **Creativity** | **6** | The hero's reveal on a stacked layout is now an act the visitor takes (the rail) rather than something that happens before they arrive. | A QA round; it adds no new moment by design. |
| **Content** | **9** | No copy changed; every lock untouched. | |

## Evidence
`qa/finalize/qa1/` (round 1) and `qa/finalize/qa1r/` (the re-run):
- `interact/` frame strips and per-page JSON;
- `motion/` six-frame section strips, the transition strip and JSON;
- `compose/` section frames and JSON;
- `sheet-*.jpg` page sheets;
- the before and after pairs named above.

Screenshots are JPEG (quality 82) to keep the repo light.
