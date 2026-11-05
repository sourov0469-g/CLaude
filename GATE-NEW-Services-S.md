# GATE — Services S, "Start from the problem" (upgrade plan S-A)

**Under:** AUSTIN-UPGRADE-PLAN-2026-11-05 (passed by Muse; build order: weight, Hero, Booking, Services), AUSTIN-CONSULT-FIRST, Muse's binding consult reply on Services S-A (five decisions), and the owner's order of 2026-11-05 evening (sub-agents preferred, up to 2; section backgrounds with life).

**Consult reply, as applied:**
1. **Tile 6, "Rot and water damage": typographic.** Large words on the pale-green ground, no photo, no number. It opens to "One free inspection covers every trade on the house." and "The inspection and estimate are free." plus the Book button. Photos #28 and #23 are not used anywhere in the section (tested).
2. **Tile 1 photo: #3** (Maple Run, Austin, Jul 2026). #0 is not used. The Visualiser gets a different photo (see the NEXT PLAN).
3. **Tile 2: #39**, caption "Doors & Windows" (its record: Heritage Hills, Austin · Nov 2025). Windows and Exterior doors counts are shown separately and never added.
4. **Tile names are the firm's own list lines**, including "Roof and flashing" and "Paint and caulk". Only the roofing count (shingle 210 and metal 31, never summed) and only the exterior-painting count (320) are shown; nothing numeric about flashing or caulk.
5. **Weight: the cheaper option.** Only #37 is new. #3 and #39 reuse the page's existing 680 px copies, #33 the 640 px copy, and #10 the 1400 px copy already in the page (the weight pass stores identical copies once).

**Sub-agent use, stated honestly (the owner now prefers it; two were used, the maximum):** two prep sub-agents ran in parallel with my build and wrote **only** under `siding/redo/prep/`; neither touched the build, the page, git or any gate. I checked their reports and their file lists (git status shows only prep paths from them).
- **Agent 1, Visualiser photo re-selection** (because #3 is now Services' photo): chose **#41**, recorded in the NEXT PLAN below. It also added one line to the prep script `prep/visualiser/build.py`; its own REPORT-v2.md was refused by the tool, so its findings are in this gate instead.
- **Agent 2, section background art kit** (Visualiser, Windows, Reviews, Process, Area, Try; Services too): 7 SVG sets in `prep/backgrounds/`. **I did not use its Services set**; I drew this section's background myself (below). The kit is for the later sections.
- **The build, the tests, the gate and the Services background were done by this session alone.** No background tasks were used for them (the 258-view sweep ran as four parallel local processes of my own test script).

## Result

**`?services=s` is now the shown default** (`LIVE services = 's'`). Services A (the pinned 3.3-screen version) is parked as a hidden in-file backup like the other 13 (nothing deleted). L, M, N and the rest stay as hidden backups.

**What it is:** a question and six tiles. The heading is plain (my wording, flagged below): "What does your house need?" with the hint "Pick one to see its record."
- **The six tiles** are the six lines of the firm's published inspection list, in its order: Siding and trim · Windows and doors · Roof and flashing · Gutters · Paint and caulk · Rot and water damage.
- **One is always open** (the first, by default) at the head of the grid: a real job photo on the left, the firm's record on the right: the trade, the documented count set large, the median band, the firm's own sentences, the photo's own record ("Photo: place · month · trades. See this job", linking to that job's page), and the one filled **Book a free inspection**. The other five sit beneath as a row of photo tiles.
- **Picking a tile** moves it to the head and opens it; the previous one goes back to its place in the row; the others glide to their new positions (FLIP: transform and opacity only, 380–440 ms). The one Book link moves into whichever tile is open, so **the section contains exactly one Book link**.
- **What each tile may say** (all checked in the test, below): Siding 431 · $10k–$15k (415 priced) · the 1-to-2-weeks sentence and the soffit-and-fascia sentence; Windows 388 · $10k–$15k (376 priced) and, separately, Exterior doors 109 · $2k–$5k (96 priced) · "Most of the window-only jobs in our files took two days on site."; Roof: Shingle roofing 210 · $10k–$15k (204 priced), Metal roofing 31 · $20k–$25k (29 priced) · "The inspection and estimate are free."; Gutters 121 · $2k–$5k (109 priced); Paint: 320 documented exterior painting projects · $2k–$5k (317 priced) · the two published painting sentences; Rot: only the firm's two sentences. The published footnote sits beneath, verbatim.
- **Live unit:** the FLIP re-flow, plus a 4 px lift on collapsed tiles for a fine pointer. **Touch:** tap. **Reduced motion:** the choice swaps with no animation, no lift.
- **Keyboard:** the tiles are buttons with `aria-expanded`; arrow keys (and Home/End) move between them, Enter or Space opens; the open tile's button is `aria-disabled` (one is always open), and a 3 px deep-green focus ring shows.
- **Phone and tablet:** the open tile first (photo on top at 16:6, then the record), then the five other tiles as one row that scrolls sideways, so the section stays at about one screen.

**Background treatment (new owner order):** a drawn scene of the firm's own trade, quiet and cheap, on two layers.
- **Far layer:** a drawn house elevation on lap-siding lines (peeking over the feature and down the right margin), two soft lime glows, a dashed ground line.
- **Near layer:** a lime gutter run with its downspout (top right), a hand-painted lime stroke and a row of small drawn gables along the foot (a street), a faint dot texture fading from the top right.
- **Scroll life:** the two layers drift at different speeds (24 px and 64 px over the section's pass) as the section crosses the screen: transform only, one `requestAnimationFrame`, only while the section is on screen; none under reduced motion. Strokes at most .26 opacity; nothing behind text; both layers inline, **about 2.9 KB in all**; no global engine, no 3D.

**Files:** `svcS()` in `build_site.py` (markup, photos, text, background art), `src/sec/svc9.js` (`Svc9.wire`) and `src/sec/svc9.css` (class prefix `svs`). Nothing else changed.

**Weight:** +173,842 bytes: **13,082,134 → 13,255,976** (ceiling 22.5 million; target ≤ 14.5 million). That is #37's new copy (960 px), the code and the background art.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`): `new-services-s-1440-0` to `-1440-5` (each tile open), `-768-0`, `-1024-0`, `-390-0`, `-390-4`, `-390-5`, `-bg-1440` and `-bg-390` (the whole section with its background); sheets `new-services-s-1440-sheet.jpg` (all six tiles open) and `new-services-s-small-sheet.jpg` (phone ×3 and tablet).

Fixed-state tests (Chromium; locks read from `photos.json` and `faq.json` at test time): **76 of 76 checks pass.**

| Check | Result |
|---|---|
| Tile names and order | Equal to the firm's six list lines, in order |
| One Book link | Exactly one in the whole section, in every one of the six states; its href is the firm's booking page |
| No form | No input, textarea, select or form |
| Counts and bands | For each tile, the numbers and bands shown equal the allowed list exactly (nothing extra, nothing summed: no 241, no 497; none for flashing or caulk; none for rot) |
| Sentences | Every sentence is found verbatim in the firm's FAQ, or is the firm's inspection sentence |
| Photo records | For tiles 1–5 the caption and link equal `photos.json` (place, month, trades, href) exactly; no photo is described beyond that |
| Tile 6 | No photo, no number, only the two sentences |
| Banned photos | No record of #0 (Feb 2026), #28 (Block House Creek) or #23 (Siding & Doors) appears in the section |
| Photos never upscaled | Natural width ≥ rendered width for every tile photo at 1440 (e.g. 680 against 560) |
| Exclusive opening | One tile open at a time; the open tile is in the head slot; the others in the row |
| Keyboard | Arrow, Home, End, Enter and Space all work; focus stays on the tile; solid 3 px focus ring; clicking the open tile does nothing, so none is ever left empty |
| Motion | Picking runs FLIP animations on the tiles (transform and opacity only; the site's own button-press scale on the tile button is excluded); reduced motion: 0 animations |
| Hover | A collapsed tile lifts 4 px on a fine pointer |
| Touch | A tap opens a tile at 390 |
| Contrast (WCAG) | All ≥ 4.5: the smallest text is the grey record line on the pale-green panel, 5.7 (footnote and hint 6.1); counts 16.5; bands 11.7; sentences 8.3 |
| Fonts | Montserrat and Inter only |
| Height | Worst of the six states: 1.08 screens at 1440, 1.22 at 1024, 0.84 at 768, **1.07 at 390, 1.25 at 360** |
| Page errors and overflow | 0 errors; no overflow inside the section at 1440, 1024, 768, 390 or 360 (the page's 17 px at 1024 is Reviews B and Area A, the shown defaults of two later sections) |
| All views | **258 views** (every homepage version of every section plus every subpage): 0 page errors, 0 overflow, 0 unresolved images; the one flag is hero L's 8 intentionally empty `lim` images, identical before this change |
| Existing versions | Against the last committed page, images blanked and the weight pass's image ids normalised: **201 templates vs 200, with only `services:a` added** (the old default, now a hidden backup), **0 changed**; the body outside the services slot is identical |

## Defects found and fixed

1. **The open tile's photo looked washed out.** The site's global style for disabled buttons (45% opacity, desaturated) caught the open tile's `aria-disabled` button. Fixed with a local override.
2. **The phone version was 1.62 screens** (three rows of tiles under a long panel). The five other tiles became one sideways-scrolling row; the worst state is now 1.07 at 390.
3. **360 px wide went to 1.35 screens:** tightened the smallest-width type and padding; now under 1.3.
4. **The first background was hidden behind the opaque tiles** (the house and street sat where the tiles are). Moved to the margins and the foot, where it shows; the near layer is bottom-aligned so the foot art is not clipped.
5. **The typographic tile's button name was doubled** ("Rot and water damage" twice): the duplicate label is gone.
6. **Test harness only:** three tests read the tiles by DOM position, which changes when a tile moves to the head; they now read by tile number. One probe counted the site's own button-press animation; excluded and noted above.

## Remaining, named honestly

- **The heading is my wording.** "What does your house need?" and "Pick one to see its record." are plain, but they are not published firm copy (the plan asked for a homeowner's-problem opening). Say if you want the firm's own words instead.
- **Five tiles hide their numbers until opened.** That is the idea (one record at a time), but a visitor who only scans the row sees names and photos.
- **Three tiles carry only the firm's generic inspection sentence** (Roof, Gutters, Rot) because no other published sentence exists for them. I did not invent any.
- **The photos for the collapsed tiles are 640–680 px**, shown up to about 250 px collapsed and up to 560 px when open (never upscaled; slightly soft at 2× pixel density, as the weight decision accepted).
- **"Doors & Windows" tile shows glazed doors**, not a window, as the record says; the count line says "door projects" for doors.
- **The background is quiet by design** (strokes at most .26); on a very bright display the house elevation is faint.
- **Hover lift and the sideways row on tablets** are verified in Chromium only; no real device.
- **Page rules are not yet met** (three of nine sections done; baseline below).

**Page-rule baseline after this gate** (default page):

| Rule | Target | Now |
|---|---|---|
| Section height | ≤ 1.3 screens | Hero 1.0 / 1.2, Services **1.1**, Booking 0.8 / 1.1 ✓ (Process A 4.1, Try A 5.2, Windows A 1.5 on a phone still over) |
| Page length at 1440 | ≤ 10 screens | **16.8** (was 19.0) |
| Pinned sections | ≤ 1 | **2** (Process A, Try A; was 3) |
| Book buttons | ≤ 6 | 9 (6 in the page body; the rest are the header and mobile bar); Services has exactly one |
| Each number once | | Services holds 431, 388 (separately), 109, 210, 31, 121 and 320 once each in its own tile; still repeated by sections not yet rebuilt: **431 (Try A), 388 (Windows A, Try A), 121 and 320 (Try A)**; 4.9 ×3 and 474 ×2 are in Reviews and others. They clear as Windows, Reviews and Try are rebuilt |

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Services S | ⟦S1444⟧ one choice per step; ⟦S1426⟧ law-of-proximity: each trade's count, band, sentences and photo record sit together; ⟦S1434⟧ the open tile is the dominant object |
| Element | tiles and open record | ⟦S0453⟧ pricing-page: count and median band set large with the footnote verbatim; ⟦S0054⟧ buttons with `aria-expanded`, arrow keys, focus rings, 48 px targets; ⟦S1494⟧ plain labels; ⟦S0220⟧ only published words and counts |
| Element | photos | ⟦S0985⟧ critical-images: reused existing copies, explicit width and height, lazy for the row; ⟦S0956⟧ real alt text; never upscaled |
| Motion | FLIP | ⟦S1436⟧ eased re-flow (0.2, 0.8, 0.2, 1); ⟦S0062⟧ transform and opacity only; ⟦S0400⟧ reduced motion static |
| Background | drawn scene | ⟦S0060⟧ and ⟦S0062⟧: two layers at different speeds, transform only, one rAF, only while visible; ⟦S0400⟧ static under reduced motion; ⟦S0231⟧ about 2.9 KB |
| Site | contrast, locks | WCAG ratios measured on rendered colours; counts, sentences and records checked against the data at test time |

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | One large real photo with a clear record beside it, five quiet photo tiles beneath, a drawn trade-scene behind; the open tile dominates (`-1440-0`, `-bg-1440`). **Minus:** the layout (feature plus thumbnails) is a familiar form; one tile is type only |
| Usability (30) | **8.7** | Always one answer on screen; one action; arrow-key, touch and reduced-motion paths all verified; about one screen at every width; the pin is gone. **Minus:** the other five numbers are one click away; the sideways row on tablets needs a swipe |
| Creativity (20) | **8.0** | Starting from the homeowner's problem and letting the choice re-flow the section, with a drawn scene that drifts. **Minus:** the motion is restrained; the chooser form is not new |
| Content (10) | **8.8** | Every number, band, sentence and caption is the firm's and checked against the data; flashing, caulk and rot are not over-claimed. **Minus:** the heading is my wording; three tiles carry only the generic sentence |
| **Weighted** | **8.49** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.7 + 0.2 × 8.0 + 0.1 × 8.8 = 3.40 + 2.61 + 1.60 + 0.88 = **8.49**.

**On the score:** it sits level with Services M (8.57) and N, not above. The case for S-A is what it does to the page: it replaces a 3.3-screen pinned section with one screen, drops a pinned section, and shows six real jobs with the numbers the firm actually documents.

## NEXT PLAN — Visualiser V-A "Recolour a real Austin Pro house", for Muse's consult

Under the consult-first order and the upgrade plan Muse passed (V-A agreed and the recolour of a real job confirmed; label exactly "A real Austin Pro job, recoloured on screen. Colours are approximate; see real samples at the free inspection."). **Nothing below is built.**

### AUDIT — the Visualiser now
- **The shown default is Visualiser B ("Snap-together wall")**, 1.0 screen at 1440 and 1.1 on a phone; it is a drawn wall, not a house. Every one of the 14 versions shows a drawn or cartoon house; none shows a real job.
- **What works today:** the 17 ColorPlus colours and the trim list are published and already in the page; the section height is fine.

### The photo: decision needed
The earlier prep chose #3, but #3 is now Services' tile 1 (your ruling: the same job must not appear twice). Candidates, checked by the prep sub-agents against `photos.json`:

| Photo | Record | Assessment |
|---|---|---|
| **#36** | Ashford Park, Buda · Jul 2026 · Siding, Shingle Roofing & Exterior Painting | Earlier prep scored it 8/10 (clear lap walls, mask and previews already made: `mask-photo36.json`); dark trim and a flat grey sky |
| **#41** | Maple Run, Austin · Nov 2024 · Shingle Roofing, Siding, Patio Covers, Windows & Exterior Painting | Scored 7/10 by the re-selection agent (mask and 17-colour preview made: `mask-photo41.json`, 9.9 KB); evenly lit wall, little shadow to keep; the yellow soffit strip and the porch wall stay unrecoloured; its place label "Maple Run" matches tile 1's caption though it is a different job (aps-4216 against aps-4849) |
| #38 | — | Rejected: the same job as the hero photo #5 |
| #27, #1, #30, #2, #35, #24, #25, #29, #13, #17 | — | Rejected: no usable clear lap wall (branches, clutter, or the same job as another) |

### THE PLAN — V-A
| Element | What will be built |
|---|---|
| **The instrument** | One real job photo with the hand-traced siding mask; three steps, one choice each: **Colour** (the 17 ColorPlus colours, as already published in the page) → **Trim** (Arctic White or a contrast trim from the published list) → **Preview** (the original and the recoloured photo side by side, full width). The colour is a luminance-preserving multiply, so the photo's own boards, light and shadow stay real |
| **Ending** | A sample card: "Bring these to your inspection: [colour] · [trim]". Never claimed saved or sent. One filled Book button |
| **Label** | Exactly: "A real Austin Pro job, recoloured on screen. Colours are approximate; see real samples at the free inspection." |
| **Live unit** | The colour sweeps across the boards course by course (a clip wipe along the mask), a small lift on the sample card. Reduced motion: instant |
| **Background treatment** | The Visualiser kit from `prep/backgrounds/` (colour chips, a paint-roller stroke, tonal bands on #F6F8F6), two layers drifting on scroll, at most 3.7 KB; the wall photo itself stays untouched |
| **Height, weight** | ≤ 1.3 screens (target 1.0 at 1440); the photo's master is already in the repo; budget ≤ 200 KB new (mask ≈ 10 KB plus a 1400 px photo, shared with nothing else); the page stays under 14.5 MB |
| **Honesty rules** | The photo is never captioned as anything but its own record (place, month, trades); no claim about which colour is on the real house; colours approximate |
| **Retire** | Visualiser B stops being the default (hidden backup) |
| **Sub-agents** | Up to two, prep only, e.g. mask touch-ups and the sample-card layout study; declared in the gate |

**Why it should beat the best (M 8.57):** every Visualiser version shows a cartoon. V-A shows a real Austin house in the visitor's colour, which is the single most persuasive thing this section can do.

### Decisions for Muse (the consult reply)
1. **Which photo:** **#36** (my recommendation: better recolour score, mask already made, and it is a Buda job, not another Maple Run) or **#41** (clear siding wall but older, flatter and a second "Maple Run" caption)?
2. **Known recolour limits** (#36 and #41 both): trim and soffit on some photos stay their own colour unless masked as trim. OK to show them as "trim stays as shown" and let the Trim step recolour only where traced?
3. **The honesty label** is exactly as you ruled. Any extra line (for example "The brick stays brick")? My view: no, unless the photo has brick.
4. **Background treatment** for Visualiser: the drawn colour chips and roller stroke from the kit, kept off the photo. Agreed?
