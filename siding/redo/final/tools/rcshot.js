const { chromium } = require('playwright'); const D='rv/'; require('fs').mkdirSync(D,{recursive:true});
(async () => { const b = await chromium.launch(); const W = +process.argv[2]||1440, Hh=+process.argv[3]||900; const ctx = await b.newContext({ viewport: { width: W, height: Hh } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file:///home/user/CLaude/siding/redo/final/out/final.html', { waitUntil: 'load' }); await p.waitForTimeout(600);
  await p.evaluate(() => { scrollTo({ top: document.querySelector('.rvB').getBoundingClientRect().top + scrollY, behavior: 'instant' }); }); await p.waitForTimeout(2600); await p.screenshot({ path: D + `b_${W}.png` });
  for (const q of [0.04, .3, .55, .8, .97]) { await p.evaluate((q) => { const s = document.querySelector('.rc'), r = s.getBoundingClientRect(); scrollTo({ top: scrollY + r.top + q * (r.height - innerHeight), behavior: 'instant' }); }, q); await p.waitForTimeout(500); await p.screenshot({ path: D + `c_${W}_${Math.round(q*100)}.png` }); }
  console.log(errs); await b.close(); })();
