# GATE-NEW · Hero 11 · "Under Our Wing" (first of five new heroes, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Your home is safe with us — we'll fix your roof properly, and you can call or book right now.*
- **Primary governing reference:** Lando Norris (bespoke object that comes to rest: a calm landing and a breathing pose, not a show).
- **Style family:** photo card plus mascot — one real house photo in a cream frame, with the Owl landing on its top edge.
- **Merge (required for two of the five):**
  - **From V1:**
    - the headline "Under Our Wing, Your Nest Is Safe";
    - the split layout, with text left and picture right;
    - the large stacked buttons;
    - rain that bounces off the Owl's wings with small amber splashes;
    - the storm toggle.
  - **From V2:**
    - the eyebrow line "Family-owned roofers in Shoreview, Minnesota" with its drawn underline;
    - the pressable amber tab button;
    - the Owl as a living character: it lands and breathes, not a still picture.
- **What is new:**
  - The AI-looking house is gone. The house is a real photograph from the hero pack (hero-house-pines-1, illustrative, never captioned as an Owl job).
  - The Owl has been cut free of the old house and perches on the photo.
  - Before it lands, rain falls across the photo and the picture is grey. When it lands, its wings take the rain and the photo brightens.
- **How it differs from Hero V1–V10, and why it is better:**
  - It is the only hero that pairs the liked Owl with real photography of a home.
  - Its single idea, "the Owl keeps your home dry", plays out in the first two seconds without reading anything.
  - The second button is the phone number, because a worried homeowner wants a number to call.
- **Skill ledger, per element:**
  - Eyebrow underline draw: ⟦S0407⟧.
  - Headline word reveal: ⟦S0451⟧.
  - Lede copy, homeowner voice: ⟦S0076⟧.
  - "Get My Roof Checked" tab button (press and flip): ⟦S0405⟧.
  - "Call (651) 977-6027" button: ⟦S0405⟧ press; ⟦S0076⟧ verb-first label.
  - "Make It Pour" toggle: ⟦S0405⟧ switch state.
  - Owl landing, settle and breathing: ⟦S0489⟧.
  - Rain and splashes on the canvas, collision with the wing silhouette: ⟦S1363⟧.
  - Photo grey-to-bright on landing: ⟦S0409⟧ state transition.
  - Trust row: shared component, no new motion.
  - Reduced motion: ⟦S0400⟧. The Owl is shown already landed, with no rain and a bright photo.

## What was built
- **Desktop:** text on the left, the picture on the right.
- **Text column:**
  - V2's eyebrow line;
  - V1's headline, "Under Our Wing, Your Nest Is Safe";
  - one line for the homeowner: "A leak, storm damage or a tired old roof? We'll fix it properly. We Give a Hoot.";
  - two big buttons: **Get My Roof Checked** (V2's amber tab) and **Call (651) 977-6027**.
- **Picture column:**
  - A real photo of a home, with no caption, sits in a cream frame. For the first second it is grey, and rain falls across it.
  - Then the Owl glides in and lands on the top edge of the frame, talons over the edge and wings spread over the house.
  - From then on the rain bounces off the wings in small amber splashes, the photo warms to full sunny colour, and the Owl breathes gently.
  - A **Make It Pour** pill turns the storm up for six seconds. The house still stays dry.
- **Below:** the usual trust row.
- **Phone:** the picture comes first, then the headline and the two buttons, which sit inside the first screen at 390 × 844.
- **New assets:**
  - `owl-perch.webp`: the liked Owl, cut free of the AI-looking house and its painted ground. It is the same artwork, nothing redrawn.
  - `hero-pines.webp`: a crop of pack photo hero-house-pines-1.
  - The pack originals and the manifest are kept in `owl/assets/source/hero-pack/`.

## Self-check (the owner's five questions), answered from my own screenshots at 1440 and 390
1. **What is it for?** "Your home is safe with us. We'll fix your roof properly; book or call now."
2. **Do I get it in under three seconds, without reading?** Yes.
   - You see rain on a grey house, the Owl lands, and the house is suddenly dry and sunny. That is the whole story, told by the picture alone.
   - The headline says the same thing in six words.
3. **Is it interesting, playful or fun? What exactly makes it so?** Three things:
   - the landing itself: the Owl drops in, overshoots a touch and settles with its talons hooked over the frame;
   - the visible cause and effect: drops hit the wings and burst amber, while the photo under them stays clean;
   - **Make It Pour**: the visitor can throw a heavier storm at it and watch it hold.
4. **Is every element here for a clear reason?**
   - Headline: the promise.
   - Lede: names the three problems a homeowner has, plus the fix.
   - Two buttons: book, or call.
   - The photo: their home, shown as a real home.
   - The Owl and the rain: the promise, acted out.
   - The trust row: why believe us.
   - Make It Pour: the one playful control, and it proves the promise.
   - Things I questioned:
     - **The eyebrow underline squiggle** (V2's): it is small decoration. It stays because it is V2's liked detail and draws once, without looping. It is the weakest element, and I name it here.
     - **A third "See Our Services" button** (V1 and V2): **dropped**. A stressed homeowner needs book or call, not browsing.
     - **V2's mesh-warped head and wing motion**: **not carried over**. It is heavy WebGL for a subtle effect; the landing does the same job simply.
   - Nothing on the "without a reason" list remains.
5. **Does it fit a stressed homeowner with a leaking roof?** Yes.
   - The first words they read are about their problem, in their words: "a leak, storm damage".
   - The phone number is a full-size button, not small print.
   - Nothing has to be read, scrolled or learned before acting.
   - It loads clean, and with reduced motion it shows the dry, landed state at once.

**Verdict of the self-check: passes. Nothing was removed after the check, because the cuts above were made before the first full screenshot.**

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | The liked Owl, a real house photo, and the cream, amber and ink palette in one calm composition. The illustrated Owl sits on a framed photo instead of inside the scene, so it reads as a deliberate mascot, not a fake composite. |
| Usability | 30 | 9.0 | Two clear calls to action, with the phone as a button. The idea needs no reading. The controls are large, and the phone layout keeps the buttons in the first screen. |
| Creativity | 20 | 8.4 | The rain-to-dry story with a landing character is a new combination. It builds on V1 and V2 rather than leaving them. |
| Content | 10 | 9.0 | The facts are verbatim. No caption implies an Owl job. Homeowner language, no roofing lesson. |
| **Weighted** | | **8.74** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-hero-11/checks.json`, 21/21.
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
- **Hero 11's own checks:**
  - the Owl lands and the house brightens;
  - the alt texts are honest;
  - amber splashes show on the wings;
  - no rain is drawn over the photo once the Owl has landed;
  - the book and call links work;
  - Make It Pour turns on, and switches itself off after 6 s.

**Evidence:** `gates/ladder/NEW-hero-11/`. It holds the 2× shots at 1440, 768 and 390, plus `hero-v11-before-landing-1440.jpg`, the grey and rainy first second.

## Defects found and fixed
- **Compositing.** My first try stood the Owl on the photo's own roof among the trees. It read as a pasted composite, the AI look the owner rejected, so I discarded it. The Owl now lands on the photo's frame instead.
- **Owl cut-out.** Cutting the Owl free of the old house left shingle and shadow pixels under the talons, and one pass ate the toes. It was cut again: pale toes and grey claws are kept by colour, shingle brown is removed, and the edge near the tail fades out.
- **Photo crop.** The crop ran 22 px past the bottom of the photo, which left a black strip. Re-cropped inside the image.
- **Phone layout.** On phone the Make It Pour pill covered a corner of the photo. It moved to the empty rain area at top-left.
- **Reduced motion.** Make It Pour has nothing to show with motion reduced, so it is hidden then rather than left as a dead button.

**Remaining, named honestly:**
- The Owl painting and the photo have different lighting, so a close look shows the Owl is an illustration on a photo. That is the intent: mascot on a picture frame, not a fake scene.
- The pines house is from a southern US listing, with magnolia trees in it. For Minnesota a home with northern trees or a winter scene would fit better. See the image needs below.

## Reference transfer
- **Transferred from Lando Norris:** the calm arrival and the rest pose. The object comes in, settles with a small overshoot and then simply breathes.
- **Not transferred:** the dark full-bleed staging and the heavy type motion. The page stays light, and the headline only gets the shared word reveal.

## Compared with the section's previous best (V1 and V2, the owner's picks)
- **Keeps:** V1's headline, its split layout and its rain that bounces off the wings; V2's eyebrow line and its tab button.
- **Changes:**
  - The house is now a real photograph, not the AI-looking model house.
  - The second button is the phone number, not "See Our Services".
  - The Owl's protection is shown as a before-and-after, from grey rain to a dry, sunny house, where V1 and V2 only showed it static.
- **Gives up:** V2's living head and wing motion and its parallax planes. They are simpler here, on purpose.

## Image needs (for this and the next heroes)
1. A real **Minnesota-looking house** in a wide 16:10 or wider shot at 1600 px or more:
   - northern trees (birch, maple, spruce), or a light-snow scene;
   - an asphalt-shingle roof clearly visible;
   - no people, no visible house number.
2. A real **Owl crew on a roof** in a wide shot at 1600 px or more. Owl's own crew photography would be ideal; the branch has only 960 px video stills.
3. Optional: a real **rainy-day photo of the same kind of house**, to replace the CSS grey treatment with a true before-and-after pair.
