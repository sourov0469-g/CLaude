const { chromium } = require('playwright'); const D = 'wn/'; require('fs').mkdirSync(D, { recursive: true });
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file:///home/user/CLaude/siding/redo/final/out/final.html', { waitUntil: 'load' }); await p.waitForTimeout(600);
  await p.evaluate(() => { const y = scrollY + document.querySelector('.wn').getBoundingClientRect().top; scrollTo({ top: y, behavior: 'instant' }); }); await p.waitForTimeout(1200);
  await p.screenshot({ path: D + 'a0.png' });
  await p.click('.wn-open'); await p.waitForTimeout(1200); await p.screenshot({ path: D + 'a1.png' });
  for (const k of ['double', 'casement', 'slider', 'picture']) { await p.click(`.wn-k[data-k="${k}"]`); await p.waitForTimeout(500); if (k !== 'picture') { await p.click('.wn-open'); await p.waitForTimeout(1300); } await p.screenshot({ path: D + 'k_' + k + '.png' }); }
  console.log(JSON.stringify(errs)); await b.close(); })();
