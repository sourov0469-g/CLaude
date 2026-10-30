// node vis.js <fileurl> <width>  — every live text in each version must be VISIBLE after its entrance has had its
// chance: (down) scroll from the top past the section, then back to it; (up) jump below and scroll up into it;
// (rm) reduced motion. Invisible = effective opacity < 0.15, visibility hidden, or a heading word still outside its mask.
const { chromium } = require('playwright');
const SECS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book'];
const [URL, W] = [process.argv[2], +process.argv[3] || 1440];
(async () => {
  const b = await chromium.launch(); const out = []; const errs = [];
  for (const mode of ['down', 'up', 'rm']) {
    const ctx = await b.newContext({ viewport: { width: W, height: W < 600 ? 812 : 900 }, reducedMotion: mode === 'rm' ? 'reduce' : 'no-preference', isMobile: W < 600, hasTouch: W < 600 });
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    for (const s of SECS) for (const v of [1, 2, 3]) {
      await p.goto(`${URL}?v=${SECS.map(x => x === s ? v : 1).join('')}`, { waitUntil: 'load' }); await p.waitForTimeout(300);
      const top = await p.evaluate(s => document.getElementById(s).getBoundingClientRect().top + scrollY, s);
      if (mode === 'up') { await p.evaluate(y => window.scrollTo(0, y), top + 2600); await p.waitForTimeout(300); for (let y = top + 2600; y > top - 80; y -= 300) { await p.mouse.wheel(0, -300); await p.waitForTimeout(60); } }
      else { for (let y = 0; y < top + 1400; y += 350) { await p.mouse.wheel(0, 350); await p.waitForTimeout(50); } await p.evaluate(y => window.scrollTo(0, y), top - 70); }
      await p.waitForTimeout(900);
      const bad = await p.evaluate(s => {
        const stage = document.querySelector(`#${s} .stage`), res = [];
        const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
        const seen = new Set();
        while (walker.nextNode()) {
          const t = walker.currentNode; if (!t.textContent.trim()) continue;
          const el = t.parentElement; if (!el || seen.has(el)) continue; seen.add(el);
          if (el.closest('[hidden], [aria-hidden="true"], .sr-only, svg, template, script, style, noscript, [inert]')) continue;
          const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
          let op = 1, e = el, hid = false;
          while (e && e !== document.body) { const cs = getComputedStyle(e); op *= +cs.opacity; if (cs.visibility === 'hidden') hid = true; e = e.parentElement; }
          let masked = false;
          if (el.classList.contains('w') && el.parentElement.classList.contains('wm')) { const m = el.parentElement.getBoundingClientRect(); masked = r.top >= m.bottom - 1 || r.bottom <= m.top + 1; }
          if (op < 0.15 || hid || masked) res.push(`"${t.textContent.trim().slice(0, 30)}" op ${op.toFixed(2)}${hid ? ' hidden' : ''}${masked ? ' masked' : ''}`);
        }
        return res;
      }, s);
      out.push(`${bad.length ? 'FAIL' : 'PASS'} ${mode} ${s}${v}${bad.length ? ': ' + bad.slice(0, 4).join(' | ') + (bad.length > 4 ? ` (+${bad.length - 4})` : '') : ''}`);
    }
    await ctx.close();
  }
  console.log(out.join('\n')); console.log(`SUMMARY vis ${W}: PASS ${out.filter(x => x.startsWith('PASS')).length} FAIL ${out.filter(x => x.startsWith('FAIL')).length} | page errors ${errs.length ? errs.join(' | ') : 0}`);
  await b.close();
})();
