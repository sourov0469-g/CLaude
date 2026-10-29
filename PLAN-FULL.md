# PLAN-FULL — the rebuild plan for the FULL BUILD PROMPT

Inputs: PROGRESS.md (Phase 0 evidence, conflicts C1–C6), TRACEABILITY.md (30 rows, written before code), SECTIONS.md (gate status), the baseline sheets in `remodeling/qa/`.

## 1. Phase 1 re-audit: what fails and why

Audit against §4, per version (TRACEABILITY.md holds the status of each row). Findings that cut across versions:

| # | Finding (evidence) | Fails | Fix |
|---|---|---|---|
| A1 | Review quotes and reviewer names in all three Reviews versions (`src/js/sections/reviews.js`, 10 verbatim FACTS quotes). | §3 | Reviews V1–V3 REBUILD, aggregate-only. |
| A2 | Hero V2 carries crop marks, an outline-to-fill headline, a star-fill tween and a rewritten lead (`git diff 68f8ff5 b07f0b8 -- remodeling/src/*/hero*`). | §3B, §5 | Restore the 68f8ff5 composition; add only the proof line. |
| A3 | Reactions are shared or missing: 218 interactive elements measured (`count.js`, Phase 0); 30 switcher buttons, 26 project cards, 15 form controls, all text links and most tabs have none; screw ×3, saw ×3, perforation ×4, swatch ×4, shutter ×3, viewfinder ×5, pin ×3, chalk ×2, stake ×3 are shared. | §1.5, §3B | Phase 3 system (below). |
| A4 | Repeated tricks: tape measure ×4 (Proof V2 blade, Process V3 blade, `tape` reaction, cursor tape variant); sticky stack ×2 (Services V2, Work V3); morph ×2 (Financing V3, Consult V2); stroke-drawn text ×2 (Hero V1, Proof V2); MotionPath follower ×2 (Process V1, work divider); scaffold ×2 (Hero V3, ba divider); reactions that replay their own section's centrepiece (stamp on Proof V1, theodolite on Proof V3, roller on BA V2, shutter on BA V3, perforation on Financing V1, valve on Financing V2, clip on Consult V1, handset ringing vs Consult V3, hammer/trowel/door vs the Services V3 pegboard tools, pin/pushpin vs Towns V1 pins, level reaction vs level cursor). | §4 "no trick repeated" | Proof V2 and Work V3 REBUILD; Consult V2 step change re-done as a fold; ba and work dividers replaced; reaction catalogue rebuilt so no reaction replays any centrepiece, divider or cursor trick; cursor tape variant replaced. |
| A5 | Reveal dosing: `EZ.reveal` runs 1.25s expo (Q40 value); 100 of 135 section tweens exceed .3s. | §4 dosing 0.15–0.3s (outranks the Q40 reference value) | `EZ.reveal` → .3s, travel ±24px; every entrance tween ≤ .3s (scrubbed tweens and user-triggered centrepiece actions keep their reference tempo; Hero V2 keeps its intro as the owner saw it). |
| A6 | System arrow cursor visible with the companion. | §4 "NO plain or fixed cursor" | Companion gains an exact animated tip; arrow hidden on fine pointers (C5). |
| A7 | Weak centrepiece states: Financing V3 closed state is a lone orb on an empty field; Process V2 stages 1–3 show a near-empty sheet; Services V2 / Work V3 covered cards dim to near-black. | §4 NOT A DOCUMENT, quality | Fix in place (Financing V3, Process V2, Services V2); Work V3 rebuilt anyway. |

Versions passing on design (FIX): Hero V1, V3; Proof V1, V3; Services V1–V3; BA V1–V3; Process V1–V3; Financing V1–V3; Work V1, V2; Towns V1–V3; Consult V1–V3. They are fixed for A3–A7 and must pass §12 before their SECTIONS line flips.

## 2. Trick register (one owner per trick on the page)

X-ray slit — Hero V1 · scale-container zoom — Hero V2 · extruded wordmark + scaffold — Hero V3 · stamp — Proof V1 · odometer reels — Proof V2 · focus frame / laser — Proof V3 · exploded assembly — Services V1 · sticky stack + curtain — Services V2 · magnetic pegboard + hammer/trowel/hinge — Services V3 · stud slider — BA V1 · roller wave mask — BA V2 · column shutters — BA V3 · MotionPath vehicle — Process V1 · layered drawing on sticky — Process V2 · tape blade — Process V3 · glare + tear — Financing V1 · valves/pipes routing — Financing V2 · morph — Financing V3 · Flip push grid — Work V1 · 3D ring carousel — Work V2 · seamless belts — Work V3 · tally scratch — Reviews V1 · particle assembly — Reviews V2 · dial needle spring — Reviews V3 · pins dropping on a map — Towns V1 · orbit rings — Towns V2 · road sign answer — Towns V3 · clipboard + progress ring — Consult V1 · plan fold — Consult V2 · ringing handset — Consult V3.
Dividers (one each, none repeating a trick above): dimension line, beam, hazard stripes, conduit with junction boxes (new, BA), saw kerf, truss, tile course flip (new, work; no follower), plumb bob, brick course, footing.
Cursor variants: hard hat, spirit level, traffic cone (new; the tape variant retires).

## 3. Phase 3 — the interaction system

- Every interactive element (links, buttons, tabs, radios, checkboxes, inputs, range, cards, switcher digits, settings) carries `data-rx` = its reaction, plus `data-rx-g` = its own subject glyph where the reaction is a group carrier.
- **Signature reactions** (one element each): primary CTAs and singular buttons, each a different tool action (blueprint roll, pencil box, bolt, nail gun, hook, chisel, drill, wrench, plane shavings, spray, caulk gun, sander, rivet, level-line laser dot, crowbar, zip tie, hose, sprinkler, socket, clamp, stud finder, putty knife, ladder, wheelbarrow, sawhorse, tile spacers, extension cord plug, padlock, mailbox flag, key cut, hard-hat footer, …). None repeats a trick in §2.
- **Group carriers** (one mechanism per group, a different subject glyph per element): tabs, radios, filters, project cards, rooms, targets, counties, form fields, nav links, footer links, switcher digits, settings buttons. Each group gets its own carrier motion (drop on a string, rise on a jack, slide on a rail, flip on a hinge, spin on a turntable, pop from a toolbox lid, slide from a drawer, swing on a gate, roll on casters, …), so no two groups share a carrier and no two elements share carrier + glyph.
- Hover plays in (≤ .3s dosing for the carrier entrance), leave reverses fast; click/tap plays a distinct second beat; keyboard focus-visible = hover; touch = tap plays both. Reduced motion and Motion Off: no drawings, plain colour states.
- Proof: a script lists every element's `rx:glyph` signature across all 30 versions + chrome and fails on any duplicate or any element without one; each element is hover- and click-tested at 1440 and tap-tested at 375 (drawing appears, DOM state changes, nothing sticks, no error). The table goes in PROGRESS.md.

## 4. Phase 4 order (SECTIONS.md order)

proof (V2 rebuild + V1/V3 fixes) → services → ba → process → financing → work (V3 rebuild) → reviews (V1–V3 rebuild) → towns → consult. One commit per section; PROGRESS/TRACEABILITY/SECTIONS updated at each.

## 5. Phase 5 — cursor companion

Animated tip at the exact pointer (nib that leans into motion; becomes a nail point on buttons, a crosshair on images, a short rule on headings, a frame on cards, grip arrows on the slider; hidden over text inputs where the native I-beam stays). Buddy trails it (+40/+38) with blink, eye roll, idle action; per-section tool and per-section tip colour from the field. Variants: hard hat / level / cone / Off. Disabled on touch and reduced motion (system cursor returns). Tested in all 30 versions at 1440; touch-disable and RM verified at 375.

## 6. Weight

Cap 3,874,583 bytes (b07f0b8). Quotes removed, unused reactions deleted; if code growth pushes past the cap, the WebP store is re-encoded (quality step) until under. Report code and media separately.
