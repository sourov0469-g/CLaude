// R5: every backup of every inner-page section opens: template mounted, version flag set, images decoded, no overflow,
// no errors. Head sections hold B1-B5 (the R4 whole-page records, current palette: no on-bk); bodies hold B4-B8 (old palette).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); let bad = 0, n = 0;
const SETS = [['services.html', 'sphero', ['b1', 'b2', 'b3', 'b4', 'b5'], false], ['services.html', 'svcp', ['b4', 'b5', 'b6', 'b7', 'b8'], true],
  ['about.html', 'abhero', ['b1', 'b2', 'b3', 'b4', 'b5'], false], ['about.html', 'about', ['b4', 'b5', 'b6', 'b7', 'b8'], true], ['contact.html', 'cthero', ['b1', 'b2', 'b3', 'b4', 'b5'], false]];
for (const [file, id, vs, oldPal] of SETS) {
  const res = [];
  for (const v of vs) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${id}${v}`); await p.waitForTimeout(1400);
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(500); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(300);
    const r = await p.evaluate(id => { const s = document.getElementById(id); const imgs = [...s.querySelectorAll('img')]; return { v: s.dataset.v, bk: s.classList.contains('on-bk'), h: s.offsetHeight, imgs: imgs.length, broken: imgs.filter(i => !i.naturalWidth).length, ov: document.documentElement.scrollWidth > innerWidth }; }, id);
    const ok = r.v === v && r.bk === oldPal && r.h > 300 && !r.broken && !r.ov && !errs.length; n++; if (!ok) bad++;
    res.push(`${v}:${ok ? 'ok' : 'BAD ' + JSON.stringify(r) + errs.join('|').slice(0, 120)}`); await p.close();
  }
  console.log(file, id, res.join(' '));
}
console.log(`opened ${n - bad} of ${n}; bad ${bad}`); await b.close();
