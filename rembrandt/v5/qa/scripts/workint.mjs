// Work interactions: R16-R21 hover and press, the V1 tape glow and the V3 starter-strip nails (Phase 3 evidence).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const out = []; const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
const centre = sel => p.evaluate(sel => { const el = document.querySelector(sel); let r = el.getBoundingClientRect(); if (r.top < 60 || r.bottom > innerHeight - 60) { scrollBy(0, r.top - innerHeight / 2); r = el.getBoundingClientRect(); } return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
const cs = (sel, prop) => p.evaluate(([s, pr]) => getComputedStyle(document.querySelector(s))[pr], [sel, prop]);
const go = async (v, sel) => { await p.goto(FILE + '?v=' + v); await p.waitForTimeout(800); await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(1200); };

await go('work1', '.wv1-foot');
const [tx, ty] = await centre('.wv1-strip .wv1-tile.is-on'); await p.mouse.move(tx, ty, { steps: 6 }); await p.waitForTimeout(450);
out.push(`R16 tile hover: nail opacity ${await p.evaluate(() => { const c = document.querySelector('.wv1-tile:hover .wv1-nails circle'); return c ? getComputedStyle(c).opacity : 'no tile hovered'; })}`);
const capBefore = await p.evaluate(() => document.querySelector('.wv1-cap-t').textContent);
const second = await p.evaluate(() => { const on = document.querySelector('.wv1-tile.is-on'), all = [...document.querySelectorAll('.wv1-tile')]; const t = all[(all.indexOf(on) + 1) % all.length], r = t.getBoundingClientRect(); return [Math.min(innerWidth - 20, Math.max(20, r.left + r.width / 2)), r.top + r.height / 2]; });
await p.mouse.click(second[0], second[1]); await p.waitForTimeout(60);
out.push(`R16 tile press: hook snap is-step ${await p.evaluate(() => document.querySelector('.wv1').classList.contains('is-step'))}; hook animation ${await cs('.wv1-hook', 'animationName')}`);
await p.waitForTimeout(1000); out.push(`  tile click centred a new job: caption "${capBefore}" -> "${await p.evaluate(() => document.querySelector('.wv1-cap-t').textContent)}"`);
const [ax, ay] = await centre('.wv-btn[data-dir="1"]'); await p.mouse.move(ax, ay, { steps: 4 }); await p.waitForTimeout(350);
out.push(`R17 arrow hover: arrow opacity ${await cs('.wv-btn[data-dir="1"] .i-arw', 'opacity')}, square opacity ${await cs('.wv-btn[data-dir="1"] .i-sq', 'opacity')}`);
await p.mouse.down(); await p.waitForTimeout(40); out.push(`R17 arrow press: is-press ${await p.evaluate(() => document.querySelector('.wv-btn[data-dir="1"]').classList.contains('is-press'))}, animation ${await cs('.wv-btn[data-dir="1"]', 'animationName')}`); await p.mouse.up();
// unpause first if a click held it
await p.evaluate(() => { const b = document.querySelector('.wv1-pause'); if (b.getAttribute('aria-pressed') === 'true') b.click(); });
const [px, py] = await centre('.wv1-pause'); await p.mouse.move(px, py, { steps: 4 }); await p.waitForTimeout(400);
const bub1 = await p.evaluate(() => getComputedStyle(document.querySelector('.wv1-pause .i-bub')).translate); await p.waitForTimeout(500);
const bub2 = await p.evaluate(() => getComputedStyle(document.querySelector('.wv1-pause .i-bub')).translate);
out.push(`R18 pause hover: bars transform ${await cs('.wv1-pause .i-pause', 'transform')}; level opacity ${await cs('.wv1-pause .i-level', 'opacity')}; bubble animation ${await cs('.wv1-pause .i-bub', 'animationName')} (translate ${bub1} then ${bub2})`);
await p.mouse.down(); await p.mouse.up(); await p.waitForTimeout(400);
out.push(`R18 pause press: aria-pressed ${await p.evaluate(() => document.querySelector('.wv1-pause').getAttribute('aria-pressed'))}; bubble animation ${await cs('.wv1-pause .i-bub', 'animationName')}, translate ${await cs('.wv1-pause .i-bub', 'translate')}`);
const [gx0, gy0] = await centre('.wv1-tape'); await p.mouse.move(gx0 - 300, gy0, { steps: 6 }); await p.waitForTimeout(500);
const g1 = await p.evaluate(() => { const g = document.querySelector('.wv1-glow-m'); return [getComputedStyle(g).opacity, Math.round(gsap.getProperty(g, 'x'))]; });
await p.mouse.move(gx0 + 300, gy0 + 400, { steps: 6 }); await p.waitForTimeout(500);
const g2 = await p.evaluate(() => { const g = document.querySelector('.wv1-glow-m'); return [getComputedStyle(g).opacity, Math.round(gsap.getProperty(g, 'x'))]; });
out.push(`bg tape glow: on the tape opacity ${g1[0]} at x ${g1[1]}; 400px below and 600px right opacity ${g2[0]} at x ${g2[1]}`);

await go('work2', '.wv2-grid');
const [ix, iy] = await centre('.wv2-item'); await p.mouse.move(ix, iy, { steps: 5 }); await p.waitForTimeout(500);
out.push(`R19 tile hover: gable cap d ${(await p.evaluate(() => document.querySelector('.wv2-item .wv2-gc path').getAttribute('d'))).slice(0, 30)}`);
await p.mouse.click(ix, iy); await p.waitForTimeout(1200);
out.push(`R19 tile press: open ${await p.evaluate(() => document.querySelector('.wv2').classList.contains('is-open'))}; photo in full ${await p.evaluate(() => !!document.querySelector('.wv2-full img'))}`);
const [cx, cy] = await centre('.wv2-close'); await p.mouse.move(cx, cy, { steps: 4 }); await p.waitForTimeout(350);
out.push(`R20 close hover: X opacity ${await cs('.wv2-close .i-x', 'opacity')}, rafters opacity ${await cs('.wv2-close .i-raf', 'opacity')}`);
await p.mouse.down(); await p.waitForTimeout(40); out.push(`R20 close press: rafters animation ${await cs('.wv2-close .i-raf', 'animationName')}`); await p.mouse.up(); await p.waitForTimeout(1200);
out.push(`  closed again ${await p.evaluate(() => !document.querySelector('.wv2').classList.contains('is-open'))}`);
const hip0 = await p.evaluate(() => getComputedStyle(document.querySelector('.wv2-hip')).transform); await p.mouse.move(100, 120, { steps: 5 }); await p.waitForTimeout(600);
out.push(`bg hip pattern on pointer depth: ${hip0} -> ${await p.evaluate(() => getComputedStyle(document.querySelector('.wv2-hip')).transform)}`);

await go('work3', '.wv3-drip'); await p.evaluate(() => scrollBy(0, document.querySelector('.wv3-drip').getBoundingClientRect().top - innerHeight / 2)); await p.waitForTimeout(400);
const nails = await p.evaluate(() => document.querySelectorAll('.wv3-nailrow .wv3-nail').length);
const [nx, ny] = await p.evaluate(() => { const n = document.querySelectorAll('.wv3-nail')[5].getBoundingClientRect(); return [n.left + 5, n.top + 5]; });
await p.mouse.move(nx, ny - 20, { steps: 6 }); await p.waitForTimeout(500);
const lift = await p.evaluate(() => [...document.querySelectorAll('.wv3-nail')].map(n => Math.round(gsap.getProperty(n, 'y') * 10) / 10));
out.push(`bg starter nails: ${nails} nails; y under the pointer (nail 6) ${lift[5]}, far nail ${lift[lift.length - 1]}`);
const [bx, by] = await centre('.wv3-l[data-l="after"]'); await p.mouse.move(bx, by, { steps: 4 }); await p.waitForTimeout(350);
out.push(`R21 after hover: outline opacity ${await cs('.wv3-hl', 'opacity')}`);
await p.mouse.click(bx, by); await p.waitForTimeout(80); out.push(`R21 after press: flash ${await p.evaluate(() => document.querySelector('.wv3-hl').classList.contains('is-flash'))}`); await p.waitForTimeout(600);
out.push(`  every course laid: ${await p.evaluate(() => [...document.querySelectorAll('.wv3-slits path')].every(x => Math.abs(gsap.getProperty(x, 'scaleY') - 1) < 0.01))}; After label on ${await p.evaluate(() => document.querySelector('.wv3-l[data-l="after"]').classList.contains('is-on'))}`);
out.push('errors: ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
