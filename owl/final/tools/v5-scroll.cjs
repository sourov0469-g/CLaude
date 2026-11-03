const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.route('https://**', r => r.abort());
  await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?hero=5'); await p.waitForTimeout(2600);
  const out = path.resolve(__dirname, '../gates/wip'); const R = [];
  const span = await p.evaluate(() => { const t = document.querySelector('.hero5 .track'); return { top: t.getBoundingClientRect().top + scrollY, span: t.offsetHeight - innerHeight }; });
  for (const [i, f] of [[1, .37], [2, .62], [3, .9]]) {
    await p.evaluate(y => scrollTo(0, y), span.top + span.span * f); await p.waitForTimeout(700);
    R.push(await p.evaluate(() => ({ cap: document.querySelector('.hero5 .cap span').textContent, cur: document.querySelector('.hero5 ol.steps [aria-current]').textContent, stickyTop: Math.round(document.querySelector('.hero5 .sticky').getBoundingClientRect().top) })));
    await p.screenshot({ path: out + '/v5-step' + i + '.jpg', quality: 70, type: 'jpeg' });
  }
  await p.mouse.move(1000, 500, { steps: 6 }); await p.mouse.move(1150, 560, { steps: 20 }); await p.waitForTimeout(80);
  await p.screenshot({ path: out + '/v5-lift.jpg', quality: 80, type: 'jpeg', clip: { x: 700, y: 300, width: 700, height: 500 } });
  await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(400); await p.click('.hero5 ol.steps li:nth-child(3) button'); await p.waitForTimeout(1600);
  R.push({ afterClick29: await p.evaluate(() => document.querySelector('.hero5 ol.steps [aria-current]').textContent) });
  console.log(JSON.stringify(R)); await b.close();
})();
