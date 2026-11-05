# GATE — WEIGHT (step 0 of AUSTIN-UPGRADE-PLAN-2026-11-05)

**Under:** the upgrade plan Muse passed (build order: weight pass first), with AUSTIN-CONSULT-FIRST and the page rules confirmed in the consult reply.

**Working method, stated as ordered: this whole step was done by this session alone, in its own thread. NO sub-agents and NO background tasks.**

## Result in one line

**22,524,871 → 12,861,428 bytes (−9,663,443, −42.9%)** against a target of ≤ 14.5 million. No version, section or locked fact was changed.
- **Pages loading from a 10 Mbps line:** finished in 11.2 s instead of 19.1 s.
- **Image sharpness:** several photos are sharper than before.

**Units, so nobody has to guess:** "MB" in this document and in the plan means millions of bytes (the 22.5 MB in the plan is 22,524,871 bytes).

## What was done (four rules, all in the build, nothing hand-edited)

| # | Rule | How | Saved |
|---|---|---|---|
| 1 | **One film, smaller** | The hero film was embedded twice (MP4 and an identical WebM) and used only by three archived heroes. Now one MP4, re-encoded from 1280 × 720 to 960 × 540 (H.264, CRF 31, no audio). A sampled frame is visually the same; the footage is soft and in motion. The old files stay in the repo | 4.06 MB (5.74 → 1.68 MB of video) |
| 2 | **Right-size, never enlarge** | `measure_images.js` loaded all 255 views (every homepage version and subpage view) at 1440 and 768 and recorded the widest CSS width each embedded image is actually shown at (101 images measured). An image is only ever shrunk, to 1.75 × that width, never above 1600 px; images never seen in an `<img>` keep their own size, capped at 1280 px. Re-encoded as WebP; kept only if clearly smaller | 1.04 MB (13 images) |
| 3 | **Canvas photos recompressed at their exact pixel size** | Hero 1 and 2's photos (`__PHOTOS`) and the supplied hero photos (`__HERO2`) are positioned by pixel coordinates (board polygons, depth maps), so they are never resized: five were re-encoded from JPEG to WebP q76 at identical dimensions. Depth maps and small mattes are left byte for byte | 0.88 MB |
| 4 | **One copy of every photograph** | (a) Exact duplicates are stored once in a registry (`#imgreg`) and referenced by a 1 px placeholder (`data-dd`) or `"@dd/n"` token, resolved at the very start of boot, before any module reads an image, including inside nested templates. (b) **The same photo embedded at several sizes** (30 groups: 1040, 720, 640 and 600 px copies of one job photo, which exact matching cannot see) is merged: every use is pointed at the **largest** copy. A pair is merged only if it has the same aspect ratio (within 2%), a near-identical difference hash **and** a near-identical 48 × 36 pixel thumbnail (mean difference ≤ 2 of 255). Measured margin: all 57 candidate pairs were true copies (≤ 1.4); there were no look-alike pairs (such as a before and its after) in range. 43 smaller copies were merged | 3.5 MB (with the exact duplicates) |

Before and after, by kind:

| | Before | After |
|---|---|---|
| Embedded images | 13,889,325 (176 uses, 153 distinct) | 8,286,613 (187 uses, 111 distinct) |
| Video | 5,738,013 | 1,675,394 |
| Fonts | 161,050 | 161,050 |
| Code, markup, styles | 2,736,483 | 2,738,371 |
| **Total** | **22,524,871** | **12,861,428** |

## Proof

**Nothing structural changed.** With every image blanked out:
- all 198 templates (homepage slots and subpages) are identical between the pre-pass and final file;
- the rest of the page is identical too (1,952,745 characters either side).

**Every view renders** (the pre-pass file against the final file, both at 1440 with reduced motion, 255 views = every version of every homepage section plus every subpage and subpage version):

| Check | Result |
|---|---|
| Page errors | 0 in all 255 views |
| Horizontal overflow | 0 in all 255 views |
| Unresolved placeholders or tokens | 0 |
| Broken images | 8, in hero L, **identical in the pre-pass file**: they are `lim` images with an empty `src` inside hidden parents, filled at runtime by design |
| Screenshot against pre-pass screenshot | 224 of 255 identical (mean difference < 0.05); the largest difference is 7.25 (subpage "Our work" openers). A 1:1 crop (`gate/weight-crop-brick-1to1.png`) shows why: the photo is **sharper**, because the pre-pass file showed a 640 px copy stretched to about 1100 px and now every use points at the 1900-px or 1400-px master. The side-by-side of the five largest differences is `gate/weight-compare-raw-vs-final.jpg` |
| Pointer-driven heroes (1, 2, 3, 4, 5, 6, 8, a2) | Each responds to the pointer by the same amount in both files; static differences at most 2.8; 0 errors |

**Load check** (headless Chromium, 1440 × 900, the default page; "before" is the committed file; direct open is the median of 3; HTTP is a script-internal server throttled through DevTools with 20 ms latency):

| Measure | Before (22.5 MB) | After (12.9 MB) |
|---|---|---|
| Opened directly: fully loaded | 808 ms | 821 ms |
| Opened directly: first contentful paint | 160 ms | 200 ms |
| 50 Mbps: fully loaded | 4,403 ms | **2,905 ms** |
| 10 Mbps: fully loaded | 19,128 ms | **11,213 ms** |
| 10 Mbps: first contentful paint | 804 ms | 808 ms |
| Main-thread blocking (long tasks, direct open) | 317 ms | 437 ms |
| JS heap (direct open) | 5.7 MB | 10.2 MB |

Two costs, stated plainly: the boot-time resolver and the larger master images add about 0.12 s of blocking and 4.5 MB of heap. In exchange the page arrives 40% sooner on a slow line.

## Defects found and fixed

1. **My estimate was too rosy.** The plan estimated 3.3 MB from right-sizing; measured, only 13 images shrank (1.04 MB), because most photos were already sized close to what they show. The target needed the same-photo merge, which found 3.5 MB.
2. **Look-alike risk.** Merging "the same photo" by a rough hash could have swapped a before for an after. The rule was made strict (aspect, hash and pixel thumbnail) and its margin measured before it was trusted, as above.
3. **A reporting error.** A statistic printed a negative "saved by merge" (the merge enlarges before the one-copy step collapses it). It is now reported as one combined figure.
4. **Units.** Early on I quoted a size in KB (1,024) against a target in millions of bytes; every figure here is in bytes or millions of bytes.

## Remaining, named honestly

- **Film playback is not verifiable in this test browser.** Headless Chromium has no H.264 decoder, so the three archived film heroes (a3, a4, a5) cannot play here (before, the WebM played). The re-encoded MP4 decodes cleanly in ffmpeg, MP4 plays in every current Chrome, Safari, Edge and Firefox, and the film is used only by those three hidden backups.
- **29 images are shown larger than their own pixels** in some views (the pre-existing 640 px job photos stretched to up to 1440 CSS px, and 1040 px ones to 1085). The merge sharpened many of them, but the rule "never upscaled" is not met everywhere in the old versions. **Every new section must use a master at least as wide as its display width**; a photo shown at a maximum of 1400 CSS px is the ceiling for the 1400-px job photos.
- **The measurements go stale as sections change.** `measure_images.js` is re-run (against `python3 build_site.py --raw`) at each section gate; an image it has not seen keeps its own size up to 1280 px, so a missed re-run only costs weight, never quality.
- **Canvas photos are WebP q76,** not the originals; hero 1 and 2 are the two versions that use them, and both are to be replaced as defaults.
- **Not yet applicable:** the page rules about length, pinned sections, Book buttons and repeated numbers (they start at the Hero gate).

## Skill ledger (as built)

| Level | Element | Skill → how used |
|---|---|---|
| Site | image weight | ⟦S0231⟧ web-performance-optimization: right-size, one copy, one film; ⟦S0985⟧ critical-images: masters stay at least as wide as their display |
| Site | placeholders | ⟦S0956⟧ broken-images: every view checked for broken and unresolved images; ⟦S0066⟧ break-ui: the worst case (a module reading an image before it resolves) designed out by running the resolver first |
| Site | motion | ⟦S1315⟧ optimize-web-animations: pointer-driven heroes compared, unchanged |
| Site | locks | ⟦S0220⟧: no text, number or caption was touched |

## Scorecard (infrastructure step: not comparable with the section scores)

| Category | Score | Evidence |
|---|---|---|
| Design (40) | **8.0** | No look changed, many photos sharper (`gate/weight-crop-brick-1to1.png`) |
| Usability (30) | **8.8** | 40% faster on a slow line, 0 errors in 255 views. **Minus:** +0.12 s blocking and +4.5 MB heap |
| Creativity (20) | **7.6** | Engineering craft: a strict same-photo detector; no new design idea, by nature |
| Content (10) | **9.0** | Nothing altered; locks intact |
| **Weighted** | **8.26** | **PASS** (≥ 7.0; no category below 6.0) |

Weighted = 0.4 × 8.0 + 0.3 × 8.8 + 0.2 × 7.6 + 0.1 × 9.0 = 3.20 + 2.64 + 1.52 + 0.90 = **8.26**.

**Vetoes: none.** Locks verbatim; no version or default changed; white ground; no background system.

---

## NEXT PLAN — Hero H-A, for Muse's consult

Under the consult-first order and the upgrade plan Muse passed (H-A agreed). Nothing below is built.

### AUDIT — the Hero section now

- **The shown default is Hero 1, labelled in the switcher "backup, rejected photo".** It is a canvas photo (Maple Run, Feb 2026) with a white card; it is 1.0 screen tall.
- **There are 18 versions** (full audit in the upgrade plan, section 2.1):
  - the supplied-photo heroes 2–6 and 8 are barred from being captioned as the firm's work;
  - K's seam is a before/after centrepiece (retired as default);
  - M (43 thumbnails) reads as nothing at size;
  - N is the strongest of the real-photo heroes but is a magazine cover with 156 words.
- **What the section does well today:** real photos exist (N, L, M, K); the locked offer sentence is clear; the Book button and phone are above the fold.
- **What it does badly:**
  - the default is a labelled backup;
  - no human voice sits in the first screen;
  - the trust signal is one line of small type.
- **The problem H-A must solve:** in one screen a real job and a real homeowner's word, with the offer and one action, using a photo that is never stretched past its own pixels.

### RESEARCH — reference and mechanism

- **Governing reference: Cowboy** (annex v3): "family-fronted warmth, one named system, restrained colour: homeowner trust without contractor clichés". Confirmed live; the hero is a single subject, and the family framing sits in the body.
- **Transfers:** a single-subject hero (one photo, nothing else competing); the warmth carried by a human voice; one named system ("One free inspection covers every trade on the house."); restraint in colour and type.
- **Does not transfer:** Cowboy's bikes, its people photography (none exists for Austin Pro, and none will be invented), its palette or typefaces.
- **WEB-SKILLS:** ⟦S1434⟧ visual-hierarchy · ⟦S1454⟧ serial-position-effect · ⟦S0985⟧ critical-images · ⟦S0095⟧ design-taste-frontend · ⟦S1435⟧ von-restorff (the one filled button) · ⟦S0060⟧ animate · ⟦S0062⟧ animation-performance · ⟦S0400⟧ accessible-animation.

### THE PLAN — H-A "The house, and the homeowner's word"

| Element | What will be built | Source (verbatim) |
|---|---|---|
| **Photo** | One real job photo of a finished Austin Pro job, shown at **at most 1400 CSS px wide** (its own width, so never enlarged), centred with white margins on wider screens, full width on phones with a taller crop. Caption, bottom-left: place, month and trades from the job's own record, with a link to the project. Every local job photo is 1400 × 1050 (the Maple Run original is 1900 × 1425) | `photos.json` |
| **The homeowner's word** | A white card on the photo: "Wow what a difference our new windows have made, our home is so QUIET!", **Lois Richwine, Google review, 2026**. It is labelled "A homeowner's words" and is never presented as the owner of the house in the photo | review 17, already in the build's verbatim lock |
| **The named system** | "One free inspection covers every trade on the house." | the homepage's own subline |
| **The offer and the action** | The existing H1 and subline unchanged ("The full wall or the whole house."), the one filled "Book a free inspection", and (512) 550-0000 | locks |
| **Trust marks** | GAF Master Elite · James Hardie Elite Preferred · Andersen Certified Premier, as small quiet marks | locks |
| **Live unit** (one bespoke unit, pointer only) | The photo and the card sit on two depths: the photo drifts up to 8 px against the pointer while the card tilts up to 3° with a soft shadow shift; a diagonal light gradient crosses the photo once on load and then follows the pointer faintly. Transform and opacity only; no WebGL | |
| **Touch and reduced motion** | Touch: no pointer effects, the one-time light sweep only. Reduced motion: fully static | |
| **Retire** | Hero 1 stops being the default (it stays as a hidden backup; so do the other 17). Hero K is retired from default consideration | |
| **Weight** | Code ≤ 25 KB. One 1400-px master of the chosen photo (about 280 KB); the weight pass's same-photo merge removes its smaller copies elsewhere, so the net is about zero | |
| **Page rules** | 1.0 screen at 1440; one Book button in the section; no number repeated from elsewhere on the page | |

**Why it should beat the current best (N, 8.67):** N's photo choice was right, but its cover lines and 156 words turned the first screen into a document. H-A keeps one real photo and one human voice, and puts trust and booking in the first screen, with a live unit that is small and never heavy.

### Decisions for Muse (the consult reply)

1. **Which photo?** Hero 1's photo (Maple Run, Feb 2026) is labelled "rejected" in the switcher, so I would not use it unless you say so. Candidates (`gate/hero-candidates-43-photos.jpg` shows all 43):
   - **#5, Anderson Mill West, Cedar Park, Aug 2026** (Windows, Exterior Painting & Siding): a bright two-storey back with many new windows, blue sky and lawn. **My recommendation:** the visible work is windows and siding, which matches the quote's subject without implying it is that house.
   - **#38, same job, a different angle** (Aug 2026).
   - **#3, Maple Run, Austin, Jul 2026** (Siding, Exterior Painting & Gutters): two-storey siding on a brick base.
2. **Where does "4.9 from 474 Google reviews" live?** The page rule says each number once. **Recommendation:** the hero carries the credentials and the quote; the Reviews section carries 4.9 / 474 large. The alternative is to keep a small star line in the hero and show the number in Reviews as the count only.
3. **Keep the existing H1 and subline unchanged?** I recommend yes (they are the firm's own words and nothing in them needs a new claim); the quote supplies the voice.
