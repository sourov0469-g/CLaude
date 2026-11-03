# GATE: Subpages, Round S20 — Contact 2 (The office) and 3 (Book the inspection)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.

**Defaults:** the homepage is unchanged. Version A is the default on each new section.

**How to view:** `?page=contact&ct2=a|b|c` and `?page=contact&ct3=a|b|c`.

**Milestone:** with ct2 and ct3 the **Contact page is complete** (three sections, three versions each), and so are **all eight subpages**: Siding, Windows & Doors, Roofing, Our Work, Reviews, About, Service Area and Contact.

**Sources:**
- Both sections use only the locked facts: (512) 550-0000 · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5.
- What the inspection is uses the homepage's own words: "a project manager walks every side of the house (siding, trim, windows, roof and gutters)", "one visit covers every trade", "a detailed proposal: an itemised price for the work you want, nothing else".
- **No drawn map.** Directions are a Google Maps search for the locked address.
- The page says nothing about parking, the building or the neighbourhood, because none of it is documented.
- There is no form on the page. Each ct3 version says: "Booking happens on our scheduling page or by phone. Nothing is sent from this page."

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| ct2 A "Today at the office" | Cash App Brand Guidelines (one live number) | Today's hours as the h2, in Austin time; open/closed line (`aria-live`); the week list with today marked (`aria-current="date"`). Without JS the heading reads "Opening hours". |
| ct2 B "The door plate" | Scout Motors (a plain made object) | "Suite C70" set as a type-only plate (`aria-hidden`); address, hours and phone as a definition list; Directions |
| ct2 C "Three things for your phone" | Dropbox Brand (steps as type) | 1 copy the address (Clipboard API, `role=status`, failure message; the button is hidden when unsupported, and the address stays `user-select:all`); 2 Maps; 3 call |
| ct3 A "One big button" | Dropbox Brand (one action, set huge) | The whole green slab is the link to the booking page; the arrow disc moves on hover; reduced motion turns it off |
| ct3 B "Online or by phone" | Cash App Brand Guidelines (two equal choices) | Two halves: dark for online, light for phone with the live status |
| ct3 C "What booking gets you" | Erie Home, **note only**: plain steps | Three numbered stops on a rail, which turns vertical on phones; book and call |

## Build log

**ct2 The office**
- A: "Tuesday: 8 am – 8 pm", "Open now, until 8 pm Austin time", seven rows from Monday with Tuesday marked "today".
- B: a deep-green plate with a lime keyline, then "Suite C70, 7801 N Lamar Blvd." and the facts.
- C: three tinted cards.
- How they differ: live schedule, object, steps.

**ct3 Book the inspection**
- A: "Book it online." set at 124 px on a full-width green link.
- B: two halves.
- C: a three-stop rail.
- How they differ: one action, two choices, a sequence.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 shows 0 errors, 0 overflow, 1 h1 (ct1's) and 0 duplicate ids.

| Check | Result |
|---|---|
| ct2 A | Heading "Tuesday: 8 am – 8 pm"; today's row has `aria-current="date"`; 7 rows |
| ct2 B | Address, hours and phone verbatim; Directions goes to a Maps search for the locked address |
| ct2 C | After Copy, the clipboard holds "7801 N Lamar Blvd Suite C70, Austin TX 78752"; the status line reads "Address copied to your clipboard." (true only on success; a failure says so) |
| ct3 A | The slab goes to the booking page |
| ct3 B | Live status "Open now, until 8 pm Austin time"; links go to the booking page and `tel:` |
| ct3 C | You book → A project manager comes out → A detailed proposal |
| Default | `?page=contact` shows ct1 A, ct2 A, ct3 A |
| Claims | No sent, saved, submitted or received wording; 0 forms on the page |

**Fixed before gating:**
- ct2 A's heading broke as "8 am – 8 / pm". It now uses non-breaking time spans and a line break after the day.
- The accessible name keeps its space ("Tuesday: 8 am…").
- ct2 C's call button wrapped the phone number around an oversized icon. It now uses the shared call pill.

**Remaining:** the header nav still points at homepage anchors. That is the next step.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | ct2 | live-schedule, made-object and step grammars |
| Section | ct3 | single-action, two-choice and sequence grammars |
| Element | ct2 C | clipboard with honest status and a fallback |
| Element | ct2 A / ct3 B | live Austin-time status shared with the homepage |
| Honesty | both | no map drawn, no form, nothing sent |

**Critique pass:**
- **Honesty:** the copy confirmation reports only what happened.
- **Hierarchy:** ct3 A is deliberately the loudest thing on the page, as the close.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| ct2 A Today at the office | 8.2 | 8.8 | 7.6 | 8.6 | **8.30** | PASS |
| ct2 B The door plate | 8.4 | 8.4 | 7.8 | 8.4 | **8.28** | PASS |
| ct2 C Three things for your phone | 8.0 | 8.8 | 7.4 | 8.6 | **8.18** | PASS |
| ct3 A One big button | 8.4 | 8.8 | 7.4 | 8.6 | **8.34** | PASS |
| ct3 B Online or by phone | 8.2 | 8.6 | 7.2 | 8.6 | **8.16** | PASS |
| ct3 C What booking gets you | 8.0 | 8.6 | 7.2 | 8.8 | **8.10** | PASS |

**Vetoes: none.**

**Next:**
1. Point the header nav at the page views.
2. Gate it.
3. Write the closing summary gate for the subpages.
