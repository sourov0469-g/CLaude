// node wcheck.js <file.html> <outdir> <from> <to> : render every homepage version view and subpage view (reduced motion, 1440),
// report page errors, overflow, broken images and unresolved placeholders, and save the section screenshot for pixel comparison.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const [F, OUT, from, to] = [process.argv[2], process.argv[3], +process.argv[4] || 0, +process.argv[5] || 1e9]; fs.mkdirSync(OUT, { recursive: true });
(async () => { const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const p0 = await ctx.newPage(); await p0.goto('file://' + F, { waitUntil: 'load' });
  const M = await p0.evaluate(() => ({ V: window.__VERSIONS, pages: (window.__PAGES || []).map((x) => x[0]), sp: window.__SLOTPAGE })); await p0.close();
  const views = []; // [name, query, slot]
  for (const [slot, vs] of Object.entries(M.V)) for (const [v] of vs) views.push([`${slot}-${v}`, M.sp[slot] ? `?page=${M.sp[slot]}&${slot}=${v}` : `?${slot}=${v}`, slot]);
  for (const pg of M.pages) views.push([`page-${pg}`, `?page=${pg}`, null]);
  const out = { total: views.length, bad: [] };
  for (const [name, q, slot] of views.slice(from, to)) { const p = await ctx.newPage(); const errs = []; p.on('pageerror', (e) => errs.push(e.message));
    await p.goto('file://' + F + q, { waitUntil: 'load', timeout: 120000 });
    await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } });
    await p.waitForTimeout(400);
    const r = await p.evaluate((slot) => { const imgs = [...document.querySelectorAll('img')].filter((i) => i.offsetParent !== null || i.getClientRects().length);
      const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).length, unres = [...document.querySelectorAll('img')].filter((i) => i.hasAttribute('data-dd') || (i.src || '').startsWith('data:@dd') || (i.src || '').startsWith('data:image/gif;base64,R0lGOD')).length;
      const el = slot ? document.querySelector(`.slot[data-slot="${slot}"] > *`) : document.querySelector('main > *');
      if (el) el.scrollIntoView({ block: 'start' }); return { ov: document.documentElement.scrollWidth - innerWidth, broken, unres, imgs: imgs.length, nat: imgs.map((i) => i.naturalWidth).sort((a, b) => b - a).slice(0, 6) }; }, slot);
    await p.waitForTimeout(500); await p.screenshot({ path: path.join(OUT, name + '.png') });
    if (errs.length || r.ov > 0 || r.broken || r.unres) out.bad.push([name, errs.slice(0, 2), r.ov, r.broken, r.unres]); out[name] = r; await p.close(); }
  fs.writeFileSync(path.join(OUT, `report-${from}.json`), JSON.stringify(out)); console.log(JSON.stringify({ total: out.total, range: [from, Math.min(to, views.length)], bad: out.bad })); await b.close(); })();
