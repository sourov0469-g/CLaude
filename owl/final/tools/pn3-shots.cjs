// Protect V3 evidence: viewport shots with each step centred (the plan is sticky). node pn3-shots.cjs [dsf] [outdir] [steps]
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const DSF = +(process.argv[2] || 1); const OUT = path.resolve(__dirname, '..', process.argv[3] || 'gates/wip'); fs.mkdirSync(OUT, { recursive: true });
const STEPS = (process.argv[4] || '2,4,6').split(',').map(Number);
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html') + '?wrap=3';
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });
    p.on('pageerror', e => errs.push(w + ' pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(w + ' console: ' + m.text()); });
    await p.route('https://**', r => r.abort()); await p.goto(F); await p.waitForTimeout(1000);
    await p.addStyleTag({ content: '.hdr{visibility:hidden}' });
    for (const s of STEPS) {
      await p.evaluate(s => { const e = document.querySelector('.wrap3 .step[data-s="' + s + '"]'), r = e.getBoundingClientRect(); const mob = innerWidth <= 900; scrollTo({ top: scrollY + r.top + r.height / 2 - innerHeight * (mob ? .74 : .5), behavior: 'instant' }); }, s);
      await p.waitForTimeout(s === 4 ? 4200 : 1800);
      const cur = await p.evaluate(() => (document.querySelector('.wrap3 .rail [aria-current]') || {}).textContent);
      if (+cur !== s) errs.push(w + ' step ' + s + ' shows ' + cur);
      await p.screenshot({ path: path.join(OUT, `wrap-v3-s${s}-${w}.jpg`), quality: 82, type: 'jpeg', timeout: 60000 });
    }
    const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) errs.push(w + ' overflow ' + o + 'px');
    await p.close();
  }
  console.log(errs.length ? [...new Set(errs)].join('\n') : 'no errors'); await b.close();
})();
