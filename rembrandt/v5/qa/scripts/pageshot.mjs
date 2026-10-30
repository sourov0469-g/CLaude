// full-page shots of an inner page's five layouts (reduced motion so every block is at rest), plus errors and overflow
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [file, id, out, w = '1440'] = process.argv.slice(2); const b = await chromium.launch(); const lines = [];
for (const v of [1, 2, 3, 4, 5]) {
  const ctx = await b.newContext({ viewport: { width: +w, height: +w < 500 ? 812 : 900 }, reducedMotion: 'reduce', hasTouch: +w < 500, isMobile: +w < 500 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${id}${v}`); await p.waitForTimeout(1400);
  await p.addStyleTag({ content: '.cmp-pick,.cmp{display:none!important}' });
  const r = await p.evaluate(() => ({ ov: document.documentElement.scrollWidth - innerWidth, h: document.documentElement.scrollHeight, v: document.querySelector('[data-section]').dataset.v, h1: document.querySelectorAll('h1').length }));
  await p.screenshot({ path: `${out}-v${v}.jpg`, type: 'jpeg', quality: 55, fullPage: true });
  lines.push(`${id} v${v}@${w} (got ${r.v}): overflow ${r.ov}, height ${r.h}, h1 ${r.h1}, errors ${errs.length ? errs.join(' | ').slice(0, 200) : 0}`); await ctx.close();
}
console.log(lines.join('\n')); await b.close();
