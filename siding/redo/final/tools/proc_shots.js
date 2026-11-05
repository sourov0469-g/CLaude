// Process screenshots for the gate: node tools/proc_shots.js [html]  -> gate/process-*.png|jpg
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'out', 'final-procfoot.html')); const G = path.join(__dirname, '..', 'gate'); fs.mkdirSync(G, { recursive: true });
(async () => {
  const b = await chromium.launch();
  async function open(w, h, extra = {}) { const c = await b.newContext({ viewport: { width: w, height: h }, ...extra }); const p = await c.newPage(); await p.goto(F, { waitUntil: 'load' }); await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await p.evaluate(() => scrollTo({ top: scrollY + document.querySelector('.pr').getBoundingClientRect().top - 70, behavior: 'instant' })); await p.waitForTimeout(500); p.c = c; return p; }
  const clip = (p, w, h) => ({ x: 0, y: 66, width: w, height: Math.min(h - 66, 830) });
  let p = await open(1440, 900); await p.waitForTimeout(3800); await p.screenshot({ path: G + '/process-1440-step1-scan.png', clip: clip(p, 1440, 900) });
  await p.mouse.move(2, 2);
  for (const [i, t] of [[1, 1], [2, 1], [3, 1]]) { await p.evaluate((i) => __proc.open(i, true), i); await p.waitForTimeout(1200); await p.evaluate((t) => __proc.set(t), t); await p.waitForTimeout(700); await p.screenshot({ path: G + `/process-1440-step${i + 1}.png`, clip: clip(p, 1440, 900) }); }
  // hover on a closed column
  await p.evaluate(() => __proc.open(0, true)); await p.waitForTimeout(1200); const bx = await (await p.$('.i2 .pr-col')).boundingBox(); await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await p.waitForTimeout(60);
  await p.screenshot({ path: G + '/process-1440-hover-closed.png', clip: clip(p, 1440, 900) }); await p.mouse.move(2, 2);
  // sequences: 4 drawings x 6 moments
  const T = [0.04, .2, .4, .6, .8, 1]; const tiles = [];
  for (let i = 0; i < 4; i++) { await p.evaluate((i) => __proc.open(i, true), i); await p.waitForTimeout(1200); await p.mouse.move(2, 2); const panel = await p.$(`.i${i} .pr-panel`); for (const t of T) { await p.evaluate((t) => __proc.set(t), t); await p.waitForTimeout(600); const f = `/tmp/pfseq-${i}-${t}.png`; await panel.screenshot({ path: f }); tiles.push(f); } }
  fs.writeFileSync('/tmp/pf_tiles.json', JSON.stringify(tiles)); await p.c.close();
  p = await open(1024, 768); await p.evaluate(() => __proc.open(2, true)); await p.waitForTimeout(1200); await p.evaluate(() => __proc.set(1)); await p.waitForTimeout(600); await p.screenshot({ path: G + '/process-1024-step3.png', clip: clip(p, 1024, 768) }); await p.c.close();
  p = await open(390, 844, { hasTouch: true, isMobile: true, deviceScaleFactor: 2 }); await p.evaluate(() => __proc.open(1, true)); await p.waitForTimeout(1200); await p.evaluate(() => { document.querySelector('.pr').scrollIntoView({ behavior: 'instant', block: 'start' }); }); await p.waitForTimeout(300); await p.evaluate(() => __proc.set(1)); await p.waitForTimeout(600); await p.screenshot({ path: G + '/process-390-step2.png' });
  await p.evaluate(() => { __proc.open(2, true); }); await p.waitForTimeout(1200); await p.evaluate(() => __proc.set(1)); await p.waitForTimeout(500); await p.screenshot({ path: G + '/process-390-step3.png' }); await p.c.close();
  await b.close();
})();
