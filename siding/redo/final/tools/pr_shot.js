const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final-roofing.html#/roofing';
const O = '/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/r/';
(async () => { require('fs').mkdirSync(O, { recursive: true }); const b = await chromium.launch(); const w = +(process.argv[2] || 1440);
  const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.stack || e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(800);
  const ids = ['roofing-top', 'roofing-two', 'roofing-pitch', 'roofing-gaf', 'roofing-storm', 'roofing-pair', 'roofing-close'];
  for (const id of ids) { await p.evaluate((i) => { const e = document.getElementById(i); scrollTo({ top: scrollY + e.getBoundingClientRect().top - 40, behavior: 'instant' }); }, id); await p.waitForTimeout(id === 'roofing-top' || id === 'roofing-pair' ? 4000 : 2600); await p.screenshot({ path: O + `${w}-${id}.png` }); }
  console.log('errs', errs); await b.close(); })();
