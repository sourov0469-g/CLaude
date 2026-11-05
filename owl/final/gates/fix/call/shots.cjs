// Call evidence: each version plain, then written for a case + town; fixed clock (Wed 10:20 Shoreview)
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), DSF = +(process.argv[2] || 1), PAL = process.argv[3] || 'shingle';
(async () => { const b = await chromium.launch(); const errs = [];
  for (const v of [1, 2, 3]) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); const p = await ctx.newPage(); p.on('pageerror', e => errs.push('v' + v + ' ' + e.message));
    await p.clock.setFixedTime(new Date('2026-11-04T16:20:00Z'));
    await p.goto(F + '?call=' + v + '&palette=' + PAL); await p.mouse.move(w - 3, 3); await p.waitForTimeout(1200);
    const go = () => p.evaluate(() => scrollTo({ top: document.getElementById('call').offsetTop, behavior: 'instant' }));
    const shot = n => p.screenshot({ path: path.join(__dirname, `${PAL}-v${v}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    await go(); await p.waitForTimeout(1600); await shot('1');
    await p.evaluate(() => { RESET.setCase('leak'); sessionStorage.setItem('owlTown', 'Roseville'); document.dispatchEvent(new CustomEvent('owl:town', { detail: 'Roseville' })); }); await p.waitForTimeout(600);
    if (w < 860) await p.evaluate(() => { const m = document.querySelector('#call .mail'); scrollTo({ top: m.getBoundingClientRect().top + scrollY - innerHeight * .6, behavior: 'instant' }); });
    await p.waitForTimeout(300); await shot('2-written');
    await ctx.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
