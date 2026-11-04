// Evidence: the knock moment (shake, "Knock" marks, porch light) before the door swings; viewport capture
const { chromium } = require('playwright'); const path = require('path');
(async () => { const b = await chromium.launch(); const S = '.ver[data-sec="wise"][data-v="14"]';
  for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    await p.goto('file://' + path.resolve(__dirname, '../../../owl-roofing.html') + '?wise=14'); await p.addStyleTag({ content: '.owlc{display:none!important}.hdr{visibility:hidden}' }); await p.mouse.move(w - 2, h - 2);
    await p.evaluate(S => document.querySelector(S + ' .wall').scrollIntoView({ block: 'center', behavior: 'instant' }), S); await p.waitForTimeout(1500);
    await p.evaluate(S => document.querySelector(S + ' .door').click(), S); await p.waitForTimeout(330);
    const bb = await p.locator(S + ' .wall').boundingBox();
    await p.screenshot({ path: path.join(__dirname, `wise-v14-knock-${w}.jpg`), type: 'jpeg', quality: 85, clip: { x: Math.max(0, bb.x - 10), y: Math.max(0, bb.y - 10), width: Math.min(w, bb.width + 20), height: bb.height + 20 } });
    await p.close(); }
  await b.close(); })();
