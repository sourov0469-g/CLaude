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
