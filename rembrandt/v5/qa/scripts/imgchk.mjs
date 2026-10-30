import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [file, q, w] = process.argv.slice(2); const b = await chromium.launch();
const p = await (await b.newContext({ viewport: { width: +w, height: 812 }, isMobile: +w < 500, hasTouch: +w < 500 })).newPage();
await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${q}`); await p.waitForTimeout(1500);
for (let y = 0; y < 6000; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(150); }
console.log(await p.evaluate(() => [...document.querySelectorAll('main img')].map(i => `${i.dataset.img}:${i.complete && i.naturalWidth > 0 ? 'ok' : 'MISSING'}:${!!i.getAttribute('src')}`).join(' ')));
await b.close();
