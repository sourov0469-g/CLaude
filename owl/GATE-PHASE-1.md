# GATE PHASE 1: brand recovery and design directions (Owl Roofing)

Phase 1a (brand recovery and audit) passed at `owl/GATE-PHASE-1a.md`. This gate closes Phase 1b: the reference study,
three design directions on Owl's kept identity, and the selection.

**How the work was done:** by me personally, in this thread. No sub-agents and no background tasks.

**Skills read in full for 1b** (rules logged in `owl/skills/SKILL-READ-LOG.md`):
- ⟦S0330⟧ explore-design
- ⟦S1474⟧ parallel-concepts
- ⟦S1472⟧ concept-selection
- ⟦S0642⟧ reference-design-contract

The 1a skills (⟦S0607⟧, ⟦S0011⟧, ⟦S0659⟧, ⟦S0660⟧, ⟦S1418⟧, ⟦S0001⟧, ⟦S0444⟧) still bind.

## Deliverables
| File | What |
|---|---|
| `owl/research/REFERENCE-TEARDOWNS.md` | All ten annex references. For each: observed frames, a code digest, why it works, details, what does not work, and Keep / Change / Do not copy ⟦S0642⟧. Plus the excluded list. |
| `owl/phase1/DIRECTIONS-CRITERIA.md` | The question, fixtures, thresholds T1-T5 and trade-offs W1-W5. **Written before any direction was drawn** ⟦S1472⟧. It is committed with this gate. |
| `owl/phase1/directions.html` | The directions board. One HTML file, three directions, each with two 16:9 frames plus cards: SVG system, flow carrier, live logo micro-motion, 6-page structure, reference card, set pieces. Built from `directions.src.html` by `build-directions.py`, which injects Owl's logo files unchanged. |
| `owl/assets/source/frames/` | Five real frames pulled from Owl's hero video, at 2, 5, 8, 11 and 14 s. These are the frames the board uses, because Owl's live poster is not a frame of the footage. |
| `owl/assets/source/owl-pages/` | The inner-page sweep: Owl's own badges (Wise Check, Get It Right Guarantee, Owl Mom Approved), the service-area map, community photos, and an `unproven/` folder. See its README. |

## The question
> A Twin Cities homeowner lands on owlroofing.com. What do they DO first, and what carries them from the first viewport to
> calling or texting Owl?

Following ⟦S1474⟧, the three directions differ in what the user does, not in how Owl looks:

| Direction | What the visitor does first |
|---|---|
| A · The Crew | Watches Owl's crew film, then meets the families |
| B · The Nest | Follows one line, the magnet sweep, through the Protect Your Nest system |
| C · The Instrument | Operates "Price My Roof" in the first viewport |

## Thresholds (fail one and the direction is out)
| | A · Crew | B · Nest | C · Instrument | Evidence |
|---|---|---|---|---|
| **T1** Logo and colours untouched | pass | pass | pass | `build-directions.py` only adds `class`/`role` attributes and renames the clipPath id. All 18 path `d` values and fills were verified identical to the source files. Every colour on the board is one of Owl's ten. |
| **T2** Locked facts only | pass | pass | pass | (see below) |
| **T3** Hero video designed in | pass | pass | pass (weaker) | (see below) |
| **T4** Annex class, not template ⟦S0659⟧ | pass | pass | pass | (see below) |
| **T5** Conversion floor | pass | pass | pass | Phone or text is visible in every hero frame (A: "Call (651) 977-6027"; B and C: header phone). The mobile sticky bar is in every structure card. |

**T2 evidence:**
- Every claim traces to Owl's own text:
  - "We actually answer the phone" and "We Give a Hoot" (home).
  - The 3-Part Cleanup steps, including "First Pass With The Magnet" (home).
  - The founders meeting "in a class for new parents" (About).
  - The Wise Check wording (/roofing/).
- The one computed figure (C1) is arithmetic, with the formula shown.
- No prices, no quotes, no job details.

**T3 evidence:**
- A: the footage is the film gate.
- B: the footage plays inside the house "window" that the line leaves from.
- C: the footage sits beside the instrument, in a supporting role.

**T4 evidence:** each direction's mechanism comes from a named annex reference and is then distanced from it:
- A: Scout's sequenced film strip.
- B: AirPods' pinned beats.
- C: Quiet Cubes' configurator.

## Trade-offs (weighed, 1-5, with evidence)
| | A · Crew | B · Nest | C · Instrument |
|---|---|---|---|
| **W1** Distinctiveness | **2**: a film strip is a common trope. Only the families make it Owl's. | **5**: no other roofer has the magnet pass. A screenshot of "3 sweeps of your lawn. Every job." names Owl. | **3**: a roof calculator is a known pattern. The Wise Check name is Owl's own. |
| **W2** Owl's own material | **5**: video, families, crew, YouTube | **4**: video, catch-all wrap, shingle tomb, guarantee seal, badges, treeline. The families move mid-page. | **3**: video and the Wise Check badge. Photographs mostly sit in the archive, where Owl is short of job photos. |
| **W3** Depth feasible tonight (11 sections × 2) | 4 | 4: one line system serves every section | 3: the instrument and the game each need full interaction QA |
| **W4** Performance / a11y risk | 4: a video strip only | 3: pinning, so cap at 4 beats, with a reduced-motion static path | 3: a live form, a game, and keyboard play |
| **W5** Room for the set pieces | 2: the game would be bolted on | **5**: a Graza-bar scroll animation (the magnet picks up the nails), a Bruno game ("Sweep the lawn"), a Lusion line (one line, hero to nest), a cursor (magnet or owl) | 4: the game is the strongest fit; the scroll animation is weak |
| **Total** | 17 | **21** | 16 |

## Selection: **B · The Nest**
**Why:** B is the only direction that is all three of these together.
- **Ownable at the level of mechanism.** The line comes from Owl's own 3-Part Cleanup. It is not a style.
- **Native to every required set piece.** The game, the custom scroll animation, the flow line and the cursor are one
  system, not four bolt-ons.
- **A clear home for Owl's best proof:** the Protect Your Nest system, the 10-year Get It Right Guarantee and the
  shingle tomb.

**What it costs (stated, per ⟦S1472⟧):**
- **The families move down the page.** They are no longer the first impression. Mitigation: the hero line is Owl's own
  promise, "We actually answer the phone", and the families section is the first stop after the pinned beats.
- **Pinned beats risk scroll-jacking.**
  - Exactly 4 beats; each pin is at most 100vh of scroll.
  - Native scroll throughout, and a skip link past the pinned stage.
  - `prefers-reduced-motion` shows the four beats as static frames.
- **No Owl job photos to carry it.** The line, the SVG systems and Owl's video carry the page. Imagery that is not Owl's
  is illustrative only, under the asset rule.

**No grafting:**
- Price My Roof and the families stay in B as homepage sections, not as alternative entry points.
- C's Wise Check game is **not** imported; B's game is "Sweep the lawn".
- A Wise Check section can still exist as Owl's real inspection content, without a game.

## Rejected directions (recorded)
| | What it tested | What it lost on | What would bring it back |
|---|---|---|---|
| **A · The Crew** | People as the entry point | Distinctiveness (a film-strip trope) and fit for the game set piece (W1 2, W5 2) | The owner or Muse asks for warmth first; or Owl supplies more crew footage and job photos |
| **C · The Instrument** | Action first: an estimate in the first viewport | Story and build depth. The "price" promise can't pay off without inventing prices, so it hands off to a quote. It also had the weakest scroll animation. | Conversion evidence that instrument-first beats story-first for Owl's traffic; or Owl publishing real price bands |

## Defects found and fixed in this gate
1. **A2 composition:** the tags and the family photo positions were corrected after the first render.
2. **B1 treeline:** the 64px repeat was too heavy and hid the line. Lightened (`opacity:.9`), and the dotted line now
   starts visibly at (44,520).
3. **C1 arithmetic (a fact-class defect, caught before the gate):** the readout said 25 squares.
   - The correct value is 1,800 × √(1+0.5²) ÷ 100 = 20.12, so "≈ 20 squares".
   - The formula is now shown in the readout.
4. **C1 wrap:** the readout wrapped mid-formula. Fixed with `white-space:nowrap`.
5. **A false alarm in my own check:** the logo-integrity check failed only because its regex matched `id="…"`.
   Re-verified properly, attribute by attribute: the logo is identical.
6. **Missing sweep:** the 1a gate left Owl's inner pages unswept for before/after photos. Swept now (sitemap plus 9 pages).
   Result: none exists. This is recorded in `owl-pages/README.md` and handled as below.

## Defects remaining (honest)
- **Lusion:** its Cloudflare challenge is refused through the proxy, so the teardown is from source only, with no
  frames. It was not bypassed.
- **Bruno Simon:** 2 frames only; WebGL in headless capture.
- **Quiet Cubes:** stuck at its configurator gate, so the 3D stage is unverified. Direction C is not selected, so this
  limit no longer affects the build.
- **No Owl before/after pair exists.** The before/after content (Phase 3) will use the permitted genuine fallback pair,
  unbranded and with no job details, or an SVG treatment. It is never captioned as an Owl job.
- **Owl Mom Approved has no published explanation** on Owl's site. It is used only as the badge, with no invented claim.
- **Texta is not usable** (commercial). Lato stands in; Muse may overrule.
- **The board is a static set of frames.** The motion described on it (the line drawing, the pinned beats) is proven in
  Phase 3b's proof sections, not here.

## Next (no waiting)
Phase 2, the identity asset board on the kept identity:
- Tokens from Owl's ten colours.
- A contrast pairs file.
- An icon set.
- SVG motifs: the magnet line, nails and shingle courses, tree rings, treeline, nest.
- Full-section backgrounds.
- Type specimens and a spacing ladder.
- Motion tokens.
- The logo blink and glance.
- The cursor companion in 2-3 variants.
- The brand doc.
- An exemplar and a generation test.

Then `GATE-PHASE-2.md`.
