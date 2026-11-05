# GATE-FINAL — Section 9: AREA (Version A, "On your street", the Thread board, rebuilt)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (AREA block). **Owner's asks:** keep the Thread board idea and the overall design; "the current build is FULL OF BUGS and looks bad: fix every bug"; the upgrade is LARGE (micro little things, more interactivity, all the details improved a lot); fact lock "886 projects: 312 on the map with photos + 574 more counted"; no map centrepiece; no link outside the site.

## 1. Self-audit of the old Area A, then decisions

I rebuilt the ported markup (`BS.prerender()['aa']`) in a browser at 1440 and 390 and read `area.js`/`area.css` (screenshots: `gate/area-old-1440.png`, `gate/area-old-390.png`). **Bugs and weaknesses found in the old section:**

1. The town sign list **overflows the right edge of the post**: 230 px signs with ±10 px offsets and an 8 px hover shift in a 250 px column; "Round Rock" and "Leander" stick out past the board.
2. The caption **"Projects documented per town" is drawn across the pole** (the pole is absolutely positioned under the caption).
3. The intro says **"886 documented projects since 2018"**: an unpublished claim. (near.json's earliest record is a 2018 date code, but no published sentence says "since 2018"; the owner ruled it out.)
4. Every card **linked to the firm's real website** (`target="_blank"`); in the stub the links were only stripped to dead plain text, so the cards did nothing.
5. The thread ran **behind the cards**, so only short bits showed in the gutters; it was anchored by reading pin positions from a scrolling `.cards` strip; cards had unequal heights and ragged rows ("looks bad").
6. At phone width the cards became a **nested horizontal scroll strip with negative gutter margins** (the owner saw the page zoom out). I could not reproduce page-level overflow in my headless measure of the stub (scrollWidth 390); the `.lineview` rule the owner named lives in the **Reviews** CSS (`rev.css`), not in Area (see section 6).
7. `:hover` transforms on cards and signs applied on touch too (sticky hover); no keyboard path through the cards; no Esc; no live text for what a filter did; the sign filter only dimmed, with no threads and no readout.
8. Only one real interaction (a town filter). Nothing opened, nothing counted, nothing responded to a trade.

**Decisions.** Keep: the pinned photos on a thread, the sign post with the seven towns and their tallies. Replace: everything that was buggy, and build the upgrade as the board **physically behaving**: a thread that runs through every pin, is drawn as you scroll, and each card drops when the thread reaches it; cards that swing in the breeze and when the pointer passes; **pulling a town's threads** from its sign to its photos; trade chips on the same board; an in-page viewer instead of the outside links; a type-ahead for any of the firm's 56 cities. The signs are restyled from wood to **deep-green street-name plates with a lime count tab** (the brand colours; "On your street" is literally street signs). Nothing is a map.

## 2. What was built

- **Heading and lock.** "On your street." with a hand-drawn thread that draws itself and ends in a pin that pops; the lead "Real jobs from our own project files, pinned where they happened. Pick a town to pull its threads."; the lock line **"886 projects: 312 on the map with photos + 574 more counted"** exactly, with the three numerals counting up when it enters view (final text always equals the lock; reduced motion shows it at once).
- **The board.** A dim sage board (dot grid, four screws, inner shadow) with **16 of the firm's own photos** pinned on paper cards, each with a lime or green pin. Photos are the firm's published ones re-encoded from `siding/work/dl` (crops from the prep sheet, WebP q72, long side ≤ 640 px; 870 KB for all 16). Each card prints neighbourhood, town · month and trades exactly as `photos.json` has them.
- **The thread.** One string through all 16 pins, in a serpentine order computed from the real layout (so it re-lays itself on resize), looping round the outside of the cards where it changes row so it never cuts through a photo; a damped-string simulation (fixed-step, relaxes to its sagging rest shape). It is **drawn as you scroll**; each card **drops in with a spring and its pin pops** at the moment the thread reaches it.
- **Physical response.** A soft breeze runs across the cards in view every few seconds (a wave of swing, a ripple in the thread). The mouse **plucks the thread** and **swings the cards it passes** (a spring per card, rotating about its pin). Hover straightens and lifts a card, zooms the photo, shows a lime "+" and lifts its pin. Everything sleeps when nothing moves.
- **The sign post.** Seven street signs with the firm's tallies (Austin 541, Round Rock 110, Cedar Park 35, Leander 28, Pflugerville 28, Georgetown 21, Buda 8; all from `near.json`), counting up on entry. **Hover or focus** previews a town: its photos get a lime ring and lift, the others dim, and **threads are drawn from the sign's nail to each of that town's pins** (behind the cards, lime halo). **Click** locks it (`aria-pressed`, the sign swings like a hung sign); click again or Esc releases. Hovering a card lights its own sign and draws its one thread.
- **Readout (aria-live).** Town, tally, "N photos pinned here", and the neighbourhood names from the firm's own place records (names only, no counts); says "No pinned photo of garage doors here yet" when a town/trade pair is empty.
- **Trade chips** (a radio group with arrow keys): All trades + the trades that actually appear on the board (Siding, Windows, Shingle Roofing, Metal Roofing, Exterior Painting, Gutters, Doors, Garage Doors, Patio Covers); they combine with the town.
- **The viewer** (native modal `<dialog>`, focus-trapped in script): a click or tap on a card opens it **from the card's own position** (FLIP, a small swing), showing the photo large and the record exactly as in the data ("Anderson Mill West, Cedar Park · Aug 2026 · Siding & Exterior Painting"), "Photo 3 of 16", position dots, the firm's tally for the town, "Show Cedar Park on the board" (closes and locks that sign), and an internal "Book a free inspection" (`#booking`). Prev/Next, ← →, swipe, Esc, backdrop click, Tab trapped; it browses only the cards matching the current filter. Focus returns to the card.
- **Town finder** (type-ahead combobox over the firm's 56 cities and 196 places): choosing a town with a sign selects it; choosing e.g. Bastrop shows "6 documented projects, no photo pinned"; a place like "Maple Run, Austin" says it is in the records with Austin's tally; a miss says "Not in our records yet. Call (512) 550-0000 and ask."
- **End of section:** "Your street not on a sign? Call and ask." with the internal Book button (`#booking`) and the tel: link.
- **Reduced motion:** no breeze, no drop, no flip, no count-up, no string; the thread is fully drawn, every card in place, a town's threads appear at once; the viewer opens at once. **Touch:** no hover dependence (hover styles are inside `@media (hover:hover)`); a tap selects a sign (and on phones scrolls to the first lit card) or opens the viewer; swipe in the viewer.
- **Keyboard:** chips and cards are roving groups (arrows, Home/End; one tab stop each), signs move with ↑↓, Esc clears the selection, the finder follows the combobox pattern, 3 px focus rings everywhere.

**Background treatment:** the kit's **Area art** (Hill Country contour rings far, road and river ribbon near; inlined with renamed ids, two-layer scroll parallax) on a dim sage gradient (#EEF3EE to #F1F5F1 to #ECF1EC); the board is a frosted green-tinted board (#E9F0EA to #E3EBE5) with a dot grid and four screws; the paper is #FBFCF8; the squiggle thread under the heading draws itself. Nothing is pure white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Pinterest boards** (a board of pinned photos, a row of topic chips that filters it, and a close-up viewer that steps through the same set). **Transfers:** chips filter the board in place with a clear selected state; the close-up follows the filter; photo-first cards. **Does not transfer:** their infinite masonry, user content, sign-in and tracking prompts, their type and look; the physical thread, the street-sign post, the pins and every number here are this firm's and this build's own.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Area | ⟦S1434⟧ visual-hierarchy: the heading and the 886 line, then the chips, then the board and its post; ⟦S1426⟧ law-of-proximity: each card's record sits under its photo, each sign's count sits on its sign; ⟦S0220⟧ anti-slop: only the firm's photos, records and tallies; no "since 2018", no invented claim, no sum |
| Element | signs, chips | ⟦S1444⟧ one choice at a time (one town, one trade; radio group with arrow keys); ⟦S1454⟧ serial-position: Austin first and the 541 largest, All trades first; ⟦S1494⟧ plain labels ("Pick a town to pull its threads", "Show Cedar Park on the board") |
| Motion | thread, cards, signs, viewer | ⟦S1436⟧ animation-principles: spring settle with overshoot on cards and pins, follow-through on swing, anticipation (the thread arrives, then the card drops), stagger from the sign down the threads; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transforms and one path only, one loop that sleeps when nothing moves, **no CSS keyframes in the section** (a first version with 16 keyframe sways doubled frame time in software rendering and was replaced); ⟦S0400⟧ accessible-animation: reduced-motion path is fully static, nothing runs by itself |
| Element | all controls | ⟦S0054⟧ fixing-accessibility: real buttons, `aria-pressed`/`aria-checked`, combobox ARIA, a polite live readout, native modal dialog with an explicit Tab trap and focus return, 3 px rings; ⟦S1441⟧ fitts-law: every target ≥ 44 px (measured at 4 widths and in the viewer on a phone), the sign tabs 52 px, the viewer arrows 56 px |
| Site | weight | ⟦S0231⟧ web-performance: 16 photos as 870 KB of WebP data, 21 KB CSS and 29 KB JS (unminified), no library; the whole page 3.5 MB (22.5 MB ceiling) |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `area-states-1440.jpg` (top · board · town lit · trade chip · card hover · viewer), `area-phone-390.jpg` (top · town · board · viewer), `area-1440-top/board/town/chip/hover/viewer/finder/reduced/focus-sign/focus-card.png`, `area-1024.png`, `area-390-*.png`, and the **before** shots `area-old-1440.png`, `area-old-390.png`. **73 of 73 checks pass** (`tools/area_test.js`, Chromium, headless software rendering):

| Check | Result |
|---|---|
| Lock, claims | The 886 line is exactly "886 projects: 312 on the map with photos + 574 more counted"; no "since 2018"; no 771 or 115 (sums) anywhere; heading exact |
| Data | 7 signs in order, each count equal to `near.json` (compared at test time) at the data attribute, the number and the count-up target; 16 cards, each record, caption and trades equal to `photos.json`; each card's town = the city part of its place; every one of the 7 towns has a photo; 16 distinct photos, all decoded |
| Links | Only `#booking` and `tel:`; no `target=_blank`, no `window.open`, no firm website in the section |
| Thread | Starts undrawn, grows with scroll (7 cards at the first stop, 16 when drawn); settles to < 1 px; the loop is asleep when idle |
| Signs | Hover lights that town's cards, dims the rest, draws its threads and lights the sign; leaving restores everything; click locks (cards stay lit after the pointer leaves); the readout names the town and tally; click again releases; ↓ and Enter work; Esc clears |
| Chips | A trade lights exactly its cards; town + trade combine; empty pair is said honestly; arrow keys select; hovering a card lights its own sign with one thread |
| Viewer | Opens modal with the exact record, counter, tally and `#booking`; → and ← step and wrap 16↔1; 12 Tab and 12 Shift+Tab never leave it; Esc returns focus to a card; backdrop and Close work; "Show town" locks the sign; follows the active chip (3 photos with Patio Covers); card focus ring 3 px |
| Finder | Matches from the firm's cities and places; Round Rock selects its sign (110); Bastrop shows 6 and clears signs; a miss gives the "call and ask" line |
| Contrast, fonts | All text ≥ 4.5 (lowest 5.92, the small caption grey on paper); pressed sign 7.93 / 11.75; Montserrat and Inter only |
| Robustness | A 160-action random run (clicks, keys, hovers, typing, scrolling): at most one sign pressed, exactly one chip, a consistent board, no overflow, 0 errors |
| Idle | The loop sleeps between breezes (11 of 18 samples asleep), no CSS animation runs in the section, median frame time 16.7 ms |
| Pointer | The mouse plucks the thread (7.8 px) and swings cards; everything returns to rest and the loop stops; resize re-lays the thread |
| Reduced motion | No animation or transition, thread fully drawn, 16 cards in place, numbers final at once, threads at once, viewer opens at once, 0 errors |
| Touch | Tap on a sign selects and lights its card; tap on a card opens the viewer; swipe left moves on; viewer controls ≥ 44 px; the viewer fits the phone |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390: page not wider than the screen, nothing in the section beyond the edges, signs inside the board, caption clear of the post, every target ≥ 44 px, cards do not overlap, 0 errors. Also measured over the whole page: no unclipped element beyond the viewport outside this section |

## 5. Defects found and fixed

1. **Thread simulation exploded** (displacements of 10 000+ px) when the frame step was scaled; replaced by fixed sub-steps with damping and a cap.
2. The thread **flattened into straight lines** at rest (it pulled toward its neighbours, not toward its sagging shape); it now relaxes to its own rest shape.
3. The thread was **hidden behind the cards**, and the row-to-row hops cut straight through card bodies; the string now runs in front of the card tops with the pins above it, hops round the outside of the cards, and the town threads run behind the cards so photos and text stay readable.
4. A finder message for a place was **overwritten 40 ms later** by the debounced readout; one state model (`found`) now owns it.
5. "35documented" had **no space** in the text (screen readers and copy); fixed.
6. **Esc could leave the viewer open** if the close animation's finish event was late; a timeout fallback closes it.
7. The loop **kept running while the mouse rested on the board**; it now sleeps when nothing moves.
8. A first version used 16 CSS keyframe sways; in software rendering it **doubled the frame time (16.7 to 33 ms)**. Replaced by the JS breeze, which sleeps between gusts.
9. At 768 px the two-column cards were 330 px wide and overlapped, and the left hop cut through a card; now three columns at 621 to 900 px and the hop is measured from the real card edges.
10. After click-release or Esc, a focused sign kept showing the hover preview; Esc now clears it too.
11. A card photo could flash grey before it decoded; photos are pre-decoded.
12. My own test mistakes, corrected rather than hidden: reading numbers mid count-up, firing the pointer test at an off-screen point, reading contrast mid-transition, running the finder test after the fuzz run.

## 6. Remaining, named honestly

- **Testing:** Chromium only, headless software rendering; touch tested with emulated events, not a phone; not tested in Safari or Firefox (`:has()` for the pin lift, `overflow: clip`, the dialog `::backdrop` blur are the features to check; the first only changes a cosmetic).
- **Contrast** was computed against the section's known background colours, not sampled pixel by pixel; the kit art sits under the heading, lead and lock lines (their ratios are 7.9 to 15.7, a wide margin; the kit's own note says thin line crossings can dip the muted grey).
- **Photos:** 16 of the 43 in `photos.json` (the data holds only 43; the "312 on the map with photos" is the lock wording, not a claim about this board). Photos 2, 28 and 33 are also in the Booking record's job list and 36 (Buda) is the hero's job (a tight crop, not the full frame). Photos are 420 to 640 px, a little soft in the viewer at 2x pixel density.
- **Neighbourhood names** in the readout come from the firm's place list in `near.json` (counted per town, names only). Austin's tally is `near.json`'s 541 (the FACTS conflict 539 vs 541 noted by prep is not resolved by me; 541 is the finder's published figure).
- The old wood signs became green street signs (a design change inside "kept the overall design"); fan threads show faintly through dimmed cards.
- **Shared files, for the main session (I did not touch them):** `parts_ported.globals_js()` still injects `window.__JOBS` with the **8 card photos and 8 `href`s to the firm's real site** (data only; my section no longer uses them, but any module that renders `href` from it would link outside) and `window.__AREA`/`__NEAR`, which Area no longer needs; `.lineview` (the 390 px item in your Windows note) is in `rev.css` (Reviews). In the page's screenshots the site-wide cursor follower (ring and companion) is visible; it is not part of this section.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A calm dim board, paper cards with real photos, a thread that passes through every pin and routes round the cards, street signs in the brand colours, lit cards with a lime ring and threads from the sign (`area-states-1440.jpg`, `area-1440-town.png`). **Minus:** card rows are naturally uneven (by design, but a little ragged); town threads show through dimmed cards; the viewer's photo is small at 2x |
| Usability (30) | **8.7** | Hover, focus and click on a sign, chips, a viewer that follows the filter, a finder, arrows and Esc everywhere, touch and reduced-motion paths, targets ≥ 44 px, a readout that says what happened; 73 checks and a 160-action fuzz run clean. **Minus:** the sign list and the finder sit beside a tall board on tablets and phones, so on phones a selection scrolls you to the first lit card instead of showing the whole result at once |
| Creativity (20) | **8.6** | A string drawn as you scroll with cards dropping at the moment it reaches them, a breeze that runs across the cards, a card that opens from its own spot, threads pulled from a sign to its photos. **Minus:** the pinboard and pulled-thread idea is a known pattern |
| Content (10) | **8.6** | Only the firm's photos, records and tallies, each compared with the data files at test time; the lock wording exact; nothing summed. **Minus:** three photos are shared with other sections, and the photos are few next to the 312 |
| **Weighted** | **8.55** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.7 + 0.2 × 8.6 + 0.1 × 8.6 = 3.36 + 2.61 + 1.72 + 0.86 = **8.55**.

## 8. Sub-agent use, stated honestly

Built by a sub-agent under the main session's brief. The earlier prep sub-agent's Area report (`prep/area/REPORT.md`, `area-wall.jpg/json`, the kit background art) was the input; I designed, built, tested and gated the section myself. Files: `parts_area.py`, `src/area.css`, `src/area.js`, `assets/area/p*.webp`, `tools/area_prep.py`, `tools/area_test.js`, `tools/area_shots.js`, `tools/area_focus_shot.js`. Build: `OUT=out/final-area.html python3 build_final.py`; test: `node tools/area_test.js`. No background tasks; nothing committed or pushed.

## 9. Next: Sections 10 and 11, Booking (C then J) and the Footer

**Consult-first plan:** Booking C ("the record, then the call") with the phone and email shown in the section, then the J receipt opening at the end with one button to the Contact page (no form on the homepage); note the Booking record reuses photos 2, 28 and 33 that Area also shows, and `window.__JOBS` carries real-site hrefs that must not be rendered; then the footer upgrade (more interactivity, more SVG life); finally one full-page pass on `final.html` at 4 widths with all 11 sections in place.
