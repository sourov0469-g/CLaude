# GATE-NEW · Hero 14 · "Overhead" (fourth of five new heroes, homeowner-simple pass: a V2 variant with new imagery)

## Plan line (written before building)
- **The one homeowner sentence:** *Someone is watching over your roof — us. Book a check or call.*
- **Primary governing reference:** Immersive Garden (a cursor-reactive surface: the picture answers where you point, with nothing to learn).
- **Style family:** a cinematic aerial band. One wide, real drone photo of a shingle roof, seen straight down, under a centred title.
- **What it takes from V2:**
  - the centred eyebrow and title above one wide picture;
  - the two calls to action sitting on the picture's bottom corners;
  - the amber tab button;
  - the Owl as a living presence;
  - V2's own cursor line, "Hoo's watching? We are.", which becomes the headline.
  - It is the V2 variant with different imagery that the addendum asks for. The picture is a real top-down drone photo of a brown asphalt-shingle roof (pack photo aerial-roof-topdown-1, cropped to the roof, illustrative, uncaptioned).
- **Signature move:**
  - The Owl is never drawn here, only its shadow, gliding over the roof the way a real owl's shadow would.
  - It sweeps in on load, then slowly circles. Point anywhere on the roof and the shadow drifts there: we look where you're worried.
- **How it differs from Hero V1–V13, and why it is better:**
  - It is the only hero seen from above.
  - It is the only one where the Owl is a shadow, not an illustration. That removes the illustration-on-photo seam the earlier heroes carry, so this is the most photo-real of them all.
  - One idea: we're watching over your roof.
- **Skill ledger, per element:**
  - Eyebrow underline draw: ⟦S0407⟧.
  - Title word reveal: ⟦S0451⟧.
  - Lede: ⟦S0076⟧.
  - "Get My Roof Checked" tab button: ⟦S0405⟧.
  - "Call (651) 977-6027" button: ⟦S0405⟧ press; ⟦S0076⟧ label.
  - Aerial photo settle: ⟦S0489⟧.
  - Owl shadow sweep, circling and drift toward the pointer: ⟦S0489⟧ glide and settle, ⟦S1324⟧ pointer-reactive surface. Time-based easing.
  - Trust row: shared.
  - Reduced motion: ⟦S0400⟧. The shadow rests over the roof, and the photo is shown at rest.

## What was built
- **Layout:** centred, as in V2. From the top:
  - the eyebrow line;
  - the title **Hoo's Watching Your Roof? We Are.** (V2's own cursor line, promoted);
  - one line: "Leaks, storm damage or a new roof: we'll take care of it, properly. We Give a Hoot."
- **The picture:**
  - A wide, real drone photo looks straight down on a brown shingle roof, with its hips, ridges and vents. It settles from a gentle zoom.
  - The Owl's shadow, a soft dark silhouette made from the same Owl art, sweeps in across the roof and slowly circles.
  - Point anywhere on the roof and the shadow drifts there; on a phone, tap. When the pointer leaves, it goes back to circling.
- **Buttons:** **Get My Roof Checked** and **Call (651) 977-6027** sit on the photo's bottom corners on desktop, as in V2. They stack under it on tablet and phone.
- **First screen:** at 1440 × 900 the whole hero is in the first screen, trust row included. At 390 × 844 both buttons are.
- **New asset:** `hero-aerial.webp`, a wide crop of pack photo aerial-roof-topdown-1. The roof fills the middle; the desert yards around it are cropped out.

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390
1. **What is it for?** "Someone is watching over your roof (us); book a check or call."
2. **Do I get it in under three seconds, without reading?** Yes.
   - The title says it in six words, and the picture is a roof seen from above, the way a bird sees it.
   - Honest note: on a first glance the soft shadow can read as a cloud's shadow. It reads as a bird once it moves and once the title has been read. I name that as the version's main risk.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The shadow is alive: it glides and banks as it turns.
   - It follows your pointer or finger to wherever you point on the roof, so you can "show the Owl" a spot.
   - The illusion is real-world, a bird's shadow on a real roof, not a cartoon over a photo.
4. **Is every element here for a clear reason?**
   - Title: the promise.
   - Lede: names the problems.
   - Aerial photo: your roof, seen properly.
   - Shadow: the Owl watching.
   - Two buttons: book or call.
   - Trust row: why believe us.
   - Things I questioned:
     - **The darkening at the bottom of the photo:** kept on desktop only, so the corner buttons stay legible over the busy shingles.
     - **V2's rain, runoff lines and wing toggle:** not carried over. They would be a second idea.
5. **Does it fit a stressed homeowner with a leaking roof?** Yes.
   - The first line under the title names leaks and storm damage.
   - Both buttons are big and in the first screen.
   - The motion is slow, and nothing needs to be learned.
   - With reduced motion, the shadow rests still on the roof.

**Verdict: passes.** The fixes below were made before the final screenshots.

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | The most photo-real hero: one real aerial, and the brand present only as a shadow. The centred V2 framing keeps it calm. |
| Usability | 30 | 9.0 | The whole hero, trust row included, fits the first desktop screen. Big buttons. |
| Creativity | 20 | 8.8 | An Owl that is only a shadow on a real roof, and follows where you point, is new for the brand and for the category. |
| Content | 10 | 9.0 | The facts are verbatim. The photo is uncaptioned and cropped to the roof. Homeowner language only. |
| **Weighted** | | **8.80** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-hero-14/checks.json`, 21/21.
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
- **Hero 14's own checks:**
  - the shadow sweeps in and keeps gliding;
  - the shadow is the darkened silhouette, never the illustration;
  - pointing at the roof brings the shadow there;
  - honest alt, no caption;
  - both buttons are in the first screen at 1440 × 900;
  - the buttons are not inside the photo;
  - the book and call links work.

**Evidence:** `gates/ladder/NEW-hero-14/`. It holds the 2× section shots at 1440, 768 and 390, and the 2× first-screen shots.

## Defects found and fixed
- **Buttons below the fold.** In the first build the band was so tall at 1440 that both buttons fell below the fold. The band is now a fixed, shorter height, and the title fits on one line.
- **Buttons over the photo on phones.** The buttons sat on top of the photo on phones, because they lived inside the photo's frame. They are now outside it: over its corners on desktop, stacked under it on phones.
- **Shadow too soft.** The shadow was too blurred to read as a bird. Its blur dropped from 5 to 3.5 px, and it got slightly darker and slightly smaller.

**Remaining, named honestly:**
- On a quick first look the shadow can read as a cloud's shadow. Movement and the title resolve it.
- The aerial is a southwestern house; cropping hides the yards, but the light is desert-bright.

## Reference transfer
- **Transferred from Immersive Garden:** a surface that answers the cursor. Here a real photo answers with a shadow that goes where you point.
- **Not transferred:** the WebGL distortion and the dark, moody palette. This stays a light page with one real photo.

## Compared with the section's previous best
- **Against V2:** the same centred stage and corner buttons. The AI-looking model house becomes a real roof, seen from above, and the painted Owl becomes its shadow. V2's living quality is kept: the shadow glides, banks and follows.
- **Against Heroes 11–13:**
  - Those three put the illustrated Owl next to a photo.
  - 14 is the only one with no seam between illustration and photo, and the most "real" of the new heroes.

## Image needs
- A **top-down drone photo of a Minnesota home's shingle roof**, at 2400 px or more, with green yards and trees at the edges, ideally an Owl job with the owner's permission. It would replace the southwestern aerial.
