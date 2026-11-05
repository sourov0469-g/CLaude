# Section backgrounds (prep, not wired into the site)

Seven art sets, each a far and a near SVG layer (viewBox 1440x900, `preserveAspectRatio="xMidYMid slice"`), drawn line art only: no text, photos, filters, scripts, external references or `<style>` blocks. Gradients and `<pattern>` fills are the heaviest features used. Each `<section>-note.md` has the 3-line motion/CSS/size note.

| Section | Far | Far bytes | Near | Near bytes | Section total | Ground |
|---|---|---|---|---|---|---|
| Services | `services-far.svg` | 1047 | `services-near.svg` | 2654 | 3701 | #FFFFFF |
| Visualiser | `visualiser-far.svg` | 1373 | `visualiser-near.svg` | 2282 | 3655 | #F6F8F6 |
| Windows | `windows-far.svg` | 1234 | `windows-near.svg` | 2968 | 4202 | #0E3B2C |
| Reviews | `reviews-far.svg` | 1807 | `reviews-near.svg` | 2272 | 4079 | #FFFFFF |
| Process | `process-far.svg` | 1236 | `process-near.svg` | 1984 | 3220 | #F6F8F6 |
| Area | `area-far.svg` | 3973 | `area-near.svg` | 2400 | 6373 | #FFFFFF |
| Try the job | `try-far.svg` | 1109 | `try-near.svg` | 3120 | 4229 | #F6F8F6 |

Limits: 4096 B per layer, 8192 B per section. All layers pass (largest layer: area-far, 3973 B).

Use each SVG as an `<img>` or CSS `background-image` (not inlined twice in one document: gradient/pattern/symbol ids repeat across files). Each layer is overscanned by `inset:-14% 0` in the notes so the parallax shift never exposes an edge.

`backgrounds.jpg` is the contact sheet: every section on its real ground with far + near unshifted and a mock text block on top.

## Rules held
- Ink strokes: deep green `#0E3B2C` (light sections) or `#E4EAE5` (Windows) at stroke-opacity <= .35 (most .08 to .25); lime `#B5DB6E` fills <= .18 (strokes <= .3); checked by script on every file.
- Visualiser swatch chips use opaque pre-mixed light tints (equivalent to <= .18 of green or lime on `#F6F8F6`) so overlapping chips never stack darker.
- Windows is the only deep-green band; everything else sits on `#FFFFFF` or `#F6F8F6`.
- Hill Country contours, skyline and roads are invented abstract shapes, not real maps or buildings.

## Contrast check (rendered with Chromium, both layers on the real ground, 1440x900)
Mock text: ink `#14231C` / muted `#55645C` on light grounds, `#FFFFFF` / `#C9D6CF` on the green. Worst single pixel of the art versus the primary text colour, and worst 9 px local average versus the muted colour:

| Section | Primary text, worst pixel | Muted text, worst 9 px average |
|---|---|---|
| services | 7.99:1 | 4.79:1 (share of area below 4.5: 0.00%) |
| visualiser | 6.86:1 | 3.82:1 (share of area below 4.5: 0.08%) |
| windows | 4.72:1 | 4.64:1 (share of area below 4.5: 0.00%) |
| reviews | 8.35:1 | 4.66:1 (share of area below 4.5: 0.00%) |
| process | 6.02:1 | 4.11:1 (share of area below 4.5: 0.02%) |
| area | 5.65:1 | 4.27:1 (share of area below 4.5: 0.00%) |
| try | 5.2:1 | 4.29:1 (share of area below 4.5: 0.04%) |

Primary text clears WCAG AA (4.5:1) on every pixel of every section. Muted secondary text clears it almost everywhere; the few spots that dip to about 3.8 to 4.4 are thin line crossings (under 0.1% of the area, e.g. the Visualiser chip-fan pivot, Process steps meeting the route). Keep muted copy away from those, or place it on a card. Real brand text colours were not available to the script; re-run if the ink or muted tokens differ from the two above.

Not verified: real-browser parallax motion and scroll timing, and the artwork behind the site's real copy and cards (layout not built yet); Safari and Firefox rendering (only Chromium was run).
