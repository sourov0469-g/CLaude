# GATE — Hero O, "The house, and the homeowner's word" (upgrade plan H-A)

**Under:** AUSTIN-UPGRADE-PLAN-2026-11-05 (passed by Muse; build order: weight pass, then Hero), AUSTIN-CONSULT-FIRST, and Muse's binding consult reply on Hero H-A.

**Consult reply, as applied:**
1. **Photo #5**, Anderson Mill West, Cedar Park, Aug 2026 (Windows, Exterior Painting & Siding).
2. **"4.9 from 474 Google reviews" lives in Reviews only.** The hero carries the credentials and the quote. The stars line was removed from the hero (the shared CTA block carries it; this version strips it).
3. **The existing H1 and subline are unchanged**, letter for letter.

**Sub-agent use, stated honestly:** this hero was built, tested and gated entirely by this session; **no sub-agent touched it.** The only sub-agent work in this session so far is the two prep agents (Services S-A tile selection and Visualiser V-A masks), which finished earlier, wrote only under `siding/redo/prep/`, and have not been used in this build.

## Result

**`?hero=o` is now the shown default** (`LIVE hero = 'o'`). Hero 1, the version the switcher labelled "backup, rejected photo", is parked as a hidden in-file backup like the other 17 (nothing deleted). **Hero K is retired from default consideration** (it was never the default; its before/after seam stays as a hidden backup).

**What it is:** one real, sharp Austin Pro job photo with two cards on a second depth.
- **Photo:** the job's own photograph (1400 × 1050), shown at most 1347 CSS px wide at 1440 (never above its own 1400), captioned only with that job's record: "Anderson Mill West, Cedar Park · Aug 2026 · Windows, Exterior Painting & Siding · See the project" (links to the project page).
- **Headline card (bottom left):** the page's own H1 "The full wall or the whole house.", the unchanged subline, the one filled "Book a free inspection", the phone (512) 550-0000, and the three credentials: GAF Master Elite · James Hardie Elite Preferred · Andersen Certified Premier.
- **A homeowner's words (top right):** "Wow what a difference our new windows have made, our home is so QUIET!", Lois Richwine · Google review, 2026. It is labelled "A homeowner's words" and is never presented as the owner of the house in the photo. The phrase is checked verbatim against review 17 at build time (the build fails if it stops matching).
- **Live unit (fine pointer only):** the photo drifts up to 8 px against the pointer while both cards tilt up to 3° on a second depth; a soft light band crosses the photo once on load and then follows the pointer faintly. Transform and opacity only. **Touch:** the one-time sweep only. **Reduced motion:** nothing moves.
- **Phone and tablet:** the photo first (5:4 on phones, 4:3 on tablets), then the headline card overlapping its foot, the homeowner's words, and the job's record.

**Files:** `src/hero8.js` (`Hero8.wire`), `src/hero8.css` (class prefix `hz`), `heroO()` in `build_site.py`. `weight.py` gained one rule (below). Nothing else changed.

**Weight:** +209,903 bytes: **12,861,428 → 13,071,331** (ceiling 22.5 million; target ≤ 14.5 million). The 1400-px photo is the new master, and the weight pass's same-photo merge folded the smaller copies of this job photo into it, so the net is about the size of the code and one master.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`): `new-hero-o-1440-0`, `-1440-tilt` (pointer at the right, cards tilted), `-1440-focus` (focus ring on "See the project"), `-1024-0`, `-768-0`, `-390-0`, `-390-1`; sheets `new-hero-o-1440-sheet.jpg` (rest and tilted side by side) and `new-hero-o-small-sheet.jpg` (390 both screens, 768, 1024).

| Check | Result |
|---|---|
| H1 and subline | Equal to the page's own strings, character for character, at all four widths; exactly one h1 on the page |
| Locks in the hero | (512) 550-0000 as a `tel:` link; one Book link to the firm's booking page; the three credentials; the quote equals the published phrase; caption equals the photo's record (place, month, trades) |
| "Each number once" | The hero text contains none of 431, 388, 886, 474, 177, 415, 4.9, 241, 210, 312, 574; no stars line |
| The photo | 1400 px natural width; rendered 1347 / 966 / 732 / 385 px wide at 1440 / 1024 / 768 / 390, never above its own pixels; real alt text |
| Height | 0.97 screens at 1440, 0.99 at 1024, 1.07 at 768, **1.23 at 390** (the first phone layout was 1.32, over the 1.3 rule; fixed, below) |
| Page errors and overflow | 0 errors at all widths; nothing in the hero passes the viewport; the page's 17 px at 1024 is the pre-existing default Services A (flagged since Windows N) |
| Live unit | At rest: no transform. Pointer right: photo −7.8 px, cards +2.9°, light band on. Pointer left: +6.2 px, −2.3°. Pointer leaves: back to 0 within 0.7 s, band off. Touch: sweep class only, no pointer effect. Reduced motion: no sweep, light band hidden, card `transform: none` |
| Keyboard | Tab order: logo, nav, header phone, Book, phone, "See the project"; solid 3 px lime focus ring |
| Contrast (WCAG ratio) | Headline 17.6 · subline 8.9 · label 12.5 · quote 17.6 · reviewer line 6.1 · credentials 8.0 · caption 8.9 · caption link 12.5 (all ≥ 4.5; the smallest text is 6.1) |
| Switcher | Row "Hero" lists "O · The house, and the homeowner's word" as current; "1 · Charcoal photo…" is no longer current; 19 hero entries |
| All views | **256 views** (every homepage version of every section, plus every subpage and subpage version): 0 page errors, 0 overflow, 0 unresolved images; the one flag is hero L's 8 intentionally empty `lim` images, identical before this change |
| Existing versions | Against the last committed page, with images blanked: **199 templates vs 198, with only `hero:1` added** (the old default, now a hidden backup) and **0 templates changed**; the body outside the hero slot (templates, styles and scripts excluded) is identical |

## Defects found and fixed

1. **The floating header covered the top of the photo,** hiding the quote's label. The hero now clears it (100 px on desktop, 82 px on phones).
2. **The credentials collided with the caption.** Three pills wrapped into the caption at the foot. They moved inside the headline card.
3. **The caption wrapped awkwardly** ("See the project" alone on a second line). On wide screens it stays on one line.
4. **Tablet: the photo was square and the button full width.** At 768 the photo is 4:3 and the button keeps its own width.
5. **Phone height 1.32 screens, over the 1.3 rule.** The phone photo is 5:4 (was square): now 1.23.
6. **The weight pass would have degraded the hero photo.** Its "heavy image" rule re-encodes large images at q58. The hero photo carries `data-q="keep"`, which the pass now honours; it is also preferred as the master when merging copies of the same photo, so the sharpest copy wins. A regex slip in that rule (a doubled backslash that could never match) was caught by a unit test before the build.
7. **Test script:** my switcher check ran before the switcher builds itself; fixed to wait. (A test fix, not a product change.)

## Remaining, named honestly

- **The two cards cover part of the photo.** The headline card hides the lower-left first-floor windows, so the visible work is mostly the upper row and the right-hand glazing. That is the price of putting the page's words on the photo; the alternative (a split layout) would shrink the photo.
- **The live unit is deliberately modest.** A subtle depth tilt, a drift and one light sweep: it adds life without competing with a single real photograph. If Muse wants more, that is a design decision, not a defect.
- **It is a back-of-house photo with a lawn and no people.** No people photography exists for Austin Pro and none was invented.
- **Wide screens:** the photo is capped at its own 1400 px, so above about 1480 px wide the frame stops growing and the margins widen. That is the "never upscaled" rule at work.
- **Page rules are not yet met** (this is one section of nine; see the baseline below).
- **Testing:** Chromium only.

**Page-rule baseline after this gate** (default page; targets from the consult reply):

| Rule | Target | Now |
|---|---|---|
| Section height | ≤ 1.3 screens | **Hero 1.0 / 1.23** ✓ (Services A 3.3, Process A 4.1, Try A 5.2 still over) |
| Page length at 1440 | ≤ 10 screens | 19.2 |
| Pinned sections | ≤ 1 | 3 (Services A, Process A, Try A) |
| Book buttons | ≤ 6 | 11 (8 in the page body; the rest are the header and mobile bar) |
| Each number once | | Hero ✓; 431 ×2, 388 ×3, 4.9 ×3, 474 ×2 across the other default sections |

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Hero O | ⟦S1434⟧ one dominant subject (the photo); ⟦S1454⟧ serial position: the first screen carries the offer, trust and the one action; ⟦S0220⟧ published words, photo and caption only |
| Element | photo | ⟦S0985⟧ critical-images: 1400-px master, never enlarged, `fetchpriority="high"`, explicit width and height; ⟦S0956⟧ real alt text |
| Element | headline card | The page's own H1, subline and one filled button: ⟦S1435⟧; ⟦S1441⟧ 48 px targets |
| Element | the homeowner's words | ⟦S1494⟧ plainly labelled as a homeowner's, never tied to the house in the photo |
| Motion | live unit | ⟦S1436⟧ and ⟦S0060⟧: depth drift and tilt eased (0.14 per frame); ⟦S0062⟧ transform and opacity only, one rAF; ⟦S0400⟧ reduced motion fully static; touch: sweep only |
| Site | contrast | WCAG ratios measured on the rendered colours |
| Site | locks | Hero text checked against the page's own strings and the published review |

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.5** | One real, sharp, well-composed photo; two calm cards; a clear order (photo, offer, voice) (`-1440-0`, `-small-sheet`). **Minus:** the cards hide part of the work; the layout (photo with cards) is a familiar form |
| Usability (30) | **8.7** | The offer, the action, the phone and the trust marks in one screen; keyboard and contrast verified; touch and reduced motion handled; 256 views clean. **Minus:** the phone version is 1.23 screens, not 1.0 |
| Creativity (20) | **8.0** | Restraint as the idea (Cowboy), with a small depth unit; nothing gimmicky. **Minus:** the live unit is subtle and the layout is not new |
| Content (10) | **9.0** | Every word the firm's or a published review; locks exact; nothing repeated from elsewhere on the page. **Minus:** none found |
| **Weighted** | **8.51** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.5 + 0.3 × 8.7 + 0.2 × 8.0 + 0.1 × 9.0 = 3.40 + 2.61 + 1.60 + 0.90 = **8.51**.

**On the score:** it sits level with Hero N (8.67), not above it. As the upgrade plan said, these self-scores do not predict the owner's eye, so I am not claiming a win on the number. The case for H-A is what the first screen does: it replaces a labelled "rejected" default with one real job and one real homeowner's word, and it puts trust and booking in one screen.

**Vetoes: none.** Locks verbatim; no form; not a configurator; white ground; no background system; nothing game-like.

---

## NEXT PLAN — Booking B-A "The open door", for Muse's consult

Under the consult-first order and the upgrade plan Muse passed (B-A agreed; build order: Booking second). Nothing below is built.

### AUDIT — the Booking section now

- **The shown default is Booking A, "Work order":** a work-order card with checkboxes ("Tick what the house needs and when suits you"), a "Nothing ticked yet" line, a Book button and the phone, with a closing line "Nothing is sent from this page."
  - It is 1.0 screen tall, but it reads as a form, and nothing is submitted: the only action is the link to the firm's booking page.
  - That is a confusing close: a form that is not a form.
- **The 13 versions** (full audit in the upgrade plan, section 2.9; sheet `gate/upgrade-audit-book.jpg`):
  - none uses a photograph;
  - several are thin (B, D, K);
  - C is 4.6 screens;
  - L, the best at 8.63, lists the 12 locked facts as a poster wall over 2.8 screens, which now **repeats numbers that the page's other sections carry** and works against the "each number once" rule;
  - the footer already carries the address, hours and email.
- **What works today:** the office-hours state ("Closed now. Opens 8 am today (Austin time)") is computed correctly in Austin time (`cta.js`, `status()`), and several versions show it.
- **The problem B-A must solve:** end the page the way a homeowner decides to act: one sentence, one action, and a visible sign that the office is there, with no form-like furniture and no repeated numbers.

### RESEARCH — reference and mechanism

- **Governing reference: Dropbox Brand** (annex v3): the subtraction-discipline closing. **Settled 2026-11-03** in the annex: CSSDA Website of the Year 2025 winner, used freely. No Booking version has used Dropbox except D and L (annex ledger), so this is a repeat, named openly; it is the right reference for a close.
- **Transfers:** subtraction as discipline: one sentence set large, one action, a flat block of colour, nothing else on the stage; type as the interface.
- **Does not transfer:** Dropbox's colours, type, imagery or copy.
- **WEB-SKILLS:** ⟦S1452⟧ peak-end-rule · ⟦S1454⟧ serial-position-effect · ⟦S1435⟧ von-restorff · ⟦S1441⟧ fitts-law · ⟦S1494⟧ ux-writing · ⟦S0220⟧ anti-slop-design · ⟦S1436⟧ animation-principles · ⟦S0400⟧ accessible-animation · ⟦S1440⟧ feedback-patterns.

### THE PLAN — B-A

| Element | What will be built | Source (verbatim) |
|---|---|---|
| **The sentence** | The close's one line, set large | "One free inspection covers every trade on the house." |
| **The action** | One filled "Book a free inspection", large (the biggest target on the page; full width on phones), linking to the firm's booking page. Beside it the phone, tap-to-call and set large | (512) 550-0000 |
| **The door sign (live unit)** | A hanging OPEN / CLOSED sign on a flat green block: the current state in Austin time, computed with the existing `status()` logic. A short line beside it: "Open now, until 8 pm Austin time" or "Closed now. Opens 8 am today (Austin time)". On first view the sign swings once from its hook (a small 3D rotation on this one element) and settles; when the state changes it flips. State-driven only: nothing the visitor can set, no fake status | hours from `HOURS` |
| **The hours** | One line | Mon–Fri 8–8, Sat 8–6, Sun 12–5 |
| **No form** | No checkboxes, no fields, no "saved" or "sent" claim. A single quiet line: "Booking happens on our scheduling page." (my wording, the plainest accurate statement of what the button does) | |
| **Phone** | Stacked: sentence, sign, button, phone, hours; the Book button sits above the mobile bar's reach | |
| **Reduced motion** | The sign is drawn in its current state, no swing | |
| **Weight** | ≤ 12 KB code; no images | |
| **Page rules** | ≤ 1.0 screen; exactly one Book button in the section; no number except the phone and the hours (both locks) | |
| **Retire** | Booking A stops being the default (hidden backup, like the other 12) | |

**Why it should beat the current best (L, 8.63):** L lists everything over 2.8 screens, and the page's other sections now carry those same numbers. B-A ends the page on one action in under one screen, and it replaces a form that is not a form.

### Decisions for Muse (the consult reply)

1. **Address and email:** the plan said "the address and email, once". The footer already carries them (and the hours). **Recommendation:** B-A does not repeat the address or email; the footer keeps them as the one place. The alternative is to put them in B-A and trim the footer, which changes a global piece.
2. **The hours line:** the footer also carries the hours. **Recommendation:** B-A carries the hours (the sign needs them) and the footer keeps its own, since a footer's hours are expected there; otherwise the hours repeat. Say if you want the footer's trimmed.
3. **The section headline.** Options: (a) the firm's sentence itself as the H2 ("One free inspection covers every trade on the house."), **my recommendation**, with no invented copy; or (b) a short line in the homeowner's voice (my wording, for example "Ready when you are."), which meets the plan's headline-voice rule but is copy the firm has not published.
4. **The "Booking happens on our scheduling page." line:** keep it, or drop it as unneeded?
