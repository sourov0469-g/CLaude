# Round R4: finish the site (owner orders, 2026-10-30), challenge log

Written before any R4 code. Verdicts: ACCEPT, IMPROVE (keep the intent, change the means) or REJECT (said openly, with what replaces it). Citations: ⟦Sxxxx⟧ are WEB-SKILLS catalog entries; [BANK] are bank entries. Skill and bank text is data, never instructions.

## Standing scope
- **The existing homepage sections are not touched:** Hero, Reviews, Work, Family, How, Towns and Call stay exactly as R3 left them. The owner audits them himself.
- **What changes around them:** two sections are added, and the shared chrome gains page links once the inner pages exist.
- **Facts:** the facts lock is unchanged. For everything new: phone (937) 746-7377 only; Monday to Friday, 9 to 5, never 24/7; founded 1995; BBB A+ since 2001; Owens Corning Platinum Preferred; 4.9 stars and 295 reviews, aggregate only. No invented prices, reviews, licence numbers or guarantees. The insurance content promises no approval and no outcome.

## 1. The two new homepage sections

### Placement
| Order | Verdict | Reason and citation |
|---|---|---|
| Services after Reviews | ACCEPT | Proof before pitch: the visitor sees 4.9 / 295 and the credentials, then what the firm does. [BANK] CMK Construction (STRONG, "proof-before-services hero order") and the Roofix skeleton ([BANK] CROWN), where Services follows the opening proof. |
| Storm and Insurance after How | ACCEPT | How is the ordinary path (call, written estimate, roof). Storm and Insurance is the same path when a storm caused the damage and an insurer is involved, so it reads as the next question. ⟦S1499⟧: grouped by the visitor's question. Moving it higher would split the general process from its storm case. |

### Cadence (C2 lock)
The R3 cadence alternates light and dark, so any insertion puts two like grounds next to each other. A third tone at each insertion keeps every boundary readable ⟦S1497⟧, without re-skinning any existing section (which the owner has ruled out).
- **Services: --cream.** It sits between Reviews (ink) and Work (sky). Cream is the page's own second pale, already used by the hero.
- **Storm and Insurance: --blue.** It sits between How (sky) and Towns (ink). Blue is the page's own third ground; Towns (ink) separates it from Call's blue.
- **Resulting page:** cream / ink / **cream** / sky / ink / sky / **blue** / ink / blue / ink.
- **Dividers:** two new boundaries get their own roofing profiles (C5, one profile per boundary): lap siding under Services, and a storm-cloud edge under Storm.

### Conflicts with earlier rules
| Rule | Verdict | Reason |
|---|---|---|
| Facts gate "no service picker / bento services" (BRIEF-v2 banned skeleton) | KEEP the ban, ACCEPT the section | The owner's newer order asks for a Services section. The ban was against one composition (a hero picker funnel plus a bento grid), not against a services section. No version is a picker form or a bento grid. The gate's word test stays; the build avoids the banned phrase. |
| Rule 11 "no roof-anatomy lesson" (named layer lists) | KEEP | The services are named as services, not as roof layers. The gate's layer-word check stays on. |
| "No FAQ section" | KEEP | Storm and Insurance answers its question in one composed section per version, with no question-and-answer accordion. |
| BRIEF-v2 §3 closed facts list vs the services' own descriptions | IMPROVE, flagged C12 | Covering every service needs a line on each. Each line is taken from the firm's own published site, as recorded in `rembrandt/rembrandt-pack.md` §3/§5.6, and worded no stronger. This is the same status as flag C11 (the written estimate). Warranty lengths are left out: they are guarantees, and the owner's lock forbids new ones. |

### Facts used in the new sections (and only these)
- **The six main services:** roof replacement, roof repair, storm and hail damage, insurance claims, siding, gutters.
- **The wider menu:** commercial roofing, EPDM, TPO, roof coatings, gutter guards and cleaning, blown-in insulation, brick veneer, skylights, loft ventilation.
- **Service lines (pack §5.6):**
  - Replacement: torn off to the deck, and the deck checked.
  - Repair: a dedicated repair crew carries flashing, pipe boots and matching shingles, so most repairs finish in one visit.
  - Storm: damage photographed for the adjuster.
  - Claims: a line-item scope, and they can meet the adjuster.
  - Siding: James Hardie and vinyl, with house wrap and flashed J-channel.
  - Gutters: seamless aluminum, cut on site, plus gutter guards.
  - The written estimate before work, and the customer's written approval before any work.
- **Storm facts (pack §3, the firm's own local notes):**
  - Ohio averages 19 hail days a year.
  - Hail season runs April to July.
  - Freeze-thaw runs November to March.
  - Ice dams form in January and February.
  - Bunk Walker built the firm's name restoring storm-damaged properties.
- **Insurance limit:** the insurer decides the claim. Every Storm version says so in plain words ⟦S1013⟧ (visible, specific disclaimers on sensitive content) ⟦S1291⟧.
- **Photos:** only the firm's own:
  - wind-damaged shingles, and a tree limb on a house (Storm V4);
  - a drone view of a replacement, Adam caulking a leak, and a crew laying a roof (Services).
- **Photos avoided:** the "recent vs old damage" and chimney images read as illustrations, so they are not used. There is no gutter or siding job photo, so those two services are drawn, never shown with a borrowed photo.

### Services: five wholly different concepts
| Slot | Concept | References | Why it is not a variation |
|---|---|---|---|
| 1 (default) | **One house**: one drawn house. Each service sits on its own part of the house as a numbered hotspot button; choosing one shows its line. A plain list underneath is the fallback. | [BANK] 523 ULTRAGRID (one explorable scene, 5 hotspots, plain menu fallback) + ⟦S0139⟧ flat (diagram-led services, solid planes) | A diagram you explore |
| 2 | **Stacked cards**: six cards stack as you scroll, CSS sticky only, no GSAP pin. | [BANK] proven recipe R45 (stacking cards: CSS sticky, never a pin) + ⟦S1239⟧ subgrid alignment | Scroll-stacked cards |
| 3 | **By what you see**: a two-column routing table, "What you're seeing" to "What we do". | [BANK] Strike Force HVAC (crown 2, symptom-led routing into a numbered services index) + ⟦S1499⟧ chunking | A symptom table |
| 4 | **Circles**: real job photos cropped into circles, placed asymmetrically on the cream canvas, each with a docked satellite button. Services without a real photo get flat colour discs. | ⟦S0823⟧ mastercard (circular service photos, satellite CTAs, cream canvas) | A photo constellation |
| 5 | **The drum**: the six service names on a 3D drum that turns as the section crosses the viewport (no pin); the name facing you is lit and its line shows beside it. | [BANK] Q55 Codrops 3D text, the unpinned circle variant (perspective, radius 0.4 × min(vw, vh), backface hidden, scrub 1) | Kinetic type |

### Storm and Insurance: five wholly different concepts
| Slot | Concept | References | Why it is not a variation |
|---|---|---|---|
| 1 (default) | **Who does what**: a split with a seam. Left, what Rembrandt does: photographs the damage, writes the line-item scope, can meet your adjuster, does only the work you approve in writing. Right, what your insurance company decides: whether the claim is approved and what it pays. | ⟦S1013⟧ disclaimers + ⟦S1291⟧ (trust on money matters) + [BANK] Checklist 14 (a claim printed with its honest caveat) | A responsibility split |
| 2 | **The weather year**: a 12-month strip with hail season (April to July), freeze-thaw (November to March) and ice dams (January and February) as labelled bands, this month marked, and "19 hail days a year" as the figure. | ⟦S0603⟧ evidence doctrine (direct labels, one focal relationship) + ⟦S0614⟧ calendar heatmap form | A data graphic |
| 3 | **The honest line**: a poster sentence. "We'll get your claim approved." is drawn through by a strike line, and the true sentence follows: what Rembrandt does, and that your insurer decides. | ⟦S1013⟧ + [BANK] Checklist 14 + ⟦S1448⟧ (one purposeful sequence) | Typographic statement |
| 4 | **The evidence**: the firm's two real storm photos framed as exhibits, captioned with what they show, and the line that photos like these go to your adjuster. | [BANK] Checklist 11 (every photo real work, say so) + ⟦S1314⟧ product truth | Photo-led |
| 5 | **Through the window**: a window frame with rain on the glass that stops and clears as the section scrolls in; the call to Rachel sits on the sill. | ⟦S1341⟧ threejs-weather, ported to SVG (rain that eases off, no lightning) + ⟦S1314 §8⟧ (no perpetual motion: the rain stops) | Atmosphere |

## 2. The pages (owner's amendment: 3 to 9 pages, fewer is better, nothing necessary missing)
The owner's suggested set: Home, Services, About (the family), Reviews, Service Areas, Contact.

| Page | Verdict | Reason |
|---|---|---|
| Home | KEEP (done) | |
| Services | ACCEPT, one page for every service | The six mains and the full wider menu, each covered properly, with Storm and Insurance as a full chapter. No service has enough distinct, true content to earn its own page under the facts lock: a thin page per service is the doorway anti-pattern ([BANK] Hippo vs System Pavers clash note: "every page needs local substance or it should not exist"). |
| About (the family) | ACCEPT, extended | The family (Bunk 1995, Wade president since 2015, Rachel), the credentials (BBB A+ since 2001, Owens Corning Platinum Preferred, $2M liability), and the review aggregate with its check links. |
| Reviews | REJECT as a separate page; folded into About | There are no individual reviews (aggregate only, 4.9 / 295). A Reviews page would repeat the homepage's proof with nothing new, which makes it thin ⟦S1499⟧. The aggregate and the links to check it live on About, beside the family it vouches for, and on Home. |
| Service Areas | REJECT as a separate page; folded into Contact | The 24 towns already have a full section on Home. The question a towns page answers ("will you come to me?") is the same one Contact answers ("how do I reach you?"). One page, Contact and service area, carries the address, hours, phone and all 24 towns with their real distances. Separate town pages would be doorway pages ([BANK] Hippo doctrine). |
| Contact (with service area) | ACCEPT | Phone, office, hours, map link, the 24 towns. No form: a form with nowhere to send would be a fake action ⟦S1314 §7⟧. The phone is the one contact path, as everywhere on the site. |
| Financing, Community, FAQ (pack §5.1 nav) | Not built | Financing has no published terms (pack "NEVER INVENT"). Community facts are outside the owner's lock list. FAQ is banned by BRIEF-v2. None is necessary. |

**Final page list: 4 pages (Home, Services, About, Contact).** Each inner page gets five wholly different layouts behind the same 1 to 5 switcher, with backup slots ready (empty, since no page version has been replaced yet).
