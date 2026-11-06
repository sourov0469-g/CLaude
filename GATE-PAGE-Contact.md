# GATE-PAGE — CONTACT US (route `#/contact`)

**Under:** Muse's order of 11-06 (inner pages, one by one; Contact last in navigation order) and the owner's final plan (FORMS: writing-on-paper feel; labels, placeholders AND typed input read as ink on paper; an in-page success message; a form NEVER opens an email app; no mailto submit path). **Binding rules honoured:** facts exact, no external link, NO maps, no video, Montserrat/Inter only, never a pure-white surface, cursor companion carried across, the form endpoint left EMPTY and marked.

## 1. Decisions

The earlier Booking H ("Write us a postcard") set normal sans text on a paper background and Muse ruled that wrong. Handwriting fonts are not "normal everyday fonts", so the ink is made another way: **a real, transparent input sits over a mirror that sets each word at its own small angle and baseline, each letter at its own ink weight, with a hand-inked edge (an SVG displacement filter on a few lines of text), in Inter, in blue-black ink on a ruled pad with a margin line and paper grain.** Labels, placeholders (in a paler, pencil-like ink) and what the visitor types are all drawn this way. The real input stays the source of truth (keyboard, autofill, screen readers, selection, caret).

## 2. What was built

- **Opener, "Write to us.":** a lined writing pad on a dim sage desk (the kit's tape-measure, level and dot-grid art on slow parallax), a paper clip, a pen that tilts toward the page while you type, a dated "Dear Austin Pro," greeting. Fields: name, phone, email, town or neighbourhood, **ten things to tick** (Siding, Windows, Shingle roofing, Metal roofing, Gutters, Exterior painting, Exterior doors, Garage doors, Patio covers, Storm damage; each a ruled box whose ink tick draws itself), **how to reach you** (Call me / Email me / Either is fine), and a message on ruled lines. Beside it a letterhead card: Austin Pro Siding, Windows & Roofing; (512) 550-0000; info@austinprosiding.com; the office address with a Copy button; the four published credentials; a live "We're open now, until 8 pm / We're closed right now. We open 8 am tomorrow." line in Austin time.
- **Validation, written in ink:** an empty note is refused with margin notes ("Please write your name.", "Add a phone number or an email address.", "Tick what needs doing, or write a few lines."), the first problem is focused, fields get `aria-invalid`; a short phone, a broken email, and "Email me" without an email are each named.
- **Send:** the form has no `action` and no `method`; submit is intercepted; no `mailto:` is anywhere inside it. **On success the page shows its own thank-you on the same paper**: an ink check draws itself, "Thank you. We received your message, and we'll get back to you soon.", a one-line summary of what was written, "In a hurry? Call (512) 550-0000.", a "Thank you" stamp, and "Write another note" for a clean sheet.
- **The endpoint is EMPTY ON PURPOSE.** In `src/page_contact.js`: `const FORM_ENDPOINT = ''; // <<< CONFIGURABLE ENDPOINT: set at real launch`. While empty, **nothing is transmitted anywhere** (verified: no network request, no popup, no address change); the in-page thank-you is shown as ruled and the console says so. If set, the note is sent as JSON with `fetch()`, the thank-you waits for a 2xx, and on any failure the visitor sees "We could not send that just now. Please call (512) 550-0000…" instead (both paths tested with a patched copy that is not shipped). No third-party service is used or invented. A hidden honeypot field: a robot that fills it sees the same thank-you and nothing is sent.
- **"When the office is open." (new):** a week as seven bars on a time axis (Mon–Fri 8–8, Sat 8–6, Sun 12–5), today's row marked, a red "now" line on the live Austin time, "Closed now. Next opening: Friday at 8 am", each row focusable and labelled for screen readers; the bars draw in when the section arrives.
- **"Or come and say hello." (new):** an envelope addressed in ink to the office (flap lifts on hover) beside three published lines about the free inspection ("one visit covers every trade on the house"; "a project manager walks the outside, measures and photographs, usually 30 to 60 minutes"; "scope, materials and price in writing, no obligation"). **No map anywhere.**
- **Navigation:** Contact is now in the header, the phone menu and the footer; every "Book a free inspection" from an inner page opens this page; the homepage receipt's one button lands here.
- **Background treatment:** each of the three sections has its own dim sage gradient; the desk carries the kit's tape-measure / level art on two-layer parallax; the paper has grain and a margin rule; nothing is pure white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Field Notes (the ruled memo-book as a product world: grain, ruled lines, a margin, pen colour).** Transfers: paper as the interface; ink colour and ruling as the visual language; restraint. Does not transfer: their branding, type or copy; the paper here is drawn in CSS/SVG.

| Level | Element | Skill → how used |
|---|---|---|
| Page | Contact | ⟦S1434⟧ visual-hierarchy: the pad first, the letterhead second, hours and envelope after; ⟦S1426⟧ proximity: each label sits on its own rule; ⟦S0220⟧ anti-slop: only the published details; no invented claim about who reads or when |
| Form | fields | ⟦S1444⟧ one thing at a time, optional fields marked by being optional, the reach choice a single radio set; ⟦S1494⟧ plain labels and plain error messages; ⟦S0054⟧ fixing-accessibility: real labels (visually hidden text + drawn ink), `aria-describedby`/`aria-invalid`, `role=alert` messages, focus to the first error, a status region for the thank-you with focus moved to it, 3 px focus rings |
| Motion | pen, tick, stamp, bars | ⟦S1436⟧ animation-principles: the pen leans in as you write, the tick draws, the stamp lands with overshoot; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transform/opacity; the ink filter is static; ⟦S0400⟧ accessible-animation: reduced-motion layout |
| Controls | targets | ⟦S1441⟧ fitts-law: every field, tick and button ≥ 44 px; Send is the largest control |
| Site | weight | ⟦S0231⟧ web-performance: 15 KB of CSS and 12 KB of JS (unminified); no image, no library |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `page-contact-sheet-1440.jpg` (opener, filled pad, thank-you, week), `page-contact-envelope-1440.png`, `page-contact-week-1440.png`, `page-contact-phone-390.jpg`. **30 of 30 checks pass** (`tools/page_contact_test.js`, run on a build of this page alone):

| Check | Result |
|---|---|
| Route | Shown at `#/contact`; title and the nav's current item follow; one h1 |
| No email path | No `action`, no `method`, no `mailto:` inside the form; no network request, popup or address change on send |
| Endpoint | Empty and marked in the code (`CONFIGURABLE ENDPOINT`, `EMPTY ON PURPOSE`); no outside address in the file |
| Facts | (512) 550-0000 · info@austinprosiding.com · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8 · Sat 8–6 · Sun 12–5 exact; links only `#/…`, `tel:` and the one `mailto:`; the word "map" absent |
| Ink | What you type is mirrored in ink while the real input text is transparent; labels and placeholders are ink; ink contrast 12.0, placeholder 5.25 (≥ 4.5) |
| Validation | Empty note refused (3 messages, name focused, nothing sent); short phone and broken email named; "Email me" without an email asks for one |
| Success | Thank-you shown in the page with the ruled wording; the form is replaced and focus moves to the thank-you; "Write another note" resets |
| Endpoint paths | With an endpoint set: 200 shows the thank-you, 500 shows the phone fallback and no thank-you |
| Honeypot | A filled hidden field shows the same thank-you and sends nothing |
| Keyboard, touch | Tab reaches the ticks, Space ticks, arrows move the radio; a tap on Send works |
| Reduced motion | Thank-you and week chart shown at once; 0 errors |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390: nothing overflows, no sideways scroll, targets ≥ 44 px, 0 errors |
| Fonts, ids, errors | Montserrat and Inter only; no duplicate ids; 0 page errors |

## 5. Defects found and fixed

1. The hidden honeypot input fell back to Arial; all form controls on every inner page now inherit the site font.
2. Placeholders were plain grey (not ink) and too faint; they are now pencil-ink and 5.25:1.
3. Fields were 40 px high; raised to 44 px.
4. A first draft made unpublished claims ("a real person reads it", "messages wait for the next opening"); removed.
5. The success summary and the screen-reader copy duplicated in plain text extraction; the ink copy is `aria-hidden`.

## 6. Remaining, named honestly

- **With the endpoint empty, nothing is sent** although the visitor sees the thank-you (the ruled behaviour). The launch step is to set `FORM_ENDPOINT` to the firm's own form-handling URL; until then this form is a front end only.
- **"Handwritten" is simulated** with Inter (angles, weights, edge roughening) because novelty fonts are banned; it reads as pen on paper, not as a person's actual hand.
- **The ink edge uses an SVG filter on a few lines**; very old browsers draw the same text without the rough edge.
- **The date on the pad is the visitor's device date** (in Austin time).
- **Chromium only**, headless software rendering; touch emulated.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | A convincing ruled pad with ink in every label, placeholder and typed line, a clean letterhead card, a week chart and an envelope (`page-contact-sheet-1440.jpg`). **Minus:** the ink is simulated |
| Usability (30) | **8.8** | Plain validation in the margin, the first error focused, ticks instead of typing, one clear Send, in-page thank-you, phone fallback everywhere, 44 px targets. **Minus:** ten ticks is a lot on a phone |
| Creativity (20) | **8.7** | Ink as the interface, a pen that leans in, a tick that draws itself, a stamp, a week drawn as bars with a live "now" line, an envelope. **Minus:** the lined-pad idea is the owner's |
| Content (10) | **9.0** | Only published details; the thank-you uses the owner's words; honest about what is and is not sent |
| **Weighted** | **8.68** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.8 + 0.2 × 8.7 + 0.1 × 9.0 = 3.40 + 2.64 + 1.74 + 0.90 = **8.68**.

## 8. Sub-agent use, stated honestly

I built, tested and gated this page myself. Two sub-agents are building Siding + Roofing and Windows + Our Work in parallel under a written brief; they are reported in their own gates. No background tasks were claimed beyond that.

## 9. Next

Integrate the four sub-agent pages in navigation order (Siding, Windows, Roofing, Our work), then the final whole-site pass.
