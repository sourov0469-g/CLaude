# S0095 · design-taste-frontend v2: Skill Pack Notes
All 5,157 lines read; scripts not run.

## 1. The run
1. **Brief and inventory.** List what is real, especially what imagery exists. Write 8–12 things only this client has: name and meaning, street (tiles, paint, light), numbers, constraint, materials, rituals, printed things.
2. **Argument.** Write one claim per section with its proof (`It takes six weeks → the stages, photographed`). Delete claimless sections. The argument's order is the page order. No stock order.
3. **Direction.** Deal 3; pick the one that carries an inventory item. Adopt it, don't blend.
4. **Idea.** "On this page, **[subject thing]** becomes **[device]**." **Competitor test**: if it still works with the nearest rival's name, it is a category idea. Add **one live thing**: real content, thumb-usable, no-JS fallback, never blocks reading, *one thing, not a playground*. Scenes show the subject's own things, or they become a screensaver.
5. **Words** (§7), then **build still**: tokens → hero → sections (neighbours differ; the idea reaches pricing, FAQ, footer) → imagery → live thing → scenes → fullness → frame → states.
6. **Gate** at 0 FAIL at 1440, 768 and 390. A WARN stands only with a one-sentence defence. **Look**: critique screenshots only, at most 3 rounds. **Move** last. **Report**: direction, idea, live thing, scores, credits, stand-in drawings, sample content.

**Applies here:** Miami inventory candidates (verify): firm name, neighbourhoods, terrazzo, coral keystone, HVHZ hurricane code, humidity, the wall assembly behind tile. Example idea: "the wall behind the tile becomes the exploded drawing the page opens with". Conflict: a 1·2·3 switch on *every* section reads as a playground. Make ONE live thing (before/after or the material explode) and keep the switch a quiet secondary control.

## 2. Anti-default catalogue (inspector FAILs)
- Headlines ≤2 lines at every width. One `h1` saying what this is; every section headed.
- No **eyebrows**, pill badges or "New ·" chips. No **mono** outside code. No **index numbering** (01/02/03, (001), "Step 2").
- No **thin rules**: no hairlines, 1px boxes, grid lines, crosshairs, crop marks, dashed guides or rulers. No **gradients**; a neutral photo scrim is the one exception.
- No shadows at rest, no glows (shadows only on menus and dialogs). No cream (hue 22–62) + terracotta; no violet or indigo.
- No tiny tracked caps, icon-topped or identical card rows, **glass** (backdrop blur, floating pill nav), emoji, blobs, decorative shapes or fake grey-bar dashboards.
- No styled accent word. **Two typefaces** at most.
- **Statements** are `<p>`/`<blockquote>`: ≤36px desktop, 32 tablet, 24 phone; ~25 words, 3 lines.
- Copy tells: unlock, elevate, seamless, robust, cutting-edge; "Get started", "Learn more"; tricolons; "not just X"; furniture text ("Est.", coordinates, "Scroll to explore", middle-dot strings); em-dash habit.
- Motion tells: identical fade-ups, hover lift on every card, bounce, meaningless loops, reveals that never fire.
- Fill removed ornament with scale, content, pictures or colour, never another ornament.

**Applies here:** The "1·2·3" or "01" legends hit the index-numbering and middle-dot bans. Build a real segmented control (`radiogroup` or tabs) whose accessible names name the versions, never a section marker. No mono HUD on instruments, no glass nav, no glowing cursor. Drawing lines must belong to the drawn object, never page ornament (no decorative crosshairs, rulers or crop marks).

## 3. Hero, layout, sections
- `--margin: clamp(1rem,2.2vw,2rem)` (16–32px, never <16); `--gutter: clamp(.75rem,1.4vw,1.5rem)`; 12-column `repeat(12,minmax(0,1fr))`. No reflexive 1200px container; cap at 1760–1920px. Margins equal at every width, nav on them.
- 2–3 left anchor lines (a third across, 42%, midpoint). Centre one moment per page.
- Section gaps 120–240px desktop (median 230–250), 72–112 phone. More than 40% of a screen of plain ground is a hole. Heading space above ≥2× below. Every void is closed by something on its far side. No half-empty sections, no stretch over half a screen holding nothing, one rest per page. An empty block ≥28% of the first screen WARNs.
- **Hero:** h1 ≥32px desktop (50–150 typical), ≤2 lines. A name h1 gets an ≥18px line saying what it is. Support line 32–48px below; one button. Hero media ≥ half the screen on 68% of top sites; a centred statement over a screenshot is the weak-site signature.
- Neighbouring sections never share a layout; alternate dense/empty, light/dark; break the system once. Section headings median 57px (40–96).
- **Nav:** wordmark, 3–5 single-noun links, one action, no bar or background, ≤1/10 of the first screen, never over content. **Ending:** the name at full width, the hero inverted, or a contact fact as headline. No link-column footer.
- **Phone:** own composition; margins 16–20, body 16–18, touch ≥44px.
- **Buttons:** flat, one fill; square or pill, decided once (9–16px radius = weak default).

**Applies here:** Hero = the self-drawing exploded wall or plan at ≥ half the screen, a plain h1 of ≤32 characters ("Miami kitchen & bath remodeling"), one button ("Book a visit"). Parallax layers and bleeds start from the margin and keep both margins equal.

## 4. Typography and colour
- **Scale (≤5):** `--step-small clamp(.8125rem,.79rem+.1vw,.875rem)`; `--step-body clamp(1.0625rem,1rem+.25vw,1.1875rem)`; `--step-lead clamp(1.25rem,1.1rem+.7vw,1.625rem)`; `--step-head clamp(2rem,1.3rem+3.2vw,4rem)`; `--step-display clamp(3rem,1rem+9vw,9rem)`. Display ≥4× body. Largest type: top 8.4vw, weak 5.0vw.
- **Display:** `line-height:.95` (.85–1.05), `letter-spacing:-.035em` (-.02 to -.05, per step), `text-wrap:balance`, `max-width:14ch`, optical `margin-left:-.05em`. Caps 0 to +.03em. No text-shadow, stroke or gradient. 48% of heroes are regular weight.
- **Text:** `line-height:1.5`, `p{max-width:62ch;text-wrap:pretty}`, `.lead{line-height:1.35;max-width:40ch}`. Measure 45–75ch. Nothing <13px. Secondary text is `--muted` in the same face. `::selection` in the accent; `:focus-visible` in the accent; tabular-nums.
- **Colour roles** `--bg --surface --ink --muted --accent --accent-ink --field-n`, no stray greys or hex. Ground 70–90%. Accent <5% per screen (action + one thing), never headings. Surface 2–6 lightness points off the ground. Field `border:0`, focus `outline:2px solid var(--accent);outline-offset:2px`. Colour fields meet hard, each with its own ink, and neighbours differ in *lightness*. Chapters: open strong, rest, surprise, close dark.
- **Contrast** body 4.5, display 3, ink on ground 7:1. Hover and focus raise it. Dark: `color-scheme:dark`, tinted ground. Warmth from stone or putty grounds (saturation <15%), green, brown or oxblood ink, or a flat warm field.

**Applies here:** Take proportions and colours from terrazzo, keystone, tile glaze and Biscayne light. Avoid cream + terracotta. The single accent goes only on the action and each drawing's lit part.

## 5. Motion and interaction (cursor, magnetic, hover, scroll)
- **Budget:** FAIL below 8 moving elements, WARN below 16. 2–3 scroll scenes, **one** signature move, per-section entrances (heading → text → picture, stagger 60–90ms, rise 16–32px, once, manner varied), feedback on every control, **one** moving picture.
- **Tokens:** `--ease-out cubic-bezier(.22,1,.36,1)` (<600ms); `--ease-expo cubic-bezier(.16,1,.3,1)` (≥800ms); `--ease-in-out cubic-bezier(.76,0,.24,1)` (wipes, travel); `--ease-soft cubic-bezier(.33,1,.68,1)` (photo drift); `--ease-exit cubic-bezier(.55,.055,.675,.19)`. `--t-press 140ms`, `--t-hover 180ms`, `--t-ui 240ms`, `--t-reveal 800ms`, `--t-open 1200ms`, `--stagger-line 90ms`, `--stagger-item 70ms`. No ease-in or overshoot on UI. Exits take 60–70% of the entrance. Scroll-linked motion and loops are linear.
- **Rules:** the first screen sits in the HTML, settled by **1.2s**, ≤4 elements. **No preloader, counter, gate, wheel capture or custom cursor.** Reveals once at 85–90%. Nothing in view hidden >900ms; nothing above the fold waits for scroll. Staggers: lines 80–110, items 50–90, characters 20–40 (headings of 1–3 words only), ≤4 steps. Hidden states sit behind `html.js` + `prefers-reduced-motion:no-preference`. Animate only transform, opacity and clip-path.
- **Scroll:** Lenis lerp .1–.14 via `Stage.smooth()`, off for touch and reduced. gsap@3.15.0 + ScrollTrigger + lenis@1.3.26, pinned. A scene is a sticky stage in a (hold+1)-screen section, scrubbed 0→1, held 1–4 screens, readable at 0, with a quiet section between scenes and a designed finished composition for phone, reduced and no-JS. Other sticky stages: ≤3 screens, ~1 per step, text on every held screen, a plain count ("2 of 4").
- **Parallax:** travel <8% of the element. Pictures at 106–110% in their frames, oversized only by the travel. Scale .94–1.15. CSS drift `translateY(-4%)→4%` on a `view()` timeline inside `@supports`. Use `overflow:clip`; `hidden` kills `view()`.
- **Text:** masked line rise `translateY(105%)`, 800–900ms expo, `.line{overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}`, split after `document.fonts.ready`. **Ink fill** once per page, 3–5 lines, ≥32px, from 45% ink, range `cover 20%`→`cover 45%`. Pushed line `translateX 12%→-12%`. Rolling digits 1100ms expo. Dims ≥40%, blur ≤8px for 600ms. Nothing moves across text being read. No scramble or typewriter.
- **Hover/press:** `.button:active{transform:scale(.97)}`. Hovers go behind `(hover:hover) and (pointer:fine)`, raise contrast, never change weight, no lift or scale on every card. Moving hovers 300–400ms. Menus open from the trigger at .95–.98 scale.
- **Cursor:** 28/99 SOTD use them (followers, trails, lenses). **House: the system cursor, labels on the page.** Cursor previews are the "gimmick version". The skill doesn't mention magnetic buttons, but overshoot and spring on UI are banned.

**Applies here (conflicts):** (a) The requested **custom cursor** breaks a rule. If kept: `pointer:fine` only, never hiding the system cursor on text or controls, no trails or lens, off under reduced motion, reported as a deviation. (b) **Magnetic** pull of a few px at most, ease-out return, no overshoot. (c) Parallax travel <8%. (d) The **Three.js room** is drag-only with `touch-action:pan-y`, never captures the wheel, has a still for reduced and no-WebGL, and doesn't count as a picture. 3D gallery = lowest placement (7.30). (e) **Self-drawing plans** run once, 1100–1300ms expo; the reduced state is the finished drawing.

## 6. Imagery
- **Floor:** ≥4 real pictures, usually 6–12. SVG drawings don't count. Plus one moving picture: muted loop 5–15s, ≤10MB hero or ≤5MB inline, poster, plays only in view, never under reduced motion.
- **Order:** own > generated > open collections (credited, never the client's own) > drawn in code > stock > type alone.
- **Placement:** about 1/3 of the page is picture. A leading picture ≥60% of its screen, an accent <10%. 3–5 placement kinds, neighbours differ. Splits: 42–50% (or 2/3) width at full height, touching the edge, text on the 50% line. Full-bleed bands 100–150vh, one per 3–4 screens, text ≥32px in from a corner. One inset frame per page grows from 35–50% to full over 720–2700px. Held picture: 100vh sticky stage, 2–6 screens of runway, inactive captions .4. Galleries: 3 cards plus a cut fourth. Best: cut-out on a flat field (7.57), held picture (7.52).
- **Treatment:** two ratios cover ≥75% (4:5, 16:9 or 3:2). Square corners (94%). `object-fit:cover` with `object-position` per image. No frames or mockups. One treatment per page (untouched, `grayscale(1) contrast(1.05)`, multiply, or `brightness(.85) contrast(1.05)`). No duotone, grain or vignette. Photo scrim: 40–55% black, or a 55%→0 fade over the lower third. Only display text, one line and one action on pictures.
- **Drawings:** the subject's own things in one graphic language: flat fills, one stroke weight, palette colours at full strength. **3 levels of detail.** Light from flat tone steps (lit face and shaded face). Draw large; the motif returns at other scales. Banned: gradient blobs, **isometric clip art**. Add a "drawn until photographs exist" line.
- **Markup:** `width`/`height`; lazy except the hero (`fetchpriority="high"`); footer credits.

**Applies here:** Before/after pairs must be **Elbaz's own photos**. If none exist, report it; never fake them. Credited archival Miami pictures can set the place. The isometric SVGs need S0526-level craft to escape the clip-art ban.

## 7. Copy
- Headline ≤~32 characters (4–6 words). Characters per line ≈ width ÷ (size × k), with k .40 condensed, .50 grotesk or serif, .58 wide or caps. Author breaks, no orphans, section headings 2–5 words. 
- Supporting line ≤22 words. Buttons 1–3 words naming the action; the primary keeps one name everywhere. A second action is a text link.
- Full content. **Never invent proof**: no reviews, "500+ kitchens", logos or years. Samples are listed in the report.

**Applies here:** primary "Book a visit" everywhere; no invented licence numbers, stars or project counts.

## 8. Final checks
- **14 passes:** 1s/5s; squint; cover the logo (competitor, idea reaches footer); 2–3 edges; frame and space; type (≥3× jump, ≤5 sizes); colour proportions; ≥4 real pictures + 1 moving; one layout word per section, no repeats; phone; fullness; substance; collisions; competitor + live thing.
- **Score** = .4·design + .3·usability + .2·creativity + .1·content (SOTD ≈7.5–8).
- **Caps:** any FAIL → 6.0. Eyebrow, mono, 01/02, gradient, resting shadow or hairline → 6.5. Fewer than 4 real pictures, two empty screens or a lopsided frame → design 6.5. A still page or identical fades → design 7. No live thing → creativity 7.5; a competitor-proof idea that fails → 7. An unfired reveal → usability 5; no first-screen button → 7.
- **Fix order:** idea → hierarchy → composition → type → imagery → colour → detail → motion. Log as `ROUND n / Seen / Idea / Live thing / Layout words / Scores / Caps / Top three`.

**Applies here:** shoot 1440/768/390 with each switch version, plans finished, room still.
