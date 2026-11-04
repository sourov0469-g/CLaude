# GATE-NEW · Our Work · V2 "Room chapters"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 1, section 4 of 7. The Hero, How a job runs and Financing gates were accepted by Muse.

The default is unchanged: V1 (two rows of hung frames) stays version 1 and its code is untouched. No backups ship.

**How to see V2:**
- **Header switch.** Use the Projects "1 · 2" switch while the section is in view. On phones it is the "‹ 1/2 ›" stepper.
- **Built page.** `elbaz-homepage.html?work=2` opens V2 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Boffi** is the primary. Its model is kitchens, baths and wardrobes as architectural room chapters under one brand narrative. The chapter model is taken: the firm's own photographs presented as three room chapters (Kitchens · Bathrooms · Whole home and outdoor), one room at full size at a time, under one heading.
- **Signature move:** the shutter.
  - Moving from room to room (or chapter to chapter) opens the next room through louvred storm shutters. The current photograph splits into vertical slats that turn edge-on, one after another, in the direction you travelled, revealing the next room behind them.
  - On first view the shutters open on the first kitchen.
  - It is Elbaz's own South Florida motif (louvred and storm shutters), built in DOM transforms, never a fade or a slide.
- **Style family:** an editorial showroom (one large room per view, with a chapter index and a filmstrip). This replaces V1's picture-rail marquee.
- **WEB-SKILLS tags per element:**
  - **Stage and shutters:**
    - S0063 (no two crossfade states: the old room is the slats, the new one is behind them);
    - S0062: transform and opacity only;
    - S0083: one focal point;
    - S0089: system-driven easing.
  - **Chapter tabs:** S1018 (a real tablist: arrow keys, Home and End); S1441 (44px).
  - **Filmstrip and controls:** S1441; S1443 (swipe on the stage on touch, tap a thumbnail).
  - **Caption:** S0666 (code, then title); S1425 (text on paper beside the photograph, never on it).
  - **Proof by the action:** S0226 (the CTA, reviews and licence beside it).
  - **Reduced motion:** S0400 (no shutters; rooms switch at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 (the default) is two endless rows of small framed prints moving in opposite directions: ambient, and you chase a frame to open it. V2 is still: one room at full size, chosen deliberately, chapter by chapter, with a shutter reveal at each turn.
  - **Why it is better.** Every photograph gets the whole stage instead of a thumbnail in motion. The rooms are grouped the way a homeowner shops (kitchen, bathroom, whole home). Navigation is direct: tabs, filmstrip, arrows, swipe.
  - **Content.** It uses the same 24 photographs and titles as V1, from the same list (`listed()`), with the same two held-out photographs. No counts are printed.

## What was built
**Files:**
- `remodeling/src/sections/work.html`: V2 added in the existing version system (`.ver[data-v="2"]`, prefix `rc__`, checked free).
- `css/sections/work.css`: a V2 block appended.
- `js/sections/work.js`: a new `2:` definition.
- V1 is untouched.

**One housekeeping change, recorded.** `work.js` still carried the retired job binder's definition under key `2`. Its markup left the file in the Final pass ("one version per section"), so it was dead code; but it would have initialised itself on any new slot 2. It now sits under the key `binder`, which no version uses, with a comment. Nothing delivered changed.

**Layout:**
- **Desktop:**
  - left column: eyebrow, H2, lead, the three chapters as a tablist (01 Kitchens · 02 Bathrooms · 03 Whole home and outdoor), the caption (plan-room code and room, then the firm's title), previous and next, "See it large", then the CTA with reviews and licence;
  - right: the stage (16:11) and the chapter's filmstrip.
- **Tablet and phone:** heading, then the chapters as three tabs across, then the stage (full bleed, 4:3 on phones) with its filmstrip, the caption, the controls and the CTA.

**The walk:** next and previous go through every room, chapter by chapter. After the last kitchen comes the first bathroom.

**Inputs:**
- **Chapter tabs:** a tablist; arrows, Home and End move and select.
- **Filmstrip:** one Tab stop; arrows walk it.
- **The stage:** tap or click to see the room large (the site's viewer); a sideways swipe on touch walks the rooms; arrow keys work when it is focused.

**The shutter:**
- The room on show is cut into 9 slats (6 on phones). Each carries its slice of the same cover crop, so at rest the slats are the photograph, seamlessly.
- They turn edge-on (rotateY to 88°, with perspective) one after another, darkening as they turn, in the direction of travel, uncovering the new room behind.
- **First view:** blank louvred shutters (paper slats with louvre lines) open onto the first kitchen as the stage arrives.

**Reduced motion:** no shutters; rooms switch at once; everything else is the same.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Our Work V2** | **8** | **8** | **8** | **9** | **8.1** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.6 + 0.9 = 8.1.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **The photograph is the hero.** One room at full size; copy beside it on paper (S1425), never on the photograph.<br>**A clear index:** chapters in display type with an accent marker; the filmstrip for the chapter.<br>**Height:** 723px at 1440 and 769px at 1024, under one screen; 1027 to 1069px on phones (about 1.3 screens).<br>**The shutter (S0063):** never two images blended; the old room literally turns away (`v2-1440-shutter-sequence.jpg`). | The left column is text-light below the caption on very tall desktops. On tablet (768) the section is 1252px, because the stage goes full width. The filmstrip thumbnails are small (76 × 56 desktop, 64 × 48 phones; still at or above 44px). |
| **Usability 8** | **Walk:** 8 × next crosses from the last kitchen to the first bathroom, and previous returns (verified).<br>**Keyboard:** tabs (Arrow Right, End) and filmstrip (arrows) verified.<br>**Touch:** a swipe on the stage walks the rooms without opening the viewer; a tap opens it with the right title (verified, 390 touch).<br>**Targets:** at least 44px everywhere; 0 text under 13px at 360 to 1440; 0 overflow.<br>**Clean-up:** no shutter slats are left in the DOM after a turn.<br>**Reduced motion (S0400):** all controls work instantly. | The swipe is touch-only by design (a mouse click opens the room large); some desktop users may expect drag. There are no counts per chapter (deliberate, per the fact lock), so you learn a chapter's length from its filmstrip. |
| **Creativity 8** | A move the site did not have: louvred storm shutters as the transition, a South Florida object and not a generic wipe. It runs in the direction of travel, with shading as the slats turn. | Still a gallery at heart; the shutter is the one bold move. |
| **Content 9** | **Photographs and titles:** the same 24 photographs and firm's titles as V1 (`listed()`), with the same two held out (their subjects do not match their titles, an owner item). The same plan-room codes as V1 (P-01 …).<br>**No counts printed:** never 52; 44 and 26 are not claimed here.<br>**By the action:** CTA, 4.8 · 343 and the licence string verbatim.<br>Locks **0 fails**; outside links **0**. | The H2 "Room by room. Our own photographs." and the lead line are my wording. Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V2 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- no broken images (every thumbnail and stage image loads);
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **A retired definition would have hijacked slot 2.** The binder's dead JS was moved to an unused key, with a comment (see above).
2. **Thumbnails could flash white while decoding** on phones (seen as blank boxes at the end of the Bathrooms strip). All twelve images load (`naturalWidth` measured); the thumbnail ground is now the muted sand, so a decode in progress reads as a placeholder, not a hole.

## Defects remaining (honest)
- **Tablet height:** 1252px at 768.
- **Swipe** is touch-only; a mouse drag does nothing.
- **First-view shutter:** if the visitor arrives fast (deep link, quick scroll) the shutters may already have opened.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Boffi, primary)
- **Transferred:**
  - rooms as chapters under one narrative;
  - one room at a time at full size;
  - a quiet editorial index.
- **Not transferred:**
  - product catalogues and configurators;
  - Boffi's typography and identity;
  - wardrobes (not an Elbaz service);
  - any video.
- **The shutter** is Elbaz's own (Miami louvred and storm shutters), not taken from Boffi.
- **Other annex entries:** Shed's clip-path chapter transitions were the cue for "a designed transition between chapters" only. They are not reproduced (the annex marks them unverified).

## Comparison with the section's previous best (V1, the default)
| | V1 · two rows of hung frames | V2 · room chapters |
|---|---|---|
| **Composition** | Two full-width moving rows of small framed prints | One room at full size, the chapter index beside it, a filmstrip |
| **Pace** | Ambient, always moving (with a pause control) | Still until you choose |
| **Finding a room** | Chase a frame; kitchens on one row, baths and whole homes on the other | Pick a chapter, then a thumbnail, or walk with next and previous or a swipe |
| **The move** | The frame under the pointer sets level (spirit level) | Louvred shutters turn to uncover the next room |
| **Where V1 still wins** | A sense of volume at a glance | V2 shows fewer rooms at once |

**My call:** V2 is a genuine challenger. It gives every photograph the full stage and a deliberate, shop-like way through the work, with a transition that belongs to South Florida. V1 is the stronger "lots of work" impression. The defaults are not changed; the owner picks.

## Evidence (`qa/new/work/`)
- `v2-1440-kitchens-bathrooms.jpg`: the Kitchens chapter, then Bathrooms, at 1440.
- `v2-1440-shutter-sequence.jpg`: one turn of the shutter, frame by frame (90, 220, 380, 560 and 900ms).
- `v2-390-states.jpg`: the phone, at rest, mid-shutter and in Bathrooms.
- `v2-768.jpg`: the tablet.
- `v2-single-file.jpg`: V2 picked through the header switch inside the delivered single HTML file at 1440 and 390.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
