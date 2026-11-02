# GATE, Build pass 1: the single-file site

**Run.** AUSTIN-PROMPT-V2, overnight, 2026-11-02.

**Deliverable.** `siding/brand-v2/site.html`: one standalone file, 1.68 MB.
- **Contents:** all 6 pages, 41 sections, exactly two versions per section (82 versions).
- **Navigation:** in-file, by hash routes.
- **Built by:** `siding/brand-v2/build/build_site.py`, from these modules:
  - `shell.py`, `shell_assets.py`
  - `sec_home.py`, `sec_home2.py`, `sec_home3.py`
  - `sec_siding.py`, `sec_windows.py`, `sec_roofing.py`
  - `sec_work.py`, `sec_about.py`
- **Review switch:** each section has a V1/V2 switch; `?clean` hides it.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks. The site was built one page at a time, and each section's two versions were built and checked before moving on. I committed after each page:

| Commit | Contents |
|---|---|
| 2e5dcc4 | Shell and hero |
| 5bceec6 | Homepage sections 2–4 |
| 273c98a | Homepage sections 5–8 |
| d5792b6 | Homepage complete |
| 2449112 | Siding |
| bd17bb9 | Windows |
| 134fb3b | Roofing |
| a01421d | Our work |

About & booking and this gate follow in the next commit.

## 1. What each page holds

Every section names its annex-v3 reference in `phase3/build_phase3a.py` → `PAGES`.

### Home (11 sections)

| # | Section | V1 | V2 |
|---|---|---|---|
| 1 | Hero | MERSI split: before/after with the synced plate | Finished wall beside its section drawing; the plate steps through the process |
| 2 | Proof band | One line | Five cells |
| 3 | The record | Pinned dots; 312 revealed by clip, never counted | Static, with the locked line revealed in two parts |
| 4 | Services | Three cards | Rows that reveal a photo on hover or focus |
| 5 | Wall assembly | Pinned build | Tabbed layers |
| 6 | Colour | Steel fields | Courses |
| 7 | Visualiser | Gate | Working four-step strip |
| 8 | Map preview | Static map | Photos beside the map |
| 9 | Before/after | Seam with chips | Full-bleed seam with an index |
| 10 | Since 2009 | Film roll; past years shown as type, not photos | Timeline |
| 11 | Close | Subtraction | Phone number at display size |

### Siding & painting (6)

| # | Section | V1 | V2 |
|---|---|---|---|
| 1 | Hero | Full-bleed | Split |
| 2 | Profiles | Lit material samples | Tabs |
| 3 | Colour wall | Value courses | 12-step deck |
| 4 | Visualiser | Real four-step instrument with summary | All steps at once |
| 5 | Siding pairs | One seam | Three seams |
| 6 | Close | Credential close | Credential close |

### Windows & doors (6)

| # | Section | V1 | V2 |
|---|---|---|---|
| 1 | Hero | Photo | Window drawing |
| 2 | Window | Assembled by scroll | Numbered parts |
| 3 | Opening types | Drawn elevations | Tabs |
| 4 | Credential | Andersen band | Andersen at large type |
| 5 | Window pairs | One seam | Three seams |
| 6 | Close | Credential close | Credential close |

### Roofing, gutters & patio covers (6)

All drawings: the photo set holds no roofing or patio jobs.

| # | Section | V1 | V2 |
|---|---|---|---|
| 1 | Hero | Roof in section, courses lapped like the mark (dark) | Same drawing on a light page |
| 2 | Roof in layers | Assembled by scroll | Listed |
| 3 | Credential | GAF band | GAF at large type |
| 4 | Gutters | Water line drawn on entry | Static diagram |
| 5 | Patio covers | Parts | Attached vs freestanding |
| 6 | Close | Credential close | Credential close |

### Our work (6)

| # | Section | V1 | V2 |
|---|---|---|---|
| 1 | The record | Stated once as a numeral | Stated once as a display line |
| 2 | The map | Explorable: drag, zoom buttons, arrow keys and +/− keys, town on hover (light) | Same map, dark |
| 3 | Archive | Staggered scatter | Grid with before toggles; both filter by trade, with no counts |
| 4 | Pairs | One seam | MERSI split scrubbed through all six pairs |
| 5 | Reviews | As counted, never quoted | Same figure at large type |
| 6 | Close | Credential close | Credential close |

### About & booking (6)

| # | Section | V1 | V2 |
|---|---|---|---|
| 1 | Hero | Photo | Course field |
| 2 | Story | Timeline | Two date plates |
| 3 | Credentials | List | Large |
| 4 | Office | Office and hours with the map | Office card |
| 5 | Booking form | Full | Short |
| 6 | FAQ | Accordion | Two-column list |

The booking form validates, and its errors name what to fix. It never claims anything was sent: on a valid submit it says plainly that nothing was sent and gives the phone number. The FAQ answers only from the lock.

### Site-wide

- The header has the course-line lockup, the five page links (the current one marked), the phone number and a Book action. At narrow widths the links fold into a menu sheet.
- The footer sits on the B4 evening field, capped at steel-9.
- Each image is embedded once.
- One scroll engine drives every pinned section.
- Cursor companion A, the course tick (fine pointers only, system cursor kept), is shown in `shots/site-cursor.png`.

## 2. Checks run, with results

- **Full-site audit** (`audit.js`): 6 pages × 2 versions × 2 widths (1440 and 375) = 24 page states, plus console errors at each width.
  - Exactly one visible h1 per page; no image without alt; no unnamed button.
  - No in-file route that fails to resolve; `scrollWidth` 375 at phone width.
  - **Result: 0 problems.**
- **Duplicate ids:** 0.
- **Barred terms in visible text:** 0. Checked: 5,000; 316 with; 70+ years; a bare 886; 1,590; GuildQuality; Nextdoor; Simonton; financing; award; "free estimate"; lorem.
- **Deep link:** `#/about/booking` opens the About page with the form at the top.
- **Reduced motion:** every duration resolves to 0 ms; all 312 record dots show at once; every course line is drawn; no errors.
- **Interactions tested by real input:**
  - pinned scroll for the hero, the record, the wall, the window, the roof and the pairs split;
  - the seams by keyboard (arrows, Home and End) and by pointer;
  - the four-step visualiser (Next, Back and summary);
  - the map (zoom buttons, arrow-key pan);
  - the tabs (arrow keys);
  - the archive filters and the before toggles;
  - form validation, with focus moving to the first error.

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.0 | One system throughout: tokens, the course line, cut-square corners and lapped drawings. The hero split meets as one house. Held back: the inner-page heroes reuse one plate pattern; the B2 dither field is not yet used on the site; the drawings are clean but plain against the Graza bar. |
| Usability (30) | 7.5 | Every mechanism works by keyboard. The seams are real sliders. Errors say what to fix. The phone number is always in the header. 44–56 px targets. Reduced motion is honoured. The audit is clean at 375. |
| Creativity (20) | 7.0 | One mechanism (MERSI's clip wipe) carries the hero, the seams and the pair split. Courses and laps recur in the mark, the roof and the wall. The numeral is revealed, not counted. |
| Content (10) | 8.0 | Locked wording only. No invented service promises: three were caught and removed during the build. No photo stands in for a past year or a missing trade. The form is honest. |
| **Weighted** | **7.30** | **PASS** (≥ 7.0; every category ≥ 6). |

**Vetoes: zero.**

## 4. Defects found and fixed during the build

All found at the per-section check and fixed before commit:

1. **Hero V2:** the plate covered the drawing's labels, and the labels were out of process order. Reordered, with leaders.
2. **Record V1:** looked empty under the harness. Verified by real scroll: 108 dots at 30% of the run, 251 at 70%.
3. **Services V2:** the revealed photo covered the description. The description now fades.
4. **Copy promises outside the lock.** Each is replaced with wording the facts support:
   - "short drive", "Three of the 312", "every dot opens a job";
   - "estimate visit brings chips", "gone through with you";
   - "reads every request and calls you back", "then we call";
   - "the firm replaces six types", "patio-door".
5. **Film roll:** recent job photos stood in for 2009 and 2018. Those frames are now type only. The photo height was also wrong; fixed with `height:auto`.
6. **Stepper:** the Book button showed at step 1. A global `[hidden]` rule now always wins.
7. **Duplicate gradient ids in the material samples.** Made unique.
8. **Windows pin started empty.** The frame now shows at scroll 0.
9. **Roof drawing:** an unreadable slab, and a clipped ridge label. Redrawn with lapped wedge courses and leaders; the viewBox widened.
10. **Archive scatter overlapped.** Now staggered.
11. **Router focus ring.** Programmatic h1 focus no longer draws a ring.
12. **Booking notice ran the address into the hours.** Rewritten.

## 5. Process notes and defects remaining (for the next audit-improve cycle)

1. **Backups.** No committed version has been superseded yet. Drafts were iterated before each commit and are not kept in the file. From here, any replacement of a committed version goes to `<template class="bk">`, as the addendum requires.
2. **References studied per section.** Live observation in this run covered MERSI (code level), Apple, Lusion, Lando Norris, Cowboy, Ever, Bruno Simon and Quiet Cubes, in the Phase 3a pass, not separately before each section. Rimowa is still blocked (403). The second cycle should re-open each reference beside its two built versions and log what changes.
3. **The B2 dither field (the page's one steel field) is not yet used.** Candidate: home 6 V1, or a close.
4. **Weight is 1.68 MB:** fonts plus the six pairs embedded once. Within reason for one file. Images could be re-encoded smaller.
5. **Inner-page heroes share one plate pattern.** The second cycle should differentiate them per page.
6. **Captions:** the Muse ruling on months is still open (default: place only). The process step names are still draft copy for the firm.
