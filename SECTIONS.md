# SECTIONS: the homepage section list (BRIEF-FULL.md §9.4)

Source of the list: rembrandt/v5/PLAN-V7.md §6 and the delivered checkpoint `rembrandt/v5/rembrandt-homepage.html` (V7). Page order: Hero → Reviews → Work → Family → How → Towns → Call, then the shared footer (one footer, not versioned). Each section has a 1·2·3 switcher that swaps only that section.

A line flips to `passes: YES` only with the evidence its phase's done-criteria name (BRIEF-FULL.md §10), recorded in PROGRESS.md and in TRACEABILITY.md's Verification column.

## Sections × versions

| # | Section (`data-section`) | Version | Status target | passes |
|---|---|---|---|---|
| 1 | Hero (`hero`) | V1 | rebuilt fresh | NO |
| 2 | Hero (`hero`) | V2 | rebuilt fresh | NO |
| 3 | Hero (`hero`) | V3 | rebuilt fresh | NO |
| 4 | Reviews (`proof`) | V1 Constellation | kept, pixel-untouched | NO |
| 5 | Reviews (`proof`) | V2 | upgraded | NO |
| 6 | Reviews (`proof`) | V3 | rebuilt | NO |
| 7 | Work (`work`) | V1 | upgraded | NO |
| 8 | Work (`work`) | V2 | upgraded | NO |
| 9 | Work (`work`) | V3 | upgraded | NO |
| 10 | Family (`family`) | V1 | upgraded | NO |
| 11 | Family (`family`) | V2 | upgraded | NO |
| 12 | Family (`family`) | V3 | upgraded | NO |
| 13 | How it works (`how`) | V1 | upgraded | NO |
| 14 | How it works (`how`) | V2 | rebuilt | NO |
| 15 | How it works (`how`) | V3 | upgraded | NO |
| 16 | Towns (`area`) | V1 | upgraded | NO |
| 17 | Towns (`area`) | V2 | upgraded | NO |
| 18 | Towns (`area`) | V3 | upgraded | NO |
| 19 | Call / closing (`call`) | V1 | upgraded | NO |
| 20 | Call / closing (`call`) | V2 | upgraded | NO |
| 21 | Call / closing (`call`) | V3 | upgraded | NO |

## Page systems (tracked here too, so nothing is assumed)

| # | System | passes |
|---|---|---|
| S1 | Direction-aware entrance (Q40 at the F17 dose) on every section | NO |
| S2 | Cursor companion: House / Hammer / Drop + Off; replaces the system cursor on fine pointers | NO |
| S3 | Per-section cursor effect (halo / trail / field) + background reacts back, every version | NO |
| S4 | A different shape divider at every section boundary | NO |
| S5 | Every interactive element has its own SVG reaction (registry in PLAN-FULL.md §G4), hover ≠ press | NO |
| S6 | One self-contained HTML; switchers swap only their section at 1440 and 375 | NO |
| S7 | §12 final gate (all nine items with evidence) | NO |
