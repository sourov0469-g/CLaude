# GATE: Home 1 · Hero

**Built:** ONE deepened version, the owner's mix. Per Muse ruling 1, there is no second version where the owner chose.
- **Owner's recipe** (`elbaz-owner-feedback.md` Round 1): "a MIX of V1 + V3 + V4 + the V8 background feature".
  - **V1 opening look:** copy on the left, the house on the right, and the finish picker.
  - **V3 border:** around the whole hero, with corner rivets.
  - **V8 background:** the "Built." letters carry the kitchen, and the picture answers the pointer.
  - **V4 scrollbar:** a reveal rail. Scroll, drag or arrow keys open the house window out to the full room.
- **Owner's fixes applied:**
  - Roof misplacement: the roof and the picture now share ONE SVG coordinate system (`viewBox 0 0 600 470`; the clip path and the roof path use the same vertices), so the cut can never drift.
  - V1's tree: removed. The sun disc was also removed (S1306 removal test: it carried no meaning).
- **Superseded versions** (old V1 to V8 and b1 to b8) are not in the delivered file (Muse ruling 5) and remain in git history.
- **Files:** `remodeling/src/sections/hero.html`, `css/sections/hero.css`, `js/sections/hero.js`.
- **System changes in this pass:**
  - easing-language tokens `--ez-out`, `--ez-move` and `--ez-in` (`css/tokens.css`);
  - one-version sections show no version switcher (`core.js`, `chrome.css`).

## Reference transfer (mechanisms only)
- **Lusion:** the carrier frame (the hero's border survives the scroll and pulls back at the end of the pin; corner registration marks).
- **Igloo / S0362:** strokes before fills on load. The roof is drawn from the apex out before the window opens.
- **AirPods:** the pinned media releases cleanly (70% of a viewport).
- **Scout:** the masked split-line headline rise.

## Self-rating (critical; Muse judges against the full scorecard)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| Fidelity to the owner's direction | 8 | All four named ingredients are present and visible in one screen (`qa/finalize/home-hero/hero-final-states.jpg`). Roof bug fixed by construction. Tree removed. | The V8 letters are now subordinate (a base texture) to protect AA and the copy. The owner may want them bolder. |
| Visual craft / composition | 7 | One dominant entry point (H1) and one bold move (the room opening). The frame and rivets give the sheet grammar. The copy sits on paper when the room opens (S1425). | At rest the letters are cropped by the frame bottom by design; at 1024×768 the composition is tight. |
| Motion / flow | 8 | One value drives the reveal, reversible. The pin is finite (+70%). The frame pulls back (Z-pull) at release as the carrier into Proof. Load beat: roof draws, window opens, lines rise, rivets set (`back.out(1.6)` only on the rivets). | The Proof dock (frame into tray) is completed when Proof is rebuilt. |
| Interaction | 8 | Rail: drag (pointer capture, 1:1), keys (arrows 10%, Page 25%, Home/End), and `aria-valuetext` states. Swatches: radiogroup with roving tabindex and 44px targets. Pointer: three depths. Companion: rail = drag, house = image. | |
| Accessibility | 8 | No text over the letters at 1440, 1280, 1920 or 1024 widths (measured). Card opaque at p ≥ 0.08 (no text on a photo). Reduced motion: no pin, no pointer motion, rail instant (measured `railEnd 100`, `stepBack 90`). Mobile 390: no overflow (measured 0). | |
| Facts / conversion | 9 | Hero copy is about 34 words, under the 40 cap. Proof sits beside the CTA (4.8 · 343, licence string verbatim). Phone reachable. No invented numbers. | |
| Performance | 8 | Transforms, opacity and clip-path only; quickTo for the pointer; no CSS-variable-driven child transforms on hot paths (one `--p` on the frame per scroll frame). | Not profiled on a low-end device. |

## Defects found and fixed across cycles
1. **Cycle 1:**
   - The hero was taller than the viewport, so the rail and swatches were cut off. Fixed: frame height clamped to the first screen; art sized by the viewport height.
   - The V8 letters were invisible behind the opaque card. Fixed: the card is see-through at rest and paper once the room opens.
   - Double exposure mid-reveal (two crops of the photo at once). Fixed: instant handover at 8% (S0063).
   - The version switcher showed "1/1". Fixed: hidden for one-version sections.
2. **Cycle 2:**
   - The pinned section was fixed at top 80px, cutting the frame. Fixed: pin the version wrapper itself from where it sits under the nav (start from the section's padding).
   - The copy card was half-transparent over the photo mid-reveal (an AA risk). Fixed: opaque from p 0.08.
3. **Cycle 3:**
   - The letters ran under the licence line at 1280×800 and 1024×768. Fixed: letter size tied to viewport height; tighter copy rhythm on short screens. Re-measured: zero overlaps at 4 viewports.
   - The roof ghosted during the reveal. Fixed: the art fades at 4× p.

## Defects remaining (honest)
- **Letters:** "Built." is a quiet base texture, cropped by the frame. That is a judgement call between V8's presence and AA safety.
- **Frame carrier:** the frame pulls back at the release, but the dock into the Proof tray is only completed when Proof is rebuilt (next section).
- **Mobile reveal:** on mobile the reveal opens the art band only (never behind the copy). The house shape is not kept at full reveal there.

## Skills applied
- **Flow and motion:** S1326 (normalized reversible progress), S0186 (pin, scrub, ease none), S1209 (finite pin), S0576 (Z-pull exit), S0451 (masked line rise), S0362 (strokes then fills), S0063 (no two crossfade states; 2px blur mask on the swatch swap).
- **Interaction:** S1321 (mouse layers at depth ≤ .04), S1018 (slider keyboard parity), S1441 (44px swatches).
- **Visual:** S1425 (no text on a photo), S0666 (one entry point), S1306 (removal test: tree and sun).
- **Accessibility and performance:** S0400 (tiered reduced motion), S0062 (transform/opacity).

Render evidence: `qa/finalize/home-hero/` (before: the old V1, V3, V4, V8; the cycle-3 scroll sheet; the final states including reduced motion).
