# GATE-NEW — Process N, "Watch it happen"

**Under:**
- AUSTIN-NEW-VERSIONS-ADDENDUM-2026-11-04, pass 4, section 6;
- AUSTIN-CONSULT-FIRST-2026-11-05;
- AUSTIN-BACKGROUND-REMOVAL-2026-11-05: the section carries its own creative unit; no global background.

**Built to the plan agreed in Muse's consult reply** on GATE-BACKGROUND-REMOVAL.md (NEXT PLAN):
- Graza confirmed as the governing reference; MERSI stays out.
- "Watch it happen" approved as planned.
- Two notes carried here: Scene 3 must stay visibly distinct from Process B's pinned wall, and this gate states plainly that the scenes are drawn, not photographs.

**Working method:** the owner's order is NO sub-agents and NO background tasks. Every part of this version (plan, build, tests, screenshots, gate) was done by this session alone, in its own thread.

## Plan line (agreed before building)

| Field | Plan |
|---|---|
| Version | **Process N, "Watch it happen"** (`?process=n`) |
| Primary reference (annex v3, one) | **Graza**, scoped in the annex to the custom-animation quality bar: small hand-made animations with timing and personality (anticipation, overshoot, staggered settle), one idea per frame, motion that explains, playable on demand, calm at rest. Confirmed by Muse. MERSI is out (already on five sections). |
| Signature creative move | **Each published step, played as a small hand-made scene.** Four tabs; each plays a drawn SVG scene that pictures that step's published sentence literally: a marker walks every side of the house; the proposal prints only the work you want; you scrub the wall from old boards to paint; the punch list ticks, the deck is swept and the warranties start. |
| Style family | A small animated storyboard beside the firm's own sentences |
| Content | The four step sentences as the firm publishes them, verbatim (the same strings Process M uses). The siding FAQ's timing line. Four review phrases, verbatim and build-locked. The locks "$10k–$15k median band (415 priced)", "30-year James Hardie non-prorated warranty", "Mon–Fri 8–8, Sat 8–6, Sun 12–5" and (512) 550-0000. **The scenes are drawn illustrations, not photographs of a real job**, and the section says so. |
| How it differs | B pins a wall across 4.2 screens of scroll; N's install scene is one scrubbed unit inside a tab, under one screen. C, D, E and H share a static house icon; N has a bespoke scene per step. L proves one real job with photos; N shows any homeowner what each step physically looks like. |
| Why it is better | It answers the four unknowns that make homeowners hesitate (someone walking round the house, what the proposal holds, what install does to the wall, how the job ends) in the firm's own sentences, with a unit they can play. It is also the first Process version built to the owner's new tactic. |

### Skill ledger (planned)

| Element | WEB-SKILLS → use |
|---|---|
| Section | ⟦S1434⟧ one dominant unit; ⟦S0220⟧ published words only, drawn scenes declared |
| Tabs | ⟦S0054⟧ `tablist`, roving tabindex, arrows and Home / End; ⟦S1441⟧ 48 px |
| Scenes | ⟦S1436⟧ purposeful motion: transform, opacity and stroke only, timed to the meaning; plays once on first view, then on demand |
| Install scrubber | ⟦S0054⟧ `role="slider"` 0–100 with the phase as `aria-valuetext`; drag, keys, Play; ⟦S1443⟧ keys and Play as the non-drag route |
| Live line | ⟦S1440⟧ polite, manual changes only |
| CTA | ⟦S1435⟧ the one filled Book button, plus the phone |
| Reduced motion | ⟦S0400⟧ every scene shows its end state; the scrubber moves without tweening |
| Weight | All SVG and CSS, no images; under 40 KB |

---

## Build log

**How to view:** `?process=n` (switcher: Process, **N "Watch it happen"**).

**Files:**
- `src/sec/proc9.js` (runtime: `Proc9.wire`, `Proc9.S`, `Proc9.QUOTES`, `Proc9.PH`) and `src/sec/proc9.css` (class prefix `pn` under `.pnN`).
- `src/sec/proc9n.js`: **build time only.** It writes the four drawn SVG scenes and the section markup during pre-render, and is never shipped to the page, so the drawing code is not paid for twice.
- `build_site.py`:
  - the module is added to `MODS`, pre-rendered as `pn`, wired, given the `process` slot letter `n`, and listed in the switcher;
  - `proc9n.js` is joined to the pre-render only;
  - `Proc9.QUOTES` joins the build's verbatim review lock.
  - Nothing else changed.
- **Weight: 37,683 bytes added, under the agreed 40 KB.** No images, no canvas, no WebGL. The install wall's 48 board courses are one drawn course (`#pnC`) reused 48 times.

**The scenes are drawn illustrations of the firm's published steps, not photographs of a real job.** The section says so under the stage ("The scenes are drawn illustrations of our published steps, not photographs of a real job"), and each scene's accessible name begins "Drawn scene:".

**The four scenes** (each a pure function of time, played on demand, finished at rest):

| Step | Scene (Graza: one idea per frame, timing with personality) | Words beside it (verbatim) |
|---|---|---|
| 01 Free inspection | A house seen from above (hip roof, garage, driveway). A neutral marker (a dot with a clipboard glyph, not a person) walks the dashed path round all four sides with an ease-out. As it passes, five tags pop with a small overshoot: Siding, Trim, Windows, Roof, Gutters. It ends on "One visit covers every trade." Tap the house to replay | "A project manager walks every side of the house: siding, trim, windows, roof and gutters. One visit covers every trade." · One visit · Mon–Fri 8–8, Sat 8–6, Sun 12–5 · "They only took 15 minutes to measure and understand the job" (Ray Cole) |
| 02 Detailed proposal | A sheet feeds out of a slot. Five lines print in turn: Siding, Trim and Windows ticked, Roof and Gutters not. The unwanted lines slide off; the wanted ones get their (blank) price bars in lime; the foot reads "the work you want, nothing else". **No prices are drawn** | "An itemised price for the work you want, nothing else." · $10k–$15k median band (415 priced) · "providing a fair and transparent estimate" (Joe Liu) |
| 03 Expert install | A wall round a window, played or **scrubbed** on a slider below it (0–100%): old boards come off top first and fall, the sheathing shows, new boards rise course by course from the bottom, the window trim draws itself round the opening, corner boards rise, and a roller paints across. The phase names sit under the track: Old material off · New boards up · Trim · Paint | "Old material off, new boards up, then trim and paint." · 1 to 2 weeks · "A siding replacement typically takes 1 to 2 weeks, including the painting process." · "getting the job done very quickly" (Sara Helms) |
| 04 Final check | A clipboard: "We walk the finished job with you", "clear the punch list" and "leave the site clean" tick in turn. A broom sweeps the deck and the pollen goes as it passes. The warranty card drops in and is stamped: "Then the warranties start." | "We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start." · 30-year James Hardie non-prorated warranty · Lifetime: "Austin Pro adds a lifetime workmanship warranty on labor." · "swept the pollen off my deck!" (Katie Littleton) |

**Muse's note 1, Scene 3 distinct from Process B:**
- **B:** pins a whole wall across 4.2 screens of page scroll.
- **N:** the install is one scrubbed unit inside its tab, with the page never pinned. The visitor drags a slider under the scene, or uses ← → (±5%), Page Up / Down (±25%), Home / End or "Play the install". The whole section is 1.07 screens tall at 1440.

**Routes and behaviour:**
- **Tabs:** a `tablist` of four; arrows (wrapping), Home and End; 48 px.
- **Play:** "Play again" (48 px) replays the current scene. Scene 1 plays once the first time the section comes into view; after that every scene plays only when asked; no loops.
- **Live line:** polite, on manual changes only ("Step 3 of 4: Expert install").
- **Phone:** tabs in a 2 × 2 grid, the scene above the words, the scrubber full width (`touch-action: pan-y`).
- **Reduced motion:** every scene shows its finished state and stays still; the scrubber moves frame by frame without tweening.

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`):
- `new-process-n-1440-play` (scene 1 mid-walk), `-1440-0` (scene 1 finished), `-1440-1-mid`, `-1440-1`, `-1440-install-a/b/c/d` (scrubbed to 15 / 50 / 72 / 90%), `-1440-3-mid`, `-1440-3`;
- the same set at 1024, 768 and 390, plus `-390-install`;
- contact sheets `new-process-n-1440-sheet.jpg`, `new-process-n-install-sheet.jpg`, `new-process-n-390-sheet.jpg`.

| Check | Result |
|---|---|
| Page at 1440 / 768 / 390 | 0 page errors, 0 overflow, 1 h1, 0 duplicate ids; every control at least 48 px; nothing in the section passes the viewport |
| At 1024 | 0 errors; the section is clean. The page's 17 px is the pre-existing default Services A (flagged since Windows N) |
| Scene 1 | Mid-play (1.3 s): the marker on the back side, 4 of 5 tags up. Finished: all 5 tags and the end line shown, at every width |
| Scene 2 | Rows Siding, Trim, Windows shown with lime bars; Roof and Gutters gone |
| Scene 3, scrubbed (sampled from the rendered pixels) | Home (0%): old boards `#B5AA9A` everywhere. 15%: old boards partly gone ("Old material off"). 50%: bottom courses new `#E6E1D6`, top still sheathing `#CDB98F` ("New boards up"). 72%: all new, trim drawn ("Trim"). 90%: half painted ("Paint"). End: `#4F5F68` painted wall. Keys: ←← → 90, Page Down → 65. Play: 50% at 2.3 s, then 100%. Phone tap at 40%: "New boards up (40%)" |
| Scene 4 | All three ticks drawn, all 24 pollen dots swept, the stamp down |
| Tabs | → from the last wraps to the first; End → 4; Home → 1; scene, words and scrubber follow; live line updates |
| Verbatim | All four step sentences are byte-for-byte Process M's published strings; every fact line is the siding FAQ's own sentence or a lock; all four review phrases are in their reviews (the build lock passes) |
| Locks | "$10k–$15k median band (415 priced)", "30-year James Hardie non-prorated warranty", "Mon–Fri 8–8, Sat 8–6, Sun 12–5", (512) 550-0000, and the "drawn illustrations … not photographs" line all present |
| No images | 0 `img`, `canvas` or `video` in the section |
| Reduced motion | Every scene finished at load; a tab change lands on the finished state at once; 0 errors |
| All homepage version views (127) | 0 page errors and 0 overflow in every one |
| Existing versions | The 197 existing templates are byte-identical; one template added (`process:n`); the page body outside templates, styles and scripts is identical; `LIVE` untouched (Process stays A) |

## Defects found and fixed

1. **Over the weight budget.** The first build added 54,738 bytes, because the drawing code shipped with the page as well as in the pre-rendered markup. The markup moved to a build-only file (`proc9n.js`), and the 48 board courses became one reused drawing. Now 37,683 bytes.
2. **Tab changes did nothing to the scene.** `hidden` is an HTML-only property, so setting it on the SVG scenes was ignored. The scenes now toggle the attribute itself.
3. **An inline comment swallowed live code (again).** A `//` comment added mid-line commented out the updates to the words, the scrubber and the panel: the same mistake as Visualiser N. The test caught it (the scrubber stayed hidden on the install tab). The comment has its own line now, and both files were scanned for any other mid-line comment.
4. **CSS transforms overrode SVG positions.** The tag pills, the stamp and the proposal rows had their SVG `transform` replaced by a CSS transform, which would have thrown them to the origin. Each now animates an inner group, or sets the attribute.
5. **The roof read as an hourglass.** The first hip roof was drawn as two crossing triangles. It is now four faces meeting at a ridge, each in its own shade.
6. **The Windows tag was cut off** at the scene's right edge; it is narrower and moved in.
7. **The driveway led to the front wall.** It now leads to the garage.
8. **The Play button was 44 px** (40 on phones); it is 48 px everywhere now.

## Remaining defects, named honestly

- **The scenes are drawn, not photographed.** This is stated on the page and here. Process L remains the version with real job evidence.
- **The proposal scene is illustrative:** its ticked trades are an example, not a quote, and it draws no prices.
- **Phone legibility:** the scene-1 tags scale down with the drawing to about 9 px text at 390. They are pictorial, and the same five words sit in the sentence beside the scene.
- **Pairing:** Graza also governs Process C and E. With the background gone, Process N is the lively unit on this section.
- **Testing:** Chromium only.

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Process N | ⟦S1434⟧ one dominant unit; ⟦S0220⟧ published words only, scenes declared as drawn |
| Element | tabs | ⟦S0054⟧ tablist, roving tabindex, arrows wrap, Home / End; ⟦S1441⟧ 48 px |
| Motion | scenes | ⟦S1436⟧ transform, opacity and stroke only; ease-out walks, overshoot pops, staggered prints, a gravity drop for old boards; one play on first view, then on demand |
| Element | install scrubber | ⟦S0054⟧ slider 0–100 with the phase in `aria-valuetext`; ⟦S1443⟧ keys and "Play the install" as the non-drag route |
| Element | words | Verbatim step sentence, facts and a review phrase, build-locked |
| Element | live line | ⟦S1440⟧ polite, manual changes only |
| Element | CTA | ⟦S1435⟧ the one filled Book button, plus the phone |
| Site | phone | 2 × 2 tabs, scene above words, full-width scrubber |
| Site | reduced motion | ⟦S0400⟧ finished states; the scrub without tweening |
| Site | weight | build-only markup file; one reused course; 37.7 KB |

## Reference transfers and non-transfers (Graza)

**Transferred:**
- small hand-made animations with timing and personality: the marker's ease-out walk, the tags' overshoot, the sheet feeding from its slot, the old boards falling with a little spin, the stamp's thud;
- one idea per frame;
- playable on demand and calm at rest.

**Not transferred:**
- Graza's product, imagery, colours, typefaces and copy;
- nothing global; no 3D scene.

## Comparison with the section's current best (Process L, "One job, on its calendar", 8.62)

- **L is stronger on:** evidence. Real photos and real dates for one job.
- **N is stronger on:** understanding. Any homeowner can watch, in under a screen, what each step physically looks like at their house, with the firm's own sentences beside it, and play the install themselves.
- **Verdict:** a tie on score. N is the section's first unit built to the owner's new tactic.

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | Four clean, hand-made scenes with real timing; a calm two-column stage (`-1440-0`, install sheet). **Minus:** drawn, not photographed; small tags on phones |
| Usability (30) | **8.6** | Tabs, play, a scrubber with keys, under one screen; nothing pinned; reduced motion finished; 0 errors in 127 views |
| Creativity (20) | **8.7** | The only Process version where you play each step, and scrub the install yourself |
| Content (10) | **8.6** | Every sentence the firm's own, checked against the source; locks exact; no prices drawn. **Minus:** illustrative scenes, not a documented job |
| **Weighted** | **8.62** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.6 + 0.2 × 8.7 + 0.1 × 8.6 = 3.44 + 2.58 + 1.74 + 0.86 = **8.62**.

**Vetoes: none.**
- Locks verbatim; no form.
- Not a configurator; nothing game-like (the scrub moves through time; nothing is chosen).
- White ground; brand accents only; Montserrat / Inter only.
- No invented imagery presented as real, no invented numbers.

---

## NEXT PLAN — Try N, for Muse's consult

Under AUSTIN-CONSULT-FIRST-2026-11-05 and the new tactic: the section carries its own creative unit. Try is the one section where game-like mechanics are allowed. Nothing below has been built.

### AUDIT — the Try section as it stands (13 versions)

**Evidence:** every version captured at 1440 and 390, all 0 errors and 0 overflow (`gate/try-audit-a-g-1440.jpg`, `gate/try-audit-h-m-1440.jpg`).

| Version | What you do | Height at 1440 | Note |
|---|---|---|---|
| A Pinned sideways | four small tasks in a pinned sideways scroll | 5.2 screens | long |
| B Swipe rail | the same four tasks on a rail | 1.0 | |
| C The workbench | the four tasks side by side | 1.7 | |
| D The dive | Lusion's dive (locked to Try D) | 3.4 | |
| E Inspect at dusk | find six faults with a torch | 1.0 | strong idea; drawn |
| F Measure the opening | pull three tapes | 1.1 | thin |
| G Shingle from the eave up | lay courses in order | 0.9 | |
| H Level the window | shim the corners | 1.0 | |
| I Nail it on the studs | timing game | 0.8 | |
| J Name the parts | drag labels | 0.9 | quiz-like |
| K Flash the window | order four pieces, then rain | 1.2 | |
| L Price the job | guess the band on six real jobs | 1.1 | real photos |
| **M Match the house** (best, 8.63) | turn two reels until before meets after | 1.3 | real photos, MERSI seam |

**What the section does well:** A–K teach real trade logic in drawn mini-games; L and M play with the firm's real jobs and published records.

**What it does badly:**
- Ten of 13 are "do one trade task" exercises in the same drawn-wall look (A, B, C, F, G, H, I, J, K).
- Several are thin (F, J).
- None plays with the thing homeowners praise most and fear most: the mess.
  - The reviews' most-mentioned trait is a clean site: **9 of the 30 published reviews** speak to it (Reviews N's own count).
  - "Leave the site clean" is the published last step.

**The problem N must solve:** a short, physical, genuinely fun unit that turns the firm's most-praised trait into play and ends on real words. It must be lighter and faster than the trade drills, and different from all of them.

### RESEARCH — reference, mechanism, transfers

- **Recommended reference: Graza**, the custom-animation quality bar: physical, characterful motion in a small unit.
  - It governed Try C (and now Process N), so this is a repeat for the section; I name it openly.
- **Alternative considered: Ever, verified craft (3D visualisation, an object you turn).**
  - Ever is the only annex reference unused for Try.
  - But its 3D craft is already Booking M's turnable house, and a turnable-object game here would read as a copy of that.
  - Rimowa is configurator-scoped; Bruno Simon is map-scoped; MERSI is on five sections.
  - **Muse to choose.**
- **Mechanism that transfers:** hand-made physics with personality. Debris that skitters and settles with friction; a broom with weight and lag; a satisfying finish; calm when idle.
- **What does not transfer:** Graza's product, imagery, colours, type or copy; no WebGL; no global effect; small depth cues only.
- **WEB-SKILLS:**
  - ⟦S1434⟧ one unit;
  - ⟦S1436⟧ motion that explains (transform and opacity on SVG);
  - ⟦S0054⟧ and ⟦S1443⟧ a non-drag route (keys and "Sweep it for me");
  - ⟦S1441⟧ 48 px;
  - ⟦S1440⟧ polite score;
  - ⟦S0400⟧ reduced motion: no inertia, an instant clear;
  - ⟦S0220⟧ published words only;
  - ⟦S1435⟧ the one filled CTA.

### THE PLAN — Try N, "Leave it clean" (working name)

| Element | What will be built | Source (verbatim) |
|---|---|---|
| **The deck** | A drawn back deck after the work (SVG, about 640 × 360), scattered with about 70 bits: pollen, leaves and a few wood offcuts. Drawn, declared as a drawing | |
| **The broom** | It follows the pointer or finger with a slight lag and lean. Its head pushes any bit it touches in the stroke's direction, with friction; bits pushed off the deck's edge are gone. A "% clean" meter fills as they go | |
| **Non-drag routes** | Arrow keys move the broom, and holding Space sweeps. **"Sweep it for me"** plays an automatic sweep. "Start again" re-scatters | |
| **The finish** | At 100%: "Cleaner than it was when they got here?", then the verbatim review lines about clean sites cycle with their names, and the count "9 of the 30 reviews we publish speak to it" | the nine "mess" phrases already build-locked for Reviews N; "The house and yard was cleaner when they left than it was when they got here." (Charles Statler) |
| **The real step** | Beside the deck, the published last step | "We walk the finished job with you, clear the punch list and leave the site clean. Then the warranties start." |
| **CTA** | The one filled "Book a free inspection", plus the phone | locks |
| **Phone** | The deck full width. While the deck is touched, `touch-action: none` (sweeping, not scrolling); the deck is under 60% of the screen so the page always scrolls past it; "Sweep it for me" is always there | |
| **Reduced motion** | No inertia: bits under the broom are cleared at once; the finish is a still card | |
| **Weight** | All SVG and JS, no images; under 30 KB; physics only while sweeping, then idle | |

**Honesty rules for the build:**
- The game claims nothing about tools or methods: it is a broom on a deck, from a review's own words.
- The deck is declared a drawing.
- The count and quotes are the published reviews.

**Why it should beat the current best (M, "Match the house", 8.63):**
- M proves results on real houses.
- N makes the firm's most-praised habit something you *feel*, in a 20-second, physical, genuinely playful unit.
- It ends on the homeowners' own words about clean sites, an objection-killer that no Try version touches.
- **What N will not have that M has:** real photographs.
