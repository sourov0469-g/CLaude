# GATE-NEW · Wise Check 14 · "Knock Knock" (fifth of five new Wise Check versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *When you book a Wise Check, it's us who knock on your door: family-owned, and careful.*
- **Primary governing reference:** MERSI split cover: one cover, two sides, and the turn is the story. Here the cover is your front door.
- **Style family:** a warm, drawn front door in a cream wall with a white frame, a porch light, an owl-shaped knocker and a peephole. It sits beside a short column of words.
  - Knock, and the door knocks twice, the porch light glows, and the door swings open on its hinge. In the doorway is a real photo of Owl's co-founder Noah Bergland on a ladder at a roof edge.
  - The words answer: "Hoo’s there? It’s Owl."
  - Desktop: the door on the left and the words on the right (mirrored from Wise Check 10's photo-right layout). Phone: title, door, words, buttons.
- **Signature move:**
  - The door is one big button ("Knock on the door").
  - Pressing it plays a two-beat knock (a shake, and two "Knock" marks pop up beside it), lights the porch lamp, then swings the door open in 3D.
  - Press again to close it.
- **Words** (facts only from the lock, plus the Wise Check facts in `lib/wise-data.js`):
  - Before: "Knock on the door."
  - After: **Hoo’s there? It’s Owl.** "Family-owned, founded by Tim Brown and Noah Bergland. For a Wise Check we take a careful look at your roof and attic, and show you photos and video of what we saw."
  - Photo tag: "Noah Bergland, co-founder" (the same wording as the site's family section).
- **Actions:** **Book a Wise Check** (primary, `#book`) and **Call (651) 977-6027**, always visible.
- **How it differs from Wise Check V1–V13, and why it is better:**
  - V1–V9 explain the parts of the check. V10–V13 show the benefit (a climb, a clear view, answered worries) or the next step (a day).
  - None of them answers the worry a homeowner has before letting anyone on their roof: who is coming to my house? 14 answers it with a real face from the family that founded Owl.
  - It is the only Wise Check version built on a real Owl person, not illustrative photos or drawings.
  - Layout: a door that opens, unlike any earlier version.
- **Skill ledger, per element:**
  - Title: ⟦S0451⟧ word reveal.
  - The drawn door and the wall: ⟦S1421⟧ illustration style (the site's warm line language); ⟦S0442⟧ beautiful shadows (the door's depth and its shadow as it opens).
  - The knock: ⟦S0405⟧ micro-interaction (a two-beat shake, and "Knock" marks pop); ⟦S1440⟧ feedback (the porch light glows).
  - The swing open: ⟦S0458⟧ the change of state is legible (a 3D hinge swing with perspective); ⟦S1436⟧ medium duration (about 900 ms).
  - The real photo in the doorway: ⟦S1445⟧ interfaces that feel (trust through a real face); ⟦S1312⟧ reference grammar, never its signature.
  - The answer words: ⟦S0409⟧ swap; ⟦S1452⟧ peak-end.
  - The door button: ⟦S1107⟧ keyboard (a real `<button>` with `aria-expanded`); ⟦S1441⟧ a huge target.
  - Book and Call: GATE-BUTTONS (primary with arrow pass-through; secondary with the phone ring).
  - Reduced motion: ⟦S0400⟧. No shake and no swing; the door fades to open, and the light simply turns on.

## What was built
`src/sections/wise-v14.html` · live as `?wise=14` (defaults unchanged: `?` still shows Wise Check V1).

- **The door scene** (left on desktop): a cream clapboard wall with a "Your door" plaque, a porch lamp and a stone step.
  - The doorway has a white frame. Inside it is a drawn wooden door: raised panels, a peephole, an owl knocker, a brass knob, and a "Knock" chip.
  - The whole door is one `<button>` ("Knock on the door", `aria-expanded="false"`).
- **Knocking:**
  - the door shakes in two beats (0.62 s);
  - "Knock" and "knock!" marks pop up beside it;
  - the porch lamp lights, with a warm glow on the wall;
  - then the door swings open on its left hinge in 3D (`rotateY(-104deg)`, 0.9 s, with a cast shadow).
- **Behind the door:** the real photo of Noah Bergland on a ladder at a roof edge (the site's own photo and caption), with the tag "Noah Bergland · Co-founder".
- **The words** (right): **Knock Knock** and "Wondering who’ll turn up for your Wise Check? Knock on the door."
  - The status "Knock on the door. ←" (the arrow turns to ↑ on stacked layouts) becomes **Hoo’s there? It’s Owl.**
  - Then: "Family-owned, founded by Tim Brown and Noah Bergland. For a Wise Check we take a careful look at your roof and attic, and show you photos and video of what we saw."
  - Then **Book a Wise Check** (`#book`) and **Call (651) 977-6027**.
- **Closing:** pressing the door again closes it and turns the lamp off. Its label is "Close the door".
- **Phone:** title, door scene, words, buttons.
- **Reduced motion:** no shake or swing; the door fades to open and the lamp simply comes on.

## Five-question self-check (answered from my own screenshots)
**Screenshots** (all in `gates/ladder/NEW-wise-14/`):
- shut: `wise-v14-1440.jpg`, `-768.jpg` and `-390.jpg`;
- the knock moment: `wise-v14-knock-1440.jpg` and `-390.jpg` (viewport capture by `knock14.cjs`, because a full-page capture outlasts the 0.76 s knock);
- open: `wise-v14-open-1440.jpg`, `-768.jpg` and `-390.jpg`.

1. **What is it for?** It tells a homeowner that the people who come for a Wise Check are Owl, a family-owned company, and shows them a real face.
2. **Do I get it in under 3 seconds?**
   - Desktop: yes. "Knock Knock", a front door with "Knock" on it, and "Wondering who’ll turn up?" say it.
   - Phone: yes. The title is followed by the door.
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - you knock on a door and it knocks back, twice, with the porch light coming on;
   - the door swings open on a real person;
   - Owl's own pun answers ("Hoo’s there?").

   It is the most human moment of the five new Wise Check versions.
4. **Is every element there for a reason?**
   - The door: the one control, and the metaphor (who comes to your door).
   - The knock and the lamp: feedback that someone is coming.
   - The photo and its tag: who it is.
   - The words: the family and what the check gives you.
   - Book and Call: next steps.
   - The plaque: makes it *your* door.

   Complexity without a reason: none found.
5. **Does it fit a stressed homeowner?** Yes.
   - It answers the trust question ("who's coming to my house?") with a real, smiling person and the family's name.
   - One press.
   - Book and Call are visible before and after.

## Scorecard gate
Weights: Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. The WEB-SKILLS tags cited in the plan line's per-element ledger stand as written:

> ⟦S0451⟧, ⟦S1421⟧, ⟦S0442⟧, ⟦S0405⟧, ⟦S1440⟧, ⟦S0458⟧, ⟦S1436⟧, ⟦S1445⟧, ⟦S1312⟧, ⟦S0409⟧, ⟦S1452⟧, ⟦S1107⟧, ⟦S1441⟧, ⟦S0400⟧

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.3 | 3.32 |
| Usability | 30 | 8.8 | 2.64 |
| Creativity | 20 | 8.8 | 1.76 |
| Content | 10 | 8.6 | 0.86 |
| **Total** | **100** | | **8.58** |

Recomputed: 8.3 × 0.40 + 8.8 × 0.30 + 8.8 × 0.20 + 8.6 × 0.10 = 3.32 + 2.64 + 1.76 + 0.86 = **8.58**. Pass: ≥ 7.0, lowest category 8.3 (≥ 6.0), zero vetoes (below).

### Design: 8.3
- **Evidence:**
  - `wise-v14-open-1440.jpg`: the door swung open with its shadow, the warm lamp glow on the wall, and the real photo framed in the doorway beside a calm column of words.
  - `wise-v14-open-390.jpg`: phone order is title, scene, words, buttons.
  - Light cream, locked palette, Inter and the GATE-BUTTONS system.
  - 0 px sideways scroll at 1440, 768 and 390.
- **Loses points for** two remaining defects (below):
  - D1: the owl knocker reads more like a cat at this size;
  - D2: the flat, drawn door sits next to a real photo, and the two styles meet a little abruptly.

### Usability: 8.8
- **Evidence (checks.json, 24/24):**
  - one big real button with `aria-expanded`;
  - the photo is hidden from screen readers until the door opens;
  - the knock shows the shake, the marks and the light, with the door still shut;
  - then the hinge swing;
  - the photo, the tag and the words appear;
  - the label becomes "Close the door";
  - closing turns the light off;
  - keyboard Enter knocks and opens;
  - controls at least 44 px on desktop and phone;
  - axe 0 violations;
  - reduced motion is clean.
- **Loses points for:** nothing significant beyond the 0.76 s wait between knock and open, which is part of the joke and is skipped under reduced motion.

### Creativity: 8.8
- **Evidence:**
  - a front door you knock on, which knocks back and opens on a real Owl co-founder, is new across all 14 Wise Check versions and answers the one question none of the others did;
  - Owl's pun ("Hoo’s there?") lands at the peak.
- **Loses points for:** door and curtain reveals exist on the web; the freshness is in the knock, the lamp and who is behind the door.

### Content: 8.6
- **Evidence:**
  - "Family-owned, founded by Tim Brown and Noah Bergland" is word for word from the facts lock;
  - the Wise Check line comes from `lib/wise-data.js` (roof evaluation, attic inspection, photo and video documentation);
  - the photo and its caption are the site's own ("Noah Bergland on a ladder at a roof edge");
  - no price or timing (checked);
  - no construction words (checked).
- **Loses points for** C1 below: showing a co-founder behind *your* door could be read as a promise that he personally comes to every Wise Check, which is not a locked fact.

## Checks: `gates/ladder/NEW-wise-14/checks.json` · **24/24 PASS**
- **Generic checks:**
  - the default view still shows V1;
  - the version count;
  - only V14 is visible;
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
  - the shut start;
  - the knock moment;
  - the hinge swing;
  - who is behind the door;
  - "Close the door";
  - close;
  - keyboard Enter;
  - facts only from the lock;
  - no construction words;
  - Book and the real phone.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots, and fixed
1. **The "Your door" plaque was half hidden** behind the door frame. It is now a centred plaque above the door.
2. **The photo tag wrapped badly on phone** ("Noah Bergland, co-" / "founder"). It now reads as two intended lines: **Noah Bergland**, then "Co-founder".
3. **The porch lamp touched the door frame on phone.** It has moved out.
4. **The direction arrow** ("Knock on the door ←") pointed sideways on stacked layouts, where the door is above. It turns to point up at 860 px and below.
5. **Evidence tooling.** The knock moment can't be caught by a full-page capture, which outlasts it, so `knock14.cjs` takes a viewport shot 330 ms after the knock. `sec-shots.cjs` gained an optional `PREWAIT` (the default of 1200 ms is unchanged) so the open-state shots show the finished state.

## Remaining defects (honestly named, not fixed in this gate)
- **D1 · the owl knocker reads as a cat (Design).** Proposed fix: use the site's own owl mark (the same shape as the logo and the cursor companion) in brass for the knocker.
- **D2 · drawn door next to a real photo (Design).** Proposed fix: add a little wood grain and a soft bevel to the door, and a matching warm grade on the photo, so the two read as one scene.
- **C1 · who actually comes (Content).** The scene could imply a co-founder visits every Wise Check. Proposed fix: either the owner confirms that is true, or the tag reads "Noah Bergland, co-founder · the Owl team" and the line says "It’s the Owl team."

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter and the button system.
- **Invented facts or captions:** none. The founders come from the lock; the photo and its caption are the site's own; the Wise Check wording comes from `wise-data`; only (651) 977-6027. The facts-lock check passes.
- **Illustrative photo captioned as an Owl job:** none. The only photo is a real Owl co-founder, named as the site already names him, with no job claim.
- **AI-looking imagery:** none.
- **Dark background:** none. The doorway shows the photo, and the page stays light cream.
- **Teaching roofing:** none. No construction words (checked).
- **Defaults changed:** none. The default view still shows Wise Check V1 (home-verify 50/50).
- **A second game:** none. Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: MERSI split cover
**What transfers**
- **One cover, two sides, and the turn is the story.** The shut door is the cover, the swing is the turn, and the person behind it is the reveal.
- **A 3D hinge turn with perspective and a cast shadow,** so the turn reads as physical.
- **The two sides carry different moods:** a warm drawn door, then a real person.

**What does not transfer, and why**
- **MERSI's multi-chapter book of covers.** There is one door and one reveal, because the owner's rule is one idea.
- **MERSI's editorial typography and full-bleed imagery.** Owl keeps Inter, the cream wall and a framed photo.
- **Scroll-driven page turns.** The door turns only when the visitor knocks.
- **Dark, moody cover art.** Owl stays light.

## Process statement
- **No sub-agents and no background tasks were used** for Wise Check 14.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Wise Check 14 completes the five new Wise Check versions (10–14). Work stops here for Muse's judgment. Protect +5 does not start until Muse accepts this gate.
