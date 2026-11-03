# GATE, hero round 2: five versions (Muse's HERO INSTRUCTION, 2026-11-03)

**Process:** every step ran in this session's own thread. No sub-agents, no background tasks.

**Files:** `siding/redo/site/out/hero-1.html` … `hero-5.html`. Each is one self-contained file: fonts, photos, field and engine embedded, and the video embedded in H.264 + VP9.

**Screenshots:** `siding/redo/site/gate/`.
- `heroes-1-2-rest-and-hover.jpg`: versions 1 and 2, **at rest and mid-hover**.
- `heroes-3-4-5.jpg`.
- `heroes-390.jpg`: all five at 390.
- Every frame individually: `heroN-1440-rest/hover.jpg`, `heroN-390-rest/hover.jpg`.

## 0. What changed from the finalize message and the hero instruction

**The background is the site.** `field.js` is Immersive Garden's mechanism (`immersive-g.com`, studied at code level in the Stage 1 dossier) rebuilt with Austin's shapes. **The white-stripe wall is removed.**

| Immersive Garden part | Austin version |
|---|---|
| Baked relief bakes (`tBake1/2` on plaster) | Clusters of lapped courses, Dutch lap, a cedar-shake fan, board-and-batten, and a corner post with laps butting into it |
| Noise-driven reveal mask | The relief rises and recomposes at rest |
| Flowmap (`mouseEase .4`, `dissipation .953`, `falloff .38`) | The cursor raises relief along its path and bends the plaster like water, with a faint steel tint at the wave's edge |
| Scroll-speed extrude | Kept |
| **Splash** | **A click drops a ring wave** |

The field sits behind every version and goes quiet over copy and controls (`data-solid`). It is WebGL1 with no library, DPR ≤ 1.5, about 20 fps when idle, and it stops on hidden tabs; under reduced motion it renders one still frame.

**No big 3D.** The 3D is only felt:
- buttons are lifted boards (a 4 px cast edge; hover rises and slides out a cream tab with a calendar; press sinks 3 px);
- the header dropdown is a fanned sample book of real siding finishes;
- the mobile bar is cut as board ends;
- the interactive photo's boards lift with a real shadow.

**The firm's own hero film** (`/videos/hero-test.*` on austinprosiding.com, 20 s, AV1) is re-encoded to H.264 1280 px (2.2 MB) and VP9 (2.0 MB), and used **in the hero itself** (versions 3–5).

## 1. The five versions

| # | Base | Composition (reference sheets) | Interaction |
|---|---|---|---|
| **1** | **hero-base-charcoal**: the firm's original at 1900 × 1425 (Maple Run, Austin), higher-res than the supplied 1400 px, same shot | A large rounded photo stage on the field; nav as a floating board (nav sheet H3); copy in a paper card at lower right, over the garage, leaving the charcoal siding free; credential chips at lower left | Hover lifts the **photo's own lap boards** (55 cut along both walls' perspective) near the cursor, showing grey house wrap and nail line; they settle on an under-damped spring. **At rest and after leaving, the canvas is the untouched photograph** (measured lift 0). Tap: the boards under the finger lift and return. |
| **2** | **hero-base-white-lap**: the firm's original at 1365 × 1085, same shot | Split: copy on the live field (left); the photo framed landscape (right) with one rounded corner; a "177 before-and-after pairs published" plate; patio clutter cropped out | The same mechanism; 137 boards across both storeys, windows left whole |
| **3** | The firm's film | Full bleed; copy lower left on a scrim; play/pause control | Video, pause (WCAG 2.2.2); the field shows beyond the hero |
| **4** | Field + film | Copy on the live field (left); the film in a framed window with a transom rail and sill (windows sheet language) | Video in the window, pause; the field reacts all around |
| **5** | Field + film | The field fills the page; the headline is set huge; the film runs as a wide strip with a rounded leading end; actions in one row below | The field is the hero; the strip pauses |

**Copy, all versions (37 words, budget 40):**
- "The full wall or the whole house." (the firm's published rule);
- "Siding, windows and roofing for Austin homes since 2009. One free inspection covers every trade on the house.";
- **Book a free inspection**, which goes to the firm's live booking page;
- (512) 550-0000;
- 4.9 from 474 Google reviews.

**Version 1 adds:** GAF Master Elite · James Hardie Elite Preferred. **Version 2 adds:** 177 pairs. All are locked facts.

## 2. Self-audit (1440 and 390, real browser, frame by frame)

**Measured:**
- **JS errors:** 0 in all five.
- **Horizontal scroll:** none (`scrollWidth` = viewport).
- **Reduced motion:** all five render a still state. Photos at lift 0; video paused with a Play control; field static.
- **Header:** the sample-book dropdown opens on all five.
- **Interactive photos:**

  | Version | Hover lift, 1440 | Hover lift, 390 | After leaving |
  |---|---|---|---|
  | V1 | 291 | 900 | 0 |
  | V2 | 540 | 2,419 | 0 |

  After leaving, the canvas is the pure photo: **nothing floats at rest.**

**Defects found and fixed this round:**

| # | Defect | Fix |
|---|---|---|
| 1 | Field drew nothing: the cream `html` / `body` background covered the canvas at z −1 | Body made transparent, ground set on `html` |
| 2 | First field clusters read as scattered sticks, not siding | Redrawn as real arrangements: lapped courses, shake fan, board-and-batten, corner post with laps |
| 3 | V1 hover barely moved the boards (forces about 30× too weak for the springs; lift 17) | Forces rescaled; lift 291 |
| 4 | Lifted boards blended into their neighbours | Cast shadow, lit top arris, 22% lift scale, a cooler house-wrap grey |
| 5 | V1's copy card covered the siding wall | Card moved right, over the garage; photo framed on the gable |
| 6 | V1 at 390: the card was clipped inside the photo frame | The photo becomes the top band; the card overlaps it below |
| 7 | V2's tall frame showed a narrow slice plus branches | Landscape frame; patio clutter cropped |
| 8 | V3: white headline on the white house | Stronger scrim; a bottom-up scrim on phones |
| 9 | V4: a vertical mullion cut the house in half | Replaced by a transom rail |
| 10 | Charcoal right-wall cut spilled onto the lower roof | Polygon re-measured to the wall alone |

## 3. Must flag (honesty)

1. **The "white lap" image is the BEFORE photo.** Its original (`f06a748c…-1365x1085.jpg`) is the **before** half of the firm's Maple Run siding pair; the after photo of the same house is beige lap. I used the shot Muse chose (instruction: same shot only) at its original resolution, and removed my own "finished job" wording from its alt text. **If the owner wants a completed elevation, version 2 should use the after photo of the same pair** (same house, same angle, 1771 × 1425). Waiting for Muse's word.
2. **The film** is the firm's own live hero video. FACTS.md noted in October that it "cannot be verified as an Austin Pro job" and may be a generated or brand film. **It is used as ordered; Muse should confirm it is acceptable** under the no-AI-photography rule.
3. Animation smoothness on real hardware is untested; this container renders WebGL in software.
4. The cursor companion is not in this round (the hero's interactions carry it); it returns with the nav polish.

## 4. WEB-SKILLS tags

| Tag | Applied |
|---|---|
| ⟦S0001⟧ | The hero opens with the subject's most characteristic thing: a real finished wall that comes apart into its boards. One memorable element per version. No eyebrows, no all-caps labels, no "→" |
| ⟦S1323⟧ | Field flow painted from frame-normalised pointer velocity (Immersive Garden's `min(32,dt)/16`); no time-based emission |
| ⟦S0056⟧ | Canvas loops stop when settled or hidden; DOM motion is transform and opacity only; no scroll-driven layout |
| ⟦S0089⟧ | Board motion is springs (under-damped 0.62, so a board slaps and settles); button press is asymmetric (100 ms in) |
| ⟦S0063⟧ | Dropdown 0.18–0.22 s strong ease-out from its trigger; hover 0.16–0.18 s; no ease-in on UI |
| ⟦S0650⟧ | Headline 3 lines or fewer, support 19 words, CTA visible without scroll at 1440; single column below 860 px |
| ⟦S0220⟧ | One primary CTA per hero; no vanity stats (only locked facts); no gradient blobs or glass |
| ⟦S0049⟧ | Video pause control with `aria-pressed`; canvases `role="img"` with factual labels; real links; focus rings |
| ⟦S1501⟧ | One emphasis zone: the headline; the photo is the image; the CTA is the single filled control |
| ⟦S1320⟧ | Static first frame complete without motion; one interactive canvas per hero |

## 5. Scorecard

Design 40 / Usability 30 / Creativity 20 / Content 10. PASS requires a weighted score of at least 7.0, no category under 6.0, and zero vetoes.

| # | Design | Usability | Creativity | Content | Weighted | Note |
|---|---|---|---|---|---|---|
| 1 | 8.0 | 8.2 | 8.4 | 8.6 | **8.18** | The real charcoal job, its own boards coming apart; the best realisation of the approved idea |
| 2 | 7.3 | 8.0 | 8.0 | 7.0 | **7.62** | Content is held down by the before-photo issue (§3.1) |
| 3 | 7.4 | 8.2 | 6.6 | 7.6 | **7.54** | Strong and simple, but the most conventional composition |
| 4 | 7.6 | 8.0 | 7.6 | 7.6 | **7.70** | The field is visible and the window frame ties to the windows sheet |
| 5 | 7.8 | 7.8 | 7.8 | 7.6 | **7.78** | The field is the hero, as ordered; bold type; the strip is distinctive |

**Vetoes:** none.
- No invented facts.
- No placeholders.
- Contrast: ink on cream 14.8:1; white on the V3 scrim 7:1 or more; white on steel 6.0:1.
- No broken layout at 390.
- No JS errors.
- CTAs go to the firm's live booking page.

**My recommendation:** **version 1** as the hero, with version 5's field-led layout as the pattern for the white-ground sections that follow.

## 6. Stop

Waiting for Muse's judgment of this gate. Nothing past the hero will be built until then.
