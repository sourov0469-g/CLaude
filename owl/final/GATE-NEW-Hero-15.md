# GATE-NEW · Hero 15 · "We'll Nail It" (fifth of five new heroes, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Real hands do your roof right, with a 10-year workmanship warranty — book or call.*
- **Primary governing reference:** Graza (the animation-quality bar: one physical, satisfying moment, done well).
- **Style family:** a craft close-up. A square, real photo of a roofer's hand holding a nail with the hammer raised sits on the left; words and buttons sit on the right.
- **Signature move:**
  - The strike: shortly after load the photo jolts once, as if the hammer has just landed. Amber sparks burst at the nail head, and the Owl warranty stamp, "10-Year Workmanship Warranty", thumps onto the photo's corner.
  - Tapping or clicking the photo strikes again.
- **How it differs from Hero V1–V14, and why it is better:**
  - It is the only hero about the people and the craft rather than the house.
  - It is the only one whose motion is a single physical beat, not a loop.
  - It carries the strongest homeowner reassurance, the 10-year workmanship warranty (a locked fact), right in the picture.
  - The illustrated Owl stays out. The brand appears as the Owl logo on the stamp.
- **From V1:** the text-and-buttons column, here mirrored to the right, and the big stacked buttons.
- **Skill ledger, per element:**
  - Eyebrow: static.
  - Title reveal: ⟦S0451⟧.
  - "Nail" underline draw on the strike: ⟦S0407⟧.
  - Lede: ⟦S0076⟧.
  - "Get My Roof Checked" and "Call (651) 977-6027": ⟦S0405⟧ press; ⟦S0076⟧ labels.
  - The photo as a button ("Strike the nail again"): ⟦S0405⟧ press, ⟦S1107⟧ keyboard (Enter and Space).
  - Photo jolt: ⟦S0489⟧ impact and settle.
  - Spark burst: ⟦S1323⟧ emission.
  - Warranty stamp thump: ⟦S0489⟧ squash and settle.
  - Trust row: shared.
  - Reduced motion: ⟦S0400⟧. No jolt and no sparks; the stamp is shown in place, and the underline is drawn.

## What was built
- **Desktop:**
  - On the left, a square real photo: a roofer's hand holds a nail on the shingles, with the hammer raised. It is sharp, with a blurred house behind.
  - On the right:
    - the eyebrow;
    - the title **We'll Nail It.**;
    - one line: "Leaks, storm damage or a whole new roof: done properly, and backed by our 10-year workmanship warranty.";
    - V1's big stacked buttons, **Get My Roof Checked** and **Call (651) 977-6027**.
- **The strike:** a second after load the photo jolts as if the hammer just landed. A ring and a burst of amber sparks fly from the nail head, an amber stroke underlines "Nail", and a round Owl stamp reading **"10-Year Workmanship Warranty"** thumps onto the photo's corner. Tapping the photo strikes again. It is a real button, "Strike the nail again", so Enter and Space work.
- **Phone and tablet:** the photo comes first, smaller, then the words. Both buttons are in the first screen at 390 × 844.
- **New asset:** `hero-nail.webp`, a square crop of pack photo crew-nail-close-1. It is uncaptioned with an empty alt, because the button carries the name. It is never presented as an Owl crew member.

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390
1. **What is it for?** "Real hands do your roof right, with a 10-year workmanship warranty; book or call."
2. **Do I get it in under three seconds, without reading?** Yes. You see a hand on a nail, read "We'll Nail It.", and see a warranty stamp. Three glances, one meaning.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The strike is one physical, satisfying beat: the photo jolts, sparks burst at the nail, and the stamp lands with a squash.
   - Visitors can do it again themselves by tapping the photo.
   - The pun pays off visually, with the underline drawing under "Nail" at the moment of impact.
4. **Is every element here for a clear reason?**
   - Photo: the craft and the people.
   - Title: the promise.
   - Lede: the problems, plus the warranty.
   - Stamp: the warranty, made visible.
   - Sparks and jolt: the promise acted out.
   - Two buttons: book or call.
   - Trust row: why believe us.
   - Things I questioned:
     - **The "Tap the photo to swing the hammer." hint:** kept, small, so the replay is discoverable. It is hidden with reduced motion, where tapping does nothing.
     - **The illustrated Owl:** left out on purpose. The Owl is present as the logo on the stamp. Four illustrated Owls in a row is enough.
   - Nothing pointless remains.
5. **Does it fit a stressed homeowner with a leaking roof?** Yes.
   - "Leaks" and "storm damage" come first in the line under the title.
   - The 10-year workmanship warranty is the reassurance a worried owner wants.
   - The buttons are large and in the first screen.
   - The motion is one short beat, not a loop. With reduced motion it is shown finished: stamp down, underline drawn.

**Verdict: passes**, after the fixes below.

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | A strong, sharp real photo, confident type and a crisp stamp. The layout is mirrored for variety. |
| Usability | 30 | 9.0 | Big buttons in the first screen at every width. The photo replay is an optional extra. |
| Creativity | 20 | 8.6 | The pun made physical, with a strike, sparks and a stamp. It is the first hero about the craft. |
| Content | 10 | 9.4 | It puts a locked, strong fact (the 10-year workmanship warranty) into the first screen. No caption implies an Owl job. |
| **Weighted** | | **8.78** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-hero-15/checks.json`, 21/21.
- **Generic checks:**
  - only this version is visible;
  - one h1;
  - controls are at least 44 px;
  - facts lock;
  - axe shows 0 violations;
  - no page or console errors;
  - no sideways scroll at 1440, 768 or 390;
  - phone controls are at least 44 px;
  - reduced motion has no looping animation.
- **Hero 15's own checks:**
  - the strike on load: jolt, sparks, underline and stamp;
  - the stamp states the fact exactly;
  - the stamp is round;
  - tapping strikes again;
  - Enter strikes (it is a real named button);
  - both buttons are in the first screen at 1440 × 900;
  - the book and call links work.

**Homepage regression after the Hero five:** `home-verify` 50/50. The defaults are untouched.

**Evidence:** `gates/ladder/NEW-hero-15/`. It holds the 2× section shots, the 2× first-screen shots, and `hero-v15-mid-strike-1440.jpg`, a close crop of the sparks 110 ms after a tap.

## Defects found and fixed
- **Squashed stamp.** The stamp rendered as an oval with its text overflowing. Its padding was measured against the viewport, not the stamp. It is now an inner box sized from the stamp itself, and is perfectly round at every width.
- **Faint sparks.** In my own capture the sparks were nearly invisible against the bright blur, while only the ring showed. They are now larger and brighter, hold full brightness for half their flight, and there are 12 instead of 8. Re-captured and visible.
- **Phone photo size.** The phone photo is a little smaller, so both buttons sit comfortably in the first screen.

**Remaining, named honestly:**
- The photo shows hand-nailing with a claw hammer. Crews mostly use nail guns, but hand-nailing is a real and correct technique, so it stays.
- The worker is a stock roofer, not Owl's crew. Uncaptioned, but an Owl crew close-up would be truer.

## Reference transfer
- **Transferred from Graza:** one well-made physical moment, with a squash on the stamp, a settle and a burst. Quality over quantity.
- **Not transferred:** the bold illustrated product world and the colour-blocked backgrounds.

## Compared with the section's previous best
- **Against V1:** the same text-and-stacked-buttons column, mirrored to the right. The AI-looking house becomes a real roofer's hand, and the rain becomes a single strike.
- **Against Heroes 11–14:**
  - Those four are about the house: rain, a hug, dusk and the view from above.
  - 15 is the only one about the people doing the work.
  - It is the only one with the warranty in the picture.

## Image needs
- **An Owl crew close-up**, hands working on a roof at 1600 px or more, ideally hand-nailing or placing a shingle, with the Owl logo on a sleeve or glove. It would make this hero truly Owl's own.
