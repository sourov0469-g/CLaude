# GATE-NEW · Explore 13 · "Does Your Roof Look Like This?" (third of five new Explore versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Look at a few pictures, tell us which one is your roof, and we'll take it from there.*
- **Primary governing reference:** Apple AirPods Pro (one card at a time, full focus, nothing else to decode).
- **Style family:** a swipe stack. Five illustrated close-up cards of everyday roof trouble, one on top of the other.
- **Signature move:**
  - Swipe a card right ("Yes, that's mine") or left ("No"), or tap the two big buttons, or use the arrow keys.
  - The card flies off with a tilt.
  - Each "yes" gets a one-line "we fix that".
  - After the last card, one honest summary: if anything matched, "Let's take a look"; if nothing did, "Sounds healthy. A Wise Check keeps it that way." Book and call follow.
  - **Not a game:** there is no score, no timer and no right answer.
- **Cards (homeowner words, each mapped to a real Owl service):**
  1. Curling or cracked shingles → Roof repair or replacement.
  2. Shingles gone after a windy night → Storm damage help and roof repair.
  3. Dark streaks or moss → Wise Check ("we'll tell you if it's more than looks").
  4. A stain on the ceiling → Roof repair.
  5. Hail or a branch came down on it → Storm damage help.
- **How it differs from Explore V1–V12, and why it is better:**
  - Explore 11 is tap a spot, and 12 is slide the age. 13 is recognition: "that one's mine". It is the easiest possible input for someone who doesn't know roof words, with pictures doing the talking.
  - The swipe is native to phones, where most stressed homeowners will be.
- **Skill ledger, per element:**
  - Title reveal: ⟦S0451⟧.
  - Card stack with a slight fan: ⟦S1388⟧ small depth.
  - Swipe drag with tilt and fly-off: ⟦S1018⟧ draggable with button and keyboard alternatives, ⟦S0489⟧ settle and throw.
  - Yes/No buttons and the Start-again button: the GATE-BUTTONS system (press, splash, focus), with ⟦S0405⟧ label states.
  - Progress dots: ⟦S1325⟧.
  - "We fix that" line and summary card: ⟦S0409⟧.
  - "Get My Roof Checked" and "Call": GATE-BUTTONS.
  - Reduced motion: ⟦S0400⟧. Cards swap without flying.

## What was built
- **The words side:** the title **Does Your Roof Look Like This?** and one line: "Five pictures. Swipe right if it looks like yours, left if it doesn't. We'll take it from there." A reply card starts as "No roof words needed. Just tell us what you see." **Get My Roof Checked** and **Call (651) 977-6027** sit under it.
- **The stack:** five illustrated close-up cards, fanned slightly:
  - curling or cracked shingles (lifted tabs with their shadows, a crack);
  - shingles gone after a windy night (bare patches, a blown-off tab, wind strokes);
  - dark streaks or moss;
  - a stain on the ceiling (a brown ring and a drip, seen indoors);
  - hail, or a branch came down (hailstones and a branch on the shingles).
- **Choosing:**
  - Drag the top card: an amber "Mine" or a grey "Nope" stamp fades in as you go.
  - Past a third of the card's width it flies off with a tilt; a short drag springs back.
  - **No** and **Yes, that's mine**, and the left and right arrow keys, do the same.
  - Each yes fills its progress dot amber, and the reply card names the fix and the real service, e.g. "Curling or cracked shingles? We'll repair them, or replace the roof if it's time. (Roof repair or replacement)".
- **The summary:**
  - With any yes: **"Let's take a look."** It lists what was picked ("curling shingles and a ceiling stain") and adds "We fix all of that. Book a check or call, and we'll come and see."
  - With none: **"Sounds healthy."** and "A Wise Check keeps it that way."
  - **Start again** resets the stack.
- **Not a game:** there is no score, no timer and no right answer (tested).

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390, at the first card, after a yes, and at the summary
1. **What is it for?** "Look at a few pictures, tell us which one is your roof, and we'll take it from there."
2. **Do I get it in under three seconds, without reading?** Yes. A picture of a problem roof with "No" and "Yes, that's mine" under it needs no explanation.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The swipe itself: the card tilts as you drag, the "Mine" stamp fades in, and it flies off.
   - Every yes gets an instant "we fix that".
   - It is the familiar phone gesture, done well.
4. **Is every element here for a clear reason?**
   - Pictures: recognition without vocabulary.
   - Yes/No: the one decision.
   - Reply line: the reassurance.
   - Dots: how many are left.
   - Summary: the honest next step.
   - Start again: for a second go.
   - Book and call: the action.
   - Things I questioned:
     - **Stamps while dragging:** kept, because they show which way you're deciding.
     - **A score or "you got 3 of 5":** **not added**. It would make it a game, and Owl's single game is Explore V3.
5. **Does it fit a stressed homeowner?** Yes.
   - No roof words are needed.
   - Five taps at most.
   - The book and call buttons are visible the whole time.
   - The ending always points to a check, never to doing nothing.
   - With reduced motion, cards swap without flying.

**Verdict: passes.**

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.4 | Clean card stack and clear illustrations. The words side and the deck side are balanced. |
| Usability | 30 | 9.0 | Swipe, buttons or keys. A short drag springs back. The buttons are always visible. Phone-native. |
| Creativity | 20 | 8.6 | Recognition by pictures is the gentlest self-diagnosis yet, and a playful gesture with a useful end. |
| Content | 10 | 9.2 | Every yes maps to a real service. No score and no construction words (tested). |
| **Weighted** | | **8.70** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-explore-13/checks.json`, 22/22.
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
- **Explore 13's own checks:**
  - five cards, with the first on top;
  - a swipe right decides yes, naming the fix and the real service, and marks its dot;
  - a short drag springs back;
  - No moves on;
  - the arrow keys decide;
  - the summary lists the matches ("curling shingles and a ceiling stain"), with "Let's take a look.";
  - all-no gives "Sounds healthy.", a Wise Check and no score;
  - no construction words;
  - book and call.

**Evidence:** `gates/ladder/NEW-explore-13/`, with the first card and the summary at 1440, 768 and 390, at 2×.

## Defects found and fixed
- **Hidden dots.** The progress dots were hidden under the fanned cards behind. There is now more space under the stack.
- **Empty card space.** The cards had dead space at the bottom. Their aspect ratio is now tighter.
- **Curl art.** The curled shingles read as pale wedges. They now have a lift shadow.
- **Phone button label.** On phones "Yes, that's mine" was cut off. The button row now spans the card, and the yes button gets more of it.
- **Back-card text.** Text from the cards behind peeked out under the top card. It is now hidden.
- **Summary grammar.** The summary listed matches with a bare comma ("curling shingles, a ceiling stain"). It now reads "curling shingles and a ceiling stain".
- **Empty gap.** After the last card, the hidden Yes/No buttons left an empty gap on phones. They now collapse.

**Remaining, named honestly:**
- The illustrations are simple flat drawings, not photos. The pack's storm photos could replace two of them, but one is held as possibly AI and the other shows palm trees.
- The left side's first line is long at 1440 (two lines).

## Reference transfer
- **Transferred from Apple AirPods Pro:** one item at a time, full focus, and a clear end state.
- **Not transferred:** the dark product staging and scroll-scrubbed video.

## Compared with the section's previous best
- **Explore 11:** point at a spot on a house.
- **Explore 12:** slide your roof's age.
- **Explore 13:** recognise your roof in a picture.

All three are homeowner questions with "we fix that" answers. 13 needs the least knowledge of all, just "does it look like this?"
