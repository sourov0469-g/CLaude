# GATE-NEW — Services K, "Run the reel"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 2 (Hero K accepted by Muse).

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Services K, "Run the reel"** (`?services=k`) |
| Primary reference (annex v3, one) | **Scout Motors.** Annex: "heritage timeline, film-roll evidence: the since-2009 story as sequenced proof". No Services version has used Scout yet: A–J used Apple, Cash App, MERSI, Ever (notes), Dropbox, Graza, Cowboy and Lando Norris. |
| Signature creative move | **Film-roll evidence through a gate.** Each trade is a reel: a strip of 35 mm-style frames, each one a documented Austin Pro job photo with its record printed on the film edge (place and month). You run the strip through a fixed lime gate by dragging, scrolling or using the arrow keys. The frame in the gate is projected large above, with its place, month, trades and a link to the job's own page. Changing the trade loads that trade's reel and rewinds the strip to the start. |
| Style family | Cinematic film-roll: a dark film strip with sprocket holes and edge codes under a projected frame, on the white ground |
| Content | The 9 trades with the homepage's own counts (Siding 431, Windows 388, Exterior painting 320, Shingle roofing 210, Gutters 121, Exterior doors 109, Patio covers 34, Metal roofing 31, Garage doors 9). Frames are only the firm's own published job photos (`photos.json`), each on the reel of a trade its record lists, captioned with that record. Photos already in the file (`__JOBS`, `__WINP`, `__SVCP`) are reused by reference; only the photos missing for doors, patio covers, metal, garage doors, gutters and roofing are added, once. No invented figures. Each reel says how many frames it holds next to the documented count, so a reel is never presented as the whole record. |
| How it differs from every existing Services version | A slides whole trades sideways in a pinned stage. B swaps a big word. C counts chapters. D is a split cover with three photos. E picks a part on a house drawing. F is a magazine spread. G is a table. H pulls boards. I draws rings. J is a type index with a pointer photo. None runs a strip of job photos through a gate, none projects the chosen frame, and none shows more than three photos per trade. |
| Why it is better | It is the only Services version where every trade, including the small ones (garage doors, metal roofs, patio covers), is shown on real jobs you can check. The others illustrate or count; K proves each service with the firm's own photographed work. The current best (J, "The index", Lando Norris) shows one photo per trade; K shows 3–5 per trade, with records. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the projected frame); ⟦S1314⟧ one focal point per viewport; ⟦S0220⟧ tabular counts, hairlines, no glow |
| Reel buttons (9 trades) | ⟦S0054⟧ a `group` of toggle buttons with `aria-pressed` and a visible focus ring; ⟦S1427⟧ one treatment for every reel; ⟦S1440⟧ instant pressed state; the count printed on every button |
| Film strip | Native horizontal scroll with `scroll-snap`, so the browser drives it (drag, wheel, touch, keyboard); ⟦S1443⟧ the swipe follows the finger; ⟦S0924⟧ each frame a real button, roving focus with arrow keys |
| Gate | ⟦S1422⟧ the lime bracket implies the window; ⟦S1425⟧ the frame in the gate is figure, the rest dim to 55 % |
| Projected frame | ⟦S1434⟧ the largest element; Scout's frame advance (the new frame slides down through the gate in 320 ms, with a one-frame flicker); ⟦S0083⟧ one motion per change; ⟦S1315⟧ nothing animates at rest |
| Edge codes | ⟦S1500⟧ small caps, wide tracking, tabular frame numbers; facts only (place, month, frame number) |
| Caption and job link | `aria-live="polite"`; the record verbatim from `photos.json`; the link goes to the job's page on austinprosiding.com |
| Rewind on reel change | The strip runs back to frame 1 (smooth scroll), then the new frames fade up; reduced motion: instant |
| CTA | ⟦S1435⟧ one filled Book button; the phone beside it |
| Phone | The projection stacks above the strip; the reel buttons become a horizontal scroller; frames get smaller but stay 44 px+ tap targets |
| Background law | The section stays white; the film strip is the only dark band, inset by the gutter so the hidden world still reveals around it |

---

## Build log

**How to view:** `?services=k` (switcher: Services, **K "Run the reel"**).

**Files:**
- `src/svck.css` and `src/svck.js` (`SvcK.wire`).
- Markup and data: `svcK()` in `build_site.py`.
- `window.__SVCK` holds the reels, the records and the embedded photos.

**Reels.** Every frame is a job whose `photos.json` record lists that trade.

| Reel | Frames |
|---|---|
| Siding (431) | Maple Run · Ashford Park · Block House Creek · Anderson Mill West |
| Windows (388) | River Place · Windermere · Barrington Oaks · Austin |
| Exterior painting (320) | Georgetown · Anderson Mill West · Maple Run · Austin |
| Shingle roofing (210) | Fairview · Lavaca Loop · Pflugerville · Creekview |
| Gutters (121) | Austin · Maple Run · Austin |
| Exterior doors (109) | Milwood · Rivers Edge · Heritage Hills · Bull Creek |
| Patio covers (34) | Round Rock · Tarrytown · Legend Oaks · Maple Run |
| Metal roofing (31) | North Austin · Lakevista · Buttercup Creek |
| Garage doors (9) | East Austin · Legend Oaks · Anderson Mill West |

**Photos:**
- The 8 job photos present at runtime (`window.__JOBS`) are reused by reference.
- The other 23 are embedded once at 680 px (WebP q58), +1.3 MB.

**Desktop layout:**
- A heading, then nine reel buttons, each carrying its count.
- The projected frame (16:10, up to 1000 px wide), with:
  - a "REEL 01 · FRAME 01" slate;
  - the caption (place, then month · trades);
  - "See this job on our site";
  - ‹ › buttons.
- The film: a deep-green strip with sprocket rows, a lime gate and edge codes ("01A FEB 2026 · MAPLE RUN").
- The foot line "431 documented siding jobs · 4 on this reel", then Book and the phone.

**Phones:** the reel buttons scroll sideways; the frames are 150 px wide, and the strip swipes natively.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-services-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- the metal roofing reel with frame 3 in the gate: `-1440-reel`
- the phone projection: `-390-proj`
- contact sheet: `new-services-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| First frame | The projected photo loads; the caption is "Maple Run, Austin · Feb 2026 · Siding & Exterior Painting"; the slate reads REEL 01 · FRAME 01; 4 of 4 frame photos load |
| Next button / → key / End | Frames 02, 03 and 04 in turn: the caption, the slate, `aria-pressed`, roving `tabindex` and the job link all follow. Keys never scroll the page |
| Mouse drag | Dragging the strip 460 px right settles on frame 02 and projects it (snap restored after the drag) |
| Reels | Garage doors: East Austin, 3 frames, "9 documented garage doors jobs · 3 on this reel". Exterior doors: Milwood, 4 frames. Metal roofing: North Austin, 3 frames. The reel line and the counts update with each reel |
| Clicking a frame | Frame 3 on the metal reel shows Buttercup Creek, Cedar Park (Mar 2025, Metal Roofing) |
| Rapid reel changes | Windows then Shingle roofing in quick succession end on Shingle roofing, frame 01 (Fairview), with exactly one projected image |
| Phone swipe | A native strip scroll of 300 px settles on frame 03 |
| Reduced motion | Instant swap: one image, no frame-advance flicker, no rewind animation |
| Existing versions | 166 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `services:k`. Defaults are still hero = 1, services = a, visualiser = b |
| Locks | The counts are the homepage's own (431 / 388 / 320 / 210 / 121 / 109 / 34 / 31 / 9). "5,000" 0, "steel" 0, "Central Texas" 0 |

## Defects found and fixed

1. **Photos referenced that didn't exist at runtime:** the first build pointed at `__SVCP` and `__WINP`, which exist only at build time, so the projected frame was empty. Now only `__JOBS` (present at runtime) is referenced; the rest are embedded once.
2. **White bar across the film:** the frame-count span used `.rf`, a global class (`display:flex` with a light gradient). Renamed to `.rfc`. `.ft` and `.in` were renamed too (`.svft`, `.adv`) to keep clear of global rules.
3. **Stacked projections:** a rapid reel change could leave two projected images stacked, with the stale one on top. A new frame now always replaces the image actually on screen, and older ones are dropped at once.

## Remaining defects, named honestly

- **Weight:** +1.3 MB; the file is now 19.0 MB. Reusing the higher-resolution photos already inside other versions' markup would have saved about 0.6 MB, but it would read another version's DOM, which breaks if that version is moved. I chose the robust route.
- **Sharpness:** the projected frame comes from 640–680 px photos shown up to 1000 px wide, so it is slightly soft on large screens.
- **Small reels:** 3–4 frames per reel. The record has more photographed jobs per trade, but every extra frame costs about 45 KB.
- **Gutters reel:** the photos show houses where gutters were part of the job. The gutters themselves are not the subject of every frame, though the records list gutters on each.
- **Doors label:** records list the trade as "Doors" (the record's own word); the reel button says "Exterior doors" (the homepage's count label).
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | services K | ⟦S1434⟧ the projected frame dominates; ⟦S1314⟧ one focal point; ⟦S0220⟧ tabular counts, hairline-free film, no glow |
| Element | 9 reel buttons | ⟦S0054⟧ `aria-pressed` toggles in a labelled group, with a 3 px focus ring; ⟦S1427⟧ one treatment; ⟦S1440⟧ instant pressed state; the count on every button |
| Element | film strip | Native `overflow-x` + `scroll-snap` (touch and trackpad); mouse drag-to-scroll added (snap paused during the drag); ⟦S1443⟧ follows the finger; ⟦S0924⟧ each frame a real button with roving `tabindex`; ←/→/Home/End with `preventDefault` |
| Element | gate | ⟦S1422⟧ a lime bracket marks the gate; ⟦S1425⟧ frames outside it dim to 50 % and desaturate |
| Element | projected frame | Scout frame advance: a 340 ms slide down with a one-frame flicker; ⟦S0083⟧ one motion per change; ⟦S1315⟧ nothing moves at rest |
| Element | slate and edge codes | ⟦S1500⟧ wide-tracked caps, tabular frame numbers; facts only (place, month, frame) |
| Element | caption and link | `aria-live="polite"`; the record verbatim; the link goes to the job's own page |
| Element | ‹ › buttons | ⟦S0054⟧ "Previous frame" / "Next frame"; ⟦S1441⟧ 48 px |
| Element | Book / phone | ⟦S1435⟧ the only filled button |
| Site | reduced motion | Instant swaps and the same content |
| Site | background law | The section stays white; only the film is a dark band, inset by the gutter |

## Reference transfers and non-transfers (Scout Motors)

**Transferred:**
- the film-roll as evidence: a run of real frames presented as proof;
- the frame advanced through a gate and projected;
- slate and edge-code typography as a record layer;
- cinematic restraint: one projected image, dark film on a light page.

**Not transferred:**
- Scout's vehicle imagery and heritage chronology. The reels are trades, not years; the since-2009 timeline belongs to other sections.
- Its full-bleed video.
- Its wordmark and type. Montserrat and Inter, as locked.

## Comparison with the section's previous best (Services E, "Pick a part of the house", 8.30)

E is a drawing of a house: you pick a part and read its trade, which teaches what each service covers. K shows the services done, nine trades and 31 real frames, each one checkable on the firm's site, including the small trades E cannot illustrate (garage doors, metal roofs, patio covers).
- **E is stronger on:** explanation and weight.
- **K is stronger on:** proof and breadth.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A strong projection-plus-film composition; the film detailing (sprockets, gate, edge codes) is crisp at every width; one dark band only. Minus: the projection is slightly soft from 680 px sources |
| Usability (30) | **8.4** | Five ways to move (scroll, drag, keys, buttons, clicking a frame); reels are one tap; live caption; keys and rapid changes tested |
| Creativity (20) | **8.4** | A mechanic no Services version has (film through a gate, projected); Scout's evidence move rebuilt on the firm's own work |
| Content (10) | **9.0** | 31 documented frames with verbatim records and links; the homepage counts; each reel states how many frames it holds, so it never claims to be the whole record |
| **Weighted** | **8.46** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Visualiser K until Muse accepts.
