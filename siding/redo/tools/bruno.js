// Bruno Simon: screencast (screenshots time out on a never-idle WebGL page) while the page loads, idles, and is driven
// with the keyboard and pointer; saves the site's own JS to a scratch dir for code reading (not committed).
// node bruno.js <scratchDir>
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const OUT = path.join(__dirname, '..', 'evidence', 'bruno', 'cast'); fs.mkdirSync(OUT, {recursive: true}); const SCR = process.argv[2];
(async () => {
  const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']});
  const p = await (await b.newContext({viewport: {width: 1440, height: 900}})).newPage(); const c = await p.context().newCDPSession(p);
  const net = []; p.on('response', async r => { try { const u = r.url(), t = r.request().resourceType(); net.push({u: u.slice(0, 150), t, n: +(r.headers()['content-length'] || 0)}); if (SCR && t === 'script' && /bruno-simon/.test(u)) { const body = await r.body(); fs.writeFileSync(path.join(SCR, path.basename(u.split('?')[0]) || 'index.js'), body); } } catch (e) {} });
  await p.addInitScript(() => { window.__ctx = []; const g = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function (t, ...a) { window.__ctx.push(t); return g.call(this, t, ...a); }; const gpu = navigator.gpu; window.__hasGPU = !!gpu; });
  const frames = []; let t0 = 0; const marks = [];
  c.on('Page.screencastFrame', async f => { const t = f.metadata.timestamp * 1000; if (!t0) t0 = t; frames.push({t: Math.round(t - t0), d: f.data}); try { await c.send('Page.screencastFrameAck', {sessionId: f.sessionId}); } catch (e) {} });
  await c.send('Page.startScreencast', {format: 'jpeg', quality: 70, maxWidth: 960, maxHeight: 600, everyNthFrame: 1});
  const mark = n => { marks.push({n, t: frames.length ? frames[frames.length - 1].t : 0}); console.log('mark', n, frames.length); };
  await p.goto('https://bruno-simon.com/', {waitUntil: 'domcontentloaded', timeout: 60000}); mark('loaded'); await p.waitForTimeout(25000); mark('idle 25s');
  const dom = await p.evaluate(() => ({title: document.title, ctx: window.__ctx, gpu: window.__hasGPU, buttons: [...document.querySelectorAll('button,a')].slice(0, 20).map(e => (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 40)), text: document.body.innerText.slice(0, 600)}));
  console.log(JSON.stringify(dom).slice(0, 1200));
  await p.mouse.click(720, 450); await p.waitForTimeout(3000); mark('clicked centre');
  await p.keyboard.down('ArrowUp'); await p.waitForTimeout(4000); mark('driving forward'); await p.keyboard.down('ArrowLeft'); await p.waitForTimeout(2500); await p.keyboard.up('ArrowLeft'); mark('turned left'); await p.waitForTimeout(3000); await p.keyboard.up('ArrowUp'); mark('released'); await p.waitForTimeout(3000);
  await p.mouse.move(400, 450); await p.mouse.down(); await p.mouse.move(1000, 450, {steps: 20}); await p.mouse.up(); await p.waitForTimeout(2500); mark('dragged');
  await c.send('Page.stopScreencast'); await p.waitForTimeout(300);
  frames.forEach((f, i) => { if (i % 2 === 0 || i === frames.length - 1) fs.writeFileSync(path.join(OUT, String(i).padStart(4, '0') + '-' + f.t + 'ms.jpg'), Buffer.from(f.d, 'base64')); });
  fs.writeFileSync(path.join(OUT, 'marks.json'), JSON.stringify(marks));
  fs.writeFileSync(path.join(OUT, '..', 'recon.json'), JSON.stringify({url: 'https://bruno-simon.com/', dom, marks, network: {requests: net.length, bytesDeclared: net.reduce((a, n) => a + n.n, 0), scripts: net.filter(n => n.t === 'script').map(n => n.u), big: net.filter(n => n.n > 300000).map(n => n.u + ' ' + n.n)}}, null, 1));
  console.log('frames', frames.length, 'bytes', net.reduce((a, n) => a + n.n, 0)); await b.close();
})();
