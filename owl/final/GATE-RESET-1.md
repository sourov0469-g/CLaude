# GATE-RESET-1 · Section 1 "Roof trouble? We'll take it from here." (the arrival)

**Where:** the top of `owl-reset.html`, before the problem-finder (2). Source: `reset/sections/01-arrival.html`.

This section was built first, as the world's opening, and ran under every later gate. This is its own gate.

**Treatments shown:** Night Owl and **Slate & Brass**. All four palettes pass axe.

## 1. What it is (one homeowner sentence)
*Real Owl roofers at work, and one sentence: your roof trouble is now their job.*

- **The stage:** a sticky full-bleed stage, 1.9 screens tall. It is the shortest of the page's three pinned moments.
- **The film:** Owl's own crew film plays muted, inline and looped. It is the same scrub-ready film that section 3 later hands to your scroll. A small tag says "Owl's crew at work".
- **Beat 1, at photo scale:** **"Roof trouble? We'll take it from here."** Under it: "Owl Roofing. Family-owned roofers in Shoreview, MN."
- **Beat 2, on scroll:** **"You call. We climb. You relax."** with three locked facts as chips: 5.0 · 90+ reviews, GAF Systems Plus, and the 10-year workmanship warranty. Scrolling back up brings beat 1 back.
- **The cue:** "What's going on up there?" goes straight to the problem-finder.
- **The world:**
  - the top bar turns light over the film;
  - the call pill is in reach from the first second;
  - the palette switch is labelled "trial palette".
- **What this section replaces:** the old hero, which was a photo, a kicker, an h2, a lede and a Book + Call button row (the skeleton named in the diagnosis).

## 2. Mechanism evidence: Scout Motors, studied live
**The sheet:** `gates/reset/s1/mechanism-side-by-side.jpg`. It sets three Scout frames beside three of mine. The phone frames are in `phone-strip.jpg`.

**What the Scout probe captured** (`reset/evidence/scout/`: frames 000–070, `sheet.jpg`, `facts.json`):
- The site opens on a full-bleed film with one line set at photo scale ("Scouts always come back.").
- Scroll turns to the next line over the film ("The one that started it all.", "An off-road icon reborn.").
- The film carries the mood; the words are few.
- The probe also recorded Lenis, 4 sticky elements and 3 videos on a 17,890 px page.

**Transferred:**
- the full-bleed real film as the first thing you see;
- one line at photo scale, about 132 px on desktop;
- scroll turning the line while the film runs;
- very few words.

**What does not transfer, and why:**
- **The cinematic product film.** Owl's film is its own crew on a real job. That is truer, but softer (960 × 540; D1).
- **Lenis smooth scroll.** Owl uses native scroll.
- **"Reserve now":** Owl's one action is the call pill.
- **The long sequence of lines.** Owl has two beats, then hands you to the finder: the homeowner came with a problem, not to browse.

## 3. Five-question homeowner check (from the screenshots, per treatment)

### Night Owl
**Screenshots:** `night-1440-*.jpg` and `night-390-*.jpg`.

1. **What is it for?** It tells me these are real roofers (I can see them carrying shingles) and that they'll handle my roof problem.
2. **Under 3 seconds?** Yes. "Roof trouble? We'll take it from here." over moving crew footage, with the phone number already on screen.
3. **Interesting, playful or fun, and exactly what makes it so?**
   - The page opens moving: Owl's own banner and a GAF bundle swing past the camera.
   - One scroll and the line answers itself: "You call. We climb. You relax."
4. **Is every element there for a reason?** The film (they're real), beat 1 (the promise), beat 2 (the deal, plus three facts), the cue (the next step: tell us your problem), the tag (honest labelling), and the call pill (act now). Complexity without a reason: none.
5. **Does it fit a stressed homeowner?** Yes. It is calm and short, with a phone number and one obvious next step.

### Slate & Brass
**Screenshots:** `slate-1440-*.jpg` and `slate-390-*.jpg`.
- The same answers. The film dominates, so the palette only shows in the switch and the brass call pill, which reads quieter than gold.
- **My comparison:** the arrival is not where a palette decision will be made. Sections 3 to 7 show the differences.

## 4. Skill ledger
- **Stage:** ⟦S0448⟧ sticky storytelling; ⟦S1209⟧ native sticky, the shortest pin.
- **Film:** ⟦S1447⟧ video loading (a poster first, the video takes over on `playing`).
- **Type:** ⟦S1433⟧ type scale (one line at photo scale); ⟦S0409⟧ beat swap (rise in, rise out).
- **Fact chips:** ⟦S1306⟧ only locked facts.
- **Cue:** ⟦S1107⟧ a real link to #finder, 44 px.
- **Reduced motion:** ⟦S0400⟧. No film is loaded and the crew poster stays; the beats still turn; the cue's line does not loop.

## 5. Checks: `gates/reset/s1/checks.json` · **21/21 PASS** (`tools/reset-test.cjs top`)
- **axe WCAG 2.1 A/AA:** 0 violations in all four palettes.
- **Facts and skeleton:** the facts lock passes, and the no-skeleton rule passes.
- **The stage:** full-bleed and sticky, at most 2 screens tall.
- **The film:** Owl's crew film plays muted, inline and looped (its `currentTime` advances), labelled "Owl's crew at work".
- **Beats:** beat 1 at the top, beat 2 at 70 % (with `aria-hidden` lifted), and beat 1 back on scrolling up.
- **The light top bar** shows over the film.
- **Only locked facts,** and one `h1` on the page.
- **The cue** lands on the problem-finder.
- **Layout:** no sideways scroll at 1440, 768 or 390; controls at least 44 px.
- **Reduced motion:** no film is loaded, the poster stays, and the beats still turn; no looping animation.
- **No page or console errors.**

## 6. Scorecard (weights Design 40 · Usability 30 · Creativity 20 · Content 10)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Design | 40 | 8.0 | 3.20 |
| Usability | 30 | 8.8 | 2.64 |
| Creativity | 20 | 7.6 | 1.52 |
| Content | 10 | 8.8 | 0.88 |
| **Total** | **100** | | **8.24** |

Recomputed: 8.0 × 0.40 + 8.8 × 0.30 + 7.6 × 0.20 + 8.8 × 0.10 = 3.20 + 2.64 + 1.52 + 0.88 = **8.24**. Pass: ≥ 7.0, lowest category 7.6, zero vetoes.

**Why not higher:**
- **Design:** the film is soft at 1440 and busy behind the headline (D1, D2).
- **Creativity:** a film with a line on it is the most familiar opening there is. The arrival's job is to be calm and true, and the page's surprises come after it (the curtain, the scrub, the split cover, the map, the end that remembers you).

**"Same kind as anything already on the page?"** It shares the film with section 3, on purpose: section 1 plays it, and section 3 hands it to your scroll. Neither does what the other does.

## 7. Defects found and fixed (while it ran under the later gates)
1. **`RESET` was undefined** when section scripts ran. It is now defined in the template head.
2. **The flying owl crossed the headline.** It now shows only at the seams between sections.
3. **The film was re-encoded** with a keyframe every 8 frames (2.19 MB), so the same file serves the scrub in section 3. There is one film on the page, not two.

## 8. Remaining defects (named)
- **D1 · a soft film.** Owl's footage is 960 × 540, upscaled on large screens. Owl's original footage at higher resolution would fix it.
- **D2 · a busy frame behind the line.** The banner and the shingle bundle pass behind beat 1. The shade holds contrast (axe passes), but a calmer clip (a wide roof shot) would read cleaner. Needed from the owner: a 10-second wide shot of a finished roof or a crew on a ridge.
- **D3 · the palettes barely show here,** because the film dominates.

## 9. Vetoes: **zero**
- Real Owl footage, labelled.
- Only locked facts.
- The logo is unchanged.
- The film is a band at the top of a light page.
- No sub-agents or background tasks; every command ran in my thread, in the foreground, with a time limit.

## 10. New best: the default the homepage shows (owner's order, 05:15)
**The choice:** Section 1, the arrival as built and gated above, in **Night Owl**, is the new best. It is the version the finished homepage, `owl-roofing.html`, shows by default.

**What it stands in for:** **Hero** (15 versions and 1 backup) and **Video** (15 versions and 1 backup). Nothing was deleted. Every one of those versions is kept in the same file as **PAST**, an inert record of the whole past homepage, and opens with ?past&hero=12 · ?past&video=15 (any version number works). The past page carries a chip back to the new one.

**Treatments compared:** Night Owl and Slate & Brass. The film dominates, so the palette barely shows here; Night Owl is chosen at page level.

**Why this is the best:**
- It does both past jobs in one moment. The hero said who Owl is and the video proved the crew is real; the past versions did it in two framed blocks with button pairs. The new one puts the real crew full-bleed under one line, with no skeleton.
- The owner's verdict named "document type" and "no immersiveness". This is the page opening as a scene, not a heading block.
- It is the same film section 3 hands to your scroll, so the page carries one film, not two.
- **One palette for the whole page.** The sky and the owl run as one world, and a palette per section would break it. Night Owl is the working default under the owner's grant (contrast and reasoning in the diagnosis §5). The other three palettes stay one switch away in the top bar.

**Checks on the finished homepage:** this section's checks were re-run on `owl-roofing.html` itself, not only on the workbench page. They all pass (`checks.json` in this gate's folder).
