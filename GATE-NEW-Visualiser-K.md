# GATE-NEW — Visualiser K, "Open a colour"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 3 (Hero K and Services K accepted by Muse).

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Visualiser K, "Open a colour"** (`?vis=k`) |
| Primary reference (annex v3, one) | **Dropbox Brand** (subtraction discipline; settled as usable freely). No Visualiser version has used Dropbox yet: A–J used Quiet Cubes, Rimowa, Cash App ×2, Ever (notes), Scout, Apple and Cowboy. |
| Signature creative move | **The tile becomes the page** (Dropbox Brand's tile-to-section transition). The 17 ColorPlus colours sit as a quiet grid of plain colour tiles: colour, name, nothing else. Opening one, the tile itself grows (a clip-path expansion from its own rectangle) until it fills the stage. Inside it the colour becomes the whole field, with a house drawn tone-on-tone in that colour (body a shade deeper, Arctic White trim, dark roof) and the name set large. ‹ › step through neighbouring colours inside the open view. Closing shrinks the view back into the tile of whichever colour is showing. |
| Style family | Subtractive colour grid that opens into a full-field elevation (type and colour only; no chrome) |
| Content | The 17 published James Hardie ColorPlus values for Austin (`Vis2.CP`, the same list A–J use), Arctic White trim ("the ColorPlus trim colour"), and the homepage's own line "Screens show colour a little differently; see real samples at the free inspection." No new colours, no invented names or values. |
| How it differs from every existing Visualiser version | A is a fan over a house. B builds a wall in five steps. C is a list that fills a wall, with compare. D is a dial instrument. E offers pairings. F maps colours on two axes. G asks four questions. H changes the light. I is a loupe. J is a street of houses. None shows all 17 at once as a plain grid, and none opens a colour by growing its own tile into a full-field view. |
| Why it is better | It has the fewest decisions of any version: every colour is visible at once, and one tap shows it big on a house, with no steps, dial or questions. The current best (F, "The colour map", 8.38) is clever but asks you to read axes; K asks nothing. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ / ⟦S1314⟧ one dominant element (the grid, then the open colour); ⟦S0220⟧ published values only, no glow; Dropbox subtraction (no decoration on tiles) |
| 17 tiles | ⟦S0054⟧ real buttons with `aria-expanded` and `aria-controls`, visible focus; ⟦S1427⟧ one treatment for all; ⟦S1497⟧ name ink chosen by luminance (`Vis2.ink`) for contrast; ⟦S1440⟧ press scale |
| Tile → page expansion | `clip-path: inset()` from the tile's rectangle to the full stage, 620 ms `cubic-bezier(.7,0,.2,1)`; ⟦S0083⟧ one motion; the content fades in after the shape settles; ⟦S1315⟧ nothing at rest |
| House drawing | ⟦S1497⟧ body = the colour (a shade deeper than the field), trim Arctic White, roof dark; drawn with simple shapes and lap lines (an interface data graphic, not an illustration of a real job) |
| Open view | The name in display type; "ColorPlus · #hex"; trim note; ‹ › (⟦S0054⟧ named, ⟦S1441⟧ 48 px); arrow keys step colours; Esc or "All colours" closes, and focus returns to the tile of the colour shown |
| Live line | `aria-live="polite"` announces the colour name on every change |
| CTA | ⟦S1435⟧ one filled Book button inside the open view; the samples line verbatim from the homepage |
| Phone | Grid of 3 columns; the open view covers the grid area; the house scales to the width |
| Reduced motion | No growth: the open view appears in place; colour changes are instant |
| Background law | The section stays white; colour lives only in the tiles and the open view |

---

## Build log

**How to view:** `?vis=k` (switcher: Visualiser, **K "Open a colour"**).

**Files:** `src/sec/vis6.js` and `vis6.css` (`Vis6.K` is prerendered at build; `Vis6.wire`). There are no images: the house is inline SVG, so the file grows by 22 KB (19.04 MB).

**Grid:**
- 17 tiles in the published order: Arctic White … Countrylane Red.
- Each tile is the colour, with its name and hex value in an ink colour chosen by luminance (`Vis2.ink`).
- Columns: 6 at desktop, 4 under 1100 px, 3 on phones (the hex values hide there).

**Open view:**
- The tile's own rectangle grows to the full stage (a `clip-path: inset()` from the tile's rectangle, 620 ms).
- The text and house fade in once the shape has mostly settled.
- Contents:
  - "ColorPlus · #575B59 · 16 of 17";
  - the name at up to 96 px;
  - the trim and samples line;
  - ‹ › and Book;
  - the drawn ranch house: body 84 % of the colour mixed with black, Arctic White trim, dark roof;
  - "All colours ×" at top right.
- Closing shrinks the view into the tile of the colour on screen.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-visualiser-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- open views: `-open-1440` (Iron Gray), `-open2-1440` (Evening Blue)
- mid-growth: `-grow-1440`
- phone: `-grid-390`, `-open-390` (Mountain Sage)
- contact sheet: `new-visualiser-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Tiles | 17, names and values identical to `Vis2.CP` (the list A–J use) |
| Growth | Mid-growth clip `inset(44px 50px 0px 75px round 21px)`, moving from Iron Gray's tile to `inset(0)`. On close it runs back to the tile of the colour on screen |
| Open | Iron Gray #575B59, 16 of 17; the field is rgb(87, 91, 89); the live region reads "Iron Gray, 16 of 17"; focus is on the name; that tile has `aria-expanded="true"` |
| Stepping | → goes to Countrylane Red (17 of 17), and `aria-expanded` follows to that tile. › wraps to Arctic White (1 of 17); ‹‹ returns to Iron Gray. Arrow keys don't scroll the page |
| Closing | Esc closes, and focus returns to the tile of the colour shown. The "All colours" button closes Evening Blue the same way |
| Grid keys | ↓ from tile 1 moves focus by one row (to tile 7, with 6 columns); Enter opens Mountain Sage |
| Rapid Esc | A double Esc during the animation ends cleanly closed |
| Phone | Mountain Sage opens over the 3-column grid with the house on top; no overflow |
| Reduced motion | It opens in place with no clip and the content visible at once |
| Existing versions | 167 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `vis:k`. Defaults are still hero = 1, services = a, visualiser = b |
| Locks | Colours from `Vis2.CP` only. "17 colours for Austin", "baked on at the factory", "the ColorPlus trim colour" and the samples line are all verbatim from the homepage |

## Defects found and fixed

1. **Class collisions:** `.tl` (on my avoid list) and `.hs` are global classes. Renamed to `.ktile` and `.khs`; `.bd` and `.tr` were renamed too (`.kbd`, `.ktr`).
2. **Stray gradient:** the drawing referenced an undefined gradient. Removed.
3. **Expanded state:** after stepping to another colour, `aria-expanded` stayed on the first tile. It now follows the colour on screen.
4. **Headline wrap:** at 1440 the headline broke as "Open / one." The heading block is widened, so it now sits on one line.

## Remaining defects, named honestly

- **Interface graphic:** the house is drawn, not a photograph. Each colour is shown on a generic ranch, not a real job (the firm's records don't say which ColorPlus colour each job used).
- **Light colours:** on the lightest colours (Arctic White, Navajo Beige) the tone-on-tone house is low in contrast against its own field. The white trim carries the outline, but the house reads softer than on the dark colours.
- **Familiar grid:** a grid of swatches is a familiar pattern; the creativity is in the opening, not the grid (scored accordingly).
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | visualiser K | ⟦S1434⟧ / ⟦S1314⟧ one dominant element at a time (grid, then the open colour); Dropbox subtraction (tiles carry colour, name and hex only); ⟦S0220⟧ published values only |
| Element | 17 tiles | ⟦S0054⟧ buttons with `aria-expanded` and `aria-controls`, a 3 px focus ring, grid arrow keys plus Home/End (with `preventDefault`); ⟦S1497⟧ ink by luminance; ⟦S1427⟧ one treatment; ⟦S1440⟧ hover lift and 0.98 press |
| Element | tile → page | `clip-path` growth from the tile's own rectangle, 620 ms `cubic-bezier(.7,0,.2,1)`, reversed into the tile of the colour on screen; ⟦S0083⟧ one motion; ⟦S1315⟧ nothing at rest |
| Element | house | ⟦S1497⟧ body mixed 84 % with black against the field, Arctic White trim, dark roof; an inline SVG interface graphic, labelled as a drawing |
| Element | name and meta | Display type up to 96 px; tabular "16 of 17"; the name is the focus target on open |
| Element | ‹ › and keys | ⟦S0054⟧ "Previous colour" / "Next colour"; ⟦S1441⟧ 48 px; ←/→ inside the open view; Esc closes |
| Element | live region | `aria-live="polite"`: "Name, n of 17" |
| Element | Book | ⟦S1435⟧ the only filled button |
| Site | reduced motion | Opens in place; instant colour changes |
| Site | background law | The section stays white; colour only in the tiles and the open view |

## Reference transfers and non-transfers (Dropbox Brand)

**Transferred:**
- subtraction: tiles with no decoration;
- the tile that becomes the page (the tile's own rectangle grows into the section);
- colour and type as the whole design;
- a confident single headline.

**Not transferred:**
- Dropbox's brand palette, illustrations and typeface (Montserrat and Inter, as locked);
- its multi-page navigation.

The colours are the firm's published ColorPlus values only.

## Comparison with the section's previous best (Visualiser F, "The colour map", 8.38)

F plots the 17 colours on two computed axes, light to dark and warm to cool. That is clever, but you read a chart. K shows all 17 at once with no axes, and one tap shows a colour big on a house, with the next and previous colours a key press away.
- **F is stronger on:** relationships between colours.
- **K is stronger on:** speed and size, the closest a screen gets to holding up a large sample.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A disciplined grid and a bold full-field open view; the type and colour carry everything (screenshots at 1440, 768 and 390, open and grid). Minus: the light colours make the tone-on-tone house soft |
| Usability (30) | **8.8** | One tap to open, then keys, buttons, Esc, focus return and grid arrow keys, all tested; nothing to learn |
| Creativity (20) | **7.8** | The tile-to-page growth is new to the section, but the grid itself is a familiar pattern |
| Content (10) | **8.4** | The published 17 values and homepage wording only; a drawing, not a job photo |
| **Weighted** | **8.40** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Windows K until Muse accepts.
