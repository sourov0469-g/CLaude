# GATE-FINAL-PAGE-WISE-CHECK · the Wise Check page (`#/wise-check`, ONE final version)

**Built from:** OLD Wise Check page hero V2 "The Wise Check Sees Below the Surface" (a heat scanner you drag across a roof) and parts V2 "Turn the Dial Through a Wise Check" (four parts on a dial), plus the shared band. Files `wise-hero.html`, `wise-parts.html`. **Evidence:** `gates/final/pages/wise-check-sheet.jpg`, `gates/final/wise-hero/`, `gates/final/wise-parts/`.

## What it is
The scanner sweeps in by itself and finds a warm spot at the vent pipe ("Warm spot: moisture shows up here"); you drag, tap or use arrow keys to move it. The page says plainly it is **an illustration** of how a heat sensor shows moisture, and that a real Wise Check gives photos and video of your own roof. Below, a brass dial turns through the four parts in Owl's own words: Roof evaluation, Attic inspection, Heat-sensor leak detection, Photo and video documentation (press a label, drag the knob, or use arrows).

## Fixes in the port
- The roof still (640 px) was stretched to the full width (soft). It is now capped at 640 px wide: 1.00× at desktop, about 0.55× at DPR 2 on phones.
- The warm-spot label was clipped on phones; it now stays inside the frame.
- Dial labels are 44 px tall. The heat overlay is the same picture with a filter (aria-hidden), not a second image.

## Five questions
1. **What is it for?** What does a Wise Check look at? 2. **Under 3 s?** Yes: a scanner over a roof. 3. **Fun?** You scan the roof yourself and turn a brass dial. 4. **Every element earns its place?** Scanner, caption, dial, four parts, book. Yes. 5. **Stressed?** I learn the four things they check.

## Checks: 32/32 (`wise-hero` 16/16, `wise-parts` 16/16)
axe 0 · facts lock · no maps · sweeps in and finds the spot; marked as an illustration · dragging back hides it · keyboard moves it · four parts · a label turns the dial and shows the part · arrows turn it · sharp at 1440 and 390 DPR 2 · layout and 44 px controls · reduced motion · no errors.

## Score
8.3 / 8.4 / 8.6 / 8.6 → 3.32 + 2.52 + 1.72 + 0.86 = **8.42**

## Skill ledger (WEB-SKILLS tags, each one applied and checked in this page)
⟦S0414⟧ teardown (a truthful picture: the page says it is an illustration of how a heat sensor shows moisture) · ⟦S1107⟧ keyboard-navigation (scanner and dial move with arrows, Home/End) · ⟦S1049⟧ focus-styles (visible focus on grip, knob, labels) · ⟦S0462⟧ interactive-hit-areas (labels 44 px, grip 58 px) · ⟦S0070⟧ better-accessibility (`role=slider` with `aria-valuenow`, `aria-valuetext` for the dial) · ⟦S0405⟧ micro-interaction (the sweep-in, the label popping at the warm spot) · ⟦S0544⟧ motion-doctrine (one easing curve for sweep and dial) · ⟦S0400⟧ accessible-animation (reduced motion starts the scanner already across) · ⟦S0076⟧ better-writing (Owl's own published words for the four parts).

## Governing reference, with transfers
**Governing reference:** the **before/after comparison slider** pattern (draggable divider, WAI-ARIA **Slider**; a pattern, not live-studied), and Owl's own homepage **"Clear It Up"** (wipe a fogged window to reveal) from section 3.
**Transfers:** from the comparison slider: a divider you drag, with the revealed side showing what the eye cannot see; keyboard arrows, Home and End; the grip is a labelled slider. From Clear It Up: the reveal-by-hand idea and the honest "illustrative" label. For the dial: a rotary control built on the same Slider semantics (four stops, labels as buttons).


## Remaining
D1: the still is a 640 px crop; a real Owl thermal image would replace the illustration.

**Vetoes: zero.** **Process:** every command was foreground with a time limit; no Agent calls, no run_in_background calls, no task-checklist tools.
