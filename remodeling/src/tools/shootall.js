// usage: FILE=file:///... OUT=dir [TAG=x] [RM=1] node shootall.js [sections] [versions]
// one screenshot per section x version at 1440x900 and 375x812 (section top + 0.5 viewport), JPEG, plus console log
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const OUT = process.env.OUT || '/tmp/shots';
fs.mkdirSync(OUT, { recursive: true });
const SECS = (process.argv[2] || 'hero,proof,services,ba,process,financing,work,reviews,towns,consult').split(',');
const VERS = (process.argv[3] || '1,2,3').split(',');
(async () => {
  const browser = await chromium.launch();
  const errors = [];
  for (const vp of [{ w: 1440, h: 900, n: 'd' }, { w: 375, h: 812, n: 'm' }]) {
    for (const v of VERS) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1,
        reducedMotion: process.env.RM ? 'reduce' : 'no-preference', hasTouch: vp.n === 'm', isMobile: vp.n === 'm' });
      const page = await ctx.newPage();
      page.on('console', m => { if (m.type() === 'error') errors.push(`[v${v} ${vp.n}] ${m.text()}`); });
      page.on('pageerror', e => errors.push(`[v${v} ${vp.n}] pageerror: ${e.message}`));
      await page.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
      await page.waitForTimeout(1200);
      for (const sec of SECS) {
        const y = await page.evaluate(id => { const el = document.getElementById(id); return el ? el.getBoundingClientRect().top + scrollY : -1; }, sec);
        if (y < 0) continue;
        // walk down to it so scroll-driven reveals fire in order
        await page.evaluate(y => window.scrollTo(0, y), y);
        await page.waitForTimeout(1400);
        if (vp.n === 'd') await page.mouse.move(vp.w * .6, vp.h * .45, { steps: 6 });
        await page.waitForTimeout(500);
        const off = sec === 'hero' ? 0 : Math.round(vp.h * .35);
        if (off) { await page.evaluate(([y, o]) => window.scrollTo(0, y + o), [y, off]); await page.waitForTimeout(1300); }
        await page.screenshot({ path: path.join(OUT, `${sec}${v}-${vp.n}.jpg`), type: 'jpeg', quality: 55 });
      }
      await ctx.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(OUT, 'console.txt'), errors.join('\n') || 'console clean');
  console.log(errors.length ? errors.slice(0, 20).join('\n') : 'console clean');
})();
