# GATE-FINAL — Section 7: PROCESS (Version D, "Four columns", upgraded)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (PROCESS block). **Owner's asks:** keep D (four columns; the open column shows the step); "overall good, needs the upgrade": micro details, attention to details, overall improvement; richer, never cluttered; C ("The plumb line") is shortlisted and is NOT built here.

## 1. Self-audit of the old Process D, then decisions

Old D: four colour columns (green, lime, pale, near-white), one open at a time; each open column had a line drawing that drew itself once (a house with a magnifier looping forever, a sheet with ruled lines, ten board lines, a window with a tick), the sentence and two figures. Faults: the closed columns were only a vertical title and a number (no preview of what is inside); the drawings were decorative line art with no story and no way to look at them (the magnifier looped for ever, nothing responded to the pointer); the four steps were not joined by anything; hover-open used a plain timer; the ground was a flat white-ish; the near-white column was pure white; the section had no pause, no keyboard path beyond the arrow keys, no reduced-motion story for the loop.

**Decisions:** keep the idea and the colours exactly; (a) give each drawing a **time line t from 0 to 1** and draw it as a pure function of t, so the same drawing can **play, be scrubbed with the pointer, or jump to a part with a chip**; (b) make each drawing tell its own step in the firm's own words (the chips are fragments of the published sentence); (c) join the four with a **progress thread** that also carries the auto-advance timer; (d) put a small icon on every closed column and give it hover life; (e) kit background (blueprint grid, route) on a dim sage ground, with the route's nodes lighting as the steps are reached; (f) pause control, reduced-motion and phone paths.

## 2. What was built

- **Facts: only published text.** The four sentences, the headline "Four steps. Nothing hidden." and the eight figures are the earlier Process D markup, which came from the firm's own text; the build asserts every sentence and figure is present in that markup and the supporting FAQ lines are present in `faq.json` (1 to 2 weeks including painting; two days; lifetime workmanship warranty; 30-year non-prorated; 415 siding jobs; $10,000–$15,000). Chip labels are fragments of those sentences (Siding · Trim · Windows · Roof · Gutters; Work you want · Itemised price · Nothing else; Old material off · New boards up · Trim and paint · Windows set and sealed; Walk the job · Punch list · Site clean · Warranties). The sheet in step 2 carries **no numbers** (abstract bars only) and the word on the stamp is "ITEMISED". Hours Mon–Fri 8–8 · Sat 8–6 · Sun 12–5 as published. Nothing is summed.
- **01 Free inspection (green):** a house in elevation draws itself, then a **magnifier scans siding, trim, windows, roof and gutters in the sentence's order**, each part turning lime while it is under the lens, its chip lit and then ticked. **With the pointer over the house the lens is yours**: it follows the pointer and names the part under it (siding, trim, windows, roof, gutters); leaving the house hands it back to the script.
- **02 Detailed proposal (lime):** a sheet (with a second sheet behind it) whose five rows are **written by a pencil**, each with a checkbox that ticks when its line is done and a short price bar; a bar fills, an **ITEMISED stamp thumps down** (scale overshoot, three impact strokes), and the blank rest of the sheet is struck through (nothing else). Move across the drawing to scrub it.
- **03 Expert install (pale):** twelve old boards **leave from the top**, the sheathing shows (house wrap hatch), twelve new boards **slide up from the bottom, one course after another, with nails**, corner trim drops in, a **roller paints** a lime wash across the wall, dimension lines **measure** the opening, the window **sets down** and a lime **sealing bead** draws round it; a ladder stands beside the wall. Move across the drawing to scrub the install.
- **04 Final check (near-white):** a figure **walks** the front of the house leaving a dotted path; three punch-list markers on the wall are **cleared one by one** (ring pops, a ticked dot replaces each); a **broom sweeps** the debris off the ground; a **shield with a check** pops onto the gable with a ring and two sparkles; the clipboard beside it **ticks four rows** in step.
- **The progress thread:** four nodes join the four columns (it moves with them as they open: the thread is in the same flex row, so it never drifts). Done nodes show a tick, the current one is lime with a pulsing ring, and the segment between the current node and the next **fills as the auto-advance timer runs**, with a lime head. On phones the thread runs down the left edge. The kit's background route lights its nodes up to the current step (and the fifth when the last step has played).
- **Closed columns:** a drawn icon (house and lens, sheet, boards, check), the vertical title and a big number; hover lifts the column, wiggles the icon and draws an underline.
- **Auto-advance (gentle):** starts when the section is on screen (desktop width only), plays each drawing once (7.6 / 6.6 / 8.6 / 7.4 s) plus a 2.4 s hold, then opens the next column; at step 4 it stops. **It stops for good at the first hover, focus, click, key or touch on the section.** A visible **Pause / Play** button (48 px) freezes everything (WCAG 2.2.2).
- **Pointer, keyboard, touch:** hover opens a column after a 140 ms dwell on real mouse movement only (a column growing under a resting cursor no longer opens another); click; arrow keys, Home, End move the focus and open; the chips are real buttons (44 px) and jump the drawing to the end of that part. Touch: tap opens; nothing depends on hover; below 860 px the columns become rows that open downward with a smooth height transition and the tapped row scrolls into view; nothing advances by itself on a phone; the drawing never blocks vertical scroll.
- **Live region:** "Step 3 of 4: Expert install" is announced for user-made changes (never during auto-advance).
- **Reduced motion:** no auto-advance, no loop, no transitions; every drawing is shown finished; the Pause button is hidden; chips still jump instantly; columns still open by click.
- **Idle:** nothing runs when nothing changes (the loop ends when a drawing has finished and no timer is running).
- **Weight:** 16.4 KB CSS + 16.4 KB JS (unminified); the section markup with its four inline drawings and the two background layers is 33.5 KB; no image, no library, no font beyond Montserrat and Inter.

**Background treatment:** the kit's **blueprint grid, compass circles, dimension lines and the left-to-right route with nodes** (process-far / process-near, inlined, ids renamed `prf…` / `prn…`) on a dim sage ground (#EEF3EE → #F1F5F1 → #EAF0EB), two-layer scroll parallax (4% and 10%); the route's five nodes light up with the steps. The old pure-white column is now #F5F9F5; nothing is pure white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Dropbox Brand's colour-block columns (the reference D was chosen from: subtraction, bold colour blocks, big type)**, with **Graza** as the bar for custom, story-telling animation inside each block. **Transfers:** four blocks of strong colour, one open at a time, big numerals, a drawing that does one clear thing per block. **Does not transfer:** their art, their type, their copy; every drawing here is made from geometry for this firm's four published steps, and every word is the firm's own.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Process | ⟦S1434⟧ visual-hierarchy: the heading, the open column, then the closed ones; the open column reads number → title → sentence → drawing → figures; ⟦S1426⟧ law-of-proximity: chips sit under their own drawing, figures under their sentence; ⟦S0220⟧ anti-slop: published sentences and figures only, no invented number, no sum, chips are fragments of the sentence |
| Element | columns, chips | ⟦S1444⟧ one choice at a time (one column open; a chip names one part); ⟦S1454⟧ serial-position: 01 first, 04 last, the thread ends in a tick; ⟦S1494⟧ plain labels (Pause, Play, the firm's own words) |
| Motion | drawings, thread, columns | ⟦S1436⟧ animation-principles: anticipation (the lens enters before it scans), overshoot (stamp, pop-ins, the board slide), follow-through, staggered courses of boards; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: one rAF loop, transforms and opacity, writes only for elements whose value changed, loop ends when nothing changes; ⟦S0400⟧ accessible-animation: pause button, auto-advance stops on interaction, reduced-motion path |
| Element | controls | ⟦S0054⟧ fixing-accessibility: real buttons, `aria-expanded`/`aria-controls`/`aria-current`, hidden columns out of the tab order, live region, 3 px focus rings; ⟦S1441⟧ fitts-law: every target ≥ 44 px (measured), the open column's whole header is the button |
| Site | weight | ⟦S0231⟧ web-performance: no image, no library, 32.8 KB of CSS + JS |
| Site | proof | ⟦S0453⟧ pricing/proof: the only price figure is the firm's published median band with its base ("415 priced siding jobs"); no price is invented in the drawing |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `process-1440-step1-scan.png`, `process-1440-step2.png`, `process-1440-step3.png`, `process-1440-step4.png`, `process-1440-hover-closed.png`, `process-drawings-sheet.jpg` (all four drawings at six moments), `process-1024-step3.png`, `process-390-step2.png`, `process-390-step3.png`. **46 of 46 checks pass** (`tools/proc_test.js`; shots from `tools/proc_shots.js`):

| Check | Result |
|---|---|
| Facts | Heading; four steps and numbers; the four sentences verbatim; the eight figures; FAQ lines behind them present in `faq.json`; chip labels; no sums (241, 330, 497, 361, 178, 101, 74 absent) |
| Links | Only `#booking`; one `#process`; no outside address |
| Columns | Start state (step 1 open, three hidden from the tab order); click opens step 3, live region "Step 3 of 4: Expert install", counter, thread (two done, one current), background route lit to the step; arrow keys, Home, End; 3 px focus ring |
| Pointer | Hover opens after a dwell and stops auto-advance; art 1 names the part under the lens for five points (windows, siding, roof, gutters, trim) and the lens settles on the pointer; art 3 scrubs (t 0.28 left, 0.94 right) |
| Drawings | A chip jumps and holds just before the end of its part (Old material off: 12 old boards gone); the sealing bead is fully drawn at the end; art 2 plays through (5 ticks, stamp) and the loop then stops |
| Pause, auto | Pause freezes (t constant) and shows Play; Play resumes; auto-advance opens step 2 after about 10 s; the thread segment fills; the first interaction stops auto for good (no change in 9.5 s); focus also stops it |
| Reduced motion | No auto in 12 s; all drawings t = 1; no pause button; transitions 0 s; chips jump at once; columns still open |
| Touch (390) | Rows; tap opens; no auto; hidden rows out of the tab order; no scroll blocking; chip by tap |
| Contrast, fonts | Every text in every column ≥ 4.5 (lowest 5.77); heading, counter and Pause ≥ 4.5; Montserrat and Inter only |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390 with each step open in turn: no horizontal overflow, nothing cut off in the open column, every target ≥ 44 px, 0 errors |
| Page errors | 0 on every run |

## 5. Defects found and fixed

1. **A column growing under a resting cursor opened another column** (the test's Home key was undone by a hover). Hover is now driven by real mouse movement and locked for 0.9 s after any open.
2. **Auto-advance ran about 20% slow**: the loop reset its clock each frame. One timestamp chain now; real elapsed time (capped at 0.25 s after a sleep).
3. **The drawing jumped 22 px on first hover**: chips wrapped differently once a tick was added. Chips are now constant width (ring becomes tick) and their row has a reserved height.
4. Drawings flew over the column outside their panel (old boards leaving, new boards arriving): the panel now clips them.
5. Sheet rows ran past the sheet's edge (lengths were doubled); the stamp text was clipped ("TEMISED"); fixed (row lengths, wider stamp, 12 px type).
6. Checkboxes and clipboard rows were visible before their sheet existed; each is now tied to the time line.
7. Gutters and trim overlapped at the right corner, so the gutter zone could not be hit; zone priority corrected (found by the zone test).
8. A chip jump lit the next part's chip, not its own; jumps now stop just before the end of the part (so the part is both lit and ticked), and the drawing schedules were tightened so each part is visually complete there.
9. The open column's text overflowed by 5 px at 1024 × 768 (single-column layout): drawing width capped at 296 px.
10. The Pause button stayed visible under reduced motion (a `[hidden]` attribute overridden by `display`); fixed.
11. The first drawings shared one 320 × 240 box and looked small; each now has its own view box (house, sheet, wall, house and clipboard), all 4:3.

## 6. Remaining, named honestly

- **Drawings, not photographs, and generic ones:** the house, wall, sheet and clipboard are illustrations; the real job photographs are not used here. The install drawing is a courses-of-lap-siding wall, not any particular product.
- **Auto-advance is desktop-width only** (≥ 860 px); on a phone the rows open by tap and each drawing plays once. The drawing's pointer scrub is mouse/pen only (no touch scrub), by design, so vertical scrolling is never blocked.
- **The lens hit zones are rectangles** (the roof is a triangle); they are generous, not pixel-exact.
- **The kit background is the kit's art**; the route's node lighting is ambient and does not point at anything on the page.
- **Testing:** Chromium only, headless software rendering; touch tested with emulated touch events, not a physical phone; the auto-advance test waits real time (about 10 s).
- **One published conflict stays unresolved by the firm's data** (noted in the prep report): "1 to 2 weeks" for a siding job against four on-site days on the one documented job. Only the FAQ's "1 to 2 weeks" is shown.
- The old site-wide cursor follower (not part of this section) draws over the page; it is on the owner's reject list for the shell.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.3** | Four strong colour blocks kept; four drawings that each tell a step with real detail (pencil writing, stamp, courses of boards, roller, ladder, broom, shield); a joined thread; kit background that reacts. **Minus:** illustrations, not photography; the open column leaves some quiet space at 1440 |
| Usability (30) | **8.6** | Hover, click, arrows, Home/End, chips, pause, scrub, lens; auto-advance that stops for good on interaction; reduced-motion and phone paths; targets ≥ 44 px. **Minus:** the open column has several controls (chips, pause) that a first-time visitor must discover |
| Creativity (20) | **8.8** | A lens you can take over, a pencil that writes its own checklist, a stamp, boards that go up course by course, a figure that clears a punch list, a thread that is also the timer. **Minus:** the colour-block pattern is a known reference |
| Content (10) | **9.0** | Only published sentences, figures and hours; chips are fragments of the firm's own sentences; no number in the drawings; nothing summed. **Minus:** the install drawing cannot show the firm's real crew or product |
| **Weighted** | **8.56** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.3 + 0.3 × 8.6 + 0.2 × 8.8 + 0.1 × 9.0 = 3.32 + 2.58 + 1.76 + 0.90 = **8.56**.

## 8. Sub-agent use, stated honestly

Built by a sub-agent under the main session's brief; no background tasks claimed beyond that. The sub-agent designed, built, tested and wrote this report for Process and the Footer.

## 9. Next: Section 8 (Area, fix and upgrade), Section 9 (Booking C + J) and the footer gate

**NEXT:** the main session wires `FProc` (already in `build_final.py`'s tail list), reviews the screenshots, and decides on the open items above (the kit background art for the footer is drawn in the footer itself; see GATE-FINAL-Footer.md).
