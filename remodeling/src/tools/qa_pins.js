// QA (completion point 3): pinned sections must pin correctly on real phone widths: the story plays while scrolling and
// releases at its end; a pin that traps scrolling is a defect. For every pinned ScrollTrigger on a page at a width:
//  engage    through the pin's range the pinned element holds still (its top moves under 3px)
//  play      the trigger's progress runs from 0 to 1 across the range
//  release   after the end the element moves on with the page
//  no trap   the scroll continues to the end of the page
// Phones are emulated (isMobile, touch, coarse pointer) and scrolled by script in small steps; 1440 by wheel.
// Usage: node qa_pins.js <round>
const { chromium } = require('playwright');
const fs = require('fs');
const PAGES = { home: 'elbaz-homepage.html', kitchens: 'kitchens.html', bathrooms: 'bathrooms.html', renovation: 'renovation.html', contact: 'contact.html' };
const SIZES = [[360, 740], [375, 667], [390, 844], [414, 896], [768, 1024], [1440, 900]].filter(([w]) => !process.env.QA_W || process.env.QA_W.split(',').includes(String(w)));
const round = process.argv[2] || '1'; const OUT = `/home/user/CLaude/qa/finalize/qa${round}/pins`; fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch(); const R = []; let fails = 0;
  for (const [w, h] of SIZES) for (const [name, file] of Object.entries(PAGES).filter(([n]) => !process.env.QA_PAGES || process.env.QA_PAGES.split(',').includes(n))) for (const v of [1, 2]) {
    const mob = w < 500;
    const ctx = await b.newContext(mob ? { viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : { viewport: { width: w, height: h } });
    const p = await ctx.newPage(); const errs = []; p.on('pageerror', e => errs.push(String(e).slice(0, 140)));
    await p.goto('file:///home/user/CLaude/remodeling/site/' + file); await p.waitForTimeout(1200);
    if (v === 2) { const n = await p.evaluate(() => { let n = 0; document.querySelectorAll('section.sec[id]').forEach(s => { if (s.querySelectorAll(':scope .ver[data-v]').length > 1) { EZ.activate(s.id, 2); n++; } }); return n; }); if (!n) { await ctx.close(); continue; } await p.waitForTimeout(600); }
    await p.evaluate(() => ScrollTrigger.refresh()); await p.waitForTimeout(300);
    const pins = await p.evaluate(() => ScrollTrigger.getAll().filter(t => t.pin && t.pin.isConnected).map((t, i) => { t.vars.__qi = i; t.pin.setAttribute('data-qpin', i); return { i, start: Math.round(t.start), end: Math.round(t.end), sec: (t.pin.closest('section[id]') || t.pin).id || t.pin.className.split(' ')[0] }; }));
    for (const pin of pins) {
      const steps = [], from = Math.max(0, pin.start - 120), to = pin.end + 260;
      let y = from; await p.evaluate(y => scrollTo(0, y), Math.max(0, from - 600)); await p.waitForTimeout(150);
      for (y = Math.max(0, from - 600); y <= to; y += 40) {
        if (mob) await p.evaluate(y => scrollTo(0, y), y); else { const cur = await p.evaluate(() => scrollY); await p.mouse.move(w / 2, h / 2); await p.mouse.wheel(0, y - cur); }
        await p.waitForTimeout(18);
        if (y >= from) steps.push(await p.evaluate(i => { const t = ScrollTrigger.getAll().find(x => x.vars.__qi === i); const el = document.querySelector('[data-qpin="' + i + '"]'); return { y: Math.round(scrollY), top: Math.round(el.getBoundingClientRect().top), pr: +t.progress.toFixed(3) }; }, pin.i));
      }
      await p.waitForTimeout(900);
      const inside = steps.filter(s => s.y > pin.start + 20 && s.y < pin.end - 20), after = steps.filter(s => s.y > pin.end + 60);
      const drift = inside.length ? Math.max(...inside.map(s => s.top)) - Math.min(...inside.map(s => s.top)) : 0;
      const prog = await p.evaluate(i => +ScrollTrigger.getAll().find(x => x.vars.__qi === i).progress.toFixed(3), pin.i);
      const released = after.length >= 2 && after[after.length - 1].top < after[0].top - 20;
      const r = { page: name, w, v, sec: pin.sec, range: pin.end - pin.start, engage: inside.length > 2 && drift < 3, drift, playEnd: prog, release: released, errors: errs.length };
      r.ok = r.engage && prog >= .999 && r.release; if (!r.ok) fails++; R.push(r);
    }
    // no trap: scroll the whole page and reach its end
    const end = await p.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { scrollTo(0, y); await new Promise(r => setTimeout(r, 12)); }
      // keep going to the bottom until the height stops changing (pin spacers settle late), then check the end was reached
      // (late image decodes can grow the page for a few seconds: wait for three equal readings, up to 8 s)
      for (let k = 0, last = -1, same = 0; k < 32 && same < 3; k++) { scrollTo(0, document.documentElement.scrollHeight); await new Promise(r => setTimeout(r, 250)); const s = scrollY + ':' + document.documentElement.scrollHeight; same = s === last ? same + 1 : 0; last = s; }
      const L = window.EZ && EZ.lenis; return { diag: { body: getComputedStyle(document.body).overflow, lenis: L ? { stopped: L.isStopped, scrolling: L.isScrolling, target: Math.round(L.targetScroll), anim: Math.round(L.animatedScroll), limit: Math.round(L.limit) } : null, open: [...document.querySelectorAll('[role=dialog]:not([hidden]), dialog[open]')].map(e => e.className) }, y: Math.round(scrollY), vh: innerHeight, sh: document.documentElement.scrollHeight, ok: Math.ceil(scrollY + innerHeight) >= document.documentElement.scrollHeight - 2 }; });
    if (!end.ok) { fails++; R.push({ page: name, w, v, sec: 'page', trap: true, ok: false, end }); }
    await ctx.close();
  }
  await b.close();
  fs.writeFileSync(`${OUT}/pins.json`, JSON.stringify(R, null, 1));
  const by = {}; R.forEach(r => { const k = r.page + ' ' + r.sec; (by[k] = by[k] || []).push(r); });
  for (const [k, rs] of Object.entries(by)) console.log(k.padEnd(28), rs.map(r => `${r.w}${r.v === 2 ? 'v2' : ''}:${r.ok ? 'ok' : 'FAIL'}${r.ok ? '' : `(engage ${r.engage}, drift ${r.drift}, progress ${r.playEnd}, release ${r.release})`}`).join(' '));
  console.log('pins tested', R.length, '| failures', fails);
})();
