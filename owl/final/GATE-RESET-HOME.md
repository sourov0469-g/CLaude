# GATE-RESET-HOME · the finished homepage: new bests by default, every past version kept as records

**The file:** `owl/final/owl-roofing.html` (10.48 MB, one file). Build it with `python3 owl/final/build_home.py`. Running `src/build.py` or `reset/build.py` also ends by building it.

**The owner's order (05:15), applied:**
- do not delete any current version;
- every existing version stays in the file as PAST: hidden, inert, kept as a record, never removed, never overwritten;
- the page he opens shows the new best of each section of the map, and the past is one switch away.

## 1. What the owner opens

| Opens with | What shows |
|---|---|
| `owl-roofing.html` | **NEW:** the seven new bests in map order (arrival, problem-finder, "your part: nothing", the numbers, the family, "do you come to me?", the call), in Night Owl |
| `owl-roofing.html?palette=control` (or `safety`, `slate`) | the same, in another trial palette (the switch in the top bar does it too) |
| `owl-roofing.html?past` | **PAST:** the whole homepage exactly as it stood before the reset |
| `owl-roofing.html?past&hero=12&wise=14` (any section, any version) | a past homepage with those past versions, exactly as before |
| `owl-roofing.html?review` (or `?hero=11`, `#/services`, any old link) | PAST, so every link made before tonight still lands where it did |

**The switch:** the new page's closing line has "Past versions, kept as records". The past page carries a chip, "Past versions · records · back to the new homepage".

## 2. What is kept, and where
- **Inside `owl-roofing.html`,** as `<template id="owl-past">`, the complete past site, inert until asked for:
  - all **130 versions**: 114 homepage versions across hero, video, explore, wise, wrap, services, reviews, area, family and booking, plus 16 inner-page versions;
  - all **12 in-file backups**;
  - the header, the footer, the companion owl and the four inner pages.

  Counts are checked against the frozen file below.
- **The frozen pre-reset file, byte for byte:** `owl/final/past/owl-roofing-PAST-2026-11-04.html` (SHA-256 `072a5196…a18a3b`, identical to the last build before the reset). The file was rebuilt tonight, so this copy keeps the exact old artifact as well as its contents.
- **All sources untouched:** `src/sections/*-v*.html` and `*-b*.html` (130 + 12 files) and every past GATE file. Nothing was deleted at any point tonight; `git diff --diff-filter=D` since the last pre-reset commit is empty.
- **The workbench page,** `owl-reset.html` (the new sections alone), is also kept.

## 3. Checks
**`gates/reset/home/modes.json` · 10/10 PASS** (`gates/reset/home/modes.cjs`)
- The page opens on the seven new sections in map order, with no past version in the live page.
- Every past version is still in the file and inert: 130 versions, 12 backups and 5 pages inside the PAST record.
- The new page links to the records.
- No page or console errors in new mode.
- **Past mode lays out exactly like the frozen pre-reset file:** the same sections at the same heights, for:
  - `?past`;
  - `?past&hero=12&wise=14`;
  - the old link `?hero=11`.

  A pixel comparison of the first screen differs only in the animated rain (`past-home.jpg` vs `frozen-home.jpg`).
- An old inner-page link (`#/services`) still opens the past Services page.
- The past page's chip is at least 44 px and returns to the new homepage.

**Every section's checks re-run on `owl-roofing.html` itself: 155/155.**

| Section | Checks |
|---|---|
| 1 | 21/21 |
| 2 | 23/23 |
| 3 | 22/22 |
| 4 | 20/20 |
| 5 | 20/20 |
| 6 | 26/26 |
| 7 | 23/23 |

- axe shows 0 violations in all four palettes.
- One check was rewritten: section 5's mid-turn check now watches the turn frame by frame instead of sampling a fixed 260 ms instant. The measured finding is recorded in GATE-RESET-5 §10.

**Journey evidence from the finished file:** `gates/reset/page/journey-1440.jpg` and `journey-390.jpg`.

## 4. The bests, and why (each gate's §10 has the full reasoning)

| Map section | New best (the default) | Stands in for (kept as PAST) | Score |
|---|---|---|---|
| 1 Arrival | crew film, "Roof trouble? We'll take it from here." | Hero 15 + 1 backup, Video 15 + 1 | 8.24 |
| 2 Problem-finder | "What's going on up there?" | Explore 15 + 2, Services 9 + 1 | 8.46 |
| 3 Your part: nothing | scrubbed crew film, five beats | Wise Check 14 + 1, Protect 10 + 2 | 8.45 |
| 4 Numbers | "Take the numbers." | Reviews 9 + 1 | 8.48 |
| 5 Family | split cover with the seam card | Family 9 + 1 | 8.54 |
| 6 Towns | "Do you come to me?" | Area 9 + 1 | 8.43 |
| 7 Call | the number as the end card | Booking 9 + 1, the past footer | 8.56 |

**One best per section, not a pile.** I built each new section once and improved it in place until it passed. Its alternatives were its palette treatments, and Night Owl is the page-wide default, for the reasons in each gate.

## 5. Remaining defects of the whole (named)
- **D1 · weight.** 10.48 MB, because the past site travels inside the file as records (the new page alone is 4.94 MB). It is a local file, so this is acceptable. For a live site, the past would move to a separate archive file.
- **D2 · the inner pages exist only in the past.** Services, Protect Your Nest, About and Wise Check open as they were (past mode). The new homepage does not link to them; it is one page by design. Whether the new world gets inner pages is the owner's call.
- **D3 · old tools.** The old test scripts in `tools/` (ladder, up-r*, home-verify) were written for the past page. Their `?section=` links open past mode automatically, so they still reach what they tested, but they were not re-run tonight.

## 6. Vetoes: **zero**
- Nothing deleted; nothing past overwritten (frozen copy, hash checked).
- Only locked facts on the new page.
- The logo is unchanged.
- A light-dominant page.
- No sub-agents or background tasks; every command ran in my thread, in the foreground, with a time limit.
