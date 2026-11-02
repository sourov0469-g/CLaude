# GATE: system, companion + living logo (Phase 2)

**Built** (system parts, one each, deepened, per Muse ruling 1):
- **The cursor companion:** `remodeling/src/js/systems/buddy.js`, fully rebuilt.
- **The living logo:** `remodeling/src/js/systems/logo.js` (new), the inline logo SVG built in `build.py`, and CSS in `css/systems.css`.
- **The harness:** `remodeling/site/harness-companion.html`, test only and not shipped. Its kit is `sections/harness-kit.html` and its QA is `tools/companion-qa.js`.
- **Removed from the build:** `rig.js` and `react.js`, the per-element hover sprites that formed the owner's "third cursor thing". Every call site was already guarded (`if (EZ.bindReactions)`), and all 5 pages run with zero console errors.

## What changed against the owner's cursor feedback (UTMOST PRIORITY)
| owner's complaint | fix | evidence |
|---|---|---|
| Hat sits far from the face | The hat now lives INSIDE the head group, with its brim across the forehead. It only moves with the head. Root cause: `.bd-hat` had been a sibling of the head with its own `bounce.out` y tweens. | Measured overlap of the hat brim with the face, by kind: link 11.1, CTA 12.1, button 7.8, phone 14.2, disabled 7.8, image 10.5, type 6.4, choice 7.8, drag 7.8, point 11.1, watch 11.1, text 7.8 px (a gap would be negative). Before and after: `qa/finalize/phase2/companion-BEFORE-hat-floating.png` and `companion-poses-3x.png`. |
| Three things at once (cursor change + camera icon + companion) | **Two only:** a constant pencil-nib tip (never changes form) and the companion. Tool icons, brackets, rings, the flip sheet, the rx sprites and the rig sprites are all removed. | `rxVisible: 0` on every kind (`companion-qa-results.json`); `.rx` count 0 on all 5 pages |
| Wrong icons, bad spacing and placement | No icons exist any more. The companion keeps a fixed 44/42px offset from the tip, flips at screen edges, and steps aside from text fields. | in-context sheet `companion-in-context.png` |
| Not reactive enough; poor build quality | 12 distinct companion-own reactions: link (looks and points the way), button (hands ready), CTA (anticipation hop, grin, eyes wide), phone (hand to ear, head tilt), image (hand on chin, considering), choice (nod), drag (both hands forward, open; they close on press), type (steps aside, scaled .82, watching), watch (walks to the corner during a pinned scene), disabled (head shake), point (town pins). Plus a blink, eyes that track, lean from velocity, squash and stretch from speed. Hands redrawn as mittens with thumbs, plus a pointing finger. | `companion-poses-3x.png` (3× render) |
| Click effects broken | Click is a 1:2 tip tap (down 0.1s, up 0.2s, pivot at the hotspot). On the same frame the companion squashes, claps (CTA/button) or closes its hands (drag). Release springs back with `back.out(1.4)`. The target's own press stays its CSS. | press frames `companion-in-context.png` (`*-press`) |

## Self-rating against the scorecard categories (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Interaction correctness | 8 | Hotspot error ≤ 0.04px on every kind. No stale states (re-hit on scroll and every 350ms). Press never sticks (pointerup, cancel, lostpointercapture, dragend and blur all release). Zero console errors on 5 pages. | Not yet exercised against the rebuilt sections, which are still to come. |
| Cursor (two things; touch off) | 9 | Touch run: `has-buddy` false, tip and companion hidden. Reduced-motion run: companion `display:none`. Settings toggle On/Off persists. Default is ON (owner's priority). | |
| Craft and animation quality | 7 | Spring body (m 1.2, 2.2 Hz, ζ .72, rationale written in the code, S0340). Physical entry from the bottom edge and exit off it, never a fade at rest (S0574). No idle wobble: the breathing loop and random "actions" are removed (S0544). | At 66px, the hand poses read but are small. The phone pose's hand sits at brim height when the head is tilted (acceptable; it reads as a hand to the ear). |
| Performance | 8 | One rAF loop. It stops after 30 settled frames once the pointer has been idle for 1.5s, pauses when the tab is hidden, and clamps dt to 1/30. Direct transforms only, and no CSS variable drives child transforms (S0062/S1315). | Not yet profiled on a long-session route cycle. |
| Logo (alive, micro detail, own story) | 8 | **Load (pure CSS, no flash):** the bracket draws like a pen, then the tile is laid with a settle. **Hover/focus:** the tile slides to the spine and closes the E (tile x 18 to 13.5 and back, measured). **Press:** the room closes for one beat. **Scroll compaction:** the arms shorten and the tile tucks closer. **Footer:** the room closes and stays closed (dashoffset 0px, measured; `logo-footer.png`). | The page-switch shared-element beat waits for the single-file assembly (Phase 5). |
| Accessibility | 8 | The companion and tip are `aria-hidden`. Logo SVGs are `aria-hidden`; the link keeps `aria-label` and the footer span has `role=img` with a label. Focus triggers the same logo beat as hover. Text fields keep the native caret. | |

## Defects found and fixed across cycles
1. **Cycle 1:**
   - **Hands:** plain balls that did not read as hands. Redrawn as mittens with thumbs, plus a pointing finger.
   - **Image pose:** the "frame" overlapped the hat. Replaced by a considering pose with a hand on the chin.
   - **Phone pose:** the hand covered the brim. Moved to ear level.
   - **Initial state:** not written to the DOM (`state` missing in QA). Set on build.
2. **Cycle 1, logo:** the CSS load beat holds the tile's transform (`fill: both`), so a JS transform could never slide it. The slide moved to the SVG `x` attribute (verified 18 to 13.5 to 18).
3. **Core:** after the inline logo, the copy step looked for `.nav__logo img`. It now copies from the one data-URI image, so the menu sheet logo still works.

## Defects remaining (honest)
- **Pose timing:** the companion's hover reactions are tuned on the harness. Each rebuilt section will retune `data-buddy` kinds where its content needs it (for example the BA seam handle takes `drag`).
- **Logo page switch:** the shared-element page-switch beat is pending the single-file in-file navigation (Phase 5).
- **Rx markup:** `data-rx` attributes remain in section markup as inert attributes. They are removed section by section as each section is rebuilt; nothing reads them now.

## References and skills
- **References:**
  - Graza (the character-acting quality bar, scoped);
  - Lusion and Scout (one easing language: `--ez-move` on the bracket draw);
  - OH (cause-driven micro detail).
- **Skills:**
  - S0574 oversized-cursor (tip pivot, 1:2 tap, same-frame ignition, physical entry and exit, drift aside);
  - S0340 feel (spring body);
  - S0357 animated-sprites (identity lock, structural and perceptual gates);
  - S1455 state-machine;
  - S0544 motion-doctrine (no idle wobble, causal motion);
  - S1315 / S0062 (loop hygiene);
  - S1190 / S0400 (reduced motion);
  - S1422 closure (logo);
  - S0362 (strokes before fills);
  - S0410 (asymmetric hover in and out);
  - S1441 (hit areas);
  - S1018 (keyboard parity: the logo beats run on focus).
