import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html'; const b = await chromium.launch(); const out = [];
// V1: formation at >= 50% in view, then held when scrolled back up half way
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); await p.goto(F + '?v=proof1'); await p.waitForTimeout(1200);
  const px = () => p.evaluate(() => { const c = document.querySelector('.pv1-cv'); const g = c.getContext('2d'); const d = g.getImageData(c.width * 0.55, c.height * 0.2, c.width * 0.4, c.height * 0.5).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i] > 120) n++; return n; });
  const top = await p.evaluate(() => document.getElementById('proof').getBoundingClientRect().top + scrollY);
  await p.evaluate(t => scrollTo(0, t - 700), top); await p.waitForTimeout(900); const a = await px();
  await p.evaluate(t => scrollTo(0, t - 300), top); await p.waitForTimeout(2200); const bb = await px();
  await p.evaluate(t => scrollTo(0, t - 760), top); await p.waitForTimeout(1200); const cc = await px();
  out.push(`V1 glyph-region ink pixels: 22% in view ${a}, >=50% in view after 2.2s ${bb}, scrolled back to 15% ${cc} (held if ~equal to formed)`);
}
// V2: star clip, mobile height; V3: roll duration and still numbers
{ const p = await (await b.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true })).newPage(); await p.goto(F); await p.waitForTimeout(1200);
  out.push('V2 clip ' + await p.evaluate(() => document.querySelector('#pv2-c rect').getAttribute('width')) + '/120; height @375 ' + await p.evaluate(() => Math.round(document.getElementById('proof').getBoundingClientRect().height)));
}
{ const p = await (await b.newContext({ viewport: { width: 1440, height: 900 } })).newPage(); await p.goto(F + '?v=proof3'); await p.waitForTimeout(1200);
  const top = await p.evaluate(() => document.getElementById('proof').getBoundingClientRect().top + scrollY);
  await p.evaluate(t => scrollTo(0, t), top);
  const t0 = Date.now(); let settled = 0, seenBlur = false;
  for (let k = 0; k < 40; k++) { const s = await p.evaluate(() => { const st = [...document.querySelectorAll('.pv3-stat--xl .pv3-strip')]; return { blur: st.some(x => x.style.filter), tr: st.map(x => x.style.transform).join('|') }; }); if (s.blur) seenBlur = true; if (k && s.tr === settled) { out.push(`V3 4.9/295 settled within ~${Date.now() - t0}ms (poll), blur seen while moving: ${seenBlur}`); break; } settled = s.tr; await p.waitForTimeout(60); }
  out.push('V3 still numbers: ' + await p.evaluate(() => [...document.querySelectorAll('.pv3-roll[data-still]')].map(e => e.textContent.replace(/\s+/g, '')).join(' ')));
}
console.log(out.join('\n')); await b.close();
