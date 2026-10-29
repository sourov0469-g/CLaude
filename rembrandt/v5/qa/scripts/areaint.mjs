// Towns interactions: R29-R33 + R42 hover and press, the V3 form handler (Enter, not-found), and each version's
// background reaction (Phase 4 evidence).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const out = []; const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
const centre = sel => p.evaluate(sel => { const el = document.querySelector(sel); let r = el.getBoundingClientRect(); if (r.top < 60 || r.bottom > innerHeight - 60) { scrollBy(0, r.top - innerHeight / 2); r = el.getBoundingClientRect(); } return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
const cs = (sel, prop) => p.evaluate(([s, pr]) => getComputedStyle(document.querySelector(s))[pr], [sel, prop]);
const go = async (v, sel) => { await p.goto(FILE + '?v=' + v); await p.waitForTimeout(800); await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(1200); };

await go('area1', '.tw1-map');
const [mx, my] = await centre('.tw1-map'); await p.mouse.move(mx - 100, my, { steps: 3 }); await p.mouse.move(mx + 100, my + 50, { steps: 6 }); await p.waitForTimeout(150);
out.push(`bg V1: ripples alive under the pointer ${await p.evaluate(() => document.querySelectorAll('.tw1-ripples circle').length)}`);
const [lx, ly] = await centre('.tw1-list button[data-i="8"]'); await p.mouse.move(lx, ly, { steps: 4 }); await p.waitForTimeout(350);
out.push(`R29 hover (${await p.evaluate(() => document.querySelector('.tw1-list button[data-i="8"]').firstChild.textContent)}): marker gable ${await p.evaluate(() => document.querySelector('.mk[data-i="8"]').classList.contains('is-hover'))}, transform ${await cs('.mk[data-i="8"] .mk-h', 'transform')}`);
await p.mouse.click(lx, ly); await p.waitForTimeout(450);
out.push(`R29 press: line ${await p.evaluate(() => document.querySelector('.tw1-line').getAttribute('d'))} opacity ${await cs('.tw1-line', 'opacity')}; card "${await p.evaluate(() => document.querySelector('.tw1-card').textContent)}"; press pop ${await cs('.tw1-list button[data-i="8"]', 'animationName')}`);

await go('area2', '.tw2-cards');
const hip0 = await cs('.tw2-plan', 'transform'); const [cx, cy] = await centre('.tw2-card'); await p.mouse.move(cx, cy, { steps: 5 }); await p.waitForTimeout(800);
out.push(`R30 card hover: bar ${await p.evaluate(() => getComputedStyle(document.querySelector('.tw2-card:hover .bar')).transform)}`);
out.push(`bg V2: plan transform ${hip0} -> ${await cs('.tw2-plan', 'transform')}`);
const first0 = await p.evaluate(() => document.querySelector('.tw2-card .tw2-n').textContent);
const [sx, sy] = await centre('.tw2-sb[data-sort="mi"]'); await p.mouse.move(sx, sy, { steps: 4 }); await p.waitForTimeout(350);
out.push(`R31 sort hover: course translate ${await cs('.tw2-sb[data-sort="mi"] .tw2-sb-i path:nth-child(1)', 'translate')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R31 sort press: ${await cs('.tw2-sb[data-sort="mi"] .tw2-sb-i path', 'animationName')}`); await p.mouse.up(); await p.waitForTimeout(500);
out.push(`  sorted nearest first: first card ${first0} -> ${await p.evaluate(() => document.querySelector('.tw2-card .tw2-n').textContent)}, pressed ${await p.evaluate(() => document.querySelector('.tw2-sb[data-sort="mi"]').getAttribute('aria-pressed'))}`);

await go('area3', '.tw3-form');
await p.click('#tw3-q'); await p.waitForTimeout(400);
out.push(`R33 focus: tape blade ${await cs('.tw3-run', 'transform')}`);
await p.keyboard.type('Bellbrook'); await p.keyboard.press('Enter'); await p.waitForTimeout(60);
out.push(`R33 Enter: hook ${await cs('.tw3-bl-hook', 'animationName')}; answer immediately "${await p.evaluate(() => document.querySelector('.tw3-ans').textContent)}"`);
await p.waitForTimeout(700); out.push(`  needle ${await p.evaluate(() => Math.round(gsap.getProperty(document.querySelector('.tw3-needle'), 'rotation')))} deg; tape ${await p.evaluate(() => document.querySelector('.tw3-tape-b').getAttribute('width'))}; label "${await p.evaluate(() => document.querySelector('.tw3-tape-l').textContent)}"`);
await p.fill('#tw3-q', 'Cincinnati'); await p.keyboard.press('Enter'); await p.waitForTimeout(200);
out.push(`  not on the list: "${await p.evaluate(() => document.querySelector('.tw3-ans').textContent)}"; tel ${await p.evaluate(() => document.querySelector('.tw3-tel')?.getAttribute('href'))}`);
const [tx, ty] = await centre('.tw3-tel'); await p.mouse.move(tx, ty, { steps: 4 }); await p.waitForTimeout(600);
out.push(`R42 hover: vane opacity ${await cs('.tw3-wv-a', 'opacity')}, transform ${await cs('.tw3-wv-a', 'transform')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R42 press: ${await cs('.tw3-wv-a', 'animationName')}`); await p.mouse.move(tx, ty - 200); await p.mouse.up();
const [hx, hy] = await centre('.tw3-chips button[data-i="23"]'); await p.mouse.move(hx, hy, { steps: 4 }); await p.waitForTimeout(500);
out.push(`R32 chip hover (${await p.evaluate(() => document.querySelector('.tw3-chips button[data-i="23"]').textContent)}): needle previews ${await p.evaluate(() => Math.round(gsap.getProperty(document.querySelector('.tw3-needle'), 'rotation')))} deg`);
await p.mouse.click(hx, hy); await p.waitForTimeout(700);
out.push(`R32 chip press: pressed ${await p.evaluate(() => document.querySelector('.tw3-chips button[data-i="23"]').getAttribute('aria-pressed'))}; tape ${await p.evaluate(() => document.querySelector('.tw3-tape-b').getAttribute('width'))}; chip pop ${await cs('.tw3-chips button[data-i="23"]', 'animationName')}`);
out.push(`bg V3: weathervane ${await p.evaluate(() => document.querySelector('.tw3-arrow').style.transform)}, ridge depth ${await cs('.tw3-vane', 'transform')}`);
out.push('errors: ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
