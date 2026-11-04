# GATE-NEW · How a job runs · V4 "The deck"

Governed by `ELBAZ-NEW-VERSIONS-ADDENDUM-2026-11-04.md` (binding, until the owner stops it), together with the finalize brief, the QA completion and the owner's feedback file. This is pass 3, section 2 of 7. Hero V4 was accepted by Muse.

The default is unchanged: V1 (the dial, the owner's pick) stays version 1; V2 and V3 are untouched. No backups ship.

**How to see V4:**
- **Header switch.** Use the Process "1 · 2 · 3 · 4" switch while the section is in view. On phones it is the "‹ 1/4 ›" stepper.
- **Built page.** `elbaz-homepage.html?process=4` opens V4 directly.
- **Single HTML file.** The header switch works there too.

## Plan line (written before building)
- **Governing reference** (REFERENCE-ANNEX-ELBAZ v3): **Scout Motors** is the primary ("story/process as sequenced evidence; section craft"). Sequenced evidence is taken: each stage is one card of evidence, dealt in order, and the finished stages stay face up on the pile beside the deck. Process V2 used Scout for a drawing; V4 uses the same idea as a physical deck.
- **Signature move:** the deck.
  - The eight stages are a stack of eight cards in the middle of the section. The top card carries the stage's number, its weeks, its title, the firm's own line and its icon; the edges of the cards below show how many stages remain.
  - Throw the top card (drag it away, or press Next) and it lands face up on the pile beside the deck, revealing the next stage. Drag the other way, or press Back, and the last card comes back.
  - A row of eight numbered stops beneath jumps to any stage: the cards in between are dealt onto the pile, or gathered back, one after another.
- **Style family:** a physical card deck (stacked paper cards, a discard pile).
  - V1 is an instrument dial with a text card.
  - V2 is a line drawing of a house.
  - V3 is typographic spines with a schedule rule.
- **The owner's laws for this section:**
  - tight: one card high, about one screen, no pin;
  - no right-side animation: the deck sits in the centre of the section with its pile beside it, and the heading spans above;
  - real interactivity: drag, throw, buttons, stops, keys.
- **WEB-SKILLS tags per element:**
  - **Cards:**
    - S0062: transform only (each card moves and turns; nothing reflows);
    - S0089 (system easing for the deal; the drag follows the hand, then springs);
    - S0340 (a card released short of the throw springs home);
    - S0083 (one card face up on the deck).
  - **Drag:** S1443 (a sideways drag throws on touch; vertical scroll stays the page's).
  - **Stops and buttons:** S1018 (arrows, Home and End on the stops; the deck's own keys); S1441 (44px).
  - **Card text:** S0666 (number, weeks, title, line); S1425 (text on paper).
  - **Reduced motion:** S0400 (no flight: cards change places at once).
  - **Self-audit:** S1306, S0502, S1473.
- **How it differs, and why it is better:**
  - **How it differs.** V1 picks a stage from a dial, V2 runs a scrubber along a drawing, and V3 opens a chapter among spines. V4 hands the visitor the job as a deck: one stage at a time, in your hand, with the done ones piling up.
  - **Why it is better.** It is the most tactile and the most compact version: one card at a time, readable at full size on a phone. The growing pile and the thinning deck show progress without a single extra word.
  - **Facts.** The stage names, weeks and lines are the section's one list (`ST`) with V1's note.

## What was built
**Files:**
- `remodeling/src/sections/process.html`: V4 added in the existing version system (`.ver[data-v="4"]`, prefix `dk__`, checked free).
- `css/sections/process.css`: a V4 block appended.
- `js/sections/process.js`: a `4:` definition reusing the section's `ST`, `icon()` and `nn()`.
- V1 to V3 are untouched.

**The cards:** eight paper cards of one size (as tall as the longest stage).
- **What each card shows:**
  - the stage number (clay and solid on the top card, outlined on the others);
  - the stage's icon;
  - its weeks in a pill;
  - its title and the firm's own line;
  - "n of 8".
- **The deck** sits just right of centre; the cards beneath the top one show their edges (up to four).
- **The pile** sits just left of centre. Before the first throw it is a dashed card-shaped slot marked "Done · Throw a card here". Thrown cards lie on it face up, each at a slight angle.
- **Phones:** the deck fills the width and the pile shows only the card edges at the left margin.

**Ways through:**
- **Drag the top card:**
  - to the left past about 30% of its width, and it lands on the pile;
  - short of that, it springs home (an elastic ease, S0340);
  - to the right, the last card comes back.
  - On touch, a sideways drag does this and a vertical swipe scrolls the page.
- **Back and Next** buttons (disabled at either end).
- **Eight numbered stops** (with the stage names on wide screens): a stop deals or gathers the cards in between one after another. The stops take arrows, Home and End.
- **Screen readers** hear "Stage n of 8: title, weeks. line" after each move, and only the top card is exposed.

**First view:** the deck is dealt onto the table, bottom card first.

**Reduced motion (S0400):** cards change places at once; no deal, no spring.

## Scorecard (self-assessed; Muse judges)
| | Design (40) | Usability (30) | Creativity (20) | Content (10) | weighted | floor (each ≥ 6) | vetoes | result |
|---|---|---|---|---|---|---|---|---|
| **How a job runs V4** | **8** | **9** | **8** | **10** | **8.5** | met | **0** | **PASS** |

Weighted = 0.4 D + 0.3 U + 0.2 C + 0.1 Ct = 3.2 + 2.7 + 1.6 + 1.0 = 8.5.

| category | evidence | why not higher |
|---|---|---|
| **Design 8** | **A physical object:** one paper card at full size, the thinning deck and the growing pile, centred under the heading.<br>**The tightest version of the section:** 882px at 1440, 780px at 768, 835 to 859px on phones, all including the site's section padding. | The cards are calm paper and type; the section's drama is the throw, not the artwork. |
| **Usability 9** | **Verified at 1440 mouse, 768 and 390 touch, and reduced motion:**<br>• a drag throws Consultation onto the pile and shows Site evaluation;<br>• a short drag springs home with nothing changed;<br>• stop 06 deals five cards and lands on Construction;<br>• Back returns to Permitting;<br>• End reaches Completion and handover (Next disabled); Home returns to Consultation (Back disabled);<br>• the screen-reader line updates each time.<br>**Measures:** 0 targets under 44px (the phone stops sit in two rows of four so each stays 44px); 0 text under 13px; 0 overflow at 360 to 1440; 0 errors. | One stage at a time: a visitor who wants all eight in view gets them from the stops (titles on desktop only) rather than the cards. |
| **Creativity 8** | A move the section did not have: the job handed over as a deck, with progress shown physically by the pile and the thinning deck. | Card stacks are a known pattern; the craft is the spring, the dealt jumps and the honest one-stage focus. |
| **Content 10** | **Stages:** all eight names, weeks and lines are the section's `ST`, verbatim, with V1's note.<br>**Copy:** the eyebrow and H2 are V1's.<br>Locks **0 fails**; outside links **0**. | The lead line is my wording; Muse should confirm it. |

**Vetoes checked, none tripped:**
- no console errors or warnings (V4 at 1440, 768, 414, 390 and 360, reduced motion, the single file);
- no images;
- facts verbatim; no outside links;
- Poppins and Roboto only;
- no sub-agents or background tasks.

## Defects found and fixed during the build
1. **The load beat used relative offsets,** which could land cards off their places. It now deals each card to its absolute resting place.
2. **On a 360 phone, eight stops in one row were about 41px each.** They now sit in two rows of four (44px or more).
3. **Before the first throw, the left half of the table was empty.** A dashed card-shaped slot now marks where the pile goes ("Done · Throw a card here").
4. **On phones the pile's clipped card text showed at the margin** ("ope", "7 of"). The pile cards hide their text there and show only clean edges.

## Defects remaining (honest)
- **One stage at a time:** only one card's text is readable at once.
- **Phones:** the stops show numbers only (their names are in their accessible labels).
- **No assets needed or requested.**

## Reference: transfers and non-transfers (Scout Motors, primary)
- **Transferred:**
  - story as sequenced evidence, one piece at a time in order;
  - the evidence kept in view as you go (the pile);
  - restrained section craft.
- **Not transferred:**
  - Scout's vehicles, imagery and identity;
  - its long scroll.
- **Other annex entries:** none were used.

## Comparison with the section's previous versions
| | V1 · the dial (default, the owner's pick) | V2 · one house, eight marks | V3 · the chapters | V4 · the deck |
|---|---|---|---|---|
| **Composition** | A card left, a dial right | A full-width house drawing | Eight spines, one open, a weeks rule | A deck and its pile, centred, with stops beneath |
| **What you do** | Pick a node | Drag the ground line, play | Open a spine, drag the weeks | Throw cards, use the stops |
| **Progress** | The dial's arc | Marks on the house | Done spines, the rule | The pile grows, the deck thins |
| **Height at 1440** | 853px | 1037px | 923px | 882px |
| **Where it is weaker** | Less visual | Long | Taller on phones | One stage readable at a time |

**My call:** V4 is a genuine challenger. It is the most tactile and the most compact version, and it reads at full size on a phone. V1 stays the owner's pick until the owner says otherwise. The defaults are not changed.

## Evidence (`qa/new/process-v4/`)
- `v4-1440-rest-throw-stop06-end.jpg`: at rest with the empty pile slot; a card mid-throw; after stop 06; at the end.
- `v4-390-states.jpg`: the phone.
- `v4-768.jpg`: the tablet.
- `v4-1440-reduced-motion.jpg`: reduced motion.
- `v4-single-file.jpg`: V4 picked through the header switch inside the delivered single HTML file at 1440 and 390, on Permitting.

**Regression after the build:**
- touch 33/33;
- phones at 360, 390 and 414: 0 small targets, 0 text under 13px, 0 overflow;
- home pins 12/12;
- locks 0 fails; outside links 0;
- single file: 0 errors, 38 images, 0 broken;
- em dashes in the delivered file: 0.
