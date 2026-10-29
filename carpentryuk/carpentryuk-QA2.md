# Carpentryuk homepage: QA2 notes

**Page:** `carpentryuk/carpentryuk.html`, improved in place.
**Pristine pre-QA2 copy:** `carpentryuk/carpentryuk-v1-backup.html`. It has not been touched (2,186,784 bytes, sha256 `9e8e32e8…7bd9d`).
**Screenshots:** `carpentryuk/carpentryuk-qa2-shots/`. `audit/` holds the first-pass frames and states. `before-after/` holds each changed section.
**Status:** in progress. This file is updated after each committed chunk.

## Where this run happened, and what that changed

- **Paths.** The brief's paths point at `~/workspace/previews/`. In this repo the page, pack and build note live in `carpentryuk/`, so the notes and shots sit next to the page there.
- **Starting point.** This is a restart of the QA2 run frozen by the 08:28 machine restart. `carpentryuk.html` already held about 40 of that run's edits, but no notes. I kept them and checked each one in the browser (see "Inherited from the interrupted run"). I never copied anything over the backup.
- **Skills book.** `WEB-SKILLS.md` (22 MB) is not in this repo or anywhere on this machine. I worked from the distilled judging layer in `state/web-skills-judging-notes.md`. I also loaded, in full, the local copies of the judging-pack skills listed below.
- **Tracker beacon.** The page fires a beacon to builtbyasiful.com on load. Every browser run blocked all non-`file:` requests, so no QA load counted as a visit. The beacon is still in the page, unchanged.

## Skills read

**Judging notes, read in full:** `state/web-skills-judging-notes.md`. This covers:
- the catalog map and the judging pack (S0001, S0049, S0050, S0063, S0083, S0089, S0220, S0241, S0242, S0502, S0650, S1306, S1314, S1320, S1473, S1479, S1482, S1496-S1502);
- the distilled rules for motion, type, spacing, colour, the banned patterns, the UX laws, the scoring systems, the compliance checklist, scroll pages and the dials.

**Skills loaded and read in full (local copies of judging-pack entries):**
- `critique-composition` (S1498): balance, whitespace, rhythm, gestalt.
- `spacing-system`: 4/8 px scale, stack, inset and inline spacing.
- `review-animations` (S0063 with its STANDARDS appendix): the ten standards, durations, easing, frequency law, hover gating, reduced motion.
- `critique-typography` (S1500): scale, readability, consistency, tokens.
- `audit-ai-design-slop` (S1306): classes, the Removal Test, P0 to P3.
- `no-ai-design-slop` ARTICLE.md (S1314 pattern library): sections 2 (composition), 3 (containers), 4 (typography), 8 (motion), 9 (copy and proof) and 10 (quality), plus the high-signal clusters.

**Design read (S0650):** a trade homepage for homeowners in and around Tamworth, written in a calm, plain voice and leaning toward a joiner's drawing board. My dials are variance 6, motion 6, density 3. The concept is kept, and the brief wins over S0001's cream, serif and rust flag, as the build note already says.

## Method

- Chromium through Playwright, loading the file itself.
- **Frames.** I walked the whole page once so every reveal fired, then shot each section at 1440×900 and 375×812 (touch, DPR 2). Sections taller than one screen got extra scroll positions. I also shot full pages at 901, 1024 and 1280.
- **States.** Hero call and quote hover, loupe, mid saw-cut, mega menu open, service rows hovered (drawing, then built), a service row open, values hover, build pulled apart and labelled, work tile hover, sawdust, lightbox and its next photo, compass moved and scribing, form part-filled with errors, submit with errors, form valid, footer tape. On mobile: menu sheet, service row open (drawing, then built), build labels and pull apart, lightbox, form typing and form errors.
- **Colour checks** were made on PNGs. JPEG compression faked a pale box around the hero caption, which a PNG showed was exactly the paper colour, so that was not a finding.
- **Each fix** was edited in the source with an exact-match replace (one match or the edit stops), reloaded, re-shot and judged again before commit.

## Inherited from the interrupted run (kept, checked in the browser)

| Area | What the earlier run changed | Checked |
|---|---|---|
| Header | Logo crop window tightened (66×26, 52×20.5 under 900, 44×17.5 under 360). Logo bytes untouched. | Sharp at 1440, 375 and 360. |
| Nav | Portfolio, About and Contact now go to `#work`, `#values` and `#quote`. Testimonials stays `#`, since the page carries no reviews. | Links scroll to the right sheet. |
| Hero | Plumb bob hung from the truss apex, so it always sits in the gap between copy and photo. Taller bottom padding. Caption gets a soft paper backing over the truss. On phones the truss is masked down to its lower chord. | The bob clears both columns at 1024, 1280 and 1440. |
| Values | Heading carries "Quality craftsmanship and reliable service", so the list keeps the other three values (no repeat). The level stays dead level while you are on a value. | Works with hover and focus. |
| Services | The first photo of each service is already on the board, so the panel shows the other two at 4:3. The board frame fades when the photo shows. Drawing notes are bigger, so they never render under about 10 px. | Seen at 1440 and 375. |
| Build | Labels at 17 px. On phones the sheet is wider and the drawing slides over to make room for the part names. | Seen labelled and pulled apart at 375. |
| Work | Grid rebuilt as four full bands, with tile widths following each photo's shape. | No gaps or empty cells at 1024, 1280 or 1440. |
| Form | Field edges darkened to 3.8:1 (WCAG 1.4.11). Errors for "too short" now differ from errors for "empty". The mobile call bar steps aside while a field has focus. | Error states shot. Bar hidden while typing. |
| Footer | Logo tile re-cropped. Wordmark scales on small phones. Bottom padding clears the call bar. | Seen at 375 and 1440. |
| Touch copy | Phones say "Tap" and "Drag" instead of "Click" and "Move". | Seen at 375. |
| Motion | Hover underlines and colour changes gated behind `(hover:hover) and (pointer:fine)`. Lightbox fade cut to 180 ms. | Code read. |

## Findings and changes

### Chunk 1: layout defects

| # | Class | Finding (evidence) | Change | Result |
|---|---|---|---|---|
| 1.1 | Defect, P1 | **Footer at 901-1180 px.** The 4-column grid is too narrow. At 1024 the "Carpentryuk.com" wordmark ran into the "Services" heading, and at 1120 it touched it. The email broke mid-word ("…googlemail.co / m"), and the address wrapped. Shots: `before-foot-1024`, `before-foot-1120`. | Between 901 and 1180 the brand gets its own row, with the big phone number set to the right. Below it sit three columns: Services, Pages, and a wider Get in touch. The footer email gets a `<wbr>` before the "@", so if it ever must wrap, it wraps there and not mid-word. | No collision at 901, 960, 1024, 1100, 1180, 1181, 1220, 1280 or 1440 (measured). The email holds one line at every width. Shots: `after-foot-901`, `after-foot-1024`, `after-foot-1120`. |
| 1.2 | Defect, P2 | **Spirit level on phones.** The SVG was cropped to the vial by its viewBox, but `overflow:visible` still painted the rest of the level past the gutters to both screen edges. It read as a band across the page, and its red ends were lost. Shot: `before-values-375`. | Under 700 px the level is drawn short, inside the crop: the body ends at 332 and 868, the red ends move in, and the two end vials slide in to sit either side of the centre vial. The SVG clips at its own box, and the tick path now sits under the red ends. | A whole level, red ends and three vials, inside the margins at 360 and 699. The full level is unchanged from 701 up. Shots: `after-values-375`, `after-level-360-699-701-820`. |
| 1.3 | Tried, reverted | Values list on desktop: "Precision" sits left of the centre vial. I tried a 1fr / auto / 1fr grid so it sat right under the vial. | It made the gaps uneven: 345 px on one side, 98 px on the other. That imbalance looked worse than the small offset, so I put back the equal gaps. | Unchanged from the start state. |

### Next chunks (planned)

- **Copy and hierarchy:**
  - The coverage heading runs to 5 lines on desktop and mobile.
  - The "Home extensions" summary repeats the build section's lead word for word.
  - The quote lead sits tighter under its heading than the other leads do.
  - The joint caption doesn't change when the form is complete.
- **Interaction and motion:**
  - The build toggle renames itself. It wraps the chips on phones, and a pressed toggle should keep its name.
  - The lightbox backdrop lets the page show through.
  - A few UI transitions run over 300 ms.
