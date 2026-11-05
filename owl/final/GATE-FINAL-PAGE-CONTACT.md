# GATE-FINAL-PAGE-CONTACT · the Contact page (`#/contact`, the last inner page, ONE final version)

**Files:** `src/final/pages/contact-top.html`, `contact-form.html` (route `#/contact`; header "Contact" and footer link). **Evidence:** `gates/final/contact-top/`, `gates/final/contact-form/` (`paper-empty.png`, `paper-written.png`, `paper-stamped.png`, `phone-paper.png`), `gates/final/pages/contact-sheet.jpg`.

## 1. What it is
**Talk to Owl.** Four cards on a table: **Call** ((651) 977-6027 set as large type, a Call Now button), **Email** (info@owlroofing.com, Copy), **Office** (Owl Roofing LLC, 1000 County Rd E #230, Shoreview, MN 55126, Copy), **Hours** (Monday to Saturday 08:00 to 18:00, a Mon-to-Sun strip with today marked, and an honest "Open now: it is 1:12 pm in Shoreview" or "Closed right now ... we open tomorrow at 8 am" on Shoreview's clock).
**Write Us a Letter.** The paper form: ruled paper, a red margin line, three punched holes, a slight tilt; "Dear Owl, my name is ___, you can call me on ___, or write to me at ___, I am writing about (A Wise Check / A repair / Storm damage / A new roof / Something else), here is my message: ___, Thank you, [your name]". **Labels, placeholders, the visitor's typing, the message box, the topic words and the signature are all handwriting** (Caveat, OFL, same face as the booking card). The chosen topic is circled in pen; the signature writes your name as you type.
**Submit:** the page refuses an unfinished letter in plain words ("Please add your name." / "Please add a phone number or an email address, so we can reach you." / "Please check your email address." / "Please add your message.") and otherwise says in place, *"We received your message. We'll get back to you soon."*, with a "Message received" stamp. It never opens an email app and there is no `mailto` submit path. The message goes through `OWL.submit`; **`OWL.endpoint` is left empty and marked in the code (`CONFIGURABLE ENDPOINT`) to be set at launch; nothing is wired to any third-party service.** Until it is set the message is only kept in the visitor's browser.
Only `tel:` and `mailto:` links to the contact details exist on the page; no other external link; no map.

## 2. Think first (ideas weighed)
(a) a plain form: rejected, the owner's paper model is the standard; (b) the paper form beside a map: rejected, no maps; (c) **chosen:** the details first as four cards (a visitor who only wants the phone number gets it in one glance), then the letter. The email field is optional if a phone number is given, and vice versa, because a visitor may have only one. The hours card says honestly whether we are open right now, on Shoreview's clock, so a visitor in another time zone is not confused.

## 3. Governing design reference, with transfers
**Governing reference:** the accepted homepage **Booking "Take Our Card"** paper letter (section 10; the Work Order paper of OLD Booking V6, upgraded to ink) for the form; and **Longbow's end card and spec row** (live-studied in the reset cycle: the phone number set as type, one action, facts in a strict row) for the details.
**Transfers:** from the Booking paper: the ruled lines, red margin, punched holes, handwriting for every word the visitor sees or types, the circled choice, the self-signing name, the "Message received" stamp, the in-place success. From Longbow: the number as the largest thing on the page, one action per card, facts in a plain strict grid. From the footer (section 11): Shoreview's-clock open/closed sentence and the copy-in-one-tap buttons.

## 4. WEB-SKILLS tags cited (each applied and checked)
⟦S1441⟧ fitts-law (the number is the biggest target) · ⟦S1259⟧ touch-targets (buttons, topic words, copy buttons at least 44 px) · ⟦S0462⟧ interactive-hit-areas · ⟦S1107⟧ keyboard-navigation (labelled inputs, topic group, visible focus) · ⟦S1049⟧ focus-styles (amber underline focus on every line) · ⟦S0070⟧ better-accessibility (every input has a real `label`, `role=status` success, `aria-invalid` on refusals) · ⟦S1440⟧ feedback-patterns (refusal in plain words, circle, stamp, success) · ⟦S1434⟧ visual-hierarchy (one h1, the number, then the letter) · ⟦S0076⟧ better-writing (true, plain lines; nothing invented) · ⟦S0451⟧ masked-reveal (title) · ⟦S0544⟧ motion-doctrine (one easing for the stamp and circle) · ⟦S0400⟧ accessible-animation (reduced motion removes the stamp scale and circle draw).

## 5. Checks: **44/44** (`final-test.cjs contact-top` 18/18, `contact-form` 26/26)
axe 0 on both parts · facts lock · no maps · distinct media (none) · the page opens alone with four cards and every real detail exact · only tel:/mailto: links, no other external link · week strip and honest open/closed line, tested at Wednesday 10 am and Sunday on a faked Shoreview clock · copy · ruled paper, red margin, three holes · labels, placeholders, typed text, message and topic words in handwriting (font loaded) · handwriting at least 24 px labels and 26 px typed · the four refusals · the signature writes the name and the topic is circled · on send the page says the success sentence, stamps the letter, opens no email app (no navigation) and has no mailto in the form · the letter is kept with name, email, topic and the full two-line message · endpoint empty · phone: the paper fits, every line at least 150 px · sharp, layout and 44 px controls at 1440/768/390 · reduced motion · no errors.

## 6. Scorecard (Design 40 · Usability 30 · Creativity 20 · Content 10)
| Category | Score | Evidence |
|---|---|---|
| Design | 8.6 | Same world as the homepage: original palette, Inter for everything except the ink, the paper reused with its tilt and holes; cards with real depth; screenshots `contact-sheet.jpg`, `paper-*.png`. |
| Usability | 8.7 | The number in one glance; four plain refusals; either phone or email is enough; every control 44 px+; keyboard and phone tested; no sideways scroll. |
| Creativity | 8.5 | A handwritten letter that signs itself with a pen-circled topic; hours that speak Shoreview's clock. |
| Content | 8.8 | Every detail exact (phone, email, LLC, address, hours); nothing invented; honest about hours and about what happens on send. |
| **Weighted** | **8.63** | 8.6×0.4 + 8.7×0.3 + 8.5×0.2 + 8.8×0.1 = 3.44 + 2.61 + 1.70 + 0.88 |

## 7. Defects found and fixed in-session
1. The refusal logic first tangled phone and email cases; rewritten as four clean rules (name, bad email, bad phone, neither) and tested.
2. The old shared YouTube helpers and the `mailto` form helper were still in the file as dead code; both are stripped at build, so the file has no YouTube and no mailto navigation anywhere.
3. A sloppy contrast reading in the whole-page axe came from scrolling while the sticky header overlapped a chip; the test now waits for the scroll to finish (a fresh load is clean on repeated runs).

## 8. Remaining defects (honest)
- **D1 Nothing reaches Owl until `OWL.endpoint` is set** (owner decision, left empty on purpose).
- **D2** The handwriting face is declared by the booking card's CSS; the Contact page uses it, so the two travel together in this file.
- **D3** iOS Safari is not available here (Chromium only); 3D, `inert` and clipboard follow standard behaviour but are not run on a device. The copy button falls back honestly ("Select it to copy") if a browser refuses.
- **D4** The page has no photograph (no map by the owner's rule; the homepage holds the real photos).

## 9. Vetoes: **zero**
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.
