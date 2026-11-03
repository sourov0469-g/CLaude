# GATE: Overnight Round 29 — Booking E and F (Booking 6 of 10)

**Under:** AUSTIN-OVERNIGHT-BRIEF, section ladder.
**Defaults:** unchanged.
**How to view:** `?book=e` and `?book=f`.

Both versions carry the real phone, hours, address and email. Neither has a form. Nothing is sent or saved; booking finishes on the firm's scheduling page or by phone.

## Plan lines (written before building)

| Version | Reference | Skills |
|---|---|---|
| **Booking E, "The week, at a glance"** | Cash App Brand Guidelines (one clear grid) | S0054 (day rows are toggle buttons), data visualisation (the hours as bars on a 6 am–10 pm scale, with a live "now" line in Austin time), Doherty threshold (the open-now status updates every minute), S0220 (hours verbatim; "Booking online is open any time" is true of the firm's scheduling page) |
| **Booking F, "Come by the office"** | Cowboy (warmth, a real place) | S0405 (four honest actions: call, email, directions, copy), feedback patterns ("Address copied." shows only when the copy actually succeeds; otherwise the address is printed), S1436 (letterboard rows settle in 110 ms apart), S0220 (the locks verbatim, plus "Since 2009 · merged with Sanders Roofing & Exteriors in 2018") |

## Build log, with how each differs from Booking A–D

The existing Booking versions are A (work order), B (press the board), C (film-roll record) and D (one number).

- **Booking E** (`o29-booking-e.jpg`)
  - **Timetable:** Mon–Sun rows with green open-hour bars. Today is marked, and a lime "now" line sits on today's bar.
  - **Side panel:** the open-now status, the chosen day's hours with when to call, a call link, the booking button, and the address and email.
  - **How it differs:** the only version built on time.
- **Booking F** (`o29-booking-f.jpg`)
  - **Letterboard:** a felt letterboard in a dark frame showing Austin Pro, Suite C70 + street address, phone, email, hours, and the 2009 / 2018 line.
  - **Action list:** Call, Email, Directions (opens Google Maps), Copy the address.
  - **Status and button:** the open-now status and the booking button.
  - **How it differs:** the only version built on the physical office.

## Self-tests

| Check | Result |
|---|---|
| E at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Status "Open now, until 8 pm Austin time"; today = Tuesday; one now-line. Sunday → "We answer 12 pm – 5 pm. Call (512) 550-0000 then…" |
| F at 1440 / 768 / 390 | 0 errors, 0 overflow, 1 h1, 0 duplicate ids. Copy → "Address copied.", and the clipboard holds "7801 N Lamar Blvd Suite C70, Austin TX 78752". Actions: `tel:`, `mailto:`, Maps URL, copy button |
| Locks (F text) | Phone, email, address, Mon–Fri 8–8, Sat 8–6, Sun 12–5 and the 2018 merger all present. No "sent / saved / submitted / received" wording |

**Defects fixed:**
- E's call link used the global `.btn.light`, which wrapped the number onto three lines; it now has its own pill.
- F's email broke mid-word on phones ("…austinprosiding.c / om"); it now has a `<wbr>` after "@", `keep-all`, and a 5vw size on phones (the C3 treatment).

**Remaining:** F's letterboard splits the address over two lines (Suite C70 / street). The full locked string appears on the copy action and in the copied text.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | E | grid grammar, S0220 |
| Section | F | real-place warmth, S0220 |
| Element | E day buttons | `aria-pressed` |
| Element | E now line | Austin-time `Intl`, refreshed every 60 s |
| Element | F actions | S0405 |
| Element | F copy | honest feedback, `aria-live` |
| Element | F rows | S1436 settle |

**Critique pass:**
- **S1473 H1 (visibility of status):** both versions show open or closed right now.
- **Honesty:** no form and no claim; the copy message depends on the clipboard result.
- **S1496:** brand colours, plus the letterboard's dark frame.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| Booking E | 8.0 | 8.6 | 7.6 | 8.6 | **8.18** | PASS |
| Booking F | 8.4 | 8.6 | 8.0 | 8.6 | **8.40** | PASS |

**Vetoes: none.** **Next: Round 30, Booking G and H.**
