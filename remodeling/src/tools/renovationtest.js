// Renovation page mechanisms, both motion settings.
const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/renovation.html';
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    const go = async (sec, v) => { await p.goto(FILE + '?' + sec + '=' + v); await p.waitForTimeout(1100); await p.evaluate(s => document.getElementById(s).scrollIntoView(), sec); await p.waitForTimeout(600); };
    const cl = async sel => { await p.locator(sel).first().scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await p.locator(sel).first().click(); };
    const R = {};
    await go('reno-intro', 2); await cl('.ri2__o[aria-checked="false"]'); R.compare = await p.evaluate(() => document.querySelector('.ri2__o[aria-checked="true"]').textContent);
    await go('reno-intro', 4); await cl('.ri4__p >> nth=2'); R.panel = await p.evaluate(() => [...document.querySelectorAll('.ri4__p')].map(x => x.getAttribute('aria-expanded')).join(','));
    await go('reno-intro', 5); if (rm === 'no-preference') { await cl('.ri5__play'); await p.waitForTimeout(400); } R.replay = await p.evaluate(() => document.querySelector('.ri5__play').hidden);
    await go('reno-services', 2); await cl('.rs2__dot >> nth=6'); R.hotspot = await p.evaluate(() => document.querySelector('.rs2__n').textContent);
    await go('reno-services', 3); await p.locator('.rs3__tab').first().focus(); await p.keyboard.press('End'); await p.waitForTimeout(300);
    R.tabs = await p.evaluate(() => [document.querySelector('.rs3__tab[aria-selected="true"]').textContent, document.activeElement.className]);
    await go('reno-services', 4); await cl('.rs4__b >> nth=5'); R.row = await p.evaluate(() => { const b = document.querySelectorAll('.rs4__b')[5]; return [b.getAttribute('aria-expanded'), document.getElementById(b.getAttribute('aria-controls')).hidden]; });
    await go('reno-services', 5); await p.evaluate(() => { const r = document.querySelector('.rba__r'); r.value = 20; r.dispatchEvent(new Event('input')); }); R.slider = await p.evaluate(() => document.querySelector('.rba').style.getPropertyValue('--x'));
    await go('reno-permits', 1); await cl('.rp1__c[data-c="Palm Beach"]'); R.county = await p.evaluate(() => [document.querySelector('.rp1__z').textContent, document.querySelector('.rp1__cty-p.is-on').dataset.c]);
    await p.keyboard.press('ArrowLeft'); R.countyKey = await p.evaluate(() => document.activeElement.dataset.c);
    await go('reno-permits', 3); await cl('.rp3__w[data-w="out"]'); R.partners = await p.evaluate(() => [document.querySelectorAll('.rp3__c.is-named').length, !!document.querySelector('.rp3__none')]);
    await cl('.rp3__w[data-w="win"]'); R.partnersWin = await p.evaluate(() => document.querySelectorAll('.rp3__c.is-named').length);
    await go('reno-permits', 4); await p.evaluate(() => { const r = document.querySelector('.rp4__range input'); r.value = 5; r.dispatchEvent(new Event('input')); }); R.week = await p.evaluate(() => [document.querySelector('.rp4__w').textContent, document.querySelectorAll('.rp4__rule .bar.is-on').length, document.querySelector('.rp4__range input').getAttribute('aria-valuetext')]);
    await go('reno-permits', 5); await cl('.rp5__q >> nth=2 >> summary'); R.faq = await p.evaluate(() => document.querySelectorAll('.rp5__q')[2].open);
    console.log(rm, JSON.stringify(R), 'ERRORS', errs.length, errs.slice(0, 3));
    await p.close();
  }
  await b.close();
})();
