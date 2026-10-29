# Checkpoint v5-A: framework, plus hero, proof and work (9 versions)

The deliverable is `rembrandt/v5/rembrandt-homepage.html`, a single self-contained file (about 2.1 MB) that opens by double-click.
- Build: `TOOLS=<dir with node_modules: esbuild, gsap 3.13, lenis 1.3.4> node rembrandt/v5/build/build.mjs`.
- Assets: `build/images.py` (owner photos, plus the linework twin of job-charcoal) and `build/fonts.py` (Epilogue subset).

## What exists

**Framework** (`src/js`):
- **Boot and version registry.** Each version mounts inside its own `gsap.matchMedia()`. A swap reverts everything, sorts triggers into page order and refreshes, then starts the new version at its section top.
- **Picker.** Native radios in a fieldset. Keys 1, 2 and 3 switch the section in view, and R replays it. The URL keeps the choice (`?v=hero2,proof3`).
- **Lenis smooth scroll** (S1321 setup).
- **Custom cursor.** It reacts per element type: a caret over text (letters nearby lift), brackets that lock onto links and buttons, a sun disc with a word over photos, a field state over canvases, and the native caret in inputs. Magnetic CTAs use strength 0.18 (S1321).
- **Pointer depth layers** (S1321, S1330) and **scroll parallax** (S0019).
- **Shared WebGL panel and loop helpers** (S0743 contract, S1338 fallback).
- **Spring model** (S0340).
- **Entrance vocabulary** (S1321, S0060).

**Hero:**

| v | Name | Mechanism |
|---|---|---|
| 1 | Daylight | WebGL relight of the yard-sign house; the light follows the damped pointer (S1330 alpha 0.055). |
| 2 | Aperture | Pinned; the Tudor frame opens to full bleed while the two lines part. |
| 3 | Blueprint | S1324 spotlight over a linework render of the real photo, with a "Show the photo" toggle for touch and keyboard. |

**Proof:**

| v | Name | Mechanism |
|---|---|---|
| 1 | Constellation | 295 stars form "4.9", scrubbed. A spring field reacts to the pointer (2.2 Hz, ζ 0.7) with S1377 depth tiers. |
| 2 | Odometer | P4 strip: digits roll and re-roll on hover with a tilt. Background course lines bend away from the pointer. |
| 3 | Zoom-through | Pinned dive through each figure's full stop; the colour floods into the next figure. |

**Work:**

| v | Name | Mechanism |
|---|---|---|
| 1 | Split | Side-by-side diptych (no alignment needed) with a spring divider: 500/30, velocity kept, walls at 15% and 85%. It idles 15↔85 until touched. A range input drives it from the keyboard. |
| 2 | Street | Pinned horizontal run of the six real jobs, with counter-drift photos, a progress line and hover tilt. |
| 3 | Dissolve | Pinned WebGL fbm dissolve of the ba2 pair, from the roofline down, with a sun edge. |

## Self-audit (skills named in PLAN.md; fixes applied in this chunk)

**Copy** (S1303 #10, G5 #6/#7, G6 #2). Every rule is now met:
- Headline: 5 words, 2 lines on desktop.
- One sentence of 11 words.
- Two CTA intents, each with one label everywhere: "Call (937) 746-7377" and "Get an estimate".
- No em or en dashes, middle dots, eyebrows or labels on photos. The build fails on any of these.

**Contrast** (S1303 #5, G9). Worst-region measurement, with the text hidden and the photo pixels under it sampled:
- Hero v1 headline: from 3.9:1 to 5.4:1 at the 98th percentile on desktop, and from 2.7:1 to 5.8:1 on phones, after the scrims and text shadow were strengthened.
- Hero v3: 6.4 to 9.0:1.
- Leads: 4.5:1 or better.

**Motion:**
- Hero has at most 4 beats.
- No `transition: all`, no `scale(0)`, and no ease-in on UI.
- Scrubbed motion is linear.
- Reveals fire once.
- The default combination has 0 pins in these three sections; any combination of them has at most 3.

**Reduced motion** (G9 tiers). Every version is a complete still composition (checked by screenshot): pins collapse to stacked figures, the stars appear formed, the light stays at its designed rest, and the slider still works.

**Phones (390 wide):**
- The picker moved under the nav pill.
- Hero v1 became a photo band with the yard sign in view and the actions on ink.
- The action bar waits until the hero CTA has scrolled away (one filled call per view, S1435).

**Switching (QA script):** every version at 1440, 390 and reduced motion:
- No console errors.
- No horizontal overflow.
- Swapping while inside a section lands on the new version's start.
- Pin spacers match the live pins.
- After a full cycle, the trigger count differs only by one-shot triggers that already fired.

## Bugs found and fixed in this chunk
- The build's string replacement corrupted the inlined GSAP (`$'` patterns). It now uses function replacers.
- `quickTo('scale')` is not resettable (GSAP splits scale), so the heading effect is now one damped loop writing transforms directly (S0183).
- `rise()` spread its overrides into the end state. Overrides now apply to the start state.
- The zoom-through origin drifted because `offsetLeft` was unreliable under transforms. It now uses a percentage origin from rects.
- The flood rendered early because of `immediateRender` on a `fromTo`.
- The picker collapsed inside a zero-height flex rail.
- The nav call duplicated the hero call.

## Open for later chunks
- Family, how, area and call (12 versions) next, with the footer inside call.
- The whole-page audit comes after: the S1303 11-axis stamp, the S0412 review table, a words-per-screen count and axe.
