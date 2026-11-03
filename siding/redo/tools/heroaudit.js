// Frame-by-frame audit of a hero version: node heroaudit.js <html> <outdir> [w] [h] [extra=gl]
// Seeks the deterministic build to fixed times, simulates a stir and a leave, real-time capture, and logs JS errors.
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const [file, out, w, h, gl] = process.argv.slice(2); fs.mkdirSync(out, {recursive: true});
(async () => {
  const args = gl ? ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] : [];
  const b = await chromium.launch({args}); const ctx = await b.newContext({viewport: {width: +w || 1440, height: +h || 900}, deviceScaleFactor: 1});
  const p = await ctx.newPage(); const errs = [];
  p.on('pageerror', e => errs.push('pageerror ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push('console ' + m.text()); });
  await p.goto('file://' + path.resolve(file)); await p.waitForTimeout(gl ? 6000 : 3500);
  const W = +w || 1440;
  await p.screenshot({path: path.join(out, `${W}-realtime.png`)});
  const ready = await p.evaluate(() => !!window.__hero);
  if (ready) {
    for (const ms of [0, 350, 700, 1000, 1400, 1900, 2600]) {
      const r = await p.evaluate(ms => window.__hero.seek(ms), ms);
      await p.screenshot({path: path.join(out, `${W}-seek-${String(ms).padStart(4, '0')}.png`)});
      console.log('seek', ms, JSON.stringify(r), 'lift', await p.evaluate(() => Math.round(window.__hero.lift())));
    }
    const P = await p.evaluate(() => window.__hero.panel ? window.__hero.panel() : null);
    if (P) {
      await p.evaluate(P => window.__hero.stir(P.x + P.w * 0.25, P.y + P.h * 0.55, 900, -80, 26), P);
      await p.screenshot({path: path.join(out, `${W}-stir.png`)}); console.log('stir lift', await p.evaluate(() => Math.round(window.__hero.lift())));
      for (const ms of [300, 900, 2000]) { await p.evaluate(([ms, again]) => window.__hero.leave(ms, again), [ms === 300 ? 300 : (ms === 900 ? 600 : 1100), ms !== 300]);
        await p.screenshot({path: path.join(out, `${W}-leave-${ms}.png`)}); console.log('leave', ms, 'lift', await p.evaluate(() => Math.round(window.__hero.lift()))); }
    }
  }
  const m = await p.evaluate(() => ({sw: document.documentElement.scrollWidth, iw: innerWidth, h1: document.querySelector('h1').getBoundingClientRect().toJSON(),
    words: (document.querySelector('.copy') || document.querySelector('.hero')).innerText.split(/\s+/).filter(Boolean).length}));
  console.log('metrics', JSON.stringify(m)); console.log('errors', JSON.stringify(errs));
  await b.close();
})();
