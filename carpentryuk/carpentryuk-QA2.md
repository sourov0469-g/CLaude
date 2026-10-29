# Carpentryuk homepage: QA2 notes

**Page:** `carpentryuk/carpentryuk.html`, improved in place.
**Pristine pre-QA2 copy:** `carpentryuk/carpentryuk-v1-backup.html`. It has not been touched (2,186,784 bytes, sha256 `9e8e32e8…7bd9d`).
**Screenshots:** `carpentryuk/carpentryuk-qa2-shots/`. `audit/` holds the first-pass frames and states. `before-after/` holds each changed section. `final-pass/` holds the closing re-audit.
**Status:** done. A full re-audit at desktop and mobile, visual and code together, found nothing left worth changing. Final verification passed (see the end of this file).

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

### Chunk 2: copy and hierarchy

| # | Class | Finding (evidence) | Change | Result |
|---|---|---|---|---|
| 2.1 | Improvement, P2 (S0650 headline length, S1501 weight) | **Coverage heading.** "Based in Tamworth. Working across the Midlands, and nationwide." is 9 words and set in 5 display lines at both 1440 and 375. That is the heaviest block on the page. It also repeats the hero lead and the footer line almost word for word. Shots: `before-cover-1440`, `before-cover-375`. | The heading is now "Tamworth, the Midlands, and nationwide." It reads like the compass beside it, from the pin outward: Tamworth, the Midlands ring, then the nationwide ring. "Based in Tamworth, Staffordshire." moves to the start of the lead. Every fact is unchanged and in his words. | 3 lines at both widths. On phones the compass now comes into view on the section's first screen. Shots: `after-cover-1440`, `after-cover-375`. |
| 2.2 | Slop pattern, P2 (S1314 §9, repeated copy) | **Repeated sentence.** The Home extensions row in Services said "Working with local architects and trades, we can offer a complete design and build package to suit you." The Design and build section's lead, two screens later, says exactly the same. | The services row now says "Complete design and build, with local architects and trades." That matches the mega menu. The full sentence stays where it belongs, in the extensions section. | The row is one line at 1440, like its neighbours. Shot: `after-services-1440`. |
| 2.3 | Defect, P3 (spacing system) | **Quote lead spacing.** The quote lead sat 16 px under its heading. Every other lead on the page sits 24 px under. The descenders of "your job." nearly touched it. Shot: `before-quote-1440`. | Changed to the shared 24 px step (`--s-5`). | Same rhythm as the hero, build and coverage leads. Shot: `after-quote-1440`. |
| 2.4 | Improvement, P3 (S1473 #1, system status) | **Joint caption.** When the three required fields were valid, the dovetail closed and the count read "3 of 3", but the caption still said "Fill in the form to close the joint." Shot: `before-quote-filled-1440`. | At 3 of 3 the caption reads "Joint closed. Ready to send." It goes back if a field is cleared. | Shot: `after-quote-filled-1440`. |

### Chunk 3: interaction and motion

| # | Class | Finding (evidence) | Change | Result |
|---|---|---|---|---|
| 3.1 | Defect, P2 (S1314 §4 "buttons re-flow", S0049 toggle naming) | **Build toggle.** Pressing "Pull it apart" renamed it "Put it back together". At 375 the longer label pushed "Name the parts" onto a second line, so the controls jumped under the thumb. A toggle with `aria-pressed` should also keep its name, so screen readers announce "Pull it apart, pressed". Shot: `before-build-chips-375`. | The chip keeps its name. The dark pressed fill, the same one "Name the parts" uses, and `aria-pressed` carry the state. | The chips stay on one row at 375 in both states. Shot: `after-build-chips-375`. |
| 3.2 | Defect, P3 (S0063 staging, modal dims background) | **Lightbox backdrop.** At 97% opacity, the tiles, their white captions and the header showed through around the photo on phones. The surface was busy behind a viewer whose only job is one photo. Shot: `before-lightbox-375`. | Backdrop is now solid `--ink`. The open and close fades are unchanged. | Shot: `after-lightbox-375`. |
| 3.3 | Polish, P3 (S0063 / S0089 sub-300 ms UI) | **Two UI transitions ran at 420 ms.** These were the service accordion opening (a click), and the values underline (a hover, which happens tens of times a visit) on a strong expo curve. | Accordion 300 ms ease-out. Values underline 260 ms (`--d-fast`) ease-out. | Both feel immediate. The scroll reveals, line drawing, sawdust and other story motion are unchanged. They are explanatory, not UI feedback. |

### Chunk 4: found in the full re-audit

| # | Class | Finding (evidence) | Change | Result |
|---|---|---|---|---|
| 4.1 | Polish, P3 (S1314 §4 widows) | **Compass hint widow.** On phones the compass hint wrapped with "circle." alone on its second line. It's a `figcaption`, so it missed the `text-wrap: pretty` that every `p` on the page gets. Shot: `before-cover-hint-375`. | `text-wrap: pretty` added to the hint. | It now breaks as "…Tap to scribe / a circle." Shot: `after-cover-hint-375`. |

The re-audit frames and states are in `final-pass/`. That covers desktop and mobile frames for every section, plus mega menu, service open, lightbox, build labels and pull-apart, mobile menu, mobile form errors and mobile lightbox. After 4.1, nothing left was worth changing.

## Deliberately left alone, and why

- **Section dividers.** The pack asks for "quiet unique shape dividers per section". The page already marks each sheet by alternating paper and deep-paper, and it already carries the header tape measure, the stage rulers, the wood grain, the graph paper and the footer tape. Ornamental dividers on top would stack decoration doing the same job (S1314 "decorative stacking"). By the Removal Test they'd add nothing the colour change doesn't already say.
- **Identical section padding.** Every sheet uses the same `--section-y`. Here that steady beat reads as one drawing set, and no section is sparse or crowded next to its neighbour. Changing it for variety's sake would be spacing as spectacle.
- **Values list offset.** "Precision" sits a little left of the centre vial. Centring it made the gaps uneven, which looked worse (1.3).
- **Testimonials link goes nowhere (`#`).** The pack says the menu mirrors his live site (Services, Portfolio, Testimonials, About, Contact). He has no published reviews, so there is nothing to link to, and the page invents none.
- **Mega menu opens in 260 ms.** That is just over S0063's 150-250 ms band for a small dropdown. This is a full-width panel with a photo, and 260 ms keeps it from popping. Closing stays at 180 ms.
- **Story motion over 300 ms.** The word reveals, the truss drawing, the saw-cut photo change, the plumb bob, the grain, the compass and the tape measure are explanation and craft, not UI feedback. They all have a reduced-motion path, the footer switch turns them off, and every loop sleeps when idle.
- **Skip link slides in on keyboard focus (180 ms).** It's a one-time, short movement. Removing it would make the link appear from nowhere at the top-left.
- **Low-resolution photos.** A few are his own small files (the Shaker kitchen is 640×360). They are shown no larger than the grid needs, and each is his real work.
- **Unused `--ease-in` token.** It's declared but never used, so it has no effect.

## Final verification (in the browser)

All results come from `verify.mjs` (Chromium, all non-`file:` requests blocked). Every check passed.

**Overflow and console:**
- No horizontal overflow at 375, 1024, 1280 and 1440, and also at 360, 768 and 901. In every case `scrollWidth` equals `clientWidth`.
- No console errors at any of those widths, during desktop interactions, during mobile interactions, or under reduced motion.

**Mega menu:**
- Opens on hover and closes on Esc.
- ArrowDown opens it and focuses the first link, and the arrow keys move between links.
- A link opens its service row and scrolls to it.

**Loupe and hero photo:** the loupe shows over the photo, and a click saw-cuts to job 2 of 4.

**Accordion:** opens with `aria-expanded="true"`, reaches full panel height, and closes again. On mobile the drawing board moves inside the open panel.

**Lightbox:**
- Opens with focus on Close.
- ArrowRight goes to the next photo (3 of 10, then 4 of 10).
- Tab stays inside it.
- Esc closes it and returns focus to the tile.

**Build:**
- "Pull it apart" sets `aria-pressed="true"`, keeps its name and lifts the layers.
- "Name the parts" shows the labels.

**Form validation:**
- An empty submit is blocked, all three required fields are flagged, the status line explains, and focus goes to the first field.
- Valid input clears the errors and closes the joint: "3 of 3. Joint closed. Ready to send."
- A bad optional email is flagged on blur.
- The form posts to `https://formsubmit.co/carpentryuk.phone@googlemail.com`. I did not submit it.

**Animation switch:** sets `html.rm`, stores "off", reads `aria-checked="false"`, and survives a reload.

**Mobile:**
- The menu opens with focus on Close, and a link closes it and lands on the section.
- The sticky call bar is hidden over the hero, shows after it (`tel:+447854823288`), steps aside at the footer, and steps aside while a field has focus.

**Reduced motion (`prefers-reduced-motion: reduce`):**
- 0 hidden headings or blocks.
- The truss is fully drawn, and the build drawing is complete.
- No physics, and no errors.

**Keyboard:** a visible focus ring on each of the first 40 tab stops.

**Guardrails (checked against the backup):**
- **Logo:** byte-identical. All 22 embedded images and both fonts are byte-identical too.
- **Phone:** "07854 823 288" appears 11 times, with 15 `tel:+447854823288` links. The header, hero and call bar are unchanged.
- **Head and tracker:**
  - `noindex` is present.
  - The tracker beacon script is identical, and it is the last thing before `</body>`.
  - The beacon never fired during QA (blocked).
- **Copy:**
  - No em dashes and no en dashes.
  - The visible text diff against the backup shows only the lines changed in 2.1 and 2.2, the earlier run's caption reorder and values trim, and the joint and touch wording.
  - No new claims, reviews, ratings, years, prices, guarantees or timber species.
- **Backup:** `carpentryuk-v1-backup.html` is still 2,186,784 bytes, with sha256 `9e8e32e88aeaff5744f79777bab73d6a70e1ca156f90822d83146b8ef5c7bd9d`. It was never written to.

**Not covered:**
- Firefox is not installed in this environment, so there is no Firefox pass this time. The v1 build note records one.
- Not tested in Safari or on a real phone. Touch was emulated in Chromium.

---

## Round 2: client feedback (logo, hero, services board, mobile)

**The feedback:**
1. Use the exact logo from their current site, with the exact colours.
2. The hero has too much going on. Keep the pendulum, and lose the extra static lines.
3. In Services, hovering should show the drawing and then the real photo automatically, with no button to press.
4. Make it feel great on phones.

Skills re-read for this round:
- `visual-hierarchy`
- `responsive-design`
- `gesture-patterns`
- `fitts-law`
- `emil-design-eng`
- the judging notes' motion, hierarchy and slop rules.

### 2a. Exact logo and palette, taken from carpentryuk.com

**Source:** https://carpentryuk.com/ (fetched 2026-10-29). The header logo is `wp-content/uploads/2026/05/ext-custom-logo-1777959072130.webp`.

- **Logo file.** Downloaded from the live site, it is byte-identical to the file already in the page: 91,248 bytes, sha256 `67786195…b35ca24`. The file itself was always right.
- **What the page got wrong: how their site draws it.**
  - **Colour.** Their header passes the logo through WordPress's duotone filter (`wp-duotone-primary-foreground`), which turns the black saw into their rust `#7A2812`. The page showed it black.
  - **Wordmark.** "Carpentryuk.com" is set in **IBM Plex Sans Bold**, not a serif. Their heading-font variable is undefined, so the site title falls back to the body font. The page used Besley.
  - **Size.** Measured in a browser on the live site at 1920, 1440 and 375:
    - logo image 42×42;
    - an 8 px gap;
    - wordmark at 20 px, weight 700, letter-spacing -0.4 px, colour `#171511`;
    - wordmark box 157×27.
    The page showed the saw at about twice that size.
- **Change.**
  - The page now carries their exact duotone `<filter>`, copied from their HTML, and applies it to the logo image. The logo bytes are untouched.
  - The image sits at 42×42, with an 8 px gap.
  - IBM Plex Sans Bold is embedded. It is their own theme file from carpentryuk.com (60,192 bytes), unmodified, under the SIL OFL.
  - The wordmark is set at their 20 px, 700, -0.4 px, `#171511`.
  - The phone sheet uses the same lockup.
  - The footer uses it too, in the paper colour on its paper tile. A rust saw straight on the dark footer would fail contrast.
- **Result.** Measured in our page: logo 42×42, wordmark 157×27, same font, size, weight, tracking and colour. The logo-to-wordmark offset is 50 px, the same as live. The live-vs-page shots look identical at 1440 and 375. Under 360 px the lockup steps down slightly (38 px logo, 18 px wordmark), so both 44 px header buttons still fit at 320.
- **Palette.** Their theme colours: background `#F3EFEC`, foreground `#171511`, primary `#7A2812`, secondary `#3D4235`, tertiary `#E2E1DD`. The page already used the first four exactly. The alternate sheets (values, design and build, coverage) used an invented warm `#EBE6E0`; they now use their tertiary, `#E2E1DD`. The image-well shade is one step deeper in the same grey. Body copy on `#E2E1DD` measures above 4.5:1.
- **Shots:** `round2/logo-live-vs-page-1440`, `round2/logo-live-vs-page-375` (live on top, page below), `round2/after-logo-header-320-360-375`, `round2/after-logo-footer-1440`, `round2/after-palette-values-1440`.

### 2b. A calm hero: one signature move

- **Finding.** Around the plumb bob, the hero carried several static line layers:
  - a full roof-truss drawing behind the copy, crossing the headline and the lead;
  - a ruler along the top of the photo and another down its left side;
  - a dimension line and a bottom chord under the whole hero;
  - paper "halo" text-shadows on the lead and caption, there only to lift text off those lines.

  That is several decorative layers doing the same job (S1314 "decorative stacking"), and they compete with the one move that works, the pendulum (S1501: one primary emphasis per view).
- **Change.** Removed the truss, both rulers, the photo crosshair lines, the dimension lines, the halos and the caption's blurred backing. Also removed the JS that drew and rebuilt all of these.
  - **Plumb bob.** It now hangs from a small nail in the middle of the gap between the copy column and the photo, level with the photo's top edge. The line runs down beside the picture, like a carpenter checking the frame is true. Its drop-in, swing, cursor brush and reduced-motion state are unchanged.
  - **Loupe.** It stays on the photo. It appears only while you're over the photo, so nothing is drawn there at rest.
  - **Photo.** It gains the 34 px the rulers took.
  - **Bottom padding.** Back to a normal step, since there is no truss chord to clear.
- **Result.** The hero is now headline, lead, call, quote, a note, the photo and its caption, plus the pendulum, with nothing else drawn. Checked at 1440, 1280 (with the loupe), 1024 and 375. The bob clears both columns at every desktop width. On phones the pendulum stays off, as before: the columns stack and there is no gap for it to swing in. The phone hero is just copy, buttons and the full-width photo.
- **Shots:** `round2/hero-before-vs-after-1440` (before on top), `round2/hero-before-vs-after-375` (before, after, before, after), `round2/after-hero-1024`, `round2/after-hero-1280-loupe`.

### 2c. Services board: drawing, then the photo by itself, plus a phone pass

- **Finding (UX).** Hovering a service drew its elevation, then waited 2.6 s before swapping to the real photo. On phones there was a "Show the photo" text button under the board. The photo felt hidden behind a control: one more step, and a toggle that changed its name. Moving down the list also restarted the board on every row the pointer crossed.
- **Change.**
  - **Drawing.** It now draws faster: 0.65 s per stroke with a 45 ms stagger, so the last line lands at about 1.1 s.
  - **Photo.** At 1.15 s the real photo sweeps in over the drawing from left to right: a `clip-path` reveal, 0.85 s on a strong ease-in-out curve. The pencil lines fade out a beat after the sweep starts, so you see it drawn first, then built.
  - **No button.** The "Show the photo" button is gone, and so is its JS. The caption just names the service.
  - **Replay.** Click or tap the board to watch it drawn and built again.
  - **Hover intent.** A 100 ms delay, so only the row you stop on changes the board.
  - **Reduced motion.** No drawing animation and no wipe. The photo fades in after 0.9 s.
- **Phone pass (`responsive-design`, `fitts-law`, `gesture-patterns`).**
  - **Accordion jump.** Opening a lower service while an upper one was open closed the upper panel. The tapped row slid up off-screen, and a row near the bottom of the screen opened its drawing below the fold. Once the panel opens (320 ms), the row's header is now brought to the top if it ended up off-screen or low. Tested: the tapped "Carpentry services" row went from 321 px to 80 px, just under the header. The drawing then completes and the photo sweeps in, all in view.
  - **Touch targets at 375.** These were measured under 44 px:
    - the big quote-section phone number (34 px);
    - the coverage phone and email links (27 px);
    - the quote-side email (27 px);
    - the three value words (39 px);
    - every footer link (36 px).

    On touch screens they are now at least 44 px tall (the phone number 48 px). On a mouse nothing changes. The header brand and footer brand links are 44 px tall too.
  - **Gesture alternatives.** Every gesture has a tap alternative:
    - the hero photo: tap for the next job; dragging sideways only opens the loupe;
    - the lightbox: swipe, or its 48 px arrows;
    - the compass: drag, or tap.
  - **Pendulum.** It stays desktop-only (see 2b).
- **Result.** Shots: `round2/services-board-sequence-1440` (0.15, 0.6, 1.1, 1.45 and 2.3 s after hover: drawing, complete, photo sweeping, photo in) and `round2/services-board-sequence-375` (tap, scroll into place, drawing, then photo).

### Round 2 verification (Chromium, all non-`file:` requests blocked)

**Result:** 57 checks pass, 0 fail, and the Firefox check is skipped. 47 of the 48 round-1 checks are kept and still pass. The round-1 truss check is replaced, since the truss is gone. The other 10 are new.

**New checks:**
- **Board:**
  - hover shows the drawing first;
  - the photo follows by itself;
  - no "Show the photo" button remains;
  - hover intent ignores the rows crossed on the way.
- **Logo:** the duotone filter is applied, the logo is 42 px, and the wordmark is IBM Plex Sans 700, 20 px, `#171511`, with the font loaded.
- **Phones:**
  - the tapped row stays in view when a row above closes;
  - the board builds itself inside the panel;
  - no tap target under 42-44 px, inline text links aside.
- **Reduced motion:** no truss or rulers, the plumb bob at rest, and the board shows the photo with no wipe.

**Overflow and console:** no horizontal overflow and no console errors at 360, 375, 768, 1024, 1280 and 1440.

**Guardrails:**
- **Logo:** the embedded logo is byte-identical to the live file.
- **Font:** the embedded IBM Plex Sans Bold is byte-identical to their live font file.
- **Images:** all 22 photos are unchanged from v1.
- **Tracker:** identical, and still the last thing before `</body>`. It never fired during QA.
- **Head and form:** `noindex` is present, and the FormSubmit action is unchanged.
- **Copy:** no em or en dashes. The phone number appears 11 times. The only visible text change this round is the removed "Show the photo" button.
- **Backup:** untouched, at 2,186,784 bytes.

**Page size:** 2,271,111 bytes. The extra ~80 KB is the embedded wordmark font.

**Full re-shoot after round 2:** `round2/final-d-0`, `final-d-1` (desktop) and `round2/final-m-0` to `final-m-2` (phone).

**Not covered:** no Firefox (not installed here), no Safari, no real phone. Touch was emulated in Chromium.
