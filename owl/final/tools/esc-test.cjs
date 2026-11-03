const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const out = [];
  for (let i = 0; i < 3; i++) { const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.route('https://**', r => r.abort()); await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?hero=4'); await p.waitForTimeout(1500);
    await p.click('.ver[data-v="4"] .btn-film.light'); await p.waitForTimeout(300); const open = await p.evaluate(() => !!document.querySelector('dialog.ytm')); const act = await p.evaluate(() => document.activeElement.tagName + '.' + document.activeElement.className);
    await p.keyboard.press('Escape'); await p.waitForTimeout(400); out.push([open, act, await p.evaluate(() => !document.querySelector('dialog.ytm'))]); await p.close(); }
  console.log(JSON.stringify(out)); await b.close(); })();
