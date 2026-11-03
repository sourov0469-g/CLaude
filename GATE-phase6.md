# GATE: Phase 6 · Polish pass on the recorded defects

**Status:** corrected per Muse's ruling (the first version did not pass as a scorecard gate: it lacked the per-category self-rating, the skill tags and the governing reference). Muse judges; this is a self-rating, not a certification.

**Why this phase exists:** Phases 0 to 5 were complete and no Muse ruling had arrived. So I worked through the defects the gate reports themselves named as remaining: one at a time, each measured, each with its gate amended (struck through, with what fixed it), committed and pushed. No sub-agents, no background tasks.

## Governing reference, and exactly what transfers
**Lusion governs this phase** (REFERENCE-STUDY row: "Flow; governs the flow maps"). Most of the phase's structural work is flow: twenty inner-page seams and the footer hand-offs.

| Lusion mechanism | Transfers to Phase 6 as | Where |
|---|---|---|
| **The carrier frame:** the hero's own border survives the scroll and hands itself to the next section | **The ink line** (PHASE1-PLAN "The carrier is the INK LINE"): it leaves each section as part of that section's drawing and arrives as the next section's frame or rule, never a crossfade. Phase 6 extended it from Home to every inner-page boundary. | `fields.js` DIV `counter`, `rule`, `studs`, `weeks`, `join`, `steps`; the ORDER rows for kitchen, bath, reno and contact; every page ends on `footing` into the footer |
| **Corner registration marks** that give a drawing-sheet feel | The sheet grammar of the new profiles: tick marks and dimension rules, ink at 1.5px, no numerals (the numbers lock). | the same six profiles; `.dv-mk--on` in `systems.css` |
| **Words assemble on a scrub** | The seams draw with the scroll, so they reverse when the visitor scrolls back. Under reduced motion they are drawn already. | `scrubDraw()` in `fields.js` |

**Not transferred, on purpose:**
- **Virtual scroll** (S1209): native scroll stays.
- **Three WebGL canvases**: the site's world is SVG ink.
- **Lusion's own ease**: the site keeps its single ease family (`--ez-move`, from Scout Motors).

**Not delivered yet:** the in-section carrier docks (the hero frame docking into the Proof tray, the last services sheet becoming the BA frame). These would complete the Lusion transfer on Home. They stay open below, because the direction of motion across section boundaries is Muse's call.

**Secondary references, each scoped to one item:**
- **Scout Motors** (Proof and Reviews sequencing): the Proof arrival clip keeps the keyed sequence clean. A block no longer crosses the lead text while it drops in.
- **Bruno Simon** (Towns only: an explorable instrument with mobile and reduced-motion guards): the phone guard is the "See the route on the map" button. The visitor chooses to go to the map, and nothing scrolls on its own.
- **Immersive Garden** (one drawn world for the Bath build): the redrawn fixtures bay is a frame in that same world, not a new illustration style.
- **OH Architecture** (the live hours line): unchanged and re-verified on all five pages. It reads "Open now, until 7pm Miami time" during open hours.

## Mechanisms and their WEB-SKILLS tags
| mechanism | tags | what the tag requires, and how it is met | file |
|---|---|---|---|
| Proof touch direction lock and drag | **S1443**, **S0340**, **S1018** | **S1443** asks for a 10 to 15px activation threshold, a direction lock between scroll and drag, and a button alternative for every gesture. Writing this correction exposed my threshold at **8px**, below the range. It is now **10px**: measured at 390, a 9px move is not held and a 12px move is; a vertical start is never held; a sideways start is held. **S0340**: a release keeps its real velocity, and a grab mid-flight takes over without a jump (unchanged). **S1018**: keyboard pick-up, carry and Escape re-verified (Space picks up, arrows carry 80px, Escape returns to 0px). | `proof.js` |
| Proof clipped arrival | **S0362** (the eye follows one moving thing) | While the blocks drop in, the site is clipped at its top edge, so nothing competes with the lead. | `proof.js`, `proof.css` (`.pf__site.is-arriving`) |
| Contact drifting rows | **S0450**, **S0400**, WCAG **2.2.2** | **S0450** asks for pause on hover only where useful, a static wrap under reduced motion, and masked edges. The rows ease to rest on pointer, focus, pause or search (measured 3, 1, 1, 0 px per 150 ms). Under reduced motion they are a still wrap. **The edges were not masked when Phase 6 first closed.** Now fixed: a 40px fade at both ends while drifting, none in the search and still states (computed `mask-image` checked in both states). **2.2.2**: a visible Pause control. **S0400**: the reduced-motion tier. | `contact-area.js`, `contact-area.css` |
| Inner-page seams (dividers) | **S1422**, **S0362** / **S0407**, **S1326** / **S0186**, **S1421** | **S1422** (closure): each divider closes one section and opens the next, so it is part of the seam, not decoration. **S0362 / S0407**: solid strokes draw; dashed or dotted lines and text fade, because the dash trick cannot draw them. **S1326 / S0186**: scrubbed and reversible. **S1421**: one illustration language, the same ink line. | `fields.js`, `systems.css` |
| Renovation one-plan collapse | **S1326** | Scrubbed and reversible. On narrow screens the bars widen so the resolved plan reads: 5 of 5 names fit at 390 and 1440. | `reno-disruption.js` |
| Bath fixtures bay | **S1421** | Redrawn in the build's own line language: arm and head, valve trim and lever, niche, linear drain, glass handle, towel bar. The build still steps 0 to 5 with the pin at top 0. | `bath-build.js` |
| Projects still frames | **S0400** | Under reduced motion the hanging frames hang level, so nothing reads as broken. | `work.css` |
| Towns phone route | **S0400**, Bruno guards | The route replays only when the visitor asks. | `towns.js`, `towns.css` |
| Financing phone legibility | **S0657** | Signpost labels 8 to 10.1px as two-line boards. The ledger's margin label moves above its cells, so the quotes wrap in 4/5/6 lines instead of 6/7/7. | `financing.js`, `financing.css` |
| Accessibility baseline | **S0657** | Unchanged and re-checked: 0 console errors, no horizontal overflow at 1440 and 390, labelled controls, live regions. | all |

## Self-rating (critical; Muse judges)
| category | /10 | evidence | why not higher |
|---|---|---|---|
| **Design** | **7** | Twenty inner seams in one ink-line language, each profile drawn from its own hand-off (Kitchens' counter run, Bathrooms' studs, Renovation's five dashes closing into one line, Contact's stage rail). The fixtures bay brought up to the rest of the build. Level frames under reduced motion. Masked row edges. | The Lusion transfer is only half done on Home: the dividers carry the seams, but the in-section docks (hero frame into Proof, services sheet into BA) are unbuilt. Process figures' finesse still open. Before/After still has no high-quality image source. |
| **Usability** | **8** | Proof no longer steals page scroll: a 10px activation (S1443) with direction lock, plus keyboard parity, all measured. Contact rows ease to rest, have a Pause control and a still mode. Towns' route is user-controlled on phones. Financing labels went from 8 to 10.1px. Renovation names no longer truncate. | Touch behaviour is measured with synthetic pointer events, not on a real device. 10.1px is legible for map labels but still small. The 8px threshold shipped in the first Phase 6 close and was caught only while writing this correction. |
| **Creativity** | **6** | Six new divider profiles, each a construction drawing that belongs to its boundary rather than a generic rule. | A polish pass: it adds no new signature moment. The carrier docks that would make the Lusion idea felt across sections wait on Muse. |
| **Content** | **9** | Facts lock untouched. Numbers lock respected: no numerals on any divider, none added to the Reviews mark, the financing copy unchanged. 0 em dashes in the single file. Poppins and Roboto only. | Content judgement calls are still open (below), notably the Kitchens scope-plan notes and the optional project description in Consult V2. |

## Fixed (measured)
| item | gate | fix | measured |
|---|---|---|---|
| Inner-page dividers were the system set | kitchens, bathrooms, renovation, contact | Every boundary carries its hand-off, using six new profiles (counter, rule, studs, weeks, join, steps). Each page's last section hands to the footer on the footing. | 20 inner seams drawn; 0 errors |
| Old Home dividers under Before/After and Process | home-ba, home-process | Already replaced by the dividers pass; gates updated. | n/a |
| Renovation one-plan bars truncated on phones | renovation | Wider bars on narrow screens. | 5 of 5 names fit at 390 and 1440 |
| Contact rows stopped dead | contact | One smoothed speed per row. | 3, 1, 1, 0 px per 150 ms on hold; held delta 0 |
| Contact rows cut at the edges (found in this correction) | contact | Masked ends while drifting [S0450]. | mask on in drift, `none` in search and still; `qa/finalize/phase6/contact-rows-masked-*.png` |
| Bath fixtures bay drawn simply | bathrooms | Redrawn (see above). | Build still steps 0 to 5; pin at top 0 |
| Proof: a touch on a block captured the page scroll | home-proof | Direction lock: `touch-action: pan-y`, and a grab only on a sideways start. | Vertical not held; sideways held; mouse grabs at once |
| Proof: activation threshold below S1443 (found in this correction) | home-proof | 8px raised to 10px. | 9px not held, 12px held (390) |
| Proof: blocks crossed the lead while arriving | home-proof | The site is clipped at its top edge during the arrival. | Verified mid-arrival |
| Projects V1 still frames hung crooked under reduced motion | home-projects | Level when still. | Verified |
| Reviews 0.8 mark too quiet | home-reviews | Clay dashed line at 2px; no numeral added. | n/a |
| Towns: the drive happened off-screen on phones | home-towns | "See the route on the map" in the answer. | Map in view at 390, van at Doral |
| Towns: the list was taller than the map | home-towns | Tighter type and rhythm. | 724 vs 702 at 1440 (was 883); 879 vs 702 at 1280 (was 1015) |
| Financing V1 signposts about 8px on phones | home-financing | Two-line boards. | 10.1px |
| Financing V2 ledger tight on phones | home-financing | Margin label above its cells. | Quote wraps 4/5/6 (was 6/7/7) |
| Dead CSS for the old backups | assembly | Removed. | 0 backup selectors |
| Inert `data-rx` attributes | system-companion-logo | The last 29 stripped from the shared chrome. | 0 left in markup |

**Erratum (Phase 10):** the "0 left in markup" above checked `base.html` only. The build script still generated 17 `data-rx` attributes in the nav, menu and footer links of the shipped pages. Its format string also printed the reaction codes as the visible labels of the Home menu's "On this page" links (for example "~swap/hinge/spinout/r" instead of "Before and after"). Both are fixed in Phase 10, and the shipped file now carries 0. See `GATE-phase10.md`.

| Logo page switch "pending" | system-companion-logo | Done in the assembly; gate updated. | n/a |

**After every change:** all five pages and `elbaz-construction.html` were rebuilt and checked.
- 0 console errors; no horizontal overflow.
- Single-file run after this correction:
  - navigation, back, deep link `#/contact/contact-form`, mail override and logo home all pass;
  - images: 0 broken;
  - console errors: 0.

## Still open, and why
**Acknowledged by Muse as open, not failures.** No rulings are invented here.
- **Home in-section carriers:** the hero frame docking into the Proof tray, the last services sheet becoming the BA frame, the Reviews stars flying as pins, and the Consult Z-pull.
- **Judgement calls flagged in the gates:**
  - hero letters' presence vs AA safety (home-hero);
  - the scope-plan explanatory notes vs the firm's definitions alone (kitchens);
  - the optional project description in Consult V2 (home-consult);
  - the Process figures' finesse (home-process);
  - the receding-sheet shade (home-services).

**Blocked:**
- the `pre-finalize` tag push (the remote refuses tags);
- no high-quality image source for Before/After;
- the MERSI source file and Makhno are unavailable;
- SCORECARD.md is held by Muse.

**Evidence:** `qa/finalize/phase6/`.
