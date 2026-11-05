// Section 6 evidence: the contour map, typing a town, tapping a dot, a town not on the list; two treatments
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-reset.html'), DSF = +(process.argv[2] || 1);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const pal of ['night', 'safety']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push(e.message));
    await p.goto(F + '?palette=' + pal); await p.mouse.move(w - 3, 3); await p.waitForTimeout(1000);
    const go = () => p.evaluate(() => { const s = document.getElementById('towns'); scrollTo({ top: s.getBoundingClientRect().top + scrollY + (innerWidth > 860 ? 40 : 60), behavior: 'instant' }); });
    await go(); await p.waitForTimeout(900); await go(); await p.waitForTimeout(700);
    const shot = n => p.screenshot({ path: path.join(__dirname, `${pal}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    const ph = () => w <= 860 ? p.evaluate(() => scrollTo(0, document.querySelector('#towns .ask').getBoundingClientRect().top + scrollY - 70)) : 0;
    await shot('1-map'); await p.fill('#tw-in', 'Rosev'); await ph(); await p.waitForTimeout(700); await shot('2-typed');
    await p.click('#towns .dot >> nth=18'); await p.waitForTimeout(700); await ph(); await p.waitForTimeout(200); await shot('3-tapped');
    await p.fill('#tw-in', 'Duluth'); await ph(); await p.waitForTimeout(600); await shot('4-not-listed');
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
