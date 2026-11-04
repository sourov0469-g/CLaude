# GATE-NEW · Tell Us (Consult) · V3 "The postcard"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 2, section 7 of 7, the last section of pass 2. Every other pass-2 gate (Hero, How a job runs, Financing, Our Work, Reviews, Where We Build) was accepted by Muse.

The default is unchanged: V1 (the guided sentence with the call card) stays version 1, and V2 (the conversation) is untouched. No backups ship.

**How to see V3:**
- **Header switch.** Use the Consultation "1 · 2 · 3" switch while the section is in view. On phones it is the "‹ 1/3 ›" stepper.
- **Built page.** `elbaz-homepage.html?consult=3` opens V3 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Boffi** is the primary ("kitchens, baths and wardrobes as architectural room chapters under one brand narrative"). Its room chapters are taken: the enquiry starts with the room. Choose the chapter you want to talk about (kitchen, bathroom, whole home, outdoor living), and that room, one of the firm's own photographs, becomes the front of your card.
- **Signature move:** the postcard.
  - The enquiry is a postcard. On the front, the room you choose; it changes as you choose, with a caption naming the firm's project it shows.
  - Turn the card over and the back is a real postcard: your message on the lined left half, and on the right the address lines. It is addressed to Sales@elbazconstruction.com, from you (name, property address, phone, email, the easiest way to reach you). A stamp corner carries the licence.
  - The card turns in 3D, both ways, by button.
  - "Open in email" composes the same note V1 writes, in the visitor's own mail app, with consent. It is never claimed as sent.
- **Style family:** stationery, a postcard (a physical two-sided object, paper and photograph).
  - V1 is a written note with inline blanks beside a call card.
  - V2 is a messaging thread.
- **The owner's laws for this section:**
  - not flat, real interactivity (choose the room, turn the card, write on it);
  - the phone stays one tap away (a Call button with the live open line beside the card);
  - the fields, consent and privacy lines are the firm's own (FACTS.md "Contact"), and nothing new is asked;
  - mailto only, never "sent".
- **WEB-SKILLS tags per element:**
  - **Card:**
    - S0062: transform only (one rotateY on the card);
    - S0089 (system easing for the turn);
    - S0063 (the front photograph changes behind a short blur, never two photographs crossfaded);
    - S0083: one object.
  - **Room choice:** S1018 (a radio group: arrows); S1441 (44px).
  - **Fields:** S1442 (labels, input types, autocomplete, honest validation; an error on the back turns the card to it).
  - **Call:** S0226 (the call and the proof by the action).
  - **Accessibility:** the hidden side of the card is inert, so focus never lands on the side you cannot see.
  - **Reduced motion:** S0400 (the card turns at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 is a paragraph you complete, and V2 a chat that asks one thing at a time. V3 is an object: you pick a picture, turn the card over and address it.
  - **Why it is better.** The first step is a single tap on a photograph of the room, the most natural way for a homeowner to start. The card's back shows the whole enquiry as one familiar shape. The email the firm receives is the same honest note.

## What was built
**Files:**
- `remodeling/src/sections/consult.html`: V3 added in the existing version system (`.ver[data-v="3"]`, prefix `pc__`, checked free).
- `css/sections/consult.css`: a V3 block appended.
- `js/sections/consult.js`: a `3:` definition.
- **Shared helpers reused:** `check()` and `show()` (the same messages), `liveClear()`, `compose()` (the same mailto and consent line), `done()` (the same "should now be open… Send it from there", never "sent") and `EZ.consultMail` (the seam the QA tools intercept).
- The retired calm form already sits on its own key (`calm`), so slot 3 was free. V1 and V2 are untouched.

**Beside the card:**
- the eyebrow, the H2 "Send us a card. Your room on the front." and the lead;
- a Call (754) 236-0675 button (`tel:`) with the live open or closed line from the published hours (`EZ.openStatus`, Miami time);
- the hours and the office address, verbatim.

**The room** (above the card): the firm's own six project choices as a radio group of 44px chips. They are the kitchen, a bathroom, the whole home, outdoor living, something else (opens a short field), and not sure yet.

**The front:**
- Before a choice: four of the firm's rooms as a collage, labelled "Choose a room above".
- The kitchen, a bathroom, the whole home and outdoor living each show one of the firm's own photographs:
  - Navy Blue Shaker Kitchen;
  - Polished-Concrete Primary Bath;
  - Modern Farmhouse Whole-Home Renovation;
  - Waterfront Backyard and Outdoor Living.
  - Each is captioned "Our work: …" with its title, so nobody mistakes it for their own home.
- Not sure yet shows the collage.
- Something else shows the visitor's own words, typed live onto the card.
- The picture changes behind a short blur (S0063). A stamp corner carries the Elbaz mark.

**The back** (a postcard):
- **Left, ruled lines:** "Anything else you want us to know (optional)" and "The easiest way to reach me is" (a call, a text, an email, whichever is easiest).
- **Right:**
  - a postmark ("Miami, FL") and a stamp;
  - "To Sales@elbazconstruction.com";
  - "From", with Full name, Property address, Phone and Email on address lines.
- On phones the address side comes first and the message below.

**The turn:**
- "Turn the card over" / "See the front" (aria-pressed) turns the card with one rotateY (0.76s).
- The side you cannot see is inert and hidden from assistive technology, so focus never lands on it.
- Choosing a room while on the back turns the card to the front to show it.

**Sending:**
- The consent box and the privacy line are the firm's, then "Open in email" with 4.8 · 343 and the licence.
- If anything on the back is missing, the card turns to the back first, then shows every message and focuses the first.
- Without consent nothing is composed.
- With consent, the mailto opens with V1's exact lines and the consent line, and the status says the email app "should now be open". It is never claimed as sent.

**Reduced motion (S0400):** the card turns at once; there is no blur and no deal-in.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Tell Us V3** | **8** | **8** | **8** | **10** | **8.2** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.4 + 1.6 + 1.0 = 8.2.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **One familiar object:** a photograph on the front, a written postcard on the back, a real turn between them.<br>**The firm's own photography** puts the enquiry in a finished room from the first tap.<br>**Heights:** 1237px at 1440 (the card 778 × 518), 1524px at 768, 1851 to 1870px on phones (the back is 779px tall there, and the front fills it). | **Phones:** the section is long (the back carries every field, one under the other). **Desktop:** the left column is quiet once the card is filled. |
| **Usability 8** | **The whole flow, verified at 1440 mouse, 768 and 390 touch, and reduced motion:**<br>• choosing the kitchen shows the kitchen with its caption;<br>• "Open in email" with an empty back turns the card, shows all five messages and focuses Full name, while the front is inert;<br>• no consent, nothing composed;<br>• with consent, the mailto goes to Sales@elbazconstruction.com with V1's exact lines (name, the kitchen, the address, "a text, on … or at …", "Anything else: …") and the consent line;<br>• "See the front" turns back and makes the back inert again.<br>**Measures:** 0 targets under 44px; 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | A visitor must turn the card to reach the contact fields. The turn button is filled in ink once a room is chosen to point the way, but it is one more step than V1's all-at-once note. |
| **Creativity 8** | A move the section did not have: the enquiry as an object, starting from a picture of the room, with a turn to its back. | A postcard is a familiar metaphor; the craft is the honesty (captioned photos, the same email) and the inert, accessible turn. |
| **Content 10** | **Fields, consent and privacy:** the firm's own (FACTS.md "Contact"), and nothing new is asked. The email lines are identical to V1's.<br>**Mail:** mailto only, to Sales@elbazconstruction.com, never claimed as sent.<br>**Facts:** the hours, address and phone are verbatim; the photographs are the firm's, captioned with their published titles.<br>Locks **0 fails**; outside links **0**. | The H2, the lead and the card's headings ("To", "From") are my wording; Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V3 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no broken images;
- nothing claimed sent; mailto only;
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **On phones the front kept its 3:2 shape while the card grew to the back's height,** leaving a blank gap below the photograph. Fixed: the front is at least 3:2 and stretches to the card's full height.
2. **The licence lock failed:** the stamp's postmark carried "CBC1265280" on its own, a fragment of the locked licence string. Fixed: the postmark reads "Miami, FL" (the office city), and locks are back to 0 fails. The full licence string stays verbatim by the action.

## Defects remaining (honest)
- **Phones:** the section is long (about 1850px).
- **One extra step:** turning the card is an extra step compared with V1.
- **No storage:** if the visitor reloads, the card starts again (nothing is stored, by design).
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Boffi, primary)
- **Transferred:**
  - the room as the chapter you enter by;
  - one room at full size, the firm's own;
  - a calm, architectural presentation.
- **Not transferred:**
  - Boffi's catalogues and configurators;
  - wardrobes;
  - its typography and identity.
- **The postcard** is the site's own object, not Boffi's.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · the guided sentence + call card (default) | V2 · the conversation | V3 · the postcard |
|---|---|---|---|
| **Composition** | The note with inline blanks beside a call card | One messaging window, the call in its header | A two-sided card, the call and open line beside it |
| **First step** | Read the note, fill the blanks | Answer "Who are we talking to?" | Tap the room you want to change |
| **The fields** | All at once in a sentence | One at a time | On the back, as a postcard |
| **The result** | The same email lines, mailto, never "sent" | The same | The same |
| **Where it is weaker** | Text-heavy at first sight | No overview | One turn to reach the fields; long on phones |

**My call:** V3 is a genuine challenger. It is the most visual and inviting start of the three, a photograph of the room, while the email stays exactly as honest. V1 remains the fastest for someone who wants everything in view, and V2 the lowest-effort on a phone. The defaults are not changed; the owner picks.

## Evidence (`qa/new/consult-v3/`)
- `v3-1440-front-room-errors-filled-turning.jpg`: the collage front; the kitchen chosen; the back with all errors after "Open in email"; the back filled with consent; the card mid-turn.
- `v3-390-states.jpg`: the phone.
- `v3-768.jpg`: the tablet.
- `v3-1440-reduced-motion.jpg`: reduced motion.
- `v3-single-file.jpg`: V3 picked through the header switch inside the delivered single HTML file at 1440 and 390, with "a bathroom" chosen.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.

## Pass 2 complete
All seven homepage sections now carry a third version each, gated in order. The defaults are unchanged.
- Hero V3 "The viewfinder"
- How a job runs V3 "The chapters"
- Financing V3 "The board"
- Our Work V3 "Find a room like yours"
- Reviews V3 "The solid block"
- Where We Build V3 "104 threads"
- Tell Us V3 "The postcard"

Every switch in the delivered single file now reads "1 · 2 · 3" (or "‹ 1/3 ›" on phones). Per the addendum, a further pass begins only after this gate is accepted.
