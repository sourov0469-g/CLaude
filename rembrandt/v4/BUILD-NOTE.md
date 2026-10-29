# BUILD-NOTE: Rembrandt Roofing "In Good Light", Runs A to C

2026-10-28. Source of truth: PLAN-FINAL.md, with MUSE-AUDIT.md amendments A1 to A8 overriding it where they differ.
Scope: plan §10 Runs A, B and C for the HOMEPAGE, every section's default (starred) version. No V2/V3 alternates, no switcher, no inner pages.
Deliverable: `site/` (index.html + css/ + js/ + assets/). Sources live in `site/src/`; `build/build.mjs` generates `site/` from them.

## At a glance

| | Result |
|---|---|
| Run A gate (Lighthouse ≥ 95 all categories, HTML validator clean, axe clean) | Met on desktop; mobile Performance 93 to 97 (two runs below 95 on VM noise, see §8). Validator: 0 errors. axe: 0 violations in 4 modes |
| Run B gate (no long task > 50 ms, calm mode complete) | Calm complete. Long tasks: 0 at normal CPU on desktop and phone; **not met at 4× CPU on phone** (5 to 13 tasks, worst 76 to 166 ms) |
| Run C gate (funnel end to end incl. errors, offline, back button) | Met: 18/18 checks, repeated on the final build |
| §8 byte budgets | All met |
| §8 mobile lab LCP ≤ 1.8 s | **Not met**: 1.83 to 2.37 s simulated (desktop 0.63 to 0.82 s, gate 1.2 s, met) |
| A2 relight verdict | S1 hero: graded still + real-sun lamp sweep (no relight). S3 lamp: WebGL relight ships on real GPUs; CSS lamp everywhere else |
| A3 NWS codes | Verified against the live API; banner armed, fails silent |
| A1 merged standalone HTML | **Not produced** in this run (see "Left for Runs D to F") |

## How to run it

- Build: `cd build && node build.mjs` (writes `site/index.html`, `site/css/site.css`, `site/js/*.js`, `site/assets/svg/ply-*.svg`, prints the size report).
- Serve over HTTP (it fetches JSON and dynamically imports `lamp.js`): `node build/serve.mjs 8766` gzips like a production host. `python3 -m http.server` works but does not compress, so do not measure with it.
- Test flags: `?motion=calm` · `?sun=night` (night plate) · `?nws=test` (injects a TEST warning) · `?submit=error` / `?submit=fail-once` · `?photos=fail-one` · `?nogl=1` (CSS lamp) · `?gl=force` (QA only: WebGL lamp even on software GL).
- Test scripts in `build/`: `funnel-test.mjs`, `overflow.mjs`, `axe.mjs`, `longtask-sw.mjs` (standard renderer; note `longtask.mjs` is the SwiftShader-flag variant, names are swapped), `sheet.mjs` (contact sheets), `vcheck.mjs`, `photocap.mjs`, `glforce.mjs`, `proof.mjs`, `tags.mjs`. Final Lighthouse JSONs, funnel log and long-task record are in `build/reports/`.

## What was built

### Run A: assets and the static site

- **Image grading** (`_tools/grade.py`, the 16 jobs saved in `_tools/jobs-runA.json`): numpy/PIL grades (Day, Dawn, Night), AVIF via ffmpeg libaom (crf 30 to 40), WebP and JPEG fallbacks at the listed widths.
  - Hero (H1, Pexels): Day grade, 1080/1600/2400. AVIF 50.1 KB / 116 KB / 242 KB.
  - **S2-1 night house (gap closed):** C2.jpg night-graded ("night_special"), then split into sky, house and foreground layers (`_tools/layers.py`) for the storm parallax. The same grade is the hero's night plate after local sunset.
  - S2 ceiling stain: S2-2 graded Dawn.
  - **S3 macro (gap closed):** built from F9 (Wikimedia Commons, CC BY-SA 3.0), cropped and Dawn-graded, plus a height map (`macro-height-1024/1600.webp`) for the lamp shader. F10 and H3 were reference only.
  - **S6 steps 1, 2, 4 (gap closed):** three Wikimedia Commons photos by Famartin (CC BY-SA 4.0) of one real roof replacement, sourced in this run and added to `assets-stock/MANIFEST.md`. Step 3 is S6-3 (Pexels, Ryan Stephens). All four are captioned "Illustrative stock, not a Rembrandt job".
  - **S3-2 dawn pair:** skipped as briefed.
  - Owner photos (`../rembrandt-assets/`): ba1 pair, ba2 pair (re-registered as a two-angle pair), job-truck, job-charcoal and team, regraded only (no AI edits).
  - S5 paper texture (S5-1, Pexels), OG image, favicon.svg.
- **Fonts** (`_tools/fonts.py`): Mona Sans variable (wdth 100 to 125, wght 300 to 650), Newsreader (wght 400 to 600, opsz pinned at 16), Newsreader Italic (static 380, opsz 24). Subset to ASCII plus the few non-ASCII characters the copy uses: 86.1 KB in total.
- **Data:** `towns.json` (24 towns, Census Gazetteer centroids, distance from the Springboro office, ACS B25035 median year built) and `zips.json` (ZCTAs within 25 miles, haversine).
- **Tokens** per plan §2 (OKLCH colours, spacing, durations, eases) in `site/src/site.css`.
- **Static, accessible HTML** for S0 to S15 defaults. No-JS is complete: the estimate is a plain form, the FAQ uses `<details>`, before/after sits side by side, and the sticky stages unstack.
- **JSON-LD:** RoofingContractor + FAQPage.
- **Build pipeline** (`build/build.mjs`):
  - Critical CSS is inlined between `@critical-start/end` markers (13.3 KB); the rest goes to `css/site.css`, loaded without blocking, with a noscript link.
  - Generated pieces: the S4 ply SVGs (7 files), the S11 rings SVG, the S7 seal, the town lists, credits and JSON-LD.
  - Scripts are minified with esbuild, and a gzip size report is printed.
- Inner-page templates: not built (out of scope per the brief).

### Run B: motion core

- **Conductor:** one requestAnimationFrame loop with subscribers. It sleeps when nothing moves. Every element measured through the rect cache is read at the start of the frame, before any style write.
- **Sun:** NOAA solar position for Springboro, plus a per-chapter sun path (the plan's SUN table). Office state runs on America/New_York.
- **Cast shadows:** a sun-vector offset. Length comes from 1/tan(elevation) and the side flips at noon. The shadow text is drawn by `::before`, so contrast checkers and screen readers ignore it.
- **Reveal grammar:** our own line splitter (lazy, IntersectionObserver with a 60% margin). Masked lines rise with power4.out over 0.9 s (0.72 s on phones), stagger 0.09. Inline `<u>` is rebuilt per line, and each element splits once. Seam glints and image reveals complete the set.
- **Header:**
  - Hides on scroll down, returns after 8 px up, and turns solid after 60% of the viewport.
  - At ≥ 1024 px the phone pill FLIPs into the floating pill; phones get a bottom bar (Call, Text, Photos).
  - The drawer is a modal dialog with `main` inert.
- **Cursor ring (A8):** fine pointers only, hidden over text and the phone number; becomes the lamp in S1 and S3.
- **S1 V1 "First light":**
  - Graded still plus the real-sun lamp sweep, with a live time and place label.
  - After local sunset the night plate fades in with a porch-light note (`?sun=night` to preview).
  - The hero proof line keeps to one line at every width (A7).
- **S2 V1 storm stage:**
  - Sticky stage, 380vh (300vh on phones), with five beats.
  - Rain canvas: 300 or 120 drops, DPR capped at 1.25, density halves when the median frame exceeds 24 ms.
  - Rain-written headline particles, one lightning flash, and shingle tabs that lift with scroll velocity.
  - The ceiling stain spreads.
  - Controls: pause button, skip link, and a brick storm line that stays clear of the phone bar.
- **Calm mode:** triggered by prefers-reduced-motion, the footer toggle (`rr-motion` in localStorage) or `?motion=calm`. Stages unstack, everything is visible, and the funnel is the same.
- **Boot:**
  - GSAP 3 core (27.7 KB) is injected after the first paint.
  - Core steps run as separate tasks (hero headline first, estimate engine included); the remaining modules start on idle.
  - A 4 s watchdog sets `html[data-motion-failed]`. If GSAP fails, the page stays static and complete.

### Run C: relight, layers and the estimate

- **WebGL renderer** (`js/lamp.js`, 2.3 KB gzip, the plan's shader constants):
  - One full-screen triangle; normals are derived from the height map in the shader, lit by a raking lamp.
  - Up to 12 hail dents via `uniform vec4 hits[12]`; luminance clamped to .04 to .96.
  - DPR ladder 2 → 1.5 → 1 when the 30-frame median exceeds 24 ms, then hand-back to the CSS lamp. Context-loss handling.
  - Software renderers (SwiftShader, llvmpipe and similar) are refused up front, and two synced probe draws must finish in under 40 ms.
- **S3 the lamp:**
  - Three hotspots, found after 300 ms within 90 px, and also by keyboard focus.
  - "Drop hail" and "Clear dents" buttons.
  - On touch, scrolling drives the lamp; in calm mode all three hotspots are shown.
  - The CSS lamp is the fallback.
- **S4 explode:** seven plies in a CSS 3D stack, exploded by scroll, with tags and leaders on desktop and a numbered legend on phones. Skip link.
- **S5 the paper:**
  - Sentence form, seven line items, four-step progress, and a squares helper (footprint × pitch).
  - Up to 3 photos, resized on the device: ≤ 1600 px, ≤ 400 KB each, EXIF stripped.
  - Candour box, "Sign and send", and the RECEIVED stamp with press and glare.
- **Estimate engine:**
  - State lives in localStorage: restored after reload with a "kept your answers" note, and it survives the back button.
  - Hero chips write the situation into the state and the SMS body. One ZIP answer serves both S5 and S11.
  - Attribution: utm_*, gclid/fbclid/msclkid, and referrer class (including AI referrals).
  - dataLayer events: estimate_start, estimate_submit, estimate_error, hotspot_found, quality_step.
- **A5 submit stub:**
  - Success shows the stamp, the call-back promise and a reference `RR-xxxxxx`.
  - `?submit=error` produces the error state with retries at 2, 4 and 8 s, then a copyable reference and the phone number.
  - `?submit=fail-once` auto-retries and succeeds. Offline goes to the error path with answers kept.
- **S6 to S15 defaults**, which §10 places in Run D, were built now because the brief asks for every section's default:
  - install steps (sticky);
  - signature draw and warranty seal;
  - masked title drift and before/after slider;
  - reviews aggregate, people, towns rings with the ZIP arc;
  - claim steps, FAQ (interpolate-size where supported, deep links);
  - close, and the footer directory with the motion toggle and credits.

  Run D keeps the switcher and the alternates.

## Gate results (final build)

Measured in a VM with no GPU: Chromium headless shell (Playwright build 1248), Lighthouse 13.6.0 (default mobile = simulated Moto G Power, slow 4G, 4× CPU), axe-core 4.14.0, html-validate 9 (`html-validate:standard`, spec conformance). The site was served gzipped by `build/serve.mjs`.

- **Lighthouse, mobile.**
  - Final 3 runs: Performance 94 / 93 / 97, Accessibility 100, Best Practices 96, SEO 100. LCP 2.36 / 2.35 / 1.83 s, TBT 216 / 257 / 162 ms, CLS 0.0006, 279 KB.
  - Three earlier runs on the same code before two copy-only edits: 97 / 97 / 97, LCP 2.36 s, TBT 95 to 136 ms.
  - In the two sub-95 runs the VM itself was slow (unthrottled LCP about 1.2 s against the usual 0.2 s).
- **Lighthouse, desktop:** 100 / 100 / 96 / 100, LCP 0.63 s, TBT 0, CLS 0.0004, 420 KB.
- **Best Practices 96** everywhere has a single cause: the console error from the NWS fetch, which this VM's browser cannot reach (`ERR_TUNNEL_CONNECTION_FAILED`). The fetch fails silently by design.
- **HTML validator:** 0 errors. W3C Nu was not run.
- **axe, all rules after a full scroll:**
  - 0 violations on desktop, mobile, mobile calm and desktop no-JS.
  - 153 to 240 contrast nodes are "needs review" because axe cannot decide them, not because they fail. Desktop breakdown:
    - 154 sit over the shadow pseudo-elements;
    - 47 sit on gradients;
    - 16 are very short text (bracket glyphs);
    - 3 have overlapping backgrounds;
    - 1 sits on an image.
- **Long tasks during scroll** (standard renderer, wheel through the whole page):
  - Desktop 1×: 0. Phone 1×: 0.
  - Phone 4× CPU: 13 tasks, worst 166 ms, in the final record (`build/reports/longtask-final.txt`); earlier runs gave 5 to 6, worst 76 to 126 ms.
  - Traced causes: the conductor's frame callbacks (forced style/layout, partly fixed by batching reads), GSAP ticks during reveals, and the first render of `content-visibility` sections.
- **Calm mode:** 24-frame mobile contact sheet reviewed; the funnel passes in calm; overflow is clean in calm.
- **Funnel 18/18:**
  - Validation (inline errors, role=alert, focus on the first error).
  - ZIP inside the area (with the Census fact) and outside it.
  - Step counter.
  - Success with the RECEIVED stamp, Rachel and the reference.
  - Analytics events; no page errors.
  - Error state, then 3 retries and a copyable reference; fail-once; offline.
  - Reload restore; back button.
  - Photos with one failure.
  - Hero chip into the paper and the SMS body.
  - S11 ZIP arc.
  - Calm funnel.
- **Overflow gate:** 8/8 clean (360, 375, 390, 768, 1024, 1440, plus calm at 375 and 1440). The only off-edge element is the RECEIVED stamp in its invisible pre-landing scale; landed, it sits inside the paper at 360, 375 and 390.

## §8 budgets

| Budget | Plan | Built | |
|---|---|---|---|
| HTML (home, gzip) | ≤ 60 KB | 18.9 KB | ✓ |
| Critical CSS inline | ≤ 14 KB | 13.3 KB | ✓ (tight) |
| Fonts | ≤ 140 KB | 86.1 KB (Mona 46.8, Newsreader 25.4, Italic 15.9) | ✓ |
| App JS | ≤ 35 KB | 15.7 KB gzip (deferred classic script, see deviations) | ✓ |
| GSAP, after first paint | ≈ 60 KB | 27.7 KB, core only, injected after first paint | ✓ |
| WebGL renderer | ≤ 8 KB | 2.3 KB | ✓ |
| Hero AVIF | ≤ 140 KB (1080w) / ≤ 260 KB (2400w) | 50.1 KB / 242 KB | ✓ |
| Above the fold | ≤ 500 KB mobile / ≤ 800 KB desktop | 186 KB / 251 KB | ✓ |
| Home total, no interaction | ≤ 1.4 MB / ≤ 2.4 MB | 279 KB / 420 KB | ✓ |
| LCP lab | ≤ 1.8 s mobile / ≤ 1.2 s desktop | 1.83 to 2.37 s / 0.63 to 0.82 s | ✗ mobile / ✓ desktop |
| INP | ≤ 150 / 100 ms | not measured (TBT proxy: 95 to 257 ms mobile, 0 desktop) | open |
| CLS | ≤ 0.05 | 0.0003 to 0.0015 | ✓ |
| Long tasks during scroll | none > 50 ms | 0 at 1×; 5 to 13 at 4× CPU on phone | ✗ at 4× |
| Extra requests from §3.11 | 1 | 1 (NWS, cached 10 min, 3 s abort) | ✓ |
| GPU textures | ≤ 24 / 64 MB | about 6 MB phone, about 22 MB desktop at DPR 2 (computed) | ✓ |
| Frame time in stages | median ≤ 24 ms or step down | watchdogs in lamp (DPR ladder, then CSS) and rain (density halves) | ✓ |
| Solar + alerts + office JS | ≤ 4 KB | 2.9 KB gzip (5.97 KB minified) | ✓ |
| Photo upload | 3 × ≤ 400 KB after resize | 378 / 392 / 312 KB (two synthetic worst cases + a 2400 px photo) | ✓ (stubbed upload, not tried on 3G) |

**Mobile LCP: why the gate is missed.**
- The LCP element is the hero image. Its render delay is about 0.2 s, and unthrottled LCP is 0.2 to 0.25 s, so the simulated figure comes from the network: HTML 19 KB + hero 51 KB + two preloaded fonts 63 KB on simulated slow 4G.
- Blocking every webfont still left 1.99 s. A more efficient AVIF encode saved under 1 KB at equal quality.
- Levers already pulled:
  - GSAP after first paint; boot split into short tasks.
  - Fonts 130 → 86 KB, and the preload switched to the italic actually used above the fold.
  - About 1,000 nodes moved out of the DOM (ply SVGs as files).
  - The work-title photo loads only near its section; below-fold geometry is in the critical CSS, so lazy images don't start early.
- What's left belongs to Run F: a real-device check, a smaller mobile-specific hero crop, or a tiny inline placeholder.

## A2: relight verdict

- **S1 hero:** no relight. There is no depth map for H1, and an invented one would read gimmicky. It ships the graded still with the real-sun lamp sweep, plus the night plate after sunset (the plan's production fallback).
- **S3 lamp:** the WebGL relight looks photographic on the F9 macro (raking light lifting the torn tab and the loose granules; frame checks earlier in the run and again with `?gl=force` on the final build). It ships on real GPUs.
- This VM only has SwiftShader, which passes `failIfMajorPerformanceCaveat` and renders at about 600 ms a frame; it stalled scrolling. The renderer now refuses software GL and hands back to the CSS lamp if the watchdog trips, so in this VM the CSS lamp is what runs.

## A3: NWS SAME codes

- Run A: the live `/zones?type=county&area=OH` confirmed OHC017 Butler, OHC057 Greene, OHC113 Montgomery and OHC165 Warren. There were 0 active Ohio alerts, and none of the recent ones named our counties.
- Final pass (live API again):
  - 28 recent Ohio alerts carrying 57 distinct Ohio SAME codes.
  - All 177 SAME entries map to the county zone of the same name (`039` + county FIPS ↔ `OHC` + the same digits).
  - So `039017`, `039057`, `039113` and `039165` are verified by the API's own convention, and the filter also matches the live-verified UGC codes.
- No live alert has yet named these four, so the end-to-end banner was only seen through `?nws=test`.
- Behaviour: the banner is armed for Severe Thunderstorm Warning, Tornado Warning, or a hail warning. The request has a 3 s abort and a 10-minute sessionStorage cache, and fails silently.

## A4: inventions log

Facts from the client pack (`../rembrandt-pack.md`) are not inventions:
- Bunk and Wade Walker, and Rachel's role.
- The two U.S. Army veterans and the project managers' 20 to 25 years.
- The Gary Sinise / John Kremer roof; the 100 Roofs Challenge ($1,000 to ten charities).
- 38 N Pioneer Blvd, 19 hail days, April to July hail season.
- The written line-item estimate, progress photos and final walkthrough.
- Total Protection Roofing System, the 50-year non-prorated warranty and lifetime workmanship.
- $2M liability, in-house financing, and the military / veteran / first-responder discount (no percentage).
- Se habla español, and the dedicated repair crew.

The identity anchors are unchanged. Everything below was invented under A4:

1. **Office closures:** 1 Jan, 25 May, 4 Jul, 7 Sep, 26 and 27 Nov, 24 and 25 Dec. The floating holidays are hard-coded as their 2026 dates.
2. **Call-back promise:** send before 4 pm on an open weekday and "Rachel will call you today by 5 pm"; otherwise the next opening is named. The form's call-back windows are morning, around midday and afternoon; I changed "evening" to keep it inside Mon to Fri 9 to 5.
3. **"How soon can you come out?":** "Usually within a few business days. Call before 4 pm on a weekday and we'll set a time the same day." The claim steps say: "Book a free inspection, usually within a few days, sooner after a big storm."
4. **Install day:**
   - materials arrive the day before or that morning;
   - shrubs and beds are covered, with plywood where trucks or ladders meet the driveway;
   - tear-off goes down to the boards, and the roof is dried in the same day;
   - a magnet sweep of lawn, beds and driveway;
   - the walkthrough happens with the progress photos before sign-off.
5. **Duration:** "Most homes are one day, two for large or steep roofs." "Do I need to be home? Not for the work", only for the walkthrough.
6. **Decking:** "The only thing that can change once the old roof is off is soft decking … priced per sheet in your written estimate before we start." No price is given.
7. **Estimate paper line items:**
   - Owens Corning WeatherLock (ice and water), ProArmor (underlayment), Starter Strip Plus, TruDefinition Duration, VentSure and ProEdge.
   - These are real OC system components, but not confirmed as Rembrandt's specification.
   - Also invented: the "Measured on site" label, "Every soft board photographed and listed", and "Eaves, walls, chimney, pipe boots".
8. **Warranty wording:**
   - Workmanship cover starts at the walkthrough sign-off and lasts as long as you own the home; a faulty install is fixed at no cost.
   - Material cover comes from Owens Corning on a full system "registered by us".
   - Exclusions: storms after the job, other trades' work on the roof, ordinary wear such as moss.
9. **Inspection practice:**
   - "Walk every slope in low light", and "inspect at an angle".
   - "Every bruise, crack and lifted tab goes in the condition report you keep."
   - "Meet the adjuster on the roof with our photos, if you want us there."
10. **FAQ:** all eight answers are invented office answers, now signed "Answered by the Rembrandt office". The plan's §11 question 17 proposed "Answered by Rachel, office". I dropped it because the pack forbids putting words in a real person's mouth.
11. **Reviews aggregate** is stamped "as of October 2026".
12. **Captions:**
    - Job photos are generalised to "Greater Dayton"; no town names were invented.
    - The team photo says "outside the Springboro office", which is assumed from the sign on the building.
    - The S7 signature is drawn by us and labelled "(Illustration.)".
13. **Storm narrative** "One night in May" is an illustrative scenario. No named NOAA storms were used (S10 V2 isn't built).
14. **Form:** the no-JS fallback action is `mailto:estimates@rembrandtroofing.example`, a placeholder on the reserved `.example` domain, never a real inbox. The reference format is `RR-` plus 6 characters.

Deliberately **not** invented: team names beyond the pack, review quotes, a licence number, financing terms, the discount percentage, and project counts.

## Other amendments

- **A5:** done (see Run C).
- **A6:** for Run F (the 375 px release test on every stage). Calm screenshots were already reviewed in this run.
- **A7:** the proof line is one line from 360 to 1440 px (measured). Below 1024 px it shows "4.9 on Google ↗ · BBB A+ ↗ · OC Platinum ↗"; the full wording stays as visually hidden text for screen readers.
- **A8:** the cursor ring is subtle and hidden over text and the phone number; the system cursor stays visible.

## Asset decisions and licences

- Stock is never captioned as Rembrandt work. "Every photo here is our work" covers only the owner's photos.
- Credits sit in the footer, and the manifest is `assets-stock/MANIFEST.md`. Pexels: H1, C2, S5-1, S6-3. Commons, CC BY-SA:
  - F9, 3.0: the graded crop is shared under the same licence.
  - S6 steps 1, 2 and 4, 4.0: same licence.
- **To clear before production:**
  - The S2-2 ceiling stain: no licence stated, possibly AI-assisted. Credited as "portfolio placeholder, licence to be cleared".
  - The owner photos: regraded per the plan (S8 "regrade only"), while the pack says to embed them byte-exact. Owner to confirm.
- **Logo:** the header and footer use a typeset Mona Sans wordmark. §11 question 12 was open, and the real mark was never redrawn. If the owner wants the real mark, place the exact `logo.png` bytes at ≤ 200 px (pack Rule #1).

## Deviations from the plan

1. **Libraries:** no ScrollTrigger, SplitText, MorphSVG or DrawSVG. We use our own conductor and line splitter, with GSAP core only. As a result, the stain-to-lamp carrier is a fade rather than a morph, and the close's magnetic pull is simplified.
2. **Cast shadows:** a translate along the sun vector with no skew (the plan's skew misbehaved on multi-line text), drawn with `::before`. The compositor-path shadows were not built.
3. **App JS** is a deferred classic script, not a module; `lamp.js` is the only module (dynamic import).
4. **Font subset** is tighter than "subset Latin": accented letters typed into the form fall back glyph by glyph. Newsreader's opsz is pinned.
5. **S4 depth plates** are SVG plies in CSS 3D, shipped as separate files. The paper uses tooth tiles. ba2 is a two-angle pair.
6. **Lamp hardening:** refusing software GL, and falling back to the CSS lamp after the DPR ladder, go beyond §3.13.
7. **Moved from Run D:** S6 to S15 defaults were built in this run.
8. **Not applicable here:** storm mode (§3.12: chip, banner state and `?storm=1`) needs the switcher and was left for Run D; page transitions need inner pages.
9. **Copy changes:** the FAQ signature, the call-back window, the A7 short labels, two shortened layer captions ("Metal edges that steer water past the fascia", "Lets the attic breathe, capped against rain"), and the pause button hidden in calm and no-JS.

## Fixes made in the final QA pass

**Accessibility and markup**
- **Accessibility:** no `aria-label` on `<p>`; the wordmark's accessible name now matches its visible text; the drawer is a dialog; the photo groups have a role; both contact bars are `<nav>` landmarks.
- **Markup:** removed a duplicated `type` attribute.

**Performance**
- GSAP loads after first paint, and boot runs as short tasks with the estimate engine in the core.
- Fonts were subset and the preload corrected.
- The work-title photo loads lazily, and below-fold geometry is in the critical CSS.
- The ply SVGs are external files.
- Per-frame rect reads are batched.

**Layout**
- The header no longer clips at 360 px.
- Layer tags no longer overlap.
- On phones, the storm line clears the bottom bar and the pause button moved under the time label.

**Behaviour and copy**
- The honesty line's underline no longer drags a word across a line break.
- The WebGL stall on software GL is fixed.
- Photos are capped at 400 KB.
- The proof line meets A7.

**Outage repair:** `site/css/site.css` was truncated to 0 bytes. It was regenerated from `site/src/site.css` by `build.mjs` (29,068 bytes), and every file in `site/` was checked to be non-empty.

## Left for Runs D to F

**Run D**
- The `?v=` switcher and every V2/V3 version.
- Storm mode.
- A refresh after each switch, so nothing jumps.

**Run E**
- The §6 inner pages and the shingle-course transitions.

**Run F**
- The plan's QA list, plus A6's 375 px stage release test.
- Real-device Lighthouse to settle mobile LCP.
- INP measurement.
- Scroll long tasks at 4× CPU: the conductor and GSAP work, plus `content-visibility` first renders.
- A manual pass over the axe "needs review" contrast nodes.
- Keyboard and screen-reader passes; slow 3G.
- The W3C Nu validator.
- A live NWS warning seen end to end on an open network.

**Production**
- A real form endpoint, replacing the stub and the `.example` mailto.
- Clearing the licences above.
- The logo decision.
- Holidays computed per year.
- Owner answers to §11, to replace the inventions above.

**A1:** the merged standalone homepage HTML for Asiful was not produced in this run. `site/` is 17 MB across all image variants, so a single file needs a reduced, one-variant asset set.

## Environment notes (for the next run)

- **/tmp is not safe.** VM restarts wiped it twice:
  - Lost: the graded masters (`/tmp/rv4/masters`), the source font TTFs, and earlier Lighthouse JSONs.
  - The grading jobs are now kept in `_tools/jobs-runA.json`, with masters pointed at `_masters/` (not regenerated).
  - Re-download the Mona Sans and Newsreader variable TTFs before re-running `_tools/fonts.py`.
- **SwiftShader WebGL passes `failIfMajorPerformanceCaveat` in this VM.** Don't judge GPU work here without `?gl=force`, and don't trust "it ran" as "it's fast".
- **The headless browser here cannot reach api.weather.gov**, though curl can. That accounts for every Best Practices 96.
