const { chromium } = require('playwright');
(async () => { const F = process.argv[2]; const b = await chromium.launch({ args: ['--allow-file-access-from-files'] }); const out = [];
for (const [w, cpu] of [[390, 4], [1440, 1]]) for (const pg of ['home', 'services', 'storm', 'nest', 'families', 'contact']) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 500 ? 844 : 900 }, isMobile: w < 500, hasTouch: w < 500 }); const p = await ctx.newPage();
  const cdp = await ctx.newCDPSession(p); await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
  await p.addInitScript(() => { window.__v = { lcp: 0, lcpEl: '', cls: 0, shifts: [] };
    new PerformanceObserver(l => { for (const e of l.getEntries()) { window.__v.lcp = e.startTime; window.__v.lcpEl = e.element ? (e.element.tagName + '.' + (e.element.className && e.element.className.baseVal === undefined ? e.element.className : '')).slice(0, 60) : e.url.slice(-40); } }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__v.cls += e.value; if (e.value > 0.01) window.__v.shifts.push(e.value.toFixed(3) + ' ' + (e.sources || []).map(s => s.node ? (s.node.className && s.node.className.baseVal === undefined ? s.node.className : s.node.nodeName) : '').join('|').slice(0, 80)); } }).observe({ type: 'layout-shift', buffered: true }); });
  const t0 = Date.now(); await p.goto('file://' + F + '#/' + pg, { waitUntil: 'load' }); const load = Date.now() - t0; await p.waitForTimeout(2500);
  const lcp = await p.evaluate(() => ({ lcp: Math.round(window.__v.lcp), el: window.__v.lcpEl }));
  const H = await p.evaluate(() => document.body.scrollHeight); for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(120); }
  await p.waitForTimeout(800); const v = await p.evaluate(() => ({ cls: +window.__v.cls.toFixed(3), shifts: window.__v.shifts.slice(0, 4) }));
  out.push(`${w}px cpu×${cpu} ${pg.padEnd(9)} load ${String(load).padStart(5)}ms  LCP ${String(lcp.lcp).padStart(5)}ms (${lcp.el})  CLS ${v.cls}${v.shifts.length ? '  shifts: ' + v.shifts.join(' ; ') : ''}`);
  await ctx.close(); }
console.log(out.join('\n')); await b.close(); })();
