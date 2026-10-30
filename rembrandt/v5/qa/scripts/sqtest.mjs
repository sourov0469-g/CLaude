// Phase 4 end-to-end: drag the ridge, move the sliders, check the count against the geometry, keyboard path, screenshot
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const b = await chromium.launch(); const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
await p.goto('file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'); await p.waitForTimeout(1500);
await p.evaluate(() => document.querySelector('.sq').scrollIntoView({ block: 'center' })); await p.waitForTimeout(900);
const read = () => p.evaluate(() => ({ n: document.querySelector('.sq-out b').textContent, pit: document.querySelector('.sq-pit').value, len: document.querySelector('.sq-len').value, wid: document.querySelector('.sq-wid').value, d: document.querySelector('.sq-roof').getAttribute('d') }));
const exp = (L, W, R) => ((L * W * Math.sqrt(1 + (R / 12) ** 2)) / 100).toFixed(1);
const out = []; let r = await read(); out.push(`start ${JSON.stringify(r)} expect ${exp(r.len, r.wid, r.pit)}`);
const g = await p.locator('.sq-grip-o').boundingBox();
await p.mouse.move(g.x + g.width / 2, g.y + g.height / 2); await p.mouse.down(); await p.mouse.move(g.x + g.width / 2, g.y - 60, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(200);
r = await read(); out.push(`drag up -> pitch ${r.pit}, ${r.n} squares (expect ${exp(r.len, r.wid, r.pit)}), roof ${r.d}`);
await p.locator('.sq-len').fill('80'); await p.locator('.sq-wid').fill('40'); await p.waitForTimeout(150);
r = await read(); out.push(`80x40 -> ${r.n} (expect ${exp(80, 40, r.pit)})`);
await p.locator('.sq-pit').focus(); for (let i = 0; i < 20; i++) await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(150);
r = await read(); out.push(`keyboard to min pitch ${r.pit} -> ${r.n} (expect ${exp(80, 40, 3)})`);
await p.screenshot({ path: 'sq.jpg', type: 'jpeg', quality: 70 });
console.log(out.join('\n') + `\nerrors ${errs.length ? errs.join(' | ') : 0}`); await b.close();
