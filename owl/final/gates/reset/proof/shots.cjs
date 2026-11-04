// Proof-section evidence: viewport frames in motion states, two treatments, desktop + phone
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-reset.html'), DSF = +(process.argv[2] || 1), ONLY = process.argv[3];
(async () => { const b = await chromium.launch(); const errs = [];
  for (const pal of ['night', 'control']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    if (ONLY && ONLY !== pal + w) continue;
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push(e.message));
    const shot = n => p.screenshot({ path: path.join(__dirname, `${pal}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    await p.goto(F + '?palette=' + pal); await p.mouse.move(w - 3, h / 2); await p.waitForTimeout(1500); await shot('1-arrival');
    await p.evaluate(() => { const s = document.querySelector('.arrive'); scrollTo(0, s.offsetHeight * .55); }); await p.waitForTimeout(1200); await shot('2-arrival-beat2');
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(900); await shot('3-gate');
    await p.click('#finder .pill >> nth=0'); await p.waitForTimeout(w > 860 ? 520 : 200); await shot('4-curtain');
    await p.waitForTimeout(1600); await shot('5-scene-leak');
    const d = w > 860 ? '.rbar .dock button >> nth=3' : '.rbar .dock button >> nth=3';
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(300);
    await p.click(d); await p.waitForTimeout(1200); await shot('6-scene-storm');
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
