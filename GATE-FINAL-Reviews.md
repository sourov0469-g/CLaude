# GATE-FINAL — Section 6: REVIEWS (Version B "Hanging tags" in full, then Version C "Read at reading pace" carrying ONE review)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (REVIEWS block). **Owner's asks:** B in full; then C with ONE review only, the single best, shown bigger; every pick still gets the deep upgrade pass; backgrounds never white, with SVG life; no external links.

## 1. Self-audit of the old B and C, then decisions

Old B (a line of eight hanging tags, a 4.9 tag, a reader dialog, breeze physics) was good; the faults in the final build were a missing section gutter (the heading sat at the screen edge), a white pill behind the stars, a flat ground, a dialog you could only open and close, and a duplicate `id="reviews"`. Old C was a long pinned reader of four quotes (the owner wants one). **Decisions:** keep B's idea and physics and upgrade around them; replace C with one review, set large, whose words light as the visitor scrolls.

## 2. What was built

- **B, upgraded in place:** a kit background (live-oak canopy, speech bubbles, star outlines) on parallax over a dim sage ground; the 4.9 tag counts up to 4.9, its stars are lime on deep green (no pill) and a slow sheen crosses it; tags lift and tilt on hover/focus and press in on click; **a gust of wind now and then** sweeps across the line (synthetic pointer sweeps the tags' own physics answer; never while the pointer is on the line, the dialog is open, the tab is hidden, or under reduced motion); the **reader dialog now has Previous / Next, "n of 8" and arrow keys**, Escape closes and focus returns to the tag. Eight tags, each an exact excerpt of a published review with its reviewer's name as published.
- **C, one review:** review 27 of `reviews.json` (Megan Randolph, 344 characters, Google review, 2026), **complete and verbatim**. A pinned stage (300 screens tall) in which the words light up one by one as you scroll (from 16% to full ink, each word easing in), three published phrases in the review ("Build quality was top notch,", "install was fast and efficient.", "pricing was very competitive!") get a lime underline that draws as they are read, a large quote mark draws itself behind, a reading ring shows the share read, the reviewer's name and source appear last under a drawn rule, **4.9 from 474 Google reviews** sits in the header, "Show the whole review" jumps to the end, and the page says plainly "Published on Google, shown word for word. We chose one that is complete, not cut."
- **Why this review:** it is one of the complete reviews (not cut at 421 characters), it is about siding (the firm's main trade, 431 jobs), and it names the three things homeowners weigh: build quality, speed, and price. It is not one of the eight in B, so the two parts do not repeat. A review's per-review star rating is not in the data, so none is shown; the aggregate 4.9 from 474 is shown separately.
- **Screen readers** get the whole quote as one paragraph; the lit words are visual only. **Reduced motion / no script:** no pin, every word at full ink, the byline shown.
- **Background treatment:** B and C both sit on dim sage gradients with the kit's reviews art on two-layer parallax (the near layer kept faint so it never fights the text); nothing is pure white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Apple's product-page statement text (a large sentence whose words darken as you scroll)** for C; **Graza's tactile, pointer-driven physics** for B. **Transfers:** reading pace tied to scroll, one thing to read, the rest quiet; objects that respond to the pointer like real ones. **Does not transfer:** their type, their imagery, their copy; the review is the firm's own published review.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Reviews | ⟦S1434⟧ visual-hierarchy: the review is the page; the rating sits in the corner; ⟦S1426⟧ law-of-proximity: name and source sit under the rule that ends the quote; ⟦S0220⟧ anti-slop: a real, complete, verbatim review; no invented text or ratings |
| Element | tags, dialog | ⟦S1444⟧ one thing at a time (the dialog steps through eight); ⟦S1494⟧ plain labels (Previous, Next, 3 of 8); ⟦S1454⟧ serial-position: the 4.9 sits in the middle of the line |
| Motion | gust, count-up, lit words | ⟦S1436⟧ animation-principles: follow-through (tags keep swinging), ease-in of each word; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transform/opacity only; rAF on scroll; gust is idle-aware; ⟦S0400⟧ accessible-animation: reduced-motion static layout, the full quote always in the accessibility tree |
| Element | controls | ⟦S0054⟧ fixing-accessibility: real buttons, 3 px focus rings, `aria-live` counter, dialog with Escape and focus return; ⟦S1441⟧ fitts-law: all targets ≥ 44 px |
| Site | weight | ⟦S0231⟧ web-performance: 9 KB of CSS and 9 KB of JS added; no images |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `reviews-B-1440.png`, `reviews-C-sequence-1440.jpg` (0%, 30%, 55%, 97% of the stage), `reviews-phone-390.jpg` (B, then C at start, middle and end). **23 of 23 checks pass** (`tools/rvt.js`):

| Check | Result |
|---|---|
| B content | Eight tags, each an exact excerpt of a published review with its own reviewer; the big tag reads "4.9 … 474 Google reviews" after the count-up |
| Links, ids | Only internal links; no sums; no duplicate ids on the page |
| Dialog | Shows the whole review verbatim + reviewer + "1 of 8"; Next then the left arrow steps; Escape closes and focus returns to a tag |
| Wind | A sweep across the line swings the tags |
| C content | One blockquote: the full text of review 27 (Megan Randolph), not cut; three published phrases marked; `id="reviews-read"` |
| C behaviour | Start: words at 16%; midway: 30 read and 29 unread, ring at 50%; end: every word at full ink, 100%, the reviewer visible; "Show the whole review" jumps to the end |
| Fit | At 1440×900, 1366×768, 1024×768, 768×1024 and 390×844 the whole quote fits between the heading and the footer row; no overflow; targets ≥ 44 px |
| Contrast, fonts | All ≥ 4.5; Montserrat and Inter only |
| Reduced motion | No pin; every word fully readable at once |
| Page errors | 0 |

## 5. Defects found and fixed

1. The ported sections had lost the earlier build's shared section rules (gutter, heading, paragraph): the B heading sat on the screen edge. Added to the shared shell stylesheet, so every ported section gets them.
2. The quote mark overlapped the C heading; it is now a faint watermark behind the text.
3. On phones the foot row (button, note, ring) sat under the mobile bar; bottom padding added.
4. The kit's tiny star outlines crossed the B intro text; the near art is now at half opacity.
5. Duplicate `id="reviews"` (B and old C): C is `reviews-read`.
6. The 4.9 tag's stars were grey on a white pill; now lime on green, no pill.

## 6. Remaining, named honestly

- **The data has no per-review rating or date**, so no review carries stars or a date; "Google review, 2026" is the firm's own source label.
- **Choosing "the best" is a judgement** (complete, siding, quality/speed/price); another complete review could be swapped in by changing one index.
- **The wind is simulated pointer input** (it drives the existing physics); on touch it still swings the tags but nobody sees a finger.
- **Chromium only**, headless software rendering.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.3** | Large calm type, a quiet drawn underline on the three phrases, a physical line of tags on a soft living background. **Minus:** B's tags are the older drawing, only refined |
| Usability (30) | **8.5** | One thing to read at a time, a ring that says how far, a skip, a dialog you can step through, a plain static fallback. **Minus:** a pinned 300-screen read is long for impatient visitors (the skip is there) |
| Creativity (20) | **8.6** | Words that darken at reading pace, phrases that underline themselves, a count-up and a sheen on the 4.9, wind. **Minus:** the idea is the owner's |
| Content (10) | **9.0** | A real, complete review, verbatim; nothing invented; the honest note on the page |
| **Weighted** | **8.49** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.3 + 0.3 × 8.5 + 0.2 × 8.6 + 0.1 × 9.0 = 3.32 + 2.55 + 1.72 + 0.90 = **8.49**.

## 8. Sub-agent use, stated honestly

I built, tested and gated this section myself. At the same time two sub-agents (read/write on their own files only) were building Process + Footer and Area under my brief; they are reported in their own gates. No background tasks were claimed beyond that.

## 9. Next

Sections 7 (Process D), 9 (Area A) and 11 (Footer) come from the two sub-agents, reviewed and integrated by me; Booking C + J is gated next.
