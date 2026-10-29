# G5 direction and anti-slop notes (Rembrandt v5)

Source: /root/.claude/uploads/43c9e22a-5230-526e-a737-ae81faad601a/5682dcd4-WEB-SKILLS_2.md. Reading material only: nothing installed, run, registered or saved. Quotes are verbatim except that em dash and en dash characters inside quoted source text are written as "[em dash]" or a plain hyphen, because these notes must contain no em dashes.

---

## S0001 frontend-design

Stance: "the design lead at a design studio known for giving every client a distinct visual identity". "This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view" (exactly Rembrandt's situation after v4).

Ground in subject. "The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from." Build with the brief's real content throughout.

Hero. "Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment". Default to avoid: "a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option."

Typography. One family or two; "if two, make them clearly distinct". Choose typefaces "not the default families you would reach for on any other project"; type scale per The Elements of Typographic Style; type is "an active part of the design, not a neutral delivery vehicle". Line length "less than 80 characters"; serif body gets slightly more line-height than sans.

Banned typographic defaults ("the commonest tells of a generated page"):
- "Accenting just a single word or phrase in a headline, like putting one word in italic/bold or a different color."
- "Using all caps for labels."
- "Adding unnecessary typographic labels above content."

Structure is information. Outlines, borders, numbering, eyebrows, dividers, labels must encode information. Numbered markers (01 / 02 / 03) "only appropriate if the content actually is a sequence".

Motion. "Use non-user-triggered motion sparingly and deliberately, only to draw attention. A single orchestrated moment [em dash] one page-load sequence or one reveal [em dash] lands better than scattered effects; fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated. Motion that answers a person's action (opening, expanding, confirming) is welcome when it shows what changed."

AI calibration cluster (five traits that are "defaults rather than choices"):
1. "a warm cream background (near #F4F1EA) with a high-contrast serif display and a terracotta or warm-clay accent (often near #D97757 ...)"
2. "a near-black background with a single bright acid-green or vermilion accent"
3. "a broadsheet-style layout with hairline rules, zero border-radius, and dense newspaper-like columns"
4. "the SaaS-card kit": identical rounded cards, one radius on everything, "the same soft grey shadow (rgba(0,0,0,.1))", gradient washes as decoration
5. "template chrome": "a tracked-out ALL-CAPS eyebrow label above every heading; meta strings joined with middle dots ('A · B · C'); labels built as 'WORD [em dash] fragment' with a spaced em dash; tinted near-black (#0B0B0B, #111) standing in for black; a monospace face for small data labels; a '→' appended to link and button text."
Rule: "the brief's own words always win". Where an axis is free, "don't spend that freedom on one of these defaults."

Process (two passes). Pass 1 plan: Color "4-6 named hex values"; Type faces and roles; Layout "one-sentence prose descriptions and ASCII wireframes", with alignment guidance (left, center, justified); Principles. Then review the plan against the brief: if a part "reads like the generic default you would produce for any similar page (work through a similar prompt to see if you arrive somewhere similar)", revise it and "say what you changed and why". Only then code. Watch CSS specificity collisions (".section" vs ".cta" padding and margin cancelling).

Restraint. "Spend your boldness in one place. Let one element be the memorable thing, keep everything around it quiet and disciplined". Quality floor without announcing it: responsive to mobile, visible keyboard focus, reduced motion respected, accessible, harmonious palette. Screenshot and critique while building. Chanel: "take a look in the mirror and remove one accessory." Keep notes of what was tried.

Writing. Words exist "to make it easier to understand and use". User's language, plain terms, no selling. Active voice. "A CTA says exactly what happens when it is used: 'Save changes,' not 'Submit.'" Same action name through the flow ("Publish" produces "Published"). Errors "don't apologize, and they are never vague". "An empty screen is an invitation to act." Sentence case, plain verbs, no filler, "Let each written element do exactly one job."

---

## S0223 frontend-design (AAS-modified, DFII)

Role: "a frontend designer-engineer, not a layout generator". Goals: avoid generic AI UI, clear aesthetic point of view, "Implement the requested interactions and report what was actually verified".

Core mandate (existing product constraints take precedence):
1. Intentional Aesthetic Direction: "A named, explicit design stance (e.g. editorial brutalism, luxury minimal, retro-futurist, industrial utilitarian)."
2. Technical Correctness: real working code, not mockups.
3. Visual Memorability: a clear anchor; "memorability is a hypothesis until tested with users."
4. Cohesive Restraint: "No random decoration. Every flourish must serve the aesthetic thesis."
"Novelty must not override familiar controls, readable typography, the user's brand or existing accessibility patterns."

DFII (Design Feasibility & Impact Index). "optional, subjective discussion aid with no validated predictive power". Each dimension 1-5:
- Aesthetic Impact: how distinctive and memorable
- Context Fit: suits product, audience, purpose
- Implementation Feasibility: buildable cleanly
- Performance Safety: stays fast and accessible
- Consistency Risk: maintainable across screens and components
Formula: `DFII = (Impact + Fit + Feasibility + Performance) - Consistency Risk`. Range "-1 to +19". "This is not a certification or a release gate."
Interpretation: 12-19 Excellent, "Discuss the tradeoffs"; 8-11 Strong, "Proceed with discipline"; 4-7 Risky, "Reduce scope or effects"; 3 or less Weak, "Rethink aesthetic direction".

Mandatory thinking phase before code:
1. Purpose: what action; persuasive, functional, exploratory or expressive.
2. Tone, one dominant: Brutalist/Raw, Editorial/Magazine, Luxury/Refined, Retro-futuristic, Industrial/Utilitarian, Organic/Natural, Playful/Toy-like, Maximalist/Chaotic, Minimalist/Severe. "Do not blend more than two."
3. Differentiation Anchor: "If this were screenshotted with the logo removed, how would someone recognize it?" It "must be visible in the final UI."

Execution: preserve brand fonts; "1 expressive display font" plus "1 restrained body font"; type used structurally. Color: "Commit to a dominant color story", "Use CSS variables exclusively", one dominant tone, one accent, one neutral system, "Avoid evenly-balanced palettes". Space: break the grid intentionally; asymmetry, overlap, "Negative space OR controlled density"; "White space is a design element". Motion: "Purposeful, Sparse, High-impact"; prefer "One strong entrance sequence" and "A few meaningful hover states"; "Avoid decorative micro-motion spam". Texture when appropriate: grain, gradient meshes, layered translucency, custom borders, "Shadows with narrative intent (not defaults)".

Implementation: clean, modular, "No dead styles", "No unused animations", semantic HTML, accessible by default. HTML/CSS: native features. Animation CSS-first. Complexity matching: maximalist design needs complex code; minimalist needs precise spacing and type; "Mismatch = failure."

Required output: (1) Direction summary: aesthetic name, DFII score, key inspiration "(conceptual, not visual plagiarism)"; (2) System snapshot: fonts with rationale, color variables, spacing rhythm, motion philosophy; (3) full code; (4) Verification: "State which primary action, responsive widths, keyboard/focus behavior, contrast and loading/error states were checked. Include observed results and remaining gaps."

Avoid: replacing established components merely to look unusual; downloading fonts or assets without licensing checks; "Hiding controls, weakening contrast or increasing motion for an aesthetic effect"; calling a screenshot functional without interaction checks.

Operator checklist: direction stated; subjective judgments separated from observed usability checks; one memorable anchor; brand conventions respected; code matches ambition; keyboard, focus, responsive and performance checks recorded.

Questions: who is this for emotionally; trustworthy, exciting, calm or provocative; memorability or clarity; does it scale; "What should users feel in the first 3 seconds?"

Limitations: distinctiveness "does not prove usability or conversion impact"; screenshots cannot verify keyboard order, async, screen reader or network failure; reduced motion and real content lengths can change the design. Worked example demands usability at 390px "without horizontal page scrolling".

---

## S0217 redesign-existing-projects

Sequence: Scan (framework, styling, patterns), Diagnose ("Use the audit as design options, not universal defects. Prioritize evidenced usability/accessibility issues and the user's brand goals"), Fix ("Do not rewrite from scratch"). Limitations: no framework migration or IA rewrite by default; preserve behavior and accessibility semantics; validate in real browsers and viewports.

Typography audit: Inter or browser defaults everywhere, replace with character fonts ("Geist", "Outfit", "Cabinet Grotesk", "Satoshi"; editorial: serif header plus sans body). Headlines: bigger, tighter tracking, reduced line-height, "heavy and intentional". Body "roughly 65 characters". Add Medium 500 and SemiBold 600. `font-variant-numeric: tabular-nums`. Negative tracking on large heads. "All-caps subheaders everywhere" becomes lowercase italics, sentence case or small caps. Orphans: `text-wrap: balance` or `text-wrap: pretty`.

Color and surfaces: no pure `#000000` (use `#0a0a0a`, `#121212` or dark navy); "Keep saturation below 80%"; "More than one accent color. Pick one."; one gray family; the purple/blue AI gradient is "the most common AI design fingerprint"; tint shadows to the background hue; add subtle grain; avoid "standard linear 45-degree fades"; one consistent light direction; no "Random dark sections in a light mode page"; no "Empty, flat sections with no visual depth" (add imagery).

Layout: break centered symmetry; "Three equal card columns as feature row. This is the most generic AI layout."; `min-height: 100dvh` instead of `height: 100vh`; CSS Grid over flex percentage math; container about 1200-1440px; allow variable card heights; vary radius (tighter inner, softer container); overlap via negative margins; bottom padding often slightly larger than top; "Double the spacing"; pin card buttons to the bottom; align shared elements across columns; 1-2px optical adjustments.

Interactivity and states: hover states; press `scale(0.98)` or `translateY(1px)`; "smooth transitions (200-300ms)"; visible focus ring ("not optional"); skeleton loaders not spinners; composed empty states; inline form errors, never `window.alert()`; no `#` dead links; active nav state; `scroll-behavior: smooth`; animate `transform` and `opacity` only.

Content: no "John Doe"; "Use verified values in production ... do not fabricate precise claims to look authentic"; no "Acme Corp", "Nexus", "SmartFlow"; banned AI copy: "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve", "Tapestry", "In the world of..."; no exclamation marks in success messages; no "Oops!" (write "Connection failed. Please try again."); active voice; "Preserve verified publication/update dates"; unique avatar per person; no Lorem Ipsum; sentence case, not Title Case.

Components: generic card (border + shadow + white) only where elevation communicates hierarchy; not always one filled plus one ghost button; no pill "New"/"Beta" badges; accordion FAQ replaced by side-by-side list or inline disclosure; "3-card carousel testimonials with dots" replaced by masonry wall, embedded posts or "a single rotating quote"; no modals for everything; avoid avatar circles only; no sun/moon toggle by reflex; "Footer link farm with 4 columns. Simplify."

Icons: "Lucide or Feather icons exclusively" is the AI default; avoid rocket and shield metaphors; one stroke width; "Always include a branded favicon"; "Stock 'diverse team' photos. Use real team photos, candid shots".

Code quality: semantic landmarks; no inline styles mixed with classes; relative units; alt text, "Never leave alt="" or alt="image" on meaningful images"; z-index scale, not `9999`; remove dead code; check imports exist; `<title>`, description, `og:image` meta.

Strategic omissions: legal links (privacy, terms); back navigation; custom 404; client-side validation; "skip to content" link; cookie consent if jurisdiction requires.

Upgrade techniques: variable font animation; outlined-to-fill text on scroll; text mask reveals; broken grid; whitespace maximization; parallax card stacks; split-screen scroll; motion: "Optional scroll effects. Prefer native scrolling; inertia/parallax must preserve keyboard, touch, anchors and reduced-motion behavior"; staggered entry ("Never mount everything at once"); spring physics; "Scroll-driven reveals. Content entering through expanding masks, wipes, or draw-on SVG paths tied to scroll progress"; true glassmorphism (1px inner border plus inner shadow); spotlight borders; fixed pointer-events-none grain; tinted shadows.

Guard paragraph: honor reduced motion, keyboard/focus order, zoom/reflow, real contrast; "Decorative imagery needs empty alt; meaningful images need useful alt. Do not invent testimonials, people or legal-policy text."

Fix priority: 1 font swap, 2 palette cleanup, 3 hover and active states, 4 layout and spacing, 5 replace generic components, 6 loading/empty/error states, 7 type scale polish. Rules: work with the existing stack; "If the project has no framework, use vanilla CSS"; small reviewable changes.

---

## S0220 anti-slop-design

Persona: "Autonomous Principal Design Technologist". Mindset: act directly on code; "Preserve Interactive Logic"; "Enforce Extreme Restraint: Delete visual clutter before adding styling. If an element does not deliver immediate user utility, remove it."

Banned Matrix (12 tropes and their replacements):
1. "AI Dark Mode" Blob (indigo/purple radial gradients in corners) -> deliberate monochrome surfaces with 1px hairlines.
2. Monotonous Slate/Indigo -> curated semantic tokens with brand personality.
3. Cookie-Cutter 3-Card Grid -> content-driven asymmetric layouts.
4. Raw Emojis as Icons -> single-weight SVG icons, 1.5px or 2px stroke.
5. Fabricated Vanity Stats ("+99.9% Uptime", "10x Faster", "50k+ Users") -> "Real domain telemetry or remove the card entirely. Zero vanity metrics."
6. Screaming Eyebrow Labels -> sentence case or omit.
7. Single-Word Italic/Color Accents -> "Uniform, confident typographic weight."
8. Redundant Metric Duplication -> "Single Source of Metric Truth."
9. Card-Level Filter Pollution -> one page-level control bar.
10. Vanity Visual Space-Wasters ("Giant world maps or 3D blobs that occupy 60% of the screen") -> compact real comparisons.
11. Missing Interactive States -> 8-state system.
12. Broken Placeholders & Links -> verified local assets.

UX axioms. 1-to-3 Rule: "1 Primary Element / Action" and "Max 3 Secondary Logics"; 5+ equal-weight buttons or badges must be grouped. Measured usage: the primary scenario is prominent and zero-click accessible. Ban on duplication: "Exactly one brand mark in the viewport", "Exactly one primary CTA per card or section", one global filter bar. Mobile linearity on desktop: no two complex competing horizontal blocks side by side.

8 Cures: 1 Visual DNA ingestion (5 tokens: Canvas Background, Surface Elevated, Primary Accent, Text Hierarchy, Hairline Border; plus spacing density); 2 bespoke assets, explicit aspect-ratio containers to prevent CLS, alt on all images; 3 contextual assets: "Physical Goods ... The interface must act as an invisible, silent frame. Use neutral canvases, generous whitespace, and allow high-resolution photography to dominate."; 4 typography: max 2 families, tabular numbers, body "65ch to 75ch", heads `-0.02em`, body leading 1.6; hierarchy floor H1 36-48px/700, H2 24-30px/600, H3 18-20px/600, body 14-16px/400, meta 12-13px/500; 5 design variations: pick one of 4 archetypes "while preserving 100% of the underlying business logic" (A Quiet Luxury SaaS `#09090b` canvas, `#1d4ed8` accent; B Technical Dense `#0c0d0e`, `#10b981` plus `#f59e0b`, radii 2/4; C Editorial `#faf8f5`, `#1a1a1a`, Playfair plus Newsreader, radii 0/2; D Warm Tactile `#f4f4f0`, `#d97706`, radii 8/16/24); 6 spacing: 4/8/12/16/24/32/48/64px; `radius_inner = max(0, radius_outer - padding)`; icon optically matched to x-height (16px icon for 14px text), gap 1.5 to 2; 7 de-clutter: remove redundant badges only if a text status remains ("a colored dot alone cannot convey status"), delete explanations under self-explanatory buttons, remove ghost containers around a single input or sentence; 8 scaffolding, including "Conversion Landing Page: Ultra-Crisp Nav (Brand, 3-4 links, 1 CTA) + 50ms Emotional Hero (Offer H1, Sub-offer, 1 primary button, 1 secondary link, dominant visual) + Social Proof Strip + ... + Low-Friction Footer."

8-state system: Default, Hover, Focus-Visible, Active/Press, Disabled, Loading, Error, Success.

Emil Kowalski matrix: actions "100+ times/day": "0ms duration (INSTANT). NEVER animate."; tooltips, dropdowns, popovers "120ms - 180ms"; modals and drawers "200ms - 250ms"; "Never use ease-in for UI"; ease-out `cubic-bezier(0.23, 1, 0.32, 1)`; popovers scale from the trigger point; press `transform: scale(0.97); transition: transform 60ms ease-out;`. Button standard: background 140ms ease-out, transform 80ms ease-out, hover `filter: brightness(1.08)`, focus `outline: 2px solid` with `outline-offset: 2px`, disabled `opacity: 0.5`, reduced motion removes transition and press transform.

5-phase loop: 1 audit and clutter strip; 2 archetype and tokens; 3 macro layout and 1-to-3 hierarchy; 4 component craft and 8 states (labels, autocomplete, focus rings, press scaling, transitions under 200ms); 5 7-axis gate. "Score < 4 on any axis" loops back to Phase 3.

7-Axis Pre-Emit Gate, each scored 1-5, all must be 4 or more:
1. Anti-Slop Purity: zero purple/indigo blobs, zero emoji icons, zero single-word italic headings, zero fake stats.
2. UX Speed & 1-to-3: one primary action per viewport section, max 3 secondary, no duplicated metrics or buttons.
3. Typographic Discipline: max 2 families, tabular nums on metrics, body 75ch or less, sentence-case labels.
4. Spacing & Geometry: 4px/8pt grid, nested radius formula, min 16px card padding, optical centering.
5. Micro-Interactions & Motion: UI transitions under 200ms, 0ms for high-frequency actions, `scale(0.97)` press, no ease-in.
6. Accessibility & Keyboard: visible `:focus-visible`, no `outline: none` without replacement, `aria-label` on icon-only buttons, semantic tags.
7. Mobile & Responsive Linearity: clean stacking, no accidental overflow, "Minimum 44x44px touch targets".

Before/after: landing hero "140px headline split across 4 lines with 1 word bold-italic, 3 buttons, video preloader" becomes "Crisp 44px headline focused on single core offer, 1 primary CTA, 1 demo link, fast initial render", rationale "eliminates bounce rate from sluggish pre-loaders". Data: decorative 3D globe becomes a compact bar comparison.

Final assertion: "Does this interface feel like it was crafted by an elite, disciplined design technologist with extreme respect for the user's attention and time, or does it look like an AI generated it from a prompt? If any element feels like prompt-slop, eliminate it immediately."
Limitations: heuristic, not research; "Aesthetic scores and preferred action counts are subjective heuristics"; validate real contrast, keyboard, screen reader, zoom, reduced motion; announce status "without fabricated telemetry".

---

## S0650 open-design/taste-skill

Scope: "Landing pages, portfolios, and redesigns." "Every rule below is contextual. None of it fires automatically."

### 0. Brief inference
Signals: page kind; vibe words (the brief says "award-winning", "immersive", "fun" which map to "Awwwards"); references; audience ("The audience picks the aesthetic, not your taste"); existing brand assets ("starting material, not optional input"); quiet constraints (trust-first commerce, accessibility) which "OVERRIDE aesthetic preference".
Output before code, one line: "Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."
Ambiguity: ask exactly one question only when the read genuinely diverges; otherwise declare and proceed.
Anti-default: no "AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900."

### 1. Three dials
`DESIGN_VARIANCE` (1 symmetry to 10 artsy chaos), `MOTION_INTENSITY` (1 static to 10 cinematic/physics), `VISUAL_DENSITY` (1 art gallery to 10 cockpit). Baseline `8 / 6 / 4`. Never invent aliases.
Inference table: minimalist/editorial 5-6 / 3-4 / 2-3; premium consumer 7-8 / 5-7 / 3-4; "playful / wild / Dribbble / Awwwards / experimental / agency" 9-10 / 8-10 / 3-4; landing default 7-9 / 6-8 / 3-5; "trust-first / public-sector / regulated / accessibility-critical" 3-4 / 2-3 / 4-5; redesign preserve: match / +1 / match; redesign overhaul: +2 / +2 / match.
Presets: Landing SaaS 7/6/4; Landing agency 9/8/3; Landing premium consumer 7/6/3; Portfolio designer 8/7/3; Portfolio developer 6/5/4; Editorial 6/4/3; Public-sector 3/2/5.

### 2-3. System map and stack (mostly not applicable)
2.A maps briefs to official systems (Fluent, Material, Carbon, Polaris, Atlassian, Primer, GOV.UK, USWDS, Bootstrap 5.3 for "Fast local-business / agency MVP", Radix, shadcn, Tailwind v4). "Honesty rule": use the official package, do not recreate it by hand. "One system per project." 2.B: aesthetics without a package (glass, bento, brutalism, editorial, dark tech, aurora, "Kinetic typography: Native CSS animations, scroll-driven animations, GSAP for hijacks"). 3.A assumes React/Next, Tailwind v4, Motion; fonts self-hosted with `@font-face` + `font-display: swap`, "Never link Google Fonts via <link> in production". 3.B never track continuous pointer or scroll values in render state. 3.C icons: Phosphor, Hugeicons, Radix, Tabler; Lucide discouraged; "NEVER hand-roll SVG icons"; one family; one global strokeWidth. 3.D emoji discouraged. 3.E breakpoints 640/768/1024/1280/1536; container `max-w-[1400px]`; "NEVER use h-screen ... ALWAYS use min-h-[100dvh]"; Grid over flex math.

### 4. Bias corrections
4.1 Type: display default `text-4xl md:text-6xl tracking-tighter leading-none`; body `max-w-[65ch]` relaxed leading. Inter discouraged as default. Serif "very discouraged as the default font for any project"; acceptable only if the brief names a serif OR the family is "genuinely editorial / luxury / publication / manuscript / heritage / vintage AND you can articulate why this specific serif fits this specific brand". "Specifically BANNED as defaults: Fraunces and Instrument_Serif". Serif rotation pool if justified: PP Editorial New, GT Sectra Display, Cardinal Grotesque, Reckless Neue, Tiempos Headline, Recoleta, Cormorant Garamond, Playfair Display, EB Garamond, IvyPresto, Migra, Editorial Old, Saol Display, Söhne Breit Kursiv, Domaine Display, Canela, Schnyder, Tobias, NB Architekt, ITC Galliard. Emphasis rule: same-family italic or bold only, never a random serif word in a sans head. "ITALIC DESCENDER CLEARANCE": with `y g j p q`, use `leading-[1.1]` minimum plus `pb-1`.
4.2 Color: "Max 1 accent color. Saturation < 80%". LILA RULE: no default purple/blue glow. "One palette per project", no warm/cool gray mixing. "COLOR CONSISTENCY LOCK": one accent on the whole page, audited. PREMIUM-CONSUMER PALETTE BAN (artisan, heritage craft, DTC home goods): banned backgrounds `#f5f1ea`, `#f7f5f1`, `#fbf8f1`, `#efeae0`, `#ece6db`, `#faf7f1`, `#e8dfcb`; accents `#b08947`, `#b6553a`, `#9a2436`, `#9c6e2a`, `#bc7c3a`, `#7d5621`; text `#1a1714`, `#1a1814`, `#1b1814`. Rotating alternatives: Cold Luxury, Forest, Black and Tan, Cobalt + Cream, Terracotta + Slate, Olive + Brick + Paper, Pure monochrome + single saturated pop.
4.3 "ANTI-CENTER BIAS": centered hero avoided when `DESIGN_VARIANCE > 4`; use split, left content/right asset, asymmetric whitespace or scroll-pinned.
4.4 Cards only when elevation means hierarchy; tinted shadows; "SHAPE CONSISTENCY LOCK": one radius scale (all-sharp 0, all-soft 12-16px, all-pill) or a documented mixed rule followed everywhere.
4.5 States: skeleton loaders, composed empty states, inline errors, press `-translate-y-[1px]` or `scale-[0.98]`. "BUTTON CONTRAST CHECK": "WCAG AA min (4.5:1 for body, 3:1 for large text 18px+)", including ghost buttons over photos ("use a backdrop, scrim, or stroke"). "CTA BUTTON WRAP BAN": one line at desktop; "3 words max for primary CTAs, ideally 1-2". "NO DUPLICATE CTA INTENT": "Get in touch" + "Contact us" + "Let's talk" etc. are one intent; "pick ONE label and use it everywhere on the page (nav, hero, footer)". "FORM CONTRAST CHECK" on inputs, placeholders, focus rings, helper and error text.
4.6 Forms: label ABOVE input, helper text in markup, error BELOW, "No placeholder-as-label. Ever."
4.7 Layout hard rules:
- "Hero MUST fit in the initial viewport. Headline max 2 lines on desktop, subtext max 20 words AND max 3-4 lines, CTAs visible without scroll."
- Hero font scale planned with image size; `text-6xl md:text-7xl` only for 3-5 word heads; "A 4-line hero headline is always a font-size error".
- "HERO TOP PADDING CAP": max `pt-24` (about 6rem) desktop.
- "HERO STACK DISCIPLINE (max 4 text elements)": eyebrow OR brand strip OR neither; headline; subtext; CTAs (1 primary + max 1 secondary). "BANNED in the hero: tiny tagline below CTAs ..., trust micro-strip ..., pricing teaser ..., feature bullet list, social-proof avatar row."
- Logo wall lives UNDER the hero, never inside it.
- Nav on one line at desktop; height "80px max desktop, default 64-72px".
- Bento needs rhythm; "BENTO CELL COUNT RULE": exactly as many cells as content, no blank tile.
- "Section-Layout-Repetition Ban": each layout family at most ONCE per page; "A landing page with 8 sections must use at least 4 different layout families."
- "ZIGZAG ALTERNATION CAP": max 2 consecutive image+text splits; the 3rd is a Pre-Flight Fail.
- "EYEBROW RESTRAINT": "Maximum 1 eyebrow per 3 sections. Hero counts as 1." Mechanical: count of `uppercase tracking` labels must be 'ceil(sectionCount / 3)' or less. Preferred: drop eyebrows.
- "SPLIT-HEADER BAN": no left big headline + right small explainer as default.
- "Bento Background Diversity": 2-3 cells need real visual variation.
- "Mobile collapse must be explicit per section" (declare the under-768px fallback).
4.8 Imagery: "Landing pages and portfolios are visual products. Text-only pages with fake-screenshot divs are slop." Priority: image-gen tool, then real photos, then labelled placeholder slots plus an explicit ask. "Even minimalist sites need real images." Logo walls: real SVG logos (Simple Icons); "LOGO-ONLY rule": no category labels under logos. Hand-rolled decorative SVG "strongly discouraged", allowed only on explicit request, for a simple geometric mark, or when confident in quality. "Div-based fake screenshots are banned." "Hero needs a real visual. Text + gradient blob is not a hero".
4.9 Content density: default section shape "short headline (≤ 8 words) + short sub-paragraph (≤ 25 words) + one visual asset OR one CTA". No data dumps; more than 5 items needs a different component (2-col grouped, image cards, tabs, scroll-snap pills, carousel, marquee). Spec sheets with `border-b` per row are banned. "COPY SELF-AUDIT" of every visible string (broken grammar, unclear referents, AI-hallucinated wordplay, "LLM trying to sound thoughtful"); "AI-generated cute copy is worse than boring copy." Fake-precise numbers banned unless from real data or labelled mock. "One copy register per page."
4.10 Quotes: "Max 3 lines" of body; no em dashes; attribution name + role (never name only); typographic quotes or none.
4.11 "PAGE THEME LOCK": one theme for the page, sections do not invert; exception: one deliberate "Theme Switch on Scroll" with a strong transition, once.

### 5. Context-aware proactivity (none automatic)
Glassmorphism only for premium/media-overlay vibes, with 1px inner border `border-white/10`, inner shadow `shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]` and a `prefers-reduced-transparency` solid fallback. Magnetic physics when `MOTION_INTENSITY > 5` and the brief is premium/playful/agency, outside the render cycle. Perpetual loops only where the section benefits; "Not every card needs an infinite loop"; spring `stiffness: 100, damping: 20`.
"Motion claimed, motion shown": if `MOTION_INTENSITY > 4` the page must actually move (hero entry, scroll reveals on key sections, CTA hover physics); "Never half-build motion that breaks (cut-off ScrollTriggers, jumpy enters, missing cleanups)."
"MOTION MUST BE MOTIVATED": valid reasons are hierarchy, storytelling, feedback, state transition; "Invalid answer: 'it looked cool'. GSAP everywhere because GSAP is available is amateur." Each ScrollTrigger needs a one-sentence reason.
"MARQUEE MAX-ONE-PER-PAGE".
Sticky-stack must be real: `start: "top top"`, not `"top center"` or `"top 80%"`.
5.A sticky-stack skeleton: each card but the last `ScrollTrigger.create({ trigger: card, start: "top top", endTrigger: last, end: "top top", pin: true, pinSpacing: false })`; previous card `scale: 0.92, opacity: 0.55, ease: "none"` driven by the NEXT card's trigger `start: "top bottom", end: "top top", scrub: true`; context revert on cleanup; skip under reduced motion; cards `sticky top-0 min-h-[100dvh]`.
5.B horizontal pan: `distance = track.scrollWidth - window.innerWidth`; `gsap.to(track, { x: -distance, ease: "none", scrollTrigger: { trigger: wrap, start: "top top", end: () => \`+=${distance}\`, pin: true, scrub: 1, invalidateOnRefresh: true } })`; track `h-[100dvh]`.
5.C simple reveal: use a light in-view reveal (opacity 0, y 24 to rest; duration 0.6; stagger 0.06; ease `[0.16, 1, 0.3, 1]`; once, amount 0.3); "Save GSAP for actual pin/scrub work."
5.D forbidden: `window.addEventListener("scroll", ...)` (use ScrollTrigger, IntersectionObserver or `animation-timeline: view()`); `window.scrollY` progress math in state; rAF loops touching render state; stagger via cascade `animation-delay: calc(var(--index) * 100ms)` is fine.

### 6. Performance and accessibility
Animate only `transform` and `opacity`; `will-change` sparingly. "Any motion above MOTION_INTENSITY > 3 MUST honor prefers-reduced-motion"; "Infinite loops, parallax, scroll-hijack, and magnetic physics MUST collapse to static / instant under reduced motion." Dark mode mandatory for consumer pages by default, respecting `prefers-color-scheme` (brief may override). Core Web Vitals: "LCP < 2.5s", "INP < 200ms", "CLS < 0.1"; preload the hero image; run Lighthouse. Grain only on "fixed, pointer-events-none pseudo-elements", never on scrolling containers. Three.js is large: lazy-load below the fold. Documented z-index scale.

### 7. Dial definitions
VARIANCE 1-3 symmetric; 4-7 offset (`margin-top: -2rem` overlaps, 4:3 next to 16:9); 8-10 asymmetric (masonry, `2fr 1fr 1fr`, `padding-left: 20vw`). Mobile override for 4-10: strict single column under 768px (`w-full`, `px-4`, `py-8`). MOTION 1-3 hover/active only; 4-7 `transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1)` plus delay cascades (note: Hallmark bans `transition: all`); 8-10 scroll-triggered reveals, parallax, ScrollTrigger; scroll listener is "a hard ban". DENSITY 1-3 art gallery, "Huge section gaps (py-32 to py-48)"; 4-7 `py-16` to `py-24`; 8-10 cockpit, mono numbers.

### 8. Dark mode protocol
Pick one token strategy; contrast "WCAG AA minimum for body text, AAA target for hero copy"; hierarchy parity across modes; brand fidelity; "No pure #000000 and no pure #ffffff"; test both modes.

### 9. AI tells (forbidden)
9.A: no neon/outer glows; no `#000000`; no oversaturated accents; no big gradient text; "NO custom mouse cursors. Outdated, accessibility-hostile, perf-hostile." (conflicts with the Rembrandt brief; see application notes).
9.B: avoid Inter default; "NO oversized H1s that just scream"; serif not for dashboards.
9.C: mathematically clean spacing; no 3 equal feature cards.
9.D: no generic names, no egg avatars, no fake-perfect numbers (`99.99%`, `50%`), no startup-slop names, no filler verbs ("Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize").
9.E: no hand-rolled SVG icons; hand-rolled decorative SVG discouraged; no div fake screenshots; no broken image links.
9.F production-test tells (hard bans): version labels in hero (`V0.6`, `BETA`, `EARLY ACCESS`); "Brand · No. 01" sub-eyebrows; section-number eyebrows (`00 / INDEX`, `001 · Capabilities`, `06 · how it works`); `01 / 4` pagination on images or tiles; `Scroll · 001` cues; "Index of Work, 2018 - 2026" range labels; middle dot rationed to "Maximum 1 per line"; decorative colored status dots; em dash anywhere; `<br>`-broken italic headlines ("for thirty<br>*years.*"); vertical rotated text; decorative crosshair/hairline grids; fake product UI in hero; fake version footers; "Quietly in use at"/"Quietly trusted by"; poetic labels "From the field", "Field notes", "Currently on the bench", "On our desks", "Loose plates"; mock-humble references; weather/locale strips ("LIS 14:23 · 18°C"); micro-meta sentences under eyebrows; generic step labels ("Stage 1", "Step 1", "Phase 01", "Pass One"; use the verb-noun itself); pills/labels overlaid on images; photo-credit captions as decoration (credit only real photographers with permission; else a one-line functional caption); version footers; live-stock counters; decoration text strips at hero bottom (`BRAND. MOTION. SPATIAL.`, `DESIGN · BUILD · SHIP`); floating top-right sub-text in section heads; `border-t` + `border-b` on every row; scoring bars with filled background tracks; locale/city/time strips "banned for 99% of briefs" (allowed for "a real-world physical venue"; "A single contact-address mention in the footer is fine"); "Scroll cues are banned" (`Scroll`, `Scroll to explore`, mouse-wheel icons); "ZERO decorative status dots by default", allowed only for real semantic state such as "a live availability flag", "limited to one per page section".
9.G EM-DASH BAN: "Em-dash is COMPLETELY banned" in headlines, labels, body, quotes, attribution, captions, buttons, alt text; en dash as separator also banned; ranges use a hyphen. Only hyphen and math minus allowed. One visible em or en dash fails Pre-Flight.

### 10. Vocabulary (relevant entries)
Heroes: Asymmetric Split, Editorial Manifesto, Video/Media Mask, Kinetic-Type, Curtain-Reveal ("Hero parts on scroll like a curtain"), Scroll-Pinned. Nav: Magnetic Button, Dynamic Island, Mega Menu Reveal. Layout: Bento, Masonry, Split-Screen Scroll, Sticky-Stack. Cards: Parallax Tilt, Spotlight Border, Tinder Swipe Stack, Morphing Modal. Scroll: Horizontal Scroll Hijack, Sequence Scroll, "Zoom Parallax - Central background image zooming on scroll", "Scroll Progress Path - SVG line drawing along scroll". Media: Drag-to-Pan Grid, "Accordion Image Slider - Narrow strips expanding on hover", Hover Image Trail. Type: Text Mask Reveal, Kinetic Marquee. Micro: "Directional Hover-Aware Button - Fill enters from cursor's exact side", "Animated SVG Line Drawing", "Lens Blur Depth". Library choice: GSAP + ScrollTrigger "for full-page scrolltelling and scroll hijacks"; Three.js/WebGL isolated; never mix GSAP/Three with another animation library on the same element tree.

### 11. Redesign protocol
Modes: greenfield, redesign-preserve, redesign-overhaul ("Treat as greenfield for visuals; preserve content and IA"). Audit before touching: brand tokens, IA, content blocks doing work vs filler, patterns to preserve, "Patterns to retire", dial reading of the existing site, "SEO migration is the #1 redesign risk". Preserve: IA, slugs, anchor IDs, nav labels; "Extract brand colors before applying Section 4.2"; copy voice unless rewrite asked; existing accessibility wins; analytics names. Levers in order: typography, spacing, color, motion layer, hero and key-section recomposition, full block replacement. Never change silently: URLs, primary nav labels, form field names/order, logo/wordmark, legal/consent copy.

### 12-13. Block library and out of scope
12: a file schema for a future block library (frontmatter with dial compatibility; sections: sketch, props, code, mobile fallback, motion variants per band 1-3/4-7/8-10, dark mode notes, anti-patterns, references). Useful only as a template for documenting each of the 3 versions per section. 13: not for dashboards, tables, multi-step wizards, editors, native apps, realtime collaboration.

### 14. Final Pre-Flight (selected boxes that apply here; "If a single checkbox cannot be honestly ticked, the page is not done.")
Brief inference line; dial values reasoned; redesign audit; ZERO em dashes; Page Theme Lock; Color Consistency Lock; Shape Consistency Lock; Button Contrast; CTA no-wrap; Form Contrast; serif discipline (not Fraunces/Instrument Serif); premium palette check; italic descender clearance; hero fits viewport (head 2 lines, sub 20 words); hero top padding; hero max 4 text elements; eyebrow count; split-header ban; zigzag cap; no duplicate CTA intent; logo-only wall under hero; copy self-audit; motion motivated; one marquee max; nav one line, 80px or less; section-layout-repetition (4+ families across 8 sections); long lists use the right component; real images, no fake screenshots, no decorative hand-rolled SVG; no pills on images; no photo-credit decoration; no micro-meta sentences; no hero-bottom text strip; no floating corner sub-text; no filled-track bars; no locale strips; no scroll cues; no section numbering eyebrows; no decorative dots; content density sane; quotes 3 lines or fewer; motion claimed equals motion shown; sticky-stack and pan per canonical skeletons; no scroll listener; reduced motion everywhere above 3; dark mode tested; explicit mobile collapse; `100dvh`; animation cleanup; empty/loading/error states; cards omitted where spacing works; allowed icon library only; no Section 9 tells; Core Web Vitals plausible.

Appendices A-C (design-system install commands, canonical source links, Apple Liquid Glass web approximation) read; not applicable.

---

## S0647 open-design/soft-skill

Persona "Vanguard_UI_Architect", targets "$150k+ agency-level digital experiences". "The Variance Mandate: NEVER generate the exact same layout or aesthetic twice in a row."

"ABSOLUTE ZERO" bans: fonts "Inter, Roboto, Arial, Open Sans, Helvetica" (suggests Geist, Clash Display, PP Editorial New, Plus Jakarta Sans); thick-stroke Lucide, FontAwesome, Material Icons (use "ultra-light, precise lines (e.g., Phosphor Light, Remix Line)"); "Generic 1px solid gray borders. Harsh, dark drop shadows (shadow-md, rgba(0,0,0,0.3))"; "Edge-to-edge sticky navbars glued to the top"; symmetrical 3-column Bootstrap grids without big gaps; "Standard linear or ease-in-out transitions. Instant state changes without interpolation."

Variance engine, pick one of each. Vibe: 1 Ethereal Glass (`#050505`, mesh orbs, `backdrop-blur-2xl`); 2 Editorial Luxury (warm cream `#FDFBF7`, sage, espresso, variable serif, grain `opacity-[0.03]`); 3 Soft Structuralism (silver-grey or white, massive bold grotesk, very diffused ambient shadows). Layout: 1 Asymmetrical Bento (`col-span-8 row-span-2` plus stacked `col-span-4`; mobile `grid-cols-1`, `gap-6`); 2 "The Z-Axis Cascade: Elements are stacked like physical cards, slightly overlapping each other with varying depths of field, some with a subtle -2deg or 3deg rotation" (mobile: remove rotations and negative-margin overlaps under 768px because they "cause touch-target conflicts"); 3 Editorial Split (massive type left `w-1/2`, scrollable image pills or staggered cards right). Universal mobile: `w-full`, `px-4`, `py-8` under 768px; `min-h-[100dvh]`.

Haptic micro-aesthetics: "Double-Bezel" outer shell (`bg-black/5`, `ring-1 ring-black/5`, `p-1.5` or `p-2`, `rounded-[2rem]`) around an inner core (inset highlight `shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]`, radius `calc(2rem-0.375rem)`). Pill CTAs `px-6 py-3`; trailing arrow nested in its own `w-8 h-8 rounded-full` circle ("Button-in-Button"). Sections `py-24` to `py-40`. Eyebrow pills `text-[10px] uppercase tracking-[0.2em]` (directly contradicts S0001, S0650 and Hallmark; reject).

Motion: custom curves, e.g. `duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]`. Floating glass pill nav (`mt-6`, `w-max`, `rounded-full`); hamburger lines morph to an X; full-screen menu overlay `backdrop-blur-3xl bg-black/80`; links stagger up from `translate-y-12 opacity-0` with `delay-100/150/200`. Magnetic hover: press `scale-[0.98]`, inner icon `translate-x-1 -translate-y-[1px]` and `scale-105`. Entry: "Elements never appear statically on load" (`translate-y-16 blur-md opacity-0` to rest "over 800ms+"), via IntersectionObserver, never a scroll listener.

Performance: transform/opacity only; "Apply backdrop-blur only to fixed or sticky elements"; grain only on fixed pointer-events-none layers; no arbitrary z-index.

Protocol: silent roll, scaffold texture and whitespace, architect with double-bezel and `rounded-[2rem]`, choreograph, output. Checklist includes min `py-24`, no linear/ease-in-out, "Scroll entry animations are present - no element appears statically", "$150k agency build" impression.

Conflicts to resolve, not adopt: double-bezel on every card conflicts with S1314 ("Several borders, inner rings, highlights, and shadows wrap one surface") and Hallmark Floor 11 ("a card inside a card"); uniform entry fade-ups on every element conflict with S0001 and S1314 ("Every element receives the same entrance animation"); eyebrow pills conflict with Hallmark Floor 9. Useful and compatible: floating detached nav, hamburger-to-X morph, staggered menu reveal, button inner-icon kinetic tension, Z-Axis Cascade (fits layered parallax depth with real photos), blur only on fixed layers.

---

## S0624 open-design/gpt-tasteskill

Diagnosis of LLM bias: "massive 6-line wrapped headings by using narrow containers", "ugly empty gaps in bento grids", "cheap meta-labels ('QUESTION 05', 'SECTION 01')", "invisible button text", repeated left/right layouts. "DO NOT USE EMOJIS".

Randomization: simulate a seeded choice (prompt character count modulo) of 1 hero, 1 type stack ("Satoshi, Cabinet Grotesk, Outfit, or Geist. NEVER Inter"), 3 component architectures, 2 GSAP paradigms. "You are forbidden from defaulting to the same UI twice."

AIDA: creative nav (floating glass pill or minimal split), then Attention (hero, cinematic), Interest (bento or interactive type), Desire (pinned, horizontal, text reveals), Action (massive high-contrast CTA, clean footer). Spacing: `py-32 md:py-48`; "Sections must feel like distinct, cinematic chapters."

Hero "2-LINE IRON RULE": ultra-wide H1 container (`max-w-5xl`, `max-w-6xl`); "The H1 MUST NEVER exceed 2 to 3 lines"; size `clamp(3rem, 5vw, 5.5rem)`. Options: Cinematic Center ("exactly two high-contrast CTAs", full-bleed image with dark radial wash), Artistic Asymmetry (floating image overlapping text bottom right), Editorial Split. Button contrast: dark background white text, light background dark text. "BANNED IN HERO": floating stamp/badge icons, pill-tags under the hero, "raw data/stats in the hero".

Gapless bento: `grid-auto-flow: dense`; verify spans interlock, no empty corner; "3 to 5 highly intentional, beautifully styled cards".

GSAP: "Static interfaces are strictly forbidden." Hover physics: `group-hover:scale-105 transition-transform duration-700 ease-out` inside `overflow-hidden`. Patterns: pin title left while a gallery scrolls right; images start `scale: 0.8`, grow to `1.0`, darken and fade to `opacity: 0.2` on exit; scrub paragraph word opacity 0.1 to 1.0; card stacking from the bottom.

Arsenal: inline pill images inside headings (`inline-block w-24 h-10 rounded-full align-middle`); horizontal accordions (vertical slices that expand on hover); infinite marquee; overlapping portrait testimonial carousel.

Bans: "SECTION 01", "QUESTION 05", "ABOUT US" meta-labels. Image treatment with filters (`grayscale`, `mix-blend-luminosity`, `contrast-125`) "so they do not look like boring stock photos". Ambient backgrounds (radial blurs, grainy mesh). Wrap page in `overflow-x-hidden` (conflicts with Hallmark Floor 4 and S0247: use `overflow-x: clip` on html and body instead).

Pre-flight `<design_plan>`: RNG output, AIDA check, H1 `max-w` stated so it flows in 2-3 lines with no stamp icons or tags, bento density proof, label sweep and button contrast check.

---

## S0641 open-design/redesign-skill

Same structure and nearly the same text as S0217 (Scan, Diagnose, Fix; same audit lists; same upgrades; same fix priority 1-7; same rules). Differences that matter:
- Diagnose step: "List every generic pattern, weak point, and missing state you find" (S0217 softens this to options).
- Content: "Fake round numbers like 99.99%, 50%, $100.00. Use organic, messy data: 47.2%, $99.00, +1 (312) 847-1928." and "All blog post dates identical. Randomize dates to appear real." S0217 replaced both with honesty rules (verified values only; never randomize history). For Rembrandt, the S0217 honesty version wins: no invented numbers or dates at all.
- Motion upgrades: "Smooth scroll with inertia. Decouple scrolling from browser defaults for a heavier, cinematic feel." (S0217 makes this optional and conditional on keyboard, touch, anchors and reduced motion.)
- No guard paragraph and no limitations section.
Everything else (Inter swap, no pure black, saturation below 80%, one accent, no 3 equal cards, `100dvh`, 1200-1440px container, 200-300ms transitions, focus rings, no `window.alert()`, no `#` links, banned copy words, no "Oops!", sentence case, no accordion FAQ by default, no dotted 3-card testimonial carousel, real team photos over stock, favicon, skip link, legal links, meta tags) is identical to S0217 above.

---

## S0613 open-design/creative-director

A catalogue entry only. Advertises an upstream skill with "recursive self-assessment: 20+ methodologies (SIT, TRIZ, Bisociation, SCAMPER, Synectics), 3-axis evaluation calibrated against Cannes/D&AD/HumanKind, 5-phase process from brief to presentation". The axes, phases and rubrics themselves are not in the library.

Orchestration mode (the usable part):
1. "Define what 'good-looking' means before changing pixels: audience, product goal, brand posture, style references, information density, typography, palette, motion tone, asset needs, and explicit anti-patterns such as generic AI gradients, empty cards, vague copy, and template symmetry."
2. Inspect the current target (page, design file, attached images, project folder).
3. Search all available resources (skills, templates, user assets).
4. Stage the workflow in lanes: "critique, style-direction selection, visual asset generation, motion, data/proof grounding, implementation polish, responsive/accessibility hardening, and final verification."
5. "When the design target or aesthetic bar is ambiguous, present a small guided UI-style choice set or form with a recommended default. Continue the workflow after the choice instead of stopping at a generic question." (This is a direct precedent for the 1|2|3 picker: three options, one recommended default, work continues.)
6. If the best resource is unconfigured, explain and use the closest alternative, marking the tradeoff.
The "How to use" install step is a command for an upstream bundle; not run.

---

## S0471 nutlope/hallmark

Purpose: "Makes the UIs a coding assistant generates look made, not generated: a hard floor against the defaults every model was trained into, a dealt direction so consecutive builds do not converge, one idea per screen."

The Floor ("none of it waivable"):
1. Every colour and font goes through a `:root` token; "No literal colour or font-family past the token block."
2. "Never transition: all. Never animate width, height, top or left."
3. "Never one italic word inside a roman heading."
4. "overflow-x: clip on both html and body. Never hidden, never 100vw."
5. Image-bearing grid tracks use `minmax(0, 1fr)`; display heads carry `overflow-wrap: break-word; min-width: 0`.
6. "Every interactive element has :focus-visible, appearing instantly."
7. "Every animation has a prefers-reduced-motion: reduce fallback, and content is visible with scripting off."
8. "Never an invented metric, testimonial, logo wall or case-study count."
9. "Never an eyebrow, and never a label in tracked capitals or small caps: labels, captions, table heads, tags and nav links are the body face (or the theme's label face), a step smaller, sentence or lower case, untracked."
10. "Never middle-dot-joined meta strings, arrows glued to link text, or decorative status dots."
11. "Never a purple-to-blue gradient, a card inside a card, an emoji as an icon, or a hand-drawn browser or OS window."
12. "The hero's headline, one sentence and primary action are all visible at 1280 x 800 without scrolling."
13. "About 80 words on any one screen; the hero's text is the headline, one sentence and its actions."
14. "The container is capped and centred: at 1920 the gutters grow, the measure and the grids do not."
15. CSS starts with a stamp line, critique line, waivers (tool-specific).
16. Run its linter if Node is available (not run here, per instructions).
Above the Floor: "Reflex" gates are waivable defaults with a recorded reason; "Finish" checks are craft details.

Flow: 0 pre-flight (read the project first; "never theme a real brand from memory"); 1 ask once: Material ("the one that matters most: what can the page show?"), Audience, Use ("the one action the page should drive"), Tone ("pick an extreme ...; 'clean and modern' is not a tone"); "Facts are never inferred: a number, a quote or a logo not given is absent"; 2 shape; 3 direction; 4 load references; 5 Picks block; 6 build; 7 sweep.
Genre mapping: "playful, fun, friendly, soft, kids, games, community" leads to playful; otherwise "editorial, which holds most consumer and family prompts".

Shape. "Material first": inventory as real / pictures / absent. "a page with pictures leads with them". The job: name what the visitor comes to do and build from the category's own anatomy, "never from a default run of figures, steps and an email band". Mirror test: "would a neighbouring prompt in the same category get this exact combination? If yes, change one decision and say which." Signature: "The one thing a visitor would remember: the prompt's strongest real thing shown at its best (the photograph that is the place, the product doing its one job, a price set huge because it is the offer, a control to try)"; on the first screen; "A number drawn as marks is a device, not a signature."

Direction: user-named theme, custom ("the design is yours"; Floor, gates and sweep still hold), or a dealt theme. "A theme is a material, not a plan".

Picks block (single recital of decisions): Shape, Theme, Chrome (nav, footer), Hero, Signature, Sections, Material (real / pictures / absent), Sweep outcome.

Build rules:
- "One idea per screen, set big. Hero: a headline of seven words or fewer (50 characters), one sentence of twelve words or fewer, one or two actions. Six to nine sections, hero and footer included (five on a thin prompt), 450 visible words at most". "Fullness comes from scale and pictures, never from more words".
- "Show, do not describe": real pictures, big, in slots the user's files replace; "Pictures take at most a third of the page below the hero, never two photograph-led sections in a row" (tension with the image-led brief; see application notes). Never a stock URL, "a drawn illustration", "an empty wash", "a row of counting marks" or an invented figure.
- Page invariants: "one primary button style, one container width, one column gap below the hero, one radius per nesting level, never more centred heading groups than left-aligned ones."
- Type and motion: two families max (three with one outlier role); "body 16px or more"; "heads one weight and one colour"; "labels never mono unless mono is the material"; "Eight states on every control; transform and opacity only; one reveal at most, none where the theme keeps still, visible by default."
Sweep: fix every FAIL, confirm or dismiss every WARN, fresh-context finish review whose first word is "recapture", "rebuild", "fix" or "ship"; close with the material ask; "A fabricated pass is itself slop." Verification budget: one batched inspection, one fix batch, at most one confirming round.

The referenced files (`gates.md`, `layout.md`, `anatomy.md`, `imagery.md`, `craft.md`, `macrostructures.md`, themes, scripts) are not in the library.

---

## S1314 no-ai-design-slop

Core judgment: "Slop is not a color, font, gradient, card, or animation. It is a choice made by reflex rather than for the product." A choice is suspect when several hold: it "could be pasted into an unrelated product unchanged"; it repeats a familiar generated pattern; it conflicts with the local system or nearby sections; it "communicates no useful information, state, action, hierarchy, or brand meaning"; it competes with content, weakens trust or harms use. "Do not guess whether AI made the artifact. Judge the visible result."

Apply passively: 1 read local instructions, tokens, references; 2 identify product, audience, primary task, primary action, hierarchy and "one visual thesis"; 3 preserve established decisions unless redesigning; 4 run the gates on every added section, component, effect or state; 5 "Render the result at relevant viewports and inspect the actual interface, not only the source"; 6 fix the highest-impact problem. Formal review uses S1306 instead.

Principles. Context: design from evidence; use references for "hierarchy, pacing, contrast, material, and interaction principles", never copy identity, layout, assets or copy; define a compact system first. One coherent idea: "one focal point" per viewport, "one clear primary action" per flow; "Prefer one strong authored moment over many unrelated effects"; keep character. Relationships: "Use proximity before containers"; "Use hierarchy before labels"; "Use depth only when the interface has a real layering model"; repeated components only for real repeated content. Specific: sections from "the product's story, buying journey, and usage flow"; "Do not manufacture proof"; art-direct imagery to the subject. Motion: may explain "state, causality, hierarchy, continuity, or spatial change"; "Do not animate merely to prove that the page is interactive"; "Keep reading and controls stable. Support reduced motion and complete static states."

Compact gates: System; Hierarchy (obvious without decorative labels); Composition (at every viewport); Typography; Color and material ("Does each gradient, glow, glass layer, border, shadow, and accent have a clear role?"); Product truth ("imagery, copy, metrics, screenshots, logos, and states specific and honest"); Interaction (active, hover, focus, loading, empty, error, disabled, selected, success); Motion and access.

Removal test: 1 name it precisely; 2 state its job; 3 remove it mentally, "If meaning, state, action, hierarchy, or brand character survives and clarity improves, delete it"; 4 if deletion loses something, smallest correction; 5 "Add a replacement only when the interface needs one. Do not compensate with a new effect."

Boundaries: no technique is slop in isolation; do not swap distinctive choices for "a fashionable neutral template"; do not turn every block into a card; "Do not remove useful density, edge, humor, asymmetry, or expressive motion merely because it is unusual"; "Do not invent customers, metrics, testimonials, awards, ratings, product screens, or activity."

Verification: compare render to system and references; inspect primary flow, states, breakpoints; no clipping, overlap, overflow or contrast loss; controls labelled, reachable, stable; "every remaining decorative layer has a defensible role"; "the result is more specific to this product, not merely more fashionable". Report removals and why; no AI-authorship guess or "generic numeric taste score".

ARTICLE.md catalog (heuristic inventory; mark observed / absent / unknown). Philosophy: "Taste is contextual"; "Start from a system, not an empty prompt"; "Coherence beats decoration" ("One strong visual idea can carry a page. Five unrelated ideas create noise."); "Subtract before replacing"; "Learn the names of problems".
Items most relevant to Rembrandt:
- Direction: no clear job; "The first viewport cannot explain what the product does"; style "could belong to any startup with the copy swapped"; several unrelated style lanes; several focal points; decoration with a different mood than the content; a section that "looks imported because it does not inherit the page's type, palette, shape, density, or motion" (key risk with 3 versions per section); "polished locally but incoherent as a whole".
- Composition: accidental overlap at breakpoints; "Intentional overlap lacks contrast, safe space, or a stable anchor"; headings closer to the previous section than their own content; identical vertical padding everywhere; body touching viewport edge; overflow; "A long sentence is enlarged until it consumes the entire first viewport"; "Empty space is added as spectacle"; "Desktop composition simply collapses into one long mobile stack with no re-prioritization"; "Sticky or fixed layers cover content, controls, or system UI".
- Containers: cards everywhere; nested cards; fashionable bento; repeated icon-heading-description cards; "Small cards use extreme radii and become soft blobs"; pills for non-pill content; accent stripe on one side of a rounded card; border plus diffuse shadow defining the same edge; several rings and highlights on one surface; radii drift.
- Typography: tracked eyebrow above nearly every heading; hero pill repeating the headline; "Tiny numbered labels imitate editorial structure"; collapsed display tracking; long all-caps; tiny functional text; long centered paragraphs; "Decorative italics are used as a shortcut to make a headline feel editorial"; gradient text; popular AI-default font; "Tiny monospaced labels make ordinary content pretend to be technical"; buttons wrapping to two lines; widows in focal copy.
- Color and material: default purple-blue gradients; cyan on dark; competing accents; "Saturated radial lights float behind sections with no physical or narrative source"; glows on every state; glass without a real layer relationship; stacked blur/glow/gradient/border/shadow/noise; "A warm cream surface is selected only because it signals generic tastefulness"; contrast failing at rendered size; muddy shadows; decorative grids; uniform texture hurting legibility; "Dark mode is treated as black plus neon"; color as the only state signal.
- Imagery: "Hand-coded SVG scenery or mascots look like unfinished placeholders"; pseudo-illustration from shapes; stock as evidence; "Every image has a different lighting, crop, grade, or rendering style"; decorative device mockups; "Placeholder portraits, duplicated logos, or fake avatars imply adoption"; rounded-square icon tile above every heading; mixed icon families; "Brand marks are approximated with text or invented SVG paths when an official asset exists"; crops that lose the subject or safe area responsively; "Decorative media consumes bandwidth or motion budget without adding meaning".
- Components and states: several equal primary actions; primary action weaker than decoration; missing active states; random status pill; "Static status uses a pulsing dot to pretend that data is live"; missing focus; "Hover is the only way to reveal essential information"; "Hover effects move the target away from the pointer"; missing states; small tap targets; late form validation.
- Motion and scroll (the owner's main complaint): "Every element receives the same entrance animation"; "Motion exists to make a static composition feel more expensive"; several perpetual animations competing with reading; fake blinking cursor on hero copy; auto-scrolling marquee hiding content; bounce/elastic easing on ordinary state changes; "Image hover defaults to scale or rotate with no product meaning"; hover causing layout shift; width/height/margin/padding animation; "Scroll effects do not explain narrative, depth, chronology, or spatial movement"; smooth scrolling added without checking keyboard, anchors, restoration or reduced motion; "Sticky storytelling traps the user for too long relative to the content"; "Content begins hidden and remains invisible when JavaScript or observers fail"; transitions blocking input; "Parallax changes readability or causes motion discomfort"; timing without a system; "The page lacks a complete static first frame"; "Reduced motion only shortens animation instead of presenting a stable final state".
- Copy and proof: broad headline claims; buzzwords; "Copy repeats em-dashes, rebuttal fragments, or manufactured contrasts as a cadence template"; labels and hints restating each other; filler feature cards; the default sequence "hero, logo wall, metrics, bento features, testimonials, FAQ, and CTA ... regardless of the actual journey"; "A section exists only to make the page feel complete"; dramatic unsupported metrics; invented testimonials, ratings, awards, partnerships; logos implying customers; vague button verbs; error without recovery; "Success states celebrate without confirming what happened next".
- Production: uncaught errors; "Important content remains at zero opacity because an animation did not initialize"; skipped heading levels; missing accessible names; focus hidden under sticky layers; reading order mismatch; touch assumed from hover; media without static fallback; jank and battery drain; layout shift after fonts/images load; long real content breaking components; dead links; "Success is claimed from source code without checking the rendered surface".
High-signal clusters (fix the root cause once): Generic AI SaaS; Card apocalypse; "Motion theater: hidden-at-rest content, identical reveals, marquee, pulsing statuses, scale-on-hover, smooth scroll, no reduced-motion path"; Fake sophistication (mono micro-labels, decorative grid, fake dashboard, invented metrics, browser chrome); Reference mismatch; "Polish before truth".
Prompt vocabulary examples: "Remove the tracked eyebrow; the heading already carries the hierarchy."; "Remove the decorative radial lights and keep one product-led focal image."; "Keep the overlap, but reserve a safe text area at mobile and tablet widths."; "Make the status static unless it reflects changing data."; "Preserve the visual thesis and remove effects that repeat the same job."

---

## S1306 audit-ai-design-slop

Diagnostic only, evidence-backed. Boundaries: no AI-authorship guess; "Do not assign a numeric slop score"; no technique rejected in isolation; no new direction unless asked; no implementation; unknown when outside evidence.
Evidence sources: screenshots, rendered viewports, interactions and state changes, source/tokens/assets/copy, console failures. "For every finding, cite a concrete location, component, behavior, or line of copy."
Classes: "Quality defect" (established usability, accessibility, content, responsive or runtime problem) and "Slop pattern" (repeated default or decoration with no role).
Flag: decorative stacking (multiple layers doing the same decorative job); component/template repetition (cards on nearly every block, interchangeable icon tiles, nested containers, generic sequences, restating labels); typography and copy clutter; motion theater ("motion that delays access, repeats mechanically, distracts from reading, moves targets, blocks input, or lacks respect for reduced-motion preferences"; preserve motion that "communicates state, causality, hierarchy, or spatial change"); fake proof; established UI failures (competing primary actions, low contrast, clipping/overflow, broken assets, hover-only info, missing states, unclear focus, accidental inconsistency, hierarchy contradicting task importance).
Removal test as in S1314; "Default to subtraction."
Priorities: "P0: blocks completion, creates a severe accessibility issue, or presents deceptive proof"; "P1: materially harms comprehension, trust, navigation, or interaction"; "P2: repeated slop or inconsistency that weakens hierarchy and identity"; "P3: minor polish issue". Return the "five to eight highest-impact findings", grouped by root cause.
Output: Verdict paragraph; Checked scope; Findings table (Priority | Class | Pattern | Evidence | Harm | Remove or fix); Unknowns. Feedback rules: evidence before taste; name pattern and harm; removal before restyling; no generic compliments; "End with the single removal or correction that would produce the largest improvement."

---

## S0659 anti-ai-slop (craft rules)

The seven cardinal sins (linter P0, must fix):
1. "Default Tailwind indigo as accent" exactly `#6366f1`, `#4f46e5`, `#4338ca`, `#3730a3`, `#8b5cf6`, `#7c3aed`, `#a855f7`.
2. "Two-stop 'trust' gradient on the hero": purple to blue, blue to cyan, indigo to pink. "A flat surface + intentional type beats this every time."
3. "Emoji as feature icons" (`✨`, `🚀`, `🎯`, `⚡`, `🔥`, `💡`) in headings, buttons, list items or icon classes; use "1.6-1.8px-stroke monoline SVG with currentColor".
4. "Sans-serif on display text when the seed binds a serif" (h1/h2 must use `var(--font-display)`).
5. "Rounded card with a colored left-border accent" ("Drop either the radius or the left border").
6. "Invented metrics" ("10x faster", "99.9% uptime"): real source or labelled placeholder.
7. "Filler copy" (lorem ipsum, "feature one / two / three", "placeholder text"). "An empty section is a design problem to solve with composition, not by inventing words."
Soft tells (P1): the "Hero -> Features -> Pricing -> FAQ -> CTA" skeleton without variation ("introduce at least one unconventional section"); external placeholder CDNs (unsplash, placehold.co, picsum.photos); "More than ~12 raw hex values outside :root"; "var(--accent) used 6+ times in the rendered body. Cap at 2 visible uses per screen."
Polish tells (P2): sections without ids for comment targeting; "Decorative blob / wave SVG backgrounds"; "Perfect symmetric layout with no visual tension" ("alternating density (one tight section, one breathing section) reads as intentional").
Soul: "Aim for ~80% proven patterns + ~20% distinctive choice." The 20% lives in one bold visual move, voice and microcopy ("'Start tracking' beats one that says 'Get started'"), "One micro-interaction the user will remember - a button press that moves 2px, a number that counts up", and "One detail that could only have been put there by someone who used the product". Test: "If a reviewer screenshots the artifact and someone outside the project can identify which product it's from - you have soul. If not, you shipped a template."

---

## S1320 build-awwwards-quality-sites

"Treat 'Awwwards quality' as an acceptance bar, never as an award or recognition claim."

1 Art direction: inspect references fully, extract only high-level traits; "Generate a materially new identity"; name the web-design skill followed; write a compact direction before coding: "visual thesis, hero focal asset, type hierarchy, color system, section sequence, motion narrative, chosen smooth-scroll engine, Three.js decision, and asset provenance plan."
2 Honest assets: "Do not draw illustrations with model-authored SVG, CSS, or canvas paths." Allowed: "Simple authored brand marks, interface icons, data graphics, and a justified Three.js shader canvas". "Use photographs for every avatar ... never ship initials, illustrated heads, faceless silhouettes, or generated people presented as real customers, staff, or endorsers." Real company marks only "in truthful contexts"; "Omit a logo wall when no honest proof exists." "Provide deliberate aspect ratios, crop behavior, alt text, loading behavior, and missing-media fallbacks." No decorative media "without a narrative role".
3 Hero: "Make the first viewport the site's strongest authored moment. Combine a clear message and CTA with original imagery, video, pointer-responsive interaction, or a justified Three.js scene." "Create a composed GSAP intro sequence for the hero. Keep navigation, primary message, and CTA readable and usable before the animation completes." "Make pointer effects additive. Support touch, keyboard, coarse pointers, window blur, and visibility changes without leaving the interface in an incomplete state." "Design a static first frame that remains complete when JavaScript, media playback, WebGL, or motion is unavailable."
4 Motion system: GSAP primary. Evaluate Lenis and Locomotive, "choose exactly one as the site's sole smooth-scroll engine. Never install or initialize both"; connect to ScrollTrigger, refresh after media and font changes, destroy on cleanup. "Bypass smooth scrolling and scrubbed timelines under prefers-reduced-motion: reduce. Render final states immediately instead of merely shortening animations." "Reveal major headings word by word with a restrained stagger, then sequence supporting copy and media." "Preserve an unsplit accessible name for staggered text. Hide decorative split words from assistive technology, never split links or meaningful inline markup, and keep the unsplit content visible without JavaScript." CSS for simple hover, focus, tap; ScrollTrigger only for justified scrub/pin; never two systems on one property.
5 Three.js only with purpose: "when spatial depth, texture transition, displacement, or pointer response materially supports the art direction. Do not add a shader as ornamental background noise." "Give the canvas one clear responsibility and keep it subordinate to semantic content and controls." "Cap device pixel ratio, pause rendering offscreen or when the document is hidden, throttle pointer input, and avoid per-frame allocation." "Provide a static poster and replace the canvas entirely under reduced motion or WebGL failure." Dispose frames, observers, listeners, render targets, textures, geometries, materials, renderer; handle context loss.
6 Quality bar: complete semantic page ("not a hero-only concept"), responsive nav, "concrete conversion content, final CTA, footer", robust form states, visible focus. Requires "a distinct art-directed idea, memorable first viewport, disciplined typography and spacing, intentional image crops, authored transitions, and refined hover, focus, active, loading, disabled, error, touch, and reduced-motion behavior." Performance: responsive media, lazy below the fold, bounded transforms, limited blur, capped canvas, "no continuously animated offscreen content". Reject "generic gradient blobs, ornamental bento grids, glass applied everywhere, stock component layouts, fake testimonials, invented partnerships, logo-wall theater, and motion with no narrative role." "Never describe the result as award-winning or Awwwards-recognized unless the user provides verifiable evidence."
7 Validate: production build; desktop and mobile; keyboard, focus, touch, no-JS content, static media fallbacks, reduced motion; one smooth-scroll engine; cleanup; search for placeholders, unsupported claims, misleading logos, uncredited media, inaccessible split text; report skill, asset sources, motion stack, Three.js decision, validation, limitations.

---

## S0098 bencium-impact-designer

Purpose: distinctive production-grade interfaces; "bold creative commitment"; "Bold maximalism and refined minimalism both work - the key is intentionality, not intensity."

Design Thinking Protocol: ask Purpose, Tone ("What aesthetic extreme fits?"), Constraints, Differentiation ("What makes this UNFORGETTABLE? What's the one thing someone will remember?"). Then "Commit fully"; "Present 2-3 alternative approaches with trade-offs" (supports the 3-version picker).

Tone options (pick an extreme): Brutally minimal, Retro-futuristic, Organic/natural, Editorial/magazine, Brutalist/raw, Art deco/geometric, Soft/pastel, Industrial/utilitarian, Neo-Swiss Grid, Anti-Grid Experimental, Monochrome High-Contrast, Duotone Pop, Kinetic Typography, Glitch/Digital Noise, Y2K Cyber Gloss, Vaporwave, Synthwave, Memphis Playful, Riso Print, Bauhaus Modernism, Constructivist, Futurist Speed, Cinematic Noir, Whimsical Storybook, Modern Skeuomorphic, Clay/Soft 3D, Isometric Systems, Data-Driven Dashboard, Scientific/Technical, Military/Command UI, "Weathered/Vintage Patina - worn textures, faded inks, imperfections, found-object authenticity", Coastal/Airy, Desert Modern, Botanical Apothecary, Nordic Calm, "Playful Minimal - minimal layout with one 'smile' detail, bright accent, friendly type choices", Startup Crisp, "High-Fashion Lookbook - ultra-thin type, dramatic photography framing, sparse copy, luxe whitespace", "Museum Exhibition - quiet typography, generous margins, caption-like text", "Architectural Blueprint - linework, measurement marks, grid overlays, technical drawing aesthetic", Monastic/Wabi-Sabi.

Foundational principles: distinctive characterful fonts, distinctive display plus refined body; "Dominant colors with sharp accents outperform timid, evenly-distributed palettes"; motion: "one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise."; spatial: "Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements."; backgrounds: atmosphere and depth via gradient meshes, noise, patterns, layered transparencies, dramatic shadows, decorative borders, "custom cursors", grain.

NEVER (AI aesthetics): fonts "Inter, Roboto, Arial, system fonts as primary choice, Space Grotesk"; colors "Generic SaaS blue (#3B82F6), purple gradients on white backgrounds"; cookie-cutter layouts; effects "Glass morphism, Apple design mimicry, liquid/blob backgrounds"; "Anything that looks 'Claude-generated'". "NEVER converge on common choices (Space Grotesk, for example) across generations."

Inspiration: Awwwards, FWA, CSS Design Awards; studios (Studio Dumbar, Thonik, Büro Destruct, NORM, Made Thought, Pentagram, Collins, HAWRAF, Rhizomatiks, TeamLab); movements (Bauhaus, Swiss, Otl Aicher, Emigre, Carson, Brody, Sagmeister); Codrops, CodePen Spark, Hoverstat.es. Reframing prompts: Sagmeister, Brody, Dumbar, Rams, Carson; "What if this was a magazine spread? / museum exhibit? / street signage? / vinyl record cover? / protest poster?"; era lenses. Anti-sameness dice: color temperature (warm terracotta/ochre/cream/rust vs cool slate/ice/mint/charcoal); layout 1-4 (left-heavy, right-heavy, center with edge tension, diagonal); type 1-6 (geometric sans, humanist sans, serif, slab serif, display, mono); motion 1-3 (minimal, choreographed, playful); density 1-2.

Philosophy: simplicity ("Every element must justify its existence"); material honesty; functional layering; obsessive detail ("When detail conflicts with clarity, clarity wins"); coherent language; invisibility of technology. Complexity must match the vision.

Practice: base palette 4-5 neutrals; accents 1-3; neutrals slightly desaturated; 2-3 typefaces max; scale ratio 1.25 (Major third) or 1.333 (Perfect fourth); base 16px; example scale 10/13/16/20/25/31/39/49/61px; never Inter/Roboto/Space Grotesk; 3 weights per face max; spacing 4px base, 8/16/24/32/48.

Design Decision Checklist: Purpose, Hierarchy, Consistency, Accessibility (WCAG AA, touch targets, keyboard), Responsiveness, "Uniqueness: Does this break from generic SaaS patterns?", Approval (ask before committing colors, fonts, sizes, layouts).

Color system: hover darken 10-15%; focus ring in accent; disabled 40-50% opacity; "same color = same meaning throughout"; WCAG 2.1 AA "4.5:1 for normal text, 3:1 for large text"; "Don't rely on color alone"; pair neutrals with distinctive accents ("terracotta + charcoal, sage + navy, coral + slate"); "Test combinations against 'does this look AI-generated?' filter".

Typography: headlines emotional (personality over pure legibility); body legible; line height 1.5; line length "45-75 characters optimal (60-70 ideal)"; paragraph spacing 1-1.5em; tracking: headlines "-0.02em to -0.05em", body 0, captions "+0.01em to +0.03em"; button text 600 weight, 14-16px; labels 400 14px above input; "Form input text: Regular (400), 16px minimum (prevents iOS zoom on focus)"; errors 12-14px; fluid `clamp(2rem, 5vw, 4rem)`; mobile 20-30% smaller with fewer levels.

Layout: balance, grid discipline with meaningful exceptions, wrappers with `gap`, proximity grouping, clear attention paths.

Motion checklist: IntersectionObserver scroll triggers ("Trigger animations when elements enter viewport (not on page load)"); stagger "Base delay: 50-150ms between elements"; "Total sequence: Keep under 1s"; ambient background motion "8-20s", movement "5-20px" for backgrounds; layered speeds for parallax depth; stat counters counting up with ease-out; hover lift `translateY(-4px)`, `scale(1.02-1.05)`; marquee "20-60s for full cycle", content duplicated 2x, "Always pause on hover/focus".
Visual effects: gradient mesh 2-4 radials, "20-30% from edge", opacity 0.1-0.4 subtle, shift 10-30% over 15-30s; layered dramatic shadows with accent color; `backdrop-filter` sparingly; grain `opacity: 0.03-0.08` with `pointer-events: none`; custom cursors: "Change cursor for interactive regions", "Consider custom cursor images for brand differentiation", "Use cursor: grab / cursor: grabbing for draggable elements", "Always provide fallback: cursor: url(custom.cur), pointer;".

UX patterns: direct manipulation (drag, sliders); "Every interaction provides instantaneous visual feedback (within 100ms)"; skeletons for operations over 300ms; consistent behavior (modals close via X, ESC, outside click; forms validate on blur and submit); forgiveness ("Preserve user input on errors"); progressive disclosure. Adaptive layouts (system preference, slow connection reduces media). "NO glass morphism effects (this is the one banned technique)". Navigation: predictable, current page highlighted.

Implementation section (shadcn, Tailwind, Phosphor, sonner) read; not applicable to a single vanilla HTML file except: always loading states, gap-based spacing, mobile-first, 44x44 targets, CSS animation over JS where possible, lazy loading.

Accessibility: WCAG 2.1 AA; keyboard for everything; "Minimum touch target size: 44×44px"; semantic HTML; alt text; `aria-label` on icon buttons; logical tab order; visible focus.

Never/Always: never skip context questions, never "Use animations that delay user actions", never cluttered competing elements; always commit boldly, characterful type, atmosphere, feedback, real-device testing. "When to Break the Rules": brand already uses a "banned" font, "use it brilliantly"; "A 'banned' pattern executed with intention beats a 'safe' pattern executed without conviction"; checklist: explain the creative intent, conscious choice, serves user/brand/context, "Would a senior designer defend this choice?". If yes to all, break the rule.

ACCESSIBILITY.md: POUR; contrast table (normal 4.5:1, large 18pt+ 3:1, UI components 3:1); tab through everything, Enter/Space activate, Escape closes, visible focus always; `aria-expanded`/`aria-controls`; live regions `role="status" aria-live="polite"` and `role="alert"`; `aria-invalid` + `aria-describedby` on errors; landmarks; never skip heading levels; 44x44 targets, `touch-manipulation`; skip link. Quick checklist of 8 items.

MOTION-SPEC.md: easing table: ease-out `cubic-bezier(0.0, 0.0, 0.2, 1)` entrances; ease-in `cubic-bezier(0.4, 0.0, 1, 1)` exits; ease-in-out `cubic-bezier(0.4, 0.0, 0.2, 1)` state changes; spring `cubic-bezier(0.68, -0.55, 0.265, 1.55)` playful; linear for spinners/loops. Duration by weight: lightweight 150ms (icons, chips), standard 300ms (cards, panels), weighty 500ms (modals, page transitions). By interaction: button press 100ms, hover 150ms, tooltip 200ms, tab switch 250ms, modal 300ms, page transition 400ms. "Keep durations under 500ms for UI interactions". Reduced-motion snippet sets durations to 0.01ms (S1320 and S1314 say this alone is insufficient: render final states).

RESPONSIVE-DESIGN.md: breakpoints XS 0-479, SM 480-767, MD 768-1023, LG 1024-1439, XL 1440+; fluid `h1 { font-size: clamp(2rem, 5vw, 4rem); }`, `p { font-size: clamp(1rem, 2.5vw, 1.25rem); }`; mobile simplification table ("Inline buttons -> Fixed bottom bar"; stacked fields; single column); responsive `srcset`/`sizes`, `loading="lazy"`; test widths 375, 390, 768, 1024, 1280+.

---

## S0247 design-spatial

Premise: "A model cannot trust its own UI output."

1 It cannot see what it made: "Render it and judge the image, not the code." Screenshot at several widths. "Critique with fresh eyes - not your own": a separate judge subagent that did not write the page hunts "collisions, edge tangents, ragged alignment, lopsided weight, no clear focal point, breaks at some width". Fix, re-render, re-judge.

2 Its first idea is the average. Two means: "the generic-AI mean: Inter, purple-on-white gradients, centered single column, three equal cards"; "the designer-trend mean: oversized condensed caps, dark-mode + grain, monospace 'vibes' microtext, sticker badges." "Landing on the second isn't taste - it's a more flattering average". "deviate deliberately - toward this product's specific world ... not toward another trend. If the result could be any startup, you shipped the mean."

3 Prescribe process, not look: fixed rules become the next mean. Live controls (sliders, pickers, drag handles) beat one-shot critique for spatial tuning.

4 Horizontal overflow, "THE mandatory gate": "You may not call any web UI 'done' ... until you have run the scrollWidth check below at a narrow width THIS turn and seen 0." Layouts grow; any added element in a horizontal row "re-arms this gate". Defenses: "Header / nav / toolbar rows: flex-wrap: wrap, never nowrap." Check: `document.documentElement.scrollWidth - document.documentElement.clientWidth` must equal `0` at dev width and narrow (1024px or less, and about 390px). Offender finder: query all elements whose bounding rect right exceeds `innerWidth + 1` or left is below `-1`. Safety net `overflow-x: clip` on body ("prefer clip over hidden - it clips without creating a scroll container, so it won't break position:sticky"), but find root causes: absolute + nowrap labels at an edge (anchor inward); `100vw` ("includes the scrollbar width (~15px)"; use `100%`); flex/grid children without `min-width:0`; long unbreakable strings (`overflow-wrap:anywhere`); fixed widths, large negative margins, oversized absolute elements. "anything pinned to an edge or sized in viewport units is a horizontal-overflow suspect".

5 Lay out in task order: "orient -> work -> confirm". "Confirm where the work ENDS": actions also at the bottom where the eyes and cursor finish. "save the user transit time", Fitts's law for the whole page; ask the judge to trace the task.

6 Balance is measurable: visual weight centroid; optical center "x = 0.50, y ≈ 0.46"; weight = area times ink density, starting multipliers `{portrait:0.34, h1:0.82, kicker:0.42, lead:0.22, body:0.16, meta:0.5}` (exploratory heuristics); see-saw fixes in order: grow the opposing heading, add weight, pull the heavy element inward, shrink it. Box model vs pixel oracle: "When the box model and the pixels disagree, the pixels win." Acceptance: `|centroid_x - 0.50| < 0.03` and `|centroid_y - 0.46| < 0.04`. Report the actual number, not a VLM opinion.

7 Layout audit (script not bundled): collision (rect intersection 12% or more, gate), contrast (below 4.5, large below 3, gate), tap (under 44x44, review), overflow (gate), alignment (near misses 1-7px, signal), spacing (gap coefficient of variation, signal), balance (signal). Draw findings as an overlay, screenshot, then judge. "GATES = correctness" (safe to block); "SIGNALS = convention ... Optimizing a layout to maximize these scores makes it blander." "Never accept a metric you have not looked at." "When the metric and the interesting choice conflict, the interesting choice usually wins." "Gates are necessary, not sufficient."

8 Optical craft: nudge 1-2px when it looks off (play triangle shifts right; text centered by box metrics sits low); balance icon/text lockups by optical weight.

Limitations: WCAG 2.2 AA target minimum is 24x24 CSS px; 44x44 is a stricter project target. Pixel centroid cannot establish quality alone.

---

## Applying it to Rembrandt v5

1. Precedence, written down before design starts. Owner brief first ("the brief's own words always win", S0001), then correctness gates (accessibility, overflow, honesty, reduced motion, performance), then anti-slop bans, then style preferences. Where a skill bans what the owner explicitly asked for, keep the owner's item and apply the skill's reason as a constraint:
   - Custom cursor (S0650 9.A bans it as "accessibility-hostile, perf-hostile"): keep it, but make it additive, fine-pointer only, and transform-only (item 12).
   - "Strongly animated" vs "one reveal at most" (Hallmark) and "Spend your boldness in one place" (S0001): one signature moment for the page, plus one motivated motion idea per section, with no generic entrance applied everywhere.
   - "Image-led" vs Hallmark's "Pictures take at most a third of the page below the hero": the owner wins. Keep Hallmark's intent by never placing two sections that use the same photo treatment back to back.
   - "Rich interactive SVG" vs bans on hand-rolled decorative SVG (S0650, S1320, S1314): use SVG only as masks, reveals, line work traced from the real photos, and honest data graphics. Never draw scenery, houses or mascots.

2. Write the Design Read line and the dials, and justify each number. For example: "Reading this as: a homepage redesign (full visual overhaul) for Miami Valley homeowners facing a roof decision, with an Awwwards-experimental but trust-first language, leaning toward native CSS plus inline GSAP ScrollTrigger and one small WebGL transition." Proposed dials: DESIGN_VARIANCE 8, MOTION_INTENSITY 8, VISUAL_DENSITY 2. The Awwwards row (9-10 / 8-10 / 3-4) is pulled down by the trust-first row (3-4 / 2-3 / 4-5), and density drops because the owner asked for very little text. "Motion claimed, motion shown" then requires the page to really move.

3. Define what "good-looking" means for Rembrandt before any pixels (S0613): audience, goal (call or estimate), brand posture (a family firm since 1995), density (very low), motion tone, asset list, and anti-patterns. Then fill in the S0223 Direction Summary: aesthetic name, DFII score, conceptual inspiration. Target DFII of 12 or more. Score Consistency Risk honestly: 3 versions per section raises it, so expect 3 or 4.

4. Differentiation anchor and signature. The page must pass "If this were screenshotted with the logo removed, how would someone recognize it?" (S0223) and S0659's screenshot test. The signature must be a real Rembrandt thing shown at its best (Hallmark): the ranch with the new charcoal roof turning into the same ranch with the Rembrandt truck, or the yard-sign house. It appears on the first screen, and the Picks-style summary names it.

5. Material inventory in Hallmark's form, used as the honesty contract.
   - Real: since 1995; 4.9 stars from 295 Google reviews; BBB A+ since 2001; Owens Corning Platinum Preferred; $2M liability; written line-item estimates; Mon-Fri 9-5; (937) 746-7377; Bunk, Wade (president since 2015) and Rachel; the seven photos.
   - Absent: review quote text (unless given verbatim), job counts, response-time promises, warranty terms, service-area lists, prices, financing, awards.
   - Never "award-winning" in copy (S1320). Prefer "Since 1995" to arithmetic like "30+ years". The rating must read exactly 4.9 from 295 Google reviews, with tabular figures.

6. Text budget, measured rather than felt.
   - Hero: headline of 7 words or fewer and 50 characters or fewer, one sentence of 12 words or fewer, one or two actions (Hallmark). S0650's looser caps (head at most 2 lines, subtext at most 20 words) are the outer limit.
   - Sections: headline of 8 words or fewer, sub-line of 25 words or fewer (S0650 4.9).
   - Screens and page: about 80 words per screen, and at most 450 visible words for the default version set.
   - Judge it by counting rendered innerText per section. Heavy text was the v4 rejection reason, so treat a result above budget as a fail.

7. Banned in v5 (consolidated):
   - Eyebrows of any kind; tracked all-caps or small-caps labels; a single italic, bold or coloured word inside a heading.
   - Em dashes and en dashes anywhere visible, including alt text; middle-dot meta strings; arrows glued to link text.
   - Section-number labels (01 / 02, "Step 1", "Phase 01"); scroll cues; decorative status dots; pills or labels laid over photos; photo-credit decoration; locale, weather or time strips; hero-bottom text strips like "ROOFING. SIDING. GUTTERS."; floating corner sub-text; split headers.
   - Three equal cards; icon-tile cards; nested cards and double-bezel shells; left-border accent cards.
   - Accordion FAQ by default; 3-card dotted testimonial carousels; logo-wall theater.
   - Purple or blue gradients; indigo hexes (`#6366f1` and the rest); `#3B82F6`; radial blob lights; glass everywhere; mono micro-labels; fake browser windows; emoji icons.
   - Lorem; the AI copy words ("Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve", "Tapestry", "Revolutionize", "In the world of..."); exclamation marks; "Oops"; Title Case headings; "Quietly trusted by"; poetic labels like "From the field".

8. Palette: extract it, don't default to it. Take colours from the real logo and photos first (S0650 11.C), then build one dominant tone, one accent and one neutral system, all as `:root` tokens (Hallmark Floor 1).
   - Lock the accent across the page and cap it at about 2 visible uses per screen (S0659). Saturation below 80%. No pure `#000` or `#fff`.
   - Don't use the AI clusters: `#F4F1EA` + `#D97757`, the beige/brass/espresso hex list, near-black with acid green, `#0B0B0B`/`#111` as black.
   - One theme for the whole page. A single deliberate theme switch is allowed once, with a strong transition (S0650 4.11).

9. Typography. Two families at most: one expressive display face and one restrained body face.
   - Never Inter, Roboto, Arial, Helvetica, Open Sans, Space Grotesk, Fraunces or Instrument Serif.
   - A serif is only allowed with a written reason that names the specific face (S0650: heritage or family firm). Rotate it from the S0650 pool.
   - Embed fonts as subset woff2 with `font-display: swap`. Body 16px or larger. Headings one weight and one colour. Tabular figures for 4.9, 295, 1995 and the phone number. Italic descender clearance of 1.1 or more. `text-wrap: balance` on headings.
   - H1 at most 2 lines on desktop, sized roughly `clamp(3rem, 5vw, 5.5rem)` in a wide container. CTA labels on one line, 1-3 words.

10. CTA system: two intents, one label each, identical in the nav, hero, sections, footer and mobile bar.
    - Call: a `tel:+19377467377` link showing "(937) 746-7377". Estimate: for example "Get a free estimate". No synonyms ("Request a quote", "Contact us", "Let's talk") because those fail No Duplicate CTA Intent.
    - Both visible at 1280x800 without scrolling (Hallmark 12), and usable before the GSAP intro finishes (S1320).
    - One primary CTA per section (S0220). A final CTA where the eyes end, at the bottom of the page (S0247).
    - A fixed mobile call bar (S0098) that never covers content or focus (S1314).

11. Estimate form honesty. Label above each input; no placeholder-as-label; error below the field and linked with `aria-describedby`; inline validation on blur; all 8 states; inputs 16px or larger to stop iOS zoom.
    - The success copy says what happens next without an exclamation mark, using only real facts (for example a reply during office hours, Mon-Fri 9-5). Never promise a response time nobody gave.
    - A single HTML file may have no form endpoint. If so, the form must say so honestly (Hallmark: "a form that posts nowhere yet") and never fake a "sent" state.

12. Custom cursor, built to answer every skill objection.
    - Enable it only under `(hover: hover) and (pointer: fine)`. Never on touch. Hide it on window blur and visibility change. Keep the native caret in inputs and textareas.
    - Move it with transform-only rAF and no layout reads each frame. Under reduced motion it becomes a static ring or switches off.
    - Each state matches the element's job: "call" on the phone CTA, "estimate" on the estimate CTA, "view" or "expand" on photos, a drag handle with `cursor: grab`/`grabbing` semantics on the before/after control, a snap state on the 1|2|3 picker, plain on body text.
    - Cursor labels are `aria-hidden`. The real accessible name lives on the element.

13. Motion must explain something. Write a one-sentence reason for every ScrollTrigger: hierarchy, storytelling, feedback or state transition (S0650 5).
    - Good subjects: the old roof becoming the new one, the before/after, the truck arriving at the ranch, the version switch. Bad: identical fade-ups on every section, scale-on-hover by reflex, more than one marquee.
    - Pins follow the canonical skeletons: `start: "top top"`, `pin: true`, scrub; horizontal pans use `end: () => \`+=${distance}\``, `scrub: 1`, `invalidateOnRefresh: true`. No scroll listeners. Animate transform and opacity only; never `transition: all`.
    - Easing: ease-out curves such as `cubic-bezier(0.23, 1, 0.32, 1)` or `(0.16, 1, 0.3, 1)`; never ease-in on UI. Hover 150ms, press 60-100ms with `scale(0.97)`, version switch 200-300ms.
    - Sticky stories must not trap the user longer than their content deserves.
    - Prefer native scroll. If Lenis is used, it is the only engine, it is wired to ScrollTrigger, and it is bypassed under reduced motion.

14. Static first frame, no-JS and reduced motion. Content is visible with scripting off, so hidden start states are applied only after JS adds a class (Hallmark 7, S1314). Under reduced motion, final states render immediately; shortening durations alone does not count (S1320). Pins, scrub, parallax, the cursor and WebGL all switch off, and posters replace the canvas.

15. Layered parallax depth from real photos only.
    - Separate depth planes come from the photos themselves: sky, house and roof, truck, yard sign. These can be cut out of the real images, which is S1320's "transparent PNG cutouts" applied to the firm's own photos.
    - Parallax never moves text that is being read. Transforms stay bounded. Mobile and reduced motion get a flat composition.
    - Blur only on fixed layers. Grain only on one fixed, pointer-events-none layer.
    - The Z-Axis Cascade (S0647), Zoom Parallax and Curtain-Reveal hero (S0650 10) are candidate patterns.

16. Interactive SVG with a job. Candidates:
    - Masks or clip-path reveals over real photos.
    - A roofline that draws itself, traced from the actual ranch or Tudor photo.
    - Hotspots on the Tudor job.
    - A real 4.9/295 rating graphic: a number plus a small mark, with no filled-track progress bar.
    - A schematic estimate showing line items as a diagram of how the written estimate is structured, not invented prices.
    Banned: blob or wave backgrounds, drawn houses, and approximated Owens Corning or BBB marks. Use official assets if supplied, otherwise plain-text credentials (S1314).

17. WebGL only where it earns its place. One canvas with one job (S1320), for example a displacement transition between the paired real photos, where it explains change.
    - Write raw WebGL in a few KB rather than Three.js, because of the single-file size budget (S0650 6.E).
    - Cap DPR, pause when offscreen or hidden, avoid per-frame allocation, dispose resources, and handle context loss.
    - An `<img>` poster sits underneath. No shader used as background ambience.

18. The before/after pair is not pixel-aligned, so a naive wipe slider would expose the misregistration. Either calibrate a per-image transform (scale, translate, rotate) and mask around the roof, or use a cross-fade or flip that admits the reframing.
    - "Before" and "After" are functional state labels on the control, or captions outside the photo. They are not decorative pills on top of it (S0650 9.F).
    - Give every photo one consistent grade and deliberate crops that keep the subject safe at each breakpoint (S1314).

19. The 1|2|3 picker, judged as a feature.
    - Each of the 3 versions of a section is a different layout family. Any combination across sections must still show at least 4 families in 8 sections, never 3 image+text splits in a row, and never two sections in the same family (S0650 4.7).
    - All versions keep the same facts, CTA labels and business logic (S0220 Cure 5). Version 1 is the recommended default (S0613).
    - The control is an accessible radiogroup or tablist: arrow keys, `aria-checked` or `aria-selected`, 44x44 targets, focus visible.
    - A switch animates as a state transition, then calls `ScrollTrigger.refresh()`. A remembered choice is a per-viewer convenience only.
    - Run the mirror test on each version: would a neighbouring roofing site get this? If yes, change one decision.
    - Using the digits 1|2|3 is fine here because the owner asked for it and it is a control. It must stay quiet chrome, not a numbered eyebrow.

20. Section plan from the buying journey, not the template. Aim for 6-9 sections including the hero and footer (Hallmark).
    - Ban both default runs: "Hero -> Features -> Pricing -> FAQ -> CTA" and "hero, logo wall, metrics, bento, testimonials, FAQ, CTA" (S0659, S1314).
    - Order the page by the task (S0247): orient (who and how to call), see the work (real photos), trust the family (team photo, Bunk, Wade, Rachel, credentials, rating), understand the estimate (line-item), then act (call or estimate) at the end.
    - Alternate tight and breathing sections so the layout has tension (S0659 P2).

21. Hero spec.
    - Full-bleed real photo with layered depth. Left-weighted or asymmetric composition (anti-center bias at variance above 4).
    - Text: headline, one sentence and two CTAs only. No trust strip, stats, tagline or avatars in the hero; trust goes in the section directly below it (S0650 4.7, S0624).
    - Top padding of 6rem or less. Nav on one line at 64-72px, `flex-wrap: wrap`, floating and detached (S0647). Blur only if the nav is fixed.
    - A composed GSAP intro, with copy readable before it finishes.
    - Preload the LCP image, and size it so LCP stays under 2.5s.

22. Trust presentation. Credentials appear as facts or real badges only, logo-only with no category captions underneath.
    - At most one count-up, on the real 4.9, with the final value already in the markup (S0659 allows "a number that counts up"; S1314 forbids drama without support).
    - Team photos stand for real people; never initials or silhouettes (S1320). Name people in the photo only if we know who is who.
    - Add one real-time semantic state at most, such as office open now, computed from Mon-Fri 9-5 Eastern. That is the one permitted "real availability" dot (S0650 9.F).

23. Production floor. The page must stay fast and accessible, so check:
    - `overflow-x: clip` on html and body; never `hidden` or `100vw`. `scrollWidth - clientWidth = 0` at 1440, 1280, 1024, 768, 390 and 375.
    - Responsive work: `min-height: 100dvh`; `minmax(0, 1fr)` and `min-width: 0` on image grids and display heads; container capped at 1200-1440px; mobile collapse declared for every section.
    - Accessibility: WCAG AA (4.5:1 body, 3:1 large and UI); 44x44 targets; skip link; landmarks; no skipped heading levels; instant `:focus-visible`; split-text headings keep an unsplit accessible name; meaningful alt text on every photo.
    - Head and Web Vitals: favicon from the logo; title, description and og:image meta. CLS under 0.1 (explicit aspect ratios) and INP under 200ms.

24. Judging protocol for v5.
    - (a) Render screenshots at 375, 390, 768, 1024, 1280, 1440 and 1920, and judge the pixels.
    - (b) A fresh-eyes judge that did not build the page hunts collisions, tangents, lopsided weight, missing focal points and any width that breaks (S0247).
    - (c) Mechanical counts: zero em and en dashes, zero eyebrows, CTA labels per intent equal to 1, marquees 0-1, words per screen, accent uses per screen.
    - (d) S0650 Pre-Flight boxes and the S0220 7-axis gate, every axis 4 or more.
    - (e) A DFII score per direction.
    - (f) An S1306-format audit against the owner's four complaints, P0-P3, 5-8 findings, ending with the single biggest removal.
    - (g) The S0659 screenshot test.
    Treat balance and alignment metrics as signals and never sand down deliberate asymmetry. Overflow, contrast and tap size are blocking gates.

25. Owner acceptance criteria, mapped to his four complaints.
    - "Too much text": word budget met (item 6).
    - "Read like a document": no section reads as stacked heading plus paragraph, and imagery leads every viewport.
    - "Not fun": each section has one thing to touch or play with (drag, reveal, switch, hover response), plus the cursor.
    - "Animation used poorly": every animation has its one-sentence reason, and no motion-theater cluster appears (S1314).
    The voice stays plain and local, with one detail only someone who knows the firm would include (for example that Rachel answers the phone), which is S0659's "soul" test.

---

## Reading log

Read in full, every line of the main text:
- S0001 frontend-design, lines 1676-1749.
- S0223 frontend-design, lines 101206-101487.
- S0217 redesign-existing-projects, lines 98605-98807.
- S0220 anti-slop-design, lines 100679-101073.
- S0650 open-design/taste-skill, lines 244195-245403. Sections 0-14 in full, with code skeletons 5.A-5.C. Appendices A-C (install commands per design system, canonical source links, Apple Liquid Glass approximation) were read but left out of the notes as unrelated. Sections 2.A, 3.A-3.B and 12-13 (design-system packages, React/Next/Tailwind stack, block-library schema, out-of-scope list) were read and only summarized briefly, since v5 is a single vanilla HTML file.
- S0647 open-design/soft-skill, lines 243747-243847.
- S0624 open-design/gpt-tasteskill, lines 226397-226473.
- S0641 open-design/redesign-skill, lines 243311-243491. Read in full; summarized as its differences from S0217, because the rest of the text is the same.
- S0613 open-design/creative-director, lines 225724-225783. This is only a catalogue entry.
- S0471 nutlope/hallmark, lines 161691-161846.
- S1314 no-ai-design-slop, lines 422232-422658, including the reference files ARTICLE.md (pattern library, all 10 sections plus clusters and vocabulary) and REFERENCES.md (link list).
- S1306 audit-ai-design-slop, lines 420540-420701, including REFERENCES.md (the same link list).
- S0659 anti-ai-slop, lines 249616-249705.
- S1320 build-awwwards-quality-sites, lines 424007-424079. The final lines are a category header for the next group.
- S0098 bencium-impact-designer, lines 60134-61409, including all three reference files: ACCESSIBILITY.md, MOTION-SPEC.md and RESPONSIVE-DESIGN.md. Its Styling Implementation section (shadcn, Tailwind, Phosphor React, sonner) was read and noted as not applicable to a single-file vanilla build.
- S0247 design-spatial, lines 107834-108103.

Not available in the library, so not read:
- Hallmark's referenced files: references/gates.md, flow.md, brand-truth.md, anatomy.md, macrostructures.md, layout.md, imagery.md, craft.md, genres, themes and their index, patterns.md, direction.md, redesign.md and the other references; scripts sloplint.mjs, theme.mjs and capture.mjs. Their rules are cited only by number in the skill (for example 38i, 44b, 46a).
- The upstream creative-director bundle, including its 3-axis rubric and 5 phases.
- design-spatial's layout-audit.js, analyze.py and asym.html, which the skill itself says are not bundled.

Nothing was installed, executed or registered. Commands that skills mention (sloplint, theme.mjs, npx, npm, the upstream open link) were not run.
