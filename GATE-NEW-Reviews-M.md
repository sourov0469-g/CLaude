# GATE-NEW — Reviews M, "Their before, their after"

**Under:** AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04. Pass 3, section 5 (Hero, Services, Visualiser and Windows M accepted by Muse). It inherits the button system. Nothing game-like and no configurator.

## Plan line (written before building)

| Field | Plan |
|---|---|
| Version | **Reviews M, "Their before, their after"** (`?reviews=m`) |
| Primary reference (annex v3, one) | **MERSI**: the infinite split-slider, its two halves moving in opposite directions, with a central label cycling in sync (the split-cover system confirmed live 2026-11-03). The annex names MERSI's seam as the source for any before/after mechanism. No Reviews version has used MERSI: C and J used Apple, D, E and H Cowboy, F Lando Norris, G Lusion, I Dropbox, K Graza, L Scout; A and B name none. Cash App's colour fields are scoped to siding colours, Quiet Cubes to the visualiser, Rimowa to the configurator, Bruno Simon to the map. |
| Signature creative move | **Each review split at its own seam.** Twelve of the 30 published Google reviews describe both what the homeowner had (old siding, a storm, pressure from other contractors) and how it ended. The section is MERSI's split cover. The left half holds *before* in the homeowner's words; the right half holds *after*, from the same review. The two halves slide in opposite directions, so each before always meets its own after at the seam, where a label rolls to the reviewer's name in sync. "Read the whole review" opens the full text, so no excerpt stands without its context. |
| Style family | A two-field split cover: stone-grey *before*, deep-green *after*, large type, one seam with a cycling name label |
| Content | Twelve reviews from the 30 published Google reviews (`reviews.json`). Each half is an exact excerpt, checked verbatim at build time like every other review quote on the site: Kimmy Voigt, Pat Mehaffy, Jude Rosenstock, Ray Cole, Rick Bodamer, Jesus Armando Ochoa Rodriguez, Ken Weigand, Bryan Williams, Joe Liu, Michael Spake, David McPherson, Bryce Martin. The locked "4.9 from 474 Google reviews" heads the section. Nothing is paraphrased. No stars are drawn per review (the per-review rating is not in the record). |
| How it differs from every existing Reviews version | A sets 4.9 in lap courses. B hangs tags. C reads at reading pace. D asks the neighbours. E counts staff names. F lists all 30 with search. G streams lines. H stacks letters. I sets one line poster-size. J marks 474 against 30. K highlights themes across a printed page. L orders sentences by job stage. None pairs a homeowner's before with their own after, and none uses a split cover. |
| Why it is better | Reviews persuade best when they describe change, and here every pair is one person's change in their own words, side by side, nothing in between. The current best (Reviews K, "Marked up by hand", 8.58) shows what people praise; M shows what changed for them. |
| Pairing note (F17) | Hero K and Windows L also use MERSI's seam. If the owner picks Reviews M with either, the page carries two seams; pick one. |

### Skill ledger (planned, per element)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant element (the split cover); ⟦S0220⟧ verbatim excerpts only, the full review one click away |
| Split halves | ⟦S1436⟧ two tracks moving in opposite directions, 0.9 s `cubic-bezier(.65,0,.35,1)`, wrapping without a jump (clone slides); on phones the halves stack and slide sideways in opposite directions |
| Seam label | MERSI's synced label: the reviewer's name rolls in step with the halves; `aria-hidden` (the name is also in the text) |
| Previous / Next | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px; the button system (hover, press, spring, ring); ← → keys on the region |
| Auto-advance and Pause | ⟦S1315⟧ advance every 7 s only while in view and not hovered or focused; a visible Pause / Play toggle (`aria-pressed`) for WCAG 2.2.2; off under reduced motion |
| Live region | ⟦S1440⟧ `aria-live="polite"` on manual steps only: "Before: … After: … Pat Mehaffy, Google review." |
| Read the whole review | ⟦S0054⟧ a disclosure button (`aria-expanded`) opening the full text below the cover |
| Counter | "4 of 12", plain type |
| CTA | ⟦S1435⟧ the one filled "Book a free inspection" |
| Reduced motion | ⟦S0400⟧ no slide and no auto-advance: halves change at once |
| Background law | White ground around the cover; the cover and controls are `data-solid` |

---

## Build log

**How to view:** `?reviews=m` (switcher: Reviews, **M "Their before, their after"**).

**Files:**
- `src/sec/rev8.js` (`Rev8.M`, `Rev8.wire`, `Rev8.PAIRS`, `Rev8.PICK`) and `src/sec/rev8.css` (class prefix `rm` under `.rvM`; the collision check found no shared names).
- `build_site.py`: the module added to `MODS`, pre-rendered as `rm`, wired, given the `reviews` slot letter `m`, and listed in the switcher. `Rev8.PICK` (all 24 halves) is added to the build's existing verbatim lock, so the build fails if any excerpt stops being an exact substring of its review. Nothing else changed.
- The file grows by **21,830 bytes**; no images.

**The twelve pairs** (each half an exact excerpt of the same published Google review, 2026):

| # | Reviewer | Before | After |
|---|---|---|---|
| 1 | Pat Mehaffy | "I hired Austin Pro to redo my house's 80s era masonite siding with Hardie Board." | "They gave a great quote and did phenomenal work." |
| 2 | Ray Cole | "After contacting other businesses and getting high-pressure sales tactics with zero details in their estimates, we reached out to Austin Pro." | "There was no pressure." |
| 3 | Kimmy Voigt | "I wish I would've replaced my roof years ago instead of doing more damage waiting." | "Such a relief having it done." |
| 4 | Jude Rosenstock | "We lost some shingles in one of the bigger storms that passed through" | "Austin Pro was able to fix everything WITHIN DAYS and it mattered because another big storm came through two days later!" |
| 5 | David McPherson | "We finally got around to having our old original siding replaced" | "Austin Pro was definitely the right choice for the work." |
| 6 | Jesus Armando Ochoa Rodriguez | "the replacement of the original 1984 siding was very labor intensive because of the way it was installed, and we were not in Austin." | "They kept the communication open the whole time and I was truly impressed by the professionalism and attention to details with this job." |
| 7 | Ken Weigand | "They ripped off the old roof" | "and put on a new one in one day. The site was clean when they left and the new roof looks great." |
| 8 | Joe Liu | "Replacing siding is a huge investment" | "but Austin Pro made it seamless." |
| 9 | Bryan Williams | "One right after a major hailstorm where insurance replaced all windows on front" | "Very professional staff, easy process and work was completed on schedule." |
| 10 | Rick Bodamer | "Austin Pro replaced our old, damaged siding in several places on our house and painted our entire house." | "All I can say is their service and work is impeccable!" |
| 11 | Michael Spake | "as I was closing on a new home" | "Very detailed and sent me photos immediately to reassure me that everything was in great condition." |
| 12 | Bryce Martin | "I had several windows replaced and all of my siding as well as a portion of my house demoed so I could add to the house." | "There crews were professional and they kept the job site clean each day after working." |

Spelling and capitals are the reviewers' own ("WITHIN DAYS", "There crews").

**The split cover (MERSI):**
- Two halves: stone-grey *Before* (`#ECE8E0`) and deep-green *After*.
- Each half holds a track of the twelve excerpts. The before track runs 1 → 12; the after track runs in reverse, so a step moves the two halves in opposite directions (up and down on desktop, left and right on phones) and the pair always meets at the seam. 0.9 s `cubic-bezier(.65,0,.35,1)`.
- One clone slide per track lets 12 → 1 and 1 → 12 wrap without a jump.
- Text fades at each half's leading and trailing edges, so moving excerpts never cross the Before / After tags.

**The seam label:**
- A white pill on the seam rolls to the reviewer's name in step with the halves (MERSI's synced label), and its width eases to fit each name.
- Its position: middle of the seam on desktop, foot of the seam on tablets, the horizontal seam on phones.

**Controls:**
- ← / → buttons (48 px), "1 of 12", Pause / Play (`aria-pressed`), and "Read the whole review", a disclosure that opens the full published text.
- ← → keys on the cover (focusable `role="group"`, `aria-roledescription="carousel"`); a sideways swipe on touch.
- **Auto-advance:** every 7 s, only while the cover is in view and nothing is hovered or focused inside the section; Pause stops it. Under reduced motion there is no auto-advance and no Pause button.
- **Announcements:** manual steps announce "Before: … After: … Name, Google review, 2026." politely. Auto-advance is silent.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-reviews-m-1440-0`;
- `-1440-slide`: 430 ms into a step, the halves moving in opposite directions;
- `-1440-full`: the whole review open;
- `-1440-1`, `-768-0`, `-768-1`, `-390-0`, `-390-1`;
- `-390-swipe`: after a sideways swipe on a phone;
- contact sheet `new-reviews-m.jpg`.

Section QA ran on `?bg=none`; the background has its own accepted gate.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids; buttons 48 px tall |
| Verbatim | All 24 halves exact substrings of their reviews (build lock and a separate check) |
| Pairs always aligned | Forward ×13 (1 → 12 and across the wrap to 1, 2): before and after from the same review at every stop, and the seam name matches the reviewer line. Backward across the wrap (2 → 1 → 12 → 11): aligned |
| Label never covers text | For all 12 pairs at 1440, 1100, 768 and 390: no line of either excerpt intersects the seam label, and every name fits its pill |
| Text fits | 0 slides whose text overflows its half, at all three widths |
| Keyboard | → and ← on the focused cover step and wrap (12 ↔ 1); the polite region carries the pair |
| Whole review | Opens the exact full text of the current review; `aria-expanded` true |
| Auto-advance / Pause | 12 → 1 after 7.6 s with nothing hovered; with Pause pressed, 1 → 1 after 7.8 s (button reads "Play", `aria-pressed` true) |
| Phone swipe (390) | Right-to-left swipe → 2 of 12, aligned |
| Reduced motion | Steps change at once; no auto-advance (12 → 12 after 7.6 s); the Pause button is hidden |
| All homepage version views (117) | 0 page errors and 0 overflow in every one |
| Existing versions | The 188 existing slot templates are byte-identical; one template added (`reviews:m`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Reviews stays B); subpages untouched |
| Locks | "4.9 from 474 Google reviews" and "(512) 550-0000" verbatim |

## Defects found and fixed

1. **Two excerpts failed the verbatim check:** typographic apostrophes where the reviews use straight ones. Corrected; the build lock now guards all 24 halves.
2. **One pair didn't stand on its own.** Charles Statler's single sentence split into a before ("than it was when they got here.") that meant nothing alone. It was replaced with Bryce Martin's review, which has a real before and after.
3. **Moving text crossed the Before / After tags** mid-slide. Each half now fades at its leading and trailing edges.
4. **The seam label covered the text.**
   - At 768 and 1100, and for the longest name at desktop, the label sat over the start of the after text.
   - At 768 it also collapsed to a 36 px circle: a zero-width flex parent with `min-width: 0`.
   - Fixed with `flex: none`, a pill sized to each name, wider seam padding, and the label at the foot of the seam on tablets.
   - Measured afterwards: no overlap for any pair at four widths.

## Remaining defects, named honestly

- **These are excerpts.** Each half is exact, but choosing which sentences are "before" and which "after" is my editorial cut. "Read the whole review" gives the full context in one click.
- **Some halves are fragments** (Michael Spake's "as I was closing on a new home"; Ken Weigand's after begins "and put on…"). They are exact, but they read as fragments.
- **Twelve of 30 reviews.** Only these twelve tell both halves; the rest are not shown here (Reviews F lists all 30).
- **Auto-advance exists,** paused on hover and focus with a Pause control (WCAG 2.2.2). Some owners prefer none; it is one constant to switch off.
- **Two seams if combined.** Hero K and Windows L also use MERSI's seam; if the owner picks one of them with Reviews M, the page carries two.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Reviews M | ⟦S1434⟧ the split cover dominates; ⟦S0220⟧ verbatim excerpts only, locked at build, the full review one click away |
| Motion | split halves | ⟦S1436⟧ opposite-direction tracks, 0.9 s ease in-out, clone wrap, edge fades; on phones the halves stack and slide sideways |
| Element | seam label | MERSI's synced label: the name rolls with the halves; the pill eases to the name's width; `aria-hidden` (the name is also in the reviewer line) |
| Element | ← / → | ⟦S0054⟧ named buttons; ⟦S1441⟧ 48 px; button system: hover, press, spring, ring; ← → keys on the cover |
| Element | Pause / Play | ⟦S1315⟧ auto-advance only in view and unhovered; `aria-pressed` toggle (WCAG 2.2.2); hidden under reduced motion |
| Element | live region | ⟦S1440⟧ polite, on manual steps only |
| Element | Read the whole review | ⟦S0054⟧ disclosure with `aria-expanded` and `aria-controls` |
| Element | Book a free inspection | ⟦S1435⟧ the one filled button |
| Site | phone | Stacked halves, horizontal seam, sideways swipe; ⟦S1443⟧ gesture with button and key alternatives |
| Site | reduced motion | ⟦S0400⟧ instant steps, no auto-advance |
| Site | background law | White ground around the cover; cover and controls are `data-solid` |

## Reference transfers and non-transfers (MERSI)

**Transferred:**
- the split cover with two halves moving in opposite directions;
- the central label cycling in sync;
- the infinite loop (clone wrap);
- the seam as the before/after mechanism, as the annex directs.

**Not transferred:**
- MERSI's imagery, type and colour;
- its hero placement;
- Windows L's sash motion and Hero K's wipes (both also from the seam).

## Comparison with the section's previous best (Reviews K, "Marked up by hand", 8.58)

- **K is stronger on:** breadth. All 30 reviews on one page, with every theme highlighted.
- **M is stronger on:** the persuasive core of a review. One person's change, told in their own words, before against after, at a size that is read rather than scanned.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.7** | A bold two-field cover, large type, one seam and a single synced label (`-1440-0`); the opposite-direction motion reads as one gesture (`-1440-slide`); clean at every width after the label fixes. **Minus:** no photography; type carries everything |
| Usability (30) | **8.4** | Buttons, keys and swipe; Pause for auto-advance; full review on demand; pairs always aligned (measured); polite announcements; reduced motion; 0 errors in 117 views. **Minus:** auto-advance at all, and fragments that need the full review for context |
| Creativity (20) | **8.8** | No Reviews version pairs each homeowner's before with their own after, or splits a review at a seam |
| Content (10) | **8.7** | Twelve real reviews, every half verbatim and build-locked, with the full text one click away; the locked 4.9 / 474 line. **Minus:** the before/after cut is editorial |
| **Weighted** | **8.63** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.7 + 0.3 × 8.4 + 0.2 × 8.8 + 0.1 × 8.7 = 3.48 + 2.52 + 1.76 + 0.87 = **8.63**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; no game.
- White ground; brand accents only; normal fonts.
- Real reviews only, exact.
- Defaults unchanged; no sub-agents or background tasks.

**Status:** built, gated and committed. **Stopped for Muse's accept.** I will not start Process M until Muse accepts.
