// mobile pin probe: node mpin.cjs <name> <url> <steps>
const { chromium } = require('playwright'); const fs = require('fs');
(async () => { const [name, url, N = '40'] = process.argv.slice(2); const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1' });
const p = await ctx.newPage(); p.setDefaultTimeout(60000); const c = await ctx.newCDPSession(p); fs.mkdirSync(name + '/m', { recursive: true });
try { await p.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) {} await p.waitForTimeout(6000);
// tag sticky elements taller than half the viewport
const n = await p.evaluate(() => { let i = 0; for (const e of document.querySelectorAll('body *')) { const s = getComputedStyle(e); if (s.position === 'sticky' && e.getBoundingClientRect().height > innerHeight * 0.5) e.dataset.__pin = i++; } return i; });
const rows = []; const H = await p.evaluate(() => document.documentElement.scrollHeight); const step = Math.max(300, Math.round(H / +N));
for (let y = 0, k = 0; y < H && k < +N; y += step, k++) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(220);
  const st = await p.evaluate(() => [...document.querySelectorAll('[data-__pin]')].map(e => { const r = e.getBoundingClientRect(); return [+e.dataset.__pin, Math.round(r.top), Math.round(r.height)]; }));
  rows.push({ y, st }); if (k % 3 === 0) { const { data } = await c.send('Page.captureScreenshot', { format: 'jpeg', quality: 45 }); fs.writeFileSync(`${name}/m/m${String(k).padStart(2, '0')}.jpg`, Buffer.from(data, 'base64')); } }
// per pinned element: scroll range where top stays ~constant (pinned), and pin length
const pins = {}; rows.forEach(r => r.st.forEach(([i, top, h]) => { (pins[i] = pins[i] || []).push([r.y, top, h]); }));
const out = Object.entries(pins).map(([i, a]) => { const held = a.filter(([y, top]) => Math.abs(top - a.find(x => Math.abs(x[1]) < 400)?.[1] ?? 9999) < 3); const tops = [...new Set(a.map(x => x[1]))]; const stuck = a.filter(([y, top], j) => j && Math.abs(top - a[j - 1][1]) <= 2 && top < 200 && top > -5); return { i, height: a[0][2], stuckSamples: stuck.length, stuckFromY: stuck.length ? stuck[0][0] : null, stuckToY: stuck.length ? stuck[stuck.length - 1][0] : null, stuckTop: stuck.length ? stuck[0][1] : null }; }).filter(o => o.stuckSamples >= 2);
fs.writeFileSync(name + '/m/pins.json', JSON.stringify({ url, H, step, stickyCount: n, pins: out }, null, 1));
console.log(name, 'H', H, 'sticky>50vh', n, 'pinned on phone:', JSON.stringify(out).slice(0, 600)); await b.close(); })().catch(e => console.log(name, 'ERR', e.message.slice(0, 150)));
