const { chromium } = require('playwright');
const SECS = ['hero', 'proof', 'services', 'work', 'built', 'colour', 'near', 'reviews', 'money', 'book'];
const OUT = process.argv[2];
(async () => { const b = await chromium.launch(); const errs = [];
  for (const [w, h, tag] of [[1440, 900, 'd'], [375, 812, 'm']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, isMobile: tag === 'm', hasTouch: tag === 'm' }); const p = await ctx.newPage();
    p.on('pageerror', e => errs.push(tag + ' ' + e.message)); p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(tag + ' ' + m.text()); });
    for (const s of SECS) for (const v of [1, 2, 3]) {
      await p.goto('file:///home/user/CLaude/siding/homepage-standalone.html?v=' + SECS.map(x => x === s ? v : 1).join(''), { waitUntil: 'load' });
      await p.evaluate(s => { const el = document.getElementById(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 64); }, s);
      await p.waitForTimeout(700); if (tag === 'd') { await p.mouse.move(300, 300); await p.mouse.move(760, 520, { steps: 8 }); } await p.waitForTimeout(500);
      await p.screenshot({ path: `${OUT}/${s}${v}-${tag}.png` });
      const ox = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (ox > 0) errs.push(`${tag} ${s}${v} overflow ${ox}`);
    }
    await ctx.close();
  }
  console.log(errs.length ? errs.join('\n') : 'clean: 60 shots, console 0, no overflow'); await b.close(); })();
