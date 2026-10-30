// Phase 5/6 integrity: every section's visible tabs and every backup open without console errors, the stage
// changes, and era a backups carry the record palette (data-bk="a") while era b do not.
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto('file://' + require('path').resolve(__dirname, '../../homepage-standalone.html')); await p.waitForTimeout(1500);
  const secs = await p.evaluate(() => [...document.querySelectorAll('.sec')].map(s => ({ k: s.id, vis: [...s.querySelectorAll('.vsw-b')].map(t => +t.dataset.v), bk: [...document.querySelectorAll(`.pk-bk[data-for="${s.id}"] button`)].map(x => +x.dataset.v) })));
  let bad = 0, opened = 0;
  for (const s of secs) {
    const row = [];
    for (const v of [...s.vis, ...s.bk]) {
      errs.length = 0;
      const r = await p.evaluate(([k, v]) => { const sec = document.getElementById(k); const t = sec.querySelector(`.vsw-b[data-v="${v}"]`) || document.querySelector(`.pk-bk[data-for="${k}"] button[data-v="${v}"]`); t.click(); sec.scrollIntoView(); return new Promise(res => setTimeout(() => res({ v: +sec.dataset.v, bk: sec.getAttribute('data-bk'), kids: sec.querySelector('.stage').children.length }), 350)); }, [s.k, v]);
      const ok = r.v === v && r.kids > 0 && !errs.length && (v <= 8 ? r.bk === null : r.bk === (v <= 11 ? 'a' : 'b'));
      opened += ok; if (!ok) { bad++; row.push(`${v}:FAIL(${JSON.stringify(r)} ${errs.slice(0, 1)})`); } else row.push(v);
    }
    console.log(s.k.padEnd(9), 'visible', s.vis.length, 'backups', s.bk.length, '|', row.join(' '));
  }
  const url = await p.evaluate(() => location.search);
  console.log('opened', opened, 'failed', bad, '| url', url); await b.close();
})();
