# GATE-NEW · Hero · V4 "The triptych"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding: "this addendum governs from now until the owner stops it"), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 3, section 1 of 7. Pass 2 (all seven sections) was accepted by Muse.

The default is unchanged: V1 (the opening) stays version 1; V2 (the wall) and V3 (the viewfinder) are untouched. No backups ship.

**How to see V4:**
- **Header switch.** Use the Opening "1 · 2 · 3 · 4" switch while the hero is in view. On phones it is the "‹ 1/4 ›" stepper.
- **Built page.** `elbaz-homepage.html?hero=4` opens V4 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Shed** is the primary ("interior case pages as story chapters … parallax storytelling"; story chapters confirmed live, the clip-path transitions not, so none are used). Interiors as chapters told with parallax are taken: the firm's three kinds of work are three interior chapters side by side, and each photograph moves at its own depth.
- **Signature move:** the triptych.
  - The hero is four tall slices across the screen: a paper slice with the headline, the call to action and the proof, then three photographs, Kitchens · Bathrooms · Whole homes.
  - One chapter is open at a time. Point at, tap or focus another and it slides open while the others fold to narrow spines with their names set upright.
  - Inside every slice the photograph sits at its own depth: it drifts against the pointer and against the scroll (parallax).
  - Each open chapter names the firm's project it shows and leads to that service's own page (Kitchens, Bathrooms, Whole-home renovation).
- **Style family:** an interior triptych (tall vertical photo panels, editorial chapter names).
  - V1 is a drafted sheet with a roof window and a reveal rail.
  - V2 is a gallery wall with a camera pull-back.
  - V3 is one room through a viewfinder.
- **Composition:** four vertical slices across the full width, the copy in its own paper slice (never on a photograph). On phones they turn into four horizontal bands.
- **WEB-SKILLS tags per element:**
  - **Slices:**
    - S0062: transform only (slices are fixed in size; opening one slides the others, as in How a job runs V3);
    - S0089 (system easing for the slide);
    - S0083 (one open chapter);
    - S1425 (the copy on paper, never on a photograph).
  - **Parallax:** S0062 (one transform per photograph); S1209 (native scroll, no pin).
  - **Chapters:** S1018 (a tablist-like group: arrows, Home and End; Enter follows the link); S1441 (44px).
  - **Title:** S0666 (H1 the entry point); S0451 (masked line rise).
  - **Proof:** S0226 (CTA, phone, 4.8 · 343, licence in the paper slice).
  - **Reduced motion:** S0400 (no slide travel, no parallax; chapters switch at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 shows one drawn window, V2 every project small, and V3 one room in close-up. V4 shows the three kinds of work the firm sells, side by side at full height.
  - **Why it is better.** The first screen answers "what do you build?" with three photographs and gives each one a door to its own page. The headline, the call and the proof keep a slice of their own beside them.

## What was built
**Files:**
- `remodeling/src/sections/hero.html`: V4 added in the existing version system (`.ver[data-v="4"]`, prefix `ht__`, checked free).
- `css/sections/hero.css`: a V4 block appended.
- `js/sections/hero.js`: a `4:` definition.
- V1, V2 and V3 are untouched.

**The paper slice:** the eyebrow, the H1 "Built properly. Permitted correctly." (the same words as V1 to V3, lines rising on load), the lead, Book a consultation, the phone, 4.8 · 343 Google reviews and the licence string, verbatim.

**Three chapters:**
- the firm's own photographs:
  - 01 Kitchens: White Shaker Kitchen Remodel with Waterfall Quartz Island;
  - 02 Bathrooms: Black Marble Primary Bathroom with Freestanding Tub & Glass Wet Room;
  - 03 Whole homes: Modern Farmhouse Whole-Home Renovation.
- **Spines:** each slice has an ink spine down its leading edge (clay when open) with its number and its name set upright. A closed slice shows its spine and a strip of the room, dimmed.
- **The open chapter** shows its room at full colour and a paper caption: the chapter, "Our work: …" with the project's title, and a link to that service's own page (See our kitchens · See our bathrooms · See whole-home renovation).
- **Opening (the How a job runs V3 mechanism):** every slice is the full open width; the slices after the open one slide over (transform only, 0.8s), so nothing is resized and nothing reflows.
- **Ways in:**
  - pointing with a short intent delay, and only on real pointer movement, so slices sliding under a resting pointer never open themselves;
  - tap or click a spine or a slice;
  - the spines are buttons: arrows, Home and End move between chapters.
  - The captions of closed chapters are inert.
- **Depth (Shed's parallax):** each photograph drifts against the pointer and against the scroll at its own rate (1, 0.7, 1.25), one transform each, with no pin.
- **Load beat:** the H1 lines rise, the copy follows, and the three rooms settle in from a slight zoom.

**Phones and tablets (under 900px):** the paper slice on top, then the three chapters as horizontal bands. The spine runs along each band's top edge, and the open band is about 430px tall.

**Reduced motion (S0400):** no slide travel, no parallax, no load beat; chapters switch at once.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Hero V4** | **8** | **8** | **8** | **10** | **8.2** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.6 + 1.0 = 8.2.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **Composition:** a strong vertical rhythm of paper, then three rooms, each with an editorial spine. The copy sits on paper; captions sit on paper cards.<br>**First screen:** the whole hero fills exactly the first screen at 1440 × 900 (832px stage, ending at 900) and at 1024 × 768.<br>**One focal room** at full colour, the others dimmed (S0083). | **Phones:** the hero is about 960 to 990px (the paper slice, then 560px of bands), a little over one screen. **Desktop:** the closed slices show only a strip of their room. |
| **Usability 8** | **Verified at 1440 mouse, 1024, 768 and 390 touch, and reduced motion:**<br>• hover opens Bathrooms;<br>• the arrows move to Whole homes;<br>• Home returns to Kitchens even with the mouse resting over the slices;<br>• tapping a spine opens its chapter on touch;<br>• the three links go to `kitchens.html`, `bathrooms.html` and `renovation.html` (routed inside the single file).<br>**Measures:** all three photographs load; 0 targets under 44px; 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | Two of the three rooms are always folded; a visitor sees one room at a time. |
| **Creativity 8** | A move the hero did not have: the firm's three trades as three interior chapters, each a door to its own page, with the photographs at their own depths. | A sliding triptych is an established pattern; the craft is the transform-only mechanism, the paper/ink spines and the honest captions. |
| **Content 10** | **Copy:** the H1, eyebrow, lead, phone, 4.8 · 343 and licence are V1's, verbatim.<br>**Photographs:** the firm's own, each captioned with its published title.<br>**Links:** the firm's own service pages.<br>Locks **0 fails**; outside links **0**. | |

**Vetoes checked, none tripped:**
- no console errors or warnings (V4 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- no broken images;
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **Slices opened themselves.** When the keyboard moved the chapters, the slice sliding under a resting mouse pointer received a fresh hover and took over (Home landed on Bathrooms). Fixed: only a pointer that really moves opens a chapter; Home now lands on Kitchens with the mouse resting over the slices.
2. **The closed slices were almost all spine** (a 40 to 56px sliver of room). Fixed: spines are 128px on wide stages, 100px on narrower ones.
3. **The load zoom and the parallax drift fought over the same element.** Fixed: the zoom runs on the photograph and the drift on its frame.

## Defects remaining (honest)
- **Phones:** the hero is a little over one screen.
- **One room at a time:** two of the three are folded.
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Shed, primary)
- **Transferred:**
  - interiors as chapters;
  - parallax storytelling (each photograph at its own depth);
  - an editorial chapter index.
- **Not transferred:**
  - Shed's clip-path transitions (the annex marks them unverified);
  - its case-page length;
  - its typography and identity.
- **Other annex entries:** none were used.

## Comparison with the hero's previous versions
| | V1 · the opening (default) | V2 · the wall | V3 · the viewfinder | V4 · the triptych |
|---|---|---|---|---|
| **Composition** | A framed drafted sheet | A salon hang of 26 projects | One room full bleed, a title band below | A paper slice and three tall room slices |
| **What you do** | Open the window | Fly to a photograph | Inspect details by target | Open a chapter, follow it to its page |
| **What it proves** | The drawn identity | Volume | Craft in detail | The three trades, each with its own door |
| **Where it is weaker** | One photograph | Small photographs until flown to | Soft zoom until originals arrive | One room open at a time |

**My call:** V4 is a genuine challenger. It is the most direct answer to "what do you build?", and it routes visitors to the service pages from the first screen. V1 keeps the strongest identity, V2 the volume and V3 the detail. The defaults are not changed; the owner picks.

## Evidence (`qa/new/hero-v4/`)
- `v4-1440-kitchens-sliding-bathrooms-wholehomes.jpg`: Kitchens open; Bathrooms sliding open; Bathrooms open; Whole homes open (by the arrow key).
- `v4-1024.jpg`, `v4-768.jpg`: the narrower layouts.
- `v4-390-states.jpg`: the phone, at rest, Bathrooms open, then Whole homes.
- `v4-1440-reduced-motion.jpg`: reduced motion.
- `v4-single-file.jpg`: V4 picked through the header switch inside the delivered single HTML file at 1440 and 390, with Whole homes open.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
