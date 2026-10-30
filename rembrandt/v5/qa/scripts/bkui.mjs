// backup UI check: more button reveals B1-B3 (aria-expanded), click B2 mounts tpl-*-b2, the B key reveals all, R resets
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'); await p.waitForTimeout(1500);
const st = id => p.evaluate(id => { const s = document.getElementById(id); return { v: s.dataset.v, def: s.dataset.def, exp: s.querySelector('.pick-more').getAttribute('aria-expanded'), bkVis: getComputedStyle(s.querySelector('.pick-bk')).display, ann: document.getElementById('announce').textContent, ind: s.querySelector('.pick-ind') && s.querySelector('.pick-ind').style.translate }; }, id);
const out = [];
for (const id of ['hero', 'proof', 'work', 'family', 'how', 'area', 'call']) {
  await p.evaluate(id => document.getElementById(id).scrollIntoView(), id); await p.waitForTimeout(300);
  const a = await st(id);
  await p.locator(`#${id} .pick-more`).click(); await p.waitForTimeout(200);
  const b1 = await st(id);
  await p.locator(`label[for="v-${id}-b2"]`).click(); await p.waitForTimeout(900);
  const c = await st(id);
  await p.locator(`label[for="v-${id}-${a.def}"]`).click(); await p.waitForTimeout(700);
  const d = await st(id);
  out.push(`${id}: start v${a.v} (def ${a.def}) bk ${a.bkVis}/${a.exp} -> more: ${b1.bkVis}/${b1.exp} -> B2: v${c.v} "${c.ann}" ind ${c.ind} -> back: v${d.v} "${d.ann}"`);
}
await p.keyboard.press('b'); await p.waitForTimeout(200);
out.push('B key: ' + await p.evaluate(() => [...document.querySelectorAll('.pick-bk')].map(e => getComputedStyle(e).display).join(',')));
out.push('errors ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
