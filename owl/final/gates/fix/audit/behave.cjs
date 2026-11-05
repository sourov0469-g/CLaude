// Behaviour audit, sections 3–7, scrolled the way a person scrolls (wheel steps, not jumps): desktop 1440 and an emulated iPhone 13.
// Logs per step: section in view, the state each section exposes, and any text that sits in the viewport but stays invisible.
const { chromium, devices } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html');
(async () => { const b = await chromium.launch(); const report = {};
  for (const [name, opt] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['iphone', devices['iPhone 13']]]) {
    const ctx = await b.newContext(opt); const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(F); await p.waitForTimeout(2500);
    const start = await p.evaluate(() => document.getElementById('nothing').offsetTop - innerHeight);
    await p.evaluate(y => scrollTo(0, y), start); await p.waitForTimeout(800);
    const log = []; let k = 0, last = -1;
    while (true) {
      if (name === 'iphone') { await p.evaluate(() => scrollBy(0, 160)); } else await p.mouse.wheel(0, 220);
      await p.waitForTimeout(110); k++;
      const st = await p.evaluate(() => { const mid = innerHeight / 2, secs = [...document.querySelectorAll('main > section')]; const cur = secs.find(s => { const r = s.getBoundingClientRect(); return r.top <= mid && r.bottom > mid; });
        const n = document.getElementById('nothing'), v = n.querySelector('video');
        const dead = [...document.querySelectorAll('main h1, main h2, main p, main b, main .nm, main .ans, main .v')].filter(e => { const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.bottom < 60 || r.top > innerHeight - 60) return false; let o = 1, x = e; while (x && x !== document.body) { const cs = getComputedStyle(x); o *= +cs.opacity; if (cs.visibility === 'hidden' || cs.display === 'none') o = 0; x = x.parentElement; } return o < .05 && !e.closest('[aria-hidden="true"]'); }).map(e => (e.closest('section') || {}).id + ':' + e.tagName + '.' + e.className + ' "' + e.textContent.trim().slice(0, 30) + '"');
        return { y: Math.round(scrollY), sec: cur ? cur.id : '', beat: n.dataset.beat, vt: v ? +v.currentTime.toFixed(2) : -1, vsrc: !!(v && v.currentSrc), nums: document.querySelectorAll('#numbers .n.on').length, big: document.querySelector('#numbers .big').classList.contains('on'), cover: document.getElementById('people').dataset.cover, callon: document.getElementById('call').classList.contains('on'), pill: document.querySelector('.callpill').classList.contains('away'), dead, end: scrollY + innerHeight >= document.documentElement.scrollHeight - 2 }; });
      log.push(st);
      if (k % 7 === 0) await p.screenshot({ path: path.join(__dirname, `${name}-${String(k).padStart(3, '0')}-${st.sec}.jpg`), type: 'jpeg', quality: 60 });
      if (st.end || st.y === last || k > 400) break; last = st.y; }
    report[name] = { errs, steps: log.length, log };
    const secsSeen = [...new Set(log.map(l => l.sec))];
    const deadAll = [...new Set(log.flatMap(l => l.dead.map(d => l.sec + ' | ' + d)))];
    console.log('== ' + name + ': ' + log.length + ' steps; sections ' + secsSeen.join(' > ') + '; errors ' + errs.length);
    console.log('  film time by beat: ' + [1, 2, 3, 4, 5].map(bt => { const xs = log.filter(l => +l.beat === bt && l.sec === 'nothing'); return bt + ':' + (xs.length ? xs[0].vt + '..' + xs[xs.length - 1].vt : '-'); }).join('  ') + '  src loaded: ' + log.some(l => l.vsrc));
    console.log('  numbers on: max ' + Math.max(...log.map(l => l.nums)) + ', big ' + log.some(l => l.big) + ' | people covers seen: ' + [...new Set(log.filter(l => l.sec === 'people').map(l => l.cover))].join(',') + ' | call .on: ' + log.some(l => l.callon) + ' | pill away at call: ' + log.filter(l => l.sec === 'call').every(l => l.pill));
    console.log('  invisible text sitting in view (after 110 ms): ' + (deadAll.length ? '\n   ' + deadAll.slice(0, 25).join('\n   ') : 'none'));
    await ctx.close(); }
  fs.writeFileSync(path.join(__dirname, 'behave.json'), JSON.stringify(report, null, 1)); await b.close(); })();
