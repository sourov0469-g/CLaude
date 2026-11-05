// Later sections at laptop 1280x720, large 1920x1080 and a small Android 360x740: one settled frame per section
const { chromium } = require('playwright'); const path = require('path');
const F = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html');
(async () => { const b = await chromium.launch();
  for (const [w, h, mob] of [[1280, 720, false], [1920, 1080, false], [360, 740, true]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, isMobile: mob, hasTouch: mob }); await p.goto(F); await p.waitForTimeout(2000);
    for (const [id, f] of [['numbers', 0], ['people', .2], ['towns', 0], ['call', 0]]) {
      await p.evaluate(([id, f]) => { const s = document.getElementById(id); scrollTo(0, s.offsetTop + Math.max(0, s.offsetHeight - innerHeight) * f + (id === 'numbers' ? innerHeight * .3 : 0)); }, [id, f]); await p.waitForTimeout(2300);
      const info = await p.evaluate(id => { const s = document.getElementById(id), r = s.getBoundingClientRect(); const pill = document.querySelector('.callpill').getBoundingClientRect(); const over = [...s.querySelectorAll('button, a, input, .count, .dot')].filter(e => { const q = e.getBoundingClientRect(); return q.width && q.bottom > pill.top && q.top < pill.bottom && q.right > pill.left && q.left < pill.right && !document.querySelector('.callpill').classList.contains('away'); }).map(e => e.className || e.tagName); return { h: Math.round(r.height), under_pill: over.slice(0, 4).join(',') }; }, id);
      console.log(w + 'x' + h, id, JSON.stringify(info));
      await p.screenshot({ path: path.join(__dirname, `size-${w}-${id}.jpg`), type: 'jpeg', quality: 60 }); }
    await p.close(); }
  await b.close(); })();
