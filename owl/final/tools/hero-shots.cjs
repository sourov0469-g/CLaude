// Hero version evidence: node hero-shots.cjs <v> [dsf] [outdir]
// First viewport at 1440 / 768 / 390 (exactly what a visitor sees, no review switcher) + the hero section alone at 1440
// with the sticky header hidden. Prints console/page errors.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const [v, dsfArg, outArg] = process.argv.slice(2); const DSF = +(dsfArg || 1);
const OUT = path.resolve(__dirname, '..', outArg || 'gates/up-r1'); fs.mkdirSync(OUT, { recursive: true });
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html') + '?hero=' + v;
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const errs = [];
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });
    p.on('pageerror', e => errs.push(w + ' pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(w + ' ' + m.type() + ': ' + m.text()); });
    await p.route('https://**', r => r.abort());
    await p.goto(F); await p.waitForTimeout(2600);
    if (w === 1440) { await p.mouse.move(980, 420, { steps: 12 }); await p.mouse.move(700, 520, { steps: 16 }); await p.waitForTimeout(500); }
    await p.screenshot({ path: path.join(OUT, `hero-v${v}-${w}.jpg`), quality: 82, type: 'jpeg' });
    if (w === 1440) {
      await p.addStyleTag({ content: '.hdr{visibility:hidden}' });
      const el = await p.$(`.ver[data-sec="hero"][data-v="${v}"]`);
      await el.screenshot({ path: path.join(OUT, `hero-v${v}-section.jpg`), quality: 82, type: 'jpeg' });
      const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) errs.push('overflow ' + o);
    } else { const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) errs.push(w + ' overflow ' + o + 'px'); }
    await p.close();
  }
  console.log(errs.length ? [...new Set(errs)].slice(0,15).join('\n') : 'no errors'); await b.close();
})();
