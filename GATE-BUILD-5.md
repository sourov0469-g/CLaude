# GATE, Build cycle 5: keyboard walkthrough, rendered contrast sweep, load performance

**Run.** AUSTIN-PROMPT-V2, after Muse accepted GATE-BUILD-4. Citations follow Muse's rule: each tag was checked against the skill's own text in the attached pack, read in this thread. Severity follows the S1458 scale: Critical, Major, Minor, Enhancement.

**Deliverable.** `siding/brand-v2/site.html` (1.76 MB, 26 backups).

**QA.** The scripts are now kept in the repo at `siding/brand-v2/build/qa/`, so every check below can be re-run.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Findings and fixes

| # | Finding (how found) | Severity (S1458) | Fix | WEB-SKILLS citations (rule → how it is met) |
|---|---|---|---|---|
| 1 | **Footer focus rings at 2.49:1**: a steel-9 ring on the steel-12 footer, on 12 links per page, on every page. Found by the rendered contrast sweep of every focus ring. | Major | `.ftr :focus-visible` uses the on-dark ring (white): 14.85:1. | **S1059** frontend-checklist: "Focus indicators must have 3:1 contrast ratio against adjacent colo[rs]". **S0070** better-accessibility: a missing focus indicator is "HIGH on sight". |
| 2 | **Page-load layout shift of 0.624**. Found by the performance pass (`perf.js`, then `cls.js` to name the source). Every page starts hidden until the router runs at DOMContentLoaded, so the footer flashed under the header, then jumped. | Major | A tiny inline script right after `<main>` marks the routed page visible before first paint, deep links included. **CLS: 0.625 → 0.001** on the homepage and on `#/about/booking`. | **S0231** web-performance-optimization: "optimizing for Core Web Vitals (LCP, INP, CLS)"; 0.1 is the good threshold. Met at 0.001. |
| 3 | **Plate counter text** ("Job 1 of 3", "Pair 1 of 6") at **4.43:1**: steel-4 at 12 px on steel-9. Found by the contrast sweep. | Minor | Steel-2, which passes 4.5:1 on steel-9, steel-10 and steel-11. | **S0071** better-colors: "Measure a foreground against the background it actually renders on". Re-measured: 0 failures. |
| 4 | **Dimmed SVG labels.** Hero V2 put its labels inside step groups dimmed to 18%, and the wall V2 dimmed its labels with the layers. Missed at first because the sweep read CSS colour; found when the sweep was extended to SVG fill at its effective opacity. | Minor | Hero V2 labels moved out of the dimmed groups. The current step is marked by white and bold, not opacity. Wall V2 labels never dim; only the drawing parts do. The previous hero V2 is kept as a backup (`home-1-v2-r2`). | **S0071:** measure the rendered result, not the token. **S0070:** meaning is not carried by opacity alone; the current step is also weight and colour. |
| 5 | **Keyboard walkthrough.** Every page × both versions, tabbing from the skip link to the end: **537 focus stops**. | None | No change needed: every stop shows a ring, none lands on hidden or aria-hidden content, and there are no traps. The first run reported traps on Our work V2 and both About versions. They were my test's identity collisions (six identical "Show before" buttons; chip checkboxes with no text). Re-run with unique keys: none. | **S0070:** "Style `:focus-visible`"; "Use only `tabindex="0"` … and `tabindex="-1"` for programmatic focus. Positive values break that order." No positive tabindex exists, and the tab widgets use roving tabindex. |
| 6 | **Main-thread blocking on phones.** 375 px with a 4× CPU slowdown, three runs. | Enhancement | The footer field's first frame now waits until it is on screen. **Total blocking time: 229–274 ms → median 178 ms (164–253).** Desktop: 0 ms. The remainder is mostly parsing a 1.76 MB single file with embedded images, a cost the single-file lock accepts. | **S0231:** "reducing main-thread blocking". **S0019:** "test on mid-tier mobile devices, not just desktop", done at 4× slowdown. |

## 2. Measured, after the fixes

| Check | Result |
|---|---|
| Rendered contrast (`contrast.js`) | 1,021 text elements, SVG labels included, and 574 focus rings: **0 failures**. Two-tone rings (the seam handle) count by their stronger tone, as designed. |
| Keyboard (`kb.js`) | 12 runs, 537 stops: 0 without a ring, 0 hidden, 0 traps. |
| Performance, 1440 px | FCP 100 ms, LCP 204 ms, CLS 0.001, total blocking time 0. |
| Performance, 375 px at 4× CPU | FCP 224–312 ms, LCP 652–736 ms, CLS 0, total blocking time median 178 ms. |
| Regression | Audit 0 problems; duplicate ids 0; barred terms 0; reduced motion and deep link correct; pinned-section fit 0 clipped at both heights; Pause control stops and resumes. |

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.5 | Unchanged; the hero V2 labels read better. |
| Usability (30) | 8.5 | +0.4: two Major defects fixed (focus rings on dark, layout shift); every focus stop and every text pair now measured, not sampled. |
| Creativity (20) | 7.2 | Unchanged. |
| Content (10) | 8.4 | Unchanged. |
| **Weighted** | **7.85** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 4. Remaining (outside my control)

1. **Rimowa: 403.**
2. **Waiting on Muse or the firm:**
   - the caption ruling on months;
   - the process-step names and descriptive copy;
   - the real colour list.
3. **A check on a physical phone and with a screen reader by a person.** Contrast, keyboard and performance are now measured; screen-reader output has not been listened to.
