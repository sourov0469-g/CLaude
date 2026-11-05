# GATE-FINAL — Section 11: FOOTER (the current footer, upgraded)

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (FOOTER block). **Owner's asks:** the owner likes the footer's design; upgrade it: lots of UI/UX improvement, more animation and interactivity. Locked facts exact; no link outside the website.

## 1. Self-audit of the old footer, then decisions

Old footer: six cream board-and-batten columns of different heights standing on a concrete sill, a small house at the end; boards stand up when the footer arrives. Faults: all six boards had the same weight (the phone and the address were small text among credentials); no actions (the "Book" link was a small text link on the Hours board, pointing at the firm's outside booking address in the earlier build); a dead link ("Try the job", a section that no longer exists); links to `#siding` and `#roofing` that do not exist on the page; the hours were a static list with no sign of whether the firm is open; phone and email could not be copied; the "Back to top" link was a small grey text; nothing reacted to the pointer; the cream boards did not match the sage ground of the final page; the long email broke mid-word.

**Decisions:** keep the design exactly (boards of different heights with a batten on the left, lap lines, the concrete sill, the little house) but in the page's own sage tints; add a **hierarchy** (the firm's name and promise and the two actions on top; Contact and Hours as the first two, larger boards; the rest after); a **drawn street behind the boards** that answers the pointer; a **live open/closed sign**; **copy buttons**; a real **back-to-top**; and keep every word the owner's own.

## 2. What was built

- **Locked facts, exactly:** (512) 550-0000 · 7801 N Lamar Blvd Suite C70, Austin TX 78752 · Mon–Fri 8–8, Sat 8–6, Sun 12–5 · "Since 2009; merged with Sanders Roofing & Exteriors in 2018." · GAF Master Elite · James Hardie Elite Preferred · President's Club 2025 · Andersen Certified Premier · BBB A+ · info@austinprosiding.com · "4.9 from 474 Google reviews" · the area towns as the old footer lists them. The build asserts every one is in the old footer's markup. The promise line is the hero's own published sub-line: "Siding, windows and roofing for Austin homes since 2009."
- **Top band:** the logo, the name and the promise; **Book a free inspection** (the lime key button, to `#booking`) and a pill with the phone (a `tel:` link).
- **The street:** a drawn row of sixteen parts (houses of four shapes, trees) in line art with deep-green roofs and lime windows, on a lime-tinted lawn, behind the tops of the boards (the boards stand in front like a fence). **Mouse over it and the houses near the pointer rise (a spring), their windows light up lime, their chimneys smoke and the trees thicken**; leave and they settle back. **On touch a tap makes the nearest house hop.** A sun (with slow rays) and two clouds drift by day; by night (before 6 am and from 8 pm, Chicago time) the sun and clouds are replaced by a **crescent moon, twinkling stars and lit windows**, and the strip takes a faint green tint. The little house at the end of the sill lights its windows at night too.
- **Hours board:** a **hanging door sign that swings gently** and reads **Open** or **Closed**; under it the line "Open now · Closes at 8 pm" or "Closed now · Opens tomorrow at 8 am" (or "Opens today at …"); **today's row is marked** with a lime dot. All of it is **computed in the browser from the locked hours (Mon–Fri 8–8, Sat 8–6, Sun 12–5) in America/Chicago, whatever the visitor's time zone**, refreshed every 30 seconds; a change from open to closed (or back) is announced politely. The three hours rows are the published text, unchanged.
- **Contact board:** the phone and the email (links), each with a **Copy** button: the click copies, the icon turns into a check and the button into a green "Copied" pill for two seconds, and a live region says "Phone number copied" / "Email address copied"; if the browser refuses the clipboard, a fallback tries `execCommand` and otherwise says "Select the text". Never leaves the page.
- **Other boards:** **Services** (a real list of 44 px links with an arrow that slides in on hover: Siding, Windows, Roofing, Try a colour, How a job runs); **Area** ("On your street" and the towns); **About** (the sentence, a small drawn timeline 2009 — 2018 that draws itself on arrival, and the reviews link); **Credentials** (five pills, each with its own small drawn mark).
- **Board behaviour:** each board lifts on hover with a lime cap drawn across its top edge; the heading icon tilts; link underlines draw in lime; the boards **stand up one after another when the footer arrives**, as before.
- **Sill:** concrete grey-green with a fine speckle, the copyright line (the old text) and a **Back to top** button (46 px): smooth scroll, focus to the brand link, the little house hops.
- **Internal links only:** `#booking`, `#services`, `#windows`, `#colours`, `#process`, `#area`, `#reviews`, `#top`, `tel:+15125500000`, `mailto:info@austinprosiding.com`; every `#anchor` exists on the page.
- **Reduced motion:** no arrival animation, no looping animation (sign, sun, clouds, stars), no transitions, the street does not react; the open/closed state and copy still work.
- **Weight:** 16.6 KB CSS + 6.9 KB JS (unminified); the markup, with the street, is 20.6 KB; no image, no library.

**Background treatment:** a dim sage ground (#F1F5F1 → #EAF0EB → #E2EAE4) with drawn contour lines and corner crop marks (own SVG), the street and its lawn, the boards in #F3F7F1 / #EEF4EA with #DFE8DD battens; nothing is pure white (checked by script).

## 3. Governing reference and WEB-SKILLS

**Governing reference: Apple's footer for the link hierarchy** (short columns under plain headings, the quiet legal line last), with **Graza** as the bar for the playful, physical micro-animation. **Transfers:** a clear order of importance, plain labels, nothing decorative in the way of a link. **Does not transfer:** Apple's neutrality; this footer keeps the owner's board-and-batten design and adds a drawn street; nothing is copied.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Footer | ⟦S1434⟧ visual-hierarchy: name and actions, then Contact and Hours (larger, taller boards), then the four secondary boards; ⟦S1426⟧ law-of-proximity: each copy button sits under its own value, each heading icon with its board; ⟦S0220⟧ anti-slop: only the old footer's words and locked facts; the street is generic houses (not real ones) |
| Element | links, hours | ⟦S1444⟧ one choice per board (a short list, a link or a pair of actions); ⟦S1454⟧ serial-position: Contact first, Hours second, credentials last, Back to top at the end of the line of sight; ⟦S1494⟧ plain labels (Copy, Copied, Open now, Closes at 8 pm, Back to top) |
| Motion | street, sign, boards | ⟦S1436⟧ animation-principles: spring rise of the houses, a pendulum sign, staggered boards, a hop with squash on the house; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transforms and opacity only, 16 custom-property writes on mouse move, no rAF loop of its own; ⟦S0400⟧ accessible-animation: reduced-motion path, no animation that carries information |
| Element | controls | ⟦S0054⟧ fixing-accessibility: real links and buttons, labelled copy buttons, a polite live region for copy and for open/closed changes, `role="contentinfo"`, 3 px focus rings; ⟦S1441⟧ fitts-law: every link and button ≥ 44 px (measured, including the phone and email links), Back to top 46 px |
| Site | weight | ⟦S0231⟧ web-performance: no image, no library, 23.5 KB of CSS + JS |
| Site | trust | ⟦S0453⟧ pricing/proof: credentials, the review count and the address are the firm's own; nothing is added |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `footer-1440-day-open.png`, `footer-1440-street-hover.png` (pointer over the street), `footer-1440-copy-hover.png` (the Copied pill, a services link hovered, a board lifted), `footer-1440-night-closed.png` (Friday 9:30 pm: moon, lit windows, Closed sign, Mon–Fri marked), `footer-1024-full.png`, `footer-390-full.png`. **39 of 39 checks pass** (`tools/foot_test.js`; shots from `tools/foot_shots.js`):

| Check | Result |
|---|---|
| Locked facts | Name and promise; phone, email, address exact; hours rows exact; about sentence and 4.9 / 474 reviews; five credentials; towns; the dead "Try the job" link is gone; no stray counts |
| Links | Every link is `#anchor` (all exist), `tel:` or `mailto:`; no outside address; `tel:+15125500000` and `mailto:info@austinprosiding.com`; one footer; ids unique |
| Live hours | 13 moments checked at the boundaries (Mon 7:59 / 8:00 / 19:59 / 20:00, Fri 20:00, Sat 12:00 / 17:59 / 18:00, Sun 11:59 / 12:00 / 16:59 / 17:00), each in a different browser time zone (Tokyo, Chicago, London): open or closed, the next change, the sign and today's row all follow the locked hours in America/Chicago; day/night at 5:59 / 6:00 / 19:59 / 20:00 |
| Live flip | With the clock at 7:59:30 pm the sign reads Open; a minute later it reads Closed by itself, "We are closed now. Opens tomorrow at 8 am." is announced once; nothing is announced on load |
| Copy | The clipboard holds (512) 550-0000 and info@austinprosiding.com; "Copied" shows and returns after about 2 s; announced; by keyboard (Enter); with the clipboard API refused it falls back without an error |
| Street | The nearest house rises to 1.0 and lights lime windows, far houses stay down; leaving puts them all back; touch tap makes one house hop |
| Back to top | The page is at the top; by tap on a phone too |
| Arrival | Boards armed before the footer is seen, all opaque after it arrives |
| Reduced motion | No arrival, no sign/sun/cloud animation, transitions off, the street does not react, copy still confirms |
| Contrast, fonts | Every text colour on its board, sill or ground ≥ 4.5 (lowest 5.45); no pure white background; Montserrat and Inter only; 3 px focus rings; Tab walks the footer in reading order |
| Layout, 4 sizes | 1440 / 1024 / 768 / 390: no overflow, nothing runs out of its board, every link and button ≥ 44 px, the sill is reachable, 0 errors |
| Page errors | 0 on every run |

## 5. Defects found and fixed

1. **A class clash with the Wall section**: the street's window class `.fw` is also the Wall section's root (`height: 430svh`), so every window became a tall bar. All street classes are now prefixed (`fs…`). Caught in the first screenshot.
2. The phone number rendered small and wrapped ("550-/0000"): `.fo-b a` out-ranked `.fo-big`; selectors fixed, the number is nowrap, the copy button moved under it as a labelled pill.
3. The long email broke mid-word at 1440; it now wraps only after the @ and fits.
4. The Hours sign collided with the heading and made "Open now" wrap; the sign is smaller and hangs from the board's top edge; the status line has its own row.
5. The phone and email links were 30–40 px high; both are 44 px now (found by the targets check).
6. The moon was light-on-light and hid behind the tallest houses; it is a dark crescent (SVG mask) with a halo and the arc keeps it above the roofs.
7. On tablets the bottom-aligned boards left large holes and the credentials sat alone in a corner; below 1180 px the boards stretch to a common row height and the credentials run full width (pills in a row).
8. The street's houses reached into the headline; the strip is taller and the ground line lower.
9. A test, not a product, defect: the focus-ring check read a live style object after moving the focus; fixed in the test.

## 6. Remaining, named honestly

- **Dead CSS stays in the file for now**: the old footer's rules (`.ft`, `.boards`, `.bd`, `.sill`, `.hs`) live inside `cta.css`, which the Booking section still uses; they match nothing in this markup. `REPLACES` is empty on purpose; when the Booking module is replaced the old rules go with it.
- **Two links share one anchor**: Siding and Roofing both go to `#services` (one Services section holds both). The header still links `#siding` and `#roofing`, which do not exist on the page; that is a shell item, not changed here.
- **No "Contact us" link**: the inner Contact page is not built yet, so none is added (the Book buttons go to `#booking`).
- **"Try a colour"** is a new UI label for the link to the Visualiser (`#colours`); it states no fact.
- **The open/closed sign uses the visitor's device clock** (converted to America/Chicago); a wrong device clock gives a wrong sign. Holidays and exceptions are not modelled (only the locked weekly hours).
- **The street is generic**: invented houses and trees, not any real address or house.
- **The top edge** of the footer meets the section above with a straight edge (the section above is not this footer's to tint); the old site-wide cursor follower draws over the footer (shell item, on the owner's reject list).
- **Testing:** Chromium only, headless software rendering; touch tested with emulated touch events; clock-dependent checks use a faked clock.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.2** | The owner's boards, battens and sill kept and re-tinted to the page; a drawn street with a lawn, sun/moon and clouds; a hanging sign; tidy hierarchy (`footer-1440-day-open.png`). **Minus:** the boards themselves are still plain panels; the straight top edge |
| Usability (30) | **8.6** | Live open/closed, copy with confirmation, a real Back to top, a clear order of importance, 44 px targets, keyboard and live-region support; the tablet layout is clean. **Minus:** at 390 px the footer is long |
| Creativity (20) | **8.6** | A street that rises, lights and smokes under the pointer, a day/night sky tied to the firm's hours, a swinging Open/Closed sign, a house that hops. **Minus:** a "street of houses" is a familiar footer idea |
| Content (10) | **9.0** | Only the old footer's words and locked facts; the live line is derived from the locked hours; no number invented. **Minus:** none of the content is new, by design |
| **Weighted** | **8.48** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.2 + 0.3 × 8.6 + 0.2 × 8.6 + 0.1 × 9.0 = 3.28 + 2.58 + 1.72 + 0.90 = **8.48**.

## 8. Sub-agent use, stated honestly

Built by a sub-agent under the main session's brief; no background tasks claimed beyond that.

## 9. Next

**NEXT:** the main session reviews the footer with the finished page (the top edge against the section above it, the header's dead `#siding` / `#roofing` anchors), then the footer is final once Booking replaces the shared `cta` module.
