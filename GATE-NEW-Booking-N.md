# GATE — Booking N, "The open door" (upgrade plan B-A)

**Under:** AUSTIN-UPGRADE-PLAN-2026-11-05 (passed by Muse; build order: weight pass, Hero, then Booking), AUSTIN-CONSULT-FIRST, and Muse's binding consult reply on Booking B-A.

**Consult reply, as applied:**
1. **Address and email stay in the footer only.** Neither appears in the section (tested; the footer is byte-identical to the last commit).
2. **B-A carries the hours line** ("Mon–Fri 8–8, Sat 8–6, Sun 12–5"); the footer keeps its own.
3. **The H2 is the firm's own sentence:** "One free inspection covers every trade on the house."
4. **"Booking happens on our scheduling page."** is kept, as written.

**Sub-agent use, stated honestly:** this section was built, tested and gated entirely by this session; **no sub-agent touched it, and no background task was used for it** (the 256-view sweep ran as four parallel local processes of my own test script, not as agents). The only sub-agent work in this session so far is the two prep agents (Services S-A tile selection and Visualiser V-A masks). They finished earlier, wrote only under `siding/redo/prep/`, and their Services findings feed the NEXT PLAN below.

## Result

**`?book=n` is now the shown default** (`LIVE book = 'n'`). Booking A, "Work order" (the form that is not a form), is parked as a hidden in-file backup like the other 12 (nothing deleted). **Booking M ("Walk round the house") stays a hidden backup**, as the plan retired it as a default.

**What it is:** the close of the page, by subtraction. One pale-green panel on the white page.
- **Left:** the firm's sentence as the H2, set large (Montserrat 800, up to 68 px); the one filled **"Book a free inspection"** (64 px tall, link to the firm's own scheduling page); the phone **(512) 550-0000** as a tap-to-call link, set large; the hours line; the quiet line "Booking happens on our scheduling page."
- **Right: the door sign (the one live object).** A hanging sign on a nail, with two cords. It shows **OPEN** (deep green board, lime border and letters) or **CLOSED** (white board, dark border), and a line beneath it that follows the office in **Austin time**: "Open now, until 8 pm Austin time", "Closed now. Opens 8 am today (Austin time)", or "Closed now. Opens tomorrow (Austin time)".
  - **State-driven only:** it reads the clock; the visitor cannot set it. It is re-read every 30 s while the page is open, and **the board flips in 3D when the office opens or closes** (tested live).
  - **First view:** the sign swings once from its nail, damped over 2.6 s, then rests.
  - The sign itself is decorative (`aria-hidden`); the status line carries the meaning in text.
- **No form, no field, no button element, no "sent" or "saved" claim.** Two links only: Book and the phone.
- **Phone:** headline, Book (full width), phone, hours, line, then the sign and its status line. Height 1.09 screens.
- **Reduced motion:** no swing, no flip transition; the sign is drawn in its current state.

**Files:** `src/sec/cta9.js` (`Cta9.N`, `Cta9.wire`; 4.6 KB), `src/sec/cta9.css` (class prefix `dr`; 4.4 KB), wiring in `build_site.py`. No images. Nothing else changed.

**Weight:** +10,803 bytes: **13,071,331 → 13,082,134** (ceiling 22.5 million; target ≤ 14.5 million).

## Self-audit

**Screenshots** (in `siding/redo/site/gate/`): `new-booking-n-book-open-1440.png` (settled, open), `-book-mid-1440.png` (mid-swing), `-book-evening-1440.png` (CLOSED), `-book-open-1024.png`, `-book-open-768.png`, `-book-open-390.png`, `-book-evening-390.png`, `-sign3.png` (the three sign moments); sheets `new-booking-n-1440-sheet.jpg` (swing, open, closed side by side) and `new-booking-n-small-sheet.jpg` (390 open, 390 closed, 768).

Clock-controlled tests (`page.clock`, Austin time = America/Chicago, CST after 1 Nov): **32 of 32 checks pass.**

| Check | Result |
|---|---|
| The H2 | Equals the firm's sentence, character for character; one h2 in the section; `id="booking"`, `aria-labelledby` set |
| Locks | One Book link, to `https://www.austinprosiding.com/schedule-appointment`; `tel:+15125500000`, text "(512) 550-0000"; hours line exact; the scheduling-page line exact |
| Nothing else | No input, textarea, select, form or button element; no "@", street, ".com", ZIP; none of 4.9, 474, 431, 388; exactly two links |
| Sign state by time | Thu 12 pm: open "until 8 pm"; Thu 5 am: "Closed now. Opens 8 am today"; Thu 9 pm: "Closed now. Opens tomorrow"; Sat 1 pm: open "until 6 pm"; Sat 7 pm: closed, tomorrow; Sun 9 am: closed, "Opens 12 pm today"; Sun 1 pm: open "until 5 pm"; Sun 7 pm: closed, tomorrow |
| Live change | 7:59 pm → 8:01 pm: sign flips open → closed (board matrix rotated 180° on Y); 7:59 am → 8:01 am: closed → open |
| Motion | Swing class added once, when the sign is first half in view; reduced motion: no swing class, `animation: none`, transition ~0 |
| Keyboard | Book and phone both take focus; solid 3 px lime ring |
| Targets | Book 264 × 64, phone 262 × 56 (≥ 48) |
| Contrast (WCAG) | Headline 16.5 · phone 11.7 · hours 16.5 · quiet line 5.7 · status line 11.7 · OPEN board 7.9 · CLOSED board 16.7 (all ≥ 4.5) |
| Fonts | Montserrat and Inter only |
| Height | 0.82 screens at 1440, 0.91 at 1024, 0.81 at 768, 1.09 / 1.12 at 390 (open / closed) |
| Page errors and overflow | 0 errors at all widths; no overflow in the section (the page's 17 px at 1024 is the pre-existing default Services A) |
| All views | **257 views** (256 before plus the new hidden `book:a` template): 0 page errors, 0 overflow, 0 unresolved images; the one flag is hero L's 8 intentionally empty `lim` images, identical before this change |
| Existing versions | Against the last committed page, images blanked: **200 templates vs 199, with only `book:a` added** (the old default, now a hidden backup), **0 templates changed, 0 removed**; the body outside the booking slot (templates, styles and scripts excluded) is identical; **the footer is identical** |

## Defects found and fixed

1. **The cords stayed still while the board swung** (cords drawn outside the swinging element): moved inside it, so board and cords pivot together from the nail.
2. **The cords landed on the board** (a child's top margin collapsed through its parent): changed to padding.
3. **"CLOSED" overflowed its board:** the closed face uses a smaller size (38–56 px against 52–76 px).
4. **An unused flip-animation class** left from the first draft: removed.
5. **Test harness only:** after the restructure my screenshot script read the wrong element for the state; fixed. One test expectation was wrong (Sunday 10 am was written as "open"; the office opens at 12), corrected to the firm's hours.

## Remaining, named honestly

- **The idea is small by design.** The section is 0.82 screens with a single object. If Muse wants a stronger last scene, that is a design call, not a defect.
- **"Opens tomorrow" gives no hour.** It follows the plan's wording; the hours line sits directly above it.
- **It uses the visitor's clock only to schedule the 30-second re-read; the status itself is computed from Austin time**, so it is correct for a visitor in any timezone. It does not know about holidays (the firm has published none).
- **The sign is decorative.** Screen-reader users get the status line and the hours in text, not the sign.
- **Testing:** Chromium only; no real device.
- **Page rules are not yet met** (this is the second of nine sections; baseline below).

**Page-rule baseline after this gate** (default page):

| Rule | Target | Now |
|---|---|---|
| Section height | ≤ 1.3 screens | Hero 1.0 / 1.23 ✓, **Booking 0.82 / 1.09 ✓** (Services A 3.3, Process A 4.1, Try A 5.2 still over) |
| Page length at 1440 | ≤ 10 screens | **19.0** (was 19.2) |
| Pinned sections | ≤ 1 | 3 (Services A, Process A, Try A) |
| Book buttons | ≤ 6 | 11 (8 in the page body; the rest are the header and mobile bar); Booking has exactly one |
| Each number once | | Hero ✓, Booking ✓ (only the phone and the hours); 431 ×2, 388 ×3, 4.9 ×3, 474 ×2 across the other default sections |

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Section | Booking N | ⟦S1452⟧ peak-end: the page ends on one clear action and a visible "we are here"; ⟦S1454⟧ serial position: the close is the last thing remembered; ⟦S0220⟧ only the firm's own words, no invented copy |
| Element | headline, button, phone | ⟦S1434⟧ the sentence first, the button second, the phone third; ⟦S1435⟧ one filled button on a pale ground; ⟦S1441⟧ 64 px Book target, 56 px phone, full-width on phones; ⟦S1494⟧ plain labels |
| Element | status line | ⟦S1440⟧ feedback: the state is stated in words, in Austin time; nothing the visitor can set |
| Motion | the sign | ⟦S1436⟧ animation principles: a damped swing from a pivot (follow-through, settle), a 0.9 s flip; ⟦S0062⟧ transform only; ⟦S0400⟧ reduced motion static |
| Site | contrast, focus, targets | WCAG ratios measured on rendered colours; 3 px focus rings |

## Scorecard (D40 / U30 / C20 / Ct10)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.4** | Calm, subtracted close; one coloured object on a pale ground; strong type; the sign reads at a glance and both faces are balanced (`-1440-sheet`). **Minus:** the section is a single idea with no photograph; the panel-and-card form is familiar |
| Usability (30) | **8.8** | One action, one number, the hours and the live state in under one screen; 32 checks pass including live flips, keyboard, contrast, touch and reduced motion. **Minus:** "Opens tomorrow" gives no hour; the sign is decorative for assistive tech |
| Creativity (20) | **7.8** | A real hanging sign that tells the truth about the office in Austin time is memorable and earns its place. **Minus:** swing-and-flip is a small gesture, not a new form |
| Content (10) | **9.0** | Every word the firm's own or a plain statement of what the button does; no repeated numbers; no address or email repeated. **Minus:** none found |
| **Weighted** | **8.46** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.4 + 0.3 × 8.8 + 0.2 × 7.8 + 0.1 × 9.0 = 3.36 + 2.64 + 1.56 + 0.90 = **8.46**.

**On the score:** it sits just below Booking L (8.63), which lists every fact over 2.8 screens. I am not claiming a win on the number. The case for B-A is the job it does on this page: it ends on one action in under one screen, replaces a form that is not a form, and carries no number the rest of the page already carries.

## NEXT PLAN — Services S-A "Start from the problem", for Muse's consult

Under the consult-first order and the upgrade plan Muse passed (S-A agreed; build order: Services third). **Nothing below is built.** It uses the Services prep agent's findings (`siding/redo/prep/services/REPORT.md`, `services-tiles.json`, `tiles-preview.jpg`, `tiles-preview-phone.jpg`), which I have read and spot-checked against `photos.json`.

### AUDIT — the Services section now

- **The shown default is Services A, 3.3 screens at 1440, with a pinned scroll.** It breaks two page rules (≤ 1.3 screens; ≤ 1 pinned section), and it is the longest section after Process and Try.
- **The 20-odd versions** (plan section 2.2): the best, M (8.63), lists the trades beside one frame; none starts from the homeowner's problem; most repeat the counts that Reviews and Area also carry.
- **What works today:** the published counts, bands and FAQ sentences are correct and locked; the project photos exist.

### RESEARCH — reference and mechanism

- **Governing reference: Ever** (the chooser above, the result re-flowing beneath). Transfers: pick-one-and-it-expands craft. Does not transfer: apartments, pairs, styling, copy.
- **WEB-SKILLS:** ⟦S1444⟧ ⟦S1426⟧ law-of-proximity ⟦S1436⟧ ⟦S0054⟧ ⟦S0453⟧ pricing-page.

### THE PLAN — S-A

| Element | What will be built | Source |
|---|---|---|
| **Six tiles**, one per line of the firm's published inspection list | Siding and trim · Windows and doors · Roof and flashing · Gutters · Paint and caulk · Rot and water damage. Large photo tiles (3:2 on desktop, 4:5 on phones) | the inspection list in the site code |
| **Photos** (real job photos, never upscaled, captioned only with the job's own place, month and trades) | Tile 1: #0 (Maple Run, Austin) · Tile 2: #39 (Heritage Hills, Austin; Doors & Windows) · Tile 3: #10 (Fairview, Round Rock; Shingle Roofing) · Tile 4: #37 (East Oak Hill, Austin; includes Gutters) · Tile 5: #33 (Georgetown; Siding & Exterior Painting) · Tile 6: see decision 1 | `photos.json`, crops in `services-tiles.json` |
| **Pick one** | It expands in place, the others glide aside (FLIP); the open tile shows what the firm does, its published count and median band as published, and one filled Book button. One tile open at a time; keyboard: arrow keys, Enter, Escape; the first tile open by default so the section is never empty | |
| **Claims allowed per tile** | Siding: 431 documented (415 priced), $10k–$15k · Windows: 388 documented (376 priced), $10k–$15k, and **separately** Exterior doors 109 (96 priced), $2k–$5k, never added · Roof: shingle roofing 210 (204 priced), $10k–$15k; metal 31 (29 priced), $20k–$25k, **not summed, and "flashing" gets no number** · Gutters: 121 (109 priced), $2k–$5k · Paint: Exterior painting 320 (317 priced), $2k–$5k, **"caulk" gets no number** · Rot: no number | `services-tiles.json`; footnote verbatim: "Counts are documented projects from our service list; one project can include several trades. Bands are each trade's median price band, materials and labor, before discounts." |
| **Live unit** | The FLIP re-flow, plus a small hover lift on the photos on a fine pointer. Transform and opacity only. Touch: tap to open. Reduced motion: instant swap | |
| **Height and pin** | ≤ 1.3 screens at 1440 and on phones; **no pinned scroll**. Weight ≤ 1.2 MB new images | |
| **"Each number once"** | The counts shown here are the only place Services carries them; 4.9/474 stay in Reviews | |
| **Retire** | Services A stops being the default (hidden backup); L, M and others stay as hidden backups | |

**Weight options** (the page is 13.08 MB; the target is ≤ 14.5 million): new 1400-px masters for #39, #37, #33 and #28 are about 280 KB each (≈ 1.1 MB); cheaper: the existing copies of #33 and #28 (640 px) and #39 (680 px) satisfy the 1× rule if the collapsed tiles are ≤ 640 css px, so only #37 is new (≈ 280 KB). Photos #0 and #10 are already in the page at 1400 px at no cost.

**Why it should beat the best (M, 8.63):** M lists trades beside one frame. S-A starts from the homeowner's problem, shows their kind of job in a real photo, and lands the price in one tap, on one screen with no pin.

### Decisions for Muse (the consult reply)

1. **Tile 6, "Rot and water damage," has no honest photo or figure.** No job photo's record lists it, and no count, band or sentence exists. **Recommendation:** a typographic tile (large words on the pale-green ground, no photo, no number) that opens to the firm's own sentences "One free inspection covers every trade on the house." and "The inspection and estimate are free." plus the Book button. The alternative, the neutral placeholder photo #28, would imply damage the record does not say. Do not use photo #23 (it looks like damage but its record says only Siding & Doors).
2. **Photo #0's month.** `photos.json` says Feb 2026, Maple Run, Austin; the link slug reads "…fainwood-siding-mar-26". **Recommendation:** use #3 (Maple Run, Austin, Jul 2026; Siding, Exterior Painting & Gutters), whose record is consistent, for tile 1, unless you confirm #0's month. (#3 is also the Visualiser's planned photo; I would then give the Visualiser a different one, to avoid the same job twice on the page.)
3. **Tile 2's photo shows doors, not windows** (its record says Doors & Windows). **Recommendation:** keep #39 with the caption "Doors & Windows" and the two counts shown separately; the alternative #40 shows a window (Bull Creek, Jun 2026, Windows & Doors) but is a different, weaker crop.
4. **"Roof and flashing" and "Paint and caulk"** are the firm's own list lines, but flashing and caulk have no count. **Recommendation:** show only the roofing count and only the exterior-painting count, and say nothing numeric about flashing or caulk. Say if you want the tile names shortened to "Roof" and "Paint".
5. **Weight:** accept the cheaper option (only #37 new, ≈ 280 KB) or the full four masters (≈ 1.1 MB, page ≈ 14.2 MB, inside the 14.5 target)?
