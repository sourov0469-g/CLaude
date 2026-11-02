// Phase 1 step 1 checks on brand-v2/phase1-territories.html: screenshots of each territory board, console errors,
// fonts loaded, every computed colour against the allowed set (black, white, steel ramp, neutral ramp), and every
// number in the visible text against the fact locks. Raw output only.
// NODE_PATH=$(npm root -g) node brand-v2/check_territories.js
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const FILE = 'file://' + path.resolve(__dirname, 'phase1-territories.html');
const css = fs.readFileSync(path.resolve(__dirname, '../site/assets/css/home.css'), 'utf8');
const allowedList = ['#000000', '#FFFFFF', ...[...css.matchAll(/--(?:steel|neutral)-\d+:\s*(#[0-9A-F]{6})/g)].map(m => m[1])];
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await p.goto(FILE); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(1200);
  const fonts = await p.evaluate(() => [['800 20px Montserrat'], ['700 20px Inter'], ['400 20px Inter'], ['700 20px Poppins'], ['400 20px Roboto']].map(([f]) => f + ': ' + document.fonts.check(f)));
  const res = await p.evaluate(() => {
    const hex = c => { const m = c.match(/[\d.]+/g); if (!m || (m[3] !== undefined && +m[3] === 0)) return null; return '#' + m.slice(0, 3).map(v => (+v).toString(16).padStart(2, '0')).join('').toUpperCase(); };
    const seen = {};
    for (const el of document.querySelectorAll('body *')) {
      const c = getComputedStyle(el);
      for (const prop of ['color', 'backgroundColor', 'borderTopColor', 'fill', 'stroke']) {
        const v = c[prop]; if (!v || v === 'none' || /url/.test(v)) continue;
        if (prop === 'borderTopColor' && parseFloat(c.borderTopWidth) === 0) continue;
        if ((prop === 'fill' || prop === 'stroke') && !el.closest('svg')) continue;
        const h = hex(v); if (h) seen[h] = (seen[h] || 0) + 1;
      }
    }
    const text = document.body.innerText;
    const nums = [...new Set(text.match(/[0-9][0-9,.:()\- ]*[0-9]|[0-9]/g))];
    const names = (text.match(/Austin Pro[^\n.,:]{0,12}/g) || []).reduce((a, n) => { a[n.trim()] = (a[n.trim()] || 0) + 1; return a; }, {});
    return { seen, nums, names };
  });
  const bad = Object.keys(res.seen).filter(h => !allowedList.includes(h));
  console.log('console errors:', errs.length, errs.slice(0, 3));
  console.log('fonts:', fonts.join(' | '));
  console.log('distinct computed colours:', Object.keys(res.seen).length, '| outside black/white/steel/neutral ramps:', bad.length ? bad : 'none');
  console.log('numbers in visible text:', JSON.stringify(res.nums));
  console.log('name strings:', JSON.stringify(res.names));
  for (const id of ['profile', 'order', 'record']) {
    const el = await p.$('#' + id); await el.screenshot({ path: path.resolve(__dirname, `shots/territory-${id}.png`) });
  }
  await p.screenshot({ path: path.resolve(__dirname, 'shots/territories-top.png') });
  const sh = await p.$('.shared'); await sh.screenshot({ path: path.resolve(__dirname, 'shots/territories-shared.png') });
  await b.close();
})();
