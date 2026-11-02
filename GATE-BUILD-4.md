# GATE, Build cycle 4: phone-width pass, pinning discipline, cursor companion under real pointer movement

**Run.** AUSTIN-PROMPT-V2, after Muse accepted GATE-BUILD-3. Citations follow Muse's rule: each tag was checked against the skill's own text in the attached pack, read in this thread.

**Deliverable.** `siding/brand-v2/site.html` (1.76 MB, 25 backups), rebuilt by `siding/brand-v2/build/build_site.py`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Findings and changes

| # | Finding (how found) | Change | WEB-SKILLS citations (the skill's rule → how it is met) |
|---|---|---|---|
| 1 | **Phone width had only been checked for overflow, never looked at.** All six pages were captured at 375 px. Then every pinned section was measured mid-run at 375×740 and at 375×667, comparing its content box to the sticky viewport. **Two clipped:** home hero V2 (bottom: the drawing's SVG grew from its width and ignored its row) and the wall V1 (top and bottom: the content was taller than the screen). | CSS for phone widths only; no version's markup changed. Hero V2 stacks photo, drawing and copy in proportion: the drawing is held by height, the copy sizes itself, and the second phone button is dropped there (the header carries it). The wall V1 step list goes into two columns, with the drawing capped at 34 vh. The hero controls move left, off the review switch. **Result: 0 sections clipped at either height.** | **S0006** impeccable: "Content-driven breakpoints (where design breaks)". The fixes target measured break points, not guessed sizes. **S0025** ux-guidelines, "Text Reflow and Spacing": "Text must remain available at narrow widths". Measured: no pinned text is cut at 375 px. |
| 2 | **The homepage pinned three sections in its default versions** (hero, record, wall). Found while searching the pack for pinning on small screens. | The wall assembly (V1) is now **scroll-linked, not pinned.** A new `APS.track` in the shell builds it as the section scrolls past naturally: 0 of 8 steps when its top enters, 4 at 60% of the viewport, all 8 at 30%. **The record stays pinned:** annex v3 names Apple's "pinned scroll" for it, and the annex ranks above the pack. The previous wall version is kept as a backup (`home-5-v1-r3`). Sticky elements in the default homepage: **2**, at 1440 and at 375. | **S0019** motion data: "Don't pin more than 1-2 sections per page; excessive pinning fights native scroll feel and hurts mobile UX"; "test on mid-tier mobile devices, not just desktop". Met: 2 pins, tested at two phone heights. **BRAND.md §11** (own rule, one authored moment per view, up to 600 ms): the build stays scrubbed by scroll rather than timed, so no duration exceeds the budget. |
| 3 | **Cursor companion, previously tested by harness only.** Now driven with stepped real pointer movement over header links, the Book button and a hero action. | No change needed. Measured over three targets: the tick's width equals the target's width (152/152, 75/75, 214/214 px), its x equals the target's left edge, and its y is the target's bottom + 4 px. Over plain text it returns to a 10 px tick by the pointer. When the page scrolls under a held target, it follows the target's new position (705 = 705). No errors. | **S0546** oversized-cursor: "pointer-events: none, z-index above all scene content, will-change: transform". The companion follows all three, and the system cursor is never hidden. **S0400** accessible-animation: it reads `prefers-reduced-motion`; under reduced motion the companion snaps without lag. |
| 4 | **B4 footer field banding** (open since Phase 2), re-captured at 1440. | No change. It now reads as soft vertical light folds, not hard columns. | **S1364** atmosphere-background: "multiple overlapping vertical bands so the background feels layered and spatial rather than flat". Met as captured (`shots/build-ft-f.png`). The Phase 2 defect is closed. |

## 2. Checks after the cycle

- **Full-site audit:** 6 pages × 2 versions × 2 widths, plus console errors at each width. **0 problems.**
- **Pinned-section fit:** 7 pinned sections at 375×740 and 375×667. **0 clipped.**
- **Duplicate ids:** 0, including in the 25 backups.
- **Barred terms in visible text:** 0.
- **Deep link and reduced motion:** `#/about/booking` opens at the form; every duration resolves to 0 ms; all 312 dots show at once; all 7 course lines are drawn; no errors.
- **Shots** (`siding/brand-v2/shots/`):
  - `m375-{home,siding,windows,roofing,work,about}.png`
  - `m375-pin-*.png` and `m375-fix-*.png`
  - `c4-wall-{1440,375}.png`

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.5 | Unchanged at desktop; the phone layouts of the two pinned sections are now composed rather than clipped. |
| Usability (30) | 8.1 | +0.3: nothing clips at two phone heights; the homepage has 2 pins instead of 3 (S0019); the companion is verified under real pointer movement. |
| Creativity (20) | 7.2 | Unchanged. |
| Content (10) | 8.4 | Unchanged. |
| **Weighted** | **7.73** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 4. Remaining (outside my control)

1. **Rimowa: 403** at three URLs. The visualiser is held to the annex text.
2. **Waiting on Muse or the firm:**
   - the caption ruling on months;
   - the six process-step names and the descriptive copy;
   - the real colour list.
3. **A hand test by a person on a physical phone and with a real mouse.** Real pointer movement was simulated in Chromium; a person's own check is still worth having.
