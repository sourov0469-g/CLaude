# GATE-NEW · Explore 11 · "Where's the Trouble?" (first of five new Explore versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Show us where the trouble is — we'll fix it.*
- **Re-framing required by the owner's ruling:**
  - Explore V1–V10 explore how a roof is built (layers, nails, airflow): exactly the teaching he rejected.
  - From Explore 11 on, the section explores the homeowner's own trouble, not the roof's anatomy. Nothing here explains construction.
- **Primary governing reference:** Quiet Cubes (configurator structure: point at a part, get its answer at once).
- **Style family:** a friendly flat drawing of a house with five tap spots, plus a small Owl that flies to the spot.
- **Signature move:**
  - Tap a trouble spot: shingles, chimney, a stain on the ceiling, siding, or storm damage.
  - The Owl hops across the house and lands beside it.
  - The answer card says, in one line, that Owl fixes that, with **Get My Roof Checked** and the phone number right there.
- **Every answer maps to a real Owl service:**
  - Roof Repair: shingles, the chimney leak, the ceiling stain.
  - Roof Replacement: shingles, "if it's time".
  - Storm Damage Help: storm damage.
  - Siding: siding.
  - Wise Check: "not sure".
  - No other work is promised.
- **How it differs from Explore V1–V10, and why it is better:**
  - It is the first Explore version with no roof lesson at all.
  - The visitor brings their own problem, and the page answers "we fix that" in their words.
  - It is not a game: there is no score and no order. Point, and get reassured.
- **Skill ledger, per element:**
  - Title reveal: ⟦S0451⟧.
  - House drawing: static, roofer-correct (shingle courses, chimney flashing, siding boards).
  - Trouble-spot buttons: ⟦S0405⟧ pulse and press, ⟦S1107⟧ keys (Tab, Enter), aria-pressed.
  - The Owl hop between spots: ⟦S0489⟧ arc and settle.
  - Answer card swap: ⟦S0409⟧.
  - "Get My Roof Checked" and "Call (651) 977-6027": ⟦S0405⟧.
  - Reduced motion: ⟦S0400⟧. The Owl moves without the arc, and the spots don't pulse.

## What was built
- **Left:** a friendly flat drawing of a house with five pulsing amber trouble spots, each placed beside its trouble:
  - a patch of missing and lifted shingles;
  - a fallen branch on the roof (storm damage);
  - a dark wet streak below the chimney;
  - a brown ceiling stain seen through a window;
  - cracked, loose siding boards.
  - A little flat Owl sits by the chimney.
- **Tapping a spot:**
  - The Owl hops across the house in an arc and lands beside it, and the spot turns dark (pressed).
  - The card on the right answers in the homeowner's words: the problem as a question, then one line saying Owl fixes it, tagged with the real service.
  - **Get My Roof Checked** and **Call (651) 977-6027** sit under the card.
- **Before any tap:** the card reads "Not sure what's wrong? Tap a spot on the house, or book a Wise Check and we'll look for you."
- **The answers, each mapped to a real Owl service:**
  - Shingles: "We'll repair them, or replace the roof if it's time, backed by our 10-year workmanship warranty." (Roof repair or replacement)
  - Storm: "We'll find the hail and wind damage and put it right." (Storm damage help)
  - Chimney: "We'll find where the water gets in and fix it before it spreads." (Roof repair)
  - Ceiling stain: "It's often the roof. We'll track the leak down and stop it." (Roof repair)
  - Siding: "We do siding too, so the outside of your home is looked after." (Siding)

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390
1. **What is it for?** "Show us where the trouble is; we'll fix it."
2. **Do I get it in under three seconds, without reading?** Yes. A house with glowing spots on its problems says "tap your problem", and the answer card says "we fix that".
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The Owl hops from spot to spot, as if going to look at your problem.
   - Each spot is a recognisable homeowner moment: a branch on the roof, a stain on the ceiling.
   - Tapping around feels like pointing things out to a roofer standing in your yard.
4. **Is every element here for a clear reason?**
   - House: your home.
   - Spots: your possible problems.
   - The Owl: Owl, coming to look.
   - Answer card: the reassurance.
   - Service tag: which Owl service it is.
   - Two buttons: act now.
   - Things I questioned:
     - **Pulsing rings on the spots:** kept, so they read as tappable. They stop on the chosen spot.
     - **Roof cross-sections, layers and materials** (the entire subject of Explore V1–V10): **removed entirely**, per the owner's ruling.
5. **Does it fit a stressed homeowner with a leaking roof?** Yes.
   - "Leak", "stain" and "storm" are their words.
   - Every answer ends at "we fix it", with book and call one tap away.
   - With reduced motion the Owl simply moves, and nothing pulses.

**Verdict: passes.** The fixes below were made before the final screenshots.

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.4 | A clean, warm flat illustration in the brand palette, with a clear card beside it. Simpler than the Hero photography, by design. |
| Usability | 30 | 9.0 | Five big named buttons and an instant answer. Book and call are always visible. Spots are at least 67 px apart even on a phone. |
| Creativity | 20 | 8.4 | Turns "Explore your roof" from anatomy into "point at your problem". The hopping Owl is a nice touch. |
| Content | 10 | 9.4 | No teaching. Every promise maps to a real Owl service, and the warranty is the locked 10-year workmanship. |
| **Weighted** | | **8.70** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-explore-11/checks.json`, 21/21.
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
- **Explore 11's own checks:**
  - it opens on the homeowner's question;
  - five named spots of at least 44 px;
  - no two spots overlap;
  - each spot answers with its real service, one at a time;
  - the Owl flies to each spot;
  - **no construction words anywhere** (underlayment, ice & water, decking, drip edge, nail, ventilation, rafter);
  - book and call.
- **Spacing check on top:** the minimum spot spacing measured 67 px at 390 and 135 px at 768.

**Evidence:** `gates/ladder/NEW-explore-11/`, with 2× shots at 1440, 768 and 390, taken with the ceiling stain chosen.

## Defects found and fixed
- **Spots hiding the trouble.** The spots first sat directly on the trouble drawings, so the missing shingles, the stain and the cracked siding were hidden under the buttons. Each spot now sits beside its trouble.
- **Phone overlap.** On phones the shingles and storm spots overlapped. They have been moved apart.

**Remaining, named honestly:**
- On phones the house drawing is small, about 330 px wide. The spots are big enough to tap, but the trouble drawings become small details.
- Next to Wise Check V3 ("When to Call"), the theme of "symptoms" is related, but this version is about pointing and reassurance, not a checklist.

## Reference transfer
- **Transferred from Quiet Cubes:** pick a part, get its answer instantly, one at a time, with clear selection state.
- **Not transferred:** specs, prices and option panels.

## Compared with the section's previous best
- Explore V1–V10 were judged by the owner to fall into "explaining things". This version keeps Explore's best mechanic, exploring the house by pointing (from V2 and V5), and drops the lesson entirely.
- The only words on screen are the homeowner's problems and Owl's promise to fix them.
