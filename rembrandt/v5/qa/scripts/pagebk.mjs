// every page backup opens: template mounted, flag set, images decoded, no errors; one shot per backup
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); let bad = 0;
for (const [file, id] of [['services.html', 'svcp'], ['about.html', 'about']]) {
  const res = [];
  for (const v of ['b4', 'b5', 'b6', 'b7', 'b8']) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(`file:///home/user/CLaude/rembrandt/v5/${file}?v=${id}${v}`); await p.waitForTimeout(1500);
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(600); await p.evaluate(() => window.scrollTo(0, 0)); await p.waitForTimeout(400);
    const r = await p.evaluate(id => { const s = document.getElementById(id); const imgs = [...s.querySelectorAll('img')]; return { bk: s.classList.contains('on-bk'), old: s.classList.contains('on-bk-old'), h: s.offsetHeight, imgs: imgs.length, broken: imgs.filter(i => !i.naturalWidth).length, ov: document.documentElement.scrollWidth > innerWidth }; }, id);
    await p.screenshot({ path: `pg-${id}-${v}.jpg`, type: 'jpeg', quality: 50 });
    const ok = r.bk && !r.old && r.h > 400 && !r.broken && !r.ov && !errs.length; if (!ok) bad++;
    res.push(`${v}:${ok ? 'ok' : 'BAD ' + JSON.stringify(r) + errs.join('|')}(${r.imgs} img)`); await p.close();
  }
  console.log(id, res.join(' '));
}
console.log('bad', bad); await b.close();
