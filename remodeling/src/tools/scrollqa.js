// Whole-page QA: every section x version at 1440 and 375 (+RM): console errors, stuck hidden elements after a full scroll,
// horizontal overflow, pin spacers left behind, em dashes in visible text.
const { chromium } = require('playwright');
const SECS = ['hero','proof','services','ba','process','financing','work','reviews','towns','consult'];
(async () => {
  const b = await chromium.launch();
  const out = [];
  const VPS = process.env.ONLY === 'd' ? [{ w: 1440, h: 900, m: false }] : [{ w: 1440, h: 900, m: false }, { w: 375, h: 812, m: true }];
  for (const vp of VPS) {
    for (const rm of (process.env.NORM ? [false] : [false, true])) {
      for (const v of (process.env.V ? process.env.V.split(',').map(Number) : [1, 2, 3])) {
        const ctx = await b.newContext({ viewport: { width: vp.w, height: vp.h }, hasTouch: vp.m, isMobile: vp.m, reducedMotion: rm ? 'reduce' : 'no-preference' });
        const p = await ctx.newPage();
        const errs = [];
        p.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') errs.push(m.text()); });
        p.on('pageerror', e => errs.push('pageerror ' + e.message));
        await p.goto('file:///home/user/CLaude/remodeling/site/elbaz-homepage.html?' + SECS.map(s => s + '=' + v).join('&'));
        await p.waitForTimeout(700);
        // scroll the whole page slowly so every once-trigger fires
        // walk the page like a visitor; at every stop, anything inside the viewport must have finished revealing
        const H = await p.evaluate(() => document.documentElement.scrollHeight);
        const badAll = new Set();
        for (let y = 0; y < H; y += Math.round(vp.h * .7)) {
          await p.evaluate(y => window.scrollTo(0, y), y);
          await p.waitForTimeout(650);
          (await p.evaluate(() => {
            const bad = [];
            document.querySelectorAll('main .ver:not([hidden]) *').forEach(el => {
              const cs = getComputedStyle(el), r = el.getBoundingClientRect();
              if (r.bottom < 60 || r.top > innerHeight * .8 || r.width === 0) return;   // the lowest fifth may still be waiting for its trigger
              if ((cs.visibility === 'hidden' || +cs.opacity === 0) && (el.style.visibility === 'hidden' || el.style.opacity === '0') && !el.closest('[aria-hidden="true"]') && !el.closest('svg') && !el.closest('[hidden]'))
                bad.push(el.closest('section').id + ':' + ((el.className && el.className.baseVal === undefined ? el.className : el.tagName) + '').slice(0, 40));
            });
            return bad;
          })).forEach(x => badAll.add(x));
        }
        await p.waitForTimeout(500);
        const r = await p.evaluate(() => {
          const bad = [];
          const txt = document.body.innerText;
          return { stuck: bad, overflow: document.documentElement.scrollWidth - innerWidth, spacers: document.querySelectorAll('.pin-spacer').length,
                   emdash: (txt.match(/—/g) || []).length, h: document.documentElement.scrollHeight };
        });
        out.push(`${vp.w}${rm ? ' RM' : ''} v${v}: stuck=${JSON.stringify([...badAll].slice(0, 12))} overflow=${r.overflow} spacers=${r.spacers} emdash=${r.emdash} H=${r.h} errs=${errs.length ? JSON.stringify(errs.slice(0, 4)) : 0}`);
        await ctx.close();
      }
    }
  }
  console.log(out.join('\n'));
  await b.close();
})();
