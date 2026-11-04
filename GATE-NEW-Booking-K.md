# GATE-NEW — Booking K, "Next stop: your house"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 9, the last of the pass. GATE-BACKGROUND-FIX was accepted by Muse; new-version work resumed with this version. The drivable map stays in Area C only, and nothing game-like is used: the line is driven by reading, not played.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Booking K, "Next stop: your house"** (`?book=k`) |
| Primary reference (annex v3, one) | **Lusion**: flow, the carrying thread that makes the sections one journey. No Booking version has used it: C used Scout, D Dropbox, E and J Cash App, F Cowboy, G Graza, H Quiet Cubes, I Apple AirPods Pro; A and B name none. Of the 13, Bruno Simon and Rimowa are scoped to other sections, Lando Norris to the archive, MERSI to the hero split (a banned scaffold repeat), and Ever is barred from the centrepiece. |
| Signature creative move | **The carrying thread lands.** One continuous route line comes down into the section from above, as if it had carried the visitor through the page. It turns and runs through the stops between this page and a free inspection: today, at your house, after the visit, then your stop. A lime bead rides the line with the reader's scroll and lights each stop as it arrives. The line ends at the one filled Book button. |
| Style family | A transit line diagram on white: one thick deep-green line, ringed stops, stop names in Poppins, no boxes |
| Content | Locked facts and already-published lines only. The phone, with the live "Open now / Closed now" status (the shared `Cta.status`) and the hours. "A person at the office answers" (published, Booking I). "One visit, every trade" and "Itemised proposal" (published, Booking J). Since 2009, merged with Sanders Roofing & Exteriors 2018. 30-year James Hardie non-prorated warranty. The address, email and 4.9 from 474 Google reviews. The Book button goes to the firm's scheduling page. No form: nothing is sent or saved. |
| How it differs from every existing Booking version | A is a work-order pad, B a press board, C a pinned film roll of the record, D one giant number, E a weekly timetable, F an office letterboard, G three doors, H a postcard, I a day/night stage, J a receipt. None is a route: none shows the way from this page to the inspection as one line the visitor travels, and none carries a thread into the section from the page above. |
| Why it is better | It answers the question every other version leaves implicit: "what happens after I call?" There are three stops, each a true line, and the reader's own scroll moves them along it. The current best (I, "Day and night", 8.42; *corrected after writing: the plan first named D at 8.40*) changes the whole stage with the time of day, but still only asks for the call. K shows the whole short journey, so the call feels like the first stop rather than a leap. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the line); ⟦S1424⟧ law of continuity (one line joins every stop, a clean edge the eye rides); Lusion flow |
| Stops list | ⟦S1325⟧ scroll-progress-timeline: a real `<ol>` with real `<h3>`s; the line enhances the structure and never replaces it. Progress is measured from the first and last stop centres; stops light as the head passes, inactive stops stay fully readable, and nothing is announced per update |
| Route line and bead | ⟦S1325⟧ one RAF write per frame, geometry re-measured on resize and font load; ⟦S1315⟧ the RAF runs only while the bead is still easing; ⟦S1436⟧ the bead eases in (decelerating), 0.18 per frame, dt-normalised |
| Stop states | ⟦S1427⟧ one treatment for every stop (a ringed dot that fills lime when reached); ⟦S1457⟧ Zeigarnik: the pale track ahead names the remaining distance |
| Phone link (stop 1) | ⟦S1441⟧ Fitts: a large `tel:` target; ⟦S1438⟧ Doherty: the open-now status refreshes every minute (`aria-live="polite"`) |
| Book button (terminus) | ⟦S1435⟧ the only filled button in the section; ⟦S1494⟧ verb-first label "Book a free inspection"; ⟦S0405⟧ press dip to 0.97 |
| Email and address | ⟦S1427⟧ plain text links in one treatment |
| Arrival | ⟦S1436⟧ stops enter decelerating, 90 ms apart in reading order; ⟦S1329⟧ the heading's words rise through the site's existing `data-split` |
| Phone and tablet (≤ 900 px) | ⟦S1325⟧ collapses to a single left rail; the same line, vertical, with the bead tracking a 60% viewport anchor |
| Reduced motion | ⟦S0400⟧ the line is drawn in full, every stop is lit, the bead rests at the terminus, and there is no RAF |
| Background law | White ground; the hidden world shows only around the cursor, outside the content |

---

## Build log

**How to view:** `?book=k` (switcher: Booking, **K "Next stop: your house"**).

**Files:**
- `src/sec/cta6.js` and `cta6.css`: `Cta6.K` is prerendered at build; `Cta6.wire` wires it.
- The build registers the module, the `ck` prerender key, the `k` slot entry, the label and the wire call.
- No new data and no images. The file grows by 14 KB (20,165,557 bytes).

**The route:**
- **The line is measured from the page.**
  - It is drawn from the measured centres of the four stop dots, not from fixed coordinates, so it fits any width.
  - It is re-measured on resize (ResizeObserver) and when fonts load.
- **Wide screens (above 1100 px):**
  - The line comes down from the top of the route area ("You are here").
  - It makes one 40 px round turn and runs right through the four stops.
- **1100 px and below:** one left rail, entering from the top.
- **The drawn line:**
  - It runs over a pale track (#E1E9E3), so the distance ahead is always visible.
  - Its length is set with a dash offset.
  - A lime bead (r 9, deep-green ring) sits at the head.
- **Progress:**
  - **Run:** starts with the section top at 80% of the viewport and arrives with it at 15%.
  - **Rail:** follows a 60% viewport anchor along the line (⟦S1325⟧).
  - The bead eases toward the target at 0.18 per frame, dt-normalised. The RAF runs only while it is moving.
- **Stops:**
  - A stop lights when the head reaches its dot: the dot fills lime and the kicker turns green.
  - The terminus fills with a deep-green core.
  - Inactive stops stay at full reading contrast.

**Copy (as built):**

| Stop | Content |
|---|---|
| Heading | "Next stop: your house." / "The whole way from this page to a free inspection, in three stops." |
| Today | "Call, or book online.", then the large `tel:` link, "A person at the office answers.", the live status (e.g. "Open now, until 8 pm Austin time"; refreshed every minute) and the hours |
| At your house | "The free inspection." / "One visit, every trade." / "Since 2009; merged with Sanders Roofing & Exteriors in 2018." |
| After the visit | "An itemised proposal." / "Nothing to pay to find out." / "For James Hardie siding: the 30-year James Hardie non-prorated warranty." |
| Your stop | "Book it.", then the only filled button, "Book a free inspection", and "or email info@austinprosiding.com" |
| Foot | The address, and "Rated 4.9 from 474 Google reviews" |

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- Section top at each width: `new-booking-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`.
- Bead part-way: `-1440-mid`, `-768-mid`, `-390-mid`.
- Whole route lit: `-1440-end`, `-768-end`, `-390-end`.
- Reduced motion: `-1440-rm`.
- Contact sheet: `new-booking-k.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Line follows the reading | **1440:** stops lit `0000` → `1000` → `1110` → `1111` as the section top goes 80% → 45% → 10% → −40% of the viewport; all four are lit at 15%. **768:** `0000` → `0000` → `1000` → `1111`. **390:** `0000` → `0000` → `1000` → `1110`, and `1111` at the page bottom (the terminus reaches the 60% anchor before the page ends at every width) |
| Reduced motion | Every stop lit (`1111`), line fully drawn (offset 0), stops at full opacity, no RAF |
| Keys | In the section, Tab goes (512) 550-0000 → Book a free inspection → info@austinprosiding.com, in reading order; every link has a visible focus ring |
| Locks | All verbatim in the built template: (512) 550-0000 · the hours · the address · info@austinprosiding.com · 4.9 from 474 Google reviews · since 2009 · Sanders Roofing & Exteriors 2018 · 30-year James Hardie non-prorated warranty. No form, no input, no "sent" or "saved" wording |
| Existing versions | 173 slot templates and 8 page templates byte-identical to the previous commit. The homepage `<main>` is identical apart from the one added `book:k` template. Defaults unchanged (`book = a`) |
| Locked mechanics | No dive, map, configurator or game. The line is reading progress, not a control |
| Class names | Every new class checked against global rules; the one shared name (`.in`) was renamed `tkin` before shipping |

## Defects found and fixed

1. **Class name:** the arrival state first used `.in`, a name with global rules elsewhere (`proc2.css`). Renamed `tkin`.
2. **Arrival end point:** on wide screens, the bead first finished only when the section had scrolled past the top (it stopped at about 85% with the section fully in view). The run now completes with the section top at 15% of the viewport; all four stops are lit there.
3. **Copy, three overclaims removed:**
   - "One visit, every trade: siding, windows and roofing" could read as the full trade list. It is now "One visit, every trade." (the published line).
   - "In Austin since 2009" is now "Since 2009" (the lock).
   - "James Hardie siding comes with…" is now "For James Hardie siding: the 30-year…", so the warranty is not implied for other siding.
4. **Plan line:** it named D (8.40) as the section's best; I (8.42) is. Corrected in place and marked.

## Remaining defects, named honestly

- **The heading wraps** before "house." at 1440, because of the site's shared heading measure (568 px). It is kept for consistency with every other section.
- **The empty stub:** the "You are here" stub is 120 px of white above the run on wide screens. It carries the line in, but at rest it reads as a gap.
- **The bead's catch-up:** under SwiftShader (headless, a low frame rate) the bead can take more than 1.4 s to reach its target after a big jump in scroll. At 60 Hz the ease covers 95% of a jump in about 0.25 s and settles in about 0.6 s (computed from 0.18 per frame). Not checked on a real device.
- **"Itemised proposal" has no timing.** No published number says how soon it arrives, so none is given.
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | booking K | ⟦S1434⟧ the line dominates; ⟦S1424⟧ law of continuity, one line joining every stop; Lusion's carrying thread entering from above |
| Element | stops `<ol>` | ⟦S1325⟧ a real ordered list with `<h3>` stop names. The line is `aria-hidden` decoration; stops light as the head passes, inactive stops stay readable, and nothing is announced per update |
| Element | route line, track, bead | ⟦S1325⟧ geometry measured from the stop centres and re-measured on resize and font load; ⟦S1315⟧ the RAF runs only while the bead eases; ⟦S1436⟧ decelerating ease, 0.18 per frame |
| Element | stop dots | ⟦S1427⟧ one treatment: a white dot in a 5 px green ring, filled lime when reached; the terminus is larger, with a deep-green core |
| Element | pale track ahead | ⟦S1457⟧ Zeigarnik: the remaining distance is always visible |
| Element | phone link | ⟦S1441⟧ a large `tel:` target (24–31 px type with the icon) |
| Element | open-now status | ⟦S1438⟧ refreshed every minute, `aria-live="polite"` (the shared `Cta.status`, Austin time) |
| Element | Book a free inspection | ⟦S1435⟧ the only filled button in the section; ⟦S1494⟧ verb-first label; ⟦S0405⟧ press dip to 0.97 |
| Element | email link | ⟦S1427⟧ the same green text-link treatment as the rest of the site |
| Motion | arrival | ⟦S1436⟧ stops rise 16 px and fade in, 0.6 s, 90 ms apart, once; ⟦S1329⟧ heading words through the site's `data-split` |
| Site | rail at ≤ 1100 px | ⟦S1325⟧ the mobile-safe single left rail |
| Site | reduced motion | ⟦S0400⟧ the whole route drawn and lit at once, no movement |
| Site | background law | White ground; the hidden world shows only around the cursor |

## Reference transfers and non-transfers (Lusion)

**Transferred:**
- the carrying thread: one continuous line that arrives from the page above and leads the eye to the end;
- motion that follows the reader's scroll and eases, never a timed show;
- a single moving element (the bead) as the focus.

**Not transferred:**
- Lusion's WebGL scenes and 3D;
- its dark palette and its type;
- any pinned or full-screen takeover.

Here the thread is a flat, two-colour transit line on white, in the brand's own greens.

## Comparison with the section's previous best (Booking I, "Day and night", 8.42)

I changes the whole stage with the time of day (phone by day, online booking by night): it is the best answer to "can I reach you now?". K answers the next question, "what happens after I do?", and lets the reader travel the answer.
- **I is stronger on:** atmosphere and its live, time-driven state.
- **K is stronger on:** reassurance and clarity of the ask. Three stops, one button, nothing hidden.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | One confident line and four ringed stops on white: calm, ordered and unmistakably a route (`-1440-end`). The bead and the pale track ahead give the eye one thing to follow. **Minus:** the 120 px entry stub reads as a gap at rest; the heading wraps |
| Usability (30) | **8.6** | Every action is readable and usable without motion. The phone is the largest target, with live status and hours beside it. There is one filled button and a three-stop tab order. Reduced motion shows the whole route; the rail at ≤ 1100 px; 0 errors and 0 overflow at all widths. **Minus:** on phones the terminus lights only near the end of the scroll; not checked on a real device |
| Creativity (20) | **8.4** | No Booking version has drawn the way from the page to the inspection, or carried a thread into the section. **Minus:** the transit-diagram form itself is familiar |
| Content (10) | **8.6** | It answers "what happens after I call?" with locked facts and already-published lines only. Three overclaims were caught and removed. **Minus:** the proposal's timing cannot be stated |
| **Weighted** | **8.48** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.6 + 0.2 × 8.4 + 0.1 × 8.6 = 3.36 + 2.58 + 1.68 + 0.86 = **8.48**.

**Vetoes: none.**
- Locks are verbatim; no form; nothing claimed sent or saved.
- White ground; greens and lime only in content; no stars used.
- Only normal fonts (Poppins, Inter).
- No locked mechanic copied; no invented imagery.
- Defaults unchanged.
- No sub-agents or background tasks.

**Pass 1 is complete with this version:** Hero to Booking, K in every section.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start pass 2 (Hero L) until Muse accepts.
