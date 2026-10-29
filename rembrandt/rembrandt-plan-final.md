# Rembrandt homepage: the final plan (plan only; no HTML written, no page edited)

Facts and honesty ledger: `rembrandt-pack.md` binds every number, name and claim. Facts used: 4.9 stars, 295 Google reviews, since 1995 (30+ years), BBB A+ accredited since 2001, Owens Corning Platinum Preferred Contractor, Total Protection Roofing System®, 50-year non-prorated material warranty, written lifetime workmanship warranty, $2 million general liability with proof before any crew sets foot, written line-item estimate before work and no start without written approval, progress photos, final walkthrough, free estimates and inspections, in-house financing with flexible low monthly payments, military/veteran/first responder discount (no percentage), fully licensed and insured (no licence number; Ohio has none), partner brands, 19 hail days a year, hail season April to July, 50-degree swings November to March, ice dams January and February, the 20-year mark, 24 towns, 25 miles of Springboro, Bunk Walker 1995, Wade (started at 15, president 2015, coaches youth sports in Springboro), Rachel (born and raised in Springboro), two U.S. Army veterans, project managers with 20 to 25 years, a repair crew doing three times the repair volume of replacements, Se habla Español, Gary Sinise Foundation roof for John Kremer, 100 Roofs Challenge 2024, Heather's Light Foundation golf outing, Indian Lake tornado relief. Never invented: licence number, financing terms, discount percent, dollar value stack, review quotes, project counts, per-photo towns.

**Study basis, stated honestly.** My earlier claim of having studied the bank "in full" was too strong, and this plan only cites what I actually read. What I read in this session: `industry-best/roofing.md` (shortlist, five deep reads, crowns, waves); `deep-reads-slice-1.md` in full; `deep-reads-slice-2.md` in large part (Q50 to Q58, Q72 to Q79, Q88 to Q95, Q98, Q101, Q106 to Q108, Q114 to Q125); an entry-by-entry extract (heading, mechanism text, rebuild note) of slices 3, 4, 6, 7, 8, 9; slice 3 entries 146 to 150 and 163 in full; slice 5 lines 172 to 250; slice 8 entry 549 in full; the animation-parameter-library, proven-recipes, ui-ux-patterns and builder-brief; the test-build RESULTS records and the R31 code; and `SKILLS-CATALOG.md`. Where a source below says "(digest)", I read the mechanism paragraph and rebuild note, not the whole entry; the parameters quoted are the ones printed there. From the old kit I use only SKILLS-CATALOG.md. Section L, PASS 2, records a later re-check of every cited source and parameter against the tool results in the session transcript, with the corrections it forced.

---

## 0. SELF-DIAGNOSIS: what I built, and why the same skeleton kept coming back

**What the earlier attempts were, section by section** (v1, v3 and v4 differed in decoration; the order and the grammar were the same each time):
1. A fixed header, then a **hero**: a proof strip, a big headline, one line of copy, a white **form card holding the six-service picker**, two Call/Text buttons, and **one photo** on the right (later cut into a gable shape).
2. A solid blue **stats band**: four count-up numbers plus three badge pills.
3. A **photo marquee** (later gable-clipped tiles).
4. A **services block**: six white cards (stacked, then a bento that opened into a sheet).
5. A **pinned story scene**: one SVG house cross-section with a white caption card beside it and a progress strip.
6. An **estimate section**: a white paper card with four ticked rows and three bordered warranty "stamps".
7. A **before/after**: slider, then slats, always a rounded photo box with a handle, next to a white reviews card.
8. A **process** strip: four numbered steps under a drawn roofline.
9. A **honesty band** and a **FAQ accordion**.
10. An **areas** block: town names in a flowing list; then a **community** row of four white cards.
11. A **dual close**: a call card (later cut with a gable top) next to a white form card; then a directory footer.
Between sections: alternating paper / tint / blue / navy bands with a shaped divider.

**Why it recurred even when the techniques changed. The habits I fell back on:**
- **Slot-filling.** I took the pack's section list (hero, stats, marquee, services, story, estimate, before/after, process, FAQ, areas, community, close) as the skeleton every time, and then chose a bank recipe for each slot. The page was a list of recipes. The bank's roofing crowns (Stronghold and others) are themselves that skeleton, which reinforced it.
- **One header grammar.** Every section opened the same way: a small caps eyebrow, a big headline, a grey lede, then content. Even the numbering ("III · What we do") was that same header with a roman numeral.
- **Everything in a box.** Cards, panels, a paper sheet, stamps, a reviews card, a call card, a form card. A card is the SaaS default, and I used it for every kind of content.
- **Band rhythm and dividers.** Colour alternation plus a shaped edge made the page look varied while every section stacked as a full-width horizontal band.
- **Two-column symmetry.** Text on one side, an object on the other, alternating; a hero that is text left, image right.
- **The signature as an island.** The pinned scene sat between two ordinary sections instead of organising the page. The "traveller" object also moved around a fixed stack rather than defining the stack.
- **Novelty in styling, not structure.** Gable-shaped clip-paths, serif italic accent words, ridge dividers, a different ease: all of it decoration. I never changed what the sections were or how they were arranged.
- **Self-audits that only found defects.** Each audit looked for overflow, contrast and console errors. None asked, "does this look like the last one?"
- **Reading summaries, then planning.** My study was extract-level for most slices; I turned it into recipes (R1 to R45) rather than into a different page.

**Design rules this plan is built against:** (1) no hero form card, no picker beside a photo; (2) no band-per-section stack: each scene has its own composition grammar; (3) no eyebrow + headline + lede header; (4) no cards, tiles, stamps, panels; (5) no shape-cut photo windows, no ridge dividers; (6) no two-column alternation; (7) the signature carries the page's content (weather, inspection, ticket, install) and sits straight after the proof rather than being parked between ordinary sections; the self-check found this only partly met (see L, PASS 3, and J14); (8) the visual language changes from flat-colour illustration and white boxes to ruled paper, line-art and large type; (9) the order of functions must not be the pack's blueprint order (hero, stats, services, story, estimate, before/after ...), which the first draft of this plan repeated and the self-check caught (L, PASS 1).

---

## A. THE CONCEPT

**"The Job Ticket."** A roofing job is run from one piece of paper: a written, line-item ticket the customer approves before any tool is lifted. The whole homepage is that job told on a technical drawing sheet: warm paper, ink line-art, ruled ledgers, numbered clauses, one real photo per scene as a pinned-on "exhibit". The page follows the order of the job, not the order of a sales funnel: the cover is the phone call (the number is the biggest thing on it); then who you are calling (a roof built from 295 shingles, one per Google review); the result (a before/after you inspect through a window); the job itself (a pinned camera pan from the hail to the sign-off, where the weather, the inspection, the ticket and the install all happen); the terms of the ticket as a ruled ledger; photographs of finished roofs; the rest of the house (services as parts of one drawn house); the people who answer; the towns; and the call again. Weather appears only inside the Job pan (a sun that becomes a hail cloud and returns) and as a sun that sets behind the roofline at the close; there is no page-long mascot. The quote form is the ticket itself, filling in as the customer answers.

---

## B. PAGE ARCHITECTURE (order, composition, copy, motion)

Global system for all scenes: paper `#f2f1eb` (the paper tone of Specia1ne, DR-9 entry 569), ink `#14223a`, Rembrandt blue `#1b4f9c`, one amber `#f2a900` reserved for the sun and the single live-status dot. Type: Source Sans 3 only (variable 200 to 900). The signature type move is **mixed-weight giant type**: numerals and key words at weight 200 (ExtraLight), the word beside them at weight 900, in the same line (ui-ux-patterns, "Mixed-weight giant type creates hierarchy inside one line", Signal-A and Nick Ho). Body 17px/1.6 weight 400. Hairline rules 1px ink at 18% opacity. Scene frames use thin boundary lines and L-shaped corner brackets (catalog `framed-grid-layout`) and sparse bracketed numerals (catalog `number-details`, `container-lines`). Line-art SVG: single-weight 2px ink strokes, blue as the only fill accent, drawn by stroke-dashoffset (see C). One timing-token block drives every CSS motion (from Shopify Editions Winter, DR-2 Q58): `--t-scroll:.6s cubic-bezier(.41,.19,.13,.95)`, `--t-fade:.52s cubic-bezier(.25,.46,.45,.94)`, `--t-ui:.3s ease`.

### Chrome: header, status line and sheet ruler (always present)
- **Composition.** A 40px slim top strip above the header, full width, single line, 13px caps tracking .12em, **status only, no proof claims**: `Springboro 2:41 pm · ● Office open until 5:00 · Free estimates · Se habla Español` (the dot is the one small amber live-status dot, grey when closed; outside hours the same slot reads `Office closed · Text us and we reply Monday from 9:00`). Under it the 68px header: exact logo (176px) left, five nav items (Home, Services with a plain list panel, Our Work, About, Contact) centre, `(937) 746-7377` right. No header CTA button; the estimate button is a separate floating control (see Quote overlay). The proof strip of the earlier attempts is gone from the first screen: stars, review count, BBB and Owens Corning appear in Scene 2, one scroll later (see J1).
- **Sheet ruler (desktop only).** A fixed 1px vertical line 28px in from the left edge with ten 6px ticks, one per scene. The current tick is filled blue, with a bracketed counter `[04 / 10]` and the scene name in 11px caps beside it. It is what makes ten scenes read as one numbered sheet. Hidden on phones, hidden while the Job pin is active (the Job has its own counter) and while the Quote overlay is open. Sources: SKILLS-CATALOG `container-lines` (vertical guide lines) and `number-details` (sparse bracketed numerals); per-section counters n/total from Specia1ne (DR-9 entry 569); an indicator rail with one segment per point from Pin Sidebar (DR-3 entry 153). The current tick is set by IntersectionObserver on each scene.
- **Motion.** The Springboro clock ticks every second (Haptic's live London/New York clocks with ticking seconds, DR-5 entry 324; Specia1ne's live local-time readout, DR-9 entry 569). Open/closed is computed in the Eastern time zone from Monday to Friday 9:00 to 5:00 (test build R42: dates and states computed by JS so they cannot go stale; static fallback text in the HTML). Strip hides on scroll down, returns on scroll up (`translateY(-100%)`, `var(--t-ui)`).

### Scene 1: COVER (100svh, edge to edge)
- **Composition.** One real photo, `job-charcoal.png` (completed charcoal shingle roof), full bleed behind everything with no frame, no card, no gable shape. Over the photo, bottom-left, two lines of display type at 11vw/0.9: `Roof done right.` (weights 200 then 900 on "right") and `Price on paper first.` Bottom-right, right-aligned, the phone number as the biggest element on the page: `(937) 746-7377` at about 8.6vw, weight 900, with a small line above it: `Call or text. Rachel answers.` and a line below: `Monday to Friday, 9 to 5. Text us any time.` Nothing else: no picker, no form, no stats, no proof claims (the next scene carries them), no second photo. Three hairline callouts drawn over the photo like inspection markup (ridge, chimney flashing, eave), each with a short bracketed label: `[01] Ridge`, `[02] Flashing`, `[03] Eave` (positions set from the photo at build; labels are plain trade words, not claims).
- **Copy.** H1: "Roof done right. Price on paper first." Supporting line (small, under the headline, one sentence): "A written, line-item estimate before any work starts. If you don't need a new roof, we'll tell you and show you the photos."
- **Motion.** (a) Headline: words rise from under a mask, `y 1.15em`, `power4.out`, `1.1s`, stagger `.09`s per word, once (Masked Heading "rise" preset, DR-2 Q95). (b) Callouts: single-stroke paths draw on, `stroke-dasharray = stroke-dashoffset = getTotalLength()`, `800ms easeOutQuint` (= `power4.out`), staggered `.2`s (Fancy SVG Letter Animation draw-on, DR-4 entry 258). (c) Scroll: three layers move at different scrub rates so they never move in lockstep: photo `yPercent 0 to 18` with `scrub 1.9`, headline `yPercent 0 to -12` with `scrub 3.1`, phone number `yPercent 0 to -6` with `scrub 4.3`, all `ease:"none"`, `start: top top`, `end: bottom top` (Nick Ho parallax layers: linear, mixed scrub 1.9 to 4.3, parameter library). Number hover: colour white to blue `300ms ease-out-cubic` (giant contact type with 300ms colour swap, Jean-Christophe Suzanne, DR-2 Q114).

### Scene 2: THE ROOF OF 295 (proof as one built object)
- **Composition.** On paper, one large centred line-art SVG roof gable, about 78vw wide on desktop, built from exactly 295 shingle tabs: 289 field shingles in 17 courses (1, 3, 5 ... 33 tabs per course) plus a 6-tab ridge cap on top. Top-left of the scene, a mixed-weight number: `295` in weight 200 at 12vw with `Google reviews` in weight 900 beside it; beneath the gable's peak, the line `4.9 out of 5 on Google`; from the roof's right edge two hairline leader lines run out to plain annotations with no border and no fill, `[A] BBB A+, accredited since 2001` and `[B] Owens Corning Platinum Preferred Contractor`, and from the left edge a third, `[C] Since 1995` (annotation style from SKILLS-CATALOG `technical-wireframe-info-layout` and `number-details`). Caption in the bottom margin: "Each shingle stands for one Google review." No quotes, no individual reviews.
- **Motion.** The 295 tabs land bottom course first (courses are laid eave to ridge), whole assembly `2s`, tab stagger `each ≈ 0.0068s` (2s over 295; my arithmetic, the source's own stagger is .05), each tab `y 14px → 0` and `opacity 0 → 1`, `expo.inOut` over the sequence (intro explode/assemble from the infinite parallax grid, DR-2 Q92: `2s, expo.inOut, stagger .05`, centre-out in reversed DOM order, here replaced by bottom-up order). The `295` number counts 0 to 295 over the same 2s with `cubic-bezier(.33,1,.68,1)` and an exact final landing (Count Up, DR-4 entry 279: ease-out `cubic-bezier(.33,1,.68,1)` with a residual correction so it lands exactly; the 2s duration is my choice, to match the assembly). Triggered once when 35% of the object is in view. The three leader lines then draw on (800ms `power4.out`, stagger .2s; draw-on from DR-4 entry 258). Final values are in the HTML.

### Scene 3: THE INSPECTION WINDOW (before/after, no slider)
- **Composition.** A full-bleed photograph, `ba2-after.png` (new roof) sitting on `ba2-before.png` (old roof), exactly aligned. A circular "inspection window" about 280px (22vw on phones) shows the AFTER image; everything outside it shows the BEFORE image. A small bracketed label rides the window: `[ NEW ]` inside, `[ OLD ]` outside. Bottom-left caption, large: `Same house.` Below it, small: "Roof replacement, Greater Dayton. Our own job, our own photos." No handle, no slider bar, no rounded photo box, no side card.
- **Motion.** A cursor-following spotlight reveals a second, aligned image through a soft radial mask (the technique catalogued as `reveal-hover-effect`). Radius 160px (22vw on phone), edge falloff by smootherstep `u³(u(6u−15)+10)`, window follows the pointer with time constants `tau .12s` while hovering and `.6s` at rest (Masked Heading spotlight, DR-2 Q95); pointer easing `0.1` per frame (square lens, DR-2 Q125). With no pointer (touch, or the pointer outside) the window wanders on its own: `x = w(0.5 + 0.36·sin(0.37t))`, `y = h(0.5 + 0.22·sin(0.61t + 0.9))` (Q95 idle wander); on touch the visitor can drag it. Implemented with CSS `mask-image: radial-gradient` and two custom properties updated in the GSAP ticker; no WebGL. Keyboard: arrow keys move the window 24px (Shift 96px). Reduced motion: window fixed at centre and two buttons `Old` and `New` swap the full image.

### Scene 4: THE JOB (signature, pinned camera pan; the longest scene, straight after the proof)
- **Composition.** One full-bleed drawn world, 100svh pinned, that pans left to right like a camera. It is a single wide panorama about 340vw wide, line-art on paper, three stations: **Station A, the street**: three houses in a row, with a sun disc above them that turns into a hail cloud over the middle house (see the sun and cloud bullet); **Station B, the cutaway**: the middle house's roof in section, attic and ceiling, with the water path; **Station C, the table and the door**: a kitchen table with the paper ticket on it, then the crew and truck at the roof, then the front door. Captions are set in the scene itself as 5vw headline lines with a 18px line under them, anchored to each station (no side card, no fixed progress strip). Progress is carried by the world itself: the ground line of the panorama is a ruler with eight numbered ticks `[1]` to `[8]` that scrolls with the world, and the four process times are stencilled on the ground under ticks 4 to 7: `Within days`, `On the day`, `Before any work`, `Most roofs: 1 to 2 days`. A bracketed beat counter `03 / 08` sits top-right of the stage. (Ruler and bracketed numerals: SKILLS-CATALOG `number-details` and `container-lines`; counter: Specia1ne, DR-9 entry 569.)
- **Eight beats (copy):**
  1. "April to July. Hail." "Ohio averages 19 hail days a year. A storm can crack shingles without leaving anything you can see from the yard."
  2. "November to March. Freeze and thaw." "50-degree swings in a week crack aging shingles. In January and February, poor attic ventilation lets ice dams form."
  3. "The leak." "Water takes the shortest way in: shingles, underlayment, deck, attic, ceiling. The first sign is a stain."
  4. "Within days. You call." "Rachel answers and coordinates your project from first call to final walkthrough. We schedule your free inspection within days."
  5. "On the day. We walk the roof." "Your project manager checks the deck, flashing and ventilation, and photographs what they find."
  6. "Before any work. The ticket." "A line-by-line estimate with material options and warranty tiers. Nothing starts without your written approval."
  7. "Most roofs: one to two days. New roof." "Tear-off to the deck, deck inspection, the new system, magnet and tarp cleanup."
  8. "Sign-off. Then the warranty starts." "Final walkthrough first. You sign off when you are happy, and that starts your lifetime workmanship warranty."
- **Motion.**
  - Pin: `start: 'top top'`, `end: '+=270%'` on desktop and `'+=235%'` on mobile, `scrub: 0.6`, `anticipatePin: 1`, `invalidateOnRefresh: true`, pin the inner stage element, with `onRefresh` re-applying progress (the owner's house configuration; pinned on phones too, never gated on height).
  - Pan: the panorama `x` tweens from 0 to `-(scrollWidth - clientWidth)` with `ease: "none"` (horizontal pinned world: the `#slideContainer` x tween at fixed percentage steps over a long pinned duration, Here Comes The Sun, DR-8 entry 549; horizontal pin with `ease none`, Pin 2 and horizontal pagination, DR-4 entries 268 and 270).
  - Inside the pan: each beat is a group of about ten linear tweens (Q549: roughly ten tweens per step, `Linear.easeNone` throughout, "scroll position is the playhead"), with beat durations proportional to station width (Q549: `duration = sceneWidth × {1, 1.5, 1.8, 2}`).
  - Depth: four layers (sky and cloud, far houses, the main houses, the foreground ground line) move at different rates across the pin: `yPercent −14 / +10 / +22 / +38` for depths `.12 / .22 / .45 / .65` (Pin + parallax hero, test build R31, from the FWA pattern set), on desktop; on phones the same four layers at half travel.
  - Line-art draws as it enters the viewport: stroke-dashoffset 1 → 0 on a linear scrub (scroll-linked SVG shape reveal with `ease: none`, `scrub: true`, DR-2 Q53).
  - The drop of water follows a measured path through the roof layers (MotionPath-style travel along an SVG path with `ease none` and measured length; the MotionPath Demo, DR-2 Q72, GreenSock pen XWoBypQ: the follower aligned to the path; and the segment idea from the "MotionPath segment loop" row, SitePoint pen wvGKKRo, in the animation-parameter-library: use `0.25 to 0.80` of a path, never the whole loop).
  - Progress: the counter `01 / 08` to `08 / 08` and the lit tick on the ground ruler follow the pan's progress in eighths (my own mapping; Q549's icon nav is not copied).
  - Sun and cloud: the sun disc rides the entry bezier of Here Comes The Sun's `sunpath` (curviness 1.25, `(0,0)` to `(W/3.5, −H/2.5)`, `ease none`, DR-8 entry 549) over Station A. At beat 1 it morphs into a hail-cloud outline (one persistent path, `d` interpolated, 500ms linear colour tween: Morphing Background Shapes, DR-3 entry 146), stays a cloud through beat 3, and morphs back to the sun at beat 7 over Station C. Q549 is a ScrollMagic and TweenMax build; the mechanism is re-implemented here with GSAP 3 and ScrollTrigger.
  - Reduced motion and no JS: the panorama is shown as a vertical sequence of the three stations with the eight beats as a numbered list; no pin.

### Scene 5: THE FINE PRINT (the terms as a ruled ledger)
- **Composition.** Full-width, no boxes, stacked. First a mixed-weight giant statement across the full measure on two lines, `No work starts` (weight 200) and `without your written OK.` (weight 900). Beneath it, also full width, a definition list with leader dots, each row a bracketed number at the far left, the clause, a dotted leader and the value at the right in tabular figures, in three groups with hairline rules between groups.
  - Group `The estimate`: `[1] Inspection with roof photos ......... Free` · `[2] Deck, flashing and ventilation check ......... Free` · `[3] Line-item scope, Xactimate style ......... Free` · `[4] Material options and warranty tiers, in writing ......... Free`
  - Group `The warranty`: `[5] Materials ......... 50 years, non-prorated` · `[6] Workmanship ......... Written lifetime, starting at sign-off` · `[7] Liability ......... $2 million, proof before any crew sets foot on your property`
  - Group `The rest`: `[8] Financing ......... In-house, flexible low monthly payments` · `[9] Discount ......... Military, veterans and first responders, every project` · `[10] Licence ......... Fully licensed and insured. Ohio issues no state roofing licence number, so insurance is what you can check.` · `[11] Roof system ......... Owens Corning Total Protection Roofing System®, installed by an Owens Corning Platinum Preferred Contractor`
  - A closing line under the ledger at right: "If you don't need a new roof, we'll tell you, and show you the photos."
- **Motion.** Leader dots draw left to right as each row enters (`transform: scaleX(0 → 1)`, `transform-origin: 0 50%`, `.6s cubic-bezier(.41,.19,.13,.95)`, Shopify scroll-state, DR-2 Q58), triggered by IntersectionObserver `threshold .1`, rows offset `.1s`. The row values fade in on `var(--t-fade)` with `+0.2s` delay (Raffael Stüken entrance, `0.6s cubic-bezier(.55,.08,.21,.92)`, fade delay `0.2s`, DR-2 Q120). The numbered-ruled-list structure follows the numbered service ledger (Mosaicist, DR-7 entry 470), the reverse-numbered index (Harry Atkins, DR-1 entry 46) and numbered semantic sections (Raffael Stüken, DR-2 Q120). The giant statement uses weight 200 and 900 in one line (ui-ux-patterns).

### Scene 6: THE WORK (counted horizontal strip)
- **Composition.** A strip of five large real photos, each 62vw by 62vh on desktop with a bracketed counter and caption beneath: `01 / 05  Roof replacement · Greater Dayton`, using `job-truck`, `ba1-after`, `ba1-before`, `ba2-after`, `job-charcoal` (ba1 shown as two separate job photos, since the pair may not be the same house). Left-aligned huge heading above the first photo: `Real roofs. Real homes.` A final panel with one line: "Every photo here is from one of our own jobs." and a link to our-work.html.
- **Motion.** Desktop only (`(min-width:1000px) and (orientation:landscape)`): the strip is built as a column-wrap flex strip and pinned, its `x` tweening by `-(scrollWidth - clientWidth)`, `ease none`, `scrub true`, `end: "+=" + travel` so the scroll distance matches the travel (the Horizontal Scroll with Pagination column-wrap strip, DR-4 entry 270, with the `end` corrected as recorded in test build R13). Numbered dots 50px with `border-radius` from circle to square when active, toggled per panel with `containerAnimation` triggers `start "left center"`, `end "right center"` (DR-4 270). Counted carousel counters `01 / 05` (RNDM, DR-7 entry 429). Phone and reduced motion: native horizontal scroll-snap strip, 78vw panels, no pin (the phone rule in test build R13).

### Scene 7: THE HOUSE (services as the parts of one drawn house)
- **Composition.** One full-width sticky stage, no left/right column split. `position: sticky; top: 68px; height: calc(100svh - 68px)` holds a large front-elevation line-art house (brick ranch with gable) drawn across the lower 62% of the stage width, set right of centre. Six scroll chapters of `100svh` each pass beneath it as scroll spacers; the active chapter's text is set on the stage itself, in the open paper above and left of the roofline and overlapping the drawing's sky: bracketed numeral `[01]`, headline in weight 900 at 7vw, two lines of copy at 17px (max 34ch), one text link. A hairline leader line draws from the numeral to the part of the house the chapter is about, and that part gains a blue stroke and a bracketed label while the rest of the drawing drops to 35% ink: Replacement lights the whole roof plane; Repair one patch on the roof; Storm and hail a cloud and hail marks above the roof; Insurance claims a clipboard at the front door; Siding the wall lap lines; Gutters the eave line and a downspout. Before the first chapter the stage shows one bridging line: "Replacement is the big job. Here is everything else we do on the same house." A counter at the stage's bottom-left reads `01 / 06` with a thin 6-segment rail (Pin Sidebar indicator rail, DR-3 entry 153; counters 01/05 and 01/04 in Specia1ne, DR-9 entry 569). No JS and reduced motion: the stage is not sticky; the house is shown fully inked once, with the six chapters as a numbered list beneath it. Honest note: of the ten scenes this is the nearest to "text beside an illustration"; what differs is the full-stage overlap, the leader line, six chapters and the absence of any card (flagged in J).
- **Copy (drafted):**
  - `[01] Replacement. Down to the deck.` "We tear off to the deck and inspect it before anything new goes on. The Owens Corning Total Protection Roofing System® goes on, with a 50-year non-prorated material warranty. Most roofs take one to two days."
  - `[02] Repair. Usually one visit.` "Our repair crew carries flashing, pipe boots and matching shingles, so most repairs are done in a single visit. They do three times the repair volume of replacements."
  - `[03] Storm and hail. 19 days a year.` "Ohio averages 19 hail days a year, mostly April to July. We photograph the damage so your adjuster sees what we saw."
  - `[04] Insurance claims. Paper that matches the roof.` "Photo documentation, a line-item Xactimate scope for the claim, and a meeting with your adjuster on the roof."
  - `[05] Siding. Hardie and vinyl.` "James Hardie and vinyl siding over house wrap, with properly flashed J-channel."
  - `[06] Gutters. Cut on site.` "Seamless aluminum, cut to your house on site. Guards, installation and cleaning."
  - Under the last chapter, one line: "Commercial roofing, EPDM, TPO, coatings, skylights and insulation: see all services." (link to services.html).
- **Motion.** The stage is CSS `position: sticky` (never a GSAP pin, so it cannot trap a phone). Active chapter is set by IntersectionObserver (`rootMargin: "-40% 0px -40% 0px"` is my own value; DR-2 Q58 Shopify Editions supplies the IntersectionObserver vocabulary, thresholds 0/.1/.5 and rootMargins 5%/50px/200px/30%/100%). The house's part highlight is a stroke-colour and opacity transition on `var(--t-scroll)` (`.6s cubic-bezier(.41,.19,.13,.95)`, Shopify). The house's lines draw on the first time the scene enters (`800ms power4.out`, stagger `.12`s; draw-on from DR-4 258). The sticky-stage-with-phases structure follows Sticky Grid Scroll (DR-2 Q94: one tall block, a sticky stage, phased timeline).

### Scene 8: WHO ANSWERS (editorial page with margin notes)
- **Composition.** One tall editorial page. A 6-column running text column starting at column 2, large type (22px/1.5), and a right gutter of numbered margin notes aligned to the sentence they belong to (`(fig. 1)`, `n. 2`, `n. 3`...). The only large image is `team-photo.png` as a full-bleed figure between paragraph 2 and 3 (`(fig. 1) The Rembrandt team.`). No two-column text/photo split.
- **Copy (drafted):** "Franklin 'Bunk' Walker started Rembrandt in 1995 and built the firm's name restoring storm-damaged properties. His son Wade started working alongside him at fifteen, moved from field supervisor to sales manager to vice president, and has been president since 2015. Wade grew up in Dayton and coaches youth sports in Springboro. When you call, Rachel answers. She was born and raised in Springboro, and she coordinates your project from the first call to the final walkthrough. Two U.S. Army veterans work on the crew. Our project managers have 20 to 25 years of roofing experience each, and a dedicated repair crew handles three times the repair volume of replacements. Se habla Español."
  - Margin notes: `n. 1` "Founded 1995. Family-run for two generations." · `n. 2` "Gary Sinise Foundation: we roofed a custom smart home for wounded veteran John Kremer, with Owens Corning Duration shingles and metal accents." · `n. 3` "100 Roofs Challenge, 2024: after the 100th roof of the year, $1,000 each to ten charities nominated by homeowners." · `n. 4` "We sponsor the Heather's Light Foundation golf outing." · `n. 5` "We made donations for Indian Lake tornado relief." Link: "Meet the whole team" (about.html).
- **Motion.** Notes and the figure enter with a soft mask fade: `mask-image: linear-gradient(to bottom, transparent, #000 var(--flash-fade), #000 calc(100% - var(--flash-fade)), transparent)` with `--flash-fade: 4rem` on the photo, and `0.6s cubic-bezier(.55,.08,.21,.92)` entrances with `.2s` fade delay (Raffael Stüken flash masks and entrance, DR-2 Q120). Numbered chapters with decimal subsections and a `(fig.)` caption system: Drs Schuster and Oxley (DR-7 entry 458). Each note appears when its sentence is 60% up the viewport (IntersectionObserver). The photo moves with a single slow parallax layer (`yPercent −8 to 8`, `ease none`, `scrub 1.9`, Nick Ho parallax layers).

### Scene 9: WHERE WE WORK (towns as one type field)
- **Composition.** One block of display text, 4.4vw, weight 300, set in a justified paragraph with the 24 towns separated by slashes: `Springboro / Dayton / Centerville / Miamisburg / Franklin / Lebanon / Waynesville / Beavercreek / Bellbrook / Kettering / West Carrollton / Xenia / Carlisle / Germantown / Middletown / Mason / Monroe / Trenton / Moraine / Huber Heights / Fairborn / Harveysburg / Clarksville / Yellow Springs`. Above it, small: "We work within about 25 miles of Springboro, and across Greater Dayton for storm and emergency work." No map, no chips, no list bullets.
- **Motion.** Letters swell toward the pointer: weight 300 to 900 inside a radius, per-letter spans with an off-screen plain-text copy for screen readers (Variable Proximity, DR-4 entry 171: pointer tracked globally, letters measured on resize, one requestAnimationFrame loop; falloff chosen `(1 − d/r)²` from its linear/exponential/gaussian trio; damping `level += (target − level) × (1 − exp(−Δt/(smoothing × 400)))` with `smoothing 0.2`, snap `0.002`, `Δt` clamped to 64ms). Idle wave when the pointer is still for 500ms: period `3.2s`, peak `0.7`, phase `(x + 0.6y)/span − t/T`, shape `((1 + cos)/2)^2.2`, `span = max(220, 0.85 × width)`, mix time constant `600ms` (the idle wave parameters recorded in DR-4 entry 171). Source Sans 3's weight axis is 200 to 900, so the swell is 300 to 900. Touch, reduced motion and no JS: static weight 400.

### Scene 10: THE CLOSE (a poster, not a form card)
- **Composition.** Full-bleed navy field, 100svh. Centre: `Call. Rachel answers.` in weight 200 at 4vw, then the phone number at about 11vw weight 900 (white, one line) as a link; under it two plain text lines: "Or text the same number. Office hours Monday to Friday, 9 to 5, live status above." and "38 N Pioneer Blvd, Springboro, OH 45066." A single outline button: `Start the 60-second estimate` (opens the Quote overlay). Along the bottom a silhouette roofline in line-art; a sun disc sets behind it.
- **Motion.** Number hover: white to light blue `300ms ease-out-cubic` (Suzanne, DR-2 Q114). The poster has its own 72px amber sun disc. It sets behind the roofline on the exit bezier of Here Comes The Sun's `sunpath` (curviness 1.25, `(W/1.2, −H/2.3)` to `(W/1.1, +H/2.5)`, `ease none`, DR-8 entry 549), scrubbed over the poster's `top 70%` to `bottom bottom` (the range is my choice) and fading out at the end (my choice). No JS and reduced motion: a static disc sitting on the roofline.

### Footer
Directory footer (every service as a link column, address, hours, the same numbers, "Concept redesign" label, copyright), the Monolith Studio style directory footer (DR-1 entry 22). Footer logo on a white plate.

### Where the sun appears (two scenes, no page-long traveller)
The sun is a 72px soft amber disc (no rays) drawn inside two scenes only: in the Job pan's sky (it rises over Station A, becomes the hail cloud, and returns over Station C) and on the Close poster (it sets behind the roofline). The parameters are in those two scenes and in C rows 15 and 16. Phone: 56px, colour change only. A page-long sun was in the first draft of this plan and was cut in the self-check (L, PASS 1).

### Quote overlay (persistent floating "Free estimate" control)
- **Composition.** A pill button fixed bottom-right on desktop (`Free estimate`, with the number `60 seconds` underneath in small type); on phones the existing three-button bar (Call, Text, Free estimate). Opening it reveals a full-screen overlay split in two: left, the questions one at a time (large type, native radios); right, **the ticket** (a ruled sheet) that fills in live: service line, budget range, ZIP, name, and below them the fixed lines Rembrandt will include (`Inspection with roof photos`, `Deck, flashing and ventilation check`, `Line-item scope`, `Material options and warranty tiers`) and `Written approval before any work`. Steps: `01 / 03` Service (six radios) → `02 / 03` Budget range (Under $5,000 / $5,000 to $10,000 / $10,000 to $20,000 / $20,000 or more / Not sure yet) → `03 / 03` ZIP first, then name and phone. Final screen: "You will hear from a project manager within one business day (Monday to Friday, 9 to 5). Storm damage right now? Call (937) 746-7377." Concept label: "Concept redesign: this form is not connected."
- **Motion.** Open and close with a circular clip-path wipe that grows from the button, `expo.inOut`, `0.9s` (Studiogusto, DR-1 entry 44: a circular page transition whose ease profile is `expo.inOut` for the big moves; the source is a WebGL wipe on navigation, so it is rebuilt here as a CSS `clip-path: circle()` and the duration is my choice). Ticket lines write themselves from one state object, and the displayed content is derived from that single state (the CartManager discipline: one config map, every control writes to it, displayed total derived, DR-2 Q98 Silo; configurator state machine with a live preview, BLK, DR-8 entry 531). Budget before name and contact, qualification first (Olha Lazarieva, DR-1 entry 15; Digital Butlers budget radios and a stated time promise, DR-5 entry 317). Resumable via `localStorage`, and first and last touch attribution (UTM and referrer) stored and attached to the lead (gc-lead.js pattern, Green Conception, roofing.md deep read 3). Step indicator `01 / 03` and a "60 seconds" promise on the form itself (Iper's sticky quote button with a step indicator and a 60-second promise, DR-8 entry 561). Esc closes and focus returns to the button; the overlay releases the scroll lock on close.

### Mobile menu
Full-screen SVG overlay, three stacked paths with per-point delay waves: `numPoints 18`, `duration 600ms`, `delayPointsMax 300ms`, `delayPerPath 100ms`, `cubicInOut` (Dynamic Shape Overlays demo 1, DR-3 entry 150), links stagger in after the paths settle. The Services menu on desktop is a plain list panel that opens on hover and focus (timings are my own, no bank source).

---

## C. EXACTNESS: every motion, design decision and UI/UX pattern (consolidated)

**Motion (source, mechanism, parameters, adaptation).** "Mine" marks a value I chose; everything else is quoted from the named source.
| # | Motion | Exact source | Parameters taken | Adaptation here |
|---|---|---|---|---|
| 1 | Cover headline rise | DR-2 Q95 Masked Heading | `rise` preset: glyphs from y 1.15em, `power4.out`, duration 1.1, stagger 0.09 per word, trigger "view" plays once | Words in an overflow-hidden mask, once at load |
| 2 | Cover markup draw | DR-4 258 Fancy SVG Letter Animation | draw-on 800ms easeOutQuint, delay = path × 200ms; dasharray = dashoffset = path length | Three inspection callouts drawn over the real photo; also the Scene 2 leader lines |
| 3 | Cover mixed-rate parallax | animation-parameter-library, Nick Ho "Parallax layers" | linear, scrub 1.9 to 4.3 mixed per layer, `top bottom → bottom top` (here `top top → bottom top`, mine) | Photo 1.9, headline 3.1, number 4.3 |
| 4 | Giant phone number | DR-2 Q114 Jean-Christophe Suzanne | contact as giant type, 60px mobile to 272px desktop, hover colour swap 300ms ease-out-cubic | Sized to fit a phone number on one line (mine); no marquee |
| 5 | Status strip clock | DR-5 324 Haptic; DR-9 569 Specia1ne; test build R42 | live clocks with ticking seconds; live local-time readout; states computed by JS with static fallback | Springboro clock plus computed open/closed |
| 6 | Sheet ruler | SKILLS-CATALOG `container-lines`, `number-details`; DR-9 569 counters; DR-3 153 Pin Sidebar | vertical guide line; bracketed numerals; per-section counter n/total; indicator rail segment per point | Ten ticks, `[04 / 10]`, desktop only |
| 7 | 295-shingle assembly | DR-2 Q92 Infinite Parallax Grid intro | intro tween duration 2, `expo.inOut`, stagger 0.05 | Bottom-course-first order (mine); stagger 2s/295 (mine) |
| 8 | Review count-up | DR-4 279 Count Up | ease-out `cubic-bezier(.33,1,.68,1)`; residual correction so the last frame lands exactly | One number (295); 2s duration is mine, matched to row 7 |
| 9 | Inspection window | SKILLS-CATALOG `reveal-hover-effect`; DR-2 Q95 spotlight; DR-2 Q125 | spotlightRadius 160; smootherstep `u³(u(6u−15)+10)`; tau 0.12s hover and 0.6s idle; idle wander `0.5+0.36·sin(0.37t)` and `0.5+0.22·sin(0.61t+0.9)`; pointerEase 0.1 | CSS radial mask on aligned before/after photos (the sources are SVG clip and WebGL) |
| 10 | Job pin | owner's house pin configuration (this brief) | start 'top top', end +=270% desktop / +=235% mobile, scrub 0.6, anticipatePin 1, invalidateOnRefresh | Pinned on desktop and phone |
| 11 | Job horizontal pan | DR-8 549 Here Comes The Sun; DR-4 268 and 270 | linear tweens (`Linear.easeNone`), about ten tweens per step, duration relative to measured scene width (×1, ×1.5, ×1.8, ×2); horizontal pin with `ease none` | 340vw panorama, 3 stations, 8 beats; GSAP 3 rebuild of a ScrollMagic/TweenMax source |
| 12 | Job depth layers | test build R31 (FWA pattern set) | depths .12/.22/.45/.65 → yPercent −14/+10/+22/+38, scrub 0.6 | Four layers; half travel on phones (mine) |
| 13 | Job line-art draw | DR-2 Q53 Animate SVG Shapes on Scroll | `ease none`, scrub true, start/end by viewport crossing | stroke-dashoffset 1 → 0 |
| 14 | Water path | DR-2 Q72 MotionPath Demo (pen XWoBypQ); library row "MotionPath segment loop" (SitePoint pen wvGKKRo) | follower aligned to path; use start 0.25 to end 0.80 of a path | Drop through the roof layers |
| 15 | Sun/cloud morph | DR-3 146 Morphing Background Shapes | one persistent path, `d` morph, 500ms linear colour tween | Sun to cloud at beat 1, back at beat 7, inside the Job |
| 16 | Sun rise and set | DR-8 549 sunpath | beziers entry `(0,0)→(W/3.5, −H/2.5)`, mid to `(W/1.2, −H/2.3)`, exit to `(W/1.1, +H/2.5)`; curviness 1.25; `ease none` | Entry segment in the Job's sky, exit segment at the Close; scrub range at the Close is mine |
| 17 | Beat counter and ground ruler | SKILLS-CATALOG `number-details`, `container-lines`; DR-9 569 counters | bracketed numerals, guide lines, counters 01/05 style | Eight ticks on the panorama's ground, `03 / 08` counter |
| 18 | Ledger leader draw | DR-2 Q58 Shopify Editions Winter | scroll-state token `.6s cubic-bezier(.41,.19,.13,.95)`; IO threshold .1 | scaleX 0 → 1 from the left, rows offset .1s (mine) |
| 19 | Ledger value fade | DR-2 Q120 Raffael Stüken | `0.6s cubic-bezier(.55,.08,.21,.92)`, fade delay 0.2s | Values after the leaders |
| 20 | Work strip | DR-4 270 Horizontal Scroll with Pagination; test build R13 | column-wrap strip, x = −(scrollWidth − clientWidth), ease none, scrub, `containerAnimation` dots; pin desktop only | Five photos; phone = native snap strip |
| 21 | Counted captions | DR-7 429 RNDM | counted carousels 01/NN | `01 / 05` captions |
| 22 | People notes and figure | DR-2 Q120; DR-7 458 Drs Schuster and Oxley | `--flash-fade: 4rem` mask-image fade; numbered chapters and `(fig.)` captions | Photo mask fade; numbered margin notes |
| 23 | House stage | DR-2 Q94 Sticky Grid Scroll; DR-3 153 Pin Sidebar; DR-9 569 | sticky stage with phased points; indicator rail segment per point; counters | CSS sticky (no pin); six chapters; part highlight |
| 24 | Chapter activation | DR-2 Q58 Shopify Editions Winter | IO vocabulary (thresholds 0/.1/.5); scroll-state token `.6s cubic-bezier(.41,.19,.13,.95)` | rootMargin −40% is mine |
| 25 | Towns type field | DR-4 171 Variable Proximity | per-letter spans with an sr-only copy; global pointer tracking; damping smoothing 0.2, snap 0.002, Δt clamp 64ms; idle wave period 3.2s, peak 0.7 | Weight 300 → 900 on 24 town names |
| 26 | Quote overlay wipe | DR-1 44 Studiogusto | circular page transition; `expo.inOut` for big moves | CSS `clip-path: circle()` from the button; 0.9s is mine |
| 27 | Quote state and ticket | DR-2 Q98 Silo CartManager; DR-8 531 BLK | single state object, derived display, live preview | Ticket fills from one state |
| 28 | Quote flow | DR-1 15 Olha Lazarieva; DR-5 317 Digital Butlers; DR-8 561 Iper; roofing.md deep read 3 | budget before contact, stated time promise, sticky entry with step indicator, resumable + attribution | Three steps, 60 seconds |
| 29 | Mobile menu | DR-3 150 Dynamic Shape Overlays demo 1 | numPoints 18, duration 600ms, delayPointsMax 300ms, delayPerPath 100ms | Three-path overlay |
| 30 | Reduced-motion flag | DR-2 Q107 Anton and Irene; DR-2 Q54 | one global flag read by CSS and JS; jump to final state | `data-motion` attribute |

**Design decisions**
- Layout: sticky stage + scrolling chapters (DR-2 Q94, DR-3 153); full-bleed hero with giant contact type (DR-2 Q114); numbered ruled ledger (DR-7 470, DR-1 46, DR-2 Q120); editorial margin notes with `(fig.)` captions (DR-7 458); a single counted horizontal strip (DR-4 270, DR-7 429); type-field as a section (DR-4 171). The overall conceit, a long reading page told in one drawing, follows chapter stories with inline SVG diagrams and a closing artefact (consider.digital, DR-7 entry 435) and the hand-drawn hour-chaptered day (Daily Rituals, DR-8 entry 539).
- Typography: weight 200 against 900 in one line (ui-ux-patterns mixed-weight giant type); a single variable family; tabular figures in the ledger.
- Colour: paper `#f2f1eb` from Specia1ne (DR-9 569); ink and one blue; amber only for the sun and the status dot; warm stone `#EDECE7` as the tone of the People page (Frame&Co harvest, Level 2 log); catalog `light-mode-paper-technical` (warm paper, dark outer framing, bracketed geometry, restrained accent signals).
- Spacing and framing: thin boundary lines with L-shaped corner brackets (catalog `framed-grid-layout`), vertical guide lines (catalog `container-lines`), decorative bracketed numerals (catalog `number-details`).
- Imagery: only the six real photos and the exact logo; line-art for everything drawn (Q258 single-stroke paths; hand-drawn inline SVG carries every section, DR-8 539).

**UI/UX patterns**
- Phone first, form second (builder-brief emergency-trade doctrine, roofing.md Zoom Drain note in the anatomy): the giant number is the hero action.
- Sticky quote button + overlay with step indicator and a time promise (Iper, DR-8 561).
- Budget before contact (DR-1 15); stated response time (DR-5 317).
- Chapter counters (DR-9 569) and an indicator rail (DR-3 153).
- Native scroll-snap fallback for the horizontal strip on phones (R13).
- Computed hours and status (R42).
- Honest "why you can check insurance" line instead of a licence number (pack ledger; Hippo and Cenco show the verify-it-yourself principle in roofing.md).
- Reduced motion shipped as a designed variant, not removal (DR-2 Q54 jump-to-final; DR-2 Q107 global flag).

---

## D. SOURCE MAP (one table)
| Element | Bank file and entry or site | Mechanism or pattern | How it is used here |
|---|---|---|---|
| Full-bleed cover, giant contact | deep-reads-slice-2 Q114 (Suzanne) | contact as giant footer type, 300ms hover | Phone number is the cover's main element |
| Cover mixed-rate parallax | animation-parameter-library (Nick Ho) | linear parallax, scrub 1.9 to 4.3 | Three layers at 1.9 / 3.1 / 4.3 |
| Cover headline | slice-2 Q95 Masked Heading | rise y 1.15em, power4.out, 1.1s, .09 | Two-line headline reveal |
| Inspection markup on photo | slice-4 entry 258 | stroke dash draw-on, 800ms easeOutQuint | Three callouts over the roof photo |
| Status line, clock | slice-5 entry 324 Haptic; slice-9 entry 569 Specia1ne; test build R42 | live clocks; local-time readout; computed state | Header strip |
| Proof as 295 shingles | slice-2 Q92 + slice-4 entry 279 | centre-out assemble 2s expo.inOut; count-up 2s | Roof of 295 tabs + counter |
| Services house stage | slice-2 Q94; slice-3 entry 153; slice-9 entry 569 | sticky stage; indicator rail; counters | Sticky house, 6 chapters, 01/06 |
| Chapter timing | slice-2 Q58 Shopify Editions Winter | IO vocabulary; scroll-state tokens | Activation and highlights |
| Job pan | slice-8 entry 549 Here Comes The Sun; slice-4 entries 268, 270 | horizontal pinned world, linear tweens, duration relative to scene width | 8-beat panorama, GSAP 3 rebuild |
| Job depth | test-builds slice-7 R31 | 4 depth layers, scrub .6, phone half travel | Four layers |
| Job draw and path | slice-2 Q53, Q72; animation-parameter-library row "MotionPath segment loop" (SitePoint pen wvGKKRo) | scrub stroke draw; path travel; 0.25 to 0.80 segment | Lines draw; drop follows path |
| Sun rise and set | slice-8 entry 549 | sunpath entry/mid/exit beziers, curviness 1.25, Linear.easeNone | Rises in the Job's sky (entry segment), sets at the Close (exit segment) |
| Sun to cloud | slice-3 entry 146 | persistent shape morph + colour | Sun and cloud inside the Job pan |
| Inspection window | SKILLS-CATALOG `reveal-hover-effect`; slice-2 Q95, Q125 | soft radial mask, smootherstep, tau .12/.6, idle wander, ease .1 | Before/after window |
| Work strip | slice-4 entry 270; test build R13; slice-7 entry 429 | column-wrap horizontal pin, containerAnimation dots, counters | Five photos |
| Ledger | slice-7 entry 470 Mosaicist; slice-1 entry 46 Harry Atkins; slice-2 Q120 Raffael Stüken | numbered ruled ledger; entrance .6s cubic-bezier(.55,.08,.21,.92) | Terms |
| Editorial notes | slice-7 entry 458 Drs Schuster and Oxley; slice-2 Q120 | (fig.) captions; flash-fade mask 4rem | People |
| Towns | slice-4 entry 171 Variable Proximity | proximity weight, damping, idle wave | Town type field |
| Quote overlay | slice-8 entry 561 Iper; slice-2 Q98 Silo; slice-8 entry 531 BLK; slice-1 entry 44 Studiogusto; slice-1 entry 15; slice-5 entry 317; roofing.md deep 3 | sticky quote + steps; one state object; circular wipe; budget first; resumable + attribution | Overlay ticket |
| Mobile menu | slice-3 entry 150 | SVG shape overlays with delay waves | Sheet menu |
| Sheet ruler | SKILLS-CATALOG `container-lines`, `number-details`; slice-9 entry 569; slice-3 entry 153 | vertical guide line, bracketed numerals, per-section counters, indicator rail | Page ruler `[04 / 10]` |
| Job ground ruler and beat counter | SKILLS-CATALOG `number-details`, `container-lines`; slice-9 entry 569 | bracketed numerals, guide lines, counters | Eight ticks on the panorama's ground, `03 / 08` |
| Annotation lines on the roof | SKILLS-CATALOG `technical-wireframe-info-layout`, `number-details`; slice-4 entry 258 | annotated line-art, leader lines, stroke draw-on | `[A] [B] [C]` on the 295 roof |
| Reduced-motion flag | slice-2 Q107; slice-2 Q54 | global flag; jump to final | `data-motion` |
| Directory footer | slice-1 entry 22 Monolith Studio | full style directory in the footer | Footer |
| Page conceit | slice-7 entry 435 consider.digital; slice-8 entry 539 Daily Rituals | chapters with inline SVG diagrams and a closing artefact; hand-drawn SVG sections | One drawn sheet |
| Visual system | SKILLS-CATALOG `light-mode-paper-technical`, `framed-grid-layout`, `container-lines`, `number-details`, `technical-wireframe-info-layout` | paper surfaces, corner brackets, guide lines, numerals, annotated line-art | Frames, numerals, callouts |
| Roofing content structure | roofing.md (Stronghold, West London, Hippo, Cenco, Green Conception) | proof early, honesty line, written estimate, "what happens when you call" | Written-estimate ledger, Job beats, honest insurance line |

---

## E. DIFFERENCE AUDIT

**Part 1: each rejected item, what replaces it, and the structural difference**
1. **Proof strip over the hero.** Dropped from the first screen. The header strip now carries status only (clock, open or closed, free estimates, Spanish), with no stars, review count or badges. The proof is a drawn object one scroll later (Scene 2). Difference: no row of proof items near the hero at all; the first draft of this plan kept the proof in the header strip, and the self-check (L, PASS 1) called that the same strip under a new name and removed it.
2. **Hero with a service picker and call/text buttons beside one photo.** Replaced by a **full-bleed cover with giant type and the phone number as the dominant element**. Picker, form card and the two-button row are gone; the estimate lives in an overlay. Difference: one photo as the whole canvas, no side-by-side composition, no card, no controls in the hero. The pack's "hero is funnel step 1" is deliberately dropped (see J).
3. **Stats count-up band.** Replaced by **295 shingle tabs forming a roof** with one counter inside the drawing. Difference: a single built object instead of four equal columns on a band; 30+ years, 50-year and the badges move to the roof's annotation lines and the ledger.
4. **Bento grid of service tiles.** Replaced by **a sticky drawn house with six full-height chapters**. Difference: no tiles at all; services are chapters that light up parts of one drawing, read in order.
5. **Pinned scroll leak-story scene.** Replaced by **a pinned horizontal camera pan across a wide world with three stations and eight beats**, captions in the scene, no side card, no fixed progress strip (progress is a ruler on the world's ground and a counter). Difference: the camera moves sideways over a 340vw world instead of staying on one fixed cutaway; the content, the process steps and the estimate all happen inside it. Honest: this is the closest of the eleven to its banned counterpart, because the owner's rule requires a pinned story on all screens, and a stranger may still read it as "the leak story, sideways". The pin remains for that reason.
6. **Estimate-on-paper section with warranty stamps.** Replaced by a **ruled ledger** (definition list with leader dots, 11 numbered clauses in three groups) and by the **live ticket in the quote overlay**. Difference: no card, no tick marks, no bordered stamp boxes; edge-to-edge ruled rows with right-aligned values.
7. **Before/after slider or blinds.** Replaced by an **inspection window** that follows the pointer, wanders by itself on touch, and sits over a full-bleed photo. Difference: no handle, no slats, no box; one aligned image pair inside one circular window.
8. **Process roofline graphic.** Dropped as a separate graphic; its four steps and their times are **carried by the Job pan** (beats 4 to 7, with the four times stencilled on the ground ruler). Difference: process is not a four-column strip with a drawn line; it is part of the story's timeline.
9. **FAQ accordion block.** Dropped as a block; the answers are **placed where the question arises**: licence and insurance, financing, discount, warranty, system and "if you don't need a new roof" in the ledger; claims in chapter 04; time to install in beat 7; why inspections matter in beats 1 and 2. Difference: no accordion, no question list; the facts live inside the scenes they belong to (promise inside the service copy, DR-1 entry 30).
10. **Town-names section.** Replaced by **one display paragraph that reacts to the pointer**. Difference: not chips or a list: a single type field whose letters change weight under the cursor, with a calm static fallback.
11. **Gable-shaped closing call card.** Replaced by **a full-bleed navy poster with the phone number set huge**, and a button that opens the quote overlay. Difference: no card, no shaped edge, no side-by-side form card; the forms live in the overlay.

**Also removed from the earlier attempts, without a one-for-one replacement:** the marquee of photos (replaced by the counted strip), the community cards (folded into the People page as margin notes), the reviews card (folded into the roof object), ridge-shaped dividers, gable-shaped photo windows, serif italic accent words, the pale-sky rain overlay, the drop-to-shingle traveller, a page-long sun traveller (drafted in this plan, then cut), a header proof strip (drafted, then cut), a cursor follower, the blue/tint/paper band alternation, and the eyebrow + headline + lede header.

**Part 2: each new section, in page order, and how its composition differs from anything built before**
- **Cover.** Before: a two-column hero with a form card and a shaped photo. Now: one edge-to-edge photograph with display type at the bottom and a giant number; three layers moving at different speeds. Not two columns, not a card, no proof strip.
- **The roof of 295.** Before: a band of four equal stat blocks. Now: one centred line-art object about three-quarters of the width, with three borderless annotation lines running out from it. No grid of blocks, no plates.
- **Inspection window.** Before: slider with a handle, then slats, with a reviews card beside it. Now: a pointer-led circular window on a full-bleed photo with no controls on the image, placed before the story instead of after the estimate.
- **The job.** Before: a single fixed cutaway beside a card, with a progress strip. Now: a camera pan over a panorama with captions in the world, a ruler on the ground and a counter. The card is gone and the scene is wider than the screen.
- **The fine print.** Before: a paper card and three bordered stamps. Now: a full-width numbered ledger with leader dots and values at the right margin, stacked under a two-line statement.
- **The work.** Before: a looping marquee. Now: a counted, pinned (desktop) horizontal strip of five large photos with numbered dots; native snap strip on phones.
- **The house.** Before: tiles on a grid or stacked cards. Now: a sticky drawing with the chapter text set over its sky and a leader line to the lit part; six viewport-tall chapters and a counter. Services are never presented as items in a grid. Position moved from third to seventh.
- **Who answers.** Before: a photo and text in two columns, a timeline and four community cards. Now: a long editorial text column with numbered margin notes and one full-bleed photo figure in the middle of the text.
- **Where we work.** Before: a flowing list with separators. Now: a single large paragraph whose letters change weight under the cursor.
- **The close.** Before: a call card and a form card side by side. Now: a poster with a huge number, one button, a setting sun and the quote as an overlay.
- **Quote overlay.** Before: a four-field card in the hero with step dots. Now: a full-screen split with a live ticket on the right.
- **Page rhythm.** Before: alternating coloured bands with shaped dividers, in the pack's blueprint order. Now: one paper sheet with a ruler down its edge; scenes are separated by hairline rules and corner brackets, and by changes in composition grammar, in this order: photo, drawing, photo, pan, ledger, photo strip, drawing, editorial text, type field, poster.

---

## F. WHY THIS REACHES AWARD LEVEL (against the specific references)
- **A pinned horizontal world driven by linear tweens, with one weather actor** (Here Comes The Sun, DR-8 549: a sun on a 3-segment bezier through a pinned world of 118 scenes, "scroll is the playhead"): the Job scene is built on the same mechanism (ScrollMagic and TweenMax in the source, GSAP 3 and ScrollTrigger here), and the sun uses the source's own bezier segments at two points, rising in the Job and setting at the Close.
- **Morph of one shape across chapters** (Codrops Morphing Background Shapes, DR-3 146): sun to cloud to sun inside the Job.
- **One clock, one scroll value remapped per chapter** (Trionn architecture, DR-3 163): all scrubbed motion runs on a single GSAP ticker; the cover's three layers and the Job pan read from the one scroll value.
- **Restraint with a single bold move** (OPX, DR-2 Q57; Raffael Stüken, under 2 KB of JS, DR-2 Q120): the cover has one photograph and one number, and motion is spent on the story, not scattered.
- **Chapter counters and live local time** (Specia1ne, DR-9 569): numbered scenes, the sheet ruler, `01 / 06`, a live Springboro clock.
- **A closing artefact that proves the claim** (consider.digital, DR-7 435): the ledger and the overlay's live ticket are the artefact for "price on paper first".
- **Mixed-weight giant type and contact as type** (ui-ux-patterns; Suzanne, DR-2 Q114).
- **A creative interaction that is cheap and phone-safe** (Variable Proximity, DR-4 171; spotlight window, DR-2 Q95): no WebGL, small JS, with static fallbacks.
- **A quote flow in the award tier** (Iper, Silo, Digital Butlers): sticky entry, step indicator, one state, a stated response time.
- **Reduced motion as a designed variant** (DR-2 Q54, Q107): most award sites in the study ship none; this one ships a variant for every effect.
- **Roofing proof** (Stronghold, West London, Hippo, Cenco; roofing.md): proof one scroll after the cover (the cover itself carries only the phone number and no claims, a deliberate departure flagged in J1), written estimate, honesty line, checkable insurance, local content, none of it dependent on motion.

---

## G. HOW THE FOUR REQUIRED THINGS ARE PRESENTED (none in a banned way)
- **Services:** six chapters on one sticky drawn house (Scene 7), placed after the job, the terms and the finished work; a plain "see all services" line to services.html. No tiles, cards, bento or stacked cards.
- **Proof:** the 295-shingle roof with `295 Google reviews`, `4.9 out of 5 on Google`, and three borderless annotation lines for `BBB A+, accredited since 2001`, `Owens Corning Platinum Preferred Contractor` and `Since 1995` (Scene 2), straight after the cover; the 50-year, lifetime and $2M terms in the ledger (Scene 5). No stats band, no pills row, no proof strip, no plates, no review quotes.
- **Crew and family story:** a long editorial text with numbered margin notes and one full-bleed team figure (Scene 8), with community items as margin notes. No photo-beside-text block, no timeline widget, no card row.
- **Call to action:** the phone number as the biggest object on the cover and again on the poster; a persistent `Free estimate` control that opens the overlay. No hero form, no call card, no form card, no gable shape.

---

## H. MOBILE (375px)
- **Chrome:** the status strip becomes one line, `Open until 5:00 · Free estimates` (clock hidden); header has logo and burger; the three-button bar (Call, Text, Free estimate) is fixed at the bottom; the sheet ruler is hidden.
- **Cover:** photo still full-bleed; headline 15vw in two lines; phone number 12vw on its own line, link tap-sized; the three callouts reduced to two; parallax at half travel.
- **295 roof:** the gable scales to full width, tabs still 295; the number and the three annotation lines stack beneath; assembly timing unchanged.
- **Inspection window:** window radius 22vw; wanders on its own; drag to move; two `Old`/`New` buttons under the photo.
- **Job:** pinned on phones with `+=235%`, same config; the panorama is still three stations but the four depth layers move half as far; captions are 6.5vw; the ground ruler and the `03 / 08` counter stay; the sun disc is 56px.
- **Fine print:** rows become two lines: the clause on top, the leader and value beneath; group titles stay.
- **Work:** native horizontal scroll-snap strip, 78vw panels, no pin, counters shown.
- **House:** the stage becomes `position: sticky; top: 68px; height: 40svh` above the chapters, which scroll beneath it at about 70svh each; the chapter text moves under the stage, the leader line stays; counter overlays the stage.
- **Who answers:** a single column; margin notes become small indented blocks directly after the sentence they belong to; the figure is full width.
- **Towns:** 7vw weight 400, no proximity effect (no pointer); the idle wave is off (static).
- **Close:** number at 11vw wraps to one line; button full width; the sun disc is 56px; the overlay is full-screen with the ticket collapsed into a summary strip above the question.
- **Menu:** the shape-overlay sheet; scroll lock released on close and on resize to desktop.

---

## I. DELIBERATELY EXCLUDED
- WebGL, shaders and Three.js (the ~589 KB toll noted for R32/R34/R35 in the proven-recipes caveats; Variable Proximity and the window effect achieve the interaction without it).
- A preloader or gate (the loader-gate anti-pattern in DR-1 Q26 and the FWA notes).
- Pixel-mosaic page transitions (Catalin Vintila, DR-7 427), 3D text cylinders (DR-2 Q55), peel-letter 3D type (DR-2 Q122): agency-leaning and no trade meaning.
- A map of the service area (the pack forbids it).
- Review quotes, testimonial carousels, invented names, a dollar value stack, a licence number, financing terms, a discount percent.
- Smooth-scroll libraries: native scroll only, to keep pins safe.
- A FAQ block and a separate process section (their facts are placed where they belong).
- Any 3D transform. A CSS-3D tilt on the 295-shingle roof was considered and cut: it adds depth without adding meaning.
- A page-long sun traveller (drafted, then cut in the self-check: it repeated the earlier "traveller" device and added a contrast risk; the sun now lives in two scenes).
- A cursor-follower ring (cut: the earlier builds had one, it caused a bug there, and no scene here needs it).
- Proof claims in the header strip or on the cover (cut: that is the banned proof strip).
- Dark agency styling: the page is warm paper and ink; navy appears only in the closing poster and footer.

---

## J. RISKS AND OPEN QUESTIONS
1. **Deviation from the pack.** The pack's blueprint makes the hero the first step of the estimate funnel. This plan moves the funnel into a persistent overlay and makes the phone number the hero action (phone-first emergency doctrine). The owner should confirm that is acceptable; if the funnel must be in the hero, the cover can carry one inline row ("What do you need? Roof / Repair / Storm / Claim / Siding / Gutters") without a card, but I advise against it.
2. **Pin budget.** The Job pan must carry three stations and eight beats in `+=270%`/`+=235%`. If the pan reads too fast, shorten the panorama to two stations on phones rather than lengthening the pin (the pin length is the owner's rule).
3. **Two pins on desktop** (Job on all screens, Work strip on desktop only). Both must release cleanly both ways; the Work strip's pin end must equal its travel. Reveal triggers below pins must be created after the pins.
4. **Art-style risk.** The Job and House drawings could echo the earlier flat-colour house scenes. Mitigation: ink line-art only (2px strokes, blue as the sole accent, paper ground, no sky gradient, no filled illustration), drawn by stroke.
5. **The 295-shingle metaphor.** "One shingle per review" is a visual count, not 295 individual reviews; the caption says so. No claim beyond the aggregate.
6. **Cover photo and callouts.** The callout positions depend on the real photo's roofline; they must be set by eye at build. If a callout cannot be placed truthfully, it is dropped. Labels are plain trade terms, not claims.
7. **Variable Proximity accessibility and cost.** Each letter is a span; the plain text is duplicated off-screen for screen readers; the loop is IntersectionObserver-gated and stops off-screen. Source Sans 3's weight axis ends at 900.
8. **Sun legibility.** The sun is only in the Job's sky and on the Close poster, behind the drawing and behind the text; at the Close it must not sit behind the phone number.
9. **Weight.** Byte-exact photos and logo make the file about 12 MB; a 1.5 MB twin is kept for review.
10. **Caption honesty.** Photo captions use job type plus "Greater Dayton" only; the ba1 pair is shown as two separate photos because they may be different houses. Rembrandt should confirm towns and the pair.
11. **Mobile menu overlay performance** on older Safari (SVG path animation with 18 points): a plain fade sheet is the fallback.
12. **What I could not verify:** the study is extract-level for most slices (stated at the top); parameters are quoted from those extracts. Real-phone touch behaviour of the pin and the window is untested until a build exists.
13. **Services at seventh.** Moving services to the seventh scene (after the job, the terms and the work) breaks the blueprint order but puts the services list later than a roofing visitor may expect. They are also in the nav list panel and named in the Job. The owner should decide whether that trade is acceptable; the cheap alternative is to swap Scenes 6 and 7, which gives up the photo/drawing alternation.
14. **The Job is still partly an island.** The Job sits straight after the proof, carries the page's content and is the only scene pinned on phones, and the sheet ruler ties the scenes together, but the page does not wrap around it. A stranger may still read it as "the pinned leak story, sideways". The owner's pin rule requires a pinned story, so this cannot be removed, only judged on the first screenshot.
15. **First screen has no proof.** The cover carries the phone number and no claims; the first proof is one scroll down. If the owner wants the 4.9 stars in the first screen, the only option consistent with the ban is a single plain line under the phone number, not a strip.

---

## K. FROM-SCRATCH CONFIRMATIONS
1. This plan copies no code, layout or section stack from any earlier attempt: I wrote it from the pack and the bank entries I read in this session, and I did not open, paste from or adapt any earlier page, script or stylesheet while writing it. The only things shared with earlier attempts are the facts, the six real photos, the logo, the owner's pin rule, and some generic building blocks (native scroll, GSAP, IntersectionObserver) that any build of this kind uses.
2. The architecture is not the banned skeleton: the difference audit in section E takes the eleven rejected elements one by one and the new scenes one by one, and the self-check in L found and fixed places where I had rebuilt a banned device under a new name (including the pack's blueprint order itself). Overlaps in function remain and are flagged rather than hidden: the Job pin (the owner requires a pinned story), the terms ledger, the before/after window, the services drawing and the picker inside the overlay.
3. Every animation and design element appears in the source map (section D) with a named bank entry, test-build record or catalog skill that appears in the tool results I read in this session; PASS 2 in section L re-checked each against the session transcript. Parameters that are my own (the 2s count-up duration, the 0.9s wipe, the 2s/295 stagger, the observer rootMargin, menu timings, scrub ranges) are labelled as mine in section C. Entries marked "(digest)" were read at extract level, not in full.
4. All copy was written fresh for this plan from the pack's facts (the lines in section B). Some phrases will naturally resemble earlier wording because the facts are the same (for example the 19 hail days and the 50-year warranty), but no earlier copy block was pasted or reused.
5. A viewer who saw the earlier attempts should not recognise this as the same template: the first screen is a full-bleed photo with a giant phone number instead of a form card beside a photo, and every later scene has a different composition grammar. I cannot prove this; it is my judgement, tested in the third self-check below, which names the Job and the House as the two scenes most likely to be recognised.
6. I wrote no HTML and edited no existing page in this run. The only file kept is this plan; two scratch text extracts of the session transcript that I wrote in /tmp for the PASS 2 source check were deleted afterwards.

---

## L. TRIPLE SELF-CHECK

Three passes, three different ways of reading. Each pass found real problems in the first draft of this plan; the fixes are already applied above and are listed under each pass. The plan you are reading is the corrected version.

### PASS 1: architecture. Does any planned section reproduce a banned composition under a new name?

Method: I read Section B against Section 0's eleven-item list of what was built before, asking of every scene "what is this, structurally, in the old page?", not "does it look different?".

Found and fixed:
1. **The page order was the pack's blueprint order.** Hero, proof, services, story, estimate, before/after, people, areas, close: the same slots in the same sequence as before, which is exactly the "slot-filling" habit Section 0 names. *Fix:* the scenes now follow the order of the job (call, who answers, result, the job itself, the ticket's terms, finished work, the rest of the house, people, towns, call). Services moved from third to seventh, before/after moved ahead of the story, the estimate ledger follows the story directly, the work strip sits between the ledger and the services. Added design rule 9 and risk J13.
2. **The header status line was the proof strip with a new name.** It sat above the hero and carried stars, review count, BBB and Owens Corning. *Fix:* the strip is status only (clock, open or closed, free estimates, Spanish). All proof claims live in Scene 2. Added risk J15 (the first screen has no proof).
3. **The page-long sun was the old "traveller" device.** Section 0 lists a persistent traveller moving around a fixed stack as a recurring habit; the first draft brought it back as a sun. *Fix:* the page-long traveller is cut. The sun appears in two scenes only: it rises and becomes a hail cloud inside the Job pan, and it sets at the Close. Added to Section I.
4. **The "plates" on the 295 roof were warranty stamps and badge pills renamed.** *Fix:* three borderless annotation lines with leaders (`[A] [B] [C]`), no box, no fill.
5. **The Job's bottom icon rail was the old progress strip.** *Fix:* no fixed strip; progress is a ruler on the panorama's ground plus a `03 / 08` counter.
6. **The Fine Print used a left-third / right-two-thirds split,** the two-column symmetry Section 0 rejects. *Fix:* stacked: a full-measure two-line statement over a full-width ledger.
7. **The House was a text column beside an illustration with a progress rail,** which is the old story scene's composition. *Fix:* one full-width sticky stage with the chapter text set over the drawing's sky and a leader line to the lit part, no column split. This is improved, not removed (see below).
8. **Three drawing scenes in a row (roof, house, job) and two pins close together.** *Fix:* the new order alternates photo, drawing, photo, pan, ledger, photo strip, drawing, text, type, poster, and the two pins (Job, Work) now have the ledger between them.
9. **"The signature is the spine" was not true.** The Job was a pinned scene mid-page, which Section 0 calls an island. *Fix:* the claim is softened in design rule 7 and recorded as risk J14; I added the sheet ruler to give the scenes one numbered thread, but I do not claim the page wraps around the Job.

Still true after the fixes, and not hidden:
- The Job is a pinned drawn story of hail, leak and repair, which is banned item 5's function. The owner's pin rule requires it. Only its geometry (sideways pan, no card, no strip) and position differ.
- The ledger still carries the estimate and warranty content of banned item 6, and the window is still a before/after (item 7); both differ in structure, not in function.
- The overlay still contains a service choice and step dots (item 2's function), moved off the page into a full-screen split with a live ticket.
- The House is still the nearest scene to "text beside an illustration".

Result: PASS 1 found nine problems in the first draft (five were banned devices under new names, one was the blueprint order); all nine are fixed in the plan; four functional overlaps remain and are flagged.

### PASS 2: sources. Is every element in the source map, with a real named source I actually studied?

Method: I did not trust my recall (AGENTS.md lesson of 2026-10-27). I extracted the tool results of this session's transcript, excluded the echoes of my own plan, and searched them for every named entry and for each quoted parameter. I did not re-read the bank itself. Two scratch extracts written to /tmp for this were deleted afterwards.

Confirmed present in what I read (existence of the entry and the quoted values):
- Here Comes The Sun 549 (the `sunpath` entry, mid and exit beziers with the exact `/ 3.5`, `/ 2.5`, `/ 1.2`, `/ 2.3`, `/ 1.1` fractions and `curviness: 1.25`; duration relative to scene width with ×1, ×1.5, ×1.8, ×2; `Linear.easeNone`; about ten tweens per step).
- Q95 Masked Heading (rise from 1.15em, `power4.out`, duration 1.1, stagger 0.09, spotlightRadius 160, smootherstep, wander 0.37 and 0.61, tau 0.12 and 0.6); Q92 (intro tween 2, `expo.inOut`, stagger 0.05); Q125 (pointerEase 0.1); Q114 (60 to 272px, 300ms ease-out-cubic); Q58 (all five timing tokens, IO vocabulary); Q120 (`--flash-fade: 4rem`; the entrance curve); 258 (draw-on 800ms easeOutQuint); 279 (the bezier and the residual correction); 171 (smoothing 0.2, snap 0.002, 64ms clamp, 3.2s idle wave); 150 (numPoints 18, 600, 300, 100); R31 (depths and yPercent); Nick Ho (scrub 1.9 to 4.3); Haptic 324 and Specia1ne 569 (live clock; local-time readout; counters 01/05, 01/04; paper #F2F1EB); and the catalog skills `light-mode-paper-technical`, `framed-grid-layout`, `container-lines`, `number-details`, `reveal-hover-effect`, `technical-wireframe-info-layout`.
- Entry titles present for 268, 270, 146, 153, 163, 470, 46, 458, 429, 435, 539, 561, 531, Q94, Q98, Q107, Q53, Q72, 44, 15, 317. For these I confirmed the entry and its mechanism summary; I did not re-verify every number I attached (for example the 50px dots in 270, the `containerAnimation` trigger names, the details of 429, 458, 470, 435, 539).

Found and fixed:
1. **A wrong attribution.** "DR-1 entry 36" for the `0.25 to 0.80` path segment is not an entry: the value is the animation-parameter-library row "MotionPath segment loop" (SitePoint pen wvGKKRo). Q72 is the MotionPath Demo (GreenSock pen XWoBypQ). *Fix:* both citations corrected in Scene 4, Section C (row 14) and Section D.
2. **A citation I could not find.** "Q549's 10-icon progress nav" has no match in what I read (the bank notes an icon progress nav, I never saw a count of ten). *Fix:* removed with the rail; the progress counter and ground ruler are cited to the catalog skills and Specia1ne counters, and marked as my own mapping.
3. **An element in the source map with no scene.** The cursor-follower ring appeared in C and D but in no scene of B, and the earlier builds' cursor follower had a bug. *Fix:* cut from C, D and added to Section I.
4. **My own values presented as sourced.** The observer `rootMargin: -40%`, the 2s count-up duration, the 0.9s overlay wipe, the 2s/295 stagger, the mega-menu 90ms/140ms timings, scrub ranges at the Close and half-travel on phones had no source. *Fix:* each is labelled "mine" in B and C, or (menu) stated as having no bank source.
5. **Two sources adapted further than stated.** Studiogusto (44) is a WebGL circular wipe on navigation, here rebuilt as a CSS `clip-path` circle; Q549 is a ScrollMagic and TweenMax build, here rebuilt in GSAP 3. *Fix:* both stated in the scene text and in C.
6. **A claim I could not support.** The first draft said the source fades the sun to opacity 0 at the end; I did not find that in the `sunpath` object. *Fix:* the fade at the Close is stated as my choice.
7. **New elements added by the fixes** (sheet ruler, ground ruler and counter, annotation lines) now each have a source-map row and a catalog or bank source.
8. **K3 said "bank entry or catalog skill".** R13, R31 and R42 are test-build records, not bank entries. *Fix:* K3 now says so and says the "(digest)" entries were read at extract level.

Result: PASS 2 found eight problems (one wrong attribution, one unfindable citation, one orphan element, own values passed off as sourced, two over-stated adaptations, one unsupported claim, one wording error); all are fixed. Honest limit: the check proves what I read in this session, much of it at extract level (Section "Study basis"); it does not prove the extracts were complete.

### PASS 3: the stranger test. Reading only Section B as someone who saw the old pages, would they call it the same template?

Method: I re-read Section B alone, as a list of scenes, and compared it against the list in Section 0 as a stranger would: first screen, order, what each screen is made of, what repeats.

What the stranger sees as different (I am confident in these):
- The first screen: a full-bleed photograph with a giant phone number and no card, no form, no proof row, no two-column split. The old first screen was a text-left, form-and-photo-right hero.
- The order: proof first, then the before/after, then the job, then the terms; services come after the finished work. The old page ran hero, stats, marquee, services, story.
- The grammar changes every scene (photo, object, window, pan, ledger, strip, sticky drawing, editorial text, type field, poster). The old page was bands and cards.
- No cards, tiles, stamps, pills, FAQ block, marquee, form card or shaped photo anywhere.
- The visual language: paper, ink line-art, bracketed numerals, a ruler down the page edge; the old page used coloured bands, white boxes and flat-colour illustration.

What the stranger could still call familiar (I am not confident the plan has removed these):
1. **The Job.** A pinned scroll scene with a drawn house cutaway, hail, leak and repair in a sequence is the old signature in function. It is wider and sideways now; it may still read as "the same pinned story".
2. **The House.** A sticky line drawing of a house with text changing beside it is the old story-scene idea applied to services. This is the scene I rate most likely to be called the same.
3. **The tail.** People, then towns, then a close with a call, is the old tail in a similar order.
4. **The overlay.** A service choice, budget and name in steps is the old funnel moved into an overlay.
5. **Palette and type.** Blue on pale paper with a navy close is close to the earlier colour world; the changes are structural, not chromatic. If the owner objects to colour, the plan does not address it.

Fixes made as a result: the House was recomposed (full-stage overlap, leader line, chapter text on the stage, moved to seventh) and the Job lost its card, strip and icon rail; I stopped short of changing either scene's subject, because the owner's pin rule and the services requirement fix it.

Verdict, stated plainly: as a whole page, a stranger who saw the old pages should not call this the same template, because the first screen, the order and the grammar of nearly every scene differ. For two scenes, the Job and the House, I think a stranger could say "that is the old drawn house with new motion". I cannot prove otherwise from a text plan; the first built screenshot of those two scenes is the real test (J14).
