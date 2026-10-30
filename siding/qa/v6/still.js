// node still.js <fileurl> <outdir> — F17 evidence by pixels: with the pointer parked outside the page and 3 s settled,
// two viewport screenshots 1.2 s apart; the changed-pixel share tells what keeps moving on its own.
const { chromium } = require('playwright');
const SECS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book'];
const [URL, OUT] = process.argv.slice(2);
(async () => { const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
  for (const s of SECS) for (const v of [1, 2, 3]) {
    await p.goto(`${URL}?v=${SECS.map(x => x === s ? v : 1).join('')}`, { waitUntil: 'load' });
    await p.evaluate(s => { const el = document.getElementById(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); }, s);
    await p.mouse.move(1439, 1); await p.waitForTimeout(3000);
    await p.screenshot({ path: `${OUT}/${s}${v}-a.png` }); await p.waitForTimeout(1200); await p.screenshot({ path: `${OUT}/${s}${v}-b.png` });
  }
  await b.close(); })();
