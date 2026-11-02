# GATE: Phase 6 · Polish pass on the recorded defects

**Why this phase exists:** Phases 0–5 were complete and no Muse ruling had arrived. So I worked through the defects the gate reports themselves named as remaining: one at a time, each measured, each with its gate amended (struck through, with what fixed it), committed and pushed. No sub-agents, no background tasks.

## Fixed (measured)
| item | gate | fix | measured |
|---|---|---|---|
| Inner-page dividers were the system set | kitchens, bathrooms, renovation, contact | every boundary carries its hand-off; six new profiles (counter, rule, studs, weeks, join, steps); each page's last section hands to the footer on the footing | 20 inner seams drawn; 0 errors |
| Old Home dividers under Before/After and Process | home-ba, home-process | already replaced by the dividers pass; gates updated | n/a |
| Renovation one-plan bars truncated on phones | renovation | wider bars on narrow screens | 5 of 5 names fit at 390 and 1440 |
| Contact rows stopped dead | contact | one smoothed speed per row | 3 → 1 → 1 → 0 px per 150 ms on hold; held delta 0 |
| Bath fixtures bay drawn simply | bathrooms | redrawn: arm and head, valve trim and lever, niche, drain, glass handle, towel | build still steps 0→5, pin at top 0 |
| Proof: a touch on a block captured the page scroll | home-proof | direction lock (`touch-action: pan-y`, a grab only on a sideways start) | vertical start not held; sideways held; mouse grabs at once |
| Proof: blocks crossed the lead while arriving | home-proof | the site is clipped at its top edge during the arrival | verified mid-arrival |
| Projects V1 still frames hung crooked under reduced motion | home-projects | level when still | verified |
| Reviews 0.8 mark too quiet | home-reviews | clay dashed line at 2px; no numeral added | n/a |
| Towns: the drive happened off-screen on phones | home-towns | "See the route on the map" in the answer (user-controlled, no auto-scroll) | map in view at 390, van at Doral |
| Towns: the list was taller than the map | home-towns | tighter type and rhythm | 724 vs 702 at 1440 (was 883); 879 vs 702 at 1280 (was 1015) |
| Financing V1 signposts about 8px on phones | home-financing | two-line boards | 10.1px |
| Financing V2 ledger tight on phones | home-financing | margin label above its cells | quote wraps 4/5/6 (were 6/7/7) |
| Dead CSS for the old backups | assembly | removed | 0 backup selectors |
| Inert `data-rx` attributes | system-companion-logo | the last 29 stripped from the shared chrome | 0 left in markup |
| Logo page switch "pending" | system-companion-logo | done in the assembly; gate updated | n/a |

**After every change:** all five pages and `elbaz-construction.html` were rebuilt, with 0 console errors and no horizontal overflow.

## Still open, and why (not mine to decide alone, or blocked)
- **Home in-section carriers:** the hero frame docking into the Proof tray, the last services sheet becoming the BA frame, the Reviews stars flying as pins, the Consult Z-pull. Between sections the seam is now carried by the dividers (fork, rail, tally, pins, coast, footing). Moving elements across section boundaries is a motion-direction choice I would rather take from Muse than invent.
- **Judgement calls flagged in the gates:**
  - hero letters' presence vs AA safety (home-hero);
  - the scope-plan explanatory notes vs the firm's definitions alone (kitchens);
  - the optional project description in Consult V2 (home-consult);
  - the Process figures' finesse (home-process);
  - the receding-sheet shade (home-services).
- **Blocked:**
  - the `pre-finalize` tag push (the remote refuses tags);
  - no high-quality image source for Before/After;
  - the MERSI source file and Makhno are unavailable;
  - SCORECARD.md is held by Muse.

Evidence: `qa/finalize/phase6/`.
