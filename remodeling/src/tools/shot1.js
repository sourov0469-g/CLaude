const { chromium } = require('playwright');
(async () => {
  const [sec, v, sel, out] = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await p.goto('file:///home/user/CLaude/remodeling/site/elbaz-homepage.html?' + sec + '=' + v); await p.waitForTimeout(1500);
  await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(900);
  const r = await p.evaluate(s => { const e = document.querySelector(s).getBoundingClientRect(); return { x: Math.max(0, e.x - 40), y: Math.max(0, e.y - 40), width: Math.min(1440, e.width + 80), height: Math.min(900, e.height + 80) }; }, sel);
  await p.screenshot({ path: out, clip: r }); await b.close();
})();
