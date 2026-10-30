# Consolidated Master Directive: final gate report

Elbaz Construction homepage, single file `remodeling/site/elbaz-homepage.html`, built from `remodeling/src/`.
Every line below is backed by a script in `remodeling/src/tools/` and an output file in `remodeling/qa/`. You can re-run each one.

## Gate results

| Gate item | Result | Evidence |
|---|---|---|
| **Token check**: every UI hex belongs to the token set | **Pass.** 0 off-token colour literals in presented code. The token set is the 18 hex values declared in `tokens.css`. | `python3 tools/tokencheck.py` |
| **Light check**: no black or near-black sections | **Pass.** 0 near-black grounds in 80 visible slots (10 sections × 8). Deep-green sections: **none used**. | `node tools/gatecheck.js` → `qa/gatecheck.txt` |
| **Logo**: header, footer, favicon | **Pass.** All three are the roof-E SVG: the header and footer use the same image, and the favicon is the mark. | `qa/gatecheck.txt` (`logo:` line) |
| **Facts** | **Pass.** Detail below. | `node tools/facts.js` → `qa/facts.txt` (FACTS FAILS: 0), `qa/gatecheck.txt` |
| **Integrity**: versions per section | Hero: **16** (8 visible + b1–b8). Sections 2–10: **12** each (8 visible + b1–b4). Nothing deleted. See "Collision" below. | `qa/gatecheck.txt`; `tools/backupcheck.py` |
| **Bespoke interactive** | **Pass, end to end.** Detail below. | `node tools/pickertest.js` → `qa/pickertest.txt` |

**Facts detail:**
- The licence line reads exactly "Licensed, bonded & insured · CBC1265280".
- The only rating printed is **4.8** and the only review count is **343**.
- "52 photographed projects" and "30+ years combined" appear zero times.
- There are exactly **4** before/after pairs.
- Every Consult version carries the phone number, hours, office and the full privacy sentence.

**Bespoke interactive: the Finish picker (hero slot 1).** Tap a cabinet finish and the hero swaps to the real Elbaz kitchen built in that finish, named with its project title. Each swatch is cut from that project's own photograph.
- 6 of 6 swatches show distinct photos with real titles.
- Arrow keys wrap around the row.
- Reduced motion swaps instantly.
- 0 page errors.

**Backups are byte-identical records.** `backupcheck.py`, run against the commit before Phase 5 (`7e95579^`), passes for all 44 backups:
- HTML blocks and JS definitions are identical except for the slot name.
- Each section's CSS from that commit is still present unchanged at the head of the file (Phase 5 and 6 only appended).

**Collision (logged in PROGRESS.md).** Sections 2–10 had 3 visible versions and 1 backup when Phase 5 began. Moving the 3 visible versions to b2–b4 gives 4 backups, not 8. The other four backups would have to be versions that never existed, and inventing them to fill the count would be false.

## Phase 6: three QA rounds per section under the new skin

Tool: `node tools/p6qa.js <round>` → `qa/phase6-r1.txt`, `phase6-r1-hero.txt`, `phase6-r2.txt`, `phase6-r3.txt`.

| Round | Text measured (80 slots) | Below WCAG AA | Switchers 1–8 working | Backups opening | Page errors |
|---|---|---|---|---|---|
| r1 | 1,627 | **66** | 10 / 10 | 44 / 44 | 0 |
| r2 | 1,542 | **9** | 10 / 10 | 44 / 44 | 0 |
| r3 | 1,680 | **0** | 10 / 10 | 44 / 44 | 0 |

**What r1 and r2 caught and fixed:**
- Accent-orange numerals used as text were moved to the accent-text shade. This covered step and sheet numbers, plan-room codes, punch-list and floor numbers, and the hero rating star.
- A lender row that was not a match had been faded to 2.8:1. It now stays readable and shows "off" with a dashed rule.
- The week stamps sat on a dark scrim; they now use a white plate.
- The title-block keys on orange now use full ink.
- The turntable stage tint was lightened.

All fixes were appended, so backups render exactly as recorded.

**Not machine-measured.** In r3, 242 text items sit inside SVG artwork or over photos, where a computed background would be a guess. They are counted rather than passed silently, and the heaviest were checked by eye. In hero 4, for example, the text sits on an opaque white card.

**Other Phase 6 checks:**
- **Consult honesty** (`tools/consulttest.js`), all 8 visible versions:
  - An empty send opens nothing and shows errors.
  - A valid send composes exactly one mailto to Sales@elbazconstruction.com.
  - The confirmation says the email app "should now be open" and never claims the message was sent.
- **Reactions** (`tools/rxcheck.js`, plus `SLOTS=4,5,6,7,8`): 462 + 304 controls covered, 0 missing, 0 duplicate specs.
- **Per-section interaction tests** written in Phase 5: `worktest.js`, `reviewstest.js`, `townstest.js`, `pickertest.js`. All pass in both motion settings with 0 errors.

## Commits per phase

| Phase | Commits |
|---|---|
| Phase 0 note + 2a light palette | `02fa2be` |
| Phase 1 logo | `10e1dbf` (roof-E, nav/sheet/footer), mono set in `02fa2be` |
| Phase 2b tokens | `205ff20` |
| Phase 3 design upgrade | `49e1544` (hero), `d2f4c4e` (labels, accents, artwork), `571bee4` (proof seal fix) |
| Phase 4 bespoke interactive | `49e1544` (Finish picker), `1753b6d` (evidence) |
| Phase 5 version expansion | hero `7e95579` `017f6b6` · proof `eedadff` `68567bc` · services `76b96be` · before/after `125bc19` · process `9c2cb57` · financing `053da7c` · work `3b391d0` · reviews `876ed0c` · towns `feb3701` · consult `1f549fa` |
| Phase 6 QA | `a783445` (rounds 1–2, tooling) and the commit carrying this report (round 3, gate) |

## Open items for the owner

1. **Photo/caption mismatch: `k-walnut-marble`.** It is titled as a kitchen but shows a hallway. It still appears under its title in the pre-existing versions. All Phase 5 new versions leave it out.
2. **Photo/caption mismatch: `k-emerald-shaker`.** It is titled as a kitchen but shows a laundry run. The handling is the same as item 1.
3. **Page weight is 3.07 MB.** The earlier audit target was 2.6 MB or less. The overrun comes from the added versions (8 visible per section) and their scripts and styles; the images are unchanged (37 AVIFs).
4. **Hours copy.** "Usually the same or next working day" in the Consult confirmation is pre-existing copy and is not on the locked-facts list. Please confirm it or strike it.
