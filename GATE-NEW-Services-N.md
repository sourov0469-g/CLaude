# GATE-NEW — Services N, "Built trade by trade"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 4, section 2 (Hero N accepted by Muse). It inherits the button system. Nothing game-like and no configurator: the visitor scrolls or steps through the firm's own record.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Services N, "Built trade by trade"** (`?services=n`) |
| Primary reference (annex v3, one) | **Apple AirPods Pro**: the pinned scroll, its product assembling itself as you scroll, and numbers landing as events. Every usable annex reference has now been used once in Services: C Apple AirPods Pro and Cash App, D MERSI, E and F an Ever craft note, G Dropbox, H Graza, I Cowboy, J Lando Norris, K Scout, L Quiet Cubes, M Lusion; Bruno Simon and Rimowa are scoped elsewhere. So N returns to Apple for the one Apple move no Services version has made. C took Apple's counted chapters; N takes the assembly. |
| Signature creative move | **The house assembles, one trade at a time.** The section pins, and as the reader scrolls a drawn house is built in the order of the firm's record, most documented first: the lap siding goes on, then the windows, then the paint, then the shingle roof, the gutters, the front door, the patio cover, the metal porch roof and the garage door. Each layer lands as its trade's documented count does: a big numeral event (431 … 9) with the trade's name and its published median band. When the house is complete: "One free inspection covers every trade on the house." Previous / Next buttons and a row of trade chips give the same steps without scrolling. |
| Style family | A pinned assembly: one drawn house elevation built in layers, one giant rolling numeral, a quiet trade row |
| Content | The homepage service list's documented counts and each trade's median band, exactly as Services L and M use them: Siding 431 ("431 documented siding jobs", "$10k–$15k median band (415 priced)"), Windows 388 ("388 documented window jobs"), Exterior painting 320, Shingle roofing 210, Gutters 121, Exterior doors 109, Patio covers 34, Metal roofing 31, Garage doors 9, each with its band and priced count; the two published timelines (siding, windows). The closing line is the homepage sub's own words. Counts are never summed. The drawing is a generic house (an interface graphic), not a client's home. |
| How it differs from every existing Services version | A slides trades sideways. B switches a word. C counts chapters. D is a split cover. E picks a part of the house. F is a magazine spread. G is a sortable table. H pulls boards. I is three rings. J is an index with a photo peek. K runs film reels. L sets isotype cubes on a house. M morphs one frame. None builds the house trade by trade as you scroll, with each trade's record landing as the piece goes on. |
| Why it is better | It answers "what do you do?" in the order a house is actually wrapped, and with the record behind each piece. By the end the visitor has seen one company do the whole exterior, which is the firm's core promise. The current best (M, "One frame, every trade", 8.63) shows one trade at a time; N shows them adding up to one house. |
| Pairing note (F17) | Area M also pins and scrubs with scroll. If the owner picks both, the page has two pinned sections; pick one. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the house); ⟦S0220⟧ published counts and bands only, never summed |
| Pinned stage | ⟦S1325⟧ `position: sticky` in a 260 vh section; progress from the page's own scroll, never hijacked |
| House layers (9) | ⟦S1436⟧ each layer rises into place (0.6 s) as its step arrives, siding courses staggered; ⟦S1315⟧ layers only toggle classes |
| Numeral | Apple's numeral event: the count rolls in on each step; trade name and band beneath |
| Trade chips (9) | ⟦S0054⟧ buttons with `aria-pressed` for the current step; jump to that trade; button system: hover, press, spring, ring |
| Previous / Next | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px |
| Live line | ⟦S1440⟧ `aria-live="polite"` on manual steps: "Windows: 388 documented window jobs, $10k–$15k median band (376 priced)." |
| Close | "One free inspection covers every trade on the house." and ⟦S1435⟧ the one filled Book button |
| Phone | Same pinned stage; the numeral above the house; chips scroll sideways |
| Reduced motion | ⟦S0400⟧ no pinning: the finished house and the full nine-trade list at once; chips and buttons still step |
| Background law | White ground; the stage is `data-solid` |

---

## Build log

**How to view:** `?services=n` (switcher: Services, **N "Built trade by trade"**).

**Files:**
- `src/sec/svc8.js` (`Svc8.N`, `Svc8.wire`, `Svc8.T`) and `src/sec/svc8.css` (class prefix `sn` under `.snN`; the collision check found no shared names).
- `build_site.py`: the module added to `MODS`, pre-rendered as `sn`, wired, given the `services` slot letter `n`, and listed in the switcher. Nothing else changed.
- The file grows by **24,256 bytes**; no images.

**The house** (one SVG elevation: a main body, a garage wing, a patio cover and a front porch). It starts as a dashed outline, and nine layers arrive in the order of the record:

| Step | Trade (count) | Layer that goes on |
|---|---|---|
| 1 | Siding (431) | lap courses over every wall, in primer |
| 2 | Windows (388) | two windows with trim, sills and meeting rails |
| 3 | Exterior painting (320) | the walls in their finish colour; white corner boards and window trim |
| 4 | Shingle roofing (210) | the main roof and the garage roof (drops in from above) |
| 5 | Gutters (121) | both eaves and a downspout |
| 6 | Exterior doors (109) | the deep-green front door in its casing |
| 7 | Patio covers (34) | the cover on its posts, rafter tails showing |
| 8 | Metal roofing (31) | the standing-seam porch roof over the door |
| 9 | Garage doors (9) | the panelled garage door |

Each step's numeral, trade line and band are the ones Services L and M publish (in `Svc8.T`); the siding and windows steps add their published timelines.

**The scroll:**
- The section is 260 vh (240 vh on tablets and phones) with a sticky stage.
- The first 90% of the scroll divides into ten beats (outline, then the nine trades). Past 92%, "All the trades, on one house" and the closing line "One free inspection covers every trade on the house." land.
- The count rolls up into place on each beat; the layers rise 16 px into place (the roof drops 22 px).

**Manual stepping:** the nine trade chips (`aria-pressed`) jump to a trade; Previous / Next step one at a time; the live region announces each manual step. The next scroll hands control back to the page.

**Reduced motion:**
- No pinning (normal height): the finished house, the closing line, and the full nine-trade list as a visible definition list with each count, band and timeline.
- The chips and buttons still step instantly.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-services-n-1440-0`, `-01`, `-03`, `-05`, `-07`, `-086`, `-096` (scroll progress 0 → 0.96);
- `-1440-reduced`;
- `-768-05`, `-768-096`, `-390-05`, `-390-096`;
- contact sheet `new-services-n.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids |
| Pinned assembly | At progress 0 / 0.1 / 0.3 / 0.5 / 0.7 / 0.86 / 0.96, the stage's top stays at 0 px at all three widths. Layers on: 0 → 1 → 3 → 5 → 7 → 9 → 9. Numeral: — → 431 → 320 → 121 → 34 → 9 → All, with the closing line at 0.96 |
| Manual | Next from the start → Siding, 431, chip pressed, live "Siding: 431 documented siding jobs, $10k–$15k median band (415 priced)."; chip "Metal roofing" → 8 layers, 31; Previous → Patio covers, 34; phone tap Next → Shingle roofing, 210 |
| Locks | "431 documented siding jobs", "388 documented window jobs" and "$10k–$15k median band (415 priced)" verbatim; counts never summed |
| Reduced motion | No pinning; all 9 layers on; the list visible (9 entries); closing line shown |
| All homepage version views (123) | 0 page errors and 0 overflow in every one |
| Existing versions | The 194 existing slot templates are byte-identical; one template added (`services:n`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Services stays A); subpages untouched |

## Defects found and fixed

1. **The finish showed a derived number.** A big "9 trades on one house" counted the trades shown, but the firm publishes ten trades (decking has no documented count). It now reads "All · the trades, on one house", so no number is invented.
2. **Next from the start skipped Siding.** Next jumped straight to Windows; it now goes to Siding.
3. **The house was cut off on phones.** The drawing took its natural width in the one-column grid. It is now constrained to the column (`minmax(0, 1fr)`) and fits at 390.
4. **The dashed outline never faded.** It sat before the layers, so a sibling selector couldn't reach it; it now dims via `:has()` once building starts.

## Remaining defects, named honestly

- **The house is a generic drawing,** not a client's home, and the build order is by documented count, not by how a crew sequences a job.
- **A second pinned section.** Area M also pins and scrubs with scroll; if both are picked, the page has two. Pick one.
- **Scroll length:** 260 vh. The chips and buttons are the shortcut.
- **Decking is not shown,** because it has no documented count.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Services N | ⟦S1434⟧ the house dominates; ⟦S0220⟧ published counts and bands, never summed |
| Layout | pinned stage | ⟦S1325⟧ sticky stage in a 260 vh section; native scroll |
| Motion | nine layers | ⟦S1436⟧ rise (or drop) into place over 0.6 s; ⟦S1315⟧ class toggles only |
| Element | numeral | Apple's numeral event: the count rolls up on each beat |
| Element | trade chips | ⟦S0054⟧ buttons with `aria-pressed`; button system: hover, press, spring, ring |
| Element | Previous / Next | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px |
| Element | live line | ⟦S1440⟧ polite, on manual steps only |
| Element | close | The homepage sub's own closing words; ⟦S1435⟧ the one filled Book button |
| Site | phone | Numeral above the house; chips scroll sideways; Book in the mobile bar |
| Site | reduced motion | ⟦S0400⟧ no pinning; the finished house and the full list |
| Site | background law | White ground; the stage is `data-solid` |

## Reference transfers and non-transfers (Apple AirPods Pro)

**Transferred:**
- the pinned stage where the product assembles as you scroll;
- each figure landing as an event on its own beat.

**Not transferred:**
- Apple's product renders, video scrubs and scroll hijacking (none: native scroll);
- Services C's counted chapters;
- Area M's map.

## Comparison with the section's previous best (Services M, "One frame, every trade", 8.63)

- **M is stronger on:** real photographs of each trade's work, and the continuous morph.
- **N is stronger on:** the whole picture. Nine trades add up to one finished house, which is the firm's promise ("every trade on the house").

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A clean drawn elevation assembling beside a giant rolling count (`-1440-01` → `-1440-096`); quiet chips; a finished house as the payoff. **Minus:** a drawing, not a photograph |
| Usability (30) | **8.4** | Native scroll with chip and button shortcuts; polite announcements; reduced motion lists everything; 0 errors in 123 views. **Minus:** 260 vh of scroll; a second pinned section if paired with Area M |
| Creativity (20) | **8.6** | No Services version assembles the house trade by trade as you scroll |
| Content (10) | **8.7** | The published counts, bands and timelines, locks verbatim, never summed; the closing line is the page's own words. **Minus:** build order follows the counts, not a crew's sequence |
| **Weighted** | **8.55** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.4 + 0.2 × 8.6 + 0.1 × 8.7 = 3.44 + 2.52 + 1.72 + 0.87 = **8.55**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; nothing game-like.
- White ground; brand accents only; normal fonts.
- No invented imagery or numbers.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Visualiser N until Muse accepts.
