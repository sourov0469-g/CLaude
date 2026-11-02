# GATE, Build cycle 6: accessibility tree (what a screen reader is given)

**Run.** AUSTIN-PROMPT-V2, after Muse accepted GATE-BUILD-5. Citations follow Muse's rule: each tag was checked against the skill's own text in the attached pack, read in this thread. Severity follows the S1458 scale: Critical, Major, Minor, Enhancement.

**Deliverable.** `siding/brand-v2/site.html` (1.84 MB, 45 backups).

**Why this cycle.** GATE-BUILD-5 left one check open: nobody had read what assistive technology is actually given. A person still has to listen with a screen reader (see §4), but the browser's accessibility tree is the input every screen reader works from, and it can be read by machine. This cycle reads it from Chromium for every page and both versions.

**QA.** Two new scripts are kept in `siding/brand-v2/build/qa/`:
- `ax.js` reads Chromium's full accessibility tree (CDP `Accessibility.getFullAXTree`) for every page × both versions, and reports the heading outline, h1 count, heading skips, landmarks with their names, and any control or image with no name.
- `live.js` checks the route announcement, focus after a route change, and the before/after photo alts after a swap.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Findings and fixes

| # | Finding (how found) | Severity (S1458) | Fix | WEB-SKILLS citations (rule → how it is met) |
|---|---|---|---|---|
| 1 | **Footer page links were not a navigation landmark.** The tree showed one navigation region ("Main"). The footer's six page links sat in a plain paragraph, so a screen-reader user listing landmarks could not jump to them. Found by `ax.js`. | Minor | The footer pages block is now `<nav aria-label="Footer">`. Every page × version now exposes two named navigation landmarks: **["Main", "Footer"]**. | **S1147** frontend-checklist: "Wrap navigation links in nav elements - Use aria-label to distinguish multiple nav regions". **S1111**: "Provide labels for multiple landmarks of the same type using aria-label". Both regions are labelled. |
| 2 | **Ambiguous before/after alts.** The same job photo carried different alt wording in different sections, and some alts did not say which side of the work they showed (e.g. two "Maple Run" images reading alike). The seam control's swap also rewrote alts in a third pattern. Found by listing every alt in the tree. | Minor | One pattern for every pair photo, made in one place (`shell.pair_alt`): "After the work: *trade* job, *place*" / "Before the work: …". The seam swap script uses the same pattern. 19 versions changed; each old version is kept as a backup (`build/backup_changed.py`), **45 backups in the file**. | **S0914**: "Alt text should describe the image's purpose". The purpose of a pair photo is which side of which job it shows, so that is what the alt says. Captions stay place-only, per the open caption ruling. |
| 3 | **Outline, landmarks and names.** Every page × both versions. | None | No change needed: **exactly one h1 per page, no heading-level skips, no control or image without a name**; banner, main and contentinfo once each; About exposes its form. | **S1064**: "Use exactly one h1 per page for the main title - Never skip heading levels". **S1065**. **S0070** better-accessibility: "Use headings that describe their sections and form a coherent outline. Expose one visible primary `<main>` landmark." |
| 4 | **Route changes.** A single-file site changes "page" without a page load, so a screen reader hears nothing unless told. | None | No change needed. The live region exists in the DOM before any change and is polite. A route change announces "Windows & doors · Austin Pro Siding", and focus moves to the new page's h1 ("Openings, fitted square."). | **S0927**: "The live region must exist in DOM before content changes"; "Use aria-live='polite' for non-urgent updates". Both are met, as measured by `live.js`. |

## 2. Measured, after the fixes

| Check | Result |
|---|---|
| Accessibility tree (`ax.js`), 12 page states | h1 = 1 on each; 0 heading skips; 0 nameless controls or images; navigation landmarks ["Main", "Footer"] on each. |
| Route announcement (`live.js`) | Live region present before change (polite); announced "Windows & doors · Austin Pro Siding"; focus moved to the h1. |
| Pair alts after a seam swap (`live.js`) | "After the work: windows job, Maple Run, Austin" / "Before the work: windows job, Maple Run, Austin". |
| Alt wording | 12 distinct alts across the live versions, all in the one pattern for pair photos. |
| Regression | Audit 0 problems; duplicate ids 0; barred terms 0; rendered contrast 1,021 text elements and 574 rings, 0 failures; keyboard 537 stops, 0 without a ring, 0 traps; reduced motion and deep link correct; pinned-section fit 0 clipped at both heights; CLS 0.001. |

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.5 | Unchanged. |
| Usability (30) | 8.6 | +0.1: the footer is now reachable as a landmark, and the accessibility tree is measured on every page and version, not assumed. |
| Creativity (20) | 7.2 | Unchanged. |
| Content (10) | 8.5 | +0.1: the pair photos now say which side of which job they show, in one wording everywhere. |
| **Weighted** | **7.87** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 4. Remaining (outside my control)

1. **Rimowa: 403.**
2. **Waiting on Muse or the firm:**
   - the caption ruling on months;
   - the process-step names and descriptive copy;
   - the real colour list.
3. **A person on a physical phone and with a screen reader.** What the screen reader is given is now measured; how it sounds has not been listened to.
