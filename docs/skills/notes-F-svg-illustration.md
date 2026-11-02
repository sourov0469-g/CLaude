# Skill digest F: SVG, illustration, icons, logo (read in full, my own thread)

Skills: S1463, S0424, S1421, S0357, S0425, S0086, S0362, S0407, S0361, S0414, S0468.

## Illustration law for this build (synthesis)
1. **One illustration language for the whole site** (S1421). Elbaz's language is a **construction line drawing**:
   - **Geometry:** geometric and structured (built objects), rounded joins, a single ink stroke with a weight hierarchy:
     - silhouette 1.6px;
     - interior 1px;
     - dimension and guide lines 0.6 to 0.7px (S0361 conventions).
   - **Dimensionality:** 2D elevation and plan views, plus a 2.5D axonometric only where the story explodes a layer stack (the bath build and the room chapters). The exploded axonometric is `matrix(.94s,.17s,-.34s,.47s,tx,ty-z)`.
   - **Colour:**
     - ink is `--color-text` (near-black warm);
     - part fills are light clay or sand tints;
     - ONE accent stroke, terracotta, marks the active part.
     - No gradients behind copy.
   - **Detail:** every detail must explain shape, construction or assembly (S0414). Arbitrary texture is banned.
2. **Draw, don't fade** (S0362/S0407).
   - Solid strokes draw on with `pathLength=1` and dashoffset 1 to 0, eased in-out.
   - Fills fade in only after their stroke, starting about 55% into the stroke window. Otherwise a fill flashes over the drawing.
   - Dashed or dotted lines and text fade, because the dash trick cannot draw them.
   - One thing leads at a time, and the eye follows the pen. Dimension lines come after the geometry they measure; labels come after their leaders.
   - No bounce or overshoot on drawing.
3. **Camera over one sheet** (S0362).
   - A single SVG drawn once, with a `.cam` group transformed by `translate(cx - x·z, cy - y·z) scale(z)`.
   - Zoom is interpolated in log space: `exp(lerp(log z0, log z1, p))`.
   - Transfer to the build journey: one continuous construction sheet with camera keys per beat. This is the Immersive Garden camera-scrub mechanism, executed in SVG.
   - Keep `vector-effect: non-scaling-stroke` (or set `--u = 1/sqrt(det)`) so stroke widths survive the zoom.
4. **Blueprint scan reveal** (S0468), used for the Before/After transformation and the renovation x-ray:
   - A scan line sweeps across. Above it the subject is a blueprint; below it, the real photo.
   - A swap happens only while the region is fully covered. Never fade real UI out in view.
   - No value goes from 0 to 1 in under about 0.3s unless it is hidden.
   - Groups of moving wires are staggered 0.08 to 0.12s apart.
   - Labels sit in empty bands and never on a row or card. Mono labels are 11 to 12px with `.06em` tracking, and in this build they use Roboto caps instead of mono, per the font lock.
5. **Icons** (S1463 plus the brief's Carbon numbers):
   - 24 grid with a 21 live area and 1.5 stroke; 16 grid with a 14 live area and 1 stroke.
   - `currentColor`, round caps.
   - Naming is `icon-[category]-[name]`.
   - Each icon is `aria-hidden` and paired with text on critical actions.
   - Targets are at least 44px.
6. **Morphing icons** (S0086):
   - Icons that morph share a three-line structure, with any unused lines collapsed to the centre.
   - Rotation-group variants (arrow directions, plus-to-cross) spring-rotate. Non-grouped icons jump.
   - Round linecap.
   - Ease `cubic-bezier(.19,1,.22,1)` over 0.4s. Reduced motion gives a duration of 0.
   - **Applies to:** nav menu/close, BA arrows, the accordion plus/cross and the play/pause of the process scrub.
7. **Character (the companion)** (S0357).
   - **Identity lock:** the same proportions, outline weight, hard hat and palette in every pose.
   - Stage readable key poses and silhouettes at display size (about 40 to 56px) before adding in-betweens.
   - Use anticipation, arcs and follow-through where they clarify the action. Secondary motion stays subordinate to it.
   - Two gates:
     - **structural:** the anchors, pivots and hat attachment are correct in every pose;
     - **perceptual:** the motion is checked at actual timing and actual size.
   - Report measured facts separately from visual judgements.
   - Register every pose at one shared scale; never fit each pose independently.
   - **This governs the hat-on-face fix:** the hat is part of the head group, pivots with it, and is anchored at the brow.
8. **Pointer-responsive line figure** (S0425/S0424) for the logo and hero objects:
   - one figure, one idea;
   - test the pointer against the rest or target pose, not the live pose;
   - the rest pose is the thumbnail, so compose it;
   - no labels on the drawing (say it with geometry);
   - springs, not timers;
   - a tour of three stops plus a leave.
   - **The logo story is told this way.** The mark rests composed. On hover or press, the roof plane lifts and the E-bars slide like a sliding level. The mark breathes only on a cause, never idly.

## Per-skill audit checks
- S0361/S0414:
  - Does any detail lack a constructional meaning?
  - Do corresponding features agree across views?
- S0362/S0407:
  - Does any fill flash before its stroke?
  - Does any element pop instead of drawing?
  - Does any stroke draw backwards?
- S0468:
  - Does any old-to-new swap happen visibly?
  - Does any label sit on content?
- S0357:
  - Is the hat attached to the head in every pose and frame (the structural gate)?
  - Does the motion read at 48px (the perceptual gate)?
- S0086:
  - Does every morphing icon share three lines and one viewBox?
- S1463/S1421:
  - Are icon strokes consistent?
  - Is there one illustration style site-wide?
