# GATE-NEW · Hero · V3 "The viewfinder"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 2, section 1 of 7. Pass 1 (all seven sections) was accepted by Muse.

The default is unchanged: V1 (the opening, the drawn sheet) stays version 1, and V2 (the wall) is untouched. No backups ship.

**How to see V3:**
- **Header switch.** Use the Opening "1 · 2 · 3" switch while the hero is in view. On phones it is the "‹ 1/3 ›" stepper.
- **Built page.** `elbaz-homepage.html?hero=3` opens V3 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Makhno Studio** is the primary ("the home as an explorable instrument: target-marked openings, drag/zoom/play controls"; the annex warns that day/night and seasonal modes were not seen, so none are used). The instrument is taken: a finished room you inspect with targets, zoom, drag and play.
- **Signature move:** the viewfinder.
  - The hero opens on a camera viewfinder (corner brackets, a centre cross, a readout of the room and the zoom) framed on one of the firm's finished rooms. Target marks sit on the things the project's own title names (for the navy kitchen: the custom range hood, the brass hardware, the navy blue Shaker cabinetry).
  - Tap a target and the viewfinder zooms in on it and names it. Drag to look around while zoomed. Switch between three rooms. Press play and it tours every target in every room by itself.
  - The copy sits below, in a cinema title band.
- **Style family:** a camera viewfinder (photographic, technical overlays, an inspection instrument).
  - V1 is a drafted sheet (frame, illustration, roof window).
  - V2 is a gallery wall (a salon hang with a camera pull-back).
  - V3 is one room at full size, looked into closely.
- **Composition:** the image on top, a title band beneath, and no pin. V1 and V2 both use a copy column beside the media and a pin.
- **WEB-SKILLS tags per element:**
  - **Viewfinder and camera:**
    - S0062: transform, opacity and filter only, one layer moved;
    - S0089 (system zooms ease; the drag follows the hand);
    - S0063 (room changes masked by a short blur: never two photos crossfaded at full strength).
  - **Targets:** S1441 (44px buttons); S0083 (one target at a time, the rest hidden while zoomed); S1018 (keyboard: Tab to a target, Enter zooms, Escape returns, arrows step through targets).
  - **Play:** a pause control, and playback stops off screen and on any touch (WCAG 2.2.2, via S0049).
  - **Title band:** S0666 (H1 the entry point); S1425 (copy on paper, never on the photograph); S0451 (masked line rise).
  - **Reduced motion:** S0400 (no zoom travel, no focus pull; targets and rooms switch at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 shows one kitchen through a drawn roof window; V2 shows all 26 projects at a distance. V3 is the opposite of V2: one finished room, examined up close, by your own hand.
  - **Why it is better.** It proves craft, not just volume: a visitor can zoom into the hood, the hardware and the sink of real Elbaz rooms in the first screen. Every label is a word from the project's published title.

## What was built
**Files:**
- `remodeling/src/sections/hero.html`: V3 added in the existing version system (`.ver[data-v="3"]`, prefix `hv__`, checked free).
- `css/sections/hero.css`: a V3 block appended.
- `js/sections/hero.js`: a new `3:` definition.
- V1 and V2 are untouched.

**The viewfinder** (full bleed, about 560px at 1440 × 900, 600px at 768, 450 to 470px on phones):
- **The HUD:** four corner brackets, a centre cross, a readout of the room ("01 / 03" and the project's full title) and the zoom ("1.0×", "2.0×").
- **The photograph:** one layer (`.hv__cam`) carries it. Every move is one transform on that layer (S0062).
- **The targets:** 44px buttons, a white ring with a clay dot and a soft pulse. They sit on the things the title names:
  - Navy Blue Shaker Kitchen with Brass Hardware and a Custom Range Hood: Custom range hood, Brass hardware, Navy blue Shaker cabinetry;
  - Gray Shaker Kitchen Remodel with Wolf Range & Farmhouse Sink: Wolf range, Farmhouse sink, Gray Shaker cabinetry;
  - Polished-Concrete Primary Bath with Curbless Walk-In Shower: Polished concrete, Curbless walk-in shower.
- **The controls** (a dark bar at the foot of the frame): three room buttons with thumbnails, "Tour the rooms" (play and pause), and "Zoom out" when zoomed.

**Behaviour:**
- **Tap a target:** the camera eases to it at 2× (0.9s, power3.inOut, S0089) and a paper card names it, with the project's title beneath. The other targets hide (S0083). Tap it again, press Escape, or "Zoom out" to return.
- **Drag** follows the hand. It works when zoomed, and at rest wherever the crop hides part of the room (on phones the sides of a landscape photograph). On touch at rest the drag pans sideways only, so the page keeps its vertical scroll; when zoomed the frame takes the gesture.
- **Rooms:** a short blur masks the change (S0063: never two photographs crossfaded). Each room opens framed across its targets.
- **A target outside the crop** waits at the frame's edge with an arrow pointing to it. A tap still takes you there.
- **The tour:** every target in every room, in order (about 30s), each held for 1.8s; it ends on "Tour again". It stops on any tap, drag, room change or Escape, and stops when the hero leaves the screen (WCAG 2.2.2, S0049).
- **Keyboard (S1018):** Tab reaches the targets; Enter zooms; arrow keys step between targets; Escape returns and keeps focus on the target.
- **Load beat:** the photograph pulls focus, the brackets close in, the H1 lines rise (S0451), then the targets appear.

**The title band** (paper, beneath the photograph, S1425): eyebrow and H1 (the entry point, S0666) on the left; the lead, Book a consultation, the phone, 4.8 · 343 and the licence on the right. On tablet and phone it stacks.

**Reduced motion (S0400):** no zoom travel, no focus pull, no pulse, no load beat; targets, rooms and the tour switch at once.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Hero V3** | **8** | **8** | **9** | **9** | **8.3** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.8 + 0.9 = 8.3.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One image, full bleed:** a finished Elbaz room, read as a camera view (brackets, cross, readouts), with the copy on paper beneath it, never on the photograph.<br>**The whole hero in the first screen at 1440 × 900:** the band ends at 889px.<br>**The zoomed views** read as details: the hood's brass bands, the farmhouse sink, the Wolf range's knobs. | The photographs ship at 1400 to 1920px wide, so a 2× zoom on a wide screen is slightly soft (see the asset ask). On phones the title band falls below the first screen (the hero is 965px tall at 390 × 844). |
| **Usability 8** | **Verified at 1440 mouse, 768 touch, 390 touch, and reduced motion:**<br>• a target zooms and names; Escape returns with focus kept; arrows step targets; "Zoom out" works;<br>• drag pans when zoomed (mouse and touch);<br>• rooms switch; a room tap stops the tour;<br>• the full tour visits all 8 targets in 3 rooms (29.5s) and ends on "Tour again"; pause works; scrolling away stops it.<br>**Measures:** 0 targets under 44px; 0 text under 13px; 0 overflow at 360, 390, 414, 768 and 1440; 0 errors. | The H1 and CTA sit below the image, so the call to action is not the first thing seen on a phone. Two targets in the bath sit at the frame's edge on phones (they work, with an arrow). |
| **Creativity 9** | A move the hero did not have: the visitor inspects the firm's craft by hand, in the first screen. Every label is a phrase from the project's own published title. | The viewfinder is a familiar camera language; the craft is in using it as an inspection instrument. |
| **Content 9** | **Facts:** licence string, phone, 4.8 · 343 verbatim; the H1, eyebrow and lead are V1's.<br>**Titles:** all three are the firm's published titles (`projects.json`), shown in the readout, the card and the image's alt.<br>Locks **0 fails**; outside links **0**. | The target labels are phrases cut from the titles (for example "Custom range hood"); Muse should confirm that the cut wording is acceptable. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V3 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no broken images;
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The load beat would have cleared the camera's transform.** It animated the camera layer itself; it now animates the photograph inside it.
2. **On tablets the room buttons ran under the play button.** Fixed: shorter labels (title words: "Navy Shaker", "Gray Shaker", "Polished concrete") and buttons that can shrink.
3. **On narrow frames some targets fell outside the crop and vanished** (the brass hardware on phones, the shower on tablets). Fixed: each room opens framed across its targets, an off-frame target waits at the edge with an arrow, and drag works at rest when the crop hides part of the room.
4. **Escape lost keyboard focus.** On the way back out every target was briefly hidden, so the focused one vanished and the page's own arrow keys then switched versions. Fixed: hiding applies only while one target is held.
5. **The zoom centred under the control bar.** The camera now centres in the visible part of the frame.
6. **The 2.2× zoom was soft** with the shipped photographs. Now 2×.
7. **The whole hero overflowed 900px at 1440.** The viewfinder was trimmed; the band ends at 889px.

## Defects remaining (honest)
- **Zoom sharpness:** the zoom is soft on wide screens with the shipped photographs.
- **Phones:** the H1 and CTA are below the first screen. The mobile action bar (Call, Text, Book) stays on screen.
- **The tour** is about 30s; a visitor who wants one room taps its target instead.
- **The copy** is V1's; V3 changes the composition, not the words.

## Asset request
To make the zoom sharp: full-resolution originals (at least 3000px wide) of these three photographs:
- the Navy Blue Shaker Kitchen;
- the Gray Shaker Kitchen;
- the Polished-Concrete Primary Bath.

Nothing else is needed. The version works now with the shipped files.

## Reference: transfers and non-transfers (Makhno Studio, primary)
- **Transferred:**
  - the home as an explorable instrument;
  - target-marked openings;
  - drag, zoom and play controls;
  - the interface as a technical overlay on a finished interior.
- **Not transferred:**
  - day and night or seasonal modes (the annex says they were not seen);
  - Makhno's 3D renders and typography;
  - any WebGL.
- **Other annex entries:** none were used.

## Comparison with the hero's previous versions
| | V1 · the opening (default) | V2 · the wall | V3 · the viewfinder |
|---|---|---|---|
| **Composition** | A drafted sheet: copy column, an illustration with a roof window onto a kitchen | A gallery wall of all 26 projects, the copy as a wall label | One room full bleed, the copy in a paper title band beneath |
| **What you do** | Drag or scroll the window open | Fly to any photograph; the camera pulls back | Tap targets to inspect details, drag, switch rooms, play a tour |
| **What it proves** | The firm's drawn identity | Volume: 26 projects | Craft: the details named in each title |
| **Where it falls short** | One photograph | Each photograph is small until flown to | Three rooms only; soft at 2× until originals arrive |

**My call:** V3 is a genuine challenger. It is the only hero where a visitor can look at the hood, the hardware and the sink of a real Elbaz room in the first screen. V1 keeps the strongest identity, and V2 the strongest sense of volume. The defaults are not changed; the owner picks.

## Evidence (`qa/new/hero-v3/`)
- `v3-1440-rest-zoom-room.jpg`: at rest; zoomed on the custom range hood with its card; the polished-concrete bath.
- `v3-1440-tour.jpg`: three frames of the tour in the gray Shaker kitchen (Wolf range, farmhouse sink, Gray Shaker cabinetry).
- `v3-390-rest-zoom-room.jpg`: the phone at rest, zoomed, and the bath with edge targets.
- `v3-768.jpg`: the tablet at rest, zoomed, and the bath.
- `v3-1440-reduced-motion.jpg`: reduced motion, at rest and zoomed.
- `v3-single-file.jpg`: V3 picked through the header switch inside the delivered single HTML file at 1440 and 390, with a target zoomed.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
