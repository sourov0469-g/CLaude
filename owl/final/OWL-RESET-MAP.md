# OWL — RESET MAP (2026-11-05)

This merges `OWL-DIAGNOSIS-2026-11-05.md` with Muse's `OWL-RESET-PLAN-2026-11-05.md`, under the owner's full-rights override for tonight. Where the two disagree, the reasoning is in the diagnosis (§7).

**Where it is built:**
- A NEW single page, `owl-reset.html`, built from `owl/final/reset/`.
- The old `owl-roofing.html` and all its versions stay untouched, as records.
- There is one page and one world; no version factory. Each section exists once, and is improved in place until it passes.

## A. Audit of the current homepage: keep, merge or kill

| Current section | Kind it is today | Why it reads as a document | Decision |
|---|---|---|---|
| Hero | A photo or illustration, a slogan and a button pair | A heading block plus buttons, the same frame as every section | **Keep the job, rebuild as film:** section 1 |
| Video | A film in a frame with buttons | A box around a film, then buttons | **Merge** into 1 (arrival) and 3 (the scroll scene scrubs the film) |
| Explore | Roof teaching, then self-check toys | Explains roofing or the offer | **Kill**; its job ("what's wrong with MY roof?") becomes 2 |
| Wise Check | An explainer of four parts | Explains a service | **Kill** as a section; it becomes beat 1 of 3 |
| Protect | An explainer of the wrap, passes and box | Explains a system | **Kill** as a section; it becomes beats 2 and 4–5 of 3 |
| Services | A service list | A list to read | **Kill**; the service is named in 2's answer |
| Reviews | Stars and a count | A badge row | **Merge** into 4 (the numbers as events) |
| Area | A town list or map | A list | **Rebuild** as 6 (explore to find) |
| Family | Two photos and copy | A photo-and-caption block | **Rebuild** as 5 (split cover) |
| Booking | A form | A form block | **Rebuild** as 7 (one big call panel, pre-filled from 2) |

## B. The world: what holds the page together (built first, with the proof section)

- **Sky ground:** the page background is a scroll-linked sky. It runs pale first-light at the top, bright day mid-page, a deep navy dusk band behind the pinned scene and the numbers, and a warm evening at the call. The colours are palette tokens.
  - Reference: Lusion "flow" (source-level only; frames refused by Cloudflare, not bypassed) and Scout's hold on one mood per beat.
  - Mechanism: one fixed full-viewport layer whose gradient stops are interpolated from scroll progress.
- **The owl travels:** the real owl photo cut-out (`owl-wing.webp`) is small and fixed at the edge, and changes pose and position by section (perched, then flying, then perched at the call).
  - Reference mechanism: Graza's drawn character moving *with* the scroll.
- **The call pill:** one persistent pill reading "(651) 977-6027 · Call Owl", bottom right on desktop and a bottom bar on phone. It is the only call everywhere except section 7.
  - Reference: Longbow's persistent "Reserve" pill (`longbow/` frames show it in every state).
- **Palette switch:** `?palette=night` (default) | `control` | `safety` | `slate`, with a small labelled switch for the morning review.

## C. The seven sections (kinds, references, exact mechanisms, evidence)

The evidence was captured live tonight by `reset/evidence/study.cjs`: frames at fixed scroll positions plus code facts (sticky count, scroll-linked changes, held elements, video time per state, libraries).

### 1 · Arrival: film moment
- **Reference:** Scout Motors.
- **Evidence:** `reset/evidence/scout/` (`sheet.jpg`, `facts.json`): 4 sticky elements, Lenis, 3 videos, 210 scroll-linked changes.
- **Mechanism observed:**
  - A full-bleed film still with ONE line set at photo scale at the bottom left ("Scouts always come back.").
  - The next beat's headline is set over the film ("An off-road icon reborn.").
  - Nothing else on the first screen but the nav and one action.
- **Owl build:**
  - Owl's own crew film (`crew.mp4`) fills the viewport.
  - One line at photo scale: "Your roof. Our job." (TBD at build), plus the call pill.
  - The film is muted and loops, with a poster for reduced motion.
- **WEB-SKILLS:** ⟦S0451⟧ split-line reveal; ⟦S1447⟧ video loading states; ⟦S0400⟧; GATE-BUTTONS call pill.

### 2 · "What's going on up there?": configurator-first instrument (THE PROOF SECTION)
- **Reference:** Quiet Cubes.
- **Evidence:** `reset/evidence/quietcubes/` (`sheet.jpg`, `choice-sheet.jpg`, `choice.json`, `facts.json`): GSAP + ScrollTrigger + Lenis + Swiper, 27 sticky elements.
- **Mechanism observed live tonight:**
  1. The first screen is a question with a single row of image-plus-label choice pills ("Select Your Pod": Office / Home / Outdoor / Nursing), and nothing else.
  2. Choosing triggers a **curtain reveal:** a dark layer with a curved (elliptical) bottom edge retracts upward and uncovers a **full-bleed scene for that choice**, with a two-line headline and a short side line.
  3. The choice pills **dock into a sticky top bar**, so the case can be switched at any time.
  4. **The page below is written per choice:** one heading set per pod type (`choice.json` lists all four sets).
- **Owl build:**
  - The question: "What's going on up there?"
  - Pills, each with a real photo thumbnail: **A leak** · **A stain on the ceiling** · **Shingles missing** · **After a storm** · **It's getting old** · **Not sure**.
  - Choosing triggers a curved curtain reveal into a full-bleed real photo for that case, with Owl's two-line answer (what Owl will do; the service named, never explained). The pills dock as a sticky bar.
  - **Tailoring:** the choice is stored and **changes section 3's first beat line and section 7's prepared message.**
- **WEB-SKILLS:**
  - ⟦S1442⟧ form honesty;
  - ⟦S1107⟧ keyboard (a radiogroup of pills);
  - ⟦S1441⟧ targets;
  - ⟦S0458⟧ the curtain reveal as a legible state change;
  - ⟦S0441⟧ choreography;
  - ⟦S1440⟧ feedback;
  - ⟦S1446⟧ Jakob's law (pills read as choices);
  - ⟦S0400⟧;
  - GATE-BUTTONS (pills get the lift and press, and the in-scene action gets the primary treatment).

### 3 · "You do nothing": pinned scroll scene (Wise Check, wrap, new roof, cleanup, box)
- **Reference:** Apple AirPods Pro.
- **Evidence:** `reset/evidence/airpods/` (`sheet.jpg`, `facts.json`):
  - 12 sticky stages and 564 scroll-linked changes across 10 scroll states;
  - 65 elements held on screen while the page scrolled (pinned);
  - **video time advancing with scroll** (one film at 2.47 s, then 4.9 s at the next state).
- **Mechanism:**
  - A tall section with a `position: sticky` stage.
  - Scroll progress inside the section **scrubs a film** (`currentTime = progress × duration`) and swaps one proof line per beat.
  - One idea per screen, with whitespace.
- **Owl build:**
  - The sticky stage scrubs Owl's crew film.
  - Beats: "We look closely (Wise Check)" → "We wrap your house and lawn" → "Your new roof goes on" → "Three cleanup passes" → "A box on your doorstep".
  - A small "you" marker sits on the side doing nothing ("You: coffee.").
- **WEB-SKILLS:** ⟦S0448⟧ sticky storytelling; ⟦S1325⟧ scroll progress; ⟦S1209⟧ scrolljacking limits (the stage is native sticky, never hijacked); ⟦S0400⟧ (a plain list of beats).

### 4 · The numbers: numerals as events
- **References:** Apple AirPods Pro ("2x more / 4x more" as giant numerals with grey sub-lines; frames in `airpods/sheet.jpg`) and Longbow (a spec row of hard numbers; `longbow/sheet.jpg`).
- **Mechanism:** one giant numeral per scroll beat, counted up when it enters, with a small grey line beneath. Longbow's row of all of them arrives at the end.
- **Owl's numbers (locked facts only):**
  - 5.0 · 90+ reviews;
  - 10-year workmanship warranty;
  - up to 50-year manufacturer warranties;
  - GAF Systems Plus;
  - 29 towns;
  - licence #BC809662;
  - BBB A−.
- **WEB-SKILLS:** ⟦S1420⟧ data as event; ⟦S1435⟧; ⟦S0409⟧ number pop-ins; ⟦S0400⟧.

### 5 · Who shows up: split cover with a seam card
- **Reference:** MERSI.
- **Evidence:** `reset/evidence/mersi/` (`sheet.jpg`, `facts.json`): a 900,425 px scroll; the split cover with its seam card is held (489 held elements) while Lenis drives it; GSAP, 41 clip-paths.
- **Mechanism:**
  - A full-screen cover split at a seam into two images.
  - A small name card sits ON the seam.
  - Scroll changes the cover chapter.
- **Owl build:** the Browns | the Berglands (real photos) on either side of the seam, with the card "Tim Brown · Noah Bergland · founded 2025 · family-owned". Scroll moves the seam and turns to the crew.
- **WEB-SKILLS:** ⟦S1445⟧; ⟦S0458⟧; ⟦S0400⟧.

### 6 · "Do you come to me?": explore to find
- **References:** Lando Norris (a contour-line ground under a scattered collage; `lando/sheet.jpg`) and Bruno Simon ("explore to find", scoped to one section).
- **Mechanism:** a contour-line map ground; dots for the 29 towns; type or tap to find yours, and it answers "Yes, we come to <town>".
- **WEB-SKILLS:** ⟦S1453⟧ search UX; ⟦S1107⟧; ⟦S1441⟧; ⟦S0400⟧.

### 7 · Call: one big panel
- **Reference:** Longbow (a restrained end card, the persistent reserve pill, "Choose your Longbow"; `longbow/sheet.jpg`).
- **Mechanism:** one huge number set as type, today's hours, and the message pre-filled from section 2's choice (mailto; the honest note word for word).
- **WEB-SKILLS:** ⟦S1441⟧; ⟦S1442⟧; ⟦S1452⟧ peak-end; GATE-BUTTONS primary.

## D. Colour trials, assigned

All four palettes run on the whole page through tokens (`?palette=`). The contrast figures are in the diagnosis §5.

| Treatment | Where it is shown | Role |
|---|---|---|
| **Night Owl** (navy #0F1B2D, gold #F5B83D, paper #F7F5F0) | Default on `owl-reset.html` | Working palette (my analysis) |
| **Control** (ink #17111D, amber #EAA221, cream #F1EFE6) | `?palette=control` | Today's brand, for comparison |
| **Safety** (charcoal #1E2124, orange #FF6A13, white #FAFAF7) | `?palette=safety` | Urgency trial |
| **Slate & Brass** (slate #283440, brass #C79A3B, stone #EEEEEA) | `?palette=slate` | Calm premium trial |

The proof gate shows section 2 in **Night Owl and Control** (the two treatments the order asks for). Every later gate shows Night Owl, plus one other palette per section, in rotation.

## E. Order of work tonight
1. The world shell (B), plus section 1 as the seam above.
2. Section 2, gated as `GATE-RESET-PROOF.md` (two treatments, mechanism side by side, the five-question check, ledger, scorecard).
3. Section 3, then 4, 5, 6 and 7: one at a time, each gated `GATE-RESET-<n>.md` with the same evidence standard.
4. Section 1 gets its own gate once the page exists around it.

## F. Gate standard for every reset section
- **Mechanism evidence:** reference frames beside my frames, at matching states.
- **No skeleton:**
  - no kicker-h2-lede opener;
  - no per-section Book + Call row;
  - a "same kind as anything already on the page?" answer.
- **Five-question homeowner check per treatment,** answered from the screenshot *before* the checklist.
- **The scorecard,** recomputed.
- **Statements:** zero vetoes; no sub-agents or background tasks.

## Addendum · owner's order of 05:15: keep every version as PAST, show the new bests
- **"Kill" and "merge" in §A are about what the new page shows,** never about deleting. Every past version of every section stays in `owl-roofing.html` as an inert PAST record, opened with `?past` (plus `&<section>=<n>` for any version). The pre-reset file is also frozen byte for byte in `past/`.
- **"No version factory" (top of this map)** means the new page shows one best per section, not a ladder. The past ladder is kept, not rebuilt.
- **The new best of each section** is the default `owl-roofing.html` shows. The choice and its reasoning are in §10 of each GATE-RESET file. The whole page is gated in `GATE-RESET-HOME.md`.

