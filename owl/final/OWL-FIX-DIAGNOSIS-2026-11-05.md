# OWL-FIX-DIAGNOSIS-2026-11-05 · consult first, then build

**Inputs:**
- OWNER-FEEDBACK-2026-11-05-1400 (the owner's own review of `owl-roofing.html` at d165ff8);
- OWL-FIX-AND-VERSIONS-2026-11-05 (the binding order);
- OWL-COLOUR-RESEARCH-2026-11-05 and OWL-MEDIA-SOURCING-2026-11-05 (Muse).

**Direction:** the reset stays. This is fix-and-deepen.

**Evidence folder:** `gates/fix/`.
- `audit/media-map.json`: every image and video on the default page, hashed.
- `audit/behave.json` and `audit/sheet-*.jpg`: wheel-scroll behaviour, desktop and emulated iPhone 13.
- `audit/sheet-size-*.jpg`: 1280 × 720, 1920 × 1080 and 360 × 740.
- `colour/palettes.json` and `colour/contrast.py`: every text pair, computed.

---

## 1. The duplicate-media failure: where the same footage appears, and the fix per placement

**Method:** load the default page, collect every `img`, `video`, poster and CSS background, and hash the actual bytes (`audit/media-map.cjs`). Hashes, not file names, decide what is "the same".

| # | What repeats | Where, on the current default page | Fix |
|---|---|---|---|
| 1 | **Owl's crew film** (one 2.85 MB file) | Plays in **section 1** (the arrival) and is scrubbed in **section 3** ("your part: nothing") | It stays in **one** place only: the hero's crew-film version (the owner: "fine, perfect"). Section 3's scroll film gets different footage: Pexels 4198812, a drone approach to a house mid-reroof with a roofer on it, 1080p. |
| 2 | **The crew poster** (the film's first frame) | The poster under section 1 **and** section 3 | It goes with the film: hero only. Section 3 uses a frame of its own footage. |
| 3 | **Six case photos** (repair, new roof, old roof, storm, aerial, check) | Section 2's choice pills, the big scene image, **and** the top-bar dock thumbnails (the same photo two or three times on screen) | Each case photo appears **once**, in the scene. The pills and the dock show a small drawn symbol per case (leak, stain, shingles, storm, age, unsure), not the photo. The six photos are also replaced: they were 560 px wide and blurry (§4). |
| 4 | **svc-check.webp** (a crew member on a roof) | Section 2's "Not sure" case **and** section 5's crew chapter | The section 5 crew chapter uses Owl's own crew photo only; section 2 gets new stock. |
| 5 | **The owl illustration** (`owl-perch.webp`) | Section 6's home marker **and** section 7's landing owl | Section 7 keeps the landing owl. Section 6's home marker becomes the Owl logo mark (the brand, not a photo). |

**The 19 `data-media="crew"` placements and YouTube `ehKLv5DF2TQ`** that Muse counted are all inside the **past** records (the hidden past homepage). They are never shown unless `?past` is asked for. They stay there untouched as records. The rule applies to the page the owner opens and to every version that can be switched on.

**The rule I will build and test:**
- **One section owns each file.** Every image and every video belongs to exactly one section.
- **No cross-section repeats in any combination.** Versions of the same section may use different media, so a repeat across two sections is impossible however the versions are switched.
- **A check enforces it.** `distinct-media` hashes every shown asset in every combination of defaults, and every version of each section against all other sections.

## 2. "A couple of later sections aren't properly working": the audit

**Method:**
- scrolled the way a person does (wheel steps of 220 px every 110 ms on desktop; 160 px steps on an emulated iPhone 13), from section 3 to the end, logging each section's state at every step;
- one settled frame per later section at 1280 × 720, 1920 × 1080 and 360 × 740.

In Chromium every mechanism fires: the film follows the scroll, all six numbers arrive, the three family chapters turn, and the call panel arrives. **What is broken is what a person sees on the way, and what a phone does.**

| Section | What is actually wrong (evidence) | Fix (in that section's new versions) |
|---|---|---|
| 3 · "nothing" | **Same footage as the hero** (see §1). **On a phone the film is fragile:** it is a 2.85 MB `data:` URI, and iOS Safari is known to refuse or stall `data:` video and not to paint frames when seeking a video that has not played. I cannot run WebKit here (only Chromium is installed), so this is a strong suspicion, not a capture. | New footage. Every video loads through a **Blob URL** (decoded once from the file) and is primed with a muted play-then-pause before scrubbing; the poster stays until the first frame paints. |
| 4 · numbers | **Numbers are caught half-risen.** At normal scroll speed, "50", "Systems Plus" and "A−" sit cut through the middle by their masks for most of the pass (`audit/desktop-028-numbers.jpg`, `size-1280-numbers`). The giant **5.0 is cropped under the top bar** when the section top meets the bar. | Facts arrive **whole** (the card moves, the glyphs are never masked), triggered earlier (10 % in view), each under 400 ms. 5.0 gets clearance from the bar. |
| 5 · family | **A collage mid-turn:** halfway through a chapter turn, both families fill the left half, one above the other (`audit/desktop-035-people.jpg`). **Phone:** the heading sits across the faces, and the name card covers the children (`size-360-people`). **Blur:** the family photos are 558–620 px wide, stretched full-bleed to 720–1440 px. | Photos shown **at or below native size**, framed on muted grounds, never stretched. Turns crossfade (no collage). The heading and card keep clear of faces on every size. |
| 6 · towns | **Phone:** the call pill covers the southern dots (Apple Valley, Burnsville) at 360 × 740, with 4 dots measured under the pill. Seven towns within about 5 miles of Shoreview touch, and their tap areas overlap. **Desktop:** the "Shoreview" label is crowded. | Bottom clearance for the pill on phone, and a magnified inset around Shoreview so every dot can be tapped. |
| 7 · call | **For the owner, it reads as broken:** it says "Closed now" all day in Dhaka, because it uses Shoreview time without saying so (Dhaka 14:00 is Shoreview 03:00). | Show the Shoreview clock in words: "It's 3:12 AM in Shoreview · we open at 08:00". The logic is unchanged. |
| all | **Weight:** the file is 10.5 MB (the past records travel inside it). A phone parses all of it before the page runs. | Past records stay in the file (owner's order). New media are encoded tightly; see §6 for the budget. |

## 3. Colour: my pick

**Read:** Muse's research. I recomputed every pair the page actually uses, not only the headline pairs (`colour/contrast.py`). The page needs roles the research didn't list: secondary text, text on dark bands, accent words on dark bands, UI markers. I added them in the same muted family.

**Working default: P1 "Shingle Slate"**, with the copper used for the one phone action only. I agree with Muse's ranking:
- it is the roof's own colour;
- it is the most trusted family for this audience;
- every pair passes;
- its copper keeps a warm heartbeat without the shout.

**The three alternates stay one switch away:** P3 North Navy, P2 Hearth Charcoal and P4 Storm Stone, in the top-bar palette switch, so the owner compares them in real sections. **The bright amber set is retired as a default.** The four amber trial palettes stay in the CSS as records (`?palette=night` still works) but leave the switch.

| Role | Shingle Slate | North Navy | Hearth Charcoal | Storm Stone |
|---|---|---|---|---|
| Ground | `#F4F4F1` | `#F1F3F5` | `#F5F1EA` | `#F3F1EC` |
| Cards | `#FBFBF9` | `#FAFBFC` | `#FBF9F5` | `#FAF9F6` |
| Wash panels | `#E7EAEB` | `#E2E7EC` | `#E9E2D6` | `#E5E0D6` |
| Ink | `#22282E` | `#17263E` | `#2A251F` | `#26282B` |
| Secondary text | `#4F5861` | `#46546A` | `#5A5249` | `#55575B` |
| Accent (buttons, links, markers) | `#43586A` slate | `#1E3A5F` navy | `#4A4239` graphite | `#47617C` denim |
| Call button (the one warm note) | `#96622F` copper | `#8C5A2E` copper* | `#7C5A24` brass | `#47617C` denim |
| Dark band | `#1E252C` | `#132036` | `#24201B` | `#222529` |
| Accent word on dark band | `#D2A77D` | `#D6AB82` | `#D2B07A` | `#A9BED3` |

\* Muse's `#9A6335` measured 4.48:1 as text on the navy ground, just under AA. I darkened it to `#8C5A2E` (5.22:1 as text, 5.81:1 under white).

**Contrast, all computed, all pass:**

| Pair | Range across the four palettes |
|---|---|
| ink / ground | 13.09–13.65:1 |
| ink / cards | 14.04–14.65:1 |
| secondary text / ground | 6.41–6.90:1 |
| accent text / ground | 5.69–10.34:1 |
| white / accent button | 6.42–11.50:1 |
| white / call button | 5.14–6.42:1 |
| text / dark band | 13.62–14.40:1 |
| secondary / dark band | 8.26–8.59:1 |
| accent word / dark band | 7.05–8.06:1 |
| UI markers / ground (3:1 needed) | 3.18–3.40:1 |

The full table is in `colour/palettes.json`.

**Rules that keep it calm:**
- **One saturated place:** the call button.
- **No accent fills behind sections.**
- **Primary buttons carry white text on the accent;** the GATE-BUTTONS shape and press stay, recoloured.
- **The logo shape is untouched.** Its owl-eye accent takes the palette's warm note (copper or brass), as the trials already recolour it.

## 4. Media: what is blurry, and what replaces it

**Every current photo was measured** (`src/assets`):
- 26 of 36 are **under 1,000 px wide**;
- the case photos are 560 px;
- the family photos are 558–620 px;
- the crew film and its poster are 960 × 540.

Shown full-bleed on a 1440 screen, they are 1.5–2.6× upscaled. That is the blur the owner sees.

**Stock is now allowed (portfolio licence).** I fetch files by ID from the Pexels CDN, with no bot walls touched. The Pexels and Unsplash pages themselves answer 403/401, and I don't get around that. I look at every file myself before using it. All photos are 2400 px or more on their long side; all videos are 1080p or 4K.

**Rejected after looking:**
- **34827910** (Muse's "finished suburban house") is a **3D render**, not a photograph;
- **11784496** has Dutch scaffold signage;
- **31771166** and **6432077** show Mediterranean clay tiles, not Minnesota asphalt;
- **39238326** shows tiles, not shingles.

**YouTube** (Muse's V1–V5) cannot be scrubbed frame by frame, and needs the network inside a one-file page. I kept the downloadable Pexels footage and list the YouTube IDs only as fallbacks.

**Allocation: one section owns each file. Nothing is shared across sections.**

| Section | Media it owns |
|---|---|
| 1 · hero | Owl crew film + poster (Owl's own); Pexels video **17624839** (top-down drone rise, 44 s, 1080p); photo **33404248** (roofer nailing shingles, Ryan Stephens); photo **2663254** (rain running off a roof edge, Adrien Olichon) |
| 2 · finder | photos **13307118** (gutter overflowing; the leak), **30473221** (attic window; where a stain is traced), **5668698** (a storm-damaged roof; shingles), **292737** (houses under a storm sky; storm), **4798643** (an old house under grey sky; getting old), **9431615** (a roofer kneeling on a roof; not sure), **4061594** (a snowy suburban house; the point-at-it version) |
| 3 · "nothing" | Pexels video **4198812** (drone approach, roofer on the roof); video **19654640** (nailing decking, 31 s); photos **34304714** (tear-off with tarps out), **33404080** (underlayment and bundles), **33404981** (crew cleaning the site) |
| 4 · numbers | photo **6220207** (a snowy residential street) for the spec-row-over-photo version; the other versions are type only |
| 5 · family | Owl's own photos only: the Browns, the Berglands, Noah on a ladder, the crew. They are shown at native size, never stretched. The stock home photo is removed. |
| 6 · towns | photo **5580644** (an autumn suburb from above) for the backdrop version; the others are drawn |
| 7 · call | photo **259583** (a snow-covered house) for the porch version; owl illustration (`owl-perch`) for the end card |

**Rules for stock:**
- every stock photo is tagged "Illustrative photo" on the page and is never captioned as Owl's work;
- the crew-film tag stays "Owl's crew at work" because it is Owl's own footage;
- credits are in `MEDIA-CREDITS.md`, by photographer and Pexels ID.

## 5. The version plan: hero 4, every other section 3, all different in kind

**Default (the shown best) = chosen per section in its gate.** Every version passes the five-question homeowner check before its gate.

**References:**
- **Live-studied:** AirPods, Scout, Quiet Cubes, MERSI, Lando, Longbow (evidence in `reset/evidence/`). They are named only where their mechanism is actually used.
- **Not live-studied:** a pattern I use without a studied site is labelled as a pattern, not dressed up as a reference.

### 1 · Hero (4)

| V | Name and kind | Layout and mechanism | Reference | WEB-SKILLS |
|---|---|---|---|---|
| 1 | **Crew film** (kept: the owner's "perfect") | Owl's crew film full-bleed; one line at photo scale, then the second beat on scroll. Recoloured to the muted palette. | Scout | ⟦S0448⟧ ⟦S1447⟧ ⟦S1433⟧ |
| 2 | **Pull back** (a scroll-scrubbed aerial) | Starts on one shingle; your scroll lifts the camera until the whole street is in frame. Line: "From one shingle to your whole street." | AirPods scrub (reversible film), Scout single line | ⟦S0448⟧ ⟦S1325⟧ ⟦S0458⟧ ⟦S1209⟧ |
| 3 | **Editorial split** (a still, in flow) | Left: a sharp photo of hands nailing shingles, cropped tall. Right: a heading, the three facts as a strict row, the call. No pin, no motion beyond one reveal. | Longbow (a large line and a spec row) | ⟦S1428⟧ ⟦S1434⟧ ⟦S1435⟧ |
| 4 | **The question** (triage first) | Rain running off a roof edge, full-bleed. One question, "Is your roof okay right now?", with three answers (Yes, I'm checking · Not sure · No, it's leaking). Each answer goes on into section 2 already set. | Quiet Cubes (the choice is the first act) | ⟦S1455⟧ ⟦S1107⟧ ⟦S1441⟧ |

### 2 · Problem-finder (3)

| V | Name and kind | Layout and mechanism | Reference | WEB-SKILLS |
|---|---|---|---|---|
| 1 | **Curtain** (kept, repaired) | Choice first, a curved curtain into a full scene, the case docked in the bar. Symbols replace the photo thumbnails; six new sharp photos. | Quiet Cubes | ⟦S1455⟧ ⟦S0409⟧ ⟦S1441⟧ |
| 2 | **Point at it** (a hotspot house) | One sharp photo of a Minnesota house. Tap where you see the problem (the roof, an attic window, the gutter, inside on the ceiling, the chimney), and a callout answers. | AirPods (labelled callouts on the object) | ⟦S1107⟧ ⟦S0458⟧ ⟦S1441⟧ |
| 3 | **Two questions** (conversational, type only) | "Where do you notice it?" then "Since when?", one at a time; the answer card names the service and what Owl does first. | Pattern: one question per screen (not live-studied) | ⟦S1442⟧ ⟦S1434⟧ ⟦S1455⟧ |

### 3 · "Here's your part: nothing." (3)

| V | Name and kind | Layout and mechanism | Reference | WEB-SKILLS |
|---|---|---|---|---|
| 1 | **Scroll film** (kept, new footage) | A pinned stage scrubbing the drone approach through five beats. The "Meanwhile, you" chip and the rail are kept. | AirPods | ⟦S0448⟧ ⟦S1325⟧ ⟦S1457⟧ |
| 2 | **Two lists** (type only) | "Owl's list" (look, wrap, roof, clean, box) ticks itself as you scroll; "Your list" stays at one line: "Make coffee." | Longbow strict rows | ⟦S1420⟧ ⟦S1434⟧ ⟦S0407⟧ |
| 3 | **Filmstrip** (horizontal) | Five frames slide sideways as you scroll down: tear-off, underlayment, the nail gun (a short silent loop), clean-up, the box (a drawn card). | MERSI (chapters turned by scroll) | ⟦S0448⟧ ⟦S1209⟧ ⟦S0409⟧ |

### 4 · Numbers (3)

| V | Name and kind | Layout and mechanism | Reference | WEB-SKILLS |
|---|---|---|---|---|
| 1 | **Numerals** (kept, repaired) | Giant 5.0 and six facts, now arriving whole and early; never half-masked. | AirPods numerals + Longbow row | ⟦S1420⟧ ⟦S1433⟧ ⟦S0409⟧ |
| 2 | **Ninety marks** | The 5.0 is built from 90 small marks, one per review (no names, no quotes), which settle into the numeral as it enters. The facts sit around it. | Pattern: data as an event (the GATE-4 D1 upgrade) | ⟦S1420⟧ ⟦S1435⟧ ⟦S0400⟧ |
| 3 | **Spec row over a street** | A sharp snowy street, full-bleed; the facts as one strict Longbow row along its lower edge. | Longbow (frame 060: a spec row on the photo) | ⟦S1428⟧ ⟦S1433⟧ ⟦S1306⟧ |

### 5 · Family (3)

| V | Name and kind | Layout and mechanism | Reference | WEB-SKILLS |
|---|---|---|---|---|
| 1 | **Split cover** (kept, repaired) | Two halves and the seam card, scroll-turned. Photos framed at native size on muted grounds; crossfade instead of the collage; clear of faces on phone. | MERSI | ⟦S0448⟧ ⟦S0458⟧ ⟦S1445⟧ |
| 2 | **Prints on a table** | The real photos as prints at native size; drag or tap one to the front and it turns over to its names and facts. | Pattern: physical cards (not live-studied) | ⟦S1445⟧ ⟦S1107⟧ ⟦S1441⟧ |
| 3 | **Two names** | Typographic: "Tim Brown" and "Noah Bergland" set large; hover or tap a name and its family photo opens in a mask beside it. | Lando (type with photos placed on it) | ⟦S1433⟧ ⟦S1435⟧ ⟦S0409⟧ |

### 6 · Towns (3)

| V | Name and kind | Layout and mechanism | Reference | WEB-SKILLS |
|---|---|---|---|---|
| 1 | **Contour finder** (kept, repaired) | Type or tap a town on the contour ground; phone gets a magnified inset around Shoreview; clear of the pill. | Lando contours | ⟦S1453⟧ ⟦S1107⟧ ⟦S1441⟧ |
| 2 | **Distance rings** | Shoreview at the centre, rings at 5, 10, 15 and 20 miles; each town sits on its true bearing and distance. Type and its ring lights. | Pattern: polar chart (not live-studied) | ⟦S1420⟧ ⟦S1453⟧ ⟦S0458⟧ |
| 3 | **From above** | A sharp autumn suburb seen from above, full-bleed and tagged illustrative; one big ask box and the answer; the town list underneath as a quiet strict row. | Scout (one line on one photograph) | ⟦S1453⟧ ⟦S1433⟧ ⟦S1306⟧ |

### 7 · Call (3)

| V | Name and kind | Layout and mechanism | Reference | WEB-SKILLS |
|---|---|---|---|---|
| 1 | **End card** (kept, repaired) | The number as type, live hours in words with the Shoreview clock, the email prefilled from your choices. | Longbow end card | ⟦S1452⟧ ⟦S1455⟧ ⟦S1441⟧ |
| 2 | **Two doors** | Two big cards side by side, "Call us" and "Write to us", each the whole action, Longbow's "Choose your Longbow" pair turned into the two ways to reach Owl. | Longbow (frame 075, two cards) | ⟦S1452⟧ ⟦S1441⟧ ⟦S1442⟧ |
| 3 | **Porch light** | A sharp snow-covered house at dusk, full-bleed; the number set on the photo in white; the hours as one line. | Scout (one line on one photograph) | ⟦S1433⟧ ⟦S1452⟧ ⟦S1306⟧ |

**That is 22 versions.** Every one of them is switchable in-file (§6).

**The current reset sections are preserved as records:** each becomes its section's V1 (repaired in the open, with the changes named in the gate), and its untouched text is kept as an in-file backup (`b1`). Nothing of tonight's reset is lost. The frozen d165ff8 build is also copied to `past/`.

## 6. How it is built (the infrastructure)

- **Files:** `reset/sections/<NN-name>/v1.html … vN.html` (plus `b1.html`, the untouched reset original, kept as an inert record), and `reset/versions.json` holding each section's default.
- **In the file:**
  - every version of every section is in the page as a `<template>`;
  - one small script stamps the chosen version of each section in place before anything runs;
  - the others stay inert, so their scripts never run and their pinned heights never count.
- **Switching (the owner's review format):**
  - a **"Versions" button** in the top bar opens a panel: one row per section, V1…Vn, the default starred and the current one marked;
  - choosing one reloads to that section with the choice in the address (`?top=2&finder=3`), so a combination can be sent as a link;
  - "Reset to the bests" clears it.
- **Video:** every video is decoded once into a Blob URL (the iOS fix) and primed before scrubbing.
  - Scrubbed films are 1080p, H.264, a keyframe every 8 frames, no audio.
  - The hero loops are 1080p.
- **Budget:** about 1.5–4 MB per video and 250–500 KB per photo (WebP, 2400 px long side for full-bleed, 1600 px for halves).
- **New checks** (run on `owl-roofing.html` itself, every version):
  - axe in all four new palettes;
  - the facts lock and the no-skeleton rule;
  - `distinct-media` across sections and versions;
  - a sharpness check: every shown image's natural width is at least 0.9× its rendered width × device scale at 1440 and 390;
  - the version-specific behaviour;
  - layout at 1440, 768 and 390;
  - reduced motion;
  - no errors.

## 7. Disagreements and judgement calls, recorded
- **YouTube embeds are not used,** though Muse's sourcing led with them. They can't be scrubbed frame by frame, they need the network inside a one-file page, and they would bring someone else's branding and end screens. Pexels files do the same job offline, sharper.
- **Muse's 34827910 is out:** it is a 3D render, and real photography only still holds.
- **The family photos cannot be replaced with stock** (they are the real Browns and Berglands). They can only stop being stretched. Every family version shows them at native size or smaller. Sharper originals from the owner remain the real fix.
- **The muted palettes need a dark band colour** for the pinned stages. I derived each from its palette's ink, so the dark bands stay in family.
- **Austin** (in the owner's message) is not in this branch or in the order file. The same consult-then-build method applies there when its order arrives.

## 8. Order of work from here
1. **Infrastructure:** versions, the switcher, the four muted palettes, Blob video, the media pipeline and credits, and the new checks. One gate: `GATE-FIX-INFRA.md`.
2. **Then one section at a time, gated per section:** hero → finder → nothing → numbers → family → towns → call. Each gate (`GATE-FIX-<section>.md`) holds:
   - every version, with its five-question check;
   - what was broken and what fixed it;
   - the AA pairs;
   - the skill ledger;
   - the default and why.
3. **Commit and push per item.** Report each gate as it lands.
