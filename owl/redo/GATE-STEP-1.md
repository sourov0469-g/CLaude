# GATE · Redo Step 1 · Reverse-engineering dossier

**Deliverable:** `owl/redo/REVERSE-ENGINEERING.md` with evidence in `owl/redo/evidence/` (contact sheets, code digests,
phone pin data and the probe scripts that produced them). No design and no HTML, per the brief.

**Governing standards:** `OWL-REDO-BRIEF.md` Step 1 and `OWL-REDO-COMPLETION.md` (applied from Step 1: scorecard and
WEB-SKILLS gate, cursor and SVG standard, copy budgets, design method, signature story, single-file delivery, asset rule).

## WEB-SKILLS applied (each read in full by tag and logged in `owl/skills/SKILL-READ-LOG.md`)
- ⟦S0079⟧ explain-interface: live scriptable browser plus the shipped bundles as the two routes, each named; claims
  tiered Measured / Derived / Inferred; mechanisms explained by perceptual job, not readout; each reference closes on what
  transfers and what never transfers; a second state (390 px phone) read for the pinned-story references; what could not
  be read (Igloo's later WebGL scenes, Quiet Cubes after its gate) stated as an honest stop.
- ⟦S1307⟧ audit-reference-originality: a source registry (`evidence/`, one folder per reference); only abstract mechanisms
  transfer and every visible element is rebuilt from Owl's content; each reference's signature combination listed as
  never-transfers.
- ⟦S0448⟧ gsap-scrolltrigger-storytelling: the pinned-story behaviour (scroll plays the scene, release at the end, never
  trap the reader) measured on phones and used as the standard for the signature scene.
- ⟦S0642⟧ reference-design-contract (logged earlier): every reference split into what transfers, the concrete Owl version,
  and what never transfers.
- ⟦S0659⟧ anti-ai-slop (logged earlier): no invented metrics, jobs or quotes in any Owl version; facts only from the locks.

## Critical self-rating (Design 40 / Usability 30 / Creativity 20 / Content 10)
For a dossier, the categories are read as: **Design** = depth and rigour of the mechanism capture; **Usability** = how
directly Steps 2-3 can use it; **Creativity** = how specific and original the Owl translations are; **Content** =
accuracy, tiers and facts.
| Category | Score | Evidence for | Evidence against |
|---|---|---|---|
| **Design** | **7.5** | All 11 references probed live this session: wheel-driven frames, measured smoothing (Scout 97/492 ms, Quiet Cubes 114/488 ms, native 19-40 ms), cursor and click tests (Igloo's camera pan, block lift and click-to-open; Lusion's pushed pieces), hover curves, verbatim configuration (Igloo `igloo_ease_1`, `fov:22/30`, CA shader; MERSI `lerp:.06`, `wheelMultiplier:.8`; Lando `lerp:0.1`), Bruno's play captured (click, drive, physics), phone pin data for 3 references. | Igloo's manifesto and cube scenes not rendered (software WebGL), code only; Quiet Cubes never seen past its gate; phone state captured for 3 of 11; no per-element `getAnimations()` timelines read for the DOM sites. |
| **Usability** | **8.0** | Each reference ends on a concrete Owl version; a section-to-mechanism map with two wholly different mechanisms per section; the signature story at mechanism level with the measured pin behaviour; copy budgets checked against the references; a derived single-file budget; an asset inventory under the new rule with branded files excluded. | The single-file budget is an estimate to settle in Step 3; the Rembrandt photo check was by eye at thumbnail size (`job-charcoal` still to check at full size). |
| **Creativity** | **7.5** | Trade-specific translations: "Open the roof" (Igloo's part-built object as true roof courses), the crew film as Lusion's carrier, the magnet pass as Bruno's one game, the Wise Check as Quiet Cubes' case-first instrument, "One roof, one day" as Owl's own signature scene, a cursor companion that acts on the scene it is over. | Some translations are close to the obvious reading of the reference (MERSI split covers for services; Lando's grid for an archive Owl only partly has). |
| **Content** | **8.0** | Facts only from the locks; no invented jobs, quotes or metrics; every library claim marked as a fingerprint; inferences marked; capture limits stated up front; three open points raised rather than decided. | The tier marking is by section with exceptions marked, not on every sentence. |
| **Weighted** | **7.70** | | |

**PASS test (completion §1):** weighted 7.70 ≥ 7.0; no category under 6.0; vetoes below.

**Vetoes checked:**
- **No bot wall bypassed:** none. Lusion's Turnstile script was refused by the proxy and left alone.
- **No invented facts:** none.
- **No design or HTML before judgment:** none.
- **No sub-agents:** none.
- **No background tasks:** **one incident, reported, not cleared by me:** a Bruno capture command was auto-moved to the
  background by the harness. I stopped it at once (TaskStop), confirmed no process survived, and kept the 5 frames it
  had saved. It is recorded in PROGRESS for Muse to rule on.

## Defects found and fixed in this step
1. **"Shingle colours on Owl's materials page"** was claimed for the Lando translation; Owl's page lists brands, not
   colours. Corrected.
2. **Three wordings claimed more than the frames show** (Igloo "coordinates", AirPods "morphs", Lando "3D helmets").
   Corrected to what was seen.
3. **Inferences stated as fact** (Igloo's telephoto intent, Lusion's DOM-in-WebGL, Cowboy's physics string, Graza's
   pinned drip). Marked [Inferred].
4. **The Three.js size** was a recalled figure. Marked as not measured.

## Open for Muse
1. The brief's amber `#EAA221` against the Phase 1 token `#EAA222`.
2. "50-year" (brief) against "up to 50-year" (earlier lock).
3. Whether the signature story counts as one section with two versions or as a single scene.
4. The background-task incident above.
