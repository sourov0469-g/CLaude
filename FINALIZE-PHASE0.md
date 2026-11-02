# FINALIZE — ELBAZ · Phase 0: recite-back + removal inventory

This was written 2026-11-02 under FINALIZE-ELBAZ and the REFERENCE ANNEX (the annex overrides the brief's reference lists). Nothing has been built or removed yet. **STOP: this is the Phase 0 gate.**

## Base files

The brief names `~/workspace/previews/full-sites/…` as the base. That folder does not exist in this container.

The repository's built pages in `remodeling/site/` are the reviewed build. Their byte sizes match the brief exactly:

| page | bytes |
|---|---|
| elbaz-homepage | 3,108,795 |
| kitchens | 1,294,212 |
| bathrooms | 1,316,072 |
| renovation | 1,010,223 |
| contact | 676,674 |

They come from commit `ce59679`. The 8.2 MB merged single file is not in the container; it is these five pages merged, and I will assemble the final single file myself in Phase 5.

## (a) Recite-back, in my own words

### The locks (these outrank everything)

1. **The owner's shortlist map is law.**
   - Anything he did not shortlist is removed.
   - Shortlisted pieces are combined only when the result is one balanced design.
   - Where a merge cannot be made perfect, the stronger single version ships and I say so at the gate.
2. **Facts are exactly the locked list**, with nothing invented and nothing reworded:
   - 4.8 from 343 Google reviews, aggregate only, with no quotes or names.
   - The licence line, character-exact: `Licensed, bonded & insured · CBC1265280`.
   - 19 W Flagler St #310, Miami FL 33130.
   - (754) 236-0675.
   - Sun–Fri 7am–7pm, Saturday closed.
   - Forms go by mailto to Sales@elbazconstruction.com, and are never called saved, sent, received or confirmed.
   - 44 real photos of 26 projects, exactly 4 genuine before/after pairs, and 104 municipalities.
   - No other statistic, rating, count or testimonial may appear.
3. **Brand.**
   - Clay/terracotta with warm neutrals, plus black and white.
   - Light-dominant: at most about 2 deep sections per page view; any deep section is warm, never black, never green, never steel.
   - Only everyday fonts (Poppins, Roboto, Inter, Open Sans, Lato, Montserrat). No exotic faces.
   - Anti-AI look: no generic gradients or glass, no effect excess, no cookie-cutter rhythm.
4. **Three versions per section.** Each section gets three wholly different versions (layout, style, composition) built only from shortlisted material. Three variations of one idea count as one version and fail.
5. **Animation is made for its one section** from that section's own material, and is never reused (the Custom Animation Law). The whole page is one journey (the Flow Law): one easing language, one duration scale, one scroll behaviour.
6. **The conversion floor is never traded for immersion.**
   - Proof beside every call to action.
   - The phone number is always reachable, with sticky tap-to-call on mobile.
   - The licence line appears where trust is asked for.
   - Copy budgets are counted: hero at most 40 words; a section headline at most 8 words plus at most 35 words of support.
7. **System numbers for new or rebuilt work.**
   - Icons: the Carbon icon system (24/16 grids, 1.5/1 px strokes, currentColor).
   - Type: Utopia fluid clamps (poles 360/1240, base 18→20, ratios 1.20→1.25, rem term in every clamp, max ≤ 2.5× min).
   - Spacing: the Carbon spacing ladder only.
   - Section rhythm: three tokens (48→64, 64→96, 96→144), with the same token top and bottom.
8. **Stop at every gate.** Silence is not approval. Artefacts, not claims. Anything missing is reported, never improvised.

### References (the annex overrides the brief)

| role | references |
|---|---|
| Confirmed | Lusion (flow; governs the flow maps) · Scout Motors (section craft) · Apple AirPods Pro (UI grammar; 4.8 and 343 as numeral events) · Graza (the custom-animation standard) · Immersive Garden (primary: the chaptered, camera-scrub build journey) |
| Bruno Simon, scoped | ONE explorable section only, the Towns map. All 104 towns stay visible at once. Performance budget plus a mobile and reduced-motion fallback. |
| Scoped support | Unseen Studio: the single easing language only. basement.studio: secondary portal transitions between project chapters only. Obys: the project index only. |
| Out | Everything else, including Bone Dry Roofing, Lando Norris, Locomotive, Power Home Remodeling, DaBella, Linear Roofing and Owl Roofing. Anything document-like fails the owner's test. |

### Phase order (each phase ends in a stop)

| phase | contents |
|---|---|
| 0 | This recite-back and the removal inventory. |
| 1 | Per-page flow maps; an animation storyboard per signature section; the Financing concept; the logo direction; the companion rebuild plan (bugs first); one primary reference per section with its teardown. |
| 2 | The companion and logo, live in a test harness, clicked, scrolled and frame-checked; hover and click fixed site-wide. |
| 3 | Home: removals, three versions per section, the flow and animation upgrade, screenshots at desktop and 390 px, frame-by-frame. |
| 4 | Kitchens, then Bathrooms. |
| 5 | Renovation (finish the existing set only), then Contact, then the single-file delivery with in-file navigation. |

Every gate: a visual audit against WEB-SKILLS, then artefacts handed to a non-builder judge (scorecard: ≥ 7.0 weighted, no category below 6.0, zero vetoes). I never self-certify.

## Ambiguities: answers needed before or at Phase 1

1. **Scorecard missing.** `~/workspace/research_notes/ai-website-system-2026-11-02/SCORECARD.md` is not in this container. I can attach artefacts but cannot pre-check against the scorecard's categories. Please supply it, or confirm the judge holds it.
2. **Hidden backups.** Every section also carries hidden backup versions:
   - Home: hero b1–b8, every other section b1–b4.
   - Inner pages: b1–b5 per section.

   The map says non-shortlisted versions are removed, but an earlier standing rule kept these backups. **Proposal:** remove all backups from the delivery as well, and keep them recoverable by tagging the pre-finalize commit (`pre-finalize`, i.e. `ce59679`). Please confirm.
3. **"Three versions per section" for the system parts.** **Proposal:**
   - Footer: one improved version.
   - Shape dividers: one system with per-boundary forms, inside the flow map.
   - Logo: one.
   - Companion: one.

   Every real content section gets three. Please confirm, or tell me which of these also need three.
4. **Numbers beyond the lock list.** The lock says the locked facts are the ONLY numbers and claims allowed. The reviewed build also shows other firm-published facts:
   - Financing: four partners and their published terms, such as Synchrony 6–132 months and RenewPACE up to $250K.
   - Process: week marks.
   - Kitchen scope tiers and the 10 sub-services.
   - Bathroom permits.
   - County HVHZ / Notice of Acceptance rules.
   - 34/31/39 by county.
   - "Usually the same or next working day".

   These all come from the firm's own site, but they are not in the lock list. Do they stay (they are published firm facts, nothing new), or are they stripped? This decides what the Financing fresh direction may say at all.
5. **Before/After imagery.**
   - I have no image generation or licensed stock source in this container. The only image tools need authorisation, and the 4 genuine pairs cannot honestly be upscaled into "new" photos.
   - The section's own content is those 4 pairs. If display imagery replaces them, it must not read as Elbaz before/after work.

   I need one of:
   - (a) higher-resolution originals of the 4 pairs from the firm, or
   - (b) supplied licensed stock or AI images, plus your ruling on how they may be labelled inside a before/after section.

   Until then this is NO-COVERAGE.
6. **The Process 8-frame animation** (consultation → … → frame 8) needs scenes. **Proposal:** draw the 8 frames as finished-quality SVG illustration in the brand palette (not cartoonish), built for scroll-scrub. Or supply imagery.
7. **Section-name mapping.** Please confirm:
   - "Contact Hero" = the first Contact section (`contact-form`). Its V5 is the big phone number with a short form; its V3 is the letter form.
   - "Kitchens: section after the Hero" = `kitchen-scope` (V5 = "Pull a drawer").
   - "Projects" = `work`.
8. **Contact, Visit and Call.** The map says "V1 and V3 are the clean ones (V1/V4/V5 kind of work; V2 does not)". **My reading:** V1 and V3 are KEEP; V4 and V5 may only be mined for parts; V2 is REMOVE. Please confirm.
9. **Cursor count.** Today the site shows up to three cursor things:
   - (1) the exact pointer tip,
   - (2) the companion (opt-in since the rebrand),
   - (3) per-element drawn reactions (little sprites drawn on every button and link).

   **Plan:**
   - The tip is "the cursor".
   - The companion comes back on by default as the one carrier of variety; this reverses my rebrand decision to switch it off.
   - The per-element sprites are removed, and their per-element variety moves into the companion's own reactions.
10. **The type scale.** The new Utopia scale binds new and rebuilt work, but kept material carries the rebrand scale. Two scales on one page would read as assembly. **Proposal:** move the global type tokens to the Utopia scale, so kept material lands on it too, keeping its layout geometry. Please confirm.
11. **Reference teardowns** need the live reference sites. Before Phase 1 I will check whether this container's network reaches them. If it does not, each teardown will be clearly labelled as written from prior knowledge, not a fresh visit.

## (b) Removal inventory: every version, page by page

"b…" = hidden backups; the proposal for them is in ambiguity 2. Owner wording is quoted where it decides the call.

### HOME (`elbaz-homepage.html`)

| section | version (heading / what it is) | call |
|---|---|---|
| **Hero** | V1 house photo with roofline drawing, palm tree and finish picker | **KEEP** (merge source: the opening look; the tree is removed; the roof-cut SVG is fixed) |
| | V2 photo grid | REMOVE |
| | V3 framed photo with drawn border | **KEEP** (merge source: the border) |
| | V4 drawing-to-photo background reveal | **KEEP** (merge source: the background-reveal scrollbar) |
| | V5 collage with circle | REMOVE |
| | V6 lot drawing with brand card | REMOVE |
| | V7 skyline of drawn houses | REMOVE |
| | V8 giant "Built." with reacting background | **KEEP** (merge source: the reacting Build background) |
| | b1–b8 | REMOVE |
| **Proof** | V2 "Proof you can pick up" (draggable boxes) | **KEEP** (restore drag/throw/stack; subtle hover bend) |
| | V1, V3, V4, V5, V6, V7, V8 · b1–b4 | REMOVE |
| **Services** | V2 "Three drawing sets. One contractor." (card stacking) | **KEEP** |
| | V1, V3–V8 · b1–b4 | REMOVE |
| **Before/After** | V1 "Same room. Different house." | **KEEP** (imagery: ambiguity 5) |
| | V2–V8 · b1–b4 | REMOVE |
| **Process** | V1 "Eight stops between your first call and your keys" (the car route) | **KEEP** (direction: pin, play, release; car replaced by an 8-frame scene) |
| | V2 "Watch a job go up, stage by stage" | **KEEP** (mine only if balanced) |
| | V4 "The combination to your keys" | **KEEP** (mine only if balanced) |
| | V3, V5, V6, V7, V8 · b1–b4 | REMOVE |
| **Financing** | V1–V8 · b1–b4 | **ALL REMOVE**: fresh direction (content: ambiguity 4) |
| **Projects** (`work`) | V1 "Twenty-six rooms, on the move" | **KEEP** (remove the two middle arrows; two rows in opposite directions) |
| | V5 "Nothing leaves our hands until it is level" | **KEEP** (add animation) |
| | V8 "Flip through the job binder" | **KEEP** (do better) |
| | V2, V3, V4, V6, V7 · b1–b4 | REMOVE |
| **Reviews** | V1 "343 Google reviews. Count them." (tally) | **KEEP** |
| | V2 "Three hundred and forty-three stars" | **KEEP** (star entrance becomes a scroll animation of the stars coming together) |
| | V3–V8 · b1–b4 | REMOVE |
| **Towns** | V4 "From our office to your street" | **KEEP** (main; its animation is assessed in Phase 1) |
| | V1 "Type your town" | **KEEP** (a little) |
| | V2 "Do we build in your town?" | **KEEP** (a little; its hiding of towns must never repeat; all 104 visible at once) |
| | V3, V5, V6, V7, V8 · b1–b4 | REMOVE |
| **Consult** | V8 "Say it in one sentence" | **KEEP** (the idea; wording stays open and never locks a visitor into choices) |
| | V1 "Tap the rooms you want to change" | **KEEP** |
| | V3 "Call. You will get a real answer…" | **KEEP** (its phone area) |
| | V2, V4, V5, V6, V7 · b1–b4 | REMOVE |
| **Shape dividers** | the current system between sections | **KEEP** (improved; part of the flow system) |
| **Footer** | current | **KEEP** (improved) |

### KITCHENS (`kitchens.html`)

| section | version | call |
|---|---|---|
| **Hero** (`kitchen-intro`) | V1 "The room you actually live in." | **KEEP** (small improvement) |
| | V2–V5 · b1–b5 | REMOVE |
| **After the Hero** (`kitchen-scope`) | V5 "Pull a drawer. Read the scope." | **KEEP** (huge UI/UX upgrade) |
| | V1–V4 · b1–b5 | REMOVE |
| **Kitchen Projects** (`kitchen-work`) | V2 "Same room. Before and after." | **KEEP** (the before/after pattern) |
| | V3 "Pinned to the site board." | **KEEP** (the other images) |
| | V1 "Real kitchens, photographed as delivered." | **KEEP** (good; its spacing is fixed wherever the pattern is used) |
| | V4, V5 · b1–b5 | REMOVE |
| **Page CTA** | — | improve |

### BATHROOMS (`bathrooms.html`)

| section | version | call |
|---|---|---|
| **Hero** (`bath-intro`) | V5 "Down to the studs. Closed up once." | **KEEP** (major improvement) |
| | V1–V4 · b1–b5 | REMOVE |
| **How a bath is built** (`bath-build`) | V3 "Three chapters. One bathroom." | **KEEP** (rebuilt as a horizontal scroll with finished-quality animation) |
| | V1, V2, V4, V5 · b1–b5 | REMOVE |
| **Bathroom Projects** (`bath-work`) | V5 "Deal through the bathrooms." | **KEEP** (stacked images, click next) |
| | V4 "Looking for a walk-in shower?" | **KEEP** (its filter only) |
| | (plus) | the kitchen before/after scrollbar approach |
| | V1, V2, V3 · b1–b5 | REMOVE |

### RENOVATION (`renovation.html`): finish the existing three sections only

| section | version | call |
|---|---|---|
| **Hero** (`reno-intro`) | V3 "Whatever the scope, one team accountable for all of it." | **KEEP** |
| | V4 "The whole house, re-sequenced." | **KEEP** |
| | V1, V2, V5 · b1–b5 | REMOVE |
| **Services** (`reno-services`) | V1–V5 · b1–b5 | **ALL REMOVE**: rebuilt as card stacking like Home Services V2, at the same quality |
| **Permits and Approvals** (`reno-permits`) | V2 "Checked before anything is drawn." | **KEEP** |
| | V1, V3, V4, V5 · b1–b5 | REMOVE |

### CONTACT (`contact.html`)

| section | version | call |
|---|---|---|
| **Hero** (`contact-form`) | V5 "You will get a real answer." | **KEEP** (left side: the big number) |
| | V3 "Write to us in one paragraph." | **KEEP** (right side) |
| | V1, V2, V4 · b1–b5 | REMOVE |
| **Visit and Call** (`contact-visit`) | V1 "Everything you need on one card." | **KEEP** |
| | V3 "Downtown Miami, on Flagler." | **KEEP** |
| | V4 "Seven places to find us." | parts only (ambiguity 8) |
| | V5 "Seven in the morning to seven at night." | parts only (ambiguity 8) |
| | V2 "Six days a week, seven to seven." · b1–b5 | REMOVE |
| **Service Area** (`contact-area`) | V5 "Wherever you are in South Florida." | **KEEP** |
| | V1 "Is your town on our list?" | **KEEP** (its search bar) |
| | V2, V3, V4 · b1–b5 | REMOVE |

### Totals

| | count | detail |
|---|---|---|
| Visible versions | 140 | home 80 + inner 60 |
| Kept as material | 42 | home 20, plus the dividers and footer systems; inner 22, two of which (contact-visit V4 and V5) are parts only |
| Removed | 98 visible + all 104 backups | |
| Rebuilt from nothing | Home Financing, Renovation Services | |

**STOP: Phase 0 gate.** No building starts until you approve this, ideally with answers to ambiguities 1–11.
