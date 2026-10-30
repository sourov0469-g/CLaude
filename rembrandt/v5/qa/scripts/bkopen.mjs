// every backup slot of every section opens (mounts its template, version flag set, no errors)
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const ids = ['hero', 'proof', 'svc', 'work', 'family', 'how', 'storm', 'area', 'call']; const b = await chromium.launch(); const out = []; let bad = 0;
for (const id of ids) {
  const res = [];
  for (const v of ['b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8']) {
    const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
    await p.goto(`file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html?v=${id}${v}`); await p.waitForTimeout(900);
    const r = await p.evaluate(id => { const s = document.getElementById(id); return { v: s.dataset.v, has: !!document.getElementById(`tpl-${id}-${s.dataset.v}`) || s.dataset.v, n: s.querySelector('.stage').firstElementChild?.childElementCount || 0 }; }, id).catch(() => ({ v: 'none' }));
    const ok = r.v === v && r.n > 0 && !errs.length; if (!ok) bad++;
    res.push(`${v}:${ok ? 'ok' : 'BAD(' + r.v + ',' + errs.join('|').slice(0, 80) + ')'}`); await p.close();
  }
  out.push(`${id} ${res.join(' ')}`);
}
console.log(out.join('\n') + `\nBAD ${bad}`); await b.close();
