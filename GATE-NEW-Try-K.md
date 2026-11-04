# GATE-NEW — Try the job K, "Flash the window"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 1, section 7 (Hero to Process K accepted by Muse). Game-like mechanics are allowed in this section only; the dive stays in Try D only.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Try the job K, "Flash the window"** (`?try=k`) |
| Primary reference (annex v3, one) | **Dropbox Brand** (subtraction: flat colour blocks, type as the interface, one action at a time). No Try version has used Dropbox: A and B used the Bruno Simon spirit; C Graza; D Lusion; E and I Lando Norris; F Scout; G Cowboy; H Quiet Cubes; J Cash App. |
| Signature creative move | **The rain test.** Four flashing pieces sit in a tray: sill flashing, the window, side flashing and head flashing. You put them on the opening in the order you think is right, and each piece lands on top of the ones already there, so a wrong order is visibly wrong. Then you run the rain. If every piece laps over the one below, the water sheds outside and the opening stays dry. If not, the rain finds the first wrong lap: an amber path runs behind it, a tag marks the spot, and one plain sentence explains why. |
| Style family | Flat, subtractive diagram game: bold blocks of colour, big labels, one lime accent, white ground |
| Content | General water-management practice, worded as such: each piece laps over the one below it, like shingles, so water always runs out and down (sill flashing, then the window, then the sides, then the head). At your house the crew follows the window maker's instructions. The firm's facts close it: windows measured, built to order, set and sealed; 388 documented window jobs; most window-only jobs take 2 days. No invented figures. |
| How it differs from every existing Try version | A–D: board, caulk, gutter and paint mini-jobs (D inside the dive). E: inspect with a beam. F: measure with a tape. G: shingle courses bottom-up. H: level a window. I: time nails on studs. J: label parts. None is an ordering puzzle about water, and none has a rain test that traces a leak to the exact lap that failed. G also teaches bottom-up laying, but for courses of one material; K is about four different pieces around an opening, and the failure is shown, not just refused. |
| Why it is better | It teaches the one thing that makes a replacement window last (water management), shows the consequence of getting it wrong, and lets you fail safely. The current best (E, "Inspect it at dusk", 8.18) teaches looking; K teaches why the order of work matters. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the opening); Dropbox subtraction (flat fills, no texture, labels as type); ⟦S0220⟧ general practice labelled as such, firm facts only |
| Tray pieces (4) | ⟦S0054⟧ real buttons in a labelled group ("Put on next: …"), with focus moving to the next remaining piece; ⟦S1427⟧ one treatment; ⟦S1440⟧ instant press; each placed piece leaves the tray and a numbered chip shows the order so far |
| Placing | ⟦S1436⟧ each piece drops onto the opening with a small settle (0.35 s); the z-order is the placement order, so a wrong lap shows |
| Rain test | Rain falls in three short passes (1.4 s); correct: drops slide off the head flashing and down outside the sides. Wrong: an amber leak path draws behind the first bad lap, with a tag; ⟦S0083⟧ one motion; ⟦S1315⟧ nothing runs at rest |
| Result line | `aria-live="polite"`: "Dry inside. Every piece laps over the one below it." or "Leak: the side flashing went on before the window…" |
| Controls | "Run the rain" (disabled until all four are placed), "Start again", "Show me" (places all four in order); ⟦S0405⟧ |
| Closing | Firm facts (388 documented window jobs; measured, built to order, set and sealed; 2 days) and one Book button (⟦S1435⟧) |
| Phone | The tray sits under the drawing as a 2 × 2 grid of 44 px+ buttons |
| Reduced motion | No drop or rain animation: the result shows at once, with the leak path drawn statically |
| Background law | White ground; the drawing is the only block of colour |

---

## Build log

**How to view:** `?try=k` (switcher: Try the job, **K "Flash the window"**).

**Files:** `src/sec/seq6.js` and `seq6.css` (`Seq6.K` is prerendered at build; `Seq6.wire`). Inline SVG and text only; the file grows by 15 KB (19.12 MB).

**The drawing (480 × 400):**
- A housewrapped wall in a flat grey with faint course lines, and a dark opening.
- Four pieces, each drawn as flat blocks:
  - sill flashing: a pan with turned-up ends;
  - the window: a white flanged frame, glass, a meeting rail;
  - side flashing: two strips overlapping the flange edges;
  - head flashing: a deep-green drip cap over the strips.
- Placing a piece appends it to the drawing, so the stacking order is exactly the order chosen, and a wrong lap is visible before any rain.

**The tray:** the four pieces shuffled (sides, sill, head, window), each a deep-green button with its name and one plain line. Used pieces turn pale and disable, and numbered chips under the drawing show the order so far.

**The rain:**
- 18 drops in three staggered waves, 1.3 s each.
- Drops over the head flashing fall onto it, slide off its nearer end, then continue down outside the opening.
- Result:
  - right order: the frame gets a lime ring and "Dry inside. Every piece laps over the one below it, so the water runs out and down.";
  - wrong order: an amber leak path draws behind the first bad lap, with a white-ringed spot, "water gets in" and the reason.

**The rule:** each piece must go on after the piece it laps over (sill → window → sides → head). The first broken adjacent pair is the leak shown.

**Closing:**
- "Windows are measured, built to order, then set and sealed." (homepage process wording)
- "Most window-only jobs take 2 days."
- **388** documented window jobs.
- "General practice, shown simply. At your house the crew follows the window maker's instructions."
- Book.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-try-k-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`
- the right order: `-1440-dry-rain` (mid-rain), `-1440-dry` (result)
- a wrong order, sides before the window: `-1440-leak-rain`, `-1440-leak`
- phone, wrong order: `-390-leak`
- contact sheet: `new-try-k.jpg`

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Right order | sill > window > sides > head is dry: lime ring, no leak path, stack `sill,win,side,head` |
| Each wrong lap | window before sill → sill leak; sides before window → flange leak; head before sides → head leak. Each draws one leak path and gives the matching sentence |
| Several errors | head > sides > window > sill reports the first broken lap from the bottom (window before sill) |
| Keyboard | Enter on a piece places it and moves focus to the next remaining piece; after the fourth, focus lands on "Run the rain" |
| Show me | Resets, places the four in order 380 ms apart (2 placed at 0.4 s), then runs the rain and ends dry with chips 1–4 in order |
| Phone | Sides before the window gives the flange leak; no overflow; smallest tap target 44 px |
| Reduced motion | No drop, rain or path animation; Show me resolves immediately to "Dry inside…" |
| Existing versions | 171 templates byte-identical to the previous commit; the homepage `<main>` identical; the only addition is `try:k`. Defaults unchanged (try = a); the dive is untouched in Try D |
| Locks | 388 and the window process wording from the homepage; no new figures |

## Defects found and fixed

1. **Class collisions:** `.pp`, `.dp`, `.pc` and `.gp` are global classes elsewhere. Renamed `.fpc`, `.drp`, `.trp` and `.gpr`.
2. **Lost focus:** placing a piece disabled its button while it had focus, which dropped keyboard focus to the page. Focus is now captured first and moved to the next remaining piece, or to "Run the rain".
3. **Small phone targets:** the action buttons were 38.5 px tall on phones. They now have a 44 px minimum.

## Remaining defects, named honestly

- **Simplified practice:** real flashing details vary by window type and maker (tapes, pans, the housewrap flap above the head). The game teaches only the lapping principle, and says so on the page.
- **Rain is decorative:** the drops are the same for right and wrong orders until they finish; the result comes from the order rule, not from simulated water.
- **Two leaks at once:** only the first broken lap is shown when several are wrong. The leak sentence says to start again and try another order.
- **Testing:** done in Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | try K | ⟦S1434⟧ the opening dominates; Dropbox subtraction (flat fills, labels as type, one lime accent plus the amber state); ⟦S0220⟧ general practice labelled, firm facts only |
| Element | 4 tray pieces | ⟦S0054⟧ buttons in a group labelled "Put on next:"; disabled once used; focus moves on; ⟦S1427⟧ one treatment; ⟦S1440⟧ 0.97 press |
| Element | placing | ⟦S1436⟧ 0.35 s drop with settle; the DOM order is the lap order (an honest drawing) |
| Element | order chips | Numbered with a CSS counter; the order is readable at a glance |
| Element | rain test | Three staggered waves; drops slide off the head; ⟦S0083⟧ one motion; ⟦S1315⟧ nothing at rest |
| Element | leak path | Amber path drawn with `pathLength="1"`, a ringed spot and a label; the state colour is used only for the failure |
| Element | result line | `aria-live="polite"`, one plain sentence per outcome |
| Element | Run / Start again / Show me | ⟦S0405⟧; Run is disabled until all four are on; 44 px minimum |
| Element | Book | ⟦S1435⟧ the only filled CTA (Run is lime but is a game control) |
| Site | reduced motion and background law | Instant result; white ground |

## Reference transfers and non-transfers (Dropbox Brand)

**Transferred:**
- subtraction: flat colour blocks and no texture;
- type as the interface: piece names in the buttons, one sentence of result;
- one action at a time.

**Not transferred:**
- Dropbox's palette, illustrations and typeface.

## Comparison with the section's previous best (Try E, "Inspect it at dusk", 8.18)

E teaches looking: you sweep a beam over a house and find what the inspection checks. K teaches why the order of work matters, and lets you fail safely and see exactly where water would get in.
- **E is stronger on:** atmosphere.
- **K is stronger on:** the craft lesson and on cause and effect.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.2** | A clean flat diagram, a clear tray and a readable result; the leak path is unmistakable. Minus: the drawing is simple, by design |
| Usability (30) | **8.4** | Three ways to play (tap, keyboard, Show me); focus management; 44 px targets; one sentence explains each outcome (all tested) |
| Creativity (20) | **8.6** | An ordering puzzle with a rain test that traces the leak to the exact lap, new to the site |
| Content (10) | **8.4** | A real trade principle, labelled as general; firm facts verbatim. Minus: simplified versus real flashing details |
| **Weighted** | **8.36** | **PASS** (≥ 7.0; no category below 6.0) |

**Vetoes: none.**

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not build Area K until Muse accepts.
