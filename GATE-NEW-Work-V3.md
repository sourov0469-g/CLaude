# GATE-NEW · Our Work · V3 "Find a room like yours"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 2, section 4 of 7. Hero V3, How a job runs V3 and Financing V3 were accepted by Muse.

The default is unchanged: V1 (two rows of hung frames) stays version 1, and V2 (room chapters) is untouched. No backups ship.

**How to see V3:**
- **Header switch.** Use the Projects "1 · 2 · 3" switch while the section is in view. On phones it is the "‹ 1/3 ›" stepper.
- **Built page.** `elbaz-homepage.html?work=3` opens V3 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Igloo Inc** is the primary ("one continuous scroll gesture, no hard section cuts: continuity discipline"; never its loader). Its continuity discipline is taken: nothing in this version ever cuts, fades out or is replaced. Every photograph stays on the table and travels to its new place when you ask a question.
- **Signature move:** the photographs come forward.
  - All of the firm's listed photographs lie on one index at once, small and still.
  - Choose a room (Kitchens, Bathrooms, Whole home and outdoor) and a word taken from the firm's own titles (Shaker, Two-tone, Waterfall island, Navy, White, Brass, Marble, Range hood, Tile, Vanity, Walk-in shower, Curbless, Freestanding tub). The rooms whose titles say it glide to the front in full colour, and the rest slide to the back, quiet.
  - Words that no title in the chosen room carries are switched off, so the index never promises what it cannot show.
  - Point at or focus a photograph and its title reads beneath the index, with the chosen word marked. Tap it to see it large.
- **Style family:** a sortable photo index (a catalogue light table: an even grid, the firm's titles as the vocabulary).
  - V1 is two moving rows of hung frames.
  - V2 is one room at full size with chapter tabs and a shutter.
- **WEB-SKILLS tags per element:**
  - **Index and reflow:**
    - S0062: transform, opacity and filter only (FLIP: each tile slides from where it was);
    - S0089 (system easing for the reflow);
    - S0083 (the matches in colour, the rest quiet).
  - **Filters:** S1018 (two radio groups: arrows, Home and End); S1441 (44px); S1442 (honest states: a word with no match is disabled, with the reason announced).
  - **Tiles:** S1441; S1443 (tap to open on touch).
  - **Reading line:** S1425 (the title on paper, never on the photograph); S0666 (code and room, then the title).
  - **Proof by the action:** S0226 (CTA, reviews and licence).
  - **Reduced motion:** S0400 (no travel: the order changes at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 shows the work as an ambient stream you chase; V2 shows one room at a time, chapter by chapter. V3 shows everything at once and lets the visitor sort it by what they want.
  - **Why it is better.** It answers the real question, "have they built something like mine?", in one tap ("Navy", "Freestanding tub"), using only the words the firm itself published. It keeps V1's sense of volume and adds V2's directness.
  - **Content.** The same listed photographs and titles as V1 and V2 (`listed()`, the same two held out), the same plan-room codes. No counts are printed.

## What was built
**Files:**
- `remodeling/src/sections/work.html`: V3 added in the existing version system (`.ver[data-v="3"]`, prefix `fi__`, checked free).
- `css/sections/work.css`: a V3 block appended.
- `js/sections/work.js`: a `3:` definition reusing the section's own `listed()`, `CAT`, `viewerList()` and `esc()`.
- The retired binder already sits on its own key (`binder`), so slot 3 was free. V1 and V2 are untouched.

**Two questions** (radio groups of 44px chips):
- **Room:** All rooms, Kitchens, Bathrooms, Whole home and outdoor.
- **Detail:** Any detail, Shaker, Two-tone, Waterfall island, Navy, White, Brass, Marble, Range hood, Tile, Vanity, Walk-in shower, Curbless, Freestanding tub.
  - Each word matches the firm's own titles (for example "Freestanding Tub" and "Freestanding Soaking Tub").
  - A word that no title in the chosen room carries is switched off (dashed and greyed, skipped by the arrow keys, ignored on click). For example, the bath words are off under Kitchens.
  - If a room change leaves the chosen word off, the word returns to "Any detail".

**The index:**
- All listed photographs (the same ones as V1 and V2, with the same two held out) on one even grid: 8 across on wide screens, 6 on tablets, 4 on phones.
- Every tile is the same size (4:3), so a tile only ever changes place, never size.
- **Choosing moves the matches to the front.** They arrive in colour with a clay edge, and the rest go quiet (40% and greyscale) at the back.
- **Nothing cuts (Igloo).** Each tile slides from where it was to where it now belongs (FLIP, transform only), with a slight stagger. The matches travel on top, so they literally come forward.
- **The DOM order follows the visual order,** so Tab and screen readers meet the matches first.

**The reading line** (paper, beneath the index):
- Point at or focus a photograph to read its plan-room code and room (for example "P-01 · Kitchen") and its title, with the chosen word marked in clay.
- After a choice it shows the first match.
- Tap or Enter opens the site's viewer, in the index's current order.

**Below it:** Book a consultation, 4.8 · 343 and the licence (S0226).

**First view:** the photographs are laid down front to back as the index comes into view.

**Phones:** the details become one sideways-scrolling row of chips, so the index stays near the top.

**Reduced motion (S0400):** no travel and no lay-down; the order changes at once.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Our Work V3** | **7** | **9** | **8** | **10** | **8.1** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 2.8 + 2.7 + 1.6 + 1.0 = 8.1.

| category | evidence | why not higher |
|---|---|---|
| **Design 7** | **One calm index:** every photograph at once, an even grid, a clear two-question header, the title read on paper beneath (S1425).<br>**The answer is visible from across the room:** the matches in colour at the front, the rest quiet (S0083).<br>**Heights:** 1111px at 1440, 1150px at 768, 1128 to 1165px on phones. | The tiles are small (163 × 122 at 1440, 78 × 59 at 360): it is an index, and the full view is one tap away. On a 900px-tall screen the reading line sits just below the fold. It is plainer than V2's shutter. |
| **Usability 9** | **Verified at 1440 mouse, 768 and 390 touch, and reduced motion:**<br>• Bathrooms brings 12 rooms forward; with Freestanding tub, 3 (Black Marble, Fluted Vanity, Multi-Bathroom), and correctly not the Soaking Tub bath, whose title does not say "freestanding";<br>• Kitchens switches off the six bath words; with Navy it brings 2;<br>• the arrows skip switched-off words; End lands on the last available one;<br>• a click on a switched-off word changes nothing;<br>• focus reads the title; Enter opens the viewer on the same title.<br>**Measures:** all 24 images load; 0 targets under 44px; 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | On phones the details scroll sideways, so some words start off screen (the cut chip at the edge shows there is more). |
| **Creativity 8** | A move the section did not have: the firm's own vocabulary turned into the way to search its work, with every photograph travelling to its place. | Filtering a gallery is a known pattern; the craft is the continuity and the honest vocabulary. |
| **Content 10** | **Photographs and titles:** the same listed photographs and titles as V1 and V2 (`listed()`, the two held out), with the same plan-room codes.<br>**Words:** every detail word appears in the firm's titles; matches are computed from the titles, not tagged by hand.<br>**No counts printed.**<br>**By the action:** CTA, 4.8 · 343 and the licence string verbatim.<br>Locks **0 fails**; outside links **0**. | |

**Vetoes checked, none tripped:**
- no console errors or warnings (V3 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no broken images (24 of 24 load);
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **Mid-reflow, the quiet tiles flew over the matches.** Fixed: the matches travel on top.
2. **The detail chips wrapped onto a second line at 1440,** leaving "Freestanding tub" alone. Fixed: slightly tighter chips; one line at 1440.

## Defects remaining (honest)
- **Small tiles:** the tiles are small by design (an index).
- **Below the fold:** on a 900px-tall desktop the reading line is just below the fold.
- **Phones:** the details scroll sideways.
- **Room labels:** the room chips use the section's existing categories, so "Whole home and outdoor" groups the waterfront backyard with the whole-home renovations (as V1 and V2 do).
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Igloo Inc, primary)
- **Transferred:**
  - continuity discipline: no cut, no crossfade, no element ever disappears;
  - each change is one continuous movement from the old state to the new.
- **Not transferred:**
  - Igloo's loader and weight class (the annex bans it);
  - its scroll-driven journey;
  - WebGL;
  - its identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · two rows of hung frames (default) | V2 · room chapters | V3 · find a room like yours |
|---|---|---|---|
| **Composition** | Two moving rows of framed prints | One room at full size, chapter tabs, a filmstrip | Every photograph at once on an even index, two questions above |
| **Finding a room** | Chase a frame | Pick a chapter, then a thumbnail | Pick a room and a detail; the matches come forward |
| **The move** | The frame under the pointer sets level | Louvred shutters | Every tile travels to its new place |
| **Where it is weaker** | Hard to find a specific room | Fewer rooms at once | Small tiles; plainer |

**My call:** V3 is a genuine challenger. It is the most useful version for a visitor with a specific room in mind, and it keeps the "lots of work" impression of V1. V2 remains the most beautiful presentation of a single room. The defaults are not changed; the owner picks.

## Evidence (`qa/new/work-v3/`)
- `v3-1440-rest-reflow-bath-tub-kitchen-navy.jpg`: at rest; the reflow mid-flight (the matches travelling on top); Bathrooms with Freestanding tub; Kitchens with Navy, with the bath words switched off and a title read.
- `v3-390-states.jpg`: the phone.
- `v3-768.jpg`: the tablet.
- `v3-1440-reduced-motion.jpg`: reduced motion.
- `v3-single-file.jpg`: V3 picked through the header switch inside the delivered single HTML file at 1440 and 390, with Bathrooms chosen.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
