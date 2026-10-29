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


## OWNER DIRECTION CHANGE (binding; supersedes the Run D continuation wherever it conflicts)
The current result is rejected: too much text, too many unnecessary things, animations used poorly. It feels like a document, not an award-winning website. Rebuild the HOMEPAGE to this standard, in this session only, keeping the repo, the true facts, and the checkpoint/commit discipline.

THE STANDARD
- Award-winning, top 0.1 percent: an immersive experience, never a document. If any section reads like an article or a brochure, it has failed.
- WEB-SKILLS.md is the ONLY judgment. Every layout, motion, cursor, scroll, typography and interaction decision must come from a named skill, read in full by its tag before use, with its exact parameters. Select the full skill pack this build needs and read those skills fully before writing any HTML.
- A custom cursor, never the default pointer. It reacts DIFFERENTLY to different elements: the hero button one way, the next section's button a different way. Headings and text shift or respond as it passes; cards and images each respond in their own way. Follow the library's cursor, magnetic and hover skills exactly.
- Layered depth everywhere: background, midground and foreground moving at different parallax rates. Backgrounds react, differently in each section. Rich, animated, interactive SVG renders. 3D/WebGL where it genuinely raises the experience, never cartoonish.
- Text in motion. Scroll choreographed and varied per section. Never the same trick twice: each section has its own interaction language.

CONTENT: VISITOR FIRST, NO FILLER
- The visitor is a homeowner with a damaged, leaking or old roof who wants help fast.
- CUT all educational and document content: no roof anatomy, no "seven layers", no explainers.
- Every section must earn its place toward trust or toward the call. Short strong lines, real proof, phone (937) 746-7377.

DELIVERABLE AND THREE VERSIONS PER SECTION
- ONE self-contained HTML file, HOMEPAGE ONLY, with ALL images embedded (the attached photos; ba2 is the only genuine before/after pair). It opens by double-click and behaves like the finished website.
- EVERY section ships in three genuinely different versions (different design and interaction treatments from the skills, not colour swaps), with one small control on the section: 1 · 2 · 3. Clicking swaps ONLY that section; everything else stays exactly the same.

FACTS: NEVER INVENT BEYOND THESE
- Rembrandt Roofing & Restoration, Springboro / Greater Dayton, Ohio. Phone (937) 746-7377.
- Founded 1995 by Franklin "Bunk" Walker; son Wade president since 2015; Rachel answers the phone.
- 4.9 stars from 295 Google reviews. BBB A+ since 2001. Owens Corning Platinum Preferred. $2M liability.
- Written line-item estimates. Mon-Fri 9-5 (never claim 24/7). 24 service towns.
- No Ohio licence number exists: do not print one.
- Banned skeletons still apply: no proof-strip hero + service picker + bento services + pinned leak story + estimate paper + before/after + FAQ + gable close; no Job Ticket system.

WORKING RULES
- Sub-agents: a couple at most, only where they clearly make the work faster. Usage matters. Do the core building yourself.
  (Note: 9 skill-reading agents were already in flight when this arrived. They are left to finish, and no more will be launched.)
- Homepage first. Audit EVERY section against the skills used (their checklists and do/don't lists), fix what fails, and only then present the file. Inner pages wait until the homepage is finalized with the owner.

ATTACHED PHOTOS (owner, 2026-10-29): images/1.png logo (396x120, embed exact bytes, at most 200 px wide); 2.webp team at the office (1088x801); 3.png ba2 BEFORE (1024x768, "Before" label baked in); 4.webp ba2 AFTER (1024x768, "After" label); 5.jpg Tudor house job photo (2000x1013). The firm's site has the same ba2 pair at 1440x1080.

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
