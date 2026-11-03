# GATE: Phase 9 · Every animation tested repeatedly, and the final evidence pack

**Why this phase exists:** after Phase 8 was accepted, two lines of the brief's AUDIT STANDARD had never been run on the finished build:
- **"every animation tested repeatedly"**;
- **"Screenshot every version of every section, desktop + mobile (390px)"**. The existing screenshots were taken per build phase, before Phases 6 to 8 changed the site.

This phase does both on the final build and fixes what they found. Muse judges; this is a self-rating, not a certification. No sub-agents, no background tasks.

**The tools, kept in the repo:**
- `remodeling/src/tools/repeat.js` (the passes);
- `repeat_diff.py` (the comparison);
- `sheet9.py` (the contact sheets).

## Governing reference, and exactly what transfers
**Immersive Garden** (REFERENCE-STUDY: "The camera moves through ONE drawn world instead of swapping slides. Text stays still while the world changes, and each chapter is a camera key." It governs Process and the Bathrooms horizontal build.)

**What transfers, and what this phase repaired:** the world **persists between camera keys**. The repeat-run evidence showed that the Bathrooms build broke this:
- each bay was redrawn from nothing when the camera arrived;
- between waterproofing and tile, the drawing went blank white.

Now:
- each bay arrives as the finished bay before it;
- only the new layer builds;
- one wall gains one layer per key, which is Immersive Garden's "one world, chapters as camera keys".

**Not transferred:** the WebGL plaster-relief world and its loader counter; the site's world stays SVG ink.

## 1 · Repeat-run: method and result
Every page, at 1440 and 390, with each version set (all sections on V1, then every two-version section switched to V2): **20 runs**.

**Each run:**
- scrolls down, up, down, up, down, through every section;
- stops at two anchors per section: its top, and the middle of its pinned travel where it has one;
- waits 1.1 s at each anchor, then captures the viewport.

**The comparisons:**
- **Repeatability:** the second pass down against the third pass down. The same position must show the same state on every visit.
- **Reversibility:** arriving from below against arriving from above. A scrubbed story must show the same state whichever way you come.
- **First section of a page:** load state against return state, because it is only ever reached from below after load.
- **Ambient check:** a second frame 500 ms later on the last pass. An anchor that differs from itself at rest is ambient motion, which is checked by eye rather than scored.

A pixel counts as different when a channel differs by more than 32 (above JPEG noise). An anchor fails above 0.5%.

| result | count |
|---|---|
| anchors compared | **194** (all 5 pages, both widths, both version sets) |
| console errors across 20 runs | **0** |
| **FAIL** (repeat or reverse over 0.5%) | **0** |
| ambient (moving at rest by design, checked by eye) | 8: Contact's drifting town rows (difference confined to the rows band) and Projects V1's two drifting rows. Frames show the same cards further along the loop, nothing broken |
| identical to the pixel | 182 |
| under 0.5% but not zero | 4, each traced (below) |

**The four small differences were traced, not waved through.**

All four differ only on reversal; repeating the same direction gives identical frames. They persist after a 3 s settle, so this is not lag. But every element's computed state is identical from both directions:
- **Process** (0.06%): all 175 SVG elements, by on-screen matrix, opacity, dash offset and fill opacity;
- **Contact FAQ** heading (0.12%): computed transform, opacity and position to 0.01px;
- **Reviews** at 390 (0.01%): too small to isolate further.

The pixel differences peak at 69 of 255, with none above 100. That is anti-aliasing from a different compositing layer, a rasteriser difference, not a state difference.

**Hero reversibility:** all 34 first-section anchors, across five pages × widths × version sets, return pixel-identical to their load state (0.0%).

## 2 · What the evidence pack found, and the fix
Building the contact sheets showed one real defect that repetition could not catch, because it happens identically every time.

- **Defect.** The Bathrooms "How a bath is built" pinned build, at 1440, between stage 03 (waterproofing) and 04 (tile). The drawing went **blank white** for a stretch of scroll (`bath-build-before-1440.jpg`, centre frame).
- **Cause, in two parts:**
  - Every bay redrew all its layers from zero on arrival, so the wall was wiped at each stage.
  - The filled shapes (studs, board, tile, glass) were in the stroke-drawing set. Drawing an SVG reveals only the stroke, so their **fills showed at once**: the white tile fills covered everything before a single tile line was drawn. The file's own header says "strokes first, fills after"; the code did not do that.
- **Fix** (`bath-build.js`):
  - each layer is its own tagged group;
  - bay *i* arrives with layers below *i* already drawn and filled (the finished bay *i−1*);
  - only layer *i* builds: strokes draw, then its fills fade in (`fill-opacity`), then its labels;
  - the studs are present in every bay, behind the board's opaque fill, so stage 02 no longer starts on an empty wall.
- **Measured after:** 17 frames through the pin at 1440 (`bath-build-after-1440.jpg`). The wall is never blank at any frame, and each stage reads as one more layer on the same wall:
  1. studs;
  2. board drawn over the studs, then filled;
  3. membrane;
  4. tile lines over the membrane, then filled;
  5. glass template;
  6. fixtures.

  The phone list's six static drawings are unchanged in look (`bath-build-phone-list.png`). The Bathrooms repeat runs were redone after the fix: 0 failures. The Bathrooms device matrix was redone at 12 sizes: 0 errors, 0 overflow, 0 scroll traps, 0 targets under 24.
- `GATE-bathrooms.md` is amended.

## 3 · The evidence pack
`qa/finalize/phase9/sheet-{home,kitchens,bathrooms,renovation,contact}.jpg`: one contact sheet per page from the **final build**, motion on, after every first-view intro has played.
- **Rows:** every section in page order; a second "mid-story" row where the section has a pinned or long travel.
- **Columns:** V1 at 1440, V2 at 1440, V1 at 390, V2 at 390 (the V2 columns only where a second version exists).
- **Coverage:** 13 sections with two versions and 17 with one (30 in all); 54 rows.

## Mechanisms and their WEB-SKILLS tags
| mechanism | tags | how it is met | files |
|---|---|---|---|
| Strokes first, fills after | **S0362 / S0407** ("dashed or dotted lines and text fade, because the dash trick cannot draw them"; DrawSVG reveals the stroke only) | Filled shapes keep `fill-opacity: 0` until their strokes are drawn | `bath-build.js` |
| One world across camera keys | Immersive Garden; **S1421** (one illustration language) | Each bay inherits the finished bay before it | `bath-build.js` |
| Scrubbed and reversible | **S1326 / S0186** | Measured: 194 anchors, 0 failures, both directions | `repeat.js`, `repeat_diff.py` |
| Ambient motion has its controls | **S0450**, WCAG **2.2.2**, **S0400** | The two drifting row sets (Contact, Projects) are the only ambient anchors; both have a pause control and a still mode | (unchanged) |
| Evidence, not claims | brief AUDIT STANDARD ("a claim without an artefact does not exist") | Every version of every section at both widths, from the final build | `sheet9.py` |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | The Bathrooms build now reads as one wall gaining a layer per stage, with no blank frame (17-frame strip). The contact sheets show every version holding its composition at both widths. | The sheets are viewport frames at two anchors per section, not every frame. A transition defect between anchors could still hide; one did, and it was found only by looking at the sheets. |
| **Usability** | **8** | 0 failures in 194 repeat and reverse comparisons, 0 errors in 20 runs, hero return states pixel-identical. Bathrooms re-checked at 12 sizes. | Scroll is driven by script in steps, not a human hand; momentum scrolling on a real phone is untested. |
| **Creativity** | **6** | The build's story is repaired as a design move, not a patch. The wall now accumulates (studs → board → membrane → tile → glass → fixtures), the construction sequence the section exists to show, where before each stage was redrawn from nothing. | One section's story mended; the phase adds no new moment. |
| **Content** | **8** | No copy changed. The evidence pack shows every published version as it ships. 0 em dashes. | Nothing new to say. |

## Evidence
`qa/finalize/phase9/`:
- `repeat-summary.json`: 194 anchors, each with its repeat and reverse percentages, the difference box and the verdict;
- `sheet-*.jpg`: the five contact sheets;
- `bath-build-before-1440.jpg` and `bath-build-after-1440.jpg`: the fix;
- `bath-build-phone-list.png`: the phone drawings;
- `matrix-bathrooms.json`: the device matrix after the fix.

**Regression after the last change:**
- all five pages: 0 console errors;
- single file `elbaz-construction.html` (3.71 MB):
  - navigation, back, deep link, mail override and logo home all pass;
  - images: 0 broken;
  - console errors: 0;
- 0 em dashes.
