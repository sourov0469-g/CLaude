import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html?v=area1'); await p.waitForTimeout(900);
await p.evaluate(() => document.querySelector('.tw1-map').scrollIntoView({ block: 'center' })); await p.waitForTimeout(1500);
console.log(await p.evaluate(() => { const T = [...document.querySelectorAll('.mk text')].map(t => ({ n: t.textContent, b: t.getBBox() })), H = [...document.querySelectorAll('.mk .mk-h')].map(h => h.getBBox()); const ov = (a, c) => a.x < c.x + c.width && c.x < a.x + a.width && a.y < c.y + c.height && c.y < a.y + a.height; const bad = []; T.forEach((t, i) => { T.forEach((u, j) => { if (j > i && ov(t.b, u.b)) bad.push(t.n + '/' + u.n); }); H.forEach((h, j) => { if (ov(t.b, h)) bad.push(t.n + '/house' + j); }); }); return 'label overlaps: ' + (bad.length ? bad.join(', ') : 0); }));
await p.locator('.tw1-mapwrap').screenshot({ path: '/home/user/CLaude/rembrandt/v5/qa/area1-map-1440.jpg', type: 'jpeg', quality: 70 });
await b.close();
