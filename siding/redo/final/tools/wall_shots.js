const { chromium } = require('playwright'); const fs = require('fs');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final.html';
(async () => { const b = await chromium.launch(); const out = {};
  for (const [w, h, touch] of [[1440, 900, 0], [390, 844, 1]]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, ...(touch ? { hasTouch: true, isMobile: true } : {}) }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.route('https://www.austinprosiding.com/videos/**', r => r.fulfill({ status: 200, contentType: 'video/webm', body: fs.readFileSync('/tmp/vid/test.webm') }));
    await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(1200);
    const geo = await p.evaluate(() => { const s = document.querySelector('.fw'); const r = s.getBoundingClientRect(); return { top: scrollY + r.top, len: r.height - innerHeight }; }); out[w] = geo;
    for (const q of [0, .06, .12, .2, .3, .42, .55, .7, .82, .92, 1]) { await p.evaluate(([y]) => scrollTo(0, y), [geo.top + q * geo.len]); await p.waitForTimeout(q === 0 ? 900 : 500); await p.screenshot({ path: `w/w-${w}-${String(Math.round(q * 100)).padStart(3, '0')}.png` }); }
    out[w].errs = errs; await ctx.close(); }
  console.log(JSON.stringify(out)); await b.close(); })();
