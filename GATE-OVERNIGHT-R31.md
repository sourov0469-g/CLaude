# GATE: Overnight Round 31 — Booking I and J (Booking 10 of 10). Section ladder complete.

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?book=i` and `?book=j`.

Both versions carry the real phone, hours, address and email. There is no form and nothing is sent or saved.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Booking I, "Day and night"** | Apple AirPods Pro (one state-driven stage) | S0054 (Right now / By day / By night as a `radiogroup`), S1436 (sky, sun to moon, stars and lit windows cross-fade over 0.8 s, windows staggered by 70 ms), Doherty threshold (live Austin-time state refreshed every minute), S0220 (the next-opening line comes from the shared `Cta.status()`; no promise of a call-back) |
| **Booking J, "The receipt"** | Cash App Brand Guidelines (the receipt as the brand object) | S1330 (lines print in sequence, 110 ms apart; "Print it again" replays), S0405 (tear-off stub with Book and Call), S0220 (only locked or already-published lines: free inspection; one visit, every trade; itemised proposal; lifetime workmanship warranty on labor; 30-year James Hardie non-prorated; 4.9 from 474 Google reviews; real hours; since 2009) |

## Build log, with how each differs from Booking A–H

- **Booking I** (`o31-booking-i.jpg`)
  - **Live state:** the stage follows the office's real open or closed state, in Austin time.
  - **Day:** a pale sky and sun. The heading reads "Call us now." with the phone set huge.
  - **Night:** a deep-green sky, a moon, stars and lit windows. The heading reads "Book online tonight." with the booking button, then the next opening, e.g. "We open 8 am today (Austin time)".
  - **Footer line, both states:** the status, the hours, the address and the email.
  - **How it differs:** the only version whose whole composition changes with the time.
- **Booking J** (`o31-booking-j.jpg`)
  - **Printer:** a printer slot with a receipt feeding out of it.
  - **Receipt header and lines:** the header carries the address, phone and email. The five lines follow, totalled "To find out … $0".
  - **Receipt foot:** the rating, the hours and "Thank you. Since 2009.".
  - **Tear-off stub:** Book a free inspection, plus the phone.
  - **How it differs:** the only version that itemises what the visitor gets.

## Self-tests

| Check | Result |
|---|---|
| I at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Live (open) → day, "Call us now.", "Open now, until 8 pm Austin time". By night → "Book online tonight.", with the day panel hidden. A stubbed closed state on Right now → night, "We open 8 am today (Austin time)." One h2 in every state |
| J at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. 15 of 15 lines printed. Text checked against the locks |

**Defects fixed:**
- I's first build hid the section heading in the night state; the heading is now shared and retitled.
- J abbreviated a locked phrase ("30-yr"); it now reads "30-year non-prorated".
- I's night preview said "We are open now" while previewing night; it now says "Our next opening is in the hours below."

**Remaining:** I's skyline is drawn line art: houses, not the firm's photos. It is decorative and hidden from assistive tech.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | I | state-driven stage, S0220 |
| Section | J | receipt grammar, S0220 |
| Element | I switch | S0054 |
| Element | I sky | CSS custom-property theme swap, S1436 |
| Element | I status | `aria-live` |
| Element | J lines | print stagger, S1330 |
| Element | J stub | perforation, S0405 |
| Element | J replay | button |

**Critique pass:**
- **S1473 H1 (visibility of status):** I is the status.
- **Honesty:** J's "$0" is only the free inspection. Nothing claims a price beyond the locks.
- **S1496:** brand colours, plus a warm moon and window light.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Booking I | 8.6 | 8.2 | 8.6 | 8.2 | **8.42** | PASS |
| Booking J | 8.2 | 8.0 | 8.2 | 8.6 | **8.20** | PASS |

**Vetoes: none.**

## Ladder close

Every section now has ten versions, A–J. The Hero has 10 numbered versions plus archive A2–A5.

| Slot | Versions |
|---|---|
| Services | 10 |
| Visualiser | 10 |
| Windows | 10 |
| Reviews | 10 |
| Process | 10 |
| Try the job | 10 |
| On your street | 10 |
| Booking | 10 |

- **Defaults:** all unchanged.
- **File:** one HTML file, about 14.7 MB.
- **Open asset request:** the H "scan to call" QR code (see GATE-OVERNIGHT-R30).

**Next:** the subpages. The first subpage gate opens with the full section plan for all eight pages.
