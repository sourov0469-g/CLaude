# GATE-NEW · Hero 13 · "Evening Watch" (third of five new heroes, homeowner-simple pass: a V1 variant with new imagery)

## Plan line (written before building)
- **The one homeowner sentence:** *Rest easy: we'll take care of your roof — book a check or call.*
- **Primary governing reference:** Lando Norris (rest-motion: a character that is simply alive, with a blink, a breath and a hop, never a show).
- **Style family:** an overlapping photo spread. A large real golden-hour home photo fills the right, and a cream card carrying V1's words overlaps its left edge, with the Owl perched on the card.
- **What it takes from V1:**
  - the headline "Under Our Wing, Your Nest Is Safe";
  - text and buttons on the left;
  - the two large stacked buttons;
  - the trust row.
  - It is the V1 variant with different imagery that the addendum asks for. The picture is a real dusk photo of a home with an asphalt-shingle roof (pack photo hero-house-golden-1, illustrative, uncaptioned). The image is only 1086 px wide, so it is not stretched full-bleed.
- **Signature move:**
  - The Owl, perched on the text card, blinks now and then.
  - It hops when the visitor goes for a button, on hover or keyboard focus. The mascot cheers the action on.
- **How it differs from Hero V1–V12, and why it is better:**
  - It is the first hero where the photo is the big picture and the Owl is small, a companion on the text instead of the art.
  - It has the quietest motion of all: the dusk photo settles, the Owl blinks and hops.
  - For a worried visitor the copy and buttons are the brightest things on screen.
- **Skill ledger, per element:**
  - Headline word reveal: ⟦S0451⟧.
  - Lede: ⟦S0076⟧.
  - "Get My Roof Checked" (amber): ⟦S0405⟧ press; the hop trigger is ⟦S0489⟧.
  - "Call (651) 977-6027" (line): ⟦S0405⟧; the hop trigger is ⟦S0489⟧.
  - Photo settle from a slow zoom: ⟦S0489⟧ settle.
  - Owl blink, breathing and hop: ⟦S0489⟧.
  - Card overlap and shadow: static.
  - Trust row: shared.
  - Reduced motion: ⟦S0400⟧. No zoom, breathing, blink or hop; the Owl simply rests on the card.

## What was built
- **Desktop:**
  - A large, real dusk photo of a stone-and-brick home with a dark shingle roof, the sun setting behind the trees, fills the right two-thirds. It settles slowly from a gentle zoom.
  - A cream card overlaps its left edge. It carries V1's headline **Under Our Wing, Your Nest Is Safe**, one line ("Family roofers who fix it properly, so you can rest easy. We Give a Hoot."), and V1's two big stacked buttons, **Get My Roof Checked** and **Call (651) 977-6027**.
  - The Owl perches on the card's top edge, breathing and blinking now and then. When the visitor reaches for either button, on hover or keyboard focus, it does a small hop, then settles.
- **Phone and tablet:** the photo comes first, and the card overlaps it from below with a smaller Owl that keeps clear of the house. Both buttons are in the first screen at 390 × 844.
- **New asset:** `hero-golden.webp`, pack photo hero-house-golden-1 at its native 1086 px. It is never stretched; the composition is sized so it stays sharp.
- **Rejected before building:** I first chose pack photo hero-house-daylight-1, but its roof is wood shake, not asphalt shingle. Owl installs GAF asphalt systems, so a shake roof would show work the company doesn't advertise. It was dropped under the roofer-correct rule.

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390
1. **What is it for?** "Rest easy: we'll take care of your roof; book a check or call."
2. **Do I get it in under three seconds, without reading?** Yes.
   - A calm home at sunset, the headline about safety, and two buttons.
   - The Owl on the card ties the brand to the promise.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The Owl is a little companion that reacts to you. It blinks while you read and hops when you reach for a button, as if cheering you on.
   - The dusk photo slowly settles, like a camera coming to rest.
   - It is the most restrained of the new heroes, on purpose. The fun is small and personal.
4. **Is every element here for a clear reason?**
   - Photo: their home, calm.
   - Card: the promise, the lede and the two ways to act.
   - The Owl: the brand. Its hop points at the buttons.
   - The blink: makes the Owl feel alive, small and occasional.
   - Trust row: why believe us.
   - Things I questioned:
     - **The blink:** at desktop size the eye is only about 13 px, so it is subtle. It stays because it costs nothing and keeps the mascot alive, but it is the weakest element and named here.
     - **V1's storm test:** not carried over. Weather at a sunset home would fight the "rest easy" idea, and Hero 11 already owns rain.
     - **V1's "See Our Services" button:** replaced with the phone number.
5. **Does it fit a stressed homeowner with a leaking roof?** Yes.
   - The card is the brightest thing on screen.
   - The buttons are big and in the first screen on desktop and phone.
   - Nothing moves fast.
   - With reduced motion, nothing moves at all.

**Verdict: passes.**

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | A strong real photo and a clean card overlap. The Owl is used as a companion, a new and lighter role. |
| Usability | 30 | 9.0 | The clearest hero for acting: big buttons on the brightest surface, in the first screen at every width. |
| Creativity | 20 | 7.8 | Restrained by design. The hop-toward-the-button is the one new idea. |
| Content | 10 | 9.0 | The facts are verbatim. Honest alt, no caption. Roofer-correct photo choice (asphalt, not shake). |
| **Weighted** | | **8.66** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-hero-13/checks.json`, 22/22.
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
- **Hero 13's own checks:**
  - the photo settles;
  - the card overlaps the photo and the Owl perches on the card;
  - honest alt, no caption;
  - the Owl blinks;
  - reaching for a button makes it hop;
  - it settles back to breathing;
  - both buttons are in the first screen at 1440 × 900;
  - the book and call links work.

**Evidence:** `gates/ladder/NEW-hero-13/`. It holds the 2× section shots at 1440, 768 and 390, and the 2× first-screen shots at 1440 and 390.

## Defects found and fixed
- **Photo choice.** The daylight house was dropped for its wood-shake roof (roofer-correct).
- **Phone layout.** On phones the Owl sat over the house in the photo. It is now smaller and further right, and the card overlaps less.
- **Phone styles.** The first phone CSS had two conflicting blocks. They were merged into one.

**Remaining, named honestly:**
- The source photo is 1086 px, so at 2× on a large screen it is slightly soft.
- The house is from a Texas listing (oaks and a wide lawn). A Minnesota home would fit better; see the image needs.

## Reference transfer
- **Transferred from Lando Norris:** rest-motion. The character is alive in small ways (breath, blink, a hop on interaction) and never performs.
- **Not transferred:** the full-bleed dark video stage and large kinetic type.

## Compared with the section's previous best
- **Against V1:** the same words and button stack. The AI-looking house is replaced by a real photograph, the Owl moves from being the art to being a companion on the text, and the storm is gone.
- **Against Heroes 11 and 12:**
  - 11 is the weather story and 12 is the emblem. 13 is the calmest and most direct: photo first, words second, Owl as a friendly pointer to the buttons.

## Image needs
- A **Minnesota home at golden hour or dusk**, at 1600 px or more, with an asphalt-shingle roof clearly visible. It would replace the Texas house and fix the softness at 2×.
