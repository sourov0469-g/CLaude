// touch + reduced-motion check for the button system: node btn-touch.cjs <outdir>
const { chromium, devices } = require('playwright'); const path = require('path'); const fs = require('fs');
const OUT = path.resolve(process.argv[2]); fs.mkdirSync(OUT, { recursive: true }); const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html');
(async () => { const b = await chromium.launch(); const res = {};
  const ctx = await b.newContext({ ...devices['iPhone 13'] }); const p = await ctx.newPage(); await p.goto(F + '?hero=13'); await p.waitForTimeout(1500);
  const sel = '.ver[data-sec="hero"][data-v="13"] .ctas a[href^="tel:"]'; const loc = p.locator(sel); await loc.scrollIntoViewIfNeeded(); const bb = await loc.boundingBox();
  await p.evaluate(sel => document.querySelector(sel).addEventListener('click', e => e.preventDefault()), sel);
  await p.touchscreen.tap(bb.x + bb.width * .3, bb.y + bb.height / 2); await p.waitForTimeout(110);
  res.touchSplash = await p.evaluate(() => document.querySelectorAll('.tap').length > 0);
  res.touchRipple = await p.evaluate(sel => !!document.querySelector(sel + ' .rp'), sel);
  res.touchRings = await p.evaluate(sel => document.querySelector(sel).classList.contains('rung'), sel);
  res.hoverNotNeeded = await p.evaluate(() => !matchMedia('(hover:hover)').matches);
  await p.screenshot({ path: path.join(OUT, 'touch-tap-call-390.png'), clip: { x: Math.max(0, bb.x - 20), y: Math.max(0, bb.y - 40), width: Math.min(390, bb.width + 40), height: bb.height + 80 } });
  await ctx.close();
  const rm = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); await rm.goto(F + '?hero=13'); await rm.waitForTimeout(1200);
  const s2 = '.ver[data-sec="hero"][data-v="13"] .ctas .btn-amber'; const b2 = await rm.locator(s2).boundingBox(); await rm.mouse.move(b2.x + b2.width / 2, b2.y + b2.height / 2); await rm.waitForTimeout(400);
  res.reducedNoRoll = await rm.evaluate(s2 => getComputedStyle(document.querySelector(s2 + ' .bl i')).transform === 'none', s2);
  res.reducedNoArrowTravel = await rm.evaluate(s2 => getComputedStyle(document.querySelector(s2 + ' .bi .a1')).transform === 'none', s2);
  fs.writeFileSync(path.join(OUT, 'touch-reduced.json'), JSON.stringify(res, null, 1)); console.log(JSON.stringify(res)); await b.close(); })();
