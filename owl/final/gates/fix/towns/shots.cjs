// Towns evidence: each version empty, then answered; V1 also zoomed
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), DSF = +(process.argv[2] || 1), PAL = process.argv[3] || 'shingle';
(async () => { const b = await chromium.launch(); const errs = [];
  const IN = { 1: '#tw-in', 2: '#t2-in', 3: '#t3-in' };
  for (const v of [1, 2, 3]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push('v' + v + ' ' + e.message));
    await p.goto(F + '?towns=' + v + '&palette=' + PAL); await p.mouse.move(w - 3, 3); await p.waitForTimeout(1500);
    await p.evaluate(() => scrollTo({ top: document.getElementById('towns').offsetTop + (innerWidth > 860 ? 40 : 60), behavior: 'instant' })); await p.waitForTimeout(700);
    const shot = n => p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    await shot('1');
    await p.fill(IN[v], v === 2 ? 'Apple Valley' : 'Stillwater'); await p.waitForTimeout(700);
    if (w < 860 && v !== 3) await p.evaluate(s => scrollTo({ top: document.querySelector(s).getBoundingClientRect().top + scrollY - 90, behavior: 'instant' }), IN[v]);
    if (w < 860 && v === 3) await p.evaluate(() => scrollTo({ top: document.querySelector('#towns .ask').getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }));
    await p.waitForTimeout(300); await shot('2-answer');
    if (v === 1) { await p.fill(IN[v], 'Arden Hills'); await p.click('#towns .zoom'); await p.waitForTimeout(900); if (w < 860) await p.evaluate(() => document.querySelector('#towns .field').scrollIntoView({ behavior: 'instant', block: 'end' })); await p.waitForTimeout(200); await shot('3-zoom'); }
    await p.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
