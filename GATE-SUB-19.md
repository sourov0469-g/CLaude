# GATE: Subpages, Round S19 — Service Area 5 (Book) and Contact 1 (Ways to reach us)

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.

**Defaults:** the homepage is unchanged. Version A is the default on each new section.

**How to view:** `?page=area&sa5=a|b|c` and `?page=contact&ct1=a|b|c`.

**Milestone:** with sa5 the **Service Area page is complete** (five sections, three versions each).

**Sources.** Both sections use only the locked facts: (512) 550-0000 · info@austinprosiding.com · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5. sa5 B names the six towns with the most documented work, read from the same records as On your street (no tallies shown, none summed). Neither section has a form; every action is a real link (`tel:`, `mailto:`, the booking page, a Google Maps search for the address). Nothing on either section says a message was sent or saved.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| sa5 A "Not sure? Ask" | Erie Home, **note only**: the plain answer | One question as the heading, one-sentence answer with the phone inline; book + call |
| sa5 B "We've worked in" | Cowboy (warm, local) | Dark green panel; the six towns with the most documented work, then book + outlined call |
| sa5 C "Two lines" | Dropbox Brand (the shortest close) | Two full-width ruled links set huge: Call / Or book online; visually hidden h2; address strip |
| ct1 A "Four lines, set large" | Dropbox Brand (type as the interface) | The page h1, then phone, email, address and hours as four big lines, each the link itself |
| ct1 B "The contact card" | Scout Motors (a printed card) | Cream card with h1, live open-now line (`aria-live`), definition list of the four facts |
| ct1 C "Pick a way" | Cash App Brand Guidelines (one choice at a time) | S0054 `radiogroup` (call / email / visit / book) with arrow keys; the panel shows one way and its link |

## Build log

**sa5 Book (Service Area close)**
- A: "Not sure we come to your street?" Answer: call and ask, or book online and say where you are. No claim about where the firm will or won't go.
- B: "Austin · Round Rock · Cedar Park · Leander · Pflugerville · Georgetown … and the towns around them."
- C: two ruled lines, the phone and "Free inspection", 96 px at desktop; stacks at 390.
- How they differ: question and answer, town panel, two giant lines.

**ct1 Ways to reach us (Contact opener, the page's h1)**
- A: four ruled rows, label column + the fact as a 52 px link. The email breaks only after "info@".
- B: one card; "Open now, until 8 pm Austin time" from the same status function the homepage uses.
- C: four pill choices; the dark panel swaps to the chosen way.
- How they differ: type list, card, chooser.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 shows 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| sa5 B towns | Austin · Round Rock · Cedar Park · Leander · Pflugerville · Georgetown (from records) |
| ct1 title | "Contact \| Austin Pro Siding, Windows & Roofing" |
| ct1 A links | `tel:+15125500000`, `mailto:info@austinprosiding.com`, Maps search for the locked address |
| ct1 B status | "Open now, until 8 pm Austin time" (dot turns green) |
| ct1 C | mail / visit / book panels show the right link; arrow keys move the choice |
| Claims | No "sent", "saved", "received" or "thank you" text; 0 forms on either page |
| Locks | phone, email, address, hours verbatim |

**Remaining:** the header nav still points at homepage anchors (planned for after S20).

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | sa5 | plain-answer, panel and two-line close grammars |
| Section | ct1 | type-as-interface, printed card and chooser grammars |
| Element | ct1 C | radiogroup with roving tabindex |
| Element | ct1 B | live status shared with the homepage |
| Honesty | both | no form, nothing claims to send or save |

**Critique pass:**
- **Honesty:** sa5 never promises coverage; it says "call and ask".
- **Hierarchy:** ct1 A's address line is long; at 390 it wraps to three lines but stays readable at 20 px+.
- **S1496:** brand colours only.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| sa5 A Not sure? Ask | 7.8 | 8.6 | 7.0 | 8.6 | **7.96** | PASS |
| sa5 B We've worked in | 8.2 | 8.4 | 7.4 | 8.6 | **8.14** | PASS |
| sa5 C Two lines | 8.2 | 8.6 | 7.6 | 8.2 | **8.20** | PASS |
| ct1 A Four lines, set large | 8.2 | 8.8 | 7.4 | 8.8 | **8.28** | PASS |
| ct1 B The contact card | 8.2 | 8.6 | 7.2 | 8.8 | **8.18** | PASS |
| ct1 C Pick a way | 8.0 | 8.4 | 7.6 | 8.6 | **8.10** | PASS |

**Vetoes: none.**

**Next:** Round S20, Contact 2 (The office) and Contact 3 (Book the inspection). That completes all eight pages.
