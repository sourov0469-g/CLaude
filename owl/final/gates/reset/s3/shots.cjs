// Section 3 evidence: frames through the pinned scrub (forward then back), with the film's currentTime per frame
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const F = 'file://' + path.resolve(__dirname, '../../../owl-reset.html'), DSF = +(process.argv[2] || 1);
(async () => { const b = await chromium.launch(); const errs = [], log = {};
  for (const pal of ['night', 'safety']) for (const [w, h] of [[1440, 900], [390, 844]]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: DSF }); p.on('pageerror', e => errs.push(e.message));
    await p.goto(F + '?palette=' + pal); await p.mouse.move(w - 3, h / 2); await p.waitForTimeout(1200);
    await p.evaluate(() => document.getElementById('finder').scrollIntoView({ block: 'start', behavior: 'instant' })); await p.waitForTimeout(500);
    await p.click('#finder .pill >> nth=0'); await p.waitForTimeout(1500);
    const seq = [.1, .3, .5, .7, .9, .5]; log[pal + w] = [];
    for (let i = 0; i < seq.length; i++) {
      await p.evaluate(f => { const s = document.getElementById('nothing'); scrollTo(0, s.offsetTop + (s.offsetHeight - innerHeight) * f); }, seq[i]); await p.waitForTimeout(1100);
      const t = await p.evaluate(() => { const s = document.getElementById('nothing'), v = s.querySelector('video'); return { beat: s.dataset.beat, t: +v.currentTime.toFixed(2), d: +(v.duration || 0).toFixed(2), first: s.querySelector('.bt b').textContent }; });
      log[pal + w].push(Object.assign({ f: seq[i] }, t));
      await p.screenshot({ path: path.join(__dirname, `${pal}-${w}-${i + 1}-p${Math.round(seq[i] * 100)}.jpg`), type: 'jpeg', quality: 80 });
    }
    await p.close(); }
  fs.writeFileSync(path.join(__dirname, 'scrub-log.json'), JSON.stringify(log, null, 1));
  console.log(JSON.stringify(log.night1440)); console.log(errs.length ? 'ERRORS ' + errs.join(' | ') : 'no errors'); await b.close(); })();
