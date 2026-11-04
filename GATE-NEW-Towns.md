# GATE-NEW · Where We Build · V2 "The map table"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 1, section 6 of 7. The Hero, How a job runs, Financing, Our Work and Reviews gates were accepted by Muse.

The default is unchanged: V1 (the van route map) stays version 1 and its code is untouched. No backups ship.

**How to see V2:**
- **Header switch.** Use the Service area "1 · 2" switch while the section is in view. On phones it is the "‹ 1/2 ›" stepper.
- **Built page.** `elbaz-homepage.html?towns=2` opens V2 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Bruno Simon** is the primary. The annex scopes him to exactly this: "ONE interactive section only (the 104-town explorable-map candidate; performance + mobile/reduced-motion guards apply)". His explorable world on a table is taken: a place you move around in with your own hands, not a picture.
- **Signature move:** the map table.
  - The three counties lie on a tilted tabletop in perspective (Palm Beach receding into the distance, Miami-Dade near), with the 104 survey marks on it and our office standing on it as a raised pin.
  - Type a town, or tap its mark, and the camera flies down the coast to it. The town's pin rises out of the table with its name, and the county it belongs to lights.
  - Drag the table to look around; zoom in and out; one button returns to the whole map.
- **Style family:** a tabletop diorama (3D perspective, physical pins). V1 is a flat drawn map beside a side panel, with a van driving a route.
- **The owner's law:**
  - map and search kept (the search is a real combobox, and it leads);
  - never an everything-list on the right (there is no list of names at all: the search, the marks and the counties carry the 104);
  - real interactivity: fly, drag, zoom, pins;
  - a town we do not list gets an honest answer and the phone number.
- **WEB-SKILLS tags per element:**
  - **Table and camera:**
    - S0062: CSS 3D transforms only, one layer moved;
    - S0089 (system-driven flights ease; the drag follows the hand);
    - S1209 (no wheel capture: the page scrolls normally over the table).
  - **Search:** S1018 (a combobox: arrows, Enter, Escape); S1442 (form design: label, hint, honest empty state).
  - **Pins and marks:** S1441 (44px tap reach on marks); S0083 (one raised pin at a time).
  - **Drag:** S1443 (gesture patterns: horizontal drag pans on touch, vertical scroll stays native).
  - **Reduced motion:** S0400 (no flight: the camera cuts to the town; no tilt animation).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 is a flat map beside a side panel. A chosen town draws a van route from the office, and three county tiles hold the names. V2 is one large explorable table: the camera goes to the town instead of the van, and the visitor can move around the coast themselves.
  - **Why it is better.** "Do you work in my town?" is answered by flying to it: you see your town on the coast, among its neighbours, relative to the office. The table invites exploration (Bruno), while the search stays the fastest path.
  - **Facts.** The towns and counts are the firm's published lists (34 / 31 / 39 = 104), placed by the same gazetteer points (`data/southfl.json`).

## What was built
**Files:**
- `remodeling/src/sections/towns.html`: V2 added in the existing version system (`.ver[data-v="2"]`, prefix `tb__`, checked free).
- `css/sections/towns.css`: a V2 block appended.
- `js/sections/towns.js`: a `2:` definition beside `1:`, using the same data and helpers.
- V1 is untouched.

**The table:**
- The stage has 3D perspective. The table is tilted (54° desktop, 46° phone).
- On it, the map plane holds the three county shapes (with a shadow edge so they read as pieces lying on the table), the county names, and the 104 survey marks at their gazetteer points.
- A survey grid on the tabletop recedes into the distance, so the table reads as a table.
- On arrival, the table tips from flat to its tilt.

**Pins** stand up out of the table at a constant size:
- the office pin ("Our office, 19 W Flagler St"), always;
- the chosen town's pin (accent, with its name and county), which rises when chosen;
- a hover pin with the name, on a fine pointer.

Pins near the coast open their flags inland, so they never clip at the edge.

**The camera:** one transform of the map inside the tilted table.
- **Flights:** 1.1s, power3.inOut.
- **Zoom:** in, out, and "Whole map".
- **Drag:** the mouse pans both ways. On touch the drag pans sideways only, so the page keeps its own vertical scroll. There is no wheel capture.

**The search panel** floats on the table on desktop and sits above it on phones. It holds:
- a combobox (arrows, Enter, Escape, prefix-then-contains matching, up to 6 options with their counties);
- the same honest answers as V1: "Yes, Weston. Weston is one of the 31 municipalities we build in across Broward…", or, for a town we do not list, "Not on our published list… Call (754) 236-0675".

An unlisted answer clears the map back to the whole view, so nothing stays lit beside it.

**Keyboard:** the table is a focusable map region. Arrows pan, + and − zoom, 0 or Home returns to the whole map. The search is the keyboard path to every town.

**Below the table:** Book a consultation with 4.8 · 343 and the licence, and "Not on the list, or not sure? Call (754) 236-0675."

**Reduced motion:** no flights (the camera cuts), no tilt-in, no pin rise.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Where We Build V2** | **8** | **8** | **9** | **9** | **8.3** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 0.9 = 8.3.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One object:** the table, with the coast receding, the grid giving depth, and the counties as pieces with an edge.<br>**The panel** is opaque paper on the table (S1425).<br>**One raised pin at a time (S0083).**<br>**Heights:** 951px at 1440 and 932px at 1024, about one screen; 1062px on phones (the search above a 460px table). | The map is tall and narrow (South Florida's coast), so the whole-map view uses the middle third of a wide table. The tilt makes the near county larger than the far one, which is true to a table but not to scale. |
| **Usability 8** | **Search:** "Pomp" offers Pompano Beach; Enter flies there and lights Broward. "Tampa" gets the honest answer with the map cleared.<br>**Marks:** a tap on a mark at the whole-map scale selects it (the nearest mark is measured where the browser drew it, 3D included).<br>**Other controls (all verified):** zoom; "Whole map"; mouse drag moves the camera without selecting; keyboard arrows and + move the camera.<br>**Targets:** at least 44px (the only smaller link is the phone number inside a sentence, an inline link, as in V1). 0 text under 13px; 0 overflow; the town flag stays inside the stage at every width; the page end is reached; 0 errors. | On touch the drag pans sideways only (vertical drags scroll the page, by design). To move north or south on a phone you search, tap a mark, or zoom out. |
| **Creativity 9** | The move the annex reserved for this one section, done in the site's own drawn language: the coast as a table you look across, and a camera that flies to your town while its pin rises out of the table. | It is CSS 3D, not WebGL. There is no vehicle to drive (V1 keeps the van). |
| **Content 9** | **Towns:** 104 municipalities, 34 / 31 / 39, the firm's published lists, placed by the same gazetteer points as V1.<br>**Answers:** V1's honest copy, word for word.<br>**Facts:** the office address, phone and licence string are verbatim.<br>Locks **0 fails** (see below); outside links **0**. | The H2 "104 towns on the table. Find yours." and the lead are my wording. Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V2 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- no images;
- the 104 towns are verbatim and counted;
- no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

**The QA tool change, recorded.** `tools/locks.js` checked "104 towns, all shown" by counting V1's name buttons (`.tw__t`). V2 has no name list (by the owner's law) and shows every municipality as a named survey mark. Each V2 mark now carries its county (`data-c`) and name (`data-n`). The lock counts V1's names, or V2's marks only if they split exactly 34 / 31 / 39. It is no weaker, and both versions now pass at 104.

## Defects found and fixed during the build
1. **On phones the table lost its tilt.** The search panel lived inside the 3D stage, and moving it into flow on phones flattened the table. Fixed: the panel sits outside the stage, floating over it on desktop and above it on phones; the stage always keeps its perspective.
2. **The tilt barely read on the whole map** (a small map in a large stage gives little depth). Fixed: a stronger tilt (54°) and perspective (1000px), plus a survey grid on the tabletop that recedes.
3. **The office flag clipped at the right edge on phones.** Fixed: pins in the eastern part of the map (near the coast) open their flags inland.
4. **The whole map's southern tip sat below the stage.** The fit was adjusted, and the camera centre moved to the table's rotation axis.
5. **An unlisted town left the previous town lit.** "Tampa" showed "not on our list" beside Pompano's raised pin. Fixed: an unlisted answer clears the map and returns to the whole view.
6. **The lock tool could not see V2's 104** (see above).
7. **A native tooltip duplicated the hover flag.** Names are carried as data attributes, not SVG `<title>`.

## Defects remaining (honest)
- On touch the drag pans sideways only (vertical scroll stays the page's).
- The whole-map view leaves empty table either side on wide screens (the coast is narrow).
- Marks are small at the whole-map scale on phones. A tap reaches the nearest within 34px, but neighbouring towns on the dense coast need a zoom or the search.
- No assets needed or requested.

## Reference: transfers and non-transfers (Bruno Simon, primary, scoped to this section)
- **Transferred:**
  - an explorable world on a table, moved by hand;
  - the camera as the response to a choice;
  - playful physical objects (pins standing up out of the table).
- **Not transferred:**
  - WebGL and physics engines;
  - a drivable vehicle;
  - sound;
  - loading screens.
- **The annex's guards are applied:** performance (CSS 3D, one moving layer), mobile (sideways-only touch pan, the search first) and reduced motion.
- **Other annex entries:** none were used.

## Comparison with the section's previous best (V1, the default)
| | V1 · the van route (default) | V2 · the map table |
|---|---|---|
| **Composition** | A side panel (search, answer, CTA) beside a flat map, with county tiles under it | One large tilted table with the search on it, the CTA below |
| **Choosing a town** | A van drives the route from the office to it | The camera flies to it; its pin rises |
| **Exploring** | Hover the marks; open a county tile to see its names | Drag, zoom, hover, tap the marks; arrows and + / − |
| **The names** | Available as county lists | Through search and the marks only, with no list (the owner's law) |
| **Where V1 still wins** | The van route connects the office to your town in one picture; the county lists let you browse | V2 is more spatial and playful, and V1 is more literal |

**My call:** V2 is a genuine challenger. It is the most exploratory section on the site, exactly where the annex allows that, and it keeps the search as the fast path. V1's van route is the clearer "from our office to your street" story. The defaults are not changed; the owner picks.

## Evidence (`qa/new/towns/`)
- `v2-1440-whole-search-westlake-unlisted.jpg`: the whole table; search options for "West"; the flight to Westlake with its pin raised and Palm Beach lit; the honest answer for "Orlando".
- `v2-1440-hover-and-flight-to-jupiter.jpg`: the hover pin (Coral Gables), then three frames of the camera flying to Jupiter.
- `v2-390-states.jpg`: the phone: the whole table, options, a flight, and the honest answer.
- `v2-768.jpg`: the tablet.
- `v2-single-file.jpg`: V2 picked through the header switch inside the delivered single HTML file at 1440 and 390, with Weston searched.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
