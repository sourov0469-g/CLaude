# UAV Aerial Solutions: launch QA record

Deliverables (in `dist/`):
- `UAV_AERIAL_SOLUTIONS_FINAL_LAUNCH_READY.html`: the whole site in one double-clickable file (4.7 MB, no external requests).
- `site/` and `UAV_AERIAL_SOLUTIONS_deploy-package.zip`: the same pages as real URLs for upload (see `site/DEPLOY.txt`).

Rebuild: `python3 tools/images.py && node tools/og.js && node build.mjs`. Test scripts are in `tools/qa/`.

## What was checked, and by whom
| Pass | Method | Result |
|---|---|---|
| 1 Content truth | Every claim checked against the live site by me and an independent reviewer | Unsupported claims removed or softened; only verified facts remain |
| 2 Copy | Full read-through plus independent reviewer | Repetition reduced, headings and CTAs varied, UK English |
| 3 Imagery | Independent art-direction review: crops, sharpness, uniqueness | 35 photos, each used once; full-size client originals; stock labelled |
| 4 UI / visual | Screenshots at 12 widths; hover and rest states; independent review | Spacing, hover and layout issues fixed |
| 5 Mobile | 320 to 430px, every route, menu at every width; independent review | Header, captions, buttons, tabs fixed |
| 6 Tablet | 768, 834, 1024; independent review | Header quote CTA, orphan cards, grids fixed |
| 7 Interaction | Scripted: mega menu, mobile menu, viewers, FAQ, slider, form, routing | All pass |
| 8 Accessibility | axe (WCAG 2.2 AA plus best practice) on all routes at 2 widths; keyboard, forced-colors, reflow; independent review | 0 axe violations; forced-colors, focus and contrast issues fixed |
| 9 Technical | Console, links, anchors, metadata, JSON-LD, requests, no-JS, size | Clean; all requests same-origin |
| 10 Fresh-eyes launch review | Independent UX/conversion reviewer plus my final sweep | Findings fixed |

## Deliberate decisions
- The enquiry form opens the visitor's own email app (mailto) with the message written for them, says plainly that nothing has been sent, and offers a copy button, the phone number and the email address. No email backend was included in the file, so none is claimed.
- Stock photography is labelled where it sits beside business claims; the privacy page says so too.
- Structured data uses only facts from the business's own site.

## Not done, because it would need facts that are not public
Turnaround times, regulator or operator IDs, insurance cover, testimonials, sample deliverables. Add them if and when the business can supply them.

## Immersive pass (GSAP / ScrollTrigger / Lenis restored and rebuilt)
- Vendored offline in `src/vendor/` (GSAP 3.15, ScrollTrigger, Lenis 1.3), bundled into the deploy package and inlined in the single file. No network requests.
- Router lifecycle: `UAV.motion.kill()` reverts the page `gsap.context` and `gsap.matchMedia` before content swaps; trigger counts stay flat across route cycling (`tools/qa/t_motion2.js`).
- Layers: Lenis smooth scroll on the GSAP ticker; masked word reveals on headings; scrubbed statement; counters; velocity-reactive marquee; pinned three-step story (desktop); layered SVG scenes (back/mid/front) with scroll and pointer depth, one scene per service; atmosphere canvas on dark sections; pointer trail (distance-based emitter); section aura; inspection lens; magnetic buttons; card tilt + spotlight; drone companion with a capture-a-frame control; route curtain.
- Guards: reduced motion and no-JS render the complete static design; cursor, trail, lens, tilt and magnetic are fine-pointer only; offscreen animation paused; DPR capped at 2.
- Results: axe 0 violations; nav, interaction, form, regression, layout and deploy suites pass; 59 fps scrolling in headless Chromium; console clean on all 12 routes at desktop, mobile and reduced motion.

## Redesign pass
- Hero: chamfered viewfinder frame (reticle, thirds grid, capture), clean paper background; roof-gable cutout and roof-outline scene removed.
- Services: expanding panels (desktop), stacked cards (mobile). Story section: native sticky scene scrubbed by scroll, replacing the pin that went blank under wheel scrolling (`tools/qa/t_blank.js` checks 1280/1366/1920 widths).
- Process and workflow steps: drone rides a timeline rail. Scroll rail with drone, drawn kickers and seams, hover micro-interactions (arrow swap, lock-on corners, sheen, icon redraw).
- Cursor trail reduced (64 motes, longer spacing, no idle emission). "Stock photo" labels and wording removed from the UI and alt text.
- Results: axe 0 violations; nav, interaction, form, regression, deploy and motion suites pass; layout suite flags only clipped decorative layers.
