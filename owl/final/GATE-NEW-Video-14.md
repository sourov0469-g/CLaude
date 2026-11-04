# GATE-NEW · Video 14 · "Flip It" (fourth of five new Video versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Whatever's wrong with your roof, these are the people who fix it.*
- **Primary governing reference:** MERSI (split-cover chapters: one cover, two sides, the turn as the story).
- **Style family:** a two-sided card, with the problem on the front and the people on the back.
- **Signature move:**
  - **Front, in the homeowner's words:** "Roof trouble?" with "A leak, a storm, a tired old roof." and a drip falling from the top edge.
  - **The turn:** once on screen the card turns over by itself, once, after a short beat. The visitor can tap it, or press its button, to turn it back and forth.
  - **Back:** Owl's own crew film playing, with "Owl's crew. On it."
- **How it differs from Video V1–V13, and why it is better:**
  - It is the only Video version that starts from the homeowner's problem and answers it with the crew. The film becomes the answer, not just a showcase.
  - It is the only 3D card turn in the section.
- **Skill ledger, per element:**
  - Title reveal: ⟦S0451⟧.
  - Card turn: ⟦S1388⟧ 3D, ⟦S0489⟧ settle.
  - Front drip: ⟦S0407⟧ motion path, a short loop while the front shows.
  - Back film: ⟦S1046⟧.
  - The card as a button ("Flip the card"): ⟦S0405⟧, ⟦S1107⟧ keyboard.
  - "Get My Roof Checked", "Call (651) 977-6027" and "Watch the full film": ⟦S0405⟧, ⟦S1046⟧.
  - Reduced motion: ⟦S0400⟧. No turn animation (it swaps instantly), no auto-turn, no drip; the poster is shown.

## What was built
- **Header:** centred. The title **Flip It** and one line: "Whatever's wrong with your roof, turn it over and meet the people who fix it."
- **The card:**
  - **Front:** a large card on cream with **Roof trouble?** in big type, "A leak, a storm, a tired old roof." under it, and "Turn it over". A small water stain sits at the top edge, and drops fall from it.
  - **The turn:** about 2.6 seconds after the card comes into view, it turns over by itself, once, in 3D with a gentle settle.
  - **Back:** Owl's own crew film playing, with "Owl's crew. On it."
  - Tapping the card, or pressing **Flip the card**, turns it back and forth. Once the visitor has turned it, it never auto-turns again.
- **Under the card:** **Get My Roof Checked**, **Call (651) 977-6027** and "Watch the full film".

## Self-check (the owner's five questions), answered from my own screenshots at 1440 and 390, front and back
1. **What is it for?** "Whatever's wrong with your roof, these are the people who fix it."
2. **Do I get it in under three seconds, without reading?** Yes. Three words of problem ("Roof trouble?"), then the card turns and you see the people. Problem, answer.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The turn itself: a big, physical card flip that answers the question on its front.
   - The little drip from a ceiling-style stain, which every homeowner with a leak recognises.
   - It can be flipped back and forth by hand.
4. **Is every element here for a clear reason?**
   - Front text: their worry, in their words.
   - Drip: a leak, shown in one second.
   - Turn: the answer arriving.
   - Back film and tag: who answers it.
   - Flip button: the keyboard route, and it shows the state.
   - Book, call and the film: the next steps.
   - Things I questioned:
     - **The stain at the top edge:** kept faint; it gives the drip a source.
     - **A carousel of several problems** (leak, storm, old roof as separate cards): **rejected**. It would be a second idea, and the one sentence names all three.
   - Nothing pointless remains.
5. **Does it fit a stressed homeowner?** It fits best of the five so far.
   - It literally starts with their problem.
   - The call button is there before and after the turn.
   - With reduced motion the card swaps instantly, with no drip and no auto-turn.

**Verdict: passes.**

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | One big, calm card. Strong type on the front, the real film on the back, and the light page kept. |
| Usability | 30 | 9.0 | It works with no action (it turns itself), by tap, and by named button. The calls to action are always visible. |
| Creativity | 20 | 8.6 | Problem on the front, people on the back: the film becomes the answer. |
| Content | 10 | 9.4 | The homeowner's own words for the problem. Owl's own film. No claims beyond "Owl's crew". |
| **Weighted** | | **8.80** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-video-14/checks.json`, 21/21.
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
- **Video 14's own checks:**
  - it starts on the problem, with no film playing;
  - it turns by itself once, to the film playing with its tag;
  - the button turns it back, pauses the film, and announces the change;
  - there is no second auto-turn after the visitor has acted;
  - tapping the card turns it;
  - book and call;
  - the full film opens YouTube.

**Evidence:** `gates/ladder/NEW-video-14/`.
- Front and back shots at 1440 and 390, at 2×.
- Viewport shots at 1440, 768 and 390.
- `video-v14-drip-frames.png`: four frames, 450 ms apart, confirming the drip is visible on the front.

## Defects found and fixed
- **Component:** none; the first build matched the plan.
- **Evidence capture:** my first drip capture measured the crop mid-scroll and failed. It was re-captured after the scroll settled.

**Remaining, named honestly:**
- The drip loops for as long as the front is showing. It is small, but it is the section's only continuous motion before the turn.
- A visitor who reads the front and scrolls away within 2.6 seconds never sees the back.

## Reference transfer
- **Transferred from MERSI:** the cover as the chapter. One surface with two sides, and the turn is the story.
- **Not transferred:** the editorial typography system and the long scroll chapters.

## Compared with the section's previous best
- **Against V1:** the same real film, now framed as the answer to the homeowner's problem rather than a showcase.
- **Against Videos 11–13:** they introduce the crew (press, ring, shake). 14 is the only one that starts from the homeowner's trouble, the strongest framing for the stressed visitor the owner described.
