import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [file, w = '375'] = process.argv.slice(2); const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: +w, height: 812 }, hasTouch: true, isMobile: +w < 500 }); const p = await ctx.newPage();
await p.goto('file://' + file); await p.waitForTimeout(1500); const out = [];
for (const id of ['proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call']) {
  await p.evaluate(id => { const s = document.getElementById(id); window.scrollTo(0, s.getBoundingClientRect().top + scrollY); }, id); await p.waitForTimeout(500);
  out.push(id + ' ' + await p.evaluate(id => { const s = document.getElementById(id), pk = s.querySelector('.pick').getBoundingClientRect(), h = s.querySelector('.stage h2, .stage h1'); if (!h) return 'no h2'; const r = h.getBoundingClientRect(); return `pick ${Math.round(pk.top)}-${Math.round(pk.bottom)} h2 ${Math.round(r.top)}-${Math.round(r.bottom)} overlap ${r.top < pk.bottom && r.bottom > pk.top && r.left < pk.right && r.right > pk.left}`; }, id));
}
console.log(out.join('\n')); await b.close();
