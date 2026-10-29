# PROGRESS: Rembrandt homepage build under BRIEF-FULL.md

Memory file (BRIEF-FULL.md §11). Survivors after any reset: BRIEF-FULL.md §3, SECTIONS.md, this file, TRACEABILITY.md, the usage log at the end of `bank-index/BANK-MAP.md`. Re-read them and continue; never restart a finished section. Failed checks stay listed here until they pass.

## State
- **Branch:** `claude/sweet-hypatia-it8evf`.
- **Phase:** 4 in progress: Family, How done → Towns next (then Call).
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
