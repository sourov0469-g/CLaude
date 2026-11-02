# Phase 2 generation test: an unseen section built only from the identity assets

## Protocol, and its honest limit
The method calls for a **fresh session** to build an unseen section from the assets alone. The owner's standing order
for this build is **no sub-agents and no background tasks**, so no second session was started.

**What I did instead:**
- **Builder:** I ran the test myself, in this thread.
- **Inputs:** `identity/BRAND.md`, `tokens.css`, `owl-components.css`, `icons.svg`, `owl-identity.js` and Owl's own source
  files. Nothing else.
- **What counts as a defect:** any value or behaviour the section needed that those files did not supply. Each one is
  logged here as a defect **in the assets**, fixed there (not in the test page), and the section is rebuilt.
- **Pass condition:** a round that needs zero inventions.

**Limit:** the builder knows the system. Muse can run a true fresh-session test at any time with the same inputs.

**The unseen section:** "Service area: 29 towns". No earlier board, exemplar or direction built it. The facts are the
pack's confirmed list of 29 towns and Owl's own map (`assets/source/owl-pages/owl-map.webp`).

## Round 1 (`gentest-round1.html`): 3 inventions, so FAIL
| # | What the section needed | What the assets gave | Defect | Fix (in the assets) |
|---|---|---|---|---|
| 1 | A list of 29 towns | Nothing: no list component. The page fell back to browser bullets in one long column. | Closed inventory incomplete | `.place-list` added to `owl-components.css`: auto-fill columns ≥10rem, hairline rules, the home town bold with a pin. Its contract was added to BRAND.md §4. |
| 2 | A background for a place section | B2 Rings was assigned to "families, reviews, FAQ" only, so choosing it was my own call | Background assignment incomplete | BRAND.md §5: B2 Rings now covers "people and place sections", including the service area |
| 3 | A ring ground with receding edges | Owl's ring symbol clipped at its own viewBox, leaving hard rectangular edges (the same defect was on the board's B2 sample) | Asset bug | `build-board.py` gives Owl's symbols `overflow="visible"`; the radial mask now does the fading |

## Round 2 (`gentest-round2.html`): 0 inventions, so PASS
- **Built from:**
  - the section head;
  - `place-list` with `icon-navigation-pin`;
  - the primary button;
  - an image frame at 4:3;
  - B2 Rings.
- **Values:** every one comes from a token; the token lint is clean on the page's styles.
- **Rendering:** checked at 1440px and 390px. The list reflows to two columns, the map drops below, and there is no
  overflow.
- **Facts:** only locked ones: the address, the phone, the 29 towns, "surrounding Minnesota communities".

## Also found while building the exemplar (fixed in the assets, same rule)
1. **Play and pause icons:** missing, yet a video window needs a pause control. `icon-action-play` and
   `icon-action-pause` were added.
2. **Pinned-stage scrub helper:** missing. `Owl.pinScrub` was added.
3. **Skip link:** an offset skip link leaked into view inside a positioned container. The `.skip-link` component is now
   visually hidden until focused.
4. **B1 on cream:** its hairlines vanished on cream, so `bg.lawn` gained a `ground: 'cream'` option. Its decorative
   dotted curve also competed with a page's real flow line, so `sweep: false` was added.
5. **Header at 768px:** the nav overflowed. The collapse breakpoint moved to 1023px, and the menu panel is now part of
   the header contract.
