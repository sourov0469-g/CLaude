// Finder evidence: each version, key states, desktop 1440 and phone 390
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), DSF = +(process.argv[2] || 1), PAL = process.argv[3] || 'shingle';
(async () => { const b = await chromium.launch(); const errs = [];
  for (const v of [1, 2, 3]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push('v' + v + ' ' + e.message));
    await p.goto(F + '?finder=' + v + '&palette=' + PAL); await p.mouse.move(w - 3, 3); await p.waitForTimeout(1500);
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(900);
    const shot = n => p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    await shot('1');
    if (v === 1) { await p.click('#finder .pill >> nth=3'); await p.waitForTimeout(1900); await p.evaluate(() => { const s = document.querySelector('#finder .scene'); s.scrollIntoView({ behavior: 'instant' }); }); await p.waitForTimeout(400); await shot('2-storm'); }
    if (v === 2) { await p.click('#finder .spot >> nth=2'); await p.waitForTimeout(900); if (w < 900) await p.evaluate(() => scrollBy(0, -260)); await shot('2-dormer'); }
    if (v === 3) { await p.click('#finder .o1 button >> nth=0'); await p.waitForTimeout(800); await shot('2-q2'); await p.click('#finder .o2 button >> nth=0'); await p.waitForTimeout(900); await shot('3-answer'); }
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
