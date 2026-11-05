# GATE-NEW — Booking M, "Walk round the house"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 9, the last of the pass (Hero to Area M accepted by Muse). It inherits the button system. No form: nothing here is sent or saved. Nothing game-like (no score, goal or timer), and nothing is configured: the visitor turns a drawing to see what the free inspection looks at.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Booking M, "Walk round the house"** (`?book=m`) |
| Primary reference (annex v3, one) | **Ever**, verified craft only: the case page's 3D visualisations (an object you turn to understand it). Not its pairs, which the annex bars. No Booking version has used Ever: C used Scout, D and L Dropbox, E and J Cash App, F Cowboy, G Graza, H Quiet Cubes, I Apple AirPods Pro, K Lusion. MERSI's seam is already on four sections; Bruno Simon, Rimowa and Lando Norris are scoped elsewhere. |
| Signature creative move | **Turn the house, and the inspection walks with you.** The closing section holds one small house in 3D (CSS 3D: four walls, a gable roof, windows, a door, gutters and a downspout). Drag it, or use "Turn left / Turn right / Look at the roof". As each side comes round, its parts are labelled, and the free-inspection checklist beside it ticks off: siding and trim, windows and doors, roof and flashing, gutters, paint and caulk, rot and water damage. When all six are ticked: "That's the free inspection. One visit covers every trade." The Book button and the phone (with live open / closed status) sit beside the house from the start; they never wait for the walk. |
| Style family | One turnable 3D model house in white and green, a quiet checklist, and the contact block |
| Content | The homepage process text verbatim: "A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade." The six inspection items exactly as the homepage process lists them (`Proc.INSP`). The phone (512) 550-0000 with the shared live status (`Cta.status`), the hours Mon–Fri 8–8, Sat 8–6, Sun 12–5, the address 7801 N Lamar Blvd Suite C70, Austin TX 78752, and info@austinprosiding.com. "No form: nothing here is sent or saved." Labels on the drawing name only the parts drawn. Nothing about any real house is implied. |
| How it differs from every existing Booking version | A is a work-order pad. B is a press board. C is a pinned film roll of the record. D is one giant number. E is a weekly timetable. F is an office letterboard. G is three doors. H is a postcard. I is a day / night stage. J is a receipt. K is a route line. L folds a wall of facts into one line. None shows what the free inspection actually covers, and none lets the visitor walk round a house the way the project manager will. |
| Why it is better | The free inspection is what the visitor is being asked to book, and here they see exactly what it is (every side, every trade) before they press the button. The current best (L, "Everything, then one step", 8.63) reduces the case to one step; M shows what that step is. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the house), the contact block always visible; ⟦S0220⟧ published wording only |
| 3D house | ⟦S1436⟧ CSS 3D (`preserve-3d`), eased turns of 0.7 s; drag to turn with pointer capture; ⟦S1443⟧ buttons and keys as the non-drag route |
| Turn buttons (3) | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px; button system: hover, press, spring, ring; ← → keys on the focused house |
| Labels | Small tags on each face, naming the drawn parts; they turn with the face |
| Checklist | ⟦S1440⟧ six items tick as their side faces the viewer; polite announcement per tick and at completion; ⟦S1449⟧ plain list |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection"; the phone with live status; hours, address, email |
| Phone | The house above, checklist and contact below; drag sideways to turn (`touch-action: pan-y` keeps the page scrolling) |
| Reduced motion | ⟦S0400⟧ turns are instant; all labels are readable in a flat list too |
| Background law | White ground; the stage and contact block are `data-solid` |

---

## Build log

**How to view:** `?book=m` (switcher: Booking, **M "Walk round the house"**).

**Files:**
- `src/sec/cta8.js` (`Cta8.M`, `Cta8.wire`, `Cta8.INSP`) and `src/sec/cta8.css` (class prefix `bm` under `.bmM`; the collision check found one shared name, `lit`, which elsewhere is scoped to `.h4v`, so there is no clash).
- `build_site.py`: the module added to `MODS`, pre-rendered as `cm`, wired, given the `book` slot letter `m`, and listed in the switcher. Nothing else changed.
- The file grows by **19,366 bytes**; no images.

**The house (CSS 3D, no library):**
- **Walls:** 300 × 170 px front and back; 220 px gable ends rising a further 90 px (clip-path pentagons).
- **Roof:** two planes hinged at the ridge, tilted by atan(110 / 90) = 50.7°, each 142 px plus overhang; a chimney on the front plane.
- **Details:** lap siding by repeating gradient; white trim, windows with meeting rails, a deep-green door; gutters on both eaves and a downspout on the right gable corner; a soft ground shadow.
- **Shading:** faces are shaded by side (brightness 1 / .94 / .9 / .86) so the volume reads.
- **Pose:** `rotateX(-14deg) rotateY(-90° × side)`, 0.7 s `cubic-bezier(.22,1,.36,1)`. "Look at the roof" tilts to `rotateX(-58deg)`, always from the front so the ridge reads level.

**The walk:**

| View | Labels lit on the drawing | Checklist item ticked |
|---|---|---|
| Front | Siding · Trim · Window · Door | Siding and trim · Windows and doors |
| Right side | Gutter and downspout | Gutters |
| Back | Paint and caulk at the trim | Paint and caulk |
| Left side | Low boards and sills | Rot and water damage |
| The roof | Shingles and flashing | Roof and flashing |

- The six items are the homepage process's inspection list, verbatim (checked against `process.js`).
- When all six are seen: "That's the free inspection. One visit covers every trade."
- The live region announces each new tick and the completion. The front's ticks on load are silent.

**Input:**
- Three buttons: Turn left, Look at the roof (`aria-pressed`), Turn right; each 48 px.
- On the focused house, ← → turn it and ↑ ↓ look at or away from the roof.
- A sideways drag (pointer capture) turns it live and snaps to the nearest side on release; `touch-action: pan-y` keeps the page scrolling on phones.

**Contact (always visible):**
- The one filled "Book a free inspection".
- (512) 550-0000 with the shared live status ("Closed now. Opens tomorrow (Austin time)" at test time).
- The hours, the address, info@austinprosiding.com, and "No form: nothing here is sent or saved."

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-booking-m-1440-0` (front), `-1440-right`, `-1440-back`, `-1440-left`, `-1440-roof`;
- `-1440-drag`: mid-drag, the house between sides;
- `-768-0`, `-768-1`, `-390-0`, `-390-roof`;
- contact sheet `new-booking-m.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids; turn buttons 48 px; no oversized icons |
| Verbatim | The lead line and the six inspection items match the homepage process (`process.js`) exactly |
| The walk (1440 and 390, by the buttons) | Right → ticks 110100, label "Gutter and downspout"; Back → 110110; Left → 110111; Roof → 111111. The completion line shows and the live region says "All six seen. That's the free inspection. One visit covers every trade." |
| Keys / drag | ↓ on the focused house → "Left side"; ← → "Back side"; a 220 px drag right → "Right side" (snapped) |
| Live region | Silent on load; announces each new tick and the completion |
| Reduced motion | Turns are instant (no transition); ticks still work |
| All homepage version views (121) | 0 page errors and 0 overflow in every one |
| Existing versions | The 192 existing slot templates are byte-identical; one template added (`book:m`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Booking stays A); subpages untouched |
| Locks | "(512) 550-0000", "Mon–Fri 8–8 · Sat 8–6 · Sun 12–5", "7801 N Lamar Blvd Suite C70, Austin TX 78752", "info@austinprosiding.com" and "No form: nothing here is sent or saved." verbatim |

## Defects found and fixed

1. **The roof view came out sideways.** It inherited the current side's turn, so from the right side the ridge ran vertical and its label read sideways. The roof view now always looks down from the front.
2. **Two gable labels were clipped** by the gable's outline ("Gutter and downspout", "Low boards and sills"). They moved inside the wall.
3. **The live region spoke on page load,** announcing the front's two ticks before anyone had turned anything. The first tick is now silent.

## Remaining defects, named honestly

- **The house is a model drawing,** not a client's house or a photo. Its labels name only what is drawn.
- **Which side shows which item is a teaching device.** Real gutters, sills and flashing are all round a house; the walk places one item per side so every side has something to see.
- **Labels are tiny on a 390 phone** (11 px chips on a scaled house). The checklist beside the house carries the same words at full size.
- **CSS 3D is drawn by the browser;** very old browsers without `preserve-3d` would show flat faces. Chromium only was tested.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Booking M | ⟦S1434⟧ the house dominates while the contact block stays visible; ⟦S0220⟧ published wording only |
| Element | 3D house | ⟦S1436⟧ CSS 3D with `preserve-3d`, 0.7 s eased turns, a roof tilt from the front; ⟦S1443⟧ drag with button and key alternatives |
| Element | Turn buttons | ⟦S0054⟧ named buttons with `aria-pressed` on the roof; ⟦S1441⟧ 48 px; button system: hover, press, spring, ring |
| Element | labels | Tags ride the faces and light when their side faces you |
| Element | checklist | ⟦S1440⟧ ticks with polite announcements (silent on load); ⟦S1449⟧ plain two-column list |
| Element | contact | ⟦S1435⟧ the one filled Book button; phone with live status; hours, address, email; the no-form line |
| Site | phone | House above, checklist and contact below; `touch-action: pan-y`; buttons wrap |
| Site | reduced motion | ⟦S0400⟧ instant turns |
| Site | background law | White ground; the stage and contact block are `data-solid` |

## Reference transfers and non-transfers (Ever)

**Transferred:**
- the 3D visualisation as understanding: turn the object to see what it holds, each view explained.

**Not transferred:**
- Ever's before/after pairs (barred);
- its apartment renders, filtering UI (used in Process M), type and palette.

## Comparison with the section's previous best (Booking L, "Everything, then one step", 8.63)

- **L is stronger on:** gathering the page's evidence and ending on one decision.
- **M is stronger on:** showing exactly what the visitor is booking. The free inspection walks every side of the house, and the visitor walks it too before pressing Book.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A small crafted 3D house in the site's whites and greens, side-shaded for volume, with labels that light as each side turns (`-1440-right`, `-1440-roof`, `-1440-drag`); the contact block calm beside it. **Minus:** the labels are small on phones |
| Usability (30) | **8.5** | Buttons, keys and drag; a checklist that ticks with polite announcements; the CTA visible from the start; reduced motion; 0 errors in 121 views |
| Creativity (20) | **8.8** | No Booking version shows what the free inspection covers, and none lets the visitor walk round a house |
| Content (10) | **8.6** | The homepage process text and inspection list verbatim; all contact locks. **Minus:** the one-item-per-side placement is a teaching device |
| **Weighted** | **8.61** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.5 + 0.2 × 8.8 + 0.1 × 8.6 = 3.44 + 2.55 + 1.76 + 0.86 = **8.61**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; nothing game-like (no score, goal or timer).
- White ground; brand accents only; normal fonts.
- No invented imagery or claims.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Pass 3 is complete** with this version (an M in all nine sections). **Stopped for Muse's accept.** After the accept, per the addendum ("finish one full pass before starting the next"), pass 4 begins with Hero N.
