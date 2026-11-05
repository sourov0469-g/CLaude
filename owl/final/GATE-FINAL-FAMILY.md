# GATE-FINAL-FAMILY · section 9, "Give a Hoot" (ONE final version)

**Source:** OLD Family V9 "Give a Hoot", ported to `src/final/sections/09-family.html` (id `family`, the header's About link). **Evidence:** `gates/final/family/` (`orbs.png`, `hoot.png`, `s-1440.png`, `s-390.png`, `checks-family.json`).

## 1. What it is
Four round photographs with **the owl in the middle**: the Browns (Tim Brown and family), the Berglands (Noah Bergland and family), the crew, and the community. When the section comes into view the owl hoots by itself and the four photos pop out around it with golden rings and a sound-wave line; the **Give a Hoot** button hoots again (a soft synthesized two-note hoot, only when the button is pressed; a Sound switch turns it off); the owl blinks every few seconds. Two founders are named: Tim Brown and Noah Bergland, co-founders. Founded 2025, Shoreview.

## 2. Changes in the port
Only for phones: the photos are 27 % of the circle (was 24 %) and the captions 12 px (was 11 px). The real photographs are shown far below their own pixels (0.28 to 0.40×): sharp.

## 3. Five questions (homeowner)
1. **What is it for?** Who are the people behind Owl?
2. **Under 3 s?** Yes: two families, a crew and an owl.
3. **Fun?** A button for the tagline; the owl hoots.
4. **Every element earns its place?** Owl, four photos, two names, button, sound switch. Yes.
5. **Stressed?** Warm and human; nothing to read unless I want to.

**Skill ledger:** ⟦S0489⟧ creature motion (blink, hoot) · ⟦S0544⟧ causal motion · ⟦S1107⟧ real buttons, the switch is a pressed button · ⟦S0451⟧ title reveal.

## 4. Checks (`node tools/final-test.cjs family`): **18/18**
axe 0 · facts lock · no maps · distinct media (the four photos appear only here) · four images named The Browns / The Berglands / The crew / The community around the owl · they arrive by themselves · the two founders named, nobody else · Give a Hoot answers with rings and the sound can be off · sharp at 1440 and 390 DPR 2 · layout and 44 px controls · reduced motion (the four images are simply there) · no errors.

## 5. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.5 | 8.4 | 8.7 | 8.8 | **8.54** (3.40 + 2.52 + 1.74 + 0.88) |

## 6. Remaining
- **D1:** the photos are small originals (558 to 900 px); at circle size they are sharp, but they cannot grow.
- **D2:** nothing on record says what event the "community" photo shows, so its caption is only "The community" and its alt text "Community involvement". Owl can tell us what it is.
- **D3:** a photo of Tim on a job would complete the Brown family's side.

## 7. Vetoes: **zero**
Real photographs and real names only; no invented detail; no maps; logo untouched.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
