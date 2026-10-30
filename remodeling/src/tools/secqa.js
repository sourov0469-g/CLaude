// AUDIT-01 per-section QA: every visible slot (and optionally backups) of one section at 1440x900 and 375x812.
// Shots (section top at the viewport top; heroes at scroll 0) + measures: section height, visible elements,
// console errors, horizontal overflow, and for heroes the overlap between hero content and the fixed mobile bar.
// usage: node secqa.js <section> [slots=1,2,3,4,5] [tag]
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const sec = process.argv[2] || 'hero';
const slots = (process.argv[3] || '1,2,3,4,5').split(',');
const tag = process.argv[4] || 'r';
const OUT = process.env.OUT || '/home/user/CLaude/remodeling/qa/audit01/' + sec;
fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch();
  const rows = [];
  for (const vp of [{ w: 1440, h: 900, m: false, n: 'd' }, { w: 375, h: 812, m: true, n: 'm' }]) {
    for (const v of slots) {
      const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, hasTouch: vp.m, isMobile: vp.m, deviceScaleFactor: 1, reducedMotion: process.env.RM ? 'reduce' : 'no-preference' });
      const p = await ctx.newPage();
      const errs = [];
      p.on('pageerror', e => errs.push(e.message));
      p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
      await p.goto(FILE + '?' + sec + '=' + v);
      await p.waitForTimeout(1300);
      if (sec !== 'hero') {
        await p.evaluate(s => { const el = document.getElementById(s); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 0); }, sec);
        await p.waitForTimeout(1200);
      }
      const m = await p.evaluate(([s, v]) => {
        const el = document.getElementById(s), ver = el.querySelector('.ver[data-v="' + v + '"]');
        const r = el.getBoundingClientRect();
        const vis = [...ver.querySelectorAll('*')].filter(n => { const b = n.getBoundingClientRect(); const cs = getComputedStyle(n); return b.width > 0 && b.height > 0 && cs.visibility !== 'hidden' && +cs.opacity > 0 && !n.closest('svg:not(:root) *') ; }).length;
        let barHit = null;
        const bar = document.querySelector('.mbar');
        if (bar && getComputedStyle(bar).display !== 'none' && s === 'hero') {
          const br = bar.getBoundingClientRect();
          // content = text, buttons and links of the version (not the photo plates, which may run under the bar)
          const items = [...ver.querySelectorAll('h1, p, a, button, input, fieldset')].filter(n => { const b = n.getBoundingClientRect(); return b.width && b.height && !n.closest('[aria-hidden="true"]'); });
          let area = 0, bottom = 0;
          items.forEach(n => { const b = n.getBoundingClientRect(); bottom = Math.max(bottom, b.bottom); const ix = Math.max(0, Math.min(b.right, br.right) - Math.max(b.left, br.left)), iy = Math.max(0, Math.min(b.bottom, br.bottom) - Math.max(b.top, br.top)); area += ix * iy; });
          barHit = { area: Math.round(area), contentBottom: Math.round(bottom), barTop: Math.round(br.top) };
        }
        return { h: Math.round(r.height), vis, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, barHit };
      }, [sec, v]);
      const file = path.join(OUT, `${sec}${v}-${vp.n}-${tag}.jpg`);
      await p.screenshot({ path: file, type: 'jpeg', quality: 60 });
      rows.push(`${sec}${v} ${vp.w}: height ${m.h}, visible elements ${m.vis}, overflow ${m.sw > m.cw ? m.sw - m.cw : 0}` + (m.barHit ? `, bar overlap ${m.barHit.area}px² (content bottom ${m.barHit.contentBottom}, bar top ${m.barHit.barTop})` : '') + `, console ${errs.length}` + (errs.length ? ' ' + JSON.stringify(errs.slice(0, 3)) : ''));
      await ctx.close();
    }
  }
  await b.close();
  fs.writeFileSync(path.join(OUT, `measures-${tag}.txt`), rows.join('\n') + '\n');
  console.log(rows.join('\n'));
})();
