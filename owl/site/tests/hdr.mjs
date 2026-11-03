import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
for (const w of [1024, 1180, 1280]) { const p = await (await b.newContext({ viewport: { width: w, height: 300 } })).newPage(); await p.goto('file://' + process.argv[2] + '#/contact', { waitUntil: 'load' }); await p.waitForTimeout(300);
  const r = await p.evaluate(() => { const n = document.querySelector('.owl-header nav'); const cs = getComputedStyle(n); const a = [...n.querySelectorAll('a')].map(x => x.getBoundingClientRect()); const cta = document.querySelector('.owl-header .btn, .owl-header a[href^="tel:"]').getBoundingClientRect(); return { shown: cs.display !== 'none', overlap: a.length ? a[a.length - 1].right > cta.left : false, wrap: a.length ? new Set(a.map(x => Math.round(x.top))).size > 1 : false, ov: document.documentElement.scrollWidth - innerWidth }; });
  console.log(w, JSON.stringify(r)); await p.screenshot({ path: `hdr-${w}.png`, clip: { x: 0, y: 0, width: w, height: 100 } }); }
await b.close();
