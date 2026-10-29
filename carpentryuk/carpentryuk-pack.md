# Carpentryuk — homepage preview pack (for Claude build run)
Source: prospect's own site carpentryuk.com (text fetch 2026-10-28) + reply thread (Gmail 1a1836423f3cdab6).
Trigger: Stephen Nicholls replied 2026-10-28 22:42 Dhaka: "Yeh sure. Send it over I'll have a look" to Asiful's 28 Oct 08:19 Dhaka pitch (homepage in exchange for honest testimonials). NO preview sent yet — this is a NEW build.

## Verified business facts (use ONLY these — never invent)
- Business: Carpentryuk (site title "Carpentryuk.com"), Tamworth, Staffordshire.
- Contact: Stephen Nicholls — phone +44 7854 823288 — email carpentryuk.phone@googlemail.com (Cc Info@carpentryuk.com) — address 28 Kingston Cl, Tamworth B79 8TT.
- Coverage (their words): "throughout the midlands" / "across the midlands and nationwide".
- Services (their words, homepage):
  1. Bespoke kitchens ("From bespoke kitchens to design and build extensions").
  2. Home extensions — complete design and build package, working with local architects and trades.
  3. Home Renovations — transforming interiors with expert workmanship and attention to detail.
  4. Outdoor Structures — durable decks, pergolas, garden features built to last.
  5. Carpentry services — from a single door replaced, new stairs, complete home makeover, repairs to existing joinery.
- Positioning (their words): "quality craftsmanship and reliable service"; values: integrity, precision, customer satisfaction; "quality and professionalism".
- Current site weaknesses (verified): a bare default WordPress site ("Just another WordPress site" title), thin text-only content, no photos, no trust elements, no visible reviews, no clear call-to-action, no service detail. The preview must fix exactly this: real structure, proof-shaped sections, clear phone CTA.
- NOT verified (never print): founding year, review count/rating, testimonials, team size, accreditations, prices, guarantees. NO review quotes anywhere — none published for this firm. NO invented stats.

## Logo (Rule #1) — RESOLVED, file verified on disk
The live header carries a REAL logo image: a black hand-saw silhouette (transparent background) + bold "Carpentryuk.com" text beside it, same in the footer. Source file: https://carpentryuk.com/wp-content/uploads/2026/05/ext-custom-logo-1777959072130.webp — downloaded via the live browser to /home/hatch/workspace/browser_downloads/sess-3225646644/browser-download-20261028T170416.605261799Z-0-ext-custom-logo-1777959072130.webp (91,248 bytes, WebP, visually confirmed: hand-saw mark). The preview MUST embed this exact file (base64) at header size with the "Carpentryuk.com" wordmark beside it, matching their header treatment — never a recreation. NOTE: the file stays at its download path — copying it elsewhere failed (see AGENTS.md shell-write lesson, 2026-10-28).

## Verified site identity (live header check, 2026-10-28)
- Header phone 07854 823 288 — matches the trigger's +44 7854 823288 exactly. No email or street address printed on the homepage itself (contact details in this pack come from Asiful's verified outreach thread, not the homepage).
- Nav (in order): Services, Portfolio, Testimonials, About, Contact. The preview's full-site menu mirrors this: Services mega menu + Portfolio + Testimonials + About + Contact (future-page links "#").
- Colours: white / very pale warm grey backgrounds; large black serif headings; dark grey/black sans body; dark reddish-brown/rust accent (phone, service icons, solid "Learn More" button with white text). Preview palette follows this, refined — never a dark agency look.
- Their homepage photos (for tone reference only — do NOT hotlink or copy them as "their work"): fitted wooden kitchen hero, modern white kitchen, gallery of timber roof/truss frame, skylight roof, wooden porch frame, staircase with glass balustrade, kitchen with island, unfinished staircase from above.

## Build direction (standing criteria, condensed)
- HOMEPAGE of a future full website (not a landing page): full-website menu, Services mega menu listing all services, future-page links as "#" placeholders.
- Light, clean, trade-appropriate design; white space does the heavy lifting; never agency/dark/hi-tech. Client test: Stephen must think "that's us, on our best day".
- GSAP + ScrollTrigger animation throughout (the main event), card-stacking services, a signature craft scene adapted for carpentry (the making/fitting story, not a roofing story), small cursor follower reacting per background, subtle floating SVG details with cursor parallax, quiet unique shape dividers per section.
- Spacing is first-class: generous, consistent rhythm everywhere; section parity (every section equally animated/interactive, top to bottom); cards animate in staggered, never static.
- Hero images EMBEDDED (base64) so they load instantly. Photos: use real carpentry imagery that fits (workshop timber, fitted kitchen, decking) — clearly generic craft photography is acceptable ONLY as imagery, never captioned as Carpentryuk's own work; no before/after pairing; work shown one photo at a time, captioned by job type only.
- Mobile 375px fully designed (not stacked afterthought); no scroll traps; no pins that trap on phones.
- No placeholder text, no em dashes, plain human words, short paragraphs. Phone CTA prominent: +44 7854 823288. Quote form → formsubmit.co/carpentryuk.phone@googlemail.com (standard preview pattern). noindex in head (standard for previews). Tracking beacon before </body> (snippet in ~/workspace/previews/tracker-config.txt — DO NOT print its key anywhere).
- Self-checks before delivery: (a) button hover states keep text readable; (b) exact client logo/text wordmark per above; (c) no broken images; (d) no overlapping text; (e) mobile responsive at 375px; (f) no placeholder text; (g) zero console errors; (h) no horizontal overflow. NO SUBAGENTS — do all work directly in this run.
- Deliverable: ONE self-contained HTML file at /home/hatch/workspace/previews/carpentryuk.html + a short build note at /home/hatch/workspace/previews/carpentryuk-BUILD-NOTE.md (sections built, choices, self-check results).
