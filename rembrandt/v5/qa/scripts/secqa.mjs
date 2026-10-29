// Section QA (BRIEF-FULL.md §10 done-criteria): per version at 1440 and 375 (+ reduced motion at 1440): screenshot of the
// section, console errors, the switcher swaps ONLY this section (hash of every other section's stage before/after),
// overflow. usage: node secqa.mjs <sectionId> <outDir> [settleMs]
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
import crypto from 'node:crypto';
const [id, out, settle = '1600'] = process.argv.slice(2);
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const lines = [];
for (const [w, h, rm] of [[1440, 900, ''], [375, 812, ''], [1440, 900, 'reduce']]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: rm ? 'reduce' : 'no-preference', hasTouch: w < 500, isMobile: w < 500 });
  const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(FILE); await p.waitForTimeout(700);
  // mark every section's live version node; after the switch, the marked nodes of all OTHER sections must still be in place
  const mark = () => p.evaluate(() => [...document.querySelectorAll('[data-section]')].forEach(s => { const r = s.querySelector('.stage').firstElementChild; if (r) r.dataset.qaMark = s.id; }));
  const survivors = () => p.evaluate(() => [...document.querySelectorAll('[data-section]')].filter(s => { const r = s.querySelector('.stage').firstElementChild; return r && r.dataset.qaMark === s.id; }).map(s => s.id));
  const all = await p.evaluate(() => [...document.querySelectorAll('[data-section]')].map(s => s.id));
  for (const v of [2, 3, 1]) {
    await mark();
    // switch with the section's own picker (a real click on its label)
    await p.evaluate(id => { const s = document.getElementById(id); window.scrollTo(0, s.getBoundingClientRect().top + scrollY); }, id);
    await p.waitForTimeout(300);
    await p.locator(`label[for="v-${id}-${v}"]`).click({ force: true });
    await p.waitForTimeout(+settle);
    const kept = await survivors(); const changed = all.filter(x => !kept.includes(x));
    const cur = await p.evaluate(id => document.getElementById(id).dataset.v, id);
    const ov = await p.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    await p.evaluate(id => { const s = document.getElementById(id); window.scrollTo(0, s.getBoundingClientRect().top + scrollY); }, id); await p.waitForTimeout(500);
    const f = `${out}/${id}${v}-${w}${rm ? '-rm' : ''}.jpg`; await p.screenshot({ path: f, type: 'jpeg', quality: 62 });
    const only = changed.length === 1 && changed[0] === id ? 'only ' + id : 'CHANGED ' + (changed.join(',') || 'nothing');
    lines.push(`${id} v${v} @${w}${rm ? ' reduce' : ''}: active v${cur}; switcher swaps ${only}; overflow ${ov}; errors ${errs.length ? errs.join(' | ') : 0}; shot ${f.split('/').pop()}`);
  }
  await ctx.close();
}
console.log(lines.join('\n')); await b.close();
