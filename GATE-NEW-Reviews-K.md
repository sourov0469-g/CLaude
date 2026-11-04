# GATE-NEW — Reviews K, "Marked up by hand"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 5 (Hero, Services, Visualiser and Windows K accepted by Muse).

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Reviews K, "Marked up by hand"** (`?reviews=k`) |
| Primary reference (annex v3, one) | **Graza** (scoped: the custom-animation quality bar). No Reviews version has used Graza: C and J used Apple; D, E and H Cowboy; F Lando Norris; G Lusion; I Dropbox; A and B name none. |
| Signature creative move | **The highlighter.** All 30 published reviews are set as one printed page: continuous text in narrow columns, each review ending with its writer's name in small caps. Pick a theme ("Kept clean", "Quick", "Fair price", "No pressure", "Kept informed", "Professional") and lime highlighter strokes sweep across the exact phrases where homeowners said it, in reading order like a hand with a marker going down the page. Reviews that don't say it fade back. The page becomes a marked-up document that shows what people repeat, in their own words. |
| Style family | Editorial document, marked up: small dense type on white, one lime marker |
| Content | `__REV`, the 30 published Google review excerpts, verbatim (the same text A–J use), with "…" where the published excerpt is cut. Names as published. Each highlight is an exact substring found by pattern at build time (verbatim by construction). Theme counts are computed: "said in n of the 30 reviews shown". Locks: "4.9 from 474 Google reviews"; "474 reviews. 30 of them here." No stars per review and no invented quote, name or rating. |
| How it differs from every existing Reviews version | A builds 4.9 from lap courses. B hangs tags. C scrubs one quote at reading pace. D answers questions. E counts names with bars. F is a masonry wall of cards with search. G streams lines. H stacks letters. I sets one line poster size. J shows 474 marks. None sets all 30 as one continuous page, and none marks up the homeowners' own phrases with an animated highlighter. |
| Why it is better | It turns 30 reviews into evidence you can scan in seconds: pick "Kept clean" and you see every place homeowners said it, in their words, in context. The current best (E, "The names they mention", 8.42) proves the people; K proves the experience, theme by theme. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the marked page); ⟦S0220⟧ verbatim text, build-checked substrings, computed counts with their n; ⟦S1314⟧ one accent (the lime marker) |
| Theme buttons (6) | ⟦S0054⟧ toggle buttons with `aria-pressed` in a labelled group, arrow keys and roving focus; ⟦S1427⟧ one treatment; each shows its count; ⟦S1440⟧ instant pressed state |
| The page | ⟦S1500⟧ 13–15 px text in narrow columns (measure 50–60 characters), names in small caps; ⟦S1425⟧ reviews without the theme drop to 32 % so the marked ones are figure |
| Highlighter strokes | Graza bar: a lime `background-size` sweep per line fragment (`box-decoration-break: clone`), with a slightly irregular edge and tilt; strokes drawn in reading order with a 45 ms stagger, 420 ms each; ⟦S0083⟧ one motion; ⟦S1315⟧ nothing at rest |
| Live line | `aria-live="polite"`: "Kept clean: said in 11 of the 30 reviews shown." Marked phrases are `<mark>`, so screen readers can find them |
| Rating line | Locks verbatim: 4.9 from 474 Google reviews; "474 reviews. 30 of them here." |
| Phone | One column; reviews without the theme collapse (with a "Show all 30" toggle), so the page stays short |
| Reduced motion | Highlights appear at once, with no sweep |
| Background law | White ground; type only |

---

## Build log

**How to view:** `?reviews=k` (switcher: Reviews, **K "Marked up by hand"**).

**Files:** `src/sec/rev6.js` and `rev6.css` (`Rev6.K` is prerendered at build; `Rev6.wire`). Text only; the file grows by 27 KB (19.09 MB).

**The page:**
- All 30 `__REV` excerpts in published order, each followed by "— NAME" in small caps.
- Columns: 4 at 1440, 3 under 1180, 2 under 900, 1 on phones.
- Text at 14 px with 1.62 leading and 34 px gutters, separated by hairline column rules under a deep-green top rule.

**Themes:**

| Theme | Reviews | Phrases | Lit marks |
|---|---|---|---|
| Kept clean | 9 | 9 | 10 |
| Quick | 16 | 18 | 20 |
| Fair price | 9 | 9 | 9 |
| No pressure | 3 | 3 | 3 |
| Kept informed | 9 | 11 | 11 |
| Professional | 9 | every "professional", "professionally" or "professionalism" | 9 |

- Every phrase is located with `indexOf`; the build throws if one is missing.
- Overlaps (for example "professional and clean") are split into runs that carry both themes, which is why some themes light more marks than phrases.
- Highlighter: a lime gradient with soft, slanted ends, swept by `background-size` from 0 to 100 % per line fragment (`box-decoration-break: clone`), 420 ms each, staggered 45 ms in reading order.

**Two attributes:**
- `data-sel` holds the chosen theme, so dimming (and hiding on phones) applies at once.
- `data-th` drives the sweep, and is set only when the page scrolls into view.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-reviews-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- mid-sweep: `-sweep-1440`
- Professional marked: `-pro-1440`
- phone, Kept clean: `-390-marked`
- contact sheet: `new-reviews-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Verbatim | Every rendered review, minus the name, equals `__REV[i].text` exactly (30 of 30). The 60 `<mark>` elements are exact substrings |
| Sweep in reading order | Captured mid-sweep, the first five strokes stood at 74 %, 55 %, 27 %, 7 % and 0.5 % of their width. Once settled, all are 100 % |
| Themes | Kept clean: 10 marks in 9 reviews, 9 at full opacity, "said in 9 of the 30 reviews shown". Quick: 20 in 16. No pressure: 3 in 3. Professional: 9 in 9. ← from Professional goes to Kept informed (11 marks in 9), and focus follows |
| Before arrival | `data-sel="clean"` and `data-th=""`: the choice applies, and the sweep waits for the page to scroll into view |
| Phone | 9 of 30 shown (Kept clean); "Show all 30 reviews" shows 30, `aria-expanded` is true, and the label becomes "Show only the marked reviews" |
| Reduced motion | All Kept clean marks at 100 % immediately |
| Existing versions | 169 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `reviews:k`. Defaults are still hero = 1, services = a, visualiser = b, windows = a, reviews = b |
| Locks | "4.9 from 474 Google reviews" and "474 reviews. 30 of them here." verbatim; names as published; no per-review stars |

## Defects found and fixed

1. **Class collision:** the review paragraph class `.rv` is the review switcher's global class. Renamed `.rvp`.
2. **Phone hiding:** on phones, reviews without the theme stayed visible until the page scrolled into view, because the hiding shared the animation trigger. The choice (`data-sel`) is now separate from the sweep (`data-th`).

## Remaining defects, named honestly

- **Dimmed text contrast:** reviews without the theme are dimmed to 32 % opacity, which fails text contrast on purpose, as figure and ground. Their text stays in the page for screen readers, and choosing another theme brings them back, but on desktop there is no "show all at full strength" control.
- **Curated phrases:** the theme phrases are chosen by me, though each is an exact substring. The counts measure what I marked, not an automatic sentiment analysis; the page says "said in n of the 30 reviews shown".
- **Dense type:** 30 excerpts at 14 px make a dense page, about 1,000 px tall on desktop. That is intended as a document texture, but it is long.
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | reviews K | ⟦S1434⟧ the marked page dominates; ⟦S1314⟧ one accent (lime); ⟦S0220⟧ verbatim and build-checked, counts with their n, locks verbatim |
| Element | 6 theme toggles | ⟦S0054⟧ `aria-pressed`, roving `tabindex`, arrow keys (wrap) with `preventDefault`, a labelled group; ⟦S1427⟧ one treatment; counts shown; ⟦S1440⟧ instant state |
| Element | the page | ⟦S1500⟧ 14 px / 1.62, a 50–60 character measure in columns, small-caps names; ⟦S1425⟧ dimmed reviews recede |
| Element | highlighter | Graza bar: a hand-cut gradient, slanted ends, uneven radii, a per-line sweep, a 45 ms reading-order stagger; ⟦S0083⟧; ⟦S1315⟧ idle at rest; marks are real `<mark>` elements |
| Element | live line | `aria-live="polite"` count sentence |
| Element | Show all (phone) | ⟦S0054⟧ `aria-expanded` with a label that changes |
| Site | reduced motion and background law | Marks shown at once; white ground; type only |

## Reference transfers and non-transfers (Graza)

**Transferred:**
- a custom, hand-feeling animation carrying the meaning: the marker stroke as the signature;
- playful restraint, with one accent colour doing all the work.

**Not transferred:**
- Graza's product photography, illustrations, palette and type.

## Comparison with the section's previous best (Reviews E, "The names they mention", 8.42)

E proves the people: who the homeowners name, with counts and the sentences that name them. K proves the experience: pick a theme and see every place 30 homeowners said it, in context, in their own words.
- **E is stronger on:** the team's faces.
- **K is stronger on:** what a buyer worries about (mess, speed, price, pressure, being kept informed).

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | An editorial document look, unlike any other version; the lime marker is a strong single accent. Minus: a dense, long page |
| Usability (30) | **8.6** | One tap per theme; the count sentence, keys, phone filtering and Show all, all tested. Minus: no full-strength view on desktop |
| Creativity (20) | **8.6** | The animated highlighter over real text is new to the site |
| Content (10) | **9.2** | 30 of 30 verbatim (checked at runtime), 60 exact marks, locks verbatim, counts with their n |
| **Weighted** | **8.58** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Process K until Muse accepts.
