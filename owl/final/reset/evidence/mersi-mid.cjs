const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const O = path.join(__dirname, 'mersi');
  await p.goto('https://www.mersi-architecture.com/', { waitUntil: 'domcontentloaded', timeout: 45000 }); await p.waitForTimeout(7000);
  await p.mouse.wheel(0, 900); for (const [k, ms] of [[1, 120], [2, 180], [3, 260], [4, 600]]) { await p.waitForTimeout(ms); await p.screenshot({ path: path.join(O, `mid-${k}.jpg`), type: 'jpeg', quality: 55 }); }
  await b.close(); })();
