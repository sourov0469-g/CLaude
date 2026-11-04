# GATE-NEW — Services L, "Built from our records"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 2 (Hero L accepted by Muse). No configurator is used (configurators stay in the Visualiser): picking a trade only shows its record, and nothing is applied to a house. Nothing is game-like.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Services L, "Built from our records"** (`?services=l`) |
| Primary reference (annex v3, one) | **Quiet Cubes**: modular cubes, a calm and tactile product presentation, and a staffed service behind it. No Services version has used it: C used Apple AirPods Pro and Cash App, D MERSI, E and F an Ever craft note, G Dropbox, H Graza, I Cowboy, J Lando Norris, K Scout. A and B name none. Lusion (the only other unused, unscoped reference) was set aside because Booking K already uses its scroll-drawn line, and the same trick twice on one page is barred. |
| Signature creative move | **A house built from cubes of record.** It is an isotype: one cube for about every ten documented projects of a trade, each set where that trade sits on a house. Roofing cubes form the roof, gutters the eave line, painting the trim and corners, siding the walls, windows the openings, doors the doorways; garage doors sit in a small wing and patio covers in an awning. The house is 165 cubes, assembled bottom to top on arrival. Pick a trade (or point at its cubes) and they lift while the rest fall back, and a panel gives that trade's published record. |
| Style family | A modular isotype: tactile bevelled cubes on white, trade-true material tones, one calm side panel |
| Content | The homepage service list's documented counts (Siding 431, Windows 388, Shingle Roofing 210, Metal Roofing 31, Patio Covers 34, Exterior Doors 109, Garage Doors 9, Exterior Painting 320, Gutters 121), with each trade's priced count and median band from the published "Compare all 10 trades" table. Two published timelines: siding "1 to 2 weeks including paint"; windows "most window-only jobs: two days on site". Decking has no documented count on the list, so it gets no cubes and says so. Stated on the page: cubes are rounded to the nearest ten, and one project can hold several trades, so the cubes count trade-projects (1,653), not projects. The locked wordings stay verbatim: "431 documented siding jobs", "388 documented window jobs", "$10k–$15k median band (415 priced)". |
| How it differs from every existing Services version | A slides trades sideways, B switches a word, C counts chapters, D is a split cover, E picks a part on an elevation drawing, F is a magazine spread, G a sortable table, H boards that pull open, I three rings, J an index with a photo peek, K film reels. None shows every trade at once at its true relative size, and none makes the record itself into the shape of the house. |
| Why it is better | In one figure it answers "what do you actually do, and how much of it?". Siding and windows dominate, the small trades are visibly small, and every number is a click away. The current best (K, "Run the reel", 8.46) shows one trade's reel at a time. L shows the whole business at once, at scale. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the cube house) beside one panel; ⟦S0220⟧ published counts only, rounding and overlap stated |
| Cube house (figure) | ⟦S1499⟧ data honesty: the isotype rule (1 cube ≈ 10 projects, nearest ten) and "trade-projects, not projects" printed; positions are illustrative and said to be. `role="img"` with a full text alternative listing every trade and count |
| Cubes | ⟦S0405⟧ tactile: a top highlight and a bottom shade, with a 4 px lift for the chosen trade; ⟦S1425⟧ figure and ground: the chosen trade is figure, the rest fall back to 25% |
| Trade picker (10 + "All trades") | ⟦S0054⟧ a `radiogroup`: one tab stop, arrow keys, Home/End, `aria-checked`; ⟦S1427⟧ one chip treatment; each chip carries a swatch of its cube tone |
| Pointing at cubes | Fine pointer only: pointing at a cube previews its trade; pointing away restores the chosen one (⟦S0405⟧) |
| Record panel | `aria-live="polite"`: the trade, its documented count (locked wording for siding and windows), priced count and median band, and a published timeline where one exists; ⟦S1494⟧ plain sentences |
| Arrival | ⟦S1436⟧ the house goes up bottom to top, wall first, then gutters, then roof (cubes rise 10 px, about 6 ms apart, once); ⟦S0083⟧ one focal point |
| CTA | ⟦S1435⟧ one filled "Book a free inspection" under the panel ("Ask about any trade at the free inspection") |
| Phone (≤ 760 px) | The house scales to the width (18 columns of about 18 px); the chips wrap below; the panel follows |
| Reduced motion | ⟦S0400⟧ the house is built at once; lift and fade become instant |
| Background law | White ground; the figure and panel are `data-solid` |

---

## Build log

**How to view:** `?services=l` (switcher: Services, **L "Built from our records"**).

**Files:**
- `src/sec/svc6.js` and `svc6.css`: `Svc6.L` is prerendered at build; `Svc6.wire` wires it.
- The build registers the module, the `sl` key, the `l` slot entry, the label and the wire call.
- No data files or images. The file grows by 25 KB (20,205,468 bytes).

**The house:**
- An 18 × 14 cube map, written as rows of letters.
- The counts were checked in code before rendering and are exact for every trade: S 43, W 39, P 32, R 21, G 12, D 11, M 3, C 3, Y 1 = 165.

| Part of the house | Trade (cubes) |
|---|---|
| Roof: a 6 / 8 / 10 stepped gable | Shingle roofing (21); its last three cubes are metal roofing (3) |
| The eave line | Gutters (12) |
| Corner boards and the frieze | Exterior painting (32) |
| Openings | Windows (39): three 3 × 3 windows and two 2 × 3 |
| Front door, plus a side door in the wing | Exterior doors (11) |
| The wing, with its garage door | Garage doors (1) |
| An awning on the left | Patio covers (3) |
| Every other wall cube | Siding (43) |

**Cube tones (material-true):** siding sage-grey, glass blue-grey, white trim, charcoal shingles, steel metal roofing, grey gutters, a deep-green door, a grey garage door, wood patio cover. Each cube is bevelled (top highlight, bottom shade). The brand greens and lime are used only in the UI (chips, the lift outline, the button).

**Picking a trade:**
- The trade's cubes lift 4 px with a lime outline; all other cubes fall to 22%.
- The panel shows the trade, its documented count, its cubes, its median band with its priced count, and a published timeline where one exists.
- With a fine pointer, pointing at any cube previews its trade, and leaving restores the picked one.

**Arrival:** the house goes up bottom to top (cubes rise 10 px and fade in, 6 ms apart), once.

**Layout:**
- **Wide screens:** the house sits beside the chips and the panel.
- **1000 px and below:** chips, then the house, then the panel, so a pick lights the house just below it. The house scales to the width (cube ≈ 18 px at 390).

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-services-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- at rest: `-1440-rest`, `-768-rest`, `-390-rest`;
- Siding picked: `-1440-siding`, `-768-siding`, `-390-siding`;
- pointing at the roof: `-1440-hover`;
- contact sheet: `new-services-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Pick Siding | 43 cubes lift at every width. Panel: "SIDING · 431 · 431 documented siding jobs · 43 cubes · $10k–$15k median band (415 priced). · 1 to 2 weeks including paint." |
| Keys | From "All trades", →→ reaches Windows (`aria-checked="true"`; panel "388 documented window jobs · 39 cubes · $10k–$15k median band (376 priced). · Most window-only jobs: two days on site."). End reaches Decking ("No documented count…, so it has no cubes", 0 cubes lifted); Home returns to All trades |
| Pointing | A roof cube previews Shingle roofing; pointing away restores "All trades" |
| Text alternative | `role="img"` label lists every trade with its count and cubes ("garage doors 9 (1 cube)"), and that decking has no count |
| Reduced motion | The house is built at once (opacity 1); no transitions |
| Locks | "431 documented siding jobs", "388 documented window jobs" and "$10k–$15k median band (415 priced)" verbatim; the 886 figure is not used. Every other number is from the published service list and comparison table |
| Existing versions | 175 slot templates and 8 page templates byte-identical to the previous commit. `<main>` identical apart from the one added `services:l` template. Defaults unchanged (`services = a`) |
| Locked mechanics | Not a configurator: nothing is chosen for a house, only a record shown. No map, dive or game |

## Defects found and fixed

1. **Gutters versus siding:** the first gutter tone (#C3CCC8) was close to the siding (#D5DDD3). Darkened to #A9B4B0.
2. **Plural:** the text alternative read "1 cubes" for garage doors. Now "1 cube".
3. **Small screens:** the chips sat below the house, so a pick lit cubes out of view. At 1000 px and below the chips now come first, then the house, then the panel.

## Remaining defects, named honestly

- **Rounding hides the small trades:** garage doors (9) shows as one cube and patio covers (34) as three. Exact counts are in the panel and the text alternative.
- **Positions are illustrative:** they are said to be on the page, but a visitor may read the house as one real job.
- **Two near-white tones:** exterior painting (warm white) and the empty decking swatch are both near white; the decking chip has an outline, and decking has no cubes.
- **Hover is mouse-only:** pointing at cubes does nothing on touch, where the chips do the job.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | services L | ⟦S1434⟧ the cube house dominates beside one panel; ⟦S0220⟧ published counts only; rounding and the trade-project overlap printed under the figure |
| Element | cube house | ⟦S1499⟧ the isotype rule (1 cube ≈ 10, nearest ten), counts verified in code, positions stated as illustrative; `role="img"` with a full text alternative |
| Element | cubes | ⟦S0405⟧ tactile bevel and a 4 px lift; ⟦S1425⟧ the picked trade is figure, the rest fall to 22% |
| Element | trade chips (11) | ⟦S0054⟧ `radiogroup`, one tab stop, ←→↑↓ / Home / End, `aria-checked`; ⟦S1427⟧ one chip treatment, each with its cube swatch and count |
| Element | pointing at cubes | ⟦S0405⟧ fine pointer only: preview on hover, restore on leave |
| Element | record panel | `aria-live="polite"`; ⟦S1494⟧ plain sentences; locked wordings verbatim |
| Motion | arrival | ⟦S1436⟧ the house goes up bottom to top, 6 ms apart, once; ⟦S0083⟧ one focal point |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button; "Ask about any trade at the free inspection" |
| Site | ≤ 1000 px | Single column, chips first; the house scales to 18 columns of the width |
| Site | reduced motion | ⟦S0400⟧ built at once, no transitions |
| Site | background law | White ground; the figure and side panel are `data-solid` |

## Reference transfers and non-transfers (Quiet Cubes)

**Transferred:**
- the modular cube as the unit of the whole design;
- a calm, tactile, product-first presentation on a light ground;
- a staffed service behind it ("ask about any trade at the free inspection").

**Not transferred:**
- the configurator (it stays in the Visualiser);
- 3D rendering;
- Quiet Cubes' own palette and type.

## Comparison with the section's previous best (Services K, "Run the reel", 8.46)

K shows each trade as a film reel of real job photos, one trade at a time: evidence by example.
- **L shows the whole business at once, at true scale.** Siding and windows dominate, painting and roofing follow, and the small trades are visibly small. Every trade's published record is one tap away.
- **K is stronger on:** photographs of real houses.
- **L is stronger on:** "what do you do, and how much of it?" answered at a glance.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A house read instantly from 165 bevelled cubes in material-true tones on white, beside one calm panel (`-1440-rest`, `-1440-siding`). **Minus:** the near-white trim and the faint 22% fall-back are subtle |
| Usability (30) | **8.4** | One tap per trade on chips with swatches and counts; full keyboard model; a text alternative with every count; chips above the house on small screens; reduced motion; 0 errors and 0 overflow. **Minus:** hover preview is mouse-only; rounding hides the smallest trades in the figure |
| Creativity (20) | **8.6** | No Services version, and nothing else on the site, makes the record itself into the house. An isotype in a trade's own shape is a signature move for this section |
| Content (10) | **8.6** | Only published counts, bands and timelines; locked wordings verbatim; rounding and overlap stated; decking's missing count named. **Minus:** positions are illustrative |
| **Weighted** | **8.54** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.4 + 0.2 × 8.6 + 0.1 × 8.6 = 3.44 + 2.52 + 1.72 + 0.86 = **8.54**.

**Vetoes: none.**
- Locks are verbatim; no form.
- White ground, with greens and lime in the UI only; cube tones are material content.
- Only normal fonts (Poppins, Inter).
- No configurator or other locked mechanic; no invented imagery.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Visualiser L until Muse accepts.
