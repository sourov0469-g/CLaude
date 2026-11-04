# GATE-NEW · Protect 10 · "Not a Nail Left" (first of five new Protect versions, homeowner-simple pass)

Protect had 9 versions when this pass reached it (the fourth ladder pass paused at 9). The five new versions are therefore 10–14.

## Plan line (written before building)
- **The one homeowner sentence:** *When we leave, your lawn is safe for bare feet again: we sweep it with a magnet.*
- **Primary governing reference:** Quiet Cubes: an object you operate, where one gesture gives an instant, visible result. Here the object is a big horseshoe magnet.
- **Style family:** one wide, real photo of a lawn and garden, with a scatter of small drawn nails lying in the grass.
  - A big red-and-silver horseshoe magnet waits at the side with "Drag the magnet".
  - Move it over the lawn and the nails near it jump up and stick to its tips. When most are gone, the rest fly in by themselves, and one line says what that was: pass two of the three cleanup passes in Owl's Protect Your Nest System.
- **Signature move:**
  - With a mouse, the magnet follows the pointer over the lawn; no press is needed.
  - On touch, you drag the magnet itself (only the magnet takes the drag), so swiping the photo still scrolls the page. This carries the lesson from Wise Check 10 and 11.
  - "Sweep it for me" runs the sweep for keyboard users or anyone who doesn't want to drag. "Scatter them again" replays.
  - There is no count, no timer and no score; the end comes by itself. Explore V3 remains the site's one game.
- **Words** (facts only from the Protect Your Nest System as the site already states it: the wrap, three cleanup passes by the crew, a magnet sweep and the project manager's walk, and the aftercare box):
  - Before: "Move the magnet over the lawn."
  - After: **Not a nail left.** "That’s pass two of our three cleanup passes: the crew clears up, a magnet sweeps the lawn, then the project manager walks it last."
  - The label "Illustrative photo; drawn nails."
- **Actions:** **Get My Roof Checked** (primary, `#book`, the label Protect versions already use) and **Call (651) 977-6027**.
- **The word "nail":** the owner's no-teaching rule bans construction lessons. Here "nail" is the homeowner's own worry (a nail in a tyre or a foot), not a lesson, so this version's content check excludes it on purpose. Every other construction word stays banned.
- **How it differs from Protect V1–V9, and why it is better:**
  - V1–V9 explain the system (a comparison slider, cards, a yard map, hanging the wrap, a woven nest, an auto-played sweep, chapters, a job board, a leaflet).
  - 10 takes the single thing a homeowner fears most, sharp bits left in the grass, and lets them clear it with their own hand on a real lawn.
  - It is one idea and one object.
  - V6 also shows a magnet pass, but as one step of four, played automatically on a drawing. Here the visitor holds the magnet, on a photo.
- **Skill ledger, per element:**
  - Title: ⟦S0451⟧ word reveal.
  - The lawn photo: real photography, labelled illustrative.
  - The drawn nails: ⟦S1421⟧ illustration style; a fixed scatter, the same every time.
  - The magnet:
    - ⟦S1443⟧ gesture (a hover-follow with a mouse, a drag on touch);
    - ⟦S1018⟧ draggable with a button alternative;
    - ⟦S1441⟧ a big handle;
    - ⟦S0489⟧ believable motion (a soft lag and tilt as it moves).
  - The nails jumping to the magnet: ⟦S0458⟧ every change of state is visible; ⟦S1440⟧ feedback; ⟦S1438⟧ instant response.
  - The finish: ⟦S0441⟧ choreography (the last nails fly in on a stagger); ⟦S1452⟧ peak-end.
  - "Sweep it for me" and "Scatter them again": ⟦S1107⟧ keyboard; the GATE-BUTTONS text-button style.
  - The result line: ⟦S0409⟧ swap.
  - Get My Roof Checked and Call: GATE-BUTTONS.
  - Reduced motion: ⟦S0400⟧. No lag, tilt or flight; the nails vanish onto the magnet at once.

## What was built
`src/sections/wrap-v10.html` · live as `?wrap=10` (defaults unchanged: `?` still shows Protect V1).

- **Header** (centred): the kicker "Protect Your Nest System", the title **Not a Nail Left**, and one line: "Worried about nails in the lawn after a new roof? So are we. Move the magnet over the grass."
- **The lawn:** a wide real photo (16:7.6 on desktop, 4:4.4 on phone) of a house and its lawn, labelled "Illustrative photo; drawn nails".
  - 24 drawn nails (steel grey with a light halo so they read on grass) lie in a fixed scatter across the lower lawn.
- **The magnet:** a big amber horseshoe with silver tips pointing down. It rests at the side with a "Drag the magnet" chip.
  - With a mouse it follows the pointer over the lawn with a soft lag and tilt; no press is needed.
  - On touch you drag the magnet itself. The magnet is `touch-action: none` and the lawn `pan-y`, so swiping the photo still scrolls the page.
  - Nails within reach of the tips jump up and hang from the two tips, alternating sides, points down.
  - Past 80 % the rest fly in on a 60 ms stagger, a "Lawn swept" tag appears, and the magnet comes to rest in view showing its catch.
- **Under the lawn:**
  - on the left, the status "Move the magnet over the lawn.", which becomes **Not a nail left.** "That’s pass two of our three cleanup passes: the crew clears up, a magnet sweeps the lawn, then the project manager walks it last.";
  - below it, the text button "Sweep it for me", which becomes "Scatter them again";
  - on the right, **Get My Roof Checked** (`#book`) and **Call (651) 977-6027**.
- **"Sweep it for me"** runs the magnet in three rows across the lawn on its own (2.2 s).
- **Reduced motion:** no lag, tilt or flight; nails move onto the magnet at once.

## Five-question self-check (answered from my own screenshots)
**Screenshots** (all in `gates/ladder/NEW-wrap-10/`, taken by `shots10.cjs` with the pointer kept off the lawn between steps):
- untouched: `wrap-v10-1440.jpg`, `-768.jpg` and `-390.jpg`;
- mid-sweep: `wrap-v10-sweeping-*.jpg` (mouse on desktop and tablet; a drag of the magnet on phone);
- swept: `wrap-v10-swept-*.jpg`.

1. **What is it for?** It tells a homeowner that after the roof, their lawn is safe again because we sweep it with a magnet, as part of three cleanup passes.
2. **Do I get it in under 3 seconds?**
   - Desktop: yes. "Not a Nail Left", a lawn with nails in it, and a big magnet saying "Drag the magnet" say it.
   - Phone: yes. The title is followed by the lawn, the nails and the magnet.
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - you hold a big magnet and the nails jump up and cling to it, which is satisfying in a physical, fridge-magnet way;
   - when you've got most, the stragglers fly in by themselves;
   - the magnet ends up wearing its catch.
4. **Is every element there for a reason?**
   - The lawn: your yard.
   - The nails: the fear.
   - The magnet: the fix, in your hand.
   - The hint: discovery.
   - The status, then the result line: what you did, then what it means (pass two of three).
   - "Sweep it for me": the keyboard and no-drag path.
   - Get My Roof Checked and Call: next steps.
   - The label: honesty.

   Complexity without a reason: none found.
5. **Does it fit a stressed homeowner?** Yes.
   - It meets a concrete worry (nails in tyres and feet) with a concrete answer, in one gesture.
   - Nothing to read first.
   - The next steps are visible throughout.

## Scorecard gate
Weights: Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. The WEB-SKILLS tags cited in the plan line's per-element ledger stand as written:

> ⟦S0451⟧, ⟦S1421⟧, ⟦S1443⟧, ⟦S1018⟧, ⟦S1441⟧, ⟦S0489⟧, ⟦S0458⟧, ⟦S1440⟧, ⟦S1438⟧, ⟦S0441⟧, ⟦S1452⟧, ⟦S1107⟧, ⟦S0409⟧, ⟦S0400⟧

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.3 | 3.32 |
| Usability | 30 | 8.6 | 2.58 |
| Creativity | 20 | 8.6 | 1.72 |
| Content | 10 | 8.8 | 0.88 |
| **Total** | **100** | | **8.50** |

Recomputed: 8.3 × 0.40 + 8.6 × 0.30 + 8.6 × 0.20 + 8.8 × 0.10 = 3.32 + 2.58 + 1.72 + 0.88 = **8.50**. Pass: ≥ 7.0, lowest category 8.3 (≥ 6.0), zero vetoes (below).

### Design: 8.3
- **Evidence:**
  - `wrap-v10-swept-1440.jpg`: a clean, wide lawn photo with the magnet holding its catch, and a calm row beneath (result left, buttons right).
  - `wrap-v10-390.jpg`: on phone the title is followed by the lawn with the nails, the magnet and its hint.
  - Light cream, locked palette (an amber magnet, not a stock red one), Inter and the GATE-BUTTONS system.
  - 0 px sideways scroll at 1440, 768 and 390.
- **Loses points for** D1 below: the drawn nails are cartoon-sized against a real lawn photographed from a distance, so they read as symbols rather than real nails.

### Usability: 8.6
- **Evidence (checks.json, 24/24):**
  - 24 nails at the start, with the hint;
  - mouse-follow picks up nails, which hang from the tips, and the hint goes;
  - past 80 % the rest fly in, with the result line;
  - "Scatter them again" resets all 24;
  - keyboard "Sweep it for me" clears the lawn;
  - the lawn is `pan-y` and the magnet `none` (phone scrolling is kept);
  - no count, timer or score in the visible text;
  - controls at least 44 px on desktop and phone;
  - axe 0 violations;
  - no errors;
  - reduced motion is clean.
- **Loses points for** U1 below: with a mouse, crossing the lawn on the way to the buttons moves the magnet and sweeps a little without meaning to.

### Creativity: 8.6
- **Evidence:** a magnet you hold over a real lawn, with nails that jump and hang from its tips, is new across all 10 Protect versions. V6 showed a magnet pass as one auto-played step on a drawing; here it's the visitor's hand on a photo.
- **Loses points for:** V6 already touched the magnet idea; the freshness is that you do it.

### Content: 8.8
- **Evidence:**
  - the three cleanup passes are named exactly as the site's Protect versions already state them (the crew, a magnet sweep, the project manager's walk);
  - "Protect Your Nest System" comes from the lock;
  - no price, "free", "every job" or guarantee claims (checked);
  - no construction words besides the homeowner's own "nail" (checked; the exclusion is deliberate and stated in the plan line);
  - the photo is labelled illustrative and the nails drawn.
- **Loses points for:** the wrap and the aftercare box, the other two parts of the system, are not mentioned. That is by design for one idea, but it leaves the system partly told.

## Checks: `gates/ladder/NEW-wrap-10/checks.json` · **24/24 PASS**
- **Generic checks:**
  - the default view still shows V1;
  - the version count;
  - only V10 is visible;
  - the anchor id;
  - one h2;
  - controls ≥ 44 px;
  - the facts lock;
  - axe 0 violations;
  - no errors;
  - no sideways scroll at 1440, 768 or 390;
  - phone controls ≥ 44 px;
  - reduced motion is clean.
- **Version checks:**
  - the start;
  - mouse pick-up;
  - past 80 % with the result;
  - scatter again;
  - keyboard sweep;
  - touch `pan-y` and `none`;
  - not a game;
  - the label;
  - Protect facts only, with no construction words other than "nail";
  - Get My Roof Checked and the real phone.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots and checks, and fixed
1. **The magnet was upside down.** Its silver tips (the poles) pointed up while nails stuck to the bend. It is flipped so the tips point at the grass, and the caught nails hang from the two tips.
2. **The magnet was too small, and the nails were too faint** on bright grass. The magnet grew from 92 to 124 px (96 on phone), and the nails grew and turned darker steel with a light halo.
3. **After "Sweep it for me" the magnet came to rest half off the lawn.** It now settles in view (82 %, 44 %) showing its catch.
4. **Caught nails piled into one blob.** They now hang from both tips, alternating sides, points down.
5. **A crash in the auto-sweep, caught by the "no errors" check.** The first animation frame can carry a timestamp slightly before the start time, so progress went negative and the path was read at index −1. Progress is now clamped to 0–1.
6. **A test false alarm.** The not-a-game check matched the CSS aspect ratios ("16/7") inside the section's `<style>`; it now reads only visible text (`innerText`).

## Remaining defects (honestly named, not fixed in this gate)
- **D1 · cartoon-sized nails on a real lawn (Design).** Proposed fix: scale the nails by depth (smaller further up the lawn), or use a close-up lawn photo where nails at this size are true to scale.
- **U1 · accidental sweeping with a mouse (Usability).** Proposed fix: with a mouse, follow the pointer only after the magnet has been grabbed once, or only while the pointer moves slowly over the lawn.
- **C1 · two parts of the system go unmentioned (Content).** One idea by design. Another of the new Protect versions can carry the wrap and the aftercare box.

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter and the button system.
- **Invented facts:** none. The three passes are as the site states them; "Protect Your Nest System" comes from the lock; there is no price, time or "every job" claim. The facts-lock check passes.
- **Illustrative photo captioned as an Owl job:** none. It is labelled "Illustrative photo; drawn nails".
- **AI-looking imagery:** none. It is a real photo, and the nails are clearly drawn.
- **Dark background:** none.
- **Teaching roofing:** none. No construction words; the one homeowner word, "nail", is deliberate.
- **Defaults changed:** none. The default view still shows Protect V1 (home-verify 50/50).
- **A second game:** none. No count, timer or score (checked), and the sweep ends by itself. Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: Quiet Cubes
**What transfers**
- **An object you operate:** the magnet is the interface, and one gesture gives an instant, visible result.
- **The result explains itself:** nails cling to the tips, with no instructions beyond "Drag the magnet".
- **Weight and play in the object:** a soft lag and tilt as it follows you.

**What does not transfer, and why**
- **Quiet Cubes' 3D rendering and orbiting camera.** A flat magnet over a real photo is lighter and reads at once.
- **Many configurable options.** One object, one action, by the owner's one-idea rule.
- **Product commerce.** The end is Get My Roof Checked or Call.

## Process statement
- **No sub-agents and no background tasks were used** for Protect 10.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Protect 10 stops here for Muse's judgment. Protect 11 does not start until Muse accepts this gate.
