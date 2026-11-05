# GATE-NEW — Visualiser N, "Torn between two"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 4, section 3 (Hero N and Services N accepted by Muse). The configurator stays where it belongs (Visualiser only). Nothing game-like.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Visualiser N, "Torn between two"** (`?vis=n`) |
| Primary reference (annex v3, one) | **MERSI**: the split cover, two halves that move independently, a seam, and a central label that names what meets there. No Visualiser version has used MERSI: A, B and G used Quiet Cubes; C and F Cash App; D Rimowa; E an Ever craft note; H Scout; I Apple AirPods Pro; J Cowboy; K Dropbox; L Graza; M Lusion. Bruno Simon and Lando Norris are scoped to other content. |
| Signature creative move | **One house, split down a seam, two colours at once.** The homeowner's real dilemma is choosing between two colours, so one drawn house is split by a draggable seam. The left half wears one ColorPlus colour and the right half another, on the same boards and under the same trim. Each half has its own colour rail. Turn either rail and that half changes. The rails move in opposite directions, as MERSI's halves do, and the label on the seam names the pair: "Boothbay Blue \| Arctic White". Drag the seam to give either colour more of the house, or double-click it to centre. "Swap sides" exchanges the two. |
| Style family | A split elevation: two colours meeting at a seam on one house, two quiet rails, one seam label |
| Content | The 17 published James Hardie ColorPlus colours for Austin (names and hex, the list A–M use), Arctic White trim ("the ColorPlus trim colour"), and the homepage's own line "Screens show colour a little differently; see real samples at the free inspection." No new colours, names or claims. |
| How it differs from every existing Visualiser version | A fans swatches over a house. B snaps a wall together in five steps. C compares flat colour fields side by side. D is a step instrument. E offers pairings. F maps colour on two axes. G asks four questions. H changes the light. I is a loupe. J puts a house on a street. K grows a tile into a page. L rolls paint on or turns the boards. M pulls one colour ribbon through the courses. None compares two colours on the same house at the same time, meeting at a seam the visitor can move. |
| Why it is better | It is the decision homeowners are actually stuck on ("this one or that one?"), answered on the house itself, both at once, under the same trim. C compares flat fields; N compares them where they'll actually be. The current best (Visualiser M, "Pull a colour through", 8.57) sweeps through all 17; N settles the last two. |
| Pairing note (F17) | Hero K, Windows L, Reviews M and Try M also use MERSI's seam. Pick at most one or two seams for one page. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the split house); ⟦S0220⟧ published colours only; approximation stated |
| Seam | ⟦S0054⟧ `role="slider"` (10–90%) with `aria-valuetext` "Boothbay Blue on 50% of the house"; drag with pointer capture, ← → keys, Home / End, double-click to centre; ⟦S1443⟧ keys as the non-drag route |
| Colour rails (2) | ⟦S0054⟧ each a `radiogroup` of 17 swatches with roving tabindex, ↑ ↓ ← → and Home / End; ⟦S1436⟧ the two rails slide in opposite directions to bring the choice to the seam |
| Seam label | MERSI's synced label: both names roll in step with the rails |
| Swap sides | ⟦S0054⟧ a named button; ⟦S1441⟧ 48 px; button system |
| Readout | ⟦S1494⟧ "Left: Boothbay Blue, ColorPlus. Right: Arctic White, ColorPlus." with the samples line; announced politely |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" ("bring real samples") |
| Phone | The house full width, seam draggable by touch (`touch-action: pan-y`), the rails as two horizontal strips |
| Reduced motion | ⟦S0400⟧ rails jump; the label changes at once |
| Background law | White ground; stage and rails are `data-solid` |

---

## Build log

**How to view:** `?vis=n` (switcher: Visualiser, **N "Torn between two"**).

**Files:**
- `src/sec/vis9.js` (`Vis9.N`, `Vis9.wire`, `Vis9.CP`) and `src/sec/vis9.css` (class prefix `vn` under `.vnN`). The collision check found `.vn`, `.vnm` and `.vnv` in Visualiser K and L; all are scoped under `.viK` / `.viL`, so nothing is shared.
- `build_site.py`: the module added to `MODS`, pre-rendered as `vn`, wired, given the `vis` slot letter `n`, and listed in the switcher. Nothing else changed.
- The file grows by **27,275 bytes**; no images.

**The house:** one SVG elevation (gable, two windows, a round gable window, the deep-green door) with its wall clipped twice. The right colour fills the whole wall; the left colour is laid over it through a clip rectangle whose width is the seam. The lap shadows, trim and roof sit on top, so both halves share the same boards and the same Arctic White trim.

**The two rails:**
- Each rail is a `radiogroup` of the 17 published ColorPlus colours. The left rail runs light to dark and the right rail runs dark to light, so stepping both "forward" moves them in opposite directions (measured: −56 px and +56 px per step).
- The chosen swatch is always brought level with a fixed ring at the rail's middle.
- Desktop: two vertical columns either side of the house. At 1000 px and below: two horizontal strips, one above the house and one below.

**The seam:**
- `role="slider"`, 20–80% of the drawing. The wall spans about 10–90% of the drawing, so each colour always keeps at least an eighth of the wall (see defect 3).
- `aria-valuetext` names both colours ("Boothbay Blue on the left 50% of the house, Arctic White on the right").
- Drag with pointer capture; a click or tap on the house moves the seam there; double-click centres it.
- Keys: ← → ↑ ↓ ±2, Page Up / Page Down ±10, Home / End.

**The label** (MERSI's synced label): a pill riding the seam names the pair, "Boothbay Blue | Arctic White". Each name rolls out and in (left up, right down) as its rail changes. It is clamped so it never leaves the house.

**Below the stage:**
- A polite readout: "Left: Boothbay Blue, ColorPlus. Right: Arctic White, ColorPlus. Trim in Arctic White, the ColorPlus trim colour."
- **Swap sides.**
- The one filled **Book a free inspection**, with the homepage's own line "Screens show colour a little differently; see real samples at the free inspection."

**Starting pair:** Boothbay Blue (left) and Arctic White (right).

**Reduced motion:** the rails jump, the names change at once, and the fills change without fading.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-vis-n-1440-0`, `-1440-1`, `-1440-picked`, `-1440-drag` (seam dragged to 30%), `-1440-edge` (seam at 80%);
- `-768-0`, `-768-1`, `-390-0`, `-390-1`, `-390-tap`;
- contact sheets `new-vis-n-1440-sheet.jpg` and `new-vis-n-390-sheet.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids. Swatches ≥ 52 px tall (80 px on phones); Swap 48 px; seam hit area 48 px |
| Colours actually on the house | Rendered pixels are read from a screenshot at a wall point on each half. Start: left #778184 (Boothbay Blue), right #E0E0D8 (Arctic White). After ↓ on the left rail: left #5F696D (Evening Blue). After Home on the right rail: right #714D47 (Countrylane Red). After dragging to 30%: the points at 25% and 36% read Deep Ocean #49545C and Cobble Stone #C6BEB0, exactly the two chosen. After Swap: reversed |
| Rails | Keys move the selection and the focus with it (focus "Evening Blue"); the chosen swatch is centred to 0 px on both rails at every width; opposite travel −56 / +56 px; phone taps on a neighbouring swatch pick it (Gray Slate, Cobble Stone) |
| Seam | Keys: End 80, Home 20, → 22, Page Up 32, ← 30, Page Down 20. The handle's position matches `aria-valuenow`. Drag to 30% (`vndrag` on while dragging); click at 70% → 70; double-click → 50; phone tap at 25% → 25; the label stays inside the house at 20% and 80% |
| Swap | Deep Ocean / Cobble Stone → Cobble Stone / Deep Ocean; label, readout and both rails follow, rails re-centred |
| Locks and colours | (512) 550-0000 and the samples line verbatim; both fills are always one of the 17 published hex values |
| Reduced motion | Track transition `none`; End on the left rail → Countrylane Red at once; 0 errors |
| All homepage version views (124) | 0 page errors and 0 overflow in every one |
| Existing versions | The 194 existing slot templates are byte-identical; one template added (`vis:n`); `LIVE` untouched (Visualiser stays B); subpages untouched |

## Defects found and fixed

1. **The rails set the stage's height.** Seventeen swatches stood 1,008 px tall at 1440, which pushed the house into a tall, empty box. The tracks are now positioned absolutely, so the house sets the height (567 px).
2. **The house was small on tablets.** Three columns at 768 left the house 348 px wide. Below 1000 px the rails now become strips above and below the house, which is 676 px wide.
3. **At the ends of the range, one colour vanished.** At 10% or 90% the smaller colour shrank to a 2 px sliver, because the wall itself only runs from about 10% to 90% of the drawing. The range is now 20–80%, so each colour always keeps at least an eighth of the wall. (The plan line said 10–90%; this is the reason for the change.)
4. **A code comment silently stopped the handle moving.** After defect 3, an inline comment commented out the rest of its line, so the colour moved but the handle stayed at 50%. The 80% screenshot caught it. The comment now has its own line, and the test checks the handle's position against `aria-valuenow`.
5. **The label could leave the house.** Riding the seam at the edges would have pushed the pill off the stage on phones. It is now clamped in pixels and re-placed when a name changes length.
6. **A scrolling finger moved the seam.** Moving the seam on `pointerdown` over the house meant a phone scroll that started on the drawing jumped the seam. It now moves on `click`, which a scroll never fires.
7. **The slider named only one colour.** `aria-valuetext` now names both halves.

## Remaining defects, named honestly

- **A drawn house,** not the visitor's own, and screen colour is an approximation. The page says so in the samples line, and the CTA offers the real samples.
- **Another MERSI seam.** Hero K, Windows L, Reviews M and Try M also use a seam. If several are picked for one page, keep one or two.
- **One body colour per half,** under Arctic White trim. Trim colour and two-tone schemes are left to Visualiser E (pairings) and the configurators.
- **The rails show about nine colours at a time on desktop** (five or six on phones); the rest scroll into view as you move.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Visualiser N | ⟦S1434⟧ the split house dominates; ⟦S0220⟧ the 17 published colours only, with the approximation stated |
| Element | seam | ⟦S0054⟧ `role="slider"` 20–80 with both colours in `aria-valuetext`; pointer-capture drag, click, double-click to centre; ⟦S1443⟧ keys as the non-drag route |
| Element | two rails | ⟦S0054⟧ radiogroups, roving tabindex, arrows and Home / End; ⟦S1436⟧ 0.6 s eased travel, the rails moving in opposite directions |
| Element | seam label | MERSI's synced label; the names roll out and in, clamped to the house |
| Element | Swap sides | ⟦S0054⟧ a named button; ⟦S1441⟧ 48 px; button system |
| Element | readout | ⟦S1494⟧ plain sentence; polite live region |
| Element | CTA | ⟦S1435⟧ the one filled Book button with the samples line |
| Site | tablet and phone | Rails as strips; the house at full width; `touch-action: pan-y` keeps vertical scroll |
| Site | reduced motion | ⟦S0400⟧ rails jump, names change at once, fills change without fading |
| Site | background law | White ground; the stage and bar are `data-solid` |

## Reference transfers and non-transfers (MERSI)

**Transferred:**
- the split cover: two halves that change independently;
- the halves moving in opposite directions;
- a seam you can move;
- a central label naming what meets at the seam.

**Not transferred:**
- MERSI's photography, typography and product content;
- its full-screen takeover and scroll hijack (none: the section scrolls normally).

## Comparison with the section's previous best (Visualiser M, "Pull a colour through", 8.57)

- **M is stronger on:** browsing. One gesture sweeps all 17 colours across the house.
- **N is stronger on:** deciding. Two finalists sit on the same house, under the same trim, at the same time, and the visitor sets the balance.
- **Verdict:** M stays the section's best by a hair. N is the natural partner to M (M to shortlist, N to settle), but only one Visualiser goes live.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | One calm split elevation with a clean white seam and a single label (`-1440-0`, `-1440-drag`); quiet rails that mirror each other. **Minus:** a drawing; nine visible swatches per rail is a busy edge |
| Usability (30) | **8.6** | Every route works by pointer, touch and keyboard; pixels verified on the house; a scroll never moves the seam; 0 errors in 124 views. **Minus:** a long rail to travel on phones |
| Creativity (20) | **8.5** | No Visualiser version compares two colours on one house with a movable seam. **Minus:** the seam device is shared with other sections' versions |
| Content (10) | **8.6** | The 17 published names and values, Arctic White as the trim colour, and the homepage's own samples line; nothing new claimed |
| **Weighted** | **8.54** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.6 + 0.2 × 8.5 + 0.1 × 8.6 = 3.40 + 2.58 + 1.70 + 0.86 = **8.54**.

**Vetoes: none.**
- Locks verbatim; no form.
- A configurator, in Visualiser only; nothing game-like.
- White ground; brand accents only; Montserrat / Inter only.
- No invented imagery, colours or numbers.
