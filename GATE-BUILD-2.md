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
