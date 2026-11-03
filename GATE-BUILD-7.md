# GATE, Build cycle 7: the veto widths (390 and 768), a JS error, and what that sweep found

**Run.** AUSTIN-PROMPT-V2, after Muse accepted GATE-BUILD-6. Citations follow Muse's rule: each tag was checked against the skill's own text in the attached pack, read in this thread (quoted below). Severity follows the S1458 scale: Critical, Major, Minor, Enhancement.

**Deliverable.** `siding/brand-v2/site.html` (1.85 MB, 47 backups).

**Why this cycle.** The brief's scorecard vetoes "broken layout at 390/768" and "any JS error". Every build check so far ran at 1440 and 375 only, and no check scrolled every page to its end while listening for errors. This cycle does both. **S0095** sets the same widths: open the page in a "browser at 1440, 768 and 390 pixels, [and] measure it".

**QA.** New script `siding/brand-v2/build/qa/vp.js`. It covers every page × both versions at 390×844, 768×1024 and 1024×768, walking each page screen by screen and checking at every stop:
- page overflow, and elements past the viewport edge that no ancestor clips;
- clipped text;
- overlapping text boxes;
- tap targets under 24 px (the label counts when it is the target);
- bordered controls whose text touches the border;
- JS errors.

`ax.js` now takes a width (`node ax.js 390`), because the phone header differs from the desktop one. Contact sheets of every screen at 768 are in `siding/brand-v2/shots/build-7-768/`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Correction to earlier gates

GATE-BUILD-2 through GATE-BUILD-6 each reported **zero vetoes**. That was wrong: finding 1 below is a JS error, a scorecard veto, and it has been live since cycle 2 (commit 7c580e5). GATE-BUILD-2 also said the Pause control "stops the two drifting fields (B2 and B4)". Its test only ever watched the footer field (B4). The B2 field never drifted at all: it drew one frame, then threw. Both statements are corrected here. The earlier gates' self-ratings stand as written; this note is the record.

## 2. Findings and fixes

| # | Finding (how found) | Severity (S1458) | Fix | WEB-SKILLS citations (rule → how it is met) |
|---|---|---|---|---|
| 1 | **JS error, "P is not a function", on the closes of Siding, Windows, Roofing and Our work.** In the B2 steel-field code, the colour palette was named `P`, which shadowed the shared pause check `P()`. The first animation frame threw, so the field never drifted. Earlier checks missed it because none scrolled to those closes while listening for errors. Found by `vp.js`; traced by stack to `tick` in the B2 block. | **Critical** (veto: "any JS error") | Palette renamed `PAL`. The drift is slow (0.02 per second), so the field now redraws at most 10 times a second instead of every frame. **Measured:** committed build: 1 error, no drift. Now: 0 errors at all three widths; the field drifts, freezes under Pause, and resumes. Frame gaps while it runs: p50 16.7 ms, p95 16.8 ms, 0 long tasks, at 1440 and at 375 with 4× CPU slowdown. | **S0279** addyosmani/best-practices: "No console errors". **S0399** iart-ai/60fps-animation: "Watch the FPS … stays at 60 — dropped frames mean an expensive property slipped back in." Held at 60 fps with the field running. **S0231**: "reducing main-thread blocking". |
| 2 | **Header call link on phones and tablets: no name, 18 px wide.** Below 900 px the number was hidden with `display:none`, leaving an 18×44 icon link with no accessible name, on every page. `ax.js` at 1440 could not see it. Confirmed on the committed build at 390 px: 1 nameless link. | Major | The number stays in the accessibility tree as 1 px visually hidden text (clip, nowrap), and the link is at least 44×44. **Now:** 44×44, 0 nameless links at 390, 12 of 12 page states clean. | **S0070**: "Use `1px` boxes, not `0` … `white-space: nowrap` … Never `display: none` or `visibility: hidden`, which remove the content from assistive tech entirely"; "Icon-only buttons need a descriptive `aria-label`. Visible label text must appear in the accessible name." **S0586**: "Accessible name on every icon-only control". **S0094**: "Hit areas — 44×44px (WCAG), 40 at minimum." |
| 3 | **Booking-form chips had no inner padding,** in both versions, at every width. The checkbox touched the left border and the label touched the right. Cause: `.fld label{padding:0}` (specificity 0,1,1) overrode `.chip-in` (0,1,0). Found on the 768 contact sheet; `vp.js` now checks for it. | Minor | The field-label rule is now `.fld label:not(.chip-in)`, so chips keep their own padding and type, matching the chips everywhere else. | **S0094**: chips stay 50 px tall with clear hit areas that do not overlap. The padding comes from the spacing ladder, a token rather than a raw value (Phase 2 lock). |
| 4 | **Stacked clipped layers were all exposed to assistive tech.** In Our work 4 V2, all six place plates and all twelve photos were in the tree at once, though only one pair shows (the rest are clipped). A screen reader read six places in a row. The homepage wiper hid inactive plates but not the stacked photos. Found when `vp.js` reported overlapping text that the eye cannot see. | Minor | Every stacked layer except the showing one gets `aria-hidden="true"`, in both the homepage wiper and the Our work driver. The contrast sweep now counts 1,006 text elements instead of 1,021. The difference is these 15 hidden plate lines (5 plates × 3), no longer exposed. | **S1314** no-ai-design-slop flags "Reading order differs from visual order in a confusing way." The tree now holds what the eye sees. |
| 5 | **Hero V2 below 900 px.** The drawing panel ended at 31% from the bottom, sized for a 375×740 phone. At 768×1024 that left a blank band about 120 px tall above the headline. At 375×667 the copy block covered the bottom 9 px of the panel, including its "illustrative drawing" caption. | Minor | The copy block is 177–193 px tall at every phone and tablet size (measured at six sizes), so the panel now ends 200 px above the stage bottom. **Now:** a 7–24 px gap at every size, the caption fully visible, the drawing larger at 768. Pinned fit: 0 clipped at 375×740 and 375×667. | **S0073** better-layout: "Breakpoints come from the content, not device presets." The offset comes from the copy block's measured height, not from a device percentage. |
| 6 | **A figure stacked above its own heading.** In Siding 2 V2 (profiles) and Windows 3 V2 (types), the single-column layout below 900 px put the large figure first, so the heading and the tabs that change it came after it. **First fix rejected by me:** CSS `order` to lift the text. S0073 forbids exactly that, because visual order would no longer match source order. | Minor | The source order changed instead: text first, then the figure, in both versions. On desktop the figure now sits right of the text. Two columns are held down to 600 px, where the layout stops fitting, and stack below that in source order. Both previous versions are kept as backups (`siding-2-v2`, `windows-3-v2`). **47 backups in the file.** | **S0073**: "Visual order matches DOM order, so never move content out of source sequence with `order`, `row-reverse` or grid placement"; "Keep the expanded layout until it stops fitting, then collapse." |
| 7 | **Small standalone links.** The About office phone and email links were 23 px tall. | Minor | `min-height:44px` on those links. | **S0070**: "WCAG 2.5.8's Level AA baseline is a 24×24 CSS-pixel target … Aim for 44×44px on touch." |
| 8 | **Wall V1 on tablets.** The drawing was capped at 34% of viewport height, a limit set when the section was pinned on phones. It has been scroll-linked since cycle 4. | Enhancement | From 601 to 900 px the drawing may take 54% of viewport height, and its four layer labels show. | **S0073**: hold structure until it breaks. The cap belonged to a constraint that no longer exists. |
| 9 | **Map Reset button** sat on the browser's default 6 px padding. | Enhancement | Padded from the ladder (8 px). | Spacing ladder (Phase 2 lock). |

**Checker artefacts, not defects.** All are recorded so the sweep can be trusted:
- clip-path layers read as overlapping text;
- closed `<details>` content was reported as overlapping;
- a field's separate label was measured instead of the field;
- the 1 px visually hidden number was reported as clipped text.

`vp.js` now handles each case.

## 3. Measured, after the fixes

| Check | Result |
|---|---|
| Viewport sweep (`vp.js`), 390 / 768 / 1024 | 36 page states plus error logs: **0 findings, 0 JS errors.** |
| Accessibility tree (`ax.js`), 1440 and 390 | 12 of 12 page states clean at each width: h1 = 1, 0 heading skips, 0 nameless controls. |
| B2 field | Drifts; frozen under Pause; 60 fps (p95 16.8 ms) with 0 long tasks, at 4× CPU slowdown too. |
| Rendered contrast (`contrast.js`) | 1,006 text elements and 574 focus rings: 0 failures. |
| Keyboard (`kb.js`) | 537 stops: 0 without a ring, 0 hidden, 0 traps. |
| Performance (`perf.js`) | 1440: FCP 68 ms, LCP 124 ms, CLS 0.001, total blocking time 0. 375 at 4× CPU, three runs: total blocking time 56 / 65 / 75 ms (cycle 5 measured a median of 178). Nothing in this cycle should lower load-time blocking, and the container has restarted since, so I do not claim this as an improvement. |
| Regression | Audit 0 problems; duplicate ids 0; barred terms 0; reduced motion and deep link correct; pinned fit 0 clipped at 375×740 and 375×667; Pause stops and resumes; route change stops ambient motion; cursor companion tracks; route announcement and focus correct; CLS 0.001. |

## 4. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.6 | +0.1: the tablet compositions of hero V2, wall V1, profiles and types now use their space, and the form chips are drawn correctly. |
| Usability (30) | 8.7 | +0.1: the JS error and the nameless phone call link are fixed, and three widths are measured that were never checked before. |
| Creativity (20) | 7.2 | Unchanged. |
| Content (10) | 8.5 | Unchanged. |
| **Weighted** | **7.94** | **PASS** on the fixed file. Every category is at 6 or above. |

**Vetoes: zero on the file as it now stands.** Section 1 records that this was not true of the files behind GATE-BUILD-2 to 6.

## 5. Remaining (outside my control)

1. **Rimowa: 403.**
2. **Waiting on Muse or the firm:**
   - the caption ruling on months;
   - the process-step names and descriptive copy;
   - the real colour list.
3. **A person on a physical phone and tablet, and with a screen reader.** Widths, the accessibility tree and errors are now measured in Chromium. Safari on iOS, real touch and real speech have not been tried.
