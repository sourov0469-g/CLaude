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
- **The label choice:** the label speaks once per section per session, with a 150ms fade, rather than being removed. It is the only place the companion says what a control does.

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
