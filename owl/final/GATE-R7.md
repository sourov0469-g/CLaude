# GATE · Final build · Round 7 · Wise Check page (two versions each)

**File:** `owl/final/owl-roofing.html` (4.7 MB). Open `#/wise-check` (header "Wise Check" now goes there; `?all=2#/wise-check`
for the V2s; `?review` still switches). Screenshots: `gates/r7/`.

**Source of the content:** Owl's own published description of the Wise Check: "Owl Roofing's thorough, no-guesswork roof
assessment … a detailed roof and attic evaluation, clear photo and video documentation, and leak detection tools", with its
listed parts Attic Inspection and Heat-Sensor Leak Detection. Owl's own Wise Check badge is used. Nothing is added beyond
plain descriptions; no prices, times or promises.

## Section 1 · Page hero
- **V1 · "What's going on with your roof?"** Owl's badge and title, then four 3D case tiles: After a storm, A leak or a stain,
  An older roof, Just checking. Choosing one (arrow keys work) rewrites the "Your Wise Check" panel: a line for that case,
  and the four Wise Check parts **reordered so the ones that matter most come first and light up**; all four stay listed,
  because every Wise Check covers them. (From the dossier's case-first instrument idea and wisecheck-best1's checklist.)
- **V2 · "The Wise Check Sees Below the Surface."** A real Owl roof photo with a **draggable heat-sensor scanner**: left of
  the amber bar the roof turns into an ink-and-amber "sensor view", and when the bar passes the vent pipe a warm patch
  appears with "Warm spot: moisture shows up here". It sweeps part-way by itself on arrival; keyboard arrows move it. A line
  under it says plainly that this is an illustration and that a real Wise Check gives photos and video of your own roof.
  The sensor colours stay inside the locked palette (ink to amber).

## Section 2 · What a Wise Check includes
- **V1 · Flip cards:** four cards (Roof evaluation, Attic inspection, Heat-sensor leak detection, Photo and video
  documentation) with custom icons. They tilt toward the pointer and **flip in 3D** to an amber back with the plain
  description.
- **V2 · Rotary knob:** a brass knob on a plate with four labels. **Drag the knob round** (it snaps to the nearest part),
  press a label, or use the arrow keys; the display panel slides in that part's icon and text.

## Verification
- **Interaction test** (`tools/interact7.cjs`): header link opens the page; "A leak or a stain" puts Heat-sensor leak
  detection first; arrows move cases; a flipped card exposes its text to screen readers; the scanner at 70 shows the warm
  spot; the knob follows labels and arrow keys. **No page errors.**
- **Accessibility** (axe): **0 violations** on V1 and V2 (one contrast defect found and fixed: dimmed parts in the V1 panel
  are now full-contrast, marked by an amber edge instead of fading).
- **Phone (390 px):** 0 px sideways overflow on both versions; knob labels shortened so they fit.

## Scorecard (Design 40 / Usability 30 / Creativity 20 / Content 10)
| Section · version | D | U | C | Ct | Weighted |
|---|---|---|---|---|---|
| Wise hero V1 case picker | 7.8 | 8.4 | 7.6 | 8.6 | **8.06** |
| Wise hero V2 heat-sensor scan | 8.2 | 7.6 | 8.4 | 8.0 | **8.04** |
| Includes V1 flip cards | 7.8 | 7.8 | 7.2 | 8.6 | **7.78** |
| Includes V2 rotary knob | 8.0 | 7.6 | 8.0 | 8.6 | **7.94** |

All pass; zero vetoes (Owl's own wording, cream page, palette locked, single file, no sub-agents, no background tasks).
**WEB-SKILLS:** ⟦S1440⟧ feedback-patterns · ⟦S1444⟧ hicks-law (four cases, four parts) · ⟦S1435⟧ von-restorff-effect (the
lit parts) · ⟦S1436⟧ animation-principles (flip, snap, sweep) · ⟦S0070⟧ better-accessibility (radio group, sliders with
value text, axe 0) · ⟦S0659⟧ anti-ai-slop (Owl's published text only; the illustration is labelled as one) · ⟦S1496⟧
critique-brand-consistency.

**Recommendation:** Hero V1 (it answers "do I need this?" directly) and Includes V2. The Wise Check page grows further in
later rounds (it has 2 sections plus the closing band now). **Next:** Protect Your Nest page.
