# GATE-FINAL — Section 2: THE WALL AND THE VIDEO (base: Hero V9, "Type as the house")

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (Part A binding, Part B the owner's words) and Muse's rulings on the Hero gate: the video is **the firm's own hero film, linked never embedded, no YouTube version invented**; the wall text is **the firm's own line and published sentences only**.

## 1. Understanding and self-audit before building

The owner's words (Parts 1–3): keep V9's idea (type as the house: the full wall of the whole house) but improve the text, content and UI/UX; **the section pins when it fills the screen; at rest only the big wall text is present, no bottom paragraph, no CTA; on scroll the window in the wall opens and behind it is the video (thumbnail or playing, never the still image); scrolling slowly, the window opens wider and the video grows until it takes the full width / full screen; as it grows, the wall text slowly disappears; the transition "must feel very, very, very good, just like the references"; at full view, with the video playing, the later paragraph and the CTA appear on top of it; then scrolling continues normally.** Also binding here: backgrounds never pure white and full of custom SVG life; no link outside the site; the video linked, better quality a priority.

Self-audit of V9 (the old `h9v` hero): the wall was a flat white page, the window a small still image, the paragraph and buttons visible at rest, no pin, no video. All five of the owner's asks were therefore missing; the idea that survives is the type itself.

**Decisions:**
- **Wall type:** "One free inspection covers every trade on the house." (the firm's own published line, exactly), not the headline again (the hero already carries "The full wall or the whole house."). Five lines; the window sits at the end of the fourth, inside the type, as V9 did.
- **Paragraph over the film:** two of the firm's published sentences, verbatim: "A project manager walks every side of the house: siding, trim, windows, roof and gutters." (the Free inspection step's published text) and "The inspection and estimate are free." (faq.json). Both are checked against their source files at build time.
- **The film:** the firm's own 1920 × 1080, 24 fps, 20-second golden-hour film (the hero film of its site: H.264 MP4, 6.7 MB, with tablet and mobile versions), **linked from the firm's own media address, never embedded**. A poster frame from the film (82 KB) is embedded as the fallback. The size is chosen by screen width (1920 px at 1000+ wide, the tablet file at 600–999, the 960 px mobile file below) and is not requested until the section is within 1.2 screens, so the page itself stays light (**1.11 MB for hero and wall**).
- **The mechanism:** the film is a full-screen layer shown through a rectangle (clip-path) that grows from the window's opening to the whole screen; the film is scaled to cover the rectangle (so you see the whole scene, small, in the window) and grows to natural size as the rectangle reaches the screen. Nothing is ever resized by layout. The sashes are real 3D casements that swing open about the hinges.

## 2. What was built

A pinned section, 430 screens-height of scrolling (380 on phones), one stage fixed to the screen:
1. **At rest (0%):** only the wall: pale sage lap siding with shadow lines, a soft sun streak drifting across it, a drawn downspout at the left edge and a wall lamp with a breathing glow at the top right, and **the wall type in huge Montserrat 800** (up to 17% of the screen height). The window, with its casing, two closed glass sashes, handles and a sill, is set in the type. A small chip says "Scroll to open the window". No paragraph, no button, no control. On a fine pointer the sashes **crack open 7°** when you hover the window, as an invitation.
2. **Opening (3–23%):** the sashes swing open (0 to 98°, 3D perspective) and the film starts playing inside the opening (muted, looping).
3. **Growing (20–82%):** an eased rectangle grows from the window to the whole screen (a slow start and a slow finish); the film grows with it; the casing thins to nothing; the wall type stays whole while the opening is small and then fades slowly (still at least 80% opaque while the opening is under 8% of the screen) and settles back a little.
4. **Full (82–100%):** the film fills the screen; a soft green scrim rises at the foot; the paragraph and **Book a free inspection** (internal route) with the phone, and a pause/play control, rise onto it. Then the pin releases and the page scrolls on.
- **Reduced motion:** no pin and no choreography: the wall type, then the film as an ordinary 16:9 player that does not autoplay, then the words and the action. **Touch:** the same choreography (no hover crack).
- **If the film cannot load** (offline, blocked, removed): the poster frame stays in the opening, the player control is hidden, the words still appear; no error.

**Background treatment of this section:** the wall itself is the drawn world (boards, light streak, downspout, lamp, window); a compositor-only sun streak (transform) rather than a repaint; the animations pause once the film covers the wall.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Graza** (the custom-animation quality bar Muse confirmed for Process N and the final plan): scroll-choreographed objects with eased, restrained motion, in a single continuous take. **Transfers:** one object transforming through the scroll, staged anticipation (the hover crack), a payoff (the words onto the film). **Does not transfer:** its product, colours or copy. The idea (window to film) is the owner's V9.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Wall and film | ⟦S1434⟧ visual-hierarchy: at rest only the type; ⟦S1452⟧ peak-end: the film at full screen is the peak, the CTA lands at the peak; ⟦S1454⟧ serial-position: the promise first, the action last; ⟦S0220⟧ anti-slop: only the firm's own line, sentences and film |
| Motion | the choreography | ⟦S1436⟧ animation-principles: anticipation (hover crack), slow-in slow-out on the growth (cubic ease), follow-through (the wall settles back), staging (one thing moves at a time); ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: clip-path, transform and opacity only, one rAF, cached geometry, animations paused when covered; ⟦S0400⟧ accessible-animation: a real reduced-motion layout, not a shortened animation |
| Element | film | ⟦S0231⟧ web-performance: linked, never embedded, loaded only when near, size by screen, poster as fallback; ⟦S0985⟧ critical-images: the poster is the first paint of the window; ⟦S1440⟧ feedback: the hover crack and the hint tell the visitor what to do |
| Element | controls | ⟦S0054⟧ fixing-accessibility: a pause/play control (WCAG 2.2.2), `inert` on the words until they appear (no hidden tab stops), 3 px focus rings, 48 px targets; ⟦S1441⟧ fitts-law: the CTA and the pause control are large and in the thumb zone on phones; ⟦S1494⟧ ux-writing: plain labels |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `wall-rest-1440.png`, `wall-full-1440.png`, `wall-sequence-1440.jpg` (nine moments from 0 to 100%), `wall-sequence-390.jpg` (the phone, six moments).

**40 of 40 checks pass** (`tools/wall_test.js`, Chromium; routed to a stand-in clip, see the limits):

| Check | Result |
|---|---|
| Wall type | The firm's own line, exactly, as the accessible heading |
| Paragraph | The two published sentences, exactly (and found in their source files at build) |
| Film linked, never embedded | Three firm URLs in data attributes only; no `data:video`, no `<source>`; the whole file 1.11 MB |
| No outside navigation link | Every `<a href>` is `tel:`, an in-page anchor or internal |
| At rest | Only the wall type: the words and CTA hidden and inert, no player control, the film closed behind the shut sashes (under 2% of the screen) and paused |
| Choreography | Sashes 0° to 98° by 25% and never back; the opening grows monotonically from the window to 100% of the screen and the casing is gone; the wall type fades monotonically and slowly; the words appear only after 80% |
| Smoothness | At 1% scroll steps the opening never jumps by more than 6% of the screen |
| Playback | Plays once the window opens (time advances), pauses when closed again and when off screen; a 48 px pause control that is respected while scrolling |
| Keyboard | The Book link takes focus with a 3 px ring, 48 px+; at rest the hidden action cannot be tabbed to |
| Film by screen | 1440: the 1920 px file; 800: the tablet file; 390: the mobile file |
| Failure | With the film blocked the poster stays, the control hides, the words appear, no errors |
| Reduced motion | No pin, a 16:9 player (no autoplay), the words and action shown, the window and hint removed |
| Layout, 7 sizes | The wall type fits (no clipping, clear of the header); the window ≥ 30 × 40 px; no overflow; 0 page errors at 1440, 1920, 1366, 1024, 768, 390, 360 |
| Touch | The same choreography at 390 |
| Contrast | Wall type on the wall ≥ 9:1; the paragraph over even a white frame on the scrim ≥ 6:1 |
| Fonts | Montserrat and Inter only |
| Frame time | Scrubbing the whole choreography with the film playing: median 26 ms, 90th percentile 40 ms in headless software rendering with no GPU (a real device with a GPU is faster) |

## 5. Defects found and fixed

1. The window casing was a solid block that hid the film; rebuilt as a border so the opening is truly open.
2. The film first showed as a *portal* (a fixed picture seen through a hole, so the window showed an unrelated corner); changed to a scaled picture that grows with the opening, so the window always shows the whole scene.
3. The wall's animated background repainted every frame (90th-percentile frames of 47 ms); replaced by a compositor-only streak (now 40 ms with the film playing, 17 ms without).
4. The wall type was read as "One freeinspection…" (no spaces between lines); spaces added.
5. Buttons took the browser's default font; fixed.
6. On phones the wall was a small block of type on a large empty wall; the drawn lamp and downspout now fill it (the type itself is limited by the width of "covers every").
7. Test harness only: the rest-state expectation was wrong (the film is closed behind the sashes, not removed); a focus test used a programmatic focus (not keyboard-visible); a frame-rate probe included test round-trips.

## 6. Remaining, named honestly

- **The film is the firm's own site's media, linked.** It is the one outside address in the file, used as a media source, not a link (3 data attributes in `build_final.py`, `VIDEO`). If the firm removes it or blocks hotlinking, the poster stays. If Muse has a better-quality or CDN-hosted copy, it is a three-line change.
- **I could not watch the real MP4 play in my test browser** (headless Chromium has no H.264 decoder), so the choreography was tested with a stand-in clip cut from the same film (VP8, 1280 px) served at the same URLs; the real file is H.264 1920 × 1080, 24 fps, which every normal browser plays, and its URLs answer 200. The source film is the best on file (1080p); the owner asked for better quality, which does not exist in the repo.
- **The pin is long** (430 screens-height on desktop, 380 on phones) because the owner asked for a slow growth; the growth itself takes about 2.6 screens of scrolling.
- **Phone:** the wall type is limited by width, so it is smaller than on desktop; the lamp and downspout carry the wall.
- **The wall lamp, downspout and window are drawings** (SVG and CSS, no claim); no photograph of a wall is used.
- **Testing:** Chromium only; no real device.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.6** | A single continuous take: a drawn wall, a real casement that swings, a film that grows from the window; the wall type fades as it is replaced; the paragraph lands on the peak (`wall-sequence-1440`). **Minus:** the wall is an illustration, not a photograph, and the film's quality is capped at the firm's 1080p source |
| Usability (30) | **8.4** | One instruction ("Scroll to open the window"), obvious cause and effect, a pause control, `inert` hidden controls, a true reduced-motion layout, a poster fallback; all verified. **Minus:** a long pin; it depends on the firm's media address being reachable |
| Creativity (20) | **8.8** | The window as the portal, the film that grows with it, the hover crack, the lamp that breathes. **Minus:** the idea is the owner's |
| Content (10) | **9.0** | The firm's own line, two published sentences, its own film; nothing invented. **Minus:** none found |
| **Weighted** | **8.62** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.6 + 0.3 × 8.4 + 0.2 × 8.8 + 0.1 × 9.0 = 3.44 + 2.52 + 1.76 + 0.90 = **8.62**.

## 8. Sub-agent use, stated honestly

**Two sub-agents ran in parallel with this build, for later sections, prep only, read-only (they wrote nothing; the tool returned their findings as text, which I saved as `siding/redo/prep/final/windows-kinds.md` and `services.md`):** (1) the **Windows kinds** prep for Section 5: what the firm publishes about window kinds (nothing: no sentence names the five kinds) and about colours (per brand, names and hexes), and generic mechanics for the five kinds; (2) the **Services A** inventory for Section 3: the panels, the lock check (it found four unpublished phrases in Services A to fix: "241", "330 of 376", "1–2 weeks on site", "from a GAF Master Elite contractor") and SVG animation concepts. **I built, tested and gated this section myself.** No background tasks (the test ran as one local script).

## 9. Next: Section 3, Services (Version A, "Sideways sequence")

**Consult-first plan:** keep A's world (a pinned sideways track of the trades), rebuild every scene as real SVG animation (siding boards laid course by course with shadow lines and a dimension line, a window sash lowering with a reflection sweep, shingle rows laid eave to ridge, the minor trades as small scenes), each scene on its own tinted background (never flat white), and a persistent record ledger beside the scene so counts, bands and published sentences are visible without any click. Fix the four unpublished phrases. Nothing is summed (no 241). **Open question for Muse:** the unsourced "1–2 weeks on site" and the policy line "We replace by the full wall or the whole house. No patch repairs." (the second is a published FAQ idea: "We replace… we don't do small patch repairs"); I will use only the verbatim FAQ sentences.
