// Wise V2 evidence: each lens mode over the chimney. node w2-shots.cjs [dsf] [outdir]
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const DSF = +(process.argv[2] || 1); const OUT = path.resolve(__dirname, '..', process.argv[3] || 'gates/wip'); fs.mkdirSync(OUT, { recursive: true });
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html') + '?wise=2';
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });
    p.on('pageerror', e => errs.push(w + ' pageerror: ' + e.message));
    await p.route('https://**', r => r.abort()); await p.goto(F); await p.waitForTimeout(800);
    await p.addStyleTag({ content: '.hdr{visibility:hidden}' });
    await p.evaluate(() => document.querySelector('.wise2').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(1200);
    for (let m = 0; m < 4; m++) {
      await p.click('.wise2 .mode:nth-child(' + (m + 1) + ')');
      const pt = await p.evaluate(() => { const r = document.querySelector('.wise2 .stage svg').getBoundingClientRect(); return { x: r.left + r.width * 520 / 800, y: r.top + r.height * 205 / 520 }; });
      await p.mouse.move(pt.x - 40, pt.y + 30); await p.mouse.move(pt.x, pt.y, { steps: 5 });
      if (m === 3) { await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(500); await p.mouse.move(pt.x - 150, pt.y + 120, { steps: 4 }); await p.mouse.down(); await p.mouse.up(); }
      await p.waitForTimeout(700);
      const bb = await p.evaluate(() => { const r = document.querySelector('.wise2').getBoundingClientRect(); return { x: 0, y: Math.max(0, r.top), width: innerWidth, height: Math.min(innerHeight, r.height) }; });
      await p.screenshot({ path: path.join(OUT, `wise-v2-m${m}-${w}.jpg`), quality: 82, type: 'jpeg', clip: bb });
    }
    await p.close();
  }
  console.log(errs.length ? errs.join('\n') : 'no errors'); await b.close();
})();
