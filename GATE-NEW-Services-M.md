# GATE-NEW — Services M, "One frame, every trade"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 2 (Hero M accepted by Muse). It inherits the button system. Nothing game-like and no configurator: the visitor picks a trade to read about, nothing is built or priced for them.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Services M, "One frame, every trade"** (`?services=m`) |
| Primary reference (annex v3, one) | **Lusion**: flow, one thing continuously becoming the next instead of cutting between states. No Services version has used Lusion: C used Apple AirPods Pro and Cash App, D MERSI, E and F an Ever craft note, G Dropbox, H Graza, I Cowboy, J Lando Norris, K Scout, L Quiet Cubes; A and B name none. Bruno Simon and Rimowa are scoped elsewhere and Ever is barred, so Lusion is the only one left. Its drawn line belongs to Booking K and its dive to Try D; neither is used here. L takes Lusion's flow: continuity of form. |
| Signature creative move | **The frame becomes each trade.** One photo frame sits at the centre of the section. Pick a trade and the frame's outline flows, without a cut, into the shape of that trade's work: a stack of lap boards for siding, a window with its sill, a gable with eaves for shingle roofing, a mono-slope roof for metal roofing, a tall door on its threshold, a wide garage door under its header, a pergola for patio covers, a gutter with its downspout, and a paint swatch with a drip for painting. Inside the shape is one of the firm's own published job photos for that trade, cross-flowing as the shape moves. Beside it, the trade's documented count, median price band and any published timeline, with the photo's own record. On arrival the frame blooms out of a point into the first shape. |
| Style family | One morphing silhouette on white, a photograph inside it, a quiet list of trades and a plain fact panel |
| Content | The homepage service list's documented counts (Siding 431, Windows 388, Exterior Painting 320, Shingle Roofing 210, Gutters 121, Exterior Doors 109, Patio Covers 34, Metal Roofing 31, Garage Doors 9) with each trade's median band and priced count from the published "Compare all 10 trades" table; the two published timelines (siding "1 to 2 weeks including paint"; windows "Most window-only jobs: two days on site."), all as Services L uses them. The locks verbatim: "431 documented siding jobs", "388 documented window jobs", "$10k–$15k median band (415 priced)". One published project photo per trade from `photos.json`, each captioned with its own place, month and trades and linked to its project page. Decking has no documented count and no photo, and the note says so. |
| How it differs from every existing Services version | A slides trades sideways, B switches a word, C counts chapters, D is a split cover, E picks a part on an elevation drawing, F is a magazine spread, G a sortable table, H boards that pull open, I three rings, J an index with a photo peek, K film reels, L cubes on a house. None has one element that changes shape from trade to trade, and none shows the work itself in the outline of what it is. |
| Why it is better | Each trade is recognised at a glance by its shape before a word is read (the thing, a real job inside it, and its record beside it), and moving between trades feels like one continuous object, not a list of cards. The current best (L, "Built from our records", 8.54) shows scale; M shows what each trade is, and that each is real. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the frame); ⟦S0220⟧ published counts, bands and photos only |
| Trade list (9 radios) | ⟦S0054⟧ `radiogroup` of `radio`s with roving tabindex, arrows, Home and End; each names the trade and its count; button system: hover, press, spring, ring; ⟦S1444⟧ nine choices in one short list |
| The frame (morph) | ⟦S1436⟧ `clip-path: polygon()` with the same ten points in every shape, interpolated over 0.9 s `cubic-bezier(.65,0,.35,1)`; ⟦S1440⟧ the shape is the feedback for the pick |
| Photo inside | The trade's published job photo with its alt; cross-flows (fade plus a slight drift) as the shape changes |
| Fact panel | ⟦S1449⟧ the count large, then the band, the timeline and the photo's record with "See the project"; announced politely |
| Arrival | ⟦S1325⟧ once, on entering view: the frame blooms from a point into the siding shape |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection", phone link at hero size |
| Phone | The trade list becomes a sideways strip of chips above the frame; the frame full width; the panel below; ⟦S1441⟧ |
| Reduced motion | ⟦S0400⟧ shapes swap at once; no bloom |
| Background law | White ground; the frame is `data-solid` |

---

## Build log

**How to view:** `?services=m` (switcher: Services, **M "One frame, every trade"**).

**Files:**
- `svcM()` in `build_site.py`: the markup, nine published job photos re-encoded once at 640 × 480, WebP quality 56.
- `src/sec/svc7.js` (`Svc7.wire`, with the nine shapes) and `svc7.css` (class prefix `sm`; the collision check found no shared names).
- The file grows by 385,647 bytes.

**The trades, largest first, each with its shape and photo** (the build checks that each photo's trades include its trade):

| Trade | Count line | Band | Shape | Photo |
|---|---|---|---|---|
| Siding | 431 documented siding jobs | $10k–$15k median band (415 priced) | lapped boards | Anderson Mill West, Cedar Park, Aug 2026 |
| Windows | 388 documented window jobs | $10k–$15k median band (376 priced) | the unit on its sill | Barrington Oaks, Austin, Jul 2026 |
| Exterior painting | 320 documented projects | $2k–$5k median band (317 priced) | a swatch with a drip | Maple Run, Austin, Feb 2026 |
| Shingle roofing | 210 documented projects | $10k–$15k median band (204 priced) | a gable with eaves | Fairview, Round Rock, Jun 2025 |
| Gutters | 121 documented projects | $2k–$5k median band (109 priced) | the run and its downspout | Maple Run, Austin, Jul 2026 |
| Exterior doors | 109 documented projects | $2k–$5k median band (96 priced) | tall, on the threshold | Milwood, Austin, May 2025 |
| Patio covers | 34 documented projects | $15k–$20k median band (33 priced) | a sloped cover on posts | Round Rock, Sep 2025 |
| Metal roofing | 31 documented projects | $20k–$25k median band (29 priced) | a mono-slope roof | North Austin, Austin, Jun 2026 |
| Garage doors | 9 documented projects | $2k–$5k median band (6 priced) | wide, under a header | East Austin, Austin, Feb 2026 |

The siding and windows panels carry the published timelines.

**The flow:**
- Every shape is a `clip-path: polygon()` with the same ten points, clockwise from the top left, so the browser interpolates point by point: 0.9 s, `cubic-bezier(.65,0,.35,1)`.
- The photos cross-flow underneath: a 0.7 s fade, and the incoming photo settles from 106% scale with a 2% drift over 1.1 s.
- The panel settles in (0.55 s, after 0.15 s).
- **On arrival** (once, when the figure is 35% in view), the frame blooms from a single point into the siding shape.

**Controls:**
- Nine `radio`s in a `radiogroup` (name and count). Arrow keys wrap, Home and End jump, and focus follows the pick. The button system adds hover, press, spring and the ring.
- On phones the list becomes a sideways strip of chips.

**Footer:** counts are documented projects from the service list, and one project can include several trades. Bands are median bands, materials and labor, before discounts. Decking has no documented count and no published photo, so it is not shown. The shared "Book a free inspection" and phone link.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-services-m-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- `-1440-bloom` (450 ms into the bloom), `-1440-windows`, `-1440-shingle`, `-1440-doors`, `-1440-garage`, `-1440-morph` (mid-flow, a gable becoming a door);
- `-390-doors`;
- contact sheet: `new-services-m.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| All nine trades | Each pick sets its own polygon, photo and panel; the panels read as in the table above |
| Morph, frame by frame | Siding → shingle: the first point moves 4% → 4.99% (175 ms) → 10.2% (342 ms) → 25.7% (509 ms) → 36.7% (675 ms) → 40% (1,009 ms) |
| Bloom | From the 50% / 50% point at 250 ms, to 44% / 45% at 500 ms, to 16% / 24% at 750 ms, settled on the siding shape by 1.25 s |
| Keyboard | From Windows, ↓ ↓ reaches Shingle roofing (checked, focused, one tab stop); End → Garage doors; ↓ wraps to Siding |
| Links and alts | 9 project links, all `/recent-projects/`; 0 photos without alt text |
| Reduced motion | No bloom (siding shape at once); a pick swaps the shape immediately |
| Phone tap (390) | Exterior doors chosen; frame 357 px; 0 overflow |
| CTA phone icon | 18 × 18 |
| All 234 version views | 0 page errors; the button system on in every view; subpages untouched |
| Existing versions | 184 slot templates and 8 page templates unchanged; the page body identical apart from the one added `services:m` template; the only changed blocks are the stylesheet and main script; defaults unchanged (`services = a`) |
| Locks | "431 documented siding jobs", "388 documented window jobs", "$10k–$15k median band (415 priced)", "(512) 550-0000" verbatim |

## Defects found and fixed

1. **The frame never appeared:** the arrival observer watched the clipped layer, which, clipped to a single point, never counts as visible, so the bloom never started. It now watches the unclipped figure. The bloom was measured afterwards.

## Remaining defects, named honestly

- **The painting and gutters photos are siding jobs that also included painting or gutters:** each panel names the photo's full trades, but the photo's main subject is siding.
- **Shapes are stylised:** ten points per shape keep the morph smooth, so the gable, door and gutter are simple outlines, not drawings.
- **Weight:** +385,647 bytes (nine photos at 640 px).
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | services M | ⟦S1434⟧ the frame dominates; ⟦S0220⟧ published counts, bands and photos only |
| Element | 9 trade radios | ⟦S0054⟧ radiogroup, roving tabindex, arrows wrap, Home / End; ⟦S1444⟧ one short list; button system: hover, press, spring, ring |
| Motion | the frame | ⟦S1436⟧ ten-point polygons interpolated over 0.9 s, ease in-out; ⟦S1440⟧ the shape answers the pick |
| Element | photo inside | Published photo and alt; cross-flow fade with a settling drift |
| Element | fact panel | ⟦S1449⟧ count, band, timeline, photo record, project link; polite announcement |
| Motion | arrival | ⟦S1325⟧ once: blooms from a point |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button, phone link at hero size |
| Site | phone | Chip strip, full-width frame, panel below; ⟦S1441⟧ |
| Site | reduced motion | ⟦S0400⟧ no bloom; shapes swap at once |
| Site | background law | White ground; the frame is `data-solid` |

## Reference transfers and non-transfers (Lusion)

**Transferred:**
- flow as continuity: one object that never cuts, only becomes the next thing;
- the photograph moving with the form, not swapped behind it;
- an arrival that grows out of a point.

**Not transferred:**
- Lusion's WebGL scenes and its dive (locked to Try D);
- the drawn line (Booking K);
- Lusion's own type and palette.

## Comparison with the section's previous best (Services L, "Built from our records", 8.54)

L shows the whole business at once, at scale, as cubes on a house.
- **M shows what each trade is:** its shape, a real job inside it, and its record, one trade at a time, with continuous motion between them.
- **L is stronger on:** relative scale across all trades at a glance.
- **M is stronger on:** recognition, real photographs, and a memorable, crafted transition.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.7** | A single strong silhouette with a real photo inside, a calm list and a clear fact panel (`-1440-shingle`, `-1440-doors`); the mid-morph frame (`-1440-morph`) |
| Usability (30) | **8.5** | Nine radios with the full keyboard model; panel announced; phone chips; reduced motion; 0 errors and 0 overflow. **Minus:** on phones the chip strip hides most trades until scrolled |
| Creativity (20) | **8.7** | No Services version morphs one element through the trades, or shows each trade as the outline of its work |
| Content (10) | **8.6** | Published counts, bands, timelines and photos; locks verbatim; decking's absence explained. **Minus:** two photos are mainly siding |
| **Weighted** | **8.63** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.7 + 0.3 × 8.5 + 0.2 × 8.7 + 0.1 × 8.6 = 3.48 + 2.55 + 1.74 + 0.86 = **8.63**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; no game.
- White ground; brand accents only; normal fonts.
- The firm's own published photos with their records.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Visualiser M until Muse accepts.
