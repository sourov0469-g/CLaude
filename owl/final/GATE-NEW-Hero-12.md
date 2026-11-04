# GATE-NEW · Hero 12 · "Wrapped in Wings" (second of five new heroes, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *We look after your home like it's our own — book a check or call us.*
- **Primary governing reference:** Cowboy (family-fronted warmth: one warm picture, one plain promise, nothing to decode).
- **Style family:** a centred emblem, made of one round real-home photo held inside the Owl's wings.
- **Merge (the second of the two required):**
  - **From V2:**
    - the centred composition, with the eyebrow and the title "We Give a Hoot About Your Roof" above the picture;
    - the calls to action sitting at the picture's bottom corners;
    - depth parallax that follows the pointer;
    - the warm glow under the house.
  - **From V1:**
    - the promise "Under our wing, your nest is safe" as the lede;
    - the large buttons;
    - the Owl at a size big enough to own the screen.
- **What is new:**
  - The house is a real photo (hero-house-brown-shingle-1, with the house number blurred, illustrative and uncaptioned). It sits in a round "nest" medallion with a woven ring.
  - On load the Owl rises up from behind it and opens its wings around it.
  - Hovering the home makes the Owl lean in.
- **How it differs from Hero V1–V11, and why it is better:**
  - It is the only round, centred emblem hero.
  - It has no rain, unlike V1 and Hero 11, and no storm control. The single idea is warmth rather than weather: your home, held.
  - It is the calmest hero for a worried visitor, while the Owl still moves.
- **Skill ledger, per element:**
  - Eyebrow underline draw: ⟦S0407⟧.
  - Title word reveal: ⟦S0451⟧.
  - Lede copy: ⟦S0076⟧.
  - "Get My Roof Checked" tab button: ⟦S0405⟧.
  - "Call (651) 977-6027" button: ⟦S0405⟧ press; ⟦S0076⟧ verb-first label.
  - Nest ring draw-on: ⟦S0407⟧.
  - Photo settle-zoom: ⟦S0489⟧ settle.
  - Owl rise and wing-open entrance, lean-in on hover: ⟦S0489⟧.
  - Depth parallax across three planes: ⟦S1330⟧.
  - Glow: static.
  - Trust row: shared.
  - Reduced motion: ⟦S0400⟧. Shown at rest with no parallax.

## What was built
- **Layout:** centred, as in V2. From the top:
  - the eyebrow, "Family-owned roofers in Shoreview, Minnesota";
  - the title, **We Give a Hoot About Your Roof**;
  - one line: "Under our wing, your nest is safe. Leaks, storm damage, new roofs: done properly."
- **The picture:**
  - A real family home sits in a round cream frame with a woven amber-and-brown ring. On load the ring draws itself around the photo and the photo settles from a slight zoom.
  - The Owl rises from behind the home and opens its wings around it. Then it breathes.
  - Pointing at the home makes the Owl lean in and the photo warm a touch. On a phone, a tap does the same.
  - The three layers drift with the pointer for depth.
- **Buttons:** **Get My Roof Checked** and **Call (651) 977-6027** sit at the picture's bottom corners on desktop, as in V2. They stack full width below it on tablet and phone.
- **First screen:** both buttons are in the first screen at 1440 × 900 and at 390 × 844 (tested, and seen in the first-screen shots).
- **New asset:** `hero-nest-home.webp`, a square crop of pack photo hero-house-brown-shingle-1 with the garage house number blurred. The Owl is the same `owl-perch.webp` cut-out as Hero 11.

## Self-check (the owner's five questions), answered from my own screenshots at 1440 and 390
1. **What is it for?** "We look after your home like it's our own; book a check or call us."
2. **Do I get it in under three seconds, without reading?** Yes.
   - A big Owl holds a house in its wings. That picture is the message.
   - The title is the tagline the owner already uses.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The entrance: the ring draws round the photo, then the Owl comes up from behind and opens its wings, like a hug.
   - The response: point at the home and the Owl leans in.
   - The depth: the Owl, the home and the glow drift apart as the pointer moves, so the picture feels like an object, not a flat image.
4. **Is every element here for a clear reason?**
   - Title: the promise in the brand's words.
   - Lede: the reassurance plus the three jobs.
   - The round photo: their home.
   - The Owl: Owl Roofing, looking after it.
   - The ring: makes the photo read as the "nest".
   - Two buttons: book or call.
   - Trust row: why believe us.
   - Things I questioned:
     - **The warm glow behind the photo** (V2's): faint and static. It stays only because it lifts the photo off the cream. It is low value and named here.
     - **The eyebrow squiggle:** hidden on phones, where it pushed the line off-centre.
     - **A third "Services" button:** not added.
     - **A slideshow of three homes in the medallion:** considered and **rejected before building**. It would need a pause control and add a second idea.
   - Nothing pointless remains.
5. **Does it fit a stressed homeowner with a leaking roof?** Yes.
   - "Leaks" is in the first line under the title.
   - Both ways to act are full-size and in the first screen.
   - It is calm rather than busy: no rain and no storm control.
   - With reduced motion it shows the finished pose at once.

**Verdict: passes.** The fixes below were made before the final screenshots.

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.8 | A strong, simple emblem built from the liked Owl and a real home. Centred and balanced, and the brand colours carry it. |
| Usability | 30 | 8.8 | Both calls to action are in the first screen on desktop and phone, and they are big. Nothing needs to be learned. |
| Creativity | 20 | 8.4 | The Owl wrapping a round photo of a home is a new image for the brand. It is the calm counterpart to Hero 11's rain story. |
| Content | 10 | 9.0 | The facts are verbatim. The photo is uncaptioned with its number blurred. Homeowner language only. |
| **Weighted** | | **8.76** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-hero-12/checks.json`, 21/21.
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
- **Hero 12's own checks:**
  - the Owl has risen with its wings open, and the ring is drawn;
  - the photo is round, with an honest alt and no caption;
  - the medallion is centred under the title;
  - pointing at the home makes the Owl lean in;
  - the depth planes follow the pointer;
  - both buttons are in the first screen at 1440 × 900;
  - the book and call links work.

**Evidence:** `gates/ladder/NEW-hero-12/`. It holds the 2× section shots at 1440, 768 and 390, and the 2× first-screen shots at 1440 and 390, including the header.

## Defects found and fixed
- **Buttons below the fold.** In the first build both calls to action fell below the 900 px fold at 1440. The title, stage and lede were resized so the whole hero fits the first screen.
- **Button text wrap.** "Get My Roof Checked" wrapped onto two lines in its corner slot. The buttons now sit slightly outside the stage, with the label on one line.
- **Lede overlap.** The top of the Owl's wing overlapped the end of the lede. A gap was added above the stage.
- **Title orphan.** The title left "Roof" alone on its own line. It now uses balanced wrapping.
- **Phone clipping.** On phones, the sideways shift that centres the medallion clipped the Owl's left wing. The shift is now off on small screens.
- **House number.** The house number on the garage was visible in the photo. It is now blurred.

**Remaining, named honestly:**
- On phones the medallion sits slightly right of centre, because the Owl's body is right of centre in the artwork.
- As in Hero 11, the Owl is clearly an illustration beside a photograph, by design.

## Reference transfer
- **Transferred from Cowboy:** the warmth-first front: one warm picture, a plain family promise, two clear ways to act.
- **Not transferred:** the full-bleed lifestyle photography and the dark product stage. The page stays light, and the photo is held in the brand's own frame.

## Compared with the section's previous best (V1, V2 and Hero 11)
- **Against V2:** keeps its centred layout, title, corner buttons and depth. Swaps the AI-looking model house for a real home, and V2's runoff lines and rain for a simpler hug.
- **Against V1:** keeps its promise line and big buttons. Drops the storm.
- **Against Hero 11:** 11 tells a weather story, rain then dry. 12 is the calm one: no weather, just the home held. They are the two required V1 + V2 merges and are deliberately opposite in mood.

## Image needs
- The same as Hero 11: a Minnesota-looking home photo at 1600 px or more.
- For this composition, the best source would be a **square or near-square shot of a house front with the roof in view**, so the round crop keeps the whole house.
