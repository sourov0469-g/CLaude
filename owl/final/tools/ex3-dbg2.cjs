const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?explore=3'); await p.waitForTimeout(800);
  const S = '.explore3'; await p.evaluate(s => document.querySelector(s).scrollIntoView(), S); await p.waitForTimeout(600);
  const before = await p.evaluate(() => scrollY);
  await p.click(S + ' .tile[data-i="3"]'); await p.waitForTimeout(500);
  const t = await (await p.$(S + ' .tile[data-i="0"]')).boundingBox();
  console.log(before, await p.evaluate(() => scrollY), JSON.stringify(t), await p.evaluate(([x, y]) => { const e = document.elementFromPoint(x, y); return e.tagName + '.' + e.className + ' ' + (e.textContent || '').slice(0, 30); }, [t.x + 30, t.y + 20]));
  await b.close();
})();
