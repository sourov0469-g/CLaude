# GATE-PAGE — OUR WORK (route `#/our-work`)

**Under:** `siding/redo/final/PAGES-BRIEF.md` (inner pages), the homepage GLOBAL RULES and the owner's hard rules. **Files:** `parts_page_our_work.py`, `src/page_our_work.css`, `src/page_our_work.js` (`window.FPWork`), `tools/page_work_test.js`, `tools/page_work_shots.js`, shared `tools/page_test_lib.js`, `tools/pbuild.py`, `tools/pages_prep.py` (photo re-encode), screenshots `gate/page-work-*`.
**Brief for this page:** the firm's documented-project record, shown exactly on the homepage lock (886 = 312 with photos + 574 more counted), **no maps and no map-like plots** (towns are a bar list), nothing invented, no outside links, no video.

## 1. Self-audit and decisions

The homepage already uses the town photo board and sign list (Area), the Services "compare all 10 trades" chart and the hero. This page therefore uses the same data a different way and adds what the homepage does not have: the whole record as a count you can run, trade-by-trade measures side by side, one job file in full, and a gallery with a real viewer.

| Published content | Object built | Notes |
|---|---|---|
| 886 documented projects; 312 with photos shown + 574 more counted; 177 pairs | **A wall of 886 squares** you count with a range (312 lime, 574 dark) | Unit chart, not geographic: squares run in rows in the order they are counted. Wording "312 with photos + 574 more counted"; the word map appears nowhere |
| Documented counts per trade, priced counts, middle half, median band | **A trade ledger** with two measures per trade and a $0–$50k ruler (middle half bar, median band block); sort by documented, priced or median band (rows glide to their new place); focus or hover a row for its sentence; "See … photos" jumps to the gallery filtered to that trade | The two measures are named on the page (documented vs priced) |
| Towns (near.json `g`) | **A bar list**, scale All towns / Without Austin, and a "Find a town" box over all 56 recorded towns | No coordinates, no plotted positions |
| Job APS-4867 | **A long-form job file** with a timeline you drag through (gaps to scale, the four on-site days enlarged), the firm's five journey steps, the photo changing with the stage, the on-site day pips, the facts table, scope, eight job photos | Real dialog viewer shared with the gallery |
| 177 pairs published; photos | **A gallery filtered by trade** with a before/after wipe viewer | 14 pairs and 12 photos, the ones whose images exist in `siding/work/dl` |
| "1,590 individually priced trades on 886 documented projects, 2018–2026 …" | **How to read a price band**: the job's worksheet lines choose a rung on a 13-band ladder; what is and is not counted (materials and labor in; discounts and tax out) | The lock sentence is quoted exactly |

**The unresolved inconsistency (kept off the page, recorded here):** the homepage says "886 documented projects, **316** of them with photos" in its About answer and on its highlighted-projects link, while its count lock says "**312** shown … **574** more" (312 + 574 = 886, self-reconciling). The page uses the lock numbers 886 / 312 / 574 as the headline measure and the string "316" appears nowhere on it (tested). FACTS.md records the 316 as the firm's own count; the gap of four is **unresolved in the firm's published pages**.
**Other measure notes:** Austin 541 is documented projects by recorded town (`near.json`); the finder file holds 539 points for Austin and the homepage's town plate says 209 with photos; the page uses 541 and names the measure. Trade documented counts are the homepage's (431, 388, …), not the finder tallies (429, 386, …). The job's painting band ($5k–$10k) is on the firm's job page, so the worksheet shows both lines.

## 2. What was built

1. **Opener, "886 documented projects."** The count wall (autoplay once to 886, then a "Count them" range with a live readout: "100 with photos", "312 with photos + 188 more counted", "312 with photos + 574 more counted"), four fact tiles (886 · 312 with photos shown · 574 more counted · 177 pairs published), CTA to `#/contact` and phone. Kit art: *process* (blueprint grid and route).
2. **Trade ledger.** Ten trades; documented and priced bars; middle half and median band on a $0–$50k ruler; sort chips; a readout sentence; photo jump. Notes: decking has no documented count (the firm shows none); garage doors (6) and decking (5) are small samples.
3. **Towns.** Bars for towns with 8 or more documented projects (Austin 541, Round Rock 110, Cedar Park 35, Leander 28, Pflugerville 28, Georgetown 21, San Marcos 10, Buda 8, Temple 8); toggling "Without Austin" rescales to Round Rock and marks Austin off the scale; "Find a town" (e.g. Hutto: 3 documented projects).
4. **Job APS-4867.** Timeline: First contact (Mar 9) · Evaluation (Mar 9) · Planning and approval (Jun 18) · Installation (Aug 31 – Sep 3, four on-site days, one pip each) · Completion (Sep 3); dragging, arrow keys, Home/End or a click on a step; the card carries the firm's own sentence for each step; the photo is the Before photo until installation, a job photo during installation (labelled "a photo from this job", not a day-specific claim) and the After photo at completion. Facts table (siding portion $25k–$30k, James Hardie 8.25″ Smooth; painting portion $5k–$10k, Sherwin Williams SuperPaint), the scope sentence, and eight job photos that open in the viewer.
5. **Gallery.** Ten chips with counts (All 26, Siding 11, Windows 8, Shingle roofing 4, Metal roofing 1, Patio covers 2, Exterior doors 2, Garage doors 2, Exterior painting 5, Gutters 1), a live status line, cards labelled with the firm's place, month and band; the viewer is a real `<dialog>` with a focus trap, Escape, arrow keys between items, a wipe slider (drag, keys), a counter and focus returning to the card.
6. **How to read a price band.** Worksheet card for APS-4867 (two lines), a 13-rung ladder with a sliding marker, four what-is-counted rows, the lock sentence and the definitions of median band and middle half.
7. **Closing.** "Want this on your house?" (the firm's own line), `#/contact`, phone, the Siding / Windows / Roofing pages, hours and address.

**Background treatment (named):** dim sage grounds (#F1F5F1 / #E8EFE9, never white); kit line-art on two parallax layers (process, try, visualiser, reviews, services, services-near); the Area/contour art is deliberately not used (it reads as a map). One deep-green panel (the closing card).

## 3. Governing reference and WEB-SKILLS

**Governing reference: the New York Times's "Snow Fall" (2012), the long-form feature that treats one event as chapters with a persistent timeline and images that change as you move.** **Transfers:** one case read in order, with the timeline as the spine and the picture following it; documentation before decoration. **Does not transfer:** its video, parallax stagecraft, bespoke type and scroll-jacking; this page uses only the firm's photos and sentences and never captures the scroll.

| Level | Element | Skill → how used |
|---|---|---|
| Section | whole page | ⟦S1434⟧ visual-hierarchy: the count first, then the measures, then one job, then the gallery; ⟦S1426⟧ law-of-proximity: each control sits above the thing it changes; ⟦S0220⟧ anti-slop: published counts, bands, dates and sentences only; the measure (documented vs priced) is named wherever a number appears |
| Element | sort, scale, filter, worksheet pickers | ⟦S1444⟧ one choice at a time; ⟦S1454⟧ serial-position: Austin and Siding first (the largest records); ⟦S1494⟧ plain labels |
| Motion | wall count, bar growth, row glide, timeline, wipe sweep | ⟦S1436⟧ animation-principles (the rows glide to their new place; the wipe sweeps once then waits); ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: 886 squares change class only for the changed range, bars animate width once on view, parallax only while the page is shown; ⟦S0400⟧ accessible-animation: reduced motion shows the finished wall and every value snaps |
| Element | dialog and controls | ⟦S0054⟧ fixing-accessibility: native modal dialog plus an explicit Tab trap, Escape, focus returns to the opener, `aria-live` on every readout and the gallery status, `role=slider` with `aria-valuetext`, 3 px focus rings; ⟦S1441⟧ fitts-law: every control ≥ 44 × 44 (tested at four widths) |
| Site | weight | ⟦S0231⟧ web-performance: 21.8 KB CSS + 23.9 KB JS (unminified); 1,098 KB of embedded WebP (28 pair images at 560 px q 44, 8 job photos at 360 px, 12 stills at 420 px, re-encoded by `tools/pages_prep.py`), lazy-decoded |
| — | ⟦S0453⟧ | not applied on this page |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `page-work-1440-0…6.png` (seven sections), `page-work-390-0…6.png` (phone), `page-work-state-case-1440-3/-4/-end.png` (timeline stages), `page-work-state-filter-1440.png` (Windows filter, 8 items), `page-work-state-viewer-1440.png` and `-viewer2-1440.png` (the wipe viewer and the next item), and the same states at 390 (`page-work-state-*-390.png`). **68 of 68 checks pass** (`node tools/page_work_test.js` after `python3 tools/pbuild.py our-work out/final-work.html`):

| Check group | Result |
|---|---|
| Locked and published facts (compared with homepage text, `near.json`, the job file, `pairs.json` at test time) | 886 / 312 / 574 / 177 and the exact string "312 with photos + 574 more counted"; "316" absent from the page; the lock sentence verbatim and found in the homepage; nine documented counts and ten priced counts with middle half and median band equal the homepage and its accessible labels; Decking has no documented count; towns equal `near.json` (Austin 541, Round Rock 110, Cedar Park 35, Leander 28, Pflugerville 28, Georgetown 21, Buda 8, plus San Marcos 10 and Temple 8); Hutto 3; job dates, four days, bands, steps and step sentences equal the job file; the six homepage pairs are labelled exactly as `pairs.json` |
| Rules | 0 outside links; anchors resolve; no external media; no map word or class, no coordinates or canvas; no video/audio/iframe; Montserrat and Inter only; controls inherit |
| Wall | 886 squares; autoplay ends at 312 + 574; range at 100 and at 500 reads correctly |
| Ledger | sort by median band reorders; focusing a row reads its numbers; "See windows photos" filters the gallery to 8 items |
| Towns | scale toggle; find a town (hit and miss) |
| Case study | End / Home / drag / click on a step; four pips at Completion; Before/After labels; the five step texts are verbatim in the job file; eight job photos with alt text from `job4867.json` |
| Gallery and viewer | ten chips with counts; 14 pairs + 12 photos; patio filter; modal opens with focus on Close; Tab trap; wipe keys (End = 100, ArrowLeft = 95); ArrowRight / ArrowLeft move between items (2 of 26 / 1 of 26); drag moves the wipe; Escape closes and focus returns to the card; a single photo has no wipe; job photos open in the same viewer (3 of 8) |
| Band | worksheet lines; 13-rung ladder; choosing painting moves the highlight to $5k–$10k; the four what-is-counted rows |
| Contrast | every resolvable text ≥ 4.5 at 1440 and at 390 (ladder's selected rung is white on its own marker bar, 12:1 by calculation, excluded from the automatic pass because the marker is a sibling element) |
| Touch | emulated: `touch-action: pan-y` on the case track, case image and viewer; tapping a chip filters (11); tapping a card opens the viewer; Close works; the page scrolls; 0 errors |
| Reduced motion | the wall is complete on arrival; no running animation; revealed sections visible; the viewer opens with the wipe at 50 (no sweep) |
| Layout | 1440 / 1024 / 768 / 390: no horizontal overflow, every control ≥ 44 × 44, 0 page errors |
| Weight | 21.8 KB CSS + 23.9 KB JS; 1,098 KB images (limits 120 KB / 1.2 MB) |

## 5. Defects found and fixed

1. Step labels overlapped each other and the scale note in the timeline (two steps share March 9); labels staggered above and below the rail, track made taller, and the handle starts on step 1 instead of before it.
2. The wipe's intro sweep overrode the first keys and drags in the viewer; it is cancelled on any input.
3. A press on a timeline step button could not start a drag; presses on buttons now become a drag after 6 px, and a click is still a click (`_moved` guard).
4. Gallery cards repeated the trade ("Siding · Siding portion $25k–$30k"); the line now shows the published band label only.
5. The "$0K" ruler labels were upper-cased by inherited CSS; reset.
6. Booking CTAs used the homepage's internal `#booking`; they use `#/contact`.
7. The band reading was squeezed under a narrow ladder; it moved into the worksheet card.
8. While the viewer was open every paragraph on the page changed to a bold display face: the class I put on `<html>` to stop background scrolling (`po-lock`) was also the name of the price-band quote block, so that block's rules matched the whole page. The scroll-lock class is now `po-noscroll`; screenshots of the viewer were retaken.
9. The test harness once flagged white text on the sliding marker as 1.07:1 (the marker is a sibling of the text); verified visually and by calculation and excluded in the harness, with the reason recorded above.

## 6. Remaining, named honestly

- **Only 14 of the 177 pairs and 12 photos are shown**, because only those images exist in `siding/work/dl`. The page says so ("14 of the 177 … are shown here").
- **Image quality is a trade-off:** pair images are 560 px at q 44 to stay under the 1.2 MB image budget; in the viewer they are slightly soft at large sizes.
- **The "316 with photos" versus "312 + 574" gap is unresolved in the firm's own pages** (see section 1); the page follows the lock.
- **Towns:** the page draws bars for every town with 8 or more documented projects, which adds San Marcos (10) and Temple (8) to the seven named in the brief; both are in `near.json`. The count of Austin (541) is documented projects, not photographed ones.
- **The installation-stage photo is a generic job photo.** The firm publishes no per-day photos, so it is labelled "On site · a photo from this job" and the four pips only count days.
- **Wall order is not data:** squares are filled in counting order; position carries no meaning (said in the caption).
- **Testing:** Chromium only, software rendering; touch is emulated, not a physical phone; isolated build (`PAGES_ONLY=our-work` through `tools/pbuild.py`); a whole-site build was produced and loads, but the full-site run of this test was not repeated. Contrast over line-art grounds is resolved against the nearest ancestor, not sampled per pixel.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.3** | A bold count wall, a ledger with a readable ruler, a calm job file and a photo-led gallery; consistent with the Windows page and the kit (`page-work-1440-*`, `-390-*`). **Minus:** the towns and band sections are plain lists beside the stronger objects; the wall is dense dark squares |
| Usability (30) | **8.6** | A real dialog (focus trap, Escape, arrows, focus return), keyboard paths for every control, status lines in live regions, targets ≥ 44 px, drag areas keep vertical scroll. **Minus:** the timeline's two same-day steps need the scale note to be understood |
| Creativity (20) | **8.3** | A countable wall of the record, rows that re-sort with a glide, a job timeline with the gaps to scale and the on-site days enlarged, a band ladder tied to a real worksheet. **Minus:** filter-and-viewer galleries are a known pattern |
| Content (10) | **9.1** | Every number, date and sentence compared with the firm's pages at test time; both measures named; the open inconsistency recorded instead of hidden. **Minus:** only 14 of 177 pairs can be shown |
| **Weighted** | **8.47** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.3 + 0.3 × 8.6 + 0.2 × 8.3 + 0.1 × 9.1 = 3.32 + 2.58 + 1.66 + 0.91 = **8.47**.

## 8. Sub-agent use, stated honestly

No sub-agents or background workers were used for design, code or testing. Screenshot scripts ran in the background while I wrote the gates. The shared scratch directory was written to by another builder at the same time (same file names); I used unique names after noticing it.

## 9. Next

Whole-site run with all five pages merged (shared header state, router anchors under the fixed header, the Contact page's `wire()` safe with its stub); decide with the owner which of "316" and "312 + 574" the homepage text should carry so the two pages and the About answer agree; if more image weight is allowed, ship the pair images at 720 px for a sharper viewer.
