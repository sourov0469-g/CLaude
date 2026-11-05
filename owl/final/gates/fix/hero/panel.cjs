// the switcher, as the owner sees it: desktop and phone, panel open, then a switch to V2 and the panel again
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html');
(async () => { const b = await chromium.launch();
  for (const [w, h] of [[1440, 900], [390, 844]]) { const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto(F); await p.waitForTimeout(1500); await p.click('.vers'); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, `panel-${w}-1-open.jpg`), type: 'jpeg', quality: 80 });
    await p.click('.vp-row >> nth=0 >> .vp-v >> nth=1'); await p.waitForLoadState('load'); await p.waitForTimeout(1800);
    const st = await p.evaluate(() => ({ url: location.search + location.hash, cur: RESET.versions.top.cur, mixed: document.querySelector('.vers').classList.contains('mixed') }));
    console.log(w, JSON.stringify(st)); await p.click('.vers'); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(__dirname, `panel-${w}-2-switched.jpg`), type: 'jpeg', quality: 80 }); await p.close(); }
  await b.close(); })();
