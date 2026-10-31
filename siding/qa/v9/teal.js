// REBRAND challenge, measured as rendered (S0071 measure the rendered pair; S1435 isolation inflation): screenshot
// every visible version of every section; qa/v9/teal.py then counts the pixels the accent paints.
// NODE_PATH=$(npm root -g) node qa/v9/teal.js OUTDIR [pages]
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const PAGES = (process.argv[3] || 'index,siding,windows,roofing,outdoor,projects,financing,about,contact').split(',');
const BASE = process.env.QBASE || 'http://127.0.0.1:8765/';
(async () => {
  const b = await chromium.launch(); let n = 0;
  for (const pg of PAGES) {
    const p = await b.newPage({ viewport: { width: +(process.env.VW || 1440), height: 900 }, reducedMotion: 'reduce' });
    await p.goto(BASE + 'site/' + pg + '.html'); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 30000 });
    await p.evaluate(async () => { document.querySelectorAll('img').forEach(i => { i.loading = 'eager'; }); });
    const secs = await p.evaluate(() => [...document.querySelectorAll('.sec:not([data-bk])')].map(s => ({ id: s.id, n: s.querySelectorAll('.vsw-b').length })));
    for (const s of secs) for (let v = 1; v <= Math.max(1, s.n); v++) {
      await p.evaluate(([id, v]) => { const t = document.querySelector(`#${id} .vsw-b[data-v="${v}"]`); if (t) t.click(); document.getElementById(id).scrollIntoView(); }, [s.id, v]);
      await p.waitForTimeout(350);
      await p.evaluate(async id => { const imgs = [...document.getElementById(id).querySelectorAll('img')]; await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 3000); }))); }, s.id);
      const el = await p.$(`#${s.id} .stage > .v`) || await p.$(`#${s.id}`);
      try { await el.screenshot({ path: path.join(OUT, `${pg}__${s.id}__${v}.png`), animations: 'disabled' }); n++; } catch (e) { console.log('skip', pg, s.id, v, e.message.slice(0, 80)); }
    }
    await p.close();
  }
  console.log('shots', n); await b.close();
})();
