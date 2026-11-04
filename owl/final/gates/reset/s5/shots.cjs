// Section 5 evidence: the split cover at each chapter and mid-turn; two treatments; desktop + phone
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-reset.html'), DSF = +(process.argv[2] || 1);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const pal of ['night', 'control']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push(e.message));
    await p.goto(F + '?palette=' + pal); await p.mouse.move(w - 3, h / 2); await p.waitForTimeout(1000);
    const go = async (f, n, wait) => { await p.evaluate(f => { const s = document.getElementById('people'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, f); await p.waitForTimeout(wait); await p.screenshot({ path: path.join(__dirname, `${pal}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 }); };
    await go(.15, '1-browns', 1500); await go(.5, '2-turning', 320); await p.waitForTimeout(1200); await p.screenshot({ path: path.join(__dirname, `${pal}-${w}-3-berglands.jpg`), type: 'jpeg', quality: 80 }); await go(.85, '4-crew', 1500);
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
