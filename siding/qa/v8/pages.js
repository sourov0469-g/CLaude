// Inner pages: every section's tabs 1-5 open without console errors; backups open (record links resolve to a
// section on the earlier page); and a light check on every visible version.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const PAGES = (process.argv[2] || 'siding,windows,roofing,outdoor,projects,financing,about,contact').split(',');
(async () => {
  const b = await chromium.launch(); let bad = 0, opened = 0, dark = 0;
  for (const pg of PAGES) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto('file://' + path.resolve(__dirname, `../../${process.env.STANDALONE ? pg + '-standalone' : 'site/' + pg}.html`)); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 20000 });
    const secs = await p.evaluate(() => [...document.querySelectorAll('.sec')].map(s => ({ id: s.id, n: s.querySelectorAll('.vsw-b').length, rec: [...document.querySelectorAll(`.pk-bk[data-for="${s.id}"] a`)].map(a => a.getAttribute('href')) })));
    const row = [];
    for (const s of secs) {
      for (let v = 1; v <= s.n; v++) {
        errs.length = 0;
        const r = await p.evaluate(([id, v]) => { const sec = document.getElementById(id); sec.querySelector(`.vsw-b[data-v="${v}"]`).click(); sec.scrollIntoView(); return new Promise(res => setTimeout(() => {
          const lum = c => { const m = c.match(/[\d.]+/g); if (!m) return 1; let [r, g, b2, a = 1] = m.map(Number); if (c.startsWith('color(')) { r *= 255; g *= 255; b2 *= 255; } if (a < .5) return 1; const f = x => { x /= 255; return x <= .03928 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4; }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b2); };
          let dk = 0; for (const el of sec.querySelectorAll('*')) { if (/^(IMG|CANVAS|VIDEO)$/.test(el.tagName) || el.closest('svg')) continue; const c = getComputedStyle(el); if (c.display === 'none') continue; if (/--c|background/.test((el.getAttribute('style') || '') + (el.parentElement && el.parentElement.getAttribute('style') || ''))) continue; const rc = el.getBoundingClientRect(); if (Math.min(rc.width, rc.height) <= 3) continue; if (lum(c.backgroundColor) < .05) dk++; }
          res({ v: +sec.dataset.v, kids: sec.querySelector('.stage').children.length, dk, over: document.documentElement.scrollWidth > innerWidth });
        }, 300)); }, [s.id, v]);
        const broken = await p.evaluate(async id => { const imgs = [...document.getElementById(id).querySelectorAll('.stage img')]; imgs.forEach(i => { i.loading = 'eager'; }); await Promise.all(imgs.map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; setTimeout(r, 4000); }))); return imgs.filter(i => !i.naturalWidth).map(i => i.getAttribute('src')); }, s.id);
        if (broken.length) { bad++; row.push(`${s.id}:${v} broken images ${broken.slice(0, 3).join(', ')}`); }
        const ok = r.v === v && r.kids > 0 && !errs.length && !r.over;
        opened += ok; dark += r.dk; if (!ok) { bad++; row.push(`${s.id}:${v} FAIL ${JSON.stringify(r)} ${errs.slice(0, 1)}`); }
        if (r.dk) row.push(`${s.id}:${v} dark ${r.dk}`);
      }
      for (const href of s.rec) { const [file, hash] = href.split('#'); const html = fs.readFileSync(path.resolve(__dirname, '../../site/' + file.replace(/^site\//, '')), 'utf8'); const ok = html.includes(`id="${hash}"`); opened += ok; if (!ok) { bad++; row.push(`${s.id} backup ${href} missing`); } }
    }
    console.log(pg.padEnd(10), 'sections', secs.length, '| versions', secs.reduce((a, s) => a + s.n, 0), '| backups', secs.reduce((a, s) => a + s.rec.length, 0), row.length ? '\n   ' + row.join('\n   ') : '');
    await p.close();
  }
  console.log('opened', opened, 'failed', bad, 'dark', dark); await b.close();
})();
