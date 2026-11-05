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

## Remaining
D1: the still is a 640 px crop; a real Owl thermal image would replace the illustration.

**Vetoes: zero.** **Process:** every command was foreground with a time limit; no Agent calls, no run_in_background calls, no task-checklist tools.
