# PROGRESS: Rembrandt homepage build under BRIEF-FULL.md

Memory file (BRIEF-FULL.md §11). Survivors after any reset: BRIEF-FULL.md §3, SECTIONS.md, this file, TRACEABILITY.md, the usage log at the end of `bank-index/BANK-MAP.md`. Re-read them and continue; never restart a finished section. Failed checks stay listed here until they pass.

## State
- **Branch:** `claude/sweet-hypatia-it8evf`.
- **Phase:** 1 (Hero ×3) complete → Phase 2 (Reviews) next.
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
