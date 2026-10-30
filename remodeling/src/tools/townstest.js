// Phase 5 towns slots 4-8: route, directory, boards, road, county panels. Both motion settings.
const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    const go = async v => { await p.goto(FILE + '?towns=' + v); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('towns').scrollIntoView()); await p.waitForTimeout(700); };
    const R = {};
    await go(4);
    R.opts = await p.evaluate(() => document.querySelectorAll('.tdr__sel option[value]:not([value=""])').length);
    await p.selectOption('.tdr__sel', { label: 'Jupiter' }); await p.waitForTimeout(1500);
    R.route = await p.evaluate(() => [document.querySelector('.tdr__ans').textContent, document.querySelectorAll('.tdr__svg .dot.is-on').length, document.querySelector('.tdr__svg .route').getAttribute('d'), document.querySelector('.tdr__svg .van').getAttribute('transform')]);
    await go(5);
    R.tabs = await p.evaluate(() => document.querySelectorAll('.taz__t').length);
    let sum = 0;
    const n = R.tabs;
    await p.focus('.taz__t');
    for (let i = 0; i < n; i++) { sum += await p.evaluate(() => document.querySelectorAll('.taz__list li').length); await p.keyboard.press('ArrowRight'); await p.waitForTimeout(60); }
    R.dirTotal = sum;
    R.dirWrap = await p.evaluate(() => document.activeElement.textContent);
    await go(6);
    R.boards = await p.evaluate(() => [...document.querySelectorAll('.tlb__board')].map(b => b.querySelectorAll('.nt').length).join(','));
    await p.focus('.tlb__board >> nth=1'); await p.keyboard.press('End');
    R.board = await p.evaluate(() => document.querySelector('.tlb__read').textContent);
    await go(7);
    R.posts = await p.evaluate(() => [document.querySelectorAll('.tns__p[data-i]').length, document.querySelectorAll('.tns__p.is-cty').length, document.querySelector('.tns__at').textContent]);
    await p.evaluate(() => document.querySelector('.tns__bar').scrollIntoView({ block: 'center' })); await p.waitForTimeout(400);
    for (let i = 0; i < 4; i++) { await p.click('.tns__next'); await p.waitForTimeout(700); }
    R.road = await p.evaluate(() => document.querySelector('.tns__at').textContent);
    await go(8);
    await p.evaluate(() => document.querySelector('.tac__row').scrollIntoView({ block: 'center' })); await p.waitForTimeout(500);
    await p.click('.tac__tab >> nth=2'); await p.waitForTimeout(900);
    R.panels = await p.evaluate(() => [...document.querySelectorAll('.tac__p')].map(q => q.classList.contains('is-open') + ':' + q.querySelectorAll('.tac__list li').length + ':' + Math.round(q.getBoundingClientRect().width)).join(' '));
    console.log(rm, JSON.stringify(R), 'ERRORS', errs.length, errs.slice(0, 3));
    await p.close();
  }
  await b.close();
})();
