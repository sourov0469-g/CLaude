# GATE-NEW · Video 15 · "Keep Us on the Fridge" (fifth of five new Video versions, homeowner-simple pass)

## Plan line (written before building)
- **The one homeowner sentence:** *Keep the crew's number handy — for whenever your roof needs us.*
- **Primary governing reference:** Cowboy (family-fronted warmth: an everyday home object, plain words, one useful action).
- **Style family:** the family fridge. A light steel fridge door holds a print of the crew, pinned by an Owl magnet, with the phone number spelled out in letter magnets.
- **Signature move:**
  - On arrival the letter magnets snap onto the door one after another, with a small settle, and spell **651 977 6027**. The whole row is the call link.
  - The crew print plays Owl's own film.
  - **Save Our Number** downloads a contact card (vCard) holding only the locked facts:
    - Owl Roofing LLC;
    - (651) 977-6027;
    - info@owlroofing.com;
    - 1000 County Rd E #230, Shoreview MN 55126;
    - Mon–Sat 08:00–18:00.
- **How it differs from Video V1–V14, and why it is better:**
  - It is the only version that gives the homeowner something to keep: the number in their contacts, the way families keep the plumber's magnet on the fridge.
  - The film is the friendly face on that number.
- **Truth guard:** the contact card holds only the locked facts. It adds no website, no extra numbers and no titles.
- **Skill ledger, per element:**
  - Title reveal: ⟦S0451⟧.
  - Fridge door: static.
  - Crew print with the film: ⟦S1046⟧.
  - Owl magnet: ⟦S0405⟧ wiggle on hover.
  - Letter magnets snapping on: ⟦S0489⟧ drop and settle, staggered.
  - Number row as a tel link: ⟦S0405⟧.
  - "Save Our Number" (vCard download): ⟦S0405⟧, ⟦S0076⟧ label.
  - "Get My Roof Checked" and "Watch the full film": ⟦S0405⟧, ⟦S1046⟧.
  - Reduced motion: ⟦S0400⟧. Magnets already in place, poster only.

## What was built
- **Left:** the title **Keep Us on the Fridge** and one line: "These are the people you'll get when you call. Keep the number handy for whenever your roof needs us." Then:
  - **Save Our Number**, which downloads a contact card;
  - **Get My Roof Checked**;
  - "Watch the full film".
- **Right:** a light steel fridge door with its handle.
  - A print of Owl's own crew film, playing, is pinned at a slight tilt by a round Owl magnet.
  - Under it, ten chunky letter magnets in amber, ink, cream and brown snap onto the door one after another and spell **651 977 6027**. The whole row is the call link ("Call (651) 977-6027"), with "Tap the magnets to call" underneath.
- **After Save Our Number:** the page says "Contact card downloaded: Owl Roofing, (651) 977-6027. Open it to add us to your phone."
- **Phone:** the words come first, then the fridge. The number wraps as 651 977 / 6027, never inside a group.

## Self-check (the owner's five questions), answered from my own screenshots at 1440, 768 and 390
1. **What is it for?** "Keep the crew's number handy, for whenever your roof needs us."
2. **Do I get it in under three seconds, without reading?** Yes. A fridge with a photo of the crew and their number in magnets is a picture every family knows: "the people we call".
3. **Is it interesting, playful or fun? What exactly makes it so?**
   - The magnets clatter on one by one with a little bounce, and each sits at its own tilt.
   - The Owl magnet wiggles when you point at the photo.
   - It ends with something genuinely useful: the number saved to your phone.
4. **Is every element here for a clear reason?**
   - Photo and film: who you're calling.
   - Number magnets: the number, big and tappable.
   - Save Our Number: keep it.
   - Get My Roof Checked: or book now.
   - Full film: for the curious.
   - Owl magnet: the brand, and the thing holding the photo.
   - Things I questioned:
     - **The fridge handle:** kept, because it is what makes the panel read as a fridge door.
     - **Other everyday fridge clutter** (a shopping list, a child's drawing): **left out** as noise.
   - Nothing pointless remains.
5. **Does it fit a stressed homeowner?** Yes, best of all for a later moment.
   - The number is the biggest thing on the fridge, and tapping it calls.
   - Saving the contact helps the next time something goes wrong.
   - With reduced motion the magnets are simply there.

**Verdict: passes**, after the fixes below.

## Scorecard
| Category | Weight | Score | Why |
|---|---|---|---|
| Design | 40 | 8.6 | A warm, everyday object done cleanly in the brand palette. The number becomes the visual. |
| Usability | 30 | 9.2 | The biggest phone target in the whole section, plus a one-tap save to contacts. |
| Creativity | 20 | 8.8 | A fridge door with letter magnets as the phone number is new for the brand, and it makes the video useful beyond watching. |
| Content | 10 | 9.4 | The contact card holds only locked facts (name, phone, email, address, hours), with no invented URL. Owl's own film. |
| **Weighted** | | **8.88** | Pass: at least 7.0, no category below 6.0, zero vetoes. |

**Checks:** `gates/ladder/NEW-video-15/checks.json`, 21/21.
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
- **Video 15's own checks:**
  - the magnets snap on and spell 6519776027 as one named tel link;
  - the number never splits inside a group;
  - the print plays the film under the Owl magnet;
  - the downloaded vCard contains exactly the locked facts and no URL. The test opens the real downloaded file and reads it.
  - the page confirms the download;
  - booking;
  - YouTube.

**Homepage regression after the Video five:** `home-verify` 50/50. The defaults are untouched.

**Evidence:** `gates/ladder/NEW-video-15/`, with 2× viewport shots at 1440, 768 and 390.

## Defects found and fixed
- **Split number.** At 1440 the number wrapped with the last "7" alone on a new line. The digits are now grouped 3-3-4, each group never breaks, and the magnets are slightly smaller.
- **Hidden Owl magnet.** The Owl magnet sat half behind the print. It is now layered on top.

**Remaining, named honestly:**
- What the downloaded contact card does depends on the phone. Most offer "Add contact"; some desktop browsers just save the file.

## Reference transfer
- **Transferred from Cowboy:** warmth through an everyday family object, plain words, and one useful action.
- **Not transferred:** the lifestyle photography of a product. The crew film is the "product".

## Compared with the section's previous best
- **Against V1:** the same real film. Here it is the friendly face on the phone number, and the visitor can keep the number.
- **Against Videos 11–14:**
  - 11 is the fastest to the film;
  - 12 is the warmest (the doorbell);
  - 13 is the most tactile;
  - 14 starts from the problem;
  - 15 is the most useful: the phone number, made unmissable and saveable.
