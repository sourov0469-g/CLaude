// Call interactions: R34-R40 hover and press, the V2 morph without MorphSVG (mid-tween sample), the V1 drop lean and
// hours line (Phase 4 evidence).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const out = []; const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
const centre = sel => p.evaluate(sel => { const el = document.querySelector(sel); let r = el.getBoundingClientRect(); if (r.top < 60 || r.bottom > innerHeight - 60) { scrollBy(0, r.top - innerHeight / 2); r = el.getBoundingClientRect(); } return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
const cs = (sel, prop) => p.evaluate(([s, pr]) => getComputedStyle(document.querySelector(s))[pr], [sel, prop]);
const go = async (v, sel) => { await p.goto(FILE + '?v=' + v); await p.waitForTimeout(800); await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(1200); };
const pressOff = async (x, y) => { await p.mouse.down(); await p.waitForTimeout(60); const r = 1; await p.mouse.move(x, y - 260); await p.mouse.up(); return r; }; // release off a link: no navigation

await go('call1', '.cl1-act');
out.push(`V1 hours line: "${await p.evaluate(() => document.querySelector('.cl1-live').textContent)}"`);
const [ax, ay] = await centre('.cl1-call'); await p.mouse.move(ax + 500, ay, { steps: 6 }); await p.waitForTimeout(1000);
const leanR = await p.evaluate(() => gsap.getProperty(document.querySelector('.cl1-drops'), 'rotation').toFixed(1)); await p.mouse.move(20, ay, { steps: 8 }); await p.waitForTimeout(1000);
out.push(`bg V1: drop leans ${leanR} deg (pointer right), ${await p.evaluate(() => gsap.getProperty(document.querySelector('.cl1-drops'), 'rotation').toFixed(1))} deg (pointer left)`);
const [cx, cy] = await centre('.cl1-call'); await p.mouse.move(cx, cy, { steps: 5 }); await p.waitForTimeout(400);
out.push(`R34 hover: drop gathers opacity ${await cs('.cl1-cs .rx-h', 'opacity')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R34 press: splash ${await cs('.cl1-cs .rx-p', 'animationName')}`); await p.mouse.move(cx, cy - 260); await p.mouse.up();
const [dx, dy] = await centre('.cl1-addr'); await p.mouse.move(dx, dy, { steps: 5 }); await p.waitForTimeout(400);
out.push(`R35 hover: pin ${await cs('.cl1-pin', 'transform')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R35 press: ${await cs('.cl1-pin', 'animationName')}`); await p.mouse.move(dx, dy - 260); await p.mouse.up();

await go('call2', '.cl2-stage');
const d0 = await p.evaluate(() => document.querySelector('.cl2-body').getAttribute('d'));
const [hx, hy] = await centre('.cl2-call'); await p.mouse.move(hx, hy, { steps: 5 }); await p.waitForTimeout(200);
out.push(`R36 hover: rings ring (ring opacity ${await p.evaluate(() => getComputedStyle(document.querySelector('.cl2-ripple')).opacity)})`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R36 press: handset ${await cs('.cl2-hs', 'animationName')}; tel ${await p.evaluate(() => document.querySelector('.cl2-call').getAttribute('href'))}`); await p.mouse.move(hx, hy - 300); await p.mouse.up();
const [tx, ty] = await centre('.cl2-tog'); await p.mouse.move(tx, ty, { steps: 4 }); await p.waitForTimeout(60);
out.push(`R37 hover: icon redraw ${await cs('.cl2-tog-i path', 'animationName')}`);
await p.mouse.click(tx, ty); await p.waitForTimeout(200);
const mid = await p.evaluate(() => document.querySelector('.cl2-body').getAttribute('d')); await p.waitForTimeout(700);
const d1 = await p.evaluate(() => document.querySelector('.cl2-body').getAttribute('d'));
const nums = s => (s.match(/-?\d+(\.\d+)?/g) || []).length;
out.push(`R37 press: open ${await p.evaluate(() => document.querySelector('.cl2').classList.contains('is-open'))}, expanded ${await p.evaluate(() => document.querySelector('.cl2-tog').getAttribute('aria-expanded'))}; card visible ${await p.evaluate(() => !document.querySelector('.cl2-card').hidden && getComputedStyle(document.querySelector('.cl2-card')).opacity)}`);
out.push(`  morph by string interpolation: numbers ${nums(d0)} -> ${nums(d1)}; mid-tween differs from both ends ${mid !== d0 && mid !== d1}; ends at the house (apex 300,24: ${d1.startsWith('M300.0,24.0')})`);
await p.mouse.click(tx, ty); await p.waitForTimeout(800);
out.push(`  closed: back to the circle ${await p.evaluate(d => document.querySelector('.cl2-body').getAttribute('d') === d, d0)}`);

await go('call3', '.cl3-band'); await p.waitForTimeout(500);
const [bx, by] = await centre('.cl3-band'); await p.mouse.move(bx, by, { steps: 5 }); await p.waitForTimeout(900);
out.push(`R38 band hover: seam light sweep ${await p.evaluate(() => getComputedStyle(document.querySelector('.cl3-band'), '::before').transform)}`);
const [kx, ky] = await centre('.cl3-call'); await p.mouse.move(kx, ky, { steps: 5 }); await p.waitForTimeout(350);
out.push(`R39 hover: chimney opacity ${await cs('.cl3-cs .rx-h', 'opacity')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R39 press: smoke ${await cs('.cl3-cs .rx-p', 'animationName')}`); await p.mouse.move(kx, ky - 260); await p.mouse.up();
const [qx, qy] = await centre('.cl3-pause'); await p.mouse.move(qx, qy, { steps: 4 }); await p.waitForTimeout(60);
out.push(`R40 hover: bars draw ${await cs('.cl3-pause .i-pause', 'animationName')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R40 press: icon bounce ${await cs('.cl3-pause svg', 'animationName')}`); await p.mouse.up(); await p.waitForTimeout(100);
out.push(`  paused ${await p.evaluate(() => document.querySelector('.cl3-pause').getAttribute('aria-pressed'))}`);
out.push('errors: ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
