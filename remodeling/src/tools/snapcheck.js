// AUDIT-01 D.11 acceptance: a reaction's entrance must be seen, not snapped. Samples the drawn layer every frame for
// the first 300ms of a hover on a set of targets and reports the first sample's progress (must be < .6 for a .2-.3s entrance).
const { chromium } = require('playwright');
const fs = require('fs');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto(FILE); await p.waitForTimeout(1500);
  const targets = await p.evaluate(() => {
    const list = [...document.querySelectorAll('.nav__book, .nav__tel, .has-rx')].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && !e.closest('[hidden]'); });
    return [...new Set(list)].slice(0, 400).map((e, i) => { e.dataset.snap = i; return i; });
  });
  const out = []; let snapped = 0, tested = 0;
  for (const i of targets) {
    const sel = '[data-snap="' + i + '"]';
    const ok = await p.evaluate(sel => { const e = document.querySelector(sel); e.scrollIntoView({ block: 'center' }); const r = e.getBoundingClientRect(); return r.top > 60 && r.bottom < 860 && r.width > 0 && getComputedStyle(e).visibility !== 'hidden'; }, sel);
    if (!ok) continue;
    await p.mouse.move(2, 450); await p.waitForTimeout(250);
    const r = await p.evaluate(sel => { const e = document.querySelector(sel).getBoundingClientRect(); return [e.left + Math.min(e.width / 2, 40), e.top + e.height / 2]; }, sel);
    // per-frame sampler: the drawn layer's mean opacity x first visible element's progress proxy
    await p.evaluate(sel => {
      const e = document.querySelector(sel); window.__s = [];
      const t0 = performance.now();
      (function f() {
        const g = e.querySelector(':scope > .rx');
        if (g) {
          const nodes = [...g.querySelectorAll('.rg-s, .rg-f, .s, .box, .bt, .dv, .hk, .fan, .c0, .ta, .kr, .ul, .hs')];
          const v = nodes.map(n => { const cs = getComputedStyle(n); const op = +cs.opacity; const da = cs.strokeDasharray; let dp = 1; if (da && da !== 'none' && n.getTotalLength) { const L = n.getTotalLength(); const parts = da.split(/[ ,]+/).map(parseFloat); if (L && parts.length >= 2) dp = Math.min(1, parts[0] / L); } return op * dp; });
          window.__s.push([Math.round(performance.now() - t0), v.length ? v.reduce((a, c) => a + c, 0) / v.length : 0]);
        }
        if (performance.now() - t0 < 320) requestAnimationFrame(f);
      })();
    }, sel);
    await p.mouse.move(r[0], r[1]);
    await p.waitForTimeout(380);
    const s = await p.evaluate(() => window.__s);
    const first = s.find(x => x[0] > 0) || s[0];
    const last = s[s.length - 1];
    if (!s.length || !last) continue;
    tested++;
    const name = await p.evaluate(sel => { const e = document.querySelector(sel); return (e.getAttribute('aria-label') || e.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30) + ' [' + e.dataset.rx + ']'; }, sel);
    const snap = last[1] > .05 && first[1] >= last[1] * .95;
    if (snap) snapped++;
    out.push((snap ? 'SNAP ' : 'ok   ') + name + ' first@' + first[0] + 'ms=' + first[1].toFixed(2) + ' end=' + last[1].toFixed(2));
  }
  const res = 'tested ' + tested + ', snapped ' + snapped + '\n' + out.join('\n');
  fs.writeFileSync(process.env.OUT || '/home/user/CLaude/remodeling/qa/snapcheck.txt', res + '\n');
  console.log(res.split('\n').slice(0, 1).join('\n'));
  console.log(out.filter(x => x.startsWith('SNAP')).slice(0, 10).join('\n'));
  await b.close();
})();
