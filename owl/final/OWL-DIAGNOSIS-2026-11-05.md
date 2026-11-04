# OWL — Diagnosis (2026-11-05): why it is not working, and what changes

Written by the build session after the owner's verdict on the review copy: everything feels the same, document-type, no immersiveness, references named but not learned from. He is right. This file is evidence from my own gates and source, not adjectives. It contains no building.

---

## 1. Why the versions kept coming out as the same thing

**I reused one skeleton and changed the costume.** Counted across the 21 versions of the +5 pass (Hero 11–15, Video 11–15, Explore 11–15, Wise Check 10–14, Protect 10):

| Skeleton part | Versions that have it |
|---|---|
| Kicker + h2 heading at the top (the heroes excepted) | 16 of 16 non-hero versions |
| An amber primary button at the bottom | 18 of 21 |
| The (651) 977-6027 call button at the bottom | 20 of 21 |
| Any scroll-driven behaviour (sticky stage, scroll-linked motion) | **0 of 21** |
| A sticky stage, across all 142 section files in the site | 10 files |

**The skeleton, in order, nearly every time:**
1. A centred kicker, then the h2, then a one-line lede.
2. ONE self-contained widget in a rounded box.
3. A status line that swaps when you finish the widget.
4. Two buttons: amber Book and outlined Call.

It shows up in all of these:
- **Explore 14:** the sentence widget.
- **Explore 15:** the clothesline widget.
- **Wise Check 11:** the fog widget.
- **Wise Check 12:** the bubbles widget.
- **Wise Check 13:** the week-strip widget.
- **Protect 10:** the magnet widget.

Wise Check 10 and 14 are the same thing mirrored: words left, widget right.

**Why it happened:**
- The method rewarded it. The pacing was one version per gate, each judged alone.
- My scorecard measured things a single box can pass: the button system, 44 px targets, axe, honest copy, a five-question self-check answered by the same mind that built it.
- No gate ever asked "is this a different *kind* of thing from the last ten?" or "how does it feel in the page around it?". So I optimised the widget and never the page.
- Every version also restates the brand promise and ends in the same two buttons, so ten sections read as ten adverts.

**The page itself:**
- Ten independent sections, each opening with a heading block and closing with a button row.
- Light cream from top to bottom, with nothing that carries the eye from one section to the next.
- That is the "document" feeling: a stack of cards, not a place.

## 2. Why the named references did not transfer

The teardowns in `research/REFERENCE-TEARDOWNS.md` record the real mechanisms. My gates named those references, but what I built only used a mood or a micro-detail from them:

| Version | Reference I claimed | The mechanism the teardown records | What I actually built |
|---|---|---|---|
| Wise Check 10 "We Climb, You See" | **Apple AirPods Pro** | **Pinned scroll stages** (12 sticky stages, 16 scrubbed or in-view films). Scroll drives the scene, and one proof per beat. | A click/drag slider with 4 rungs that swaps 4 photos. Nothing is pinned, nothing scrubs, and scroll does nothing. |
| Wise Check 14 "Knock Knock" | **MERSI** | **Scroll-driven split covers.** A 900,425 px scroll sequence where the seam between two halves is the navigation and a name card sits on the seam. | A door that flips once when clicked. There is no seam, no chapters and no scroll. |
| Wise Check 11 "Clear It Up" and Protect 10 "Not a Nail Left" | **Quiet Cubes** | A **configurator-first instrument**: the first act is a choice about your own case, and the rest of the page is tailored to it. | A fog-wipe toy and a magnet toy. Neither choice changes anything else on the page. |
| Explore 14 "Say It Your Way" | **Lando Norris** | **The archive:** curated real objects in a strict grid with year tags, on a contour-line ground. | A letter-roll micro-animation I had studied for the buttons. |

**The root cause:**
- I named a reference in the plan line, then built from my own habits. No gate asked for evidence (frames of the reference in motion beside frames of mine).
- The Quiet Cubes capture on disk (`redo/evidence/quietcubes/quietcubes-sheet.jpg`) is 32 frames of a black loading screen. Its instrument was never actually seen, yet I cited it as a governing reference in two gates.
- The references were never copied at code level in the versions. The teardowns record the stacks: GSAP + ScrollTrigger + Lenis, sticky stages, clip-paths. My versions used none of that machinery.

## 3. Why sections landed as document blocks

**Explore, Wise Check and Protect are explanations of Owl's offer.** They cover the layers of a roof, what the Wise Check covers, and how the Protect Your Nest system works. A stressed homeowner does not want the offer explained; they want their problem handled.

| Current section | What it does now | Its real job for a stressed homeowner |
|---|---|---|
| Hero | A photo, a slogan and buttons. | "You found the right people; here is the number." |
| Video | A film in a frame. | "These are real people doing real work." That belongs inside the experience, not in a box of its own. |
| Explore | Teaches roofing, then (after the addendum) a series of self-check toys. | "What is going on with MY roof, and what will you do about it?" |
| Wise Check | Explains the check's four parts. | "Someone careful will look and show me." This is a step, not a section. |
| Protect | Explains wrap, three passes and the box. | "My house and garden will be fine." Also a step, not a section. |
| Services | A list of services. | Nobody shops a list. The service follows from their problem. |
| Reviews | Stars and "5.0 · 90+". | "Other people trusted them." The numbers are the proof, so make them events. |
| Area | A town list or map. | "Do you come to me?" A yes/no question. |
| Family | Two families' photos. | "Who will be at my house?" |
| Booking | A form. | "Call, or leave the details; nothing else." |

**Three of the ten sections (Explore, Wise Check, Protect) are really one story:** problem, then look, then fix, then clean up. They are split into three boxes and each is explained separately. That split is the heart of the document feeling.

## 4. The new homepage map: seven sections, each a different kind

**One rule above the list:** it is one continuous scroll world, not stacked blocks.
- A sky that changes from first light to evening runs down the page, and the real owl travels with you.
- The **call stays reachable everywhere** through one persistent, quiet call pill.
- Sections stop ending in button rows. Each section has at most one in-flow action, and only where it earns it.

| # | Section | Kind | Reference and the exact mechanism taken |
|---|---|---|---|
| 1 | **Arrival** | Film moment | **Scout Motors:** a full-bleed film or still with one line set at photo scale. Owl's own crew footage (`crew.mp4`) fills the screen, with one line and the number. |
| 2 | **"What's going on up there?"** | Instrument (configurator-first) | **Quiet Cubes,** this time actually studied: the first act is a choice about *your* case (Leak · Stain on the ceiling · Shingles missing · After a storm · It's just old · Not sure). It answers what Owl will do, and the choice **tailors the rest of the page** (the scroll scene's first beat, the call panel's prepared message). |
| 3 | **"You do nothing"** | Pinned scroll scene | **Apple AirPods Pro:** a sticky stage; scroll scrubs Owl's own crew film and swaps one proof per beat. The beats are the Wise Check look, then the wrap goes on, the new roof, three cleanup passes, and the box on your doorstep. The homeowner scrolls and the crew does the work. Wise Check and Protect live here as beats, not as sections. |
| 4 | **The numbers** | Numerals as events | **Apple numerals plus the Longbow doctrine:** giant locked facts, one per beat as you scroll: 5.0 · 90+ reviews, 10-year workmanship, up to 50-year manufacturer warranties, GAF Systems Plus, 29 towns. Each has a small grey line under it. No invented quotes. |
| 5 | **Who shows up** | Split cover, people | **MERSI:** a split cover with a seam; the Browns and the Berglands on either side, and a name card on the seam that cycles with scroll. Real family photos only. |
| 6 | **"Do you come to me?"** | Explorable map moment | **Lando's contour ground plus Bruno's "explore to find" (scoped):** a contour-line map of the 29 towns around Shoreview. Type your town or tap a dot, and it answers yes. |
| 7 | **Call** | One big friendly panel | **Longbow's end-card restraint:** one huge number, today's hours, "or leave your details". It is pre-filled from section 2's choice (honest mailto, never "sent"). |

**Kept, merged or killed:**
- **Kept:** Hero, as section 1 (rebuilt as film).
- **Merged:**
  - Video into section 1 and section 3.
  - Explore into section 2.
  - Wise Check, Protect and Services into sections 2 (the answer names the service) and 3 (the beats).
  - Reviews into section 4.
  - Area into section 6.
  - Family into section 5.
  - Booking into section 7.
- **Killed as standalone sections:** Explore, Wise Check, Protect and Services.

The old versions all stay in `owl-roofing.html` as hidden records; nothing is deleted.

## 5. Colour: three trials, one control, research-first

**What is actually wrong with the current colours:**
- The problem is less amber itself than value range. Cream ground, cream cards and an amber accent all sit in one warm, mid-light band.
- So there is no anchor (nothing deep enough to hold a section) and no cool counterweight to the warmth.
- Every section therefore looks like the one before it, which feeds the "same thing again" feeling.

**Trade research on record:**
- Blue reads as trust and is the most-used colour family in roofing.
- Orange and red read as urgency.
- Charcoal and grey read as strength.
- Green (Austin's family) and clay (Elbaz's) are excluded.

**The palettes** (each has light-dominant structure plus ONE accent family; contrast is WCAG 2.1, computed):

| Palette | Ink · accent · ground | Ink on ground | Ink on accent fill | Notes |
|---|---|---|---|---|
| **Control:** Ink & Amber (today) | #17111D · #EAA221 · #F1EFE6 | 16.07 | 8.54 | Amber text on the ground fails (1.88), so text accents use #8E5A12 (5.03). |
| **A:** Night Owl | #0F1B2D navy · #F5B83D owl-eye gold · #F7F5F0 paper | 15.86 | 9.72 | Trust-blue structure. Gold *is* the owl's eye in the existing mark, so brand continuity holds. Text-gold #855A0A (5.56). |
| **B:** Safety | #1E2124 charcoal · #FF6A13 safety orange · #FAFAF7 | 15.47 | 5.64 | Urgency. It reads as "storm call-out"; could feel alarming as a whole-site tone. Text-orange #B4440A (5.32). |
| **C:** Slate & Brass | #283440 slate · #C79A3B brass · #EEEEEA stone | 10.91 | 4.90 | Calm premium; least energetic. Text-brass #7C5C1C (5.30). |

**My call, using the full-rights override:**
- **Night Owl (A) becomes the working default for the new reset page.**
  - It adds the missing deep anchor (navy bands for the scroll scene and the numbers).
  - It adds the cool counterweight (trust blue).
  - It keeps the warm accent the owner already knows, because gold is the owl's eye.
- **Control, Safety and Slate & Brass stay one tap away** through a labelled switch (`?palette=control|safety|slate`), so the owner sees all four in the morning and picks with his own eyes.
- **Light stays dominant.** The deep navy appears only as anchoring bands (the pinned scene, the numbers), never as an all-dark page.
- **The logo mark keeps its shape.** Treatments recolour it only through the same tokens.

## 6. What I will do differently, mechanically

1. **Mechanism before build, with evidence.** For each section, before any code, I study the named reference live and save frames in motion states (the same scroll positions or interaction states) plus the code facts (sticky counts, scroll-linked styles, the library calls in the DOM) into `reset/evidence/<section>/`. The gate shows reference frames and my frames side by side at matching states. A named but unstudied reference fails my own gate.
2. **One page, one world.** I build on a new single page (`owl-reset.html`), section after section in order, each judged *in place* in the page around it, not alone in a `?sec=` view. The gate screenshots include the seam with the section before.
3. **Ban the skeleton.**
   - No kicker-h2-lede opener and no per-section button row.
   - Headings are set at scene scale inside the experience.
   - The call lives in one persistent pill, plus the final panel.
   - My gate checks this explicitly ("does it open with kicker + h2 + lede, or end with Book + Call? then it fails").
4. **Scroll is a material.** At least three of the seven sections are scroll-driven (sticky stage, scrubbed film, cycling seam). The pinned stages are used with care: short, skippable, keyboard-reachable, and with a reduced-motion version that is a plain sequence.
5. **Tokens for everything.** Every colour comes from palette tokens, so the four palettes switch the whole page and the comparison is honest.
6. **A different judge question.** My scorecard keeps the arithmetic, but adds a mandatory "same kind as anything already on the page?" check and a "what would the owner say at first sight?" note, written from the screenshot *before* the checklist.

## 7. Where I disagree with the reset plan

1. **"Proof as an experience: real photos, real reviews moving."** Owl's review content on record is only "5.0 · 90+ reviews": no quotes and no names. A moving reviews experience would need invented quotes, which breaks truth. So proof becomes **the numbers** (section 4) plus real people (section 5), not moving reviews.
2. **"Build exactly one proof section first, alone."** I agree the problem-finder goes first, but immersiveness is mostly *continuity*, which one isolated section cannot show. So I build the **page shell first** (the sky ground, the travelling owl, the persistent call pill, the palette switch) as the frame, and put the proof section into it. The gate then judges the proof section *in its world*, with the arrival section above it as the seam. The shell is small, and it is what makes the proof honest.
3. **The tap-where-the-leak-is idea.** Explore 11 already did "point at the trouble on a drawing", and the owner rejected it with everything else. The proof section keeps the problem-finder's job but takes **Quiet Cubes' real mechanism**: the choice is a decision about your case, and it *tailors what comes after*. It is not a hotspot drawing.
4. **Max 8–9 sections.** I propose 7. Fewer, deeper sections serve the "one idea, less stuff" rule better.
5. **Colour default.** The plan keeps the current brand as the default until the owner picks. Under tonight's override I make Night Owl the working default **for the reset page only**, for the reasons in §5. The control stays one tap away, and the old site file keeps its colours untouched.

The plan is right on everything else: the factory stops, mechanism evidence is required, there is a shared world, and the sections become different kinds.
