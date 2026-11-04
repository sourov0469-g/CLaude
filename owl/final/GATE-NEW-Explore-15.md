# GATE-NEW · Explore 15 · "Show Us From the Ground" (fifth of five new Explore versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Take three photos from your yard, send them to us, and we'll tell you straight what your roof needs.*
- **Primary governing reference:** Graza (one charming, physical interaction done with care: here, instant photos that develop and swing on a clothesline).
- **Style family:** a clothesline across the page with three empty instant-photo frames pegged to it. No illustration of a roof, no cards to read, no sentence to build.
  - Desktop: one line sagging across the width, with the three frames hanging from it.
  - Phone: the line runs down the page, and each frame hangs on it with its instruction beside it.
- **Signature move:**
  - Each frame is a big button: "Add photo 1". On a phone it opens the camera (`capture="environment"`); on a computer it opens the photo picker.
  - When a photo is chosen, it develops in the frame (pale and blurred, coming into colour and focus) and the frame swings on its peg.
  - The photos stay on the visitor's device. The page says so.
  - **Send My Photos** uses the device's own share screen with the photos attached (Web Share with files). Where that is missing, it opens the visitor's own email app addressed to info@owlroofing.com and says to attach the photos there. It never claims anything was sent.
  - **Call (651) 977-6027** sits beside it, always available.
- **The three frames** (homeowner words; nothing to learn):
  1. **The whole roof**: from the street or the yard, so we see all of it.
  2. **The spot that worries you**: zoom in from the ground. No ladder.
  3. **Any stain inside**: a ceiling or wall, if you have one. Skip it if not.
- **The safety line, in one pill:** "Stay on the ground. Ladders are our job."
- **How it differs from Explore V1–V14, and why it is better:**
  - V1–V10 explain the roof. 11 is point at a drawing, 12 is slide an age, 13 is recognise a picture, and 14 is say it in words. In all of those the homeowner looks at *our* roof.
  - 15 is the first where they look at *their own* roof, and the first that starts real work: the photos are what Owl needs to give a straight first answer.
  - Layout: a clothesline of hanging frames (horizontal on desktop, vertical on phone). It is unlike the centred sentence of 14, the swipe stack of 13, the slider of 12 and the two-column picture of 11.
  - It is made for the phone in the yard, where a worried homeowner actually is.
- **Skill ledger, per element:**
  - Kicker and title: ⟦S0451⟧ word reveal.
  - The clothesline: ⟦S0407⟧ draw-on when first seen.
  - The frames dropping onto the line in turn: ⟦S0441⟧ choreography, ⟦S1436⟧ durations (medium, staggered 120 ms).
  - Each frame button:
    - ⟦S1442⟧ form design (a file input with camera capture, one per frame, each labelled);
    - ⟦S1441⟧ big targets;
    - ⟦S1107⟧ keyboard (it is a real button);
    - GATE-BUTTONS press, splash and focus.
  - The develop and the swing: ⟦S0458⟧ every change of state is visible, ⟦S0489⟧ calm believable settle (a damped swing), ⟦S1440⟧ feedback.
  - The count line ("1 of 3 photos ready"): ⟦S1457⟧ progress without pressure. One photo is enough.
  - The safety pill: ⟦S1435⟧ one deviation per view.
  - "Send My Photos": GATE-BUTTONS primary, with ⟦S1442⟧ honesty (it never claims sent) and ⟦S1439⟧ a cancel that keeps the photos.
  - "Call (651) 977-6027": GATE-BUTTONS secondary sweep with the phone ring.
  - Reduced motion: ⟦S0400⟧. No drop, no swing, the photo appears at once, and the line is drawn.

## What was built
`src/sections/explore-v15.html` · live as `?explore=15` (defaults unchanged: `?` still shows Explore V1).

- **Header:** kicker "Explore your roof", the title **Show Us From the Ground**, and one line: "Three photos from your yard tell us a lot. Take them, send them, and we’ll tell you straight what your roof needs."
- **The line:**
  - Desktop and tablet: an SVG cord sags across the page and draws on when first seen. Three instant-photo frames drop onto it in turn, each held by a wooden peg at the cord's height (the middle one hangs lower, where the cord sags) with its own slight tilt.
  - Phone (≤ 640 px): the cord runs down the page, each frame hangs from it, and its instruction sits beside it in 16 px type.
- **Each frame** is a real `<button>` with a line drawing (a house; a roof with a magnifier; a ceiling with a stain ring and a drip), an "Add photo N" pill, and a strip with the number and title.
  - Its name reads "Photo 1, the whole roof: not added yet. Press to add."
  - Pressing it opens a hidden `<input type="file" accept="image/*" capture="environment">`: the camera on a phone, the photo picker on a computer.
  - The chosen photo shows from a local `blob:` URL and develops: pale, grey and blurred, then into colour and focus over 1.6 s. The frame swings on its peg in a damped swing.
  - The pill becomes "Retake", and pressing again replaces the photo (the old URL is released).
- **Under the line:**
  - the safety pill "Stay on the ground. Ladders are our job.";
  - a live count: "No photos yet. One is enough to start." → "1 of 3 photos ready. Send now, or add more." → "All 3 photos ready.";
  - the privacy line "Your photos stay on this device until you choose to send them.".
- **Send My Photos** (GATE-BUTTONS primary). It is marked unavailable (`aria-disabled`) until a photo is added, but it stays focusable, and pressing it then explains: "Add a photo first: tap a frame on the line."
  - **With a share screen** (`navigator.canShare({files})`): it opens the device's own share screen with the photos attached, and the text carries info@owlroofing.com.
  - **After sharing:** "Done on your side. If you emailed them to info@owlroofing.com, we’ll look and get back to you. Or call (651) 977-6027."
  - **Cancelled:** "No problem. Nothing was sent, and your photos are still here."
  - **Without a share screen:** it opens the visitor's own email app to info@owlroofing.com, with the subject "Roof photos" and empty Name / Address / Best phone number lines. The note says to attach the photos there: "Nothing reaches us until you do."
- **Call (651) 977-6027** (GATE-BUTTONS secondary with the phone ring) is always available.
- **Reduced motion:** the cord is drawn and the frames are in place at once, with no swing; photos appear without developing.

## Five-question self-check (answered from my own screenshots)
**Screenshots** (all in `gates/ladder/NEW-explore-15/`):
- empty: `explore-v15-1440.jpg`, `-768.jpg` and `-390.jpg`;
- two photos added: `explore-v15-two-photos-1440.jpg` and `-390.jpg`;
- mid-develop: `explore-v15-developing-1440.jpg`.

The two-photo and developing shots use stand-in assets in place of a visitor's own photos. They are evidence only; the site shows no photo until a visitor adds one.

1. **What is it for?** It gets the homeowner to show Owl their own roof safely from the ground, and puts those photos in Owl's inbox, so the first answer is about *their* roof.
2. **Do I get it in under 3 seconds?**
   - Desktop: yes. The title says "Show Us From the Ground", and three empty photo frames that say "Add photo 1/2/3" are the obvious thing to do.
   - Phone: yes. The first frame and its instruction are on the first screen under the title.
3. **Is it interesting, playful or fun, and exactly what makes it so?** Yes, in three specific ways:
   - the frames drop onto a clothesline and hang at slight tilts;
   - your own photo develops in the frame like an instant print;
   - the frame swings on its peg when the photo lands.

   It is warm and physical, and the play is in service of the job.
4. **Is every element there for a reason?**
   - The cord and pegs: they say "hang your photos here", and they order the three shots.
   - The line drawings: they show what to photograph with no words.
   - "Add photo N" and "Retake": the action, in plain words.
   - The instruction under or beside each frame: where to stand, and that the third shot is optional.
   - The safety pill: the one thing a homeowner must not do.
   - The count: progress, and that one photo is enough.
   - The privacy line: it answers "where do my photos go?".
   - Send: the payoff.
   - Call: for anyone who would rather talk.
   - The note: an honest status.

   Complexity without a reason: none found.
5. **Does it fit a stressed homeowner?** Yes.
   - The task is something they can do right now, from where they stand, with the phone already in their hand, and nothing to learn.
   - It says plainly not to climb.
   - One photo is enough; the third is optional.
   - Nothing is claimed as sent, and Call is always there.

## Scorecard gate
Weights: Design 40 · Usability 30 · Creativity 20 · Content 10. To pass, the weighted total must be at least 7.0, with no category under 6.0 and zero vetoes. The WEB-SKILLS tags cited in the plan line's per-element ledger stand as written:

> ⟦S0451⟧, ⟦S0407⟧, ⟦S0441⟧, ⟦S1436⟧, ⟦S1442⟧, ⟦S1441⟧, ⟦S1107⟧, ⟦S0458⟧, ⟦S0489⟧, ⟦S1440⟧, ⟦S1457⟧, ⟦S1435⟧, ⟦S1439⟧, ⟦S0400⟧

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.4 | 3.36 |
| Usability | 30 | 8.2 | 2.46 |
| Creativity | 20 | 8.8 | 1.76 |
| Content | 10 | 9.0 | 0.90 |
| **Total** | **100** | | **8.48** |

Recomputed: 8.4 × 0.40 + 8.2 × 0.30 + 8.8 × 0.20 + 9.0 × 0.10 = 3.36 + 2.46 + 1.76 + 0.90 = **8.48**. Pass: ≥ 7.0, lowest category 8.2 (≥ 6.0), zero vetoes (below).

### Design: 8.4
- **Evidence:**
  - `explore-v15-1440.jpg`: one sagging cord, three tilted frames pegged at the cord's real height, then a centred footer (safety pill, count, two buttons). Light cream background, locked palette, Inter.
  - `explore-v15-390.jpg`: the vertical cord with the frames hanging from it, and the instructions beside them in 16 px.
  - `explore-v15-two-photos-1440.jpg`: real photos sit naturally in the frames.
  - 0 px sideways scroll at 1440, 768 and 390.
- **Loses points for** three remaining defects (below):
  - D1: Send is a washed-out primary on arrival;
  - D2: at tablet width the cord's left end runs off the page edge while the right end stops short;
  - D3: the phone layout is long (about 1,400 px of section at 390).

### Usability: 8.2
- **Evidence (checks.json, 27/27):**
  - three named frame buttons, each with a camera-capture input;
  - Send explains instead of failing when empty;
  - photos stay local (`blob:`);
  - retake replaces in place;
  - the email fallback's address, subject and body are read and asserted;
  - the share path passes the photos and the address;
  - cancel keeps the photos;
  - "All 3 photos ready";
  - controls at least 44 px on desktop and phone;
  - axe 0 violations;
  - reduced motion is clean.
- **Loses points for:**
  - U1: a share screen cannot pre-fill a recipient, so the visitor must pick email and type or choose info@owlroofing.com;
  - U2: phone photos are sent full size, and three can exceed some email size limits;
  - U3: the camera and share screen were tested with stubs in headless Chromium, not on a real phone;
  - on a computer with no photos to hand, the path is weaker (Call is the answer there).

### Creativity: 8.8
- **Evidence:**
  - the first of the 15 Explore versions where the homeowner looks at their own roof, not ours;
  - the instant-print develop and the swing on the peg (`explore-v15-developing-1440.jpg` shows the print mid-develop);
  - a clothesline is a home object, which suits "Protect your nest".
- **Loses points for:** "upload your photos" is a known request; the originality is in the framing and the physical feel.

### Content: 9.0
- **Evidence:**
  - plain homeowner words in every line;
  - a safety instruction that is roofer-correct (stay off the roof);
  - the privacy promise is literally true (local object URLs, nothing uploaded by the page);
  - only locked facts are used ((651) 977-6027, info@owlroofing.com);
  - no construction words (check passes);
  - the honest status in all four Send outcomes (checked).
- **Loses points for:** "we’ll tell you straight what your roof needs" is a service promise without a stated time. That is deliberate, because no response time is in the facts lock.

## Checks: `gates/ladder/NEW-explore-15/checks.json` · **27/27 PASS**
- **Generic checks:**
  - the default view still shows V1;
  - the version count is 15;
  - only V15 is visible;
  - the anchor id;
  - one h2;
  - controls ≥ 44 px;
  - the facts lock;
  - axe WCAG 2.1 A/AA, 0 violations;
  - no errors;
  - no sideways scroll at 1440, 768 or 390;
  - phone controls ≥ 44 px;
  - reduced motion is clean.
- **Version checks:**
  - three named frames with camera-capture inputs;
  - the empty start (count, Send unavailable, safety and privacy lines);
  - Send with no photo explains;
  - mid-develop and swing;
  - photo 1 local, renamed, counted, Send ready;
  - retake in place;
  - the email fallback's address, subject and body;
  - the email note is honest;
  - the share path;
  - cancel keeps the photos;
  - all three filled;
  - no construction words;
  - Call is the real phone.

Regression: `home-verify.cjs` **50/50 PASS**.

## Defects found from my own screenshots, and fixed
1. **Invalid list markup.** The SVG cord sat directly inside the `<ul>` (axe flags a list with a non-item child). It was moved to a wrapper (`.rope`).
2. **Class clash.** My photo-area class `.ph` was also the button system's phone-icon class, which turned the Call button's icon into a beige square. It was renamed `.pic`, and the hint drawings got their own class `.hint`.
3. **Phone cord touching the lede.** The vertical cord started 18 px above the list; it now starts at the first peg.
4. **Camera icon shrank to nothing on phone.** Flex squeezed it; it now has `flex:none`.
5. **The stain drawing read as a lamp.** It was redrawn as a ceiling with a stain ring and a drip.
6. **Orphaned words.** "ladder." and "job." sat alone on their lines; balanced wrapping was added to the instructions and the safety pill.
7. **Hidden inputs counted as 1 px controls.** They now use the `hidden` attribute. Programmatic `click()` still opens the picker, and tests still set files.
8. **Evidence script clip.** The first filled shot captured the hero because I mixed viewport and page coordinates; this was fixed in `fill15.cjs`.

## Remaining defects (honestly named, not fixed in this gate)
- **D1 · washed-out primary on arrival (Design).** Send is the amber primary but shows disabled until a photo is added, so the first impression is a grey button. Proposed fix: on arrival make Call the filled button, and switch emphasis to Send once a photo is added.
- **D2 · cord ends at tablet width (Design).** The cord is 108 % wide, so at 768 its left end leaves the page edge while its right end stops about 7 % short. Proposed fix: centre the overhang, or end both sides at fixed hooks.
- **D3 · long on phone (Design).** The three stacked frames make the section about 1,400 px tall at 390. Proposed fix: 120 px frames, or a two-and-one arrangement.
- **U1 · the share screen cannot address the email (Usability).** This is a limit of the platform: Web Share can't set a recipient. The text and the note both carry info@owlroofing.com.
- **U2 · full-size photos (Usability).** Three phone photos can be 10–30 MB together. Proposed fix: scale each to about 2,000 px on a canvas before sharing (still local).
- **U3 · not tried on a real phone (Usability, verification).** The camera capture and the share screen are platform features. Here they were exercised with stubs in headless Chromium (the share, cancel and email paths are all asserted), but not on a real iPhone or Android phone.

## Vetoes checked: **zero vetoes**
- **Identity changed:** none. Locked palette, Inter, owl mark and button system.
- **Invented facts, quotes, reviews or jobs:** none. Only (651) 977-6027 and info@owlroofing.com. The facts-lock check passes.
- **Illustrative photos captioned as Owl jobs:** none. The site shows no photo until a visitor adds their own. The stand-ins exist only in evidence shots, and the gate says so.
- **Dark background:** none.
- **Roofer-incorrect advice:** none. The page tells homeowners to stay on the ground.
- **Form claims saved or sent:** none. Every Send outcome is honest, and all four were asserted.
- **Data collected by the page:** none. Photos are local object URLs; the page uploads nothing.
- **Defaults changed:** none. The default view still shows Explore V1 (home-verify 50/50).
- **A second game:** none. Explore V3 remains the only game.
- **Bot wall bypassed:** none. Nothing was fetched.
- **Sub-agents or background tasks:** none (statement below).

## Reference transfer: Graza
**What transfers**
- **One physical, charming interaction carried by custom animation, not stock effects:**
  - the frames drop onto the cord on a spring;
  - a photo develops like an instant print;
  - the frame swings on its peg with a damped settle.
- **Warmth from an everyday object.** Graza uses its bottle and kitchen; we use a clothesline and instant photos.
- **Restraint:** one interaction, done carefully, on a calm page. GATE-BUTTONS' Graza-derived warm fill is used on the secondary button.

**What does not transfer, and why**
- **Graza's lime-and-green palette, illustration style and product photography.** Owl keeps its cream, amber and ink, and the only photos are the visitor's own.
- **Graza's playful, jokey copy voice.** A stressed homeowner gets plain, calm words, and the safety line is stated straight.
- **Graza's scroll-driven product theatre.** Nothing here is tied to scroll beyond a one-time entrance; the interaction belongs to the visitor's taps.
- **E-commerce mechanics (add to cart, prices).** Not relevant. The end of this flow is a message or a call.

## Process statement
- **No sub-agents and no background tasks were used** for Explore 15.
- All work ran in my main turn as short foreground commands, each with an explicit time limit (the longest was 235 s).
- No parallel sessions. Nothing was published; the work is in the repository only, on `claude/sweet-hypatia-it8evf`.

## STOP
Explore 15 completes the five new Explore versions. Work stops here for Muse's judgment. Wise Check +5 does not start until Muse accepts this gate.
