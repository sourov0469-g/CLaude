// Section 7 evidence: the call panel with no choices, then with a case + town chosen, then the email note; two treatments
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-reset.html'), DSF = +(process.argv[2] || 1);
(async () => { const b = await chromium.launch(); const errs = [];
  for (const pal of ['night', 'control']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: DSF, timezoneId: 'America/Chicago' });
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.clock.setFixedTime(new Date('2026-11-04T16:20:00Z'));
    await p.goto(F + '?palette=' + pal); await p.mouse.move(w - 3, 3); await p.waitForTimeout(900);
    const go = () => p.evaluate(() => { const s = document.getElementById('call'); scrollTo({ top: s.getBoundingClientRect().top + scrollY, behavior: 'instant' }); });
    const shot = n => p.screenshot({ path: path.join(__dirname, `${pal}-${w}-${n}.jpg`), type: 'jpeg', quality: 80 });
    await go(); await p.waitForTimeout(900); await go(); await p.waitForTimeout(1400); await shot('1-plain');
    await p.evaluate(() => { RESET.setCase('leak'); sessionStorage.setItem('owlTown', 'Roseville'); document.dispatchEvent(new CustomEvent('owl:town', { detail: 'Roseville' })); }); await p.waitForTimeout(700); await shot('2-written-for-you');
    await p.evaluate(() => { const m = document.querySelector('#call .mail'); m.addEventListener('click', e => e.preventDefault(), { once: true }); m.click(); document.querySelector('#call .note').scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(500); await shot('3-email');
    await ctx.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
