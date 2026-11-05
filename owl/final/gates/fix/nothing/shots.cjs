// "Nothing" evidence: each version at three scroll points, desktop 1440 and phone 390
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), DSF = +(process.argv[2] || 1), PAL = process.argv[3] || 'shingle';
(async () => { const b = await chromium.launch(); const errs = [];
  for (const v of [1, 2, 3]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push('v' + v + ' ' + e.message));
    await p.goto(F + '?nothing=' + v + '&palette=' + PAL); await p.mouse.move(w - 3, 3); await p.waitForTimeout(1500);
    for (const [k, f] of [['1', .08], ['2', .5], ['3', .93]]) {
      await p.evaluate(f => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(1500);
      await p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-${k}.jpg`), type: 'jpeg', quality: 80 }); }
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
