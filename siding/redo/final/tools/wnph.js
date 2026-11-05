const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 }); const p = await ctx.newPage(); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file:///home/user/CLaude/siding/redo/final/out/final.html', { waitUntil: 'load' });
  await p.evaluate(() => scrollTo({ top: scrollY + document.querySelector('.wn').getBoundingClientRect().top, behavior: 'instant' })); await p.waitForTimeout(900);
  await p.screenshot({ path: 'wn/p0.png' });
  await p.evaluate(() => scrollBy({ top: 520, behavior: 'instant' })); await p.waitForTimeout(500); await p.screenshot({ path: 'wn/p1.png' });
  await p.evaluate(() => scrollBy({ top: 700, behavior: 'instant' })); await p.waitForTimeout(500); await p.screenshot({ path: 'wn/p2.png' });
  console.log(errs); await b.close(); })();
