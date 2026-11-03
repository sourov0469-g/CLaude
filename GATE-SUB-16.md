# GATE: Subpages, Round S16 — About 4 (How we work) and 5 (Book). About page complete.

**Under:** AUSTIN-OVERNIGHT-BRIEF, subpages. Plan for all eight pages: GATE-SUB-01.

**Defaults:** the homepage is unchanged. Version A is the default on each new section.

**How to view:** `?page=about&ab4=a|b|c` and `?page=about&ab5=a|b|c`.

**Sources.** All wording is the firm's own, as published on the homepage (each phrase searched in the built file first):
- one free inspection covers every trade;
- a project manager walks every side of the house (siding, trim, windows, roof and gutters);
- the four steps and their copy;
- "an itemised price for the work you want, nothing else";
- "the full wall or the whole house. No patch repairs.";
- "we walk the finished job with you, clear the punch list and leave the site clean";
- "then the warranties start";
- lifetime workmanship on labor plus the maker's warranty;
- the hours.

The close uses the locks verbatim. Nothing is sent or saved.

## Plan lines

| Version | Reference | Skills |
|---|---|---|
| ab4 A "One visit, every trade" | Cash App Brand Guidelines (one idea, shown) | Green inspection card ticking the five things walked; the four steps in a row |
| ab4 B "Down a rail" | Apple AirPods Pro (one step at a time) | S1330: a vertical rail fills, and each step lights as it reaches mid-screen. Steps are dimmed only when JS runs; reduced motion lights all four |
| ab4 C "House rules" | Dropbox Brand (a short list, set large) | S1500: five practices, one per numbered line |
| ab5 A "Come say hello" | Cowboy (a real place) | S1500: the address as headline, plus a directions link, hours and the two actions |
| ab5 B "Since 2009, on the phone" | Dropbox Brand (one line) | The number at up to 170 px; visually hidden h2 |
| ab5 C "The business card" | Scout Motors (a printed object) | S0054 (`aria-pressed` toggle; the label reads out the back), S1436 turn-over |

## Build log

**ab4 How we work**
- A: green card (Siding, Trim, Windows, Roof, Gutters, ticked; hours) and four step cards.
- B: a rail with numbered dots, large step titles and copy.
- C: five large numbered rules, each with its detail line.
- How they differ: a card and steps, a scroll rail, a rules list.

**ab5 Book**
- A: "7801 N Lamar Blvd, Suite C70." large, then "Austin TX 78752 · Directions", hours, CTAs and email.
- B: "Since 2009" with the phone number huge.
- C: a green business card (AUSTIN PRO · Siding, Windows & Roofing · Since 2009). Its cream back holds phone, email, address and hours.
- All three carry phone, hours, address and email.

## Self-tests

**Gate checks:** every version at 1440 / 768 / 390 shows 0 errors, 0 overflow, 1 h1 and 0 duplicate ids.

| Check | Result |
|---|---|
| ab4 A | Steps: Free inspection / Detailed proposal / Expert install / Final check |
| ab4 B | After scrolling: 3 of 4 lit, fill 75% |
| ab5 C | Turned; label reads the back in full |
| ab5 A | Directions → Google Maps search for the locked address |

**Defects fixed:**
- **ab4 A collapsed:** the steps collapsed into one-letter columns. `.st5` is the homepage's global star-rating class; renamed to `.sp5`.
- **Out-of-context line:** the shared step-2 copy ends "Here is where our documented jobs actually landed.", which points at a homepage chart. It is trimmed on this page, and both versions are verified clean.
- **No-JS fallback:** ab4 B's steps were dimmed even without JS. They are now dimmed only when its script runs.

**Remaining:** none new.

## Skill ledger

| Level | Item | Skill → how used |
|---|---|---|
| Section | ab4 | card, rail and rules grammars; the firm's own words |
| Section | ab5 | address, number and card closes |
| Element | ab4 B | rail fill, IO |
| Element | ab5 C | turn-over card |

**Critique pass:**
- **Honesty:** only phrases already published; the out-of-context sentence is removed.
- **S1496:** brand colours.

## Scorecard (D40 / U30 / C20 / Ct10)

| Version | Design | Usability | Creativity | Content | Weighted | Verdict |
|---|---|---|---|---|---|---|
| ab4 A One visit, every trade | 8.2 | 8.6 | 7.4 | 8.8 | **8.24** | PASS |
| ab4 B Down a rail | 8.2 | 8.2 | 7.8 | 8.6 | **8.18** | PASS |
| ab4 C House rules | 8.4 | 8.6 | 7.6 | 8.8 | **8.42** | PASS |
| ab5 A Come say hello | 8.2 | 8.6 | 7.4 | 8.6 | **8.22** | PASS |
| ab5 B Since 2009, on the phone | 8.2 | 8.8 | 7.2 | 8.4 | **8.20** | PASS |
| ab5 C The business card | 8.4 | 8.2 | 8.2 | 8.4 | **8.30** | PASS |

**Vetoes: none.**

**About page:** 5 sections × 3 = 15 versions, complete.

**Next:** Round S17, Service Area 1 (Opener) and 2 (Towns).
