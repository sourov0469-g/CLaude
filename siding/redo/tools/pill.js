// Cash App colour page: measure the "Copy hex" cursor pill (follow lag per frame, show/hide, click result) and list the page's chapters.
// node pill.js  -> evidence/cashapp-color/pill.json + frames/pill-*.png
const {chromium} = require('playwright'); const fs = require('fs'); const path = require('path');
const OUT = path.join(__dirname, '..', 'evidence', 'cashapp-color');
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({viewport: {width: 1440, height: 900}, permissions: ['clipboard-read', 'clipboard-write']});
  const p = await ctx.newPage(); await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], {origin: 'https://design.cash.app'});
  await p.addInitScript(() => { window.__clip = []; const w = navigator.clipboard && navigator.clipboard.writeText; if (w) navigator.clipboard.writeText = function (t) { window.__clip.push(t); return w.call(this, t); }; });
  const r = await p.goto('https://design.cash.app/color', {waitUntil: 'domcontentloaded', timeout: 60000}); await p.waitForTimeout(6000);
  const out = {status: r.status()};
  out.chapters = await p.evaluate(() => [...document.querySelectorAll('h1,h2,h3')].map(h => h.textContent.trim().replace(/\s+/g, ' ').slice(0, 60)).filter(Boolean).slice(0, 40));
  out.swatches = await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => /#[0-9A-F]{6}\b/i.test(e.textContent) && e.children.length === 0 && e.tagName !== 'SCRIPT').map(e => e.textContent.trim().slice(0, 40)).slice(0, 30));
  // find the pill
  const findPill = () => p.evaluate(() => { const el = [...document.querySelectorAll('body *')].find(e => e.tagName !== 'SCRIPT' && e.tagName !== 'STYLE' && e.children.length <= 2 && /copy hex/i.test(e.textContent || '') && e.getBoundingClientRect().width < 300); if (!el) return null; const s = getComputedStyle(el), r = el.getBoundingClientRect(); let a = el, chain = []; for (let i = 0; i < 4 && a; i++, a = a.parentElement) { const cs = getComputedStyle(a); chain.push({cls: (a.className || '').toString().slice(0, 60), pos: cs.position, tr: cs.transform.slice(0, 60), op: cs.opacity, trn: (cs.transitionProperty + ' ' + cs.transitionDuration + ' ' + cs.transitionTimingFunction).slice(0, 120), pe: cs.pointerEvents}); } return {txt: el.textContent.trim(), x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height, chain}; });
  out.pillBeforeHover = await findPill();
  await p.mouse.move(400, 500); await p.waitForTimeout(1200); await p.screenshot({path: path.join(OUT, 'frames', 'pill-1-hover.png')});
  out.pillOnHover = await findPill();
  // follow lag: jump the pointer 300 px within the field and sample the pill centre per animation frame
  out.lag = await p.evaluate(async () => {
    const el = [...document.querySelectorAll('body *')].find(e => e.tagName !== 'SCRIPT' && e.tagName !== 'STYLE' && e.children.length <= 2 && /copy hex/i.test(e.textContent || '') && e.getBoundingClientRect().width < 300); if (!el) return null;
    const pos = () => { const r = el.getBoundingClientRect(); return Math.round(r.left + r.width / 2); };
    const tgt = document.elementFromPoint(400, 500); const start = pos();
    for (const t of [tgt, document, window]) t.dispatchEvent(new MouseEvent('mousemove', {clientX: 700, clientY: 500, bubbles: true}));
    for (const t of [tgt, document, window]) t.dispatchEvent(new PointerEvent('pointermove', {clientX: 700, clientY: 500, bubbles: true}));
    const xs = [], ts = []; const t0 = performance.now(); for (let i = 0; i < 60; i++) { await new Promise(r => requestAnimationFrame(r)); xs.push(pos()); ts.push(Math.round(performance.now() - t0)); }
    return {start, xs, ts};
  });
  if (out.lag) { const L = out.lag, tgt = L.xs[L.xs.length - 1], g = [L.start, ...L.xs].map(x => tgt - x), ks = []; for (let i = 1; i < g.length; i++) if (Math.abs(g[i - 1]) > 4 && g[i] !== g[i - 1]) ks.push(1 - g[i] / g[i - 1]); L.closePerFrame = ks.length ? +(ks.slice(0, 8).reduce((a, c) => a + c, 0) / Math.min(8, ks.length)).toFixed(3) : null; L.framesTo95 = g.findIndex((x, i) => i > 0 && Math.abs(x) <= Math.abs(g[0]) * 0.05); L.msTo95 = L.framesTo95 > 0 ? L.ts[L.framesTo95 - 1] : null; }
  // click: what text does the pill show after, how long, what was written to the clipboard
  await p.mouse.move(700, 500); await p.waitForTimeout(600); await p.mouse.down(); await p.mouse.up();
  const after = []; for (const ms of [50, 300, 800, 1500, 2500]) { await p.waitForTimeout(ms - (after.length ? [50, 300, 800, 1500, 2500][after.length - 1] : 0)); const pl = await findPill(); const txt = await p.evaluate(() => { const el = [...document.querySelectorAll('body *')].find(e => e.tagName !== 'SCRIPT' && e.tagName !== 'STYLE' && e.children.length <= 2 && /(copied|copy hex)/i.test(e.textContent || '') && e.getBoundingClientRect().width < 300); return el ? el.textContent.trim() : null; }); after.push({ms, txt, op: pl && pl.chain[0].op}); if (ms === 300) await p.screenshot({path: path.join(OUT, 'frames', 'pill-2-click.png')}); }
  out.afterClick = after; out.clipboard = await p.evaluate(() => window.__clip);
  // leave the field
  await p.mouse.move(1000, 60, {steps: 5}); await p.waitForTimeout(800); out.pillAfterLeave = await findPill(); await p.screenshot({path: path.join(OUT, 'frames', 'pill-3-leave.png')});
  fs.writeFileSync(path.join(OUT, 'pill.json'), JSON.stringify(out, null, 1)); console.log(JSON.stringify(out).slice(0, 3500)); await b.close();
})();
