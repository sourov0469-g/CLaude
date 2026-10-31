// REBRAND gate, logo: the course-gable mark in the header and the footer of every page, the favicon is the new
// favicon mark, the name is exactly "Austin Pro", and the old mark survives only inside hidden backups.
// NODE_PATH=$(npm root -g) node qa/v9/logo.js   (STANDALONE=1 checks the packed files)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const PAGES = ['index', 'siding', 'windows', 'roofing', 'outdoor', 'projects', 'financing', 'about', 'contact'];
const NEW = 'M25.35 13.72L38.65 13.72L43.06 22.84L20.94 22.84Z', OLD = 'M3.50 40.00L32.00 4.50';
const FAV = fs.readFileSync(path.resolve(__dirname, '../../site/assets/img/brand/2026-10-31/favicon.svg'), 'utf8').trim();
const file = pg => path.resolve(__dirname, '../../' + (process.env.STANDALONE ? (pg === 'index' ? 'homepage' : pg) + '-standalone.html' : 'site/' + pg + '.html'));
(async () => {
  const b = await chromium.launch(); let bad = 0;
  for (const pg of PAGES) {
    const p = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await p.goto('file://' + file(pg)); await p.waitForFunction(() => document.documentElement.dataset.apReady === '1', null, { timeout: 30000 });
    const r = await p.evaluate(async ([NEW, OLD]) => {
      const has = (el, d) => !!el && [...el.querySelectorAll('svg.brand-mark path')].some(x => x.getAttribute('d').startsWith(d));
      const link = document.querySelector('link[rel="icon"]');
      let fav = link.href;
      if (fav.startsWith('data:')) { const [h, body] = fav.split(','); fav = /base64/.test(h) ? atob(body) : decodeURIComponent(body); } else fav = 'FILE:' + link.getAttribute('href');
      const liveOld = [...document.querySelectorAll('svg.brand-mark')].filter(s => !s.closest('[data-bk], template') && [...s.querySelectorAll('path')].some(x => x.getAttribute('d').startsWith(OLD))).length;
      return { header: has(document.querySelector('header'), NEW), footer: has(document.querySelector('footer.ft'), NEW), name: [...document.querySelectorAll('header .brand-n, footer.ft .brand-n')].map(x => x.textContent), fav, liveOld };
    }, [NEW, OLD]);
    if (r.fav.startsWith('FILE:')) r.fav = fs.readFileSync(path.resolve(path.dirname(file(pg)), r.fav.slice(5)), 'utf8');
    const ok = r.header && r.footer && r.name.every(n => n === 'Austin Pro') && r.fav.trim() === FAV && !r.liveOld;
    if (!ok) bad++;
    console.log(`${ok ? 'PASS' : 'FAIL'} ${pg}: header ${r.header} footer ${r.footer} names ${JSON.stringify(r.name)} favicon ${r.fav.trim() === FAV} old mark outside backups ${r.liveOld}`);
    await p.close();
  }
  console.log(bad ? `${bad} FAIL` : 'logo gate: all pages pass'); await b.close(); process.exit(bad ? 1 : 0);
})();
