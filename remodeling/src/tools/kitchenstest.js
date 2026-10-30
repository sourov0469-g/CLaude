// Kitchens page mechanisms, both motion settings.
const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/kitchens.html';
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    const go = async (sec, v) => { await p.goto(FILE + '?' + sec + '=' + v); await p.waitForTimeout(1100); await p.evaluate(s => document.getElementById(s).scrollIntoView(), sec); await p.waitForTimeout(600); };
    const cl = async sel => { await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(400); await p.click(sel); };
    const R = {};
    await go('kitchen-intro', 3); await p.focus('.ki3__door'); await p.waitForTimeout(300);
    R.door = await p.evaluate(() => document.querySelectorAll('.ki3__bay.is-open').length);
    await p.keyboard.press('Enter'); await p.waitForTimeout(500); R.doorView = await p.evaluate(() => document.querySelector('#viewer .viewer__title').textContent); await p.keyboard.press('Escape');
    await go('kitchen-intro', 4); await cl('.ki4__opt[data-o="room"]'); R.room = await p.evaluate(() => document.querySelector('.ki4').classList.contains('is-room'));
    await go('kitchen-scope', 2); await p.evaluate(() => { const r = document.querySelector('.ks2__range input'); r.value = 3; r.dispatchEvent(new Event('input')); }); await p.waitForTimeout(700);
    R.dial = await p.evaluate(() => [document.querySelector('.ks2__tn').textContent, +getComputedStyle(document.querySelector('.ks2__plan .wall')).opacity]);
    await go('kitchen-scope', 3); await p.focus('#ks3-t1'); await p.keyboard.press('End');
    R.tabs = await p.evaluate(() => [document.activeElement.id, document.querySelector('#ks3-p3').hidden]);
    await go('kitchen-scope', 5); await cl('.ks5__front[aria-controls="ks5-5"]');
    R.drawer = await p.evaluate(() => [document.querySelector('#ks5-5').hidden, document.querySelector('#ks5-1').hidden]);
    await go('kitchen-work', 1); await p.evaluate(() => { const r = document.querySelector('.kw1__ba .kba__r'); r.value = 80; r.dispatchEvent(new Event('input')); });
    R.slider = await p.evaluate(() => document.querySelector('.kw1__ba').style.getPropertyValue('--x'));
    await cl('.kw1__t'); await p.waitForTimeout(500); R.view = await p.evaluate(() => document.querySelector('#viewer .viewer__title').textContent); await p.keyboard.press('Escape');
    await go('kitchen-work', 3); await cl('.kw3__turn'); R.flip = await p.evaluate(() => document.querySelector('.kw3__card').classList.contains('is-turned'));
    await go('kitchen-work', 4); await cl('.kw4__lamp'); R.lamp = await p.evaluate(() => [document.querySelector('.kw4__pa').hidden, document.querySelector('.kw4__pb').hidden]);
    await p.focus('.kw4__row >> nth=3'); R.idx = await p.evaluate(() => document.querySelector('.kw4__cap').textContent);
    await go('kitchen-work', 5); await p.focus('.kw5__rail'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('ArrowRight'); await p.keyboard.press('End');
    R.rail = await p.evaluate(() => document.querySelector('.kw5__cap').textContent);
    console.log(rm, JSON.stringify(R), 'ERRORS', errs.length, errs.slice(0, 3));
    await p.close();
  }
  await b.close();
})();
