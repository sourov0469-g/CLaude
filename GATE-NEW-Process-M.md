# GATE-NEW — Process M, "Your job, in order"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 6 (Hero to Reviews M accepted by Muse). It inherits the button system. Nothing game-like. The picker selects which published sequence to read; nothing is built, priced or configured for the visitor.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Process M, "Your job, in order"** (`?process=m`) |
| Primary reference (annex v3, one) | **Ever**, its verified craft only: the apartment selection and filtering presentation (filters above, the result set re-flowing beneath with every item gliding to its new place, a live count). Not its pairs, which the annex bars. No Process version has used Ever: C used Lusion and Graza, D and H Dropbox, E Graza, F an Erie note, G Cowboy, I Cash App, J Apple, K Quiet Cubes, L Scout. MERSI was just used in Reviews M and Lusion three times this pass; Bruno Simon, Lando Norris and Rimowa are scoped elsewhere. |
| Signature creative move | **The process re-sequences for your job.** Pick the job (Siding, Windows, or Siding and windows) and the step cards re-flow into that job's order. The steps every job shares glide to their new positions. Steps that belong only to the other trade leave, and the ones for this job slide in. The numbering re-counts, and a live line states how many steps and how long, as published. For both trades together, the order changes visibly: the windows are ordered first and go in first, then the siding and paint, exactly as the firm's FAQ says. |
| Style family | A filtered result grid: three filter chips above numbered step cards that re-flow, with a summary rail of the published facts for the chosen job |
| Content | Every line is the firm's own published wording. The four homepage steps (`Proc.CH`, verbatim); the siding FAQ ("1 to 2 weeks, including the painting process"; HardiePlank lap, 8.25-inch Select Cedar Mill; paint with 1,700+ Sherwin-Williams colors or ColorPlus factory-baked; soffit and fascia usually in the same job); the windows FAQ ("built to order for your openings, so the order comes first"; "two days on site" for most window-only jobs; "the windows usually go in first, so the new siding and trim seal cleanly around each opening"); hours Mon–Fri 8–8, Sat 8–6, Sun 12–5; the locked "$10k–$15k median band (415 priced)", the windows median band ($10,000–$15,000, 376 priced), "30-year James Hardie non-prorated warranty" and the lifetime workmanship warranty on labor. No duration is invented for any single step; only the published totals appear. |
| How it differs from every existing Process version | A stacks chapters. B pins a wall. C drops a plumb line. D sets four columns. E turns a dial. F asks questions. G stamps a card. H writes one paragraph. I splits your part and ours. J sets four numbers. K hands a baton between staff. L follows one dated job. All of them show one fixed process. None changes the sequence to match the job, and none shows how the order differs when windows and siding are done together. |
| Why it is better | It answers the question a homeowner actually has ("what will happen at my house, in what order, and for how long?") for their own job, in the firm's own words, and it shows the one sequencing fact that matters on combined jobs. The current best (L, "One job, on its calendar", 8.62) proves one real timeline; M generalises it honestly to the visitor's job. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the step grid); ⟦S0220⟧ published wording only; no per-step durations |
| Job chips (3) | ⟦S0054⟧ `radiogroup`, roving tabindex, arrows wrap, Home / End; ⟦S1444⟧ three choices; button system (hover, press, spring, ring) |
| Step cards | ⟦S1325⟧ an ordered list (`<ol>`) that re-numbers; each card a step title, its published text, and the trade it belongs to |
| Re-flow | ⟦S1436⟧ FLIP: shared cards glide from old to new positions (0.7 s ease-out); leaving cards fade and shrink; entering cards rise in, staggered 60 ms |
| Summary rail | ⟦S1449⟧ the job's published totals: time, median band, warranty, hours; ⟦S1494⟧ plain sentences |
| Live line | ⟦S1440⟧ `aria-live="polite"`: "Siding and windows: 7 steps. Windows go in first." |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" |
| Phone | Chips in one row (scrolling sideways if needed); cards in one column; summary under the chips |
| Reduced motion | ⟦S0400⟧ no FLIP: the new sequence appears at once |
| Background law | White ground; cards and summary are `data-solid` |

---

## Build log

**How to view:** `?process=m` (switcher: Process, **M "Your job, in order"**).

**Files:**
- `src/sec/proc8.js` (`Proc8.M`, `Proc8.wire`, `Proc8.S`, `Proc8.JOBS`) and `src/sec/proc8.css` (class prefix `pm` under `.prM`; the collision check found no shared names).
- `build_site.py`: the module added to `MODS`, pre-rendered as `pm`, wired, given the `process` slot letter `m`, and listed in the switcher. Nothing else changed.
- The file grows by **16,422 bytes**; no images.

**The three sequences:**

| Job | Steps, in order | Summary rail |
|---|---|---|
| Siding (6) | Free inspection · Detailed proposal · Old siding off, new boards up · Soffit and fascia · Paint · Final check | "A siding replacement typically takes 1 to 2 weeks, including the painting process." · $10k–$15k median band (415 priced) · 30-year James Hardie non-prorated warranty, plus our lifetime workmanship warranty on labor · hours |
| Windows (5) | Free inspection · Detailed proposal · Windows built to order · Windows set and sealed · Final check | "Most of the window-only jobs in our files took two days on site." · median band $10,000–$15,000 (376 priced) · each brand's warranty, plus our lifetime workmanship warranty on labor · hours |
| Siding and windows (8) | Free inspection · Detailed proposal · Windows built to order · **Windows go in first** · Old siding off, new boards up · Soffit and fascia · Paint · Final check | "The windows usually go in first, so the new siding and trim seal cleanly around each opening." · both price lines · both warranties · hours |

Each card carries a tag (Every job · Siding · Windows · Siding and windows) and its source (Our process · Siding FAQ · Windows FAQ).

**The re-flow (FLIP):**
- Each card's box is measured, the list is re-ordered, and the boxes are measured again.
- **Shared cards** glide from the old box to the new one (0.7 s, `cubic-bezier(.22,1,.36,1)`).
- **Leaving cards** are lifted out of flow at their old place and fade and shrink (0.32 s).
- **Entering cards** rise in, staggered 60 ms.
- Numbers re-count, the step count updates, and the live line states the job's steps and the published timing.
- Rapid switching leaves no stray cards.

**Layout:**
- **Desktop:** chips and a step count above; a three-column card grid; a sticky summary rail on the right.
- **Under 980 px:** the summary drops below the cards.
- **Phone:** one column, and the chips scroll sideways.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-process-m-1440-0` (siding);
- `-1440-flow`: 330 ms into Siding → Siding and windows; the shared cards mid-glide, the windows steps rising in;
- `-1440-both`, `-1440-windows`, `-1440-1`;
- `-768-0`, `-768-1`, `-390-0`;
- `-390-both`: tapped on a phone;
- `-390-1`;
- contact sheet `new-process-m.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids; chips 48 px tall |
| Verbatim | All 15 sentences on the nine cards are exact substrings of the homepage process (`process.js`) or the published siding and windows FAQs (`faq.json`); 0 failures |
| Sequences | Siding `insp, prop, side, soffit, paint, final` (01–06); Windows `insp, prop, order, win, final` (01–05); Both `insp, prop, order, first, side, soffit, paint, final` (01–08); the count and live line match each |
| Rapid switching | Five switches 90 ms apart → the right final sequence, 0 stray cards |
| Keyboard | One tab stop; → wraps from "Siding and windows" to "Siding"; End → "Siding and windows"; Home → "Siding"; ← wraps; focus follows |
| Phone tap (390) | "Siding and windows" → 8 steps; 0 overflow |
| Reduced motion | The new sequence appears at once; no animation of mine runs (the only one is the button system's 90 ms brightness press on the chip, by design) |
| All homepage version views (118) | 0 page errors and 0 overflow in every one |
| Existing versions | The 189 existing slot templates are byte-identical; one template added (`process:m`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Process stays A); subpages untouched |
| Locks | "$10k–$15k median band (415 priced)", "30-year James Hardie non-prorated warranty", "Mon–Fri 8–8 · Sat 8–6 · Sun 12–5" and "(512) 550-0000" verbatim |

## Defects found and fixed

1. **On phones and tablets the summary came first,** pushing the steps below the first screen. It now follows the cards; the steps lead.

## Remaining defects, named honestly

- **Two trades only.** The firm publishes a sequence and timing for siding and windows only, so roofing, gutters, doors and painting-only jobs have no sequence here. I did not write one for them.
- **Some cards join two published sentences** from two sources (for example "Windows set and sealed" combines a process sentence and a windows-FAQ sentence). Each sentence is exact, and the card's source line names both.
- **No per-step durations,** because none are published. The rail gives only the published totals.
- **On phones the step count is hidden** (it is in the live line and the numbering).
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Process M | ⟦S1434⟧ the step grid dominates; ⟦S0220⟧ published wording only, sources on every card |
| Element | 3 job chips | ⟦S0054⟧ radiogroup, roving tabindex, arrows wrap, Home / End; ⟦S1444⟧ three choices; button system: hover, press, spring, ring |
| Element | step cards | ⟦S1325⟧ an ordered `<ol>` that re-numbers; tag, title, published text, source |
| Motion | re-flow | ⟦S1436⟧ FLIP glide for shared cards (0.7 s), fade-out for leaving cards, staggered rise-in for entering cards |
| Element | summary rail | ⟦S1449⟧ the job's published totals; ⟦S1494⟧ plain sentences; sticky on desktop |
| Element | live line | ⟦S1440⟧ polite: steps and published timing per job |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button |
| Site | phone | One column; chips scroll sideways; summary after the steps |
| Site | reduced motion | ⟦S0400⟧ no FLIP; the sequence appears at once |
| Site | background law | White ground; cards and rail are `data-solid` |

## Reference transfers and non-transfers (Ever)

**Transferred:**
- the selection and filtering presentation: filters above, results that re-flow with each item gliding to its new place, and a live count.

**Not transferred:**
- Ever's before/after pairs (barred by the annex) and its 3D visualisations;
- its apartment imagery, type and palette.

## Comparison with the section's previous best (Process L, "One job, on its calendar", 8.62)

- **L is stronger on:** proof. One real job, on its true dates, with photos.
- **M is stronger on:** relevance. The visitor sees their own job's order and published timing, including the one sequencing fact that matters on combined jobs (windows first).

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | A calm filtered grid with clear numbering, tags and sources, and a sticky summary rail (`-1440-both`); the re-flow reads as one motion (`-1440-flow`). **Minus:** cards and text only; no imagery |
| Usability (30) | **8.7** | Answers "what happens at my house, in what order, for how long" in one tap; full keyboard model; polite live line; rapid switching is robust; steps lead on phones; 0 errors in 118 views |
| Creativity (20) | **8.3** | No Process version changes the sequence to match the job. **Minus:** the filtering mechanic itself is familiar |
| Content (10) | **8.9** | Every sentence verbatim from the firm's own process and FAQs (checked); locks exact; nothing invented, and gaps stated |
| **Weighted** | **8.56** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.7 + 0.2 × 8.3 + 0.1 × 8.9 = 3.40 + 2.61 + 1.66 + 0.89 = **8.56**.

**Vetoes: none.**
- Locks verbatim; no form.
- A selection of published sequences, not a configurator; nothing game-like.
- White ground; brand accents only; normal fonts.
- No invented imagery or durations.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Try M until Muse accepts.
