// probe: time from the scroll to the chapter switch and to the first visible movement, on the finished homepage and the workbench
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch();
  for (const f of ['owl-roofing.html', 'owl-reset.html']) { const r = [];
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.goto('file://' + path.resolve(__dirname, '..', f)); await p.waitForTimeout(2500);
    for (let k = 0; k < 4; k++) {
      await p.evaluate(() => { const s = document.getElementById('people'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .15); }); await p.waitForTimeout(1500);
      r.push(await p.evaluate(() => new Promise(res => { const s = document.getElementById('people'), t0 = performance.now(); let sw = 0;
        scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * .5);
        (function tick(){ const on = s.querySelector('.cv.on'), past = s.querySelector('.cv.past'); if (past && !sw) sw = performance.now() - t0;
          const ty = past ? parseFloat(getComputedStyle(on.querySelector('img')).translate.split(' ')[1] || '0') : 100;
          if (ty < 99) return res(Math.round(sw) + '/' + Math.round(performance.now() - t0)); if (performance.now() - t0 > 2000) return res('timeout'); requestAnimationFrame(tick); })(); }))); }
    console.log(f, 'switch/first-move ms:', r.join('  ')); await p.close(); }
  await b.close(); })();
