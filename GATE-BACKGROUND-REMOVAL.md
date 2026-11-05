# GATE — BACKGROUND REMOVAL

**Under:** AUSTIN-BACKGROUND-REMOVAL-2026-11-05 (owner order, via Muse) and AUSTIN-CONSULT-FIRST-2026-11-05. **Built to the plan Muse agreed** in GATE-NEW-Reviews-N.md (NEXT PLAN), including "delete the background files from the repo too". Nothing beyond that plan was changed.

## Result in one line

**37,774,940 → 22,487,188 bytes (−15,287,752, −40.5%).**
- **Opened directly:** ready in 0.84 s instead of 3.3 s, with main-thread blocking cut from about 9 s to 0.3 s.
- **On a 10 Mbps line:** fully loaded in 19 s instead of 32 s.
- **Versions:** every one is byte-identical apart from the removed markers.

## What was removed

**From the built file:**

| System | Was | Now |
|---|---|---|
| IG-exact comparison world (`bgw-ig`: their plaster, noises, geometry, textures) | 11,863,018 bytes | gone |
| B2 Street of Roofs, the default (`bgw-b2`) | 1,162,594 | gone |
| B1 Relief Terrain (`bgw-b1`) | 679,518 | gone |
| B3 Material Field (`bgw-b3`) | 551,506 | gone |
| V1 hidden world (three baked panels + `world.js`) and the `?bg=` chooser script | 572,613 | gone |
| Engine: Three.js r150 + the copied flowmap / reveal shaders and the cursor-reveal mechanism | 454,877 | gone |
| The review switcher's "Background" row (`fx.js`) | | gone |
| The fixed canvas rule `.world` (`fx.css`) | | gone; `html, body` are now explicitly `#FFFFFF` |
| `data-solid` markers (the sections' hooks into the reveal) | 267 in the file | 0. Heroes 1 and 2 used them for their own photo effect, so those 4 markers became a local `data-ui` and `photo-hero.js` reads that |

**From the build (`build_site.py`):**
- `bg2_html()`, `bg_panels()`, `BG2_DEFAULT`, `BG2_LIST`, the selector script and its call.
- 21 `data-solid` markers in the build's own markup; 110 more in the section modules (homepage and subpages).

**From the repository** (150 files deleted with `git rm`; git history keeps them):

| Path | What it was |
|---|---|
| `siding/redo/site/src/bg2/` | `engine.js` and `engine.bundle.js` (Three.js r150 + flowmap) |
| `siding/redo/site/src/world.js`, `world-pictograms-retired.js` | the V1 hidden world and its retired predecessor |
| `siding/redo/site/media/bg2/` | B1, B2, B3 panel textures and `world.json` files |
| `siding/redo/site/media/igx/` | IG-exact geometry and textures |
| `siding/redo/site/media/bg/` | V1 baked relief panels |
| `siding/redo/site/bg/` | the offline baking tools (`relief.py`, `relief2.py`, `build_engine.sh`) |
| `siding/bgstudy-v2/` | the copied third-party background code |

**Kept on purpose:**
- **The cursor companion** (`nav.js`) never touched the background; it is unchanged and still runs (see proof).
- **`src/field.js`** is used only by the older `build.py`, which does not produce `site.html`; it is not in the built file.
- **Study and gate documents** (BACKGROUND-CODE-STUDY.md, GATE-BACKGROUND-*.md) stay as history.
- **Unrelated look-alike names:** `.wnB .world` (Windows B's own 3D bay) and `.sd1C .bg2` (a subpage photo class) are not background.

## Proof

**No trace left in the built file:**

| Searched for | Before | After |
|---|---|---|
| `bgw-` | 5 | 0 |
| `__BGSEL` / `__BGLIST` / `window.__BG=` | 3 / 3 / 1 | 0 / 0 / 0 |
| `flowmap` / `Flowmap` | 9 / 5 | 0 / 0 |
| `THREE` / `WebGLRenderer` | 138 / 38 | 0 / 0 |
| `world world2` (the canvas) / `THE HIDDEN WORLD` / `Immersive Garden` | 1 / 1 / 1 | 0 / 0 / 0 |
| `data-solid` | 267 | 0 |

`BG2` and `r150` still match 60 and 5 times, but only as chance letters inside base64 image data: outside base64 both are 0.

**Every version unchanged:**
- All 197 templates (homepage version slots and subpage templates), with `data-solid` stripped from the old file, are byte-identical to the new file.
- The only exception is the hero template that now carries `data-ui`, and it matches exactly once that one swap is undone.
- The page body outside templates, styles and scripts matches the same way.
- `LIVE` is untouched.

**Every view renders:**

| Views | Result |
|---|---|
| All 126 homepage version views (every section, every version, via the switcher's own URLs) | 0 page errors, 0 overflow |
| All 128 subpage views (every page, and every subpage section version on its page) | 0 page errors, 0 overflow |
| The review switcher (`?review`) | Renders Page, Header links and every section row; no Background row (`bg-removal-switcher-1440.png`) |
| Ground | `html` and `body` computed `rgb(255, 255, 255)` at 1440 and 390; 0 world canvases; 0 fixed canvases |
| Cursor companion | Present on a fine pointer at 1440; absent on touch at 390 (as designed) |
| Heroes 1 and 2 | Hero 1 carries its 3 `data-ui` markers; its photo effect reads them; 0 errors |

**Screenshots** (in `siding/redo/site/gate/`): `bg-removal-home-1440.png`, `bg-removal-mid-1440.png`, `bg-removal-home-390.png`, `bg-removal-mid-390.png` (sheet: `bg-removal-sheet.jpg`), `bg-removal-switcher-1440.png`.

## Load check (honest)

**How it was measured:**
- Headless Chromium, 1440 × 900, the default page as the owner opens it. Before, that page started the default B2 world.
- **Opened directly (`file://`):** median of 3 runs.
- **Over HTTP:** a server inside the test script (no background process), with network throttled through Chrome DevTools (20 ms latency).
- Each run waits 6 s after `load`, so anything started after load is counted.

| Measure | Before (37.8 MB) | After (22.5 MB) |
|---|---|---|
| **Opened directly:** DOM ready | 1,411 ms | 793 ms |
| **Opened directly:** fully loaded | 3,277 ms | **842 ms** |
| **Opened directly:** first contentful paint | 928 ms | 168 ms |
| **Opened directly:** main-thread long tasks (time blocked) | 9,053 ms (23 tasks) | **328 ms** (2 tasks) |
| **Opened directly:** JS heap | 8.2 MB | 5.7 MB |
| **50 Mbps:** fully loaded | 7,618 ms | 4,414 ms |
| **50 Mbps:** long tasks | 7,091 ms | 335 ms |
| **10 Mbps:** fully loaded | 32,148 ms | **19,201 ms** |
| **10 Mbps:** first contentful paint | 824 ms | 808 ms |

**What this means:**
- **Start-up block gone:** the minute-long, blocked feel came mostly from the background starting up: 7–9 s of main-thread work in this test, on top of download. That is now about 0.3 s, so the page opens and responds at once.
- **Still not small:** 22.5 MB remains, and about 20.35 MB of it is 190 embedded photos.
  - On a fast line it is ready in a few seconds.
  - On a 10 Mbps line it still takes about 19 s to finish arriving (the first paint comes in under a second).
- **Headless caveat:** headless Chromium renders WebGL in software, so the before-blocking figure is higher here than on a machine with a GPU. The direction and the byte saving are exact.

**Proposal (not done; for Muse):** a photo weight pass would take the file much lower. That means re-encoding the embedded photos to the size each version actually displays, and sharing images that several versions embed separately. It would be its own gated step, if wanted.

## Remaining, named honestly

- **The file is still 22.5 MB** (photos). See the proposal above.
- **`?bg=…` in old links** is now a harmless no-op.
- **Testing:** Chromium only.

**Vetoes: none.**
- Locks unchanged.
- No version altered beyond the agreed marker removal (proved per template).
- White ground; no replacement global effect.

---

## NEXT PLAN — Process N, for Muse's consult

Under AUSTIN-CONSULT-FIRST-2026-11-05 and the removal order's new tactic: the life of the page moves into each section's own creative unit. Nothing below has been built.

### AUDIT — the Process section as it stands (13 versions)

**Evidence:** every version captured at 1440 and 390 with measurements. All 13 render with 0 errors and 0 overflow (`gate/process-audit-a-g-1440.jpg`, `gate/process-audit-h-m-1440.jpg`).

| Version | What it is | Height at 1440 | Interaction | Note |
|---|---|---|---|---|
| A Stacked chapters | four full-view chapters, clipboard checklist, review quotes | 4.1 screens | 9 controls | long; the most complete text |
| B Pinned wall | a pinned wall that changes per step | 4.2 screens | scroll | the only one that shows the work physically, but slow (4 screens) |
| C The plumb line | a line with the house-and-magnifier icon | 3.0 screens | none | generic icon; no interaction |
| D Four columns | an expanding column per step | 1.0 | 4 | same icon |
| E Turn the dial | a dial with the same icon | 0.9 | 5 | same icon |
| F Questions at each step | FAQ accordions per step | 0.8 | accordions | text only |
| G Stamp the card | a job card you stamp | 0.7 | 4 | playful but thin content |
| H One paragraph | the job in one paragraph, same icon | 0.9 | 4 | text plus icon |
| I Your part, and ours | two columns, you and us | 1.1 | 3 | clear; static |
| J Four numbers | one big figure per step | 1.3 | 4 | strong numbers; no picture of the work |
| K Handed along | named people at each step | 1.2 | 6 | warm; text |
| **L One job, on its calendar** (best, 8.62) | job APS-4867 on a true-scale calendar with photos | 1.1 | 5 | the only real evidence (dates and photos) |
| M Your job, in order | step cards re-flow by job type | 1.1 | 3 | thorough; a wall of text |

**What the section does well:** the four steps are told accurately and verbatim everywhere. L proves one real job; J and K make figures and people memorable; M personalises the order.

**What it does badly:**
- Ten of the 13 carry the process mostly as text cards.
- The same house-and-magnifier icon appears in four (C, D, E, H).
- Only B shows the physical work, and it takes 4.2 screens of scroll to do it.
- No version lets a homeowner *see*, quickly and playfully, the moments they actually can't picture:
  - someone walking round their house;
  - what the proposal holds;
  - what install day does to the wall;
  - how the job ends.
- With the global background gone, Process has no small, lively unit of its own.

**The problem N must solve:** make each of the four published steps visible as a small animated scene the visitor can play. The page's life lives inside the section, in under one screen and under 40 KB, without repeating B's long pinned scroll or the shared icon.

### RESEARCH — reference, mechanism, transfers

- **Governing reference (annex v3): Graza**, scoped in the annex to the custom-animation quality bar. That scope is exactly the owner's new tactic: bespoke, characterful animation inside a unit, playful rather than heavy. Graza was used for Process C and E, which is why the plan names it openly.
- **The alternative I considered and do not recommend: MERSI.** It is the only annex reference unused for Process, and its annex line ("central label cycling the process in sync") fits. But MERSI's seam is already on five sections (Hero K, Windows L, Reviews M, Try M, Visualiser N), and a sixth works against the pairing rule. **Muse to choose if you prefer it.**
- **Mechanism that transfers:**
  - small hand-made animations with timing and personality (anticipation, overshoot, staggered settle);
  - one idea per frame;
  - motion that explains rather than decorates;
  - playable on demand and calm at rest.
- **What does not transfer:** Graza's product, olive-oil imagery, colours, typefaces or copy. Nothing global; no WebGL; small depth cues only (a lifted card, a peeling board), never a 3D scene.
- **WEB-SKILLS:**
  - ⟦S1434⟧ one dominant unit;
  - ⟦S1436⟧ purposeful motion (transform and opacity, timed to the meaning);
  - ⟦S0054⟧ tabs and controls, ⟦S1441⟧ 48 px, ⟦S1443⟧ a non-gesture route;
  - ⟦S1440⟧ polite announcements;
  - ⟦S0400⟧ reduced motion shows end states;
  - ⟦S0220⟧ published words only;
  - ⟦S1435⟧ the one filled CTA.

### THE PLAN — Process N, "Watch it happen" (working name)

One stage, four tabs (Free inspection · Detailed proposal · Expert install · Final check). Each tab plays a small, hand-made SVG scene that pictures that step's published sentence literally. Beside it sits the sentence itself (verbatim), the step's figures and one verbatim review line.

| Element | What will be built | Content source (verbatim) |
|---|---|---|
| **Step tabs** | ⟦S0054⟧ a `tablist` of four, arrow keys, 48 px. The scene plays once when the section first comes into view, then only on demand (tab, replay button); no autoplay loop | the four step names |
| **Scene 1, Free inspection** | A plan view of a house from above. A project manager marker walks the dashed path round all four sides; as it passes, five tags pop in turn: Siding, Trim, Windows, Roof, Gutters. It ends on "One visit covers every trade." Tap the house to replay | "A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade." |
| **Scene 2, Detailed proposal** | A proposal sheet feeds out of a slot and its lines print one by one: only the trades that the inspection tagged, each "itemised", with no invented prices. The sheet lifts slightly (one small depth cue). Caption: the published median band, as a lock | "An itemised price for the work you want, nothing else." · "$10k–$15k median band (415 priced)" |
| **Scene 3, Expert install** | A wall elevation with a scrubber the visitor drags (or keys ← →): the old boards peel off and drop, house wrap goes on, new lap boards rise course by course from the bottom, trim frames the window, and one roller pass paints it. The scrub *is* the install, in its published order | "Old material off, new boards up, then trim and paint." · "A siding replacement typically takes 1 to 2 weeks, including the painting process." |
| **Scene 4, Final check** | A punch-list clipboard: three lines tick in turn, a broom sweeps the deck in two strokes, then the warranty card stamps down | "We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start." · "30-year James Hardie non-prorated warranty" · "lifetime workmanship warranty on labor" · review: "swept the pollen off my deck!" (Katie Littleton, Google review) |
| **Text column** | The step sentence, its figures (One visit; Mon–Fri 8–8, Sat 8–6, Sun 12–5; 1 to 2 weeks; 30-year) and the review line, all build-locked | as above |
| **CTA** | ⟦S1435⟧ the one filled "Book a free inspection", plus the phone (512) 550-0000 | locks |
| **Live line** | ⟦S1440⟧ "Step 3 of 4: Expert install", on manual changes only | |
| **Phone** | The scene above the text; tabs as a four-part segmented control; the scrubber full width with `touch-action: pan-y` | |
| **Reduced motion** | Each scene shows its finished state; the scrubber still works and moves frame by frame without tweening | |
| **Weight** | All SVG and CSS, no images; target under 40 KB added | |

**Why it should beat the current best (L, "One job, on its calendar", 8.62):**
- L proves that one real job ran to a calendar.
- N shows *any* homeowner what each step will physically look like at their house, which is the four unknowns that make people hesitate. It answers them in the firm's own sentences, with a unit they can play in under one screen.
- It is also the first Process version built to the owner's new tactic: the section carries its own life.
- **What N will not have that L has:** real photographs. The scenes are drawn, and the gate will say so.

**Risks I will check while building, and stop to report if they bite:**
- Scene 3 must not read as a configurator (nothing is chosen: the scrub only moves through time).
- Scene 3 must stay distinct from Process B's pinned wall: one scrubbed unit, not a 4-screen scroll.
- The drawn manager marker must stay a neutral marker, not a person presented as staff.
