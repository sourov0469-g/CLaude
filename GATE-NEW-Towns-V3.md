# GATE-NEW · Where We Build · V3 "104 threads"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 2, section 6 of 7. Hero V3, How a job runs V3, Financing V3, Our Work V3 and Reviews V3 were accepted by Muse.

The default is unchanged: V1 (the van route map) stays version 1, and V2 (the map table) is untouched. No backups ship.

**How to see V3:**
- **Header switch.** Use the Service area "1 · 2 · 3" switch while the section is in view. On phones it is the "‹ 1/3 ›" stepper.
- **Built page.** `elbaz-homepage.html?towns=3` opens V3 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Lusion** is the primary ("flow; governs the flow maps"). Its flow-map language is taken: every place connected to its source by a living line, with movement along the line as the answer. It is rebuilt in SVG over the firm's own map data. The flow runs only on an answer, never continuously.
- **Signature move:** 104 threads.
  - Every one of the 104 municipalities is tied to the office at 19 W Flagler St by a thin thread that arcs out to sea and back. On arrival the threads are spun out from the office, nearest first.
  - Search your town, or tap its mark: its thread pulls bright, a pulse travels from the office to your town, and the town is named.
  - Tap a county (Miami-Dade 34 · Broward 31 · Palm Beach 39) and its threads light together.
  - A town we do not list has no thread: the honest answer, with the phone number.
  - On wide screens the map turns to fit the screen. North points right and the coast runs across the page, with a compass to say so. On phones it stands upright.
- **Style family:** a network flow map (hub and spokes, arcs on a night ground). V1 is a drawn paper map with a van route and county tiles; V2 is a tilted 3D tabletop with a flying camera.
- **The owner's laws for this section:**
  - map and search kept (the search is the same real combobox and leads);
  - never an everything-list (no list of names: the search, the threads and the marks carry the 104);
  - real interactivity: search, tap, hover, counties;
  - an unlisted town gets an honest answer and the phone number.
- **WEB-SKILLS tags per element:**
  - **Threads:**
    - S0062: stroke offsets and opacity only (the spin-out and the pulse);
    - S0083: one lit thread or one lit county at a time;
    - S0089 (system easing for the pulse).
  - **Search:** S1018 (combobox: arrows, Enter, Escape); S1442 (label, hint, honest empty state).
  - **Marks and counties:** S1441 (44px reach, 44px chips); S1443 (tap on touch).
  - **Layout:** S1426 (proximity: the answer under the search, the counties with the map).
  - **Proof:** S0226 (CTA, reviews and licence by the action).
  - **Reduced motion:** S0400 (no spin-out, no pulse; threads appear lit at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 draws one road route on demand; V2 flies a camera over a table. V3 shows the whole service network at once: 104 threads from one office, the visible shape of where the firm works.
  - **Why it is better.** At a glance the visitor sees that everything is served from one place in Miami and how far it reaches. Their own town answers with its own thread. Turning the map to fit the screen gives the coast the full width of a desktop instead of a narrow strip.
  - **Facts.** The towns and counts are the firm's published lists (34 / 31 / 39 = 104), placed by the same gazetteer points (`data/southfl.json`). The answers are V1's and V2's copy, word for word.

## What was built
**Files:**
- `remodeling/src/sections/towns.html`: V3 added in the existing version system (`.ver[data-v="3"]`, prefix `ft__`, checked free).
- `css/sections/towns.css`: a V3 block appended.
- `js/sections/towns.js`: a `3:` definition using the section's own data and helpers (`geo()`, `NS_ORDER`, `norm()`, `esc()`).
- V1 and V2 are untouched.

**The band:** a night ground (the brand's ink).
- At the top: the eyebrow, the H2 "104 towns. One office." and a lead on the left; the search panel in paper on the right (above the map on tablets and phones).
- Below: the map, then three county chips; under the band, Book a consultation with 4.8 · 343 and the licence, and "Not on the list, or not sure? Call (754) 236-0675."

**The map:**
- The county shapes and the 104 marks are placed at their gazetteer points.
- **Threads:** one thread per municipality runs from the office (a clay diamond) to the town, a gentle arc bowed out to sea. That makes 104 threads in total.
- **Turning to fit:**
  - when the map is at least 900px wide it turns 90° (north to the right, the coast along the bottom), with a "North" compass, so the coast fills the width (1360 × 572 at 1440);
  - narrower, it stands upright (about 215 × 512 on phones).
  - Labels stay upright either way.
- **Arrival:** the threads are spun out from the office, nearest towns first (stroke offsets only).

**Choosing:**
- **Search** (the same combobox as V1 and V2: arrows, Enter, Escape, up to 6 options with their counties, prefix-then-contains matching):
  - the town's thread pulls bright and the other 103 dim;
  - a pulse runs from the office out along the thread;
  - the town's flag rises in clay with its county;
  - the answer reads as V1's, word for word.
- **Tap a mark** (nearest within 34px on touch, 26px with a mouse): the same as a search.
- **Hover** (fine pointer): the nearest thread brightens and its name shows.
- **County chips** (Miami-Dade 34 · Broward 31 · Palm Beach 39): that county's threads redraw out from the office and stay lit; tap again to release.
- **A town we do not list:** nothing stays lit, and the honest answer with the phone link appears (V1's copy).
- **Clear (×):** back to the whole network.

**Reduced motion (S0400):** no spin-out and no pulse travel (the pulse sits at the town); everything else is the same.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Where We Build V3** | **8** | **8** | **9** | **10** | **8.4** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 1.0 = 8.4.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One image that says the business:** a fan of threads from one office in Miami to the whole coast, luminous clay on the brand's ink.<br>**The coast across the page** on desktop (1360 × 572) instead of a narrow strip.<br>**One focal point (S0083):** one thread or one county lit; the rest dim.<br>**Heights:** 1251px at 1440, 1297px at 768, 1219 to 1227px on phones. | **Tablets:** the upright map is narrow (235px) in a wide band, leaving dark space either side. **Phones:** the threads bunch along the coast, so individual threads read as a bundle. The rotated map asks the visitor to read north to the right (the compass says so). |
| **Usability 8** | **Verified at 1440 mouse, 768 and 390 touch, and reduced motion:**<br>• "Pomp" offers Pompano Beach; Enter lights its thread (1 on, 103 dim), runs the pulse and raises the flag;<br>• "West" offers six; two Down presses and Enter choose West Palm Beach;<br>• Escape closes the list;<br>• Broward lights its 31 threads;<br>• a tap on Jupiter's mark selects Jupiter;<br>• "Tampa" leaves nothing lit and gives the honest answer with the tel: link.<br>**Measures:** 0 targets under 44px (the inline phone link aside, as in V1 and V2); 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | The map has no keyboard panning (nothing to pan: the whole map is always in view); the search is the keyboard path to every town. On phones the marks are dense, so neighbouring towns are easier to reach by search. |
| **Creativity 9** | A move the section did not have: the service area as a network from one office, answering with a pulse along your town's own thread, with a map that turns itself to fit the screen. | Flow maps are a known form; the craft is the honest data (every thread is a published town) and the restraint (flow only on an answer). |
| **Content 10** | **Towns:** 104 municipalities, 34 / 31 / 39, the firm's published lists, at the same gazetteer points as V1 and V2.<br>**Answers:** V1's honest copy, word for word.<br>**Facts:** the office address, phone and licence string are verbatim.<br>Locks **0 fails**; outside links **0**. | The H2, the lead and the county answer line ("31 municipalities we build in, one of our three counties") are my wording around published figures; Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V3 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no images;
- the 104 towns are verbatim and counted (104 threads, 104 marks);
- no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The office label sat on the densest part of the fan,** and on phones it partly covered the "Miami-Dade" label. Fixed: it sits on a dark chip to the west of the office in both orientations (no overlap, measured at 390 and 1440).

## Defects remaining (honest)
- **Tablets:** the upright map is narrow, with empty dark space either side.
- **Phones:** the threads bunch along the coast.
- **Marks:** they are small on phones (a tap reaches the nearest within 34px).
- **Orientation:** north is to the right on desktop (marked by a compass); some visitors may expect north up.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Lusion, primary)
- **Transferred:**
  - a flow map: every place joined to its source by a living line;
  - motion along the line as the answer;
  - luminous lines on a dark ground.
- **Not transferred:**
  - WebGL and particle fields;
  - continuous ambient motion (the flow runs only on an answer);
  - Lusion's identity.
- **Other annex entries:** none were used. Bruno Simon's scope is V2's alone.

## Comparison with the section's previous versions
| | V1 · the van route (default) | V2 · the map table | V3 · 104 threads |
|---|---|---|---|
| **Composition** | A side panel beside a flat paper map, county tiles below | One tilted table with the search on it | A night band: the search beside the heading, the coast across the page, county chips |
| **Choosing a town** | A van drives the route from the office | The camera flies to it; its pin rises | Its thread pulls bright; a pulse runs out to it |
| **The whole area** | The map and three county tiles | Drag and zoom the table | Every town's thread at once; counties light their threads |
| **Where it is weaker** | One route at a time | Tall and narrow on wide screens | Narrow on tablets; north to the right |

**My call:** V3 is a genuine challenger. It is the clearest picture of "one firm, one office, the whole coast", and it uses a wide screen fully. V1's van route remains the most literal "we come to you", and V2 the most explorable. The defaults are not changed; the owner picks.

## Evidence (`qa/new/towns-v3/`)
- `v3-1440-threads-pompano-pulse-broward-unlisted.jpg`: the network; Pompano Beach chosen with the pulse on its way; arrived with its flag; Broward lit (with a hover name); "Tampa" with nothing lit and the honest answer.
- `v3-390-states.jpg`: the phone.
- `v3-768.jpg`: the tablet.
- `v3-1440-reduced-motion.jpg`: reduced motion.
- `v3-single-file.jpg`: V3 picked through the header switch inside the delivered single HTML file at 1440 (turned) and 390 (upright), with Palm Beach lit.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
