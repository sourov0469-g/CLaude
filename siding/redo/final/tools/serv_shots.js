const { chromium } = require('playwright'); const D = 's/'; require('fs').mkdirSync(D, { recursive: true });
(async () => { const b = await chromium.launch(); const out = {};
  for (const [w, h, touch] of [[1440, 900, 0], [390, 844, 1]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, ...(touch ? { hasTouch: true, isMobile: true } : {}) }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto('file:///home/user/CLaude/siding/redo/final/out/final.html', { waitUntil: 'load' }); await p.waitForTimeout(800);
    const g = await p.evaluate(() => { const r = document.querySelector('.sv').getBoundingClientRect(); return { top: scrollY + r.top, len: r.height - innerHeight }; }); out[w] = { g, errs };
    for (const q of [0.02, .1, .2, .24, .3, .38, .46, .5, .56, .64, .72, .8, .9, .98]) { await p.evaluate(([y]) => scrollTo(0, y), [g.top + q * g.len]); await p.waitForTimeout(350); await p.screenshot({ path: `${D}s-${w}-${String(Math.round(q * 100)).padStart(3, '0')}.png` }); }
    out[w].errs = errs; await ctx.close(); }
  console.log(JSON.stringify(out)); await b.close(); })();
