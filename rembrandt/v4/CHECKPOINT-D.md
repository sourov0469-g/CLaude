# CHECKPOINT-D: Rembrandt Roofing "In Good Light", Run D

2026-10-29. Run D per PLAN-FINAL §10: the section switcher, every V2/V3 version as a template, and storm mode (§3.12, carried over from Run C). Gate: every `?v=` combination renders, the page is refreshed after a switch, nothing jumps.
**Status: done. The Run D gate passes 120/120 on the final build** (`build/reports/dgate.json`). No-jump worst case is 0.0 px at 1440 and at 375. axe-core: 0 violations. html-validate: 0 errors. Next chunk: Run E part 1 (e1).

## Where Run D stood when this run began

The earlier Run D session froze twice (08:27 and 11:21 Dhaka) in its verification phase. The work itself was on disk and in this repo:
- the switcher (`site/src/versions/index.js`): 1|2|3 pills, `?v=` URL state, keys 1/2/3/H and ←/→, `?clean=1`, `?showcase=1`;
- all 32 alternates (`src/versions/<section>.{html,css,js}`) and storm mode (`storm-mode.js`, the compact S2 and the "next hour" panel);
- the built `site/versions.html`, `css/versions.css` and `js/versions.js`.

Not in the repo: the `build/` folder (build script, test scripts, reports), the graded photographs and the fonts (about 17 MB of variants).

## What this run did

### 1. Rebuilt the build pipeline (`v4/build/`)

- `recover-generated.mjs` aligned `src/index.html` and `src/versions/*.html` against the shipped HTML and cut the 11 generated fragments back out into `build/generated/`: rings, plies, seal, town lists, credits, receipt, JSON-LD, core drawing and directory.
- `build.mjs` reproduces the original pipeline:
  - critical CSS split and inlined, with asset URLs rebased;
  - the site's light CSS minifier;
  - the HTML pass (comments out, indentation stripped, placeholders filled);
  - esbuild for `app.js` (classic), `lamp.js` (module) and the `versions/` bundle;
  - budget gates and a gzip size report.
- **Proof:** before any change, `node build.mjs --check` reproduced all 7 shipped outputs byte for byte. The build is atomic: a failing step writes nothing.
- `serve.mjs` serves `site/` gzipped, like the original. For any missing photo it returns a labelled SVG stand-in at the photo's real proportions, taken from the `<img>` width and height and the width in the filename. Layout, image decode and no-jump checks therefore behave as they would with the real files.
- esbuild is not vendored: set `ESBUILD=/path/to/esbuild`, or run `npm i esbuild` in `build/`.

### 2. The Run D gate (`v4/build/dgate.mjs`, report in `build/reports/dgate.json`)

| Group | What it proves |
|---|---|
| render | Each of the 32 alternates, alone via `?v=`, at 1440×900 and 375×667:<br>• applied, pill pressed, URL kept<br>• no page errors and no broken images<br>• no text clipped past the viewport after scrolling through the section |
| jump | Pill switches to 2, then 3, then back to 1, for every section, with the section a quarter of the way down the screen and again half-way through it: the section top stays within 2 px (worst measured 0.0 px).<br>Key `2` switches the section on the 40% line; keys are ignored while typing. |
| refresh | After height-changing switches upstream (S2→3, S3→2, S4→2, S5→3), the S6 sticky stage shows the same step at the same relative scroll position as on a fresh load. |
| combo | all-2, all-3 and 6 seeded mixes, at both widths:<br>• applied and URL exact<br>• whole page scrolled<br>• every section present, in order, with no overlaps |
| storm | • `?storm=1` re-composes the page: compact S2, S13 V3, the "next hour" panel after the hero<br>• ticks persist for the session<br>• "Show the whole story" exits and restores the versions chosen before<br>• the hero chip enters without moving the hero<br>• entering deep in the page keeps the reader's view (new)<br>• `?nws=test` arms storm mode |
| ui | • templates are not fetched until the first switch, then fetched once<br>• H toggles the pills; tooltips name each version<br>• `?clean=1`: no pills, `?v` applied, presenter keys work<br>• `?showcase=1` switches and lands on the section<br>• malformed `?v` entries are ignored |
| calm | all-2 and all-3 under reduced motion at both widths: no hidden text, no stage taller than 4.5 viewports. |
| regress | Checks for each defect found in this run's visual review (list below). |
| nojs | No pills, every default section present, the estimate is a plain form. |

Also run on the final build:
- **axe-core 4.10:** 0 violations for all-2, all-3 and storm mode, at both widths, after a full scroll.
- **html-validate (standard):** 0 errors on `index.html` and on every template in `versions.html`. The template file was validated wrapped in a document, and a seeded fault confirmed that template contents really are checked.

### 3. Defects found and fixed

**Switcher and storm mode (found by the gate)**
1. **Colour studio (S4 V3), phones:** each swatch group was a `<fieldset>`. Its default `min-inline-size: min-content` stretched it to 780 px on a 375 px screen, so the swatch row never scrolled and half the colours could not be reached (`main` clips the overflow). Fixed with `min-width: 0`.
2. **Malformed `?v`:** an entry like `towns:2:3` was accepted as `towns:2`. Entries must now have exactly two parts.
3. **Cached NWS warning:** when the banner was already showing before the versions bundle loaded on idle, storm mode never armed, because the MutationObserver saw no change. The banner state is now checked at start-up.
4. **Storm mode moved the reader:** it swaps S2 and S13 with `keep: false`, so entering it while reading below S2 (from the banner, or a restored scroll position) threw the page up by the height S2 lost. It now holds whatever is on the 40% line in place.
5. **Showcase jump overshot:** smooth `scrollIntoView` landed about 900 px inside the target. The `content-visibility: auto` sections in between render a few frames later at their real height (S5 is 1,973 px against its 2,200 px placeholder), and scroll anchoring does not compensate. A new `settleTo()` helper in `registry.js` scrolls instantly and corrects until the position holds.

**Visual review (every alternate at 1440 and 375, plus calm, storm mode and the open S0 V3 sheet)**

6. **S0 V2 rail numerals piled up:** the numeral swap always animated the first numeral, which was removed after the first chapter change. Every later change left the previous numeral in place (a garbled "03"). The rail now tracks the current numeral.
7. **S0 V2 numbering:** the hero showed "02 of 16" because the header was counted as a chapter. Chapters now count from the hero: 01 to 15.
8. **S0 V2 duplicate phone:** the floating pill's phone link is hidden while the rail, which carries the phone, is on. The pill keeps its "Free estimate".
9. **S1 V3 unlit headline:** the lamp rested above the headline, so until the pointer moved the H1 fill was 30% plaster on near-black (2.33:1, under the 3:1 floor for large text; the 55% outline kept the shapes readable). The lamp now rests on the second word, and returns there when the touch idle sweep ends.
10. **S2 V2 oval sun:** the sun was stretched into an oval by the arc's `preserveAspectRatio="none"`. It is now a round HTML dot moved with a transform, re-placed on resize.
11. **S3 V3 "Ask the roof", list:** the 4 + 1 photo card grid left an orphan, and a card grid is the default container §1.4 refuses. It is now a numbered inspection list: thumbnail, question, and "Not that I can see" with a 44 px target.
12. **S3 V3 "Ask the roof", diagram:** the front-elevation house with a door was close to the clip-art house §1.4 bans. It is now a labelled roof cross-section in the S4 drawing language (shingle band with course ticks, tab edges, gutter profiles, attic, ceiling), and each "yes" lights its part.
13. **S4 V2 lens:** the lens overhung the drawing and covered the end of the heading. The drawing now has clearance.
14. **S6 V3 clock:** it showed "4:60 pm" (minutes were rounded separately from hours; the same formatter feeds the S6 V2 time-lapse). Minutes are now rounded first.
15. **S6 V3 last step:** "5:00 pm" never lit "Walkthrough with you", because the eased value stops just short of 1020. One rounded minute now drives the hands, the label and the step.
16. **S6 V3 live region:** the region announced the scrolling time continuously. It now covers only the step text.
17. **S6 V3 schedule:** the invented schedule is now labelled "A typical day, set out for illustration…".
18. **S7 V3 ruler, desktop:** the 50-year ruler was 1,820 px wide, so "Material coverage ends" was off-screen behind an unannounced scroller. On desktop the year step now fits the measure, with no tab stop. Phones keep 34 px a year and the native scroller. The scroller gets `role="region"` for its label.
19. **S7 V3 legend:** the legend wrapped under the year. It now has a two-column hanging layout.
20. **S8 V2 empty table:** the table opened empty. The first print is now down when it arrives.
21. **S11 V3 names at corners:** names piled up at the roofline's sharp corners. The drawn line keeps its ridges; the names ride a rounded copy of it.
22. **S11 V3 phone roofline:** the phone roofline is now the two slopes the plan specifies. It had four, with a valley where the letters crowded.
23. **Storm mode, compact S2:** V1's absolutely positioned storm label leaked into the compact S2 and printed over its heading. Reset to static.
24. **Phone pills:** the S2 pill sat on V3's H1. It now sits at the section top, like the others.
25. **Copy, Rachel's pronouns:** the copy used "she/her" for Rachel, including the V1 default in S10. The pack never states Rachel's pronouns, so the copy now uses the name. Wade's and Bunk's pronouns come from the firm's own text ("started alongside his dad") and are unchanged.

## Budgets after Run D

| | Size | Notes |
|---|---|---|
| `index.html` | 19.0 KB gzip | unchanged apart from the S10 copy edit |
| Critical CSS | 13.6 KB | budget 14 KB |
| `app.js` | 16.4 KB gzip | |
| `lamp.js` | 2.3 KB gzip | |
| `versions.js` | 19.0 KB gzip | was 18.5 |
| `css/versions.css` | 10.0 KB gzip | was 9.9 |
| `versions.html` | 19.1 KB gzip | was 18.4; fetched only on the first switch |

**Flag for Run F:** `versions.js` and `versions.css` load on idle after the page is live (with `?clean=1` too). Counted with `app.js`, the JS comes to about 35.4 KB against the 35 KB "before interaction" budget.
- This is the portfolio presentation layer; a production build for the firm would ship only the chosen versions.
- Decide in Run F whether to count it, or to defer the bundle until a pill, a `?v=` or `?storm=1` asks for it.

## A4: inventions in the alternates (for owner review, §11)

Already labelled on the page:
- the S5 V2 sample estimate ("Sample, for illustration": Centerville, 26 + 5 squares);
- the S6 V3 install-day times (now labelled);
- the S4 V3 colour names (Owens Corning Duration, James Hardie ColorPlus) with approximate hex values ("Colors on screen are approximate");
- the S1 V2 inspection marks ("illustrative");
- the S2 V3 and S3 V2/V3 stock photos (labelled stock).

Unlabelled drafts awaiting owner approval:
- the S12 V3 office answers, signed "Answered by the Rembrandt office" like the V1 FAQ (plan: owner-written or approved only);
- the S12 V2 adjuster's checklist (§11 Q15);
- the storm-mode "next hour" list (§11 Q21);
- the S3 V3 self-check result wording;
- the S11 V2 "what that means for roofs here" lines.

Sourced public facts:
- the S10 V2 storm dates (NOAA Storm Events / NWS, "We don't claim work on any named storm");
- the town facts (Census, from Run A).

## Handoff to Runs E and F

**In-page anchors overshoot.** Measured at 1440 on a cold page:
- header nav: `#reviews` lands at −248 px and `#faq` at −71 px, against the 80 px scroll padding;
- the S0 V3 sheet links share the cause.

The cause is the `content-visibility: auto` placeholders above the target (`contain-intrinsic-size` estimates of 1000 px to 2200 px, against real heights that differ by width). Options for Run F:
- route hash links through `settleTo()` (exported from `versions/registry.js`);
- or tune the intrinsic sizes per breakpoint.

Not fixed here: it is V1 code, and Run F owns the link and anchor audit.

**Owed to a run with real photos.** Stand-ins cannot judge:
- the slit reveal (S3 V2);
- the ink circles' placement on ba2 (S1 V2);
- the S8 prints and the light line.

**Footer switch at page end.** Switching the footer while scrolled to the very end can't keep its top: the page gets shorter and the browser clamps. The gate reports this as a clamp, not a jump.

**Unchanged from BUILD-NOTE.** Mobile LCP, long tasks at 4× CPU, INP, real-device checks, the A1 standalone homepage, and production items (form endpoint, licences, logo).

## Files touched

`site/src/versions/`:
- `core.css`
- `registry.js`, `index.js`
- `header.{js,html,css}`, `hero.js`
- `storm.{js,html,css}`, `storm-mode.{js,css}`
- `inspect.{html,css}`, `layers.css`
- `install.{js,html,css}`, `signature.{js,html,css}`
- `work.js`, `people.html`, `towns.{js,html}`

Also `site/src/index.html` (one copy line), and the rebuilt outputs `site/index.html`, `site/versions.html`, `site/css/versions.css` and `site/js/versions.js`.

New in `v4/build/`: `build.mjs`, `recover-generated.mjs`, `serve.mjs`, `dgate.mjs`, `generated/`, `reports/dgate.json`.
