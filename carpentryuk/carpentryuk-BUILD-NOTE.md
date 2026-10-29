# Carpentryuk homepage preview: build note

**File:** `carpentryuk.html` (single self-contained file, 2.1 MB; fonts, logo and 21 photos embedded as base64)
**Built:** 2026-10-29
**Direction:** "Measured twice". Every section is a sheet from a joiner's drawing board. Hand-built technical SVG drawings (a roof truss, kitchen elevation, extension section, door and architrave, pergola, staircase, dovetail) sit in the background and foreground and answer the cursor through real carpentry tools. Stephen's own photos are the "built" result.

## What I actually read in WEB-SKILLS.md (stated plainly)

- **Not read in full.** The file is 22 MB (about 5.5M tokens). Its own protocol says not to read the full skills zone.
- **Index and protocol.** I read the protocol, the recommended packs, the library map and the whole index. Every one of the 1,504 entries was read as name plus description. Parts 14, 16, 19 and 20 (video, brand systems, checklist rules) were read as names or truncated descriptions only.
- **Pack.** I chose a pack of about 115 skills.
- **Read in full (main text):** S0001, S0223, S1320, S0214, S0659, S1314 (with its pattern library), S0471, S0441, S1465, S0658, S0212, S0407, S0361, S0425, S1363, S0667, S1433, S1430, S1450, S1442, S1440, S1494.
- **Read in part (first 40 to 70%):** S1324, S1323, S1329, S1209, S1169, S0074, S0410, S0063.
- **Quick-reference rules only:** S1259, S1248, S1128, S1190, S1224, S1066.
- **Selected but not opened.** The rest of the pack (e.g. S0006, S0095, S1303, S0075, S0059, S0070, S0526) was selected and not opened.

**Where the brief overrode a skill:**
- S1320 and S0471 forbid model-drawn SVG illustration. The brief demands SVG as the main event, so I kept every drawing to technical elevations and sections (a measured-drawing genre), never mascots or scenery.
- S0001 flags cream, serif and rust as an AI tell, but these are the client's own identity colours. S0001 itself says the brief wins.
- S1320 asks for GSAP plus a smooth-scroll engine. I used vanilla JS with Web Animations to keep one small file, and native scrolling, so there are no scroll traps (S1209).

## Section by section

| Section | What's there | Cursor or background behaviour | Click or tap behaviour | Skills |
|---|---|---|---|---|
| Header | Exact logo, cropped by CSS only and byte-identical to the supplied file. Services mega menu (5 services, line icons, photo preview). Portfolio, Testimonials, About and Contact as `#` links. Phone button. Mobile sheet menu. | Tape-measure scroll progress along the header edge. Magnetic phone button with ringing handset. Icons redraw on hover. | Mega menu by hover, click or keyboard (ArrowDown, Esc). Service links open that service and scroll to it. | S1450, S0189, S0405 |
| Hero | "From a single door to a new roof." (his own line), a call button, a quote button, Stephen named. 4-photo stage with drawing rulers. | Roof truss drawing draws itself, then sits faintly behind the hero. A rust plumb bob drops in and swings when the cursor brushes its string (real pendulum physics). Over the photo: a joiner's loupe (2.3x), crosshair, and live markers on both rulers. | Click, tap or Enter cuts to the next job with a saw-tooth wipe. Touch: drag sideways for the loupe. | S1324, S0407, S0361, S1329 |
| Values | His positioning words: quality craftsmanship, reliable service, integrity, precision, customer satisfaction. | SVG wood grain with knots that parts around the cursor (spring physics). The spirit level tilts with cursor position and reads in degrees. Touch: the level settles as you scroll, and the grain parts as a "plane" passes. | Hovering or clicking a value snaps the level dead level and underlines the word. | S1363, S0441 |
| Services | All five services in his words, as an accordion. A drawing board shows a technical drawing per service. | T-square crosshair follows the cursor and snaps to the hovered row. | Hovering a service draws its elevation, which then crossfades into his real photo ("drawn first, then built"). Click to toggle drawing and photo. Opening a row shows 3 photos (lightbox). On mobile the board moves inside the open panel. | S0361, S0407, S1440 |
| Design and build | His architects-and-trades line, with a section drawing of an extension. | Layers draw in order as you scroll (footings, walls, floor joists, roof joists, roof lantern). Moving across the drawing pulls the layers apart into an exploded view. | Click names the parts. "Pull it apart" and "Name the parts" toggles. Two roof photos. | S0361, S1325 |
| Recent work | 10-photo editorial grid. | Sawdust falls from the cursor and settles under the photos, emitted by distance. Hover draws corner brackets and slides up a caption. | Click opens a lightbox that grows out of the photo (arrows, swipe, Esc, focus trap). | S1323, S1363 |
| Coverage | Tamworth, the Midlands and nationwide, with his address. | A pair of compasses pinned on Tamworth follows the cursor and leaves a pencil trail. The Midlands or Nationwide ring lights up as the compass reaches it. | Click and the compass swings round to scribe a full circle. | S0407 |
| Quote | FormSubmit form (name, phone, optional email, job type chips, message), plus the big phone number and details. | Squared graph paper lights up around the cursor (a carpenter's notebook). | Inline validation on blur. A pencil tick on valid fields. A dovetail joint closes as the 3 required fields are completed ("0 of 3" to "3 of 3"). | S1442, S0661, S1324 |
| Footer | Wordmark, phone, email, address, all links, and an "Animation" on/off switch that is remembered. | A tape measure pays out to the cursor, with cm markings. | Click snaps the tape back. | S1190, S0400 |
| Everywhere | A mobile sticky call bar after the hero. Word-by-word heading reveals. | | A crow's-foot pencil mark (the V carpenters mark with) appears wherever you click on plain paper. | S1329, S1259 |

**Also included:**
- `noindex` meta.
- LocalBusiness JSON-LD, verified facts only.
- A skip link and visible focus on everything.
- Reduced motion: final states everywhere and no physics. The footer switch offers the same (WCAG 2.2.2).
- Every animation loop sleeps when idle or off-screen.
- The tracker beacon is included verbatim from the config file, just before `</body>`.
- No reviews, ratings, years, prices or guarantees anywhere.
- No em dashes in the copy.

## Audit loop: 6 rounds

**Round 1 (static, desktop 1440 and mobile 375):** 13 defects.
- Desktop showed the mobile buttons (CSS cascade).
- Every SVG draw-on stayed invisible. Chrome dropped the drawn-state transition because of a `calc(var())` delay. I rebuilt the draw engine on the Web Animations API.
- Truss labels and the centre line collided with the hero copy.
- The logo was too small.
- The service photo showed under the drawing from the start.
- The compass covered the "Midlands" label.
- The dovetail overran its column.
- Footer email wrapping.
- The services "+" icons were blank (CSS can't style strokes through `<use>`).
- The mobile Call button wasn't full width.
- The truss sat behind the mobile headline.
- The sawdust pile crossed into the next section.
- The phone number's zero looked small (fixed properly in round 5).

**Round 2 (static):** 7 defects.
- The truss was too strong behind text: opacity cut, a paper halo added, ghost buttons made opaque.
- The kitchen chimney cut through a dimension label.
- Empty space in the quote column (now sticky).
- The spirit level was a 22px sliver on mobile (now cropped to the vial).
- The build drawing came after the photos on mobile.
- Desktop-only wording was shown to touch users.

**Round 3 (scripted interactions: hover, click, type, drag, keyboard, lightbox, reduced motion):** 10 defects.
- The loupe showed the old photo mid-cut.
- Mega menu row gaps.
- The lightbox photo covered its caption.
- When the build was pulled apart, labels collided and a dimension hit the lantern.
- Sawdust was too faint.
- The form error status didn't clear.
- "Show the photo" wrapped on mobile.
- The lightbox backdrop showed the page through.
- The quote section had no background behaviour of its own, so I added the graph paper.

**Round 4:** 3 defects.
- The headline had a lone "single" line. It's now 3 lines at 1280 and up, and 4 at 1024.
- The plumb line sat too close to the headline.
- Rulers were built before fonts loaded, and a stray "rise" dimension sat at the edge.
- Keyboard order, focus rings, the mega menu keys, the animation switch (persists), `noindex`, tracker placement, form action and alt text all pass.

**Round 5:** 2 defects.
- The real cause of the thin zero was Besley's tabular-figure zero. Fixed.
- The grain loop ran at idle. Fixed. Measured idle animation frames per section: all settle to 0.

**Round 6 (copy truth check):** 1 defect.
- Re-reading every caption and line against the verified facts, I found timber species I had guessed from the photos ("oak" in 3 captions and 3 alt texts). There were also four soft over-claims: "fitted by us", "one firm to call", a data-use promise, and "speak to Stephen directly".
- All replaced with neutral, verified wording ("Internal door", "Shaker-style kitchen", his own "Design and build complete extensions to your needs", "Ask for Stephen Nicholls").
- Rebuilt and re-shot. Clean.

**Final pass, clean:**
- No JS errors.
- No horizontal overflow at 375, 1024, 1280, 1440 or 1920.
- At 1280×800 the headline, sentence and call button are above the fold.
- Firefox smoke test passed with no errors.

## Things to know before sending

- **FormSubmit:** the first real submission sends an activation email to carpentryuk.phone@googlemail.com. Enquiries only arrive after Stephen clicks it. I did not submit the form.
- **Tracker:** the beacon request fails inside this sandbox (outbound network blocked). That is expected here. The snippet itself is exact.
- **Testing scope:** Chromium and Firefox via Playwright only, with touch emulated. Not tested on a real phone or in Safari. The touch-drag loupe gesture was code-reviewed, not simulated.
- **Image wording:** captions only describe what each photo visibly shows (e.g. "Timber porch canopy", "Internal door"). No timber species are named anywhere. Stephen can add those if he wants them.
