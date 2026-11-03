import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
// usage: secshot.mjs file out sec versions(e.g. 1,2) widths(e.g. 1440,390)
const [src, out, sec, vers = '1,2', widths = '1440,390', route = 'home', wait = '2800'] = process.argv.slice(2);
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
for (const v of vers.split(',')) for (const w of widths.split(',').map(Number)) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, hasTouch: w < 500, isMobile: w < 500 })).newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + src + `?v=${sec}:${v}#/${route}`, { waitUntil: 'load' }); await p.evaluate(() => document.fonts.ready);
  const el = p.locator(`#s-${sec} > .ver[data-v="${v}"]`); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(+wait);
  await el.screenshot({ path: `${out}/${sec}-v${v}-${w}.png` });
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  console.log(`${sec} v${v} @${w}: overflow ${ov} errors ${JSON.stringify(errs)}`); await p.close();
}
await b.close();
