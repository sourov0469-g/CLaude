# GATE, Phase 2: identity asset board and generation test

**Run.** AUSTIN-PROMPT-V2, overnight, 2026-11-02.

**Mark.** C1 The Profile House, as picked at the Phase 1 gate. No newer Muse message had arrived when Phase 2 started.

**Deliverable.** `siding/brand-v2/phase2-identity.html`: standalone, 408 KB, fonts and one job photo embedded.

**Sources, all in `siding/brand-v2/phase2/`:**
- `tokens.py`, which writes `tokens.json` (DTCG), `tokens.css` and `contrast-pairs.md`;
- `icons.py`;
- `build_phase2.py`;
- `BRAND.md`.

**Process.** All work was done in this thread, in the foreground. No sub-agents and no background tasks.

**Skills read in full for this phase:**
- S1461, S1463, S1433, S1432, S1465, S1418, S1468, S1466;
- S0546, S1364, S1372, S0071.

**Read in part:**
- S0651: dials, colour and layout rules.
- S0011: logo usage, clear space and minimum size.

## 1. What was built (brief checklist)

| Brief item | Where | State |
|---|---|---|
| Identity asset board | `phase2-identity.html`, 13 sections | Done |
| Tokens (DTCG + CSS) | `tokens.json` and `tokens.css`, in three tiers: primitive → semantic → component | Done |
| Contrast pairs file | `contrast-pairs.md`. 28 pairs computed from token values; 28/28 pass. The board re-measures them live from computed styles in Chromium: 28/28. | Done |
| Carbon-grid icon set | `icons.py`: 26 icons on a 24-unit grid, 2-unit stroke, mitred corners | Done |
| Motifs | Course line, lap band, shadow-line field, corner cut | Done |
| 3 or more full-section backgrounds | 4: B1 course field, B2 steel dither (S1372), B3 section drawing, B4 evening field (S1364) | Done |
| Type (Utopia clamp) | 8 roles; fluid between 360 and 1440 px | Done |
| Spacing ladder | Carbon, 13 steps | Done |
| Component inventory | Nav, buttons with 5 states, form with error, chips, job card, proof, accordion | Done |
| Design dials | Variance 4, motion 5, density 4, each with its reason | Done |
| Motion tokens | 5 durations, 5 easings, reduced-motion override at `:root` | Done |
| Cursor companion, 2–3 variants | 3: A course tick (picked), B corner bracket, C lap chip. Frames are in `shots/p2-cursor-*`. | Done |
| Brand document | `BRAND.md` | Done |
| Exemplar build | Homepage section 4 (services router), from tokens only | Done |
| Generation test | 6 new artefacts from BRAND.md + tokens alone. 4 gaps found, all closed in BRAND.md. | Done |

## 2. Options considered and selections

**Cursor companion.** Three options were built and shot over a target and at idle. A is picked: its behaviour *is* the brand drawing, the course line laid under the hovered target. B was rejected because it duplicates the focus ring's job. C was rejected because it pulls the eye during reading. Per S1472, the rejected options are kept on the board and not grafted onto A.

**Status colour.** One option was considered and rejected: an off-palette red. It would break the black/white/steel lock. The selection: errors are carried by icon + "Check" + sentence + a 2 px neutral-13 border. This also meets "never colour alone" (S1439, S0071).

**Text tiers.** These follow S0071's role mapping, measured:
- `text-primary`: neutral-13;
- `text-secondary`: neutral-11;
- `text-muted`: neutral-9 (6.00:1 on white, 5.34:1 on bg-subtle).

Steel-8 (3.36:1) and neutral-8 (3.35:1) are kept out of every text role.

**Backgrounds.** All four darker or steel fields are capped at steel-9's lightness by construction:
- **B2:** the palette stops at steel-9.
- **B4:** source-over blending toward steel-9.

White text on them therefore never drops below 5.96:1. B4 was first built with additive blending plus a per-pixel clamp, which was too costly per frame; it was replaced.

## 3. Evidence

All screenshots are in `siding/brand-v2/shots/`:
- `p2-full.png` (1440 wide);
- `p2-375.png`: `scrollWidth` 375, with no element overflowing outside a scroll container;
- `p2-backgrounds.png`, `p2-motifs.png`, `p2-exemplar.png`, `p2-gentest.png`;
- `p2-cursor-{a,b,c}-{target,idle}.png` and `p2-cursor-sheet.png`.

**Reduced motion.** `document.getAnimations().length` is 0, and `--duration-deliberate` resolves to 0ms.

**Console.** No errors.

## 4. Self-rating against the SCORECARD

| Category (weight) | Score | Evidence |
|---|---|---|
| Design (40) | 7.5 | One coherent system grown from the mark's line. Strict palette and roles. Four backgrounds with their contrast secured by construction. Corner-cut photo treatment. Held back by B4, whose folds still read slightly as bands, and by the lap band reading a little like a hatch. |
| Usability (30) | 7.5 | 28/28 contrast pairs measured twice. 48 px controls and 44 px chips. Errors that say what to fix. Focus ring 3 px / 3 px offset. Reduced motion at the token level. No overflow at 375. The companion keeps the system cursor and is off for coarse pointers. |
| Creativity (20) | 7.0 | The course-line lockup, the companion that lays the course line, the wall-section blueprint and the cut-corner photos all come from one drawing. The dither field is a known technique, adapted to steel. |
| Content (10) | 8.0 | Facts appear only in their locked wording. Credentials are text only. The form never claims to send. The barred-term grep of the board and BRAND.md: 0 hits. Captions give the place only. |
| **Weighted** | **7.45** | **PASS.** Every category is at 6 or above. |

**Vetoes: zero.**
- No barred facts.
- No third-party logos.
- No OUT references.
- Nothing published.
- No fake people: the signature names its fields "[Person's name] · [role]".

## 5. Defects found and fixed in this phase

1. **Icon trade-siding read as a checklist.** Redrawn as three closed boards with cut ends.
2. **Icon trade-roof read as "scroll up".** Redrawn as a gable with one course line.
3. **The course line's lap step was invisible** at typical widths. Rebuilt taller, with a non-scaling 3 px stroke.
4. **B1's shadow lines ran through the copy.** The field now fades out behind the text.
5. **B3's leader lines pointed at empty space.** They now end on the part they name, with a dot.
6. **B4's folds drew as hard vertical bars.** They are now rendered at 1/8 resolution and scaled up smooth.
7. **The exemplar heading inherited the uppercase label style.** Given its own h2 rule.
8. **The van-door lockup collided with a wheel and the course line.** Re-laid above the sill line.
9. **The signature showed a placeholder name.** It now names the fields.
10. **Overflow at 375:**
    - lockups had no width attribute;
    - tables had no scroll container;
    - the `.g2` grid used `1fr`, where `minmax(0,1fr)` was needed.

    All three fixed; `scrollWidth` is now 375.
11. **Contrast note values were typed by hand.** They are now computed (neutral-8 is 3.35:1, not 3.32:1).
12. **The cursor-companion harness picked no target,** because smooth scrolling moved the stage mid-measure. The harness now uses instant scroll and finds the target by geometry.

## 6. Defects remaining

1. **Literal values in the board's own chrome.** For example, swatch label sizes (11–12 px) and the button font at 16 px. A token audit (S1492) would flag these. They are documentation chrome, not product components, and will not be copied into the build. The build will read tokens only.
2. **B4 still shows faint banding** at the fold edges. Tune the fold widths at build time.
3. **The lap band can read as diagonal hatching.** Consider a deeper profile, or using it only at section breaks inside the wall-assembly chapter.
4. **Cursor companion A was checked by harness only** (stage frames). There has been no hand test with a real mouse; to be checked in the build.
5. **Open question to Muse: photo captions.** Default until ruled: place only, no month.
