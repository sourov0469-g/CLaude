import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const out = [];
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
const centre = async sel => p.evaluate(sel => { const r = document.querySelector(sel).getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; }, sel);
// H1: after the load sweep the wall reads SINCE 1995 (yellow); a press on the wall flips it back to FAMILY ROOFERS (cream)
await p.goto(FILE + '?v=hero1'); await p.waitForTimeout(4600);
const tone = () => p.evaluate(() => { const c = document.querySelector('.hx1-cv'), x = c.getContext('2d'), d = x.getImageData(0, 0, c.width, c.height).data; let r = 0, g = 0, bl = 0, n = 0;
  for (let i = 0; i < d.length; i += 4 * 97) { if (d[i] + d[i + 1] + d[i + 2] > 420) { r += d[i]; g += d[i + 1]; bl += d[i + 2]; n++; } } return n ? Math.round(bl / n) : -1; }); // blue channel of the light (letter) pixels
const t1 = await tone();
await p.mouse.click(300, 500); await p.waitForTimeout(4200);
const t2 = await tone();
out.push(`H1 wall: letter blue channel after load sweep ${t1} (yellow ≈ low), after a press ${t2} (cream ≈ high) -> ${t1 < 120 && t2 > 160 ? 'FLIPPED' : 'NO FLIP'}`);
// R07 hover/press
const hov = async (sel, el, prop = 'opacity') => { const [x, y] = await centre(sel); await p.mouse.move(x, y, { steps: 6 }); await p.waitForTimeout(350); return p.evaluate(([el, prop]) => getComputedStyle(document.querySelector(el))[prop], [el, prop]); };
const press = async sel => { const [x, y] = await centre(sel); await p.mouse.move(x, y); await p.evaluate(sel => document.querySelector(sel).dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerType: 'mouse' })), sel); await p.waitForTimeout(80); return p.evaluate(sel => document.querySelector(sel).classList.contains('is-press'), sel); };
out.push(`R07 H1 Call: hover tab opacity ${await hov('.hx1-call', '.hx1-tab-flap')}; press is-press ${await press('.hx1-call')}`);
// H2: the pointer over a letter raises its weight; R09 label weight near the button; R10 caret dash on hover
await p.goto(FILE + '?v=hero2'); await p.waitForTimeout(1500);
const [lx, ly] = await centre('.hx2-l:nth-child(2) .hx2-ch:nth-child(3)'); await p.mouse.move(lx, ly, { steps: 8 }); await p.waitForTimeout(700);
const wnear = await p.evaluate(() => document.querySelector('.hx2-l:nth-child(2) .hx2-ch:nth-child(3)').style.fontVariationSettings);
const wfar = await p.evaluate(() => document.querySelector('.hx2-l:nth-child(1) .hx2-ch:nth-child(1)').style.fontVariationSettings);
out.push(`H2 letters: under the pointer ${wnear}; far away ${wfar}`);
const [cx, cy] = await centre('.hx2-call'); await p.mouse.move(cx, cy + 60, { steps: 6 }); await p.waitForTimeout(600);
out.push(`R09 H2 Call: label weight near ${await p.evaluate(() => document.querySelector('.hx2-call-t').style.fontVariationSettings)}; press is-press ${await press('.hx2-call')}`);
out.push(`R10 H2 estimate: hover caret dashoffset ${await hov('.hx2-est', '.hx2-pitch path', 'strokeDashoffset')}; press is-press ${await press('.hx2-est')}`);
// H3: the word rotates; pause holds it; play resumes; R11/R12/R13
await p.goto(FILE + '?v=hero3'); await p.waitForTimeout(800);
const word = () => p.evaluate(() => document.querySelector('.hx3-word').textContent.replace(/ /g, ' '));
const w0 = await word(); await p.waitForTimeout(4200); const w1 = await word();
await p.click('.hx3-pause'); const pressed = await p.evaluate(() => document.querySelector('.hx3-pause').getAttribute('aria-pressed'));
await p.mouse.move(10, 10); await p.waitForTimeout(400); const w2 = await word(); await p.waitForTimeout(5200); const w3 = await word();
await p.click('.hx3-pause'); await p.mouse.move(10, 10); await p.waitForTimeout(5400); const w4 = await word();
out.push(`H3 rotator: ${w0} -> ${w1} (rotates); pause aria-pressed=${pressed}; held ${w2} -> ${w3} (${w2 === w3 ? 'HELD' : 'MOVED'}); after play -> ${w4} (${w4 !== w3 ? 'RESUMED' : 'STUCK'})`);
out.push(`R11 H3 Call: hover sign opacity ${await hov('.hx3-call', '.hx3-sign-g')}; press is-press ${await press('.hx3-call')}`);
out.push(`R12 H3 towns link: hover road clip ${await hov('.hx3-towns', '.hx3-road-l', 'clipPath')}; press is-press ${await press('.hx3-towns')}`);
out.push(`R13 H3 pause: hover nails opacity ${await hov('.hx3-pause', '.hx3-nails')}; press is-press ${await press('.hx3-pause')}`);
out.push('errors: ' + (errs.length ? errs.join(' | ') : 0));
console.log(out.join('\n')); await b.close();
