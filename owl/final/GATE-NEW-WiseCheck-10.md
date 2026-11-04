# GATE-NEW · Wise Check 10 · "We Climb, You See" (first of five new Wise Check versions, homeowner-simple pass)

Wise Check had 9 versions when this pass reached it (the fourth ladder pass paused at 9). The five new versions are therefore 10–14.

## Plan line (written before building)
- **The one homeowner sentence:** *You stay on the ground. We go up, look closely, and show you what we saw.*
- **Primary governing reference:** Apple AirPods Pro: one moment at a time, with one control moving you through it and nothing else to decode.
- **Style family:** a photo window with a ladder leaning against it.
  - The visitor moves Owl up the ladder, and the view climbs with it: from your yard, to our crew on your roof, to the close-up, to the photos in your hand.
  - The photos are real. Only four short lines change.
  - Desktop: words on the left; photo and ladder on the right. Phone: the photo is full width, the ladder stands on its right edge, and the words sit below.
- **Signature move:**
  - The ladder is one vertical slider with four rungs. You can drag the owl, tap a rung, or use the arrow keys.
  - Each rung is a stage. The photo rises: the old view slides down and away, and the new one comes up into place.
  - At the top, the close-up drops into a phone frame marked "Photos and video". That is the fact from Owl's Wise Check: *photo and video documentation, so you see what we saw*.
- **The four rungs** (homeowner words; facts only from `lib/wise-data.js`, nothing about price or timing):
  1. **From your yard.** It's hard to tell what's going on up there. (Photo: a house from the yard; illustrative.)
  2. **We go up.** Our crew does the climbing. You stay on the ground. (Photo: Owl's crew on a roof, a frame from Owl's own film.)
  3. **Up close.** We look over the whole roof, and the attic too. (Photo: a close-up of missing shingles; illustrative.)
  4. **You see it too.** Photos and video of what we found, so you see what we saw. (The close-up inside a phone frame.)
- **Actions:** **Book a Wise Check** (primary, `#book`) and **Call (651) 977-6027**.
- **Honesty line:** "Photos are illustrative, except our crew."
- **How it differs from Wise Check V1–V9, and why it is better:**
  - Every earlier version explains the four parts of the check (dials, a lens, an accordion, questions and answers, a kit, a contact sheet, a route, a file, a notebook). These are the "document blocks" the owner rejected.
  - 10 lists nothing. It shows the one thing a homeowner gets from a Wise Check: someone else climbs, and you see the proof.
  - It is the first Wise Check version built on real photography, and the first where a single physical control (a ladder) moves the story.
- **Skill ledger, per element:**
  - Kicker and title: ⟦S0451⟧ word reveal.
  - Photo window and its stages: ⟦S0458⟧ every change of state is legible (the view rises when you climb and sinks when you go down), ⟦S0441⟧ choreography, ⟦S1436⟧ medium durations (about 600 ms).
  - The ladder slider:
    - ⟦S1018⟧ draggable with alternatives (tap a rung, arrow keys, Home and End);
    - ⟦S1107⟧ keyboard;
    - ⟦S1441⟧ rung targets of at least 44 px;
    - ⟦S1443⟧ gesture;
    - GATE-BUTTONS `.ctl-knob` on the owl thumb.
  - The owl thumb: ⟦S0489⟧ calm, believable settle on each rung.
  - The "Drag me up" hint: ⟦S1440⟧ feedback, shown until the first move.
  - Stage words: ⟦S0409⟧ swap.
  - The phone frame at the top: ⟦S0409⟧ pop-in, ⟦S1452⟧ peak-end (the proof is the peak).
  - "Book a Wise Check" and "Call": GATE-BUTTONS (primary with arrow pass-through; secondary with the phone ring).
  - Reduced motion: ⟦S0400⟧. Stages cross-fade without moving, and the thumb jumps.

## What was built
`src/sections/wise-v10.html` · live as `?wise=10` (defaults unchanged: `?` still shows Wise Check V1).

- **Words side:** the kicker "The Wise Check", the title **We Climb, You See**, and one line: "Move Owl up the ladder. You stay on the ground; we do the climbing and show you what we saw."
  - Below them, the current rung's words ("Rung 1 of 4" · **From your yard** · "It’s hard to tell what’s going on up there.").
  - Then **Book a Wise Check** (`#book`), **Call (651) 977-6027**, and the line "Photos are illustrative, except our crew."
- **Stage:** a rounded photo window with a wooden ladder standing beside it.
  - The owl mark sits on the bottom rung, with a "Drag me up ↑" chip until the first move.
  - The ladder is one `role="slider"` (vertical, values 1–4, a spoken value with the rung's words). Drag the owl, tap a rung, or use the arrow keys, Home and End.
  - Climbing slides the old photo down and away while the new one rises into place; going down reverses it. The rungs below the owl light amber.
- **The four rungs:**
  1. **From your yard:** a house from its yard (illustrative), tagged "From the yard".
  2. **We go up:** one of Owl's crew walking on a roof (a frame from Owl's own film), tagged "Owl’s crew".
  3. **Up close:** missing shingles, close up (illustrative), tagged "Up close". The line says "We look over the whole roof, and the attic too."
  4. **You see it too:** back to the yard (softly blurred), and a phone rises into view showing the close-up with a play button, "Your Wise Check", "Photos and video" and three thumbnails. Tagged "Back in your yard".
- **Reduced motion:** stages cross-fade without moving, the owl jumps, and the hint arrow is still.

## Five-question self-check (answered from my own screenshots)
**Screenshots** (all in `gates/ladder/NEW-wise-10/`):
- rung 1: `wise-v10-1440.jpg`, `-768.jpg` and `-390.jpg`;
- rung 2: `wise-v10-rung2-1440.jpg`, `-768.jpg` and `-390.jpg`;
- rung 4: `wise-v10-rung4-1440.jpg`, `-768.jpg` and `-390.jpg`.

1. **What is it for?** It tells a homeowner that with a Wise Check they stay on the ground, we climb and look closely, and they get photos and video of what we saw.
2. **Do I get it in under 3 seconds?**
   - Desktop: yes. The title "We Climb, You See", a real house, and a ladder with an owl saying "Drag me up" carry it.
   - Phone: yes. The title comes first, with the photo and ladder straight under it.
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - you physically move the owl up a ladder;
   - the view rises with you, from the yard to our crew to the close-up;
   - at the top, the proof arrives on a phone back in your yard.

   The climb *is* the message.
4. **Is every element there for a reason?**
   - The photo window: the place you're looking at.
   - The ladder: the one control, and the metaphor (we climb).
   - The owl: what you move.
   - The hint chip: discovery, and it disappears after the first move.
   - The rung tag: where you are.
   - Rung words: one line each.
   - The phone: the proof you get.
   - Book and Call: next steps.
   - The illustrative line: honesty.

   Complexity without a reason: none found. During the build, the phone's empty lower half was filled with thumbnails, and the same close-up behind the phone was replaced with the blurred yard.
5. **Does it fit a stressed homeowner?** Yes.
   - The first rung says what they already feel ("hard to tell what’s going on up there").
   - The second says the reassuring part (they stay on the ground).
   - The last shows what they get.
   - Book is the primary button and Call is right below, from the first screen.

## Scorecard gate
Weights: Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. The WEB-SKILLS tags cited in the plan line's per-element ledger stand as written:

> ⟦S0451⟧, ⟦S0458⟧, ⟦S0441⟧, ⟦S1436⟧, ⟦S1018⟧, ⟦S1107⟧, ⟦S1441⟧, ⟦S1443⟧, ⟦S0489⟧, ⟦S1440⟧, ⟦S0409⟧, ⟦S1452⟧, ⟦S0400⟧

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.4 | 3.36 |
| Usability | 30 | 8.4 | 2.52 |
| Creativity | 20 | 8.6 | 1.72 |
| Content | 10 | 9.0 | 0.90 |
| **Total** | **100** | | **8.50** |

Recomputed: 8.4 × 0.40 + 8.4 × 0.30 + 8.6 × 0.20 + 9.0 × 0.10 = 3.36 + 2.52 + 1.72 + 0.90 = **8.50**. Pass: ≥ 7.0, lowest category 8.4 (≥ 6.0), zero vetoes (below).

### Design: 8.4
- **Evidence:**
  - `wise-v10-1440.jpg`: two columns, words left and a large real photo with the ladder right. The light cream page, locked palette and Inter, with GATE-BUTTONS buttons.
  - `wise-v10-rung4-390.jpg`: on phone the title leads, the stage follows, and the rung words and buttons sit below.
  - 0 px sideways scroll at 1440, 768 and 390.
  - It is the first Wise Check version built on real photography.
- **Loses points for** two remaining defects (below):
  - D1: the roof changes colour between rung 2 (dark shingles in the crew frame) and rung 3 (brown close-up), so the "same roof" story has a visible seam;
  - D2: at tablet width (768) the photo is very large and the buttons stretch the full width.

### Usability: 8.4
- **Evidence (checks.json, 25/25):**
  - a real vertical slider (role, orientation, spoken rung text);
  - Arrow Up climbs, with the view mid-rise;
  - End and Home jump; Arrow Down at the bottom stays put;
  - dragging the owl settles on the nearest rung;
  - tapping a rung jumps to it;
  - the hint goes after the first move;
  - controls at least 44 px on desktop and phone;
  - axe WCAG 2.1 A/AA, 0 violations;
  - reduced motion is clean.
- **Loses points for:**
  - U1: the story only appears if the visitor moves the owl. Someone who goes straight to "Book" sees only rung 1 (acceptable, because the title and lede still say the whole idea);
  - U2: vertical dragging on a phone competes with page scrolling. `touch-action:none` on the ladder keeps the drag, but a scroll that starts on the ladder will move the owl instead of the page.

### Creativity: 8.6
- **Evidence:**
  - a ladder as the control turns "we do the climbing" into something the visitor does with a finger;
  - the ending returns to the yard with the proof in hand, which closes the story (`wise-v10-rung4-1440.jpg`).
- **Loses points for:** at heart it is a four-step stepper; the freshness is in the metaphor and the photo rise.

### Content: 9.0
- **Evidence:**
  - every claim comes from `lib/wise-data.js` (attic inspection; photo and video documentation, "so you see what we saw");
  - no price, "free" or timing (checked);
  - no construction words (checked);
  - homeowner words throughout;
  - illustrative photos are labelled, and the crew frame is genuinely Owl's.
- **Loses points for:** "we look over the whole roof" is a fair summary of "roof evaluation", but it is broader wording than the source.

## Checks: `gates/ladder/NEW-wise-10/checks.json` · **25/25 PASS**
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
  - the ground start;
  - Arrow Up mid-rise;
  - rung 2, the crew, and the hint gone;
  - End to rung 4 with the phone;
  - Home and the bottom limit;
  - drag to the top;
  - tap a rung;
  - Wise Check facts only, with no price, free or timing;
  - the illustrative label;
  - no construction words;
  - Book and the real phone.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots, and fixed
1. **Nested controls.** The rungs were buttons inside the slider (axe "nested-interactive"). They are now decoration, and the slider's own pointer handling makes a tap on a rung go to it.
2. **Phone order.** The photo came before the title. The words column now dissolves on narrow screens (`display:contents`), so the order is title, stage, rung words, buttons.
3. **Desktop title.** It left "See" alone on its own line; balanced wrapping fixes that.
4. **Rung 4 repeated the close-up.** The same picture showed behind the phone and in it. Rung 4 now returns to the yard, softly blurred, and its tag reads "Back in your yard" (this also removed the word "sent").
5. **The phone's empty lower half** now holds three thumbnails.
6. **Caption cut off on phone.** "Photos and video" was hidden behind the thumbnails in the small phone frame; that small line is hidden on phones, and the rung words below say it in full.

## Remaining defects (honestly named, not fixed in this gate)
- **D1 · roof colour seam (Design).** Rung 2's crew frame shows dark shingles, and rungs 1 and 3 are brown. No Owl photo on the branch shows the same roof from the yard, the ladder and close up. Proposed fix: an image set from one real Owl job (needs owner photos), or a warm grade on the crew frame.
- **D2 · tablet scale (Design).** At 768 the photo is about 550 px tall and the buttons span the full width. Proposed fix: cap the stage at 560 px and the buttons at 420 px between 641 and 860 px.
- **U1 · the story needs a move (Usability).** Proposed fix: a one-time gentle auto-climb from rung 1 to rung 2 when the section first comes into view (skipped under reduced motion).
- **U2 · drag versus scroll on phones (Usability).** Proposed fix: let a drag start only on the owl itself, and let the rest of the ladder accept taps only, so page scrolling keeps working over the ladder.

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter, owl mark and button system.
- **Invented facts:** none. Wise Check content comes only from `lib/wise-data.js`; no price or timing; only (651) 977-6027. The facts-lock check passes.
- **Illustrative photos captioned as Owl jobs:** none. The house and close-up are labelled illustrative. The crew frame is Owl's own and is tagged only "Owl’s crew".
- **AI-looking imagery:** none. All photographs are real.
- **Dark background:** none.
- **Teaching roofing:** none. No construction words (checked), and nothing explains how a roof works.
- **Defaults changed:** none. The default view still shows Wise Check V1 (home-verify 50/50).
- **A second game:** none. Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: Apple AirPods Pro
**What transfers**
- **One moment at a time:** each rung owns the whole stage, one photo and one short line, with nothing else to decode.
- **A single control moves you through the story.** Apple's product pages walk feature by feature; here you climb rung by rung.
- **Motion that explains the change:** Apple moves the product into its next state; here the view rises with you as you climb and sinks as you come down.

**What does not transfer, and why**
- **Scroll-pinned sequences and large-scale scroll scrubbing.** The climb belongs to the visitor's finger, not to page scroll, so a worried homeowner is never trapped in a pinned section.
- **Apple's black stages and product renders.** Owl stays on light cream with real photos.
- **Technical feature copy ("adaptive", "chip").** The words are a homeowner's, and nothing explains how a roof or the check works inside.
- **Apple's restraint about the call to action.** Owl keeps Book and Call visible from the first screen, because this audience needs the next step at once.

## Process statement
- **No sub-agents and no background tasks were used** for Wise Check 10.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Wise Check 10 stops here for Muse's judgment. Wise Check 11 does not start until Muse accepts this gate.
