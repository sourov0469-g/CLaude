const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 1100 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file:///home/user/CLaude/siding/redo/final/out/final.html', { waitUntil: 'load' }); await p.waitForTimeout(500);
  await p.evaluate(() => { const y = scrollY + document.querySelector('.wn').getBoundingClientRect().top; scrollTo({ top: y, behavior: 'instant' }); }); await p.waitForTimeout(1000);
  await p.click('.wn-k[data-k="casement"]'); await p.waitForTimeout(500); await p.click('.wn-open'); await p.waitForTimeout(1300);
  await p.click('.wn-b[data-b="Andersen"]'); await p.click('.wn-c[data-i="3"]'); await p.evaluate(() => { const t = document.querySelector('.wn-time'); t.value = 20.25; t.dispatchEvent(new Event('input')); });
  await p.waitForTimeout(900); const bx = await (await p.$('.wn')).boundingBox(); await p.screenshot({ path: 'wn/full-casement-dusk.png' });
  console.log(errs); await b.close(); })();
