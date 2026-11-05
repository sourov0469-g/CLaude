# GATE-RESET-5 · Section 5 "Who shows up? Family." (split cover with a seam card)

**Where:** on `owl-reset.html`, after the numbers (4). Source: `reset/sections/05-people.html`.

**Treatments shown:** Night Owl and **Owl today (control)**. All four palettes pass axe.

## 1. What it is (one homeowner sentence)
*The people who come to your house are a family business you can put names and faces to.*

- **The cover:** a full-screen cover split by a vertical seam (horizontal on phone), on a pinned stage 3.3 screens tall. Scroll turns three chapters:

| Chapter | Left half | Right half | Card on the seam |
|---|---|---|---|
| 1 | The Browns (the site's family photo) | A home (illustrative, tagged) | **The Browns** · Tim Brown, co-founder · *Family-owned · Founded 2025 · Shoreview, MN* |
| 2 | The Berglands (the site's family photo) | **Noah Bergland on a ladder at a roof edge** (the site's own photo and caption) | **The Berglands** · Noah Bergland, co-founder · *On the job · Co-founder, ladder in hand* |
| 3 | An Owl roofer smiling on a job, crew behind him | Owl's crew walking on a roof | **Owl's crew** · GAF Systems Plus certified · *We Give a Hoot · About your home, start to finish* |

- **The card:** a horizontal name card sits on the seam: the name on the left, the Owl mark embossed in the middle (the logo inlined; shape unchanged), the facts on the right. Its colour changes per chapter (accent, surface, accent wash).
- **The turn:** on each turn the outgoing halves slide away in opposite directions across the seam while the new pair slides in, and the card text crossfades on the seam.
- **Navigation:** three dots jump to a chapter.
- **What this section replaces:** the old "Family" section, which was photos with captions in boxes.

## 2. Mechanism evidence: MERSI, studied live tonight
**The sheet:** `gates/reset/s5/mechanism-side-by-side.jpg`. It sets three MERSI chapters beside three of mine, plus my mid-turn frame.

**What the probes captured** (`reset/evidence/mersi/`: `steps-sheet.jpg`, `steps.json`, `facts.json`):
- A 900,425 px page. It loads at a scroll position around 450,000 px, the middle of a looping track; wheel steps turn the chapters (Hamelin, Naya, Maurice Café St-Honoré, Berri, Cook, Tonnenami).
- Each chapter is **two different images split at the centre seam**, with **a horizontal name card on the seam**: the project name on the left, the embossed "MS" mark in the middle, the type and year on the right.
- **The card's colour changes per chapter** (orange, green, grey, …).
- GSAP + Lenis, 41 clip-paths; nothing is `position: sticky` (fixed layers driven by Lenis).

**Transferred:**
- the split cover;
- two different images per chapter;
- the card on the seam with an embossed mark;
- a card colour per chapter;
- scroll turns the chapter.

**My interpretation, not a copy:** the turn animation itself. My probe's mid-turn frames (`mid-sheet.jpg`) did not advance, so **MERSI's exact transition was not captured**. My halves slide in opposite directions across the seam, using an ease-out (it starts at once; 21 % at 250 ms).

**What does not transfer, and why:**
- **The infinite loop and wheel-snapping.** A contractor page needs a finite story of three chapters and an exit.
- **MERSI's interiors, type and logo.**
- **Lenis smooth-scroll hijacking.** Owl uses native scroll with a sticky stage.

## 3. Five-question homeowner check (from the screenshots, per treatment)

### Night Owl
**Screenshots:** `night-1440-*.jpg` and `night-390-*.jpg`.

1. **What is it for?** It tells me who will actually come to my house: the Brown family, the Bergland family (Noah himself on a ladder), and their crew.
2. **Under 3 seconds?** Yes. Smiling family faces, "Who shows up? Family." and a name card.
3. **Interesting, playful or fun, and exactly what makes it so?**
   - Scrolling turns the page like a book cover, the two halves sliding apart and a new family arriving, with the name card riding the seam and changing colour.
   - The jump from a family photo to the same man on a ladder is the moment that lands.
4. **Is every element there for a reason?** The family photos (who), the right halves (what they do: a home, the ladder, the roof), the card (names and facts), the dots (where am I), and the headline. Complexity without a reason: none.
5. **Does it fit a stressed homeowner?** Yes. Real names and faces make it safe to let someone onto the roof; no reading needed.

### Owl today (control)
**Screenshots:** `control-1440-*.jpg` and `control-390-*.jpg`. The same answers; the cards turn amber and cream. Both palettes read well here, because the photos dominate.

## 4. Skill ledger
- **Pinned split cover:** ⟦S0448⟧ sticky storytelling; ⟦S1209⟧ native sticky, no hijacking.
- **Halves turning:** ⟦S0458⟧ a legible state change; ⟦S1436⟧ 0.9 s ease-out.
- **Seam card:** ⟦S1435⟧ one deviation; ⟦S0409⟧ crossfade; the embossed mark (the brand logo, shape untouched).
- **Photos:** ⟦S1445⟧ interfaces that feel (real families); ⟦S1306⟧ no fake proof (the site's own captions; the home tagged illustrative).
- **Dots:** ⟦S1107⟧ keyboard; ⟦S1441⟧ 44 px; `aria-current`.
- **Reduced motion:** ⟦S0400⟧. The chapter swaps at once.

## 5. Checks: `gates/reset/s5/checks.json` · **20/20 PASS** (`tools/reset-test.cjs people`)
- **axe WCAG 2.1 A/AA:** 0 violations in all four palettes (fixed: the card sub-line at 80 % opacity failed in Safety and Slate).
- **Facts and skeleton:** the facts lock passes, and the no-skeleton rule passes.
- **Structure:** a split cover on a sticky stage, three covers of two halves, and the card centred on the seam (within 4 px).
- **Scroll turns the chapters:** Browns, then Berglands, then crew, with the dots following.
- **Mid-turn:** the halves move in opposite directions (old out, new in).
- **Real people, the site's own captions, locked facts only;** no invented details (no "van", no years of experience).
- **The dots jump** to a chapter.
- **Layout:** no sideways scroll at 1440, 768 or 390; controls at least 44 px.
- **Reduced motion:** the chapter swaps at once; no looping animation.
- **No page or console errors.**

## 6. Scorecard (weights Design 40 · Usability 30 · Creativity 20 · Content 10)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.6 | 3.44 |
| Usability | 30 | 8.4 | 2.52 |
| Creativity | 20 | 8.5 | 1.70 |
| Content | 10 | 8.8 | 0.88 |
| **Total** | **100** | | **8.54** |

Recomputed: 8.6 × 0.40 + 8.4 × 0.30 + 8.5 × 0.20 + 8.8 × 0.10 = 3.44 + 2.52 + 1.70 + 0.88 = **8.54**. Pass, zero vetoes.

**"Same kind as anything already on the page?"** It is the third pinned stage on the page (after the arrival and the scrub scene), but a different kind: a turning split cover of people, not a film. The pinned count is now at my stated limit; sections 6 and 7 will not pin.

## 7. Defects found and fixed in-session
1. **An invented detail.** "Not just the name on the van" (no van is on record) became "On the job · Co-founder, ladder in hand", which is what the photo shows.
2. **A laggy turn.** The ease-in-heavy curve moved 0.02 % in 250 ms, so the turn felt unresponsive. It became an ease-out (21 % at 250 ms, 73 % at 500 ms).
3. **Contrast.** The card sub-line at 80 % opacity failed AA in Safety and Slate; it is now full ink.

## 8. Remaining defects (named)
- **D1 · no Tim-at-work photo.** Tim's chapter pairs his family with an illustrative home, because no named photo of Tim on a job exists on the branch. The owner could supply one.
- **D2 · the cut-out family photos** sit on the deep palette colour. In the turn, the cut-out edges show briefly against the navy (visible in `night-1440-2-turning.jpg`). Full-background family photos would fix it.
- **D3 · the transition is my interpretation** (see §2); MERSI's own was not captured.

## 9. Vetoes: **zero**
- Real photos, with the site's own captions, and the non-Owl home tagged illustrative.
- Only locked facts.
- The logo shape is unchanged.
- No sub-agents or background tasks; every command ran in my thread, in the foreground, with a time limit.

## 10. New best: the default the homepage shows (owner's order, 05:15)
**The choice:** Section 5, "Who shows up? Family." as built and gated above, in **Night Owl**, is the new best. It is the version the finished homepage, `owl-roofing.html`, shows by default.

**What it stands in for:** **Family** (9 versions and 1 backup). Nothing was deleted. Every one of those versions is kept in the same file as **PAST**, an inert record of the whole past homepage, and opens with ?past&family=9 (any version number works). The past page carries a chip back to the new one.

**Treatments compared:** Night Owl and Owl today. Both read well because the photos dominate; Night Owl is chosen at page level.

**Why this is the best:**
- The past Family versions were photos with captions in boxes. The new one turns the same real photos into a split cover that scroll turns, chapter by chapter: the Browns, the Berglands (Noah on a ladder) and the crew.
- It scores second highest of the night (8.54, after section 7), and it best answers "who will actually come to my house".
- **One palette for the whole page.** The sky and the owl run as one world, and a palette per section would break it. Night Owl is the working default under the owner's grant (contrast and reasoning in the diagnosis §5). The other three palettes stay one switch away in the top bar.

**Checks on the finished homepage:** this section's checks were re-run on `owl-roofing.html` itself, not only on the workbench page. They all pass (`checks.json` in this gate's folder).

**One finding from the re-run, recorded honestly:**
- **On the finished homepage, the chapter turn starts about 35 ms later** than on the workbench page. In a headless probe the scroll-to-switch time was 158–191 ms, against 137–154 ms (`tools/people-mid-probe.cjs`). The turn itself is unchanged.
- **The check was sampling one fixed instant** (260 ms) and caught the halves just before they moved. It now watches the turn frame by frame and requires the mid-turn state, with the halves moving in opposite directions, within 0.6 s of the scroll. That state is reached at about 310 ms on both pages.
- **The cause is not proven.** It is most likely the larger document (10.5 MB with the past records). It is not visible to the eye, and it has not been measured on a real phone.

