# GATE, Build cycle 3 (reference check) and 3b (labelling drawings as illustrative, per S0414)

**Run.** AUSTIN-PROMPT-V2, after Muse's binding correction on GATE-BUILD-2. From here on, every gate cites WEB-SKILLS tags. Each tag was checked against the skill's own text in the attached pack, read in this thread.

**Deliverable.** `siding/brand-v2/site.html` (1.75 MB), rebuilt by `siding/brand-v2/build/build_site.py`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

## 1. Changes

| # | Change | Why | WEB-SKILLS citations (rule → how it is met) |
|---|---|---|---|
| 1 | **Reference check of all 41 sections** against their annex-v3 reference, recorded in `build/REFERENCE-CHECK.md`. Result: 1 gap fixed, 1 deviation recorded (Roofing 5, drawn because there are no patio photos), Rimowa unverifiable (403). | The addendum asks for audit-improve cycles against the references. | **S1307** audit-reference-originality and **S1312** generate-reference-inspired-brand-worlds, both read in Phase 1: each borrowing is checked against its reference and kept to mechanism, never asset or look. **S1490** design-rationale: each row ties the decision to its reason. |
| 2 | **The MERSI plate changes per job.** In home 1 V1 and Our work 4 V2, the plate steps steel-9 → steel-10 → steel-11, and the C1 mark sits tone-on-tone at 16% white, aria-hidden. Previous versions are kept as backups. | MERSI, observed live: its label plate changes colour per project and carries an embossed monogram. | **S0071** better-colors, "Measure the rendered pair": white on steel-9 is 5.96, on steel-10 7.24, on steel-11 8.44 (measured in `phase2/contrast-pairs.md`). Every step passes 4.5:1. **S1312:** reference → original world. The colour change is kept as a mechanism; their hues and monogram are not used, and ours are the brand's steel and mark. **S0444** company-logos: the mark is monochrome. |
| 3 | **Duplicate ids fixed.** The plate mark is now a fresh instance per plate. Ids inside backups, and every `for` / `aria-*` / `url(#)` reference to them, carry a `bk` prefix, both in `snapshot.py` and in the existing backups. | My cycle-3 change introduced duplicate ids; caught by the duplicate-id check before the next build. | **S1268** unique-id: "Each ID must appear only once per HTML document." **S1021** duplicate-id-aria: "Ensure IDs referenced by ARIA attributes (e.g., aria-labelledby) are unique." Met by prefixing the ids and their references together; duplicate-id check: 0. |
| 4 | **Every construction drawing is labelled.** The wall (home 5, both versions), the hero V2 drawing, the window (Windows 1 V2, Windows 2 both), the roof (Roofing 1 and 2, both versions each), the gutter (Roofing 4, both) and the patio covers (Roofing 5, three drawings) now carry "Illustrative drawing of typical construction, not a specification for your home." That is 15 labelled drawings across 14 versions; the previous versions are kept as backups. | Found while citing GATE-BUILD-2. These drawings show typical construction, not the firm's specification. | **S0414** jakubkrehel/teardown: "Hidden or unspecified construction: Omit it, request the missing reference or identify it as illustrative." Met by the caption on each drawing. One shared helper (`shell.ill`) does it, so no drawing can go without the caption. |

## 2. Checks

- **Full-site audit:** 6 pages × 2 versions × 2 widths, plus console errors at each width. **0 problems.**
- **Duplicate ids:** 0, including in the 24 backups.
- **Barred terms in visible text:** 0.
- **Labels:** 15 in live versions, matching the 15 construction drawings.
- **Layout:** checked by capture for the hero V2 drawing column, the pinned wall and the patio pair.
- **Ambient motion** stops on route change: 60 → 0 animation frames per second.
- **Backups in the file:** 24.

## 3. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.5 | +0.1: the plate now follows MERSI's per-project change, within the steel lock. |
| Usability (30) | 7.8 | Unchanged; markup is now valid for ids and ARIA references (S1268, S1021). |
| Creativity (20) | 7.2 | Unchanged. |
| Content (10) | 8.4 | +0.4: drawings no longer imply a specification (S0414). |
| **Weighted** | **7.64** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**

## 4. Remaining

1. **Rimowa: 403.** The visualiser's instrument is held to the annex text.
2. **Waiting on Muse or the firm:**
   - the caption ruling on months;
   - the six process-step names and the descriptive copy;
   - the real colour list.
3. **Cursor companion:** tested by harness only.
