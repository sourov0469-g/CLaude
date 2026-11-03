# QA scripts for site.html

All checks run with Playwright and Chromium. Run each one with `node <script>` from any folder; the site path is absolute.

| Script | Checks | Gate |
|---|---|---|
| audit.js | Every page × both versions × 1440 and 375 px. One visible h1, alt on every image, no unnamed button, every route resolves, no overflow at 375. | Build 1 → |
| kb.js | Keyboard-only walkthrough of every page and version. Every focus stop must show an indicator, must not be hidden or aria-hidden, and there must be no trap. | Build 5 |
| contrast.js | Rendered contrast. Every visible text element against the background it sits on. SVG text uses its fill at its effective opacity. Every focus ring is checked against its background, two-tone rings included. | Build 5 |
| pinfit.js, pinfit667.js | Every pinned section, mid-run, at 375×740 and 375×667: content must stay inside the sticky viewport. | Build 4 |
| perf.js, cls.js | FCP, LCP, CLS, total blocking time and long tasks, at 1440 px and at 375 px with a 4× CPU slowdown. cls.js names the elements that shift. | Build 5 |
| rm.js | Booking deep link and reduced motion. | Build 1 → |
| pause.js, route.js | The Pause control stops and resumes motion; ambient motion stops on route change. | Build 2–3 |
| ptr.js | Cursor companion under stepped real pointer movement. | Build 4 |
| ax.js | (`node ax.js 390` for the phone header) Chromium's accessibility tree (what a screen reader is given), every page × both versions: h1 count, heading skips, landmarks and their names, controls or images with no name. | Build 6 |
| live.js | Route change is announced through the polite live region and moves focus to the h1; pair-photo alts after a seam swap. | Build 6 |
| vp.js | The brief's veto widths: 390×844, 768×1024 and 1024×768, every page × both versions, walked screen by screen. Page overflow, elements past the edge, clipped text, overlapping text, tap targets under 24 px, bordered controls with text against the border, JS errors. `node vp.js shots <dir>` also saves full-page shots. | Build 7 |
| lint.py | Conformance counts (python3 -I lint.py [--list]): spacing off the Carbon ladder, raw colours, raw font sizes and distinct sizes declared, radius off token, primitives read by components, inline styles with primitives or raw values, raw SVG paint; swatches (`data-swatch`) and mask paint exempt; drawing primitives counted as open. | Build 8 |
| weights.js | Every visible text element, every page × both versions, at 1440 and 390: family + computed weight against the `@font-face` faces in the file (synthesised weights), and the distinct rendered text sizes. | Build 8 |
