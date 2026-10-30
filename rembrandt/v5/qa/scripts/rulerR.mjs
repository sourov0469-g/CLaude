import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch();
for (const w of [1440, 1024]) { const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage(); await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html?v=area4'); await p.waitForTimeout(1500);
console.log(w, await p.evaluate(() => { const r = [...document.querySelectorAll('.tw4-t')].map(l => l.getBoundingClientRect()); let n = 0; for (let i = 0; i < r.length; i++) for (let j = i + 1; j < r.length; j++) { const a = r[i], c = r[j]; if (a.left < c.right && c.left < a.right && a.top < c.bottom && c.top < a.bottom) n++; } return 'overlapping label pairs ' + n + '; wrap h ' + Math.round(document.querySelector('.tw4-wrap').getBoundingClientRect().height); })); }
await b.close();
