// Bathrooms page mechanisms, both motion settings.
const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/remodeling/site/bathrooms.html';
(async () => {
  const b = await chromium.launch();
  for (const rm of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    const go = async (sec, v) => { await p.goto(FILE + '?' + sec + '=' + v); await p.waitForTimeout(1100); await p.evaluate(s => document.getElementById(s).scrollIntoView(), sec); await p.waitForTimeout(600); };
    const cl = async sel => { await p.locator(sel).first().scrollIntoViewIfNeeded(); await p.waitForTimeout(400); await p.click(sel); };
    const R = {};
    await go('bath-intro', 2); await p.focus('.bi2__ln >> nth=2'); await p.waitForTimeout(500); R.line = await p.evaluate(() => document.querySelector('.bi2__img').alt);
    await go('bath-intro', 5); await cl('.bi5__b[data-d="1"]'); await p.waitForTimeout(500); R.mirror = await p.evaluate(() => document.querySelector('.bi5__cap').textContent);
    await go('bath-build', 1); await cl('.bb1__k[data-l="4"]'); R.layer = await p.evaluate(() => document.querySelector('.bb1__on').textContent);
    await go('bath-build', 3); await cl('.bb3__next'); await p.waitForTimeout(800); R.chapter = await p.evaluate(() => document.querySelector('.bb3__track').scrollLeft > 100);
    await go('bath-build', 4); await cl('.bb4__card >> nth=1'); R.stamp = await p.evaluate(() => document.querySelectorAll('.bb4__card[aria-pressed="true"]').length);
    await go('bath-work', 1); await p.evaluate(() => { const r = document.querySelector('.bba__r'); r.value = 20; r.dispatchEvent(new Event('input')); }); R.slider = await p.evaluate(() => document.querySelector('.bba').style.getPropertyValue('--x'));
    await go('bath-work', 2); await cl('.bw2__draw'); await p.waitForTimeout(1300); R.curtain = await p.evaluate(() => document.querySelector('.bw2__tag').textContent);
    await go('bath-work', 3); await cl('.bw3__li >> nth=6'); await p.waitForTimeout(1200); R.film = await p.evaluate(() => document.querySelector('.bw3__li.is-on').textContent);
    await go('bath-work', 4); await cl('.bw4__chip >> nth=1'); R.filter = await p.evaluate(() => [document.querySelectorAll('.bw4__t').length, document.querySelector('.bw4__chip[aria-pressed="true"]').textContent]);
    await cl('.bw4__sw'); R.sw = await p.evaluate(() => document.querySelector('.bw4__pb').hidden);
    await go('bath-work', 5); await cl('.bw5__next'); await p.waitForTimeout(900); R.deck = await p.evaluate(() => document.querySelector('.bw5__cap').textContent);
    await p.evaluate(() => document.querySelector('.bw5__hold').scrollIntoView({ block: 'center' })); await p.waitForTimeout(300);
    const hb = await p.evaluate(() => { const r = document.querySelector('.bw5__hold').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
    await p.mouse.move(hb[0], hb[1]); await p.mouse.down(); R.hold = await p.evaluate(() => !document.querySelector('.bw5__pb').hidden); await p.mouse.up(); R.release = await p.evaluate(() => document.querySelector('.bw5__pb').hidden);
    console.log(rm, JSON.stringify(R), 'ERRORS', errs.length, errs.slice(0, 3));
    await p.close();
  }
  await b.close();
})();
