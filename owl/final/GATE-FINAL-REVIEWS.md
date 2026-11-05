# GATE-FINAL-REVIEWS · section 7, "Ninety-Plus and Counting" (ONE final version, card rebuilt)

**Source:** OLD Reviews V3, `src/final/sections/07-reviews.html` (id `reviews`, the header's Reviews link). **Evidence:** `gates/final/reviews/` (`card.png`, `water.png`, `s-1440.png`, `s-390.png`, `checks-reviews.json`).

## 1. Think first
The owner liked the water-type background and asked for a better **card**. The water (90 feathers, one per review so far, and a plus for the next; ripples lift them in amber) is untouched in look and behaviour.
Problems in the old card: a dense stack (kicker, number, stars crammed beside it, heading, a sentence explaining the feather gimmick, three chips, a button); nothing said the water could be touched (on phones nothing happens until you tap); the stars were a label, not an event.
Ideas weighed: (a) a quote carousel: **rejected, no review text exists and none may be invented**; (b) a counter that counts up to 90: rejected, it passes through false values; (c) a rebuilt "rating plaque". **Chosen (c):**
- five stars that pop in one by one when the card enters view;
- one huge **5.0** with "90+ reviews" under it (read to screen readers as "Rated 5.0 from 90+ reviews.");
- the heading "Ninety-Plus and Counting";
- three proofs as a tidy list with icons: BBB A−, GAF Systems Plus, 10-year workmanship warranty;
- one action, Book a Wise Check;
- the card **leans toward the pointer** with a soft glare (desktop), as the film and the booking card do;
- a pill says **"Touch the water"** (desktop) or **"Tap the water"** (touch) and goes away on first touch;
- the sentence explaining the feathers moved out of the card to a caption under the field.
Audit: the card is taller than before, so the feather grid is recomputed from the card's resting size and also keeps clear of the hint pill; the phone field grows to 880 px so all 91 marks still fit (checked: 91 placed at every size).

## 2. Five questions (homeowner)
1. **What is it for?** Can I trust them?
2. **Under 3 s?** Yes: five stars, 5.0, "90+ reviews".
3. **Fun?** The water answers your finger; the stars pop; the card leans.
4. **Every element earns its place?** Stars, 5.0, count, heading, three proofs, one action, hint, caption. Yes.
5. **Stressed?** The number and the three facts, nothing to read.

**Skill ledger:** ⟦S1330⟧ damped lean · ⟦S1338⟧ flowmap-style ripple (as V3) · ⟦S0544⟧ causal motion · ⟦S0451⟧ title reveal · ⟦S1107⟧ one real action.

## 3. Checks (`node tools/final-test.cjs reviews`): **22/22**
axe 0 · facts lock (reviews only as 5.0 · 90+) · no maps · card content exactly as specified · screen-reader line · no quoted or invented review · 91 marks placed in view, clear of the card · stars filled in · a click on the water lifts feathers (amber pixels rise) · the hint goes away · the card leans toward the pointer · layout and 44 px controls at 1440/768/390 · reduced motion (marks placed, stars filled, no tilt) · no errors.

## 4. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.6 | 8.4 | 8.6 | 8.6 | **8.54** (3.44 + 2.52 + 1.72 + 0.86) |

## 5. Remaining
- **D1:** with no review text to quote, the card shows the number and the facts only. If Owl supplies real review excerpts (with permission), a quote line can go under the heading.
- **D2:** the number of feathers equals the "90" in "90+"; if the count changes, the constants in the file change with it.

## 6. Vetoes: **zero**
Reviews only as "5.0 · 90+ reviews"; BBB A−; GAF Systems Plus; 10-year workmanship warranty; no invented reviews; logo untouched; no maps.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
