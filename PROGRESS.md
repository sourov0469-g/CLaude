# PROGRESS — Elbaz Construction homepage, FULL BUILD

Governing brief: the FULL BUILD PROMPT (remodeling), §1–§14. This file holds state, decisions, the conflicts log, open issues and the §12 gate evidence. It is updated at every phase and every section commit. Failures stay visible here; nothing is marked kept, rebuilt or done without evidence.

Branch: `claude/fervent-planck-6tl8eq`. Deliverable: `remodeling/site/elbaz-homepage.html` (one self-contained file). Source: `remodeling/src/` (build: `python3 remodeling/src/build.py`).

---

## Phase 0 — setup (evidence)

| Item | Evidence |
|---|---|
| Base branch merged | `git fetch origin claude/hrm-presentation-slides-xag1ax && git merge origin/claude/hrm-presentation-slides-xag1ax` → "Already up to date." (merged earlier at c133890; nothing new upstream) |
| Raw skills reassembled + verified | `cat bank-index/web-skills-raw/part-0* \| sha256sum` → `fe81307bc11935af8dc54870325aaccf917a0284d9ffeab6b7d833dec36d22b6` = the manifest SHA-256. Match. |
| Shortlist source | `bank-index/BANK-MAP.md` front matter + Section Playbooks 1–10 + Mechanism Families Index; Atlas entries opened only for shortlisted IDs (listed per version in TRACEABILITY.md) |
| estes.html | Not looked for (does not exist, per brief). |
| FACTS.md read | `remodeling/FACTS.md` read in full (159 lines). |

### Licence string (copied verbatim from remodeling/FACTS.md line 41)

- Credential: `Florida Certified Building Contractor, licence CBC1265280`
- Printed form: `Licensed, bonded & insured · CBC1265280`
- Token every on-page licence mention must carry, character for character: `CBC1265280`

### Reviews (locked, §3)

`4.8 stars, 343 Google reviews`. Aggregate-led ONLY. No individual review quotes exist for this build; none may be invented or shown. Link: `https://www.google.com/maps?cid=17916885921843924422`.

### Baseline (weight cap and per-section state)

| File | Bytes | Role |
|---|---|---|
| `remodeling/site/elbaz-homepage.html` at **b07f0b8** (current) | **3,874,583** | **The weight cap.** The brief's "current (baseline) size". |
| `remodeling/site/elbaz-homepage.html` at 68f8ff5 | 3,973,574 | The file the owner reviewed (his verdict in §3B was given on this one). |

Current split (b07f0b8): image store 3.07 MB (36 WebP photos), fonts 0.06 MB, code ≈0.74 MB.

Screenshots of every section × version at both widths (contact sheets, rows = sections, columns = v1 v2 v3):
- Owner-reviewed file: `remodeling/qa/baseline-old-68f8ff5-1440.jpg`, `remodeling/qa/baseline-old-68f8ff5-375.jpg`
- Current file: `remodeling/qa/baseline-current-b07f0b8-1440.jpg`, `remodeling/qa/baseline-current-b07f0b8-375.jpg`
- Tooling: `remodeling/src/tools/shootall.js` (one shot per section × version, 1440×900 and 375×812, console log) + `remodeling/src/tools/sheet.py` (contact sheets). Console on both baseline runs: clean.

Per-section state at baseline (b07f0b8): every version except Hero V2 is a PLAN-V3 rebuild of the owner-reviewed 68f8ff5 design (compare the two baseline sheets: no V3 version reuses its 68f8ff5 layout). Hero V2 was augmented in PLAN-V3 beyond the owner's "exactly one thing" (crop marks, outline-to-fill headline, star fill, licence moved out of the lead): this is a §3B breach and is reverted in Phase 2.

---

## Conflicts log (§2: §3/§3B > §1 > §4 > reference mechanism > judgement)

| # | Conflict | Ruling | Why |
|---|---|---|---|
| C1 | FACTS.md holds 20 verbatim Google reviews; §3 says "No individual review quotes exist; invent none", aggregate-led ONLY. | **§3 wins.** All quotes and reviewer names removed from the page. Reviews V1/V2/V3 rebuilt as aggregate-only centrepieces (4.8 and 343 are the only review figures used). | §3 outranks a data file. |
| C2 | Hero V2 "gains exactly one thing" (§3B) vs flag 3 "dead Bebas weight effects must be replaced with effects that render" (§3B). V2's only dead effect is the h1 `fontWeight 200→700 / fontStretch` scrub (Bebas ships one weight and `font-synthesis: none` is set, so it never rendered). | **V2 keeps exactly what the owner saw.** The dead tween and its dead CSS are deleted (zero pixels change because it never rendered). No new headline effect is added to V2. Flag 3 is met in V1 (stroke-drawn letters) and V3 (34-layer extrusion), which are rebuilds. | The banned list (§5) names "Restyling, moving or improving Hero V2's design" explicitly; the narrower instruction governs V2. Deleting dead code changes nothing a visitor sees. |
| C3 | Hero V2 "exactly one thing" vs rule 5 / §3B "every button gets its own designed SVG reaction". | **V2's CTA gets its own SVG hover/click reaction.** At rest the design is pixel-identical apart from the proof line (Phase 2 before/after proves it). | Both are §3B; a hover reaction is not part of the composition at rest, and the owner named the hovers as broken. |
| C4 | "Every section gets 3 rebuilds unless they pass §4 with evidence" vs. the current file already being a full rebuild of the owner-reviewed versions. | Every version is re-audited against §4 (Phase 1). Versions whose design passes and whose defects are system-level (reactions, dosing, cursor) are fixed in place and must then pass the §12 gate; versions that fail on design, facts or trick repetition are rebuilt to a new reference. | The owner's rejection applied to the 68f8ff5 designs, all of which are already gone (baseline sheets). |
| C5 | "NO plain or fixed cursor" vs. text fields needing a precise caret. | System arrow hidden on fine pointers while the companion is on; the companion carries an exact pointer tip that changes form per target. Text inputs keep the native I-beam (`cursor:text`) because caret placement must be exact; the companion still reacts there. Touch, reduced motion and "Off" restore the system cursor. | §1.13 nothing broken ships; a lagging tip over a text field breaks caret placement. |
| C6 | Section switcher (1·2·3) and Settings buttons are review tools, not site UI, yet rule 5 says every button. | They get reactions too (one per section switcher, each digit drawn differently), tested like everything else. | Rule 5 has no exemption. |

---

## Open issues (live list)

- [ ] Phase 1 re-audit rows (TRACEABILITY.md) for all 30.
- [ ] Hero V2 restore + proof line + before/after comparison.
- [ ] Reaction uniqueness: 218 interactive elements measured on baseline; many share reactions or have none (see Phase 3).
- [ ] Repeated tricks (see PLAN-FULL §2).
- [ ] Reveal dosing 0.15–0.3s across all sections.
- [ ] Cursor: system arrow still shows (C5).

---

## Phase log

(appended below as phases complete)
