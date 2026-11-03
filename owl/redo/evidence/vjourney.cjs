// virtual-scroll journey: node vjourney.cjs <name> <url> <ticks> <deltaPerTick> <waitMs>
const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const [name, url, N = '20', D = '400', W = '900'] = process.argv.slice(2); const b = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } }); const p = await ctx.newPage(); p.setDefaultTimeout(90000); const c = await ctx.newCDPSession(p); fs.mkdirSync(name + '/v', { recursive: true });
const shot = async (f) => { const { data } = await c.send('Page.captureScreenshot', { format: 'jpeg', quality: 45 }); fs.writeFileSync(f, Buffer.from(data, 'base64')); };
try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) {} await p.waitForTimeout(9000); await p.mouse.move(720, 500);
for (let i = 0; i < +N; i++) { await p.mouse.wheel(0, +D); await p.waitForTimeout(+W); await shot(`${name}/v/v${String(i).padStart(2, '0')}.jpg`);
  const txt = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3,p,a,span,div')].filter(e => { if (e.children.length) return false; const r = e.getBoundingClientRect(); if (!(r.width > 0 && r.bottom > 0 && r.top < innerHeight)) return false; let n = e; while (n && n !== document.body) { const s = getComputedStyle(n); if (s.opacity === '0' || s.visibility === 'hidden' || s.display === 'none') return false; n = n.parentElement; } return e.innerText.trim().length > 3; }).map(e => e.innerText.trim().replace(/\s+/g, ' ').slice(0, 40)).slice(0, 6).join(' | '));
  console.log(name, 'v' + i, txt.slice(0, 220)); }
await b.close(); })().catch(e => console.log('ERR', e.message.slice(0, 150)));
