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
