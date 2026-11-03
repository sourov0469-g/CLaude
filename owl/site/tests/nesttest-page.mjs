import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = process.argv[2]; const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const R = []; const ok = (n, c, i = '') => R.push(`${c ? 'PASS' : 'FAIL'}  ${n}${i ? '  [' + i + ']' : ''}`);
for (const [w, tag] of [[1440, 'desktop'], [390, 'phone']]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto('file://' + F + '#/nest', { waitUntil: 'load' }); await p.waitForTimeout(300);
  const st = () => p.evaluate(() => [...document.querySelectorAll('.nk1-rounds li')].map(l => l.classList.contains('is-on') ? 1 : 0).join(''));
  await p.evaluate(() => { const t = document.querySelector('.nk1-track').getBoundingClientRect(); scrollTo(0, scrollY + t.top - innerHeight * 0.95); }); await p.waitForTimeout(300);
  const s0 = await st();
  await p.evaluate(() => { const t = document.querySelector('.nk1-track').getBoundingClientRect(); scrollTo(0, scrollY + t.bottom - innerHeight * 0.2); }); await p.waitForTimeout(300);
  const s1 = await st();
  ok(`${tag}: cleanup rounds tick as the line reaches them (${s0} -> ${s1})`, s0 !== '111' && s1 === '111');
  await p.evaluate(() => scrollTo(0, scrollY - innerHeight * 3)); await p.waitForTimeout(300);
  ok(`${tag}: the line runs backwards on reverse scroll`, (await st()) !== '111');
  ok(`${tag}: no JS errors`, !errs.length, errs.join('|'));
  if (tag === 'desktop') { await p.click('.nk1-play a'); await p.waitForTimeout(500); ok('"Play round two" lands on the game on Home', await p.evaluate(() => !document.querySelector('.page[data-page="home"]').hidden && Math.abs(document.getElementById('s-game').getBoundingClientRect().top) < 200)); }
}
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })).newPage();
await p.goto('file://' + F + '?v=pn-aftercare:2,pn-guarantee:2#/nest', { waitUntil: 'load' }); await p.waitForTimeout(400);
ok('reduced motion: every cleanup round is on', await p.evaluate(() => [...document.querySelectorAll('.nk1-rounds li')].every(l => l.classList.contains('is-on'))));
ok('reduced motion: the aftercare lid is shut', await p.evaluate(() => /translate\(0 (-)?0(\.0)?\)/.test(document.querySelector('.na2-art g').getAttribute('transform'))));
ok('reduced motion: both guarantee paths are drawn', await p.evaluate(() => [...document.querySelectorAll('.ng2-svg path')].every(x => +x.style.strokeDashoffset === 0)));
console.log(R.join('\n')); await b.close();
