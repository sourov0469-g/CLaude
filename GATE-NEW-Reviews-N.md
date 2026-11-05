# GATE-NEW — Reviews N, "Your worry, their words"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 4, section 5 (Hero N, Services N, Visualiser N and Windows N accepted by Muse). No configurator, nothing game-like.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Reviews N, "Your worry, their words"** (`?reviews=n`) |
| Primary reference (annex v3, one) | **Ever**, verified craft only: the apartment selection and filtering presentation (filters above; the result set re-flows beneath, every item gliding to its new place; a live count). Not its pairs, which the annex bars. Ever is the only annex reference no Reviews version has used: C and J used Apple, D, E and H Cowboy, F Lando Norris, G Lusion, I Dropbox, K Graza, L Scout, M MERSI; A and B name none. Quiet Cubes, Cash App, Rimowa and Bruno Simon are scoped elsewhere. Ever's magazine narrative is already on Hero N and Windows N this pass, and its 3D on Booking M, so the filtering craft is the one used. |
| Signature creative move | **Pick your worry; the homeowners who wrote about it step forward.** One question, "What worries you most about hiring a contractor?", and six worries homeowners actually have: the mess they leave, being kept in the dark, sales pressure, a job that drags on, paying too much, loose ends at the end. Pick one and the reviews that speak to it glide into place, each showing the exact sentence that answers it with the words highlighted. A live count says how many of the 30 published reviews speak to it. Any card opens to the whole review. |
| Style family | A selection presentation: one question, six worries, a re-flowing set of evidence cards |
| Content | The 30 Google reviews published on the firm's site (`window.__REV`), verbatim; names and "Google review, 2026" as published. Each worry's evidence is a hand-checked phrase that occurs exactly once in its review, added to the build's verbatim lock (the build fails if one stops matching). The rating is "4.9 from 474 Google reviews" only; no per-review stars. Counts are "N of the 30 reviews we publish". |
| How it differs from every existing Reviews version | A sets 4.9 in lap courses; B hangs tags; C reads at reading pace; D asks the neighbours; E counts the staff names; F is all 30 with search and a trade filter; G is a stream; H letters; I one line at poster size; J 474 and the 30; K marked up by hand; L the job in their words, stage by stage; M before and after. F filters by what was done; none answers the buyer's own worry with the sentences that address it. |
| Why it is better | Reviews persuade when they answer the reader's actual doubt. N starts from the doubt ("will they leave a mess?") and answers it with the homeowners' own words, highlighted, so the proof is specific rather than general praise. The current best (L, "The whole job, in their words", and M, "Their before, their after", both 8.63) tell the story; N meets the objection. |
| Pairing note (F17) | Process M also uses Ever's filtering craft. Pick one filtering section for a page. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the evidence set); ⟦S0220⟧ published reviews verbatim, phrases build-locked |
| Worries | ⟦S0054⟧ a `radiogroup` of six, roving tabindex, arrows and Home / End; ⟦S1441⟧ 48 px |
| Re-flow | ⟦S1436⟧ FLIP: staying cards glide to their new place, arriving cards rise in, staggered; transform and opacity only |
| Evidence card | The sentence that answers the worry with the phrase highlighted; name and source; "Read the whole review" toggle (`aria-expanded`) |
| Count | ⟦S1494⟧ "9 of the 30 reviews we publish speak to it"; ⟦S1440⟧ polite on change |
| Rating | "4.9 from 474 Google reviews" verbatim, once |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" |
| Phone | Worries as two-column chips; one column of cards |
| Reduced motion | ⟦S0400⟧ the set changes at once |
| Background law | White ground; the stage is `data-solid` |

---

## Build log

**How to view:** `?reviews=n` (switcher: Reviews, **N "Your worry, their words"**).

**Files:**
- `src/sec/rev9.js` (`Rev9.N`, `Rev9.wire`, `Rev9.W`, `Rev9.PICK`) and `src/sec/rev9.css` (class prefix `rn` under `.rnN`; the collision check found no shared names).
- `build_site.py`: the module is added to `MODS`, pre-rendered as `rn`, wired, given the `reviews` slot letter `n`, and listed in the switcher. **`Rev9.PICK` joins the build's verbatim lock**, so the build fails if any evidence phrase stops matching its review. Nothing else changed.
- The file grows by **27,967 bytes**; no images.

**The worries and their evidence** (46 hand-checked phrases; each occurs exactly once in its review, as published):

| Worry | Reviews that speak to it | Example (highlighted words) |
|---|---|---|
| The mess they leave | 9 | "The house and yard was cleaner when they left than it was when they got here." |
| Being kept in the dark | 8 | "They kept the communication open the whole time" |
| Sales pressure | 3 | "There was no pressure." |
| A job that drags on | 12 | "put on a new one in one day" |
| Paying too much | 9 | "at half the price of the others" |
| Loose ends at the end | 5 | "Garrett was extremely thorough with punch out" |

Two candidate matches were cut while curating, because they did not answer the worry: "really do what they say" (honesty, not pressure) and "without any hiccups" (a smooth job, not loose ends).

**The presentation** (Ever's selection craft):
- **Above the set:** the question "What worries you most about hiring a contractor?", six worries as a radiogroup (each with its count), the live count "9 of the 30 reviews we publish speak to it", and "4.9 from 474 Google reviews".
- **Beneath:** the evidence cards in published order. Each shows the sentence that holds the phrase (cut at the sentence's own punctuation), with the phrase highlighted in lime, then the name and "Google review, 2026", then "Read the whole review", which opens the full published excerpt with the same highlight.
- **The re-flow (FLIP):** every visible card's position is recorded, the set changes, and each staying card glides from where it was (0.56 s). Arriving cards rise in, staggered by 45 ms, and the count fades up. Opened reviews close on a change.
- **Phone:** the worries become a two-column grid, with one column of cards.
- **Reduced motion:** the set changes at once.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-reviews-n-1440-0`, `-1440-1`, `-1440-flow` (mid-re-flow, 230 ms in), `-1440-drag`, `-1440-open`;
- `-1024-0`, `-1024-1`, `-768-0`, `-768-1`, `-390-0`, `-390-1`, `-390-tap`;
- contact sheets `new-reviews-n-1440-sheet.jpg` and `new-reviews-n-390-sheet.jpg`.

Section QA ran on `?bg=none`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids; every control 48 px; 3 / 2 / 1 card columns |
| At 1024 | 0 errors; nothing in Reviews N passes the viewport. The page's 17 px is the pre-existing default Services A (flagged with Windows N) |
| Every worry, every width | For all six worries at 1440, 1024, 768 and 390: the visible set equals that worry's list in published order, the count equals the set, each card's mark is exactly its phrase, each evidence sentence is a substring of its review and contains the phrase |
| Re-flow | Mid-flow frame shows staying cards gliding and new cards rising; after it settles, 12 cards for "A job that drags on"; live "A job that drags on: 12 of the 30 reviews we publish speak to it." |
| Keys | → moves to "Paying too much" with focus; End → 5; Home → 0; ← from 0 wraps to 5 |
| Whole review | Opens (`aria-expanded="true"`, "Close the review"). The text equals the published excerpt exactly, with its highlight. Changing the worry closes it |
| Locks | "4.9 from 474 Google reviews" and (512) 550-0000 verbatim; no stars anywhere in the section; the build's verbatim lock passes with the 46 new phrases |
| Phone | Tap "Sales pressure" → 3 cards (Ray Cole, Joe Liu, David McPherson) |
| Reduced motion | Change at once; 0 animations on cards or the count; 0 errors |
| All homepage version views (126) | 0 page errors and 0 overflow in every one |
| Existing versions | The 196 existing slot templates are byte-identical; one template added (`reviews:n`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Reviews stays B); subpages untouched |

## Defects found and fixed

1. **Two matches did not answer their worry.** "really do what they say" was under sales pressure, and "without any hiccups" under loose ends. Both were cut while curating, leaving 3 and 5 reviews, which is fewer but true.
2. **The first render patched markup with a regex.** The pre-render filled cards by rewriting strings; cards now take their evidence directly.
3. **Targets were 44 px.** "Read the whole review" sat at 44 px; it is 48 px now, like every other control.
4. **The sixth worry wrapped alone.** At 1440, "Loose ends at the end" fell onto a second row by itself; tighter chips keep all six on one row.
5. **Colour transitions ran under reduced motion.** The worry buttons faded their colour; that is off now too.

## Remaining defects, named honestly

- **The worries are my grouping.** The words are the homeowners', but which worry a phrase answers is a judgment. The highlight shows exactly which words it rests on, so the reader can judge too.
- **Uneven card heights.** Cards keep their own heights (the grid aligns to the top), so rows end raggedly; equal heights would stretch every card when one opens.
- **Sales pressure has three reviews.** That is the honest number.
- **Another filtering section.** Process M uses Ever's same craft; pick one for a page.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Reviews N | ⟦S1434⟧ the evidence set dominates; ⟦S0220⟧ published reviews verbatim, 46 phrases in the build lock |
| Element | worries | ⟦S0054⟧ radiogroup, roving tabindex, arrows wrap, Home / End; ⟦S1441⟧ 48 px |
| Motion | re-flow | ⟦S1436⟧ FLIP glide 0.56 s; arrivals rise in, staggered; transform and opacity only |
| Element | evidence card | Sentence with the phrase highlighted; name and source; whole-review toggle with `aria-expanded` and `aria-controls` |
| Element | count | ⟦S1494⟧ "N of the 30 reviews we publish speak to it"; ⟦S1440⟧ polite, on change |
| Element | rating | "4.9 from 474 Google reviews", once; no stars |
| Element | CTA | ⟦S1435⟧ the one filled Book button; the honest foot line |
| Site | phone | Worries in a two-column grid; one card column |
| Site | reduced motion | ⟦S0400⟧ changes at once, no colour fades |
| Site | background law | White ground; the stage is `data-solid` |

## Reference transfers and non-transfers (Ever, verified craft only)

**Transferred:**
- the selection presentation: choosers above, the result set re-flowing beneath with every item gliding to its place, a live count.

**Not transferred:**
- Ever's pairs (barred);
- its magazine and 3D crafts (used elsewhere);
- its apartments, imagery and copy.

## Comparison with the section's previous best (Reviews L and M, 8.63)

- **L and M are stronger on:** story. L walks the whole job through the reviews; M sets before against after.
- **N is stronger on:** meeting the reader's objection. It starts from their doubt and answers it with the specific words homeowners used, highlighted, rather than general praise.
- **Verdict:** L and M stay the best by a hair.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | A calm question, six clear worries, evidence cards where the highlight does the work (`-1440-0`, `-1440-flow`, `-1440-open`). **Minus:** ragged card rows; a familiar card grid |
| Usability (30) | **8.7** | One tap answers a real doubt; keys, phone grid, whole-review toggle; the count says how much evidence there is; 0 errors in 126 views |
| Creativity (20) | **8.5** | No Reviews version starts from the reader's worry or highlights the answering words. **Minus:** the filtering craft also drives Process M |
| Content (10) | **8.8** | Every word published and unedited; 46 phrases build-locked; honest small counts; the rating lock only |
| **Weighted** | **8.59** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.7 + 0.2 × 8.5 + 0.1 × 8.8 = 3.40 + 2.61 + 1.70 + 0.88 = **8.59**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; nothing game-like.
- White ground; brand accents only; Montserrat / Inter only.
- No invented reviews, words, ratings or numbers.

---

## NEXT PLAN — Background removal (GATE-BACKGROUND-REMOVAL), for Muse's consult

Under AUSTIN-CONSULT-FIRST-2026-11-05 and AUSTIN-BACKGROUND-REMOVAL-2026-11-05. The removal order puts this step after the Reviews N accept and before Process N, so this NEXT PLAN covers the removal. The removal gate will carry the NEXT PLAN for Process N, including that version's own creative unit in place of the global background. Nothing below has been built: only measured.

### AUDIT — the background system as it stands (measured on the current `out/site.html`, 37,774,940 bytes)

| Part | Where | Bytes in the file |
|---|---|---|
| IG-exact comparison world (their plaster, noises, geometry, 30+ textures) | `<script id="bgw-ig">` from `bg2_html()` | 11,863,018 |
| B2 Street of Roofs (the default) | `bgw-b2` | 1,162,594 |
| B1 Relief Terrain | `bgw-b1` | 679,518 |
| B3 Material Field | `bgw-b3` | 551,506 |
| V1 hidden world (three baked panels + `world.js`) and the `?bg=` selector | the inline selector script | 572,613 |
| Engine: Three.js r150 + the copied flowmap/reveal shaders (`src/bg2/engine.bundle.js`) | inline script | 454,877 |
| **Total background** | | **15,284,126 (40.5% of the file)** |

**What it does well:** nothing the owner values. The engine itself was sound (DPR cap, pause on hidden tabs, static under reduced motion), but the owner's verdict stands on the evidence:
- **Space:** 15.3 MB, mostly worlds that are never shown. Only one world is decoded per visit, yet all five ship.
- **Load:** a WebGL renderer, texture decode and shader compile run at start, on top of the HTML parse.
- **Quality:** the revealed worlds were judged poor.

**Hooks the sections have into it:**
- **`data-solid`:** 267 attributes across section markup (homepage and subpage modules), marking surfaces that block the reveal. They are inert without the background.
  - One other reader exists: `photo-hero.js` (heroes 1 and 2) uses `[data-solid]` to keep its own photo effect off its cards.
  - `field.js` reads it too, but is not in `site.html` (only the older `build.py` uses it).
- **The review switcher (`fx.js`):** a "Background" row built from `window.__BGLIST` / `__BGSEL`.
- **CSS:** `fx.css` `.world{position:fixed…}` for the canvas. (`.wnB .world` in `windows.css` is Windows B's own 3D bay and unrelated; `.sd1C .bg2` in a subpage is an unrelated photo class.)
- **The cursor companion** lives in `nav.js` and has no reference to the background. It stays untouched.

**What the file is after the background:** about 22.49 MB. Of that, about 20.35 MB is 190 embedded images (photos for the versions and subpages). The removal takes away the 40% that is background and all the WebGL start-up work. It does not make the file small, and the gate will report that plainly, with a proposal if you want a further weight pass.

### RESEARCH — governing reference and mechanism

- **Reference:** none. This is a removal, not a version, so no annex design reference applies.
- **Discipline:** the brief's F18 weight rule (the weight must actually leave the file) and the owner's load test.
- **Mechanism:** subtraction at the build, so nothing is hidden or disabled in place.
- **What does not transfer:** no replacement global effect of any kind (the order bars it). The page's life moves into each section's own units, version by version, from Process N on.

### THE PLAN — per element

1. **Build (`build_site.py`):**
   - Delete `bg2_html()`, `bg_panels()`, `BG2_DEFAULT`, `BG2_LIST` and the `?bg=` selector script (it also carries `world.js` and the V1 panels), and stop emitting the engine bundle and the five world blocks.
   - `?bg=` and `&bg=none` become harmless no-ops.
2. **Ground:** `html, body` set explicitly to `#FFFFFF`; no canvas anywhere. Section stages keep their own surfaces (for example `#F6F8F6` panels); deep green and lime stay as content accents only.
3. **Review switcher (`fx.js`):** remove the Background row; the section and version rows stay as they are.
4. **CSS (`fx.css`):** remove the `.world` canvas rule. Unrelated `.world` / `.bg2` classes in Windows B and subpage SD1 stay.
5. **Hooks:**
   - Strip every `data-solid` attribute from section markup (homepage and subpage modules and `build_site.py`).
   - For heroes 1 and 2 only, the photo effect's own "not over a card" test switches to a local `data-ui` attribute (`photo-hero.js`), so their behaviour is unchanged.
   - This touches every existing version's markup by that attribute only. The gate will prove that each template, with `data-solid` stripped from the old file, is byte-identical to the new one.
6. **Repository assets:** delete `src/bg2/` (engine and bundle), `src/world.js`, `src/world-pictograms-retired.js`, `media/bg2/`, `media/igx/`, `media/bg/`, and the copied third-party code in `bgstudy-v2/background-code/`.
   - Git history keeps them; the study and gate documents stay as history.
   - `src/field.js` stays, because the older `build.py` (not `site.html`) still uses it. **Muse to confirm:** delete the repository assets too (my recommendation), or only drop them from the build.
7. **Cursor companion:** verified independent of the background; no change. The gate will show it still runs at 1440 on a fine pointer and is absent on touch.

**Proof the gate will carry:**
- **Bytes:** before and after, plus a search of the built file for `bgw-`, `BG2`, `__BGSEL`, `THREE`, `flowmap` and `data-solid`, all expected at 0.
- **Every view:** every homepage version view (126) and every subpage view switches and renders with 0 page errors and 0 overflow, plus the review switcher itself.
- **Pages:** 1440 and 390 screenshots of the white page.
- **An honest load check, before and after:**
  - over `file://`: time to DOMContentLoaded, time to `load`, first contentful paint, total main-thread long-task time and JS heap;
  - over a local HTTP server with throttled network: time to first paint and to fully loaded.
- **Status:** PROGRESS and the version switcher with the background entries gone.

**Why this is right:** it removes 15.3 MB and every GPU start-up cost, the owner's two complaints, without changing a single version's look or behaviour (proved per template). It also leaves the companion and every section exactly as Muse accepted them.
