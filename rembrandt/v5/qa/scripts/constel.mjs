// Constellation integrity: render Reviews V1 deterministically in the owner-kept checkpoint build (e685bee) and in the
// current build, and pixel-compare the V1 stage. Deterministic: Math.random seeded identically in both, reduced motion
// (the designed still frame), fixed overlays hidden (nav, pickers, companion, dividers, mobile bar) in both.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const files = { checkpoint: 'file:///tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/v7/checkpoint-e685bee.html', current: 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html' };
const b = await chromium.launch(); const res = [];
for (const [w, h] of [[1440, 900], [375, 812]]) {
  for (const [name, url] of Object.entries(files)) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce', deviceScaleFactor: 1 });
    await ctx.addInitScript(() => { Math.random = () => 0.5; }); // order-independent: every draw returns the same value in both builds
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(url); await p.waitForTimeout(900);
    await p.addStyleTag({ content: '.nav,.pick-rail,.pick,.cmp,.cmp-pick,.mbar,.div,svg.div,.cursor,#cursor,[class*="cursor"]{visibility:hidden!important}' });
    await p.evaluate(() => { const s = document.getElementById('proof'); scrollTo(0, s.getBoundingClientRect().top + scrollY); });
    await p.waitForTimeout(1200);
    const box = await p.evaluate(() => { const r = document.querySelector('#proof .stage > .pv1').getBoundingClientRect(); return { x: Math.max(0, r.left), y: Math.max(0, r.top), width: Math.min(innerWidth, r.width), height: Math.min(innerHeight - Math.max(0, r.top), r.height) }; });
    const f = `constel-${name}-${w}.png`; await p.screenshot({ path: f, clip: box });
    res.push({ w, name, f, box: JSON.stringify(box), errs: errs.length });
    await ctx.close();
  }
}
await b.close(); console.log(JSON.stringify(res));
