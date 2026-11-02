# GATE, Phase 3b: proof sections (3, the maximum)

**Run.** AUSTIN-PROMPT-V2, overnight, 2026-11-02.

**Deliverable.** `siding/brand-v2/phase3b-proof.html`:
- Standalone, 1.96 MB: the firm's photos are embedded twice (see defect 1).
- Vanilla JS with no library, styled from the Phase 2 tokens.
- Built by `siding/brand-v2/phase3/build_phase3b.py`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Why these three

These are the three mechanisms the build depends on that could fail. Each is proven working before the build starts.

| # | Proof section | Reference | Risk proven |
|---|---|---|---|
| P1 | Hero split-slider | MERSI (mechanism measured live) | Opposing clip-path wipes plus a synced label plate, driven by four inputs (scroll, drag, buttons, keys) without fighting each other. Lerp settling, with no autoplay and no snap. Reduced motion. |
| P2 | Before/after seam | MERSI seam | An accessible slider over a photo pair: role="slider", aria-valuenow/text, arrow / Page / Home / End keys, pointer drag. A pair switcher across the firm's 6 genuine pairs, using the MERSI wipe. |
| P3 | Wall assembly | Lusion flow, Graza bar | A sticky stage builds the wall by scroll: stud, sheathing, wrap, then courses bottom-up. Boards land on the settle curve. The course line and base line are tied to scroll. The step list mirrors progress in text. |

## 2. Evidence

Tested in Chromium with Playwright, through real scrolling and input, not only the harness.

- **P1, scroll.** Scrolling to 50% of the sticky run lands on job 2: the label reads "2" and the next slide's clip is `inset(0%)`.
- **P1, Next button.** Moves to job 2.
- **P1, reduced motion.** Next switches immediately, with no lerp.
- **P2, keyboard.** From 50, four ArrowLeft presses give 30; End gives 95 (the 5% clamp).
- **P2, pair switch.** Choosing the first chip updates the heading to "Rob Roy, Austin".
- **P3, full scroll.** All 8 steps are marked done.
- **Layout.** 375 px wide: `scrollWidth` 375. Console: no errors.

**Frames** (in `siding/brand-v2/shots/`):
- `p3b-hero-{0,05,1}.png`
- `p3b-seam-{50,30}.png`
- `p3b-wall-{0,30,60,100}.png`
- `p3b-375.png`
- `p3b-sheet.png`

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.0 | The hero split reads as one house across the seam, with opposing wipes. The seam is clean. The wall drawing is clear but sparse: no material texture yet. |
| Usability (30) | 8.0 | Every mechanism works by keyboard. The seam is a real slider. The hero has buttons as well as scroll and drag. Reduced motion is honoured. Targets are 44–56 px. No overflow at 375. |
| Creativity (20) | 7.0 | One clip mechanism serves the hero, the seam and the pair switch. The wall builds in crew order, with the brand's course line as the arriving and leaving thread. |
| Content (10) | 8.0 | Locked wording only. Pair captions give the place and trade. Process steps are flagged as draft copy. |
| **Weighted** | **7.40** | **PASS.** |

**Vetoes: zero.**

## 4. Defects found and fixed

1. **The hero photo halves were offset.** A wrong object-position put the wrong part of each photo in each half. Now each half shows its own half of a full-width frame.
2. **The wall labels clipped at the viewBox edge** ("LAP BOAR"), and they showed before their layer existed. Moved inside the edge, and now revealed with their layer.
3. **Two pair chips both read "Maple Run, Austin."** Each chip now names its trade.
4. **The wall drawing was small in a wide viewBox.** The viewBox is cropped, so the drawing is about 1.6× larger.
5. **The courses landed top-down,** which contradicted the copy and real practice. They are now laid bottom-up.

## 5. Defects remaining (carried into the build)

1. **Weight.** The six pairs are embedded twice: once in the DOM, once in the pair-switch JSON. The build will hold each image once and point to it.
2. **The hero image crop on tall phones.** It shows the middle of each half; art direction per pair is needed.
3. **Wall drawing material.** It needs board texture or shadow lines on the face (B1 motif) to reach the Graza quality bar.
4. **Scroll engine.** The hero and wall use their own scroll listeners. The build will run one scroll engine (S1321: Lenis plus ScrollTrigger, or a single native listener) driving every pinned section.
