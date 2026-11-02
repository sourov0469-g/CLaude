# GATE: Home 10 · Consult

**Built:** TWO versions, per `PHASE1-PLAN.md` row 10 (Muse ruling 1). Inherited slots are in git history (`ce59679`).
- **Files:** `remodeling/src/sections/consult.html`, `css/sections/consult.css`, `js/sections/consult.js`.
- **No server:** both validate inline, then compose an email to Sales@elbazconstruction.com in the visitor's own mail app. This is said before sending.
- **Never claimed as sent.** The done line is "Your email app should now be open with your request… Send it from there…" (grep finds no "sent" claim).
- **Firm's own wording:** form fields, consent, privacy line, response promise and "A real consultation, not a sales visit" are all the firm's (FACTS.md "Contact").

## V1 · The guided sentence (V8-led)
- **The note:** one sheet of writing paper. "Hi, my name is ___. I would like to talk about [choices]. The property is at ___. The easiest way to reach me is [choices] on ___ or at ___." The blanks grow with what is typed and are underlined in clay.
- **Every choice group has an open path:**
  - Topic: the kitchen / a bathroom / the whole home / outdoor living / something else (which opens a field and takes focus) / not sure yet.
  - Contact: a call / a text / an email / whichever is easiest (the default).
  - Open choices are drawn with dashed outlines.
- **The note becomes the email body, word for word** (measured: "The easiest way to reach me is a text, on … or at …").
- **Errors:** in field order, in plain words, with focus moved to the first one. Measured: topic, name, address, phone, email, consent.
- **Arrival:** the note writes itself in line by line as it arrives.

## V2 · The calm form (V1-led) with V3's phone desk
- **The phone desk (sticky):**
  - "Call, or leave a note."
  - The firm's line "You will get a real answer, not a callback form."
  - The number large, in a handset pill.
  - A live open or closed line from the published hours in Miami time. Measured: "Open now, until 7pm Miami time". It covers Saturday, before-7am and after-7pm wording, and Friday night says "Open Sunday".
  - Hours, office and email.
- **One calm page, no steps:**
  - the rooms on a drawn plan (Kitchen, Bathroom, Bedroom, Living area, Outdoor living), each a real checkbox that fills with clay;
  - then "The whole home / Something else / Not sure yet";
  - then the firm's fields, the preferred contact method (Phone / Email / Text / Any), consent and the privacy line.

## Self-rating (critical; Muse judges)
| category | V1 /10 | V2 /10 | evidence | why not higher |
|---|---|---|---|---|
| Fidelity to the plan | 9 | 8 | V8-led with open paths in every group; V1-led calm form plus V3 desk | V2's plan is a CSS-grid plan, simpler than V1's drawn SVG plan |
| Interaction and states | 9 | 8 | Inline errors, focus to the first one, error shake (S0409), live clearing; the "something else" field appears and takes focus | |
| Accessibility | 9 | 9 | Fieldsets and legends, native radios and checkboxes, `aria-invalid` and `aria-describedby`, a status role for the done line, 44px targets | |
| Honesty and facts | 10 | 10 | Mailto said before sending, never "sent"; hours computed only from the locked hours | |
| Visual craft | 8 | 8 | Writing-paper note with clay blanks; the desk pill and the plan | |

## Defects found and fixed across cycles
1. **Cycle 1:** the composed email read "the easiest way to reach me is text". It now uses the chip's own words ("a text / a call / an email / whichever is easiest").
2. **Cycle 1:** an inherited easing token (`--ease-out`) remained in the shared field rules. Harmonised to `--ez-out` (one easing language, notes-C).
3. **Self-check, a false alarm:** in a half-scale contact sheet the note looked about 15px. Measured computed style: 26px regular. No change needed.

## Defects remaining (honest)
- **No seam yet:** the Z-pull arrival in and the "card settles, footer rises under it" out are scheduled for the seams pass.
- **V2's project description is optional.** The firm's published form marks it required, but the room plan carries the project here. Muse may want it required.

## Skills applied
- **Forms:** S1442 and S0664 (states, inline errors), S0409 (error shake).
- **Copy:** notes-G-H (honest copy: what happens on send, and never "sent").
- **References:** OH (live open/closed mechanism), BANK Anatomy F3 (lowest-friction first field).

Render evidence: `qa/finalize/home-consult/`. Zero console errors at 1440 and 390; no horizontal overflow.
