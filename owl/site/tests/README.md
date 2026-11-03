# Owl site tests (Playwright, run from anywhere)
Each takes the built file path: `node <test>.mjs /abs/path/owl/site/owl-roofing.html`.
pageshot/rshot/stage also take an output dir and a route. pagetest takes: file page chapterLinkSelector chapterSection deepSection sectionCount.
Storm page: stormtest-page, stormrm, wisetest, builttest. Nest page: pagetest, nesttest-page. Families page: pagetest, famtest-page. Contact page: pagetest, contacttest, msg2. Header widths: hdr. Remediation pass: remedtest (.cjs), with pricetest, areatest, famtest. Whole site: sitepass. Services and routing: routetest.
Measurement pass (dev tools, scratch-installed, never shipped): axeaudit.cjs needs axe-core 4.10.2 (`node axeaudit.cjs <file> <path>/axe.min.js`);
accent.cjs needs pngjs 7.0.0 on NODE_PATH; vitals.cjs (lab LCP/CLS); fbdiff.cjs (fallback vs web-font widths: `node fbdiff.cjs <file> <page>`).
