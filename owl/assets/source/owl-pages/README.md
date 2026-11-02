# Owl material from the inner pages (sweep at the Phase 1 gate)

**Source:** `sitemap_index.xml`, then the roofing, roof-repair, storm-damage, siding, gutters, community-involvement,
services, brands-materials and roofing/shoreview pages.
- Fetched with curl (default UA) in the foreground. The bot wall was not touched.
- Files were copied from `wp-content/uploads` byte for byte. The one exception is the Quincy House PNG: it was 3.4 MB and
  is re-encoded to JPG.

## Result: no Owl before/after pair exists on owlroofing.com
No image on the swept pages, and no upload in the sitemaps, is a before/after of an Owl job.

**What follows, per the asset rule:**
- Before/after content uses the one permitted fallback pair: the genuine pair from the earlier work, unbranded, with no
  invented job details.
- Otherwise it is drawn as SVG.
- It is never captioned as an Owl job.

## Owl's own (usable as Owl's)
| File | What it is (Owl's own wording where it exists) |
|---|---|
| `Wise-Check.png` | The badge for **The Wise Check**. Owl's text on /roofing/: "Owl Roofing's thorough, no-guesswork roof assessment … a detailed roof and attic evaluation, clear photo and video documentation, and leak detection tools". Its listed parts are Attic Inspection and Heat-Sensor Leak Detection. |
| `get-it-right-guarantee-owl.png` | The Get It Right Guarantee seal (Owl's 10-year workmanship guarantee). |
| `Owl-Mom-Approved.png`, `owl-mom-cutout.webp` | The "Owl Mom Approved" badge and cutout. Owl uses them on the service pages and publishes **no explanatory text** for them, so they are used without an invented claim. |
| `owl-map.webp` | Owl's own service-area map (Shoreview, North Oaks, Arden Hills, Roseville, White Bear Lake and others). |
| `owl-roofing-community-involvement.webp`, `owl-roofing-habitat-for-humanity.webp` | From the Community Involvement page. Owl's alt text only, so captions stay at "Community involvement". |
| `quincy-house-noah-bergland.jpg` | Noah Bergland (co-founder). The upload's file name says "Quincy House … charitable work"; captions say no more than that. |

## `unproven/`: may not be presented as an Owl job
House and roof photos with SEO file names: `expert-roofing-shoreview`, `owl-roofing-north-oaks`, `owl-siding-roseville`,
`perfected-roofing-process`, `owl-roofing-storm-damage-repair`, `drone-photo-roof`, `owl-roof-quote`.
- Their styling matches stock libraries, and nothing on the site ties them to a specific job.
- They are illustrative imagery only, with no place names, addresses or dates in captions.
