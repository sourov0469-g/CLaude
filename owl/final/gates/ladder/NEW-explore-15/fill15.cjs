// Evidence: Explore 15 with photos added (stand-in assets play the visitor's own photos; evidence only)
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html') + '?explore=15', A = path.resolve(__dirname, '../../../src/assets'), OUT = __dirname;
(async () => { const b = await chromium.launch(); const S = '.ver[data-sec="explore"][data-v="15"]';
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto(F); await p.addStyleTag({ content: '.owlc{display:none!important}.hdr{visibility:hidden}' }); await p.waitForTimeout(800);
    await p.evaluate(S => document.querySelector(S).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(2200);
    const pk = p.locator(S + ' .pick');
    await pk.nth(0).setInputFiles(path.join(A, 'hero-nest-home.webp'));
    if (w === 1440) { await p.waitForTimeout(450); const bb = await p.locator(S + ' .it').nth(0).boundingBox(); await p.screenshot({ path: path.join(OUT, 'explore-v15-developing-1440.jpg'), type: 'jpeg', quality: 85, clip: { x: bb.x - 30, y: bb.y - 10, width: bb.width + 60, height: bb.height + 20 } }); }
    await p.waitForTimeout(400); await pk.nth(1).setInputFiles(path.join(A, 'shingle-close.webp')); await p.waitForTimeout(2200);
    const bb = await p.evaluate(S => { const r = document.querySelector(S).getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; }, S);
    await p.screenshot({ path: path.join(OUT, `explore-v15-two-photos-${w}.jpg`), type: 'jpeg', quality: 82, fullPage: true, clip: bb });
    await p.close(); }
  await b.close(); })();
