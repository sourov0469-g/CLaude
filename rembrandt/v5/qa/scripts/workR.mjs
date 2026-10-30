import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'; const b = await chromium.launch(); const out = [];
const errs = [];
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(F + '?v=work1'); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('work').scrollIntoView()); await p.waitForTimeout(1200);
  const x = () => p.evaluate(() => Math.round(document.querySelector('.wv1-tile').getBoundingClientRect().left));
  const st = () => p.evaluate(() => { const b = document.querySelector('.wv1-pause'); return `${b.getAttribute('aria-pressed')} "${b.getAttribute('aria-label')}" bg ${getComputedStyle(b).backgroundColor}`; });
  // hover hold
  const sr = await p.evaluate(() => { const r = document.querySelector('.wv1-strip').getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; });
  await p.mouse.move(sr[0], sr[1]); await p.waitForTimeout(300); const h1 = await x(); await p.waitForTimeout(500); const h2 = await x();
  await p.mouse.move(sr[0], sr[1] + 600); await p.waitForTimeout(300); const h3 = await x(); await p.waitForTimeout(500); const h4 = await x();
  out.push(`V1 hover: held while over ${h1 === h2}, moving after leave ${h3 !== h4}; control ${await st()}`);
  // next: step time
  const t0 = Date.now(); await p.locator('#work .wv-btn[data-dir="1"]').click(); let last = await x(), settle = 0;
  for (let k = 0; k < 20; k++) { await p.waitForTimeout(50); const v = await x(); if (v === last && k > 2) { settle = Date.now() - t0; break; } last = v; }
  out.push(`V1 after Next: settled ~${settle}ms; control ${await st()}`);
}
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(F + '?v=work3'); await p.waitForTimeout(1200);
  const s = await p.evaluate(() => { const st = ScrollTrigger.getAll().find(t => t.trigger && t.trigger.classList && t.trigger.classList.contains('wv3-frame')); return [st.start, st.end]; });
  const lab = () => p.evaluate(() => document.querySelector('.wv3-l.is-on').dataset.l + ' courses laid ' + [...document.querySelectorAll('.wv3-slits path')].filter(x => +gsap.getProperty(x, 'scaleY') > 0.99).length);
  await p.evaluate(y => scrollTo(0, y - 10), s[0]); await p.waitForTimeout(2600); const a = await lab();
  await p.evaluate(y => scrollTo(0, y + 10), s[1]); await p.waitForTimeout(3200); const bb = await lab();
  out.push(`V3 at scrub start: ${a}; at scrub end: ${bb}`);
}
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(F + '?v=work2'); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('work').scrollIntoView()); await p.waitForTimeout(800);
  await p.locator('.wv2-item.wa').click(); await p.waitForTimeout(600);
  const o = await p.evaluate(() => ({ open: document.querySelector('.wv2').classList.contains('is-open'), cap: document.querySelector('.wv2-cap').textContent, focus: document.activeElement.className }));
  await p.keyboard.press('Escape'); await p.waitForTimeout(600);
  out.push(`V2 open: ${o.open} "${o.cap}" focus ${o.focus}; after Esc open ${await p.evaluate(() => document.querySelector('.wv2').classList.contains('is-open'))}, focus ${await p.evaluate(() => document.activeElement.className)}`);
}
out.push('errors ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
