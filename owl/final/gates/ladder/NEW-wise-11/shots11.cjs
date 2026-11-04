// Evidence for Wise Check 11: untouched (after the demo stroke), mid-wipe, and cleared; pointer kept off the window
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html') + '?wise=11', OUT = __dirname, DSF = +(process.argv[2] || 2);
(async () => { const b = await chromium.launch(); const S = '.ver[data-sec="wise"][data-v="11"]';
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });
    await p.goto(F); await p.addStyleTag({ content: '.owlc{display:none!important}.hdr{visibility:hidden}' }); await p.mouse.move(w - 2, h - 2); await p.waitForTimeout(800);
    await p.evaluate(S => document.querySelector(S).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(2600);
    const clip = async () => p.evaluate(S => { const r = document.querySelector(S).getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; }, S);
    await p.screenshot({ path: path.join(OUT, `wise-v11-${w}.jpg`), type: 'jpeg', quality: 82, fullPage: true, clip: await clip() });
    const bb = await p.locator(S + ' .pane').boundingBox();
    await p.mouse.move(bb.x + bb.width * .12, bb.y + bb.height * .3); for (let i = 0; i <= 10; i++) await p.mouse.move(bb.x + bb.width * (.12 + .5 * i / 10), bb.y + bb.height * (.3 + .05 * Math.sin(i))); await p.mouse.move(w - 2, h - 2); await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(OUT, `wise-v11-wiping-${w}.jpg`), type: 'jpeg', quality: 82, fullPage: true, clip: await clip() });
    for (let row = 0; row < 7; row++) { const y = bb.y + bb.height * (.06 + row * .15); await p.mouse.move(bb.x + 4, y); await p.mouse.move(bb.x + bb.width - 4, y, { steps: 18 }); }
    await p.mouse.move(w - 2, h - 2); await p.waitForTimeout(1500);
    await p.screenshot({ path: path.join(OUT, `wise-v11-clear-${w}.jpg`), type: 'jpeg', quality: 82, fullPage: true, clip: await clip() });
    await p.close(); }
  await b.close(); })();
