// quick look: node look.mjs <w> <query> <out-prefix> <section ids...>  (scrolls to each section top, viewport shot)
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [w, q, out, ...ids] = process.argv.slice(2);
const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: +w, height: +w < 500 ? 812 : 900 }, hasTouch: +w < 500, isMobile: +w < 500 });
const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html' + (q && q !== '-' ? '?v=' + q : '')); await p.waitForTimeout(1500);
for (const id of ids) {
  const [sid, off = '0'] = id.split('@');
  await p.evaluate(([sid, off]) => { const s = document.getElementById(sid); window.scrollTo(0, s.getBoundingClientRect().top + scrollY + +off); }, [sid, off]);
  await p.waitForTimeout(1300);
  await p.screenshot({ path: `${out}-${id.replace('@', '_')}.jpg`, type: 'jpeg', quality: 60 });
}
console.log('errors', errs.length ? errs.join(' | ') : 0); await b.close();
