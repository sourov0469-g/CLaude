const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const SP = '/tmp/claude-0/-home-user-CLaude/81d466b5-1323-5aaf-8431-635a10988af1/scratchpad/work/';
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  const go = async v => { await p.goto(FILE + '?work=' + v); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('work').scrollIntoView()); await p.waitForTimeout(800); };
  const R = {};
  const cl = async sel => { await p.evaluate(s => document.querySelector(s.split(' >> ')[0]).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(450); await p.click(sel); };
  // 4 floor plan
  await go(4);
  R.fp0 = await p.evaluate(() => [document.querySelectorAll('.wfp__th').length, document.querySelector('.wfp__t').textContent]);
  await cl('.wfp__room--b'); await p.waitForTimeout(600);
  R.fp1 = await p.evaluate(() => [document.querySelectorAll('.wfp__th').length, document.querySelector('.wfp__t').textContent, document.querySelector('.wfp__room--b').getAttribute('aria-pressed')]);
  await cl('.wfp__th >> nth=3'); await p.waitForTimeout(400);
  R.fp2 = await p.evaluate(() => document.querySelector('.wfp__t').textContent);
  await cl('.wfp__open'); await p.waitForTimeout(600);
  R.fp3 = await p.evaluate(() => { const v = document.getElementById('viewer'); return [!v.hidden && getComputedStyle(v).display !== 'none', v.querySelector('.viewer__title').textContent]; });
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  // 5 gallery wall
  await go(5);
  R.gh0 = await p.evaluate(() => [document.querySelectorAll('.wgh__fr').length, getComputedStyle(document.querySelector('.wgh__fr')).transform]);
  await cl('.wgh__fr >> nth=1'); await p.waitForTimeout(1200);
  R.gh1 = await p.evaluate(() => [document.querySelector('.wgh__count').textContent, document.querySelectorAll('.wgh__it.is-level').length, getComputedStyle(document.querySelectorAll('.wgh__fr')[1]).transform, document.querySelector('#viewer .viewer__title').textContent]);
  await p.keyboard.press('Escape'); await p.waitForTimeout(400);
  await cl('.wgh__next'); await p.waitForTimeout(700);
  R.gh2 = await p.evaluate(() => document.querySelector('.wgh__cap b').textContent);
  await cl('.wgh__next'); await cl('.wgh__next'); await p.waitForTimeout(700);
  R.gh3 = await p.evaluate(() => [document.querySelector('.wgh__cap b').textContent, document.querySelectorAll('.wgh__it.is-level').length]);
  // 6 tile bond
  await go(6);
  const box = () => p.evaluate(() => [...document.querySelectorAll('.wbd__t')].slice(0, 6).map(t => { const r = t.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)].join(','); }).join(' | ') + ' H=' + document.querySelector('.wbd__floor').style.height);
  R.bd0 = await box();
  await cl('.wbd__b[data-b="run"]'); await p.waitForTimeout(1200); R.bd1 = await box();
  R.bdcut = await p.evaluate(() => [...document.querySelectorAll('.wbd__cut')].map(c => getComputedStyle(c).opacity).join(','));
  await cl('.wbd__b[data-b="basket"]'); await p.waitForTimeout(1200); R.bd2 = await box();
  await p.screenshot({ path: SP + 'bond-basket-' + rm + '.jpg', quality: 60, clip: { x: 0, y: 380, width: 1440, height: 520 } });
  await p.hover('.wbd__t >> nth=5'); R.bdcap = await p.evaluate(() => document.querySelector('.wbd__cap').textContent);
  // 7 plumb line
  await go(7);
  R.ix0 = await p.evaluate(() => [document.querySelectorAll('.wix__row').length, document.querySelector('.wix__bob').getAttribute('transform')]);
  await p.hover('.wix__row >> nth=10'); await p.waitForTimeout(800);
  R.ix1 = await p.evaluate(() => [document.querySelector('.wix__bob').getAttribute('transform'), document.querySelector('.wix__t').textContent, document.querySelector('.wix__row.is-on span').textContent]);
  await p.focus('.wix__row >> nth=10'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(700);
  R.ix2 = await p.evaluate(() => [document.activeElement.querySelector('b').textContent, document.querySelector('.wix__code').textContent]);
  await p.screenshot({ path: SP + 'plumb-' + rm + '.jpg', quality: 60 });
  // 8 binder
  await go(8);
  await cl('.wfb__next'); await p.waitForTimeout(600);
  R.fb1 = await p.evaluate(() => [document.querySelector('.wfb__tab').textContent, document.querySelector('.wfb__pg').textContent, document.querySelector('.wfb__range').value]);
  await cl('.wfb__prev'); await cl('.wfb__prev'); await p.waitForTimeout(600);
  R.fb2 = await p.evaluate(() => [document.querySelector('.wfb__tab').textContent, document.querySelector('.wfb__pg').textContent]);
  await p.evaluate(() => { const r = document.querySelector('.wfb__range'); r.value = 12; r.dispatchEvent(new Event('input', { bubbles: true })); });
  R.fb3 = await p.evaluate(() => [document.querySelector('.wfb__tab').textContent, document.querySelector('.wfb__t').textContent, getComputedStyle(document.querySelector('.wfb__page')).transform]);
  // switch away and back: cleanup leaves no doubles
  await p.goto(FILE + '?work=6'); await p.waitForTimeout(1000);
  await p.evaluate(() => { const s = document.querySelector('.vswitch[data-for="work"]'); const btn = s && [...s.querySelectorAll('button')].find(x => x.textContent.trim() === '7'); btn && btn.click(); });
  await p.waitForTimeout(800);
  await p.evaluate(() => { const s = document.querySelector('.vswitch[data-for="work"]'); const btn = s && [...s.querySelectorAll('button')].find(x => x.textContent.trim() === '6'); btn && btn.click(); });
  await p.waitForTimeout(800);
  R.sw = await p.evaluate(() => [document.querySelectorAll('.wbd__t').length, document.querySelectorAll('.wbd__cap').length, document.querySelectorAll('.wix__row').length]);
  console.log(rm, JSON.stringify(R, null, 0).replace(/","/g, '",\n"'), 'ERRORS', errs.length, errs.slice(0, 3));
  await p.close();
  }
  await b.close();
})();
