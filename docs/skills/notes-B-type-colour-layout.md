# Skill digest B: type, colour, layout, spacing (read in full, my own thread)

New this phase: S1432, S1461, S1433, S1428, S1430, S0660, S1424, S1425, S0189, S0666, S0490.
Re-applied from the rebrand (read in full then): S1418, S1434, S1435, S1422, S0248, S0071, S0011.

## Binding system for new and rebuilt work
- **Type scale:** Utopia fluid scale with poles at 360 and 1240px. Base runs 18 to 20px; the ratio runs 1.20 to 1.25. Every clamp includes a rem term, and the maximum is at most 2.5 times the minimum. This is the brief's number, and it satisfies S1433's ratio scale and S0490's "rem, never em" rule.
- **Weights:** two weights carry emphasis, 400 for body and 600 for display; 500 is UI-only. Weights jump between levels, never step (S0666/S0490). Nothing below 400.
- **Line height:**
  - 1.05 to 1.15 for display;
  - 1.5 to 1.6 for body;
  - inversely proportional to size.
- **Measure:**
  - body copy 45 to 65ch;
  - captions 40 to 60ch;
  - callouts 30 to 45ch (S1430).
- **Wrapping and numerals:** `text-wrap: balance` on headings, `pretty` on short body, `tabular-nums` on every changing number (S0189).
- **Spacing ladder:** the Carbon ladder 2/4/8/12/16/24/32/40/48/64/80/96/160 (brief). Rhythm tokens: minor 48 to 64, default 64 to 96, hero/CTA 96 to 144. Section gaps must vary (S0666): at least one gap per page is 1.5 times the others.
- **Grouping:** always more space around a group than within it (S0490 hard rule 6).
- **Colour:**
  - neutrals 70 to 90% of pixels;
  - one accent at 5 to 10%;
  - semantic colours 0 to 5% (S0660);
  - at most 2 visible accent uses per screen (links and focus rings count).
- **Text colours:** three, all at least 4.5:1. Text-sized clay uses clay-700 or darker.
- **Contrast:**
  - large text (at least 24px regular, or 18.66px bold) needs 3:1;
  - borders that identify a control need 3:1 (S0490 rule 8).
- **Colour rules:**
  - never grey text on a coloured ground; pick a hue-matched tone instead;
  - never use colour as the only signal.
- **Elevation:** five shadow levels picked by z-position. A pressed control's shadow shrinks; a lifted (dragged) item's shadow grows (S0490). The proof boxes use exactly this.
- **Radius:** one family. Concentric rule: outer radius = inner radius + padding (S0189).
- **Figure and ground** (S1425):
  - the surface stack is base, raised, overlay, modal;
  - never put text directly on a photo without a separation layer;
  - selected states must flip figure and ground unambiguously.
- **Continuity** (S1424):
  - **Connected paths:** a connecting line turns items into a sequence (process rails, timeline, the ink line between sections).
  - **Breaks:** an interrupted line signals a new group, and a break in alignment signals hierarchy.
  - **Alignment:** audit it at every breakpoint.
- **Hierarchy contract** (S0666):
  - one dominant entry point per visual region;
  - at least two vectors (scale, weight, spacing, tracking, alignment) working on it;
  - no two adjacent levels share scale, weight AND spacing;
  - no more than three levels above the fold.
  - Anti-patterns: graduated weight ladders, uniform section spacing, size-only hierarchy, co-primaries.
- **Tokens** (S1461): three tiers: global, alias and component. Components never reference raw values.
- **Grid** (S1428): 4, 8 and 12 columns; gutters of 16, 24 and 32; margins of 16 on mobile and 24 to 48 on desktop. Intentional grid-breaking only for emphasis.
- **Rebrand skills, still governing:**
  - S1418 colour roles;
  - S1434 visual hierarchy;
  - S1435 Von Restorff (one isolated element per view: the 4.8 numeral);
  - S1422 closure (dividers and implied shapes);
  - S0248 hue-preserving contrast fixes;
  - S0071 ramps;
  - S0011 brand consistency.

## Audit checks
- Is any changing number rendered without `tabular-nums`?
- Does any body paragraph run past 65ch?
- Are there more than 2 accent uses in any viewport screenshot?
- Does any text sit directly on a photo?
- Do any adjacent type levels sit closer than 1.25× without a weight or spacing jump?
- Are section gaps uniform?
