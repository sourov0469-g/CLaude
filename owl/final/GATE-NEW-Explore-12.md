# GATE-NEW · Explore 12 · "How Old Is Your Roof?" (second of five new Explore versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Tell us how old your roof is, and we'll tell you straight what it needs.*
- **Primary governing reference:** Quiet Cubes (configurator structure: one control, an instant, visible result).
- **Style family:** a single dial. One big slider, thumbed by the Owl, ages a drawn roof in front of you, and an answer card responds.
- **Signature move:**
  - Drag the Owl along the years, 0 to 30+.
  - The drawn roof ages under your thumb: new dark shingles fade, a few tabs curl, then streaks and moss appear, and at 30+ a couple are missing.
  - The card answers with what Owl would do at that age, in one line, with **Get My Roof Checked** and **Call**.
  - A "Not sure?" button answers too.
- **Truth guard:**
  - No lifespan figures, no "your roof will last X years", no construction lesson. Every answer is what Owl will do: fix it fast (Repair), look at it with you (Wise Check), or replace it (Replacement).
  - The aging drawing is illustrative.
- **How it differs from Explore V1–V11, and why it is better:**
  - Explore 11 asks "where's the trouble?"; 12 asks the one question every homeowner can answer without going outside, its age.
  - One control, one picture, one answer. No anatomy at all.
- **Skill ledger, per element:**
  - Title reveal: ⟦S0451⟧.
  - Roof drawing that ages (colour, curl, streaks, moss, missing tabs): ⟦S0409⟧ state transition, ⟦S0489⟧ small-amplitude change.
  - Age slider: native range input with an Owl-face thumb. ⟦S1018⟧ draggable with keyboard (arrows, Home, End), ⟦S1325⟧ filled track; GATE-BUTTONS focus snap.
  - Year readout: ⟦S1352⟧ numerals.
  - Answer card swap: ⟦S0409⟧.
  - "Not sure?" button, "Get My Roof Checked" and "Call (651) 977-6027": the GATE-BUTTONS system (roll, sweep, ring, press, splash).
  - Reduced motion: ⟦S0400⟧. The roof changes state instantly, with no tweening.

## What was built
- **The picture:** a friendly drawing of a house whose hipped roof is rows of shingle tabs.
- **The slider:** under the picture, a big slider runs from "New" through 10 and 20 to "30+". Its thumb is a round Owl face, and the age reads out large ("12 years").
- **As you slide:**
  - the shingles fade from new charcoal toward a tired grey-brown;
  - past the middle years a few tabs curl, and dark streaks run down the slope;
  - moss creeps in later;
  - at 30+ a couple of tabs are missing.
- **The answer card**, beside the picture, in one line with its real service:
  - **0–5 years, Roof repair:** "Still young. If something's off, a lifted shingle or a leak after a storm, we'll fix it fast."
  - **6–14 years, Wise Check:** "In its middle years. A Wise Check catches the small things before they turn into big ones."
  - **15–24 years, Wise Check:** "Getting on. Let's look at it together. We'll tell you straight: a repair, or time for a new roof."
  - **25–30+ years, Roof replacement:** "It's had a good run. When you're ready, we'll replace it, backed by our 10-year workmanship warranty."
  - **"Not sure how old it is?", Wise Check:** "Not sure? Most people aren't. We'll look at it for you and tell you how it's doing, in plain words."
- **Buttons:** **Get My Roof Checked** and **Call (651) 977-6027** sit under the card, with the GATE-BUTTONS system.
- **The slider is a native range input:** arrows, Home, End and Page keys all work, and it announces "12 years" or "30 or more years".

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390, at 2, 12 and 30+ years
1. **What is it for?** "Tell us how old your roof is, and we'll tell you straight what it needs."
2. **Do I get it in under three seconds, without reading?** Yes. A slider labelled with years under a picture of a roof, then slide it and watch the roof get old. Everyone knows their roof's age, roughly.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The roof visibly ages under your thumb: fading, curling, streaks, moss.
   - You can scrub back and forth and watch it get younger again.
   - The thumb is the Owl.
4. **Is every element here for a clear reason?**
   - Picture: shows the age.
   - Slider and readout: the one input.
   - Card: the honest answer.
   - "Not sure?": for everyone who doesn't know.
   - Two buttons: act.
   - Things I questioned:
     - **The streaks and the curled tabs:** reduced after my first 30+ screenshot looked too busy.
     - **Lifespan figures** ("roofs last 20–30 years"): **left out**. That is teaching. The card only says what Owl will do.
5. **Does it fit a stressed homeowner?** Yes.
   - It needs one gesture, and the answer always ends in book or call.
   - The leak case is named in the very first band.
   - With reduced motion the roof simply jumps between states.

**Verdict: passes.**

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.4 | A clean illustration whose change is the message. A big, friendly slider with the Owl as the thumb. |
| Usability | 30 | 9.0 | One native control, fully keyboard-able and announced. An instant answer, and book and call always visible. |
| Creativity | 20 | 8.6 | Ageing the roof under your thumb is a new, simple way to self-diagnose. |
| Content | 10 | 9.2 | No lifespan claims and no construction words (tested). Each answer is a real Owl service, and the warranty is the locked 10-year workmanship. |
| **Weighted** | | **8.70** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-explore-12/checks.json`, 21/21.
- **Generic checks:**
  - only this version is visible;
  - the anchor id;
  - one h2;
  - controls are at least 44 px;
  - facts lock;
  - axe shows 0 violations;
  - no page or console errors;
  - no sideways scroll at 1440, 768 or 390;
  - phone controls are at least 44 px;
  - reduced motion has no looping animation.
- **Explore 12's own checks:**
  - **at 2 years:** crisp, no curl or moss, Roof repair;
  - **at 10 years:** a Wise Check, with a changed colour;
  - **at 30+:** faded, curled, missing tabs and moss, "It's had a good run", Roof replacement and the 10-year workmanship warranty, announced as "30 or more years";
  - the Home key gives 0;
  - "Not sure?" gives a Wise Check;
  - **no lifespan claims or construction words**;
  - book and call.

**Evidence:** `gates/ladder/NEW-explore-12/`, with the default (12 years) and 30+ at 1440, 768 and 390, at 2×.

## Defects found and fixed
- **Too busy at 30+.** At 30+ the first build curled too many tabs, with heavy streaks. Fewer tabs curl now, by less, and the streaks are lighter.

**Remaining, named honestly:**
- At the far right on phones, the Owl thumb sits half past the track's end (native range behaviour).
- The age bands are Owl's advice wording, not measured data; the card never claims more than what Owl will do.

## Reference transfer
- **Transferred from Quiet Cubes:** one configurator control with an instant visual result.
- **Not transferred:** prices, options and the 3D product.

## Compared with the section's previous best
- **Against Explore 11:** 11 is "point at where it hurts"; 12 is "tell us its age". Both are homeowner questions with "we'll do it" answers, and neither teaches.
- 12 is the simplest Explore yet: one control, one picture, one line.
