const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); fs.mkdirSync('igloo/k', { recursive: true });
await p.goto('https://www.igloo.inc', { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(12000); await p.mouse.move(720, 600);
for (let g = 0; g < 7; g++) { for (let k = 0; k < 6; k++) { await p.mouse.wheel(0, 120); await p.waitForTimeout(30); }
  for (const t of [300, 900, 2200]) { await p.waitForTimeout(t === 300 ? 300 : t - (t === 900 ? 300 : 900)); await p.screenshot({ path: `igloo/k/g${g}-${t}.jpg`, type: 'jpeg', quality: 50 }); } }
await p.mouse.move(720, 450, { steps: 10 }); await p.waitForTimeout(800); await p.mouse.click(720, 450); await p.waitForTimeout(1500); await p.screenshot({ path: 'igloo/k/click-1500.jpg', type: 'jpeg', quality: 50 });
await p.waitForTimeout(2500); await p.screenshot({ path: 'igloo/k/click-4000.jpg', type: 'jpeg', quality: 50 });
await b.close(); })().catch(e => console.log('ERR', e.message.slice(0, 200)));
