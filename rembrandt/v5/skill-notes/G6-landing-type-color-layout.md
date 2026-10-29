# G6: Landing, conversion, typography, colour and layout skill notes

Working notes for the Rembrandt Roofing & Restoration homepage, v5. Source: `/root/.claude/uploads/43c9e22a-5230-526e-a737-ae81faad601a/5682dcd4-WEB-SKILLS_2.md`. I read the library as reference material only. Nothing from it was installed, run or registered.

Brand facts used below: blue `#184098`, grey swoosh `#7a8088`, display/text face Epilogue (variable wght), phone (937) 746-7377, written estimate request.

Measured brand values (computed with OKLab math and the WCAG 2 and APCA formulas, not estimated):

| Colour | OKLCH | Notes |
| --- | --- | --- |
| `#184098` brand blue | `oklch(0.402 0.151 262.981)` | Chroma is 75% of the sRGB max at that L and H |
| `#7a8088` swoosh grey | `oklch(0.597 0.014 255.549)` | A cool tinted neutral, 7.4° from the brand hue |

| Pair | WCAG 2 | APCA Lc |
| --- | --- | --- |
| white on `#184098` | 9.44:1 | -95.6 |
| `#184098` on white | 9.44:1 | 91.2 |
| `#7a8088` on white | 3.98:1 | 67.2 |
| `#7a8088` on `#f6f4ef` (warm paper) | 3.62:1 | 60.7 |
| `#184098` on `#0f0f0f` | 2.03:1 | fails |
| `#7a8088` on `#184098` | 2.37:1 | fails |
| `#7a8088` on `#0c1222` | 4.68:1 | -33.8 |
| `#abc3f0` (blue 300) on `#0c1222` | 10.48:1 | -69.2 |
| white on `#0c1222` | 18.66:1 | -107.2 |

---

## S0356 elayadesign/landing-page-design

**Core rule:** "A landing page is not a homepage... A landing page wins one intent: one offer → one audience → one primary action." Do Part A (strategy) before Part B (visuals). Scope: "When the user's explicit prompt conflicts with a rule, the user wins."

**A1 Intake:** the ONE primary action, the offer, what counts as a conversion; the ICP, their problem, the "Top three objections", traffic source, prior knowledge; proof (logos, testimonials, numbers, case studies), guarantees; voice, direction, mobile priority. If something is missing, "make a reasonable assumption, state it in one line, and continue."

**A2 Structure.** Above the fold (required): 1 headline, "outcome plus audience"; 2 subheadline, "clarifies how and adds specificity"; 3 primary CTA, "clear verb plus what they get"; 4 "One proof signal, logo strip, stat, or short testimonial"; 5 hero visual. Mid page: problem to solution (one section); benefits, "three to five, outcome driven"; how it works, "three steps"; social proof. Bottom: FAQ, "six to twelve questions"; risk reversal; final CTA, "identical to the top". The B11 tagline reveal goes in the mid page, "typically right after the hero or after benefits".

**A3 Layouts:** A classic hero plus sections; B long-form story; C minimal conversion page; D comparison page. "Pick one and say why."

**A4 Conversion:** match the message to the traffic source; "Never place competing CTAs above the fold"; benefit first; be specific ("Cut your weekly reporting from 4 hours to 15 minutes", not "Save time and streamline"); reduce risk with at least one of free trial, free plan, no card, cancel anytime or a guarantee; treat objections as a section; "Put proof directly beside the claim it supports."

**A5 Copy formulas:** "{Outcome} without {pain}"; "The {category} for {audience}"; "Ship {result} in {time}". The subheadline is one or two sentences. CTA: "Verb plus what they get. Never 'Learn more' or 'Submit'." Benefit bullets: bold benefit, then the proof or detail.

**A6 Build order:** Hero, Benefits, How it works, Proof, FAQ, Final CTA, built section by section. "Never rebuild the whole page on each iteration."

**B1 Type.** Use Geist, Manrope, Geist Mono or Poppins. Never use Inter, Roboto, Arial, Open Sans or Helvetica. "Never use italic fonts." "One typeface per site." "Never use ultra bold weights (900 / black). Cap at semibold or bold." "No hyphens in text." "No orphaned words": `text-wrap: balance` on headings and `pretty` on body. Sizes snap to the Tailwind scale ("closest step below"): xs 12/16, sm 14/20, base 16/24, lg 18/28, xl 20/28, 2xl 24/32, 3xl 30/36, 4xl 36/40, 5xl 48/1, 6xl 60/1, 7xl 72/1, 8xl 96/1, 9xl 128/1. Main buttons are `text-base` (16px) semibold; header buttons are `text-sm` (14px) semibold.

**B2 Spacing (only these):** 0, 2, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 px. Main buttons get "8px vertical padding, 12px horizontal padding".

**B3 Radius:** Tailwind values only. Nested shapes with a gap under 32px use "inner radius = outer radius − gap", applied only when the result is above 2. Example: `rounded-2xl` 16px outer with 8px padding gives an 8px inner radius.

**B4:** no single-sided card borders; "Never use gradients in backgrounds." Dark backgrounds come only from `#000000 · #181818 · #1F1F1F · #272727 · #313131 · #131209`.

**B5 Hero:** heading text gets a left-to-right gradient, dark `#FFFFFF → #9B9B9B` or light `#000000 → #666666`. Heading and subheading get a "max width of 680px". Break lines "where the thought breaks".

**B6 Icons:** Phosphor, Solar or Iconamoon; never Material.

**B7 Motion.** Base curve `cubic-bezier(0.22,1,0.36,1)` with 500ms for layout and position changes. Hover colour and opacity changes get 300ms, "never shorter than 200ms". Never use `ease`, `linear` or `ease-in-out`. Animate transform and opacity only. Under reduced motion, use "a plain opacity change". Nav: a compact floating bar, centred, sized to its content, translucent over a blur. The menu icon morphs between states. The mobile menu is a full-height panel. Menu links rise 24px while fading, "60ms after the previous one", with the sequence capped at 400ms. Scroll reveals rise 32px and fade "over 600 to 800ms", once only, via IntersectionObserver, never an unthrottled scroll listener.

**B8 Realism:** real copy, specific names, non-round numbers. Banned words: "revolutionize", "supercharge", "cutting edge", "effortless", "transform your workflow", "take it to the next level", "harness the power", "world class". Use sentence case. Confirmations are calm and specific. Errors say what failed and what to do next. "No exclamation marks."

**B9 States:** hover; active `scale(0.98)` or `translateY(1px)`; visible focus; skeleton loaders, not spinners; empty; inline errors, "Never window.alert()". No dead links, and the current nav item is marked.

**B10 Ship list:** privacy and terms links, branded 404, client-side validation, skip link, cookie consent where required, favicon, title, meta, og:image, alt text, semantic landmarks.

**B11 Tagline reveal (mandatory):** one big-type benefit section, separate from the hero, at least two lines, `text-4xl` to `text-6xl`. Words start at "roughly 25 to 35% opacity" and each word moves to full colour "one at a time as they cross a trigger line", on the base curve.

**Conflicts to flag:** its font list excludes Epilogue (the user's choice wins). The gradient heading text conflicts with S0627, which bans gradient text. The background-gradient ban conflicts with the photo washes in S1358 and S0627.

## S0449 MengTo/landing-page

This is the upstream of S0356 Part A: same intake, structure, layout types A to D, strategies, formulas, workflow, SEO/AEO, pitfalls and output format. There is no visual system.

- Opens with "A landing page is not a homepage. A homepage serves multiple intents." Rembrandt's page is a homepage that the owner wants to behave like a landing page, so pair it with S0226's homepage guidance ("positioning + audience routing").
- Above the fold, "must": headline (outcome + audience), subheadline (clarifies "how" + adds specificity), primary CTA (clear verb + what they get), one proof signal, hero visual. Mid page: problem to solution, benefits (3–5, outcome-driven), how it works (3 steps), social proof. Bottom: FAQ (6–12), risk reversal, final CTA (same as top).
- "Avoid weak CTAs: 'Learn more', 'Submit'." Examples: "Start free trial", "Book a demo", "Get the checklist".
- Benefit bullet format: a bold benefit, then proof or detail, for example "Faster iteration: generate 3 layout variants in one click".
- Rule: "don't rebuild the whole page each time. Iterate section-by-section to keep control."
- SEO: index evergreen offers, give them a clear title and meta, internal links, "FAQ in plain Q/A for AEO", and optionally FAQ schema.
- Quick questions: the ONE primary CTA; the ICP and main pain; available proof; the offer and risk reversal; the traffic source.
- Pitfalls: too many CTAs above the fold, a vague value proposition, a feature list without outcomes, proof hidden at the bottom, mobile readability breaking, no clear next step.
- References file: the Corey Haines copywriting SKILL.md and Google's FAQPage structured-data docs (both external links, not followed).

## S0226 page-cro

**Phase 0:** record the goal, audience, source, baseline and data. Mark missing evidence "as unknown". Value proposition, goal focus, message match, trust, friction and objections are "qualitative prompts, not a calibrated 0–100 score". "No invented threshold."

**Phase 1:** page type (Homepage is one option). "Exactly one primary goal", with "Secondary goals explicitly demoted". Traffic context: organic (which intent?), paid (which promise?), email, referral or direct.

**Phase 2, analysed "in impact order":**
1. Value proposition and headline: what problem, for whom, why this over alternatives, what outcome. Failures: vague positioning, features without benefits, "Cleverness over clarity".
2. CTA: primary "Visible above the fold", "Action + value oriented", appropriate commitment level. "One primary action", secondaries "clearly de-emphasized", "Repeated at decision points".
3. Visual hierarchy: a clear reading path, emphasis on key claims, enough whitespace, "Supportive (not decorative) visuals".
4. Trust: relevant to the audience, "Specificity (numbers > adjectives)", "Placement near CTAs".
5. Objections: price/value, fit, time to value, implementation complexity, risk of failure. Answer them with FAQs, guarantees, comparisons and "Process transparency".
6. Friction: "Excessive form fields", slow loads, mobile issues, confusing flows, unclear next steps.

**Phase 3:** every recommendation maps to a diagnostic category, a conversion constraint and "a measurable hypothesis".

**Output:** a readiness summary (baseline, gaps, constraint with confidence); quick wins (low effort, high confidence, no test needed); high-impact changes (test them); testable hypotheses (hypothesis, what changes, expected behaviour, primary metric); "2–3 alternatives" for headlines, subheads and CTAs, each with a rationale.

**Page types:** "Homepage: positioning + audience routing"; "Landing pages: message match + single CTA".

**Guardrails:** low traffic, an unclear value proposition or an ambiguous goal means "Fix fundamentals first." Never invent a conversion lift.

**Questions:** current rate, sources and intent, what happens after the page, heatmaps or recordings, past experiments.

## S0018 landing.csv

The columns are No, Pattern Name, Keywords, Section Order, Primary CTA Placement, Color Strategy, Recommended Effects, Conversion Optimization, Pattern ID and Aliases. I read all 34 rows. These are the rows that fit an image-led trade homepage:

- **32 Hero-Centric Design.** Order: "Full-bleed Hero (headline + visual) > Single value prop strip > Key benefit or proof > Primary CTA". CTA: "Hero dominant (center/bottom) + Sticky nav CTA". Colour: "High-impact visual. Minimal text. Verify CTA label text against the button fill at 4.5:1 minimum; use 7:1 only for an explicit AAA normal-text target." Conversion: "Let the hero dominate the initial viewport without hiding the next content cue." Under reduced motion: "static hero and non-pulsing CTA".
- **33 Trust & Authority + Conversion.** Order: "Hero (mission/credibility) > Proof (logos, certs, stats) > Solution overview > Clear CTA path". CTA: "Contact Sales / Get Quote (primary) + Nav". Colour: "Navy/Grey corporate. Trust blue. Accent for CTA only." This matches the blue and grey logo almost exactly. Effects: logo carousel, stat counters, testimonial strip. Conversion: "Low-friction form", with pause and stop on carousels and keyboard previous/next.
- **21 Before-After Transformation.** Order: "Hero (problem state) > Transformation slider/comparison > How it works > Results CTA". Colour: "muted/grey (before) vs vibrant/colorful (after)". Required: "Provide arrow buttons and keyboard steps so dragging is not required."
- **10 Scroll-Triggered Storytelling.** Order: intro hook, then chapters for problem, journey and solution, then a climax CTA, with a mini CTA at the end of each chapter. "Keep the narrative understandable without scroll-driven effects. Use progress indicator. Mobile: simplify animations." Under reduced motion, show each chapter in its final readable state.
- **2 Hero + Testimonials + CTA.** "Social proof before CTA." "Use a concise set of verified testimonials with photo, name, and role." Carousels need previous/next and pause controls, stop on focus, hover and reduced motion, and announce slide position. Its "Quotes: Italic" clashes with S0356's no-italics rule.
- **9 Video-First Hero.** Use an overlay "strong enough for text contrast", captions, a visible pause, a static poster under reduced motion, and pause when offscreen.
- **26 Portfolio Grid.** For a project gallery: "Visuals first... Fast loading essential", lazy-load reveal, hover overlay, lightbox.
- **27 Horizontal Scroll Journey.** "Scroll-jacking (careful)". "Preserve a normal vertical navigation path."
- **17 Immersive/Interactive.** "Provide skip, keyboard, reduced-motion, and non-3D fallback paths."
- **Shared rule across rows:** counts and ratings appear "only when current, verified, and dated"; pause motion "offscreen/hidden"; reduced motion renders "the final state".

## S0612 open-design/copywriting

**Library content:** a catalogue stub only. "Write and rewrite marketing copy for landing pages, homepages, and ads. Useful as a copy chief partner during launches." Curated from Corey Haines; upstream `coreyhaines31/marketingskills`, category `marketing-creative`. Its "How to use" says to install the upstream bundle. Per the brief, I did not install it, open it or run the `open` command it shows. There are no rules in the library text.

Copy rules gathered from other skills in this set, to stand in for it:
- Formulas (S0356, S0449): "{Outcome} without {pain}"; "The {category} for {audience}"; "{result} in {time}".
- Hero headline "should usually read like 5-10 strong words, not a paragraph" (S0627).
- CTA = verb + what they get; never "Learn more" or "Submit".
- Banned words, combined: revolutionize, supercharge, cutting edge, effortless, transform your workflow, take it to the next level, harness the power, world class (S0356); unleash, elevate, next-gen, seamless, powerful solution, transformative platform (S0627).
- Sentence case. No exclamation marks (S0356). S0100 allows one per long document; take the stricter rule. "Ampersands: correct in proper names only", so "Rembrandt Roofing & Restoration" is correct but body copy says "and".
- Specific beats vague; specific numbers only when they are real.

## S0630 open-design/marketing-psychology

**Library content:** a catalogue stub only. "Apply psychological principles and behavioral science to copy and design. Useful for tightening hooks, framing, and pricing presentation." Same upstream and the same install instruction, which I did not follow. There are no rules in the library text.

Psychology-grade rules that do exist in this set, to use instead:
- Isolation effect: one element differs and is remembered (S1435).
- Risk reversal: "Pick at least one" (S0356 A4). For a roofer that means a real warranty, a no-obligation written estimate, or licence and insurance, and only if true.
- "Specificity (numbers > adjectives)" and "Placement near CTAs" (S0226).
- "Social proof before CTA" (S0018 row 2); "Put proof directly beside the claim it supports" (S0356).
- No fabricated scarcity: claim limited seats or live status only when verified and timestamped (S0018 rows 12, 20, 23, 24).
- "a feeling curve with one engineered peak" (S1502). Pair it with S0627's rule that the final section closes on "a single strong CTA + supporting trust cue".
- Repeat the CTA "at decision points" (S0226).

## S1435 von-restorff-effect

- Principle: "An item that differs from its surroundings is more likely to be noticed and remembered." Homogeneity is the baseline and deviation draws the eye.
- It only works when "One (or very few) items deviate", the "Surrounding items are visually consistent with each other", and the "deviation is meaningful, not decorative". "If everything is differentiated, nothing is."
- Applications: CTA, "One filled/primary button; all others ghost or text"; pricing, highlight one tier; nav, the active state is distinctly different; tables, a row highlight; notifications, an accent "reserved for actionable items only"; onboarding, one step at a time.
- Avoid: several competing highlighted elements; decorative pops ("random pops of color train users to ignore them"); colour alone ("pair with shape, size, or weight").
- Practices: "Decide in advance what the single most important element per screen or section is". Audit for "isolation inflation". Keep the element distinct in hover, focus and disabled states. "differentiation should survive grayscale."

## S1442 form-design

- **Layout:** "Single column: almost always correct." Field width reflects the expected input length (a postcode field is narrow). "Top-aligned labels." Group related fields by proximity.
- **Labels:** "Every field has a persistent label", never placeholder-only. Sentence case, no ALL CAPS. Helper text "below the label, above the field". "mark optional, not required." Show character counts always, not only near the limit.
- **Input types:** short text, text input; long text, textarea "with visible resize"; one of ≤5 options, radio buttons, all visible; one of 6+, select or combobox; several of few, checkboxes; date, a picker or segmented inputs, "never a freeform text field"; phone and card numbers, a "Formatted text input with masking"; password, with a show/hide toggle.
- **Validation:** "validate on blur... not on every keystroke". Errors go "directly below the field, not at the top". Messages explain the fix: "Email address must include @" not "Invalid email". Use a subtle checkmark only where correctness is non-obvious. Server errors appear inline, with a summary at the top if several fields fail.
- **Multi-step:** a clear progress indicator, steps that are completable units, back navigation without data loss, saved progress, and a confirm before discarding.
- **Accessibility:** a programmatic label (`<label for>` or `aria-label`), errors tied to fields with `aria-describedby`, focus order that follows visual order, an error summary that is focusable and links to each field, and never colour alone.
- **Best practice:** "Remove every optional field you can: fewer fields = higher completion." Default to the most common answer. Measure field-level abandonment. Add a review step for high-stakes forms.

## S0661 form-validation

**Input state machine:** `pristine` (no chrome) → `dirty` (typing, no error yet) → `touched` (blurred, constraint runs) → `invalid-after-touched` (show the error, linked via `aria-describedby`) → `invalid-after-submit` (also manage focus) → `recovering` ("Re-validate on input, not on next blur") → `submitting` ("Disable submit, announce status via a polite live region") → `server-error` (use the server's text). Errors "never appear from pristine or plain dirty". CSS `:user-invalid` matches the invalid-after-touched and invalid-after-submit states for free.

**Timing (Baymard 2024: "31% of sites have no inline validation, and most of the rest fire too early"):**
1. The first blur after an edit runs the field constraint.
2. Once a field is invalid, re-validate on `input`.
3. On submit, parse the schema and move focus to the error summary (`tabindex="-1"`, heading-led, no `role="alert"`) or to the first invalid field.
4. Background async checks debounce 250–500ms and never freeze the form. Submit awaits the server.

**Platform floor:** `required`, `type` (email, url, number, tel), `pattern`, `min`/`max`, `minlength`/`maxlength`, `step`. Call `setCustomValidity()` on both `input` and `change`. "Empty string clears setCustomValidity." "form.requestSubmit() honors validation; form.submit() skips it." For ZIP codes use `<input type="text" inputmode="numeric" pattern="[0-9]*">`, never `type="number"`. `:user-invalid` is Baseline 2023 (Chrome 119, Firefox 88, Safari 16.5).

**Error wiring:** the baseline is `<label>` + `aria-describedby` + `aria-invalid` + `role="alert"` on inline errors. Adaptive messages: "98% of audited sites use generic catch-all errors"; ship "4-7 distinct messages per high-traffic complex field" such as phone and postal code. WebAIM 2026: missing labels on "51% of the top 1M home pages". The summary is rendered and then focused; it is never `hidden` when focused. Preserve user input on error ("34% of audited checkouts wipe" the card field).

**novalidate:** pattern A renders without `novalidate` and sets `form.noValidate = true` after JS loads. Pattern B ships `novalidate` only when the server validates without JS. Either way, keep `required`, `pattern` and `type`.

**WCAG:** 3.3.3 suggests the fix in text; 3.3.4 adds reversibility or confirmation for legal or financial submissions; 3.3.8 never blocks paste.

**Lint:** styling `:invalid` (red on load); validating per keystroke; generic errors; `role="alert"` on the focused summary; `aria-busy` on the submit button (use `disabled` plus a polite status instead); email-confirm fields; `setCustomValidity(null)`. I skimmed the schema-stack (React/Zod) and native mobile sections because they don't apply to a single HTML file.

## S1376 editorial-service-booking

**Journey:** 1 "Open with one strong portrait or place image and a short statement of craft." 2 Build trust with "environment, process, and practitioner evidence rather than generic badges." 3 Compare services in one calm media-and-copy stage. 4 Show results or proof "only when real". 5 Move into location, time and confirmation "without changing visual language".

**Visual system:** "warm ivory paper and near-black chapters"; an elegant high-contrast serif with compact sans labels; "hairline rules, minimal radius, editorial crops, and generous whitespace"; sparse uppercase nav; "black for decisive actions; use one muted accent only for selection or status"; avoid glossy cards, glass, loud gradients and ornament.

**Page composition:** the header shows essential routes, location and one booking action. The hero is a cropped documentary image with a big statement. A "slow text loop" is allowed only when it carries real positioning. About layers two or three photos with captions. Treatments pair a tab list with a reserved media stage. A dark chapter holds verified results. Locations show address, hours, accessibility and contact before booking. "Footer: prioritize operational information over marketing filler."

**Selector:** `tablist`/`tab`/`tabpanel`, arrow keys plus Enter and Space, details kept in the DOM, "Reserve stage dimensions and preload only the next likely image", announce the selection without repeating the panel, an expanded static list under reduced motion, and no hover-only behaviour.

**Booking:** native controls, persisted choices, "Never claim a slot before server confirmation". Design loading, empty, disabled, stale, invalid, failure, retry and success states. Return focus to the right field after an error.

**Motion:** "160–220ms for controls and 500–760ms for section entrances"; the loop is "slower than 14 seconds" and pauses offscreen; "one layered photo reveal"; shallow transforms; "reserve exact final layout pixels"; reduced motion renders the final state immediately.

**Validate:** keyboard and touch on mobile, a stale slot, failed media, a server error, no layout shift, 200% zoom, tab order, and confirmation that every person, place and review is real or licensed.

**Avoid:** dense tables before desire exists, hover-only previews, fake reviews or credentials, "Auto-advancing carousels, frantic motion".

## S1502 scroll-craft

**Library content is the description only** ("only the description is available for this skill"). I checked: the body ends at line 443301 and the next heading (S1503 humanizer) is at 443302. Everything the library offers:

- Purpose: "Build premium scroll-driven landing pages."
- Plan the visitor journey and "pick one of eight page grammars": filmic one-shot, chaptered editorial, live surface, continuous world, typographic poster, gallery or catalog, split stage, rhythmic cutlist.
- "write a feeling curve with one engineered peak".
- "invent one signature move that exists on this site alone".
- "pass a fingerprint gate against earlier builds (differ on at least 4 of 6 dimensions: grammar, nav, hero, act sequence, close, signature move)".
- "Create dimensional heroes with independent planes and a separate mobile composition."
- "Taste floor": "4px scale, two font families, six colour roles plus one accent, tinted secondary text, no identical cards".
- "verify by scrolling every position (dead scroll, cues that never peak, composited contrast, reduced motion, 360x640)".
- Use it at four stages: the start (brief, grammar, journey, feeling curve); the section challenge (device variety, signature move); hero and surface work (depth planes, taste floor); the final review ("cold feel check").
- It points to `skills/new/README-NEW-SKILLS.md` for kit overrides ("cursor effects allowed, no external generation, single-file template"). That file is not in the library.

Use for v5: run the fingerprint gate against v4 (the rejected version). Also use it to make the 1|2|3 versions of each section genuinely different, not three skins of one layout.

## S0074 better-typography

**Measured (always findings):** "Unitless line-height, weight 400 or heavier below 18px, a 60–75 character measure, 16px inputs on iOS and tabular-nums on changing values." Letter-spacing, pairing and ratios are heuristics. "Never propose a new typeface... unless the task asks."

**Fonts:** "Rarely use more than three fonts." "Pair for contrast." Weights 100–300 belong "at 28px and up". Load every face used, because synthesis distorts. Write `font-weight: 650`, not `font-variation-settings: "wght" 650`. Leave `font-optical-sizing` at `auto`. Reserve raw tags for custom axes or features (`"ss01" 1`).

**Scale:** a small semantic set, each size paired with a line-height and weight. Headings descend with level. Reference starting scale: Display 2.25rem/1.1/600, Title 1.5rem/1.2/600, Heading 1.125rem/1.3/600, Body 1rem/1.5/400, Caption 0.8125rem/1.4/400. "Emphasis within a role is one weight step up (400 → 500)."

**Line-height:** "Display text 1.1, headings 1.2–1.3, body copy 1.5–1.6", unitless. "Anything that wraps to three or more lines needs at least 1.4."

**Tracking:** "Headings at 24px and up take -0.01em to -0.02em. Uppercase labels at 14px or smaller take 0.05em. Body copy stays at 0." Use em. `font-kerning: none` is never a fix.

**Measure:** 60–75 characters, "roughly between 560px and 680px" at 16px (`max-w-xl` 576px, `max-w-2xl` 672px, `max-w-prose` 65ch).

**Wrapping:** `balance` on headings, "Chromium ignores it past six lines"; `pretty` on paragraphs; `overflow-wrap: break-word`; `white-space: nowrap` on labels and badges; `text-align: start`.

**Numbers:** `tabular-nums` on "timers, counters, prices".

**Punctuation:** curly quotes, en dashes in ranges, `…`, `&nbsp;` in "10 km". Store text in natural case and use `text-transform`.

**Underlines:** `text-underline-position: from-font; text-decoration-thickness: from-font`. Only the colour animates reliably.

**iOS inputs:** under 16px they zoom. Fix A: `text-base sm:text-sm`. Fix B: keep 16px and `scale(0.8125)` for a 13px look.

**Floors:** body 16px; inputs and menus 14px; captions 13px; "rarely go below 12px"; sizes in rem.

**Root:** `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale` once. Set `lang`. `text-box: trim-both cap alphabetic` in buttons (Chromium 133+, Safari 18.2+). Decorative text in CSS. Don't put `user-select: none` on text.

**Severity:** HIGH means unreadable text, clipping at 320px or 200% zoom, or truncation with no way back. Reference files read: choosing-fonts (woff2; Display vs Text cuts), css-cheat-sheet, details-and-accessibility, spacing-and-sizing, variable-fonts-and-opentype (`font-synthesis-weight` and similar longhands; "At one or two weights, static files can be smaller"), wrapping-and-punctuation.

## S0667 typography (craft rules)

- **Scale:** "multiplicative scale (1.2 or 1.25). Cap at 6–8 sizes per artifact." Roles: Display 48–72px; H1 32–48; H2 24–32; H3 20–24; Body 15–18; Small 13–14; Caption 11–12.
- **Leading:** Display/H1 (≥32px) `1.0`–`1.2`; Body `1.5`–`1.6`; Small `1.5`. The CJK overrides don't apply.
- **Letter-spacing, "No exceptions":** body 14–18px `0`; small 11–13px `0.01em` to `0.02em`; UI labels and buttons `0.02em`; "ALL CAPS `0.06em` to `0.1em` (required)"; headings 32px+ `-0.01em` to `-0.02em`; display 48px+ `-0.02em` to `-0.03em`. "ALL CAPS without positive tracking looks cramped and amateur. Display text without negative tracking looks loose and weak." The 0.06em floor cites Bringhurst's 5–10% of the em.
- **Pairing:** "Maximum 2 typefaces per artifact (display + body, or one variable face used at multiple weights)." Always declare a fallback chain. "Never set font-family: system-ui alone on a heading."
- **Line length:** "50–75 characters", `max-width: 65ch`.
- **Three-weight system:** "Read (400 / 450)" for body; "Emphasize (510 / 550)" for labels and nav; "Announce (590 / 600)" for headlines and buttons. "Weight 700+ is rarely needed."
- **Lint:** caps under 0.06em; display without negative tracking; "More than 3 type sizes visible above the fold"; serif and slab without a role split; justified body copy.

## S0665 typography-hierarchy-editorial

- Editorial means "entry point, tension, rest, disruption, resolution": compositional, "some are deliberately suppressed so others can breathe".
- **Dramatic jumps:** display 3–5× body. Display/lede 56–96px; deck 18–24px; body 16–18px; pull quote 28–40px; caption/label 11–13px. "A small step here reads as SaaS."
- **Whitespace carries hierarchy:** the display element gets "minimum 2× the line-height in space above and below". Space is the default section break; rules and dingbats only reinforce identity.
- **Restrained bold:** the display is often light or regular, with "One to two bold phrases per 400 words".
- **Display tracking:** at 56px+, `-0.02em` to `-0.05em`.
- **Pull quotes:** 28–40px, regular or light, `-0.01em`, break the column, no box or border; one per page, two at most; may carry the accent.
- **Body:** 60–70ch, leading `1.6`–`1.7` for serif, no justify.
- **Asymmetric rhythm:** "Dense section → spacious section → medium section." Lint: "one gap ≥ 1.5× baseline rhythm while another is ≤ 1.2×".
- **Table:** display 56–96 light/regular, -0.02 to -0.05em, leading 1.0–1.1; deck 18–24 regular, 1.4–1.5; byline 12–14, 0.02–0.04em; body 16–18, 1.6–1.7; caption 12–13, 0.01em, 1.5; section label 11–12 medium, 0.06–0.1em caps.
- **Lint:** "display/deck ratio ≥ 1.5× or absolute px delta ≥ 24 px"; "`var(--accent)` used ≤ 2 times on the full editorial surface".
- **Anti-pattern:** "Bold display reads as billboard advertising." For a bold trade brand that billboard energy may be the intent. Choose it deliberately and document why.

## S1433 typography-scale

- **Sizes** (ratio-based, for example "1.25 major third, 1.333 perfect fourth"): Caption 12px; Body small 14px; Body 16px (base); Subheading 20px; H3 24px; H2 32px; H1 40px; Display 48–64px.
- **Weights:** 400, 500, 600, 700.
- **Line height:** tight 1.2 (headings), normal 1.5 (body), relaxed 1.75 (long-form).
- **Tracking:** tight -0.02em (large headings), normal 0 (body), wide 0.05em (uppercase labels, captions).
- **Pairing roles:** primary for UI and body, an optional secondary for headings, mono for data.
- **Responsive:** "Scale down heading sizes on mobile"; keep body at 16px minimum; 45–75 characters.
- **Practice:** "Limit to 4-5 sizes in regular use"; test with real content; document usage rules per style.

## S0100 ui-typography

From Butterick's *Practical Typography*. Enforcement is the default: apply every rule silently.

- **Characters:** curly quotes `&ldquo;&rdquo;&lsquo;&rsquo;`; apostrophes are `&rsquo;` (watch for '70s). Hyphen for compounds, en dash for ranges, em dash for breaks; never `--`. A single `&hellip;`. `&times;` and `&minus;`. Foot and inch marks stay straight (`6&#39;&nbsp;10&quot;`): this matters for shingle and pitch specs. Real `&copy;` `&trade;` `&reg;`; "© is inline, followed by &nbsp; then year". JSX warning: `’` renders literally in JSX text.
- **Punctuation:** "Exclamation points: overused, budget ONE per long document". "Ampersands: correct in proper names only." No emoji in professional UI.
- **Spacing:** one space after punctuation; `&nbsp;` before numeric references and after honorifics.
- **Formatting:** "Bold OR italic. Mutually exclusive." "Sans serif: bold only." Never underline, except links: `text-decoration-thickness: 1px; text-underline-offset: 2px`. "All Caps: Less Than One Line, Always Letterspaced", "5–12% letterspacing", `letter-spacing: 0.06em`. Real small caps only. Web point size "15–25px"; use `clamp()`. Kerning always on (`"kern" 1; text-rendering: optimizeLegibility`). Tabular figures for data. Max 2 fonts.
- **Layout:** "Body text first": font, size, line spacing and line length. "Line Length: 45–90 Characters", `max-width: 65ch`. "Line Spacing: 120–145%", `line-height: 1.2` to `1.45`. Left align; centre only titles under one line. Paragraphs take an indent or a space, never both (space `margin-bottom: 0.75em`). Headings: max 3 levels, not all caps, not centred, space above > below, `hyphens: none`, bold not italic, "Smallest point-size increment needed". Rules 0.5–1pt; tables borderless with a hairline under the header.
- **Responsive:** "The rules don't change with screen size." Always set `max-width` on text. `font-size: clamp(16px, 2.5vw, 20px)`. Mobile `padding: 0 1rem`.
- **Screen:** "Dark mode: reduce weight slightly" (template uses `font-weight: 350`, `-webkit-font-smoothing: auto`).
- **Template values:** body `line-height: 1.38`; h1–h4 `line-height: 1.15`, weight 700; h1 `1.5em` with margin `2.5em 0 0.5em`; h2 `1.25em`; h3 `1.1em`; `.caps` 0.06em; small caps 0.05em; blockquote `0.92em`/`1.3`; `hr` 1px at opacity 0.3; breakpoints 600, 900 and 1200 for body 17, 18 and 19px. Read both references (css-templates, html-entities).
- **Conflict:** "smallest increment" headings contradict S0665's dramatic jumps. Use dramatic scale for display moments and Butterick's restraint for anything that reads as running text.

## S0023 typography.csv (74 pairings)

Columns: No, Font Pairing Name, Category, Heading Font, Body Font, Mood/Style Keywords, Best For, Google Fonts URL, CSS Import, Tailwind Config, Notes. I read all 74 rows.

**Epilogue in this file:** it appears only once, as the body face of row **57 Gen Z Brutal (Anton + Epilogue)**, keywords "brutal, loud, shouty, meme, internet, bold", URL `family=Anton&family=Epilogue:wght@400;500;600;700`. Tastemaker's warm pairing (Epilogue + Baskervville, per G1 notes) is not in this CSV. The CSV URL requests static weights. For the variable axis, request a range (`family=Epilogue:wght@100..900`; verify the range on Google Fonts), or self-host the variable woff2 for a self-contained file.

**Rows suited to a bold, premium, trustworthy trade brand, excluding faces on impeccable's overused list:**

| Row | Pairing | Google Fonts names | Why it fits | Notes from the CSV |
| --- | --- | --- | --- | --- |
| 49 Sports/Fitness | Barlow Condensed + Barlow | `Barlow Condensed`, `Barlow` | Signage and workwear energy, condensed impact | "Condensed for impact headlines. Regular Barlow for body." |
| 7 Bold Statement | Bebas Neue + Source Sans 3 | `Bebas Neue`, `Source Sans 3` | Billboard caps for one huge word | "Bebas Neue for large headlines only. All-caps display font." Single weight. |
| 16 Corporate Trust | Lexend + Source Sans 3 | `Lexend`, `Source Sans 3` | Trust and readability | "Lexend designed for readability. Excellent accessibility." |
| 57 Gen Z Brutal | Anton + Epilogue | `Anton`, `Epilogue` | Pairs a condensed display with the chosen Epilogue | "Anton is impactful and condensed. Good for stickers/badges." The tone is "shouty, meme": risky for premium. |
| 29 Legal Professional | EB Garamond + Lato | `EB Garamond`, `Lato` | Heritage authority, for a "family firm" serif accent | "EB Garamond for authority." |
| 32 Real Estate Luxury | Cinzel + Josefin Sans | `Cinzel`, `Josefin Sans` | Property and architecture, premium caps | "Cinzel's elegance for headlines." |
| 50 Luxury Minimalist | Bodoni Moda + Jost | `Bodoni Moda`, `Jost` | Premium high contrast | Better for luxury than for a trade brand |
| 48 Accessibility First | Atkinson Hyperlegible | `Atkinson Hyperlegible` | Maximum legibility for form text | 400 and 700 only |

**Excluded as overused (G2 impeccable list):** rows with Playfair, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, DM Sans, Outfit or Plus Jakarta Sans (1, 3, 4, 8, 9, 11, 12, 13, 14, 17, 18, 20, 31, 39, 41, 44, 54, 56, 58, 59, 63, 66, 67, 68, 70, 71, 72, 74). Rows built on Inter, Roboto or Open Sans (2, 5, 14, 55, 60, 61, 64, 65) are excluded by S0356's ban.

**Recommendation:** keep Epilogue as the single variable family, which satisfies S0356's one-typeface rule and S0667's "one variable face used at multiple weights". If a second voice is wanted, use Baskervville (the tastemaker pairing) for one pull quote, or Barlow Condensed for numerals and labels.

## S0071 better-colors

- **Principles:** never report contrast you didn't measure. Perceived lightness means OKLCH L. Match the project's notation; for a new system "oklch() is the best default". The system is ramps: "One neutral ramp, one accent ramp and only the status ramps the product actually renders." Every step has a job. Primitives are named by hue (`--blue-600`) and never used in components; semantics are named by role. Use a token only in its role. Hold the hue across the ramp. "One color, one meaning", treating anything "within 15° of OKLCH hue as the same color". "Fill exactly one action per view": put the colour on the background, not the label. Measure the rendered pair. Default gradients to `in oklab`; use `in oklch` when the middle greys out.
- **WCAG 2:** text 4.5:1 AA, 7:1 AAA. Large text ("at least 24px or 18.67px bold") 3:1 AA, 4.5:1 AAA. UI and graphics 3:1. Logos and disabled controls are exempt.
- **APCA:** body Lc 75, preferred 90; labels and headlines Lc 60; large text (36px regular or 24px bold) Lc 45; fine icons Lc 45; solid icons and UI Lc 30; dividers Lc 15; placeholders aim for Lc 30. "Positive means dark text on a light background."
- **Fixing:** "Change lightness first." A background near L 0.75 caps even black text at about Lc 60. The WCAG neutral crossover is near L 56%; at `oklch(65% 0 0)` black is 6.49:1 and white 3.23:1. Test translucent headers against the lightest and darkest content behind them. "Text over images... Measure the worst region, or guarantee one with a scrim."
- **Brand step:** buttons and links use "the solid-fill step, 600 in Tailwind and 9 in Radix". "Pin a contractually fixed brand color." "Never quietly darken the brand."
- **Ramp properties:** even L; constant hue; vividness peaks mid-ramp; light-end steps (50–200) "about 0.04–0.05 apart", mid-ramp "about 0.07–0.10"; adjacent steps under 0.03 apart are redundant; both ends stop short of pure black and white. Use culori, colorjs.io or chroma.js; never compute by eye.
- **Several hues:** same L per step; vividness as "the same proportion of what its own hue reaches".
- **Dark mode:** not a reversal. Lower the vividness, separate the dark end more, recheck every pair. Use one switching mechanism (`prefers-color-scheme`, a `.dark` class, or `light-dark()` with `color-scheme`).
- **Structure:** neutral ramp ×1 ("Carries 80–90%"), accent ×1, status 0–4. Role steps: page bg 50, component bg 100, hover, selected and subtle border 200, border and focus 300, hovered border 400, solid fill 600, solid hover and low-contrast text 700, high-contrast text 900. Fill sits on 600 because "white text on most Tailwind 500 hues fails 4.5:1". Tinted neutral: "OKLCH chroma 0.005–0.02 at the accent's hue". Warm neutrals read approachable and editorial; cool ones read technical; "hold it across the whole ramp". Status hues sit at least 15° from the accent.
- **Tokens:** naming grammar `--color-{bg|text|border}-{variant}-{state}` and `--color-{accent|danger|…}-{subtle|border|solid|text}-{state}`. One word per concept: `text`, `bg`, `border`, `accent`. Reserve `primary`. The role inventory covers surfaces (page, surface, raised, sunken, overlay scrim), text (primary, secondary, disabled, inverse, on-accent), borders (subtle, default, strong, focus ring, separator) and accent (subtle, border, solid, solid hover, text).
- **Increased contrast:** widen the gap by at least 0.15 L per appearance and aim for Lc 90.
- **Gamut:** declare the sRGB value first, then P3 inside `@media (color-gamut: p3)`. "Banding shows up on large areas": add noise. `color-mix()`, relative colour syntax and `light-dark()` resolve at render time, so measure the result.

## S0660 color (craft rules)

- **Layers:** neutrals "70–90%"; accent (one) "5–10%", "never invent a second accent"; semantic "0–5%"; effect (gradients, glows) "<1%".
- **Accent discipline:** "At most 2 visible uses of `--accent` per screen. Typical pair: one eyebrow / chip + one primary CTA." "Links count as accent." "Hover/focus rings count as accent."
- **Contrast gates:** body (≤16px) 4.5:1; "Large text (>18 px or 14 px bold)" 3:1; UI components 3:1. This large-text definition is looser than WCAG's 24px / 18.67px bold in S0071 and S0490. Use WCAG's.
- When the brand clashes, "darken the accent to a 600-level shade for text use; reserve the brand-bright variant for fills only".
- **Dark themes:** background `#0f0f0f` (not `#000`), foreground `#f0f0f0`; light background `#fafafa`, foreground `#111111`. Dark-surface borders are "1px `rgba(255,255,255,0.08)`".
- **Naming:** by purpose (`--accent`, `--success`), "bad: `--blue-500`". Reconcile with S0071: hue names are fine as primitives only.
- **Anti-defaults:** indigo `#6366f1` is "the most reliable AI-slop tell". The "Two-stop 'trust' gradient (purple → blue, blue → cyan...) on a hero" is the second. Decorative gradients "should separate hierarchies... not decorate empty space."

## S0413 jakubkrehel/oklch-skill

- **Why OKLCH:** perceptual uniformity, stable hue, independent chroma, a finite gamut. Syntax `oklch(L C H / alpha)`: L 0–1, C 0 to ~0.4, H 0–360. Format L and C to 3 decimals and H up to 3, drop trailing zeros, write `-0` as `0`. Baseline 2023, "96%+".
- **Key thresholds:** "L > 0.6 = light background → use dark text"; "Foreground L < 0.45 when background L > 0.85"; "Foreground L > 0.75 when background L < 0.25"; "> 10° spread across palette steps = visible drift"; "APCA normal text |Lc| >= 60 to pass, >= 75 for pass+"; "Contrast fix: Adjust L only".
- **APCA table:** normal text Lc 60 / 75; large text 45 / 60; UI 30. Its note that "positive means light text on dark background" is the reverse of S0071 and of my computed values (brand on white = +91.2). Trust S0071's sign.
- **Gamut at L=0.5 (sRGB):** purple H≈285, C≈0.29; red-orange H 0–30, C≈0.20; cyan H≈195, C≈0.09. Clamp example: `oklch(0.7 0.35 150)` → `oklch(0.7 0.22 150)`. Fallback order: hex, then `@supports (color: oklch(0 0 0))`, then `@media (color-gamut: p3)`.
- **Palette algorithm:** `delta = 0.4`, `minL = max(0.05, baseL - delta)`, `maxL = min(0.95, baseL + delta)`; distribute L evenly; `C = (chromaPercentage / 100) * maxChroma` per step. 9 steps is the default (50, 100, 200, 300, 500, 700, 800, 900, 950). Applied to the brand blue (L 0.402), this gives a lightest step of only L 0.802, too dark for a page tint. Use S0071's role-based light end instead.
- **Multi-hue:** same L and same C% (examples: `--blue-500: oklch(0.623 0.141 250)`, `--green-500: oklch(0.623 0.157 145)`, `--red-500: oklch(0.623 0.202 25)`, all at 80% of max).
- **Dark mode:** reverse the mapping (S0071 calls this only the starting point).
- **Review output:** a Before/After table that includes every changed colour.
- **Tailwind v4 `@theme`** example ramp at hue 250: 50 `0.971 0.012`, 100 `0.932 0.028`, 200 `0.882 0.048`, 300 `0.812 0.078`, 400 `0.722 0.148`, 500 `0.623 0.188`, 600 `0.535 0.168`, 700 `0.445 0.138`, 800 `0.362 0.108`, 900 `0.289 0.078`, 950 `0.215 0.048`.

## S1418 color-system

- **Layers:** 1 brand palette ("Primary, secondary, and accent colors with full tonal scales (50-950 or equivalent)"); 2 neutral greys for text, backgrounds, borders and surfaces; 3 semantic colours, success (green), warning (amber), error (red) and info (blue), "Each with background, foreground, border, and icon variants"; 4 extended (data viz, illustration, gradient definitions).
- **Accessibility:** text "minimum 4.5:1 contrast (AA) or 7:1 (AAA)"; large text "minimum 3:1"; UI components "minimum 3:1 against adjacent colors"; "Don't rely on color alone."
- **Relationships:** tint and shade scales per hue; complementary pairs for contrast; analogous sets for harmony; neutral pairings for text and surface.
- **Practices:** "Generate full tonal scales, not just single swatches"; test every foreground and background pair; give usage guidance per colour; test for colour blindness; "Include dark mode mappings from the start."
- **Conflicts:** this skill suggests secondary brand colours and an info blue. S0660 says one accent only, and S0071 says a status hue within 15° of the accent is the same colour. For Rembrandt, an info blue would collide with the brand blue (H 263), so drop it.

## S0073 better-layout

- **Group with space, not lines:** "The gap between groups is at least 2× the gap within one" (8px inside means 16px+ between). Order of tools: negative space, then background shapes, then separators ("low-contrast hairline", never alongside a big gap).
- **Controls:** keep controls distinct from content, with a background shape, border, underline or consistent zone. A non-clickable badge styled like a button "collects dead clicks".
- **Edges:** align to a small set of shared edges, with one spacing step per nesting level ("16px is a useful default"). Use logical properties (`margin-inline-start`, `text-align: start`). Order by importance, with DOM order matching visual order (no `order` or `row-reverse` reordering).
- **One primary action per view;** more than 3 secondaries go behind a menu.
- **Hidden content:** cue it ("let the next item peek 16–32px"). Peek formula: item width = `100%` + gap − peek, for example `flex: 0 0 calc(100% - 12px)` with a 12px gap, a 24px peek, `scroll-snap-type: x mandatory` and `scroll-padding-inline: 24px`.
- **Clearance:** 12px between bordered or filled controls; 24px between the glyphs of borderless controls; 24px+ between unrelated groups.
- **Edges and bleeds:** inset full-width buttons about 16px on mobile, with `padding-bottom: calc(16px + env(safe-area-inset-bottom))`. "Content bleeds, controls float": media goes to the viewport edges while text and controls stay inside margins and safe areas. `env(safe-area-inset-*)` needs `viewport-fit=cover`. Set `scroll-padding-block-start` to the sticky header height. Full-bleed pattern: `grid-template-columns: 1fr min(65ch, calc(100% - 48px)) 1fr`, with `.full-bleed { grid-column: 1 / -1; }`.
- **Breakpoints** come from content, not presets; prefer container queries for components. Test the smallest and largest sizes first. Size text containers with `max-width` and `min-height`, never fixed sizes. Never let a critical action clip.
- **Lint:** `minmax(0, 1fr)` and `min-width: 0` on flex children; `width: 100%`, not `100vw` ("includes the scrollbar"); `100dvh`, not `100vh`; `min-height`, not fixed `height`, on text boxes; `@container` in reusable components.
- **Severity:** HIGH means clipping or overlap at 320px or 200% zoom, or hidden content with no cue.

## S1428 layout-grid

- **Columns:** "Typically 4 (mobile), 8 (tablet), 12 (desktop)".
- **Gutters:** "16px, 24px, or 32px typical".
- **Margins:** "16px mobile, 24-48px desktop".
- **Breakpoints:** "e.g., 375, 768, 1024, 1440px".
- **Grid types:** column; modular (columns + rows); baseline ("Vertical rhythm alignment (4px or 8px)"); compound (overlapping grids).
- **Responsive behaviour:** fluid (columns stretch), fixed (max-width centred), adaptive (distinct layout per breakpoint), column dropping.
- **Patterns:** full-bleed, contained, asymmetric (sidebar + main), card grids with auto-fill.
- **Practices:** consistent gutters and margins; "Align content to the grid, not arbitrarily"; test every breakpoint; document the specs; "Allow intentional grid-breaking for emphasis."
- **For Rembrandt:** the 16px mobile margin matches the build's 16px side gutter. Grid-breaking moments, such as a photo bleeding past the column, belong to the signature or second-read moment (S0627, S1502).

## S1432 spacing-system

- **Base unit:** "typically 4px or 8px". Scale: 2xs 2px, xs 4px, sm 8px, md 16px, lg 24px, xl 32px, 2xl 48px, 3xl 64px.
- **Spacing types:** inset (padding inside containers: equal, squish or stretch variants), stack (vertical), inline (horizontal), grid gap.
- **Application:** related items take sm or md; distinct sections take lg or xl; page margins stay consistent per breakpoint; component-internal spacing is defined per component.
- **Density modes:** compact means "reduce spacing by one step"; comfortable is the default; spacious means "increase spacing by one step (for reading-focused)".
- **Practices:** "Always use the scale, never arbitrary values"; consistent spacing within components; larger gaps between unrelated groups; document intent; test across viewports.
- **For Rembrandt:** this 8-step scale tops out at 64px, too small for an immersive page's section rhythm. Extend it with S0490's 96, 128 and 192, or with S0106's fluid `--space-3xl` (4rem to 8rem). Keep the 4px base, which also satisfies S1502's "4px scale" taste floor.

## S1434 visual-hierarchy

- **Tools:** size ("Use size differences of at least 1.5x for clear distinction"), weight (bold, thicker strokes and filled icons are heavier), colour and contrast (strategic, for CTAs, status and emphasis), spacing (more whitespace means more importance), position (top-left in LTR, above the fold, F and Z patterns), density (isolated elements stand out; grouped elements scan as a unit).
- **Levels:** 1 primary (page title, primary CTA, seen first); 2 secondary (section headings, key content); 3 tertiary (supporting text, metadata); 4 quaternary (fine print, timestamps).
- **Patterns:** "Hero sections: large type + image + single CTA"; cards go image > title > description > action; forms go label > input > helper text > error; nav goes current > available > disabled.
- **Practices:** "Squint test: blur your eyes: hierarchy should still be clear"; "One primary action per view"; don't compete for attention; "Use hierarchy to tell a story through the page"; test with real users.
- **For Rembrandt:** the hero should resolve on the squint test to photo, then headline, then the single filled CTA, with the phone number as a clear second.

## S1358 image-first-grid-layout

- **Scope:** "the image should act as the stage, while the grid and content overlays give it product-grade structure." It is not a gallery and not plain editorial minimalism.
- **Visual target:** a large immersive background image filling "most or all of the viewport"; "dark gradient washes, directional overlays, or tonal vignettes" for readability; visible structure ("outer rails, center guides, and small corner markers"); content anchored "low in the viewport or along a deliberate edge"; a restrained palette with "one subtle accent derived from the image or brand".
- **Implementation:** a full-screen stage with the image as the base layer. A quiet visible grid scaffold. The headline and CTA in one anchored column, with "a secondary box for quote, proof, metric, or supporting narrative in another". Supporting cards "lightly framed and transparent or low-fill". Optional faint WebGL lines or slow parallax. "confident sans-serif headlines, soft low-contrast body copy". Motion favours "reveal and drift... masked text entrances, slow line movement, and gentle hover sweeps".
- **Patterns:** a full-bleed architectural image with "layered left-to-right and bottom-up dark gradients"; vertical rails with "tiny square markers"; bottom-anchored copy plus a proof box in an adjacent lane; a sparse transparent nav; buttons with "translucent dark fills, thin borders, and small moving highlight sweeps instead of loud color blocks".
- **Tuning knobs:** image dominance, overlay darkness ("until readability is strong without flattening the image"), grid visibility, technical atmosphere, content anchoring.
- **Avoid:** the image as decoration behind "a conventional centered SaaS layout"; overfilling; "Bright multi-color accents"; heavy solid containers; an invisible grid.
- **Demo prompt:** a Neuform "Kiwi Floral" reference; fidelity targets cover responsive layout, keyboard access and reduced-motion stability.
- **Conflict:** translucent ghost CTAs weaken S1435 and S0071's single filled primary. Keep the primary estimate CTA solid; the translucent style suits only secondaries.

## S0490 s0xDk/refactoring-ui

- **Spacing and sizing (base 16):** `4 8 12 16 24 32 48 64 96 128 192 256 384 512 640 768`. "No two adjacent values may be closer than ~25%." Fixed opacity set: `.05 .1 .2 .4 .6 .8`.
- **Type scale:** `12 14 16 18 20 24 30 36 48 60 72`. It argues against ratio-based modular scales, which contradicts S0667 and S1433. "Units: px or rem only. Never em" for the scale (em is fine for measure).
- **Weights:** "Two weights is enough": 400 or 500 for body, 600 or 700 for emphasis. Nothing below 400 in UI; de-emphasise with colour or size.
- **Colour:** "Greys: 8–10 shades", starting from very dark grey, not black. Primary 5–10 shades; accents 5–10 each. Naming: 100 to 900, base 500. Build order: 500 first (a button background), then 900 and 100, then 700 and 300, then the rest. It says "Write colors as HSL, not hex", which contradicts S0071 and S0413 (they prefer OKLCH). "Never generate shades at runtime."
- **Shadows:** `0 1px 3px`, `0 4px 6px`, `0 5px 15px`, `0 10px 24px`, `0 15px 35px`, all `hsla(0,0%,0%,.2)`. Pick by z-position.
- **Line-height:** inversely proportional to size, "small text / wide columns → 1.5 to 2", "large headlines → 1 is fine". Line length "45–75 characters, i.e. max-width: 20em–35em".
- **Radius:** pick one. "None = serious/formal"; large = playful; never mix.
- **Procedure:** feature first; grayscale first; choose by elimination (compare neighbours); "Start with too much white space and remove it"; design at ~400px first.
- **Hierarchy:** "Size isn't everything": use weight and colour. "Three text colors, maximum", all at 4.5:1 (the lightest is "roughly the middle of a 9-step ramp"). Emphasise by de-emphasising competitors. Actions: primary solid (usually one per page), secondary outline, tertiary link. Labels are a last resort ("12 left in stock"). Balance weight against contrast. "Visual hierarchy ≠ document hierarchy."
- **Hard rules:** 1 "Never grey text on a colored background"; 4 fixed widths for things that shouldn't scale; 5 "Large elements must shrink faster than small ones" (a 2.5em headline over 14px mobile body "wants to be 20–24px"); 6 more space around a group than within; 7 colour never the only signal; 8 large text is "24px regular or 18.66px bold", non-text 3:1; 9 never scale an icon far from its size.
- **Missing:** its referenced files (`assets/tokens.css`, `references/systems.md`, `diagnose.md`, `techniques.md`) are not in the library.

## S0106 responsive-design

- **Practices:** mobile-first; content breakpoints; fluid over fixed; container queries; real devices; optimise and lazy-load images; "Touch Targets: Maintain 44x44px minimum on mobile"; logical properties.
- **Common issues:** horizontal overflow, fixed widths, 100vh on mobile, small fonts, small targets, aspect ratios, z-index.
- **Breakpoints:** Tailwind sm 640, md 768, lg 1024, xl 1280, 2xl 1536; Bootstrap 576, 768, 992, 1200, 1400; minimalist 600 and 1024. Content-based examples use 50rem and 65rem. Tokens: `--breakpoint-*`, `--container-*`.
- **Hero pattern:** `min-height: 50vh` going to 70vh (768) and 80vh (1024); title `clamp(2rem, 5vw + 1rem, 4rem)`; subtitle `clamp(1rem, 2vw + 0.5rem, 1.5rem)`; content max-width 60%, then 50%.
- **Fluid type (details.md):** `--text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)`, `--text-2xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem)`, `--text-4xl: clamp(2.25rem, 1.75rem + 2.5vw, 3.5rem)`. In fluid-layouts.md, `--text-5xl: clamp(3rem, 1.8rem + 6vw, 5rem)`, with leading tight 1.25, normal 1.5, relaxed 1.75. Formula: `slope = (max - min) / (maxVw - minVw)`, `intercept = min - slope * minVw`, output `clamp(min, intercept rem + slope*100 vw, max)`; defaults 320 to 1200 (or 1280).
- **Fluid space:** `--space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem)`, `--space-xl: clamp(2rem, 1.5rem + 2.5vw, 3rem)`, `--space-2xl: clamp(3rem, 2rem + 5vw, 5rem)`, `--space-3xl: clamp(4rem, 2.5rem + 7.5vw, 8rem)`.
- **Containers:** `min(100% - 2rem, 65rem)` and similar. Grids: `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`.
- **Images:** `<picture>` art direction (wide, medium and mobile crops), hero `loading="eager" fetchpriority="high"`, others `loading="lazy"` with `srcset` 400w, 800w and 1200w, and `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"`. Hero aspect: `1` on mobile, `4 / 3` at 640, `16 / 9` at 1024.
- **Viewport units:** `100dvh`, `100svh` (hero minimum), `100lvh`; safe-area padding.
- **Preferences:** reduced motion (`animation-duration: 0.01ms !important`); `prefers-contrast: high` (2px borders); `prefers-reduced-data: reduce` (hide hero video, show image); print styles.
- **Container queries:** `container: card / inline-size`; units `cqi` (`clamp(1rem, 4cqi, 2rem)`); prefer `inline-size` (size containment costs more); support Chrome 105+, Firefox 110+, Safari 16+.
- **Layout primitives:** switcher `flex-basis: calc((30rem - 100%) * 999)`, with-sidebar, cluster. Note: its `.full-bleed { width: 100vw }` contradicts S0073; use the grid full-bleed pattern instead. I skimmed the React and table examples.

## S0627 open-design/imagegen-frontend-web

This is an image-generation skill, so I skipped its "one image per section" output rules. Rembrandt uses real photos. I kept its art-direction rules.

- **Dials:** DESIGN_VARIANCE 8, VISUAL_DENSITY 4, ART_DIRECTION 8, IMPLEMENTATION_CLARITY 9, IMAGE_USAGE_PRIORITY 9, SPACING_GENEROSITY 8, LAYOUT_VARIATION 8, CONVERSION_DISCIPLINE 8.
- **Brief mapping:** "cinematic / atmospheric / premium / luxury / bold" means Giant Statement hero; full-bleed image with tonal overlay, soft radial vignette or micro-noise gradient; "bottom-left over background image, centered low, image-as-canvas".
- **Hero:** left text with a right image is "the most overused AI pattern". Prefer "Centered statement over full-bleed image (text in lower 40%)", bottom-left or bottom-right over the image, top-left lead, stacked centre, image-as-canvas, inverted classic, off-grid offset, or mini minimalist. "headline should usually read like 5-10 strong words". Avoid pills, fake stats, badges and tiny logos in the hero. Type: "medium / normal / light elegance, tight tracking, controlled line count, strong scale contrast". Avoid "gradient text as a lazy premium effect" and "6-line startup headings".
- **Per-section composition anchors:** centred statement; top-left lead with support bottom-right; bottom-left text over image; bottom-right CTA cluster; left-third caption with a right two-thirds visual ("use sparingly, never twice in a row"); the inverted version; centred low; off-grid offset; stacked centre; image-as-canvas.
- **Background modes:** solid with inline asset; texture; full-bleed image with tonal overlay; editorial side-image (50/50, 60/40, 40/60); image as the entire visual; flat block plus detail crop; cinematic tonal gradient; graded photo; duotone; radial vignette plus crop; micro-noise gradient; colour-blocked diptych.
- **CTA variants:** pill, ghost, underlined link with arrow, banner, oversized headline with a tiny CTA hint, caption CTA. "The page's primary action stays unmistakable."
- **Variety gate (§18):** reject if "the same composition anchor repeats more than 2 sections in a row", "the same background mode repeats more than 3 sections in a row", or no full-bleed section appears. Include "at least one full-bleed... and at least one mini minimalist section". "deliberately vary foreground/background intensity at least twice (lighter → richer → calmer)". Use "at least two distinct image crops" (macro detail plus contextual environment).
- **Section size variety:** mix large art-directed, mini minimal and medium sections, but keep "spacing between sections... controlled and fairly even".
- **Continuity:** "same palette and accent logic", one type family and scale, one CTA family, one radius language, one image treatment (grade, framing).
- **Narrative spine (pick one):** artifact, journey, tool or precision instrument, living system, stage, archive. "Second-read moment": exactly one, for example "one oversized punctuation or numeral serving structure" or "a macro crop that carries brand color naturally".
- **Palette:** "1 primary, 1 secondary, 1 accent (used sparingly for CTA / highlight), a neutral scale". "the image must tonally match the palette"; overlays keep text readable. Allowed gradients: "low-chroma palette-matched tonal gradients", "single-hue atmospheric grades behind hero photography", vignettes, noise. Banned: rainbow mesh, purple-to-blue, pink-to-orange, neon halos, gradient text.
- **Slop bans:** endless centred sections, cloned split blocks, glass without reason, "three identical stat columns", "'trusted by' ticker that is unreadable mosquito logos", banned words (above), fake brands.
- **Imagery:** images "are a core part of the frontend design language". Avoid "tiny useless thumbnails", stock clichés, "one single image and then a completely text-heavy rest of page".
- **Conversion:** "hook -> proof -> action"; the final section closes with "a single strong CTA + supporting trust cue". Run the §17 clarity check (21 questions, image-count items skipped).

---

## Applying it to Rembrandt v5

1. **One filled action per view.** In every desktop view, "Request a written estimate" is the only filled control: brand `#184098` with a white label, 9.44:1, Lc -95.6. The phone is the clear secondary: an outline or underlined `tel:+19377467377` link that shows "(937) 746-7377". On the mobile sticky bar, tap-to-call may take the fill and the estimate goes outline. Pick one per breakpoint, never both filled (S1435, S0071, S0226).

2. **CTA wording.** Use a verb plus what they get, in sentence case: "Request a written estimate", "Call (937) 746-7377". Never "Submit" or "Learn more". Add "free" or "no-obligation" only if the owner confirms it (S0356 A5, B8).

3. **Above the fold, five parts only.** A 5 to 10 word headline (outcome plus audience, for example Springboro and Miami Valley homeowners), one short line of support, the primary CTA plus the phone, ONE verified proof signal, and a full-bleed real roof photo. "More than 3 type sizes visible above the fold" is a lint failure (S0667, S0627, S0356 A2).

4. **Hero composition.** Don't open on left text with a right image. Use the Giant Statement scale with copy bottom-left in the lower 40%, over a full-bleed photo. Readability comes from a palette-matched navy wash (`linear-gradient(in oklab, …)` from blue-950 `#041337` at high alpha to transparent, running bottom-up and left-to-right). Measure the worst text region, not the average (S1358, S0627, S0071).

5. **Three versions per section must really differ.** Give each 1|2|3 option its own composition anchor and background mode. For example, the hero could be V1 bottom-left over full-bleed, V2 centred low or stacked centre, and V3 off-grid editorial or an inverted 60/40 side image. Across the page, follow S0627's gate (no anchor more than 2 in a row, no background mode more than 3 in a row, at least one full-bleed and one mini-minimal section). Also apply S1502's "differ on at least 4 of 6 dimensions" against v4.

6. **One family: Epilogue variable.** Load it as a variable woff2 with an explicit range and `font-display: swap`, and set weights with `font-weight`, never `font-variation-settings`. Use three working weights: 400 (text), about 550 (labels and nav) and 700 to 800 (display and buttons). Avoid 900 (S0356 B1). Don't load faces you don't use, and keep `font-optical-sizing: auto` (S0074, S0667).

7. **Display settings.** Use `line-height: 0.95` to `1.05` with tracking of `-0.03em` at 48px, tightening toward `-0.04em` at 96px and above (S0667: 48px+ at -0.02 to -0.03em; S0665: 56px+ at -0.02 to -0.05em). Use `text-wrap: balance` and break lines "where the thought breaks". Bold display is a deliberate billboard choice for a trade brand: record it as a decision, since S0665 warns against it.

8. **Fluid type tokens** (computed with S0106's formula, 360 to 1440px):
   - display `clamp(3rem, 1.3333rem + 7.4074vw, 8rem)`
   - tagline `clamp(2.25rem, 1.75rem + 2.2222vw, 3.75rem)`
   - h2 `clamp(2rem, 1.3333rem + 2.963vw, 4rem)`
   - h3 `clamp(1.375rem, 1.1667rem + 0.9259vw, 2rem)`
   - lead `clamp(1.125rem, 1rem + 0.5556vw, 1.5rem)`
   - body `clamp(1rem, 0.9583rem + 0.1852vw, 1.125rem)`
   - label `clamp(0.75rem, 0.7292rem + 0.0926vw, 0.8125rem)`

   The display shrinks 2.67× while body shrinks 1.125×, so "Large elements must shrink faster" holds (S0490 rule 5). Adjacent sizes differ by at least 1.5× (S1434). The display/lead ratio is 2.7× or more (S0665 needs at least 1.5×).

9. **Labels and small text.** Uppercase labels at 12 to 13px take `0.08em` (inside S0667's 0.06–0.1em, above S0074's 0.05em floor) at 500 to 600 weight. Any running text stays at 16px or larger, weight 400 or more, `line-height` 1.5 to 1.6, and at most 65ch, though v5 should have very little of it (S0074, S0100).

10. **Tagline reveal.** Use this mid-page section as the "fun" moment. Set one big benefit line (two lines or more) at the tagline size. Words start at 30% opacity and step to full colour one at a time as they cross a trigger line, on `cubic-bezier(0.22,1,0.36,1)`. Drive it with IntersectionObserver or rAF-throttled scroll. Under reduced motion, render it at full colour immediately (S0356 B11).

11. **Colour tokens, two tiers.** Primitives in OKLCH with hex fallbacks; the brand is pinned, not snapped. The brand sits at L 0.402, darker than a Tailwind 600, so pin it at the 700 lightness position and map the semantic `--color-accent-solid` to it.
    - Blue ramp at H 262.981: 50 `#f4f7fd`, 100 `#e1eafa`, 200 `#cbdaf6`, 300 `#abc3f0`, 400 `#83a6e9`, 500 `#5886e2`, 600 `#265ed7`, 700 `#184098` (brand), 800 `#102f74`, 900 `#092055`, 950 `#041337`.
    - Solid hover: 800 `#102f74` (white on it 12.49:1).
    - The light-end L steps are 0.04 and 0.05 apart (S0071). The 600 to 700 gap is uneven, as expected for a pinned brand.

12. **Neutral ramp from the swoosh.** The logo grey is already a tinted neutral (C 0.014 at H 255.5, inside the 0.005–0.02 band, 7.4° from the brand, so the same family). Build the neutrals on H 255.549, C 0.012: 50 `#f5fbff`, 100 `#edf2fa`, 200 `#e1e7ee`, 300 `#cfd5dc`, 400 `#a0a5ac`, 500 `#7a8088` (logo), 600 `#6d7279`, 700 `#51565c`, 800 `#363b41`, 900 `#1e2227`, 950 `#0e1217`. Keep the neutrals cool throughout. If a warm ivory paper is chosen instead (S1376), every neutral goes warm, never a mix (S0071).

13. **The swoosh grey is not a text colour on light surfaces.** `#7a8088` on white is 3.98:1 (on warm paper 3.62:1), so it fails body text. On white it passes only large text (24px+ or 18.66px bold), non-text UI at 3:1, and APCA headline use (Lc 67.2). Use neutral 600 `#6d7279` (4.85:1) or 700 `#51565c` (7.41:1) for secondary text. Never put grey text on the blue (2.37:1; S0490 hard rule 1).

14. **Dark chapters.** Use a brand-tinted near-black (`#0e1217` or blue-950 `#041337`), never `#000` (S0660). The brand blue fails as text there (2.03:1), so on dark surfaces it is a fill only. Accent text and links on dark use blue 300 `#abc3f0` (10.48:1 on `#0c1222`, Lc -69.2) or 200 `#cbdaf6`. Borders use `rgba(255,255,255,0.08)` (S0660).

15. **Accent rationing.** Allow at most two visible accent uses per screen: typically one primary CTA plus one eyebrow or an active state. Focus rings and links count (S0660). Headings stay neutral; interactive elements own the blue (S0071 "one color, one meaning"). If a whole chapter is a blue field (S0627 "Bold Studio Solid"), its CTA becomes a white fill with a navy label (9.44:1). Drop any info-blue status colour, since it would read as the brand. Status red and green sit well over 15° away.

16. **Version picker stays out of the brand colour.** Give the 1|2|3 control neutral styling with a distinct active state (shape plus weight, surviving grayscale, `aria-pressed` or a radio group), so it never competes with the estimate CTA as the isolated element (S1435, S0073).

17. **Spacing scale.** Use a 4px base: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192 (S0490 plus S0356; adjacent values at least 25% apart). Section padding uses `clamp(4rem, 2.5rem + 7.5vw, 8rem)` (S0106 space-3xl). The gap between groups is at least 2× the gap within (S0073). Vary the rhythm deliberately, with one section gap at least 1.5× base and another at most 1.2× (S0665), while keeping the overall cadence even (S0627 §10).

18. **Grid and bleed.** 4, 8 and 12 columns; gutters 16, 24 and 32; margins 16px on mobile and 24 to 48px on desktop (S1428). Photos bleed full width via `grid-template-columns: 1fr min(…) 1fr` with `.full-bleed { grid-column: 1 / -1 }`. Never `100vw`. Text and controls stay inside the margins and safe areas (`viewport-fit=cover`). Use `minmax(0, 1fr)` on tracks (S0073).

19. **Viewport and breakpoints.** The hero uses `min-height: 100svh` (or `100dvh`), never `100vh`, with a visible cue of the next section, such as a 16 to 32px peek or a scroll hint (S0018 row 32, S0073). Use content-driven breakpoints near 640, 768, 1024 and 1280. Verify at 320, 360x640 (S1502), 200% zoom and 1440+. Touch targets are at least 44x44 (S0106).

20. **Real-photo art direction.** Each section needs a photo with a structural job: proof, process or result. Use at least two distinct crops, a macro of shingles, flashing or workmanship plus the wide house in context (S0627 §18). Use `<picture>` crops: square on mobile, then 4/3, then 16/9 or 21/9 on desktop, with a separate mobile composition (S1502). Only the hero gets `fetchpriority="high"` and eager loading; all other images get lazy loading with `srcset` and `sizes` and a reserved `aspect-ratio` for zero CLS. One consistent grade across all photos (S0627 continuity). A before/after slider (S0018 row 21) needs arrow buttons and keyboard steps.

21. **Proof only when verified.** Show one proof signal above the fold, with proof beside the claim it supports and near the CTAs. Testimonials need a real name and town, with consent. Counts and ratings appear only if "current, verified, and dated". No "three identical stat columns" and no tiny-logo tickers. Certifications appear only if real, at a readable size (S0018, S0226, S0627). Use `tabular-nums` on any count-up numerals and on the phone number (S0074).

22. **Estimate form.** A single column with top-aligned persistent labels; mark optional fields, not required ones. Keep it to about five fields:
    - Name: `autocomplete="name"`.
    - Phone: `type="tel"`, `autocomplete="tel"`, masked to 10 digits.
    - ZIP: `type="text" inputmode="numeric" pattern="[0-9]*" maxlength="5" autocomplete="postal-code"`.
    - Service: radio buttons, all visible because there are 5 options or fewer; use the owner's real service list.
    - Optional note: a textarea with visible resize.

    All inputs are 16px or larger to stop iOS zoom (S1442, S0661, S0074).

23. **Validation behaviour.**
    - Validate on first blur, then re-validate on `input` while a field is invalid. Style `:user-invalid`, never `:invalid`.
    - Inline errors sit below the field, wired with `aria-describedby`, `aria-invalid` and `role="alert"`. Messages are specific ("Phone number needs 10 digits").
    - On submit, use `requestSubmit()` and focus a `tabindex="-1"` summary or the first invalid field.
    - While submitting, set `disabled` and post a polite live status. No `aria-busy` on the button.
    - Preserve input on error. Use pattern A for `noValidate`.
    - Never show "sent" before the endpoint confirms, and keep the `tel:` link visible as the fallback.
    - The success message is calm and specific, with no exclamation mark (S0661, S1376, S0356 B8).

24. **Motion budget.**
    - Base curve `cubic-bezier(0.22,1,0.36,1)`. Controls 200 to 220ms: S1376 allows 160ms, but S0356 sets a 200ms floor, so take the stricter floor. Hover colour up to 300ms. Section entrances rise 32px over 600 to 760ms, once.
    - Nav links stagger 60ms with a 400ms cap. Animate only transform and opacity, triggered by IntersectionObserver.
    - Loops (for example a service-area marquee) run slower than 14 seconds and pause offscreen. No auto-advancing carousels.
    - Under reduced motion every effect renders its final state (S0356 B7, S1376, S0018).

25. **Typographic hygiene in copy.**
    - Use curly quotes in testimonials and keep "Roofing & Restoration" as the proper name; use "and" elsewhere.
    - Write `&copy;&nbsp;2026`. Wrap the phone number in `white-space: nowrap` (its hyphen is data, not a sentence hyphen).
    - No em dashes in copy, consistent with S0356's no-hyphen rule. Foot and inch marks stay straight.
    - Set `-webkit-font-smoothing: antialiased` once on the root, and give links `text-underline-offset` with `from-font` thickness (S0100, S0074).

## Reading log

**Read in full (every line of the main text and all included reference sub-sections):**
- S0356, 137059–137495, including the credits and licence block.
- S0449, 157949–158169, including REFERENCES.md.
- S0226, 102458–102711.
- S0018, 19298–19342, all 34 rows.
- S0612, 225689–225723 (stub).
- S0630, 233490–233524 (stub).
- S1435, 439783–439827.
- S1442, 440201–440259.
- S0661, 249800–250026.
- S1376, 435332–435445, including REFERENCES.md and demo PROMPT.md.
- S1502, 443293–443301: the body ends there and the next heading, S1503, is at 443302, which I checked with grep.
- S0074, 40595–41201, with all six reference files.
- S0667, 251020–251147.
- S0665, 250661–250848.
- S1433, 439695–439741.
- S0100, 61667–62488, with css-templates.md and html-entities.md.
- S0023, 19728–19812, all 74 rows.
- S0071, 39370–40040, with all five reference files.
- S0660, 249706–249799.
- S0413, 151936–152370, with all four reference files.
- S1418, 438862–438899.
- S0073, 40227–40594, with both reference files.
- S1428, 439431–439468.
- S1432, 439653–439694.
- S1434, 439742–439782.
- S1358, 432822–432929, with the demo PROMPT.md.
- S0490, 171857–172129.
- S0106, 67073–69306, with breakpoint-strategies, container-queries, details and fluid-layouts.
- S0627, 232396–233385, all 21 sections.

**Read but not carried into the notes:**
- S0667's CJK overrides (no CJK text on the site).
- S0661's schema-as-contract section (React, Zod, Conform) and its native mobile parity table, beyond one line.
- S0106's React and Tailwind component code, print styles, responsive tables and the JS breakpoint hook, beyond the values noted.
- S0627's per-section image-count and generation output rules (§5, §19, §20), because the project uses real photos.
- S0100's print and code CSS.

**Could not read (not in the library):**
- S0612 and S0630 bodies: both are catalogue stubs that point to an upstream bundle I was told not to install.
- S1502's full instructions and its `skills/new/README-NEW-SKILLS.md` override file: only the description exists.
- S0490's referenced `assets/tokens.css`, `references/systems.md`, `references/diagnose.md` and `references/techniques.md`.

**Computed for this document** with throwaway scripts in the session scratchpad; nothing from the library was run: brand and swoosh OKLCH values, the pinned blue ramp, the swoosh-hue neutral ramp, WCAG 2 and APCA contrast for the listed pairs, and the fluid clamp tokens. The variable Epilogue Google Fonts axis range is unverified (noted in S0023).
