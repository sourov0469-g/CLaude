import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [src, out, route, q = ''] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
for (const [w, h, tag] of [[1440, 900, 'd'], [390, 844, 'm']]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h }, hasTouch: tag === 'm', isMobile: tag === 'm' })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + src + q + '#/' + route, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(500);
  const H = await p.evaluate(() => document.body.scrollHeight); let ov = 0;
  for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); ov = Math.max(ov, await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)); }
  await p.waitForTimeout(400); await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
  await p.screenshot({ path: `${out}/pg-${route}-${tag}.png`, fullPage: true });
  const h1 = await p.evaluate(() => [...document.querySelectorAll('h1')].filter(x => x.offsetParent).length);
  console.log(route, tag, 'height', H, 'overflow', ov, 'h1', h1, 'errors', JSON.stringify(errs));
}
await b.close();
