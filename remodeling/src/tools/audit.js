// Phase 1 audit measures per version (1440x900): is it a document?
//  prose   = words of running text OUTSIDE the centrepiece (headings, controls, labels and SVG text excluded)
//  share   = centrepiece area / version area
//  ctrls   = interactive controls inside the centrepiece
//  ptr     = DOM mutations inside the version while the pointer sweeps the centrepiece (reactive to the cursor)
//  scroll  = DOM mutations inside the version while the page scrolls through it (scroll-driven)
const { chromium } = require('playwright');
const FILE = process.env.FILE || 'file:///home/user/CLaude/remodeling/site/elbaz-homepage.html';
const CENTRE = {
  hero1: '.hero1__plate', hero2: '.hero2__band', hero3: '.hero3__rig',
  proof1: '.proof1__paper', proof2: '.proof2__plate', proof3: '.proof3__plan',
  services1: '.services1__grid', services2: '.services2__stack', services3: '.services3__wall',
  ba1: '.ba1__stage', ba2: '.ba2__grid', ba3: '.ba3__stage',
  process1: '.process1__route', process2: '.process2__svg', process3: '.process3__tape',
  financing1: '.financing1__row', financing2: '.financing2__rig', financing3: '.financing3__stage',
  work1: '.work1__grid', work2: '.work2__stage', work3: '.work3__belts',
  reviews1: '.reviews1__book', reviews2: '.reviews2__sky', reviews3: '.reviews3__dial',
  towns1: '.towns1__map', towns2: '.towns2__stage', towns3: '.towns3__sign',
  consult1: '.consult1__board', consult2: '.consult2__form', consult3: '.consult3__num'
};
const SECS = ['hero', 'proof', 'services', 'ba', 'process', 'financing', 'work', 'reviews', 'towns', 'consult'];
(async () => {
  const b = await chromium.launch();
  const rows = [];
  for (const v of [1, 2, 3]) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
    await p.goto(FILE + '?' + SECS.map(s => s + '=' + v).join('&'));
    await p.waitForTimeout(1500);
    const H = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < H; y += 700) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(80); }
    for (const s of SECS) {
      const id = s + v, sel = CENTRE[id];
      const base = await p.evaluate(([s, sel]) => {
        const ver = document.querySelector('#' + s + ' .ver:not([hidden])'), c = ver.querySelector(sel);
        // rendered prose only: closed accordions, visually-hidden text and anything not laid out do not count
        const skip = n => n.closest('h1,h2,h3,button,a,label,svg,canvas,.btn,input,textarea,select,[aria-hidden="true"],.sr-only,summary') || (c && c.contains(n)) || (n.closest('details') && !n.closest('details').open) || !n.getClientRects().length;
        const w = document.createTreeWalker(ver, NodeFilter.SHOW_TEXT);
        let words = 0, n;
        while ((n = w.nextNode())) { const el = n.parentElement; if (skip(el)) continue; words += (n.nodeValue.trim().match(/\S+/g) || []).length; }
        const vr = ver.getBoundingClientRect(), cr = c ? c.getBoundingClientRect() : { width: 0, height: 0 };
        const ctrls = c ? c.querySelectorAll('a[href],button,input,select,textarea,[tabindex="0"],[role="slider"],[role="radio"]').length + (c.matches('button,a,[tabindex="0"]') ? 1 : 0) : 0;
        return { words, share: +(cr.width * cr.height / (vr.width * vr.height)).toFixed(2), ctrls, found: !!c, verTop: vr.top + scrollY, verH: vr.height };
      }, [s, sel]);
      // pointer sweep across the centrepiece
      let ptr = 0, scroll = 0;
      if (base.found) {
        await p.evaluate(([s, sel]) => { const c = document.querySelector('#' + s + ' .ver:not([hidden]) ' + sel); const r = c.getBoundingClientRect(); window.scrollTo(0, r.top + scrollY - 120); }, [s, sel]);
        await p.waitForTimeout(700);
        await p.evaluate(s => { window.__m = 0; window.__mo && window.__mo.disconnect(); const ver = document.querySelector('#' + s + ' .ver:not([hidden])'); window.__mo = new MutationObserver(l => { l.forEach(m => { if (!(m.target.closest && m.target.closest('.rx'))) window.__m++; }); }); window.__mo.observe(ver, { subtree: true, attributes: true, childList: true, characterData: true }); }, s);
        await p.waitForTimeout(400);
        const idle = await p.evaluate(() => window.__m);       // ambient motion counted separately
        const r = await p.evaluate(([s, sel]) => { const c = document.querySelector('#' + s + ' .ver:not([hidden]) ' + sel).getBoundingClientRect(); return [c.left, Math.max(c.top, 60), c.width, Math.min(c.height, 800)]; }, [s, sel]);
        await p.evaluate(() => { window.__m = 0; });
        for (let i = 0; i <= 8; i++) await p.mouse.move(r[0] + r[2] * (i / 8), r[1] + r[3] * (.3 + .4 * (i % 2)), { steps: 3 });
        await p.waitForTimeout(300);
        ptr = await p.evaluate(() => window.__m) - Math.round(idle * 1.5);
        await p.mouse.move(2, 450);
        await p.evaluate(() => { window.__m = 0; });
        for (let y = base.verTop - 900; y < base.verTop + base.verH; y += 150) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
        scroll = await p.evaluate(() => window.__m);
        base.idle = idle;
      }
      rows.push({ id, ...base, ptr: Math.max(0, ptr), scroll });
    }
    await p.close();
  }
  await b.close();
  console.log('version    prose  share  ctrls  ptr   scroll  idle');
  rows.forEach(r => console.log(r.id.padEnd(11), String(r.words).padStart(5), String(r.share).padStart(6), String(r.ctrls).padStart(6), String(r.ptr).padStart(5), String(r.scroll).padStart(7), String(r.idle).padStart(5), r.found ? '' : 'CENTRE NOT FOUND'));
  if (process.env.OUT) require('fs').writeFileSync(process.env.OUT, JSON.stringify(rows, null, 1));
})();
