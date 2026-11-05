# GATE-FINAL — Section 1: HERO ("Title between sky and house")

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (Part A binding, Part B the owner's words). This hero replaces Hero O and every earlier hero. The final page is built in a new, lean tree (`siding/redo/final/`, output `final/out/final.html`): **one version, no switcher, no hidden versions, no external link of any kind** (tested: the file contains no `http` text at all; its only links are `tel:`, in-page anchors and `data:` images).

## 1. My understanding of the brief, and the self-audit before building

The owner's words on the hero (Parts 1 and 2): the idea of V4, the headline *behind* the house, is good; V4's failures are four: **(a) poor image quality, (b) wrong font and size, (c) too much text, (d) a bad cut-out**; the photo fills the whole hero, running under the header, with **no white anywhere**; "I want this to be perfect especially the hero section." The plan adds: if the session's photo is not high-quality enough, say so here and Muse supplies one.

What V4 actually was (read from the earlier build): a 1200 × 800 supplied dusk photograph, one 1200 px matte, the headline inside a card with a subline, two buttons and a stars line. I audited each failure at the root:
- **Image quality:** a 1200 px source stretched over a full-bleed hero, soft and low.
- **Cut-out:** a single low-resolution matte for the whole image, so edges were soft and ragged.
- **Font and size:** a two-line headline set small inside a card, so it never read as part of the scene.
- **Text:** headline, subline, two buttons, a proof line.

## 2. What was built

**The photograph.** Full-bleed, from the page's top edge under the header to the bottom of the hero; a 4:3 photograph that always covers the screen (never letterboxed); the page's ground around it is a dim green-tinted near-white (#F1F5F1), never pure white. It is the firm's own published job **#36, Ashford Park, Buda · Jul 2026 · Siding, Shingle Roofing & Exterior Painting**, fetched as the **1900 × 1425 original** from the firm's image store (not the 1400 px copy the earlier builds used), given a gentle grade (contrast +7%, colour +6%, light sharpening). It is captioned only with its own record, small, bottom right. **See the honest photo statement in section 5.**

**The cut-out (the part that had to be perfect).** The headline sits between two layers made from the same photograph by `tools/prep_hero.py`:
1. **A sky matte at the full 1900 px**, computed from the photograph itself: the sky colour is modelled locally, every pixel's distance from it gives a soft alpha (edges are real anti-aliased alpha, not a hard polygon), thin specks are removed and solid interiors filled.
2. **The front layer:** the house, chimney, roofs and trees, with the edge colours *unmixed* from the sky (so no light halo), as a lossless-alpha WebP (297 KB).
3. **The back plate:** the photograph with the sky filled in under the house's edge (so front over back reproduces the photograph exactly), 299 KB.
The two layers sit in one box that is moved as one, so the cut-out can never drift against the photograph. The headline (z-index between them) is therefore visible only where there is sky, and the chimney, the left trees and the right tree branches genuinely overlap it.

**The headline.** The firm's own line, unchanged and exact, "The full wall or the whole house.", Montserrat 800 (the page's display face), tight tracking, set to 8.2% of the screen width (about 118 px at 1440; four balanced lines at 13.6% on phones), deep green #0E3B2C on the sky (7.9:1 against the mean sky behind it). It is placed so the chimney cap and the tree tops cut into the bottom of "house", where the effect is visible but the words stay readable: **99.0% of the headline's pixels are visible at 1440**, 1.0% sit behind the house (measured).

**Less text.** The hero now carries only: the headline; one short line ("Siding, windows and roofing for Austin homes since 2009.", the first sentence of the page's own subline, verbatim); the one filled **Book a free inspection**; the phone **(512) 550-0000**; and the photo's own record as a small caption. The subline's second sentence, the stars/proof line and the second button are gone from the hero (the proof lives in Reviews and Booking). Book points to the in-page `#booking` for now (an internal route; it becomes the Contact page when the inner pages exist, as the plan says); the header's and the phone bar's Book links also no longer point outside the site.

**Motion (small, purposeful, never moving the photograph against its cut-out).**
- **Entrance (1.7 s):** the headline rises from behind the house into the sky, so the cut-out is shown rather than explained; the photograph settles from a 6% zoom (2.2 s).
- **Pointer (fine pointers only):** the photograph (both layers together) drifts up to 9 px against the pointer and the headline up to 22 px the other way, so it slides behind the chimney and the branches; they ease back to rest when the pointer leaves.
- **Scroll:** the headline sinks behind the roofline and fades as you scroll away.
- **Touch:** the entrance and the scroll sink only. **Reduced motion:** nothing moves.
- Transform and opacity only, one `requestAnimationFrame`, stopped when the hero is off screen or the tab hidden.

**Weight.** The whole file is **978,963 bytes** for the header, hero and phone bar (images 596 KB). The 22.5 MB ceiling is far away; videos will be linked, never embedded.

## 3. Evidence

Screenshots (`siding/redo/final/gate/`): `hero-1440x900.png`, `-1920x1080`, `-1366x768`, `-1024x768`, `-768x1024`, `-390x844`; `hero-entrance-sheet.jpg` (four frames: 0.25 s, 0.65 s, 1.1 s, 2.4 s), `hero-motion-sheet.jpg` (pointer left, pointer right, scrolled 300 px, rest), `hero-cutout-zoom.jpg` (the chimney cap, the left trees and the right branches at 2×), `hero-text-behind-sheet.jpg` (the headline with and without the front layer, in magenta, to show exactly what is hidden), `hero-cutout-check.jpg` (front over back against the graded original).

**37 of 37 checks pass** (`tools/hero_test.js`, Chromium):

| Check | Result |
|---|---|
| H1 | The firm's line, exact; exactly one h1 |
| No outside link | None in the file: only `tel:`, anchors, `data:` |
| Hero copy | Only the one-line subline, Book, phone, and the photo's own record |
| Photo | 1900 × 1425 original (front layer 1900 wide); real alt text; the cut-out layer hidden from assistive tech |
| Ground | `rgb(241, 245, 241)`, not white |
| Font and size | Montserrat; at least 8% of the width |
| **Cut-out alignment** | Front over back equals the graded original photograph after a 1.6 px blur: mean difference 3.2 of 765, **0.000% of pixels differ by more than 60**, maximum 38: no offset, halo or gap at the silhouette (the raw residual is codec noise in the foliage, seen in the diff map) |
| Headline legibility | 99.0% of its pixels visible; the rest behind the house |
| Contrast | Headline 7.9:1 on the sky; the sub line, phone and caption on the frosted panel ≥ 4.5 |
| Layout, 7 sizes | 1440×900, 1920×1080, 1366×768, 1024×768, 768×1024, 390×844, 360×640: the hero fills the screen; the headline clears the header and the call-to-action; the call-to-action clears the phone bar; no overflow; targets ≥ 48 px |
| Motion | Pointer drift opposite and larger for the headline, settling to rest; scroll sink and rise; the entrance runs and ends at rest; idle frame rate ≥ 50 fps; touch: no pointer drift; reduced motion: no animation |
| Keyboard | Tab reaches the hero Book link and the phone, each with a solid 3 px ring |
| Fonts, errors | Montserrat and Inter only; 0 page errors at every size |

## 4. The four named failures, one by one

| V4's failure | Fixed by |
|---|---|
| Poor image quality | The 1900 px original instead of a 1200 px source; a graded, sharpened real job photograph; never shown above 1.04× its pixels at 1920 wide (see the limit below) |
| Wrong font and size | Montserrat 800 at 8.2% of the width, tight tracking, set into the sky, not in a card |
| Too much text | One line, one button, the phone and a caption, from five elements before |
| Bad cut-out | A full-resolution alpha matte with colour unmixing; measured alignment; zoom crops included |

## 5. The honest photo statement (as the plan requires)

**The 43 published job photographs are working photographs, and none is a hero-grade image.** I examined all 43 for this concept (a house silhouetted against enough sky for a headline to sit behind it). The only photographs with large clear-sky headroom were roof close-ups (#12, whose original is only 1183 px wide) and one 4000 px photo (#15) whose house fills the top of the frame. **#36 is the best fit**, with a clean silhouette, a chimney that cuts through the headline, and a 1900 px original, but it is an ordinary, **overcast, phone-quality photograph**: flat grey sky, a plain tan ranch house. It is a real Austin Pro job and it is sharp enough at 1440 (shown at 0.76 of its pixels), but it is not the "perfect" hero image the owner described.
- **Limits:** the sky is flat; the photograph is 4:3, so on very wide screens (2560 px) it is shown 1.37× its pixels and its lower part is cropped; on phones only the middle of the house is shown.
- **It is also Visualiser's photo (#36).** The Visualiser section will be given a different photograph when it is built, so the same house does not appear twice.
- **My recommendation:** **Muse supplies a better photograph** if one exists: ideally a landscape image of at least 2600 px wide, a whole house with its roofline against 35–45% clear, ideally blue or warm-dusk sky, a single chimney, gable or tree breaking the skyline, real or licensed, no people. The pipeline is photo-agnostic: `python3 tools/prep_hero.py <photo> <outdir> <band> <t0> <t1>` regenerates the front and back layers (about a minute), and the hero re-seats with a one-line change. Until then #36 stays.

## 6. Defects found and fixed during the build

1. The first render stretched the photograph (an inherited `height` attribute): `height:auto` on both layers.
2. A faint horizontal seam where the front layer ends: the back plate now returns to the original photograph 24 px above the seam.
3. The phone icon rendered huge in the call-to-action; local sizing added.
4. The headline was hidden almost entirely behind the house in the first placement (87% of its height); re-placed (now 99% visible).
5. On phones the chimney hid "se." of "house."; the phone headline size and position were retuned (13.6% of the width).
6. Test harness only: the cut-out comparison first used the ungraded original; the scroll test ran on a page too short to scroll; the entrance test counted a finished animation. All corrected and noted above.

## 7. Remaining, named honestly

- **The photograph** (section 5): the largest open item; it decides whether the hero is "perfect" in the owner's sense.
- **Header and phone bar:** unchanged from the earlier build (their navigation anchors `#siding`, `#windows` and so on will point at the real sections and pages as those exist); the interactive cursor companion and the dim-ground backgrounds are global items I will do with the following sections.
- **Book routes to `#booking` for now** (the plan's Contact page is an inner page, built after Muse approves the homepage).
- **Testing:** Chromium only.

## 8. Sub-agent use, stated honestly

**None for this section** (up to two are allowed and preferred; I judged the hero, one tightly coupled imaging task whose parts depend on each other, not a good fit for splitting). I intend to use them for the next sections' prep (the video source and text for Section 2; the SVG animation kits for Services). No background tasks were used.

## 9. Next: Section 2, "The wall and the video"

**Consult-first plan (nothing built):** the full-wall type from Hero 9 as the pinned section; at rest only the big wall text; on scroll the window in the wall opens and the video behind it grows to full screen while the wall text fades; then the paragraph and the CTA over the playing video. Open questions for Muse: (1) the **video source**: the only video on file is the firm's own hero film (`/videos/hero-test.mp4`) hosted on its old site; the plan wants it linked, not embedded, with better quality: which link may I use (the YouTube link if one exists)? Until then the window shows a poster frame and the film plays only if the link loads; (2) the wall text: I propose to keep the firm's line and replace the filler with the firm's published sentences only.

## 10. Governing design reference (added at Muse's request)

**Governing reference: Cowboy** (the same restraint reference the earlier Hero O gate named): one dominant subject, very little text, type that belongs to the scene. **Transfers:** a single full-frame photograph carrying the whole first screen; one short statement, one action; calm, unhurried motion. **Does not transfer:** Cowboy's product imagery, colours or copy. The *idea* is the owner's own: Hero V4, "title between sky and house" (the headline behind the house); the cut-out technique is original to this build.

## 11. WEB-SKILLS ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Hero | ⟦S1434⟧ visual-hierarchy: the photograph and the headline are the only large things, then the one filled button; ⟦S1454⟧ serial-position: the first screen carries the promise, the action and the phone; ⟦S0220⟧ anti-slop: the firm's own line, its own subline and the job's own record only; ⟦S1435⟧ von-restorff: the lime Book button is the only saturated object on the frame |
| Element | photograph and layers | ⟦S0985⟧ critical-images: the 1900 px original, `fetchpriority="high"`, explicit width and height, decoded before the entrance runs; ⟦S0956⟧ broken-images: real alt text on the photograph, the cut-out layer hidden from assistive tech |
| Element | call-to-action | ⟦S1441⟧ fitts-law: the Book link and the phone are 48 px or taller, in the thumb zone on phones, clear of the phone bar; ⟦S1494⟧ ux-writing: plain labels |
| Motion | entrance, pointer depth, scroll sink | ⟦S1436⟧ animation-principles: the headline rises from behind the house (follow-through, ease-out), the photograph settles; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transform and opacity only, one rAF, stopped off screen; ⟦S0400⟧ accessible-animation: reduced motion leaves the final pose, touch gets no pointer drift |
| Site | keyboard, contrast, errors | ⟦S0054⟧ fixing-accessibility: Tab order, 3 px focus rings, 7.9:1 headline and 4.5:1+ elsewhere; ⟦S0231⟧ web-performance: 596 KB of images, no video, no library |

## 12. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **7.9** | The concept lands: a headline that really passes behind a chimney and trees, a calm frame, no card, one action (`hero-1440x900`, `hero-cutout-zoom`). **Minus:** the photograph itself is overcast and ordinary, which caps the first screen; a 4:3 photo is cropped on wide screens |
| Usability (30) | **8.7** | 99% of the headline is readable; the action and the phone are in the first screen at every size tested; keyboard, touch, reduced motion and seven screen sizes verified. **Minus:** the Book link is an in-page anchor until the Contact page exists |
| Creativity (20) | **8.6** | A full-resolution alpha cut-out with colour unmixing, an entrance in which the headline climbs out from behind the house, depth drift between photograph and headline. **Minus:** the idea is the owner's (V4), the craft is mine |
| Content (10) | **9.0** | The firm's own line, its own subline and the job's own record; nothing invented. **Minus:** none found |
| **Weighted** | **8.35** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 7.9 + 0.3 × 8.7 + 0.2 × 8.6 + 0.1 × 9.0 = 3.16 + 2.61 + 1.72 + 0.90 = **8.39**.

**On the score:** the 7.9 for Design is deliberately the lowest figure: it is the photograph, not the build, and it is the reason the gate asks Muse for a better photo. The hero photo #36 stays until Muse supplies one; a swap is one command (`tools/prep_hero.py`) and a one-line change, no rebuild.
