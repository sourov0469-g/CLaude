import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'; const b = await chromium.launch(); const out = [], errs = [];
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); p.on('pageerror', e => errs.push(e.message));
await p.goto(F); await p.waitForTimeout(1200); await p.evaluate(() => document.getElementById('area').scrollIntoView()); await p.waitForTimeout(900);
const st = () => p.evaluate(() => { const r = document.querySelector('.tw3'); return `town ${r.classList.contains('has-town')} yes ${r.classList.contains('has-yes')} needle ${Math.round(gsap.getProperty(document.querySelector('.tw3-needle'), 'rotation'))}deg op ${getComputedStyle(document.querySelector('.tw3-needle')).opacity} tape ${getComputedStyle(document.querySelector('.tw3-tape')).opacity} "${document.querySelector('.tw3-ans-t').textContent}"`; });
out.push('rest: ' + await st());
await p.fill('#tw3-q', 'Bellbrook'); await p.waitForTimeout(700); out.push('typed Bellbrook: ' + await st());
await p.fill('#tw3-q', ''); await p.waitForTimeout(700); out.push('cleared (E1): ' + await st());
await p.type('#tw3-q', 'Cincinnati', { delay: 30 }); await p.waitForTimeout(700); out.push('miss: ' + await st());
await p.fill('#tw3-q', ''); await p.waitForTimeout(400);
// E2: type fast, check the answer matches the final value at settle
await p.type('#tw3-q', 'Mason', { delay: 10 }); await p.waitForTimeout(260); out.push('fast type Mason (260ms): ' + await st());
out.push('chip size ' + await p.evaluate(() => { const r = document.querySelector('.tw3-chips button').getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}`; }) + '; rose ' + await p.evaluate(() => Math.round(document.querySelector('.tw3-rose').getBoundingClientRect().width)));
await p.screenshot({ path: '../r3/look/a3yes.jpg', type: 'jpeg', quality: 55 });
out.push('errors ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
