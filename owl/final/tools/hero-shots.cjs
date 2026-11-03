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
      if (v === '5') {
        // the pinned stage: one section shot per number event
        const t = await p.evaluate(() => { const e = document.querySelector('.hero5 .track'); return { top: e.getBoundingClientRect().top + scrollY, span: e.offsetHeight - innerHeight }; });
        let k = 0; for (const f of [.05, .37, .62, .9]) { await p.evaluate(y => scrollTo(0, y), t.top + t.span * f); await p.waitForTimeout(900); await p.screenshot({ path: path.join(OUT, `hero-v5-section-${++k}.jpg`), quality: 82, type: 'jpeg' }); }
        await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(300);
      } else {
        const bb = await p.evaluate(v => { const r = document.querySelector(`.ver[data-sec="hero"][data-v="${v}"]`).getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; }, v);
        await p.screenshot({ path: path.join(OUT, `hero-v${v}-section.jpg`), quality: 82, type: 'jpeg', fullPage: true, clip: bb, timeout: 90000 });
      }
      const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) errs.push('overflow ' + o);
    } else { const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) errs.push(w + ' overflow ' + o + 'px'); }
    await p.close();
  }
  console.log(errs.length ? [...new Set(errs)].slice(0,15).join('\n') : 'no errors'); await b.close();
})();
