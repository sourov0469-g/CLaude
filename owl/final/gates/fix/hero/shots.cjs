// Hero evidence: every version, at its key states, desktop 1440 and phone 390; palette from argv (default shingle)
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), DSF = +(process.argv[2] || 1), PAL = process.argv[3] || 'shingle';
(async () => { const b = await chromium.launch(); const errs = [];
  for (const v of [1, 2, 3, 4]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push('v' + v + ' ' + e.message));
    await p.goto(F + '?top=' + v + '&palette=' + PAL); await p.mouse.move(w - 3, 3); await p.waitForTimeout(2600);
    const shot = n => p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    await shot('1');
    if (v === 1 || v === 2) { await p.evaluate(f => { const s = document.getElementById('top'); scrollTo(0, (s.offsetHeight - innerHeight) * f); }, v === 1 ? .7 : .5); await p.waitForTimeout(1500); await shot('2'); }
    if (v === 2) { await p.evaluate(() => { const s = document.getElementById('top'); scrollTo(0, (s.offsetHeight - innerHeight) * .95); }); await p.waitForTimeout(1500); await shot('3'); }
    if (v === 4) { await p.click('#top .ans button >> nth=0'); await p.waitForTimeout(1800); await shot('2-answered'); }
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
