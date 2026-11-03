# GATE · Reviews and videos (home §8): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=reviews:1|2`. **Default: V1.**

**Reference:** Lando Norris.
- **What transfers:** the archive standard: curated objects in a strict grid, each with a tag; contour lines as the
  ground (Owl's own tree rings, B2).
- **What never transfers:** the lime, the helmets, the signature, the fan-card stack.

**Content rule (facts lock):** reviews only as Owl states them, so the only rating used is **"5.0 · 90+ reviews"**.
- **Not quoted:** no review quote, including the truncated excerpts on Owl's homepage.
- **The proof:** Owl's own YouTube videos, with IDs and titles verified by oEmbed at Phase 1: the real customer video
  review, "Why Choose Owl Roofing?", "7 Questions…" and "Best Shingle Colors for 2026".

## NO-COVERAGE found and fixed in the assets (closed-inventory rule)
A click-to-load YouTube player was not in the component inventory, so it was not improvised in the section. Added to the
assets instead:
- `owl-components.css` `.vcard`: a thumbnail, an amber play button, 16:9.
- `owl-identity.js` `Owl.videoCard`: on click, swaps in a `youtube-nocookie` player and moves focus to it.
- BRAND.md §4 "Video card": Owl's own videos only. Nothing loads from YouTube until a click (privacy and weight).

**Thumbnails:** re-encoded from about 690 KB to 168 KB.

## V1 · The archive
- **The rating:** "5.0 · 90+ reviews" as the heading.
- **The grid:** the customer video as the lead tile (two-thirds width), three tagged tiles stacked beside it
  (About Owl, Questions, Choosing).

## V2 · One film
- **The lead:** "Hear it from a homeowner." over a feature player (the customer video).
- **The playlist:** four buttons that swap the player and caption, with `aria-pressed`; focus moves to the new play
  button.

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.5 | 7.5 |
| Usability (30) | 8.0 | 8.0 |
| Creativity (20) | 7.0 | 7.0 |
| Content (10) | 9.0 | 9.0 |
| **Weighted** | **7.70** | **7.70** |

**Default: V1.** It shows the whole archive at once. V2 is equal on score, but it hides three videos behind a playlist.

**Vetoes:** none.
- **Facts:** no invented quotes; only the locked rating.
- **Layout:** no overflow at 1440 or 390.
- **JS:** no errors.

## Tests: 5/5 pass (`revtest.mjs`; YouTube requests were intercepted, so the test made no live fetch)
- **Nothing from YouTube loads before a click.**
- **A click** swaps in `youtube-nocookie.com/embed/0lUgM6cp8tU` and focuses it.
- **V2 playlist:** swaps the video and caption, focuses play, and keeps exactly one pressed item.
- **No JS errors.**
- **Token lint:** clean.

## Defects found and fixed
1. **V1 grid:** the fourth video was stranded alone on a new row. Now one lead tile with three stacked beside it.

## WEB-SKILLS evidence (added at Muse's correction; facts, versions and scores unchanged)

### Mechanism → tag → check against the built section
| Mechanism | Tag | Check |
|---|---|---|
| V1 asymmetric archive grid: lead film at 2fr, three tagged films stacked at 1fr | ⟦S1428⟧ layout-grid (asymmetric pattern), Lando (archive grammar) | Pass. Column-dropping to 2 then 1 columns; checked at 1440 and 390. |
| Each film plus its tag and title grouped by proximity; no extra boxes | ⟦S1426⟧ law-of-proximity, ⟦S1423⟧ law-of-common-region | Pass. The weakest grouping that works: caption close under the thumbnail. |
| The customer video first and largest | ⟦S1454⟧ serial-position (read at Phase 3a) | Pass. Primacy goes to the strongest proof. |
| Four films, no more | ⟦S1444⟧ hicks-law | Pass. Four distinct, tagged choices. |
| Click-to-load (facade) video card | ⟦S0280⟧ core-web-vitals | (see below) |
| Play buttons, iframe and focus | ⟦S0054⟧ fixing-accessibility | (see below) |
| V2 playlist: buttons with `aria-pressed`; the feature swaps; focus goes to the new play button | ⟦S1440⟧ feedback-patterns, ⟦S0054⟧ | Pass. Immediate state change, not colour-only (outline plus `aria-pressed`). |
| Rating as the only review claim | facts lock; ⟦S0659⟧ (no invented proof) | Pass. |

**The click-to-load card against core-web-vitals:**
- **Lab evidence (test):** no YouTube request before a click, so no third-party script competes with the page's load or
  interactions.
- **Layout stability:** thumbnails have width/height and a 16:9 aspect-ratio, so swapping in the iframe does not shift
  layout.
- **Claim limit:** per ⟦S0280⟧, I claim no LCP/INP/CLS field numbers; none were measured.

**The play buttons, iframe and focus against fixing-accessibility:**
- **Accessible names:** each play button carries `aria-label` "Play: <title>".
- **Images:** thumbnails are `alt=""`, decorative inside the labelled button.
- **The iframe:** has a `title`.
- **Focus:** moves into the player after the click.
- **Sound:** no autoplay with sound before the user acts; autoplay starts only after the click.

### Rules not met (recorded as remaining defects; the version is not changed, per the correction)
1. **Captions** (⟦S0054⟧ media): the videos contain speech. Their captions are YouTube's (auto or uploaded by Owl); the
   build cannot verify that captions exist for each video. Owl should confirm captions on its channel.

## Remediation pass (after acceptance; the scorecard above is left as judged)
- **⟦S0280⟧ layout shift:** the video card that V2's script rebuilds now gives its thumbnail width and
  height (720×405), like the cards in the markup. No markup changed, so no backup was needed.

## Measurement pass (after acceptance; scorecard left as judged)
- **axe (WCAG 2.2 A/AA), `aria-allowed-attr`, critical:** V2's selector buttons carried `role="listitem"`, so their
  `aria-pressed` was invalid. They now sit in a labelled `role="group"` and keep their button role. Superseded markup
  kept as `reviews-v2-before-axe.html`.
