# Rembrandt v5: redesign run plan (started 2026-10-29)

## Why v5
The owner reviewed the v4 homepage (as the one-file preview) and rejected it:
- too many unnecessary things and too much text: it reads like a document;
- not fun, not award-level, animations used poorly.

v4 stays in the repo untouched; v5 is a lean redesign.

## Owner's requirements (binding)
1. Deliver ONE self-contained HTML file per site: all CSS, JS, fonts and ALL IMAGES embedded. Open it and it loads like a website. This applies to every site in the pipeline.
2. Every homepage section has a 1 | 2 | 3 button set: 1 shows version one of that section, 2 version two, 3 version three.
3. Far less text, more visual, fun, award-winning feel, animation used well. Cut the unnecessary.
4. WEB-SKILLS.md (uploaded as /root/.claude/uploads/43c9e22a-5230-526e-a737-ae81faad601a/5682dcd4-WEB-SKILLS_2.md, 443,315 lines; the same library v4 used) has UTMOST PRIORITY. Its protocol:
   - read the whole INDEX (lines 92-1667);
   - choose a Skill Pack of at least 50 skills (normally 60-150) covering every dimension, including review skills;
   - SHOW the pack to the owner (ID — name — reason, grouped, with the count);
   - read every chosen skill fully and keep exact Skill Pack Notes (on disk: v5/SKILL-PACK-NOTES.md);
   - before every build step, state the skill IDs; after it, audit against the review skills; end messages with "Skills applied: <IDs>".

## Real photos: the firm's own site
Downloaded 137 originals (144 MB) from rembrandtroofing.com (page-sitemap image list) to the scratchpad `firm/img`. They are not in the repo; the embedded copies will be resized.
Contact sheets: scratchpad `shots/firm-0..4.jpg`; the numbers below are sheet indexes.

Real job photos (completed roofs):
- 3 and 31 (`15979302271161674…jpeg`, `5939789843807722737…jpeg`): modern white farmhouse
- 13: log cabin
- 16, 17, 21–26: `2025-03-12-*` series, plus `2024-12-17-*`
- 27: `203580-1920w`
- 97–99: `RR_roofbrochure*`

Install:
- 28 and 29 (`35821-1920w`, `35822-1920w`): roofers on underlayment, low sun. Strong.
- 40 (`83646…`): decking
- 66 (`Do-I-need-to-be-home…`)
- 102 and 103 (`Roof-Replacement-Ice-and-Water-Shi*`): DRONE aerials, 3000x1688
- 106 (`Smales1`): aerial

Damage:
- 111 `Tree-Limb-On-House`
- 124 `Wind-Damage-Shingles`
- 65 `Can-high-winds…` (chimney)
- 71 `How-do-I-know-if-storm-damage…` (recent vs old)
- 121 decking

Before/after:
- 51 `BEFORE.png`, 125 `after.png`, 8 `2.png` (During). Labels are baked in; crop them out.
- 50 `BEFORE-AFTER-Ginnan-FRONT-AFTER`
- 52 `Before-scaled…` (2560x1297)

Team and people:
- 113 `Untitled-design-20` (team at the office)
- 96 `ROOFING-Rembrandt-Roofing-Crew` (crew and truck)
- 110 `Team-Photo-ENHANCED`
- 59 (team in a field)
- 58 (GSF team)
- 108 `Team-BunkAnd-Wade`
- 100 `Rachel-Tussey-Operations-Manager`
- staff portraits 48, 49, 77, 80–82, 90, 101, 114, 115

Trucks and brand: 47, 83, 135 (van), 46 (dog with truck), 73 (dog with sign).

Community: 60 and 61 (Gary Sinise Foundation, John Kremer).

Logos (in `firm/`):
- `Rembrandt-logo.png`, `owens-corning.png`, `bbb-accredited.png`, `james-hardie.png`
- review-site stars (Google, Houzz, Facebook, Yelp)

Probably AI or stock, avoid or label: 30, 32, 33, 44, 45, 118–123, 126, 134.

## Steps
1. Index → Skill Pack (≥50) → show the owner.
2. Read the pack and write v5/SKILL-PACK-NOTES.md.
3. Lean plan, v5/PLAN.md: ~7 sections × 3 versions, minimal copy, image-led, strong motion.
4. Build, then audit.
5. One-file HTML with embedded images.
6. Checkpoint and commit after each chunk.
