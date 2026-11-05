# GATE-NEW — Hero N, "The cover story"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 4, section 1 (pass 3 complete; Booking M accepted by Muse). It inherits the button system. Nothing game-like and no configurator.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Hero N, "The cover story"** (`?hero=n`) |
| Primary reference (annex v3, one) | **Ever**, verified craft only: the case page's magazine narrative (the work presented as an editorial story). Not its pairs, which the annex bars. No Hero version has used Ever: 7 and 10 used Apple AirPods Pro, 7 also Lando Norris, 8 Scout, 9 Dropbox and Graza, K MERSI, L Cash App, M Quiet Cubes; 1–6 predate the annex. Cowboy would need a photograph of people the firm has not published. Lusion's line and dive are held by Booking K and Try D; Bruno Simon and Rimowa are scoped elsewhere. |
| Signature creative move | **The homepage as a magazine, and the hero is its cover.** One of the firm's own job photos is the cover: Rob Roy, Austin, navy James Hardie lap siding under a clear sky. The firm's name runs as the masthead with a dateline (since 2009, merged with Sanders Roofing & Exteriors 2018). The page's locked facts are set as cover lines, each a big figure with its words, and each cover line is a link that jumps to the section inside that tells that story (Reviews, Services, Windows, On your street, Process). The cover headline is the page's H1, with the standfirst and the two calls to action. As the reader scrolls into the page, the cover turns away like a magazine page, hinged on its left edge, revealing the page beneath. The cover credit names the job and links to it. |
| Style family | An editorial magazine cover: masthead, cover lines, cover credit, full-bleed real photograph |
| Content | The Rob Roy, Austin siding job (Jul 2026, James Hardie Select Cedar Mill Lap 8.25", $15k–$20k siding portion) with its published after photo and alt, and its project page. The page's H1 and sub (`LEAD`, `SUB`) and the shared CTAs. Cover lines, all locked, verbatim: "4.9 from 474 Google reviews"; "431 documented siding jobs"; "388 documented window jobs"; "886 documented projects since 2018: 312 on the map with photos + 574 more counted"; "$10k–$15k median band (415 priced)"; "30-year James Hardie non-prorated warranty". Masthead: Austin Pro · Siding, Windows & Roofing · Austin, TX · since 2009, merged with Sanders Roofing & Exteriors 2018. |
| How it differs from every existing Hero version | 1 lifts boards over a photo. 2 bends a photo by depth. 3 pins a dusk portrait. 4 sets the title between sky and house. 5 hangs one photo as lap courses. 6 is a three-house deck. 7 is a dot field of records. 8 is a full-bleed cinematic photo with one line. 9 makes type the house. 10 rolls the trade word. K splits before and after on a seam. L shows eight jobs as their colours. M builds a house from 43 jobs. None is a cover with cover lines that navigate the page, and none turns away like a page as you enter. It is not the closed left-text / right-photo scaffold: the photograph is the whole hero, and the type is set on it as a cover. |
| Why it is better | It puts the page's strongest facts in the first viewport, each one a door into the section that proves it, on a real finished house, without a single invented word. The current best (M, "A house built from our jobs", 8.60) shows breadth; N gives the visitor the page's table of contents as a promise. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the cover); ⟦S0220⟧ locked facts verbatim; a real photograph with its alt |
| Masthead and dateline | Montserrat display, tight tracking; the dateline in small caps type |
| Cover lines (6 links) | ⟦S0054⟧ real links to the section anchors, each naming its destination; ⟦S1440⟧ hover and focus underline in lime with a "→ Reviews" marker; button system: hover, press, ring |
| H1, standfirst, CTAs | ⟦S1435⟧ the shared filled Book button and the call link; the H1 is the page's only h1 |
| Intro | ⟦S1436⟧ masthead letters drop in, cover lines stagger in (40 ms), the photo settles from 104% scale; content readable from the first frame |
| Page turn | ⟦S1325⟧ scroll-linked: as the hero leaves, the cover rotates on its left edge (up to 24°) with a soft page shadow; native scroll, never hijacked |
| Cover credit | The job's place, month and work, linked to its project page |
| Phone | A portrait cover: masthead, photo, H1 and CTAs on the cover; the cover lines below it as "In this issue" |
| Reduced motion | ⟦S0400⟧ no intro motion and no page turn |
| Background law | White ground around the cover; the cover is `data-solid` |

---

## Build log

**How to view:** `?hero=n` (switcher: Hero, **N "The cover story"**).

**Files:**
- `heroN()` in `build_site.py`: the markup; the Rob Roy after photo re-encoded once at 1440 × 900, WebP quality 60; its record from `svcpairs.json`.
- `src/hero7.js` (`Hero7.wire`) and `src/hero7.css` (class prefix `n` under `.hnv`; the collision check found no shared names).
- `build_site.py`: wired after Hero6, given the `hero` slot letter `n`, and listed in the switcher. Nothing else changed.
- The file grows by **226,814 bytes**, almost all of it the cover photo.

**The cover:**
- **Photo:** the published after photo of Rob Roy, Austin (navy James Hardie lap siding under a clear sky), with its published alt "After: Siding in Rob Roy, Austin, TX by Austin Pro".
- **Masthead:** "AUSTIN PRO" in Montserrat 900 at up to 168 px. The dateline beneath reads "Siding, Windows & Roofing · Austin, TX · since 2009, merged with Sanders Roofing & Exteriors 2018".
- **"In this issue":** six cover lines, each a big figure plus the rest of its locked phrase, and each a link:

| Cover line (verbatim) | Jumps to |
|---|---|
| 4.9 from 474 Google reviews | Reviews (`#reviews`) |
| 431 documented siding jobs | Services (`#services`) |
| 388 documented window jobs | Windows (`#windows`) |
| 886 documented projects since 2018: 312 on the map with photos + 574 more counted | On your street (`#area`) |
| $10k–$15k median band (415 priced) | Services (`#services`) |
| 30-year James Hardie non-prorated warranty | How it works (`#process`) |

  On hover or focus, a lime underline draws across and "→ Reviews" (and so on) opens beneath; each link also names its destination for screen readers.
- **Cover headline:** the page's H1 "The full wall or the whole house.", the standfirst and the shared Book and call buttons, set over a dark gradient.
- **Cover credit:** "On the cover: Rob Roy, Austin · Siding · Jul 2026 · James Hardie Select Cedar Mill Lap 8.25"", linked to the project page.

**Motion:**
- **Intro:** the masthead letters drop in (45 ms apart), the cover lines slide in (70 ms apart) and the photo settles from 104%. Every word is present in the HTML from the first frame.
- **Page turn:** as the hero scrolls out, the cover rotates on its left edge, up to 24° at 85% of its height, with a page shadow that deepens. Native scroll, never hijacked. Off on phones and under reduced motion.

**Phone:**
- A portrait cover on a deep-green card: photo, masthead and H1 on the photo, CTAs below it.
- The cover lines follow as a two-column "In this issue" grid, then the credit.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-hero-n-1440-intro` (400 ms in), `-1440-0`;
- `-1440-turn`: scrolled 40%, the cover turned 11°;
- `-1440-hover`: a cover line focused;
- `-768-0`, `-390-0`, `-390-1`;
- contact sheet `new-hero-n.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, exactly 1 h1 (the cover headline), 0 duplicate ids; the Book button inside the first viewport at all three widths; no oversized icons |
| Locks | All eight checked strings appear verbatim in the hero at all three widths: the six cover lines, the dateline's "since 2009, merged with Sanders Roofing & Exteriors 2018", and "(512) 550-0000" |
| Cover lines | All six link to anchors that exist on the page; clicking "388 documented window jobs" lands the Windows section at the top (`#windows`, 0 px) |
| Page turn | At scroll 40% of the hero: `rotateY(-11.29deg)`; back at the top: none; phone: none |
| Reduced motion | Cover lines fully visible at once (opacity 1); no turn on scroll |
| Narrow desktop windows (320–390 px, no mobile emulation) | The hero adds 0 overflow. The page itself overflows by 34–104 px at those widths with Hero M too: it comes from the default Visualiser's chips (`#colours`), a pre-existing issue outside this version (see remaining defects) |
| All homepage version views (122) | 0 page errors and 0 overflow in every one |
| Existing versions | The 193 existing slot templates are byte-identical; one template added (`hero:n`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Hero stays 1); subpages untouched |

## Defects found and fixed

1. **The dateline's lock read in capitals.** CSS uppercased "since 2009, merged with Sanders Roofing & Exteriors 2018". The source text was verbatim, but the rendered text was not. The dateline is now set in normal case.
2. **The masthead was clipped on phones** ("AUSTIN PR" at 390). It is now sized to fit: 12.2 vw, measured to fit from 320 px up.
3. **The cover headline overflowed on phones.** Its block kept the desktop `left` offset under `position: relative`, pushing it 22 px past the card. The offsets are reset, and the hero now adds 0 overflow at 320–390.

## Remaining defects, named honestly

- **Pre-existing, outside this version:** in a desktop browser narrowed to 320–390 px (not a phone, which has 0 overflow), the default Visualiser's chip row (`#colours`, and `.tagl` in Siding at 320) widens the page by 34–104 px. It happens identically with the accepted Hero M. I have not touched it, because the addendum forbids altering existing versions; I am flagging it for the owner.
- **One cover photo.** The cover is a single job (Rob Roy); a magazine would change covers by issue. The others could rotate in a later version.
- **Weight:** +227 KB for the cover photo.
- **Cover-line legibility depends on the photo.** On the navy siding and dark shade the white lines read well; a lighter cover photo would need a stronger panel.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Hero N | ⟦S1434⟧ the cover dominates; ⟦S0220⟧ locked facts verbatim, a real photo with its published alt |
| Element | masthead | Montserrat 900, tight tracking; the dateline carries the founding facts |
| Element | 6 cover lines | ⟦S0054⟧ real anchor links, each naming its destination; ⟦S1440⟧ lime underline and "→ section" on hover / focus; button system: hover, press, ring |
| Element | cover headline | The page's only h1; ⟦S1435⟧ the shared filled Book button and the call link |
| Motion | intro | ⟦S1436⟧ masthead letters drop, cover lines stagger, the photo settles; content readable from the first frame |
| Motion | page turn | ⟦S1325⟧ scroll-linked rotateY on the left edge, up to 24°, with a shadow; native scroll |
| Element | cover credit | Place, trade, month and product, linked to the project page |
| Site | phone | Portrait cover; "In this issue" as a two-column grid below; no page turn |
| Site | reduced motion | ⟦S0400⟧ no intro, no turn |
| Site | background law | White ground around the cover; the cover is `data-solid` |

## Reference transfers and non-transfers (Ever)

**Transferred:**
- the magazine narrative: the work presented as an editorial story, with a cover and its contents;
- the page as a turnable printed object.

**Not transferred:**
- Ever's before/after pairs (barred), its 3D apartment renders (Booking M used the 3D craft), and its filtering UI (Process M);
- its type and palette.

## Comparison with the section's previous best (Hero M, "A house built from our jobs", 8.60)

- **M is stronger on:** breadth. 43 real jobs in one composition.
- **N is stronger on:** first-viewport clarity and usefulness. One beautiful finished house, the strongest locked facts as cover lines, and each line a door into the section that proves it.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.8** | A confident editorial cover on a real finished house: masthead, cover lines, headline, credit (`-1440-0`); the page turn as you enter (`-1440-turn`); a composed portrait cover on phones (`-390-0`) |
| Usability (30) | **8.5** | The CTA in the first viewport at every width; six cover lines that navigate the page; keyboard and screen-reader labels; reduced motion; 0 errors in 122 views. **Minus:** cover-line legibility relies on this photo's dark tones |
| Creativity (20) | **8.6** | No hero version is a magazine cover, uses cover lines as navigation, or turns away like a page |
| Content (10) | **8.8** | Eight locks verbatim; a real job photo with its published alt and record; nothing invented |
| **Weighted** | **8.67** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.8 + 0.3 × 8.5 + 0.2 × 8.6 + 0.1 × 8.8 = 3.52 + 2.55 + 1.72 + 0.88 = **8.67**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; nothing game-like; not the closed left-text / right-photo scaffold.
- White ground; brand accents only; normal fonts.
- A real photo of the firm's own work, credited.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Services N until Muse accepts.
