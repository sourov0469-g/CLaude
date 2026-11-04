# GATE-NEW · Wise Check 12 · "What's Bugging You?" (third of five new Wise Check versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Whatever's worrying you about your roof, a Wise Check answers it.*
- **Primary governing reference:** Cowboy: family-fronted warmth, everyday plain words, one useful action.
- **Style family:** a light stage with a simple line-drawn house at the bottom, and four thought bubbles floating up from it. Each bubble holds one worry in the homeowner's own words.
  - Tap a bubble and it pops; Owl's answer appears in a fixed slot under the stage, and the bubble shrinks to a small amber "answered" chip in its place.
  - When all four are answered, the house gets an amber check badge.
  - No list, no cards, no explanation of the check itself.
- **The four worries and their answers.** The worries are homeowner words; the answers are the four `cases` in `lib/wise-data.js`, with one rewrite:
  1. "Did the storm get us?" → *After a storm:* "Hail and wind leave marks that are easy to miss from the ground."
  2. "Where’s that stain coming from?" → *A leak or a stain:* "Water travels before it shows, so we look above the stain as well as at it."
  3. "How long has it got left?" → *An older roof:* "We look it over closely and tell you straight where it stands." The data's line for this case names construction parts (granules, flashing), which the owner's no-teaching rule bans, so it is rewritten in plain words that stay within the data's meaning.
  4. "Is it OK up there?" → *Just checking:* "A careful look now gives you a clear picture of where your roof stands."

  Every answer ends with the same plain promise: "A Wise Check finds out, and shows you photos and video."
- **Actions:** **Book a Wise Check** (primary, `#book`) and **Call (651) 977-6027**, always visible.
- **How it differs from Wise Check V1–V11, and why it is better:**
  - V1–V9 explain the check's parts. V3 lists the same four reasons as an accordion, which is a document block.
  - V10 is a ladder climb and V11 a fog wipe.
  - 12 starts from the homeowner's own worry, in their words, floating out of their house. Popping it is a small relief, and the answer is one line.
  - It reuses V3's facts but turns a list you read into worries you dismiss.
  - Layout: a floating field of bubbles over a drawn house, unlike every earlier Wise Check version.
- **Skill ledger, per element:**
  - Title: ⟦S0451⟧ word reveal.
  - The drawn house: ⟦S0407⟧ draw-on when first seen; ⟦S1421⟧ illustration style (the site's line language).
  - The floating bubbles: ⟦S0489⟧ calm, believable motion (slow bob, each with its own period); ⟦S1441⟧ big targets; ⟦S1107⟧ keyboard (real buttons, in reading order).
  - The pop: ⟦S0405⟧ micro-interaction (swell, burst into specks, shrink to a chip); ⟦S1440⟧ feedback.
  - The answered chip: ⟦S0458⟧ the state stays visible; tap it to read its answer again.
  - The answer slot and the count: ⟦S0409⟧ swap; ⟦S1457⟧ progress ("2 of 4 answered").
  - The check badge on the house: ⟦S1452⟧ peak-end.
  - Book and Call: GATE-BUTTONS (primary with arrow pass-through; secondary with the phone ring).
  - Reduced motion: ⟦S0400⟧. No bobbing and no specks; bubbles turn into chips at once.

## What was built
`src/sections/wise-v12.html` · live as `?wise=12` (defaults unchanged: `?` still shows Wise Check V1).

- **Header** (centred): the kicker "The Wise Check", the title **What’s Bugging You?**, and one line: "Tap a worry. Owl will answer it, and a Wise Check will look into it."
- **The stage:** a soft cream panel. A line-drawn house (ink walls, amber roof) draws itself on at the bottom when first seen.
  - Four thought bubbles, real `<button>`s each with a little two-dot tail towards the house, float above it with a slow bob, each on its own rhythm: "Did the storm get us?", "Where’s that stain coming from?", "How long has it got left?" and "Is it OK up there?".
- **Popping:** a tap (or Enter or Space) swells the bubble, bursts it into amber and ink specks, and shrinks it to an amber chip with a check and the case name ("After a storm", "A leak or a stain", "An older roof", "Just checking"). The chip stays in place.
  - Tapping a chip shows its answer again; it is not counted twice. The current one has an ink ring.
- **The answer slot** (left, under the stage): "N of 4 answered", the case name, Owl's one-line answer, and "A Wise Check finds out, and shows you photos and video."
- **All four answered:** an amber check badge pops onto the house, and the line reads "All four answered. That’s what a Wise Check is for: we look into each one and show you photos and video."
- **Actions** (right): **Book a Wise Check** (`#book`) and **Call (651) 977-6027**, always visible.
- **Layouts:**
  - Desktop: bubbles at the four corners around the house.
  - Up to 860 px: a taller stage with the bubbles in two staggered columns.
  - Phone: the same staggered columns, with the house at half the width.
- **Reduced motion:** no bob, no specks and no draw-on; bubbles become chips at once.

## Five-question self-check (answered from my own screenshots)
**Screenshots** (all in `gates/ladder/NEW-wise-12/`):
- untouched: `wise-v12-1440.jpg`, `-768.jpg` and `-390.jpg`;
- two answered: `wise-v12-two-*.jpg`;
- all four answered: `wise-v12-all-*.jpg`.

**Fit at every width:** `fit12.txt` (from `fit12.cjs`). At 1440, 1024, 860, 768, 641, 390 and 360, no bubble leaves the stage, overlaps another or covers the house.

1. **What is it for?** It tells a homeowner that whatever's worrying them about their roof, a Wise Check answers it.
2. **Do I get it in under 3 seconds?**
   - Desktop: yes. "What’s Bugging You?" and four worries floating out of a house, in the homeowner's own words, say it.
   - Phone: yes. The title and two bubbles are on the first screen.
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - the worries float up out of your house like thoughts;
   - tapping one pops it with a little burst, a small physical relief;
   - when the last one goes, the house gets its check.

   Popping a worry is the feeling the service sells.
4. **Is every element there for a reason?**
   - The house: whose worries these are.
   - The bubbles: the worries, in your words.
   - The pop and the chip: done, and you can see what's done.
   - The answer slot: Owl's one line.
   - The count: how many are left.
   - The badge: the end.
   - Book and Call: next steps.

   Complexity without a reason: none found.
5. **Does it fit a stressed homeowner?** Yes.
   - It starts with their worry, not with our checklist.
   - Each answer is one calm line.
   - Book and Call are visible the whole time, and nothing has to be completed first.

## Scorecard gate
Weights: Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. The WEB-SKILLS tags cited in the plan line's per-element ledger stand as written:

> ⟦S0451⟧, ⟦S0407⟧, ⟦S1421⟧, ⟦S0489⟧, ⟦S1441⟧, ⟦S1107⟧, ⟦S0405⟧, ⟦S1440⟧, ⟦S0458⟧, ⟦S0409⟧, ⟦S1457⟧, ⟦S1452⟧, ⟦S0400⟧

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.2 | 3.28 |
| Usability | 30 | 8.6 | 2.58 |
| Creativity | 20 | 8.4 | 1.68 |
| Content | 10 | 8.8 | 0.88 |
| **Total** | **100** | | **8.42** |

Recomputed: 8.2 × 0.40 + 8.6 × 0.30 + 8.4 × 0.20 + 8.8 × 0.10 = 3.28 + 2.58 + 1.68 + 0.88 = **8.42**. Pass: ≥ 7.0, lowest category 8.2 (≥ 6.0), zero vetoes (below).

### Design: 8.2
- **Evidence:**
  - `wise-v12-1440.jpg`: a calm, centred stage with four bubbles framing a drawn house, then the answer and buttons row.
  - `wise-v12-all-1440.jpg`: four amber chips and the check badge read as "done" at a glance.
  - Light cream, locked palette, Inter and the GATE-BUTTONS system.
  - 0 px sideways scroll at 1440, 768 and 390; bubbles fit at seven widths (`fit12.txt`).
- **Loses points for** D1 below: the drawn house is very plain and the stage has a lot of empty cream on desktop. It is calm, but the least rich visual of the three new Wise Check versions.

### Usability: 8.6
- **Evidence (checks.json, 24/24):**
  - four worries as real buttons with spoken names;
  - the house draws on;
  - the pop bursts into specks;
  - each answer appears with the count;
  - keyboard Enter works;
  - re-reading a chip doesn't count twice;
  - all four answered brings the badge and the closing line;
  - controls at least 44 px on desktop and phone;
  - axe 0 violations;
  - reduced motion is clean.
- **Loses points for** U1 below: the bubbles never stop bobbing (about 12 px), which makes them slightly harder to aim at for anyone with a shaky hand.

### Creativity: 8.4
- **Evidence:** worries drawn as thought bubbles rising from your house, which you pop away, are new across all 12 Wise Check versions. They turn V3's list of the same four reasons into something you do.
- **Loses points for:** thought bubbles are a familiar comic motif; the freshness is in popping them.

### Content: 8.8
- **Evidence:**
  - three answers are verbatim from `lib/wise-data.js` (after a storm, a leak or a stain, just checking);
  - the promise line comes from the same file (photo and video documentation);
  - no price, "free" or timing (checked);
  - no construction words (checked);
  - every worry is a homeowner's own question.
- **Loses points for** C1 below: the "older roof" answer is my plain rewrite, not Owl's published wording.

## Checks: `gates/ladder/NEW-wise-12/checks.json` · **24/24 PASS**
- **Generic checks:**
  - the default view still shows V1;
  - the version count;
  - only V12 is visible;
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
  - four floating worry buttons;
  - the house draws on;
  - the pop bursts into specks;
  - the first answer, with the chip, promise and count;
  - keyboard Enter on the older-roof worry;
  - re-reading a chip doesn't count twice;
  - all four answered, with the badge and the closing line;
  - facts from `wise-data` only;
  - no construction words;
  - Book and the real phone.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots, and fixed
1. **Bubbles squeezed to one word per line on phone.** An absolutely positioned box at `left: 73%` sizes itself to the 27 % of width left beside it. The bubbles now size to their content (`width: max-content`) with their own cap.
2. **Phone and tablet positions never applied.** The script set the position variable inline, which beats any media-query rule, so phones were using desktop positions, and at 768 a bubble overflowed the stage. Each layout now has its own variables (`--dx/--dy`, `--px/--py`), chosen in CSS. Measured clean at seven widths (`fit12.txt`).
3. **The check badge sat on the chimney.** It now sits above the roof peak.
4. **The lede left "into it." alone.** Balanced wrapping fixes it.
5. **Test tooling.** Playwright waits for an element to stop moving before clicking, and the bobbing bubbles never do. The bubble clicks in the test are forced (a real visitor can tap a gently moving bubble). This is noted as U1 below.

## Remaining defects (honestly named, not fixed in this gate)
- **D1 · plain house, empty stage (Design).** Proposed fix: a little more life in the drawing (a lit window, a curl of smoke from the chimney, the owl perched on the roof once all four are answered) without adding anything to read.
- **U1 · moving targets (Usability).** Proposed fix: pause a bubble's bob while it is hovered or focused, and bob less on touch screens.
- **C1 · one answer is not Owl's wording (Content).** The older-roof line is a plain rewrite, because the source sentence names construction parts the owner's rule bans. Proposed fix: the owner supplies a plain sentence of their own for that case.

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter and the button system.
- **Invented facts:** none. Three answers are verbatim from `lib/wise-data.js`, the fourth is a plain rewrite within its meaning, and there is no price or timing; only (651) 977-6027. The facts-lock check passes.
- **Photos:** none are used, so there is nothing to caption.
- **Dark background:** none.
- **Teaching roofing:** none. No construction words (checked).
- **Defaults changed:** none. The default view still shows Wise Check V1 (home-verify 50/50).
- **A second game:** none. No score, timer or goal beyond reading four answers. Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: Cowboy
**What transfers**
- **Warmth from everyday words.** Cowboy talks like a person ("ride", "easy"); here the worries are exactly what a homeowner says at the kitchen table.
- **One useful action, never buried.** Cowboy keeps its main action in reach; Book and Call never leave the screen here.
- **Friendly, rounded shapes and a light touch of play** that never gets in the way of the action.

**What does not transfer, and why**
- **Cowboy's lifestyle photography and city-commuter world.** A drawn house keeps the focus on the homeowner's own worries; the earlier Wise Check versions carry the photos.
- **Cowboy's bold dark sections and product close-ups.** Owl stays on light cream.
- **Feature and spec blocks (range, motor, app).** The owner's rule bans document blocks, and there is no spec to sell here.
- **E-commerce paths (configure, finance, buy).** The end is Book or Call.

## Process statement
- **No sub-agents and no background tasks were used** for Wise Check 12.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Wise Check 12 stops here for Muse's judgment. Wise Check 13 does not start until Muse accepts this gate.
