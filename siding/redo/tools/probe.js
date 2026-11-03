// Stage 1 probes for one reference: node probe.js <slug> <url> [cursorSelector]
// 1. cursor lag: jump the pointer 400 px and sample every follower's position each animation frame -> fraction closed per frame
// 2. field reaction: a slow pointer pass across an empty area; per-cell pixel change near vs far from the path, and how long it persists
// 3. hover timing: transition/animation durations and easings on the first links and buttons when hovered
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const [slug, url, csel] = process.argv.slice(2); const OUT = path.join(__dirname, '..', 'evidence', slug); fs.mkdirSync(path.join(OUT, 'frames'), {recursive: true});
const {PNG} = (() => { try { return require('pngjs'); } catch (e) { return {}; } })();
(async () => {
  const b = await chromium.launch({args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']});
  const p = await (await b.newContext({viewport: {width: 1440, height: 900}})).newPage();
  await p.goto(url, {waitUntil: 'domcontentloaded', timeout: 60000}); await p.waitForTimeout(9000);
  // 1. cursor lag
  await p.mouse.move(400, 450); await p.waitForTimeout(1500);
  const lag = await p.evaluate(async (csel) => {
    const els = [...document.querySelectorAll(csel || 'body *')].filter(e => { const s = getComputedStyle(e); return s.position === 'fixed' && s.pointerEvents === 'none' && e.getBoundingClientRect().width < 200; }).slice(0, 6);
    const pos = () => els.map(e => { const r = e.getBoundingClientRect(); return r.left + r.width / 2; });
    const start = pos(); window.dispatchEvent(new PointerEvent('pointermove', {clientX: 800, clientY: 450, bubbles: true})); document.dispatchEvent(new MouseEvent('mousemove', {clientX: 800, clientY: 450, bubbles: true}));
    const series = []; for (let i = 0; i < 40; i++) { await new Promise(r => requestAnimationFrame(r)); series.push(pos()); }
    return els.map((e, k) => ({cls: (typeof e.className === 'string' ? e.className : e.tagName).slice(0, 50), start: Math.round(start[k]), xs: series.map(s => Math.round(s[k]))}));
  }, csel);
  for (const l of lag) {   // fraction of the remaining gap closed per frame, from the first frames that move
    const target = l.xs[l.xs.length - 1]; const g = [l.start, ...l.xs].map(x => target - x); const ks = [];
    for (let i = 1; i < g.length; i++) if (Math.abs(g[i - 1]) > 5 && g[i] !== g[i - 1]) ks.push(1 - g[i] / g[i - 1]);
    l.closePerFrame = ks.length ? +(ks.slice(0, 8).reduce((a, c) => a + c, 0) / Math.min(8, ks.length)).toFixed(3) : null;
    l.framesTo95 = g.findIndex((x, i) => i > 0 && Math.abs(x) <= Math.abs(g[0]) * 0.05);
  }
  // 2. field reaction: screenshots before, during and after a slow pass through the middle band
  const y = 620; await p.mouse.move(100, y); await p.waitForTimeout(1200);
  const s0 = await p.screenshot(); const path0 = path.join(OUT, 'frames', 'p-rest.png'); fs.writeFileSync(path0, s0);
  await p.mouse.move(1340, y, {steps: 60}); const s1 = await p.screenshot(); fs.writeFileSync(path.join(OUT, 'frames', 'p-during.png'), s1);
  await p.waitForTimeout(500); const s2 = await p.screenshot(); fs.writeFileSync(path.join(OUT, 'frames', 'p-500ms.png'), s2);
  await p.waitForTimeout(1500); const s3 = await p.screenshot(); fs.writeFileSync(path.join(OUT, 'frames', 'p-2000ms.png'), s3);
  // 3. hover timing on links and buttons
  const hov = await p.evaluate(() => [...document.querySelectorAll('a,button,[role=button]')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 20 && r.top > 0 && r.bottom < innerHeight; }).slice(0, 8).map(e => {
    const s = getComputedStyle(e); return {txt: (e.textContent || '').trim().slice(0, 30), tp: s.transitionProperty.slice(0, 60), td: s.transitionDuration.slice(0, 40), tf: s.transitionTimingFunction.slice(0, 80)};
  }));
  const anim = [];
  const targets = await p.$$('a,button');
  for (const t of targets.slice(0, 6)) { try { const bb = await t.boundingBox(); if (!bb || bb.y < 0 || bb.y > 880) continue; await t.hover({timeout: 1500, force: true}); await p.waitForTimeout(60);
    anim.push(await p.evaluate(() => document.getAnimations().slice(0, 6).map(a => { const tm = a.effect && a.effect.getTiming ? a.effect.getTiming() : {}; return {type: a.constructor.name, name: a.animationName || a.transitionProperty || '', dur: tm.duration, ease: tm.easing}; }))); } catch (e) {} }
  const out = {slug, url, cursorLag: lag, hoverTransitions: hov, hoverAnimations: anim.filter(a => a.length).slice(0, 6)};
  fs.writeFileSync(path.join(OUT, 'probe.json'), JSON.stringify(out, null, 1));
  console.log(JSON.stringify({cursor: lag.map(l => ({cls: l.cls, closePerFrame: l.closePerFrame, framesTo95: l.framesTo95})), hover: hov.slice(0, 5), anims: anim.filter(a => a.length).slice(0, 3)}, null, 0).slice(0, 2500));
  await b.close();
})();
