# GATE: Upgrade Round 5 — On your street + Booking + header/footer · HOMEPAGE COMPLETE

**Date:** 2026-11-03.
**Under:** AUSTIN-UPGRADE-BRIEF, plus the process note of 2026-11-03.

**This is the last build round. The homepage is now complete inside the one HTML file.** Per the owner's order relayed by Muse, I **stop here** and deliver the homepage for the **joint verification**:
1. Muse audits it against the skills.
2. The owner then reviews the HTML himself and gives his own verdict.

Inner pages stay frozen and begin only when **both** pass the homepage. I am not starting anything else.

**File:** `siding/redo/site/out/site.html` (one file, 13.4 MB).

**How to view:**
- **Review mode:** `site.html?review`. The switcher at the bottom right lists every version of every section.
- **My recommended set in one link:**
  `site.html?review&hero=4&services=d&vis=d&windows=d&reviews=d&process=c&try=d&area=c&book=d`
- **Default view:** unchanged (the current set) until the owner picks winners, per §3.

---

## 1. On your street: the new versions as they landed

### C: Drive round our jobs
Screens: `u5-area-c.jpg` · `-1440-0/1/2.jpg` · `-768-0/1/2.jpg` · `-390-0/1/2.jpg`

- **Reference:** Bruno Simon, **scoped as the annex says**: the project map is the one explorable section, and nothing more.
- **The map:** every documented project in the firm's own project-finder records, drawn as a dot at its position in the finder's map.
  - Lime-ringed dots have photos on the firm's site.
  - The office (7801 N Lamar) is a lime square, with town names and a 5-mile grid.
- **The van:** a small van (drawn top-down; not 3D) can be driven three ways:
  - by clicking or tapping where to go;
  - by the arrow keys or WASD on the focused map;
  - by the town buttons (Austin, Round Rock, Cedar Park…).
- **What the drive shows:**
  - The jobs it passes light up.
  - A read-out names the latest one: neighbourhood or town, month, trades, and "photos on our site" where true.
  - A counter shows the projects passed on this drive.
- **Controls:** filters for all work, Siding, Windows, Roofing and Painting; "Whole area" or "Close up" (the camera follows the van).
- **Wording:** the 886 wording is verbatim in the lede, and **no dot count is claimed** (see §5, data question 1).
- **Reduced motion:** the van moves straight to each target (no animation).

### D: Every town, ranked
Screens: `u5-area-d.jpg` · `-1440-0/1.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **Reference:** Dropbox Brand (subtraction, big type, plain bars).
- **The ranking:** towns ranked by documented projects, using the finder's own per-town tallies, the same figures versions A and B show (Austin 541, Round Rock 110, Cedar Park 35…).
- **Arrival:** the bars grow and the numbers count up once.
- **Opening a town shows:**
  - its neighbourhoods with their counts (the top 12);
  - the work done there as small bars.
- **The rest:** the remaining towns sit behind "And N more towns".
- **Spellings:** the records spell a few towns loosely ("ROUND ROCK", "san Marcos"). They are normalised to the finder's town names.

## 2. Booking: the new versions as they landed

### C: The record, then the call
Screens: `u5-book-c.jpg` · `-1440-0/1/2.jpg` · `-768-0/1.jpg` · `-390-0/1.jpg`

- **Reference:** Scout Motors (heritage told as a film roll, sequenced proof).
- **The film roll:** a strip of frames runs up through a dark-green gate with sprocket edges as the visitor scrolls. It rests on each frame, then pulls the next, with a slight motion blur.
- **The six frames:**
  1. Since 2009.
  2. Merged with Sanders Roofing & Exteriors, 2018.
  3. 886, with the locked wording.
  4. The credentials.
  5. 4.9 from 474 Google reviews, with stars on the aggregate only.
  6. "Next: your house."
- **Always in reach:** the live open/closed status (Austin time), Book, Call, and "Nothing is sent from this page."
- **Phones:** the frames stand in flow.

### D: One number
Screens: `u5-book-d.jpg` · `-1440-0.jpg` · `-768-0.jpg` · `-390-0.jpg`

- **Reference:** Dropbox Brand (the subtraction-discipline closing).
- **The number:** (512) 550-0000 set as wide as the page allows, as one call link.
  - Its figures rise in on arrival.
  - They lean up toward the pointer as it passes.
  - A double lap course (green, then lime) draws under it.
- **Below:** one line, the booking button, the live status, the hours, the address and the email.
- **The world:** the number sits on a white plate, so the background world never shows behind the digits.

## 3. Header and footer treatment (§4, Round 5)

- **Header:**
  - A lime reading line under the bar fills as the page is read.
  - The bar steps out of the way while reading downward and comes back on any move up. It never hides while its menu is open or anything in it has focus.
  - On wide screens a small chip names where you are ("Windows", "Process"…).
- **Footer:**
  - The boards now sit on brand tints (pale greens). The old cream is retired with the white ground.
  - They stand up one after another as the footer arrives, like boards going up a wall.
- **Anchors:** with Services D live, the menu's Siding and Roofing links had nowhere to land. Services D now carries those anchors and opens the matching trade.

## 4. Corrections folded in

| Correction | Done |
|---|---|
| **Phone sideways rows need an arrow hint beyond the clipped edge** (brief §6) | On every sideways row on phones (Services B words, Visualiser B steps, Reviews B line, On your street A cards), an arrow button now sits at the clipped edge. It nudges twice when it first appears, scrolls the row by 80 %, and disappears at the end. A back arrow appears once scrolled. Measured: all four rows overflow, the right arrow shows, a press scrolls 100–353 px, and the left arrow appears (`u5-fix-phone-arrows-390.jpg`). Try B already had arrows |
| **The hero "Move to look around" hint looped** (S0489: UI chrome plays a moment, not endlessly; open since Round 1) | It now plays twice and stops (measured: iteration count 2 on heroes 2 and 3, the two that carry it) |

---

## 5. Tests (Playwright, SwiftShader GL; final runs)

| Check | Result |
|---|---|
| On your street C | 0 errors, 0 overflow at 1440 / 768 / 390.<br>"Round Rock" button drives the van there (about 60 projects passed), and the read-out names the job (e.g. "Chisholm Valley West, Round Rock · Oct 2025 · photos on our site · Siding, Exterior Painting").<br>Holding ArrowUp drives on (+10–13 passed).<br>Filters and both views work. Reduced motion: the van goes straight to Cedar Park |
| On your street D | 0 errors, 0 overflow. Counts 541 / 110 / 35; opening Round Rock shows 12 neighbourhoods and the work bars (Siding 59, Shingle Roofing 46, Exterior Painting 43, Windows 43) |
| Booking C | 0 errors, 0 overflow. Frames 01 → 03 → 06 by scroll; live status "Open now, until 8 pm Austin time"; Book links to the firm's scheduling page; flow on phones |
| Booking D | 0 errors, 0 overflow. `tel:+15125500000`; the number fits at every width (1319 / 704 / 357 px) |
| Header and footer | Hides on reading down, returns on up; chip reads "Windows"; reading line moves; footer boards stand up |
| Phone arrows | §4 |
| **Whole page, default set** | Load 0.49 s (1440) / 0.44 s (390). 1 h1. 0 errors, 0 console errors, 0 overflow. 0 dangling links, 0 duplicate ids, 0 unnamed controls, 0 images without alt. Reduced motion: no errors. No-JS: 8 headings and the full text present |
| **Whole page, two mixed sets of the new versions** (hero 4 / services D / vis D / windows D / reviews D / process C / try D / area C / book D, and hero 3 / C / C / C / C / D / C / D / C) | At 1440 and 390: 0 errors, 0 overflow, 0 duplicate ids, 0 unnamed controls, 0 images without alt. 0 dangling links after the Services D anchor fix |
| **Locks** | (512) 550-0000 is the only phone number. 4.9 / 474 is the only rating. Address, email, hours and the 886 wording are present and exact. No "5,000", no "steel" |

### Defects found and fixed this round

| # | Defect | Fix |
|---|---|---|
| 1 | On your street D: `.more` collided with the global menu style | Renamed |
| 2 | On your street D: town counts came from the raw records (Austin 539, Leander 27) and differed from the 541 / 28 that versions A and B show; loose spellings split towns | Counts now use the finder's own tallies; spellings normalised |
| 3 | Services D: no `#siding` / `#roofing` anchors, so two menu links were dead when D was live | Anchors added; they open the matching tab |
| 4 | Booking D: the world revealed behind the giant number under the pointer | The number sits on a white plate |
| 5 | Process C (Round 4): the first step was still unlit when the section arrived | The reading line was moved to 78 % of the screen; step 1 is lit on arrival (Round 4 screens refreshed) |

### Remaining, and the questions for the joint verification

1. **Data question (please rule).** The finder records behind On your street C/D hold **883** located projects, **315** of them flagged with photos. The locked wording says **886 = 312 + 574**.
   - I show the locked wording verbatim and **claim no dot count**.
   - If the owner wants a count on the map itself, the figures need reconciling first.
2. **Real hardware is untested** across the whole file (software GL here): the world, depth heroes, the dive and the van in particular.
3. **The world illustration** is still my pictogram art. The Round 1 request for real layered art stands.
4. **The touch world reveal behind copy on phones.** My Round 3 proposal (cap it and let it fade faster) is still not applied, pending your word.
5. **File weight is 13.4 MB.** Almost all of it is embedded photos and the old hero film (archive versions A2–A5). Once the owner picks winners, the losing versions' media can move out of the default file.

---

## 6. Skill ledger (§7)

**Read in full this round:** none new. The skills below were read in full in Rounds 1–3.

**Applied:** S1326, S1330, S0489, S0405, S1329, S0054, S1442, S0618, S1425, S1358, S1362, and the critique set S1473 / S1479 / S1482 / S1496–S1501.

| Level | Item | Skills (tag → how used) |
|---|---|---|
| **Site** | Header reading line, hide and show, where-you-are chip | S0489 (motion that informs; never while focused or menu open), S0054 (chip is `aria-hidden`; the landmarks carry the names) |
| Site | Footer boards | S0083 / S1436 (stagger, follow-through), S1496 (brand tints) |
| Site | Phone sideways arrows | S1259 (44 px targets), S0054 (named buttons), S0489 (nudge twice, not forever) |
| Site | Hero hint | S0489 rule (UI chrome plays a moment) |
| **Section: On your street** | C and D | S0220 (the firm's records only; the lock verbatim; no invented count), S1501 (C: the van and read-out; D: the town names) |
| Section: Booking | C and D | S0220 (locks verbatim; nothing sent or saved), S1501 (C: the frame in the gate; D: the number) |
| **Element** | Area C map and van | S1330 (eased camera follow, damped steering), S0054 (keyboard driving, town buttons as the accessible path, live read-out), S1326 (reduced motion = direct moves) |
| Element | Area D ranking | S0618 (accordion semantics), S0083 (count-up once) |
| Element | Booking C film gate | S1326 (pinned, scroll is truth, rest-then-advance mapping), S1330 (blur from velocity, damped) |
| Element | Booking D number | S0405 (pointer field lift), S1329 (staggered rise), S1425 (white plate keeps the figure clear) |

**Critique pass before gating:**

| Skill | Finding | Status |
|---|---|---|
| S1473 H1 visibility | Area C: the read-out and counter always say what the van passed | OK |
| S1473 H7 flexibility | Area C: click, keys, or town buttons | OK |
| S1479 critique | The world crossed the Booking D number | Fixed (#4) |
| S1496 brand | Footer cream retired; green, lime and white only; no steel | OK |
| S1498 composition | Booking D is deliberately almost empty (subtraction) | OK |
| S1482 QA | §5 | Checked |

---

## 7. Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10; PASS ≥ 7.0, none < 6.0, zero vetoes)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| On your street C, Drive round our jobs | 8.2 | 8.0 | 9.0 | 8.6 | **8.34** | PASS. My pick |
| On your street D, Every town, ranked | 8.2 | 8.6 | 7.4 | 8.8 | **8.22** | PASS |
| Booking C, The record, then the call | 8.4 | 8.0 | 8.4 | 8.6 | **8.30** | PASS |
| Booking D, One number | 8.6 | 8.8 | 7.6 | 8.0 | **8.40** | PASS. My pick |
| Header and footer treatment | 8.0 | 8.4 | 7.2 | n/a | n/a | Landed |

These are my own scores. Muse and the owner judge.

**Vetoes: none.**

---

## 8. The whole homepage, as delivered

| Section | Versions (all in the switcher) | My pick for the owner |
|---|---|---|
| Hero | 1 (backup), 2 depth window, 3 pinned dusk portrait, **4 title between sky and house**, 5 lap courses, 6 three-house deck; archive A2–A5 | **4** |
| Services | A sideways sequence, B word switcher, C counted chapters, **D split cover, real jobs** | **D** |
| Visualiser | A swatch fan, B snap-together wall, C colour fields, **D the instrument** | **D** |
| Windows | A morning to midnight (room fixed), B bay, C taken apart, **D window jobs on record** | **D** |
| Reviews | A 4.9 in lap courses, B hanging tags (dialog fixed), C reading pace, **D ask the neighbours** | **D** |
| Process | A stacked chapters (phones fixed), B pinned wall (phones fixed), **C the plumb line**, D four columns | **C** |
| Try the job | A pinned sideways, B swipe rail, C the workbench, **D the dive (the owner's Lusion idea)** | **D** |
| On your street | A thread board, B street finder, **C drive round our jobs**, D every town | **C** |
| Booking | A work order, B press the board, C the record, **D one number** | **D** |

**Recommended-set sheets:** `homepage-picks-1440.jpg`, `homepage-picks-390.jpg`. Every round's screens are in `siding/redo/site/gate/` (`u1-*` … `u5-*`).

## 9. Stop

The homepage is complete. **I stop here for the joint verification:** Muse's skills audit first, then the owner's own review and verdict. Inner pages stay frozen until both have passed the homepage.
