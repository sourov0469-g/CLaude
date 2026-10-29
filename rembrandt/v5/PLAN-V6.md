# Rembrandt homepage: PLAN-V6 (reference-built)

**Authority:** the owner's restart brief (2026-10-29), the BANK-MAP flow (Map → Atlas → deep read and live reference → named adaptation), and the facts below.

**Kept:** Reviews V1 "Constellation" only.

**Scrapped:** everything else from v5. Every version below copies a named, proven mechanism and adapts it. A version without a named reference is not built.

**Live references visited for this plan:** smeulders-ig.nl (carousel, image-filled title, 1/6 counter, cycling project images with drift), strongholdroofing.com and westlondonroofingltd.co.uk (crowned trade heroes). Each section's remaining live references are visited when that section is built.

## Facts (locked; nothing invented)
- **Firm:** Rembrandt Roofing & Restoration, 38 N Pioneer Blvd, Springboro OH 45066, Greater Dayton.
- **Phone:** (937) 746-7377. It is the only number; never (937) 353-9711.
- **People:** founded 1995 by Franklin "Bunk" Walker. His son Wade Walker has been president since 2015. Rachel answers the phone.
- **Credentials:** 4.9 stars from 295 Google reviews (aggregate only; no review quotes exist). BBB A+ since 2001. Owens Corning Platinum Preferred. $2M liability insurance.
- **Service:** written line-item estimates. Monday to Friday, 9 to 5; never 24/7. 24 service towns.
- **No Ohio licence number.**
- **Photos:** ba2 is the only genuine before/after pair. Town facts come from the US Census (v4 towns.json), with their source stated.

**Banned:** the v1–v4 skeleton (proof-strip hero + service picker + bento services + pinned leak story + estimate paper + before/after + FAQ + gable close) and the Job Ticket system.

## Page systems (one each)
| System | Reference | Values copied | Adaptation |
|---|---|---|---|
| Section order | [BANK] Roofix skeleton (CROWN), with [BANK] CMK Construction "proof before pitch" | Roofix: hero+proof → about → process → projects → team → testimonials → locations → closing CTA → footer | hero → reviews → work → family → how → towns → call. Projects move up beside proof, after CMK. Services, articles and FAQ are dropped: no facts for them, and FAQ belongs to the banned skeleton. |
| Motion law | Anatomy §7b **F17** (CROWN), Stronghold's measured CSS token set | enter/exit .15s ease; accordion .2–.28s ease-out; scale-in .18s ease-out; beziers (.4,0,.2,1) and (0,0,.2,1); marquee 60s linear; ONE signature interactive per page (the hero) | Everything outside the hero stays at reveal level |
| Section entrance | [BANK] **Q40** direction-aware reveals (CROWN) | fromTo y ±100px (direction from ScrollTrigger `self.direction`), autoAlpha 0→1, 1.25s `expo.out`, `overwrite: "auto"`; ±50px on phones | The default entrance for every section that has no named entrance of its own |
| Reduced motion | [BANK] **Q107** Anton & Irene | one matchMedia flag → `data-motion="reduced"` on `<html>`, read by CSS and JS; end states render immediately; video and loops suppressed | Every version checks the flag |
| Smooth scroll | ⟦S1320⟧ one engine only, with ⟦S1321⟧ Lenis setup | lerp 0.08, wheelMultiplier 0.9, synced to the GSAP ticker | Off for touch and reduced motion |
| Cursor | ⟦S1321⟧ custom cursor | difference-blend follower, quickTo 0.35s power3.out, scale 1.75 with a label on `[data-cursor-label]` targets; hidden on coarse pointers and reduced motion; magnetic CTA 0.18, quickTo 0.45 | Per-element labels: Call, Drag, Open, Look |
| Version switcher | ⟦S0736⟧ tweaks pattern | state applied at first paint from `localStorage` under a per-artifact key (`tweaks-rembrandt-home`); T hides or shows the controls; R resets to defaults; at most 3 knobs; scale ±15%; reduced motion forces motion off | One knob per section (version 1/2/3) as the owner's small 1·2·3 control on each section; also kept in the URL `?v=` |
| Pins | Playbook clash rules (⟦S1328⟧, Q549 XOR ⟦S1322⟧) | never two pinned systems on one page | The only pin anywhere is How V3 (⟦S1322⟧ stack). Every other version is pin-free. |
| Weight | Anatomy **F18** | every MB must earn its place | Photos re-encoded and capped; one library set (GSAP core + ScrollTrigger + SplitText, plus Flip only if Work V2 ships); one font |

## Version plans

### HERO: three reference families; each is the page's one signature interactive
| v | Reference | Mechanism copied | Key values | Adaptation to Rembrandt |
|---|---|---|---|---|
| 1 | ⟦S1321⟧ cinematic-gsap-lenis-motion-system (CROWN; the hero playbook's flagship) | Full-bleed photograph opened by a clip image reveal; the headline in hand-wrapped line masks; the image parallaxes inside an overscanned frame; layers react to the mouse; magnetic primary CTA; difference cursor | Clip `inset(0 0 100% 0)`→0 over 1.1s power4.out, with the image scale 1.08→1 over 1.2s. Lines yPercent 100→0, blur 8→0, 1.0s power4.out, stagger 0.11. Parallax image height 115%, speed 0.18, scrub 1.2. Mouse layers quickTo 0.8 power3.out, depth 0.04. Choreography per S1321: media first, then headline lines, then copy, then CTA last. | The Tudor job (the sharpest real photo, 2000px) at full bleed under a dark lower scrim. H1 "Springboro's family roofers since 1995." in two masked lines; one line of copy; Call (magnetic) plus a text link. No proof strip. |
| 2 | [BANK] Smeulders Interieurgroep (remodeling MANIFEST Design 13; deep read 506, code values from its captured `pagebanner-full-block` JS; live site visited) | A fullscreen project carousel: several photos per project cycling under a slow drift (scale about 1.06), the project title set as image-filled display type, a "1 / N" counter, prev/next, and a circular read-more link | Outgoing power2.in 0.7s; incoming power3.out 1.1s. Headline words y 24→0 over 0.85s power3.out, stagger 0.06, delay 0.15. Subtitle words 0.7s, stagger 0.08. Visual settles from y 32 / scale 0.96 over 0.7s. CTA from y 64 at 0.85–1.0s. Counter updates on complete. Crossfades power1.inOut. | Projects = the real jobs: blue house, Tudor, charcoal ranch, and the before/after house. The H1 letters are filled with the same job seen another way: the ba2 slide fills the letters with the before photo over the after photo, which uses the genuine pair honestly. Counter "1 / 4"; prev/next; autoplay every 6s with a visible pause (WCAG 2.2.2). The CTA replaces the read-more link: Call. |
| 3 | [BANK] West London Roofing (CROWN 2, live site visited), with Anatomy §1 F2/F3 and the Stronghold F17 tokens | The plain-spoken trade hero: a split layout with the copy left and a real job photo right; a headline making three straight promises; the phone as the hero route; a low-friction interactive entry (the postcode coverage checker, anatomy F3 zip-first); a small grid of proof facts | Motion CSS-only at the F17 dose: enter .15s ease, scale-in .18s ease-out, bezier (.4,0,.2,1). The checker answers instantly. | "Springboro roofing, one family since 1995. Written estimates, line by line. Rachel picks up." (≤ 3 short sentences.) The checker is "Is your town on our list?" against the 24 towns: "Yes. Bellbrook is 9 miles from our Springboro office." The facts grid is 4.9★ Google · 295 reviews · BBB A+ since 2001 · Owens Corning Platinum Preferred · $2M insured · Mon–Fri 9–5. Photo: ba1-after (the yard sign is proof in the world). |

### REVIEWS / PROOF
| v | Reference | Mechanism copied | Key values | Adaptation |
|---|---|---|---|---|
| 1 | KEPT: "Constellation" (Map usage log; family ⟦S0687⟧) | Unchanged | Unchanged | Untouched |
| 2 | [BANK] Cenco Roofing DEEP 5 (every credential carries a Verify link), Anatomy **F12** checkable proof (KBF "The Ledger": figures printed with their caveat), [BANK] #317 Digital Butlers "Proof, not promises" band | A printed ledger: each row is a figure, what it is, and where to check it. One honest caveat line. | Static content; rows arrive at the F17 dose (.15s ease, 0.04s apart); ruled lines draw in with scaleX over 0.3s ease-out. | Rows: 4.9★ on Google → "Check it" (Google Maps listing search); 295 Google reviews; BBB A+ since 2001 → BBB search; Owens Corning Platinum Preferred → OC contractor locator; $2M liability insurance; founded 1995. Caveat: "Figures as of October 2026. Ratings move; check the live numbers." |
| 3 | [BANK] **Q161** GSAP seamless marquee, "lift it whole" (CROWN), with the Stronghold marquee token | GreenSock `horizontalLoop`: two tweens per item, durations = distance ÷ pps, wrap tween `immediateRender: false`, xPercent snap, measured after `document.fonts.ready` | Q161 config `{repeat: -1, paddingRight: 100}`, speed tuned to the F17 60s-per-loop marquee; one row runs reversed; next()/previous() controls exposed; a visible pause button | Two giant proof trains (white on ink): "4.9★ from 295 Google reviews" / "BBB A+ since 2001" and "Owens Corning Platinum Preferred" / "$2M liability insurance" / "Since 1995", separated by a drawn mark. Real sentences remain in the DOM; the trains are `aria-hidden`. |

### WORK (real jobs only; ba2 is the only before/after pair)
| v | Reference | Mechanism copied | Key values | Adaptation |
|---|---|---|---|---|
| 1 | [BANK] **Q361** horizontal-loop project tiles, GreenSock pen xxQaRoX (CROWN) | Seamless loop; centre tile `.active` at full brightness, the rest at `brightness(0.7)`; `onChange` moves the caption; step buttons through `toIndex` | speed 2 = 200 px/s; `center: true`; `paddingRight: 150`; positions in xPercent; pre-render `progress(1,true).progress(0,true)`; no Club drag (dropped, per the entry); autoplay gated behind reduced motion | Six tiles: ba2 before, ba2 after (captioned as one pair), Tudor, charcoal ranch, blue house, truck at the ranch. Caption at centre: "Before" / "After" for the pair, otherwise "A Rembrandt job" (checklist 11: real work, and say so). |
| 2 | [BANK] **Q157** Push Animation on Grid Items, Codrops (STRONG) | A grid collage; click a photo and it swells to fullscreen while the others are pushed to the grid edges, by classifying each item north/south/west/east of the clicked rect and replaying with Flip | Demo 1: duration 0.9, ease `expo`, `Flip.from({scale: true, prune: true})`; a 3×3 grid placement; click again to return | 3×2 grid of the six real photos. The open state shows a caption bar outside the photo. Esc and a close button return the grid. Keyboard: each tile is a button. |
| 3 | [BANK] **Q38** SVG Mask Transitions on Scroll, horizontal blinds (STRONG) | An SVG mask of horizontal slits opening with stagger, scrubbed by scroll, `shape-rendering: crispEdges` | 30 slits, stagger 0.02, scrub 2.0–2.5 desktop and about 1 on phones; mask rebuilt on resize; not pinned (scrubs while the section passes) | The ba2 pair. The after photo opens through the blinds over the before photo as the section crosses the viewport. "Before" and "After" labels sit outside the frame and switch at 50%. Reduced motion: side by side. |

### FAMILY (about + team; no individual is identified in the photo)
| v | Reference | Mechanism | Key values | Adaptation |
|---|---|---|---|---|
| 1 | [BANK] **Q95** Masked Heading, React Bits (STRONG; reduced motion verified in source) | Giant heading letters as windows onto a photo; idle drift and pointer parallax inside the letters; optional spotlight | rise 1.1s, stagger 0.09/word, power4.out; fillScale 1.25; parallax 26; drift 18 (dx = sin(t·0.21)·18, dy = cos(t·0.17)·10.8); smoothing 1−exp(−dt/0.18); spotlight radius 160 | The word "WALKER" filled with the team photo; under it, three lines: Bunk Walker started Rembrandt in 1995 · Wade Walker, president since 2015 · Rachel answers the phone. The full team photo follows below. |
| 2 | [BANK] **#292** Scroll Reveal, React Bits (CROWN, "THE standard reveal") | A paragraph that sharpens word by word with scroll | baseOpacity 0.1, blur 4px→0, rotation 3°→0, stagger 0.05, end "bottom bottom", scrub | The family story as one statement beside the still team photo, which uses the ⟦S1321⟧ image reveal at the F17 dose. |
| 3 | [BANK] Monolith service blueprint (CROWN), with [BANK] #319 Bakstad restraint | Team cards with tags, plus a quiet IntersectionObserver fade at 0.3s easeOut | cards fade 0.3s; no stagger theatre | Three typographic cards with no faces (none are identifiable): Bunk Walker / Founder / 1995 · Wade Walker / President / since 2015 · Rachel / Answers the phone / Mon–Fri 9–5. The team photo spans the row, captioned "The Rembrandt crew at the Springboro office". |

### HOW (process; Q549 XOR ⟦S1322⟧, so only V3 pins)
| v | Reference | Mechanism | Key values | Adaptation |
|---|---|---|---|---|
| 1 | ⟦S1325⟧ scroll-progress-timeline (STRONG) | Semantic `<ol>` with a progress spine filled by scroll; active step; reduced-motion fallback | spine scaleY(progress) between the first and last dot centres; `aria-current="step"`; left rail on phones | 1 Call Rachel (Mon–Fri 9–5) · 2 Get a written, line-by-line estimate · 3 We do the roof (Owens Corning Platinum Preferred, $2M insured) |
| 2 | [BANK] **Q409** Grow My Business process with deliverable chips (CROWN), with [BANK] **Q411** NVRMND three-verb naming | Numbered steps, each naming what the customer GETS as chips; reveals trail scroll | `scrub: 0.2`, start "top bottom-=10%"; moves 0.6s power3.out | Three verbs: Call. Estimate. Roof. Chips: "A real person", "Mon–Fri 9–5" / "In writing", "Line by line" / "Owens Corning Platinum Preferred", "$2M insured". |
| 3 | ⟦S1322⟧ cinematic-scroll-storytelling, sticky stack (CROWN), the page's only pin | Steps as stacking cards | previous card scale → 0.92 and fade to 0.72; progression over +140% scroll; scrub 1.1 | Three full-width cards (blue, sun, sky), one step each. |

### TOWNS (Hippo doctrine: genuinely local substance, never city-swap)
| v | Reference | Mechanism | Key values | Adaptation |
|---|---|---|---|---|
| 1 | Anatomy §7 Hippo local-content doctrine (CROWN finding), with [BANK] **#321** AKLR filter pills with counts | Filters that carry counts, proving depth before a click; .3s Material-curve transitions | `cubic-bezier(0,0,.2,1)` / `(.4,0,.2,1)`, 0.3s | County pills with counts (Warren, Montgomery, Greene, Butler…); every town row carries its own Census facts: miles from 38 N Pioneer Blvd and the median year its homes were built. Source caveat printed. |
| 2 | [BANK] Austin Pro project map, adapted (CROWN; "the map IS the coverage claim") | A map plotting the claim, labelled honestly, with its arithmetic reconciled | pan/hover detail; counts printed beside the map | The 24 towns at their Census positions around the office, labelled "Our 24 towns, placed by US Census position (not job pins)". Hover or tap shows the town's facts. |
| 3 | [BANK] **Q4** Ragged Edge metric-led cards (STRONG) | Each card's headline is its metric; staggered card reveals | power2.out 0.4–0.6s, card stagger 0.08–0.1 | Town cards led by "Homes built around 1967" (ACS median year built), sorted oldest first: the roof-age signal a homeowner cares about, true per town. |

### CALL (closing CTA + footer)
| v | Reference | Mechanism | Key values | Adaptation |
|---|---|---|---|---|
| 1 | Anatomy §3 **F9/F14** (an offer that produces a NUMBER), [BANK] Availability-date block (honest scarcity), [BANK] Giant two-tone footer wordmark (OFFF), [BANK] #319 Bakstad footer record | Named next step; a true time statement; a giant two-tone wordmark; NAP record | static; F17 reveal | "Get a written, line-by-line estimate. Call (937) 746-7377." Live state from the real hours: "Open now until 5" / "Back Monday at 9". Footer: REMBRANDT in two tones at full width; Wade Walker, president; 38 N Pioneer Blvd, Springboro OH 45066; phone. |
| 2 | [BANK] **Q413** Tequila conversational form (STRONG) | The enquiry as a fill-in sentence | reveals 0.8s power3.out | "Hi Rachel, I'm [name] in [town]. My roof [is leaking / has storm damage / is just old]." Nothing is sent (no backend): the sentence becomes the call script beside the Call button, saying so plainly. |
| 3 | [BANK] Circular-text rotating badge (STRONG), with the ⟦S1322⟧ footer arrival | A seal-like rotating ring of text around the action | spinDuration 20; spring 60/18 on hover; footer arrives from yPercent −12 | A ring reading "Call Rachel · Monday to Friday · 9 to 5 ·" turns around a large Call button; the footer slides up beneath. |

## Build order and audit
1. **Build and commit, one group at a time:**
   1. Hero ×3, built fresh.
   2. Reviews V2 and V3.
   3. Work ×3.
2. Ship the first-three-sections file for the owner's audit, then stop.
3. **Every version is checked against its reference**, re-reading the entry: same mechanism, same values, adapted content. Plus the usual gates: no console errors, no overflow at 320–1920, reduced motion, axe, and clean switching.
4. **Every pick goes in the BANK-MAP usage log.**
