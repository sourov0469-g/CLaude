# GATE-RESET-6 · Section 6 "Do you come to me?" (a town finder on a contour ground)

**Where:** on `owl-reset.html`, after the people (5). The sky turns back to day. Source: `reset/sections/06-towns.html`.

**Treatments shown:** Night Owl and **Safety** (palette rotation). All four palettes pass axe.

## 1. What it is (one homeowner sentence)
*Type your town (or tap it) and the page tells you straight whether Owl comes to you.*

- **The ground:** a contour-line field (rings around five rises, drawn once as SVG lines). It is a ground, not a map picture; there are no roads or borders to misread.
- **The towns:** Owl's own 29 towns (the list from the site's area section) as dots. Each is placed from its approximate public coordinates, so the geography is right: Shoreview in the middle, Stillwater to the east, Maple Grove to the west, Apple Valley to the south. Seven anchor towns are labelled.
- **Home:** Shoreview carries the owl in a deep disc. Its label sits above the disc so no neighbouring dot covers it.
- **The ask card:** "Do you come to me?", one big input ("Type your town, or tap a dot") with the 29 towns as suggestions, and one answer line read aloud (`aria-live`).

| You do | The page answers |
|---|---|
| type "Roseville" (or "Rosev", or "st paul") | **Yes, we come to Roseville.** About 5 miles from our Shoreview base, as the owl flies. The dot lights in the accent with a ring. |
| tap or press Enter on a dot | the box fills with that town and gives the same answer |
| choose Shoreview | **Yes. Shoreview is home.** Our office is at 1000 County Rd E #230, Shoreview, MN 55126. |
| type a town that isn't listed ("Duluth") | **Duluth isn't on our list of 29 towns.** Call (651) 977-6027 and ask; we'll tell you straight. |
| clear the box | We come to 29 towns around Shoreview, MN. |

- **Layout:** on desktop the card floats top-left and the towns are projected into the right 56 % of the field, so no dot hides under the card (a check enforces it). On phone the card sits above a square-ish field.
- **What this section replaces:** the old "Service area" section, a list of 29 town names in columns. The list is now something you ask, not something you scan.
- **Not pinned.** The page's pinned budget (three stages) is spent; this section sits in normal flow.

## 2. Mechanism evidence: Lando Norris (live) and Bruno Simon (scoped)
**The sheet:** `gates/reset/s6/mechanism-side-by-side.jpg`. It sets three Lando frames beside three of mine. The phone frames are in `phone-strip.jpg`.

**What the Lando probe captured** (`reset/evidence/lando/`: `sheet.jpg`, `facts.json`):
- Thin contour rings run under the whole site, on dark bands and light ones alike. Photos, a signature and headlines sit on top of them.
- The rings are quiet (low contrast, one line weight); they say "terrain" without competing with the content.
- Lenis smooth scroll, 21 canvases, 129 scroll-linked changes on a 13,577 px page.

**Transferred:**
- the contour ground as the section's surface;
- one weight of thin line at low contrast, with every fourth ring a little darker (an index contour, as on a survey map);
- things placed on the ground (for Lando, photos; for Owl, its towns).

**From Bruno Simon, scoped to one section:** "explore to find". The answer is something you find by acting (typing or tapping), not something you read. Bruno's 3D world and driving were not taken; no frames are claimed for it.

**What does not transfer, and why:**
- **Lando's dark ground and neon accent.** Owl's section is on the light day sky.
- **The canvas-drawn, scroll-animated rings.** Owl's are drawn once, in plain SVG, and do not move: the moving part is your answer, not the ground.
- **Lenis smooth scroll.** Owl uses native scroll.
- **Bruno's 3D world.** A homeowner checking coverage needs one box and one answer, not a game (and games are out of scope).

## 3. Five-question homeowner check (from the screenshots, per treatment)

### Night Owl
**Screenshots:** `night-1440-*.jpg` and `night-390-*.jpg`.

1. **What is it for?** I find out if Owl works in my town, and how far it is from their office.
2. **Under 3 seconds?** Yes. "Do you come to me?" over a field of dots around an owl reads at once, and the box says what to do.
3. **Interesting, playful or fun, and exactly what makes it so?**
   - My town lights up on the ground with a pulsing ring, and the page answers me in a sentence: "Yes, we come to Stillwater."
   - "As the owl flies" is a small joke that is also true (it is straight-line distance).
   - The contour ground makes the area feel like a place, not a list.
4. **Is every element there for a reason?** The headline (the question I have), the box (the fastest way to ask), the dots (to see where I am relative to them), the owl home (where they start from), the answer line (the reply), and the count chip ("29 towns"). Complexity without a reason: none.
5. **Does it fit a stressed homeowner?** Yes. One question and one answer. A town that isn't listed gets an honest answer and the phone number, not a dead end.

### Safety (orange)
**Screenshots:** `safety-1440-*.jpg` and `safety-390-*.jpg`.

1–2. **Purpose and speed:** the same.
3. **Fun:** the same; the lit dot is safety-orange and reads more like a marker pin.
4. **Every element for a reason:** the same.
5. **Stressed homeowner:** yes. Unlike section 3, the orange suits a "find it" moment; it is a good fit here.

**My comparison:** both work. Night Owl's gold dot is calmer; Safety's orange is easier to spot on the grey ground. The ground itself is the same in both.

## 4. Skill ledger
- **The ask:** ⟦S1453⟧ search UX (suggestions from a datalist; whole-name, "St." and 3-letter-prefix matching; an honest no-result answer with a next step).
- **Answer line:** ⟦S0409⟧ a short rise on each new answer; `aria-live="polite"`.
- **Dots:** ⟦S1107⟧ real buttons, keyboard Enter; ⟦S1441⟧ 44 px hit areas; each has a spoken label with its distance.
- **Contour ground:** ⟦S1435⟧ one deviation (the ground), everything else plain.
- **Honesty:** ⟦S1306⟧ no invented coverage. Only the site's own 29 towns are "yes"; distances say "about" and "as the owl flies".
- **Reduced motion:** ⟦S0400⟧. No pulse ring and no answer rise; the answer still changes.

## 5. Checks: `gates/reset/s6/checks.json` · **26/26 PASS** (`tools/reset-test.cjs towns`)
- **axe WCAG 2.1 A/AA:** 0 violations in all four palettes.
- **Facts and skeleton:** the facts lock passes, and the no-skeleton rule passes.
- **Not pinned:** no sticky element; the section is under 2.2 screens tall.
- **The site's own 29 towns:** 29 dot buttons, 29 suggestions, "29 towns", Shoreview marked as home with the owl.
- **A contour ground:** at least 20 drawn rings.
- **Typing:** "Roseville" answers yes with a distance and lights dot 6; "st paul" finds Saint Paul; "Still" finds Stillwater.
- **Not listed:** "Duluth" gives the honest answer and the phone number, with no dot lit.
- **Safety:** typed text is never injected as markup (`<img src=x>` stays text).
- **Clearing** the box restores the opening line.
- **Tapping** a dot fills the box and answers (Stillwater). **Shoreview** answers with the real office address.
- **Keyboard:** Enter on a focused dot answers (Saint Paul); every dot has a spoken label with its distance.
- **No dot hides under the ask card** on desktop.
- **Layout:** no sideways scroll at 1440, 768 or 390; controls at least 44 px.
- **Reduced motion:** no looping animation.
- **No page or console errors.**

## 6. Scorecard (weights Design 40 · Usability 30 · Creativity 20 · Content 10)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.2 | 3.28 |
| Usability | 30 | 8.9 | 2.67 |
| Creativity | 20 | 8.0 | 1.60 |
| Content | 10 | 8.8 | 0.88 |
| **Total** | **100** | | **8.43** |

Recomputed: 8.2 × 0.40 + 8.9 × 0.30 + 8.0 × 0.20 + 8.8 × 0.10 = 3.28 + 2.67 + 1.60 + 0.88 = **8.43**. Pass: ≥ 7.0, lowest category 8.0, zero vetoes.

**Why not higher:** Design loses for the crowding around Shoreview on phone (D1). Creativity loses because the ground is still; it is a strong, quiet surface, not a moment that surprises.

**"Same kind as anything already on the page?"** No. Section 2 is a choice that opens a scene; this is a question you type and a place that answers. It is the first section where the visitor writes.

## 7. Defects found and fixed in-session
1. **The ask card covered the western towns** (Maple Grove, Plymouth, Minnetonka) and part of Shoreview's neighbours. The towns are now projected into the right 56 % of the field on desktop, and a check asserts no dot sits under the card.
2. **Shoreview's own dot sat on top of the home disc,** and its label was cut by Arden Hills' dot. The dot is now invisible inside the disc (the button stays), and the label sits above the disc, layered over its neighbours.
3. **The "29 towns" chip hid behind the call pill** at the bottom right. It moved to the top right.
4. **The phone evidence frames** were taken with section 5 in view (a scroll offset in the evidence script, not the page). The script now scrolls to the ask card after each step.

## 8. Remaining defects (named)
- **D1 · phone crowding near Shoreview.** Seven towns lie within about 5 miles of the office (Arden Hills 2, New Brighton 3, Mounds View, North Oaks and Vadnais Heights 4, Little Canada and Roseville 5), so on a 390 px screen their dots touch and their 44 px hit areas overlap. Tapping in that cluster may pick a neighbour; typing is exact. A pinch-zoom or a magnified inset would fix it.
- **D2 · approximate positions.** Dots use public town-centre coordinates and straight-line distance. They say "about" and "as the owl flies", but a homeowner at a town's edge may be a few miles off.
- **D3 · no street-level check.** It answers by town, not by address; an address near a border still needs a call (the answer for unlisted towns says so).
- **D4 · a still ground.** Lando's rings are part of a moving page; mine do not move. That is deliberate (the answer is the motion), but it lowers creativity.

## 9. Vetoes: **zero**
- Only the site's own 29 towns and locked facts (the address, the phone number).
- No invented coverage, no drive times and no promises of arrival times.
- The logo is unchanged; the owl illustration is the site's own.
- A light ground.
- No sub-agents or background tasks; every command ran in my thread, in the foreground, with a time limit.
