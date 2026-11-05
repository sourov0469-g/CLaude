// The finished homepage: NEW by default, PAST one switch away; past mode must match the frozen pre-reset file
const { chromium } = require('playwright'); const path = require('path'); const fs = require('fs');
const H = 'file://' + path.resolve(__dirname, '../../../owl-roofing.html'), P = 'file://' + path.resolve(__dirname, '../../../past/owl-roofing-PAST-2026-11-04.html');
const res = []; const rec = (n, ok, info) => { res.push({ name: n, ok: !!ok, info: info || '' }); console.log((ok ? 'PASS' : 'FAIL') + ' | ' + n + (info ? ' | ' + info : '')); };
(async () => { const b = await chromium.launch();
  const open = async (u, w, h) => { const p = await b.newPage({ viewport: { width: w || 1440, height: h || 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); await p.route('https://**', r => r.abort()); await p.goto(u); await p.waitForTimeout(1800); p.errs = errs; return p; };
  let p = await open(H);
  rec('the page he opens shows the new bests: seven reset sections in map order, no past version in the live page', await p.evaluate(() => document.documentElement.dataset.mode === 'new' && [...document.querySelectorAll('main > section')].map(s => s.id).join(',') === 'top,finder,nothing,numbers,people,towns,call' && !document.querySelector('body > .page, main .ver')));
  rec('every past version is still in the file, inert: 130 versions and 12 backups inside the PAST record', await p.evaluate(() => { const t = document.getElementById('owl-past').content; return t.querySelectorAll('.ver').length === 130 && t.querySelectorAll('template.bak').length === 12 && t.querySelectorAll('.page').length === 5; }));
  rec('the switch: the new page links to the records', await p.evaluate(() => { const a = document.querySelector('#call .pastlink'); return !!a && a.getAttribute('href') === '?past'; }));
  rec('new mode: no page or console errors', p.errs.length === 0, p.errs.join(' | '));
  await p.screenshot({ path: path.join(__dirname, 'new-1440.jpg'), type: 'jpeg', quality: 78 }); await p.close();
  const cmp = async (q, n) => { const a = await open(H + q), c = await open(P + q.replace(/^\?past&?/, '?').replace(/^\?$/, ''));
    for (const x of [a, c]) await x.evaluate(() => { document.querySelectorAll('.pastchip').forEach(e => e.remove()); });
    const sa = await a.evaluate(() => [...document.querySelectorAll('.ver:not([hidden]) > section, .page:not([hidden]) > section')].map(s => s.id + ':' + Math.round(s.getBoundingClientRect().height)).join(',')),
          sc = await c.evaluate(() => [...document.querySelectorAll('.ver:not([hidden]) > section, .page:not([hidden]) > section')].map(s => s.id + ':' + Math.round(s.getBoundingClientRect().height)).join(','));
    await a.screenshot({ path: path.join(__dirname, 'past-' + n + '.jpg'), type: 'jpeg', quality: 78 }); await c.screenshot({ path: path.join(__dirname, 'frozen-' + n + '.jpg'), type: 'jpeg', quality: 78 });
    rec('past mode ' + q + ' lays out exactly like the frozen pre-reset file (same sections, same heights), no errors', sa === sc && sa.length > 10 && a.errs.length === 0, a.errs.join(' | ') || sa.slice(0, 120)); await a.close(); await c.close(); };
  await cmp('?past', 'home'); await cmp('?past&hero=12&wise=14', 'versions'); await cmp('?hero=11', 'oldlink');
  p = await open(H + '#/services'); rec('an old inner-page link (#/services) still opens the past Services page', await p.evaluate(() => document.documentElement.dataset.mode === 'past' && !document.querySelector('.page[data-page="services"]').hidden)); await p.close();
  p = await open(H + '?past'); rec('the past page carries a chip back to the new homepage', await p.evaluate(() => { const a = document.querySelector('.pastchip'); return !!a && a.getAttribute('href') === '?' && a.getBoundingClientRect().height >= 44; }));
  await p.click('.pastchip'); await p.waitForTimeout(1500); rec('the chip returns to the new homepage', await p.evaluate(() => document.documentElement.dataset.mode === 'new' && !!document.getElementById('finder'))); await p.close();
  fs.writeFileSync(path.join(__dirname, 'modes.json'), JSON.stringify(res, null, 1));
  console.log('TOTAL ' + res.filter(r => r.ok).length + '/' + res.length); await b.close(); })();
