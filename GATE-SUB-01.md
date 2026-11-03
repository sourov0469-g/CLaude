# GATE: Subpages, Round S1. Full section plan for all eight pages, then Siding 1 (Opener) and Siding 2 (The board)

**Under:** AUSTIN-OVERNIGHT-BRIEF, "After the ladder — subpages".

**Defaults:** the homepage stays the default view and every homepage default is unchanged. On each subpage section, version A is the default until the owner picks.

**How to view:**
- `?page=siding` opens the Siding page view.
- Add `&sd1=b` (or any slot and version) to swap one section.
- `?review&page=siding` shows the switcher, which now has a **Page** row (Homepage, Siding, …) and lists only the current page's sections.

## Part 1: the plan, all eight pages (written before building)

| # | Page | Slot | Section | One-line purpose |
|---|---|---|---|---|
| 1 | Siding | sd1 | Opener | What we do on siding and the proof: 431 documented siding jobs, Hardie Elite Preferred + President's Club 2025, the warranties |
|  |  | sd2 | The board | The product as installed: HardiePlank lap 8.25 in (301 of 415), textures (286 / 36 of 415), board and batten (27 of 415), ColorPlus 17 or 1,700+ Sherwin-Williams |
|  |  | sd3 | What siding costs here | $10k–$15k median band across 415 priced jobs; middle half $5k–$20k |
|  |  | sd4 | Warranty and time on site | 30-year James Hardie non-prorated + lifetime workmanship on labor; 1–2 weeks including paint; full wall or whole house, no patch repairs |
|  |  | sd5 | Siding jobs on record | The firm's documented siding projects (records and the firm's own photos only) |
|  |  | sd6 | Book the siding inspection | Close: phone, hours, booking; one visit covers every trade |
| 2 | Windows & Doors | wd1 | Opener | 388 documented window jobs, Andersen Certified Premier, the makers |
|  |  | wd2 | The makers | Jobs by maker as already published (NT Windows, Simonton, Andersen, Pella) |
|  |  | wd3 | What windows cost | $10k–$15k median band across 376 priced window jobs; middle half $5k–$25k |
|  |  | wd4 | How a window goes in | Measured, built to order, set and sealed; most window-only jobs two days |
|  |  | wd5 | Doors | Exterior and garage doors as documented trades, with their published band |
|  |  | wd6 | Book the window inspection | Close: phone, hours, booking |
| 3 | Roofing | rf1 | Opener | Shingle and metal roofing as documented trades; GAF Master Elite |
|  |  | rf2 | What a roof costs | Shingle and metal bands as already published |
|  |  | rf3 | Roofing jobs on record | Documented roofing projects (records and the firm's own photos) |
|  |  | rf4 | What homeowners said about roofs | Verbatim published review lines that mention roofs; no per-review stars |
|  |  | rf5 | Book the roof inspection | Close |
| 4 | Our Work | ow1 | Opener | The locked 886 wording and what "documented" means |
|  |  | ow2 | The photographs | The firm's own job photos with place, month and trades |
|  |  | ow3 | By trade | Documented projects per trade, as published |
|  |  | ow4 | The latest jobs | The newest documented records |
|  |  | ow5 | Book | Close |
| 5 | Reviews | rv1 | Opener | 4.9 from 474 Google reviews |
|  |  | rv2 | The reviews | The published reviews, verbatim, no per-review stars |
|  |  | rv3 | People they name | Who reviewers name, with verbatim lines |
|  |  | rv4 | By the work done | Reviews grouped by the trade they describe (verbatim) |
|  |  | rv5 | Book | Close |
| 6 | About | ab1 | Opener | Since 2009 |
|  |  | ab2 | The story | Opened 2009; merged with Sanders Roofing & Exteriors in 2018 |
|  |  | ab3 | Credentials | GAF Master Elite; James Hardie Elite Preferred + President's Club 2025; Andersen Certified Premier; BBB A+ |
|  |  | ab4 | How we work | One visit covers every trade; the four real steps and hours |
|  |  | ab5 | Book | Close |
| 7 | Service Area | sa1 | Opener | Austin and the towns on our books; the 886 wording |
|  |  | sa2 | Towns | The real town tallies |
|  |  | sa3 | Neighbourhoods | Neighbourhoods in the records, by town |
|  |  | sa4 | From the office | The real address; straight-line distances, labelled as such |
|  |  | sa5 | Book | Close |
| 8 | Contact | ct1 | Ways to reach us | Phone, email, address, hours |
|  |  | ct2 | The office | Address, hours, directions link (no drawn map) |
|  |  | ct3 | Book the inspection | Booking page and phone; nothing claims a message was saved or sent |

**Size:** 40 sections, 3 versions each, 120 versions.

**Content rule I am applying:** every figure on a subpage must already appear on the homepage. I check each with a search of the built file before using it. Some items are in FACTS.md but not on the homepage, so they stay out unless the owner adds them:
- the "Built for Texas five";
- the storm four-step;
- roof labour warranties;
- financing and offers.

"5,000" never appears.

**Round order:**

| Round | Sections |
|---|---|
| S1 | sd1, sd2 |
| S2 | sd3, sd4 |
| S3 | sd5, sd6 |
| S4 | wd1, wd2 |
| S5 | wd3, wd4 |
| S6 | wd5, wd6 |
| S7 | rf1, rf2 |
| S8 | rf3, rf4 |
| S9 | rf5, ow1 |
| S10 | ow2, ow3 |
| S11 | ow4, ow5 |
| S12 | rv1, rv2 |
| S13 | rv3, rv4 |
| S14 | rv5, ab1 |
| S15 | ab2, ab3 |
| S16 | ab4, ab5 |
| S17 | sa1, sa2 |
| S18 | sa3, sa4 |
| S19 | sa5, ct1 |
| S20 | ct2, ct3 |

## Part 2: the page system (built this round)

- **Page list:** `pages.json` holds the page list and, for each page, its sections (slot, name, module, object, versions). The build reads it, so adding a section is one entry.
- **Page templates:** each page is a `<template data-page>` holding its slots, built the same way as homepage slots. `?page=<name>` swaps it into `<main>` before version swapping runs. The homepage moves into a template, so every existing `?slot=` link still works. The document title becomes "Siding | Austin Pro Siding, Windows & Roofing".
- **Switcher:** a Page row is added, and only slots present on the current page are listed.
- **Shared helpers (`p_base`):** booking and call buttons, the locks, and `__JOBS`. `__JOBS` holds the firm's eight documented job photos (the On your street A set), embedded once (+630 KB) and placed by index, so no subpage version duplicates an image.
- **Homepage re-check:** 0 errors, 0 overflow, 1 h1 and 0 duplicate ids at all three widths.
- **Header nav:** still points at homepage anchors. It will be pointed at the page views once each page has its sections, so a half-built page is never linked.

## Part 3: Siding 1 (Opener) and 2 (The board)

### Plan lines

| Version | Reference | Skills |
|---|---|---|
| sd1 A "Split cover" | Scout Motors (the honest product page) | S1501 (one photo, one headline), S0220 (four proof figures from the homepage), S0405 |
| sd1 B "Hung as courses" | Dropbox Brand (type as the whole design) | S1500 (the headline set as lap boards), S1436 (boards hang one course at a time, overshoot, 140 ms apart), a visually hidden h1 plus a hidden text proof line for assistive tech |
| sd1 C "The street view" | Graza (the custom-animation bar) | S1501 (full-bleed real job), S0083 (431 counts up once on arrival; final value without JS or under reduced motion) |
| sd2 A "The spec sheet" | Cash App Brand Guidelines (the labelled spec) | S0054 (rows focusable; hover or focus lights the matching part), S1362 (drawn side section with dimension lines: 8.25 in board, 7 in exposure) |
| sd2 B "Two faces" | Apple AirPods Pro (one close-up, one comparison) | S0054 (`role=slider`, arrows, Home, End), gesture patterns (drag anywhere on the frame), S0220 |
| sd2 C "415 squares" | Quiet Cubes (calm, one figure at a time) | data visualisation (unit chart, one square per priced job), S0054 radiogroup, S0220 (every figure shown as "N of 415", nothing derived) |

### Build log

**sd1 Opener**
- A: headline, sub-line, four proof figures (431 documented siding jobs; 30-year non-prorated; lifetime labor; 1–2 weeks including paint), Book and Call, and a 4:5 photo of the firm's Maple Run job with its record caption.
- B: no photo. Three cream lap boards carry the headline; the fourth, green board carries the proof.
- C: full-bleed Block House Creek, Leander job, headline over it, and a four-cell proof strip along the bottom.
- How they differ: photo plus text, versus type only, versus full bleed.

**sd2 The board**
- A: a drawn section with a spec table. Rows: board, exposure, texture, board and batten, ColorPlus, painted.
- B: a comparison of a drawn Cedarmill grain and Smooth, with 286 / 36 of 415 under each side.
- C: 415 squares with four fact chips (301 / 286 / 36 / 27 of 415).
- None of the three is a configurator: no wall changes with a choice, so the Visualiser keeps that mechanic.

### Self-tests

**Gate checks:** every version at 1440, 768 and 390 shows 0 errors, 0 overflow, exactly 1 h1 on the page and 0 duplicate ids. Each opener carries the page's one h1.

| Check | Result |
|---|---|
| `?review&page=siding` | Title "Siding \| Austin Pro…"; `main[data-page=siding]`; switcher rows: Page, Siding · Opener, Siding · The board; pages: Homepage, Siding (current) |
| Job photos | Load from `__JOBS` |
| sd1 C | Counter ends at 431 |
| sd2 A | Hovering Exposure lights the 7 in dimension |
| sd2 B | Drag → "80% Cedarmill, 20% Smooth"; End → "All Cedarmill" |
| sd2 C | "27 of 415" lights 27 squares and reads "27 of 415 priced siding jobs: Board and batten." |

**Defect fixed:** Home and End on the sd2 B slider scrolled the page; both are now cancelled.

**Remaining:**
- sd2 B's Cedarmill grain is drawn and subtle at full width. It is a drawing, not a photo, labelled as such by context.
- The header nav is not yet pointed at the page views (see Part 2).

### Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Site | page views | template swap, title per page, switcher Page row |
| Section | sd1 | S1501 / S1500, S0220 |
| Section | sd2 | spec, compare and unit-chart grammars, S0220 |
| Element | sd1 B boards | S1436 |
| Element | sd1 C counter | S0083 |
| Element | sd2 A rows → drawing | S0054 |
| Element | sd2 B slider | S0054 |
| Element | sd2 C chips | radiogroup |

**Critique pass:**
- **Honesty:** every figure was searched for in the built homepage before use; no derived numbers; photos are the firm's documented jobs with their record captions.
- **S1496:** brand colours, plus material tones in the drawings.

### Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| sd1 A Split cover | 8.2 | 8.6 | 7.2 | 8.6 | **8.16** | PASS |
| sd1 B Hung as courses | 8.4 | 8.0 | 8.4 | 8.2 | **8.26** | PASS |
| sd1 C The street view | 8.4 | 8.2 | 7.6 | 8.4 | **8.18** | PASS |
| sd2 A The spec sheet | 7.8 | 8.2 | 7.6 | 9.0 | **8.10** | PASS |
| sd2 B Two faces | 7.6 | 8.2 | 7.8 | 8.2 | **7.90** | PASS |
| sd2 C 415 squares | 8.0 | 8.4 | 7.6 | 8.8 | **8.16** | PASS |

**Vetoes: none.** **Next: Round S2, Siding 3 (What siding costs here) and Siding 4 (Warranty and time on site).**
