// Footer screenshots for the gate: node tools/foot_shots.js [html] -> gate/footer-*.png|jpg
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'out', 'final-procfoot.html')); const G = path.join(__dirname, '..', 'gate'); fs.mkdirSync(G, { recursive: true });
(async () => {
  const b = await chromium.launch();
  async function open(w, h, iso, extra = {}) { const c = await b.newContext({ viewport: { width: w, height: h }, timezoneId: 'America/Chicago', ...extra }); const p = await c.newPage(); if (iso) await p.clock.install({ time: new Date(iso) }); await p.goto(F, { waitUntil: 'load' }); await p.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
    await p.evaluate(() => scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })); if (iso) await p.clock.runFor(2500); else await p.waitForTimeout(2000); p.c = c; return p; }
  const foot = (p) => p.$('.fo');
  let p = await open(1440, 900, '2026-11-10T18:00:00Z'); await p.mouse.move(2, 2); await p.screenshot({ path: G + '/footer-1440-day-open.png', clip: { x: 0, y: 120, width: 1440, height: 780 } });
  const sb = await (await p.$('.fo-sky')).boundingBox(); await p.mouse.move(540, sb.y + 100, { steps: 5 }); await p.clock.runFor(800); await p.screenshot({ path: G + '/footer-1440-street-hover.png', clip: { x: 0, y: 120, width: 1440, height: 780 } });
  await p.mouse.move(2, 2); await p.hover('.fo-services .fo-ul li:nth-child(2) a'); await p.click('.fo-copy[data-what="Email address"]'); await p.clock.runFor(500); await p.screenshot({ path: G + '/footer-1440-copy-hover.png', clip: { x: 0, y: 120, width: 1440, height: 780 } }); await p.c.close();
  p = await open(1440, 900, '2026-11-14T03:30:00Z'); await p.mouse.move(2, 2); await p.screenshot({ path: G + '/footer-1440-night-closed.png', clip: { x: 0, y: 120, width: 1440, height: 780 } }); await p.c.close();
  p = await open(1024, 768, '2026-11-15T19:00:00Z'); await (await foot(p)).screenshot({ path: G + '/footer-1024-full.png' }); await p.c.close();
  p = await open(390, 844, '2026-11-10T18:00:00Z', { deviceScaleFactor: 2, hasTouch: true, isMobile: true }); await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await (await foot(p)).screenshot({ path: G + '/footer-390-full.png' }); await p.c.close();
  await b.close();
})();
