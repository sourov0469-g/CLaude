# GATE-FINAL-HERO · section 1, the hero (ONE final version)

**Source:** OLD Hero V2 "We Give a Hoot About Your Roof" (`src/sections/hero-v2.html`), ported unchanged in design to `src/final/sections/01-hero.html`.
**Evidence:** `gates/final/hero/` (`s-1440.png`, `s-390.png`, `checks-hero.json`).
**Build:** `python3 build_final.py` → `owl-roofing.html` (one file, no version switcher; the 22-version fix build is frozen in `past/owl-roofing-PAST-2026-11-05-fix-22-versions.html`).

## 1. The open decision (plan A1.1): does NEW Hero V1's pinned text-change join the hero?
**Decision: no. The hero stays exactly OLD V2, not pinned.**
Reasoning:
1. The owner called V2 good on desktop; the pinned text-change would replace the owl-and-house image with a film and a scroll line. That is a different hero, not an addition.
2. The next sections already pin: the video, "Your part: nothing" (a pinned scroll film). Pinning the hero as well would put pinned stages back-to-back and make the first screens a scroll-jail, which the fix cycle had to cure once.
3. The owner's hero must show the owl, the promise ("We Give a Hoot About Your Roof") and the two actions in the first three seconds. V2 does; a text that changes as you scroll hides the actions until later.
4. The pinned text-change idea is not lost: its pattern lives in section 5, "Your part: nothing", where it belongs.

## 2. What it is
The great horned owl spread over a small house, painted once and laid on a WebGL mesh: head, eye and wings move a little around their pivots, the owl blinks every 3–4 s, three depth planes follow the pointer, and rain falls only until it meets the runoff lines. "Wings over the house" is a toggle that shelters the house. Two shingle-tab actions (Get My Roof Checked → #book, See Our Services → #services) and one trust row: 5.0 · 90+ reviews · GAF Systems Plus Certified · Founded 2025. On the original Owl palette (cream, ink, amber).
Changes made in the port: the section id `hero`; registered as the only version of its section; nothing else.

## 3. Five questions (homeowner)
1. **What is it for?** Roofers in Shoreview, family-owned, who give a hoot.
2. **Under 3 s?** Yes: owl over a house, the headline, the two actions.
3. **Fun?** The owl looks where you look and blinks; the toggle shelters the house.
4. **Every element earns its place?** Eyebrow, headline, one line of founders, art, toggle, two actions, trust. Yes.
5. **Stressed?** "Get My Roof Checked" is the largest thing on the screen.

**Skill ledger:** ⟦S0489⟧ creature motion · ⟦S1330⟧ split depth · ⟦S1338⟧⟦S1331⟧ flowmap · ⟦S0407⟧ runoff lines · ⟦S1341⟧ rain · ⟦S0451⟧ title reveal · ⟦S1388⟧⟦S0405⟧⟦S0340⟧⟦S1259⟧ buttons.

## 4. Checks (`node tools/final-test.cjs hero`): **19/19**
axe WCAG 2.1 A/AA 0 · facts lock · no maps · distinct media (page-wide) · headline · two actions · trust row locked · WebGL mounted and sized · depth planes follow the pointer · sharp at 1440 (DPR 1) and 390 (DPR 2) · no sideways scroll and 44 px controls at 1440/768/390 · reduced motion renders · no errors.
The owl photo is shown at 0.83× its pixels on desktop and about 0.6× at DPR 2 on phones.

## 5. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.4 | 8.4 | 8.6 | 8.6 | **8.46** (3.36 + 2.52 + 1.72 + 0.86) |

## 6. Defects
None found in the port. Noted: on phones a faint edge of the owl painting's cut-out is visible at the right (barely, at 2× zoom); left as in the owner-approved V2.

## 7. Questions for Muse (raised, not parked)
1. **In-file PAST:** I kept the old pre-reset homepage inside the file as an inert record (opened only with `?past`), honouring the 05:15 "never delete" order, and froze the 22-version build separately in `past/`. The file is heavier because of it. Say if the in-file copy may go (the files in `past/` stay).
2. **YouTube "Watch the full film" button:** I will drop it from the video section: it plays the same footage as Owl's crew film (same video twice).
3. **Handwriting font:** the booking paper form needs a handwriting face (Caveat, SIL OFL, embedded for that form only). Everything else stays Inter. Please confirm the exception stands.
4. **Header nav:** links to Wise Check / About / Protect inner pages point to the in-page sections until the inner pages are built after GATE-FINAL-HOME.

## 8. Vetoes: **zero**
Owl facts exact; logo untouched; no invented claims; original palette; no maps; no stock.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
