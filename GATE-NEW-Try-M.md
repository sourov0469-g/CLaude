# GATE-NEW — Try M, "Match the house"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 7 (Hero to Process M accepted by Muse). Game-like mechanics live in Try only, and this is one. It inherits the button system. Nothing about the visitor's house is asked, and nothing is configured.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Try M, "Match the house"** (`?try=m`) |
| Primary reference (annex v3, one) | **MERSI**: the infinite split-slider, two halves that move independently past a seam, with a central label that names what sits at the seam. The annex names MERSI's seam as the source for any before/after mechanism. No Try version has used MERSI: A and B used the Bruno Simon spirit, C Graza, D Lusion, E and I Lando Norris, F Scout, G Cowboy, H Quiet Cubes, J Cash App, K Dropbox, L Apple AirPods Pro. Ever's craft was just used in Process M; Rimowa is scoped to the configurator. |
| Signature creative move | **Two reels, one house.** Six of the firm's published before/after pairs are split into two reels that meet at a seam. The left reel holds the six *befores*, the right reel the six *afters*, each in a different shuffled order. Turn either reel (arrows, drag, swipe, keys) until the same house's before and after meet at the seam. Then the pair locks: the seam closes, a lime check lands, and the seam label rolls to that job's published record (place, trade, month, what was installed, its price band) with a link to the project. Match all six; a counter shows matches and turns. Telling a house before from after is the point: rooflines and windows stay, while siding, colour and trim change. |
| Style family | A two-reel split cover of real photographs: a slot-machine reel meets a before/after seam |
| Content | The six homepage pairs published on the firm's project pages (`pairs.json`): Village at Western Oaks (Siding, Aug 2026, $25k–$30k siding portion), Tanglewood Forest (Siding, Aug 2026, $25k–$30k), Anderson Mill (Windows, Sep 2026, $15k–$20k windows portion), Barton Creek (Patio covers, Apr 2024, $40k–$50k), North Shoal Creek (Roofing, Jan 2025, $30k–$40k), Circle C North (Siding, Jul 2026, $10k–$15k). Each with its published alt texts and what was installed. These photos come from the firm's 177 genuine pairs. No invented imagery, no new numbers. |
| How it differs from every existing Try version | A–D: board, caulk, gutter and paint mini-jobs (D inside the dive). E: inspect with a beam. F: measure with a tape. G: shingle courses from the eave up. H: level a window. I: nail on the studs. J: name the parts. K: lap the flashing and run the rain. L: guess a job's price band. None is played with the firm's before/after photographs, and none asks you to see what changed on a real house. |
| Why it is better | It makes the visitor look closely at six real transformations, which is the firm's strongest proof, and rewards each look with the job's record. The current best (Try L, "Price the job", 8.54) teaches price; M teaches what the work does to a house. |
| Pairing note (F17) | Hero K, Windows L and Reviews M also use MERSI's seam. Pick at most one or two of them for one page. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the two reels); ⟦S0220⟧ the firm's own photos and records only |
| Reels (2) | ⟦S0054⟧ each reel a focusable group with ↑ / ↓ buttons, ↑ ↓ keys and a vertical drag (sideways on phones); ⟦S1443⟧ the drag has button and key alternatives; ⟦S1436⟧ 0.55 s eased steps, wrap without a jump |
| Seam and label | MERSI's seam label names the job when a pair locks; otherwise "Turn the reels to match a house" |
| Lock | ⟦S1440⟧ the seam closes, a lime check lands, both photos lift slightly; the record panel fills; the found pair is marked on both reels |
| Score | "3 of 6 matched · 14 turns"; ⟦S1440⟧ polite announcements on lock and finish |
| Hint | "Show me one" aligns one unmatched pair (counted as a hint) |
| Finish | ⟦S1435⟧ "All six matched", the six jobs as links, and the one filled "Book a free inspection" |
| Phone | Reels stacked (before above, after below) with a horizontal seam; reels turn sideways; ⟦S1441⟧ 48 px controls |
| Reduced motion | ⟦S0400⟧ reels step instantly; the lock shows without movement |
| Background law | White ground; reels and panel are `data-solid` |

---

## Build log

**How to view:** `?try=m` (switcher: Try, **M "Match the house"**).

**Files:**
- `tryM()` in `build_site.py`: the markup; the twelve published photos (six befores, six afters) re-encoded once at 600 × 375, WebP quality 56; the six job records; the two reel orders.
- `src/sec/seq8.js` (`Seq8.wire`) and `src/sec/seq8.css` (class prefix `tm` under `.tmM`; the collision check found no shared names).
- The module added to `MODS`, wired, given the `try` slot letter `m`, and listed in the switcher. Nothing else changed.
- The file grows by **484,379 bytes**, almost all of it the twelve photos.

**The six pairs** (homepage pairs, `pairs.json`; published alts kept on every photo):

| Job | Trade · month | Installed | Published band |
|---|---|---|---|
| Village at Western Oaks, Austin | Siding · Aug 2026 | James Hardie 8.25" Smooth Siding | $25k–$30k siding portion |
| Tanglewood Forest, Austin | Siding · Aug 2026 | James Hardie 8.25" Select Cedar Mill | $25k–$30k siding portion |
| Anderson Mill, Austin | Windows · Sep 2026 | NT Windows Executive | $15k–$20k windows portion |
| Barton Creek, Austin | Patio covers · Apr 2024 | Renaissance Patio Moderno | $40k–$50k patio covers portion |
| North Shoal Creek, Austin | Roofing · Jan 2025 | Owens Corning TruDefinition Duration | $30k–$40k roofing portion |
| Circle C North, Austin | Siding · Jul 2026 | James Hardie 8.25" Primed Select Cedar Mill | $10k–$15k siding portion |

**The reels:**
- The befores run in the order 3, 0, 5, 1, 4, 2 and the afters in 1, 4, 0, 2, 5, 3, so no house starts matched (asserted at build).
- Each track holds the six photos three times over, so a reel turns forever without a jump. The clones are `aria-hidden`, with empty alts.
- **Steps:** 0.55 s `cubic-bezier(.22,1,.36,1)`. The centre photo is full strength; the neighbours peek above and below at 42%.
- **Input:** ↑ / ↓ buttons per reel (48 px); ↑ ↓ keys on a focused reel; a vertical drag that snaps by distance (sideways on phones).

**The lock:**
- When the same house meets at the seam, the seam turns lime, both photos take a lime ring, and "Matched" chips land on both.
- The seam label rolls to the place, and the record panel shows trade, month, what was installed, the published band and "See the project".
- Turning away dims the panel to "Last matched".

**Score and finish:**
- A counter shows "N of 6 matched · T turns". "Show me one" aligns the next unmatched pair (counted as a hint), and "Start again" resets.
- Once all six are matched: "All six matched in T turns. Every one is a real job of ours.", with links to the six projects.
- Polite announcements fire on each new match and on the finish.

**Footnote:** what the photos and bands are, then the shared Book and call buttons.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-try-m-1440-0`;
- `-1440-match`: the second match locked;
- `-1440-won`: all six;
- `-768-0`, `-768-1`, `-390-0`;
- `-390-match`: a lock on a phone;
- contact sheet `new-try-m.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids; all 36 reel images decoded; 12 visible photos carry their published alts; every control 48 px |
| Start | No match at the seam (before job 3, after job 1); label "Turn the reels to match a house" |
| Full play-through, by the buttons (1440 and 390) | Six locks in order (3, 0, 5, 1, 4, 2), each confirmed by geometry, i.e. the photos actually centred at the seam, not just by state; the counter reaches 6 of 6 in 20 turns; the finish panel lists all six projects; the live region says "All six matched in 20 turns." |
| Hint | From a reset, "Show me one" locks Barton Creek without counting a turn |
| Keyboard / drag | ↓ on the focused after reel turns it (1 turn); a 240 px upward drag on the befores reel steps it one place |
| Reset | Back to 0 of 6, 0 turns, original positions |
| Reduced motion | Steps instant; the hint locks within 40 ms |
| All homepage version views (119) | 0 page errors and 0 overflow in every one |
| Existing versions | The 190 existing slot templates are byte-identical; one template added (`try:m`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Try stays A); subpages untouched |
| Locks | "(512) 550-0000" verbatim (the shared call link) |

## Defects found and fixed

1. **A giant phone icon at 768.** The shared Book / call block is only styled inside the hero, so its icon rendered at full width under the CTA. Try M now scopes the same three rules Try L uses; the icon measures 18 px at every width. The other M versions don't use the shared block and are unaffected.
2. **A stale record.** After turning away from a match, the record panel still showed that job at full strength. It now dims and reads "Last matched".

## Remaining defects, named honestly

- **Weight:** +484 KB for twelve photos (600 × 375, WebP q56).
- **Alts give the answer away.** The published alt texts name each place, so a screen-reader user matches by name rather than by looking. That is fair access, but a different game.
- **The reel buttons overlap the photo edges** on desktop by a few pixels.
- **Six pairs only,** the homepage set; the firm has 177 genuine pairs.
- **Seams on one page.** Hero K, Windows L and Reviews M also use MERSI's seam; at most one or two should share a page.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Try M | ⟦S1434⟧ the two reels dominate; ⟦S0220⟧ the firm's own photos, alts and records only |
| Element | reels | ⟦S0054⟧ focusable groups with ↑ / ↓ buttons and keys; ⟦S1443⟧ drag with button and key alternatives; ⟦S1436⟧ 0.55 s eased steps, infinite via clones |
| Element | seam and label | MERSI's seam label: rolls to the place on a lock |
| Motion | lock | ⟦S1440⟧ lime seam and rings, "Matched" chips, record panel; last match dims |
| Element | score / hint / reset | ⟦S1440⟧ counter and polite announcements; ⟦S1441⟧ 48 px controls; button system: hover, press, spring, ring |
| Element | finish | ⟦S1435⟧ "All six matched", six project links, the one filled Book button |
| Site | phone | Reels stacked with a horizontal seam; reels turn sideways; arrows rotate |
| Site | reduced motion | ⟦S0400⟧ instant steps, no roll |
| Site | background law | White ground; reels and panel are `data-solid` |

## Reference transfers and non-transfers (MERSI)

**Transferred:**
- the split cover of two halves moving past a seam;
- the central label naming what sits at the seam;
- the infinite loop;
- the seam as the before/after mechanism.

**Not transferred:**
- MERSI's imagery, type and hero placement;
- the synced opposite motion of Reviews M (here the reels move independently, because that is the game).

## Comparison with the section's previous best (Try L, "Price the job", 8.54)

- **L is stronger on:** the money question, and teaching the median bands.
- **M is stronger on:** looking. The visitor studies six real transformations closely enough to match them, and each match pays out the job's record. The game is the firm's strongest proof.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.7** | Real photographs on two calm reels, a single seam and a lime lock (`-1440-match`); a clear finish (`-1440-won`); stacked reels on phones (`-390-match`). **Minus:** the reel buttons touch the photo edges |
| Usability (30) | **8.4** | Buttons, keys and drag; hint and reset; a counter; polite announcements; reduced motion; full play-through verified at two widths; 0 errors in 119 views. **Minus:** +484 KB; matching is easier by alt text than by sight for screen-reader users |
| Creativity (20) | **8.8** | No Try version is played with the firm's before/after photographs; two reels meeting at a seam is new to the site |
| Content (10) | **8.7** | Six published pairs with their alts, records and bands; nothing invented. **Minus:** six of 177 pairs |
| **Weighted** | **8.63** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.7 + 0.3 × 8.4 + 0.2 × 8.8 + 0.1 × 8.7 = 3.48 + 2.52 + 1.76 + 0.87 = **8.63**.

**Vetoes: none.**
- Locks verbatim; no form.
- Game-like, in Try only; not a configurator.
- White ground; brand accents only; normal fonts.
- Only the firm's own published photos.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Area M until Muse accepts.
