// usage: node shoot.js <section> [versions=1,2,3] [extra-scroll-fractions]
// screenshots each version at 1440x900 and 375x812, logs console errors
const { chromium } = require('playwright');
const path = require('path');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const OUT = process.env.OUT || path.join(__dirname, 'shots');
require('fs').mkdirSync(OUT, { recursive: true });

(async () => {
  const sec = process.argv[2] || 'hero';
  const vers = (process.argv[3] || '1,2,3').split(',');
  const scrolls = (process.argv[4] || '0').split(',').map(Number);
  const theme = process.env.THEME || '';
  const browser = await chromium.launch();
  const errors = [];
  for (const vp of [{ w: 1440, h: 900, n: 'd' }, { w: 375, h: 812, n: 'm' }]) {
    for (const v of vers) {
      const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h }, deviceScaleFactor: 1,
        reducedMotion: process.env.RM ? 'reduce' : 'no-preference', hasTouch: vp.n === 'm', isMobile: vp.n === 'm' });
      const page = await ctx.newPage();
      page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${sec}${v} ${vp.n}] ${m.type()}: ${m.text()}`); });
      page.on('pageerror', e => errors.push(`[${sec}${v} ${vp.n}] pageerror: ${e.message}`));
      if (theme) await ctx.addInitScript(t => { try { localStorage.setItem('ez-theme', t); } catch (e) {} }, theme);
      await page.goto(`${FILE}?${sec}=${v}`);
      if (process.env.EARLY) {
        for (const t of process.env.EARLY.split(',')) {
          await page.waitForTimeout(+t);
          await page.screenshot({ path: path.join(OUT, `${sec}${v}-${vp.n}-early${t}.png`) });
        }
      }
      await page.waitForTimeout(400);
      // bring the section into view
      await page.evaluate(id => { const el = document.getElementById(id); if (el) window.scrollTo(0, el.getBoundingClientRect().top + scrollY); }, sec);
      await page.waitForTimeout(1800);
      if (vp.n === 'd') await page.mouse.move(vp.w * .62, vp.h * .4, { steps: 8 });
      await page.waitForTimeout(500);
      for (const f of scrolls) {
        if (f) {
          await page.evaluate(([id, f]) => { const el = document.getElementById(id); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + innerHeight * f); }, [sec, f]);
          await page.waitForTimeout(1600);
        }
        const name = `${sec}${v}-${vp.n}${f ? '-s' + f : ''}${theme ? '-' + theme : ''}${process.env.RM ? '-rm' : ''}.png`;
        await page.screenshot({ path: path.join(OUT, name) });
      }
      await ctx.close();
    }
  }
  await browser.close();
  console.log(errors.length ? errors.join('\n') : 'console clean');
})();
