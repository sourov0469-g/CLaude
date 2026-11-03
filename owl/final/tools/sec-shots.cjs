// Section version evidence: node sec-shots.cjs <sec> <v> [dsf] [outdir]
// The section alone (header hidden) at 1440 / 768 / 390 after scrolling to it like a visitor. Prints errors/overflow.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const [sec, v, dsfArg, outArg] = process.argv.slice(2); const DSF = +(dsfArg || 1);
const OUT = path.resolve(__dirname, '..', outArg || 'gates/wip'); fs.mkdirSync(OUT, { recursive: true });
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html') + '?' + sec + '=' + v;
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const errs = [];
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });
    p.on('pageerror', e => errs.push(w + ' pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(w + ' ' + m.type() + ': ' + m.text()); });
    await p.route('https://**', r => r.abort());
    await p.goto(F); await p.waitForTimeout(1200);
    const sel = `.ver[data-sec="${sec}"][data-v="${v}"]`;
    await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'start', behavior: 'instant' }), sel); await p.waitForTimeout(+(process.env.WAIT || 2200));
    await p.addStyleTag({ content: '.hdr{visibility:hidden}' });
    if (w === 1440) { const bb = await p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.left + r.width * .62, y: Math.min(innerHeight - 40, r.top + 380) }; }, sel); await p.mouse.move(bb.x - 200, bb.y, { steps: 6 }); await p.mouse.move(bb.x, bb.y, { steps: 14 }); await p.waitForTimeout(300); }
    const bb = await p.evaluate(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; }, sel);
    await p.screenshot({ path: path.join(OUT, `${sec}-v${v}-${w}.jpg`), quality: 82, type: 'jpeg', fullPage: true, clip: bb, timeout: 90000 });
    const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) errs.push(w + ' overflow ' + o + 'px');
    await p.close();
  }
  console.log(errs.length ? [...new Set(errs)].slice(0, 12).join('\n') : 'no errors'); await b.close();
})();
