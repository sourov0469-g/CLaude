// Numbers evidence: each version settled, plus the arrival mid-way (V1: whole cards, no masks; V2: marks gathering)
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), DSF = +(process.argv[2] || 1), PAL = process.argv[3] || 'shingle';
(async () => { const b = await chromium.launch(); const errs = [];
  for (const v of [1, 2, 3]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push('v' + v + ' ' + e.message));
    await p.goto(F + '?numbers=' + v + '&palette=' + PAL); await p.mouse.move(w - 3, 3); await p.waitForTimeout(1500);
    await p.evaluate(() => scrollTo({ top: document.getElementById('numbers').offsetTop - 40, behavior: 'instant' }));
    await p.waitForTimeout(v === 2 ? 500 : 150); await p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-1-arriving.jpg`), type: 'jpeg', quality: 80 });
    await p.waitForTimeout(2200); await p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-2-settled.jpg`), type: 'jpeg', quality: 80 });
    await p.evaluate(() => { const s = document.getElementById('numbers'); scrollTo({ top: s.offsetTop + s.offsetHeight - innerHeight, behavior: 'instant' }); }); await p.waitForTimeout(1200);
    await p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-3-end.jpg`), type: 'jpeg', quality: 80 });
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
