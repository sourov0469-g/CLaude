// The audit that found the later-section faults, re-run on the finished defaults: wheel/scroll steps through the whole page,
// desktop 1440 and an emulated iPhone 13; logs any text sitting in view but invisible, any half-cut number, and any error.
const { chromium, devices } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html');
(async () => { const b = await chromium.launch(); const report = {};
  for (const [name, opt] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['iphone', devices['iPhone 13']]]) {
    const ctx = await b.newContext(opt); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(F); await p.waitForTimeout(2500);
    const start = await p.evaluate(() => document.getElementById('nothing').offsetTop - innerHeight); await p.evaluate(y => scrollTo(0, y), start); await p.waitForTimeout(800);
    const log = []; let k = 0, last = -1;
    while (true) { if (name === 'iphone') await p.evaluate(() => scrollBy(0, 160)); else await p.mouse.wheel(0, 220); await p.waitForTimeout(160); k++;
      const st = await p.evaluate(() => { const mid = innerHeight / 2, cur = [...document.querySelectorAll('main > section')].find(s => { const r = s.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; });
        const dead = [...document.querySelectorAll('main h1, main h2, main h3, main p, main b, main dt, main dd, main li')].filter(e => { const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom < 70 || r.top > innerHeight - 70) return false; if (e.closest('[aria-hidden="true"], .bt, .pane:not(.on), .cv:not(.on), [hidden], .b2, .beat, .print .back')) return false; let o = 1, x = e; while (x && x !== document.body) { const cs = getComputedStyle(x); o *= +cs.opacity; if (cs.visibility === 'hidden' || cs.display === 'none') o = 0; x = x.parentElement; } return o < .05; }).map(e => (e.closest('section') || {}).id + ':' + e.tagName + ' "' + e.textContent.trim().slice(0, 30) + '"');
        const clipped = [...document.querySelectorAll('main b, main dt, main .five, main .big')].filter(e => { const cp = getComputedStyle(e).clipPath; return cp && cp !== 'none' && /inset\((?!0px 0px 0px 0px)/.test(cp); }).length;
        return { y: Math.round(scrollY), sec: cur ? cur.id : '', dead, clipped, end: scrollY + innerHeight >= document.documentElement.scrollHeight - 2 }; });
      log.push(st); if (k % 8 === 0) await p.screenshot({ path: path.join(__dirname, `${name}-${String(k).padStart(3, '0')}-${st.sec}.jpg`), type: 'jpeg', quality: 60 });
      if (st.end || st.y === last || k > 400) break; last = st.y; }
    const dead = [...new Set(log.flatMap(l => l.dead.map(d => l.sec + ' | ' + d)))];
    report[name] = { steps: log.length, errors: errs, invisibleTextInView: dead, maskedNumbers: Math.max(...log.map(l => l.clipped)), sections: [...new Set(log.map(l => l.sec))] };
    console.log('== ' + name + ': ' + log.length + ' steps through ' + report[name].sections.join(' > ') + ' | errors ' + errs.length + ' | masked numbers ' + report[name].maskedNumbers + ' | invisible text in view: ' + (dead.length ? dead.slice(0, 8).join('; ') : 'none'));
    await ctx.close(); }
  fs.writeFileSync(path.join(__dirname, 'behave-after.json'), JSON.stringify(report, null, 1)); await b.close(); })();
