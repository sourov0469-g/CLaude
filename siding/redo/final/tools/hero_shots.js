const { chromium } = require('playwright'); const D = 'h/'; require('fs').mkdirSync(D, { recursive: true });
const F = 'file:///home/user/CLaude/siding/redo/final/out/final.html';
(async () => { const b = await chromium.launch(); const out = {};
  for (const [w, h, touch, tag] of [[1440, 900, 0, 'a'], [1920, 1080, 0, 'a'], [1024, 768, 0, 'a'], [768, 1024, 0, 'a'], [390, 844, 1, 'a'], [1366, 768, 0, 'a']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', ...(touch ? { hasTouch: true, isMobile: true, deviceScaleFactor: 2 } : {}) }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(900);
    out[`${w}x${h}`] = { errs, hero: await p.evaluate(() => { const r = document.querySelector('.fh').getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; }), ov: await p.evaluate(() => document.documentElement.scrollWidth - innerWidth) };
    await p.screenshot({ path: `${D}h-${w}x${h}.png` }); await ctx.close(); }
  console.log(JSON.stringify(out)); await b.close(); })();
