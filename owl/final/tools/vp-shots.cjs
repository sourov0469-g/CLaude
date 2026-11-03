// Viewport evidence for scroll-driven or sticky sections: node vp-shots.cjs <sec> <v> <fractions e.g. 0.2,0.8> [dsf] [outdir]
// Scrolls so that the given fraction of the section sits at the viewport centre, waits, takes a viewport shot.
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const [sec, v, fr, dsfArg, outArg] = process.argv.slice(2); const DSF = +(dsfArg || 1); const FR = (fr || '0.3').split(',').map(Number);
const OUT = path.resolve(__dirname, '..', outArg || 'gates/wip'); fs.mkdirSync(OUT, { recursive: true });
const F = 'file://' + path.resolve(__dirname, '../owl-roofing.html') + '?' + sec + '=' + v;
(async () => {
  const b = await chromium.launch(); const errs = [];
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF });
    p.on('pageerror', e => errs.push(w + ' pageerror: ' + e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(w + ' console: ' + m.text()); });
    await p.route('https://**', r => r.abort()); await p.goto(F); await p.waitForTimeout(1000);
    await p.addStyleTag({ content: '.hdr{visibility:hidden}' });
    const sel = `.ver[data-sec="${sec}"][data-v="${v}"]`;
    for (const f of FR) {
      await p.evaluate(([s, f]) => { const r = document.querySelector(s).getBoundingClientRect(); scrollTo({ top: scrollY + r.top + r.height * f - innerHeight / 2, behavior: 'instant' }); }, [sel, f]);
      await p.waitForTimeout(+(process.env.WAIT || 1800));
      await p.screenshot({ path: path.join(OUT, `${sec}-v${v}-f${Math.round(f * 100)}-${w}.jpg`), quality: 82, type: 'jpeg', timeout: 60000 });
    }
    const o = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth); if (o > 0) errs.push(w + ' overflow ' + o + 'px');
    await p.close();
  }
  console.log(errs.length ? [...new Set(errs)].join('\n') : 'no errors'); await b.close();
})();
