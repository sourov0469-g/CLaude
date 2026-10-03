# Idea log: what was considered, built or dropped

Legend: **BUILT** shipped on the site, **PROTOTYPED** tried visually then decided on, **DROPPED** considered and rejected (reason given), **LATER** good but not now.

The organising idea that survived: **the survey layers**. An aerial survey turns one place into layers (photograph, orthomosaic map, 3D model). Revealing those layers on real photographs is what UAV Aerial Solutions actually delivers, so it is honest, specific to the business, and not decoration.

## 1. Layers of the same photograph
- Edge-detected "blueprint" render (Canny lines in copper on dark). PROTOTYPED, DROPPED: too dense and noisy, looks like a filter.
- Low-poly Delaunay mesh coloured from the photo, thin edges, vertex points. PROTOTYPED, **BUILT** (reads as a photogrammetry mesh, ties to the 3D modelling service).
- Stitched-tile orthomosaic look (desaturated, tile seams, per-tile exposure drift). PROTOTYPED, **BUILT**.
- Thermal / heat-map look. DROPPED: implies a thermal survey we do not offer.
- Depth-map parallax from a generated depth map. DROPPED: fakes 3D we cannot back up, artefacts on roofs.
- Contour isolines traced from the photo's luminance (topographic look). PROTOTYPED, **BUILT** (statement band, page heroes, call-to-action bands). Decorative only, never labelled as elevation.
- Point-cloud scatter render. DROPPED: reads as noise at web sizes.
- Wireframe-only render over transparent. DROPPED: weak against light photos.
- Before/after slider: photograph vs mesh render of the same view (3D page). **BUILT**, replaces a hand-drawn SVG mesh.
- Slider demonstrates itself once on arrival, then is the visitor's. **BUILT**.
- Layer toggle control on the hero (Photo / Model). **BUILT** (touch-friendly, keyboard operable).
- Layer reveal window that follows the pointer on service-page photos. **BUILT** (roof: model, RTK: ortho).
- Hero reticle carries the model window by itself, even when nobody touches anything. **BUILT**.
- Capture click floods the frame with the model, then settles. **BUILT**.
- Normal-map "relief" lighting following the cursor. DROPPED: needs real elevation data.
- Segmentation overlay (roof areas coloured). DROPPED: would imply automated analysis.
- Measurement tool (click two points, show distance). DROPPED: cannot give true scale from a stock photo.
- Pinch-zoom/pan orthomosaic viewer. LATER: valuable once real client deliverables can be shown.

## 2. Story / scroll
- Hand-drawn SVG polygon, flight lines, little tiles (first version). PROTOTYPED, DROPPED: reads as gimmicky, nothing real in it.
- One real site photograph that zooms into an area of interest, shows a coverage pass, then sweeps into imagery | map | model. **BUILT** (scroll-scrubbed, sticky, works on phones).
- Pinned scroll section. DROPPED: went blank under wheel scrolling; replaced by native sticky.
- Scroll-scrubbed word reveal for the statement. **BUILT**.
- Coverage grid whose cells light as the drone passes. **BUILT**.
- Scan line that converts photo to layers left to right. **BUILT**.
- Image-sequence from video. DROPPED: no footage supplied, would need generated video.
- Three.js world / globe of Cheshire. DROPPED: weight and failure modes for little meaning.
- Horizontal scroll gallery. DROPPED: fights vertical reading on phones.
- Sticky card stack for services. DROPPED in favour of expanding panels (more tactile).
- Chapter navigation dots. DROPPED: rail drone already shows position.
- Parallax depth on every image. DROPPED: only where it carries meaning (experience frame, hero frame).

## 3. Hero
- Roof-gable clip-path cutout. DROPPED: roofing motif, reusable template concern.
- Chamfered viewfinder window with brackets, thirds grid, focus reticle. **BUILT**.
- Focus box hunting between points and locking. **BUILT**.
- Drone companion following the cursor, patrolling when idle. **BUILT**.
- Capture counter with flash and shutter ring. **BUILT**.
- Full-bleed video background. DROPPED: no footage, weight on mobile.
- Giant type with cursor-revealed image inside letters. DROPPED: hurts legibility.
- Telemetry HUD (altitude, battery, coordinates). DROPPED: invented numbers read as fake data.
- Cursor-reactive tilt of the frame. DROPPED: image parallax inside the frame is calmer.
- Device-orientation tilt on phones. DROPPED: iOS permission prompt, motion sickness risk.

## 4. Services
- Expanding panels (hover/focus opens one). **BUILT** (desktop), swipe deck with dots (phone), 2-col grid (tablet).
- "Which service do I need?" chooser: pick the question, see the output. **BUILT** (replaces a table, accessible tabs).
- Compare table. DROPPED as the primary UI (kept as data behind the chooser).
- Mega-menu image previews. DROPPED: image-uniqueness rule, little gain.
- Service icon draw-on hover. **BUILT**.
- Price estimator. DROPPED: no pricing on the real site, not ours to invent.

## 5. Cursor and pointer
- Ring cursor with states (link, label disc, text caret, hidden over viewfinder). **BUILT**.
- Pointer trail laid by distance. BUILT then reduced to a whisper (64 motes, no idle puffs).
- Magnetic buttons, card tilt, spotlight. **BUILT**.
- Section aura (soft copper light and wash following the pointer). **BUILT**.
- Triangulation field in call-to-action bands: survey points joined into a mesh, pointer lights edges. **BUILT**.
- Full-screen fluid / shader ripples. DROPPED: heavy, generic.
- Cursor "capture" sound. DROPPED: audio on a business site.
- Custom cursor on touch. DROPPED: none exists on touch.

## 6. Layered SVG and ambient motion
- Sparse background scenes per service (scan band + survey crosses, perspective grid + control points, triangulated lattice + cube, time rings, thirds grid + focus ring). **BUILT**, deliberately quiet.
- Home hero background: contours, flight path, markers, rings. PROTOTYPED, DROPPED: cluttered; now paper, faint dot grid, soft glow.
- Marquee of services, speeds up with scroll velocity. **BUILT**.
- Atmosphere light folds on dark bands. **BUILT**.
- Scroll rail with a drone riding a ruler, back-to-top. **BUILT**.
- Drone on a timeline rail (process and workflow steps). **BUILT**.
- Falling leaves / wind particles. DROPPED: off-brand.
- Floating clouds parallax. DROPPED: stock-illustration feel.
- Lost-signal drone on the 404 page. **BUILT**.

## 7. Interaction details
- Arrow glyph replaced by a fresh copy on hover. **BUILT**.
- Ghost buttons: viewfinder corners lock on. **BUILT**.
- Primary buttons: one light sheen. **BUILT**.
- Kicker rules and section seams draw in. **BUILT**.
- Counters in the credential strip. **BUILT**.
- Camera-iris page transition on the single-file edition. **BUILT**.
- Contact: flight-plan meter that fills as the brief takes shape; drone takes off when the enquiry is ready. **BUILT**.
- Timelapse play button on the monitoring stages. **BUILT**.
- Rule-of-thirds grid on the photography hero. **BUILT**.
- Image wipe-in with settle zoom below the fold. **BUILT**.
- Confetti on form success. DROPPED: wrong tone for a commercial survey firm.
- Dark-mode toggle. LATER.
- Live chat widget. DROPPED: third-party requests and cookies contradict the privacy page.

## 8. Mobile-first decisions
- Story scrub works on phones with tabs instead of a side column. **BUILT**.
- Services swipe deck. **BUILT**.
- Hero Photo/Model toggle instead of hover. **BUILT**.
- Responsive image sources (720px and full) on the deployable site. **BUILT**.
- Heavy canvases pause offscreen and when the tab is hidden; reduced motion gets stills. **BUILT**.
- Smooth-scroll library disabled on touch (native momentum). **BUILT** (it only wraps wheel input).

## 9. Added after launch review
- Hero inset photo moved off the control bar (it covered Photo/Model on desktop and tablet) and made non-interactive. **BUILT**.
- Hero control bar reflows between 1024 and 1399px and on phones so nothing overlaps. **BUILT**.
- "Mark a survey area" on the Services hero photograph: click, tap or drag outlines an area, survey points drop at the corners, flight lines are drawn and a drone flies them. Keyboard/touch path through a real button. Illustrative only, no numbers beyond the line count it draws. **BUILT**.
