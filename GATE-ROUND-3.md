# GATE: Round 3 — Windows + Proof/Reviews

**Date:** 2026-11-03.
**Under:** Muse's order to continue two sections at a time, two versions each, in the one file, without waiting.
**Section order:** direction v2 (hero → services → visualiser → **windows → proof/reviews** → process → service area → CTA + footer → nav polish).

## 1. Realness duty (windows): research done before building

Direction v2 requires every window part to be real. What I verified, and from where:

| Part | Andersen fact | Source |
|---|---|---|
| Frame | 100 Series is Fibrex, Andersen's composite. It is the firm's main Andersen product: 33 of 38 Andersen jobs (FACTS.md). | [andersenwindows.com, 100 Series single-hung](https://andersenwindows.com/windows-and-doors/windows/single-hung-and-double-hung-windows/100-series-single-hung-window); [parts catalogue](https://parts.andersenwindows.com/detail_100%20Single%20Hung__HungWindows.html) |
| Sashes | Single-hung: a fixed upper sash and an operable lower sash that slides up and down | [City of Detroit HDC submittal](https://detroitmi.gov/sites/detroitmi.localhost/files/hdc-submitted-materials/2023-12/Andersen%20Window.pdf) |
| Hardware | The lock engages when the window closes; an optional lift. Both are on the **interior**, so they are not drawn from outside | [100 Series single-hung product sheet](https://prodcd2.andersenwindows.com:443/-/media/andersenwindows/files/product-info-sheets/100-series-single-hung-windows-ss-v10.pdf) |
| Grilles | Finelight grilles sit **between** the panes, so they are drawn under the glass reflection | [100 Series brochure](https://www.kuikenbrothers.com/wp-content/uploads/100-Series-Brochure.pdf) |
| Glass | Low-E (SmartSun) | FACTS.md, windows page |
| Frame colours | White, Sandtone, Terratone, Dark Bronze, Black, with the firm's published hex values | `work/data/window_colours.json` |
| Bay | 400 Series bays: three units on 30° or 45° angled joining posts, with head and seat boards, platforms and support hardware | [Andersen 400 Series bay and bow](https://andersenwindows.com/windows-and-doors/windows/bay-windows-bow-windows/400-series-bay-bow-windows); [Hammond Lumber listing: head & seat boards and angle bay supports](https://eshowroom.hammondlumber.com/bargain-bin/9131) |
| Wall build-out | Lap siding over house wrap, over sheathing, over studs with insulation | Standard wall assembly; matches the firm's install process (house wrap, Hardie lap) |

**Two details drawn because they are true:**
- The single-hung **lower sash slides up behind the upper sash** (the upper sash sits to the outside), so when lifted it is seen through the upper glass.
- The **insect screen** covers only the lower half, on the outside.

**Not drawn:** the sheet's exploded cross-section. I could not verify every component in it, so it stays out, as v2 requires.

## 2. What was built (both in `siding/redo/site/out/site.html`)

**Live order:** header → Hero V1 → Services A → Visualiser B → **Windows A** → **Reviews B**.

Backups stay in the file as `<template>`; for audit, use `?windows=b` and `?reviews=a`.

The windows section now owns `#windows`, so the header's Windows link lands on it. The services windows slide became `#svc-windows`.

### Windows (sheet: day/night same window; 3D built-out bay)

| | **A — one window, morning to midnight (WINNER)** | B — a bay built out from the wall (backup) |
|---|---|---|
| Object | One Andersen 100 Series single-hung in a lap-sided wall, drawn from outside | A 400 Series casement bay, three units on angled posts, projecting from the wall in CSS 3D (a small object, not big 3D) |
| Interaction | **Day slider, 7 am to 11 pm.** By day the glass reflects sky. At dusk the wall cools. At night the room glows warm through the glass and light spills onto the siding below. On entering view the day runs itself from morning to dusk once. | **Turn the bay** with the cursor (drag on touch). Switch between **30° and 45°**: the projection is recomputed from the real geometry. |
| More | **Lift the sash** (it slides up behind the upper sash). **Grilles** on/off. **Frame colour** (5 Andersen colours). **Parts list**: hover or focus a part (Fibrex frame, fixed upper sash, lower sash, Finelight grilles, screen, trim and sill) and it lights in lime in the drawing. | **Peel a layer**: siding, then house wrap, then sheathing come off in turn, down to studs and insulation; then "Build it back" |
| Facts | 388 documented window jobs. Of 376 priced: NT Windows 238, Simonton 54, Andersen 38, Pella 31 | Andersen Certified Contractor, Premier; 38 priced Andersen jobs, median band $20k–$25k |

### Reviews (sheet: ONLY the 4.9 reveal and hanging tags; no map, no video wall)

| | **B — the rating as hanging tags (WINNER)** | A — the 4.9 laid course by course (backup) |
|---|---|---|
| Presentation | Two lines across the section. The **4.9 tag** (green, stars, "474 Google reviews") hangs at the top centre. Eight genuine review tags hang beside it, each with its trade. On phones it is one long line that scrolls sideways. | A giant **4.9** built of deep-green lap courses that slide in from alternate sides, course by course. Then the stars and "4.9 from 474 Google reviews" appear. |
| Interaction | **The cursor is the breeze.** Tags it passes swing on spring physics and the line dips. On entry, each tag is pegged on with its own swing. **Tap a tag** to open the whole review, verbatim, in a dialog (Escape closes it; focus returns to the tag). | The courses lean away from the cursor like loose boards. Beside them, a **quote reader**: one review at a time, auto-advancing every 7 s (pauses on hover or focus), with arrows and "Read the whole review" |

**Honesty:**
- Every quote is checked **verbatim against `reviews.json` at build time**; the build fails if any excerpt is altered.
- **No per-review stars** are shown, because the records carry none.
- The only rating is the locked **4.9 / 474**.
- Names are as printed.

## 3. Audit (Playwright, 1440 × 900 and 390 × 844 touch)

| Check | Result |
|---|---|
| JS errors | **0**, all four versions, both widths |
| Sideways scroll | **none** |
| Window intro | Runs to 7:45 pm and stops. Any touch of the slider stops it. Keyboard End → "11 pm" (`aria-valuetext`). |
| Lift / grilles / colour | Sash lifts (`aria-pressed`). Grilles toggle. Dark Bronze applied; the colour radios work with arrow keys. |
| Part highlight | Grilles: 2 groups lit lime. The screen outlines in lime. Everything else dims. |
| Bay | 30° ↔ 45° recomputes projection. Peel goes 1 → 2 → 3, then "Build it back" → 0. Cursor turn: rotateY −22° → −7.9°. |
| Tags | Breeze swing measured (angles −0.7° … 3.4°). Dialog opens with focus on Close; Escape closes and returns focus to the tag (both widths). |
| Quote reader | Arrows 1 → 3 / 8; full review expands |
| Reduced motion | Final states at once: the number is laid; tags hang still; the bay is out; the window does not run its intro; no transitions |

**Contrast (new text pairs):**

| Pair | Ratio |
|---|---|
| Ink on tag cream `#FBF8F1` | 16.63 |
| Trade label green on lime-light | 10.95 |
| `#CFE6B0` on green (4.9 tag) | 9.28 |
| Muted `#5B636B` on white (ticks, part notes) | 6.10 |

### Defects found and fixed

| # | Defect | Fix |
|---|---|---|
| 1 | **The closed review dialog covered the whole page and swallowed every click** (its `display:grid` overrode `hidden`) | `[hidden]{display:none}` on the dialog; re-tested every control on the page |
| 2 | Night darkened the lit glass too, so the glow looked brown | The night tint is masked off the opening; the opening itself glows; sash frames dim on their own |
| 3 | Light spill on the siding showed as a hard-edged rectangle | Soft elliptical spill, screen-blended |
| 4 | The window drawing left white bands at the card's sides | The wall extends past the drawing and the card crops it (`slice`) |
| 5 | The bay's metal roof cut into the window heads (only its edges showed) | The roof is raised so its front edge meets the head |
| 6 | The house-wrap layer never showed (invalid background shorthand), so peel 1 jumped straight to sheathing | Colour moved to the last layer; wrap now shows white with its print grid |
| 7 | Part highlight: the lit grilles sat inside a dimmed sash, so nothing showed | Dimming skips the lit part's ancestors (`:has`); lit grilles turn lime |
| 8 | Grilles barely visible under the day reflection | Reflection 0.8; grille 0.78 (still read as between the panes) |
| 9 | Nine tags on one line overlapped at 1440 | Two lines (5 + 4) on wide screens; one scrolling line on phones |
| 10 | "QUIET!…": an ellipsis after a finished sentence | An ellipsis only when a cut ends mid-sentence |
| 11 | Ruled lines on the quote card crossed the text | Removed |

### Remaining defects (open)

1. **Window A:** when the sash is lifted by day, the open lower half reads as a flat dark room. A real room would show faint interior shapes; I drew none rather than invent an interior.
2. **Bay (backup):** the wall panel's edges show inside the card. It reads as a cut-away sample, not a whole house.
3. **Tag dialog:** the header stays above the dimmed backdrop (z-order). This is harmless, but not ideal.
4. **Reviews B on phones:** the sideways scroll has no visible hint beyond the clipped tag at the right edge.
5. Software GL only: smoothness on real hardware is untested.

## 4. Screens

All in `siding/redo/site/gate/`:

- `r3-windows-1440.jpg`: morning, dusk, night with the sash lifted, parts highlight, plus backup bay (start, wrap).
- `r3-windows-390.jpg`: morning, dusk, night at 390, plus the backup bay at studs.
- `r3-reviews-1440.jpg`: the line, the breeze, the opened review, plus the backup 4.9.
- `r3-reviews-390.jpg`: the same at 390.
- `r3-*.jpg`: single frames.

## 5. WEB-SKILLS tags

| Tag | Applied |
|---|---|
| ⟦S0001⟧ | One memorable object each: the same window through a day; the rating hung on a line |
| ⟦S0056⟧ | Transform and opacity only. Tag physics runs only while moving and in view. The window intro is one rAF that ends. |
| ⟦S0089⟧ | Spring tags (stiffness 0.045, damping 0.045); sash lift on an over-shoot curve; bay turn eased 0.12 per frame |
| ⟦S0063⟧ | UI 0.16–0.2 s ease-out; dialog 0.2–0.3 s; no ease-in on UI |
| ⟦S0650⟧ | Headlines ≤ 8 words ("One window, morning to midnight." / "4.9, hung out to read."); support ≤ 35 words |
| ⟦S0220⟧ | Locked facts only; genuine reviews only; no invented stars, no map, no video wall |
| ⟦S0049⟧ | Labelled range with `aria-valuetext`; radios with arrow keys; `aria-pressed` toggles; modal dialog with focus in, Escape, focus return |
| ⟦S1501⟧ | One emphasis per view: the lit window; the green 4.9 tag |
| ⟦S1320⟧ | Complete without motion; markup pre-rendered |

## 6. Scorecard

Design 40 / Usability 30 / Creativity 20 / Content 10. PASS = weighted ≥ 7.0, no category < 6.0, zero vetoes.

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| **Windows A** | 8.2 | 8.4 | 8.0 | 8.8 | **8.28** | **PASS — live** |
| Windows B | 7.6 | 7.6 | 8.2 | 8.2 | 7.78 | Backup: strong idea; the cut-away wall reads less finished than A |
| **Reviews B** | 8.0 | 8.2 | 8.4 | 8.6 | **8.20** | **PASS — live** |
| Reviews A | 8.2 | 7.6 | 7.8 | 8.6 | 8.00 | Backup: the 4.9 is striking but shows one review at a time |

**Vetoes:** none.
- No invented facts.
- No invented reviews, wording or stars.
- No placeholders.
- No sideways scroll.
- No JS errors.
- CTAs go to the live booking page.

## 7. Next

**Round 4: process** (full-view stacked chapters, NOT five cards; the game idea as a horizontal-scroll interactivity sequence) **and service area** ("On your street": pinned photo cards by neighbourhood, rippling thread, board-end signs; more interactivity; no drawn map; "312 on the map with photos + 574 more counted" verbatim). Two versions each.

**Shot list for Muse (optional, would lift Windows A):** one genuine photo of an Austin Pro window install at dusk with the room lit, landscape, ≥ 1600 px, as a "seen on a real job" inset beside the drawing.
