# Audit round R3: challenge log (AUDIT FEEDBACK PACK, 2026-10-30)

This file is the Part A1 challenge record. Every point in the pack is weighed before anything is built.

- **Verdicts:** ACCEPT (implemented as asked), IMPROVE (the good part kept, plus a better idea), or REJECT (said openly, then replaced).
- **Grounds:** each verdict gives its reason and its citation. ⟦Sxxxx⟧ marks are WEB-SKILLS catalog entries, re-read for this round. [BANK] marks are bank entries.
- **Baseline:** measured on the file as it stood before the round (`qa/gate/r3-baseline.log`).
- **What counts as built:** only what is logged in TRACEABILITY.md under "R3".

## Part A: standing orders

| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| A1 | Challenge protocol | ACCEPT | This file. |
| A2 | Backups behind hidden Backup buttons | IMPROVE | See A2 below. |
| A3 | Five versions per section; slots 4 and 5 are new concepts; reference first | ACCEPT | TRACEABILITY rows come before code, as in every earlier round. Slots 1 to 3 hold the improved V1 to V3. Each slot keeps its number, so the audit's "V2" still means the same version. |
| A4 | Ten QA rounds per section, each finding challenged against the catalog | ACCEPT | See A4 below. |
| A5 | Traceability per change | ACCEPT | TRACEABILITY.md, section "R3". |
| A6 | Declutter pass with the Removal Test | ACCEPT | Removal Test ⟦S1314⟧: name it, state its job, remove it mentally, delete if nothing is lost. Applied per section and to the page systems. First result: see D11. |
| A7 | Facts lock | ACCEPT | Unchanged. The facts gate runs on every build. |
| A8 | Session and sub-agent rule | ACCEPT | All building is done in this session. No sub-agents are used for building. |

**A2, backups.** The current V1 to V3 of every section are copied into `src/sections/<id>/bk/` and ship in the same file as templates `tpl-<id>-b1` to `b3`.
- **Separation:**
  - The copies rename only the section's class prefix (for example `hx` becomes `bhx`), so a later change to a live version cannot reach a backup through a shared selector or keyframe.
  - Their shared helpers are frozen copies in `src/js/frozen/`.
- **The buttons:** they sit in each picker behind a small "more" button (aria-expanded, aria-controls). The B key shows them for every section.
  - A section showing a backup keeps its backup row open, so the way back stays in view.
  - Backups are never the default. URL `?v=heroB1` and the stored choice can still open one.
- **Default view:** each section opens on its audit winner (`data-def`) rather than on V1.
  - Improvement over the pack: the pack names winners but leaves the default open. The first screen should be the chosen set ⟦S1501⟧ (entry point = the most important thing).
- **Proof:** every backup is screenshotted against the same version in the pre-round file, both under reduced motion and both at 1440 and 375 (`qa/gate/r3-backups.log`).

**A4, QA rounds.** Each round is a named check, run by script where one exists:
- contrast, type roles, overflow and clipping at 375/768/1440
- keyboard and focus, reduced motion, hover gating, timing budget, occlusion, facts, console

A finding survives only if a catalog entry supports it. Survivors are fixed and the round is logged.

## Part C: page level

| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| C1 | Eyebrows banned; a sentence-case 13 to 14px --blue label with 0 letter-spacing, or none | ACCEPT + one correction | See C1 below. |
| C2 | Colour lock, one background cadence | IMPROVE | See C2 below. |
| C3 | Type-role lock | IMPROVE | See C3 below. |
| C4 | Density dial; height beat ~1000 to 1150px at 1440 | IMPROVE | See C4 below. |
| C5 | Dividers: vary the treatment, adapt the band, give Proof its own | ACCEPT | See C5 below. |
| C6 | The helper covers controls | IMPROVE | See C6 below. |
| C7 | --sun only for actions plus one signature moment per section | ACCEPT | Interactive colour must read apart from decoration ⟦S1497 Semantic Use⟧. Applied per section; each section logs its one signature use. |
| C8 | Lift the muted steel to 4.5:1 | ACCEPT | ⟦S1497 Contrast⟧. `--steel` #7a8090 (3.6:1 on --sky) stays only for strokes, which need 3:1. Text that used it moves to `--muted` #46557a (6.8:1 on --sky, 6.6:1 on --cream). On dark grounds it moves to `--on-dark-2` #b9c6e6 (9.3:1 on --ink, 5.4:1 on --blue). |

**C1, eyebrows.**
- ⟦S1314 §4⟧ names "oversized tracking or forced display treatments". ⟦S0220⟧ names the tracked caps kicker as slop.
- The measured kickers to remove: hero ×3 "Rembrandt Roofing & Restoration", Reviews V3 "On the record", How V3 "01 A real person…".
- The Ledger's source labels (Google / Better Business Bureau / …) are not eyebrows; they label data. They keep their job, lose the caps and tracking, and take the label treatment (pack F2.5).
- Correction: --blue on --ink is 1.7:1 and fails ⟦S1497⟧. On dark grounds the label is the same 14px sentence-case role in `--on-dark-2`, so there is one role with two values for the two grounds.

**C2, colour lock.**
- **Accepted:** --sky as the one pale surface, --sun as the one gold, --ink and --blue as the only darks (#1d2536 and #141c3d become --ink; #d99a06 becomes --sun, or --ink where it carried text) ⟦S1497 Palette Coherence⟧.
- **One cream decision:** `--cream` #f6f1e4 is the hero's surface. #fffaf0 goes.
- **Correction:** #fff stays as a role, not as a section background.
  - The owner's logo is exact bytes on white, so its nav and footer plates stay white.
  - Paper artefacts drawn as objects (the estimate sheet) stay white too.
  - ⟦S1314⟧ Boundaries: do not remove a distinction that carries meaning.
- **Cadence, chosen to keep every winner's ground and so need the fewest re-skins:** hero cream / reviews ink / work sky / family ink / steps sky / towns ink / call blue / footer ink.
  - That is light, dark, light, dark, light, dark, then the blue close.
  - Every version adopts its section's ground, so a switch never changes the page rhythm ⟦S1314 §1/§5⟧.
- **Re-skins this needs:**
  - Hero V3 (ink to cream).
  - Reviews V2 (white to ink): the winner. The Reviews set was already two-thirds dark, so the rhythm decides it.
  - Family V2 (cream to ink) and V3 (blue to ink).
  - Towns V1 and V2 (light to ink).
  - Call V2 (#141c3d to blue) and V3 (white to blue). The pack itself asks for this for V3.

**C3, type roles.** The rule is accepted: one style per role, no weight 850, no centred headings without a reason ⟦S1500 Consistency⟧ ⟦S1501 Weight⟧.
- **Problem with the numbers:** "H1 at 36 to 48px" next to "hero display 60px" (F1.1) would give one page two H1 styles. The page has exactly one H1, the hero headline.
- **Resolution, three named roles:**
  - `--t-hero` (60px above 1024, 40px on phones, weight 700): the H1 in every hero version whose headline is text.
  - `--t-h1` (36 to 48px, weight 700): the H1 in hero versions whose display is a graphic or a canvas, such as the shingle wall, where the H1 is the pinned static line.
  - `--t-h2` (clamp to 48px at 1440, weight 700): every H2 on the page.
- At 48px the H2 sits one clear step under the 60px hero and 2.8× the 17px body. ⟦S1501⟧ asks for at least 1.5× between levels; ⟦S1500⟧ for at least 1.25× per step.
- **Display graphics:** the giant scroll-fill word in Call V1 and the Towns V3 answer are display graphics, not headings. They get their own named role, `--t-mark`, and are aria-hidden where they repeat text.
- Family V2's 25.5px H2 is wrong and moves to `--t-h2`.

**C4, density and height.**
- **Accepted:** a height beat of ~1000 to 1150px at 1440 for unpinned sections, and "no void beside a wall" ⟦S1498 Whitespace⟧ ⟦S1499⟧.
- **Correction:** a pinned version is measured by its pinned viewport, not by its scroll length. A scroll-progress timeline is long by design ⟦S1325⟧, and forcing it short would break its mechanism.
- **The density dial:** at most ~180 rendered elements per version at 1440.
  - The 1411-element Towns V2 is the outlier (24 cards × histogram bars). Its fix list already cuts the grid to 8.
  - The dial is a guide for the build, not a hard gate.

**C5, dividers.**
- **Accepted as asked:** each boundary gets its own cadence (height, hang or rise, depth), and the shade band takes the host version's ground (a light shade on dark grounds) ⟦S1498 Rhythm⟧ ⟦S1314 §1⟧.
- **Proof's divider:** Proof now hosts the reviews-to-work boundary as a rise at its own bottom edge. It is hidden while Proof shows a backup, so the kept Constellation (B1) still has no divider of its own, exactly as before.

**C6, the helper.**
- **Correction:** on touch screens the helper has nothing to switch, because the companion never mounts there. So on coarse pointers the picker is removed, not moved. That clears the mobile Call bar completely.
- **On a mouse:** the helper yields. It slides out of the way while its box overlaps any control in a section, and it comes back when clear ⟦S1306⟧ ⟦S1314 §2⟧ (essential actions must not be covered).
- **Mobile CTAs:** they keep their bottom clearance through `--mbar`.

## Part D: cursor and interaction

| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| D1 | Randomised blink | IMPROVE | See D1 below. |
| D2 | Wire data-c onto 8 elements, each with its own signature | ACCEPT | ⟦S1448⟧ ⟦S1314 §7⟧: the hook existed with no element carrying it. The signatures draw in the companion's own layer, so they work for House, Hammer and Drop alike. |
| D3 | CTA promotion: arcs draw in over 160ms; scale(0.97) on press | ACCEPT | ⟦S0063⟧ STANDARDS: press feedback 100 to 160ms, scale 0.95 to 0.98. ⟦S0220⟧. The phone glyph gains two signal arcs that draw on hover. The page-wide press value moves from .96 to .97. |
| D4 | Kill infinite hover loops | ACCEPT | See D4 below. |
| D5 | Springs on the follow layers | ACCEPT | See D5 below. |
| D6 | Durations | ACCEPT | ⟦S0063⟧ standard 4 (UI under 300ms), ⟦S0089⟧, ⟦S0050⟧. Each value is checked where it lives and logged in its section. |
| D7 | Switcher: one shared 140ms ease-out with section-keyed artwork; press scale 0.94 for 100ms | ACCEPT | See D7 below. |
| D8 | Gate hover behind (hover:hover) and (pointer:fine) | ACCEPT | ⟦S0063⟧ Std 8. Applied to every live CSS file. The frozen backups keep their original gates, so they stay what they were. |
| D9 | Companion occlusion and label | ACCEPT, with a choice | See D9 below. |
| D10 | Hammer strike on power2.in | KEEP, reasoned | See D10 below. |
| D11 | No cursor trail or ripple layer | ACCEPT, and extended | See D11 below. |
| D12 | Keep touch-disable, reduced-motion off, mood accessories, press coverage | ACCEPT | Unchanged. |

**D1, blink.**
- **The pack's premise is half wrong:** a blink already exists (every 2.6 to 7.1s, 60/80ms linear).
- **The correction is right:** intervals that long read as a stare, and linear lids look mechanical. Retuned to 2.8 to 4.6s, with the lid closing over 90ms and opening over 90ms, ease-out, plus one blink on every mood change ⟦S1448⟧ ⟦S0405⟧.
- All three characters share the `.lid` parts. The house's windows are its lids.

**D4, infinite hover loops.**
- Hover is a tens-per-day action: reduce it, never loop it ⟦S0063⟧ (frequency) ⟦S1314 §8⟧ (perpetual motion competing with reading) ⟦S0083⟧.
- **Changes:**
  - Hero tab flap: one 0.45s cycle on enter.
  - Work bubbles: one 0.6s rise.
  - The House's heading patrol is deleted, together with the whole "heading" kind. Headings are not interactive, so a reaction to them signals a false affordance ⟦S1314 §7⟧.

**D5, springs.**
- ⟦S0089⟧: decorative mouse-tracking is a spring case, because a spring keeps velocity when the target moves, whereas a fixed-duration tween restarts its curve.
- **Settings:** stiffness 500, damping 30, mass 1 (ζ ≈ 0.67, so a small overshoot) on the character and its tilt.
- The nail stays on the pointer with zero lag, which is inside the pack's 120ms bound.

**D7, switcher.**
- **The shared part:**
  - The sun indicator slides between labels over 140ms ease-out.
  - Pressing a label scales it to 0.94 for 100ms.
- **The section artwork:** a 14px glyph beside the section's name plays once on each switch. The seven glyphs:
  - hero: a shingle lifts
  - reviews: a star ticks
  - work: tape clicks one notch
  - family: a hat brim tips
  - steps: a pencil dot
  - towns: a pin drops
  - call: the phone dot pulses once
- **Not on phones:** the label is hidden there to keep the picker small, so the artwork goes with it. The press state stays.

**D9, companion occlusion and label.**
- **Accepted as asked:** the rest offset moves from +22/+22 to +34/+34, and the character fades to 35% while the pointer is down.
- **The label choice:** the label bubble is removed. On inspection no element carries a label (`data-cursor-label` appears nowhere), so the bubble has no job. Removal Test ⟦S1314⟧.

**D10, the hammer strike.**
- ⟦S0063⟧ Std 3 bans ease-in on entering and exiting UI because it delays the moment the user watches.
- The strike is neither. It is a character's physical action: a falling head accelerates into contact ⟦S0083⟧ slow-in/slow-out and physics ⟦S0089⟧ (motion from a physical model).
- It lasts 0.08s. The user's feedback (the nail setting on press) is instant and separate, and the visible return is ease-out.
- Changing it to ease-out would make the hammer decelerate into the nail, which reads as a tap, not a strike.
- The one change: its 0.3s elastic recoil becomes a 0.22s ease-out, inside the 300ms budget.

**D11, no cursor trail or ripple layer.**
- **The pack only forbids adding one.** The Removal Test shows the page already has one: the per-section cursor effects (sun halo, star dust, viewfinder, shavings, ripples, compass, signal arcs).
- **Removal Test:**
  - Its job is section flavour.
  - The companion's mood accessories already do that job.
  - Removing it loses no meaning, state, action or hierarchy.
- **Decision:** retired. The code stays in `js/cursorfx.js`, unmounted ⟦S1314⟧ ("remove effects that repeat the same job") ⟦S1331⟧.

## Part E: quirks
- **E1 to E3: ACCEPT.** Each is reproduced first, then fixed, and logged in its section.
- **E4:** this is the pre-activation state of How V3's scroll trail; there is no rotating dim cycle.
  - Line 2's measured 2.95:1 is the mid-scrub opacity.
  - The F5 fix applies: lines rest at full ink, and emphasis moves to the ridge.

## Parts F and G
These are challenged section by section, in the per-section blocks below. Each block is written before that section's code.

## F1 / G: Hero (written before the hero code)

Measured first: at 60px, "Springboro's family roofers" sets 775px wide with "family roofers" bold. At 40px it is 520px. A 375 phone gives 343px.

### Winner V2, fix list
| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| 1 | 60px above 1024, two lines; 40px on phones with the same break | IMPROVE | See F1.1 below. |
| 2 | Bold exactly one phrase; never split a word's weight | ACCEPT, and keep the interaction | See F1.2 below. |
| 3 | The 17-word sub | ACCEPT | Facts-locked. "Runs it today" agrees with "president since 2015". The hours stay in Call and the footer ⟦S0650⟧ (subtext ≤20 words). |
| 4 | Remove the eyebrow; at most 4 text elements | ACCEPT, with item 8 folded in | See F1.4 below. |
| 5 | Keep the diagonal edge and one ruler rule; delete the grid and per-line ticks | ACCEPT | Removal Test ⟦S1314⟧. The rafter grid (`.hx2-raft`) and the three course lines with keyway ticks repeat one job, so they go. A single ruler rule (ticks every 8px, majors every 40px) stays under the headline block. |
| 6 | Mobile: 24px bottom padding; photo top ≤812px | ACCEPT | ⟦S1499⟧ content priority. Checked at 375×812. |
| 7 | Load choreography once, never on re-entry | ACCEPT | See F1.7 below. |
| 8 | Proof line "4.9 stars from 295 Google reviews" | ACCEPT, as the secondary link | See item 4. |

**F1.1, the headline size and break.**
- The two-line set needs a 780px text column, which a split hero can only give from about 1200px up.
- On phones, 40px with the same break is impossible (520px of text in 343px of space).
- **The rule kept is the phrase break:** the lines only ever break at "Springboro's / family roofers / since 1995."
- **Sizes:** 60px from 1024px up (the hero role). The two-line set runs from 1200px, where the text column is fixed at ≥880px. Between 1024 and 1199px, and at 40px on phones, the same phrases set as three lines.
- ⟦S1500⟧ (no orphaned breaks), ⟦S0650⟧ (headline 2 to 3 lines).

**F1.2, the one bold phrase.**
- The per-letter thickening split words into heavy and light halves, which reads as a rendering fault ⟦S1500 Consistency⟧.
- **The proximity mechanism is kept and quantised per word:**
  - A word thickens as a whole when the pointer nears its centre.
  - At rest, only "family roofers" is bold (700). The rest is light (300).
  - The thickening tops out at 700, so the bold phrase is never outweighed.
- The idle gust wave is deleted. It is perpetual motion competing with reading ⟦S1314 §8⟧, and its job passes to the one-time load choreography.

**F1.4, the four text elements.**
- They are: the H1, the sub, the Call button, and one secondary link.
- The proof line (item 8) becomes that secondary link, "4.9 stars from 295 Google reviews", pointing to #proof. It replaces "Get a written estimate".
- **Why:**
  - The hero carries one checkable fact ⟦S1303⟧.
  - The page's estimate claim (flag C11) leaves the hero.
  - The count stays at four ⟦S0650⟧.
- The 14px label role is used, not 13px: C1 makes one label role page-wide.

**F1.7, load choreography.**
- Lines rise 14px with a 320ms fade, 90ms apart.
- The sub and CTA follow at +180ms.
- The photo edge wipes on a clip-path over 480ms --ease-x.
- The proof link's underline draws over 250ms (background-size).
- On a switcher re-entry the version arrives static. Re-running an entrance on a deliberate tool action is motion with no information ⟦S0063⟧ (frequency) ⟦S1314 §8⟧.

### V1 and V3
| Version | Point | Verdict | Reason |
|---|---|---|---|
| V1 | Pin the proposition as static text, 28 to 32px, in the cream band | IMPROVE | The pinned H1 is made visible. C3 sets the graphic-hero H1 at 36 to 48px (`--t-h1`), and the pack's own C3 overrules its 28 to 32. The canvas keeps its sweep. ⟦S1501⟧: the proposition must not depend on a canvas. |
| V1 | Cap canvas type at ~55% of the wall height | ACCEPT | ⟦S1498⟧ balance. |
| V1 | Same 17-word sub; delete the CTA glow; keep sun to sun-hi; one tab flap of 0.45s on enter | ACCEPT | ⟦S0063⟧ ⟦S1314 §8⟧. The flap's #d99a06 becomes --sun (C2). |
| V1 | One-time band entrance (10 to 12px rise, 240ms, 60ms stagger); no scroll cue | ACCEPT | ⟦S0063⟧ STANDARDS stagger 30 to 80ms. There is no scroll cue to remove. |
| V1 | Wall under-colour #070d1c | (C2) | Becomes --ink, in both CSS and canvas. |
| V3 | Delete the counter; a 220ms crossfade in a one-line mask, not a vertical roll; 72px cap; keep the pause button | ACCEPT | ⟦S1314 §8⟧. The blur-roll per letter was the slow part (0.45s + 0.8s per change). |
| V3 | Cadence | (C2) | The full-bleed dark photo breaks the cream hero ground. V3 is recomposed on cream: headline and copy above, the job photo as a wide band across the lower part. This is also a composition unlike V2's split ⟦S0626⟧ (never the same anchor twice). |

### New versions
| Pack's direction | Verdict | Built instead |
|---|---|---|
| (a) V1's shingle wall with the proposition pinned from the start | REJECT | This is V1 after its own fix list. A slot holding it would be a variation, which A3 forbids. Built instead: **V4 "Stitched headline"** ⟦S0218⟧ inline image typography. Real job photos sit between the words of the headline at type height ("Springboro's [photo] family roofers [photo] since 1995."). Each photo widens on hover or focus to show more of the job. On phones the photos leave the line and stack as a strip under it, as the skill directs. No split, no canvas, no band. |
| (b) A pure typographic poster in the F5-V3 grammar at hero scale | ACCEPT | **V5 "Poster lines"**: no photo and no canvas. The H1 sits at the hero role. Under it, three index rows carry the family facts as dated lines (1995 Bunk Walker founded it; 2015 Wade runs it; Today Rachel answers the phone), separated by ridge zigzag rules that draw in once. The last row is the Call link. The idea comes from the subject's own inventory ⟦S0095⟧ (name, year, rituals). |

## F2 / G: Reviews (written before the Reviews code)

The cadence lock (C2) puts Reviews on --ink. Every version moves to it, which is two-thirds of the set already (V1 blue, V3 near-ink).

### Winner V2 Ledger
| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| 1 | Remove the tape-measure reel | ACCEPT | Removal Test ⟦S1314⟧: it decorates a rule that already draws itself. The faint shingle-course background goes by the same test (A6). |
| 2 | Mobile 1439px down to ≤1150px; tighten rows; un-stick the head | ACCEPT | ⟦S1499⟧ ⟦S1498⟧. The head is already static on phones; the rows, the figure scale and the note tighten. |
| 3 | Star clip at exactly 98% (117.6/120) | REJECT the number, keep the intent | See F2.3 below. |
| 4 | Hover ≤300ms on (0.23,1,0.32,1); press tick ≤.3s | ACCEPT | ⟦S0063⟧ ⟦S0089⟧. The check link's snap loses its .14s delay and runs .18s (D6). The tick goes .45s to .30s. Hover transitions move to --ease-x. |
| 5 | Source labels: lift the colour or drop the tracking | ACCEPT, both | They take the one label role: 14px, sentence case, 0 tracking, --on-dark-2 at 9.3:1 (C1). |
| 6 | No count-up on 4.9 | ACCEPT | There is none in V2, and none is added. |
| (C7) | Accent | | The five stars in sun are the section's one signature moment. The check links take sun as the action colour. |

**F2.3, the star clip.**
- The five stars are laid out from x=1 to x=117 of the 120-wide box.
- A 117.6 clip would paint all five stars fully, which shows 5.0 for a 4.9 rating ⟦S1314⟧ ("product truth: metrics specific and honest").
- The honest clip is four full stars plus 90% of the fifth: the fifth spans 97 to 117, so the clip is 97 + 0.9 × 20 = **115.0**.
- The current 115.4 is replaced by exactly 115.0.

### V1 Constellation
| Point | Verdict | Reason |
|---|---|---|
| Formation from visibility; rebalance; mobile gap; 40 to 60ms credential stagger; reduced-motion state stays | ACCEPT, with the conflict resolved | See V1 below. |

**V1, the conflict and its resolution.**
- **The conflict:** BRIEF-v2 rule 4 says the Constellation stays pixel-untouched. The pack, the user's latest word, asks for fixes.
- **Resolution, through the backup mechanism (A2):**
  - B1 holds the Constellation exactly as kept, proven pixel-identical in `qa/gate/r3-backups.log`.
  - Slot 1 is a working copy, and the fixes go there.
  - Rule 4's intent (never lose the owner's build) holds. The pack's fixes ship.
- **Formation:** it completes when the section is ≥50% in view and then holds. It is no longer scrubbed back and forth with scroll ⟦S1314 §8⟧ (scroll effects must explain something; reversing a formed "4.9" explains nothing).
- **Composition:** the glyph moves left and down, toward the copy. Phones lose the gap between glyph and copy.
- **Credential lines:** staggered 50ms.
- **Ground:** --ink (C2).
- **Wording:** the copy also takes the locked wording this round ("BBB A+ accredited since 2001", "$2M liability insurance"). This was flag 1 of the last report; it could not be fixed while the build was untouchable.

### V3 Roller board
| Point | Verdict | Reason |
|---|---|---|
| Roll only 4.9 and 295, illegible intermediates, ≤600ms | ACCEPT | ⟦S0063⟧ Std 4. Intermediate digits pass under a 3px motion blur. |
| 2001 and 1995 fixed; Owens Corning becomes a board cell; 1995 leaves | ACCEPT | "Family-run since 1995" is the Family section's fact. On the board it repeats rather than proves ⟦S1499⟧. |
| Cut the dead quarter; delete the kicker | ACCEPT | ⟦S1498⟧ ⟦S0001⟧. The second row becomes three equal cells: 2001, Platinum Preferred, $2M. |
| (C2) | | #1d2536 becomes --ink. The rail's #d99a06/#b47e04 become --sun and a sun-ink mix. The cell greys move to the --shingle family. |

### New versions
| Pack's direction | Verdict | Built instead |
|---|---|---|
| (a) V1's formation completing on visibility, as a full version | REJECT | It is V1 after its fix list, so a slot holding it would be a variation (A3). |
| (b) V3's flap on 4.9/295 plus V2's verification links | REJECT | It splices two existing versions, again a variation. |

**Built instead (two wholly new concepts):**
- **V4 "Office wall":**
  - **References:** [BANK] 514 The Record Institute (artefact cards: a metallic sheen sweeps on hover and focus; the top tier alone glows gold) and [BANK] 372 Glare Hover (an analytic streak profile, 650ms sweep).
  - **What it is:** each credential is a framed plaque on the office wall at 38 N Pioneer Blvd. They are typographic plaques, not replicas of anyone's certificate or logo.
  - **Hierarchy:** the 4.9 / 295 plaque is the large frame and the only one that glows sun.
  - **Interaction:** hover or focus sweeps a glare across a frame. Each plaque links to its check.
- **V5 "The seal":**
  - **Reference:** [BANK] Q164 Circular Text (a ring of letters; a drag spins it and a fling carries momentum, decaying to the cruise speed; it spins only on screen; still under reduced motion).
  - **What it is:** one roofer's seal. "4.9" sits in the centre, and the ring carries every credential in sentence case: "4.9 stars from 295 Google reviews · BBB A+ accredited since 2001 · Owens Corning Platinum Preferred · $2M liability insurance".
  - **Departures from Q164:**
    - It does not cruise forever ⟦S1314 §8⟧. It turns only when dragged or flung, with a 1.2s decay, or by a slow scroll-linked quarter turn.
    - The ring is aria-hidden, and the same facts sit beside it as a real list with the check links.

## F3 / G: Work (written before the Work code)

Ground stays --sky (C2). ba2 remains the only before/after pair on the page.

### Winner V1 Filmstrip
| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| P1 | Pause and Next must work; the helper covers them | ACCEPT | The helper's yield (C6) moves it off any control. `occl.mjs` checks this. |
| 2 | Pause on hover | ACCEPT | Hover the strip and it holds; leave and it resumes (unless the visitor took control). The visitor reads what they point at ⟦S1314 §8⟧ (motion must not compete with reading), WCAG 2.2.2. |
| 3 | Tile click 0.8s to 0.45s; arrows the same | ACCEPT | ⟦S0063⟧ Std 4. The arrow steps go 0.4s to 0.45s, so both moves share one value. |
| 4 | Delete the pointer-follow glow; delete the rotating speed square | ACCEPT | Removal Test ⟦S1314⟧. Neither carries information; the tape and its ticks stay. |
| 5 | Mobile: four bottom layers to three | ACCEPT | ⟦S1499⟧. The tape leaves on phones. The strip, the caption and the controls remain. |
| 6 | Keep the drift, the .15s caption crossfade, brightness(.7), and a click that stops autoplay for good | ACCEPT | Unchanged. |
| E3 | After a manual Next, autoplay looks paused but the control does not show it | ACCEPT, cause found | See E3 below. |
| (D4) | The level bubble's infinite 1.4s hover loop | | It becomes one 0.6s drift. |
| (D6) | Nail stagger | | 0.025s. |
| (D2) | data-c="tile" | | The companion lays a tape across the tile. |

**E3, cause and fix.**
- **Cause:** a click intentionally stops autoplay, and the button swaps to its play icon, but its aria-label stays "Pause the moving photos". Under hover the play icon is also replaced by the level vial, so the state is easy to miss.
- **Fix:**
  - The label follows the state ("Play the moving photos").
  - A held strip gives the button a filled ink face, so "stopped" reads at a glance ⟦S1314 §7⟧ (selections need a clear active state).

### V2 Gable grid (weak)
| Point | Verdict | Reason |
|---|---|---|
| Delete the chevron wallpaper | ACCEPT | ⟦S1314⟧ Removal Test. |
| Full rectangles at rest; the roofline morph on hover only | ACCEPT | It already lowers only on hover. The rest state is checked to be a clean rectangle. |
| Permanent small captions | ACCEPT | ⟦S1314 §7⟧ (hover must not be the only way to reveal information). |
| ba2 before and after adjacent, labelled as one job | ACCEPT | ⟦S1314⟧ product truth. They become the two top tiles of one row, captioned "Same house, before" and "Same house, after". |
| FLIP the container with a counter-scaled image, or a clip-path reveal at 0.45s | ACCEPT the first, at 0.45s | Flip already moves the container (`scale:true`). It now runs 0.45s on --ease-x, not 0.9s expo ⟦S0063⟧ ⟦S0089⟧. |
| Overshoot on a spring, or drop it | DROP | The gable's back.out overshoot on a hover state is "bounce on an ordinary state change" ⟦S1314 §8⟧. It becomes ease-out. |

### V3 Course blinds (fix)
| Point | Verdict | Reason |
|---|---|---|
| Rest states: scrub 0 shows 100% BEFORE, scrub 1 shows 100% AFTER; labels agree | ACCEPT | The scrub is mapped so the ends hold real states ⟦S1314⟧ (product truth). The labels switch at 50% coverage. |
| The wipe starts at the roofline | ACCEPT | The courses are laid from the roofline down, as shingles go on, reversing the bottom-up order. The hammer rides the leading course. |
| Mobile spacing; keep the nail row; drop the drip | ACCEPT | Removal Test: the drip edge duplicates the nail row's job. |
| Watch the wheel capture | ACCEPT | The frame is not pinned and takes no wheel listener. Checked: scroll is never trapped. |

### New versions
| Pack's direction | Verdict | Built |
|---|---|---|
| (a) Two-job honesty treatment: ba2 plus one real job as single photos, never a fake pair | ACCEPT | **V4 "Two jobs, told straight":** a two-column case file. Job 1 is ba2, its before and after shown together as the one genuine pair. Job 2 is one finished-roof photo, labelled "No before photo of this one". Each column carries what the photos are and what they are not. References: [BANK] Checklist 11 (say every photo is real work) and ⟦S1314⟧ (product truth). |
| (b) A drag-driven filmstrip | REJECT | A drag filmstrip is V1's layout with a different input, so it is a variation (A3). Built instead: **V5 "Job index"** from [BANK] VERDE (an archive index of rows, each with a mini thumbnail, and a preview that follows the pointer through a 0.2s CSS transition). The six jobs become six rows. Hover or focus shows a large preview that glides after the pointer. Each row keeps its own small photo, so touch and keyboard lose nothing. No layout here repeats V1 to V4. |

## F4 / G: Family (written before the Family code)

The ground is --ink (C2). V1 is already ink; V2 (cream) and V3 (blue) move to it.

### Winner V1 WALKER (polish only, the animation preserved)
| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| P1 | The plate line at y=214 cuts faces: put it behind the photo clip or in the lower third | IMPROVE | See P1 below. |
| P2 | .fm1-h at ~2 to 2.25rem | REJECT | See P2 below. |
| P3 | Figure ≤52svh | ACCEPT | ⟦S1498⟧. Also brings the section toward the C4 height beat. |
| P4 | Door press .35 to .22s; .fm1-call:active scale(.97) over 160ms | ACCEPT | ⟦S0063⟧ STANDARDS (press 100 to 160ms, .95 to .98). |
| P5 | Clip or drop the web struts over A and K | DROP | Removal Test ⟦S1314⟧: the struts add no meaning to the truss outline. |
| P6 | will-change only while animating | ACCEPT | ⟦S1315⟧ (optimize web animations). The static will-change on the SVG goes; GSAP's own transforms promote only while they run. |
| P7 | A 2px year rail with sun fill | ACCEPT | ⟦S1325⟧ as a 2px rail beside the three facts, filling sun as they scroll through. It is small and local to the facts list, so it does not repeat How V1's full-section spine. |
| P8 | Below 768px, rafters and plate only | ACCEPT | ⟦S1499⟧. |
| (D2) | | | None of the eight hooks lives here. |

**P1, the plate line.**
- Behind the clip, the line still shows in the gaps between letters at face height. The lower third would still cross the letters.
- **Instead:** the whole truss lifts so its bottom chord sits just above the letters' cap line (y=190). It then crosses no letter and no gap. The truss reads as a roof over the name, which was its job ⟦S1498⟧ (figure and ground).

**P2, the heading size.**
- C3 (the pack's own page-level rule) gives every H2 one size. A Family-only 32 to 36px H2 would bring back the role drift C3 removes ⟦S1500 Consistency⟧.
- The giant WALKER is the display. The H2 stays at the 48px role, which is already under half the name's height.

### V2 Statement (fix)
| Point | Verdict | Reason |
|---|---|---|
| Once-play word reveal: y20, opacity 0, 0.8s (0.16,1,0.3,1), stagger .07, trigger at 20%, once | ACCEPT | ⟦S1329⟧ staggered word reveal, its own values. It replaces the scroll-scrubbed reveal. |
| House DrawSVG: ridge and eave 0.9s power3.out, then 8 course lines .06 to .1s apart | ACCEPT | Course stagger 0.08. |
| The say-line is the real h2 | ACCEPT | ⟦S1501⟧. The sr-only h2 goes. The statement takes the H2 role at 48px. |
| Wobble becomes one 160ms tilt | ACCEPT | ⟦S0063⟧. |
| Faces in the middle third | ACCEPT | object-position is re-set on the 4:5 crop. |
| (C2) | | Ink ground; the skyline silhouette becomes a faint light tone. |

### V3 Truss (fix)
| Point | Verdict | Reason |
|---|---|---|
| The say line on its own row | ACCEPT | ⟦S1498⟧. |
| Truss = family only (Bunk rafter, Wade king post, Rachel tie beam, "Today, the crew"); BBB, OC and the address move out | ACCEPT | ⟦S1499⟧. Proof belongs to Reviews and the address to Call. |
| Crew photo crop on selection; Bunk pre-selected; hover preview dims the others to .55; spotlight brightness 1.6, r≈180 | ACCEPT | ⟦S1362⟧ ⟦S1314 §7⟧ (a clear selected state from the start). |
| (C2) | | Ink ground. |

### New versions
| Pack's direction | Verdict | Built instead |
|---|---|---|
| (a) A family-only truss with photo payoffs | REJECT | It is V3 after its own fix list (family-only members, crop on selection), so it is a variation (A3). |
| (b) The year rail (P7) as the spine | REJECT | A scroll-filled spine is How V1's mechanism (⟦S1325⟧). A second one on the same page repeats a trick ⟦S0626⟧ ("never the same anchor twice"). P7 keeps the rail small inside V1. |

**Built instead (two wholly new concepts):**
- **V4 "Three cards":**
  - **Reference:** [BANK] Harvest [201], the CSS-only flip card (perspective 1000px, preserve-3d, backface hidden, rotateY(180deg), class toggle on click/tap; .4s ease-out, here .36s --ease-x).
  - **What it is:** three cards from the family's own inventory ⟦S0095⟧.
  - **Fronts:** a year and a name.
  - **Backs:** the one sentence of fact. Rachel's back carries the phone link.
  - Each card is a real button with aria-pressed. Reduced motion swaps the faces with no turn.
- **V5 "Editorial panorama":**
  - **Reference:** ⟦S1354⟧ agency-grid-layout-minimal (an oversized headline on a strict grid, a narrow metadata column, a panoramic image block, a slow image settle).
  - **What it is:**
    - A wide panoramic crop of the real crew photo.
    - An oversized "One family since 1995." on the grid.
    - A narrow column of the facts as a definition list.
  - **Adaptations:**
    - The skill's "tiny uppercase labels" are replaced by the page's one label role (C1).
    - The skill's light neutrals are replaced by the section's ink ground (C2).
    - The image settles once from scale 1.06 to 1.

## F5 / G: How (written before the How code)

The ground is --sky (C2). V3's #fff and V2's #eef3fb move to it.

### Winner V3 "Poster lines"
| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| 1 | Kill the rotating dim cycle; all lines full ink; emphasis by the ridge filling in accent over 300ms, advancing every ~4s, pausing on hover/focus | IMPROVE | See F5.1 below. |
| 2 | Only line 1 (tel:) is a link | ACCEPT | ⟦S1314 §7⟧. "Estimate." and "Roof." looked like actions but jumped to other sections. |
| 3 | One weight per line | ACCEPT | ⟦S1500⟧ (over-use of bold; two weights mixed in one line). |
| 4 | Pale tint, not #FFFFFF | ACCEPT | It is --sky (C2). |
| 5 | Numerals stay; descriptors sentence case at 13px/700 | ACCEPT, at the label role | The one label role page-wide is 14px/600 (C1). |
| 6 | Delete the diagonal hatch; keep the ridge zigzag | ACCEPT | Removal Test ⟦S1314⟧. |
| 7 | Entrances: 30 to 50ms stagger, translateY(8px) plus opacity, once | ACCEPT | ⟦S0063⟧ STANDARDS (stagger 30 to 80ms). It replaces the y40 scroll-scrub. |

**F5.1, the emphasis cycle.**
- The audit's "dim" is the scroll-linked mid-state (E4). There is no timer in the build.
- **Kept:** the lines rest at full ink, and the emphasis moves to the ridge, which fills in sun over 300ms.
- **Changed, the 4s timer:** an endless timed cycle is perpetual motion that competes with reading ⟦S1314 §8⟧. So the emphasis advances with reading instead: the row nearest the viewport centre is the active one.
- Hover or focus on a row takes the emphasis while it lasts. Nothing moves on its own.

### V1 Downspout spine (fallback)
| Point | Verdict | Reason |
|---|---|---|
| Inactive titles at alpha ≥.78 | ACCEPT | ⟦S1497⟧. Measured: .78 of ink on sky is 7.9:1. |
| A 200ms crossfade at viewport centre | ACCEPT | |
| Hanger tick in 120 to 180ms | ACCEPT | |
| Reduced motion at full ink | ACCEPT | |
| The heading in the steps' axis | ACCEPT | ⟦S1498⟧ continuity. The head stops being a sticky side column and sits above the steps on their left edge. |
| Visible focus on the phone link | ACCEPT | ⟦S1049⟧. |
| Mobile gaps 48 to 64px | ACCEPT | |
| Cut the rain dashes | ACCEPT | Removal Test. |

### V2 Step pager (weak)
| Point | Verdict | Reason |
|---|---|---|
| Inactive tab contrast | ACCEPT | Labels at --muted (6.8:1), not 50% opacity. |
| Pause on hover/focus; a manual selection stops the timer | ACCEPT | WCAG 2.2.2, ⟦S1314 §8⟧. |
| Rows, not cards | ACCEPT | The rounded, ringed panel chrome goes. A rule sits above the pager instead. |
| No duplicated hours | ACCEPT | Checked: the hours appear once. |
| A real artefact in the panel | ACCEPT | Step 3 shows the real finished-roof photo in place of the drawn roof ⟦S1314⟧ (product truth). Steps 1 and 2 keep their drawn scenes: there is no real photo of a phone call or an estimate. |
| Remove the bracket artefact | ACCEPT | The dimension brackets in scene 2. |
| Clip-path inset reveal at 250ms | ACCEPT | It replaces the 0.4s crossfade ⟦S0063⟧. |
| Tabs :active scale(.98) | ACCEPT | |

### New versions
| Pack's direction | Verdict | Built instead |
|---|---|---|
| (a) V1's gutter pipe with contrast decoupled from scroll, heading in-axis | REJECT | That is exactly V1's fix list, so it is a variation (A3). See V4 below. |
| (b) No numbers, three artefact panels (phone / estimate sheet / finished roof) | ACCEPT | See V5 below. |

**V4 "One house, three states" (built instead of (a)):**
- **Reference:** ⟦S0441⟧ gsap-scrolltrigger-storytelling (one pinned artefact, its states revealed per label).
- **What it is:** a single drawn house elevation in a sticky stage, with the three steps scrolling beside it. Each step changes the same house:
  - 1: a phone rings at the door.
  - 2: measuring lines run along the roof.
  - 3: new courses lay across the roof.
- **Limits:**
  - The pin spans only the three steps, so the user is never trapped ⟦S1314 §8⟧.
  - Reduced motion shows the finished state with all three steps.

**V5 "Three artefacts" (the pack's (b)):**
- Three side-by-side panels with no numerals: the phone with the number; an estimate sheet; the finished roof.
- The estimate sheet is drawn as blank ruled lines and a sign-off line. It carries no figures and no names, so it is an illustration, not a fake record ⟦S1314⟧.
- The finished roof is a real job photo.
- References: ⟦S0095⟧ (the subject's own artefacts) and ⟦S1314⟧ (product truth).

## F6 / G: Towns (written before the Towns code)

The ground is --ink (C2). V3 is already ink; V1 (light) and V2 (white) move to it. Every number on these versions comes from `data/towns.js` (Census / ACS), and the source is printed.

### Winner V3 Town finder (keep + graft)
| # | Point | Verdict | Reason and citation |
|---|---|---|---|
| 1 | The tape at rest is broken: seat it in its case, or hide it until a selection | ACCEPT, hidden | ⟦S1314⟧: a resting tape with no town says nothing. |
| 2 | The vane art bleeds: mask it or drop it | DROP | Removal Test ⟦S1314⟧. |
| 3 | Compass ~25% smaller, or the readout in the rose centre | ACCEPT, smaller | 420px becomes 315px ⟦S1498⟧. |
| 4 | Needle parked neutral at 45° and 40% opacity until a selection | ACCEPT | ⟦S1314 §7⟧ (no false state). |
| 5 | Chips 44×44 | ACCEPT | ⟦S1139⟧ (44px taps). |
| 6 (E1, E2) | Clear on empty; ~150ms debounce | ACCEPT | See E1/E2 below. |
| motion | Needle spring ≤500ms with the tape in the same beat; answer crossfade ≤200ms; chip press .97 for 60 to 80ms; a miss is a ±4° shake over 200ms | ACCEPT | ⟦S0063⟧ ⟦S0089⟧. Needle and tape both run 0.45s, back.out(1.2) on the needle. |
| GRAFT | After a "Yes", reveal a slim V1 ring map with the town's house lit and the connector drawn | ACCEPT | ⟦S0083⟧ ⟦S1499⟧. A 240px ring map (V1's honest square-root rings) opens under the answer. The connector draws in 0.25s. It closes on a miss or an empty field. |
| (D2) | data-c="chip" | | The companion's pin bounces once. |

**E1/E2, the field.**
- Emptying the field resets everything: the answer line, the needle (parked), the tape (hidden), the chips and the map.
- The debounce drops from 300ms to 150ms.
- The answer reads the field's value at the moment it settles, so it can never answer a stale query.

### V1 Census map (fix)
| Point | Verdict | Reason |
|---|---|---|
| Radial label offsets for the 8 inner towns | ACCEPT | Their labels sit on the line from the office through the house, pushed outward. |
| Scale labels to the west axis | IMPROVE | The labels on the west side (end-anchored) were the ones colliding. The collision pass now tries radial positions first, then steps along the axis. |
| Below 640px: label the 8 nearest radially, or hide the map | HIDE | At 0.38× scale no label reaches 12px. The list carries every name and mile ⟦S1499⟧. |
| Hover 140 to 160ms both ways | ACCEPT | 150ms --ease-x; the spring goes ⟦S0063⟧. |
| Chips cut to the nearest 8 | IMPROVE | The 8 nearest show. A "Show all 24" button reveals the rest, because the list is the keyboard path to every town ⟦S1499⟧ (progressive disclosure, never removal). |
| One-line footnote | ACCEPT | Verbatim from the pack. |
| Connector draw 200 to 250ms plus one ripple | ACCEPT | 0.22s, then one ring from the chosen house. The pointer-ripple background goes (Removal Test, D11). |
| Chips fade as one group | ACCEPT | |
| (C2) | | Ink ground. |

### V2 Town cards (weak, mined)
| Point | Verdict | Reason |
|---|---|---|
| Wrong question | ACCEPT | The section must answer "do they work in my town?". The heading becomes "We work in all 24 of these towns." House age becomes the sort, not the question. |
| Identical cards; label the histogram peak or delete it | ACCEPT, labelled | The peak share is already labelled, and the bars now grow on entry. The oldest-homes cards (median before 1980) carry a --sun year so the set is not uniform ⟦S1497 Semantic⟧. |
| Delete the blueprint background | ACCEPT | Removal Test. |
| Salvage median year and pre-1980 for the winner | ACCEPT | V3's answer line already prints both (`fact()`). |
| If a grid survives: FLIP sort, bars grow, 8 oldest plus "Show all 24" | ACCEPT | |
| (C2) | | Ink ground. |

### New versions
| Pack's direction | Verdict | Built instead |
|---|---|---|
| (a) V3 plus the grafted ring map as a full version | REJECT | That is V3 after its own graft, so it is a variation (A3). See V4 below. |
| (b) V1's map with mobile solved and the chip list cut | REJECT | That is V1's fix list. See V5 below. |

**V4 "Distance ruler" (built instead of (a)):**
- **Reference:** ⟦S0603⟧ evidence doctrine (zero baseline, direct labels, tabular figures).
- **What it is:** all 24 towns placed on one horizontal tape by their real miles, 0 to 25.
  - Labels sit in lanes above and below the tape, assigned greedily so none overlap.
  - Hover or focus shows direction and county.
- **On phones:** the tape turns vertical and becomes a plain ordered list.

**V5 "Eight directions" (built instead of (b)):**
- **Reference:** ⟦S1499⟧ (chunk into scannable groups; scanning pattern).
- **What it is:** the towns grouped into the eight compass directions from Springboro, each a short list sorted by miles under an arrow turned to its bearing.
  - An empty direction says so.
  - The office sits in the centre cell.
