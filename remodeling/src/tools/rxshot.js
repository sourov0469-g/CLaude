// usage: node rxshot.js "query" "sel1|sel2|..." outprefix [width]
// hovers each element, clips a strip around it (hover frame, then click frame); stitch with stitch.py
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
(async () => {
  const [q, sels, out, wArg] = process.argv.slice(2);
  const w = +(wArg || 1440), mob = w < 600;
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: w, height: mob ? 812 : 900 }, hasTouch: mob, isMobile: mob });
  const p = await ctx.newPage();
  await p.goto(FILE + '?' + q); await p.waitForTimeout(1200);
  let n = 0;
  for (const sel of sels.split('|')) {
    const el = await p.$(sel); if (!el) { console.log('no', sel); continue; }
    const fixed = await el.evaluate(e => !!e.closest('.nav, .mbar, .settings, .vswitch'));
    if (!fixed) await el.evaluate(e => { const r = e.getBoundingClientRect(); window.scrollTo(0, r.top + scrollY - innerHeight / 2); });
    else await p.evaluate(() => window.scrollTo(0, 0));
    await p.waitForTimeout(900);
    const bx = await el.boundingBox();
    const clip = { x: Math.max(0, bx.x - 70), y: Math.max(0, bx.y - 60), width: Math.min(bx.width + 140, w - Math.max(0, bx.x - 70), 700), height: Math.min(bx.height + 120, 300) };
    if (!mob) { await p.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2, { steps: 4 }); await p.waitForTimeout(450); fs.writeFileSync(`${out}-${n++}.png`, await p.screenshot({ clip })); }
    if (mob) await p.touchscreen.tap(bx.x + bx.width / 2, bx.y + bx.height / 2); else { await p.mouse.down(); await p.mouse.up(); }
    await p.waitForTimeout(160);
    fs.writeFileSync(`${out}-${n++}.png`, await p.screenshot({ clip }));
    if (!mob) { await p.mouse.move(5, 450); await p.waitForTimeout(300); }
  }
  await b.close();
})();
