// Section 4 evidence: arrival of the numbers (mid count-up and settled), in its seam with section 3; two treatments
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-reset.html'), DSF = +(process.argv[2] || 1);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const pal of ['night', 'slate']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push(e.message));
    await p.goto(F + '?palette=' + pal); await p.mouse.move(w - 3, h / 2); await p.waitForTimeout(1000);
    await p.evaluate(() => { const s = document.getElementById('numbers'); scrollTo(0, s.offsetTop - innerHeight * .35); }); await p.waitForTimeout(900);
    await p.screenshot({ path: path.join(__dirname, `${pal}-${w}-1-seam.jpg`), type: 'jpeg', quality: 80 });
    await p.evaluate(() => { const s = document.getElementById('numbers'); scrollTo(0, s.offsetTop); }); await p.waitForTimeout(450);
    await p.screenshot({ path: path.join(__dirname, `${pal}-${w}-2-counting.jpg`), type: 'jpeg', quality: 80 });
    await p.waitForTimeout(1600); await p.screenshot({ path: path.join(__dirname, `${pal}-${w}-3-settled.jpg`), type: 'jpeg', quality: 80 });
    await p.evaluate(() => { const s = document.getElementById('numbers'); scrollTo(0, s.offsetTop + s.offsetHeight - innerHeight); }); await p.waitForTimeout(1800);
    await p.screenshot({ path: path.join(__dirname, `${pal}-${w}-4-grid.jpg`), type: 'jpeg', quality: 80 });
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
