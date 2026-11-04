// Evidence for Protect 10: untouched, mid-sweep (mouse), swept; pointer kept off the lawn between steps
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html') + '?wrap=10', DSF = +(process.argv[2] || 2);
(async () => { const b = await chromium.launch(); const S = '.ver[data-sec="wrap"][data-v="10"]';
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });
    await p.goto(F); await p.addStyleTag({ content: '.owlc{display:none!important}.hdr{visibility:hidden}' }); await p.mouse.move(w - 2, 2); await p.waitForTimeout(800);
    await p.evaluate(S => document.querySelector(S).scrollIntoView({ block: 'start', behavior: 'instant' }), S); await p.waitForTimeout(2000);
    const clip = async () => p.evaluate(S => { const r = document.querySelector(S).getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: r.height }; }, S);
    await p.screenshot({ path: path.join(__dirname, `wrap-v10-${w}.jpg`), type: 'jpeg', quality: 82, fullPage: true, clip: await clip() });
    const bb = await p.locator(S + ' .lawn').boundingBox();
    if (w > 640) { await p.mouse.move(bb.x + bb.width * .1, bb.y + bb.height * .7); await p.mouse.move(bb.x + bb.width * .5, bb.y + bb.height * .72, { steps: 30 }); await p.waitForTimeout(500); }
    else { const m = await p.locator(S + ' .mag').boundingBox(); await p.mouse.move(m.x + m.width / 2, m.y + m.height / 2); await p.mouse.down(); await p.mouse.move(bb.x + bb.width * .15, bb.y + bb.height * .7, { steps: 30 }); await p.mouse.up(); await p.waitForTimeout(500); }
    await p.screenshot({ path: path.join(__dirname, `wrap-v10-sweeping-${w}.jpg`), type: 'jpeg', quality: 82, fullPage: true, clip: await clip() });
    await p.click(S + ' .aux button'); await p.mouse.move(w - 2, 2); await p.waitForTimeout(3600);
    await p.screenshot({ path: path.join(__dirname, `wrap-v10-swept-${w}.jpg`), type: 'jpeg', quality: 82, fullPage: true, clip: await clip() });
    await p.close(); }
  await b.close(); })();
