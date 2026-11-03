import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
// usage: stage.mjs file out sec v route stageSelector
const [src, out, sec, v, route, sel] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file://' + src + `?v=${sec}:${v}#/${route}`, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
for (const f of [0.12, 0.5, 0.88]) {
  await p.evaluate(([sel, f]) => { const s = document.querySelector(sel); const r = s.getBoundingClientRect(); scrollTo(0, scrollY + r.top + f * (r.height - innerHeight)); }, [sel, f]);
  await p.waitForTimeout(500); await p.screenshot({ path: `${out}/${sec}-st-${Math.round(f * 100)}.png` });
}
console.log('errors', JSON.stringify(errs)); await b.close();
