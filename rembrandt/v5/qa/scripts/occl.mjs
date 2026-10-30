// R3 C6 occlusion check: scroll a section in 120px steps (1440x900 and a 620x800 mouse window); at each step the helper
// pill, if shown, must not overlap any control of the section. usage: node occl.mjs <section> <versions>
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const [id, vs = '1,2,3,4,5'] = process.argv.slice(2); const b = await chromium.launch(); const out = [];
for (const [w, h] of [[1440, 900], [620, 800]]) for (const v of vs.split(',')) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  await p.goto(`file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html?v=${id}${v}`); await p.waitForTimeout(1200);
  const [top, height] = await p.evaluate(id => { const s = document.getElementById(id), r = s.getBoundingClientRect(); return [r.top + scrollY, r.height]; }, id);
  let hits = [], steps = 0;
  for (let y = top - h; y < top + height; y += 120) {
    await p.evaluate(y => window.scrollTo(0, y), Math.max(0, y)); await p.waitForTimeout(520); steps++;
    const r = await p.evaluate(id => {
      const pk = document.querySelector('.cmp-pick'); if (!pk || getComputedStyle(pk).display === 'none' || +getComputedStyle(pk).opacity < 0.5) return null;
      const a = pk.getBoundingClientRect(); const s = document.getElementById(id);
      return [...s.querySelectorAll('.stage a[href],.stage button,.stage input:not([type=radio]),.stage label')].filter(e => { const b = e.getBoundingClientRect(); const ox = Math.min(b.right, a.right) - Math.max(b.left, a.left), oy = Math.min(b.bottom, a.bottom) - Math.max(b.top, a.top); return b.width && b.height && ox >= 4 && oy >= 4 && getComputedStyle(e).visibility !== 'hidden'; }) /* a real overlap: >= 4px each way, not an edge contact */.map(e => (e.textContent || e.getAttribute('aria-label') || e.className).trim().slice(0, 16));
    }, id);
    if (r && r.length) hits.push(`y${Math.round(y - top)}:${r.join('/')}`);
  }
  out.push(`${id} v${v} @${w}: ${steps} steps, overlaps ${hits.length ? hits.join(' ') : 0}`);
  await p.close();
}
console.log(out.join('\n')); await b.close();
