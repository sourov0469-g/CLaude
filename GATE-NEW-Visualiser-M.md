# GATE-NEW — Visualiser M, "Pull a colour through"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 3 (Hero M and Services M accepted by Muse; the M pass resumed after Muse accepted GATE-BACKGROUND-V2). The configurator stays where it belongs (Visualiser only). Nothing here is game-like: no score, no goal, no timer.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Visualiser M, "Pull a colour through"** (`?vis=m`) |
| Primary reference (annex v3, one) | **Lusion**: flow, the carrying thread that makes one continuous journey. No Visualiser version has used Lusion: A, B and G used Quiet Cubes; C and F Cash App; D Rimowa; E an Ever craft note; H Scout; I Apple AirPods Pro; J Cowboy; K Dropbox; L Graza. Bruno Simon and Lando Norris are scoped to other content. MERSI's split-slider and seam belong to the hero and the before/after pairs. Lusion is the one annex reference left that fits a colour chooser. |
| Signature creative move | **The colour runs down the boards.** All 17 published ColorPlus colours for Austin sit on one continuous ribbon, lightest to darkest, drawn through a fixed eye under a lap-sided house. Pull the ribbon and the colour under the eye flows into the house from the top course down: each course follows the one above it, a beat behind, like a thread drawn through a loom. Mid-pull the wall shows the neighbouring colours stacked course by course, and every course is always a real published colour, never a blend. Let go and the ribbon settles on the nearest colour; the flow finishes down the wall, and the name settles. |
| Style family | One continuous colour ribbon under a drawn house, with a single readout (flow, not steps or tiles) |
| Content | The 17 published James Hardie ColorPlus values for Austin (names and hex, the list A–L use), Arctic White trim ("the ColorPlus trim colour"), and the homepage's own line "Screens show colour a little differently; see real samples at the free inspection." The ribbon's order is computed from the published hex values (lightness). No new colours, names, prices or claims. |
| How it differs from every existing Visualiser version | A fans swatches over a house. B snaps a wall together in five steps. C compares colour fields. D is a step instrument. E offers pairings. F maps colour on two axes. G asks four questions. H changes the light. I is a loupe. J puts your house on a street. K grows a tile into a page. L rolls paint on or turns the boards. None lets one continuous gesture travel through every colour, and none shows neighbouring colours flowing down the same wall in sequence. |
| Why it is better | It is the fastest way to see all 17 on a house: one pull, about two seconds, and the wall has worn each colour in turn. Stopping between two colours shows them stacked on the same boards, a natural side-by-side, yet the wall never shows a colour that is not real. The current best (L, "Roll it on", 8.50) explains how a colour arrives but shows one colour at a time. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the house), one control (the ribbon); ⟦S0220⟧ published colours only; the approximation stated |
| Ribbon | ⟦S0054⟧ `role="slider"` (1–17) with `aria-valuetext` "Mountain Sage, 7 of 17"; ← → step, Home / End, Page Up / Down ±4; ⟦S1443⟧ drag with pointer capture, a flick carries on and settles; a non-gesture alternative (keys and buttons) |
| Chips on the ribbon | One treatment for all 17 (⟦S1427⟧); each name in ink chosen by luminance for contrast (⟦S1497⟧); a click pulls that colour to the eye |
| The eye | A fixed notch above the ribbon's centre: the colour under it is the wall's colour |
| Flow down the courses | ⟦S1436⟧ a chain of followers: the top course eases toward the ribbon, each course below eases toward the one above (frame-time normalised), so the colour runs down and settles in about a second; ⟦S1315⟧ the loop runs only while something is still moving |
| Lighter / Darker buttons | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px targets; the button system (hover, press, spring, ring) |
| Readout | `aria-live="polite"`, announced on settle only: the name, "ColorPlus · #hex", its place in the order, the trim note; ⟦S1494⟧ plain sentences |
| CTA | ⟦S1435⟧ one filled "Book a free inspection"; the samples line verbatim |
| Arrival | ⟦S1325⟧ once, on entering view: the ribbon pulls from Arctic White to the default colour, so the flow is shown before it is asked for |
| Phone | The house to full width; narrower chips; the buttons beside the ribbon; drag works with touch (`touch-action: pan-y` keeps the page scrolling) |
| Reduced motion | ⟦S0400⟧ no flow: the whole wall changes at once, the ribbon jumps, no arrival |
| Background law | White ground; the stage and the ribbon are `data-solid` |

---

## Build log

**How to view:** `?vis=m` (switcher: Visualiser, **M "Pull a colour through"**).

**Files:**
- `src/sec/vis8.js` (`Vis8.M`, `Vis8.wire`) and `src/sec/vis8.css` (class prefix `vm` under `.viM`; the collision check found no shared names).
- `build_site.py`: the module added to `MODS`, pre-rendered as `vm`, wired, given the `vis` slot letter `m`, and listed in the switcher. Nothing else changed.
- The file grows by **25,541 bytes**; no images.

**The ribbon.** The 17 ColorPlus colours are ordered by perceptual lightness (OKLab L) computed from the published hex, lightest to darkest:

Arctic White, Navajo Beige, Cobble Stone, Light Mist, Pearl Gray, Khaki Brown, Gray Slate, **Boothbay Blue** (the default), Aged Pewter, Timber Bark, Mountain Sage, Night Gray, Evening Blue, Rich Espresso, Iron Gray, Countrylane Red, Deep Ocean.

- Each colour is a 132 px chip (104 px on phones) carrying its name. Ink colour is chosen by luminance.
- The chips sit edge to edge as one band, drawn through a fixed eye: a notch and a ring at the centre.
- The band fades out at both ends.

**The flow (a chain of followers):**
- The ribbon's position eases to its target.
- The top course of the house follows the ribbon, and each of the 20 courses below follows the course above it. Every follow uses `1 − e^(−22·dt)`, normalised for frame time.
- Each course shows the **nearest real colour** to its own position, never a blend, so a pull leaves the wall in bands of neighbouring published colours that run down the boards.
- The loop stops when nothing moves.

**Input:**
- **Drag** with pointer capture. A flick carries on: velocity × 0.22, at most 6 colours. The ends rubber-band. `touch-action: pan-y` keeps the page scrolling on phones.
- **Click or tap** a chip to pull it to the eye.
- **Keys:** ← → ↑ ↓ step one, Page Up / Down step four, Home / End jump to the ends.
- **Buttons:** "‹ Lighter" and "Darker ›".
- **Wheel:** a horizontal trackpad swipe moves the ribbon.

**Readout:**
- The visible name, "ColorPlus · #hex", its place ("Colour 8 of 17, lightest to darkest") and the trim note follow the eye.
- A visually hidden polite live region speaks only once a change you made settles. The arrival is not announced.
- The slider carries `aria-valuenow` and `aria-valuetext` ("Boothbay Blue, 8 of 17").

**Arrival:** once, when the house is 35% in view, the ribbon pulls from Arctic White to Boothbay Blue at a slower rate (3.2), so the colour is first seen running down the boards.

**Layout:**
- **1440:** heading, readout and CTA in a left column; the house on the right; the ribbon full width beneath. All of it fits one 900 px screen.
- **Under 1000 px:** heading, house, ribbon, then the readout.
- **Phone:** the Lighter and Darker buttons sit in a row under the ribbon.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-vis-m-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`, `-390-1`;
- `-1440-flow`: mid-pull, six colours stacked down the boards;
- `-1440-picked`: settled after a chip click and a Darker step;
- `-390-tap`: Aged Pewter tapped on a phone;
- contact sheet `new-vis-m.jpg`.

Section QA ran on `?bg=none`, so the white ground is plain; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Every course a real colour | `true`: all 20 course fills are members of the published 17 at every capture, including mid-pull |
| Keyboard | From Boothbay Blue: End → Deep Ocean (17 of 17); ← ← → Iron Gray (15); Home → Arctic White (1); Page Up → Pearl Gray (5). Readout and `aria-valuetext` agree each time |
| Flow, measured | End from Boothbay Blue: the top course reaches Deep Ocean at **296 ms** and the bottom course at **1,213 ms**, with up to **10** real colours on the wall at once on the way |
| Drag | A 660 px pull shows 6 colours on the wall mid-pull; on release it settles on Evening Blue with 1 colour on the wall |
| Chip click / step | Mountain Sage clicked → "Mountain Sage, 11 of 17"; Darker → Night Gray (12) |
| Phone tap (390) | Aged Pewter tapped → "Aged Pewter, 9 of 17"; Lighter / Darker 48 px tall |
| Live region | Empty after arrival; "Deep Ocean, ColorPlus, colour 17 of 17." after a key change settled |
| Reduced motion | No arrival or flow; End changes the whole wall at once (1 colour on the wall immediately) |
| All homepage version views (115) | 0 page errors and 0 overflow in every one |
| Existing versions | The 186 existing slot templates are byte-identical; one template added (`vis:m`); the page body outside templates, styles and scripts is identical; defaults unchanged (`LIVE` untouched; the Visualiser's live version stays B); subpages untouched |
| Locks | "(512) 550-0000" verbatim; no other locked fact appears in this section; no new number or claim |

## Defects found and fixed

1. **The ribbon fell below the fold.** At 1440 × 900 the centred house pushed the ribbon off the screen, so you couldn't pull and watch at once. It was rebuilt as one grid (text column, house, full-width ribbon) with the drawing's empty margins cropped. House and ribbon now share one screen.
2. **The readout lagged the eye.** Mid-pull, the name still showed the last settled colour. The visible readout now follows the eye, and a separate hidden live region speaks only on settle.
3. **The arrival announced itself.** The live region now speaks only for settles you caused.
4. **Chip names were faint** (62% opacity). Raised to 80%; the colour under the eye is 100% and bold.
5. **A test fault, not a page fault:** two clicks in the first test run landed outside the ribbon's visible window. Re-tested on visible chips: both work.

## Remaining defects, named honestly

- **The house is a drawing.** It is a generic gabled elevation (an interface graphic), not the visitor's house or a photo of a job. That is the same as K and L.
- **Lightness order only.** The order is by lightness, so hue jumps where lightness is close: the one red, Countrylane Red, sits between Iron Gray and Deep Ocean.
- **ColorPlus only.** Only the 17 ColorPlus colours are on the ribbon. The painted Sherwin-Williams route is covered by Visualiser L.
- **Names at the ribbon's edges fade** with the mask. Names are 12 px; the colour under the eye is bold.
- **The horizontal trackpad swipe was not exercised** by the tests; drag, click, tap, keys and buttons were.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Visualiser M | ⟦S1434⟧ the house dominates, with one control (the ribbon); ⟦S0220⟧ published colours only; approximation stated |
| Element | ribbon | ⟦S0054⟧ `role="slider"` 1–17, `aria-valuetext`, arrows, Page Up / Down, Home / End; ⟦S1443⟧ drag with pointer capture, flick and settle, rubber-band ends; keys and buttons as the non-gesture route |
| Element | 17 chips | ⟦S1427⟧ one treatment; ⟦S1497⟧ ink by luminance; click or tap pulls a chip to the eye |
| Element | the eye | A fixed notch and ring; it takes the lime focus ring when the slider has focus |
| Motion | flow down the courses | ⟦S1436⟧ chain of followers (`1 − e^(−22·dt)`): top course 296 ms, bottom course 1,213 ms; ⟦S1315⟧ the loop stops at rest |
| Element | Lighter / Darker | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px; button system: hover, press, spring, ring |
| Element | readout and live region | ⟦S1494⟧ plain sentences; visible readout follows the eye; polite live region speaks on settle only |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button; the samples line verbatim |
| Motion | arrival | ⟦S1325⟧ once, at 35% in view: Arctic White → Boothbay Blue, slower |
| Site | phone | Single column: house, ribbon, buttons, readout; `touch-action: pan-y` |
| Site | reduced motion | ⟦S0400⟧ no arrival or flow; the wall changes at once |
| Site | background law | White ground; stage, ribbon and side are `data-solid` |

## Reference transfers and non-transfers (Lusion)

**Transferred:**
- flow as one continuous journey: a single gesture carries you through every colour;
- the carrying thread: a ribbon drawn through an eye;
- continuity: the change travels through the object (down the courses) instead of cutting.

**Not transferred:**
- Lusion's WebGL scenes and its dive (locked to Try D);
- Booking K's drawn route line and bead;
- Services M's morphing outline;
- Lusion's own type and palette.

## Comparison with the section's previous best (Visualiser L, "Roll it on", 8.50)

- **L is stronger on:** explaining how a colour gets onto a wall, and the difference between the two finish routes. It also covers the painted Sherwin-Williams swatches.
- **M is stronger on:** speed of comparison. All 17 are reachable in one pull, neighbouring colours show stacked on the same boards, and the wall never shows a colour that isn't real.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | One calm composition: house, ribbon and readout on one screen at 1440 (`-1440-0`); the mid-pull frame reads as colour running down the boards (`-1440-flow`); one treatment for every chip. **Minus:** the house is a generic drawing |
| Usability (30) | **8.5** | Drag, flick, click, tap, keys and buttons all reach every colour; slider semantics; announcements on settle only; reduced motion; 0 errors in 115 views, 0 overflow. **Minus:** edge names fade, and the trackpad swipe is untested |
| Creativity (20) | **8.7** | No Visualiser version flows a single gesture through every colour, or shows neighbouring colours running down the same wall |
| Content (10) | **8.4** | The 17 published colours, names and hex, the trim note and the samples line verbatim; every course always a real colour. **Minus:** ColorPlus only; order by lightness splits hues |
| **Weighted** | **8.57** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.5 + 0.2 × 8.7 + 0.1 × 8.4 = 3.44 + 2.55 + 1.74 + 0.84 = **8.57**.

**Vetoes: none.**
- Locks verbatim; no form.
- A configurator in the Visualiser only; nothing game-like.
- White ground; brand accents only; normal fonts.
- No invented imagery or colours.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Windows M until Muse accepts.
