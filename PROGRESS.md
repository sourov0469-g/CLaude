# PROGRESS: Rembrandt homepage build (BRIEF-FULL.md, then BRIEF-FULL-v2.md from 2026-10-30)

Memory file (BRIEF-FULL.md §11). Survivors after any reset: BRIEF-FULL.md §3, SECTIONS.md, this file, TRACEABILITY.md, the usage log at the end of `bank-index/BANK-MAP.md`. Re-read them and continue; never restart a finished section. Failed checks stay listed here until they pass.

## State
- **Branch:** `claude/sweet-hypatia-it8evf`.
- **Phase:** v2 brief (BRIEF-FULL-v2.md) in force. Phase 0 reconciled; full library read next, then the per-version verdict audit (§14), fixes, §12 gate rerun.
- **Build:** `cd rembrandt/v5 && TOOLS=<scratchpad>/tools node build/build.mjs` → `rembrandt/v5/rembrandt-homepage.html`. TOOLS holds esbuild, gsap, lenis and playwright in `node_modules`; if the scratchpad is lost, reinstall them there.
- **Sources:** `rembrandt/v5/src/` holds `index.html`, `base.css`, `js/*`, `sections/<id>/{v1,v2,v3}.html, <id>.css, <id>.js` and `data/towns.js`.

## Phase 0: setup (BRIEF-FULL.md §9)
1. **Merge:** `origin/claude/hrm-presentation-slides-xag1ax` (head 6170051, a re-upload of identical files) merged into the branch as merge commit a0c5c52. `git merge-base --is-ancestor` confirms the base is contained.
2. **Raw skills:**
   - Reassembled with `cat part-00 … part-06 > WEB-SKILLS.md` (scratchpad `raw/WEB-SKILLS.md`).
   - Size **22,368,518 bytes**; SHA-256 **fe81307bc11935af8dc54870325aaccf917a0284d9ffeab6b7d833dec36d22b6**. Both match the README and §6. **PASS.**
3. **Shortlisting:**
   - Read BANK-MAP front matter (how-to-use, governing rules) and Section Playbooks 1–10 plus the Mechanism Families index.
   - Shortlist and picks are in PLAN-FULL.md.
   - Opened the Atlas entries: ⟦S0534⟧, Variable Proximity, #289, P73, Q585, Q40, Count Up, UZIK, P74.
   - Raw skill ⟦S0534⟧ read.
   - Live reference fetched with plain curl: HyperFrames `code-slice-hero.html` / `surface.js` / `shadows.js`, read only, kept in the scratchpad.
4. **Files created:** PROGRESS.md (this file), TRACEABILITY.md (all 21 rows written before code), SECTIONS.md (21 version lines + 7 system lines, all `passes: NO`), PLAN-FULL.md, BRIEF-FULL.md (the brief, verbatim, as a working file).
5. **Baseline** (the checkpoint `rembrandt/v5/rembrandt-homepage.html` at c1287ba, the V7 delivery):
   - One self-contained file, 1498 KB: 7 versioned sections (hero, proof, work, family, how, area, call) + a shared footer, each with a 1·2·3 switcher.
   - The V7 gate passed: overflow 0, no console errors, axe clean at 1440.
   - **Constellation:** Reviews V1, kept. `constellation()` source SHA-256 e7d174cd… is identical at e685bee (owner-kept), 36c2ca6 and HEAD.
   - **Heroes:** must be rebuilt fresh (Phase 1; §5 bans salvaging hero code).
     - V3 is a roof-anatomy diagnostic, which Rule 11 bans.
     - V2 uses photo-filled type, which repeats Family V1's trick.
   - **Reviews:** V2 kept and upgraded. V3 must be rebuilt: its text marquee repeats Call V3's.
   - **Work:** all three upgraded.
   - **How V2:** a CSS-sticky pinned stage, so it is rebuilt (§4 "no pinned scene-pages"); it also named roof layers, close to anatomy content.
   - **Entrance:** V7 used R5 beats; §4 makes direction-aware reveals the default (G1).
   - **Cursor:** the V7 companion kept the system cursor; §4 now says no plain cursor (G2).
   - **Reactions:** V7 repeated several (chalk snap, drop + splash, pause bars). The registry in PLAN-FULL.md §G4 replaces them.

## Decisions
- Hero families: (1) HyperFrames tile surface ⟦S0534⟧; (2) variable-font proximity (Variable Proximity); (3) timed character rotation (#289 + P73). Three different mechanisms, compositions and layouts.
- Reviews V3: Count Up roll mode inside Q409's proof stack. How V2: UZIK story pager.
- MorphSVG will be removed from the bundle; Call V2's equal-structure paths morph by GSAP string interpolation.
- Owner tooling (version switchers, helper picker) is outside the reaction registry.

## Conflicts resolved (§2: log and continue)
| # | Conflict | Resolution |
|---|---|---|
| C1 | Pack `rembrandt-pack.md` §5.14 "Areas: plain text list … never a map graphic" vs the existing Towns V1 Census map | BRIEF-FULL.md §6 makes pack files subordinate; the brief allows the map. Kept, and every town is also in a plain text list (the map's own list control). |
| C2 | §9.5 "checkpoint heroes … to be upgraded" vs §10 Phase 1 "build all three FRESH" + §5 "no salvaging the scrapped hero code" | Phase 1 + §5 govern: all three heroes rebuilt fresh, no V7 hero code reused. |
| C3 | §9.5 "reviews … to be upgraded" vs Phase 2 "V2 and V3 rebuilt from two different named references" | V3 is rebuilt on a new reference (Count Up + Q409); its marquee also broke §4's no-repeat rule. V2 is already built on its own named reference (Cenco DEEP 5 + F12 + #317), different from V3's, so it is upgraded to §4. Judgement recorded; Phase 2's evidence (no invented quotes, 295/4.9 present, switcher clean) applies to both. |
| C4 | Bank ⟦S0213⟧ / ⟦S0617⟧ "no custom cursors" vs §4 "NO plain or fixed cursor" | §4 > reference. The system cursor is hidden only while a companion variant is mounted on a fine pointer, with an exact nail-head hotspot; Off restores it; text fields keep the I-beam; touch is untouched. |
| C5 | F17 0.15–0.3 s vs reference durations (Q40 1.25 s, P73 0.8 s, Count Up 2 s, UZIK 0.4 s, Shazam 0.4 s) | Reveal entrances run at 0.3 s. The hero headline system (the one signature) keeps its reference timing. Text in motion: the rotator keeps P73 (it is the hero signature); Count Up is compressed to 1.4 s (bank-recorded 1.2–1.6 s trade counters). UZIK's 0.4 s crossfade and Shazam's 0.4 s morph are state changes, not reveals: kept. |
| C6 | Q40 ±100 px travel vs F17 | ±40 px desktop / ±20 px phones at 0.3 s (Q40's own halving on phones). |
| C7 | §5 bans "estimate paper" (skeleton) vs How step 2 (a written estimate) | Step 2 shows measuring (tape + dimension lines on a roof plane), never a paper sheet. |
| C8 | #289 pause-on-hover only vs WCAG 2.2.2 | A visible pause button as well, plus offscreen rest. |
| C9 | Rule 11 "no roof-anatomy lessons" vs V7 Hero V3 (named roof parts) and V7 How V2 (named layers) | Both removed (Hero V3 and How V2 rebuilt). |
| C10 | §4 "every interactive element has its own reaction" vs groups of siblings (6 tiles, 24 chips) | One reaction per control group; groups never share a reaction with another group or element. |
| C11 | v2 §3 is a closed list vs the written, line-by-line estimate (Hero V2 link label, How V1–V3 step 2, Call V1–V3) | The estimate line is the firm's own published claim, recorded in the repo pack `rembrandt/rembrandt-pack.md` ("Their published claims & systems (use only these)": "written line-item estimate BEFORE any work starts"). It is not general knowledge and not one of §1.3's banned inventions (reviews, quotes, stats, towns, prices, credentials). Kept, worded no stronger than the pack, and flagged in the report for the owner. The Towns versions' Census figures are public data with their source printed on the page; they are kept and flagged the same way. |

## Open issues
(none yet)

## Phase notes

### Phase 1: Hero ×3 (rebuilt fresh; no V7 hero code reused: v1/v2/v3.html, hero.css and hero.js rewritten)
- **Versions:**
  - **V1 Shingle wall:** ⟦S0534⟧, Canvas 2D, FAMILY ROOFERS → SINCE 1995.
  - **V2 Weighted headline:** Variable Proximity, Epilogue wght 300 → 900.
  - **V3 Town rotator:** #289 + P73 over the 24 towns.
- **Page system G1:** `beats()` in `src/js/fx.js` rewritten as the Q40 direction-aware entrance (±40 / ±20 px, 0.3 s expo.out, reset on leave). `lines` / `rise` / `onEnter` / `EASE` are byte-identical, so the Constellation is unaffected. Unused helpers removed: dirReveal, clipIn, drawIn, words, MOVE.
- **Evidence:**
  - `scratchpad v7/secqa.mjs hero`, switching 2→3→1 at 1440, 375 and 1440 reduced motion: 9/9 lines "switcher swaps only hero; overflow 0; errors 0". Method: every section's live version node is marked before the click; after it, only the hero's mark is gone.
  - Screenshots: `rembrandt/v5/qa/hero{1,2,3}-{1440,375,1440-rm}.jpg`, each showing the Call (937) 746-7377 button.
  - `heroint.mjs`: wall flip verified by canvas pixels (blue 53 → 204); proximity weights 898 vs 323; rotator rotate / pause-hold / resume; R07, R09–R13 hover and press: all respond. Errors 0.
  - Facts: each hero version has tel:+19377467377 ×1; 353-9711 ×0 and 24/7 ×0 in the whole file.
  - Whole-page sweep after the entrance change: overflow 0 and errors none for all three sets at 1440 and 375; every section's content shows (sweep sheet reviewed).
- **Fixed during Phase 1 (kept visible):**
  - The H1 sweep was lost when the ResizeObserver's first call rebuilt the tiles. Rebuilds now happen only on real size changes and keep the wave's target.
  - At 375 the sweep was dropped by a font reflow. A load sweep still under way is now re-laid onto the new tiles.
  - H3's reduced-motion pause button showed despite `hidden` (CSS display won). Added `.hx3-pause[hidden]{display:none}`.
  - H3 photo: the tree canopy hid the roof and the yard sign sat behind the CTA, so it was swapped to job-truck.

### Phase 2: Reviews ×3
- **V1 Constellation, untouched. Verification method:**
  - (a) Source hashes against e685bee, the owner-kept build: `constellation()` (e7d174cd…), v1.html, gl.js, spring.js, the fx helpers it imports (`lines`, `rise`, `onEnter`, `EASE`) and the `.pv1` CSS block are all identical.
  - (b) Rendered pixels. `qa/scripts/constel.mjs` renders the V1 stage in the e685bee build and in the current build, with Math.random ≡ 0.5, reduced motion and overlays hidden. Diff bbox **None, max 0** at 1440 and at 375.
- **Failure found and fixed (kept visible):**
  - At 375 the first pixel diff showed a different star sampling.
  - `constel3.mjs` showed why: in the current build the Constellation's first layout ran before Epilogue loaded (fallback 119.1 px vs 106.8 px), consuming its seeded PRNG differently. The faster new heroes changed the boot timing.
  - Fix outside the Constellation: `boot()` now waits for the embedded Epilogue (300/800/900, capped at 1.2 s) before mounting sections. Re-run: identical at both widths.
- **V2 Ledger (upgraded):**
  - Wording corrected to §3 verbatim: BBB "accredited since 2001", Owens Corning "Platinum Preferred", "$2M liability insurance".
  - G1 entrance added on the head; R14 kept.
  - Evidence: `secqa.mjs proof` clean, `proofint.mjs` R14 OK.
- **V3 Roller board (rebuilt):** Count Up roll mode inside Q409's proof stack, a vanilla port of CountUp.jsx's column model (turns ≤ 3 − rank, stagger min(0.07, 0.4·T/(n−1)), SVG vertical blur σ, ease (.33,1,.68,1)), duration 1.4 s. The marquee trains are removed.
- **Evidence:**
  - `secqa.mjs proof`, switching 2→3→1 at 1440, 375 and reduced motion: 9/9 "swaps only proof; overflow 0; errors 0".
  - Rollers land on 4.9, 295, 2001, 1995, $2M. R15 OK.
  - Quote/name scan of all three versions' visible text: 0 quote-like strings, 0 reviewer-name patterns.
  - "295" and "4.9" present in all three versions.
- **Flag (not changed; Rule 4 vs §3 wording):**
  - V1 reads "$2M liability cover" and "BBB A+ since 2001". §3's verbatim wording is "liability insurance" / "accredited since 2001". Same facts, different words.
  - Rule 4 forbids editing V1, and the owner kept it as-is, so it is left exactly as kept and listed in the final report for the owner's decision.
- The QA scripts now live in `rembrandt/v5/qa/scripts/` (README there).

### Phase 3: Work ×3 (upgraded)
- **Before/after audit:** the only photos labelled before or after are the ba2 pair (V1 tiles 1–2, V2 two items, V3 the blinds and its reduced-motion pair). The V7 asset `ba1-after` was a single after-only photo whose name suggested a pair; it is renamed `blue-house` in `build/images.py` and every `data-img` (the stale `assets/img/ba1-after.webp` removed). The build has 0 `ba1-after` and 0 `ba1-before`.
- **V1 Tape loop:**
  - R18 rebuilt: the pause bars turn through 90° into the walls of a level vial; the bubble drifts while the strip runs; once pressed (held) it centres and stays. Replaces the V7 "bars draw", which repeated other pause buttons.
  - R16 press now applies to tiles too: clicking a tile snaps the tape hook, as the arrows do.
  - bg: a lit band follows the pointer along the tape (fine pointers, motion allowed), and the ticks under it turn blue and thicken. Its strength falls off with distance from the tape.
- **V2 Gable push grid:** verified only. R19, R20 and the hip-pattern pointer depth were already in place.
- **V3 Course blinds:** bg: nail heads along the starter strip (22 wide, 12 on phones). Within 150 px of the pointer they lift up to 9 px, grow and tip toward it.
- **Evidence:**
  - `qa/scripts/secqa.mjs work` at 1440, 375 and 1440 reduced: 9/9 "switcher swaps only work; overflow 0; errors 0".
  - Screenshots: `qa/work{1,2,3}-{1440,375,1440-rm}.jpg`, reviewed.
  - `qa/scripts/workint.mjs`: R16–R21 hover and press, the tape glow and the nail lift all respond (numbers in TRACEABILITY.md). Errors 0.
  - Facts in the whole file: 353-9711 ×0, 24/7 ×0.
- **Fixed during Phase 3 (kept visible):**
  - The nail lift first read NaN: SVG elements have no `offsetLeft`. The nails' centres are now measured with getBoundingClientRect when the pointer enters the section.
  - The first `workint` run hovered controls that were off screen (negative top). The script now scrolls each target into view before it hovers it.
- **Note (owner tooling):** at 1440 the fixed Helper picker can sit over V1's arrow buttons when the foot of the section is at the very bottom of the viewport. One more scroll clears it. The picker is owner tooling, outside the registry; Phase 5 re-checks the companion's chrome.

### Phase 4: Family ×3 (upgraded)
- **Facts corrected (§3, invent nothing):**
  - V1 and V2 said Bunk "started Rembrandt in Springboro". The pack says only that he founded it in 1995. Now "Franklin “Bunk” Walker founded Rembrandt" (V1) and "Bunk Walker founded Rembrandt in 1995" (V2).
  - V2 "Wade has run it since 2015" is now "has been president since 2015".
  - V3 "Rated A+ by the Better Business Bureau since 2001" claimed the rating dates from 2001. Now "BBB A+, accredited since 2001"; the pill reads "BBB accredited since 2001".
- **§4 no trick twice:** V2's gable-cropped photo repeated Hero V2's roof-pitch crop. V2's photo is now a plain frame; its roof motif is the roof that draws with the statement.
- **V1:** kept (G1, R22, spotlight and photo drift as the background reaction); facts line corrected.
- **V2:** bg: the skyline of roofs now takes pointer depth (−0.025) on top of its scroll parallax (the depth sits on the path, the parallax on the svg, so they never fight over one transform).
- **V3:**
  - R24 press rebuilt. Pinning drives a roofing tack through the pill's top edge, and it stays while pinned. This replaces a scale pop that repeated Work's arrow tick.
  - Hover adds a glow to the member's leader.
  - Side pills raised to 41% so the longer BBB pill clears the rafter.
- **Evidence:**
  - `secqa.mjs family` at 1440, 375 and 1440 reduced: 9/9 "switcher swaps only family; overflow 0; errors 0".
  - Screenshots: `qa/family{1,2,3}-{1440,375,1440-rm}.jpg`, reviewed.
  - `qa/scripts/famint.mjs`, log `qa/famint.log`: every reaction and background response confirmed. Errors 0.
  - Facts in the whole file: 353-9711 ×0, 24/7 ×0, licence ×0, emergency ×0.
- **Divider:** family → chevrons, unchanged and unique on the page.
- **Fixed after the first Family commit (kept visible):**
  - A rerun of `famint.mjs` after the V2 wording change read R23 as "none". The Call link was not broken; it was still hidden.
  - Cause: V2 started its entrance at `top 75%`, so with the longer statement the link sat in the lowest quarter of a 900 px screen and stayed invisible.
  - Fix: V2 now uses the house start (`top 94%`). No other section overrides it.
  - Rerun: R23 fm-wob / fm-ring, errors 0; `secqa.mjs family` 9/9 clean.

### Phase 4: How it works ×3 (V1, V3 upgraded; V2 rebuilt)
- **V2 rebuilt on [BANK] UZIK / P74:**
  - Protocol: Atlas entries P74 / UZIK and deep read 221 re-read. Live site visited with plain curl, read only (scratchpad `ref/uzik/`).
  - Its CSS confirms the deep read, ported as is: `.diapo__item{opacity:0;transition:opacity .4s var(--transition-diapo)}`, `.is-visible{opacity:1}`, `--transition-diapo: cubic-bezier(0.25,0.1,0.25,1)`; pager `.story__pager-progress.is-animating{animation:storyPagerProgress 5s linear infinite}`, `.is-done` full, `translate3d(calc(-100% - 1px),0,0) → 0`; chrome 300 ms cubic-bezier(0.86,0.1,0.14,0.9).
  - The step advances on `animationiteration`, so the 5 s fill is the dwell.
  - The old V2 (a CSS-sticky scroll stage that named roof layers) is gone, so the page no longer has a sticky stage.
- **Adaptations and deviations from the plan (logged, §2):**
  - Desktop: the pager is the top row of the story card, and the scene sits beside the caption. With UZIK's overlay, the scene ran 560 px tall and pushed the caption below the fold.
  - Scene 1 is answered, not rung: the office lights come on and the handset lifts off its base. Family V2 (R23) and Call V2 (R36) already ring a handset.
  - Scene 3: the finished roof comes down onto the walls with dust puffs at the eaves. Courses laid eave to ridge would repeat Work V3 and Family V2 (§4, no trick twice).
  - Scene 2 shows a tape run along the eave and dimension lines on a roof plane, with no paper (§5).
  - R41 added to the registry for V2's Call link (coiled cord stretches; recoils on press).
- **V1:** R25 replaces the drop/splash: a gutter-hanger bracket swings down over the link's corner, and press turns its screw.
- **V3:**
  - bg: the ladder leans up to 1° toward the pointer.
  - Chip "$2M insured" is now "$2M liability insurance" (§3 wording).
- **Evidence:**
  - `secqa.mjs how` at 1440, 375 and 1440 reduced: 9/9 "switcher swaps only how; overflow 0; errors 0".
  - Screenshots: `qa/how{1,2,3}-*.jpg`, plus `qa/how2-step{2,3}-{1440,375}.jpg`, reviewed.
  - `qa/scripts/howint.mjs` (log `qa/howint.log`): pager timing, pause, tabs, keys, offscreen rest and every reaction pass. Errors 0.
  - Each version has tel:+19377467377 ×1. Whole file: 353-9711 ×0, 24/7 ×0.
- **Fixed during How (kept visible):**
  - Scene 2's tape ticks were missing: the generated path string was malformed (`M236342v8`). Regenerated, and the reshoot shows them.
  - The ladder-lean check first read 0°: the R28 press clicked the Estimate link, and Lenis animated the jump to #call. The test now releases off the link. The lean itself measured 0.91°.
- **Divider:** how → rafters, unchanged and unique on the page.

### Phase 4: Towns ×3 (upgraded)
- **V1:**
  - R29 kept (marker gable pops; press draws the distance line and prints the Census facts), and the ripple background kept.
  - Defect fixed: town labels collided (Middletown over Trenton). Labels now step down or up a line until they clear every earlier label and every house. `mapcheck.mjs` measures 0 overlaps.
- **V2:** bg: the street plan takes pointer depth on top of its scroll drift (depth moves x/y, parallax moves yPercent, so GSAP composes them in one transform).
- **V3:**
  - R33 rebuilt: focus runs a tape-measure blade out along the field (it was a chalk line), and Enter clicks the tape's hook.
  - Form handler verified, and fixed: Enter used to wait for the 300 ms input debounce. It now answers at once. The inline `onsubmit="return false"` was removed; the JS handler calls preventDefault.
  - The "not on our list" answer names the number; it is now a tel link with its own reaction (R42, added to the registry).
  - Phones: the question and field come before the compass (they started almost a screen down). The tape shows a stub of blade before a town is picked.
- **Reactions made unique:** V1 list pills, V2 sort buttons and V3 chips all ran the same scale pop on press (`tw-pop`), which repeated Work's arrow tick. Removed: each control's registered press reaction (line draws, courses re-lay, needle commits) is its press.
- **Evidence:**
  - `secqa.mjs area` at 1440, 375 and 1440 reduced: 9/9 "switcher swaps only area; overflow 0; errors 0".
  - Screenshots: `qa/area{1,2,3}-*.jpg`, `qa/area1-map-1440.jpg`, reviewed.
  - `qa/scripts/areaint.mjs` (log `qa/areaint.log`): every reaction, the form handler and the background responses confirmed. Errors 0.
  - Facts: towns only from `data/towns.js` (24). Whole file: 353-9711 ×0.
- **Divider:** area → steps, unchanged and unique.

### Phase 4: Call ×3 (upgraded)
- **V1:**
  - bg: the drop gathering at the gutter lip leans toward the pointer, up to 10°, hinged at the lip.
  - R34 and R35 kept. The drop/splash is now unique to this button: How V1's copy became the hanger bracket.
  - At 375 the heading broke as "line-by- / line"; the compound now stays on one line.
- **V2:**
  - MorphSVG removed from the bundle (main.js import, register and export). The circle ↔ house morph is GSAP string interpolation of two equal-structure 48-point paths; same easing (shazamIn / shazamOut) and duration.
  - R36 press now buzzes the handset sideways. Before, it was a rotation shake like Family V2's handset wobble.
  - The toggle's extra scale pop is removed; its press reaction is the morph (R37).
- **V3:** R40 press bounces the icon inside the ring. Before, it was the shared scale pop.
- **Evidence:**
  - `secqa.mjs call` at 1440, 375 and 1440 reduced: 9/9 "switcher swaps only call; overflow 0; errors 0".
  - Screenshots: `qa/call{1,2,3}-*.jpg`, reviewed.
  - `qa/scripts/callint.mjs` (log `qa/callint.log`): every reaction, the morph (mid-tween sampled) and the drop lean confirmed. Errors 0.
  - Constellation re-checked after the main.js change: `constel.mjs` diff bbox None, max 0 at 1440 and 375. `constellation()` still e7d174cd. The `.pv1` rules match e685bee line for line, and no proof file has changed since the Phase 2 commit.
- **Weight:** build 1496 KB (css 114, js 266).

### Phase 4 summary
- Family, How, Towns and Call all have SECTIONS lines at YES, TRACEABILITY Verification filled, and a commit each.
- Dividers: one per boundary, all different. S4 is marked IN PLACE; the page-wide check is Phase 6.
- Shared scale-pop presses were removed wherever a control already had its registered press, which leaves Work's arrow tick (R17) as the only scale press. The full registry audit is Phase 5.

### Phase 5: Cursor companion and page systems
- **Companion as the cursor (§4 "no plain or fixed cursor"):**
  - On a fine pointer with House, Hammer or Drop chosen, the system cursor is hidden and a nail head sits exactly on the pointer with zero lag. Measured offset in all 42 runs: 0,0 px.
  - The character follows at +22/+22 and keeps its idle, blink, glance, eye-roll and solo acts, plus five hover reactions and five different press reactions per variant (button, link, image, heading, card).
  - Text fields keep the I-beam, and the nail hides over them. Press sets the nail.
  - Off, touch and reduced motion (Off by default there) keep the system cursor.
  - Safety: the cursor is hidden only under `html.cmp-live`, i.e. mounted AND pointer position known. It is dropped when the pointer leaves the page. Before the first move the cursor is `auto` (tested). A script failure therefore cannot leave the page without a cursor.
  - Defect avoided: the V7 code added `cmp-on` at mount, so hiding the cursor on that class alone would have blanked it until the first move.
- **Per-section cursor effects (G3), new `src/js/cursorfx.js`:**
  - Effects: hero sun halo, reviews star dust, work viewfinder, family wood shavings, how ripples, towns compass along the direction of travel, call signal arcs.
  - Colours come from the live version's painted background (`--sec-bg`): light marks on dark versions, ink and blue on light ones.
  - Emission is by distance travelled. Pools hold at most 12 nodes, moved by transform. The effects run only while the companion is live, so none with Off, on touch or under reduced motion.
  - Contact sheet: `qa/cfx-sheet.jpg`.
- **Chrome reactions (registry R02, R03, R04, R06):**
  - R02 nav logo: a dormer pops up on the pill's right shoulder, and press flashes its pane. Moved from the pill's top edge: there are only 12 px above the pill, and the logo fills its middle. Registry wording updated.
  - R03 phone-bar Call: a roofing nail hovers at the pill's left edge, and press drives it in with a spark. The bar Call used to share R01's ridge vent.
  - R04 phone-bar estimate: an underlayment roll peeks at the label end, and press rolls it across, laying the felt. Replaces the chalk line.
  - R06 footer phone: a sealant bead draws under the number, and press tools it flat. Replaces the nails.
  - Evidence: `qa/scripts/chromeint.mjs`, log `qa/chromeint.log`: R01 to R06 all respond to hover and press. Contact sheet `qa/chrome-sheet.jpg`. Errors 0.
- **Defects found and fixed (kept visible):**
  - On narrow windows with a mouse, the owner's Helper picker sat on top of the phone bar's "Get an estimate" button (elementFromPoint hit the picker). At ≤ 640 px it now sits above the bar.
  - The generic `.btn svg{width:1.15em}` outranked the new chrome graphics inside buttons (roll, felt strip, nail). Their selectors are now scoped under `.btn`.
  - The first chrome run read R01, R03 and R04 as dead. The nav is quiet over the hero (its Call is hidden there, because the hero carries its own) and the bar hides with it; the test now checks them mid-page.
- **Background audit (§4: the background reacts to cursor and/or scroll), all 21 versions:**
  - Hero: V1 the shingle wall itself plus 0.18 parallax; V2 rafters turn ±1.5°; V3 photo plate on pointer depth.
  - Reviews: V1 the stars spring away from the pointer (kept as is); V2 shingle courses lift near the pointer; V3 sheen follows the pointer.
  - Work: V1 tape glow and turning square; V2 hip pattern on pointer depth; V3 starter nails lift.
  - Family: V1 spotlight and photo drift; V2 roofline depth plus scroll; V3 plywood deck window.
  - How: V1 **added** a faint rain layer, drifting with scroll (data-sy) and leaning with pointer depth (data-pd); V2 scene layers on pointer depth; V3 the ladder leans.
  - Towns: V1 ripples; V2 street plan, depth plus scroll; V3 weathervane and ridge depth.
  - Call: V1 the drop leans; V2 dusk skyline on pointer depth; V3 **added**: the chimney smoke bends away from the pointer.
- **Evidence (Phase 5 done-criteria):**
  - `qa/scripts/compint.mjs` (log `qa/compint.log`) ran in every version of every section at 1440 and 375: 42/42 PASS, each recording cursor `none`, nail offset 0,0, companion visible, the right effect kind with 1–16 nodes, and a hover reaction where a control was in view (39 of 42; 3 had none in view).
  - Variants: Hammer, Drop and House each mount their body. Off removes `cmp-on`, the cursor is `auto`, and there are no effect nodes. The H key cycles Off to House.
  - Text field: cursor `text` and the nail hidden. Press sets the nail and release lifts it. Leaving the page drops `cmp-live`. Before the first move the cursor is `auto`.
  - Touch device (375, hasTouch, isMobile): not mounted, cursor `auto`, 0 effect nodes, tel link present.
  - Reduced motion: Off, cursor `auto`, 0 effect nodes.
  - Errors 0 in every run.
  - `sweep.mjs` after Phase 5, at 1440, 375 and 1440 reduced, all three version sets: overflow 0, errors none.
  - Constellation still pixel-identical to e685bee at both widths.

### Phase 6: assembly and the §12 final gate
- **Fix made during the gate (kept visible):** the contact sheets showed that Hero V1 and V2 still said "Bunk Walker started it… His son Wade runs it". They now say "founded it in 1995 … has been president since 2015" (§3), the same correction made in Family. `secqa.mjs hero` reran 9/9 clean, and the facts gate reran with 0 fails.
- **§12 record:**
  1. **Facts grep:** `qa/scripts/factsgate.py`, log `qa/gate/facts.log`, 25 checks, FAILS 0.
     - 353-9711 ×0 in any format; the only tel is +19377467377; no other phone-shaped number.
     - 24/7 ×0; emergency ×0; licence ×0; prices, discounts and APR ×0.
     - 295 ×4 and 4.9 ×5. No quote-like sentence and no reviewer-attribution pattern.
     - Every BBB mention says "accredited", except the Constellation (Rule 4, flagged).
     - 12 versions carry their own tel link; the nav, phone bar and footer carry it on every page state.
  2. **Banned patterns:** same log. "Job Ticket" ×0. No FAQ, service picker, bento, estimate paper, leak story or proof strip. Sections run hero > reviews > work > family > how > towns > call, not the v1–v4 skeleton. No named roof-layer lists (Rule 11). No GSAP pin, and the old CSS-sticky How stage is gone.
  3. **Traceability audit:** three rows drawn with `random.Random(20261029)`: Call V1, Towns V1, Work V3. Each Atlas entry was re-opened.
     - Call V1 matches: F14 offer that produces a number, F9 named next step, OFFF two-tone full-width wordmark, S1350 blur plus alpha-threshold drops with a static reduced-motion fallback.
     - Towns V1 matches: plots only what is real, at true positions; source printed; 24 = 24.
     - Work V3 matches on the slit mask, crispEdges, scrub 2.2 / 1 and no pinning. It differs in 16 courses instead of 30 slits, laid in sequence rather than 0.02 apart. Both deviations are now written into the row's Adaptations.
  4. **Switchers:** `secqa.mjs` for all 7 sections at 1440, 375 and 1440 reduced, log `qa/gate/switchers.log`: 63/63 "switcher swaps only <section>; overflow 0; errors 0". `domgate.mjs`: all 21 labels change only their own section.
  5. **Screenshots:** all 21 versions at 1440 and 375 in `qa/<section><v>-{1440,375,1440-rm}.jpg`, with contact sheets `qa/gate/sheet-1440.jpg` and `qa/gate/sheet-375.jpg`, compared with §4. Defects found and fixed across phases are listed in each phase note. This pass found the hero wording, which is fixed.
  6. **Console and DOM:** `qa/scripts/domgate.mjs`, log `qa/gate/dom.log`, FAILS 0.
     - In each of the 21 live versions: 61–70 referenced ids, all resolve; 0 duplicates.
     - 100 controls each changed the DOM when used, or are valid tel, external or anchor links (anchors land within 140 px).
     - Helper picker 4/4; chrome links 6/6. The one form (Towns V3) has a working submit handler. Console errors 0.
     - Overflow at 375: 0, per `sweep.mjs` and `secqa`.
  7. **Companion:** `qa/compint.log` 42/42 plus variants, Off, H key, text field, press, page-leave, first paint, touch and reduced motion (Phase 5). Reduced-motion pass `qa/scripts/rmgate.mjs`, log `qa/gate/reduced.log`: 42/42, meaning no infinite CSS or GSAP animation running, no Lenis, no companion, overflow 0 and errors 0, in every version at both widths.
  8. **Constellation untouched:**
     - Method (a): source. `constellation()` SHA-256 e7d174cd… is identical to e685bee. The `.pv1` rules match e685bee line for line, and no proof file has changed since the Phase 2 commit.
     - Method (b): pixels. `constel.mjs` renders the V1 stage in the e685bee build and in the current build with Math.random ≡ 0.5, reduced motion and overlays hidden. Diff bbox None, max 0, at 1440 and 375, after the Phase 5 changes.
  9. **Weight:** `qa/scripts/weightgate.py`, log `qa/gate/weight.log`.
     - Total 1506 KB (951 KB gzip).
     - Code 435 KB: markup 72 + CSS 91 + JS 271, of which the libraries (GSAP core, ScrollTrigger, DrawSVG, Flip, CustomEase, Lenis) are 160 KB. Gzipped: 134 KB.
     - Media 1072 KB: 10 data URIs, each stored once. The six job photos sit in Work's live V1 (920 KB, under the 1 MB per-group threshold) and are reused by the hero and family templates; the team photo is 67 KB, the font 27 KB, plus the logo and favicon.
     - One scroll engine (Lenis). No GSAP pins. Sticky is used only by two column headings and the owner's picker rail.
     - MorphSVG, three.js and jQuery are absent.
     - Code is over F18's ~330 KB band; flagged in the report with its cause, which is three versions of every section in one file.

---
## Under BRIEF-FULL-v2.md (2026-10-30)

### v2 Phase 0: bearings and setup
- **Brief:** saved verbatim as BRIEF-FULL-v2.md. It supersedes BRIEF-FULL.md.
- **Bearings, step 0 (the file wins):**
  - The last 15 commits run from the V7 delivery through Phase 0–6 commits to 2f8b957 ("Phase 6 and the §12 gate …").
  - The committed `rembrandt/v5/rembrandt-homepage.html` is byte-identical to a fresh build from source (SHA-256 4c149d14… both).
  - Spot greps: 7 `data-section` hosts; versions 2 and 3 as templates for every section; `constellation()` e7d174cd (unchanged); facts gate 0 fails.
  - The screenshot pass is the existing 42-shot set and contact sheets `qa/gate/sheet-{1440,375}.jpg`, made from this same file (hash unchanged since).
  - **Correction to the operator state:** §0 says Phases 1–3 were done and Call was in progress. The file and the commits show all of Phases 1–6 committed and the v1 §12 gate passed. Call was finished in 1dea70b. SECTIONS.md (21 YES, S1–S7 YES) matches the file, so the state files needed no correction.
- **Merge:** `origin/claude/hrm-presentation-slides-xag1ax`, re-upload head 4bf6bee, merged. Its content is identical to the copy merged before (empty diff from the merge base), so no file changed.
- **Raw skills:** reassembled `cat part-00 … part-06`: 22,368,518 bytes, SHA-256 fe81307bc11935af8dc54870325aaccf917a0284d9ffeab6b7d833dec36d22b6. PASS.
- **New in v2, to be done:**
  - (a) The binding full read of BANK-MAP.md, then atlas part 1, then atlas part 2, A to Z.
  - (b) §14's three binary verdicts per version: facts grounded, reference-intent match, generic feel. A version with a wrong verdict is not done, so the v1 "complete" status is held open until every version is graded.
  - (c) The §12 gate rerun on the final file.
- **Phases 1–6 skip rule (§10):** each phase's v1 done-criteria evidence stands (logs in `rembrandt/v5/qa/`). The phases are not rebuilt, but every version is re-graded after the full read, and any version that fails a verdict is reopened.

### v2 full read: complete (ADDENDUM record)
- **Files read completely, A to Z, in this order:**
  1. `bank-index/BANK-MAP.md` (7,475 lines)
  2. `bank-index/atlas-part-1-skills.md` (14,247 lines)
  3. `bank-index/atlas-part-2-bank.md` (8,829 lines)
- **Notes and resume markers:** `READ-DIGEST.md`. All three markers read COMPLETE.
- **Where each section's shortlist now comes from.** Map = BANK-MAP.md line ranges; A1 = atlas part 1 line ranges; A2 = atlas part 2 line numbers.
  - **Hero:**
    - Map Part II and 1200–4888 hero rows.
    - A1: S0095 page system (451–1839); S1303 tastemaker (12266–12327); S1321 halo / S1323 trail (12328–12501).
    - A2: anatomy §1 F1/F2/F3 + checklist 1–3 (6022, 6107–6131); Stronghold DEEP (6346); Strike Force eyebrow (6450); P73 word rotator (4887); smeulders hero order (4139); P01/P02 reveals (4253–4269).
  - **Reviews/proof:**
    - Map Part II proof rows.
    - A1: S1200 AggregateRating, S1262 trust signals (10730–11682).
    - A2: anatomy §2 + §5 + checklist 8/14/18 (6031, 6058, 6170, 6224, 6260); Georgia CG glance table (6553); count-up code (4018); True Focus #300 (2930); siding proof hierarchy (6509); credential as giant type (5542). The Constellation stays.
  - **Work:**
    - Map Part II work rows.
    - A1: S1324 reveal-hover, S1330 slider aria (12502–12692).
    - A2: anatomy §7 before/after (6077); CMK hand-rolled slider (8791); blinds S15/P06/P23 (5133, 4298, 4457); Eleos column shutter S29 (5255); lightbox ladder S33 (5287); AKLR filter counts #321 (3074); checklist 11 (6197).
  - **Family:**
    - Map Part II and 2800–4888 family rows.
    - A1: S0944 author-expertise (8610–9015 run).
    - A2: Bakstad #319 (3056); Murray Lampert (6562); Georgia CG (6553); CSS 3D timeline #356 (3367); Raffael Stüken disclosure (4130); Scroll Reveal #292 (2885).
  - **How it works:**
    - Map Part II process rows.
    - A1: S1325 timeline, S1340 towers (12502–12692); S1352 / S1357 (12693–12965).
    - A2: Here Comes The Sun #549 + code (3855, 4112); gsap-pin-sidebar code + P78 (4211, 4929); checklist 4 (6134); NVRMND / Hyper Effekt numbered verbs (3601, 3110); builder brief pin rules (6691); 98-silo explode (4103).
  - **Towns/area:**
    - Map Part II towns rows.
    - A1: S1128 LocalBusiness, S1146 NAP, S1214 service-area (10367–11682).
    - A2: checklist 12 no city-swap (6206); West London postcode checker (6376); KBF place-first index (6616); ROTTLER finder (3693); Curved Loop #281 (2840); CSS / GSAP marquee (3412, 4220); MotionPath P32/S48 (4540, 5409); S24 S-curve (5215).
  - **Call/close:**
    - Map Part II call rows.
    - A1: S1441 Fitts, S1452 peak-end (13245–13622).
    - A2: anatomy §6 + checklist 10 (6067, 6188); West London "what happens when you call" (6376); [114] giant-type CTA (5818); Shazam morph (4054); availability block, true only (5641); Ski School hours beside phone #489 (3639); Lory pulsing badge #404 (3547).
  - **Page systems:**
    - A1: S1474 parallel-concepts / S1502 fingerprint (13971–14247); S1320 one scroll engine (12328–12501).
    - A2: F17/F18 + checklist 19/20 (6085, 6269, 6278); builder brief cost lab and standing standards (6691); cross-site rules (4605); cursor rule with the system cursor kept usable (5533); anti-pattern of scene pages and loaders (5515).
- **Next:** task #30, the verdict audit of 21 versions × 3 binary verdicts against this shortlist.

### v2 verdict audit (task #30)
- **Method:** each version graded against §14's three binary verdicts.
  - **Facts grounded:** visible text extracted from every `v*.html` and read against §3; links checked (search URLs only, no fabricated profile URLs).
  - **Reference-intent match:** TRACEABILITY.md row vs the build and the full-read shortlist.
  - **Generic/default feel:** both contact sheets (`qa/gate/sheet-{1440,375}.jpg`) judged against the bank's anti-generic lenses (S0095, S1474, F17) and the §5 bans.
- **Failures found (2):**
  - **Work V2:** a sparse 4×4 lattice, ten empty cells, a checkerboard at 375. It read as unfinished. Upgraded: commit 34a6e0a.
  - **How V3:** an icon-topped three-card row, the default "how it works" composition. Rebuilt: commit de5899f.
  - Both now pass with evidence (TRACEABILITY.md).
- **Verdict table (after fixes):**

| Section | V | Kept / upgraded / rebuilt | Facts grounded | Reference-intent match | Generic feel |
|---|---|---|---|---|---|
| Hero | 1 | rebuilt (P1) | YES | YES (⟦S0534⟧ tile depth field + sweep, shingle cells) | NO |
| Hero | 2 | rebuilt (P1) | YES (C11: "written estimate" link label) | YES (Variable Proximity gaussian + idle wave) | NO |
| Hero | 3 | rebuilt (P1) | YES (24 pack towns) | YES (#289 + P73 timings) | NO |
| Reviews | 1 | kept, untouched | YES (Constellation's own wording; see flags) | YES (owner-kept) | NO |
| Reviews | 2 | upgraded (P2) | YES (search links only) | YES (Cenco Verify + KBF caveat) | NO |
| Reviews | 3 | rebuilt (P2) | YES | YES (Count Up roll mode) | NO |
| Work | 1 | upgraded (P3) | YES (ba2 only before/after) | YES (Q361 horizontalLoop) | NO |
| Work | 2 | upgraded (P3, again in audit) | YES | YES (Q157 push via tracks, Q147 cap) | NO (was YES: fixed) |
| Work | 3 | upgraded (P3) | YES (ba2 pair) | YES (Q38 blinds as courses) | NO |
| Family | 1 | upgraded (P4) | YES | YES (Q95 Masked Heading) | NO |
| Family | 2 | upgraded (P4) | YES | YES (⟦S1327⟧ word scrub) | NO |
| Family | 3 | upgraded (P4) | YES (address, §3 facts) | YES (⟦S1362⟧ wireframe annotation) | NO |
| How | 1 | upgraded (P4) | YES (C11) | YES (⟦S1325⟧ spine) | NO |
| How | 2 | rebuilt (P4) | YES (C11) | YES (UZIK live CSS) | NO |
| How | 3 | rebuilt in audit | YES (C11) | YES (Q409 trail, Q411 verbs, Signal-A rows, S18) | NO (was YES: fixed) |
| Towns | 1 | upgraded (P4) | YES (Census, sourced on page) | YES (Austin Pro map) | NO |
| Towns | 2 | upgraded (P4) | YES (ACS, sourced on page) | YES (Q4 metric-led cards) | NO |
| Towns | 3 | upgraded (P4) | YES | YES (ROTTLER finder / West London checker) | NO |
| Call | 1 | upgraded (P4) | YES (C11; hours computed, never "open now") | YES (F9/F14 + OFFF wordmark + gooey drops) | NO |
| Call | 2 | upgraded (P4) | YES (C11) | YES (Shazam morph timings) | NO |
| Call | 3 | upgraded (P4) | YES (C11) | YES (Q114 giant marquee, 60 s) | NO |

- **Flags carried to the report:**
  - The Constellation's caption says "BBB A+ since 2001" and "$2M liability cover". §3 wording is "accredited since 2001" and "liability insurance", but the Constellation is untouchable by rule 4.
  - Code weight is over F18's band.
  - C11: the estimate claim and the Census data.

### v2 §12 gate rerun on the final file (task #31)
1. **Facts grep:** PASS, 25 checks, 0 fails (`qa/gate/facts.log`).
   - 353-9711: 0. "24/7": 0. Licence: 0. "295" ×4, "4.9" ×5. Quotes and reviewer names: 0.
   - Every tel link is +19377467377. The address is verbatim.
2. **Banned patterns:** PASS (`qa/gate/facts.log`). No Job Ticket, FAQ, service picker, bento, estimate paper, leak story, proof strip or skeleton sequence; no named roof-layer lists.
3. **Traceability audit:** 3 rows drawn at random (`random.seed(20261030)`): Towns V3, Work V2, Call V3. Their cited references were re-opened in the atlas:
   - **Towns V3:** ROTTLER at atlas2 3693 is a town/postcode finder ("finder ×2"); West London at 6376 is a postcode coverage checker. The row's instant answer plus not-on-the-list state matches.
   - **Work V2:** P80 at 4945 (Flip.from, scale, prune, 0.9 s, expo; push classes move items to edges) and S51 at 5433 (path morph on hover, back-out). The row matches and states its one deviation, push on tracks.
   - **Call V3:** Q114 at 2188 is a giant-type email marquee footer CTA (60 px phone → 272 px desktop; hover colour swap 300 ms). Q161 at 2487 is a seamless marquee. The Stronghold 60 s token is at 6346. The row matches.
4. **Switchers:** PASS, 63/63 runs "swaps only <section>; overflow 0; errors 0" at 1440, 375 and 1440 reduced (`qa/gate/switchers.log`). DOM gate: 21/21 labels change their own section.
5. **Screenshots:** all 21 versions at 1440, 375 and 1440 reduced, re-shot (`qa/<sec><v>-*.jpg`).
   - New contact sheets `qa/gate/sheet-{1440,375}.jpg`, built by `qa/scripts/sheets.py`.
   - Compared against §4. The audit found two defects, Work V2 (sparse) and How V3 (generic), both fixed. Also found in checks: the Work V2 phone open state used desktop tracks, and the How V3 icon slid onto its text. Both fixed.
6. **Console 0, overflow 0, ids, controls, forms:** PASS, 0 fails (`qa/gate/dom.log`).
   - The gate first failed on Work V2's Close (0 mutations). Close only renders while a photo is open, and the gate clicked it after the six photo toggles had left the grid closed.
   - The gate now opens a photo first for controls inside a `[hidden]` block, and Close passes (478 mutations). `workint.mjs` had already shown it closing the photo.
7. **Companion and reduced motion:** `qa/compint.log` FAILS 0 (42 version × width runs, variants, touch, reduced). `qa/gate/reduced.log` FAILS 0.
8. **Constellation untouched:**
   - Pixels: `constel.mjs` diff bbox None, max 0 at 1440 and 375 against the e685bee checkpoint.
   - Source: `constellation()` body brace-matched and SHA-256 hashed, identical at e685bee and HEAD (752e073b…). This hash method differs from the earlier e7d174cd one, which hashed a different slice; both show identity.
   - `proof/v1.html`, `gl.js` and `spring.js`: 0 diff lines.
9. **Weight:** 1509 KB total (951 KB gzip). Code 437 KB (markup 75 + CSS 92 + JS 271; 134 KB gzip). Media 1072 KB in 10 URIs. One scroll engine (Lenis); 0 ScrollTrigger pins; no MorphSVG, three.js or jQuery (`qa/gate/weight.log`).

## R3: audit feedback pack (2026-10-30), running status
- **Challenge log:** AUDIT-R3.md. **Traceability:** TRACEABILITY.md "R3" (rows before code; QA rounds per section).
- **Infrastructure (d68ffc0):**
  - B1 to B3 backups sit in `src/sections/<id>/bk/`, with frozen helpers in `src/js/frozen/`.
  - All 42 are pixel-identical to the pre-round file (`qa/gate/r3-backups.log`).
  - Each picker shows 1 to 5, a "more" button for the backups, and the B key.
  - Defaults are the winners: hero 2, proof 2, work 1, family 1, how 3, area 3, call 1.
- **Page systems:**
  - Tokens: --cream, --on-dark-2, --t-hero / --t-h1 / --t-h2 (48/700) / --t-mark / --t-label.
  - Hover gated; phone arcs and .97 press; switcher motion.
  - Companion: springs, blink, 8 data-c signatures, label removed.
  - Helper yields (250ms re-check). Dividers per boundary. Cursor effects retired.
  - Focus ring: ink on light grounds, sun on dark (`data-tone`).
- **Cadence lock:** hero cream / proof ink / work sky / family ink / how sky / area ink / call blue / footer ink.
- **Done:**
  - Hero 274e55c: V1 to V3 fixed, V4 Stitched, V5 Poster, 10 rounds.
  - Reviews 4678046: V1 to V3 fixed, V4 Office wall, V5 Seal, 10 rounds.
  - Work 106f4fd: V1 to V3 fixed, V4 Two jobs, V5 Job index, 10 rounds.
  - Family 932faa7: V1 to V3 fixed, V4 Three cards, V5 Editorial panorama, 10 rounds.
  - How 99d0a50: V1 to V3 fixed, V4 One house three states, V5 Three artefacts, 10 rounds.
  - Towns 95ba8a4: V1 to V3 fixed (V3 grafted ring map), V4 Distance ruler, V5 Eight directions, 10 rounds.
  - Call and footer b5f7690: V1 to V3 fixed, V4 Keypad, V5 Office status, footer as one NAP row, 10 rounds.
- **Final gates (logs in `qa/gate/`):**
  - facts PASS; dom 35/35 and switchers 35/35; sweep 25/25 runs clean; reduced 70/70; companion 70/70 (`qa/compint.log`); bkui PASS; weight 1789 KB (code 718 KB, 171 KB gzip).
  - Gate scripts now cover 5 versions. compint checks for "no effect layer", because the per-section cursor effects are retired. domgate clicks each section's default label last.
- **Backups, final:** after every pass, 36/42 have an identical mounted DOM and computed style. The 6 others differ only in image attribute order (same bytes) or a random filter id. Pixel noise is sub-pixel edge AA from the new divider frame (`qa/gate/r3-backups-final.log`; `bkdom.mjs`, `bkimg.mjs`, `bkcheck.mjs ... stage`).
- **Part H:** REPORT-R3.md. Nothing is marked shipped; the file goes back for the screenshot audit.
- **QA tools** (copy them to the scratchpad v7 to run):
  - `qa/scripts/r3qa.mjs <sec> 1,2,3,4,5`
  - `occl.mjs <sec> <vs>`
  - `look.mjs <w> <query> <out> <sec[@off]>` (scratchpad only)
  - `bkui.mjs`, `bkcheck.mjs`, `bkdom.mjs`, `bkimg.mjs`, `pixdiff.py`, `heroR.mjs`, `proofR.mjs`, `workR.mjs`, `famR.mjs`, `howR3.mjs`, `areaR.mjs`, `rulerR.mjs`, `callR.mjs`
  - page gates: `domgate.mjs`, `sweep.mjs`, `rmgate.mjs`, `compint.mjs`, `weightgate.py`
  - `factsgate.py`: only B1 is exempt from the BBB wording.

## R4 consolidated master directive (2026-10-30), Phase 0 note
- **Accent:** Rembrandt orange, `--a500` #ff5a1f, with tints `--a50` to `--a800`; orange words on white use `--a700` #b53a0e. **Why it fits:** a warm, energetic, workmanlike colour (safety orange, a lit window, a sunlit roof). It belongs to a hands-on family trade, reads as lively, and gives black text 5.9:1 on a filled button. **Accent2: none.** Orange carries every CTA; on the orange Call band the button inverts to black.
- **Logo concept:** Rembrandt was a painter, so the roof is a single confident orange brushstroke shaped as a gable, set over a solid black "R", with the full name as the wordmark (Poppins). Files: `assets/brand/logo.svg`, `assets/brand/mark.svg`; favicon rendered from the mark.
- **Dark visible sections before Phase 2:** Reviews (all five on ink), Family (V1 to V3 on ink), Towns (all five), Storm and Insurance (all five, on blue), Call (all five, on blue), the footer, plus dark cards and the version pickers. **After Phase 2:** none. Call is the one vivid orange band.
- **Rule 1 amendment (deep green):** none used. A green ground would bring a second hue next to the orange accent and break the one-colour world. Light grounds plus the single orange band carry the depth. Reconsidered per section in Phase 3; any use will be logged here.
- **Bespoke interactive concept:** "How many squares is your roof?" A roofer's own measure (one square = 100 sq ft of roof): the visitor sets the house footprint and drags the roof pitch on a live drawn gable, and the drawing and the square count update together. Pure geometry, no prices, no promises.
- **Phase order:** 1 logo; 2 palette, tokens and light; 3 design upgrade per section in page order; 4 the squares calculator; 5 version expansion (current five move to backups, then 5 improved + 3 new per section); 6 the remaining pages (Contact, then the redesign of Services and About).
- **Collisions logged:** the old pack's "embed the exact logo bytes" rule yields to the owner's logo redesign (owner instruction, later and specific). Hidden backups keep their old palette and logo-free markup through a scoped `.sec.on-bk` token block, so their source stays byte-identical.
- **Phase 4 done: "How many squares is your roof?"** (Services V1, under the one-house drawing). The visitor drags the ridge of a drawn gable, or uses the pitch slider, and sets the footprint length and width; the roof redraws and the count of roofing squares updates. It is geometry only, sqrt(1 + (pitch/12)^2) × footprint ÷ 100, with a note that real roofs add overhangs and waste and that the written estimate measures yours. **Why only a roofer has it:** squares are the roofing trade's own unit of measure. End-to-end test (`qa/gate/r4-squares.log`): the drag, both sliders and the keyboard each give counts that match the geometry; 0 errors.
- **Phase 5 infrastructure:**
  - **New backups:** the pre-redesign versions (commit 2ee2693) are now hidden backups B4-B8 in every homepage section, made by `build/mk-bk2.py`. They are verbatim except the class prefix (hx becomes chx, and so on) and helper paths that point at frozen copies (`js/frozen/fx2.js` is fx.js as it stood at 2ee2693).
  - **Rendering:** every backup gets the old palette back. B1-B3 also keep Epilogue (`.on-bk-old`).
  - **Wiring:** the build, the URL (`?v=hero8`, `?v=heroB8`), the 1-8 keys and the pickers handle 8 visible versions and 8 backups.
  - **Check:** `qa/gate/r4-bkopen.log` shows every backup opening.
  - **Gap, reported:** Services and Storm were created in R4 and have no earlier generation, so they hold 5 genuine backups (B4-B8), not 8. Nothing is fabricated to fill B1-B3.

### R4 directive: Phases 5 and 6 complete, and the FINAL GATE (evidence in `rembrandt/v5/qa/gate/r4-final-*.log`)
- **Phase 5 done:** every homepage section shows eight versions (V1-V5 improved, V6-V8 new), each committed per section with traceability rows written before the code and an interaction test where the version is interactive (`qa/scripts/howtest.mjs`, `stormtest.mjs`, `areatest.mjs`, `calltest.mjs`, plus the earlier work and services tests).
- **Phase 6 done:** four pages, Home, Services, About and Contact (fewer is better; every service is on Services). Services and About gained the redesign layer: label, contour art, and a drawn roofline header. They also gained backups B4-B8, their pre-redesign layouts from 2ee2693. Contact is new and has five layouts: phone first, by distance, week board, business card, and town checker. It has no form and makes no "open now" claim.
- **Deep green (amended Rule 1):** used on no section of any page. Reason as in the Phase 0 note: one colour world, with orange as the only hue.
- **Final gate:**
  1. **Token check** (`r4-final-tokens.log`): 20 colour tokens are declared in `:root`. 51 hex literals appear outside it. Every one is a token value except 10, and none of those 10 is a UI colour:
     - 7 are bank reference numbers in comments (#171, #279, #317, #319, #362).
     - 2 are an alpha mask (`#000` in `mask-image`, Family V3).
     - 1 is an offscreen canvas that is only sampled for alpha (Reviews V1 glyph).
  2. **Light check** (`r4-final-browser.log`, `qa/scripts/finalgate.mjs`): all 87 visible versions were checked (homepage 9 sections x 8, plus 3 pages x 5). There are 0 black or near-black grounds and 0 large dark panels. The lowest ground is the orange accent band on Call (relative luminance 0.287). Deep-green grounds: none.
  3. **Logo:** the header, the footer and the favicon (data PNG) carry the logo on all four pages.
  4. **Facts** (`r4-final-facts.log`): FAILS 0 on all four pages. 353-9711, 24/7 and "licen" each occur 0 times in every file. Every Storm version (1-8) says the insurer decides the claim. The only "claim approved" sentences are struck through: Storm V3 and its backup B6.
  5. **Integrity:**
     - Every homepage section has 8 visible versions switching 1-8 (87 of 87 mount at the right version).
     - Backups B1-B8 exist for 7 sections, which makes 16 versions each.
     - Services and Storm have B4-B8 only (13 versions each). They were born in R4, so they have no B1-B3 generation, and nothing was fabricated to fill those slots.
     - Pages: Services and About have 5 visible and 5 backups (10 each). Contact has 5 visible and 0 backups, being new.
     - `r4-final-bkopen.log`: 66 of 66 existing homepage backups open. The 6 "BAD" rows are the absent Services and Storm B1-B3. `pagebk.mjs`: 10 of 10 page backups open.
     - Nothing deleted: `git log --diff-filter=D d2c171b^..HEAD -- rembrandt/v5/src` is empty.
  6. **Bespoke interactive** (`r4-final-sqtest.log`): the roof squares calculator matches the geometry on drag (pitch 12, 21.2 squares), on the footprint sliders (80x40, 45.3 squares) and on the keyboard (minimum pitch, 33.0 squares), with errors 0. More business-only interactives in the new versions: the truck drive (How V6), the after-storm checklist (Storm V6), the damage spotter (Storm V7), the radius slider (Towns V7), the tear-off flyer (Call V7) and the town checker (Contact V5).
  7. **Commits per phase:**
     - Phases 1-2: d2c171b.
     - Phase 4: fbb874a.
     - Phase 5 infrastructure: 8b27202.
     - Phases 3 and 5 for Hero, plus the label and art layer: 8f2beec, ef232f4.
     - Phase 5 per section: fb90299 (Reviews), 0c85031 (Services), 8f479df (Work), 5f9a300 (Family), ca6833f (How), 722b613 (Storm), 488c4fe (Towns), b75a84e (Call).
     - Phase 6: 42c782f (page backups), 8b91cd7 and 4815584 (page redesign layer and label fix), fb2af11 (Contact), 6e1dc0a (facts gate scope).
- **Open, reported, not hidden:**
  - Pixel drift on Towns B1 and Call B1 after the font change (logged earlier).
  - Services and Storm have no B1-B3.
  - Contact has no backups.
  - Merging versions stays parked, as ordered.

## R5 owner order: full-site QA, improve and finalize (2026-10-30)
### How the owner clarification on inner pages is applied (inner pages are versioned per SECTION)
- Each inner page becomes a set of sections, and each section has five genuinely different versions, its own 1-5 switcher and the hidden-backup mechanism, exactly as on the homepage:
  - **Services:** `sphero` (page head, H1) > `svcp` (the six services) > `spclose` (the call close).
  - **About:** `abhero` (page head, H1) > `about` (the family and the record) > `abclose` (the call close).
  - **Contact:** `cthero` (page head with the phone and hours, H1) > `contact` (the office and the 24 towns). Two sections are enough here: the page has two jobs.
- **Where the versions come from:** the five whole-page layouts are decomposed, so nothing is lost.
  - Their bodies become the five versions of `svcp`, `about` and `contact`. Those sections keep their ids, so their existing backups (B4-B8, pre-redesign) stay attached and byte-identical.
  - Header and close variants feed the head and close sections. New versions are written where five distinct ones did not exist.
- **Nothing deleted:** the five whole-page layouts as they stood before this restructure (R4 final, 45ad7a2) are kept as hidden backups B1-B5 of each page's head section (`sphero`, `abhero`, `cthero`). They use a frozen, prefixed copy of their CSS and JS (`build/mk-bk3.py`, class prefix sp/ab/ct becomes esp/eab/ect), so later improvements cannot reach them.
  - Opening one shows the old whole page in the head slot (it carries its own H1). They are records, not states the page ships in.
  - The close sections are new and have no earlier generation, so they carry no backups; this is reported, not faked.
- **Facts:** the same locked fact lists in `build/gen-pages.py` feed every version. Merging or mixing versions stays parked.

### R5 final report: full-site QA, improve and finalize
**Method.** First a mechanical sweep: `qa/scripts/fullqa.mjs`, run over every visible version of every page at 1440 and 375. It checks:
- overflow and console errors;
- WCAG contrast of every text node against its real ground;
- the 12px type floor;
- 44px touch targets;
- clipped text, broken images and heading order.

Then a design review of all 72 homepage versions and all 40 inner-page section versions (section sheets at 1440 and 375). Every finding was challenged against the WEB-SKILLS judging notes (`state/web-skills-judging-notes.md` §3) before acting.

**Issues found and fixed** (commits 6ca94df, 1e1938a, 3dc1b52, 90a50a4, plus the gate commit):
- **Invisible text left by the light flip** (1.08-1.20:1, P0):
  - Reviews V3 "Platinum"; Work V2 photo tags; Work V4 Before/After pills; Storm V2 "Now"; Storm V4 captions.
  - Fix: ink or accent-700 text.
- **Orange as small text** (3.12:1 on white, 2.6-2.9:1 on tints; §3.4 AA 4.5:1). About a dozen places:
  - check links, "Show all 24", Family figures and call links, Storm accents, Towns V6 counts, Services page ledes.
  - Fix: `--a700` (4.9-5.9:1) or `--a800`.
- **Below the 12px floor:** Call V4 keypad letters; Reviews V5 ring text on phones (now 12px minimum).
- **Footer phone link:** a 21px-tall target on phones; it now has a 44px hit area, with no layout shift.
- **Brand label stealing a grid cell** (S0650 layout), the same R4 bug in two places:
  - Storm V2: the title had slid under the picker.
  - Services V4 head: already fixed in R4; the scan (`labcell`) finds no others.
- **Off-token colour the hex-only check missed:** 40 `oklch()` and 9 `rgb()` old-palette navy and gold literals in shadows, glows and underlines.
  - Now `--black` alpha, neutral-token mixes or accent mixes.
  - The new `qa/scripts/tokengate.py` scans hex, `rgb()`, `hsl()` and `oklch()`.
- **Towns V1 map labels:** white text on an ink halo (dark-ground leftover), smudged on the light map. Now ink on a paper halo.
- **Inner pages:** pickers sat over content (body and close sections now open at the 4.5rem phone minimum). The Contact card was too short on phones. The Contact week-scale labels collided.
- **Regression of my own, caught in R5 and fixed:** a custom property named `--sun` (the accent token's name) blanked Storm V5's call button, in motion only. The final browser gate now runs with motion and checks that every visible button keeps its ground.

**What each homepage section came out with (IMPROVED, not only fixed):**
- **Hero:** headline phrases no longer carry a colour accent in V2/V6/V7/V8 (S0220 #7, an S0001 tell); the accent lives in each version's artwork and call. V3's orange slot stays: it is the rotating town mechanism, not decoration.
- **Reviews:** V1's 4.9 now reads at a glance. A filled 4.9 in the lightest tint fades in under the 295 stars; before, the 9 read as an "e". V2/V5 check links and the V3 "Platinum" word are now legible.
- **Services:** V8's third panel is a drawn wall (lap siding, trimmed window, fascia, gutter, downspout) instead of faint stripes, and it re-crops correctly when the panel opens. V5 copy is no longer a scroll cue (S0650). Old navy shadows are now token shades.
- **Work:** V2/V4 photo tags and pills are readable. V5 gives touch screens large thumbnails at every width, and drops "point at a row" where there is no pointer.
- **Family:** V4's three identical, empty cards (S0001 card-kit trait) each carry a drawn era glyph (hammer, house, handset) and a folded corner that says the card turns. V8 drops the "Scroll to climb" cue. Labels never wrap (V5 label). The V1/V3/V5 figures meet AA.
- **How it works:** V1/V2 headings no longer echo their own label. V5's three equal cards (S0650 3-equal-cards ban, flat hierarchy) became 1:1:1.7, with the new roof leading.
- **Storm & Insurance:**
  - V2's title and 19 are back in their own cells, and the "Now" tag is visible.
  - V4 captions are readable.
  - V5's window was an empty pane at rest; it now looks onto rooftops, and the sun comes out as the rain clears.
- **Towns:** V1 map labels are crisp ink on paper, and the chosen town turns accent. The town card and the V2/V5 cards moved from a grey ink tint to the accent tint (S0650 colour consistency). V6 counts meet AA.
- **Call:** V8's phone is a drawn receiver lifted off a desk-phone base, with the cord running from handset to base (it was a blob). V4 keypad letters meet the type floor.
- **Motion:** card flip 600ms became 400ms; Services V8 panel expand 450ms became 350ms (S0063 duration budgets). Everything else was checked and is within budget or deliberate (scroll reveals, spring arrivals).

**Inner pages (owner clarification).** Each page is now a set of sections, each with five versions, its own 1-5 picker and backups. See the note above. The three page heads and two closes are new designs:
- Services head: type and roofline; photo strip; promise checklist; photo with title card; six-icon contents strip.
- About head: type; crew panorama; Bunk and Wade split; drawn 1995; three faces.
- Contact head: giant number; turning card; week board; accent panel; three lines.
- Closes: card; accent band with the number; Rachel; phone-message slip; photo with facts.
- Contact's body gains a distance-band tablist (V3).

**Deliberately left, and why:**
- **Brand labels above section headings.** The owner's directive required the brand label in every section, which wins over S0650's eyebrow ration. They are sentence case, not tracked caps (S0220 #6 allows that).
- **The Call V1 hollow REMBRANDT wordmark** (measures 1:1): a decorative `aria-hidden` duplicate.
- **The Reviews V5 star glyph** (3.12:1): a graphic, which needs 3:1.
- **Work V3 at rest:** it shows a small side-by-side pair under reduced motion, but with motion it is the full-width compare slider. Left as is.
- **Towns V1 ring:** a few label pairs sit close at the 15-20 mile ring; their positions are the towns' true bearings, so moving them would misstate geography.
- **Accent bands:** the orange band on most Call versions is the one committed accent ground, allowed by the directive.
- **No backups for the close sections and Contact's area section:** they have no earlier generation, so nothing was faked.

**Late findings from the final click-through** (fixed in the gate commit):
- **A genuine shortcut bug (`qa/scripts/keytest.mjs`):** clicking a picker label focused its radio. The page's keyboard handler ignored every key while any input had focus, so after a click the 1-8 and B shortcuts went dead until the visitor clicked elsewhere. Now only text-entry fields swallow the shortcuts.
- **Contact head V3:** the closed days' text was `--n500` on the tint (3.39:1), now `--n700`; the "Now" tag rose from 11px to 12px.
- **Contact head V4:** the brand label was accent on the accent panel (1.88:1), now black.
- **Close V5:** the phone links now have 44px hit areas.

**Fresh gate evidence** (`rembrandt/v5/qa/gate/r5-final-*.log`):
- **Tokens** (`r5-final-tokens.log`, `qa/scripts/tokengate.py`):
  - 20 declared tokens; scanned 51 hex, 125 rgb(), 0 hsl(), 0 oklch() (40 oklch removed this round).
  - 4 exceptions, none a UI colour: 2 alpha masks, 1 offscreen canvas sampled for alpha, 1 bank reference number in a comment.
- **Light** (`r5-final-browser.log`, run with motion):
  - 87 visible versions: homepage 9 sections x 8, Services 3 x 5, About 3 x 5, Contact 2 x 5 (one page load per version number).
  - 0 black or near-black grounds, 0 large dark panels, 0 deep-green grounds. The lowest ground is the orange Call band (luminance 0.287).
  - Every visible button keeps its ground.
- **Logo:** header, footer and favicon on all four pages.
- **Facts** (`r5-final-facts.log`): FAILS 0 on all four pages; 353-9711, 24/7 and "licen" occur 0 times; all eight Storm versions say the insurer decides.
- **Integrity:**
  - Homepage: 7 sections at 8 visible + 8 backups = 16; Services and Storm at 8 + 5 = 13 (they have no B1-B3 generation).
  - Inner pages: sphero, abhero and cthero at 5 + 5; svcp and about at 5 + 5; spclose, abclose and contact at 5 + 0.
  - Backups open: 66 of 66 existing homepage backups (`r5-final-bkopen.log`; the 6 "BAD" are the absent Services and Storm B1-B3); 25 of 25 inner-page backups (`r5-final-clickthrough.log`).
  - No existing backup file changed or was deleted in R5 (`git diff --name-status 45ad7a2..HEAD -- '*/bk/*'` shows only additions), and no source file was deleted.
- **Switchers** (`r5-final-keys.log`): all 17 sections switch by number key and by picker click; keys past a page's fifth version change nothing; B shows the backup buttons on every page; errors 0.
- **Interactive click-through** (`r5-final-clickthrough.log`), errors 0 everywhere:
  - The roof squares calculator: drag 21.2, sliders 45.3, keyboard 33.0, all matching the geometry.
  - The How truck and work order; the Storm checklist and damage marks.
  - The Towns radius, quilt and signs; the Call door and tear-off.
  - The Contact card, week board, distance bands and town checker.
- **Sweep** (`r5-final-sweep-all.log`, `r5-final-sweep-pages.log`, every visible version at 1440 and 375):
  - Overflow 0, errors 0, one H1 per page.
  - Left items are the judged residuals listed above (decorative wordmark, a star graphic at 3:1, inline text links, and the footer phone link, whose hit area the scanner cannot see).

## R6 rebrand directive (2026-10-31): brand sheet

The owner scrapped the R4/R5 orange palette ("the colours hurt his eyes") and the old logo. Only the brand layer was rebuilt:
the logo, the colour system and the text hierarchy on top of it. Structure, versions, switchers, interactives and facts are
unchanged; hidden backups are byte-identical (`git diff --name-status 2e9bd16~1 -- '*/bk/*'` lists no modified or deleted
file). Step 0 reading: brand ⟦S0011⟧, better-colors ⟦S0071⟧, color-system ⟦S1418⟧, law-of-closure ⟦S1422⟧, design-token-contrast
⟦S0248⟧, visual-hierarchy ⟦S1434⟧, von-restorff-effect ⟦S1435⟧, animation-principles ⟦S1436⟧, critique-brand-consistency
⟦S1496⟧, critique-color ⟦S1497⟧ (from the reassembled WEB-SKILLS.md, read as data). S0248's bundled checker was not run (bank
code is never run); its method (every foreground token against every ground it sits on) is implemented in
`qa/scripts/contrasttable.mjs`.

### Logo (Step 1, law-of-closure ⟦S1422⟧)
- **Mark:** on a 48x48 grid, stroke 5, round caps, one colour. Two roof strokes stop short of each other at the apex (the eye
  completes the ridge) over an R whose bowl never returns to its stem (the eye completes the letter). Closure does the
  work, so the mark has no fill, no gradient and no detail finer than the stroke. That is why it holds at 16 px.
- **Wordmark:** Poppins 700 "Rembrandt" with Poppins 500 "Roofing & Restoration" in the secondary text colour, so the
  site keeps two families (standing rule).
- **Versions:** `assets/brand/mark.svg` (accent, teal-600 #347e7b), `mark-black.svg`, `mark-white.svg`,
  `logo.svg` (mark + wordmark).
  - The mark draws in `currentColor` inside the site, so it takes the accent in the header and footer.
  - It takes neutral ink in the section labels, and white or teal on the deep bands.
- **Sizes tested:**
  - Favicon (re-rendered at 64 px, read at 16 and 32 px).
  - Header 176 px, section label glyph 22 px.
  - The logo mark against the nav plate measures **4.76:1** (UI floor 3:1).
- **Replaced:** header, footer and favicon on all four pages, and the label glyph in every live version file that carries one (87 of the 112). The old
  logo, mark and favicon survive only in `assets/brand/archive-r4/` and in the hidden backups.

### Colour system (Step 2: better-colors ⟦S0071⟧, color-system ⟦S1418⟧)
- **Why teal (hue 192, verdigris):**
  - It is the patina of a copper roof, a durable roofing material.
  - It is the hue band the firm's own photographs leave empty. Chroma-weighted hue measurement of the live photos:
    - 105-135° (lawns, trees): 37%
    - 240-270° (sky, crew shirts): 37%
    - 30-60° (brick, shingles): 12%
    - 150-225°: ~0
  - So the accent never blends into a photo and never fights one.
- **Ramps:** computed in OKLCH by `build/mk-tokens.py`, never picked by eye.
  - The hue is held at 192 end to end. Chroma is a fixed 78% share of the sRGB ceiling at each lightness, tapered at both
    ends. The accent tops out at C 0.087, so nothing reaches the gamut edge (eye comfort).
  - The neutral ramp is tinted to the same hue at C 0.004-0.012.
  - The full table is in `brand/tokens.md`.
- **Two tiers:** primitives are named by hue + step (`--teal-600`, `--neutral-900`). Semantics are named by role
  (`--color-text`, `--color-accent-solid`, …). Components use only the semantic tier.
  - `qa/scripts/tokengate.py` reports 1535 semantic references, 0 primitives, 0 legacy names and 1 literal in live
    components.
  - The literal is `proof.js:39 #000`, an offscreen alpha mask, never painted.
- **Scopes:**
  - The deep scope (Call band, Services/About close V2, Contact head V4 panel, the Contact card's back) repoints the same
    semantic roles to the dark end. Its components need no second set of colours.
  - Backups render through a legacy scope that maps every semantic role back to its R4 value, so a backup still opens as
    the record it was.

**Token list (semantic tier; primitives in `brand/tokens.md`):**

| Role | Token → primitive |
|---|---|
| Grounds | `bg` neutral-50 · `bg-subtle` neutral-100 · `bg-sunken` neutral-200 · `bg-surface` white · `bg-inverse` teal-800 |
| Text | `text` neutral-900 · `text-secondary` neutral-700 · `text-tertiary` neutral-600 · `text-disabled` neutral-500 · `text-inverse` white · `text-inverse-secondary` teal-100 · `text-on-accent` white |
| Lines | `border-subtle` / `separator` neutral-200 · `border` neutral-300 · `border-control` neutral-600 · `border-strong` neutral-900 · `border-focus` teal-600 |
| Accent | `accent-subtle` teal-50 · `accent-subtle-hover` teal-100 · `accent-border` teal-300 · `accent-solid` teal-600 · `accent-solid-hover` teal-700 · `accent-text` teal-700 |
| Drawings | `illustration-line` neutral-900 · `-paper` white · `-fill` neutral-200 · `-fill-strong` neutral-600 · `-accent` teal-500 · `-accent-soft` teal-200 · `-accent-deep` teal-800 |
| Shadow | `shadow` neutral-950 (always mixed to a low alpha) |

**Declared colour hierarchy:**
1. **Grounds:** white and off-white (neutral-50/100) carry every page. The deep teal-800 ground (C 0.045, a slate green,
   not a vivid field) appears on at most two sections per page.
   - Home: the Call band.
   - Services and About: close V2.
   - Contact: head V4's panel and the card's back face.
2. **Ink:** neutral-900 headings, neutral-700 body, neutral-600 fine print.
3. **The one filled action:** accent-solid (teal-600) with white text, one per view.
   - The nav call is the persistent one; it stays quiet while the hero's own call is on screen.
   - Every other section call is a neutral outline (secondary).
4. **Interactive states and links:** accent text (teal-700, underlined in running text), accent rings, pressed chips,
   checked pickers, focus ring.
5. **Focal marks:** one accent part per drawing or data graphic (the roof being described, the hail-season cells, the
   "Now" marker).

Accent is never used for text emphasis, labels, years or headline words.

### Text hierarchy (Step 3, visual-hierarchy ⟦S1434⟧)
**Levels** (Poppins headings, Open Sans body):

| Level | Role | Size: 1440 / 375 | Weight |
|---|---|---|---|
| L1 | Page title (every hero and inner-page H1) | 60 / 40 px | 700 |
| L2 | Section heading | 40 / 26 px | 700 |
| L3 | Body | 17 px | 400 |
| L4 | Labels and fine print | 14 px | 600, secondary colour |

**Measured steps** (`qa/scripts/hierarchy.mjs`, every visible version at 1440 and 375, 92 states):
- L1/L2 = 1.50 (1.54 on phones).
- L2/L3 = 2.35 at 1440, plus a weight step of 300.
- L3/L4 is a 200 weight step.
- Result: 0 failures. Squint test: in the grayscale captures the title, then the section heading, then the filled call
  read first.

**Changed this round:**
- Round 1 measured an inversion: the homepage section H2 rendered at 48 px against a 47 px graphic-hero H1, and the inner
  pages' H1 equalled H2 at 48 px.
- Section H2 moved to `clamp(1.625rem,1.1rem + 1.9vw,2.5rem)`; every H1 now takes the hero role.
- How V1's step titles came under L2 (48 → 32 px).
- Hero V3's phone title went from 36 to 40 px.
- The R4 records keep their own scale.

### Buttons
- **Primary:** accent-solid fill, white label (4.76:1). Fill against the page ground: 4.21:1.
- **Secondary:** transparent with a 2px neutral-900 inset ring and a neutral-900 label (13.49:1 each). On deep bands it is
  white on teal-800 (9.20:1).
- **One filled primary per view:** `qa/scripts/accentaudit.mjs` scrolls every visible version one viewport at a time and
  counts visible filled accent actions.
  - Round 1 found 3 views with two. One was real: Hero V8 at 900 px, where the nav call returned while the hero's own call
    was still on screen; it is fixed.
  - The other two were selected tabs (How V7, Contact V3). Those are states, so the audit now counts them apart from
    actions.
  - Round 2 found 0.

### QA round 1 (before fixes; critique-color ⟦S1497⟧, critique-brand-consistency ⟦S1496⟧)
**Evidence:**
- Rendered sweep `qa/qa5/fullqa-r6a.json`.
- `qa/gate/r6-contrast-table.md` (first cut).
- Accent audit `accentaudit.mjs` round 1.
- Type measurement.
- Full-page colour and grayscale captures of all four pages.

**critique-color ⟦S1497⟧:**

| Dimension | Rating | Finding (measured) |
|---|---|---|
| Contrast | **major** | Pressed town chip `.mi` and pressed family pill `b` labels at **3.21:1** (white on teal-500); text failing is HIGH under S0071. Every other rendered text pair passed (lowest token pair 5.05). |
| Palette coherence | minor | One hue, two ramps, no stray hues. The accent was spread over labels, years, big numerals, ledes, list ticks, the head ridge and a headline word (hero V3 "Springboro"), so it read as decoration, not signal. |
| Semantic use | **major** | Teal text meant "link" in one place and "emphasis" in the next (S0071 one colour, one meaning broken). One view (Hero V8 at 900 px) showed two filled accent calls. |
| Accessibility | pass | Links are underlined; pressed, checked and selected states change fill and shape, not only hue. The focus ring is a 3px neutral-900 outline (14.61:1) plus a teal-600 ring (4.76:1). |

**critique-brand-consistency ⟦S1496⟧** (against `brand/mood.md`, `brand/voice.md`, `brand/tokens.md`):

| Dimension | Rating | Finding |
|---|---|---|
| Mood | minor | Calm, light grounds as declared. Two "Don'ts" were broken: an accent word inside a headline (Hero V3), and accent ticks and bullets that made lists shout (Storm V1, Proof V1, Services). |
| Voice | pass | Copy unchanged by the rebrand. Facts gate FAILS 0; 353-9711, 24/7 and "licen" occur 0 times. |
| Token compliance | pass | 0 primitives and 0 legacy names in live components; 1 allowed literal (offscreen mask). |
| Hierarchy (S1434, measured) | **major** | The homepage section H2 rendered at 48 px against a 47 px page H1; the inner-page H1 equalled H2. |

**Changes made between rounds:**
- Commit abd9a66: the pressed chip and pill labels moved to `text-on-accent`, now 4.76:1.
- Commit 8396f55, accent role:
  - 43 rules moved from accent text to neutral text roles (strong values to `text`, labels, ledes and `dt` to
    `text-secondary`).
  - The ticks, bullets and the ridge's dashed sides went neutral.
- Commit 8396f55, type and layout:
  - The type scale was re-cut.
  - The nav call now follows the shown hero version's own call.
  - The Services V4 numerals were floored at 13 px.

### QA round 2 (after fixes, same instruments)
**critique-color ⟦S1497⟧:**

| Dimension | Rating | Measured |
|---|---|---|
| Contrast | pass | Contrast table: every rendered pair and token pair passes (see below). The sweep (`qa/qa5/fullqa-r6b.json`, 92 states) still flags four kinds of item; each was checked by hand: picker numbers, the Call V1 word, the Call V2 number and the Hero V2 caption (details below the table). |
| Palette coherence | pass | Accent paints outside a declared role: 7 kinds, all data or focal marks. They are the Storm V2 hail-calendar cells, the Proof V5 star glyph, the Proof V6 tally bars, and the Contact V3 "Now" marker with its line. |
| Semantic use | pass | 0 views with more than one filled accent action. Accent text appears only on links, buttons and states. |
| Accessibility | pass | As in round 1. The grayscale capture keeps the filled call (4.76 label, 4.21 vs ground), the outline secondary, and filled-vs-outlined states. |

**Sweep items checked by hand (contrast row above):**
- **Picker numbers:** a checked picker number reads 1.00 to the scanner because its accent disc is a sibling element.
  Measured: 4.76.
- **Call V1 word:** the hollow "REMBRANDT" is decorative and `aria-hidden`.
- **Call V2 number:** sits on the white SVG disc, 9.20.
- **Hero V2 caption:** sits on an `oklab()` plate the scanner cannot parse. #1f2727 on ~#fefefe, about 15:1, confirmed by
  pixel capture.

**critique-brand-consistency ⟦S1496⟧:**

| Dimension | Rating | Measured |
|---|---|---|
| Mood | pass | No accent word in any headline. The highest-chroma ground behind body text anywhere is OKLCH C **0.061** (the Call V5 card, teal-700); the R4 orange Call band it replaces (#ff5a1f) measures C 0.211, 3.5x as saturated. |
| Voice | pass | Unchanged; facts gate FAILS 0 on all four pages. |
| Token compliance | pass | 1535 semantic references, 0 primitives, 0 legacy names, 1 allowed literal. |
| Hierarchy | pass | 0 failures across 92 states (1440 and 375). |

No HIGH colour finding is open.

### Challenge questions (asked out loud)
1. **Is the accent right for this trade?**
   - Teal can read "clinic" or "tech". Against that:
     - It is copper-roof verdigris, a roofing material.
     - It is low in chroma (C ≤ 0.087; the deep band is a slate green at C 0.045).
     - It was chosen by measurement: the photographs leave 150-225° empty, so the accent is the one colour on the page the
       photos never supply.
   - A red or orange would fight the brick and shingles (30-60°). A green would vanish into the lawns (105-135°). A blue
     would vanish into the sky and the crew's shirts (240-270°).
   - Verdict: keep.
2. **Does it survive grayscale?**
   - Yes. The hierarchy never relies on hue. The filled call stays a mid-grey slab with a white label (same 4.76:1). The
     secondary call is an outline. Pressed and checked states are filled against outlined. Links are underlined.
   - Checked on the full-page grayscale capture of the homepage.
3. **Does the accent mean one thing?**
   - After round 2, yes: "you can act here". That covers the one filled call, links, pressed, checked and selected states,
     and the focus ring.
   - Beyond that it is used only as the brand mark (S0011) and as one focal mark per drawing or data graphic.
   - It is never text emphasis.
4. **Where did isolation inflation creep in (von-restorff ⟦S1435⟧)?**
   - **Labels:** the hero label on all eight heroes.
   - **Years and numerals:** the family timelines, Hero V5 and V7, the About numbers, the Storm V2 "19", the Towns years
     and counts.
   - **Ledes and key labels:** the Services ledes and `dt` keys.
   - **Markers:** the list ticks and bullets.
   - **Ridges:** the dashed head ridge.
   - **Headlines:** the Hero V3 headline word.
   - Each competed with the one filled call for "the thing that is different". All are neutral now, so the call, the links
     and the states are the only teal a visitor has to read.

### Measured contrast table (Step 3; `qa/scripts/contrasttable.mjs` → `qa/gate/r6-contrast-table.md`, final build)
Rendered pairs are read from the live page (computed colours on their real grounds). The token pairs follow
design-token-contrast ⟦S0248⟧: every text token on every ground it is used on. Floors: body 4.5, large text 3, UI and
focus 3. White appears only on accent steps of 4.5:1 or more (teal-600 4.76, teal-700 6.59, teal-800 9.20); white on
teal-500 measures 3.22, so teal-500 never carries text. **FAIL rows: 0** (27 rendered pairs, 31 token pairs).

| Rendered pair | Level | Foreground | Ground | Ratio | Need | Result |
|---|---|---|---|---|---|---|
| Page title (H1, hero) | primary | #1f2727 | #edf2f2 | 13.49 | 3 | pass |
| Filled primary call: label on accent-solid | primary | #ffffff | #347e7b | 4.76 | 4.5 | pass |
| Filled primary call: fill vs page ground | UI | #347e7b | #edf2f2 | 4.21 | 3 | pass |
| Section heading (H2) | secondary | #1f2727 | #ffffff | 15.24 | 3 | pass |
| Body copy | tertiary | #464f4f | #f7fbfa | 8.08 | 4.5 | pass |
| Fine print / source note | quaternary | #464f4f | #ffffff | 8.43 | 4.5 | pass |
| Section label (brand glyph row) | quaternary | #464f4f | #ffffff | 8.43 | 4.5 | pass |
| Link in body (accent text) | tertiary | #2c6663 | #edf2f2 | 5.83 | 4.5 | pass |
| Secondary (section) call: label | secondary action | #1f2727 | #edf2f2 | 13.49 | 4.5 | pass |
| Secondary call: 2px outline (inset ring) vs ground | UI | #1f2727 | #edf2f2 | 13.49 | 3 | pass |
| Picker: checked number on the accent indicator | state | #ffffff | #347e7b | 4.76 | 4.5 | pass |
| Picker: idle number on the pill | UI | #1f2727 | #ffffff | 15.24 | 4.5 | pass |
| Nav link | tertiary | #1f2727 | #ffffff | 15.24 | 4.5 | pass |
| Nav call (persistent filled primary): label | primary | #ffffff | #347e7b | 4.76 | 4.5 | pass |
| Footer label | quaternary | #464f4f | #edf2f2 | 7.46 | 4.5 | pass |
| Footer value | tertiary | #1f2727 | #edf2f2 | 13.49 | 4.5 | pass |
| Logo mark (graphic) vs nav plate | UI | #347e7b | #ffffff | 4.76 | 3 | pass |
| Logo wordmark vs nav plate | primary | #1f2727 | #ffffff | 15.24 | 4.5 | pass |
| Focus outline (site-wide, 3px) vs page ground | UI | #1f2727 | #f7fbfa | 14.61 | 3 | pass |
| Deep band: heading (white on teal-800) | secondary | #ffffff | #274e4d | 9.20 | 3 | pass |
| Deep band: body (teal-100 on teal-800) | tertiary | #d8f2f0 | #274e4d | 7.83 | 4.5 | pass |
| Deep band: secondary call label on the band | secondary action | #ffffff | #274e4d | 9.20 | 4.5 | pass |
| Deep band: secondary call ring vs band | UI | #d8f2f0 | #274e4d | 7.83 | 3 | pass |
| Town chip pressed: label on accent-solid | state | #ffffff | #347e7b | 4.76 | 4.5 | pass |
| Town field: input border vs ground | UI | #1f2727 | #ffffff | 15.24 | 3 | pass |
| Town field: typed text | tertiary | #1f2727 | #ffffff | 15.24 | 4.5 | pass |
| Focus ring (outer ring, accent) vs page ground | UI | #347e7b | #ffffff | 4.76 | 3 | pass |

| Token pair (S0248) | Foreground | Ground | Ratio | Need | Result |
|---|---|---|---|---|---|
| --color-text on --color-bg | #1f2727 | #f7fbfa | 14.61 | 4.5 | pass |
| --color-text on --color-bg-subtle | #1f2727 | #edf2f2 | 13.49 | 4.5 | pass |
| --color-text on --color-bg-surface | #1f2727 | #ffffff | 15.24 | 4.5 | pass |
| --color-text on --color-accent-subtle | #1f2727 | #f1f9f8 | 14.26 | 4.5 | pass |
| --color-text on --color-accent-subtle-hover | #1f2727 | #d8f2f0 | 12.98 | 4.5 | pass |
| --color-text-secondary on --color-bg | #464f4f | #f7fbfa | 8.08 | 4.5 | pass |
| --color-text-secondary on --color-bg-subtle | #464f4f | #edf2f2 | 7.46 | 4.5 | pass |
| --color-text-secondary on --color-bg-surface | #464f4f | #ffffff | 8.43 | 4.5 | pass |
| --color-text-secondary on --color-accent-subtle | #464f4f | #f1f9f8 | 7.88 | 4.5 | pass |
| --color-text-secondary on --color-accent-subtle-hover | #464f4f | #d8f2f0 | 7.18 | 4.5 | pass |
| --color-text-tertiary on --color-bg | #5c6665 | #f7fbfa | 5.68 | 4.5 | pass |
| --color-text-tertiary on --color-bg-subtle | #5c6665 | #edf2f2 | 5.24 | 4.5 | pass |
| --color-text-tertiary on --color-bg-surface | #5c6665 | #ffffff | 5.93 | 4.5 | pass |
| --color-text-tertiary on --color-accent-subtle | #5c6665 | #f1f9f8 | 5.54 | 4.5 | pass |
| --color-text-tertiary on --color-accent-subtle-hover | #5c6665 | #d8f2f0 | 5.05 | 4.5 | pass |
| --color-accent-text on --color-bg | #2c6663 | #f7fbfa | 6.32 | 4.5 | pass |
| --color-accent-text on --color-bg-subtle | #2c6663 | #edf2f2 | 5.83 | 4.5 | pass |
| --color-accent-text on --color-bg-surface | #2c6663 | #ffffff | 6.59 | 4.5 | pass |
| --color-accent-text on --color-accent-subtle | #2c6663 | #f1f9f8 | 6.16 | 4.5 | pass |
| --color-accent-text on --color-accent-subtle-hover | #2c6663 | #d8f2f0 | 5.61 | 4.5 | pass |
| text-on-accent on accent-solid | #ffffff | #347e7b | 4.76 | 4.5 | pass |
| text-on-accent on accent-solid-hover | #ffffff | #2c6663 | 6.59 | 4.5 | pass |
| accent-solid (fill) on bg | #347e7b | #f7fbfa | 4.56 | 3 | pass |
| border-control on bg | #5c6665 | #f7fbfa | 5.68 | 3 | pass |
| border-focus on bg-surface | #347e7b | #ffffff | 4.76 | 3 | pass |
| deep: text (white) on bg-inverse | #ffffff | #274e4d | 9.20 | 4.5 | pass |
| deep: text-secondary on bg-inverse | #d8f2f0 | #274e4d | 7.83 | 4.5 | pass |
| deep: text-tertiary on bg-inverse | #ade9e6 | #274e4d | 6.82 | 4.5 | pass |
| deep: text on surface on surface | #ffffff | #2c6663 | 6.59 | 4.5 | pass |
| deep: secondary on surface on surface | #d8f2f0 | #2c6663 | 5.61 | 4.5 | pass |
| deep: action label on action fill | #274e4d | #ffffff | 9.20 | 4.5 | pass |

### Step 4: applied everywhere
- **Coverage:**
  - All four pages and every visible version: 112 version files (homepage 9 sections x 8; Services, About and Contact
    8 sections x 5). The header, footer and mobile bar on every page.
  - The companion cursor and its effects read their colours from the tokens (`tok()`).
  - The hero canvas shades and the proof stars read tokens too.
  - The browser theme colour is the page ground (#f7fbfa).
- **Backups:**
  - 101 backup files exist, the same as R5.
  - `git diff --name-status dd994a0 HEAD` over every `bk/` folder lists **0** files, so the backups are byte-identical.
  - Each still opens as the record it was: `qa/gate/r6-final-bkopen.log` and `r6-final-clickthrough.log` (pagebk 25 of 25).
  - The 6 "BAD" rows are the Services and Storm B1-B3 slots, which never existed (as in R5).
- **Deep-accent grounds per page view** (`r6-final-browser.log`, the gate now caps them at 2):
  - Homepage: only the Call band (L 0.064), in Call V1-V5 and V7.
  - Inner pages: their teal-800 bands (close V2, Contact head V4 panel, the card's back) sit inside a light section.
  - 0 black or near-black grounds; 0 large dark panels.

### Step 6: the custom-cursor click glitch (animation-principles ⟦S1436⟧)
**Cause** (from the R5 code, `git diff 2e9bd16 abd9a66 -- rembrandt/v5/src/js/companion.js`):
- **The blink:** every pointerdown faded the whole companion to 35% opacity, and every release faded it back. So each
  click made the cursor blink.
- **Inconsistent press:** pointerdown also fired a separate press animation chosen per mode and per element kind. Some
  kinds had none, and these animations ran alongside the hover pose with no overwrite. A quick second click could leave a
  part mid-pose.
- **Hover snap:** hover changes snapped every part back instantly (`resetParts`).
- **Slow splash:** the splash effect ran 450 ms, longer than a double click.
- **No real swallowing:** the companion layer is `pointer-events:none` (`.cmp`), so no click was ever swallowed. It looked
  like one because the cursor blinked and stuttered at the moment of the click.

**Fix** (`src/js/companion.js`):
- **Press:** the same single tween for every interactive element: scale 0.9 in 70 ms (micro), back to 1 in 160 ms
  (short), with `overwrite:true`.
  - It is interruptible: a new press replaces the old one, and pointercancel jumps it to the end.
  - The opacity fade is gone.
- **Hover:** hover poses settle in 120 ms instead of snapping.
- **Click effects:** the spark and splash effects last 220-250 ms.
- **Native cursor:** reduced motion turns the companion off before anything mounts, so the native cursor returns; on
  touch it never mounts.

**Test** (`qa/scripts/cursortest.mjs`; log `qa/gate/r6-final-cursor.log`):
- **Method:** with the custom cursor live, it clicks every interactive element in every visible version state on all four
  pages: 23 states, 1,202 clicks (links, buttons, picker labels, inputs, tabs, summaries, the nav and the footer).
- **Checks on every click:**
  - The real click lands on the element aimed at.
  - The click's delay.
  - The companion, sampled every frame for 320 ms: opacity never dips below 0.98; press scale stays within 0.88-1.02 and
    returns to 1; the press class clears; no jump over 24 px between frames with the pointer still.
- **Result:** 1,202 clicks, every one landed. 0 flickers, 0 scale glitches, 0 stuck presses, 0 jumps.
  - One row reported "121 ms" on Homepage V4. That figure ran from pointerdown, so it included the test's own 40 ms
    hold, with four browsers sharing four CPUs.
  - Measured from release to click, the delay a visitor feels, Homepage V4 re-run alone gives a worst case of **0.3 ms**.
- **Touch and reduced motion:** the custom cursor stays off, the native cursor is untouched, and the companion is hidden.
- **Earlier misses:** the first run reported three misses (two proof picker labels, the footer phone). They were test
  artefacts: the target was measured while a version switch or a smooth scroll was still moving it. The test now waits
  for the target's rect to hold still before aiming. Every click in those states lands.
- **Verdict:** every state is rock-solid. The simplification that got it there is the one above: the opacity blink and
  the per-kind press variety are gone, replaced by one press for everything.

### Final gates (fresh, on the final build; logs in `rembrandt/v5/qa/gate/r6-final-*.log`)
- **Facts** (`r6-final-facts.log`):
  - FAILS 0 on all four pages.
  - "353-9711", "24/7" and "licen" each occur 0 times across the four built pages.
  - Storm V7 and V8 still say the insurer decides. The facts grep still passes.
- **Tokens** (`r6-final-tokens.log`): 1535 semantic references, 0 primitives, 0 legacy names, 1 allowed literal.
- **Contrast** (`r6-contrast-table.md`): 58 rows, FAIL 0.
- **Sweep** (`r6-final-sweep.log`, `qa/qa5/fullqa-r6b.json`; 92 states at 1440 and 375):
  - Overflow 0, errors 0, one H1 per page.
  - The residual flags were checked by hand (see QA round 2).
- **Hierarchy** (`r6-final-hierarchy.log`): 0 failures in 92 states.
- **Accent audit** (`r6-final-accent.log`): 0 views with two filled actions; highest chroma behind body text C 0.061.
- **Light check** (`r6-final-browser.log`):
  - Every version switches and mounts.
  - The logo is in the header and footer of all four pages, and the favicon is set.
  - Every visible button keeps a fill or a ring with motion on.
  - bad 0.
- **Switchers** (`r6-final-keys.log`): 17 of 17 sections switch by key and by click; B shows the backups on every page;
  errors 0.
- **Click-throughs** (`r6-final-clickthrough.log`), errors 0 everywhere:
  - Squares calculator: 21.2 / 45.3 / 33.0, as the geometry predicts.
  - How truck and tabs, Storm checklist and spots, Towns radius, quilt and signs, Call week and tear-off.
  - Contact: card, Now line, ring, bands and checker.
  - Inner-page backups: 25 of 25.

### R6 commits
- 2e9bd16: stage 1. New closure logo and favicon; computed teal-192 ramps with a semantic tier; every visible version
  migrated; mood, voice and tokens reference files.
- abd9a66: stage 2. Stable single-tween cursor press; token-only cursor colours; contrast table and cursor click test;
  pressed chip and pill labels fixed.
- 8396f55: stage 3. QA round 1-2 fixes: one meaning for the accent, honest type levels, one filled call per view.
- 45be6f8: stage 4. Final gates, the R6 gate updates (finalgate deep-accent cap and ring-aware button check, cursor
  test timing), and this brand sheet.

## R7 colour change (owner decision, 2026-10-31): deep green + lime replace the R6 teal

The owner ruled the teal clash with Austin Pro Siding an issue: Austin keeps teal. This site moves to the colours from the
owner's own Figma design, now explicitly approved for it: **deep green #0e3b2c** (primary) and **lime #b5db6e**
(highlight accent). It was rebuilt as a system under better-colors ⟦S0071⟧, color-system ⟦S1418⟧, design-token-contrast
⟦S0248⟧ and critique-color ⟦S1497⟧.
- **Unchanged:** structure, versions, switchers, interactives, facts, type levels and the fixed cursor.
- **Backups:** byte-identical (`git diff --name-status dd994a0 -- '*/bk/*'` lists 0 files).
- **This section supersedes** the R6 colour parts above (teal ramp, teal hierarchy, R6 contrast table). The R6 logo
  shape, type hierarchy and cursor work stand.

### Ramps (`build/mk-tokens.py`, OKLCH, computed)
**Anchors, measured:**
- Deep green #0e3b2c is OKLCH L 0.317, C 0.056, hue 167. Lime #b5db6e is L 0.841, C 0.143, hue 125.
- Each ramp holds its anchor's hue end to end, and each anchor sits exactly on the step its lightness falls on:
  green-900 and lime-300.
- Chroma along each ramp is the anchor's own share of the sRGB ceiling, tapered at both ends.

**Green chroma cap:** the green is capped at C 0.095.
- The first, uncapped run turned the middle of the ramp mint (green-400 #15c695 at C 0.148). That breaks eye comfort
  and is off-character for a forest green.
- Capped, the ramp runs pale sage → jade → forest: green-50 #f1f9f5 … green-500 #4b9f80 … green-700 #146b50 … green-900
  #0e3b2c.

**Lime ramp:** keeps the anchor's character: lime-100 #e2f4c7, lime-200 #cbe998, lime-300 #b5db6e, lime-400 #93b941.

**Neutral:** one neutral ramp, re-tinted to the green's hue at C 0.004-0.012 (neutral-50 #f7fbf9 … neutral-900 #202724).

Full table: `brand/tokens.md`.

### Semantic tier (same names, repointed; components barely changed)
| Role | Light theme | Deep-green band |
|---|---|---|
| Ground | `bg` neutral-50, `bg-surface` white, `bg-inverse` **green-900** | green-900; surface green-800 |
| Text | neutral-900 / 700 / 600 | white / green-100 / green-200 |
| Primary action (`accent-solid`) | **green-900** fill, white label; hover green-800 | **lime-300** fill, green-900 label; hover lime-200 |
| Links (`accent-text`) | green-700 | lime-200 |
| Selected / pressed / checked states | green-900 fill, white label | lime fill, green-900 label |
| Focus (`border-focus`) | green-700 ring + neutral-900 outline | lime-300 |
| Highlight (new: `highlight`, `highlight-soft`, `text-on-highlight`) | lime-300 / lime-100, deep-green text | lime-300 |
| Drawing focal mark (`illustration-accent`) | lime-300 inside ink outlines | lime-300 |
| Drawing deep part (`illustration-accent-deep`) | green-900 | green-950 |

**Other changes:**
- **Logo:** the R6 closure mark, now in four colours: `mark.svg` deep green, `mark-lime.svg`, `mark-black.svg` and
  `mark-white.svg`.
  - Header and footer use deep green on light (11.97:1).
  - The lime mark is for deep-green grounds only (7.93:1); on white it would be 1.58:1, so it never goes there.
- **Favicon:** the lime mark on a deep-green tile, both brand colours, legible on light and dark browser tabs.
- **Theme colour:** #f7fbf9.

### Declared colour hierarchy (R7)
1. **Light grounds:** white and neutral-50/100 carry every page.
2. **Deep green, the primary:**
   - The one filled call per view (nav and hero; section calls are outlines).
   - Links, selected, pressed and checked states, and focus.
   - The deep-green brand bands: at most one per page view. Measured by the light gate: the homepage Call band in
     V1-V5 and V7; Services and About close V2; Contact head V4.
   - Deep green reads green, never black: HSL saturation 0.62 against 0.10-0.14 for the near-black neutrals. The light
     gate now checks this rather than assuming it.
3. **Lime, the highlight:** one pop per view at most.
   - A drawing's focal part (inside ink outlines).
   - A data highlight (hail season, open hours, each with a deep-green edge).
   - A marker (the phone underline on Contact, Hero V3's highlighter behind the town name).
   - The action fill on a deep-green band.
   - Never text colour on light, never under white text.
4. **Ink:** neutral-900 headings, neutral-700 body.

### Rules measured on the rendered pages
- **White on lime:** never.
  - `qa/scripts/limewhite.mjs` finds every visible text element whose ground is lime, HTML or SVG, across all 46 states.
  - Result: 144 such elements, all deep green or dark, all ≥ 4.5:1; **0 white**.
  - The contrast table lists white on lime-300 (1.58) and lime-200 (1.34) as banned reference rows.
- **White on deep green:** 12.50:1 (green-900), 9.05:1 (green-800 hover).
- **One filled primary per view:** 0 views with two (`accentaudit.mjs`).
- **Lime pops per view:** of 141 measured views, 105 have none, 36 have exactly one, and none have two or more.

### critique-color ⟦S1497⟧ challenge round on the new palette
**Round 1** (first build of green + lime, before fixes). Evidence: contrast table, `accentaudit.mjs`, quarter-scale contact
sheets of all 46 visible states, grayscale captures, and a lime-on-photo measurement.

| Dimension | Rating | Finding (measured) |
|---|---|---|
| Contrast, text | pass | Every rendered and token text pair ≥ 4.5 on the first run, white on lime never rendered. |
| Contrast, graphics and focus | **major** | Contact V2's 23 town dots were lime on white, **1.58:1**: data needs 3:1. The focus outline for the footer, mobile bar and pickers pointed at the drawing role and would have turned lime (1.58, under the 3:1 focus floor); caught in the token tier before it rendered. |
| Palette coherence | minor | The uncapped green ramp went mint in the middle (green-400 #15c695, C 0.148): off-character for a forest green and a high-chroma field. |
| Semantic use | **major** | Proof V4's credential frames took exactly the call's deep green (four large deep-green objects competing with the one solid action). Two R6 label rules still *filled* the open logo mark, so the R's bowl flooded with lime (Hero V3/V6/V8, Storm V8). |
| Lime discipline (S1435) | **major** | **Waste across the homepage:** lime full-width tapes (Work V1, Towns V4), a lime fill in all six service icons, lime caps on all eight scoreboard tiles (Proof V3) and a lime door next to the lime drag handle (squares calculator). **Planned pop:** a lime phone glyph on the persistent nav call, which would have put a second pop in every view. |
| Grayscale | minor | Lime-only data marks (hail-season cells, open-hours bars) fell to 1.58:1 against white with nothing else to carry them. |

**Fixes:**
- **Contrast:** the ring dots are deep green (11.97-12.50:1 on the light grounds). The focus outline now uses `border-focus`.
- **Coherence:** green chroma capped at 0.095.
- **Frames and marks:** the credential frames are neutral, and the label glyphs are never filled.
- **Lime discipline:**
  - The tapes take the pale lime-100.
  - The service icons rest in neutral fill.
  - The scoreboard caps take the green border step.
  - The calculator door is neutral; only the handle you drag stays lime.
  - The call's glyph stays white: the pop belongs to content, not chrome.
- **Grayscale:** the hail cells and hours bars got a deep-green edge.

**Round 2** (after the fixes, same instruments):

| Dimension | Rating | Measured |
|---|---|---|
| Contrast | pass | Contrast table FAIL 0 (28 rendered pairs, 44 token pairs; table below). 144 text elements on lime, 0 white, all ≥ 4.5 (`r7-final-limewhite.log`). The sweep shows no new contrast flags against the R6 baseline. |
| Palette coherence | pass | Two hues, one neutral. The only accent paints outside a declared role are data marks: hail cells, star glyph, tally, the "Now" marker. |
| Semantic use | pass | 0 views with two filled actions. Deep green is used only for the action, states, links, focus, brand bands and the drawings' deep parts. Credential frames are neutral. |
| Lime discipline | pass | Of 141 views: 105 with no lime, 36 with one pop, 0 with two or more. |
| Grayscale | pass | The call stays the darkest solid object. Lime data marks keep a 12.5:1 edge (verified on grayscale captures). |
| Light-dominant | pass | 0 near-black grounds. Each page view has at most one deep-green band, and every one reads green (HSL saturation 0.62). |

No HIGH colour finding is open.

**Challenge questions:**
1. **Is green + lime right for a roofing company?**
   - Yes, with one caution.
   - Deep green reads as stable and established, fitting a family firm since 1995, and it is the colour of the
     properties the crew works on. Lime is the fresh "new roof" note that keeps the deep green from turning sombre.
   - The caution is that lime shares its hue with the lawns in the firm's own photos. Measured: lawn-band pixels are 19% of
     the 14 job photos, at median L 0.52 and C 0.074. Lime-300 is L 0.84 and C 0.143, and only 0.3% of photo pixels
     resemble it.
   - So lime stays distinct by lightness and chroma, not hue. Hence the rule: lime is never laid on a photo.
   - Against the clash the owner ruled on: deep green sits 25° from the old teal and far darker (L 0.32 against the teal
     action's 0.55).
2. **Does it survive grayscale?**
   - Yes. The hierarchy never depends on lime.
   - Deep green becomes the darkest solid on the page (luminance 0.034), so the one call still reads first.
   - Lime becomes light grey. That only survives where an ink outline, deep-green text or a deep-green edge carries the
     shape, which is now everywhere lime appears.
3. **Where is lime being wasted?** Round 1's list:
   - Tapes, icons, scoreboard caps, the calculator door and the chrome glyph.
   - Plus lime on data dots, where it was also too weak.
   - All fixed; the pop count is the proof: never more than one per view.

### Measured contrast table (R7, final build; `qa/scripts/contrasttable.mjs` → `qa/gate/r7-contrast-table.md`)
- Floors: body 4.5, large text 3, UI and focus 3.
- White sits only on green-800/900 (9.05 / 12.50).
- Lime carries deep green (7.93 on lime-300) or near-black. White on lime is listed only as a banned reference: it is
  never rendered.

| Rendered pair | Level | Foreground | Ground | Ratio | Need | Result |
|---|---|---|---|---|---|---|
| Page title (H1, hero) | primary | #202724 | #eef2f0 | 13.50 | 3 | pass |
| Filled primary call: label on accent-solid | primary | #ffffff | #0e3b2c | 12.50 | 4.5 | pass |
| Filled primary call: fill vs page ground | UI | #0e3b2c | #eef2f0 | 11.06 | 3 | pass |
| Filled primary call: phone glyph on the fill | UI | #ffffff | #0e3b2c | 12.50 | 3 | pass |
| Section heading (H2) | secondary | #202724 | #ffffff | 15.25 | 3 | pass |
| Body copy | tertiary | #474f4c | #f7fbf9 | 8.08 | 4.5 | pass |
| Fine print / source note | quaternary | #474f4c | #ffffff | 8.43 | 4.5 | pass |
| Section label (brand glyph row) | quaternary | #474f4c | #ffffff | 8.43 | 4.5 | pass |
| Link in body (accent text) | tertiary | #146b50 | #eef2f0 | 5.72 | 4.5 | pass |
| Secondary (section) call: label | secondary action | #202724 | #eef2f0 | 13.50 | 4.5 | pass |
| Secondary call: 2px outline (inset ring) vs ground | UI | #202724 | #eef2f0 | 13.50 | 3 | pass |
| Picker: checked number on the accent indicator | state | #ffffff | #0e3b2c | 12.50 | 4.5 | pass |
| Picker: idle number on the pill | UI | #202724 | #ffffff | 15.25 | 4.5 | pass |
| Nav link | tertiary | #202724 | #ffffff | 15.25 | 4.5 | pass |
| Nav call (persistent filled primary): label | primary | #ffffff | #0e3b2c | 12.50 | 4.5 | pass |
| Footer label | quaternary | #474f4c | #eef2f0 | 7.47 | 4.5 | pass |
| Footer value | tertiary | #202724 | #eef2f0 | 13.50 | 4.5 | pass |
| Logo mark (graphic) vs nav plate | UI | #0e3b2c | #ffffff | 12.50 | 3 | pass |
| Logo wordmark vs nav plate | primary | #202724 | #ffffff | 15.25 | 4.5 | pass |
| Focus outline (site-wide, 3px) vs page ground | UI | #202724 | #f7fbf9 | 14.61 | 3 | pass |
| Deep band: heading (white on green-900) | secondary | #ffffff | #0e3b2c | 12.50 | 3 | pass |
| Deep band: body (green-100 on green-900) | tertiary | #d8f4e7 | #0e3b2c | 10.72 | 4.5 | pass |
| Deep band: secondary call label on the band | secondary action | #ffffff | #0e3b2c | 12.50 | 4.5 | pass |
| Deep band: secondary call ring vs band | UI | #d8f4e7 | #0e3b2c | 10.72 | 3 | pass |
| Town chip pressed: label on accent-solid | state | #ffffff | #0e3b2c | 12.50 | 4.5 | pass |
| Town field: input border vs ground | UI | #202724 | #ffffff | 15.25 | 3 | pass |
| Town field: typed text | tertiary | #202724 | #ffffff | 15.25 | 4.5 | pass |
| Focus ring (outer ring, accent) vs page ground | UI | #146b50 | #ffffff | 6.46 | 3 | pass |

| Token pair (S0248) | Foreground | Ground | Ratio | Need | Result |
|---|---|---|---|---|---|
| --color-text on --color-bg | #202724 | #f7fbf9 | 14.61 | 4.5 | pass |
| --color-text on --color-bg-subtle | #202724 | #eef2f0 | 13.50 | 4.5 | pass |
| --color-text on --color-bg-surface | #202724 | #ffffff | 15.25 | 4.5 | pass |
| --color-text on --color-accent-subtle | #202724 | #f1f9f5 | 14.24 | 4.5 | pass |
| --color-text on --color-accent-subtle-hover | #202724 | #d8f4e7 | 13.08 | 4.5 | pass |
| --color-text on --color-highlight-soft | #202724 | #e2f4c7 | 13.07 | 4.5 | pass |
| --color-text-secondary on --color-bg | #474f4c | #f7fbf9 | 8.08 | 4.5 | pass |
| --color-text-secondary on --color-bg-subtle | #474f4c | #eef2f0 | 7.47 | 4.5 | pass |
| --color-text-secondary on --color-bg-surface | #474f4c | #ffffff | 8.43 | 4.5 | pass |
| --color-text-secondary on --color-accent-subtle | #474f4c | #f1f9f5 | 7.87 | 4.5 | pass |
| --color-text-secondary on --color-accent-subtle-hover | #474f4c | #d8f4e7 | 7.23 | 4.5 | pass |
| --color-text-secondary on --color-highlight-soft | #474f4c | #e2f4c7 | 7.23 | 4.5 | pass |
| --color-text-tertiary on --color-bg | #5d6662 | #f7fbf9 | 5.68 | 4.5 | pass |
| --color-text-tertiary on --color-bg-subtle | #5d6662 | #eef2f0 | 5.25 | 4.5 | pass |
| --color-text-tertiary on --color-bg-surface | #5d6662 | #ffffff | 5.93 | 4.5 | pass |
| --color-text-tertiary on --color-accent-subtle | #5d6662 | #f1f9f5 | 5.54 | 4.5 | pass |
| --color-text-tertiary on --color-accent-subtle-hover | #5d6662 | #d8f4e7 | 5.09 | 4.5 | pass |
| --color-text-tertiary on --color-highlight-soft | #5d6662 | #e2f4c7 | 5.08 | 4.5 | pass |
| --color-accent-text on --color-bg | #146b50 | #f7fbf9 | 6.19 | 4.5 | pass |
| --color-accent-text on --color-bg-subtle | #146b50 | #eef2f0 | 5.72 | 4.5 | pass |
| --color-accent-text on --color-bg-surface | #146b50 | #ffffff | 6.46 | 4.5 | pass |
| --color-accent-text on --color-accent-subtle | #146b50 | #f1f9f5 | 6.04 | 4.5 | pass |
| --color-accent-text on --color-accent-subtle-hover | #146b50 | #d8f4e7 | 5.55 | 4.5 | pass |
| --color-accent-text on --color-highlight-soft | #146b50 | #e2f4c7 | 5.54 | 4.5 | pass |
| text-on-accent (white) on accent-solid | #ffffff | #0e3b2c | 12.50 | 4.5 | pass |
| text-on-accent (white) on accent-solid-hover | #ffffff | #19523f | 9.05 | 4.5 | pass |
| accent-solid (fill) on bg | #0e3b2c | #f7fbf9 | 11.97 | 3 | pass |
| border-control on bg | #5d6662 | #f7fbf9 | 5.68 | 3 | pass |
| border-focus on bg-surface | #146b50 | #ffffff | 6.46 | 3 | pass |
| border-focus on bg-subtle | #146b50 | #eef2f0 | 5.72 | 3 | pass |
| icon-on-accent (glyph) on accent-solid | #ffffff | #0e3b2c | 12.50 | 3 | pass |
| text-on-highlight (deep green) on highlight | #0e3b2c | #b5db6e | 7.93 | 4.5 | pass |
| text-on-highlight (deep green) on highlight-soft | #0e3b2c | #e2f4c7 | 10.71 | 4.5 | pass |
| black text on highlight | #121815 | #b5db6e | 11.41 | 4.5 | pass |
| deep: text (white) on bg-inverse | #ffffff | #0e3b2c | 12.50 | 4.5 | pass |
| deep: text-secondary on bg-inverse | #d8f4e7 | #0e3b2c | 10.72 | 4.5 | pass |
| deep: text-tertiary on bg-inverse | #bce7d4 | #0e3b2c | 9.23 | 4.5 | pass |
| deep: link (accent-text) on bg-inverse | #cbe998 | #0e3b2c | 9.31 | 4.5 | pass |
| deep: text on surface on surface | #ffffff | #19523f | 9.05 | 4.5 | pass |
| deep: secondary on surface on surface | #d8f4e7 | #19523f | 7.76 | 4.5 | pass |
| deep: action label (deep green) on action fill (lime) | #0e3b2c | #b5db6e | 7.93 | 4.5 | pass |
| deep: action label on hover on action hover (lime) | #0e3b2c | #cbe998 | 9.31 | 4.5 | pass |
| deep: focus ring (lime) on bg-inverse | #b5db6e | #0e3b2c | 7.93 | 3 | pass |
| deep: border-control on bg-inverse | #9bd5bd | #0e3b2c | 7.52 | 3 | pass |
| BANNED, never rendered: white text on lime-300 | #ffffff | #b5db6e | 1.58 | 4.5 | banned (not used) |
| BANNED, never rendered: white text on lime-200 | #ffffff | #cbe998 | 1.34 | 4.5 | banned (not used) |

### R7 gates (logs in `rembrandt/v5/qa/gate/r7-final-*.log`)
- **Facts** (`r7-final-facts.log`): FAILS 0 on all four pages. "353-9711", "24/7" and "licen" each occur 0 times. The
  facts grep still passes.
- **Tokens** (`r7-final-tokens.log`): 1534 semantic references, 0 primitives, 0 legacy names, 1 allowed literal.
- **Contrast** (`r7-contrast-table.md`): FAIL 0. **White on lime** (`r7-final-limewhite.log`): 0 of 144.
- **Accent audit** (`r7-final-accent.log`): 0 views with two filled actions. Lime pops per view are at most 1. Highest
  chroma behind body text is C 0.068 (deep-green card).
- **Light check** (`r7-final-browser.log`):
  - bad 0; dark grounds or panels: none.
  - Deep-green bands are listed, at most one per page view.
  - The logo is in the header and footer of all four pages; the favicon is set.
  - Every visible button keeps a fill or a ring.
- **Hierarchy** (`r7-final-hierarchy.log`): 0 failures in 92 states.
- **Sweep** (`r7-final-sweep.log`, `qa/qa5/fullqa-r7b.json`): overflow 0, errors 0, one H1 per page. No new flags against
  the R6 baseline.
- **Switchers** (`r7-final-keys.log`): 17 of 17; errors 0.
- **Click-throughs** (`r7-final-clickthrough.log`): errors 0 everywhere; inner-page backups 25 of 25.
- **Backups** (`r7-final-bkopen.log`):
  - Every existing homepage backup opens; the 6 BAD rows are the Services and Storm B1-B3 slots that never existed.
  - Backup files are byte-identical: 0 changed since R5.
- **Cursor** (`r7-final-cursor.log`):
  - The R6 fix is untouched. With the custom cursor live: 1,201 clicks in 23 states, 0 failures, worst release-to-click
    2.2 ms.
  - After the final edge change, the two affected states were re-run alone: 125 clicks, 0 failures.
  - Touch and reduced motion keep the native cursor.

### R7 commits
- 9db68b1: stage 1. Green + lime system rebuild, logo set and favicon, lime-discipline fixes, new QA checks.
- fb0f8d4: stage 2. Grayscale-safe lime data marks, the light gate learns deep green, brand docs, gate logs.
- (this commit): stage 3. Challenge round, R7 contrast table and brand sheet in PROGRESS.
