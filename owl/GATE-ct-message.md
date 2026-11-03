# GATE · Send a message (Contact and Price My Roof §3): two versions

**Where it lives:** `#/contact/ct-message`. Switch versions with `?v=ct-message:1|2`. **Default: V2.**

**Governing reference:** Quiet Cubes: few controls and instant feedback (V2: a live preview of the exact message). **Never transferred:** the configurator.

**WEB-SKILLS read in full before building** (logged): ⟦S1442⟧ form-design (one column, top labels, optional fields marked, widths hint at input length, validate on blur, the error under its field); ⟦S0070⟧ (labels; autocomplete tokens `name`, `tel`, `postal-code`; `aria-invalid` + `aria-describedby`; on send, focus the first invalid field; a polite `role=status`; validate on submit, never by disabling the button); ⟦S1439⟧ (errors say how to fix; input is preserved); ⟦S1440⟧ (every send is acknowledged in the status line).

## What was built
- **Both:** name, phone (optional), ZIP (optional), message; **Send by email** opens the visitor's own email app to info@owlroofing.com, **Send by text** opens their text app to (651) 977-6027, both pre-filled. The page posts nothing and stores nothing, and says so.
- **V2:** beside the form, "What Owl will receive": the exact message, updating as you type.

## Ratings (Design 40 / Usability 30 / Creativity 20 / Content 10)
| | V1 | V2 |
|---|---|---|
| Design | 7.5 | 8.0 |
| Usability | 8.5 | 8.5 |
| Creativity | 6.5 | 7.5 |
| Content | 9.0 | 9.0 |
| **Weighted** | **7.75** | **8.15** |

**Why this default:** V2's preview removes the guesswork about what is sent, where.

**Vetoes:** none. Facts only from the lock and Owl's own words; every phone link is the one locked number; nothing is sent or stored by the page.

**Page tests:** `pagetest.mjs contact` 12/12; `contacttest.mjs` 26/26 (price validation on blur and field width, the stepper, the message form, the town search, today in the hours); `msg2.mjs` 2/2 (V2 preview); `pageshot.mjs` defaults and all-V2: no overflow at 1440/390, one h1, no errors; token lint clean.

## Defects found and fixed
None beyond the tests.

## Honest note
There is no server form: this page cannot send anything itself. The hand-off to the visitor's own email or text app is real; a server form would need Owl's back end.
