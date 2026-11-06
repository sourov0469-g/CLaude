# GATE-PAGE — ROOFING (route `#/roofing`, GLOBAL `FPRoofing`, prefix **`rf-`**)

**Under:** `siding/redo/final/PAGES-BRIEF.md`. **Brief to this page:** shingle roofing (210 documented / 204 priced, median band $10k–$15k), metal roofing (31 / 29, median $20k–$25k), GAF Master Elite (GAF's "fewer than 2%", attributed to GAF only), brands with documented counts (GAF 200, Owens Corning 10, McElroy Metal 31), the published warranties, the storm damage four-step in the homepage wording, the roofing photos from `photos.json`, the Owens Corning North Shoal Creek pair; new interactive pieces; nothing invented; no maps, no video, no outside links.

**Prefix change (needs the coordinator's eye):** the brief gave `pr-`, but the homepage's Process section already owns `pr-` (`.pr-bg`, `.pr-far`, `.pr-in`, `.pr-hd`, `.pr-nd`, `.pr-chip` … in `src/proc.css` / `proc.js`). Using it would have recoloured and broken both; I found it when my storm labels turned pale (Process's `.pr-nd{fill-opacity:.18}` hit my node groups). The page uses **`rf-`** for every class, id, CSS variable and inline-SVG id; I checked that `rf-` and `ps-` appear nowhere else in `src/` or `parts_*.py`.

## 1. Self-audit and decisions

The stub was one heading. **Decisions:** (1) seven sections, each with one new drawn piece: a roof you lay (four kinds, from the firm's own FAQ), a price rail you read like a ruler, a pitch you pick with the published warranty rule, GAF's statistic as a hundred dots, a storm claim you walk along three lanes, a new roof laid over a real before/after from the eaves up, then the close; (2) **every sentence that states a fact is the firm's own** (FAQ, storm page, FACTS.md), asserted at build time; the metal kinds are the FAQ's three (standing seam, screw-down panels, metal shingles) with the firm's one sentence each; (3) **the drawings are labelled as illustrations** ("a drawn illustration of how each roof goes on, not a product specification"); the twelve wipe steps on the photo are labelled as steps of the wipe, not courses counted on that roof; (4) "documented" and "priced" are always named (210 / 204; 31 / 29); (5) **the GAF claim is attributed to GAF in every place it appears** ("GAF says fewer than 2% of contractors nationwide hold it"; never "two certifications", never summed with Hardie); (6) the **storm wording is the homepage four-step**: You file and decide → We inspect and document → We meet your adjuster → We work with your insurer, plus the firm's own fifth line "Once your claim settles, we do the work", with the storm page's limits ("We can't negotiate your claim or discuss your coverage") included; (7) metal's published numbers are small (29 priced), and the page says so beside the chart rather than hiding it.

## 2. What was built (sections, in order)

1. **Opener:** "Shingle and metal roofs, counted job by job." with the two lead sentences (210 / 204 / $10k–$15k; 31 / 29 / $20k–$25k), the GAF line, CTA, four proof chips; **a house with a roof you lay**: four kinds (Shingle, Standing seam, Screw-down panels, Metal shingles). Shingle and metal shingles go on course by course from the eaves up with staggered tab joints and a ridge cap; the panels go on left to right (standing seam: raised seams; screw-down: ribs and visible fastener dots); a 0 to 12 slider lays it (it lays itself once when first seen) with a readout of the firm's own sentence for that kind.
2. **Two roofs** (price rail): a $0–$50k axis (the published chart axis) with the **middle half** (shingle $5k–$20k, metal $15k–$40k) as a long bar and the **median band** (shingle $10k–$15k, metal $20k–$25k) as a lit block that slides when you switch kind; **move the pointer along the axis and it says where a dollar value falls** ("$12k: inside the median band …"); four fact tiles per kind; **brand bars** (GAF 200, Owens Corning 10, McElroy Metal 31 documented projects, the other kind dimmed); **eight roofing photos** (4 shingle, 4 metal) with their published place, month and trade tags.
3. **How steep is your roof?** Choose 2/12 … 12/12; a drawn house changes pitch (rise triangle drawn 100 px = 12 in); the **published rule** lights the card: 3/12 or less: 2-year labor warranty; above: 5-year labor warranty on laminate or designer shingles; always shown: GAF Golden Pledge ("available … through GAF Master Elite contractors", the FAQ's words) and metal (lifetime workmanship on labor + the manufacturer's 30 to 50 years). At 8/12 it quotes the published Fairview, Round Rock job (steep 8/12 roof, GAF Timberline HDZ, finished in a day, Golden Pledge in place).
4. **A badge GAF says fewer than 2% hold:** 100 dots, one lit and the next half lit ("fewer than two"), the GAF Master Elite badge image, "documented GAF projects of ours: 200".
5. **After the storm: who does what:** three lanes (You, Austin Pro, Your insurer), five steps; **drag the claim along the line** (it springs to the nearest step), or choose a step, or use the arrow keys; each step's published paragraph appears (live region); dashed links show the adjuster visit and the estimate and photos going to the insurer; the 31 / 28 / 17 storm figures with their measure named ("storm and insurance jobs in our records").
6. **Laid course by course:** the Owens Corning TruDefinition Duration pair (North Shoal Creek, Austin, Jan 2025, **Roofing portion $30k–$40k** as published): the new roof wipes on from the eaves up with a shingle-tab edge, by slider or drag (it sweeps once when first seen).
7. **Close:** free inspection copy (the firm's), the warranties summary line, CTA to `#/contact`, phone, hours and address.

**Background treatment:** the kit's art on dim sage grounds, never white: services roofline/window (opener, close), swatch fan (two roofs, pair), ruler / level / tape (pitch), reviews bubbles (GAF), blueprint grid (storm); two parallax layers where the file has two.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Stripe's documentation flow diagrams (actors in lanes, numbered steps, one paragraph per step).** Chosen from memory; I did not re-fetch the site in this session. **Transfers:** who-does-what in lanes, numbered steps, a paragraph that follows the selection. **Does not transfer:** their visuals and tone; content here is the firm's storm wording, drawn from geometry.

| Level | Element | Skill → how used |
|---|---|---|
| Section | whole page | ⟦S1434⟧ visual-hierarchy: H1, the two published lead sentences, then the roof; ⟦S1426⟧ law-of-proximity: each control sits under its own heading beside what it changes; ⟦S0220⟧ anti-slop: only published numbers and sentences, asserted at build time; illustrations labelled; the GAF claim attributed |
| Element | radio groups | ⟦S1444⟧ one choice at a time (roving tabindex, arrow keys); ⟦S1454⟧ serial-position: Shingle first, 2/12 first, step 1 first; ⟦S1494⟧ plain labels |
| Motion | lay, rail, claim, wipe | ⟦S1436⟧ animation-principles: courses stagger up the slope, the claim token springs with overshoot, dots pop in sequence; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transform/opacity/clip-path; ⟦S0400⟧ accessible-animation: reduced motion shows the finished roof and every dot at once, no sweeps |
| Element | controls | ⟦S0054⟧ fixing-accessibility: real buttons, radiogroups, labelled ranges with `aria-valuetext`, `aria-live` on every readout, 3 px rings; ⟦S1441⟧ fitts-law: targets ≥ 44 px at four sizes; drag areas `touch-action: pan-y` |
| Proof | numbers | ⟦S0453⟧ proof: 210 / 204, 31 / 29, GAF 200, the storm 31 / 28 / 17, the published pair |
| Site | weight | ⟦S0231⟧ web-performance: 19 KB CSS + 22 KB JS (unminified); images re-encoded at build (8 photos 560 px, one pair 720 px, one badge) |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `page-roofing-1440-top|two|pitch|gaf|storm|pair|close.png` and the same seven at `390`. **55 of 55 checks pass** (`tools/page_roofing_test.js`, Chromium, built with `PAGES_ONLY=roofing`):

| Check | Result |
|---|---|
| Structure, facts | One h1, seven sections; 26 published phrases present; the listed facts are in FACTS.md; the FAQ's 5-year / 2-year / Golden Pledge lines exist; ids all `rf-`/`roofing-`, unique, and not reused by the homepage |
| Links, map, video | All hrefs `#/…`, `tel:` (0 outside); no "map" wording; no video / iframe; CTAs go to `#/contact` |
| Photos | Eight, with place · month · trades and alt text equal to `photos.json` (indices 8, 9, 10, 31 shingle; 12, 13, 14, 15 metal); images 8 + 3 files under 1.2 MB |
| Lay a roof | 12 courses + ridge cap lay themselves; slider lays exactly N and marks the last; keyboard; four kinds each draw their own roof (seam: 12 panels; screw: fastener dots) and read the FAQ sentence |
| Price rail | Shingle: median $10k–$15k, middle half $5k–$20k (drawn 10 % / 30 % and 20 % / 10 % of the $0–$50k axis); metal: $20k–$25k, $15k–$40k (30 % / 50 %, 40 % / 10 %), photos swap, GAF and Owens Corning dim; counts named with their measure; pointer reading ($12k inside the median band, $30k outside the middle half); brand bars 200 / 10 / 31 |
| Pitch | 2/12 and 3/12 light the 2-year card, 4/12 up the 5-year card; readout names the rule and only 8/12 quotes the Fairview job; the rise leg is 16.7 px (2 in) vs 100 px (12 in); Golden Pledge and metal cards carry the published text |
| GAF | 100 dots, one lit, one half-lit, the badge image, "GAF says" present, no "two certifications" |
| Storm | Step names equal the homepage wording + "Then we do the work"; each step moves the token and fills the line (1 − i/4); published limits quoted; dragging from step 1 to the step-4 position selects step 4; arrow keys |
| Pair | Matches `pairs.json` (place, month, product, band, "Roofing portion", alts); slider 6 of 12 hides 50 % from the bottom; drag to the right lays more; both photos load |
| Accessibility | Focus rings on 7 control types; aria-live on all readouts; contrast ≥ 4.5; Montserrat/Inter only; 0 page errors; idle frame time ≤ 20 ms |
| Motion, touch | Reduced motion: finished roof, no pair sweep, bars and dots in place, interactions work; touch: `pan-y` on the pair, axis and storm line; a tap picks a pitch |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390: no overflow, every target ≥ 44 px, 0 errors |

## 5. Defects found and fixed

1. **Prefix clash with the homepage Process section** (see top): storm node labels were faded by Process's `.pr-nd` rule; the whole page moved to `rf-`.
2. Storm labels overlapped and clipped ("measurements"): two-line labels, shorter side notes, and on phones the labels hide (the step buttons carry the names).
3. The pitch drawing's "6 in rise" label ran off the right edge: the triangle moved left.
4. The ridge cap never lit for panel roofs and the count was off by one: fixed (cap lights at 12 of 12 for every kind).
5. Photos in the grid had mixed heights (the `height` attribute beat `aspect-ratio`): `height:auto`.
6. An early note said metal's range is wider "because far fewer metal jobs are priced": a causal claim the firm does not make. Replaced by "Metal's figures rest on 29 priced jobs, shingle's on 204."
7. The pair caption squeezed the slider and its label together: the side column is now a flex column with a full-width slider.
8. Test: a tap on elements outside the viewport and focus rings after pointer use failed spuriously; the test scrolls the element into view and uses a key press first.

## 6. Remaining, named honestly

- **The roofs are illustrations.** The shingle courses, panel seams and fasteners are general (labelled); no product line is drawn or named in the drawing, and the 12 steps are for the wipe/laying only.
- **Metal has only 29 priced jobs**, so the metal middle half ($15k–$40k) is a small-sample range; the page says so but cannot say more.
- **The pitch rule is the published one, read literally:** "5-year labor (laminate or designer shingles), 2-year labor (3/12 pitch or less)". The FAQ does not say what applies to a laminate roof at 3/12 or less; the page shows 2 years there and says "Ask at your free inspection which applies to your roof." It does not claim to know.
- **Owens Corning pair orientation** follows the earlier build's convention (`home4a` after, `home4b` before, as used by the homepage's before/after); I could not verify it against the firm's site from here. The after photo is a green roof, the before a copper-toned roof.
- **The storm paragraphs mix two of the firm's pages** (the homepage four-step names; the storm page's paragraphs); the order of steps 2 and 3 follows the homepage. The FAQ's "you deal with your insurer yourself" is in tension with "We work with your insurer": the page uses the homepage wording and includes the storm page's limits.
- **No roofing cost-guide page was in the harvest**, so the price rail's numbers come from FACTS.md's homepage chart (medians and middle halves) rather than a distribution; no histogram of roofing jobs is drawn.
- **Testing** was Chromium only, headless, touch by emulated events, built with `PAGES_ONLY=roofing` (other pages' `wire()` calls wrapped in the test build only, because the Contact stub's `wire()` throws without its form). Not tested with the other pages' final code.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.2** | The laid roof (shingle, seam, screw-down) reads as a real roof; consistent cards and grounds; lanes and rail are clean (`page-roofing-1440-top.png`, `-storm.png`). **Minus:** the pitch house is simple; the storm diagram on phones drops its labels |
| Usability (30) | **8.4** | Four ways to move the claim (drag, buttons, arrows, readout); axis readout answers "where does my number fall"; every control ≥ 44 px, announced. **Minus:** the pitch rule has an honest gap at ≤ 3/12 laminate |
| Creativity (20) | **8.4** | A roof laid four ways, a ruler-like price rail with a talking pointer, GAF's claim as dots, a claim token in lanes, a roof wiped on from the eaves. **Minus:** wipe and dots are known patterns |
| Content (10) | **9.0** | Published numbers and sentences only, asserted at build time; measures named; attribution held; gaps said. **Minus:** no roofing distribution published |
| **Weighted** | **8.38** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.2 + 0.3 × 8.4 + 0.2 × 8.4 + 0.1 × 9.0 = 3.28 + 2.52 + 1.68 + 0.90 = **8.38**.

## 8. Sub-agent use, stated honestly

None. I designed, built, tested and gated both pages myself. No background tasks except one long test run.

## 9. NEXT

Integration: the full build with all five pages, one cross-page pass (header Roofing link, `#/contact` routing, the shared `pr-` collision resolved by `rf-`), and the Contact page's `wire()` (it throws when its form is absent).
