// Family evidence: V1 chapters, V2 the table and a turned print, V3 two names
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), DSF = +(process.argv[2] || 1), PAL = process.argv[3] || 'shingle';
(async () => { const b = await chromium.launch(); const errs = [];
  for (const v of [1, 2, 3]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push('v' + v + ' ' + e.message));
    await p.goto(F + '?people=' + v + '&palette=' + PAL); await p.mouse.move(w - 3, 3); await p.waitForTimeout(1500);
    const shot = n => p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    if (v === 1) for (const [k, f] of [['1', .15], ['2', .5], ['3', .85]]) { await p.evaluate(f => { const s = document.getElementById('people'); scrollTo({ top: s.offsetTop + (s.offsetHeight - innerHeight) * f, behavior: 'instant' }); }, f); await p.waitForTimeout(1500); await shot(k); }
    if (v === 2) { await p.evaluate(() => document.getElementById('people').scrollIntoView({ behavior: 'instant' })); if (w < 900) await p.evaluate(() => document.querySelector('#people .table').scrollIntoView({ behavior: 'instant', block: 'center' })); await p.waitForTimeout(900); await shot('1'); await p.click('#people .print >> nth=4'); await p.waitForTimeout(1000); await shot('2-turned'); }
    if (v === 3) { await p.evaluate(() => document.getElementById('people').scrollIntoView({ behavior: 'instant' })); await p.waitForTimeout(1200); await shot('1'); await p.click('#people .names button >> nth=1'); await p.waitForTimeout(1200); await shot('2-noah'); }
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
