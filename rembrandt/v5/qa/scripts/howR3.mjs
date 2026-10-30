import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'; const b = await chromium.launch(); const out = [], errs = [];
const pg = async q => { const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto(F + (q ? '?v=' + q : '')); await p.waitForTimeout(1200); return p; };
{ const p = await pg('');
  const lit = () => p.evaluate(() => [...document.querySelectorAll('.hw3-ro')].map(o => Math.round(parseFloat(getComputedStyle(o).strokeDashoffset) || 0)).join(','));
  const rows = await p.evaluate(() => [...document.querySelectorAll('.hw3-row')].map(r => r.getBoundingClientRect().top + scrollY + r.offsetHeight / 2));
  const res = [];
  for (const y of rows) { await p.evaluate(y => scrollTo(0, y - innerHeight / 2), y); await p.waitForTimeout(700); res.push(await p.evaluate(() => [...document.querySelectorAll('.hw3-ro')].map(o => parseFloat((getComputedStyle(o).strokeDasharray || '0').split(/[ ,]+/)[0]) > 2 ? 'ON' : '-').join(''))); }
  out.push('V3 active ridge per reading position: ' + res.join(' | '));
  out.push('V3 links ' + await p.evaluate(() => document.querySelectorAll('.hw3 a').length) + ', line weights ' + await p.evaluate(() => [...new Set([...document.querySelectorAll('.hw3-act, .hw3-act *')].map(e => getComputedStyle(e).fontWeight))].join('/')) + ', line colour ' + await p.evaluate(() => getComputedStyle(document.querySelectorAll('.hw3-act')[1]).color));
}
{ const p = await pg('how2'); await p.evaluate(() => document.getElementById('how').scrollIntoView()); await p.waitForTimeout(600);
  await p.locator('#hw2-t2').click(); await p.waitForTimeout(400);
  out.push('V2 after tab click: pressed ' + await p.evaluate(() => document.querySelector('.hw2-pause').getAttribute('aria-pressed')) + ' "' + await p.evaluate(() => document.querySelector('.hw2-pause').getAttribute('aria-label')) + '" panel ' + await p.evaluate(() => document.querySelector('.hw2-item.is-visible').id)); }
{ const p = await pg('how4'); const ys = await p.evaluate(() => [...document.querySelectorAll('.hw4-step')].map(s => s.getBoundingClientRect().top + scrollY + s.offsetHeight / 2));
  const st = []; for (const y of ys) { await p.evaluate(y => scrollTo(0, y - innerHeight / 2), y); await p.waitForTimeout(500); st.push(await p.evaluate(() => document.querySelector('.hw4').dataset.st)); }
  out.push('V4 house state per step: ' + st.join(',') + '; stage sticky ' + await p.evaluate(() => getComputedStyle(document.querySelector('.hw4-stage')).position)); }
out.push('errors ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
