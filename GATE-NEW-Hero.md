# GATE-NEW · Hero · V2 "The wall"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 1, section 1 of 7.

The default is unchanged: V1 stays version 1 and opens by default. V1's code, the delivered versions and the defaults were not touched. No backups ship.

**How to see V2:**
- **Header switch.** Use the Opening "1 · 2" switch in the header while the hero is in view. On phones it is the "‹ 1/2 ›" stepper.
- **Built page.** `elbaz-homepage.html?hero=2` opens V2 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Immersive Garden** is the primary, the confirmed one. Its chaptered camera scrub is taken as one move only: the scroll drives a camera through one connected world, inside the annex's performance budget for a local-service build. No WebGL, no loader.
- **Signature move:** the pull-back.
  - The hero is a gallery wall hung with all 26 projects the firm has photographed, one photograph each. The copy hangs on that wall as its label.
  - The first screen frames the label with the work around it. Scrolling pulls the camera back until the whole wall of 26 is in view.
  - Any photograph can be flown to, named and opened.
- **Style family:** a gallery salon wall. It is a full-bleed photographic hang with a museum wall label.
- **WEB-SKILLS tags per element:**
  - **Wall and camera:**
    - S1328: one connected world, scroll forward and back;
    - S0186: pin and scrub, ease none;
    - S1326: one normalized progress value, reversible;
    - S1209: native scroll speed, a finite pin, no trap;
    - S0062: transform and opacity only.
  - **Label plate (the copy):**
    - S1425: copy on opaque paper, never on a photograph;
    - S0666: one entry point, the H1;
    - S0451: masked line rise.
  - **Tiles:**
    - S1441: targets far above 44px;
    - S0083: one focal point when a photograph is flown to, the rest step back;
    - S0089: system-driven moves use easing, not springs.
  - **Fly-to and keyboard:**
    - S1018: keyboard parity (arrow keys walk the wall, Enter opens, Escape steps back);
    - S1443: tap is the gesture on touch, with no hidden drag.
  - **Reduced motion:** S0400 (no pin, no camera travel, everything reachable).
  - **Self-audit:** S1306 (removal test), S0502 (10-dimension critique), S1473 (heuristics).
- **How it differs, and why it is better:**
  - **How it differs.** V1 (the only existing version) is a drafted sheet: a bordered frame, copy left and house right, one kitchen seen through a drawn roof window, a finish picker and a reveal rail. V2 has no frame, no drawing and no split. The hero is the firm's own photographed work, edge to edge, and the camera is the move, where V1 uses a mask.
  - **Why it is better.** Before a visitor reads a word, the first screen shows real rooms, and the scroll turns that into the full body of work: 26 projects, all their own. Every photograph is interactive.

## What was built
**Files:**
- `remodeling/src/sections/hero.html`: V2 added after V1 inside the existing version system (`.ver[data-v="2"]`).
- `css/sections/hero.css`: a V2 block appended; V1's rules untouched.
- `js/sections/hero.js`: a `2:` definition added beside `1:`; V1's code untouched.

**System changes (minimal, so V2 can be picked):**
- **Header dock.** The version-switch dock is back in the header (`.nav__vs`), on the home page only (`build.py` `{{VS}}`). The inner pages' markup is unchanged.
- **Opening by link.** `core.js` honours an explicit `?hero=2` on first load. The default is still version 1, and stored picks are still ignored (FINAL rule kept).

**The wall:**
- 26 tiles, one per photographed project in `data/projects.json`. Each tile is the project's own photograph with its title verbatim, in white mats on a sand wall.
- The hang mixes rooms so that neighbours rarely repeat a room type.
- The layout is computed so the label always sits at true size (camera scale 1 on the first screen, so the type is crisp):
  - **desktop:** 6 columns, the label taking 2 × 2 cells;
  - **tablet (600 to 999px):** 4 columns, the label taking 2 columns;
  - **phone:** 4 columns, the label spanning the width.
- Where cells are left over (phones and tablets), they carry the wall's own label: "26 projects. One photograph each, all our own work."

**The camera:** one transform on one layer.
- **Base (scroll).** A pin under the nav (+110% desktop, +90% phone, scrub 1) pulls back from the label (scale 1) to the whole wall (scale about .58 at 1440). The scale is interpolated logarithmically, so the dolly feels even.
- **Depth.** At the label the tiles sit slightly apart and close into the flat hang as the camera steps back. This is the continuity cue: no hard cut.
- **Lean (fine pointer).** A small pan answers the pointer, at most 26 × 18px.
- **Flight (a chosen photograph).** The photograph comes to the middle, the rest of the wall drops to 22% and the label fades. A card then names it, with Previous, Next, Open large and Back to the wall.

**Inputs:**
- **Click or tap a photograph:** fly to it. Clicking or tapping the flown photograph again opens it large, in the site's existing viewer.
- **Keyboard (one Tab stop, roving):**
  - focus flies to the photograph;
  - arrow keys walk the wall as it hangs, Home and End go to the ends;
  - Enter opens large; Escape steps back.
- **Scrolling on while flown:** steps back on its own.

**Load:** the label's two lines rise, then the photographs are hung outward from the label, each settling from a slight tilt.

**Reduced motion:** the same wall and every action, with no pin, no travel, no lean and no load tween; flights are instant.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Hero V2 "The wall"** | **8** | **8** | **8** | **9** | **8.1** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.6 + 0.9 = 8.1.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One entry point (S0666).** The H1 is on the only paper surface. Everything else is photography in mats: one material system, sand wall, white mat, black type, the clay accent only on the CTA.<br>**Figure and ground (S1425).** The copy never sits on a photograph. The label is opaque, and while a photograph is flown the label fades so it never shows enlarged behind it.<br>**Composition.**<br>• Desktop: the label is centred with two full columns and parts of a third on each side (`v2-1440-pullback.jpg`).<br>• Phones: photographs above and below the label in the first screen (`v2-phone-pullback.jpg`).<br>**Removal test (S1306)** applied to every element:<br>• the hint earns its place by teaching the two gestures;<br>• the wall label fills spare cells with a fact, not decoration;<br>• no ornament remains. | Cells are uniform, so the 9 portrait photographs are cropped to the cell; the full photograph is one tap away. On phones, the whole-wall frame at the end of the pin is a narrow column (tiles about 45px): a "this is everything" moment, not a browsing state. |
| **Usability 8** | **Targets (S1441).** Every control in the hero is at least 44px at 360, 390, 414, 768 and 1440: 0 small targets, 0 text under 13px, 0 overflow (measured).<br>**Keyboard (S1018).** One Tab stop into the wall (roving tabindex), then arrows, Home and End, Enter and Escape. All verified: Arrow Right went to photograph 10, Arrow Down to 14, Escape back to the wall, Enter flies.<br>**Pin (S1209).** Native scroll speed, a finite pin.<br>• Pin audit: engage, play to 1, release and page end at 360, 375, 390, 414, 768 and 1440, for both V1 and V2: **12/12**.<br>• Flying, then scrolling, steps back on its own (verified).<br>**Touch (S1443).** Tap to fly, then Previous, Next, Open large and Back as 44px buttons above the call bar; no hidden gestures.<br>**Reduced motion (S0400).** Every action works (tested at 1440 and 390, 0 errors). | The pointer's name card is pointer-only; touch gets the name from the flight card instead. A pinned hero always costs some scroll; V2's pin is about one screen, the same budget as V1. |
| **Creativity 8** | A move the section and the site did not have: the camera pull-back from a wall label to the whole body of work. It is Immersive Garden's camera scrub rebuilt in 2D for a local-service budget. The salon hang, the outward hanging on load and the photograph flight make it an instrument, not a slideshow. | It is a disciplined, photographic idea rather than a spectacle. A 3D gallery would be bolder but is outside the annex's performance budget. |
| **Content 9** | **Facts verbatim:**<br>• 4.8 · 343 Google reviews;<br>• "Licensed, bonded & insured · CBC1265280";<br>• (754) 236-0675;<br>• Miami-Dade, Broward and Palm Beach.<br>**Photographs and titles.** 26 photographs and 26 titles, verbatim from `projects.json`: the 26 photographed projects, never 52 photos. No before/after pairs are used (they stay on the MERSI seam only). No invented imagery or copy.<br>**Word count.** Hero copy is 34 words, the same as V1, under the 40 cap.<br>**Checks.** Locks **0 fails**; outside links **0**. | The wall label "One photograph each, all our own work" is my wording of the firm's facts (26 photographed projects; the site's "photographed as delivered"). Muse should confirm the phrasing. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V2 at 1440, 768, 390 and 360, swaps 1→2→1→2, the single file);
- no broken images (26 of 26 tiles load; the single file has 38 images, 0 broken);
- facts verbatim;
- no outside links;
- no new fonts (Poppins and Roboto only);
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **Not full bleed: a 48px paper strip down the right edge at 1440.** A negative right margin does not widen a block with an explicit width. Fixed: `width: calc(100% + 2 × gutter)` with matching negative margins (and the phone gutter below 900px).
2. **The H1 ran to three lines on the desktop label.** A site-wide rule (`.sec .ver:not([data-v^="b"]) h1 { font-size: var(--t-display) }`) outranked the version's own size: 84px instead of 50px. Fixed: a more specific rule, sized to the label's width (`min(clamp(...), --pw × .085)`), with the two lines held on desktop.
3. **The phone H1 was too small** (the width formula gave 30px). Fixed: the width formula applies from 1000px only; phones and tablets use their own clamp (38 to 48px).
4. **Dead space inside the phone and tablet label.** Rows were rounded up to whole square cells. Fixed: cell height is solved so a whole number of rows fits the label exactly.
5. **At 360 the hint wrapped to two lines and covered the licence line.** Fixed: on phones the hint is one line ("Scroll to step back from the wall."); "Pick any photograph." arrives with the whole wall.
6. **The reviews link was 32px tall on tablet and desktop.** It is back to the site's 44px.
7. **Phone flight: the label (scaled about 3×) showed huge letters behind the flight card.** Fixed: the label fades while a photograph is flown (one focal point, S0083).
8. **Test harness (not the site).** The interaction test first tapped a tile hidden under the header, which navigated away. The test now picks a tile whose centre is truly hit-testable.

## Defects remaining (honest)
- Uniform cells crop the 9 portrait photographs. A salon hang with mixed proportions would show them whole; it was held back to keep the 26-cell geometry exact at every width.
- **Phone end frame:** a narrow column of small tiles (see Design).
- **The single HTML file** runs each page in a frame, so a `?hero=2` link on the shell is not passed through. The header switch is the way to pick there (verified at 1440 and 390).
- **Reduced motion:** a flown photograph stays flown if the visitor scrolls away, because there is no pin to detect the step-back. This is harmless; Escape or Back returns.
- **No images needed or requested.** Every photograph is the firm's own, already in the file.

## Reference: transfers and non-transfers (Immersive Garden, primary)
- **Transferred:**
  - the scroll is a camera move through one connected world, not a page that swaps (S1328);
  - continuity: the wall leaves as one plane, with no cut between the label and the whole wall;
  - the camera is the storyteller; copy explains meaning.
- **Not transferred:**
  - WebGL scenes and 3D geometry;
  - chaptering the hero into several scenes (one move only);
  - loaders and intro screens (the annex bans that weight class);
  - sound;
  - custom cursor worlds.
- **Other annex entries** were not used as references for V2. The site-wide easing language (Unseen Studio, scoped) is applied as always.

## Comparison with the section's previous best (V1, the owner's mix)
| | V1 · the drafted sheet (default) | V2 · the wall |
|---|---|---|
| **Composition** | Framed sheet, copy left, a drawn house window right | Full bleed: the label hung in the middle of 26 photographs |
| **The move** | A mask: the roof window opens into one full room | A camera: pulls back from the label to all 26 projects |
| **Proof in the first screen** | One kitchen (six in the picker) | About a dozen real rooms around the label on desktop (several in part), 4 to 8 on phones |
| **Interactivity** | Finish picker; drag or keys on the reveal rail; pointer depth | Fly to any of 26 photographs (pointer, touch, keys); open large; walk the wall; lean |
| **Style family** | Architect's drawing | Gallery salon wall |
| **Where V1 still wins** | Its single image is more crafted and calmer, and the roof motif ties the brand mark to the hero | V2 is louder and carries more images at once |

**My call:** V2 is a genuine challenger. It answers "is their work real and is there a lot of it?" before the visitor reads, and every photograph is a doorway. V1 remains the stronger single-image brand moment. The defaults are not changed; the owner picks.

## Evidence (`qa/new/hero/`)
- `v2-1440-pullback.jpg`: the first screen, mid-pull and the whole wall at 1440.
- `v2-768-pullback.jpg`: the same three states at 768.
- `v2-phone-pullback.jpg`: 390 (first screen, mid-pull, whole wall) and 360 (first screen, whole wall).
- `v2-1440-hover-fly-viewer.jpg`: the pointer name card, a flown photograph with its card, and Open large.
- `v2-390-fly-viewer.jpg`: a phone flight (label faded) and the viewer.
- `v2-single-file-switch.jpg`: V2 picked through the header switch inside the delivered single HTML file at 1440 and 390.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- pins (home, both versions, 6 widths): 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
