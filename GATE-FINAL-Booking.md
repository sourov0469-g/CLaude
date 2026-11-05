# GATE-FINAL — Section 10: BOOKING (Version C "The record, then the call", then Version J "The receipt")

**Under:** AUSTIN-HOMEPAGE-FINAL-PLAN-2026-11-05 (BOOKING block). **Owner's rulings:** keep C's flow (the record, then the proof); NO form on the homepage (the form lives on the Contact Us page); NO button that routes outside the site; email and phone shown right in the section; at the end, after the proof, J "the receipt" opens and carries a button to this site's own Contact Us page; no memo expansion beyond that.

## 1. Self-audit of the old C and J, then decisions

Old C had a "Book a free inspection" button and a note "Booking finishes on our scheduling page", both pointing at the firm's real website (the owner's explicit ban), a frame saying "Documented projects **since 2018**" (not in the firm's data; the lock is "886 … as 312 on the map with photos + 574 more counted"), and no contact details in reach besides a phone button. Old J's button also went to the real site. **Decisions:** replace both outside routes with the phone and email in the section (tel: and mailto:), correct the 886 frame, and let J's one button go to `contact.html`, the site's own Contact Us page (an inner page, built after Muse approves the homepage).

## 2. What was built

- **C, the left column (always in view):** "The record, then the call." · one free inspection covers every trade on the house · a live **Open now, until 8 pm Austin time / Closed now…** line computed in the browser from the locked hours · the **phone (512) 550-0000** and the **email info@austinprosiding.com**, each large, with a **Copy** button that puts it on the clipboard and says so in the page ("Copied the email address: …"), with a fallback message if the browser refuses · the address · the three hour pills, **today's marked**. No form, no input, no button that leaves the site.
- **C, the film gate (right):** a strip of six frames held and pulled as you scroll (sprocket holes slide with it, a slight motion blur while it moves): **2009** "Working on Austin homes, one house at a time." → **2018 Merged** with Sanders Roofing & Exteriors (two squares slide together) → **886 documented projects: a dot for every project, 312 deep green "on the map with photos" and 574 pale "counted"**, exactly "312 on the map with photos + 574 more counted." → **the credentials** as four ticked chips (GAF Master Elite · James Hardie Elite Preferred + President's Club 2025 · Andersen Certified Premier · BBB A+) → **4.9 from 474 Google reviews** (five stars pop in) → **Your house** (a drawn house whose lines draw and windows light): "One free inspection covers every trade on it."
- **J, the receipt:** after the proof, a slot prints the receipt **top-down in 34 steps, like a till** (Austin Pro · address · phone · email; Free inspection $0; One visit, every trade included; Detailed proposal after the visit; Workmanship warranty lifetime, labor; James Hardie warranty 30-year non-prorated; To find out $0; 4.9 from 474; hours; "Thank you. Since 2009."), a zig-zag tear edge, a stub with **one button, "Go to the contact page" → `contact.html`**, and "or call (512) 550-0000". "Print it again" replays it.
- **Facts checked against the firm's data:** the workmanship warranty ("a lifetime workmanship warranty on labor") and the 30-year non-prorated Hardie warranty are in the firm's FAQ; "Detailed proposal" is the firm's own process step name. The old "Itemised proposal" line was dropped as unsourced.
- **Phones and reduced motion:** the film becomes a plain stack of frames (all shown), the receipt appears at once; nothing pins.
- **Background treatment:** the kit's dot-grid, tape-measure, ruler and level art (the "inspection" family) on a dim sage ground with two-layer parallax, plus concentric ripple rings behind the phone number that pulse only while the section is on screen; nothing is pure white.

## 3. Governing reference and WEB-SKILLS

**Governing reference: Scout Motors' heritage page (a company's history told as a sequenced film roll before the call to action).** **Transfers:** proof as a sequence, one frame at a time, then the ask. **Does not transfer:** their visuals or copy; every frame here is the firm's own published fact.

| Level | Element | Skill → how used |
|---|---|---|
| Section | Booking | ⟦S1434⟧ visual-hierarchy: the number first, the email second, the film beside; ⟦S1426⟧ proximity: hours and address sit with the contact lines; ⟦S0220⟧ anti-slop: only published facts; no invented lines; ⟦S0453⟧ proof: 2009, 2018, 886, credentials, 4.9 in order |
| Element | contact lines | ⟦S1444⟧ one choice at a time: call or write; ⟦S1494⟧ plain labels (Copy, Copied); ⟦S1441⟧ fitts-law: the number is the largest target |
| Motion | film, receipt | ⟦S1436⟧ animation-principles: hold-then-pull film timing, stepped print, squash of the icon on hover; ⟦S0060⟧ animate; ⟦S0062⟧ animation-performance: transform/opacity/clip-path; ripples only while visible; ⟦S0400⟧ accessible-animation: static fallbacks |
| Element | controls | ⟦S0054⟧ fixing-accessibility: links are links, buttons are buttons, `role=status` for copy and open/closed, 3 px focus rings, targets ≥ 44 px |
| Site | weight | ⟦S0231⟧ web-performance: 12 KB of CSS and 9 KB of JS; the 886 dots are drawn by script, not shipped as markup |

## 4. Evidence

Screenshots (`siding/redo/final/gate/`): `booking-C-sequence-1440.jpg` (frames 1, 3, 4, 6), `booking-J-print-1440.jpg` (printing, then printed), `booking-phone-390.jpg`. **21 of 21 checks pass** (`tools/bkt.js`):

| Check | Result |
|---|---|
| No form | No form, input or textarea in the booking sections |
| No outside route | Every link is `#`, `tel:`, `mailto:` or `contact.html`; none mentions `http` or "schedule" |
| Locks | Phone, email, address and the three hour pills exactly as locked, shown in the section; today's pill marked; open/closed line computed |
| 886 | 886 dots, 312 on the map; frame text exactly "312 on the map with photos + 574 more counted."; "since 2018" absent; no sums |
| Frames | 2009; 2018 merger with Sanders Roofing & Exteriors; credentials exactly as locked; 4.9 from 474; your house |
| Film | Scrolling advances frames 1 to 6 in order; the phone, email and Copy buttons stay in view throughout |
| Copy | The email reaches the clipboard and the page says so |
| Receipt | The five published lines + "To find out $0"; fully shown after printing; one button, to `contact.html`; "Print it again" replays |
| Fonts, errors | Montserrat/Inter only; 0 page errors |
| Reduced motion | The film is a plain list; the receipt shows at once |
| Layout, 4 sizes | 1366×768, 1024×768, 768×1024, 390×844: no overflow, targets ≥ 44 px, frames fit |

## 5. Defects found and fixed

1. The 886 frame overflowed its film frame (dots + number + text); the dot grid now scales with the frame height.
2. The receipt first printed bottom-first (the stub arrived before the header); it now reveals top-down.
3. Frame text touched the sprocket holes on phones (missing `box-sizing`); fixed.
4. The old duplicate `id="booking"` (C and J): C is `booking`, J is `receipt`.
5. Old outside routes and the "since 2018" claim removed (see §1).
6. A test that counted forms page-wide also found Area's search box; the booking test is now scoped to booking.

## 6. Remaining, named honestly

- **`contact.html` does not exist yet.** The link is the site's own Contact Us page, to be built after Muse approves the homepage (as ruled); until then it is a dead internal link.
- **Copy uses the browser clipboard**, which some privacy settings block; the page then tells the visitor to press and hold the text.
- **The open/closed line trusts the visitor's clock**, converted to Austin time; a wrong device clock shows a wrong state.
- **Chromium only**, headless software rendering.

## 7. Scorecard (D40 / U30 / C20 / Ct10), self-rated

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | A strong two-column composition, a film gate with real micro-animations in every frame, a tactile receipt (`booking-C-sequence-1440.jpg`). **Minus:** the receipt is a familiar metaphor |
| Usability (30) | **8.7** | The ways to reach the firm are large, copyable, always in view; live hours; nothing leaves the site; the plain fallbacks. **Minus:** a 6-frame pin is long on desktop |
| Creativity (20) | **8.4** | 886 dots lighting 312 of them; squares that merge for 2018; a house that draws itself; a till-style print. **Minus:** the film-roll idea is the owner's pick |
| Content (10) | **9.0** | Only published facts; the 886 lock exact; the unsourced claims removed |
| **Weighted** | **8.55** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.7 + 0.2 × 8.4 + 0.1 × 9.0 = 3.36 + 2.61 + 1.68 + 0.90 = **8.55**.

## 8. Sub-agent use, stated honestly

I built, tested and gated this section myself; no sub-agent touched it. No background tasks.

## 9. Next

Integrate the Process + Footer and Area sub-agents' sections (review their gates and screenshots), then the cursor companion, then the whole-homepage check, then STOP for Muse's file review.
