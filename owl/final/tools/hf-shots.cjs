// Header + footer treatment evidence: node hf-shots.cjs [dsf] [outdir]
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const DSF = +(process.argv[2] || 1); const OUT = path.resolve(__dirname, '..', process.argv[3] || 'gates/wip'); fs.mkdirSync(OUT, { recursive: true });
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push(w + ' ' + e.message));
    await p.route('https://**', r => r.abort()); await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html')); await p.waitForTimeout(1200);
    await p.evaluate(() => scrollTo({ top: (document.documentElement.scrollHeight - innerHeight) * .4, behavior: 'instant' })); await p.waitForTimeout(600);
    if (w === 1440) { const a = await p.$('.hdr-nav a:nth-child(2)'); const bb = await a.boundingBox(); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await p.waitForTimeout(500); }
    await p.screenshot({ path: path.join(OUT, `header-${w}.jpg`), quality: 82, type: 'jpeg', clip: { x: 0, y: 0, width: w, height: 120 } });
    await p.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })); await p.waitForTimeout(1600);
    const fb = await p.evaluate(() => { const r = document.querySelector('.ftr').getBoundingClientRect(); return { y: Math.max(0, r.top - 60), h: Math.min(innerHeight, r.height + 60) - Math.max(0, r.top - 60) + Math.max(0, r.top - 60) }; });
    await p.screenshot({ path: path.join(OUT, `footer-${w}.jpg`), quality: 82, type: 'jpeg', clip: { x: 0, y: fb.y, width: w, height: Math.min(h - fb.y, fb.h) } });
    await p.close(); }
  console.log(errs.length ? errs.join('\n') : 'no errors'); await b.close(); })();
