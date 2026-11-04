# GATE-NEW · Where We Build · V4 "Drop your pin"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding, until the owner stops it), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 3, section 6 of 7. Hero V4, How a job runs V4, Financing V4, Our Work V4 and Reviews V4 were accepted by Muse.

The default is unchanged: V1 (the drawn map with the van route) stays version 1; V2 and V3 are untouched. No backups ship.

**How to see V4:**
- **Header switch.** Use the Service area "1 · 2 · 3 · 4" switch while the section is in view. On phones it is the "‹ 1/4 ›" stepper.
- **Built page.** `elbaz-homepage.html?towns=4` opens V4 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Bruno Simon**, scoped by the annex to exactly this section ("ONE interactive section only: the 104-town explorable-map candidate; performance + mobile/reduced-motion guards apply"). His playful physical objects are taken: the map is something you put your hands on, and the answer comes from an object you place. V2 took his explorable table; V4 takes a single physical gesture.
- **Signature move:** drop your pin.
  - The firm's map of the three counties is pinned to a cork board, with the office already marked by a clay pushpin.
  - The visitor's own pin waits at the board's edge. Pick it up and drop it where you live: it snaps to the nearest of the 104 towns and answers ("Yes, Weston…", V1's words).
  - Drop it where no listed town is near, and it says so honestly, with the phone number.
  - Typing the town is the other way in: the search drops the pin for you, from above. "Take the pin out" resets the board.
- **Style family:** a cork pinboard with a pinned paper map (push pins, paper, a tray).
  - V1 is a flat drawn map with a van route.
  - V2 is a tilted 3D table.
  - V3 is a flow map of threads on a night band.
- **The owner's laws for this section:**
  - map and search kept (the same combobox, the keyboard path to every town);
  - never an everything-list (no names are shown at all except the town under your pin, the office and the counties);
  - real interactivity (pick up, drop, search);
  - an honest answer and the phone for a town we do not list.
- **WEB-SKILLS tags per element:**
  - **Pin:**
    - S1443 (the pin is grabbed and dropped by pointer or touch; touch-action only on the pin, so the page scrolls everywhere else);
    - S0340 (the drop has a small spring);
    - S0062 (transform only).
  - **Snap:** S0083 (one town lit, named on a flag); S1441 (a 44px pin).
  - **Search:** S1018 (combobox: arrows, Enter, Escape); S1442 (label, hint, honest empty state).
  - **Answer:** S1425 (on paper); S0226 (CTA, reviews, licence and the phone by the action).
  - **Reduced motion:** S0400 (no fall, no spring: the pin appears in place).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 draws a route, V2 flies a camera, and V3 lights a thread. V4 lets the visitor put their own pin in the map, the gesture anyone makes to say "here's where I live".
  - **Why it is better.** It needs no spelling and no knowledge of municipal names: someone who knows where they live but not which municipality it is can simply point. The search remains for everyone else.
  - **Facts.** The towns and counts are the firm's published lists (34 / 31 / 39 = 104) at the same gazetteer points (`data/southfl.json`); the answers are V1's copy, word for word.

## What was built
**Files:**
- `remodeling/src/sections/towns.html`: V4 added in the existing version system (`.ver[data-v="4"]`, prefix `pb__`, checked free).
- `css/sections/towns.css`: a V4 block appended.
- `js/sections/towns.js`: a `4:` definition reusing the section's gazetteer (`geo()`, `NS_ORDER`, `norm()`, `esc()`).
- V1 to V3 are untouched.

**The side:** the eyebrow "Where we build", the H2 "Drop your pin. We will tell you.", one lead line, then the search panel (label, field, clear, the honest answer, "Take the pin out") and the proof: Book a consultation, 4.8 · 343, the licence and the phone line.

**The board** (no images; drawn in CSS and SVG):
- a cork board in a wooden frame;
- a tray at its edge holding the visitor's ink pin, "Your pin · Drag it to where you live";
- the firm's map of the three counties on paper, pinned slightly askew, with the 104 towns as small dots and the three county names;
- the office already marked with a clay pin and "Our office".
- No other names are shown: the only town ever named is the one under your pin (S0083).

**Pick up, carry, drop (Bruno Simon; S1443):**
- The pin is grabbed by pointer or touch (touch-action is off only on the pin, so the page scrolls everywhere else).
- While it is carried, the town under its tip (within 34px) lights, its county tints and a small flag names it, so you know before you let go.
- Dropped on a town: it snaps to it with a small spring (S0340) and the answer reads V1's words ("Yes, Weston. Weston is one of the 31 municipalities we build in across Broward, one of our three counties."); the field fills in.
- Dropped on the map where no listed town is near: the pin stays where you put it and says so honestly, with the phone: "No town we list right there. Drop the pin closer to where you live, or type your town above. Not sure? Call (754) 236-0675."
- Dropped off the map: it goes back to its tray, "Drop it on the map."

**Typing (S1018, S1442):** the combobox of V1 to V3 (arrows, Enter, Escape, at most six matches). A chosen town drops the pin onto the map from above with a small bounce. A town we do not list returns the pin to the tray and gives V1's unlisted answer with the phone.

**Reset:** "Take the pin out" (and the field's clear) puts the pin back in the tray.

**Keyboard:** the pin is a button; Enter on it moves to the search, which reaches every town.

**Arrival:** the map is pinned onto the board, the office pin goes in, and the visitor's pin hops in its tray three times.

**Phones (under 600px):** the tray lies flat above the map; the map is sized to fit one screen (`clamp(420px, 100svh − 280px, 713px)` tall), so one drag from the tray reaches every town. When the answer appears above the map, the map is held still under the finger.

**Reduced motion (S0400):** no arrival, no hop, no fall, no spring: the pin appears in place.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Where We Build V4** | **8** | **8** | **9** | **10** | **8.4** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 1.0 = 8.4.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **A physical object:** a cork board, a paper map pinned askew, a clay office pin and your own ink pin in a tray. One town named at a time, on a flag.<br>**Heights:** 981px at 1440 (V1 995, V2 1244, V3 1251), 1408px at 768, 1323px at 390 × 844. | The map is a tall strip (the three counties' real shape), so the board has empty cork beside it on wide screens. At 768 the section is tall (the board sits under the search). |
| **Usability 8** | **Verified at 1440 mouse, 768, 414, 390 and 360 touch, and reduced motion:**<br>• a drag to Weston names it while carried and answers "Yes, Weston…" on the drop;<br>• a drop in the Everglades answers "No town we list right there…" with the phone;<br>• a drop on the cork returns the pin to its tray;<br>• typing "Pomp" + Enter drops the pin on Pompano Beach from above;<br>• "Tampa" gives the unlisted answer and the pin returns to the tray;<br>• the keyboard: Enter on the pin reaches the search; arrows, Escape and Enter work; "Take the pin out" resets.<br>**Measures:** 0 targets under 44px; 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | On phones the map is 219 to 270px wide, so in the dense coast towns sit close together: the flag names the town before you let go, and the search is the precise way. |
| **Creativity 9** | A move the section did not have: the visitor answers by placing their own pin, the gesture anyone makes to say "here is where I live". It needs no spelling and no knowledge of municipal names. | The answer itself is the same V1 copy; the new part is the way in. |
| **Content 10** | **Towns:** the firm's published lists, 34 / 31 / 39 = 104, at the same gazetteer points.<br>**Answers:** V1's words; the unlisted answer and the phone kept.<br>**Never an everything-list:** no town names are shown except the one under the pin.<br>**By the action:** CTA, 4.8 · 343 and the licence verbatim.<br>Locks **0 fails**; outside links **0**. | The H2, the lead and the "no town right there" line are my wording; Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V4 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no images (the board and pins are drawn);
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **On phones the pin rested half outside its flat tray** (the tray was 37px tall for a 44px pin). Fixed: the flat tray is at least 64px tall.
2. **On phones the south of Miami-Dade was out of reach in one drag:** the map was 719px tall, more than a screen, and a drop there did not land. Fixed: the map is sized to fit one screen on phones.
3. **The dropped pin jumped to the board's corner:** the drop's spring cleared the pin's whole transform when it finished. Fixed: the spring scales the pin's drawing, not the button that carries its position.
4. **On one column, the answer appearing above the map pushed the map 125px down under the finger.** Fixed: a drop holds the map still (the page is scrolled by the same amount), with the browser's own scroll anchoring off for this section.
5. **The flag covered the county name** ("BROW" peeked out behind "Weston"). Fixed: the lit county's label steps aside while the flag, which names the county, is up.

## Defects remaining (honest)
- **Small map on phones:** coast towns sit close together (the flag and the search cover it).
- **Answer above the map on phones:** after a drop the answer is above the map (the flag on the map names the town at once; the answer text is a short scroll up).
- **Empty cork on wide screens** beside the tall map.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Bruno Simon, primary)
- **Transferred:**
  - a playful physical object you put your hands on;
  - the answer coming from what you do with it (place the pin);
  - weight and response: the pin lifts while carried, springs on the drop, bounces when the search drops it.
- **Not transferred:**
  - WebGL, physics engines and the driving game;
  - an explorable 3D world;
  - Bruno Simon's identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · the drawn map (default) | V2 · the tilted table | V3 · 104 threads | V4 · drop your pin |
|---|---|---|---|---|
| **Ground** | Paper | A 3D table | A night band | A cork board |
| **How you ask** | Search, tap a county | Search, the camera flies | Search, a thread lights | Drop your pin, or search |
| **Names shown** | The chosen town | The chosen town | The chosen town | Only the town under the pin |
| **Needs spelling** | Yes | Yes | Yes | No (point instead) |
| **Height at 1440** | 995px | 1244px | 1251px | 981px |
| **Where it is weaker** | Least playful | Heavy | Wide | Small map on phones |

**My call:** V4 is a genuine challenger. It is the most physical of the four and the only one that works for someone who knows where they live but not the municipality's name. It is also the shortest at 1440. V1 stays the default until the owner says otherwise.

## Evidence (`qa/new/towns-v4/`)
- `v4-1440-rest-carry-drop-search-unlisted.jpg`: at rest; carried over Weston (flag up); dropped on Weston; the search dropping the pin on Pompano Beach (mid-fall and landed); Tampa answered, pin back in the tray.
- `v4-390-states.jpg`: the phone: at rest; carried; dropped on Weston (the map held still); Pompano Beach; Tampa.
- `v4-768.jpg`: the tablet at rest and on Weston.
- `v4-1440-reduced-motion.jpg`: reduced motion.
- `v4-single-file.jpg`: V4 picked through the header switch inside the delivered single HTML file at 1440 and 390, with Weston searched.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
