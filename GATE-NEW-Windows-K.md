# GATE-NEW — Windows K, "376 jobs, set in type"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 4 (Hero K, Services K and Visualiser K accepted by Muse).

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Windows K, "376 jobs, set in type"** (`?windows=k`) |
| Primary reference (annex v3, one) | **Dropbox Brand** (subtraction discipline; type as the interface). Windows A–J used Apple ×2, Lando Norris, Graza, Cash App, Quiet Cubes, Cowboy and Scout; Dropbox has not been used in Windows. |
| Signature creative move | **Type as data.** The 12 price bands of the 376 priced window jobs are set as one column of display type, from "Under $2k" to "$100k+". Each band's type size is scaled so its area is proportional to the number of jobs (size ∝ √count). The block of type itself forms the distribution: it swells to "$5k–$10k" (96 jobs, the most common) and thins to "$100k+" (1 job). Nothing else is drawn. A lime bracket marks the published middle half ($5k–$25k). |
| Style family | Typographic data poster: one column of Montserrat set by the numbers, on white |
| Content | From the firm's windows cost guide (FACTS.md, sum verified as 376): Under $2k 12 · $2k–$5k 40 · $5k–$10k 96 (most common) · $10k–$15k 79 (median band) · $15k–$20k 50 · $20k–$25k 30 · $25k–$30k 19 · $30k–$40k 30 · $40k–$50k 13 · $50k–$60k 4 · $75k–$100k 2 · $100k+ 1. Middle half $5k–$25k. Median bands by maker: NT Windows $10k–$15k, Simonton $10k–$15k, Andersen $20k–$25k, Pella $5k–$10k. Plus 388 documented window jobs, and "most window-only jobs take 2 days". Shares are computed from the published counts and shown with their n. No price is quoted for any visitor's house. |
| How it differs from every existing Windows version | A is a day slider on a drawn window. B builds out a bay. C takes a window apart. D lists window jobs with photos. E is a unit chart by maker. F shows how windows open. G gives frame colours by maker. H counts your windows. I is a window of quotes. J walks a replacement step by step. None shows what window jobs cost across all bands, and none uses type size as the measure. |
| Why it is better | It answers the first question every window buyer has ("what will this cost?") with the firm's whole record, honestly shaped, in one glance. It doesn't single out one median, and it is readable without a chart. The current best (I, "A window of words", 8.32) builds trust through voices; K builds it through the full price record. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the type column); ⟦S1499⟧ data honesty (area ∝ count, the scale stated on the page, every band shown including the 1-job band); ⟦S0220⟧ published figures only, tabular counts |
| Band rows (12) | ⟦S1500⟧ display type at computed sizes, tight leading, one weight; ⟦S0054⟧ each row a button with `aria-pressed` and a label giving band, count and share; arrow keys move between rows |
| Middle-half bracket | ⟦S1422⟧ a lime bracket implies the group; labelled "Middle half of jobs: $5k–$25k" |
| Median and most-common tags | ⟦S1435⟧ one lime tag "median band" and one outlined tag "most common"; nothing else is coloured |
| Note card | `aria-live="polite"`: "79 of 376 priced window jobs (21%) landed at $10k–$15k…", with the plain meaning of median and middle half |
| Maker chips | ⟦S0054⟧ toggle buttons; choosing a maker moves a marker to that maker's median band (NT, Simonton, Andersen, Pella), with its job count |
| Arrival motion | ⟦S1329⟧ rows rise in once, top to bottom (40 ms stagger); ⟦S1315⟧ nothing at rest; reduced motion: none |
| CTA | ⟦S1435⟧ one filled Book button; "We measure every opening at the free inspection" (homepage wording) |
| Phone | Sizes scale with the viewport (the same √ rule, a smaller maximum); the note card sits under the column |
| Background law | Pure white; the type is the only content |

---

## Build log

**How to view:** `?windows=k` (switcher: Windows, **K "376 jobs, set in type"**).

**Files:** `src/sec/win6.js` and `win6.css` (`Win6.K` is prerendered at build; `Win6.wire`). No images; the file grows by 16 KB (19.06 MB).

**The type column:**
- 12 rows, one per price band, in price order.
- Size = max(13 px, √(count / 96) × `--mx`), where `--mx` is clamp(52 px, 7.4 vw, 116 px) on desktop, clamp(52 px, 11 vw, 100 px) when the column runs full width, and clamp(38 px, 13.5 vw, 60 px) on phones.
- Rendered at 1440: from Under $2k at 38 px up to $5k–$10k at 107 px, and down to $100k+ at 13 px (held at the floor).
- Each row is a button holding the band, its count, and a tag where one applies ("most common" on $5k–$10k; "median band", lime, on $10k–$15k).
- A lime bracket with a vertical label "Middle half · $5k–$25k" spans the four middle rows.

**Side panel (sticky on desktop):**
- the live note card;
- "Median band, by maker" toggle buttons (NT Windows 238 · Simonton 54 · Andersen 38 · Pella 31), which place a marker such as "◂ Andersen" on that maker's band;
- 388 documented window jobs · 2 days;
- the measuring line and Book;
- the scale and source note.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-windows-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- the Andersen marker: `-1440-andersen`
- contact sheet: `new-windows-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Counts | 12 bands, summing to 376, identical to the cost guide in FACTS.md |
| Area ∝ count (measured) | Rendered label area per character per job: 69, 71, 69, 66, 69, 72, 72, 74, 74, 73 and 70 across the 11 bands above the floor, so the encoding holds. The 1-job band reads 100 because it is held at the 13 px floor (stated on the page) |
| Arrival | Rows rise in once, then all 12 are at full opacity |
| Note card | Opens on the median band: "79 of 376 priced window jobs (21%) landed at $10k–$15k. It is the median band…". Clicking $5k–$10k gives "96 of 376 (26%) … The most common band." |
| Keys | ↓↓ moves to $15k–$20k (13%) with focus following; End goes to "$100k+: 1 of 376 (under 1%)"; Home and End don't scroll the page |
| Makers | Andersen marks $20k–$25k ("across 38 priced jobs"); Pella moves the single marker to $5k–$10k; pressing Pella again clears it |
| Reduced motion | No arrival motion; all rows visible at once |
| Existing versions | 168 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `windows:k`. Defaults are still hero = 1, services = a, visualiser = b, windows = a |

## Defects found and fixed

1. **Side panel class:** it first used `.sd`, which a global rule targets (`.sd .board`). Renamed `.wsd`.
2. **Tablet size:** at 768 the column stayed at the desktop size although it ran full width, so the distribution looked timid. When single-column it now scales to 11 vw (up to 100 px).

## Remaining defects, named honestly

- **Figures new to the homepage:** the 12 band counts, the maker median bands for Simonton and Pella, and the shares are published in the firm's own windows cost guide (FACTS.md, sum verified), but they appear on the homepage for the first time. The homepage itself already carried 376, $10k–$15k, $5k–$25k, the four makers' job counts and Andersen's band.
- **The $60k–$75k gap:** the guide lists no band between $50k–$60k and $75k–$100k, so the column shows none. That is faithful to the source, but a reader may notice the jump.
- **Size floor:** the two smallest bands (2 jobs and 1 job) sit at or near the 13 px floor, so they are slightly larger than strict proportion. This is stated on the page.
- **Phone tags:** at 390 the tags wrap under their band, which makes those rows taller. That is acceptable but less tidy than desktop.
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | windows K | ⟦S1434⟧ the type column dominates; ⟦S1499⟧ data honesty (area ∝ count, the scale and floor stated, every band shown down to 1 job, the source named); ⟦S0220⟧ published figures, tabular counts |
| Element | 12 band rows | ⟦S1500⟧ one weight, tight 1.02 leading, sizes by rule; ⟦S0054⟧ buttons with `aria-pressed`, roving `tabindex`, ↑↓/Home/End with `preventDefault`, and labels giving band, count, share and tag |
| Element | middle-half bracket | ⟦S1422⟧ one lime rule implies the group, with a vertical label (hidden on phones; the note card says it) |
| Element | tags | ⟦S1435⟧ one filled lime "median band"; "most common" outlined |
| Element | note card | `aria-live="polite"`; plain meanings of median and middle half |
| Element | maker toggles | ⟦S0054⟧ `aria-pressed` toggles in a labelled group; a single marker; a live sentence |
| Element | Book | ⟦S1435⟧ the only filled button |
| Motion | arrival | ⟦S1329⟧ rows rise once with a 40 ms stagger; ⟦S1315⟧ nothing at rest |
| Site | reduced motion and background law | No motion; white ground; type only |

## Reference transfers and non-transfers (Dropbox Brand)

**Transferred:**
- type as the interface and the image;
- subtraction: no chart furniture (axes, bars and gridlines are all removed, and the type is the chart);
- one confident accent.

**Not transferred:**
- Dropbox's palette, illustrations and typeface (Montserrat and Inter, as locked).

## Comparison with the section's previous best (Windows I, "A window of words", 8.32)

I builds trust through four verbatim reviews in a window. K answers the price question with the firm's whole record: every one of 376 priced jobs, shaped by count, with the median, the middle half and four makers' medians one tap away.
- **I is stronger on:** warmth.
- **K is stronger on:** the decision a buyer has to make.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | The column of type is the distribution, a poster-like shape that reads at a glance (screenshots at 1440, 768 and 390). One accent, generous white |
| Usability (30) | **8.4** | Click or keys per band, live plain-English notes, maker toggles, all tested. Minus: the phone tags wrap |
| Creativity (20) | **8.6** | Type size as the data encoding, measured to hold; new to the whole site |
| Content (10) | **9.0** | All 376 priced jobs, every band shown, the source and scale stated, n beside every share. Minus: band counts new to the homepage (from the firm's published guide) |
| **Weighted** | **8.58** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Reviews K until Muse accepts.
