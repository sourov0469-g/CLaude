// Family interactions: R22-R24 hover and press, and each version's background reaction (Phase 4 evidence).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const out = []; const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
const centre = sel => p.evaluate(sel => { const el = document.querySelector(sel); let r = el.getBoundingClientRect(); if (r.top < 60 || r.bottom > innerHeight - 60) { scrollBy(0, r.top - innerHeight / 2); r = el.getBoundingClientRect(); } return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
const cs = (sel, prop) => p.evaluate(([s, pr]) => getComputedStyle(document.querySelector(s))[pr], [sel, prop]);
const go = async (v, sel) => { await p.goto(FILE + '?v=' + v); await p.waitForTimeout(800); await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(1200); };

await go('family1', '.fm1-name');
const spot0 = await p.evaluate(() => document.querySelector('.fm1-spot').getAttribute('cx'));
const [sx, sy] = await centre('.fm1-name'); await p.mouse.move(sx + 200, sy, { steps: 8 }); await p.waitForTimeout(900);
out.push(`bg V1: spotlight follows the pointer (cx ${spot0} -> ${await p.evaluate(() => document.querySelector('.fm1-spot').getAttribute('cx'))}), photo x ${await p.evaluate(() => document.querySelector('.fm1-img').getAttribute('x'))}`);
const [cx, cy] = await centre('.fm1-call'); await p.mouse.move(cx, cy, { steps: 5 }); await p.waitForTimeout(300);
out.push(`R22 hover: attic window fill ${await cs('.fm1-ico-win', 'fill')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R22 press: door animation ${await cs('.fm1-ico-door', 'animationName')}`); await p.mouse.up();
out.push(`  tel ${await p.evaluate(() => document.querySelector('.fm1-call').getAttribute('href'))}`);

await go('family2', '.fm2-say');
const d0 = await p.evaluate(() => getComputedStyle(document.querySelector('.fm2-bg path')).transform);
const [bx, by] = await centre('.fm2-say'); await p.mouse.move(bx - 400, by + 200, { steps: 8 }); await p.waitForTimeout(1000);
out.push(`bg V2: roofline pointer depth ${d0} -> ${await p.evaluate(() => getComputedStyle(document.querySelector('.fm2-bg path')).transform)}`);
out.push(`  words revealed at centre: ${await p.evaluate(() => [...document.querySelectorAll('.fm2-say .w')].filter(w => +w.style.opacity > 0.9).length + '/' + document.querySelectorAll('.fm2-say .w').length)}`);
const [hx, hy] = await centre('.fm2-call'); await p.mouse.move(hx, hy, { steps: 5 }); await p.waitForTimeout(120);
out.push(`R23 hover: handset animation ${await cs('.fm2-hs-b', 'animationName')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R23 press: ring animation ${await cs('.fm2-ring', 'animationName')}`); await p.mouse.up();

await go('family3', '.fm3-truss'); await p.waitForTimeout(600);
const [tx, ty] = await centre('.fm3-pill[data-m="wade"]'); await p.mouse.move(tx, ty, { steps: 5 }); await p.waitForTimeout(350);
out.push(`R24 hover: member stroke ${await cs('.m[data-m="wade"]', 'stroke')}, leader filter ${await cs('.fm3-leads path[data-m="wade"]', 'filter')}`);
await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(80);
out.push(`R24 press: aria-pressed ${await p.evaluate(() => document.querySelector('.fm3-pill[data-m="wade"]').getAttribute('aria-pressed'))}, tack animation ${await cs('.fm3-pill[data-m="wade"] .fm3-tack', 'animationName')}`);
await p.waitForTimeout(500); out.push(`  tack opacity ${await cs('.fm3-pill[data-m="wade"] .fm3-tack', 'opacity')}; caption "${await p.evaluate(() => document.querySelector('.fm3-say').textContent)}"`);
out.push(`bg V3: deck window on (${await p.evaluate(() => document.querySelector('.fm3').classList.contains('is-ptr'))}), at ${await p.evaluate(() => document.querySelector('.fm3-deck--hi').style.transform)}`);
out.push('errors: ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
