# GATE: Overnight Round 30 — Booking G and H (Booking 8 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?book=g` and `?book=h`.

Both versions carry the real phone, hours, address and email. Nothing is sent or saved by the page. H's note opens in the visitor's own email app, and the page says so twice.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Booking G, "Three ways in"** | Graza (the custom-animation bar) | S0054 (each door is a button with `aria-expanded`; the inside is `inert` while closed; focus moves to the real link on opening; Escape closes and returns focus), S1436 (the door swings on its hinge with a small overshoot, 0.8 s, and leans 14° on hover), S0220 ("what happens next" uses only the firm's own lines and the real hours) |
| **Booking H, "Write us a postcard"** | Quiet Cubes (calm, tactile) | form design (topic toggles, a ruled note area, an address line, real `<label>`s), feedback patterns (the hint changes on click to "Your email app should open… Nothing has been sent from this page"), S0220 (`mailto:` subject "Free inspection: …" with the note and address in the body) |

## Planned but not built: H as "Scan to call"

H was first planned as "Scan to call": a QR code of the `tel:` link, for desktop visitors. Generating it needed a QR library, which this environment does not have. Downloading one was refused by the session's safety rules, and I did not work around that. H became the postcard instead.

**If wanted:** a QR image of `tel:+15125500000`, SVG, about 2 KB. Muse can supply it, or it can be added with a vetted local QR tool.

## Build log, with how each differs from Booking A–F

The existing versions are A (work order), B (press the board), C (film roll), D (one number), E (weekly timetable) and F (letterboard).

- **Booking G** (`o30-booking-g.jpg`)
  - **Composition:** three panelled doors in cream frames: Call us, Book online, Email us.
  - **Behind each door:** a green room with what happens next and the real action: the phone link, the scheduling page, or a `mailto:`.
  - **Status:** the open-now status sits beside the headline.
  - **How it differs:** the only version where the visitor chooses a channel by opening it.
- **Booking H** (`o30-booking-h.jpg`)
  - **Composition:** a cream postcard. On the left: topic chips, a ruled note area and an address line. On the right: the stamp, the postmark, and the office address with the email.
  - **Action:** "Open in my email app".
  - **How it differs:** the only free-text version. A uses ticked boxes and ends at the scheduling page.

## Self-tests

| Check | Result |
|---|---|
| G at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Inside panels are inert before opening. Opening "Book online" makes only that panel interactive and moves focus to "Book a free inspection" (scheduling URL). Escape closes it and puts focus back on the door |
| H at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Windows + note + address → `mailto:info@austinprosiding.com?subject=Free inspection: Windows&body=Two windows fog up in winter.\n\nAddress: Maple Run, Austin`. No sent, saved or received claim |

**Remaining:** at 390, G's three doors stack into a tall column (about 950 px). Each door is still one tap.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | G | custom-animation bar, S0220 |
| Section | H | form design, S0220 |
| Element | G doors | `aria-expanded` / `inert`, S1436 swing |
| Element | G focus handling | S0054 |
| Element | H chips | `aria-pressed` |
| Element | H note | ruled lines, label |
| Element | H mailto | built live |
| Element | H hint | `aria-live` honest feedback |

**Critique pass:**
- **S1473 H3 (user control):** G's doors close with Escape.
- **S1473 H5 (error prevention):** H states before and after the click that nothing is sent from the page.
- **Honesty:** no form submits anywhere, and the stamp reads "AP / Austin", not a postage claim.
- **S1496:** brand colours, plus paper tones.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Booking G | 8.4 | 8.2 | 8.2 | 8.2 | **8.28** | PASS |
| Booking H | 8.2 | 8.2 | 7.8 | 8.4 | **8.14** | PASS |

**Vetoes: none.** **Next: Round 31, Booking I and J.**
