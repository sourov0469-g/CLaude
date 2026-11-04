# GATE-NEW — Hero L, "In their own colours"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 2, section 1. Pass 1 (Hero K to Booking K) is complete; Booking K was accepted by Muse. No configurator is used (configurators stay in the Visualiser): nothing here can be chosen or changed. The colours are evidence from finished jobs, not options.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Hero L, "In their own colours"** (`?hero=l`) |
| Primary reference (annex v3, one) | **Cash App Brand Guidelines**: colour as content, bold uniform blocks where the colour itself carries the information. No Hero version has used it. 7 and 10 used Apple AirPods Pro, 7 also Lando Norris, 8 Scout, 9 Dropbox and Graza, K MERSI. 1–6 predate the annex. |
| Signature creative move | **Eight jobs, shown as their colours.** Across the hero runs a full-bleed band of eight bold colour fields. Each field is the actual colour of the work on one of eight documented jobs: the project finder's eight photo cards, shown newest first: the siding on a siding job, the shingles on the roofing job, the frames on a window job. Each was sampled from the sunlit part of that work in the job's own photo. Each field carries its colour code and the job's record. Open one and the field widens into the job's photo, with its colour kept as the label plate. |
| Style family | Bold colour blocks on white, colour codes as typography; a brand-guidelines page used as a hero |
| Content | The shared hero lead, support line and CTAs (`LEAD` / `SUB` / `CTAS`, unchanged). The eight finder records (place, month, trades, link to the published project page) as printed in Area A, Services K and elsewhere. The sampling rule is stated on the page: "sampled from the sunlit part of the work in each photo; photo colours, not paint or product names". No colour is named after a manufacturer's range, and no count or claim is added. |
| How it differs from every existing Hero version | 1 lifts boards over a photo. 2 bends a photo by depth. 3 pins a dusk portrait. 4 sets the title between sky and house. 5 hangs a photo as lap courses. 6 is a card deck. 7 is a dot field of records. 8 is a full-bleed cinematic photo. 9 makes type the house. 10 rolls the trade word. K splits before and after on a seam. None leads with colour, none presents several real jobs at once as one composition, and none makes the work itself (its colour) the first thing seen. |
| Why it is better | It shows range and recency at a glance: eight real houses, Jun 2025 to Sep 2026, across Austin, Round Rock, Cedar Park, Pflugerville, Leander, Georgetown and Buda, in eight colours. Every block is checkable, one tap from its photo and its project page. The current best (K, "Before \| After, on the seam", 8.46) shows one job at a time. L shows eight at once and lets the visitor pick. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the colour band) under a short copy block; ⟦S0650⟧ fits the first viewport at 1440 × 900; ⟦S0220⟧ records only, the sampling rule stated, tabular figures in the codes |
| Colour fields (8 buttons) | ⟦S0054⟧ each field is a `<button aria-expanded>` controlling its photo panel. Roving tabindex: ←/→ (↑/↓ on phones) move, Home/End jump, Enter/Space open, Escape closes and returns focus. Each label names the job and colour in words ("Siding, Maple Run, Austin, Feb 2026, colour #80868F") |
| Text on colour | ⟦S0248⟧ every label's ink measured against its own field, at least 4.5 : 1 (dark ink on every sampled colour) |
| Hover preview (fine pointer) | ⟦S0405⟧ a field widens slightly under the pointer (flex 1 → 1.4, 0.4 s); ⟦S1436⟧ decelerating |
| Open state | ⟦S1436⟧ the field grows (flex → 5) and the photo fades in over 0.45 s while the colour drops to a plate at the foot; ⟦S1427⟧ one treatment for every field; the "See this job" link opens the published project page |
| Colour codes | ⟦S1352⟧ number details: codes in tabular Inter at the foot of each field |
| Arrival | ⟦S1436⟧ the eight fields rise into place left to right, 70 ms apart, once; ⟦S0083⟧ one clear focal point at a time |
| CTAs | ⟦S1435⟧ the one filled Book button (shared `CTAS`) plus the phone |
| Phone (≤ 760 px) | The band turns into eight full-width rows; an opened row grows to show the photo; ⟦S1441⟧ rows ≥ 56 px tall |
| Reduced motion | ⟦S0400⟧ no arrival and no width animation; open and close are instant |
| Background law | White ground; the band is `data-solid`, so the hidden world never shows through the colours |

---

## Build log

**How to view:** `?hero=l` (switcher: Hero, **L "In their own colours"**).

**Files:**
- `heroL()` and the constants `HL_COLOURS` / `HL_WHAT` in `build_site.py`.
- `src/hero5.js` (`Hero5.wire`) and `src/hero5.css`.
- `tools/hl_sample.py` reproduces the eight colours from the embedded photos (`#80868F #9A9998 #CEBDA4 #A3AEAC #9D9484 #C4CDCE #908971 #DDD9DC`, in `__JOBS` order). It was re-run to confirm.
- The photos are taken from `window.__JOBS` when a field opens, so no photo is embedded twice. The file grows by 15 KB (20,180,598 bytes).

**The sampling rule (stated on the page):**
- For each job, take a hand-placed region on the work itself: the siding on siding jobs, the shingles on the roofing job, the frame jambs, head and meeting rail on the window jobs.
- Keep only the sunlit part (luminance ≥ the region's 60th percentile); for frames, also only neutral pixels (saturation < 0.12).
- Take the median.
- Window #3 was first sampled from 13 pixels; it was widened to 136 neutral, sunlit frame pixels.

**Composition:**

| | Wide screens (above 1000 px) | 1000 px and below |
|---|---|---|
| Copy | Eyebrow, then the shared lead (h1) at left; support line and CTAs at right | One column |
| Band | Eight equal full-bleed fields, about 430 px tall at 1440 × 900. The whole hero fits the first screen (the note ends at y = 882) | Eight full-width rows, 64 px each |
| Labels | Colour code, then place, then "month · the siding / shingles / window frames" | The same, in one row |
| Opening a field | Widens it to flex 5 (600 px at 1440). The photo fades in above the colour plate, and a white chip at the photo's top-right gives the trades and "See this job on our site" | The row grows to 300–420 px |

**Order:** the fields run newest first: Sep 2026 (Leander, Georgetown), Aug 2026, Jul 2026 (two), May 2026, Feb 2026, Jun 2025.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-hero-l-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0` (gate runner);
- at rest: `-1440-rest`, `-768-rest`, `-390-rest`;
- one job open: `-1440-open`, `-768-open`, `-390-open`;
- contact sheet: `new-hero-l.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Open a job (click) | `aria-expanded="true"`; the photo is loaded from `__JOBS` (640 px); the job link is shown. Field size open: 600 × 430 at 1440, 768 × 399 at 768, 390 × 300 at 390 |
| Keys | From field 1: → → reaches field 3, and Enter opens it. Its label now reads "…Colour of the siding, #CEBDA4. Hide the photo." → moves focus to field 4, and the open job follows. End goes to field 8; Escape closes and keeps focus |
| Contrast (ink #0A1611 on each field) | 6.17 · 11.42 · 10.07 · 8.11 · 5.29 · 13.24 · 5.04 · 6.50 : 1. The lowest is 5.04 (Ashford Park), above 4.5 |
| Reduced motion | The fields are in place at once (opacity 1); transitions are effectively off (1e-5 s) |
| Locks and copy | The shared lead, support line and CTAs unchanged and verbatim. Records exactly as in the finder cards. No colour named after a product |
| Existing versions | 174 slot templates and 8 page templates byte-identical to the previous commit. `<main>` identical apart from the one added `hero:l` template. Defaults unchanged (`hero = 1`) |
| Locked mechanics | No configurator: nothing can be picked, changed or applied to a house. The map, the dive and the games are untouched |

## Defects found and fixed

1. **Plan wording:** the eight cards are not the firm's eight latest jobs (one is from Jun 2025). Changed before building to "the project finder's eight photo cards, shown newest first".
2. **Colour sampling:** a plain median picked up glass reflections on both window jobs, and tree shade on the painted job. Re-sampled with the sunlit-only, neutral-frame rule. Window #3's sample was widened from 13 to 136 pixels.
3. **Screen-reader text showing:** the `.vh` helper is not loaded on the homepage, so each field's spoken label was printed on the colour. It is now defined in `hero5.css`.
4. **768 px:** with a field open, the seven closed columns were about 64 px wide, so colour codes were clipped and the open label hit the job link. Rows now start at 1000 px, and the job link moved into a white chip at the photo's top-right, clear of the label at every width.
5. **Phone label:** in an opened row the label floated over the middle of the photo. It is now pinned to the bottom plate (`align-content:flex-end`).
6. **Label truncation:** "Sep 2026 · the painte…" was cut off. The month line now wraps.

## Remaining defects, named honestly

- **Photo colours, not true colours.** Shade, camera and time of day shift them. Both window-frame samples sit in the eave's shade and read greyer than the frames probably are. The note on the page says so, but a visitor may still take a code as a paint match.
- **Two clicks to the work.** At rest the hero shows colours, not houses; the photos appear only when a field is opened.
- **Long on phones:** at 390 the eight rows run past the first screen (the hero ends at about 1,290 px).
- **Testing:** Chromium only, and not on a real device.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | hero L | ⟦S1434⟧ the colour band dominates under a short copy block; ⟦S0650⟧ fits the first screen at 1440 × 900; ⟦S0220⟧ finder records only, the sampling rule printed, tabular figures |
| Element | 8 colour fields | ⟦S0054⟧ `<button aria-expanded aria-controls>`; one roving tab stop; ←/→ (↑/↓ in rows), Home/End, Enter/Space, Escape; each spoken label names the place, month, trades, what was sampled and the code |
| Element | ink on colour | ⟦S0248⟧ measured per field, minimum 5.04 : 1 |
| Element | hover preview | ⟦S0405⟧ flex 1 → 1.4 under a fine pointer when nothing is open; ⟦S1436⟧ 0.55 s decelerating |
| Element | open field | ⟦S1436⟧ flex → 5 and the photo fades in over 0.45 s; ⟦S1427⟧ one treatment for all eight; a white chip with the trades and "See this job on our site" (the published project page) |
| Element | colour codes | ⟦S1352⟧ tabular Inter codes at the foot of each field |
| Motion | arrival | ⟦S1436⟧ the fields rise 28 px and fade in, 70 ms apart, once; ⟦S0083⟧ one focal point at a time |
| Element | CTAs | ⟦S1435⟧ the shared `CTAS`: one filled Book button plus the phone |
| Site | ≤ 1000 px | Eight full-width rows; ⟦S1441⟧ 64 px rows; an opened row grows to show the photo (*built at 1000 px rather than the planned 760 px, see defect 4*) |
| Site | reduced motion | ⟦S0400⟧ no arrival and no width animation |
| Site | background law | White ground around the band; the band is `data-solid` |

## Reference transfers and non-transfers (Cash App Brand Guidelines)

**Transferred:**
- colour as the content, with the code printed as typography;
- bold, uniform, full-bleed blocks in one confident row;
- a guidelines-page calm: no ornament, no gradients, no shadows on the blocks.

**Not transferred:**
- Cash App's own green, its type and its imagery;
- any invented colours (every colour here is measured from the firm's own job photos).

## Comparison with the section's previous best (Hero K, "Before | After, on the seam", 8.46)

K shows one documented job at a time, before and after, with the record on the seam: depth on one house.
- **L instead shows breadth:** eight real jobs at once, Jun 2025 to Sep 2026, from Austin to Buda, in the colours they actually are. Each is one tap from its photo and its project page.
- **K is stronger on:** transformation, and on showing a house at rest.
- **L is stronger on:** range, recency and a first impression no other trade site makes.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | One bold, calm row of eight real colours under a short copy block; the whole hero fits the first screen at 1440 (`-1440-rest`). The open state is clean, with the colour kept as the plate (`-1440-open`). **Minus:** at rest it shows colours, not houses |
| Usability (30) | **8.4** | Full keyboard model; spoken labels in words; ink ≥ 5.04 : 1 on every field; rows on tablets and phones; the job link one tap away; reduced motion; 0 errors and 0 overflow. **Minus:** photos need a tap; eight rows run long on phones |
| Creativity (20) | **8.6** | No Hero version shows the work as the measured colours of real jobs. The colour code as headline-level typography is new to the site |
| Content (10) | **8.4** | Real finder records with links to the published project pages, the rule stated, no product names, no new claims. **Minus:** photo colours can mislead, and two window frames sit in shade |
| **Weighted** | **8.52** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.4 + 0.2 × 8.6 + 0.1 × 8.4 = 3.44 + 2.52 + 1.72 + 0.84 = **8.52**.

**Vetoes: none.**
- Locks are verbatim; no form.
- White ground, with greens and lime only in content. The eight field colours are measured photo content, not brand colour.
- Only normal fonts (Poppins, Inter).
- No configurator or other locked mechanic.
- No invented imagery: every photo is the firm's own documented job, captioned with its record.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Services L until Muse accepts.
