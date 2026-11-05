// Section 1 evidence: the arrival (beat 1 over the playing crew film, then beat 2); two treatments
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-reset.html'), DSF = +(process.argv[2] || 1);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const pal of ['night', 'slate']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push(e.message));
    await p.goto(F + '?palette=' + pal); await p.mouse.move(w - 3, 3); await p.waitForTimeout(2600);
    const shot = n => p.screenshot({ path: path.join(__dirname, `${pal}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    await shot('1-arrive');
    await p.evaluate(() => { const s = document.getElementById('top'); scrollTo(0, (s.offsetHeight - innerHeight) * .7); }); await p.waitForTimeout(1300); await shot('2-second-beat');
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
