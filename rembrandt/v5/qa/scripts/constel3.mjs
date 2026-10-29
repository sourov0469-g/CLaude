import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const files = { checkpoint: 'file:///tmp/claude-0/-home-user-CLaude/43c9e22a-5230-526e-a737-ae81faad601a/scratchpad/v7/checkpoint-e685bee.html', current: 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html' };
const b = await chromium.launch();
for (const w of [1440, 375]) for (const [name, url] of Object.entries(files)) {
  const ctx = await b.newContext({ viewport: { width: w, height: w > 500 ? 900 : 812 }, reducedMotion: 'reduce' });
  await ctx.addInitScript(() => { Math.random = () => 0.5; window.__ft = []; const o = CanvasRenderingContext2D.prototype.fillText; CanvasRenderingContext2D.prototype.fillText = function (t, x, y) { if (t === '4.9') window.__ft.push([this.font, this.canvas.width, this.canvas.height, +x.toFixed(2), +y.toFixed(2), document.fonts.check('800 100px Epilogue')]); return o.apply(this, arguments); }; });
  const p = await ctx.newPage(); await p.goto(url); await p.waitForTimeout(1500);
  console.log(w, name, JSON.stringify(await p.evaluate(() => window.__ft)));
  await ctx.close();
}
await b.close();
