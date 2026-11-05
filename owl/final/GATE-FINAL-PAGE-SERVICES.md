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

## Skill ledger (WEB-SKILLS tags, each one applied and checked in this page)
⟦S1107⟧ keyboard-navigation (tabs with roving tabindex, arrows) · ⟦S0070⟧ better-accessibility (`role=tablist/tab/tabpanel`, `aria-selected`, live card) · ⟦S1259⟧ touch-targets (tiles 84 px, steps 78 px+, round buttons 54 px) · ⟦S1434⟧ visual-hierarchy (one h1, the chosen job largest) · ⟦S1455⟧ state-machine (exactly one job and one step active at a time) · ⟦S1440⟧ feedback-patterns (the chosen tile turns amber, done steps turn amber) · ⟦S0544⟧ motion-doctrine (one easing; the lifted step tilts, nothing else moves) · ⟦S0400⟧ accessible-animation (reduced motion removes the tilts).

## Governing reference, with transfers
**Governing reference:** the WAI-ARIA Authoring Practices **Tabs** pattern (a pattern, not live-studied), and Owl's own accepted homepage pieces: **Services V8 "Name Your Job"** (five jobs named plainly) and **Nothing V1 "Scroll film"** (a job told as five ordered beats).
**Transfers:** from Tabs: one tab stop, arrow keys, one panel shown, roving tabindex. From Name Your Job: the five jobs, in the same words and order, and the plain three-line details. From Scroll film: a numbered sequence with the current step lit, and earlier steps marked done. The shingle-course tabs are the page's own physical metaphor (a roof is laid in courses).


## Remaining
D1: the page has no photographs until Owl supplies larger job photos. D2: the Protect Your Nest System is named as a step of a replacement (Owl's own fact) though it has no page of its own (see the question in GATE-FINAL-PAGES-ALL).

**Vetoes: zero.** **Process:** every command was foreground with a time limit; no Agent calls, no run_in_background calls, no task-checklist tools.
