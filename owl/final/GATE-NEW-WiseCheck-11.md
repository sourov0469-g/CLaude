# GATE-NEW · Wise Check 11 · "Clear It Up" (second of five new Wise Check versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Not sure how your roof is doing? A Wise Check gives you a clear picture.*
- **Primary governing reference:** Quiet Cubes: an object you operate, where one gesture gives an instant, visible result.
- **Style family:** one wide window over a real photo of a house, fogged over, centred under a short title. Nothing beside it.
  - Wipe the fog off with a finger or mouse, and the house comes clear.
  - When most of the window is clear, the last of the fog lifts and one line says what a Wise Check gives you.
- **Signature move:**
  - The fog is a canvas painted with a soft, washed-out copy of the same photo. Wiping erases it under a soft round brush.
  - With a mouse, just moving over the window wipes it.
  - On touch screens, sideways strokes wipe and up-and-down swipes still scroll the page (`touch-action: pan-y`). This answers Wise Check 10's drag-versus-scroll defect.
  - When the section first comes into view, one short automatic wipe stroke runs across the middle, so the visitor sees what to do. This answers Wise Check 10's "the story needs a move" defect.
  - Past about 55 % clear, the fog fades away.
  - "Clear it for me" does the same for keyboard and screen-reader users, or anyone who doesn't want to wipe. "Fog it up again" replays.
- **Words** (facts only from `lib/wise-data.js`; nothing on price or timing):
  - Before: "Most roofs look fine from the ground. Wipe the window." Status: "Wipe the window with your finger or mouse."
  - After: **Now you can see it.** "A careful look gives you a clear picture of where your roof stands: we check the roof and the attic, and show you photos and video of what we saw."
- **Actions:** **Book a Wise Check** (primary, `#book`) and **Call (651) 977-6027**, always visible. The label "Illustrative photo."
- **How it differs from Wise Check V1–V10, and why it is better:**
  - V1–V9 explain the parts of the check. V10 is a four-step climb.
  - 11 has no steps at all: one gesture, one reveal, one sentence. It is the simplest possible way to say the benefit, which is knowing where your roof stands.
  - Layout: a single centred, full-width window with the title above. It is unlike V10's two columns with a ladder, and unlike the cards, dials and pages of V1–V9.
- **Skill ledger, per element:**
  - Title: ⟦S0451⟧ word reveal.
  - The fogged window: ⟦S0454⟧ progressive blur (the fog is a soft, low-detail copy of the photo under a cream wash).
  - Wiping: ⟦S1443⟧ gesture (sideways wipe on touch, hover-wipe with a mouse), ⟦S1440⟧ feedback (the photo appears under your finger), ⟦S1438⟧ instant response.
  - The demo stroke: ⟦S0441⟧ choreography, one stroke, once.
  - The fog lifting at about 55 %: ⟦S0458⟧ the change of state is visible.
  - "Clear it for me" and "Fog it up again": ⟦S1018⟧ a non-drag alternative, ⟦S1107⟧ keyboard, GATE-BUTTONS text-button style.
  - The status line and the "Now you can see it" line: ⟦S0409⟧ swap, ⟦S1452⟧ peak-end.
  - Book and Call: GATE-BUTTONS (primary with arrow pass-through; secondary with the phone ring).
  - Reduced motion: ⟦S0400⟧. No demo stroke, and the fog lifts at once.

## What was built
`src/sections/wise-v11.html` · live as `?wise=11` (defaults unchanged: `?` still shows Wise Check V1).

- **Header** (centred): the kicker "The Wise Check", the title **Clear It Up**, and one line: "Most roofs look fine from the ground. Wipe the window and see what a Wise Check gives you."
- **The window:** a wide, rounded pane (16:7 on desktop, 4:4.6 on phone) over a real photo of a house.
  - A canvas covers it with fog: the same photo drawn tiny and scaled up (a soft blur that also works in browsers without canvas filters), a cream wash, and a fixed scatter of condensation beads.
  - A "Wipe here" chip with a hand sits in the middle.
  - Wiping erases the fog under a soft round brush (radius about 5.5 % of the width). With a mouse, moving over the pane wipes; on touch, sideways strokes wipe (`touch-action: pan-y`, so up-and-down swipes still scroll the page).
  - Coverage is counted on a 40 × 20 grid. Past 55 %, the rest of the fog fades over 0.9 s, a "Clear view" tag drops in, and the message swaps.
- **Demo stroke:** when the pane first comes into view (and nobody has touched it), one S-shaped stroke wipes across the middle in 1.1 s.
- **Under the window:**
  - on the left, the status "Wipe the window with your finger or mouse.", which becomes **Now you can see it.** "A careful look gives you a clear picture of where your roof stands: we check the roof and the attic, and show you photos and video of what we saw.";
  - below it, the text button "Clear it for me", which becomes "Fog it up again";
  - on the right, **Book a Wise Check** (`#book`) and **Call (651) 977-6027**.
- **Accessibility:** the pane is `role="img"` with a spoken description, and the canvas is hidden from screen readers. "Clear it for me" gives the same result from the keyboard.
- **Reduced motion:** no demo stroke, the fog lifts at once, and the hint hand is still.

## Five-question self-check (answered from my own screenshots)
**Screenshots** (all in `gates/ladder/NEW-wise-11/`, taken by `shots11.cjs` with the pointer kept off the window):
- untouched, after the demo stroke: `wise-v11-1440.jpg`, `-768.jpg` and `-390.jpg`;
- mid-wipe: `wise-v11-wiping-*.jpg`;
- cleared: `wise-v11-clear-*.jpg`.

1. **What is it for?** It tells a homeowner who isn't sure how their roof is doing that a Wise Check gives them a clear picture of where it stands.
2. **Do I get it in under 3 seconds?**
   - Desktop: yes. A fogged window, "Clear It Up", "Wipe here" and a strip already wiped by the demo say what to do.
   - Phone: yes. The title is followed by the fogged window with "Wipe here".
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - wiping a misted window is a satisfying, everyday, physical act;
   - the house appears exactly under your finger;
   - when you've done most of it, the rest of the fog lets go by itself.

   It is the metaphor for the service ("clear it up"), done with your own hand.
4. **Is every element there for a reason?**
   - The window: the whole idea.
   - The condensation: it reads as a fogged window, not a blurry photo (added after my first screenshot read as "blurred photo").
   - The hint and the demo stroke: discovery.
   - The status line, then the result line: what you did, then what it means.
   - "Clear it for me": the keyboard and no-wipe path.
   - Book and Call: next steps.
   - The illustrative label: honesty.

   Complexity without a reason: none found.
5. **Does it fit a stressed homeowner?** Yes.
   - It meets the exact worry ("is it OK up there?") without alarm.
   - The task takes a second.
   - The answer is one plain sentence.
   - Book and Call are there before and after the wipe.

## Scorecard gate
Weights: Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. The WEB-SKILLS tags cited in the plan line's per-element ledger stand as written:

> ⟦S0451⟧, ⟦S0454⟧, ⟦S1443⟧, ⟦S1440⟧, ⟦S1438⟧, ⟦S0441⟧, ⟦S0458⟧, ⟦S1018⟧, ⟦S1107⟧, ⟦S0409⟧, ⟦S1452⟧, ⟦S0400⟧

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.5 | 3.40 |
| Usability | 30 | 8.6 | 2.58 |
| Creativity | 20 | 8.6 | 1.72 |
| Content | 10 | 8.6 | 0.86 |
| **Total** | **100** | | **8.56** |

Recomputed: 8.5 × 0.40 + 8.6 × 0.30 + 8.6 × 0.20 + 8.6 × 0.10 = 3.40 + 2.58 + 1.72 + 0.86 = **8.56**. Pass: ≥ 7.0, lowest category 8.5 (≥ 6.0), zero vetoes (below).

### Design: 8.5
- **Evidence:**
  - `wise-v11-1440.jpg`: one centred title, one wide window, and a calm row beneath (message left, buttons right).
  - The fog reads as glass: a cream wash, beads, and a soft ghost of the house.
  - `wise-v11-clear-1440.jpg`: the cleared photo carries the page.
  - Light cream, locked palette, Inter and the GATE-BUTTONS system.
  - 0 px sideways scroll at 1440, 768 and 390.
- **Loses points for:** D2 below. At tablet width the layout drops to one column and the buttons span the full width (`wise-v11-768.jpg`), as in Wise Check 10.

### Usability: 8.6
- **Evidence (checks.json, 26/26):**
  - the fogged start, with the hint and "Clear it for me";
  - the demo stroke wipes a little by itself without clearing;
  - mouse hover wipes and the hint goes;
  - wiping past 55 % lifts the fog and swaps the message;
  - "Fog it up again" resets;
  - keyboard "Clear it for me" clears;
  - `touch-action: pan-y` (phone scrolling is kept);
  - a spoken description, with the canvas hidden;
  - controls at least 44 px on desktop and phone;
  - axe 0 violations;
  - reduced motion is clean.
  
  It fixes both of Wise Check 10's usability defects (U1 needed a move; U2 drag versus scroll).
- **Loses points for:**
  - U1: a mouse user whose pointer rests on the window while scrolling past wipes some of it without meaning to;
  - U2: resizing the window (for example, rotating a phone) repaints the fog and loses wipe progress.

### Creativity: 8.6
- **Evidence:** "clear it up" made literal with a fogged window you wipe with your own hand is new across all 11 Wise Check versions, and it ends in a real reveal (`wise-v11-wiping-1440.jpg`, `wise-v11-clear-1440.jpg`).
- **Loses points for:** scratch-to-reveal is a known web pattern; the freshness is in the glass, the condensation and the metaphor.

### Content: 8.6
- **Evidence:**
  - every claim comes from `lib/wise-data.js` ("a clear picture of where your roof stands", the roof and the attic, photos and video "so you see what we saw");
  - no price, "free" or timing (checked);
  - no construction words (checked);
  - homeowner words throughout;
  - the photo is labelled illustrative.
- **Loses points for** D1 below: the cleared view is still a ground view of a house. The metaphor says "clear picture", but the picture itself shows nothing a Wise Check would add (no close-up, no attic).

## Checks: `gates/ladder/NEW-wise-11/checks.json` · **26/26 PASS**
- **Generic checks:**
  - the default view still shows V1;
  - the version count;
  - only V11 is visible;
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
  - the fogged start;
  - the demo stroke wipes a little;
  - mouse hover wipes and the hint goes;
  - past 55 % the fog lifts, with the result line;
  - fog it up again;
  - keyboard "Clear it for me";
  - touch `pan-y`;
  - a spoken description with the canvas hidden;
  - Wise Check facts only;
  - the illustrative label;
  - no construction words;
  - Book and the real phone.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots, and fixed
1. **The fog read as a blurry photo, not a window.** It now has a heavier cream wash and a fixed scatter of condensation beads.
2. **"Clear it for me" floated centred** under the message-and-buttons row. It now sits under the message, beside the window it acts on.
3. **The hint vanished in the first desktop evidence shot.** A stray pointer event from the screenshot tool hid it. Evidence is now taken by `shots11.cjs`, which keeps the pointer off the window. The real behaviour (the hint stays until the visitor wipes) is covered by the checks.

## Remaining defects (honestly named, not fixed in this gate)
- **D1 · the reveal shows a ground view (Content).** Clearing the fog reveals the same house a homeowner can already see from the yard. Proposed fix: once clear, ease the photo into a roof close-up with a small "Photos and video" chip, so the reveal shows what a Wise Check adds.
- **D2 · tablet scale (Design).** Between 641 and 860 px the buttons span the full width. Proposed fix: cap them at 420 px, as also proposed for Wise Check 10.
- **U1 · accidental hover-wipe (Usability).** A resting mouse wipes while the page scrolls under it. Proposed fix: with a mouse, wipe only while the pointer is moving and the page is not scrolling (ignore pointer moves within 150 ms of a scroll event).
- **U2 · resize resets the fog (Usability).** Proposed fix: keep the fog canvas at a fixed internal resolution and scale it with CSS, so a resize doesn't repaint it.

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter and the button system.
- **Invented facts:** none. Only `lib/wise-data.js` wording; no price or timing; only (651) 977-6027. The facts-lock check passes.
- **Illustrative photo captioned as an Owl job:** none. It is labelled "Illustrative photo".
- **AI-looking imagery:** none. It is a real photograph.
- **Dark background:** none.
- **Teaching roofing:** none. No construction words (checked).
- **Defaults changed:** none. The default view still shows Wise Check V1 (home-verify 50/50).
- **A second game:** none. No score or goal; it is a reveal. Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: Quiet Cubes
**What transfers**
- **An object you operate:** one gesture on one object, with an instant, visible result exactly where you touch it.
- **The result is the explanation.** No instructions beyond "Wipe here"; the house appearing under your finger says it.
- **Calm, tactile material:** the frosted glass and beads play the part of Quiet Cubes' soft, touchable surfaces.

**What does not transfer, and why**
- **3D rendering and rotating objects.** A flat photo and a canvas fog are lighter and closer to a real window.
- **The configurator's many options (colours, sizes).** There is one gesture and one result, because the owner's rule is one idea.
- **Quiet Cubes' product-shop flow (add to cart).** The end of this flow is Book or Call.
- **Their minimal, near-wordless pages.** A homeowner gets one plain sentence of meaning after the reveal.

## Process statement
- **No sub-agents and no background tasks were used** for Wise Check 11.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Wise Check 11 stops here for Muse's judgment. Wise Check 12 does not start until Muse accepts this gate.
