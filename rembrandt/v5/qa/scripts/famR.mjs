import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'; const b = await chromium.launch(); const out = [], errs = [];
const page = async q => { const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.on('pageerror', e => errs.push(e.message)); await p.goto(F + '?v=' + q); await p.waitForTimeout(1200); return p; };
{ const p = await page('family1'); const t = await p.evaluate(() => document.querySelector('.fm1-facts').getBoundingClientRect().top + scrollY);
  await p.evaluate(y => scrollTo(0, y - 760), t); await p.waitForTimeout(500); const a = await p.evaluate(() => getComputedStyle(document.querySelector('.fm1-facts')).getPropertyValue('--rail'));
  await p.evaluate(y => scrollTo(0, y - 300), t); await p.waitForTimeout(500); const bb = await p.evaluate(() => getComputedStyle(document.querySelector('.fm1-facts')).getPropertyValue('--rail'));
  const plate = await p.evaluate(() => { const svg = document.querySelector('.fm1-name'), pl = document.querySelector('.fm1-plate').getBBox(), tx = document.querySelector('.fm1-rim').getBBox(); return `plate y ${pl.y} vs letters top ${Math.round(tx.y + tx.height * 0.17)} (bbox top ${Math.round(tx.y)})`; });
  out.push(`V1 rail ${a.trim()} -> ${bb.trim()}; ${plate}; web struts ${await p.evaluate(() => document.querySelectorAll('.fm1-web').length)}; photo h ${await p.evaluate(() => Math.round(document.querySelector('.fm1-photo').getBoundingClientRect().height))} (52svh = 468)`); }
{ const p = await page('family3');
  out.push(`V3 pre-selected ${await p.evaluate(() => [...document.querySelectorAll('.fm3-pill')].filter(b => b.getAttribute('aria-pressed') === 'true').map(b => b.dataset.m).join(','))}; say "${await p.evaluate(() => document.querySelector('.fm3-say').textContent)}"; crop z ${await p.evaluate(() => document.querySelector('.fm3-crop').style.getPropertyValue('--z'))}; pills ${await p.evaluate(() => document.querySelectorAll('.fm3-pill').length)}`);
  const pr = await p.evaluate(() => { const a = document.querySelector('.fm3-pill[data-m="crew"]').getBoundingClientRect(), b = document.querySelector('.fm3-foot').getBoundingClientRect(); return Math.round(b.top - a.bottom); });
  out.push(`V3 gap between the last pill and the say row: ${pr}px (must be > 0)`); }
{ const p = await page('family4'); await p.evaluate(() => document.getElementById('family').scrollIntoView()); await p.waitForTimeout(800);
  await p.locator('.fm4-card').first().click(); await p.waitForTimeout(450);
  out.push(`V4 after click: pressed ${await p.evaluate(() => document.querySelector('.fm4-card').getAttribute('aria-pressed'))}, transform ${await p.evaluate(() => getComputedStyle(document.querySelector('.fm4-card')).transform.slice(0, 40))}`); }
{ const p = await page('family2'); const t = await p.evaluate(() => document.querySelector('.fm2-say').getBoundingClientRect().top + scrollY);
  await p.evaluate(y => scrollTo(0, y - 600), t); await p.waitForTimeout(1800); const o1 = await p.evaluate(() => [...document.querySelectorAll('.fm2-say .w')].map(w => +getComputedStyle(w).opacity).reduce((a, b) => Math.min(a, b), 1));
  await p.evaluate(y => scrollTo(0, y - 1400), t); await p.waitForTimeout(600); const o2 = await p.evaluate(() => [...document.querySelectorAll('.fm2-say .w')].map(w => +getComputedStyle(w).opacity).reduce((a, b) => Math.min(a, b), 1));
  out.push(`V2 words min opacity after the reveal ${o1}, after scrolling back up ${o2} (once: stays 1); h2 is the statement ${await p.evaluate(() => document.querySelector('.fm2 h2').className)}`); }
out.push('errors ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
