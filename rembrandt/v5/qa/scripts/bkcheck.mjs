// Audit pack 2026-10-30 A2 check: every backup B<n> renders like V<n> of the file as it stood before the round.
// Both pages under reduced motion (deterministic end states), every other section on its own V1 / B1, chrome hidden;
// the section is screenshotted and compared pixel by pixel. Also: no img without a src, no console errors.
// usage: node bkcheck.mjs <old.html> <new.html> <outDir>
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
import fs from 'node:fs';
const [OLD, NEW, out] = process.argv.slice(2);
const IDS = ['hero', 'proof', 'work', 'family', 'how', 'area', 'call'];
const b = await chromium.launch(); const lines = [];
async function shot(file, query, id, name, w) {
  const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + file + '?v=' + query); await p.waitForTimeout(1500);
  await p.addStyleTag({ content: '.pick-rail,.cmp-pick,.nav,.mbar,.cmp,.cfx{display:none!important}' });
  await p.evaluate(id => document.getElementById(id).scrollIntoView(), id); await p.waitForTimeout(900);
  const info = await p.evaluate(id => { const s = document.getElementById(id); return { v: s.dataset.v, noSrc: s.querySelectorAll('img:not([src])').length }; }, id);
  const f = `${out}/${name}.png`; await p.locator('#' + id).screenshot({ path: f, animations: 'disabled' });
  await ctx.close(); return { f, errs, ...info };
}
for (const w of [1440, 375]) for (const id of IDS) for (const n of [1, 2, 3]) {
  const o = await shot(OLD, IDS.map(x => x === id ? x + n : '').filter(Boolean).join(','), id, `old-${id}${n}-${w}`, w);
  const q = IDS.map(x => x + (x === id ? 'b' + n : 'b1')).join(',');
  const nn = await shot(NEW, q, id, `bk-${id}${n}-${w}`, w);
  lines.push(`${id} V${n} vs B${n} @${w}: old v${o.v} new v${nn.v}; img without src ${nn.noSrc}; errors ${nn.errs.length ? nn.errs.join(' | ') : 0}; ${o.f.split('/').pop()} | ${nn.f.split('/').pop()}`);
}
console.log(lines.join('\n')); await b.close();
