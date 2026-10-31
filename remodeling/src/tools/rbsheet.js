// REBRAND review: one 1440x900 shot per section x visible version (section top at the viewport top), for contact sheets.
// usage: FILE=... OUT=dir node rbsheet.js sec1,sec2 1,2,3,4,5
const { chromium } = require('playwright'); const fs = require('fs');
const FILE = process.env.FILE, OUT = process.env.OUT; fs.mkdirSync(OUT, { recursive: true });
const SECS = process.argv[2].split(','), VERS = process.argv[3].split(',');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(FILE); await p.waitForTimeout(1500);
  for (const s of SECS) for (const v of VERS) {
    await p.evaluate(([s, v]) => EZ.activate(s, v), [s, v]); await p.waitForTimeout(350);
    await p.evaluate(s => { const el = document.getElementById(s); scrollTo(0, el.getBoundingClientRect().top + scrollY); }, s); await p.waitForTimeout(450);
    await p.screenshot({ path: `${OUT}/${s}-${v}.jpg`, type: 'jpeg', quality: 70 });
  }
  console.log('shots', SECS.length * VERS.length, 'errors', errs.length, errs.slice(0, 3)); await b.close();
})();
