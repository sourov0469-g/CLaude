# Visualiser V-A: asset prep report

Scope: prep only. No site file touched, no git, build_site.py not run. Photos are 1400x1050 WebP from siding/work/dl. Descriptions below stay within the photos.json records (place, date, trades) plus what is visible.

## Verdict
**Recommended photo for V-A: #3** (Maple Run, Austin, Jul 2026; record trades: Siding, Exterior Painting & Gutters; `photo3-1400.webp`). Quality **8/10**. Mask: `mask-photo3.json`.
Why: the only candidate that has all four things the section needs. (1) White trim, so "trim stays white" is true. (2) A large, sunlit, high-contrast lap wall (about 277k px, 19% of the frame) whose board lines and shadows survive the recolour. (3) Real shade on the second wall, which shows light and shadow are kept. (4) The red brick base and blue sky stay untouched, which makes the edge quality easy to judge. It was tested on all 17 ColorPlus colours (`preview-photo3-all17.png`) and holds up on every one.

Runner-up: **#36** (Ashford Park, Buda, Jul 2026), 8/10. Cleanest mask because it is flat front-on with no cast shadows, but the trim is dark brown and the sky is grey overcast. "Trim stays white" would not be true to the photo, and the flat light makes the recolour look flat.

| Photo | Result | Score |
|---|---|---|
| #3 Maple Run | Works | 8/10 |
| #36 Ashford Park | Works | 8/10 |
| #5 Anderson Mill West | Marginal, not recommended | 5/10 |
| #38 Anderson Mill West | Not attempted | n/a |
| #33 Georgetown | Rejected, not attempted | n/a |
| charcoal-orig.jpg | Not attempted (see "Could not do") | n/a |

## Per-photo defects (honest)
**#3 (8/10).**
- Windows: about 3-8 px of unrecoloured siding rim remains around some window casings (hole polygons are hand-traced and slightly loose). Worst on the arch window, the first gable window and the lower-left big window.
- Light box (right wall) and electrical box (lower-left) each sit in a small hole that leaves a faint light patch around them.
- Under-porch siding, the left strip of wall behind the posts and furniture (deep shade, clutter), is **not** masked. It keeps its original colour and looks inconsistent next to the recoloured walls, most visibly on dark colours.
- Top of the shaded left wall: the cut follows a hand-traced line along the frieze and soffit. It is smooth, but within about 3 px it is a straight approximation.
- Left walls were shaded in the photo and have a blue-grey cast. The luminance method removes the cast (output is neutral), but the shaded wall renders darker than the sunlit one. That is physically right, but a light colour on the left wall reads as grey, not white.
- Lower-left wall, upper left corner by the porch beam: a small jagged unmasked patch (rule fails on warm bounce light).
- Rake board: clean. Brick: no bleed. Roof, sky, plants: no bleed. Trim stays white.
- Residual halos: none visible at 1:1 beyond the window rims above. Mask is inset 1 px and feathered 1 px.

**#36 (8/10).**
- Faint 1-2 px light outline around the dark window frames and around the corner boards.
- Siding to the right of the right-hand window (above y=775, x 1250-1328) is hidden behind tree branches. It is not masked and keeps its original tan, a visible patch about 70x120 px.
- The strip just under the eave is deep shade. Recoloured but very dark, fine.
- Corner boards are the same tan as the siding, so they are recoloured with the wall. The window trim is dark brown and stays brown, so "trim stays white" does not hold.
- Door, chimney cap and roof untouched. Overcast flat light gives little shadow to preserve.

**#5 (5/10, not recommended).** About 16% of the frame, many windows. Dappled tree shadow on the left half makes the colour rule unreliable: a hard vertical step at x~520 where the shade rule stops, a patch of sunlit siding at the lower centre left unrecoloured, and cream window surrounds (trim or siding, cannot tell) are left cream. The right-hand addition wall is not masked. Usable only with more hand work. Previews kept in the folder for reference.

**#38 (not attempted).** Angled wall in perspective, heavy foliage over the whole left edge, a textured (stone- or brick-look) left return wall, a lawn-side shadow dapple across the wall, and eight windows. Judged worse than #5 without building it, so I skipped it to stay in budget.
**#33 (rejected on inspection).** The visible walls are painted brick. The only non-brick area is a small white gable section with diagonal timber-style trim, partly hidden by a flowering shrub, not lap siding. There is no usable siding wall.

## Files
- `mask-photo3.json` (6.4 KB), `mask-photo36.json` (4.1 KB), `mask-photo5.json` (5.1 KB).
  Format: `{"w":1400,"h":1050,"photo":N,"fill":"evenodd","polys":[[[x,y],...],...]}`. Integer coordinates in the photo's own 1400x1050 pixels. **Fill rule is even-odd**: holes (windows, doors, brick, roof) are separate polygons inside the outer ones. In an SVG use `fill-rule="evenodd"`, in canvas `ctx.fill('evenodd')`. If the page shows the photo at a different size, scale all points by displayWidth/1400.
  Each mask is the hand-traced polygons ANDed with the colour rule, cleaned (close 2 px, inset 1 px, drop specks under 150 px) and re-traced to polygons (Douglas-Peucker, epsilon 0.9 px). Re-rasterised polygons differ from the pixel mask by about 1% of pixels (edge simplification).
- `preview-photoN-<colour>.png` (before left, after right, 1400x525): Arctic White, Khaki Brown, Boothbay Blue, Deep Ocean for #3, #36 and #5.
- `preview-photo3-all17.png`, `preview-photo36-all17.png`: all 17 ColorPlus colours.
- Scripts: `vlib.py` (helpers), `spec3.py`, `spec36.py`, `spec5.py` (hand-traced polygons + colour rules), `build.py N` (mask), `recolour_run.py N [ref]` (JSON + previews). Intermediate `.npy` masks and gridded crops were written to the session scratchpad, not the repo.

## Recolour method (luminance-preserving multiply)
For each masked pixel: `Y = 0.2126 R + 0.7152 G + 0.0722 B` (sRGB values, no linearisation), `ratio = Y / Yref`, shoulder `ratio = 1 + (ratio-1)*0.5` when ratio > 1, `out = target_rgb * ratio` clipped to 0-255. Alpha is the mask box-blurred with a 3x3 kernel (about 1 px feather) and blended over the original.
- `Yref` = 60th percentile of Y inside the mask (#3: 208.6, taken from the sunlit gable wall only, so the shaded wall stays darker; #36: 136.5; #5: 181.8). This means the median sunlit board comes out near the target hex.
- Effects: board gaps, shadows, texture and light direction come from the photo. Original hue/cast is discarded. Brighter-than-reference highlights are compressed so light colours do not clip to flat white.
- Colours: hex values from the CP array in `src/sec/vis9.js`. A web port is about 15 lines of canvas getImageData: multiply by a precomputed per-pixel ratio, or, cheaper, precompute `ratio` once as a greyscale layer and use `mix-blend-mode: multiply` of a flat colour layer clipped by the mask. The CSS route approximates the same result but will not match the highlight shoulder exactly.

## Mask rules per photo (colour thresholds applied inside the hand polygons)
- #3 gable wall: `b-r <= 14`, `r-b <= 30`, `g <= r+6`, `r > 35` (drops sky, brick, glass). Upper-left wall: `-14 <= b-r <= 40`, `g >= r-8`, `r > 35`. Lower-left wall: `-18 <= b-r <= 40`, `r > 35`.
- #36: `r >= g-3`, `g >= b+5`, `Y >= 42` (tan only; drops foliage, sky, fascia). Window holes are auto-snapped to the dark frame by a dark-column/row scan.
- #5: sunlit `r-b >= 18, r>=g>=b, Y>=70` or shaded (x<=520, y>=290) `b-r >= 8, 45<=Y<=140`.

## Could not do / not done
- Did not use `charcoal-orig.jpg` / `charcoal-boards.json`. boards.py makes synthetic board cuts for a different (1900x1425) frame. Its board polygons are fabricated lap divisions, not traced from the photo. They are not needed for a luminance recolour, which keeps the real boards. Not attempted, so no claim is made about it.
- #38 and #33: not masked (reasons above).
- No automatic validation of the mask against ground truth: quality scores are my visual judgement of 1:1 crops, not a measured metric.
- Under-porch wall in #3, branch-covered wall in #36 and right addition wall in #5 are not masked.
- Did not test in a browser. The JSON-to-canvas rasterisation was checked in Python only (even-odd, mismatch about 1%).

## Risks for the build
1. #3's under-porch wall and a few window rims remain original colour. On dark colours this is visible, so the section needs the 1x pre-render of the mask clipped at display size, and a final visual check at 390 px and desktop widths.
2. The label says "real job" and the photo is real. Any colour on the left shaded wall is darker than a naive viewer expects. The only on-page caption allowed is the stated one, so do not add shade explanations.
3. Brick base stays red in every colour; Countrylane Red and Khaki Brown sit close to the brick and look busy. Not a mask defect, a photo constraint.
