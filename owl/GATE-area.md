# GATE · Service area (home §10): two versions

**Where it lives:** `owl/site/owl-roofing.html`. Switch versions with `?v=area:1|2`. **Default: V1.**

**Basis:**
- **Facts:** the pack's confirmed list of 29 towns, plus Owl's "surrounding Minnesota communities", and Owl's own map.
- **Background:** B2 Rings, assigned to place sections after generation-test round 1.
- **References:** none from the annex is needed. This is the place-list component (the generation-test section) and a
  small tool.

## V1 · List and map
This is the generation-test section, built from the assets alone:
- the section head and the 29-town place-list (Shoreview bold with a pin);
- Call;
- Owl's map in a 4:3 frame.

## V2 · "Is your town on our list?"
A town finder. The field filters the list as you type: matches bold, the rest dimmed. A live answer is announced in
plain words:

| Input | Answer |
|---|---|
| A listed town | "Yes: Owl works in Roseville." |
| "St Paul" | Normalised to Saint Paul |
| A prefix | Lists the matching towns |
| An unlisted town | "Not on the list, but Owl also works in surrounding Minnesota communities. Call or text and ask." This is honest and promises nothing. |

## Ratings
| | V1 | V2 |
|---|---|---|
| Design (40) | 7.0 | 7.0 |
| Usability (30) | 7.5 | 8.5 |
| Creativity (20) | 6.5 | 7.5 |
| Content (10) | 9.0 | 9.0 |
| **Weighted** | **7.25** | **7.70** |

**Default: V1, despite the lower score.** V2 scores higher, but V1 shows Owl's own map, the strongest place evidence Owl
has. The homepage already carries two tools (the game and Price My Roof), and a third input this late would compete with
the call band. **V2 is recommended for the Contact page.**

**Vetoes:** none. No overflow at 1440 or 390; no errors; facts only.

## Tests: 7/7 pass (`areatest.mjs`)
- **Answers:** an exact match; "St Paul" normalised; prefix matches listed; an unlisted town gets the honest answer;
  clearing restores the summary.
- **Each version** has 29 towns.
- **No errors.**
- **Token lint:** clean.

## Defects found and fixed
1. **Punctuation:** a truncated match list ended in "…." (an ellipsis plus a full stop). Fixed.
