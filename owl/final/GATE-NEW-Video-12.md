# GATE-NEW · Video 12 · "Ring the Bell" (second of five new Video versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *When you call us, these are the people who show up at your door.*
- **Primary governing reference:** Quiet Cubes (an object you operate: one device, one press, an instant response).
- **Style family:** a homeowner's video doorbell. A drawn doorbell device sits beside its camera screen.
- **Signature move:**
  - Press the doorbell's glowing button, the one visible action. It plays a soft two-note chime, synthesized, and only on that press.
  - The doorbell-camera screen wakes from standby to show Owl's own crew film, with a "Front door" label.
  - The page then offers the real next step: call (651) 977-6027 or book.
- **How it differs from Video V1–V11, and why it is better:**
  - It is the only Video version told from the homeowner's side of the door. The crew comes to you.
  - It is not a player, scene, lens, story card or play button.
  - The one action (ring) maps directly onto the real one (call).
- **Truth guard:**
  - The screen never says "Live", shows no clock, and claims no real-time feed. It is labelled "Front door", and the film is Owl's own clip.
  - It never implies a specific visit.
- **Skill ledger, per element:**
  - Title reveal: ⟦S0451⟧.
  - The doorbell button, with ring glow and press: ⟦S0405⟧. Keyboard: Enter and Space natively.
  - The chime: synthesized, on press only, quiet.
  - Screen wake (standby to picture): ⟦S0409⟧ transition.
  - Film play while in view: ⟦S1046⟧.
  - "Call (651) 977-6027" and "Get My Roof Checked": ⟦S0405⟧; ⟦S0076⟧ labels.
  - Full film link: ⟦S1046⟧ modal.
  - Reduced motion: ⟦S0400⟧. The screen wakes to the poster with no glow pulse, and the chime still sounds on press because it is user-initiated.

## What was built
- **Header:** the title **Ring the Bell** and one line: "When you call Owl, these are the people who come to your door. Press the doorbell to see them."
- **The doorbell:**
  - A doorbell-camera screen sits beside a drawn video doorbell, a dark pill with a camera lens, a status light and a glowing amber ring button.
  - **Before ringing:** the screen dozes, showing a blurred, dimmed still of the crew under the Owl Roofing logo and "Press the doorbell".
  - **On pressing the bell:** a soft two-note chime plays (synthesized, only on that press), amber rings pulse out of the button and the status light turns green. The screen then sharpens into Owl's own crew film, playing, with a small "Front door · Owl's crew" label.
- **After ringing:**
  - The line under it changes to "That's Owl's crew. Ring us for real, and they'll come to yours."
  - The **Call (651) 977-6027** button gives one little bounce.
  - **Get My Roof Checked** and "Watch the full film" sit alongside.
- **Fit:** at 1440 × 900 the whole section fits one screen, buttons included. On phone, the screen, the bell and then the buttons stack.

## Self-check (the owner's five questions), answered from my own screenshots at 1440 and 390, before and after ringing
1. **What is it for?** "When you call us, these are the people who show up at your door."
2. **Do I get it in under three seconds, without reading?** Yes. Everyone knows a video doorbell: press it and see who's at the door. Here it's Owl's crew.
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The press-and-reveal: a real doorbell chime, the ring pulse, the green light, and the screen waking to show real people.
   - It's a small role-play of the moment the homeowner actually wants, the roofer arriving.
4. **Is every element here for a clear reason?**
   - Title and lede: the promise.
   - Screen: who comes.
   - Doorbell: the one action, mirroring the real one.
   - Front-door label: what you're seeing.
   - Call button: the real version of ringing.
   - Get My Roof Checked: the alternative.
   - Full-film link: for the curious.
   - Things I questioned:
     - **"Live" or a clock on the camera view:** left out. It would claim a real-time feed.
     - **The status light:** kept, tiny. It is the doorbell's "it worked" feedback.
     - **The chime:** plays only on press, quietly, and only because the visitor asked for a doorbell.
   - Nothing pointless remains.
5. **Does it fit a stressed homeowner?** Yes.
   - The call button is visible before and after ringing; nothing is hidden behind the game.
   - The whole section fits one desktop screen.
   - With reduced motion, the press still wakes the screen to the poster, with no pulses or zoom.

**Verdict: passes.** The fixes below were made before the final screenshots.

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | A clean device-and-screen pairing in the brand's ink and amber. The light page stays light, and the dozing screen is soft, not a black hole. |
| Usability | 30 | 8.8 | One obvious press, then the call button right underneath. The whole section is in one desktop screen. |
| Creativity | 20 | 9.0 | The homeowner's own doorbell as the way to meet the crew is new, and it maps perfectly onto "call us". |
| Content | 10 | 9.0 | Owl's own film. No live or real-time claim. The locked phone and YouTube ID. |
| **Weighted** | | **8.80** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-video-12/checks.json`, 21/21.
- **Generic checks:**
  - only this version is visible;
  - the anchor id;
  - one h2;
  - controls are at least 44 px;
  - facts lock;
  - axe shows 0 violations;
  - no page or console errors;
  - no sideways scroll at 1440, 768 or 390;
  - phone controls are at least 44 px;
  - reduced motion has no looping animation.
- **Video 12's own checks:**
  - before ringing the screen dozes, with no film playing;
  - the screen never claims a live feed (no "Live", no clock);
  - pressing the bell rings;
  - the screen wakes and Owl's crew film plays, labelled Front door;
  - the page names the crew and offers the real call;
  - Enter rings the bell (it is a real named button);
  - the full film opens YouTube.

**Evidence:** `gates/ladder/NEW-video-12/`. It holds standby and rung shots at 1440 and 390 at 2×, plus the viewport shots at 1440, 768 and 390.

## Defects found and fixed
- **Dark standby.** Before ringing, the screen was a large pure-black block that felt heavy on the light page. It now dozes on a blurred, dimmed still of the crew.
- **Screen size.** The screen was so large that the buttons fell below the fold. It is now capped by viewport height.
- **Dead space.** Capping the screen left dead space on its left. The screen and bell are now centred as a pair.

**Remaining, named honestly:**
- The section works without ringing, but its charm needs the press. A visitor who scrolls straight past sees only a dozing screen and a doorbell. The lede tells them to press it.

## Reference transfer
- **Transferred from Quiet Cubes:** an object you operate, with one press and an immediate, physical-feeling response (light, ring, chime, wake).
- **Not transferred:** the configurator's options and specs. There is one button, not a panel.

## Compared with the section's previous best
- **Against V1:** the same real film and full-film link. Instead of a player, the homeowner rings their own doorbell to meet the crew.
- **Against Video 11:** 11 is "press the Owl to watch", the fastest route to the film. 12 is "ring and see who comes", the warmest route, ending on the phone number.
