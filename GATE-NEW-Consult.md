# GATE-NEW · Tell Us (Consult) · V2 "The conversation"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 1, section 7 of 7, the last section of the pass. The Hero, How a job runs, Financing, Our Work, Reviews and Where We Build gates were accepted by Muse.

The default is unchanged: V1 (the guided sentence with the call card) stays version 1 and its code is untouched. No backups ship.

**How to see V2:**
- **Header switch.** Use the Consultation "1 · 2" switch while the section is in view. On phones it is the "‹ 1/2 ›" stepper.
- **Built page.** `elbaz-homepage.html?consult=2` opens V2 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Igloo Inc** is the primary ("one continuous scroll gesture, no hard section cuts: continuity discipline"; never its loading pattern). Its continuity discipline is taken: the enquiry is one continuous thread that grows as you answer. No pages, no step counter, no cuts between steps; everything you said stays in view above.
- **Signature move:** the conversation.
  - A messaging window with the firm's header: the Elbaz mark, a live "Open now" or "Closed" line from the published hours, and a Call button.
  - The firm asks one question at a time (name, what you want to change, where, phone, email, how to reach you, anything else). You answer by tapping a reply or typing a short one; each answer becomes your bubble, and you can tap any bubble to change it.
  - The thread ends as the email draft, the same note the firm receives. With the consent box ticked, "Open in email" composes it to Sales@elbazconstruction.com in your own mail app. It is never claimed as sent.
- **Style family:** a messaging thread (conversational UI). V1 is a single written note with blanks set inline beside a call card.
- **The owner's laws for this section:**
  - not flat, real interactivity (the owner on the old consult: "phone interactive, flat, no interactivity");
  - the phone stays one tap away (in the window's header, with the live open line);
  - the form fields, consent and privacy lines are the firm's own (FACTS.md "Contact");
  - mailto only, never "sent".
- **WEB-SKILLS tags per element:**
  - **Thread:** S1437 (conversational UX: one question at a time, quick replies, an editable history); S1440 (feedback patterns: the typing indicator, inline errors, a calm confirmation).
  - **Fields:** S1442 (form design: labels, input types, autocomplete, honest validation); S1441 (44px replies).
  - **Window header:** S0226 (proof and the call by the action).
  - **Motion:** S0089 (system easing for arriving bubbles); S0062 (transform and opacity only).
  - **Accessibility:** a `role="log"` thread; each question labels its input; S1018 (keyboard: Enter sends, arrows move between replies).
  - **Reduced motion:** S0400 (no typing delay, no slides).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 shows every blank of the note at once beside a call card: you read the whole form, then fill it in. V2 asks one thing at a time in a single conversation, the way a homeowner would actually message a contractor, with the phone in the header.
  - **Why it is better.** The first step is one easy question instead of a full form, which lowers the effort to start, especially on a phone. The history stays visible and editable, and the result is still the same honest email.

## What was built
**Files:**
- `remodeling/src/sections/consult.html`: V2 added in the existing version system (`.ver[data-v="2"]`, prefix `ct__`, checked free).
- `css/sections/consult.css`: a V2 block appended.
- `js/sections/consult.js`: a new `2:` definition.
- **Shared helpers reused:** the section's `compose()` (the same mailto, the same consent line appended), `done()` (the same "your email app should now be open…" message, never "sent"), and `EZ.consultMail` (the same seam the QA tools intercept).
- V1 is untouched.

**Housekeeping, recorded.** As in Our Work, `consult.js` still carried the retired calm form's definition under key `2`. Its markup left the file in Final; it would have initialised itself on any new slot 2. It now sits under the key `calm`, which no version uses, with a comment. Nothing delivered changed.

**The window:**
- **The header:** the Elbaz mark, "Elbaz Construction", a live open or closed line from the published hours (`EZ.openStatus`, Miami time), and a Call button (`tel:`).
- **The thread** (`role="log"`): the firm's bubbles on the left; your answers on the right as buttons. Tap any answer to change it.
- **The composer** at the bottom: quick replies or a single field, a send button, an inline error line, and "Skip this one" for the optional question.

**The questions** (the firm's own fields, one at a time):
1. **Name:** "Who are we talking to?"
2. **Project:** the kitchen, a bathroom, the whole home, outdoor living, something else (opens a short field), or not sure yet.
3. **Address:** the property address.
4. **Phone:** with area code, checked for 10 digits.
5. **Email:** format checked.
6. **The easiest way to reach you:** a call, a text, an email, or whichever is easiest.
7. **Anything else:** optional, can be skipped.

**Behaviour:**
- Each question arrives after a short typing beat (motion only).
- Focus moves to the new question only after the visitor has started, so the page never steals focus on scroll.
- Changing an earlier answer mid-way returns you to the question still waiting, without asking anything twice.

**The end:**
- The thread becomes "Your note to Sales@elbazconstruction.com" with the exact lines V1 writes, then the consent box (the firm's wording), the privacy line (the firm's wording), and "Open in email" with 4.8 · 343 and the licence.
- Without consent, nothing is composed and an inline error asks for the tick.
- With it, the mailto opens in the visitor's own mail app, and the status line says the app "should now be open… Send it from there". It is never claimed as sent.

**Reduced motion:** no typing beat, no slides; everything else is the same.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **Tell Us V2** | **8** | **9** | **8** | **10** | **8.5** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.7 + 1.6 + 1.0 = 8.5.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **A familiar, calm object:** a messaging window in the site's materials (paper bubbles, ink answers, the clay call and send buttons). The header carries the firm and the live open line.<br>**Height:** 469px at 1440 before you start, under one screen everywhere (803px on phones), growing only as you answer. | It is a known pattern (a chat), done well rather than invented. On desktop the left column is quiet once the conversation grows (the heading is sticky). |
| **Usability 9** | **The whole flow, verified at 1440 mouse, 390 touch and reduced motion:**<br>• an empty name gives "Please add your full name.";<br>• a short phone gives "Please include the area code.";<br>• "ana@" gives "That email address does not look complete.";<br>• "something else" opens a field;<br>• a mid-way change returns to the waiting question (7 questions, 7 firm bubbles: none repeated);<br>• Skip works;<br>• no consent, nothing composed, with an inline error;<br>• with consent, the mailto goes to Sales@elbazconstruction.com with V1's exact lines and the consent line.<br>**Keyboard:** Tab lands in the field; Enter sends; focus moves to the replies; arrows move through them; Enter picks.<br>**Targets:** at least 44px (the consent checkbox uses the site's 24px box inside a full-width label, as in V1). 0 text under 13px; 0 overflow; 0 errors. | A visitor who wants to see every field first gets them one at a time; V1 serves that visitor better. |
| **Creativity 8** | A move the section did not have: the enquiry as a conversation with the firm, with the phone in the window's header and every answer editable in place. | Conversational forms are an established pattern. The craft is in the honesty (the draft is the real email) and the edit-in-place, not in novelty. |
| **Content 10** | **Fields and lines:** the fields, consent and privacy lines are the firm's own (FACTS.md "Contact"); the email lines are identical to V1's.<br>**Mail:** mailto only, to Sales@elbazconstruction.com, never claimed as sent.<br>**Facts:** the hours and the address are verbatim.<br>Locks **0 fails**; outside links **0**. | The firm's question bubbles ("Who are we talking to?", "Good to meet you, …") and the H2 "Tell us. One question at a time." are my wording, in the firm's voice. Muse should confirm them. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V2 at 1440, 1024, 768, 414, 390 and 360, reduced motion, the single file);
- nothing claimed sent;
- mailto only;
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **A retired definition would have hijacked slot 2.** The calm form's dead JS was moved to an unused key, with a comment.
2. **A change made mid-way re-asked the waiting question,** so a duplicate bubble would appear. Fixed: after an edit, the composer returns to the question still waiting.
3. **On phones the send button stretched across the row and squeezed the field to a sliver.** The site-wide phone rule "every submit button full width" applied to it. Fixed: the round send button is exempt, and the real action, "Open in email", is the full-width one, as in V1.

## Defects remaining (honest)
- There is no overview of all fields before starting (by design: V1 covers that).
- If the visitor reloads, the conversation starts again (nothing is stored, deliberately: no personal data kept in the browser).
- The firm's bubble wording is mine (see Content).
- No assets needed or requested.

## Reference: transfers and non-transfers (Igloo Inc, primary)
- **Transferred:**
  - continuity discipline: one thread that grows, no steps, pages or counters;
  - nothing you did disappears (the whole history stays above, editable).
- **Not transferred:**
  - Igloo's loader and its weight class (the annex bans it);
  - WebGL;
  - its visual identity.
- **Other annex entries:** none were used.

## Comparison with the section's previous best (V1, the default)
| | V1 · the guided sentence + call card (default) | V2 · the conversation |
|---|---|---|
| **Composition** | Two columns: copy and an interactive call card left, the note with inline blanks right | One messaging window, the heading beside it, the call in the window's header |
| **Filling it** | All blanks visible at once; you write the note | One question at a time; you answer, tap or type |
| **Changing an answer** | Edit the blank | Tap your bubble |
| **The result** | The same email lines, mailto, never "sent" | The same |
| **Where V1 still wins** | You see the whole note at once; the call card is richer (copy number, ringing handset) | V2 is the lower-effort start, especially on phones |

**My call:** V2 is a genuine challenger. It is the easiest first step of any version of this section, and it stays exactly as honest as V1. V1 is better for a visitor who wants the whole form in view. The defaults are not changed; the owner picks.

## Evidence (`qa/new/consult/`)
- `v2-1440-conversation.jpg`: the window arriving; the email error mid-flow; the finished draft with consent unticked; then with consent and the email opened.
- `v2-390-conversation.jpg`: the same on a 390 phone.
- `v2-768.jpg`: the tablet.
- `v2-single-file.jpg`: V2 picked through the header switch inside the delivered single HTML file at 1440 and 390, with the first answer given.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.

## Pass 1 complete
All seven homepage sections now carry one new version each, gated in order. The defaults are unchanged.
- Hero V2 "The wall"
- How a job runs V2 "One house, eight marks"
- Financing V2 "The money map"
- Our Work V2 "Room chapters"
- Reviews V2 "The rating, filled"
- Where We Build V2 "The map table"
- Tell Us V2 "The conversation"

Per the addendum, pass 2 (a third version of each, in the same order) begins only after this gate is accepted.
