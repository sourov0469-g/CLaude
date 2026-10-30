// Phase 5 reviews slots 4-8: the roof holds 343, the roller stops at 4.8, the sign lands on 4.8 / 343,
// the tag turns over, the nails end on 4.8. Both motion settings.
const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const SP = process.env.OUT || '/tmp';
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    const go = async v => { await p.goto(FILE + '?reviews=' + v); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('reviews').scrollIntoView()); await p.waitForTimeout(600); };
    const cl = async sel => { await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(450); await p.click(sel); };
    const R = {};
    await go(4);
    await p.evaluate(() => scrollBy(0, 500)); await p.waitForTimeout(1200);
    R.roof = await p.evaluate(() => [document.querySelectorAll('.rsh__svg .sg').length, document.querySelector('.rsh__n').textContent]);
    await go(5); await p.waitForTimeout(2400);
    R.roll0 = await p.evaluate(() => [document.querySelector('.rpr__v').textContent, document.querySelector('.rpr__roller').getAttribute('aria-valuenow')]);
    const rb = await p.evaluate(() => { const r = document.querySelector('.rpr__roller').getBoundingClientRect(); return [r.x + r.width / 2, r.y + 30]; });
    await p.mouse.move(rb[0], rb[1]); await p.mouse.down(); await p.mouse.move(rb[0] - 500, rb[1], { steps: 8 });
    R.roll1 = await p.evaluate(() => document.querySelector('.rpr__v').textContent);
    await p.mouse.move(rb[0] + 300, rb[1], { steps: 8 });
    R.roll2 = await p.evaluate(() => document.querySelector('.rpr__v').textContent);
    await p.mouse.move(rb[0] - 400, rb[1], { steps: 4 }); await p.mouse.up(); await p.waitForTimeout(1600);
    R.roll3 = await p.evaluate(() => document.querySelector('.rpr__v').textContent);
    await go(6); await p.waitForTimeout(2200);
    R.sign = await p.evaluate(() => [...document.querySelectorAll('.rsf__flaps')].map(f => f.textContent).join(' / '));
    if (rm !== 'reduce') { await cl('.rsf__go'); await p.waitForTimeout(300); R.signMid = await p.evaluate(() => [...document.querySelectorAll('.rsf__flaps')].map(f => f.textContent).join(' / ')); await p.waitForTimeout(2200);
      R.sign2 = await p.evaluate(() => [...document.querySelectorAll('.rsf__flaps')].map(f => f.textContent).join(' / ')); }
    await go(7); await p.waitForTimeout(1300);
    await cl('.rtg__tag'); await p.waitForTimeout(1300);
    R.tag1 = await p.evaluate(() => { const t = document.querySelector('.rtg__tag'); return [t.getAttribute('aria-pressed'), t.getAttribute('aria-label'), getComputedStyle(t).transform.slice(0, 40)]; });
    const tb = await p.evaluate(() => { const r = document.querySelector('.rtg__tag').getBoundingClientRect(); return [r.x + r.width / 2, r.y + 150]; });
    await p.mouse.move(tb[0], tb[1]); await p.mouse.down(); await p.mouse.move(tb[0] + 20, tb[1] + 120, { steps: 8 });
    R.tagLine = await p.evaluate(() => document.querySelector('.rtg__line').getAttribute('d'));
    await p.mouse.up(); await p.waitForTimeout(1500);
    R.tag2 = await p.evaluate(() => [document.querySelector('.rtg__tag').getAttribute('aria-pressed'), document.querySelector('.rtg__line').getAttribute('d')]);
    await go(8);
    for (let i = 0; i < 6; i++) { await cl('.rnl__hit'); await p.waitForTimeout(700); }
    R.nails = await p.evaluate(() => [document.querySelector('.rnl__v').textContent, [...document.querySelectorAll('.rnl__svg .nail')].map(n => n.getAttribute('transform').split(' ')[1]).join(',')]);
    await p.evaluate(() => document.querySelector('.rnl__svg').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
    await p.screenshot({ path: SP + '/nails-' + rm + '.jpg', quality: 60 });
    await cl('.rnl__pull'); R.pull = await p.evaluate(() => document.querySelector('.rnl__v').textContent);
    console.log(rm, JSON.stringify(R), 'ERRORS', errs.length, errs.slice(0, 3));
    await p.close();
  }
  await b.close();
})();
