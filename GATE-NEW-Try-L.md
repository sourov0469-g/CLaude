# GATE-NEW — Try L, "Price the job"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 7 (Process L accepted by Muse). It inherits the button system. Game-like mechanics are allowed in Try, and only in Try. This is not a configurator: the visitor enters nothing about their own house.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Try L, "Price the job"** (`?try=l`) |
| Primary reference (annex v3, one) | **Apple AirPods Pro**: numbers as events. A figure is not a line of copy; it lands, big, on its own beat, after a short build-up. No Try version has used Apple: A and B used the Bruno Simon spirit; C Graza; D Lusion; E and I Lando Norris; F Scout; G Cowboy; H Quiet Cubes; J Cash App; K Dropbox. MERSI was set aside (Hero K and Windows L already use its seam). |
| Signature creative move | **Guess the price, then the real number lands.** Six of the firm's own documented jobs, one at a time: the after photo, the place, the month, the trade and what was installed. The visitor picks one of four price bands. Then the published band for that job lands as a big numeral event (Apple's beat): the characters roll up into place, and a seven-step price ladder lights the job's band beside the trade's median band. One line says how close the guess was. After six jobs: "You priced N of 6", the six things that move a siding price (as published), and the one filled "Book a free inspection" for a real number. |
| Style family | A quiz card: one photograph, four answer tiles, a big numeral reveal on white; a thin ladder chart; Apple's cadence, the brand's type and colours |
| Content | Six jobs, each with its published trade band, from `pairs.json` (homepage pairs, from the project pages) and `svcpairs.json` (siding page): Circle C North, Austin (Jul 2026, siding, $10k–$15k); Rob Roy, Austin (Jul 2026, siding, $15k–$20k); Anderson Mill, Austin (Sep 2026, windows, $15k–$20k); Village At Western Oaks, Austin (Aug 2026, siding, $25k–$30k); North Shoal Creek, Austin (Jan 2025, shingle roofing, $30k–$40k); Barton Creek, Austin (Apr 2024, patio covers, $40k–$50k). Each band keeps its published label ("Siding portion", "Roofing portion" …). The trade medians as published on the homepage chart: siding $10k–$15k (415 priced; the lock wording "$10k–$15k median band (415 priced)"), windows $10k–$15k (376 priced), shingle roofing $10k–$15k (204 priced), patio covers $15k–$20k (33 priced). The band definition as published: materials and labour, before discounts, excluding tax. The six siding price levers as published on the siding cost guide. Each job links to its project page. No new claim; "886" is not used. |
| How it differs from every existing Try version | A–D: board, caulk, gutter and paint mini-jobs (D inside the dive). E: inspect with a beam. F: measure with a tape. G: shingle courses bottom-up. H: level a window. I: time nails on studs. J: label parts. K: lap the flashing and run the rain. Every one of them is about the craft of the work. None is about the price, the question every homeowner asks first, and none uses the firm's real jobs and real published numbers as the game board. |
| Why it is better | It turns the most-asked question (what does it cost?) into a short game with honest answers: real houses, the real published band, and the trade median beside it, so a visitor leaves with a calibrated sense of price and a reason to book an inspection for their own number. The current best (Try K, "Flash the window", 8.36) teaches a craft detail; L teaches what the work costs, from evidence. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the job card); ⟦S0220⟧ published records and bands only, tabular numerals, one accent |
| Job card (photo + record) | The published after photo with its published alt; place, month, trade, installed product; ⟦S1449⟧ the record chunked in two short lines |
| Four answer tiles (buttons) | ⟦S1444⟧ four choices, not seven; ⟦S0054⟧ real `<button>`s in a labelled group, each label speaks the band ("$15k to $20k"); ⟦S1441⟧ big targets, 2 × 2 on phones; button system: lift, press, spring, lime ring; after an answer they lock (`aria-disabled`) and show right / your guess |
| Numeral event (the reveal) | ⟦S1452⟧ the payoff beat: the band rolls up character by character (40 ms stagger, 0.6 s, `cubic-bezier(.16,1,.3,1)`), ⟦S1436⟧ decelerating arrival; spoken once through a polite live region |
| Price ladder | ⟦S1420⟧ seven equal steps, direct labels; the job's band filled, the trade's median band outlined and labelled with its priced count; ⟦S1499⟧ one decision per view |
| Closeness line | ⟦S1440⟧ instant feedback: "Spot on", "One band off", "N bands off", with the guess named |
| Progress | ⟦S1457⟧ "Job 2 of 6" and six pips that fill; ⟦S1352⟧ small tabular numerals |
| Next job / See your score | ⟦S0405⟧ a light board `.btn`, focus moves to it after the reveal |
| End card | ⟦S1452⟧ "You priced N of 6" as the final numeral event; the six price levers as published; ⟦S1455⟧ no dead end: "Play again" |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" (shared `CTAS`, with the phone link sized as in the hero) |
| Phone | Photo on top, tiles 2 × 2, ladder labels shortened, no overflow |
| Reduced motion | ⟦S0400⟧ the numeral appears at once; the card swap is a plain cut |
| Background law | White ground; the card is `data-solid` |

---

## Build log

**How to view:** `?try=l` (switcher: Try the job, **L "Price the job"**).

**Files:**
- `tryL()` in `build_site.py`: markup from `pairs.json` (five homepage pairs, from the project pages) and `svcpairs.json` (Rob Roy, from the siding page). The after photos are re-encoded once at 640 × 400, WebP quality 58.
- `src/sec/seq7.js` (`Seq7.wire`) and `seq7.css` (class prefix `tq`; the collision check finds no other rule using these names).
- The file grows by 275,609 bytes (six photos; 21,168,873 bytes).

**The six jobs, in play order:**

| # | Job | Trade | Published band | The four offered |
|---|---|---|---|---|
| 1 | Circle C North, Austin, Jul 2026 | Siding | $10k–$15k | $5k–$10k to $20k–$25k |
| 2 | Village at Western Oaks, Austin, Aug 2026 | Siding | $25k–$30k | $15k–$20k to $30k–$40k |
| 3 | Anderson Mill, Austin, Sep 2026 | Windows | $15k–$20k | $15k–$20k to $30k–$40k |
| 4 | North Shoal Creek, Austin, Jan 2025 | Roofing | $30k–$40k | $20k–$25k to $40k–$50k |
| 5 | Rob Roy, Austin, Jul 2026 | Siding | $15k–$20k | $10k–$15k to $25k–$30k |
| 6 | Barton Creek, Austin, Apr 2024 | Patio covers | $40k–$50k | $20k–$25k to $40k–$50k |

- **The choices:** four consecutive steps of the seven-step ladder ($5k–$10k … $40k–$50k). The right band sits in a different position from job to job.
- **The build checks itself:** every published band must be on the ladder, or the build stops.

**The reveal (Apple's numeral event):**
- On a pick, the four tiles lock (`aria-disabled`). The right tile turns deep green with "Published", or "Spot on" if you picked it; your wrong pick is outlined with "Your pick"; the other two fade.
- A scrim rises on the photo, and the published band rolls up, character by character: 40 ms stagger, 0.6 s, `cubic-bezier(.16,1,.3,1)`, under its published label ("Siding portion").
- One line says how close the guess was: "Spot on", "One band off", or "N bands off", plus "You picked …; the job came in higher / lower".
- **The ladder:** the job's step fills lime. The trade's median step is hatched and labelled "median", so it stays visible when the two coincide. The key quotes the median as published, e.g. "Siding: $10k–$15k median band (415 priced)".
- A polite live region speaks the band and the line once. Focus moves to "Next job" after the reveal.

**The end card:**
- "You priced N of 6" as a final numeral event, plus "Spot on for N of 6 jobs, and one band off for M more".
- A mosaic of the six photos with their bands and how close each guess was, built from the photos already on the page (no extra weight).
- The six price levers, verbatim from the siding cost guide.
- "Play again" resets everything and returns focus to job 1.

**Footer:** the band definition in the cost guide's words (materials and labor, before discounts, excluding tax; a documented sample) and the shared "Book a free inspection" with its phone link, sized as in the hero.

**Inherited from the button system:** the tiles and board buttons lift, press, spring and show the lime ring; "Next job", "See your score" and "Play again" roll their labels.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-try-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- `-1440-landing` (260 ms into the reveal), `-1440-reveal` (a wrong pick, settled), `-1440-spot` (a spot-on pick, median and job apart), `-1440-score` (end card);
- `-390-reveal`, `-390-ladder`;
- contact sheet: `new-try-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Wrong pick (job 1, $20k–$25k) | Numeral "$10k–$15k"; "2 bands off. You picked $20k–$25k; the job came in lower."; tile labels "$10k to $15k, the published band" and "$20k to $25k, your pick"; all four tiles `aria-disabled`; live region spoken; focus on "Next job" |
| Locked tiles | A forced second click changes nothing |
| Next job | Job 2 shown, counter "2", focus on its first tile |
| Keyboard (job 4) | Tab to the right band, Enter: "Spot on. You picked $30k–$40k."; Enter again on the focused "Next job" moves to job 5 |
| End card | Score "3" (from three right answers out of six); "Spot on for 3 of 6 jobs, and one band off for 1 more."; 6 mosaic photos; 6 levers; focus on "Play again" |
| Play again | Job 1 shown; score 0; numeral reset to "?"; no locked tiles; focus on the first tile |
| Reduced motion | The numeral is in place at once (`transform: none` 60 ms after the pick); no card or ladder animation |
| Phone tap (390) | Revealed; numeral 297 px inside a 329 px photo; tiles 160 × 62; 0 overflow |
| Tiles at 768 / 1024 / 1100 / 1180 | One line each, 64 px high, no overflow |
| CTA phone icon | 18 × 18 |
| All 230 version views | 0 page errors; the button system is on in every view; the four subpages are untouched |
| Existing versions | 180 slot templates and 8 page templates unchanged; the page body is identical apart from the one added `try:l` template; the only changed script is the main bundle (adds `Seq7`); defaults unchanged (`try = a`) |
| Locks | "(512) 550-0000" and "$10k–$15k median band (415 priced)" verbatim; "886" not used |

## Defects found and fixed

1. **Slot registration:** the first build did not register `try:l`. My edit looked for `'qj': pre['qj']`, but the entry reads `'j': pre['qj']`. The gate script found no section; fixed, and the template is now present.
2. **The median was hidden when it equalled the job's band:** the lime fill covered the hatched outline, as in job 1, where both are $10k–$15k. The median step now carries a "median" label under its figures, so it shows in every case.
3. **Bands wrapped in the tiles at 768 px** ("$10k–" over "$15k"). The tiles now stay on one line, with 17 px type below 1100 px.
4. **The end card's mosaic** sat at the top, with a gap below it beside the taller levers list. It is now centred against the text.

## Remaining defects, named honestly

- **The levers are for siding:** the six "what moves the price" points come from the siding cost guide, and say so. Two of the six jobs are not siding (roofing and patio covers), and no lever list is published for those trades.
- **The photos show whole houses:** the bands are for one trade's portion ("Roofing portion" …), as published, but the photos also show other work on some jobs.
- **Space at rest on desktop:** before the first pick, the right column ends under the tiles, leaving white space beside the photo until the result fills it.
- **One round of six is short:** it calibrates; it is not a survey. The footer says the bands are a documented sample and that your house will have its own number.
- **Weight:** +275,609 bytes.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | try L | ⟦S1434⟧ the job card dominates; ⟦S0220⟧ published records and bands only, tabular numerals, one accent |
| Element | job card | Published after photo with its published alt; ⟦S1449⟧ the record in two short lines |
| Element | 4 answer tiles | ⟦S1444⟧ four choices; ⟦S0054⟧ real buttons in a labelled group, spoken bands, locked with `aria-disabled` and relabelled after a pick; ⟦S1441⟧ 64 px tiles, 160 × 62 on phones; button system: lift, press, spring, ring |
| Motion | numeral event | ⟦S1452⟧ the payoff beat; ⟦S1436⟧ characters roll up, 40 ms stagger, 0.6 s, decelerating; one polite live announcement |
| Element | price ladder | ⟦S1420⟧ seven equal steps, direct labels, the job filled and the median hatched and labelled; ⟦S1499⟧ one decision per view |
| Element | closeness line | ⟦S1440⟧ instant: spot on, or N bands off, with higher or lower |
| Element | progress | ⟦S1457⟧ "Job N of 6", six pips (deep green when spot on); ⟦S1352⟧ small tabular numerals |
| Element | Next job / See your score / Play again | ⟦S0405⟧ light board `.btn`s; focus moves to them |
| Element | end card | ⟦S1452⟧ the score as the final numeral; ⟦S1455⟧ no dead end, "Play again" resets everything |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button (shared `CTAS`), phone link at hero size |
| Site | phone | One column; tiles 2 × 2; ladder labels at 9.5 px; 0 overflow |
| Site | reduced motion | ⟦S0400⟧ numeral in place at once; plain cuts |
| Site | background law | White ground; the card is `data-solid` |

## Reference transfers and non-transfers (Apple AirPods Pro)

**Transferred:**
- numbers as events: the figure lands big, on its own beat, after a short build-up (the pick);
- one idea per view: one job, one question, one number;
- the final number as the payoff (the score).

**Not transferred:**
- the scroll-scrubbed product film and pinned sequences (Hero 7 and 10 use Apple's scroll grammar);
- Apple's type, black ground and product imagery.

## Comparison with the section's previous best (Try K, "Flash the window", 8.36)

K teaches a craft detail: lap the flashing so water sheds, and see the leak when you get it wrong.
- **L answers the first question homeowners ask:** what does it cost? It uses the firm's real jobs, the bands it published for them, and the trade medians beside them.
- **K is stronger on:** craft, and showing why the work matters.
- **L is stronger on:** price honesty, and calibrating the visitor before they book.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | A calm card; the band landing big on the photo; a clean ladder with the median labelled (`-1440-reveal`, `-1440-spot`); a mosaic end card (`-1440-score`). **Minus:** white space beside the photo before the first pick |
| Usability (30) | **8.6** | One tap per job; tiles that lock and relabel; spoken result; focus moved to the next step; keyboard throughout; reduced motion; phone tap; 0 errors and 0 overflow |
| Creativity (20) | **8.4** | No Try version is about price, and none uses the firm's real jobs and numbers as the game board. **Minus:** a quiz is a familiar format |
| Content (10) | **8.8** | Six published jobs and bands, the trade medians and the levers verbatim, the band definition in the cost guide's words, a link to each project. **Minus:** the levers are siding-only |
| **Weighted** | **8.54** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.6 + 0.2 × 8.4 + 0.1 × 8.8 = 3.40 + 2.58 + 1.68 + 0.88 = **8.54**.

**Vetoes: none.**
- Locks verbatim; no form; nothing claims to be saved or sent.
- Game-like mechanics only in Try; not a configurator (nothing about the visitor's house is asked).
- White ground; brand accents only; normal fonts.
- The firm's own published job photos, with their published alts.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Area L until Muse accepts.
