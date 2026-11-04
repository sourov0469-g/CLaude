# GATE-NEW — Hero M, "A house built from our jobs"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 1. Pass 2 is complete and accepted, and the addendum governs "until the owner stops it", finishing one full pass before the next. This version inherits the button system. Nothing game-like and no configurator.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Hero M, "A house built from our jobs"** (`?hero=m`) |
| Primary reference (annex v3, one) | **Quiet Cubes**: modular cubes, a calm and tactile product presentation, with a staffed service behind it. No Hero version has used it: 7 and 10 used Apple AirPods Pro, 7 also Lando Norris, 8 Scout, 9 Dropbox and Graza, K MERSI, L Cash App; 1–6 predate the annex. Of the other unused references, Lusion's drawn line is held by Booking K and its dive is locked to Try D; Cowboy's single human subject would need a photograph of people the firm has not published, and I will not invent one. |
| Signature creative move | **Every block is a real job, set where its work sits on a house.** The firm's 43 published project photos become 43 calm, square-edged blocks stacked into the silhouette of a house: a stepped gable of 13 roofing jobs with a chimney, three courses of wall made of the siding and window jobs, and two ground courses of doors, garage doors and patio covers, with the doors at the centre as a front entrance. On arrival the house is built course by course from the ground up, calmly, with no bounce. Point at or focus a block: it lifts, and the plate under the house reads its record (place, month, trades) with a link to its project page. Three part chips (Roof · Walls and windows · Doors, garage and patio) light their part of the house. |
| Style family | A modular photo mosaic as architecture: square blocks, even joints, a calm plate of type; the hero's own lead and buttons beside it |
| Content | The shared hero lead, support line and CTAs (`LEAD` / `SUB` / `CTAS`, unchanged). The 43 photos in `photos.json`, published on the firm's project pages, each with its place, month, trades and project link. Each photo keeps its published alt, or, where the source gives none, the site's existing fallback ("{trades} at a home in {place}, TX, by Austin Pro"). A photo's part of the house comes from the trade it is captioned for (the first trade listed). No count beyond "43 photos from our published projects", and nothing near the locked 886 wording. |
| How it differs from every existing Hero version | 1 lifts boards over a photo. 2 bends a photo by depth. 3 pins a dusk portrait. 4 sets the title between sky and house. 5 hangs one photo as lap courses. 6 is a three-house deck. 7 is a dot field of records. 8 is a full-bleed cinematic photo. 9 makes type the house. 10 rolls the trade word. K splits before and after on a seam. L shows eight jobs as their colours. None builds a house out of real jobs, and none says, through the layout itself, that the firm does every part of the house. |
| Why it is better | It states "every trade" without a word: the roof, walls, windows, doors, garage and patio are each made of jobs the firm has published, and each block opens its record. The current best (L, "In their own colours", 8.52) shows eight jobs as colour. M shows all 43 published photos, in place, as one house. |
| Pairing note (F17) | Services L also uses Quiet Cubes (a map of small cubes sized by trade counts). If the owner picks Hero M and Services L together, the page has two cube grids; pick one. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the house); ⟦S0220⟧ published photos and records only |
| Lead, support, CTAs | The shared hero copy and buttons, unchanged; ⟦S1435⟧ one filled "Book a free inspection" |
| House mosaic (43 blocks) | ⟦S1417⟧ even joints, one block size; ⟦S1420⟧ honest grouping, each part of the house made only of jobs of that trade; real `<a>` links to project pages with published alts |
| Block focus and hover | ⟦S0054⟧ a group with one tab stop and arrow-key movement (roving tabindex), Enter opens the project; lime focus ring; button system: tile zoom, press, spring; ⟦S1440⟧ the block lifts and the plate updates instantly |
| Record plate | ⟦S1449⟧ place, month, trades in one plate; announced politely; a "See this project" link |
| Part chips (3 toggles) | ⟦S0054⟧ `aria-pressed` buttons; the chosen part stays full, the rest dim; ⟦S1444⟧ three choices |
| Arrival | ⟦S1325⟧ once: courses set from the ground up, 30 ms apart, 0.6 s, `cubic-bezier(.16,1,.3,1)`, no overshoot (Quiet Cubes' calm) |
| Phone | Copy and buttons first, the house below at full width (blocks about 52 px), chips scroll sideways if needed; ⟦S1441⟧ |
| Reduced motion | ⟦S0400⟧ the house standing at once; no lift |
| Background law | White ground; the house is `data-solid` |

---

## Build log

**How to view:** `?hero=m` (switcher: Hero, **M "A house built from our jobs"**).

**Files:**
- `heroM()` in `build_site.py`: markup from `photos.json`; the 43 photos re-encoded once at 200 × 150, WebP quality 56.
- `src/hero6.js` (`Hero6.wire`) and `src/hero6.css` (class prefix `m`). The collision check found `.mb` already in use, so the blocks are `.mhb`.
- Registered: hero dictionary entry `m`, switcher label, the stylesheet and script in the build, and the boot call `Hero6.wire()`.
- The file grows by 295,850 bytes.

**The house (6 columns, 8 courses, 43 blocks):**
- **How a photo is sorted:** by the trade it is captioned for (its published alt, "Doors at a home in …"), or else the first trade listed. The build stops unless the split is exactly 13 roof, 9 siding, 8 windows, 5 doors, 4 garage doors and 4 patio covers.
- **Roof:** a stepped gable of 2, 4 and 6 roofing blocks, plus a chimney: a narrow, full-height block on the ridge course that takes the oldest roofing photo.
- **Walls:** three courses of siding and window jobs, alternating, newest first; the last wall block is a door.
- **Ground:** two courses: garage doors either side of a central pair of doors, then patio covers either side of the lower pair (the front entrance). A deep-green ground line sits under the house.
- **Blocks:** each block is a real link to its project page (new tab), carrying its published alt, or the site's existing fallback where the source has none. The spoken name is "{trades}, {place}, {month}. Opens the project page."

**Interaction:**
- **Arrival:** the house is built course by course from the ground up (30 ms per block, 0.6 s, `cubic-bezier(.16,1,.3,1)`, a 14 px rise, no overshoot). Afterwards the delays are cleared, so hover and dimming answer at once.
- **Hover or focus:** the block lifts (button-system tile zoom and a green ring), and the plate reads its record: place, month · trades, and which part of the house it is.
- **Keyboard:** the whole house is one tab stop. ← → move in reading order; ↑ ↓ move to the nearest block in the course above or below; Home and End go to the first and last block; Enter opens the project.
- **Part chips** (Roof · Walls and windows · Doors, garage and patio): `aria-pressed` toggles. The chosen part stays in full colour; the rest fade to grey at 38%.
- **The plate's hint** reads "Point at one to read its record" with a mouse and "Tap one to open its project" on touch.

**Copy:** the shared hero lead, support line and CTAs, unchanged, plus the kicker "A house built from our own jobs".

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-hero-m-1440-0`, `-1440-1`, `-768-0`, `-768-1`, `-390-0`;
- `-1440-build` (450 ms in: the ground and walls set, the roof not yet), `-1440-hover` (a wall block lifted, plate filled), `-1440-roof` (the Roof chip on), `-1440-focus` (keyboard on the last block);
- `-390-house`;
- contact sheet: `new-hero-m.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Blocks | 43; roof 13, wall 17, ground 13; every link points to a `/recent-projects/` page; 0 images without alt text |
| Arrival | 450 ms after start: the top six blocks at opacity 0, the bottom six at 1 (built from the ground up) |
| Hover | One block marked; the plate reads "Austin · Sep 2026 · Siding, Gutters & Exterior Painting · the walls" |
| Chips | Roof on: roof blocks at opacity 1, others at 0.38, `aria-pressed="true"`; pressed again: off |
| Keyboard | One tab stop; ↓ ↓ ↓ → from the ridge lands on course 4, column 4 (a wall block) and fills the plate; End → course 8, column 6 |
| Reduced motion | Built at once (`mgo` and `mdone` immediately; opacity 1) |
| Phone (390) | Blocks 57 × 43; the touch hint shows; 0 overflow |
| CTA phone icon | 18 × 18 |
| All 233 version views | 0 page errors; the button system on in every view; subpages untouched |
| Existing versions | 183 slot templates and 8 page templates unchanged; the page body identical apart from the one added `hero:m` template; the only changed blocks are the stylesheet and main script (adding Hero M); defaults unchanged (`hero = 1`) |
| Locks | The phone and the Book button as shared; no 886 wording, no new counts beyond "43 photos" |

## Defects found and fixed

1. **Class collision:** `.mb` is used elsewhere; the blocks are now `.mhb`.
2. **The house arrived all at once:** the rule that clears the stagger after arrival fired the moment arrival began. It now waits until the last course has landed (`mdone`), and the measured frames show the ground first, the roof last.
3. **The chimney read as a floating thumbnail:** it is now a narrow block at full course height, resting on the roof course below. It also took a photo framed mostly on a window; it now takes the oldest roofing photo.
4. **"Point at one" on touch screens:** a tap opens the project, so phones and tablets now read "Tap one to open its project".
5. **A broken line in the build** (my own edit put a comment mid-statement). Caught by the build, fixed, and every check re-run on the fixed build.

## Remaining defects, named honestly

- **A photo's place in the house follows its caption, not its framing:** one roofing-captioned photo (Austin, May 2026, "Shingle Roofing, Windows & Siding", with no published alt) shows mostly a window and sits in the roof.
- **Blocks are small:** at 1440 a block is about 96 × 72 px, so a photo is a hint and the record and project page carry the detail.
- **Pairing (F17):** Services L also uses Quiet Cubes; if both are picked, the page has two cube grids.
- **Weight:** +295,850 bytes (43 photos).
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | hero M | ⟦S1434⟧ the house dominates the right half; ⟦S0220⟧ published photos and records only |
| Element | lead, support, CTAs | Shared and unchanged; ⟦S1435⟧ one filled "Book a free inspection" |
| Element | 43 blocks | ⟦S1417⟧ one block size, even 5 px joints; ⟦S1420⟧ each part of the house made only of that trade's jobs; real links with published alts |
| Element | block focus and hover | ⟦S0054⟧ one tab stop, arrows / Home / End, Enter opens; ⟦S1440⟧ lift and plate at once; button system: tile zoom, press, spring, ring |
| Element | record plate | ⟦S1449⟧ place, month · trades, part; polite announcement |
| Element | 3 part chips | ⟦S0054⟧ `aria-pressed`; ⟦S1444⟧ three choices |
| Motion | arrival | ⟦S1325⟧ once, ground up, 30 ms per block, no overshoot |
| Site | phone | Copy first, the house full width (57 × 43 blocks), touch wording; ⟦S1441⟧ |
| Site | reduced motion | ⟦S0400⟧ built at once |
| Site | background law | White ground; the house is `data-solid` |

## Reference transfers and non-transfers (Quiet Cubes)

**Transferred:**
- modular cubes as the presentation: identical blocks, even joints, assembled into a larger form;
- calm, tactile handling: no bounce, a gentle lift on hover, a grey-out to isolate one module group;
- the service behind it: every block opens the real job.

**Not transferred:**
- the 3D model (unverified in the annex);
- Quiet Cubes' product photography, palette and type;
- any configurator behaviour: nothing can be chosen or changed.

## Comparison with the section's previous best (Hero L, "In their own colours", 8.52)

L shows eight jobs as the colours of their work.
- **M shows all 43 published job photos at once, as the house they add up to:** roof, walls, windows, doors, garage and patio. The layout itself says "every trade on the house", and each block opens its job.
- **L is stronger on:** a single bold idea (colour) and large fields.
- **M is stronger on:** breadth of evidence and the literal "whole house" promise of the lead.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A clean stepped-gable house of even blocks beside the lead; calm build; chips that isolate a part (`-1440-0`, `-1440-roof`). **Minus:** blocks are small at 1440 |
| Usability (30) | **8.5** | One tab stop with arrow keys; plate on hover or focus; real links; touch wording; reduced motion; 0 errors and 0 overflow. **Minus:** on touch there is no preview before the project page opens |
| Creativity (20) | **8.7** | A house literally built from the firm's own jobs: the composition is the claim |
| Content (10) | **8.7** | 43 published photos with their records and links; parts sorted by caption; no new claims. **Minus:** one roofing-captioned photo shows a window |
| **Weighted** | **8.60** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.5 + 0.2 × 8.7 + 0.1 × 8.7 = 3.44 + 2.55 + 1.74 + 0.87 = **8.60**.

**Vetoes: none.**
- Locks untouched; no form.
- Not a configurator; no game.
- White ground; brand accents only; normal fonts.
- The firm's own published project photos, with their records.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Services M until Muse accepts.
