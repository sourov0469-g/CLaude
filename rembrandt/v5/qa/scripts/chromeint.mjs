// Chrome reactions R01-R06 (nav Call, nav logo, bar Call, bar estimate, footer logo, footer phone): hover and press.
import { createRequire } from 'node:module'; const require = createRequire(import.meta.url); const { chromium } = require('playwright');
const FILE = 'file:///home/user/CLaude/rembrandt/v5/rembrandt-homepage.html';
const b = await chromium.launch(); const out = []; const errs = [];
const run = async (w, h, items) => {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage(); p.on('pageerror', e => errs.push(e.message));
  await p.goto(FILE); await p.waitForTimeout(900);
  for (const [id, sel, hp, pp] of items) {
    const r = await p.evaluate(s => { const e = document.querySelector(s); if (e.closest('.nav,.mbar')) scrollTo(0, 2500); else e.scrollIntoView({ block: 'center' }); // fixed chrome is quiet over the hero, so test it mid-page
      const b = e.getBoundingClientRect(); return [b.left + b.width / 2, b.top + b.height / 2]; }, sel); await p.waitForTimeout(400);
    await p.mouse.move(r[0], r[1], { steps: 4 }); await p.waitForTimeout(400);
    const hv = await p.evaluate(([s, q]) => { const e = document.querySelector(s + ' ' + q[0]); const c = getComputedStyle(e); return q[1] + '=' + c[q[1]]; }, [sel, hp]);
    await p.mouse.down(); await p.waitForTimeout(80);
    const pr = await p.evaluate(([s, q]) => getComputedStyle(document.querySelector(s + ' ' + q)).animationName, [sel, pp]);
    await p.mouse.move(r[0], r[1] - 300); await p.mouse.up(); await p.waitForTimeout(100);
    out.push(`${id} @${w}: hover ${hv}; press ${pr}`);
  }
};
await run(1440, 900, [['R01 nav Call', '.nav .ch-call', ['.ch-vent', 'clipPath'], '.ch-vent-sl'], ['R02 nav logo', '.ch-home', ['.ch-dormer', 'opacity'], '.ch-d-pane'], ['R05 footer logo', '.ch-up', ['.ch-ladder', 'opacity'], '.ch-l-rung'], ['R06 footer phone', '.ch-ftel', ['.ch-bead path', 'strokeDashoffset'], '.ch-bead']]);
await run(375, 812, [['R03 bar Call', '.ch-bcall', ['.ch-nail', 'opacity'], '.ch-n'], ['R04 bar estimate', '.ch-est', ['.ch-rl', 'opacity'], '.ch-ul']]);
out.push('errors: ' + (errs.length ? errs.join(' | ') : 0)); console.log(out.join('\n')); await b.close();
