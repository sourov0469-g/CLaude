// Frame-by-frame recorder: streams rendered frames (CDP screencast) with timestamps while a scripted interaction plays.
// node cast.js <slug> <url> <scenario> [settleMs]
// scenarios: pass (pointer pass along y=700, rest, then leave), wheel (wheel scroll in steps), hoverlinks (hover visible links in turn)
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const [slug, url, scen, settleArg] = process.argv.slice(2); const SETTLE = +(settleArg || 12000);
const OUT = path.join(__dirname, '..', 'evidence', slug, 'cast-' + scen); fs.mkdirSync(OUT, {recursive: true});
(async () => {
  const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']});
  const p = await (await b.newContext({viewport: {width: 1440, height: 900}})).newPage(); const c = await p.context().newCDPSession(p);
  await p.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000}); await p.waitForTimeout(SETTLE);
  const frames = []; let t0 = 0;
  c.on('Page.screencastFrame', async f => { const t = f.metadata.timestamp * 1000; if (!t0) t0 = t; frames.push({t: Math.round(t - t0), d: f.data}); try { await c.send('Page.screencastFrameAck', {sessionId: f.sessionId}); } catch (e) {} });
  const marks = []; const mark = n => marks.push({n, t: frames.length ? frames[frames.length - 1].t : 0});
  if (scen === 'pass') { await p.mouse.move(100, 700); await p.waitForTimeout(1500); }
  await c.send('Page.startScreencast', {format: 'jpeg', quality: 70, maxWidth: 960, maxHeight: 600, everyNthFrame: 1});
  await p.waitForTimeout(800); mark('start');
  if (scen === 'pass') { mark('pass begins'); await p.mouse.move(700, 700, {steps: 25}); mark('pointer rests'); await p.waitForTimeout(3500); mark('pointer leaves'); await p.mouse.move(1420, 880, {steps: 6}); await p.waitForTimeout(3500); }
  if (scen === 'wheel') { await p.mouse.move(720, 450); for (let i = 0; i < 8; i++) { mark('wheel ' + (i + 1)); await p.mouse.wheel(0, 500); await p.waitForTimeout(900); } }
  if (scen === 'hoverlinks') { const ls = await p.$$('a,button'); let k = 0; for (const l of ls) { const bb = await l.boundingBox(); if (!bb || bb.y < 10 || bb.y > 880 || bb.width < 20) continue; mark('hover ' + k); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2, {steps: 5}); await p.waitForTimeout(900); mark('out ' + k); await p.mouse.move(bb.x + bb.width / 2, bb.y + bb.height + 120, {steps: 5}); await p.waitForTimeout(700); if (++k >= 4) break; } }
  await c.send('Page.stopScreencast'); await p.waitForTimeout(300);
  frames.forEach((f, i) => fs.writeFileSync(path.join(OUT, String(i).padStart(4, '0') + '-' + f.t + 'ms.jpg'), Buffer.from(f.d, 'base64')));
  fs.writeFileSync(path.join(OUT, 'marks.json'), JSON.stringify(marks));
  console.log(slug, scen, 'frames', frames.length, 'over', frames.length ? frames[frames.length - 1].t : 0, 'ms | marks', JSON.stringify(marks));
  await b.close();
})();
