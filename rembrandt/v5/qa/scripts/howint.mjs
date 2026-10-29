// How interactions: R25-R28 + R41 hover and press, the V2 story pager (5s dwell, pause, tabs, keys, offscreen rest)
// and the background reactions (Phase 4 evidence).
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const out = []; const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
const centre = sel => p.evaluate(sel => { const el = document.querySelector(sel); let r = el.getBoundingClientRect(); if (r.top < 60 || r.bottom > innerHeight - 60) { scrollBy(0, r.top - innerHeight / 2); r = el.getBoundingClientRect(); } return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
const cs = (sel, prop) => p.evaluate(([s, pr]) => getComputedStyle(document.querySelector(s))[pr], [sel, prop]);
const go = async (v, sel) => { await p.goto(FILE + '?v=' + v); await p.waitForTimeout(800); await p.evaluate(s => document.querySelector(s).scrollIntoView({ block: 'center' }), sel); await p.waitForTimeout(1200); };
const sel = () => p.evaluate(() => [...document.querySelectorAll('.hw2-tab')].findIndex(t => t.getAttribute('aria-selected') === 'true') + 1);
const vis = () => p.evaluate(() => [...document.querySelectorAll('.hw2-item')].map(i => (i.classList.contains('is-visible') ? 'V' : '-') + (i.inert ? 'i' : 'a')).join(' '));

await go('how1', '.hw1-link');
const [lx, ly] = await centre('.hw1-link'); await p.mouse.move(lx, ly, { steps: 5 }); await p.waitForTimeout(400);
out.push(`R25 hover: bracket opacity ${await cs('.hw1-hg', 'opacity')}, transform ${await cs('.hw1-hg', 'transform')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R25 press: screw animation ${await cs('.hw1-hg-k', 'animationName')}`); await p.mouse.up();

await go('how2', '.hw2-story'); await p.mouse.move(5, 5);
out.push(`V2 start: tab ${await sel()} selected; panels ${await vis()}; bar ${await cs('.hw2-tab:nth-child(1) .hw2-prog', 'animationName')} ${await cs('.hw2-tab:nth-child(1) .hw2-prog', 'animationPlayState')}`);
await p.waitForTimeout(5300); out.push(`  after 5.3s: tab ${await sel()}; panels ${await vis()}; bar 1 done ${await p.evaluate(() => document.querySelector('.hw2-tab:nth-child(1) .hw2-prog').classList.contains('is-done'))}`);
out.push(`  scene 2 plays: tape ${await cs('#hw2-p2 .s2-tape', 'animationName')}, dims ${await cs('#hw2-p2 .s2-dim1', 'animationName')}`);
const [px, py] = await centre('.hw2-pause'); await p.mouse.move(px, py, { steps: 4 }); await p.waitForTimeout(300);
out.push(`R27 hover: shingle tabs opacity ${await cs('.hw2-tb', 'opacity')}, bars opacity ${await cs('.hw2-pz', 'opacity')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R27 press: flip ${await cs('.hw2-tb1', 'animationName')}`); await p.mouse.up(); await p.waitForTimeout(100);
const t0 = await sel(); out.push(`  paused: aria-pressed ${await p.evaluate(() => document.querySelector('.hw2-pause').getAttribute('aria-pressed'))}, bar ${await p.evaluate(() => getComputedStyle(document.querySelector('.hw2-tab[aria-selected="true"] .hw2-prog')).animationPlayState)}`);
await p.mouse.move(5, 5); await p.waitForTimeout(5600); out.push(`  held 5.6s: tab ${t0} -> ${await sel()}`);
const [tx, ty] = await centre('.hw2-tab:nth-child(3)'); await p.mouse.move(tx, ty, { steps: 4 }); await p.waitForTimeout(400);
out.push(`R26 hover: flashing opacity ${await cs('.hw2-tab:nth-child(3) .hw2-fl', 'opacity')}, bent leg ${await cs('.hw2-tab:nth-child(3) .hw2-fl-v', 'transform')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R26 press: snap ${await cs('.hw2-tab:nth-child(3) .hw2-fl-v', 'animationName')}`); await p.mouse.up(); await p.waitForTimeout(500);
out.push(`  click tab 3: tab ${await sel()}; panels ${await vis()}; scene 3 roof ${await cs('#hw2-p3 .s3-roof', 'animationName')}, puffs ${await cs('#hw2-p3 .s3-puff', 'animationName')}`);
await p.keyboard.press('ArrowRight'); await p.waitForTimeout(450); out.push(`  ArrowRight from tab 3: tab ${await sel()} (wraps), focus on ${await p.evaluate(() => document.activeElement.id)}; scene 1 handset ${await cs('#hw2-p1 .s1-hset', 'animationName')}`);
await p.keyboard.press('End'); await p.waitForTimeout(200); out.push(`  End: tab ${await sel()}`);
// resume, then keyboard focus holds the dwell
await p.evaluate(() => document.querySelector('.hw2-pause').click()); await p.keyboard.press('Home'); await p.waitForTimeout(150);
out.push(`  keyboard focus on a tab holds: bar ${await p.evaluate(() => getComputedStyle(document.querySelector('.hw2-tab[aria-selected="true"] .hw2-prog')).animationPlayState)}`);
await p.evaluate(() => document.activeElement.blur()); await p.waitForTimeout(150);
out.push(`  focus gone: bar ${await p.evaluate(() => getComputedStyle(document.querySelector('.hw2-tab[aria-selected="true"] .hw2-prog')).animationPlayState)}`);
const [cx, cy] = await centre('.hw2-call'); await p.mouse.move(cx, cy, { steps: 4 }); await p.waitForTimeout(450);
out.push(`R41 hover: cord opacity ${await cs('.hw2-cord', 'opacity')}, transform ${await cs('.hw2-cord', 'transform')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R41 press: recoil ${await cs('.hw2-cord', 'animationName')}; tel ${await p.evaluate(() => document.querySelector('.hw2-call').getAttribute('href'))}`); await p.mouse.up();
const n0 = await p.evaluate(() => getComputedStyle(document.querySelector('#hw2-p1 .hw2-near')).transform); await p.mouse.move(cx - 500, cy - 300, { steps: 6 }); await p.waitForTimeout(900);
out.push(`bg V2: scene layers on pointer depth: near ${n0} -> ${await p.evaluate(() => getComputedStyle(document.querySelector('#hw2-p1 .hw2-near')).transform)}`);
await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(600);
out.push(`  off screen: bar ${await p.evaluate(() => getComputedStyle(document.querySelector('.hw2-tab[aria-selected="true"] .hw2-prog')).animationPlayState)}`);

await go('how3', '.hw3-rows'); await p.waitForTimeout(400);
const [ax, ay] = await centre('.hw3-row:nth-of-type(2) .hw3-line'); await p.mouse.move(ax, ay, { steps: 5 }); await p.waitForTimeout(400);
out.push(`R28 hover (rule): segment ${await cs('.hw3-ico--rule .i-seg2', 'transform')}`);
await p.mouse.down(); await p.waitForTimeout(60); out.push(`R28 press (rule): ${await cs('.hw3-ico--rule .i-seg1', 'animationName')}`); await p.mouse.move(ax, ay - 200); await p.mouse.up(); // release off the link: no jump to #call
await p.mouse.move(300, 450, { steps: 4 }); await p.mouse.move(1300, 450, { steps: 8 }); await p.waitForTimeout(800);
out.push(`bg V3: rafter layer on pointer depth ${await p.evaluate(() => getComputedStyle(document.querySelector('.hw3-raft')).transform)}; overstroke on the hovered row ${await p.evaluate(() => getComputedStyle(document.querySelectorAll('.hw3-ro')[1]).strokeDasharray)}`);
out.push(`  chips: ${await p.evaluate(() => [...document.querySelectorAll('.hw3-chips li')].map(l => l.textContent).join(' | '))}`);
out.push('errors: ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
