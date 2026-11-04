# GATE-NEW — Booking L, "Everything, then one step"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 9, the last of pass 2 (On your street L accepted by Muse). It inherits the button system. No form: nothing is sent or saved.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Booking L, "Everything, then one step"** (`?book=l`) |
| Primary reference (annex v3, one) | **Dropbox Brand**: the annex assigns it to exactly this job, the "subtraction-discipline closing". Every usable reference has now been used in Booking (C Scout, D Dropbox, E and J Cash App, F Cowboy, G Graza, H Quiet Cubes, I Apple AirPods Pro, K Lusion; Bruno Simon, Rimowa, Lando Norris and MERSI are scoped elsewhere, and Ever is barred). So L returns to the one reference the annex names for the closing. D took only Dropbox's look (one giant number on a flat block). L takes its discipline, subtraction as an act: you watch things being taken away until one decision is left. |
| Signature creative move | **The wall folds into one line.** The section opens on a poster wall of the twelve locked facts the page has made (4.9 from 474, since 2009, 886 · 312 + 574, 431 siding jobs, 388 window jobs, 177 pairs, the $10k–$15k median band, the 30-year warranty, and the four credentials), each set big in type. As the reader scrolls, the stage holds still and the tiles are subtracted one by one: each shrinks and travels into its place in a single quiet line of type below. A counter in the corner counts down, 12 … 1. When the wall is empty, one sentence stands where it was: everything you have read is now one line, and what is left is one visit. The Book button and the phone sit under the line from the start, so the call to action never waits for the animation. |
| Style family | Type as the interface on white: a flat poster grid of facts, then one line, then one button; no boxes, no imagery |
| Content | Locked facts only, verbatim: 4.9 from 474 Google reviews; since 2009, merged with Sanders Roofing & Exteriors 2018; 886 documented projects since 2018 · 312 on the map with photos + 574 more counted; 431 documented siding jobs; 388 documented window jobs; 177 before-and-after pairs; $10k–$15k median band (415 priced); 30-year James Hardie non-prorated warranty; GAF Master Elite; James Hardie Elite Preferred + President's Club 2025; Andersen Certified Premier; BBB A+. The phone with the live open / closed status (the shared `Cta.status`), the hours (Mon–Fri 8–8, Sat 8–6, Sun 12–5), the address and the email. "No form: nothing here is sent or saved." (published in Booking J and K). |
| How it differs from every existing Booking version | A is a work-order pad, B a press board, C a pinned film roll of the record, D one giant number, E a weekly timetable, F an office letterboard, G three doors, H a postcard, I a day / night stage, J a receipt, K a route line. Each adds something to make the case. None takes away, none gathers the whole page's evidence in one place, and none ends on a deliberate reduction to a single step. |
| Why it is better | A closing should lower the effort of deciding. L puts every reason on the table once, at full size, then visibly puts them away into one line the visitor can still read, so the last thing on screen is the only thing left to do. The current best (K, "Next stop: your house", 8.48) explains what happens after the call; L clears the way to making it. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element at each moment (the wall, then the line, then the button); ⟦S0220⟧ locked facts only, tabular numerals, one accent |
| Poster wall (12 tiles) | ⟦S1417⟧ one type scale, even gutters; ⟦S1449⟧ each fact chunked as a big figure and a short line; real text, read in order by screen readers |
| Fold (scroll) | ⟦S1325⟧ a pinned stage scrubbed by scroll; each tile 12% of the way, staggered 5%, `easeInOut`, translate + scale to its exact slot in the line (measured, re-measured on resize); ⟦S1436⟧ decelerating arrival |
| The line | ⟦S1499⟧ every fact kept, one line of small type; `aria-hidden` (the wall stays the accessible copy) |
| Countdown | ⟦S1457⟧ "12 … 1" names the remaining distance; ⟦S1352⟧ small tabular numerals |
| Closing sentence | ⟦S1452⟧ the end beat: one sentence, then the button |
| Book a free inspection | ⟦S1435⟧ the one filled button, present from the start; ⟦S1441⟧ full width on phones |
| Phone link + status | ⟦S0054⟧ a real `tel:` link with the hero's icon size; the live status in a polite region |
| Phone | Three-column wall of compact tiles in a pinned stage that fits 844 px; the line wraps; ⟦S1441⟧ |
| Reduced motion | ⟦S0400⟧ no pinning and no fold: the end state at once (the line, the sentence, the button) |
| Background law | White ground; the stage is `data-solid` |

---

## Build log

**How to view:** `?book=l` (switcher: Booking, **L "Everything, then one step"**).

**Files:**
- `src/sec/cta7.js` (`Cta7.L()` prerendered, `Cta7.wire`) and `cta7.css` (class prefix `l`; the collision check found no shared names).
- Registered in `build_site.py`: module, prerender key `cl`, slot entry, switcher label, boot call.
- The file grows by 16,216 bytes. No imagery.

**The stage:**
- The section holds a track 280 viewport heights tall, with the stage pinned inside it (`position: sticky`, one viewport tall).
- **Header:** the kicker, the h2 "Everything, then one step." and the counter ("12 reasons on the wall").
- **The wall:** twelve facts in a flat 4-column poster grid (3 columns at 1100 px and below).
  - Big figure in Poppins 800, the rest of the fact in small type. Read together, each is a locked fact verbatim, and each is a real list item, so screen readers read the wall.
  - Four tiles carry flat brand blocks: 4.9 and 30-year in deep green, 886 and James Hardie in lime.
- **The line:** all twelve facts in one running line of small type under the wall. It waits as a ghost (16% opacity) from the start, so the destination is visible. It is `aria-hidden`; the wall remains the accessible copy.
- **The CTA row**, present from the first frame:
  - "Book a free inspection" (the one filled button, to the firm's scheduling page);
  - the phone link (18 px icon);
  - the live "Open now / Closed now" status (`Cta.status`, refreshed every minute);
  - the hours, address and email;
  - "No form: nothing here is sent or saved."

**The fold (scrubbed by scroll):**
- Tile *i* folds over [0.10 + 0.05 *i*, 0.22 + 0.05 *i*] of the pinned scroll.
- Each tile's travel, measured with no transform applied, runs from the tile's centre to its own slot's centre in the line. It is re-measured on resize and when fonts load.
- The tile translates there and scales down to the slot's height (cubic in-out). It fades over the last 38% of its travel, while its slot fills from ghost to full over the last 30%.
- The counter counts down with each fold, 12 … 2, "1 reason", then "1 step left".
- When the wall is empty (by 0.77), one sentence fades in where it stood: "That is all of it, in one line. What is left is one visit.", then "A free inspection at your house, every trade in one visit. Call the office or book online."
- The finished line turns to full ink.

**Phones:**
- The pinned stage holds the header, the wall (3 columns of compact tiles) and the line, all above the bottom bar.
- The CTA row moves to just after the stage. The site's bottom bar keeps Call and Book on screen throughout, so the stage never pushes anything below the fold.

**Reduced motion:** no pinning and no fold. The end state shows at once: the sentence, the full line, the CTA row and "1 step left". The wall stays in the page, visually hidden, for screen readers.

**Without JavaScript:** a static page: the wall, then the sentence, the full line and the CTA row.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-book-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- the fold at progress 0, 0.22, 0.42, 0.62 and 1: `-1440-0`, `-1440-fold1`, `-1440-fold2` (tiles in flight), `-1440-fold3`, `-1440-end`;
- `-1440-reduced`;
- `-390-0p`, `-390-foldp`, `-390-endp`, `-390-cta`;
- contact sheet: `new-book-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Fold at 0 / 0.22 / 0.42 / 0.62 / 1 | Counter 12 → … → 4 → "1 step left"; tile opacities fall in order; slots fill from 0.16 to 1 in the same order; the sentence reaches opacity 1 only at the end; the stage stays pinned (top 0) throughout |
| Landing accuracy | Mid-fold, tile 1's centre sits exactly on its slot's centre (0, 0 px), and again after a resize to 1180 × 860 (0, 0 px) |
| CTA from the start | With the wall still full (progress 0.05), the focused Book button is fully in view; its link is the scheduling page |
| Status | "Open now, until 8 pm Austin time" at test time (shared `Cta.status`) |
| Reduced motion | No pin (track 788 px, not 280 vh), the end state at once, "1 step left", wall visually hidden but present |
| Phone (390 × 844) | The stage is 844 px; the line ends at 716 px, above the 80 px bottom bar; the fold runs 12 → 6 → "1 step left"; the CTA row follows the stage; 0 overflow |
| CTA phone icon | 18 × 18 |
| All 232 version views | 0 page errors; the button system on in every view; subpages untouched |
| Existing versions | 182 slot templates and 8 page templates unchanged; the page body identical apart from the one added `book:l` template; the only changed script is the main bundle (adds `Cta7`); defaults unchanged (`book = a`) |
| Locks | All twelve facts, the phone, the hours, the address, the email and "No form: nothing here is sent or saved." verbatim |

## Defects found and fixed

1. **The phone stage overflowed the screen:** the CTA row and the line sat below the fold while the stage was pinned. On phones the CTA row now moves after the stage (the site's bottom bar keeps Call and Book in reach), and the tiles and line are tighter, so the stage fits 844 px with the line ending at 716 px.
2. **An empty band before the fold:** the line's slots started at 0% opacity, leaving a blank strip between the wall and the buttons. They now wait as a 16% ghost of the line, so the visitor sees where the facts are going.

## Remaining defects, named honestly

- **A long pinned scroll:** the fold takes 1.8 viewport heights of scrolling. The Book button is there throughout, but a visitor who wants to move past the section has to scroll through it.
- **"One line" wraps:** at 1440 the line runs to three lines of type; on phones to eight. It is one running line, not literally one row.
- **The ghost line is low-contrast by design:** it is decorative (`aria-hidden`), and fills to full ink as each fact arrives.
- **Outside this version:** at 1180 px wide the page shows 10 px of sideways overflow from a `.board` button in another section's live version. It is identical with Booking A and K, so it is not this version's. It was left alone, because existing versions are never altered under the addendum.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | booking L | ⟦S1434⟧ one dominant element at each moment: the wall, then the line and the sentence; ⟦S0220⟧ locked facts only, tabular numerals, one accent |
| Element | 12 fact tiles | ⟦S1417⟧ one type scale, even gutters, four flat brand blocks; ⟦S1449⟧ figure plus short line; a real list read in order |
| Motion | the fold | ⟦S1325⟧ a pinned, scroll-scrubbed stage; measured tile-to-slot travel, cubic in-out, staggered 5%; ⟦S1436⟧ decelerating landings |
| Element | the line | ⟦S1499⟧ every fact kept in one running line; a ghost that fills; `aria-hidden` |
| Element | counter | ⟦S1457⟧ "12 reasons on the wall" … "1 step left"; ⟦S1352⟧ tabular numerals |
| Element | closing sentence | ⟦S1452⟧ the end beat: everything in one line, one visit left |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button, present from the first frame; ⟦S1441⟧ full width on phones |
| Element | phone link + status | ⟦S0054⟧ a real `tel:` link at hero size; the live status refreshed each minute |
| Site | phone | Compact 3-column wall in a stage that fits 844 px; CTA row after the stage, with the bottom bar's Call and Book in reach |
| Site | reduced motion | ⟦S0400⟧ no pin, no fold: the end state at once |
| Site | background law | White ground; the stage is `data-solid` |

## Reference transfers and non-transfers (Dropbox Brand)

**Transferred:**
- subtraction as discipline, here made visible as an act: things are taken away until one decision is left;
- type as the interface: big figures, flat colour blocks, no imagery, no boxes beyond the tiles;
- a closing that ends on one action.

**Not transferred:**
- Dropbox's own type, palette and illustration;
- the single giant numeral treatment (that is Booking D's).

## Comparison with the section's previous best (Booking K, "Next stop: your house", 8.48)

K draws the route from this page to the inspection and lets the reader's scroll carry them along it.
- **L clears the way to the call:** every reason the page has given, at full size once, then visibly put away into one line, so the last thing on screen is the one thing left to do.
- **K is stronger on:** explaining what happens after the call.
- **L is stronger on:** gathering the page's evidence in one place, and on the discipline of the close.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.7** | A confident type wall with four flat brand blocks; tiles in flight landing exactly on their words; a bold closing sentence (`-1440-0`, `-1440-fold2`, `-1440-end`) |
| Usability (30) | **8.3** | Book and call present from the first frame; live status; real links; reduced motion and no-JS end states; the phone stage fits. **Minus:** the pinned fold is long to scroll past |
| Creativity (20) | **8.8** | No Booking version subtracts; the wall folding word-for-word into its own summary line is new to the site |
| Content (10) | **9.0** | Every locked fact, verbatim, in one place; nothing new claimed; "No form: nothing here is sent or saved." |
| **Weighted** | **8.63** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.7 + 0.3 × 8.3 + 0.2 × 8.8 + 0.1 × 9.0 = 3.48 + 2.49 + 1.76 + 0.90 = **8.63**.

**Vetoes: none.**
- Locks verbatim; no form; nothing claims to be saved or sent.
- No configurator, no game, no map, no dive.
- White ground; brand accents only; normal fonts.
- No imagery.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. This completes pass 2 (one L version for every section). **Stopped for Muse's accept.**
