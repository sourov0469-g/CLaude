# GATE, Build cycle 2: audit-improve

**Run.** AUSTIN-PROMPT-V2, continued under the same brief, addendum and annex v3.

**Starting point.** `GATE-BUILD-1.md`, items in §5. No newer Muse message had arrived when cycle 2 started.

**Deliverable.** `siding/brand-v2/site.html` (1.70 MB), rebuilt by `siding/brand-v2/build/build_site.py`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Changes, each tied to the defect or reference that called for it

| # | Change | Why |
|---|---|---|
| 1 | **Backups are live.** `build/snapshot.py` saves a committed version to `build/backups/{sid}-v{n}-r{rev}.html` before it is replaced, with images reduced to `data-img` references (no added weight). `build_site.py` wraps each one in `<template class="bk" data-sec data-v data-rev>`. **Eight backups are now in the file:** siding-6 v2, windows-1 v1, windows-6 v2, roofing-6 v2, work-6 v2, about-1 v1, home-5 v1 and home-5 v2. | Addendum: superseded versions go to hidden in-file backups, never deleted. Build-1 defect 5.1. |
| 2 | **The B2 steel field is used.** The closes on Siding, Windows, Roofing and Our work (V2) now sit on the ordered-dither steel field. Its palette stops at steel-9, so white text is at worst 5.96:1 by construction. The dither code moved into the shell. | Phase 2 asset unused (Build-1 defect 5.3); Cash App: colour as content. |
| 3 | **Inner heroes are differentiated.** Windows V1 shows the job through a window sash; About V1 keeps text off the photo and puts the headline in a band beneath it. Siding keeps the plate. | Build-1 defect 5.5 (one plate pattern repeated). About follows Cowboy, observed live: a single image, the framing in the body, restraint. |
| 4 | **Pause animations.** It is the second tab stop (a skip-link-style button with `aria-pressed`) and also appears in the footer. It stops the two drifting fields (B2 and B4) and resumes them. **Tested:** the field moves before pausing, is frozen after, and resumes; the label and `aria-pressed` flip. | Graza, observed live in this cycle at code level: its `js-motion-toggle` skip-link button, `aria-pressed`, "Pause animations" / "Play animations". WCAG 2.2.2 for motion lasting more than 5 s. |
| 5 | **The wall shows its face.** In both versions of home section 5, a face of five courses with shadow lines now sits left of the cut edge. Each face course appears with its board as you scroll. The drawing now says what the mark says: the cut corner shows the board's edge, and the face shows its course. | Graza bar: the drawings were "clean but plain" (Build-1 §3). Brand idea (BRAND.md §1). |

## 2. Considered and declined, recorded so it is not re-tried blindly

- **Image re-encode.** The six pairs at WebP q68, method 6, went from 880 KB to 832 KB: a 5% saving, with visible softening on board edges. The originals are already efficient, so they stay. Weight is 1.70 MB: fonts 127 KB, images about 1.17 MB as base64.
- **Rimowa UNIQUE.** Re-tried at two more URLs (`/us/en/unique` and `/gb/en/unique.html`); both returned Akamai 403. The visualiser stays on the annex text: profile → colour → trim → preview.

## 3. Checks after the cycle

- **Full-site audit:** 6 pages × 2 versions × 2 widths (24 page states), plus console errors at each width. One visible h1, alt on every image, no unnamed button, every route resolves, no overflow at 375. **0 problems.**
- **Duplicate ids:** 0, including inside the backups.
- **Barred terms in visible text:** 0.
- **Deep link and reduced motion:** `#/about/booking` opens at the form; every duration is 0 ms; all 312 dots show at once; all 7 course lines are drawn; no errors.

## 4. Self-rating against the SCORECARD

| Category (weight) | Score | Change and evidence |
|---|---|---|
| Design (40) | 7.4 | +0.4: distinct inner heroes, the steel field in use, the wall drawing carrying the brand idea. |
| Usability (30) | 7.8 | +0.3: pause control; audit still clean. |
| Creativity (20) | 7.2 | +0.2: the window-sash hero; the face beside the section. |
| Content (10) | 8.0 | Unchanged; locked wording only. |
| **Weighted** | **7.58** | **PASS.** |

**Vetoes: zero.**

## 5. Remaining (for cycle 3 or for Muse)

1. **Per-section reference re-check, still to do.** This cycle re-observed Graza (live) and used the Phase 3a observations of MERSI, Apple, Lusion, Lando Norris, Cowboy and Ever. A frame-by-frame comparison of every built version against its reference is not yet done for all 41 sections.
2. **Rimowa is blocked.** The visualiser instrument can't be checked against its exemplar.
3. **Copy for the firm to confirm:** the six process step names; the profile descriptions; the opening-type descriptions.
4. **Captions:** waiting on Muse's ruling on months (place only until then).
5. **The cursor companion** is tested by harness only, not yet by hand with a real mouse.

## 6. WEB-SKILLS citations (added under Muse's binding correction)

**Status.** This gate was failed for citing no WEB-SKILLS tags. This section is the remedy.

**How the citations were made.** Each tag below was checked against the skill's own text in the attached pack (WEB-SKILLS.md, sha256 fe81307b…), read in this thread. The quoted rule is the skill's wording, cut to the clause that applies. **"Met by"** gives the evidence, not intent.

### 6.1 Pause-animations control

| Tag | Skill | Its rule | Met by |
|---|---|---|---|
| S0070 | better-accessibility | "Anything moving, blinking or updating on its own for more than 5 seconds needs a visible pause control (2.2.2)." | A visible "Pause animations" button in the footer, plus the same control as the second tab stop. The two drifting fields (B2 and B4) are the only motion running longer than 5 s. **Tested:** moving before pausing, frozen after, resumes. |
| S0400 | iart-ai/accessible-animation | "2.2.2 Pause, Stop, Hide (A). Any auto-playing motion lasting >5s must offer pause/stop … give a control too." It also says to read `prefers-reduced-motion` via `matchMedia`. | The control exists in addition to the reduced-motion path, which already renders final states with no drift (measured earlier: all durations 0 ms). |
| S0658 | animation-discipline (repeated and ambient motion) | "WCAG 2.2.2 (Level A) requires a pause control for any motion running longer than 5 seconds"; "Cancel ambient motion on route change." | The pause control as above. **Route change measured:** with the steel field on screen, 60 animation frames per second; after changing route to Home, 0. The fields run only while visible on screen, so a hidden page stops them. |
| S1190 | reduced-motion (rule) | "Provide user controls to pause or disable animations." | `aria-pressed` toggle, labelled "Pause animations" or "Play animations". |
| S0947 | autoplay-media (rule) | "Provide immediately accessible pause/stop controls." | Reachable at the second Tab press, before the header. |
| S1465 | motion-system | Reduced motion handled "at the system level, not component by component." | The pause flag and the loop registry live in the shell (`APS.paused`, `APS.loop`), not in each section. |

### 6.2 The steel field (B2 ordered dither on the inner-page closes)

| Tag | Skill | Its rule | Met by |
|---|---|---|---|
| S1372 | dither-background | "4x4 Bayer-style dither"; "clearly visible square pixel cells"; "broad organic waves or cloud-like masses"; "Let one main bright mass define the composition"; "keep foreground contrast controlled". | Bayer 4×4 matrix, 7 px cells, an fbm cloud field with one off-axis mass. The palette is limited to four steel steps, and the drift stops under reduced motion. Adapted from the skill's near-black palette to the steel field (Phase 2 B2). |
| S0071 | better-colors | "Measure a foreground against the background it actually renders on, not the page background." | The darkest-to-lightest rendered range is steel-12 → steel-9. White on steel-9 was measured at **5.96:1** (`phase2/contrast-pairs.md`), so every pixel the text sits on passes 4.5:1 by construction. |
| S0248 | design-token-contrast | "normal text 4.5:1 (1.4.3), large text 3:1". | As above: the worst case is 5.96:1. The headline is large text, which needs only 3:1. |
| S1497 | critique-color | Contrast: "Does body text meet WCAG AA (4.5:1)?" | Yes: the close's label and phone number are body-size white on at worst steel-9. |
| S0658 | animation-discipline | "Cancel ambient motion on route change." | Measured: 60 → 0 animation frames per second (see 6.1). |

### 6.3 Differentiated inner-page heroes (Windows V1 sash; About V1 text-free photo)

| Tag | Skill | Its rule | Met by |
|---|---|---|---|
| S0659 | anti-ai-slop | "If a reviewer screenshots the artifact and someone outside the project can identify which product it's from — you have soul. If not, you shipped a template." It also warns against an unvaried hero skeleton. | Three inner heroes shared one plate-over-photo pattern; the screenshots were interchangeable. Now Windows shows its subject through a window sash and About keeps text off the photo, so each hero names its page from a screenshot. Siding keeps the plate. |
| S0095 | design-taste-frontend | "The idea comes from the subject." | The sash is the Windows page's own subject. |
| S1314 | no-ai-design-slop | "Give each viewport one focal point and each flow one clear primary action." | Each hero has one focal image and one filled action (Book an estimate). |
| S1320 | build-awwwards-quality-sites | "standout heroes"; "hero focal asset" written into the direction. | Each hero's focal asset is the firm's own job photo, framed by the page's idea. |

### 6.4 The wall face beside the section (home 5, both versions)

| Tag | Skill | Its rule | Met by |
|---|---|---|---|
| S0414 | jakubkrehel/teardown | "Choose the smallest view set that answers the request"; "Treat geometry and annotation correspondence as exact." | Two views only: the face (elevation) and the section, cut at the same corner. Each face course appears with the board that makes it (the same `data-k`), so the two views correspond course for course. |
| S0414 | jakubkrehel/teardown | "Hidden or unspecified construction: Omit it, request the missing reference or identify it as illustrative." | **Gap found while citing.** The drawings did not say they are illustrative. **Fixed in cycle 3b** (see `GATE-BUILD-3.md`): every construction drawing on the site now carries "Illustrative drawing of typical construction, not a specification for your home." |
| S0361 | enesozturk/dimensional-drawing | A monochrome dimensional drawing language. | Steel-only line and fill on the B3 dark field. |
| S1421 | illustration-style | Visual language and consistent application rules. | The face uses the same lapped wedge as the mark and the BRAND.md motifs (shadow line under each butt). |

**Re-scored with citations in place.** The scorecard figures in §4 are unchanged: Design 7.4, Usability 7.8, Creativity 7.2, Content 8.0, weighted 7.58. Zero vetoes; every category at or above 6.0. **This gate now meets the citation requirement.**
