# GATE-NEW · Our Work · V4 "The round room"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding, until the owner stops it), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 3, section 4 of 7. Hero V4, How a job runs V4 and Financing V4 were accepted by Muse.

The default is unchanged: V1 (two rows of hung frames) stays version 1; V2 and V3 are untouched. No backups ship.

**How to see V4:**
- **Header switch.** Use the Projects "1 · 2 · 3 · 4" switch while the section is in view. On phones it is the "‹ 1/4 ›" stepper.
- **Built page.** `elbaz-homepage.html?work=4` opens V4 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Immersive Garden** is the primary ("the chaptered camera-scrub build journey … its heavyweight class stays inside a performance budget"). The camera scrub is taken: the camera stands still and turns, scrubbed by the scroll and by the hand. It is built in CSS 3D inside the section's budget: only the photographs facing you are drawn, and there is no WebGL and no pin.
- **Signature move:** the round room.
  - The visitor stands at the centre of a circular gallery hung with the firm's listed photographs, grouped into three walls: Kitchens, Bathrooms, Whole homes.
  - Drag to turn on the spot; the scroll turns the room a little as the section passes. The arrow keys and the buttons step one photograph; the three wall chips turn you to a wall.
  - The photograph you face is named beneath it (plan-room code, room, the firm's title) and opens large.
- **Style family:** an immersive panorama (a cylindrical room seen from inside, framed prints on curved walls).
  - V1 is two moving rows of hung frames.
  - V2 is one room behind louvred shutters, with chapter tabs.
  - V3 is a sortable index grid.
- **WEB-SKILLS tags per element:**
  - **Room:**
    - S0062 (one transform on the ring, transform only, the hidden panels culled);
    - S0089 (system easing for steps and wall turns; the drag follows the hand);
    - S0083 (the photograph you face at full strength, the sides dimmed);
    - S1209 (native scroll, no pin, no wheel capture).
  - **Controls:** S1018 (the room is a focusable group: arrows, Home and End; the wall chips a radio group); S1441 (44px); S1443 (on touch a sideways drag turns, a vertical swipe scrolls).
  - **Caption:** S0666 (code, room, title); S1425 (on paper beneath, never on the photograph).
  - **Proof:** S0226 (CTA, reviews and licence by the action).
  - **Reduced motion:** S0400 (no scroll turn, no glide; steps change at once; the drag still works).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 streams the work past you, V2 shows one room per click, and V3 lays everything flat on a grid. V4 puts you inside the work, surrounded by it.
  - **Why it is better.** Every photograph is seen large and in sequence, the three kinds of work are three walls you can turn to, and the turn itself is a pleasure. It keeps V1's sense of volume, the whole room around you, with V2's one-room focus.
  - **Content.** The same listed photographs, titles and plan-room codes as V1 to V3 (`listed()`, the same two held out). No counts are printed.

## What was built
**Files:**
- `remodeling/src/sections/work.html`: V4 added in the existing version system (`.ver[data-v="4"]`, prefix `rr__`, checked free).
- `css/sections/work.css`: a V4 block appended.
- `js/sections/work.js`: a `4:` definition reusing `listed()`, `CAT` and `viewerList()`.
- V1 to V3 are untouched.

**The room:**
- **The stage** runs full width with a soft ceiling, floor and horizon line. The listed photographs hang in framed mats on a ring around the camera (CSS 3D: the ring at the camera, each print `rotateY(i·15°) translateZ(−R)`).
- **Grouped into three walls,** each labelled above its first print: Kitchens, Bathrooms, Whole homes. Within a wall the order is the section's own.
- **Sized so the print you face is large** (478 × 344 at 1440, about 273 × 196 on phones), with its neighbours curving away at either side.
- **Only the prints within the field of view are drawn** (5 at 1440, 3 on phones); the rest are hidden, and the sides are dimmed (S0083).

**Turning:**
- **Drag** turns the room on the spot, the prints following the hand. On release it carries a little momentum and settles facing a photograph. On touch, a sideways drag turns the room and a vertical swipe scrolls the page.
- **The scroll** turns the room slightly as the section passes (Immersive Garden's camera scrub). When the page rests, the room settles facing the nearest photograph, and a turn already under way is never cut short.
- **Buttons and keys:** previous and next (48px), the arrow keys, Home and End on the focused room, and Enter to open the print you face.
- **The wall chips** (a radio group) turn you to the first print of each wall by the shortest way round.
- **A tap or click on a side print** turns you to it; on the front print it opens the site's viewer, in the room's order.

**The caption** (on paper beneath, S1425): the plan-room code and room ("P-02 · Bathroom") and the firm's title, then "See it large".

**Then:** Book a consultation, 4.8 · 343 and the licence.

**Arrival:** the room turns a few prints into place as it comes into view.

**Reduced motion (S0400):** no scroll turn, no glide (steps change at once); the drag still works.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Our Work V4** | **9** | **8** | **9** | **10** | **8.8** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.6 + 2.4 + 1.8 + 1.0 = 8.8.

| category | evidence | why not higher |
|---|---|---|
| **Design 9** | **A space, not a layout:** the curved walls, the framed prints and the horizon make the work surround the visitor. One print at full presence, the sides receding.<br>**Heights:** 1071px at 1440, 942px at 768, 905 to 986px on phones. | On phones only one print is fully in view (a narrow window onto the room). |
| **Usability 8** | **Verified at 1440 mouse, 768 and 390 touch, and reduced motion:**<br>• the front print is centred after every action (x = 481 of 1440, 243 of 768, 59 of 390);<br>• a drag turns and settles;<br>• the Bathrooms chip turns to P-02 and the Whole homes chip to P-03;<br>• Next, two Left presses, and Enter (opens the viewer on the print you face) all work.<br>**Measures:** all 24 photographs load as the room turns a full circle; 0 targets under 44px; 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | A drag is hand-locked, so a short drag can settle back on the same print; the buttons and chips are the quicker way to travel far. |
| **Creativity 9** | A move the section did not have: the visitor stands inside the work. The camera turns, scrubbed by the scroll and the hand, and the three walls are the three trades. | It is CSS 3D, not WebGL: the room is a ring of flat prints. |
| **Content 10** | **Photographs and titles:** the same listed photographs, titles and plan-room codes as V1 to V3 (the same two held out).<br>**No counts printed.**<br>**By the action:** CTA, 4.8 · 343 and the licence verbatim.<br>Locks **0 fails**; outside links **0**. | |

**Vetoes checked, none tripped:**
- no console errors or warnings (V4 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no broken images (24 of 24);
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **No print was centred most of the time.** The scroll turned the room continuously, so the front print sat at x = 301 instead of 479 at 1440. Fixed: a smaller scroll turn, and when the page rests the room settles facing the nearest print.
2. **The settle cut the arrival turn short,** so the room opened on Whole homes. Fixed: a settle never interrupts a turn under way.
3. **A turn could end between two prints** if the page moved during it. Fixed: every turn checks on completion and settles onto the nearer print.

## Defects remaining (honest)
- **Phones:** one print fully in view at a time.
- **Short drags:** a short drag settles back on the same print (the prints follow the hand exactly).
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Immersive Garden, primary)
- **Transferred:**
  - the camera as the storyteller, scrubbed by the scroll;
  - an immersive space;
  - a heavyweight effect kept inside a budget (CSS 3D, culling, no pin).
- **Not transferred:**
  - WebGL and 3D models;
  - the chaptered build journey;
  - long pinned scroll;
  - Immersive Garden's identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · hung frames (default) | V2 · room chapters | V3 · find a room like yours | V4 · the round room |
|---|---|---|---|---|
| **Composition** | Two moving rows | One room, tabs, filmstrip | An even index grid | A round gallery seen from inside |
| **Finding a room** | Chase a frame | A chapter, then a thumbnail | A room and a word | Turn to a wall, or turn by hand |
| **Sense of volume** | Strong | Low | Strong | Strong (surrounding) |
| **One photograph large** | No | Yes | No (tap to open) | Yes |
| **Where it is weaker** | Hard to find one | Fewer at once | Small tiles | One print fully in view on phones |

**My call:** V4 is a genuine challenger, and my strongest Our Work version: it combines V1's volume with V2's one-large-photograph focus in a single immersive move. The defaults are not changed; the owner picks.

## Evidence (`qa/new/work-v4/`)
- `v4-1440-kitchens-turning-bathrooms-wholehomes.jpg`: facing the first kitchen; mid-drag; the Bathrooms wall; the Whole homes wall.
- `v4-390-states.jpg`: the phone.
- `v4-768.jpg`: the tablet.
- `v4-1440-reduced-motion.jpg`: reduced motion.
- `v4-single-file.jpg`: V4 picked through the header switch inside the delivered single HTML file at 1440 and 390, turned to the Bathrooms wall.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
