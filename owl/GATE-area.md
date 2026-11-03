# GATE · Service area (home §10): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=area:1|2`. **Default: V1.**

**Basis:**
- **Facts:** the pack's confirmed list of 29 towns, plus Owl's "surrounding Minnesota communities", and Owl's own map.
- **Background:** B2 Rings, assigned to place sections after generation-test round 1.
- **Governing references:** Lando Norris (V1) and Quiet Cubes (V2). See "Governing reference and WEB-SKILLS evidence"
  below; added at Muse's correction. The original line here said "none needed", which was the failing point.

## V1 · List and map
This is the generation-test section, built from the assets alone:
- the section head and the 29-town place-list (Shoreview bold with a pin);
- Call;
- Owl's map in a 4:3 frame.

## V2 · "Is your town on our list?"
A town finder. The field filters the list as you type: matches bold, the rest dimmed. A live answer is announced in
plain words:

| Input | Answer |
|---|---|
| A listed town | "Yes: Owl works in Roseville." |
| "St Paul" | Normalised to Saint Paul |
| A prefix | Lists the matching towns |
| An unlisted town | "Not on the list, but Owl also works in surrounding Minnesota communities. Call or text and ask." This is honest and promises nothing. |

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.0 | 7.0 |
| Usability (30) | 7.5 | 8.5 |
| Creativity (20) | 6.5 | 7.5 |
| Content (10) | 9.0 | 9.0 |
| **Weighted** | **7.25** | **7.70** |

**Default: V1, despite the lower score.** V2 scores higher, but V1 shows Owl's own map, the strongest place evidence Owl
has. The homepage already carries two tools (the game and Price My Roof), and a third input this late would compete with
the call band. **V2 is recommended for the Contact page.**

**Vetoes:** none. No overflow at 1440 or 390; no errors; facts only.

## Tests: 7/7 pass (`areatest.mjs`)
- **Answers:** an exact match; "St Paul" normalised; prefix matches listed; an unlisted town gets the honest answer;
  clearing restores the summary.
- **Each version** has 29 towns.
- **No errors.**
- **Token lint:** clean.

## Defects found and fixed
1. **Punctuation:** a truncated match list ended in "…." (an ellipsis plus a full stop). Fixed.

## Governing reference and WEB-SKILLS evidence (added at Muse's correction; facts, versions and scores unchanged)

### Governing reference, and exactly what transfers
**V1 · Lando Norris** (teardown §6; frames captured at Phase 1b). Lando's archive standard:
- **What transfers:**
  1. **A curated collection in a strict grid, where the collection itself is the proof.** Lando's helmets with year
     tags become Owl's 29 towns, in an auto-fill grid of equal cells with hairline rules. The one tagged exception is the
     home town, Shoreview, in bold with a pin.
  2. **Contour lines as the ground.** They give the section a sense of place without decorative noise. Lando's
     topographic lines become Owl's own tree-ring contours (B2 Rings), drifting at two scales.
- **What does not transfer:** the lime, the helmets, the signature, the dark ground, the fan-card stack.

**V2 · Quiet Cubes** (teardown §7). The instrument the visitor operates:
- **What transfers:** the visitor's first act is a decision about their own case (typing their town), and the result is
  tailored to it (a live yes, a match list, or the honest "surrounding communities" answer).
- **What does not transfer:** the blocking gate (the list is always visible), the dark luxury ground, the pods.

### WEB-SKILLS evidence: mechanism → tag → check against the built section
| Mechanism | Tag | Check |
|---|---|---|
| 29 towns in an auto-fill responsive grid; 3 columns → 2 on phones | ⟦S1428⟧ layout-grid | Pass. Card-grid pattern, consistent gutters, checked at 1440 and 390. |
| Towns grouped by spacing and hairlines, not boxes | ⟦S1426⟧ law-of-proximity, ⟦S1423⟧ law-of-common-region | Pass. Proximity first; the weakest container (a hairline) only; no nested containers. |
| Rings ground (Owl's contours) as place, not noise | ⟦S1364⟧ atmosphere-background (read at Phase 2) | Pass. Layered, one focal cluster, radial mask so the edges recede, drift only while visible. |
| V2 town finder: type to filter, matches bold, others dimmed, count shown ("5 towns match") | ⟦S1453⟧ search-ux | Partial (see below). |
| Live plain-language answer announced (`aria-live`) | ⟦S1440⟧ feedback-patterns, ⟦S0054⟧ fixing-accessibility | Pass. Inline, closest to the action, not colour-only (the answer is words). |
| Unlisted town: never a dead end | ⟦S1453⟧ zero-results, ⟦S1439⟧ error-handling-ux | Partial (see below). |
| Call / Text after the answer | ⟦S1441⟧ fitts-law | Pass. 48px pill targets beside the tool. |

**The V2 finder against search-ux:**
- **What passes:**
  - The placeholder says what to type.
  - The query stays in the field.
  - Matches are highlighted.
  - The result count is shown.
  - It tolerates partial and prefix matches, and "St" → "Saint".
- **What fails:** there is no clear/reset button, and typos are not tolerated.

**The unlisted-town answer:**
- **What passes:** an alternative path (call or text) and human language.
- **What fails:** the answer does not echo the query back ("No match for 'Duluth'").

### Rules not met (recorded as remaining defects; the version is not changed, per the correction)
1. **V2:** no clear/reset control on the finder field (⟦S1453⟧).
2. **V2:** no typo tolerance; "Rosevile" finds nothing (⟦S1453⟧).
3. **V2:** the zero-results answer does not confirm the searched term (⟦S1453⟧).

These go into the build's fix list for when V2 is reused on the Contact page, as recommended above.

## Remediation pass (after acceptance; the scorecard above is left as judged)
The unmet rules recorded for V2's search are met. The superseded versions are kept as backups
(`area-v1-before-remediation.html`, `area-v2-before-remediation.html`; V1 itself is unchanged).
- **⟦S1453⟧ clear button:** appears once there is a query; it empties the field and returns focus; Escape also clears.
- **⟦S1453⟧ typo tolerance:** edit distance 1 for short queries, 2 for longer ("Woodbery" → Woodbury).
- **⟦S1453⟧ zero results echo the query:** "No town matches \"Duluth\". Owl also works in surrounding Minnesota
  communities: call or text and ask."
- **Tests:** `remedtest.cjs` (4 checks here); `areatest.mjs` 7/7.
