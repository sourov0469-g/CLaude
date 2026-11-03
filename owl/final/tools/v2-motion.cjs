// V2 motion proof: owl head/eye follow the cursor, the eye blinks, wings sway, the CTA folds the wings
const { chromium } = require('playwright'); const path = require('path');
(async () => {
  const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); await p.route('https://**', r => r.abort());
  await p.goto('file://' + path.resolve(__dirname, '../owl-roofing.html') + '?hero=2'); await p.waitForTimeout(2500);
  const st = await p.$('.hero2 .art'); const bb = await st.boundingBox();
  const face = { x: bb.x + bb.width * .42, y: bb.y + bb.height * .22, width: bb.width * .2, height: bb.height * .26 };
  const out = path.resolve(__dirname, '../gates/wip');
  const R = {};
  await p.mouse.move(60, 450, { steps: 10 }); await p.waitForTimeout(1800); await p.screenshot({ path: out + '/v2-look-left.jpg', clip: face });
  await p.mouse.move(1400, 450, { steps: 10 }); await p.waitForTimeout(1800); await p.screenshot({ path: out + '/v2-look-right.jpg', clip: face });
  // blink: sample the eye 40 times over 5 s, record darkest frame vs open frame
  const eye = await p.evaluate(() => { const r = document.querySelector('.hero2 .art').getBoundingClientRect(); return { x: r.x + r.width * (0.015 + 0.97 * 638 / 1180), y: r.y + r.height * (0.015 + 0.97 * 254 / 766) }; });
  let lum = [];
  for (let i = 0; i < 50; i++) { const buf = await p.screenshot({ clip: { x: eye.x - 6, y: eye.y - 6, width: 12, height: 12 } }); lum.push(buf.length); await p.waitForTimeout(90); }
  R.eyeSampleSpread = Math.max(...lum) - Math.min(...lum);
  const full = { x: bb.x, y: bb.y, width: bb.width, height: bb.height };
  await p.mouse.move(720, 880, { steps: 4 }); await p.screenshot({ path: out + '/v2-wings-open.jpg', clip: full });
  await p.click('.hero2 .fold'); await p.waitForTimeout(1800); await p.screenshot({ path: out + '/v2-wings-folded.jpg', clip: full });
  R.foldPressed = await p.getAttribute('.hero2 .fold', 'aria-pressed');
  console.log(JSON.stringify(R)); await b.close();
})();
