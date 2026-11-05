# GATE-FINAL-PAGE-SERVICES · the Services page (`#/services`, ONE final version)

**Built from:** OLD Services-page hero V2 "Pick Your Roof Job" (five jobs as tabs) and OLD process V2 "How a Roof Replacement Runs" (seven steps laid like a course of shingles), plus the shared "Start with a Wise Check" band. Files `src/final/pages/services-hero.html`, `services-steps.html`. **Evidence:** `gates/final/pages/services-sheet.jpg`, `gates/final/svc-hero/`, `gates/final/svc-steps/`.

## What it is
Header "Services" (and the footer link) opens this page, marks itself current and sets the page title. **Pick Your Roof Job:** five tiles (Roof Replacement, Roof Repair, Storm Damage Help, Wise Check Inspections, Siding); the chosen one shows its own details in a card; arrow keys move. **How a Roof Replacement Runs:** seven shingle-like tabs; Next/Previous or tap a tab; earlier steps turn amber. Every word is Owl's own data (10-year workmanship warranty, up-to-50-year manufacturer warranties, three cleanup passes, aftercare box).

## Decisions
- **No photos on this page.** The five service photos are 560 px and already used on the homepage's Services section; using them again would repeat media, so the tab card shows each job's own drawn icon on an ink band instead. Nothing blurry, nothing repeated.
- Wording fixed to the facts: "BBB A−" (never "Accredited").

## Five questions
1. **What is it for?** What exactly does Owl do, and how does a new roof go? 2. **Under 3 s?** Yes: "Pick Your Roof Job" and five tiles. 3. **Fun?** The shingle course lifts as you step through. 4. **Every element earns its place?** Tiles, card, steps, book. Yes. 5. **Stressed?** I find my job and read three lines.

## Checks: 33/33 (`final-test.cjs svc-hero` 17/17, `svc-steps` 16/16)
axe 0 · facts lock · no maps · distinct media (none) · five jobs, one selected · Storm Damage Help shows its details · arrow keys · crumb goes home, Book goes to the home card · seven steps, Next lifts "The wrap", last step names the 10-year warranty · layout and 44 px controls · reduced motion · no errors.

## Score (Design 40 · Usability 30 · Creativity 20 · Content 10)
8.2 / 8.5 / 8.3 / 8.7 → 3.28 + 2.55 + 1.66 + 0.87 = **8.36**

## Remaining
D1: the page has no photographs until Owl supplies larger job photos. D2: the Protect Your Nest System is named as a step of a replacement (Owl's own fact) though it has no page of its own (see the question in GATE-FINAL-PAGES-ALL).

**Vetoes: zero.** **Process:** every command was foreground with a time limit; no Agent calls, no run_in_background calls, no task-checklist tools.
