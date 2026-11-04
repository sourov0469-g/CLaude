# GATE-NEW — Reviews L, "The whole job, in their words"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 5 (Windows L accepted by Muse). It inherits the button system. Nothing game-like and no configurator.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Reviews L, "The whole job, in their words"** (`?reviews=l`) |
| Primary reference (annex v3, one) | **Scout Motors**: sequenced proof (the story told in order, with evidence at each step), set as Scout's honest spec sheet: plain labelled rows, hairline rules, no decoration. No Reviews version has used Scout: C and J used Apple, D, E and H Cowboy, F Lando Norris, G Lusion, I Dropbox, K Graza; A and B name none. |
| Signature creative move | **A job, vouched for at every stage.** The 30 published reviews are taken sentence by sentence and put in the order a job happens: getting a price → getting started → the crew at work → kept informed → the clean-up → the result → would they hire again. Each stage is one spec-sheet row: its number, its name, a bar for how many of the 30 reviews speak to it ("in 12 of the 30"), its strongest sentence large, two more beneath, and a "Show N more" button for the rest. On arrival the rows settle in order and the bars grow to their counts, like a sequence of proof. |
| Style family | An editorial spec sheet: numbered rows, hairline rules, count bars, quotations in display type |
| Content | The 30 reviews published on the firm's site (`__REV`): every quoted sentence an exact substring of a review, attributed by name as published, cuts ("…") kept. Each sentence is placed once, at the first stage whose words it uses (the rule is stated on the page). "Rated 4.9 from 474 Google reviews" verbatim. No paraphrase, no invented stage text. |
| How it differs from every existing Reviews version | A sets 4.9 in lap courses, B hangs tags, C reads at reading pace, D asks the neighbours, E counts staff names, F lists all 30 with search, G streams, H stacks letters, I sets one line poster-size, J marks 474 against 30, K highlights themes across a printed page. None puts what homeowners said into the order of a job, and none shows, stage by stage, how many reviews vouch for it. |
| Why it is better | It answers a prospect's real question, "what will it be like, start to finish?", with homeowners' own sentences at every step, and it shows where the evidence is thick (the crew, would they hire again) and where it is thin (the clean-up). The current best (K, "Marked up by hand", 8.58) shows themes. L shows the journey. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the stage sheet); ⟦S0220⟧ verbatim sentences, the placement rule printed |
| Stage rows (`<ol>`) | ⟦S1424⟧ continuity: numbered rows read top to bottom; ⟦S1427⟧ one row treatment |
| Count bars | ⟦S1499⟧ data honesty: the bar is N / 30 published reviews, labelled in words, not a rating |
| Lead quotation | ⟦S1500⟧ display type for the strongest sentence; the name as published, in small caps |
| "Show N more" | ⟦S0054⟧ `aria-expanded` / `aria-controls`; the extra sentences in a list; inherits the button system (lift, press, spring, ring) |
| Arrival | ⟦S1436⟧ rows settle in order (80 ms apart) and bars grow to their counts (0.9 s ease-out), once; ⟦S1325⟧ sequence without scroll-jacking |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" |
| Phone | Rows stack: label, bar, then the quotes |
| Reduced motion | ⟦S0400⟧ rows and bars shown complete |
| Background law | White ground; the sheet is `data-solid` |

---

## Build log

**How to view:** `?reviews=l` (switcher: Reviews, **L "The whole job, in their words"**).

**Files:**
- `src/sec/rev7.js` and `rev7.css`: `Rev7.L` is prerendered at build from `__REV`; `Rev7.wire` wires it.
- The build registers the module, the `rl` key, the `l` slot entry, the label and the wire call.
- No images. The file grows by 23 KB.

**The sorting:**
- Each review is split into sentences at `.`, `!`, `?` or `…` followed by a space.
- Each sentence is checked against seven word patterns in a fixed order, most specific first: clean-up, kept informed, price, getting started, result, would hire again, and the general "crew" last. It is placed at the first that matches, so no sentence appears twice.
- The stages are then shown in the order a job happens.

**Choosing the lead sentence for each stage:**
- whole sentences before the site's own "…" cuts;
- then clean sentences of 60–170 characters, with no run-together punctuation such as "day!single";
- then the one closest to 130 characters.

**Per-stage counts and quotes:**
- Each stage's count is the number of distinct reviews with a sentence placed there.
- 66 sentences are quoted in all: the lead, two beneath it, and the rest behind "Show N more".

| Stage | Reviews that speak to it | Lead sentence (verbatim) |
|---|---|---|
| 01 Getting a price | 12 of 30 | "This was a big project and he was so patient with sending over multiple quotes …" (Katie Littleton) |
| 02 Getting started | 9 of 30 | "Paul Hale with Austin Pro was responsive and helped with a roof inspection … within 24 hours." (Lynnette Agueros) |
| 03 The crew at work | 13 of 30 | "Kevin and his team, as well as Garrett, went above and beyond …" (Annamaria Scaccia) |
| 04 Kept informed | 6 of 30 | "They kept the communication open the whole time …" (Jesus Armando Ochoa Rodriguez) |
| 05 The clean-up | 6 of 30 | "… the work site was all cleaned up." (Karen HIbpshman, name as published) |
| 06 The result | 3 of 30 | "The new doors look fantastic and operate perfectly." (Jason Eternick) |
| 07 Would they hire again | 14 of 30 | "Was a pleasure interacting with them, and I would truly recommend them …" (Lucas Wang) |

**Arrival:** the rows settle in order, 80 ms apart, and the count bars grow to N / 30 (0.9 s ease-out), once.

**Inherited from the button system:** the "Show more" buttons lift, press and spring, and show the lime ring. The page's one board CTA rolls its label.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-reviews-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- `-1440-sheet`, `-1440-more` (a stage expanded), `-390-sheet`;
- contact sheet: `new-reviews-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Verbatim | All 66 quoted sentences are exact substrings of the review published under the same name (build-checked) |
| Count bars | Widths 120 / 90 / 130 / 60 / 60 / 30 / 140 px (= N / 30 of a 300 px track) |
| Show more | Stage 1: `aria-expanded="true"`, the list shown with 10 more sentences, the label "Show fewer"; again → "Show 10 more"; Enter works from the keyboard with the ring |
| Reduced motion | Rows and bars complete at once (opacity 1) |
| Locks | "Rated 4.9 from 474 Google reviews" verbatim; names exactly as published |
| Existing versions | 178 slot templates and 8 page templates byte-identical; `<main>` identical apart from the one added `reviews:l` template; defaults unchanged (`reviews = b`) |

## Defects found and fixed

1. **Mis-sorted sentences:** the first patterns placed "looking…" under "The result" and missed "cleaner when they left". They were tightened ("looks great/amazing/…", "cleaner", "clean when"), and each sentence is now placed once, most specific stage first.
2. **A run-on led a stage:** a 230-character run-on with a typo in the homeowner's own words ("a thigh schedule") led "Getting started". It stays among the quotes (verbatim), but leads now prefer clean sentences of 60–170 characters.
3. **Run-together punctuation led "The result":** "day!single story yes,but" led that stage. Such sentences no longer lead.
4. **Doubled button label:** re-rolling the "Show more" label through the button system would have printed it twice, because it is not a `.btn`. That call was removed.

## Remaining defects, named honestly

- **Keyword sorting is not reading:** a sentence about two things counts once, at its first matching stage, and the counts are "reviews that speak to it by those words", as the page says, not a measured share of opinion.
- **"The result" is thin** (3 of 30), because homeowners mostly praise the people and the process. The page shows that honestly rather than padding it.
- **The same name can appear twice** in one stage (Ray Cole under "Getting a price"), because two of his sentences qualify.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | reviews L | ⟦S1434⟧ the stage sheet dominates; ⟦S0220⟧ 66 verbatim sentences, the placement rule printed under the sheet |
| Element | 7 stage rows | ⟦S1424⟧ numbered rows read in job order; ⟦S1427⟧ one row treatment, hairline rules |
| Element | count bars | ⟦S1499⟧ N / 30 published reviews, in words beside the bar; not a rating |
| Element | lead quotation | ⟦S1500⟧ display type, curly quotes, name in small caps as published |
| Element | Show N more | ⟦S0054⟧ `aria-expanded` / `aria-controls`, the label swaps; button system: lift, press, spring, ring |
| Motion | arrival | ⟦S1436⟧ rows 80 ms apart, bars grow over 0.9 s, once; ⟦S1325⟧ sequence without scroll-jacking |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button, with the rolling label |
| Site | ≤ 900 px | Rows stack (label, bar, quotes); quotes in one column |
| Site | reduced motion | ⟦S0400⟧ complete at once |
| Site | background law | White ground; the sheet is `data-solid` |

## Reference transfers and non-transfers (Scout Motors)

**Transferred:**
- proof told in sequence;
- the honest spec sheet: labelled rows, hairline rules, plain numbers and uppercase micro-labels;
- restraint: nothing decorates the evidence.

**Not transferred:**
- Scout's film roll and cinematic photography (used elsewhere on the site);
- its palette and type.

## Comparison with the section's previous best (Reviews K, "Marked up by hand", 8.58)

K lays all 30 reviews out as a printed page and highlights themes across it: where homeowners said things.
- **L reorganises the same words into the order of a job,** so a prospect reads what the price, the start, the crew, the communication, the clean-up, the result and the decision to hire again were like, each in homeowners' own sentences.
- **K is stronger on:** showing the whole of every review.
- **L is stronger on:** answering "what will it be like, start to finish?"

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A calm, confident spec sheet: numbered stages, count bars, one large quotation per stage (`-1440-sheet`). **Minus:** long; the bars are small |
| Usability (30) | **8.6** | Readable top to bottom with no interaction; "Show more" per stage; keyboard and ring; stacks on phones; reduced motion; 0 errors and 0 overflow. **Minus:** seven stages make a long scroll on phones |
| Creativity (20) | **8.4** | No Reviews version reorders homeowners' words into the journey of a job. **Minus:** the spec-sheet form itself is familiar |
| Content (10) | **8.8** | 66 verbatim sentences build-checked against the source, names as published, the rule printed, thin stages shown as thin |
| **Weighted** | **8.50** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.6 + 0.2 × 8.4 + 0.1 × 8.8 = 3.36 + 2.58 + 1.68 + 0.88 = **8.50**.

**Vetoes: none.**
- Locks verbatim; no form.
- White ground; brand accents only.
- Normal fonts; no locked mechanic; no invented imagery.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Process L until Muse accepts.
