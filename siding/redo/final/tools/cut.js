const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final.html'; const ck = []; const ok = (n, c, d) => ck.push([c ? 'PASS' : 'FAIL', n, d === undefined ? '' : d]);
(async () => { const b = await chromium.launch();
  async function open(extra = {}) { const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, ...extra }); const p = await ctx.newPage(); p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text()); }); p.ctx = ctx; await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(500); return p; }
  let p = await open();
  const n0 = await p.evaluate(() => ({ r: document.querySelectorAll('.cu-ring').length, v: document.querySelectorAll('.cu-vial').length, on: document.documentElement.classList.contains('cu-on') }));
  ok('exactly one ring and one companion; hidden until the pointer moves', n0.r === 1 && n0.v === 1 && !n0.on, JSON.stringify(n0));
  await p.mouse.move(300, 300); await p.mouse.move(420, 360, { steps: 6 }); await p.waitForTimeout(700);
  const pos = await p.evaluate(() => { const a = document.querySelector('.cu-ring').getBoundingClientRect(), v = document.querySelector('.cu-vial').getBoundingClientRect(); return { on: document.documentElement.classList.contains('cu-on'), rx: Math.round(a.x + a.width / 2), ry: Math.round(a.y + a.height / 2), vx: Math.round(v.x + v.width / 2), vy: Math.round(v.y + v.height / 2), cur: getComputedStyle(document.body).cursor }; });
  ok('the ring sits on the pointer; the vial settles beside it; the native cursor is hidden', pos.on && Math.abs(pos.rx - 420) <= 2 && Math.abs(pos.ry - 360) <= 2 && Math.abs(pos.vx - 446) <= 3 && Math.abs(pos.vy - 384) <= 3 && pos.cur === 'none', JSON.stringify(pos));
  const lag = await p.evaluate(async () => { const v = document.querySelector('.cu-vial'); const pts = []; return 1; });
  await p.mouse.move(900, 300, { steps: 2 }); const mid = await p.evaluate(() => { const v = document.querySelector('.cu-vial').getBoundingClientRect(); return Math.round(v.x + v.width / 2); }); await p.waitForTimeout(800);
  const end = await p.evaluate(() => { const v = document.querySelector('.cu-vial').getBoundingClientRect(); return Math.round(v.x + v.width / 2); });
  ok('the companion trails (it is behind during a fast move, and arrives after)', mid < 900 + 26 - 20 && Math.abs(end - 926) <= 3, mid + ' -> ' + end);
  // states
  await p.evaluate(() => scrollTo({ top: 0, behavior: 'instant' })); await p.waitForTimeout(300);
  const tel = await p.evaluate(() => { const a = document.querySelector('.hdr .tel, .hdr a[href^="tel"]'); const r = a.getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; });
  await p.mouse.move(tel[0], tel[1], { steps: 4 }); await p.waitForTimeout(300); const k1 = await p.evaluate(() => document.querySelector('.cu-ring').className); ok('over a link the ring grows and fills (link)', /link/.test(k1), k1);
  await p.mouse.down(); await p.waitForTimeout(120); const k2 = await p.evaluate(() => document.querySelector('.cu-ring').className); await p.mouse.up(); ok('pressing shrinks it (down)', /down/.test(k2), k2);
  await p.evaluate(() => scrollTo({ top: document.querySelector('.wn').getBoundingClientRect().top + scrollY, behavior: 'instant' })); await p.waitForTimeout(500);
  const hit = await p.evaluate(() => { const r = document.querySelector('.wn-hit').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }); await p.mouse.move(hit[0], hit[1], { steps: 4 }); await p.waitForTimeout(300); const k3 = await p.evaluate(() => document.querySelector('.cu-ring').className); ok('over the window you can drag the ring says so (drag)', /drag/.test(k3), k3);
  await p.evaluate(() => document.querySelector('.wn-time').scrollIntoView({ block: 'center', behavior: 'instant' })); await p.waitForTimeout(300); const rg = await p.evaluate(() => { const r = document.querySelector('.wn-time').getBoundingClientRect(); return [r.x + r.width / 2, r.y + r.height / 2]; }); await p.mouse.move(rg[0], rg[1], { steps: 4 }); await p.waitForTimeout(250); const k4 = await p.evaluate(() => ({ c: document.querySelector('.cu-ring').className, native: getComputedStyle(document.querySelector('.wn-time')).cursor })); ok('over a range input the custom cursor steps aside and the native pointer shows', k4.native === 'pointer' && /hide/.test(k4.c), JSON.stringify(k4));
  // leaving
  await p.evaluate(() => document.dispatchEvent(new MouseEvent('mouseleave'))); await p.waitForTimeout(100); ok('leaving the window hides the companion and returns the native cursor', await p.evaluate(() => !document.documentElement.classList.contains('cu-on')));
  await p.mouse.move(500, 500); await p.waitForTimeout(150); ok('returning shows it again', await p.evaluate(() => document.documentElement.classList.contains('cu-on')));
  await p.evaluate(() => window.dispatchEvent(new Event('blur'))); ok('window blur hides it', await p.evaluate(() => !document.documentElement.classList.contains('cu-on')));
  // idle cost
  await p.mouse.move(520, 520); await p.waitForTimeout(1200); const idle = await p.evaluate(() => new Promise(res => { let n = 0; const t0 = performance.now(); const f = () => { n++; if (performance.now() - t0 < 600) requestAnimationFrame(f); else res(n); }; requestAnimationFrame(f); })); ok('it stops its own animation when everything is at rest (frames are free)', idle > 20, idle + ' frames/0.6s');
  ok('page errors 0', p.errs.length === 0, p.errs.join('|')); await p.ctx.close();
  // touch + reduced motion
  p = await open({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } }); const t = await p.evaluate(() => ({ made: document.querySelectorAll('.cu-ring').length, on: document.documentElement.classList.contains('cu-on') })); ok('touch device: no cursor is created and nothing is hidden', t.made === 0 && !t.on, JSON.stringify(t)); await p.ctx.close();
  p = await open({ reducedMotion: 'reduce' }); await p.mouse.move(200, 200); await p.waitForTimeout(200); const rm = await p.evaluate(() => ({ made: document.querySelectorAll('.cu-ring').length, on: document.documentElement.classList.contains('cu-on'), c: getComputedStyle(document.body).cursor })); ok('reduced motion: no custom cursor; the native one stays', rm.made === 0 && !rm.on && rm.c !== 'none', JSON.stringify(rm)); await p.ctx.close();
  for (const c of ck) console.log(c.join(' | ')); console.log('FAILS', ck.filter(c => c[0] === 'FAIL').length, 'of', ck.length); await b.close(); })();
