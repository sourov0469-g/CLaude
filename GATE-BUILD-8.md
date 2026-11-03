# GATE, Build cycle 8: conformance (tokens, spacing ladder, type scale, loaded weights)

**Run.** AUSTIN-PROMPT-V2, after Muse accepted GATE-BUILD-7. Citations follow Muse's rule: each tag was checked against the skill's own text in the attached pack, read in this thread (quoted below). Severity follows the S1458 scale: Critical, Major, Minor, Enhancement.

**Deliverable.** `siding/brand-v2/site.html` (1.94 MB, 68 backups).

**Why this cycle.** The brief asks for "conformance check outputs (token/raw-value counts)" and lists a token lint among the identity gates. It sets four locks that can only be checked by counting:
- "an off-ladder value is a defect";
- "4–5 sizes in regular use";
- "load every weight the design uses — synthesised weights are a defect";
- token alias chains "never flattened".

No earlier gate ran a token lint on the build, and none counted any of these. This cycle counts them, fixes what the counts show, and keeps the counting scripts.

**QA.** Two new scripts in `siding/brand-v2/build/qa/`:
- `lint.py` (static) covers the CSS and the live markup (backups excluded). It counts:
  - spacing off the ladder;
  - raw colours;
  - raw font sizes and the distinct sizes declared;
  - radius off token;
  - primitives read by components;
  - inline styles with primitives or raw values;
  - raw SVG paint.
- `weights.js` (rendered) checks every visible text element on every page × both versions, at 1440 and 390: family and computed weight against the `@font-face` faces in the file, plus the distinct rendered sizes.

Contact sheets of every screen at 1440 and 390: `siding/brand-v2/shots/build-8-1440/`, `build-8-390/`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Counts: before → after

| Lock | Before (committed cycle 7) | After |
|---|---|---|
| Spacing off the ladder (padding, margin, gap) | 26 | **0** |
| Raw colours in component CSS | 48 (`#fff` ×45, raw shadow rgba ×3) | **0** |
| Raw font sizes in component CSS | 67 | **0** |
| Distinct font sizes declared | 26 | **11** (8 role tokens, of which label and small share one value, plus 3 numeral tokens) |
| Rendered sizes in regular use | not measured | **5**: body ×486, small ×320, lead ×83, h2 ×61, h3 ×36. The rest are one h1 per page and 12 data numerals. |
| Synthesised weights (rendered) | **20** (Inter 900 on `<b>`) | **0** |
| Primitives read directly by component CSS | 76 | **0** |
| Interface colour hard-coded in markup (inline styles, SVG paint) | 39 primitive styles, 15 raw styles, 211 raw paints | **0 / 0 / 0** |

**Exempt by rule, and counted.**
- **SVG drawing text (7 selectors):** its sizes are drawing units that scale with the viewBox.
- **The review switch:** tooling, hidden by `?clean`.
- **30 swatch tiles** marked `data-swatch`: they display the steel ramp itself, which is colour as content.
- **Mask paint:** white in a mask means "show"; it is not a colour.

**Open.** 285 primitive paints inside the construction drawings (window, roof, gutter and wall SVGs) remain; see §4.

## 2. Findings and fixes

| # | Finding (how found) | Severity (S1458) | Fix | WEB-SKILLS citations (rule → how it is met) |
|---|---|---|---|---|
| 1 | **Synthesised bold.** `<b>` inside 600- or 700-weight text computed to 900, which is not loaded, so Chromium faked it. This hit the visualiser step numbers and the hero counter (20 elements). Found by `weights.js`. | Minor (a brief lock) | `b,strong{font-weight:700}` (700 is loaded in both faces). Form controls now inherit the page face instead of the browser's 13.33 px system font, which had reached the visually hidden labels. **0 synthesised.** | **S0074** better-typography: "`font-weight` value with no matching weight in the loaded `@font-face` files → Load that face or use a weight the family ships." **S0464**: "Match weights and styles with real cuts via `@font-face`." |
| 2 | **26 type sizes declared,** 67 of them hand-set in px, against the brief's "4–5 sizes in regular use". Found by `lint.py`. | Minor | Each raw size mapped onto a role token:<br>• captions and meta 12–15 px → small;<br>• 16–18 px and all controls and error text → body;<br>• 19–20 px → lead;<br>• 22–24 px → h3;<br>• the two 1.75rem phone headings → h2.<br>The four hand-written numeral clamps became three tokens at the source (numeral-xl, numeral-l, numeral-phone). The phone number keeps its own size because 14 characters cannot share the record count's size at 375 px. **Now:** 11 declared, 5 in regular use. Some text moved by 1–4 px. Captions that were 11–12 px on phones are now 13.4 px. | **S0007** ui-ux-pro-max: "`font-scale` - Consistent type scale (e.g. 12 14 16 18 24 32)". The brief: roles on a modular scale, "4–5 sizes in regular use". |
| 3 | **26 spacing values off the Carbon ladder** (6, 10, 22, 42 px and a 1.5 px offset). | Minor | Each moved to the nearest ladder token. The seam line's centring offset is now `calc(var(--course-line-weight) / -2)`, derived from the token it centres. | The brief's lock: "Every padding, margin and gap … comes from this ladder; an off-ladder value is a defect." **S0006** impeccable flags "Hard-coded colors: Colors not using design tokens" under the same theming check. |
| 4 | **Colour skipped the semantic tier.** 48 raw colours and 76 primitive references in component CSS, plus interface colours hard-coded in markup and in the two canvas fields. | Minor | 27 semantic roles added at the token source (`phase2/tokens.py`): surface and error ink on dark, on-dark text and borders, selected states, drawing inks, the course pattern, and three shadow tokens built from neutral-13 with `color-mix`. **Each role points at the exact primitive the rule already used.** Proof: a computed-colour diff of all 62,952 elements × 12 page states against the committed build. Every difference is the same colour re-serialised (`rgba(19,22,25,.28)` → `color(srgb 0.0745 0.0863 0.098 / .28)`; 0.0745 = 19/255). No rendered colour changed. Contrast pairs file: 32 pairs, 0 fail; 4 pairs are new. | **S0071** better-colors: "Primitives name a value … and are never applied in a component. Semantic tokens name a job …, point at a primitive and are the only tier components reference." **S0007** lists "Raw hex in components" as the anti-pattern beside "Semantic color tokens". |
| 5 | **Hero V2 drawing overlapped its copy by 5 px on phones** after the heading moved to the h2 token: the cycle-7 fixed offset of 200 px no longer matched. | Minor | A ResizeObserver writes the copy block's real height to `--h2-copy-h`. The panel ends 4 px above it at every size and font. Without JS it falls back to 212 px, which also clears. **Measured:** a 4 px gap at six sizes from 375×667 to 900×1100. | **S0073** better-layout: "Breakpoints come from the content, not device presets." The offset now comes from the content's measured height. |
| 6 | **Before/after card at 1440 wrapped two place names** onto two lines ("Anderson Mill, / Austin"). The committed build has the same 52/59 px row heights, so this predates the cycle; found on the 1440 contact sheet. | Minor | Card widened from 300 to 360 px. All six rows sit on one line at 52 px. | **S0073**: "Keep the expanded layout until it stops fitting." The card was narrower than its longest row. |

## 3. Measured, after the fixes

| Check | Result |
|---|---|
| `lint.py` | Every count in §1 at 0 except the open drawing paints. |
| `weights.js` | Loaded faces: Montserrat 700/800, Inter 400/600/700. In use: exactly those five. Synthesised: none. |
| Colour diff against the committed build | 0 rendered colour changes. 2,400 elements differ only in serialisation (same values). |
| Viewport sweep (`vp.js`), 390 / 768 / 1024 | 0 findings, 0 JS errors. |
| Accessibility tree (`ax.js`), 1440 and 390 | 12 of 12 clean at each width. |
| Contrast / keyboard | 1,006 text elements and 574 rings, 0 failures / 537 stops, 0 traps. |
| Pinned fit | 0 clipped at 375×740 and 375×667. |
| B2 field | Drifts, pauses, 0 errors (the canvases now read role tokens). |
| Performance, 375 at 4× CPU | Total blocking time 73 / 88 / 99 ms (median 88, against 65 last cycle). The likely cause is 21 new backups adding about 86 KB to parse. Still under 200 ms. CLS 0. |
| Regression | Audit 0 problems; duplicate ids 0; barred terms 0; reduced motion and deep link correct; Pause, route stop, cursor and live region correct; CLS 0.001. |

## 4. Open, and one risk I cannot test here

1. **285 primitive paints inside the construction drawings.** Mapping them by value onto role names would mislabel parts: steel-9 is a window frame in one drawing and sheathing in another. Renaming them generically would only re-label primitives. They need per-drawing component tokens: the next step.
2. **`var()` in SVG presentation attributes.** The drawings and the course line put `var()` in `fill` / `stroke` attributes. Chromium resolves it (tested). A W3C SVG issue (Nov 2025) reports that Firefox and WebKit accept `var()` in presentation attributes, while the spec's parse path may not, and Chromium rejects it for length attributes. Only Chromium is installed here. Moving the paint into `style` everywhere is not a safe blanket fix, because inline style would override the CSS hover and state rules the drawings use. **Needs a check in Safari and Firefox.**

## 5. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.7 | +0.1: one type scale, real bold weights, spacing on the ladder, and the tablet and desktop rows that wrapped now hold. |
| Usability (30) | 8.7 | Unchanged. Phone captions grew from 11–12 px to 13.4 px; mobile blocking rose about 23 ms. |
| Creativity (20) | 7.2 | Unchanged. |
| Content (10) | 8.5 | Unchanged. |
| **Weighted** | **7.98** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 6. Remaining (outside my control)

1. **Rimowa: 403.**
2. **Waiting on Muse or the firm:**
   - the caption ruling on months;
   - the process-step names and descriptive copy;
   - the real colour list.
3. **A person on a physical phone and tablet, in Safari and Firefox, and with a screen reader.** §4 item 2 adds a concrete reason to check Safari and Firefox.

Sources for §4 item 2:
- [W3C public-svg-issues, Nov 2025 (0024)](https://lists.w3.org/Archives/Public/public-svg-issues/2025Nov/0024.html)
- [W3C public-svg-issues, Nov 2025 (0026)](https://lists.w3.org/Archives/Public/public-svg-issues/2025Nov/0026.html)
- [WebKit bug 147932](https://bugs.webkit.org/show_bug.cgi?id=147932)
- [AmeliaBR, Customizable SVG icons with CSS variables](https://codepen.io/AmeliaBR/post/customizable-svg-icons-css-variables)
