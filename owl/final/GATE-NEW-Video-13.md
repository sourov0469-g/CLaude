# GATE-NEW · Video 13 · "Shake It" (third of five new Video versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Get a good look at the people who'll work on your home.*
- **Primary governing reference:** Graza (one charming, physical interaction done with care).
- **Style family:** an instant photo. A cream-framed snapshot with a thick bottom margin, tilted on a light page, next to plain words and buttons.
- **Signature move:**
  - The snapshot starts undeveloped, a murky brown-grey, and develops slowly on its own once in view.
  - Drag it side to side, or press **Shake It**, and it develops faster; the card swings and springs back.
  - Fully developed, the photo comes alive. It is Owl's own crew film, playing, with the caption "Owl's crew, at work" on the margin.
- **How it differs from Video V1–V12, and why it is better:**
  - None of the twelve makes the visitor reveal the crew with their own hand.
  - The "shake it" gesture is universally understood, and pays off with real faces.
  - It still works with zero effort: it develops by itself in a few seconds.
- **Skill ledger, per element:**
  - Title reveal: ⟦S0451⟧.
  - Snapshot drag-to-shake, with swing and spring-back: ⟦S1018⟧ drag (with a keyboard alternative) and ⟦S0489⟧ settle.
  - Development fade (murk to colour): ⟦S0409⟧ state transition.
  - Film comes alive: ⟦S1046⟧.
  - Margin caption appears: ⟦S0451⟧.
  - "Shake It" button: ⟦S0405⟧.
  - "Get My Roof Checked", "Call (651) 977-6027" and "Watch the full film": ⟦S0405⟧, ⟦S1046⟧.
  - Reduced motion: ⟦S0400⟧. Shown developed, poster still, and Shake It hidden.

## What was built
- **Text side:** the title **Shake It**, one line ("Get a good look at the people who'll work on your home. Give the photo a shake."), then **Get My Roof Checked**, **Call (651) 977-6027** and "Watch the full film".
- **The snapshot:**
  - A cream instant-photo card, slightly tilted, starts as a murky, undeveloped square.
  - Once on screen it develops by itself in about seven seconds. Colour and contrast come up, and a thin amber meter fills underneath.
  - Dragging the card side to side shakes it: it swings with a spring, and each shake develops it faster. The **Shake It** button does the same with one press.
  - When fully developed, the photo is Owl's own crew film, playing in full colour. "Owl's crew, at work" appears on the margin, Shake It steps aside, and screen readers hear that the photo has developed.
- **Phone and tablet:** the snapshot comes first, then the words and buttons.

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390, before and after
1. **What is it for?** "Get a good look at the people who'll work on your home."
2. **Do I get it in under three seconds, without reading?**
   - Yes: an instant photo that needs shaking is a gesture everyone knows.
   - And it doesn't depend on the gesture. My untouched capture after eight seconds (`video-v13-f50-768.jpg`) shows it fully developed, landing on a crew member in an Owl Roofing shirt.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - You physically shake the photo and watch the faces appear.
   - The card swings and springs back with real weight.
   - The reward is real people, alive on film.
4. **Is every element here for a clear reason?**
   - Title and lede: the promise and the invitation.
   - Snapshot: who you'll meet.
   - Meter: shows the shaking is working. It fades out when done.
   - Shake It button: the keyboard and one-tap route to the same thing.
   - Caption: who they are.
   - Book, call and the full film: the next steps.
   - Things I questioned:
     - **The meter:** kept small, as feedback for the shaking. It disappears once developed.
     - **Shake sound and haptics:** not added.
   - Nothing pointless remains.
5. **Does it fit a stressed homeowner?** Yes.
   - The book and call buttons sit beside the photo from the start, not behind the game.
   - The photo finishes by itself even if ignored.
   - With reduced motion it is shown developed, still, with no button.

**Verdict: passes.**

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | A warm, tactile object on a light page. Simple two-column balance. |
| Usability | 30 | 8.8 | Works passively, by drag, by button and by keyboard. The calls to action are always visible. |
| Creativity | 20 | 9.0 | Shaking a snapshot to reveal the crew is new in the section, and its reward is the real people. |
| Content | 10 | 9.0 | Owl's own film. The caption claims only "Owl's crew, at work". The locked phone and YouTube ID. |
| **Weighted** | | **8.80** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-video-13/checks.json`, 21/21.
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
- **Video 13's own checks:**
  - it starts murky and develops on its own;
  - a drag-shake develops it faster and swings the card;
  - fully developed, the film plays in full colour with its caption;
  - Shake It steps aside and the change is announced;
  - the card settles back to its resting tilt;
  - book and call;
  - the full film opens YouTube.

**Evidence:** `gates/ladder/NEW-video-13/`.
- Undeveloped and developed (after three Shake It presses) shots at 1440 and 390, at 2×.
- Viewport shots at 1440, 768 and 390, taken after eight untouched seconds, which show the passive develop.

## Defects found and fixed
- **Component:** none found after the first build; the screenshots matched the plan.
- **My first test:** it pressed Shake It after a drag had already finished developing the photo. The button had correctly stepped aside, so the test timed out. The test now presses it only while it is shown.

**Remaining, named honestly:**
- Which moment of the film shows when it finishes developing depends on timing. It can land on a blurred frame (the shingle bundle being carried) as easily as a face. The loop moves on within seconds.

## Reference transfer
- **Transferred from Graza:** one tactile, charming interaction with real physicality, the swing and spring-back, and a rewarding payoff.
- **Not transferred:** the illustrated product world.

## Compared with the section's previous best
- **Against V1:** the same real film. Instead of a player, the visitor reveals the crew with their own hand.
- **Against Videos 11 and 12:** 11 is the fastest (press the Owl), 12 the warmest (ring the bell). 13 is the most tactile, and also the only one that completes by itself with no action at all.
