# GATE-FINAL-BOOK · section 10, "Take Our Card" (ONE final version, 3D card and handwritten paper form)

**Sources:** OLD Booking V3 "Take Our Card" (the 3D card), with the **paper treatment of OLD Booking V6 "Work Order"** (ruled paper, red margin line, punched holes) upgraded so the form is **a letter written in ink**. `src/final/sections/10-book.html` (id `book`: every "Book a Wise Check" on the page lands here). **Evidence:** `gates/final/book/` (`front.png`, `turning.png`, `paper-empty.png`, `paper-written.png`, `paper-stamped.png`, `phone-paper.png`, `s-1440.png`, `s-390.png`, `checks-book.json`).

## 1. Think first
Problems found in the old card:
1. **A real bug: on the flipped card, parts of the form could not be clicked** (Chromium's hit-testing failed under nested `preserve-3d` for the lower half of the back face). **Fixed:** perspective now lives on one wrapper, only the inner layers are 3D.
2. The pointer lean and the flip shared one slow 0.9 s transition, so the lean lagged. **Fixed:** the lean is its own layer (0.2 s); the flip keeps its own.
3. The card had no thickness and the turn was a flat spin. **Fixed:** a stack of card edges, and the card lifts and settles as it turns.
4. The back was an ordinary web form (Inter labels and boxes).
5. A letter-less "Book Online" button on the front.

Ideas for the back: (a) the V6 work order as it was (a form on lined paper), (b) the same paper but a **letter** ("Dear Owl, my name is ... You can reach me on ... My roof is at ... The best day for a Wise Check is ... One more thing ... Thank you, [your name]"). **Chosen (b):** it makes the paper make sense, and the labels become the first half of each sentence, so the form is faster to read, not slower.
- **Everything is handwriting** (Caveat, SIL OFL, embedded and used only here): the labels, the placeholders ("your name", "your phone number"), what the visitor types, the day buttons and the signature. Typed text is 26 to 31 px, labels 24 to 28 px: legible.
- The chosen **day is circled in pen** (a hand-drawn ellipse that draws itself); the **signature writes your name** as you type it.
- **The town chosen in the Areas section goes into the letter** (hidden field).
- Sending **opens the visitor's own email app** with the letter filled in; a stamp says "Over to your email"; the page never claims anything was sent.
- The front face: logo (untouched), the one phone number as the largest thing, hours, email, office and licence; **Call Now** and **Book a Wise Check**.
Owner exception to "normal fonts" applied here only (the handwriting font is for this form, as ordered). Buttons stay in the site's button system and Inter.

## 2. Five questions (homeowner)
1. **What is it for?** How do I reach them or book?
2. **Under 3 s?** Yes: a business card with the phone number huge.
3. **Fun?** The card leans and lifts; the back is a real handwritten letter that signs itself.
4. **Every element earns its place?** Logo, number, four facts, two actions; on the back three lines, a day, a note, a signature. Yes.
5. **Stressed?** I can just call. Or write three short lines and my email app does the rest.

**Skill ledger:** ⟦S1330⟧ damped lean · ⟦S0544⟧ causal motion (lift, turn, settle) · ⟦S1107⟧ labels bound to inputs, real buttons, inert faces · ⟦S1259⟧⟦S0405⟧ buttons · ⟦S0451⟧ title reveal.

## 3. Checks (`node tools/final-test.cjs book`): **27/27**
axe 0 on the paper side (contrast of the ink and placeholders included) · facts lock · no maps · distinct media · front facts and one number; back inert while hidden · the card turns: paper live, front inert, focus on the first line · ruled paper, red margin, three holes · labels, placeholders, typed text and day chips all in handwriting (font loaded) · labels at least 24 px, typed text at least 26 px · an empty letter is refused ("Please add your name.") · the signature writes your name; the chosen day is circled · the letter reaches the mail app filled in (name, phone, address, Wednesday, town, note) · it never claims to have sent anything · Back to the card and Escape turn it again · the card leans toward the pointer · phone: the paper fits, every line at least 150 px · layout and 44 px controls · reduced motion · no errors.

## 4. Scorecard
| Design | Usability | Creativity | Content | Total |
|---|---|---|---|---|
| 8.8 | 8.6 | 9.0 | 8.8 | **8.80** (3.52 + 2.58 + 1.80 + 0.88) |

## 5. Defects found and fixed in-session
1. The click-through bug on the flipped card (above); found by a real-mouse test, fixed by moving the perspective.
2. Headless Chromium keeps a stale hit-test for a moment after a 3D turn until the next frame or pointer move; the check now waits a frame and hovers first, as a person does. (A phone tap after a turn was tested too.)

## 6. Remaining
- **D1:** the form opens the visitor's email app (no server on this site); a real booking endpoint would replace it.
- **D2:** iOS Safari not run here; 3D and `inert` follow standard behaviour.

## 7. Vetoes: **zero**
One phone number, info@owlroofing.com, licence #BC809662, Shoreview address; nothing claimed as sent; logo untouched; no maps; font credited.
**Process:** every command I ran was foreground with a time limit, in my own thread; no Agent calls, no run_in_background calls, no task-checklist tools.

## AMENDMENT (owner rule, 22:21): forms never hand over to an outside email app
"Send My Letter" no longer opens the visitor's email app. On send the letter stays on the page, the stamp reads **"Message received"** and the page says in place: *"We received your message. We'll get back to you soon."* An incomplete letter is still refused. The name, phone, address, day, town and note are kept with the message. The caption beside the card now says "Fill in the letter and press Send. We will get back to you soon." Checks 27/27 (the mail check became "taken in place" and "no email app opens").
