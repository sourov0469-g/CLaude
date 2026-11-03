const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); fs.mkdirSync('igloo/j', { recursive: true });
await p.goto('https://www.igloo.inc', { waitUntil: 'domcontentloaded', timeout: 60000 }); await p.waitForTimeout(12000);
const diff = (A, B) => { let n = 0, t = 0; for (let i = 0; i < Math.min(A.length, B.length); i += 3000) { t++; if (Math.abs(A[i] - B[i]) > 6) n++; } return +(n / t * 100).toFixed(1); };
await p.mouse.move(720, 450); await p.waitForTimeout(1500);
const i0 = await p.screenshot(); await p.waitForTimeout(1000); const i1 = await p.screenshot();
console.log('idle 1s, no input: changed %', diff(i0, i1));
await p.mouse.move(150, 450, { steps: 20 }); await p.waitForTimeout(1200); const L = await p.screenshot(); await p.screenshot({ path: 'igloo/j/m-left.jpg', type: 'jpeg', quality: 60 });
await p.mouse.move(1290, 450, { steps: 20 }); await p.waitForTimeout(1200); const R = await p.screenshot(); await p.screenshot({ path: 'igloo/j/m-right.jpg', type: 'jpeg', quality: 60 });
await p.mouse.move(720, 120, { steps: 20 }); await p.waitForTimeout(1200); await p.screenshot({ path: 'igloo/j/m-top.jpg', type: 'jpeg', quality: 60 });
console.log('mouse left vs right: changed %', diff(L, R));
await p.mouse.move(720, 470, { steps: 20 }); await p.waitForTimeout(1500); await p.screenshot({ path: 'igloo/j/m-on-igloo.jpg', type: 'jpeg', quality: 60 });
const cur = await p.evaluate(() => getComputedStyle(document.elementFromPoint(720, 470)).cursor); console.log('cursor over igloo:', cur);
await p.mouse.down(); await p.waitForTimeout(1200); await p.screenshot({ path: 'igloo/j/m-press.jpg', type: 'jpeg', quality: 60 }); await p.mouse.up(); await p.waitForTimeout(800);
// wheel journey: small ticks, frame each 2 ticks, record visible text
for (let i = 0; i < 44; i++) { await p.mouse.wheel(0, 240); await p.waitForTimeout(260); if (i % 2 === 1) { await p.screenshot({ path: `igloo/j/w${String(i).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 50 });
  const txt = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,p,span,a')].filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.top >= 0 && r.top < innerHeight && s.opacity !== '0' && s.visibility !== 'hidden' && e.children.length === 0 && e.innerText.trim().length > 2; }).map(e => e.innerText.trim().slice(0, 50)).slice(0, 8).join(' | '));
  console.log('w' + i, txt.slice(0, 260)); } }
await b.close(); })().catch(e => console.log('ERR', e.message.slice(0, 200)));
