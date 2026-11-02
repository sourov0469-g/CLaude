# Skill digest A: taste and direction (read in full, my own thread)

Skills: S0628, S1488, S0221, S0874, S0659, S0145, S0177, S1306, S1320, S0329, S1383, S0001, S0647, S0214.

## Taste law for this build (synthesis)
1. **Lock-versus-skill conflicts, resolved in favour of the locks** (the brief and the owner win):
   - S0001 calls cream ground with a terracotta accent an AI default. The clay/terracotta brand is the owner's lock. Mitigation: we do NOT also use the other defaults that come with it, namely:
     - a serif display (we use Poppins);
     - tracked ALL-CAPS eyebrows above every heading;
     - "A · B · C" middle-dot meta strings;
     - "WORD — fragment" labels;
     - mono data labels;
     - a "→" appended to every CTA;
     - identical rounded cards with the same soft shadow.
   - S0647/S0214 ban Roboto and Inter, and demand pills and double bezels everywhere. The font lock (normal everyday fonts) wins. I take only their checkable non-conflicting rules:
     - hamburger morphs into an X;
     - staggered nav reveal;
     - press `scale(.98)`;
     - `backdrop-blur` only on fixed or sticky elements;
     - `min-h:100dvh`, never `h-screen`;
     - transform and opacity only.
   - S1320 says not to draw illustrations with model-authored SVG. The owner's explicit order ("heavy custom SVG ... drawn for this business") wins. I keep its honesty rules:
     - no fake avatars or logos;
     - static first frame complete without JS;
     - one smooth-scroll engine;
     - no award claims.
2. **Subject-specific signature** (S0001/S0329/S0659). Every page has ONE product-native signature artifact, something only Elbaz's site would have:
   - **Home:** the drawn house built across the scroll.
   - **Kitchens:** the room chapter that assembles.
   - **Bathrooms:** the horizontal bath build.
   - **Renovation:** the permit route.
   - **Contact:** the area map with the call desk.
   Boldness is spent in one place per section, with everything else quiet. Before the page ships, remove one accessory.
3. **Ban list (P0, from S0659/S1306):**
   - invented metrics or fake proof;
   - filler copy;
   - emoji as icons;
   - a two-stop "trust" gradient hero;
   - a rounded card with a coloured left border;
   - more than about 12 raw hexes outside `:root`;
   - more than 2 visible accent uses per screen;
   - decorative blob or wave backgrounds;
   - a perfectly symmetric layout with no tension;
   - a Hero, Features, Pricing, FAQ, CTA skeleton with no unconventional section.
4. **Removal test before adding** (S1306). For each element, name the information, state, action, hierarchy or brand meaning it gives. If removing it improves clarity, remove it. Priorities run from P0 (deceptive proof, blocking) to P3.
5. **Paper-technical grammar fits the build** (S1383):
   - warm paper surfaces;
   - thin inset rules, L-brackets and corner ticks as measured technical structure (a construction-drawing vocabulary);
   - one restrained accent signal;
   - no vintage distressing.
   Elbaz's sheet-and-drawing language sits here, without a dark outer frame (light-dominant lock).
6. **Structure is information** (S0001):
   - Numbered markers only where the content is a real sequence (the process and build chapters).
   - Copy uses active verbs, sentence case and no filler. A CTA names what happens.
   - Errors explain the fix.
7. **Static first frame** (S1320/S0329):
   - The hero is complete without JS.
   - The primary action sits in the first viewport.
   - Zero-shift motion: reserved geometry, tabular numerals, fixed label slots.
8. **Case-study arc for project chapters** (S1488): overview hook, challenge, process, solution, outcome. Elbaz can only use real facts, so a missing outcome stays absent; it is never invented.
9. **Polish modes** (S0628), run per section in order: audit, critique, polish, animate, harden (overflow, clipping, contrast, states), live QA.

## Audit checks (used in every gate)
- Can someone outside the project tell from a screenshot that this is Elbaz? (S0659 soul test)
- Is there any default-trait cluster (S0001 list) without a reason?
- Does every section have exactly one bold move?
- Do the P0 bans pass?
- Does the static first frame stand without JS?
