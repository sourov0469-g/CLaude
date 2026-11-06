const { chromium } = require('playwright');
const F = 'file:///home/user/CLaude/siding/redo/final/out/final-roofing.html#/roofing';
const O = '/tmp/claude-0/-home-user-CLaude/a0d00027-7873-5f85-99e1-904cc4a5c13d/scratchpad/r/';
(async () => { const b = await chromium.launch(); const w = +(process.argv[2] || 1440);
  const p = await (await b.newContext({ viewport: { width: w, height: 1000 } })).newPage(); const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(F, { waitUntil: 'load' }); await p.waitForTimeout(600);
  for (const s of process.argv.slice(3)) { const [q, name, act] = s.split('|'); await p.evaluate((q) => { const e = document.querySelector(q); scrollTo({ top: scrollY + e.getBoundingClientRect().top - 120, behavior: 'instant' }); }, q); await p.waitForTimeout(3200);
    if (act) { for (const a of act.split(';')) { await p.click(a); await p.waitForTimeout(900); } }
    const el = await p.$(q); await el.screenshot({ path: O + name + '.png' }); }
  console.log(errs); await b.close(); })();
