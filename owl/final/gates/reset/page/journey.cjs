// Whole-page journey: one frame per section in the order a visitor meets them (Night Owl), desktop and phone, using the page as a visitor would (choose a case, type a town)
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html');
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 }); const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.clock.setFixedTime(new Date('2026-11-04T16:20:00Z'));
    await p.goto(F); await p.mouse.move(w - 3, 3); await p.waitForTimeout(2600);
    const to = async (id, f, wait) => { await p.evaluate(([id, f]) => { const s = document.getElementById(id), r = s.getBoundingClientRect(); scrollTo({ top: r.top + scrollY + Math.max(0, s.offsetHeight - innerHeight) * f, behavior: 'instant' }); }, [id, f]); await p.waitForTimeout(wait || 1300); };
    const shot = n => p.screenshot({ path: path.join(__dirname, `${w}-${n}.jpg`), type: 'jpeg', quality: 78 });
    await shot('1-arrival');
    await to('finder', 0); await shot('2a-finder-choose'); await p.click('#finder .pill >> nth=0'); await p.waitForTimeout(1600); await to('finder', 0, 600); await shot('2b-finder-scene');
    await to('nothing', .32); await shot('3-nothing');
    await to('numbers', .5, 2400); await shot('4-numbers');
    await to('people', .5); await shot('5-people');
    await to('towns', 0, 600); await p.evaluate(() => document.querySelector('#towns .ask').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.fill('#tw-in', 'Roseville'); await p.waitForTimeout(700); await shot('6-towns');
    await to('call', 0, 1600); await shot('7-call');
    await ctx.close(); }
  console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
