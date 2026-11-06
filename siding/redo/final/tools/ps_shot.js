const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final-siding.html#/siding';
const O = '/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/s/';
(async () => { const b = await chromium.launch(); const w = +(process.argv[2] || 1440);
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const ids = ['siding-top', 'siding-lap', 'siding-board-batten', 'siding-shingle-shake', 'siding-trim-soffit', 'siding-wall', 'siding-cost', 'siding-before-after', 'siding-close'];
  for (const id of ids) { await p.evaluate((i) => { const e = document.getElementById(i); scrollTo({ top: scrollY + e.getBoundingClientRect().top - 60, behavior: 'instant' }); }, id); await p.waitForTimeout(id === 'siding-lap' ? 3200 : 1700); await p.screenshot({ path: O + `${w}-${id}.png` }); }
  console.log('errs', errs); await b.close(); })();
