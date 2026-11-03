# GATE: Single-file assembly (Phase 5, part 3)

> **Verdict in full format: `GATE-QA-1.md`, section "Assembly: verdict folded into round 1"** (completion point 2). It gives the real scorecard (weighted 7.3, PASS), references and WEB-SKILLS tags.
>
> **Corrections to this page:** the file is now **3.65 MB**, not 3.68 MB (Phase 10 dropped the fonts of the retired backups). The "seven inert CSS selectors" were **removed in Phase 6**. Both are corrected in place below (the old wording struck through where it stood alone).

**Delivered file:** `remodeling/site/elbaz-construction.html`, **ONE** HTML file of ~~3.68~~ 3.65 MB with in-file navigation across all five pages (Home, Kitchens, Bathrooms, Renovation, Contact). Built by `remodeling/src/tools/assemble.py` from the five built pages.
- **Rebuild:** `python3 build.py`, then `python3 tools/assemble.py`.

## How it works
- **Five isolated pages:** each page is kept whole, as its own document, shown in one full-viewport frame. Section CSS and scripts stay isolated: no class collisions between pages and a fresh runtime per page.
- **Shared blocks stored once:** the image store (the union of all pages: 38 images) and GSAP. Each page template keeps only the list of its own images. The file was 3.68 MB (now 3.65 MB), against 5.6 MB for the five pages separately.
- **A bridge injected into every page:**
  - links to the other pages are handed to the shell;
  - outside links open in a new tab;
  - the consultation mail opens from the top window (verified: `EZ.consultMail` routes through `top.location`).
- **Navigation:** the shell keeps `#/page` (and `#/page/anchor`) in the address. Back and forward work, and deep links work: `#/contact/contact-form` lands the form at the top (measured top 0).
- **The logo's page-switch shared element:** on every switch the logo's bracket closes into the room (the tile tucks in), the new page loads behind it, and the room opens on the new page. This is the logo story's press beat, used as the hand-off. Reduced motion swaps instantly.
- **Parser safety:** templates live in `script type="text/plain"`. Every `</script` and every `<!--` is neutralised with markers restored at build time, so the HTML parser cannot be switched into double-escaped script data.

## The 104 inherited backups do not ship (Muse ruling 5)
- The assembler **refuses to build** if any `.ver[data-v="b…"]` element is present. Measured: 0 on every page.
- **Shipped versions:** Home 13, Kitchens 7, Bathrooms 7, Renovation 8, Contact 8, exactly the plan's counts.
- ~~Seven inert CSS selectors that once themed the old backups remain in the core stylesheet. They match nothing; flagged for a later tidy.~~ Removed in Phase 6.

## Verified (Playwright, foreground)
| check | result |
|---|---|
| Home loads | title, h1 "Built properly. Permitted correctly.", 10 sections, 38 images (0 broken), GSAP + ScrollTrigger present |
| Nav → Kitchens / Bathrooms / Renovation / Contact | each page's own title and h1; 5 sections each; images 18 / 18 / 10 / 2, 0 broken |
| Back button | returns to the previous page (Renovation) |
| Deep link `#/contact/contact-form` | the form at the top |
| Logo / Home link | back to Home |
| Console errors across all frames | **0** |

## Defects remaining (honest)
- **The `pre-finalize` tag** still cannot be pushed (the remote refuses tag pushes). `ce59679` remains in the branch history.
- **The frame shell:** the address shows `#/page` rather than separate file names. That is by design (one file).

Render evidence: `qa/finalize/assembly/`.
